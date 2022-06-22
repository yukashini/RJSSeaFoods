// Constants
{

}


// Events
{

    $(document).on('click', '#btn-connect', function (e) {
        //e.preventDefault();
        ////$loading.show();
        //setTimeout(function () {
        $('[span-Error]').hide();
            if (IsValidPaypalSetup()) {
                var ClientID = $('#txt-clientid').val();
                var ClientSecret = $('#txt-clientsecret').val();
                var APIUserName = $('#txt-apiusername').val();
                var APIPassword = $('#txt-apipassword').val();
                var APISignature = $('#txt-apisignature').val();
                var obj = {
                    "APIClientID": ClientID,
                    "APISecretKey": ClientSecret,
                    "APISignature": APISignature,
                    "APIUserName": APIUserName,
                    "APIPassword": APIPassword
                };
                if (PostPaypalSetup(obj) > 0) {
                    LoadPaypalSetup();
                   // $.notify('Paypal Connected Successfully.', 'Success');
                    $.notify("Paypal Connected Successfully.", { position: "right top", className: "success" });
                    $('[span-Error]').hide();
                    $('[data-text]').val('');
                }
                else {
                    $.notify('Invalid Keys. Please follow setup instructions.', 'Error');
                }
            }
        //    $loading.hide();
        //}, 0);
    });

    $(document).on('click', '#btn-delete-paypalaccount', function (e) {
        e.preventDefault();
        var $modal = $('#mp_delete_paypal');
        $modal.modal('show');
    });

    $(document).on('click', '#btn-confirm-delete-paypalaccount', function (e) {
        e.preventDefault();
        var $modal = $('#mp_delete_paypal');
        //$loading.show();
        //setTimeout(function () {
            if (DeletePaypalConfiguration() > 0) {
                LoadPaypalSetup();
                //$.notify('Paypal Account removed successfully.', 'Success');
                $('#btn-delete-paypalaccount').hide();
                
                $.notify("Paypal Account removed successfully.", { position: "right top", className: "success" });
                $modal.modal('hide');
            }
        //    $loading.hide();
        //}, 0);

    });



}

// Dom Manipulation
{
    var LoadPaypalSetup = function () {
        if (IsPaypalConnected()) {
            $('#container-paypalsetup').hide();
            $('#container-paypalinfo').show();
            BindPaypalBalance();
            BindPaypalTransaction();
            $('#btn-connect').hide();
        }
        else {
            $('#container-paypalsetup').show();
            $('#container-paypalinfo').hide();
            $('#btn-connect').show();
        }
    }

    var BindPaypalBalance = function () {
        var StrPaypalBalance = GetPaypalBalance();
        var ObjPaypalBalance = $.parseJSON(StrPaypalBalance);
        if (ObjPaypalBalance != null && ObjPaypalBalance != undefined) {
            var IsSuccess = ObjPaypalBalance["IsSuccess"];
            if (IsSuccess != null && IsSuccess != undefined) {
                if (IsSuccess == true) {
                    $('#lbl-paypalbalance').html('$' + ObjPaypalBalance.Result);
                }
                else {
                    // $.notify(ObjPaypalBalance.ErrorMessage, 'Error');
                }

            }
        }
    }

    var BindPaypalTransaction = function () {
        var StrPaypalTransaction = GetPaypalTransaction();
        var html = '';
        var $el = $('#tbl-paypal-transaction tbody');
        if (StrPaypalTransaction != "") {
            $('#btn-delete-paypalaccount').show();
            var ObjTransaction = $.parseJSON(StrPaypalTransaction);
            if (ObjTransaction["transaction_details"] != undefined) {
                if (ObjTransaction["transaction_details"].length > 0) {
                    $.each(ObjTransaction["transaction_details"], function (index, item) {
                        html += '<tr>';
                        html += '<td style="width: 15%;">' + moment(item["transaction_info"]["transaction_initiation_date"]).format('MM/DD/YYYY HH:mm A') + '</td>';
                        html += '<td style="width: 20%;">' + item["transaction_info"]["transaction_id"] + '</td>';
                        html += '<td style="width: 20%;">' + (item["payer_info"]["email_address"] == undefined ? 'N/A' : item["payer_info"]["email_address"]) + '</td>';
                        html += '<td style="width: 10%;">$' + item["transaction_info"]["transaction_amount"]["value"] + '</td>';
                        html += '<td style="width: 10%;">$' + item["transaction_info"]["fee_amount"]["value"] + '</td>';
                        html += '<td style="width: 15%;">Payout</td>';
                        html += '<td style="width: 20%;">' + item["transaction_info"]["transaction_subject"] + '</td>';
                        html += '<td style="width: 10%;">' + (item["transaction_info"]["transaction_status"] == "S" ? "Success" : "Unclaimed") + '</td>';
                       
                        html += '</tr>';
                    });
                }
                else {
                    html += '<tr><td colspan="7"><span>No Transaction Found</span></td></tr>';
                }

            }
        }
        else {
            $('#btn-delete-paypalaccount').hide();
            html += '<tr><td colspan="7"><span>Please enable the transaction permission.</span></td></tr>';
        }

        $el.html(html);
    }

    var IsPaypalConnected = function () {
        var IsConnected = GetIsPaypalConnected();
        return IsConnected;
    }

    var ReadPaypalBalance = function () {
        var StrPaypalBalance = GetPaypalBalance();
        var ObjPaypalBalance = $.parseJSON(StrPaypalBalance);
        var Balance = null;
        if (ObjPaypalBalance != null && ObjPaypalBalance != undefined) {
            var IsSuccess = ObjPaypalBalance["IsSuccess"];
            if (IsSuccess != null && IsSuccess != undefined) {
                if (IsSuccess == true) {
                    Balance = ObjPaypalBalance.Result;
                }
            }
        }
        return Balance;
    }

}

// Data Manipulation
{
    var PostPaypalSetup = function (obj) {
        if (IsValidPaypalSetup()) {
            var _obj = {
                "ObjpaypalSettings": obj
            }
            var tempList = null;
            $.when(RequestServer("PaymentSetup.aspx/ConnectPaypal", _obj)).done(function (response) {
                tempList = response
            });
            return tempList;
        }
    }

    var GetPaypalBalance = function (obj) {
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/GetPaypalBalance", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;

    }

    var GetPaypalTransaction = function (obj) {
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/GetPaypalTransaction", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;

    }

    var GetIsPaypalConnected = function () {
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/IsPaypalConnected", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;
    }

    var DeletePaypalConfiguration = function () {
        var _obj = {}
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/DeletePaypalAccount", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;
    }

    var DoPayout = function (obj, BillID, billObj,userBillId) {
        var _obj = {
            "ObjPayoutObject": obj,
            "BillID": BillID,
            "BillObj": billObj,
            "userBillID":userBillId
           
        }
        var tempList = null;
        $.when(RequestServer("PaymentSetup.aspx/DoPayout", _obj)).done(function (response) {
            tempList = response
        });
        return tempList;
    }
}


// Public
{
    var IsValidPaypalSetup = function () {
        var ClientID = $('#txt-clientid').val();
        var ClientSecret = $('#txt-clientsecret').val();
        var APIUserName = $('#txt-apiusername').val();
        var APIPassword = $('#txt-apipassword').val();
        var APISignature = $('#txt-apisignature').val();
        var isvalid = true;
        if ($.trim(ClientID).length == 0) {
            isvalid = false;
            $('#err-clientid').html('Client ID Should not be empty').show();
        }

        if ($.trim(ClientSecret).length == 0) {
            isvalid = false;
            $('#err-clientsecret').html('Client Secret Key Should not be empty').show();
        }

        if ($.trim(APIUserName).length == 0) {
            isvalid = false;
            $('#err-apiusername').html('API Username Should not be empty').show();
        }

        if ($.trim(APIPassword).length == 0) {
            isvalid = false;
            $('#err-apipassword').html('API Password Should not be empty').show();
        }

        if ($.trim(APISignature).length == 0) {
            isvalid = false;
            $('#err-apisignature').html('API Signature Should not be empty').show();
        }

        return isvalid;
    }
}