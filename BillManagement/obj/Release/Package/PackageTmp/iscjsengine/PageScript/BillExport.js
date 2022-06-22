//Global Varibles
{
    var filteredList = [];
    var dataAllCount = 0;
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        RegisterFields();
        BuildExportScreen();
        //$('#menu-List li').removeClass('active');
        //$('#menu-List li[child-menu=11]').addClass('active');
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#Btn_serch', function () {
        
        if ($.trim($('#due-From').val()) != '' && $.trim($('#due-To').val())) {
            BuildExportScreen();
        }

        var obj = {
            'StartDueDate': moment($('#due-From').val()).format('YYYY/MM/DD'),
            'EndDueDate': moment($('#due-To').val()).format('YYYY/MM/DD'),
            
            'PaymentStatus': parseInt($('#slt-Payment-Status').val())
        }
        var ExcelList = [];
        
        ExcelList.push(obj);
        var sendList = JSON.stringify(ExcelList);
        $('#ContentPlaceHolder1_lstbillexport').val(sendList);
       
    });

    $(document).on('click', '#btn_Reset', function () {
        RegisterFields();
        BuildExportScreen();
    });

    $(document).on('click', '#btn-Export-Data', function () {
        
        ExportBillData();
    });

    $(document).on('click', 'th[data-sort-bill]', function (e) {
        var $this = $(this).parents('table');
        if ($('th[data-sort]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
            //var tablegroupby = 'Entityname'
            // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
            var columngroupby = $(this).attr('data-sort');
            var columType = $(this).attr('sort-column-Type');
            var sortingdefaulticon = "img/appimages/Sorting-icon-default.png";
            var sortingascendingicon = "img/appimages/Sorting-icon-asc.png";
            var sortingdescendingicon = "img/appimages/Sorting-icon-desc.png";

        }

        // Get Active sort order
        {
            var activesortorder = "default";
            if ($(this).hasClass('sorting-default'))
                activesortorder = "default";
            else if ($(this).hasClass('sorting-asc'))
                activesortorder = "asc";
            else if ($(this).hasClass('sorting-desc'))
                activesortorder = "desc";
        }

        // Restore all to default
        {
            $this.find('thead th').removeClass('sorting-asc sorting-desc').addClass('sorting-default');
            $this.find('thead th').find('img').attr('src', sortingdefaulticon);
            var currentSortOrder = "asc";
        }

        // Change Icon and Class
        {
            if (activesortorder === "default") {
                $('#tbl_bills th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl_bills th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl_bills th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl_bills th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl_bills th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl_bills th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-desc headerSortUp').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";

            }
        }

        // Sort it and Render List
        {
            //$loading.show();
            //setTimeout(function () {
            // Sort it by Default Groupby and then by Column
            var lstResult = filteredList

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorter(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorter(lstResult, columngroupby, '321');
            }
            else if (columType == 'date') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
            }


            // Render List
            {
                BindExportList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });
}

//Dom Manipulation
{
    var RegisterFields = function () {
        $('#slt-Payment-Status').val('50023');
        $('#slt-Payment-Status').select2();
        $('.iscdatepicker').datepicker();
        $('.iscdatepicker').mask('00/00/0000');
        var currentMonthStartDate = moment().clone().startOf('month').format('MM/DD/YYYY');
        var currentMonthEndDate = moment().clone().endOf('month').format('MM/DD/YYYY');
        $('#due-From').datepicker('setDate', currentMonthStartDate);
        $('#due-To').datepicker('setDate', currentMonthEndDate);
        var obj = {
            //before using like this code 
            //'StartDueDate': '2020/05/01',
            //'EndDueDate': '2021/05/01',
            'StartDueDate': moment($('#due-From').val()).format('YYYY/MM/DD'),
            'EndDueDate': moment($('#due-To').val()).format('YYYY/MM/DD'),

            'PaymentStatus': parseInt($('#slt-Payment-Status').val())
        }
        var ExcelList = [];

        ExcelList.push(obj);
      var sendList= JSON.stringify(ExcelList);
      $('#ContentPlaceHolder1_lstbillexport').val(sendList);

    }

    var BuildExportScreen = function () {
        BindBillList();
        //var screenData = GetExportScreenData();
        //filteredList = screenData["ExportBills"];
        //BindExportList(filteredList);
    }

    var BindExportList = function (ExportBills) {
        var html = '';
        var $el = $('#tbl-Export-Body');
        if (ExportBills != null && ExportBills != undefined && ExportBills.length > 0)
        {
            ExportBills = GetDistinctArray(ExportBills, 'IdentityID');
            $.each(ExportBills, function (index, item) {
                var today = moment().format('MM/DD/YYYY');
                var dueDay = moment(item["DueOn"]);
            //    var amount = item["ApprovedAmount"].replace(/,/g, '');
                var amount = parseFloat(item["ApprovedAmount"]);
                html+='<tr>';
                html += '<td title="' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '"><h5>' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</h5>                              ';
                html += '</td>                                                       ';
                html += '<td title="' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '"><h5>' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</h5>                                      ';
                html += '</td>                                                       ';
                html += '<td title="' + (item["Description"] == null ? '-' : item["Description"]) + '"> <h5>' + (item["Description"] == null ? '-' : item["Description"]) + '</h5></td>                    ';
                html += ' <td>';
                if (item["PaymentStatus"] == '50023') {
                    html += '<a class="isc-wrk-flw-sta-upload">Approved</a>';
                } else {
                    html += ' <a  class="" style="color:green;">Paid</a>         ';
                }
                html += ' </td>                                                      ';
                html += ' <td><h5>Payments</h5>                                     ';
                html += ' </td>                                                      ';
                html += ' <td>';
                if (moment(today) <= dueDay) {
                    html += '<h5 title="' + (item["DueOn"] == null ? '-' : moment(item["DueOn"]).format('MM/DD/YYYY')) + '">' + (item["DueOn"] == null ? '-' : moment(item["DueOn"]).format('MM/DD/YYYY')) + '</h5>        ';
                }
                else {
                    html += '<h5 style="color:red !important;" title="' + (item["DueOn"] == null ? '-' : moment(item["DueOn"]).format('MM/DD/YYY')) + '">' + (item["DueOn"] == null ? '-' : moment(item["DueOn"]).format('MM/DD/YYYY')) + '</h5>        ';
                }
               
                html += ' </td><td title="' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '"><h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>           ';
                html += ' </td>                                                      ';
                html += ' </tr>                                                      ';
            });
        }
        else {
            html += '<tr><td colspan="7" style="text-align: center;">No Data Found</td></tr>';
        }
        $el.html(html);
    }
}

//Data Manipulation
{
    var GetExportScreenData = function () {
        var _obj = {
            'DueFromDate': moment($('#due-From').val()).format('YYYY/MM/DD'),
            'DueToDate': moment($('#due-To').val()).format('YYYY/MM/DD'),
            'PaymentStatus':parseInt($('#slt-Payment-Status').val())
        };
        var tempList = {};
        $.when(RequestServer("Export.aspx/GetExportScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ExportBillData = function () {
       
        var _obj = {
            'DueFromDate': moment($('#due-From').val()).format('YYYY/MM/DD'),
            'DueToDate': moment($('#due-To').val()).format('YYYY/MM/DD'),
            'PaymentStatus': parseInt($('#slt-Payment-Status').val())
        };
        var tempList = {};
        $.when(RequestServer("Export.aspx/ExportScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{

}

//BindVendorList With Pagination
{
    var BindBillList = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl_bills').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "Export.aspx/GetExportBillDataList",
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
                    json.data = common.AUF(objData['ExportBills']);
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
                    "width": '15%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5>' + (data["VendorName"] == null ? '-' : data["VendorName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '13%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5>' + (data["InvoiceNumber"] == null ? '-' : data["InvoiceNumber"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '21%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5>' + (data["Description"] == null ? '-' : data["Description"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '12%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        if (data["PaymentStatus"] == '50023') {
                            html += '<a class="isc-wrk-flw-sta-upload">Approved</a>';
                        } else {
                            html += ' <a  class="" style="color:green;">Paid</a>         ';
                        }
                        return html;
                    }
                },
                  {
                      "width": '12%',
                      "mData": function (data, type, dataToSet) {
                          var html = '';
                          html += '<h5>' + (data["PaymentMode"] == null ? '-' : data["PaymentMode"]) + '</h5>';
                          return html;
                      }
                  },
                {
                    "width": '8%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {

                        var html = '';
                        html += '<h5>Payments</h5>';
                        return html;
                    }
                },

                {
                    "width": '9%',
                    "mData": function (data, type, dataToSet) {
                        var today = moment().format('MM/DD/YYYY');
                        var dueDay = moment(data["DueOn"]);
                        var html = '';
                        if (moment(today) <= dueDay) {
                            html += '<h5 >' + (data["DueOn"] == null ? '-' : moment(data["DueOn"]).format('MM/DD/YYYY')) + '</h5>        ';
                        }
                        else {
                            html += '<h5 style="color:red !important;" >' + (data["DueOn"] == null ? '-' : moment(data["DueOn"]).format('MM/DD/YYYY')) + '</h5>        ';
                        }
                        return html;
                    }
                },
                {
                    "width": '10%',
                    "mData": function (data, type, dataToSet) {
                        var amount = (data["ApprovedAmount"] == null ? 0.00 : parseFloat(data["ApprovedAmount"]));
                        var html = '';
                        html += '<h5 style="text-align:right;" >' + (amount == "" || amount == NaN ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                        return html;
                    }
                },


            ],
            "drawCallback": function (settings) {
                $('#tbl_bills tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },
            "fnDrawCallback":function(){
            if (dataAllCount >10) {
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
        obj.DueDateFrom =$('#due-From').val(),
        obj.DueDateTo = $('#due-To').val(),
        obj.PaymentStatus = $('#slt-Payment-Status').val();
        var _obj = {};
        _obj = { "billFilter": obj };
        return _obj;

            }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "VendorName " + direction;
                break;
            case 1:
                orderBy = "InvoiceNumber " + direction;
                break;
            case 2:
                orderBy = "Description " + direction;
                break;
            case 3:
                orderBy = "PaymentStatus " + direction;
                break;
            case 4:
                orderBy = "PaymentMode " + direction;
                break;
            case 6:
                orderBy = "DueOn " + direction;
                break;
            case 7:
                orderBy = "ApprovedAmount " + direction;
                break;
        }
        return orderBy;
    }
}