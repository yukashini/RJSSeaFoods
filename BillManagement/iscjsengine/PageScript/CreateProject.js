//Global
{
    var editProjectID = 0;
    var existingProjects = [];
    var editData = [];
}

//Load And events
{
    $(document).ready(function () {
        editProjectID = ((GetQueryStrings()["ProjectID"] == undefined || GetQueryStrings()["ProjectID"] == null) ? 0 : GetQueryStrings()["ProjectID"]);
        BindProjectCreateScreen();
    });

    $(document).on('click', '#save-project', function () {
                if (ValidateProject()) {
                    SaveProject();
                }
    });

    $(document).on('click', '#update-project', function () {
        if (ValidateProject()) {
            UpdateProject();
        }
    });

    $(document).on('click', '#cancel-Project', function () {
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
    var BindProjectCreateScreen = function () {
        
        var masterData = GetMasterData();
        
         existingProjects = masterData["ExistingProjects"];
        BindDropDowns($('#slt-Customers'), masterData["Customers"], 'Choose Customer Name');
        BindDropDowns($('#slt-ProjectType'), masterData["ProjectTypes"], 'Choose Project Type');
        BindDropDowns($('#slt-Status'), masterData["ProjectStatus"], 'Choose Status');
        $('#slt-Status').val(50085);
        $('#slt-Status').select2();
        var createProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3026');
        if (createProjectEntity.length > 0) {
            $('#save-project').show();
        }
        else {
            $('#save-project').hide();
        }

        if (editProjectID != 0) {
            BindEditDetails();
        }
    }

    var BindEditDetails = function () {
        editData = GetEditProjectData();
        editData = editData["EditDetails"];
        $('#projName').val((editData[0]["ProjectName"] == null ? '' : editData[0]["ProjectName"]))
        $('#slt-ProjectType').val((editData[0]["ProjectType"] == null ? 0 : editData[0]["ProjectType"]))
        $('#projDesc').val((editData[0]["ProjectDescription"] == null ? 0 : editData[0]["ProjectDescription"]))
        $('#slt-Customers').val((editData[0]["Customer"] == null ? 0 : editData[0]["Customer"]))
        $('#slt-Status').val((editData[0]["ProjectStatus"] == null ? 0 : editData[0]["ProjectStatus"]))
        $('.select2').select2();
        $('#pageTitle').html('Update Project');
     
        $('#save-project').hide();
        var updateProjectEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3027');
        if (updateProjectEntity.length > 0) {
            $('#update-project').show();
        }

    }
}

//Data
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("AddProject.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetCustomerProjects = function (customerID) {
        var _obj = {
            'customerID': customerID
        };
        var tempList = {};
        $.when(RequestServer("AddProject.aspx/GetCustomerProjectData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var SaveProject = function () {
        var _obj = {
            'ProjectName': $('#projName').val(),
            'ProjectType': parseInt($('#slt-ProjectType').val()),
            'ProjectDescription': $('#projDesc').val(),
            'Customer': $('#slt-Customers').val(),
            'ProjectStatus': $('#slt-Status').val(),
        }
        var insertObj = {
            'objProject': _obj
        }

        $.when(RequestServer("AddProject.aspx/SaveProject", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Project created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a project !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditProjectData = function () {
        var _obj = {
            'projectID': parseInt(editProjectID)
        };
        var tempList = {};
        $.when(RequestServer("AddProject.aspx/GetEditCustomerData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var UpdateProject = function () {
        var _obj = {
            'ProjectName': $('#projName').val(),
            'ProjectType': parseInt($('#slt-ProjectType').val()),
            'ProjectDescription': $('#projDesc').val(),
            'Customer':  parseInt($('#slt-Customers').val()),
            'ProjectStatus': parseInt( $('#slt-Status').val()),
            'ProjectID':editProjectID

        }
        var updateObj = {
            'objProject': _obj
        }

        $.when(RequestServer("AddProject.aspx/UpdateProject", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Project updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a project !!", { position: "right top", className: "error" });
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
    var ValidateProjectNull = function () {
       
        var isValid = true;
        var projName = $.trim($('#projName').val());
        var custName = $('#slt-Customers').val();
        var status = $('#slt-Status').val();

        if (projName == null || projName == '') {
            isValid = false;
            $('#ProjectName-Validation').show();
        }

        if (custName == null || custName == '0') {
            isValid = false;
            $('#CustomerName-Validation').show();
        }
        if (status == null || status == '0') {
            isValid = false;
            $('#Status-Validation').show();
        }
        else {
            $('#Status-Validation').hide();
        }
    }
    var ValidateProject = function ()
    {
        var isValid = true;
        var projName = $.trim($('#projName').val());
        var custName = $('#slt-Customers').val();
        var status = $('#slt-Status').val();
        if (projName == null || projName == '') {
            isValid = false;
            $('#ProjectName-Validation').show();
        }
        if (status == null || status == '0') {
            isValid = false;
            $('#Status-Validation').show();
        }
        else {
            $('#Status-Validation').hide();
        }
        if (custName == null || custName == '0') {
            isValid = false;
            $('#CustomerName-Validation').show();
        }

        //if (custName !== null && custName != '0') {
        //    var customerProjects = GetCustomerProjects(parseInt(custName));
        //    customerProjects = customerProjects["Projects"];
        //    if (customerProjects != null && customerProjects != undefined && customerProjects.length > 0) {
        //        var matchedProject = GetmatchedRecord(customerProjects, 'ProjectName', projName); 
        //        if (matchedProject != null && matchedProject != undefined && matchedProject.length > 0) {
        //            isValid = false;
        //            $.notify("This project is already exists for the selected customer !!", { position: "right top", className: "error" });
        //        }
        //    }
        //}
        if (existingProjects != undefined) {
            if (existingProjects != null && existingProjects != undefined && existingProjects.length > 0 && projName != ''); {
                if (editProjectID == 0) {

                    var matchedProject = GetmatchedRecord(existingProjects, 'ProjectName', projName);
                    if (matchedProject != null && matchedProject != undefined && matchedProject.length > 0) {
                        isValid = false;
                        $.notify("Procject is already exists !!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var editingProjectName = editData[0]["ProjectName"];
                    var unmatchedProjects = GetunmatchedRecord(existingProjects, 'ProjectName', editingProjectName);
                    var matchedProject = GetmatchedRecord(unmatchedProjects, 'ProjectName', projName);
                    if (matchedProject != null && matchedProject != undefined && matchedProject.length > 0) {
                        isValid = false;
                        $.notify("Procject is already exists !!", { position: "right top", className: "error" });
                    }
                }

            }
            
        }
        return isValid;
    }
}