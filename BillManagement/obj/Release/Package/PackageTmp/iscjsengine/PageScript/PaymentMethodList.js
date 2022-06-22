//Global Variables
{
    var paymentMethodListData = [];
    var editCardId = 0;
    var deleteCardId = 0;
    var defalutCardId = 0;
    var deleteAccountID = 0;
    var editClientAccountId = 0;
    var defaultAccountID = 0;
    var sortCardList = [];
    var sortAchList = [];
    var cardRefID = '';
    var accountRefID = '';
    var achCustomerid = '';
    var verificationCustomerID = '';
    var verificationSourceID = '';
    var verificationAccount = 0;
}

//Load && Events
{
    $(document).ready(function () {

        BuildScreen();

    });

    $(document).on('click', '#save-Card', function () {
        if (ValidateClientCard()) {
            InsertClientCard();
            BuildScreen();
            ClearCardFields();
        }
       
    });

    $(document).on('click', '[data-edit-Card]', function () {
        editCardId = $(this).attr('data-edit-Card');
        if (editCardId != undefined && editCardId != null && editCardId != 0)
        {
            var editCardDetails = GetEditCardDetails(parseInt(editCardId))
             var editCardDetails = editCardDetails["EditCardDetails"];
             if (editCardDetails != undefined && editCardDetails != null && editCardDetails.length > 0) {
                 ClearCardFields();
                BindEditCardDetails(editCardDetails);
                $('#Mp_Add_Card').show();
            }
        }

    });

    $(document).on('click', '#update-Card', function () {
        if (ValidateClientCard()) {
            UpdateCard();
            BuildScreen();
            ClearCardFields();
        }
       
    });

    $(document).on('click', '#add-Card', function () {
        ClearCardFields();
        $('#save-Card').show();
        $('#update-Card').hide();
        $('#Mp_Add_Card').show();
    });

    $(document).on('click', '[data-Cancel-Card]', function () {
        $('#Mp_Add_Card').hide();
        ClearCardFields();
    });

    $(document).on('click', '[data-delete-Card]', function () {
        deleteCardId = $(this).attr('data-delete-Card')
        if (deleteCardId != undefined && deleteCardId != null && deleteCardId != 0) {
            $('#MP_Delete_Card').show();
        }

    });

    $(document).on('click', '[cancel-Delete-Card]', function () {
        $('#MP_Delete_Card').hide();
        deleteCardId = 0;
    });

    $(document).on('click', '#delete-Card-Yes', function () {
        DeleteCard();
        deleteCardId = 0;
        BuildScreen();
        ClearCardFields();
    });

    $(document).on('click', '[data-set-defalut-Card]', function () {
        defalutCardId = $(this).attr('data-set-defalut-Card');
        if (defalutCardId != undefined && defalutCardId != null && defalutCardId != 0) {
            $('#MP_Default_Card').show();
        }
      
    });
    
    $(document).on('click', '[card-Default-Close]', function () {
        defalutCardId = 0;
        $('#MP_Default_Card').hide();
    });

    $(document).on('click', '#card-Default-Yes', function () {
        MakeDefault();
        BuildScreen();
        ClearCardFields();
    });

    $(document).on('keyup', '[data-textbox]', function () {
        if ($.trim($(this).val()) != '') {
            $("span.validation-message[data-validation='" + $(this).attr("data-textbox") + "']").hide();
        }

    });

    $(document).on('click', '#save-Client-Account', function () {
        if (ValidateACH()) {
            InsertClientAccount();
            BuildScreen();
            ClearAccountFields();

        }
            });

    $(document).on('click', '#add-ACH', function () {
        $('#save-Client-Account').show();
        $('#update-Client-Account').hide();
        ClearAccountFields();
        $('#Mp_Add_ACH').show();
    });

    $(document).on('click', '[cancel-account-create]', function () {
        $('#Mp_Add_ACH').hide();
        ClearAccountFields();
    });

    $(document).on('click', '[data-edit-Account]', function () {
        editClientAccountId = $(this).attr('data-edit-Account');
        if (editClientAccountId != undefined && editClientAccountId != null && editClientAccountId != 0) {
            var editAccountDetail = GeteditClientAccountDetails(parseInt(editClientAccountId));
            editAccountDetail = editAccountDetail["AccountEditDetais"];
            if (editAccountDetail != undefined && editAccountDetail != null && editAccountDetail != '' && editAccountDetail.length > 0)
            {
                $('#account-Name').val((common.NFTD(editAccountDetail[0]["AccountName"])));
                $('#re-account-Number').val((common.NFTD(editAccountDetail[0]["AccountNumber"])));
                $('#account-Number').val((common.NFTD(editAccountDetail[0]["AccountNumber"])));
                $('#routing-Number').val((common.NFTD(editAccountDetail[0]["RoutingNumber"])));
                if (editAccountDetail[0]["IsDefault"] == '1') {
                    $('#default-Account').prop('checked', true);
                }
                else {
                    $('#default-Account').prop('checked', false);
                }
                $('#update-Client-Account').show();
                $('#save-Client-Account').hide();
                $('#Mp_Add_ACH').show();
            }
        }


    });

    $(document).on('click', '#update-Client-Account', function () {
        if (ValidateACH()) {
            UpdateClientAccount();
            BuildScreen();
            ClearAccountFields();
        }
       
    });

    $(document).on('click', '[data-delete-Account]', function () {
        deleteAccountID = $(this).attr('data-delete-Account');
        if (deleteAccountID != undefined && deleteAccountID != null && deleteAccountID != '0' && deleteAccountID != '-') {
            $('#MP_Delete_Account').show();
        }
    });

    $(document).on('click', '[cancel-Delete-Account]', function () {
        deleteAccountID = 0;
        $('#MP_Delete_Account').hide();
    });

    $(document).on('click', '#delete-Account-Yes', function () {
        DeleteAccount();
        BuildScreen();
        deleteAccountID = 0;
        $('#MP_Delete_Account').hide();
    });

    $(document).on('click', '[data-set-defalut-Account]', function () {
        defaultAccountID = $(this).attr('data-set-defalut-Account');
        if (defaultAccountID != undefined && defaultAccountID != null && defaultAccountID != '0' && defaultAccountID != '-') {
            $('#MP_Default_Account').show();
        }
    });

    $(document).on('click', '[account-Default-Close]', function () {
        $('#MP_Default_Account').hide();
        defaultAccountID = 0;
    });

    $(document).on('click', '#account-Default-Yes', function () {
        MakeDefaultAccount();
        $('#MP_Default_Account').hide();
        defaultAccountID = 0;
         BuildScreen();
    });

    $(document).on('click', '[data-Verification]', function () {
        ClearVerifyAccountFields();
        verificationAccount = $(this).attr('data-Verification');
        if (verificationAccount != undefined && verificationAccount != '-' && verificationAccount != null) {
            verificationAccount = parseInt(verificationAccount);
            verificationSourceID = $(this).attr('data-source');
            verificationCustomerID = $(this).attr('data-customer');
            $('#MP_Verification').show();

        }
    });

    $(document).on('click', '#verify-Account', function () {
        if (verificationSourceID != null && verificationSourceID != '-' && verificationSourceID != '' && verificationSourceID != undefined && verificationCustomerID != null && verificationCustomerID != '-' && verificationCustomerID != '' && verificationCustomerID != undefined) {
            var depositA = $('#micro-Dep-One').val();
            var depositB = $('#micro-Dep-Two').val();
            var obj = {
                'CustomerID': verificationCustomerID,
                'SourceID': verificationSourceID,
                'DepositA': depositA,
                'DepositB': depositB
            }
            var accountVerfiedInfo = AccountInformationVerification(obj);
            if (accountVerfiedInfo != null) {
                if (accountVerfiedInfo.IsSuccess) {
                    UpdateAccountVerifiedStatus();
                    BuildScreen();
                    ClearVerifyAccountFields();
                }
                else {
                    $.notify('' + accountVerfiedInfo.message + '', { position: "right top", className: "error" });
                }
                
            }
        }
      

    });

    $(document).on('click', '[cancel-Verify]', function () {
        $('#MP_Verification').hide();
        ClearVerifyAccountFields();
        
    })


    //Sorting Events
    {

        //Card Table Sorting

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
                    $('#tbl-Card th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Card th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                    $(this).find('img').attr('src', sortingascendingicon);
                    currentSortOrder = "asc";
                }
                else if (activesortorder === "asc") {
                    $('#tbl-Card th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Card th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                    $(this).find('img').attr('src', sortingdescendingicon);
                    currentSortOrder = "desc";
                }
                else if (activesortorder === "desc") {
                    $('#tbl-Card th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Card th[sort-column-Type]').removeClass('headerSortUp')
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
                var lstResult = sortCardList

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
                    BindCardData(lstResult);

                }
                //    $loading.hide();
                //}, 0);
            }
        });

        //Account Table Sorting
        $(document).on('click', 'th[data-account-sort]', function (e) {
            var $this = $(this).parents('table');
            if ($('th[data-account-sort]').hasClass('write-row')) {
                alert("Can't sort when list has writting rows");
                return false;
            }

            // Set Groupby Fields
            {
                //var tablegroupby = 'Entityname'
                // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
                var columngroupby = $(this).attr('data-account-sort');
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
                    $('#tbl-Account th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Account th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                    $(this).find('img').attr('src', sortingascendingicon);
                    currentSortOrder = "asc";
                }
                else if (activesortorder === "asc") {
                    $('#tbl-Account th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Account th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                    $(this).find('img').attr('src', sortingdescendingicon);
                    currentSortOrder = "desc";
                }
                else if (activesortorder === "desc") {
                    $('#tbl-Account th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Account th[sort-column-Type]').removeClass('headerSortUp')
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
                var lstResult = sortAchList

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
                    BindAccountData(lstResult);

                }
                //    $loading.hide();
                //}, 0);
            }
        });
    }

}

//Dom Manipulation
{
    var BuildScreen = function () {
        BuildFields();
        paymentMethodListData = GetPaymentMethodScreenData();
        var countData = paymentMethodListData["TabCounts"];
        var cardData = paymentMethodListData["cardData"];
        var achData = paymentMethodListData["achData"];
        if (countData != undefined && countData != null && countData.length > 0)
        {
            $('#card-Count').html(countData[0]["cardCount"]);
            $('#ach-Count').html(countData[0]["achCount"]);
        }
        if (cardData != undefined && cardData != null && cardData.length > 0) {
            sortCardList = cardData;
        }
        if (achData != undefined && achData != null && achData.length > 0) {
            sortAchList = achData;
        }
        BindCardData(cardData);
        BindAccountData(achData);
        RegisterAlphabetsOnly();
        RegisterNumericOnly();


    }

    var BindCardData = function (cardData) {
        var $el = $('#tbl-Card-Body');
        var html = '';
        if (cardData != undefined && cardData.length != null && cardData.length > 0)
        {
            $.each(cardData, function (index, item) {
                html += '<tr>';
                if (item["IsDefault"] == 0) {
                    html += '<td title="Set as default"><i class="fa fa-circle-o isc-set-deflt" data-set-defalut-Card="' + (item["CardIdentityId"] == null ? '0' : item["CardIdentityId"]) + '"></i></td>';
                }
                else {
                    html += '<td title="Set as default"><i class="fa fa-check-circle-o isc-set-deflt yes"></i></td>';
                }
                html += '<td title="' + (item["BankName"] == null ? '-' : item["BankName"]) + '">';
                html += '<h5>' + (item["BankName"] == null ? '-' : item["BankName"]) + '</h5>';
                html+='</td>';
                html += '<td title="' + (item["CardNumber"] == null ? '-' : item["CardNumber"]) + '">';
                html += '<h5>' + (item["CardNumber"] == null ? '-' : item["CardNumber"]) + '</h5>';
                //html += '<h5>**** **** ****<span>8976</span></h5>';
                html+='</td>';
                //html+='<td>';
                //html+='<h5>-</h5>';
                //html+='</td>';
                html += '<td title="' + (item["CardName"] == null ? '-' : item["CardName"]) + '">';
                html += '<h5>' + (item["CardName"] == null ? '-' : item["CardName"]) + '</h5>';
                html+='</td>';
                html += '<td title="' + (item["ExpiryMonth"] == null ? '-' : item["ExpiryMonth"]) + "/" + (item["ExpiryYear"] == null ? '-' : item["ExpiryYear"]) + '">';
                html += '<h5>' + (item["ExpiryMonth"] == null ? '-' : item["ExpiryMonth"]) + "/" + (item["ExpiryYear"] == null ? '-' : item["ExpiryYear"]) + '</h5>';
                html+='</td>';
                //html+='<td>';
                //html += '<div class="isc-td-inline-status-ch-s1">';
                //if (parseInt(item["IsActive"]) == 0) {
                //    html += '<a class="isc-lbl-act-read-list-s1 isc-inactive-clr">Inactive</a>';
                //}
                //else {
                //    html += '<a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove">Active</a>';
                //}
                
                //html+='</div>';
                //html+='</td>';
                html+='<td style="text-align: center;">';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" data-edit-Card="' + (item["CardIdentityId"] == null ? '0' : item["CardIdentityId"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-delete-Card="' + (item["CardIdentityId"] == null ? '0' : item["CardIdentityId"]) + '"><i class="fa fa-trash-o"></i></a>';
                html+='</td>';
                html += '</tr>';

            });
        }
        else {
            html += '<tr><td colspan="8"><p style="text-align:center;">No Data Found</p></tr></td>';
        }
        $el.html(html);
    }

    var BindAccountData = function (accountData) {
        var $el = $('#tbl-Account-Body');
        var html = '';
        if (accountData != undefined && accountData.length != null && accountData.length > 0) {
            $.each(accountData, function (index, item) {
                html += '<tr>';

                if (item["IsDefault"] ==0) {
                    html += '<td title="Set as default"><i class="fa fa-circle-o isc-set-deflt" data-set-defalut-Account="' + (item["AccountIdentityID"] == null ? '0' : item["AccountIdentityID"]) + '"></i></td>';
                }
                else {
                    html += '<td title="Set as default"><i class="fa fa-check-circle-o isc-set-deflt yes"></i></td>';
                }
                html += '<td title="' + common.NFTD(item["AccountName"]) + '">';
                html += '<h5>' + common.NFTD(item["AccountName"]) + '</h5>';
                html+='</td>';
                html += '<td title="' + common.NFTD(item["AccountNumber"]) + '">';
                //html += '<h5>**** **** ****<span>8976</span></h5>';
                html += '<h5>' + common.NFTD(item["AccountNumber"]) + '</h5>';
                html+='</td>';
                //html+='<td>';
                //html+='<h5>-</h5>';
                //html+='</td>';
                html += '<td title="' + common.NFTD(item["RoutingNumber"]) + '">';
                html += '<h5>' + common.NFTD(item["RoutingNumber"]) + '</h5>';
                html+='</td>';
                html+='<td>';
                html+='<div class="isc-td-inline-status-ch-s1">';
                html += '<a title="' + common.NFTD(item["StatusName"]) + '" class="isc-lbl-act-read-list-s1 ' + common.NFTD(item["StatusColor"]) + '">' + common.NFTD(item["StatusName"]) + '</a>';
                html+='</div>';
                html+='</td>';
                html += '<td style="text-align: center;">';
                if (item["Status"] != '50057') {
                    html += ' <a class="isc-action-badge-td-s1 pad-lft-5" title="Verify Now" data-Verification="' + common.NFTD(item["AccountIdentityID"]) + '" data-source="' + common.NFTD(item["ReferenceID"]) + '" data-customer="' + common.NFTD(item["ACHCustomer"]) + '" ><i class="fa fa-check-circle" style="color:#74b9ff;"></i></a>';
                }
                //data-source=
                if (item["Status"] != '50057') {
                    html += '<a class="isc-action-badge-td-s1 pad-lft-5"  title="Edit" data-edit-Account="' + common.NFTD(item["AccountIdentityID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                }
                else {
                    html += '<a style="padding-left:24px !important;" class="isc-action-badge-td-s1 pad-lft-5"  title="Edit" data-edit-Account="' + common.NFTD(item["AccountIdentityID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                }
               
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-delete-Account="' + common.NFTD(item["AccountIdentityID"]) + '"><i class="fa fa-trash-o"></i></a>';
                html+='</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<tr><td colspan="7"><p style="text-align:center;">No Data Found</p></tr></td>';
        }
        $el.html(html);
    }

    var BindEditCardDetails = function (editCardDetails) {
  
        $('#name-On-Card').val((editCardDetails[0]["CardName"] == null ? '' : editCardDetails[0]["CardName"]));
        $('#card-Number').val((editCardDetails[0]["CardNumber"] == null ? '' : editCardDetails[0]["CardNumber"]));
        $('#exp-Month').val((editCardDetails[0]["ExpiryMonth"] == null ? '' : editCardDetails[0]["ExpiryMonth"]));
        $('#exp-Year').val((editCardDetails[0]["ExpiryYear"] == null ? '' : editCardDetails[0]["ExpiryYear"]));
        $('#ccv-Number').val((editCardDetails[0]["CCV"] == null ? '' : editCardDetails[0]["CCV"]));
        $('#bank-Name').val((editCardDetails[0]["BankName"] == null ? '' : editCardDetails[0]["BankName"]));
        if (editCardDetails[0]["IsDefault"] == '1') {
            $("#set-Default").prop("checked", true);
        }
        else {
            $("#set-Default").prop("checked", false);
        }
        $('#save-Card').hide();
        $('#update-Card').show()
    }

    var BuildFields = function () {
        $('#card-Number').mask('0000 0000 0000 0000');
        $('#exp-Month').mask('00');
        $('#exp-Year').mask('0000');
        $('#ccv-Number').mask('000')
    }
}

//Data Manipulation
{
    var GetPaymentMethodScreenData = function () {
        var _obj = {

        };

        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/GetPaymentMethodScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var InsertClientCard = function () {
        var nameOnCard=$('#name-On-Card').val();
        var cardNumber = $('#card-Number').val();
        var expMonth = $('#exp-Month').val();
        var expYear = $('#exp-Year').val();
        var ccvNumber = $('#ccv-Number').val();
        var bankName = $('#bank-Name').val();
        var isDefault = 0;
        if ($('#set-Default').is(':checked'))
        {
            isDefault = 1;
        }
        else {
            isDefault = 0;
        }
        var insertObject = {
            'CardName': nameOnCard,
            'CardNumber': cardNumber,
            'ExpiryMonth': expMonth,
            'ExpiryYear': expYear,
            'CCV': ccvNumber,
            'BankName': bankName,
            'IsDefault': isDefault,
            'ReferenceID': cardRefID,

        }

        var _Obj = {
            'cardDetails':insertObject
        }
        var objSplitedlist = [];

        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/InsertClientCard", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Card saved successfully !!", { position: "right top", className: "success" });
                $('#Mp_Add_Card').hide();
            }
            else {
                $.notify("Server error occured while saving a card !!", { position: "right top", className: "error" });
            }
        });

        return tempList;
    }

    var GetEditCardDetails = function (cardId) {
        var _obj = {
            'editCardID':cardId
        };

        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/GetEditCardDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateCard=function(){
        var nameOnCard = $('#name-On-Card').val();
        var cardNumber = $('#card-Number').val();
        var expMonth = $('#exp-Month').val();
        var expYear = $('#exp-Year').val();
        var ccvNumber = $('#ccv-Number').val();
        var bankName = $('#bank-Name').val();
        var isDefault = 0;
        if ($('#set-Default').is(':checked')) {
            isDefault = 1;
        }
        else {
            isDefault = 0;
        }
        var updateObject = {
            'CardName': nameOnCard,
            'CardNumber': cardNumber,
            'ExpiryMonth': expMonth,
            'ExpiryYear': expYear,
            'CCV': ccvNumber,
            'BankName': bankName,
            'IsDefault': isDefault,
            'ReferenceID': cardRefID,
            'CardIdentityId':parseInt(editCardId)

        }

        var _Obj = {
            'cardDetails': updateObject
        }
        var objSplitedlist = [];

        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/UpdateClientCard", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Card updated successfully !!", { position: "right top", className: "success" });
                $('#Mp_Add_Card').hide();
            }
            else {
                $.notify("Server error occured while updating a card !!", { position: "right top", className: "error" });
            }
        });

        return tempList;
    }

    var DeleteCard = function () {
        var _Obj = {
            'cardId': parseInt(deleteCardId)

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/DeleteClientCard", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Card deleted successfully !!", { position: "right top", className: "success" });
                $('#MP_Delete_Card').hide();
            }
            else {
                $.notify("Server error occured while deleting a card !!", { position: "right top", className: "error" });
            }
        });
    }

    var MakeDefault = function () {
        var _Obj = {
            'cardId': parseInt(defalutCardId)

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/MakeDefaultClientCard", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Card default completed successfully !!", { position: "right top", className: "success" });
                $('#MP_Default_Card').hide();
            }
            else {
                $.notify("Server error occured while defaulting a card !!", { position: "right top", className: "error" });
            }
        });
    }

    var InsertClientAccount = function () {
        var accountName =   $('#account-Name').val();
        var accountNumber = $('#account-Number').val();
        var routingNumber = $('#routing-Number').val();
        var isDefault = 0;
        if ($('#default-Account').is(':checked')) {
            isDefault = 1;
        }
        else {
            isDefault = 0;
        }
        var insertAccountObject = {
            'AccountName': accountName,
            'AccountNumber': accountNumber,
            'RoutingNumber': routingNumber,
            'ReferenceID':accountRefID,
            'IsDefault': isDefault,
            'ACHCustomerID': achCustomerid

        }
        var _Obj = {
            'accountDetails':insertAccountObject
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/InsertClientAccount", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Account saved successfully !!", { position: "right top", className: "success" });
                $('#Mp_Add_ACH').hide();
            }
            else {
                $.notify("Server error occured while saving a account !!", { position: "right top", className: "error" });
            }
        });

        return tempList;


    }

    var GeteditClientAccountDetails = function (accountID) {
        var _obj = {
            'editAccountID': accountID
        };

        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/GetEditAccountDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateClientAccount = function () {
        var accountName = $('#account-Name').val();
        var accountNumber = $('#account-Number').val();
        var routingNumber = $('#routing-Number').val();
        var isDefault = 0;
        if ($('#default-Account').is(':checked')) {
            isDefault = 1;
        }
        else {
            isDefault = 0;
        }
        var updateAccountObject = {
            'AccountName': accountName,
            'AccountNumber': accountNumber,
            'RoutingNumber': routingNumber,
            'ReferenceID': accountRefID,
            'IsDefault': isDefault,
            'AccountIdentityID': editClientAccountId,
            'ACHCustomerID': achCustomerid
        }
        var _Obj = {
            'accountDetails': updateAccountObject
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/UpdateClientAccount", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Account updated successfully !!", { position: "right top", className: "success" });
                $('#Mp_Add_ACH').hide();
            }
            else {
                $.notify("Server error occured while updating a account !!", { position: "right top", className: "error" });
            }
        });

        return tempList;
    }

    var DeleteAccount = function () {
        var _Obj = {
            'accountID': parseInt(deleteAccountID)

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/DeleteClientAccount", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Account deleted successfully !!", { position: "right top", className: "success" });
                $('#MP_Delete_Card').hide();
            }
            else {
                $.notify("Server error occured while deleting a account !!", { position: "right top", className: "error" });
            }
        });
    }

    var MakeDefaultAccount = function () {
        var _Obj = {
            'accountId': parseInt(defaultAccountID)

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/MakeDefaultClientAccount", _Obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("ACH default completed successfully !!", { position: "right top", className: "success" });
                $('#MP_Delete_Card').hide();
            }
            else {
                $.notify("Server error occured while defaulting a account !!", { position: "right top", className: "error" });
            }
        });
    }

    var CardInformationValidation=function(obj)
    {
        var _Obj = {
            'ObjCard': obj

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/AddCard", _Obj)).done(function (response) {
            tempList = response;
        });
        return tempList;

    }

    var AccountInformationValidation = function (obj) {
        var _Obj = {
            'ObjCustomer': obj

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/AddACH", _Obj)).done(function (response) {
            tempList = response;
        });
        return tempList;

    }

    var AccountInformationVerification = function (_Obj) {
       
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/VerifyACH", _Obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var UpdateAccountVerifiedStatus = function () {
        var obj = {
            'accountId': verificationAccount
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/ChangeVerifiedAccountStatus", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                $.notify("Account verified successfully !!", { position: "right top", className: "success" });
                $('#MP_Verification').hide();
            }
            else {
                $.notify("Server error occured while verifying a account !!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}

//Common
{
    var ClearVerifyAccountFields = function () {
        verificationAccount = 0;
        verificationSourceID = '';
        verificationCustomerID = '';
        $('#micro-Dep-One').val('');
        $('#micro-Dep-Two').val('');

    }

    var ClearCardFields = function () {
         $('#name-On-Card').val('');
         $('#card-Number').val('');
         $('#exp-Month').val('');
         $('#exp-Year').val('');
         $('#ccv-Number').val('');
         $('#bank-Name').val('');
         $("#set-Default").prop("checked", false);
         $("span.validation-message[data-validation]").hide();
       
    }

    var ClearAccountFields = function () {
        $('#account-Name').val('');
        $('#re-account-Number').val('');
        $('#account-Number').val('');
        $('#routing-Number').val('');
        $('#default-Account').prop('checked', false);
        $("span.validation-message[data-validation]").hide();
    }

    var ValidateClientCard = function () {
        var isValid = true;
        var nameOnCard =$.trim($('#name-On-Card').val());
        var cardNumber = $.trim($('#card-Number').val());
        var expMonth = $.trim($('#exp-Month').val());
        var expYear = $.trim($('#exp-Year').val());
        var ccvNumber = $.trim($('#ccv-Number').val());
        var currentMonth = moment().month();
        var currentYear = moment().year();
        if (nameOnCard == null || nameOnCard == '') {
            isValid = false;
            $('#cardname-Validation').show();
        }
        if (cardNumber == null || cardNumber == '') {
            isValid = false;
            $('#cardnumber-Validation').show();
        }
        if (expMonth == null || expMonth == '') {
            isValid = false;
            $('#expmonth-Validation').show();
        }
        if (expYear == null || expYear == '') {
            isValid = false;
            $('#expyear-Validation').show();
        }
        if (ccvNumber == null || ccvNumber == '') {
            isValid = false;
            $('#CCV-Validation').show();
        }
        if (expYear != null && expYear != '') {
            if (parseInt(expYear) < currentYear) {
                isValid = false;
                $('#expCurrentYear-Validation').show();
            }

        }

        if (cardNumber != '' && cardNumber.length != 19) {
            isValid = false;
            $('#cardnumberCount-Validation').show();

        }

        if (ccvNumber != '' && ccvNumber.length != 3) {
            isValid = false;
            $('#CCVCount-Validation').show();
        }

        if (expMonth != '' && expMonth.length != 2) {
            isValid = false;
            $('#expmonthLength-Validation').show();
        }

        if (expMonth != '' && parseInt(expMonth) > 12) {
            isValid = false;
            $('#expmonthValue-Validation').show();
        }
        if (cardNumber != '' && expMonth != '' && expYear != '' && ccvNumber != '') {
            var obj = {
                'CardNumber': cardNumber,
                'ExpiryMonth': expMonth,
                'ExpiryYear': expYear,
                'CVV':ccvNumber
            }
            var cardValidatedInfo = CardInformationValidation(obj);
            if (cardValidatedInfo != null && !cardValidatedInfo.IsSuccess)
            {
                isValid = false;
                //$('#cardnumberInfo-Validation').html(cardValidatedInfo.message);
                //$('#cardnumberInfo-Validation').show();
                $.notify('' + cardValidatedInfo.message + '', { position: "right top", className: "error" });
                
            }
            else {
                $('#cardnumberInfo-Validation').val('');
                $('#cardnumberInfo-Validation').hide();
                if (cardValidatedInfo != null) {
                    cardRefID = (cardValidatedInfo.Identity == null ? '' : cardValidatedInfo.Identity);
                }
                
            }
          
        }
        return isValid;
    }

    var ValidateACH = function () {
        var isValid = true;
        var accountName = $.trim($('#account-Name').val());
        var accountNumber =$.trim($('#account-Number').val());
        var routingNumber =$.trim($('#routing-Number').val());
        var reEnteredAccNumber = $.trim($('#re-account-Number').val());


        if (accountName == null || accountName == '') {
            isValid = false;
            $('#accname-Validation').show();
        }
        if (accountNumber == null || accountNumber == '') {
            isValid = false;
            $('#accnumber-Validation').show();
        }
        if (routingNumber == null || routingNumber == '') {
            isValid = false;
            $('#routingNumber-Validation').show();
        }
        if (reEnteredAccNumber == null || reEnteredAccNumber == '') {
            isValid = false;
            $('#reEnteredaccnumberEmpty-Validation').show();
        }
        if (reEnteredAccNumber != '' && accountNumber != reEnteredAccNumber)
        

        {
            isValid = false;
            
            $('#reEnteredaccnumber-Validation').show();
        }

        if (accountNumber != '' && routingNumber != '') {
            var obj = {
                'account_number': accountNumber,
                'routing_number': routingNumber,
                'CustomerName': accountName,
                'country': 'US',
                'currency':'usd',
            }
            var accountValidatedInfo = AccountInformationValidation(obj);
            if (accountValidatedInfo != null && !accountValidatedInfo.IsSuccess) {
                isValid = false;
           
                $.notify('' + accountValidatedInfo.message + '', { position: "right top", className: "error" });
            }
            else {
                if (accountValidatedInfo != null) {
                    accountRefID = (accountValidatedInfo.Identity == null ? '' : accountValidatedInfo.Identity);
                    if (accountValidatedInfo.Description != null) {
                        var parsedDescription = $.parseJSON(accountValidatedInfo.Description);
                        achCustomerid = (parsedDescription.customer == null ? '' : parsedDescription.customer);
                    }
                }
            }
            
        }
        return isValid;
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

    var RegisterNumericOnly = function () {
        $('.number-only').mask('#');
    }
       

    
}


