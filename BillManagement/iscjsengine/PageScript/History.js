{
    var Invoiceliastdata = [];
    var InvoiceId = 0;
    var maildata = [];
    var mailbody = "";
    var Invoice = '';
    var invoicedate = '';
    var total = '';
    var subject = ''
    var ShipperName = '';
    var billDetails = [];
    var ShipperId = 0;
    var fileContainer = [];
    var fileResponse = [];
}

//Load Event
$(document).ready(function () {

    $loading.show();
    setTimeout(function () {
        Invoiceliastdata = GetInvoiceData();
        BindInvoiceList();
        BindDropDown();
        //BindKPI(Invoiceliastdata);
        //billDetails = GetBillDetails();
        //BindDropDowns($('#slt_paymentmode'), $.parseJSON(billDetails[0]["Table"]), 'Choose Payment Method')
        $loading.hide();
    }, 0);
});

{
    var BindInvoiceList = function () {

        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl-invoice').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "History.aspx/GetInvoiceList",
                contentType: "application/json;",
                dataType: "json",
                type: "POST",
                async: false,
                "data": function (dataTableModel) {
                    var obj = ConfigurePaginationModel(dataTableModel);
                    return JSON.stringify(obj);
                },
                "dataSrc": function (json) {

                    var objData = $.parseJSON(json.d);
                    json.data = common.AUF(objData['Historylist']);
                    json.recordsTotal = common.AUF(objData['AllCount'][0]["Count"]);
                    json.recordsFiltered = common.AUF(objData['AllCount'][0]["Count"]);
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[0, "asc"]],
            "bFilter": false,
            'bDestroy': true,
            'bInfo': false,
            "pageLength": 10,
            'bLengthChange': false,
            "language": {
                "emptyTable": '<span class="no-data-message">No Data Found</span>'
            },
            'aoColumns': [
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        //html += '<div style="margin-left: 0px">'
                        //html += '<input type="checkbox" data-Bills-Check="true" value="' + data["InvoiceId"] + '">';
                        //html += '</div>'

                        html += '<h5 >' + (data["ShipperName"] == null || data["ShipperName"] == '' ? '-' : data["ShipperName"]) + '</h5>';

                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        //html += '<div style="margin-left: 0px">'
                        //html += '<input type="checkbox" data-Bills-Check="true" value="' + data["InvoiceId"] + '">';
                        //html += '</div>'

                        html += '<h5 >' + (data["BuyerName"] == null || data["BuyerName"] == '' ? '-' : data["BuyerName"]) + '</h5>';

                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["InvID"] == null || data["InvID"] == '' ? '-' : data["InvID"]) + '</h5>';
                        return html;
                    }
                },
                //{
                //    "width": '25%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = '';
                //        html += '<h5 >' + (data["Description"] == null || data["Description"] == '' ? '-' : data["Description"]) + '</h5>';
                //        return html;
                //    }
                //},
                //},
                //{
                //  "width": '18%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = '';

                //        if (data["BillStatus"] == 0) {
                //            html += '<i style="color:#1589ee !important" class="fa fa-circle-o" aria-hidden="true"></i> <a style="color:#1589ee !important; cursor: context-menu;" >' + (data["Status"] == null || data["Status"] == '' ? '-' : data["Status"]) + '</a>';
                //        }
                //        else if (data["BillStatus"] == 1) {
                //            html += '<i style="color:#fd7e00 !important" class="fa fa-circle-o" aria-hidden="true"></i> <a style="color:#fd7e00 !important; cursor: context-menu;" >' + (data["Status"] == null || data["Status"] == '' ? '-' : data["Status"]) + '</a>';
                //        }
                //        else if (data["BillStatus"] == 2) {
                //            html += '<i style="color:#13a840 !important" class="fa fa-circle-o" aria-hidden="true"></i> <a style="color:#13a840 !important; cursor: context-menu;" >' + (data["Status"] == null || data["Status"] == '' ? '-' : data["Status"]) + '</a>';
                //        }
                //        else if (data["BillStatus"] == 3 && data["Dueamount"] == 0.00) {
                //            html += '<i style="color:#13a840 !important" class="fa fa-circle-o" aria-hidden="true"></i> <a style="color:#13a840 !important; cursor: context-menu;" >Fully Paid</a>';
                //        }
                //        else if (data["BillStatus"] == 3) {
                //            html += '<i style="color:#13a840 !important" class="fa fa-circle-o" aria-hidden="true"></i> <a style="color:#13a840 !important; cursor: context-menu;" >' + (data["Status"] == null || data["Status"] == '' ? '-' : data["Status"]) + '</a>';
                //        }


                //        else if (data["BillStatus"] == 5) {
                //            html += '<i style="color:#808080 !important" class="fa fa-circle-o" aria-hidden="true"></i> <a style="color:#808080 !important; cursor: context-menu;" >' + (data["Status"] == null || data["Status"] == '' ? '-' : data["Status"]) + '</a>';
                //        }
                //        return html;
                //    }
                //},

                {
                    "width": '18%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["BuyerOrderNo"] == null || data["BuyerOrderNo"] == '' ? '-' : data["BuyerOrderNo"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '16%%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Invoicedate"] == null || data["Invoicedate"] == '' ? '-' : data["Invoicedate"]) + '</h5>';
                        return html;
                    }
                },//TermCode
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: center; color: #66B050!important;">' + ("₹" + (data["Dueamountt"] == null || Math.sign(parseFloat(data["Dueamountt"])) == -1 ? '0.00' : parseFloat(data["Dueamountt"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },

                {
                    "width": '8%',
                    "mData": function (data, type, dataToSet) {

                        //   var html = '<a href="#" class="isc-action-badge-td-s1 pad-lft-5" data-toggle="modal" title="Pay Now" data-markaspaid="' + data["InvoiceId"] + '" data-customerid="' + data["Customerid"] + '" data-billstatus="' + data["BillStatus"] + '"> <img src="img/makepayment.png" style="width:19px;" class="isc-mal-pay-icon"></a>';

                        var html = '<a class="isc-action-badge-td-s1 pad-lft-5 isc-view" title="View" href="#" data-View="' + data["InvoiceId"] + '" ><i class="fa fa-eye"></i></a>';

                        html += '<div class="screen-row isc-inline-pop-action-s1  pad-lft-min" style="display: inline-block;">'
                        html += '<a class="isc-action-badge-td-s1" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="More Option">'
                        html += '<i class="fa fa-ellipsis-v "></i></a>'
                        html += ' <ul class="dropdown-menu-entity">'
                        //html += ' <li><a href="#" data-Editinvoice="' + data["InvoiceId"] + '" data-billstatus="' + data["BillStatus"] + '" class="isc-action-badge-td-s1 pad-lft-5" title="Edit">Edit</a></li>'
                        // html +='<li><a href="#" class="isc-action-badge-td-s1 pad-lft-5" title="Cancel">Cancel</a></li>'
                        html += '<li><a href="#" class="isc-action-badge-td-s1 pad-lft-5" data-toggle="modal" title="Email" data-emailid="' + data["InvoiceId"] + '">Mail</a></li>'
                       // html += ' <li><a  href="#" data-updateinvoice="' + data["InvoiceId"] + '" data-billstatus="' + data["BillStatus"] + '" class="isc-action-badge-td-s1 pad-lft-5" title="Edit">Update</a></li>'
                        // html += ' <li> <a class="isc-action-badge-td-s1 pad-lft-5" title="Timeline" data-timeline="' + data["InvoiceId"] + '" data-toggle="modal" href="#">Timeline</a></li>'
                        html += '<li><a href="#"  class="isc-action-badge-td-s1 pad-lft-5" title="Download Pdf" data-SavePdf="' + data["InvoiceId"] + '" id="generate_pdf_btn">Download Pdf</a></li>';
                        html += ' </ul>'
                        html += ' </div>'
                        return html;
                    }
                },

            ],
            "drawCallback": function (settings) {

            },
            "fnDrawCallback": function () {
                $('#tbl-invoice tr td').each(function (index, item) {
                    var text = $(item).text();

                    if (text != "    EditMail  TimelineDownload Pdf  ") {
                        $(item).attr('title', text);
                    }

                });

                if (dataAllCount > 10) {
                    $('.dataTables_paginate').show();
                }
                else {
                    $('.dataTables_paginate').hide();
                }
            }
        });

    }
    var ConfigurePaginationModel = function (objModel) {

        var obj = {};
        obj.Start = objModel.start;
        obj.Skip = objModel.length;
        obj.OrderBy = ConfigureOrderBy(objModel);
        obj.Shipper = $('select#slt-Shipper option:selected').val();
        obj.Invoice = $('select#slt-invoice option:selected').val();
        //obj.Status = $('select#slt-status option:selected').val();
        var _obj = {};
        _obj = { "Invoicelist": obj };
        return _obj;
    }
    var ConfigureOrderBy = function (objModel) {

        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "ShipperName " + direction;
                break;
            case 1:
                orderBy = "BuyerName " + direction;
                break;
            case 2:
                orderBy = "InvID " + direction;
                break;
            case 3:
                orderBy = "BillStatus " + direction;
                break;
            case 4:
                orderBy = "BuyerOrderNo " + direction;
                break;
            case 5:
                orderBy = "Invoicedate " + direction;
                break;
            case 6:
                orderBy = "Dueamountt " + direction;
                break;
        }
        return orderBy;
    }
    var BindKPI = function (Invoiceliastdata) {

        var UnsubmitInvoice = [];
        var ReleasedInvoice = [];
        var PaidInvoice = [];
        var DueInvoice = [];
        UnsubmitInvoice = common.AUF($.parseJSON(Invoiceliastdata[2]["Table2"]));
        ReleasedInvoice = common.AUF($.parseJSON(Invoiceliastdata[3]["Table3"]));
        PaidInvoice = common.AUF($.parseJSON(Invoiceliastdata[4]["Table4"]));
        DueInvoice = common.AUF($.parseJSON(Invoiceliastdata[5]["Table5"]));
        if (UnsubmitInvoice.length > 0) {
            $('#Spn-Unsubmitbill').html((UnsubmitInvoice[0]["Amount"] == null || Math.sign(parseFloat(UnsubmitInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(UnsubmitInvoice[0]["Amount"]))));
            $('#Spn-incount').html(UnsubmitInvoice[0]["Invoice"])
        }
        if (ReleasedInvoice.length > 0) {
            $('#Spn-Released').html((ReleasedInvoice[0]["Amount"] == null || Math.sign(parseFloat(ReleasedInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(ReleasedInvoice[0]["Amount"]))));
            $('#Spn-releasedin').html(ReleasedInvoice[0]["Invoice"])
        }
        if (PaidInvoice.length > 0) {
            $('#Spn-paid').html((PaidInvoice[0]["Amount"] == null || Math.sign(parseFloat(PaidInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(PaidInvoice[0]["Amount"]))));
            $('#Spn-paidin').html(PaidInvoice[0]["Invoice"])
        }
        if (DueInvoice.length > 0) {
            $('#Spn-Due').html((DueInvoice[0]["Amount"] == null || Math.sign(parseFloat(DueInvoice[0]["Amount"])) == -1 ? 0 : moneyFormatter(parseFloat(DueInvoice[0]["Amount"]))));
            $('#Spn-duein').html(DueInvoice[0]["Invoice"])
        }
    }
}
//data manipulation
{

    //var GetBillDetails = function () {

    //    var tempList = {};
    //    $.when(RequestServer("InvoiceList.aspx/GetBillDetails")).done(function (response) {
    //        tempList = $.parseJSON(response);
    //    });
    //    return tempList;
    //}

    var GetInvoiceData = function () {

        var tempList = {};
        $.when(RequestServer("PurchaseOrder.aspx/GetInvoiceData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var BindDropDown = function () {

        var Shipperlst = common.AUF($.parseJSON(Invoiceliastdata[0]["Table"]));

        var ShipperHtml = '<option value="0">Choose Shipper</option>';
        $.each(Shipperlst, function (index, item) {
            ShipperHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#slt-Shipper').html(ShipperHtml);


        var Invoicelst = common.AUF($.parseJSON(Invoiceliastdata[1]["Table1"]));
        var InvoiceHtml = '<option value="0">Choose Invoice#</option>';
        $.each(Invoicelst, function (index, item) {
            InvoiceHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#slt-invoice').html(InvoiceHtml);

    }
    var GetIvoiceMaildetails = function (billId) {

        var _obj = {
            'BillId': InvoiceId
        };
        var tempList = {};
        $.when(RequestServer("InvoiceListVietnam.aspx/GetInvoicemaildetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetTimeLineList = function (billId) {
        var _obj = {
            'BillId': InvoiceId
        };
        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/GetTimelinelist", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindTimelinelis = function (Timelinelst) {
        $("#bind-list").html('');
        $("#lbl_customer").html(Timelinelst[0]["CustomerName"]);
        $("#lbl_amount").html("$" + parseFloat(Timelinelst[0]["TotamAmount"]).toFixed(2));
        $("#lbl_invodate").html(Timelinelst[0]["Invoicedate"]);
        $("#lbl_dudate").html((Timelinelst[0]["Duedate"] == null ? '-' : moment(Timelinelst[0]["Duedate"]).format('MM/DD/YYYY')));
        $("#invoicename").html(Timelinelst[0]["InvoiceName"]);



        $.each(Timelinelst, function (index, item) {

            Bindrows(item["Action"], item["FirstName"], item["InvoiceName"], item["Duedate"]);
        });


    }
    var Bindrows = function (action, name, invoiceno, date) {

        date = date == null ? '-' : moment(date).format('MM/DD/YYYY');

        if (action == "Payment Completed") {
            $("#bind-list").append("<li class='isc-feed-item'><time class= 'date' datetime ='9-25'> " + date + "</time > <span class='text'>Payment received by Archarina</span>"
                + "<p class='isc-color-p2' style='margin:0px;'>Payment Completed</p></li >");
        }
        else if (action == "Invoice Released") {
            $("#bind-list").append("<li class='isc-feed-item'>"
                + "<time class='date' datetime= '9-23'> " + date + "</time>"
                + "<span class='text'>" + name + " Released Invoice to Customer </span>"
                + "<p class='isc-color-p3' style='margin:0px;'>Invoice Released</p></li >");
        }
        else if (action == "Invoice Created") {
            $("#bind-list").append("<li class='isc-feed-item'>"
                + "<time class='date' datetime = '9-17'> " + date + "</time >"
                + "<span class='text'>Invoice # " + invoiceno + " created by " + name + " </span>"
                + "<p class='isc-color-p3' style='margin:0px;'>Invoice Created</p></li >");
        }
        else if (action == "Payment Completed By Partially") {
            $("#bind-list").append("<li class='isc-feed-item'><time class= 'date' datetime ='9-25'> " + date + "</time > <span class='text'>Payment received by Archarina</span>"
                + "<p class='isc-color-p2' style='margin:0px;'>Payment Completed By Partially</p></li >");
        }

    }
    var BindMailDetails = function (InvoiceDetails) {

        $.each(InvoiceDetails, function (index, item) {

            $("#exist-valuesTo").val(item["Email"]);
            $('#spn-termcode').html(moment(item["Duedate"]).format('DD/MM/YYYY'));
            $('#spn-Invoice').html(item["InvoiceName"]);
            $('#spn-indate').html(item["Invoicedate"]);
            $('#spn-total').html(parseFloat(item["TOTAL"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

            //parseFloat(item["TOTAL"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
            $('#spn_invoice').html(item["InvoiceName"]);
            $('#spn_invicedate').html(item["Invoicedate"]);
            $('#spn_amount').html(item["TOTAL"]);
            $('#spn_InvoiceNo').html(item["InvoiceName"]);
            $("textarea#txt_subject").val(item["SUBJECT"]);
            invoice = item["InvoiceName"];
            invoicedate = item["Invoicedate"];
            total = item["TOTAL"];
            subject = item["SUBJECT"];
            $('#lbl_from').html(item["ClientName"]);
            CustomerName = item["CustomerName"];
            //ClientName
            $('#lbl_to').html(item["CustomerName"]);
            $('#lbl_shipto').html(item["CustomerName"]);
            $('#exist-valuescc').val(item["PrimaryEmailID"]);
        });
    }
    var BindViewDetails = function (Viewlist) {

        $.each(Viewlist, function (index, item) {

            $('#ibl_invoice').html(item["InvoiceNo"]);
            $('#ibl_Indate').html(item["Invoicedate"]);
            $('#ibl_ContainerNO').html(item["ContainerNo"]);
            $('#ibl_SealNO').html(item["SealNo"]);
            $('#ibl_shiper').html(item["ShipperName"]);
            $('#spn_to').html(item["BuyerName"]);
            var d = item["ProcessPacked"];
            if (d == null || d == "") {
                $('#spn_shipto').html(item["ShipperName"]);
            }
            else
                $('#spn_shipto').html(item["ProcessPacked"]);

            $('#ibl_total').html(item["Dueamountt"]);


        });
    }
    var Sendmail = function (maildata) {

        var _obj = {
            'Tomail': $('#exist-valuesTo').val(),
            'Ccail': $('#exist-valuescc').val(),
            'Subject': subject,
            'Body': mailbody,
            'Invoice': invoice,
            'InvoiceDate': invoicedate,
            'Total': total,
            'InvoiceId': InvoiceId,
            'CustomerName': CustomerName,
        };

        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/SendMail", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (response == "1") {
                $.notify("Invoice released to customer!!", { position: "right top", className: "success" });
                // BuildScreen();
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
    var SaveMarkaspaid = function () {
        var _obj = {
            'InvoiceId': InvoiceId,
        };

        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/SaveMarkaspaid", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (response == "1") {
                $.notify("Amount paid successfully!!", { position: "right top", className: "success" });
                ClearMarkASPaidFields();
            }
            else {
                $.notify("Amount paid successfully!!", { position: "right top", className: "success" });
                setTimeout(function () {
                    ClearMarkASPaidFields();
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);



            }
        });
        return tempList;
    };
    var SavePartialPaid = function () {

        var Payableamt = $('#lbl_payamount').text();
        Payableamt = Payableamt.replace('$', '');

        var _obj = {
            'CustomerName': $('#lbl_Custname').text(),
            'Duedate': $('#lbl_duedate').text(),
            'PaymentMode': parseInt($('#slt_paymentmode').val()),
            'refNumber': $('#txt_refnumber').val(),
            'BalanceAmount': parseFloat($('#txt_dueamount').val()),
            'Invoice': $('#lbl_invoiceno').text(),
            'PayableAmount': parseFloat(parseFloat(Payableamt).toFixed(2)),
            'PaidOn': $('#txt_paidon').val(),
            'AmountPaid': parseFloat($("#txt_paidamount").val()),
            'Status': parseInt($('#slt_status').val()),
            'CustomerId': parseInt(CustomerId),
            'InvoiceId': parseInt(InvoiceId),

        }
        var insertObj = {
            'objPartial': _obj
        }

        $.when(RequestServer("invoiceList.aspx/SavePartial", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                ClearMarkASPaidFields();
                $.notify("Partial Payment created successfully!", { position: "right top", className: "success" });
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occured while creating a PartialPayment !!", { position: "right top", className: "error" });
            }
        });

    }
    var BindOrderDetails = function (Orderlst) {

        var html = '';
        var $el = $('#tbl_orderemail');
        $.each(Orderlst, function (index, item) {
            html += '<tr>'
            html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Price"] == null ? '' : item["Price"]) + '"><h5>' + (item["Price"] == null ? '-' : parseFloat(item["Price"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>'
            html += '<td style="text-align:right; title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '' : parseFloat(item["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>'
            html += '</tr>'
        });

        $el.html(html);
    }
    var BindOrderDetail = function (Orderlst) {

        var html = '';
        var $el = $('#tbl-order');
        $.each(Orderlst, function (index, item) {
            html += '<tr>'
            html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Price"] == null ? '' : item["Price"]) + '"><h5>' + (item["Price"] == null ? '-' : parseFloat(item["Price"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>'
            html += '<td style="text-align:right;" title="' + (item["Amount"] == null ? '' : item["Amount"]) + '"><h5>' + (item["Amount"] == null ? '' : parseFloat(item["Amount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>'
            html += '</tr>'
        });


        $el.html(html);
    }

    var BindMarkaspaid = function (Listdata) {

        $.each(Listdata, function (index, item) {
            //var nextDue = moment.utcitem["Duedate").toDate();
            var nextDue = moment.utc(item["Duedate"]).toDate();
            var localDue = moment(nextDue).local().format('MM/DD/YYYY');

            $('#lbl_Custname').html(item["CustomerName"]);
            $('#lbl_duedate').html(localDue);
            //$('#slt_paymentmode').html(item["InvoiceName"]);
            //$('#txt_refnumber').html(item["InvoiceName"]);
            $('#txt_dueamount').val(item["TOTAL"]);
            $('#lbl_invoiceno').html(item["InvoiceName"]);
            $('#lbl_payamount').html("$" + item["TOTAL"]);
            //  $('#txt_paidon').val(item["Invoicedate"]);
            $('#txt_paidamount').val(item["TOTAL"]);
        });
    }
    var BindPartaillst = function (Partiallst) {

        var $el = $("#tbl_Partaillst");
        var html = '';
        if (Partiallst != undefined && Partiallst != null && Partiallst.length > 0) {
            $.each(Partiallst, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["OF_PAID_DATE"]);

                var payableamount = parseFloat(item["OF_INVOICE_AMOUNT"] == null ? 0 : item["OF_INVOICE_AMOUNT"]);
                var amountpaid = parseFloat(item["OF_PAID_AMT"] == null ? 0 : item["OF_PAID_AMT"]);
                var balance = parseFloat(item["OF_BALANCE_AMT"] == null ? 0 : item["OF_BALANCE_AMT"]);

                html += '<tr>';

                html += '<td>';
                html += '<h5  title=' + (item["OF_PAID_DATE"] == null ? '-' : moment(item["OF_PAID_DATE"]).format('MM/DD/YYYY')) + '>' + (item["OF_PAID_DATE"] == null ? '-' : moment(item["OF_PAID_DATE"]).format('MM/DD/YYYY')) + '</h5>';
                html += '</td>';

                html += '<td><h5 style="text-align:right; color:green;" title="' + (payableamount == "" || payableamount == NaN ? '-' : '$' + payableamount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (payableamount == "" || payableamount == NaN ? '-' : '$' + payableamount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';

                html += '<td><h5 style="text-align:right; color:green;" title="' + (amountpaid == "" || amountpaid == NaN ? '-' : '$' + amountpaid.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amountpaid == "" || amountpaid == NaN ? '-' : '$' + amountpaid.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';

                html += '<td><h5 style="text-align:right; color:green;" title="' + (balance == "" || balance == NaN ? '-' : '$' + balance.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (balance == "" || balance == NaN ? '-' : '$' + balance.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                html += '</td>';


                html += '<td> <h5 title="' + (item["Status"] == null || item["Status"] == '' ? "-" : item["Status"]) + '">' + (item["Status"] == null || item["Status"] == '' ? "-" : item["Status"]) + '</h5></td>';

                html += '<td>';
                html += '<h5 title="' + (item["Mode"] == null || item["Mode"] == '' ? '-' : item["Mode"]) + '">' + (item["Mode"] == null || item["Mode"] == '' ? '-' : item["Mode"]) + '</h5>';
                html += '</td>';

                html += '</tr>';
            });
        }
        else {

            html += '<tr><td colspan="6" style="text-align:center;">No data found</td></tr>';
        }
        $el.html(html);
    }

    $("#txt_paidamount").keyup(function () {

        var Totamamount = $("#lbl_payamount").text();
        Totamamount = Totamamount.replace('$', '');
        var Paidamount = $("#txt_paidamount").val().replace(",", "");
        var total = (parseFloat(Totamamount) - (parseFloat(Paidamount)));
        if (total > 0) {
            $("#txt_dueamount").val((Math.round(total * 100) / 100).toFixed(2));
        }

        else {

            if (parseFloat(Paidamount) > parseFloat(Totamamount)) {
                $("#txt_paidamount").val("")
            }
            if (parseFloat(Paidamount) == parseFloat(Totamamount)) {
                $("#txt_dueamount").val(total);
                $("#txt_paidamount").val(Paidamount)
            }
            else {
                $("#txt_dueamount").val($("#lbl_payamount").text());
            }

        }
    });
}

//Click Event
{
    $(document).on('click', '#Btn-close', function () {
        $('#MP_Batch').hide();
        $('#MP_Email').hide();
    });
    $(document).on('click', '#btn-close', function () {
        $('#MP_Batch').hide();
    });
    $(document).on('click', '#Btn_Search', function () {
        BindInvoiceList();
    });
    $(document).on('click', '[data-timeline]', function () {

        InvoiceId = $(this).attr('data-timeline');
        $('#mp_timeline').show();
        var Timelinelst = GetTimeLineList(InvoiceId);
        var Timeline = common.AUF(Timelinelst['Timelinelst']);

        BindTimelinelis(Timeline);

    });
    $(document).on('click', '#btn_close', function () {
        $('#mp_timeline').hide();
    });

    $(document).on('click', '[data-Editinvoice]', function () {

        var invoiceId = $(this).attr('data-Editinvoice');
        var billstatus = $(this).attr('data-billstatus');
        //var masterinvoice = $(this).attr('data-masterinvoice');

        if (billstatus == 5) {

            $.notify("User should not be able to edit paid invoices.", { position: "right top", className: "error" });
        }
        else if (billstatus == 2) {
            $.notify("You can't pay right now since the invoice has already been paid.", { position: "right top", className: "error" });
        }
        else {
            window.location.href = "CreatePurchaseOrder.aspx?Invoiceid=" + invoiceId + "";
        }



    });

    $(document).on('click', '[data-emailid]', function () {
        $('#MP_Email').show();
        $('#exist-valuesTo').val('');
        $('#exist-valuescc').val('');
        InvoiceId = $(this).attr('data-emailid');

        var Maildetails = GetIvoiceMaildetails(InvoiceId)
        var Maildetail = common.AUF(Maildetails['Invoice']);
        var Orderlist = common.AUF(Maildetails['OrderList']);
        BindMailDetails(Maildetail);
        BindOrderDetails(Orderlist);

    });
    $(document).on('click', '[data-View]', function () {

        $('#MP_Batch').show();
        InvoiceId = $(this).attr('data-View');
        var Maildetails = GetIvoiceMaildetails(InvoiceId)
        var Maildetail = common.AUF(Maildetails['Invoice']);
        var Orderlist = common.AUF(Maildetails['OrderList']);
        BindViewDetails(Maildetail);
        BindOrderDetail(Orderlist);
    });
    $(document).on('click', '#btn_sendemail', function () {

        var x = document.getElementById("editor").textContent;
        mailbody = x;
        var Tomail = $('#exist-valuesTo').val();
        var Ccail = $('#exist-valuescc').val();
        var Subject = $("#txt_subject").val();
        if ($('#exist-valuesTo').val() != '') {
            var obj = {
                'Tomail': Tomail,
                'Ccmail': Ccail,
                'Subject': Subject,
                'Body': mailbody,
            }
            maildata.push(obj);
            Sendmail(maildata);
        }
        else {
            $.notify("Please enter emailid.", { position: "right top", className: "error" });
        }
    });
    $(document).on('click', '[data-markaspaid]', function () {

        var Status = $(this).attr('data-billstatus');
        if (Status != 2) {
            $('#mp_payment').show();
            InvoiceId = $(this).attr('data-markaspaid');
            CustomerId = $(this).attr('data-customerid');
            var Maildetails = GetIvoiceMaildetails(InvoiceId)
            var Maildetail = common.AUF(Maildetails['Invoice']);
            var Partiallst = common.AUF(Maildetails['Partial']);
            BindMarkaspaid(Maildetail);
            BindPartaillst(Partiallst);
        }
        else {

            $.notify("You can use payment is already done for this particular invoice.", { position: "right top", className: "error" })
        }
    });

    $(document).on('click', '#btn-maraspaid', function () {

        if (ValidateMarkAsPaid() && $("span[error-active='true']").length == 0) {
            if ($("#slt_status").val() == 1) {
                SavePartialPaid();
            }
            else {
                SaveMarkaspaid();
            }

        }

    });
    $(document).on('click', '#btn_reset', function () {
        $("#slt-customer").val("0").change();
        $("#slt-invoice").val("0").change();
        $("#slt-status").val("6").change();
        BindInvoiceList();
    });
    $(document).on('click', '#btncancel,#btnclose', function () {


        $('#mp_payment').hide();
        ClearMarkASPaidFields();
    });
    var ValidateMarkAsPaid = function () {

        var isValid = true;
        var paymentMode = $.trim($('#slt_paymentmode').val());
        var Status = $('#slt_status').val();
        var amountpaid = $('#txt_paidamount').val();
        var paidOn = $('#txt_paidon').val();
        var amountdue = $('#txt_dueamount').val();
        //
        if (amountpaid == "0" || amountpaid == "") {
            isValid = false;
            $.notify("Amount Paid should not be empty.", { position: "right top", className: "error" });
        }
        if (paymentMode == "0" || paymentMode == null) {
            isValid = false;
            $.notify("Payment Mode should not be empty.", { position: "right top", className: "error" });
        }
        if (Status == "0" || Status == null) {
            isValid = false;
            $.notify("Status  should not be empty.", { position: "right top", className: "error" });
        }
        //if (refNo == "") {
        //    isValid = false;
        //    $.notify("Reference Number should not be empty.", { position: "right top", className: "error" });
        //}
        if (paidOn == "") {
            isValid = false;
            $.notify("Paid On should not be empty.", { position: "right top", className: "error" })
        }

        if (Status == 2) {
            if (amountpaid == amountdue) {

            }
            else {
                isValid = false;
                $.notify("Paid amount and  Due amount should be same.", { position: "right top", className: "error" })
            }
        }

        //if (paidAmnt == "") {
        //    isValid = false;
        //    $.notify("Amount Paid should not be empty.", { position: "right top", className: "error" });
        //}

        //if (docList.length == 0) {
        //    isValid = false;
        //    $.notify("Attachment should not be empty.", { position: "right top", className: "error" });
        //}

        return isValid;

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
    var saveFiles = function (fileContainer) {
        var response = '';

        if (fileContainer.length > 0) {
            fileResponse = [];
            var data = new FormData();
            data.append("Folder", 0);
            data.append("key", fileContainer[0]);
            $.ajax({
                async: false,
                type: "POST",
                url: "BillPaidDocuments.ashx",
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
    var BindBillDocument = function () {
        var html = '';
        var $el = $('#tbl-PaidBill-Attachments');

        html += '<tr style="cursor: pointer;">';
        html += '<td style="width: 10%; text-align: center;"  data-fileName="' + fileResponse['FileDisplayName'] + '">';
        html += '<i class="fa fa-file-o isc-pdf-red"  data-Open-Paid-File="' + (fileResponse["ModifiedFileName"] == null ? '' : fileResponse["ModifiedFileName"]) + '"></i>';
        html += '</td>';
        html += '<td style="width: 45%;">';
        html += '<h4 data-file-PhyName="' + fileResponse['ModifiedFileName'] + '" data-phy-Location="' + fileResponse['PhysicalLocation'] + '" title="' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + '">' + (fileResponse["FileDisplayName"] == null ? '-' : fileResponse["FileDisplayName"]) + ' </h4>';
        html += '</td>';
        html += '<td style="width: 10%; text-align: center;">';
        html += '<i title="Remove" style="cursor:pointer;" data-Delete="true" data-file-Size="' + fileContainer[0]["size"] + '" data-extension="' + fileContainer[0]["type"] + '" class="fa fa-times-circle pad-lft-min isc-act-clr"></i>';
        html += '</td>';
        html += '</tr>';

        $el.append(html);
    }
    var GetRecurringdetails = function () {

        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/GetInvoicrecurringdetails")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var ClearMarkASPaidFields = function () {
        $('#slt_paymentmode').val('0');
        $('#slt_paymentmode').select2();
        $('#txt_paidon').val('');
        $('#slt_status').val('0');
        $('#slt_status').select2();
        $('#tbl-PaidBill-Attachments').html('');
        $('#browse-Documents').val('');
        fileResponse = [];
        fileContainer = [];
        $("span.validation-message").attr('error-active', false);
        $("span.validation-message").hide();

    }
    $(document).on('change', '#browse-Documents', function () {
        var Files = $(this).prop("files");
        fileContainer = [];
        var type = Files[0]["type"];
        const size = (Files[0]["size"] / 1024 / 1024).toFixed(2);
        fileContainer.push(Files[0])
        fileSize = size;
        billFileID = 0;

    });

    $(document).on('click', '#add-Documents', function () {

        saveFiles(fileContainer);
        BindBillDocument();
        $('#browse-Documents').val('');
        fileResponse = [];
        fileContainer = [];
    });

    // 
    $(document).on('click', '[data-SavePdf]', function () {
        InvoiceId = $(this).attr('data-SavePdf');
        $ = jQuery;
        var Maildetails = [];
        Maildetails = GetIvoiceMaildetails(InvoiceId)
        var Invoice = common.AUF(Maildetails['Invoice']);
        var Product = common.AUF(Maildetails['OrderList']);
        BindPdfDocument(Product, Invoice);

        make_product_sheet();
    });

    $ = jQuery;

    $("#generate_pdf_btn").click(function () {

    });
    var BindPdfDocument = function (Bindlist, Invoice) {
        $("#tbl-body").empty();

        $("#spn_Phone").html(Invoice[0]["ContactNumber"])
        $("#spn_Mail").html(Invoice[0]["Email"])
        $("#spn_address").html(Invoice[0]["BillingAddress"])
        $("#spn_city").html(Invoice[0]["City"])
        $("#spn_state").html(Invoice[0]["State"])
        $("#spn_country").html("")
        $("#spn_Zipcode").html(Invoice[0]["Zip"])

        $("#cspn_city").html(Invoice[0]["City"])
        $("#cspn_state").html(Invoice[0]["State"])
        $("#cspn_country").html("")
        $("#cspn_Zipcode").html(Invoice[0]["Zip"])

        $("#spn_client").html(Invoice[0]["ClientName"])
        $("#spn_clientaddress").html(Invoice[0]["PrimaryEmailID"])
        $("#spn_invoiceno").html(Invoice[0]["InvoiceName"])
        $("#spn_date").html(moment(Invoice[0]["Duedate"]).format('MM/DD/YYYY'))
        $("#span_total").html(Invoice[0]["TOTAL"])
        $("#spn_suptotal").html(parseFloat(Invoice[0]["Subtotal"].toFixed(2)))
        $("#spn_tax").html(Invoice[0]["Tax"])
        $("#spn_intotal").html(Invoice[0]["TOTAL"])
        $("#spn_dueamount").html(Invoice[0]["TOTAL"])
        $.each(Bindlist, function (index, item) {
            $("#tbl-body").append("<tr>"
                + "<td style='font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px;' width='34%' height='32'> " + (item["Description"] == null || item["Description"] == '' ? '-' : item["Description"]) + " <br/> <span style='font-weight: 500; color: #9e9e9e;'></span></td>"
                + "<td style='font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px;' width='26%' align='center'>$" + parseFloat(item["Price"].toFixed(2)) + "</td>"
                + "<td style='font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; 'width='25%' align='center'>" + item["quantity"] + "</td>"
                + "<td style='font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; ' width='15%' align='center'>$" + parseFloat(item["Amount"]).toFixed(2) + "</td>"
                + "</tr>");
        });
    }

    function make_product_sheet() {
        $("#product_sheet").show();
        console.log("#generate_pdf_btn clicked");
        var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML(document.getElementById("product_sheet"), function () {

            ps_filename = "Generated-invoice-sheet";
            pdf.save(ps_filename + '.pdf');
        });
        $("#product_sheet").hide();
    }

    function saveDiv(divId, title) {
        var doc = new jsPDF();
        doc.fromHTML(`<html><head><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
        doc.save('div.pdf');
    }

    var specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '.no-export': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true;
        }
    };

    var BindRrecurringList = function (recurringList) {

        var $el = $("#tblbody-recurring");
        var html = '';
        if (recurringList != undefined && recurringList != null && recurringList.length > 0) {

            var converted;

            $.each(recurringList, function (index, item) {

                var result = new Date(item["RecurringStartDate"]);
                var dateformat = moment(result).format('DD-MM-YYYY');
                var Adddays = 0;
                if (item["Frequency"] == "Weekly") {
                    Adddays = 7;
                    var date = new Date(item["RecurringStartDate"]);
                    date.setDate(date.getDate() + Adddays);

                }
                else if (item["Frequency"] == "Monthly") {

                    converted = moment(dateformat, "DD-MM-YYYY").add(1, 'months').format('DD/MM/YYYY');
                }
                else if (item["Frequency"] == "Quarterly") {
                    Adddays = 91;
                }
                else if (item["Frequency"] == "Halfearly") {
                    Adddays = 182
                }
                else if (item["Frequency"] == "Annual") {
                    Adddays = 365;
                }
                if (item["RecurringLastdate"] != null) {
                    if (item["Frequency"] == "Monthly") {
                        if (converted != undefined) {
                            var d = new Date(converted.split("/").reverse().join("-"));
                            var dd = d.getDate();
                            var mm = d.getMonth() + 1;
                            var yy = d.getFullYear();
                            var date = mm + "/" + dd + "/" + yy;
                        }
                        else {
                            date = moment(date).format('MM/DD/YYYY');
                        }
                    }
                    else {
                        date = moment(date).format('MM/DD/YYYY');
                    }
                }
                else {
                    var date = moment(item["RecurringStartDate"]).format('MM/DD/YYYY');
                }

                html += '<tr>';
                html += '<td> <h5 title="' + (item["CustomerName"] == null || item["CustomerName"] == '' ? "-" : item["CustomerName"]) + '">' + (item["CustomerName"] == null || item["CustomerName"] == '' ? "-" : item["CustomerName"]) + '</h5></td>';

                html += '<td>';
                html += '<h5 title="' + (item["Frequency"] == null || item["Frequency"] == '' ? '-' : item["Frequency"]) + '">' + (item["Frequency"] == null || item["Frequency"] == '' ? '-' : item["Frequency"]) + '</h5>';
                html += '</td>';

                html += '<td>';
                html += '<h5  title=' + (item["RecurringStartDate"] == null ? '-' : moment(item["RecurringStartDate"]).format('MM/DD/YYYY')) + '>' + (item["RecurringStartDate"] == null ? '-' : moment(item["RecurringStartDate"]).format('MM/DD/YYYY')) + '</h5>';
                html += '</td>';

                html += '<td>';
                html += '<h5  title=' + (item["RecurrinEendtDate"] == null ? '-' : moment(item["RecurrinEendtDate"]).format('MM/DD/YYYY')) + '>' + (item["RecurrinEendtDate"] == null ? '-' : moment(item["RecurrinEendtDate"]).format('MM/DD/YYYY')) + '</h5>';
                html += '</td>';

                html += '<td>';
                html += '<h5  title=' + (item["RecurringLastdate"] == null ? '-' : moment(item["RecurringLastdate"]).format('MM/DD/YYYY')) + '>' + (item["RecurringLastdate"] == null ? '-' : moment(item["RecurringLastdate"]).format('MM/DD/YYYY')) + '</h5>';
                html += '</td>';

                html += '<td>';
                html += '<h5  title=' + (date == null ? '-' : date) + '>' + (date == null ? '-' : date) + '</h5>';
                html += '</td>';

                html += '<td style="text-align:center; overflow: visible;">';
                //html += '<a href="createInvoiceAR.aspx?Invoiceid=' + (item["InvoiceId"] == null ? '' : item["InvoiceId"]) + '" class="isc-action-badge-td-s1 pad-lft-5" title="Edit"><i class="-pencil-square-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" href="#" data-toggle="modal" data-Stop="' + item["InvoiceId"] + '" data-Startdate="' + item["RecurringStartDate"] + '"  data-feruquency="' + item["Frequency"] + '"title="Stop"><i class="fa fa-stop-circle"></i></a>';
                html += '<div class="screen-row isc-inline-pop-action-s1  pad-lft-min" style="display:inline-block;">';
                html += '<a class="isc-action-badge-td-s1" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="More Option">';
                html += '<i class="fa fa-ellipsis-v "></i></a >';
                html += '<ul class="dropdown-menu-entity">';
                html += '<li><a href="#" data-View="' + item["InvoiceId"] + '" data-toggle="modal" class="isc-action-badge-td-s1 pad-lft-5" title="View">View</a></li>';
                html += '<li><a href="#" data-Edit="' + item["InvoiceId"] + '" data-Startdate="' + item["RecurringStartDate"] + '" data-Enddate="' + item["RecurrinEendtDate"] + '" data-Frequency="' + item["Frequency"] + '" class="isc-action-badge-td-s1 pad-lft-5 isc-panel-settings" title="Edit Recurrence">Edit Recurrence</a></li></ul></div >';
                html += '</td>';
                html += '</tr>';


            });
        }
        else {

            html += '<tr><td colspan="6" style="text-align:center;">No data found</td></tr>';
        }

        $el.html(html);

    }

    var Stoprecurring = function () {
        var obj = {
            'Invoiceid': parseInt(InvoiceId)
        }

        $.when(RequestServer("InvoiceList.aspx/Stoprecurring", obj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Recurring stopped successfully!", { position: "right top", className: "success" });
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occured while creating a Invoice !!", { position: "right top", className: "error" });
            }
        });
    }
    var EditRecurring = function () {

        var obj = {
            'Invoiceid': parseInt(InvoiceId),
            'Recurringstartdate': $('#txt-startdate').val(),
            'Recurringenddate': $('#txt-enddate').val(),
            'Frequency': $('#slt-ferequency').find(":selected").text()
        }

        $.when(RequestServer("InvoiceList.aspx/Editrecurring", obj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Recurring updated successfully!", { position: "right top", className: "success" });
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                $.notify("Server error occured while creating a Invoice !!", { position: "right top", className: "error" });
            }
        });
    }
    $(document).on('click', '#tab-recurring', function () {

        var Invoicerecurring = GetRecurringdetails();
        var Recurringlst = common.AUF(Invoicerecurring['Recurring']);

        BindRrecurringList(Recurringlst);
    });
    $(document).on('click', '[data-Stop]', function () {


        InvoiceId = $(this).attr('data-Stop');
        var Startdate = $(this).attr('data-Startdate');
        var Frequency = $(this).attr('data-feruquency');
        var Adddays = 0;
        if (Frequency == "Weekly") {
            Adddays = 7;
        }
        else if (Frequency == "Monthly") {
            Adddays = 30;
        }
        else if (Frequency == "Quarterly") {
            Adddays = 91;
        }
        else if (Frequency == "Halfearly") {
            Adddays = 182
        }
        else if (Frequency == "Annual") {
            Adddays = 365;
        }
        var result = new Date(Startdate);
        result.setDate(result.getDate() + Adddays);
        var date = moment(result).format('MM/DD/YYYY');
        $("#spn-redate").html(date);
        $('#confirm').show();
    });
    $(document).on('click', '[data-Updateinvoice]', function () {

        var invoiceId = $(this).attr('data-Updateinvoice');
        var billstatus = $(this).attr('data-billstatus');
        //var masterinvoice = $(this).attr('data-masterinvoice');

        if (billstatus == 5) {

            $.notify("User should not be able to edit paid invoices.", { position: "right top", className: "error" });
        }
        else if (billstatus == 2) {
            $.notify("You can't pay right now since the invoice has already been paid.", { position: "right top", className: "error" });
        }
        //else if (masterinvoice != "null")
        //{
        //    $.notify("You can't edit child recurring invoice.", { position: "right top", className: "error" });
        //}
        else {
            window.location.href = "ViewPurchase.aspx?Invoiceid=" + invoiceId + "";
        }



    });
    $(document).on('click', '#btn-cancel,#btn-close,#btn-editclose,#btn-editcancel', function () {
        $('#confirm').hide();
        $("#mp_editrecurring").hide();
    });
    $(document).on('click', '#btn-stop', function () {

        Stoprecurring();
    });

    $(document).on('click', '#pay-offline', function () {
        $("#btn-maraspaid").show();
    });

    $(document).on('click', '#btn-history', function () {
        $("#btn-maraspaid").hide();
    });

    $(document).on('click', '[data-Edit]', function () {

        InvoiceId = $(this).attr('data-Edit');
        var Startdate = $(this).attr('data-Startdate');
        var Enddate = $(this).attr('data-Enddate');
        var Frequency = $(this).attr('data-Frequency');

        var stdate = moment.utc(Startdate).toDate();
        var Start_date = moment(stdate).local().format('YYYY-MM-DD');


        $("#slt-ferequency option:contains(" + Frequency + ")").attr('selected', 'selected');
        $('#slt-ferequency').select2();

        var enddate = moment.utc(Enddate).toDate();
        var End_date = moment(enddate).local().format('YYYY-MM-DD');

        $('#txt-startdate').val(Start_date);
        $('#txt-enddate').val(End_date);

        $("#mp_editrecurring").show();


    });

    $(document).on('click', '#btn-edit', function () {

        var nextDue = moment.utc($('#txt-startdate').val()).toDate();
        var startDateStr = moment(nextDue).local().format('MM/DD/YYYY');

        var startDateArr = startDateStr.split("/");
        var startDate = new Date(startDateArr[2], startDateArr[0], startDateArr[1]);

        var nextDue = moment.utc($('#txt-enddate').val()).toDate();
        var endDateStr = moment(nextDue).local().format('MM/DD/YYYY');


        var endDateArr = endDateStr.split("/");
        var endDate = new Date(endDateArr[2], endDateArr[0], endDateArr[1]);



        if (startDate > endDate) {

            $.notify("End date cannot be less than start date / last invoice date.", { position: "right top", className: "error" });
            return false;
        }
        else {
            EditRecurring();
        }
    });

}

