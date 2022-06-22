//Global Variables
{
    var deleteCustomerID = 0;
    var strExcelData = [];
    var excelSaveData = [];
    var CustomerList = [];
}

//Load And Events
{
    $(document).ready(function () {
        BindEmployeeListScreen();
    });

    $(document).on('click', '#Btn_serch', function () {
        BindCustomers();
    });

    $(document).on('click', '#btn_Reset', function () {
        $('#txt-CustomerName').val('');
        $('#txt-Expenses').val('');
        $('#txt-AssociatedProject').val('');
        $('#txt-AssociatedBills').val('');
        BindCustomers();
    })

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
}

//Dom Manipulation
{

    var SaveExcelData = function (exelList) {

        var _obj = {
            'Emplists': exelList,
        };

        var tempList = {};
        $.when(RequestServer("EmployeeList.aspx/InsertCustomerExcelData", _obj)).done(function (response) {
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
                    window.location.href = 'CustomersList.aspx';
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
    var BindCustomerListScreen = function () {
        var masterData = GetMasterData();
        //BindDropDowns($('#slt-Customer'), masterData["Customers"], "Choose Customer Name");
        //BindDropDowns($('#slt-Projects'), masterData["Projects"], "Choose Project");
        BindCustomers();

        var createCustomerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        var createCustomerViewEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3032');
        if (createCustomerEntity.length > 0) {
            $('#createCustomer').show();
        }
        else {
            $('#createCustomer').hide();
        }
        if (createCustomerViewEntity.length > 0) {
            $('.btn_View').show();
        }
        else {
            $('.btn_View').hide();
        }
    }

    var BindCustomers = function () {
        var dataAllCount = 0;
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-Emplst').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "EmployeeList.aspx/GetEmployeeDataList",
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
                    json.data = common.AUF(objData['Emplst']);
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
            "aoColumnDefs": [
                {
                    "bSortable": false,
                    "aTargets": [-1]
                }
            ],
            'aoColumns': [
                {
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += (data["CustomerName"] == null ? '-' : data["CustomerName"]);
                        return html;
                    }
                },
                {
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["CustomerAddress"] == null ? '' : data["CustomerAddress"]);
                        return html;
                    }
                },
                {
                    "width": '16.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["Email"] == null ? '' : data["Email"])
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var amount = (data["Expenses"] == null ? 0.00 : parseFloat(data["Expenses"]));
                        var html = (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["AssociatedProjects"] == null ? '' : data["AssociatedProjects"])
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["AssociatedBills"] == null ? '' : data["AssociatedBills"])
                        return html;
                    }
                },
                {
                    "width": '10%',

                    "mData": function (data, type, dataToSet) {
                        var updateEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
                        var deleteEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3025');
                        //var GLDeleteEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3021');
                        var html = '';
                        html += '<div style="text-align: center;">';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 btn_View" title="View" id="btn_View"  href="ViewEmployee.aspx?EmployeeID=' + (data["EmployeeID"] == null ? '' : data["CustomerID"]) + '"><i class="fa fa-eye"></i></a>';
                        // if (GLDeleteEntity != null && GLDeleteEntity != undefined && GLDeleteEntity.length > 0) {
                        if (updateCustomerEntity.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  href="AddCustomer.aspx?CustomerID=' + (data["CustomerID"] == null ? '' : data["CustomerID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                        }
                        if (deleteCustomerEntity.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-Associate-project=' + (data["AssociatedProjects"] == null ? '' : data["AssociatedProjects"]) + ' data-AssociatedCount=' + (data["AssociatedCounts"] == null ? '' : data["AssociatedCounts"]) + ' data-delete-Customer=' + (data["CustomerID"] == null ? '' : data["CustomerID"]) + '><i class="fa fa-trash-o"></i></a>';
                        }

                        //}
                        html += '</div>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
                $('#tbl-Customers tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },
            "fnDrawCallback": function () {
                $('#tbl-Customers tr td').each(function (index, item) {
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
        obj.CustomerName = $('#txt-CustomerName').val();
        obj.Expense = ($('#txt-Expenses').val() == '' ? 0.00 : $('#txt-Expenses').val());
        obj.AssociatedProject = ($('#txt-AssociatedProject').val() == '' ? 0 : $('#txt-AssociatedProject').val());
        obj.AssociatedBill = ($('#txt-AssociatedBills').val() == '' ? 0 : $('#txt-AssociatedBills').val());
        var _obj = {};
        _obj = { "customerDataFilter": obj };
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
                orderBy = "CustomerAddress " + direction;
                break;
            case 2:
                orderBy = "Email " + direction;
                break;
            case 3:
                orderBy = "Expenses " + direction;
                break;
            case 4:
                orderBy = "AssociatedProjects " + direction;
                break;
            case 5:
                orderBy = "AssociatedBills " + direction;
                break;


        }
        return orderBy;
    }
}

//Data Manipulation
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("CustomersList.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
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
                BindCustomers();
            }
            else {
                $.notify("Server error occured while deleting a Customer!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}

//Common
{
    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');

            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

            });
        }
        $el.html(html);
    }
}
$('a#Download-lst').attr({
    target: '_blank',
    href: 'https://arcbill-qa.archarina.com/images/CustomerList.xlsx'
});
$(document).on('click', '#btn-cancel', function () {
    $('#spn_filename').html('');
    $('#tbl_Customerlst').html('');
});
$(document).on('click', '#btn_close', function () {
    $('#spn_filename').html('');
    $('#tbl_Customerlst').html('');
});

