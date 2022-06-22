//Global
{
    var editDesignationtID = 0;
    var existingDesignation = [];
    var editData = [];
}

//Load And events
{
    $(document).ready(function () {
        editDesignationtID = ((GetQueryStrings()["DesignationID"] == undefined || GetQueryStrings()["DesignationID"] == null) ? 0 : GetQueryStrings()["DesignationID"]);
        BindDesignationCreateScreen();
    });

    $(document).on('click', '#save-Designation', function () {
        if (ValidateDesignation()) {
            SaveDesignation();
        }
    });

    $(document).on('click', '#update-Designation', function () {
        if (ValidateDesignation()) {
            UpdateDesignation();
        }
    });

    $(document).on('click', '#cancel-Designation', function () {
        GoBack();
    });

    $(document).on('keyup', '[data-textbox]', function () {
        if ($.trim($(this).val()) != '') {
            $("span.validation-message[data-validation='" + $(this).attr("data-textbox") + "']").hide();
        }

    });

    $(document).on('change', '[data-Select]', function () {
        var $this = $(this);
        if ($.trim($(this).val()) != '') {
            $("span.validation-message[data-validation='" + $(this).attr("data-Select") + "']").hide();
        }
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
}

//Dom
{
    var BindDesignationCreateScreen = function () {

        var masterData = GetMasterData();

        existingDesignation = masterData["ExistingDesignation"];
        var createDesignationEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3026');
        if (createDesignationEntity.length > 0) {
            $('#save-Designation').show();
        }
        else {
            $('#save-Designation').hide();
        }

        if (editDesignationID != 0) {
            BindEditDetails();
        }
    }

    var BindEditDetails = function () {
        editData = GetEditDesignationData();
        editData = editData["EditDetails"];
        $('#DesignationCode').val((editData[0]["DesignationCode"] == null ? '' : editData[0]["DesignationCode"]))
        $('#DesignationName').val((editData[0]["DesignationName"] == null ? 0 : editData[0]["DesignationName"]))
        $('#pageTitle').html('Update Designation');

        $('#save-Designation').hide();
        var updateDesignationEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3027');
        if (updateDesignationEntity.length > 0) {
            $('#update-Designation').show();
        }

    }
}

//Data
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("AddDesignation.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }


    var SaveDesignation = function () {
        var _obj = {
            'DesignationCode': $('#DesignationCode').val(),
            'DesignationName': $('#DesignationName').val(),
        }
        var insertObj = {
            'objDesignation': _obj
        }

        $.when(RequestServer("AddDesignation.aspx/SaveDesignation", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Designation created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Designation !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditDesignationData = function () {
        var _obj = {
            'DesignationtID': parseInt(editDesignationtD)
        };
    }

    var UpdateProject = function () {
        var _obj = {
            'DesignationCode': $('#DesignationCode').val(),
            'DesignationName': $('#DesignationName').val(),
            'DesignationtID': editDesignationtID

        }
        var updateObj = {
            'objDesignation': _obj
        }

        $.when(RequestServer("AddDesignation.aspx/UpdateDesignation", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Designation updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a Designation !!", { position: "right top", className: "error" });
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
    var ValidateDesignationNull = function () {

        var isValid = true;
        var DesignationName = $.trim($('#DesignationName').val());
        var Designationcode = $.trim($('#Designationcode').val());
      

        if (DesignationName == null || DesignationName == '') {
            isValid = false;
            $('#DesignationName-Validation').show();
        }

        if (Designationcode == null || Designationcode == '0') {
            isValid = false;
            $('#Designationcode-Validation').show();
        }
    }
    var ValidateDesignation = function () {
        var isValid = true;
        var DesignationName = $.trim($('#DesignationName').val());
        var Designationcode = $.trim($('#Designationcode').val());
       
        if (DesignationName == null || DesignationName == '') {
            isValid = false;
            $('#DesignationName-Validation').show();
        }
        if (Designationcode == null || Designationcode == '0') {
            isValid = false;
            $('#Designationcode-Validation').show();
        }
       
        if (existingDesignation != undefined) {
            if (existingDesignation != null && existingDesignation != undefined && existingDesignation.length > 0 && Designationcode != ''); {
                if (editDesignationID == 0) {

                    var matchedDesignation = GetmatchedRecord(existingDesignation, 'DesignationCode', DesignationCode);
                    if (matchedDesignation != null && matchedDesignation != undefined && matchedDesignation.length > 0) {
                        isValid = false;
                        $.notify("Designation is already exists !!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var existingDesignation = editData[0]["DesignationName"];
                    var unmatchedDesignation = GetunmatchedRecord(existingDesignation, 'DesignationCode', editingDesignationCode);
                    var matchedDesignation = GetmatchedRecord(unmatchedDesignation, 'DesignationCode', DesignationCode);
                    if (matchedDesignation != null && matchedDesignation != undefined && matchedDesignation.length > 0) {
                        isValid = false;
                        $.notify("Designation is already exists !!", { position: "right top", className: "error" });
                    }
                }

            }

        }
        return isValid;
    }
}