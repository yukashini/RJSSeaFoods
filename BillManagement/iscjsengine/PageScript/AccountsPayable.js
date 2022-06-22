//Global Variables
{
    var billPayableList = [];
    var filterList = [];
    var filterdBillList = [];
    var exportList = [];
}

//Load and Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        BuildAccountsPayable();
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-search', function () {
        $loading.show();
        setTimeout(function () {
        filterdBillList = GetBillListFilter();
        BindAccountPayableList(filterdBillList);
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-reset', function () {
        $loading.show();
        setTimeout(function () {
        BindMasterData();
        $('#slt-vendor option[value="0"]').prop('selected', 'selected').change();
        $('#slt-Bills option[value="0"]').prop('selected', 'selected').change();
        $('#date-range').val('');
        $('#date-range').mask('00/00/0000');
        $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortDown');
        $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortUp')
        $('#tbl-Payable th[sort-column-Type]').removeClass('sorting-asc');
        $('#tbl-Payable th[sort-column-Type]').removeClass('sorting-desc');
        filterdBillList = GetBillListFilter();
        BindAccountPayableList(filterdBillList);
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
                $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Payable th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = exportList

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
                BindSortedList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });
}

//Dom Manipulation
{
    var BuildAccountsPayable = function () {
        billPayableList = GetBillData();
        billPayableList = $.parseJSON(billPayableList[0]["Table"]);
        BindMasterData();
        filterdBillList = billPayableList;
        BindAccountPayableList(filterdBillList);
    }

    var BindMasterData = function () {
        BindVendor($('#slt-vendor'), billPayableList, 'Choose Vendor');
        BindBill($('#slt-Bills'), billPayableList, 'Choose Bill/Invoice');
        $('.select2').select2();
        $('#date-range').mask('00/00/0000');
    }

    var BindAccountPayableList = function (lstPayables) {
        var html = '';
        var $el = $('#tbl-Payable-Body');
        var currentPayable = 0;
        var zeroToThirty = 0;
        var thirtyToSixty = 0;
        var sixtyToNinty = 0;
        var nintyToOneTwenty = 0;
        var aboveOneTwenty = 0;
        var totalOutStanding = 0;
        exportList = [];
        var objExport = {};
        if (lstPayables.length > 0) {
             var ditictedVendorList = GetDistinctArray(lstPayables, 'VendorID');
             $.each(ditictedVendorList, function (index, item) {
                 lstPayables = GetDistinctArray(lstPayables, 'BillID');
                 $.each(lstPayables, function (a, b) {
                     if (item["VendorID"] == b["VendorID"])
                     {
                         currentPayable = currentPayable + parseFloat(b["CurrentPayable"]);
                         zeroToThirty = zeroToThirty + parseFloat(b["ZeroToThirty"]);
                         thirtyToSixty = thirtyToSixty + parseFloat(b["ThirtyToSisty"]);
                         sixtyToNinty = sixtyToNinty + parseFloat(b["SixtyToNinty"]);
                         nintyToOneTwenty = nintyToOneTwenty + parseFloat(b["NintyToOneTwenty"]);
                         aboveOneTwenty = aboveOneTwenty + parseFloat(b["AboveOneTwenty"]);
                     }
                 });
                 totalOutStanding = (currentPayable + zeroToThirty + thirtyToSixty + sixtyToNinty + nintyToOneTwenty + aboveOneTwenty);
                html+=' <tr>';
                html+=' <td>';
                html += ' <h5><a href="PaymentSummary.aspx?VendorID=' + item["VendorID"] + ' "">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</a></h5>';
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align: right;">' + (currentPayable == "" ? 0 : currentPayable.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' ';
                html+=' </h5>';
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align: right;">' + (zeroToThirty == "" ? 0 :  zeroToThirty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '';
                html+=' </h5>';
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align: right;">' + (thirtyToSixty == "" ? 0 : thirtyToSixty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align: right;">' + (sixtyToNinty == "" ? 0 :  sixtyToNinty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align: right;">' + (nintyToOneTwenty == "" ? 0 :  nintyToOneTwenty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+=' </td>';
                html+=' <td class="isc-lst-suc-td-bg-clr">';
                html += ' <h5 style="text-align: right;">' + (aboveOneTwenty == "" ? 0 :  aboveOneTwenty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+=' </td>';
                html+=' <td>';
                html += ' <h5 style="text-align: right;">' + (totalOutStanding == "" ? 0 :  totalOutStanding.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html+=' </td>';
                html += ' </tr>';
                objExport = {
                    "VENDOR": (item.VendorName == null ? '-' : item.VendorName),
                    "CURRENTPAYABLE": currentPayable,
                    "zeroToThirty": zeroToThirty,
                    "thirtyToSixty": thirtyToSixty,
                    "sixtyToNinty": sixtyToNinty,
                    "nintyToOneTwenty": nintyToOneTwenty,
                    "aboveOneTwenty": aboveOneTwenty,
                    "totalOutStanding": totalOutStanding
                }
                exportList.push(objExport);
                currentPayable = 0;
                zeroToThirty = 0;
                thirtyToSixty = 0;
                sixtyToNinty = 0;
                nintyToOneTwenty = 0;
                aboveOneTwenty = 0;
                totalOutStanding = 0;
            });
             ExcelVaultList(exportList, 'Accounts Payable');
        }
        else {
            html += '<tr><td colspan="8"><p>No Data Found</p></tr></td>';
        }
        $el.html(html);
    }

    var BindSortedList = function (sortedList) {
        var $el = $('#tbl-Payable-Body');
        var html = '';
        var lstVendorData = [];
        if (sortedList.length > 0) {
            $.each(sortedList, function (index, item) {
                var currentPayable=parseFloat(item["CURRENTPAYABLE"]);
                var zeroToThirty = parseFloat(item["zeroToThirty"]);
                var thirtyToSixty = parseFloat(item["thirtyToSixty"]);
                var sixtyToNinty = parseFloat(item["sixtyToNinty"]);
                var nintyToOneTwenty = parseFloat(item["nintyToOneTwenty"]);
                var aboveOneTwenty = parseFloat(item["aboveOneTwenty"]);
                var totalOutStanding = parseFloat(item["totalOutStanding"]);
                html += ' <tr>';
                html += ' <td>';
                html += ' <h5><a href="PaymentSummary.aspx">' + (item["VENDOR"] == null ? '-' : item["VENDOR"]) + '</a></h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align: right;">' + (currentPayable == "" ? 0 :  currentPayable.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' ';
                html += ' </h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align: right;">' + (zeroToThirty == "" ? 0 :  zeroToThirty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '';
                html += ' </h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align: right;">' + (thirtyToSixty == "" ? 0 :  thirtyToSixty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align: right;">' + (sixtyToNinty == "" ? 0 :  sixtyToNinty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align: right;">' + (nintyToOneTwenty == "" ? 0 : nintyToOneTwenty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += ' </td>';
                html += ' <td class="isc-lst-suc-td-bg-clr">';
                html += ' <h5 style="text-align: right;">' + (aboveOneTwenty == "" ? 0 : aboveOneTwenty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += ' </td>';
                html += ' <td>';
                html += ' <h5 style="text-align: right;">' + (totalOutStanding == "" ? 0 :  totalOutStanding.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += ' </td>';
                html += ' </tr>';
                objExport = {
                    "VENDOR": (item["VENDOR"] == null ? '-' : item["VENDOR"]),
                    "CURRENTPAYABLE": currentPayable,
                    "zeroToThirty": zeroToThirty,
                    "thirtyToSixty": thirtyToSixty,
                    "sixtyToNinty": sixtyToNinty,
                    "nintyToOneTwenty": nintyToOneTwenty,
                    "aboveOneTwenty": aboveOneTwenty,
                    "totalOutStanding": totalOutStanding
                }
               
                lstVendorData.push(objExport);
                currentPayable = 0;
                zeroToThirty = 0;
                thirtyToSixty = 0;
                sixtyToNinty = 0;
                nintyToOneTwenty = 0;
                aboveOneTwenty = 0;
                totalOutStanding = 0;
            });
           // ExcelVaultList(lstVendorData, 'Accounts Payable');
            $el.html(html);
        }
    }
}

//Data Manipulation
{
    var GetBillData = function () {
        var _obj = {
            
        };

        var tempList = {};
        $.when(RequestServer("AccountsPayable.aspx/GetAccountsPayableDataList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{
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
                if (item["InvoiceNumber"] != null && item["InvoiceNumber"] != '') {
                    html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) + "/" + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == "" ? "-" : item["InvoiceNumber"]) + '</option>';
                }
                else {
                    html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) + '</option>';
                }
            });
        }
        $el.html(html);
    }

    var GetBillListFilter = function () {
        var $elVendor = $('#slt-vendor').val();
        var $elBills = $('#slt-Bills').val();
       
        var $date = $('#date-range').val();
        var lstResult = [];
        if (billPayableList.length > 0) {
            lstResult = billPayableList;

            if ($elVendor != 0 && $elVendor != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["VendorID"] == $elVendor)
                });
            }

            if ($elBills != 0 && $elBills != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["BillID"] == $elBills)
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
}

//Excel Export
{
    var ExcelVaultList = function (lstexcelgiven, ExcelName) {
        if (lstexcelgiven.length > 0) {
            var Excelexportlist = lstexcelgiven.map(function (item) {
                var currentPayable = parseFloat(item["CURRENTPAYABLE"]);
                var zeroToThirty = parseFloat(item["zeroToThirty"]);
                var thirtyToSixty = parseFloat(item["thirtyToSixty"]);
                var sixtyToNinty = parseFloat(item["sixtyToNinty"]);
                var nintyToOneTwenty = parseFloat(item["nintyToOneTwenty"]);
                var aboveOneTwenty = parseFloat(item["aboveOneTwenty"]);
                var totalOutStanding = parseFloat(item["totalOutStanding"]);
                return {
                   
                    "VENDOR": item.VENDOR,
                    "CURRENT PAYABLE": (currentPayable == "" ? 0 : '$' + currentPayable.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    "0-30 DAYS": (zeroToThirty == "" ? 0 : '$' + zeroToThirty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    "31-60 DAYS": (thirtyToSixty == "" ? 0 : '$' + thirtyToSixty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    "61-90 DAYS": (sixtyToNinty == "" ? 0 : '$' + sixtyToNinty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    "91-120 DAYS": (nintyToOneTwenty == "" ? 0 : '$' + nintyToOneTwenty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    ">120 DAYS": (aboveOneTwenty == "" ? 0 : '$' + aboveOneTwenty.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    "TOTAL OUTSTANDING": (totalOutStanding == "" ? 0 : '$' + totalOutStanding.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                }
            });
            var ExcelList = JSON.stringify(Excelexportlist);
            $('#ContentPlaceHolder1_lstbillexport').val("");
            $('#ContentPlaceHolder1_lstbillexport').val(ExcelList);
            
        } else {
            
            $('#ContentPlaceHolder1_lstbillexport').val("");
        }
    }
}