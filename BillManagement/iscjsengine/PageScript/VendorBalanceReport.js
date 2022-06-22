{
    var VendorBalancetatuslst = [];
    var FilterStartDate = null;
    var FilterEndDate = null;
    var FilterStartDueDate = null;
    var FilterEndDueDate = null;
}
//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
           VendorBalancetatuslst = GetVendorbalanceStatusData();
            BindVendorBalancList();
            BindDropDowns();
            
            $loading.hide();
        }, 0);
    });
}

{
    var BindVendorBalancList = function () {
       
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_vendorbalance').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "VendorBalanceReport.aspx/GetVendorBalance",
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
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["TOTALBILLABLEAMT"] == null || Math.sign(parseFloat(data["TOTALBILLABLEAMT"])) == -1 ? '0.00' : parseFloat(data["TOTALBILLABLEAMT"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["TOTALPAIDAMT"] == null || Math.sign(parseFloat(data["TOTALPAIDAMT"])) == -1 ? '0.00' : parseFloat(data["TOTALPAIDAMT"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["OVERDUEAMT"] == null || Math.sign(parseFloat(data["OVERDUEAMT"])) == -1 ? '0.00' : parseFloat(data["OVERDUEAMT"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["PAYABLEAMT"] == null || Math.sign(parseFloat(data["PAYABLEAMT"])) == -1 ? '0.00' : parseFloat(data["PAYABLEAMT"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var nextDue = moment.utc(data["LASTPAYMENT"]).toDate();
                        var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                        var html = '';
                        html += '<div style="text-align: left;">';
                        html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                        html += '</div>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["NEXTDUEIN"]);
                       
                        var nextDue = moment.utc(data["NEXTDUEIN"]).toDate();
                        var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                        if (moment(today) <= dueDay) {
                            var html = '';
                            html += '<div style="text-align: left;">';
                            html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                            html += '</div>';
                            return html;
                        }
                        else {
                            var html = '';
                            if (localDue != 'Invalid date') {
                                html += '<div style="text-align: left;">';
                                html += '<h5 style="color:red">' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                                html += '</div>';
                                return html;
                            }
                            else {
                                html += '<div style="text-align: left;">';
                                html += '<h5>' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                                html += '</div>';
                                return html;
                            }
                        }
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["PAYMENTMWTHOD"] == null || data["PAYMENTMWTHOD"] == '' ? '-' : data["PAYMENTMWTHOD"]) + '</h5>'
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
                
            },
            "fnDrawCallback": function () {
                $('#tbl_vendorbalance tr td').each(function (index, item) {
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
        obj.Duefrom = FilterStartDate;
        obj.Dueto = FilterEndDate;
        obj.From = FilterStartDueDate;
        obj.To = FilterEndDueDate;
        obj.BillableAmt = $.trim($('#txt_Billamt').val());
        var _obj = {};
        _obj = { "Vendorbalance": obj };
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
                orderBy = "TOTALBILLABLEAMT " + direction;
                break;
            case 2:
                orderBy = "TOTALPAIDAMT " + direction;
                break;
            case 3:
                orderBy = "OVERDUEAMT " + direction;
                break;
            case 4:
                orderBy = "PAYABLEAMT " + direction;
                break;
            case 5:
                orderBy = "LASTPAYMENT " + direction;
                break;
            case 6:
                orderBy = "NEXTDUEIN " + direction;
                break;
            case 7:
                orderBy = "PAYMENTMWTHOD " + direction;
                break;
           
        }
        return orderBy;
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
    var RegisterDatepicker1 = function () {
        FilterStartDueDate = '01/01/2001';
        FilterEndDueDate = '01/01/2023';
        $('#Daterangepicker1').daterangepicker({
            startDate: moment(FilterStartDueDate),
            endDate: moment(FilterEndDueDate),
            ranges: {
                'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                'Today': [moment(), moment()],
                'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],


            }
        }, SetSwapDateRange);
        SetSwapDateRange(moment(FilterStartDueDate), moment(FilterEndDueDate));
        $('#Daterangepicker1').on('apply.daterangepicker', function (ev, picker) {
            FilterStartDueDate = moment(picker.startDate).format('MM/DD/YYYY');
            FilterEndDueDate = moment(picker.endDate).format('MM/DD/YYYY');
        });
    }
    function SetSwapDateRange(start, end) {
        if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
            && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
        ) {
            $('#Daterangepicker1 span').html('<span class="isc-label-question-s1"></span> Any Date');
        }
        else {
            $('#Daterangepicker1 span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
        }

    }
}
//Data Manipulation
{
    var GetVendorbalanceStatusData = function () {
        var tempList = {};
        $.when(RequestServer("VendorBalanceReport.aspx/GetVendorBalancetatusFiltersData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}
//Dom Manipulation
{
    //var BindMasterData = function () {
        
    //    BindDropDowns($('#dl_vendor'), $.parseJSON(VendorBalancetatuslst[0]["Table"]), 'Choose Vendor')
    //}
    var BindDropDowns = function () {

        var Vendorlst = common.AUF($.parseJSON(VendorBalancetatuslst[0]["Table"]));

        var VendorHtml = '<option value="0">Choose Vendor Name</option>';
        $.each(Vendorlst, function (index, item) {
            VendorHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_vendor').html(VendorHtml);
      
    }
}

$(document).on('click', '#Btn_serch', function (e) {
    BindVendorBalancList();
});
$(document).on('click', '#Btn_export', function (e) {
    ExportToExcel();
});
function ExportToExcel() {
    var html = document.querySelector("#tbl_vendorbalance").outerHTML;//your html table name
    common.export_table_to_csv(html, "Vendor_Balance_Report.csv");
}
$(document).on('click', '#btn_Reset', function (e) {
    $("#dl_vendor").val("0").change();
    $("#txt_Billamt").val("");
    BindVendorBalancList();
    RegisterDatepicker();
    RegisterDatepicker1();
});