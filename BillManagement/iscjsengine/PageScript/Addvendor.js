//Global variables
{
    var editVendorID = 0;
    var editVendordata = [];
    var isBankAccountAdded = 0;
    var addedBankIdentityID = 0;
    var fileContainer = [];
    var fileName = '';
    var accountRefId = '';
    var masterData = [];
    var missingStripeReq = '';
    var editRefID = '';
}

//Load and Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        editVendorID = ((GetQueryStrings()["VendorID"] == undefined || GetQueryStrings()["VendorID"] == null) ? 0 : GetQueryStrings()["VendorID"]);
        RegisterFileDrop();
        BuidAddVendorScreen();
        $(document).on('focus', '.select2.select2-container', function (e) {
            // only open on original attempt - close focus event should not fire open
            if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                $(this).siblings('select').select2('open');
            }
        });
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#cancel-Vendor', function () {
        window.history.back();
    });

    $(document).on('click', '#save-Vendor', function () {
        if (ValidateVendor() && $("span[error-active='true']").length == 0) {
            InsertVendor()
             
        }
        
    });

    $(document).on('click', '#update-Vendor', function () {
        if (ValidateVendor() && $("span[error-active='true']").length == 0)
        {
            UpdateVendor();
        }
        
    });

    $(document).on('keyup', '[data-textbox]', function () {
        if ($.trim($(this).val()) != '') {
            $("span.validation-message[data-validation='" + $(this).attr("data-textbox") + "']").hide();
        }

    });

    $(document).on('change', '[data-Select]', function () {
        var $this = $(this);
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").hide();
      //  $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").attr('error-active', false);
    });

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
            $('#vendorEmail-Validation').hide();
        }

        $('#vendorDuplicateEmail-Validation').hide();

    });

    $(document).on('click', '#remove-Logo', function () {
        var html = "";
        fileName = [];
        fileContainer = [];
        html+='<h2>LOGO</h2>';
        html+='<span class="isc-btn-inp-typ-file-s1" >Choose Company Logo';
        html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
        html += '</span>';
        $('#file_Viewer').html(html);
    });

    $(document).on('keyup', '#txt-Vendor-Name', function () {
        var $this = $(this);
        var VAL = $this.val();
   //     var pattern = /^[a-zA-Z' ]*$/
        var pattern = /^[a-zA-Z0-9\s\[\]\.\-&@£$€¥#:;,']*$/;
        if (!pattern.test(VAL)) {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").show();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', true);
        } else {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }

        //if ($this.val() != '') {
        //    $('#vendorName-Validation').hide();
        //} else {
        //    $('#vendorName-Validation').show();
        //}
        

    });

    //Browse Logo
    {
        $(document).on('change', '#browseLogo', function () {
            var Files = $(this).prop("files");
                fileContainer = [];
                var type = Files[0]["type"];
                const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
                if (size > 10) {
                    $(this).val('');
                    $.notify("File Size should not  greater than 10 MB,Select another file  ", { position: "right top", className: "error" });
                }
                else if ($.inArray(type, ['image/png', 'image/jpg', 'image/jpeg']) == -1) {
                    $(this).val('');
                    $.notify("File extention is not allowed,Select another file  ", { position: "right top", className: "error" });
                }
                else {
                    fileContainer.push(Files[0])
                    fileSize = size;
                    saveFiles();
                    fileName = fileResponse["ModifiedFileName"];
                    VendorLogoFrames(fileName)
                }
        });

    }
}

//Dom Manipulation
{
    var BuidAddVendorScreen = function () {
        BindMasterData();
        RegisterNumberOnly();
        RegisterAlphabetsOnly();
        if (editVendorID != 0) {
            BindEditVendorDetails();
        }
    }

    var BindMasterData = function () {
        masterData = GetMasterData();
        var paymentTerms = masterData["PaymentTerms"];

        if (paymentTerms != undefined && paymentTerms != null && paymentTerms.length > 0) {
            BindDropDowns($('#slt-Payment-Terms'), paymentTerms, 'Choose Payment Terms', 0);
            BindDropDowns($('#slt-Prefferd-Payment-Method'), masterData["PrefferedPayment"], 'Choose Preferred Payment Method', 0);
            BindDropDowns($('#slt-Vendor-Type'), masterData["VendorType"], 'Choose Vendor Type', 0);
            BindDropDowns($('#slt-GL-Codes'), masterData["GlCodes"], 'Choose GL Account', 0);
            RegisterSelectPicker();
        }
      
    }

    var BindEditVendorDetails = function () {
        editVendordata = GetEditVendorData();
        var vendorDetails = editVendordata["VendorDetails"];
        var vendorBankDetails = editVendordata["VendorBankDetails"];
        if (vendorDetails != undefined && vendorDetails != null && vendorDetails.length > 0) {
            $('#txt-Vendor-Name').val((SafeHTML(vendorDetails[0]["VendorName"] == null ? '' : vendorDetails[0]["VendorName"])));
            $('#txt-Email').val((common.NFTEMP(vendorDetails[0]["Email"])));
            $('#txt-City').val((common.NFTEMP(vendorDetails[0]["City"])));
            $('#txt-addressln-one').val((common.NFTEMP(vendorDetails[0]["Address1"])));
            $('#txt-addressln-two').val((common.NFTEMP(vendorDetails[0]["Address2"])));
            $('#txt-State').val((common.NFTEMP(vendorDetails[0]["State"])));
            $('#txt-Zip-Code').val((common.NFTEMP(vendorDetails[0]["PostalCode"])));
            $('#txt-Contact-Number').val((common.NFTEMP(vendorDetails[0]["Phone"])));
            $('#slt-Prefferd-Payment-Method').val((vendorDetails[0]["PrefferedPaymentMethod"] == null ? 0 : vendorDetails[0]["PrefferedPaymentMethod"]));
            $('#txt-Tax-ID').val((common.NFTEMP(vendorDetails[0]["TaxId"])));
            $('#slt-Payment-Terms').val((vendorDetails[0]["PaymentTerm"] == null ? 0 : vendorDetails[0]["PaymentTerm"]));
            $('#slt-Vendor-Type').val((vendorDetails[0]["VendorType"] == null ? 0 : vendorDetails[0]["VendorType"]));
            $('#slt-Prefferd-Payment-Method').val((vendorDetails[0]["PrefferedPaymentMethod"] == null ? 0 : vendorDetails[0]["PrefferedPaymentMethod"]));
            $('#lead-Time-Days').val((common.NFTEMP(vendorDetails[0]["LeadTimeDays"])));
            $('#slt-GL-Codes').val((common.NFTEMP(vendorDetails[0]["GLCode"])));
            $('#payPal-Email').val((common.NFTEMP(vendorDetails[0]["PaypalEmailAddress"])));
            $('#payPal-Mob').val((common.NFTEMP(vendorDetails[0]["PaypalMobileNumber"])));
            $('#txt-External').val((common.NFTEMP(vendorDetails[0]["ExternalNumber"])));
            $('#txt-Website-Url').val((vendorDetails[0]["WebsiteURL"] == null ? '' : vendorDetails[0]["WebsiteURL"]));
            $('.select2').select2();
            editRefID = (vendorDetails[0]["ReferenceID"] == null ? '' : vendorDetails[0]["ReferenceID"])

            //Logo
            if (vendorDetails[0]["VendorLogo"] != null && vendorDetails[0]["VendorLogo"] != '') {
                fileName = vendorDetails[0]["VendorLogo"]
                VendorLogoFrames(vendorDetails[0]["VendorLogo"]);
            }
        }

        if (vendorBankDetails != undefined && vendorBankDetails != null && vendorBankDetails.length > 0) {
            isBankAccountAdded = 1;
            addedBankIdentityID = parseInt((vendorBankDetails[0]["IdentityID"] == null ? 0 : vendorBankDetails[0]["IdentityID"]));
            $('#txt-Account-Holder-Name').val(vendorBankDetails[0]["AccountHolderName"] == null ? '' : SafeHTML(vendorBankDetails[0]["AccountHolderName"]));
            $('#txt-Account-Number').val((common.NFTEMP(vendorBankDetails[0]["AccountNumber"])));
            $('#txt-reenter-Account-Number').val((common.NFTEMP(vendorBankDetails[0]["AccountNumber"])));
            $('#txt-Routing-Number').val((common.NFTEMP(vendorBankDetails[0]["RoutingNumber"])));
        }

        $('#page-Title').html("Update Vendor");
        $('#save-Vendor').hide();
        $('#update-Vendor').show();
       
    }

    var VendorLogoFrames = function (fileImage) {
        $('#file_Viewer').html('');
        var iframe = document.getElementById("bill_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "bill_Frame";
            var iframewidth = 390;
            var sourcePath = "Requested Source Path: " + logoPathUrl + fileImage;
            //WriteSourcePath(sourcePath);
            iframe.src = logoPathUrl + fileImage;
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 100%; overflow: hidden; overflow-y: auto;");
            $('#iframe img').addClass('img-responsive');
            $('#file_Viewer').append(iframe);
            isAttchment = 1;
        }
    }

}

//Data Manipulation
{
    var GetMasterData = function () {
        var _obj = {
           
        }
        var tempList = {};
        $.when(RequestServer("AddVendor.aspx/GetMasterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var InsertVendor = function () {
        //Vendor Details
        var vendorName = $('#txt-Vendor-Name').val();
        var email = $('#txt-Email').val();
        var city = $('#txt-City').val();
        var addressLineOne = $('#txt-addressln-one').val();
        var addressLineTwo = $('#txt-addressln-two').val();
        var state = $('#txt-State').val();
        var zipCode = $('#txt-Zip-Code').val();
        var contactNumber = $('#txt-Contact-Number').val();
        var prefPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var taxId = $('#txt-Tax-ID').val();
        var paymentTerms = $('#slt-Payment-Terms').val();
        var leadTimeDays = $('#lead-Time-Days').val();
        var GLcode = $('#slt-GL-Codes').val();
        var websiteUrl = $('#txt-Website-Url').val();
        var vendorType = $('#slt-Vendor-Type').val();
        var payPalEmail=$('#payPal-Email').val();
        var payPalMob = $('#payPal-Mob').val();
        var externalNumber = $('#txt-External').val();


        //Bank Details
        var accountHolderName = $('#txt-Account-Holder-Name').val();
        var accountNumber = $('#txt-Account-Number').val();
        var achRoutingNumber = $('#txt-Routing-Number').val();

        //vendor Details obj
        var vendorDetailObj = {
            'VendorName': vendorName,
            'FirstName': vendorName,
            'LastName': '',
            'Email': email,
            'AddressLineOne': addressLineOne,
            'AddressLineTwo':'',
            'City': city,
            'State': state,
            'Country':'US',
            'PostalCode': zipCode,
            'Phone': contactNumber,
            'SSNNumber': '',
            'VendorType': parseInt(vendorType),
            'PrefferedPaymentMethod': parseInt(prefPaymentMethod),
            'TaxId': taxId,
            'PaymentTerm':parseInt(paymentTerms),
            'ReferenceID': '',
            'WebsiteURL': '',
            'VendorLogo': (fileName.length == 0 ? '' : fileName),
            'PayPalEmailAddress': payPalEmail,
            'PayPalMobile': payPalMob,
            'GLCode': GLcode,
            'ExternalNumber':externalNumber,
            'LeadTimeDays':leadTimeDays
        }

        //vendorBankDetails Obj
        var bankDetailObj={
            'AccountHolderName': accountHolderName,
            'AccountNumber': accountNumber,
            'RoutingNumber': achRoutingNumber,
            'isBankAccountAdded': 0,
            'IdentityID':0
        }

        var vendorObj = {
            'Vendor': vendorDetailObj,
            'VendorBankAccount':bankDetailObj
        }

        var insertObj = {
            'vendorDetails':vendorObj
        }

        
        $.when(RequestServer("AddVendor.aspx/InsertVendor", insertObj)).done(function (response) {
            
            if (parseInt(response) > 0) {
                $.notify("Vendor created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("This vendor name/email id has already been created!!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditVendorData = function () {
        var _obj = {
            'vendorID': editVendorID
        }
        var tempList = {};
        $.when(RequestServer("AddVendor.aspx/GetEditVendorDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateVendor = function () {
       
        var vendorDetails = editVendordata["VendorDetails"];
        //Vendor Details
        var vendorName = $('#txt-Vendor-Name').val();
        var email = $('#txt-Email').val();
        var city = $('#txt-City').val();
        var addressLineOne = $('#txt-addressln-one').val();
        var addressLineTwo = $('#txt-addressln-two').val();
        var state = $('#txt-State').val();
        var zipCode = $('#txt-Zip-Code').val();
        var contactNumber = $('#txt-Contact-Number').val();
        var prefPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var taxId = $('#txt-Tax-ID').val();
        var paymentTerms = $('#slt-Payment-Terms').val();
        var leadTimeDays = $('#lead-Time-Days').val();
        var ssnNumber = $('#txt-SSN').val();
        var websiteUrl = $('#txt-Website-Url').val();
        var payPalEmail = $('#payPal-Email').val();
        var payPalMob = $('#payPal-Mob').val();
        var vendorType = $('#slt-Vendor-Type').val();
        var GLcode = $('#slt-GL-Codes').val();
        var externalNumber = $('#txt-External').val();

        //Bank Details
        var accountHolderName = $('#txt-Account-Holder-Name').val();
        var accountNumber = $('#txt-Account-Number').val();
        var achRoutingNumber = $('#txt-Routing-Number').val();

     

        //vendor Details obj
        var vendorDetailObj = {
            'VendorName': vendorName,
            'FirstName': vendorName,
            'LastName': '',
            'Email': email,
            'AddressLineOne': addressLineOne,
            'AddressLineTwo': '',
            'City': city,
            'State': state,
            'Country': 'US',
            'PostalCode': zipCode,
            'Phone': contactNumber,
            'SSNNumber': '',
            'VendorType': parseInt(vendorType),
            'PrefferedPaymentMethod': parseInt(prefPaymentMethod),
            'TaxId': taxId,
            'PaymentTerm': parseInt(paymentTerms),
            'ReferenceID': '',
            'WebsiteURL': '',
            'VendorID': editVendorID,
            'VendorLogo': (fileName.length == 0 ? '' : fileName),
            'LeadTimeDays': leadTimeDays,
            'PayPalEmailAddress': payPalEmail,
            'PayPalMobile': payPalMob,
            'GLCode': GLcode,
            'ExternalNumber': externalNumber,
            'DwollaCustomerID': (vendorDetails[0]["DwollaCustomerID"] == null ? '' : vendorDetails[0]["DwollaCustomerID"]),
            'DwollaFundID': (vendorDetails[0]["DwollaFundID"] == null ? '' : vendorDetails[0]["DwollaFundID"])
        }

        //vendorBankDetails Obj
        var bankDetailObj = {
            'AccountHolderName': accountHolderName,
            'AccountNumber': accountNumber,
            'RoutingNumber': achRoutingNumber,
            'isBankAccountAdded': isBankAccountAdded,
            'IdentityID': addedBankIdentityID
        }

        var vendorObj = {
            'Vendor': vendorDetailObj,
            'VendorBankAccount': bankDetailObj
        }

        var updateObj = {
            'vendorDetails': vendorObj
        }


        $.when(RequestServer("AddVendor.aspx/UpdateVendor", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Vendor updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a vendor !!", { position: "right top", className: "error" });
            }
        });
    }

    var CreateReferenceKey = function () {
        var isValid = true;
        var vendorName = $('#txt-Vendor-Name').val();
        var email = $('#txt-Email').val();
        var city = $('#txt-City').val();
        var addressLineOne = $('#txt-addressln-one').val();
        var addressLineTwo = $('#txt-addressln-two').val();
        var state = $('#txt-State').val();
        var zipCode = $('#txt-Zip-Code').val();
        var contactNumber = $('#txt-Contact-Number').val();
        var prefPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var taxId = $('#txt-Tax-ID').val();
        var paymentTerms = $('#slt-Payment-Terms').val();
        var leadTimeDays = $('#lead-Time-Days').val();
        var ssnNumber = $('#txt-SSN').val();
        var websiteUrl = $('#txt-Website-Url').val();
        var vendorObj = {
            'FirstName': vendorName,
            'last_name': '_Vendor',
            'email': email,
            'city': city,
            'country': 'US',
            'line1': addressLineOne,
            'line2': addressLineTwo,
            'postal_code': zipCode,
            'state': state,
            'day': '01',
            'month': '01',
            'year': '2000',
            'id_number': ssnNumber,
            'phone': contactNumber,
            'url': websiteUrl,
            //'date':moment().format('MM/DD/YYYY'),
            'date': Math.round((new Date()).getTime() / 1000),
            'ip': '192.168.43.231',
            'IsBankAccountAttached': false
        }
        //Vendor BankAccountObject
        var vendorBankAccountObj = {
            'Country': 'US',
            'Currency': 'usd',
            'Object': '',
            'AccountHolderName': '',
            'AccountType': 'individual',
            'RoutingNumber': '',
            'AccountNumber': ''
        }

        var createdVendorResponse = CreateVendorAccount(vendorObj, vendorBankAccountObj);
        if (createdVendorResponse != null && createdVendorResponse.IsSuccess) {
            accountRefId = createdVendorResponse.Identity;
            var accountHolderName = $.trim($('#txt-Account-Holder-Name').val());
            var accountNumber =$.trim($('#txt-Account-Number').val());
            var achRoutingNumber = $.trim($('#txt-Routing-Number').val());
            //var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(accountRefId);
            //var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
            //Add Bank Account to vendor if the bank details are given 
            if (accountNumber != '' && achRoutingNumber != '' && accountHolderName != '')
            {
                //Create Token
                const PromiseE = new Promise((resolve, reject) => {
                    setTimeout(function () {
                        resolve(stripe
                        .createToken('bank_account', {
                            country: 'US',
                            currency: 'usd',
                            routing_number: achRoutingNumber,
                            account_number: accountNumber,
                            account_holder_name: accountHolderName,
                            account_holder_type: 'individual',
                        }));
                    }, 1);
                });
                PromiseE.then(function (result) {
                    var recivedToken = result.token.id;
                    //Created ConnectedAccount_BankAccount
                    var createConnectedAccountResult = CreatedConnectedBankAccounts(accountRefId, recivedToken);

                    //Cheking CreatedContactBankAccount
                    if (createConnectedAccountResult != null && createConnectedAccountResult.IsSuccess) {
                        //Checking the account using newly created accountRefID
                        var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(accountRefId);
                        var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
                        //Validate Individual Error here///
                        if (responseDesc != null && (responseDesc.individual.verification.status == "verified" || responseDesc.individual.verification.status == "pending") && responseDesc.individual.requirements.errors.length == 0 && responseDesc.external_accounts.data.length > 0) {
                            missingStripeReq = '';
                            InsertVendor();
                        }
                        else if (responseDesc.individual.requirements.errors.length > 0) {
                            //Show the requirement error to the user
                            $.notify('' + responseDesc.individual.requirements.errors[0]["reason"] + '', { position: "right top", className: "success" });
                            missingStripeReq = responseDesc.individual.requirements.errors[0]["reason"]
                           
                        }
                    }
                  
                });
            }
            else {
                InsertVendor();
            }
        }
        else {
            $.notify('' + createdVendorResponse.message + '', { position: "right top", className: "error" });
            isValid = false;
            accountRefId = '';
        }
       
    }

    var UpdateReferenceKey = function () {
        var isValid = true;
        var vendorName = $('#txt-Vendor-Name').val();
        var email = $('#txt-Email').val();
        var city = $('#txt-City').val();
        var addressLineOne = $('#txt-addressln-one').val();
        var addressLineTwo = $('#txt-addressln-two').val();
        var state = $('#txt-State').val();
        var zipCode = $('#txt-Zip-Code').val();
        var contactNumber = $('#txt-Contact-Number').val();
        var prefPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var taxId = $('#txt-Tax-ID').val();
        var paymentTerms = $('#slt-Payment-Terms').val();
        var leadTimeDays = $('#lead-Time-Days').val();
        var ssnNumber = $('#txt-SSN').val();
        var websiteUrl = $('#txt-Website-Url').val();
        var vendorObj = {
            'FirstName': vendorName,
            'last_name': '_Vendor',
            'email': email,
            'city': city,
            'country': 'US',
            'line1': addressLineOne,
            'line2': addressLineTwo,
            'postal_code': zipCode,
            'state': state,
            'day': '01',
            'month': '01',
            'year': '2000',
            'id_number': ssnNumber,
            'phone': contactNumber,
            'url': websiteUrl,
            //'date':moment().format('MM/DD/YYYY'),
            'date': Math.round((new Date()).getTime() / 1000),
            'ip': '192.168.43.231',
            'accountRefID': editRefID,
            'IsBankAccountAttached': false
        }
        //Vendor BankAccountObject
        var vendorBankAccountObj = {
            'Country': 'US',
            'Currency': 'usd',
            'Object': '',
            'AccountHolderName': '',
            'AccountType': 'individual',
            'RoutingNumber': '',
            'AccountNumber': ''
        }

        var createdVendorResponse;
        if (editRefID != null && editRefID != '') {
            createdVendorResponse = UpdateVendorAccount(vendorObj, vendorBankAccountObj);
        } else {
            createdVendorResponse = CreateVendorAccount(vendorObj, vendorBankAccountObj);
        }
       
        if (createdVendorResponse != null && createdVendorResponse.IsSuccess) {
            accountRefId = createdVendorResponse.Identity;
            var accountHolderName = $.trim($('#txt-Account-Holder-Name').val());
            var accountNumber = $.trim($('#txt-Account-Number').val());
            var achRoutingNumber = $.trim($('#txt-Routing-Number').val());
            //var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(accountRefId);
            //var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
            //Add Bank Account to vendor if the bank details are given 
            if (accountNumber != '' && achRoutingNumber != '' && accountHolderName != '') {
                //Create Token
                const PromiseE = new Promise((resolve, reject) => {
                    setTimeout(function () {
                        resolve(stripe
                        .createToken('bank_account', {
                            country: 'US',
                            currency: 'usd',
                            routing_number: achRoutingNumber,
                            account_number: accountNumber,
                            account_holder_name: accountHolderName,
                            account_holder_type: 'individual',
                        }));
                    }, 1);
                });
                PromiseE.then(function (result) {
                    var recivedToken = result.token.id;
                    //Created ConnectedAccount_BankAccount
                    var createConnectedAccountResult = CreatedConnectedBankAccounts(accountRefId, recivedToken);

                    //Cheking CreatedContactBankAccount
                    if (createConnectedAccountResult != null && createConnectedAccountResult.IsSuccess) {
                        //Checking the account using newly created accountRefID
                        var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(accountRefId);
                        var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
                        //Validate Individual Error here///
                        if (responseDesc != null && (responseDesc.individual.verification.status == "verified" || responseDesc.individual.verification.status == "pending") && responseDesc.individual.requirements.errors.length == 0 && responseDesc.external_accounts.data.length > 0) {
                            missingStripeReq = '';
                            UpdateVendor();
                        }
                        else if (responseDesc.individual.requirements.errors.length > 0) {
                            //Show the requirement error to the user
                            $.notify('' + responseDesc.individual.requirements.errors[0]["reason"] + '', { position: "right top", className: "success" });
                            missingStripeReq = responseDesc.individual.requirements.errors[0]["reason"]

                        }
                    }

                });
            }
            else {
                UpdateVendor();
            }
        }
        else {
            $.notify('' + createdVendorResponse.message + '', { position: "right top", className: "error" });
            isValid = false;
            accountRefId = '';
        }

    }

    var CreateVendorAccount = function (vendorObj, vendorBankObj) {
        var obj = {
            'ObjstripeConnectedAccounts': vendorObj,
            'ObjUsersBankAccount': vendorBankObj
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/ProcessPayment", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var UpdateVendorAccount = function (vendorObj, vendorBankObj) {
        var obj = {
            'ObjstripeConnectedAccounts': vendorObj,
            'ObjUsersBankAccount': vendorBankObj
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/UpdateConnectedAccount", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    //AJAX Call for file upload
    var saveFiles = function () {
        var response = '';

        if (fileContainer.length > 0) {
            fileResponse = [];
            var data = new FormData();
            data.append("Folder", 0);
            data.append("key", fileContainer[0]);
            $.ajax({
                async: false,
                type: "POST",
                url: "VendorLogo.ashx",
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    fileResponse = result;
                },
                error: function (jqXHR, error, errorThrown) {
                    var error = e;
                },
                xhr: function (evt) {
                    var filexhr = $.ajaxSettings.xhr();
                    return filexhr;
                }
            });
        }
        return fileResponse;
    }

    var GetretrivedConnectedAccountDetails = function (refID) {
        var obj = {
            'RefID': refID,
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/GetretrivedConnectedAccountDetails", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var CreatedConnectedBankAccounts = function (refID, token) {
        var obj = {
            'RefID': refID,
            'token': token
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/CreateConnectedAccount_BankDetails", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }
}

//Common
{
    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 1000);
    }

    var ValidateVendor = function () {
        var isValid = true;
        //Vendor Details
        var vendorName = $.trim($('#txt-Vendor-Name').val());
        var email = $.trim($('#txt-Email').val());
        var city = $.trim($('#txt-City').val());
        var addressOne = $.trim($('#txt-addressln-one').val());
        var addressTwo = $.trim($('#txt-addressln-two').val());
        var state =$.trim($('#txt-State').val());
        var zipCode =$.trim($('#txt-Zip-Code').val());
        var contactNumber = $.trim($('#txt-Contact-Number').val());
        var paymentTerms =$('#slt-Payment-Terms').val();
        var ssnNumber = $.trim($('#txt-SSN').val());
        var url = $.trim($('#txt-Website-Url').val());
        var existingEmails = masterData["VendorEmail"];

        //Bank Details
        var accountHolderName = $.trim($('#txt-Account-Holder-Name').val());
        var accountNumber =$.trim($('#txt-Account-Number').val());
        var achRoutingNumber = $.trim($('#txt-Routing-Number').val());
        var reEnterAccountNumber = $.trim($('#txt-reenter-Account-Number').val());
        var prefferredPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var glCode = $('#slt-GL-Codes').val();


        if (vendorName == '' || vendorName == null) {
            isValid = false;
            $('#vendorName-Validation').show();
        }
        if (email == '' || email == null) {
            isValid = false;
            $('#vendorEmail-Validation').show();
        }
        //if (glCode == '0' || glCode == null) {
        //    $('#Gl-Code-Validation').show();
        //    isValid = false;
        //}
        //if (city == '' || city == null) {
        //    isValid = false;
        //    $('#vendorCity-Validation').show();
        //}
        //if (addressOne == '' || addressOne == null) {
        //    isValid = false;
        //    $('#vendorAddressOne-Validation').show();
        //}
        //if (addressTwo == '' || addressTwo == null) {
        //    isValid = false;
        //    $('#vendorAddresstwo-Validation').show();
        //}
        //if (state == '' || state == null) {
        //    isValid = false;
        //    $('#vendorState-Validation').show();
        //}
        //if (zipCode == '' || zipCode == null) {
        //    isValid = false;
        //    $('#vendorZip-Validation').show();
        //}
        //if (paymentTerms == '0' || paymentTerms == null) {
        //    isValid = false;
        //    $('#vendorPaymentTerm-Validation').show();
        //}
        //if (contactNumber == '' || contactNumber == null) {
        //    isValid = false;
        //    $('#vendorContact-Validation').show();
        //}
        //if (prefferredPaymentMethod == '0' || prefferredPaymentMethod == null) {
        //    isValid = false;
        //    $('#PrefferedPaymentTerm-Validation').show();
        //}
        //if (glCode == '0' || glCode == null) {
        //    isValid = false;
        //    $('#Gl-Code-Validation').show();
        //}
        ////if (ssnNumber == '' || ssnNumber == null) {
        ////    isValid = false;
        ////    $('#vendorSSN-Validation').show();
        ////}
        ////if (url == '' || url == null) {
        ////    isValid = false;
        ////    $('#vendorURL-Validation').show();
        ////}
        ////if (accountHolderName == '' || accountHolderName == null) {
        ////    isValid = false;
        ////    $('#vendorBnkAccHolderName-Validation').show();
        ////}
        ////if (accountNumber == '' || accountNumber == null) {
        ////    isValid = false;
        ////    $('#vendorAccNumber-Validation').show();
        ////}
        ////if (achRoutingNumber == '' || achRoutingNumber == null) {
        ////    isValid = false;
        ////    $('#vendorRoutingNumber-Validation').show();
        ////}
        if (accountNumber != '' && (reEnterAccountNumber == '' || reEnterAccountNumber == null)) {
            $('#vendorEmptReAccNumber-Validation').show();
            isValid = false;
        }
        if (reEnterAccountNumber != '' && accountNumber != reEnterAccountNumber)
        {
            $('#vendorReAccNumber-Validation').show();
            isValid = false;
        }

        if (email != '') {
            if (editVendorID == 0) {
                if (existingEmails != null && existingEmails != undefined && existingEmails.length > 0) {
                    var matchedUserRecord = GetmatchedRecord(existingEmails, 'Email', email);
                    if (matchedUserRecord.length > 0) {
                        isValid = false;
                        $('#vendorDuplicateEmail-Validation').show();
                    }
                }
            }
            else {
                var vendorDetails = editVendordata["VendorDetails"];
                if (vendorDetails != null && vendorDetails != undefined && vendorDetails.length > 0) {
                    existingEmails = GetunmatchedRecord(existingEmails, 'Email', vendorDetails[0]["Email"]);
                    if (existingEmails != null && existingEmails != undefined && existingEmails.length > 0) {
                        var matchedUserRecord = GetmatchedRecord(existingEmails, 'Email', email);
                        if (matchedUserRecord.length > 0) {
                            isValid = false;
                            $('#vendorDuplicateEmail-Validation').show();
                        }
                    }
                }
               
            }
        }
       
        return isValid;

    }

    var BindDropDowns = function ($el, lst, DefaultItem, selected) {
        var html = '';
        if (lst != null && lst != undefined && lst.length > 0)
        {
            distinctlst = ObjSorter(lst, "Value1", '123');
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (selected == item["KeyListID"]) {
                    html += '<option selected value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
                }
                else {
                    html += '<option value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
                }

            });
            $el.html(html);
        }

    }

   var RegisterNumberOnly=function () {
       $('.number-only').mask('#');
       //$('[phone-Number]').mask('+0 (000) 000-0000');
       $('[data-taxid]').mask('000-000-000')
       //$('#txt-Account-Holder-Name').mask('Z', { translation: { 'Z': { pattern: /[a-zA-Z0-9 ]/, recursive: true } } })

   }

   var RegisterAlphabetsOnly = function () {
       $('.alphabets-only').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
           translation: {
               'Z': {
                   pattern: /[a-zA-Z ]/, reverse: true
               }
           }
       });

       $('.twAlbhabets-only').mask('ZZZZZZZZZZZZZZZZZZZZ', {
           translation: {
               'Z': {
                   pattern: /[a-zA-Z ]/, reverse: true
               }
           }
       })
   }

   var VendorInsertProcess = function () {
      CreateReferenceKey();
      
   }

   var RegisterSelectPicker = function () {
       $('.select2').select2({});
       $('.select2.no-search').select2({
           minimumResultsForSearch: Infinity
       });
   }
   
   var VendorUpdateProcess = function () {
       UpdateReferenceKey();
   }
  
}

//File Drag and Drop
{
    var RegisterFileDrop = function () {

        //if (editBillId == 0)
        //{
        // if (fileContainer.length == 0) {

        $("#file_Viewer").on({

            'dragover dragenter': function (e) {
                $('#file_Viewer').addClass('isc-bill-drag')
                fileContainer = [];
                e.preventDefault();
                e.stopPropagation();

            },

            'drop': function (e, ui) {
                e.preventDefault();
                fileContainer = [];
                var dataTransfer = e.originalEvent.dataTransfer;
                var Files = dataTransfer.files;
                $('#file_Viewer').removeClass('isc-bill-drag');
               // var Files = $(this).prop("files");
                fileContainer = [];
                var type = Files[0]["type"];
                const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
                if (size > 10) {
                    $(this).val('');
                    $.notify("File Size should not  greater than 10 MB,Select another file  ", { position: "right top", className: "error" });
                }
                else if ($.inArray(type, ['image/png', 'image/jpg', 'image/jpeg']) == -1) {
                    $(this).val('');
                    $.notify("File extention is not allowed,Select another file  ", { position: "right top", className: "error" });
                }
                else {
                    fileContainer.push(Files[0])
                    fileSize = size;
                    saveFiles();
                    fileName = fileResponse["ModifiedFileName"];
                    VendorLogoFrames(fileName)
                }
                
            }
        });
    }
}