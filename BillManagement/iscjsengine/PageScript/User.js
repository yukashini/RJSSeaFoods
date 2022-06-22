//Global Variables
{
    var userScreenList = [];
    var roleActions = [];
    var isAddUser = [];
    var isUpdateUser = [];
    var isDeleteUser = [];
    var deleteUserId = 0;
    var filteredUsers = [];
    var dataAllCount = 0;
    var deletedusername = "";
}

//Load & Events
{
    $(document).ready(function () {
       
        $loading.show();
        setTimeout(function () {
           
            BindUserScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#Btn_serch', function () {
        //filteredUsers = filterUsers();
        //BindUsersList(filteredUsers);
        BindUserList();
    });

    $(document).on('click', '#btn_Reset', function () {


        $('#slt-Role option[value="0"]').prop('selected', 'selected').change();
        $('#slt-Status option[value="0"]').prop('selected', 'selected').change();
        $('#slt-User option[value="0"]').prop('selected', 'selected').change();
         //filteredUsers = filterUsers();
        //BindUsersList(filteredUsers);
        BindUserList();

    });

    $(document).on('click', 'th[data-sort-user]', function (e) {
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
                $('#tbl-User th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-User th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#roles-Table th[sort-column-Type]').removeClass('headerSortDown');
                $('#roles-Table th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#roles-Table th[sort-column-Type]').removeClass('headerSortDown');
                $('#roles-Table th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = filteredUsers

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
                BindUsersList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[user-Delete]', function () {
        
        deleteUserId = $(this).attr('user-Delete');
        deletedusername = $(this).attr('user-deletename');
        if (deleteUserId != undefined) {
            deleteUserId = parseInt(deleteUserId);
            $('#mp_delete_user').show();
        }
    });

    $(document).on('click', '[user-Delete-Cancel]', function () {
        $('#mp_delete_user').hide();
    });

    $(document).on('click', '#user-Delete-Ok', function () {

        DeleteUser();
        $.notify("User inactivated successfully!", { position: "right top", className: "success" });
        BindUserScreen();
        $('#mp_delete_user').hide();
    });
}

//Dom Manipulation
{
    var BindUserScreen = function () {
        userScreenList = GetUserScreenData();
        roleActions = $.parseJSON(userScreenList[3]["Table3"]);
        BindDropDowns($('#slt-Status'), $.parseJSON(userScreenList[0]["Table"]), 'Choose Status')
        BindRolesOptions($('#slt-Role'), $.parseJSON(userScreenList[1]["Table1"]), 'Choose Role Name')
        BindUserOptions($('#slt-User'), $.parseJSON(userScreenList[2]["Table2"]), 'Choose User Name')
        $('.select2').select2();
       
        if (roleActions != null && roleActions.length > 0) {
            var isAddUser = GetmatchedRecord(roleActions, "EntityActionID", "3012");
            isUpdateUser = GetmatchedRecord(roleActions, "EntityActionID", "3013");
            isDeleteUser = GetmatchedRecord(roleActions, "EntityActionID", "3014");
            if (isAddUser.length > 0) {
                $('#btn-Add-User').show();
            }
            else {
                $('#btn-Add-User').hide();
            }
        }
        else {
            $('#btn-Add-User').hide();
        }
        BindUserList();
        //filteredUsers = $.parseJSON(userScreenList[2]["Table2"]);
        //BindUsersList($.parseJSON(userScreenList[2]["Table2"]));
    };

    var BindUsersList = function (userList) {
      
        var $el = $('#tbl-User-Body');
        var html = '';
        if (userList != null && userList.length > 0) {
            $.each(userList, function (userIndex, userItem) {
                if (userItem["FirstName"] != null && userItem["FirstName"] != '')
                {
                html+='<tr>';
                html+='<td>';
                html += '<h5 title="' + ((userItem['FirstName'] == null ? '-' : userItem['FirstName']) + " " + (userItem['LastName'] == null ? '-' : userItem['LastName'])) + '">' + ((userItem['FirstName'] == null ? '-' : userItem['FirstName']) + " " + (userItem['LastName'] == null ? '-' : userItem['LastName'])) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5 title="' + (userItem['RoleName'] == null ? '-' : userItem['RoleName']) + '">' + (userItem['RoleName'] == null ? '-' : userItem['RoleName']) + '</h5>';
                html+='</td>';
                html+='<td>';
                    html += '<h5 title="' + (userItem['PrimaryEmailID'] == null ? '-' : userItem['PrimaryEmailID']) + '">' + (userItem['PrimaryEmailID'] == null ? '-' : userItem['PrimaryEmailID']) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5 title="' + (userItem['PhoneNumber'] == null ? '-' : userItem['PhoneNumber']) + '">' + (userItem['PhoneNumber'] == null ? '-' : userItem['PhoneNumber']) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<div class="isc-td-inline-status-ch-s1 ">';
                if (userItem["IsActive"] == "50042") {
                    html += '<a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Active</a>';
                }
                else {
                    html += '<a class="isc-lbl-act-read-list-s1 isc-inactive-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Inactive</a>';
                }
                //html += '<ul class="dropdown-menu">';
                //html+='<li><a href="#" class="isc-wrk-flw-sta-aprove">Active</a></li>';
                //html+='<li><a href="#" class="isc-inactive-clr">Inactive</a></li>';
                //html+='</ul>';
                html+='</div>';
                html+='</td>';
                html += '<td style="text-align: center;">';
                if (isUpdateUser.length > 0) {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Edit" href="UserCreation.aspx?userID=' + userItem["AccountID"] + ' " ><i class="fa fa-pencil-square-o"></i></a>';
                }
                    if (isDeleteUser.length > 0) {
                        
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Inactivate" user-Delete=' + userItem["AccountID"] + ' user-deletename=' + userItem['FirstName'] + " " + userItem['LastName'] + ' ><i class="fa fa-trash-o"></i></a>';
                }
                //html+='<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="UserCreation.aspx"><i class="fa fa-pencil-square-o"></i></a>';
                //html+='<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>';
                html+='</td>';
                html += '</tr>';

                }
            });
        }
        else {
            html += '<tr><td colspan="7" style="text-align:center;">No Data Found<td></tr>';
        }
        $el.html(html);
    }
}

//Data Manipulation
{
    var GetUserScreenData = function () {
        var _obj = {
            'roleID': roleId
        };
        var tempList = {};
        $.when(RequestServer("User.aspx/GetUserScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeleteUser = function () {
        var _obj = {
            'userID': deleteUserId,
            'userName': deletedusername
        };
        var tempList = {};
        $.when(RequestServer("User.aspx/DeleteUser", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{
    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var BindRolesOptions = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'RoleID');
            distinctlst = ObjSorter(distinctlst, "RoleName", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["RoleID"] + '">' + (item["RoleName"] == null ? '-' : item["RoleName"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var BindUserOptions = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'AccountID');
            distinctlst = ObjSorter(distinctlst, "FirstName", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["FirstName"] != null && item["FirstName"] != '') {
                    html += '<option value="' + item["AccountID"] + '">' + ((item['FirstName'] == null ? '-' : item['FirstName']) + " " + (item['LastName'] == null ? '-' : item['LastName'])) + '</option>';
                }
               


            });
        }
        $el.html(html);
    }

    var filterUsers = function () {
        var $elRoles = $('#slt-Role').val();
        var $elStatus = $('#slt-Status').val();
        var $user = $('#slt-User').val();

        var lstResult = [];
        if ($.parseJSON(userScreenList[2]["Table2"]).length > 0) {
            lstResult = $.parseJSON(userScreenList[2]["Table2"]);;

            if ($elRoles != 0 && $elRoles != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["ApplicationRole"] == $elRoles)
                });
            }

            if ($elStatus != 0 && $elStatus != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["IsActive"] == $elStatus)
                });
            }

            if ($user != 0 && $user != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["AccountID"] == $user)
                });
            }

        }
        return lstResult;
    }

}

//BindVendorList With Pagination
{
    var BindUserList = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-User').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "User.aspx/GetUserDataList",
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
                    json.data = common.AUF(objData['UserList']);
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
                        html += '<h5 >' + ((data['FirstName'] == null ? '-' : data['FirstName']) + " " + (data['LastName'] == null ? '-' : data['LastName'])) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '15%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data['RoleName'] == null ? '-' : data['RoleName']) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '26%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 title="' + (data['UserName'] == null ? '-' : data['UserName']) + '">' + (data['UserName'] == null ? '-' : data['UserName']) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '19%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["PhoneNumber"] == null || data["PhoneNumber"] == '' ? '-' : data["PhoneNumber"]) + '</h5>';
                        
                        return html;
                    }
                },

                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        if (data["IsActive"] == "50042") {
                            html += '<a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Active</a>';
                        }
                        else {
                            html += '<a class="isc-lbl-act-read-list-s1 isc-inactive-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Inactive</a>';
                        }
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        
                        html += '<div style="text-align: center;">';
                        if (isUpdateUser.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Edit" href="UserCreation.aspx?userID=' + data["AccountID"] + ' " ><i class="fa fa-pencil-square-o"></i></a>';
                        }
                        if (isDeleteUser.length > 0) {

                            html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Inactivate" user-Delete=' + data["AccountID"] + ' user-deletename=' + data['FirstName'] + " " + data['LastName'] + '><i class="fa fa-trash-o"></i></a>';
                        }
                        html += '</div>';
                        return html;
                    }
                },


            ],
            "drawCallback": function (settings) {
              
            },
            "fnDrawCallback": function () {
                if (dataAllCount > 10) {
                    $('.dataTables_paginate').show();
                }
                else {
                    $('.dataTables_paginate').hide();
                }

                $('#tbl-User tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            }
        });

    }

    var ConfigurePaginationModel = function (objModel) {

        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.UserID = $('#slt-User').val();
        obj.ApplicationRole = $('#slt-Role').val();
        obj.Status = $('#slt-Status').val();
        var _obj = {};
        _obj = { "userFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "FirstName " + direction;
                break;
            case 1:
                orderBy = "RoleName " + direction;
                break;
            case 2:
                orderBy = "UserName " + direction;
                break;
            case 3:
                orderBy = "PhoneNumber " + direction;
                break;
            case 4:
                orderBy = "StrStatus " + direction;
                break;

        }
        return orderBy;
    }
}