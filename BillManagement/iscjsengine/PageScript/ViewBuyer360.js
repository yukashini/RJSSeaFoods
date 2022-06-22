{
    var BuyerScreenData = [];
    var BuyerId = 0;
    var sortingBillList = [];
    var isNotesUpdate = 0;
    var editNotesID = 0;
    var InvoiceId = 0;
    var maildata = [];
    var sortingContactList = [];

}

{
    $(document).ready(function () {
       $loading.show();
        setTimeout(function () {
            BuyerId = ((GetQueryStrings()["BuyerID"] == undefined || GetQueryStrings()["BuyerID"] == null) ? 0 : GetQueryStrings()["BuyerID"]);
            BuildBuyerInfoScreen();
            RegisterMasking();
            RegisterAlphabetsOnly();
            $loading.hide();
        }, 0);
    });
}
//DOM
{
    var BuildBuyerInfoScreen = function () {
        RegisterMasking();
        BuyerScreenData = GetBuyerinfo();
        RegisterAlphabetsOnly();
        if (BuyerScreenData != undefined && BuyerScreenData != null) {
           BindTopPanel();
        }
    }

    var BindTopPanel = function () {
        var panelDetails = BuyerScreenData["BuyersList"]
        if (panelDetails != undefined && panelDetails != null && panelDetails.length > 0) {
            $('#spn_buyer').html(panelDetails[0]["BuyerName"] == null ? '' : SafeHTML(panelDetails[0]["BuyerName"]));
            $('#spn_email').html(panelDetails[0]["Email"] == null ? '' : SafeHTML(panelDetails[0]["Email"]));
            $('#spn_phone').html(panelDetails[0]["ContactNumber"] == null ? '' : SafeHTML(panelDetails[0]["ContactNumber"]));
        }
    }

    var BindNotesPanel = function () {
        BuyerScreenData = GetBuyerinfo();
        var noteList = BuyerScreenData["Note"]
        var html = ''
        var $el = $('#div-Notes-Body');
        if (noteList != undefined && noteList != null && noteList.length > 0) {
            $.each(noteList, function (index, item) {
                var stillUtcCreatedOn = moment.utc(item["CreatedOn"]).toDate();
                var localCreatedOn = moment(stillUtcCreatedOn).local().format('llll');

                var stillUtcUpdatedOn = moment.utc(item["UpdatedOn"]).toDate();
                var localUpdatedOn = moment(stillUtcUpdatedOn).local().format('llll');
                var firstName = (item["FirstName"] == null ? '-' : item["FirstName"]);
                var firstShorName = firstName.charAt(0);
                var lastName = (item["LastName"] == null ? '-' : item["LastName"]);
                var lastShorName = lastName.charAt(0);
                html += ' <div class="screen-row mar-top-max">';
                html += ' <div class="div-col-06per" ><div class="avt-name">';
                html += ' <h4>' + firstShorName + lastShorName + '</h4></div><h5 style="font-weight:400;" title="' + (item["Name"] == null ? '-' : item["Name"]) + '"> ' + (item["Name"] == null ? '-' : item["Name"]) + '</h5></div>';
                html += ' <div class="div-col-80per"><h6 class="isc-vnd-edt-cht-tm">' + (localUpdatedOn == "Invalid date" ? (localCreatedOn == "Invalid date" ? '-' : localCreatedOn) : localUpdatedOn) + '</h6>';
                html += ' <div class="isc-bill-vnd-cht">';
                html += ' <p title="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">' + (item["Notes"] == null ? '-' : item["Notes"]) + '</p>';
                html += ' </div><a style="cursor:pointer" class="isc-bdg-grd-sts-s2 isc-bdg-col-c1" id="Edit-doc" title="Edit" data-Created-By="' + (item["CreatedBy"] == null ? 0 : item["CreatedBy"]) + '" data-edit-Notes="' + (item["BuyerNotesID"] == null ? '0' : item["BuyerNotesID"]) + '" data-Notes="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">Edit</a>';
                html += ' </div></div>';
            });
        }
        else {
            html += '<p style="text-align: center;">No data found</p>'
        }
        $el.html(html);
    }

    var BindDocumentsPanel = function () {
        BuyerScreenData = GetBuyerinfo();
        var docList = BuyerScreenData["Documents"]

        var html = ''

        var $el = $('#div-Documents-Body');

        if (docList != undefined && docList != null && docList.length > 0) {
            $.each(docList, function (index, item) {
                var stillUtc = moment.utc(item["CreatedOn"]).toDate();
                var local = moment(stillUtc).local().format('MMM DD, YYYY');
                html += '<div class="screen-row mar-top-10">';
                html += '<div class="div-col-4per" data-Open-File="' + (item["ModifiedFileName"] == null ? '' : item["ModifiedFileName"]) + '"><div class="isc-bill-doc-typ">';
                html += '<i class="fa fa-file" style="cursor:pointer"></i></div></div>';
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
                url: "BuyerDocuments.ashx",
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
            'BuyerId': BuyerId
        }
        var insertObj = {
            'FileObject': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewBuyer360.aspx/InsertBuyerDocument", insertObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Document added successfully!!", { position: "right top", className: "success" });
                BindDocumentsPanel();
                fileContainer = [];
            }
            else {
                $.notify("Server error occured while adding a document!!", { position: "right top", className: "error" });
            }
        });
    }
}

//data
{
    var GetBuyerinfo = function () {
        var _obj = {
            'BuyerId': parseInt(BuyerId),
        };
        var tempList = {};
        $.when(RequestServer("ViewBuyer360.aspx/GetBuyerScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var SaveNotes = function () {
        if (isNotesUpdate == 0 && editNotesID == 0) {
            var obj = {
                'BuyerId': BuyerId,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("ViewBuyer360.aspx/InsertNotes", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {

                    BindNotesPanel();
                    $('#txt-Notes').val('')
                }
                else {
                    $.notify("Server error occured while saving  a notes!!", { position: "right top", className: "error" });
                }
            });
        }
        else {
            var obj = {
                'notesId': editNotesID,
                'BuyerId': BuyerId,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("ViewBuyer360.aspx/UpdateNotes", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {

                    BindNotesPanel();
                    $('#txt-Notes').val('')
                    editNotesID = 0;
                    isNotesUpdate = 0;
                }
                else {
                    $.notify("Server error occured while saving  a notes!!", { position: "right top", className: "error" });
                }
            });
        }

    }

    var BindBuyerDetails = function () {
        BuyerScreenData = GetBuyerinfo();
        var BuyerDetails = BuyerScreenData["BuyersList"]
        $("#lbl_name").html(BuyerDetails[0].BuyerName);
        $("#lbl_phone").html(BuyerDetails[0].ContactNumber);
        $('#lbl_email').html(BuyerDetails[0].Email);
        $("#lbl_taxid").html(BuyerDetails[0].Tax_id);
        $("#lbl_fax").html(BuyerDetails[0].BuyerFax);
        $("#lbl_liners").html(BuyerDetails[0].Liners);
        $("#lbl_address").html(BuyerDetails[0].CustomerAddress);
        $("#lbl_city").html(BuyerDetails[0].City);
        $("#lbl_state").html(BuyerDetails[0].State);
        $("#lbl_country").html(BuyerDetails.Country);
        $("#lbl_zip").html(BuyerDetails[0].Zip);
        $("#lbl_courieraddress").html(BuyerDetails[0].Courieraddress);
        $("#lbl_couriercity").html(BuyerDetails[0].CourierCity);
        $("#lbl_courierstate").html(BuyerDetails[0].CourierState);
        $("#lbl_couriercountry").html(BuyerDetails.CourierCountry);
        $("#lbl_courierzip").html(BuyerDetails[0].CourierZip);

    }

    var SaveBuyerContact = function () {
        var firstName = $('#contact-first-Name').val()
        var lastName = $('#contact-last-Name').val()
        var email = $('#contact-email').val()
        var phone = $('#contact-phone').val()
        var obj = {
            'FirstName': firstName,
            'LastName': lastName,
            'Email': email,
            'Phone': phone,
            'BuyerID': BuyerId
        }
        var insertObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewBuyer360.aspx/InsertBuyerContact", insertObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact created successfully!!", { position: "right top", className: "success" });
                BindContactList();
                $("#mp_add-contact").hide();
                ResetContactFields();
            }
            else {
                $.notify("Email already exists!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var ValidateBuyer = function () {
        var isValid = true;
        var firstName = $.trim($('#contact-first-Name').val());
        var email = $.trim($('#contact-email').val());
        var phone = $.trim($('#contact-phone').val());
       
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            isValid = false;
            $('#emailvalidation').show();
        }

        if (firstName == "" || firstName == null) {
            isValid = false;
            $('#first-Name-Validation').show();

        }
        if (email == "" || email == null) {
            isValid = false;
            $('#email-Validation').show();

        }
        if (phone == "" || phone == null || phone == '+') {
            isValid = false;
            $('#phone-Validation').show();

        }
        return isValid;
    }

    var BindContactList = function () {
        BuyerScreenData = GetBuyerinfo();
        var contactDetails = BuyerScreenData["ContactBuyer"]
        sortingContactList = contactDetails;
        var html = ''
        var $el = $('#tbl-Contact-Body');

        if (contactDetails != undefined && contactDetails != null && contactDetails.length > 0) {
            $.each(contactDetails, function (index, item) {
                html += '<tr data-FirstName="' + (item["Fistname"] == null ? '-' : item["Fistname"]) + '" data-LastName="' + (item["LastName"] == null ? '-' : item["LastName"]) + '" data-Email="' + (item["Email"] == null ? '-' : item["Email"]) + '" data-Phone="' + (item["Phone"] == null ? '-' : item["Phone"]) + '">';
                html += '<td>';
                html += '<h5 title="' + (item["Name"] == null ? '-' : item["Name"]) + '">' + (item["Name"] == null ? '-' : item["Name"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + (item["Email"] == null ? '-' : item["Email"]) + '">' + (item["Email"] == null ? '-' : item["Email"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + (item["Phone"] == null ? '-' : item["Phone"]) + '">' + (item["Phone"] == null ? '-' : item["Phone"]) + '</h5>';
                html += '</td>';
                html += '<td style="text-align:;">';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-edit-Contact=' + (item["ContactIdentityId"] == null ? '0' : item["ContactIdentityId"]) + ' title="Edit" ><i class="fa fa-pencil-square-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-delete-Contact=' + (item["ContactIdentityId"] == null ? '0' : item["ContactIdentityId"]) + ' title="Delete"><i class="fa fa-trash-o"></i></a>';
                html += '</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<tr><td colspan="4" style="text-align:center;">No data found</td></tr>';
        }
        $('#tbl-Contact-Body').html(html);
    }
    var BindMailDetails = function (InvoiceDetails) {

        $.each(InvoiceDetails, function (index, item) {
            $("#exist-valuesTo").val(item["Email"]);
            $('#spn-termcode').html(item["TermCode"]);
            $('#spn-Invoice').html(item["InvoiceName"]);
            $('#spn-indate').html(item["Invoicedate"]);
            $('#spn-total').html(item["TOTAL"]);
            $('#spn_invoice').html(item["InvoiceName"]);
            $('#spn_invicedate').html(item["Invoicedate"]);
            $('#spn_amount').html(item["TOTAL"]);
            $('#spn_InvoiceNo').html(item["InvoiceName"]);
            $("textarea#txt_subject").val(item["SUBJECT"]);
            invoice = item["InvoiceName"];
            invoicedate = item["Invoicedate"];
            total = item["TOTAL"];
            subject = item["SUBJECT"];
            $('#lbl_from').html(item["ClientName"]);
            BuyerName = item["BuyerName"];
            $('#lbl_to').html(item["BuyerName"]);
            $('#lbl_shipto').html(item["BuyerName"]);
            $('#exist-valuescc').val(item["PrimaryEmailID"]);
        });
    }

    var DeleteContact = function (contactID) {
        var obj = {
            'BuyerId': BuyerId,
            'ContactID': contactID
        }
        var deleteObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewBuyer360.aspx/DeleteBuyerContact", deleteObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact deleted successfully!!", { position: "right top", className: "success" });
                BindContactList();
                $('#btn-deleteContact-ok').attr('delete-Contact', '0');
                $('#mp_contact_Delete').hide();
            }
            else {
                $.notify("Server error occured while deleting a contact!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var ResetContactFields = function () {
        $('#contact-first-Name').val('')
        $('#contact-last-Name').val('')
        $('#contact-email').val('')
        $('#contact-phone').val('')
        $("span.validation-message").attr('error-active', false);
        $("span.validation-message").hide();
        $("div.validation-message").removeClass('isc-active-on');
        $("div.validation-message").removeClass('isc-active-child-on');
    }

    var UpdateBuyerContact = function () {
        var firstName = $('#contact-first-Name').val()
        var lastName = $('#contact-last-Name').val()
        var email = $('#contact-email').val()
        var phone = $('#contact-phone').val()
        var obj = {
            'FirstName': firstName,
            'LastName': lastName,
            'Email': email,
            'Phone': phone,
            'BuyerId': BuyerId,
            'ContactID': editContact
        }
        var updateObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewBuyer360.aspx/UpdateBuyerContact", updateObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact updated successfully!!", { position: "right top", className: "success" });
                BindContactList();
                $("#mp_add-contact").hide();
                ResetContactFields();
            }
            else {
                $.notify("Server error occured while updating a contact!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var GetIvoiceMaildetails = function (billId) {
        var _obj = {
            'BillId': InvoiceId
        };
        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/GetInvoicemaildetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetIvoiceMaildetails = function (billId) {
        var _obj = {
            'BillId': InvoiceId
        };
        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/GetInvoicemaildetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var Sendmail = function (maildata) {
        var _obj = {
            'Tomail': $('#exist-valuesTo').val(),
            'Ccail': $('#exist-valuescc').val(),
            'Subject': subject,
            'Body': mailbody,
            'Invoice': invoice,
            'InvoiceDate': invoicedate,
            'Total': total,
            'InvoiceId': InvoiceId,
            'CustomerName': CustomerName,
        };

        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/SendMail", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (response == "1") {
                $.notify("Invoice released to customer!!", { position: "right top", className: "success" });
                // BuildScreen();
                $('#exist-valuesTo').val("");
                $('#exist-valuescc').val("");
                $('#MP_Email').hide();
                setTimeout(function () {
                    window.location.href = 'invoiceCustomer360.aspx';
                }, 1000);
            }
            else {
                $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
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

    $(document).on('click', '#tab-details', function () {
        BindBuyerDetails();
    });

    $(document).on('click', '#btn-editBuyer', function () {
        window.location.href = "AddBuyer.aspx?BuyerID=" + BuyerId + "";
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
