{
    var MalaysiaScreenData = [];
    var LabelID = 0;
   // var sortingBillList = [];
   // var isNotesUpdate = 0;
   // var editNotesID = 0;
    var InvoiceId = 0;
    var maildata = [];
    var sortingContactList = [];

}

{
    $(document).ready(function () {
       $loading.show();
        setTimeout(function () {

            LabelID = ((GetQueryStrings()["LabelID"] == undefined || GetQueryStrings()["LabelID"] == null) ? 0 : GetQueryStrings()["LabelID"]);
            BuildMalaysiaInfoScreen();
            RegisterMasking();
            RegisterAlphabetsOnly();
            BindMalaysiaDetails()
            $loading.hide();
        }, 0);
    });
}
//DOM
{
    var BuildMalaysiaInfoScreen = function () {
        RegisterMasking();
        MalaysiaScreenData = GetMalaysiainfo();
        RegisterAlphabetsOnly();
        if (MalaysiaScreenData != undefined && MalaysiaScreenData != null) {
           BindTopPanel();
        }
    }

    var BindTopPanel = function () {
        var panelDetails = MalaysiaScreenData["MalaysiaList"]
        if (panelDetails != undefined && panelDetails != null && panelDetails.length > 0) {
            $('#spn_buyer').html(panelDetails[0]["BuyerName"] == null ? '' : SafeHTML(panelDetails[0]["BuyerName"]));
            $('#spn_product').html(panelDetails[0]["ProductName"] == null ? '' : SafeHTML(panelDetails[0]["ProductName"]));
            $('#spn_production').html(panelDetails[0]["Production"] == null ? '' : SafeHTML(panelDetails[0]["Production"]));
        }
    }
}

//data
{
    var GetMalaysiainfo = function () {
        var _obj = {
            'LabelID': parseInt(LabelID),
        };
        var tempList = {};
        $.when(RequestServer("ViewLabelMalaysia.aspx/GetMalaysiaScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var BindMalaysiaDetails = function () {
        MalaysiaScreenData = GetMalaysiainfo();
        var MalaysiaDetails = MalaysiaScreenData["MalaysiaLabelList"]
       $("#lbl_name").html(MalaysiaDetails[0].BuyerName);
        $("#lbl_product").html(MalaysiaDetails[0].ProductName);
        $('#lbl_approve').html(MalaysiaDetails[0].ApprovalNo);
        $("#lbl_production").html(MalaysiaDetails[0].ProductionCode);
        $("#lbl_origin").html(MalaysiaDetails[0].Origin);
        $("#lbl_size").html(MalaysiaDetails[0].Size);
        $("#lbl_weight").html(MalaysiaDetails[0].Weight);
        $("#lbl_gross").html(MalaysiaDetails[0].GrossWeight);
        $("#lbl_net").html(MalaysiaDetails[0].NetWeight);
        $("#lbl_PDate").html(moment(MalaysiaDetails[0]["ProductionDate"]).format('MM/DD/YYYY'))
        $("#lbl_BBDate").html(moment(MalaysiaDetails[0]["ProductionDate"]).format('MM/DD/YYYY'))
        $("#lbl_address").html(MalaysiaDetails[0].CustomerAddress);
        $("#lbl_city").html(MalaysiaDetails[0].City);
        $("#lbl_state").html(MalaysiaDetails[0].State);
        $("#lbl_country").html(MalaysiaDetails[0].Country);
        $("#lbl_zip").html(MalaysiaDetails[0].Zip);
    }
}

//Common
{
    {
        var GetStatusColor = function (status) {
            var colorClass = ''
            status = status.toString();
            switch (status) {
                case "1":
                    colorClass = "isc-approved-color";
                    break;
                case "2":
                    colorClass = "isc-approved-color";
                    break;
                case "3":
                    colorClass = 'isc-wrk-flw-sta-open-req';
                    break;
                case "4":
                    colorClass = 'isc-wrk-flw-sta-re-req'
                    break;
                case "5":
                    colorClass = 'isc-wrk-flw-flg';
                    break;
                case "6":
                    colorClass = 'isc-wrk-flw-sta-upload'
                    break;

                case "7":
                    colorClass = "isc-wrk-flw-sta-aprove";
                    break;

                case "8":
                    colorClass = "isc-wrk-flw-sta-re-req";
                    break;

                case "9":
                    colorClass = "isc-pay-pnd";
                    break;
                case "10":
                    colorClass = "isc-dsp-clr";
                    break;
                case "11":
                    colorClass = 'isc-flg-clr';
                    break;
                case "12":
                    colorClass = 'isc-pay-failed'
                    break;
                case "13":
                    colorClass = 'isc-pay-comp'
                    break;

            }
            return colorClass;

        }
    }
}
//Click
{

    //$(document).on('click', '#tab-details', function () {
    //          BindMalaysiaDetails();
    //});

    $(document).on('click', '#btn-editMalaysia', function () {
        window.location.href = "AddMalaysia.aspx?LabelID=" + LabelID + "";
    });

    $(document).on('click', '#buyer-Notes-List', function () {
        BindNotesPanel();
    });

    $(document).on('click', '#add-Notes', function () {
        if ($.trim($('#txt-Notes').val()) != '') {
            SaveNotes()
        }
    });
    $(document).on('click', '[data-edit-Notes]', function () {
        var notesID = $(this).attr('data-edit-Notes')
        var createdBy = $(this).attr('data-Created-By');
        if (parseInt(createdBy) == AccountID) {
            if (notesID != undefined && notesID != '0' && isNotesUpdate == 0) {
                editNotesID = parseInt(notesID);
                $('#txt-Notes').val($(this).attr('data-Notes'))
                $('#div-Notes-Body div[data-remove=' + notesID + ']').remove();
                isNotesUpdate = 1;
            }
        }
        else {
            $.notify("You don't have permission to edit this note", { position: "right top", className: "error" });
        }

    });

    $(document).on('click', '#Buyer-tab', function () {
          BindDocumentsPanel();
    });

    $(document).on('change', '#add-Documents', function () {
        
        var Files = $(this).prop("files");
        fileContainer = [];
        var lastModifiedBy = moment(Files[0]["lastModifiedDate"]).format('LL');
        fileContainer.push(Files[0])
        var fileResponse = saveFiles();
        if (fileResponse != null) {
            SaveDocument(lastModifiedBy, fileResponse);
        }
        else {
            fileContainer = [];
            $.notify("Server error occured while saving a file!!", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '#insert-Buyer-Contact', function () {
        if (ValidateBuyer() && $("span[error-active='true']").length == 0) {
            SaveBuyerContact();
        }
    });

    $(document).on('click', '#btn_Addconect', function (e) {
        $("#mp_add-contact").show();
        $("#div_add").show();
        $("#div_Update").hide();

        $("#Update-Buyer-Contact").hide();
        $("#insert-Buyer-Contact").show();
    });

    $(document).on('click', '#buyer-Contact-List', function () {
        BindContactList();
    });

    $(document).on('click', '[data-edit-Contact]', function () {

        var $this = $(this);
        editContact = parseInt($this.attr('data-edit-Contact'));
        $('#contact-Modal-Title').html('Edit Contact')
        $('#Update-Buyer-Contact').show();
        $("#mp_add-contact").show();
        $("#div_add").hide();
        $("#div_Update").show();

        $('#insert-Buyer-Contact').hide();
        $('#contact-first-Name').val($this.parents('tr').attr('data-FirstName'))
        $('#contact-last-Name').val($this.parents('tr').attr('data-LastName'))
        $('#contact-email').val($this.parents('tr').attr('data-Email'))
        $('#contact-phone').val($this.parents('tr').attr('data-Phone'))
    });

    $(document).on('click', '#Update-Buyer-Contact', function () {
        if (ValidateBuyer() && $("span[error-active='true']").length == 0) {
            UpdateBuyerContact();
        }
    });

    $(document).on('click', '#btn_cancel,#btn_close', function () {
        ResetContactFields();
        $("#mp_add-contact").hide();
    });

    $(document).on('click', '#close-delete,#btn_deleteclose', function () {
        $('#mp_contact_Delete').hide();
    });

    $(document).on('click', '[data-delete-Contact]', function () {
        if ($(this).attr('data-delete-Contact') != undefined && $(this).attr('data-delete-Contact') != 0) {
            $('#btn-deleteContact-ok').attr('delete-Contact', $(this).attr('data-delete-Contact'))
            $('#mp_contact_Delete').show();
        }
    });

    $(document).on('click', '#btn-deleteContact-ok', function () {
        var contactId = $(this).attr('delete-Contact')
        if (contactId != '0' && contactId != undefined) {
            DeleteContact(parseInt(contactId));
        }
    });

    $(document).on('click', '#Btn-close', function () {
        $('#MP_Batch').hide();
        $('#MP_Email').hide();
    });

    $(document).on('click', '#btn-close', function () {
        $('#MP_Batch').hide();
    });

    $(document).on('click', '[data-emailid]', function () {
        $('#MP_Email').show();
        $('#exist-valuesTo').val('');
        $('#exist-valuescc').val('');
        InvoiceId = $(this).attr('data-emailid');

        var Maildetails = GetIvoiceMaildetails(InvoiceId)
        var Maildetail = common.AUF(Maildetails['Invoice']);
        var Orderlist = common.AUF(Maildetails['OrderList']);
        BindMailDetails(Maildetail);
        BindOrderDetails(Orderlist);

    });

    $(document).on('click', '#btn_sendemail', function () {

        var x = document.getElementById("editor").textContent;
        mailbody = x;
        var Tomail = $('#exist-valuesTo').val();
        var Ccail = $('#exist-valuescc').val();
        var Subject = $("#txt_subject").val();
        if ($('#exist-valuesTo').val() != '') {
            var obj = {
                'Tomail': Tomail,
                'Ccmail': Ccail,
                'Subject': Subject,
                'Body': mailbody,
            }
            maildata.push(obj);
            Sendmail(maildata);
        }
        else {
            $.notify("Please enter emailid!!!", { position: "right top", className: "error" });
        }

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

    $(document).on('click', 'th[data-sort-contact]', function (e) {
        var $this = $(this).parents('table');
        if ($('th[data-sort-contact]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
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
                BindContactList();

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');
        if (fileName != '') {
            window.open(buyerDocumentURl + fileName, '');
        }
    });
}
