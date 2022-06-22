//Global Variables
{
    var approvalHomeScreenData = [];
    var approvalKpi = [];
    var unApprovedBillList = [];
    var KpiStatus = 0;
    var isOnload = 0;
    var isMonthFilterSelected = 0;
    var approveBillId = 0;
    var billDetails = [];
    var Command = "";
    var billId = 0;
    var Billstatus = '0';
    var BillrowID = 0;
    var lastcommand = "";
    var Filterkl = "";
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            isOnload = 1;
            BindApprovalHome();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-Filter]', function () {
      
        var selectedFilter = $(this).attr('data-Filter');
        Filterkl = selectedFilter;
        $('#selected-Filter').html(selectedFilter)
        var filterObject = GetFilterObject(selectedFilter);
        approvalHomeScreenData = GetApprovalHomeData(filterObject);
        if (approvalHomeScreenData != null && approvalHomeScreenData.length > 0) {
            approvalKpi = $.parseJSON(approvalHomeScreenData[0]["Table"]);
            unApprovedBillList = $.parseJSON(approvalHomeScreenData[1]["Table1"]);
            unApprovedBillList = GetmatchedRecord(unApprovedBillList, 'Status', '50016');
            var graphData = $.parseJSON(approvalHomeScreenData[2]["Table2"]);

            BindKPI();
            GraphBinding(graphData)
            BindAwaitingApprovaldBills(unApprovedBillList);
        }
    });

    $(document).on('click', '[data-Kpi]', function () {
        KpiStatus = parseInt($(this).attr('data-Kpi'));
        $loading.show()
        setTimeout(function () {
            BindApprovalHome();
            $loading.hide();
        }, 0);
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
            var lstResult = unApprovedBillList

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
                BindAwaitingApprovaldBills(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });
}

//Dom manipulation
{
    var BindApprovalHome = function () {
        var obj = {
            'StartDate': moment().clone().startOf('month').format('MM/DD/YYYY'),
            'EndDate': moment().clone().endOf('month').format('MM/DD/YYYY'),
            'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
            'IsOverDue': 0,
            'currentDay': moment().format("MM/DD/YYYY"),
            'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
            'Status': parseInt(KpiStatus),
            'IsOnload':isOnload
        }
        approvalHomeScreenData = GetApprovalHomeData(obj);
        if (approvalHomeScreenData != null && approvalHomeScreenData.length > 0) {
            approvalKpi = $.parseJSON(approvalHomeScreenData[0]["Table"]);
            unApprovedBillList = $.parseJSON(approvalHomeScreenData[1]["Table1"]);
            unApprovedBillList = GetmatchedRecord(unApprovedBillList, 'Status', '50016');
            var graphData = $.parseJSON(approvalHomeScreenData[2]["Table2"]);
           
            BindKPI();
            GraphBinding(graphData)
            BindAwaitingApprovaldBills(unApprovedBillList);
        }
    }

    var BindKPI = function () {
        //un approved KPI
        $('#unApproved-Count').html((approvalKpi[0]["UnApprovedBillsCount"] == null ? 0 : approvalKpi[0]["UnApprovedBillsCount"]));
        $('#unApproved-Amount').html("$" + (approvalKpi[0]["TotalUnApprovedAmount"] == null || Math.sign(parseFloat(approvalKpi[0]["TotalUnApprovedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(approvalKpi[0]["TotalUnApprovedAmount"]))));

        if (approvalKpi[0]["CurrentDayUnApprovedBillsClount"] == '0' || (parseInt(approvalKpi[0]["CurrentDayUnApprovedBillsClount"]) < parseInt(approvalKpi[0]["LastDayUnApprovedBillsCount"]))) {
            $('#unApproved-ThisWeek').html('' + (approvalKpi[0]["CurrentDayUnApprovedBillsClount"] == null ? 0 : approvalKpi[0]["CurrentDayUnApprovedBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#unApproved-ThisWeek').html('' + (approvalKpi[0]["CurrentDayUnApprovedBillsClount"] == null ? 0 : approvalKpi[0]["CurrentDayUnApprovedBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }
        
       

        //Challenged KPI
        $('#challenged-Count').html((approvalKpi[0]["DisputedBills"] == null ? 0 : approvalKpi[0]["DisputedBills"]));
        $('#challenged-Amount').html("$" + (approvalKpi[0]["DisputedAmount"] == null || Math.sign(parseFloat(approvalKpi[0]["DisputedAmount"])) == -1 ? 0 :moneyFormatter(parseFloat(approvalKpi[0]["DisputedAmount"]))));
        if (approvalKpi[0]["CWeekDisputedCount"] == '0' || (parseInt(approvalKpi[0]["CWeekDisputedCount"]) < parseInt(approvalKpi[0]["LWeekDisputedCount"]))) {
            $('#challenged-ThisWeek').html('' + (approvalKpi[0]["CWeekDisputedCount"] == null ? 0 : approvalKpi[0]["CWeekDisputedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
        }
        else {
            $('#challenged-ThisWeek').html('' + (approvalKpi[0]["CWeekDisputedCount"] == null ? 0 : approvalKpi[0]["CWeekDisputedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }
       
       
        //Rejected KPI
        $('#rejected-Count').html((approvalKpi[0]["RejectedBills"] == null ? 0 : approvalKpi[0]["RejectedBills"]));
        $('#rejected-Amount').html("$" + (approvalKpi[0]["RejectedAmount"] == null || Math.sign(parseFloat(approvalKpi[0]["RejectedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(approvalKpi[0]["RejectedAmount"]))));
        if (approvalKpi[0]["ThisWeekRejectedCount"] == '0' || (parseInt(approvalKpi[0]["ThisWeekRejectedCount"]) < parseInt(approvalKpi[0]["LastWeekRejectedCount"]))) {
            $('#rejected-ThisWeek').html('' + (approvalKpi[0]["ThisWeekRejectedCount"] == null ? 0 : approvalKpi[0]["ThisWeekRejectedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
       }
       else {
            $('#rejected-ThisWeek').html('' + (approvalKpi[0]["ThisWeekRejectedCount"] == null ? 0 : approvalKpi[0]["ThisWeekRejectedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
        }
       
        //Total Bills
        $('#total-Bill-Count').html((approvalKpi[0]["TotalBillsCount"] == null ? 0 : approvalKpi[0]["TotalBillsCount"]));
       // $('#total-Bill-Amount').html("$" + (approvalKpi[0]["TotalAmount"] == null || Math.sign(parseFloat(approvalKpi[0]["TotalAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(approvalKpi[0]["TotalAmount"]))));
        //$('#total-Bill-Amount').html("$" + (approvalKpi[0]["TotalAmount"] == null || Math.sign(parseFloat(approvalKpi[0]["TotalAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(approvalKpi[0]["TotalAmount"])) ));
       
        //totalamount="$" + (approvalKpi[0]["TotalAmount"] == null || Math.sign(parseFloat(approvalKpi[0]["TotalAmount"])) == -1 ? 0 : moneyFormatter(parseFloat(approvalKpi[0]["TotalAmount"])));
        $('#total-Bill-Amount').html("$"+(Math.abs(approvalKpi[0]["TotalAmount"]) > 999 ? Math.sign(approvalKpi[0]["TotalAmount"]) * ((Math.abs(approvalKpi[0]["TotalAmount"]) / 1000).toFixed(1)) + 'k' : Math.sign(approvalKpi[0]["TotalAmount"]) * Math.abs(approvalKpi[0]["TotalAmount"])))

        if (approvalKpi[0]["TodayTotalCount"] == '0' || (parseInt(approvalKpi[0]["TodayTotalCount"]) < parseInt(approvalKpi[0]["LastDayTotalCount"]))) {
            $('#total-ThisWeek').html('' + (approvalKpi[0]["TodayTotalCount"] == null ? 0 : approvalKpi[0]["TodayTotalCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>');
       }
       else {
            $('#total-ThisWeek').html('' + (approvalKpi[0]["TodayTotalCount"] == null ? 0 : approvalKpi[0]["TodayTotalCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>');
       }
    }

    var BindAwaitingApprovaldBills = function (list) {
       
        var html = '';
        var $el = $('#tbl-Bill-Body');
        if (list != null && list.length > 0) {
            var isApprove = GetmatchedRecord(RolePermissions, 'EntityActionID', '3004');
            var isReject = GetmatchedRecord(RolePermissions, 'EntityActionID', '3005');

            $.each(list, function (index, item) {
               
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                if (item["Amount"] != "" && item["Amount"] != null) {
                    dollerAmount = $(item["Balance"]).mask('#.##0,00', { reverse: true });
                    dollerAmount = dollerAmount.selector;
                }
                var amount = item["Amount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html += '  <tr class="" role="row">';
                html += '<td>';
                if ((item["Status"] == '50016' || item["Status"] == '50034') && item["CurrentStageApproval"] == "1") {
                    html += '<h2 title="' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '"><a href="Bill_ApprovalDetails.aspx?BillID=' + item["BillID"] + '&&IsView=0">' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</a></h2>';
                }
                else {
                    html += '<h2 title="' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '"><a href="Bill_ApprovalDetails.aspx?BillID=' + item["BillID"] + '&&IsView=1">' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</a></h2>';
                }
               
                if (moment(today) <= dueDay) {
                    html += '<h6 class="" title="' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '">' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '</h6>';

                }
                else {
                    html += '<h6  style="color:red" class="" title="' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '">' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '</h6>';

                }

                html += '</td>';
                html += '<td><h2 title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h2></td>';
                html += '<td style="text-align:center;">';
                if ((item["Status"] == '50016' || item["Status"] == '50034') && item["CurrentStageApproval"] == "1") {
                    // if (isPay.length > 0) {
                    if (isApprove.length > 0) {
                        //html += '<a class="isc-action-badge-td-s1 " title="Approve" href="Bill_ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-check-circle-o isc-app-icon-clr"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 " title="Approve" data-approve-bill="' + (item["BillID"] == null || item["BillID"] == '' ? '-' : item["BillID"]) + '"><i class="fa fa-check isc-app-icon-clr"></i></a>';
                    }

                    //}
                    //if (isFlag.length > 0) {
                    if (isReject.length > 0) {
                        // html += '<a class="isc-action-badge-td-s1 " title="Reject" href="Bill_ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-times-circle-o isc-rej-icon-clr"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 " title="Reject" data-reject-bill="' + (item["BillID"] == null || item["BillID"] == '' ? '-' : item["BillID"]) + '"><i class="fa fa-times isc-rej-icon-clr"></i></a>';

                    }

                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + item["BillID"] + '"><i class="fa fa-comment-o"></i></a>';

                    //}
                }
                else {

                }
                
              
                html += '</td>';
                html += '</tr>';

            });
        }
        else {
            html = '<tr><td colspan="3" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);

    }

    var GraphBinding = function (graphDetails) {

        var approvedObj = {};
        var rejectedObj = {};
        var unApprovedObj = {};
        var apporvedamountValues = [];
        var rejectedamountValues = [];
        var unApprovedamountValues = [];
        var graphData = [];
        if (isOnload == 0) {
            if (graphDetails.length > 0) {
                var approvedList = GetmatchedRecord(graphDetails, 'Status', "50036");
                var rejectedList = GetmatchedRecord(graphDetails, 'Status', "50017");
                var unApprovedList = GetmatchedRecord(graphDetails, 'Status', "50016");

                if (graphDetails.length > 0) {
                    graphDetails = ObjSorter(graphDetails, "Year", '123');
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var obj = {};
                        if (item["Status"] == "50036") {
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

                        apporvedamountValues.push(obj);
                    });

                }
                if (graphDetails.length > 0) {
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var rejobj = {};
                        if (item["Status"] == "50017") {
                            rejobj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        } else {
                            rejobj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        rejectedamountValues.push(rejobj);
                    });
                    //  rejectedamountValues.push(rejobj)
                }
                if (graphDetails.length > 0) {
                    $.each(graphDetails, function (index, item) {
                        var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                        var unAObj = {};
                        if (item["Status"] == "50016") {
                            unAObj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": parseInt(item["Amount"])
                            }
                        }
                        else {
                            unAObj = {
                                "x": " " + monthShortName + " " + item["Year"],
                                "y": 0
                            }
                        }

                        unApprovedamountValues.push(unAObj);
                    });
                }
                unApprovedObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": unApprovedamountValues
                }
                graphData.push(unApprovedObj);

                approvedObj = {
                    "color": "#ad1717", "key": "Disputed ", "values": apporvedamountValues
                }
                graphData.push(approvedObj);

                rejectedObj = {
                    "color": "#ED5263", "key": "Rejected ", "values": rejectedamountValues
                }
                graphData.push(rejectedObj);

            }
            else {
                var unApprovedObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": [{ "x": " ", "y": 0 }]
                }
                graphData.push(unApprovedObj);

                var approvedObj = {
                    "color": "#ad1717", "key": "Disputed ", "values": [{ "x": " ", "y": 0 }]
                }
                graphData.push(approvedObj);


                var rejectedObj = {
                    "color": "#ED5263", "key": "Rejected ", "values": [{ "x": " ", "y": 0 }]
                }
                graphData.push(rejectedObj);
            }
        }
        else {
            if (graphDetails.length > 0) {
                graphDetails = GetmatchedRecord(graphDetails, 'Year', moment().format('YYYY'));
                var approvedList = GetmatchedRecord(graphDetails, 'Status', "50036");
                var rejectedList = GetmatchedRecord(graphDetails, 'Status', "50017");
                var unApprovedList = GetmatchedRecord(graphDetails, 'Status', "50016");

                if (graphDetails.length > 0) {
                    if (approvedList.length > 0) {
                        approvedList = ObjSorter(approvedList, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                                var matchedMonthData = GetmatchedRecord(approvedList, "Month", mIndex.toString());
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
                    if (rejectedList.length > 0) {
                        rejectedList = ObjSorter(rejectedList, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                                var matchedMonthData = GetmatchedRecord(rejectedList, "Month", mIndex.toString());
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
                    };
                    //  rejectedamountValues.push(rejobj)
                }
                if (graphDetails.length > 0) {
                    if (unApprovedList.length > 0) {
                        unApprovedList = ObjSorter(unApprovedList, "Year", '123');
                        $.each(moment.monthsShort(), function (mIndex, mItem) {
                            mIndex = mIndex + 1;
                            if (mIndex < 12 || mIndex == 12) {
                                var matchedMonthData = GetmatchedRecord(unApprovedList, "Month", mIndex.toString());
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
                                unApprovedamountValues.push(obj);
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
                            unApprovedamountValues.push(obj);
                        });
                    };
                }

                unApprovedObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": unApprovedamountValues
                }
                graphData.push(unApprovedObj);

                approvedObj = {
                    "color": "#ad1717", "key": "Disputed ", "values": apporvedamountValues
                }
                graphData.push(approvedObj);

                rejectedObj = {
                    "color": "#ED5263", "key": "Rejected ", "values": rejectedamountValues
                }
                graphData.push(rejectedObj);

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

                var unApprovedObj = {
                    "color": "#ffa220", "key": "Awaiting Approvals ", "values": emptyData
                }
                graphData.push(unApprovedObj);

                var approvedObj = {
                    "color": "#ad1717", "key": "Disputed ", "values": emptyData
                }
                graphData.push(approvedObj);

                var rejectedObj = {
                    "color": "#ED5263", "key": "Rejected ", "values": emptyData
                }
                graphData.push(rejectedObj);
            }
        }
       
        isOnload = 0;
        if (isMonthFilterSelected == 0) {
            Get_StackedBarChartModal1('StackedBarChartModal1', graphData);
        }
        else {
            var weekLyGraphData = GetWeeklyGraphData(graphDetails);
            Get_StackedBarChartModal1('StackedBarChartModal1', weekLyGraphData);
        }
       
    }

    var GetWeeklyGraphData = function (graphDetails) {
        var approvedObj = {};
        var rejectedObj = {};
        var unApprovedObj = {};
        var apporvedamountValues = [];
        var rejectedamountValues = [];
        var unApprovedamountValues = [];
        var graphData = [];
        if (graphDetails.length > 0) {
            var approvedList = GetmatchedRecord(graphDetails, 'Status', "50036");
            var rejectedList = GetmatchedRecord(graphDetails, 'Status', "50017");
            var unApprovedList = GetmatchedRecord(graphDetails, 'Status', "50016");

            if (graphDetails.length > 0) {
                graphDetails = ObjSorter(graphDetails, "Week", '123');
                $.each(graphDetails, function (index, item) {
                    var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                    var obj = {};
                    if (item["Status"] == "50036") {
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

                    apporvedamountValues.push(obj);
                });

            }
            if (graphDetails.length > 0) {
                graphDetails = ObjSorter(graphDetails, "Week", '123');
                $.each(graphDetails, function (index, item) {
                    var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                    var rejobj = {};
                    if (item["Status"] == "50017") {
                        rejobj = {
                            "x": " W" + item["Week"],
                            "y": parseInt(item["Amount"])
                        }
                    } else {
                        rejobj = {
                            "x": " W" + item["Week"],
                            "y": 0
                        }
                    }

                    rejectedamountValues.push(rejobj);
                });
                //  rejectedamountValues.push(rejobj)
            }
            if (graphDetails.length > 0) {
                graphDetails = ObjSorter(graphDetails, "Week", '123');
                $.each(graphDetails, function (index, item) {
                    var monthShortName = moment.monthsShort(parseInt(item["Month"]) - 1);
                    var unAObj = {};
                    if (item["Status"] == "50016") {
                        unAObj = {
                            "x": " W" + item["Week"],
                            "y": parseInt(item["Amount"])
                        }
                    }
                    else {
                        unAObj = {
                            "x": " W" + item["Week"],
                            "y": 0
                        }
                    }

                    unApprovedamountValues.push(unAObj);
                });
            }
            unApprovedObj = {
                "color": "#ffa220", "key": "Awaiting Approvals ", "values": unApprovedamountValues
            }
            graphData.push(unApprovedObj);

            approvedObj = {
                "color": "#ad1717", "key": "Disputed ", "values": apporvedamountValues
            }
            graphData.push(approvedObj);

            rejectedObj = {
                "color": "#ED5263", "key": "Rejected ", "values": rejectedamountValues
            }
            graphData.push(rejectedObj);

        }
        else {
            var unApprovedObj = {
                "color": "#ffa220", "key": "Awaiting Approvals ", "values": [{ "x": " ", "y": 0 }]
            }
            graphData.push(unApprovedObj);

            var approvedObj = {
                "color": "#ad1717", "key": "Disputed ", "values": [{ "x": " ", "y": 0 }]
            }
            graphData.push(approvedObj);


            var rejectedObj = {
                "color": "#ED5263", "key": "Rejected ", "values": [{ "x": " ", "y": 0 }]
            }
            graphData.push(rejectedObj);
        }

        return graphData;
    }
}

//Data Manipulation
{
    var GetApprovalHomeData = function (obj) {
        var _obj = {
            'ApproverHomeObj':obj
        };
        var tempList = {};
        $.when(RequestServer("Bill_ApproverHome.aspx/GetApprovalListSHomecreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

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
     
        
        var approverComment = $('#txt_Billcomment').val();;
        var billinfo = $.parseJSON(billDetails[0]["Table"]);
        var approvedAmount = billinfo[0]["Amount"];
        if (approvedAmount != "") {
            approvedAmount = approvedAmount.replace(/,/g, '')
        }
        else {
            approvedAmount = 0;
        }

        var isPartial = 0;
        var approveStatus = 0;
        var currentBillStageApprovalID = 0;
        var subtractedAmount = 0.00;

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
        else if (billinfo[0]["Status"] == "50034") {
            Status = 50034
        }
        else {
            Status = 50016;
        }

        if (approverDescList[0]["ApproverID"] == AccountID.toString()) {
            approveStatus = 50015
        }
        else {
            approveStatus = 50016
        }

        //if (billinfo[0]["ApprovedAmount"] != null && approversAscList[0]["ApproverID"] == AccountID.toString())
        //{
        //    approvedAmount = parseFloat(billinfo[0]["ApprovedAmount"]) + parseFloat(approvedAmount);
        //}
        if (parseFloat(approvedAmount) == parseFloat(billinfo[0]["Balance"]) && approverDescList[0]["ApproverID"] == AccountID.toString()) {
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
            'CreatedBy': (billinfo[0]["CreatedBy"] == null ? 0 : parseInt(billinfo[0]["CreatedBy"])),
            'InvoiceNumber': (billinfo[0]["InvoiceNumber"] == null ? '' : billinfo[0]["InvoiceNumber"]),
            'SubmittedOn': (billinfo[0]["UpdatedOn"] == null ? (moment(billinfo[0]["CreatedOn"]).format('DD MMM YYYY')) : (moment(billinfo[0]["UpdatedOn"]).format('DD MMM YYYY'))),
            'Status': Status,
            'ApproveStatus': approveStatus,
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
            setTimeout(function () {
            if (actionKey == 2) {
                //Rejected
                if (parseInt(response) > 0) {
                    
                    $.notify("Bill rejected successfully.", { position: "right top", className: "success" });
                  
                    $('#MP_Approver').hide();
                
                    var selectedFilter = Filterkl;
                    $('#selected-Filter').html(selectedFilter)
                    var filterObject = GetFilterObject(selectedFilter);
                    approvalHomeScreenData = GetApprovalHomeData(filterObject);
                    if (approvalHomeScreenData != null && approvalHomeScreenData.length > 0) {
                        approvalKpi = $.parseJSON(approvalHomeScreenData[0]["Table"]);
                        unApprovedBillList = $.parseJSON(approvalHomeScreenData[1]["Table1"]);
                        unApprovedBillList = GetmatchedRecord(unApprovedBillList, 'Status', '50016');
                        var graphData = $.parseJSON(approvalHomeScreenData[2]["Table2"]);

                        BindKPI();
                        GraphBinding(graphData)
                        BindAwaitingApprovaldBills(unApprovedBillList);
                        // BindAwaitingApprovaldBills(unApprovedBillList);
                        // window.location.href = 'Bill_ApproverHome.aspx';
                        // window.location.href = 'ApprovalList.aspx';
                        $loading.hide();
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
                    $('#MP_Approver').hide();
                   
                    var selectedFilter  = Filterkl;
                    $('#selected-Filter').html(selectedFilter)
                    var filterObject = GetFilterObject(selectedFilter);
                    approvalHomeScreenData = GetApprovalHomeData(filterObject);
                    if (approvalHomeScreenData != null && approvalHomeScreenData.length > 0) {
                        approvalKpi = $.parseJSON(approvalHomeScreenData[0]["Table"]);
                        unApprovedBillList = $.parseJSON(approvalHomeScreenData[1]["Table1"]);
                        unApprovedBillList = GetmatchedRecord(unApprovedBillList, 'Status', '50016');
                        var graphData = $.parseJSON(approvalHomeScreenData[2]["Table2"]);

                        BindKPI();
                        GraphBinding(graphData)
                        BindAwaitingApprovaldBills(unApprovedBillList);
                    }

                    $loading.hide();
                    
                    //BindAwaitingApprovaldBills(unApprovedBillList);
                    //window.location.href = 'Bill_ApproverHome.aspx';

                    //if (isView != 0) {
                    //    window.location.href = 'ApprovalList.aspx';
                    //}
                    //else {
                    //    GoBack();
                    //}

                }
                else {
                    $.notify("Server error occured while approving a bill !!", { position: "right top", className: "error" });
                }


                }
            },2000);
        });

    }
}

//common
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload':0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status':0,
                    'IsOnload': 0
                }
                isMonthFilterSelected = 1;
                break;
            case "Current Week":
                obj = {
                    'StartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
                isMonthFilterSelected = 1;
                break;
            case "Current Month":
                obj = {
                    'StartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'EndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
                isMonthFilterSelected = 1;
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
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
                isMonthFilterSelected = 1;
                break;
            case "Due Last Month":
                obj = {
                    'StartDate':  moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY'),
                    'EndDate': moment().subtract(1, 'months').endOf('month').format('MM/DD/YYYY'),
                    'CurrentWeekStartDate': moment().startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'CurrentWeekEndDate': moment().endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekStartDate': moment().subtract(1, 'weeks').startOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'LastWeekEndDate': moment().subtract(1, 'weeks').endOf('isoWeek').subtract(1, "days").format('MM/DD/YYYY'),
                    'IsOverDue': 0,
                    'currentDay': moment().format("MM/DD/YYYY"),
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status':0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status':0,
                    'IsOnload': 0
                }
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
                    'lastDay': moment().add(-1, "days").format("MM/DD/YYYY"),
                    'Status': 0,
                    'IsOnload': 0
                }
                isMonthFilterSelected = 0;
                break;


        }
        return obj;
    }

    function moneyFormatter(num) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
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
                    html += '<label class="smt-li-dataplan-inner-sub-title isc-f-13">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + '</label>'
                    html += '<span title="' + item["CreatedOn"] + '">On ' + (item["CreatedOn"] == null ? ' - ' : item["CreatedOn"]) + '</span>'
                    html += '<label class="isc-dis-block isc-pad-left-10 isc-new-cmt mar-top-15">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</label>'
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
var BindBillDetails = function () {
   
    var billinfo = $.parseJSON(billDetails[0]["Table"]);
    $("#lbl_vendor").html(billinfo[0]["VendorName"]);
    $("#lbl_Billno").html(billinfo[0]["InvoiceNumber"]);
    $("#lbl_Billamount").html("$" + billinfo[0]["Amount"]);
    $("#lbl_category").html(billinfo[0]["CategoryName"]);
    $('#lbl_invoicedate').html((billinfo[0]["BillDate"] == null ? '-' : moment(billinfo[0]["BillDate"]).format('MM/DD/YYYY')));
    $('#lbl_duedate').html((billinfo[0]["DueDate"] == null ? '-' : moment(billinfo[0]["DueDate"]).format('MM/DD/YYYY')));

    //$("#lbl_invoicedate").html(billinfo[0]["BillDate"]);
    //$("#lbl_duedate").html(billinfo[0]["DueDate"]);
    $("#txt_approveamt").val("$" + billinfo[0]["Amount"]);
    $("#txt_balanceamt").val("$0");

}

$(document).on('click', '[data-approve-bill]', function () {
    //$("approve-Bill-Yes").show();
    //$("#reject-Bill-Yes").hide();
    if ($(this).attr('data-approve-bill') != undefined && $(this).attr('data-approve-bill') != '0') {
         approveBillId  = parseInt($(this).attr('data-approve-bill'));
        $('#MP_Approver').show();
    }
    billDetails = GetBillDetails();
    BindBillDetails();
});

$(document).on('click', '#approve-Bill-Yes', function () {
    
    $loading.show();
    setTimeout(function () {
        //billDetails = GetBillDetails();
        ApproveOrRejectBill(1);
    },0);
    //$.notify("Please give reason for the rejection!", { position: "right top", className: "error" });
    //
    //$('#MP_Approver').hide();
    
});
$(document).on('click', '[data-reject-bill]', function () {
    //$("#approve-Bill-Yes").hide();
    //$("#reject-Bill-Yes").show();
    if ($(this).attr('data-reject-bill') != undefined && $(this).attr('data-reject-bill') != '0') {
        approveBillId = parseInt($(this).attr('data-reject-bill'));
        $('#MP_Approver').show();
        billDetails = GetBillDetails();
        BindBillDetails();
    }
});

$(document).on('click', '#reject-Bill-Yes', function () {
   
   
    if ($.trim($('#txt_Billcomment').val()) != '') {
        $loading.show();
        setTimeout(function () {
            //billDetails = GetBillDetails();
            ApproveOrRejectBill(2);
        }, 0);
    }
    else {
        $.notify("Please give reason for the rejection!", { position: "right top", className: "error" });
        return false;
    }
    
});
$(document).on('click', '#Approve-cancel,#Reject-cancel,#btn-approvecancel,#btn-rejectcancel', function () {
   
    $('#MP_Approver').hide();

});
