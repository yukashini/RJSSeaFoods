//Constant
{
    var currentuser = [];
    var linkid = 0;
    var UserAdminID = 0;
}

//Load
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            linkid = ((GetQueryStrings()["_id"] == undefined || GetQueryStrings()["_id"] == null) ? 0 : GetQueryStrings()["_id"]);
            if (linkid != undefined && linkid != null && linkid != 0) {
                currentuser = GetCurrentUser(linkid);
                currentuser = currentuser["SignUpUserDetails"];
                BindUserDetail(currentuser);
            } else {
                $('[data-hidesave="true"]').hide();
                $('[data-showerr="true"]').hide();
                $('[data-showlink="true"]').show();
            }
            $loading.hide();
        }, 0);
    })
}

//DOM Manipulation
{
    var BindUserDetail = function (currentuser) {
        if (currentuser != undefined && currentuser != null && currentuser.length > 0) {
            UserAdminID = currentuser[0]["AccountID"];
            $('#txt_Fname').val(((currentuser[0]["FirstName"] == undefined || currentuser[0]["FirstName"] == null || currentuser[0]["FirstName"] == '') ? '' : currentuser[0]["FirstName"]));
            $('#txt_Lname').val(((currentuser[0]["LastName"] == undefined || currentuser[0]["LastName"] == null || currentuser[0]["LastName"] == '') ? '' : currentuser[0]["LastName"]));
            $('#txt_emailid').val(((currentuser[0]["PrimaryEmailID"] == undefined || currentuser[0]["PrimaryEmailID"] == null || currentuser[0]["PrimaryEmailID"] == '') ? '' : currentuser[0]["PrimaryEmailID"]));
            $('#txt_Companyname').val(((currentuser[0]["ClientName"] == undefined || currentuser[0]["ClientName"] == null || currentuser[0]["ClientName"] == '') ? '' : currentuser[0]["ClientName"]));
            //$('#txt_appurl').val("http://billmanagement.archarina.com/BillManagement/Login.aspx");
            $('#txt_appurl').val("https://arcbill-qa.archarena.com");
            if (currentuser[0]["IsPasswordGenerated"] != 1) {
                $('[data-showerr="true"]').hide();
                $('[data-hidesave="true"]').show();
            } else {
                $('[data-hidesave="true"]').hide();
                $('[data-showerr="true"]').show();
            }
            $('[data-showlink="true"]').hide();
        } else {
            $('[data-hidesave="true"]').hide();
            $('[data-showerr="true"]').hide();
            $('[data-showlink="true"]').show();
        }
    }
}

//Event
{

    $(document).on('focusout', '#txt_activationkey', function () {
        var activationkeyval = $(this).val();
        if (activationkeyval != undefined && activationkeyval != null && activationkeyval != '') {
            if (currentuser[0]["ActivationKey"] != null && currentuser[0]["ActivationKey"] != undefined && currentuser[0]["ActivationKey"] != '' && activationkeyval != currentuser[0]["ActivationKey"]) {
                $('#err-activationkeymatch').show();
            } else {
                $('#err-activationkeymatch').hide();
            }
            $('#err-activationkey').hide();
        } else {
            $('#err-activationkeymatch').hide();
            $('#err-activationkey').hide();
        }
    });

    // Change Password
    {
        var upper_text = new RegExp('[A-Z]');
        var lower_text = new RegExp('[a-z]');
        var number_check = new RegExp('[0-9]');
        var special_char = new RegExp('[!/\'^�  $%&*()}{@#~?><>,|=_+�-\]');

        var passwordstrength = 0;



        // Show Password Pattern
        $(document).ready(function () {
            $('#txt_Passcode').keyup(function () {
                var pswd = $.trim($(this).val());
                passwordstrength = 0;
                //validate letter length
                if (pswd.length < 8) {
                    $('#masterlength').removeClass('valid').addClass('invalid');
                } else {
                    $('#masterlength').removeClass('invalid').addClass('valid');
                    passwordstrength = passwordstrength + 1;
                }
                //validate capital and lower letter
                if (pswd.match(upper_text) && pswd.match(lower_text)) {
                    $('#mastercapital').removeClass('invalid').addClass('valid');
                    passwordstrength = passwordstrength + 1;
                } else {
                    $('#mastercapital').removeClass('valid').addClass('invalid');
                }
                //validate letter and numbers
                if ((pswd.match(upper_text) || pswd.match(lower_text)) && pswd.match(number_check)) {
                    $('#masternumber').removeClass('invalid').addClass('valid');
                    passwordstrength = passwordstrength + 1;
                } else {
                    $('#masternumber').removeClass('valid').addClass('invalid');
                }
                //validate characters
                if (pswd.match(special_char)) {
                    $('#mastercharacters').removeClass('invalid').addClass('valid');
                    passwordstrength = passwordstrength + 1;
                } else {
                    $('#mastercharacters').removeClass('valid').addClass('invalid');
                }

            }).focus(function () {
                $('#masterpasswordstrength').show();
            }).blur(function () {
                $('#masterpasswordstrength').hide();
            });
        });

        // Submit Password
        $(document).on('click', '#mp-resetpassword-submit', function () {
            if (isValidPassword()) {
                //$loading.show();
                //setTimeout(function () {
                    var newpassword = $('#txt_Passcode').val();
                    var confirmpassword = $('#txt_ConfirmPasscode').val();
                    postpassword(UserAdminID, newpassword);
                   
                             
                //    $loading.hide();
                //}, 0);
            }
        });


        var isValidPassword = function () {
            var isValidPassword = true;
            var activationkeyval = $('#txt_activationkey').val();
            if (activationkeyval != undefined && activationkeyval != null && activationkeyval != '') {
                if (currentuser[0]["ActivationKey"] != null && currentuser[0]["ActivationKey"] != undefined && currentuser[0]["ActivationKey"] != '' && activationkeyval != currentuser[0]["ActivationKey"]) {
                    $('#err-activationkeymatch').show();
                    isValidPassword = false;
                } else {
                    $('#err-activationkeymatch').hide();
                }
                $('#err-activationkey').hide();
            } else {
                isValidPassword = false;
                $('#err-activationkeymatch').hide()
                $('#err-activationkey').show();
            }
            // Validation Elements
            {
                var newpassword = $('#txt_Passcode');
                var confirmpassword = $('#txt_ConfirmPasscode');
            }

            if ($.trim(newpassword.val()).length === 0) {
                isValidPassword = false;
                $('#err-passcodrequire').hide();
                $('#err-passcode').show();
            } else {
                if (passwordstrength < 4) {
                    isValidPassword = false;
                    $('#err-passcodrequire').show();
                }
                else {
                    $('#err-passcodrequire').hide();
                }
                $('#err-passcode').hide();
            }
            // Check Contact
            if ($.trim(confirmpassword.val()).length === 0) {
                isValidPassword = false;
                $('#err-cpasscod').show();
            } else {
                $('#err-cpasscod').hide();
            }
            $('#err-cpasscodmatch').hide();
            if (isValidPassword == true) {
                if ($.trim(newpassword.val()) != $.trim(confirmpassword.val())) {
                    isValidPassword = false;
                    $('#err-cpasscodmatch').show();
                } else {
                    $('#err-cpasscodmatch').hide();
                }
            }
            return isValidPassword;
        }
    }
}

//Data Manipulation
{
    var GetCurrentUser = function (linkid) {
        var _obj = {
            "linkID": parseInt(linkid)
        }
        var tempList = {};
        $.when(RequestServer("ClientSignup.aspx/GetClientAdminSignUpScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var postpassword = function (useraID, newpassword) {
        var _obj = {
            "AccountID": useraID,
            "PassWord": newpassword,
            "FirstName": (currentuser[0]["FirstName"] == null ? '' : currentuser[0]["FirstName"]),
            'Email': (currentuser[0]["PrimaryEmailID"] == null ? '' : currentuser[0]["PrimaryEmailID"]),
            'ClientID': (currentuser[0]["ClientID"] == null ? 0 : currentuser[0]["ClientID"]),
        }
        var pwObj = {
            'PassWordDetails':_obj
        }
        var _tempList = {};
        $.when(RequestServer("ClientSignup.aspx/UpdateAdminCredentials", pwObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Password has Been updated successfully!!", { position: "right top", className: "success" });
                setTimeout(function () {
                    window.location.href = "RJSLogin.aspx";
                }, 1000);
            }
            else {
                $.notify("Server error occured while updating your password!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}

//Others
{
    function Call_SelfAJAX(serviceMethod, formData) {
        var _data = null;
        var requestStartAt = moment(new Date());
        $.ajax({
            async: false,
            type: "POST",
            url: serviceMethod,
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                _data = response;
                //if (_data.isSuccess == false)
                //    alert(_data.isSuccess);
            },
            failure: function (msg) {
                alert("<i class='fa fa-exclamation-circle' style='color:red;'></i> " + msg.d, 'error');
            },
            error: function (jqXHR, error, errorThrown) {
                var message,
                    stack,
                    name;
                var statusErrorMap = {
                    '400': "Server understood the request, but request content was invalid.",
                    '401': "Unauthorized access.",
                    '403': "Forbidden resource can't be accessed.",
                    '500': "Internal server error.",
                    '503': "Service unavailable."
                };
                if (jqXHR.status) {
                    message = statusErrorMap[jqXHR.status];
                    stack = jqXHR.responseText;
                    name = "<b>" + jqXHR.status + "</b> " + message;
                    if (!message) {
                        message = errorThrown.message;
                        stack = errorThrown.stack;
                        name = jqXHR.status + " (Unknown Error) \n.";
                    }

                } else {
                    message = errorThrown.message;
                    stack = isUndefined(errorThrown.stack) ? jqXHR.reponseText : errorThrown.stack
                    name = isUndefined(errorThrown.name) ? "" : errorThrown.name;
                }
                var browser = 'UnKnown';
                // Report The Error (Using Mailto)
                var browserVersion = "UnKnown";
                var reportBody = "Hai, %0D%0A %0D%0A While Accessing the Application I got some error. Please fix this and let me know. %0D%0A %0D%0A Error Occured at : " + window.location.href + " %0D%0A Error Stack : " + name + "%0D%0A User Agent : " + browser + " %0D%0A User Agent Version : " + browserVersion + " %0D%0A Date/Time : " + new Date() + encodeURIComponent(stack);
                var sendReportTo = "mailto:gopinath@innospire.com?subject=Error Occured &body=" + reportBody;

                alert("<h3><i class='fa fa-exclamation-circle' style='color:red; font-size:30px;'></i> " + name + "<h4><b>Error Stack :</b> <div style='float:right;'><i class='fa fa-envelope' style='color:gray; margin-right:2px;'></i><a style='font-size:13px;  margin-right: 10px;' id='errorReport' href='" + sendReportTo + "'>Report this Error</a></div></h4> <div class='stackcontainer'>" + stack + "</div>", 'error');
            }
        });
        return _data;
    }

}