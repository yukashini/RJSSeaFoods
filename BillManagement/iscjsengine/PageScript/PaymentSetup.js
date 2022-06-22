
// Constants
{
    ActiveTab = "Paypal"
}

// Load
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BuildSetup();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[tab-paymentsetup]', function (e) {
        e.preventDefault();
        ActiveTab = $(this).attr('tab-paymentsetup');
        $loading.show();
        setTimeout(function () {
            BuildSetup();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#openPDF', function () {
        window.open(pdfDocumentUrl + "APICredentials_PayPal.pdf", '');
    });

    $(document).on('click', '#openDwollaPDF', function () {
        window.open(dwollaPdfDocumentUrl + "DwollaInstruction.pdf", '');
    });

    $(document).on('click', '[data-Payment-Option]', function () {
        
        var selectedPayment = $(this).attr('data-Payment-Option');
       
        $loading.show();
        setTimeout(function () {
        $('#payment-Options-Ul li').removeClass('isc-active');
        $('#payment-Options-Ul li[data-Payment-Option=' + selectedPayment + ']').addClass('isc-active');
        switch (selectedPayment) {
            case '1':
                $('.isc-opt2-cont').hide();
                $('#container-dwollainfo').hide();
                $('#btn-Dwolla-connect').hide();
                $('#btn-delete-DwollaAcc').hide();
                
                
                if (IsPaypalConnected()) {
                    $('#container-paypalsetup').hide();
                    $('#container-paypalinfo').show();
                    BindPaypalBalance();
                    BindPaypalTransaction();
                    $('#btn-connect').hide();
                    $('#btn-delete-DwollaAcc').hide();
                    $('#btn-delete-paypalaccount').show();

                    
                }
                else {
                    $('#container-paypalsetup').show();
                    $('#container-paypalinfo').hide();
                    $('#btn-connect').show();

                }
                break;
            case '2':
                $('.isc-opt1-cont').hide();
                $('#container-paypalsetup').hide();
                $('#container-paypalinfo').hide();
                //$('.isc-opt2-cont').show();
                $('#btn-connect').hide();
                $('#btn-Dwolla-connect').show();
                $('#btn-delete-paypalaccount').hide();
                $('#btn-delete-DwollaAcc').show();
                if (IsDwollaConnected())
            {
                $('.isc-opt2-cont').hide();
                $('#btn-Dwolla-connect').hide();
                $('#container-dwollainfo').show();
                    //BindDwolla Balance
                BindDwollaBalance();
                    //Render Transaction History
                BindDwollaTransactionHistory();
            }
            else {
                $('.isc-opt2-cont').show();
                $('#btn-Dwolla-connect').show();
                $('#container-dwollainfo').hide();
                $('#btn-delete-DwollaAcc').hide();
            }
                break;
        }
        $loading.hide();
        }, 0);
        
    });

    $(document).on('click', '#btn-Cancel', function () {
        GoBack();
    });
}

// Render Setup
{
    var BuildSetup = function () {
        switch (ActiveTab) {
            case "Paypal":
                LoadPaypalSetup();
                break;
        }

    }
}


//Dwolla setup
{
    //Events
    {
        $(document).on('click', '#btn-Dwolla-connect', function () {
            $('[span-Error]').hide();
            if (validateDwollaConnect()) {
                ConnectDwolla();
            }
           
        });

        $(document).on('click', '#btn-delete-DwollaAcc', function (e) {
            e.preventDefault();
            var $modal = $('#mp_delete_dwolla');
            $modal.modal('show');
        });

        $(document).on('click', '#btn-confirm-delete-dwollaaccount', function () {
            DeleteDwollaConfig();
        });

        $(document).on('click', '[dwolla-delete-cancel]', function (e) {
            e.preventDefault();
            var $modal = $('#mp_delete_dwolla');
            $modal.modal('hide');
        })
    }

    //Dom manipulation
    {
        var RenderDwollaDetails = function () {
            if (IsDwollaConnected())
            {
                $('.isc-opt2-cont').hide();
                $('#btn-Dwolla-connect').hide();
                $('#container-dwollainfo').show();
                //Render Dwolla Balance
                BindDwollaBalance();
                BindDwollaTransactionHistory();
                //Render Transaction History
            }
            else {
                $('.isc-opt2-cont').show();
                $('#btn-Dwolla-connect').show();
                $('#container-dwollainfo').hide();
              
            }
        
        }

        var IsDwollaConnected = function () {
            var IsConnected = GetIsDwollaConnected();
            return IsConnected;
        }

        var BindDwollaBalance = function () {
            var dwollaAccountDetails = GetDwollaBalance();
            if (dwollaAccountDetails != null && dwollaAccountDetails != undefined && dwollaAccountDetails.balance != null); {
                if (dwollaAccountDetails.balance != null) {
                    $('#lbl-dwollabalance').html("$" + dwollaAccountDetails.balance.value);
                }
               
            }
        }

        var BindDwollaTransactionHistory = function () {
            var transactionsList = GetDwollaTransactions();
            transactionsList = transactionsList["Transactions"];
            var $el = $('#tbl-Dwolla-transaction tbody');
            var html = "";
            if (transactionsList != null && transactionsList != undefined && transactionsList.length > 0) {
                $.each(transactionsList, function (index, item) {
                    html += '<tr>';
                    html += '<td style="width: 20%;" title="' + (item["FundId"] == null ? '-' : item["FundId"]) + '">' + (item["FundId"] == null ? '-' : item["FundId"]) + '</td>';
                    html += '<td style="width: 20%;" title="' + (item["FundFrom"] == null ? '-' : item["FundFrom"]) + '">' + (item["FundFrom"] == null ? '-' : item["FundFrom"]) + '</td>';
                    html += '<td style="width: 20%;" title="' + (item["FundTo"] == null ? '-' : item["FundTo"]) + '">' + (item["FundTo"] == null ? '-' : item["FundTo"]) + '</td>';
                    html += '<td style="width: 10%;" title="' + (item["Amount"] == null ? '-' : item["Amount"]) + '">$' + (item["Amount"] == null ? '0' : item["Amount"]) + '</td>';
                    html += '<td style="width: 15%;" title="' + (item["Remarks"] == null ? '-' : item["Remarks"]) + '">' + (item["Remarks"] == null ? '-' : item["Remarks"]) + '</td>';
                    html += '<td style="width: 10%;" title="' + (item["CapturedOn"] == null ? '-' : item["CapturedOn"]) + '">' + (item["CapturedOn"] == null ? '-' : item["CapturedOn"]) + '</td>';
                    html += '</tr>';
                })
            }
            else {
                html += '<tr><td colspan="6"><span>No Transaction Found</span></td></tr>';
            }
            $el.html(html);
           
        }
    }

    //Data manipulation
    {
        var ConnectDwolla = function () {
            var _obj = {
                'DwollaKey': $('#txt-DKey').val(),
                'SecretKey':$('#txt-DSecret').val()
            }
            var connectObj = {
                'ObjDwollaSettings':_obj
            }
            var tempList = null;
            $.when(RequestServer("PaymentSetup.aspx/ConnectDwolla", connectObj)).done(function (response) {
                tempList = response
                if (parseInt(response) > 0) {
                    $('#txt-DKey').val('');
                    $('#btn-delete-DwollaAcc').show();
                    $('#txt-DSecret').val('');
                    $('[span-Error]').hide();
                    RenderDwollaDetails();
                    $.notify("Dwolla Connected Successfully!!", {
                        position: "right top", className: "success"
                    });
                   
                }
                else {
                    $.notify("Server error occured while connecting to Dwolla!!", {
                        position: "right top", className: "success"
                    });
                }
            });
            return tempList;
        }

        var GetIsDwollaConnected = function () {
            var _obj = {}
            var tempList = null;
            $.when(RequestServer("PaymentSetup.aspx/IsDwollaConnected", _obj)).done(function (response) {
                tempList = response
            });
            return tempList;
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

        var GetDwollaTransactions = function () {

            var _obj = {

            }
            var tempList = {};
            $.when(RequestServer("PaymentSetup.aspx/GetDwollaTransactions", _obj)).done(function (response) {
                tempList = $.parseJSON(response);

            });
            return tempList;

        }

        var DeleteDwollaConfig = function () {

            var _obj = {

            }
            var tempList = {};
            $.when(RequestServer("PaymentSetup.aspx/DisConnectDwolla", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (response != null) {
                    $('#btn-delete-DwollaAcc').hide();
                    $('#btn-Dwolla-connect').show();
                    $('#btn-connect').hide();
                    $.notify("Dwolla account deleted Successfully!!", {
                        position: "right top", className: "success"
                    });
                    
                    
                    $('.isc-opt2-cont').show();
                    
                    $('#container-dwollainfo').hide();
                    var $modal = $('#mp_delete_dwolla');
                    $modal.modal('hide');
                }
                else {
                    $.notify("Server error occured while deleting the Dwolla account!!", {
                        position: "right top", className: "success"
                    });
                }

            });
            return tempList;

        }
    }

    //common
    {

        var GoBack = function () {
            setTimeout(function () {
                window.history.back();
            }, 2000);
        }

        var validateDwollaConnect = function () {
            var isValid = true;
            var key = $.trim($('#txt-DKey').val());
            var secret = $.trim($('#txt-DSecret').val())
            if (key == '') {
                $('#err-dwollaKey').show();
                isValid = false;
            }
            if (secret == '') {
                $('#err-dwollaSecret').show();
                isValid = false;
            }
            return isValid;
        }
    }
}