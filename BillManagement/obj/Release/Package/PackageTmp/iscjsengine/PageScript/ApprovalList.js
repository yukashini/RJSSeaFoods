//Global Variables
{
    var approvalScreenData = [];
    var billList = [];
    var billKPI = [];
    var sortingList = [];
    var status = 50016;
    var actionKey = 0;
    var FilterStartDate = null;
    var FilterEndDate = null;
    var TabCountData = [];
    var KpiStatus = 0;
    var DVendor = 0;
    var DInvoice = '0';
    var DStatus = 0;
    var isSearched = 0;
    var isOnload = 0;
    var dataAllCount = 0;
    var Command = "";
    var billId = 0;
    var Billstatus = '0';
    var BillrowID = 0;
    var lastcommand = "";
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            RegisterDatepicker();
            $('.input-mini').mask('00/00/0000');
            $('#txt-DueRange').mask('00/00/0000 - 00/00/0000')
            BindApprovalScreen();
            isOnload = 1;
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#waiting-Approval-Tab', function () {
        //var approvalPending = GetmatchedRecord(billList, 'Status', "50016");
        //sortingList = approvalPending;
        //BindBillList(approvalPending);
        status = 50016;
        BindApproverBillList();
     //   $('#awaiting-Count').html("("+TabCountData.length+")");
        
      
        $("input:checkbox").uniform();
        $('#Check-all').prop('checked', false);
        $.uniform.update('#Check-all');

    });

    $(document).on('click', '#all-Approvals-Tab', function () {
        //var allApprovals = GetunmatchedRecord(billList, 'Status', "50015");
        //sortingList = billList;
        //BindBillList(billList);
        status = 0;
        BindApproverBillList();
      //  $('#all-Approval-Count').html("(" + TabCountData.length + ")");
        $("input:checkbox").uniform();
        $('#Check-all').prop('checked', false);
        $.uniform.update('#Check-all');
    });

    $(document).on('click', '#disputed-Approvals-Tab', function () {
        //var disputedBills = GetmatchedRecord(billList, 'Status', "50036");
        //sortingList = disputedBills;
        //BindBillList(disputedBills);
        status = 50036;
        BindApproverBillList();
    //    $('#disputed-Count').html("(" + TabCountData.length + ")");
        $("input:checkbox").uniform();
        $('#Check-all').prop('checked', false);
        $.uniform.update('#Check-all');
    });

    $(document).on('click', 'th[data-sort-bill]', function (e) {
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
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
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

    $(document).on('click', '[data-Multi-Submit]', function () {
        actionKey = $(this).attr('data-Multi-Submit');
        if (actionKey == "1") {
            $('#pop-up-title').html("Reject Bill(s)")
            $('#alertMessage').html("Are you sure want to reject the selected bill(s)?");
            if ($('#tbl-Bills input[type="checkbox"]:checked').length > 0) {
                $('#Mp_RejectBill').show();
            }
            else {
                $.notify("Please select the bills to reject !!", { position: "right top", className: "error" });
                $('#Mp_RejectBill').hide();
            }
        }
        else {
            $('#pop-up-title').html("Approve Bill(s)")
            $('#alertMessage').html("Are you sure want to approve the selected bill(s)?");
            if ($('#tbl-Bills input[type="checkbox"]:checked').length > 0) {
                $('#mp_bill_Submit').show();
            }
            else {
                $.notify("Please select the bills to approve !!", { position: "right top", className: "error" });
                $('#mp_bill_Submit').hide();

            }
        }
        
     
       
    });

    $(document).on('click', '[submit-cancel]', function () {
        $('#mp_bill_Submit').hide();
    });

    $(document).on('click', '[btn-Submit-Ok]', function () {
        $loading.show();
        setTimeout(function () {
            if (actionKey == '1') {
                if ($.trim($('#txt-Reject-Reason').val()) != '') {
                    SaveMultiSubmit(actionKey);
                }
                else {
                    $.notify("Rejection reason should not be empty !!", { position: "right top", className: "error" });
                }
                
            }
            else {
                SaveMultiSubmit(actionKey);
            }
         
            $loading.hide();
        }, 0);
        //$('.select2').select2();
    });

    $(document).on('click', '[cancel-Reject-POP]', function () {
        $('#Mp_RejectBill').hide();
    });

    $(document).on('click', '#Check-all', function () {
        //e.preventDefault();

        if ($(this).is(':checked')) {
            //$('#tbl-Bill-Body input[type="checkbox"]').prop('checked', true)
            //$.uniform.update('#tbl-Bill-Body input[type="checkbox"]')
            $('[data-Bills-Check]').prop('checked', true)
            $.uniform.update('[data-Bills-Check]')
        }
        else {
            //$('#tbl-Bill-Body input[type="checkbox"]').prop('checked', false)
            //$.uniform.update('#tbl-Bill-Body input[type="checkbox"]')
            $('[data-Bills-Check]').prop('checked', false)
            $.uniform.update('[data-Bills-Check]')
        }
    });

    $(document).on('click', '[data-Bills-Check]', function () {
        //var totalCheckBox = $('#tbl-Bill-Body input[type="checkbox"]').length;
        //var checkedCheckBox = $('#tbl-Bill-Body input[type="checkbox"]:checked').length;
        var totalCheckBox = $('[data-Bills-Check]').length;
        var checkedCheckBox = $('input[data-Bills-Check="true"]:checked').length;
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
            KpiStatus = 0;
            DVendor = parseInt($('#slt-Vendor').val());
            DInvoice = $('#slt-Invoice').val()
            DStatus = parseInt($('#slt-Status').val());
          
            if (DStatus == 50016) {
                $('#ul-Tabs li').removeClass('active');
                $('#waiting-Approval-Tab').addClass('active');
                status=50016
            }
            if (DStatus == 50036) {
                $('#ul-Tabs li').removeClass('active');
                $('#disputed-Approvals-Tab').addClass('active');
                status = 50036
            }
            if (DStatus == 0 || (DStatus != 50016 && DStatus != 50036))
            {
                $('#ul-Tabs li').removeClass('active');
                $('#all-Approvals-Tab').addClass('active');
                status = 0;
            }
            BindApproverBillList()
            BindSearchedTabCountData();
       
            $loading.hide();
        }, 0);

    });

    $(document).on('click', '#btn_Reset', function () {
        if (isSearched == 1) {
            $loading.show();
            setTimeout(function () {
                isSearched = 0;
                $('#slt-Vendor').val(0);
                $('#slt-Invoice').val(0);
                $('#slt-Status').val(0);
                $('.select2').select2();
                $('#txt-DueRange').val('');

                RegisterDatepicker();
                $('.input-mini').mask('00/00/0000');
                KpiStatus = 0;
                DVendor = 0
                DInvoice = '0'
                status = 50016;
                DStatus = 0;
                BindApprovalScreen()
                $('#ul-Tabs li').removeClass('active');
                $('#waiting-Approval-Tab').addClass('active');
                $loading.hide();
            }, 0);
        }

    });

    $(document).on('click', '[data-Kpi]', function () {
        KpiStatus = parseInt($(this).attr('data-Kpi'));
        $loading.show()
        setTimeout(function () {
            isSearched = 0;
        $('#slt-Vendor').val(0);
        $('#slt-Invoice').val('0');
        $('#slt-Status').val(0);
        $('.select2').select2();
        $('#txt-DueRange').val('');
        DVendor = 0
        DInvoice = '0'
        DStatus = 0;
        RegisterDatepicker();
        $('.input-mini').mask('00/00/0000');
        BindApprovalScreen();
            $loading.hide();
        }, 0);
    });

}

//Dom Manipulation
{
    var BindApprovalScreen = function () {
        approvalScreenData = GetApprovaliListScreenData();
        if (approvalScreenData != null && approvalScreenData.length > 0) {
            billKPI = $.parseJSON(approvalScreenData[0]["Table"]);
            billList = $.parseJSON(approvalScreenData[1]["Table1"]);
            BindPermissionKeys();
            if (isOnload == 0) {
                BindMasterData();
            }
         
            BindKPI();
           
            //var approvalPending = GetmatchedRecord(billList, 'Status', "50016");
            //sortingList = approvalPending;
            //BindBillList(approvalPending);
           
            BindApproverBillList();
            var distinctBillListData = GetDistinctArray(billList, 'BillID');
            BindTabCounts(distinctBillListData);
            $("input:checkbox").uniform();
            BindPermissions();
        }
    }

    var BindPermissionKeys = function () {
        var isApprove = GetmatchedRecord(RolePermissions, 'EntityActionID', '3004');
        var isReject = GetmatchedRecord(RolePermissions, 'EntityActionID', '3005');
        if (isApprove.length > 0) {
            $('#btn-Approve').show();
        } else {
            $('#btn-Approve').hide();
        }
        if (isReject.length > 0) {
            $('#btn-Reject').show();
        }
        else {
            $('#btn-Reject').hide();
        }
    }

    var BindKPI = function () {
        //Un Approved Submission
        $('#un-Approved-Count').html((billKPI[0]["UnApprovedBillsCount"] == null ? 0 : billKPI[0]["UnApprovedBillsCount"]))


        $('#un-Approved-Amount').html("$" + (billKPI[0]["TotalUnApprovedAmount"] == null || Math.sign(parseFloat(billKPI[0]["TotalUnApprovedAmount"])) == -1 ? 0 :moneyFormatter(parseFloat(billKPI[0]["TotalUnApprovedAmount"]))));

        if (billKPI[0]["CurrentWeekUnApprovedBillsClount"] == "0" || (parseInt(billKPI[0]["CurrentWeekUnApprovedBillsClount"]) < parseInt(billKPI[0]["LWeekPendingSubmissionCount"]))) {
            $("#un-Approved-Week-Count").html('' + (billKPI[0]["CurrentWeekUnApprovedBillsClount"] == null ? 0 : billKPI[0]["CurrentWeekUnApprovedBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#un-Approved-Week-Count").html('' + (billKPI[0]["CurrentWeekUnApprovedBillsClount"] == null ? 0 : billKPI[0]["CurrentWeekUnApprovedBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }

        //Rejected Bills
        $('#rejected-Count').html((billKPI[0]["RejectedBills"] == null ? 0 : billKPI[0]["RejectedBills"]))
        $('#rejected-Amount').html("$" + (billKPI[0]["RejectedAmount"] == null || Math.sign(parseFloat(billKPI[0]["RejectedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billKPI[0]["RejectedAmount"]))));

        if (billKPI[0]["TodayRejectedCount"] == "0" || (parseInt(billKPI[0]["TodayRejectedCount"]) < parseInt(billKPI[0]["LastDayRejectedApprovedCount"]))) {
            $("#rejected-Week-Count").html('' + (billKPI[0]["TodayRejectedCount"] == null ? 0 : billKPI[0]["TodayRejectedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#rejected-Week-Count").html('' + (billKPI[0]["TodayRejectedCount"] == null ? 0 : billKPI[0]["TodayRejectedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }

        //Approved Bills
        $('#approved-Bill-Count').html((billKPI[0]["ApprovedBillsCount"] == null ? 0 : billKPI[0]["ApprovedBillsCount"]))
        $('#approved-Bill-Amount').html("$" + (billKPI[0]["ApprovedAmount"] == null || Math.sign(parseFloat(billKPI[0]["ApprovedAmount"])) == -1 ? 0 :moneyFormatter(parseFloat(billKPI[0]["ApprovedAmount"]))));

        if (billKPI[0]["CWeekApprovedCount"] == "0" || (parseInt(billKPI[0]["CWeekApprovedCount"]) < parseInt(billKPI[0]["LWeekApprovedCount"]))) {
            $("#approved-Week-Count").html('' + (billKPI[0]["CWeekApprovedCount"] == null ? 0 : billKPI[0]["CWeekApprovedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#approved-Week-Count").html('' + (billKPI[0]["CWeekApprovedCount"] == null ? 0 : billKPI[0]["CWeekApprovedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }


        //Disputed Bills
        $('#disputed-Bill-Count').html((billKPI[0]["DisputedBills"] == null ? 0 : billKPI[0]["DisputedBills"]))
        $('#disputed-Amount').html("$" + (billKPI[0]["DisputedAmount"] == null || Math.sign(parseFloat(billKPI[0]["DisputedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billKPI[0]["DisputedAmount"]))));

        if (billKPI[0]["CWeekDisputedCount"] == "0" || (parseInt(billKPI[0]["CWeekDisputedCount"]) < parseInt(billKPI[0]["LWeekDisputedCount"]))) {
            $("#disputed-Week-Count").html('' + (billKPI[0]["CWeekDisputedCount"] == null ? 0 : billKPI[0]["CWeekDisputedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#disputed-Week-Count").html('' + (billKPI[0]["CWeekDisputedCount"] == null ? 0 : billKPI[0]["CWeekDisputedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }

       
    }

    var BindTabCounts = function (distinctBillListData) {
        if (distinctBillListData != undefined && distinctBillListData.length > 0) {
            var allApprovals = GetunmatchedRecord(distinctBillListData, 'Status', "50015");
            var approvalPending = GetmatchedRecord(distinctBillListData, 'Status', "50016");
            var disputedBills = GetmatchedRecord(distinctBillListData, 'Status', "50036");
            $('#awaiting-Count').html("(" + approvalPending.length + ")");
            $('#all-Approval-Count').html("(" + distinctBillListData.length + ")");
            $('#disputed-Count').html("(" + disputedBills.length + ")");
        }
        else {
            $('#awaiting-Count').html("(0)");
            $('#all-Approval-Count').html("(0)");
            $('#disputed-Count').html("(0)");
        }
      
    }

    var BindSearchedTabCountData = function () {
        if (TabCountData != null && TabCountData != undefined && TabCountData.length > 0)
        {
            
            $('#awaiting-Count').html("(" + TabCountData[0]["AwaitingCount"] + ")");
            $('#all-Approval-Count').html("(" + TabCountData[0]["AllCount"] + ")");
            $('#disputed-Count').html("(" + TabCountData[0]["DisputedCount"] + ")");
        }
        else {
            $('#awaiting-Count').html("(0)");
            $('#all-Approval-Count').html("(0)");
            $('#disputed-Count').html("(0)");
        }
    }

    var BindBillList = function (billList) {
        var isApprove = GetmatchedRecord(RolePermissions, 'EntityActionID', '3004');
        var isReject = GetmatchedRecord(RolePermissions, 'EntityActionID', '3005');

        var $el = $("#tbl-Bill-Body");
        var html = '';
        if (billList.length > 0) {
            $.each(billList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                if (item["Amount"] != "" && item["Amount"] != null) {
                    dollerAmount = $(item["Amount"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["Amount"].replace(/,/g, '');
                amount = parseFloat(amount);
                var approvedAmount = 0;
                if (item["ApprovedAmount"] != null) {
                    approvedAmount = item["ApprovedAmount"].replace(/,/g, '');
                    approvedAmount = parseFloat(approvedAmount);
                }
                var balanceAmount = 0;
                if (item["Balance"] != null) {
                    balanceAmount = item["Balance"].replace(/,/g, '');
                    balanceAmount = parseFloat(balanceAmount);
                }
               

                html += '<tr>';
                html += '<td>';
                if ((item["Status"] == '50016') && item["CurrentStageApproval"] == "1" ) {
                    html += '<input type="checkbox" data-Bills-Check="true" value="' + item["BillID"] + '">';
                }
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</h5>';
                html += '</td>';
                html += '<td> <h5 title="' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5></td>';
                html += '<td>';
                html += '<h5 title=' + (item["Description"] == null ? '-' : item["Description"]) + '>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["Status"]);
                html += '<a class="isc-lbl-act-read-list-s1 ' + colorCode + ' title="' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</a>';
                html += '</div></td>';
                html += '<td>';
                html += '<h5 title="Approvals">Approvals</h5>';
                html += '</td>';
                html += '<td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }

                // html+='<h5 style="color:red !important;">9/3/2020</h5>';
                html += '</td>';
                html += '<td><h5 style="text-align:right;">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '<td><h5 style="text-align:right;">' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '<td><h5 style="text-align:right;">' + (balanceAmount == "" || balanceAmount == NaN ? '-' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';
                html += '<td style="text-align:center;">';
                if ((item["Status"] == '50016' || item["Status"] == '50034') && item["CurrentStageApproval"] == "1") {
                    if (isApprove.length > 0) {
                        html += ' <a class="isc-action-badge-td-s1 pad-lft-5 " title="Approve" href="Bill_ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-check-circle-o isc-app-icon-clr" style="font-size:16px;"></i></a>';
                    }
                    if (isReject.length > 0) {
                        html += ' <a class="isc-action-badge-td-s1 pad-lft-5 " title="Reject" href="Bill_ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-times-circle-o isc-rej-icon-clr" style="font-size:16px;"></i></a>';
                    }
                   
                }
                html += '</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<tr><td colspan="12" style="text-align:center;">No data found</td><tr>';
        }
        $el.html(html);
        $("input:checkbox").uniform();
    }

    var BindPermissions = function () {
        var isApprove = GetmatchedRecord(RolePermissions, 'EntityActionID', '3004');
        var isReject = GetmatchedRecord(RolePermissions, 'EntityActionID', '3005');
        if (isApprove.length > 0) {
            $('#btn-Approve').show()
        }
        else {
            $('#btn-Approve').hide()
        }
        if (isReject.length > 0) {
            $('#btn-Reject').show()
        }
        else {
            $('#btn-Reject').hide()
        }
         
            
    }

    var BindMasterData = function () {
        BindDropDowns($('#slt-Vendor'), $.parseJSON(approvalScreenData[2]["Table2"]), 'Choose Vendor')
        BindDropDowns($('#slt-Status'), $.parseJSON(approvalScreenData[3]["Table3"]), 'Choose Status')
        BindDropDowns($('#slt-Invoice'), $.parseJSON(approvalScreenData[1]["Table1"]), 'Choose Bill/Invoice #')
    }

}

//Data Manipulation
{
    var GetApprovaliListScreenData = function () {
        var obj = {
            'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'currentDay': moment().format('MM/DD/YYYY'),
            'lastDay': moment().add(-1, "days").format('MM/DD/YYYY'),
            'Status':parseInt(KpiStatus)
        }
        var approverObject = {
            'UserHomeObj': obj

        }
        var tempList = {};
        $.when(RequestServer("ApprovalList.aspx/GetApprovalListScreenData", approverObject)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var SaveMultiSubmit = function () {
        var selectedBills = $('#tbl-Bill-Body input[type="checkbox"]:checked');
        var submitBills = [];
        if ($('#tbl-Bill-Body input[type="checkbox"]:checked').length > 0) {
            $.each(selectedBills, function (index, item) {
                var matchedItem = GetmatchedRecord(billList, 'BillID', $(item).val());
                var objBill = {
                    'BillId': parseInt($(item).val()),
                    'ActionKey': parseInt(actionKey),
                    'PayableAmount': parseFloat(matchedItem[0]["Amount"]),
                    'ApprovedAmount': parseFloat(matchedItem[0]["Amount"]),
                    'DueDate': moment(matchedItem[0]["DueDate"]),
                    'VendorId': parseInt(matchedItem[0]["VendorID"]),
                    'Comment': $('#txt-Reject-Reason').val(),
                }
                submitBills.push(objBill);
            });

            var _BillObject = {
                'billList': submitBills
            }
            var tempList = {};
            $.when(RequestServer("ApprovalList.aspx/BillsMultiSubmit", _BillObject)).done(function (response) {
                tempList = $.parseJSON(response);
                if (actionKey == "1") {
                    //Regected
                    if (parseInt(response) > 0) {
                        $.notify("Bill(s) rejected successfully !!", { position: "right top", className: "success" });
                     
                        BindApprovalScreen();
                        $('#mp_bill_Submit').hide();
                        $('#Mp_RejectBill').hide();
                        $('#Check-all').prop('checked', false)
                        $.uniform.update('#Check-all')
                    }
                    else {
                        $.notify("Server error occured while rejecting a bill(s) !!", { position: "right top", className: "error" });
                    }
                }
                else {
                  //  approved
                    if (parseInt(response) > 0) {
                        $.notify("Bill(s) approved successfully !!", { position: "right top", className: "success" });
                        BindApprovalScreen();
                        $('#mp_bill_Submit').hide();
                        $('#Check-all').prop('checked', false)
                        $.uniform.update('#Check-all')

                    }
                    else {
                        $.notify("Server error occured while approving a bill(s) !!", { position: "right top", className: "error" });
                    }
                }
              
            });
            return tempList;
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

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

            });
        }
        $el.html(html);
    }

}

//BindBillList With Pagination
{
    var BindApproverBillList = function () {
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
                "url": "ApprovalList.aspx/GetBillList",
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
                        if ((data["Status"] == '50016') && data["CurrentStageApproval"] == "1") {
                            html+='<div style="">'
                            html += '<input type="checkbox" data-Bills-Check="true" value="' + data["BillID"] + '">';
                            html += '</div>'
                        }
                        else {
                            html += '<div style="">'
                            html += '<input type="checkbox" disabled>';
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
                    "width": '12%',
                    "mData": function (data, type, dataToSet) {
                        
                        if ((data["StatusName"] == 'Partially Approved')) {
                            var html = '<h5 style="cursor:pointer"><a href="Bill_ApprovalDetails.aspx?BillID=' + data["BillID"] + '">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '</a></h5>';
                            return html;
                        }
                        else if ((data["Status"] == '50016') && data["CurrentStageApproval"] == "1") {
                            var html = '<h5 style="cursor:pointer"><a href="Bill_ApprovalDetails.aspx?BillID=' + data["BillID"] + '&&IsView=0">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '</a></h5>';
                            return html;
                        }
                        else {
                            var html = '<h5 style="cursor:pointer"><a href="Bill_ApprovalDetails.aspx?BillID=' + data["BillID"] + '&&IsView=1">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '</a></h5>';
                            return html;
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
                    "width": '12%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<div class="isc-td-inline-status-ch-s1">';
                        var colorCode = GetStatusColor(data["Status"].toString());
                        html += '<i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode +' "></i><a class="isc-lbl-act-read-list-s1 ' + colorCode + '">' + (data["StatusName"] == null ? '-' : data["StatusName"]) + '</a>';
                        html += '</div>';
                        return html;
                    }
                },
                   {
                       "width": '9%',
                       "mData": function (data, type, dataToSet) {
                           var html = '<h5 >' + (data["PaymentMode"] == null || data["PaymentMode"] == '' ? '-' : data["PaymentMode"]) + '</h5>'
                           return html;
                       }
                   },
                //{
                //    "width": '7%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = '<h5>' + (data["StageName"] == null ? '-' : data["StageName"]) + '</h5>'
                //        return html;
                //    }
                //},
                {
                    "width": '9%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["DueDate"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["DueDate"] == null ? '-' : moment(data["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                        }
                        else {
                            html += '<h5 style="color:red !important;" >' + (data["DueDate"] == null ? '-' : moment(data["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                        }
                        return html;
                    }
                },
                {
                    "width": '11%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amount = (data["Amount"] == null ? 0.00 : parseFloat(data["Amount"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '12%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amountApproved = (data["ApprovedAmount"] == null ? 0.00 : parseFloat(data["ApprovedAmount"]));
                        var html = '<h5 style="text-align:right;" >' + (amountApproved == "" || amountApproved == NaN ? '-' : '$' + amountApproved.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '11%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amountBalance = (data["Balance"] == null ? 0.00 : parseFloat(data["Balance"]));
                        var html = '<h5 style="text-align:right;" >' + (amountBalance == "" || amountBalance == NaN ? '-' : '$' + amountBalance.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '9%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<div style="text-align: center;">';
                        var isApprove = GetmatchedRecord(RolePermissions, 'EntityActionID', '3004');
                        var amountBalance = (data["Balance"] == null ? 0.00 : parseFloat(data["Balance"]));
                        var isReject = GetmatchedRecord(RolePermissions, 'EntityActionID', '3005');
                        //|| data["Status"] == '50036'
                        if ((data["Status"] == '50016' || data["Status"] == '50034') && data["CurrentStageApproval"] == "1" && amountBalance > 0) {
                            if (isApprove.length > 0) {
                                html += ' <a style="text-align:center;" class="isc-action-badge-td-s1 pad-lft-5 " title="Approve" href="Bill_ApprovalDetails.aspx?BillID=' + data["BillID"] + '"><i class="fa fa-check isc-app-icon-clr" style="font-size:16px;"></i></a>';
                            }
                            if (isReject.length > 0) {
                                html += ' <a style="text-align:center;" class="isc-action-badge-td-s1 pad-lft-5 " title="Reject" href="Bill_ApprovalDetails.aspx?BillID=' + data["BillID"] + '"><i class="fa fa-times isc-rej-icon-clr" style="font-size:16px;"></i></a>';
                            }

                        }
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + data["BillID"] + '"><i class="fa fa-comment-o"></i></a>';
                        if (data["IsSplitted"] == '50013') {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Split" style="cursor:pointer;"  bill-Split="' + data["BillID"] + '"><img src="images/Split2.png" class="isc-tbl-icon-img"/></a>';
                        }
                        html += '</div>';
                        return html;
                    }
                },


            ],
            "drawCallback": function (settings) {
                
            },
            "fnDrawCallback": function () {
                $('#tbl-Bills tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
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
        obj.VendorID =DVendor
        obj.InvoiceNumber =DInvoice
        obj.DueDateFrom = FilterStartDate;
        obj.DueDateTo = FilterEndDate;
        obj.Dstatus =DStatus
        obj.KpiStatus = parseInt(KpiStatus)
        
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
                orderBy = "Amount " + direction;

                break;
            case 8:
                orderBy = "ApprovedAmount " + direction;

                break;
            case 9:
                orderBy = "Balance " + direction;

                break;
        }
        return orderBy;
    }


    var RegisterDatepicker = function () {
        FilterStartDate = '01/01/2001';
        FilterEndDate = '12/31/2022';
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
    //Split Bill
    $(document).on('click', '[bill-Split]', function () {

        SplitBillId = $(this).attr('bill-Split');
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
    $(document).on('click', '#close-Comment', function () {
        var $modal = $('#Mp_Comments');
        $modal.modal('hide');
        var $el = $('#div-BillComments');
        $el.html('<p>No Data Found</p>');
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
                  
                    html += '<label class="isc-dis-block isc-pad-left-10 isc-new-cmt mar-top-15">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</label>'
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

}