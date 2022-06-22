
//Gloabal Variables
{
    var UnpaidBillStatuslst = [];
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
            UnpaidBillStatuslst = GetUnpaidbilltStatusData();
            BindUnpaidBillList();
           // BindMasterData();
            BindDropDowns();
            $loading.hide();
        }, 0);
    });
}
{
    var BindUnpaidBillList = function () {
        
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_UnpaidbillList').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "BillDueBasedReport.aspx/GetBillDueBasedReport",
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
                        html += '<h5 >' + (data["InvoiceNumber"] == null || data["InvoiceNumber"] == '' ? '-' : data["InvoiceNumber"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["InvoiceDate"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5  >' + (data["InvoiceDate"] == null ? '-' : moment(data["InvoiceDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5>' + (data["InvoiceDate"] == null ? '-' : moment(data["InvoiceDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var nextDue = moment.utc(data["DueDate"]).toDate();
                        var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                        var html = '';
                        html += '<div>';
                        html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                        html += '</div>';
                        return html;
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["Duedays"] == null || data["Duedays"] == '' ? '0' : data["Duedays"]) + '</h5>'
                        return html;
                    }
                }, 
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 >' + (data["OverDuedays"] == null || data["OverDuedays"] == '' ? '0' : data["OverDuedays"]) + '</h5>'
                        return html;
                    }
                },
                {
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="color:green;">' + (data["ApprovalStatus"] == null || data["ApprovalStatus"] == '' ? '-' : data["ApprovalStatus"]) + '</h5>'
                        return html;
                    }
                },
                {
                    
                    "width": '14%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="color:red;">' + (data["Paymentstatus"] == null || data["Paymentstatus"] == '' ? '-' : data["Paymentstatus"]) + '</h5>'
                        return html;
                    }
                },
                {
                    
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["Amount"] == null || Math.sign(parseFloat(data["Amount"])) == -1 ? '0.00' : parseFloat(data["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
               
            ],
            "drawCallback": function (settings) {
              
            },

            "fnDrawCallback": function () {
                $('#tbl_UnpaidbillList tr td').each(function (index, item) {
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
       
        var FilterStartDate1 = moment(FilterStartDate).format('YYYY/MM/DD');

        //var fromDate = new Date($(FilterStartDate).val());
        //var date = new Date(fromDate).toDateString("yyyy/MM/dd");

        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.Vendor = $.trim($('#dl_vendor').val());
        obj.Dueinday = $.trim($('#Due-date').val());
        obj.Duefrom = moment(FilterStartDate).format('YYYY/MM/DD');
        obj.Dueto = moment(FilterEndDate).format('YYYY/MM/DD');
        obj.From = moment(FilterStartDueDate).format('YYYY/MM/DD');
        obj.To = moment(FilterEndDueDate).format('YYYY/MM/DD');
        obj.Approvalstatus = $.trim($('#dl_apstatus').val());;
        obj.Paymentstatus = $.trim($('#dl_paymentstatus').val());;
        var _obj = {};
        _obj = { "Billdue": obj };
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
                orderBy = "InvoiceDate " + direction;
                break;
            case 3:
                orderBy = "DueDate " + direction;
                break;
            case 4:
                orderBy = "Duedays " + direction;
                break;
            case 5:
                orderBy = "OverDuedays " + direction;
                break;
            case 6:
                orderBy = "ApprovalStatus " + direction;
                break;
            case 7:
                orderBy = "Paymentstatus " + direction;
                break;
            case 8:
                orderBy = "Amount " + direction;
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
    var GetUnpaidbilltStatusData = function () {
        var tempList = {};
        $.when(RequestServer("BillDueBasedReport.aspx/GetUnpaidBillStatusFiltersData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}
//Dom Manipulation
{
    //var BindMasterData = function () {
    //    BindDropDowns($('#dl_vendor'), $.parseJSON(UnpaidBillStatuslst[0]["Table"]), 'Choose Vendor')
    //    BindDropDowns($('#dl_apstatus'), $.parseJSON(UnpaidBillStatuslst[1]["Table1"]), 'Choose Approval Status')
    //    BindDropDowns($('#dl_paymentstatus'), $.parseJSON(UnpaidBillStatuslst[2]["Table2"]), 'Choose Payment Status')
       
    //}
    var BindDropDowns = function () {

        var Vendorlst = common.AUF($.parseJSON(UnpaidBillStatuslst[0]["Table"]));

        var VendorHtml = '<option value="0">Choose Vendor Name</option>';
        $.each(Vendorlst, function (index, item) {
            VendorHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_vendor').html(VendorHtml);


        var apstatuslst = common.AUF($.parseJSON(UnpaidBillStatuslst[1]["Table1"]));
        var StatusHtml = '<option value="0">Choose Approval Status</option>';
        $.each(apstatuslst, function (index, item) {
            StatusHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_apstatus').html(StatusHtml);


        var Paymentstatuslst = common.AUF($.parseJSON(UnpaidBillStatuslst[2]["Table2"]));
        var PaymentstatusHtml = '<option value="0">Choose Payment Status</option>';
        $.each(Paymentstatuslst, function (index, item) {
            PaymentstatusHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#dl_paymentstatus').html(PaymentstatusHtml);
        
    }
}

$(document).on('click', '#Btn_serch', function (e) {
    BindUnpaidBillList();
});
$(document).on('click', '#Btn_export', function (e) {
    ExportToExcel();
});

function ExportToExcel() {
    
    var html = document.querySelector("#tbl_UnpaidbillList").outerHTML;//your html table name
    common.export_table_to_csv(html, "Unpaid Bills Report.csv");
}


$(document).on('click', '#btn_Reset', function (e) {
  
    $("#dl_vendor").val("0").change();
    $("#Due-date").val("");
    $("#dl_apstatus").val("0").change();
    $("#dl_paymentstatus").val("0").change();
    RegisterDatepicker();
    RegisterDatepicker1();
    BindUnpaidBillList();

});
