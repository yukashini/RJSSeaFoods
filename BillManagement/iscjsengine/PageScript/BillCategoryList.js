//Global
//Global
{
    var lstData = [];
    var listData = [];
    var deleteID = 0;
    var strExcelData = [];
    var excelSaveData = [];
    var deleteGLID = 0;
    var isValidData = true;
    var isExistingGL = false;
}

//Load and Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BuildScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-Edit]', function (e) {
        e.preventDefault();
        window.location.replace($(this).attr('data-Edit'));
    });

    $(document).on('click', '#Btn_serch', function () {
        var filteredData = FilterCategories();
        BindCategoryList(filteredData);
    })

    $(document).on('click', '#btn_Reset', function () {
        $('#txt-Category').val('')
        $('#txt-AddedOn').val('');
        $('#slt-Added-By').val(0);
        $('#slt-Status').val(999999);
        $('.select2').select2();
        BindCategoryList(listData);
    });

    $(document).on('click', '[data-DeleteCategory]', function () {
        deleteID = $(this).attr('data-DeleteCategory');
        if (deleteID != undefined) {
            $('#mp_delete-Category').show();
        }
    });

    $(document).on('click', '[submit-cancel]', function (e) {
        e.preventDefault();
        $('#mp_delete-Category').hide();
        deleteID = 0;
    });

    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteCategory();
            $loading.hide();
        }, 0);
    });
}

//Dom Manipulations
{
    var BuildScreen = function () {
        $('#slt-Status').val('1');
        $('#slt-Status').select2();
        var createCategoryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3029');
      
        if (createCategoryEntity != null && createCategoryEntity != undefined && createCategoryEntity.length > 0) {
            $('#add-Category').show();
        }
        else {
            $('#add-Category').hide();
        }
     
        
        var data = GetCategoryListData();
        listData = data["Categories"];
        var filteredData = FilterCategories();
        BindUserOptions($('#slt-Added-By'), listData, 'Select Added By');
        BindCategoryList(filteredData);
        //$('#txt-AddedOn').datepicker();
        //$('#txt-AddedOn').mask('00/00/0000');
    }

    var BindCategoryList = function (listData) {
        var html = '';
        var $el = $('#tbl_CategoryList-Bdy');
        var UpdateCategoryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3030');
        var deleteCategoryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3031');
        if (listData != null && listData != undefined && listData.length > 0) {
            var category = GetmatchedRecord(listData, 'IsMasterGLCode', '1');
            category = GetDistinctArray(category, 'IdentityID');
            var subCategory = GetmatchedRecord(listData, 'IsMasterGLCode', '0');
            if (category != null && category != undefined && category.length > 0) {
                $.each(category, function (index,item) {
                    html += '<tr class="isc-tr-show-parentfiles-s1 isc-bg-clr-active cursor-pointer">';
                    html += '<td class="">';
                    html+='<center><span><i class="fa fa-angle-down isc-list-indent-right "></i></span></center>';
                    html+='</td>';
                    html+='<td>';
                    html += '<h2 title="' + (item["CategoryName"] == null ? '-' : item["CategoryName"]) + '">' + (item["CategoryName"] == null ? '-' : item["CategoryName"]) + '</h2>';
                    html+='</td>';
                    html += '<td title="' + (item["GLNumber"] == null ? '-' : item["GLNumber"]) + '">' + (item["GLNumber"] == null ? '-' : item["GLNumber"]) + '</td>';
                    html += '<td title="' + (item["GLDescription"] == null ? '-' : item["GLDescription"]) + '"><h2>' + (item["GLDescription"] == null ? '-' : item["GLDescription"]) + '</h2></td>';
                    html += '<td title="' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format("MM/DD/YYYY")) + '">' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format("MM/DD/YYYY")) + '</td>';
                    html += '<td title="' + (item["CreatedByName"] == null ? '-' : item["CreatedByName"]) + '">' + (item["CreatedByName"] == null ? '-' : item["CreatedByName"]) + '</td>';
                    html+='<td>';
                    html += '<div class="isc-td-inline-status-ch-s1">';
                    if (item["StatusByName"] == "Active") {
                        html += '<a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove" title="' + (item["StatusByName"] == null ? '-' : item["StatusByName"]) + '">' + (item["StatusByName"] == null ? '-' : item["StatusByName"]) + '</a>';
                    }
                    else {
                        html += '<a class="isc-lbl-act-read-list-s1" style="color:red !important;" title="' + (item["StatusByName"] == null ? '-' : item["StatusByName"]) + '">' + (item["StatusByName"] == null ? '-' : item["StatusByName"]) + '</a>';
                    }
                    html+='</div>';
                    html+='</td>';
                    html += '<td>';
                    if (UpdateCategoryEntity != null && UpdateCategoryEntity != undefined && UpdateCategoryEntity.length > 0) {
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Edit" data-Edit="AddBillCategory.aspx?EditCategoryID=' + (item["IdentityID"] == null ? '-' : item["IdentityID"]) + '"  href="AddBillCategory.aspx?EditCategoryID=' + (item["IdentityID"] == null ? '-' : item["IdentityID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                    }
                    if (deleteCategoryEntity != null && deleteCategoryEntity != undefined && deleteCategoryEntity.length > 0) {
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-DeleteCategory="' + (item["IdentityID"] == null ? '-' : item["IdentityID"]) + '" ><i class="fa fa-trash-o"></i></a>';
                    }
                    html += '</td></tr>';
                    var matchedSubCategory = GetmatchedRecord(subCategory, 'MasterGLCode', item["IdentityID"]);
                    if (matchedSubCategory != null && matchedSubCategory != undefined && matchedSubCategory.length > 0) {
                        if (matchedSubCategory != null && matchedSubCategory != undefined && matchedSubCategory.length > 0) {
                            $.each(matchedSubCategory, function (sIndex, sItem) {
                                html += '<tr class="isc-tr-show-subfiles-s1" style="display: table-row;">';
                                html += '<td></td>';
                                html += '<td>';
                                html += '<h2 title="' + (sItem["GLDescription"] == null ? '-' : sItem["GLDescription"]) + '">' + (sItem["GLDescription"] == null ? '-' : sItem["GLDescription"]) + '</h2>';
                                html += '</td>';
                                html += '<td title="' + (sItem["GLNumber"] == null ? '-' : sItem["GLNumber"]) + '">' + (sItem["GLNumber"] == null ? '-' : sItem["GLNumber"]) + '</td>';
                                html += '<td></td>';
                                html += '<td title="' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format("MM/DD/YYYY")) + '">' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format("MM/DD/YYYY")) + '</td>';
                                html += '<td title="' + (sItem["CreatedByName"] == null ? '-' : sItem["CreatedByName"]) + '">' + (sItem["CreatedByName"] == null ? '-' : sItem["CreatedByName"]) + '</td>';
                                html += '<td></td>';
                                html += '<td style="text-align: center;"></td></tr>';
                            })
                        }
                    }
                });
            }
            else {
                html+='<tr><td colspan="8">No Data Found</td></tr>'
            }
        }
        else {
            html += '<tr><td colspan="8">No Data Found</td></tr>'
        }
        $el.html(html);
    }
}

//Data Manipulation
{
    var GetCategoryListData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("Bill_Category.aspx/GetCategoryListScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeleteCategory = function () {
        var _obj = {
            'categoryID':parseInt(deleteID)
        };
        var tempList = {};
        $.when(RequestServer("Bill_Category.aspx/DeleteGLCategory", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (response > 0) {
                $('#mp_delete-Category').hide();
                deleteID = 0;
                BuildScreen();
                $.notify("Category deleted successfully !!", { position: "right top", className: "success" });
            }
            else {
                $.notify("Server error occured while deleting a Category !!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}

//Common
{
    var BindUserOptions = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst != null && lst != undefined && lst.length > 0)
        {
            var distinctlst = GetDistinctArray(lst, 'CreatedBy');
            distinctlst = ObjSorter(distinctlst, "CreatedByName", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["CreatedByName"] != null && item["CreatedByName"] != '' && item["CreatedBy"] != 0) {
                    html += '<option value="' + item["CreatedBy"] + '">' + (item["CreatedByName"] == null ? '' : item["CreatedByName"]) + '</option>';
                }
            });
        }
        $el.html(html);
        $el.select2();
    }

    var FilterCategories = function () {
        var $elcategory = $.trim($('#txt-Category').val());
        var $eladdedOn = $.trim($('#txt-AddedOn').val());
        var $eladdedBy = $('#slt-Added-By').val();
        var $elStatus = $('#slt-Status').val();
        var lstResult = [];
        if (listData != null && listData != undefined && listData.length > 0) {
            lstResult = listData;
            if ($elcategory != "" && $elcategory != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["CategoryName"] == $elcategory)
                });
            }
            if ($eladdedOn != "" && $eladdedOn != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (moment(a["CreatedOn"]).format('MM/DD/YYYY') == $eladdedOn)
                });
            }
            if ($eladdedBy != 0 && $eladdedBy != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["CreatedBy"] == $eladdedBy)
                });
            }
            if ($elStatus != "999999" && $elStatus != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["IsActive"] == $elStatus)
                });
            }
        }
        return lstResult;
    }
}
//Import
{
    //Events
    {
        $(document).on('change', '#GL-file', function (e) {
            e.preventDefault();
            ProcessExcelData();

        });

        $(document).on('click', '#btn-Save-ExcelData', function () {
            
            if (excelSaveData.length > 0) {
                SaveExcelData(excelSaveData);
                //if (isValidData) {
                //    SaveExcelData(excelSaveData);
                //}
                //else {
                //    $.notify("Please delete the invalid and duplicate GL code row(s)!!", { position: "right top", className: "error" });
                //}

            }
            else {
                $.notify("Please add the GL code for upload!!", { position: "right top", className: "error" });
            }
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
    }

    //DOM
    {
        var BindExcelData = function () {
            isValidData = true;
            excelSaveData = [];
            var html = '';
            var $el = $('#tbl-excel-Data');
            if (strExcelData.length > 0) {
                $.each(strExcelData, function (index, item) {
                   
                    if ((item["CategoryGL"] != "" || item["SubcategoryGL"] != "") && item["GLDescription"] != "") {
                        var validationMessage = '-';
                        if (ValidateData(item["GLAccNo"])) {
                            var isMasterGL = 0;
                            var masterGL = '';
                            if (item["SubcategoryGL"] == '') {
                                isMasterGL = 1;
                            }
                            else {
                                isMasterGL = '';
                                masterGL = item["CategoryGL"];
                            }
                            var cat = item["Category"];
                            var obj = {
                                
                                'ClientID': (item["ClientId"] == null || '' ? 0 : parseInt(item["ClientId"])),
                                'Category': (item["Category"] == null || '' ? '' : item["Category"]),
                                'GLNumber': (item["CategoryGL"] == null ? '' : item["CategoryGL"]),
                                'GLDescription': (item["GLDescription"] == null ? '' : item["GLDescription"]),
                                'RowStatus': 'A',
                                'CreatedBy': (item["CreatedBy"] == null ? 0 : parseInt(item["CreatedBy"])),
                                'CreatedOn': (moment().format('MM/DD/YYYY')),
                                'UpdatedOn': (moment().format('MM/DD/YYYY')),
                                'UpdatedBy': (item["CreatedBy"] == null ? 0 : parseInt(item["CreatedBy"])),
                                'SubcategoryGL': (item["SubcategoryGL"] == null ? '' : item["SubcategoryGL"])
                            }
                            excelSaveData.push(obj);
                        }
                        else {
                            isValidData = false;
                            validationMessage = 'GL Code is not valid';
                        }
                        var duplicateData = [];
                        var subCategoryDuplidate = [];
                        if (excelSaveData.length > 0) {
                            duplicateData = GetmatchedRecord(excelSaveData, 'GLNumber', item["CategoryGL"]);
                            subCategoryDuplidate = GetmatchedRecord(excelSaveData, 'GLNumber', item["SubcategoryGL"]);
                            if ((duplicateData != null && duplicateData != undefined && duplicateData.length > 1) || (subCategoryDuplidate != null && subCategoryDuplidate != undefined && subCategoryDuplidate.length > 1)) {
                                isValidData = false;
                                isExistingGL = true;
                               // validationMessage = 'GL Code is already exist';
                                validationMessage = '-';
                            }
                        }
                        html += '<tr>'
                        html += '<td title="' + (item["Category"] == null ? '' : item["Category"]) + '"><h5>' + (item["Category"] == null ? '-' : item["Category"]) + '</h5></td>'
                        html += '<td title="' + (item["CategoryGL"] == null ? '' : item["CategoryGL"]) + '"><h5>' + (item["CategoryGL"] == null ? '-' : item["CategoryGL"]) + '</h5></td>'
                        html += '<td title="' + (item["SubcategoryGL"] == null ? '' : item["SubcategoryGL"]) + '"><h5>' + (item["SubcategoryGL"] == null ? '' : item["SubcategoryGL"]) + '</h5></td>'
                        html += '<td title="' + (item["GLDescription"] == null ? '' : item["GLDescription"]) + '"><h5>' + (item["GLDescription"] == null ? '' : item["GLDescription"]) + '</h5></td>'
                        if (validationMessage == '-') {
                            html += '<td title="' + validationMessage + '"> <h5 > ' + validationMessage + ' </h5></td>'
                        }
                        else {
                            html += '<td title="' + validationMessage + '"> <h5 > ' + validationMessage + ' </h5></td>'
                          //  html += '<td title="' + validationMessage + '"> <h5 style="color:red"> ' + validationMessage + ' </h5></td>'
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

    //Data
    {
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
                            url: "CategoryImport.ashx",
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
            $.when(RequestServer("Bill_Category.aspx/InsertExcelData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    $.notify("GL Code imported successfully!!", { position: "right top", className: "success" });
                    $('#mp_bill-view').hide();
                    $('#GL-file').val('');
                    strExcelData = [];
                    excelSaveData = [];
                    $('#file-Name').html('');
                    $('#tbl-excel-Data').html('')
                    BuildScreen();
                }
                else {
                    $.notify("Server error occurred while importing GL accounts.", { position: "right top", className: "error" });
                }
            });
            return tempList;
        }
    }

    //Validation
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
}