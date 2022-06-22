//Global Variables
{
    var deletePortOfDischargeListID = 0;
    var editDischargeID = 0;
    var editDischargeData = [];
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
    var SaveDischarge = function () {
      
              var _obj = {
            'DischargeCode': $('#DischargeCode').val(),
            'DischargeName': $('#DischargeName').val(),
            'DischargeCountry': $('#DischargeCountry').val(),
        }
        var insertObj = {
            'objDischarge': _obj
        }
        $.when(RequestServer("PortofDischargeList.aspx/SaveDischarge", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Discharge created successfully!", { position: "right top", className: "success" });

            }
            else {
                $.notify("Server error occured while creating a Port of Discharge !!", { position: "right top", className: "error" });
            }
        });
    }
    var UpdateDischarge = function () {
        var _obj = {
            'DischargeID': parseInt(editDischargeID),
            'DischargeCode': $('#DischargeCode').val(),
            'DischargeName': $('#DischargeName').val(),
            'DischargeCountry': $('#DischargeCountry').val(),
        }
        var UpdateObj = {
            'objDischarge': _obj
        }
        $.when(RequestServer("PortofDischargeList.aspx/UpdateDischarge", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Discharge Updated successfully!", { position: "right top", className: "success" });
            }
            else {
                $.notify("Server error occured while creating a Port of Discharge !!", { position: "right top", className: "error" });
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
        $('#Tbl_portofDischargelst').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
             "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "PortofDischargeList.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['portofDischargelst']);
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
                        html += '<h5 >' + (data["DischargeCode"] == null || data["DischargeCode"] == '' ? '-' : data["DischargeCode"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["DischargeName"] == null || data["DischargeName"] == '' ? '-' : data["DischargeName"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["DischargeCountry"] == null || data["DischargeCountry"] == '' ? '-' : data["DischargeCountry"]) + '</h5>';
                        return html;
                    }
                },
          
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                      
                        var html = '';
                        html += '<div style="text-align: center;">';                      
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Discharge=' + (data["DischargeID"] == null ? '' : data["DischargeID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Discharge=' + (data["DischargeID"] == null ? '' : data["DischargeID"]) + '><i class="fa fa-trash-o"></i></a>';
                       
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
                $('#Tbl_PortofDischargeList tr td').each(function (index, item) {
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
        obj.DischargeCode = $('#txt-Code').val();
        obj.DischargeName = $('#txt-Description').val();
        obj.DischargeCountry = $('#txt-Country').val();
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
                orderBy = "DischargeCode " + direction;
                break;
            case 1:
                orderBy = "DischargeName " + direction;
                break;
            case 2:
                orderBy = "DischargeCountry" + direction;
                break;
         }
        return orderBy;
    }
}

var GetMasterData = function () {
 
    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("PortofDischargeList.aspx/GetFilterData",_obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}

var ValidateDischarge = function () {
    
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#DischargeCode').val());
    var description = $.trim($('#DischargeName').val());
    var country = $.trim($('#DischargeCountry').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#DischargeCode-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#DischargeName-Validation').show();
    }

    if (country == '' || country == null) {
        isvalid = false;
        $('#DischargeCountry-Validation').show();
    }
    if (code != '') {
        var existingDischarge = MasterData["ExistingDischarge"];
        if (existingDischarge != null && existingDischarge != undefined && existingDischarge.length > 0) {
            if (editDischargeID == 0) {
                var matchedDischargeRecord = GetmatchedRecord(existingDischarge, 'DischargeCode', code);
                if (matchedDischargeRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedDischarge = GetunmatchedRecord(existingDischarge, 'DischargeID', editDischargeID);
                var matchedDischargeRecord = GetmatchedRecord(unMatchedDischarge, 'DischargeCode', code);
                if (matchedDischargeRecord.length > 0) {
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
    var BindCreateDischargeScreen = function () {
 
            var createDischargeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
            if (createDischargeEntity.length > 0) {
                $('#btn-Save').show();
            }
            else {
                $('#btn-Save').hide();
            }
        if (editDischargeID != 0) {
                editDischargeData = GetEditDischargeData();
                BindEditDischargeDetails(editDischargeData["DischargeData"]);
            }
        }

    var BindEditDischargeDetails = function (DischargeData) {
       

            $('#DischargeCode').val(DischargeData[0]['DischargeCode'])
            $('#DischargeName').val(DischargeData[0]['DischargeName'])
            $('#DischargeCountry').val(DischargeData[0]['DischargeCountry'])

            $('P-Title').html('Update Discharge');
            $('#btn-Save').hide();
            var updateDischargeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
            if (updateDischargeEntity.length > 0) {
                $('#update-Discharge').show();
            }
        }
        var GetEditDischargeData = function () {
            var _obj = {
                'DischargeID': parseInt(editDischargeID)
            };
            var tempList = {};
            $.when(RequestServer("PortofDischargeList.aspx/GetEditDischargeData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;

        }

    }

    {

    var DeleteDischarge = function () {
       
            var obj = { 'DischargeID': parseInt(deletePortOfDischargeID) }
            var tempList = {};
            $.when(RequestServer("PortofDischargeList.aspx/DeleteDischarge", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    deletePortOfDischargeID = 0;
                    $.notify("Port of Discharge deleted successfully!!", { position: "right top", className: "success" });
                    $('#mp_Discharge_Delete').hide();
                    BindInvoiceList();
                }
                else {
                    $.notify("Server error occured while deleting a Port of Discharge!!", { position: "right top", className: "error" });
                }
            });
            return tempList;
        }
        {
            var GetDischargeinfo = function () {

                var _obj = {
                    'DischargeId': parseInt(DischargeId),
                };
                var tempList = {};
                $.when(RequestServer("PortofDischarge.aspx/GetDischargeScreenData", _obj)).done(function (response) {
                    tempList = $.parseJSON(response);
                });
                return tempList;
            }
        }
    }

    //Click
    {
    $(document).on('click', '[data-Edit-Discharge]', function () {
     
            editDischargeID = $(this).attr('data-Edit-Discharge');
            if (editDischargeID != null) {
                BindCreateDischargeScreen();
            }
            $('#mp_paid').show();
        });


        $(document).on('click', '[data-delete-Discharge]', function () {
            deletePortOfDischargeID = $(this).attr('data-delete-Discharge');
            if (deletePortOfDischargeID != null) {
                $('#mp_Discharge_Delete').show();
            }
        });

        $(document).on('click', '#btn-Save', function () {
           if (ValidateDischarge() && $("span[error-active='true']").length == 0) {
               SaveDischarge();
               location.reload();
            }

        });
        $(document).on('click', '#update-Discharge', function () {
            if (ValidateDischarge() && $("span[error-active='true']").length == 0) {
                UpdateDischarge();
                location.reload();
            }

        });

    $(document).on('click', '#btn-delete-ok', function () {
                 $loading.show();
           // setTimeout(function () {
                DeleteDischarge();
                $loading.hide();
            //}, 0);
        });
        $(document).on('click', '[delete-cancel]', function () {
            DeleteDischargeID = 0;
            $('#mp_Discharge_Delete').hide();
        })

    $(document).on('click', '#btn_search', function () {

            BindInvoiceList();
        });

        $(document).on('click', '#btn_reset', function () {
            $('#txt-DischargeName').val('');
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
