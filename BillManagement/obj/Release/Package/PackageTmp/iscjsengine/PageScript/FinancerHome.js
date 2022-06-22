//GLOBAL VARIABLES
{
    var ApprovedBillList = [];
    var billList = [];
    var billId = 0;
    var IdentityId=0
   
}

//LOAD & EVENTS
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        BuildManagerScreen();
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
                $('#approved-Bill-Table th[sort-column-Type]').removeClass('headerSortDown');
                $('#approved-Bill-Table th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#approved-Bill-Table th[sort-column-Type]').removeClass('headerSortDown');
                $('#approved-Bill-Table th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#approved-Bill-Table th[sort-column-Type]').removeClass('headerSortDown');
                $('#approved-Bill-Table th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = billList

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
                BindApprovedList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[flag-Id]', function () {
         billId = $(this).attr('flag-Id');
         IdentityId = $(this).closest('td').attr('identity-Id');
         if (billId != undefined && IdentityId != undefined) {
             $('#mp_bill_flag').show();

         }
       
    });

    $(document).on('click', '#btn-flag-ok', function () {
        $loading.show();
        setTimeout(function () {
        ChangeToflag(parseInt(billId), parseInt(IdentityId));
        $('#mp_bill_flag').hide();
        BuildManagerScreen();
        $loading.hide();
        }, 0);
     })

    $(document).on('click', '[flag-cancel]', function () {
        billId = 0;
        IdentityId = 0;
        $('#mp_bill_flag').hide();
    });

}

//DOM MANIPULATION
{
    var BuildManagerScreen = function () {
        ApprovedBillList = GetBillList();
        billList = $.parseJSON(ApprovedBillList[1]["Table1"]);
        billList = GetDistinctArray(billList, 'IdentityID');
        BindAmountKPI();
        BindApprovedList(billList);
        BindGraph();
    }

    var BindAmountKPI = function () {
        var kpiList = $.parseJSON(ApprovedBillList[0]["Table"]);
        if (kpiList != undefined && kpiList != null && kpiList.length > 0) {
            $('#Out-Standing-Amount').text(kpiList[0]["TotalOutStatndingPaymentAmount"] == null ? '$0' : '$' + kpiList[0]["TotalOutStatndingPaymentAmount"]);
            $('#Over-Due-Amount').text(kpiList[0]["OverDueAmount"] == null ? '$0' : '$' + kpiList[0]["OverDueAmount"]);
            $('#Un-Paid-Amount').text(kpiList[0]["UnPaidAmount"] == null ? '$0' : '$' + kpiList[0]["UnPaidAmount"]);
            $('#Due-Week-Amount').text(kpiList[0]["DueWeekAmount"] == null ? '$0' : '$' + kpiList[0]["DueWeekAmount"]);
        }
       
    }

    var BindApprovedList = function (approvedList) {
        var html='';
        var $el = $('#Approved-Table-Body');
       
        if (approvedList.length > 0) {
            $.each(approvedList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueOn"]);
                var amount = item["ApprovedAmount"].replace(/,/g, '');
                amount = parseFloat(amount);
                html += ' <tr>';
                html += ' <td>';
                html += ' <h5 title="' + (item["VendorName"] == null ? '' : item["VendorName"]) + '"><a href="PaymentSummary.aspx">' + (item["VendorName"] == null ? '' : item["VendorName"]) + ' </a></h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 class="">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == "" ? '-' : item["InvoiceNumber"]);
                html += ' </h5>';
                html += ' </td>';
                html += ' <td>';
                if (moment(today) <= dueDay) {
                    html += ' <h5 >' + (item["DueOn"] == null ? '-' :  moment(item["DueOn"])).format('MM/DD/YYYY') + '</h5>';
                }
                else {
                    html += ' <h5 style="color:red !important;">' + (item["DueOn"] == null ? '-' : moment(item["DueOn"])).format('MM/DD/YYYY') + '</h5>';
                }
                html += ' </td>    ';
                html += ' <td>';
                html += ' <h5 title="' + (item["PaymentTermName"] == null ? '-' : item["PaymentTermsName"]) + '">' + (item["PaymentTermsName"] == null ? '-' : item["PaymentTermsName"]) + '</h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align:right;">' + (amount == "" ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += ' </td>';
                html += ' <td style="text-align:center;" identity-Id=' + item["IdentityID"] + '>';
                html += ' <a href="PaymentSummary.aspx"><img src="img/appimages/makepayment.png" class="isc-make-pay" title="Make Payment" style="cursor:pointer;"></a>';
                if (item["PaymentStatus"] == '50025') {
                    html += ' <a class="isc-action-badge-td-s1"  title="Flag" href="#"><i class="fa fa-flag" style="color:#25b4e9;"></i></a>';
                }
                else {
                    html += ' <a class="isc-action-badge-td-s1" flag-Id=' + item["BillID"] + ' title="Flag" href="#"><i class="fa fa-flag"></i></a>';
                }
               
                html += ' <a class="isc-action-badge-td-s1" title="Challenge" href="PaymentSummary.aspx"><i class="fa fa-question-circle"></i></a>';
                html += ' </td>';
                html += ' </tr>';
            });
        }
        else {
            html += '<p>No Data Found</p>';
        }
        $el.html(html);
    }

    var BindGraph = function () {
        var GraphList = $.parseJSON(ApprovedBillList[0]["Table"]);
        if (GraphList.length > 0) {
            Data_HorizontalBarChartModel5 = [
{
    "color": "#73BB69",
    key: "Cumulative Return",
    values: [
    {
        "label": "Total Payments Due",
        "value": (GraphList[0]["TotalOverDuePaymentCount"] == null ? 0 : parseInt(GraphList[0]["TotalOverDuePaymentCount"])),
        "color": "#34D3EB"
    },

    {
        "label": "Posted Payments",
        "value": (GraphList[0]["PostedPaymentCount"] == null ? 0 : parseInt(GraphList[0]["PostedPaymentCount"])),
        "color": "#34D3EB"
    },
    {
        "label": "Overdue Payments",
        "value": (GraphList[0]["OverDuePayment"] == null ? 0 : parseInt(GraphList[0]["OverDuePayment"])),
        "color": "#34D3EB"
    },

    {
        "label": "Unsuccessful Payments",
        "value": (GraphList[0]["UnsucessFullPaymnets"] == null ? 0 : parseInt(GraphList[0]["UnsucessFullPaymnets"])),
        "color": "#34D3EB"
    },


    ]
}
            ];
        }

        Acc_Rec_by_aging2("HorizontalStackedBarChartModel5", Data_HorizontalBarChartModel5);
   
    }
}

//DATA MANIPULATION
{
    var GetBillList=function()
    {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("FinancerHome.aspx/GetFinacerHomeList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ChangeToflag = function (billId,IdentityId) {
        var _obj = {
            'billId': billId,
            'IdentityId':IdentityId
        }
        var tempList = {};
        $.when(RequestServer("FinancerHome.aspx/updateBillStatus", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//COMMON
{

}
