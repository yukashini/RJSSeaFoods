//Global Variables
{
    var masterData = [];
    var fileContainer = [];
    var fileName = '';
    var editCustomerID = 0;
    var editCustomerData = [];

}

//Load && Events
{
    $(document).ready(function () {
        editCustomerID = ((GetQueryStrings()["CustomerID"] == undefined || GetQueryStrings()["CustomerID"] == null) ? 0 : GetQueryStrings()["CustomerID"]);
        BindCreateCustomerScreen();
        CustomRegistration();

    });

    $(document).on('click', '#save-Customer', function () {
        if (ValidateCustomer() && $("span[error-active='true']").length == 0) {
            SaveCustomer();
        }

    });

    $(document).on('click', '#cancel', function () {
        GoBack();
    });

    $(document).on('click', '#update-Customer', function () {
        if (ValidateCustomer() && $("span[error-active='true']").length == 0) {
            UpdateCustomer();
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
        html += '<h2>LOGO</h2>';
        html += '<span class="isc-btn-inp-typ-file-s1" style="top: 126px !Important;" >Choose Company Logo';
        html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
        html += '</span>';
        $('#file_Viewer').html(html);
    });
}

//Dom
{
    var BindCreateCustomerScreen = function () {
        
        masterData = GetMasterData();

        BindDropDowns($('#slt-CustomerType'), masterData["CustomerType"], 'Choose Customer Type')
        BindDropDowns($('#slt-Payment-Terms'), masterData["PaymentTerms"], 'Choose Payment Terms')
        BindDropDowns($('#slt-Prefferd-Payment-Method'), masterData["PrefferredPaymentType"], 'Choose Preferred Payment Method')


        var createCustomerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createCustomerEntity.length > 0) {
            $('#save-Customer').show();
        }
        else {
            $('#save-Customer').hide();
        }
        if (editCustomerID != 0) {
            editCustomerData = GetEditCustomerData();
            BindEditCustomerDetails(editCustomerData["CustomerData"]);
        }
    }

    var BindEditCustomerDetails = function (customerData) {

        $('#Custname').val(customerData[0]['CustomerName'])

        if (customerData[0]['CutomerType'] != "") {

            $('#slt-CustomerType').val(customerData[0]['CutomerType'])
        }
        else {
            $('#slt-CustomerType').val(0)
        }

        $('#slt-CustomerType').select2()
        if (customerData[0]['PaymentTerms'] != null) {

            $('#slt-Payment-Terms').val(customerData[0]['PaymentTerms'])
        }
        else {

            $('#slt-Payment-Terms').val(0)
        }
        $('#slt-Payment-Terms').select2()
        if (customerData[0]['PaymentMethod'] != null) {

            $('#slt-Prefferd-Payment-Method').val(customerData[0]['PaymentMethod'])
        }
        else {
            $('#slt-Prefferd-Payment-Method').val(0)
        }
        $('#slt-Prefferd-Payment-Method').select2()

        $('#Email').val(customerData[0]['Email'])
        $('#contact-Number').val(customerData[0]['ContactNumber'])
        $('#address').val(customerData[0]['CustomerAddress'])
        $('#city').val(customerData[0]['City'])
        $('#zip').val(customerData[0]['Zip'])
        $('#state').val(customerData[0]['State'])

        $('#shippingaddress').val(customerData[0]['Shippingaddress'])
        $('#billingaddress').val(customerData[0]['BillingAddress'])
        $('#txt-Account-Holder-Name').val(customerData[0]['AccountHoldername'])
        $('#txt-Account-Number').val(customerData[0]['AccountNumber'])
        $('#txt-Routing-Number').val(customerData[0]['RoutingNumber'])
        $('#txt-reenter-Account-Number').val(customerData[0]['AccountNumber'])

        $('#page-Title').html('Update Customer');
        $('#save-Customer').hide();
        if (customerData[0]["CustomerLogo"] != '' && customerData[0]["CustomerLogo"] != null) {
            fileName = customerData[0]["CustomerLogo"]
            CustomerLogoFrames(customerData[0]["CustomerLogo"]);
        }

        var updateCustomerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateCustomerEntity.length > 0) {
            $('#update-Customer').show();
        }
    }

    var CustomerLogoFrames = function (fileImage) {
        $('#file_Viewer').html('');
        var iframe = document.getElementById("bill_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "bill_Frame";
            var iframewidth = 390;
            var sourcePath = "Requested Source Path: " + customerLogoPathUrl + fileImage;
            //WriteSourcePath(sourcePath);
            iframe.src = customerLogoPathUrl + fileImage;
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 100%; overflow: hidden; overflow-y: auto;");
            $('#iframe img').addClass('img-responsive');
            $('#file_Viewer').append(iframe);
            isAttchment = 1;
        }
    }
}

//Data
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("AddCustomer.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
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
                url: "CustomerLogo.ashx",
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

    var SaveCustomer = function () {
        var _obj = {
            'CustomerName': $('#Custname').val(),
            'CustomerType': parseInt($('#slt-CustomerType').val()),
            'Email': $('#Email').val(),
            'ContactNumber': $('#contact-Number').val(),
            'CustomerAddress': $('#address').val(),
            'City': $('#city').val(),
            'Zip': $('#zip').val(),
            'State': $('#state').val(),
            'CustomerLogo': fileName,
            'PaymentTerms': parseInt($('#slt-Payment-Terms').val()),
            'PaymentMethod': parseInt($('#slt-Prefferd-Payment-Method').val()),
            'Shippingaddress': $('#shippingaddress').val(),
            'BillingAddress': $('#billingaddress').val(),
            'AccountHoldername': $('#txt-Account-Holder-Name').val(),
            'AccountNumber': $('#txt-Account-Number').val(),
            'RoutingNumber': $('#txt-Routing-Number').val()
        }
        var insertObj = {
            'objCustomer': _obj
        }
        $.when(RequestServer("AddCustomer.aspx/SaveCustomer", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Customer created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a customer !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditCustomerData = function () {
     
        var _obj = {
            'customerID': parseInt(editCustomerID)
        };
        var tempList = {};
        $.when(RequestServer("AddCustomer.aspx/GetEditCustomerData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var UpdateCustomer = function () {

        var _obj = {
            'CustomerName': $('#Custname').val(),
            'CustomerType': parseInt($('#slt-CustomerType').val()),
            'Email': $('#Email').val(),
            'ContactNumber': $('#contact-Number').val(),
            'CustomerAddress': $('#address').val(),
            'City': $('#city').val(),
            'Zip': $('#zip').val(),
            'State': $('#state').val(),
            'CustomerLogo': fileName,
            'CustomerID': parseInt(editCustomerID),
            'PaymentTerms': parseInt($('#slt-Payment-Terms').val()),
            'PaymentMethod': parseInt($('#slt-Prefferd-Payment-Method').val()),
            'Shippingaddress': $('#shippingaddress').val(),
            'BillingAddress': $('#billingaddress').val(),
            'AccountHoldername': $('#txt-Account-Holder-Name').val(),
            'AccountNumber': $('#txt-Account-Number').val(),
            'RoutingNumber': $('#txt-Routing-Number').val()
        }
        var updateObj = {
            'objCustomer': _obj
        }

        $.when(RequestServer("AddCustomer.aspx/UpdateCustomer", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Customer updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a customer !!", { position: "right top", className: "error" });
            }
        });
    }
}

//Common
{

    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');

            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 1000);
    }

    var CustomRegistration = function () {
        $('.number-only').mask('#');
        $('[data-taxid]').mask('000-000-000')
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

    var ValidateCustomer = function () {
       
        var isvalid = true;
        var custName = $.trim($('#Custname').val());
        var contact = $.trim($('#contact-Number').val());
        var accountNumber = $.trim($('#txt-Account-Number').val());
        var reEnterAccountNumber = $.trim($('#txt-reenter-Account-Number').val());
        if (custName == '' || custName == null) {
            isvalid = false;
            $('#CustomerName-Validation').show();
        }

        if (accountNumber != '' && (reEnterAccountNumber == '' || reEnterAccountNumber == null)) {
            $('#vendorEmptReAccNumber-Validation').show();
            isvalid = false;
        }
        if (reEnterAccountNumber != '' && accountNumber != reEnterAccountNumber) {
            $('#vendorReAccNumber-Validation').show();
            isvalid = false;
        }

        if (custName != '') {
            var existingCustomer = masterData["ExistingCustomers"];
            if (existingCustomer != null && existingCustomer != undefined && existingCustomer.length > 0) {
                if (editCustomerID == 0) {
                    var matchedCustomerRecord = GetmatchedRecord(existingCustomer, 'CustomerName', custName);
                    if (matchedCustomerRecord.length > 0) {
                        isvalid = false;
                        $.notify("Customer Name is already exists!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var unMatchedCustomers = GetunmatchedRecord(existingCustomer, 'CustomerID', editCustomerID);
                    var matchedCustomerRecord = GetmatchedRecord(unMatchedCustomers, 'CustomerName', custName);
                    if (matchedCustomerRecord.length > 0) {
                        isvalid = false;
                        $.notify("Customer Name is already exists!", { position: "right top", className: "error" });
                    }
                }
            }

        }
        return isvalid;
    }
}

//File Drag And Drop
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

            LogoFrames(fileName)
        }
    });

}



$(document).on('click', '#remove-Logo', function () {

    var html = "";
    fileName = "";
    fileContainer = [];
    html += '<h2>LOGO</h2>';
    html += '<span class="isc-btn-inp-typ-file-s1" >Choose Company Logo';
    html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
    html += '</span>';
    $('#file_Viewer').html(html);
});