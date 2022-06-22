//Global Variables
{
    var deleteDesignationID = 0;
    var editDesignationID = 0;
    var editDesignationData = [];
    MasterData = [];
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
    var SaveDesignation = function () {
        var _obj = {
            'DesignationCode': $('#DesignationCode').val(),
            'DesignationName': $('#DesignationName').val(),
        }
        var insertObj = {
            'objDesignation': _obj
        }
        $.when(RequestServer("Designation.aspx/SaveDesignation", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Designation created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Designation !!", { position: "right top", className: "error" });
            }
        });
    }
    var UpdateDesignation = function () {
        var _obj = {
            'DesignationID': parseInt(editDesignationID),
            'DesignationCode': $('#DesignationCode').val(),
            'DesignationName': $('#DesignationName').val(),

        }
        var UpdateObj = {
            'objDesignation': _obj
        }
        $.when(RequestServer("Designation.aspx/UpdateDesignation", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Designation Updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Designation!!", { position: "right top", className: "error" });
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
        $('#tbl_Designation').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
             "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "Designation.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['Designationlst']);
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
                        html += '<h5 >' + (data["DesignationCode"] == null || data["DesignationCode"] == '' ? '-' : data["DesignationCode"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["DesignationName"] == null || data["DesignationName"] == '' ? '-' : data["DesignationName"]) + '</h5>';
                        return html;
                    }
                },
          
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                      
                        var html = '';
                        html += '<div style="text-align: center;">';
                        
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Designation=' + (data["DesignationID"] == null ? '' : data["DesignationID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Designation=' + (data["DesignationID"] == null ? '' : data["DesignationID"]) + '><i class="fa fa-trash-o"></i></a>';
                       
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
                $('#tbl_Designation tr td').each(function (index, item) {
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
        obj.DesignationCode = $('#txt-Code').val();
        obj.DesignationName = $('#txt-Description').val();
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
                orderBy = "DesignationCode " + direction;
                break;
            case 1:
                orderBy = "DesignationName " + direction;
                break;
         }
        return orderBy;
    }
}
var GetMasterData = function () {

    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("Designation.aspx/GetFilterData", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}


var ValidateDesignation = function () {
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#DesignationCode').val());
    var description = $.trim($('#DesignationName').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#DesignationCode-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#DesignationName-Validation').show();
    }

    if (code != '') {
        var existingDesignation = MasterData["ExistingDesignation"];
        if (existingDesignation != null && existingDesignation != undefined && existingDesignation.length > 0) {
            if (editDesignationID == 0) {
                var matchedDesignationRecord = GetmatchedRecord(existingDesignation, 'DesignationCode', code);
                if (matchedDesignationRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedDesignation = GetunmatchedRecord(existingDesignation, 'DesignationID', editDesignationID);
                var matchedDesignationRecord = GetmatchedRecord(unMatchedDesignation, 'DesignationCode', code);
                if (matchedDesignationRecord.length > 0) {
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
    var BindCreateDesignationScreen = function () {

        var createEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createEmployeeEntity.length > 0) {
            $('#btn-Save').show();
        }
        else {
            $('#btn-Save').hide();
        }
        if (editDesignationID != 0) {
            editDesignationData = GetEditDesignationData();
            BindEditDesignationDetails(editDesignationData["DesignationData"]);
        }
    }

    var BindEditDesignationDetails = function (DesignationData) {

        $('#DesignationCode').val(DesignationData[0]['DesignationCode'])
        $('#DesignationName').val(DesignationData[0]['DesignationName'])

        $('P-Title').html('Update Designation');
        $('#btn-Save').hide();
        var updateDesignationEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateDesignationEntity.length > 0) {
            $('#update-Designation').show();
        }
    }
    var GetEditDesignationData = function () {
        var _obj = {
            'DesignationID': parseInt(editDesignationID)
        };
        var tempList = {};
        $.when(RequestServer("Designation.aspx/GetEditDesignationData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

}

{

    var DeleteDesignation = function () {
        var obj = { 'DesignationID': parseInt(deleteDesignationID) }
            var tempList = {};
        $.when(RequestServer("Designation.aspx/DeleteDesignation", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    deleteDesignationID = 0;
                    $.notify("Designation deleted successfully!!", { position: "right top", className: "success" });
                    $('#mp_Designation_Delete').hide();
                    BindInvoiceList();
                }
                else {
                    $.notify("Server error occured while deleting a Designation!!", { position: "right top", className: "error" });
                }
            });
            return tempList;
        }
    {
        var GetDesignationinfo = function () {

            var _obj = {
                'DesignationId': parseInt(EmployeeId),
            };
            var tempList = {};
            $.when(RequestServer("Designation.aspx/GetDesignationScreenData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
}

  //Click
{
    $(document).on('click', '[data-Edit-Designation]', function () {

        editDesignationID = $(this).attr('data-Edit-Designation');
        if (editDesignationID != null) {
            BindCreateDesignationScreen();
        }
        $('#mp_paid').show();
    });


    $(document).on('click', '[data-delete-Designation]', function () {
    deleteDesignationID = $(this).attr('data-delete-Designation');
        if (deleteDesignationID != null) {
            $('#mp_Designation_Delete').show();
    } 
});
    $(document).on('click', '#btn-Save', function () {
        if (ValidateDesignation() && $("span[error-active='true']").length == 0) {
            SaveDesignation();
        }

    });

    $(document).on('click', '#update-Designation', function () {
        
        if (ValidateDesignation() && $("span[error-active='true']").length == 0) {
            UpdateDesignation();
        }

    });

    $(document).on('click', '[data-delete-Designation]', function () {
        
        DeleteDesignationID = $(this).attr('data-delete-Customer');
        var associatedCount = $(this).attr('data-AssociatedCount');
        var associatedProject = $(this).attr('data-Associate-project');
        var associatedBill = $(this).attr('data-delete-Invoice');
        if (parseInt(associatedCount) == 0 && parseInt(associatedProject) == 0 && parseInt(associatedBill)==0) {
            if (DeleteLoadingID != null) {
                $('#mp_Designation_Delete').show();
            }
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteDesignation();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[delete-cancel]', function () {
        DeleteLoadingID = 0;
        $('#mp_Designation_Delete').hide();
    });

    $(document).on('click', '#btn_search', function () {
      
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('txt-Code').val('');
        $('#txt-Description').val('');
        BindInvoiceList();
    });

    $(document).on('click', '#btn-cancel', function () {
        $('#spn_filename').html('');
        $('#mp_paid').html('');
    });

    $(document).on('click', '#btn_close', function () {
        $('#spn_filename').html('');
        $('#mp_paid').html('');
    });
}