//Common
{
    var strExcelData = [];
    var excelSaveData = [];
    var deleteGLID = 0;
    var isValidData = true;
    var isExistingGL = false;
    var sortGLList = [];
    var dataAllCount = 0;
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BuildGlImportScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('change', '#GL-file', function (e) {
        e.preventDefault();
        ProcessExcelData();

    });

    $(document).on('click', '#btn-Save-ExcelData', function () {
        if (excelSaveData.length > 0  ) {
            if (isValidData) {
                SaveExcelData(excelSaveData);
            }
            else {
                $.notify("Please delete the invalid and duplicate GL code row(s)!!", { position: "right top", className: "error" });
            }
           
        }
        else {
            $.notify("Please add the GL code for upload!!", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '[data-delete-GL]', function () {
        if ($(this).attr('data-delete-GL') != '0' && $(this).attr('data-delete-GL') != undefined && $(this).attr('data-delete-GL') != null) {
            deleteGLID = parseInt($(this).attr('data-delete-GL'));
            $('#MP_Delete_GL').show();
        }
    });

    $(document).on('click', '[cancel-Delete-GL]', function () {
        $('#MP_Delete_GL').hide();
        deleteGLID = 0;
    });

    $(document).on('click', '#delete-GL-Yes', function () {
        DeleteGL();
    });

    $(document).on('click', '[remove-Excel-Row]', function () {
        var removeID = $(this).attr('remove-Excel-Row');
        if (removeID != undefined && removeID != '0' && removeID != null) {
            strExcelData = GetunmatchedRecord(strExcelData, 'IdentityID', removeID);
            BindExcelData();
        }
    });

    $(document).on('click', '[close-importPopup]', function () {
        $('#mp_bill-view').hide();
        $('#GL-file').val('');
        strExcelData = [];
        excelSaveData = [];
        $('#file-Name').html('');
        $('#tbl-excel-Data').html('')
    });

    //Sorting Event

    $(document).on('click', 'th[data-sort-Gl]', function (e) {
        var $this = $(this).parents('table');
        if ($('th[data-sort]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
            //var tablegroupby = 'Entityname'
            // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
            var columngroupby = $(this).attr('data-sort');
            var columType = $(this).attr('sort-column-Type');
            var sortingdefaulticon = "img/appimages/Sorting-icon-default.png";
            var sortingascendingicon = "img/appimages/Sorting-icon-asc.png";
            var sortingdescendingicon = "img/appimages/Sorting-icon-desc.png";

        }

        // Get Active sort order
        {
            var activesortorder = "default";
            if ($(this).hasClass('sorting-default'))
                activesortorder = "default";
            else if ($(this).hasClass('sorting-asc'))
                activesortorder = "asc";
            else if ($(this).hasClass('sorting-desc'))
                activesortorder = "desc";
        }

        // Restore all to default
        {
            $this.find('thead th').removeClass('sorting-asc sorting-desc').addClass('sorting-default');
            $this.find('thead th').find('img').attr('src', sortingdefaulticon);
            var currentSortOrder = "asc";
        }

        // Change Icon and Class
        {
            if (activesortorder === "default") {
                $('#tbl-Gl th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Gl th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-Gl th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Gl th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-Gl th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Gl th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-desc headerSortUp').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";

            }
        }

        // Sort it and Render List
        {
            //$loading.show();
            //setTimeout(function () {
            // Sort it by Default Groupby and then by Column
            var lstResult = sortGLList

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorter(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorter(lstResult, columngroupby, '321');
            }
            else if (columType == 'date') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
            }


            // Render List
            {
                BindGLData(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '#download-Sample-template', function () {
        window.location.href = 'DownloadGlTemplate.aspx';
    });
}

//DOM Manipulation
{
    var BuildGlImportScreen = function () {
        //var screenData = GetScreenData();
        //var glList = screenData["GlList"];
        //sortGLList = glList;
        //BindGLData(glList);
        BindGLDataList();
        var GlImportEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3020');
        if (GlImportEntity != null && GlImportEntity != undefined && GlImportEntity.length > 0) {
            $('#filter-toggle-btn').show();
           
        }
        else {
            $('#filter-toggle-btn').hide();

        }
    
    }

    var BindGLData = function (glList) {
        var html = '';
        var $el = $('#tbl-GLCode-Data-Body');
        if (glList != null && glList != undefined && glList.length > 0)
        {
            $.each(glList, function (index, item) {
                html += '<tr>'
                html += '<td title="' + (item["GLNumber"] == null ? '' : item["GLNumber"]) + '">' + (item["GLNumber"] == null ? '-' : item["GLNumber"]) + '</td>'
                html += '<td title="' + (item["GLDescription"] == null ? '' : item["GLDescription"]) + '">' + (item["GLDescription"] == null ? '' : item["GLDescription"]) + '</td>'
                html += '<td title="' + (item["CreatedOn"] == null ? '' : item["CreatedOn"]) + '">' + (item["CreatedOn"] == null ? '' : item["CreatedOn"]) + '</td>'
                html += '<td title="' + (item["CreatedByName"] == null ? '' : item["CreatedByName"]) + '">' + (item["CreatedByName"] == null ? '' : item["CreatedByName"]) + '</td>'
                html += '<td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-delete-GL=' + (item["IdentityID"] == null ? '' : item["IdentityID"]) + '><i class="fa fa-trash-o"></i></a></td>'
                html += '</tr>'
            })
        }
        else {
            html += '<tr><td colspan="5" style="text-align: center;">No Data Found</td></tr>';
        }
        $el.html(html);
    }

    var BindExcelData = function () {
        isValidData = true;
        excelSaveData = [];
        var html = '';
        var $el = $('#tbl-excel-Data');
        if (strExcelData.length > 0) {
            $.each(strExcelData, function (index, item) {
                if (item["GLAccNo"] != "" && item["GLDescription"] != "") {
                    var validationMessage = '-';
                    if (ValidateData(item["GLAccNo"])) {
                        var obj = {
                            'ClientID': (item["ClientId"] == null || '' ? 0 : parseInt(item["ClientId"])),
                            'GLNumber': (item["GLAccNo"] == null ? '' : item["GLAccNo"]),
                            'GLDescription': (item["GLDescription"] == null ? '' : item["GLDescription"]),
                            'RowStatus': 'A',
                            'CreatedBy': (item["CreatedBy"] == null ? 0 :parseInt(item["CreatedBy"])),
                            'CreatedOn': (moment().format('MM/DD/YYYY')),
                            'UpdatedOn': (moment().format('MM/DD/YYYY')),
                            'UpdatedBy': 0,
                            
                        }
                        excelSaveData.push(obj);
                    }
                    else {
                        isValidData = false;
                        validationMessage = 'GL Code is not valid';
                    }
                    var duplicateData = [];
                    if (excelSaveData.length > 0)
                    {
                        duplicateData = GetmatchedRecord(excelSaveData, 'GLNumber', item["GLAccNo"]);
                        if (duplicateData != null && duplicateData != undefined && duplicateData.length > 1) {
                            isValidData = false;
                            isExistingGL = true;
                            validationMessage = 'GL Code is already exist';
                        }
                    }
                    html += '<tr>'
                    html += '<td title="' + (item["GLAccNo"] == null ? '' : item["GLAccNo"]) + '"><h5>' + (item["GLAccNo"] == null ? '-' : item["GLAccNo"]) + '</h5></td>'
                    html += '<td title="' + (item["GLDescription"] == null ? '' : item["GLDescription"]) + '"><h5>' + (item["GLDescription"] == null ? '' : item["GLDescription"]) + '</h5></td>'
                    if (validationMessage == '-') {
                        html += '<td title="' + validationMessage + '"> <h5 > ' + validationMessage + ' </h5></td>'
                    }
                    else {
                        html += '<td title="' + validationMessage + '"> <h5 style="color:red"> ' + validationMessage + ' </h5></td>'
                    }
                    html += '<td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" remove-Excel-Row=' + (item["IdentityID"] == null ? '0' : item["IdentityID"]) + '><i class="fa fa-trash-o"></i></a></td>'
                    html += '</tr>'
                }
             
            })
        }
        else {
            html += '<tr><td colspan="4" style="text-align: center;">No Data Found</td></tr>';
        }
        $el.html(html);
    }
}

//Data Manipulation
{
    var GetScreenData = function () {
        var _obj = {
           
        };
        var tempList = {};
        $.when(RequestServer("GLImport.aspx/GetClientGLCodes", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ProcessExcelData = function () {
     
        var importTemplateFiles = $('#GL-file').prop("files");
        var fileName = importTemplateFiles[0]['name'];
        var type = importTemplateFiles[0]["type"];
      
        if (importTemplateFiles.length > 0) {
            if (type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                $('#file-Name').html(fileName);
               
                var data = new FormData();
                data.append("Folder", 0);
                data.append("key", importTemplateFiles[0]);
                {
                    $.ajax({
                        type: "POST",
                        url: "GLCodeImport.ashx",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            if (result != '' && result != null && result.length != 0) {
                                $('#GL-file').val("");
                                strExcelData = result;
                                strExcelData = $.parseJSON(strExcelData[""]);
                                BindExcelData();
                                $('#mp_bill-view').show();
                            }
                            else {
                                $('#GL-file').val("");
                             
                            }
                        },
                        error: function (e) {
                            $('#GL-file').val("");
                            var error = e;
                        },
                        xhr: function (evt) {
                            $('#GL-file').val("");
                            var filexhr = $.ajaxSettings.xhr();
                            return filexhr;
                        }
                    }).done(function (r) {
                        $('#GL-file').val("");
                    });
                }

            }
            else {

            }
        }
        return strExcelData;
    }

    var SaveExcelData = function (exelList) {
        var _obj = {
            'lstGLCode': exelList,
        };

        var tempList = {};
        $.when(RequestServer("GLImport.aspx/InsertExcelData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("GL Code imported successfully!!", { position: "right top", className: "success" });
                $('#mp_bill-view').hide();
                $('#GL-file').val('');
                strExcelData = [];
                excelSaveData = [];
                $('#file-Name').html('');
                $('#tbl-excel-Data').html('')
                BuildGlImportScreen();
            }
            else {
                $.notify("Server error occurred while importing GL accounts.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var DeleteGL = function () {
        var _obj = {
            'glID': deleteGLID,
        };
        var tempList = {};
        $.when(RequestServer("GLImport.aspx/DeleteGL", _obj)).done(function (response) {
            if (parseInt(response) > 0) {
                BuildGlImportScreen();
                
                $.notify("GL Code deleted successfully !!", { position: "right top", className: "success" });
                $('#MP_Delete_GL').hide();
            }
            else {
                $.notify("Server error occured while deleting a GL code !!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}

//Common
{
    var ValidateData = function (glId) {
        var isvalid = true;
        var namePattern = /^[a-zA-Z0-9-' ]*$/;
        if (!namePattern.test(glId)) {
            isvalid = false;
        }
        return isvalid;
    }
}

//BindGLList With Pagination
{
    var BindGLDataList = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-Gl').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "GLImport.aspx/GetGLDataList",
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
                    json.data = common.AUF(objData['GlList']);
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
                        html += (data["GLNumber"] == null ? '-' : data["GLNumber"]);
                        return html;
                    }
                },
                {
                    "width": '23%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["GLDescription"] == null ? '' : data["GLDescription"]);
                        return html;
                    }
                },
                {
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["CreatedOn"] == null ? '' : data["CreatedOn"]);
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["CreatedByName"] == null ? '' : data["CreatedByName"])
                        return html;
                    }
                },
                {
                     "width": '10%',
                     "mData": function (data, type, dataToSet) {
                         var GLDeleteEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3021');
                         var html = '';
                         html += '<div style="text-align: center;">';
                         if (GLDeleteEntity != null && GLDeleteEntity != undefined && GLDeleteEntity.length > 0) {
                             html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-delete-GL=' + (data["IdentityID"] == null ? '' : data["IdentityID"]) + '><i class="fa fa-trash-o"></i></a>';
                         }
                         html += '</div>';
                         return html;
                     }
                 },
            ],
            "drawCallback": function (settings) {
                $('#tbl-Gl tr td').each(function (index, item) {
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
      
        var _obj = {};
        _obj = { "billFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "GLNumber " + direction;
                break;
            case 1:
                orderBy = "GLDescription " + direction;
                break;
            case 2:
                orderBy = "CreatedOn " + direction;
                break;
            case 3:
                orderBy = "CreatedByName " + direction;
                break;
           
        }
        return orderBy;
    }
}