//Global Variables
{
    var masterData = [];
    var editBillId = 0;
    var fileContainer = [];
    var fileResponse = [];
    var fileSize = 0;
    var editBillDetails = [];
    var frequencyCount = 0;
    var frequencyType = '';
    var billFileID = 0;
    var frequencyIncrement = 0;
    var billFileResponse = [];
    var billFileSize = 0;
    var isAttchment = 0;
    var approverCount = 0;
    var selectedAccounts = [];
    var currentApprovers = [];
    var vendorID = 0;
    var IsView = 0;
    var vendorList = [];
    var IsVendorCustomed = 0;
    var desciptionstatus = 0;
}
//Load && Events
{
    $(document).ready(function () {
        //$loading.show();
       
        setTimeout(function () {
        editBillId = ((GetQueryStrings()["BillID"] == undefined || GetQueryStrings()["BillID"] == null) ? 0 : GetQueryStrings()["BillID"]);
        IsView = ((GetQueryStrings()["IsView"] == undefined || GetQueryStrings()["IsView"] == null) ? 0 : GetQueryStrings()["IsView"]);
        RegisterFileDrop();
            BuildCreateNewBillScreen();
           
        if (editBillId != 0) {
            BindEditBillDetails();
            $('#update-Button').addClass('mar-lft')
        }
        else {
            BindDefaultAccountant();
            //BindDefaultApprover();
        }
        if (IsView != 0) {
            DisableProperties();
        }
        
        if (IsView == 0 && parseInt(editBillId) != 0) {
            $('#pageTitle').text("Edit Bill")
        }

        //$(document).on('focus', '.select2.select2-container', function (e) {
        //    // only open on original attempt - close focus event should not fire open
        //    if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
        //        $(this).siblings('select').select2('open');
        //    }
        //});
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[Insert-Bill]', function () {
       
        var actionKey = parseInt($(this).attr('Insert-Bill'));
        $loading.show();
        setTimeout(function () {
    
        if (ValidateBill() && $("span[error-active='true']").length == 0)
        {
            setTimeout(removeLoader, 1000);
          
            InsertBill(actionKey);
       
        }
        $loading.hide();
        }, 0);
       
    });

    $(document).on('click', '[data-Add-Description]', function () {
        var $this = $(this);
        if ($this.parents('tr').find('[data-Total]').val() != '') {
            $this.parents('tr').find('[data-Desc]').prop('disabled', true);
            $this.parents('tr').find('[data-Rate]').prop('disabled', true);
            $this.parents('tr').find('[data-Quantity]').prop('disabled', true);
            $this.parents('tr').find('[data-Total]').prop('disabled', true);
            $this.parents('tr').attr('data-is-added', true);
            $this.parents('tr').find('[data-Add-Description]').hide();
            $this.parents('tr').find('[data-Edit]').show();
            $this.parents('tr').find('[data-Delete]').show();
            BindNewDescriptionRow();
        }
        else {
            $.notify("Total Amount should not be empty!", { position: "right top", className: "error" });
        }
      
      
    });

    $(document).on('click', '[data-Edit]', function () {
        var $this = $(this);
        $this.parents('tr').find('[data-Desc]').prop('disabled', false);
        $this.parents('tr').find('[data-Rate]').prop('disabled', false);
        $this.parents('tr').find('[data-Quantity]').prop('disabled', false);
        $this.parents('tr').find('[data-Total]').prop('disabled', false);
        $this.parents('tr').find('[data-Add-Description]').show();
        $this.parents('tr').find('[data-Edit]').show();
        $this.parents('tr').find('[data-Delete]').show();
        $this.hide();
    });

    $(document).on('click', '[data-Delete]', function () {
        var $this = $(this);
        $this.parents('tr').remove();
    });

    $(document).on('click', '#add-Split-Row', function () {
        if (ValidateSplitAmount()) {
            BindSplitRows();
             var obj = {
                   'selectedID': $('#slt-Account').val()
             }
             selectedAccounts.push(obj);
            $('#slt-Account').val('0');
            $('#split-Description').val("");
            $('#split-Amount').val("");
            $('#account-Validation').hide();
            $('#split-Amount-Validation').hide();
            $('.select2').select2();
        }
       
    });

    $(document).on('click', '[data-Edit-Split]', function () {
        var $this = $(this);
        var deletedAccount = $this.parents('tr').find('[data-AccountID]').attr('data-AccountID')
        selectedAccounts = GetunmatchedRecord(selectedAccounts, 'selectedID', deletedAccount);
        $('#slt-Account').val($this.parents('tr').find('[data-AccountID]').attr('data-AccountID'));
        $('#split-Description').val($this.parents('tr').find('[data-description]').attr('data-description'));
        $('#split-Amount').val($this.parents('tr').find('[data-amount]').attr('data-amount'));
        $('#slt-Account').select2();
        $this.parents('tr').remove();
    });

    $(document).on('click', '[data-Delete-Split]', function () {
        var $this = $(this);
        var deletedAccount = $this.parents('tr').find('[data-AccountID]').attr('data-AccountID')
        selectedAccounts = GetunmatchedRecord(selectedAccounts, 'selectedID', deletedAccount);
        $(this).parents('tr').remove();
    });

    $(document).on('click', '[Update-Bill]', function () {
        var actionKey = parseInt($(this).attr('Update-Bill'));
        $loading.show();
        setTimeout(function () {
    
        if (ValidateBill() && $("span[error-active='true']").length == 0) {
          
            UpdateBill(actionKey);
           // window.history.back();
        }
        $loading.hide();
        }, 0);
    });

    $(document).on('change', '[data-Select]', function () {
        var $this = $(this);
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Select") + "']").attr('error-active', false);
    });

    $(document).on('change', '[data-bill]', function () {
        var $this = $(this);
        var VAL = $this.val();
        var pattern = /^[a-zA-Z0-9-/ ]*$/

        if (!pattern.test(VAL)) {
            $("span.validation-message[data-validation='" + $this.attr("data-bill") + "']").show();
            $("span.validation-message[data-validation='" + $this.attr("data-bill") + "']").attr('error-active', true);
        } else {
            $("span.validation-message[data-validation='" + $this.attr("data-bill") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-bill") + "']").attr('error-active', false);
        }
        if ($this.attr("data-bill") == "billId" && VAL != '') {
            $('#billId-Validation').hide();
        }
        

    });

    $(document).on('change', '#auto-Approval', function () {
        if ($(this).is(':checked')) {
            BindApprovers($('#slt-Approvers'), $.parseJSON(masterData[2]["Table2"]), 'Choose Approver Name');
            $('#slt-Approvers').val(0);
            $('#slt-Approvers').select2();
            $('#slt-Approvers').prop('disabled', true);
            $('#tbl-approvers').html('<tr data-Empty-Approver-Row="true"><td colspan="3" style="text-align:center;">No data found</td></tr>')
        }
        else {
            $('#slt-Approvers').prop('disabled', false);
        }
    });

    $(document).on('change', '#slt-Frquency', function () {
        var freqValue = $(this).val();
        if (freqValue != "0") {
            SetFrequencyIntialize(parseInt(freqValue));
        }
       
    });

    $(document).on('click', '[data-Delete-Bill]', function () {
        var deleteBillId = parseInt($(this).attr('data-Delete-Bill'));
        if (deleteBillId == 0) {
            $(this).parents('tr').remove();
          
            if ($('#tbl-Attatchments-Body tr').length == 0) {
                $('#tbl-Attatchments-Body').html('<tr data-Empty-Document-Row="true"><td colspan="2" style="text-align:center;">No data found</td></tr>')
            }
            }
        else {
            $(this).parents('tr').remove();
           
            if ($('#tbl-Attatchments-Body tr').length == 0)

            {
                $('#tbl-Attatchments-Body').html('<tr data-Empty-Document-Row="true"><td colspan="2" style="text-align:center;">No data found</td></tr>')
            }
            BindBrowseBlock();
            fileContainer = [];
            fileResponse = [];
            isAttchment = 0;
            $('#txt-Vendor-Name').val('');
            $('#bill-Number').val('');
            $('#bill-Description').val('');
            $('#bill-Amount').val('');
            $('#payment-Terms').val('0');
            $('#payment-Terms').select2();
            $('#invoice-Date').val('');
            $('#due-Date').val('');
            vendorID = 0;
            $("span.validation-message").attr('error-active', false);
            $("span.validation-message").hide();
            $("div.validation-message").removeClass('isc-active-on');
            $("div.validation-message").removeClass('isc-active-child-on');
           
        }
    });

    $(document).on('click', '#save-Bill-Notes', function () {
        if ($.trim($('#bill-Notes').val()) != '') {
            BinduserEnteredNotes();
        }
        
    });

    $(document).on('click', '#add-Approver', function () {
        if ($('#slt-Approvers').val() != "0") {
            BindAddedApprover();
            var selectedApprover = $('#slt-Approvers').val();
            currentApprovers = GetunmatchedRecord(currentApprovers, 'AccountID', selectedApprover);
            BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
            $('#slt-Approvers').select2();
        }
        
    });

    $(document).on('click', '[delete-Approver]', function () {
        var deletedApprover = $(this).attr('delete-Approver');
        var deletedApproverOption = GetmatchedRecord($.parseJSON(masterData[2]["Table2"]), 'AccountID', deletedApprover);
        if(deletedApproverOption.length>0){
            var approverObj = {
                'AccountID':deletedApproverOption[0]["AccountID"],
                'ApplicationRole': deletedApproverOption[0]["ApplicationRole"],
                'FirstName': deletedApproverOption[0]["FirstName"],
                'LastName': deletedApproverOption[0]["LastName"],
            }
            currentApprovers.push(approverObj);
        }
        BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
        $('#slt-Approvers').select2();
        $(this).parents('tr').remove();
        BindApproversAfterDelete();

    });

    $(document).on('click', '#cancel-Bill', function () {
       // setTimeout(removeLoader, 0);
        window.history.back();
    });

    $(document).on('change', '#payment-Terms', function () {
        var paymentTermVal = parseInt($(this).val());
        var dateNumber = GetDateNumber(paymentTermVal);
        if ($('#invoice-Date').val() != '') {
            var dueDate=''
            if (dateNumber != 0) {
             dueDate = moment($('#invoice-Date').val()).add(dateNumber, 'day').format('MM/DD/YYYY');
            }
            else {
                dueDate=moment($('#invoice-Date').val()).format('MM/DD/YYYY')
            }
            
            $('#due-Date').datepicker('setDate', dueDate);
        }
        else {
            var dueDate = moment().add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#due-Date').datepicker('setDate', dueDate);
        }

    });

    $(document).on('click', '[data-Open-File]', function () {
        var fileName = $(this).attr('data-Open-File');
        
        if (fileName != '') {
            window.open(filePathUrl + fileName, '');
        }
        
        
    });

    $(document).on('click', '#btn-Search-Vendor', function () {
        if ($('#txt-Vendor-Search').val() != '') {
            var vendorDetails = GetVendor($('#txt-Vendor-Search').val());
        var likeLyMatchedVendor = vendorDetails["LikelyVendors"];
        BindLikelyMatchedVendors(likeLyMatchedVendor);
        }
      
    });

    $(document).on('click', '#btn-Reset-Vendor', function () {
        $('#txt-Vendor-Search').val('');
        BindLikelyMatchedVendors(vendorList);
        //$('#vendorList-Body').html('<tr ><td colspan="4" style="text-align:center;">No data found</td></tr>')
    });

    $(document).on('click', '#btn-Choose-Vendor', function () {
        vendorID = parseInt($("input[name=Vendor]:checked").attr('data-Vendor'));
        $('#txt-Vendor-Name').val($("input[name=Vendor]:checked").attr('data-Vendor-Name'))
        $('#payment-Terms').val($("input[name=Vendor]:checked").attr('data-PreferedPaymentTerm'))
        $('#payment-Terms').select2();
        CalculateDueDate($('#payment-Terms').val());
        if ($("input[name=Vendor]:checked").attr('data-Vendor') != undefined) {
            $('#vendor-Name-Validation').hide();
            $('#vendor-Name-NotMatched').hide();
            $('#PaymentTerm-Validation').hide();
            $('#Mp_Add_Vendor').hide();
            //var $modal = $('#Mp_Add_Vendor');
            //$modal.modal('hide');
        }
       
    });
  
    $(document).on('click', '#add-New-Vendor', function () {
        //var $modal = $('#Mp_Add_Vendor');
        //$modal.modal('hide');
        $('#Mp_Add_Vendor').hide();
        ResetAddVendorFields();
        $('#txt-Vendor-Search').val('');
        $('#vendorList-Body').html('<tr ><td colspan="4" style="text-align:center;">No data found</td></tr>')
        $('#Mp_New_Vendor').show();

        //var $modal = $('#Mp_New_Vendor');
        //$modal.modal('show');
    });

    $(document).on('click', '[cancel-Choose-Vendor]', function () {
        $('#txt-Vendor-Search').val('');
    //    $('#vendorList-Body').html('<tr ><td colspan="4" style="text-align:center;">No data found</td></tr>');
        $('#Mp_Add_Vendor').hide();
        //var $modal = $('#Mp_Add_Vendor');
        //$modal.modal('hide');
    });

    $(document).on('click', '#open-Vendor', function () {
       // $('#Mp_Add_Vendor').show();
    });

    $(document).on('click', '#btn-Save-New-Vendor', function () {
        if (ValidateVendor() && $("#Mp_New_Vendor span[error-active='true']").length == 0) {
            InsertVendor();

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
            $('#vendorEmail-Validation').hide();
        }

    });

    $(document).on('click', '[cancel-Add-Vendor-POP]', function () {
        //var $modal = $('#Mp_New_Vendor');
        //$modal.modal('hide');
        $('#Mp_New_Vendor').hide();
        ResetAddVendorFields();

    });

    $(document).on('keyup', '#txt-AV-Vendor-Name', function () {
        var $this = $(this);
        var VAL = $this.val();
        //     var pattern = /^[a-zA-Z' ]*$/
        var pattern = /^[a-zA-Z0-9\s\[\]\.\-&@£$€¥#:;,']*$/;
        if (!pattern.test(VAL)) {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").show();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', true);
        } else {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }

        //if ($this.val() != '') {
        //    $('#vendorName-Validation').hide();
        //} else {
        //    $('#vendorName-Validation').show();
        //}


    });

    $(document).on('click', '[data-History]', function () {
        var ApproveHistoryID = $(this).attr('data-History');
        if (ApproveHistoryID != undefined) {
            var approverHistory = $.parseJSON(editBillDetails[6]["Table6"]);
            var comments = GetmatchedRecord(approverHistory, 'ApproveHistoryID', ApproveHistoryID);

            $('#approver-Name').val((((comments[0]["FirstName"] == null ? '' : comments[0]["FirstName"]) + " " + (comments[0]["LastName"] == null ? '' : comments[0]["LastName"]))));
            var approved = ("$" + (comments[0]["ApprovedAmount"] == null || Math.sign(parseFloat(comments[0]["ApprovedAmount"])) == -1 ? 0 : parseFloat(comments[0]["ApprovedAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            var balance = ("$" + (comments[0]["Balance"] == null || Math.sign(parseFloat(comments[0]["Balance"])) == -1 ? 0 : parseFloat(comments[0]["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#amount-Span').html('(Approved :' + approved + '  , Balance :' + balance + ')');
            $('#approver-Notes').html((comments[0]["ApproverComment"] == null ? 'No Comments Found' : comments[0]["ApproverComment"]));
            $('#mp_comts').show();
        }
        else {
            $('#mp_comts').hide();
        }

    });

    $(document).on('click', '#Close-Notes', function () {
        $('#mp_comts').hide();
    });

    $(document).on('change', '#slt-Customer', function () {
        var selectedCustomer = parseInt($(this).val());
        if (selectedCustomer == 0) {
            
            BindDropDowns($('#slt-Project'),$.parseJSON(masterData[8]["Table8"]), 'Choose Project', 0);
            $('#slt-Project').select2();
        }
        else {
            var matchedProjects = GetmatchedRecord($.parseJSON(masterData[8]["Table8"]), 'Customer', selectedCustomer);
            BindDropDowns($('#slt-Project'), matchedProjects, 'Choose Project', 0);
            $('#slt-Project').select2();
        }
       

    });

    $(document).on('change', '#invoice-Date', function () {
        var $this = $(this);
        var selectedDate = $this.val();
        var paymentTerm = parseInt($('#payment-Terms').val());
        var dateNumber = GetDateNumber(paymentTerm);
        var dueDate = moment(selectedDate).add(dateNumber, 'day').format('MM/DD/YYYY');
        $('#due-Date').datepicker('setDate', dueDate);
    })

}
//Dom Manipulation
{
    var BuildCreateNewBillScreen = function () {
       
        BindCreatBillMasterData();
        BindNewDescriptionRow();
        BindConfigs();
     
        //$('[phone-Number]').mask('+0 (000) 000-0000');
        $('[phone-Number]').mask('#');
        $('[data-type=currency]').mask("#,##0.00", { reverse: true });
        //Bind Role Permission
        {
            var isAddVendor = GetmatchedRecord(RolePermissions, 'EntityActionID', '3015');
            if (isAddVendor != null && isAddVendor != undefined && isAddVendor.length > 0) {
                $('#add-New-Vendor').show();
            }
            else {
                $('#add-New-Vendor').hide();
            }

        }
    }

    var BindCreatBillMasterData = function () {
        masterData = GetCreateBillMasterData();
        BindMasterData();
        $('.iscdatepicker').datepicker();
        $('.iscdatepicker').mask('00/00/0000');
        $('#tbl-Attatchments-Body').append('<tr data-Empty-Document-Row="true"><td colspan="2" style="text-align:center;">No data found</td></tr>')
        $('#tbl-approvers').append('<tr data-Empty-Approver-Row="true"><td colspan="3" style="text-align:center;">No data found</td></tr>')
        vendorList = $.parseJSON(masterData[5]["Table5"]);
        BindLikelyMatchedVendors(vendorList);
        
    }

    var BindMasterData = function () {
        BindDropDowns($('#payment-Terms'), $.parseJSON(masterData[0]["Table"]), 'Choose Payment Terms')
        BindDropDowns($('#slt-Payment-Terms'), $.parseJSON(masterData[0]["Table"]), 'Choose Payment Terms')
       BindDropDowns($('#slt-Prefferd-Payment-Method'), $.parseJSON(masterData[6]["Table6"]), 'Choose Preferred Payment Method')

        BindGLDropDowns($('#slt-Account'), $.parseJSON(masterData[1]["Table1"]), 'Choose Account')
        BindGLDropDowns($('#slt-GL-Codes'), $.parseJSON(masterData[1]["Table1"]), 'Choose GL Account')
        BindDropDownsBySequence($('#slt-Frquency'), $.parseJSON(masterData[3]["Table3"]), 'Choose Frequency', '50051')
        BindDropDownSelected($('#interval-Period'), $.parseJSON(masterData[4]["Table4"]), '', '50048')
        BindApprovers($('#slt-Approvers'), $.parseJSON(masterData[2]["Table2"]), 'Choose Approver Name');
        currentApprovers = $.parseJSON(masterData[2]["Table2"]);
        BindVendors($('#vendor-Name'), $.parseJSON(masterData[5]["Table5"]), 'Choose Vendor Name');
        BindDropDowns($('#slt-Customer'), $.parseJSON(masterData[7]["Table7"]), 'Choose Customer', 0);
        BindDropDowns($('#slt-Project'), $.parseJSON(masterData[8]["Table8"]), 'Choose Project', 0);
        BindDropDowns($('#slt-Category'), $.parseJSON(masterData[9]["Table9"]), 'Choose Category', 0);

        if (editBillId == 0) {
            //var dueDate = moment().format('MM/DD/YYYY');
            //$("#due-Date").datepicker('setStartDate', dueDate);
        } 
        
    }

    var BindNewDescriptionRow = function () {
        var html = '';
        var $el = $('#tbl-description-Body');
        html += '<tr data-is-added="false">';
        html+='<td >';
        html += '    <input type="text" placeholder=" Type Bill Description" class="form-control isc-up-bill-vnd" data-Desc="true" style="width:130px"></td>';
        html+='<td title="">';
        html += '    <input type="text" placeholder=" Amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128"  data-type="currency" class="form-control isc-up-bill-vnd-amt" data-Rate="true"></td>';
        html+='<td>';
        html += '    <input type="number" placeholder=" Qty" class="form-control isc-up-bill-vnd" style="text-align: center;" data-Quantity="true"></td>';
        html += '<td title="">';
        html += '    <input type="text" placeholder="Total Amount"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128"  data-type="currency" class="form-control isc-up-bill-vnd-amt" data-Total="true"></td>';
        html += '<td >';
        html += '    <a class="isc-action-badge-td-s1 pad-lft-5" title="Add"  style="display:inline-block;"><i class="fa fa-plus" data-Add-Description="0"></i></a>';
        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#" data-Edit="true" style="display:none;">';
        html += '<i class="fa fa-pencil-square-o"></i></a> ';
        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#" data-Delete="true" style="display:none;">';
        html += '<i class="fa fa-trash-o"></i></a>';
        html+='</td>';
        html += '</tr>';
        $el.append(html)
    }

    var BindDescriptionRow = function () {
        var html = '';
        var $el = $('#');
        html+=' <tr>';
        html+=' <td>Writing Services</td>';
        html+=' <td style="text-align: right;">$1500.00</td>';
        html+=' <td style="text-align: center;">2</td>';
        html+=' <td style="text-align: right;">$3000.00</td>';
        html+=' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>';
        html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>';
        html+=' </tr>';
    }

    var BindSplitRows = function () {
        var html = '';
        var $el = $('#tbl-Split-Body');
        var accountGLID = $('#slt-Account').val();
        var description = $('#split-Description').val();
        var amount = $('#split-Amount').val();
        var account= $("#slt-Account option:selected[data-GL]").attr('data-GL');
        var accountText = $("#slt-Account option:selected").text();

      //  var accountText = $("#slt-Account").val();
        html+=' <tr>';
        html+=' <td>';
        html += ' <h5 title="' + accountText + '" data-AccountID="' + accountGLID + '" data-account="' + account + '">' + accountText + '</h5>';
        html+=' </td>';
        html+=' <td>';
        html += ' <h5 title="' + description + '" data-description="' + description + '">' + (description == null || description == '' ? "-" : description) + '</h5>';
        html+=' </td>';
        html+=' <td class="isc-bill-amt-pad">';
        html += ' <h5 style="text-align: right;" title="' + "$" + amount + '" data-amount=' + amount + '>' + "$" + amount + '</h5>';
        html+=' </td>';
        html+=' <td>';
        html+=' <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" data-Edit-Split="true"><i class="fa fa-pencil-square-o"></i></a>';
        html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-Delete-Split="true"><i class="fa fa-trash-o"></i></a>';
        html+=' </td>';
        html += ' </tr>';
        $el.append(html);
    }

    var BindEditBillDetails = function () {
        editBillDetails = GetEditBillDetails();
        if (editBillDetails != null && editBillDetails.length > 0) {
            BindBillDetails();
            BindEditBillDescriptions();
            BindEditBillSplitAmounts();
            BindEditDocuments();
            BindEditNotes();
            BindEditApprovers();
            BindPaymentDetails();
            BindPaidBillDoumnets();
            $('[Insert-Bill]').hide();
            $('[Update-Bill]').show();
            if ($.parseJSON(editBillDetails[6]["Table6"]) != null && $.parseJSON(editBillDetails[6]["Table6"]) != undefined && $.parseJSON(editBillDetails[6]["Table6"]).length > 0) {
                $('#tab-approvals').show();
                BindApproverHistory();
            }
            else {
                $('#tab-approvals').hide();
            }
            if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0) {
                if (clientConfigurations[0]["IsSplitAllowed"] == "1") {
                    $('#btn-Split').show();
                }
                else {
                    $('#btn-Split').hide();
                }
            }
            //show only for recurring 
           // $('#apply-All').show();
        }
    }

    var BindBillDetails = function () {
       
        if (clientConfigurations[0]["IsStandardApproval"] == "1") {
            $('#default-approver-div').show();
            $('.loader').show();
        }
        else {
            $('#default-approver-div').hide();
            $('.loader').hide();
        }
        var billDetails = $.parseJSON(editBillDetails[0]["Table"]);
        if (billDetails[0]["Status"] == 50017 || billDetails[0]["Status"] == 50019 || billDetails[0]["Status"] == 50036) {

        }
        else {
            $("#pageTitle").html('Bill Details');
        }
        if (billDetails != null && billDetails.length > 0) {
            vendorID = (billDetails[0]["VendorID"] == null ? 0 : parseInt(billDetails[0]["VendorID"]));
            
            $("#txt-Vendor-Name").val(SafeHTML(billDetails[0]["VendorName"]))
           
            $('#vendor-Name').val((billDetails[0]["VendorID"] == null ? 0 : billDetails[0]["VendorID"]));
            $('#bill-Number').val((billDetails[0]["InvoiceNumber"] == null ? '' : billDetails[0]["InvoiceNumber"]));
            $('#bill-Description').val((billDetails[0]["Description"] == null ? '' : billDetails[0]["Description"]));
            $('#bill-Amount').val((billDetails[0]["Amount"] == null ? '' : billDetails[0]["Amount"]));
            $('#payment-Terms').val((billDetails[0]["PaymentTerms"] == null ? 0 : billDetails[0]["PaymentTerms"]));
            $("#invoice-Date").datepicker("setDate", (billDetails[0]["BillDate"] == null || billDetails[0]["BillDate"] == '' ? '' : moment(billDetails[0]["BillDate"]).format('MM/DD/YYYY')));
            $("#due-Date").datepicker("setDate", (billDetails[0]["DueDate"] == null || billDetails[0]["DueDate"] == '' ? '' : moment(billDetails[0]["DueDate"]).format('MM/DD/YYYY')));
            $('#slt-Customer').val((billDetails[0]["Customer"] == null ? 0 : billDetails[0]["Customer"]));
            $('#slt-Project').val((billDetails[0]["Project"] == null ? 0 : billDetails[0]["Project"]));
            $('#slt-Category').val((billDetails[0]["BillCategory"] == null ? 0 : billDetails[0]["BillCategory"]));
            $('#recurring-Start-Date').datepicker("setDate", billDetails[0]["RecurrenceStartDate"] == null || billDetails[0]["RecurrenceStartDate"] == '' ? '' : moment(billDetails[0]["RecurrenceStartDate"]).format('MM/DD/YYYY'));
            $('#recurring-End-Date').datepicker("setDate", billDetails[0]["RecurrenceEndDate"] == null || billDetails[0]["RecurrenceEndDate"] == '' ? '' : moment(billDetails[0]["RecurrenceEndDate"]).format('MM/DD/YYYY'));
            $('#slt-Frquency').val((billDetails[0]["RecurrenceFrequency"] == null ? 0 : billDetails[0]["RecurrenceFrequency"]));

            $('#recurring-Start-Date').prop('disabled', true);
            $('#slt-Frquency').prop('disabled', true);
            $('.select2').select2();
            BillFrames((billDetails[0]["FileName"] == null ? 0 : billDetails[0]["FileName"]));
            if (billDetails[0]["RecurrenceFrequency"] == '1') {
                //show only for recurring 
                $('#apply-All').show();
            } else {
                //show only for recurring 
                $('#apply-All').hide();
            }
            if (billDetails[0]["IsRecurring"] == '0') {
                $('#recurring-End-Date').val('');
                $('#recurring-Start-Date').val('');
            }

            if (billDetails[0]["isAutoApproval"] == '1') {
                $('#auto-Approval').prop('checked', true);
                $('#slt-Approvers').prop('disabled', true);
                $('#lbl-AutoApproval').show();
            }
            else {
                $('#auto-Approval').prop('checked', false);
                $('#slt-Approvers').prop('disabled', false);
            }

            if ((billDetails[0]["Customer"] != null && billDetails[0]["Customer"] != '0')  || (billDetails[0]["Project"] != null && billDetails[0]["Project"] != '0'))
            {
                $('#bill-Association-Block').show();
            }
            else {
                //$('#bill-Association-Block').hide();
            }

            if (billDetails[0]["RecurrenceStartDate"] != null || billDetails[0]["RecurrenceEndDate"] != null || billDetails[0]["RecurrenceStartDate"] != '' || billDetails[0]["RecurrenceEndDate"] != '') {
                $('#recurrence-Block').show();
            }
           

        }
     
    }

    var BindEditBillDescriptions = function () {
        var billDescriptions = $.parseJSON(editBillDetails[1]["Table1"]);
        var html = '';
        var $el = $('#tbl-description-Body');
        if (billDescriptions != null && billDescriptions.length > 0) {

            $.each(billDescriptions, function (index, item) {
                $("#radioYes").prop("checked", true);
                $(".isc-dec-table").show();
                html += '<tr data-is-added="true">';
                html += '<td>';
                html += '    <input type="text" placeholder=" Type the Bill Description" disabled  data-Desc="true" class="form-control isc-up-bill-vnd" value=' + (item["Description"] == null ? '' : item["Description"]) + '></td>';
                html += '<td title="">';
                html += '    <input type="text" placeholder=" Amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128"   data-type="currency" disabled class="form-control isc-up-bill-vnd-amt" value=' + (item["Rate"] == null ? '' : item["Rate"]) + ' data-Rate="true"></td>';
                html += '<td>';
                html += '    <input type="text" placeholder=" Qty" disabled class="form-control isc-up-bill-vnd" style="text-align: center;" data-Quantity="true"  value=' + (item["Quantity"] == null ? '' : item["Quantity"]) + '></td>';
                html += '<td title="">';
                html += '    <input type="text" placeholder="Total Amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128"   data-type="currency" disabled class="form-control isc-up-bill-vnd-amt" data-Total="true"  value=' + (item["Total"] == null ? '' : item["Total"]) + '></td>';
                html += '<td >';
                html += '    <a class="isc-action-badge-td-s1 pad-lft-5" title="Add"  style="display:none;"><i class="fa fa-plus" data-Add-Description="0"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#" data-Edit="true" style="display:block;">';
                html += '<i class="fa fa-pencil-square-o"></i></a> ';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#" data-Delete="true" style="display:block;">';
                html += '<i class="fa fa-trash-o"></i></a>';
                html += '</td>';
                html += '</tr>';
            });
        }
        $el.html(html);
        BindNewDescriptionRow();
    }

    var BindEditBillSplitAmounts = function () {
        var billbreakages = $.parseJSON(editBillDetails[2]["Table2"]);
        billbreakages = GetunmatchedRecord(billbreakages, 'AccountName', '0');
        var html = '';
        var $el = $('#tbl-Split-Body');
        if (IsView != 0) {
            var splits = GetunmatchedRecord(billbreakages, 'BillType', '0');
            if (splits != null && splits.length > 0) {
                $('#btn-Split').show();
            }
            else {
                $('#btn-Split').hide();
            }
        }
        else {
            $('#btn-Split').show()
        }
        if (billbreakages != null && billbreakages.length > 0) {
          
            $.each(billbreakages, function (index, item) {
                
                if (item["BillType"] != null && item["BillType"] != '0') {
                    var obj = {
                        'selectedID': (item["GLAccountID"] == null ? "0" : item["GLAccountID"])
                    }
                    selectedAccounts.push(obj);
                    html += ' <tr>';
                    html += ' <td>';
                    html += ' <h5 title="' + (item["BillTypeName"] == null ? "-" : item["BillTypeName"]) + '" data-AccountID="' + (item["GLAccountID"] == null ? "-" : item["GLAccountID"]) + '" data-account="' + (item["BillType"] == null ? "0" : item["BillType"]) + '">' + (item["BillTypeName"] == null ? "-" : item["BillTypeName"]) + '</h5>';
                    html += ' </td>';
                    html += ' <td>';
                    html += ' <h5 title="' + (item["Description"] == null ? "-" : item["Description"]) + '" data-description="' + (item["Description"] == null ? "-" : item["Description"]) + '">' + (item["Description"] == null ? "-" : item["Description"]) + '</h5>';
                    html += ' </td>';
                    html += ' <td class="isc-bill-amt-pad">';
                    html += ' <h5  title="' + (item["Amount"] == null ? "-" : "$" + item["Amount"]) + '" style="text-align: right;" data-amount=' + (item["Amount"] == null ? "0" : item["Amount"]) + '>' + (item["Amount"] == null ? "0" : "$" + item["Amount"]) + '</h5>';
                    html += ' </td>';
                    html += ' <td>';
                    html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" data-Edit-Split="true"><i class="fa fa-pencil-square-o"></i></a>';
                    html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-Delete-Split="true"><i class="fa fa-trash-o"></i></a>';
                    html += ' </td>';
                    html += ' </tr>';
                }
               
            });
        }
        else {

        }
        $el.html(html);
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
            var sourcePath = "Requested Source Path: " + filePathUrl + fileImage;
            WriteSourcePath(sourcePath);
            iframe.src = filePathUrl + fileImage;
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;");
            $('#iframe img').addClass('img-responsive');
            $('#file_Viewer').append(iframe);
            isAttchment = 1;
        }
    }

    var SetFrequencyIntialize = function (freqValue) {
        switch (freqValue) {
            case 50050://Weekly
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(1, 'w').format('MM/DD/YYYY');
                var endDate = moment().add(2, 'w').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'w';
                frequencyIncrement = 1;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);
                break;
            case 50055://Biweekly
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(2, 'w').format('MM/DD/YYYY');
                var endDate = moment().add(4, 'w').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'w';
                frequencyIncrement = 2;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);
                break;
            case 50051://Monthly
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(1, 'M').format('MM/DD/YYYY');
                var endDate = moment().add(2, 'M').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'M';
                frequencyIncrement = 1;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);
                break;
            case 50056://BiMonthly
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(2, 'M').format('MM/DD/YYYY');
                var endDate = moment().add(4, 'M').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'M';
                frequencyIncrement = 2;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);
                break;
            case 50052://Quartely
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(1, 'Q').format('MM/DD/YYYY');
                var endDate = moment().add(2, 'Q').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'Q';
                frequencyIncrement = 1;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);
                break;
            case 50053://Half yearly
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(6, 'M').format('MM/DD/YYYY');
                var endDate = moment().add(12, 'M').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'M';
                frequencyIncrement = 6;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);
                break;
            case 50054://Half yearly
                $('#recurring-Start-Date').val('');
                $('#recurring-End-Date').val('');
                var startDate = moment().add(1, 'y').format('MM/DD/YYYY');
                var endDate = moment().add(1, 'y').add(1, 'd').format('MM/DD/YYYY');
                frequencyType = 'y';
                frequencyIncrement = 1;
                $('#recurring-Start-Date').datepicker('setStartDate', startDate);
                $('#recurring-End-Date').datepicker('setStartDate', endDate);

                break;
            default:
                break;
        }
    }

    var GetFrequencyCount = function () {
        var startDate =moment($('#recurring-Start-Date').val());
        var endDate = moment($('#recurring-End-Date').val());
        var freqValue = parseInt($('#slt-Frquency').val());
        if (freqValue != 0)
        {
        switch (freqValue) {
            case 50050://Weekly
                frequencyCount = endDate.diff(startDate, 'weeks');
                break;
            case 50055://Biweekly
                frequencyCount = endDate.diff(startDate, 'weeks');
                frequencyCount = frequencyCount / 2;
                break;
            case 50051://Monthly
                frequencyCount = endDate.diff(startDate, 'months');
                break;
            case 50056://BiMonthly
                frequencyCount = endDate.diff(startDate, 'months');
                frequencyCount = frequencyCount / 2;
                break;
            case 50052://Quartely
                frequencyCount = endDate.diff(startDate, 'months');
                frequencyCount = frequencyCount / 3;
                break;
            case 50053://Half yearly
                frequencyCount = endDate.diff(startDate, 'months');
                frequencyCount = frequencyCount / 6;
                break;
            case 50054:// yearly
                frequencyCount = endDate.diff(startDate, 'years');
                break;
            default:
                break;
        }
        }

    }

    var BindBrowseBlock = function () {
        var $el = $('#file_Viewer');
        var html = '';
        html += '<div class="screen-row isc-crt-bill-view"  style="top: 250px; left:31%">';
        html+='<div class="div-col-100per " style="text-align: center;">';
        html+='<div class="screen-row">';
        html+='<div class="isc-file-upload-in-con" id="dragdropfiles" style="padding: 5px 10px; border: none !important;">';
        html+='<i class="fa fa-cloud-upload"></i><div class="screen-row">';
        html+='<h2>Drag And Drop or<span class="isc-btn-inp-typ-file-s1" style="background-color: #f9f9f9 !important;">Browse';
        html+='<input type="file" id="browseBill" capture="" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">';
        html+='</span></h2><img src="img/OCRScr.png" class="isc-bill-tck-snr-img" title="OCR Scan"></div></div>';
        html+='<div class="screen-row"><h3 class="isc-lbl-vry-sm-txt-s1" style="text-align: center;">';
        html+='<span>Note:</span> Upload only PDF, JPG, JPEG &amp; PNG with Max 10 MB</h3></div>';
        html+='<div class="cell-left pad-lft-med"><a style="display: none" id="btn-validate-customer" class="isc-lbl-tile-foot-act-but-s1 cell-right">Validate Upload</a></div>';
        html+='<div class="cell-left pad-lft-med"><a style="display: none" id="btn-initiate-upload" class="isc-lbl-tile-foot-act-but-s1 cell-right">Initiate Process</a></div>';
        html += '</div></div></div>';
        $el.html(html);
    }

    var BindAttachmentResponse = function () {
        var amount = parseFloat(fileResponse["TotalAmount"]);
       
        amount = (amount == null ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
      //  $('#txt-Vendor-Name').val((fileResponse["VendorName"] == null || fileResponse["VendorName"] == '' ? '' : fileResponse["VendorName"]));
        $('#bill-Number').val((fileResponse["InvoiceNumber"] == null || fileResponse["InvoiceNumber"] == '' ? '' : fileResponse["InvoiceNumber"]));
        $('#bill-Amount').val((fileResponse["TotalAmount"] == null || fileResponse["TotalAmount"] == '' ? '' : amount));
        // $('#inVoiceDate').val((fileResponse["TransactionDate"] == null || fileResponse["TransactionDate"] == '' ? '' : moment(fileResponse["TransactionDate"]).format('MM/DD/YYYY')));
        $("#invoice-Date").datepicker("setDate", (fileResponse["TransactionDate"] == null || fileResponse["TransactionDate"] == '' ? '' : moment(fileResponse["TransactionDate"]).format('MM/DD/YYYY')));
        $("#due-Date").datepicker("setDate", (fileResponse["TransactionDate"] == null || fileResponse["TransactionDate"] == '' ? '' : moment(fileResponse["TransactionDate"]).format('MM/DD/YYYY')));
        if (fileResponse["DueDate"] != null && fileResponse["DueDate"] != '') {
            $("#due-Date").datepicker("setDate", (fileResponse["DueDate"] == null || fileResponse["DueDate"] == '' ? '' : moment(fileResponse["DueDate"]).format('MM/DD/YYYY')));
            //$('#due-Date').val(moment(fileResponse["DueDate"]).format('MM/DD/YYYY'));
        }
   //     actualAmount = parseFloat(fileResponse["TotalAmount"]);
        if (fileResponse["VendorName"] != null && fileResponse["VendorName"] != '' && fileResponse["VendorName"] != undefined) {
            $('#txt-Vendor-Search').val('');
           // $('#vendorList-Body').html('<tr ><td colspan="4" style="text-align:center;">No data found</td></tr>')
            ProcessVendorDetail(fileResponse["VendorName"]);
           
        }
        else {
            $('#txt-Vendor-Search').val('');
           // $('#vendorList-Body').html('<tr ><td colspan="4" style="text-align:center;">No data found</td></tr>')
           // $('#Mp_Add_Vendor').show();
            //Show the first pop up as empty
        }
        
        if (clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsCustomApproval"] == 1 && IsVendorCustomed == 0) {
           // var amountValue = $(this).val().replace(/,/g, '');
            var obj = {
                'IsVendor': 0,
                'VendorID': 0,
                'Amount': parseFloat(amount)
            }
            $('#default-approver-div').hide();
            $('.loader').hide();
            var customizedApprovers = GetCustomizedApprovers(obj);
            customizedApprovers = customizedApprovers["Approvers"];
            //if (customizedApprovers !== undefined) {
            if (customizedApprovers != null && customizedApprovers.length > 0) {
                IsVendorCustomed = 0;
            }
            BindConfigAccountants(customizedApprovers);
            // $loading.hide();
            //}
        }
    }

    var ProcessVendorDetail = function (vendorName) {
        var vendorDetails = GetVendor(vendorName);
        var exactlyMatchedVendor = vendorDetails["ExactVendor"];
        var likeLyMatchedVendor = vendorDetails["LikelyVendors"];
        if (exactlyMatchedVendor != undefined && exactlyMatchedVendor != null && exactlyMatchedVendor.length > 0) {
            $('#txt-Vendor-Name').val((exactlyMatchedVendor[0]["VendorName"] == null || exactlyMatchedVendor[0]["VendorName"] == '' ? '' : exactlyMatchedVendor[0]["VendorName"]));
            vendorID = (exactlyMatchedVendor[0]["VendorID"] == null ? 0 : exactlyMatchedVendor[0]["VendorID"]);
            $('#payment-Terms').val(exactlyMatchedVendor[0]["PaymentTerm"]);
            $('#payment-Terms').select2();
            $('#slt-Category').val(exactlyMatchedVendor[0]["GLCode"]);
            $('#slt-Category').select2();
            CalculateDueDate(exactlyMatchedVendor[0]["PaymentTerm"]);

        }
        else {
        //    BindLikelyMatchedVendors(likeLyMatchedVendor);
            //show the likely matched vendor Pop up
           // $('#Mp_Add_Vendor').show();
          //  var $modal = $('#Mp_Add_Vendor')
            //$modal.modal('show');
           
        }
    }

    var BindLikelyMatchedVendors = function (vendorList) {
        var $el = $('#vendorList-Body');
        var html = '';
        if (vendorList != null && vendorList != undefined && vendorList.length > 0) {
            $.each(vendorList, function (index, item) {
                html += '<tr>'
                html += '<td  title="'+(item["VendorName"]==null?'-':item["VendorName"])+'">'+(item["VendorName"]==null?'-':item["VendorName"])+'</td>'
                html += '<td  title="' + (item["Address1"] == null ? '-' : item["Address1"]) + '">' + (item["Address1"] == null ? '-' : item["Address1"]) + '</td>'
                html += '<td  title="' + (item["Phone"] == null  ? '-' : item["Phone"]) + '">' + (item["Phone"] == null ? '-' : item["Phone"]) + '</td>'
               // html += '<td > <label class=""><div class="radio"><span class="checked"  data-Vendor=' + (item["VendorID"] == null ? 0 : item["VendorID"]) + ' ><input type="radio" name="Vendor"/></span></div></label></td>'
                html += '<td > <input type="radio" style="cursor:pointer;" data-PreferedPaymentTerm="' + (item["PaymentTerm"] == null ? '-' : item["PaymentTerm"]) + '" data-Vendor-Name="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '" name="Vendor" data-Vendor=' + (item["VendorID"] == null ? 0 : item["VendorID"]) + '></td>'
                html += '</tr>'
            });
        }
        else {
            html += '<tr ><td colspan="4" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
    }

    var BindBillDocument = function () {
        var html = '';
        var $el = $('#tbl-Attatchments-Body');
        $('#tbl-Attatchments-Body  tr[data-Empty-Document-Row="true"]').remove();
        var title = "Uploaded On: " + moment().format('MM/DD/YYYY') + " Uploaded By:" + ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + " " + (loggerDetails["LastName"] == null ? '' : loggerDetails["LastName"])) + ""
        html += ' <tr data-Empty-Document-Row="false"><td><h5 title="' + title + '" data-fileName="' + fileResponse['FileDisplayName'] + '">';
        html += ' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;" data-file-PhyName="' + fileResponse['ModifiedFileName'] + '" data-phy-Location="' + fileResponse['PhysicalLocation'] + '">';
        html += ' <span title="' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '" >' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
        html += ' <a data-file-Size="' + fileContainer[0]["size"] + '" class="isc-action-badge-td-s1" data-Open-File="' + (fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"]) + '" title="View" ><i class="fa fa-eye"></i></a>';
        html += ' <a data-extension="' + fileContainer[0]["type"] + '" class="isc-action-badge-td-s1" data-Delete-Bill="' + billFileID + '" title="Delete"><i class="fa fa-trash-o"></i></a>'
        html += ' </div></td></tr>';
        $el.append(html);
    }

    var BinduserEnteredNotes = function () {
        var html = '';
        var $el = $('#bill-Notes-Block');
        var enteredNotes = $('#bill-Notes').val();
        html+='<p class="isc-crt-bill-nt">';
        html += '<i class="fa fa-circle" style="font-size: 8px !important; padding-right:5px" data-Notes="' + enteredNotes + '" data-CommentOn="' + moment().format('llll') + '">';
        html += '</i>' + enteredNotes + '<span class="isc-crt-bill-ownr" style="color: green !important;">' + ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + " " + (loggerDetails["LastName"] == null ? '' : loggerDetails["LastName"])) + ',</span>';
        html += '<span class="isc-crt-bill-ownr">' + moment().format('llll') + '</span></p>';
        $el.append(html);
        $('#bill-Notes').val('');
    }

    var BindEditDocuments = function () {
        var html = '';
        var $el = $('#tbl-Attatchments-Body');
        var billAttachments = $.parseJSON(editBillDetails[3]["Table3"]);
        if (billAttachments != null && billAttachments.length > 0) {
            $.each(billAttachments, function (index, item) {
                var title = "Uploaded On: " + (item["CreatedOn"] == null ? '-' : item["CreatedOn"]) + " Uploaded By:" + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + ""
                html += ' <tr data-Empty-Document-Row="false"><td><h5 title="' + title + '" data-fileName="' + (item["FileName"] == null ? '-' : item["FileName"]) + '">';
                html += ' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;" data-file-PhyName="' + (item["PhysicalFileName"] == null ? '-' : item["PhysicalFileName"]) + '" data-phy-Location="' + (item["PhysicalPath"] == null ? '-' : item["PhysicalPath"]) + '">';
                html += ' <span title="' + (item["FileName"] == null ? '-' : item["FileName"]) + '">' + (item["FileName"] == null ? '-' : item["FileName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
                html += ' <a data-file-Size="' + (item["Size"] == null ? '-' : item["Size"]) + '" class="isc-action-badge-td-s1" data-Open-File="' + (item["PhysicalFileName"] == null ? '' : item["PhysicalFileName"]) + '" title="View"><i class="fa fa-eye"></i></a>';
                html += ' <a data-extension="' + (item["Extension"] == null ? '-' : item["Extension"]) + '" class="isc-action-badge-td-s1" data-Delete-Bill="' + item["IsBillFile"] + '" title="Delete"><i class="fa fa-trash-o"></i></a>'
                html += ' </div></td></tr>';
            });
        }
        else {
            html += '<tr data-Empty-Document-Row="true"><td colspan="2" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);

    }

    var BindEditNotes = function () {
        var html = '';
        var $el = $('#bill-Notes-Block');
        var billNotes = $.parseJSON(editBillDetails[4]["Table4"]);
        if (billNotes != null && billNotes.length > 0) {
            $.each(billNotes, function (index, item) {
                html += '<p class="isc-crt-bill-nt">';
                html += '<i class="fa fa-circle" style="font-size: 8px !important; padding-right:5px" data-Notes="' + (item["Comment"] == null ? '-' : item["Comment"]) + '" data-CommentOn="' + (item["CommentOn"] == null ? '-' : item["CommentOn"]) + '">';
                html += '</i>' + (item["Comment"] == null ? '-' : item["Comment"]) + '<span class="isc-crt-bill-ownr" style="color: green !important;">' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + ',</span>';
                html += '<span class="isc-crt-bill-ownr">' + (item["CommentOn"] == null ? '-' : item["CommentOn"]) + '</span></p>';
            });
        }
        $el.html(html);
    }

    var BindAddedApprover = function () {
       
        var html = '';
        var $el = $('#tbl-approvers');
        $('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
        var selectedApproverText = $('#slt-Approvers :selected').text();
        var selectedApproverValue = $('#slt-Approvers').val();
        var approversRowLength = $('#tbl-approvers tr').length;
        approversRowLength = approversRowLength + 1;
        var suffix = GetNumericSuffix(approversRowLength);
        var approverSeqNumber = (approversRowLength.toString() + suffix);
        html+=' <tr>';
        html += ' <td data-Seq="' + approversRowLength + '">' + approverSeqNumber + ' Approver</td>';
        html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
        html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
        html += ' </tr>';
        $el.append(html);
    }

    var BindAddedApprover = function () {
       
        var html = '';
        var $el = $('#tbl-approvers');
        $('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
        var selectedApproverText = $('#slt-Approvers :selected').text();
        var selectedApproverValue = $('#slt-Approvers').val();
        var approversRowLength = $('#tbl-approvers tr').length;
        approversRowLength = approversRowLength + 1;
        var suffix = GetNumericSuffix(approversRowLength);
        var approverSeqNumber = (approversRowLength.toString() + suffix);
        html += ' <tr>';
        html += ' <td data-Seq="' + approversRowLength + '">' + approverSeqNumber + ' Approver</td>';
        html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
        html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
        html += ' </tr>';
        $el.append(html);
    }

    var BindDefaultApprover = function () {
       
        var html = '';
        var $el = $('#tbl-approvers');
        $('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
        //var selectedApprover = $('#slt-Approvers').val();
        currentApprovers = GetunmatchedRecord(currentApprovers, 'AccountID', 30060);
       // BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
        $('#slt-Approvers').select2();
        var selectedApproverText = "Sabareesh H";
        var selectedApproverValue = 30060;
        var approversRowLength = $('#tbl-approvers tr').length;
        approversRowLength = approversRowLength + 1;
        var suffix = GetNumericSuffix(approversRowLength);
        var approverSeqNumber = (approversRowLength.toString() + suffix);
        html += ' <tr>';
        html += ' <td data-Seq="' + approversRowLength + '">' + approverSeqNumber + ' Approver</td>';
        html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
        html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
        html += ' </tr>';
        $el.append(html);
    }

    var BindDefaultAccountant = function () {
      
        
        
        var html = '';
        var $el = $('#tbl-approvers');
        
        //var selectedApprover = $('#slt-Approvers').val();
        var DefaulltAccountant = GetmatchedRecord($.parseJSON(masterData[2]["Table2"]), 'IsDefaultAccountant', '1');
        if (DefaulltAccountant != null && DefaulltAccountant != undefined && DefaulltAccountant.length > 0) {
           

            $('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
            currentApprovers = GetunmatchedRecord(currentApprovers, 'AccountID', DefaulltAccountant[0]["AccountID"]);
            //BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
            $('#slt-Approvers').select2();
            if (DefaulltAccountant != null && DefaulltAccountant != undefined && DefaulltAccountant.length > 0) {
                DefaulltAccountant = GetDistinctArray(DefaulltAccountant, 'AccountID');
                DefaulltAccountant = ObjSorter(DefaulltAccountant, "ApproverSeqence", '123');
                $.each(DefaulltAccountant, function (index, item) {
                    var selectedApproverText = ((item["FirstName"] == null ? '' : item["FirstName"]) + ' ' + (item["LastName"] == null ? '' : item["LastName"]))
                    var selectedApproverValue = (item["AccountID"] == null ? 0 : parseInt(item["AccountID"]));
                    var approversRowLength = $('#tbl-approvers tr').length;
                    approversRowLength = approversRowLength + 1;
                    var suffix = GetNumericSuffix(parseInt(index) + 1);
                    var approverSeqNumber = ((parseInt(index) + 1) + suffix);
                    html += ' <tr>';
                    html += ' <td data-Seq="' + (parseInt(index)+1) + '">' + approverSeqNumber + ' Approver</td>';
                    html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
                    html += ' <td ><a  class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
                    html += ' </tr>';
                })
               
                var unmatchedRecord = currentApprovers;
                $.each(DefaulltAccountant, function (cIndex, cItem) {
                    unmatchedRecord = GetunmatchedRecord(unmatchedRecord, 'AccountID', cItem["AccountID"]);
                });
                currentApprovers = unmatchedRecord;
                BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
            }
            
            $el.append(html);
            $('#default-approver-div').hide();
            $('.loader').hide();
        }
       
    }

    var BindApproversAfterDelete = function () {
        
        var html = '';
        var $el = $('#tbl-approvers');
        var approversRowLength = $('#tbl-approvers tr').length;
        if (approversRowLength > 0) {
            $.each($('#tbl-approvers tr'), function (index, item) {
                var suffix = GetNumericSuffix(index + 1);
                var approverSeqNumber = ((index + 1).toString() + suffix);
                var selectedApproverText = $(item).find('[data-approver-name]').attr('data-approver-name');
                var selectedApproverValue = $(item).find('[data-approver]').attr('data-approver')
                html += ' <tr>';
                html += ' <td data-Seq="' + index + 1 + '">' + approverSeqNumber + ' Approver</td>';
                html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
                html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
                html += ' </tr>';
            });
        }
        else {
            html += '<tr data-Empty-Approver-Row="true"><td colspan="3" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
    }

    var BindEditApprovers = function () {
       
        var html = '';
        var $el = $('#tbl-approvers');
        var approvers = $.parseJSON(editBillDetails[5]["Table5"]);
        if (approvers.length > 0) {
            $('#approvers-Div').show();
            approvers = ObjSorter(approvers, 'Sequence', '123');
            $.each(approvers, function (index, item) {
                var suffix = GetNumericSuffix(index + 1);
                var approverSeqNumber = ((index + 1).toString() + suffix);
                var selectedApproverText = ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"]));
                var selectedApproverValue = (item["ApproverID"] == null ? 0 : item["ApproverID"]);
                html += ' <tr>';
                html += ' <td data-Seq="' + (index + 1) + '">' + approverSeqNumber + ' Approver</td>';
                html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
                html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
                html += ' </tr>';
            });
        }
        else {
            html += '<tr data-Empty-Approver-Row="true"><td colspan="3" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
    }

    var BindApproverHistory = function () {
        var $el = $('#tbl-ApproverHistory-Body');
        var html = '';
        var approverHistory = $.parseJSON(editBillDetails[6]["Table6"]);

        if (approverHistory.length > 0) {
            approverHistory = GetDistinctArray(approverHistory, 'ApproveHistoryID');
            approverHistory = ObjSorter(approverHistory, 'ApproveHistoryID', '123');
            $.each(approverHistory, function (index, item) {
                var approvedAmount = (item["ApprovedAmount"]==null?0.00:(item["ApprovedAmount"].replace(/,/g, '')));
                approvedAmount = parseFloat(approvedAmount);
                var balanceAmount = (item["Balance"]==null?0.00:(item["Balance"].replace(/,/g, '')));
                balanceAmount = parseFloat(balanceAmount);
                html += '<tr class="" role="row">';
                html += '<td style="width: 33.33%;">';
                html += '<h2 title="' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '"><a href="#">' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '</a></h2>';
                html += '<h6 class="" >' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format('MM/DD/YYYY')) + '</h6></td>';
                html += '<td style="width: 20.33%;">';
                html += '<h2 title="' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (approvedAmount == "" || approvedAmount == NaN ? '-' : '$' + approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h2>';
                html += '<h6 class="">Balance: ' + (balanceAmount == "" || balanceAmount == NaN ? '-' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h6>';
                html += '</td><td class="text-center" style="width: 33.33%;">';
                html += '<h4 class="isc-app-det-hst-app">' + (item["StatusName"] == null ? '-' : item["StatusName"]) + '</h4></td>';
                html += '<td style="width:10%;">';
                html += '<a class="isc-action-badge-td-s1" title="Comment"  data-History=' + item["ApproveHistoryID"] + '><i class="fa fa-comment-o"></i></a>';
                html += '</td>';
                html += '</tr>';
            });

        }
        else {
            html = '<tr><td colspan="4" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    var BindConfigAccountants = function (DefaulltAccountant) {
        


        
            var html = '';
            var $el = $('#tbl-approvers');

            //var selectedApprover = $('#slt-Approvers').val();
        var DefaulltAccountantconfig = GetmatchedRecord($.parseJSON(masterData[2]["Table2"]), 'IsDefaultAccountant', '1');

        if (DefaulltAccountantconfig.length > 0) {
            DefaulltAccountant = DefaulltAccountantconfig;
        }
              if (DefaulltAccountant != null && DefaulltAccountant != undefined && DefaulltAccountant.length > 0) {
                $('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
                currentApprovers = GetunmatchedRecord(currentApprovers, 'AccountID', DefaulltAccountant[0]["AccountID"]);
                //BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
                $('#slt-Approvers').select2();
                if (DefaulltAccountant != null && DefaulltAccountant != undefined && DefaulltAccountant.length > 0) {
                    DefaulltAccountant = GetDistinctArray(DefaulltAccountant, 'AccountID');
                    DefaulltAccountant = ObjSorter(DefaulltAccountant, "ApproverSeqence", '123');
                    $.each(DefaulltAccountant, function (index, item) {
                        var selectedApproverText = ((item["FirstName"] == null ? '' : item["FirstName"]) + ' ' + (item["LastName"] == null ? '' : item["LastName"]))
                        var selectedApproverValue = (item["AccountID"] == null ? 0 : parseInt(item["AccountID"]));
                        var approversRowLength = $('#tbl-approvers tr').length;
                        approversRowLength = approversRowLength + 1;
                        var suffix = GetNumericSuffix(parseInt(index) + 1);
                        var approverSeqNumber = ((parseInt(index) + 1) + suffix);
                        html += ' <tr>';
                        html += ' <td data-Seq="' + (parseInt(index) + 1) + '">' + approverSeqNumber + ' Approver</td>';
                        html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
                        html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
                        html += ' </tr>';
                    });
                    var unmatchedRecord = currentApprovers;
                    $.each(DefaulltAccountant, function (cIndex, cItem) {
                        unmatchedRecord = GetunmatchedRecord(unmatchedRecord, 'AccountID', cItem["AccountID"]);
                    });
                    currentApprovers = unmatchedRecord;
                    BindApprovers($('#slt-Approvers'), currentApprovers, 'Choose Approver Name');
                }

                $el.html(html);
            }

        //}
        //else {
        //    BindDefaultAccountant();
        //}
    }
}
//Data Manipulation
{
    var GetCreateBillMasterData = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("CreateNewBill.aspx/GetMasterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var InsertBill = function (actionKey) {
       
        var vendor = $('#vendor-Name').val();
        var billNumber = $('#bill-Number').val();
        var billDescription = $('#bill-Description').val();
        var billAmount = $('#bill-Amount').val();
        billAmount = billAmount.replace(/,/g, '');
        billAmount = parseFloat(billAmount);
        var paymentTerm = $('#payment-Terms').val();
        var invoiceDate = $('#invoice-Date').val();
        if (invoiceDate == "") {
            invoiceDate = moment();
        }
        var dueDate = $('#due-Date').val();
        var isSplited = 50014;
        var status = 0;
        if (actionKey == 1) {
            status = 50019
        }
        else {
            status = 50016
        }
        var bty = $('#tbl-Split-Body tr[data-is-added="true"]');
        var billDescriptionsList = $('#tbl-description-Body tr[data-is-added="true"]');
        var descriptionArray = [];
        var objSplitedlist = [];
        var objAttachmentList = [];
        var objNotesList = [];
        var objApproversList = [];
        var isAutoApproval = 0;
        var comment = '';
        var clerkName = ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + ' ' + (loggerDetails["LastName"] == null ? ' ' : loggerDetails["LastName"]));
        var approverHistoryObj = {};
        //Load the billdescriptions in array
        if (billDescriptionsList.length > 0) {
            isSplited = 50013;
            $.each(billDescriptionsList, function (index, item) {
                var description = $(item).find('[data-Desc]').val();
                var rate = $(item).find('[data-Rate]').val();
                rate = rate.replace(/,/g, '');
                var quantity = parseInt($(item).find('[data-Quantity]').val());
                var total = $(item).find('[data-Total]').val();
                total = total.replace(/,/g, '');
                total = parseFloat(total);
                var descriptionObject = {
                    'Rate': (rate == "" ? 0 : parseFloat(rate)),

                    'Quantity': (quantity == "" ? 0 : quantity),
                    'Total': (total == "" ? 0 : total),
                    'Description': description
                }
                descriptionArray.push(descriptionObject);
            });
        }

        //Load the Default breakage obj data
        var objdefaultBreakage = {
            'Amount': billAmount,
            'Description': billDescription,
            'AccountName': '0',
            'Status': status,

        };

        objSplitedlist.push(objdefaultBreakage);

        //Load the splited amount details in objecttbl-Split-Body
        var amountList = $('#tbl-Split-Body tr');
        if (amountList.length > 0) {
           
            isSplited = 50013
            $.each(amountList, function (index, item) {
                var accountType = $(item).find('[data-account]').attr('data-account');
                var amoutItem = $(item).find('[data-amount]').attr('data-amount');
                var accountGLID = $(item).find('[data-AccountID]').attr('data-AccountID');
                amoutItem = amoutItem.replace(/,/g, '')
                amoutItem = parseFloat(amoutItem);
                var description = $(item).find('[data-description]').attr('data-description');
                var objBreakage = {
                    'Amount': amoutItem,
                    'Description': description,
                    'AccountName': accountType,
                    'GLAccountID': accountGLID,
                    'Status': status,
                }
                objSplitedlist.push(objBreakage);
            });
        }
        else {
           
            isSplited = 50014
        }

        //Checking Auto Approval Status
        if ($('#auto-Approval').is(':checked')) {
            //status = 50015;
            isAutoApproval = 1;
        }
        else {
            isAutoApproval = 0;
        }

        if ($('#auto-Approval').is(':checked') && actionKey != 1) {
            status = 50015;
            comment = "Auto Approved by System on "+moment().format("MM/DD/YYYY")+" for amount $" + billAmount + " .Bill submited by " + clerkName + "";
        }
        //Load Attchment list in obj
        var billAttachmentList = $('#tbl-Attatchments-Body  tr[data-Empty-Document-Row="false"]');
        if (billAttachmentList.length > 0) {
            $.each(billAttachmentList, function (index, item) {
                var fileName = $(item).find('[data-fileName]').attr('data-fileName');
                var physicalFileName = $(item).find('[data-file-PhyName]').attr('data-file-PhyName');
                var size = $(item).find('[data-file-Size]').attr('data-file-Size');
                var physicalPath = $(item).find('[data-phy-Location]').attr('data-phy-Location');
                var extension = $(item).find('[data-extension]').attr('data-extension');
                var isBillFile = $(item).find('[data-Delete-Bill]').attr('data-Delete-Bill');
                var objAttachment = {
                    'FileName': fileName,
                    'PhysicalFileName': physicalFileName,
                    'Size': size,
                    'PhysicalPath': physicalPath,
                    'Extension': extension,
                    'IsBillFile':parseInt(isBillFile)
                }
                objAttachmentList.push(objAttachment);
            })
        }

        //Load Notes list in Obj
      
        var billNotesList = $('#bill-Notes-Block p');
        if (billNotesList.length > 0) {
            $.each(billNotesList, function (index, item) {
                var notes = $(item).find('[data-Notes]').attr('data-Notes');
                var notesOn = $(item).find('[data-CommentOn]').attr('data-CommentOn');
                var notesObj = {
                    'Comment': notes,
                    'CommentOn': notesOn
                }
                objNotesList.push(notesObj);
            });
        }

        //Load Approvers List in Obj
        if (!$('#auto-Approval').is(':checked')) {
            var approversList = $('#tbl-approvers tr')
            if (approversList.length > 0) {
                $.each(approversList, function (index, item) {
                    var seq = $(item).find('[data-Seq]').attr('data-Seq');
                    seq=parseInt(seq)
                    var approverId = $(item).find('[data-approver]').attr('data-approver');
                    var approverObj = {};
                    
                    if (seq == '1') {
                        approverObj = {
                            'ApproverID': parseInt(approverId),
                            'Sequence': parseInt(seq + "0"),
                            'StageInitiated': 1,
                            'CurrentStageApproval': 1,
                        }
                    }
                    else {
                        approverObj = {
                            'ApproverID': parseInt(approverId),
                            'Sequence': parseInt(seq + "0"),
                            'StageInitiated': 0,
                            'CurrentStageApproval': 0,
                        }
                    }

                    objApproversList.push(approverObj);
                });
            }
        }
       
      

        //Get the frequency count before insert bill
        GetFrequencyCount();
        if ($('#slt-Frquency').val() == "0" && frequencyCount == 0)
        {
            var obj = {
                'VendorID': parseInt(vendorID),
                'BillDate': invoiceDate,
                'Amount': billAmount,
                'InvoiceNumber': billNumber,
                'DueDate': dueDate,
                'PaymentTerms': parseInt(paymentTerm),
                'Description': billDescription,
                'IsSplitted': isSplited,
                'Status': status,
                'PhysicalLocation': billFileResponse["PhysicalLocation"] == null ? '' : billFileResponse["PhysicalLocation"],
                'FileDisplayName': billFileResponse["FileDisplayName"] == null ? '' : billFileResponse["FileDisplayName"],
                'FileName': billFileResponse["ModifiedFileName"] == null ? '' : billFileResponse["ModifiedFileName"],
                'FileSize': parseFloat(billFileSize),
                'ReminderEmail': '',
                'ReminderInterval': 0,
                'ReminderIntervalDay': '',
                'IsRecurring': 0,
                'IsAutoApproval': isAutoApproval,
                'Comment':comment,
                'RecurrenceStartDate': moment(),
                'RecurrenceEndDate': moment(),
                'RecurrenceBatchNumber': 0,
                'RecurrenceFrequency': 0,
                'lstBillBreakage': objSplitedlist,
                'lstBillDescription': descriptionArray,
                'lstBillAttchments': objAttachmentList,
                'lstBillNotes': objNotesList,
                'lstApprovers': objApproversList,
                'Customer': parseInt($('#slt-Customer').val()),
                'Project': parseInt($('#slt-Project').val()),
                'BillCategory': parseInt($('#slt-Category').val()),
                'ClerkName': ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + ' ' + (loggerDetails["LastName"] == null ? ' ' : loggerDetails["LastName"]))
            }

            var object = {
                'billObject': obj
            }

            var objSplitedlist = [];

            var tempList = {};
            $.when(RequestServer("CreateNewBill.aspx/InsertBill", object)).done(function (response) {
                tempList = $.parseJSON(response);
               
                if (parseInt(response) > 0) {
                    if (status == 50019) {
                        $.notify("Bill saved successfully.", { position: "right top", className: "success" });
                        GoBack();
                        // window.location.replace("Bill_UserHome.aspx");
                    }
                    else {
                        $.notify("Bill submitted successfully.", { position: "right top", className: "success" });
                       // window.location.replace("Bill_UserHome.aspx");
                        GoBack();
                    }
                 
                    GoBack();
                }
                else {
                    $.notify("Server error occured while inserting a bill !! ", { position: "right top", className: "error" });
                }

            });
           // return tempList;
        }
        else {
            //Saving Default bill 
            var tempRecurList = {};
            var randomNumber = Math.floor((Math.random() * 100000) + 1);
            var obj = {
                'ClerkName': ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + ' ' + (loggerDetails["LastName"] == null ? ' ' : loggerDetails["LastName"])),
                'VendorID': parseInt(vendorID),
                'BillDate': invoiceDate,
                'Amount': billAmount,
                'InvoiceNumber': billNumber,
                'DueDate': dueDate,
                'PaymentTerms': parseInt(paymentTerm),
                'Description': billDescription,
                'IsSplitted': isSplited,
                'Status': status,
                'PhysicalLocation': billFileResponse["PhysicalLocation"] == null ? '' : billFileResponse["PhysicalLocation"],
                'FileDisplayName': billFileResponse["FileDisplayName"] == null ? '' : billFileResponse["FileDisplayName"],
                'FileName': billFileResponse["ModifiedFileName"] == null ? '' : billFileResponse["ModifiedFileName"],
                'FileSize': parseFloat(billFileSize),
                'ReminderEmail': '',
                'ReminderInterval': 0,
                'ReminderIntervalDay': '',
                'IsRecurring': 1,
                'IsAutoApproval': isAutoApproval,
                'Comment': comment,
                'RecurrenceStartDate': moment($('#recurring-Start-Date').val()),
                'RecurrenceEndDate': moment($('#recurring-End-Date').val()),
                'RecurrenceBatchNumber': randomNumber,
                'RecurrenceFrequency': parseInt($('#slt-Frquency').val()),
                'lstBillBreakage': objSplitedlist,
                'lstBillDescription': descriptionArray,
                'lstBillAttchments': objAttachmentList,
                'lstBillNotes': objNotesList,
                'lstApprovers': objApproversList,
                'Customer': parseInt($('#slt-Customer').val()),
                'Project': parseInt($('#slt-Project').val()),
                'BillCategory': parseInt($('#slt-Category').val()),
            }

            var object = {
                'billObject': obj
            }

            var objSplitedlist = [];

          
            $.when(RequestServer("CreateNewBill.aspx/InsertBill", object)).done(function (response) {
                tempRecurList = response;
            });
         

            //Looping Frequency count and Saving Recurrence Bills

            var i;
            for (i = 1; i <= frequencyCount; i++)
            {
                var addValue = i * frequencyIncrement;
                var frequencyDueDate = moment($('#recurring-Start-Date').val()).add(addValue, frequencyType).add(-1, 'd');
                var obj = {
                    'VendorID': parseInt(vendorID),
                    'BillDate': invoiceDate,
                    'Amount': billAmount,
                    'InvoiceNumber': billNumber,
                    'DueDate': frequencyDueDate,
                    'PaymentTerms': parseInt(paymentTerm),
                    'Description': billDescription,
                    'IsSplitted': isSplited,
                    'Status': status,
                    'PhysicalLocation': billFileResponse["PhysicalLocation"] == null ? '' : billFileResponse["PhysicalLocation"],
                    'FileDisplayName': billFileResponse["FileDisplayName"] == null ? '' : billFileResponse["FileDisplayName"],
                    'FileName': billFileResponse["ModifiedFileName"] == null ? '' : billFileResponse["ModifiedFileName"],
                    'FileSize': parseFloat(billFileSize),
                    'ReminderEmail': '',
                    'ReminderInterval': 0,
                    'ReminderIntervalDay': '',
                    'IsRecurring': 1,
                    'IsAutoApproval': isAutoApproval,
                    'Comment': comment,
                    'RecurrenceStartDate': moment($('#recurring-Start-Date').val()),
                    'RecurrenceEndDate': moment($('#recurring-End-Date').val()),
                    'RecurrenceBatchNumber': randomNumber,
                    'RecurrenceFrequency': parseInt($('#slt-Frquency').val()),
                    'lstBillBreakage': objSplitedlist,
                    'lstBillDescription': descriptionArray,
                    'lstBillAttchments': objAttachmentList,
                    'lstBillNotes': objNotesList,
                    'lstApprovers': objApproversList,
                    'Customer': parseInt($('#slt-Customer').val()),
                    'Project': parseInt($('#slt-Project').val()),
                    'BillCategory': parseInt($('#slt-Category').val()),
                }

                var object = {
                    'billObject': obj
                }

                var objSplitedlist = [];

              
                $.when(RequestServer("CreateNewBill.aspx/InsertBill", object)).done(function (response) {
                    tempRecurList = $.parseJSON(response);
                });
             
            }

            if (parseInt(tempRecurList) > 0) {
                if (status == 50019) {
                    $.notify("Bill saved successfully.", { position: "right top", className: "success" });
                }
                else {
                    $.notify("Bill submitted successfully.", { position: "right top", className: "success" });
                }
                GoBack();
            }
            else {
                $.notify("Server error occured while inserting a bill !! ", { position: "right top", className: "error" });
            }
            

        }


     

    }

    var GetEditBillDetails = function () {
        var _obj = {
            'billId':editBillId
        }
        var tempList = {};
        $.when(RequestServer("CreateNewBill.aspx/GetEditBillDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateBill = function (actionKey) {
        var vendor = $('#vendor-Name').val();
        var billNumber = $('#bill-Number').val();
        var billDescription = $('#bill-Description').val();
        var billAmount = $('#bill-Amount').val();
        billAmount = billAmount.replace(/,/g, '');
        billAmount = parseFloat(billAmount);
        var paymentTerm = $('#payment-Terms').val();
        var invoiceDate = $('#invoice-Date').val();
        if (invoiceDate == "") {
            invoiceDate = moment();
        }
        var dueDate = $('#due-Date').val();
        var isSplited = 50014
        var isAutoApproval = 0;
        var comment = '';
        var clerkName = ((loggerDetails["FirstName"] == null ? '' : loggerDetails["FirstName"]) + ' ' + (loggerDetails["LastName"] == null ? ' ' : loggerDetails["LastName"]));
        var status = 0;
        if (actionKey == 1) {
            status = 50019
        }
        else {
            status = 50016
        }
        var billDescriptionsList = $('#tbl-description-Body tr[data-is-added="true"]');
        var descriptionArray = [];
        var objSplitedlist = [];
        var objAttachmentList = [];
        var objNotesList = [];
        var isApplyToAll = 0;
        var objApproversList = [];
        //Load the billdescriptions in array
        if (billDescriptionsList.length > 0) {
            isSplited = 50013;
            $.each(billDescriptionsList, function (index, item) {
                var description = $(item).find('[data-Desc]').val();
                var rate = $(item).find('[data-Rate]').val();
                rate = rate.replace(/,/g, '');
                var quantity = $(item).find('[data-Quantity]').val();
                var total = $(item).find('[data-Total]').val();
                total = total.replace(/,/g, '');
               // total = parseFloat(total);
                var descriptionObject = {
                    'Rate': (rate == "" ? 0 : parseFloat(rate)),
                    'Quantity': (quantity == '' ? 0 : quantity),
                    'Total': (total == "" ? 0 : parseFloat(total)),
                    'Description': description
                }
                descriptionArray.push(descriptionObject);
            });
        }

        //Load the Default breakage obj data
        var objdefaultBreakage = {
            'Amount': billAmount,
            'Description': billDescription,
            'AccountName': '0',
            'Status': status,

        };

        objSplitedlist.push(objdefaultBreakage);

        //Load the splited amount details in object
        var amountList = $('#tbl-Split-Body tr');
        if (amountList.length > 0) {
            
            isSplited = 50013
            $.each(amountList, function (index, item) {
                var accountType = $(item).find('[data-account]').attr('data-account');
                var amoutItem = $(item).find('[data-amount]').attr('data-amount');
                var accountGLID = $(item).find('[data-AccountID]').attr('data-AccountID');
                amoutItem = amoutItem.replace(/,/g, '')
                amoutItem = parseFloat(amoutItem);
                var description = $(item).find('[data-description]').attr('data-description');
                var objBreakage = {
                    'Amount': amoutItem,
                    'Description': description,
                    'AccountName': accountType,
                    'GLAccountID': accountGLID,
                    'Status': status,
                }
                objSplitedlist.push(objBreakage);
            });
        }
        else {
           
            isSplited = 50014
        }

        //Load Attchment list in obj
        var billAttachmentList = $('#tbl-Attatchments-Body  tr[data-Empty-Document-Row="false"]');
        if (billAttachmentList.length > 0) {
            $.each(billAttachmentList, function (index, item) {
                var fileName = $(item).find('[data-fileName]').attr('data-fileName');
                var physicalFileName = $(item).find('[data-file-PhyName]').attr('data-file-PhyName');
                var size = $(item).find('[data-file-Size]').attr('data-file-Size');
                var physicalPath = $(item).find('[data-phy-Location]').attr('data-phy-Location');
                var extension = $(item).find('[data-extension]').attr('data-extension');
                var isBillFile = $(item).find('[data-Delete-Bill]').attr('data-Delete-Bill');
                var objAttachment = {
                    'FileName': fileName,
                    'PhysicalFileName': physicalFileName,
                    'Size': size,
                    'PhysicalPath': physicalPath,
                    'Extension': extension,
                    'IsBillFile': parseInt(isBillFile)
                }
                objAttachmentList.push(objAttachment);
            })
        }

        //Load Notes list in Obj

        var billNotesList = $('#bill-Notes-Block p');
        if (billNotesList.length > 0) {
            $.each(billNotesList, function (index, item) {
                var notes = $(item).find('[data-Notes]').attr('data-Notes');
                var notesOn = $(item).find('[data-CommentOn]').attr('data-CommentOn');
                var notesObj = {
                    'Comment': notes,
                    'CommentOn': notesOn
                }
                objNotesList.push(notesObj);
            });
        }

        //Checking Auto Approval Status
        if ($('#auto-Approval').is(':checked')) {
           // status = 50015;
            isAutoApproval = 1;
        }
        else {
            isAutoApproval = 0;
        }

        if ($('#auto-Approval').is(':checked') && actionKey != 1) {
            status = 50015
            comment = "Auto Approved by System on " + moment().format("MM/DD/YYYY") + " for amount $" + billAmount + " .Bill submited by " + clerkName + "";
        }

        if ($('#update-Apply-All').is(':checked')) {
            isApplyToAll = 1;
        }
        else {
            isApplyToAll = 0;
        }
        var billInfo = $.parseJSON(editBillDetails[0]['Table']);
        //Load Approvers List in Obj
        if (!$('#auto-Approval').is(':checked')) {
            var approversList = $('#tbl-approvers tr')
            if (approversList.length > 0) {
                $.each(approversList, function (index, item) {
                    var seq = ($(item).find('[data-Seq]').attr('data-Seq') == null ? 0 : $(item).find('[data-Seq]').attr('data-Seq'));
                  
                    var approverId = $(item).find('[data-approver]').attr('data-approver');
                    var approverObj = {};
                    if (parseInt(seq) == 1) {
                        approverObj = {
                            'ApproverID': parseInt(approverId),
                            'Sequence': parseInt(seq + "0"),
                            'StageInitiated': 1,
                            'CurrentStageApproval': 1,
                        }
                    }
                    else {
                        approverObj = {
                            'ApproverID': parseInt(approverId),
                            'Sequence': parseInt(seq + "0"),
                            'StageInitiated': 0,
                            'CurrentStageApproval': 0,
                        }
                    }

                    objApproversList.push(approverObj);
                });
            }
        }
        var obj = {
            'BillID':parseInt(editBillId),
            'VendorID': parseInt(vendorID),
            'BillDate': invoiceDate,
            'Amount': billAmount,
            'InvoiceNumber': billNumber,
            'DueDate': dueDate,
            'PaymentTerms': parseInt(paymentTerm),
            'Description': billDescription,
            'IsSplitted': isSplited,
            'IsAutoApproval': isAutoApproval,
            "Comment":comment,
            'Status': status,
            'PhysicalLocation': (billFileResponse["PhysicalLocation"] == undefined ? billInfo[0]['PhysicalLocation'] : billFileResponse["PhysicalLocation"]),
            'FileDisplayName': (billFileResponse["FileDisplayName"] == undefined ? billInfo[0]['FileDisplayName'] : billFileResponse["FileDisplayName"]),
            'FileName': (billFileResponse["ModifiedFileName"] == undefined ? billInfo[0]['FileName'] : billFileResponse["ModifiedFileName"]),
            'FileSize': (parseFloat(billFileSize) == 0 ? parseFloat(billInfo[0]['FileSize']) : parseFloat(billFileSize)),
            'ReminderEmail': '',
            'ReminderInterval': 0,
            'ReminderIntervalDay': '',
            'IsRecurring': parseInt(billInfo[0]['IsRecurring']),
            'RecurrenceEndDate':($('#recurring-End-Date').val()==''?moment(): moment($('#recurring-End-Date').val())),
            'RecurrenceBatchNumber': billInfo[0]['RecurrenceBatchNumber'],
            'IsApplyToAll': isApplyToAll,
            'lstBillBreakage': objSplitedlist,
            'lstBillDescription': descriptionArray,
            'lstBillAttchments': objAttachmentList,
            'lstBillNotes': objNotesList,
            'lstApprovers': objApproversList,
            'Customer': parseInt($('#slt-Customer').val()),
            'Project': parseInt($('#slt-Project').val()),
            'BillCategory': parseInt($('#slt-Category').val()),
        }

        var object = {
            'billObject': obj
        }

        var objSplitedlist = [];

        var tempList = {};
        $.when(RequestServer("CreateNewBill.aspx/UpdateBill", object)).done(function (response) {
            if (response != null)
            {
                if (status == 50019) {
                    $.notify("Bill updated successfully.", { position: "right top", className: "success" });
                }
                else {
                    $.notify("Bill updated and submitted successfully.", { position: "right top", className: "success" });
                }
                GoBack();
            }
            else {
                $.notify("Server error occured while updating a bill !! ", { position: "right top", className: "error" });
            }
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

    var GetVendor = function (vendorName) {
        var _obj = {
            'VendorName': vendorName
        }
        var tempList = {};
        $.when(RequestServer("CreateNewBill.aspx/GetVendors", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var InsertVendor = function () {
        var vendorName = $('#txt-AV-Vendor-Name').val();
        var email = $('#txt-Email').val();
        var contactNumber = $('#txt-Contact-Number').val();
        var prefPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var paymentTerms = $('#slt-Payment-Terms').val();
        var GLcode = $('#slt-GL-Codes').val();

        //vendor Details obj
        var vendorDetailObj = {
            'VendorName': vendorName,
            'Email': email,
            'Phone': contactNumber,
            'PrefferedPaymentMethod': parseInt(prefPaymentMethod),
            'PaymentTerm': parseInt(paymentTerms),
            'GLCode': GLcode,
        }
        var vendorObj = {
            'Vendor': vendorDetailObj,
        }

        var insertObj = {
            'vendorDetails': vendorObj
        }

        $.when(RequestServer("CreateNewBill.aspx/InsertVendor", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                
                $('#txt-Vendor-Name').val($('#txt-AV-Vendor-Name').val());
              
                //var rty = $('#slt-GL-Codes').val();
                $('#slt-Category').val($('#slt-GL-Codes').val());
                $('#slt-Category').select2();
                vendorID = parseInt(response)
                
                ResetAddVendorFields();
                $('#Mp_New_Vendor').hide();
                var vendorDetails = GetVendor('');
                var exactlyMatchedVendor = vendorDetails["ExactVendor"];
                var likeLyMatchedVendor = vendorDetails["LikelyVendors"];
                vendorList = likeLyMatchedVendor
                BindLikelyMatchedVendors(likeLyMatchedVendor);
              //  var $modal = $('#Mp_New_Vendor');
            //    $modal.modal('hide');
                if (paymentTerms != 0) {
                    
                    $('#payment-Terms').val(paymentTerms);
                    $('#payment-Terms').select2();
                }
                else {
                    $('#payment-Terms').val(50009);
                    $('#payment-Terms').select2();
                }

                $.notify("Vendor created successfully !!", { position: "right top", className: "success" });
            
            }
            else {
                $.notify("This vendor name/Email id has already been created !!", { position: "right top", className: "error" });
            }
        });
    }
}
//Common 
{

    var CalculateDueDate = function (paymentTermVal) {
        paymentTermVal = parseInt(paymentTermVal);
        var dateNumber = GetDateNumber(paymentTermVal);
        if ($('#invoice-Date').val() != '') {
            var dueDate = ''
            if (dateNumber != 0) {
                dueDate = moment($('#invoice-Date').val()).add(dateNumber, 'day').format('MM/DD/YYYY');
            }
            else {
                dueDate = moment($('#invoice-Date').val()).format('MM/DD/YYYY')
            }

            $('#due-Date').datepicker('setDate', dueDate);
        }
        else {
            var dueDate = moment().add(dateNumber, 'day').format('MM/DD/YYYY');
            $('#due-Date').datepicker('setDate', dueDate);
        }
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
            case 50071:
                dateValue = 20;
                break;
            default:
                dateValue = 0;

        }
        return dateValue;
    }

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

    var BindCategoryDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'Value1');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');

            $.each(distinctlst, function (index, item) {
                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
            });
        }
        $el.html(html);
    }

    var BindGLDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'GLNumber');
            distinctlst = ObjSorter(distinctlst, "GLDescription", '123');
           
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["IdentityID"] + '" data-GL="' + (item["GLNumber"] == null ? '-' : item["GLNumber"]) + '">' + (item["GLDescription"] == null ? '-' : item["GLDescription"]) + '</option>';



            });
        }
        $el.html(html);
    }

    var BindDropDownsBySequence = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value2", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';



            });
        }
        $el.html(html);
    }

    var BindDropDownSelected = function ($el, lst, DefaultItem, selected) {
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

    var BindApprovers = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'AccountID');
            distinctlst = ObjSorter(distinctlst, "FirstName", '123');
            
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["AccountID"] + '">' + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + '</option>';

            });
        }
        $el.html(html);
    }

    var BindVendors = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'VendorID');
            distinctlst = ObjSorter(distinctlst, "VendorName", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {

                html += '<option value="' + item["VendorID"] + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</option>';



            });
        }
        $el.html(html);
    }

    //$(document).on('keydown', 'input[data-type=currency]', function () {

    //    if ($(this).attr("data-textbox") == "amount" && $(this).VAL != '') {
    //        $('#split-Amount-Validation').hide();
    //    }
    //    if ($(this).attr("data-textbox") == "billAmount" && $(this).VAL != '') {
    //        $('#billAmount-Validation').hide();
    //    }
    //    formatCurrency($(this));
      
    //});

    $(document).on('change', '[data-textbox]', function () {
        var $this = $(this);
        var VAL = $this.val();
        var pattern = /^[a-zA-Z' ]*$/
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
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
      
        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    var ValidateSplitAmount = function () {
        var account = $('#slt-Account').val();
        var description = $('#split-Description').val();
        var amount = $('#split-Amount').val();
        var isValid = true;
        if (amount == "" || amount == null) {
            isValid = false;
            
            $('#split-Amount-Validation').show();
            // $.notify("Last name should not be empty!", { position: "right top", className: "error" });
        }

        if (account == "" || account == '0') {
            isValid = false;
            $('#account-Validation').show();
           
            // $.notify("Role should not be empty!", { position: "right top", className: "error" });
        }

        var isSelected = GetmatchedRecord(selectedAccounts, 'selectedID', account);
        if (isSelected.length > 0) {
            isValid = false;
            $.notify("Please choose the different account for split the bill!!", { position: "right top", className: "error" });
        }
        return isValid;
    }

    var ValidateBill = function () {
        
        var isValid = true;
        var isAlreadyNotified = false;
        var vendor = $('#vendor-Name').val();
        var vendorname = $('#txt-Vendor-Name').val();
        
        var billNumber = $('#bill-Number').val();
        var billDescription = $('#bill-Description').val();
        var billAmount = $('#bill-Amount').val();
        billAmount = billAmount.replace(/,/g, '')
        var paymentTerm = $('#payment-Terms').val();
        var invoiceDate = $('#invoice-Date').val();
        var category = $('#slt-Category').val();
        var enteredAmount = 0;
        var descriptionTotal = 0;
        var dueDate = $('#due-Date').val();
        var vendorDetails = [];
        if (billNumber == "" || billNumber == null || billAmount == "" || billAmount == null || invoiceDate == "" || invoiceDate == null || dueDate == "" || dueDate == null || vendor == "" || vendor == '0'  || vendorname == "" || vendorname==null) {
            isValid = false;
            $.notify("Please fill all the mandatory fields.", { position: "right top", className: "error" });
            return false;
            //$('#billId-Validation').show();
           
        }

        //if (billAmount == "" || billAmount == null) {
        //    isValid = false;
        //    $.notify("Amount should not be empty.", { position: "right top", className: "error" });
        //    //$('#billAmount-Validation').show();
        //}
        //if (invoiceDate == "" || invoiceDate == null) {
        //    isValid = false;
        //    $.notify("Invoice Date should not be empty.", { position: "right top", className: "error" });
        //    //$('#InvoiceDate-Validation').show();
            
        //}
        //if (dueDate == "" || dueDate == null) {
        //    isValid = false;
        //    $.notify("Due Date should not be empty.", { position: "right top", className: "error" });
        //    //$('#dueDate-Validation').show();
            
        //}
        //if (vendor == "" || vendor == '0') {
        //    isValid = false;
        //    $.notify("Vendor Name should not be empty.", { position: "right top", className: "error" });
        //    //$('#vendor-Name-Validation').show();

        //}
        //if (paymentTerm == "" || paymentTerm == '0') {
        //    isValid = false;
        //    //$('#PaymentTerm-Validation').show();

        //    $.notify("Payment Terms should not be empty.", { position: "right top", className: "error" });
        //}
        //if (category == "" || category == '0') {
        //    isValid = false;
        //    //$('#PaymentTerm-Validation').show();

        //    $.notify("Bill Category should not be empty.", { position: "right top", className: "error" });
        //}

       
       
            var amountList = $('#tbl-Split-Body tr');
            if (amountList.length > 0) {
                $.each(amountList, function (index, item) {
                    var amoutItem = $(item).find('[data-amount]').attr('data-amount');
                    amoutItem = amoutItem.replace(/,/g, '')
                    enteredAmount = enteredAmount + parseFloat(amoutItem);
                });
                if (parseFloat(billAmount) != parseFloat(enteredAmount.toFixed(2))) {
                    isValid = false;
                    isAlreadyNotified = true;
                    $.notify("Bill amount and splited amount are not equal.", { position: "right top", className: "error" });
                }

        }
        
        if (desciptionstatus != 1) {
            var billDescriptionsList = $('#tbl-description-Body tr[data-is-added="true"]');

            if (billDescriptionsList.length > 0) {

                $.each(billDescriptionsList, function (index, item) {
                    var total = $(item).find('[data-Total]').val();
                    total = total.replace(/,/g, '');
                    total = parseFloat(total);
                    descriptionTotal = descriptionTotal + total;
                });
                if (parseFloat(billAmount) != parseFloat(descriptionTotal.toFixed(2))) {
                    isValid = false;
                    isAlreadyNotified = true;
                    $.notify("Bill amount and description list total amount are not equal.", { position: "right top", className: "error" });
                }
            }
        }
      
        if ($('#slt-Frquency').val() != "0") {
            var reccuringStartDate = $('#recurring-Start-Date').val();
            var reccuringEndDate = $('#recurring-End-Date').val();
            if (reccuringStartDate == "" || reccuringStartDate == null) {
                isValid = false;
                $.notify("Recurrence Start Date should not be empt.", { position: "right top", className: "error" });

                //$('#reccStartDate-Validation').show();

            }
            if (reccuringEndDate == "" || reccuringEndDate == null) {
                isValid = false;
                $.notify("Recurrence End Date should not be empt.", { position: "right top", className: "error" });
                //$('#reccEndDate-Validatiokn').show();

            }
        }

        if (isAttchment == 0) {
           
            isValid = false;
            isAlreadyNotified = true;
            $.notify("Select the attachment for this bill.", { position: "right top", className: "error" });
            return false;
        }

        $('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
        var approversList = $('#tbl-approvers tr')
       
        if (!$('#auto-Approval').is(':checked') && approversList.length == 0) {
            isValid = false;
            isAlreadyNotified = true;
            $.notify("Select at least one approver or check the Auto Approval box.", { position: "right top", className: "error" });
            return false;
        }
       
       
        if ($.trim($('#txt-Vendor-Name').val()) != '') {

          vendorDetails = GetVendor($('#txt-Vendor-Name').val());
            var exactVendor = vendorDetails["ExactVendor"];
            
                
               
                if (exactVendor == null || exactVendor == undefined || exactVendor.length == 0) {
                    vendorID = 0;
                    isValid = false;
                    isAlreadyNotified = true;
                    $.notify("Vendor does not exist.Please add this vendor before uploading this bill.", { position: "right top", className: "error" });
                }
                else {
                    vendorID = (exactVendor[0]["VendorID"] == null ? 0 : parseInt(exactVendor[0]["VendorID"]));
                }
        }
        else {
            isValid = false;
            $.notify("Vendor Name should not be empty.", { position: "right top", className: "error" });
            //$('#vendor-Name-Validation').show();
        }

        if ($.trim($('#bill-Number').val()) != '') {
            var existingInvoices = vendorDetails["InvoiceNumbers"];
            if (existingInvoices != null && existingInvoices != undefined && existingInvoices.length > 0) {
                if (editBillId != 0)
                {
                    var currentBillDetails = $.parseJSON(editBillDetails[0]["Table"]);
                    existingInvoices = GetunmatchedRecord(existingInvoices, 'InvoiceNumber', currentBillDetails[0]["InvoiceNumber"]);
                }
                var matchedInvoice = GetmatchedRecord(existingInvoices, 'InvoiceNumber', $.trim($('#bill-Number').val()));
                if (matchedInvoice.length > 0) {
                    $.notify("This Bill # already exists; please enter another Bill #.", { position: "right top", className: "error" });
                    //$('#billId-Exists').show();
                    isValid = false;
                }
            }
        }
        //if (($('#recurring-Start-Date').val() != '' || $('#recurring-End-Date').val() != '' || $('#slt-Frquency').val() != '0') && ($('#recurring-Start-Date').val() == '' || $('#recurring-End-Date').val() == '' || $('#slt-Frquency').val() == '0'))
        //{
        //    isValid = false;
        //    $.notify("Enter all the details or Clear all the details of the recurring block", { position: "right top", className: "error" });
        //}


        //Bill Validate with File
        {
            //var enteredAmount = billAmount.split('').filter(n => n !== ',').join('');
            //var payableAmount = billFileResponse.TotalAmount
            //if (billAmount != '') {
            //    if (parseFloat(enteredAmount) != parseFloat(payableAmount)) {
            //        isValid = false;
            //        $('#billAmount-NotMatched').show();
            //    }
            //}
            //if (billFileResponse.VendorName != '' && $.trim($('#txt-Vendor-Name').val()) != '') {
            //    if (billFileResponse.VendorName != $.trim($('#txt-Vendor-Name').val())) {
            //        isValid = false;
            //        $('#vendor-Name-NotMatched').show();
            //    }
            //}
            //if (billNumber != '' && billFileResponse.InvoiceNumber!='') {
            //    if (billFileResponse.InvoiceNumber != $.trim(billNumber)) {
            //        isValid = false;
            //        $('#billId-NotMatched').show();
            //    }
            //}
            //if (invoiceDate != '' && billFileResponse.TransactionDate != '') {
            //    if (moment(invoiceDate).format('MM/DD/YYYY') != moment(billFileResponse.TransactionDate).format('MM/DD/YYYY')) {
            //        isValid = false;
            //        $('#InvoiceDate-NotMatched').show();
            //    }
            //}
        }


        if (!isValid && !isAlreadyNotified)
        {
           // $.notify("Fields with an asterisk are required.", { position: "right top", className: "error" });
        }

        if ($('#radioYes').prop('checked') && billDescriptionsList.length == 0){
            isValid = false;
            $.notify("Bill Description should not be empty", { position: "right top", className: "error" });
        }

        return isValid;
    }

    var ClearAllFields = function () {
        $('#vendor-Name').val('0');
        $('#bill-Number').val('');
        $('#bill-Description').val('');
        $('#bill-Amount').val('');
        $('#payment-Terms').val('');
        $('#invoice-Date').val('');
        $('#due-Date').val('');
        $('#tbl-description-Body').html('');
        BindNewDescriptionRow();
        $('#auto-Approval').is(':checked', false);
        $('#recurring-Start-Date').val('')
        $('#slt-Frquency').val('0');
        $('#recurring-End-Date').val('');
    }

    var GetNumericSuffix = function (number) {
        var ord = '';
        switch (number) {
            case 1:
                ord = 'st';
                break;
            case 2:
                ord = 'nd';
                break;
            case 3:
                ord = 'rd';
                break;
            default:
                ord = 'th';
                break;
        }
        return ord;
    }
    
    var GoBack = function () {
        
        setTimeout(function () {
            window.history.back();
        },5000);
    }

    var ResetAddVendorFields = function () {
        $('#txt-AV-Vendor-Name').val('');
        $('#txt-Email').val('');
        $('#txt-Contact-Number').val('');
        $("#slt-Prefferd-Payment-Method").val('0').trigger('change');
        $('#slt-Payment-Terms').val('0').trigger('change');
        $('#slt-GL-Codes').val('0').trigger('change');
        
        $('.select').select2();
        $("span.validation-message").attr('error-active', false);
        $("span.validation-message").hide();
        $("div.validation-message").removeClass('isc-active-on');
        $("div.validation-message").removeClass('isc-active-child-on');
    }

    var ValidateVendor = function () {
        var isValid = true;
        //Vendor Details
        var vendorName = $.trim($('#txt-AV-Vendor-Name').val());
        var email = $.trim($('#txt-Email').val());
        var contactNumber = $.trim($('#txt-Contact-Number').val());
        var paymentTerms =$('#slt-Payment-Terms').val();
        var url = $.trim($('#txt-Website-Url').val());
        var prefferredPaymentMethod = $('#slt-Prefferd-Payment-Method').val();
        var glCode = $('#slt-GL-Codes').val();

        if (vendorName == '' || vendorName == null) {
            isValid = false;
            $('#vendorName-Validation').show();
        }
        if (email == '' || email == null) {
            isValid = false;
            $('#vendorEmail-Validation').show();
        }
        
        //if (paymentTerms == '0' || paymentTerms == null) {
        //    isValid = false;
        //    $('#vendorPaymentTerm-Validation').show();
        //}
        //if (contactNumber == '' || contactNumber == null) {
        //    isValid = false;
        //    $('#vendorContact-Validation').show();
        //}
        //if (prefferredPaymentMethod == '0' || prefferredPaymentMethod == null) {
        //    isValid = false;
        //    $('#PrefferedPaymentTerm-Validation').show();
        //}
        //if (glCode == '0' || glCode == null) {
        //    isValid = false;
        //    $('#Gl-Code-Validation').show();
        //}
        
        return isValid;

    }

    var DisableProperties = function () {
        $("input").prop('disabled', true);
        $('select').prop('disabled', true);
        $('#bill-Description').prop('disabled', true);
        $('#bill-Notes').prop('disabled', true);
        $('[delete-Approver]').hide();
        $('[data-Add-Description]').hide();
        $('[data-Edit]').hide();
        $('[data-Delete]').hide();
        $('#add-Split-Row').hide();
        $('[data-Edit-Split]').hide();
        $('[data-Delete-Split]').hide();
        $('#add-Approver').hide();
        $('#add-Doc-Span').hide();
        $('#save-Bill-Notes').hide();
        $('[data-Delete-Bill]').hide();
        $('[bill-Buttons="true"]').hide();
    }

    var BindConfigs = function () {
        
        if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0) {
            if (clientConfigurations[0]["IsSplitAllowed"] == "1") {
                $('#btn-Split').show();
            }
            else {
                $('#btn-Split').hide();
            }
            if (clientConfigurations[0]["IsBillAssociationEnabled"] == "1") {
                $('#bill-Association-Block').show();
            }
            else {
                $('#bill-Association-Block').hide();
            }
            
            if (clientConfigurations[0]["IsRecurrenceEnabled"] == "1") {
                $('#recurrence-Block').show();
            }
            else {
                $('#recurrence-Block').hide();
            }
            if (clientConfigurations[0]["IsBillAssociationEnabled"] == "1") {
                $('#bill-Association-Block').show();
            }
            else {
                //$('#bill-Association-Block').hide();
            }
            if (clientConfigurations[0]["IsAutoApproval"] == "1") {
                $('#auto-Approval').prop('checked', true);
                $('#auto-Approval').prop('disabled', true);
                $('#approvers-Div').hide();
            }
            else {
                $('#lbl-AutoApproval').hide();
                $('#approvers-Div').show();
            }
            if (clientConfigurations[0]["IsStandardApproval"] == "1") {
                $('#auto-Approval').prop('checked', false);
                $('#lbl-AutoApproval').show();
                $('#approvers-Div').show();
            }

            if (clientConfigurations[0]["IsDefaultApproval"] == "1") {
                $('#auto-Approval').prop('checked', false);
                $('#lbl-AutoApproval').hide();
                $('#approvers-Div').show();
            }

            if (clientConfigurations[0]["IsMultiApproval"] == "1") {
                $('#auto-Approval').prop('checked', false);
                $('#lbl-AutoApproval').hide();
                $('#approvers-Div').show();
            }
            

        }
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
                    $loading.show();
                    setTimeout(function () {
                    $('#file_Viewer').removeClass('isc-bill-drag')


                   
                    var type = Files[0]["type"];
                    const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
                    if (size > 10) {
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
                        billFileResponse = fileResponse;
                        billFileSize = size;
                        var billFile = fileResponse["ModifiedFileName"];
                        BillFrames(billFile);
                        billFileID = 1;
                        isAttchment = 1;
                        BindBillDocument();
                        if (type == 'application/pdf') {
                            $('#pdf-icon').show();
                            $('#img-icon').hide();
                        }
                        else {
                            $('#pdf-icon').hide();
                            $('#img-icon').show();
                        }
                        $("span.validation-message").hide();
                        $("span.validation-message").attr('error-active', false);
                        BindAttachmentResponse();
                        $('#billFileName').text(Files[0]["name"]);
                        $('#billFileName').prop('title', Files[0]["name"]);
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
//Browse Bill
{
    $(document).on('change', '#browseBill', function () {
        var Files = $(this).prop("files");
        $loading.show();
        setTimeout(function () {
            fileContainer = [];

            var type = Files[0]["type"];
            const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
            if (size > 10) {
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
                billFileResponse = fileResponse;
                billFileSize = size;
                var billFile = fileResponse["ModifiedFileName"];
                BillFrames(billFile);
                billFileID = 1;
                isAttchment = 1;
                BindBillDocument();
                if (type == 'application/pdf') {
                    $('#pdf-icon').show();
                    $('#img-icon').hide();
                }
                else {
                    $('#pdf-icon').hide();
                    $('#img-icon').show();
                }
                $("span.validation-message").hide();
                $("span.validation-message").attr('error-active', false);
                BindAttachmentResponse();
                $('#billFileName').text(Files[0]["name"]);
                $('#billFileName').prop('title', Files[0]["name"]);
                $('#btn-clear-file').show();

            }
            $loading.hide();
        }, 0);
    });

    $(document).on('change', '#add-Documents', function () {
        var Files = $(this).prop("files");
        fileContainer = [];
        var type = Files[0]["type"];
        const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
        fileContainer.push(Files[0])
        fileSize = size;
        saveFiles();
        billFileID = 0;
        BindBillDocument();
    });
}
//Payment Details Render
{
    var BindPaymentDetails = function () {
        var BillInfo = $.parseJSON(editBillDetails[0]["Table"]);
        if (BillInfo != null && BillInfo.length > 0) {
            $('#lbl-PayableAmount').html($('#bill-Amount').val());
            $('#lbl-PaymentMethod').html(BillInfo[0]["PaymentMethod"] == null ? '-' : BillInfo[0]["PaymentMethod"])
            $('#lbl-PaidOn').html((BillInfo[0]["PaidOn"] == null ? '-' : moment(BillInfo[0]["PaidOn"]).format('MM/DD/YYYY')));
            $('#lbl-payment-Mode').html((BillInfo[0]["PaymentMode"] == null ? '-' : BillInfo[0]["PaymentMode"]));
            $('#lbl-Ref-Number').html((BillInfo[0]["PaymentReferenceID"] == null ? '-' : BillInfo[0]["PaymentReferenceID"]));
            $('#lbl-Amount-Paid').html("$" + (BillInfo[0]["AmountPaid"] == null || Math.sign(parseFloat(BillInfo[0]["AmountPaid"])) == -1 ? 0 : parseFloat(BillInfo[0]["AmountPaid"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#lbl-Amount-Due').html("$" + (BillInfo[0]["AmountDue"] == null || Math.sign(parseFloat(BillInfo[0]["AmountDue"])) == -1 ? 0 : parseFloat(BillInfo[0]["AmountDue"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        }
    }

    var BindPaidBillDoumnets = function () {
        var $el = $('#tbl-Paid-Docs');
        var html = '';
        var docList = $.parseJSON(editBillDetails[7]["Table7"]);
        if (docList.length > 0) {
            $.each(docList, function (index, item) {
                var title = "Uploaded On: " + (item["CreatedOn"] == null ? '-' : item["CreatedOn"]) + " Uploaded By:" + ((item["FirstName"] == null ? '' : item["FirstName"]) + " " + (item["LastName"] == null ? '' : item["LastName"])) + ""
                html += ' <tr><td><h5 title="' + title + '">';
                html += ' <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">';
                html += ' <span title="' + (item["FileName"] == null ? '-' : item["FileName"]) + '">' + (item["FileName"] == null ? '-' : item["FileName"]) + '</span></h5> </td><td> <div class="screen-row isc-inline-pop-action-s1">';
                html += ' <a class="isc-action-badge-td-s1" title="View"  data-Open-PaidFile="' + (item["PhysicalFileName"] == null ? '' : item["PhysicalFileName"]) + '"><i class="fa fa-eye"></i></a>';
                if (AccountID == parseInt(item["CreatedBy"])) {
                    html += ' <a class="isc-action-badge-td-s1" title="Delete"  data-Delete-PaidFile=' + (item["BillPaidAttatchmentId"] == null ? '' : item["BillPaidAttatchmentId"]) + '><i class="fa fa-trash-o"></i></a>';
                }
                html += ' </div></td></tr>';
            });
        }
        else {
            html = '<tr><td colspan="2" style="text-align:center;"> No Data Found </td><tr>';
        }
        $el.html(html);
    }

    $(document).on('click', '[data-Open-PaidFile]', function () {
        var fileName = $(this).attr('data-Open-PaidFile');
        if (fileName != '') {
            window.open(paidBillDocs + fileName, '');
        }
    });
}

//Auto complete for vendor
//$(function () {
//    var vendorList = $.parseJSON(masterData[5]["Table5"]);
//    var vendorArray = [];
//    $.each(vendorList, function (index, item) {
//        vendorArray.push(SafeHTML(item["VendorName"]));
//    });

//    $("#txt-Vendor-Name").autocomplete({
//        source: vendorArray
//    });
//});

//Vendor Text Box events
{
    $(document).on('keyup', '#txt-Vendor-Name', function () {
       
        var vendorValue = $(this).val();
        var vendorList = $.parseJSON(masterData[5]["Table5"]);
        var vendorArray = [];
        $.each(vendorList, function (index, item) {
            vendorArray.push(SafeHTML(item["VendorName"]));
        });

        $("#txt-Vendor-Name").autocomplete({

            source: vendorArray
        });
        if ($.trim($("#txt-Vendor-Name").val()) != '') {
            var selectedVendor = GetmatchedRecord($.parseJSON(masterData[5]["Table5"]), 'VendorName', $("#txt-Vendor-Name").val());
            if (selectedVendor != null && selectedVendor != undefined && selectedVendor.length > 0) {
                $('#payment-Terms').val(selectedVendor[0]["PaymentTerm"]);
                $('#payment-Terms').select2();
                $('#slt-Category').val(selectedVendor[0]["GLCode"]);
                $('#slt-Category').select2();
                var obj = {
                    'IsVendor': 1,
                    'VendorID': selectedVendor[0]["VendorID"],
                    'Amount': 0.0
                }
                
                setTimeout(function () {
                   
                    if (clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsCustomApproval"]) {
                        $('#default-approver-div').hide();
                        $('.loader').hide();
                        var customizedApprovers = GetCustomizedApprovers(obj);
                        customizedApprovers = customizedApprovers["Approvers"];
                        if (customizedApprovers !== undefined) {
                            $loading.show();
                            if (customizedApprovers != null && customizedApprovers.length > 0) {
                                IsVendorCustomed = 1;
                            }
                            var Isstantardappro = customizedApprovers[0]["IsStandardApproval"];
                            if (Isstantardappro != 1) {
                                BindConfigAccountants(customizedApprovers);
                            }
                        }
                        $loading.hide();
                    }
                    
                }, 0);
            }
        }
        else {
            $('#payment-Terms').val('0');
            $('#payment-Terms').select2();
            $('#slt-Category').val('0');
            $('#slt-Category').select2();
        }
        if ($.trim(vendorValue) == '' && IsVendorCustomed == 1) {
            $('#tbl-approvers').html('<tr data-Empty-Approver-Row="true"><td colspan="3" style="text-align:center;">No data found</td></tr>');
            BindApprovers($('#slt-Approvers'), $.parseJSON(masterData[2]["Table2"]), 'Choose Approver Name');
        }
        

    });

    $(document).on('click', '.ui-menu-item', function () {
       
        if ($.trim($("#txt-Vendor-Name").val()) != '') {
            if (clientConfigurations[0]["IsStandardApproval"] != 0 && clientConfigurations[0]["IsCustomApproval"] != 1) {
                $('#default-approver-div').show();
                $('.loader').hide();
            }
            var selectedVendor = GetmatchedRecord($.parseJSON(masterData[5]["Table5"]), 'VendorName', $("#txt-Vendor-Name").val());
            if (selectedVendor != null && selectedVendor != undefined && selectedVendor.length > 0) {
                if (parseInt(selectedVendor[0]["PaymentTerm"]) != 0) {
                    $('#payment-Terms').val(selectedVendor[0]["PaymentTerm"]);
                }
                else {
                    $('#payment-Terms').val(50009);
                }
                $('#payment-Terms').select2();
                $('#slt-Category').val(selectedVendor[0]["GLCode"]);
                $('#slt-Category').select2();
                var paymentTermVal = parseInt(selectedVendor[0]["PaymentTerm"]);
                var dateNumber = GetDateNumber(paymentTermVal);
                if ($('#invoice-Date').val() != '') {
                    var dueDate = ''
                    if (dateNumber != 0) {
                        dueDate = moment($('#invoice-Date').val()).add(dateNumber, 'day').format('MM/DD/YYYY');
                    }
                    else {
                        dueDate = moment($('#invoice-Date').val()).format('MM/DD/YYYY')
                    }

                    $('#due-Date').datepicker('setDate', dueDate);
                }
                else {
                    var dueDate = moment().add(dateNumber, 'day').format('MM/DD/YYYY');
                    $('#due-Date').datepicker('setDate', dueDate);
                }
                var obj = {
                    'IsVendor': 1,
                    'VendorID': selectedVendor[0]["VendorID"],
                    'Amount':0.0
                }


                var customizedApprovers = GetCustomizedApprovers(obj);
                customizedApprovers = customizedApprovers["Approvers"];
               
                if (customizedApprovers !== undefined) {
                    var IssCustomApprover = customizedApprovers[0]["IsCustomApproval"];
                    if (IssCustomApprover != 1) {

                        if (clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsCustomApproval"]) {
                            $('#default-approver-div').hide();
                            $('.loader').hide();
                            //Remove for Loading put on Top
                            //var customizedApprovers = GetCustomizedApprovers(obj);
                            //customizedApprovers = customizedApprovers["Approvers"];
                            if (customizedApprovers !== undefined) {


                                if (customizedApprovers != null && customizedApprovers.length > 0) {
                                    IsVendorCustomed = 1;
                                }
                                var Isstantardappro = customizedApprovers[0]["IsStandardApproval"];
                                if (Isstantardappro != 1) {
                                    BindConfigAccountants(customizedApprovers);
                                }

                            }
                        }
                    }
                    else {

                        $loading.show();
                        setTimeout(function () {

                            if (clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsCustomApproval"]) {
                                $('#default-approver-div').hide();
                                $('.loader').hide();
                                //Remove for Loading put on Top
                                //var customizedApprovers = GetCustomizedApprovers(obj);
                                //customizedApprovers = customizedApprovers["Approvers"];
                                if (customizedApprovers !== undefined) {


                                    if (customizedApprovers != null && customizedApprovers.length > 0) {
                                        IsVendorCustomed = 1;
                                    }
                                    var Isstantardappro = customizedApprovers[0]["IsStandardApproval"];
                                    if (Isstantardappro != 1) {
                                        BindConfigAccountants(customizedApprovers);
                                    }

                                }
                            }
                            $loading.hide();
                        }, 1000);
                    }
                }
            }

            else {
                $('#payment-Terms').val('0');
                $('#payment-Terms').select2();
                $('#due-Date').val('');
                $('#slt-Category').val('0');
                $('#slt-Category').select2();
            }
        }
        else {
            $('#payment-Terms').val('0');
            $('#payment-Terms').select2();
            $('#due-Date').val('');
            $('#slt-Category').val('0');
            $('#slt-Category').select2();
        }

    });

    var GetCustomizedApprovers = function (obj) {

        var _obj = {
            'objApprover': obj
        }
        var tempList = {};
        $.when(RequestServer("CreateNewBill.aspx/GetCustomizedApprovers", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Bill Amount Text Box Events
{
    $(document).on('change', '#bill-Amount', function () {
       
        if ($(this).val() != '') {
            var amountValue = $(this).val().replace(/,/g, '');
            var obj = {
                'IsVendor': 0,
                'VendorID': 0,
                'Amount': parseFloat(amountValue)
            }
            //$loading.show();
            setTimeout(function () {
                
               
                 if (clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsCustomApproval"]==1 && IsVendorCustomed == 0) {
                    $('#default-approver-div').hide();
                    $('.loader').hide();
                    var customizedApprovers = GetCustomizedApprovers(obj);
                    customizedApprovers = customizedApprovers["Approvers"];
                    //if (customizedApprovers !== undefined) {
                        if (customizedApprovers != null && customizedApprovers.length > 0) {
                            IsVendorCustomed = 0;
                        }
                        BindConfigAccountants(customizedApprovers);
                       // $loading.hide();
                    //}
                }
                 else if (clientConfigurations[0]["IsStandardApproval"] = 1) {
                     $('#default-approver-div').show();
                     $('.loader').hide();
                 }
            }, 0);
        }
        else {
            if (clientConfigurations != null && clientConfigurations.length > 0 && clientConfigurations[0]["IsCustomApproval"] && IsVendorCustomed == 0)
            {
                $('#tbl-approvers').html('<tr data-Empty-Approver-Row="true"><td colspan="3" style="text-align:center;">No data found</td></tr>');
                BindApprovers($('#slt-Approvers'), $.parseJSON(masterData[2]["Table2"]), 'Choose Approver Name');
            }
        }
       
    });
}

$("input[name='DescOpt']").change(function () {
   
    if ($(this).val() == "No" && $(this).is(":checked")) {
       
        desciptionstatus = 1;
    }
});



