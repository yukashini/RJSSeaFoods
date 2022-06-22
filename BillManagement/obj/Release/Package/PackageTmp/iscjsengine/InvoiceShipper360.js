//
{
    var strExcelData = [];
    var excelSaveData = [];
    var deleteShipperID = 0;
    var Shipperlistdata = [];
}
//Load && Events
{
    $(document).ready(function () {
       
        $loading.show();
        BindInvoiceList();
        Shipperlistdata = GetInvoiceData();
        BindKPI(Shipperlistdata);
        $loading.hide();
    });
}
//
{
    var BindInvoiceList = function () {
 
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_ShipperList').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "InvoiceShipper360.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['ShipperList']);
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
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ShipperName"] == null || data["ShipperName"] == '' ? '-' : data["ShipperName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '30%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ShipperAddress"] == null || data["ShipperAddress"] == '' ? '-' : data["ShipperAddress"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ProcessPacked"] == null || data["ProcessPacked"] == '' ? '-' : data["ProcessPacked"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ProcessPackedaddress"] == null || data["ProcessPackedaddress"] == '' ? '-' : data["ProcessPackedaddress"]) + '</h5>';
                        return html;
                    }
                }, {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ApprovalNo"] == null || data["ApprovalNo"] == '' ? '-' : data["ApprovalNo"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                      
                        var html = '';
                        html += '<div style="text-align: center;">';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 btn_View" title="View" id="btn_View"  href="ViewShipper360.aspx?ShipperID=' + (data["ShipperID"] == null ? '' : data["ShipperID"]) + '"><i class="fa fa-eye"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  href="AddShipper.aspx?ShipperID=' + (data["ShipperID"] == null ? '' : data["ShipperID"]) + '"><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-shipper=' + (data["ShipperID"] == null ? '' : data["ShipperID"]) + '><i class="fa fa-trash-o"></i></a>';
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
        obj.ShipperName = $('#txt-ShipperName').val();
        obj.Liners = $('#txt-appno').val();
        obj.taxid = $('#txt-PP').val();

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
                orderBy = "ShipperName " + direction;
                break;
            case 1:
                orderBy = "ShipperAddress " + direction;
                break;
            case 2:
                orderBy = "ProcessPacked " + direction;
                break;
            case 3.:
                orderBy = "ProcessPackedaddress " + direction;
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
    var DeleteBuyer = function () {
        var obj = {
            'BuyerId': parseInt(deleteBuyerID)
        }
        var tempList = {};
        $.when(RequestServer("InvoiceShipper360.aspx/DeleteBuyer", obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                deleteBuyerID = 0;
                $.notify("Shipper deleted successfully!!", { position: "right top", className: "success" });
                $('#mp_Shipper_Delete').hide();
                BindInvoiceList();
            }
            else {
                $.notify("Server error occured while deleting a Shipper!!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }

    var GetInvoiceData = function () {
        var tempList = {};
        $.when(RequestServer("InvoiceShipper360.aspx/GetInvoiceData")).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var BindKPI = function (Shipperlistdata) {
        
        var Tot_Shippers = [];
        var Odisha = [];
        var Andhra  = [];
        var West = [];
        var Tamil = [];
        var Goa = [];

        Tot_Shippers = common.AUF($.parseJSON(Shipperlistdata[0]["Table"]));
        Odisha = common.AUF($.parseJSON(Shipperlistdata[1]["Table1"]));
        Andhra = common.AUF($.parseJSON(Shipperlistdata[2]["Table2"]));
        West = common.AUF($.parseJSON(Shipperlistdata[3]["Table3"]));
        Tamil = common.AUF($.parseJSON(Shipperlistdata[4]["Table4"]));
        Goa = common.AUF($.parseJSON(Shipperlistdata[5]["Table5"]));
      
        if (Tot_Shippers.length > 0) {
            $('#tot-shippers').html(Tot_Shippers[0]["totalcount"] == null || Tot_Shippers[0]["totalcount"] == -1 ? 0 : Tot_Shippers[0]["totalcount"]);
            $('#shippers-count').html(Tot_Shippers[0]["totalcount"] == null || Tot_Shippers[0]["totalcount"] == -1 ? 0 : Tot_Shippers[0]["totalcount"]);
        }
        else {
            $('#Tot_Shippers').html("0");
        }
        if (Odisha.length > 0) {
            $('#Odisha-shippers').html(Odisha[0]["Odisha"] == null || Odisha[0]["Odisha"] == -1 ? 0 : Odisha[0]["Odisha"]);
            $('#Odisha').html(Odisha[0]["Odisha"] == null || Odisha[0]["Odisha"] == -1 ? 0 : Odisha[0]["Odisha"]);
        }
        else {
            $('#Odisha').html("0");
        }
        if (Andhra.length > 0) {
            $('#Andhra_shippers').html(Andhra[0]["Andhra Pradesh"] == null || Andhra[0]["Andhra Pradesh"] == -1 ? 0 : Andhra[0]["Andhra Pradesh"]);
            $('#Andhra').html(Andhra[0]["Andhra Pradesh"] == null || Andhra[0]["Andhra Pradesh"] == -1 ? 0 : Andhra[0]["Andhra Pradesh"]);
        }
        else {
            $('#Andhra').html("0");
        }    
        if (West.length > 0) {
            $('#West-Shippers').html(West[0]["West Bengal"] == null || West[0]["West Bengal"] == -1 ? 0 : West[0]["West Bengal"]);
            $('#West').html(West[0]["West Bengal"] == null || West[0]["West Bengal"] == -1 ? 0 : West[0]["West Bengal"]);
        }
        else {
            $('#West').html("0");
        }
        if (Tamil.length > 0) {
            $('#Tamil-Shippers').html(Tamil[0]["Tamil Nadu"] == null || Tamil[0]["Tamil Nadu"] == -1 ? 0 : Tamil[0]["Tamil Nadu"]);
            $('#Tamil').html(Tamil[0]["Tamil Nadu"] == null || Tamil[0]["Tamil Nadu"] == -1 ? 0 : Tamil[0]["Tamil Nadu"]);
        }
        else {
            $('#Tamil').html("0");
        }
        if (Goa.length > 0) {
            $('#Goa-Shippers').html(Goa[0]["Goa"] == null || Goa[0]["Goa"] == -1 ? 0 : Goa[0]["Goa"]);
            $('#Goa').html(Goa[0]["Goa"] == null || Goa[0]["Goa"] == -1 ? 0 : Goa[0]["Goa"]);
        }
        else {
            $('#Goa').html("0");
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
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-ShipperName').val('');
        $('#txt-liners').val('');
        $('#txt-taxid').val('');
        BindInvoiceList();
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