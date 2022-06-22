//Global Variables
{
    var configData = [];
    var currentApprovers = [];
    var approvers = [];
    var configDetails = [];
    var customApprovers = [];
    var editConfigId = 0;
    var deleteConfigId = 0;
}

//Load And Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        BindClientConfigurations();
        $("input[type=checkbox]").uniform();
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-SaveConfigs', function () {
        if (ValidateConfigs()) {
            SaveConfigurations();
        }
        
    });

    $(document).on('click', '#btn-Cancel', function () {
       
        // window.location.replace("Bill_UserHome.aspx");
        $("#Settingtab").removeClass("active");
        GoBack();
    });

    $(document).on('click', '#add-Multi-Approver', function () {
        if ($('#slt-MultiApprovers').val() != "0")
        {
            BindAddedApprover();
            var selectedApprover = $('#slt-MultiApprovers').val();
            currentApprovers = GetunmatchedRecord(currentApprovers, 'AccountID',parseInt(selectedApprover));
            BindApprovers($('#slt-MultiApprovers'), currentApprovers, 'Choose Approver');
            $('#slt-MultiApprovers').select2();
        }
        else {
            $.notify("Approver should not be empty !!", { position: "right top", className: "error" });
        }
        
    });

    $(document).on('click', '#add-Custom-Approver', function () {
        if ($('#slt-CustomeApprover').val() != "0") {
            BindAddedCustomApprover();
            var selectedApprover = $('#slt-CustomeApprover').val();
            customApprovers = GetunmatchedRecord(customApprovers, 'AccountID', parseInt(selectedApprover));
            BindApprovers($('#slt-CustomeApprover'), customApprovers, 'Choose Approver');
            $('#slt-CustomeApprover').select2();
        }
        else {
            $.notify("Approver should not be empty !!", { position: "right top", className: "error" });
        }

    });

    $(document).on('click', '[delete-Approver]', function () {
        var deletedApprover = $(this).attr('delete-Approver');
        var deletedApproverOption = GetmatchedRecord(approvers, 'AccountID',parseInt(deletedApprover));
        if(deletedApproverOption.length>0){
            var approverObj = {
                'AccountID': deletedApproverOption[0]["AccountID"],
                'ApproverName': deletedApproverOption[0]["ApproverName"],
            }
            currentApprovers.push(approverObj);
        }
        BindApprovers($('#slt-MultiApprovers'), currentApprovers, 'Choose Approver');
        $('#slt-MultiApprovers').select2();
       $('#div-Multiapprovers [data-approver="' + deletedApprover + '"]').remove();
        BindApproversAfterDelete();

    });

    $(document).on('click', '[delete-Custome-Approver]', function () {
        var deletedApprover = $(this).attr('delete-Custome-Approver');
        var deletedApproverOption = GetmatchedRecord(approvers, 'AccountID', parseInt(deletedApprover));
        if (deletedApproverOption.length > 0) {
            var approverObj = {
                'AccountID': deletedApproverOption[0]["AccountID"],
                'ApproverName': deletedApproverOption[0]["ApproverName"],
            }
            customApprovers.push(approverObj);
        }
        BindApprovers($('#slt-CustomeApprover'), customApprovers, 'Choose Approver');
        $('#slt-CustomeApprover').select2();
        $('#div-Custom-Approvers [data-approver="' + deletedApprover + '"]').remove();
        BindCustomApproversAfterDelete();

    });

    $(document).on('change', '#slt-Custom-Type', function () {
        var selectedValue = $(this).val();
        if (parseInt(selectedValue) == 1) {
            $('#div-Vendor').hide();
            $('#div-Condition').show();
            $('#div-Value').show();
        }
        else if (parseInt(selectedValue) == 2) {
            $('#div-Vendor').show();
            $('#div-Condition').hide();
            $('#div-Value').hide();
        }
        else if (parseInt(selectedValue) == 0) {
            $('#div-Vendor').show();
            $('#div-Condition').show();
            $('#div-Value').show();
        }
        $('#slt-Condition').val('0');
        $('#slt-Custom-Vendor').val('0');
        $('#slt-CustomeApprover').val('0');
        $('#txt-Cutom-First-Value').val('');
        $('#txt-Cutom-Second-Value').val('');
        $('.select2').select2();
    });

    $(document).on('click', '#btn-Save-Config-Approval', function () {
        if (ValidateConfiguration()) {
            SaveCustomApprovalConfig();
        }
        
    })

    $(document).on('change', '#slt-Condition', function () {
        if ($(this).val() == '50099') {
           // $('#div-UsualAmount').hide();
            $('#div-Between').show();
        }
        else {
            $('#div-Between').show();
            //$('#div-UsualAmount').show();
            //$('#div-Between').hide();
        }
    });

    $(document).on('click', '#btn-Open-Config', function () {
        $('#app-config').show();
        $('#btn-Update-Config-Approval').hide();
        $('#btn-Save-Config-Approval').show();
        ResetCustomConfigFields();
    });

    $(document).on('click', '[data-Close-Config]', function () {
        $('#app-config').hide();
    });

    $(document).on('click', '[data-Edit-Config]', function () {
        editConfigId = $(this).attr('data-Edit-Config');
        $('#btn-Update-Config-Approval').show();
        $('#btn-Save-Config-Approval').hide();
        ResetCustomConfigFields();
        if (editConfigId != null && editConfigId != undefined && editConfigId != '0') {
            var editData = GetmatchedRecord(configDetails["CustomApprovalConfigurations"], 'IdentityID', parseInt(editConfigId));
            if (editData != null && editData.length > 0) {
                $('#app-config').show();
                if (editData[0]["IsAmountType"] == 1) {
                    $('#div-Vendor').hide();
                    $('#div-Condition').show();
                    $('#div-Value').show();
                    $('#slt-Custom-Type').val(1);
                    if (editData[0]["Condition"] == 50099) {

                        $('#div-UsualAmount').hide();
                        $('#div-Between').show();
                    }
                    else {
                        $('#div-UsualAmount').show();
                        $('#div-Between').hide();
                    }
                }
                else if (editData[0]["IsVendorType"] == 1) {
                    $('#div-Vendor').show();
                    $('#div-Condition').hide();
                    $('#div-Value').hide();
                    $('#slt-Custom-Type').val(2);
                }
                $('#slt-Condition').val((editData[0]["Condition"] == null ? 0 : editData[0]["Condition"]));
                $('#txt-Custom-Value').val((editData[0]["Amount"] == null ? '' : editData[0]["Amount"]));
                $('#txt-Cutom-First-Value').val((editData[0]["Amount"] == null ? '' : editData[0]["Amount"]));
                $('#txt-Cutom-Second-Value').val((editData[0]["SecondAmount"] == null ? '' : editData[0]["SecondAmount"]));
                $('#slt-Custom-Vendor').val((editData[0]["VendorID"] == null ? '' : editData[0]["VendorID"]));
                $('.select2').select2();
                var confiApproverList = GetmatchedRecord(configDetails["CustomApprovers"], 'ConfigID', parseInt(editConfigId));
                BindEditConfigApprovers(confiApproverList);
                BindApproverDropDown(confiApproverList);

            }
        }
    });

    $(document).on('click', '#btn-Update-Config-Approval', function () {
        if (ValidateConfiguration()) {
            UpdateCustomApprovalConfig();
        }
        
    });

    $(document).on('click', '[data-Delete-Config]', function () {
        deleteConfigId = $(this).attr('data-Delete-Config');
        if (deleteConfigId != null && deleteConfigId != 0) {
            $('#mp_Config_Delete').show();
        }
    });

    $(document).on('click', '[delete-config-cancel]', function () {
        deleteConfigId = 0;
        $('#mp_Config_Delete').hide();
    });

    $(document).on('click', '#btn-deleteconfig-ok', function () {
        DeleteCustomConfigurations();
    });
}

//Dom Manipulation
{
    var BindClientConfigurations = function () {
       configDetails= GetClientConfigurations();
       configData = configDetails["Configs"];
       BindApprovers($('#slt-DefaultApprovers'), configDetails["Approvers"], "Choose Approver")
       BindApprovers($('#slt-MultiApprovers'), configDetails["Approvers"], "Choose Approver")
       BindApprovers($('#slt-CustomeApprover'), configDetails["Approvers"], "Choose Approver")
       BindDropDowns($('#slt-Custom-Vendor'), configDetails["Vendors"], "Choose Vendor")
       BindDropDowns($('#slt-Condition'), configDetails["Conditions"], "Choose Condition")
       currentApprovers = configDetails["Approvers"];
       customApprovers = configDetails["Approvers"];
       approvers = configDetails["Approvers"];
        BindEditBillPreference();
        BindEditPaymentPrefernce();
        BindEditApprovalPreference();
        BindCustomeApprovals(configDetails["CustomApprovalConfigurations"]);
        $("input[type=checkbox], input[type=radio]").uniform();
   
      
    }

    var BindEditConfigApprovers = function (confiApproverList) {
        var html = '';
        var $el = $('#div-Custom-Approvers');
        var approvers = confiApproverList;
        //approvers = GetmatchedRecord(approvers, 'IsDefaultAccountant', 1);
        approvers = GetDistinctArray(approvers, 'ApproverID');
        if (approvers != null && approvers != undefined && approvers.length > 0) {
            approvers = ObjSorter(approvers, 'Sequence', '123');
            $.each(approvers, function (index, item) {
                var suffix = GetNumericSuffix(index + 1);
                var approverSeqNumber = ((index + 1).toString() + suffix);
                var selectedApproverText = ((item["ApproverName"] == null ? '' : item["ApproverName"]));
                var selectedApproverValue = (item["ApproverID"] == null ? 0 : item["ApproverID"]);
                html += '<div class="screen-row mar-top-10"  data-Approver-Div="true"  data-approver="' + selectedApproverValue + '" data-Seq="' + (parseInt(index) + 1) + '" data-approver-name="' + selectedApproverText + '">';
                html += '<div class="isc-wid-14" style="width:22% !important" >';
                html += '<label class="isc-up-bill-lbl isc-mar-btm-7"> ' + approverSeqNumber + ' Approver</label></div>';
                html += '<div class="isc-cust-filt-dd-s1" style="width:57% !important;"><lable class="isc-up-bill-lbl">' + selectedApproverText + '</lable>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Custome-Approver="' + selectedApproverValue + '" title="Delete" data-Delete-Approver="0"><i class="fa fa-trash-o" style="float:right;"></i></a></div>';
                html += '</div>';
            });
        }
        else {
            html += '';
        }
        $el.html(html);
    }

    var BindApproverDropDown = function (confiApproverList)
    {
        var configApprovers = [];
        var unmatchedRecord = configDetails["Approvers"];
        $.each(confiApproverList, function (cIndex, cItem) {
            unmatchedRecord = GetunmatchedRecord(unmatchedRecord, 'AccountID', cItem["AccountID"]);
        });
        BindApprovers($('#slt-CustomeApprover'), unmatchedRecord, "Choose Approver");
        $('#slt-CustomeApprover').select2();
    }

    var BindEditBillPreference = function () {
       
        if (configData != undefined && configData != null && configData.length > 0) {
            if (configData[0]["IsChangesAllowed"] == 1) {
                $("#allowChanges").prop("checked", true).uniform();
                $("#notApproved").prop("checked", false).uniform();
            }
            else {
                $("#allowChanges").prop("checked", false).uniform();
                $("#notApproved").prop("checked", true).uniform();
            }
            if (configData[0]["IsSplitAllowed"] == 1) {

                $("#isSplitTrue").prop("checked", true).uniform();
                $("#isSplitFalse").prop("checked", false).uniform();
            }
            else {
                $("#isSplitTrue").prop("checked", false).uniform();
                $("#isSplitFalse").prop("checked", true).uniform();
            }
            if (configData[0]["IsRecurrenceEnabled"] == 1) {

                $("#isRecurrenceTrue").prop("checked", true).uniform();
                $("#isRecurrenceFalse").prop("checked", false).uniform();
            }
            else {
                $("#isRecurrenceTrue").prop("checked", false).uniform();
                $("#isRecurrenceFalse").prop("checked", true).uniform();
            }
            if (configData[0]["IsBillAssociationEnabled"] == 1) {

                $("#isAssociateProjectTrue").prop("checked", true).uniform();
                $("#isAssociateProjectFalse").prop("checked", false).uniform();
            }
            else {
                $("#isAssociateProjectTrue").prop("checked", false).uniform();
                $("#isAssociateProjectFalse").prop("checked", true).uniform();
            }
        }
        else {
            $("input[type=checkbox], input[type=radio]").uniform();
        }
    }

    var BindEditPaymentPrefernce = function () {
        if (configData != undefined && configData != null && configData.length > 0) {
            if (configData[0]["IsBillExportEnabled"] == 1) {
                $("#chk-isExportBill").prop("checked", true).uniform();
            }
            if (configData[0]["IsEpaymentsEnabled"] == 1) {
                $("#chk-isEpayments").prop("checked", true).uniform();
            }
            if (configData[0]["IsOfflinePaymentsAllowed"] == 1) {
                $("#chk-isOfflinePayments").prop("checked", true).uniform();
            }
            if (configData[0]["IsImportVendorsAllowed"] == 1) {
                $("#chk-isImportVendors").prop("checked", true).uniform();
            }
            
        }
    }

    var BindEditApprovalPreference = function () {
        if (configData != undefined && configData != null && configData.length > 0) {
            if (configData[0]["IsPartialApprovalEnabled"] == 1) {
                $("#chk-AllowPartialApproval").prop("checked", true).uniform();
            }
            if (configData[0]["IsAutoApproval"] == 1) {
               
                $("#isAutoApproval").prop("checked", true).uniform();
                $("#ch-partialAp").hide();
            }
            if (configData[0]["IsMultiApproval"] == 1) {
                $("#isMultiApproval").prop("checked", true).uniform();
                var approvers = configDetails["Approvers"];
                BindEditApprovers();
                var approvers = GetunmatchedRecord(approvers, 'IsDefaultAccountant', 1);
                currentApprovers = approvers;
                BindApprovers($('#slt-MultiApprovers'), approvers, "Choose Approver")
                $('#otherAnswer').show();
                $("#ch-partialAp").show();
                
              
            }
            if (configData[0]["IsDefaultApproval"] == 1) {
                $("#isDefaultApproval").prop("checked", true).uniform();
                var defaultApprover = configDetails["Approvers"];
                defaultApprover = GetmatchedRecord(defaultApprover, 'IsDefaultAccountant', 1);
                if (defaultApprover != null && defaultApprover != undefined && defaultApprover.length > 0) {
                    $('#defAnswer').show();
                    $('#slt-DefaultApprovers').val(defaultApprover[0]["AccountID"]);
                    $('#slt-DefaultApprovers').select2();
                    $("#ch-partialAp").show();
                }
                else {
                    $('#slt-DefaultApprovers').val(0);
                    $('#slt-DefaultApprovers').select2();
                }
            }
           
            if (configData[0]["IsStandardApproval"] == 1) {
                $("#isStandardApproval").prop("checked", true).uniform();
                $("#ch-partialAp").show();
            }
            if (configData[0]["IsCustomApproval"] == 1) {
                $('#btn-Open-Config').show();
                $("#cusAnswer").show();
                $("#isCustomApproval").prop("checked", true).uniform();
                $("#ch-partialAp").show();
            }
        }
    }

    var BindAddedApprover = function () {
        var html = '';
        var $el = $('#div-Multiapprovers');
        //$('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
        var selectedApproverText = $('#slt-MultiApprovers :selected').text();
        var selectedApproverValue = $('#slt-MultiApprovers').val();
        var approversRowLength = $('#div-Multiapprovers div[data-Approver-Div="true"]').length;
        approversRowLength = approversRowLength + 1;
        var suffix = GetNumericSuffix(approversRowLength);
        var approverSeqNumber = (approversRowLength.toString() + suffix);

        html += '<div class="screen-row mar-top-10" data-Approver-Div="true" data-approver="' + selectedApproverValue + '" data-Seq="' + approversRowLength + '" data-approver-name="' + selectedApproverText + '">';
        html += '<div class="isc-wid-14"  style="width:22% !important">';
        html += '<label class="isc-up-bill-lbl isc-mar-btm-7"> ' + approverSeqNumber + ' Approver</label></div>';
        html += '<div class="isc-cust-filt-dd-s1"   style="width:57% !important;"><lable class="isc-up-bill-lbl">' + selectedApproverText + '</lable>';
        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '" title="Add" data-Delete-Approver="0"><i class="fa fa-trash-o" style="float:right;"></i></a></div>';
        html += '</div>';

        //html += ' <tr>';
        //html += ' <td data-Seq="' + approversRowLength + '">' + approverSeqNumber + ' Approver</td>';
        //html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
        //html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
        //html += ' </tr>';
        $el.append(html);
    }

    var BindAddedCustomApprover = function () {
        var html = '';
        var $el = $('#div-Custom-Approvers');
        //$('#tbl-approvers  tr[data-Empty-Approver-Row="true"]').remove();
        var selectedApproverText = $('#slt-CustomeApprover :selected').text();
        var selectedApproverValue = $('#slt-CustomeApprover').val();
        var approversRowLength = $('#div-Custom-Approvers div[data-Approver-Div="true"]').length;
        approversRowLength = approversRowLength + 1;
        var suffix = GetNumericSuffix(approversRowLength);
        var approverSeqNumber = (approversRowLength.toString() + suffix);

        html += '<div class="screen-row mar-top-10" data-Approver-Div="true" data-approver="' + selectedApproverValue + '" data-Seq="' + approversRowLength + '" data-approver-name="' + selectedApproverText + '">';
        html += '<div class="isc-wid-14"  style="width:22% !important">';
        html += '<label class="isc-up-bill-lbl isc-mar-btm-7"> ' + approverSeqNumber + ' Approver</label></div>';
        html += '<div class="isc-cust-filt-dd-s1"   style="width:57% !important;"><lable class="isc-up-bill-lbl">' + selectedApproverText + '</lable>';
        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Custome-Approver="' + selectedApproverValue + '" title="Delete" data-Delete-Approver="0"><i class="fa fa-trash-o" style="float:right;"></i></a></div>';
        html += '</div>';

        //html += ' <tr>';
        //html += ' <td data-Seq="' + approversRowLength + '">' + approverSeqNumber + ' Approver</td>';
        //html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
        //html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
        //html += ' </tr>';
        $el.append(html);
    }

    var BindApproversAfterDelete = function () {
        var html = '';
        var $el = $('#div-Multiapprovers');
        var approversRowLength = $('#div-Multiapprovers div[data-Approver-Div="true"]').length;
        if (approversRowLength > 0) {
            $.each($('#div-Multiapprovers div[data-Approver-Div="true"]'), function (index, item) {
                var suffix = GetNumericSuffix(index + 1);
                var approverSeqNumber = ((index + 1).toString() + suffix);
                var selectedApproverText = $(item).attr('data-approver-name');
                var selectedApproverValue = $(item).attr('data-approver');

                html += '<div class="screen-row mar-top-10"  data-Approver-Div="true"  data-approver="' + selectedApproverValue + '" data-Seq="' +( parseInt(index) + 1) + '" data-approver-name="' + selectedApproverText + '">';
                html += '<div class="isc-wid-14"  style="width:22% !important">';
                html += '<label class="isc-up-bill-lbl isc-mar-btm-7"> ' + approverSeqNumber + ' Approver</label></div>';
                html += '<div class="isc-cust-filt-dd-s1"  style="width:57% !important;"><lable class="isc-up-bill-lbl">' + selectedApproverText + '</lable>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '" title="Add" data-Delete-Approver="0"><i class="fa fa-trash-o" style="float:right;"></i></a></div>';
                html += '</div>';


                //html += ' <tr>';
                //html += ' <td data-Seq="' + index + 1 + '">' + approverSeqNumber + ' Approver</td>';
                //html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
                //html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
                //html += ' </tr>';
            });
        }
        else {
            html += '';
        }
        $el.html(html);
    }

    var BindCustomApproversAfterDelete = function () {
        var html = '';
        var $el = $('#div-Custom-Approvers');
        var approversRowLength = $('#div-Custom-Approvers div[data-Approver-Div="true"]').length;
        if (approversRowLength > 0) {
            $.each($('#div-Custom-Approvers div[data-Approver-Div="true"]'), function (index, item) {
                var suffix = GetNumericSuffix(index + 1);
                var approverSeqNumber = ((index + 1).toString() + suffix);
                var selectedApproverText = $(item).attr('data-approver-name');
                var selectedApproverValue = $(item).attr('data-approver');

                html += '<div class="screen-row mar-top-10"  data-Approver-Div="true"  data-approver="' + selectedApproverValue + '" data-Seq="' + (parseInt(index) + 1) + '" data-approver-name="' + selectedApproverText + '">';
                html += '<div class="isc-wid-14"  style="width:22% !important">';
                html += '<label class="isc-up-bill-lbl isc-mar-btm-7"> ' + approverSeqNumber + ' Approver</label></div>';
                html += '<div class="isc-cust-filt-dd-s1"  style="width:57% !important;"><lable class="isc-up-bill-lbl">' + selectedApproverText + '</lable>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Custome-Approver="' + selectedApproverValue + '" title="Delete" data-Delete-Approver="0"><i class="fa fa-trash-o" style="float:right;"></i></a></div>';
                html += '</div>';


                //html += ' <tr>';
                //html += ' <td data-Seq="' + index + 1 + '">' + approverSeqNumber + ' Approver</td>';
                //html += ' <td title="' + selectedApproverText + '" data-approver-name="' + selectedApproverText + '" data-approver="' + selectedApproverValue + '"> ' + selectedApproverText + '</td>';
                //html += ' <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '"><i class="fa fa-trash-o"></i></a></td>';
                //html += ' </tr>';
            });
        }
        else {
            html += '';
        }
        $el.html(html);
    }

    var BindEditApprovers = function () {
        var html = '';
        var $el = $('#div-Multiapprovers');
        var approvers = configDetails["Approvers"];
        approvers = GetmatchedRecord(approvers, 'IsDefaultAccountant', 1);
        approvers = GetDistinctArray(approvers, 'AccountID');
        if (approvers != null && approvers != undefined && approvers.length > 0)
        {
            approvers = ObjSorter(approvers, 'ApproverSeqence', '123');
            $.each(approvers, function (index, item) {
                var suffix = GetNumericSuffix(index + 1);
                var approverSeqNumber = ((index + 1).toString() + suffix);
                var selectedApproverText = ((item["ApproverName"] == null ? '' : item["ApproverName"]));
                var selectedApproverValue = (item["AccountID"] == null ? 0 : item["AccountID"]);
                html += '<div class="screen-row mar-top-10"  data-Approver-Div="true"  data-approver="' + selectedApproverValue + '" data-Seq="' + (parseInt(index) + 1) + '" data-approver-name="' + selectedApproverText + '">';
                html += '<div class="isc-wid-14" style="width:22% !important" >';
                html += '<label class="isc-up-bill-lbl isc-mar-btm-7"> ' + approverSeqNumber + ' Approver</label></div>';
                html += '<div class="isc-cust-filt-dd-s1" style="width:57% !important;"><lable class="isc-up-bill-lbl">' + selectedApproverText + '</lable>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" delete-Approver="' + selectedApproverValue + '" title="Add" data-Delete-Approver="0"><i class="fa fa-trash-o" style="float:right;"></i></a></div>';
                html += '</div>';
            });
        }
        else {
            html += '';
        }
        $el.html(html);
    }

    var BindCustomeApprovals = function (configList) {
        var $el = $('#tbl-Custom-Config-Body');
        var html=''
        if (configList != null && configList.length > 0) {
            $.each(configList, function (index, item) {
                html += ' <tr><td>';
                if (item["IsVendorType"] == 1) {
                    html += ' <h2 title="Vendor : ' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '">Vendor : ' + (item["VendorName"] == null ? '-' : item["VendorName"]) + ' </h2>';
                }
                else if (item["IsAmountType"] == 1) {
                    var sign = GetAmountSign(parseInt(item["Condition"]))
                    var amount = (item["Amount"] == null ? 0.00 : parseFloat(item["Amount"]));
                    var secondamount = (item["SecondAmount"] == null ? 0.00 : parseFloat(item["SecondAmount"]));
                    if (parseInt(item["Condition"]) == 50099) {
                        html += ' <h2>Bill Amount ' + ((amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' ' + sign + ' ' + ((secondamount == "" || secondamount == NaN ? '-' : '$' + secondamount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + '  </h2>';
                    }
                    else {
                        html += ' <h2>Bill Amount ' + sign + ' ' + ((amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h2>';
                    }
                    
                }
             
                html += ' </td><td><h2 class="" >' + (item["Approvers"] == null ? '-' : item["Approvers"]) + '</h2>';
                html += ' </td><td><i class="fa fa-edit" style="cursor:pointer;" title="Edit" data-Edit-Config=' + (item["IdentityID"] == null ? '-' : item["IdentityID"]) + '></i>';
                html += ' <i class="fa fa-trash-o" style="cursor:pointer;" title="Delete" data-Delete-Config=' + (item["IdentityID"] == null ? '-' : item["IdentityID"]) + '></i>';
                html += ' </td></tr>';
            });
        }
        else {
            html = '<tr><td colspan="2" style="text-align:center;">No Data Found<td/></tr>'
        }
        $el.html(html);
        $('#tbl-Custom-Config-Body tr td').each(function (index, item) {
            var text = $(item).text();
                $(item).attr('title', text);
        });
    }

    var GetAmountSign = function (condition) {
        var sign = '';
        switch (condition) {
            case 50094:
                sign = '<';
                break;
            case 50095:
                sign = '=';
                break;
            case 50096:
                sign = '>';
                break;
            case 50097:
                sign = '>=';
                break;
            case 50098:
                sign = '<=';
                break;
            case 50099:
                sign = '-';
                break;
        }
        return sign;
    }
}

//Data Manipulation
{
    var GetClientConfigurations = function () {
        var _obj = {
            
        };
        var tempList = {};
        $.when(RequestServer("AccountsPayablePreferences.aspx/GetClientConfigurations", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

    var SaveConfigurations = function () {
       
        var Rowval = "";
        if ($("#isCustomApproval").prop("checked")) {
            $("#tbl_congfig tr").each(function () {
                var currentRow = $(this);
                Rowval = currentRow.find("td:eq(0)").text();
            });
        }
        if (Rowval !="No Data Found") {

            var objApproversList = [];

            if ($('#isDefaultApproval').is(':checked')) {
                if ($('#slt-DefaultApprovers').val() != '0') {
                    var objApprover = {
                        'AccountID': parseInt($('#slt-DefaultApprovers').val()),
                        'ApproverSeq': 1
                    }
                    objApproversList.push(objApprover);
                }
            }

            if ($('#isMultiApproval').is(':checked')) {
                //  $('#div-Multiapprovers');
                var approversList = $('#div-Multiapprovers div[data-Approver-Div="true"]');
                if (approversList != undefined && approversList.length > 0) {
                    $.each(approversList, function (index, item) {
                        var objApprover = {
                            'AccountID': parseInt($(this).attr('data-approver')),
                            'ApproverSeq': parseInt($(this).attr('data-Seq')),
                        }
                        objApproversList.push(objApprover);
                    });
                }
                else {
                    objApproversList = [];
                }
            }
            var obj = {
                'IsChangesAllowed': ($('#allowChanges').is(':checked') == true ? 1 : 0),
                'IsSplitAllowed': ($('#isSplitTrue').is(':checked') == true ? 1 : 0),
                'IsRecurrenceEnabled': ($('#isRecurrenceTrue').is(':checked') == true ? 1 : 0),
                'IsBillAssociationEnabled': ($('#isAssociateProjectTrue').is(':checked') == true ? 1 : 0),
                'IsBillExportEnabled': ($('#chk-isExportBill').is(':checked') == true ? 1 : 0),
                'IsEpaymentsEnabled': ($('#chk-isEpayments').is(':checked') == true ? 1 : 0),
                'IsOfflinePaymentsAllowed': ($('#chk-isOfflinePayments').is(':checked') == true ? 1 : 0),
                'IsImportVendorsAllowed': ($('#chk-isImportVendors').is(':checked') == true ? 1 : 0),
                'IsAutoApproval': ($('#isAutoApproval').is(':checked') == true ? 1 : 0),
                'IsMultiApproval': ($('#isMultiApproval').is(':checked') == true ? 1 : 0),
                'IsDefaultApproval': ($('#isDefaultApproval').is(':checked') == true ? 1 : 0),
                'IsStandardApproval': ($('#isStandardApproval').is(':checked') == true ? 1 : 0),
                'IsCustomApproval': ($('#isCustomApproval').is(':checked') == true ? 1 : 0),
                'IsPartialApproval': ($('#chk-AllowPartialApproval').is(':checked') == true ? 1 : 0),
                'Approvers': objApproversList,
                'Prefix': $("#txt-prefix").val(),
                'Split': parseInt($("input[name='splitinvoice']:checked").val()),
                'Sendmail': parseInt($("input[name='sendmail']:checked").val()),
                'Terms': $("#txt-termcondition").val(),
                'Note': $("#txt-note").val(),
                'Template': $("#txt-template").val()
            }
            var insertObj = {
                'Configs': obj
            }
            $.when(RequestServer("AccountsPayablePreferences.aspx/SaveConfigurations", insertObj)).done(function (response) {
                if (parseInt(response) > 0) {
                    $.notify("Payable Preference setup saved successfully!", { position: "right top", className: "success" });
                   // GoBack()
                }
                else {
                    $.notify("Server error occured while saving the configurations !!", { position: "right top", className: "error" });
                }
            });
        }
        else {
            $.notify("Select at least one approver !!", { position: "right top", className: "error" });
        }
    }

    var SaveCustomApprovalConfig = function () {
        var objApproversList = [];
        var amount = 0;
        if ($('#slt-Condition').val() == '50099') {
            amount =($('#txt-Cutom-First-Value').val()==''?0.00:( $('#txt-Cutom-First-Value').val().replace(/,/g, '')));
        }
        else {
            amount = ($('#txt-Custom-Value').val() == '' ? 0.00 : ($('#txt-Custom-Value').val().replace(/,/g, '')));
            
        }
        var secondAmount = ($('#txt-Cutom-Second-Value').val() == '' ? 0.00 : ($('#txt-Cutom-Second-Value').val().replace(/,/g, '')));
        var approversList = $('#div-Custom-Approvers div[data-Approver-Div="true"]');
        if (approversList != undefined && approversList.length > 0) {
            $.each(approversList, function (index, item) {
                var objApprover = {
                    'ApproverID': parseInt($(this).attr('data-approver')),
                    'Sequence': parseInt($(this).attr('data-Seq')),
                }
                objApproversList.push(objApprover);
            });
        }
        else {
            objApproversList = [];
        }

        if ($('#slt-Custom-Type').val() == 2)
        {
            amount = 0;
            secondAmount = 0;
        }

        var obj = {
            'IsVendorType': ((parseInt($('#slt-Custom-Type').val()==1?0:1))),
            'IsAmountType': ((parseInt($('#slt-Custom-Type').val() == 2 ? 0 : 1))),
            'VendorID': (parseInt($('#slt-Custom-Vendor').val())),
            'Amount': parseFloat(amount),
            'Condition': parseInt($('#slt-Condition').val()),
            'SecondAmount': parseFloat(secondAmount),
            'lstApprovers': objApproversList
        }
        var InsertObj = {
            'Configs': obj
        }
        $.when(RequestServer("AccountsPayablePreferences.aspx/SaveCustomApproverConfigurations", InsertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Payable Preference setup saved successfully!", { position: "right top", className: "success" });
                configDetails = GetClientConfigurations();
                configData = configDetails["Configs"];
                currentApprovers = configDetails["Approvers"];
                customApprovers = configDetails["Approvers"];
                approvers = configDetails["Approvers"];
                BindCustomeApprovals(configDetails["CustomApprovalConfigurations"]);
                ResetCustomConfigFields();
                $('#app-config').hide();

            }
            else {
                $.notify("Server error occured while saving the configurations !!", { position: "right top", className: "error" });
            }
        });
    }

    var UpdateCustomApprovalConfig = function () {
        var objApproversList = [];
        var amount = 0;
        if ($('#slt-Condition').val() == '50099') {
            amount = ($('#txt-Cutom-First-Value').val() == '' ? 0.00 : ($('#txt-Cutom-First-Value').val().replace(/,/g, '')));
        }
        else {
            amount = ($('#txt-Custom-Value').val() == '' ? 0.00 : ($('#txt-Custom-Value').val().replace(/,/g, '')));

        }
        var secondAmount = ($('#txt-Cutom-Second-Value').val() == '' ? 0.00 : ($('#txt-Cutom-Second-Value').val().replace(/,/g, '')));
        var approversList = $('#div-Custom-Approvers div[data-Approver-Div="true"]');
        if (approversList != undefined && approversList.length > 0) {
            $.each(approversList, function (index, item) {
                var objApprover = {
                    'ApproverID': parseInt($(this).attr('data-approver')),
                    'Sequence': parseInt($(this).attr('data-Seq')),
                }
                objApproversList.push(objApprover);
            });
        }
        else {
            objApproversList = [];
        }

        var obj = {
            'IsVendorType': ((parseInt($('#slt-Custom-Type').val() == 1 ? 0 : 1))),
            'IsAmountType': ((parseInt($('#slt-Custom-Type').val() == 2 ? 0 : 1))),
            'VendorID': (parseInt($('#slt-Custom-Vendor').val())),
            'Amount': parseFloat(amount),
            'Condition': parseInt($('#slt-Condition').val()),
            'SecondAmount': parseFloat(secondAmount),
            'IdentityID':parseInt(editConfigId),
            'lstApprovers': objApproversList
        }
        var InsertObj = {
            'Configs': obj
        }
        $.when(RequestServer("AccountsPayablePreferences.aspx/UpdateCustomApproverConfigurations", InsertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Configurations updated successfully!", { position: "right top", className: "success" });
                BindClientConfigurations();
                $('#app-config').hide();

            }
            else {
                $.notify("Server error occured while updating the configurations !!", { position: "right top", className: "error" });
            }
        });
    }

    var DeleteCustomConfigurations = function () {
        var deleteObj = {
            'configID':parseInt(deleteConfigId)
        }
        $.when(RequestServer("AccountsPayablePreferences.aspx/DeleteCustomConfiguration", deleteObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Configurations deleted successfully!", { position: "right top", className: "success" });
                $('[data-Delete-Config=' + deleteConfigId + ']').parents('tr').remove();
                $('#mp_Config_Delete').hide();
                var configRows = $('#tbl-Custom-Config-Body tr').length;
                if (configRows == 0) {
                    $('#tbl-Custom-Config-Body').html('<tr><td colspan="2" style="text-align:center;">No Data Found<td/></tr>');
                }
                deleteConfigId = 0;
            }
            else {
                $.notify("Server error occured while deleting the configurations !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetPreviousSlabDetails = function (firstAmount,secondAmount,editID) {
        var _obj = {
            'firstAmount': parseFloat(firstAmount),
            'secondAmount': parseFloat(secondAmount),
            'editID': parseInt(editID)
        };
        var tempList = {};
        $.when(RequestServer("AccountsPayablePreferences.aspx/GetSlabs", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{
    var GoBack = function () {
        setTimeout(function () {
            $("#Settingtab").removeClass("active");
            window.history.back();
        }, 1000);
    }

    var BindApprovers = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst !== undefined) {
            if (lst.length > 0) {
                var distinctlst = GetDistinctArray(lst, 'AccountID');
                distinctlst = ObjSorter(distinctlst, "ApproverName", '123');

                $.each(distinctlst, function (index, item) {
                    if ($.trim(item["ApproverName"]) != '') {
                        html += '<option value="' + item["AccountID"] + '">' + (item["ApproverName"] == null ? '-' : item["ApproverName"]) + '</option>';
                    }
                });
            }
        }
        $el.html(html);
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

    var ValidateConfigs = function () {
        var isValid = true;
        if ($('#isDefaultApproval').is(':checked') && $('#slt-DefaultApprovers').val() == '0') {
            isValid = false;
            $.notify("If you select default approver option, Approver should not be empty  !!", { position: "right top", className: "error" });
        }
        if ($('#isMultiApproval').is(':checked') && $('#div-Multiapprovers div[data-Approver-Div="true"]').length == 0) {
            isValid = false;
            $.notify("If you select multilevel approval option, Approvers should not be empty  !!", { position: "right top", className: "error" });
        }
        
        if ($('#isCustomApproval').is(':checked') && ('#tbl-Custom-Config-Body tr').length == 0) {
            isValid = false;
            $.notify("If you select custom approval option, Configurations should not be empty  !!", { position: "right top", className: "error" });
        }
        return isValid;

    }

    var BindDropDowns = function ($el, lst, DefaultItem) {
       
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst !== undefined) {
            if (lst.length > 0) {
                var distinctlst = GetDistinctArray(lst, 'KeyListID');
                distinctlst = ObjSorter(distinctlst, "Value1", '123');

                $.each(distinctlst, function (index, item) {
                    if ($.trim(item["Value1"]) != '') {
                        html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
                    }


                });
            }
            $el.html(html);
        }
    }

    var ValidateConfiguration = function () {
        var isValid = true;
        var type = $('#slt-Custom-Type').val();
        var condition = $('#slt-Condition').val();
        var amount = $.trim($('#txt-Custom-Value').val());
        var betAmountOne = $.trim($('#txt-Cutom-First-Value').val());
        var betAmountTwo = $.trim($('#txt-Cutom-Second-Value').val());
        var vendor = $('#slt-Custom-Vendor').val();
        var configApprovers = $('#div-Custom-Approvers div[data-Approver-Div="true"]').length;
        var priorConfigs = configDetails["CustomApprovalConfigurations"];
        if (editConfigId != 0) {
            priorConfigs = GetunmatchedRecord(priorConfigs, 'IdentityID', editConfigId);
        }

        if (type == '0') {
            isValid = false;
            $.notify("Type should not be empty !!", { position: "right top", className: "error" });
        }
        if (type == '1' && condition == '0')
        {
            isValid = false;
            $.notify("Condition should not be empty !!", { position: "right top", className: "error" });
        }

        if (type == '2' && vendor == '0')
        {
            isValid = false;
            $.notify("Vendor should not be empty !!", { position: "right top", className: "error" });
        }

        if (type == '1' && condition != '50099' && amount == '')
        {
            isValid = false;
            $.notify("Value should not be empty !!", { position: "right top", className: "error" });
        }

        if (type == '1' && condition == '50099' && amount == '') {
            if (betAmountOne == ''||betAmountTwo=='') {
                isValid = false;
                $.notify("Value fields should not be empty !!", { position: "right top", className: "error" });
            }
        }

        if (configApprovers == 0) {
            isValid = false;
            $.notify("Approvers should not be empty !!", { position: "right top", className: "error" });
        }

        if (type == '2' && vendor != '0') {
            if (priorConfigs != null && priorConfigs != undefined && priorConfigs.length > 0) {
                if (editConfigId != 0) {
                    priorConfigs = GetunmatchedRecord(priorConfigs, 'IdentiyID', parseInt(editConfigId));
                }
                var matchedVendorConfig = GetmatchedRecord(priorConfigs, 'VendorID', parseInt(vendor));
                if (matchedVendorConfig != null && matchedVendorConfig.length > 0) {
                    isValid = false;
                    $.notify("Already another configuration added for this vendor !!", { position: "right top", className: "error" });
                }
            }

        }

        if (type == '1' && betAmountOne != '' && betAmountTwo != '')
        {
            if (parseFloat(betAmountOne.replace(/,/g, '')) >= parseFloat(betAmountTwo.replace(/,/g, ''))) {
                isValid = false;
                $.notify("Second amount should be greater than first amount !!", { position: "right top", className: "error" });
            }
        }

        if (type == '1' && betAmountOne != '' && betAmountTwo != '')
        {
           
            //if (condition != '50099' && amount != '') {
               
            //    if (priorConfigs != undefined && priorConfigs != null && priorConfigs.length > 0) {
            //        var matchedAmountRecord = GetmatchedRecord(priorConfigs, 'Amount', amount);
            //        //Greater Than
            //        var matchedGConditionRecord = GetmatchedRecord(matchedAmountRecord, 'Condition', 50096);
            //        if (matchedGConditionRecord != null && matchedGConditionRecord.length > 0)
            //        {
            //            isValid = false;
            //            $.notify("Already another configuration added for this value and condtion !!", { position: "right top", className: "error" });
            //        }
            //        //Greater Than Or Equals
            //        var matchedGEConditionRecord = GetmatchedRecord(matchedAmountRecord, 'Condition', 50097);
            //        if (matchedGEConditionRecord != null && matchedGEConditionRecord.length > 0) {
            //            isValid = false;
            //            $.notify("Already another configuration added for this value and condtion !!", { position: "right top", className: "error" });
            //        }
            //        //Lesser Than 
            //        var matchedLConditionRecord = GetmatchedRecord(matchedAmountRecord, 'Condition', 50094);
            //        if (matchedLConditionRecord != null && matchedLConditionRecord.length > 0) {
            //            isValid = false;
            //            $.notify("Already another configuration added for this value and condtion !!", { position: "right top", className: "error" });
            //        }
            //        //Lesser Than Or Equals
            //        var matchedLEConditionRecord = GetmatchedRecord(matchedAmountRecord, 'Condition', 50098);
            //        if (matchedLEConditionRecord != null && matchedLEConditionRecord.length > 0) {
            //            isValid = false;
            //            $.notify("Already another configuration added for this value and condtion !!", { position: "right top", className: "error" });
            //        }
            //        //Equals
            //        var matchedEqConditionRecord = GetmatchedRecord(matchedAmountRecord, 'Condition', 50095);
            //        if (matchedEqConditionRecord != null && matchedEqConditionRecord.length > 0) {
            //            isValid = false;
            //            $.notify("Already another configuration added for this value and condtion !!", { position: "right top", className: "error" });
            //        }


            //    }
            //}
            //else if (condition == '50099' && amount != '') {

            //}
            betAmountOne = betAmountOne.replace(/,/g, '');
            betAmountTwo = betAmountTwo.replace(/,/g, '');
            var previousSlabDetails=[];
            if (editConfigId != 0) {
                previousSlabDetails = GetPreviousSlabDetails(betAmountOne, betAmountTwo,editConfigId);
            }
            else {
                previousSlabDetails = GetPreviousSlabDetails(betAmountOne, betAmountTwo, 0);
            }
            previousSlabDetails = previousSlabDetails["AmountSlab"];
            if (previousSlabDetails != undefined && previousSlabDetails != null && previousSlabDetails.length > 0) {
                if ((previousSlabDetails[0]["PreviousCondition"] != null && previousSlabDetails[0]["PreviousCondition"] != 0))
                {
                    isValid = false;
                    $.notify("Already another configuration added for this amount condition !!", { position: "right top", className: "error" });
                }
            }
        }

        return isValid;
    }

    var ResetCustomConfigFields = function () {
        $('#slt-Custom-Type').val('0');
        $('#slt-Condition').val('0');
        $('#slt-Custom-Vendor').val('0');
        $('#txt-Cutom-First-Value').val('');
        $('#txt-Cutom-Second-Value').val('');
        $('#slt-CustomeApprover').val('0');
        $('.select2').select2();
        $('#div-Value').show();
        $('#div-Vendor').show();
        $('#div-Condition').show();
        $('#div-Custom-Approvers').html('');

    }

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
}
$("input[@name='optionsRadios']").change(function () {
  
    alert('hi');
});
$('input:radio').change(function () {
    alert('ole');
});