//Global Variables
{
    var deleteProjectID = 0;
}

//Load and Events
{
    $(document).ready(function () {
        BindProjectsListScreen();
    });

    $(document).on('click', '#Btn_serch', function () {
        BindProjectList();
    });

    $(document).on('click', '#btn_Reset', function () {
        $("#slt-ProjectName option").prop("selected", false);
        $("#slt-CustomerName option").prop("selected", false);
        $("#slt-ProjectType option").prop("selected", false);
        $('#slt-Status').val(0)
        $('#slt-Status').select2();
        $('.fselect').fSelect('reload');
        BindProjectList();
    });

    $(document).on('click', '[data-delete-Project]', function () {
        deleteProjectID = $(this).attr('data-delete-Project');
        if (deleteProjectID != null) {
            $('#mp_Customer_Delete').show();
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {
        DeleteProject();
    });

    $(document).on('click', '[delete-cancel]', function () {
        deleteProjectID = 0;
        $('#mp_Customer_Delete').hide();
    })
    $(document).on('click', '#addProject', function () {
        // $('#Mp_New_Project').show();
    });

}

//DOM Manipulations
{
    var BindProjectsListScreen = function () {
        var createProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3026');
        if (createProjectEntity.length > 0) {
            $('#addProject').show();
        }
        BindMasterData();
        BindProjectList();



    }

    var BindMasterData = function () {
        var masterData = GetMasterData();
        BindDropDowns($('#slt-ProjectName'), masterData["Projects"], '');
        BindDropDowns($('#slt-CustomerName'), masterData["Customers"], '');
        BindDropDowns($('#slt-ProjectType'), masterData["ProjectTypes"], '');
        BindDropDowns($('#slt-Status'), masterData["ProjectStatus"], 'Choose Status');
        $('#slt-Status').val('50085');
        $('#slt-Status').select2();
        $('#slt-ProjectName').fSelect({
            placeholder: 'Choose Project Name',
        });
        $('#slt-CustomerName').fSelect({
            placeholder: 'Choose Customer Name',
        });
        $('#slt-ProjectType').fSelect({
            placeholder: 'Choose Project Type',
        });

    }

    var BindProjectList = function () {
        var dataAllCount = 0;
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-Projects').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "ProjectList.aspx/GetProjectList",
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
                    json.data = common.AUF(objData['ProjectList']);
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
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += (data["ProjectName"] == null ? '-' : data["ProjectName"]);
                        return html;
                    }
                },
                {
                    "width": '23%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["StrCustomerName"] == null ? '' : data["StrCustomerName"]);
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["StrProjectType"] == null ? '' : data["StrProjectType"])
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        if (data["StrStatus"] == "Active") {
                            html = '<h5 style="color:green">' + (data["StrStatus"] == null ? '' : data["StrStatus"]) + '</h5>'
                        }
                        else {
                            html = '<h5 style="color:#DE756C !important">' + (data["StrStatus"] == null ? '' : data["StrStatus"]) + '</h5>'
                        }
                        return html;
                    }
                },
                {
                    "width": '8%',
                    "mData": function (data, type, dataToSet) {
                        var updateProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3027');
                        var deleteProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3028');
                        var html = '';
                        html += '<div >';
                        if (updateProjectEntity.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Edit"  href="AddProject.aspx?ProjectID=' + (data["ProjectID"] == null ? '' : data["ProjectID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                        }
                        if (deleteProjectEntity.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Project=' + (data["ProjectID"] == null ? '' : data["ProjectID"]) + '><i class="fa fa-trash-o"></i></a>';
                        }
                        html += '</div>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
                $('#tbl-Projects tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },
            "fnDrawCallback": function () {
                $('#tbl-Projects tr td').each(function (index, item) {
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
        obj.Status = $('#slt-Status').val();
        obj.ProjectName = common.AUF($('#slt-ProjectName').val()).join();
        obj.CustomerName = common.AUF($('#slt-CustomerName').val()).join();
        obj.ProjectType = common.AUF($('#slt-ProjectType').val()).join();
        var _obj = {};
        _obj = { "projectFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "ProjectName " + direction;
                break;
            case 1:
                orderBy = "StrCustomerName " + direction;
                break;
            case 2:
                orderBy = "StrProjectType " + direction;
                break;
            case 3:
                orderBy = "StrStatus " + direction;
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
        $.when(RequestServer("ProjectList.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeleteProject = function () {
        var obj = {
            'projectID': parseInt(deleteProjectID)
        }
        var tempList = {};
        $.when(RequestServer("AddProject.aspx/DeleteProject", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteProjectID = 0;
                $.notify("Project deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Customer_Delete').hide();
                BindProjectList();
            }
            else {
                $.notify("Server error occured while deleting a Project!!", { position: "right top", className: "error" });
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
        if (lst != null && lst != undefined && lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');

            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

            });
        }
        $el.html(html);
    }
}