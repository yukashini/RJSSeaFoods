
//Gloabal Variables
{
    var userHomeScreenData = [];
    var billList = [];
    var billScreenKPI = [];
    var sortList = [];
    var totalBills = 0;
    var DeleteBillId = 0;
    var isOverDue = 0;
    var startDate = moment().clone().startOf('month').format('MM/DD/YYYY');
    var endDate = moment().clone().endOf('month').format('MM/DD/YYYY');
    var status = 50019;
    var selectedStatus = 50019;
    var KpiStatus = 0;
    var dataAllCount = 0;
    var selectedStartDate = '';
    var selectedEndDate = '';
    var isOnload = 0;
    var isDueFilter = 0;
    var isMonthFilterSelected = 0;
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
            isOnload = 1;
            BindUserHomeScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-Kpi]', function () {
        KpiStatus = parseInt($(this).attr('data-Kpi'));
        $loading.show()
        setTimeout(function () {
            BindUserHomeScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-Filter]', function () {
        var selectedFilter = $(this).attr('data-Filter');
        $('#selected-Filter').html(selectedFilter)
        var filterObject = GetFilterObject(selectedFilter);
        userHomeScreenData = GetUserHomeScreenData(filterObject);
        if (userHomeScreenData != null && userHomeScreenData.length > 0) {
            billScreenKPI = $.parseJSON(userHomeScreenData[0]["Table"]);
            BindKPI();
            billList = $.parseJSON(userHomeScreenData[1]["Table1"]);
            BindTabCounts();
            var unsubmitted = GetmatchedRecord(billList, 'Status', "50019");
            sortList = unsubmitted;
            BindBillPercentage();
            GraphBinding($.parseJSON(userHomeScreenData[2]["Table2"]))
         //   BindBillList(unsubmitted);
            $("input:checkbox").uniform();
        }
        BindUserHomeBillList();
        $('.nav-tabs li').removeClass('active');
        $('#un-Submitted-Bills').parent('li').addClass('active');
    });

    $(document).on('click', '#un-Submitted-Bills', function () {
        //var unsubmitted = GetmatchedRecord(billList, 'Status', "50019");
        //sortList = unsubmitted;
        //BindBillList(unsubmitted);
        selectedStatus = 50019;
        status = selectedStatus;
        BindUserHomeBillList();
      
    });

    $(document).on('click', '#rejected-Bills', function () {
        //var rejectedBills = GetmatchedRecord(billList, 'Status', "50017");
        //sortList = rejectedBills;
        //BindBillList(rejectedBills);
        selectedStatus = 50017;
        status = selectedStatus;
        BindUserHomeBillList();

    });

    $(document).on('click', '#un-Approved-Bills', function () {
        //var unApproved = GetmatchedRecord(billList, 'Status', "50016");
        //sortList = unApproved;
        //BindBillList(unApproved)
        selectedStatus = 50016;
        status = selectedStatus;
        BindUserHomeBillList();
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
            var lstResult = sortList

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

    $(document).on('click', '#Check-all', function () {
        //e.preventDefault();
        if ($(this).is(':checked')) {
            $('#Check-all').prop('checked', true)
            $.uniform.update('#Check-all')
            //$('#tbl-Bill-Body input[type="checkbox"]').prop('checked', true)
            //$.uniform.update('#tbl-Bill-Body input[type="checkbox"]')
            $('[data-Bills-Check]').prop('checked', true)
            $.uniform.update('[data-Bills-Check]')
            
        }
        else {
            $('#check-all').prop('checked', false)
            $.uniform.update('#check-all')
            //$('#tbl-Bill-Body input[type="checkbox"]').prop('checked', false)
            //$.uniform.update('#tbl-Bill-Body input[type="checkbox"]')
            $('[data-Bills-Check]').prop('checked', false)
            $.uniform.update('[data-Bills-Check]')
           
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
            BindUserHomeScreen();
            $('#mp_bill_Delete').hide();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[delete-cancel]', function () {

        DeleteBillId = 0;

        $('#mp_bill_Delete').hide();
    });

    $(document).on('click', '#submit', function () {
        if ($('#tbl-Bill-Body input[type="checkbox"]:checked').length > 0) {
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
        SubmitBills();
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
    
}

//Dom Manipulation
{
    var BindUserHomeScreen = function () {
        BindPermissionKeys();
        
        var obj = {
            'StartDate':startDate,
            'EndDate': endDate,
            'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'IsOverDue': 0,
            'Status': KpiStatus,
            'IsOnload': isOnload,
            'IsDueFilter':isDueFilter

        }
      

        userHomeScreenData = GetUserHomeScreenData(obj);
        if (userHomeScreenData != null && userHomeScreenData.length > 0) {
            billScreenKPI = $.parseJSON(userHomeScreenData[0]["Table"]);
            BindKPI();
            billList = $.parseJSON(userHomeScreenData[1]["Table1"]);
            var unsubmitted = GetmatchedRecord(billList, 'Status', "50019");
            sortList = unsubmitted;
            BindTabCounts();
            BindBillPercentage();
            GraphBinding($.parseJSON(userHomeScreenData[2]["Table2"]))
           // BindBillList(unsubmitted);
            $("input:checkbox").uniform();
        }
        BindUserHomeBillList();
    }

    var BindPermissionKeys = function () {
        
        var isUpload = GetmatchedRecord(RolePermissions, 'EntityActionID', '3000');
        var isSubmit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3003');
        var isDelete = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
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

    var BindKPI = function () {
        //Pending Submission
        $('#un-Submitted-Count').html((billScreenKPI[0]["PendingSubmissionBills"] == null ? 0 : billScreenKPI[0]["PendingSubmissionBills"]))


      //  $('#un-Submitted-Amount').html("$" + (billScreenKPI[0]["PendingSubmissionAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["PendingSubmissionAmount"])) == -1 ? 0 : parseFloat(billScreenKPI[0]["PendingSubmissionAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        $('#un-Submitted-Amount').html("$" + (billScreenKPI[0]["PendingSubmissionAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["PendingSubmissionAmount"])) == -1 ? 0 :moneyFormatter(parseFloat(billScreenKPI[0]["PendingSubmissionAmount"]))));

        if (billScreenKPI[0]["CWeekPendingSubmissionCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekPendingSubmissionCount"]) < parseInt(billScreenKPI[0]["LWeekPendingSubmissionCount"]))) {
            $("#un-Submitted-Week-Count").html('' + (billScreenKPI[0]["CWeekPendingSubmissionCount"] == null ? 0 : billScreenKPI[0]["CWeekPendingSubmissionCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
            $('#un-Sub-Arrow').removeClass("fa fa-arrow-up");
            $('#un-Sub-Arrow').addClass("fa fa-arrow-down")
        }
        else {
            $("#un-Submitted-Week-Count").html('' + (billScreenKPI[0]["CWeekPendingSubmissionCount"] == null ? 0 : billScreenKPI[0]["CWeekPendingSubmissionCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
            $('#un-Sub-Arrow').removeClass("fa fa-arrow-down");
            $('#un-Sub-Arrow').addClass("fa fa-arrow-up")
        }

        //Rejected Bills
        $('#rejected-Count').html((billScreenKPI[0]["RejectedBills"] == null ? 0 : billScreenKPI[0]["RejectedBills"]))
        $('#rejected-Amount').html("$" + (billScreenKPI[0]["RejectedAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["RejectedAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(billScreenKPI[0]["RejectedAmount"]))));

        if (billScreenKPI[0]["CWeekRejectedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekRejectedCount"]) < parseInt(billScreenKPI[0]["LWeekRejectedCount"]))) {
            $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
            $('#rejected-Arrow').removeClass("fa fa-arrow-up");
            $('#rejected-Arrow').addClass("fa fa-arrow-down")
        }
        else {
            $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
            $('#rejected-Arrow').removeClass("fa fa-arrow-up");
            $('#rejected-Arrow').addClass("fa fa-arrow-down")
        }

        if (billScreenKPI[0]["CWeekApprovedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekApprovedCount"]) < parseInt(billScreenKPI[0]["LWeekApprovedCount"]))) {
          //  $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
            $('#approved-Arrow').removeClass("fa fa-arrow-up");
            $('#approved-Arrow').addClass("fa fa-arrow-down")
        }
        else {
           // $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
            $('#approved-Arrow').removeClass("fa fa-arrow-down");
            $('#approved-Arrow').addClass("fa fa-arrow-up")
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


        //Total Bills
        totalBills = parseInt(billScreenKPI[0]["TotalBillsCount"]);
        $('#total-Amount-Count').html((billScreenKPI[0]["TotalBillsCount"] == null ? 0 : billScreenKPI[0]["TotalBillsCount"]))
        $('#total-Amount').html("$" + (billScreenKPI[0]["TotalAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["TotalAmount"])) == -1 ? 0 :moneyFormatter(parseFloat(billScreenKPI[0]["TotalAmount"])) ));

        if (billScreenKPI[0]["CurrentWeekBillsClount"] == "0" || (parseInt(billScreenKPI[0]["CurrentWeekBillsClount"]) < parseInt(billScreenKPI[0]["LastWeekBillsCount"]))) {
            $("#total-Week-Count").html('' + (billScreenKPI[0]["CurrentWeekBillsClount"] == null ? 0 : billScreenKPI[0]["CurrentWeekBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#total-Week-Count").html('' + (billScreenKPI[0]["CurrentWeekBillsClount"] == null ? 0 : billScreenKPI[0]["CurrentWeekBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }
    }

    var BindTabCounts = function () {
        var unsubmitted = GetmatchedRecord(billList, 'Status', "50019");
        var rejectedBills = GetmatchedRecord(billList, 'Status', "50017");
        var unApproved = GetmatchedRecord(billList, 'Status', "50016");
        $('#un-Submitted-tab-Count').html("(" + unsubmitted.length + ")");
        $('#rejected-tab-Count').html("(" + rejectedBills.length + ")");
        $('#unapproved-tab-Count').html("(" + unApproved.length + ")");
    }

    var BindBillList=function(listBills)
    {
        var isDelete = GetmatchedRecord(RolePermissions, 'EntityActionID', '3001');
        var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
        var html = '';
        var $el = $('#tbl-Bill-Body');
        if (listBills != null && listBills.length > 0)
        {
            if (listBills[0]["Status"] == "50017" || listBills[0]["Status"] == "50016")
            {
                $('#chk-All-Lable').hide();
            }
            else {
                $('#chk-All-Lable').show();
            }
            $.each(listBills, function (index, item) {
                
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                if (item["Amount"] != "" && item["Amount"] != null) {
                    dollerAmount = $(item["Amount"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["Amount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html+='<tr>';
                html+='<td>';
                if (item["Status"] == "50019") {
                    html += '<input type="checkbox" data-Bills-Check="true" value="' + item["BillID"] + '">';
                }
                html+='</td>';
                html += '<td><h5 title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '"><a > ' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</a></h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5  title="' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5>';
                html+='</td>';
                html += '<td><h5 title="' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '" class="">' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '</h5></td><td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }
                //html += '<h5 style="color:red !important;">9/3/2020</h5>';
                html += '</td><td><h5 style="text-align:right;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+='</td>';
                html+='<td style="text-align:center;">';
                //
                if (item["Status"] == "50019") {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-pencil-square-o"></i></a>';
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete"  data-bill-Delete="' + item["BillID"] + '"><i class="fa fa-trash-o"></i></a>';
                }
                
                if (item["Status"] == "50017") {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="CreateNewBill.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-refresh"></i></a>';
                }
                if (item["Status"] == "50016") {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>';
                    html += '<img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">';
                }
                html += '</td></tr>';
            });

        }
        else {
            $('#chk-All-Lable').hide();
            html += '<tr><td colspan="7" style="text-align:center;">No data found</td><tr>';
        }

        
        $el.html(html);
     
         
        $("input:checkbox").uniform();
    }

    var GraphBinding = function (graphDetails) {

        var approvedObj = {};
        var rejectedObj = {};
        var awaitingObj = {};
        var awaitingamountValues = [];
        var apporvedamountValues = [];
        var rejectedamountValues = [];
        var graphData = [];
        if (isOnload == 0) {
            if (graphDetails.length > 0) {
                var approvedList = GetmatchedRecord(graphDetails, 'Status', "50015");
                var rejectedList = GetmatchedRecord(graphDetails, 'Status', "50017");

                if (graphDetails.length > 0) {
                    graphDetails = ObjSorter(graphDetails, "Year", '123');
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {};
                        if (item["Status"] == '50016') {
                            obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        } else {
                            obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        awaitingamountValues.push(obj);
                    });

                }

                if (graphDetails.length > 0) {
                    graphDetails = ObjSorter(graphDetails, "Year", '123');
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {};
                        if (item["Status"] == '50015') {
                            obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        } else {
                            obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        apporvedamountValues.push(obj);
                    });

                }

                if (graphDetails.length > 0) {
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var rejobj = {};
                        if (item["Status"] == '50017') {
                            rejobj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        }
                        else {
                            rejobj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        rejectedamountValues.push(rejobj);
                    });
                }

                awaitingObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": awaitingamountValues
                }
                graphData.push(awaitingObj);
                approvedObj = {
                    "color": "#5FBA50", "key": "Approved Bills ", "values": apporvedamountValues
                }
                graphData.push(approvedObj);
                rejectedObj = {
                    "color": "#ED5263", "key": "Rejected Bills ", "values": rejectedamountValues
                }
                graphData.push(rejectedObj);
            }
            else {
                var awaitingObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": [{ "x": " ", "y": '' }]
                }
                graphData.push(awaitingObj);
                var approvedObj = {
                    "color": "#5FBA50", "key": "Approved Bills ", "values": [{ "x": " ", "y": '' }]
                }
                graphData.push(approvedObj);
                var rejectedObj = {
                    "color": "#ED5263", "key": "Rejected Bills ", "values": [{ "x": " ", "y": '' }]
                }
                graphData.push(rejectedObj);
            }

            //var StackedBarChartModal3 =
            //    [

            // { "color": "#57D0B5", "key": "Approved Bills ", "values": [{ "x": " Jan 2019", "y": 10000000 }, { "x": " Jan 2019", "y": 17000000 }, { "x": " May 2020", "y": 14500000 }, { "x": "Customer Success", "y": 19000000 }, { "x": " Jul 2020", "y": 12700000 }, { "x": "My Portal", "y": 11800000 }, { "x": " Sep 2020", "y": 15900000 }, { "x": "ELM", "y": 12000000 }, { "x": " Nov 2020", "y": 100000 }, { "x": "LPM", "y": 12200000 }, { "x": " Jan 2014", "y": 12300000 }, { "x": "LM", "y": 12400000 }, { "x": " Mar 2014", "y": 1500000 }, { "x": "Process Management", "y": 17000000 }, { "x": " May 2014", "y": 17000000 }] },
            // { "color": "#26A7DD", "key": "Rejected Bills ", "values": [{ "x": " Jan 2019", "y": 900000000000 }, { "x": " Jan 2019", "y": 8500000 }, { "x": " May 2020", "y": 22000000 }, { "x": "Customer Success", "y": 16500000 }, { "x": " Jul 2020", "y": 27700000 }, { "x": "My Portal", "y": 23500000 }, { "x": " Sep 2020", "y": 24000000 }, { "x": "ELM", "y": 24500000 }, { "x": " Nov 2020", "y": 35000000 }, { "x": "LPM", "y": 15500000 }, { "x": " Jan 2014", "y": 6000000 }, { "x": "LM", "y": 12900000 }, { "x": " Mar 2014", "y": 12100000 }, { "x": "Process Management", "y": 4000000 }, { "x": " May 2014", "y": 9000000 }] }];
            // Get_StackedBarChartModal3('StackedBarChartModal3', graphData)
        }
        else {
            if (graphDetails.length > 0) {
                graphDetails = GetmatchedRecord(graphDetails, 'Year', moment().format('YYYY'));
                if (graphDetails.length > 0) {
                    var awaitingData = GetmatchedRecord(graphDetails, 'Status',"50016");
                    if (awaitingData.length > 0) {
                        awaitingData = ObjSorter(awaitingData, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                                var matchedMonthData = GetmatchedRecord(awaitingData, "Month", mIndex.toString());
                                var obj = {};
                                if (matchedMonthData.length > 0 && matchedMonthData[0]["Year"] == moment().format('YYYY')) {
                                    obj = {
                                        "x": " " + mItem + " " + matchedMonthData[0]["Year"],
                                        "y": parseInt(matchedMonthData[0]["Amount"])
                                    }
                                }
                                else {
                                    obj = {
                                        "x": " " + mItem + " " + moment().format('YYYY'),
                                        "y": 0
                                    }

                                }
                                matchedMonthData = [];
                                awaitingamountValues.push(obj);
                            }
                           
                        });
                    }
                    else {
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            var obj = {};
                                obj = {
                                    "x": " " + mItem + " " + moment().format('YYYY'),
                                    "y": 0
                                }
                            awaitingamountValues.push(obj);
                        });
                    }
                }

                if (graphDetails.length > 0) {
                    var approvedData = GetmatchedRecord(graphDetails, 'Status', "50015");
                    if (approvedData.length > 0) {
                        approvedData = ObjSorter(approvedData, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                              
                                var matchedApprovedMonthData = GetmatchedRecord(approvedData, "Month", mIndex.toString());
                                var obj = {};
                                if (matchedApprovedMonthData.length > 0 && matchedApprovedMonthData[0]["Year"] == moment().format('YYYY')) {
                                    obj = {
                                        "x": " " + mItem + " " + matchedApprovedMonthData[0]["Year"],
                                        "y": parseInt(matchedApprovedMonthData[0]["Amount"])
                                    }
                                }
                                else {
                                    obj = {
                                        "x": " " + mItem + " " + moment().format('YYYY'),
                                        "y": 0
                                    }

                                }
                                matchedApprovedMonthData = [];
                                apporvedamountValues.push(obj);
                            }
                           
                        });
                    }
                    else {
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            var obj = {};
                            obj = {
                                "x": " " + mItem + " " + moment().format('YYYY'),
                                "y": 0
                            }
                            apporvedamountValues.push(obj);
                        });
                    }

                }

                if (graphDetails.length > 0) {
                    var rejectedData = GetmatchedRecord(graphDetails, 'Status', "50017");
                    if (rejectedData.length > 0) {
                        rejectedData = ObjSorter(rejectedData, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex <= 12) {
                                var matchedRejectedMonthData = GetmatchedRecord(rejectedData, "Month", mIndex.toString());
                                var obj = {};
                                if (matchedRejectedMonthData.length > 0 && matchedRejectedMonthData[0]["Year"] == moment().format('YYYY')) {
                                    obj = {
                                        "x": " " + mItem + " " + matchedRejectedMonthData[0]["Year"],
                                        "y": parseInt(matchedRejectedMonthData[0]["Amount"])
                                    }
                                }
                                else {
                                    obj = {
                                        "x": " " + mItem + " " + moment().format('YYYY'),
                                        "y": 0
                                    }

                                }
                                matchedRejectedMonthData = [];
                                rejectedamountValues.push(obj);
                            }
                        
                        });
                    }
                    else {
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            var obj = {};
                            obj = {
                                "x": " " + mItem + " " + moment().format('YYYY'),
                                "y": 0
                            }
                            rejectedamountValues.push(obj);
                        });
                    }
                }

                awaitingObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": awaitingamountValues
                }
                graphData.push(awaitingObj);
                approvedObj = {
                    "color": "#5FBA50", "key": "Approved Bills ", "values": apporvedamountValues
                }
                graphData.push(approvedObj);
                rejectedObj = {
                    "color": "#ED5263", "key": "Rejected Bills ", "values": rejectedamountValues
                }
                graphData.push(rejectedObj);
            }
            else {
                var emptyData = [];

                $.each(moment.monthsShort(), function (mIndex, mItem) {
                    var obj = {};
                    obj = {
                        "x": " " + mItem + " " + moment().format('YYYY'),
                        "y": 0
                    }
                    emptyData.push(obj);
                });

                var awaitingObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": emptyData
                }
                graphData.push(awaitingObj);
                var approvedObj = {
                    "color": "#5FBA50", "key": "Approved Bills ", "values": emptyData
                }
                graphData.push(approvedObj);
                var rejectedObj = {
                    "color": "#ED5263", "key": "Rejected Bills ", "values": emptyData
                }
                graphData.push(rejectedObj);
            }
        }
       
        isOnload = 0;
        if (isMonthFilterSelected == 0) {
            Get_StackedBarChartModalUserHome('StackedBarChartModal3', graphData);
        }
        else {
            var weeklyGraphData = [];
            weeklyGraphData = GetWeeklyGraphData(graphDetails);
            Get_StackedBarChartModalUserHome('StackedBarChartModal3', weeklyGraphData);
        }
       
    }

    var GetWeeklyGraphData = function (graphDetails) {
        var approvedObj = {};
        var rejectedObj = {};
        var awaitingObj = {};
        var awaitingamountValues = [];
        var apporvedamountValues = [];
        var rejectedamountValues = [];
        var graphData = [];
            if (graphDetails.length > 0) {
                var approvedList = GetmatchedRecord(graphDetails, 'Status', "50015");
                var rejectedList = GetmatchedRecord(graphDetails, 'Status', "50017");

                if (graphDetails.length > 0) {
                    graphDetails = ObjSorter(graphDetails, "Week", '123');
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {};
                        if (item["Status"] == '50016') {
                            obj = {
                                "x": " W" + item["Week"],
                                "y": parseInt(item["Amount"])
                            }
                        } else {
                            obj = {
                                "x": " W" + item["Week"],
                                "y": 0
                            }
                        }

                        awaitingamountValues.push(obj);
                    });

                }

                if (graphDetails.length > 0) {
                    graphDetails = ObjSorter(graphDetails, "Week", '123');
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {};
                        if (item["Status"] == '50015') {
                            obj = {
                                "x": " W" + item["Week"],
                                "y": parseInt(item["Amount"])
                            }
                        } else {
                            obj = {
                                "x": " W" + item["Week"],
                                "y": 0
                            }
                        }

                        apporvedamountValues.push(obj);
                    });

                }

                if (graphDetails.length > 0) {
                    graphDetails = ObjSorter(graphDetails, "Week", '123');
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var rejobj = {};
                        if (item["Status"] == '50017') {
                            rejobj = {
                                "x": " W" + item["Week"],
                                "y": parseInt(item["Amount"])
                            }
                        }
                        else {
                            rejobj = {
                                "x": " W" + item["Week"],
                                "y": 0
                            }
                        }

                        rejectedamountValues.push(rejobj);
                    });
                }

                awaitingObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": awaitingamountValues
                }
                graphData.push(awaitingObj);
                approvedObj = {
                    "color": "#5FBA50", "key": "Approved Bills ", "values": apporvedamountValues
                }
                graphData.push(approvedObj);
                rejectedObj = {
                    "color": "#ED5263", "key": "Rejected Bills ", "values": rejectedamountValues
                }
                graphData.push(rejectedObj);
            }
            else {
                var awaitingObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": [{ "x": " ", "y": '' }]
                }
                graphData.push(awaitingObj);
                var approvedObj = {
                    "color": "#5FBA50", "key": "Approved Bills ", "values": [{ "x": " ", "y": '' }]
                }
                graphData.push(approvedObj);
                var rejectedObj = {
                    "color": "#ED5263", "key": "Rejected Bills ", "values": [{ "x": " ", "y": '' }]
                }
                graphData.push(rejectedObj);
            }
            return graphData;
       
    }

    var BindBillPercentage = function () {
        if (billList.length > 0) {

        
        var unsubmitted = GetmatchedRecord(billList, 'Status', "50019");
        var rejectedBills = GetmatchedRecord(billList, 'Status', "50017");
        var approveddBills = GetmatchedRecord(billList, 'Status', "50015");
        var awaitingApproval = GetmatchedRecord(billList, 'Status', "50016");
        var partialApproval = GetmatchedRecord(billList, 'Status', "50034");
        var paymentCompleted = GetmatchedRecord(billList, 'Status', "50044");
        var flagged = GetmatchedRecord(billList, 'Status', "50018");
        var disputed = GetmatchedRecord(billList, 'Status', "50036");

        var unSubmittedPercentage = (unsubmitted.length * 100) / totalBills;
        var rejectedPercentage = (rejectedBills.length * 100) / totalBills;
        var approvedPercentage = (approveddBills.length * 100) / totalBills;
        var awaitingApprovalPercentage = (awaitingApproval.length * 100) / totalBills;
        var partialApprovalPercentage = (partialApproval.length * 100) / totalBills;
        var paymentCompletedPercentage = (paymentCompleted.length * 100) / totalBills;
        var flaggedPercentage = (flagged.length * 100) / totalBills;
        var diaputedPercentage = (disputed.length * 100) / totalBills;

        var Data_PieChartoutside = [
               {
                   key: " Unsubmitted Bills",
                   y: unSubmittedPercentage.toFixed(2)
               
               },
               {
                   key: " Awaiting Approvals",
                   y: awaitingApprovalPercentage.toFixed(2)
               
               },
               {
                   key: " Approved Bills",
                   y: approvedPercentage.toFixed(2)
               
               },
               {
                   key: " Rejected Bills",
                   y: rejectedPercentage.toFixed(2)
               
               },
                {
                    key: " Partially Approved Bills",
                    y: partialApprovalPercentage.toFixed(2)

                },
                 {
                     key: " Paid Bills",
                     y: paymentCompletedPercentage.toFixed(2)

                 },
                 {
                     key: " Flagged Bills",
                     y: flaggedPercentage.toFixed(2)

                 },
                 {
                    key: " Disputed Bills",
                    y: diaputedPercentage.toFixed(2)

                  }
        ];

        $('#pieChartDive').html(' <svg id="PieChartValuesOutside" class="" style="height:280px !important;"></svg>');
        $('#nodata-Chart').hide();
        Get_PieChartValuesOutside("PieChartValuesOutside", Data_PieChartoutside);

//Bind Counts
        $('#un-Sub-Perc').html(unsubmitted.length);
        $('#Approved-Perc').html(approveddBills.length);
        $('#Rejected-Perc').html(rejectedBills.length);
        $('#Approve-Pending-perc').html(awaitingApproval.length);
        $('#paid-Perc').html(paymentCompleted.length);
        $('#Partially-Perc').html(partialApproval.length);
        $('#Disp-Perc').html(disputed.length);
        $('#Flagged-Perc').html(flagged.length);

//Bind line Percentage
        $('#un-Sumbitted-Line').css("width", "" + unSubmittedPercentage + "%");
        $('#Approved-Line').css("width", "" + approvedPercentage + "%");
        $('#Rejected-Line').css("width", "" + rejectedPercentage + "%");
        $('#Approve-pending-Line').css("width", "" + awaitingApprovalPercentage + "%");
        $('#Partially-Line').css("width", "" + partialApprovalPercentage + "%");
        $('#paid-line').css("width", "" + paymentCompletedPercentage + "%");
        $('#Disp-Line').css("width", "" + diaputedPercentage + "%");
        $('#Flagged-Line').css("width", "" + flaggedPercentage + "%");

//Bind percentage title
        $('#un-Sumbitted-Line').attr("title", "" + unSubmittedPercentage.toFixed(2) + "%");
        $('#Approved-Line').attr("title", "" + approvedPercentage.toFixed(2) + "%");
        $('#Rejected-Line').attr("title", "" + rejectedPercentage.toFixed(2) + "%");
        $('#Approve-pending-Line').attr("title", "" + awaitingApprovalPercentage.toFixed() + "%");
        $('#Partially-Line').attr("title", "" + partialApprovalPercentage.toFixed() + "%");
        $('#paid-line').attr("title", "" + paymentCompletedPercentage.toFixed() + "%");
        $('#Disp-Line').attr("title", "" + diaputedPercentage.toFixed() + "%");
        $('#Flagged-Line').attr("title", "" + flaggedPercentage.toFixed() + "%");

        if (billScreenKPI[0]["CWeekApprovedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekApprovedCount"]) < parseInt(billScreenKPI[0]["LWeekApprovedCount"]))) {
          
            $('#approved-Arrow').removeClass("fa fa-arrow-up");
            $('#approved-Arrow').addClass("fa fa-arrow-down")
        }
        else {
           
            $('#approved-Arrow').removeClass("fa fa-arrow-down");
            $('#approved-Arrow').addClass("fa fa-arrow-up")
        }
        }
        else {
            
            //Reset Count
            $('#un-Sub-Perc').html("0");
            $('#Approved-Perc').html("0");
            $('#Rejected-Perc').html("0");
            $('#Approve-Pending-perc').html("0");
            $('#paid-Perc').html("0");
            $('#Partially-Perc').html("0");
            $('#Disp-Perc').html("0");
            $('#Flagged-Perc').html("0");

            //Reset line width
            $('#un-Sumbitted-Line').css("width", "0%");
            $('#Approved-Line').css("width", "0%");
            $('#Rejected-Line').css("width", "0%");
            $('#Approve-pending-Line').css("width", "0%");
            $('#Partially-Line').css("width", "0%");
            $('#paid-line').css("width", "0%");
            $('#Disp-Line').css("width", "0%");
            $('#Flagged-Line').css("width", "0%");


            //Reset Title
            $('#un-Sumbitted-Line').attr("title", "0%");
            $('#Approved-Line').attr("title", "0%");
            $('#Rejected-Line').attr("title", "0%");
            $('#Approve-pending-Line').attr("title", "0%");
            $('#Partially-Line').attr("title", "0%");
            $('#paid-line').attr("title", "0%");
            $('#Disp-Line').attr("title", "0%");
            $('#Flagged-Line').attr("title", "0%");



            $('#approved-Arrow').removeClass("fa fa-arrow-up");
            $('#approved-Arrow').addClass("fa fa-arrow-down");

            $('#rejected-Arrow').removeClass("fa fa-arrow-up");
            $('#rejected-Arrow').addClass("fa fa-arrow-down");

            $('#un-Sub-Arrow').removeClass("fa fa-arrow-up");
            $('#un-Sub-Arrow').addClass("fa fa-arrow-down")
            

            $('#pieChartDive').html('');
            $('#nodata-Chart').show();
           
        }

    }

}

//Data Manipulation
{
    var GetUserHomeScreenData = function (obj) {
        var _obj = {
            'UserHomeObj': obj
        };
        var tempList = {};
        $.when(RequestServer("Bill_UserHome.aspx/GetUserHomeScreenData", _obj)).done(function (response) {
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

    var SubmitBills = function () {
        var selectedBills = $('#tbl-Bill-Body input[type="checkbox"]:checked');
        var submitBills = [];
        var responseValue;
        if ($('#tbl-Bill-Body input[type="checkbox"]:checked').length > 0) {
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
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    $.notify("Bill(s) submitted successfully !!", { position: "right top", className: "success" });
                    BindUserHomeScreen();
                    $('#mp_bill_Submit').hide();
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
    var GetFilterObject=function(selectedFilter)
    {
        var obj = {};
        switch(selectedFilter)
        {
            case "Overdue":
                obj = {
                    'StartDate': '',
                    'EndDate':"",
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 1,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter':0,
                }
                startDate = moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                endDate = moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                isOverDue = 1;
                isDueFilter = 0;
                status = 50019;
                isMonthFilterSelected = 0;
                KpiStatus = 0;
                break;
            case "Created Today":
                obj = {
                    'StartDate': moment().format('MM/DD/YYYY'),
                    'EndDate': moment().format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0
                }
                startDate = moment().format('MM/DD/YYYY')
                endDate = moment().add(1, 'd').format('MM/DD/YYYY');
           //     endDate = moment().format('MM/DD/YYYY')
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Created This Week":
                obj = {
                    'StartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0,
                }
                startDate = moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                endDate = moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Created Last Week":
                obj = {
                    'StartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(2, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(2, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0,
                }
                startDate = moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                endDate = moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Created This Month":
                obj = {
                    'StartDate': moment().clone().startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().clone().endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0,
                }
                startDate = moment().clone().startOf('month').format('MM/DD/YYYY');
                endDate = moment().clone().endOf('month').format('MM/DD/YYYY');
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Created Last Month":
                obj = {
                    'StartDate': moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'months').endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0,
                }
                startDate = moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY');
                endDate = moment().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Created This Year":
                obj = {
                    'StartDate': moment().startOf('year').format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('year').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0,

                }
                startDate = moment().startOf('year').format('MM/DD/YYYY');
                endDate = moment().endOf('year').format('MM/DD/YYYY');
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 0;
                KpiStatus = 0;
                break;
            case "Created Last Year":
                obj = {
                    'StartDate': moment().subtract(1, 'years').startOf('year').format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'years').endOf('year').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 0,
                }
                startDate = moment().subtract(1, 'years').startOf('year').format('MM/DD/YYYY'),
                endDate = moment().subtract(1, 'years').endOf('year').format('MM/DD/YYYY'),
                isOverDue = 0;
                status = 50019;
                isDueFilter = 0;
                isMonthFilterSelected = 0;
                KpiStatus = 0;
                break;
            case "Due This Week":
                obj = {
                    'StartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 1,
                }
                startDate = moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                endDate = moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                isOverDue = 0;
                status = 50019;
                isDueFilter = 1;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Due Next Week":
                obj = {
                    'StartDate': moment().add(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().add(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter':1,
                }
                startDate = moment().add(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                endDate = moment().add(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                isOverDue = 0;
                status = 50019;
                isDueFilter = 1;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;
            case "Due This Month":
                obj = {
                    'StartDate': moment().clone().startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().clone().endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'Status': 0,
                    'IsOnload': 0,
                    'IsDueFilter': 1,
                }
                startDate = moment().clone().startOf('month').format('MM/DD/YYYY');
                endDate = moment().clone().endOf('month').format('MM/DD/YYYY');
                isOverDue = 0;
                status = 50019;
                isDueFilter = 1;
                isMonthFilterSelected = 1;
                KpiStatus = 0;
                break;

        }
        return obj;
    }

    //function moneyFormatter(num) {
    //    if (num > 999 && num < 1000000) {
    //        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    //    } else if (num > 1000000) {
    //        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    //    } else if (num < 900) {
    //        return num; // if value < 1000, nothing to do
    //    }
    //}
}

//BindBillList With Pagination
{
    var BindUserHomeBillList = function () {
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
                "url": "Bill_UserHome.aspx/GetBillList",
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
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[4, "asc"]],
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
                    "width": '4%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        if (data["Status"] == "50019") {
                            html += '<input type="checkbox" data-Bills-Check="true" value="' + data["BillID"] + '">';
                        }
                        else {
                            html += '<input type="checkbox" disabled>';
                        }
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["VendorName"] == null ? '-' : data["VendorName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '12%',
                    "mData": function (data, type, dataToSet) {
                       
                        if (data["Status"] == "50016") {
                            
                                var html = '<h5><a href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                                return html;
                            }
                            else {
                            var html = '<h5><a href="CreateNewBill.aspx?BillID=' + data["BillID"] + '">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                            return html;
                        }
                            
                       
                    }
                },
                {
                    "width": '28%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["Description"] == null || data["Description"] == '' ? '-' : data["Description"]) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<div style="">';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["DueDate"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["DueDate"] == null ? '-' : moment(data["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                        }
                        else {
                            html += '<h5 style="color:red !important;" >' + (data["DueDate"] == null ? '-' : moment(data["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                        }
                        html += '</div>';
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<div style="text-align: center;">';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["NextDueDate"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["NextDueDate"] == null ? '-' : moment(data["NextDueDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5 style="color:red !important;" >' + (data["NextDueDate"] == null ? '-' : moment(data["NextDueDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        html += '</div>';
                        return html;
                    }
                },
                {
                    "width": '15%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amount = (data["Amount"] == null ? 0.00 : parseFloat(data["Amount"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '6%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        
                        var html = '';
                        var isDelete = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
                        var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3001');
                        if (data["Status"] == "50019") {
                            html += '<div class="screen-row isc-inline-pop-action-s1 cell-right mar-rgt-20" >';
                            html += '<a class="isc-action-badge-td-s1" title="More Actions" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
                            html += '<i class="fa fa-ellipsis-h "></i></a>';
                            html += '<ul class="dropdown-menu-entity">';
                            //******hiperlink to Billno
                            // html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="View""  href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1">View</a></li>';
                            if (isDelete.length > 0 && data["Status"] == "50019") {
                                html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" data-bill-Delete="' + data["BillID"] + '">Delete</a></li>';
                            }
                            html += '</ul>';
                            html += '</div>';
                        }
                       
                        html += '<div class="cell-left isc-mb-res-pad-lft-15">';
                       // html += '<a class="isc-action-badge-td-s1" title="View""  href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1" ><i class="fa fa-eye"></i></a>';

                        if ((isEdit.length > 0 && data["Status"] == "50019")||(clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0 && data["Status"] == '50016' && clientConfigurations[0]["IsChangesAllowed"] == "1" && data["ApprovalStage"] == '1')) {
                            //***********hiperlink to Billno
                            // html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-pad-lft-50 " title="Edit" href="CreateNewBill.aspx?BillID=' + data["BillID"] + '"><i class="fa fa-pencil-square-o"></i></a>';
                          //  html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete"  data-bill-Delete="' + data["BillID"] + '"><i class="fa fa-trash-o"></i></a>';
                        }
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-pad-lft-30"  title="Comments"  bill-Comments="' + data["BillID"] + '"><i class="fa fa-comment-o"></i></a>';
                        if (data["Status"] != "50019") {
                             //******hiperlink to Billno
                           // html += '<a style="padding-left: 7px;" class="isc-action-badge-td-s1" title="View""  href="CreateNewBill.aspx?BillID=' + data["BillID"] + '&&IsView=1" ><i class="fa fa-eye"></i></a>';
                        }
                        if (isEdit.length > 0 && data["Status"] == "50017") {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="CreateNewBill.aspx?BillID=' + data["BillID"] + '"><i class="fa fa-refresh"></i></a>';
                        }
                        //if (isEdit.length > 0 && data["Status"] == "50017") {
                        //    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="CreateNewBill.aspx?BillID=' + data["BillID"] + '"><i class="fa fa-refresh"></i></a>';
                        //}
                      //  if (data["Status"] == "50016") {
                           // html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>';
                          //  html += '<img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">';
                       // }
                        html += '</div>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
                $('#tbl-Bills tr td').each(function (index, item) {
                    var text = $(item).text();
                    if (text != "DeleteComments") {
                        $(item).attr('title', text);
                    }
                   
                });
                $("input:checkbox").uniform();
               // $('#tbl-Bills tr').css('z-index', 9999);
            },
            "fnDrawCallback": function () {
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
        //if (KpiStatus != 0 && KpiStatus !=parseInt( status)) {
        //    status = 0;
        //    KpiStatus = 0;
        //}


        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.Status = (KpiStatus == 0 ? parseInt(status) : 0);
        obj.IsOverDue = isOverDue;
        obj.StartDate = startDate;
        obj.EndDate = endDate;
        obj.IsDueFilter = isDueFilter;
        obj.KpiStatus = (KpiStatus == parseInt(status) ? parseInt(status) : 0)
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
                orderBy = "DueDate " + direction;
                break;
            case 5:
                orderBy = "NextDueDate " + direction;
                break;
            case 6:
                orderBy = "Amount " + direction;
                break;
            //case 6:
            //    orderBy = "DueDate " + direction;
            //    break;
            //case 7:
            //    orderBy = "Amount " + direction;
            //    break;
        }
        return orderBy;
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
                    html += '<div class="isc-95per ">'
                    html += '<div class="isc-single-discussion-content">'
                   
                 
                    html += '<span title="' + item["CreatedOn"] + '">On ' + (item["CreatedOn"] == null ? ' - ' : item["CreatedOn"]) + '</span>'
                    html += '<label  class="isc-dis-block isc-pad-left-10 isc-new-cmt mar-top-15">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</label>'
                    html += '<label class="smt-li-dataplan-inner-sub-title isc-f-13">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + '</label>'
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

        if (ActionName != '') {
            SaveBillcommants(ActionName);
        }
    });
    var SaveBillcommants = function (ActionName) {
       
        var trimStr = $.trim(Command);
        Command = $('#txt-Command').val();
        if (Command != "") {
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
    //            html+='<div class="form-group">';
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