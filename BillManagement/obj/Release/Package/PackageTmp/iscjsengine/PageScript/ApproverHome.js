//Global Variables
{
    var approverHomeData = [];
    var unApprovedList = [];
}

//Load & Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            SetSession('selectedMenu', 2)
            SetActiveMenu();
            BuildApproverHome();
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
                $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = unApprovedList

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorter(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorter(lstResult, columngroupby, '321');
            }
            else if (columType =='date') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
            }
            else if (columType == 'number') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByFloatNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByFloatNumber(lstResult, columngroupby, '321');
            }


            // Render List
            {
                BindUnapprovedBillList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[data-attachment]', function () {
        var billId = parseInt($(this).attr('data-attachment'))
        //r fileName=$(
       
      
        if (billId != undefined) {
         
            var fileName = $(this).attr('data-fileName');;
            var fileDisplayName = $(this).attr('data-disp-Name');
            if (fileName != undefined && fileName != "") {
                $('#fileName').text(fileDisplayName == null ? '-' : fileDisplayName);
                $('#fileName').prop('title', fileDisplayName == null ? '-' : fileDisplayName);
                BillFrameAttatchment(fileName);
                $('#mp_bill_attach').show();
            }
            else {
                $.notify("There is no attachment for this bill", { position: "right top", className: "error" });
            }
        }
       

    })

    $(document).on('click', '#attachment-close', function () {

        $('#mp_bill_attach').hide();
    })

}

//DOM Manipulation
{
    var BuildApproverHome = function () {
      
        approverHomeData = GetApproverHomeData();
        BindKPIValues();
        unApprovedList = $.parseJSON(approverHomeData[1]["Table1"]);
        unApprovedList = ObjSorterByDate(unApprovedList, 'DueDate', '123');
        BindUnapprovedBillList();
        var billCountList = $.parseJSON(approverHomeData[2]["Table2"]);
        BindBillCountGraph(billCountList);
    }

    var BindKPIValues=function()
    {
      
        var invoiceAmountList = $.parseJSON(approverHomeData[0]["Table"]);
        $('#total-Invoice-amount').html('$' + (invoiceAmountList[0]["TotalAmount"] == null || Math.sign(parseFloat(invoiceAmountList[0]["TotalAmount"])) == -1 ? 0 : parseFloat(invoiceAmountList[0]["TotalAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        $('#unapproved-Bill-amount').html("$" + (invoiceAmountList[0]["UnapprovedAmount"] == null || Math.sign(parseFloat(invoiceAmountList[0]["UnapprovedAmount"])) == -1 ? 0 : parseFloat(invoiceAmountList[0]["UnapprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        $('#approved-bill-amount').html("$" + (invoiceAmountList[0]["ApprovedAmount"] == null || Math.sign(parseFloat(invoiceAmountList[0]["ApprovedAmount"])) == -1 ? 0 : parseFloat(invoiceAmountList[0]["ApprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        $('#rejected-bill-amount').html("$" + (invoiceAmountList[0]["RejectedAmount"] == null || Math.sign(parseFloat(invoiceAmountList[0]["RejectedAmount"])) == -1 ? 0 : parseFloat(invoiceAmountList[0]["RejectedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        $('#unApproved-Tbl-KPI').html('Unapproved Bills / Invoice ($' + (invoiceAmountList[0]["UnapprovedAmount"] == null || Math.sign(parseFloat(invoiceAmountList[0]["UnapprovedAmount"])) == -1 ? 0 : parseFloat(invoiceAmountList[0]["UnapprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ')')
    }

    var BindUnapprovedBillList = function () {
        var html = '';
        var $el = $('#tbl-unApproved-body');
        if (unApprovedList.length > 0) {
            $.each(unApprovedList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                var dollerAmount = 0;
                if (item["Balance"] != "" && item["Balance"] != null) {
                    dollerAmount = $(item["Balance"]).mask("#,##0.00");
                    dollerAmount = dollerAmount.selector;
                }
                html+='<tr>';
                html+=' <td>';
                html += ' <h5><a > ' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</a></h5>';
                html+=' </td>';
                html += ' <td>';
                html += ' <h5 class="">'+(item["InvoiceNumber"] == null || item["InvoiceNumber"] == "" ? "-" : item["InvoiceNumber"]);               
                html+=' </h5>';
                html+=' </td>';
                html += ' <td>';
                if (moment(today) <= dueDay) {
                    html += ' <h5 >' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }
                else {
                    html += ' <h5 style="color:red !important;">' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '</h5>';
                }
               
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align:right;">' + (item["Balance"] == null || item["Balance"] == '' ? '' : parseFloat(item["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+=' </td>';
                html += ' <td style="text-align:center;">';
                if (item["Status"] != '50034') {
                    html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" data-disp-Name="' + item["FileDisplayName"] + '" data-fileName="' + item["FileName"] + '" data-attachment=' + item["BillID"] + '"><i class="fa fa-paperclip"></i></a>';
                    html += ' <a class="isc-action-badge-td-s1 " title="Approve" href="ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-check-circle-o isc-exp-man-icn1"></i></a>';
                    html += ' <a class="isc-action-badge-td-s1" title="Reject"  href="ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-times-circle-o isc-exp-man-icn2"></i></a>';
                }
                else {
                    html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" data-disp-Name="' + item["FileDisplayName"] + '" data-fileName="' + item["FileName"] + '" data-attachment=' + item["BillID"] + '"><i class="fa fa-paperclip"></i></a>';
                    html += ' <a class="isc-action-badge-td-s1 " title="Approve" href="ApprovalDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-check-circle-o isc-exp-man-icn1" style="padding-right: 15px;"></i></a>';
                }
               
                html+=' </td>  ';
                html += ' </tr>';
            });
        }
        else {
            html += '<p>No Data Found</p>';
        }
        $el.html(html);
    }

    var BindBillCountGraph = function (countlst) {
        var totalBillCount = (countlst[0]["TotalBillCount"] == null ? 0 : countlst[0]["TotalBillCount"])
        totalBillCount = totalBillCount + "000000";
        var unApprovedCount = (countlst[0]["UnapprovedBillCount"] == null ? 0 : countlst[0]["UnapprovedBillCount"]);
        unApprovedCount = unApprovedCount+"000000"
        var approvedBillCount = (countlst[0]["ApprovedBillCount"] == null ? 0 : countlst[0]["ApprovedBillCount"])
        approvedBillCount = approvedBillCount + "000000"
        var rejectedBillCount = (countlst[0]["RejectedBillCount"] == null ? 0 : countlst[0]["RejectedBillCount"])
        rejectedBillCount = rejectedBillCount + "000000"
        var StackedBarChartModalPay =
        [
     {
         "color": "#34D3EB", "key": "Expenses", "values": [
           { "x": "Total Bills", "y": totalBillCount },
           { "x": "Unapproved", "y": unApprovedCount },
           { "x": "Approved", "y": approvedBillCount },
           { "x": "Reject", "y": rejectedBillCount }]
     },

        ];
        Get_pay_catgry("StackedBarChartModalPay", StackedBarChartModalPay);
    }

    var BillFrameAttatchment = function (fileImage) {
        $('#attachment-Block').html('');
        var iframe = document.getElementById("attachment_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "attachment_Frame";
            var iframewidth = 390;
            iframe.src = filePathUrl + fileImage;
          //  iframe.src = "http://localhost:49504/images/FileBills/".concat(fileImage);
          //  iframe.src = "https://testing.archarena.com/BillManagement/images/FileBills/".concat(fileImage);
            //iframe.src = "http://localhost:49504/images/FileBills/sample.pdf";
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;")
            $('#attachment-Block').append(iframe);
        }
    }
}

//Data Manipulation
{
    var GetApproverHomeData = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("ApproverHome.aspx/GetApproverHomeList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

}

//Common
{

}