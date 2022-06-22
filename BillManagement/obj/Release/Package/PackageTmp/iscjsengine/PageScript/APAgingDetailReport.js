{
    var FilterStartDate = null;
    var FilterEndDate = null;
    var Fromval = 1;
    var Toval = 30;
    var AginglstDetailed = [];
}
//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
           
            AginglstDetailed = GetAgingStatusData();
            BindAgingDetailedList();
            BindDropDowns();
            RegisterDatepicker();
            $loading.hide();
        }, 0);
    });
}
{
    var BindAgingDetailedList = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_Agingdetailed').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "APAgingDetailReport.aspx/GetAgingDetailed",
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
                    json.data = common.AUF(objData['VendorList']);
                    json.recordsTotal = common.AUF(objData['AllCount'][0]["Count"]);
                    json.recordsFiltered = common.AUF(objData['AllCount'][0]["Count"]);
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[0, "asc"]],
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
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["VendorName"] == null || data["VendorName"] == '' ? '-' : data["VendorName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var nextDue = moment.utc(data["BillDate"]).toDate();
                        var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                        var html = '';
                        html += '<div style="text-align: left;">';
                        html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                        html += '</div>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? '-' : data["InvoiceNumber"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["PaymentTerms"] == null || data["PaymentTerms"] == '' ? '-' : data["PaymentTerms"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var nextDue = moment.utc(data["DueOn"]).toDate();
                        var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                        var html = '';
                        html += '<div style="text-align: left;">';
                        html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                        html += '</div>';
                        return html;
                    }
                },
                {
                    "width": '15.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Agingday"] == null || data["Agingday"] == '' ? '-' : data["Agingday"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '23%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: left; color: #66B050!important;">' + ("$" + (data["Balance"] == null || Math.sign(parseFloat(data["Balance"])) == -1 ? '0.00' : parseFloat(data["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
               
            },

            "fnDrawCallback": function () {
                $('#tbl_Agingdetailed tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });

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
        obj.Vendor = $.trim($('#dl_vendor').val());
        obj.Fromdate = FilterStartDate;
        obj.Todate = FilterEndDate;
        obj.PaymentTerms = $.trim($('#dl_paymentterm').val());
        obj.Balanceamt = $.trim($('#txt_balanceamt').val());
        obj.Fromval = Fromval;
        obj.Toval = Toval;
        var _obj = {};
        _obj = { "agingDetailed": obj };
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
                orderBy = "BillDate " + direction;
                break;
            case 2:
                orderBy = "InvoiceNumber " + direction;
                break;
            case 3:
                orderBy = "PaymentTerms " + direction;
                break;
            case 4:
                orderBy = "DueOn " + direction;
                break;
            case 5:
                orderBy = "Agingday " + direction;
                break;
            case 6:
                orderBy = "Balance " + direction;
                break;
        }
        return orderBy;
    }
}

var GetAgingStatusData = function () {
    var tempList = {};
    $.when(RequestServer("APAgingDetailReport.aspx/GetAgingStatusFiltersData")).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}
$(document).on('click', '#Btn_serch', function (e) {
    BindAgingDetailedList();
});
$(document).on('click', '#Btn_export', function (e) {
    ExportToExcel();
});
function ExportToExcel() {
    var html = document.querySelector("#tbl_Agingdetailed").outerHTML;//your html table name
    common.export_table_to_csv(html, "AP_Aging_Detailed_Report.csv");
}
$(document).on('click', '#btn_Reset', function (e) {
    $("#dl_vendor").val("0").change();
    $("#dl_paymentterm").val("0").change();
    $("#txt_balanceamt").val("");
    RegisterDatepicker();
    BindAgingDetailedList();
    
});
$(document).on('click', '[data-toggle]', function () {
    //$("#dl_vendor").val("0").change();
    //$("#dl_paymentterm").val("0").change();
    //$("#txt_balanceamt").val("");
    RegisterDatepicker();
    $('.nav-tabs li.active').removeClass('active');
    $(this).parent().addClass('active');
    var TabId = parseInt($(this).attr('data-toggle'));
    if (TabId == 60) {
        Fromval = 31;
        Toval = 60;
    }
    else if (TabId == 90) {
        Fromval = 61;
        Toval = 90;
    }
    else if (TabId == 100) {
        Fromval = 100;
        Toval = 100;
    }
    else {
        Fromval = 1;
        Toval = 30;
    }
    BindAgingDetailedList();
});
//Data Manipulation
{
    var GetVendorbalanceStatusData = function () {
        var tempList = {};
        $.when(RequestServer("APAgingDetailReport.aspx/GetAgingStatusFiltersData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}
var BindDropDowns = function () {
    
    var Vendorlst = common.AUF($.parseJSON(AginglstDetailed[0]["Table"]));

    var VendorHtml = '<option value="0">Choose Vendor Name</option>';
    $.each(Vendorlst, function (index, item) {
        VendorHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
    });
    $('#dl_vendor').html(VendorHtml);

    var Pamentlst = common.AUF($.parseJSON(AginglstDetailed[1]["Table1"]));
    var PaymentHtml = '<option value="0">Choose Payment Terms</option>';
    $.each(Pamentlst, function (index, item) {
        PaymentHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
    });
    $('#dl_paymentterm').html(PaymentHtml);
}
var RegisterDatepicker = function () {
    FilterStartDate = '01/01/2001';
    FilterEndDate = '01/01/2023';
    $('#Daterangepicker').daterangepicker({
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
    $('#Daterangepicker').on('apply.daterangepicker', function (ev, picker) {
        FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
        FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
    });
}

function SetSwapDateRange(start, end) {
    if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
        && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
    ) {
        $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> Any Date');
    }
    else {
        $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
    }

}