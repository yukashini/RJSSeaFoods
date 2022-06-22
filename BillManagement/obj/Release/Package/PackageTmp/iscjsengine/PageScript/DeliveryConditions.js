//Global Variables
{
    var deleteDeliveryConditionsID = 0;
    var editDelivery_ID = 0;
    var editDeliveryData = [];
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
    var SaveDelivery = function () {
        var _obj = {
            'Delivery_Code': $('#Delivery_Code').val(),
            'Delivery_Name': $('#Delivery_Name').val(),
        }
        var insertObj = {
            'objDelivery': _obj
        }
        $.when(RequestServer("DeliveryConditions.aspx/SaveDelivery", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Delivery created successfully!", { position: "right top", className: "success" });
              
            }
            else {
                $.notify("Server error occured while creating a Delivery Conditions !!", { position: "right top", className: "error" });
                GoBack()
            }
        });
    }
    var UpdateDelivery = function () {
        var _obj = {
            'Delivery_ID': parseInt(editDelivery_ID),
            'Delivery_Code': $('#Delivery_Code').val(),
            'Delivery_Name': $('#Delivery_Name').val(),

        }
        var UpdateObj = {
            'objDelivery': _obj
        }
        $.when(RequestServer("DeliveryConditions.aspx/UpdateDelivery", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Delivery Updated successfully!", { position: "right top", className: "success" });
               
            }
            else {
                $.notify("Server error occured while creating a DeliveryConditions !!", { position: "right top", className: "error" });
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
        $('#tbl_DeliveryConditions').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "DeliveryConditions.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['DeliveryConditionslst']);
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
                        html += '<h5 >' + (data["Delivery_Code"] == null || data["Delivery_Code"] == '' ? '-' : data["Delivery_Code"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Delivery_Name"] == null || data["Delivery_Name"] == '' ? '-' : data["Delivery_Name"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {

                        var html = '';
                        html += '<div style="text-align: center;">';

                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Delivery=' + (data["Delivery_ID"] == null ? '' : data["Delivery_ID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Delivery=' + (data["Delivery_ID"] == null ? '' : data["Delivery_ID"]) + '><i class="fa fa-trash-o"></i></a>';

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
                $('#tbl_DeliveryConditions tr td').each(function (index, item) {
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
        obj.Delivery_Code = $('#txt-Code').val();
        obj.Delivery_Name = $('#txt-Description').val();
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
                orderBy = "Delivery_Code " + direction;
                break;
            case 1:
                orderBy = "Delivery_Name " + direction;
                break;
        }
        return orderBy;
    }
}
var GetMasterData = function () {

    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("DeliveryConditions.aspx/GetFilterData", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}

var ValidateDelivery = function () {
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#Delivery_Code').val());
    var description = $.trim($('#Delivery_Name').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#Delivery_Code-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#Delivery_Name-Validation').show();
    }

    if (code != '') {
        var existingDelivery = MasterData["ExistingDeliveryConditions"];
        if (existingDelivery != null && existingDelivery != undefined && existingDelivery.length > 0) {
            if (editDelivery_ID == 0) {
                var matchedDeliveryRecord = GetmatchedRecord(existingDelivery, 'Delivery_Code', code);
                if (matchedDeliveryRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedDelivery = GetunmatchedRecord(existingDelivery, 'Delivery_ID', editDelivery_ID);
                var matchedDeliveryRecord = GetmatchedRecord(unMatchedDelivery, 'Delivery_Code', code);
                if (matchedDeliveryRecord.length > 0) {
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
    var BindCreateDeliveryScreen = function () {

        var createDeliveryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createDeliveryEntity.length > 0) {
            $('#btn-Save').show();
        }
        else {
            $('#btn-Save').hide();
        }
        
        if (editDelivery_ID != 0) {
            editDeliveryData = GetEditDeliveryData();
            BindEditDeliveryDetails(editDeliveryData["DeliveryData"]);
        }
    }

    var BindEditDeliveryDetails = function (DeliveryData) {

        $('#Delivery_Code').val(DeliveryData[0]['Delivery_Code'])
        $('#Delivery_Name').val(DeliveryData[0]['Delivery_Name'])

        $('P-Title').html('Update Delivery');
        $('#btn-Save').hide();
        var updateDeliveryEntity  = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateDeliveryEntity.length > 0) {
            $('#update-Delivery').show();
        }
    }
    var GetEditDeliveryData = function () {

        var _obj = {
            'Delivery_ID': parseInt(editDelivery_ID)
        };
        var tempList = {};
        $.when(RequestServer("DeliveryConditions.aspx/GetEditDeliveryData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

}

{

    var DeleteDelivery = function () {
        var obj = { 'Delivery_ID': parseInt(deleteDeliveryConditionsID) }
        var tempList = {};
        $.when(RequestServer("DeliveryConditions.aspx/DeleteDelivery", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteDeliveryConditionsID = 0;
                $.notify("Delivery Conditions deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Delivery_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Delivery Conditions!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    {
        var GetDeliveryinfo = function () {

            var _obj = {
                'Delivery_Id': parseInt(Delivery_Id),
            };
            var tempList = {};
            $.when(RequestServer("DeliveryConditions.aspx/GetDeliveryScreenData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
   
}

//Click
{
    $(document).on('click', '[data-Edit-Delivery]', function () {

        editDelivery_ID = $(this).attr('data-Edit-Delivery');
        if (editDelivery_ID != null) {
            BindCreateDeliveryScreen();
        }
        $('#mp_paid').show();
    });


    $(document).on('click', '[data-delete-Delivery]', function () {
        deleteDeliveryConditionsID = $(this).attr('data-delete-Delivery');
        if (deleteDeliveryConditionsID != null) {
            $('#mp_Delivery_Delete').show();
        }
    });
    $(document).on('click', '#btn-Save', function () {

        if (ValidateDelivery() && $("span[error-active='true']").length == 0) {
            SaveDelivery();
            location.reload();
        }

    });
    $(document).on('click', '#update-Delivery', function () {

        if (ValidateDelivery() && $("span[error-active='true']").length == 0) {
            UpdateDelivery();
            location.reload();
        }

    });

    
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        //setTimeout(function () {
        DeleteDelivery();
        $loading.hide();
        // }, 0);
        location.reload();
    });
    $(document).on('click', '[delete-cancel]', function () {
        DeleteDelivery_ID = 0;
        $('#mp_Delivery_Delete').hide();
        location.reload();
    })

    $(document).on('click', '#btn_search', function () {
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-Delivery_Name').val('');
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