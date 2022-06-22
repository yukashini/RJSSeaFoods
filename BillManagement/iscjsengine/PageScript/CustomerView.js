{
    var CustomerId = "";
    var Customerlst = [];
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
        CustomerId = urlParams.get('CustomerID');
        Customerlst = GetCustomerDetails();
        RegisterMasking();
        RegisterAlphabetsOnly();
        BindAllBilllst();
        BindCustomerDetails();
    });
}
{
    var BindAllBilllst = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_Billlist').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "ViewCustomer.aspx/GetAllBillList",
                contentType: "application/json;",
                dataType: "json",
                type: "POST",
                async: false,
                "data": function (dataTableModel) {
                    var obj = ConfigurePaginationModel(dataTableModel);
                    return JSON.stringify(obj);
                },
                "dataSrc": function (json) {
                    var objData = $.parseJSON(json.d);
                    json.data = common.AUF(objData['BillList']);
                    json.recordsTotal = common.AUF(objData['AllCount'][0]["Count"]);
                    json.recordsFiltered = common.AUF(objData['AllCount'][0]["Count"]);
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[0, "asc"]],
            "bFilter": false,
            'bDestroy': true,
            'bInfo': false,
            "pageLength": 10,
            'bLengthChange': false,
            "language": {
                "emptyTable": '<span class="no-data-message">No Data Found</span>'
            },
            'aoColumns': [
                {
                    "width": '25%',

                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["BillNo"] == null || data["BillNo"] == '' ? '-' : data["BillNo"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Description"] == null || data["Description"] == '' ? '-' : data["Description"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                       
                        var colorCode = GetStatusColor(data["Status"]);
                        var html = '';
                        html += '<i style="margin-right:5px;" class="fa fa-circle-o ' + colorCode +' "></i><span class=' + colorCode + '>' + (data["Billstatus"] == null || data["Billstatus"] == '' ? '-' : data["Billstatus"]) + '</span>';
                        return html;
                    }
                },
                

                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["DueDate"]);

                        var nextDue = moment.utc(data["DueDate"]).toDate();
                        var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                        var html = '';
                        if (moment(today) <= dueDay) {
                            html += '<div style="text-align: left;">';
                            html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                            html += '</div>';
                        }
                        else {
                            html += '<div style="text-align: left;">';
                            html += '<h5 style="Color:red">' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                            html += '</div>';
                        }
                        return html;
                    }
                },

                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["AmountDue"] == null || Math.sign(parseFloat(data["AmountDue"])) == -1 ? '0.00' : parseFloat(data["AmountDue"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<a class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + data["BillID"] + '"><i class="fa fa-comment-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="View"  bill-View="' + data["BillID"] + '"><i class="fa fa-eye"></i></a>';
                        //var html = '<a style="margin-left: 36px;" href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["BillID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                        return html;
                    }
                },
                
            ],
            "drawCallback": function (settings) {
                $('#tbl_Billlist tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },

            "fnDrawCallback": function () {
                if (dataAllCount > 10) {
                    $('.dataTables_paginate').show();
                }
                else {
                    $('.dataTables_paginate').hide();
                }
            }
        });

    }

    var ConfigurePaginationModel = function (objModel) {
        
        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.CustId = CustomerId;
        var _obj = {};
        _obj = { "allBilllist": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {

        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "InvoiceNumber " + direction;
                break;
            case 1:
                orderBy = "Description " + direction;
                break;
            case 2:
                orderBy = "Value1 " + direction;
                break;
            case 3:
                orderBy = "DueDate " + direction;
                break;
            
            case 4:
                orderBy = "AmountDue " + direction;
                break;
        }
        return orderBy;
    }
    var SaveCustomerContact = function () {
        var firstName = $('#contact-first-Name').val()
        var lastName = $('#contact-last-Name').val()
        var email = $('#contact-email').val()
        var phone = $('#contact-phone').val()
        var obj = {
            'FirstName': firstName,
            'LastName': lastName,
            'Email': email,
            'Phone': phone,
            'CustomerID': CustomerId
        }
        var insertObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewCustomer.aspx/InsertCustomerContact", insertObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact created successfully!!", { position: "right top", className: "success" });
                BindContactPanel();
               $("#mp_add-contact").hide();
               // $('#mp_add-contact').modal('toggle');
                ResetContactFields();
            }
            else {
                $.notify("Email already exists!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    var ValidateCustomer = function () {
        var isValid = true;
        var firstName = $.trim($('#contact-first-Name').val());
        var email = $.trim($('#contact-email').val());
        var phone = $.trim($('#contact-phone').val());
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
    //Data Manipulation
    {
        var GetCustomerDetails = function () {
            var obj = {
                'CustomerId': CustomerId
            }
            var tempList = {};
            $.when(RequestServer("ViewCustomer.aspx/GetCustomerlistData", obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
    var BindCustomerDetails = function () {
        var CustomerDetails = common.AUF($.parseJSON(Customerlst[0]["Table"]));
       
        if (CustomerDetails[0]["CustomerLogo"] != null && CustomerDetails[0]["CustomerLogo"] != '') {
            var image = "images/CustomerLogos/" + CustomerDetails[0]["CustomerLogo"] + "";
            $('#Customer-Logo').attr('src', image);
        }

        $("#lbl_Cusname").html(CustomerDetails[0].CustomerName);
        $("#email").html(CustomerDetails[0].Email);
        $('#email').prop('title', CustomerDetails[0].Email);
        $("#lbl_Phoneno").html(CustomerDetails[0].ContactNumber);
        $('#lbl_Phoneno').prop('title', CustomerDetails[0].ContactNumber);
        $("#lbl_cusname").html(CustomerDetails[0].CustomerName);
        $("#lbl_cusemail").html(CustomerDetails[0].Email);
        $("#lbl_cusaddress").html(CustomerDetails[0].CustomerAddress);
        $("#lbl_state").html(CustomerDetails[0].State);
        $("#lbl_custype").html(CustomerDetails[0].Value1);
        $("#lbl_cusphone").html(CustomerDetails[0].ContactNumber);
        $("#lbl_cuscity").html(CustomerDetails[0].City);
        $("#lbl_cuszip").html(CustomerDetails[0].Zip);
    }
    var BindContactList = function (contactDetails) {
        
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
    var DeleteContact = function (contactID) {
        var obj = {
            'CustomerID': CustomerId,
            'ContactID': contactID
        }
        var deleteObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewCustomer.aspx/DeleteCustomerContact", deleteObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact deleted successfully!!", { position: "right top", className: "success" });
                BindContactPanel();
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
    $(document).on('click', '[data-edit-Contact]', function () {
       
        var $this = $(this);
        editContact = parseInt($this.attr('data-edit-Contact'));
        $('#contact-Modal-Title').html('Edit Contact')
        $('#Update-Customer-Contact').show();
        $("#mp_add-contact").show();
        $("#div_add").hide();
        $("#div_Update").show();

        $('#insert-Customer-Contact').hide();
        $('#contact-first-Name').val($this.parents('tr').attr('data-FirstName'))
        $('#contact-last-Name').val($this.parents('tr').attr('data-LastName'))
        $('#contact-email').val($this.parents('tr').attr('data-Email'))
        $('#contact-phone').val($this.parents('tr').attr('data-Phone'))
    });
    $(document).on('click', '#Update-Customer-Contact', function () {
        if (ValidateCustomer() && $("span[error-active='true']").length == 0) {
            UpdateCustomerContact();
        }
    });

    var UpdateCustomerContact = function () {
        var firstName = $('#contact-first-Name').val()
        var lastName = $('#contact-last-Name').val()
        var email = $('#contact-email').val()
        var phone = $('#contact-phone').val()
        var obj = {
            'FirstName': firstName,
            'LastName': lastName,
            'Email': email,
            'Phone': phone,
            'CustomerID': CustomerId,
            'ContactID': editContact
        }
        var updateObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewCustomer.aspx/UpdateCustomerContact", updateObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact updated successfully!!", { position: "right top", className: "success" });
                BindContactPanel();
                $("#mp_add-contact").hide();
                ResetContactFields();
            }
            else {
                $.notify("Server error occured while updating a contact!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    var BindContactPanel = function () {
        Customerlst = GetCustomerDetails();
        var contactDetails = common.AUF($.parseJSON(Customerlst[1]["Table1"]));
        BindContactList(contactDetails);
       
        var Documents = common.AUF($.parseJSON(Customerlst[2]["Table2"]));
        BindDocumentsPanel(Documents)
        var DocumentsNote = common.AUF($.parseJSON(Customerlst[3]["Table3"]));
        BindNotesPanel(DocumentsNote)
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
                url: "CustomerDocuments.ashx",
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
            'CustomerId': CustomerId
        }
        var insertObj = {
            'FileObject': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewCustomer.aspx/InsertCustomerDocument", insertObj)).done(function (response) {
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

    var SaveNotes = function () {
        if (isNotesUpdate == 0 && editNotesID == 0) {
            var obj = {
                'CustomerID': CustomerId,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("ViewCustomer.aspx/InsertNotes", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {

                    BindContactPanel();
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
                'CustomerID': CustomerId,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("ViewCustomer.aspx/UpdateNotes", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {

                    BindContactPanel();
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

    var BindNotesPanel = function (noteList) {
        var html = ''
        var $el = $('#div-Notes-Body');

        //var vendorNoteslist = GetVendorNotes();
        //var noteList = vendorNoteslist["Notes"];

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
                // html += '<div class="screen-row" data-remove="' + (item["VendorNotesID"] == null ? '0' : item["VendorNotesID"]) + '">';
                // html += '<div class="div-col-8per">';
                // html += '<img src="img/single-user-icon.png" class="isc-vnd-img">';
                // html += '<h5 style="font-weight:400;" title="' + (item["Name"] == null ? '-' : item["Name"]) + '">' + (item["Name"] == null ? '-' : item["Name"]) + '</h5>';
                // html += '</div>';
                // html += '<div class="div-col-80per">';
                // //html += '<h6 class="isc-vnd-edt-cht-tm">Sun Feb 28 ,4.54 am</h6>';
                // html += '<h6 class="isc-vnd-edt-cht-tm">' + (localUpdatedOn == "Invalid date" ? (localCreatedOn == "Invalid date" ? '-' : localCreatedOn) : localUpdatedOn) + '</h6>';
                // html += '<div class="isc-bill-vnd-cht">';
                //   html += '<pre title="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">' + (item["Notes"] == null ? '-' : item["Notes"]) + '</pre>';
                //// html += '<p title="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">' + (item["Notes"] == null ? '-' : item["Notes"]) + '</p>';
                // html += '</div>';
                // html += '<a class="isc-bdg-grd-sts-s2 isc-bdg-col-c1" style="cursor:pointer;" title="Edit" >Edit</a>';

                // html += '</div>';
                // html += '</div>';
                html += ' <div class="screen-row mar-top-max">';
                html += ' <div class="div-col-06per" ><div class="avt-name">';
                html += ' <h4>' + firstShorName + lastShorName + '</h4></div><h5 style="font-weight:400;" title="' + (item["Name"] == null ? '-' : item["Name"]) + '"> ' + (item["Name"] == null ? '-' : item["Name"]) + '</h5></div>';
                html += ' <div class="div-col-80per"><h6 class="isc-vnd-edt-cht-tm">' + (localUpdatedOn == "Invalid date" ? (localCreatedOn == "Invalid date" ? '-' : localCreatedOn) : localUpdatedOn) + '</h6>';
                html += ' <div class="isc-bill-vnd-cht">';
                html += ' <p title="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">' + (item["Notes"] == null ? '-' : item["Notes"]) + '</p>';
                html += ' </div><a style="cursor:pointer" class="isc-bdg-grd-sts-s2 isc-bdg-col-c1" title="Edit" data-Created-By="' + (item["CreatedBy"] == null ? 0 : item["CreatedBy"]) + '" data-edit-Notes="' + (item["CustomerNotesID"] == null ? '0' : item["CustomerNotesID"]) + '" data-Notes="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">Edit</a>';
                html += ' </div></div>';
            });
        }
        else {
            html += '<p style="text-align: center;">No data found</p>'
        }
        $el.html(html);
    }
    var GetBillcomments = function (billId) {
        var _obj = {
            'BillId': billId
        };
        var tempList = {};
        $.when(RequestServer("Bill_UserHome.aspx/GetBillCommentsData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindBillComments = function (BillComments) {
        var $el = $('#div-BillComments');
        var html = '';
        if (BillComments != null && BillComments != undefined && BillComments.length > 0) {
            $.each(BillComments, function (index, item) {
                html += '<div class="form-group">';
                html += '<div class="screen-row">';
                if (item["Status"] == "Approved") {
                    html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:green">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
                }
                else {
                    html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:red">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
                }

                html += '<p class="isc-bill-conf-del mar-top-10" title="' + (item["Comment"] == null ? '-' : item["Comment"]) + '">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
                html += '</div></div>';
            });
        }
        else {
            html += '<p>No Data Found</p>';
        }
        $el.html(html);
    }
}
//ClickEvent
{
    $(document).on('click', '#btn_edit', function (e) {
        window.location = "AddCustomer.aspx?CustomerID=" + CustomerId;
    });
    $(document).on('click', '#btn_Addconect', function (e) {
        $("#mp_add-contact").show();
        $("#div_add").show();
        $("#div_Update").hide();

        $("#Update-Customer-Contact").hide();
        $("#insert-Customer-Contact").show();
    });

    $(document).on('click', '#insert-Customer-Contact', function () {
        if (ValidateCustomer() && $("span[error-active='true']").length == 0) {
            SaveCustomerContact();
            
        }
    });
    $(document).on('click', '#vendor-Contact-List', function () {
        var contactDetails = common.AUF($.parseJSON(Customerlst[1]["Table1"]));
        BindContactList(contactDetails);
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
    })

    $(document).on('click', '#btn_cancel,#btn_close', function () {
       
        ResetContactFields();
        $("#mp_add-contact").hide();
    });
    $(document).on('click', '#close-delete,#btn_deleteclose', function () {
        $('#mp_contact_Delete').hide();
    });
    //Add Dcouments
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

    $(document).on('click', '#vendor-Documents-List', function () {
        BindContactPanel();
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
    $(document).on('click', '#vendor-Notes-List', function () {
        BindContactPanel();
    });

    $(document).on('click', '[bill-Comments]', function () {
        var billId = $(this).attr('bill-Comments');
        if (billId != null && billId != undefined && billId != '-' && billId != '') {
            billId = parseInt(billId);
            var BillComments = GetBillcomments(billId);
            BillComments = common.AUF(BillComments['Comments']);
            BindBillComments(BillComments);
            var $modal = $('#Mp_Comments');
            $modal.modal('show');
        }
    });

    $("#tbl_Billlist").on('click', '[bill-View]', function () {
        // get the current row
       
        var currentRow = $(this).closest("tr");

        $("#lbl_Invice").html(currentRow.find("td:eq(0)").text()); 
        $("#lbl_Billdescription").html(currentRow.find("td:eq(1)").text()); 
        $("#lbl_BillStatus").html(currentRow.find("td:eq(2)").text()); 
        $("#lbl_Duedate").html(currentRow.find("td:eq(3)").text());
        $("#lbl_Amountdue").html(currentRow.find("td:eq(4)").text()); 
       

        var $modal = $('#Mp_View');
        $modal.modal('show');

    });

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