{

    var FilterStartDate = null;
    var FilterEndDate = null;
    var FilterStartDueDate = null;
    var FilterEndDueDate = null;
    var Aginglst = [];
}
//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            
            Aginglst = GetAgingStatusData();
            BindAgingsummaryList();
            BindDropDowns();
            $loading.hide();
        }, 0);
    });
}
{
    var BindAgingsummaryList = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_Agingreport').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "APAgingSummaryReport.aspx/GetAgingSummary",
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
                        var html = '<h5 style="text-align: left; color: #66B050!important;">' + ("$" + (data["1-30DAYS"] == null || Math.sign(parseFloat(data["1-30DAYS"])) == -1 ? '0.00' : parseFloat(data["1-30DAYS"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: left; color: #66B050!important;">' + ("$" + (data["31-60DAYS"] == null || Math.sign(parseFloat(data["31-60DAYS"])) == -1 ? '0.00' : parseFloat(data["31-60DAYS"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: left; color: #66B050!important;">' + ("$" + (data["61-90DAYS"] == null || Math.sign(parseFloat(data["61-90DAYS"])) == -1 ? '0.00' : parseFloat(data["61-90DAYS"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: left; color: #66B050!important;">' + ("$" + (data[">90DAYS"] == null || Math.sign(parseFloat(data[">90DAYS"])) == -1 ? '0.00' : parseFloat(data[">90DAYS"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "orderable": true,
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: left; color: #66B050!important;">' + ("$" + (data["Totalamt"] == null || Math.sign(parseFloat(data["Totalamt"])) == -1 ? '0.00' : parseFloat(data["Totalamt"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
                
            },

            "fnDrawCallback": function () {
                $('#tbl_Agingreport tr td').each(function (index, item) {
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
        obj.Vendor = $.trim($('#dl_Vendor').val());
        obj.BalanceAmt = $.trim($('#txt_balanceamt').val());
        obj.Totalamt = $.trim($('#txt_totalbill').val());
        var _obj = {};
        _obj = { "agingSummary": obj };
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
                orderBy = "[0-30DAYS] " + direction;
                break;
            case 2:
                orderBy = "[31-600DAYS] " + direction;
                break;
            case 3:
                orderBy = "[0-90DAYS] " + direction;
                break;
            case 4:
                orderBy = "[>90DAYS] " + direction;
                break;
            case 5:
                orderBy = "Totalamt " + direction;
                break;
        }
        return orderBy;
    }
}
var BindDropDowns = function () {
   
    var Vendorlst = common.AUF($.parseJSON(Aginglst[0]["Table"]));
    var VendorHtml = '<option value="0">Choose Vendor Name</option>';
    $.each(Vendorlst, function (index, item) {
        VendorHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
    });
    $('#dl_Vendor').html(VendorHtml);
}
var GetAgingStatusData = function () {
    var tempList = {};
    $.when(RequestServer("BillDueBasedReport.aspx/GetUnpaidBillStatusFiltersData")).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}
$(document).on('click', '#Btn_serch', function (e) {
    BindAgingsummaryList();
});
$(document).on('click', '#Btn_export', function (e) {
    ExportToExcel();
});
function ExportToExcel() {
    var html = document.querySelector("#tbl_Agingreport").outerHTML;//your html table name
    common.export_table_to_csv(html, "AP_Aging_Summary_Report.csv");
}
$(document).on('click', '#btn_Reset', function (e) {
   
    $("#dl_Vendor").val("0").change();
    
    $("#txt_totalbill").val('');
    $("#txt_balanceamt").val('');
    
    BindAgingsummaryList();

});