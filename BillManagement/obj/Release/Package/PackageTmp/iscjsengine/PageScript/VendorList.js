//Global Variables
{
    var vendorListData = [];
    var sortedVendorList = [];
    var deleteVenorID = 0;
    var dataAllCount = 0;
    var excelSaveData = [];
    var deleteVenorName = '';
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BuildVendorListScreen();
            BindConfigs();
            $loading.hide();
        }, 0);
       // $('[data-type=currency]').mask("#,##0.00", { reverse: true });
    });

    $(document).on('click', '[data-Delete-Vendor]', function () {
        if ($(this).attr('data-IsPaid') == '0') {
            if ($(this).attr('data-Delete-Vendor') != undefined && $(this).attr('data-Delete-Vendor') != '0') {
                deleteVenorID = parseInt($(this).attr('data-Delete-Vendor'));
                deleteVenorName = $(this).attr('data-Delete-Vendorname');
                
                $("#vendorName").html(deleteVenorName)  
                $('#MP_Delete_Vendor').show();
            }
        }
        else {
            $.notify("Already payments are done for the vendor,So not able to delete this vendor", { position: "right top", className: "error" });
        }
    });

    $(document).on('click', '[cancel-Delete-Vendor]', function () {
        $('#MP_Delete_Vendor').hide();
        deleteVenorID = 0;
    });

    $(document).on('click', '#delete-Vendor-Yes', function () {
        if (deleteVenorID != 0) {
            DeleteVendor();
        }
    });

    $(document).on('click', '#Btn_serch', function () {
        //var filterResult = FilterVendors();
        //sortedVendorList = filterResult;
        //RenderVendorList(sortedVendorList);
        BindVendorList();
    });

    $(document).on('click', '#btn_Reset', function () {
         $('#txt-Vendor').val('');
         $('#txt-Balance').val('');
        $('#txt-Last-Pay').val('');
        //sortedVendorList = vendorListData["VendorDetails"];
        //RenderVendorList(sortedVendorList);
        BindVendorList();
    });

    $(document).on('click', '#Btn-Upload', function (e) {
       
        excelSaveData = [];
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
        //var regex = /([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        //var regex = /^([a-zA-Z0-9s_!()\.-:])+(.xls|.xlsx)$/;
        //var regex = /^[a-z0-9][-a-z0-9x20_!().:,]*.xlsx?$/i;

            /*Checks whether the file is a valid excel file*/
            if (regex.test($("#Import-excel").val().toLowerCase())) {
                var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
                if ($("#Import-excel").val().toLowerCase().indexOf(".xlsx") > 0) {
                    xlsxflag = true;
                }
                /*Checks whether the browser supports HTML5*/
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        /*Converts the excel data in to object*/
                        if (xlsxflag) {
                            var workbook = XLSX.read(data, { type: 'binary' });
                        }
                        else {
                            var workbook = XLS.read(data, { type: 'binary' });
                        }
                        /*Gets all the sheetnames of excel in to a variable*/
                        var sheet_name_list = workbook.SheetNames;

                        var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                        sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                            /*Convert the cell value to Json*/
                            if (xlsxflag) {
                                var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                            }
                            else {
                                var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                            }
                            
                            if (exceljson.length > 0 && cnt == 0) {
                                exceljson = JSON.parse(JSON.stringify(exceljson).replace(/\s(?=\w+":)/g, ""));
                                exceljson = JSON.parse(JSON.stringify(exceljson).replace(/\s(?=\w+":)/g, ""));

                                $.each(exceljson, function (key, value) {
                                    
                                    if (value.VendorName !== undefined && value.PrimaryEmail !== undefined) {
                                        if (value.PreferredPaymentMethod == undefined) {
                                            value.PreferredPaymentMethod = '';
                                        }
                                        if (value.PaymentTerms == undefined) {
                                            value.PaymentTerms = '';
                                        }
                                        if (value.ContactNumber == undefined) {
                                            value.ContactNumber = '';
                                        }
                                        var obj = {
                                            'VendorName': value.VendorName,
                                            'Email': value.PrimaryEmail,
                                            'Phone': value.ContactNumber,
                                            'PrefferedPaymentMethod': value.PreferredPaymentMethod,
                                            'PaymentTerm': value.PaymentTerms,
                                            'GLCode': value.GLaccount,
                                        }
                                        excelSaveData.push(obj);
                                    }
                                    else {
                                        exceljson = 0;
                                    }

                                });
                                SaveExcelData(excelSaveData);
                            }
                            else {
                                $.notify("Please fill all the mandatory fields.", { position: "right top", className: "error" });
                                $("#Import-excel").val('');
                            }
                        });
                    }
                    if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                        reader.readAsArrayBuffer($("#Import-excel")[0].files[0]);
                    }
                    else {
                        reader.readAsBinaryString($("#Import-excel")[0].files[0]);
                    }
                }
                else {
                    $.notify("Sorry Your browser does not support HTML5!", { position: "right top", className: "error" });
                }
            }
            else {
                
                $.notify("Please fill all the mandatory fields.", { position: "right top", className: "error" });
                $("#Import-excel").val('');
            }
         
    });

    $(document).on('click', '#BtnCancel,#Btn_cancel', function (e) {
        $("#Import-excel").val('');
    });

    var SaveExcelData = function (exelList) {
        var _obj = {
            'lstVendor': exelList,
        };
        
            $.when(RequestServer("VendorList.aspx/InsertExcelData", _obj)).done(function (response) {
                if (parseInt(response) > 0) {
                    $("#Import-excel").val('');
                    $.notify("Vendor list imported successfully!", { position: "right top", className: "success" });
                    BuildVendorListScreen();
                }
                else {
                    $("#Import-excel").val('');
                    $.notify("Please fill all the mandatory fields!", { position: "right top", className: "error" });
                }
            });
        
    };
    //Sorting Events
    {
        $(document).on('click', 'th[data-sort-vendor]', function (e) {
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
                    $('#tbl-Vendors th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Vendors th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                    $(this).find('img').attr('src', sortingascendingicon);
                    currentSortOrder = "asc";
                }
                else if (activesortorder === "asc") {
                    $('#tbl-Vendors th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Vendors th[sort-column-Type]').removeClass('headerSortUp')
                    $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                    $(this).find('img').attr('src', sortingdescendingicon);
                    currentSortOrder = "desc";
                }
                else if (activesortorder === "desc") {
                    $('#tbl-Vendors th[sort-column-Type]').removeClass('headerSortDown');
                    $('#tbl-Vendors th[sort-column-Type]').removeClass('headerSortUp')
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
                var lstResult = sortedVendorList

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
                    RenderVendorList(lstResult);

                }
                //    $loading.hide();
                //}, 0);
            }
        });
    }
}

//Dom Manipulation
{
    var BuildVendorListScreen = function () {
        //$('.iscdatepicker').datepicker();
        //$('.iscdatepicker').mask('00/00/0000');
        vendorListData = GetVendorListScreenData();
        var billScreenKPI = vendorListData["KPIDetails"];
        var vendorList = vendorListData["VendorDetails"];
        sortedVendorList = vendorList;
        if (billScreenKPI != undefined && billScreenKPI != null && billScreenKPI.length > 0) {
                BindKPI(billScreenKPI);
        }
        //  RenderVendorList(vendorList);
        BindVendorList();

        //Bind Role Permission
        {
            var isAddVendor = GetmatchedRecord(RolePermissions, 'EntityActionID', '3015');
            if (isAddVendor != null && isAddVendor != undefined && isAddVendor.length > 0) {
                $('#Add-Vendor').show();
            }
            else {
                $('#Add-Vendor').hide();
            }
        }
    }

    var BindKPI = function (billScreenKPI) {
        //Pending Submission
        $('#un-Submitted-Count').html((billScreenKPI[0]["PendingSubmissionBills"] == null ? 0 : billScreenKPI[0]["PendingSubmissionBills"]))
        $('#un-Submitted-Amount').html("$" + (billScreenKPI[0]["PendingSubmissionAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["PendingSubmissionAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["PendingSubmissionAmount"]))));
        if (billScreenKPI[0]["CWeekPendingSubmissionCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekPendingSubmissionCount"]) < parseInt(billScreenKPI[0]["LWeekPendingSubmissionCount"]))) {
            $("#un-Submitted-Week-Count").html('' + (billScreenKPI[0]["CWeekPendingSubmissionCount"] == null ? 0 : billScreenKPI[0]["CWeekPendingSubmissionCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
            $('#un-Sub-Arrow').removeClass("fa fa-arrow-up");
            $('#un-Sub-Arrow').addClass("fa fa-arrow-down")
        }
        else {
            $("#un-Submitted-Week-Count").html('' + (billScreenKPI[0]["CWeekPendingSubmissionCount"] == null ? 0 : billScreenKPI[0]["CWeekPendingSubmissionCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
            $('#un-Sub-Arrow').removeClass("fa fa-arrow-down");
            $('#un-Sub-Arrow').addClass("fa fa-arrow-up")
        }

        //Rejected Bills
        $('#rejected-Count').html((billScreenKPI[0]["RejectedBills"] == null ? 0 : billScreenKPI[0]["RejectedBills"]))
        $('#rejected-Amount').html("$" + (billScreenKPI[0]["RejectedAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["RejectedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["RejectedAmount"]))));
        if (billScreenKPI[0]["CWeekRejectedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekRejectedCount"]) < parseInt(billScreenKPI[0]["LWeekRejectedCount"]))) {
            $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
            $('#rejected-Arrow').removeClass("fa fa-arrow-up");
            $('#rejected-Arrow').addClass("fa fa-arrow-down")
        }
        else {
            $("#rejected-Week-Count").html('' + (billScreenKPI[0]["CWeekRejectedCount"] == null ? 0 : billScreenKPI[0]["CWeekRejectedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
            $('#rejected-Arrow').removeClass("fa fa-arrow-up");
            $('#rejected-Arrow').addClass("fa fa-arrow-down")
        }

        //UnApproved Bills
        $('#un-Approved-Count').html((billScreenKPI[0]["UnApprovedBills"] == null ? 0 : billScreenKPI[0]["UnApprovedBills"]))
        $('#un-Approved-Amount').html("$" + (billScreenKPI[0]["UnApprovedAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["UnApprovedAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["UnApprovedAmount"]))));
        if (billScreenKPI[0]["CWeekUnApprovedCount"] == "0" || (parseInt(billScreenKPI[0]["CWeekUnApprovedCount"]) < parseInt(billScreenKPI[0]["LWeekUnApprovedCount"]))) {
            $("#un-Approved-Week-Count").html('' + (billScreenKPI[0]["CWeekUnApprovedCount"] == null ? 0 : billScreenKPI[0]["CWeekUnApprovedCount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#un-Approved-Week-Count").html('' + (billScreenKPI[0]["CWeekUnApprovedCount"] == null ? 0 : billScreenKPI[0]["CWeekUnApprovedCount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }

        //Total Bills
        totalBills = parseInt(billScreenKPI[0]["TotalBillsCount"]);
        $('#total-Amount-Count').html((billScreenKPI[0]["TotalBillsCount"] == null ? 0 : billScreenKPI[0]["TotalBillsCount"]))
        $('#total-Amount').html("$" + (billScreenKPI[0]["TotalAmount"] == null || Math.sign(parseFloat(billScreenKPI[0]["TotalAmount"])) == -1 ? 0 :moneyFormatter( parseFloat(billScreenKPI[0]["TotalAmount"]))));
        if (billScreenKPI[0]["CurrentWeekBillsClount"] == "0" || (parseInt(billScreenKPI[0]["CurrentWeekBillsClount"]) < parseInt(billScreenKPI[0]["LastWeekBillsCount"]))) {
            $("#total-Week-Count").html('' + (billScreenKPI[0]["CurrentWeekBillsClount"] == null ? 0 : billScreenKPI[0]["CurrentWeekBillsClount"]) + '<i class="fa fa-arrow-down" style="margin-left:5px;" ></i>')
        }
        else {
            $("#total-Week-Count").html('' + (billScreenKPI[0]["CurrentWeekBillsClount"] == null ? 0 : billScreenKPI[0]["CurrentWeekBillsClount"]) + '<i class="fa fa-arrow-up" style="margin-left:5px;" ></i>')
        }
    }

    var RenderVendorList = function (vendorList) {
        var $el = $('#tbl-Vendors-Bdy');
        var html = '';
        var distinctedVendorList = GetDistinctArray(vendorList, 'VendorID');
        if (distinctedVendorList != undefined && distinctedVendorList != null && distinctedVendorList.length > 0) {
            $.each(distinctedVendorList, function (index, item) {

                html+='<tr>';
                html+='<td>';
                html += '<h5 title="' + (item["VendorName"] == null || item["VendorName"] == '' ? '-' : item["VendorName"]) + '">' + (item["VendorName"] == null || item["VendorName"] == '' ? '-' : item["VendorName"]) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5 title="' + (item["Address"] == null || item["Address"] == '' ? '-' : item["Address"]) + '">' + (item["Address"] == null || item["Address"] == '' ? '-' : item["Address"]) + '</h5>	';
                html+='</td>';
                html+='<td >';
                html += ' <h5 title="' + (item["Email"] == null || item["Email"] == '' ? '-' : item["Email"]) + '">' + (item["Email"] == null || item["Email"] == '' ? '-' : item["Email"]) + '</h5>';
                html+='</td>';
                html+='<td>';
                html += '<h5 style="text-align: right; color: #66B050!important;" title="' + ("$" + (item["Balance"] == null || Math.sign(parseFloat(item["Balance"])) == -1 ? '0.00' : parseFloat(item["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + '">' + ("$" + (item["Balance"] == null || Math.sign(parseFloat(item["Balance"])) == -1 ? '0.00' : parseFloat(item["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                html+='</td>';
                html+='<td style="text-align:center;">';
                html += '<h5 title="' + (item["PaidOn"] == null || item["PaidOn"] == '' ? '-' : moment(item["PaidOn"]).format('MM/DD/YYYY')) + '" >' + (item["PaidOn"] == null || item["PaidOn"] == '' ? '-' : moment(item["PaidOn"]).format('MM/DD/YYYY')) + '</h5>';
                html+='</td>';
                html += '<td>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="View"" href="VendorEdit.aspx?VendorID=' + (item["VendorID"] == null ? '0' : item["VendorID"]) + '" ><i class="fa fa-eye"></i></a>';
                html += '<a  href="AddVendor.aspx?VendorID=' + (item["VendorID"] == null || item["VendorID"] == '' ? '0' : item["VendorID"]) + '" class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  ><i class="fa fa-pencil-square-o"></i></a>';
                html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" data-Delete-Vendorname="' + item["VendorName"] +'" data-Delete-Vendor="' + (item["VendorID"] == null || item["VendorID"] == '' ? '-' : item["VendorID"]) + '"><i class="fa fa-trash-o"></i></a>';
                html+='</td>';
                html += '</tr>';
            });
        }
        else {
            html+='<tr><td colspan="6" style="text-align:center;">No Data Found</td></tr>'
        }
        $el.html(html);
    }
}

//Data Manipulation
{
    var GetVendorListScreenData = function () {
        var _obj = {
           
        };
        var tempList = {};
        $.when(RequestServer("VendorList.aspx/GetVendorListScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
    var DeleteVendor = function () {
        var _obj = {
            'cardId': deleteVenorID,
        };
        var tempList = {};
        $.when(RequestServer("VendorList.aspx/DeleteVendor", _obj)).done(function (response) {
            if (parseInt(response) > 0) {
                BuildVendorListScreen();
               // $('#tbl-Vendors-Bdy [data-Delete-Vendor='+deleteVenorID+']').parents('tr').remove();
                $.notify("Vendor deleted successfully !!", { position: "right top", className: "success" });
               $('#MP_Delete_Vendor').hide();
            }
            else {
                $.notify("Server error occured while deleting a Vendor !!", { position: "right top", className: "error" });
            }
        });
        return tempList;
    }
}

//Common
{
    var FilterVendors = function () {
        var $vendor = $('#txt-Vendor').val();
        var $balance = $('#txt-Balance').val();
        var $lastPay = $('#txt-Last-Pay').val();
        var vendorList = vendorListData["VendorDetails"];
        var result = vendorList;
        if (vendorList != undefined && vendorList != null && vendorList.length > 0) {
            if ($.trim($vendor) != '') {
                var vendorNameResult = [];
                $(result).each(function (index, item) {
                    var vendorName = item["VendorName"];

                    if ((vendorName.toLowerCase()).startsWith($vendor.toLowerCase())) {
                        vendorNameResult.push(item);
                    }
                    result = vendorNameResult;
                });
            }

            if ($.trim($balance) != '') {
                //$balance.replace(',', '');
                //var amountValue = $balance;
                //amountValue.replaceAll(',', '');
                result = $.grep(result, function (a, b) {
                    return (a["Balance"] == $balance)
                });
            }

            if ($.trim($lastPay) != '') {
                result = $.grep(result, function (a, b) {
                    return (a["PaidOn"] == $lastPay)
                });
            }
        }
        return result;
    }

    $(document).on('blur', 'input[data-type=currency]', function () {
        formatCurrency($(this));
    })

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") { return; }

        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = input_val;

            // final formatting
            if (blur === "blur") {
                input_val += ".00";
            }
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    var BindConfigs = function () {
        if (clientConfigurations != null && clientConfigurations != undefined && clientConfigurations.length > 0) {
            if (clientConfigurations[0]["IsImportVendorsAllowed"] == "1") {
                $('#btn-ImportVendor').show();
            }
            else {
                $('#btn-ImportVendor').hide();
            }
        }
    }
}

//BindVendorList With Pagination
{
    var BindVendorList = function () {
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-Vendors').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "VendorList.aspx/GetVendorDataList",
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
                    json.data = common.AUF(objData['VendorList']);
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
                        html += '<h5 >' + (data["VendorName"] == null || data["VendorName"] == '' ? '-' : data["VendorName"]) + '</h5>';
                        return html;
                    }
                },
                //{
                //    "width": '23%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = '';
                //        html += '<h5>' + (data["Address"] == null || data["Address"] == '' ? '-' : data["Address"]) + '</h5>	';
                //        return html;
                //    }
                //},
                 {
                     "width": '13.5%',
                     "mData": function (data, type, dataToSet) {
                         var nextDue = moment.utc(data["NextDueDate"]).toDate();
                         var localDue = moment(nextDue).local().format('MM/DD/YYYY');
                         var html = '';
                         html += '<div style="text-align: left;">';
                         html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                         html += '</div>';
                         return html;
                     }
                 },
                //{
                //    "width": '20%',
                //    "mData": function (data, type, dataToSet) {
                //        var html = ' <h5>' + (data["Email"] == null || data["Email"] == '' ? '-' : data["Email"]) + '</h5>';
                //        return html;
                //    }
                //}, 
               {
                   "width": '13.5%',
                   "mData": function (data, type, dataToSet) {
                       var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["NextDueAmount"] == null || Math.sign(parseFloat(data["NextDueAmount"])) == -1 ? '0.00' : parseFloat(data["NextDueAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                       return html;
                   }
               },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["Balance"] == null || Math.sign(parseFloat(data["Balance"])) == -1 ? '0.00' : parseFloat(data["Balance"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var html = '<h5 style="text-align: right; color: #66B050!important;">' + ("$" + (data["TotalPaidAmount"] == null || Math.sign(parseFloat(data["TotalPaidAmount"])) == -1 ? '0.00' : parseFloat(data["TotalPaidAmount"]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))) + ' </h5>';
                        return html;
                    }
                },
                {
                    "width": '13.5%',
                    "mData": function (data, type, dataToSet) {
                        var paidOn = moment.utc(data["PaidOn"]).toDate();
                        var localpaidOn = moment(paidOn).local().format('MM/DD/YYYY');
                            var html = '';
                            html += '<div style="text-align: left; padding-left:9px">';
                            html += '<h5 >' + (localpaidOn == "Invalid date" ? '-' : localpaidOn) + '</h5>';
                            html += '</div>';
                            return html;
                    }
                },
                {
                    "width": '10%',
                    "orderable": false,
                    "mData": function (data, type, dataToSet) {
                        var isViewVendor = GetmatchedRecord(RolePermissions, 'EntityActionID', '3018');
                        var isUpdateVendor = GetmatchedRecord(RolePermissions, 'EntityActionID', '3016');
                        var isDeleteVendor = GetmatchedRecord(RolePermissions, 'EntityActionID', '3017');
                        var html = '';
                        html += '<div style="text-align: center;">';
                        if (isViewVendor != null && isViewVendor != undefined && isViewVendor.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="View"" href="VendorEdit.aspx?VendorID=' + (data["VendorID"] == null ? '0' : data["VendorID"]) + '" ><i class="fa fa-eye"></i></a>';
                        }
                        if (isUpdateVendor != null && isUpdateVendor != undefined && isUpdateVendor.length > 0) {
                            html += '<a  href="AddVendor.aspx?VendorID=' + (data["VendorID"] == null || data["VendorID"] == '' ? '0' : data["VendorID"]) + '" class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  ><i class="fa fa-pencil-square-o"></i></a>';
                        }
                        if (isDeleteVendor != null && isDeleteVendor != undefined && isDeleteVendor.length > 0) {
                            html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-IsPaid="' + (data["PaidOn"] == null || data["PaidOn"] == '' ? 0 : 1) + '" title="Delete" data-Delete-Vendorname="' + data["VendorName"]+'" data-Delete-Vendor="' + (data["VendorID"] == null || data["VendorID"] == '' ? '-' : data["VendorID"]) + '"><i class="fa fa-trash-o"></i></a>';
                        }
                        html += '</div>';
                        return html;
                    }
                },

            ],
            "drawCallback": function (settings) {
                $('#tbl-Vendors tr td').each(function (index, item) {
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
        obj.VendorName = $.trim($('#txt-Vendor').val());
        obj.Balance = $.trim($('#txt-Balance').val());;
        obj.LastPayment = $.trim($('#txt-Last-Pay').val());;
        var _obj = {};
        _obj = { "vendorFilter": obj };
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
                orderBy = "NextDueDate " + direction;
                break;
            case 2:
                orderBy = "NextDueAmount " + direction;
                break;
            case 3:
                orderBy = "Balance " + direction;
                break;
            case 4:
                orderBy = "TotalPaidAmount " + direction;
                break;
            case 5:
                orderBy = "PaidOn " + direction;
                break;
          
        }
        return orderBy;
    }
}

$('a#Download-lst').attr({
    target: '_blank',
    href: 'https://arcbill-qa.archarina.com/images/VendorTemplate.xlsx'
});
