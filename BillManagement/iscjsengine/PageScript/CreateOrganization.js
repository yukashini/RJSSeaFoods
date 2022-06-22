//Global Variables
{
    var MasterData = [];
    var fileContainer = [];
    var fileName = '';
    var editOrganizationID = 0;
    var editOrganizationData = [];

}

//Load && Events
{
    $(document).ready(function () {
        BindCreateOrganizationScreen();
        EmpRegistration();
    });

    $(document).on('click', '#save-Organization', function () {

        if (ValidateOrganization() && $("span[error-active='true']").length == 0) {
            
            SaveOrganization();
        }

    });

    $(document).on('click', '#cancel', function () {

        GoBack();
    });
    $(document).on('click', '#update-Organization', function () {

        if (ValidateOrganization() && $("span[error-active='true']").length == 0) {
            UpdateOrganization();
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
        html += '<span class="isc-btn-inp-typ-file-s1" style="top: 126px !Important;" >Choose Organization Logo';
        html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
        html += '</span>';
        $('#file_Viewer').html(html);
    });
}
//Dom
{
    var BindCreateOrganizationScreen = function () {
      
        MasterData = GetMasterData();
        //BindDropDowns($('#slt-City'), masterData["CITIES"], 'Choose City')
        //BindDropDowns($('#slt-State'), masterData["STATES"], 'Choose State')
        //BindDropDowns($('#slt-Country'), masterData["COUNTRIES"], 'Choose COUNTRIES')
        var existingorg = MasterData["EXORG"];
        if (existingorg != null && existingorg != undefined && existingorg.length > 0) {
                    var createOrganizationEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');

                    if (createOrganizationEntity.length > 0) {
                        $('#save-Organization').hide();
                        $('#update-Organization').show();
                    }
                    else {
                        $('#save-Organization').show();
                    }
                    var data = {};
                    data = MasterData["EXORG"];
                    editOrganizationID = data[0]['OrganizationID'];
                    $('#CompanyName').val(data[0]['CompanyName'])
                    $('#CompanyName').val(data[0]['CompanyName'])
                    $('#CompanyType').val(data[0]['CompanyType'])
                    $('#Address1').val(data[0]['AddressLine1'])
                    $('#Address2').val(data[0]['AddressLine2'])
                    $('#ContactPerson').val(data[0]['ContactPerson'])
                    $('#ContactNumber').val(data[0]['ContactNumber'])
                    $('#Alternative-contact-Number').val(data[0]['AlternativeNumber'])
                    $('#browseLogo').val(data[0]['CompanyLogo'])
                    $('#Email').val(data[0]['Email'])
                    $('#City').val(data[0]['City'])
                    $('#State').val(data[0]['State'])
                    $('#Country').val(data[0]['Country'])
                    $('#zip').val(data[0]['Zip'])

                    $('#page-Title').html('Update Organization');
                    $('#save-Organization').hide();
                    if (data[0]["OrganizationLogo"] != '' && data[0]["OrganizationLogo"] != null) {
                        fileName = data[0]["OrganizationLogo"]
                        OrganizationLogoFrames(data[0]["OrganizationLogo"]);
                    }


                    $('#update-Organization').show();

                
            
        }
        var OrganizationLogoFrames = function (fileImage) {
            $('#file_Viewer').html('');
            var iframe = document.getElementById("bill_Frame");
            if (null !== iframe) {
                document.body.removeChild(iframe);
            }
            else {
                var iframe = document.createElement("iframe");
                iframe.id = "bill_Frame";
                var iframewidth = 390;
                var sourcePath = "Requested Source Path: " + OrganizationLogoPathUrl + fileImage;
                //WriteSourcePath(sourcePath);
                iframe.src = OrganizationLogoPathUrl + fileImage;
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
            $.when(RequestServer("Organization.aspx/GetFilterData", _obj)).done(function (response) {
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
                    url: "OrganizationLogo.ashx",
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

        var SaveOrganization = function () {
           
            var _obj = {
                'CompanyName': $('#CompanyName').val(),
                'CompanyType': $('#CompanyType').val(),
                'AddressLine1': $('#Address1').val(),
                'AddressLine2': ($('#Address2').val()),
                'ContactPerson': $('#ContactPerson').val(),
                'ContactNumber': $('#ContactNumber').val(),
                'AlternativeNumber': $('#Alternative-contact-Number').val(),
                'CompanyLogo': ($('#browseLogo').val()),
                'EmailID': $('#Email').val(),
                'City': $('#City').val(),
                'State': $('#State').val(),
                'Zip': $('#zip').val(),
                'Country': $('#Country').val(),


            }
            var insertObj = {

                'objOrganization': _obj
            }
            $.when(RequestServer("Organization.aspx/SaveOrganization", insertObj)).done(function (response) {

                if (parseInt(response) > 0) {
                    $.notify("Organization created successfully!", { position: "right top", className: "success" });
                    Bindlist();
                }
                else {
                    $.notify("Server error occured while creating a Organization !!", { position: "right top", className: "error" });
                }
            });
        }
        
        var UpdateOrganization = function () {

            var _obj = {

                'CompanyName': $('#CompanyName').val(),
                'CompanyType': $('#CompanyType').val(),
                'AddressLine1': $('#Address1').val(),
                'AddressLine2': ($('#Address2').val()),
                'ContactPerson': $('#ContactPerson').val(),
                'ContactNumber': $('#ContactNumber').val(),
                'AlternativeNumber': $('#Alternative-contact-Number').val(),
                'CompanyLogo': ($('#browseLogo').val()),
                'EmailID': $('#Email').val(),
                'City': $('#City').val(),
                'State': $('#State').val(),
                'Zip': $('#zip').val(),
                'Country': $('#Country').val(),
                'OrganizationID': parseInt(editOrganizationID),


            }
            var updateObj = {
                'objOrganization': _obj
            }

            $.when(RequestServer("Organization.aspx/UpdateOrganization", updateObj)).done(function (response) {
                if (parseInt(response) > 0) {
                    $.notify("Organization updated successfully!", { position: "right top", className: "success" });
              
                }
                else {
                    $.notify("Server error occured while updating a Organization !!", { position: "right top", className: "error" });
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

        var ValidateOrganization = function () {

            var isvalid = true;
            var CompanyName = $.trim($('#CompanyName').val());
            var CompanyType = $.trim($('#CompanyType').val());
            var AddressLine1 = $.trim($('#Address1').val());
            var City = $.trim($('#City').val());
            var State = $.trim($('#State').val());
            var Country = ($('#Country').val());
            var Zip = ($('#zip').val());
            var ContactPerson = $.trim($('#ContactPerson').val());
            var contact = $.trim($('#ContactNumber').val());
            var EmailId = $.trim($('#Email').val());

            if (CompanyName == '' || CompanyName == null) {
                isvalid = false;
                $('#CompanyName-Validation').show();
            }
            if (CompanyType == '' || CompanyType == null) {
                isvalid = false;
                $('#CompanyType-Validation').show();
            }
            if (EmailId == '' || EmailId == null) {
                isvalid = false;
                $('#vendorEmail-Validation').show();
            }
            if (AddressLine1 == '' || AddressLine1 == null) {
                isvalid = false;
                $('#Address1-Validation').show();
            }
            if (City == '' || City == null) {
                isvalid = false;
                $('#City-Validation').show();
            }
            if (State == '' || State == null) {
                isvalid = false;
                $('#State-Validation').show();
            }
            if (Country == '' || Country == null) {
                isvalid = false;
                $('#Country-Validation').show();
            }
            if (Zip == '' || Zip == null) {
                isvalid = false;
                $('#zip-Validation').show();
            }
            if (ContactPerson == '' || ContactPerson == null) {
                isvalid = false;
                $('#ContactPerson-Validation').show();
            }
            if (contact == '' || contact == null) {
                isvalid = false;
                $('#ContactNumber-Validation').show();
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
        html += '<h2>Organization Profile</h2>';
        html += '<span class="isc-btn-inp-typ-file-s1" >Choose Organization photo';
        html += '<input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
        html += '</span>';
        $('#file_Viewer').html(html);
    });
}