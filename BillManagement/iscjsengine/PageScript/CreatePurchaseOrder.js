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
       
        //$loading.show();
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
            debugger
            $("#spn_update").show();
            $("#spn_Save").hide();
            $("#div-edit").show();
            $("#spn_newinvoice").hide();
            $("#spn_updateinvoice").show();
            $("#spn-heder").show();
            BindCreateInvoiceScreen();
            BindrowsEdit(editInvoiceID);
            var shipperData = getShipperdata();
            BindEditShipperData(shipperData["ShipperData"]);
            var buyerINVData = getConsigneedata();
            BindEditConsigneeData(buyerINVData["ConsigneeData"]);
            //$("#spn_updateinvoice").html(editInvoiceID);

        }
        $loading.hide();
    });

    $(document).on('change', '#slt-Shipper', function () {
       
        var shipperData = getShipperdata();
        BindEditShipperData(shipperData["ShipperData"]);
    });

    $(document).on('change', '#slt-Consignee', function () {
        var buyerINVData = getConsigneedata();
        BindEditConsigneeData(buyerINVData["ConsigneeData"]);
    });
}

//DOM
{
    var BindCreateInvoiceScreen = function () {

        var Currentdate = (new Date()).toISOString().split('T')[0];
        $("#txt-invoicedate").val(Currentdate);
        masterData = GetMasterData();
        BindDropDowns($('#slt-Shipper'), masterData["Seller"], 'Choose Shipper')
        BindDropDowns($('#slt-Consignee'), masterData["BuyerList"], 'Choose Consignee')
        BindDropDowns($('#slt-Loading1'), masterData["PortofLoading"], 'Choose Port of Loading')
        BindDropDowns($('#slt-Discharge1'), masterData["PortofDischarge"], 'Choose Port of Discharge')
        BindDropDowns($('#slt-Destination'), masterData["FinalDestination"], 'Choose Final Destination')
        BindDropDowns($('#slt-Terms'), masterData["DeliveryTerms"], 'Choose Delivery Terms')
        BindDropDowns($('#slt-Payment'), masterData["PaymentTerms"], 'Choose Payment Terms')
    }
    var BindEditShipperData = function (ShipperData) {

        $('#BillingAdd').val(ShipperData[0]['ShipperAddress'] + ShipperData[0]['ShipperCity'] + ',' + ShipperData[0]['ShipperState'] + ',' + ShipperData[0]['ShipperCountry'] + '-' + ShipperData[0]['ShipperZip'] + '.')
    }

    var BindEditConsigneeData = function (BuyerINVData) {


        $('#BillingAdd1').val(BuyerINVData[0]['CustomerAddress'] + BuyerINVData[0]['City'] + ',' + BuyerINVData[0]['State'] + ',' + BuyerINVData[0]['Country'] + '-' + BuyerINVData[0]['Zip'] + '.')
    }
}
//DATA
{
    var GetMasterData = function () {
     
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("CreatePurchaseOrder.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetProductData = function (invoiceis) {
        var _obj = {
            'Invoiceid': parseInt(invoiceis)
        };
        var tempList = {};
        $.when(RequestServer("CreatePurchaseOrder.aspx/GetProductData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var getShipperdata = function () {
        var _obj = {
            'InvoiceId': parseInt($('#slt-Shipper').val())
        };
        var tempList = {};
        $.when(RequestServer("CreatePurchaseOrder.aspx/GetshipperData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var getConsigneedata = function () {
        var _obj = {
            'InvoiceId': parseInt($('#slt-Consignee').val())
        };
        var tempList = {};
        $.when(RequestServer("CreatePurchaseOrder.aspx/GetshipperData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var UpdateInvoicedata = function (_obj) {
        var updateObj = {
            'objInvoice': _obj
        }
        $.when(RequestServer("CreatePurchaseOrder.aspx/UpdateInvoicedata", updateObj)).done(function (response) {
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

        $("#tbl_productlst").append(
            "<tr><td><select class='select2 select2-hidden-accessible' id='slt-product'><option value='0'>Choose Product</option></select></td >"
            + "<td><input type='text' class='form-control numeric'id='txt_Size'/></td>"
            + "<td><input type='text' class='form-control numeric'id='txt_no-cortans'/></td>"
            + "<td><input type='text' class='form-control numeric'id='txt_price'/></td>"
            + "<td><div class='cell-left'><select class='form-control'><option>Each</option></select></div><div ><input id='txt_quantity' type='text' class='form-control numeric'/></div></td>"
            + "<td style='text-align: right'><input type='text' class='form-control numeric' id='txt_amount' value='0.00'  readonly/></td>"
            + "<td>"
            + "<a class='isc-set-pos-a-edit-i add' title='Add' id='addrow'><i class='fa fa-plus' style='padding: 0px;'></i></a></td></tr >");
        $('#slt-product').select2();
        Bindrowsdropdwon();
    }

    var BindrowsAdd = function () {

        $("#tbl_productlst").append(
            "<tr><td><select class='select2 select2-hidden-accessible' id='slt-product'><option value='0'>Choose Product</option></select></td >"
            + "<td><input type='text' class='form-control numeric'id='txt_Size'/></td>"
            + "<td><input type='text' class='form-control numeric'id='txt_no-cortans'/></td>"
            + "<td><input type='text' class='form-control numeric'id='txt_price'/></td>"
            + "<td><div class='cell-left'><select class='form-control'><option>Each</option></select></div><div class='cell-left mar-lft-10'><input id='txt_quantity' type='text' class='form-control numeric'/></div></td>"
            + "<td style='text-align: right'><input type='text' class='form-control numeric' id='txt_amount' value='0.00'  readonly/></td>"
            + "<td><a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p1 delete' title='Delete' href='#'><i class='fa fa-trash-o'></i></a>"
            + "<a class='isc-set-pos-a-edit-i add' title='Add' id='addrow'><i class='fa fa-plus' style='padding: 0px;'></i></a></td></tr >");
        $('#slt-product').select2();
        Bindrowsdropdwon();
    }

    var BindrowsEdit = function (editInvoiceID) {
    debugger
        var Invoicelst = GetIvoiceEditBind(editInvoiceID);
        var lstdetail = common.AUF(Invoicelst['Orderinvoice']);
        var lstinvoicedetail = common.AUF(Invoicelst['Invoicelst']);
        $("#head_invoice").html(lstinvoicedetail[0]["InvoiceNo"]);

        var dateMomentObject = moment(lstinvoicedetail[0]["Invoicedate"], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
        var dateObject = dateMomentObject.toDate();

        var nextinv = moment.utc(dateObject).toDate();
        var localIn = moment(nextinv).local().format('YYYY-MM-DD');
        $("#head_date").html(localIn);
        //
        $.each(lstdetail, function (index, item) {

            $("#tbl-body").append(
                "<tr><td><select disabled='true' class='form-control isc-w-270' id='slt-product'><option value='0'>Choose Product</option></select></td >"
                + "<td><input type='text' class='form-control numeric' value=" + item["Size"] + " id='txt_Size'readonly/></td>"
                + "<td><input type='text' class='form-control numeric' value=" + item["No_of_Carton"] + " id='txt_no-cortans' readonly/></td>"
                + "<td><input type='text' value=" + item["Price"] + " type = 'text' class='form-control numeric' id='txt_price' readonly/></td>"
                + "<td><div class='cell-left'><select disabled='true' class='form-control'><option>Each</option></select></div><div class='cell-left mar-lft-10'><input id='txt_quantity' value=" + item["quantity"] + " type='text' class='form-control numeric' readonly/></div></td>"
                + "<td style='text-align: right'><input type='text' value=" + item["Total"] + " class='form-control' id='txt_amount' readonly/></td>"
                + "<td>"   
                + "<a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p1 isc-hide-data isc-click-data' title='Edit' href='#'><i class='fa fa-edit'></i>"
                + "<a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p2 isc-vis-data' style='display: none;' title='Update' data-Updateid=" + item["OrderInvoice"] + " href='#'><i class='fa fa-check'></i></a></a >"
                + "<a class='isc-action-badge-td-s1 pad-lft-5 isc-color-p2 isc-vis-data' id='rowcancel' style='display: none; ' title='Cancel' href='#'><i class='fa fa-times'></i></a></td ></tr >")
            
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

        $("#spn-netamount").html(parseFloat(suptotal).toFixed(2));

    }

    var BindInvoiceList = function (lstinvoicedetail) {
        
        $.each(lstinvoicedetail, function (index, item) {
            debugger
            var nextDue = moment.utc(item["Invoicedate"]).toDate();
            var localDue = moment(nextDue).local().format('YYYY-MM-DD');


            $('#txt-invoicedate').val(localDue);
              
            $('#txt-invoice').val(item["InvoiceNo"]);

            var nextDue = moment.utc(item["BuyerOrderDate"]).toDate();
            var localDue = moment(nextDue).local().format('YYYY-MM-DD');

            $('#txt-buyerdate').val(localDue);

            var nextDue = moment.utc(item["ShipmentDate"]).toDate();
            var localDue = moment(nextDue).local().format('YYYY-MM-DD');

            $('#txt-shipperdate').val(localDue);

            var axpDate = moment.utc(item["ExRefDate"]).toDate();
            var localExp = moment(axpDate).local().format('YYYY-MM-DD');

            $('#txt-exportersdate').val(localExp);

            $('#txt-buyerorder').val(item["BuyerOrderNo"]);

            $('#spn-netamount').html(item["Total"].toFixed(2));

            $('#txt-Pre-Carriage').val(item["PreCarriage"]);

            $('#txt-PlaceofReceipt').val(item["PlaceOfPreCarriage"]);
            $('#txt-Seal').val(item["SealNo"]);
            $('#txt-Container').val(item["ContainerNo"]);

            $('#slt-Shipper').val(item["Shipperid"]);
            $('#slt-Shipper').select2();

            $('#slt-Consignee').val(item["BuyerID"]);
            $('#slt-Consignee').select2();


            $('#slt-Loading1').val(item["PortOfLoading"]);
            $('#slt-Loading1').select2();

            $('#slt-Discharge1').val(item["PortOfDischarge"]);
            $('#slt-Discharge1').select2();

            $('#slt-Destination').val(item["FinalDest"]);
            $('#slt-Destination').select2();

            $('#txt-VesselNo').val(item["VesselNo"]);
            $('#txt-DCINo').val(item["DCINo"]);

            $('#txt-Cartons').val(item["ContainerNo"]);
            $('#txt-Size').val(item["size"]);




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
                'carton': parseInt($(this).closest('tr').find('#txt_no-cortans').val()),
                'Size': parseInt($(this).closest('tr').find('#txt_Size').val()),
                'price': parseFloat($(this).closest('tr').find('#txt_price').val()),
                'amount': parseFloat($(this).closest('tr').find('#txt_amount').val()),

                'invoiceid': parseInt(Invoiceid),
            }

            $(this).closest('tr').find('.isc-hide-data').show();
            $(this).closest('tr').find('.isc-vis-data').hide();
            $(this).closest('tr').find('#slt-product').prop('disabled', true);
            $(this).closest('tr').find('#txt_quantity').attr("readonly", true);
            $(this).closest('tr').find('#txt_price').attr("readonly", true);
            $(this).closest('tr').find('#txt_no-cortans').attr("readonly", true);
            $(this).closest('tr').find('#txt_Size').attr("readonly", true);
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
        window.location.href = 'invoiceListVietnam.aspx';

    });
    $(document).on('click', '[delete-cancel]', function () {
        deleteCustomerID = 0;
        $('#mp_invoice_Delete').hide();
    })
    $(document).on('click', '.isc-click-data', function () {
        if (IsUpdated == 0) {
            IsUpdated = 1;
            $(this).closest('tr').find('.isc-hide-data').hide();
            $(this).closest('tr').find('.isc-vis-data').show();
            $(this).closest('tr').find('#slt-product').prop('disabled', false);
            $(this).closest('tr').find('#txt_quantity').attr("readonly", false);
            $(this).closest('tr').find('#txt_price').attr("readonly", false);
            $(this).closest('tr').find('#txt_Size').attr("readonly", false);
            $(this).closest('tr').find('#txt_no-cortans').attr("readonly", false);

        }
        else {
            $.notify("Please Update previous row!!", { position: "right top", className: "error" });
        }


    });
    $(document).on('click', '#rowcancel', function () {
        debugger
        $("#UpdateInvoice").show();
        $("#Updatesend").show();
        $(this).closest('tr').find('.isc-hide-data').show();
        $(this).closest('tr').find('.isc-vis-data').hide();
        $(this).closest('tr').find('#slt-product').prop('disabled', true);
        $(this).closest('tr').find('#txt_quantity').attr("readonly", true);
        $(this).closest('tr').find('#txt_price').attr("readonly", true);
        $(this).closest('tr').find('#txt_no-cortans').attr("readonly", true);
        $(this).closest('tr').find('#txt_Size').attr("readonly", true);
        IsUpdated = 0;
    });
    //rowcancel
    $(document).on('click', '#addrow', function () {


        if ($(this).closest('tr').find('#slt-product').val() != 0 && $(this).closest('tr').find('#txt_quantity').val() != "" && $(this).closest('tr').find('#txt_price').val() != "") {
            BindrowsAdd();
           
        }
        else {
            $.notify("Please enter mandatory field!!", { position: "right top", className: "error" });
        }

    });

    $(document).on('click', '.delete', function (e) {
        debugger
        e.preventDefault();

        var totalamount = $('#span-total').text();
        var amount = parseFloat($(this).closest('tr').find('#txt_amount').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_amount').val()).toFixed(2);
        $("#span-total").html("");
        $("#spn-suptotal").html("");
        var subtotal = totalamount - amount;

        var subtotalamt = $('#spn-suptotal').text();

        var total = subtotalamt - amount

        $("#span-total").html(parseFloat(subtotal).toFixed(2));
        $("#spn-netamount").html(parseFloat(subtotal).toFixed(2));


        $("#spn-suptotal").html(parseFloat(total).toFixed(2));

        $(this).closest('tr').remove();

         Calculatesuptotal();
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
                    "amount": parseFloat($('#txt_amount', this).val()),
                    "invoiceid": Invoiceno,

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
        debugger
        var data = "";
        var dt = new Date();
        var Invoiceno = "INVO" + dt.getMinutes() + dt.getSeconds();

        $("table#tbl_productlst > tbody > tr").each(function (row, tr) {

            if ($('#slt-product', this).val() != 0) {
                debugger
                var obj = {
                    "product": parseInt($('#slt-product', this).val()),
                    "quantity": parseInt($('#txt_quantity', this).val()),
                    "price": parseFloat($('#txt_price', this).val()),
                    "size": parseInt($('#txt_Size', this).val()),
                    "carton": parseInt($('#txt_no-cortans', this).val()),
                    "amount": parseFloat($('#txt_amount', this).val()),
                    "invoiceid": Invoiceno,
                }
                TableData.push(obj);
            }
            else {

                // Isproduct = 0;
            }


        });
        if (TableData.length > 0) {
            SavePurchaseOrder(Invoiceno);
        }
        else {
            $.notify("Please add product.", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '#UpdateInvoice', function (e) {
        debugger
        if ($("#slt-customer").val() != 0 && $("#slt-paymentterms").val() != 0 && $("#txt-invoicedate").val() != "") {
            UpdatePurchaseOrder();
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
        debugger
        var _obj = {
            'invoicelist': InvoiceList,
        };
        var tempList = {};
        $.when(RequestServer("CreatePurchaseOrder.aspx/InsertPurchase", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

            TableData = [];
            if (parseInt(response) > 0) {
                $.notify("Purchase Order created successfully!", { position: "right top", className: "success" });
                Isproduct = 1;
                setTimeout(function () {
                    window.location.href = 'PurchaseOrder.aspx';
                }, 2000);
            }
            else {

                $.notify("Server error occurred while Inserting Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var SaveSendInvoice = function (InvoiceList, Invoiceno, Invoiceid) {

        var _obj = {
            'invoicelist': InvoiceList,
        };
        var tempList = {};
        $.when(RequestServer("createInvoiceVietnam.aspx/InsertPurchase", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

            TableData = [];
            if (parseInt(response) > 0) {
                Sendmail(Invoiceno, Invoiceid);
                $.notify("Invoice created and mail send successfully!", { position: "right top", className: "success" });
                Isproduct = 1;
                setTimeout(function () {
                    window.location.href = 'invoiceListVietnam.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occurred while Inserting Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var SavePurchaseOrder = function (Invoiceno) {

        debugger
        if (Isproduct != 0) {
            if ($("#slt-Shipper").val() != 0 && $("#slt-Consignee").val() != 0 && $("#txt-invoicedate").val() != "") {
                var status = 0;
                var _obj = {
                    'Consignee': parseInt($('#slt-Consignee').val()),
                    'Shipper': parseInt($('#slt-Shipper').val()),
                    'Invoicedate': $('#txt-invoicedate').val(),
                    'ExporterDate': $('#txt-exportersdate').val(),
                    'BuyersOrder': $('#txt-buyerorder').val(),
                    'BuyerDate': $('#txt-buyerdate').val(),
                    'ShipmentDate': $('#txt-shipperdate').val(),
                    'VesselNo': $('#txt-VesselNo').val(),
                    'Invoice': Invoiceno,
                    'PreCarriage': $('#txt-Pre-Carriage').val(),
                    'PlaceofReceipt': $('#txt-PlaceofReceipt').val(), 
                    'Destination': parseInt($('#slt-Destination').val()),
                    //'Seal': $('#txt-Seal').val(),
                    //'Container': $('#txt-Container').val(),
                    'PortofLoading': parseInt($('#slt-Loading1').val()),
                    'PortofDischarge': parseInt($('#slt-Discharge1').val()),
                    /*'Subtotal': $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text(),*/
                    'Total': parseFloat($('#spn-netamount').text() == "" ? 0 : $('#spn-netamount').text()),
                    /*'terms': parseInt($('#slt-Terms').val()),*/
                    /*'Paymentterms': parseInt($('#slt-Payment').val()),*/
                    //'carton': $('#txt-Cartons').val(),
                    //'Size': $('#txt-Size').val(),
                    /*'declaration': $('#Declaration').val(),*/
                    'Status': status,
                }
                var insertObj = {
                    'objInvoice': _obj
                }

                $.when(RequestServer("CreatePurchaseOrder.aspx/SaveInvoice", insertObj)).done(function (response) {

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

                $.when(RequestServer("createInvoiceVietnam.aspx/SaveInvoice", insertObj)).done(function (response) {
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

    var UpdatePurchaseOrder = function () {

        var _obj = {
            'Consignee': parseInt($('#slt-Consignee').val()),
            'Shipper': parseInt($('#slt-Shipper').val()),
            'Invoicedate': $('#txt-invoicedate').val(),
            'ExporterDate': $('#txt-exportersdate').val(),
            'BuyersOrder': $('#txt-buyerorder').val(),
            'BuyerDate': $('#txt-buyerdate').val(),
            'ShipmentDate': $('#txt-shipperdate').val(),
            'VesselNo': $('#txt-VesselNo').val(),
            //'Invoice': Invoiceno,
            'PreCarriage': $('#txt-Pre-Carriage').val(),
            'PlaceofReceipt': $('#txt-PlaceofReceipt').val(),
            'Destination': parseInt($('#slt-Destination').val()),
            //'Seal': $('#txt-Seal').val(),
            //'Container': $('#txt-Container').val(),
            'PortofLoading': parseInt($('#slt-Loading1').val()),
            'PortofDischarge': parseInt($('#slt-Discharge1').val()),
            /*'Subtotal': $("#spn-suptotal").text() == "" ? 0 : $("#spn-suptotal").text(),*/
            'Total': parseFloat($('#spn-netamount').text() == "" ? 0 : $('#spn-netamount').text()),
            'invoiceid': parseInt(editInvoiceID),
        }
        var insertObj = {
            'objInvoice': _obj
        }

        $.when(RequestServer("CreatePurchaseOrder.aspx/UpdatePurchaseOrderdata", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {

                $.notify("Invoice updated successfully!", { position: "right top", className: "success" });

                setTimeout(function () {
                    window.location.href = 'PurchaseOrder.aspx';
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

        $.when(RequestServer("createInvoiceVietnam.aspx/UpdateARInvoicedata", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {

                Sendmail($('#txt-invoice').val(), editInvoiceID)
                $.notify(" Invoice updated and mail send successfully.", { position: "right top", className: "success" });

                setTimeout(function () {
                    window.location.href = 'PurchaseOrder.aspx';
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
        $.when(RequestServer("CreatePurchaseOrder.aspx/GetInvoicdetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeleteInvoice = function () {
        var obj = {
            'DeleteInvoiceid': parseInt(deleteInvoiceid)
        }
        var tempList = {};
        $.when(RequestServer("createInvoiceVietnam.aspx/DeleteInvoice", obj)).done(function (response) {
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
    //var Sendmail = function (Invoiceno, Invoiceid) {

    //    var _obj = {
    //        'Tomail': Tomail,
    //        'Ccail': CCmail,
    //        'Subject': "",
    //        'Body': "",
    //        'Invoice': Invoiceno,
    //        'InvoiceDate': $("#txt-invoicedate").val(),
    //        'Total': $("#span-total").text(),
    //        'InvoiceId': Invoiceid,
    //        'CustomerName': $('#slt-customer').find(":selected").text(),
    //    };

    //    var tempList = {};
    //    $.when(RequestServer("invoiceListVietnam.aspx/SendMail", _obj)).done(function (response) {
    //        tempList = $.parseJSON(response);
    //        if (response == "1") {

    //            $('#exist-valuesTo').val("");
    //            $('#exist-valuescc').val("");
    //            $('#MP_Email').hide();
    //            setTimeout(function () {
    //                window.location.href = 'invoiceListVietnam.aspx';
    //            }, 1000);
    //        }
    //        else {
    //            $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
    //        }
    //    });
    //    return tempList;
    //}
    //var GetCustomerMaildetails = function (customerid) {
    //    var _obj = {
    //        'Customerid': customerid
    //    };
    //    var tempList = {};
    //    $.when(RequestServer("createInvoiceVietnam.aspx/GetCustomerMaildetails", _obj)).done(function (response) {
    //        tempList = $.parseJSON(response);
    //    });
    //    return tempList;
    //}
    $(document).on('blur', '#txt_quantity,#txt_price', function () {
        debugger
        var Product = parseInt($(this).closest('tr').find('#slt-product').val());
        if (Product != 0) {
            var quantity = parseInt($(this).closest('tr').find('#txt_quantity').val() == "" ? 0 : $(this).closest('tr').find('#txt_quantity').val());
            var price = parseFloat($(this).closest('tr').find('#txt_price').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_price').val()).toFixed(2);
            var netamount = 0;

            netamount = (price * quantity)

            $(this).closest('tr').find('#txt_amount').val(parseFloat(netamount).toFixed(2));
            $(this).closest('tr').find('#span-total').val(parseFloat(netamount).toFixed(2));

            Calculatesuptotal();
        }
        else {
            $.notify("Please select product.", { position: "right top", className: "error" });
        }


    });

    //$(document).on('change', "#slt-product", function () {

    //    var invoiceis = this.value;
    //    var productprice = GetProductData(invoiceis);
    //    var Price = common.AUF(productprice['Product']);

    //    $(this).closest('tr').find('#txt_price').val(Price[0]["price"]);
    //    var Product = parseInt($(this).closest('tr').find('#slt-product').val());

    //    if (Product != 0) {
    //        var quantity = parseInt($(this).closest('tr').find('#txt_quantity').val() == "" ? 0 : $(this).closest('tr').find('#txt_quantity').val());
    //        var price = parseFloat($(this).closest('tr').find('#txt_price').val() == "" ? 0.00 : $(this).closest('tr').find('#txt_price').val()).toFixed(2);

    //        var netamount = 0;

    //        $(this).closest('tr').find('#txt_amount').val(parseFloat(netamount).toFixed(2));
    //        $(this).closest('tr').find('#span-total').val(parseFloat(netamount).toFixed(2));

    //        Calculatesuptotal();

    //        $("#span-total").html("");
    //        $("#spn-netamount").html("");
    //    }
    //    else {
    //        $.notify("Please select product.", { position: "right top", className: "error" });
    //    }

    //});
    //$("#slt-discount").change(function () {

    //    $(this).closest('tr').find('#txtdiscount').val("");
    //});
    $(document).on('change', '#slt-customer', function () {

        var customerid = parseInt($('#slt-customer').val());
        var Maildetails = GetCustomerMaildetails(customerid)
        var Maildetail = common.AUF(Maildetails['customerlst']);
        var cclist = common.AUF(Maildetails['cclist']);
        Tomail = Maildetail[0]["Email"];
        CCmail = cclist[0]["Email"];

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

    $(document).on('click', '#btn-customercancel,#btn_customerclose', function () {


        // document.getElementById("#mp_paid").scrollIntoView();
        ClearCustomer();
    });

}