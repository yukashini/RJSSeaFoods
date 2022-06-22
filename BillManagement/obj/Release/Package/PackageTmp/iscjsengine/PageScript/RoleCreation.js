//Global Variables
{
    var roleCreationScreenData = [];
    var editRoleID = 0;
    var roleEditDetails = [];
}

//Load and Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BindRoleCreationScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#Save-Role', function () {
        if (RoleValidation()) {
            SaveRole();
            //setTimeout(function () {
            //    window.history.back(1);
            //}, 1000);
           // history.back(1);
        }
       
    });

    $(document).on('change', '#check-All-Permission', function (e) {
        e.preventDefault();
      
        if ($(this).is(':checked')) {
            $('#acc_collapse7 input[type="checkbox"]').prop('checked', true)
            $.uniform.update('#acc_collapse7 input[type="checkbox"]')
        }
        else {
            $('#acc_collapse7 input[type="checkbox"]').prop('checked', false)
            $.uniform.update('#acc_collapse7 input[type="checkbox"]')
        }
       
    });

    $(document).on('click', '[permission-Tab]', function () {
        var entityId = $(this).attr('permission-Tab');
        if ($(this).is(':checked')) {
            $('#acc_collapse7').find('[entityId=' + entityId + ']').prop('checked', true);
            $.uniform.update('[entityId=' + entityId + ']');
        }
        else {
            $('#acc_collapse7').find('[entityId=' + entityId + ']').prop('checked', false);
            $.uniform.update('[entityId=' + entityId + ']');
            $('#check-All-Permission').prop('checked', false);
            $.uniform.update('#check-All-Permission');
        }
        var permissionCount = $('#acc_collapse7 input[entityId]').length;
        var checkedPermissions = $('#acc_collapse7 input[entityId]:checked').length;
        if (permissionCount == checkedPermissions) {
            $('#check-All-Permission').prop('checked', true);
            $.uniform.update('#check-All-Permission');

        }
        else {
            $('#check-All-Permission').prop('checked', false);
            $.uniform.update('#check-All-Permission');

        }
    });

    $(document).on('click', '#Update-Role', function () {
        if (RoleValidation()) {
            UpdateRole();
            //setTimeout(function () {
            //    window.history.back(1);
            //}, 1000);
           // history.back(1);
        }

    });

    $(document).on('change', '[entityId]', function () {
        var entityId = $(this).attr('entityId');
        var permissionCount = $('#acc_collapse7').find('[entityId=' + entityId + ']').length;
        var checkedPermissions = $('#acc_collapse7 input[entityId=' + entityId + ']:checked').length;
        if (permissionCount == checkedPermissions) {
            $('#acc_collapse7').find('[permission-Tab=' + entityId + ']').prop('checked', true);
            $.uniform.update('[permission-Tab=' + entityId + ']');
           
        }
        else {
            $('#acc_collapse7').find('[permission-Tab=' + entityId + ']').prop('checked', false);
            $.uniform.update('[permission-Tab=' + entityId + ']');
           

        }

        var permissionAllCount = $('#acc_collapse7 input[entityId]').length;
        var checkedAllPermissions = $('#acc_collapse7 input[entityId]:checked').length;
        if (permissionAllCount == checkedAllPermissions) {
            $('#check-All-Permission').prop('checked', true);
            $.uniform.update('#check-All-Permission');

        }
        else {
            $('#check-All-Permission').prop('checked', false);
            $.uniform.update('#check-All-Permission');

        }
    });

    $(document).on('change', '[data-Select]', function () {
        var $this = $(this);
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").attr('error-active', false);
    });

    $(document).on('change', '[data-text]', function () {
        var $this = $(this);
        $("span.validation-message[data-validation='" + $this.attr("data-text") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-text") + "']").attr('error-active', false);
    });

    $(document).on('click', '.fa-angle-left', function () {
        $(this).removeClass();
        $(this).addClass('fa fa-angle-down pad-rgt-5 cell-right')
    })

    $(document).on('click', '.fa-angle-down', function () {
        $(this).removeClass();
        $(this).addClass('fa fa-angle-left pad-rgt-5 cell-right')
    })

}

//DOM Manipulation
{
    var BindRoleCreationScreen = function () {
        roleCreationScreenData = GetRoleCreateionScreenData();
        BindDropDowns($('#slt-Role-Status'), $.parseJSON(roleCreationScreenData[0]["Table"]), 'Choose Status')
        BindPermissions($.parseJSON(roleCreationScreenData[1]["Table1"]));
        BindMasterRoleOptions($('#role-Name'), $.parseJSON(roleCreationScreenData[2]["Table2"]), 'Choose Role Name')
        editRoleID = ((GetQueryStrings()["roleID"] == undefined || GetQueryStrings()["roleID"] == null) ? 0 : GetQueryStrings()["roleID"]);
        $("input:checkbox").uniform();
        BindConfigs();
        if (editRoleID != 0) {
            roleEditDetails = GetRoleEditDetails();
            if (roleEditDetails != null && roleEditDetails.length > 0) {
                $('#page-Title').html('Update Role')
                $('#Save-Role').hide();
                $('#Update-Role').show();
                var roleDetails = $.parseJSON(roleEditDetails[0]["Table"]);
                BindMasterRoleOptions($('#role-Name'), $.parseJSON(roleEditDetails[2]["Table2"]), 'Choose Role Name')
                $('#role-Name').val((roleDetails[0]["MasterRoleID"] == null ? '' : roleDetails[0]["MasterRoleID"]));
                $('#role-Desc').val((roleDetails[0]["Description"] == null ? '' : roleDetails[0]["Description"]));
                $('#slt-Role-Status').val((roleDetails[0]["Status"]==null?0:roleDetails[0]["Status"]));
                $('.select2').select2();
                $('#role-Name').attr('disabled', true);
                var editPermissionList = $.parseJSON(roleEditDetails[1]["Table1"]);
                CheckEditPermissions(editPermissionList);
                CheckDivCheckBoxes();
                $("input:checkbox").uniform();
                
                if ($('#acc_collapse7 input[type="checkbox"]:checked').length == $('#acc_collapse7 input[type="checkbox"]').length) {
                   
                    $('#check-All-Permission').prop('checked', true);
                    //$("#check-All-Permission").attr("checked", "checked");
                    //$('input[type=checkbox]:checked').prop('checked', true);
                    //$('#check-All-Permission').is(':checked');
                    //$("#check-All-Permission").attr('checked', true);

                    $.uniform.update('check-All-Permission');
                }
                else {

                    $('#check-All-Permission').prop('checked', false);
                    $.uniform.update('check-All-Permission');
                }
            }
        }
        else {
            $('#slt-Role-Status').val('50040');
            $('.select2').select2();
        }
      
    }

    var BindPermissions = function (permissionList) {
        var $el = $('#acc_collapse7');
        var html = '';
        var entityList = GetDistinctArray(permissionList, 'EntityID');
        var idCount = 0;
        if (entityList != null && entityList.length > 0) {
            $.each(entityList, function (entityIndex, entityItem) {
                var tabid = 'acc_collapse' + idCount;
                idCount++;
                html += '<div class="screen-row mar-top-10">';
                html += '<div class="isc-cht-flow-cell-s1" style="margin-bottom: 0px;">';
                html += '<div class="isc-cht-flow-fill-cell-s1">';
                html += '<div class="screen-row">';
                html += '<h3 class="isc-lbl-floting-cht-s1">';
                html += '<input type="checkbox" value=0 permission-Tab=' + entityItem["EntityID"] + '>' + (entityItem["EntityName"] == null ? '-' : entityItem["EntityName"]) + '</h3>';
                html += '<a class=""> <i  data-toggle="collapse" href="#' + tabid + '" class="fa fa-angle-down pad-rgt-5 cell-right" style="padding-right:10px;margin-top:9px;cursor:pointer"></i></a>';
                html += '</div>';
                html += '</div> ';
                html += '</div>';
                html += '<div class="isc-cht-flow-cell-bdy isc-cht-flow-cell-bdy1 collapse in" id=' + tabid + ' style="height: auto;">';
                html += '<ul class="isc-list-hvr-txt-nav isc-role-crt-ul">';
                var entityActionList = GetmatchedRecord(permissionList, 'EntityID', entityItem["EntityID"]);
                entityActionList = GetDistinctArray(entityActionList, 'EntityActionID');
                if (entityActionList != null && entityActionList.length > 0) {
                    $.each(entityActionList, function (actionIndex, actionItem) {
                        html += '<li>';
                        html += '<h1><input type="checkbox" entityAction="true" entityId=' + entityItem["EntityID"] + ' value=' + actionItem["EntityActionID"] + ' entityActionID=' + actionItem["EntityActionID"] + '>' + actionItem["ActionName"] + '</h1>';
                        html += '</li>';
                    })
                }
                html += '</ul>';
                html += '</div>';
                html += '</div>';
            });
        }
        else {
            html = '';
        }
        $el.html(html)
    }

    var CheckEditPermissions = function (permissionList) {
        if (permissionList.length > 0) {
            $.each(permissionList, function (permissionIndex, permissionItem) {
                $('#acc_collapse7').find('[entityActionID=' + permissionItem["EntityActionID"] + ']').prop('checked', true);
                if (parseInt(permissionItem["EntityActionID"]) == 3022) {
                    $('#acc_collapse7').find('[entityActionID=' + 3022 + ']').parents('li').show();
                }
                if (parseInt(permissionItem["EntityActionID"]) == 3006) {
                    $('#acc_collapse7').find('[entityActionID=' + 3006 + ']').parents('li').show();
                }

            });
        }
    }
    
    var CheckDivCheckBoxes = function () {
        var entityList = GetDistinctArray($.parseJSON(roleCreationScreenData[1]["Table1"]), 'EntityID');
        if (entityList != null && entityList.length > 0) {
            $.each(entityList, function (index, item) {
                var permissionCount = $('#acc_collapse7').find('[entityId=' + item["EntityID"] + ']').length;
                var checkedPermissions = $('#acc_collapse7 input[entityId=' + item["EntityID"] + ']:checked').length;
                if (permissionCount == checkedPermissions) {
                    $('#acc_collapse7').find('[permission-Tab=' + item["EntityID"] + ']').prop('checked', true);
                }
                else {
                    $('#acc_collapse7').find('[permission-Tab=' + item["EntityID"] + ']').prop('checked', false);
                }
            });
        }
    }
}

//Data Manipulation
{
    var GetRoleCreateionScreenData = function () {
        var _obj = {
           
        };
        var tempList = {};
        $.when(RequestServer("RoleCreation.aspx/GetCreateRoleScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var SaveRole = function () {
       
        var masterRoleID = $('#role-Name').val();
        var roleName = $('#role-Name option:selected').text();
        var description = $('#role-Desc').val();
        var status = $('#slt-Role-Status').val();
        var checkedPermissions = $('#acc_collapse7 input[type="checkbox"]:checked');
        var permissionList = [];
        if (checkedPermissions.length > 0) {
            $.each(checkedPermissions, function (permissionIndex, permissionItem) {
                if ($(permissionItem).val() != "0") {
                    var obj = {
                        'EntityActionID': parseInt($(permissionItem).val()),
                    }
                    permissionList.push(obj);
                }
               
            })
        }
        var roleObj = [];
        var objRole = {
            'RoleName': roleName,
            'Description': description,
            'Status': parseInt(status),
            'MasterRoleID': parseInt(masterRoleID),
            'lstEntityActions':permissionList
        }
        roleObj.push(objRole);
        var _obj = {
            'CustomRole': roleObj
        };
        var tempList = {};
        $.when(RequestServer("RoleCreation.aspx/InsertApllicationRole", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Role created successfully!!", { position: "right top", className: "success" });
                GoBack();
            }
            else {
                $.notify("Server error occured while creating a role!!", { position: "right top", className: "error" });
            }
           // $.notify("Role Created Successfully!", { position: "right top", className: "success" });
        });
        return tempList;
    }

    var GetRoleEditDetails = function () {
        var _obj = {
            'editRoleID':editRoleID
        };
        var tempList = {};
        $.when(RequestServer("RoleCreation.aspx/GetRoleEditDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateRole = function () {
       // var masterRoleID = $('#role-Name').val();
        var roleName = $('#role-Name option:selected').text();
        var description = $('#role-Desc').val();
        var status = $('#slt-Role-Status').val();
        var checkedPermissions = $('#acc_collapse7 input[type="checkbox"]:checked');
        var permissionList = [];
        if (checkedPermissions.length > 0) {
            $.each(checkedPermissions, function (permissionIndex, permissionItem) {
                if ($(permissionItem).val() != "0") {
                    var obj = {
                        'EntityActionID': parseInt($(permissionItem).val()),
                    }
                    permissionList.push(obj);
                }

            })
        }
        var roleObj = [];
        var objRole = {
            'RoleID':parseInt(editRoleID),
            'RoleName': roleName,
            'Description': description,
            'Status': parseInt(status),
           // 'MasterRoleID':
            'lstEntityActions': permissionList
        }
        roleObj.push(objRole);
        var _obj = {
            'CustomRole': roleObj
        };
        var tempList = {};
        $.when(RequestServer("RoleCreation.aspx/UpdateApllicationRole", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Role updated successfully!!", { position: "right top", className: "success" });
                GoBack();
            }
            else {
                $.notify("Server error occured while updating a role!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var GetRolesAddedUserCount = function () {
        var _obj = {
            'roleID': parseInt(editRoleID)
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

    var BindMasterRoleOptions = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'MasterRoleID');
            distinctlst = ObjSorter(distinctlst, "MasterRoleName", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["MasterRoleID"] + '">' + (item["MasterRoleName"] == null ? '-' : item["MasterRoleName"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var RoleValidation = function () {
        var isValid = true;
        var roleName = $('#role-Name').val();
        var description = $('#role-Desc').val();
        var status = $('#slt-Role-Status').val();
        
        if (roleName == "0" || roleName == null) {
            isValid = false;
            $('#role-Name-Validation').show();
            //$.notify("Role name should not be empty!", { position: "right top", className: "error" });
        }

        if (description == "" || description == null) {
            isValid = false;
            $('#description-Validation').show();
            //$.notify("Description should not be empty!", { position: "right top", className: "error" });
        }

        if (status == "" || status == '0') {
            isValid = false;
            $('#status-Validation').show();
            //$.notify("Status should not be empty!", { position: "right top", className: "error" });
        }

        if (editRoleID != 0 && status == "50041") {           
            var rolesAddedUsers = GetRolesAddedUserCount();
            rolesAddedUsers = $.parseJSON(rolesAddedUsers[0]["Table"]);
            if (rolesAddedUsers != null && rolesAddedUsers.length > 0) {
                var roleAssingnedUsers = rolesAddedUsers[0]["AssignedUserCount"];
                if (parseInt(roleAssingnedUsers) > 0) {
                    isValid = false;
                    $('#status-Inactive-Validation').show();
                }
            }
          

        }
                
        return isValid;
    }

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 3000);
    }

    var BindConfigs = function () {
        
        if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0) {
            if (clientConfigurations[0]["IsBillExportEnabled"] == "1") {
                $('#acc_collapse7').find('[entityActionID=' + 3022 + ']').parents('li').show();
            }
            else {
                $('#acc_collapse7').find('[entityActionID=' + 3022 + ']').parents('li').hide();
            }
            if (clientConfigurations[0]["IsEpaymentsEnabled"] == "1") {
                $('#acc_collapse7').find('[entityActionID=' + 3006 + ']').parents('li').show();
            }
            else {
                $('#acc_collapse7').find('[entityActionID=' + 3006 + ']').parents('li').hide();
            }
           
        }
    }
}