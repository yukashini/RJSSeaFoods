//Global Variables
{
    var financerHomeScreenData = [];
    var paymentScreenKPI = [];
    var paymentScreenBills = [];
    var KpiStatus = 0;
    var selectedStartdate = '';
    var selectedEnddate = '';
    var isOverDue = 0;
    var isDueToday = 0;
    var isOnload = 0;
    var isMonthFilterSelected = 0;
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
            isOnload = 1;
            BindFinancerHomeScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-Filter]', function () {
        KpiStatus = 0;
        var selectedFilter = $(this).attr('data-Filter');
        $('#selected-Filter').html(selectedFilter)
        var filterObject = GetFilterObject(selectedFilter);
        financerHomeScreenData = GetFinancerHomeScreenData(filterObject);
        if (financerHomeScreenData != null && financerHomeScreenData.length > 0) {
            paymentScreenKPI = $.parseJSON(financerHomeScreenData[0]["Table"]);
            BindKPI();
            paymentScreenBills = $.parseJSON(financerHomeScreenData[1]["Table1"]);
            BindUnPaidBills(paymentScreenBills);
            BindGraph();
        }
    });

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
                $('#data-list th[sort-column-Type]').removeClass('headerSortDown');
                $('#data-list th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#data-list th[sort-column-Type]').removeClass('headerSortDown');
                $('#data-list th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#data-list th[sort-column-Type]').removeClass('headerSortDown');
                $('#data-list th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = paymentScreenBills

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
                BindUnPaidBills(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[data-Kpi]', function () {
        KpiStatus = parseInt($(this).attr('data-Kpi'));
        $loading.show()
        setTimeout(function () {
            if (KpiStatus != 1 && KpiStatus != 0) {
                var obj = {
                    'StartDate': selectedStartdate,
                    'EndDate':selectedEnddate,
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': isOverDue,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload':0
                }
                financerHomeScreenData = GetFinancerHomeScreenData(obj)

                if (financerHomeScreenData != null && financerHomeScreenData.length > 0) {
                  
                    paymentScreenBills = $.parseJSON(financerHomeScreenData[1]["Table1"]);
                    BindUnPaidBills(paymentScreenBills);
                    BindGraph();
                }
            }
            else if (KpiStatus == 1) {
                if (isDueToday == 0)
                {
                    obj = {
                        'StartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'EndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'IsOverDue': isOverDue,
                        'currentDay': moment().format("MM/DD/YYYY"),
                        'Status': 0,
                        'IsOnload': 0
                    }
                }
                
                else {
                    obj = {
                        'StartDate': selectedStartdate,
                        'EndDate': selectedEnddate,
                        'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                        'IsOverDue': isOverDue,
                        'currentDay': moment().format("MM/DD/YYYY"),
                        'Status': 0
                    }
                }
                financerHomeScreenData = GetFinancerHomeScreenData(obj)

                if (financerHomeScreenData != null && financerHomeScreenData.length > 0) {
                    paymentScreenBills = $.parseJSON(financerHomeScreenData[1]["Table1"]);
                    BindUnPaidBills(paymentScreenBills);
                    BindGraph();
                }
            }
            else if (KpiStatus == 0) {

                obj = {
                    'StartDate': selectedStartdate,
                    'EndDate': selectedEnddate,
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 1,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
                financerHomeScreenData = GetFinancerHomeScreenData(obj)

                if (financerHomeScreenData != null && financerHomeScreenData.length > 0) {
                    paymentScreenBills = $.parseJSON(financerHomeScreenData[1]["Table1"]);
                    BindUnPaidBills(paymentScreenBills);
                    BindGraph();
                }
            }
         
            $loading.hide();
        }, 0);
    });
}

//Dom Manipulation
{
    var BindFinancerHomeScreen = function () {
        var obj = {
            'StartDate': moment().startOf('month').format('MM/DD/YYYY'),
            'EndDate': moment().endOf('month').format('MM/DD/YYYY'),
            'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'IsOverDue': 0,
            'currentDay': moment().format("MM/DD/YYYY"),
            'Status': parseInt(KpiStatus),
            'IsOnload':isOnload
        }
        isOverDue = 0;
        selectedStartdate = moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
        selectedEnddate = moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');   
        financerHomeScreenData = GetFinancerHomeScreenData(obj)

        if (financerHomeScreenData != null && financerHomeScreenData.length > 0) {
            paymentScreenKPI = $.parseJSON(financerHomeScreenData[0]["Table"]);
            BindKPI();
            paymentScreenBills = $.parseJSON(financerHomeScreenData[1]["Table1"]);
            BindUnPaidBills(paymentScreenBills);
            BindGraph();
        }
    }

    var BindKPI = function () {
        //OutStandingPayments
        $('#out-Standing-Count').html((paymentScreenKPI[0]["OutStandingCount"] == null ? 0 : paymentScreenKPI[0]["OutStandingCount"]));
        $('#out-Standing-Amount').html("$" + (paymentScreenKPI[0]["TotalOutStandingAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["TotalOutStandingAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(paymentScreenKPI[0]["TotalOutStandingAmount"]))));

        if (paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"] == "0" || (parseInt(paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"]) < parseInt(paymentScreenKPI[0]["LastWeekOutStandingBillsCount"]))) {
            $('#outStanding-This-Week').html('' + (paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#outStanding-This-Week').html('' + (paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentWeekOutStandingBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }
        //OverDue
        $('#overDue-Count').html((paymentScreenKPI[0]["OverDueCount"] == null ? 0 : paymentScreenKPI[0]["OverDueCount"]));
        $('#overDue-Amount').html("$" + (paymentScreenKPI[0]["OverDueAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["OverDueAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(paymentScreenKPI[0]["OverDueAmount"]))));
        if (paymentScreenKPI[0]["CWeekOverDueCount"] == "0" || (parseInt(paymentScreenKPI[0]["CWeekOverDueCount"]) < parseInt(paymentScreenKPI[0]["LWeekOverDueCount"]))) {
            $('#overDue-This-week').html('' + (paymentScreenKPI[0]["CWeekOverDueCount"] == null ? 0 : paymentScreenKPI[0]["CWeekOverDueCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#overDue-This-week').html('' + (paymentScreenKPI[0]["CWeekOverDueCount"] == null ? 0 : paymentScreenKPI[0]["CWeekOverDueCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }



        //Disputed 
        $('#disputed-Count').html((paymentScreenKPI[0]["disputedCount"] == null ? 0 : paymentScreenKPI[0]["disputedCount"]));
        $('#disputed-Amount').html("$" + (paymentScreenKPI[0]["DisputedAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["DisputedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(paymentScreenKPI[0]["DisputedAmount"]))));
        if (paymentScreenKPI[0]["CurrentDisputedBillsClount"] == "0" || (parseInt(paymentScreenKPI[0]["CurrentDisputedBillsClount"]) < parseInt(paymentScreenKPI[0]["LastWeekDisputedBillsCount"]))) {
            $('#disputed-This-Week').html('' + (paymentScreenKPI[0]["CurrentDisputedBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentDisputedBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {

            $('#disputed-This-Week').html('' + (paymentScreenKPI[0]["CurrentDisputedBillsClount"] == null ? 0 : paymentScreenKPI[0]["CurrentDisputedBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }


        //Due This week
        $('#due-Thisweek-Count').html((paymentScreenKPI[0]["DuethisWeekCount"] == null ? 0 : paymentScreenKPI[0]["DuethisWeekCount"]));
        $('#due-This-Week-Amount').html("$" + (paymentScreenKPI[0]["DuethisWeekAmount"] == null || Math.sign(parseFloat(paymentScreenKPI[0]["DuethisWeekAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(paymentScreenKPI[0]["DuethisWeekAmount"]))));
        if (paymentScreenKPI[0]["CWeekDueThisWeekCount"] == "0" || (parseInt(paymentScreenKPI[0]["CWeekDueThisWeekCount"]) < parseInt(paymentScreenKPI[0]["LWeekDueThisWeekCount"]))) {
            $('#new-Due-This-Week').html('' + (paymentScreenKPI[0]["DuethisWeekCount"] == null ? 0 : paymentScreenKPI[0]["DuethisWeekCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#new-Due-This-Week').html('' + (paymentScreenKPI[0]["DuethisWeekCount"] == null ? 0 : paymentScreenKPI[0]["DuethisWeekCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }



    }

    var BindUnPaidBills = function (list) {
        var html='';
        var $el = $('#tbl-Bill-Body');
        if (list != null && list.length > 0)
        {
            var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
            var isFlag = GetmatchedRecord(RolePermissions, 'EntityActionID', '3007');
            var isDispute = GetmatchedRecord(RolePermissions, 'EntityActionID', '3008');

            $.each(list, function (index, item) {
                var dueDate = moment.utc(item["DueOn"]).toDate();
                var localDueDate = moment(dueDate).local().format('MM/DD/YYYY');
                var today = moment.utc().format('MM/DD/YYYY');
                var dueDay = moment.utc(item["DueOn"]);
                if (item["ApprovedAmount"] != "" && item["ApprovedAmount"] != null) {
                    dollerAmount = $(item["ApprovedAmount"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["ApprovedAmount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html+='  <tr class="" role="row">';
                html+='<td>';
                html += '<h2 title="' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '"><a href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '&&IsView=0">' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</a></h2>';
                if (moment(today) <= dueDay)
                {
                    html += '<h6 class="" title="' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '">' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '</h6>';

                }
                else {
                    html += '<h6  style="color:red" class="" title="' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '">' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '</h6>';
                  
                }
               
                html+='</td>';
                html += '<td><h2 title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h2></td>';
                html += '<td style="text-align:center;">';

                html += '<div class="screen-row isc-inline-pop-action-s1 cell-right pad-lft-min" style="margin-right:8px !important;" >';
                if (isPay.length > 0) {
                    html += '<a  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '" ><img src="images/paynow.png" class="isc-make-pay" title="Pay Now" style="cursor:pointer;margin-left:5px;"></a>';
                }
                if (isFlag.length > 0) {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"><i class="fa fa-flag" style="color:#29b392 !important"></i></a>';
                }
                html += '<a class="isc-action-badge-td-s1  pad-lft-5" title="More Actions" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
                html += '<i class="fa fa-ellipsis-h "></i></a>';
                html += '<ul class="dropdown-menu-entity">';
                if (isDispute.length > 0) {
                    html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '">Dispute</a></li>';
                }
                html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5"  bill-Comments="' + item["BillID"] + '" bill-ApproveId="' + item["IdentityID"] + '">Comments</a></li>';
                html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '">Mark As Paid</a></li>';
             
                html += '</ul>';
                html += '</div>';
               

                //if (isDispute.length > 0) {
                //    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important"></i></a>';
                //}
                html+='</td>';      
                html += '</tr>';

            });
        }
        else {
            html = '<tr><td colspan="3" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);

    }

    var BindGraph = function () {
        var outStandingObj = {};
        var overDueObj = {};
        var outStandingPayments = [];
        var overDuePayments = [];
        var graphData = [];
        var graphDbData = [];
        var outStandingList = $.parseJSON(financerHomeScreenData[2]["Table2"])
        var overDueList = $.parseJSON(financerHomeScreenData[3]["Table3"])
        graphDbData = outStandingList.concat(overDueList);
        if (isOnload == 0) {
            if (graphDbData != null && graphDbData.length > 0) {
                graphDbData = ObjSorter(graphDbData, "Year", '123');
                if (graphDbData.length > 0) {
                    $.each(graphDbData, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {};
                        if (item["IsOverDue"] == '0') {
                            obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        }
                        else {
                            obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        outStandingPayments.push(obj);
                    });

                }
                if (graphDbData.length > 0) {
                    $.each(graphDbData, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {}
                        if (item["IsOverDue"] == "1") {
                            var obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        }
                        else {
                            var obj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        overDuePayments.push(obj);
                    });
                }

                outStandingObj = {
                    "color": "#26A7DD", "key": "Outstanding Payments ", "values": outStandingPayments
                }
                graphData.push(outStandingObj);
                overDueObj = {
                    "color": "#ED5263", "key": "Overdue Payments ", "values": overDuePayments
                }
                graphData.push(overDueObj);

            }
            else {
                var outStandingObj = {
                    "color": "#26A7DD", "key": "Outstanding Payments ", "values": [{ "x": " ", "y": 0 }]
                }
                graphData.push(outStandingObj);
                var overDueObj = {
                    "color": "#ED5263", "key": "Overdue Payments ", "values": [{ "x": " ", "y": 0 }]
                }
                graphData.push(overDueObj);
            }
        }
        else {
            if (graphDbData != null && graphDbData.length > 0) {
                graphDbData = GetmatchedRecord(graphDbData, 'Year', moment().format('YYYY'));
                graphDbData = ObjSorter(graphDbData, "Year", '123');
                var outStandingData = GetmatchedRecord(graphDbData, 'IsOverDue', '0');
                var overDueData = GetmatchedRecord(graphDbData, 'IsOverDue', '1');
                if (graphDbData.length > 0) {
                    if (outStandingData.length > 0) {
                        outStandingData = ObjSorter(outStandingData, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                                var matchedMonthData = GetmatchedRecord(outStandingData, "Month", mIndex.toString());
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
                                outStandingPayments.push(obj);
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
                            outStandingPayments.push(obj);
                        });
                    }

                }
                if (graphDbData.length > 0) {
                    if (overDueData.length > 0) {
                        overDueData = ObjSorter(overDueData, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                                var matchedMonthData = GetmatchedRecord(overDueData, "Month", mIndex.toString());
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
                                overDuePayments.push(obj);
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
                            overDuePayments.push(obj);
                        });
                    }
                }

                outStandingObj = {
                    "color": "#26A7DD", "key": "Outstanding Payments ", "values": outStandingPayments
                }
                graphData.push(outStandingObj);
                overDueObj = {
                    "color": "#ED5263", "key": "Overdue Payments ", "values": overDuePayments
                }
                graphData.push(overDueObj);

            }
            else {
                var emptyData = [];

                $.each(moment.monthsShort(), function (mIndex, mItem) {
                    var obj = {};
                    obj = {
                        "x": " " + mItem + " " + moment().format('YYYY'),
                        "y": "0"
                    }
                    emptyData.push(obj);
                });
                var outStandingObj = {
                    "color": "#26A7DD", "key": "Outstanding Payments ", "values": emptyData
                }
                graphData.push(outStandingObj);
                var overDueObj = {
                    "color": "#ED5263", "key": "Overdue Payments ", "values": emptyData
                }
                graphData.push(overDueObj);
            }

        }
        
        isOnload = 0;
        if (isMonthFilterSelected == 0) {
            Get_StackedBarChartModal3Financer("StackedBarChartModal5", graphData);
        }
        else {
            var weeklyGraphData = GetWeeklyGraphData(graphDbData);
            Get_StackedBarChartModal3Financer("StackedBarChartModal5", weeklyGraphData);
        }
      
    }

    var GetWeeklyGraphData = function (graphDbData) {
        var outStandingObj = {};
        var overDueObj = {};
        var outStandingPayments = [];
        var overDuePayments = [];
        var graphData = [];
       // var graphDbData = [];
        if (graphDbData != null && graphDbData.length > 0) {
            graphDbData = ObjSorter(graphDbData, "Week", '123');
            if (graphDbData.length > 0) {
                $.each(graphDbData, function (index, item) {
                 
                    var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                    var obj = {};
                    if (item["IsOverDue"] == '0') {
                        obj = {
                            "x": " W" + item["Week"],
                            "y": parseInt(item["Amount"])
                        }
                    }
                    else {
                        obj = {
                            "x": " W" + item["Week"],
                            "y": 0
                        }
                    }

                    outStandingPayments.push(obj);
                });

            }
            if (graphDbData.length > 0) {
                $.each(graphDbData, function (index, item) {
                    var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                    var obj = {}
                    if (item["IsOverDue"] == "1") {
                        var obj = {
                            "x": " W" + item["Week"],
                            "y": parseInt(item["Amount"])
                        }
                    }
                    else {
                        var obj = {
                            "x": " W" + item["Week"],
                            "y": 0
                        }
                    }

                    overDuePayments.push(obj);
                });
            }

            outStandingObj = {
                "color": "#26A7DD", "key": "Outstanding Payments ", "values": outStandingPayments
            }
            graphData.push(outStandingObj);
            overDueObj = {
                "color": "#ED5263", "key": "Overdue Payments ", "values": overDuePayments
            }
            graphData.push(overDueObj);

        }
        else {
            var outStandingObj = {
                "color": "#26A7DD", "key": "Outstanding Payments ", "values": [{ "x": " ", "y": 0 }]
            }
            graphData.push(outStandingObj);
            var overDueObj = {
                "color": "#ED5263", "key": "Overdue Payments ", "values": [{ "x": " ", "y": 0 }]
            }
            graphData.push(overDueObj);
        }
        return graphData
    }
}

//Data Manipulation
{
    var GetFinancerHomeScreenData = function (obj) {
        var _obj = {
            'financerHomeObj': obj
        };
        var tempList = {};
        $.when(RequestServer("Bill_FinancerHome.aspx/GetUserFinanceManagerScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{
    var GetFilterObject = function (selectedFilter) {
        var obj = {};
        switch (selectedFilter) {
            case "Overdue":
                obj = {
                    'StartDate': '',
                    'EndDate': "",
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 1,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload':0

                }
                selectedStartdate = '';
                selectedEnddate = '';
                isOverDue = 1;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
            case "Due Today":
                obj = {
                    'StartDate': moment().format('MM/DD/YYYY'),
                    'EndDate': moment().format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0
                }
                selectedStartdate = moment().format('MM/DD/YYYY');
                selectedEnddate = moment().format('MM/DD/YYYY');
                isDueToday = 1;
                isOverDue = 0;
                isMonthFilterSelected = 1;
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
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0
                }
                selectedStartdate = moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                selectedEnddate = moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 1;
                break;
            case "Due Last Week":
                obj = {
                    'StartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0
                }
                selectedStartdate = moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                selectedEnddate = moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 1;
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
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0
                }
                selectedStartdate = moment().add(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                selectedEnddate = moment().add(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 1;
                break;
            case "Due This Month":
                obj = {
                    'StartDate': moment().startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().startOf('month').format('MM/DD/YYYY');
                selectedEnddate = moment().endOf('month').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 1;
                break;
            case "Due Last Month":
                obj = {
                    'StartDate': moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'months').endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY');
                selectedEnddate = moment().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 1;
                break;
            case "Due Next Month":
                obj = {
                    'StartDate': moment().add(1, 'months').startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().add(1, 'months').endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().add(1, 'months').startOf('month').format('MM/DD/YYYY');
                selectedEnddate = moment().add(1, 'months').endOf('month').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 1;
                break;
            case "Due This Quarter":
                obj = {
                    'StartDate': moment().startOf('quarter').format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('quarter').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().startOf('quarter').format('MM/DD/YYYY');
                selectedEnddate = moment().endOf('quarter').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
            case "Due Last Quarter":
                obj = {
                    'StartDate': moment().subtract(1, 'quarter').startOf('quarter').format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'quarter').endOf('quarter').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().subtract(1, 'quarter').startOf('quarter').format('MM/DD/YYYY');
                selectedEnddate = moment().subtract(1, 'quarter').endOf('quarter').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
            case "Due Next Quarter":
                obj = {
                    'StartDate': moment().add(1, 'quarter').startOf('quarter').format('MM/DD/YYYY'),
                    'EndDate': moment().add(1, 'quarter').endOf('quarter').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().add(1, 'quarter').startOf('quarter').format('MM/DD/YYYY');
                selectedEnddate = moment().add(1, 'quarter').endOf('quarter').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
            case "Due This Year":
                obj = {
                    'StartDate': moment().startOf('year').format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('year').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().startOf('year').format('MM/DD/YYYY');
                selectedEnddate = moment().endOf('year').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
            case "Due Last Year":
                obj = {
                    'StartDate': moment().subtract(1, 'years').startOf('year').format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'years').endOf('year').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().subtract(1, 'years').startOf('year').format('MM/DD/YYYY');
                selectedEnddate = moment().subtract(1, 'years').endOf('year').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
            case "Due Next Year":
                obj = {
                    'StartDate': moment().add(1, 'years').startOf('year').format('MM/DD/YYYY'),
                    'EndDate': moment().add(1, 'years').endOf('year').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'Status': parseInt(KpiStatus),
                    'IsOnload': 0

                }
                selectedStartdate = moment().add(1, 'years').startOf('year').format('MM/DD/YYYY');
                selectedEnddate = moment().add(1, 'years').endOf('year').format('MM/DD/YYYY');
                isOverDue = 0;
                isDueToday = 0;
                isMonthFilterSelected = 0;
                break;
        }
        return obj;
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
           
           // var BillComments = GetBillcomments(billId, parseInt(billApprovedID));
            BillComments = common.AUF(BillComments['Comments']);
            BindBillComments(BillComments);
            var $modal = $('#mp_comts');
            $modal.modal('show');
            //var $modal = $('#Mp_Comments');
            //$modal.modal('show');
        }
    });

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
    //var GetBillcomments = function (billId,approvedID) {
    //    var _obj = {
    //        'BillId': billId,
    //        'ApprovedId':approvedID
    //    };
    //    var tempList = {};
    //    $.when(RequestServer("Bill_FinancerHome.aspx/GetBillCommentsData", _obj)).done(function (response) {
    //        tempList = $.parseJSON(response);
    //    });
    //    return tempList;
    //}
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
    //        html += '<p>No Data Found</p>';
    //    }
    //    $el.html(html);
    //}


}