$(document).ready(function () {
   
    setTimeout(function () {
        
       InvoiceID = GetParameterValues('_id');
       var InvoiceDetails = GetIvoiceMaildetails(InvoiceID);
        var InVoicedetail = common.AUF(InvoiceDetails['Invoice']);
        var Orderlist = common.AUF(InvoiceDetails['OrderList']);
        BindMailDetails(InVoicedetail, Orderlist);
       
    }, 0);
})

//
{
    var GetIvoiceMaildetails = function (billId) {
        var _obj = {
            'BillId': billId
        };
        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/GetInvoicemaildetailsPaymentsucc", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}
//
{
    var BindMailDetails = function (InvoiceDetails, Orderlst) {
        //var InvoiceDetails = common.AUF(InvoiceDetails['Invoice']);
        //var Orderlst = common.AUF(InvoiceDetails['OrderList']);

        if (InvoiceDetails.length > 0) {
            
            $.each(InvoiceDetails, function (index, item) {
               
                var duedate = new Date(item["Duedate"]);
                
                var dd = String(duedate.getDate()).padStart(2, '0');
                var mm = String(duedate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = duedate.getFullYear();

                duedate = mm + '/' + dd + '/' + yyyy;

                $('#spn_invoice').html(item["InvoiceName"]);
                $('#spn_amount').html(item["TOTAL"]);
                $('#span_invoiceno').html(item["InvoiceName"]);
                $('#span_amount').html("$" + item["TOTAL"]);
                $('#spn_invoicedate').html(duedate);
                $('#span_total').html(item["TOTAL"]);
                $('#spn_descripion').html(item["Description"]);
                
                //$('#spn_custname').html(item["CustomerName"]);
                //$('#spn_termcode').html(item["TermCode"]);
                
                
                
               
                //$('#spn_invicedate').html(item["Invoicedate"]);
                
                //$('#Spn_termcode').html(item["InvoiceName"]);
                //$('#spn_from').html(item["CustomerName"]);
                //$('#spn_To').html(item["ClientName"]);
                //$('#spn_sto').html(item["ClientName"]);
                //$('#Spn_payamount').html(item["TOTAL"]);
                //$('#spn_accpay').html(item["TOTAL"]);
                //TotalAmount = item["TOTAL"];
            });
        }
        var html = '';
        var $el = $('#tbl-invoice');
        $.each(Orderlst, function (index, item) {
            debugger;
            html += '<tr>'
            html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>'
            html += '<td style="text-align:center;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '-' : item["Amount"]) + '</h5></td>'
            html += '<td style="text-align:center;" title="' + (item["quantity"] == null ? '' : item["quantity"]) + '"><h5>' + (item["quantity"] == null ? '-' : item["quantity"]) + '</h5></td>'

            html += '<td style="text-align:right;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '' : item["Amount"]) + '</h5></td>'
            html += '</tr>'
        });


        $el.html(html);
    }
    var BindOrderDetail = function (Orderlst) {

       
    }
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