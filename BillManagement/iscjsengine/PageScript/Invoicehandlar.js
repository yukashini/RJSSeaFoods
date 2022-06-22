
//Global
{
    var strExcelData = [];
    var excelSaveData = [];
    var distinctlst = [];
    var Invoiceliastdata = [];

}
//Data
$(document).ready(function () {
    $loading.show();
    setTimeout(function () {
        Invoiceliastdata = GetInvoiceData();
        $loading.hide();
    }, 0);
});
{
    var ProcessExcelData = function () {

        var importTemplateFiles = $('#bill-Invoice').prop("files");
        var fileName = importTemplateFiles[0]['name'];
        var type = importTemplateFiles[0]["type"];

        if (importTemplateFiles.length > 0) {
            if (type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                $('#file-Name').html(fileName);
                $('#file-Name').prop('title', fileName);
                var data = new FormData();
                data.append("Folder", 0);
                data.append("key", importTemplateFiles[0]);
                {
                    $.ajax({
                        type: "POST",
                        url: "InvoiceHandler.ashx",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            if (result != '' && result != null && result.length != 0) {
                                $('#bill-Invoice').val("");
                                strExcelData = result;
                                strExcelData = $.parseJSON(strExcelData[""]);
                                BindExcelData();
                               // $('#mp_bill-view').show();
                            }
                            else {
                                $('#bill-Invoice').val("");

                            }
                        },
                        error: function (e) {
                            $('#bill-Invoice').val("");
                            var error = e;
                        },
                        xhr: function (evt) {
                            $('#bill-Invoice').val("");
                            var filexhr = $.ajaxSettings.xhr();
                            return filexhr;
                        }
                    }).done(function (r) {
                        $('#bill-Invoice').val("");
                    });
                }

            }
            else {

            }
        }
        return strExcelData;
    }


    var SaveExcelData = function (exelList, distinctlst) {
        var _obj = {
            'invoiceLsts': exelList,
        };
       
        var tempList = {};
        $.when(RequestServer("ImportInvoice.aspx/InsertExcelData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                
                SaveDistinctfn();
                $('#GL-file').val('');
                strExcelData = [];
                excelSaveData = [];
                $('#file-Name').html('');
                $('#tbl-excel-Data').html('')
               // BuildScreen();
            }
            else {
                $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var SaveDistinctData = function (distinctlst) {
        
        var _obj = {
            'invoiceDistinctLsts': distinctlst,
        };

        var tempList = {};
        $.when(RequestServer("ImportInvoice.aspx/InsertExcelDistinctData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                distinctlst = [];
                $.notify("Invoices imported successfully!!", { position: "right top", className: "success" });
                setTimeout(function () {
                    window.location.href = 'InvoiceList.aspx';
                }, 2000);
            }
            else {
                distinctlst = [];
                $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}
//Events
{
    $(document).on('change', '#bill-Invoice', function (e) {
        debugger;
        e.preventDefault();
        ProcessExcelData();

    });

    $(document).on('click', '#btn-Save-ExcelData', function () {

        if (excelSaveData.length > 0) {
            SaveExcelData(excelSaveData, distinctlst);
        }
        else {
            $.notify("Please import valid file!!", { position: "right top", className: "error" });
        }
    });

    $('a#Download-lst').attr({
        target: '_blank',
        href: 'https://arcbill-qa.archarina.com/images/ArcBillInvoice.xlsx'
    });
}
//DOM
{
    var BindExcelData = function () {
       
        isValidData = true;
        excelSaveData = [];
        var excelSaveDatalst = [];
        var html = '';
        var uniqueSites = [];
        var $el = $('#tbl-invoice');
        var Invoiceliastdata = [];
        Invoiceliastdata = GetInvoiceData();
        Invoiceliastdata = common.AUF($.parseJSON(Invoiceliastdata[0]["Table"]));
        if (strExcelData.length > 0) {
         
          
            $.each(strExcelData, function (index, item) {
                
                if (item["CustomerName"] != "" && item["InvoiceID"] != "" && item["TermCode"] != "" && item["OrderId"] != "" && item["InvoiceDate"] !== "" && item["Amount"]!="") {
                    var duplicateData = [];
                    var Validation = "Customer does not exist";
                    //if (excelSaveData.length > 0) {
                    //var index;

                    //Invoiceliastdata.some(function (entry, i) {
                    //   
                    //    if (entry.Value1 == item["CustomerName"]) {
                    //        index = i;
                    //       
                    //        return true;
                    //    }
                    //});


                    $.each(Invoiceliastdata, function (index, items) {
                        //  duplicateData = GetmatchedRecord(Invoiceliastdata, 'Value1', item["CustomerName"]);
                        
                        var Customername = items["Value1"];
                        var customerid = items["KeyListID"];
                        var MatchCustomerid = item["CustomerName"];
                        var intyu = parseFloat(item["Amount"]).toFixed(2);
                       
                        if (Customername === MatchCustomerid) {
                            Validation = "Match";
                           
                            var obj = {

                                'Lineitemnno': (item["LineItemno"] == null || '' ? 0 : parseInt(item["LineItemno"])),
                                'InvID': (item["InvoiceID"] == null || '' ? '' : item["InvoiceID"]),
                                'OrderId': (item["OrderId"] == null ? '' : item["OrderId"]),
                                'Amount': (parseFloat(item["Amount"]).toFixed(2) == null ? '' : parseFloat(item["Amount"]).toFixed(2)),
                                'Discount': (parseFloat(item["Discount"]).toFixed(2) == "NaN" ? 0 : parseFloat(item["Discount"]).toFixed(2)),
                                'ClientId': (item["ClientId"] == null ? '' : item["ClientId"]),
                                'CustomerID': customerid,
                                'Description': (item["Description"] == null ? '' : item["Description"]),
                                'InvoiceDate': (moment(item["InvoiceDate"]).format('DD/MM/YYYY') == null ? '' : moment(item["InvoiceDate"]).format('DD/MM/YYYY')),
                                'TermCode': (item["TermCode"] == null ? '' : item["TermCode"]),
                                'CreatedBy': (item["CreatedBy"] == null ? '' : item["CreatedBy"]),
                                //CreatedBy
                            }
                            excelSaveData.push(obj);
                            
                        }
                    });
                   
                    var discount = parseFloat(item["Discount"]).toFixed(2)
                    if (discount == "NaN") {
                        discount = 0.00;
                    }
                    html += '<tr>'
                    html += '<td title="' + (item["CustomerName"] == null ? '' : item["CustomerName"]) + '"><h5>' + (item["CustomerName"] == null ? '-' : item["CustomerName"]) + '</h5></td>'
                    html += '<td title="' + (item["InvoiceID"] == null ? '' : item["InvoiceID"]) + '"><h5>' + (item["InvoiceID"] == null ? '-' : item["InvoiceID"]) + '</h5></td>'
                    html += '<td title="' + (moment(item["InvoiceDate"]).format('DD/MM/YYYY') ? '' : moment(item["InvoiceDate"]).format('DD/MM/YYYY')) + '"><h5>' + (moment(item["InvoiceDate"]).format('DD/MM/YYYY') == null ? '-' : moment(item["InvoiceDate"]).format('DD/MM/YYYY')) + '</h5></td>'
                    html += '<td title="' + (item["TermCode"] == null ? '' : item["TermCode"]) + '"><h5>' + (item["TermCode"] == null ? '' : item["TermCode"]) + '</h5></td>'
                    html += '<td title="' + (item["Description"] == null ? '' : item["Description"]) + '"><h5>' + (item["Description"] == null ? '' : item["Description"]) + '</h5></td>'
                    html += '<td title="' + (item["LineItemno"] == null ? '' : item["LineItemno"]) + '"><h5>' + (item["LineItemno"] == null ? '' : item["LineItemno"]) + '</h5></td>'
                    html += '<td style="text-align:center" title="' + (item["OrderId"] == null ? '' : item["OrderId"]) + '"><h5>' + (item["OrderId"] == null ? '' : item["OrderId"]) + '</h5></td>'
                    html += '<td style="text-align:right" title="' + (parseFloat(item["Amount"]).toFixed(2) == null ? '' : parseFloat(item["Amount"]).toFixed(2)) + '"><h5>' + (parseFloat(item["Amount"]).toFixed(2) == null ? '' : parseFloat(item["Amount"]).toFixed(2)) + '</h5></td>'
                    html += '<td style="text-align:right" title="' + discount + '"><h5>' + discount + '</h5></td>'
                    html += '<td style="text-align:center" title="' + (Validation == null ? '' : Validation) + '"><h5>' + (Validation == null ? '' : Validation) + '</h5></td>'

                    //if (Validation == '-') {
                    //    html += '<td title="' + Validation + '"> <h5 > ' + validationMessage + ' </h5></td>'
                    //}
                    //else {
                    //    html += '<td title="' + validationMessage + '"> <h5 > ' + validationMessage + ' </h5></td>'
                    //    //  html += '<td title="' + validationMessage + '"> <h5 style="color:red"> ' + validationMessage + ' </h5></td>'
                    //}
                    //html += '<td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" remove-Excel-Row=' + (item["IdentityID"] == null ? '0' : item["IdentityID"]) + '><i class="fa fa-trash-o"></i></a></td>'
                    html += '</tr>'
                }

            })
        }
        else {
            html += '<tr><td colspan="4" style="text-align: center;">No Data Found</td></tr>';
        }
        //const key = 'InvID';
        //const arrayUniqueByKey = [...new Map(excelSaveData.map(item =>
        //    [item[key], item])).values()];
        //var Sortarray = [];
        //Sortarray = ObjSorter(excelSaveData, "InvID", '123');
        //debugger;
        //var arrayUniqueByKey = GetDistinctArrayobj(Sortarray, 'InvID');
       

        //$.each(arrayUniqueByKey, function (index, item) {
        //    if ((item["CustomerID"] != "" || item["InvID"] != "") && item["TermCode"] != "") {
        //        var obj = {
        //            'CustomerID': (item["CustomerID"] == null || '' ? 0 : parseInt(item["CustomerID"])),
        //            'InvID': (item["InvID"] == null || '' ? '' : item["InvID"]),
        //            'Description': (item["Description"] == null ? '' : item["Description"]),
        //            'InvoiceDate': (item["InvoiceDate"] == null ? '' : item["InvoiceDate"]),
        //            'TermCode': (item["TermCode"] == null ? '' : item["TermCode"]),
        //            'CreatedBy': (item["CreatedBy"] == null ? '' : item["CreatedBy"]),
        //            'ClientId': (item["ClientId"] == null ? '' : item["ClientId"]),
        //            'TotalAmount': (parseFloat(item["Amount"]).toFixed(2) == null ? '' : parseFloat(item["Amount"]).toFixed(2)),
        //        }
               
        //        distinctlst.push(obj);
        //    }
        //});


        $el.html(html);
    }

    var SaveDistinctfn = function () {
        var Sortarray = [];
        Sortarray = ObjSorter(excelSaveData, "InvID", '123');
        

        //var result = [];
        //Sortarray.reduce(function (res, value) {
        //    if (!res[value.InvID]) {
        //        res[value.InvID] = {
        //            Amount: 0,
        //            InvID: value.InvID
        //        };
        //        result.push(res[value.InvID])
        //    }
        //    res[value.InvID].Amount += value.Amount
        //    return res;
        //}, {});


        debugger;
        if (Sortarray.length != 1) {
            var arrayUniqueByKey = GetDistinctArrayobj(Sortarray, 'InvID');
        }
        else {
            arrayUniqueByKey = Sortarray;
        }
        


        $.each(arrayUniqueByKey, function (index, item) {
            if ((item["CustomerID"] != "" || item["InvID"] != "") && item["TermCode"] != "") {
                var obj = {
                    'CustomerID': (item["CustomerID"] == null || '' ? 0 : parseInt(item["CustomerID"])),
                    'InvID': (item["InvID"] == null || '' ? '' : item["InvID"]),
                    'Description': (item["Description"] == null ? '' : item["Description"]),
                    'InvoiceDate': (item["InvoiceDate"] == null ? '' : item["InvoiceDate"]),
                    'TermCode': (item["TermCode"] == null ? '' : item["TermCode"]),
                    'CreatedBy': (item["CreatedBy"] == null ? '' : item["CreatedBy"]),
                    'ClientId': (item["ClientId"] == null ? '' : item["ClientId"]),
                    'Amount': (parseFloat(item["Amount"]).toFixed(2) == null ? '' : parseFloat(item["Amount"]).toFixed(2)),
                }

                distinctlst.push(obj);
            }
        });


        SaveDistinctData(distinctlst);
    }

    var GetInvoiceData = function () {
        var tempList = {};
        $.when(RequestServer("InvoiceList.aspx/GetInvoiceData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}


var GetDistinctArrayobj = function (lookupArray, AssociatePro) {
    debugger;
    var unique = {};
    var distinct = [];
    var PreviousInvoice = '';
    var amount = 0;
    var AmountList = [];
    var currenloop = 0;

    for (var i = 0; i < lookupArray.length; i++) {

        if (PreviousInvoice == '')
            PreviousInvoice = lookupArray[i][AssociatePro];

        if (PreviousInvoice == lookupArray[i][AssociatePro]) {
            amount += parseFloat(lookupArray[i]["Amount"]);
        }
        else {
            AmountList.push(amount);
            amount = 0;
            PreviousInvoice = '';

            if (i == lookupArray.length - 1) {
                AmountList.push(parseFloat(lookupArray[i]["Amount"]));
                break;
            }
          
            
        }
    }
    
    for (var i in lookupArray) {
        var _obj = lookupArray[i];
        if (typeof (unique[_obj[AssociatePro]]) == "undefined") {
            distinct.push(_obj);
            _obj["Amount"] = AmountList[currenloop];
        }
        currenloop++;
        unique[_obj[AssociatePro]] = 0;
    }
    for (var i = 0; i < distinct.length; i++) {
        distinct[i]["Amount"] = AmountList[i];
    }
    return distinct;
}