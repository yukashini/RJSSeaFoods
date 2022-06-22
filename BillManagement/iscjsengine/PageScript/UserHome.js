//GLOBAL VARIABLES
{
    var screenData = [];
    var masterData = [];
    var filterdBillList = [];
    var matchedPendingSubmissionList = [];
    var DeleteBillId = 0;

}

//LOAD && EVENTS
{
    $(document).ready(function () {
         $loading.show();
         setTimeout(function () {
             SetSession('selectedMenu', 1)
             SetActiveMenu();
        BuildScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-status]', function () {
        var status = $(this).attr('data-status');
        if (status != "0") {
            var matchedStatusBills = GetmatchedRecord(filterdBillList, "Status", status);
            matchedPendingSubmissionList = filterdBillList;
            BindBills(matchedStatusBills);

        }
        else {
            matchedPendingSubmissionList = filterdBillList;
            BindBills(filterdBillList);
        }
    });

    $(document).on('click', '#btn-search', function () {
        $loading.show();
        setTimeout(function () {
        filterdBillList = GetBillListFilter();
        matchedPendingSubmissionList = filterdBillList;
        BindKpi(filterdBillList);
        BindBills(filterdBillList);

        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-reset', function () {
        $loading.show();
        setTimeout(function () {
        BindMasterData();
        $('#slt-vendor option[value="0"]').prop('selected', 'selected').change();
        $('#slt-Bills option[value="0"]').prop('selected', 'selected').change();
        $('#slt-status option[value="0"]').prop('selected', 'selected').change();
        $('#date-range').val('');
        filterdBillList = GetBillListFilter();
        BindKpi(filterdBillList);
        matchedPendingSubmissionList = GetmatchedRecord(screenData, "Status", 50019);

        BindBills(matchedPendingSubmissionList);
        $loading.hide();
    }, 0);
    })

    $(document).on('click', 'th[data-sort]', function (e) {
        var $this = $(this).parents('table');
        if ($('th[data-sort]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
            //var tablegroupby = 'Entityname'
            // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
            var columngroupby = $(this).attr('data-sort');
            var columType = $(this).attr('sort-column-Type');
            var sortingdefaulticon = "img/appimages/Sorting-icon-default.png";
            var sortingascendingicon = "img/appimages/Sorting-icon-asc.png";
            var sortingdescendingicon = "img/appimages/Sorting-icon-desc.png";

        }

        // Get Active sort order
        {
            var activesortorder = "default";
            if ($(this).hasClass('sorting-default'))
                activesortorder = "default";
            else if ($(this).hasClass('sorting-asc'))
                activesortorder = "asc";
            else if ($(this).hasClass('sorting-desc'))
                activesortorder = "desc";
        }

        // Restore all to default
        {
            $this.find('thead th').removeClass('sorting-asc sorting-desc').addClass('sorting-default');
            $this.find('thead th').find('img').attr('src', sortingdefaulticon);
            var currentSortOrder = "asc";
        }

        // Change Icon and Class
        {
            if (activesortorder === "default") {
                $('#userHomeTable th[sort-column-Type]').removeClass('headerSortDown');
                $('#userHomeTable th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#userHomeTable th[sort-column-Type]').removeClass('headerSortDown');
                $('#userHomeTable th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#userHomeTable th[sort-column-Type]').removeClass('headerSortDown');
                $('#userHomeTable th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-desc headerSortUp').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";

            }
        }

        // Sort it and Render List
        {
            //$loading.show();
            //setTimeout(function () {
            // Sort it by Default Groupby and then by Column
            var lstResult = matchedPendingSubmissionList

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorter(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorter(lstResult, columngroupby, '321');
            }
            else if (columType == 'date') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
            }


            // Render List
            {
                BindBills(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[data-bill-Delete]', function () {
        DeleteBillId = $(this).attr('data-bill-Delete');
        if (DeleteBillId != undefined) {
            $('#mp_bill_Delete').show();
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
        DeleteBillId = parseInt(DeleteBillId);
        DeletePendingSubmissionBill(DeleteBillId);
        BuildScreen();
        $('#mp_bill_Delete').hide();
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[delete-cancel]', function () {

        DeleteBillId = 0;

        $('#mp_bill_Delete').hide();
    })

    $(document).on('click', '[data-bill-View]', function () {
        //$loading.show();
        //setTimeout(function () {
        var attachmentBillId = $(this).attr('data-bill-View');
        if (attachmentBillId != undefined) {
            attachmentBillId = parseInt(attachmentBillId);
            var attatchmentDetails = GetBillAttachment(attachmentBillId);
            attatchmentDetails = $.parseJSON(attatchmentDetails[0]['Table']);
            if (attatchmentDetails[0]["FileName"] != null && attatchmentDetails[0]["FileName"] != "") {
                $('#fileName').text(attatchmentDetails[0]["FileDisplayName"] == null ? '-' : attatchmentDetails[0]["FileDisplayName"]);
                $('#fileName').prop('title', attatchmentDetails[0]["FileDisplayName"] == null ? '-' : attatchmentDetails[0]["FileDisplayName"])
                BillAttatchmentFrame(attatchmentDetails[0]["FileName"]);
                $('#mp_bill-view').show();
            }
            else {
                $.notify("There is no attachment for this bill", { position: "right top", className: "error" });
            }
        }
        //$loading.hide();
        //}, 0);

    });

    $(document).on('click', '#attachment-close', function () {

        $('#mp_bill-view').hide();
    });

}

//DOM MANIPULATION
{
    var BuildScreen = function () {
        masterData = GetMasterdata();
        var totalBills = $.parseJSON(masterData[8]["Table8"]);
        var unapprovedBills = $.parseJSON(masterData[5]["Table5"]);
        var approvedBills = $.parseJSON(masterData[4]["Table4"]);
        var rejectedBills = $.parseJSON(masterData[6]["Table6"]);;
        $('#total_Bills').html(totalBills[0]["TotalBillCount"] == null ? 0 : totalBills[0]["TotalBillCount"]);
        $('#unapproved_bills').html(unapprovedBills[0]["PendingCount"] == null ? 0 : unapprovedBills[0]["PendingCount"]);
        $('#approved_Bills').html(approvedBills[0]["ApprovedCount"] == null ? 0 : approvedBills[0]["ApprovedCount"]);
        $('#rejected_Bills').html(rejectedBills[0]["RejectedCount"] == null ? 0 : rejectedBills[0]["RejectedCount"]);
        BindMasterData();
        screenData = GetBillData();
        screenData = $.parseJSON(screenData[0]["Table"]);
        filterdBillList = screenData;
        BindKpi(screenData);
        matchedPendingSubmissionList = GetmatchedRecord(screenData, "Status", 50019);
        BindBills(matchedPendingSubmissionList);
    }

    var BindMasterData = function (filterData) {

        BindVendor($('#slt-vendor'), $.parseJSON(masterData[0]["Table"]), 'Choose Vendor');
        BindBill($('#slt-Bills'), $.parseJSON(masterData[1]["Table1"]), 'Choose Bill/Invoice');
        BindDropDowns($('#slt-status'), $.parseJSON(masterData[2]["Table2"]), 'Choose Status');
        $('#date-range').mask('00/00/0000');
    }

    var BindKpi = function (dataList) {
        var html = "";
        var $el = $('#bill_KPI');
        if (dataList.length > 0) {
            var distinctedBillStatus = GetDistinctArray(dataList, "Status");
            var PendingSubmission = GetmatchedRecord(dataList, "Status", 50019);
            var ApprovalPending = GetmatchedRecord(dataList, "Status", 50016);
            var Rejected = GetmatchedRecord(dataList, "Status", 50017);
            html += '<li class="active" groupview-type="true" data-status="50019">';
            html += '<a href="#ScrTab1"  data-toggle="tab" title="Draft Bills/Invoice">Draft Bills/Invoice';
            html += '<span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">' + PendingSubmission.length + '</span>';
            html += '</a></li>';
            html += '<li class="" data-status="50016" groupview-type="true">';
            html += '<a href="#ScrTab1" title="Follow up/Invoice"  data-toggle="tab" >Follow up/Invoice';
            html += '<span style="background-color: #00B0F0 ; border-color: #00B0F0 ; color: #fff;">' + ApprovalPending.length + '</span>';
            html += '</a></li>';
            html += '<li class="" data-status="50017" groupview-type="true">';
            html += '<a href="#ScrTab1" title="Rejected/Invoice"  data-toggle="tab" >Rejected/Invoice';
            html += '<span style="background-color:#f93737; border-color: #f93737; color: #fff;">' + Rejected.length + '</span>';
            html += '</a></li>';
            //$.each(distinctedBillStatus, function (index, item) {

            //    switch(item["Status"])
            //    {
            //        case '50019':
            //            var matchedPendingSubmission = GetmatchedRecord(dataList, "Status", item["Status"]);
            //            html += '<li class="active" data-status=' + item["Status"] + '>';
            //            html += '<a href="#ScrTab1"  data-toggle="tab" title=Draft Bills/Invoice>Draft Bills/Invoice';
            //            html += '<span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">' + matchedPendingSubmission.length + '</span>';
            //            html += '</a></li>';
            //            break;

            //        case '50016':
            //            var matchedPendingApprovalPending = GetmatchedRecord(dataList, "Status", item["Status"]);
            //            html += '<li class="" data-status=' + item["Status"] + '>';
            //            html += '<a href="#ScrTab1"  data-toggle="tab" >Follow up/Invoice';
            //            html += '<span style="background-color: #00B0F0 ; border-color: #00B0F0 ; color: #fff;">' + matchedPendingApprovalPending.length + '</span>';
            //            html += '</a></li>';
            //            break;

            //        case '50017':
            //            var matchedRejected = GetmatchedRecord(dataList, "Status", item["Status"]);
            //            html += '<li class="" data-status=' + item["Status"] + '>';
            //            html += '<a href="#ScrTab1"  data-toggle="tab" >Rejected/Invoice';
            //            html += '<span style="background-color:#f93737; border-color: #f93737; color: #fff;">' + matchedRejected.length + '</span>';
            //            html += '</a></li>';
            //            break;
            //    }

            //    //html += '<li class="" data-status=' + item["Status"] + '>';
            //    //html += '<a href="#ScrTab1"  data-toggle="tab" title=' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '>' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '';
            //    //html += '<span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">' + matchedStatusBills.length + '</span>';
            //    //html += '</a></li>';
            //})

        }
        else {
            html += '<li class="active" groupview-type="true" data-status="50019">';
            html += '<a href="#ScrTab1"  data-toggle="tab" title="Draft Bills/Invoice">Draft Bills/Invoice';
            html += '<span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">0</span>';
            html += '</a></li>';
            html += '<li class="" data-status="50016" groupview-type="true">';
            html += '<a href="#ScrTab1" title="Follow up/Invoice" data-toggle="tab" >Follow up/Invoice';
            html += '<span style="background-color: #00B0F0 ; border-color: #00B0F0 ; color: #fff;">0</span>';
            html += '</a></li>';
            html += '<li class="" data-status="50017" groupview-type="true">';
            html += '<a href="#ScrTab1" title="Rejected/Invoice"  data-toggle="tab" >Rejected/Invoice';
            html += '<span style="background-color:#f93737; border-color: #f93737; color: #fff;">0</span>';
            html += '</a></li>';
        }
        $el.html(html);
    }

    var BindBills = function (billData) {
        var html = '';
        var $el = $('#tbl-bill-body');
        var ActiveGroupvalue = $('[groupview-type].active').attr('data-status');
        billData = GetmatchedRecord(billData, "Status", parseInt(ActiveGroupvalue));
        if (billData.length > 0) {
            $.each(billData, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                var dollerAmount = 0;
                if (item["Amount"] != "" && item["Amount"] != null) {
                    dollerAmount = $(item["Amount"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["Amount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html += '<tr class="isc-table-toggle-child" style="display: table-row;" role="row">';
                html += '<td><h5><a href="UploadBills.aspx?BillID=' + item["BillID"] + ' " title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + ' </a></h5></td>';
               
                html += '<td><h5 class="">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5></td>';
               
                html += '<td> <h5 class="" title=' + (item["Description"] == null ? '-' : item["Description"]) + '>' + (item["Description"] == null ? '-' : item["Description"]) + '</td>';
                if (moment(today) <= dueDay) {
                    html += '<td><h4  title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h4></td>';
                }
                else {
                    html += '<td><h4 style="color:red !important;" title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h4></td>';
                }

                html += '<td title=' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '> <h5>' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</h5></td>';
                //
                html += '<td><h5 style="text-align:right;">' + (amount == "" || amount==NaN ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>';
                html += '<td style="text-align:center;">';

                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-bill-View="' + item["BillID"] + '" title="View Bill"><i class="fa fa-paperclip"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5"  data-bill-Edit="' + item["BillID"] + '" title="Edit" href="UploadBills.aspx?BillID=' + item["BillID"] + ' "><i class="fa fa-pencil-square-o"></i></a>';

                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-bill-Delete="' + item["BillID"] + '" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>';
                html += '</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<p>No data found</p>';
        }
        $el.html(html);
    }

    var BillAttatchmentFrame = function (fileImage) {
        $('#billFrameBlock').html('');
        var iframe = document.getElementById("attachment_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "attachment_Frame";
            var iframewidth = 390;
            iframe.src = filePathUrl + fileImage;
            // iframe.src = "http://localhost:49504/images/FileBills/".concat(fileImage);
            //iframe.src = "http://localhost:49504/images/FileBills/sample.pdf";
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 470px; overflow: hidden; overflow-y: auto;")
            $('#billFrameBlock').append(iframe);
        }
    }
}

//DATA MANIPULATION
{
    var GetMasterdata = function () {
        var _obj = {
            "clientID": 2000,
            "accountID": 30001
        }
        var tempList = {};
        $.when(RequestServer("UserHome.aspx/GetUserHomeMasterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetBillData = function () {
        var _obj = {
            "accountID": 30001
        }
        var tempList = {};
        $.when(RequestServer("UserHome.aspx/GetUserHomeBillData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeletePendingSubmissionBill = function (billID) {
        var _obj = {
            'billID': billID
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/DeleteBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        $.notify("Bill deleted successfully!!", {
            position: "right top", className: "success"
        });
        return tempList;
    }

    var GetBillAttachment = function (billId) {
        var _obj = {
            'billID': billId
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/GetBillAttachmentDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//COMMON
{
    var GetBillListFilter = function () {
        var $elVendor = $('#slt-vendor').val();
        var $elBills = $('#slt-Bills').val();
        var $elStatus = $('#slt-status').val();
        var $date = $('#date-range').val();
        var lstResult = [];
        if (screenData.length > 0) {
            lstResult = screenData;

            if ($elVendor != 0 && $elVendor != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["VendorID"] == $elVendor)
                });
            }

            if ($elBills != 0 && $elBills != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["InvoiceNumber"] == $elBills)
                });
            }

            if ($elStatus != 0 && $elStatus != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["Status"] == $elStatus)
                });
            }

            if ($date != 0 && $date != null && $date != "") {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (moment(a["DueDate"]).format('MM/DD/YYYY') == $date)
                });
            }

        }
        return lstResult;
    }

    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["KeyListID"] != 50018 && item["KeyListID"] != 50036) {
                    html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
                }

            });
        }
        $el.html(html);
    }

    var BindVendor = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'VendorID');
            distinctlst = ObjSorter(distinctlst, "VendorName", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                html += '<option value="' + item["VendorID"] + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var BindBill = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'BillID');
            distinctlst = ObjSorter(distinctlst, 'BillID', '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["InvoiceNumber"] != null && item["InvoiceNumber"] != "")
                {
                    html += '<option value="' + item["InvoiceNumber"] + '">' + (item["InvoiceNumber"] == null ? "-" : item["InvoiceNumber"]) + '</option>';
                }
                
               
            });
        }
        $el.html(html);
    }
}