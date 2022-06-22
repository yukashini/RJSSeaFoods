/// <reference path="VendorEdit.js" />
//Global
{
    var vendorID = 0;
    var vendorEditScreenData = [];
    var editContact = 0;
    var isNotesUpdate = 0;
    var editNotesID = 0;
    var sortingBillList = [];
    var sortingPaymentList = [];
    var fileContainer = [];
    var sortingContactList = []
    var Command = "";
    var billId = 0;
    var Billstatus = '0';
    var BillrowID = 0;
    var lastcommand = "";

}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        vendorID = ((GetQueryStrings()["VendorID"] == undefined || GetQueryStrings()["VendorID"] == null) ? 0 : GetQueryStrings()["VendorID"]);
        BuildVendorInfoScreen();
        $loading.hide();
        }, 0);
        

    });

    $(document).on('click', '#paid-Tab', function () {
        if (vendorEditScreenData["UserBills"] != undefined && vendorEditScreenData["UserBills"] != null && vendorEditScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(vendorEditScreenData["UserBills"], 'Status', "50044");
            sortingBillList = paidBills;
            BindBillList(paidBills);
        }
    });

    $(document).on('click', '#recurring-Tab', function () {
        if (vendorEditScreenData["UserBills"] != undefined && vendorEditScreenData["UserBills"] != null && vendorEditScreenData["UserBills"].length > 0) {
            var recurringBills = GetmatchedRecord(vendorEditScreenData["UserBills"], 'IsRecurring', "1");
            sortingBillList = recurringBills;
            BindBillList(recurringBills);
        }
    });

    $(document).on('click', '#unPaid-Tab', function () {
        if (vendorEditScreenData["UserBills"] != undefined && vendorEditScreenData["UserBills"] != null && vendorEditScreenData["UserBills"].length > 0) {
            var unPaidBills = GetunmatchedRecord(vendorEditScreenData["UserBills"], 'Status', "50044");
            sortingBillList = unPaidBills;
            BindBillList(unPaidBills);
        }
    });

    $(document).on('click', '#payment-Unpaid-Bills', function () {
        if (vendorEditScreenData["PaymentBills"] != undefined && vendorEditScreenData["PaymentBills"] != null && vendorEditScreenData["PaymentBills"].length > 0) {
            var unPaidBills = GetmatchedRecord(vendorEditScreenData["PaymentBills"], 'PaymentStatus', "50023");
            sortingPaymentList = unPaidBills;
            BindPaymentBillList(unPaidBills);
        }
    });

    $(document).on('click', '#payment-All-Bills', function () {
        if (vendorEditScreenData["PaymentBills"] != undefined && vendorEditScreenData["PaymentBills"] != null && vendorEditScreenData["PaymentBills"].length > 0) {
            sortingPaymentList = vendorEditScreenData["PaymentBills"];
            BindPaymentBillList(vendorEditScreenData["PaymentBills"]);
        }
    });

    $(document).on('click', '#payment-Disputed-Bills', function () {
        if (vendorEditScreenData["PaymentBills"] != undefined && vendorEditScreenData["PaymentBills"] != null && vendorEditScreenData["PaymentBills"].length > 0) {
            var disputeBills = GetmatchedRecord(vendorEditScreenData["PaymentBills"], 'PaymentStatus', "50033");
            sortingPaymentList = disputeBills;
            BindPaymentBillList(disputeBills);
        }
    });

    $(document).on('click', '#payment-Rec-Bills', function () {
        if (vendorEditScreenData["PaymentBills"] != undefined && vendorEditScreenData["PaymentBills"] != null && vendorEditScreenData["PaymentBills"].length > 0) {
            var recurringBills = GetmatchedRecord(vendorEditScreenData["PaymentBills"], 'IsRecurring', "1");
            sortingPaymentList = recurringBills;
            BindPaymentBillList(recurringBills);
        }
    });

    $(document).on('click', '#vendor-Contact-List', function () {
        BindContactPanel();
    });

    $(document).on('click', '#open-Contact-Model', function () {
        $("#mp_add-contact").show();
        ResetContactFields();
        $('#contact-Modal-Title').html('Add Contact')
        $('#Update-Vendor-Contact').hide();
        $('#insert-Vendor-Contact').show();
    });

    $(document).on('click', '[data-Cancel-Contact]', function () {
        $("#mp_add-contact").hide();
      
    })

    $(document).on('click', '#insert-Vendor-Contact', function () {
        if (ValidateVendor()&&$("span[error-active='true']").length == 0) {
            SaveVendorContact();
        }
       
    });

    $(document).on('click', '[data-edit-Contact]', function () {
        
        var $this = $(this);
        ResetContactFields();
        editContact = parseInt($this.attr('data-edit-Contact'));
        $('#contact-Modal-Title').html('Edit Contact')
        $('#Update-Vendor-Contact').show();
        $("#mp_add-contact").show();
        $('#insert-Vendor-Contact').hide();
        var cval = ($this.parents('tr').attr('data-FirstName'))
        $('#contact-first-Name').val($this.parents('tr').attr('data-FirstName'))
      
        $('#contact-last-Name').val($this.parents('tr').attr('data-LastName'))
        $('#contact-email').val($this.parents('tr').attr('data-Email'))
        $('#contact-phone').val($this.parents('tr').attr('data-Phone'))
    });

    $(document).on('click', '#Update-Vendor-Contact', function () {
        if (ValidateVendor()&&$("span[error-active='true']").length == 0) {
            UpdateVendorContact();
        }
      

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

    $(document).on('click', '[delete-Contact-cancel]', function () {
        $('#btn-deleteContact-ok').attr('delete-Contact', '0');
        $('#mp_contact_Delete').hide();
    });

    $(document).on('click', '#vendor-Notes-List', function () {
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
        BindDocumentsPanel();
    });

    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');

        if (fileName != '') {
            window.open(vendorDocumentURl + fileName, '');
        }


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

    $(document).on('change', '[data-Phone]', function () {
        var $this = $(this);

        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").attr('error-active', false);

    });

    $(document).on('click', '#bills-tab', function () {
        setTimeout(function () {
            $('#bills-Tab-List').scrollingTabs('refresh');
        },1000)
    });

    $(document).on('click', '#payments-tab', function () {
        setTimeout(function () {
            $('#payments-Tab').scrollingTabs('refresh');
        }, 1000)
    })

    //Sorting Events
    {
        //Contact

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

        //Bill
        $(document).on('click', 'th[data-sort]', function (e) {
            var $this = $(this).parents('table');
            if ($('th[data-sort]').hasClass('write-row')) {
                alert("Can't sort when list has writting rows");
                return false;
            }

            // Set Groupby Fields
            {
                //var tablegroupby = 'Entityname'
                // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
                var columngroupby = $(this).attr('data-sort');
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
                    $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');;
                    $(this).find('img').attr('src', sortingascendingicon);
                    currentSortOrder = "asc";
                }
                else if (activesortorder === "asc") {
                    $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                    $(this).find('img').attr('src', sortingdescendingicon);
                    currentSortOrder = "desc";
                }
                else if (activesortorder === "desc") {
                    $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Bills th[sort-column-Type]').removeClass('headerSortUp')
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
                var lstResult = sortingBillList

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
                    BindBillList(lstResult);

                }
                //    $loading.hide();
                //}, 0);
            }
        });

        //Payments 
        $(document).on('click', 'th[data-sort-payment]', function (e) {
            var $this = $(this).parents('table');
            if ($('th[data-sort-payment]').hasClass('write-row')) {
                alert("Can't sort when list has writting rows");
                return false;
            }

            // Set Groupby Fields
            {
                //var tablegroupby = 'Entityname'
                // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
                var columngroupby = $(this).attr('data-sort-payment');
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
                    $('#tbl-bill-payment th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-bill-payment th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');;
                    $(this).find('img').attr('src', sortingascendingicon);
                    currentSortOrder = "asc";
                }
                else if (activesortorder === "asc") {
                    $('#tbl-bill-payment th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-bill-payment th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                    $(this).find('img').attr('src', sortingdescendingicon);
                    currentSortOrder = "desc";
                }
                else if (activesortorder === "desc") {
                    $('#tbl-bill-payment th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-bill-payment th[sort-column-Type]').removeClass('headerSortUp')
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
                var lstResult = sortingPaymentList

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
                    BindPaymentBillList(lstResult);

                }
                //    $loading.hide();
                //}, 0);
            }
        });
    }
}

//DOM
{
    var BuildVendorInfoScreen = function () {
      
        RegisterMasking();
        vendorEditScreenData = GetVendorInfo();
        RegisterAlphabetsOnly();
        if (vendorEditScreenData != undefined && vendorEditScreenData != null ) {
            BindTopPanel();
            if (vendorEditScreenData["UserBills"] != undefined && vendorEditScreenData["UserBills"] != null && vendorEditScreenData["UserBills"].length > 0)
            {
                var unPaidBills = GetunmatchedRecord(vendorEditScreenData["UserBills"], 'Status', "50044");
                sortingBillList = unPaidBills;
                BindBillList(unPaidBills);
            }

            var paymentEntity = GetmatchedRecord(RolePermissions, 'EntityID', 2002);
           // if (paymentEntity.length > 0) {
                $('#payments-tab').show();
                if (vendorEditScreenData["PaymentBills"] != undefined && vendorEditScreenData["PaymentBills"] != null && vendorEditScreenData["PaymentBills"].length > 0) {
                    var unPaidPaymentBills = GetmatchedRecord(vendorEditScreenData["PaymentBills"], 'PaymentStatus', "50023");
                    sortingPaymentList = unPaidPaymentBills;
                    BindPaymentBillList(unPaidPaymentBills);
                }
            //}
            //else {
            //    $('#payments-tab').hide();
            //}
          

           
        }
    }

    var BindTopPanel = function () {
        var panelDetails = vendorEditScreenData["VendorDetails"]
        var vendorAmountDetails=vendorEditScreenData["VendorAmountDetails"];
        if (panelDetails != undefined && panelDetails != null && panelDetails.length > 0)
        {
            if(panelDetails[0]["VendorLogo"]!=null&&panelDetails[0]["VendorLogo"]!='')
            {
                var image="images/VendorLogos/"+panelDetails[0]["VendorLogo"]+"";
                $('#vendor-Logo').attr('src', image);
            }
            
            $('#vendor-Name').html(panelDetails[0]["VendorName"] == null ? '' : SafeHTML(panelDetails[0]["VendorName"]));
            $('#vendor-Contact').html(panelDetails[0]["Phone"] == null ? '' : SafeHTML(panelDetails[0]["Phone"]));
            $('#vendor-Email').html(panelDetails[0]["Email"] == null ? '' : SafeHTML(panelDetails[0]["Email"]));
            $('#vendor-Email').prop('title', panelDetails[0]["Email"] == null ? '' : SafeHTML(panelDetails[0]["Email"]))
        }
        if (vendorAmountDetails != undefined && vendorAmountDetails != null && vendorAmountDetails.length > 0)
        {
            $('#vendor-Balance').html("$" + (vendorAmountDetails[0]["BalanceAmount"] == null || Math.sign(parseFloat(vendorAmountDetails[0]["BalanceAmount"])) == -1 ? 0 : parseFloat(vendorAmountDetails[0]["BalanceAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#vendor-LastPay').html("$" + (vendorAmountDetails[0]["LastPayment"] == null || Math.sign(parseFloat(vendorAmountDetails[0]["LastPayment"])) == -1 ? 0 : parseFloat(vendorAmountDetails[0]["LastPayment"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#vendor-Paid-Amount').html("$" + (vendorAmountDetails[0]["TotalPaidAmount"] == null || Math.sign(parseFloat(vendorAmountDetails[0]["TotalPaidAmount"])) == -1 ? 0 : parseFloat(vendorAmountDetails[0]["TotalPaidAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        }
       
        BindDetailPanel();
    }

    var BindBillList = function (billList) {
        var isEdit = GetmatchedRecord(RolePermissions, 'EntityActionID', '3002');
        var $el = $("#tbl-Bills-Bdy");
        var html = '';
        if (billList != undefined && billList != null && billList.length > 0)
        {
            $.each(billList, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueDate"]);
                //if (item["Amount"] != "" && item["Amount"] != null) {
                //    dollerAmount = $(item["Amount"]).mask('#.##0,00', { reverse: true });
                //    dollerAmount = dollerAmount.selector;
                //}
              //  var amount = item["Amount"].replace(/,/g, '');
                var amount = parseFloat(item["Amount"] == null ? 0 : item["Amount"]);
                html += '<tr>';
                html += '<td> <h5 title="' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5></td>';
                html += '<td>';
                html += '<h5 title="' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '">' + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + '</h5>';
                html += '</td>';
                html += '<td  >';
               // html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["Status"]);
                
                html += '<i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode +' "></i><span style="width:150px" class="isc-lbl-act-read-list-s1 ' + colorCode + '" title="' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</span>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + (item["PaymentMode"] == null || item["PaymentMode"] == '' ? '-' : item["PaymentMode"]) + '">' + (item["PaymentMode"] == null || item["PaymentMode"] == '' ? '-' : item["PaymentMode"]) + '</h5>';
                html += '</td>';
                //html += '<td>';
                //html += '<h5 title="' + (item["StageName"] == null ? '-' : item["StageName"]) + '">' + (item["StageName"] == null ? '-' : item["StageName"]) + '</h5>';
                //html += '</td>';
                html += '<td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '>' + (item["DueDate"] == null ? '-' : moment(item["DueDate"]).format('MM/DD/YYYY')) + '</h5>';
                }

                // html+='<h5 style="color:red !important;">9/3/2020</h5>';
                html += '</td>';
                html += '<td><h5 style="text-align:right; color:green;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';
                html += '<td style="text-align:center;">';

                //html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>';
                if (isEdit.length > 0 && (item["Status"] == "50017" || item["Status"] == "50018" || item["Status"] == "50019" || item["Status"] == "50036")) {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="E8dit" href="CreateNewBill.aspx?BillID=' + item["BillID"] + '" style="padding-left:28px;"><i class="fa fa-pencil-square-o"></i></a>';
                }
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  bill-Comments="' + item["BillID"] + '"><i class="fa fa-comment-o"></i></a>';
                //if (isDelete.length > 0 && item["Status"] == "50019") {
                //    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"  data-bill-Delete="' + item["BillID"] + '" ><i class="fa fa-trash-o"></i></a>';
                //}
                if (item["IsSplitted"] == "50013") {
                    html += '<a style="" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split""  data-bill-Split="' + item["BillID"] + '"><i class="fas fa-code-branch"></i></a>';
                }
                html += '</td>';
                html += '</tr>';
            });
        }
        else {
            $('#chk-All-Lable').hide();
            html += '<tr><td colspan="6" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
        $("input:checkbox").uniform();
    }

    var BindPaymentBillList = function (billList) {
        var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
        var isFlag = GetmatchedRecord(RolePermissions, 'EntityActionID', '3007');
        var isDispute = GetmatchedRecord(RolePermissions, 'EntityActionID', '3008');
        var $el = $("#tbl-Payment-Bills-Bdy");
        var html = '';
        if (billList != undefined && billList != null && billList.length > 0) {
            $.each(billList, function (index, item) {
                var dueDate = moment.utc(item["DueOn"]).toDate();
                var localDueDate = moment(dueDate).local().format('MM/DD/YYYY');
                var today = moment.utc().format('MM/DD/YYYY');
                var dueDay = moment.utc(item["DueOn"]);
                var paidOn = moment.utc(item["PaidOn"]).toDate();
                var localpaidOn = moment(paidOn).local().format('MM/DD/YYYY');
                var amount = parseFloat(item["ApprovedAmount"] == null ? 0 : item["ApprovedAmount"]);
                //var amount = item["ApprovedAmount"].replace(/,/g, '');
                //amount = parseFloat(amount);
                html += '<tr>';
                //html += '<td>';
                //if (item["Status"] == "50019") {
                //    html += '<input type="checkbox" value="' + item["BillID"] + '">';
                //}
                //html += '</td>';
                //html += '<td>';
                //html += '<h5 title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</h5>';
                //html += '</td>';
                html += '<td> <h5 title="' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '">' + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == '' ? "-" : item["InvoiceNumber"]) + '</h5></td>';
                html += '<td>';
                html += '<h5 title="' + (item["Description"] == null ? '-' : item["Description"]) + '">' + (item["Description"] == null ? '-' : item["Description"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<div class="isc-td-inline-status-ch-s1">';
                var colorCode = GetStatusColor(item["PaymentStatus"]);
                html += '<i style="margin-right:5px;vertical-align:super;" class="fa fa-circle-o ' + colorCode +' "></i> <a class="isc-lbl-act-read-list-s1 ' + colorCode + '" title="' + (item["PaymentStatusName"] == null ? '-' : item["PaymentStatusName"]) + '">' + (item["PaymentStatusName"] == null ? '-' : item["PaymentStatusName"]) + '</a>';
                html += '</div></td>';
                //html += '<td>';
                //html += '<h5 title="Payments">Payments</h5>';
                //html += '</td>';
                html += '<td>';
                if (moment(today) <= dueDay) {
                    html += '<h5  title=' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '>' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '</h5>';
                }
                else {
                    html += '<h5 style="color:red !important;" title=' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '>' + (localDueDate == "Invalid date" ? '-' : localDueDate) + '</h5>';
                }

                // html+='<h5 style="color:red !important;">9/3/2020</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5  title="' + (localpaidOn == "Invalid date" ? '-' : localpaidOn) + '">' + (localpaidOn == "Invalid date" ? '-' : localpaidOn) + '</h5>';
                html += '</td>';
                html += '<td> <h5 title="' + (item["PaymentMode"] == null || item["PaymentMode"] == '' ? "-" : item["PaymentMode"]) + '">' + (item["PaymentMode"] == null || item["PaymentMode"] == '' ? "-" : item["PaymentMode"]) + '</h5></td>';
             
                html += '<td><h5 style="text-align:right;" title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';
                html += '<td style="text-align:center;">';
                //if (item["PaymentStatus"] == '50033') {
                //    if (isPay.length > 0) {
                //    //    html += '<a style="padding-right:44px !important;"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                //    }

                //}
                //else if (item["PaymentStatus"] != '50044') {
                //    if (isPay.length > 0) {
                        
                //        html += '<a href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                //    }
                //    if (isFlag.length > 0) {
                //        if (item["PaymentStatus"] != '50025') {
                //            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-flag" style="color:#29b392 !important"  data-flag=' + item["BillID"] + '></i></a>';
                //        }
                       
                //    }
                //    if (isDispute.length > 0) {
                //        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + item["BillID"] + '></i></a>';
                //    }


                //}


                var isPay = GetmatchedRecord(RolePermissions, 'EntityActionID', '3006');
                var isFlag = GetmatchedRecord(RolePermissions, 'EntityActionID', '3007');
                var isDispute = GetmatchedRecord(RolePermissions, 'EntityActionID', '3008');
                if (item["PaymentStatus"] == '50023') {
                    html += '<div class="screen-row isc-inline-pop-action-s1 cell-right pad-lft-min mar-rgt-20" style="margin-right: 30px;">';
                    html += '<a class="isc-action-badge-td-s1" title="More Actions" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
                    html += '<i class="fa fa-ellipsis-v "></i></a>';
                    html += '<ul class="dropdown-menu-entity">';
                    if (item["PaymentStatus"] != '50044' && isDispute.length > 0)
                    {
                        html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '">Dispute</a></li>';
                        html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="Mark As Paid"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '">Mark As Paid</a></li>';
                    }
                    //   if (isDelete.length > 0 && data["Status"] == "50019") {
                    html += '<li><a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5" title="Comments" approved-bill-Comments="' + item["BillID"] + '" bill-ApproveId="' + item["IdentityID"] + '">Comments</a></li>';
                    // }
                    html += '</ul>';
                    html += '</div>';
                }
                html += '<div style="text-align: center;">';

                if (item["PaymentStatus"] == '50033') {
                    if (isPay.length > 0) {
                        //  html += '<a style="padding-right:44px !important;"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                    }

                }
                else if (item["PaymentStatus"] != '50044') {

                    if (isPay.length > 0) {

                        html += '<a  style="margin-left: 50px;" href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"> <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>';
                    }
                    if (isFlag.length > 0) {
                        if (item["PaymentStatus"] != '50025') {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"><i class="fa fa-flag" style="color:#29b392 !important"  data-flag=' + item["BillID"] + '></i></a>';

                        }
                    }
                    //if (isDispute.length > 0) {
                    //    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + data["BillID"] + '&&billAId=' + data["IdentityID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + data["BillID"] + '></i></a>';
                    //}


                }
                if (item["PaymentStatus"] == '50025' && isDispute.length > 0) {

                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + item["BillID"] + '></i></a>';
                   // html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Mark As Paid"  href="Bill_PaymentDetails.aspx?BillID=' + item["BillID"] + '&&billAId=' + item["IdentityID"] + '"><i class="fa fa-exclamation-triangle" style="color:#ad1717 !important" data-challenge=' + item["BillID"] + '></i></a>';

                }
                if (item["PaymentStatus"] != '50023') {
                    html += '<a style="margin-right: 40px;" class="isc-action-badge-td-s1 pad-lft-5" title="Comments"  approved-bill-Comments="' + item["BillID"] + '" bill-ApproveId="' + item["IdentityID"] + '"><i class="fa fa-comment-o"></i></a>';
                }
                if (item["IsSplitted"] == "50013") {
                    html += '<a style="cursor:pointer;" class="isc-action-badge-td-s1 pad-lft-5 isc-split" title="Split""  data-bill-Split="' + item["BillID"] + '"><img src="images/Split2.png" class="isc-tbl-icon-img"/></a>';
                }
                html += '</div>';


                html += '</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<tr><td colspan="8" style="text-align:center;">No data found</td><tr>';
        }
        $el.html(html);
    }

    var BindDetailPanel = function () {
        var panelDetails = vendorEditScreenData["VendorDetails"]
        $('#btn-Edit-Vendor').attr('href', 'AddVendor.aspx?VendorID=' + vendorID + '');
        if (panelDetails != undefined && panelDetails != null && panelDetails.length > 0)
        {
            $('#vendorName').html(panelDetails[0]["VendorName"] == null ? '' : SafeHTML(panelDetails[0]["VendorName"]));
            $('#vendor-PaymentTerm').html(panelDetails[0]["StrPaymentTerm"] == null ? '' : SafeHTML(panelDetails[0]["StrPaymentTerm"]));
            $('#vendor-Taxid').html(panelDetails[0]["TaxId"] == null ? '' : SafeHTML(panelDetails[0]["TaxId"]));
            $('#vendor-PaymentMethod').html(panelDetails[0]["StrPrefferedPaymentMethod"] == null ? '' : SafeHTML(panelDetails[0]["StrPrefferedPaymentMethod"]));
            $('#vendor-LeadTimes').html(panelDetails[0]["LeadTimeDays"] == null ? '' : SafeHTML(panelDetails[0]["LeadTimeDays"]));
            $('#vendor-AccountHolder').html(panelDetails[0]["AccountHolderName"] == null ? '' : SafeHTML(panelDetails[0]["AccountHolderName"]));
            $('#vendor-AccountNumber').html(panelDetails[0]["AccountNumber"] == null ? '' : SafeHTML(panelDetails[0]["AccountNumber"]));
            $('#vendor-RoutingNumber').html(panelDetails[0]["RoutingNumber"] == null ? '' : SafeHTML(panelDetails[0]["RoutingNumber"]));
            $('#vendor-Address').html(panelDetails[0]["Address1"] == null ? '' : SafeHTML(panelDetails[0]["Address1"]));
            $('#vendor-State').html(panelDetails[0]["State"] == null ? '' : SafeHTML(panelDetails[0]["State"]));
            $('#vendor-City').html(panelDetails[0]["City"] == null ? '' : SafeHTML(panelDetails[0]["City"]));
            $('#vendor-Zip').html(panelDetails[0]["PostalCode"] == null ? '' : SafeHTML(panelDetails[0]["PostalCode"]));
            $('#vendorType').html(panelDetails[0]["StrVendorType"] == null ? '' : SafeHTML(panelDetails[0]["StrVendorType"]));
            $('#vendoEmail').html(panelDetails[0]["Email"] == null ? '' : SafeHTML(panelDetails[0]["Email"]));
            $('#contactNumber').html(panelDetails[0]["Phone"] == null ? '' : SafeHTML(panelDetails[0]["Phone"]));
            $('#country').html(panelDetails[0]["VendorName"] == null ? '' : SafeHTML(panelDetails[0]["VendorName"]));
        }
    }

    var BindContactPanel = function () {
        var vendorContactList = GetVendorContacts();
        var contactDetails = vendorContactList["VendorContacts"]
        sortingContactList = contactDetails;
        BindContactList(contactDetails);
    }

    var BindContactList = function (contactDetails) {
        var html = ''
        var $el = $('#tbl-Contact-Body');
      
        if (contactDetails != undefined && contactDetails != null && contactDetails.length > 0)
        {
            $.each(contactDetails, function (index, item) {
                html += '<tr data-FirstName="' + (item["FirstName"] == null ? '-' : item["FirstName"]) + '" data-LastName="' + (item["LastName"] == null ? '-' : item["LastName"]) + '" data-Email="' + (item["Email"] == null ? '-' : item["Email"]) + '" data-Phone="' + (item["Phone"] == null ? '-' : item["Phone"]) + '">';
                html+='<td>';
                html += '<h5 title="' + (item["Name"] == null ? '-' : item["Name"]) + '">' + (item["Name"] == null ? '-' : item["Name"]) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5 title="' + (item["Email"] == null ? '-' : item["Email"]) + '">' + (item["Email"] == null ? '-' : item["Email"]) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5 title="' + (item["Phone"] == null ? '-' : item["Phone"]) + '">' + (item["Phone"] == null ? '-' : item["Phone"]) + '</h5>';
                html+='</td>';
                html+='<td style="text-align:;">';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-edit-Contact=' + (item["ContactIdentityId"] == null ? '0' : item["ContactIdentityId"]) + ' title="Edit" ><i class="fa fa-pencil-square-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-delete-Contact=' + (item["ContactIdentityId"] == null ? '0' : item["ContactIdentityId"]) + ' title="Delete"><i class="fa fa-trash-o"></i></a>';
                html+='</td>';
                html += '</tr>';

            });
        }
        else {
            html += '<tr><td colspan="4" style="text-align:center;">No data found</td></tr>';
        }
        $('#tbl-Contact-Body').html(html);
    }

    var BindNotesPanel = function () {
        var html = ''
        var $el = $('#div-Notes-Body');
        var vendorNoteslist = GetVendorNotes();
        var noteList = vendorNoteslist["Notes"];
        if (noteList != undefined && noteList != null && noteList.length > 0)
        {
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
                html+=' <div class="screen-row mar-top-max">';
                html+=' <div class="div-col-6per isc-mb-res-wd-35" ><div class="avt-name">';
                html += ' <h4>' + firstShorName + lastShorName + '</h4></div><h5 style="font-weight:400;" title="' + (item["Name"] == null ? '-' : item["Name"]) + '"> ' + (item["Name"] == null ? '-' : item["Name"]) + '</h5></div>';
                html += ' <div class="div-col-80per"><h6 class="isc-vnd-edt-cht-tm">' + (localUpdatedOn == "Invalid date" ? (localCreatedOn == "Invalid date" ? '-' : localCreatedOn) : localUpdatedOn) + '</h6>';
                html+=' <div class="isc-bill-vnd-cht">';
                html += ' <p title="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">' + (item["Notes"] == null ? '-' : item["Notes"]) + '</p>';
                html += ' </div><a style="cursor:pointer" class="isc-bdg-grd-sts-s2 isc-bdg-col-c1" title="Edit" data-Created-By="' + (item["CreatedBy"] == null ? 0 : item["CreatedBy"]) + '" data-edit-Notes="' + (item["VendorNotesID"] == null ? '0' : item["VendorNotesID"]) + '" data-Notes="' + (item["Notes"] == null ? '-' : item["Notes"]) + '">Edit</a>';
                html += ' </div></div>';
            });
        }
        else {
            html += '<p style="text-align: center;">No data found</p>'
        }
        $el.html(html);
    }
   
    var BindDocumentsPanel = function () {
        var html = ''
        var $el = $('#div-Documents-Body');
        var vendorDocumentlist = GetVendorDocuments();
        var docList = vendorDocumentlist["VendorFiles"];

        if (docList != undefined && docList != null && docList.length > 0) {
            $.each(docList, function (index, item) {
                var stillUtc = moment.utc(item["CreatedOn"]).toDate();
                var local = moment(stillUtc).local().format('MMM DD, YYYY');
                html+='<div class="screen-row mar-top-10">';
                html += '<div class="div-col-4per" data-Open-File="' + (item["ModifiedFileName"] == null ? '' : item["ModifiedFileName"]) + '"><div class="isc-bill-doc-typ">';
                html+='<i class="fa fa-file" style="cursor:pointer"></i></div> </div>';
                html+='<div class="div-col-60per">';
                html += '<h5 class="isc-vnd-edt-acc" title="' + (item["FileName"] == null ? '' : item["FileName"]) + '">' + (item["FileName"] == null ? '' : item["FileName"]) + '</h5>';
                html += '<h6 class="isc-bill-vnd-doc-t1">Uploaded On <span>' + (local == "Invalid date" ? '' : local) + '</span></h6>';
                html+='<h6 class="isc-bill-vnd-doc-t1">Owned By</h6>';
                html+='<div class="isc-bill-vnd-pos">';
                html += '<div class="isc-bill-vnd-nam-bet"><span>J</span></div><h4 class="isc-bill-vnd-nam1">' + (item["Name"] == null ? '' : item["Name"]) + '</h4></div>';
                html += '</div>';
                html+='</div>';
              
            });
        }
        else {
            html += '<p style="text-align: center;">No data found</p>'
        }
        $el.html(html);
    }
}

//Data
{
    var GetVendorInfo = function () {
        var _obj = {
            'vendorID':parseInt(vendorID),
        };
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/GetVendorEditScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetVendorContacts = function () {
        var _obj = {
            'vendorID': parseInt(vendorID),
        };
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/GetVendorContacts", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetVendorNotes = function () {
        var _obj = {
            'vendorID': parseInt(vendorID),
        };
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/GetVendorNotes", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    
    var GetVendorDocuments = function () {
        var _obj = {
            'vendorID': parseInt(vendorID),
        };
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/GetVendorDocuments", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var SaveVendorContact = function () {
        var firstName = $('#contact-first-Name').val()
        var lastName = $('#contact-last-Name').val()
        var email = $('#contact-email').val()
        var phone = $('#contact-phone').val()
        var obj = {
            'FirstName': firstName,
            'LastName': lastName,
            'Email': email,
            'Phone': phone,
            'VendorID':vendorID
        }
        var insertObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/InsertVendorContact", insertObj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Contact created successfully!!", { position: "right top", className: "success" });
                BindContactPanel();
                $("#mp_add-contact").hide();
                ResetContactFields();
            }
            else {
                $.notify("Server error occured while creating a contact!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var UpdateVendorContact = function () {
        var firstName = $('#contact-first-Name').val()
        var lastName = $('#contact-last-Name').val()
        var email = $('#contact-email').val()
        var phone = $('#contact-phone').val()
        var obj = {
            'FirstName': firstName,
            'LastName': lastName,
            'Email': email,
            'Phone': phone,
            'VendorID': vendorID,
            'ContactID': editContact
        }
        var updateObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/UpdateVendorContact", updateObj)).done(function (response) {
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

    var DeleteContact = function (contactID) {
        var obj = {
            'VendorID': vendorID,
            'ContactID': contactID
        }
        var deleteObj = {
            'ContactObj': obj
        }
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/DeleteVendorContact", deleteObj)).done(function (response) {
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

    var SaveNotes = function () {
        if (isNotesUpdate == 0 && editNotesID == 0) {
            var obj = {
                'vendorID': vendorID,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("VendorEdit.aspx/InsertNotes", obj)).done(function (response) {
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
                'notesId':editNotesID,
                'vendorID': vendorID,
                'notes': $('#txt-Notes').val()
            }
            var tempList = {};
            $.when(RequestServer("VendorEdit.aspx/UpdateNotes", obj)).done(function (response) {
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

    var SaveDocument = function (lastModifiedBy, fileResponse) {
        var obj = {
            'FileName': (fileResponse.FileDisplayName == null ? '' : fileResponse.FileDisplayName),
            'FileModifiedName': (fileResponse.ModifiedFileName == null ? '' : fileResponse.ModifiedFileName),
            'LastModifiedBy': lastModifiedBy,
            'VendorID':vendorID
        }
        var insertObj = {
            'FileObject':obj
        }
        var tempList = {};
        $.when(RequestServer("VendorEdit.aspx/InsertVendorDocument", insertObj)).done(function (response) {
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
                url: "VendorDocument.ashx",
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
}

//Common
{
    var GetStatusColor = function (status)  {
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

        }
        return colorClass;

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

    var ValidateVendor = function () {
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
        if (phone == "" || phone == null || phone == '+')
        {
            isValid = false;
            $('#phone-Validation').show();

        }
        return isValid;
    }

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

    var ConvertUtcToLocal = function (data) {
        var stillUtc = moment.utc(data).toDate();
        var local = moment(stillUtc).local().format('MMM DD, YYYY');
        return (local != "Invalid date") ? local : "-";
    }
    var GetSplitList = function (billID) {
        var _obj = {
            'billID': billID
        }
        var tempList = {};
        $.when(RequestServer("Bills.aspx/GetSplitBillList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Show Bill Comments
{
    $(document).on('click', '[bill-Comments]', function () {
         billId = $(this).attr('bill-Comments');
        if (billId != null && billId != undefined && billId != '-' && billId != '') {
            billId = parseInt(billId);
            var BillComments = GetBillcomments(billId);
            BillComments = common.AUF(BillComments['Comments']);
            BindBillComments(BillComments);
            //var $modal = $('#Mp_Comments');
            //$modal.modal('show');
            var $modal = $('#mp_comts');
            $modal.modal('show');
        }
    });

    $(document).on('click', '#close-Comment', function () {
        var $modal = $('#Mp_Comments');
        $modal.modal('hide');
        var $el = $('#div-BillComments');
        $el.html('<p>No Comments Found</p>');
    });

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
        $('#btn-Send').prop('title', 'Send');
        var $el = $('#Commands_body');
        $('#txt-Command').val("");
        $("#btn-Send").html('Send');
        var html = '';
        var Iscount = 0;
        if (BillComments != null && BillComments != undefined && BillComments.length > 0 && BillComments != '') {
            var length = BillComments.length;
            $.each(BillComments, function (index, item) {

                if (item["Comment"] != '' && item["Comment"] != null) {
                    Iscount = 1;
                    html += '<div class="screen-row">'
                    html += '<div class="form-body" >'
                    html += '<div class="form-group">'
                    html += '<div class="screen-row">'
                    html += '<div class="isc-95per">'
                    html += '<div class="isc-single-discussion-content">'
                  
                    html += '<label  class="isc-dis-block isc-pad-left-10 isc-new-cmt mar-top-15">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</label>'
                    html += '<label class="smt-li-dataplan-inner-sub-title isc-f-13">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + '</label>'
                    html += '<span title="' + item["CreatedOn"] + '">On ' + (item["CreatedOn"] == null ? ' - ' : item["CreatedOn"]) + '</span>'
                    html += '<div class="cell-right">'
                    if (index === (length - 1)) {
                        if (item["UserID"] == item["CreatedBy"]) {
                            html += '<i title="Edit" style="cursor: pointer;" class=" fa fa-edit isc-set-pos" data-cmd-billid=' + item["BillID"] + ' data-cmd-billcmd=' + item["Comment"] + ' data-cmd-status=' + item["Status"] + ' data-cmd-rowid=' + item["RowID"] + '></i>'
                        }
                        lastcommand = item["Comment"];
                    }
                    html += '</div></div></div></div></div></div></div>'
                }
            });
        }
        if (Iscount > 0) {
            html += "";
        }
        else {
            html += '<p>No Data Found</p>';
        }





        //if (BillComments != null && BillComments != undefined && BillComments.length > 0) {
        //    $.each(BillComments, function (index, item) {
        //        html += '<div class="form-group">';
        //        html += '<div class="screen-row">';
        //        if (item["Status"] == "Approved") {
        //            html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:green">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
        //        }
        //        else {
        //            html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:red">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
        //        }

        //        html += '<p class="isc-bill-conf-del mar-top-10" title="' + (item["Comment"] == null ? '-' : item["Comment"]) + '">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
        //        html += '</div></div>';
        //    });
        //}
        //else {
        //    html += '<p>No Data Found</p>';
        //}
        $el.html(html);
    }
    $(document).on('click', '#btn-Send', function () {
        var ActionName = $('#btn-Send').text();
        Command = $('#txt-Command').val();

        if ($.trim(Command).length > 0) {
            if (ActionName != '') {
                SaveBillcommants(ActionName);
            }
        }

    });
    var SaveBillcommants = function (ActionName) {


        Command = $('#txt-Command').val();
        if (Command != '') {
            var _obj = {
                'Billid': billId,
                'Commant': Command,
                'Action': ActionName,
                'Status': Billstatus,
                'RowId': BillrowID
            }
            var tempList = {};
            $.when(RequestServer("Bills.aspx/SaveBillcommans", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    var ActionName = $('#btn-Send').text();
                    if ($('#btn-Send').text() == 'Send') {
                        $.notify("Comment saved successfully !!", { position: "right top", className: "success" });
                    }
                    else {
                        $.notify("Comment updated successfully !!", { position: "right top", className: "success" });
                    }

                    var $modal = $('#mp_comts');
                    $modal.modal('hide');
                }
            });
            return tempList;


        }




    }
    $(document).on('click', '[data-cmd-billid]', function () {
        $('#btn-Send').prop('title', 'Update');
        $("#btn-Send").html('Update');
        billID = $(this).attr('data-cmd-billid')
        Command = lastcommand;
        Billstatus = $(this).attr('data-cmd-status');
        BillrowID = $(this).attr('data-cmd-rowid');
        $('#txt-Command').val(lastcommand);
    });

    //var BindBillComments = function (BillComments) {
    //    var $el = $('#div-BillComments');
    //    var html = '';
    //    if (BillComments != null && BillComments != undefined && BillComments.length > 0) {
    //        $.each(BillComments, function (index, item) {
    //            html += '<div class="form-group">';
    //            html += '<div class="screen-row">';
    //            if (item["Status"] == "Approved") {
    //                html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:green">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
    //            }
    //            else {
    //                html += '<h4 class="modal-title">' + (item["CommentedBy"] == null ? '-' : item["CommentedBy"]) + ' <span style="color:red">(' + (item["Status"] == null ? '-' : item["Status"]) + ')</span></h4>';
    //            }

    //            html += '<p class="isc-bill-conf-del mar-top-10" title="' + (item["Comment"] == null ? '-' : item["Comment"]) + '">' + (item["Comment"] == null ? '-' : item["Comment"]) + '</p>';
    //            html += '</div></div>';
    //        });
    //    }
    //    else {
    //        html += '<p>No Data Found</p>';
    //    }
    //    $el.html(html);
    //}


}

//Show Payment Bill Comments
{
    $(document).on('click', '[approved-bill-Comments]', function () {
         billId = $(this).attr('approved-bill-Comments');
        var billApprovedID = $(this).attr('bill-ApproveId');
        if (billId != null && billId != undefined && billId != '-' && billId != '') {
            billId = parseInt(billId);
            //var BillComments = GetPamentsBillcomments(billId, parseInt(billApprovedID));
            var BillComments = GetBillcomments(billId);
            BillComments = common.AUF(BillComments['Comments']);
            BindBillComments(BillComments);

            var $modal = $('#mp_comts');
            $modal.modal('show');
            //var $modal = $('#Mp_Comments');
            //$modal.modal('show');
        }
    });
    $(".close-amount").click(function () {
        $(".split-amount").removeClass("split-amount-show");

    });
    $(".close-settings").click(function () {
        $(".settings").removeClass("settings-show");
    });
    $(document).on('click', '[data-bill-Split]', function () {
        SplitBillId = $(this).attr('data-bill-Split');
        var Spitlst = GetSplitList(SplitBillId);
        Splitlist(Spitlst);

    });
    var Splitlist = function (billList) {
        $('#tbl-Split-list').find('tbody').empty();
        var lstLead = common.AUF(billList["SplitBill"]);
        $.each(lstLead, function (index, item) {
            var amount = (item["Amount"] == null ? 0.00 : parseFloat(item["Amount"]));
            var row = '<tr><td> ' + (item["AccountName"] == null ? '-' : item["AccountName"]) + ' </td> <td> ' + item["Description"] + ' </td> <td style="text-align: center;">' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</td></tr>'
            $("#tbl-Split-list tbody").append(row);
        });
        $(".split-amount").toggleClass("split-amount-show");
        $(".split-amount").parents(".slider").find(".settings-show").removeClass("settings-show");
    }

    var GetPamentsBillcomments = function (billId, approvedID) {
        var _obj = {
            'BillId': billId,
            'ApprovedId': approvedID
        };
        var tempList = {};
        $.when(RequestServer("Bill_FinancerHome.aspx/GetBillCommentsData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    


}
