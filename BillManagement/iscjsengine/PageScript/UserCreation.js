//Global Variables
{
    var userCreationMasterData = [];
    var editUserID = 0;
    var userEditDetails=[];

}

//Load & Events
{
    $(document).ready(function () {
     
        $loading.show();
        setTimeout(function () {
            BindUserCreationScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('change', '#slt-Role', function () {
        var selectedRole = parseInt($(this).val());
        var masterRole = $('option:selected', this).attr('data-master-role');
       // var masterRole = $(this).find('[data-master-role]').attr('data-master-role');
        if (selectedRole != 0) {
            var rolePermission = GetPermissions(selectedRole);
            BindPermissions($.parseJSON(rolePermission[0]['Table']));
        }
        else {
            $('#acc_collapse1').html('');
        }
        if (masterRole == '1002') {
            $('#default-Div').show();
            $('#is-Default-Accountant').prop('checked', false);
            $("#is-Default-Accountant").uniform();
            $.uniform.update('#is-Default-Accountant');
        }
        else {
            $('#default-Div').hide();
        }
    });

    $(document).on('click', '#Save-User', function () {
        
        if (UserValidation() && $("span[error-active='true']").length == 0) {
            SaveUser();
            
            //setTimeout(function () {
            //    window.history.back(1);
            //}, 1000);
            //$.notify("User saved successfully!", { position: "right top", className: "success" });
        }

    });

    $(document).on('click', '#Update-User', function () {
        if (UserValidation() && $("span[error-active='true']").length == 0) {
            UpdateUser();
            
            //setTimeout(function () {
            //    window.history.back(1);
            //}, 1000);
            //$.notify("User saved successfully!", { position: "right top", className: "success" });
           // window.history.back(1)
           // history.back(1);
        }
    })

    $(document).on('change', '[data-Email]', function () {
        var $this = $(this);
        var contact = $this.attr('data-Email');
        var VAL = $this.val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var emailFirstCharacter = VAL.charAt(0);
        if (VAL != '') {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!mailformat.test(VAL)) {

                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").show();
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', true);
            }
            else {
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").hide();
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', false);
            }
        }
        else {
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', false);
        }
        if (VAL != '' && emailFirstCharacter == '_') {
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").show();
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', true);
        }
        if (VAL != '') {
            $('#email-Validation').hide();
        }

    });

    $(document).on('change', '[data-textbox]', function () {
        var $this = $(this);
        var VAL = $this.val();
        var pattern = /^[a-zA-Z' ]*$/
       
        if (!pattern.test(VAL)) {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").show();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', true);
        } else {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }
        if ($this.attr("data-textbox") == "firstName" && VAL != '') {
            $('#first-Name-Validation').hide();
        }
        if ($this.attr("data-textbox") == "lastName" && VAL != '') {
            $('#last-Name-Validation').hide();
        }

    });

    $(document).on('change', '[data-Phone]', function () {
        var $this = $(this);
       
        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").attr('error-active', false);
        
    });

    $(document).on('change', '[data-Select]', function () {
        var $this = $(this);
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").attr('error-active', false);
    });

    $(document).on('click', '.fa-angle-left', function () {
        $(this).removeClass();
        $(this).addClass('fa fa-angle-down pad-rgt-5 cell-right')
    });

    $(document).on('click', '.fa-angle-down', function () {
        $(this).removeClass();
        $(this).addClass('fa fa-angle-left pad-rgt-5 cell-right')
    });

    $(document).on('change', '#is-Default-Accountant', function () {
       
        if ($('#is-Default-Accountant').prop('checked')) {
            var users = $.parseJSON(userCreationMasterData[2]["Table2"])
            if (editUserID == 0) {
                //if()
               
                if (users != null && users.length > 0) {
                    var matchedUserRecord = GetmatchedRecord(users, 'IsDefaultAccountant', '1');
                    if (matchedUserRecord != null && matchedUserRecord.length > 0)
                    {
                        $('#mp_change-Default').show();
                    }
                }
               
            }
            else {
                if (users != null && users.length > 0) {
                    var lstNonCurrentUsers = GetunmatchedRecord(users, 'AccountID', parseInt(editUserID));
                    var matchedRecord = GetmatchedRecord(lstNonCurrentUsers, 'IsDefaultAccountant', '1');
                    if (matchedRecord != null && matchedRecord.length > 0) {
                        $('#mp_change-Default').show();
                    }
                }
            }
        }
        
       
    });

    $(document).on('click', '[ChangeDefault-Cancel]', function () {
        //  $('#is-Default-Accountant').attr('checked', false);
        $('#is-Default-Accountant').prop('checked', false).uniform('refresh');
        $('#mp_change-Default').hide();
    });

    $(document).on('click', '#btn-ChangeDefault-OK', function () {
        $('#mp_change-Default').hide();
    })
}

//Dom Manipulation
{
    var BindUserCreationScreen = function () {
        userCreationMasterData = GetUserCreationMasterData();
        BindDropDowns($('#slt-Status'), $.parseJSON(userCreationMasterData[0]["Table"]), 'Choose Status')
        BindRolesOptions($('#slt-Role'), $.parseJSON(userCreationMasterData[1]["Table1"]), 'Choose Role Name')
        //$('[phone-Number]').mask('+0 (000) 000-0000');
        $('[phone-Number]').mask('#');
        editUserID = ((GetQueryStrings()["userID"] == undefined || GetQueryStrings()["userID"] == null) ? 0 : GetQueryStrings()["userID"]);
        if (editUserID != 0) {
            $('#page-Title').html('Update User')
            $('#Save-User').hide();
            $('#Update-User').show();
            userEditDetails = GetUserEditDetails();
            var editValues = $.parseJSON(userEditDetails[0]["Table"]);
            var permissions = $.parseJSON(userEditDetails[1]["Table1"]);
            $('#first-Name').val((editValues[0]["FirstName"] == null ? '' : editValues[0]["FirstName"]));
            $('#last-Name').val((editValues[0]["LastName"]==null?'':editValues[0]["LastName"]));
            $('#slt-Role').val((editValues[0]["ApplicationRole"] == null ? 0 : editValues[0]["ApplicationRole"]));
            $('#email-Id').val((editValues[0]["PrimaryEmailID"] == null ? '' : editValues[0]["PrimaryEmailID"]));
            $('#phone-Number').val((editValues[0]["PhoneNumber"] == null ? '' : editValues[0]["PhoneNumber"]));
            $('#slt-Status').val((editValues[0]["IsActive"] == null ? 0 : editValues[0]["IsActive"]));
            $('#User-Name').val((editValues[0]["UserName"] == null ? 0 : editValues[0]["UserName"]));
            $('#Password').val((editValues[0]["Password"] == null ? 0 : editValues[0]["Password"]));
            $('#CPassword').val((editValues[0]["Password"] == null ? 0 : editValues[0]["Password"]));
            $('.select2').select2();
            if (permissions != null && permissions.length > 0) {
                BindPermissions(permissions);
            }

            var selectedMasterRole = $('#slt-Role option:selected').attr('data-master-role');
          
            if (selectedMasterRole == '1002') {
                $('#default-Div').show();
                if (editValues[0]["IsDefaultAccountant"] == '1')
                {
                    $('#is-Default-Accountant').prop('checked', true);
                    $("#is-Default-Accountant").uniform();
                    $.uniform.update('#is-Default-Accountant');
                }
                else {
                    $('#is-Default-Accountant').prop('checked', false);
                    $("#is-Default-Accountant").uniform();
                    $.uniform.update('#is-Default-Accountant');
                }
               
            }
            else {
                $('#default-Div').hide();
            }
        }
        else {
            $('#slt-Status').val('50042');
            $('.select2').select2();
        }
    }

    var BindPermissions = function (permissionList) {
        var $el = $('#acc_collapse1');
        var html = '';
       
       
        var idCount = 3;
        if (permissionList != null && permissionList.length > 0) {
            var entityList = GetDistinctArray(permissionList, 'EntityID');
            $.each(entityList, function (entityIndex, entityItem) {
                var tabid = 'acc_collapse' + idCount;
                idCount++;
                html += '<div class="screen-row mar-top-10">';
                html += '<div class="isc-cht-flow-cell-s1" style="margin-bottom: 0px;">';
                html += '<div class="isc-cht-flow-fill-cell-s1">';
                html += '<div class="screen-row">';
                html += '<h3 class="isc-lbl-floting-cht-s1">';
                html += '' + (entityItem["EntityName"] == null ? '-' : entityItem["EntityName"]) + '</h3>';
                html += '<a  class="" style="cursor:pointer"> <i  data-toggle="collapse" class="fa fa-angle-down pad-rgt-5 cell-right"  href="#' + tabid + '" style="padding-right:10px;margin-top:9px;"></i></a>';
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
                        html += '<h1>' + actionItem["ActionName"] + '</h1>';
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
}

//Data Manipulation
{
    var GetUserCreationMasterData = function () {
        var _obj = {
           
        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/GetUserCreateScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetPermissions = function (selectedRole) {
        var _obj = {
            'selectedRole': selectedRole
        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/GetRolePermissions", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var SaveUser = function () {
        var selectedMasterRole = $('#slt-Role option:selected').attr('data-master-role');
        var defaultAccountant = 0;
        if (selectedMasterRole == '1002' && $('#is-Default-Accountant').is(':checked')) {
            defaultAccountant = 1;
        }
        else {
            defaultAccountant = 0;
        }

        var userObj = {
            'FirstName': $('#first-Name').val(),
            'LastName': $('#last-Name').val(),
            'UserName': $('#User-Name').val(),
            'ApplicationRole': parseInt($('#slt-Role').val()),
            'PrimaryEmailID': $('#email-Id').val(),
            'PhoneNumber': $('#phone-Number').val(),
            'IsActive': parseInt($('#slt-Status').val()),
            'RoleNameText': $('#slt-Role :selected').text(),
            'IsDefaultAccountant': defaultAccountant,
            'Password': $('#Password').val(),
            //'Cpassword': $('#CPassword').val(),
        }

        var _obj = {
            'CustomUser': userObj
        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/InsertApllicationUser", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("User created successfully!!", { position: "right top", className: "success" });
                GoBack();
            }
            else {
                $.notify("Server error occured while creating a user!!", { position: "right top", className: "error" });
            }
           
        });
        return tempList;
    }
    
    var GetUserEditDetails = function () {
        var _obj = {
            'userID':parseInt(editUserID)
        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/GetUserEditData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateUser = function () {
       
        var selectedMasterRole = $('#slt-Role option:selected').attr('data-master-role');
        var defaultAccountant = 0;
        if (selectedMasterRole == '1002' && $('#is-Default-Accountant').is(':checked')) {
            defaultAccountant = 1;
        }
        else {
            defaultAccountant = 0;
        }
        var userObj = {
            'FirstName': $('#first-Name').val(),
            'LastName': $('#last-Name').val(),
            'UserName': $('#User-Name').val(),
            'ApplicationRole': parseInt($('#slt-Role').val()),
            'PrimaryEmailID': $('#email-Id').val(),
            'PhoneNumber': $('#phone-Number').val(),
            'IsActive': parseInt($('#slt-Status').val()),
            'RoleNameText': $('#slt-Role :selected').text(),
            'Password': $('#Password').val(),
            //'Cpassword': $('#CPassword').val(),
            'IsDefaultAccountant': defaultAccountant,
            'AccountID': parseInt(editUserID)
        }

        var _obj = {
            'CustomUser': userObj
        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/UpdateApplicationUser", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("User updated successfully!!", { position: "right top", className: "success" });
                GoBack();
            }
            else {
                $.notify("Server error occured while updating a user!!", { position: "right top", className: "error" });
            }
            //$.notify("User updated successfully!", { position: "right top", className: "success" });
        });
        return tempList;
    }

    var GetUserNames = function () {
        var userObj = {
           
        }

        var _obj = {
          
        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/GetApplicationUsersNames", _obj)).done(function (response) {
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

                html += '<option data-master-role="' + (item["MasterRoleID"] == null ? '0' : item["MasterRoleID"]) + '" value="' + (item["RoleID"] == null ? '0' : item["RoleID"]) + '">' + (item["RoleName"] == null ? '-' : item["RoleName"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 3000);
    }

    var UserValidation = function () {
      
        var isValid = true;
        var firstName = $.trim($('#first-Name').val());
        var lastName = $.trim($('#last-Name').val());
        var UserName = $.trim($('#User-Name').val());
        var role = $('#slt-Role').val();
        var email = $.trim($('#email-Id').val());
        var phoneNumber = $.trim($('#phone-Number').val());
        var Password = $('#Password').val();
        var CPassword = $('#CPassword').val();
        var isActive = $('#slt-Status').val();

        if (firstName == "" || firstName == null) {
            
            isValid = false;
            $('#first-Name-Validation').show();
           // $.notify("First name should not be empty!", { position: "right top", className: "error" });
        }

        if (lastName == "" || lastName == null) {
          
            isValid = false;
            $('#last-Name-Validation').show();
            // $.notify("Last name should not be empty!", { position: "right top", className: "error" });
        }

        if (role == "" || role == '0') {
            isValid = false;
            $('#role-Name-Validation').show();
           // $.notify("Role should not be empty!", { position: "right top", className: "error" });
        }

        if (isActive == "" || isActive == '0') {
            isValid = false;
            $('#status-Validation').show();
            //  $.notify("Status should not be empty!", { position: "right top", className: "error" });
        }

        if (email == "" || email == null) {
            isValid = false;
            $('#email-Validation').show();
           // $.notify("Email should not be empty!", { position: "right top", className: "error" });
        }

        if (phoneNumber == "" || phoneNumber == null && phoneNumber == "+") {
            //isValid = false;
            //$('#phone-Validation').show();
          //  $.notify("Phone number should not be empty!", { position: "right top", className: "error" });
        }
        if (UserName == "" || UserName == null) {
            isValid = false;
            $('#User-Name-Validation').show();
            // $.notify("Last name should not be empty!", { position: "right top", className: "error" });
        }
        if (Password == "" || Password == null) {
            isValid = false;
            $('#Password-Validation').show();
            // $.notify("Email should not be empty!", { position: "right top", className: "error" });
        }
        if (CPassword == "" || CPassword == null) {
            isValid = false;
            $('#CPassword-Validation').show();
            // $.notify("Email should not be empty!", { position: "right top", className: "error" });
        }
       var userNames = GetUserNames();

        if(userNames!=null)
        {
            if (editUserID == 0) {
                userNames = userNames["UserName"];
                if (userNames != undefined && userNames.length > 0) {
                    var matchedUserRecord = GetmatchedRecord(userNames, 'UserName', email);
                    if (matchedUserRecord.length > 0) {
                        isValid = false;
                        $('#email-Validation-Duplicate').show();
                    }

                }
            }
            else {
                userNames = userNames["UserName"];
                if (userNames != undefined && userNames.length > 0) {
                    var editData = $.parseJSON(userEditDetails[0]["Table"]);
                    var unMatchedCurrentUserName = GetunmatchedRecord(userNames, 'UserName', editData[0]["UserName"]);
                    var matchedUserRecord = GetmatchedRecord(unMatchedCurrentUserName, 'UserName', email);
                    if (matchedUserRecord.length > 0) {
                        isValid = false;
                        $('#email-Validation-Duplicate').show();
                    }

                }
            }
           
        }
        return isValid;
    }

}