//
{

    var strExcelData = [];
    var excelSaveData = [];
    var deleteCustomerID = 0;
    var Invoiceliastdata = [];
}
//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        BindInvoiceList();
        Invoiceliastdata = GetInvoiceData();
        BindKPI(Invoiceliastdata);
        $loading.hide();
    });
}
//
{
    var BindInvoiceList = function () {
        
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_Invoicelist').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "InvoiceCustomer360.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['Customerlst']);
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
                        html += '<h5 >' + (data["CustomerName"] == null || data["CustomerName"] == '' ? '-' : data["CustomerName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["NextDueDate"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5 style="text-align:left"  >' + (data["NextDueDate"] == null ? '-' : moment(data["NextDueDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5 style="text-align:left; color:red;" >' + (data["NextDueDate"] == null ? '-' : moment(data["NextDueDate"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amount = (data["NextDueAmount"] == null ? 0.00 : parseFloat(data["NextDueAmount"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amount = (data["Balance"] == null ? 0.00 : parseFloat(data["Balance"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        // var amount = data["Amount"].replace(/,/g, '');
                        var amount = (data["Totalamtreceved"] == null ? 0.00 : parseFloat(data["Totalamtreceved"]));
                        var html = '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["LastPayment"]);
                        if (moment(today) <= dueDay) {
                            html += '<h5 style="text-align:left" >' + (data["LastPayment"] == null ? '-' : moment(data["LastPayment"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        else {
                            html += '<h5 style="text-align:left">' + (data["LastPayment"] == null ? '-' : moment(data["LastPayment"]).format('MM/DD/YYYY')) + '</h5>';
                        }
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                      
                        var html = '';
                        html += '<div style="text-align: center;">';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 btn_View" title="View" id="btn_View"  href="ViewCustomer360.aspx?CustomerID=' + (data["Customerid"] == null ? '' : data["Customerid"]) + '"><i class="fa fa-eye"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  href="AddCustomer.aspx?CustomerID=' + (data["Customerid"] == null ? '' : data["Customerid"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-Associate-project=' + (data["AssociatedProjects"] == null ? '' : data["AssociatedProjects"]) + ' data-AssociatedCount=' + (data["AssociatedCounts"] == null ? '' : data["AssociatedCounts"]) + ' data-delete-Customer=' + (data["Customerid"] == null ? '' : data["Customerid"]) + ' data-delete-Invoice=' + (data["AssociatedInvoice"] == null ? '' : data["AssociatedInvoice"]) + '><i class="fa fa-trash-o"></i></a>';
                        html += '</div>';
                        return html;

                        html += '</div>';
                        return html;
                    }
                },


            ],
            "drawCallback": function (settings) {

            },

            "fnDrawCallback": function () {
                $('#tbl_Invoicelist tr td').each(function (index, item) {
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
        obj.Customername = $('#txt-CustomerName').val();
        obj.Balance = $('#txt-balance').val();
        obj.Totalamont = $('#txt-totalamount').val();

        //obj.Vendor = $.trim($('#dl_vendor').val());
        //obj.Dueinday = $.trim($('#Due-date').val());
        //obj.Duefrom = moment(FilterStartDate).format('YYYY/MM/DD');
        //obj.Dueto = moment(FilterEndDate).format('YYYY/MM/DD');
        //obj.From = moment(FilterStartDueDate).format('YYYY/MM/DD');
        //obj.To = moment(FilterEndDueDate).format('YYYY/MM/DD');
        //obj.Approvalstatus = $.trim($('#dl_apstatus').val());;
        //obj.Paymentstatus = $.trim($('#dl_paymentstatus').val());;
        var _obj = {};
        _obj = { "list": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {

        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "CustomerName " + direction;
                break;
            case 1:
                orderBy = "NextDueDate " + direction;
                break;
            case 2:
                orderBy = "NextDueAmount " + direction;
                break;
            case 3:
                orderBy = "Balance " + direction;
                break;
            case 4:
                orderBy = "Totalamtreceved " + direction;
                break;
            case 5:
                orderBy = "LastPayment " + direction;
                break;

        }
        return orderBy;
    }
}
//
{
    var SaveExcelData = function (exelList) {

        var _obj = {
            'customerlists': exelList,
        };

        var tempList = {};
        $.when(RequestServer("CustomerList.aspx/InsertCustomerExcelData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

            if (parseInt(response) > 0) {
                $('#browse-customer').val('');
                strExcelData = [];
                excelSaveData = [];
                $('#spn_filename').html('');
                $('#tbl_Customerlst').html('');

                $.notify("Customer imported successfully!!", { position: "right top", className: "success" });
                $('#spn_filename').html('');
                $('#tbl_Customerlst').html('');
                setTimeout(function () {
                    window.location.href = 'InvoiceCustomer360.aspx';
                }, 2000);
            }
            else {
                distinctlst = [];
                $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    var ProcessExcelData = function () {

        var importTemplateFiles = $('#browse-customer').prop("files");
        var fileName = importTemplateFiles[0]['name'];
        var type = importTemplateFiles[0]["type"];

        if (importTemplateFiles.length > 0) {
            if (type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                $('#spn_filename').html(fileName);

                var data = new FormData();
                data.append("Folder", 0);
                data.append("key", importTemplateFiles[0]);
                {
                    $.ajax({
                        type: "POST",
                        url: "CustomerImport.ashx",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            if (result != '' && result != null && result.length != 0) {
                                $('#browse-customer').val("");
                                strExcelData = result;
                                strExcelData = $.parseJSON(strExcelData[""]);
                                BindExcelData();
                                // $('#mp_bill-view').show();
                            }
                            else {
                                $('#browse-customer').val("");

                            }
                        },
                        error: function (e) {
                            $('#browse-customer').val("");
                            var error = e;
                        },
                        xhr: function (evt) {
                            $('#browse-customer').val("");
                            var filexhr = $.ajaxSettings.xhr();
                            return filexhr;
                        }
                    }).done(function (r) {
                        $('#browse-customer').val("");
                    });
                }

            }
            else {

            }
        }
        return strExcelData;
    }

    var BindExcelData = function () {

        isValidData = true;
        excelSaveData = [];
        var html = '';
        var uniqueSites = [];
        var $el = $('#tbl_Customerlst');


        if (strExcelData.length > 0) {
            $.each(strExcelData, function (index, item) {

                if ((item["CustomerName"] != "" && item["Email"] != "")) {

                    var obj = {
                        'CustomerName': (item["CustomerName"] == null || '' ? 0 : item["CustomerName"]),
                        'Address': (item["Address"] == null || '' ? '' : item["Address"]),
                        'Email': (item["Email"] == null ? '' : item["Email"]),
                        'ClientId': (item["ClientId"] == null ? '' : item["ClientId"]),
                    }
                    excelSaveData.push(obj);

                    html += '<tr>'
                    html += '<td style="text-align:left;" title="' + (item["CustomerName"] == null ? '' : item["CustomerName"]) + '"><h5>' + (item["CustomerName"] == null ? '-' : item["CustomerName"]) + '</h5></td>'
                    html += '<td style="text-align:left; title="' + (item["Address"] == null ? '' : item["Address"]) + '"><h5>' + (item["Address"] == null ? '-' : item["Address"]) + '</h5></td>'
                    html += '<td style="text-align:left; title="' + (item["Email"] == null ? '' : item["Email"]) + '"><h5>' + (item["Email"] == null ? '-' : item["Email"]) + '</h5></td>'
                    html += '</tr>'
                }

            })
        }
        else {
            html += '<tr><td colspan="4" style="text-align: center;">No Data Found</td></tr>';
        }
        $el.html(html);
    }

    var DeleteCustomer = function () {
        var obj = {
            'DeleteCustomerId': parseInt(deleteCustomerID)
        }
        var tempList = {};
        $.when(RequestServer("CustomersList.aspx/DeleteCustomer", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteCustomerID = 0;
                $.notify("Customer deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Customer_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Customer!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var GetInvoiceData = function () {
     
        var tempList = {};
        $.when(RequestServer("InvoiceCustomer360.aspx/GetInvoiceData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindKPI = function (Invoiceliastdata) {
        
        var Allinvoice = [];
        var ReleasedInvoice = [];
        var PaidInvoice = [];
        var DueInvoice = [];
        Allinvoice = common.AUF($.parseJSON(Invoiceliastdata[0]["Table"]));
        ReleasedInvoice = common.AUF($.parseJSON(Invoiceliastdata[1]["Table1"]));
        PaidInvoice = common.AUF($.parseJSON(Invoiceliastdata[2]["Table2"]));
        DueInvoice = common.AUF($.parseJSON(Invoiceliastdata[3]["Table3"]));
        if (Allinvoice.length > 0) {
            $('#All-invoice-amount').html(('$' + Allinvoice[0]["Amount"] == null || Math.sign(parseFloat(Allinvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(Allinvoice[0]["Amount"]).toFixed(2))));
            $('#all-Submitted-Count').html(Allinvoice[0]["Invoice"])
            $('#all-Week-Count').html(Allinvoice[0]["Currentweekdata"])
        }
        else {
            $('#All-invoice-amount').html("0");
        }
        if (ReleasedInvoice.length > 0) {
            $('#released-Amount').html((ReleasedInvoice[0]["Amount"] == null || Math.sign(parseFloat(ReleasedInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(ReleasedInvoice[0]["Amount"]).toFixed(2))));
            $('#released-Count').html(ReleasedInvoice[0]["Invoice"])
            $('#total-Week-Count').html(ReleasedInvoice[0]["ReleseCurrentweekdata"])
        }
        else {
            $('#released-Amount').html("0");
        }
        if (PaidInvoice.length > 0) {
            $('#paid-Amount').html(('$' + PaidInvoice[0]["Amount"] == null || Math.sign(parseFloat(PaidInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(PaidInvoice[0]["Amount"]).toFixed(2))));
            $('#paid-Count').html(PaidInvoice[0]["Invoice"])
            $('#rejected-Week-Count').html(PaidInvoice[0]["PaidCurrentweekdata"])
        }
        else {
            $('#paid-Amount').html("0");
        }
        if (DueInvoice.length > 0) {
            $('#oerdue-Amount').html((DueInvoice[0]["Amount"] == null || Math.sign(parseFloat(DueInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(DueInvoice[0]["Amount"]).toFixed(2))));
            $('#overdue-Count').html(DueInvoice[0]["Invoice"])
            $('#un-Approved-Week-Count').html(DueInvoice[0]["Invoice"])
        }
        else {
            $('#oerdue-Amount').html("0");
        }
    }
}

//Click
{
    $(document).on('change', '#browse-customer', function (e) {

        e.preventDefault();
        ProcessExcelData();

    });

    $(document).on('click', '#btn-Save-ExcelData', function () {

        if (excelSaveData.length > 0) {
            SaveExcelData(excelSaveData);
        }
        else {
            $.notify("Please add the Customer for upload!!", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '[data-delete-Customer]', function () {
        
        deleteCustomerID = $(this).attr('data-delete-Customer');
        var associatedCount = $(this).attr('data-AssociatedCount');
        var associatedProject = $(this).attr('data-Associate-project');
        var associatedBill = $(this).attr('data-delete-Invoice');
        if (parseInt(associatedCount) == 0 && parseInt(associatedProject) == 0 && parseInt(associatedBill)==0) {
            if (deleteCustomerID != null) {
                $('#mp_Customer_Delete').show();
            }
        }

        else if (parseInt(associatedProject) > 0 && parseInt(associatedCount) > 0) {
            $.notify("Customer associated with Bill(s) and Project(s),So not able to delete this customer", { position: "right top", className: "error" });
        }
        else if (parseInt(associatedCount) > 0) {
            $.notify("Customer associated with Bill(s),So not able to delete this customer", { position: "right top", className: "error" });
        }
        else if (parseInt(associatedProject) > 0) {
            $.notify("Customer associated with Project(s),So not able to delete this customer", { position: "right top", className: "error" });
        }
        else if (parseInt(associatedBill) > 0) {
            $.notify("Customer associated with Invoice(s),So not able to delete this customer", { position: "right top", className: "error" });
        }
    });
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteCustomer();
            $loading.hide();
        }, 0);
    });
    $(document).on('click', '[delete-cancel]', function () {
        deleteCustomerID = 0;
        $('#mp_Customer_Delete').hide();
    })

    $(document).on('click', '#btn_search', function () {
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-CustomerName').val('');
        $('#txt-balance').val('');
        $('#txt-totalamount').val('');
        BindInvoiceList();
    })

    $(document).on('click', '#btn-cancel', function () {
        $('#spn_filename').html('');
        $('#tbl_Customerlst').html('');
    });
    $(document).on('click', '#btn_close', function () {
        $('#spn_filename').html('');
        $('#tbl_Customerlst').html('');
    });
}