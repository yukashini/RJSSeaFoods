//
{

    var strExcelData = [];
    var excelSaveData = [];
    var deleteEmplyoeeID = 0;
    var Employeeliastdata = [];
}
//Load && Events
{
    $(document).ready(function () {
        
        $loading.show();
        BindInvoiceList();
        Employeeliastdata = GetInvoiceData();
        BindKPI(Employeeliastdata);
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
        $('#Tbl_Employee').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "Employee.aspx/GetInvoicelst",
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
            'aoColumns': [

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Emp_Code"] == null || data["Emp_Code"] == '' ? '-' : data["Emp_Code"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Emp_First_Name"] == null || data["Emp_First_Name"] == '' ? '-' : data["Emp_First_Name"]) + '</h5>';
                        return html;
                    }
                },
                //{
                //    "width": '25%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = '';
                //        html += '<h5 >' + (data["Emp_Designation"] == null || data["Emp_Designation"] == '' ? '-' : data["Emp_Designation"]) + '</h5>';
                //        return html;
                //    }
                //},
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Emp_Email"] == null || data["Emp_Email"] == '' ? '-' : data["Emp_Email"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Emp_Address"] == null || data["Emp_Address"] == '' ? '-' : data["Emp_Address"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Emp_Mob_No"] == null || data["Emp_Mob_No"] == '' ? '-' : data["Emp_Mob_No"]) + '</h5>';
                        return html;
                    }
                },
                
               
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {

                        var html = '';
                        html += '<div style="text-align: center;">';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 btn_View" title="View" id="btn_View"  href="ViewEmployee360.aspx?Emp_Id=' + (data["Emp_Id"] == null ? '' : data["Emp_Id"]) + '"><i class="fa fa-eye"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  href="AddEmployee.aspx?Emp_Id=' + (data["Emp_Id"] == null ? '' : data["Emp_Id"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete"  data-delete-Employee=' + (data["Emp_Id"] == null ? '' : data["Emp_Id"]) + '"><i class="fa fa-trash-o"></i></a>';
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
                $('#Tbl_Employee tr td').each(function (index, item) {
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
        obj.EmployeeCode = $('#txt-EmployeeCode').val();
        obj.EmployeeFirstName = $('#txt-EmployeeFirstName').val();
        obj.Designation = $('#txt-Designation').val();
        obj.Adderss = $('#txt-address').val();
        obj.Contact_No = $('#txt-Contact_No').val();
       
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
                orderBy = "Emp_Id " + direction;
                break;             
            case 1:
                orderBy = "Emp_Code " + direction;
                break;
            case 2:
                orderBy = "Emp_First_Name " + direction;
                break;
            case 3: 
                orderBy = "Emp_Address " + direction;
                break;
            case 4:
                orderBy = "Emp_Mob_No " + direction;
                break;
           

        }
        return orderBy;
    }
}

{
    var SaveExcelData = function (exelList) {

        var _obj = {
            'Emplst': exelList,
        };

        var tempList = {};
        $.when(RequestServer("Employeelist.aspx/InsertEmployeeExcelData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

            if (parseInt(response) > 0) {
                $('#browse-Employee').val('');
                strExcelData = [];
                excelSaveData = [];
                $('#spn_filename').html('');
                $('#tbl_Emplst').html('');

                $.notify("Employee imported successfully!!", { position: "right top", className: "success" });
                $('#spn_filename').html('');
                $('#tbl_Emplst').html('');
                setTimeout(function () {
                    window.location.href = 'Employee.aspx';
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

        var importTemplateFiles = $('#browse-employee').prop("files");
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
                        url: "EmployeeImport.ashx",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            if (result != '' && result != null && result.length != 0) {
                                $('#browse-Employee').val("");
                                strExcelData = result;
                                strExcelData = $.parseJSON(strExcelData[""]);
                                BindExcelData();
                                // $('#mp_bill-view').show();
                            }
                            else {
                                $('#browse-Employee').val("");

                            }
                        },
                        error: function (e) {
                            $('#browse-Employee').val("");
                            var error = e;
                        },
                        xhr: function (evt) {
                            $('#browse-Employee').val("");
                            var filexhr = $.ajaxSettings.xhr();
                            return filexhr;
                        }
                    }).done(function (r) {
                        $('#browse-Employee').val("");
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
        var $el = $('#tbl_Emplst');


        if (strExcelData.length > 0) {
            $.each(strExcelData, function (index, item) {

                if ((item["EmployeeCode"] != "" && item["Email"] != "")) {

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



    var GetInvoiceData = function () {
          var tempList = {};
        $.when(RequestServer("Employee.aspx/GetInvoiceData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindKPI = function (Employeelistdata) {
     
        var AllEmployee = [];
        var ActiveEmployee = [];
        var InactiveEmployee = [];

        AllEmployee = common.AUF($.parseJSON(Employeelistdata[0]["Table"]));
        ActiveEmployee = common.AUF($.parseJSON(Employeelistdata[1]["Table1"]));
        InactiveEmployee = common.AUF($.parseJSON(Employeelistdata[2]["Table2"]));

        if (AllEmployee.length > 0) {
            $('#All-Employee-count').html(AllEmployee[0]["totalcount"] == null || AllEmployee[0]["totalcount"] == -1 ? 0 : AllEmployee[0]["totalcount"]);
            $('#all-total-Count').html(AllEmployee[0]["totalcount"] == null || AllEmployee[0]["totalcount"] == -1 ? 0 : AllEmployee[0]["totalcount"]);
        }
        else {
            $('#All-Employee-count').html("0");
        }
        if (ActiveEmployee.length > 0) {
            $('#active').html(ActiveEmployee[0]["ActiveEmp"] == null || ActiveEmployee[0]["ActiveEmp"] == -1 ? 0 : ActiveEmployee[0]["ActiveEmp"]);
            $('#active-Count').html(ActiveEmployee[0]["ActiveEmp"] == null || ActiveEmployee[0]["ActiveEmp"] == -1 ? 0 : ActiveEmployee[0]["ActiveEmp"]);
        }
        else {
            $('#released-Amount').html("0");
        }
        if (InactiveEmployee.length > 0) {
            $('#In-active').html(InactiveEmployee[0]["In-activeEmp"] == null || InactiveEmployee[0]["In-activeEmp"] == -1 ? 0 : InactiveEmployee[0]["In-activeEmp"]);
            $('#inactive-Count').html(InactiveEmployee[0]["In-activeEmp"] == null || InactiveEmployee[0]["In-activeEmp"] == -1 ? 0 : InactiveEmployee[0]["In-activeEmp"]);
        }
        else {
            $('#In-active').html("0");
        }
    }


//Click
//{
//    $(document).on('change', '#browse-customer', function (e) {

//        e.preventDefault();
//        ProcessExcelData();

//    });

//    $(document).on('click', '#btn-Save-ExcelData', function () {

//        if (excelSaveData.length > 0) {
//            SaveExcelData(excelSaveData);
//        }
//        else {
//            $.notify("Please add the Customer for upload!!", { position: "right top", className: "error" });
//        }
//    });

    $(document).on('click', '[data-delete-Employee]', function () {
            deleteEmployeeID = $(this).attr('data-delete-Employee');
        if (deleteEmployeeID != null) {
            $('#mp_Employee_Delete').show();
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {

        $loading.show();
        //setTimeout(function () {
            DeleteEmployee();
            $loading.hide();
        //}, 0);
    });

    $(document).on('click', '[delete-cancel]', function () {
        deleteEmployeeID = 0;
        $('#mp_Employee_Delete').hide();
    })

    //$(document).on('click', '#btn_search', function () {
    //    BindInvoiceList();
    //});

    //$(document).on('click', '#btn_reset', function () {
    //    $('#txt-CustomerName').val('');
    //    $('#txt-balance').val('');
    //    $('#txt-totalamount').val('');
    //    BindInvoiceList();
    //})

    //$(document).on('click', '#btn-cancel', function () {
    //    $('#spn_filename').html('');
    //    $('#tbl_Customerlst').html('');
    //});
    //$(document).on('click', '#btn_close', function () {
    //    $('#spn_filename').html('');
    //    $('#tbl_Customerlst').html('');
    //});
    var DeleteEmployee = function () {
        var obj = {
            'EmployeeID': parseInt(deleteEmployeeID)
        }
        var tempList = {};
        $.when(RequestServer("AddEmployee.aspx/DeleteEmployee", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteEmplyoeeID = 0;
                $.notify("Employee deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Employee_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Employee!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}