//Global Variables
{
    var editId = 0;
    var deleteID=0;
}

//Load&Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BindBillCategoryScreen();
            $loading.hide();
        }, 0);

    });

    $(document).on('click', '#Btn_serch', function () {
        BindBilCategories();
    });

    $(document).on('click', '#btn_Reset', function () {
        $('#slt-Status').val(0);
        $('#slt-Status').select2();
        $('#txt-Category').val('');
        BindBilCategories();
    })

    $(document).on('click', '#open-CategoryPop', function () {
        ResetFields();
        $('#add_mp_paid').show();
        $('#pop-Up-title').html('Create Bill Category');
    });

    $(document).on('click', '[data-cancel-Category]', function () {
        $('#add_mp_paid').hide();
    });

    $(document).on('click', '#create-Category', function () {
        SaveCategory();
    });

    $(document).on('click', '[data-edit-Category]', function () {
        ResetFields();
        editId = $(this).attr('data-edit-Category');
        if (editId != null) {
            $('#pop-Up-title').html('Update Bill Category');
            $('#txt-BillCategory').val($(this).attr('data-Categ')),
            $('#txt-Desc').val($(this).attr('data-Desc')),
            $('#slt-Category-Status').val($(this).attr('data-Status'))
            $('#slt-Category-Status').select2();
            $('#add_mp_paid').show();
            $('#create-Category').hide();
            $('#update-Category').show();
        }

    });

    $(document).on('click', '#update-Category', function () {
        UpdateCategory();
    });

    $(document).on('click', '[data-delete-Category]', function () {
        deleteID = $(this).attr('data-delete-Category');
        if (deleteID != null) {
            $('#deletePop').show();
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {
        DeleteCategory();
    });
    $(document).on('click', '[delete-cancel]', function () {
        deleteID = 0;
        $('#deletePop').hide();
    });

}

//Dom
{
    var BindBillCategoryScreen = function () {
        var billCategoryMasterList = GetBillCategoriesMasterData();
        BindDropDowns($('#slt-Status'), billCategoryMasterList["StatusList"], 'Select Status');
        BindDropDowns($('#slt-Category-Status'), billCategoryMasterList["StatusList"], 'Select Status');
        BindBilCategories();
    }

    var BindBilCategories = function () {
        var dataAllCount = 0;
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-BillCategories').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "BillCategory.aspx/GetBillCategoryList",
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
                    json.data = common.AUF(objData['BillCategoryList']);
                    json.recordsTotal = common.AUF(objData['AllCount'][0]["Count"]);
                    json.recordsFiltered = common.AUF(objData['AllCount'][0]["Count"]);
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[2, "asc"]],
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
                        html += (data["BillCategory"] == null ? '-' : data["BillCategory"]);
                        return html;
                    }
                },
                {
                    "width": '23%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["Description"] == null ? '' : data["Description"]);
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["StrStatus"] == null ? '' : data["StrStatus"])
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        //var GLDeleteEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3021');
                        var html = '';
                        html += '<div style="text-align: center;">';
                       // if (GLDeleteEntity != null && GLDeleteEntity != undefined && GLDeleteEntity.length > 0) {
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-delete-Category=' + (data["BillCategoryId"] == null ? '' : data["BillCategoryId"]) + '><i class="fa fa-trash-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Status=' + (data["Status"] == null ? '-' : data["Status"]) + ' data-Categ=' + (data["BillCategory"] == null ? '-' : data["BillCategory"]) + ' data-Desc=' + (data["Description"] == null ? '' : data["Description"]) + ' data-edit-Category=' + (data["BillCategoryId"] == null ? '' : data["BillCategoryId"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        //}
                        html += '</div>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
                $('#tbl-BillCategories tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },
            "fnDrawCallback": function () {
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
        obj.Status = parseInt($('#slt-Status').val());
        obj.Category =$('#txt-Category').val();

        var _obj = {};
        _obj = { "billCategoryFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "BillCategory " + direction;
                break;
            case 1:
                orderBy = "Description " + direction;
                break;
            case 2:
                orderBy = "StrStatus " + direction;
                break;
           

        }
        return orderBy;
    }
}

//Data
{
    var GetBillCategoriesMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("BillCategory.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var SaveCategory = function () {
        var _obj = {
            'Category': $('#txt-BillCategory').val(),
            'Description': $('#txt-Desc').val(),
            'Status': parseInt($('#slt-Category-Status').val())
        };
        var obj = {
            'objCategory':_obj
        }
        var tempList = {};
        $.when(RequestServer("BillCategory.aspx/SaveCategory", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Bill Category Created successfully!!", { position: "right top", className: "success" });
                $('#add_mp_paid').hide();
                BindBilCategories();
            }
            else {
                $.notify("Server error occured while creating a Bill Category!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var UpdateCategory = function () {
        var _obj = {
            'Category': $('#txt-BillCategory').val(),
            'Description': $('#txt-Desc').val(),
            'Status': parseInt($('#slt-Category-Status').val()),
            'BillCategoryId':parseInt(editId)
        };
        var obj = {
            'objCategory': _obj
        }
        var tempList = {};
        $.when(RequestServer("BillCategory.aspx/UpdateCategory", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                editId = 0;
                $.notify("Bill Category Updated successfully!!", { position: "right top", className: "success" });
                $('#add_mp_paid').hide();
                BindBilCategories();
            }
            else {
                $.notify("Server error occured while updating a Bill Category!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var DeleteCategory = function () {
       
        var obj = {
            'BillCategoryId': parseInt(deleteID)
        }
        var tempList = {};
        $.when(RequestServer("BillCategory.aspx/DeleteCategory", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteID = 0;
                $.notify("Bill Category Deleted successfully!!", { position: "right top", className: "success" });
                $('#deletePop').hide();
                BindBilCategories();
            }
            else {
                $.notify("Server error occured while deleting a Bill Category!!", { position: "right top", className: "error" });
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

    var ResetFields = function () {
        $('#pop-Up-title').html('Create Bill Category');
        $('#txt-BillCategory').val(''),
        $('#txt-Desc').val(''),
        $('#slt-Category-Status').val(0)
        $('#slt-Category-Status').select2();
    }
}