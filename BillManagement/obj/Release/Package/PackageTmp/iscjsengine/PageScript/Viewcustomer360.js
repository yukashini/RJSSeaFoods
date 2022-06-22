{
    var customerScreenData = [];
    var CustomerId = 0;
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
            CustomerId = ((GetQueryStrings()["CustomerID"] == undefined || GetQueryStrings()["CustomerID"] == null) ? 0 : GetQueryStrings()["CustomerID"]);
            BuildCustomerInfoScreen();
            RegisterMasking();
            RegisterAlphabetsOnly();
            $loading.hide();
        }, 0);
    });
}
//DOM
{
    var BuildCustomerInfoScreen = function () {

       // RegisterMasking();
        customerScreenData = GetCustomerinfo();
       // RegisterAlphabetsOnly();
        if (customerScreenData != undefined && customerScreenData != null) {
           BindTopPanel();
            if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
                var unPaidBills = GetunmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "2");
                sortingBillList = unPaidBills;
                
                BindBillList(unPaidBills);
            }

            //var paymentEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2002);
            //// if (paymentEntity.length > 0) {
            //$('#payments-tab').show();
            //if (customerScreenData["PaymentBills"] != undefined && customerScreenData["PaymentBills"] != null && vendorEditScreenData["PaymentBills"].length > 0) {
            //    var unPaidPaymentBills = GetmatchedRecord(customerScreenData["PaymentBills"], 'PaymentStatus', "50023");
            //    sortingPaymentList = unPaidPaymentBills;
            //    BindPaymentBillList(unPaidPaymentBills);
            //}
            //}
            //else {
            //    $('#payments-tab').hide();
            //}



        }
    }

    var BindBillList = function (billList) {
       // var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
        var $el = $("#tbl_invoicebdy");
        var html = '';
        if (billList != undefined && billList != null && billList.length > 0) {
            $.each(billList, function (index, item) {
               
                
                var amount = parseFloat(item["Dueamount"] == null ? 0 : item["Dueamount"]);
                html += '<tr>';
                html += '<td> <h5 title="' + (item["CustomerName"] == null || item["CustomerName"] == '' ? "-" : item["CustomerName"]) + '">' + (item["CustomerName"] == null || item["CustomerName"] == '' ? "-" : item["CustomerName"]) + '</h5></td>';
                html += '<td>';
                html += '<h5 title="' + (item["InvID"] == null || item["InvID"] == '' ? '-' : item["InvID"]) + '">' + (item["InvID"] == null || item["InvID"] == '' ? '-' : item["InvID"]) + '</h5>';
                html += '</td>';
                html += '<td  >';
                // html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["BillStatus"]);
                
                html += '<h5 title="' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '">' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '</h5>';
                html += '</td>';

                html += '<td  >';
                html += '<i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode + ' "></i><span style="width:150px" class="isc-lbl-act-read-list-s1 ' + colorCode + '" title="' + (item["Status"] == null ? '-' : item["Status"]) + '">' + (item["Status"] == null ? '-' : item["Status"]) + '</span>';
                html += '</td>';

               

                html += '<td>';
                debugger;
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);

                if (moment(today) <= dueDay) {
                  
                    html += '<h5  title=' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '>' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '</h5>';
                }
                else {
                   
                    html += '<h5 style="color:red !important;" title=' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '>' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '</h5>';
                }
                
                html += '</td>';

                //html += '<h5 title="' + (item["PaymentMode"] == null || item["PaymentMode"] == '' ? '-' : item["PaymentMode"]) + '">' + (item["PaymentMode"] == null || item["PaymentMode"] == '' ? '-' : item["PaymentMode"]) + '</h5>';
                //html += '</td>';
                //html += '<td>';
                //html += '<h5 title="' + (item["StageName"] == null ? '-' : item["StageName"]) + '">' + (item["StageName"] == null ? '-' : item["StageName"]) + '</h5>';
                //html += '</td>';
             
                html += '<td><h5 style="text-align:right; color:green;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';


                html += '<td style="text-align:center;">';

                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#" data-View="' + item["InvoiceId"] + '"><i class="fa fa-eye"></i></a>';
                

                html += '</td>';


             

                //html += '<td style="text-align:center;">';

                ////html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>';
                //if (isEdit.length > 0 && (item["Status"] == "50017" || item["Status"] == "50018" || item["Status"] == "50019" || item["Status"] == "50036")) {
                //    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="E8dit" href="CreateNewBill.aspx?BillID=' + item["BillID"] + '" style="padding-left:28px;"><i class="fa fa-pencil-square-o"></i></a>';
                //}
                //html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + item["BillID"] + '"><i class="fa fa-comment-o"></i></a>';
                ////if (isDelete.length > 0 && item["Status"] == "50019") {
                ////    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"  data-bill-Delete="' + item["BillID"] + '" ><i class="fa fa-trash-o"></i></a>';
                ////}
                //if (item["IsSplitted"] == "50013") {
                //    html += '<a style="" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split""  data-bill-Split="' + item["BillID"] + '"><i class="fas fa-code-branch"></i></a>';
                //}
                //html += '</td>';
                html += '</tr>';
            });
        }
        else {
            
            html += '<tr><td colspan="6" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
      
    }

    var BindTopPanel = function () {
        
        var panelDetails = customerScreenData["Customerlist"]
       // var vendorAmountDetails = customerScreenData["VendorAmountDetails"];
        if (panelDetails != undefined && panelDetails != null && panelDetails.length > 0) {
            if (panelDetails[0]["CustomerLogo"] != null && panelDetails[0]["CustomerLogo"] != '') {
                var image = "images/CustomerLogos/" + panelDetails[0]["CustomerLogo"] + "";
                $('#Customerlogo').attr('src', image);
            }

            $('#spn_customer').html(panelDetails[0]["CustomerName"] == null ? '' : SafeHTML(panelDetails[0]["CustomerName"]));
            $('#spn_email').html(panelDetails[0]["Email"] == null ? '' : SafeHTML(panelDetails[0]["Email"]));
            $('#spn_phone').html(panelDetails[0]["ContactNumber"] == null ? '' : SafeHTML(panelDetails[0]["ContactNumber"]));
            $('#spn_receamount').html(panelDetails[0]["RecevableAmout"] == null ? '0' :panelDetails[0]["RecevableAmout"]);
            $('#spn_lastpayment').html(panelDetails[0]["LastPayment"] == null ? '0' :panelDetails[0]["LastPayment"]);
            $('#spn_amountrece').html(panelDetails[0]["RecevedAmout"] == null ? '0' :panelDetails[0]["RecevedAmout"]);


        }
        //if (vendorAmountDetails != undefined && vendorAmountDetails != null && vendorAmountDetails.length > 0) {
        //    $('#vendor-Balance').html("$" + (vendorAmountDetails[0]["BalanceAmount"] == null || Math.sign(parseFloat(vendorAmountDetails[0]["BalanceAmount"])) == -1 ? 0 : parseFloat(vendorAmountDetails[0]["BalanceAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        //    $('#vendor-LastPay').html("$" + (vendorAmountDetails[0]["LastPayment"] == null || Math.sign(parseFloat(vendorAmountDetails[0]["LastPayment"])) == -1 ? 0 : parseFloat(vendorAmountDetails[0]["LastPayment"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        //    $('#vendor-Paid-Amount').html("$" + (vendorAmountDetails[0]["TotalPaidAmount"] == null || Math.sign(parseFloat(vendorAmountDetails[0]["TotalPaidAmount"])) == -1 ? 0 : parseFloat(vendorAmountDetails[0]["TotalPaidAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        //}

        //BindDetailPanel();
    }

    var BindCustomerDetails = function () {
        
        var CustomerDetails = customerScreenData["Customerlist"]

        $("#lbl_name").html(CustomerDetails[0].CustomerName);
        $("#lbl_type").html(CustomerDetails[0].Value1);
        $("#lbl_email").html(CustomerDetails[0].Email);
        $('#lbl_email').prop('title', CustomerDetails[0].Email);
        $("#lbl_taxid").html('');
        $("#lbl_method").html(CustomerDetails[0].PaymentMethod);
        $("#lbl_terms").html(CustomerDetails[0].PaymentTerm);
        $("#lbl_leadda").html('');
        $("#lbl_address").html(CustomerDetails[0].CustomerAddress);
        $("#lbl_city").html(CustomerDetails[0].City);
        $("#lbl_state").html(CustomerDetails[0].State);
        $("#lbl_country").html('');
        $("#lbl_zip").html(CustomerDetails[0].Zip);
        $("#lbl_phone").html(CustomerDetails[0].ContactNumber);
        $('#lbl_phone').prop('title', CustomerDetails[0].ContactNumber);
        $("#lbl_accholdername").html(CustomerDetails[0].AccountHoldername);
        $("#lbl_routingno").html(CustomerDetails[0].RoutingNumber);
        $("#lbl_accountno").html(CustomerDetails[0].AccountNumber);
        $("#lbl_achroutingno").html('');
        
    }

    var BindPaymentDetails = function (billList) {
        var $el = $("#tbl_paymentbdy");
        var html = '';
        if (billList != undefined && billList != null && billList.length > 0) {
            $.each(billList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);

                var amount = parseFloat(item["Dueamount"] == null ? 0 : item["Dueamount"]);
                html += '<tr>';
                html += '<td> <h5 title="' + (item["InvID"] == null || item["InvID"] == '' ? "-" : item["InvID"]) + '">' + (item["InvID"] == null || item["InvID"] == '' ? "-" : item["InvID"]) + '</h5></td>';
               
                html += '<td  >';
                // html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["BillStatus"]);
                
                html += '<h5 title="' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '">' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '</h5>';
                html += '</td>';

                html += '<td  >';
                html += '<i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode + ' "></i><span style="width:150px" class="isc-lbl-act-read-list-s1 ' + colorCode + '" title="' + (item["Status"] == null ? '-' : item["Status"]) + '">' + (item["Status"] == null ? '-' : item["Status"]) + '</span>';
                html += '</td>';

                html += '<td>';
                html += '<h5 title="' + (item["Stage"] == null || item["Stage"] == '' ? '-' : item["Stage"]) + '">' + (item["Stage"] == null || item["Stage"] == '' ? '-' : item["Stage"]) + '</h5>';
                html += '</td>';

                html += '<td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '>' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '>' + (item["Duedate"] == null ? '-' : moment(item["Duedate"]).format('MM/DD/YYYY')) + '</h5>';
                }

                html += '</td>';

                

                html += '<td><h5 style="text-align:right; color:green;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';

                html += '<td style="text-align:center;">';

                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Email" href="#" data-emailid="' + item["InvoiceId"] + '"><i class="fa fa-envelope"></i></a>';
               
                
                html += '</td>';
                html += '</tr>';
            });
        }
        else {

            html += '<tr><td colspan="6" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
    }

    var BindNotesPanel = function () {
        customerScreenData = GetCustomerinfo();
        var noteList = customerScreenData["Note"]
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

    var BindDocumentsPanel = function () {
        customerScreenData = GetCustomerinfo();
        var docList = customerScreenData["Documents"]

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
        $.when(RequestServer("ViewCustomer360.aspx/InsertCustomerDocument", insertObj)).done(function (response) {
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
            'BuyerId': parseInt(BuyerID),
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
                'CustomerID': CustomerId,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("ViewCustomer360.aspx/InsertNotes", obj)).done(function (response) {
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
                'CustomerID': CustomerId,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("ViewCustomer360.aspx/UpdateNotes", obj)).done(function (response) {
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
            'BuyerId': BuyerID
        }
        var insertObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("ViewCustomer360.aspx/InsertCustomerContact", insertObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact created successfully!!", { position: "right top", className: "success" });
                BindContactList();
                $("#mp_add-contact").hide();
                //$('#mp_add-contact').modal('toggle');
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

        customerScreenData = GetCustomerinfo();
        var contactDetails = customerScreenData["Contact"]
        sortingContactList = contactDetails;
       // sortingContactList = contactDetails;
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
    var BindViewDetails = function (Viewlist) {
        $.each(Viewlist, function (index, item) {
            $('#ibl_invoice').html(item["InvoiceName"]);
            $('#ibl_Indate').html(item["Invoicedate"]);
            $('#ibl_termcode').html(moment(item["Duedate"]).format('MM/DD/YYYY'));
            $('#ibl_total').html(item["TOTAL"]);
            $('#spn_from').html(item["ClientName"]);
            $('#spn_to').html(item["CustomerName"]);
            $('#spn_shipto').html(item["CustomerName"]);

        });
    }
    var BindOrderDetail = function (Orderlst) {

        var html = '';
        var $el = $('#tbl-order');
        $.each(Orderlst, function (index, item) {
            html += '<tr>'
            html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '-' : item["Amount"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '' : item["Amount"]) + '</h5></td>'
            html += '</tr>'
        });


        $el.html(html);
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
            CustomerName = item["CustomerName"];
            //ClientName
            $('#lbl_to').html(item["CustomerName"]);
            $('#lbl_shipto').html(item["CustomerName"]);
            $('#exist-valuescc').val(item["PrimaryEmailID"]);
        });
    }
    var BindOrderDetails = function (Orderlst) {

        var html = '';
        var $el = $('#tbl_orderemail');
        $.each(Orderlst, function (index, item) {
            html += '<tr>'
            html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '-' : item["Amount"]) + '</h5></td>'
            html += '<td style="text-align:right; title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '' : item["Amount"]) + '</h5></td>'
            html += '</tr>'
        });

        $el.html(html);
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
        $.when(RequestServer("ViewCustomer360.aspx/DeleteCustomerContact", deleteObj)).done(function (response) {
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
        $.when(RequestServer("ViewCustomer360.aspx/UpdateCustomerContact", updateObj)).done(function (response) {
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
    $(document).on('click', '#tab-paid', function () {
       
        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "2");
            sortingBillList = paidBills;
            BindBillList(paidBills);
        }
    });
    $(document).on('click', '#tab-allInvoice', function () {
       
        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = customerScreenData["UserBills"]
            sortingBillList = paidBills;
            BindBillList(paidBills);
        }
    });

    $(document).on('click', '#tab-unpaid', function () {
        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "1");
            sortingBillList = paidBills;
            BindBillList(paidBills);
        }
    });

    $(document).on('click', '#tab-details', function () {

        BindCustomerDetails();
    });
    $(document).on('click', '#btn-editcustomer', function () {

        window.location.href = "AddCustomer.aspx?CustomerID=" + CustomerId + "";
    });

    $(document).on('click', '#tab_unpaid', function () {

        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "1");
            sortingBillList = paidBills;
            BindPaymentDetails(paidBills);
        }

    });

    $(document).on('click', '#tab_allinvoice', function () {


        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            //var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "1");
            var paidBills = customerScreenData["UserBills"]
            sortingBillList = paidBills;
            BindPaymentDetails(paidBills);
        }

    });
    $(document).on('click', '#tab_paymentpaidinvoice', function () {


        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "2");
            sortingBillList = paidBills;
            BindPaymentDetails(paidBills);
        }

    });

    $(document).on('click', '#tab_payment', function () {

        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "1");
            sortingBillList = paidBills;
            BindPaymentDetails(paidBills);
        }
    });

    $(document).on('click', '#customer-Notes-List', function () {

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

    $(document).on('click', '#Customer-tab', function () {
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

    $(document).on('click', '#insert-Customer-Contact', function () {
        if (ValidateCustomer() && $("span[error-active='true']").length == 0) {
            SaveCustomerContact();
        }
    });

    $(document).on('click', '#btn_Addconect', function (e) {
        $("#mp_add-contact").show();
        $("#div_add").show();
        $("#div_Update").hide();

        $("#Update-Customer-Contact").hide();
        $("#insert-Customer-Contact").show();
    });

    $(document).on('click', '#customer-Contact-List', function () {
        BindContactList();
    });

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
    })

    $(document).on('click', '[data-View]', function () {
        $('#MP_Batch').show();
        InvoiceId = $(this).attr('data-View');
        var Maildetails = GetIvoiceMaildetails(InvoiceId)
        var Maildetail = common.AUF(Maildetails['Invoice']);
        var Orderlist = common.AUF(Maildetails['OrderList']);
        BindViewDetails(Maildetail);
        BindOrderDetail(Orderlist);
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
                BindContactList();

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');

        if (fileName != '') {
            window.open(customerDocumentURl + fileName, '');
        }
    });
}
