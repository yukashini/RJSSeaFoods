//Gloabal Variables
{
    var billScreenData = [];
    var billScreenList = [];
    var billScreenKPI = [];
    var DeleteBillId = 0;
    var sortingList = [];
    var status = 0;
    var statusCondition = 0;
    var isRecurring = 0;
    var FilterStartDate = null;
    var FilterEndDate = null;
    var TabCountData = [];
    var KpiStatus = 0;
    var DVendor = 0;
    var DInvoice = '0';
    var DStatus = 0;
    var isOnload = 0;
    var isSearched = 0;
    var dataAllCount = 0;
    var invoiceno = '';
    var iSallbill = 0;
    var Command = "";
    var billId = 0;
    var Billstatus = '0';
    var BillrowID = 0;
    var lastcommand = "";
}

//Load & Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            RegisterDatepicker();
            $('.input-mini').mask('00/00/0000');
            $('#txt-DueRange').mask('00/00/0000 - 00/00/0000')
            BindBillScreen();
            isOnload = 1;
            //$('#txt-DueRange').val('');
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-Kpi]', function () {
        KpiStatus = parseInt($(this).attr('data-Kpi'));
        $loading.show()
        setTimeout(function () {
            isSearched = 0;
        $('#slt-Vendor').val(0);
        $('#slt-Invoice').val(0);
        $('#slt-Status').val(0);
        DVendor = 0
        DInvoice = '0'
        DStatus = 0;
        $('.select2').select2();
        $('#txt-DueRange').val('');
        BindBillScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#paid-Tab', function () {
       // var paidBills = GetmatchedRecord(billScreenList, 'Status', "50044");

        //sortingList = paidBills;
        //BindBillList(paidBills);
        status = 50044;
        statusCondition = 1;
        isRecurring = 0;
        BindUserBillList()
        //$('#paid-Count').html("(" + TabCountData.length + ")");
        
       
    });

    $(document).on('click', '#recurring-Tab', function () {
        //var recurringBills = GetmatchedRecord(billScreenList, 'IsRecurring', "1");
        //sortingList = recurringBills;
        //BindBillList(recurringBills);
        status = 0;
        statusCondition = 0;
        isRecurring = 1;
        BindUserBillList()
        //$('#recurring-Count').html("(" + TabCountData.length + ")");
    });

    $(document).on('click', '#unPaid-Tab', function () {
        //var unPaidBills = GetunmatchedRecord(billScreenList, 'Status', "50044");
        //sortingList = unPaidBills;
        //BindBillList(unPaidBills);
        status = 50044;
        statusCondition = 0;
        isRecurring = 0;
        BindUserBillList()
        //$('#up-Paid-Count').html("(" + TabCountData.length + ")");
    });
    $(document).on('click', '#Allbill-Tab', function () {
        //var unPaidBills = GetunmatchedRecord(billScreenList, 'Status', "50044");
        //sortingList = unPaidBills;
        //BindBillList(unPaidBills);
        status = 0;
        statusCondition = 0;
        isRecurring = 0;
        iSallbill = 0;
        BindUserBillList()
        //$('#up-Paid-Count').html("(" + TabCountData.length + ")");
    });
   
    $(document).on('click', '[data-bill-Delete]', function () {
        
        DeleteBillId = $(this).attr('data-bill-Delete');
        invoiceno = $(this).attr('data-bill-Invoiceno');
        if (DeleteBillId != undefined) {
            $('#mp_bill_Delete').show();
        }
    });
    $(document).on('click', '[data-bill-Split]', function () {
        SplitBillId = $(this).attr('data-bill-Split');
        var Spitlst = GetSplitList(SplitBillId);
        Splitlist(Spitlst);
        
    });
    var Splitlist = function (billList) {
        $('#tbl-Split-list').find('tbody').empty();
        var lstLead = common.AUF(billList["SplitBill"]);
        $.each(lstLead, function (index, item) {
            var amount = (item["Amount"] == null ? 0.00 : parseFloat(item["Amount"]));
            var row = '<tr><td> ' + (item["AccountName"] == null ? '-' : item["AccountName"]) + ' </td> <td> ' + item["Description"] + ' </td> <td style="text-align: center;">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</td></tr>'
            $("#tbl-Split-list tbody").append(row);
        });
        $(".split-amount").toggleClass("split-amount-show");
        $(".split-amount").parents(".slider").find(".settings-show").removeClass("settings-show");
    }
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteBillId = parseInt(DeleteBillId);
            DeletePendingSubmissionBill(DeleteBillId, invoiceno);
            BindBillScreen();
            $('#mp_bill_Delete').hide();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[delete-cancel]', function () {

        DeleteBillId = 0;

        $('#mp_bill_Delete').hide();
    });

    $(document).on('click', '#Check-all', function () {
        //e.preventDefault();

        if ($(this).is(':checked')) {
           // $('#tbl-Bills-Bdy input[type="checkbox"]').prop('checked', true)
            $('[data-Bills-Check]').prop('checked', true)
            $.uniform.update('[data-Bills-Check]')
        }
        else {
          //  $('#tbl-Bills-Bdy input[type="checkbox"]').prop('checked', false)
            $('[data-Bills-Check]').prop('checked', false)
            $.uniform.update('[data-Bills-Check]')
        }
    });

    $(document).on('click', '#submit', function () {
        if ($('#tbl-Bills-Bdy input[type="checkbox"]:checked').length > 0) {
            $('#mp_bill_Submit').show();
        }
        else {
           
            $.notify("Please select the pending submission bills to submit !!", { position: "right top", className: "error" });
        }
    
    });

    $(document).on('click', '[submit-cancel]', function () {
        $('#mp_bill_Submit').hide();
    });

    $(document).on('click', '#btn-submit-ok', function () {
        $loading.show();
        setTimeout(function () {
            SubmitBills();
            $('#mp_bill_Submit').hide();
        $('.select2').select2();
        $loading.hide();
        }, 0);
        });

    $(document).on('click', 'th[data-sort-Bill]', function (e) {
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
                $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');;
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = sortingList

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
                BindBillList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[data-Bills-Check]', function () {
        //var totalCheckBox = $('#tbl-Bills-Bdy input[type="checkbox"]').length;
        //var checkedCheckBox = $('#tbl-Bills-Bdy input[type="checkbox"]:checked').length;
        var totalCheckBox = $('[data-Bills-Check]').length;
        var checkedCheckBox =$('input[data-Bills-Check="true"]:checked').length;
        if ($(this).is(':checked')) {
            $(this).prop('checked', true)
            $.uniform.update(this)
        } else {
            $(this).prop('checked', false)
            $.uniform.update(this)
        }

        if (totalCheckBox == checkedCheckBox) {

            $('#Check-all').prop('checked', true)
            $.uniform.update('#Check-all')

        }
        else {
            $('#Check-all').prop('checked', false)
            $.uniform.update('#Check-all')
        }
    });

    $(document).on('click', '#Btn_serch', function () {
        
        $loading.show();
        setTimeout(function () {
            isSearched = 1;
            DVendor = parseInt($('#slt-Vendor').val());
            DInvoice = $('#slt-Invoice').val()
            DStatus = parseInt($('#slt-Status').val());
            KpiStatus = 0;
            if (DStatus == 50044) {
                statusCondition = 1;
                $('#bill-Tabs li').removeClass('active');
                $('#paid-Tab').addClass('active')
            }
            else {
                statusCondition = 0;
                $('#bill-Tabs li').removeClass('active');
                $('#unPaid-Tab').addClass('active');
            }

            //if (DStatus == 0) {
            //    status = 50044;
            //    statusCondition = 0;
            //}
         
            BindUserBillList();
            BindSearchedTabCounts();
            $loading.hide();
        }, 0);
        
    });

    $(document).on('click', '#btn_Reset', function () {
       
        RegisterDatepicker();
        $('.input-mini').mask('00/00/0000');
        $('#txt-DueRange').mask('00/00/0000 - 00/00/0000')
        if (isSearched ==1) {
            $loading.show();
            setTimeout(function () {
                isSearched = 0;
                $('#slt-Vendor').val(0);
                $('#slt-Invoice').val(0);
                $('#slt-Status').val(0);

                $('.select2').select2();
               // $('#txt-DueRange').val('');
                KpiStatus = 0;
                DVendor = 0
                DInvoice = '0'
                DStatus = 0;
                $('#bill-Tabs li').removeClass('active');
                $('#unPaid-Tab').addClass('active');
                statusCondition = 0;
                BindBillScreen();
                $loading.hide();
            }, 0);
        }
       

    })
}

//Dom Manipulation
{
    var BindBillScreen = function () {
        billScreenData = GetBillScreenData();
        if (billScreenData != null && billScreenData.length > 0) {
            billScreenList = $.parseJSON(billScreenData[0]["Table"]);
            billScreenKPI = $.parseJSON(billScreenData[1]["Table1"]);
            BindPermissionKeys();
 
            BindKPI();
            if (isOnload == 0) {
                BindMasterData();
            }
         
      
            status = 50044;
            statusCondition = 0;
            BindUserBillList();
            BindTabCounts(billScreenList);
            //var unPaidBills = GetunmatchedRecord(billScreenList, 'Status', "50044");
            //sortingList = unPaidBills;
            //BindBillList(unPaidBills);
            $("input:checkbox").uniform();
        }
    }

    var BindMasterData = function () {
        BindDropDowns($('#slt-Vendor'), $.parseJSON(billScreenData[2]["Table2"]), 'Choose Vendor')
      
        BindDropDowns($('#slt-Status'), $.parseJSON(billScreenData[3]["Table3"]), 'Choose Status')
        //$('#payment-Terms').val(50009);
        //$('#payment-Terms').select2();
        BindDropDowns($('#slt-Invoice'), $.parseJSON(billScreenData[4]["Table4"]), 'Choose Bill/Invoice #')
        //$('#payment-Terms').val(50009);
        //$('#payment-Terms').select2();
    }

    var BindKPI = function () {
        //Pending Submission
        $('#un-Submitted-Count').html((billScreenKPI[0]["PendingSubmissionBills"] == null ? 0 : billScreenKPI[0]["PendingSubmissionBills"]))

        
        $('#un-Submitted-Amount').html("$"+ (billScreenKPI[0]["PendingSubmissionAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["PendingSubmissionAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["PendingSubmissionAmount"]))));

        if (billScreenKPI[0]["CWeekPendingSubmissionCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekPendingSubmissionCount"]) < parseInt(billScreenKPI[0]["LWeekPendingSubmissionCount"]))) {
            $("#un-Submitted-Week-Count").html('' + (billScreenKPI[0]["CWeekPendingSubmissionCount"] == null ? 0 : billScreenKPI[0]["CWeekPendingSubmissionCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#un-Submitted-Week-Count").html('' + (billScreenKPI[0]["CWeekPendingSubmissionCount"] == null ? 0 : billScreenKPI[0]["CWeekPendingSubmissionCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }
        
        //Rejected Bills
        $('#rejected-Count').html((billScreenKPI[0]["RejectedBills"] == null ? 0 : billScreenKPI[0]["RejectedBills"]))
        $('#rejected-Amount').html("$" + (billScreenKPI[0]["RejectedAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["RejectedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["RejectedAmount"]))));

        if (billScreenKPI[0]["CWeekRejectedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekRejectedCount"]) < parseInt(billScreenKPI[0]["LWeekRejectedCount"]))) {
            $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }
      
        //UnApproved Bills
        $('#un-Approved-Count').html((billScreenKPI[0]["UnApprovedBills"] == null ? 0 : billScreenKPI[0]["UnApprovedBills"]))
        $('#un-Approved-Amount').html("$" + (billScreenKPI[0]["UnApprovedAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["UnApprovedAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(billScreenKPI[0]["UnApprovedAmount"]))));

        if (billScreenKPI[0]["CWeekUnApprovedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekUnApprovedCount"]) < parseInt(billScreenKPI[0]["LWeekUnApprovedCount"]))) {
            $("#un-Approved-Week-Count").html('' + (billScreenKPI[0]["CWeekUnApprovedCount"] == null ? 0 : billScreenKPI[0]["CWeekUnApprovedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#un-Approved-Week-Count").html('' + (billScreenKPI[0]["CWeekUnApprovedCount"] == null ? 0 : billScreenKPI[0]["CWeekUnApprovedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }

       
        //UnApproved Bills
        $('#total-Amount-Count').html((billScreenKPI[0]["TotalBillsCount"] == null ? 0 : billScreenKPI[0]["TotalBillsCount"]))
        $('#total-Amount').html("$" + (billScreenKPI[0]["TotalAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["TotalAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["TotalAmount"]))));

        if (billScreenKPI[0]["CurrentWeekBillsClount"] == "0" || (parseInt(billScreenKPI[0]["CurrentWeekBillsClount"]) < parseInt(billScreenKPI[0]["LastWeekBillsCount"]))) {
            $("#total-Week-Count").html('' + (billScreenKPI[0]["CurrentWeekBillsClount"] == null ? 0 : billScreenKPI[0]["CurrentWeekBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#total-Week-Count").html('' + (billScreenKPI[0]["CurrentWeekBillsClount"] == null ? 0 : billScreenKPI[0]["CurrentWeekBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }   
    }

    var BindTabCounts = function (billScreenListData) {
       
        if (billScreenListData.length != null && billScreenListData.length > 0) {
            var unPaidBills = GetunmatchedRecord(billScreenListData, 'Status', "50044");
            var paidBills = GetmatchedRecord(billScreenListData, 'Status', "50044");
            var recurringBills = GetmatchedRecord(billScreenListData, 'IsRecurring', "1");
            $('#up-Paid-Count').html("(" + unPaidBills.length + ")");
            $('#paid-Count').html("(" + paidBills.length + ")");
            $('#recurring-Count').html("(" + recurringBills.length + ")");
            $('#Allbill-Count').html("(" + TabCountData[0]["AllBillcount"] + ")");
        }
        else {
            $('#up-Paid-Count').html("(0)");
            $('#paid-Count').html("(0)");
            $('#recurring-Count').html("(0)");
            $('#Allbill-Count').html("(0)");
        }
    }

    var BindSearchedTabCounts = function () {
        if (TabCountData != null && TabCountData != undefined && TabCountData.length > 0) {
            $('#up-Paid-Count').html("(" + TabCountData[0]["UnPaidCount"] + ")");
            $('#paid-Count').html("(" + TabCountData[0]["PaidCount"] + ")");
            $('#recurring-Count').html("(" + TabCountData[0]["RecurringCount"] + ")");
            $('#Allbill-Count').html("(" + TabCountData[0]["AllBillcount"] + ")");
        }
        else {
            $('#up-Paid-Count').html("(0)");
            $('#paid-Count').html("(0)");
            $('#recurring-Count').html("(0)");
            $('#Allbill-Count').html("(0)");
        }
    }

    var BindBillList=function(billList)
    {
        var isDelete = GetmatchedRecord(RolePermissions, 'EntityActionID', '3001');
        var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
        
        var $el = $("#tbl-Bills-Bdy");
        var html = '';
        if (billList.length > 0) {
            if (billList[0]["Status"] == "50044") {
                $('#chk-All-Lable').hide();
            }
            else {
                $('#chk-All-Lable').show();
            }
            $.each(billList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                if (item["Amount"] != "" && item["Amount"] != null) {
                    dollerAmount = $(item["Amount"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["Amount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html+='<tr>';
                html += '<td>';
                if (item["Status"] == "50019") {
                    html += '<input type="checkbox" data-Bills-Check="true" value="' + item["BillID"] + '">';
                }
                html+='</td>';
                html+='<td>';
                html += '<h5 title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</h5>';
                html+='</td>';
                html += '<td> <h5 title="' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5></td>';
                html+='<td>';
                html += '<h5 title="' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '">' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["Status"]);
                html += '<a class="isc-lbl-act-read-list-s1 '+colorCode+'" title="' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</a>';
                html+='</div></td>';
                html += '<td>';
                html += '<h5 title="' + (item["StageName"] == null ? '-' : item["StageName"]) + '">' + (item["StageName"] == null ? '-' : item["StageName"]) + '</h5>';
                html+='</td>';
                html += '<td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }

               // html+='<h5 style="color:red !important;">9/3/2020</h5>';
                html+='</td>';
                html += '<td><h5 style="text-align:right;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+='</td>';
                html+='<td style="text-align:center;">';
                if (isEdit.length > 0 && (item["Status"] == "50017" || item["Status"] == "50018" || item["Status"] == "50019" || item["Status"] == "50036"))
                {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx?BillID=' + item["BillID"] + '" style="padding-left:28px;"><i class="fa fa-pencil-square-o"></i></a>';
                }
              
                if (isDelete.length > 0 && item["Status"] == "50019")
                {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"  data-bill-Delete="' + item["BillID"] + '" data-bill-Invoiceno="' + item["InvoiceNumber"]+'"><i class="fa fa-trash-o"></i></a>';
                }
                html+='</td>';
                html += '</tr>';
            });
        }
        else {
            $('#chk-All-Lable').hide();
            html += '<tr><td colspan="9" style="text-align:center;">No data found</td><tr>';
        }
        $el.html(html);
        $("input:checkbox").uniform();
    }

    var BindPermissionKeys = function () {
        var isUpload = GetmatchedRecord(RolePermissions, 'EntityActionID', '3000');
        var isSubmit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3003');
        if (isUpload.length > 0) {
            $('#upload-Bill').show();
            $('#submit').show();
        } else {
            $('#upload-Bill').hide();
            $('#submit').hide();
        }
        //if (isSubmit.length > 0) {
        //    $('#submit').show();
        //}
        //else {
        //    $('#submit').hide();
        //}
    }
}

//Data Manipulation
{
    var GetBillScreenData = function () {
        var _obj = {
            'kpiStatus':parseInt(KpiStatus)
        };
        var tempList = {};
        $.when(RequestServer("Bills.aspx/GetBillScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeletePendingSubmissionBill = function (billID,Invoiceno) {
        var _obj = {
            'billID': billID,
            'InvoiceNo': Invoiceno
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
    var GetSplitList = function (billID) {
        var _obj = {
            'billID': billID
        }
        var tempList = {};
        $.when(RequestServer("Bills.aspx/GetSplitBillList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var SubmitBills = function () {
        var selectedBills = $('#tbl-Bills-Bdy input[type="checkbox"]:checked');
        var submitBills = [];
        if ($('#tbl-Bills-Bdy input[type="checkbox"]:checked').length > 0) {
            $.each(selectedBills, function (index, item) {
                var objBill = {
                    'BillId': parseInt($(item).val())
                }
                submitBills.push(objBill);
            });

            var _BillObject = {
                'billList': submitBills
            }
            var tempList = {};
            $.when(RequestServer("Bills.aspx/SubmitBills", _BillObject)).done(function (response) {
                if (parseInt(response) > 0) {
                    $.notify("Bill(s) submitted successfully !!", { position: "right top", className: "success" });
                    RegisterDatepicker();
                    $('.input-mini').mask('00/00/0000');
                    $('#txt-DueRange').mask('00/00/0000 - 00/00/0000')
                    BindBillScreen();
                    isOnload = 1;
                    $('#Check-all').prop('checked', false)
                    $.uniform.update('#Check-all')
                }
                else {
                    $.notify("Server error occured while submitting the bill(s) !!", { position: "right top", className: "error" });
                }
            });
          
        }
    }
}

//Common
{
    var GetStatusColor = function (status) {
        var colorClass = ''
        switch (status) {
            case "50015":
                colorClass = "isc-approved-color";
                break;
            case "50034":
                colorClass = "isc-approved-color";
                break;
            case "50016":
                colorClass = 'isc-wrk-flw-sta-open-req';
                break;
            case "50017":
                colorClass = 'isc-wrk-flw-sta-re-req'
                break;
            case "50018":
                colorClass = 'isc-wrk-flw-flg';
                break;
            case "50019":
                colorClass = 'isc-wrk-flw-sta-upload'
                break;

            case "50044":
                colorClass = "isc-wrk-flw-sta-aprove";
                break;

            case "50036":
                colorClass = "isc-wrk-flw-sta-re-req";
                break;

            case "50087":
                colorClass = 'isc-pay-status-clr'
                break;
        }
        return colorClass;

    }

    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');
           
            $.each(distinctlst, function (index, item) {
                if ($.trim(item["Value1"]) != '') {
                    html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
                }
               

            });
        }
        $el.html(html);
        
    }
}

//BindBillList With Pagination
{
    var BindUserBillList = function () {
       
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-Bills').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "Bills.aspx/GetBillList",
                contentType: "application/json;",
                dataType: "json",
                type: "POST",
                async: false,
                "data": function (dataTableModel) {
                    var obj = ConfigurePaginationModel(dataTableModel);
                    return JSON.stringify(obj);
                },
                "dataSrc": function (json) {
                    var objData = $.parseJSON(json.d);
                    json.data = common.AUF(objData['BillList']);
                    json.recordsTotal = common.AUF(objData['AllCount'][0]["Count"]);
                    json.recordsFiltered = common.AUF(objData['AllCount'][0]["Count"]);
                    TabCountData = common.AUF(objData['SearchedTabCounts']);
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[6, "asc"]],
            "bFilter": false,
            'bDestroy': true,
            'bInfo': false,
            "pageLength": 10,
            'bLengthChange': false,
            "language": {
                "emptyTable": '<span class="no-data-message">No Data Found</span>'
            },
            'aoColumns': [
                {
                    "width": '5%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        if (data["Status"] == "50019") {
                            html += '<div style="margin-left: 0px">'
                            html += '<input type="checkbox" data-Bills-Check="true" value="' + data["BillID"] + '">';
                            html += '</div>'
                        }
                        else {
                            html += '<div style="">'
                            html += '<input disabled  type="checkbox" >';
                            html += '</div>'
                        }
                        return html;
                    }
                },
                {
                    "width": '12%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["VendorName"] == null ? '-' : data["VendorName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        
                        var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3001');
                        if (isEdit.length > 0 && (data["Status"] == "50017" || data["Status"] == "50019" || data["Status"] == "50036" || (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0 && data["Status"] == '50016' && clientConfigurations[0]["IsChangesAllowed"] == "1" && data["ApprovalStage"] == '1'))) {
                            var html = '<h5><a href="CreateNewBill.aspx?BillID=' + data["BillID"] + '">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                            // var html = '<h5>' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '</h5>';
                            return html;
                        }
                        else {
                            
                            if (data["Status"] == "50017" || data["Status"] == "50019" || data["Status"] == "50036") {
                                var html = '<h5><a href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=0">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                                return html;
                            }
                            else {
                                var html = '<h5><a href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                                return html;
                            }
                        }
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["Description"] == null || data["Description"] == '' ? '-' : data["Description"]) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<div class="isc-td-inline-status-ch-s1">';
                        var colorCode = GetStatusColor(data["Status"].toString());
                        html += '<i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode +' "></i><a class="isc-lbl-act-read-list-s1 ' + colorCode + '">' + (data["StatusName"] == null ? '-' : data["StatusName"]) + '</a>';
                        html+='</div>';
                        return html;
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["PaymentMode"] == null || data["PaymentMode"] == '' ? '-' : data["PaymentMode"]) + '</h5>'
                        return html;
                    }
                },
                //{
                //    "width": '10%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = '';
                //        html += '<div style="margin-left: 11px;">';
                //        html += '<h5>' + (data["StageName"] == null ? '-' : data["StageName"]) + '</h5>'
                //        html += '</div>';
                //        return html;
                //    }
                //},
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["DueDate"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["DueDate"] == null ? '-' : moment(data["DueDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5 style="color:red !important;" >' + (data["DueDate"] == null ? '-' : moment(data["DueDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        return html;
                    }
                },
                {
                      "width": '9%',
                      "mData": function (data, type, dataToSet) {
                          var html = '';
                          var today = moment().format('MM/DD/YYYY');
                          var dueDay = moment(data["NextDueDate"]);
                          if (moment(today) <= dueDay) {
                              html += '<h5  >' + (data["NextDueDate"] == null ? '-' : moment(data["NextDueDate"]).format('MM/DD/YYYY')) + '</h5>';
                          }
                          else {
                              html += '<h5 style="color:red !important;" >' + (data["NextDueDate"] == null ? '-' : moment(data["NextDueDate"]).format('MM/DD/YYYY')) + '</h5>';
                          }
                          return html;
                      }
                  },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                       // var amount = data["Amount"].replace(/,/g, '');
                        var amount =(data["Amount"]==null?0.00: parseFloat(data["Amount"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        var isDelete = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
                        var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3001');
                        var html = '';
                        html += '<div style="padding-left: 30px;">';
                        if (isEdit.length > 0 && (data["Status"] == "50017" || data["Status"] == "50019" || data["Status"] == "50036" || (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0 && data["Status"] == '50016' && clientConfigurations[0]["IsChangesAllowed"] == "1" && data["ApprovalStage"] == '1')))
                        {
                            //********hide Edit icon changed to Invoice no
                           // html += '<a class="isc-action-badge-td-s1 pad-lft-5"  title="Edit" href="CreateNewBill.aspx?BillID=' + data["BillID"] + '" ><i class="fa fa-pencil-square-o"></i></a>';
                        }
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + data["BillID"] + '"><i class="fa fa-comment-o"></i></a>';
                        if (data["Status"] != "50019") {
                            //*********hide View icon changed to Invoice no
                           // html += '<a style="padding-left: 7px;" class="isc-action-badge-td-s1" title="View""  href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1" ><i class="fa fa-eye"></i></a>';
                        }
                        if (isDelete.length > 0 && data["Status"] == "50019") {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="More Actions" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
                            html += '<i class="fa fa-ellipsis-h "></i></a>';
                            html += '<ul class="dropdown-menu-entity">';
                           // html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="View""  href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1">View</a></li>';
                            if (isDelete.length > 0 && data["Status"] == "50019") {
                                html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-bill-Delete="' + data["BillID"] + '" data-bill-Invoiceno="' + data["InvoiceNumber"] +'">Delete</a></li>';
                            }
                            if (data["IsSplitted"] == "50013") {
                                //html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split" data-bill-Split="' + data["BillID"] + '" href="#">Split</a></li>';
                                html += '<li><a style="padding-left: 7px; cursor:pointer" class="isc-action-badge-td-s1 pad-lft-5" title="Split""  data-bill-Split="' + data["BillID"] + '">Split</a></li>';
                            }
                            html += '</ul>';
                        }
                        else if (data["IsSplitted"] == "50013") {
                            //html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split" data-bill-Split="' + data["BillID"] + '" href="#">Split</a></li>';
                            html += '<a style="padding-left: 7px; cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split""  data-bill-Split="' + data["BillID"] + '"><img src="images/Split2.png" class="isc-tbl-icon-img"/></a>';
                        }
                        html += '</div>';
                        return html;
                    }
                },
                

            ],
            "drawCallback": function (settings) {
                $('#tbl-Bills tr td').each(function (index, item) {
                    var text = $(item).text();
                    if (text != "Delete") {
                        $(item).attr('title', text);
                    }
                });
                $("input:checkbox").uniform();
            },
            "fnDrawCallback": function () {
                $('#tbl-Bills tr td').each(function (index, item) {
                    var text = $(item).text();
                    if (text != "Delete") {
                        $(item).attr('title', text);
                    }
                });
                $("input:checkbox").uniform();

                if (dataAllCount > 10) {
                    $('.dataTables_paginate').show();
                }
                else {
                    $('.dataTables_paginate').hide();
                }
            }

        });

    }

    var ConfigurePaginationModel = function (objModel) {

        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.Status = status;
        obj.StatusCondition = statusCondition;
        obj.IsRecurring = isRecurring;
        obj.VendorID = DVendor
        obj.InvoiceNumber = DInvoice
        obj.DueDateFrom = FilterStartDate;
        obj.DueDateTo = FilterEndDate;
        obj.Dstatus = DStatus
        obj.KpiStatus = parseInt(KpiStatus)
        obj.Isallbill = iSallbill
        var _obj = {};
        _obj = { "billFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 1:
                orderBy = "VendorName " + direction;
                break;
            case 2:
                orderBy = "InvoiceNumber " + direction;
                break;
            case 3:
                orderBy = "Description " + direction;
                break;
            case 4:
                orderBy = "StatusName " + direction;
                break;
            case 5:
                orderBy = "PaymentMode " + direction;
                break;
            //case 5:
            //    orderBy = "StageName " + direction;
            //    break;
            case 6:
                orderBy = "DueDate " + direction;
                break;
            case 7:
                orderBy = "NextDueDate " + direction;
                break;
            case 8:
                orderBy = "Amount " + direction;
                break;
        }
        return orderBy;
    }

    var RegisterDatepicker = function () {
        FilterStartDate = '01/01/2001';
        FilterEndDate = '01/01/2023';
        $('#txt-DueRange').daterangepicker({
            startDate: moment(FilterStartDate),
            endDate: moment(FilterEndDate),
            ranges: {
                'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                'Today': [moment(), moment()],
                'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                
               
            }
        }, SetSwapDateRange);
        SetSwapDateRange(moment(FilterStartDate), moment(FilterEndDate));
        $('#txt-DueRange').on('apply.daterangepicker', function (ev, picker) {
            FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
            FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
        });
    }

    function SetSwapDateRange(start, end) {
        if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
            && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
            ) {
            $('#txt-DueRange span').html('<span class="isc-label-question-s1"></span> Any Date');
        }
        else {
            $('#txt-DueRange span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
        }

    }


  
}

//Show Bill Comments
{
    $(document).on('click', '[bill-Comments]', function () {
         billId = $(this).attr('bill-Comments');
        if (billId != null && billId != undefined && billId != '-' && billId != '') {
            billId = parseInt(billId);
            var BillComments = GetBillcomments(billId);
            BillComments = common.AUF(BillComments['Comments']);
            BindBillComments(BillComments);
            //var $modal = $('#Mp_Comments');
            //$modal.modal('show');
            var $modal = $('#mp_comts');
            $modal.modal('show');
        }
    });

    $(document).on('click', '#close-Comment', function () {
        var $modal = $('#Mp_Comments');
        $modal.modal('hide');
        var $el = $('#div-BillComments');
        $el.html('<p>No Comments Found</p>');
    });

    var GetBillcomments = function (billId) {
        var _obj = {
            'BillId': billId
        };
        var tempList = {};
        $.when(RequestServer("Bill_UserHome.aspx/GetBillCommentsData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindBillComments = function (BillComments) {
        $('#btn-Send').prop('title', 'Send');
        var $el = $('#Commands_body');
        $('#txt-Command').val("");
        $("#btn-Send").html('Send');
        var html = '';
        var Iscount = 0;
        if (BillComments != null && BillComments != undefined && BillComments.length > 0 && BillComments != '') {
            var length = BillComments.length;
            $.each(BillComments, function (index, item) {
               
                if (item["Comment"] != '' && item["Comment"] != null) {
                    Iscount = 1;
                    html += '<div class="screen-row">'
                    html += '<div class="form-body" >'
                    html += '<div class="form-group">'
                    html += '<div class="screen-row">'
                    html += '<div class="isc-95per">'
                    html += '<div class="isc-single-discussion-content">'
                  
                    html += '<label  class="isc-dis-block isc-pad-left-10 isc-new-cmt mar-top-15">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</label>'
                    html += '<label class="smt-li-dataplan-inner-sub-title isc-f-13">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + '</label>'
                    html += '<span title="' + item["CreatedOn"] + '">On ' + (item["CreatedOn"] == null ? ' - ' : item["CreatedOn"]) + '</span>'
                    html += '<div class="cell-right">'
                    if (index === (length - 1)) {
                        if (item["UserID"] == item["CreatedBy"]) {
                            html += '<i title="Edit" style="cursor: pointer;" class=" fa fa-edit isc-set-pos" data-cmd-billid=' + item["BillID"] + ' data-cmd-billcmd=' + item["Comment"] + ' data-cmd-status=' + item["Status"] + ' data-cmd-rowid=' + item["RowID"] + '></i>'
                        }
                        lastcommand = item["Comment"];
                    }
                    html += '</div></div></div></div></div></div></div>'
                }
            });
        }
        if (Iscount > 0) {
            html += "";
        }
        else {
            html += '<p style="text-align:center;">No Data Found</p>';
        }





        //if (BillComments != null && BillComments != undefined && BillComments.length > 0) {
        //    $.each(BillComments, function (index, item) {
        //        html += '<div class="form-group">';
        //        html += '<div class="screen-row">';
        //        if (item["Status"] == "Approved") {
        //            html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:green">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
        //        }
        //        else {
        //            html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:red">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
        //        }

        //        html += '<p class="isc-bill-conf-del mar-top-10" title="' + (item["Comment"] == null ? '-' : item["Comment"]) + '">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
        //        html += '</div></div>';
        //    });
        //}
        //else {
        //    html += '<p>No Data Found</p>';
        //}
        $el.html(html);
    }
    $(document).on('click', '#btn-Send', function () {
        var ActionName = $('#btn-Send').text();
        Command = $('#txt-Command').val();

        if ($.trim(Command).length > 0) {
            if (ActionName != '') {
                SaveBillcommants(ActionName);
            }
        }
        
    });
    var SaveBillcommants = function (ActionName) {

        
        Command = $('#txt-Command').val();
        if (Command != '') {
            var _obj = {
                'Billid': billId,
                'Commant': Command,
                'Action': ActionName,
                'Status': Billstatus,
                'RowId': BillrowID
            }
            var tempList = {};
            $.when(RequestServer("Bills.aspx/SaveBillcommans", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    var ActionName = $('#btn-Send').text();
                    if ($('#btn-Send').text() == 'Send') {
                        $.notify("Comment saved successfully !!", { position: "right top", className: "success" });
                    }
                    else {
                        $.notify("Comment updated successfully !!", { position: "right top", className: "success" });
                    }
                   
                    var $modal = $('#mp_comts');
                    $modal.modal('hide');
                }
            });
            return tempList;


        }




    }
    $(document).on('click', '[data-cmd-billid]', function () {
        $('#btn-Send').prop('title', 'Update');
        $("#btn-Send").html('Update');
        billID = $(this).attr('data-cmd-billid')
        Command = lastcommand;
        Billstatus = $(this).attr('data-cmd-status');
        BillrowID = $(this).attr('data-cmd-rowid');
        $('#txt-Command').val(lastcommand);
    });
    //var BindBillComments = function (BillComments) {
    //    var $el = $('#div-BillComments');
    //    var html = '';
    //    if (BillComments != null && BillComments != undefined && BillComments.length > 0) {
    //        $.each(BillComments, function (index, item) {
    //            html += '<div class="form-group">';
    //            html += '<div class="screen-row">';
    //            if (item["Status"] == "Approved") {
    //                html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:green">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
    //            }
    //            else {
    //                html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:red">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
    //            }

    //            html += '<p class="isc-bill-conf-del mar-top-10" title="' + (item["Comment"] == null ? '-' : item["Comment"]) + '">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
    //            html += '</div></div>';
    //        });
    //    }
    //    else {
    //        html += '<p>No Comments Found</p>';
    //    }
    //    $el.html(html);
    //}


}