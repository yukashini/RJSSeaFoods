//Global Variables
{
    var deleteLinerListID = 0;
    var editLinerID = 0;
    var editLinerData = [];
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
    var SaveLiner = function () {

        var _obj = {
            'LinerCode': $('#LinerCode').val(),
            'LinerName': $('#LinerName').val(),
        }
        var insertObj = {
            'objLiner': _obj
        }
        $.when(RequestServer("LinerList.aspx/SaveLiner", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Liner created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Liner !!", { position: "right top", className: "error" });
            }
        });
    }
    var UpdateLiner = function () {
        var _obj = {
            'LinerID': parseInt(editLinerID),
            'LinerCode': $('#LinerCode').val(),
            'LinerName': $('#LinerName').val(),

        }
        var UpdateObj = {
            'objLiner': _obj
        }
        $.when(RequestServer("LinerList.aspx/UpdateLiner", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Liner Updated successfully!", { position: "right top", className: "success" });

            }
            else {
                $.notify("Server error occured while creating a Liner !!", { position: "right top", className: "error" });
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
        $('#Tbl_LinerList').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "LinerList.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['Linerlst']);
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
                        html += '<h5 >' + (data["LinerCode"] == null || data["LinerCode"] == '' ? '-' : data["LinerCode"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["LinerName"] == null || data["LinerName"] == '' ? '-' : data["LinerName"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {

                        var html = '';
                        html += '<div style="text-align: center;">';

                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Liner=' + (data["LinerID"] == null ? '' : data["LinerID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Liner=' + (data["LinerID"] == null ? '' : data["LinerID"]) + '><i class="fa fa-trash-o"></i></a>';

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
                $('#Tbl_LinerList tr td').each(function (index, item) {
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
        obj.LinerCode = $('#txt-Code').val();
        obj.LinerName = $('#txt-Description').val();
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
                orderBy = "LinerCode " + direction;
                break;
            case 1:
                orderBy = "LinerName " + direction;
                break;
        }
        return orderBy;
    }
}
var GetMasterData = function () {
    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("LinerList.aspx/GetFilterData", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}


var ValidateLiner = function () {
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#LinerCode').val());
    var description = $.trim($('#LinerName').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#LinerCode-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#LinerName-Validation').show();
    }

    if (code != '') {

        var existingLoad = MasterData["ExistingLiner"];
        if (existingLoad != null && existingLoad != undefined && existingLoad.length > 0) {
            if (editLinerID == 0) {
                var matchedLinerRecord = GetmatchedRecord(existingLoad, 'LinerCode', code);
                if (matchedLinerRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedLiner = GetunmatchedRecord(existingLoad, 'LinerID', editLinerID);
                var matchedLinerRecord = GetmatchedRecord(unMatchedLiner, 'LinerCode', code);
                if (matchedLinerRecord.length > 0) {
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
        if (editLinerID != 0) {
            editLinerData = GetEditLinerData();
            BindEditLinerDetails(editLinerData["LinerData"]);
        }
    }

    var BindEditLinerDetails = function (LinerData) {

        $('#LinerCode').val(LinerData[0]['LinerCode'])
        $('#LinerName').val(LinerData[0]['LinerName'])

        $('P-Title').html('Update Liner');
        $('#btn-Save').hide();
        var updateLinerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateLinerEntity.length > 0) {
            $('#update-Liner').show();
        }
    }
    var GetEditLinerData = function () {
        var _obj = {
            'LinerID': parseInt(editLinerID)
        };
        var tempList = {};
        $.when(RequestServer("LinerList.aspx/GetEditLinerData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

}

{

    var DeleteLiner = function () {
        var obj = { 'LinerID': parseInt(deleteLinerID) }
        var tempList = {};
        $.when(RequestServer("LinerList.aspx/DeleteLiner", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteLinerID = 0;
                $.notify("Liner deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Liner_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Liner!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    {
        var GetEmployeeinfo = function () {

            var _obj = {
                'LinerId': parseInt(EmployeeId),
            };
            var tempList = {};
            $.when(RequestServer("LinerList.aspx/GetLinerScreenData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
}

//Click
{
    $(document).on('click', '[data-Edit-liner]', function () {

        editLinerID = $(this).attr('data-Edit-Liner');
        if (editLinerID != null) {
            BindCreateEmployeeScreen();
        }
        $('#mp_paid').show();
    });


    $(document).on('click', '[data-delete-Liner]', function () {
        deleteLinerID = $(this).attr('data-delete-Liner');
        if (deleteLinerID != null) {
            $('#mp_Liner_Delete').show();
        }
    });
    $(document).on('click', '#btn-Save', function () {
        if (ValidateLiner() && $("span[error-active='true']").length == 0) {
            SaveLiner();
            location.reload();
        }

    });
    $(document).on('click', '#update-Liner', function () {
        if (ValidateLiner() && $("span[error-active='true']").length == 0) {
            UpdateLiner();
            location.reload();
        }

    });

    $(document).on('click', '[data-delete-Liner]', function () {

        DeleteLinerID = $(this).attr('data-delete-Customer');
        var associatedCount = $(this).attr('data-AssociatedCount');
        var associatedProject = $(this).attr('data-Associate-project');
        var associatedBill = $(this).attr('data-delete-Invoice');
        if (parseInt(associatedCount) == 0 && parseInt(associatedProject) == 0 && parseInt(associatedBill) == 0) {
            if (DeleteLinerID != null) {
                $('#mp_Customer_Delete').show();
            }
        }
    });
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteLiner();
            $loading.hide();
        }, 0);
    });
    $(document).on('click', '[delete-cancel]', function () {
        DeleteLinerID = 0;
        $('#mp_Liner_Delete').hide();
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
