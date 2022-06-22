//Global Variables
{
    var MasterData = [];
    //var fileContainer = [];
    //var fileName = '';
    //var editMalaysiaID = 0;
    var editLabelID = 0;
    var editMalaysiaData = [];

}

//Load && Events
{
    $(document).ready(function () {
       
        editLabelID = ((GetQueryStrings()["LabelID"] == undefined || GetQueryStrings()["LabelID"] == null) ? 0 : GetQueryStrings()["LabelID"]);
        BindCreateMalaysiaScreen();
        MalaysiaRegistration();

    });

    $(document).on('click', '#save-Malaysia', function () {

        if (ValidateMalaysia() && $("span[error-active='true']").length == 0) {

            SaveMalaysia();
        }

    });

    $(document).on('click', '#cancel', function () {
        GoBack();
    });

    $(document).on('click', '#update-Malaysia', function () {
       
        if (ValidateMalaysia() && $("span[error-active='true']").length == 0) {
            UpdateMalaysia();
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
    $(document).on('change', '#slt-Buyer', function () {
      
        var buyerData = getBuyerdata();
        BindEditbuyerData(buyerData["BuyerData"]);
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
    var BindCreateMalaysiaScreen = function () {
       masterData = GetMasterData();

        BindDropDowns($('#slt-Product'), masterData["Product"], 'Choose Product Name')
        BindDropDowns($('#slt-Buyer'), masterData["Buyer"], 'Choose Buyer Name')
        var createMalaysiaEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createMalaysiaEntity.length > 0) {
            $('#save-Malaysia').show();
        }
        else {
            $('#save-Malaysia').hide();
        }
        if (editLabelID != 0) {
            editMalaysiaData = GetEditMalaysiaData();
            BindEditMalaysiaDetails(editMalaysiaData["MalaysiaData"]);
        }
    }

    var BindEditMalaysiaDetails = function (MalaysiaData) {
        
        $('#slt-Product').val(MalaysiaData[0]["ProductID"]);
        $('#slt-Product').select2();

        $('#slt-Buyer').val(MalaysiaData[0]["BuyerID"]);
        $('#slt-Buyer').select2();

        var nextDue = moment.utc(MalaysiaData[0]["ProductionDate"]).toDate();
        var localDue = moment(nextDue).local().format('YYYY-MM-DD');

        $('#ProdDate').val(localDue);

        var nextDue = moment.utc(MalaysiaData[0]["BestBeforeDate"]).toDate();
        var localDue = moment(nextDue).local().format('YYYY-MM-DD');
        $('#BBDate').val(localDue);

        $('#Size').val(MalaysiaData[0]['Size'])
        $('#Origin').val(MalaysiaData[0]['Origin'])
        $('#Weight').val(MalaysiaData[0]['Weight'])
        $('#ApprovalNo').val(MalaysiaData[0]['ApprovalNo'])
        $('#NetWeight').val(MalaysiaData[0]['NetWeight'])
        $('#PCode').val(MalaysiaData[0]['ProductionCode'])
        $('#GrossWeight').val(MalaysiaData[0]['GrossWeight'])

        $('#Buyeraddress').val(MalaysiaData[0]['CustomerAddress'])
        $('#Buyercity').val(MalaysiaData[0]['City'])
        $('#BuyerState').val(MalaysiaData[0]['State'])
        $('#BuyerCountry').val(MalaysiaData[0]['Country'])
        $('#BuyerZip').val(MalaysiaData[0]['Zip'])

        $('#page-Title').html('Update Malaysia');
        $('#save-Malaysia').hide();

        var updateMalaysiaEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateMalaysiaEntity.length > 0) {
            $('#update-Malaysia').show();
        }
    }
    var BindEditbuyerData = function (BuyerData) {

        $('#Buyeraddress').val(BuyerData[0]['CustomerAddress'])
        $('#Buyercity').val(BuyerData[0]['City'])
        $('#BuyerState').val(BuyerData[0]['State'])
        $('#BuyerCountry').val(BuyerData[0]['Country'])
        $('#BuyerZip').val(BuyerData[0]['Zip'])
        }
    }


//Data
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("AddMalaysia.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var getBuyerdata = function () {
        var _obj = {
            'BuyerID': parseInt($('#slt-Buyer').val())
        };
        var tempList = {};
        $.when(RequestServer("AddMalaysia.aspx/GetBuyerData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    //AJAX Call for file upload

    var SaveMalaysia = function () {

        var _obj = {
            'ProductID':parseInt($('#slt-Product').val()),
            'Size': $('#Size').val(),
            'Origin': $('#Origin').val(),
            'Weight': $('#Weight').val(),
            'ApprovalNo': $('#ApprovalNo').val(),
            'NetWeight': $('#NetWeight').val(),
            'GrossWeight': $('#GrossWeight').val(),
            'ProductionCode': $('#PCode').val(),
            'ProductionDate': $('#ProdDate').val(),
            'BestBeforeDate': $('#BBDate').val(),
            'BuyerID': parseInt($('#slt-Buyer').val()),
            'address': $('#Buyeraddress').val(),
            'city': $('#Buyercity').val(),
            'state': $('#BuyerState').val(),
            'Country': $('#BuyerCountry').val(),
            'Zip': $('#BuyerZip').val(),
        }
       
        var insertObj = {
            'objMalaysia': _obj
        }
        $.when(RequestServer("AddMalaysia.aspx/SaveMalaysia", insertObj)).done(function (response) {

            if (parseInt(response) > 0) {
                $.notify("Malaysia created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Malaysia Label !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditMalaysiaData = function () {
     
        var _obj = {
            'LabelID': parseInt(editLabelID)
        };
        var tempList = {};
        $.when(RequestServer("AddMalaysia.aspx/GetEditMalaysiaData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var UpdateMalaysia = function () {

        var _obj = {

            'ProductID': parseInt($('#slt-Product').val()),
            'Size': $('#Size').val(),
            'Origin': $('#Origin').val(),
            'Weight': $('#Weight').val(),
            'ApprovalNo': $('#ApprovalNo').val(),
            'NetWeight': $('#NetWeight').val(),
            'GrossWeight': $('#GrossWeight').val(),
            'ProductionCode': $('#PCode').val(),
            'ProductionDate': $('#ProdDate').val(),
            'BestBeforeDate': $('#BBDate').val(),
            'BuyerID': parseInt($('#slt-Buyer').val()),
            'address': $('#Buyeraddress').val(),
            'city': $('#Buyercity').val(),
            'state': $('#BuyerState').val(),
            'Country': $('#BuyerCountry').val(),
            'Zip': $('#BuyerZip').val(),
            'LabelID': parseInt(editLabelID),
        }
        var updateObj = {
            'objMalaysia': _obj
        }

        $.when(RequestServer("AddMalaysia.aspx/UpdateMalaysia", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Malaysia Label updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a Malaysia Label !!", { position: "right top", className: "error" });
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

    var MalaysiaRegistration = function () {
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

    var ValidateMalaysia = function () {
        var isvalid = true;
        var origin = $.trim($('#Origin').val());
        var weight = $.trim($('#Weight').val());
        var GrossWeight = $.trim($('#GrossWeight').val());
        var NetWeight = $.trim($('#NetWeight').val());
        var Size = $.trim($('#Size').val());
        var AppNo = $.trim($('#ApprovalNo').val());
        var ProductionCode = $.trim($('#PCode').val());

        if (origin == '' || origin == null) {
            isvalid = false;
            $('#Origin-Validation').show();
        }
        if (weight == '' || weight == null) {
            isvalid = false;
            $('#Weight-Validation').show();
        }
        if (GrossWeight == '' || GrossWeight == null) {
            isvalid = false;
            $('#GrossWeight-Validation').show();
        }
        if (NetWeight == '' || NetWeight == null) {
            isvalid = false;
            $('#NetWeight-Validation').show();
        }
        if (Size == '' || Size == null) {
            isvalid = false;
            $('#Size-Validation').show();
        }
        if (AppNo == '' || AppNo == null) {
            isvalid = false;
            $('#Approval-Validation').show();
        }
        if (ProductionCode == '' || ProductionCode == null) {
            isvalid = false;
            $('#PCode-Validation').show();
        }



        if (ProductionCode != '') {

            var existingMalaysiaLabel = masterData["ExistingMalaysia"];
            if (existingMalaysiaLabel != null && existingMalaysiaLabel != undefined && existingMalaysiaLabel.length > 0) {
                if (editLabelID == 0) {
      
                    var matchedMalaysiaRecord = GetmatchedRecord(existingMalaysiaLabel, 'ProductionCode', ProductionCode);

                    if (matchedMalaysiaRecord.length > 0) {
                        isvalid = false;
                        $.notify("Label is already exists!", { position: "right top", className: "error" });
                    }
                }
                else {

                    //var unMatchedMalaysia = GetunmatchedRecord(existingMalaysiaLabel, 'LabelID', editLabelID);
                    //var matchedMalaysiaRecord = GetmatchedRecord(unMatchedMalaysia, 'ProductionCode', ProductionCode);
                    //if (matchedMalaysiaRecord.length > 0) {
                    //    isvalid = false;
                    //    $.notify("Label is already exists!", { position: "right top", className: "error" });
                    //}
                }
            }

        }
        return isvalid;
        
    }
}
