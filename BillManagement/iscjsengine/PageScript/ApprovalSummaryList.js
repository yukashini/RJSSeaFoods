//GlobalVariable
{
    var filterList = [];
    var billList = [];
    var filteredBillList = [];
    var DeleteBillId = 0;

}

//LOAD && EVENTS
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
        BuildBillorInvoice();
        $loading.hide();
        }, 0);
    });

    //$(document).on('change', '#slt-Hgroupby', function () {
    //    BindListTabGroupBy();
    //    BindBillsInvoice();
    //});

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
        $('#slt-Hgroupby option[value="StatusName"]').prop('selected', 'selected').change();
        $('#slt-Vgroupby option[value="VendorName"]').prop('selected', 'selected').change();
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
        }, 0);
    })

    $(document).on('click', '[groupview-attr]', function (e) {
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var billFilterdList = filterBills();
        BindBillsInvoice(billFilterdList);
    });

    $(document).on('click', '#btn-filter-search', function () {
        $loading.show();
        setTimeout(function () {
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $loading.hide();
        }, 0);
    })

    $(document).on('click', '#btn-filter-reset', function () {
        $loading.show();
        setTimeout(function () {
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

    $(document).on('click', '[data-delete-Bill]', function () {
        DeleteBillId = $(this).attr('data-delete-Bill');
        if (DeleteBillId != undefined) {
            $('#mp_bill_Delete').show();
            DeleteBillId = parseInt(DeleteBillId);

        }
    });

    $(document).on('click', '[data-view-Bill]', function () {
        var attachmentBillId = $(this).attr('data-view-Bill');
        if (attachmentBillId != undefined) {
            var fileName = $(this).closest('td').attr('attachment-fileName');
            var fileDisplayName = $(this).closest('td').attr('attachmant-fileDisplayName');
            if (fileName != undefined && fileName != "" && fileName != 'null')
            {
                $('#fileName').text(fileDisplayName == undefined ? '-' : fileDisplayName);
                $('#fileName').prop('title', fileDisplayName == null ? '-' : fileDisplayName);
                BillAttatchmentFrame(fileName);
                $('#mp_bill-view').show();
            }
            else {
                $.notify("There is no attachment for this bill", { position: "right top", className: "error" });
            }
        }

    });

    $(document).on('click', '#attachment-close', function () {

        $('#mp_bill-view').hide();
    });

    $(document).on('click', '#btn-delete-ok', function () {
        DeletePendingSubmissionBill(DeleteBillId);
        billList = GetBillListData();
        billList = $.parseJSON(billList[0]["Table"]);
        filteredBillList = billList;
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
        $('#mp_bill_Delete').hide();
    });

    $(document).on('click', '[delete-cancel]', function () {

        DeleteBillId = 0;
        $('#mp_bill_Delete').hide();

    })
}

//DOM Manipulation
{
    var BuildBillorInvoice = function () {
        filterList = GetFilterList();
        BindFilters();
        billList = GetBillListData();
        billList = $.parseJSON(billList[0]["Table"]);
        filteredBillList = billList;
        var billFilterdList = filterBills();
        BindListTabGroupBy(billFilterdList);
        BindBillsInvoice(billFilterdList);
    }

    var BindFilters = function () {
        BindVendor($('#slt-vendor'), $.parseJSON(filterList[0]["Table"]), 'Choose Vendor');
        BindBill($('#slt-bill-invoice'), $.parseJSON(filterList[1]["Table1"]), 'Choose Bill/Invoice');
        BindDropDowns($('#slt-bill-category'), $.parseJSON(filterList[2]["Table2"]), 'Choose Bill Category');
        BindDropDowns($('#slt-bill-status'), $.parseJSON(filterList[3]["Table3"]), 'Choose Status');
        BinGroupByDropDown($('#slt-Vgroupby'), $.parseJSON(filterList[4]["Table4"]));
        BinGroupByDropDown($('#slt-Hgroupby'), $.parseJSON(filterList[5]["Table5"]));
        $('#slt-Vgroupby option[value="VendorName"]').prop('selected', 'selected').change();
        $('#slt-Hgroupby option[value="StatusName"]').prop('selected', 'selected').change();
        $('#bill-date-range').mask('00/00/0000')
        $('.select2').select2();

        // BindDropDowns($('#slt-bill-status'), $.parseJSON(filterList[3]["Table3"]), 'Choose Status');
        // BindDropDowns($('#slt-bill-status'), $.parseJSON(filterList[3]["Table3"]), 'Choose Status');
    }

    var BindListTabGroupBy = function (BillsList) {
        var $el = $('#lst-Horizontal-tabs');
        var html = '';
        var GroupByType = $('#slt-Hgroupby :selected').attr('attr-type');
        var GroupValue = $('#slt-Hgroupby').val();
        html += ' <li class="active" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="0"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">All <span>(' + BillsList.length + ')</span></a></li>';
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
                            html += ' <span >(' + MatchedRecords.length + ')</span></a></li>';
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
                            html += ' <span >(' + MatchedRecords.length + ')</span></a></li>';
                            //html += '<li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#">' + item[GroupValue] + ' (' + MatchedRecords.length + ')</a> </li>';
                        }
                    });
                }
                break;
            case 'master':
                if (BillsList.length > 0) {
                    if (GroupValue == "StatusName") {
                        var distinct = GetDistinctArray(BillsList, GroupValue);
                        distinct = ObjSorter(distinct, GroupValue, '123');
                        $.each(distinct, function (index, item) {
                            if (item[GroupValue] != null) {
                                var MatchedRecords = GetmatchedRecord(BillsList, GroupValue, item[GroupValue]);
                                var displayTabText = item[GroupValue]
                                if (item["Status"] == "50019") {
                                    displayTabText = "Draft";
                                }
                              //  var statusColor = GetStatusColor(item["Status"]);
                                html += ' <li class="" groupview-attr="' + GroupValue + '" groupview-type="' + GroupByType + '" groupview-typevalue="' + item[GroupValue] + '"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab">' + displayTabText + ' ';
                                html += ' <span>(' + MatchedRecords.length + ')</span></a></li>';
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
                                html += ' <span class="isc-draft-color">' + MatchedRecords.length + '</span></a></li>';
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
                            html += ' <span>(' + MatchedRecords.length + ')</span></a></li>';
                        }
                    });
                }
                break;
        }

        $el.html(html);
        $('#lst-Horizontal-tabs').scrollingTabs();

    }

    var BindBillsInvoice = function (BillsList) {
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

            // Unspecified
            //{
            //    var NullMatchedItems = $.grep(lstTempReportItems, function (a, b) {
            //        return a[ActiveVGroupBy] == null
            //    });
            //    if (NullMatchedItems.length > 0) {

            //        // Vertical Group 
            //        {
            //            html += '<tr >';
            //            html += '<td style="width: 8%;"><h2>-</h2></td>';
            //            html += '<td style="width: 9%;"><h2>-</h2></td>';
            //            html += '<td style="width: 31%;">';
            //            html += '<div class="screen-row"><div class="div-col-50per">';
            //            html += '<h6 title="Unspecified"><span><i class="fa fa-angle-down isc-list-indent-right" data-parentitems="0"></i></span><i class="fa fa-user isc-nst-list-epic-icon-clr "></i><a href="#">Unspecified</a></h6>';
            //            html += '</div>';
            //            html += '<div class="div-col-50per">';
            //            html += '<ul class="isc-list-kpi-legnd-s1">';

            //            var Feature = $.grep(lstTempReportItems, function (value, key) {
            //                return (value[ActiveVGroupBy] == null && value["WorkItemType"] == 4052)
            //            });
            //            var UserStory = $.grep(lstTempReportItems, function (value, key) {
            //                return (value[ActiveVGroupBy] == null && value["WorkItemType"] == 4054)
            //            });
            //            var Task = $.grep(lstTempReportItems, function (value, key) {
            //                return (value[ActiveVGroupBy] == null && value["WorkItemType"] == 4055)
            //            });
            //            var Bugs = $.grep(lstTempReportItems, function (value, key) {
            //                return (value[ActiveVGroupBy] == null && value["WorkItemType"] == 4051)
            //            });

            //            html += '<li><a title="Feature" class="isc-list-lgnd-feature">' + Feature.length + '</a></li>';
            //            html += '<li><a title="User Story" class="isc-list-lgnd-userstry">' + UserStory.length + '</a></li>';
            //            html += '<li><a title="Task" class="isc-list-lgnd-tsk">' + Task.length + '</a></li>';
            //            html += '<li><a title="Bugs" class="isc-list-lgnd-bug">' + Bugs.length + '</a></li>';

            //            html += '</ul>';
            //            html += '</div>';
            //            html += '</div>';
            //            html += '</td>';

            //            html += '<td colspan="4" style="width: 39%;></td>';
            //            html += '<td colspan="2" style="width: 17%;">';
            //            html += '<ul class="isc-list-kpi-legnd-s1 isc-list-lgn-cust-s1">';
            //            var NDistinctStates = GetDistinctArray(NullMatchedItems, 'State');
            //            $.each(NDistinctStates, function (c, d) {

            //                if (d["State"] != null) {
            //                    var MatchedStates = $.grep(NullMatchedItems, function (e, f) {
            //                        return e["State"] == d["State"]
            //                    });
            //                    html += '<li><a class="isc-list-lgnd-userstry" title="' + d["StateName"] + '">' + MatchedStates.length + '</a></li>';
            //                }
            //            });
            //            html += '</ul>';
            //            html += '</td>';

            //            html += '</tr>';
            //        }

            //        // Body
            //        {
            //            if (NullMatchedItems.length > 0) {
            //                $.each(NullMatchedItems, function (a, b) {
            //                    var workitemclassname = GetmatchedRecord(ParentType, 'typevalue', b["WorkItemType"]);

            //                    html += '<tr class="isc-bg-clr-active" data-childitem="0" style="width:8%;">';
            //                    html += '<td style="width:9%;" title="' + NullHandlingInteger(b["WorkItemID"]) + '"><h2>' + NullHandlingInteger(b["WorkItemID"]) + '</h2></td>';
            //                    html += '<td title="' + NullHandling(b["WorkItemTypeName"]) + '"><h2 class="">' + NullHandling(b["WorkItemTypeName"]) + '</h2></td>';
            //                    html += '<td style="width:27%;">';
            //                    html += '<div class="screen-row">';
            //                    html += '<div class="div-col-90per">';
            //                    html += '<h6 class="isc-nst-list-lbl-intnd-s1 pad-lft-20">';
            //                    html += '<i class="' + workitemclassname[0]["icn"] + '"></i><a href="#" title="' + NullHandling(b["Title"]) + '">' + NullHandling(b["Title"]) + '</a>';
            //                    html += '</h6>';
            //                    html += '</div></div>';
            //                    html += '</td>';
            //                    html += '<td style="width:10%;" title="' + NullHandling(b["ProjectName"]) + '"><h5>' + NullHandling(b["ProjectName"]) + '</h5></td>';
            //                    html += '<td style="width:10%;" title="' + NullHandling(b["Path"]) + '"><h4>' + NullHandling(b["Path"]) + '</h4></td>';
            //                    html += '<td style="width:10%;" title="' + NullHandling(b["AssignedToName"]) + '"><h5>' + NullHandling(b["AssignedToName"]) + '</h5></td>';
            //                    html += '<td style="width:9%;" title="' + (b["DueDay"] == null ? '-' : moment(b["DueDay"]).format('MMM D')) + '"><h5>' + (b["DueDay"] == null ? '-' : moment(b["DueDay"]).format('MMM D')) + '</h5></td>';
            //                    html += '<td style="width:10%;" title="' + NullHandling(b["StateName"]) + '"><h5>' + NullHandling(b["StateName"]) + '</h5></td>';
            //                    html += '<td style="width:7%;" title="' + NullHandling(b["WorkItemSubTypeName"]) + '"><h5>' + NullHandling(b["WorkItemSubTypeName"]) + '</h5></td>';
            //                    html += '</tr>';
            //                });
            //            }
            //        }
            //    }
            //}

            $.each(DistinctItems, function (index, item) {
                // var workitemclassname = GetmatchedRecord(ParentType, 'typevalue', item["WorkItemType"]);
                var MatchedItems = GetmatchedRecord(lstTempReportItems, ActiveVGroupBy, item[ActiveVGroupBy]);
                if (item[ActiveVGroupBy] != null) {
                    // Vertical Group 
                    {
                        html += '<tr class="isc-table-toggle-parent" role="row" parent-row="true">';
                        html += '<td class="align-center">';
                        html += '<i class="fa isc-expand fa-sort-up"></i>';
                        html += '</td>';
                        html += '<td>';
                        html += '<h5 class="">' + (item[ActiveVGroupBy] == null ? '-' : item[ActiveVGroupBy]) + '';
                        html += '</h5>';
                        html += '</td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td></td>';
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
                            $.each(MatchedItems, function (a, b) {
                                var today = today = moment().format('MM/DD/YYYY');
                                var dueDay = moment(b["DueDate"]);
                                var amount = b["Amount"];
                                amount = parseFloat(amount);
                                var balanceAmount = b["Balance"];
                                var approvedAmount = '';
                                if (b["Balance"] != null && b["Balance"] != '') {
                                    balanceAmount = parseFloat(balanceAmount)
                                    approvedAmount = amount - balanceAmount;
                                }
                                else {
                                    balanceAmount = '';
                                    approvedAmount = '';
                                }


                                html += '<tr class="isc-table-toggle-child" style="display: table-row;" role="row">';
                                html += '<td class="align-center"></td>';
                                html += '<td title="' + (b["Description"] == null || b["Description"] == "" ? '-' : b["Description"]) + '">';
                                //href="ApprovalDetails.aspx?BillID=' + b["BillID"] + '" 
                                html += '<h5><a >' + (b["Description"] == null || b["Description"] == "" ? '-' : b["Description"]) + '</a></h5>';
                                html += '</td>';
                                html += '<td><h5 class="">' + (b["InvoiceNumber"] == null || b["InvoiceNumber"] == '' ? "-" : b["InvoiceNumber"]) + '</h5></td>';
                                //html += '<td title="' + (b["CategoryName"] == null ? '-' : b["CategoryName"]) + '"><h5 class="" >' + (b["CategoryName"] == null ? '-' : b["CategoryName"]) + '	</h5></td>';
                                html += '<td><h5>' + (b["PurchaseOrder"] == null ? 'N/A' : b["PurchaseOrder"]) + '</h5>	</td>';
                               // html += '<td><h5>' + (b["BillDate"] == null ? '-' : moment(b["BillDate"]).format('MM/DD/YYYY')) + '</h5></td>';
                                if (moment(today) <= dueDay) {
                                    html += '<td><h5 >' + (b["DueDate"] == null ? '-' : moment(b["DueDate"]).format('MM/DD/YYYY')) + '</h5></td>';
                                }
                                else {
                                    html += '<td><h5 style="color:red !important;">' + (b["DueDate"] == null ? '-' : moment(b["DueDate"]).format('MM/DD/YYYY')) + '</h5></td>';
                                }
                                html += '<td><h5 style="text-align:right;" title="' + (amount == "" || amount == NaN ? '-' :  amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (amount == "" || amount == NaN ? '-' :amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>';

                                html += '<td class="text-right"><h5  title="' + (approvedAmount == "" || approvedAmount == NaN ? '-' :  approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (approvedAmount == "" || approvedAmount == NaN ? '-' :approvedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>';
                                html += '<td class="text-right"><h5 title="' + (balanceAmount == "" || balanceAmount == NaN ? '-' : balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '">' + (balanceAmount == "" || balanceAmount == NaN ? '-' :balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + '</h5></td>';
                                //if (b["Balance"] != null && b["Balance"] !="")
                                //{
                                //    html += '<td><h5 style="color: #00B0F0  !important;">Pending</h5></td>';
                                //}
                                //else {
                                html += GetStatusHTML(b['Status'])
                                // }

                                html += '<td attachment-fileName="' + b["FileName"] + '" attachmant-fileDisplayName="' + b["FileDisplayName"] + '">';
                                if(b["Status"] == "50034")
                                {
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5"  data-view-Bill="' + b["BillID"] + '" title="View Bill"><i class="fa fa-paperclip"></i></a>';
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Approve" href="ApprovalDetails.aspx?BillID=' + b["BillID"] + '"><i class="fa fa-check-circle-o isc-exp-man-icn1"></i></a>';
                                }
                               else if (b["Status"] != "50015" && b["Status"] != "50017") {
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5"  data-view-Bill="' + b["BillID"] + '" title="View Bill"><i class="fa fa-paperclip"></i></a>';
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Approve" href="ApprovalDetails.aspx?BillID=' + b["BillID"] + '"><i class="fa fa-check-circle-o isc-exp-man-icn1"></i></a>';
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5" title="Reject" href="ApprovalDetails.aspx?BillID=' + b["BillID"] + '"><i class="fa fa-times-circle-o isc-exp-man-icn2"></i></a>';
                                }

                                else {
                                    html += '<a class="isc-action-badge-td-s1 pad-lft-5"  data-view-Bill="' + b["BillID"] + '" title="View Bill"><i class="fa fa-paperclip"></i></a>';
                                }
                             
                                html += '</td>';
                                //html += '<td style="text-align:center;">';
                                //html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-view-Bill="' + b["BillID"] + '" title="View Bill" ><i class="fa fa-paperclip"></i></a>';
                                //html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-edit-Bill="' + b["BillID"] + '" title="Edit" href="BillSubmit.aspx?BillID=' + b["BillID"] + '"><i class="fa fa-pencil-square-o"></i></a>';
                                //html += '<a class="isc-action-badge-td-s1 pad-lft-5" data-delete-Bill="' + b["BillID"] + '" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>';
                                //html += '</td>';
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

        $('#tbl-bill-invoice-body').html(html);
    }

    var GetStatusHTML = function (status) {
        var html = ''
        switch (status) {
            case "50015":
                html += '<td style="padding-left:20px;"><h5 style="color: #3AB050 !important;">Approved </h5></td>';
                break;
            case "50034":
                html += '<td style="padding-left:20px;" ><h5 style="color: #3AB050 !important;">Partial Approved </h5></td>';
                break;
            case "50016":
                html += '<td style="padding-left:20px;"><h5 style="color: #00B0F0  !important;">Pending </h5></td>';
                break;
            case "50017":
                html += '<td style="padding-left:20px;"><h5 style="color: red !important;">Rejected </h5></td>';
                break;
            case "50036":
                html += '<td style="padding-left:20px;"><h5 style="color: #FFBF00 !important;">Challenged </h5></td>';
                break;
            case "50018":
                html += '<td style="padding-left:20px;"><h5 style="">Flagged </h5></td>';
                break;
            case "50019":
                html += '<td style="padding-left:20px;"><h5 style="color: #FFCA00 !important;">Draft </h5></td>';
                break;
            default:
                html += '<td style="padding-left:20px;"><h5 style=""> - </h5></td>';
        }
        return html;

    }

    var GetStatusColor = function (status) {
        var colorClass = ''
        switch (status) {
            case "50015":
                colorClass = "isc-approved-color";
                break;
            case "50034":
                colorClass = "isc-approved-color";
                break;
            case "50016":
                colorClass = 'isc-pending-color';
                break;
            case "50017":
                colorClass = 'isc-rejected-color'
            case "50036":
                colorClass = 'isc-rejected-color'
                break;
            case "50018":
                colorClass = 'isc-all-color';
                break;
            case "50019":
                colorClass = 'isc-draft-color'
                break;
        }
        return colorClass;

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

//DATA Manipulation
{
    var GetFilterList = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("ApprovalSummaryList.aspx/GetApprovalSummaryMasterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetBillListData = function () {
        var _obj = {

        }
        var tempList = {};
        $.when(RequestServer("ApprovalSummaryList.aspx/GetApprovalSummaryList", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var DeletePendingSubmissionBill = function (billID) {
        var _obj = {
            'billID': billID
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/DeleteBill", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var GetBillAttachment = function (billId) {
        var _obj = {
            'billID': billId
        }
        var tempList = {};
        $.when(RequestServer("UploadBills.aspx/GetBillAttachmentDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{
    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["KeyListID"] != 50019) {
                    html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';

                }
            
            });
        }
        $el.html(html);
    }

    var BindVendor = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'VendorID');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                html += '<option value="' + item["VendorID"] + '">' + (item["VendorName"] == null ? '-' : item["VendorName"]) + '</option>';

            });
        }
        $el.html(html);
    }

    var BindBill = function ($el, lst, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'BillID');
            if (DefaultItem != "") {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(distinctlst, function (index, item) {
                if (item["InvoiceNumber"] != null && item["InvoiceNumber"] != "") {
                    html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) + "/" + (item["InvoiceNumber"] == null ? "-" : item["InvoiceNumber"]) + '</option>';
                }
                else {
                    html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) + '</option>';
                }
                //html += '<option value="' + item["BillID"] + '">' + (item["BillID"] == null ? "-" : item["BillID"]) + "/" + (item["InvoiceNumber"] == null ? "-" : item["InvoiceNumber"]) + '</option>';
            });
        }
        $el.html(html);
    }

    var BinGroupByDropDown = function ($el, lst, selected) {
        var html = '';
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            $.each(distinctlst, function (index, item) {
                if (item["KeyListID"] == selected) {
                    html += '<option  value="' + item["Value2"] + '" attr-type=' + item["Value4"] + '>' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
                } else {
                    html += '<option value="' + item["Value2"] + '" attr-type=' + item["Value4"] + '>' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
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
                    return (a["Status"] == $elStatus)
                });
            }

            if ($elBillCategory != 0 && $elBillCategory != null) {
                lstResult = $.grep(lstResult, function (a, b) {
                    return (a["Category"] == $elBillCategory)
                });
            }

            if ($date != 0 && $date != null && $date != "") {

                lstResult = $.grep(lstResult, function (a, b) {
                    return (moment(a["DueDate"]).format('MM/DD/YYYY') == $date)
                });
            }

        }
        return lstResult;
    }
}
