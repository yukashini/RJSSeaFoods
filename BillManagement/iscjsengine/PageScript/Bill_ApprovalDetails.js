/// <reference path="D:\Data\Project\ISC\Projects\BillManagementSVN\BillManagement\ApprovalList.aspx" />
/// <reference path="D:\Data\Project\ISC\Projects\BillManagementSVN\BillManagement\ApprovalList.aspx" />
//Global
{
    var approveBillId = 0;
    var billDetails = [];
    var balanceAmount = 0;
    var Status = 0;
    var isView = 0;
    var subtractedAmount = 0;
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {

        approveBillId = ((GetQueryStrings()["BillID"] == undefined || GetQueryStrings()["BillID"] == null) ? 0 : GetQueryStrings()["BillID"]);
        isView = ((GetQueryStrings()["IsView"] == undefined || GetQueryStrings()["IsView"] == null) ? 0 : GetQueryStrings()["IsView"]);
        BindConfigs();
            if (approveBillId != 0) {
                BuildApproveScreen();
            }
            if (isView != 0) {
                DisableProperties();
            }
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-History]', function () {
        var ApproveHistoryID = $(this).attr('data-History');
        if (ApproveHistoryID != undefined) {
            var approverHistory = $.parseJSON(billDetails[7]["Table7"]);
            var comments = GetmatchedRecord(approverHistory, 'ApproveHistoryID', ApproveHistoryID);
          
            $('#approver-Name').val((((comments[0]["FirstName"] == null ? '' : comments[0]["FirstName"]) + " " + (comments[0]["LastName"] == null ? '' : comments[0]["LastName"]))));
            var approved = ("$" + (comments[0]["ApprovedAmount"] == null || Math.sign(parseFloat(comments[0]["ApprovedAmount"])) == -1 ? 0 : parseFloat(comments[0]["ApprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            var balance = ("$" + (comments[0]["Balance"] == null || Math.sign(parseFloat(comments[0]["Balance"])) == -1 ? 0 : parseFloat(comments[0]["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#amount-Span').html('(Approved :' + approved + '  , Balance :' + balance + ')');
            $('#approver-Notes').html((comments[0]["ApproverComment"] == null ? 'No Comments Found' : comments[0]["ApproverComment"]));
            $('#commented-Name').html((((comments[0]["FirstName"] == null ? '' : comments[0]["FirstName"]) + " " + (comments[0]["LastName"] == null ? '' : comments[0]["LastName"]))))
            $('#mp_comts').show();
        }
        else {
            $('#mp_comts').hide();
        }
       
    });
    
    $(document).on('click', '[approve-Type]', function () {
      
        var approveType = parseInt($(this).attr('approve-Type'));
        $loading.show();
        setTimeout(function () {

        var approvedAmount = $('#approved-Amount').val();
        var approvedFloatAmount = approvedAmount.replace(/,/g, '')
        approvedFloatAmount = parseFloat(approvedFloatAmount);
        var actionKey = 1;
        if (subtractedAmount == 0) {
            Status = 50015;
        }
        if (approveType == 1) {
            if ($('#approved-Amount').val() != "" && approvedFloatAmount != 0) {
                var isValid = true;
                if (approvedFloatAmount < parseFloat(balanceAmount) && clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsPartialApprovalEnabled"] == '0')
                {
                    isValid = false;
                }
                if (isValid) {
                    ApproveOrRejectBill(actionKey);
                }
                else {
                    $.notify("You must approve the full amount as per the norms!", { position: "right top", className: "error" });
                }
              
             
            }
            else {
                $.notify("Approved amount should not be empty and zero!", { position: "right top", className: "error" });
            }

        }
        else {
            actionKey = 2;
            if ($.trim($('#approver-Comments').val()) != '') {
                ApproveOrRejectBill(actionKey);
            }
            else {
                $.notify("Please give the reason for the rejection!", { position: "right top", className: "error" });
            }
           
          
            //window.location.replace("ApprovalList.aspx");
        }
        $loading.hide();
        }, 0);

    });

    $(document).on('click', '#Close-Notes', function () {
        $('#mp_comts').hide();
    });

    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');

        if (fileName != '') {
            window.open(filePathUrl + fileName, '');
        }


    });

    $(document).on('click', '#btn-Cancel', function () {
        window.history.back();
    });
}

//DOM
{
    var BuildApproveScreen = function () {
        
        billDetails = GetBillDetails();

        if (billDetails != null && billDetails.length > 0) {
            BindBillDetails();
            BindDescriptions();
            BindSplitedBills();
            BindApprovers();
            BindRecurrenceDetails();
            BindReminderDetails();
            BindBillDoumnets();
            BindBillNotes();
            AmountBlockBinding();
            BindApproverHistory();
            BindRecentPayments();
            BillAttatchmentFrame();
            BindPaymentDetails();
            BindPaidBillDoumnets();
        }

    }

    var BindBillDetails = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        if (BillInfo != null && BillInfo.length > 0) {
            $('#vendor-Name').html((BillInfo[0]["VendorName"] == null ? '-' : BillInfo[0]["VendorName"]));
            $('#invoice-Number').html((BillInfo[0]["InvoiceNumber"] == null ? '-' : BillInfo[0]["InvoiceNumber"]));
            $('#bill-Desc').html((BillInfo[0]["Description"] == null ? '-' : BillInfo[0]["Description"]));
            $('#bill-Amount').html("$" + (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? 0 : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#bill-Category').html((BillInfo[0]["CategoryName"] == null ? '-' : BillInfo[0]["CategoryName"]));
            $('#paymentTerm-Name').html((BillInfo[0]["PaymenttermName"] == null ? '-' : BillInfo[0]["PaymenttermName"]));
            $('#invoice-Date').html((BillInfo[0]["BillDate"] == null ? '-' :moment(BillInfo[0]["BillDate"]).format('MM/DD/YYYY')));
            $('#due-Date').html((BillInfo[0]["DueDate"] == null ? '-' : moment(BillInfo[0]["DueDate"]).format('MM/DD/YYYY')));
            $('#lbl-Customer').html((BillInfo[0]["CustomerName"] == null ? '-' : BillInfo[0]["CustomerName"]));
            $('#lbl-Project').html((BillInfo[0]["ProjectName"] == null ? '-' : BillInfo[0]["ProjectName"]));
            if (BillInfo[0]["Status"] == "50044") {
                $('#payment-Tab').show();
            }
            if ( BillInfo[0]["ProjectName"] != null || BillInfo[0]["CustomerName"] != null) {
                $('#bill-Association-Block').show();
            }
        }
    }

    var BindDescriptions = function () {
        var descriptionList = $.parseJSON(billDetails[1]["Table1"]);
        var html = '';
        var $el = $('#tbl-Desc-Body');
        if (descriptionList.length > 0) {
            $('#desc-Div').show();
            $.each(descriptionList, function (index, item) {
                if (item["Balance"] != "" && item["Balance"] != null) {
                    dollerAmount = $(item["Balance"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var rate = item["Rate"].replace(/,/g, '');
                rate = parseFloat(rate);
                var amount = item["Total"].replace(/,/g, '');
                amount = parseFloat(amount);
                
                html+='<tr>';
                html+='<td title="'+(item["Description"]==null?'-':item["Description"])+'">'+(item["Description"]==null?'-':item["Description"])+'</td>';
                html += '<td style="text-align: right;">' + (rate == "" || rate == NaN ? '-' : '$' + rate.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</td>';
                html += '<td style="text-align: center;">' + (item["Quantity"] == null ? '-' : item["Quantity"]) + '</td>';
                html+='<td style="text-align: right;">'+(amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))+'</td>';
                html+='</tr>';
            })

        }
        else {
            html = '<tr><td colspan="4" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    var BindSplitedBills=function()
    {
        var splitList = $.parseJSON(billDetails[2]["Table2"]);
        var html = '';
        var $el = $('#tbl-Split-Body');
     
        if (splitList.length > 0) {
            var unMatchedDefaultsplitList = GetunmatchedRecord(splitList, "BillType", "0");
            if (unMatchedDefaultsplitList.length > 0) {
                $('#tab-Split').show();
                $.each(unMatchedDefaultsplitList, function (index, item) {
                    if (item["BillType"] != '0') {
                        var amount = item["Amount"].replace(/,/g, '');
                        amount = parseFloat(amount);
                        html += '<tr class="" role="row">';
                        html += '<td style="width:70%;">';
                        html += '<h2 title="' + (item["BillTypeName"] == null ? '-' : item["BillTypeName"]) + '">' + (item["BillTypeName"] == null ? '-' : item["BillTypeName"]) + '</h2>';
                        html += '<h6 class="" title="' + (item["Description"] == null ? '-' : item["Description"]) + '" >' + (item["Description"] == null ? '-' : item["Description"]) + '</h6>';
                        html += '</td>';
                        html += '<td style="width:33.33%;"><h2 title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h2></td></tr>';
                    }
                });
            }
            else {
                html = '<tr><td colspan="2" style="text-align:center;"> No Data Found </td><tr>';
            }
        
        }
        else {
          
            html = '<tr><td colspan="2" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    var BindApprovers = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        if (BillInfo[0]["isAutoApproval"] == '1') {
            $('#lbl-AutoApproval').hide();
            $('#auto-Approval').prop('checked', true);
        }
        var $el = $('#div-Approvers')
        var html = '';
        var approversList = $.parseJSON(billDetails[3]["Table3"]);
        if (approversList.length > 0) {
            $('#div-Approvers').show();
            approversList = ObjSorter(approversList, 'Sequence', '123');
            $.each(approversList, function (index, item) {
                html+='<div class="screen-row">';
                html+='<div class="div-col-35per">';
                html+='<label class="mar-top-5">Approver Name : </label>';
                html+='</div><div class="div-col-50per">';
                html += ' <label class="mar-top-5"> ' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " "+(item["LastName"] == null ? '' : item["LastName"])) + ' </label>';
                html += '</div></div>';
            });
        }
        $el.html(html);
    }
  
    var BindRecurrenceDetails = function () {
        
        var recuInfo = $.parseJSON(billDetails[4]["Table4"]);
        if (recuInfo != null && recuInfo.length > 0) {
            $('#recurrence-Block').show();
            $('#recurrence-StartDate').html((recuInfo[0]["StartDate"] == null ? '-' : moment(recuInfo[0]["StartDate"]).format('MM/DD/YYYY')));
            $('#recurrence-EndDate').html((recuInfo[0]["EndDate"] == null ? '-' : moment(recuInfo[0]["EndDate"]).format('MM/DD/YYYY')));
            $('#frequency').html((recuInfo[0]["Frequency"] == null ? '-' : recuInfo[0]["Frequency"]));
        }
    }

    var BindReminderDetails = function () {
        var billInfo = $.parseJSON(billDetails[0]["Table"]);
        if (billInfo.length > 0 && billInfo[0]["IsReminder"] == '1') {
            
            $('#reminderState').html('' + (billInfo[0]["ReminderIntervalDay"] == null ? '-' : billInfo[0]["ReminderIntervalDay"]) + ' days ' +( billInfo[0]["ReminderIntervalName"]==null?'-':billInfo[0]["ReminderIntervalName"].toLowerCase() )+ ' due date');
            $('#reminder-Email').html((billInfo[0]["ReminderEmail"] == null ? '-' : billInfo[0]["ReminderEmail"]));
        }
      
    }

    var BindBillDoumnets = function () {
        var $el = $('#tbl-Documents-Body');
        var html = '';
        var docList = $.parseJSON(billDetails[5]["Table5"]);
        if (docList.length > 0) {
            $.each(docList, function (index, item) {
                var title = "Uploaded On: " + (item["CreatedOn"] == null ? '-' : item["CreatedOn"]) + " Uploaded By:" + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + ""
                html += ' <tr><td><h5 title="' + title + '">';
                html+=' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">';
                html += ' <span title="' + (item["FileName"] == null ? '-' : item["FileName"]) + '">' + (item["FileName"] == null ? '-' : item["FileName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
                html += ' <a class="isc-action-badge-td-s1" data-Open-File="' + (item["PhysicalFileName"] == null ? '' : item["PhysicalFileName"]) + '"><i class="fa fa-eye"></i></a>';
                html += ' </div></td></tr>';
            });
        }
        else {
            html = '<tr><td colspan="2" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);

    }

    var BindBillNotes = function () {
        var notes = $.parseJSON(billDetails[6]["Table6"]);
        var $el = $('#div-Notes')
        var html = '';
        if (notes != null && notes.length > 0) {
            $.each(notes, function (index, item) {
                //html+=' <div class="screen-row">';
                //html+=' <div class="div-col-15per"><img src="img/appfinal/48.jpg" class="isc-vnd-img-nts">';
                //html += ' <h5 style="font-weight:400;font-size:11px;" title="' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '"> ' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '</h5>';
                //html+=' </div>';
                //html+=' <div class="div-col-85per">';
                //html += ' <h6 class="isc-vnd-edt-cht-tm">' + (item["CreatedOn"] == null ? '-' : item["CreatedOn"]) + '</h6>';
                //html+=' <div class="">';
                //html += ' <p style="margin:2px 0px;">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
                //html+=' </div>';
                //html+=' </div>';
                //html += ' </div>';

                html += '<p class="isc-crt-bill-nt">';
                html += '<i class="fa fa-circle" style="font-size: 8px !important; padding-right:5px" data-Notes="'  + (item["Comment"] == null ? '-' : item["Comment"]) + '" data-CommentOn="' + moment().format('llll') + '">';
                html += '</i>'  + (item["Comment"] == null ? '-' : item["Comment"])  + '<span class="isc-crt-bill-ownr" style="color: green !important;">' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["FirstName"] == null ? '' : item["LastName"])) + ',</span>';
                html += '<span class="isc-crt-bill-ownr">' + moment().format('llll') + '</span></p>';
            });
        }
        else {
            html+='<h5>No Data Found</h5>'
        }
        $el.html(html);
    }

    var AmountBlockBinding = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        if (BillInfo != null && BillInfo.length > 0) {
           // $('#balance-Amount').val("$" + (BillInfo[0]["Balance"] == null || Math.sign(parseFloat(BillInfo[0]["Balance"])) == -1 ? 0 : parseFloat(BillInfo[0]["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#balance-Amount').val("$0");
            
            
            if (isView != 0) {
                var approverHistory = $.parseJSON(billDetails[7]["Table7"]);
                approverHistory = GetDistinctArray(approverHistory, 'ApproveHistoryID');
                approverHistory = ObjSorter(approverHistory, 'ApproveHistoryID', '123');
                $.each(approverHistory, function (index, item) {
                    $('#approved-Amount').val((item["ApprovedAmount"] == null || Math.sign(parseFloat(item["ApprovedAmount"])) == -1 ? 0 : parseFloat(item["ApprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
                });
            }
            else {
                $('#approved-Amount').val((BillInfo[0]["Balance"] == null || Math.sign(parseFloat(BillInfo[0]["Balance"])) == -1 ? 0 : parseFloat(BillInfo[0]["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            }
            balanceAmount = BillInfo[0]["Balance"];
        }
        var approversList = $.parseJSON(billDetails[3]["Table3"]);
       
        if (approversList.length > 0) {
            approversList = ObjSorter(approversList, 'Sequence', '123');
            var firstApprover = approversList[0]["ApproverID"]
            
            
            if(parseInt(firstApprover)!=AccountID)
            {
                var currentApprover = GetmatchedRecord(approversList, 'ApproverID', AccountID);
                var beforApproverStageID = (currentApprover[0]["BillStageApprovalID"] == null ? 0 : (parseInt(currentApprover[0]["BillStageApprovalID"]) - 1));
                if (beforApproverStageID > 0) {
                    var beforeApprovedDetails = GetmatchedRecord(approversList, 'BillStageApprovalID', beforApproverStageID.toString());
                    //$('#approved-Amount').prop('disabled', true);
                   
                    if (beforeApprovedDetails != undefined && beforeApprovedDetails.length > 0) {
                        subtractedAmount = (parseFloat(BillInfo[0]["Amount"])-parseFloat(beforeApprovedDetails[0]["ApprovedAmount"]));
                        $('#balance-Amount').val("$" + (subtractedAmount == null || Math.sign(parseFloat(subtractedAmount)) == -1 ? 0 : parseFloat(subtractedAmount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
                        $('#approved-Amount').val((beforeApprovedDetails[0]["ApprovedAmount"] == null || Math.sign(parseFloat(beforeApprovedDetails[0]["ApprovedAmount"])) == -1 ? 0 : parseFloat(beforeApprovedDetails[0]["ApprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")))
                    }
                    
                }   
            }
            else {
                $('#approved-Amount').prop('disabled', false);
            }


        }

        if (BillInfo != null && BillInfo.length > 0 && BillInfo[0]["Status"] == '50015') {
           
            $('#approved-Amount').val('$0.00');
            $('#balance-Amount').val('$0.00');
           // balanceAmount = BillInfo[0]["Balance"];
        }
    }

    var BindApproverHistory = function () {
       
        var $el = $('#tbl-ApproverHistory-Body');
        var html = '';
        var approverHistory = $.parseJSON(billDetails[7]["Table7"]);
    
        if (approverHistory.length > 0) {
            approverHistory = GetDistinctArray(approverHistory, 'ApproveHistoryID');
            approverHistory = ObjSorter(approverHistory, 'ApproveHistoryID', '123');
            $.each(approverHistory, function (index, item) {
                var approvedAmount = (item["ApprovedAmount"] == null ? 0.00 : item["ApprovedAmount"].replace(/,/g, ''));

                approvedAmount = parseFloat(approvedAmount);
                var balanceAmount = (item["Balance"] == null ? 0.00 : item["Balance"].replace(/,/g, ''));

                balanceAmount = parseFloat(balanceAmount);
                html+='<tr class="" role="row">';
                html+='<td style="width: 33.33%;">';
                html += '<h2 title="' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '"><a href="#">' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '</a></h2>';
                html += '<h6 class="" >' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format('MM/DD/YYYY')) + '</h6></td>';
                html+='<td style="width: 33.33%;">';
                html += '<h2 title="' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h2>';
                html += '<h6 class="" title="' + (balanceAmount == "" || balanceAmount == NaN ? '-' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))+'">Balance: ' + (balanceAmount == "" || balanceAmount == NaN ? '-' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h6>';
                html += '</td><td class="text-center" style="width: 20.33%;">';
                if (item["StatusName"] == "Rejected") {
                    html += '<h4 class="isc-app-det-hst-app" style="color:red !important">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</h4>';
                } else {
                    html += '<h4 class="isc-app-det-hst-app">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</h4>';
                }
               
                html+='</td>';
                html+='<td style="width:10%;">';
                html += '<a class="isc-action-badge-td-s1" title="Comment"  data-History=' + item["ApproveHistoryID"] + '><i class="fa fa-comment-o"></i></a>';
                html+='</td>';
                html += '</tr>';
            });

        }
        else {
            html = '<tr><td colspan="4" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    var BindRecentPayments = function () {
        var $el = $('#tbl-RecentPayments-Body');
        var html = '';
        //var recentPayments = [];
        var recentPayments = $.parseJSON(billDetails[8]["Table8"]);
        if(recentPayments!=null&& recentPayments.length>0)
        {
            $.each(recentPayments, function (index, item) {
                var payableAmount = item["PayableAmount"].replace(/,/g, '');
                payableAmount = parseFloat(payableAmount);
                html += '<tr><td><h5 title="' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</h5></td>';
                html += '<td><h5 title="' + (item["PaidOn"] == null || item["PaidOn"]=="" ? "" : moment(item["PaidOn"]).format("MM/DD/YYYY")) + '">' + (item["PaidOn"] == null || item["PaidOn"] ==""? "" : moment(item["PaidOn"]).format("MM/DD/YYYY")) + '</h5></td>';
                html += '<td class="isc-bill-amt-pad">';
                html += '<h5 style="text-align:right;" title="' + (payableAmount == "" || payableAmount == NaN ? '-' : '$' + payableAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (payableAmount == "" || payableAmount == NaN ? '-' : '$' + payableAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' </h5>';
                html += '</td></tr>';
            });
        }
        else {
            html = '<tr><td colspan="3" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    var BillAttatchmentFrame = function () {
        $('#billFrameBlock').html('');
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        var fileImage = BillInfo[0]["FileName"];
        if (fileImage != null) {
            var iframe = document.getElementById("bill_Frame");
            if (null !== iframe) {
                document.body.removeChild(iframe);
            }
            else {
                var iframe = document.createElement("iframe");
                iframe.id = "bill_Frame";
                var iframewidth = 390;
                iframe.src = filePathUrl + fileImage;
                iframe.className = 'isc-new-exp-pdf';
                iframe.setAttribute("style", "border: none; width: 100%; height: 470px; overflow: hidden; overflow-y: auto;")
                $('#iframe img').addClass('img-responsive');
                $('#billFrameBlock').append(iframe);
            }
        }
        else
        {
            $('#file-Message').show();
        }
    }
}

//Data Manipulation
{
    var GetBillDetails = function () {
        var _obj = {
            'billId': parseInt(approveBillId)
        };

        var tempList = {};
        $.when(RequestServer("Bill_ApprovalDetails.aspx/GetApprovalBillDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ApproveOrRejectBill = function (actionKey) {

        var approverComment = $('#approver-Comments').val();
        var billinfo = $.parseJSON(billDetails[0]["Table"]);
        var approvedAmount = $('#approved-Amount').val();
        if (approvedAmount != "") {
            approvedAmount = approvedAmount.replace(/,/g, '')
        }
        else {
            approvedAmount = 0;
        }

        var isPartial = 0;
        var approveStatus = 0;
        var currentBillStageApprovalID = 0

        if (approvedAmount != '' && parseFloat(approvedAmount) != parseFloat(billinfo[0]["Amount"])) {
            isPartial = 1;
        }
        else {
            isPartial = 0;
        }
        var approversList = $.parseJSON(billDetails[3]["Table3"]);

        approversList = GetmatchedRecord(approversList, 'ApproverID', AccountID.toString());
        var initiatedApprovers = GetmatchedRecord(approversList, 'StageInitiated', '1');
        currentBillStageApprovalID = parseInt(approversList[0]["BillStageApprovalID"]) + 1;

        var approverDescList = $.parseJSON(billDetails[3]["Table3"]);
        approverDescList = ObjSorter(approverDescList, 'Sequence', '321');
        var approversAscList = $.parseJSON(billDetails[3]["Table3"]);
        approversAscList = ObjSorter(approversAscList, 'Sequence', '123');
        var firstApprover = approversAscList[0]["ApproverID"]
       

      if ((parseFloat(approvedAmount) != parseFloat(billinfo[0]["Amount"]) && approverDescList[0]["ApproverID"] == AccountID.toString())) {
            Status = 50034
            
      }
      else if (parseFloat(approvedAmount) == parseFloat(billinfo[0]["Balance"]) && approverDescList[0]["ApproverID"] == AccountID.toString()) {
          Status = 50015
      }
      else if (billinfo[0]["Status"]=="50034") {
          Status = 50034
      }
      else {
            Status = 50016;
        }
       
        if (approverDescList[0]["ApproverID"] == AccountID.toString())
        {
            approveStatus=50015
        }
        else {
            approveStatus=50016
        }

        //if (billinfo[0]["ApprovedAmount"] != null && approversAscList[0]["ApproverID"] == AccountID.toString())
        //{
        //    approvedAmount = parseFloat(billinfo[0]["ApprovedAmount"]) + parseFloat(approvedAmount);
        //}
        if (parseFloat(approvedAmount) == parseFloat(billinfo[0]["Balance"]) && approverDescList[0]["ApproverID"] == AccountID.toString())
        {
            Status = 50015
            subtractedAmount = 0.00;
        }
        var billObj = {
            'VendorID': parseInt(billinfo[0]["VendorID"]),
            'BillId': parseInt(billinfo[0]["BillID"]),
            'ApproverComment': approverComment,
            'BalanceAmount': parseFloat(subtractedAmount),
            'PayableAmount': parseFloat(billinfo[0]["Amount"]),
            'ApprovedAmount': parseFloat(approvedAmount),
            'ActionKey': actionKey,
            'DueOn': moment(billinfo[0]["DueDate"]),
            //add Logics here
            'IsPartial': isPartial,
            'CreatedBy': (billinfo[0]["CreatedBy"] == null ? 0 :parseInt(billinfo[0]["CreatedBy"])),
            'InvoiceNumber': (billinfo[0]["InvoiceNumber"] == null ? '' : billinfo[0]["InvoiceNumber"]),
            'SubmittedOn': (billinfo[0]["UpdatedOn"] == null ? (moment(billinfo[0]["CreatedOn"]).format('DD MMM YYYY')) : (moment(billinfo[0]["UpdatedOn"]).format('DD MMM YYYY'))),
            'Status': Status,
            'ApproveStatus':approveStatus,
            'CurrentBillStageApprovalID': currentBillStageApprovalID,
            'ClerkName': (billinfo[0]["ClerkName"] == null ? '' : billinfo[0]["ClerkName"]),
            'ApproverName': ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + ' ' + (loggerDetails["LastName"] == null ? ' ' : loggerDetails["LastName"]))
        }
        var _obj = {
            'BillDetails': billObj
        };
        var tempList = {};
        $.when(RequestServer("Bill_ApprovalDetails.aspx/BillApprovalOrReject", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (actionKey == 2) {
                //Rejected
                if (parseInt(response) > 0) {
                    $.notify("Bill rejected successfully.", { position: "right top", className: "success" });
                    if (isView != 0) {
                        window.location.href = 'ApprovalList.aspx';
                    }
                    else {
                        GoBack();
                    }
                   
                }
                else {
                    $.notify("Server error occured while rejecting a bill !!", { position: "right top", className: "error" });
                }

            }
            else {
                //Approved
                if (parseInt(response) > 0) {
                    $.notify("Bill approved successfully.", { position: "right top", className: "success" });
                    if (isView != 0) {
                        window.location.href = 'ApprovalList.aspx';
                    }
                    else {
                        GoBack();
                    }
                    
                }
                else {
                    $.notify("Server error occured while approving a bill !!", { position: "right top", className: "error" });
                }

                
            }
        });
       
    }
}

//Common
{
    $(document).on('keyup', 'input[data-type=currency]', function () {
        formatCurrency($(this));
        var approvalAmount = $(this).val();
        approvalAmount = approvalAmount.replace(/,/g, '')
        balanceAmount = balanceAmount.replace(/,/g, '')
        if (parseFloat(balanceAmount) >= parseFloat(approvalAmount)) {
            subtractedAmount = parseFloat(balanceAmount) - parseFloat(approvalAmount);
            $('#balance-Amount').val((subtractedAmount == "" ? '$0' : '$' + subtractedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        }
        else {
            $('#approved-Amount').val('');
            $('#balance-Amount').val((parseFloat(balanceAmount) == "" ? '$0' : '$' + parseFloat(balanceAmount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            if (parseFloat(balanceAmount) < parseFloat(approvalAmount)) {
                $.notify("Approved amount should not be greater than  " + (balanceAmount == "" ? '$0.00' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + " ", { position: "right top", className: "error" });
            }


        }
    });
    $(document).on('blur', 'input[data-type=currency]', function () {
        formatCurrency($(this));
    })

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") { return; }

        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = input_val;

            // final formatting
            if (blur === "blur") {
                input_val += ".00";
            }
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 2000);
    }

    var DisableProperties = function () {
       
        $('[approve-Type]').hide();
        $('#approved-Amount').prop('disabled', true);
        $('#approver-Comments').prop('disabled', true);
        
    }

    var BindConfigs = function () {
        if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0) {
            if (clientConfigurations[0]["IsSplitAllowed"] == "1") {
                $('#tab-Split').show();
            }
            else {
                $('#tab-Split').hide();
            }
            if (clientConfigurations[0]["IsRecurrenceEnabled"] == "1") {
                $('#recurrence-Block').show();
            }
            else {
                $('#recurrence-Block').hide();
            }
            if (clientConfigurations[0]["IsBillAssociationEnabled"] == "1") {
                $('#bill-Association-Block').show();
            }
            else {
                $('#bill-Association-Block').hide();
            }
            if (clientConfigurations[0]["IsAutoApproval"] == "1") {
                $('#auto-Approval').prop('checked', true);
                $('#auto-Approval').prop('disabled', true);
                $('#div-Approvers').hide();
            }
            else {
                $('#lbl-AutoApproval').hide();
                $('#div-Approvers').show();
            }
            if (clientConfigurations[0]["IsStandardApproval"] == "1") {
                $('#auto-Approval').prop('checked', false);
                $('#lbl-AutoApproval').show();
                $('#div-Approvers').show();
            }

            if (clientConfigurations[0]["IsDefaultApproval"] == "1") {
                $('#auto-Approval').prop('checked', false);
                $('#lbl-AutoApproval').hide();
                $('#div-Approvers').show();
            }

            if (clientConfigurations[0]["IsMultiApproval"] == "1") {
                $('#auto-Approval').prop('checked', false);
                $('#lbl-AutoApproval').hide();
                $('#div-Approvers').show();
            }


        }
    }
}

//Payment Details Render
{
    var BindPaymentDetails = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        
        if (BillInfo != null && BillInfo.length > 0) {
            $('#lbl-PayableAmount').html("$" + (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? 0 : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#lbl-PaymentMethod').html(BillInfo[0]["StrTypeOfPayment"] == null ? '-' : BillInfo[0]["StrTypeOfPayment"])
            $('#lbl-PaidOn').html((BillInfo[0]["PaidOn"] == null ? '-' : moment(BillInfo[0]["PaidOn"]).format('MM/DD/YYYY')));
            $('#lbl-payment-Mode').html((BillInfo[0]["PaymentMode"] == null ? '-' : BillInfo[0]["PaymentMode"]));
            $('#lbl-Ref-Number').html((BillInfo[0]["PaymentReferenceID"] == null ? '-' : BillInfo[0]["PaymentReferenceID"]));
            $('#lbl-Amount-Paid').html("$" + (BillInfo[0]["AmountPaid"] == null || Math.sign(parseFloat(BillInfo[0]["AmountPaid"])) == -1 ? 0 : parseFloat(BillInfo[0]["AmountPaid"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#lbl-Amount-Due').html("$" + (BillInfo[0]["AmountDue"] == null || Math.sign(parseFloat(BillInfo[0]["AmountDue"])) == -1 ? 0 : parseFloat(BillInfo[0]["AmountDue"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        }
    }

    var BindPaidBillDoumnets = function () {
        var $el = $('#tbl-Paid-Docs');
        var html = '';
        var docList = $.parseJSON(billDetails[9]["Table9"]);
        if (docList.length > 0) {
            $.each(docList, function (index, item) {
                var title = "Uploaded On: " + (item["CreatedOn"] == null ? '-' : item["CreatedOn"]) + " Uploaded By:" + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + ""
                html += ' <tr><td><h5 title="' + title + '">';
                html += ' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">';
                html += ' <span title="' + (item["FileName"] == null ? '-' : item["FileName"]) + '">' + (item["FileName"] == null ? '-' : item["FileName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
                html += ' <a class="isc-action-badge-td-s1" title="View"  data-Open-PaidFile="' + (item["PhysicalFileName"] == null ? '' : item["PhysicalFileName"]) + '"><i class="fa fa-eye"></i></a>';
                if (AccountID == parseInt(item["CreatedBy"])) {
                    html += ' <a class="isc-action-badge-td-s1" title="Delete"  data-Delete-PaidFile=' + (item["BillPaidAttatchmentId"] == null ? '' : item["BillPaidAttatchmentId"]) + '><i class="fa fa-trash-o"></i></a>';
                }

                html += ' </div></td></tr>';
            });
        }
        else {
            html = '<tr><td colspan="2" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);

    }

    $(document).on('click', '[data-Open-PaidFile]', function () {
        var fileName = $(this).attr('data-Open-PaidFile');

        if (fileName != '') {
            window.open(paidBillDocs + fileName, '');
        }
    });
}