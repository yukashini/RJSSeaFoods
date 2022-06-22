//Global Variables
{
    var deleteProductID = 0;
    var editProductID = 0;
    var editProductData = [];
    MasterData = [];
}
//Load && Events
{
    $(document).ready(function () {
      
        $loading.show();
        BindInvoiceList();
        $loading.hide();
    });
}
//Save && Update
{
    var SaveProduct = function () {
        var _obj = {
            'ProductCode': $('#ProductCode').val(),
            'ProductName': $('#ProductName').val(),
        }
        var insertObj = {
            'objProduct': _obj
        }
        $.when(RequestServer("Product.aspx/SaveProduct", insertObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Product created successfully!", { position: "right top", className: "success" });
                
            }
            else {
                $.notify("Server error occured while creating a Product !!", { position: "right top", className: "error" });
                GoBack()
            }
        });
    }
    var UpdateProduct = function () {
        var _obj = {
            'ProductID': parseInt(editProductID),
            'ProductCode': $('#ProductCode').val(),
            'ProductName': $('#ProductName').val(),

        }
        var UpdateObj = {
            'objProduct': _obj
        }
        $.when(RequestServer("Product.aspx/UpdateProduct", UpdateObj)).done(function (response) {
            if (parseInt(response) > 0) {
                $.notify("Product Updated successfully!", { position: "right top", className: "success" });
                
            }
            else {
                $.notify("Server error occured while creating a Product !!", { position: "right top", className: "error" });
                GoBack()
            }
        });
    }
}
{
    var BindInvoiceList = function () {
          
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#Tbl_Product').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
             "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "Product.aspx/GetInvoicelst",
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
                    json.data = common.AUF(objData['Productlst']);
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
                        html += '<h5 >' + (data["ProductCode"] == null || data["ProductCode"] == '' ? '-' : data["ProductCode"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ProductName"] == null || data["ProductName"] == '' ? '-' : data["ProductName"]) + '</h5>';
                        return html;
                    }
                },
          
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                      
                        var html = '';
                        html += '<div style="text-align: center;">';
                        
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  data-Edit-Product=' + (data["ProductID"] == null ? '' : data["ProductID"]) + '><i class="fa fa-pencil-square-o"></i></a>';
                        html += '<a class="isc-action-badge-td-s1 pad-lft-5 isc-mb-mar-lft-5" title="Delete" data-delete-Product=' + (data["ProductID"] == null ? '' : data["ProductID"]) + '><i class="fa fa-trash-o"></i></a>';
                       
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
                $('#Tbl_Product tr td').each(function (index, item) {
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
        obj.ProductCode = $('#txt-Code').val();
        obj.ProductName = $('#txt-Description').val();
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
                orderBy = "ProductCode " + direction;
                break;
            case 1:
                orderBy = "ProductName " + direction;
                break;
         }
        return orderBy;
    }
}
var GetMasterData = function () {

    var _obj = {

    };
    var tempList = {};
    $.when(RequestServer("Product.aspx/GetFilterData", _obj)).done(function (response) {
        tempList = $.parseJSON(response);
    });
    return tempList;
}


var ValidateProduct = function () {
    MasterData = GetMasterData();
    var isvalid = true;
    var code = $.trim($('#ProductCode').val());
    var description = $.trim($('#ProductName').val());

    if (code == '' || code == null) {
        isvalid = false;
        $('#ProductCode-Validation').show();
    }

    if (description == '' || description == null) {
        isvalid = false;
        $('#ProductName-Validation').show();
    }

    if (code != '') {
       
        var existingProduct = MasterData["ExistingProduct"];
        if (existingProduct != null && existingProduct != undefined && existingProduct.length > 0) {
            if (editProductID == 0) {
                var matchedProductRecord = GetmatchedRecord(existingProduct, 'ProductCode', code);
                if (matchedProductRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
            else {
                var unMatchedProduct = GetunmatchedRecord(existingProduct, 'ProductID', editProductID);
                var matchedProductRecord = GetmatchedRecord(unMatchedProduct, 'ProductCode', code);
                if (matchedProductRecord.length > 0) {
                    isvalid = false;
                    $.notify("Code already exists!", { position: "right top", className: "error" });
                }
            }
        }

    }
    return isvalid;
    
}
//getEdit
{
    var BindCreateEmployeeScreen = function () {

        var createEmployeeEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3023');
        if (createEmployeeEntity.length > 0) {
            $('#btn-Save').show();
        }
        else {
            $('#btn-Save').hide();
        }
        if (editProductID != 0) {
            editProductData = GetEditProductData();
            BindEditProductDetails(editProductData["ProductData"]);
        }
    }

    var BindEditProductDetails = function (ProductData) {

        $('#ProductCode').val(ProductData[0]['ProductCode'])
        $('#ProductName').val(ProductData[0]['ProductName'])

        $('P-Title').html('Update Product');
        $('#btn-Save').hide();
        var updateProductEntity = GetmatchedRecord(RolePermissions, 'EntityActionID', '3024');
        if (updateProductEntity.length > 0) {
            $('#update-Product').show();
        }
    }
    var GetEditProductData = function () {
        var _obj = {
            'ProductID': parseInt(editProductID)
        };
        var tempList = {};
        $.when(RequestServer("Product.aspx/GetEditProductData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;

    }

}

{

    var DeleteProduct = function () {
        var obj = { 'ProductID': parseInt(deleteProductID) }
            var tempList = {};
        $.when(RequestServer("Product.aspx/DeleteProduct", obj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    deleteProductID = 0;
                    $.notify("Product deleted successfully!!", { position: "right top", className: "success" });
                    $('#mp_Product_Delete').hide();
                    BindInvoiceList();
                }
                else {
                    $.notify("Server error occured while deleting a Product!!", { position: "right top", className: "error" });
                }
            });
            return tempList;
        }
    {
        var GetEmployeeinfo = function () {

            var _obj = {
                'ProductId': parseInt(EmployeeId),
            };
            var tempList = {};
            $.when(RequestServer("Product.aspx/GetProductScreenData", _obj)).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
    }
}

  //Click
{
    $(document).on('click', '[data-Edit-Product]', function () {

        editProductID = $(this).attr('data-Edit-Product');
        if (editProductID != null) {
            BindCreateEmployeeScreen();
        }
        $('#mp_paid').show();
    });


    $(document).on('click', '[data-delete-Product]', function () {
        deleteProductID = $(this).attr('data-delete-Product');
    if (deleteProductID != null) {
        $('#mp_Product_Delete').show();
    } 
});
    $(document).on('click', '#btn-Save', function () {
        if (ValidateProduct() && $("span[error-active='true']").length == 0) {
            SaveProduct();
            location.reload();
        }

    });
    $(document).on('click', '#update-Product', function () {
        if (ValidateProduct() && $("span[error-active='true']").length == 0) {
            UpdateProduct();
            location.reload();
        }

    });

    $(document).on('click', '[data-delete-Product]', function () {
        
        DeleteProductID = $(this).attr('data-delete-Customer');
        var associatedCount = $(this).attr('data-AssociatedCount');
        var associatedProject = $(this).attr('data-Associate-project');
        var associatedBill = $(this).attr('data-delete-Invoice');
        if (parseInt(associatedCount) == 0 && parseInt(associatedProject) == 0 && parseInt(associatedBill)==0) {
            if (DeleteProductID != null) {
                $('#mp_Product_Delete').show();
            }
        }
    });
    $(document).on('click', '#btn-delete-ok', function () {
        $loading.show();
        setTimeout(function () {
            DeleteProduct();
            $loading.hide();
        }, 0);
        location.reload();
    });
    $(document).on('click', '[delete-cancel]', function () {
        DeleteProductID = 0;
        $('#mp_Product_Delete').hide();
        location.reload();
    })

    $(document).on('click', '#btn_search', function () {
        BindInvoiceList();
    });

    $(document).on('click', '#btn_reset', function () {
        $('#txt-ProductName').val('');
        BindInvoiceList();
    })

    $(document).on('click', '#btn-cancel', function () {
        $('#spn_filename').html('');
        $('#mp_paid').html('');
        location.reload();
    });
    $(document).on('click', '#btn_close', function () {
        $('#spn_filename').html('');
        $('#mp_paid').html('');
        location.reload();            
    });
}