//Global Variables
{
    var masterData = [];
    var fileContainer = [];
    var fileName = '';
    var editEmployeeID = 0;
    var editEmployeeData = [];

}

//Load && Events
{
    $(document).ready(function () {
      
        editEmployeeID = ((GetQueryStrings()["Emp_Id"] == undefined || GetQueryStrings()["Emp_Id"] == null) ? 0 : GetQueryStrings()["Emp_Id"]);
        BindCreateEmployeeScreen();
        EmpRegistration();

    });

    $(document).on('click', '#save-Employee', function () {
      
        if (ValidateEmployee() && $("span[error-active='true']").length == 0) {
            SaveEmployee();
        }

    });

    $(document).on('click', '#cancel', function () {
  
        GoBack();
    });
    $(document).on('click', '#update-Employee', function () {
        if (ValidateEmployee() && $("span[error-active='true']").length == 0) {
            UpdateEmployee();
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
        html += '<span class="isc-btn-inp-typ-file-s1" style="top: 126px !Important;" >Choose Employee Logo';
        html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
        html += '</span>';
        $('#file_Viewer').html(html);
    });
}

//Dom
{
    var BindCreateEmployeeScreen = function () {
      
        masterData = GetMasterData();

        BindDropDowns($('#slt-Gender'), masterData["Emp_Gender"], 'Choose Gender')
        BindDropDowns($('#slt-Status'), masterData["Emp_Status"], 'Choose Status')
        BindDropDowns($('#slt-BloodGroup'), masterData["Emp_BloodGroup"], 'Choose Blood Group')
        BindDropDowns($('#slt-Designation'), masterData["Emp_Designation"], 'Choose Designation')

        var createEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createEmployeeEntity.length > 0) {
            $('#save-Employee').show();
        }
        else {
            $('#save-Employee').hide();
        }
        if (editEmployeeID != 0) {
            editEmployeeData = GetEditEmployeeData();
            BindEditEmployeeDetails(editEmployeeData["EmployeeData"]);
        }
    }

    var BindEditEmployeeDetails = function (EmployeeData) {
        $('#EmpCode').val(EmployeeData[0]['Emp_Code'])

        if (EmployeeData[0]['Emp_Gender'] != "") {

            $('#slt-Gender').val(EmployeeData[0]['Emp_Gender'])
        }
        else {
            $('#slt-Gender').val(0)
        }

        $('#slt-Gender').select2()

        if (EmployeeData[0]['Emp_Status'] != null) {

            $('#slt-Status').val(EmployeeData[0]['Emp_Status'])
        }
        else {
            $('#slt-Status').val(0)
        }
        $('#slt-Status').select2()

        if (EmployeeData[0]['Emp_BloodGroup'] != null) {

            $('#slt-BloodGroup').val(EmployeeData[0]['Emp_BloodGroup'])
        }
        else {
            $('#slt-BloodGroup').val(0)
        }
        $('#slt-BloodGroup').select2()

        if (EmployeeData[0]['Emp_Designation'] != null) {

            $('#slt-Designation').val(EmployeeData[0]['Emp_Designation'])
        }
        else {
            $('#slt-Designation').val(0)
        }

        $('#slt-Designation').select2()

    
        $('#EmpFirstname').val(EmployeeData[0]['Emp_First_Name'])
        $('#EmpLastname').val(EmployeeData[0]['Emp_Last_Name'])
        $('#Email').val(EmployeeData[0]['Emp_Email'])
        $('#Alt-contact-Number').val(EmployeeData[0]['Emp_Alt_Mob_No'])
        $('#contact-Number').val(EmployeeData[0]['Emp_Mob_No'])
        $('#address').val(EmployeeData[0]['Emp_Address'])
        $('#city').val(EmployeeData[0]['Emp_City'])
        $('#zip').val(EmployeeData[0]['Emp_ZipCode'])
        $('#state').val(EmployeeData[0]['Emp_State'])
       
        var nextDue = moment.utc(EmployeeData[0]["Emp_DOB"]).toDate();
        var localDue = moment(nextDue).local().format('YYYY-MM-DD');

        $('#txt-Dob').val(localDue);

        $('#Pan').val(EmployeeData[0]['Emp_Pan'])
        $('#Aadhaar').val(EmployeeData[0]['Emp_Aadhar_No'])
        $('#Country').val(EmployeeData[0]['Emp_Country'])

        $('#page-Title').html('Update Employee');
        $('#save-Employee').hide();
        if (EmployeeData[0]["EmployeeLogo"] != '' && EmployeeData[0]["EmployeeLogo"] != null) {
            fileName = EmployeeData[0]["EmployeeLogo"]
            EmployeeLogoFrames(EmployeeData[0]["EmployeeLogo"]);
        }

        var updateEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateEmployeeEntity.length > 0) {
            $('#update-Employee').show();
        }
    }

    var EmployeeLogoFrames = function (fileImage) {
        $('#file_Viewer').html('');
        var iframe = document.getElementById("bill_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "bill_Frame";
            var iframewidth = 390;
            var sourcePath = "Requested Source Path: " + EmployeeLogoPathUrl + fileImage;
            //WriteSourcePath(sourcePath);
            iframe.src = EmployeeLogoPathUrl + fileImage;
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
        $.when(RequestServer("AddEmployee.aspx/GetFilterData", _obj)).done(function (response) {
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
                url: "EmployeeLogo.ashx",
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

    var SaveEmployee = function () {
      
        var _obj = {
            'Employeecode': $('#EmpCode').val(),
            'EmployeeFirstName': $('#EmpFirstname').val(),
            'EmployeeLastName': $('#EmpLastname').val(),
            'Gender': parseInt($('#slt-Gender').val()),
            'Email': $('#Email').val(),
            'ContactNumber': $('#contact-Number').val(),
            'AltContactNumber': $('#Alt-contact-Number').val(),
            'Designation': parseInt($('#slt-Designation').val()),
            'DOB': ($('#txt-Dob').val()),
            'EmployeeAddress': $('#address').val(),
            'City': $('#city').val(),
            'Zip': $('#zip').val(),
            'State': $('#state').val(),
            'Country': $('#Country').val(),
            'EmployeeLogo': fileName,
            'Pan': $('#Pan').val(),
            'Aadhaar': $('#Aadhaar').val(),
            'Status': parseInt($('#slt-Status').val()),
            'Bloodgroup': parseInt($('#slt-BloodGroup').val()),

        }
        var insertObj = {
            
            'objEmployee': _obj
        }
        $.when(RequestServer("AddEmployee.aspx/SaveEmployee", insertObj)).done(function (response) {
           
            if (parseInt(response) > 0) {
                $.notify("Employee created successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while creating a Employee !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetEditEmployeeData = function () {
        var _obj = {
            'EmployeeID': parseInt(editEmployeeID)
        };
        var tempList = {};
        $.when(RequestServer("AddEmployee.aspx/GetEditEmployeeData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var UpdateEmployee = function () {
        var _obj = {
            'Employeecode': $('#EmpCode').val(),
            'EmployeeFirstName': $('#EmpFirstname').val(),
            'EmployeeLastName': $('#EmpLastname').val(),
            'Gender': parseInt($('#slt-Gender').val()),
            'Email': $('#Email').val(),
            'ContactNumber': $('#contact-Number').val(),
            'AltContactNumber': $('#Alt-contact-Number').val(),
            'Designation': parseInt($('#slt-Designation').val()),
            'DOB': ($('#txt-Dob').val()),
            'EmployeeAddress': $('#address').val(),
            'City': $('#city').val(),
            'Zip': $('#zip').val(),
            'State': $('#state').val(),
            'Country': $('#Country').val(),
            'EmployeeLogo': fileName,
            'Pan': $('#Pan').val(),
            'Aadhaar': $('#Aadhaar').val(),
            'Status': parseInt($('#slt-Status').val()),
            'Bloodgroup': parseInt($('#slt-BloodGroup').val()),
            'Emp_Id': parseInt(editEmployeeID),

        }
        var updateObj = {
            'objEmployee': _obj
        }

        $.when(RequestServer("AddEmployee.aspx/UpdateEmployee", updateObj)).done(function (response) {
            
            if (parseInt(response) > 0) {
                $.notify("Employee updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a Employee !!", { position: "right top", className: "error" });
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
    var EmpRegistration = function () {
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

    var ValidateEmployee = function () {
        var isvalid = true;
        var EmpCode = $.trim($('#EmpCode').val());
        var EmpFirstName = $.trim($('#EmpFirstname').val());
        var EmailId = $.trim($('#Email').val());
        var EmpAddress = $.trim($('#address').val());
        var contact = $.trim($('#contact-Number').val());
        var Gender = parseInt($('#slt-Gender').val());
        if (EmpCode == '' || EmpCode == null) {
            isvalid = false;
            $('#EmployeeCode-Validation').show();
        }
        if (EmpFirstName == '' || EmpFirstName == null) {
            isvalid = false;
            $('#EmployeeFirstName-Validation').show();
        }     
        if (EmailId == '' || EmailId == null) {
            isvalid = false;
            $('#vendorEmail-Validation').show();
        }
        if (EmpAddress == '' || EmpAddress == null) {
            isvalid = false;
            $('#Address-Validation').show();
        }
        if (contact == '' || contact == null) {
            isvalid = false;
            $('#ContactNumber-Validation').show();
        }
        if (Gender == '' || Gender == 0) {
            isvalid = false;
            $('#slt-Gender').show();
        }
        if (EmpCode != '') {
            var existingEmpCode = masterData["ExistingEmpCode"];
            if (existingEmpCode != null && existingEmpCode != undefined && existingEmpCode.length > 0) {
                if (editEmployeeID == 0) {
                    var matchedEmployeeRecord = GetmatchedRecord(existingEmpCode, 'Emp_Code', EmpCode);
                    if (matchedEmployeeRecord.length > 0) {
                        isvalid = false;
                        $.notify(" Employee code is already exists!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var unMatchedemployee = GetunmatchedRecord(existingEmpCode, 'Emp_Code', editEmployeeID);
                    var matchedEmployeeRecord = GetmatchedRecord(unMatchedemployee, 'Emp_Code', EmpCode);
                    if (matchedEmployeeRecord.length > 0) {
                        isvalid = false;
                        $.notify("Employee Code is already exists!", { position: "right top", className: "error" });
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
    html += '<h2>Employee Profile</h2>';
    html += '<span class="isc-btn-inp-typ-file-s1" >Choose Employee photo';
    html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
    html += '</span>';
    $('#file_Viewer').html(html);
});