//Global Variables
{
    var screenData = [];
    var billID = 0;
    var selectedPaymentMethod = ''
    var selectedName = '';
    var selectedNumber = '';
    var selectedPaymentIdentityID = 0;
    var cardPaymentToken = '';
    var accountReferenceID = '';
    var isBillPayed = false;
    var VendorEmailID = "";
    var VendorPhoneNumber = "";
    var PayableAmount = 0;
    var sltType = 1;
    var userBillId = 0;
    var dwollBalance = 0;
    var dwollaCustomerID = '';

}

//Load & Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        billID = ((GetQueryStrings()["billID"] == undefined || GetQueryStrings()["billID"] == null) ? 0 : GetQueryStrings()["billID"]);
        userBillId = ((GetQueryStrings()["userBillId"] == undefined || GetQueryStrings()["userBillId"] == null) ? 0 : GetQueryStrings()["userBillId"]);
        if (billID != 0) {
            BuildScreen();
        }
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-paynow-paypal', function (e) {
        e.preventDefault();
        var $modal = $('#mp_paypal-paynow-confirmation');
        $('#txt-email-paypal').val((VendorEmailID == null ? "" : $.trim(VendorEmailID)));
        $('#txt-payable-amount').html('$' + PayableAmount);
        var Balance = ReadPaypalBalance();
        if (Balance != null) {
            var Value1 = PayableAmount.split('').filter(n => n !== ',').join('');
            var Value2 = Balance.split('').filter(n => n !== ',').join('');
            if (parseFloat(Value2) < parseFloat(Value1)) {
                $('#btn-submit-paypal-payout').prop('disabled', true);
                $('#err-paypal-payout').show();
            }
            else {
                $('#bal-paypal,#txt-paypal-balance-check').html('$' + (Balance == null || Math.sign(parseFloat(Balance)) == -1 ? 0 : parseFloat(Balance).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))).removeAttr('data-connect-paypal');
                $('#btn-submit-paypal-payout').prop('disabled', false);
                $('#err-paypal-payout').hide();
            }
        }
        else {
            $('#btn-submit-paypal-payout').prop('disabled', true).hide();
            $('#err-paypal-payout').html('Paypal setup not completed. Please contact your administrator').show();
        }
        $modal.modal('show');
    });

    $(document).on('change', '[data-PaymentType]', function (e) {
        e.preventDefault();
        var value = $(this).val();
        if (value == 1) {
            sltType = 1;
            $('#txt-email-paypal').val((VendorEmailID == null ? "" : $.trim(VendorEmailID))).show();
            $('#txt-phone-paypal').val('').hide();
        }
        else {
            sltType = 2;
            $('#txt-email-paypal').val('').hide();
            $('#txt-phone-paypal').val((VendorPhoneNumber == null ? "" : $.trim(VendorPhoneNumber))).show();
            $('#txt-phone-paypal').mask('+1 (000)-000-0000');
        }
    });

    $(document).on('click', '#btn-submit-paypal-payout', function (e) {
        e.preventDefault();
        var $modal = $('#mp_paypal-paynow-confirmation');
        var ReceipientType = "";
        var Receipient = "";
      //  var sltType = $('#slt-paypal-paymenttype').val();
        var isvalidinputs = true;
        if (sltType == 1) {
            // Email
            ReceipientType = "EMAIL";
            Receipient = $('#txt-email-paypal').val();
            if (!validateEmail(Receipient)) {
                $('#err-paypal-payout').html('Vendor Email is not valid').show();
                isvalidinputs = false;
            }
            else {
                $('#err-paypal-payout').html('Vendor Email is not valid').hide();
            }
        }
        else {
            // Phone
            ReceipientType = "PHONE";
            Receipient = $('#txt-phone-paypal').val();
            if (!validatePhone(Receipient)) {
                $('#err-paypal-payout').html('Vendor Phone is not valid').show();
                isvalidinputs = false;
            }
            else {
                $('#err-paypal-payout').html('Vendor Phone is not valid').hide();
            }
        }

        if (isvalidinputs) {
            var Balance = ReadPaypalBalance();
            var BillInfo = screenData["BillDetails"];
            var vendorDetails = screenData["VendorDetails"];
            var billObj = {
                'StrDate': moment().format('MMMM DD YYYY'),
                'VendorEmail': (vendorDetails[0]["Email"] == null ? '' : vendorDetails[0]["Email"]),
                'InvoiceNumber': (BillInfo[0]["InvoiceNumber"] == null ? '' : BillInfo[0]["InvoiceNumber"]),
                'VendorName': (vendorDetails[0]["VendorName"] == null ? '' : vendorDetails[0]["VendorName"]),
                'Amount': parseFloat(BillInfo[0]["Amount"] == null ? 0.00 : BillInfo[0]["Amount"]),
                'TotalAmount':("$" + (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? '$0' : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")))
            }
            
            if (Balance != null) {
                var Value1 = PayableAmount.split('').filter(n => n !== ',').join('');
                var Value2 = Balance.split('').filter(n => n !== ',').join('');
                if (parseFloat(Value2) < parseFloat(Value1)) {
                    $('#btn-submit-paypal-payout').prop('disabled', true);
                    $('#err-paypal-payout').show();
                }
                else {
                    $('#btn-submit-paypal-payout').prop('disabled', false);
                    $('#err-paypal-payout').hide();

                    // Prepare Payout Object'
                    var ObjPayout = {
                        "sender_batch_header": {
                            "sender_batch_id": "Payoutes_" + moment().unix(),
                            "email_subject": "You have a payout!",
                            "email_message": "You have received a payout! Thanks for your service!"
                        },
                        "items": [
                            {
                                "recipient_type": ReceipientType,
                                "amount": {
                                    "value": Value1,
                                    "currency": "USD"
                                },
                                "note": "Thanks for your patronage!",
                                "sender_item_id": $.trim(moment().unix()),
                                "receiver": Receipient
                            }
                        ]
                    }
                    if (DoPayout(ObjPayout, billID, billObj,userBillId) > 0) {
                        $modal.modal('hide');
                        $.notify('Payment done successfully!!', { position: "right top", className: "success" });
                        setTimeout(function () {
                            GoBack();
                            //window.location.href = "Bill_PaymentSummary.aspx";
                        }, 1000)
                    }
                    else {
                        $.notify('Payment failed, Please contact your administrator', { position: "right top", className: "error" });
                        $modal.modal('hide');
                    }
                }
            }
            else {
                $('#err-paypal-payout').html('Paypal setup not completed. Please contact your administrator').show();
            }
        }

    });

    $(document).on('click', '[data-PaymentMethod]', function () {
        selectedPaymentMethod = $(this).attr('data-PaymentMethod');
        selectedName = ($(this).attr('data-attr-Name') == null || $(this).attr('data-attr-Name') == undefined ? '-' : $(this).attr('data-attr-Name'))
        selectedNumber = ($(this).attr('data-attr-Number') == null || $(this).attr('data-attr-Number') == undefined ? '-' : $(this).attr('data-attr-Number'));
        selectedPaymentIdentityID = ($(this).attr('data-attr-Payment') == null || $(this).attr('data-attr-Payment') == undefined || $(this).attr('data-attr-Payment') == '' ? 0 : parseInt($(this).attr('data-attr-Payment')));
        $('[data-PaymentMethod]').removeClass('fa fa-check-circle-o isc-set-deflt yes');
        $('[data-PaymentMethod]').removeClass('fa fa-circle-o isc-set-deflt');
        $('[data-PaymentMethod]').addClass('fa fa-circle-o isc-set-deflt');
        $(this).removeClass('fa fa-circle-o isc-set-deflt')
        $(this).addClass('fa fa-check-circle-o isc-set-deflt yes');
        BindPaymentDetails();
    });

    $(document).on('click', '#btn-Pay-Now', function () {
        var vendorBankDetails = screenData["VendorBankDetails"];
        if (vendorBankDetails != undefined && vendorBankDetails != null && vendorBankDetails.length > 0) {
            ProcessPayment();
        }
        else {
            $.notify("Bank details not available for the vendor, Payment Failed!!", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '#btn-Cancel', function () {
        window.history.back();
    });

    $(document).on('click', '[data-PaymentType]', function () {
        var selectedType = $(this).attr('data-PaymentType');
        if (selectedType == '0') {
            $('#btn-paynow-paypal').show();
            $('#btn-paynow-dwolla').hide();
        }
        else {
            if (IsDwollaConnected()) {
                $('#btn-paynow-dwolla').show();
                $('#btn-paynow-paypal').hide();
                var payableAmountFlt = parseFloat(PayableAmount.replaceAll(',', ''));

                if (payableAmountFlt > dwollBalance) {
                    $('#btn-paynow-dwolla').prop('disabled', true);
                    $('#btn-paynow-dwolla').css("background-color", "#eeeeee");

                }
                else {
                    $('#btn-paynow-dwolla').prop('disabled', false);
                }
            }
            else {
                $('#btn-paynow-dwolla').hide();
                $('#btn-paynow-paypal').hide();
            }
           
          
        }
    });

    $(document).on('click', '#btn-paynow-dwolla', function () {
       
        if (dwollaCustomerID != '' && dwollaCustomerID != null) {
            var fundingSourceList = GetDwollaFundingSources();
            if (fundingSourceList != null && fundingSourceList._embedded["funding-sources"] != null && fundingSourceList._embedded["funding-sources"].length > 0) {
                var fundingSources = fundingSourceList._embedded["funding-sources"];

              //  var fundingSourceBanks = GetmatchedRecord(fundingSources, 'type', "bank");
                BindFundingSources($('#slt-FundingSources'), fundingSources, 'Select Funding Source')
            }
            $('#mp_dwollaPayout').show();
        }
        else {
            //Connect with dwolla and open the pay window
           
            var vendorBankDetails = screenData["VendorBankDetails"];
            if (vendorBankDetails != null && vendorBankDetails.length > 0) {
                $.notify("Your vendor synchronizing with Dwolla ,Please wait", { position: "right top", className: "sucess" });
                var custId = ConnectVendorWithDwolls();
                if (custId != '' && custId != null) {
                    var fundingSourceList = GetDwollaFundingSources();
                    if (fundingSourceList != null && fundingSourceList._embedded["funding-sources"] != null && fundingSourceList._embedded["funding-sources"].length > 0) {
                        var fundingSources = fundingSourceList._embedded["funding-sources"];
                        var fundingSourceBanks = GetmatchedRecord(fundingSources, 'type', "bank");
                        BindFundingSources($('#slt-FundingSources'), fundingSourceBanks, 'Select Funding Source')
                    }
                    $('#mp_dwollaPayout').show();
                }
            }
            else
            {
                $.notify("Please add account details for this vendor", { position: "right top", className: "error" });
            }

        }
        
    });

    $(document).on('click', '[data-Cancel-Dwolla]', function () {
        $('#mp_dwollaPayout').hide();
    });

    $(document).on('click', '#btn-PayFromDwolla', function () {
        if ($('#slt-FundingSources').val() != '0') {
            SendFundToDwolla();
        }
        else {
            $.notify("Please select Transfer fund from !!", { position: "right top", className: "error" });
        }
        
    });

    $(document).on('change', '#slt-FundingSources', function () {
        var type = $('option:selected', this).attr('data-FStype');
        if (type == "bank" || type=="empty")
        {
            $('#balanceBlock').hide();
        }
        else {
            $('#balanceBlock').show();
        }
    });
}

//DOM Manipulation
{
    var BuildScreen = function () {
        screenData = GetPaymentMethodScreenData();
        if (screenData != null && screenData != undefined) {
            BindBillDetails();
            BindPaypalDetails();
            var Balance = ReadPaypalBalance();
            if (Balance != null) {
                $('#bal-paypal,#txt-paypal-balance-check').html('$' + (Balance == null || Math.sign(parseFloat(Balance)) == -1 ? 0 : parseFloat(Balance).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))).removeAttr('data-connect-paypal');
                $('#btn-paynow-paypal').show().prop('disabled', false);
            }
            else {
                $('#bal-paypal').html('Setup Paypal').attr('data-connect-paypal', true);
                $('#btn-paynow-paypal').hide().prop('disabled', true);
            }
            if (Balance != null) {
                var Value1 = PayableAmount.split('').filter(n => n !== ',').join('');
                var Value2 = Balance.split('').filter(n => n !== ',').join('');
                if (parseFloat(Value2) < parseFloat(Value1)) {
                    $('#btn-paynow-paypal').prop('disabled', true);
                    $('#btn-paynow-paypal').css("background-color", "#eeeeee");
                }
                else {
                    $('#btn-paynow-paypal').prop('disabled', false);
                  //  $('#btn-paynow-paypal').css("background-color", "#eeeeee");
                }
            }
            $('#pay-Cancel').attr('href', 'Bill_PaymentDetails.aspx?BillID=' + billID + '');
        }
        BindDwollaDetails();
        if (IsDwollaConnected()) {
          
            BindDwollaAccountDetails();
        }
      
    }

    var BindPaypalDetails = function () {
        var html = '';
        var $el = $('#preffered-Payments');
        // if (screenData["Paypal"] != undefined) {
        html += '<div class="isc-bill-pay-mthd" style="cursor:pointer" data-PaymentType="0">';
        html+='<div class="screen-row">';
        html+='<div class="div-col-90per">';
        html+='<h5 class="isc-bill-pay-mthd-h5">  <i class="fa fa-arrow-circle-o-down isc-bill-pay-mthd-icn isc-pay-clp"></i> Paypal</h5>';
        html+='</div>';
        html+='</div>';
        html += '</div>';
        html += '<div class="" data-toggle="tab">';
        html += '<div class="screen-row">';
        html += '<div class="div-col-100per">';
        html += '<div class="isc-pay-mnt-crd-cont" style="margin: 4px 10px;">';
        html += '<lable>PayPal Balance <span id="bal-paypal" class="isc-pay-mdh-crcy" style="display: block;"></span></lable>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        // }
        $el.html(html);

    }

    var BindDwollaDetails = function () {
        var html = '';
        var $el = $('#dwolla-Payments');
        // if (screenData["Paypal"] != undefined) {
        html += '<div class="isc-bill-pay-mthd"  style="cursor:pointer" data-PaymentType="1">';
        html += '<div class="screen-row">';
        html += '<div class="div-col-90per">';
        html += '<h5 class="isc-bill-pay-mthd-h5">  <i class="fa fa-arrow-circle-o-down isc-bill-pay-mthd-icn isc-pay-clp"></i> Dwolla</h5>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="" data-toggle="tab">';
        html += '<div class="screen-row">';
        html += '<div class="div-col-100per">';
        html += '<div class="isc-pay-mnt-crd-cont" style="margin: 4px 10px;">';
        html += '<lable>Dwolla Balance <span id="bal-dwolla" class="isc-pay-mdh-crcy" style="display: block;">$0.00</span></lable>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        // }
        $el.html(html);

    }

    var BindDwollaAccountDetails = function () {
       
        var dwollaAccountDetails = GetDwollaBalance();
        if (dwollaAccountDetails != null && dwollaAccountDetails != undefined)
        {
            if (dwollaAccountDetails.balance != null) {
                $('#bal-dwolla').html("$" + dwollaAccountDetails.balance.value);
                $('#dwolla-Balance-Amount').html("$" + dwollaAccountDetails.balance.value);
                dwollBalance = parseFloat(dwollaAccountDetails.balance.value);
            }
            
        }
       
  
    }

    var BindPrefferdPayments = function (preferredPayments) {
        var html = '';
        var $el = $('#preffered-Payments');
        if (preferredPayments != null && preferredPayments != undefined && preferredPayments.length > 0) {
            $.each(preferredPayments, function (index, item) {
                html += '<div class="isc-bill-pay-mthd active" data-toggle="tab">';
                html += '<div class="screen-row">';
                html += '<div class="div-col-10per">';
                if (item["Source"] == 'ACH') {
                    html += '<i style="margin-top:11px !important;" data-attr-Name="' + common.NFTD(item["Name"]) + '" data-attr-Number="' + common.NFTD(item["Number"]) + '" class="fa fa-circle-o isc-set-deflt" data-PaymentMethod="ACH" data-attr-Payment="' + (item['ID'] == null ? 0 : item['ID']) + '"></i> ';
                }
                else {
                    html += '<i style="margin-top:11px !important;" data-attr-Name="' + common.NFTD(item["Name"]) + '" data-attr-Number="' + common.NFTD(item["Number"]) + '"  class="fa fa-check-circle-o isc-set-deflt yes" data-PaymentMethod="Card" data-attr-Payment="' + (item['ID'] == null ? 0 : item['ID']) + '"></i> '
                }
                html += '</div>';
                html += '<div class="div-col-90per">';
                if (item["Source"] == 'ACH') {
                    html += '<h5 class="isc-bill-pay-mthd-h5" title="' + common.NFTD(item["Name"]) + '"> ' + common.NFTD(item["Name"]) + ' ( ACH )</h5>';
                }
                else {
                    selectedPaymentIdentityID = (item['ID'] == null ? 0 : parseInt(item['ID']));
                    selectedPaymentMethod = 'Card';
                    selectedName = common.NFTD(item["Name"]);
                    selectedNumber = common.NFTD(item["Number"])
                    html += '<h5 class="isc-bill-pay-mthd-h5" title="' + common.NFTD(item["Name"]) + '"> ' + common.NFTD(item["Name"]) + ' ( Card )</h5>';
                }

                html += '<h5 class="isc-bill-pay-mthd-h5"  title="' + common.NFTD(item["Number"]) + '">' + common.NFTD(item["Number"]) + '</h5>';
                html += '</div>';

                // html += '<i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>';

                html += '</div>';
                html += '</div>';
            });
        }
        else {
            html += '<h5>No Data Found</h5>';
        }
        $el.html(html);
    }

    var BindCards = function (cards) {
        var html = '';
        var $el = $('#cards');
        if (cards != null && cards != undefined && cards.length > 0) {
            $.each(cards, function (index, item) {
                html += '<div class="isc-bill-pay-mthd active" data-toggle="tab">';
                html += '<div class="screen-row">';
                html += '<div class="div-col-10per">';
                html += '<i style="margin-top:11px !important;"  data-PaymentMethod="Card" data-attr-Name="' + common.NFTD(item["CardName"]) + '" data-attr-Number="' + common.NFTD(item["CardNumber"]) + '"  class="fa fa-circle-o isc-set-deflt" data-attr-Payment="' + (item['CardIdentityId'] == null ? 0 : item['CardIdentityId']) + '"></i>';
                // html += '<i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>';
                html += '</div>';
                html += '<div class="div-col-90per">';
                html += '<h5 class="isc-bill-pay-mthd-h5" title="' + common.NFTD(item["CardName"]) + '"> ' + common.NFTD(item["CardName"]) + '</h5>';
                html += '<h5 class="isc-bill-pay-mthd-h5"  title="' + common.NFTD(item["CardNumber"]) + '">' + common.NFTD(item["CardNumber"]) + '</h5>';
                html += '</div>';

                html += '</div>';
                html += '</div>';
            });
        }
        else {
            html += '<h5>No Data Found</h5>';
        }
        $el.html(html);
    }

    var BindACH = function (ACH) {
        var html = '';
        var $el = $('#ACH');
        if (ACH != null && ACH != undefined && ACH.length > 0) {
            $.each(ACH, function (index, item) {
                html += '<div class="isc-bill-pay-mthd active" data-toggle="tab">';
                html += '<div class="screen-row">';
                html += '<div class="div-col-10per">';
                html += '<i  style="margin-top:11px !important;" data-PaymentMethod="ACH" data-attr-Name="' + common.NFTD(item["AccountName"]) + '" data-attr-Number="' + common.NFTD(item["AccountNumber"]) + '" class="fa fa-circle-o isc-set-deflt" data-attr-Payment="' + (item['AccountIdentityID'] == null ? 0 : item['AccountIdentityID']) + '"></i>';
                // html += '<i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>';
                html += '</div>';
                html += '<div class="div-col-90per">';
                html += '<h5 class="isc-bill-pay-mthd-h5" title="' + common.NFTD(item["AccountName"]) + '"> ' + common.NFTD(item["AccountName"]) + '</h5>';
                html += '<h5 class="isc-bill-pay-mthd-h5"  title="' + common.NFTD(item["AccountNumber"]) + '">' + common.NFTD(item["AccountNumber"]) + '</h5>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
        }
        else {
            html += '<h5>No Data Found</h5>';
        }
        $el.html(html);
    }

    var BillAttatchmentFrame = function () {
        $('#billFrameBlock').html('');

        var fileImage = BillInfo[0]["FileName"];
        if (fileImage != null) {
            var iframe = document.getElementById("attachment_Frame");
            if (null !== iframe) {
                document.body.removeChild(iframe);
            }
            else {
                var iframe = document.createElement("iframe");
                iframe.id = "attachment_Frame";
                var iframewidth = 390;
                iframe.src = filePathUrl + fileImage;
                iframe.className = 'isc-new-exp-pdf';
                iframe.setAttribute("style", "border: none; width: 100%; height: 470px; overflow: hidden; overflow-y: auto;")
                $('#billFrameBlock').append(iframe);
            }
        }
        else {
            $('#file-Message').show();
        }
    }

    var BindBillDetails = function () {
       
        var BillInfo = screenData["BillDetails"];
        var vendorInfo = screenData["VendorDetails"];

        if (BillInfo != null && BillInfo != undefined && BillInfo.length > 0) {
            if (vendorInfo != null && vendorInfo != undefined && vendorInfo.length > 0) {

                $('#vendorName').html(common.NFTD(vendorInfo[0]["VendorName"]));
                dwollaCustomerID = vendorInfo[0]["DwollaCustomerID"];
            }
            else {
                $('#vendorName').html('-');
            }
           
            $('#bill-Date').html(common.NFLD(BillInfo[0]["BillDate"]));
            $('#bill-Number').html(BillInfo[0]["InvoiceNumber"] == null ? '' : BillInfo[0]["InvoiceNumber"]);
            $('#due-Amount').html("$" + (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? 0 : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#payable-Amount-ToVendor').html("$" + (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? 0 : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#due-Date').html((BillInfo[0]["DueON"] == null ? '-' : moment(BillInfo[0]["DueON"]).format('MM/DD/YYYY')));
            $('#description').html(common.NFTD(BillInfo[0]["Description"]));
            PayableAmount = (BillInfo[0]["Amount"] == null || Math.sign(parseFloat(BillInfo[0]["Amount"])) == -1 ? 0 : parseFloat(BillInfo[0]["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

           
        }

        if (vendorInfo != undefined) {
            VendorEmailID = (vendorInfo[0]["Email"] == null ? "" : $.trim(vendorInfo[0]["Email"]));
            if (vendorInfo[0]["VendorLogo"] != null && vendorInfo[0]["VendorLogo"] != '') {
                var image = "images/VendorLogos/" + vendorInfo[0]["VendorLogo"] + "";
                $('#vendor-Logo').attr('src', image);
            }
            $('#vendor-Address').html(common.NFTD(vendorInfo[0]["Address1"]))
            VendorPhoneNumber = (vendorInfo[0]["Phone"] == null ? "" : $.trim(vendorInfo[0]["Phone"]));
        }

    }

    var BindPaymentDetails = function () {
        if (selectedPaymentMethod == 'Card') {
            $('#payment-Name-Lable').html('Name On Card :');
            $('#payment-Number-Lable').html('Card Number :');
            var lastFourDigits = selectedNumber.substring(15);
            $('#payment-Name-Value').html(selectedName);
            $('#payment-Number-Value').html("***** ***** **** " + lastFourDigits + "");
        }
        else {
            $('#payment-Name-Lable').html('Account Name :');
            $('#payment-Number-Lable').html('Account Number :');
            var lastFourDigits = selectedNumber.substring(8);
            $('#payment-Name-Value').html(selectedName);
            $('#payment-Number-Value').html("********" + lastFourDigits + "");

        }
    }

    var ShowPaymentProcessResult = function () {
        if (isBillPayed) {
            $('#btn-Pay-Now').hide();
            $.notify('Bill amount payed for the vendor', { position: "right top", className: "success" });
            //Show the Bill payed Sucess popup
        } else {
            $.notify('Payment failed!!', { position: "right top", className: "error" });
            //Show bill payment error popup
        }
    }

}

//Data Manipulation
{
    var IsDwollaConnected = function () {
        var IsConnected = GetIsDwollaConnected();
        return IsConnected;
    }

    var GetIsDwollaConnected = function () {
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/IsDwollaConnected", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;
    }

    var ConnectVendorWithDwolls = function () {
        
        var vendorBankDetails = screenData["VendorBankDetails"];
        var vendorDetails= screenData["VendorDetails"];
        var accountHolderName = vendorBankDetails[0]["AccountHolderName"];
        var accountNumber = vendorBankDetails[0]["AccountNumber"];
        var routingNumber = vendorBankDetails[0]["RoutingNumber"];
        var vendorObj = {
            'FirstName': vendorDetails[0]["VendorName"],
            'Email': vendorDetails[0]["Email"],
            'VendorID': vendorDetails[0]["VendorID"],
        }
        var bankObj = {
            'AccountNumber': accountNumber,
            'RoutingNumber': routingNumber,
            'AccountHolderName': accountHolderName,
        }
        var combinedObj = {
            'Vendor': vendorObj,
            'VendorBankAccount':bankObj,
        }
        var connectObj = {
            'vendorValues':combinedObj
        }
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentMethod.aspx/ConnectVendorWithDwolla", connectObj)).done(function (response) {
            if (response != null && response != '') {
                dwollaCustomerID = response;
                $.notify("Vendor synced with dwolla successfully!", { position: "right top", className: "success" });
            }
            else {
                $.notify("Server error occured while syncing vendor with dwolla!", { position: "right top", className: "error" });
            }
        });
        return dwollaCustomerID;
    }

    var GetDwollaBalance = function () {

        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/GetDwollaAccountdetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

        });
        return tempList;

    }

    var GetDwollaFundingSources = function () {

        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/GetDwollaFundingSources", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

        });
        return tempList;

    }

    var SendFundToDwolla = function () {
       
        var vendorData = screenData["VendorDetails"]
        var billData = screenData["BillDetails"];
        var bankDetails = screenData["VendorBankDetails"]
       
        PayableAmount = PayableAmount.replace(/[^\d\.\-]/g, "");
        PayableAmount = parseFloat(PayableAmount);
        var _obj = {
            'fundingSource': $('#slt-FundingSources').val(),
            'value': parseFloat(PayableAmount),
            //'custid': vendorData[0]["DwollaFundID"],
            'custid': dwollaCustomerID,
            'BillID': parseInt(billData[0]["BillID"]),
            'ApprovedBillID': parseInt(billData[0]["IdentityId"]),
            'Amount': parseFloat(PayableAmount),
        }
        var fundObj = {
            'FundObj': _obj
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/TransferFundToDwolla", fundObj)).done(function (response) {
            //  tempList = $.parseJSON(response);
          
            if (response != null && response != "") {
                $('#mp_dwollaPayout').hide();
                $.notify("Bill Payment initiated through Dwolla Successfully !!", { position: "right top", className: "success" });
                GoBack();
                
            }
            else {
                $.notify("Server error occured while transferring fund to vendor !!", { position: "right top", className: "error" });
            }

        });
        //return tempList;
    }

    var GetPaymentMethodScreenData = function () {
        var _obj = {
            'billID': parseInt(billID)
        };

        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/GetPaymentMethodScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ProcessPayment = function () {
        var vendorDetails = screenData["VendorDetails"];
        var vendorBankDetails = screenData["VendorBankDetails"];
        if (vendorDetails != undefined && vendorDetails != null && vendorDetails.length > 0) {
            //Vendor Objects
            var vendorObj = {
                'FirstName': (vendorDetails[0]["FirstName"] == null ? '' : vendorDetails[0]["FirstName"]),
                'last_name': (vendorDetails[0]["LastName"] == null ? '' : vendorDetails[0]["LastName"]),
                'email': (vendorDetails[0]["Email"] == null ? '' : vendorDetails[0]["Email"]),
                'city': (vendorDetails[0]["City"] == null ? '' : vendorDetails[0]["City"]),
                'country': (vendorDetails[0]["Country"] == null ? '' : vendorDetails[0]["Country"]),
                'line1': (vendorDetails[0]["Address1"] == null ? '' : vendorDetails[0]["Address1"]),
                'line2': (vendorDetails[0]["Address2"] == null ? '' : vendorDetails[0]["Address2"]),
                'postal_code': (vendorDetails[0]["PostalCode"] == null ? '' : vendorDetails[0]["PostalCode"]),
                'state': (vendorDetails[0]["State"] == null ? '' : vendorDetails[0]["State"]),
                'day': '01',
                'month': '01',
                'year': '2000',
                'id_number': (vendorDetails[0]["SSNNumber"] == null ? '' : vendorDetails[0]["SSNNumber"]),
                'phone': (vendorDetails[0]["Phone"] == null ? '' : vendorDetails[0]["Phone"]),
                'url': (vendorDetails[0]["WebsiteURL"] == null ? '' : vendorDetails[0]["WebsiteURL"]),
                //'date':moment().format('MM/DD/YYYY'),
                'date': Math.round((new Date()).getTime() / 1000),
                'ip': '192.168.43.231',
                'IsBankAccountAttached': false
            }

            //Vendor BankAccountObject
            var vendorBankAccountObj = {
                'Country': 'US',
                'Currency': 'usd',
                'Object': '',
                'AccountHolderName': '',
                'AccountType': 'individual',
                'RoutingNumber': '',
                'AccountNumber': ''
            }

            //Cheking Vendor Reference ID
            if (vendorDetails[0]["ReferenceID"] == null || vendorDetails[0]["ReferenceID"] == '') {
                //Create Connected Account
                var createdVendorRefID = '';
                var createdVendorResponse = CreateVendorAccount(vendorObj, vendorBankAccountObj);

                //Checking Created vendor response
                if (createdVendorResponse != null && createdVendorResponse.IsSuccess) {
                    createdVendorRefID = createdVendorResponse.Identity;

                    //Create Contacted_bank Accounts
                    var AccountHolderName = (vendorBankDetails[0]["AccountHolderName"] == null ? '' : vendorBankDetails[0]["AccountHolderName"])
                    var RoutingNumber = (vendorBankDetails[0]["RoutingNumber"] == null ? '' : vendorBankDetails[0]["RoutingNumber"])
                    var AccountNumber = (vendorBankDetails[0]["AccountNumber"] == null ? '' : vendorBankDetails[0]["AccountNumber"])

                    //Create Token
                    const PromiseE = new Promise((resolve, reject) => {
                        setTimeout(function () {
                            resolve(stripe
                                .createToken('bank_account', {
                                    country: 'US',
                                    currency: 'usd',
                                    routing_number: RoutingNumber,
                                    account_number: AccountNumber,
                                    account_holder_name: AccountHolderName,
                                    account_holder_type: 'individual',
                                }));
                        }, 1);
                    });
                    PromiseE.then(function (result) {
                        var recivedToken = result.token.id;
                        //Created ConnectedAccount_BankAccount
                        var createConnectedAccountResult = CreatedConnectedBankAccounts(createdVendorRefID, recivedToken);

                        //Cheking CreatedContactBankAccount
                        if (createConnectedAccountResult != null && createConnectedAccountResult.IsSuccess) {
                            //Checking the account using newly created accountRefID
                            var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(createdVendorRefID);
                            var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
                            //Validate Individual Error here///
                            if (responseDesc != null && responseDesc.individual.verification.status == "verified" && responseDesc.individual.requirements.errors.length == 0 && responseDesc.external_accounts.data.length > 0) {
                                //Updating Reference ID in DB using recived Reference ID
                                accountReferenceID = createdVendorRefID;
                                UpdateVendorRefID(createdVendorRefID, parseInt(vendorDetails[0]["VendorID"]));

                                //Payment Process
                                PayBillAmount();
                            }
                            else if (responseDesc.individual.requirements.errors.length > 0) {
                                //Show the requirement error to the user
                                $.notify('' + responseDesc.individual.requirements.errors[0]["reason"] + '', { position: "right top", className: "error" });

                            }
                        }
                        else {
                            //Show the error message to user
                        }
                    });
                }
                else {
                    //Show error to user
                }
            }
            else {
                accountReferenceID = vendorDetails[0]["ReferenceID"];
                //Process will happen if the referenceId is already created for the vendor
                var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(vendorDetails[0]["ReferenceID"]);
                var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
                //Checking Referenceid status and externalAccount data length

                //Validate Individual Error here///
                if (responseDesc != null && responseDesc.individual.verification.status == "verified" && responseDesc.individual.requirements.errors.length == 0 && responseDesc.external_accounts.data.length > 0) {
                    PayBillAmount();
                    //Payment Process
                }
                else if (responseDesc.individual.requirements.errors.length > 0) {
                    //Show the requirement error to the user
                    $.notify('' + responseDesc.individual.requirements.errors[0]["reason"] + '', { position: "right top", className: "error" });
                }
                else {
                    //Create Contacted Accounts
                    var AccountHolderName = (vendorBankDetails[0]["AccountHolderName"] == null ? '' : vendorBankDetails[0]["AccountHolderName"]);
                    var RoutingNumber = (vendorBankDetails[0]["RoutingNumber"] == null ? '' : vendorBankDetails[0]["RoutingNumber"]);
                    var AccountNumber = (vendorBankDetails[0]["AccountNumber"] == null ? '' : vendorBankDetails[0]["AccountNumber"]);

                    //Create Token
                    const PromiseE = new Promise((resolve, reject) => {
                        setTimeout(function () {
                            resolve(stripe
                                .createToken('bank_account', {
                                    country: 'US',
                                    currency: 'usd',
                                    routing_number: RoutingNumber,
                                    account_number: AccountNumber,
                                    account_holder_name: AccountHolderName,
                                    account_holder_type: 'individual',
                                }));
                        }, 1);
                    });
                    PromiseE.then(function (result) {
                        var recivedToken = result.token.id;
                        var createConnectedAccountResult = CreatedConnectedBankAccounts(vendorDetails[0]["ReferenceID"], recivedToken);
                        var retrivedConnectedAccountDetails = GetretrivedConnectedAccountDetails(vendorDetails[0]["ReferenceID"]);
                        var responseDesc = $.parseJSON(retrivedConnectedAccountDetails["Description"]);
                        //Checking Referenceid status and externalAccount data length

                        //Validate Individual Error here///
                        if (responseDesc != null && responseDesc.individual.verification.status == "verified" && responseDesc.individual.requirements.errors.length == 0 && responseDesc.external_accounts.data.length > 0) {
                            //Payment Process
                        }
                        else if (responseDesc.individual.requirements.errors.length > 0) {
                            $.notify('' + responseDesc.individual.requirements.errors[0]["reason"] + '', { position: "right top", className: "error" });
                            //Show the requirement error to the user
                        }
                        else {
                            //Show the error message to user
                        }
                    });
                }
            }

        }
        UpdatePayedBillStatus();
        ShowPaymentProcessResult();

    }

    var GetretrivedConnectedAccountDetails = function (refID) {
        var obj = {
            'RefID': refID,
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/GetretrivedConnectedAccountDetails", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var CreatedConnectedBankAccounts = function (refID, token) {
        var obj = {
            'RefID': refID,
            'token': token
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/CreateConnectedAccount_BankDetails", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var CreateVendorAccount = function (vendorObj, vendorBankObj) {
        var obj = {
            'ObjstripeConnectedAccounts': vendorObj,
            'ObjUsersBankAccount': vendorBankObj
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/ProcessPayment", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var UpdateVendorRefID = function (refID, vendorID) {
        var obj = {
            'refID': refID,
            'VendorID': vendorID
        }
        var tempList = {};
        $.when(RequestServer("PaymentMethod.aspx/UpdateReferenceID", obj)).done(function (response) {
            tempList = response;
        });
        return tempList;
    }

    var PayBillAmount = function () {
        cardPaymentToken = '';
        if (selectedPaymentMethod == 'Card') {
            var paymentCardInfo = GetPaymentCardInfo();
            if (paymentCardInfo == null || !paymentCardInfo.IsSuccess) {
                $.notify('' + paymentCardInfo.message + '', { position: "right top", className: "error" });
            }
            else {
                cardPaymentToken = (paymentCardInfo.Identity == null ? '' : paymentCardInfo.Identity);
                PayByCard();
            }

        } else {
            PayByAccount();

        }
    }

    var GetPaymentCardInfo = function () {
        var selecedCardDetail = GetmatchedRecord(screenData['Cards'], 'CardIdentityId', selectedPaymentIdentityID);
        var cardRefID = '';
        var cardValidatedInfo = {};
        if (selecedCardDetail != undefined && selecedCardDetail != null && selecedCardDetail.length > 0) {
            var cardNumber = (selecedCardDetail[0]["CardNumber"] == null ? '' : selecedCardDetail[0]["CardNumber"]);
            var expMonth = (selecedCardDetail[0]["ExpiryMonth"] == null ? '' : parseInt(selecedCardDetail[0]["ExpiryMonth"]));
            var expYear = (selecedCardDetail[0]["ExpiryYear"] == null ? '' : parseInt(selecedCardDetail[0]["ExpiryYear"]));
            var ccvNumber = (selecedCardDetail[0]["CCV"] == null ? '' : selecedCardDetail[0]["CCV"]);
            if (cardNumber != '' && expMonth != '' && expYear != '' && ccvNumber != '') {
                var obj = {
                    'CardNumber': cardNumber,
                    'ExpiryMonth': expMonth,
                    'ExpiryYear': expYear,
                    'CVV': ccvNumber
                }
                cardValidatedInfo = GetCardInformation(obj);
            }
        }

        return cardValidatedInfo;
    }

    var GetCardInformation = function (obj) {
        var _Obj = {
            'ObjCard': obj

        }
        var tempList = {};
        $.when(RequestServer("PaymentMethodList.aspx/AddCard", _Obj)).done(function (response) {
            tempList = response;
        });
        return tempList;

    }

    var PayByCard = function () {
        var billDetails = screenData["BillDetails"];
        if (cardPaymentToken != '' && cardPaymentToken != null) {
            var amount = (billDetails[0]['Amount'] == null ? '0' : billDetails[0]['Amount'].toString());
            var multipliedAmount = parseInt(amount) * 100;
            var objCardPayment = {
                'AccountID': accountReferenceID,
                'Amount': multipliedAmount,
                'PaymentToken': cardPaymentToken,
                'TransferAmount': multipliedAmount,
                'Currency': 'usd'
            }

            var obj = {
                'ObjPaymentTransaction': objCardPayment,
            }
            var tempList = {};
            $.when(RequestServer("PaymentMethod.aspx/PayAmountByCard", obj)).done(function (response) {
                tempList = response;
                if (response.IsSuccess) {
                    isBillPayed = true
                }
                else {
                    isBillPayed = false;
                    $.notify('' + response.message + '', { position: "right top", className: "error" });
                }
            });
            return tempList;

        }
        else {
            //Show error message to user
        }
    }

    var PayByAccount = function () {
        var selecedAccountDetail = GetmatchedRecord(screenData['ACH'], 'AccountIdentityID', selectedPaymentIdentityID);
        var billDetails = screenData["BillDetails"];
        if (selecedAccountDetail != undefined && selecedAccountDetail != null && selecedAccountDetail.length > 0) {
            var achCustomerID = (selecedAccountDetail[0]["ACHCustomer"] == null ? '' : selecedAccountDetail[0]["ACHCustomer"])
            if (achCustomerID != '') {
                var amount = (billDetails[0]['Amount'] == null ? '0' : billDetails[0]['Amount'].toString());
                var multipliedAmount = parseInt(amount) * 100;
                var objACHPayment = {
                    'Amount': multipliedAmount,
                    'AccountID': accountReferenceID,
                    'TransferAmount': multipliedAmount,
                    'Currency': 'usd',
                    'Customer': achCustomerID
                }

                var obj = {
                    'ObjPaymentTransaction': objACHPayment,
                }
                var tempList = {};
                $.when(RequestServer("PaymentMethod.aspx/PayAmountByAccount", obj)).done(function (response) {
                    tempList = response;
                    if (response.IsSuccess) {
                        isBillPayed = true;
                    }
                    else {
                        isBillPayed = false;
                        $.notify('' + response.message + '', { position: "right top", className: "error" });
                    }
                });
                return tempList;

            }
        }
        else {

        }

    }

    var UpdatePayedBillStatus = function () {
        if (isBillPayed) {
            var billDetails = screenData["BillDetails"];
            if (billDetails != undefined && billDetails != null && billDetails.length > 0) {
                var obj = {
                    'billID': (billDetails[0]["BillID"] == null ? 0 : billDetails[0]["BillID"])
                }
                var tempList = {};
                $.when(RequestServer("PaymentMethod.aspx/UpdatePayedBillStatus", obj)).done(function (response) {
                    tempList = $.parseJSON(response);
                    if (parseInt(response) > 0) {

                    }
                    else {
                        $.notify("Server error occured while updating the payed Bill status !!", { position: "right top", className: "error" });
                    }
                });
                return tempList;
            }
        }


    }

   
}

//Common
{
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePhone(Phone) {
        const re = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
        return re.test(Phone);
    }

    var BindFundingSources = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'id');
            if (DefaultItem != "") {
                html += '<option value="0" data-FStype="empty">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                html += '<option value="' + item["id"] + '" data-FStype="'+item["type"]+'">' + item["name"] + '</option>';
            });
            $el.html(html);
        }

    }

    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 2000);
    }
}