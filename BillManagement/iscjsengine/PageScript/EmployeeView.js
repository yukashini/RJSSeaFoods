{
    var EmployeeId = "";
    var Employeelst = [];
    var editContact = "";
    var editContact = 0;
    var isNotesUpdate = 0;
    var editNotesID = 0;
    var sortingContactList = [];

}
//Load Event
{
    $(document).ready(function () {

        var urlParams = new URLSearchParams(window.location.search);
        EmployeeId = urlParams.get('Emp_Id');
        Employeelst = GetEmployeeDetails();
        RegisterMasking();
        RegisterAlphabetsOnly();
        BindEmployeeDetails();
    });
}
{
    //Data Manipulation
    {
        var GetEmployeeDetails = function () {
            var obj = {
                'Emp_Id': EmployeeId
            }
            var tempList = {};
            $.when(RequestServer("ViewEmployee.aspx/GetEmployeelistData", obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
    var BindEmployeeDetails = function () {
        var EmployeeDetails = common.AUF($.parseJSON(Emplst[0]["Table"]));

        if (EmployeeDetails[0]["EmployeeLogo"] != null && EmployeeDetails[0]["EmployeeLogo"] != '') {
            var image = "images/EmployeeLogos/" + EmployeeDetails[0]["EmployeeLogo"] + "";
            $('#Employee-Logo').attr('src', image);
        }

        $("#lbl_empname").html(EmployeeDetails[0].);
        $("#email").html(EmployeeDetails[0].Email);
        $('#email').prop('title', EmployeeDetails[0].Email);
        $("#lbl_Phoneno").html(EmployeeDetails[0].ContactNumber);
        $('#lbl_Phoneno').prop('title', EmployeeDetails[0].ContactNumber);
        $("#lbl_cusname").html(EmployeeDetails[0].CustomerName);
        $("#lbl_cusemail").html(EmployeeDetails[0].Email);
        $("#lbl_cusaddress").html(EmployeeDetails[0].CustomerAddress);
        $("#lbl_state").html(EmployeeDetails[0].State);
        $("#lbl_custype").html(EmployeeDetails[0].Value1);
        $("#lbl_cusphone").html(EmployeeDetails[0].ContactNumber);
        $("#lbl_cuscity").html(EmployeeDetails[0].City);
        $("#lbl_cuszip").html(EmployeeDetails[0].Zip);
    }

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
                url: "EmployeeDocuments.ashx",
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    fileResponse = result;
                },
                error: function (jqXHR, error, errorThrown) {
                    var error = e;
                    fileResponse = null;
                },
                xhr: function (evt) {
                    var filexhr = $.ajaxSettings.xhr();
                    return filexhr;
                }
            });
        }
        return fileResponse;
    }
    var SaveDocument = function (lastModifiedBy, fileResponse) {
        var obj = {
            'FileName': (fileResponse.FileDisplayName == null ? '' : fileResponse.FileDisplayName),
            'FileModifiedName': (fileResponse.ModifiedFileName == null ? '' : fileResponse.ModifiedFileName),
            'LastModifiedBy': lastModifiedBy,
            'Emp_Id': EmployeeId
        }
        var insertObj = {
            'FileObject': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewEmployee.aspx/InsertCustomerDocument", insertObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Document added successfully!!", { position: "right top", className: "success" });
                BindContactPanel();
                fileContainer = [];
            }
            else {
                $.notify("Server error occured while adding a document!!", { position: "right top", className: "error" });
            }
        });
    }
    var BindDocumentsPanel = function (docList) {

        var html = ''

        var $el = $('#div-Documents-Body');
        //var vendorDocumentlist = GetVendorDocuments();
        //var docList = vendorDocumentlist["VendorFiles"];

        if (docList != undefined && docList != null && docList.length > 0) {
            $.each(docList, function (index, item) {
                var stillUtc = moment.utc(item["CreatedOn"]).toDate();
                var local = moment(stillUtc).local().format('MMM DD, YYYY');
                html += '<div class="screen-row mar-top-10">';
                html += '<div class="div-col-4per" data-Open-File="' + (item["ModifiedFileName"] == null ? '' : item["ModifiedFileName"]) + '"><div class="isc-bill-doc-typ">';
                html += '<i class="fa fa-file" style="cursor:pointer"></i></div> </div>';
                html += '<div class="div-col-60per">';
                html += '<h5 class="isc-vnd-edt-acc" title="' + (item["FileName"] == null ? '' : item["FileName"]) + '">' + (item["FileName"] == null ? '' : item["FileName"]) + '</h5>';
                html += '<h6 class="isc-bill-vnd-doc-t1">Uploaded On <span>' + (local == "Invalid date" ? '' : local) + '</span></h6>';
                html += '<h6 class="isc-bill-vnd-doc-t1">Owned By</h6>';
                html += '<div class="isc-bill-vnd-pos">';
                html += '<div class="isc-bill-vnd-nam-bet"><span>J</span></div><h4 class="isc-bill-vnd-nam1">' + (item["Name"] == null ? '' : item["Name"]) + '</h4></div>';
                html += '</div>';
                html += '</div>';

            });
        }
        else {
            html += '<p style="text-align: center;">No data found</p>'
        }
        $el.html(html);
    }

//ClickEvent
{
    $(document).on('click', '#btn_edit', function (e) {
        window.location = "AddEmployee.aspx?Emp_Id=" + EmployeeId;
    });
    $(document).on('click', '#btn_Addconect', function (e) {
        $("#div_add").show();
        $("#div_Update").hide();
    });

    $(document).on('click', '#btn_cancel,#btn_close', function () {

        ResetContactFields();
        $("#mp_add-contact").hide();
    });
    $(document).on('click', '#close-delete,#btn_deleteclose', function () {
        $('#mp_contact_Delete').hide();
    });
    //Add Dcouments

    $(document).on('click', '#close-Comment', function () {
        var $modal = $('#Mp_Comments');
        $modal.modal('hide');

        var $modal = $('#Mp_View');
        $modal.modal('hide');

        var $el = $('#div-BillComments');
        $el.html('<p>No Data Found</p>');
    });
    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');

        if (fileName != '') {
            window.open(customerDocumentURl + fileName, '');
        }
    });
    $(document).on('click', 'th[data-sort-contact]', function (e) {

        var $this = $(this).parents('table');
        if ($('th[data-sort-contact]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
            //var tablegroupby = 'Entityname'
            // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
            var columngroupby = $(this).attr('data-sort-contact');
            var columType = $(this).attr('sort-column-Type');
            var sortingdefaulticon = "img/appimages/Sorting-icon-default.png";
            var sortingascendingicon = "img/appimages/Sorting-icon-asc.png";
            var sortingdescendingicon = "img/appimages/Sorting-icon-desc.png";

        }

        // Get Active sort order
        {
            var activesortorder = "default";
            if ($(this).hasClass('sorting-default'))
                activesortorder = "default";
            else if ($(this).hasClass('sorting-asc'))
                activesortorder = "asc";
            else if ($(this).hasClass('sorting-desc'))
                activesortorder = "desc";
        }

        // Restore all to default
        {
            $this.find('thead th').removeClass('sorting-asc sorting-desc').addClass('sorting-default');
            $this.find('thead th').find('img').attr('src', sortingdefaulticon);
            var currentSortOrder = "asc";
        }

        // Change Icon and Class
        {
            if (activesortorder === "default") {
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-desc headerSortUp').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";

            }
        }

        // Sort it and Render List
        {
            //$loading.show();
            //setTimeout(function () {
            // Sort it by Default Groupby and then by Column
            var lstResult = sortingContactList

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorter(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorter(lstResult, columngroupby, '321');
            }
            else if (columType == 'date') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
            }


            // Render List
            {
                BindContactList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });


    $(document).on('change', '[data-textbox]', function () {
        var $this = $(this);
        var VAL = $.trim($this.val());
        var pattern = /^[a-zA-Z' ]*$/

        if (VAL != '') {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }

    });

    $(document).on('change', '[data-Phone]', function () {
        var $this = $(this);

        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").attr('error-active', false);

    });
    var RegisterMasking = function () {
        $('[phone-Number]').mask('+0 (000) 000-0000');
        $('[data-Name]').mask('Z', { translation: { 'Z': { pattern: /[a-zA-Z0-9 ]/, recursive: true } } })
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
            $('#email-Validation').hide();
        }

    });

    $(document).on('change', '[data-textbox]', function () {
        var $this = $(this);
        var VAL = $.trim($this.val());
        var pattern = /^[a-zA-Z' ]*$/

        if (VAL != '') {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }

    });



}
    var GetStatusColor = function (status) {

        var colorClass = ''
        status = status.toString();
        switch (status) {
            case "50015":
                colorClass = "isc-approved-color";
                break;
            case "50034":
                colorClass = "isc-approved-color";
                break;
            case "50016":
                colorClass = 'isc-wrk-flw-sta-open-req';
                break;
            case "50017":
                colorClass = 'isc-wrk-flw-sta-re-req'
                break;
            case "50018":
                colorClass = 'isc-wrk-flw-flg';
                break;
            case "50019":
                colorClass = 'isc-wrk-flw-sta-upload'
                break;

            case "50044":
                colorClass = "isc-wrk-flw-sta-aprove";
                break;

            case "50036":
                colorClass = "isc-wrk-flw-sta-re-req";
                break;

            case "50023":
                colorClass = "isc-pay-pnd";
                break;
            case "50033":
                colorClass = "isc-dsp-clr";
                break;
            case "50025":
                colorClass = 'isc-flg-clr';
                break;
            case "50024":
                colorClass = 'isc-pay-failed'
                break;
            case "50044":
                colorClass = 'isc-pay-comp'
                break;
            case "50087":
                colorClass = 'isc-pay-status-clr'
                break;

        }
        return colorClass;
    }
}