{
    var masterData = [];
    var TableData = [];
    var suptotal = 0;
    var editInvoiceID = 0;
    var IsUpdated = 0;
    var deleteInvoiceid = 0;
    var Tomail = "";
    var CCmail = "";
    var Isproduct = 1;
}
// Load
{
    $(document).ready(function () {
        $loading.show();
        Pastdate();
        editInvoiceID = ((GetQueryStrings()["Invoiceid"] == undefined || GetQueryStrings()["Invoiceid"] == null) ? 0 : GetQueryStrings()["Invoiceid"]);
        if (editInvoiceID == 0) {
            $("#spn_update").hide();
            $("#spn_Save").show();
            $("#div-edit").hide();
            $("#spn_newinvoice").show();
            $("#spn_updateinvoice").hide();
            $("#spn-heder").hide();
            BindCreateInvoiceScreen();
            Bindrows();
            

        }
        else {
            $("#spn_update").show();
            $("#spn_Save").hide();
            $("#div-edit").show();
            $("#spn_newinvoice").hide();
            $("#spn_updateinvoice").show();
            $("#spn-heder").show();
            BindCreateInvoiceScreen();
            BindrowsEdit(editInvoiceID);
           // $("#spn_updateinvoice").html(editInvoiceID);
           
        }
        $loading.hide();
    });
}

//DOM
{
    var BindCreateInvoiceScreen = function () {
        var Currentdate = (new Date()).toISOString().split('T')[0];
        $("#txt-invoicedate").val(Currentdate);
        masterData = GetMasterData();
        BindDropDowns($('#slt-customer'), masterData["CustomerList"], 'Choose Customer')
        BindDropDowns($('#slt-paymentterms'), masterData["PaymentTerms"], 'Choose Payment Terms')
        BindDropDowns($('#slt-paymenttype'), masterData["PrefferredPaymentType"], 'Choose Payment Type')
        
        BindDropDowns($('#slt_PaymentMethod'), masterData["PrefferredPaymentType"], 'Choose Preferred Payment Method')
        BindDropDowns($('#slt_PaymentTerms'), masterData["PaymentTerms"], 'Choose Payment Terms')


    }
}
//DATA
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("CreateInvoiceAR.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetProductData = function (invoiceis) {
        var _obj = {
            'Invoiceid': parseInt(invoiceis)
        };
        var tempList = {};
        $.when(RequestServer("CreateInvoiceAR.aspx/GetProductData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateInvoicedata = function (_obj) {

       
        var updateObj = {
            'objInvoice': _obj
        }

        $.when(RequestServer("CreateInvoiceAR.aspx/UpdateInvoicedata", updateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Product updated successfully!", { position: "right top", className: "success" });
                GoBack()
            }
            else {
                $.notify("Server error occured while updating a invoice !!", { position: "right top", className: "error" });
            }
        });
    }
}

//Common
{

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

    var Bindrows = function () {

        $("#tbl_productlst").append("<tr><td><select class='select2 select2-hidden-accessible' id='slt-product'><option value='0'>Choose Product</option></select></td >"
            + "<td><input type='text' class='form-control numeric'id='txt_price'/></td>"
            + "<td><div class='cell-left'><select class='form-control'><option>Each</option></select></div><div class='cell-left mar-lft-10'><input id='txt_quantity' type='text' class='form-control numeric'/></div></td>"
           
            + "<td><input type='text' class='form-control isc-input-txt numeric' id='txtdiscount'/><select id='slt-discount' class='form-control isc-input-slt'><option>%</option><option>$</option></select ></td>"
            + "<td><input type='text' class='form-control numeric' id='txt_tax'/></td>"
            + "<td style='text-align: right'><input type='text' class='form-control numeric' id='txt_amount' value='0.00'  readonly/></td>"
            + "<td>"
            + "<a class='isc-set-pos-a-edit-i add' title='Add' id='addrow'><i class='fa fa-plus' style='padding: 0px;'></i></a></td></tr >");
            $('#slt-product').select2();
        Bindrowsdropdwon();
       
       //BindDropDowns($('#slt-product'), masterData["Product"], 'Choose Product')
    }

    var BindrowsAdd = function () {

        $("#tbl_productlst").append("<tr><td><select class='select2 select2-hidden-accessible' id='slt-product'><option value='0'>Choose Product</option></select></td >"
            + "<td><input type='text' class='form-control numeric'id='txt_price'/></td>"
            + "<td><div class='cell-left'><select class='form-control'><option>Each</option></select></div><div class='cell-left mar-lft-10'><input id='txt_quantity' type='text' class='form-control numeric'/></div></td>"

            + "<td><input type='text' class='form-control isc-input-txt numeric' id='txtdiscount'/><select id='slt-discount' class='form-control isc-input-slt'><option>%</option><option>$</option></select ></td>"
            + "<td><input type='text' class='form-control numeric' id='txt_tax'/></td>"
            + "<td style='text-align: right'><input type='text' class='form-control numeric' id='txt_amount' value='0.00'  readonly/></td>"
            + "<td><a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p1 delete' title='Delete' href='#'><i class='fa fa-trash-o'></i></a>"
            + "<a class='isc-set-pos-a-edit-i add' title='Add' id='addrow'><i class='fa fa-plus' style='padding: 0px;'></i></a></td></tr >");
        $('#slt-product').select2();
        Bindrowsdropdwon();

        //BindDropDowns($('#slt-product'), masterData["Product"], 'Choose Product')
    }

    var BindrowsEdit = function (editInvoiceID) {
      
        var Invoicelst = GetIvoiceEditBind(editInvoiceID);
        var lstdetail = common.AUF(Invoicelst['Orderinvoice']);
        var lstinvoicedetail = common.AUF(Invoicelst['Invoicelst']);
        $("#head_invoice").html(lstinvoicedetail[0]["InvoiceName"]);

        var dateMomentObject = moment(lstinvoicedetail[0]["Invoicedate"], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
        var dateObject = dateMomentObject.toDate();

        var nextinv = moment.utc(dateObject).toDate();
        var localIn = moment(nextinv).local().format('YYYY-MM-DD');
        $("#head_date").html(localIn);
        //
        $.each(lstdetail, function (index, item) {
            
            $("#tbl-body").append("<tr><td><select disabled='true' class='form-control isc-w-270' id='slt-product'><option value='0'>Choose Product</option></select></td >"
                + "<td><input type='text' value=" + item["Price"] + " class='form-control numeric'id='txt_price' readonly/></td>"
                + "<td><div class='cell-left'><select disabled='true' class='form-control'><option>Each</option></select></div><div class='cell-left mar-lft-10'><input id='txt_quantity' value=" + item["quantity"] + " type='text' class='form-control numeric' readonly/></div></td>"
               
                //+ "<td><input type='text' value=" + item["Discount"] +" class='form-control isc-input-txt numeric' id='txtdiscount' readonly/><select disabled='true' id='slt-discount' class='form-control isc-input-slt'><option>%</option><option>$</option></select ></td>"
                //+ "<td><input type='text' value=" + item["Tax"] +" class='form-control numeric' id='txt_tax' readonly/></td>"
                + "<td style='text-align: right'><input type='text' value=" + item["Amount"] +" class='form-control' id='txt_amount' readonly/></td>"
                + "<td>"
               // +"< a class= 'isc-action-badge-td-s1 pad-lft-5 isc-color-p1 btndelete' title = 'Delete' data - Deletedid=" + item["OrderInvoice"] +" href = '#' > <i class='fa fa-trash-o'></i></a > "
                + "<a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p1 isc-hide-data isc-click-data' title='Edit' href='#'><i class='fa fa-edit'></i>"
                + "<a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p2 isc-vis-data' style='display: none;' title='Update' data-Updateid=" + item["OrderInvoice"]+" href='#'><i class='fa fa-check'></i></a></a >"
                + "<a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p2 isc-vis-data' id='rowcancel' style='display: none; ' title='Cancel' href='#'><i class='fa fa-times'></i></a></td ></tr >")


            //+ "<a class='isc-set-pos-a-edit-i add' id='addrow'><i class='fa fa-plus' style='padding: 0px;'></i></a></td></tr >")
           
            Bindrowseditdropdwon(item["Product"]);
        });

        BindInvoiceList(lstinvoicedetail);
    }

    var Bindrowsdropdwon = function () {
      
        var HtmlDropdownID;
        $('#tbl_productlst tbody tr').each(function () {
            HtmlDropdownID = this;
            if ($(this).closest('tr').find('#slt-product option').length <= 1) {
                $.each(masterData["Product"], function (index, value) {
                    $(HtmlDropdownID).closest('tr').find('#slt-product').append("<option value=" + value.KeyListID + ">" + value.Value1 + "</option>");
                    $(HtmlDropdownID).closest('tr').find('#slt-product').select2();
                });
            }
        });

        $('#slt-product').select2();
    }

    var Bindrowseditdropdwon = function (id) {
        
        var HtmlDropdownID;
        $('#tbl_productlst tbody tr').each(function () {
            HtmlDropdownID = this;
            if ($(this).closest('tr').find('#slt-product option').length <= 1) {
                $.each(masterData["Product"], function (index, value) {
                    $(HtmlDropdownID).closest('tr').find('#slt-product').append("<option value=" + value.KeyListID + ">" + value.Value1 + "</option>");
                });

                $(this).closest('tr').find('#slt-product').val(id).change();

            }
        });
    }

    var Calculatesuptotal = function () {
       
       var suptotal = 0;
        $("table#tbl_productlst > tbody > tr").each(function (row, tr) {
            
            var suptotal1 = $('#txt_amount', this).val();
            suptotal = (parseFloat(suptotal1) + parseFloat(suptotal));
        });
        
        $("#spn-suptotal").html(parseFloat(suptotal).toFixed(2));
        $("#span-total").html(parseFloat(suptotal).toFixed(2));
        $("#spn-netamount").html(parseFloat(suptotal).toFixed(2));
        //
    }

    var BindInvoiceList = function (lstinvoicedetail) {

        $.each(lstinvoicedetail, function (index, item) {
            

            var dateMomentObject = moment(item["Invoicedate"], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
            var dateObject = dateMomentObject.toDate();

            var nextinv = moment.utc(dateObject).toDate();
            var localIn = moment(nextinv).local().format('YYYY-MM-DD');

            $('#txt-invoicedate').val(localIn);
            $('#txt-invoice').val(item["InvoiceName"]);

            var nextDue = moment.utc(item["Duedate"]).toDate();
            var localDue = moment(nextDue).local().format('MM/DD/YYYY'); 

            $('#txt-duedate').val(localDue);

            $('#txt-referenceorder').val(item["Referanceorder"]);

          

            $('#slt-paymenttype').val(item["Paymenttype"]);
            $('#slt-paymenttype').select2();
            
            $("#slt-paymentterms option:contains(" + item["TermCode"] + ")").attr('selected', 'selected');
            $('#slt-paymentterms').select2();

            $('#slt-customer').val(item["Customerid"]);
            $('#slt-customer').select2();

            $('#spn-suptotal').html(item["Subtotal"]);
            $('#txt-discount').val(item["Discount"]);
            $('#txt-shipping').val(item["ShippingCharge"]);
            $('#txt-tax').val(item["Tax"]);
            $('#span-total').html(item["TotamAmount"]);
            $('#slt-distype').val(item["DiscountType"]);
            $('#spn-netamount').val(item["TotamAmount"]);


            var dateMomentObject = moment(item["RecurringStartDate"], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
            var dateObject = dateMomentObject.toDate();
            var nextinv = moment.utc(dateObject).toDate();
            var Startdate = moment(nextinv).local().format('YYYY-MM-DD');

            var nextDue = moment.utc(item["RecurringStartDate"]).toDate();
            var Startdate = moment(nextDue).local().format('YYYY-MM-DD'); 

            $('#txt-startdate').val(Startdate);


            var dateMomentObject = moment(item["RecurrinEendtDate"], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
            var dateObject = dateMomentObject.toDate();
            var nextinv = moment.utc(dateObject).toDate();
            var Enddate = moment(nextinv).local().format('YYYY-MM-DD');

            $('#txt-endtdate').val(Enddate);

            var nextDue = moment.utc(item["RecurrinEendtDate"]).toDate();
            var Endtdate = moment(nextDue).local().format('YYYY-MM-DD');

            $('#txt-endtdate').val(Endtdate);
            
            $("#slt-Frequency option:contains(" + item["Frequency"] + ")").attr('selected', 'selected');
            $('#slt-Frequency').select2();
            
        });
    }
}

//Click 
{
    //data-Deletedid
    $(document).on('click', '[data-updateid]', function () {
      
        if ($(this).closest('tr').find('#slt-product').val() != 0 && $(this).closest('tr').find('#txt_quantity').val() != "" && $(this).closest('tr').find('#txt_price').val() != "") {
            var Invoiceid = $(this).attr('data-updateid');
            var _obj = {
                'product': parseInt($(this).closest('tr').find('#slt-product').val()),
                'quantity': parseInt($(this).closest('tr').find('#txt_quantity').val()),
                'price': parseFloat($(this).closest('tr').find('#txt_price').val()),
                'discount': parseFloat($(this).closest('tr').find('#txtdiscount').val()),
                'tax': parseFloat($(this).closest('tr').find('#txt_tax').val()),
                'amount': parseFloat($(this).closest('tr').find('#txt_amount').val()),
                'invoiceid': parseInt(Invoiceid),
                'discounttype': $(this).closest('tr').find('#slt-discount').val()

            }

            $(this).closest('tr').find('.isc-hide-data').show();
            $(this).closest('tr').find('.isc-vis-data').hide();
            $(this).closest('tr').find('#slt-product').prop('disabled', true);
            $(this).closest('tr').find('#txt_quantity').attr("readonly", true);
            $(this).closest('tr').find('#txt_price').attr("readonly", true);
            $(this).closest('tr').find('#txtdiscount').attr("readonly", true);
            $(this).closest('tr').find('#slt-discount').prop('disabled', true);
            $(this).closest('tr').find('#txt_tax').attr("readonly", true);
            IsUpdated = 0;
            $("#UpdateInvoice").show();
            $("#Updatesend").show();

            UpdateInvoicedata(_obj);
        }
        else {
            $.notify("Please enter mandatory field!!", { position: "right top", className: "error" });
        }

    });

    $(document).on('click', '[data-Deletedid]', function () {
        var total = 0;
        deleteInvoiceid = $(this).attr('data-Deletedid');
        var Amount = parseFloat($(this).closest('tr').find('#txt_amount').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_amount').val()).toFixed(2);
        var Suptotal = parseFloat($("#spn-suptotal").text()).toFixed(2);

        total = (Suptotal - Amount);
        $("#spn-suptotal").html(total);
        $('#mp_invoice_Delete').show();

    });
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteInvoice();
            $loading.hide();
        }, 0);
    });
    $(document).on('click', '#btn_cancel', function () {
        window.location.href = 'InvoiceList.aspx';
        
    });
    $(document).on('click', '[delete-cancel]', function () {
        deleteCustomerID = 0;
        $('#mp_invoice_Delete').hide();
    })
    $(document).on('click', '.isc-click-data', function () {
       
        if (IsUpdated == 0) {
            IsUpdated = 1;
            $("#UpdateInvoice").hide();
            $("#Updatesend").hide();
            $(this).closest('tr').find('.isc-hide-data').hide();
            $(this).closest('tr').find('.isc-vis-data').show();
            $(this).closest('tr').find('#slt-product').prop('disabled', false);
            $(this).closest('tr').find('#txt_quantity').attr("readonly", false);
            $(this).closest('tr').find('#txt_price').attr("readonly", false);
            $(this).closest('tr').find('#txtdiscount').attr("readonly", false);
            $(this).closest('tr').find('#slt-discount').prop('disabled', false);
            $(this).closest('tr').find('#txt_tax').attr("readonly", false);
        }
        else {
            $.notify("Please Update previous row!!", { position: "right top", className: "error" });
        }
       

    });
    $(document).on('click', '#rowcancel', function () {
        
        $("#UpdateInvoice").show();
        $("#Updatesend").show();
        $(this).closest('tr').find('.isc-hide-data').show();
        $(this).closest('tr').find('.isc-vis-data').hide();
        $(this).closest('tr').find('#slt-product').prop('disabled', true);
        $(this).closest('tr').find('#txt_quantity').attr("readonly", true);
        $(this).closest('tr').find('#txt_price').attr("readonly", true);
        $(this).closest('tr').find('#txtdiscount').attr("readonly", true);
        $(this).closest('tr').find('#slt-discount').prop('disabled', true);
        $(this).closest('tr').find('#txt_tax').attr("readonly", true);
        IsUpdated = 0;
    });
    //rowcancel
    $(document).on('click', '#addrow', function () {
       
        
        if ($(this).closest('tr').find('#slt-product').val() != 0 && $(this).closest('tr').find('#txt_quantity').val() != "" && $(this).closest('tr').find('#txt_price').val() != "") {
            BindrowsAdd();
          //  $("#spn-discount").html("");
          //  $("#spn-shpping").html("");
          //  $("#spn-tax").html("");
          //  $("#txt-discount").val("");
          //  $("#txt-shipping").val("");
          //  $("#txt-tax").val("");
          ////  $("#span-total").html("");
          //  $("#spn-netamount").html("");
        }
        else {
            $.notify("Please enter mandatory field!!", { position: "right top", className: "error" });
        }

    });

    $(document).on('click', '.delete', function (e) {
        e.preventDefault();

        var totalamount = $('#span-total').text();
        var amount = parseFloat($(this).closest('tr').find('#txt_amount').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_amount').val()).toFixed(2);
       // $("#span-total").html("");
       // $("#spn-suptotal").html("");
        var subtotal = totalamount - amount;

        var subtotalamt = $('#spn-suptotal').text();

        var total = subtotalamt - amount

        $("#span-total").html(parseFloat(subtotal).toFixed(2));
        $("#spn-netamount").html(parseFloat(subtotal).toFixed(2));
        

        $("#spn-suptotal").html(parseFloat(total).toFixed(2));

        $(this).closest('tr').remove();

        // Calculatesuptotal();
        //$("#spn-discount").html("");
        //$("#spn-shpping").html("");
        //$("#spn-tax").html("");
        //$("#txt-discount").val("");
        //$("#txt-shipping").val("");
        //$("#txt-tax").val("");

       

        //$("#span-total").html("");
        //$("#spn-netamount").html("");
    });
    //SaveSendMail
    $(document).on('click', '#SaveSendMail', function (e) {



        var data = "";
        var dt = new Date();
        var Invoiceno = "INVO" + dt.getMinutes() + dt.getSeconds();

        $("table#tbl_productlst > tbody > tr").each(function (row, tr) {
            if ($('#slt-product', this).val() != 0) {
                var obj = {
                    "product": parseInt($('#slt-product', this).val()),
                    "quantity": parseInt($('#txt_quantity', this).val()),
                    "price": parseFloat($('#txt_price', this).val()),
                    "discount": parseFloat($('#txtdiscount').val() == "" ? 0 : $('#txtdiscount').val()),
                    "tax": parseFloat($('#txt_tax').val() == "" ? 0 : $('#txt_tax').val()),
                    "amount": parseFloat($('#txt_amount', this).val()),
                    "invoiceid": Invoiceno,
                    "discounttype": $('#slt-discount', this).val(),

                }
                TableData.push(obj);
            }
            else {
               // Isproduct = 0;
            }

            
        });
        if (TableData.length > 0) {
            SaveSendArInvoice(Invoiceno);
        }
        else {
            $.notify("Please add product.", { position: "right top", className: "error" });
        }



        
    });
    $(document).on('click', '#SaveInvoice', function (e) {

        
       
        var data = "";
        var dt = new Date();
        var Invoiceno = "INVO" + dt.getMinutes() + dt.getSeconds();

        $("table#tbl_productlst > tbody > tr").each(function (row, tr) {
            
            if ($('#slt-product', this).val() != 0) {
                var obj = {
                    "product": parseInt($('#slt-product', this).val()),
                    "quantity": parseInt($('#txt_quantity', this).val()),
                    "price": parseFloat($('#txt_price', this).val()),
                    "discount": parseFloat($('#txtdiscount').val() == "" ? 0 : $('#txtdiscount').val()),
                    "tax": parseFloat($('#txt_tax').val() == "" ? 0 : $('#txt_tax').val()),
                    "amount": parseFloat($('#txt_amount', this).val()),
                    "invoiceid": Invoiceno,
                    "discounttype": $('#slt-discount', this).val(),
                }
                TableData.push(obj);
            }
            else {
                
               // Isproduct = 0;
            }

           
        });


        

        if (TableData.length > 0) {
            SaveArInvoice(Invoiceno);
        }
        else {
            $.notify("Please add product.", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '#UpdateInvoice', function (e) {
       
        if ($("#slt-customer").val() != 0 && $("#slt-paymentterms").val() != 0 && $("#txt-invoicedate").val() != "") {
            UpdateArInvoice();
        }
        else {
            $.notify("Please enter mandatory field.", { position: "right top", className: "error" });
        }
    });
    $(document).on('click', '#Updatesend', function (e) {

        
        var customerid = parseInt($('#slt-customer').val());
        var Maildetails = GetCustomerMaildetails(customerid)
        var Maildetail = common.AUF(Maildetails['customerlst']);
        var cclist = common.AUF(Maildetails['cclist']);
        Tomail = Maildetail[0]["Email"];
        CCmail = cclist[0]["Email"];

        if ($("#slt-customer").val() != 0 && $("#slt-paymentterms").val() != 0 && $("#txt-invoicedate").val() != "") {
            UpdateSendArInvoice();
        }
        else {
            $.notify("Please enter mandatory field.", { position: "right top", className: "error" });
        }
    });
    var GoBack = function () {
        setTimeout(function () {
            window.history.back();
        }, 900);
    }
    var SaveInvoice = function (InvoiceList) {
        
        var _obj = {
            'invoicelist': InvoiceList,
        };
        var tempList = {};
        $.when(RequestServer("CreateInvoiceAR.aspx/InsertBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            
            TableData = [];
            if (parseInt(response) > 0) {
                $.notify("Invoice created successfully!", { position: "right top", className: "success" });
                Isproduct = 1;
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                
                $.notify("Server error occurred while Inserting Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var SaveSendInvoice = function (InvoiceList, Invoiceno,Invoiceid) {
        
        var _obj = {
            'invoicelist': InvoiceList,
        };
        var tempList = {};
        $.when(RequestServer("CreateInvoiceAR.aspx/InsertBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
          
            TableData = [];
            if (parseInt(response) > 0) {
                Sendmail(Invoiceno, Invoiceid);
                $.notify("Invoice created and mail send successfully!", { position: "right top", className: "success" });
                Isproduct = 1;
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occurred while Inserting Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var SaveArInvoice = function (Invoiceno) {
       
       
        if (Isproduct != 0) {
            var startdate = $("#txt-startdate").val();
            var enddate = $("#txt-endtdate").val();
           
            if (startdate != "") {
                if (enddate == "" || $('#slt-Frequency').val() == "0") {
                    $.notify("Please fill mandatory fields.", { position: "right top", className: "error" });
                    return false;
                }
            }


            var nextDue = moment.utc($('#txt-startdate').val()).toDate();
            var startDateStr = moment(nextDue).local().format('MM/DD/YYYY');

            var startDateArr = startDateStr.split("/");
            var startDate = new Date(startDateArr[2], startDateArr[0], startDateArr[1]);

            var nextDue = moment.utc($('#txt-endtdate').val()).toDate();
            var endDateStr = moment(nextDue).local().format('MM/DD/YYYY');


            var endDateArr = endDateStr.split("/");
            var endDate = new Date(endDateArr[2], endDateArr[0], endDateArr[1]);



            if (startDate > endDate) {

                $.notify("End date cannot be less than start date / last invoice date.", { position: "right top", className: "error" });
                return false;
            };

            if ($("#slt-customer").val() != 0 && $("#slt-paymentterms").val() != 0 && $("#txt-invoicedate").val() != "") {
                var nextDue = moment.utc($('#txt-invoicedate').val()).toDate();
                var localDue = moment(nextDue).local().format('DD/MM/YYYY');


                var _obj = {
                    'Customer': parseInt($('#slt-customer').val()),
                    'Invoicedate': localDue,
                    'Paymentterms': $('#slt-paymentterms').find(":selected").text(),
                    'Invoice': Invoiceno,
                    'Duedate': $('#txt-duedate').val(),
                    'Referanceorder': $('#txt-referenceorder').val(),
                    'Paymenttype': parseInt($('#slt-paymenttype').val()),
                    'Subtotal': $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text(),
                    'Discount': parseFloat($('#txt-discount').val() == "" ? 0 : $('#txt-discount').val()),
                    'Shipping': parseFloat($('#txt-shipping').val() == "" ? 0 : $('#txt-shipping').val()),
                    'Tax': parseFloat($('#txt-tax').val() == "" ? 0 : $('#txt-tax').val()),
                    'Total': parseFloat($('#span-total').text() == "" ? 0 : $('#span-total').text()),
                    'Distype': $('#slt-distype').find(":selected").text(),
                    'Isrecurring': parseInt($('#slt-Frequency').val()),
                    'Recurringstartdate': $('#txt-startdate').val(),
                    'Recurringenddate': $('#txt-endtdate').val(),
                    'Frequency': $('#slt-Frequency').find(":selected").text()

                }
                var insertObj = {
                    'objInvoice': _obj
                }

                $.when(RequestServer("CreateInvoiceAR.aspx/SaveInvoice", insertObj)).done(function (response) {
                    
                    if (parseInt(response) > 0) {
                        SaveInvoice(TableData);
                        // $.notify("Customer created successfully!", { position: "right top", className: "success" });

                    }
                    else {
                      
                        $.notify("Server error occured while creating a Invoice !!", { position: "right top", className: "error" });
                    }
                });
            }
            else {
                $.notify("Please enter mandatory field.", { position: "right top", className: "error" });
            }
        }
        else {
            $.notify("Please select product.", { position: "right top", className: "error" });
        }


    }
    var SaveSendArInvoice = function (Invoiceno) {
       
        if (Isproduct != 0) {
            if ($("#slt-customer").val() != 0 && $("#slt-paymentterms").val() != 0 && $("#txt-invoicedate").val() != "") {
                var nextDue = moment.utc($('#txt-invoicedate').val()).toDate();
                var localDue = moment(nextDue).local().format('DD/MM/YYYY');


                var _obj = {
                    'Customer': parseInt($('#slt-customer').val()),
                    'Invoicedate': localDue,
                    'Paymentterms': $('#slt-paymentterms').find(":selected").text(),
                    'Invoice': Invoiceno,
                    'Duedate': $('#txt-duedate').val(),
                    'Referanceorder': $('#txt-referenceorder').val(),
                    'Paymenttype': parseInt($('#slt-paymenttype').val()),
                    'Subtotal': $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text(),
                    'Discount': parseFloat($('#txt-discount').val() == "" ? 0 : $('#txt-discount').val()),
                    'Shipping': parseFloat($('#txt-shipping').val() == "" ? 0 : $('#txt-shipping').val()),
                    'Tax': parseFloat($('#txt-tax').val() == "" ? 0 : $('#txt-tax').val()),
                    'Total': parseFloat($('#span-total').text() == "" ? 0 : $('#span-total').text()),
                    'Distype': $('#slt-distype').find(":selected").text(),
                    'Isrecurring': parseInt($('#slt-Frequency').val()),
                    'Recurringstartdate': $('#txt-startdate').val(),
                    'Recurringenddate': $('#txt-endtdate').val(),
                    'Frequency': $('#slt-Frequency').find(":selected").text()
                }
                var insertObj = {
                    'objInvoice': _obj
                }

                $.when(RequestServer("CreateInvoiceAR.aspx/SaveInvoice", insertObj)).done(function (response) {
                    if (parseInt(response) > 0) {
                        
                        SaveSendInvoice(TableData, Invoiceno, parseInt(response));
                        // $.notify("Customer created successfully!", { position: "right top", className: "success" });

                    }
                    else {
                        $.notify("Server error occured while creating a Invoice !!", { position: "right top", className: "error" });
                    }
                });
            }
            else {
                $.notify("Please enter mandatory field.", { position: "right top", className: "error" });
            }
        }
        else {
            $.notify("Please select product.", { position: "right top", className: "error" });
        }

    }

    var UpdateArInvoice = function () {
        
        var nextDue = moment.utc($('#txt-startdate').val()).toDate();
        var startDateStr = moment(nextDue).local().format('MM/DD/YYYY');


        var startDateArr = startDateStr.split("/");
        var startDate = new Date(startDateArr[2], startDateArr[0], startDateArr[1]);

        var nextDue = moment.utc($('#txt-endtdate').val()).toDate();
        var endDateStr = moment(nextDue).local().format('MM/DD/YYYY');


        var endDateArr = endDateStr.split("/");
        var endDate = new Date(endDateArr[2], endDateArr[0], endDateArr[1]);



        if (startDate > endDate) {

            $.notify("End date cannot be less than start date / last invoice date.", { position: "right top", className: "error" });
            return false;
        };

        var nextDue = moment.utc($('#txt-invoicedate').val()).toDate();
        var localDue = moment(nextDue).local().format('DD/MM/YYYY');

        var _obj = {
            'Customer': parseInt($('#slt-customer').val()),
            'Invoicedate': localDue,
            'Paymentterms': $('#slt-paymentterms').find(":selected").text(),
            'Invoice': $('#txt-invoice').val(),
            'Duedate': $('#txt-duedate').val(),
            'Referanceorder': $('#txt-referenceorder').val(),
            'Status': parseInt($('#slt-status').val()),
            'Subtotal': $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text(),
            'Discount': parseFloat($('#txt-discount').val() == "" ? 0 : $('#txt-discount').val()),
            'Shipping': parseFloat($('#txt-shipping').val() == "" ? 0 : $('#txt-shipping').val()),
            'Tax': parseFloat($('#txt-tax').val() == "" ? 0 : $('#txt-tax').val()),
            'Total': parseFloat($('#span-total').text() == "" ? 0 : $('#span-total').text()),
            'Distype': $('#slt-distype').find(":selected").text(),
            'Invoiceid': parseInt(editInvoiceID),
            'Isrecurring': parseInt($('#slt-Frequency').val()),
            'Recurringstartdate': $('#txt-startdate').val(),
            'Recurringenddate': $('#txt-endtdate').val(),
            'Frequency': $('#slt-Frequency').find(":selected").text(),
            'Billstatus': parseInt($('#slt-status').val())

        }
        var insertObj = {
            'objInvoice': _obj
        }

        $.when(RequestServer("CreateInvoiceAR.aspx/UpdateARInvoicedata", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
               
                $.notify("Invoice updated successfully!", { position: "right top", className: "success" });

                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occured while creating a Invoice !!", { position: "right top", className: "error" });
            }
        });
    }

    var UpdateSendArInvoice = function () {
        
        var nextDue = moment.utc($('#txt-invoicedate').val()).toDate();
        var localDue = moment(nextDue).local().format('DD/MM/YYYY');

        var _obj = {
            'Customer': parseInt($('#slt-customer').val()),
            'Invoicedate': localDue,
            'Paymentterms': $('#slt-paymentterms').find(":selected").text(),
            'Invoice': $('#txt-invoice').val(),
            'Duedate': $('#txt-duedate').val(),
            'Referanceorder': $('#txt-referenceorder').val(),
            'Status': parseInt($('#slt-status').val()),
            'Subtotal': $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text(),
            'Discount': parseFloat($('#txt-discount').val() == "" ? 0 : $('#txt-discount').val()),
            'Shipping': parseFloat($('#txt-shipping').val() == "" ? 0 : $('#txt-shipping').val()),
            'Tax': parseFloat($('#txt-tax').val() == "" ? 0 : $('#txt-tax').val()),
            'Total': parseFloat($('#span-total').text() == "" ? 0 : $('#span-total').text()),
            'Distype': $('#slt-distype').find(":selected").text(),
            'Invoiceid': parseInt(editInvoiceID),
            'Isrecurring': parseInt($('#slt-Frequency').val()),
            'Recurringstartdate': $('#txt-startdate').val(),
            'Recurringenddate': $('#txt-endtdate').val(),
            'Frequency': $('#slt-Frequency').find(":selected").text(),
            'Billstatus': parseInt($('#slt-status').val())

        }
        var insertObj = {
            'objInvoice': _obj
        }

        $.when(RequestServer("CreateInvoiceAR.aspx/UpdateARInvoicedata", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
               
                Sendmail($('#txt-invoice').val(), editInvoiceID)
                $.notify(" Invoice updated and mail send successfully.", { position: "right top", className: "success" });

                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occured while creating a Invoice !!", { position: "right top", className: "error" });
            }
        });
    }

    var GetIvoiceEditBind = function (billId) {
        var _obj = {
            'InvoiceId': editInvoiceID
        };
        var tempList = {};
        $.when(RequestServer("createInvoiceAR.aspx/GetInvoicdetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeleteInvoice = function () {
        var obj = {
            'DeleteInvoiceid': parseInt(deleteInvoiceid)
        }
        var tempList = {};
        $.when(RequestServer("CreateInvoiceAR.aspx/DeleteInvoice", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteInvoiceid = 0;
                $.notify("Invoice deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_invoice_Delete').hide();
                $("#tbl-body").empty();
                $("#txt-discount").val("");
                $("#txt-shipping").val("");
                $("#txt-tax").val("");
                
                $("span-total").html($("#spn-suptotal").html());
               
                BindrowsEdit(editInvoiceID);
                Calculatesuptotal();
                
            }
            else {
                $.notify("Server error occured while deleting a invoice!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    var Sendmail = function (Invoiceno, Invoiceid) {
       
        var _obj = {
            'Tomail': Tomail,
            'Ccail': CCmail,
            'Subject': "",
            'Body': "",
            'Invoice': Invoiceno,
            'InvoiceDate': $("#txt-invoicedate").val(),
            'Total': $("#span-total").text(),
            'InvoiceId': Invoiceid,
            'CustomerName': $('#slt-customer').find(":selected").text(),
        };

        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/SendMail", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (response == "1") {
                
                $('#exist-valuesTo').val("");
                $('#exist-valuescc').val("");
                $('#MP_Email').hide();
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 1000);
            }
            else {
                $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    var GetCustomerMaildetails = function (customerid) {
        var _obj = {
            'Customerid': customerid
        };
        var tempList = {};
        $.when(RequestServer("CreateInvoiceAR.aspx/GetCustomerMaildetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    $(document).on('blur', '#txt_quantity,#txt_price,#txtdiscount,#txt_tax', function () {

        var Product = parseInt($(this).closest('tr').find('#slt-product').val());
        if (Product != 0) {
            var quantity = parseInt($(this).closest('tr').find('#txt_quantity').val() == "" ? 0 : $(this).closest('tr').find('#txt_quantity').val());
            var price = parseFloat($(this).closest('tr').find('#txt_price').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_price').val()).toFixed(2);
            var discount = parseFloat($(this).closest('tr').find('#txtdiscount').val() == "" ? 0.00 : $(this).closest('tr').find('#txtdiscount').val()).toFixed(2);
            var tax = parseInt($(this).closest('tr').find('#txt_tax').val() == "" ? 0 : $(this).closest('tr').find('#txt_tax').val());
            var discountype = $(this).closest('tr').find('#slt-discount').val() == "" ? 0 : $(this).closest('tr').find('#slt-discount').val();
            var netamount = 0;
            if (discountype == "%") {

                netamount = (price * quantity)
                if (discount != 0) {
                    var discountamt = netamount * discount / 100;
                    netamount = netamount - discountamt;
                }
            }
            else {
                netamount = (price * quantity) - discount;
            }
            if (tax != 0) {
                var taxamt = netamount * tax / 100;
                netamount = netamount + taxamt;
            }

            $(this).closest('tr').find('#txt_amount').val(parseFloat(netamount).toFixed(2));

            Calculatesuptotal();

            $("#spn-discount").html("");
            $("#spn-shpping").html("");
            $("#spn-tax").html("");
            $("#txt-discount").val("");
            $("#txt-shipping").val("");
            $("#txt-tax").val("");
            // $("#span-total").html("");
            //$("#spn-netamount").html("");
        }
        else {
            $.notify("Please select product.", { position: "right top", className: "error" });
        }


    });
    $('#slt-product').change(function () {

    });
    $(document).on('change', "#slt-product", function () {
        
        var invoiceis = this.value;
        var productprice = GetProductData(invoiceis);
        var Price = common.AUF(productprice['Product']);

        $(this).closest('tr').find('#txt_price').val(Price[0]["price"]);
        var Product = parseInt($(this).closest('tr').find('#slt-product').val());

        if (Product != 0) {
            var quantity = parseInt($(this).closest('tr').find('#txt_quantity').val() == "" ? 0 : $(this).closest('tr').find('#txt_quantity').val());
            var price = parseFloat($(this).closest('tr').find('#txt_price').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_price').val()).toFixed(2);
            var discount = parseFloat($(this).closest('tr').find('#txtdiscount').val() == "" ? 0.00 : $(this).closest('tr').find('#txtdiscount').val()).toFixed(2);
            var tax = parseInt($(this).closest('tr').find('#txt_tax').val() == "" ? 0 : $(this).closest('tr').find('#txt_tax').val());
            var discountype = $(this).closest('tr').find('#slt-discount').val() == "" ? 0 : $(this).closest('tr').find('#slt-discount').val();
            var netamount = 0;
            if (discountype == "%") {

                netamount = (price * quantity)
                if (discount != 0) {
                    var discountamt = netamount * discount / 100;
                    netamount = netamount - discountamt;
                }
            }
            else {
                netamount = (price * quantity) - discount;
            }
            if (tax != 0) {
                var taxamt = netamount * tax / 100;
                netamount = netamount + taxamt;
            }

            $(this).closest('tr').find('#txt_amount').val(parseFloat(netamount).toFixed(2));

            Calculatesuptotal();

            $("#spn-discount").html("");
            $("#spn-shpping").html("");
            $("#spn-tax").html("");
            $("#txt-discount").val("");
            $("#txt-shipping").val("");
            $("#txt-tax").val("");
            // $("#span-total").html("");
            $("#spn-netamount").html("");
        }
        else {
            $.notify("Please select product.", { position: "right top", className: "error" });
        }

    });
    $("#slt-discount").change(function () {
       
        $(this).closest('tr').find('#txtdiscount').val("");
    });
    $(document).on('change', '#slt-customer', function () {
       
        var customerid = parseInt($('#slt-customer').val());
        var Maildetails = GetCustomerMaildetails(customerid)
        var Maildetail = common.AUF(Maildetails['customerlst']);
        var cclist = common.AUF(Maildetails['cclist']);
        Tomail = Maildetail[0]["Email"];
        CCmail = cclist[0]["Email"];
        

    });
    $(document).on('change', '#slt-discount', function () {
       
        //$(this).closest('tr').find('#txtdiscount').val("");
        var quantity = parseInt($(this).closest('tr').find('#txt_quantity').val() == "" ? 0 : $(this).closest('tr').find('#txt_quantity').val());
        var price = parseFloat($(this).closest('tr').find('#txt_price').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_price').val()).toFixed(2);
       
        var netamount = 0;
        /*if (discountype == "%") {*/
          
            netamount = (price * quantity)
            //if (discount != 0) {
            //    var discountamt = netamount * discount / 100;
            //    netamount = netamount - discountamt;
            //}
        //}
        //else {
        //    netamount = (price * quantity) - discount;
        //}
        //if (tax != 0) {
        //    var taxamt = netamount * tax / 100;
        //    netamount = netamount + taxamt;
        //}
       
        $(this).closest('tr').find('#txt_amount').val(parseFloat(netamount).toFixed(2));

        Calculatesuptotal();

        $("#spn-discount").html("");
        $("#spn-shpping").html("");
        $("#spn-tax").html("");
        $("#txt-discount").val("");
        $("#txt-shipping").val("");
        $("#txt-tax").val("");
        // $("#span-total").html("");
        $("#spn-netamount").html("");
    });

   

    $(document).on('blur', '#txt-discount,#txt-shipping,#txt-tax', function () {
        
        var discount = $("#txt-discount").val() == "" ? 0 : $("#txt-discount").val();
        var subtotal = $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text();
        var shipping = $("#txt-shipping").val() == "" ? 0 : $("#txt-shipping").val();
        var tax = parseInt($("#txt-tax").val() == "" ? 0 : $("#txt-tax").val());

        $("#spn-discount").html(discount);
        $("#spn-shpping").html(shipping);
        
        
        var netamount = 0;
        var discountype = $('#slt-distype').find(":selected").text()
       
        if (discountype == "%") {
            if (discount != 0) {
                var discountamt = subtotal * discount / 100
                $("#spn-discount").html(parseFloat(discountamt).toFixed(2));
                netamount = subtotal - discountamt;
                netamount = netamount + parseInt(shipping);

                    
            }
            else {
                netamount = parseInt(subtotal) + parseInt(shipping);
            }
            
        }
        else {
            netamount = subtotal - discount + parseInt(shipping);
        }

        if (tax != 0) {
            var taxamt = netamount * tax / 100;
            netamount = netamount + taxamt;
            $("#spn-tax").html(parseFloat(taxamt).toFixed(2));
        }
        else {
            $("#spn-tax").html(0);
        }
       
        $("#span-total").html(parseFloat(netamount).toFixed(2));

        $("#spn-netamount").html(parseFloat(netamount).toFixed(2));

    });
    $(document).on('change', '#slt-distype', function () {
        var discount = $("#txt-discount").val() == "" ? 0 : $("#txt-discount").val();
        var subtotal = $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text();
        var shipping = $("#txt-shipping").val() == "" ? 0 : $("#txt-shipping").val();
        var tax = parseInt($("#txt-tax").val() == "" ? 0 : $("#txt-tax").val());

        $("#spn-discount").html(discount);
        $("#spn-shpping").html(shipping);


        var netamount = 0;
        var discountype = $('#slt-distype').find(":selected").text()
        
        if (discountype == "%") {
            if (discount != 0) {
                var discountamt = subtotal * discount / 100
                $("#spn-discount").html(parseFloat(discountamt).toFixed(2));
                netamount = subtotal - discountamt;
                netamount = netamount + parseInt(shipping);


            }
            else {
                netamount = parseInt(subtotal) + parseInt(shipping);
            }

        }
        else {
            netamount = subtotal - discount + parseInt(shipping);
        }

        if (tax != 0) {
            var taxamt = netamount * tax / 100;
            netamount = netamount + taxamt;
            $("#spn-tax").html(parseFloat(taxamt).toFixed(2));
        }
        else {
            $("#spn-tax").html(0);
        }
     
        $("#span-total").html(parseFloat(netamount).toFixed(2));

        $("#spn-netamount").html(parseFloat(netamount).toFixed(2));
    });
    

    $("#slt-paymentterms").change(function () {
        
        var AddDay = 0;
        var Invoicedate = $("#txt-invoicedate").val();
        var PaymentTerms = $('#slt-paymentterms').find(":selected").text();
        if (PaymentTerms == "NET 20") {
            AddDay = 20;
        }
        else if (PaymentTerms == "NET 30") {
            AddDay = 30;
        }
        else if (PaymentTerms == "NET 60") {
            AddDay = 60;
        }
        else if (PaymentTerms == "NET 90") {
            AddDay = 90;
        }
        else {
            AddDay = 0;
        }
        var result = new Date(Invoicedate);
        result.setDate(result.getDate() + AddDay);
        var Duedate = moment(result).local().format('MM/DD/YYYY');
        $("#txt-duedate").val(Duedate);

    });


    var Pastdate = function () {
    
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        $('#txt-startdate,#txt-endtdate').attr('min', today);
    }

    $(document).on('click', '#save-Customer', function () {
       // if (ValidateCustomer() && $("span[error-active='true']").length == 0) {

        if ($("#txt_customername").val() == "" || ($("#txt_email").val() == "")) {
            $.notify("Customer Name and email should not be empty!", { position: "right top", className: "error" });
            return false;
        }
        else {
            SaveCustomer();
        }
       // }

    });

    var ValidateCustomer = function () {
        var isvalid = true;
        var custName = $.trim($('#Custname').val());
        var contact = $.trim($('#contact-Number').val());
        var accountNumber = $.trim($('#txt-Account-Number').val());
        var reEnterAccountNumber = $.trim($('#txt-reenter-Account-Number').val());
        if (custName == '' || custName == null) {
            isvalid = false;
            $('#CustomerName-Validation').show();
        }

        if (custName != '') {
            var existingCustomer = masterData["ExistingCustomers"];
            if (existingCustomer != null && existingCustomer != undefined && existingCustomer.length > 0) {
                if (editCustomerID == 0) {
                    var matchedCustomerRecord = GetmatchedRecord(existingCustomer, 'CustomerName', custName);
                    if (matchedCustomerRecord.length > 0) {
                        isvalid = false;
                        $.notify("Customer Name is already exists!", { position: "right top", className: "error" });
                    }
                }
                else {
                    var unMatchedCustomers = GetunmatchedRecord(existingCustomer, 'CustomerID', editCustomerID);
                    var matchedCustomerRecord = GetmatchedRecord(unMatchedCustomers, 'CustomerName', custName);
                    if (matchedCustomerRecord.length > 0) {
                        isvalid = false;
                        $.notify("Customer Name is already exists!", { position: "right top", className: "error" });
                    }
                }
            }

        }
        return isvalid;
    }


    var SaveCustomer = function () {
        
        var _obj = {
            'CustomerName': $('#txt_customername').val(),
            'Email': $('#txt_email').val(),
            'CustomerdAddress': $('#txt_daddress').val(),
            'Cityd': $('#txt_dcity').val(),
            'Zipd': $('#txt_dzip').val(),
            'Stated': $('#txt_dstate').val(),
            'CustomerbAddress': $('#txt_baddress').val(),
            'Cityb': $('#txt_bcity').val(),
            'Zipb': $('#txt_bzip').val(),
            'Stateb': $('#txt_bstate').val(),
            'PaymentTerms': parseInt($('#slt_PaymentTerms').val()),
            'PaymentMethod': parseInt($('#slt_PaymentMethod').val()),
            
        }
        var insertObj = {
            'objCustomer': _obj
        }

        $.when(RequestServer("CreateInvoiceAR.aspx/SaveCustomer", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Customer created successfully!", { position: "right top", className: "success" });
                $("#mp_paid3").hide();
               GoBack()
            }
            else {
                $.notify("Server error occured while creating a customer !!", { position: "right top", className: "error" });
            }
        });
    }

    
    var ClearCustomer = function () {
        $("#txt_customername").val("");
        $("#txt_email").val("");
        $("#txt_daddress").val("");
        $("#txt_dcity").val("");
        $("#txt_dstate").val("");
        $("#txt_dzip").val("");
        $("#txt_bcity").val("");
        $("#txt_bstate").val("");
        $("#txt_bzip").val("");
        $('#slt_PaymentMethod').val("0");
        $('#slt_PaymentMethod').select2();

        $('#slt_PaymentTerms').val("0");
        $('#slt_PaymentTerms').select2();
        $("#txt_baddress").val("");

        $('#mp_paid3').modal('toggle');
        
    }


    $(document).on('click', '#btn-customercancel,#btn_customerclose', function () {
      
       
       // document.getElementById("#mp_paid").scrollIntoView();
        ClearCustomer();
    });

}