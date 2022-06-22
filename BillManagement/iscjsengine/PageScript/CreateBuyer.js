//Global Variables
{
    var masterData = [];
    var fileContainer = [];
    var fileName = '';
    var editBuyerID = 0;
    var editBuyerData = [];

}

//Load && Events
{
    $(document).ready(function () {
        editBuyerID = ((GetQueryStrings()["BuyerID"] == undefined || GetQueryStrings()["BuyerID"] == null) ? 0 : GetQueryStrings()["BuyerID"]);
        BindCreateBuyerScreen();
        BuyerRegistration();

    });

    $(document).on('click', '#save-Buyer', function () {
        if (ValidateBuyer() && $("span[error-active='true']").length == 0) {
            SaveBuyer();
        }

    });

    $(document).on('click', '#cancel', function () {
        GoBack();
    });

    $(document).on('click', '#update-Buyer', function () {
        if (ValidateBuyer() && $("span[error-active='true']").length == 0) {
            UpdateBuyer();
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
}

//Dom
{
    var BindCreateBuyerScreen = function () {

        masterData = GetMasterData();

        var createBuyerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createBuyerEntity.length > 0) {
            $('#save-Buyer').show();
        }
        else {
            $('#save-Buyer').hide();
        }
        if (editBuyerID != 0) {
            editBuyerData = GetEditBuyerData();
            BindEditBuyerDetails(editBuyerData["BuyerData"]);
        }
    }

    var BindEditBuyerDetails = function (BuyerData) {

        $('#Buyername').val(BuyerData[0]['BuyerName'])
        $('#Email').val(BuyerData[0]['Email'])
        $('#contact-Number').val(BuyerData[0]['ContactNumber'])
        $('#Alternative-contact-Number').val(BuyerData[0]['AltContactNumber'])
        $('#Fax').val(BuyerData[0]['BuyerFax'])
        $('#Liners').val(BuyerData[0]['Liners'])
        $('#Tax').val(BuyerData[0]['Tax_id'])

        $('#Buyeraddress').val(BuyerData[0]['CustomerAddress'])
        $('#Buyercity').val(BuyerData[0]['City'])
        $('#BuyerState').val(BuyerData[0]['State'])
        $('#BuyerCountry').val(BuyerData[0]['Country'])
        $('#BuyerZip').val(BuyerData[0]['Zip'])

        $('#Courieraddress').val(BuyerData[0]['Courieraddress'])
        $('#Couriercity').val(BuyerData[0]['CourierCity'])
        $('#Courierstate').val(BuyerData[0]['CourierState'])
        $('#CourierCountry').val(BuyerData[0]['CourierCountry'])
        $('#CourierZip').val(BuyerData[0]['CourierZip'])

        $('#Couriername').val(BuyerData[0]['CourierAttnName'])
        $('#Couriercontact-Number').val(BuyerData[0]['CourierContactNumber'])
        $('#CourierAlternativecontact-Number').val(BuyerData[0]['CourierAltContactNumber'])
        $('#CourierEmail').val(BuyerData[0]['CourierEmail'])

        $('#page-Title').html('Update Buyer');
        $('#save-Buyer').hide();

        var updateBuyerEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateBuyerEntity.length > 0) {
            $('#update-Buyer').show();
        }
    }
}

//Data
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("AddBuyer.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    //AJAX Call for file upload

    var SaveBuyer = function () {
        var _obj = {

            'BuyerName': $('#Buyername').val(),
            'Email': $('#Email').val(),
            'ContactNumber': $('#contact-Number').val(),
            'AltContactNumber': $('#Alternative-contact-Number').val(),
            'BuyerFax': $('#Fax').val(),
            'Liners': $('#Liners').val(),
            'Tax_id': $('#Tax').val(),

            'CustomerAddress': $('#Buyeraddress').val(),
            'City': $('#Buyercity').val(),
            'State': $('#BuyerState').val(),
            'Country': $('#BuyerCountry').val(),
            'Zip': $('#BuyerZip').val(),

            'Courieraddress': $('#Courieraddress').val(),
            'Couriercity': $('#Couriercity').val(),
            'Courierstate': $('#Courierstate').val(),
            'CourierCountry': $('#CourierCountry').val(),
            'CourierZip': $('#CourierZip').val(),

            'CourierAttnName': $('#Couriername').val(),
            'CourierContactNumber': $('#Couriercontact-Number').val(),
            'CourierAltContactNumber': $('#CourierAlternativecontact-Number').val(),
            'CourierEmail': $('#CourierEmail').val(),

        }
        var insertObj = {
            'objBuyer': _obj
        }
        $.when(RequestServer("AddBuyer.aspx/SaveBuyer", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Buyer created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Buyer !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditBuyerData = function () {
     
        var _obj = {
            'BuyerID': parseInt(editBuyerID)
        };
        var tempList = {};
        $.when(RequestServer("AddBuyer.aspx/GetEditBuyerData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var UpdateBuyer = function () {

        var _obj = {
            'BuyerID': parseInt(editBuyerID),
            'BuyerName': $('#Buyername').val(),
            'Email': $('#Email').val(),
            'ContactNumber': $('#contact-Number').val(),
            'AltContactNumber': $('#Alternative-contact-Number').val(),
            'BuyerFax': $('#Fax').val(),
            'CustomerAddress': $('#Buyeraddress').val(),
            'City': $('#Buyercity').val(),
            'State':$('#BuyerState').val(),
            'Country': $('#BuyerCountry').val(),
            'Zip': $('#BuyerZip').val(),
            'Courieraddress': $('#Courieraddress').val(),
            'CourierCity': $('#Couriercity').val(),
            'CourierState': $('#Courierstate').val(),
            'CourierCountry': $('#CourierCountry').val(),
            'CourierZip': $('#CourierZip').val(),
            'CourierAttnName': $('#Couriername').val(),
            'CourierContactNumber': $('#Couriercontact-Number').val(),
            'CourierAltContactNumber': $('#CourierAlternativecontact-Number').val(),
            'Liners': $('#Liners').val(),
            'Tax_id': $('#Tax').val(),
            'CourierEmail': $('#CourierEmail').val(),
        }
        var updateObj = {
            'objBuyer': _obj
        }

        $.when(RequestServer("AddBuyer.aspx/UpdateBuyer", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Buyer updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a Buyer !!", { position: "right top", className: "error" });
            }
        });
    }
}

//Common
{

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 1000);
    }

    var BuyerRegistration = function () {
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

    var ValidateBuyer = function () {
        var isvalid = true;
        var BuyerName = $.trim($('#Buyername').val());
        var address = $.trim($('#Buyeraddress').val());

        if (BuyerName == '' || BuyerName == null) {
            isvalid = false;
            $('#BuyerName-Validation').show();
        }
        if (address == '' || address == null) {
            isvalid = false;
            $('#address-Validation').show();
        }

        if (BuyerName != '') {
            var existingBuyer = masterData["ExistingBuyer"];
            if (existingBuyer != null && existingBuyer != undefined && existingBuyer.length > 0) {
                if (editBuyerID == 0) {
                    var matchedBuyerRecord = GetmatchedRecord(existingBuyer, 'BuyerName', BuyerName);
                    if (matchedBuyerRecord.length > 0) {
                        isvalid = false;
                        $.notify("Buyer Name is already exists!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var unMatchedBuyer = GetunmatchedRecord(existingBuyer, 'BuyerID', editBuyerID);
                    var matchedBuyerRecord = GetmatchedRecord(unMatchedBuyer, 'BuyerName', BuyerName);
                    if (matchedBuyerRecord.length > 0) {
                        isvalid = false;
                        $.notify("Buyer Name is already exists!", { position: "right top", className: "error" });
                    }
                }
            }

        }
        return isvalid;
    }
}

