//Global Variables
{
    var masterData = [];
    var fileContainer = [];
    var fileName = '';
    var editShipperID = 0;
    var editShipperData = [];

}

//Load && Events
{
    $(document).ready(function () {
        editShipperID = ((GetQueryStrings()["ShipperID"] == undefined || GetQueryStrings()["ShipperID"] == null) ? 0 : GetQueryStrings()["ShipperID"]);
        BindCreateShipperScreen();
        ShipperRegistration();

    });

    $(document).on('click', '#save-Shipper', function () {
        if (ValidateShipper() && $("span[error-active='true']").length == 0) {
            SaveShipper();
        }

    });

    $(document).on('click', '#cancel', function () {
        GoBack();
    });

    $(document).on('click', '#update-Shipper', function () {
        if (ValidateShipper() && $("span[error-active='true']").length == 0) {
            UpdateShipper();
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
    var BindCreateShipperScreen = function () {

        masterData = GetMasterData();

        var createShipperEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createShipperEntity.length > 0) {
            $('#save-Shipper').show();
        }
        else {
            $('#save-Shipper').hide();
        }
        if (editShipperID != 0) {
            editShipperData = GetEditShipperData();
            BindEditShipperDetails(editShipperData["ShipperData"]);
        }
    }

    var BindEditShipperDetails = function (ShipperData) {
        
        $('#ShipperName').val(ShipperData[0]['ShipperName'])
        $('#Email').val(ShipperData[0]['ShipperEmail'])
        $('#contact-Number').val(ShipperData[0]['ShipperContactNumber'])
        $('#Alternative-contact-Number').val(ShipperData[0]['ShipperAltContactNumber'])
        $('#Shipper').val(ShipperData[0]['ShipperNo'])
        $('#GST').val(ShipperData[0]['ShipperGST'])
        $('#ApprovalNo').val(ShipperData[0]['ApprovalNo'])

        $('#Drip').val(ShipperData[0]['DripCapital'])
        $('#Shipperaddress').val(ShipperData[0]['ShipperAddress'])
        $('#Shippercity').val(ShipperData[0]['ShipperCity'])
        $('#ShipperState').val(ShipperData[0]['ShipperState'])
        $('#ShipperCountry').val(ShipperData[0]['ShipperCountry'])
        $('#ShipperZip').val(ShipperData[0]['ShipperZip'])

        $('#PPaddress').val(ShipperData[0]['ProcessPackedaddress'])
        $('#PPcity').val(ShipperData[0]['ProcessPackedCity'])
        $('#PPstate').val(ShipperData[0]['ProcessPackedState'])
        $('#PPCountry').val(ShipperData[0]['ProcessPackedCountry'])
        $('#PPZip').val(ShipperData[0]['ProcessPackedZip'])

        $('#PPname').val(ShipperData[0]['ProcessPacked'])
        $('#PPApproval-Number').val(ShipperData[0]['ProcessPackedAppno'])

        $('#page-Title').html('Update Shipper');
        $('#save-Shipper').hide();

        var updateShipperEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateShipperEntity.length > 0) {
            $('#update-Shipper').show();
        }
    }
}

//Data
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("AddShipper.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    //AJAX Call for file upload

    var SaveShipper = function () {
        var _obj = {

            'ShipperName': $('#ShipperName').val(),
            'ShipperEmail': $('#Email').val(),
            'ShipperContactNumber': $('#contact-Number').val(),
            'ShipperAltContactNumber': $('#Alternative-contact-Number').val(),
            'ShipperNo': $('#Shipper').val(),
            'ShipperGST': $('#GST').val(),
            'ApprovalNo': $('#ApprovalNo').val(),

            'DripCapital': $('#Drip').val(),
            'ShipperAddress': $('#Shipperaddress').val(),
            'ShipperCity': $('#Shippercity').val(),
            'ShipperState': $('#ShipperState').val(),
            'ShipperCountry': $('#ShipperCountry').val(),
            'ShipperZip': $('#ShipperZip').val(),

            'ProcessPackedaddress': $('#PPaddress').val(),
            'ProcessPackedCity': $('#PPcity').val(),
            'ProcessPackedState': $('#PPstate').val(),
            'ProcessPackedCountry': $('#PPCountry').val(),
            'ProcessPackedZip': $('#PPZip').val(),

            'ProcessPacked': $('#PPname').val(),
            'ProcessPackedAppno': $('#PPApproval-Number').val(),
        }
        var insertObj = {
            'objShipper': _obj
        }
        $.when(RequestServer("AddShipper.aspx/SaveShipper", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Shipper created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Shipper !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditShipperData = function () {
     
        var _obj = {
            'ShipperID': parseInt(editShipperID)
        };
        var tempList = {};
        $.when(RequestServer("AddShipper.aspx/GetEditShipperData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var UpdateShipper = function () {

        var _obj = {
            'ShipperID': parseInt(editShipperID),

            'ShipperName': $('#ShipperName').val(),
            'ShipperEmail': $('#Email').val(),
            'ShipperContactNumber': $('#contact-Number').val(),
            'ShipperAltContactNumber': $('#Alternative-contact-Number').val(),
            'ShipperNo': $('#Shipper').val(),
            'ShipperGST': $('#GST').val(),
            'ApprovalNo': $('#ApprovalNo').val(),

            'DripCapital': $('#Drip').val(),
            'ShipperAddress': $('#Shipperaddress').val(),
            'ShipperCity': $('#Shippercity').val(),
            'ShipperState': $('#ShipperState').val(),
            'ShipperCountry': $('#ShipperCountry').val(),
            'ShipperZip': $('#ShipperZip').val(),

            'ProcessPackedaddress': $('#PPaddress').val(),
            'ProcessPackedCity': $('#PPcity').val(),
            'ProcessPackedState': $('#PPstate').val(),
            'ProcessPackedCountry': $('#PPCountry').val(),
            'ProcessPackedZip': $('#PPZip').val(),

            'ProcessPacked': $('#PPname').val(),
            'ProcessPackedAppno': $('#PPApproval-Number').val(),
        }
        var updateObj = {
            'objShipper': _obj
        }

        $.when(RequestServer("AddShipper.aspx/UpdateShipper", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Shipper updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a Shipper !!", { position: "right top", className: "error" });
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

    var ShipperRegistration = function () {
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

    var ValidateShipper = function () {
        var isvalid = true;
        var ShipperName = $.trim($('#ShipperName').val());
        var address = $.trim($('#Shipperaddress').val());

        if (ShipperName == '' || ShipperName == null) {
            isvalid = false;
            $('#ShipperName-Validation').show();
        }
        if (address == '' || address == null) {
            isvalid = false;
            $('#Shipperaddress-Validation').show();
        }

        if (ShipperName != '') {
           
            var existingShipper = masterData["ExistingShipper"];
            if (existingShipper != null && existingShipper != undefined && existingShipper.length > 0) {
                if (editShipperID == 0) {
                    var matchedShipperRecord = GetmatchedRecord(existingShipper, 'ShipperName', ShipperName);
                    if (matchedShipperRecord.length > 0) {
                        isvalid = false;
                        $.notify("Shipper Name is already exists!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var unMatchedShipper = GetunmatchedRecord(existingShipper, 'ShipperID', editShipperID);
                    var matchedShipperRecord = GetmatchedRecord(unMatchedShipper, 'ShipperName', ShipperName);
                    if (matchedShipperRecord.length > 0) {
                        isvalid = false;
                        $.notify("Shipper Name is already exists!", { position: "right top", className: "error" });
                    }
                }
            }

        }
        return isvalid;
    }
}

