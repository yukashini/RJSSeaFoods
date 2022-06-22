//
{
    var strExcelData = [];
    var excelSaveData = [];
    var deleteLabelID = 0;
    var Invoiceliastdata = [];
}
//Load && Events
{
    $(document).ready(function () {
       
        $loading.show();
        BindLabelMalaysiaList();
        Buyerlistdata = GetInvoiceData();
        BindKPI(Buyerlistdata);
        $loading.hide();
    });
}
//
{
    var BindLabelMalaysiaList = function () {

        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_MalaysiaLabel').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "LabelMalaysia.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['MalaysiaLabelList']);
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
            "text- align": 'center',
            'bLengthChange': false,
            "language": {
                "emptyTable": '<span class="no-data-message">No Data Found</span>'
            },
            'aoColumns': [

                {
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["BuyerName"] == null || data["BuyerName"] == '' ? '-' : data["BuyerName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["CustomerAddress"] == null || data["CustomerAddress"] == '' ? '-' : data["CustomerAddress"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '35%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ProductName"] == null || data["ProductName"] == '' ? '-' : data["ProductName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '7%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 style="text-align:center;" >' + (data["ProductionCode"] == null || data["ProductionCode"] == '' ? '-' : data["ProductionCode"]) + '</h5>';
                        return html;
                    }
                }, {
                    "width": '7%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 style="text-align:center;" >' + (data["ApprovalNo"] == null || data["ApprovalNo"] == '' ? '-' : data["ApprovalNo"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '7%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                       
                        var html = '';
                        html += '<div style="text-align: center;">';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 btn_View" title="View" id="btn_View"  href="ViewLabelMalaysia.aspx?LabelID=' + (data["LabelID"] == null ? '' : data["LabelID"]) + '"><i class="fa fa-eye"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  href="AddMalaysia.aspx?LabelID=' + (data["LabelID"] == null ? '' : data["LabelID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Label=' + (data["LabelID"] == null ? '' : data["LabelID"]) + '><i class="fa fa-trash-o"></i></a>';
                        html += '</div>';
                        return html;

                        html += '</div>';
                        return html;
                    }
                },


            ],
            "drawCallback": function (settings) {

            },

            "fnDrawCallback": function () {
                $('#tbl_Invoicelist tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
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
        obj.BuyerName = $('#txt-BuyerName').val();
        obj.Liners = $('#txt-liners').val();
        obj.taxid = $('#txt-taxid').val();

        var _obj = {};
        _obj = { "list": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {

        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "BuyerName " + direction;
                break;
            case 1:
                orderBy = "CustomerAddress " + direction;
                break;
            case 2:
                orderBy = "ProductName " + direction;
                break;
            case 3:
                orderBy = "ProductionCode " + direction;
                break;
            case 4:
                orderBy = "ApprovalNo " + direction;
                break;
        }
        return orderBy;
    }
}
//
{
    var SaveExcelData = function (exelList) {

        var _obj = {
            'customerlists': exelList,
        };

        var tempList = {};
        $.when(RequestServer("CustomerList.aspx/InsertCustomerExcelData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

            if (parseInt(response) > 0) {
                $('#browse-customer').val('');
                strExcelData = [];
                excelSaveData = [];
                $('#spn_filename').html('');
                $('#tbl_Customerlst').html('');

                $.notify("Customer imported successfully!!", { position: "right top", className: "success" });
                $('#spn_filename').html('');
                $('#tbl_Customerlst').html('');
                setTimeout(function () {
                    window.location.href = 'InvoiceCustomer360.aspx';
                }, 2000);
            }
            else {
                distinctlst = [];
                $.notify("Server error occurred while importing Invoice.", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
    var ProcessExcelData = function () {

        var importTemplateFiles = $('#browse-customer').prop("files");
        var fileName = importTemplateFiles[0]['name'];
        var type = importTemplateFiles[0]["type"];

        if (importTemplateFiles.length > 0) {
            if (type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                $('#spn_filename').html(fileName);

                var data = new FormData();
                data.append("Folder", 0);
                data.append("key", importTemplateFiles[0]);
                {
                    $.ajax({
                        type: "POST",
                        url: "CustomerImport.ashx",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            if (result != '' && result != null && result.length != 0) {
                                $('#browse-customer').val("");
                                strExcelData = result;
                                strExcelData = $.parseJSON(strExcelData[""]);
                                BindExcelData();
                                // $('#mp_bill-view').show();
                            }
                            else {
                                $('#browse-customer').val("");

                            }
                        },
                        error: function (e) {
                            $('#browse-customer').val("");
                            var error = e;
                        },
                        xhr: function (evt) {
                            $('#browse-customer').val("");
                            var filexhr = $.ajaxSettings.xhr();
                            return filexhr;
                        }
                    }).done(function (r) {
                        $('#browse-customer').val("");
                    });
                }

            }
            else {

            }
        }
        return strExcelData;
    }

    var BindExcelData = function () {

        isValidData = true;
        excelSaveData = [];
        var html = '';
        var uniqueSites = [];
        var $el = $('#tbl_Customerlst');


        if (strExcelData.length > 0) {
            $.each(strExcelData, function (index, item) {

                if ((item["CustomerName"] != "" && item["Email"] != "")) {

                    var obj = {
                        'CustomerName': (item["CustomerName"] == null || '' ? 0 : item["CustomerName"]),
                        'Address': (item["Address"] == null || '' ? '' : item["Address"]),
                        'Email': (item["Email"] == null ? '' : item["Email"]),
                        'ClientId': (item["ClientId"] == null ? '' : item["ClientId"]),
                    }
                    excelSaveData.push(obj);

                    html += '<tr>'
                    html += '<td style="text-align:left;" title="' + (item["CustomerName"] == null ? '' : item["CustomerName"]) + '"><h5>' + (item["CustomerName"] == null ? '-' : item["CustomerName"]) + '</h5></td>'
                    html += '<td style="text-align:left; title="' + (item["Address"] == null ? '' : item["Address"]) + '"><h5>' + (item["Address"] == null ? '-' : item["Address"]) + '</h5></td>'
                    html += '<td style="text-align:left; title="' + (item["Email"] == null ? '' : item["Email"]) + '"><h5>' + (item["Email"] == null ? '-' : item["Email"]) + '</h5></td>'
                    html += '</tr>'
                }

            })
        }
        else {
            html += '<tr><td colspan="4" style="text-align: center;">No Data Found</td></tr>';
        }
        $el.html(html);
    }

    var deleteLabel = function () {
      
        var obj = {
            'LabelId': parseInt(deleteLabelID)
        }
        var tempList = {};
        $.when(RequestServer("LabelMalaysia.aspx/deleteLabel", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteLabelID = 0;
                $.notify("Buyer deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Buyer_Delete').hide();
                BindLabelMalaysiaList();
            }
            else {
                $.notify("Server error occured while deleting a Buyer!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var GetInvoiceData = function () {
      
        var tempList = {};
        $.when(RequestServer("InvoiceBuyer360.aspx/GetInvoiceData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindKPI = function (Buyerlistdata) {

        var Tot_buyers = [];
        var Vit = [];
        var Sing = [];
        var UAE = [];
        var MAL = [];
        var UK = [];

        Tot_buyers = common.AUF($.parseJSON(Buyerlistdata[0]["Table"]));
        Vit = common.AUF($.parseJSON(Buyerlistdata[1]["Table1"]));
        Sing = common.AUF($.parseJSON(Buyerlistdata[2]["Table2"]));
        UAE = common.AUF($.parseJSON(Buyerlistdata[3]["Table3"]));
        MAL = common.AUF($.parseJSON(Buyerlistdata[4]["Table4"]));
        UK = common.AUF($.parseJSON(Buyerlistdata[5]["Table5"]));

        if (Tot_buyers.length > 0) {
            $('#tot-buyers').html(Tot_buyers[0]["totalcount"] == null || Tot_buyers[0]["totalcount"] == -1 ? 0 : Tot_buyers[0]["totalcount"]);
            $('#Buyers-count').html(Tot_buyers[0]["totalcount"] == null || Tot_buyers[0]["totalcount"] == -1 ? 0 : Tot_buyers[0]["totalcount"]);
        }
        else {
            $('#Tot_buyers').html("0");
        }
        if (Vit.length > 0) {
            $('#VIT-Buyers').html(Vit[0]["VIETNAM"] == null || Vit[0]["VIETNAM"] == -1 ? 0 : Vit[0]["VIETNAM"]);
            $('#VIETNAM-Buyers').html(Vit[0]["VIETNAM"] == null || Vit[0]["VIETNAM"] == -1 ? 0 : Vit[0]["VIETNAM"]);
        }
        else {
            $('#Vit').html("0");
        }
        if (Sing.length > 0) {
            $('#Sing_Buyers').html(Sing[0]["Singapore"] == null || Sing[0]["Singapore"] == -1 ? 0 : Sing[0]["Singapore"]);
            $('#Singapore_Buyers').html(Sing[0]["Singapore"] == null || Sing[0]["Singapore"] == -1 ? 0 : Sing[0]["Singapore"]);
        }
        else {
            $('#Sing').html("0");
        }
        if (UAE.length > 0) {
            $('#UAE-Buyers').html(UAE[0]["UAE"] == null || UAE[0]["UAE"] == -1 ? 0 : UAE[0]["UAE"]);
            $('#UAEmirates-Buyers').html(UAE[0]["UAE"] == null || UAE[0]["UAE"] == -1 ? 0 : UAE[0]["UAE"]);
        }
        else {
            $('#UAE').html("0");
        }
        if (MAL.length > 0) {
            $('#Mala-Buyers').html(MAL[0]["Malaysia"] == null || MAL[0]["Malaysia"] == -1 ? 0 : MAL[0]["Malaysia"]);
            $('#Malaysia-Buyers').html(MAL[0]["Malaysia"] == null || MAL[0]["Malaysia"] == -1 ? 0 : MAL[0]["Malaysia"]);
        }
        else {
            $('#MAL').html("0");
        }
        if (UK.length > 0) {
            $('#UK-Buyers').html(UK[0]["UE"] == null || UK[0]["UE"] == -1 ? 0 : UK[0]["UE"]);
            $('#UntKing-Buyers').html(UK[0]["UE"] == null || UK[0]["UE"] == -1 ? 0 : UK[0]["UE"]);
        }
        else {
            $('#UK').html("0");
        }
    }
}

//Click
{
    $(document).on('change', '#browse-customer', function (e) {

        e.preventDefault();
        ProcessExcelData();

    });

    $(document).on('click', '#btn-Save-ExcelData', function () {

        if (excelSaveData.length > 0) {
            SaveExcelData(excelSaveData);
        }
        else {
            $.notify("Please add the Customer for upload!!", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '[data-delete-buyer]', function () {

        deleteBuyerID = $(this).attr('data-delete-buyer');
        if (deleteBuyerID != null) {
            $('#mp_Buyer_Delete').show();
        }
    });

    $(document).on('click', '#btn-delete-ok', function () {
       
        $loading.show();
        //  setTimeout(function () {
        DeleteBuyer();
        $loading.hide();
        // }, 0);
    });
    $(document).on('click', '[delete-cancel]', function () {
        deleteBuyerID = 0;
        $('#mp_Buyer_Delete').hide();
    })

    $(document).on('click', '#btn_search', function () {
        
        BindLabelMalaysiaList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-BuyerName').val('');
        $('#txt-liners').val('');
        $('#txt-taxid').val('');
        BindLabelMalaysiaList();
    })

    $(document).on('click', '#btn-cancel', function () {
        $('#spn_filename').html('');
        $('#tbl_Customerlst').html('');
    });
    $(document).on('click', '#btn_close', function () {
         $('#spn_filename').html('');
        $('#tbl_Customerlst').html('');
    });
}