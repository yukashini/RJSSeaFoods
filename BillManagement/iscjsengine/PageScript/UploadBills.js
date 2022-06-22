/// <reference path="D:\Data\Project\ISC\Projects\BillManagement\BillManagement\ApprovalDetails.aspx" />
//GLOBAL VARIABLES
{
    var filtersDataList = [];
    var amountSplit = false;
    var actualAmount = 0;
    var draftBills = [];
    var billEdit = false;
    var editBillId = 0;
    var BillId = 0;
    var deletedBreakages = [];
    var fileContainer = [];
    var fileResponse = [];
    var fileSize = 0;
    var viewingBillId = 0;
    var DeleteBillId = 0;
    var breakagesShowing = 0;
    var selectedAccountTypes = [];
}

//LOAD && EVENTS
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            //SetSession('selectedMenu', 1)
            //SetActiveMenu();
        filtersDataList = GetFilterListdata();
        BindMasterData();
        RegisterFileDrop();
        editBillId = ((GetQueryStrings()["BillID"] == undefined || GetQueryStrings()["BillID"] == null) ? 0 : GetQueryStrings()["BillID"]);
        if (editBillId != 0) {
            billEdit = true;
            $('#save-draft').hide();
            $('#draft_Block').hide();
            $('#cancel-edit').show();
            $('#cancel-div').hide();
            BindEditDetails();
        }
        if (window.innerWidth < 700) {
            $('#browseBill').attr('accept', 'image/*');
            $('#browseBill').attr('capture', 'camera');
        }
        $loading.hide();
        }, 0);
    });

    $(window).resize(function () {
        if (window.innerWidth < 700) {
            $('#browseBill').attr('accept', 'image/*');
            $('#browseBill').attr('capture', 'camera');
        }
        else {
            $('#browseBill').attr('accept', 'image/jpeg,image/png,pdf');
            $('#browseBill').attr('capture', '');
        }
    });

    $(document).on('click', '[data-bill-entry]', function () {
        var insertType = $(this).attr('data-bill-entry');
        $loading.show();
        setTimeout(function () {
        if (BillValidation()) {

        if (billEdit) {
            EditBill(insertType);
        }
        else {
            if (insertType != 0) {
                BillInsert(insertType);
            }
        }
        }
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[add-row]', function () {
        
        if ($('#chk-box-split').is(':checked')) {

            var actualAmount = $('#txt-Amount').val();
            var thisRowAmount = $(this).parents('tr').find('[data-amount]').val();
         var thisRowFloatAmount = thisRowAmount.replace(/,/g, '');
         thisRowFloatAmount = parseFloat(thisRowFloatAmount);
            var objSelectedAccount = {
                'KeyListID':parseInt($(this).parents('tr').find('[data-account]').val())
            }
            selectedAccountTypes.push(objSelectedAccount);
           // selectedAccountType = parseInt($(this).parents('tr').find('[data-account]').val());
            //if (thisRowAmount!=""){
            actualAmount = actualAmount.replace(/,/g, '')
            var enteredAmount = 0;
            var amountList = $('#tbl-split-body tr');
            if (thisRowAmount != '' && thisRowFloatAmount != 0) {
                 if (amountList.length > 0) {
                     $.each(amountList, function (index, item) {
                         var amoutItem = $(item).find('[data-amount]').val();
                         amoutItem = amoutItem.replace(/,/g, '')
                         enteredAmount = enteredAmount + parseFloat(amoutItem);

                     });
                 }

                 if (parseFloat(actualAmount) == enteredAmount) {
                     var $lastRow = $("#tbl-split-body tr:not('.empty-row'):last");
                     $lastRow.find('.select2-select').select2('destroy');
                     $lastRow.find(':text').prop('disabled', true);
                     $lastRow.find('[data-amount]').prop('disabled', true);
                     $lastRow.find('[data-account]').prop('disabled', true);
                     $lastRow.find('.select2-select').select2();
                     $lastRow.find('[data-delete]').show();
                     $lastRow.attr('row-edited', true);
                     $('.select2-select').select2();
                     $(this).hide();
                 }

                 else if (parseFloat(actualAmount) > enteredAmount) {
                     var $lastRow = $("#tbl-split-body tr:not('.empty-row'):last");
                     var lastRowSelectedAccountType = $lastRow.find('[data-account]').val();
                     $lastRow.find('.select2-select').select2('destroy');
                     var $newRow = $lastRow.clone();
                     $newRow.find(":text").val("");
                     $newRow.find('[data-amount]').val("");
                     $newRow.find('[data-delete]').hide();
                     $newRow.find('[data-new-bill]').attr('data-new-bill', 1);
                     $newRow.find('[last-row]').attr('last-row', true);
                     $newRow.find(':text').prop('disabled', false);
                     $newRow.find('[data-amount]').prop('disabled', false);
                     //   $newRow.find('[data-account]').val(50021);
                     if (selectedAccountTypes.length > 0) {
                         $.each(selectedAccountTypes, function (a, b) {
                             $newRow.find('[data-account] option[value=' + b['KeyListID'] + ']').remove();
                         });
                     }
                     if ($newRow.find('[data-account] > option').length >= 1)
                     {
                         $newRow.attr('row-edited', false);
                         $lastRow.find('[last-row]').attr('last-row', false);
                         $lastRow.attr('row-edited', true);
                         $lastRow.find('[add-row]').hide();
                         $lastRow.find('[data-delete]').show();
                         $lastRow.find(':text').prop('disabled', true);
                         $lastRow.find('[data-amount]').prop('disabled', true);
                         $lastRow.find('[data-account]').val(lastRowSelectedAccountType);
                         $lastRow.find('[data-account]').prop('disabled', true);
                         $lastRow.after($newRow);
                         $lastRow.find('.select2-select').select2(); // Re-instrument original row
                         $newRow.find('.select2-select').select2(); // Instrument clone
                         $('.select2-select').select2();
                     }
                     else {
                         $lastRow.find('.select2-select').select2();
                         $('.select2-select').select2();
                         $.notify("No more account type to split the amount", { position: "right top", className: "error" });
                     }
                     }
                    

                 else {
                     $.notify("Amount should not be greater than actual amount ", { position: "right top", className: "error" });
                 }
             }
             else {
                 $.notify("Amount should not be empty and zero", { position: "right top", className: "error" });
             }
       

        }
              
    });

    $(document).on('change', '#chk-box-split', function () {
        var amount = $('#txt-Amount').val();
        if ($('#chk-box-split').is(':checked') && amount != "" && actualAmount != 0)
        {
            $.notify("After splitting the amount, you are not able to change the actual amount", {
                position: "right top", className: "success"
            });
            amountSplit = true;
            $("#txt-Amount").attr("disabled", "disabled");
            $('#bill-breakage-block').show();
            $('#account-details').attr('data-attribute', 2);
            BindSplitRows();
            $('#breakage-box').show();
            $('#account-details i').removeClass('fa fa-angle-down');
            $('#account-details i').addClass('fa fa-angle-right');
            $('.select2').select2();
           
        }
        else {
            amountSplit = false;
           
            if (editBillId != 0) {
                AddDeletedBreakages();
            }
            $('#account-details').attr('data-attribute', 1);
            $('#bill-breakage-block').hide();
            $('#breakage-box').hide();
            $('#account-details i').removeClass('fa fa-angle-right');
            $('#account-details i').addClass('fa fa-angle-down');
            $("#txt-Amount").removeAttr("disabled");
            selectedAccountTypes = [];
            
        }
    });

    $(document).on('click', '[data-delete]', function () {
        var lastRow = $(this).attr('last-row');
        var editBreakage = $(this).attr('saved-breakage');
        var lastEditBreakage = $(this).attr('last-edit-row');
        var breakageId = $(this).parents('tr').attr('breakage-id');;
        var deletedAccountType = parseInt($(this).parents('tr').find('[data-account]').val());
        selectedAccountTypes = GetunmatchedRecord(selectedAccountTypes, 'KeyListID', deletedAccountType);
        var AccountTypes = GetmatchedRecord($.parseJSON(filtersDataList[2]["Table2"]), 'KeyListID', deletedAccountType);
        if (breakageId != undefined) {
            var obj = {
                'BillBreakageID': parseInt(breakageId)
            }
            deletedBreakages.push(obj);
            $(this).parents('tr').remove();
        }
        else {
            $(this).parents('tr').remove();
        }
        var enteredAmount = 0;
        var amountList = $('#tbl-split-body tr');
        var nonEditedRows = $('#tbl-split-body tr[row-edited="false"]');
        if (amountList.length > 0) {
            $.each(amountList, function (index, item) {
                var amoutItem = $(item).find('[data-amount]').val();
                amoutItem = amoutItem.replace(/,/g, '')
                enteredAmount = enteredAmount + parseFloat(amoutItem);
            });
            GetAccountHTML(AccountTypes);
            if (enteredAmount != actualAmount && lastRow == "true" && nonEditedRows.length == 0)
            {
                var $lastRow = $("#tbl-split-body tr:not('.empty-row'):last");
                $lastRow.find('.select2-select').select2('destroy');
                var $newRow = $lastRow.clone();
                $newRow.find(":text").val("");
                $newRow.find("[data-amount]").val("");
                $newRow.find('[data-delete]').hide();
                $newRow.find('[add-row]').show();
                $newRow.find('[data-new-bill]').attr('data-new-bill', 1);
                $newRow.find('[last-row]').attr('last-row', true);
                $newRow.find(':text').prop('disabled', false);
                $newRow.attr('row-edited', false);
                $newRow.find('[data-amount]').prop('disabled', false);
                $newRow.find('[data-account]').val(50021);
               // $newRow.find('[data-account] option[value=' + parseInt($newRow.find('[data-account]').val()) + ']').remove();
                $newRow.find('[data-account]').html(GetAccountHTML(AccountTypes));
                $newRow.find('[data-account]').prop('disabled', false);
               // $newRow.find('[data-amount]').maskMoney();
                $lastRow.find('[last-row]').attr('last-row', false);
                $lastRow.attr('row-edited', true);
                $newRow.find(':text').prop('disabled', false);
                $newRow.find('[data-account]').prop('disabled', false);
                $lastRow.after($newRow);
                $lastRow.find('.select2-select').select2(); // Re-instrument original row
                $newRow.find('.select2-select').select2(); // Instrument clone
                $('.select2-select').select2();
            }
            else if (enteredAmount != actualAmount && editBreakage == "true" && lastEditBreakage == "true" && nonEditedRows.length == 0)
            {
                var $lastRow = $("#tbl-split-body tr:not('.empty-row'):last");
                $lastRow.find('.select2-select').select2('destroy');
                var $newRow = $lastRow.clone();
                $newRow.find(":text").val("");
                  $newRow.find("[data-amount]").val("");
                $newRow.find('[data-delete]').hide();
                $newRow.find('[add-row]').show();
                $newRow.find('[data-new-bill]').attr('data-new-bill', 1);
                $newRow.find('[last-edit-row]').attr('last-edit-row', true);
                $newRow.find(':text').prop('disabled', false);
                $newRow.find('[data-amount]').prop('disabled', false);
                // $newRow.find('[data-amount]').maskMoney();
                 $newRow.attr('row-edited', false);
                $newRow.find('[data-account]').prop('disabled', false);
                $newRow.find('[data-account]').val(50021);
             //   $newRow.find('[data-account] option[value=' + parseInt($newRow.find('[data-account]').val()) + ']').remove();
                $newRow.find('[data-account]').html(GetAccountHTML(AccountTypes));
                $lastRow.find('[last-edit-row]').attr('last-edit-row', false);
                $lastRow.attr('row-edited', true);
                $lastRow.after($newRow);
                $lastRow.find('.select2-select').select2(); // Re-instrument original row
                $newRow.find('.select2-select').select2(); // Instrument clone
                $('.select2-select').select2();
            }
            else if (enteredAmount != actualAmount && nonEditedRows.length == 0 && lastRow == "false")
            {
                var $lastRow = $("#tbl-split-body tr:not('.empty-row'):last");
                $lastRow.find('.select2-select').select2('destroy');
                var $newRow = $lastRow.clone();
                $newRow.find(":text").val("");
                $newRow.find("[data-amount]").val("");
                $newRow.find('[data-delete]').hide();
                $newRow.find('[add-row]').show();
                $newRow.find('[data-new-bill]').attr('data-new-bill', 1);
                $newRow.find('[last-edit-row]').attr('last-edit-row', true);
                $newRow.find(':text').prop('disabled', false);
                $newRow.find('[data-amount]').prop('disabled', false);
               // $newRow.find('[data-amount]').maskMoney();
                $newRow.attr('row-edited', false);
                $newRow.find('[data-account]').prop('disabled', false);
                $newRow.find('[data-account]').val(50021);
               // $newRow.find('[data-account] option[value=' + parseInt($newRow.find('[data-account]').val()) + ']').remove();
                $newRow.find('[data-account]').html(GetAccountHTML(AccountTypes));
                $lastRow.find('[last-edit-row]').attr('last-edit-row', false);
                $lastRow.attr('row-edited', true);
                $lastRow.after($newRow);
                $lastRow.find('.select2-select').select2(); // Re-instrument original row
                $newRow.find('.select2-select').select2(); // Instrument clone
                $('.select2-select').select2();
            }

        }
        else {
            BindSplitRows();
            $('.select2').select2();
        }
    });

    $(document).on('click', '[data-Edit-BillId]', function () {
        if (editBillId == 0) {
            var billID = $(this).attr('data-Edit-BillId');
            billID = parseInt(billID);
            editBillId = billID;
            billEdit = true;

            $('#mp_bill_edit').show();
        }
        else {
            $.notify("Complete or Cancel the currently editing Bill !!", { position: "right top", className: "error" });
        }
        //if (billID != undefined)
        //{
        //    billEdit = true;
        //    billID = parseInt(billID);
        //    editBillId = billID;
        //    var billDetails = GetEditBillDetails(billID);
        //    billDetails = $.parseJSON(billDetails[0]["Table"]);
        //    if (billDetails.length > 0) {
               
        //        var distinctBill = GetDistinctArray(billDetails, 'BillID');
        //        actualAmount = distinctBill[0]["Amount"];
        //        $('#txt-Vendor-Name').val(distinctBill[0]["VendorName"]);
        //        $('#txt-Invoice-Number').val(distinctBill[0]["InvoiceNumber"]);
        //        $('#txt-Bill-Description').val(distinctBill[0]["Description"]);
        //        $('#txt-Amount').val(distinctBill[0]["Amount"]);
        //        $('#inVoiceDate').val(moment(distinctBill[0]["BillDate"]).format('MM/DD/YYYY'));
        //        $('#due-Date').val(moment(distinctBill[0]["DueDate"]).format('MM/DD/YYYY'));
        //        $('#slt-PaymentTerms').val(distinctBill[0]["PaymentTerms"]);
        //        $('#slt-BillCategory').val(distinctBill[0]["Category"]);
        //        $('#txt-Notes').val(distinctBill[0]["Notes"]);
                
        //        if (distinctBill[0]["IsSplitted"] == 50013) {
        //            $("#chk-box-split").prop("checked", true);
        //            $('#bill-breakage-block').show();
        //            BindEditingBreakages(billDetails);
        //        }
        //        else {
        //            $("#chk-box-split").prop("checked", false);
        //        }
        //    }
        //}
    });

    $(document).on('click', '#cancel-bill', function () {
        if (editBillId != 0) {
            $('#tbl-draft-bills-body').append(BindDraft(editBillId));
            ClearFields();
        }
        else {
            history.back(1);
            ClearFields();
        }
       
    });

    $(document).on('click', '[data-delete-BillId]', function () {
        DeleteBillId = $(this).attr('data-delete-BillId');

        if (DeleteBillId != undefined) {
            $('#mp_bill_Delete').show();
            //draftBills = GetPendingSubmissionBills();
            //draftBills = $.parseJSON(draftBills[0]["Table"]);
            //BindPendingSubmissionBills();
           
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
        DeleteBillId = parseInt(DeleteBillId);
        DeletePendingSubmissionBill(DeleteBillId);
        $('#tbl-draft-bills-body  [data-delete-BillId="' + DeleteBillId + '"]').parents('tr').remove();
        $('#mp_bill_Delete').hide();
        $loading.hide();
        }, 0);
       
    });

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
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
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
           // var lstResult = matchedPendingSubmissionList

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    draftBills = ObjSorter(draftBills, columngroupby, '123');
                else
                    draftBills = ObjSorter(draftBills, columngroupby, '321');
            }
            else if (columType == 'date') {
                if (currentSortOrder === "asc")
                    draftBills = ObjSorterByDate(draftBills, columngroupby, '123');
                else
                    draftBills = ObjSorterByDate(draftBills, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    draftBills = ObjSorterByNumber(draftBills, columngroupby, '123');
                else
                    draftBills = ObjSorterByNumber(draftBills, columngroupby, '321');
            }


            // Render List
            {
                BindPendingSubmissionBills();

            }
            //    $loading.hide();
            //}, 0);
        }
    });

    $(document).on('click', '[hide-pop-up]', function () {
        $('#mp_bill_edit').hide();

    });

    $(document).on('click', '#btn-edit-ok', function () {
        $loading.show();
        setTimeout(function () {
        BindEditDetails();
        $('#mp_bill_edit').hide();
        $loading.hide();
        }, 0);
    });
 
    $(document).on('change', '#browseBill', function () {
        var Files = $(this).prop("files");
        $loading.show();
        setTimeout(function () {
                fileContainer = [];
              
                var type = Files[0]["type"];
                const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
                if (size > 10)
                {
                    $(this).val('');
                    $.notify("File Size should not  greater than 10 MB,Select another file  ", { position: "right top", className: "error" });
                }
                else if ($.inArray(type, ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']) == -1) {
                    $(this).val('');
                    $.notify("File extention is not allowed,Select another file  ", { position: "right top", className: "error" });
                }
                else {
                    fileContainer.push(Files[0])
                    fileSize = size;
                  
                    saveFiles();
                    var billFile = fileResponse["ModifiedFileName"];
                    BillFrames(billFile);
                    if (type == 'application/pdf') {
                        $('#pdf-icon').show();
                        $('#img-icon').hide();
                    }
                    else {
                        $('#pdf-icon').hide();
                        $('#img-icon').show();
                    }
                    BindAttachmentResponse();
                    $('#billFileName').text(Files[0]["name"]);
                    $('#billFileName').prop('title', Files[0]["name"]);
                    $('#btn-clear-file').show();

                }  
                $loading.hide();
        }, 0);
    });
  
    $(document).on('click', '[data-attachment-BillId]', function () {
        var attachmentBillId = $(this).attr('data-attachment-BillId');
        if (attachmentBillId != undefined) {
            attachmentBillId = parseInt(attachmentBillId);
            var attatchmentDetails = GetBillAttachment(attachmentBillId);
            attatchmentDetails = $.parseJSON(attatchmentDetails[0]['Table']);
            if (attatchmentDetails[0]["FileName"] != null && attatchmentDetails[0]["FileName"] != "") {
                $('#fileName').text(attatchmentDetails[0]["FileDisplayName"] == null ? '-' : attatchmentDetails[0]["FileDisplayName"]);
                $('#fileName').prop('title', attatchmentDetails[0]["FileDisplayName"] == null ? '-' : attatchmentDetails[0]["FileDisplayName"]);
                BillFrameAttatchment(attatchmentDetails[0]["FileName"]);
                $('#mp_bill_attach').show();
            }
            else {
                $.notify("There is no attachment for this bill", { position: "right top", className: "error" });
            }
          
        }
    });

    $(document).on('click', '#attachment-close', function () {

        $('#mp_bill_attach').hide();
    });

    $(document).on('click', '#cancel-edit', function () {
        history.back(1);
    });

    $(document).on('click', '#btn-clear-file', function () {
        fileContainer = [];
        fileResponse = [];
        $('#file_Viewer').html('');
        $('#billFileName').text('');
        $('#file_Viewer').html('<h5 class="isc-sec-in-con-y-scroll-bdy-con-h5" style="padding-left:134px; padding-top:246px;" id="no_bill_Message">No Bill Attached</h5>');
        $('#pdf-icon').hide();
        $('#img-icon').hide();
        ClearBrowsedFields();
        $(this).hide();

    });

    $(document).on('click', '[edit-cancel]', function () {
        editBillId = 0;
        DeleteBillId = 0;
        $('#mp_bill_edit').hide();
        $('#mp_bill_Delete').hide();
    });

    $(document).on('click', '#account-details', function () {
        if (breakagesShowing == 0) {
            breakagesShowing = $(this).attr('data-attribute');
            breakagesShowing = parseInt(breakagesShowing);
        }
        
        if (breakagesShowing == 1) {
            $(this).attr('data-attribute', 2);
            breakagesShowing = 2;
            $('#breakage-box').show();
            $('#account-details i').removeClass('fa fa-angle-down');
            $('#account-details i').addClass('fa fa-angle-right');
        }
        else
        {
            $(this).attr('data-attribute', 1);
            breakagesShowing = 1;
            $('#breakage-box').hide();
            $('#account-details i').removeClass('fa fa-angle-right');
            $('#account-details i').addClass('fa fa-angle-down');
        }


    });

    $(document).on('change', '#slt-PaymentTerms', function () {
        var paymentTermVal = parseInt($(this).val());
        var dateNumber = GetDateNumber(paymentTermVal);
        if ($('#inVoiceDate').val() != '')
        {
            var dueDate = moment($('#inVoiceDate').val()).add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#due-Date').datepicker('setDate', dueDate);
        }
        else {
            var dueDate = moment().add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#due-Date').datepicker('setDate', dueDate);
        }

    });

    $(document).on('change', '#slt-Customer', function () {
        var selectedCustomer = parseInt($(this).val());
        var matchedProjects = GetmatchedRecord($.parseJSON(filtersDataList[4]["Table4"]), 'Customer', selectedCustomer);
        BindDropDowns($('#slt-Project'), matchedProjects, 'Choose Project', 0);
        $('#slt-Project').select2();

    });
}

//DOM MANIPULATION
{
   
    var BindMasterData = function () {
        var paymentTermsFilterList = $.parseJSON(filtersDataList[0]["Table"]);
        var billCategory = $.parseJSON(filtersDataList[1]["Table1"]);
        BindDropDowns($('#slt-PaymentTerms'), $.parseJSON(filtersDataList[0]["Table"]), '', 50012);
        BindDropDowns($('#slt-BillCategory'), $.parseJSON(filtersDataList[1]["Table1"]), 'Choose Bill Category', 0);
        BindDropDowns($('#slt-Customer'), $.parseJSON(filtersDataList[3]["Table3"]), 'Choose Customer', 0);
        BindDropDowns($('#slt-Project'), $.parseJSON(filtersDataList[4]["Table4"]), 'Choose Project', 0);
        var dueDate = moment().add(0, 'day').format('MM/DD/YYYY');
        $('#due-Date').datepicker('setDate', dueDate);
        $('.select2').select2();
       $('#inVoiceDate').mask('00/00/0000');
       $('#due-Date').mask('00/00/0000')
       $('#tbl-draft-bills-body').html('<p data-empty="0">No Data Found</p>')

        $('#inVoiceDate').datepicker({
           autoclose: true,
           format: 'mm/dd/yyyy',
           daysOfWeekDisabled: "6,0",
           language: "en"
       }).on('changeDate', function (e) {
           var $this = $(this);
           var selectedDate = $this.val();
           var paymentTerm = parseInt($('#slt-PaymentTerms').val());
           var dateNumber = GetDateNumber(paymentTerm);
           var dueDate = moment(selectedDate).add(dateNumber, 'day').format('MM/DD/YYYY');
           $('#due-Date').datepicker('setDate', dueDate);

       });
    }

    var BindSplitRows=function()
    {
        var html = "";
        var $el = $('#tbl-split-body');
        html += ' <tr row-edited="false">';
        html+='<td>';
        html+='<div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-sel-box">';
        html += '<select class=" select2 select2-select" tabindex="-1" aria-hidden="true" data-account="true">';
        html += BindAccountType($('[data-account]'), $.parseJSON(filtersDataList[2]["Table2"]), '');
        html+='</select>';
        html+='</div>';
        html+='</td>';
        html+='<td>';
        html+='<input type="text" class="form-control " data-description="0" placeholder="Enter Description">';
        html+='</td>';
        html+='<td class="">';
        html += '<input type="text" class="form-control " data-type="currency"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  placeholder="Enter Amount"  data-new-bill="1" data-amount="0"  style="text-align:right;">';
        html+='</td>';
        html += '<td class="text-center">';
        html += '<i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst" title="Add" add-row="true"></i>';
        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete"  style="display:none;" last-row="false" data-delete="0"><i class="fa fa-trash-o"></i></a>';
        html+='</td>';
        html += '</tr>';
        $('select2').select2();
        $el.html(html);
      // $('[data-amount]').maskMoney();
    }

    var BindAccountType = function () {
        BindDropDowns($('[data-account]'), $.parseJSON(filtersDataList[2]["Table2"]), '');
    }

    var BindPendingSubmissionBills = function () {
        var html = '';
        var $el = $('#tbl-draft-bills-body');
        if (draftBills.length > 0) {
            $.each(draftBills, function (index, item) {
                var today = moment();
                var dueDay = moment(item["DueDate"]);
                var dollerAmount = 0;
              //  var dollorValue = Masking("Money",item["Amount"]);
                html+='<tr>';
                html+='<td style="width: 20%;">';
                html += '<h5 title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '';
                html+='</h5>';
                html += '</td>';
                
                html+='<td style="width: 15%;">';
                html += '<h5>'+(item["BillID"] == null ? "-" : item["BillID"]) + "/" + (item["InvoiceNumber"] == null ? "-" : item["InvoiceNumber"])+'</h5>';
                html+='</td>';
                html += '<td style="width: 20%;" title="' + (item["Description"] == null ? '-' : item["Description"]) + '">';
                html+='<h5>'+ (item["Description"] == null ? '-' : item["Description"]) +'';
                html+='</h5>';
                html+='</td>';
                html += '<td style="width: 10%;" class="isc-bill-amt-pad">';
               // html += '<td class="text-right">' +(item["Amount"] == null ? '-' : '$ ' + parseFloat(item["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) +'</td>';
                html += '<h5 style="text-align: right;" title="' + (item["Amount"] == null ? '-' :parseFloat(item["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (item["Amount"] == null ? '-' : parseFloat(item["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '';
                html+='</h5>';
                html+='</td>';
                html += '<td style="width: 20%;">';
                if (today > dueDay) {
                    html += '<h5 style="color:red !important;">' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '	';
                }
                else {
                    html += '<h5 >' + (item["DueDate"] == null ? '-' : moment(item["DueDate"])).format('MM/DD/YYYY') + '';
                }
                html+='</h5>';
                html+='</td>';
                html+='<td style="width: 15%;">  ';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5"  data-Edit-BillId=' + item["BillID"] + ' title="Edit" ><i class="fa fa-pencil-square-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-delete-BillId=' + item["BillID"] + ' title="Delete" ><i class="fa fa-trash-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5"  title="Attachment" ><i class="fa fa-paperclip"></i></a>';
                html+='</td>';
                html += '</tr>';

            });
        }
        else {
            html+='<p>No Data Found</p>'
        }
        $el.html(html);
    }

    var BindEditingBreakages = function (breakagesList) {
        var html = "";
        var $el = $('#tbl-split-body');
        if (breakagesList.length > 0) {
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50006')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50004')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50005')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50007')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50008')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '0')
            var distinctBreakages = GetDistinctArray(breakagesList, 'BillBreakageID');
            var indexValue = distinctBreakages.length - 1;
            if (distinctBreakages.length > 0) {
                $.each(distinctBreakages, function (index, item) {
                    var lastEditedRow=false;
                    var obj = {};
                    obj = {
                        'KeyListID':parseInt(item["BreakageType"])
                    }
                    selectedAccountTypes.push(obj);
                    if (indexValue == index) {
                        lastEditedRow = true;
                    }
                    var amount = item["BreakageAmount"];
                    amount = parseFloat(amount);
                    html += ' <tr row-edited="true"  breakage-id=' + item["BillBreakageID"] + ' >';
                    html += '<td>';
                    html += '<div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-sel-box">';
                    html += '<select disabled class=" select2 select2-select" tabindex="-1" aria-hidden="true" data-account="true">';
                    html += BindAccountType($('[data-account]'), $.parseJSON(filtersDataList[2]["Table2"]), '', item["BreakageType"]);
                    html += '</select>';
                    html += '</div>';
                    html += '</td>';
                    html += '<td>';
                    html += '<input disabled type="text" class="form-control " data-description="0" value="' + item["BreakageDescription"] + '" placeholder="Enter Description">';
                    html += '</td>';
                    html += '<td class="">';
                    html += '<input type="text" disabled class="form-control " data-type="currency"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" placeholder="Enter Amount" data-new-bill="0"  value="' + (amount == null ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '" data-amount="0" style="text-align:right;">';
                    html += '</td>';
                    html += '<td class="text-center">';
                    html += '<i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst" style="display:none;" title="Add"  add-row="true"></i>';
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" last-edit-row=' + lastEditedRow + ' saved-breakage="true" data-delete="0"><i class="fa fa-trash-o"></i></a>';
                    html += '</td>';
                    html += '</tr>';
                });

            }
            
            $el.html(html);
            $('.select2').select2();
        }
    }

    var EditBill = function (insertType) {
        if (editBillId != 0) {
            var vendorName = $('#txt-Vendor-Name').val();
            var invoiceNumber = $('#txt-Invoice-Number').val();
            var billDescription = $('#txt-Bill-Description').val();
            var amount = $('#txt-Amount').val();
            amount = amount.replace(/,/g, '');
            amount = parseFloat(amount);
            var invoiceDate = $('#inVoiceDate').val();
            var dueDate = $('#due-Date').val();
            var paymentTerms = $('#slt-PaymentTerms').val();
            var billCategory = $('#slt-BillCategory').val();
            var notes = $('#txt-Notes').val();
            var purchaseOreder = $('#txt-purchase').val();
            // var splitedRows = $('#tbl-split-body tr edited="true"');
            var isSplited = 50014;
            var defaultSplitedAccount = $('#tbl-split-body tr').attr('accountID');
            var status = 50019;
            var objSplitedlist = [];

            //deleted Items
            if (deletedBreakages.length > 0) {
                $.each(deletedBreakages, function (index, item) {
                    var objdeletedBreakage = {
                        'BillBreakageID': item['BillBreakageID'],
                        'BillID': editBillId,
                        'Amount': 0,
                        'Description': 0,
                        'BillType': 0,
                        'Status': 0,
                        'ActionKey': 2
                    }
                    objSplitedlist.push(objdeletedBreakage);
                });
              
            }

            if ($('#chk-box-split').is(':checked')) {

                //Load the splited amount details in object
                var amountList = $('#tbl-split-body tr');
                if (amountList.length > 0) {
                    isSplited = 50013
                    $.each(amountList, function (index, item) {
                        var accountType = parseInt($(item).find('[data-account]').val());
                        var amoutItem =$(item).find('[data-amount]').val();
                        amoutItem = amoutItem.replace(/,/g, '');
                        amoutItem = parseFloat(amoutItem);
                        var description = $(item).find('[data-description]').val();
                        var breakageID = $(item).attr('breakage-id');
                        var newRow = $(item).find('[data-new-bill]').attr('data-new-bill');
                        newRow = parseInt(newRow);
                        if (newRow == 1)
                        {
                            var objBreakage = {
                                'BillBreakageID': 0,
                                'BillID': editBillId,
                                'Amount': amoutItem,
                                'Description': description,
                                'BillType': accountType,
                                'Status': status,
                                'ActionKey': 3
                            }
                        }
                        else {
                            var objBreakage = {
                                'BillBreakageID': parseInt(breakageID),
                                'BillID': editBillId,
                                'Amount': amoutItem,
                                'Description': description,
                                'BillType': accountType,
                                'Status': status,
                                'ActionKey': 1
                            }
                        }

                      
                        objSplitedlist.push(objBreakage);
                    });
                }
            }
            else {
                isSplited = 50014;
            }

            var obj = {
                'BillID':editBillId,
                'VendorName': vendorName,
                'BillDate': invoiceDate,
                'Amount': amount,
                'InvoiceNumber': invoiceNumber,
                'DueDate': dueDate,
                'Category': billCategory,
                'Notes': notes,
                'PaymentTerms': paymentTerms,
                'Description': billDescription,
                'IsSplitted': isSplited,
                'Status': status,
                'lstBillBreakage': objSplitedlist,
                'PhysicalLocation': fileResponse["PhysicalLocation"] == null ? '' : fileResponse["PhysicalLocation"],
                'FileDisplayName': fileResponse["FileDisplayName"] == null ? '' : fileResponse["FileDisplayName"],
                'FileName': fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"],
                'FileSize': 0,
                'Balance': amount,
                'PurchaseOrder': purchaseOreder,
                'Project': 0,
                'Customer': 0,
                //'Project': parseInt($('#slt-Project').val()),
                //'Customer': parseInt($('#slt-Customer').val()),
            }

            var objlist = [];

            objlist.push(obj);

            var _obj = {
                'CustomBill': objlist
            }

            EditBulkBill(_obj);
            
            //billEdit = false;
            //editBillId = 0;
            deletedBreakages = [];
            if (parseInt(insertType) == 2) {
                window.location.replace("UserHome.aspx");
            }
            else {
                $('#tbl-draft-bills-body').append(BindDraft(editBillId));
                ClearFields();
                //draftBills = GetPendingSubmissionBills();
                //draftBills = $.parseJSON(draftBills[0]["Table"]);
                //BindPendingSubmissionBills();
            }


        }
    }

    var BindEditDetails = function () {
        
        if (editBillId != undefined) {
            var billDetails = GetEditBillDetails(editBillId);
            billDetails = $.parseJSON(billDetails[0]["Table"]);
            if (billDetails.length > 0) {
                
                var distinctBill = GetDistinctArray(billDetails, 'BillID');
                actualAmount = distinctBill[0]["Amount"];
                var amount = parseFloat(distinctBill[0]["Amount"]);
                amount = (amount == null ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                $('#txt-Vendor-Name').val(distinctBill[0]["VendorName"] == null ? '' : distinctBill[0]["VendorName"]);
                $('#txt-Invoice-Number').val(distinctBill[0]["InvoiceNumber"] == null ? '' : distinctBill[0]["InvoiceNumber"]);
                $('#txt-Bill-Description').val(distinctBill[0]["Description"] == null ? '' : distinctBill[0]["Description"]);
                $('#txt-Amount').val((distinctBill[0]["Amount"] == null ? '-' : amount));
                $('#inVoiceDate').datepicker('setDate',(distinctBill[0]["BillDate"] == null ? '' : moment(distinctBill[0]["BillDate"]).format('MM/DD/YYYY')));
                $('#due-Date').datepicker('setDate', (distinctBill[0]["DueDate"] == null ? '' : moment(distinctBill[0]["DueDate"]).format('MM/DD/YYYY')));
                $('#slt-PaymentTerms').val(distinctBill[0]["PaymentTerms"] == null ? 0 : distinctBill[0]["PaymentTerms"]);
                $('#slt-BillCategory').val(distinctBill[0]["Category"] == null ? 0 : distinctBill[0]["Category"]);
                $('.select2').select2();
                $('#txt-Notes').val(distinctBill[0]["Notes"] == null ? '' : distinctBill[0]["Notes"]);
                $('#txt-purchase').val(distinctBill[0]["PurchaseOrder"] == null ? '' : distinctBill[0]["PurchaseOrder"]);
                fileResponse["PhysicalLocation"] = (distinctBill[0]["PhysicalLocation"] == null ? "" : distinctBill[0]["PhysicalLocation"]);
                fileResponse["FileDisplayName"] = (distinctBill[0]["FileDisplayName"] == null ? "" : distinctBill[0]["FileDisplayName"]);
                fileResponse["ModifiedFileName"] = (distinctBill[0]["FileName"] == null ? "" : distinctBill[0]["FileName"]);
                fileResponse["FileSize"] = (distinctBill[0]["FileSize"] == null ? "" : distinctBill[0]["FileSize"]);
                if (distinctBill[0]["IsSplitted"] == 50013) {
                    $("#chk-box-split").prop("checked", true);
                    $('#bill-breakage-block').show();
                    $('#breakage-box').show();
                    breakagesShowing = 2;
                    $('#account-details i').removeClass('fa fa-angle-down');
                    $('#account-details i').addClass('fa fa-angle-right');
                    $('#txt-Amount').prop('disabled', true);
                    BindEditingBreakages(billDetails);
                }
                else {
                    $('#tbl-split-body').html('');
                    $('#breakage-box').hide();
                    $('#bill-breakage-block').hide();
                    $('#account-details i').removeClass('fa fa-angle-right');
                    $('#account-details i').addClass('fa fa-angle-down');
                    $("#chk-box-split").prop("checked", false);
                }
                if (distinctBill[0]["PhysicalLocation"] != null && distinctBill[0]["PhysicalLocation"] != "")
                {
                    $('#file_Viewer').html('');
                    var extension = distinctBill[0]["PhysicalLocation"].substr((distinctBill[0]["PhysicalLocation"].lastIndexOf('.') + 1));
                    BillFrames(distinctBill[0]["FileName"]);
                    if (extension == 'pdf') {
                        $('#pdf-icon').show();
                        $('#img-icon').hide();
                    }
                    else {
                        $('#pdf-icon').hide();
                        $('#img-icon').show();
                    }
                    $('#billFileName').text(distinctBill[0]["FileDisplayName"]);
                    $('#billFileName').prop('title', distinctBill[0]["FileDisplayName"]);
                    $('#btn-clear-file').show();
                }
                $('#tbl-draft-bills-body  [data-Edit-BillId="' + editBillId + '"]').parents('tr').remove();
                 
                if ($('#tbl-draft-bills-body tr').length == 0) {
                    $('#tbl-draft-bills-body [data-empty]').show();
                }

            }
        }
    }

    var BindDraft = function (billID) {
        $('#tbl-draft-bills-body [data-empty]').hide();
        var html = '';
        var vendorName = $('#txt-Vendor-Name').val();
        var invoiceNumber = $('#txt-Invoice-Number').val();
        var billDescription = $('#txt-Bill-Description').val();
        var amount = $('#txt-Amount').val();
        amount = amount.replace(/,/g, '');
        amount = parseFloat(amount);
        amount = (amount == null ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        //amount = amount.replace(/,/g, '');
        //amount = parseFloat(amount);
        var dueDate = $('#due-Date').val();
        var today = moment().format('MM/DD/YYYY');
        var dueDay = moment(dueDate);
        if(billID!=0){
            html += '<tr>';
            html += '<td style="width: 20%;">';
            html += '<h5 title="' + (vendorName == "" ? '-' : vendorName) + '">' + (vendorName == "" ? '-' : vendorName) + '';
            html += '</h5>';
            html += '</td>';

            html += '<td style="width: 15%;">';
            if (invoiceNumber != '' && invoiceNumber != null) {
                html += '<h5>' +  (invoiceNumber == "" ? "-" : invoiceNumber) + '</h5>';
            }
            else {
                html += '<h5>' - '</h5>';
            }
            html += '</td>';
            html += '<td style="width: 25%;" title="' + (billDescription == "" ? '-' : billDescription) + '">';
            html += '<h5>' + (billDescription == "" ? '-' : billDescription) + '';
            html += '</h5>';
            html += '</td>';
            html += '<td style="width: 16%;" class="isc-bill-amt-pad">';
            // html += '<td class="text-right">' +(item["Amount"] == null ? '-' : '$ ' + parseFloat(item["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) +'</td>';
            html += '<h5 style="text-align: right;" title="' + (amount == "" || amount == NaN ? '-' : amount) + '">' + (amount == "" || amount == NaN ? '-' :  amount) + '';
            html += '</h5>';
            html += '</td>';
            html += '<td style="width: 14%;">';
            if (moment(today) <= dueDay) {
                html += '<h5 >' + (dueDate == "" ? '-' : moment(dueDate).format('MM/DD/YYYY')) + '';
            }
            else {
                html += '<h5 style="color:red !important;">' + (dueDate == "" ? '-' : moment(dueDate).format('MM/DD/YYYY')) + '	';
            }
            html += '</h5>';
            html += '</td>';
            html += '<td style="width: 10%;">  ';
            html += '<a class="isc-action-badge-td-s1 pad-lft-5"  data-Edit-BillId=' + billID + ' title="Edit" ><i class="fa fa-pencil-square-o"></i></a>';
            html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-delete-BillId=' + billID + ' title="Delete" ><i class="fa fa-trash-o"></i></a>';
            html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-attachment-BillId=' + billID + ' title="Attachment" ><i class="fa fa-paperclip"></i></a>';
            //data-attachment-BillId=' + billID + '
            html += '</td>';
        }
        else {
            html += '<p data-empty="0">No Data Found</p>';
        }
        return html;
    }

    var BillFrames = function (fileImage) {
        $('#file_Viewer').html('');
        var iframe = document.getElementById("bill_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "bill_Frame";
            var iframewidth = 390;
            var sourcePath = "Requested Source Path: "+ filePathUrl + fileImage;
            WriteSourcePath(sourcePath);
            iframe.src = filePathUrl + fileImage;
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;");
            $('#iframe img').addClass('img-responsive');
            $('#file_Viewer').append(iframe);
        }
    }

    var BillFrameAttatchment = function (fileImage) {
        $('#billattachmentmodal').html('');
        var iframe = document.getElementById("attachment_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "attachment_Frame";
            var iframewidth = 390;
            iframe.src = filePathUrl + fileImage;
          //  iframe.src = "http://localhost:49504/images/FileBills/".concat(fileImage);
            //iframe.src = "http://localhost:49504/images/FileBills/sample.pdf";
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;")
            $('#billattachmentmodal').append(iframe);
        }
    }

    var AddDeletedBreakages = function () {
        var amountList = $('#tbl-split-body tr');
        if (amountList.length > 0) {
            $.each(amountList, function (index, item) {
                var billID = parseInt($(item).attr('breakage-id'));
                var obj = {
                    'BillBreakageID': billID
                }
                deletedBreakages.push(obj);
            });
        }
    }

    var BindAttachmentResponse = function () {
        var amount = parseFloat(fileResponse["TotalAmount"]);
        amount = (amount == null ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $('#txt-Vendor-Name').val((fileResponse["VendorName"] == null || fileResponse["VendorName"] == '' ? '' : fileResponse["VendorName"]));
        $('#txt-Invoice-Number').val((fileResponse["InvoiceNumber"] == null || fileResponse["InvoiceNumber"] == '' ? '' : fileResponse["InvoiceNumber"]));
        $('#txt-Amount').val((fileResponse["TotalAmount"] == null || fileResponse["TotalAmount"] == '' ? '' : amount));
       // $('#inVoiceDate').val((fileResponse["TransactionDate"] == null || fileResponse["TransactionDate"] == '' ? '' : moment(fileResponse["TransactionDate"]).format('MM/DD/YYYY')));
        $("#inVoiceDate").datepicker("setDate", (fileResponse["TransactionDate"] == null || fileResponse["TransactionDate"] == '' ? '' : moment(fileResponse["TransactionDate"]).format('MM/DD/YYYY')));
        $("#due-Date").datepicker("setDate", (fileResponse["TransactionDate"] == null || fileResponse["TransactionDate"] == '' ? '' : moment(fileResponse["TransactionDate"]).format('MM/DD/YYYY')));
        if (fileResponse["DueDate"] != null && fileResponse["DueDate"] != '')
        {
            $("#due-Date").datepicker("setDate", (fileResponse["DueDate"] == null || fileResponse["DueDate"] == '' ? '' : moment(fileResponse["DueDate"]).format('MM/DD/YYYY')));
            //$('#due-Date').val(moment(fileResponse["DueDate"]).format('MM/DD/YYYY'));
        }
        actualAmount = parseFloat(fileResponse["TotalAmount"]);

       
    }
}

//DATA MANPULATION
{
    var GetFilterListdata = function () {
        var _obj = {
            
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/GetMasterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BillInsert = function (insertType) {
        var vendorName = $('#txt-Vendor-Name').val();
        var invoiceNumber = $('#txt-Invoice-Number').val();
        var billDescription = $('#txt-Bill-Description').val();
        var amount = $('#txt-Amount').val();
        amount = amount.replace(/,/g, '');
        amount = parseFloat(amount);
        var invoiceDate = $('#inVoiceDate').val();
        if (invoiceDate == "")
        {
            invoiceDate = moment();
        }
        var dueDate = $('#due-Date').val();
        var paymentTerms = $('#slt-PaymentTerms').val();
        var billCategory = $('#slt-BillCategory').val();
        var notes = $('#txt-Notes').val();
        var purchaseOreder = $('#txt-purchase').val();
        BillId=0;
        // var splitedRows = $('#tbl-split-body tr edited="true"');
        var isSplited = 50014;
        var defaultSplitedAccount = $('#tbl-split-body tr').attr('accountID');
        var status = 50019;
        var objSplitedlist = [];
       

        //Load the Default breakage obj data
        var objdefaultBreakage = {
            'Amount': amount,
            'Description': billDescription,
            'BillType': billCategory,
            'Status': status,

        };

        objSplitedlist.push(objdefaultBreakage);


        //Get the Is splited Status
        if ($('#chk-box-split').is(':checked')) {

            //Load the splited amount details in object
            var amountList = $('#tbl-split-body tr');
            if (amountList.length > 0) {
                isSplited = 50013
                $.each(amountList, function (index, item) {
                    var accountType = parseInt($(item).find('[data-account]').val());
                    var amoutItem = $(item).find('[data-amount]').val();
                    amoutItem = amoutItem.replace(/,/g, '')
                    amoutItem = parseFloat(amoutItem);
                    var description = $(item).find('[data-description]').val();
                    var objBreakage = {
                        'Amount': amoutItem,
                        'Description': description,
                        'BillType': accountType,
                        'Status': status,
                    }
                    objSplitedlist.push(objBreakage);
                });
            }
            else {
                isSplited = 50014

                //Load the Default breakage obj data
                var objdefaultBreakage = {
                    'Amount': amount,
                    'Description': billDescription,
                    'BillType': billCategory,
                    'Status': status,

                };
            }

        }
       
          
        var obj = {
            'ClientID': 3001,
            'VendorName': vendorName,
            'BillDate': invoiceDate,
            'Amount': amount,
            'InvoiceNumber': invoiceNumber,
            'DueDate': dueDate,
            'Category': billCategory,
            'Notes': notes,
            'PaymentTerms': paymentTerms,
            'Description': billDescription,
            'IsSplitted': isSplited,
            'Status': status,
            'PhysicalLocation': fileResponse["PhysicalLocation"] == null ? '' : fileResponse["PhysicalLocation"],
            'FileDisplayName': fileResponse["FileDisplayName"] == null ? '' : fileResponse["FileDisplayName"],
            'FileName': fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"],
            'FileSize': parseFloat(fileSize),
            'Balance': amount,
            'PurchaseOrder':purchaseOreder,
            'lstBillBreakage': objSplitedlist,
            'Project': 0,
            'Customer':0,
            //'Project': parseInt($('#slt-Project').val()),
            //'Customer': parseInt($('#slt-Customer').val()),
        }

        var objlist = [];

        objlist.push(obj);

        var _obj = {
            'CustomBill': objlist
        }

        BillId=InsertBill(_obj);

        if (parseInt(insertType) == 2) {
            $.notify("Bill saved successfully!!", {
                position: "right top", className: "success"
            });
            window.location.replace("UserHome.aspx");
            ClearFields();
            
        }
        else {
            $.notify("Draft bill saved successfully!!", {
                position: "right top", className: "success"
            });
            $('#tbl-draft-bills-body').append(BindDraft(BillId));
            ClearFields();
         
            //draftBills = GetPendingSubmissionBills();
            //draftBills = $.parseJSON(draftBills[0]["Table"]);
           // BindPendingSubmissionBills();
        }

    }
    
    var InsertBill = function (_obj) {
        var objSplitedlist = [];
       
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/InsertBulkBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        
        return tempList;
    }

    var GetPendingSubmissionBills = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/GetDraftBills", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetEditBillDetails = function (billID) {
        var _obj = {
            'billID':billID
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/GetBillEditDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var EditBulkBill = function (_obj) {

        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/EditBulkBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        $.notify("Bill edited successfully!!", {
            position: "right top", className: "success"
        });
        return tempList;
    }

    var DeletePendingSubmissionBill = function (billID) {
        var _obj = {
            'billID': billID
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/DeleteBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        $.notify("Bill deleted successfully!!", {
            position: "right top", className: "success"
        });
        return tempList;
    }

    var GetBillAttachment = function (billId) {
        var _obj = {
            'billID': billId
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/GetBillAttachmentDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var WriteSourcePath = function (sourcePath) {
        var _obj = {
            'filSorcePath': sourcePath
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/WriteSourcePath", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//COMMON
{
    var BindDropDowns = function ($el, lst, DefaultItem,selected) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (selected == item["KeyListID"]) {
                    html += '<option selected value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
                }
                else {
                    html += '<option value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
                }
               
            });
            $el.html(html);
        }
       
    }

    var BindAccountType = function ($el, lst, DefaultItem, selected) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
          //  distinctlst = GetunmatchedRecord(distinctlst, 'KeyListID', selectedAccountType);
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (selected == item["KeyListID"]) {
                    html += '<option selected value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
                }
                else{
                    html += '<option value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
                }
            });
           
        }
        return html;
    }

    var GetAccountHTML = function (AccountTypes) {
        var html = '';
        var distSelectedAccountTypes = GetDistinctArray(selectedAccountTypes, 'KeyListID');
        var strSelectedItems = [];
        var obj = {};
        var accountlst = $.parseJSON(filtersDataList[2]["Table2"]);
        var accountBindingList=[];
        var EmptyRows = $('#tbl-split-body tr[row-edited="false"]');
        var EmptyRowAccountValue = 0;
        if (EmptyRows.length > 0) {
            EmptyRowAccountValue=$('#tbl-split-body tr[row-edited="false"]').find('[data-account]').val();
        }
       
        $.each(accountlst, function (accIndex, accItem) {
            var isAlreadyExist = false;
            $.each(distSelectedAccountTypes, function (selectedIndex, selectedItem) {
                if (parseInt(accItem['KeyListID']) == selectedItem['KeyListID']) {
                    isAlreadyExist = true;
                }
            });
            if (!isAlreadyExist) {
                accountBindingList.push(accItem)
            }
        });
        if (accountBindingList.length > 0) {
            $.each(accountBindingList, function (bindIndex, bindItem) {
                if (EmptyRowAccountValue != 0 && EmptyRowAccountValue == bindItem["KeyListID"])
                {
                    html += '<option value="' + bindItem["KeyListID"] + '" selected>' + bindItem["Value1"] + '</option>';
                }
                else {
                    html += '<option value="' + bindItem["KeyListID"] + '">' + bindItem["Value1"] + '</option>';
                }
                       
                    });
        }
        var nonEditedRows = $('#tbl-split-body tr[row-edited="false"]');
        if (nonEditedRows.length > 0) {
            $('#tbl-split-body tr[row-edited="false"]').find('[data-account]').html(html);
        }
        return html;
    }

    var BillValidation = function () {
        var isValid = true;
        var vendorName = $('#txt-Vendor-Name').val();
        var amount = $('#txt-Amount').val();
        var dueDate = $('#due-Date').val();
        var invoice = $('#txt-Invoice-Number').val();
        var billDescription = $('#txt-Bill-Description').val();
        var floatAmount = amount.replace(/,/g, '');
        floatAmount = parseFloat(amount);
        if (vendorName == "" || vendorName == null)
        {
            isValid = false;
            $.notify("Vendor Name Should not be empty!", { position: "right top", className: "error" });
        }
        if (invoice == "" || invoice == null) {
            isValid = false;
            $.notify("Bill/Invoice Number Should not be empty!", { position: "right top", className: "error" });
        }
        if (amount == "" || amount == null) {
            isValid = false;
            $.notify("Amount Should not be empty!", { position: "right top", className: "error" });
        }
        if (floatAmount == 0) {
            isValid = false;
            $.notify("Amount Should not be zero!", { position: "right top", className: "error" });

        }
        if (dueDate == "" || dueDate == null) {
            isValid = false;
            $.notify("Due date not be empty!", { position: "right top", className: "error" });
        }

        if (billDescription == "" || billDescription == null) {
            isValid = false;
            $.notify("Bill description should not be empty!", { position: "right top", className: "error" });
        }

        if ($('#chk-box-split').is(':checked')) {
           
            var enteredAmount = 0;
            var amountList = $('#tbl-split-body tr');
            if (amountList.length > 0) {
                $.each(amountList, function (index, item) {
                    var amoutItem = $(item).find('[data-amount]').val();
                    amoutItem = amoutItem.replace(/,/g, '')
                    enteredAmount = enteredAmount + parseFloat(amoutItem);
                });
            }

            if (parseFloat(actualAmount) != enteredAmount) {
                isValid = false;
                $.notify("Bill amount and splited amount are not equal!", { position: "right top", className: "error" });
            }
        }


        if (fileResponse["PhysicalLocation"] == "" || fileResponse["PhysicalLocation"] == null || fileResponse["PhysicalLocation"] == undefined)
        {
            isValid = false;
            $.notify("Select the attachment for this bill", { position: "right top", className: "error" });
        }
        return isValid;
    }

    var ClearFields = function () {
        $('#txt-Vendor-Name').val('');
        $('#txt-Invoice-Number').val('');
        $('#txt-Bill-Description').val('');
        $('#txt-Amount').val('');
        $('#inVoiceDate').val('');
        $('#due-Date').val('');
        $('#slt-PaymentTerms').val(50012);
        $('#slt-BillCategory').val(0);
        $('#txt-Notes').val('');
        $("#chk-box-split").prop("checked", false);
        $('#bill-breakage-block').hide();
        $('#txt-Amount').prop("disabled", false);
        $('#txt-purchase').val('');
        billEdit = false;
        editBillId = 0;
        deletedBreakages = [];
        BillId = 0;
        var dueDate = moment().add(0, 'day').format('MM/DD/YYYY');
        $('#due-Date').val(dueDate);
        $('#dragdropfiles').val('');
        $('#browseBill').val('');
        $('#file_Viewer').html('');
        $('#file_Viewer').html('<h5 class="isc-sec-in-con-y-scroll-bdy-con-h5" style="padding-left:134px; padding-top:246px;" id="no_bill_Message">No Attachment Found</h5>');
        $('#billFileName').html('')
        $('#no_bill_Message').show();
        $('#img-icon').hide();
        $('#pdf-icon').hide();
        $('#btn-clear-file').hide();
        fileContainer = [];
        fileResponse = [];
        //$('#btn-clear-file').hide();
    }

    var ClearBrowsedFields = function () {
        $('#txt-Vendor-Name').val('');
        $('#txt-Invoice-Number').val('');
        $('#txt-Bill-Description').val('');
        $('#txt-Amount').val('');
        $('#inVoiceDate').val('');
        $('#due-Date').val('');
        $('#slt-PaymentTerms').val(50012);
        $('#slt-BillCategory').val(0);
        $('.select2').select2();
        $('#txt-Notes').val('');
        $("#chk-box-split").prop("checked", false);
        $('#bill-breakage-block').hide();
        $('#txt-Amount').prop("disabled", false);
        $('#txt-purchase').val('');
      //  billEdit = false;
       // editBillId = 0;
      //  deletedBreakages = [];
      //  BillId = 0;
        var dueDate = moment().add(0, 'day').format('MM/DD/YYYY');
        $('#due-Date').val(dueDate);
        $('#dragdropfiles').val('');
        $('#browseBill').val('');
        $('#file_Viewer').html('');
        $('#file_Viewer').html('<h5 class="isc-sec-in-con-y-scroll-bdy-con-h5" style="padding-left:134px; padding-top:246px;" id="no_bill_Message">No Attachment Found</h5>');
        $('#billFileName').html('')
        $('#no_bill_Message').show();
        $('#img-icon').hide();
        $('#pdf-icon').hide();
        $('#btn-clear-file').hide();
        fileContainer = [];
        fileResponse = [];
        //$('#btn-clear-file').hide();
    }

    var FilePathtoUrl = function (path) {
        path = path.replace('\\', '/');
        path = path.replace(' ', '');
        var drive = /(.)\:\//
        return path.replace(drive, 'file:///$1:/');
    }

    var GetDateNumber = function (value) {
        var dateValue=0;
        switch (value) {
            case 50009:
                dateValue = 30;
                break;
            case 50010:
                dateValue = 60;
                break;
            case 50011:
                dateValue = 90;
                break;
            case 50012:
                dateValue = 0;
                break;
            default:
                dateValue=0;
                
        }
        return dateValue;
    }

    //$("input[data-type='currency']").on({
    //    keyup: function () {
    //        formatCurrency($(this));
    //    },
    //    blur: function () {
    //        formatCurrency($(this), "blur");
    //    }
    //});

    $(document).on('keyup', 'input[data-type=currency]', function () {
        formatCurrency($(this));
    });

    $(document).on('blur', 'input[data-type=currency]', function () {
        formatCurrency($(this));
    })

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") { return; }

        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = input_val;

            // final formatting
            if (blur === "blur") {
                input_val += ".00";
            }
        }

        // send updated string to input
        input.val(input_val);
        actualAmount = $('#txt-Amount').val();
        actualAmount = actualAmount.replace(/,/g, '')
        actualAmount = parseFloat(actualAmount);
        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    }

//File Drag and Drop
{
    // File Drop
    {
        var RegisterFileDrop = function () {

            //if (editBillId == 0)
            //{
           // if (fileContainer.length == 0) {
              
            $("#dragdropfiles").on({

                'dragover dragenter': function (e) {
                    $('#dragdropfiles').addClass('isc-bill-drag')
                    fileContainer = [];
                    e.preventDefault();
                    e.stopPropagation();
                   
                },

                'drop': function (e, ui) {
                    e.preventDefault();
                    fileContainer = [];
                    var dataTransfer = e.originalEvent.dataTransfer;
                    var Files = dataTransfer.files;
                    $loading.show();
                    setTimeout(function () {
                    $('#dragdropfiles').removeClass('isc-bill-drag')
                   
                  
                    var _size = Files[0]["size"];
                    var type = Files[0]["type"];
                    const size = (_size / 1024 / 1024).toFixed(2);
                    
                    if (size > 10)
                    {
                        $(this).val('');
                        $.notify("File Size should not  greater than 10 MB", { position: "right top", className: "error" });
                    }
                    else if ($.inArray(type, ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']) == -1)
                    {
                        $(this).val('');
                        $.notify("File extention is not allowed", { position: "right top", className: "error" });
                        
                    }
                    else {
                        fileContainer.push(Files[0]);
                        fileSize = size;
                       
                        saveFiles();
                        var billFile = fileResponse["ModifiedFileName"];
                        BillFrames(billFile);
                        $('#billFileName').text(Files[0]["name"]);
                        $('#billFileName').prop('title', Files[0]["name"]);
                        BindAttachmentResponse();
                        if (type == 'application/pdf') {
                            $('#pdf-icon').show();
                            $('#img-icon').hide();
                        }
                        else {
                            $('#pdf-icon').hide();
                            $('#img-icon').show();
                        }
                       $('#btn-clear-file').show();
                    }         
                      $loading.hide();
        }, 0);
                }
            });
            }
            //else {
            //    $.notify("Already file choosed for this bill", { position: "right top", className: "error" });
            //}
            //}
        //    else {
        //        $.notify("Already file choosed for this bill", { position: "right top", className: "error" });
        //    }
        //}
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
                url: "BillManagement.ashx",
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


   
   
}