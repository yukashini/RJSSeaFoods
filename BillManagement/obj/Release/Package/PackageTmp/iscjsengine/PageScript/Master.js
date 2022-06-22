//Global Variables
//////Dev
var filePathUrl = "http://localhost:43804/images/FileBills/";
var logoPathUrl = "http://localhost:43804/images/VendorLogos/";
var vendorDocumentURl = "http://localhost:43804/images/VendorDocuments/";
var buyerDocumentURl = "http://localhost:43804/images/BuyerDocuments/";
var shipperDocumentURl = "http://localhost:43804/images/ShipperDocuments/";
var paidBillDocs = "http://localhost:43804/images/FilePaidBills/";
var pdfDocumentUrl = "http://localhost:43804/images/PayPalPdf/"
var dwollaPdfDocumentUrl = "http://localhost:43804/images/DwollaPdf/"
var customerLogoPathUrl = "http://localhost:43804/images/CustomerLogos/";
var EmployeeLogoPathUrl = "http://localhost:43804/images/EmployeeLogos/";


////UAT
//var filePathUrl = "https://billmanagement-uat.archarina.com/images/FileBills/";
//var logoPathUrl = "https://billmanagement-uat.archarina.com/images/VendorLogos/";
//var vendorDocumentURl = "https://billmanagement-uat.archarina.com/images/VendorDocuments/";
//var pdfDocumentUrl = "https://billmanagement-uat.archarina.com/images/PayPalPdf/";
//var paidBillDocs = "https://billmanagement-uat.archarina.com/images/FilePaidBills/";

////testing
//var filePathUrl = "https://testing.archarena.com/BillManagement/images/FileBills/";
//var logoPathUrl="https://testing.archarena.com/BillManagement/images/VendorLogos/"
//var paidBillDocs = "https://testing.archarena.com/BillManagement/images/FilePaidBills/";
//var vendorDocumentURl = "https://testing.archarena.com/BillManagement/images/VendorDocuments/";
//var pdfDocumentUrl = "https://testing.archarena.com/BillManagement/images/PayPalPdf/"

//openapps
//var filePathUrl = "https://openapps.archarena.com/BillManagement/images/FileBills/";
//var logoPathUrl = "https://openapps.archarena.com/BillManagement/images/VendorLogos/"
//var paidBillDocs = "http://localhost:43804/images/FilePaidBills/"; 
//var vendorDocumentURl = "https://openapps.archarena.com/BillManagement/images/VendorDocuments/";
//var pdfDocumentUrl = "https://openapps.archarena.com/BillManagement/images/PayPalPdf/"

//DEMO

//var filePathUrl = "https://arcbill-demo.archarina.com/images/FileBills/";
//var logoPathUrl = "https://arcbill-demo.archarina.com/images/VendorLogos/";
//var vendorDocumentURl = "https://arcbill-demo.archarina.com/images/VendorDocuments/";
//var pdfDocumentUrl = "https://arcbill-demo.archarina.com/images/PayPalPdf/";
//var paidBillDocs = "https://arcbill-demo.archarina.com/images/FilePaidBills/"; 
//var dwollaPdfDocumentUrl = "https://arcbill-demo.archarina.com/images/DwollaPdf/"

////QA-Server B
//var filePathUrl = "https://arcbill-qa.archarina.com/images/FileBills/";
//var logoPathUrl = "https://arcbill-qa.archarina.com/images/VendorLogos/";
//var paidBillDocs = "https://arcbill-qa.archarina.com/images/FilePaidBills/"; 
//var vendorDocumentURl = "https://arcbill-qa.archarina.com/images/VendorDocuments/";
//var customerDocumentURl = "https://arcbill-qa.archarina.com/images/CustomerDocuments/";
//var pdfDocumentUrl = "https://arcbill-qa.archarina.com/images/PayPalPdf/";
//var customerLogoPathUrl = "https://arcbill-qa.archarina.com/images/CustomerLogos/";
//var dwollaPdfDocumentUrl = "https://arcbill-qa.archarina.com/images/DwollaPdf/"


////PROD

//var filePathUrl = "https://arcbill.archarina.com/images/FileBills/";
//var logoPathUrl = "https://arcbill.archarina.com/images/VendorLogos/";
//var paidBillDocs = "https://arcbill.archarina.com/images/FilePaidBills/"; 
//var vendorDocumentURl = "https://arcbill.archarina.com/images/VendorDocuments/";
//var pdfDocumentUrl = "https://arcbill.archarina.com/images/PayPalPdf/";
//var customerLogoPathUrl = "https://arcbill.archarina.com/images/CustomerLogos/";
//var dwollaPdfDocumentUrl = "https://arcbill.archarina.com/images/DwollaPdf/"


//UAT Server-B
//var filePathUrl = "https://arcbill-uat.archarina.com/images/FileBills/";
//var logoPathUrl = "https://arcbill-uat.archarina.com/images/VendorLogos/";
//var paidBillDocs = "https://arcbill-uat.archarina.com/images/FilePaidBills/"; 
//var vendorDocumentURl = "https://arcbill-uat.archarina.com/images/VendorDocuments/";
//var pdfDocumentUrl = "https://arcbill-uat.archarina.com/images/PayPalPdf/";
//var customerLogoPathUrl = "https://arcbill-uat.archarina.com/images/CustomerLogos/";
//var dwollaPdfDocumentUrl = "https://arcbill-uat.archarina.com/images/DwollaPdf/"

var loggerDetails = [];
var selectedMenu = 0
var roleId = 0;
var ClientID = 0;
var RolePermissions = [];
var AccountID = 0;
var upper_text = new RegExp('[A-Z]');
var lower_text = new RegExp('[a-z]');
var number_check = new RegExp('[0-9]');
var special_char = new RegExp('[!/\'^�  $%&*()}{@#~?><>,|=_+�-\]');
var passwordstrength = 0;
var $bMLoading = $('#pageLoader-Bill');
var isFirstView = 0;
var clientConfigurations = [];


//Menu Binding
//LOAD & EVENTS
{
    $(document).ready(function () {
         //$loading.show();
        loggerDetails = GetLoggerDetails();
        ClientID = (loggerDetails.ClientID == null || loggerDetails.ClientID == undefined ? 0 : loggerDetails.ClientID);
        BindLoggerDetails();
        BindMenusBasedOnRole();
        SetActiveMenu();
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

    $(document).on('click', '[child-menu]', function () {
        $('#menu-List li').removeClass('active');
        selectedMenu = $(this).attr('child-menu');
        SetSession('selectedMenu', parseInt($(this).attr('child-menu')));
        $('#menu-List li[child-menu=' + parseInt(selectedMenu) + ']').addClass('active');
        isMenuClicked = 1;
    });

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
                    var result = ChangePassword(oldpasswordcode,newpassword);
                   
                    //$loading.hide();
                //}, 0);
            }
        });

    }
}
//DOM
{
    var BindLoggerDetails = function () {
       
        var firstName = loggerDetails["FirstName"];
        firstName=firstName.toUpperCase();
        var firstShorName = firstName.charAt(0);
        AccountID = loggerDetails["AccountID"];
        var secondShortName=''
        if (loggerDetails["LastName"] != "") {
            secondShortName = loggerDetails["LastName"].charAt(0);
        }
        else {
            secondShortName = firstName.charAt(1);
            secondShortName.toUpperCase();
        }
        $('.LoggedinUserShortName').text(firstShorName + secondShortName);
        $('#Logger').text(loggerDetails["FirstName"] + " " + loggerDetails["LastName"]);


    }

    var BindMenusBasedOnRole = function () {
        roleId = GetRoleID();
        if (RolePermissions.length == 0) {
            RolePermissions = GetLoggedRolePermissions();
            var permissionAndConfigs = RolePermissions;
            RolePermissions = $.parseJSON(RolePermissions[0]["Table"]);
            
            clientConfigurations = $.parseJSON(permissionAndConfigs[1]["Table1"]);
            var billEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2000);
            var approvalEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2001);
            var paymentEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2002);
            var roleEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2003);
            var userEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2004);
            var vendorEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2005);
            var exportEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3022');
            var paymentSetupEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3019');
            var preferences = GetmatchedRecord(RolePermissions, 'EntityActionID', '3033');
            var GlImportEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3020');
            var GLDeleteEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3021');
            var distinctedEntities = GetDistinctArray(RolePermissions, 'EntityID');
            var createCustomerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
            var updateCustomerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
            var deleteCustomerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3025');
            var createProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3026');
            var updateProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3027');
            var deleteProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3028');
            var createCategoryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3029');
            var UpdateCategoryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3030');
            var deleteCategoryEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3031');

            var billPaymentrpt = GetmatchedRecord(RolePermissions, 'EntityActionID', '3034');
            var unpaidBillrpt = GetmatchedRecord(RolePermissions, 'EntityActionID', '3035');
            var vendorBalancerpt = GetmatchedRecord(RolePermissions, 'EntityActionID', '3036');
            var apAgingSummaryrpt = GetmatchedRecord(RolePermissions, 'EntityActionID', '3037');
            var apagingDetailrpt = GetmatchedRecord(RolePermissions, 'EntityActionID', '3038');
            var arinvoice = GetmatchedRecord(RolePermissions, 'EntityActionID', '3039');
           
            if (roleEntity.length > 0 || userEntity.length > 0) {
                $('#settings-Menu').show();
                $('#roles-Menue').show();
               
                if (roleEntity.length > 0) {
                    $('#role-Menu').show();
                }
                if (userEntity.length > 0)
                {
                    $('#user-Menu').show();
                }
                $('#payment-Setup-Menu').show();
                $('#payablepreferences-Setup-Menu').show();
                //$('#gl-Import-Menu').show();
            }

            if (billEntity.length > 0) {
               // $('#user-Home').show();
                $('#bills-Invoice-Menu').show();
            }
            if (approvalEntity.length > 0) {
              //  $('#approver-Home').show();
                $('#approver-Menu').show();
            }
            if (paymentEntity.length > 0) {
                //$('#financeManager-Home').show();
              //  
                $('#PaymentsULMenu').show();
                $('#payment-Menu').show();
                //  $('#export-Menu').show();
              
            }
            if (vendorEntity.length > 0) {

                $('#settings-Menu').show();
                $('#masterSetUp').show();
                $('#vendorMenu').show();
            }
            if (exportEntity.length > 0)
            {
                $('#export-Menu').show();
                if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0) {
                    if (clientConfigurations[0]["IsBillExportEnabled"] == "1") {
                        $('#export-Menu').show();
                    }
                    else {
                        $('#export-Menu').hide();
                    }
                }
                
            }

            if (roleId != 1001 && (GlImportEntity.length > 0 || GLDeleteEntity.length > 0)) {
                $('#settings-Menu').show();
                $('#masterSetUp').show();
               // $('#gl-Import-Menu').show();
            }
           
            if (roleId != 1001 && paymentSetupEntity.length > 0) {
                $('#settings-Menu').show();
                $('#companySetup').show();
                $('#payment-Setup-Menu').show();
            }
            
            if (roleId != 1001 && preferences.length > 0) {
                $('#payablepreferences-Setup-Menu').show();
            }
           
            if (roleId != 1001 && billPaymentrpt.length > 0) {
                $('#Paymentreport').show();
            }
            if (roleId != 1001 && unpaidBillrpt.length > 0) {
                $('#BillDueBasedReport').show();
            }
            if (roleId != 1001 && vendorBalancerpt.length > 0) {
                $('#VendorbalanceReport').show();
            }
            if (roleId != 1001 && apAgingSummaryrpt.length > 0) {
                $('#APAgingSummaryReport').show();
            }
            if (roleId != 1001 && apagingDetailrpt.length > 0) {
                $('#APAgingDetailedReport').show();
            }
            if (roleId != 1001 && arinvoice.length > 0) {
                $('#ar-invoice').show();
            }
            
            if (roleId == 1001 && (GlImportEntity.length > 0 || GLDeleteEntity.length > 0)) {
                $('#settings-Menu').show();
                $('#masterSetUp').show();
              //$('#gl-Import-Menu').show();
            }
           
            if (roleId == 1001 && paymentSetupEntity.length > 0) {
                $('#settings-Menu').show();
                $('#companySetup').show();
                $('#payment-Setup-Menu').show();
            }

            if (loggerDetails.RoleID != 0 && loggerDetails.RoleID != null && loggerDetails.RoleID == 1005) {
                $('[data-menu]').hide();
                $('#cAdmin-Menue').show();
            }

            if (createCustomerEntity.length > 0 || updateCustomerEntity.length > 0 || deleteCustomerEntity.length > 0) {
                $('#settings-Menu').show();
                $('#masterSetUp').show();
                $('#CustomerMenu').show();
            }

            if (createProjectEntity.length > 0 || updateProjectEntity.length > 0 || deleteProjectEntity.length > 0) {
                $('#settings-Menu').show();
                $('#masterSetUp').show();
                $('#ProjectMenu').show();
            }

            if (createCategoryEntity.length > 0 || UpdateCategoryEntity.length > 0 || deleteCategoryEntity.length > 0) {
                $('#settings-Menu').show();
                $('#masterSetUp').show();
                $('#bill-Category-Menu').show();
            }

            var permissionCount = GetPermissionCount(distinctedEntities);
            if (permissionCount > 1) {
                $('#Sub-Menue').show();
                var firstView = GetSession("FirstView");
                if (firstView == '0') {
                    SetSession("selectedMenu", 17);
                    SetSession("FirstView", 1)
                }
                   
                if (billEntity.length > 0) {
                    $('#sub-user-Home').show();

                }
                if (approvalEntity.length > 0) {
                    $('#sub-approver-Home').show();

                }
                if (paymentEntity.length > 0) {
                    $('#sub-financeManager-Home').show();

                };
            }
            else if (permissionCount == 0 && (roleEntity.length > 0 || userEntity > 0)) {
                var firstView = GetSession("FirstView");
                if (firstView == '0') {
                    SetSession("selectedMenu", 8);
                    SetSession("FirstView", 1)
                }
            }
            else {
              
                if (billEntity.length > 0) {
                    $('#user-Home').show();

                }
                if (approvalEntity.length > 0) {
                    $('#approver-Home').show();

                }
                if (paymentEntity.length > 0) {
                    $('#financeManager-Home').show();

                };
            }
        }
       

        
        //switch (roleId) {
        //    case 50000:
        //        $('#user-Home').show();
        //        $('#bills-Invoice-Menu').show();
        //        break;
        //    case 50001:
        //        $('#approver-Home').show();
        //        $('#approver-Menu').show();
        //        break;
        //    case 50002:
        //        $('#financeManager-Home').show();
        //        $('#payment-Menu').show();
        //        break;
        //    case 1001:
        //        $('#roles-Menue').show();
        //}

       
    }

    var SetActiveMenu = function () {
        selectedMenu = GetSession("selectedMenu");
        if (selectedMenu == "7") {
            selectedMenu = "6";
        }
        if (selectedMenu != null) {
           
            $('#menu-List li').removeClass('active');
            $('#menu-List li[child-menu=' +parseInt(selectedMenu) + ']').addClass('active');
        }
        
    }

    var BindMultiRoleMenu = function () {
        if (RolePermissions.length > 0) {
            RolePermissions = GetLoggedRolePermissions();
            RolePermissions = $.parseJSON(RolePermissions[0]["Table"]);
            var billEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2000);
            var approvalEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2001);
            var paymentEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2002);
            var roleEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2003);
            var userEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2004);
            
            if (roleEntity.length > 0 || userEntity.length > 0) {
                $('#roles-Menue').show();
                $('#vendor-Menue').show();
                //$('#payment-Setup-Menu').show();
                //$('#gl-Import-Menu').show();
            }
            if (billEntity.length > 0) {
               // $('#user-Home').show();
                $('#bills-Invoice-Menu').show();
            }
            if (approvalEntity.length > 0) {
                //$('#approver-Home').show();
                $('#approver-Menu').show();
            }
            if (paymentEntity.length > 0) {
                //$('#financeManager-Home').show();
                $('#payment-Menu').show();
                //$('#export-Menu').show();
            };

            //if ((roleEntity.length > 0 || userEntity > 0) && billEntity.length > 0 && approvalEntity.length > 0 && paymentEntity.length > 0) {                
            //    SetSession("selectedMenu", 1);
            //}
        }

            
    }

    var GetPermissionCount = function (distinctedEntities) {
        var permissionCount = 0;
        if (distinctedEntities != undefined && distinctedEntities != null && distinctedEntities.length>0) {
            var billEntity = GetmatchedRecord(distinctedEntities, 'EntityID', 2000);
            var approvalEntity = GetmatchedRecord(distinctedEntities, 'EntityID', 2001);
            var paymentEntity = GetmatchedRecord(distinctedEntities, 'EntityID', 2002);
            permissionCount = billEntity.length + approvalEntity.length + paymentEntity.length;
        }
     
        return permissionCount;

    }
}
//DATA
{
    var GetLoggerDetails = function () {
        var _obj = {};
        var tempList = {};
        $.when(RequestServer("RJSLogin.aspx/GetLoggerDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetRoleID = function () {
        var _obj = {};
        var tempList = {};
        $.when(RequestServer("Login.aspx/GetRoleId", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetLoggedRolePermissions = function () {
        var _obj = {};
        var tempList = {};
        $.when(RequestServer("RJSLogin.aspx/GetRolePermissions", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ChangePassword = function (oldPassword,newPassword) {
        var _obj = {
            'oldPassWord': oldPassword,
            'newPassword':newPassword,
        };
        var tempList = {};
        $.when(RequestServer("RJSLogin.aspx/ChangePassWord", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) == 3) {
                $.notify("Password has been changed successfully!", {
                    position: "right top", className: "success"
                });
                $('#mp_add-website5').modal('hide');
                resetChangePasscode();
            } else if (parseInt(response) == 1) {
                $('#err-oldpasscodmatch').show();
                $('#err-oldpasscode').hide();
            }
            else if (parseInt(response) == 2) {
                $.notify("Old password and new password should be different!", {
                    position: "right top", className: "error"
                });
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

    var RegisterAlphabetsOnly = function () {
        $('.alphabets-only').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
            translation: {
                'Z': {
                    pattern: /[a-zA-Z ]/, reverse: true
                }
            }
        });
    }

    function moneyFormatter(num) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        } else if (num < 900 || (num > 900 && num < 999))
        {
            return num; // if value < 1000, nothing to do
        }
    }

    
}

$(document).on('click', '[data-logout]', function () {
   
    InsertLoging();
});

var InsertLoging = function () {
    var _obj = {
    };
    var tempList = {};
    $.when(RequestServer("AuditLog.aspx/InsertLoging", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    window.location.href = 'RJSLogin.aspx?rst=true';
    return tempList;
}
