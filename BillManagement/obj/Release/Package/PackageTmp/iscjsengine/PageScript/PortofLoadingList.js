//Global Variables
{
    var deletePortofLoadingListID = 0;
    var editLoadingID = 0;
    var editLoadingData = [];
    var MasterData=[];
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
    var SaveLoading = function () {
        
        var _obj = {
            'LoadingCode': $('#LoadingCode').val(),
            'LoadingName': $('#LoadingName').val(),
        }
        var insertObj = {
            'objLoading': _obj
        }
        $.when(RequestServer("PortofLoadingList.aspx/SaveLoading", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Loading created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Port of Loading !!", { position: "right top", className: "error" });
            }
        });
    }
    var UpdateLoading = function () {
        var _obj = {
            'LoadingID': parseInt(editLoadingID),
            'LoadingCode': $('#LoadingCode').val(),
            'LoadingName': $('#LoadingName').val(),

        }
        var UpdateObj = {
            'objLoading': _obj
        }
        $.when(RequestServer("PortofLoadingList.aspx/UpdateLoading", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Loading Updated successfully!", { position: "right top", className: "success" });

            }
            else {
                $.notify("Server error occured while creating a Port of Loading !!", { position: "right top", className: "error" });
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
        $('#Tbl_PortofLoadingList').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "PortofLoadingList.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['portofLoadinglst']);
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
                        html += '<h5 >' + (data["LoadingCode"] == null || data["LoadingCode"] == '' ? '-' : data["LoadingCode"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["LoadingName"] == null || data["LoadingName"] == '' ? '-' : data["LoadingName"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {

                        var html = '';
                        html += '<div style="text-align: center;">';

                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Loading=' + (data["LoadingID"] == null ? '' : data["LoadingID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Loading=' + (data["LoadingID"] == null ? '' : data["LoadingID"]) + '><i class="fa fa-trash-o"></i></a>';

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
                $('#Tbl_PortofLoadingList tr td').each(function (index, item) {
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
        obj.LoadingCode = $('#txt-Code').val();
        obj.LoadingName = $('#txt-Description').val();
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
                orderBy = "LoadingCode " + direction;
                break;
            case 1:
                orderBy = "LoadingName " + direction;
                break;
        }
        return orderBy;
    }
}
var GetMasterData = function () {
    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("PortofLoadingList.aspx/GetFilterData", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}


var ValidateLoading = function () {
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#LoadingCode').val());
    var description = $.trim($('#LoadingName').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#LoadingCode-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#LoadingName-Validation').show();
    }

    if (code != '') {
        
        var existingLoad = MasterData["ExistingLoading"];
        if (existingLoad != null && existingLoad != undefined && existingLoad.length > 0) {
            if (editLoadingID == 0) {
                var matchedLoadingRecord = GetmatchedRecord(existingLoad, 'LoadingCode', code);
                if (matchedLoadingRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedLoading = GetunmatchedRecord(existingLoad, 'LoadingID', editLoadingID);
                var matchedLoadingRecord = GetmatchedRecord(unMatchedLoading, 'LoadingCode', code);
                if (matchedLoadingRecord.length > 0) {
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
    var BindCreateEmployeeScreen = function () {

        var createEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createEmployeeEntity.length > 0) {
            $('#btn-Save').show();
        }
        else {
            $('#btn-Save').hide();
        }
        if (editLoadingID != 0) {
            editLoadingData = GetEditLoadingData();
            BindEditLoadingDetails(editLoadingData["LoadingData"]);
        }
    }

    var BindEditLoadingDetails = function (LoadingData) {

        $('#LoadingCode').val(LoadingData[0]['LoadingCode'])
        $('#LoadingName').val(LoadingData[0]['LoadingName'])

        $('P-Title').html('Update Loading');
        $('#btn-Save').hide();
        var updateLoadingEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateLoadingEntity.length > 0) {
            $('#update-Loading').show();
        }
    }
    var GetEditLoadingData = function () {
        var _obj = {
            'LoadingID': parseInt(editLoadingID)
        };
        var tempList = {};
        $.when(RequestServer("PortofLoadingList.aspx/GetEditLoadingData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

}

{

    var DeleteLoading = function () {
        var obj = { 'LoadingID': parseInt(deletePortOfLoadingID) }
        var tempList = {};
        $.when(RequestServer("PortofLoadingList.aspx/DeleteLoading", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deletePortOfLoadingID = 0;
                $.notify("Port of Loading deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Loading_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Port of Loading!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    {
        var GetEmployeeinfo = function () {

            var _obj = {
                'LoadingId': parseInt(EmployeeId),
            };
            var tempList = {};
            $.when(RequestServer("PortofLoading.aspx/GetLoadingScreenData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
}

//Click
{
    $(document).on('click', '[data-Edit-Loading]', function () {

        editLoadingID = $(this).attr('data-Edit-Loading');
        if (editLoadingID != null) {
            BindCreateEmployeeScreen();
        }
        $('#mp_paid').show();
    });


    $(document).on('click', '[data-delete-Loading]', function () {
        deletePortOfLoadingID = $(this).attr('data-delete-Loading');
        if (deletePortOfLoadingID != null) {
            $('#mp_Loading_Delete').show();
        }
    });
    $(document).on('click', '#btn-Save', function () {
        if (ValidateLoading() && $("span[error-active='true']").length == 0) {
            SaveLoading();
            location.reload();
        }

    });
    $(document).on('click', '#update-Loading', function () {
        if (ValidateLoading() && $("span[error-active='true']").length == 0) {
            UpdateLoading();
            location.reload();
        }

    });

    $(document).on('click', '[data-delete-Loading]', function () {

        DeleteLoadingID = $(this).attr('data-delete-Customer');
        var associatedCount = $(this).attr('data-AssociatedCount');
        var associatedProject = $(this).attr('data-Associate-project');
        var associatedBill = $(this).attr('data-delete-Invoice');
        if (parseInt(associatedCount) == 0 && parseInt(associatedProject) == 0 && parseInt(associatedBill) == 0) {
            if (DeleteLoadingID != null) {
                $('#mp_Customer_Delete').show();
            }
        }
    });
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteLoading();
            $loading.hide();
        }, 0);
    });
    $(document).on('click', '[delete-cancel]', function () {
        DeleteLoadingID = 0;
        $('#mp_Loading_Delete').hide();
        location.reload();
    })

    $(document).on('click', '#btn_search', function () {
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-CustomerName').val('');
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
