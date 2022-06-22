//Global Variables
{
    var filtersDataList = [];
    var editBillId = 0;
    var actualAmount = 0;
    var deletedBreakages = [];
    var billDetails = [];
    var selectedAccountTypes = [];
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        filtersDataList = GetFilterListdata();
        BindMasterData();
        editBillId = ((GetQueryStrings()["BillID"] == undefined || GetQueryStrings()["BillID"] == null) ? 0 : GetQueryStrings()["BillID"]);
        BindBillDetails();
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[add-row]', function () {

        if ($('#chk-box-split').is(':checked')) {
            var actualAmount = $('#txt-Amount').val();
            actualAmount = actualAmount.replace(/,/g, '')
            var enteredAmount = 0;
            var amountList = $('#tbl-Split-Body tr');
            var thisRowAmount = $(this).parents('tr').find('[data-amount]').val();
          var  thisRowFloatAmount = thisRowAmount.replace(/,/g, '')
          thisRowFloatAmount = parseFloat(thisRowFloatAmount);
            var objSelectedAccount = {
                'KeyListID': parseInt($(this).parents('tr').find('[data-account]').val())
            }
            selectedAccountTypes.push(objSelectedAccount);
            if (thisRowAmount != '' && thisRowFloatAmount != 0) {
            if (amountList.length > 0) {
                $.each(amountList, function (index, item) {
                    var amoutItem = $(item).find('[data-amount]').val();
                    amoutItem = amoutItem.replace(/,/g, '')
                    enteredAmount = enteredAmount + parseFloat(amoutItem);
                });
            }
            if (parseFloat(actualAmount) == enteredAmount) {
                var $lastRow = $("#tbl-Split-Body tr:not('.empty-row'):last");
                $lastRow.find('.select2-select').select2('destroy');
                $lastRow.find(':text').prop('disabled', true);
                $lastRow.find('[data-amount]').prop('disabled', true);
                $lastRow.find('[data-account]').prop('disabled', true);
                $lastRow.find('.select2-select').select2();
                $lastRow.attr('row-edited', true);
                   $lastRow.find('[data-delete]').show();
                $('.select2-select').select2();
                $(this).hide();
            }
            else if (parseFloat(actualAmount) > enteredAmount) {
                var $lastRow = $("#tbl-Split-Body tr:not('.empty-row'):last");
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
               // $newRow.find('[data-account]').val(50021);
               //  $newRow.find('[data-amount]').maskMoney();
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
                // $(this).parents('tr').attr('[row-edited]', true);
            }
            else {
                $.notify("Amount should not be greater than $ '" + actualAmount + "' ", { position: "right top", className: "error" });
           }
            }
            else {
                $.notify("Amount should not be empty and zero ", { position: "right top", className: "error" });
            }
        }

    });

    $(document).on('click', '[data-delete]', function () {
       
        var editBreakage = $(this).attr('saved-breakage');
        var lastEditBreakage = $(this).attr('last-edit-row');
        var breakageId = $(this).parents('tr').attr('breakage-id');;
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
        var amountList = $('#tbl-Split-Body tr');
        var nonEditedRows = $('#tbl-Split-Body tr[row-edited="false"]');
        var deletedAccountType = parseInt($(this).parents('tr').find('[data-account]').val());
        var AccountTypes = GetmatchedRecord($.parseJSON(filtersDataList[2]["Table2"]), 'KeyListID', deletedAccountType);
        selectedAccountTypes = GetunmatchedRecord(selectedAccountTypes, 'KeyListID', deletedAccountType);
        if (amountList.length > 0) {
            $.each(amountList, function (index, item) {
                var amoutItem = $(item).find('[data-amount]').val();
                amoutItem = amoutItem.replace(/,/g, '')
                enteredAmount = enteredAmount + parseFloat(amoutItem);
            });
            GetAccountHTML(AccountTypes);
            if (enteredAmount != parseFloat(actualAmount) && editBreakage == "true"  && nonEditedRows.length == 0) {
                var $lastRow = $("#tbl-Split-Body tr:not('.empty-row'):last");
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
                $newRow.find('[data-account]').html(GetAccountHTML(AccountTypes));
                $lastRow.find('[last-edit-row]').attr('last-edit-row', false);
                $lastRow.attr('row-edited', true);
                $lastRow.after($newRow);
                $lastRow.find('.select2-select').select2(); // Re-instrument original row
                $newRow.find('.select2-select').select2(); // Instrument clone
                $('.select2-select').select2();
            }
          else if(enteredAmount != parseFloat(actualAmount) && nonEditedRows.length == 0) {
              var $lastRow = $("#tbl-Split-Body tr:not('.empty-row'):last");
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
                //$newRow.find('[data-amount]').maskMoney();
                $newRow.attr('row-edited', false);
                $newRow.find('[data-account]').prop('disabled', false);
                $newRow.find('[data-account]').val(50021);
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

    $(document).on('click', '[bill-Submission]', function () {
        var submissionType = parseInt($(this).attr('bill-Submission'));
        if (BillValidation()) {
            EditBill(submissionType);
           
        }
        

    });

    $(document).on('click', '#txt-Amount', function () {
        actualAmount = $(this).val();
        actualAmount = actualAmount.replace(/,/g, '')

    });

    $(document).on('click', '#billFileName', function () {
       
        $('#billFileTitle').text(billDetails[0]["FileDisplayName"]);
        $('#billFileTitle').prop('title', billDetails[0]["FileDisplayName"]);
        BillFrames(billDetails[0]["FileName"]);
        $('#mp_bill-view').show();
    });

    $(document).on('click','#bill-Close', function () {
        $('#mp_bill-view').hide();
    });

    $(document).on('change', '#chk-box-split', function () {
        if ($('#chk-box-split').is(':checked') && actualAmount != 0) {
            $.notify("After splitting the amount, you are not able to change the actual amount", {
                position: "right top", className: "success"
            });
            $("#txt-Amount").attr("disabled", "disabled");
            $('#breakage-Block').show();
            BindSplitRows();
            $('.select2').select2();
        }
        else {
            amountSplit = false;
            if (editBillId != 0) {
                AddDeletedBreakages();
            }
            $("#txt-Amount").removeAttr("disabled");
            $('#breakage-Block').hide();
            selectedAccountTypes = [];
        }
    });

    $(document).on('change', '[data-numeric-field]', function () {
        var enteredScore = $(this).val();
        if (enteredScore != '') {
            var positveSign = Math.sign(enteredScore);

            if (positveSign != 1) {
                // $.notify("Amount should be positive numeric!", { position: "right top", className: "error" });
                $(this).val("");

            }
        }

    });

    $(document).on('click', '#account-details', function () {
        var showing = $(this).attr('data-attribute');
        showing = parseInt(showing);
        if (showing == 1) {
            $(this).attr('data-attribute', 2);
            $('#breakage-box').show();
            $('#account-details i').removeClass('fa fa-angle-down');
            $('#account-details i').addClass('fa fa-angle-right');
        }
        else {
            $(this).attr('data-attribute', 1);
            $('#breakage-box').hide();
            $('#account-details i').removeClass('fa fa-angle-right');
            $('#account-details i').addClass('fa fa-angle-down');
        }


    });

    $(document).on('change', '#slt-Payment-Terms', function () {
        var paymentTermVal = parseInt($(this).val());
        var dateNumber = GetDateNumber(paymentTermVal);
        if ($('#txt-Invoice-Date').val() != '') {
            var dueDate = moment($('#txt-Invoice-Date').val()).add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#txt-Due-Date').datepicker('setDate', dueDate);
        }
        else {
            var dueDate = moment().add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#txt-Due-Date').datepicker('setDate', dueDate);
        }
        //var dueDate = moment().add(dateNumber, 'day').format('MM/DD/YYYY');
        //$('#txt-Due-Date').val(dueDate);

    });

    //$(document).on('click', 'th[data-sort]', function (e) {
    //    var $this = $(this).parents('table');
    //    if ($('th[data-sort]').hasClass('write-row')) {
    //        alert("Can't sort when list has writting rows");
    //        return false;
    //    }

    //    // Set Groupby Fields
    //    {
    //        //var tablegroupby = 'Entityname'
    //        // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
    //        var columngroupby = $(this).attr('data-sort');
    //        var columType = $(this).attr('sort-column-Type');
    //        var sortingdefaulticon = "img/appimages/Sorting-icon-default.png";
    //        var sortingascendingicon = "img/appimages/Sorting-icon-asc.png";
    //        var sortingdescendingicon = "img/appimages/Sorting-icon-desc.png";

    //    }

    //    // Get Active sort order
    //    {
    //        var activesortorder = "default";
    //        if ($(this).hasClass('sorting-default'))
    //            activesortorder = "default";
    //        else if ($(this).hasClass('sorting-asc'))
    //            activesortorder = "asc";
    //        else if ($(this).hasClass('sorting-desc'))
    //            activesortorder = "desc";
    //    }

    //    // Restore all to default
    //    {
    //        $this.find('thead th').removeClass('sorting-asc sorting-desc').addClass('sorting-default');
    //        $this.find('thead th').find('img').attr('src', sortingdefaulticon);
    //        var currentSortOrder = "asc";
    //    }

    //    // Change Icon and Class
    //    {
    //        if (activesortorder === "default") {
    //            $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortDown');
    //            $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortUp')
    //            $(this).removeClass('sorting-default').addClass('sorting-asc');
    //            $(this).find('img').attr('src', sortingascendingicon);
    //            currentSortOrder = "asc";
    //        }
    //        else if (activesortorder === "asc") {
    //            $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortDown');
    //            $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortUp')
    //            $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
    //            $(this).find('img').attr('src', sortingdescendingicon);
    //            currentSortOrder = "desc";
    //        }
    //        else if (activesortorder === "desc") {
    //            $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortDown');
    //            $('#tbl-Unapproved th[sort-column-Type]').removeClass('headerSortUp')
    //            $(this).removeClass('sorting-default sorting-desc headerSortUp').addClass('sorting-asc headerSortDown');
    //            $(this).find('img').attr('src', sortingascendingicon);
    //            currentSortOrder = "asc";
    //        }
    //    }


    //    // Sort it and Render List
    //    {
    //        //$loading.show();
    //        //setTimeout(function () {
    //        // Sort it by Default Groupby and then by Column
    //        var lstResult = billDetails

    //        if (columType == "text") {
    //            if (currentSortOrder === "asc")
    //                lstResult = ObjSorter(lstResult, columngroupby, '123');
    //            else
    //                lstResult = ObjSorter(lstResult, columngroupby, '321');
    //        }
    //        else if (columType == 'date') {
    //            if (currentSortOrder === "asc")
    //                lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
    //            else
    //                lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
    //        }
    //        else {
    //            if (currentSortOrder === "asc")
    //                lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
    //            else
    //                lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
    //        }


    //        // Render List
    //        {
    //            BindBreakages(lstResult);

    //        }
    //        //    $loading.hide();
    //        //}, 0);
    //    }
    //});

   
        
}

//DOM Manipulation
{

    var BindSplitRows = function () {
        var html = '';
        var $el = $('#tbl-Split-Body');

        html += '<tr row-edited="false">';
        html += '<td>';
        html += '<div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-sel-box">';
        html += '<select class="isc-select-dropdown select2 select2-select" tabindex="-1" aria-hidden="true"   data-account="true">';
        html += BindAccountType($('[data-account]'), $.parseJSON(filtersDataList[2]["Table2"]), '' );
        html += '</select>';
        html += '</div>';
        html += '</td>';
        html += '<td>';
        html += '<input type="text" class="form-control " data-description="0" placeholder="Enter Description">';
        html += '</td>';
        html += '<td class="isc-bill-amt-pad">';
        html += '<input type="text" class="form-control " data-type="currency"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" placeholder="Enter Amount" data-new-bill="1"   data-amount="0" placeholder="" style="text-align:right;">';
        html += '</td>';
        html += '<td style="text-align:center;">';
        html += '<i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst"  add-row="true"></i>';
        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete"  style="display:none;" last-row="false" data-delete="0"><i class="fa fa-trash-o"></i></a>';
        html += '</td>';
        html += '</tr>';
        $el.html(html);
        $('.select2').select2();
        //$('[data-amount]').maskMoney();
    }

    var BindMasterData = function () {
        var paymentTermsFilterList = $.parseJSON(filtersDataList[0]["Table"]);
        var billCategory = $.parseJSON(filtersDataList[1]["Table1"]);
        BindDropDowns($('#slt-Payment-Terms'), $.parseJSON(filtersDataList[0]["Table"]), '', 50012);
        BindDropDowns($('#slt-Bill-Category'), $.parseJSON(filtersDataList[1]["Table1"]), 'Choose Bill Category', 0);
        $('.select2').select2();
        //$('#txt-Amount').mask("#,##0.00", { reverse: true });
        $('#txt-Invoice-Date').mask('00/00/0000');
        $('#txt-Due-Date').mask('00/00/0000')
        //// $("#txt-Amount").maskMoney();
        //$('#inVoiceDate').mask('00/00/0000');
        //$('#tbl-draft-bills-body').html('<p data-empty="0">No Data Found</p>')

        $('#txt-Invoice-Date').datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy',
            daysOfWeekDisabled: "6,0",
            language: "en"
        }).on('changeDate', function (e) {
            var $this = $(this);
            var selectedDate = $this.val();
            var paymentTerm = parseInt($('#slt-Payment-Terms').val());
            var dateNumber = GetDateNumber(paymentTerm);
            var dueDate = moment(selectedDate).add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#txt-Due-Date').datepicker('setDate', dueDate);

        });
    }

    var BindBillDetails = function () {
       var   EditbillDetails = GetEditBillDetails(editBillId);
       billDetails = $.parseJSON(EditbillDetails[0]["Table"]);
       if (EditbillDetails.length > 1) {
           var comments = $.parseJSON(EditbillDetails[1]["Table1"]);
           BindApproverComment(comments);
       }
       else {
           $('#History_Table').html('<p id="No-Data">No Data Found</p>');
       }
       if ((billDetails[0]["BillComment"] != '' && billDetails[0]["BillComment"] != null) && (billDetails[0]["CommentCreated"] != billDetails[0]["AccountID"]))
       {
           BindComment()
       }
    
        if (billDetails.length > 0) {
            var distinctBill = GetDistinctArray(billDetails, 'BillID');
            actualAmount = distinctBill[0]["Amount"];
            var amount = parseFloat(distinctBill[0]["Amount"]);
            amount = (amount == null ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
            $('#txt-Vendor').val(distinctBill[0]["VendorName"] == null ? '' : distinctBill[0]["VendorName"]);
            $('#txt-Invoice').val(distinctBill[0]["InvoiceNumber"] == null ? '' : distinctBill[0]["InvoiceNumber"]);
            $('#txt-Description').val(distinctBill[0]["Description"] == null ? '' : distinctBill[0]["Description"]);
           // $('#txt-Amount').val((distinctBill[0]["Amount"] == null ? 0 : parseFloat(distinctBill[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#txt-Amount').val((distinctBill[0]["Amount"] == null ? '-' :amount));
            $('#txt-Invoice-Date').datepicker('setDate',(distinctBill[0]["BillDate"] == null ? '' : moment(distinctBill[0]["BillDate"]).format('MM/DD/YYYY')));
            $('#txt-Due-Date').datepicker('setDate',(distinctBill[0]["DueDate"] == null ? '' : moment(distinctBill[0]["DueDate"]).format('MM/DD/YYYY')));

            $('#slt-Payment-Terms').val(distinctBill[0]["PaymentTerms"] == null ? 0 : distinctBill[0]["PaymentTerms"]);
            $('#slt-Bill-Category').val(distinctBill[0]["Category"] == null ? 0 : distinctBill[0]["Category"]);
            $('#txt-Notes').val(distinctBill[0]["Notes"] == null ? '' : distinctBill[0]["Notes"]);
            $('#txt-area-Comments').val(distinctBill[0]["UserComment"] == null ? '' : distinctBill[0]["UserComment"])
            $('#txt-Purchace-Order').val(distinctBill[0]["PurchaseOrder"] == null ? '' : distinctBill[0]["PurchaseOrder"])
            if (distinctBill[0]["IsSplitted"] == 50013) {
                $("#chk-box-split").prop("checked", true);
                $('#txt-Amount').prop('disabled', true);
                BindBreakages(billDetails);
                $('#breakage-Block').show();
            }
            else {
                $("#chk-box-split").prop("checked", false);
                $('#breakage-Block').hide();
            }
            if (distinctBill[0]["PhysicalLocation"] != null && distinctBill[0]["PhysicalLocation"] != "") {
                $('#file_Viewer').html('');
                var extension = distinctBill[0]["PhysicalLocation"].substr((distinctBill[0]["PhysicalLocation"].lastIndexOf('.') + 1));
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
                //$('#btn-clear-file').show();
            }

            if (distinctBill[0]['Status'] == '50015' || distinctBill[0]['Status'] == '50034') {
                $('[data-submit]').prop('disabled', true);
                $('[bill-Submission]').hide();
            }

            $('.select2').select2();
           
        }

    }
    
    var BindBreakages = function (breakagesList) {
        var html = '';
        var $el = $('#tbl-Split-Body');

        if (breakagesList.length > 0) {
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50006')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50004')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50005')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50007')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '50008')
            breakagesList = GetunmatchedRecord(breakagesList, 'BillBreakageStatus', '0')
            var distinctBreakages = GetDistinctArray(breakagesList, 'BillBreakageID');
            var indexValue = distinctBreakages.length - 1;
            $.each(distinctBreakages, function (index, item) {
                var lastEditedRow = false;
                if (indexValue == index) {
                    lastEditedRow = true;
                }
                var obj = {};
                obj = {
                    'KeyListID': parseInt(item["BreakageType"])
                }
                selectedAccountTypes.push(obj);
                html += '<tr row-edited="true" data-submit="true" breakage-id=' + item["BillBreakageID"] + '>';
                html += '<td>';
                html += '<div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-sel-box">';
                html += '<select class="isc-select-dropdown select2 select2-select" tabindex="-1" aria-hidden="true" disabled  data-account="true">';
                html += BindAccountType($('[data-account]'), $.parseJSON(filtersDataList[2]["Table2"]), '', item["BreakageType"]);
                html += '</select>';
                html += '</div>';
                html += '</td>';
                html += '<td>';
                html += '<input type="text" class="form-control " disabled  data-description="0" value="' + item["BreakageDescription"] + '" placeholder="Enter Description">';
                html += '</td>';
                html += '<td class="isc-bill-amt-pad">';
                html += '<input type="text" disabled  class="form-control " data-new-bill="0" data-type="currency"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" placeholder="Enter Amount" value="' + (item["BreakageAmount"] == null ? '-' : parseFloat(item["BreakageAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '" data-amount="0" placeholder="" style="text-align:right;">';
                html += '</td>';
                html += '<td style="text-align:center;">';
                html += '<i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst" style="display:none;" add-row="true"></i>';
                if (item["Status"] != '50015' && item["Status"] != '50034') {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" last-edit-row=' + lastEditedRow + ' saved-breakage="true" data-delete="0"><i class="fa fa-trash-o"></i></a>';
                }
                
                html += '</td>';
                html += '</tr>';
            });
        }
        $el.html(html);
        $('.select2').select2();
    }

    var EditBill = function (submissionType) {
        if (editBillId != 0) {
            var vendorName = $('#txt-Vendor').val();
            var invoiceNumber = $('#txt-Invoice').val();
            var billDescription = $('#txt-Description').val();
            var amount = $('#txt-Amount').val();
            amount = amount.replace(/,/g, '');
            amount = parseFloat(amount);
            var invoiceDate = $('#txt-Invoice-Date').val();
            if (invoiceDate == "") {
                invoiceDate = moment().format('MM/DD/YYYY');
            }
            var dueDate = $('#txt-Due-Date').val();
            var paymentTerms = $('#slt-Payment-Terms').val();
            var billCategory = $('#slt-Bill-Category').val();
            var notes = $('#txt-Notes').val();
            var comments = $('#txt-area-Comments').val();
            var purchaseOrder= $('#txt-Purchace-Order').val();
            // var splitedRows = $('#tbl-split-body tr edited="true"');
            var isSplited = 50014;
            var defaultSplitedAccount = $('#tbl-Split-Body tr').attr('accountID');
            var status = 50016;
            if (submissionType == 2) {
                //draft
                status = 50019;
            }
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
                var amountList = $('#tbl-Split-Body tr');
                if (amountList.length > 0) {
                    isSplited = 50013
                    $.each(amountList, function (index, item) {
                        var accountType = parseInt($(item).find('[data-account]').val());
                        var amoutItem = $(item).find('[data-amount]').val();
                        amoutItem = amoutItem.replace(/,/g, '');
                        amoutItem = parseFloat(amoutItem);
                        var description = $(item).find('[data-description]').val();
                        var breakageID = $(item).attr('breakage-id');
                        var newRow = $(item).find('[data-new-bill]').attr('data-new-bill');
                        newRow = parseInt(newRow);
                        if (newRow == 1) {
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
                'BillID': editBillId,
                'VendorName': vendorName,
                'BillDate': invoiceDate,
                'Amount': amount,
                'InvoiceNumber': invoiceNumber,
                'DueDate':dueDate,
                'Category': billCategory,
                'Notes': notes,
                'PaymentTerms': paymentTerms,
                'Description': billDescription,
                'IsSplitted': isSplited,
                'Status': status,
                'lstBillBreakage': objSplitedlist,
                'UserComment': comments,
                'PurchaseOrder': purchaseOrder
            }

            var objlist = [];

            objlist.push(obj);

            var _obj = {
                'BillDetailList': objlist
            }

            EditBulkBill(_obj);
            if (submissionType == 2) {
               
                $.notify("Draft bill saved successfully!!", {
                    position: "right top", className: "success"
                });
            }
            else {
                $.notify("Bill submitted successfully!!", {
                    position: "right top", className: "success"
                });
            }
            deletedBreakages = [];
            history.back(1);
        }
    }

    var BillFrames = function (fileImage) {
        $('#bill_File_Block').html('');
        var iframe = document.getElementById("bill_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "bill_Frame";
            var iframewidth = 390;
            iframe.src = filePathUrl + fileImage;
           // iframe.src = "http://localhost:49504/images/FileBills/".concat(fileImage);
          //  iframe.src = "https://testing.archarena.com/BillManagement/images/FileBills/".concat(fileImage);
            //iframe.src = "http://localhost:49504/images/FileBills/sample.pdf";
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;")
            $('#bill_File_Block').append(iframe);
        }
    }

    var BindApproverComment = function (approverCommentList) {
        var html = '';
        var $el = $('#History_Table');
        if (approverCommentList.length > 0) {
            var distinctList = GetDistinctArray(approverCommentList, 'ApprovedCommentID');
            distinctList = GetunmatchedRecord(distinctList, 'ApprovedComment', '')
            if (distinctList.length > 0) {
                $.each(distinctList, function (index, item) {

                              html+=' <tr>  ';         
                              html+='<td style="width: 100%;">';
                              html += '<p class="isc-bill-trk-avr-nam">' + (item["FirstName"] == null ? '' : item["FirstName"]) + ' ' + (item["LastName"] == null ? '' : item["LastName"]) + ' </p>';
                              html += '<div class="screen-row isc-bill-trk-cht-ovr-flw"> <h3>' + item["ApprovedComment"] + '</h3>';
                              html += '<h2><span> ' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format('MMM Do YYYY h:mm:ss a')) + ' </span></h2> ';
                              html+=' </div>';  
                              html+=' </td> ';
                              html += ' </tr>';

                })
            }
        }
        else {
            html+='<p>No Comments Found</p>'
        }
        $el.html(html);
    }

    var BindComment = function () {
        var html = '';
        if (billDetails[0]["BillComment"] != "" && billDetails[0]["BillComment"] != null) {
            var $el = $('#History_Table');

            html += ' <tr>  ';
            html += '<td style="width: 100%;">';
            html += '<p class="isc-bill-trk-avr-nam">' + (billDetails[0]["FirstName"] == null ? '' : billDetails[0]["FirstName"]) + ' ' + (billDetails[0]["LastName"] == null ? '' : billDetails[0]["LastName"]) + ' </p>';
            html += '<div class="screen-row isc-bill-trk-cht-ovr-flw"> <h3>' + billDetails[0]["BillComment"] + '</h3>';
            
            html += '<h2><span> ' + (billDetails[0]["CreatedOn"] == null ? '-' : moment(billDetails[0]["CreatedOn"]).format('MMM Do YYYY h:mm:ss a')) + ' </span></h2> ';
            html += ' </div>';
            html += ' </td> ';
            html += ' </tr>';
            $('#No-Data').hide();
            $el.append(html);
        }
      
    }

    var AddDeletedBreakages = function () {
        var amountList = $('#tbl-Split-Body tr');
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

   
}

//Data Manipulation
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

    var GetEditBillDetails = function (billID) {
        var _obj = {
            'billID': billID
        }
        var tempList = {};
        $.when(RequestServer("BillSubmit.aspx/GetBillEditDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var EditBulkBill = function (_obj) {

        var tempList = {};
        $.when(RequestServer("BillSubmit.aspx/EditBillOrSubmit", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

}

//Common
{
    var BillValidation = function () {
        var isValid = true;
        var vendorName = $('#txt-Vendor').val();
        var amount = $('#txt-Amount').val();
        var dueDate = $('#txt-Due-Date').val();
        var invoice = $('#txt-Invoice').val();
        var billDescription = $('#txt-Description').val();
        var floatAmount = amount.replace(/,/g, '');
        floatAmount = parseFloat(amount);

        if (vendorName == "" || vendorName == null) {
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
        if (billDescription == "" || billDescription == null) {
            isValid = false;
            $.notify("Bill description should not be empty!", { position: "right top", className: "error" });
        }

        if (floatAmount  == 0) {
            isValid = false;
            $.notify("Amount Should not be zero!", { position: "right top", className: "error" });
        }

        if (dueDate == "" || dueDate == null) {
            isValid = false;
            $.notify("Due date not be empty!", { position: "right top", className: "error" });
        }

        if ($('#chk-box-split').is(':checked')) {

            var enteredAmount = 0;
            var amountList = $('#tbl-Split-Body tr');
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
        return isValid;
    }

    var GetAccountHTML = function (AccountTypes) {
        var html = '';
        var distSelectedAccountTypes = GetDistinctArray(selectedAccountTypes, 'KeyListID');
        var strSelectedItems = [];
        var obj = {};
        var accountlst = $.parseJSON(filtersDataList[2]["Table2"]);
        var accountBindingList = [];
        var EmptyRows = $('#tbl-Split-Body tr[row-edited="false"]');
        var EmptyRowAccountValue = 0;
        if (EmptyRows.length > 0) {
            EmptyRowAccountValue = $('#tbl-Split-Body tr[row-edited="false"]').find('[data-account]').val();
        }
        //$.each(distSelectedAccountTypes, function (Index, Item) {
        //    obj = {
        //        'KeyListID': (Item['KeyListID']).toString()
        //    }
        //strSelectedItems.push(obj);
        //});
        //accountBindingList = GetunmatchedRecordFromArray(accountlst,strSelectedItems,'KeyListID')

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
                if (EmptyRowAccountValue != 0 && EmptyRowAccountValue == bindItem["KeyListID"]) {
                    html += '<option value="' + bindItem["KeyListID"] + '" selected>' + bindItem["Value1"] + '</option>';
                }
                else {
                    html += '<option value="' + bindItem["KeyListID"] + '">' + bindItem["Value1"] + '</option>';
                }
            });
        }
        var nonEditedRows = $('#tbl-Split-Body tr[row-edited="false"]');
        if (nonEditedRows.length > 0) {
            $('#tbl-Split-Body tr[row-edited="false"]').find('[data-account]').html(html);
        }
        return html;
    }

    var BindDropDowns = function ($el, lst, DefaultItem, selected) {
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

        }
        return html;
    }

    var GetDateNumber = function (value) {
        var dateValue = 0;
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
                dateValue = 0;

        }
        return dateValue;
    }

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