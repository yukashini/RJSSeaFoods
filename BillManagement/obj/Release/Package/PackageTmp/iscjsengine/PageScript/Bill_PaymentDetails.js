/// <reference path="Stripe.js" />
//Global
{
    var approveBillId = 0;
    var billDetails = [];
    var balanceAmount = 0;
    var Status = 0;
    var subtractedAmount = 0;
    var payBillId = 0;
    var isView = 0;
    var fileContainer = [];
    var fileResponse = [];
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
           
            BindConfigs();
            $('[data-type=currency]').mask("#,##0.00", { reverse: true });
          //  $('#txt-PaidOn').datepicker({
            //    format: 'mm/dd/yyyy',
            //    endDate: '+0d',
            //    autoclose: true
            //});
           // $('#txt-PaidOn').mask('00/00/0000');
        approveBillId = ((GetQueryStrings()["BillID"] == undefined || GetQueryStrings()["BillID"] == null) ? 0 : GetQueryStrings()["BillID"]);
        payBillId = ((GetQueryStrings()["billAId"] == undefined || GetQueryStrings()["billAId"] == null) ? 0 : GetQueryStrings()["billAId"]);
        isView = ((GetQueryStrings()["IsView"] == undefined || GetQueryStrings()["IsView"] == null) ? 0 : GetQueryStrings()["IsView"]);
        if (approveBillId != 0) {
            BuildApproveScreen();
            }
            
        if (clientConfigurations[0]["IsEpaymentsEnabled"] == "1") {
            $('#pay-btn').show();
        }
        else {
            $('#pay-btn').hide();
        }

        if (clientConfigurations[0]["IsOfflinePaymentsAllowed"] == "1") {
            $('#mPaid-btn').show();
        }
        else {
            $('#mPaid-btn').hide();

        }
        if (isView != 0) {
            DisableProperties();
        }
       
            $loading.hide();
        }, 0);
    });

    var IsDwollaConnected = function () {
        var IsConnected = GetIsDwollaConnected();
        return IsConnected;
    }
    $(document).on('click', '#pay-btn', function () {
       
        var Balance = ReadPaypalBalance();
        var Dwollaconnect = IsDwollaConnected();
        if (Balance != null) {
            window.location.replace('PaymentMethod.aspx?billID=' + payBillId + '&&userBillId=' + approveBillId + '')
        }
        else if (Dwollaconnect != false)
        {
            window.location.replace('PaymentMethod.aspx?billID=' + payBillId + '&&userBillId=' + approveBillId + '')
        }
        else {
            $.notify("Please configure the payment method before paying the bill !!", { position: "right top", className: "error" });
        }
    })

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
            $('#mp_comts').show();
        }
        else {
            $('#mp_comts').hide();
        }

    });

    $(document).on('click', '#Close-Notes', function () {
        $('#mp_comts').hide();
    });

    $(document).on('click', '[data-Submit]', function () {
        var actionKey = parseInt($(this).attr('data-Submit'));
        if (actionKey == 1) {
            ProcessBill(actionKey);
        }
        else {
            if ($.trim($('#txt-Dispute-Reason').val()) != '') {
                ProcessBill(actionKey);
            }
            else {
                $.notify("Please give the reason for disputing a bill !!", { position: "right top", className: "error" });
            }
        }
        
       
    });

    $(document).on('click', '#btn-Dispute', function () {
        var $modal = $('#Mp_DisputeBill');
        $modal.modal('show');
    });

    $(document).on('click', '[cancel-Dispute-POP]', function () {
        var $modal = $('#Mp_DisputeBill');
        $modal.modal('hide');
    })

    $(document).on('click', '#cancel', function () {
        window.history.back();
    });

    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');

        if (fileName != '') {
            window.open(filePathUrl + fileName, '');
        }


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
            BindDropDowns($('#slt-PaymentMode'), $.parseJSON(billDetails[10]["Table10"]), 'Choose Payment Method')
        }

        BindElements();
       

    }

    var BindElements = function () {
        var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
        var isFlag = GetmatchedRecord(RolePermissions, 'EntityActionID', '3007');
        var isDispute = GetmatchedRecord(RolePermissions, 'EntityActionID', '3008');
        if (isPay.length > 0) {
            $('#pay-btn').show();
            $('#mPaid-btn').show();
        }
        else {
            $('#mPaid-btn').hide();
            $('#pay-btn').hide();
        }
        if (isFlag.length > 0) {
            $('#btn-Flag').show();
        }
        else {
            $('#btn-Flag').hide();
        }
        if (isDispute.length > 0) {
            $('#btn-Dispute').show();
        }
        else {
            $('#btn-Dispute').hide();
        }
    }

    var BindBillDetails = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        if (BillInfo != null && BillInfo.length > 0) {
            $('#vendor-Name').html((BillInfo[0]["VendorName"] == null ? '-' : BillInfo[0]["VendorName"]));
            $('#invoice-Number').html((BillInfo[0]["InvoiceNumber"] == null ? '-' : BillInfo[0]["InvoiceNumber"]));
            $('#bill-Desc').html((BillInfo[0]["Description"] == null ? '-' : BillInfo[0]["Description"]));
            $('#bill-Category').html((BillInfo[0]["CategoryName"] == null ? '-' : BillInfo[0]["CategoryName"]));
            $('#bill-Amount').html("$" + (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? 0 : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#paymentTerm-Name').html((BillInfo[0]["PaymenttermName"] == null ? '-' : BillInfo[0]["PaymenttermName"]));
            var invoiceDate = moment.utc(BillInfo[0]["BillDate"]).toDate();
            var localinvoiceDate = moment(invoiceDate).local().format('MM/DD/YYYY');
            $('#invoice-Date').html(BillInfo[0]["BillDate"] == null ? '' : moment(BillInfo[0]["BillDate"]).format('MM/DD/YYYY'));
            var dueDate = moment.utc(BillInfo[0]["DueDate"]).toDate();
            var localdueDate = moment(dueDate).local().format('MM/DD/YYYY');
            $('#due-Date').html(BillInfo[0]["DueDate"] == null ? '' : moment(BillInfo[0]["DueDate"]).format('MM/DD/YYYY'));
            $('#lbl-Customer').html((BillInfo[0]["CustomerName"] == null ? '-' : BillInfo[0]["CustomerName"]));
            $('#lbl-Project').html((BillInfo[0]["ProjectName"] == null ? '-' : BillInfo[0]["ProjectName"]));
       //     $('#pay-btn').attr('href', 'PaymentMethod.aspx?billID=' + payBillId + '&&userBillId=' + approveBillId + '');

            if ((BillInfo[0]["PaymentStatus"] == '50023')) {
                $('#mPaid-btn').show();
            }
            else {
                $('#mPaid-btn').hide();
            }

            if (BillInfo[0]["UpdatedBy"] == null || parseInt(BillInfo[0]["UpdatedBy"]) == AccountID) {
                $('#add-Doc-Span').show();
            }
            else {
                $('#add-Doc-Span').hide();
            }
            if (BillInfo[0]["PaymentStatus"] == "50044") {
                $('#payment-Tab').show();
            }
            if (BillInfo[0]["ProjectName"] != null || BillInfo[0]["CustomerName"] != null) {
                $('#bill-Association-Block').show();
            }
        }
    }

    var BindDescriptions = function () {
        var descriptionList = $.parseJSON(billDetails[1]["Table1"]);
        var html = '';
        var $el = $('#tbl-Desc-Body');
        if (descriptionList.length > 0) {
            $('#tbl-Desc').show();
            $.each(descriptionList, function (index, item) {
                if (item["Balance"] != "" && item["Balance"] != null) {
                    dollerAmount = $(item["Balance"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var rate = item["Rate"].replace(/,/g, '');
                rate = parseFloat(rate);
                var amount = item["Total"].replace(/,/g, '');
                amount = parseFloat(amount);

                html += '<tr>';
                html += '<td title="' + (item["Description"] == null ? '-' : item["Description"]) + '">' + (item["Description"] == null ? '-' : item["Description"]) + '</td>';
                html += '<td style="text-align: right;">' + (rate == "" || rate == NaN ? '-' : '$' + rate.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</td>';
                html += '<td style="text-align: center;">' + (item["Quantity"] == null ? '-' : item["Quantity"]) + '</td>';
                html += '<td style="text-align: right;">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</td>';
                html += '</tr>';
            })

        }
        else {
            html = '<tr><td colspan="4" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    var BindSplitedBills = function () {
        var splitList = $.parseJSON(billDetails[2]["Table2"]);
        var html = '';
        var $el = $('#tbl-Split-Body');
        if (splitList.length > 0) {
            var unMatchedDefaultsplitList = GetunmatchedRecord(splitList, "BillType", "0");
            if (unMatchedDefaultsplitList.length > 0) {
                $('#tab-Split').show();
                $.each(splitList, function (index, item) {
                    if (item["BillType"] != '0') {
                        var amount = item["Amount"].replace(/,/g, '');
                        amount = parseFloat(amount);
                        html += '<tr class="" role="row">';
                        html += '<td style="width:70%;">';
                        html += '<h2 title="' + (item["BillTypeName"] == null ? '-' : item["BillTypeName"]) + '"> ' + (item["BillTypeName"] == null ? '-' : item["BillTypeName"]) + ' </h2>';
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
            $('#auto-Approval').prop('checked', true);
            $('#lbl-AutoApproval').show();
        }
        var $el = $('#div-Approvers')
        var html = '';
        var approversList = $.parseJSON(billDetails[3]["Table3"]);
        if (approversList.length > 0) {
            $('#div-Approvers').show();
            approversList = ObjSorter(approversList, 'Sequence', '123');
            $.each(approversList, function (index, item) {
                html += '<div class="screen-row isc-mb-res-pay-det">';
                html += '<div class="div-col-35per">';
                html += '<label class="mar-top-5">Approver Name : </label>';
                html += '</div><div class="div-col-50per">';
                html += ' <label class="mar-top-5"> ' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + ' </label>';
                html += '</div></div>';
            });
        }
        $el.html(html);
    }

    var BindRecurrenceDetails = function () {
        var recuInfo = $.parseJSON(billDetails[4]["Table4"]);
        if (recuInfo != null && recuInfo.length > 0) {
            $('#recurrence-StartDate').html((recuInfo[0]["StartDate"] == null ? '-' : moment(recuInfo[0]["StartDate"]).format('MM/DD/YYYY')));
            $('#recurrence-EndDate').html((recuInfo[0]["EndDate"] == null ? '-' : moment(recuInfo[0]["EndDate"]).format('MM/DD/YYYY')));
            $('#frequency').html((recuInfo[0]["Frequency"] == null ? '-' : recuInfo[0]["Frequency"]));
        }
    }

    var BindReminderDetails = function () {
        var billInfo = $.parseJSON(billDetails[0]["Table"]);
        if (billInfo.length > 0 && billInfo[0]["IsReminder"] == '1') {

            $('#reminderState').html('' + (billInfo[0]["ReminderIntervalDay"] == null ? '-' : billInfo[0]["ReminderIntervalDay"]) + ' days ' + (billInfo[0]["ReminderIntervalName"] == null ? '-' : billInfo[0]["ReminderIntervalName"].toLowerCase()) + ' due date');
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
                html += ' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">';
                html += ' <span title="' + (item["FileName"] == null ? '-' : item["FileName"]) + '">' + (item["FileName"] == null ? '-' : item["FileName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
                html += ' <a class="isc-action-badge-td-s1"  data-Open-File="' + (item["PhysicalFileName"] == null ? '' : item["PhysicalFileName"]) + '"><i class="fa fa-eye"></i></a>';
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
                //html += ' <div class="screen-row">';
                //html += ' <div class="div-col-15per"><img src="img/appfinal/48.jpg" class="isc-vnd-img-nts">';
                //html += ' <h5 style="font-weight:400;font-size:11px;" title="' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '"> ' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '</h5>';
                //html += ' </div>';
                //html += ' <div class="div-col-85per">';
                //html += ' <h6 class="isc-vnd-edt-cht-tm">' + (item["CreatedOn"] == null ? '-' : item["CreatedOn"]) + '</h6>';
                //html += ' <div class="">';
                //html += ' <p style="margin:2px 0px;">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
                //html += ' </div>';
                //html += ' </div>';
                //html += ' </div>';

                html += '<p class="isc-crt-bill-nt">';
                html += '<i class="fa fa-circle" style="font-size: 8px !important; padding-right:5px" data-Notes="' + (item["Comment"] == null ? '-' : item["Comment"]) + '" data-CommentOn="' + moment().format('llll') + '">';
                html += '</i>' + (item["Comment"] == null ? '-' : item["Comment"]) + '<span class="isc-crt-bill-ownr" style="color: green !important;">' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["FirstName"] == null ? '' : item["LastName"])) + ',</span>';
                html += '<span class="isc-crt-bill-ownr">' + moment().format('llll') + '</span></p>';
            });
        }
        else {
            html += '<h5>No Data Found</h5>'
        }
        $el.html(html);
    }

    var AmountBlockBinding = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        if (BillInfo != null && BillInfo.length > 0) {
            $('#balance-Amount').val("$" + (BillInfo[0]["Balance"] == null || Math.sign(parseFloat(BillInfo[0]["Balance"])) == -1 ? 0 : parseFloat(BillInfo[0]["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            balanceAmount = BillInfo[0]["Balance"];
        }
        var approversList = $.parseJSON(billDetails[3]["Table3"]);
        if (approversList.length > 0) {
            approversList = ObjSorter(approversList, 'Sequence', '123');
            var firstApprover = approversList[0]["ApproverID"]
            if (parseInt(firstApprover) != AccountID) {
                $('#approved-Amount').prop('disabled', true);
                subtractedAmount = BillInfo[0]["Balance"];
                $('#approved-Amount').val((BillInfo[0]["ApprovedAmount"] == null || Math.sign(parseFloat(BillInfo[0]["ApprovedAmount"])) == -1 ? 0 : parseFloat(BillInfo[0]["ApprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")))
            }
            else {
                $('#approved-Amount').prop('disabled', false);
            }
        }
    }

    var BindApproverHistory = function () {
        var $el = $('#tbl-ApproverHistory-Body');
        var html = '';
        var approverHistory = $.parseJSON(billDetails[7]["Table7"]);

        if (approverHistory.length > 0) {
            approverHistory = ObjSorter(approverHistory, 'ApproveHistoryID', '123');
            $.each(approverHistory, function (index, item) {
                var approvedAmount = (item["ApprovedAmount"] == null ? 0.00 : item["ApprovedAmount"].replace(/,/g, ''));

                approvedAmount = parseFloat(approvedAmount);
                var balanceAmount = (item["Balance"] == null ? 0.00 : item["Balance"].replace(/,/g, ''));

                balanceAmount = parseFloat(balanceAmount);
                var approverName=''
                if (item["ApproverID"] != "0") {
                    approverName = ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"]));
                }
                else {
                    approverName = "Auto Approved ";
                }
                html += '<tr class="" role="row">';
                html += '<td style="width: 33.33%;">';
                html += '<h2 title="' + approverName + '"><a >' + approverName + '</a></h2>';
                html += '<h6 class="" >' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format('MM/DD/YYYY')) + '</h6></td>';
                html += '<td style="width: 33.33%;">';
                html += '<h2 title="' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h2>';
                html += '<h6 class="">Balance: ' + (balanceAmount == "" || balanceAmount == NaN ? '-' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h6>';
                html += '</td><td class="text-center" style="width: 20%;">';
                html += '<h4 class="isc-app-det-hst-app">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</h4></td>';
                html += '<td style="width:10%;">';
                html += '<a class="isc-action-badge-td-s1" title="Comment"  data-History=' + item["ApproveHistoryID"] + '><i class="fa fa-comment-o"></i></a>';
                html += '</td>';
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
      //  var recentPayments = [];
         var recentPayments = $.parseJSON(billDetails[8]["Table8"]);
        if (recentPayments != null && recentPayments.length > 0) {
            $.each(recentPayments, function (index, item) {
                var payableAmount = item["PayableAmount"].replace(/,/g, '');
                payableAmount = parseFloat(payableAmount);
                html += '<tr><td><h5 title="' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</h5></td>';
                html += '<td><h5 title="' + (item["PaidOn"] == null || item["PaidOn"] ==''? "-" : moment(item["PaidOn"]).format("MM/DD/YYYY")) + '">' + (item["PaidOn"] == null || item["PaidOn"]=='' ? "-" : moment(item["PaidOn"]).format("MM/DD/YYYY")) + '</h5></td>';
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
            var iframe = document.getElementById("attachment_Frame");
            if (null !== iframe) {
                document.body.removeChild(iframe);
            }
            else {
                var iframe = document.createElement("iframe");
                iframe.id = "attachment_Frame";
                var iframewidth = 390;
                iframe.src = filePathUrl + fileImage;
                iframe.className = 'isc-new-exp-pdf';
                iframe.setAttribute("style", "border: none; width: 100%; height: 470px; overflow: hidden; overflow-y: auto;")
                $('#billFrameBlock').append(iframe);
            }
        }
        else {
            $('#file-Message').show();
        }
    }
}

//Data Manipulation
{
    var GetBillDetails = function () {
        var _obj = {
            'billId': parseInt(approveBillId),
            'payBillId':parseInt(payBillId)
        };

        var tempList = {};
        $.when(RequestServer("Bill_PaymentDetails.aspx/GetBillDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ProcessBill = function (actionKey) {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        var status = 0;
        var paymentStatus=0;

        if (actionKey == 1) {
            status = 50018
            paymentStatus = 50025
        }
        else {
            status = 50036
            paymentStatus = 50033
        }
        var _obj = {
            'ActionKey': actionKey,
            'BillId': approveBillId,
            'ApproveBillId': payBillId,
            'DisputeComment':$.trim($('#txt-Dispute-Reason').val()),
            'Status': status,
            'paymentStatus': paymentStatus,
            'LastApprover': (BillInfo[0]["LastApprover"] == null ? 0 : parseInt(BillInfo[0]["LastApprover"])),
            'InvoiceNumber': (BillInfo[0]["InvoiceNumber"] == null ? 0 : BillInfo[0]["InvoiceNumber"]),
            'CreatedBy': (BillInfo[0]["CreatedBy"] == null ? 0 : parseInt(BillInfo[0]["CreatedBy"])),
            'CreatedByName': (BillInfo[0]["CreatedByName"] == null ? '' :BillInfo[0]["CreatedByName"]),
            'PayerName': ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + ' ' + (loggerDetails["LastName"] == null ? ' ' : loggerDetails["LastName"]))
            
        };
        var billObject = {
            'BillObject':_obj
        }

        var tempList = {};
        $.when(RequestServer("Bill_PaymentDetails.aspx/BillPaymentProcess", billObject)).done(function (response) {
            if (actionKey == 1) {
                //Flag
                if (parseInt(response) > 0) {
                    $.notify("Bill flagged successfully !!", { position: "right top", className: "success" });
                    GoBack();
                }
                else {
                    $.notify("Server error occured while flagging a bill !!", { position: "right top", className: "error" });
                }

            }
            else {
                //dispute
                if (parseInt(response) > 0) {
                    $.notify("Bill disputed successfully !!", { position: "right top", className: "success" });
                    GoBack();
                }
                else {
                    $.notify("Server error occured while disputing a bill !!", { position: "right top", className: "error" });
                }

            }
        });
      
       // return tempList;
    }
}

//Common
{

    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');

            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 2000);
    }

    var DisableProperties = function () {
        $('#btn-Dispute').hide();
        $('#pay-btn').hide();
        $('[data-Submit]').hide();
        $('#mPaid-btn').hide();
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

//Mark As Paid Block
{
    //Events
    {

        $(document).on('change', '#browse-Documents', function () {
            var Files = $(this).prop("files");
            fileContainer = [];
            var type = Files[0]["type"];
            const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
            fileContainer.push(Files[0])
            fileSize = size;
            billFileID = 0;

        });

        $(document).on('click', '#add-Documents', function () {
            saveFiles(fileContainer);
            BindBillDocument();
            $('#browse-Documents').val('');
            fileResponse = [];
            fileContainer = [];
        });

        $(document).on('click', '[data-Open-Paid-File]', function () {
            var fileName = $(this).attr('data-Open-Paid-File');

            if (fileName != '') {
                window.open(paidBillDocs + fileName, '');
            }
        });

        $(document).on('click', '[data-Delete]', function () {
            $(this).parents('tr').remove();
        });

        $(document).on('click', '#mPaid-btn', function () {
            var $this = $(this);
            ClearMarkASPaidFields();
            $('#mark-As-Paid').attr('data-MBillID', approveBillId);
            $('#mark-As-Paid').attr('data-MApprovedBillID', payBillId);
            $('#lbl-Vendor').html($('#vendor-Name').html());
            $('#lbl-Invoice-Number').html($('#invoice-Number').html());
            $('#lbl-Due').html($('#due-Date').html());
            $('#lbl-Amount').html($('#bill-Amount').html());
            var Totalamount = ($('#bill-Amount').html())
            $('#txt-PaidAmnt').val(Totalamount. replace("$",""));
            $('#txt-DueAmnt').val("0");

            var $modal = $('#mp_paid');
            $modal.modal('show');

        });

        $(document).on('click', '#mark-As-Paid', function () {
            
            if (ValidateMarkAsPaid() && $("span[error-active='true']").length == 0) {
                MarkBillAsPaid();
            }
        });

        $(document).on('click', '[data-Cancel-Pay]', function () {
            var $modal = $('#mp_paid');
            $modal.modal('hide');
            ClearMarkASPaidFields();

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

        $(document).on('change', '[data-textbox]', function () {
            var $this = $(this);
            var VAL = $this.val();
            var pattern = /^[a-zA-Z' ]*$/;
            if (pattern.test(VAL)) {
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
            }
            else {
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").show();
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', true);
            }

        });

    }

    //Data
    {
        var saveFiles = function (fileContainer) {
            var response = '';

            if (fileContainer.length > 0) {
                fileResponse = [];
                var data = new FormData();
                data.append("Folder", 0);
                data.append("key", fileContainer[0]);
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "BillPaidDocuments.ashx",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        fileResponse = result;
                    },
                    error: function (jqXHR, error, errorThrown) {
                        var error = e;
                    },
                    xhr: function (evt) {
                        var filexhr = $.ajaxSettings.xhr();
                        return filexhr;
                    }
                });
            }
            return fileResponse;
        }

        var MarkBillAsPaid = function () {
            var paidAmount = $('#txt-PaidAmnt').val();
            paidAmount = paidAmount.replace(/,/g, '');
            paidAmount = parseFloat(paidAmount);

            var dueAmount = $('#txt-DueAmnt').val();
            dueAmount = dueAmount.replace(/,/g, '');
            parseFloat(dueAmount == '' ? 0.00 : dueAmount);
            var objAttachmentList = [];

            //Load Attchment list in obj
            var billAttachmentList = $('#tbl-PaidBill-Attachments  tr');
            if (billAttachmentList.length > 0) {
                $.each(billAttachmentList, function (index, item) {
                    var fileName = $(item).find('[data-fileName]').attr('data-fileName');
                    var physicalFileName = $(item).find('[data-file-PhyName]').attr('data-file-PhyName');
                    var size = $(item).find('[data-file-Size]').attr('data-file-Size');
                    var physicalPath = $(item).find('[data-phy-Location]').attr('data-phy-Location');
                    var extension = $(item).find('[data-extension]').attr('data-extension');
                    var objAttachment = {
                        'FileName': fileName,
                        'PhysicalFileName': physicalFileName,
                        'Size': size,
                        'PhysicalPath': physicalPath,
                        'Extension': extension,
                    }
                    objAttachmentList.push(objAttachment);
                })
            }
           
           
            var obj = {
                'BillId': parseInt($('#mark-As-Paid').attr('data-MBillID')),
                'ApproveBillId': parseInt($('#mark-As-Paid').attr('data-MApprovedBillID')),
                'PaidAmount': paidAmount,
                'DueAmount': dueAmount,
                'PaymentMode': "",
                'TypeOfPayment': parseInt($('#slt-PaymentMode').val()),
                'ReferenceID': $('#txt-Ref').val(),
                'PaidOn': moment($('#txt-PaidOn').val()).format('MM/DD/YYYY'),
                'AttachmentList': objAttachmentList,
                'InvoiceNo': $('#lbl-Invoice-Number').html()
                   
               
            }
            var billObj = {
                'payDetails': obj
            }
            var tempList = {};
            $.when(RequestServer("Bill_PaymentSummary.aspx/BillMarkAsPaid", billObj)).done(function (response) {

                if (parseInt(response) > 0) {

                    var $modal = $('#mp_paid');
                    $modal.modal('hide');
                    ClearMarkASPaidFields();
                    $.notify("Bill marked as paid !!", { position: "right top", className: "success" });
                    window.location.href = 'Bill_PaymentSummary.aspx';
                    //GoBack();
                    
                }
                else {
                    $.notify("Server error occured while processing a bill !!", { position: "right top", className: "error" });
                }
            });
        }
    }

    // DOM
    {

        var BindBillDocument = function () {
            var html = '';
            var $el = $('#tbl-PaidBill-Attachments');

            html += '<tr style="cursor: pointer;">';
            html += '<td style="width: 10%; text-align: center;"  data-fileName="' + fileResponse['FileDisplayName'] + '">';
            html += '<i class="fa fa-file-o isc-pdf-red"  data-Open-Paid-File="' + (fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"]) + '"></i>';
            html += '</td>';
            html += '<td style="width: 45%;">';
            html += '<h4 data-file-PhyName="' + fileResponse['ModifiedFileName'] + '" data-phy-Location="' + fileResponse['PhysicalLocation'] + '" title="' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '">' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + ' </h4>';
            html += '</td>';
            html += '<td style="width: 10%; text-align: center;">';
            html += '<i title="Remove" style="cursor:pointer;" data-Delete="true" data-file-Size="' + fileContainer[0]["size"] + '" data-extension="' + fileContainer[0]["type"] + '" class="fa fa-times-circle pad-lft-min isc-act-clr"></i>';
            html += '</td>';
            html += '</tr>';


            //var title = "Uploaded On: " + moment().format('MM/DD/YYYY') + " Uploaded By:" + ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + " " + (loggerDetails["LastName"] == null ? '' : loggerDetails["LastName"])) + ""
            //html += ' <tr data-Empty-Document-Row="false"><td><h5 title="' + title + '" data-fileName="' + fileResponse['FileDisplayName'] + '">';
            //html += ' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;" data-file-PhyName="' + fileResponse['ModifiedFileName'] + '" data-phy-Location="' + fileResponse['PhysicalLocation'] + '">';
            //html += ' <span title="' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '" >' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
            //html += ' <a data-file-Size="' + fileContainer[0]["size"] + '" class="isc-action-badge-td-s1" data-Open-File="' + (fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"]) + '" title="View" ><i class="fa fa-eye"></i></a>';
            //html += ' <a data-extension="' + fileContainer[0]["type"] + '" class="isc-action-badge-td-s1" data-Delete-Bill="' + billFileID + '" title="Delete"><i class="fa fa-trash-o"></i></a>'
            //html += ' </div></td></tr>';
            $el.append(html);
        }

    }

    //Common
    {
        var ClearMarkASPaidFields = function () {
            $('#txt-PaymentMode').val('');
            $('#txt-PaidOn').val('');
            $('#txt-Ref').val('');
            $('#txt-PaidAmnt').val('');
            $('#txt-DueAmnt').val('');
            $('#tbl-PaidBill-Attachments').html('');
            $('#browse-Documents').val('');
            fileResponse = [];
            fileContainer = [];
            $("span.validation-message").attr('error-active', false);
            $("span.validation-message").hide();
            $('#slt-PaymentMode').val('0');
            $('#slt-PaymentMode').select2();
        }

        var ValidateMarkAsPaid = function () {
            var isValid = true;
            var paymentMode = $.trim($('#txt-PaymentMode').val());
            var refNo = $.trim($('#txt-Ref').val());
            var paidOn = $.trim($('#txt-PaidOn').val());
            var paidAmnt = $.trim($('#txt-PaidAmnt').val());
            var docList = $('#tbl-PaidBill-Attachments tr');
            var typeOfPayment = $('#slt-PaymentMode').val();
            var payableAmount = $('#lbl-Amount').html();
            payableAmount = payableAmount.replace('$', '');
            payableAmount = payableAmount.replace(/,/g, '');
            payableAmount = parseFloat(payableAmount);
            var dueAmnt = $('#txt-DueAmnt').val();

            //if (paymentMode == "") {
            //    isValid = false;
            //    $.notify("Payment Mode should not be empty.", { position: "right top", className: "error" });
            //}
            if (typeOfPayment == "0" || typeOfPayment == null) {
                isValid = false;
                $.notify("Payment Mode should not be empty.", { position: "right top", className: "error" });
            }
            //if (refNo == "") {
            //    isValid = false;
            //    $.notify("Reference Number should not be empty.", { position: "right top", className: "error" });
            //}
            if (paidOn == "") {
                isValid = false;
                $.notify("Paid On should not be empty.", { position: "right top", className: "error" })
            }
            if (paidAmnt == "") {
                isValid = false;
                $.notify("Amount Paid should not be empty.", { position: "right top", className: "error" });
            }
            if (dueAmnt == "") {
                isValid = false;
                $.notify("Amount Due should not be empty.", { position: "right top", className: "error" });
            }
            //if (docList.length == 0) {
            //    isValid = false;
            //    $.notify("Attachment should not be empty.", { position: "right top", className: "error" });
            //}

            if (paidAmnt != '') {
                paidAmnt = paidAmnt.replace(/,/g, '');
                paidAmnt = parseFloat(paidAmnt);
                if (paidAmnt > payableAmount) {
                    isValid = false;
                    $.notify("Paid amount should not be greater than payable amount.", { position: "right top", className: "error" });
                }

            }

            if (dueAmnt != '') {
                dueAmnt = dueAmnt.replace(/,/g, '');
                dueAmnt = parseFloat(dueAmnt);
                var addedamount = paidAmnt + dueAmnt;
                if (addedamount != payableAmount) {
                    isValid = false;
                    $.notify("Amount due should not exceed the total.", { position: "right top", className: "error" });
                }
            }

            return isValid;

        }

    }


}

//PaymentDetails Rendering
{
    $(document).on('click', '[data-Open-PaidFile]', function () {
        var fileName = $(this).attr('data-Open-PaidFile');

        if (fileName != '') {
            window.open(paidBillDocs + fileName, '');
        }
    });

    $(document).on('click', '[data-Delete-PaidFile]', function () {
        var docID = $(this).attr('data-Delete-PaidFile');
        DeletePaidBillAttachment(parseInt(docID));
        $(this).parents('tr').remove();
        
    });

    $(document).on('change', '#add-Document', function () {
        var Files = $(this).prop("files");
        $loading.show();
        setTimeout(function () {
        fileContainer = [];
        var type = Files[0]["type"];
        const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
        fileContainer.push(Files[0])
        fileSize = size;
        billFileID = 0;
        saveFiles(fileContainer);
        SavePaidBillDoc();
        $('#add-Document').val('');
        fileResponse = [];
        fileContainer = [];
        BuildApproveScreen();
        $loading.hide();
        }, 0);

    });

    var BindPaymentDetails = function () {
        var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        if (BillInfo != null && BillInfo.length > 0) {
            $('#lbl-PayableAmount').html($('#bill-Amount').html());
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

    var DeletePaidBillAttachment = function (docID) {
        var obj = {
            'docID': docID,
            'billApprovedID': payBillId
        }
        var tempList = {};
        $.when(RequestServer("Bill_PaymentDetails.aspx/DeleteAttachment", obj)).done(function (response) {

            if (parseInt(response) > 0) {
                $.notify("File deleted successfully !!", { position: "right top", className: "success" });

            }
            else {
                $.notify("server error occured while deleting the file  !!", { position: "right top", className: "error" });
            }
        });
    }

    var SavePaidBillDoc = function () {
        //Load Attchment list in obj
        var  objAttachmentList = [];
        var billAttachmentList = $('#tbl-PaidBill-Attachments  tr');
        var objAttachment = {
            'FileName': (fileResponse['FileDisplayName'] == null ? '' : fileResponse['FileDisplayName']),
            'PhysicalFileName': (fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"]),
            'Size':fileContainer[0]["size"],
            'PhysicalPath': (fileResponse["PhysicalLocation"] == null ? '' : fileResponse["PhysicalLocation"]),
            'Extension': fileContainer[0]["type"]
         }
                objAttachmentList.push(objAttachment);       
        var obj = {
            'BillId': approveBillId,
            'ApproveBillId':payBillId,
            'PaidAmount': 0.00,
            'DueAmount': 0.00,
            'PaymentMode': '',
            'ReferenceID':'',
            'PaidOn': moment().format('MM/DD/YYYY'),
            'AttachmentList': objAttachmentList
        }
        var billObj = {
            'payDetails': obj
        }
        var tempList = {};
        $.when(RequestServer("Bill_PaymentDetails.aspx/SavePaidBillAttachments", billObj)).done(function (response) {

            if (parseInt(response) > 0) {

                
                $.notify("Attatchment added successfully !!", { position: "right top", className: "success" });
                $('#add-Document').val('');
                fileResponse = [];
                fileContainer = [];
               
            }
            else {
                $.notify("Server error occured while processing a bill !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetIsDwollaConnected = function () {
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/IsDwollaConnected", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;
    }
}

$("#txt-PaidAmnt").keyup(function () {
    
    var BillInfo = $.parseJSON(billDetails[0]["Table"]);
    var Totamamount = BillInfo[0]["Amount"];
    var Paidamount = $("#txt-PaidAmnt").val().replace(",", "");
    var total = (parseFloat(Totamamount) - (parseFloat(Paidamount)));
    if (total > 0) {
        $("#txt-DueAmnt").val((Math.round(total * 100) / 100).toFixed(2));
    }
    else {
        if (parseFloat(Paidamount) > parseFloat(Totamamount)) {
            $("#txt-PaidAmnt").val("")
        }
        if (parseFloat(Paidamount) == parseFloat(Totamamount)) {
            $("#txt-DueAmnt").val(total);
            $("#txt-PaidAmnt").val(Paidamount)
        }
        else {
            $("#txt-DueAmnt").val(BillInfo[0]["Amount"]);
        }
        
    }
});