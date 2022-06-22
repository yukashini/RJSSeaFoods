var isSessionOut = 0;
var isPasswordRested = 1;
var upper_text = new RegExp('[A-Z]');
var lower_text = new RegExp('[a-z]');
var number_check = new RegExp('[0-9]');
var special_char = new RegExp('[!/\'^�  $%&*()}{@#~?><>,|=_+�-\]');
var passwordstrength = 0;

//Load
{
    $(document).ready(function () {
        
        isSessionOut = ((GetQueryStrings()["isSessionOut"] == undefined || GetQueryStrings()["isSessionOut"] == null) ? 0 : GetQueryStrings()["isSessionOut"]);
        isPasswordRested = ((GetQueryStrings()["IsPwRes"] == undefined || GetQueryStrings()["IsPwRes"] == null) ? 1 : GetQueryStrings()["IsPwRes"]);
        RemoveSession("FirstView");
        SetSession("FirstView", 0);
        if (isSessionOut != 0) {
            
            InsertSeeion();
            $('#session-Out-Message').show();
        }
        else {
            $('#session-Out-Message').hide();
        }
        if (parseInt(isPasswordRested) == 0) {
            $('#mp_add-website5').show();
            //var $modal = $('#mp_add-website5');
            //$modal.modal('show');
        }
        else {
            $('#mp_add-website5').hide();
            //var $modal = $('#mp_add-website5');
            //$modal.modal('hide');
        }
        //$.notify("Your Password has been sent to your registered email address!", {
        //    position: "right top", className: "success"
        //});


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
}

//Forgot Password
{

    $(document).on('click', '#btn_forgotten', function () {
        if (isvalidforgotpass()) {
            var resultpass = forgotemailpassword();
            if (resultpass > 0) {
                $('#mp_forgotpasscode-website').hide();
                $.notify("Your Password has been sent to your registered email address!", {
                    position: "right top", className: "success"
                });
                setTimeout(function () {
                    window.location.href = "RJSLogin.aspx";
                }, 3000);
            } else {
                $('#err-passforgotemailidnew').show();
            }
        }
    });

    $(document).on('click', '[data-showforgotpasscode="true"]', function () {
        $('#mp_forgotpasscode-website').show();
    });

    $(document).on('click', '#btn_clearemaild', function () {
        $('#txt_forgottenemailid').val('');
        $('#err-passforgotemailid').hide();
        $('#err-passforgotemailidmissing').hide();
        $('#err-passforgotemailidnew').hide();
    });

    $(document).on('click', '[data-closeemailpop="true"]', function () {
        //$('#mp_forgotpasscode-website').modal('hide');
        $('#mp_forgotpasscode-website').hide();
        $('#txt_forgottenemailid').val('');
        $('#err-passforgotemailid').hide();
        $('#err-passforgotemailidmissing').hide();
        $('#err-passforgotemailidnew').hide();
    });

    $(document).on('click', '[data-Close-Reset]', function () {
        $('#mp_add-website5').hide();
        resetChangePasscode();
    })

    var isvalidforgotpass = function () {
        var isvalid = true;
        var Emailid = $('#txt_forgottenemailid').val();
        if (Emailid != undefined && Emailid != null && Emailid != '') {
            $('#err-passforgotemailid').hide();
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (expr.test(Emailid)) {
                $('#err-passforgotemailidmissing').hide();
            } else {
                isvalid = false;
                $('#err-passforgotemailidmissing').show();
            }
            $('#err-passforgotemailid').hide();
        } else {
            isvalid = false;
            $('#err-passforgotemailid').show();
        }
        return isvalid;
    }

    var forgotemailpassword = function () {
        var _obj = {
            "emailidpass": $('#txt_forgottenemailid').val()
        }
        var _tempList = {};
        $.when(RequestServer("RJSLogin.aspx/ForgotPassword", _obj)).done(function (response) {
            _tempList = response
        });
        return _tempList;
    }

    var GetQueryStrings = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = $.trim(hash[1]).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        }
        return vars;
    }

    function RemoveSession(key) {
        if (typeof (Storage) !== "undefined") {
            sessionStorage.removeItem(key);
        } else {
            // Sorry! No Web Storage support..
        }
    }
}

//Common
{
    var resetChangePasscode = function () {
        $('#txt_Passcode').val('');
        $('#txt_ConfirmPasscode').val('');
        $('#txt_oldPasscode').val('');
        $('#err-passcode').hide();
        $('#err-cpasscod').hide();
        $('#err-passcodrequire').hide();
        $('#err-cpasscodmatch').hide();
        $('#err-oldpasscode').hide();
        $('#err-cpasscodmatch').hide();
        $('#err-oldpasscodmatch').hide();
        $('#masterlength').removeClass('valid').addClass('invalid');
        $('#mastercharacters').removeClass('valid').addClass('invalid');
        $('#masternumber').removeClass('valid').addClass('invalid');
        $('#mastercapital').removeClass('valid').addClass('invalid');
    }

    var isValidPassword = function () {
        var isValidPassword = true;
        // Validation Elements
        {
            var newpassword = $('#txt_Passcode');
            var confirmpassword = $('#txt_ConfirmPasscode');
            var oldpasscode = $('#txt_oldPasscode');
        }

        if ($.trim(newpassword.val()).length === 0) {
            isValidPassword = false;
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

        if ($.trim(oldpasscode.val()).length === 0) {
            isValidPassword = false;
            $('#err-oldpasscode').show();
        } else {
            $('#err-oldpasscode').hide();
        }
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

    //var RegisterAlphabetsOnly = function () {
    //    $('.alphabets-only').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
    //        translation: {
    //            'Z': {
    //                pattern: /[a-zA-Z ]/, reverse: true
    //            }
    //        }
    //    });
    //}
}


//PassWord Reset
{
    $(document).on('click', '[data-changepasscode="true"]', function () {
        $('#mp_add-website5').modal('show');
        resetChangePasscode();
    });



    // Submit Password
    $(document).on('click', '#mp-resetpassword-submit', function () {
        if (isValidPassword()) {
            //$loading.show();
            //setTimeout(function () {
            var newpassword = $('#txt_Passcode').val();
            var confirmpassword = $('#txt_ConfirmPasscode').val();
            var oldpasswordcode = $('#txt_oldPasscode').val();
            var result = ChangePassword(oldpasswordcode, newpassword);

            //$loading.hide();
            //}, 0);
        }
    });

    var ChangePassword = function (oldPassword, newPassword) {
        var _obj = {
            'oldPassWord': oldPassword,
            'newPassword': newPassword,
        };
        var tempList = {};
        $.when(RequestServer("RJSLogin.aspx/ChangePassWord", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 1) {
             
                $('#mp_add-website5').hide();
                resetChangePasscode();
                $.notify("Password has been changed successfully!", {
                    position: "right top", className: "success"
                });
            } else if (parseInt(response) == 1) {
                $('#err-oldpasscodmatch').show();
                $('#err-oldpasscode').hide();
            }
            else {
                $.notify("Server error occured while changing your password !", {
                    position: "right top", className: "error"
                });
            }
        });
        return tempList;
    }

}

var InsertSeeion = function () {
    
    var _obj = {
    };
    var tempList = {};
    $.when(RequestServer("AuditLog.aspx/InsertSession", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;

}