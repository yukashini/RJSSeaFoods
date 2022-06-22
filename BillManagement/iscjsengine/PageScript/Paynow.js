{
    var TotalAmount = 0;
    var InvoiceID = 0;
}

$(document).ready(function () {
    setTimeout(function () {
        
         InvoiceID = GetParameterValues('_id');  
        var InvoiceDetails = GetIvoiceMaildetails(InvoiceID);
        var InVoicedetail = common.AUF(InvoiceDetails['Invoice']);
        var Orderlist = common.AUF(InvoiceDetails['OrderList']);
        BindMailDetails(InVoicedetail);
        BindOrderDetail(Orderlist);
    }, 0);
})

//
{
    var BindMailDetails = function (InvoiceDetails) {
        debugger;
        if (InvoiceDetails.length > 0) {
            $.each(InvoiceDetails, function (index, item) {
                $('#spn_custname').html(item["CustomerName"]);
                $('#Spn_termcode').html(item["TermCode"]);
                $('#spn_invoice').html(item["InvoiceName"]);
                $('#spn_date').html(item["Invoicedate"]);
                
                $('#spn_total').html(item["TOTAL"]);
                $('#spn_invoice').html(item["InvoiceName"]);
                $('#spn_invicedate').html(item["Invoicedate"]);
                $('#spn_amount').html("$"+item["TOTAL"]);
                
                $('#spn_from').html(item["CustomerName"]);
                $('#spn_To').html(item["ClientName"]);
                $('#spn_sto').html(item["ClientName"]);
                $('#Spn_payamount').html(item["TOTAL"]);
                $('#spn_accpay').html(item["TOTAL"]);
                TotalAmount = item["TOTAL"];
                $('#spn_duedate').html(moment(item["DueDate"]).format('MM/DD/YYYY'));
                $('#spn_indate').html(item["Invoicedate"]);
                $('#span_duedate').html(moment(item["DueDate"]).format('MM/DD/YYYY'));
                $('#spn_payamt').html(item["TOTAL"]);
                $('#spn_subtotal').html(item["TOTAL"]);
                $('#span_tot').html(item["TOTAL"]);

                
                
            });
        }
        else {
            $("#Paynowacc").prop("disabled", true);
            $.notify("This bill alredy paid!!", { position: "right top", className: "error" });
        }
    }
    var BindOrderDetail = function (Orderlst) {
       
        var html = '';
        var $el = $('#tbl-Invoice');
        $.each(Orderlst, function (index, item) {
            html += '<tr>'
            html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Price"] == null ? '' : item["Price"]) + '"><h5>' + (item["Price"] == null ? '-' : item["Price"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["quantity"] == null ? '' : item["quantity"]) + '"><h5>' + (item["quantity"] == null ? '-' : item["quantity"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '' : item["Amount"]) + '</h5></td>'
            html += '</tr>'
        });


        $el.html(html);
    }

    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }
}
//
{
    var GetIvoiceMaildetails = function (billId) {
        var _obj = {
            'BillId': billId
        };
        var tempList = {};
        $.when(RequestServer("ClientSignup.aspx/GetInvoicemaildetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Paynowacc


//$(document).on('click', '#Paynowacc', function (e) {
    
//    Paynow();
    

//});


var Paynow = function () {
    

    var _obj = {
        'Amount': parseInt(InvoiceID),
        'InvoiceId': parseInt(InvoiceID),
    };


    var tempList = "";
    $.when(RequestServer("InvoiceList.aspx/ProcessPayment", _obj)).done(function (response) {
        
        tempList = response;
    });
    var stripe = Stripe('pk_test_51Kg7QmKBYCv3kOC1tAHQjfO3G86VpNrsrfmsprDB0zTQvxLmpYGDYSGDqVqTjmX94MY8ZjCAGoNGDr1U3KIJd3gc005OjzqT49');
    // e.preventDefault();
    stripe.redirectToCheckout({

        sessionId: tempList
    });

    $("#Paynowacc").prop("disabled", true);
    // window.location = 'http://localhost:43804/PaymentSuccessfull.aspx?_id=' + parseInt(InvoiceID);
    // $.notify("Amount paid successfully!!", { position: "right top", className: "success" });
    return tempList;
}
//var Paynow = function () {


//    var _obj = {
//        'Amount': parseInt(TotalAmount),
//        'InvoiceId': parseInt(InvoiceID),
//    };


//    var tempList = {};
//    $.when(RequestServer("InvoiceList.aspx/ProcessPayment", _obj)).done(function (response) {
//        tempList = $.parseJSON(response);
//    });
//    $("#Paynowacc").prop("disabled", true);
//    window.location = 'http://localhost:43804/PaymentSuccessfull.aspx?_id=' + parseInt(InvoiceID);
//   // $.notify("Amount paid successfully!!", { position: "right top", className: "success" });
//    return tempList;
//}
