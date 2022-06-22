//Gloabal Variables
{
    var PaymentStatuslst = [];
    var FilterStartDate = null;
    var FilterEndDate = null;
}
//Load & Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            RegisterDatepicker();
            $('.input-mini').mask('00/00/0000');
            $('#txt-DueRange').mask('00/00/0000 - 00/00/0000')
            document.getElementById("txt_Transaction").value = "";
            BindPaymentStatusReport();
            PaymentStatuslst = GetPaymentStatusData();
            BindDropDowns();
            $loading.hide();
        }, 0);
    });
}
    //BindBillList With Pagination

{
    var BindPaymentStatusReport = function () {
        
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl-PaymentStatus').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "PaymentStatusReport.aspx/GetPaymentStatusList",
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
                    "width": '25%',

                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["BillNo"] == null || data["BillNo"] == '' ? '-' : data["BillNo"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["TotalBillableAmount"] == null || Math.sign(parseFloat(data["TotalBillableAmount"])) == -1 ? '0.00' : parseFloat(data["TotalBillableAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["TotalPaid"] == null || Math.sign(parseFloat(data["TotalPaid"])) == -1 ? '0.00' : parseFloat(data["TotalPaid"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["Balance"] == null || Math.sign(parseFloat(data["Balance"])) == -1 ? '0.00' : parseFloat(data["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["TransactionId"] == null || data["TransactionId"] == '' ? '-' : data["TransactionId"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["PaidBy"] == null || data["PaidBy"] == '' ? '-' : data["PaidBy"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["PaidOn"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["PaidOn"] == null ? '-' : moment(data["PaidOn"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5>' + (data["PaidOn"] == null ? '-' : moment(data["PaidOn"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        return html;
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["PaymentMode"] == null || data["PaymentMode"] == '' ? '-' : data["PaymentMode"]) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["Status"] == null || data["Status"] == '' ? '-' : data["Status"]) + '</h5>'
                        return html;
                    }
                }
            ],
            
            "drawCallback": function (settings) {
                $('#tbl-PaymentStatus tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },

            "fnDrawCallback": function () {

                $('#tbl-PaymentStatus tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
                if (dataAllCount > 10) {
                    $('.dataTables_paginate').show();
                }
                else {
                    $('.dataTables_paginate').hide();
                }
            },
            'columnDefs': [{
                targets: 'no-sort', orderable: false
            }]

        });

    }
    var ConfigurePaginationModel = function (objModel) {
       
            var obj = {};
            obj.Start = objModel.start;
            obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.Vendor = $('select#dl_Vendor option:selected').val();
        obj.BillNo = $.trim($('#txt_BillNo').val());
        obj.TransactionId = $.trim($('#txt_Transaction').val());
        obj.PaidBy = $.trim($('#dl_PaidBy').val());
        obj.Fromdate = FilterStartDate;
        obj.Todate = FilterEndDate;
        obj.Mode = $.trim($('#dl_Mode').val());
        obj.Status = $.trim($('#dl_Status').val());
            var _obj = {};
        _obj = { "paymentStatus": obj };
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
                    orderBy = "BillNo " + direction;
                    break;
                case 2:
                    orderBy = "TotalBillableAmount " + direction;
                    break;
                case 3:
                    orderBy = "TotalPaid " + direction;
                    break;
                case 4:
                    orderBy = "Balance " + direction;
                    break;
                //case 5:
                //    orderBy = "StageName " + direction;
                //    break;
                case 5:
                    //orderBy = "BankTransferID " + direction;
                    orderBy = "TransactionId " + direction;
                    break;
                case 6:
                    orderBy = "PaidBy " + direction;
                    break;
                case 7:
                    orderBy = "PaidOn " + direction;
                    break;
                case 8:
                    orderBy = "PaymentMode " + direction;
                    break;
                case 9:
                    orderBy = "Status " + direction;
                    break;
               
            }
            return orderBy; 
        }

        var RegisterDatepicker = function () {
            FilterStartDate = '01/01/2001';
            FilterEndDate = '01/01/2023';
            $('#txt-DueRange').daterangepicker({
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
//Data Manipulation
{
    var GetPaymentStatusData = function () {
        //var _obj = {
        //    'kpiStatus': parseInt(KpiStatus)
        //};
        var tempList = {};
        $.when(RequestServer("PaymentStatusReport.aspx/GetPaymentStatusFiltersData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}
//Dom Manipulation
{
    var BindDropDowns = function () {
        
        var Vendorlst = common.AUF($.parseJSON(PaymentStatuslst[0]["Table"]));

        var VendorHtml = '<option value="0">Choose Vendor Name</option>';
        $.each(Vendorlst, function (index, item) {
            VendorHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_Vendor').html(VendorHtml);


        var Paidlst = common.AUF($.parseJSON(PaymentStatuslst[1]["Table1"]));
        var PaidHtml = '<option value="0">Choose Paid By</option>';
        $.each(Paidlst, function (index, item) {
            PaidHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_PaidBy').html(PaidHtml);


        var Modelst = common.AUF($.parseJSON(PaymentStatuslst[2]["Table2"]));
        var ModeHtml = '<option value="0">Choose Payment Mode</option>';
        $.each(Modelst, function (index, item) {
            ModeHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_Mode').html(ModeHtml);


        var Statuslst = common.AUF($.parseJSON(PaymentStatuslst[3]["Table3"]));
        var StatusHtml = '<option value="0">Choose Status</option>';
        $.each(Statuslst, function (index, item) {
            StatusHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_Status').html(StatusHtml);





        //var html = '';
        //if (DefaultItem != "") {
        //   // html += '<option value="0">' + DefaultItem + '</option>';
        //}
        //if (lst.length > 0) {
        //    var distinctlst = GetDistinctArray(lst, 'KeyListID');
        //    distinctlst = ObjSorter(distinctlst, "Value1", '123');

        //    $.each(distinctlst, function (index, item) {
        //        if ($.trim(item["Value1"]) != '') {
        //            html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
        //        }
        //    });
        //}
        //$el.html(html);
    }
}

$(document).on('click', '#Btn_serch', function (e) {
    BindPaymentStatusReport();
});

$(document).on('click', '#Btn_export', function (e) {
    ExportToExcel();
});
$(document).on('click', '#btn_Reset', function (e) {
   
    $("#dl_Vendor").val("0").change();
    $("#txt_BillNo").val("");
    $("#txt_Transaction").val("");
    $("#dl_PaidBy").val("0").change();
    $("#dl_Mode").val("0").change();
    $("#dl_Status").val("0").change();
    RegisterDatepicker();
    BindPaymentStatusReport();

});

function ExportToExcel() {
    var html = document.querySelector("#tbl-PaymentStatus").outerHTML;//your html table name
    common.export_table_to_csv(html, "PaymentStatus.csv");
}


    