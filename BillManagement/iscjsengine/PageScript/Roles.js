//Global Variables
{
    var roleScreenData = [];
    var roleActions = [];
    var isAddRole=[];
    var isUpdateRole=[];
    var isDeleteRole = [];
    var deleteRoleId = 0;
    var roles = [];
    var filteredList = [];
    var deleteMasterRoleID = 0;
    var deleteMasterRolename = '';

}

//Load and Events
{
    $(document).ready(function () {
       
        $loading.show();
        setTimeout(function () {
            BindRoleScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#Btn_serch', function () {
       
        filteredList = filterRoles();
        BindRoles(filteredList);
    })

    $(document).on('click', '#btn_Reset', function () {
       
         
        $('#slt-Roles option[value="0"]').prop('selected', 'selected').change();
        $('#slt-Role-Status option[value="0"]').prop('selected', 'selected').change();
         filteredList = filterRoles();
        BindRoles(filteredList);
          
    })

    $(document).on('click', '[role-Delete]', function () {
        deleteRoleId = $(this).attr('role-Delete');
        deleteMasterRoleID = $(this).attr('master-RoleID')
        deleteMasterRolename = $(this).attr('master-Rolename')
        
        if (deleteRoleId != undefined) {
            deleteRoleId = parseInt(deleteRoleId);
            var rolesAddedUsers = GetRolesAddedUserCount(deleteRoleId);
            rolesAddedUsers = $.parseJSON(rolesAddedUsers[0]["Table"]);
            if (rolesAddedUsers != null && rolesAddedUsers.length > 0) {
                var roleAssingnedUsers = rolesAddedUsers[0]["AssignedUserCount"];
                if (parseInt(roleAssingnedUsers) > 0) {
                    $('#role-Delete-Ok').hide();
                    $('#role-Delete-Cancel').hide();
                    $('#Delete-Cancel').show();
                    $('#delete-msg').html('Before you deleting a role, remove users associated to the role');
                }
                else {
                    $('#Delete-Cancel').hide();
                    $('#role-Delete-Ok').show();
                    $('#role-Delete-Cancel').show();
                    $('#delete-msg').html('Are you sure you want to delete the role?');
                }
            }
            $('#mp_delete_Role').show();
        }
    });

    $(document).on('click', '[role-Delete-Cancel]', function () {
        $('#mp_delete_Role').hide();
    });

    $(document).on('click', '#role-Delete-Ok', function () {
        
        DeleteRole();
        $.notify("Role deleted successfully!", { position: "right top", className: "success" });
        BindRoleScreen();
        $('#mp_delete_Role').hide();
    });

    $(document).on('click', 'th[data-sort]', function (e) {
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
                $('#roles-Table th[sort-column-Type]').removeClass('headerSortDown');
                $('#roles-Table th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = filteredList

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
                BindRoles(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });
}

//DOM Manipulation
{
    var BindRoleScreen = function () {
        roleScreenData = GetRoleScreenData();
        roleActions = $.parseJSON(roleScreenData[2]["Table2"]);
        BindDropDowns($('#slt-Role-Status'), $.parseJSON(roleScreenData[0]["Table"]), 'Choose Status')
        BindRolesOptions($('#slt-Roles'), $.parseJSON(roleScreenData[1]["Table1"]), 'Choose Role Name')
        if (roleActions != null && roleActions.length > 0)
        {
            var isAddRole = GetmatchedRecord(roleActions, "EntityActionID", "3009");
            isUpdateRole = GetmatchedRecord(roleActions, "EntityActionID", "3010");
            isDeleteRole = GetmatchedRecord(roleActions, "EntityActionID", "3011");
            if (isAddRole.length > 0) {
                $('#btn-Add-Role').show();
            }
            else {
                $('#btn-Add-Role').hide();
            }
        }
        else {
            $('#btn-Add-Role').hide();
        }
        roles = $.parseJSON(roleScreenData[1]["Table1"]);
        if (roles.length == 4) {
            $('#btn-Add-Role').hide();
        }
        else {
            $('#btn-Add-Role').show();
        }
        filteredList = roles;
        BindRoles(roles);
    }

    var BindRoles = function (roles) {
       
        var $el = $('#tbl-Roles-Body');
        var html = '';
        if (roles.length > 0) {
            $.each(roles, function (roleIndex, roleItem) {
                html += '<tr>';
                html += '<td>';
                html += '<h5 title="' + (roleItem["RoleName"] == null ? '-' : roleItem["RoleName"]) + '">' + (roleItem["RoleName"] == null ? '-' : roleItem["RoleName"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + (roleItem["Description"] == null ? '-' : roleItem["Description"]) + '">' + (roleItem["Description"] == null ? '-' : roleItem["Description"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<div class="isc-td-inline-status-ch-s1 ">';
                if (roleItem["Status"] == "50040") {
                    html += '<a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove" title="' + (roleItem["StrStatus"] == null ? ' - ' : roleItem["StrStatus"]) + '" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">' + (roleItem["StrStatus"] == null ? ' - ' : roleItem["StrStatus"]) + '</a>';
                }
                else {
                    html += '<a class="isc-lbl-act-read-list-s1 isc-inactive-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="' + (roleItem["StrStatus"] == null ? ' - ' : roleItem["StrStatus"]) + '">' + (roleItem["StrStatus"] == null ? ' - ' : roleItem["StrStatus"]) + '</a>';
                }
                //html+='<ul class="dropdown-menu">';
                //html+='<li><a href="#" class="isc-wrk-flw-sta-aprove">Active</a></li>';
                //html+='<li><a href="#" class="isc-inactive-clr">Inactive</a></li>';
                //html+='</ul>';
                html += '</div>';
                html += '</td>';
                html += '<td style="text-align: center;">';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Edit" href="RoleCreation.aspx?roleID=' + roleItem["RoleID"] + ' " role-Edit=' + roleItem["RoleID"] + '><i class="fa fa-pencil-square-o"></i></a>';
                //if (isUpdateRole.length > 0) {
                //    if (roleItem["MasterRoleID"] != '1001') {
                //        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Edit" href="RoleCreation.aspx?roleID=' + roleItem["RoleID"] + ' " role-Edit=' + roleItem["RoleID"] + '><i class="fa fa-pencil-square-o"></i></a>';
                //    }
                   
                //}
                if (isDeleteRole.length > 0) {
                    if (roleItem["MasterRoleID"] != '1001') {
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" master-Rolename=' + roleItem["RoleName"] + '  master-RoleID=' + roleItem["MasterRoleID"] + ' role-Delete=' + roleItem["RoleID"] + ' href="#mp_delete" data-toggle="modal"><i class="fa fa-trash-o"></i></a>';
                    }
                 
                }

                html += '</td>';
                html += '</tr>';
            })
        }
        else {
            html += '<tr style="width:100%"><td colspan="4" style=text-align:center;>No Data Found</td></tr>';
        }
        $el.html(html);
        
    }

}

//Data Manipulation
{
    var GetRoleScreenData = function () {
        var _obj = {
            'roleID': roleId
        };
        var tempList = {};
        $.when(RequestServer("Roles.aspx/GetRoleScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeleteRole = function () {
        var _obj = {
            'roleID': deleteRoleId,
            'deleteMasterRoleID': parseInt(deleteMasterRoleID),
            'roleName': deleteMasterRolename
        };
        var tempList = {};
        $.when(RequestServer("Roles.aspx/DeleteRole", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetRolesAddedUserCount = function () {
        var _obj = {
            'roleID': deleteRoleId
        };
        var tempList = {};
        $.when(RequestServer("Roles.aspx/GetRolesAddedUserCount", _obj)).done(function (response) {
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

    var filterRoles = function () {
        var $elRoles = $('#slt-Roles').val();
        var $elStatus = $('#slt-Role-Status').val();
       
        var lstResult = [];
        if ($.parseJSON(roleScreenData[1]["Table1"]).length > 0) {
            lstResult = $.parseJSON(roleScreenData[1]["Table1"]);;

            if ($elRoles != 0 && $elRoles != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["RoleID"] == $elRoles)
                });
            }

            if ($elStatus != 0 && $elStatus != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["Status"] == $elStatus)
                });
            }

        }
        return lstResult;
    }

}