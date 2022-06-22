

//Global Variables
{
    var paymentSummaryScreenData = [];
    var paymentScreenKPI = [];
    var paymentScreenBills = [];
    var sortList = [];
    var status = 50023
    var isRecurring = 0;
    var FilterStartDate = null;
    var FilterEndDate = null;
    var TabCountData = [];
    var KpiStatus = 0;
    var dueFrom = '';
    var dueTo = '';
    var overDue = '';
    var DVendor = 0;
    var DInvoice = '0';
    var DStatus = 0;
    var isSearched = 0;
    var isOnload = 0;
    var dataAllCount = 0;
    var fileContainer = [];
    var fileResponse = [];
    var createdDate = '';
    var paidDate = '';
    var TotalAmount = 0;
    var Command = "";
    var billId = 0;
    var Billstatus = '0';
    var BillrowID = 0;
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            $('[data-type=currency]').mask("#,##0.00", { reverse: true });
            // $('#txt-PaidOn').datepicker();

            //$('#txt-PaidOn').datepicker({
            //    format: 'mm/dd/yyyy',
            //    endDate: '+0d',
            //    autoclose: true
            //});

            $('#txt-PaidOn').mask('00/00/0000');
            RegisterDatepicker();
            $('.input-mini').mask('00/00/0000');
          //  $('.iscdatepicker').datepicker();
            $('#txt-DueRange').mask('00/00/0000 - 00/00/0000')
            BindPayamentScreen();
            isOnload = 1;
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#unPaid-Tab', function () {
        //var unPaidBills = GetmatchedRecord(paymentScreenBills, 'PaymentStatus', "50023");
        //sortList = unPaidBills;
        //BindBillList(unPaidBills);
        status = 50023
        isRecurring = 0;
        BindPayerBillList();
        // $('#unpaid-Bills').html("("+TabCountData.length+")");

    });

    $(document).on('click', '#all-Tab', function () {

        //sortList = paymentScreenBills;
        //BindBillList(paymentScreenBills);
        status = 0
        isRecurring = 0;
        BindPayerBillList();
        // $('#all-Bills').html("(" + TabCountData.length + ")");
    })

    $(document).on('click', '#disputed-Tab', function () {
        //var disputeBills = GetmatchedRecord(paymentScreenBills, 'PaymentStatus', "50033");
        //sortList = disputeBills;
        //BindBillList(disputeBills);
        status = 50033
        isRecurring = 0;
        BindPayerBillList();
        //     $('#disputed-Bills').html("(" + TabCountData.length + ")");
    })

    $(document).on('click', '#recurring-Tab', function () {
        //var recurringBills = GetmatchedRecord(paymentScreenBills, 'IsRecurring', "1");
        //sortList = recurringBills;
        //BindBillList(recurringBills);
        status = 0
        isRecurring = 1;
        BindPayerBillList();
        //  $('#recurring-Bills').html("(" + TabCountData.length + ")");
    });
    $(document).on('click', '#Paidbill-Tab', function () {
        //var recurringBills = GetmatchedRecord(paymentScreenBills, 'IsRecurring', "1");
        //sortList = recurringBills;
        //BindBillList(recurringBills);
        status = 50044;
        isRecurring = 0;
        BindPayerBillList();
        //  $('#recurring-Bills').html("(" + TabCountData.length + ")");
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

    $(document).on('click', '#Btn_serch', function () {
        $loading.show();
        setTimeout(function () {
            isSearched = 1;
            DVendor = parseInt($('#slt-Vendor').val());
            DInvoice = $('#slt-Invoice').val()
            DStatus = parseInt($('#slt-Status').val());
            createdDate = $('#txt-CreatedDate').val();
            paidDate = $('#txt-PaidDate').val();
            dueFrom = '';
            dueTo = ''
            overDue = ''
            KpiStatus = 0;

            if (DStatus == 50023) {
                $('#ul-Tab li').removeClass('active');
                $('#unPaid-Tab').addClass('active');
                status = 50023
            }
            else if (DStatus == 50033) {
                $('#ul-Tab li').removeClass('active');
                $('#disputed-Tab').addClass('active');
                status = 50033

            }
            else if (DStatus == 0 || (DStatus != 50023 && DStatus != 50033)) {
                $('#ul-Tab li').removeClass('active');
                $('#all-Tab').addClass('active');
                status = 0
            }
            BindPayerBillList();
            BindSearchedTabCounts();
            //   BindTabCounts(TabCountData);
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
                $('#txt-CreatedDate').val('');
                $('#txt-PaidDate').val('');
                RegisterDatepicker();
                createdDate = '';
                paidDate = '';
                $('.input-mini').mask('00/00/0000');
                dueFrom = '';
                dueTo = ''
                overDue = ''
                KpiStatus = 0;
                status = 50023;
                DVendor = 0
                DInvoice = '0'
                DStatus = 0;
                BindPayamentScreen();
                $('#ul-Tab li').removeClass('active');
                $('#unPaid-Tab').addClass('active');
                $loading.hide();
            }, 0);
        }

    });

    $(document).on('click', '[data-Kpi]', function () {
        KpiStatus = parseInt($(this).attr('data-Kpi'));
        $loading.show()
        setTimeout(function () {
            $('#slt-Vendor').val(0);
            $('#slt-Invoice').val(0);
            $('#slt-Status').val(0);
            $('.select2').select2();
            $('#txt-DueRange').val('');
            $('#txt-CreatedDate').val('');
            $('#txt-PaidDate').val('');
            RegisterDatepicker();
            createdDate = '';
            paidDate = '';
            isSearched = 0;
            DVendor = 0
            DInvoice = '0'
            DStatus = 0;
            if (KpiStatus != 1 && KpiStatus != 0) {
                dueFrom = '';
                dueTo = ''
                overDue = ''
                FilterStartDate = '';
                FilterEndDate = '';
                BindPayamentScreen();
            }
            else if (KpiStatus == 1) {
                dueFrom = moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                dueTo = moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY')
                overDue = ''
                FilterStartDate = '';
                FilterEndDate = '';
                BindPayamentScreen();
            }
            else if (KpiStatus == 0) {
                KpiStatus = 50023;
                dueFrom = '';
                dueTo = ''
                FilterStartDate = '';
                FilterEndDate = '';
                overDue = moment().format('MM/DD/YYYY');
                BindPayamentScreen();
            }

            $loading.hide();
        }, 0);
    });


}

//Dom Manipulation
{
    var BindPayamentScreen = function () {
        paymentSummaryScreenData = GetPaymentSummaryScreenData();
        if (paymentSummaryScreenData != null && paymentSummaryScreenData.length > 0) {
            paymentScreenKPI = $.parseJSON(paymentSummaryScreenData[0]["Table"]);
            paymentScreenBills = $.parseJSON(paymentSummaryScreenData[1]["Table1"])
            BindKPI();
            if (isOnload == 0) {
                BindMasterData();
            }

            //var unPaidBills = GetmatchedRecord(paymentScreenBills, 'PaymentStatus', "50023");
            //sortList = unPaidBills;
            //BindBillList(unPaidBills);
            BindPayerBillList();
            BindTabCounts(paymentScreenBills);

        }
    }

    var BindMasterData = function () {
        BindDropDowns($('#slt-Vendor'), $.parseJSON(paymentSummaryScreenData[2]["Table2"]), 'Choose Vendor')
        BindDropDowns($('#slt-Status'), $.parseJSON(paymentSummaryScreenData[3]["Table3"]), 'Choose Payment Status')
        BindDropDowns($('#slt-Invoice'), $.parseJSON(paymentSummaryScreenData[1]["Table1"]), 'Choose Bill/Invoice #')
        BindDropDowns($('#slt-PaymentMode'), $.parseJSON(paymentSummaryScreenData[4]["Table4"]), 'Choose Payment Method')
    }

    var BindKPI = function () {
        //OutStandingPayments
        $('#out-Standing-Count').html((paymentScreenKPI[0]["OutStandingCount"] == null ? 0 : paymentScreenKPI[0]["OutStandingCount"]));
        $('#out-Standing-Amount').html("$" + (paymentScreenKPI[0]["TotalOutStandingAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["TotalOutStandingAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(paymentScreenKPI[0]["TotalOutStandingAmount"]))));

        if (paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"] == "0" || (parseInt(paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"]) < parseInt(paymentScreenKPI[0]["LastWeekOutStandingBillsCount"]))) {
            $('#outStanding-This-Week').html('' + (paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#outStanding-This-Week').html('' + (paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }



        //OverDue
        $('#overDue-Count').html((paymentScreenKPI[0]["OverDueCount"] == null ? 0 : paymentScreenKPI[0]["OverDueCount"]));
        $('#overDue-Amount').html("$" + (paymentScreenKPI[0]["OverDueAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["OverDueAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(paymentScreenKPI[0]["OverDueAmount"]))));
        if (paymentScreenKPI[0]["CWeekOverDueCount"] == "0" || (parseInt(paymentScreenKPI[0]["CWeekOverDueCount"]) < parseInt(paymentScreenKPI[0]["LWeekOverDueCount"]))) {
            $('#overDue-This-week').html('' + (paymentScreenKPI[0]["CWeekOverDueCount"] == null ? 0 : paymentScreenKPI[0]["CWeekOverDueCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#overDue-This-week').html('' + (paymentScreenKPI[0]["CWeekOverDueCount"] == null ? 0 : paymentScreenKPI[0]["CWeekOverDueCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }



        //Flagged 
        $('#flaged-Count').html((paymentScreenKPI[0]["FlaggedCount"] == null ? 0 : paymentScreenKPI[0]["FlaggedCount"]));
        $('#flagged-Amount').html("$" + (paymentScreenKPI[0]["FlaggedAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["FlaggedAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(paymentScreenKPI[0]["FlaggedAmount"]))));
        if (paymentScreenKPI[0]["CurrentFlaggedBillsClount"] == "0" || (parseInt(paymentScreenKPI[0]["CurrentFlaggedBillsClount"]) < parseInt(paymentScreenKPI[0]["LastWeekFlaggedBillsCount"]))) {
            $('#flagged-This-Week').html('' + (paymentScreenKPI[0]["CurrentFlaggedBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentFlaggedBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {

            $('#flagged-This-Week').html('' + (paymentScreenKPI[0]["CurrentFlaggedBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentFlaggedBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }


        //Due This week
        $('#due-Thisweek-Count').html((paymentScreenKPI[0]["DuethisWeekCount"] == null ? 0 : paymentScreenKPI[0]["DuethisWeekCount"]));
        $('#due-This-Week-Amount').html("$" + (paymentScreenKPI[0]["DuethisWeekAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["DuethisWeekAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(paymentScreenKPI[0]["DuethisWeekAmount"]))));
        if (paymentScreenKPI[0]["CWeekDueThisWeekCount"] == "0" || (parseInt(paymentScreenKPI[0]["CWeekDueThisWeekCount"]) < parseInt(paymentScreenKPI[0]["LWeekDueThisWeekCount"]))) {
            $('#new-Due-This-Week').html('' + (paymentScreenKPI[0]["CWeekDueThisWeekCount"] == null ? 0 : paymentScreenKPI[0]["CWeekDueThisWeekCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#new-Due-This-Week').html('' + (paymentScreenKPI[0]["CWeekDueThisWeekCount"] == null ? 0 : paymentScreenKPI[0]["CWeekDueThisWeekCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }



    }

    var BindTabCounts = function (paymentScreenBillsData) {
        if (paymentScreenBillsData != null && paymentScreenBillsData.length > 0) {

            var unPaidBills = GetmatchedRecord(paymentScreenBillsData, 'PaymentStatus', "50023");
            var disputeBills = GetmatchedRecord(paymentScreenBillsData, 'PaymentStatus', "50033");
            var recurringBills = GetmatchedRecord(paymentScreenBillsData, 'IsRecurring', "1");
            var paidbillcnt = GetmatchedRecord(paymentScreenBillsData, 'PaymentStatus', "50044");
            $('#unpaid-Bills').html("(" + unPaidBills.length + ")");
            $('#all-Bills').html("(" + paymentScreenBillsData.length + ")");
            $('#disputed-Bills').html("(" + disputeBills.length + ")");
            $('#recurring-Bills').html("(" + recurringBills.length + ")");
            $('#paid-Bills').html("(" + paidbillcnt.length + ")");
        }
        else {

            $('#unpaid-Bills').html("(0)");
            $('#all-Bills').html("(0)");
            $('#disputed-Bills').html("(0)");
            $('#recurring-Bills').html("(0)");
            $('#paid-Bills').html("(0)");
        }



    }

    var BindSearchedTabCounts = function () {
        if (TabCountData != null && TabCountData != undefined && TabCountData.length > 0) {
            $('#unpaid-Bills').html("(" + TabCountData[0]["PaymentPendingCount"] + ")");
            $('#all-Bills').html("(" + TabCountData[0]["AllCount"] + ")");
            $('#disputed-Bills').html("(" + TabCountData[0]["DisputedCount"] + ")");
            $('#recurring-Bills').html("(" + TabCountData[0]["RecurringCount"] + ")");
            $('#paid-Bills').html("(" + TabCountData[0]["Paidbillcount"] + ")");
        }
        else {
            $('#unpaid-Bills').html("(0)");
            $('#all-Bills').html("(0)");
            $('#disputed-Bills').html("(0)");
            $('#recurring-Bills').html("(0)");
            $('#paid-Bills').html("(0)");
        }
    }

    var BindBillList = function (billList) {
        var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
        var isFlag = GetmatchedRecord(RolePermissions, 'EntityActionID', '3007');
        var isDispute = GetmatchedRecord(RolePermissions, 'EntityActionID', '3008');

        var $el = $("#tbl-Bills-Bdy");
        var html = '';
        if (billList.length > 0) {
            $.each(billList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueOn"]);
                if (item["ApprovedAmount"] != "" && item["ApprovedAmount"] != null) {
                    dollerAmount = $(item["ApprovedAmount"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["ApprovedAmount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html += '<tr>';
                //html += '<td>';
                //if (item["Status"] == "50019") {
                //    html += '<input type="checkbox" value="' + item["BillID"] + '">';
                //}
                //html += '</td>';
                html += '<td>';
                html += '<h5 title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</h5>';
                html += '</td>';
                html += '<td> <h5 title="' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5></td>';
                html += '<td>';
                html += '<h5 title="' + (item["Description"] == null ? '-' : item["Description"]) + '">' + (item["Description"] == null ? '-' : item["Description"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["PaymentStatus"]);
                html += '<a  title="' + (item["PaymentStatusName"] == null ? '-' : item["PaymentStatusName"]) + '" class="isc-lbl-act-read-list-s1 ' + colorCode + '">' + (item["PaymentStatusName"] == null ? '-' : item["PaymentStatusName"]) + '</a>';
                html += '</div></td>';
                html += '<td>';
                html += '<h5 title="Payments">Payments</h5>';
                html += '</td>';
                html += '<td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (item["DueOn"] == null ? '-' : moment(item["DueOn"])).format('MM/DD/YYYY') + '>' + (item["DueOn"] == null ? '-' : moment(item["DueOn"])).format('MM/DD/YYYY') + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (item["DueOn"] == null ? '-' : moment(item["DueOn"])).format('MM/DD/YYYY') + '>' + (item["DueOn"] == null ? '-' : moment(item["DueOn"])).format('MM/DD/YYYY') + '</h5>';
                }

                // html+='<h5 style="color:red !important;">9/3/2020</h5>';
                html += '</td>';
                html += '<td><h5 style="text-align:right;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';
                html += '<td style="text-align:center;">';
                if (item["PaymentStatus"] == '50033') {
                    if (isPay.length > 0) {
                        //  html += '<a style="padding-right:44px !important;"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                    }

                }
                else if (item["PaymentStatus"] != '50044') {
                    if (isPay.length > 0) {
                        html += '<a href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                    }
                    if (isFlag.length > 0) {
                        if (item["PaymentStatus"] != '50025') {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-flag" style="color:#29b392 !important"  data-flag=' + item["BillID"] + '></i></a>';

                        }
                    }
                    if (isDispute.length > 0) {
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + item["BillID"] + '></i></a>';
                    }


                }

                html += '</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<tr><td colspan="9" style="text-align:center;">No data found</td><tr>';
        }
        $el.html(html);
    }
}

//Data Manipulation
{
    var GetPaymentSummaryScreenData = function () {
        var obj = {

            'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'currentDay': moment().format("MM/DD/YYYY"),
            'Status': parseInt(KpiStatus),
            'DueFrom': dueFrom,
            'DueTo': dueTo,
            'OverDueDate': overDue

        }
        var _obj = {
            'paymentSummaryObj': obj
        }
        var tempList = {};
        $.when(RequestServer("Bill_PaymentSummary.aspx/GetUserPaymentSummaryScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }


}

//Common
{
    var GetStatusColor = function (status) {
       
        var colorClass = ''
        switch (status) {
            case "50023":
                colorClass = "isc-pay-pnd";
                break;
            case "50033":
                colorClass = "isc-dsp-clr";
                break;
            case "50025":
                colorClass = 'isc-flg-clr';
                break;
            case "50024":
                colorClass = 'isc-pay-failed'
                break;
            case "50044":
                colorClass = "isc-pay-comp"
                break;
            case "50026":
                colorClass = "isc-pay-comp"
                break;
            case "50088":
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
    var BindPayerBillList = function () {
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
                "url": "Bill_PaymentSummary.aspx/GetBillList",
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
                    TabCountData = common.AUF(objData['SearchedTabCounts']);

                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[5, "asc"]],
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
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["VendorName"] == null ? '-' : data["VendorName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        
                        if (data["PaymentStatus"] != '50044' && data["PaymentStatus"] != '50088' && data["PaymentStatus"] != '50033') {
                            var html = '<h5><a href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '&&IsView=0">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                            return html;
                        }
                        else {
                            var html = '<h5><a href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '&&IsView=1">' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '<a></h5>';
                            return html;
                        }
                        //var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
                        //if (isPay.length > 0) {
                           
                        //}
                        //else {
                            
                        //}




                    }
                },
                {
                    "width": '19%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["Description"] == null || data["Description"] == '' ? '-' : data["Description"]) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '15%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<div class="isc-td-inline-status-ch-s1">';
                        var colorCode = GetStatusColor(data["PaymentStatus"].toString());
                        html += ' <i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode +' "></i><a class="isc-lbl-act-read-list-s1 ' + colorCode + '">' + (data["PaymentStatusName"] == null ? '-' : data["PaymentStatusName"]) + '</a>';
                        html += '</div>';
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
                    "width": '7%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var dueDate = moment.utc(data["DueOn"]).toDate();
                        var localDueDate = moment(dueDate).local().format('MM/DD/YYYY');
                        var today = moment.utc().format('MM/DD/YYYY');
                        var dueDay = moment.utc(data["DueOn"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["DueOn"] == null ? '-' : moment(data["DueOn"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5 style="color:red !important;" >' + (data["DueOn"] == null ? '-' : moment(data["DueOn"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        return html;
                    }
                },
                {
                    "width": '7%',
                    "mData": function (data, type, dataToSet) {
                        var paidOn = moment.utc(data["PaidOn"]).toDate();
                        var localpaidOn = moment(paidOn).local().format('MM/DD/YYYY');
                        var html = '<h5>' + (data["PaidOn"] == null || localpaidOn == 'Invalid date' ? '-' : localpaidOn) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["PaymentMode"] == null || data["PaymentMode"] == '' ? '-' : data["PaymentMode"]) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amount = (data["ApprovedAmount"] == null ? 0.00 : parseFloat(data["ApprovedAmount"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {

                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
                        var isFlag = GetmatchedRecord(RolePermissions, 'EntityActionID', '3007');
                        var isDispute = GetmatchedRecord(RolePermissions, 'EntityActionID', '3008');
                        var html = '';
                        if (data["PaymentStatus"] == '50023') {
                            html += '<div class="screen-row isc-inline-pop-action-s1 cell-right pad-lft-min mar-rgt-20 isc-mar-rgt-neg-mb-res" >';
                            html += '<a class="isc-action-badge-td-s1" title="More Actions" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
                            html += '<i class="fa fa-ellipsis-h "></i></a>';
                            html += '<ul class="dropdown-menu-entity">';
                            if (data["PaymentStatus"] != '50044') {
                                if (isDispute.length > 0) {
                                    html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '">Dispute</a></li>';
                                }

                            }
                            //   if (isDelete.length > 0 && data["Status"] == "50019") {
                            html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="Comments" bill-Comments="' + data["BillID"] + '" bill-ApproveId="' + data["IdentityID"] + '">Comments</a></li>';
                            var amount = (data["ApprovedAmount"] == null ? 0.00 : parseFloat(data["ApprovedAmount"]));
                            if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0 && clientConfigurations[0]["IsOfflinePaymentsAllowed"] == '1') {
                                if (isPay.length > 0) {
                                    html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" data-Amount="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '" data-DueDate="' + (data["DueOn"] == null ? '-' : moment(data["DueOn"]).format('MM/DD/YYYY')) + '" data-Invoice="' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? "-" : data["InvoiceNumber"]) + '"  data-Vendor="' + (data["VendorName"] == null ? '-' : data["VendorName"]) + '"  title="Mark As Paid" data-Mark-Paid="true"  bill-ApproveId="' + data["IdentityID"] + '" bill-Id="' + data["BillID"] + '">Mark As Paid</a></li>';
                                }
                            }
                            //if (data["IsSplitted"] != "50013") {
                            //    html += '<li><a style="padding-left: 7px; cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split""  data-bill-Split="' + data["BillID"] + '">Split</a></i>';
                            //}
                            // }
                            html += '</ul>';
                            html += '</div>';
                        }

                        html += '<div style="text-align: center;">';


                        if (data["PaymentStatus"] == '50033') {
                            if (isPay.length > 0) {
                                //  html += '<a style="padding-right:44px !important;"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                            }

                        }
                        else if (data["PaymentStatus"] != '50044' && data["PaymentStatus"] != '50088') {

                            if (isPay.length > 0) {

                                html += '<a  class="isc-mar-lft-7 isc-mar-lft-20" href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                            }
                            if (isFlag.length > 0) {
                                if (data["PaymentStatus"] != '50025') {
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag"  href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '"><i class="fa fa-flag" style="color:#29b392 !important"  data-flag=' + data["BillID"] + '></i></a>';

                                }
                            }
                            //if (isDispute.length > 0) {
                            //    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + data["BillID"] + '></i></a>';
                            //}
                        }
                        if (data["PaymentStatus"] == '50025' && isDispute.length > 0) {

                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + data["BillID"] + '></i></a>';
                        }
                        if (data["PaymentStatus"] != '50023') {
                            html += '<a style="" class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + data["BillID"] + '" bill-ApproveId="' + data["IdentityID"] + '"><i class="fa fa-comment-o"></i></a>';
                        }
                        if (data["IsSplitted"] == "50013") {
                            html += '<a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split""  data-bill-Split="' + data["BillID"] + '"><img src="images/Split2.png" class="isc-tbl-icon-img"/></a>';
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

                    if (text != 'DisputeCommentsMark As Paid ') {

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
        var paymentStatus = 0;
        if ($('#slt-Status').val() == '50026') {
            DStatus = 50044;
        }
        else {
            DStatus = parseInt($('#slt-Status').val());
        }
        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.Status = status;
        obj.IsRecurring = isRecurring;
        obj.VendorID = DVendor;
        obj.InvoiceNumber = DInvoice;
        obj.DueDateFrom = FilterStartDate;
        obj.DueDateTo = FilterEndDate;
        obj.Dstatus = DStatus
        obj.KpiStatus = parseInt(KpiStatus);
        obj.DueFrom = dueFrom
        obj.DueTo = dueTo
        obj.OverDueDate = overDue
        obj.CreatedDate = createdDate
        obj.PaidDate = paidDate;

        var _obj = {};
        _obj = { "billFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "VendorName " + direction;
                break;
            case 1:
                orderBy = "InvoiceNumber " + direction;
                break;
            case 2:
                orderBy = "Description " + direction;
                break;
            case 3:
                orderBy = "PaymentStatusName " + direction;
                break;
            //case 4:
            //    orderBy = "StageName " + direction;
            //    break;
            case 4:
                orderBy = "DueOn " + direction;
                break;
            case 5:
                orderBy = "PaidOn " + direction;
                break;
            case 6:
                orderBy = "PaymentMode " + direction;
                break;
            case 7:
                orderBy = "ApprovedAmount " + direction;
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
                //'Any Date': [moment().startOf('month'), moment().endOf('month')],
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
        var billApprovedID = $(this).attr('bill-ApproveId');
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

    //var GetBillcomments = function (billId, approvedID) {
    //    var _obj = {
    //        'BillId': billId,
    //        'ApprovedId': approvedID
    //    };
    //    var tempList = {};
    //    $.when(RequestServer("Bill_FinancerHome.aspx/GetBillCommentsData", _obj)).done(function (response) {
    //        tempList = $.parseJSON(response);
    //    });
    //    return tempList;
    //}
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
                   
                    html += '<label class="isc-dis-block isc-pad-left-10 isc-new-cmt mar-top-15">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</label>'
                    html += '<label class="smt-li-dataplan-inner-sub-title isc-f-13">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + '</label>'
                    html += '<span title="' + item["CreatedOn"] + '">On ' + (item["CreatedOn"] == null ? ' - ' : item["CreatedOn"]) + '</span>'
                    html += '<div class="screen-row">'
                    html += '<div class="cell-right">'
                    if (index === (length - 1)) {
                        if (item["UserID"] == item["CreatedBy"]) {
                            html += '<i title="Edit" style="cursor: pointer;" class=" fa fa-edit isc-set-pos" data-cmd-billid=' + item["BillID"] + ' data-cmd-billcmd=' + item["Comment"] + ' data-cmd-status=' + item["Status"] + ' data-cmd-rowid=' + item["RowID"] + '></i>'
                        }
                        lastcommand = item["Comment"];
                    }
                    html += '</div></div></div></div></div></div></div></div>'
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

        $(document).on('click', '[data-Open-File]', function () {
            var fileName = $(this).attr('data-Open-File');

            if (fileName != '') {
                window.open(paidBillDocs + fileName, '');
            }
        });

        $(document).on('click', '[data-Delete]', function () {
            $(this).parents('tr').remove();
        });

        $(document).on('click', '[data-Mark-Paid]', function () {
            ClearMarkASPaidFields();
            var $this = $(this);
            $('#mark-As-Paid').attr('data-MBillID', $this.attr('bill-Id'));
            $('#mark-As-Paid').attr('data-MApprovedBillID', $this.attr('bill-ApproveId'));
            $('#lbl-Vendor').html($this.attr('data-Vendor'));
            $('#lbl-Invoice-Number').html($this.attr('data-Invoice'));
            $('#lbl-Due').html($this.attr('data-DueDate'));
            $('#lbl-Amount').html($this.attr('data-Amount'));
            TotalAmount = ($this.attr('data-Amount'));
            $('#txt-PaidAmnt').val(TotalAmount.replace("$", ""));
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
        var MarkBillAsPaid = function () {
            var paidAmount = $('#txt-PaidAmnt').val();
            paidAmount = paidAmount.replace(/,/g, '');
            paidAmount = parseFloat(paidAmount);

            var dueAmount = $('#txt-DueAmnt').val();
            dueAmount = dueAmount.replace(/,/g, '');
            dueAmount = parseFloat(dueAmount == '' ? 0.00 : dueAmount);

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
                'AttachmentList': objAttachmentList
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
                    BindPayamentScreen();
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
            html += '<i class="fa fa-file-o isc-pdf-red"  data-Open-File="' + (fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"]) + '"></i>';
            html += '</td>';
            html += '<td style="width: 45%;">';
            html += '<h4 data-file-PhyName="' + fileResponse['ModifiedFileName'] + '" data-phy-Location="' + fileResponse['PhysicalLocation'] + '" title="' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '">' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + ' </h4>';
            html += '</td>';
            html += '<td style="width: 10%; text-align: center;">';
            html += '<i  title="Remove" style="cursor:pointer;" data-Delete="true" data-file-Size="' + fileContainer[0]["size"] + '" data-extension="' + fileContainer[0]["type"] + '" class="fa fa-times-circle pad-lft-min isc-act-clr"></i>';
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
            var typeOfPayment = $('#slt-PaymentMode').val();
            var docList = $('#tbl-PaidBill-Attachments tr');
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
    $("#txt-PaidAmnt").keyup(function () {

        //var BillInfo = $.parseJSON(billDetails[0]["Table"]);
        var Totamamount = TotalAmount.replace("$", "");
        var Paidamount = $("#txt-PaidAmnt").val().replace(",", "");
        var total = (parseFloat(Totamamount.replace(",", "")) - (parseFloat(Paidamount)));
        if (total > 0) {
            $("#txt-DueAmnt").val((Math.round(total * 100) / 100).toFixed(2));
        }
        else {
            if (parseFloat(Paidamount) > parseFloat(Totamamount.replace(",", ""))) {
                $("#txt-PaidAmnt").val("")
            }
            if (parseFloat(Paidamount) == parseFloat(Totamamount.replace(",", ""))) {
                $("#txt-DueAmnt").val(total);
            }
            else {
                $("#txt-DueAmnt").val(Totamamount.replace(",", ""));
            }
        }
    });

}