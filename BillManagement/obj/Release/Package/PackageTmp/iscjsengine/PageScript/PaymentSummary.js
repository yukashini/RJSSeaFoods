//Global Variables
{
    var filterList = [];
    var billList = [];
    var filteredBillList = [];
    var payBillId = 0;
    var billIdentityId = 0;
    var breakageList = [];
    var payBillDetails = [];
    var vendorId = 0;
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            SetSession('selectedMenu', 6)
            vendorId = ((GetQueryStrings()["VendorID"] == undefined || GetQueryStrings()["VendorID"] == null) ? 0 : GetQueryStrings()["VendorID"]);
            SetActiveMenu();
            BuildPaymentSummaryScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-filter-search', function () {
        $loading.show();
        setTimeout(function () {
            vendorId = 0;
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
        }, 0);
    })

    $(document).on('click', '#btn-filter-reset', function () {
        $loading.show();
        setTimeout(function () {
            vendorId = 0;
        BindFilters();
        $('#slt-vendor option[value="0"]').prop('selected', 'selected').change();
        $('#slt-bill-invoice option[value="0"]').prop('selected', 'selected').change();
        $('#slt-bill-category option[value="0"]').prop('selected', 'selected').change();
        $('#slt-bill-status option[value="0"]').prop('selected', 'selected').change();
        $('#bill-date-range').val('');
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
        }, 0);
    })

    $(document).on('click', '#btn-groupby-search', function () {
        $loading.show();
        setTimeout(function () {
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-groupby-reset', function () {
        $loading.show();
        setTimeout(function () {
            $('#slt-Hgroupby option[value="PaymentStatusName"]').prop('selected', 'selected').change();
            $('#slt-Vgroupby option[value="VendorName"]').prop('selected', 'selected').change();
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[groupview-attr]', function (e) {
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var billFilterdList = filterBills();
        BindBillsInvoice(billFilterdList);
    });

    $(document).on('click', '[data-Bill-Id]', function () {
        payBillId = $(this).attr('data-Bill-Id');
        billIdentityId = $(this).closest('td').attr('data-identity');
        var paymentStatus = $(this).closest('td').attr('data-Status');
        $loading.show();
        setTimeout(function () {
        if (payBillId != undefined && billIdentityId != undefined) {
            payBillId = parseInt(payBillId);
            billIdentityId = parseInt(billIdentityId);
            payBillDetails = GetBillDetails();
            BindBillDetails();
            $('#mp_pay-det').show();
        }
        else {
            $('#mp_pay-det').hide();
        }
        if (paymentStatus == '50036') {
            $('#challenge-bill').hide();
        }
        else {
            $('#challenge-bill').show();
        }
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[cancel-pay]', function () {
        payBillId = 0;
        billIdentityId = 0;
        payBillDetails = [];
        $('#mp_pay-det').hide();
    });

    $(document).on('click', '#billFileName', function () {
        var fileName = payBillDetails[0]["FileName"];
        var fileDisplayName = payBillDetails[0]["FileDisplayName"]
        if (fileName != undefined && fileName != "" && fileName != 'null') {
            $('#billFileTitle').text(fileDisplayName);
            $('#billFileTitle').prop('title', fileDisplayName);
            BillAttatchmentFrame(fileName);
        $('#mp_bill-view').show();
        }
        else {
            $.notify("There is no attachment for this bill", { position: "right top", className: "error" });
            $('#mp_bill-view').hide();
        }
    });

    $(document).on('click', '[close-Attachment]', function () {

        $('#mp_bill-view').hide();
    });

    $(document).on('click', '#challenge-bill', function () {
        $loading.show();
        setTimeout(function () {
        var billId = payBillDetails[0]["BillID"]
        var identityID = payBillDetails[0]["IdentityID"]
        if (billId != null && identityID != null) {
            ChallengeBill(parseInt(billId), parseInt(identityID));
            BuildPaymentSummaryScreen();
            $('#mp_pay-det').hide();
        }
        $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-flag]', function () {
        payBillId = $(this).attr('data-flag');
        billIdentityId = $(this).closest('td').attr('data-identity');
       
        if (payBillId != undefined && billIdentityId != undefined) {
            $('#mp_bill_flag').show();
        }

    });

    $(document).on('click', '#btn-flag-ok', function () {
        $loading.show();
        setTimeout(function () {
        ChangeToflag(parseInt(payBillId), parseInt(billIdentityId));
        $('#mp_bill_flag').hide();
        BuildPaymentSummaryScreen();
        $loading.hide();
        }, 0);
    })

    $(document).on('click', '[flag-cancel]', function () {
        payBillId = 0;
        billIdentityId = 0;
        $('#mp_bill_flag').hide();
    });

    $(document).on('click', '[data-challenge]', function () {
        payBillId = $(this).attr('data-challenge');
        billIdentityId = $(this).closest('td').attr('data-identity');
    
        if (payBillId != undefined && billIdentityId != undefined) {
            $('#mp_bill_challenge').show();
        }
        else {
            $('#mp_bill_challenge').hide();
        }
      
    });

    $(document).on('click', '#btn-challege-ok', function () {
        $loading.show();
        setTimeout(function () {
        ChallengeBill(parseInt(payBillId), parseInt(billIdentityId));
        $('#mp_bill_challenge').hide();
        billList = GetBillListData();
        billList = $.parseJSON(billList[0]["Table"]);
        filteredBillList = billList;
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
    }, 0);
    })

    $(document).on('click', '[challenge-cancel]', function () {
        payBillId = 0;
        billIdentityId = 0;
        $('#mp_bill_challenge').hide();
    });

    $(document).on('click', 'th[data-sort]', function (e) {
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
                $('#bill-breakage-table th[sort-column-Type]').removeClass('headerSortDown');
                $('#bill-breakage-table th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#bill-breakage-table th[sort-column-Type]').removeClass('headerSortDown');
                $('#bill-breakage-table th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#bill-breakage-table th[sort-column-Type]').removeClass('headerSortDown');
                $('#bill-breakage-table th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = breakageList

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
                BindBreakageList(lstResult);

            }
            //    $loading.hide();
            //}, 0);
        }
    });
}

//Dom Manipulation
{
    var BuildPaymentSummaryScreen = function () {
        filterList = GetFiltersData();
        BindFilters();
        billList = GetBillListData();
        billList = $.parseJSON(billList[0]["Table"]);
        filteredBillList = billList;
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        if (vendorId != 0 && vendorId != null && vendorId != '') {
            $('#isc-filter-container').show();
        }
        else {
            $('#isc-filter-container').hide();
        }
    }

    var BindFilters = function () {
        BindVendor($('#slt-vendor'), $.parseJSON(filterList[0]["Table"]), 'Choose Vendor');
        BindBill($('#slt-bill-invoice'), $.parseJSON(filterList[0]["Table"]), 'Choose Bill/Invoice');
        BindDropDowns($('#slt-bill-status'), $.parseJSON(filterList[1]["Table1"]), 'Choose Status');
        $('#bill-date-range').mask('00/00/0000')
        $('.select2').select2();
    }
    
    var BindListTabGroupBy = function (BillsList) {
        if (vendorId != 0 && vendorId != null)
        {
            BillsList = GetmatchedRecord(BillsList, 'VendorID', vendorId);
        }
        BillsList = GetDistinctArray(BillsList, 'BillID');
        var $el = $('#lst-Horizontal-tabs');
        var html = '';
        var GroupByType = $('#slt-Hgroupby :selected').attr('attr-type');
        var GroupValue = $('#slt-Hgroupby').val();
        html += ' <li class="active" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="0"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">All <span >(' + BillsList.length + ')</span></a></li>';
        // html += '<li class="active" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="0" ><a href="#">All (' + filteredBillList.length + ')</a> </li>';
        switch (GroupByType) {
            case 'user':
                if (BillsList.length > 0) {
                    //var _UnspecifiedRecords = $.grep(BillsList, function (a, b) {
                    //    return a[GroupValue] == null
                    //});
                    //if (_UnspecifiedRecords.length > 0) {
                    //    html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">Unspecified <span style="background-color: #F57F17; border-color: #F57F17; color: #fff;">' + _UnspecifiedRecords.length + '</span></a></li>';
                    //   // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"  ><a href="#">Unspecified (' + _UnspecifiedRecords.length + ')</a> </li>';
                    //}

                    var distinct = GetDistinctArray(BillsList, GroupValue);
                    distinct = ObjSorter(distinct, GroupValue, '123');
                    $.each(distinct, function (index, item) {
                        if (item[GroupValue] != null) {
                            var MatchedRecords = GetmatchedRecord(BillsList, GroupValue, item[GroupValue]);
                            html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">' + item[GroupValue] + ' ';
                            html += ' <span>(' + MatchedRecords.length + ')</span></a></li>';
                            // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#">' + item[GroupValue] + ' (' + MatchedRecords.length + ')</a> </li>';
                        }
                    });
                }
                break;
            case 'text':
                if (BillsList.length > 0) {
                    //var _UnspecifiedRecords = $.grep(BillsList, function (a, b) {
                    //    return a[GroupValue] == null
                    //});
                    //if (_UnspecifiedRecords.length > 0) {
                    //    html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">Unspecified <span style="background-color: #F57F17; border-color: #F57F17; color: #fff;">' + _UnspecifiedRecords.length + '</span></a></li>';
                    //  //  html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"  ><a href="#">Unspecified (' + _UnspecifiedRecords.length + ')</a> </li>';
                    //}

                    var distinct = GetDistinctArray(BillsList, GroupValue);
                    distinct = ObjSorter(distinct, GroupValue, '123');
                    $.each(distinct, function (index, item) {
                        if (item[GroupValue] != null) {
                            var MatchedRecords = GetmatchedRecord(BillsList, GroupValue, item[GroupValue]);
                            html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">' + item[GroupValue] + ' ';
                            html += ' <span>(' + MatchedRecords.length + ')</span></a></li>';
                            //html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#">' + item[GroupValue] + ' (' + MatchedRecords.length + ')</a> </li>';
                        }
                    });
                }
                break;
            case 'master':
                if (BillsList.length > 0) {
                    if (GroupValue == "PaymentStatusName") {
                        var distinct = GetDistinctArray(BillsList, GroupValue);
                        distinct = ObjSorter(distinct, GroupValue, '123');
                        $.each(distinct, function (index, item) {
                            if (item[GroupValue] != null) {
                                var MatchedRecords = GetmatchedRecord(BillsList, GroupValue, item[GroupValue]);
                                var displayTabText = item[GroupValue]
                                //displayTabText=item[""]
                                var statusColor = GetStatusColor(item["PaymentStatus"]);
                                html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">' + displayTabText + ' ';
                                html += ' <span  >(' + MatchedRecords.length + ')</span></a></li>';
                                // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#" >' + item[GroupValue] + ' (' + MatchedRecords.length + ')</a> </li>';
                            }
                        });
                    }
                    else {
                        //var _UnspecifiedRecords = $.grep(BillsList, function (a, b) {
                        //    return a[GroupValue] == null
                        //});
                        //if (_UnspecifiedRecords.length > 0) {
                        //    html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">Unspecified <span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">' + _UnspecifiedRecords.length + '</span></a></li>';
                        //    // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"  ><a href="#">Unspecified (' + _UnspecifiedRecords.length + ')</a> </li>';
                        //}

                        var distinct = GetDistinctArray(BillsList, GroupValue);
                        distinct = ObjSorter(distinct, GroupValue, '123');
                        $.each(distinct, function (index, item) {
                            if (item[GroupValue] != null) {
                                var MatchedRecords = GetmatchedRecord(BillsList, GroupValue, item[GroupValue]);

                                html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">' + item[GroupValue] + ' ';
                                html += ' <span>(' + MatchedRecords.length + ')</span></a></li>';
                                // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#" >' + item[GroupValue] + ' (' + MatchedRecords.length + ')</a> </li>';
                            }
                        });
                    }

                }
                break;

            case 'date':
                if (BillsList.length > 0) {
                    //var _UnspecifiedRecords = $.grep(BillsList, function (a, b) {
                    //    return a[GroupValue] == null
                    //});
                    //if (_UnspecifiedRecords.length > 0) {
                    //    html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">Unspecified <span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">' + _UnspecifiedRecords.length + '</span></a></li>';
                    //   // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="999"  ><a href="#">Unspecified (' + _UnspecifiedRecords.length + ')</a> </li>';
                    //}
                    var distinct = GetDistinctArray(BillsList, GroupValue);
                    distinct = ObjSorterByDate(distinct, GroupValue, '123');
                    $.each(distinct, function (index, item) {
                        if (item[GroupValue] != null) {
                            var MatchedRecords = GetmatchedRecord(BillsList, GroupValue, item[GroupValue]);
                            // html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#" >' + moment(item[GroupValue]).format('ddd, MMM DD') + ' (' + MatchedRecords.length + ')</a> </li>';
                            html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">' + item[GroupValue] + ' ';
                            html += ' <span >(' + MatchedRecords.length + ')</span></a></li>';
                        }
                    });
                }
                break;
        }

        $el.html(html);
        $('#lst-Horizontal-tabs').scrollingTabs();

    }

    var BindBillsInvoice = function (BillsList) {
        if (vendorId != 0 && vendorId != null) {
            BillsList = GetmatchedRecord(BillsList, 'VendorID', vendorId);
        }
        var html = '';
        var lstTempReportItems = [];
        var ActiveGroupType = $('[groupview-type].active').attr('groupview-type');
        var ActiveVGroupBy = $('#slt-Vgroupby').val();
        switch (ActiveGroupType) {
            case 'user':
                var ActiveGroupvalue = $('[groupview-type].active').attr('groupview-typevalue');
                var ActiveAttr = $('[groupview-type].active').attr('groupview-attr');
                if (ActiveGroupvalue == 0) {
                    lstTempReportItems = ObjSorter(BillsList, ActiveVGroupBy, '123');
                }
                else if (ActiveGroupvalue == 999) {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == null;
                    });
                    lstTempReportItems = ObjSorter(lstTempReportItems, ActiveVGroupBy, '123');
                }
                else {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == ActiveGroupvalue;
                    });
                    lstTempReportItems = ObjSorter(lstTempReportItems, ActiveVGroupBy, '123');
                }
                break;
            case 'master':
                var ActiveGroupvalue = $('[groupview-type].active').attr('groupview-typevalue');
                var ActiveAttr = $('[groupview-type].active').attr('groupview-attr');
                if (ActiveGroupvalue == 0) {
                    lstTempReportItems = ObjSorter(BillsList, ActiveVGroupBy, '123');
                }
                else if (ActiveGroupvalue == 999) {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == null;
                    });
                    lstTempReportItems = ObjSorter(lstTempReportItems, ActiveVGroupBy, '123');
                }
                else {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == ActiveGroupvalue;
                    });
                    lstTempReportItems = ObjSorter(lstTempReportItems, ActiveVGroupBy, '123');
                }
                break;
            case 'date':
                var ActiveGroupvalue = $('[groupview-type].active').attr('groupview-typevalue');
                var ActiveAttr = $('[groupview-type].active').attr('groupview-attr');
                if (ActiveGroupvalue == 0) {
                    lstTempReportItems = ObjSorterByDate(BillsList, ActiveVGroupBy, '123');
                }
                else if (ActiveGroupvalue == 999) {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == null;
                    });
                    lstTempReportItems = ObjSorterByDate(lstTempReportItems, ActiveVGroupBy, '123');
                }
                else {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == ActiveGroupvalue;
                    });
                    lstTempReportItems = ObjSorterByDate(lstTempReportItems, ActiveVGroupBy, '123');
                }
                break;
            case 'text':
                var ActiveGroupvalue = $('[groupview-type].active').attr('groupview-typevalue');
                var ActiveAttr = $('[groupview-type].active').attr('groupview-attr');
                if (ActiveGroupvalue == 0) {
                    lstTempReportItems = ObjSorter(BillsList, ActiveVGroupBy, '123');
                }
                else if (ActiveGroupvalue == 999) {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == null;
                    });
                    lstTempReportItems = ObjSorter(lstTempReportItems, ActiveVGroupBy, '123');
                }
                else {
                    lstTempReportItems = $.grep(BillsList, function (a, b) {
                        return a[ActiveAttr] == ActiveGroupvalue;
                    });
                    lstTempReportItems = ObjSorter(lstTempReportItems, ActiveVGroupBy, '123');
                }
                break;
        }
        if (lstTempReportItems.length > 0) {
            var DistinctItems = GetDistinctArray(lstTempReportItems, ActiveVGroupBy);
            var DistinctReportItems = GetDistinctArray(lstTempReportItems, 'BillID');
            ExcelVaultList(DistinctReportItems, 'Paymentsummarylist');
            $.each(DistinctItems, function (index, item) {
                // var workitemclassname = GetmatchedRecord(ParentType, 'typevalue', item["WorkItemType"]);
                var MatchedItems = GetmatchedRecord(lstTempReportItems, ActiveVGroupBy, item[ActiveVGroupBy]);
                if (item[ActiveVGroupBy] != null) {
                    // Vertical Group 
                    {
                        html += ' <tr class="isc-table-toggle-parent" role="row">';
                        html += '<td class="align-center">';
                        html += '<i class="fa isc-expand  fa-sort-down fa-plus fa-minus"></i>';
                        html += '</td>';
                        html += '<td>';
                        html += '<h5 class="">' + (item[ActiveVGroupBy] == null ? '-' : item[ActiveVGroupBy]) + '</h5>';
                        html += '</td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '</tr>';
                    }

                    // Body
                    {
                        if (MatchedItems.length > 0) {
                            MatchedItems = GetDistinctArray(MatchedItems, 'BillID');
                            $.each(MatchedItems, function (a, b) {
                                var amount = b["ApprovedAmount"];
                                amount = parseFloat(amount);
                                var today = moment().format('MM/DD/YYYY');
                                var dueDay = moment(b["DueOn"]);
                                html += '<tr class="isc-table-toggle-child" style="" role="row">';
                                html += '<td></td>';
                                html += '<td></td>';
                                html += '<td>';
                                html += '<h5 title="' + (b["InvoiceNumber"] == null || b["InvoiceNumber"] == '' ? '-' : b["InvoiceNumber"]) + '">' + (b["InvoiceNumber"] == null || b["InvoiceNumber"] == '' ? '-' : b["InvoiceNumber"]) + '</h5>';
                                html += '</td>';
                                html += '<td  title=' + (b["PurchaseOrder"] == null || b["PurchaseOrder"] == "" ? '-' : b["PurchaseOrder"]) + '>';
                                html += '<h5 class="">' + (b["PurchaseOrder"] == null || b["PurchaseOrder"] == "" ? '-' : b["PurchaseOrder"]);
                                html += '</h5>';
                                html += '</td>';
                                html += '<td data-identity=' + b["IdentityID"] + ' data-Status=' + b["PaymentStatus"] + ' title="' + (b["Description"] == null || b["Description"] == "" ? '-' : b["Description"]) + '">';
                                html += '<h5 style="color:#428bca !important;" data-Bill-Id=' + b["BillID"] + '>' + (b["Description"] == null || b["Description"] == "" ? '-' : b["Description"]);
                                html += '</h5>';
                                html += '</td>';
                                html += '<td>';
                                if (moment(today) <= dueDay) {
                                    html += '<h5 >' + (b["DueOn"] == null ? '-' : moment(b["DueOn"]).format('MM/DD/YYYY'));
                                }
                                else {
                                    html += '<h5 style="color:red !important;">' + (b["DueOn"] == null ? '-' : moment(b["DueOn"]).format('MM/DD/YYYY'));
                                }

                                html += '</h5>';
                                html += '</td>';
                                html += '<td>';
                                html += '<h5 style="">' + (b["PaidOn"] == null ? '-' : moment(b["PaidOn"]).format('MM/DD/YYYY'));
                                html += '</h5>';
                                html += '</td>';
                                html += '<td class="isc-bill-amt-pad" title="' + (amount == "" || amount == NaN ? '-' :  amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">';
                                html += '<h5 style="text-align: right;">' + (amount == "" || amount == NaN ? '-' : amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5>';
                                html += '</td>';
                                // var statusColor = GetStatusColor(item["PaymentStatus"]);
                                //  html += '<td title="' + (b["PaymentStatusName"] == null ? '-' : b["PaymentStatusName"]) + '">';
                                //html += ' <h5 class=' + statusColor + '>' + (b["PaymentStatusName"] == null ? '-' : b["PaymentStatusName"]);
                                html += GetStatusHTML(b["PaymentStatus"]);
                                //html += ' </h5>';
                                //html+='</td>';
                                html += '<td style="text-align: left;" data-identity=' + b["IdentityID"] + ' data-Status=' + b["PaymentStatus"] + '>';

                                //href="#mp_pay-det" data-toggle="modal"
                                if (b["PaymentStatus"] == '50036') {
                                    html += '<a  data-Bill-Id=' + b["BillID"] + '>  <img src="img/makepayment.png"  class="isc-make-pay" title="Pay Now"></a>';
                                }
                                else {
                                    html += '<a  data-Bill-Id=' + b["BillID"] + '>  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"></a>';
                                    if (b["PaymentStatus"] == '50025') {
                                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color:#25b4e9;"></i></a>';
                                    }

                                    else {
                                        html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#" data-flag=' + b["BillID"] + '><i class="fa fa-flag"></i></a>';
                                    }
                                    html += ' <a class="isc-action-badge-td-s1" title="Challenge" href="#" data-challenge=' + b["BillID"] + '><i class="fa fa-question-circle"></i></a>';
                                }


                                html += '</td>';
                                html += '</tr>';
                            });

                        }
                    }
                }
            });
        }
        else {
            html += '<tr><td colspan="12" ><p>No Data Found</p><td></tr>';
        }

        $('#payment-Summary-Table-Body').html(html);
    }

    var BindBillDetails = function () {
        if (payBillDetails.length > 0) {
            payBillDetails = $.parseJSON(payBillDetails[0]["Table"]);
            var amount = payBillDetails[0]["ApprovedAmount"];
            amount = parseFloat(amount);
            $('#lbl-Vendor-Name').text((payBillDetails[0]["VendorName"] == null ? '-' : payBillDetails[0]["VendorName"]));
            $('#lbl-invoice').text((payBillDetails[0]["InvoiceNumber"] == null ? '-' : payBillDetails[0]["InvoiceNumber"]));
            $('#lbl-Bill-Description').text((payBillDetails[0]["Description"] == null ? '-' : payBillDetails[0]["Description"]));
            $('#lbl-Approved-Amount').text((amount == "" || amount == NaN ? '-' : '$ ' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#lbl-Due-Date').text((payBillDetails[0]["DueDate"] == null ? '-' : moment(payBillDetails[0]["DueDate"]).format('MM/DD/YYYY')));
            $('#lbl-Payment-term').text((payBillDetails[0]["PaymentTermName"] == null ? '-' : payBillDetails[0]["PaymentTermName"]));
            $('#lbl-Approver-Comment').text((payBillDetails[0]["ApprovedComment"] == null ? '-' : payBillDetails[0]["ApprovedComment"]));
            if (payBillDetails[0]["PhysicalLocation"] != null && payBillDetails[0]["PhysicalLocation"] != "") {
                $('#file_Viewer').html('');
                var extension = payBillDetails[0]["PhysicalLocation"].substr((payBillDetails[0]["PhysicalLocation"].lastIndexOf('.') + 1));
                if (extension == 'pdf') {
                    $('#pdf-icon').show();
                    $('#img-icon').hide();
                }
                else {
                    $('#pdf-icon').hide();
                    $('#img-icon').show();
                }
                $('#billFileName').text(payBillDetails[0]["FileDisplayName"]);
                $('#billFileName').prop('title', payBillDetails[0]["FileDisplayName"]);
                //$('#btn-clear-file').show();
            }
            breakageList = GetunmatchedRecord(payBillDetails, 'BreakageTypeName', null)
            if (breakageList.length > 0) {
                BindBreakageList(breakageList);
            }
            else {
                $('#tbl-breakage-body').html('<p>No Data Found</p>')

            }
        }
    }

    var BindBreakageList = function (breakageList) {
        var html = ''
        var $el = $('#tbl-breakage-body')
        breakageList = GetDistinctArray(breakageList, 'BillBreakageID');
        $.each(breakageList, function (index, item) {
            var amount = item["BreakageAmount"];

            amount = parseFloat(amount);
                         html+=' <tr>';
                         html+=' <td>';
                         html += ' <h5>' + (item["BreakageTypeName"] == null ? '-' : item["BreakageTypeName"]) + '</h5>';
                         html+=' </td>';
                         html += ' <td title="' + (item["BreakageDescription"] == null ? '-' : item["BreakageDescription"]) + '">';
                         html += ' <h5>' + (item["BreakageDescription"] == null ? '-' : item["BreakageDescription"]);
                         html+=' </h5>';
                         html+=' </td>';
                         html+=' <td class="isc-bill-amt-pad">';
                         html += ' <h5 style="text-align:right;">' + (amount == "" || amount == NaN ? '-' : '$ ' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                         html+=' </h5>';
                         html+=' </td>';
                         html += ' </tr>';
        });
        $el.html(html);
    }

    var BillAttatchmentFrame = function (fileImage) {
        $('#billFrameBlock').html('');
        var iframe = document.getElementById("attachment_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "attachment_Frame";
            var iframewidth = 390;
            iframe.src = filePathUrl + fileImage;
            // iframe.src = "http://localhost:49504/images/FileBills/".concat(fileImage);
            //iframe.src = "http://localhost:49504/images/FileBills/sample.pdf";
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 470px; overflow: hidden; overflow-y: auto;")
            $('#billFrameBlock').append(iframe);
        }
    }

}

//Data Manipulation
{
    var GetFiltersData = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("PaymentSummary.aspx/GetPaymentSummaryMasterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetBillListData = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("PaymentSummary.aspx/GetPaymentSummaryList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetBillDetails=function()
    {
        var _obj = {
            'identityId': billIdentityId,
            'billId':payBillId
        }
        var tempList = {};
        $.when(RequestServer("PaymentSummary.aspx/GetPaymentBillData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ChallengeBill = function (billId, identityId) {
        var _obj = {
            'identityId': identityId,
            'billId': billId
        }
        var tempList = {};
        $.when(RequestServer("PaymentSummary.aspx/ChallengeBillToApprover", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            $.notify("Bill challenged successfully!!", {
                position: "right top", className: "success"
            });
        });
        return tempList;
    }

    var ChangeToflag = function (billId, IdentityId) {
        var _obj = {
            'billId': billId,
            'IdentityId': IdentityId
        }
        var tempList = {};
        $.when(RequestServer("FinancerHome.aspx/updateBillStatus", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            $.notify("Bill flagged successfully!!", {
                position: "right top", className: "success"
            });
            
        });
        return tempList;
    }
}

//Common
{
    var BindVendor = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'VendorID');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (vendorId != 0 && vendorId != '' && vendorId != null && vendorId == item["VendorID"]) {

                    html += '<option value="' + item["VendorID"] + '" selected>' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</option>';
                }
                else {
                    html += '<option value="' + item["VendorID"] + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</option>';
                }
              

            });
        }
        $el.html(html);
    }

    var BindBill = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'IdentityID');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["InvoiceNumber"] != null && item["InvoiceNumber"]!=''){
                    html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) + "/" + (item["InvoiceNumber"] == null || item["InvoiceNumber"] == "" ? "-" : item["InvoiceNumber"]) + '</option>';
                }
                else {
                    html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) +'</option>';
                }
               

            });
        }
        $el.html(html);
    }

    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                 if (item["KeyListID"] != 50033) {
                    html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

                }

            });
        }
        $el.html(html);
    }

    var filterBills = function () {
        var $elVendor = $('#slt-vendor').val();
        var $elBills = $('#slt-bill-invoice').val();
        var $elBillCategory = $('#slt-bill-category').val();
        var $elStatus = $('#slt-bill-status').val();
        var $date = $('#bill-date-range').val();

        var lstResult = [];
        if (filteredBillList.length > 0) {
            lstResult = filteredBillList;

            if ($elVendor != 0 && $elVendor != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["VendorID"] == $elVendor)
                });
            }

            if ($elBills != 0 && $elBills != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["BillID"] == $elBills)
                });
            }

            if ($elStatus != 0 && $elStatus != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["PaymentStatus"] == $elStatus)
                });
            }

            if ($date != 0 && $date != null && $date != "") {

                lstResult = $.grep(lstResult, function (a, b) {
                    return (moment(a["DueOn"]).format('MM/DD/YYYY') == $date)
                });
            }

        }
        return lstResult;
    }

    var GetStatusColor = function (status) {
        var colorClass = ''
        switch (status) {
            case "50026":
                colorClass = "isc-approved-color";
                break;
            case "50023":
                colorClass = 'isc-pending-color';
                break;
            case "50024":
                colorClass = 'isc-rejected-color'
            case "50036":
                colorClass = 'isc-rejected-color'
                break;
            case "50025":
                colorClass = 'isc-all-color';
                break;
            case "50033":
                colorClass = 'isc-draft-color'
                break;
        }
        return colorClass;

    }

    var GetStatusHTML = function (status) {
        var html = ''
        switch (status) {
            case "50026":
                html += '<td style="padding-left:42px;"><h5 style="color: #3AB050 !important;">Completed </h5></td>';
                break;
            case "50023":
                html += '<td style="padding-left:42px;"><h5 style="color: #00B0F0  !important;">Pending </h5></td>';
                break;
            case "50024":
                html += '<td style="padding-left:42px;"><h5 style="color: red !important;">Failed </h5></td>';
                break;
            case "50036":
                html += '<td style="padding-left:42px;"><h5 style="color:#FFBF00 !important;">Challenged </h5></td>';
                break;
            case "50025":
                html += '<td style="padding-left:42px;"><h5 style="color:#25b4e9 !important">Flagged </h5></td>';
                break;
            case "50033":
                html += '<td style="padding-left:42px;"><h5 style="color: #FFBF00 !important;">Challenged </h5></td>';
                break;
            default:
                html += '<td style="padding-left:42px;"><h5 style=""> - </h5></td>';
        }
        return html;

    }

}

//Excel Export
{
    var ExcelVaultList = function (lstexcelgiven, ExcelName) {
        if (lstexcelgiven.length > 0) {
            var Excelexportlist = lstexcelgiven.map(function (item) {
                var PayableAmount = parseFloat(item["ApprovedAmount"]);
                return {
                    "VendorName": (item.VendorName == null ? '-' : item.VendorName),
                    "Bills/Invoice#":  (item.InvoiceNumber == null || item.InvoiceNumber == '' ? '-' : item.InvoiceNumber),
                   // "Invoice": item.InvoiceNumber,
                    "PO": (item.PurchaseOrder == null ? '-' : item.PurchaseOrder),
                    "Description": (item.Description == null ? '-' : item.Description),
                    "DueDate": (item.DueOn == null ? '-' : moment(item.DueOn).format('MM/DD/YYYY')),
                    "PaidOn": (item.PaidOn == null ? '-' : moment(item.PaidOn).format('MM/DD/YYYY')),
                    "PayableAmount": (PayableAmount == "" ? 0 : '$' + PayableAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                    "PaymentStatusName": (item.PaymentStatusName == null ? '-' : item.PaymentStatusName)
                }
            });
            var ExcelList = JSON.stringify(Excelexportlist);
            $('#ContentPlaceHolder1_lstbillexport').val("");
            $('#ContentPlaceHolder1_lstbillexport').val(ExcelList);
           // $("#div_excel").css('visibility', 'visible');
        } else {
           // $("#div_excel").css('visibility', 'hidden');
            $('#ContentPlaceHolder1_lstbillexport').val("");
        }
    }
}
