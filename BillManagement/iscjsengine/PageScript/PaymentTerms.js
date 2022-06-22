//Global Variables
{
    var deletePaymentTermsID = 0;
    var editPayment_ID = 0;
    var editPaymentData = [];
    var MasterData = [];
}
//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        BindInvoiceList();
        $loading.hide();
    });
}
//Save && Update
{
    var SavePayment = function () {
        var _obj = {
            'Payment_Code': $('#Payment_Code').val(),
            'Payment_Name': $('#Payment_Name').val(),
        }
        var insertObj = {
            'objPayment': _obj
        }
        $.when(RequestServer("PaymentTerms.aspx/SavePayment", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Payment created successfully!", { position: "right top", className: "success" });
                
            }
            else {
                $.notify("Server error occured while creating a Payment Terms !!", { position: "right top", className: "error" });
                GoBack()
            }
        });
    }
    var UpdatePayment = function () {
        var _obj = {
            'Payment_ID': parseInt(editPayment_ID),
            'Payment_Code': $('#Payment_Code').val(),
            'Payment_Name': $('#Payment_Name').val(),

        }
        var UpdateObj = {
            'objpayment': _obj
        }
        $.when(RequestServer("PaymentTerms.aspx/UpdatePayment", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Payment Updated successfully!", { position: "right top", className: "success" });
                
            }
            else {
                $.notify("Server error occured while creating a PaymentTerms !!", { position: "right top", className: "error" });
                GoBack()
            }
        });
    }
}
{
    var BindInvoiceList = function () {

        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_PaymentTerms').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "PaymentTerms.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['PaymentTermslst']);
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
                        html += '<h5 >' + (data["Payment_Code"] == null || data["Payment_Code"] == '' ? '-' : data["Payment_Code"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Payment_Name"] == null || data["Payment_Name"] == '' ? '-' : data["Payment_Name"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {

                        var html = '';
                        html += '<div style="text-align: center;">';

                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Payment=' + (data["Payment_ID"] == null ? '' : data["Payment_ID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Payment=' + (data["Payment_ID"] == null ? '' : data["Payment_ID"]) + '><i class="fa fa-trash-o"></i></a>';

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
                $('#Tbl_PaymentTerms tr td').each(function (index, item) {
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
        obj.Payment_Code = $('#txt-Code').val();
        obj.Payment_Name = $('#txt-Description').val();
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
                orderBy = "Payment_Code " + direction;
                break;
            case 1:
                orderBy = "Payment_Name " + direction;
                break;
        }
        return orderBy;
    }
}
var GetMasterData = function () {

    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("PaymentTerms.aspx/GetFilterData", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}

var ValidatePayment = function () {
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#Payment_Code').val());
    var description = $.trim($('#Payment_Name').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#Payment_Code-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#Payment_Name-Validation').show();
    }

    if (code != '') {
        var existingPayment = MasterData["ExistingPT"];
        if (existingPayment != null && existingPayment != undefined && existingPayment.length > 0) {
            if (editPayment_ID == 0) {
                var matchedPaymentRecord = GetmatchedRecord(existingPayment, 'Payment_Code', code);
                if (matchedPaymentRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedPayment = GetunmatchedRecord(existingPayment, 'Payment_ID', editPayment_ID);
                var matchedPaymentRecord = GetmatchedRecord(unMatchedPayment, 'Payment_Code', code);
                if (matchedPaymentRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
        }

    }
    return isvalid;

}
//getEdit
{
    var BindCreatePaymentScreen = function () {

        var createEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');

        if (createEmployeeEntity.length > 0) {
            $('#btn-Save').show();
        }
        else {
            $('#btn-Save').hide();
        }
        if (editPayment_ID != 0) {
            editPaymentData = GetEditPaymentData();
            BindEditPaymentDetails(editPaymentData["PaymentData"]);
        }
    }

    var BindEditPaymentDetails = function (PaymentData) {

        $('#Payment_Code').val(PaymentData[0]['Payment_Code'])
        $('#Payment_Name').val(PaymentData[0]['Payment_Name'])

        $('#P-Title').html('Update Payment');
        $('#btn-Save').hide();
        var updatePaymentEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updatePaymentEntity.length > 0) {
            $('#update-Payment').show();
        }
    }
    var GetEditPaymentData = function () {
        
        var _obj = {
            'Payment_ID': parseInt(editPayment_ID)
        };
        var tempList = {};
        $.when(RequestServer("PaymentTerms.aspx/GetEditPaymentData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

}

{

    var DeletePayment = function () {
        var obj = { 'Payment_ID': parseInt(deletePaymentTermsID) }
        var tempList = {};
        $.when(RequestServer("PaymentTerms.aspx/Deletepayment", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deletePaymentTermsID = 0;
                $.notify("Payment Terms deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Payment_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Payment Terms!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    {
        var GetEmployeeinfo = function () {

            var _obj = {
                'Payment_Id': parseInt(EmployeeId),
            };
            var tempList = {};
            $.when(RequestServer("PaymentTerms.aspx/GetPaymentScreenData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
}

//Click
{
    $(document).on('click', '[data-Edit-Payment]', function () {
       
        editPayment_ID = $(this).attr('data-Edit-Payment');
        if (editPayment_ID != null) {
            BindCreatePaymentScreen();
        }
        $('#mp_paid').show();
    });


    $(document).on('click', '[data-delete-Payment]', function () {
        deletePaymentTermsID = $(this).attr('data-delete-Payment');
        if (deletePaymentTermsID != null) {
            $('#mp_Payment_Delete').show();
        }
    });
    $(document).on('click', '#btn-Save', function () {
        
        if (ValidatePayment() && $("span[error-active='true']").length == 0) {
            SavePayment();
            location.reload();
        }

    });
    $(document).on('click', '#update-Payment', function () {

        if (ValidatePayment() && $("span[error-active='true']").length == 0) {
            UpdatePayment();
            location.reload();
        }

    });

    //$(document).on('click', '[data-delete-Payment]', function () {

    //    DeletePayment_ID = $(this).attr('data-Payment-Customer');
    //    var associatedCount = $(this).attr('data-AssociatedCount');
    //    var associatedProject = $(this).attr('data-Associate-project');
    //    var associatedBill = $(this).attr('data-delete-Invoice');
    //    if (parseInt(associatedCount) == 0 && parseInt(associatedProject) == 0 && parseInt(associatedBill) == 0) {
    //        if (DeletePayment_ID != null) {
    //            $('#mp_Customer_Delete').show();
    //        }
    //    }
    //});
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        //setTimeout(function () {
            DeletePayment();
            $loading.hide();
       // }, 0);
        location.reload();
    });
    $(document).on('click', '[delete-cancel]', function () {
        DeletePayment_ID = 0;
        $('#mp_Payment_Delete').hide();
        location.reload();
    })

    $(document).on('click', '#btn_search', function () {
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-Payment_Name').val('');
        BindInvoiceList();
    })

    $(document).on('click', '#btn-cancel', function () {
        $('#spn_filename').html('');
        $('#mp_paid').html('');
        location.reload();
    });
    $(document).on('click', '#btn_close', function () {
        $('#spn_filename').html('');
        $('#mp_paid').html('');
        location.reload();
    });
}