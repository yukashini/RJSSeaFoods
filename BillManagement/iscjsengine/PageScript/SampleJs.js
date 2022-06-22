

//Global Variables
{
    var TOTAL_RECORDS = 0;
    var VERTICAL_GROUPBY = 1010;
    var ORDER_BY = 2;
    var ACTIVE_TAB_VALUE = 0;
    var ACTIVE_TAB_COLUMN = '';
    var TAB_VALUE = 0;
    var IS_VERTICAL_GROUP_BY = true;
    var IsSaveFilterData = false;
    var PAGE_NUMBER = 1;
    var PAGE_SIZE = 10;
    var ExportCount = 0;
    var employeeList = [];
    var OrderBy = 'UpdatedOn desc';

}

$(document).ready(function () {
    $loading.show();
    setTimeout(function () {
        EmployeeList.Init();
        $loading.hide();
    }, 0);
});

var EmployeeList = (function () {
    var lstview = [];
    var lstOptions = [];
    var filterlst = [];
    var filter = {};
    var Init = function () {
        dom.BindAccess();
        lstview = Empdata.GetViewList();
        dom.BindGroupByOptionSet(lstview);

        lstOptions = Empdata.GetOptionList();
        dom.BindFilterList();
        common.RegisterSelectPicker();
        Empdata.SetFilterValues();
        Empdata.GetEmployeeList();
        dom.BindHorizontalGroupByHeader();
        var lstSavedData = service.GetSavedFilterData();
        lstSavedData = lstSavedData["ScreenFilters"];
        dom.BindSavedFilter(lstSavedData);
    }
    var ReloadData = function () {
        Empdata.SetFilterValues();
        employeeList = Empdata.GetEmployeeList();
        dom.BindEmployeeList();
        //dom.InitiatePagination(TOTAL_RECORDS);
    }
    var Empdata = {
        GetViewList: function () {
            return service.GetViewList();
        },
        GetHiddenColumns: function () {
            var lstHiddenColumns = [];

            $('[data-th-column-isvisible]').each(function (index, item) {
                var isVisible = $(this).attr('data-th-column-isvisible');
                if (isVisible != "true") {
                    var columnSeq = parseInt($(this).attr('data-th-sequence'));
                    //var columnSeq = parseInt($('[data-th-column-id="' + viewid + '"]').attr('data-th-sequence'));
                    lstHiddenColumns.push(columnSeq);
                }
            });

            return lstHiddenColumns;
        },
        GetEmployeeList: function () {
            dom.BindEmployeeList();
        },
        ConfigurePaginationModel: function (objModel) {
            var obj = {};
            obj.start = objModel.start;
            obj.skip = objModel.length;
            obj.empid = Employee_ID
            obj.empids = filter.empids;
            obj.OrgID = UserPermissionID == 1010 ? 0 : GVOrganisationID;
            obj.designationids = filter.designationids;
            obj.departmentids = filter.departmentids;
            obj.statusids = filter.statusids;
            obj.businessunitids = filter.businessunitids;
            obj.organisationids = filter.organisationids;
            obj.shiftids = filter.shiftids;
            obj.legalentityids = filter.legalentityids;
            obj.dateofJoining = filter.doj;
            obj.hfiltervalue = ACTIVE_TAB_VALUE;
            obj.hfiltercolumn = ACTIVE_TAB_COLUMN;
            obj.pageid = PageConfiguration.EmployeeListView;
            if (OrderBy !== '') {
                obj.orderBy = OrderBy;
            }
            else {
                obj.orderBy = Empdata.ConfigureOrderBy(objModel);
            }

            obj.verticalorderBy = Empdata.ConfigureVerticalOrderBy(objModel);
            obj.empid = Employee_ID;

            return obj;
        },
        ConfigureVerticalOrderBy: function (objModel) {
            var sortingcolumnSeq = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            var orderBy = "";

            if (IS_VERTICAL_GROUP_BY) {
                //var verticalcolumnseq = $('[data-th-column-id="' + VERTICAL_GROUPBY + '"]').attr('data-th-sequence');
                var verticalcolumnseq = this.GetColumnSequence(VERTICAL_GROUPBY);
                if (sortingcolumnSeq == verticalcolumnseq) {
                    orderBy = "";
                }
                else {
                    orderBy = $('[data-th-column-id="' + VERTICAL_GROUPBY + '"]').attr('data-vertical-orderby');
                }
            }

            //orderBy = "EmployeeName";
            return orderBy;
        },
        GetOptionSets: function () {
            var lst = [];
            $.each(OptionSets.GeneralInfo, function (key, value) {
                lst.push(value);
            });

            return lst;
        },
        BindHorizontalGroupByHeader: function () {
            if ($('#horizontalGroupBy').val() != '0') {
                var lstGroupBy = service.GetGroupByValues();
                dom.BindHorizontalGroupByHeader(lstGroupBy);
            }
            else {
                var lstGroupBy = [];
                dom.BindHorizontalGroupByHeader(lstGroupBy);
            }
        },
        ConfigureOrderBy: function (objModel) {
            var columnSeq = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            var orderBy = "";
            //var columnName = $('[data-view-seq="' + columnSeq + '"]').attr('data-view-column-name');
            var columnName = this.GetColumnNameBySequence(columnSeq);
            orderBy = columnName + " " + direction;

            if (IS_VERTICAL_GROUP_BY) {
                //var verticalcolumnseq = $('[data-view-id="' + VERTICAL_GROUPBY + '"]').attr('data-view-seq');
                //var verticalcolumnseq = $('[data-th-column-id="' + VERTICAL_GROUPBY + '"]').attr('data-th-sequence');
                var verticalcolumnseq = this.GetColumnSequence(VERTICAL_GROUPBY);
                if (verticalcolumnseq == columnSeq) {
                    //$('[data-view-id="' + VERTICAL_GROUPBY + '"]').attr('data-vertical-orderby', orderBy);
                    $('[data-th-column-id="' + VERTICAL_GROUPBY + '"]').attr('data-vertical-orderby', orderBy);
                }
            }
            //orderBy = "EmployeeName";
            return orderBy;
        },
        ResetFilter: function () {
            $("#divFilterContainer [data-filter-column]").val("");
            $(".fselect option").prop("selected", false);
            $('.fselect').fSelect('reload');
            ACTIVE_TAB_VALUE = 0;
            common.RegisterSelectPicker();
            Empdata.SetFilterValues();
        },
        ResetGroupBy: function () {
            ACTIVE_TAB_VALUE = 0;
            ACTIVE_TAB_COLUMN = 0;
            $('#horizontalGroupBy').val('0');
            $('#verticalGroupBy').val('0');
            IS_VERTICAL_GROUP_BY = false;
            common.RegisterSelectPicker();
        },
        FilterListOfFields: function (columnValue) {
            $("#viewList li").each(function (index, item) {
                if ($.trim($(this).text().toLowerCase()).startsWith(columnValue.toLowerCase())) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        },
        SaveView: function () {
            var lstView = [];
            $('input[name="view"]:checked').each(function (index, item) {
                var viewID = $(this).attr('data-view-id');
                lstView.push(viewID)
            });

            service.SaveView(lstView);
            lstview = Empdata.GetViewList();
        },
        GetFilterValues: function () {
            return filter;
        },
        ShowGroupByColumnHeader: function () {
            var columnId;
            $.each(lstview, function (index, item) {

                if (item.isVisible) {
                    columnId = item.ParameterConfigurationID;
                    return false;
                }

            });

            var actualColumnName = $(`[data-th-column-id="${columnId}"]`).attr('data-th-colum-name');

            var data = $('#verticalGroupBy').select2('data');
            var groupByColumnName = data[0].text;

            $(`[data-th-column-id="${columnId}"]`).html(actualColumnName + ' / ' + groupByColumnName);
            $(`[data-th-column-id="${columnId}"]`).prop('title', actualColumnName + ' / ' + groupByColumnName)
        },
        HideGroupByColumnHeader: function () {
            var columnId;
            $.each(lstview, function (index, item) {

                if (item.isVisible) {
                    columnId = item.ParameterConfigurationID;
                    return false;
                }

            });

            var columnName;
            var groupbyColumnName = $(`[data-th-column-id="${columnId}"]`).attr('data-th-colum-name');
            if (common.NFE(groupbyColumnName) != "") {
                if (groupbyColumnName.indexOf('/') == -1) {
                    columnName = groupbyColumnName
                }
                else {
                    var columnNames = groupbyColumnName.split('/');
                    columnName = columnNames[0];
                }

                $(`[data-th-column-id="${columnId}"]`).html(columnName);
            }
        },
        SetFilterValues: function () {
            var empids = $('#filterEmployeeID').val();
            var designationids = $('#filterDesignationID').val();
            var departmentids = $('#filterDepartmentID').val();
            var statusids = $('#filterEmploymentStatusID').val();
            var businessunitids = $('#filterBusinessUnitID').val();
            var organisationids = $('#filterOrganisationID').val();
            var shiftids = $('#filterShiftID').val();
            var legalentityids = $('#filterLegalEntityID').val();
            var doj = $('#filterDOJ').val();

            filter.empids = common.NFE(empids) != "" ? empids.join(',') : "";
            filter.designationids = common.NFE(designationids) != "" ? designationids.join(',') : "";
            filter.departmentids = common.NFE(departmentids) != "" ? departmentids.join(',') : "";
            filter.statusids = common.NFE(statusids) != "" ? statusids.join(',') : "";
            filter.businessunitids = common.NFE(businessunitids) != "" ? businessunitids.join(',') : "";
            filter.organisationids = common.NFE(organisationids) != "" ? organisationids.join(',') : "";
            filter.shiftids = common.NFE(shiftids) != "" ? shiftids.join(',') : "";
            filter.legalentityids = common.NFE(legalentityids) != "" ? legalentityids.join(',') : "";
            filter.doj = common.NFE(doj) != "" ? doj : "";
        },
        GetOptionList: function () {
            return service.GetOptionList();
        },
        GetColumnSequence: function (columnId) {
            return lstview.filter(x => x.ParameterConfigurationID == parseInt(columnId))[0].Sequence;
        },
        GetColumnNameBySequence: function (sequence) {
            return lstview.filter(x => x.Sequence == parseInt(sequence))[0].ReadAttribute;
        }
    }
    var dom = {
        BindFilterList: function () {

            var html = '';
            let count = 1;

            $.each(filterlst, function (index, item) {
                if (count == 1)
                    html += `<div class="isc-screen-row">
                                    <div class="isc-filter-options">`;
                html += `<div class="isc-filter-item isc-pos-rel">
                                            <div class="isc-filter-label">
                                                ${item.DisplayName}
                                            </div>
                                            <div class="isc-filter-details">`;
                html += dom.BindControls(item);

                html += `</div>

                                        </div>`;
                if (count == 5) {
                    html += `</div></div>`;
                    count = 1;
                }
                else
                    count++;
            });

            $('#divFilterContainer').html(html);

            //var lstDepartment = common.AUF(lstOptions["Department"]);
            //var lstDesignation = common.AUF(lstOptions["Designation"]);
            //var lstEmploymentStatus = common.AUF(lstOptions["EmploymentStatus"]);

            //var departmentHtml = '<option value="0">Select</option>';
            //var designationHtml = '<option value="0">Select</option>';
            //var employmentSatusHtml = '<option value="0">Select</option>';


            //$.each(lstDepartment, function (index, item) {

            //    departmentHtml += `<option title="${item.DepartmentName}" value="${item.DepartmentID}">${item.DepartmentName}</option>`;

            //});
            //$.each(lstDesignation, function (index, item) {

            //    designationHtml += `<option title="${item.DesignationName}" value="${item.DesignationID}">${item.DesignationName}</option>`;

            //});
            //$.each(lstEmploymentStatus, function (index, item) {

            //    employmentSatusHtml += `<option title="${item.EmploymentStatusName}" value="${item.EmploymentStatusID}">${item.EmploymentStatusName}</option>`;

            //});

            //$('#filterDepartment').html(departmentHtml);
            //$('#filterDesignation').html(designationHtml);
            //$('#filterStatus').html(employmentSatusHtml);

        },
        BindControls: function (item) {
            var html = '';
            switch (parseInt(item.FieldType)) {
                case 1244:
                    var lstFilterOptions = common.AUF(lstOptions[item.FilterColumn]);
                    html += ` <select data-filter-column="${item.GroupByReadAttribute}" id="filter${item.GroupByReadAttribute}" default-text="Choose ${item.DisplayName}" class="fselect" screenfilterpersistence="true" filterelement="filter${common.NFE(item.GroupByReadAttribute) != '' ? item.GroupByReadAttribute : item.ReadAttribute}" filtertype="multiple" multiple="multiple" data-type="select">`;
                    html += dom.BindSelectOptions(lstFilterOptions);
                    html += `</select>`;
                    break;
                case 1248:
                    html += `<input type="date" data-filter-column="${item.GroupByReadAttribute}" class="required isc-form-control1" placeholder="Enter ${item.DisplayName}" id="filter${item.GroupByReadAttribute}" screenfilterpersistence="true" filterelement="filter${common.NFE(item.GroupByReadAttribute) != '' ? item.GroupByReadAttribute : item.ReadAttribute}" filtertype="single" aria-required="true">`;
                    break;

            }
            return html;
        },
        BindSelectOptions: function (lstOptions) {
            var html = "";
            $.each(lstOptions, function (index, item) {
                html += `<option value="${item.KeyID}" title="${item.KeyName}">${item.KeyName}</option>`;
            });
            return html;
        },
        BindEmployeeList: function () {
            dom.BindTableHeader();
            //if (IS_VERTICAL_GROUP_BY) {
            //    data.ShowGroupByColumnHeader();
            //}
            //else {
            //    data.HideGroupByColumnHeader();
            //}
            var tableBodyStartAt = 110;
            var screenFooterHeight = 200;
            var wHeight = $(window).height();
            var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
            $('#tblEmployeeList').DataTable({
                'bServerSide': true,
                "pagingType": "full_numbers",
                'bPaginate': true,
                "scrollY": tableAvailabeHeight + "px",
                "ajax": {
                    "url": API_URL + "Employees/GetEmployeeList",
                    contentType: "application/json;",
                    dataType: "json",
                    type: "POST",
                    async: false,
                    "data": function (dataTableModel) {
                        var obj = Empdata.ConfigurePaginationModel(dataTableModel);
                        //return JSON.stringify(obj);
                        return JSON.stringify(obj);
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
                    },
                    "dataSrc": function (json) {
                        var objData = json;
                        json.data = common.AUF(objData["result"]["EmployeeList"]);
                        json.recordsTotal = objData["result"]["AllCount"][0].EmployeeCount;
                        TOTAL_RECORDS = objData["result"]["AllCount"][0].EmployeeCount;
                        json.recordsFiltered = objData["result"]["AllCount"][0].EmployeeCount;
                        ExportCount = TOTAL_RECORDS;
                        return json.data;
                    }

                },
                "columnDefs": [
                    {
                        "targets": Empdata.GetHiddenColumns(),
                        "visible": false
                    }
                ],
                "autoWidth": false,
                "bFilter": false,
                'bDestroy': true,
                'bInfo': false,
                "pageLength": 10,
                'bLengthChange': false,
                'scrollX': true,
                'fixedHeader': true,
                "language": {
                    "emptyTable": '<span class="no-data-message">No Data Found</span>'
                },
                'aoColumns': dom.GetDynamicColumns(),
                "order": [[ORDER_BY, 'asc']],
                "drawCallback": function (settings) {
                    if (VERTICAL_GROUPBY != '') {
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;
                        var lst = api.column(parseInt(ORDER_BY), { page: 'current' }).data();
                        var colspan = lstview.length;
                        lst.each(function (group, i) {
                            if (last !== group) {

                                var orginalGroup = group;
                                var td = $.parseHTML(group);
                                $(td).css("font-weight", 500);
                                $(td).css("color", "#0099dd");
                                $(td).attr("colspan", 7);
                                //$(td).css("padding", "8px 33px 9px 20px");

                                var text = $.trim($(td).html());

                                if (text == "-") {
                                    $(td).html("Undefined");
                                    $(td).attr("title", "Undefined");
                                }
                                $(td).html(`<h5 class="isc-vertical-group-by-h5">${text}</h5>`);

                                var filteredLst = lst.filter(x => x == orginalGroup);
                                var count = filteredLst.length;

                                $(td).append(`<div class="isc-cir-div-s1">(${count})</div>`);
                                group = "<tr>" + td[0].outerHTML + "<\tr>";

                                $(rows).eq(i).before(
                                    //group + `<td colspan="${colspan}" ></td>`
                                    group
                                );

                                last = orginalGroup;
                            }
                        });
                    }
                    $('#tblEmployeeList tr td').each(function (index, item) {
                        var text = $(item).text();
                        $(item).attr('title', text);
                    });
                    OrderBy = '';
                }
            });


        },
        BindFilterOptions: function (lstOptionSets, lstOptions) {
            if (lstOptions.length > 0) {
                $.each(lstOptionSets, function (optionSetIndex, optionSetID) {
                    var html = '<option value="0">Select</option>';
                    var lstFilterOptions = lstOptions.filter(x => x.OptionSetID == optionSetID);
                    if (lstFilterOptions.length > 0) {
                        $.each(lstFilterOptions, function (optionIndex, option) {
                            if (optionSetID == option.OptionSetID) {
                                html += `<option value="${option.OptionID}">${option.Name}</option>`;
                            }
                        });
                        $OptionSetDom = dom.GetOptionSetDomObject(optionSetID);
                        $OptionSetDom.html(html);
                    }
                });
            }
        },
        BindGroupByOptionSet: function (lstview) {
            var verticalHTML = '<option value="">Select</option>';
            var HorizontalHTML = '<option value="0">Select</option>';

            var tempLst = JSON.parse(JSON.stringify(lstview));
            var lstSorted = common.Sort(tempLst, 'DisplayName', 'asc');

            $.each(lstSorted, function (index, item) {

                if (item.isVerticalGroupBy) {
                    verticalHTML += `<option value="${item.ParameterConfigurationID}">${item.DisplayName}</option>`;
                }

                if (item.isHorizontalGroupBy) {
                    HorizontalHTML += `<option value="${item.ParameterConfigurationID}">${item.DisplayName}</option>`;
                }

            });

            $('#verticalGroupBy').html(verticalHTML);
            $('#horizontalGroupBy').html(HorizontalHTML);
            $('#verticalGroupBy').val(VERTICAL_GROUPBY);

        },
        GetOptionSetDomObject: function (optionSetID) {
            var OptionSet = OptionSets.GeneralInfo;
            switch (optionSetID) {
                case OptionSet.Salutation: return $('#filterSalutation'); break;
                case OptionSet.Gender: return $('#filterGender'); break;
                case OptionSet.MaritalStatus: return $('#filterStatus'); break;
                case OptionSet.BloodGroup: return $('#filterBloodGroup'); break;
                case OptionSet.Nationality: return $('#filterNationality'); break;
                case OptionSet.RelationShip: return $('#filterRelationship'); break;
                case OptionSet.Designation: return $('#filterDesignation'); break;
                case OptionSet.EmploymentStatus: return $('#filterStatus'); break;
                case OptionSet.Department: return $('#filterDepartment'); break;
                case OptionSet.WorkStation: return $('#filterWorkStation'); break;
                case OptionSet.ShiftType: return $('#filterWorkStation'); break;
                case OptionSet.Experience: return $('#filterWorkStation'); break;
            }
        },
        BindTableHeader: function () {
            //Bind Table Header
            html = '<tr>';
            var seq = 0;
            $.each(lstview, function (index, item) {
                html += `<th title="${item.DisplayName}" name="${item.ReadAttribute}" data-th-sequence="${seq}" data-th-colum-name="${item.ReadAttribute}" data-th-column-id="${item.ParameterConfigurationID}" data-th-column-isvisible="${item.isVisible}">${item.DisplayName}<i class="fa fa-sort-alpha-asc"><i class=""></i></th>`;
                seq++;
            });

            html += '<th title="Action" class="no-sorting">Action </th></tr>';
            $('#employeeListHeader').html(html);


            if (IS_VERTICAL_GROUP_BY) {
                var groupbyDetail = lstview.filter(x => x.ParameterConfigurationID == VERTICAL_GROUPBY);
                var verticalGroupByColummName = groupbyDetail[0].DisplayName + ' / Employee ID';
                $('#employeeListHeader th:first').html(verticalGroupByColummName);
                $('#employeeListHeader th:first').attr("title", verticalGroupByColummName);
            }
        },
        BindHorizontalGroupByHeader: function (lstGroupBy) {
            //var html = `<li class="active"><a href = "#" data-tab-id="0" data-tab-column="0" data-toggle="tab">All<div class="isc-cir-div-s3"> ${TOTAL_RECORDS}</div></a></li>`;
            var html = '';
            if (lstGroupBy != undefined && lstGroupBy.length > 0) {
                html += `<li class="tab-link current" data-tab-id="0" data-tab-column="0" data-toggle="tab">All<a  class="isc-bdg-grd-sts-s1 isc-bdg-col-p6" title="All">${TOTAL_RECORDS}</a></li>`;
                $.each(lstGroupBy, function (index, item) {
                    //html += `<li><a href="#" data-tab-id="${item.ReadColumnID}" data-tab-column="${item.ColumnID}" data-toggle="tab">${item.ReadColumnName}<div class="isc-cir-div-s3">${item.Count}</div></a></li>`;
                    html += `<li class="tab-link" data-tab-id="${item.ReadColumnID}" data-tab-column="${item.ColumnID}" data-toggle="tab">${item.ReadColumnName}<a  class="isc-bdg-grd-sts-s1 isc-bdg-col-p6" title="${item.ReadColumnName}" >${item.Count}</a></li>`;
                });
            }
            $('#horizontalGroupByHeader').html(html);
        },
        GetDynamicColumns: function () {
            var dynamicColumns = [];

            var _obj = {};
            $.each(lstview, function (index, item) {
                _obj = {};
                var columnName = item["ReadAttribute"];
                var colorColumnName = item["ColorColumnName"];
                if (item.FieldType == '1248') {
                    if (item.isColorApplied && colorColumnName != '' && colorColumnName != null) {
                        _obj = {
                            //"width": '12%',
                            "orderable": true,
                            "mData": function (data, type, dataToSet) {
                                var html = `<td title='${common.NFTD(data[columnName])}' ><a class="isc-status-ctrl-s1"><span><div class="isc-cir-cell" style="border-color: ${common.NFTD(data[colorColumnName])};background-color: ${common.NFTD(data[colorColumnName])};"></div>
                                        </span><span class="" style="color: ${common.NFTD(data[colorColumnName])};">${common.NFTD(data[columnName])}</span></a></td>`;
                                return html;
                            }
                        }
                    }
                    else {
                        _obj = {
                            "orderable": true,
                            "mData": function (data, type, dataToSet) {
                                var html = `<td title='${common.NFDate(data[columnName])}' ">${common.NFDate(data[columnName])}</td>`;
                                //var html = `<td title='${(data[columnName])}' ">${(data[columnName])}</td>`;
                                return html;
                            }
                        }
                    }

                }
                else {
                    if (item.isColorApplied && colorColumnName != '' && colorColumnName != null) {
                        _obj = {
                            //"width": '12%',
                            "orderable": true,
                            "mData": function (data, type, dataToSet) {
                                var html = `<td title='${common.NFTD(data[columnName])}' ><a class="isc-status-ctrl-s1"><span><div class="isc-cir-cell" style="border-color: ${common.NFTD(data[colorColumnName])};background-color: ${common.NFTD(data[colorColumnName])};"></div>
                                        </span><span class="" style="color: ${common.NFTD(data[colorColumnName])};">${common.NFTD(data[columnName])}</span></a></td>`;
                                return html;
                            }
                        }
                    }
                    else {
                        _obj = {
                            "orderable": true,
                            "mData": function (data, type, dataToSet) {
                                var html = `<td title="${common.NFTD(data[columnName])}">${common.NFS(data[columnName])}</td>`;
                                return html;
                            }
                        };
                    }
                }
                dynamicColumns.push(_obj);

            });

            _obj = {};
            _obj = {
                "orderable": false,
                "mData": function (data, type, dataToSet) {
                    var html = '';
                    html += `<td data-access-id="1005"><a href="EmployeeInfo.aspx?empId=${common.NFTD(data["EmployeeID"])}" title="Edit"><i class="fa fa-pencil-square-o isc-sts-col-c1 "></i></a></td>`;
                    return html;
                }
            };
            dynamicColumns.push(_obj);

            return dynamicColumns;
        },
        BindAccess: function () {
            //first para with will default take current pagename, If you want to check other page right give the pagename in first para
            // second para will define to check w
            // Thrid para, You can give which id should d
            RoleConfiguration.PermissionGiveAccess("", "Export", "#BtnExport");
        },
        BindSavedFilter: function (LstSavedData) {
            var html = "";
            if (common.NFE(LstSavedData) != '' && LstSavedData.length > 0) {
                // var lstFilter = LstSavedData;
                var lstdistinctgrp = GetDistinctArray(LstSavedData, "ScreenId");
                //lstdistinctgrp = lstdistinctgrp.slice(0, -1);
                html += '<li>Choose Filter <a class="isc-bdg-grd-sts-s1 isc-bdg-col-c5" title="Completed" href="#">' + lstdistinctgrp.length + '</a></li>';
                html += '<hr class="isc-line-p1">';
                $.each(lstdistinctgrp, function (index, item) {
                    html += '<li title="' + item["Screenname"] + '" class="modal-toggle2"><a data-savefilterclick="' + item["ScreenId"] + '" data-screenid="' + item["ScreenId"] + '" data-userid="' + item["UserID"] + '"> ' + item["Screenname"] + '</a> <i title="Delete" class="fa fa-trash-o" data-FilterDelete="' + item["ScreenId"] + '"></i> </li>';

                });
                html += '<hr class="isc-line-p1">';
                html += '<li><div class="isc-screen-row"><span id="filter-close" class="isc-view-btn"> Close</span></div></li>';
                IsSaveFilterData = true;
            }
            else {
                IsSaveFilterData = false;
            }

            $('#employee_save_filter').html(html);

        }
    }
    var service = {
        GetViewList: function () {
            lstView = [];
            var _tempList = {};
            var _obj = {
                "pageid": PageConfiguration.EmployeeListView
            };
            var apiUrl = "UserConfigurations/GetViewList";
            $.when(HRMHTTP.POST(apiUrl, _obj)).done(function (data) {
                _tempList = common.AUF(data["ViewList"]);
                filterlst = common.AUF(data["FilterList"]);
                //TOTAL_RECORDS = data["AllCount"][0].AllCount;
                // ExportCount = TOTAL_RECORDS;

            });
            return _tempList;
        },
        GetGroupByValues: function () {
            var _tempList = {};
            var _obj = {};

            _obj.ColID = $('#horizontalGroupBy').val();
            _obj.empname = $('#filterName').val();
            //_obj.designation = $('#filterDesignation').val();
            //_obj.department = $('#filterDepartment').val();
            //_obj.status = $('#filterStatus').val();
            _obj.OrgID = GVOrganisationID;
            _obj.empid = Employee_ID;
            _obj.empids = filter.empids;
            _obj.designationids = filter.designationids;
            _obj.departmentids = filter.departmentids;
            _obj.statusids = filter.statusids;
            _obj.businessunitids = filter.businessunitids;
            _obj.organisationids = filter.organisationids;
            _obj.shiftids = filter.shiftids;
            _obj.legalentityids = filter.legalentityids;
            _obj.dateofJoining = filter.doj;

            var apiUrl = "Employees/GetGroupByList";
            $.when(HRMHTTP.POST(apiUrl, _obj)).done(function (data) {
                _tempList = common.AUF(data["GroupByList"]);
            });

            return _tempList;
        },
        SaveView: function (lstview) {

            var _obj = {};
            _obj.lstviewid = lstview.join();
            _obj.empid = Employee_ID;
            _obj.pageid = PageConfiguration.EmployeeListView;

            var apiUrl = "UserConfigurations/SaveView";
            $.when(HRMHTTP.POST(apiUrl, _obj)).done(function (data) {
                _tempList = common.AUF(data["SaveView"]);
            });
        },
        GetOptionList: function () {
            var _tempList = [];
            var _obj = {
                OrganisationID: UserPermissionID == 1010 ? 0 : GVOrganisationID
            };
            var apiUrl = "Employees/GetOptionList";
            $.when(HRMHTTP.POST(apiUrl, _obj)).done(function (data) {
                _tempList = data;
            });
            return _tempList;
        },
        GetSavedFilterData: function () {

            return GetScreenFilter("", UserID, PageConfiguration.EmployeeListView);
        }

    }

    return {
        Init: Init,
        BindEmployeeList: dom.BindEmployeeList,
        ResetFilter: Empdata.ResetFilter,
        ResetGroupBy: Empdata.ResetGroupBy,
        BindHorizontalGroupByHeader: Empdata.BindHorizontalGroupByHeader,
        FilterListOfFields: Empdata.FilterListOfFields,
        SaveView: Empdata.SaveView,
        ShowGroupByColumnHeader: Empdata.ShowGroupByColumnHeader,
        SetFilterValues: Empdata.SetFilterValues,
        GetColumnSequence: Empdata.GetColumnSequence,
        BindSavedFilter: dom.BindSavedFilter,
        GetSavedFilterData: service.GetSavedFilterData,
        ReloadData: ReloadData,
    }
})();



//Events
{
    $(document).on('click', '#searchFilter', function () {
        $loading.show();
        setTimeout(function () {
            EmployeeList.SetFilterValues();
            ACTIVE_TAB_VALUE = 0;
            ACTIVE_TAB_COLUMN = 0;
            EmployeeList.BindEmployeeList();
            EmployeeList.BindHorizontalGroupByHeader();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#filterReset', function () {
        $loading.show();
        setTimeout(function () {
            EmployeeList.ResetFilter();
            EmployeeList.BindEmployeeList();
            EmployeeList.BindHorizontalGroupByHeader();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#resetGroupBy', function () {
        $loading.show();
        setTimeout(function () {
            IS_VERTICAL_GROUP_BY = true;
            VERTICAL_GROUPBY = 1002;
            ORDER_BY = 2;
            EmployeeList.ResetGroupBy();
            EmployeeList.BindEmployeeList();
            EmployeeList.BindHorizontalGroupByHeader();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#groupBySearch', function (e) {
        $loading.show();
        ACTIVE_TAB_VALUE = 0;
        ACTIVE_TAB_COLUMN = 0;
        VERTICAL_GROUPBY = $('#verticalGroupBy').val();
        if (VERTICAL_GROUPBY != "") {
            //var columnseq = $('[data-th-column-id="' + VERTICAL_GROUPBY + '"]').attr('data-th-sequence');
            var columnseq = EmployeeList.GetColumnSequence(VERTICAL_GROUPBY);
            ORDER_BY = parseInt(columnseq);
            IS_VERTICAL_GROUP_BY = true;
        }
        else {
            IS_VERTICAL_GROUP_BY = false;
        }
        e.preventDefault();
        EmployeeList.SetFilterValues();

        setTimeout(function () {
            EmployeeList.BindEmployeeList();
            EmployeeList.BindHorizontalGroupByHeader();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#iconGroupbyFilter', function (e) {
        e.preventDefault();
        var display = $('#groupby-container').css('display').toLowerCase();

        //if (display == 'none') {
        //    $('#groupby-container').css('display', 'block');
        //}
        //else {
        //    $('#groupby-container').css('display', 'none');
        //}

    });

    $(document).on('click', '#filterSearch', function (e) {
        $loading.show();

        e.preventDefault();
        
        EmployeeList.SetFilterValues();

        setTimeout(function () {
            OrderBy = 'UpdatedOn desc';
            EmployeeList.BindEmployeeList();
            EmployeeList.BindHorizontalGroupByHeader();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#view, #viewContainerClose', function (e) {
        e.preventDefault();
        var display = $('#viewContainer').css('display').toLowerCase();
        if (display == 'none') {
            $('#viewContainer').css('display', 'block');
        }
        else {
            $('#viewContainer').css('display', 'none');
        }

    });


    $(document).on('click', '#action', function (e) {
        e.preventDefault();
        $('#viewContainer').css('display', 'none');
    });


    $(document).on("keyup", "#viewSearch", function (e) {
        var columnValue = $(this).val();
        EmployeeList.FilterListOfFields(columnValue);
    });

    $(document).on("click", "#viewClearAll", function (e) {
        e.preventDefault();
        $('input[name="view"]').prop("checked", false);
    });

    $(document).on("click", "#viewSelectAll", function (e) {
        $('input[name="view"]').prop("checked", true);
    });


    $(document).on("click", "#viewApply", function (e) {
        var selectedColumn = $('input[name="view"]:checked');

        if (selectedColumn.length > 0 && selectedColumn.length <= 7) {
            $loading.show();
            setTimeout(function () {
                EmployeeList.SaveView();
                EmployeeList.BindEmployeeList();
                $('#viewContainer').hide();
                $loading.hide();
            }, 0);
        }
        else {
            if (selectedColumn.length == 0) {
                $.notify("Please select atleast 1 field", "warning");
            }
            if (selectedColumn.length > 7) {
                $.notify("View only upto 7 fields", "warning");
            }
        }

    });


    $(document).on('click', '[data-tab-id]', function (e) {
        e.preventDefault();
        $('#horizontalGroupByHeader li').removeClass("current");
        //$(this).parent('li').addClass('current');
        $(this).addClass('current');
        ACTIVE_TAB_VALUE = $('#horizontalGroupByHeader .current').attr('data-tab-id');
        ACTIVE_TAB_COLUMN = $('#horizontalGroupByHeader .current').attr('data-tab-column');
        $loading.show();
        setTimeout(function () {
            EmployeeList.BindEmployeeList();
            $loading.hide();
        }, 100);

    });

    //Saved Filters Events
    {
        $(document).on('click', '#ddl_saveFilter', function (index, item) {

            if (!IsSaveFilterData) {
                $.notify("No item found on saved filter", "warn");
            }
        });


        $(document).on('click', '#btn_SaveFilterName', function (e) {
            e.preventDefault();
            var date = new Date();
            var ScreenID = date.getTime();
            var ScreenName = $.trim($('#FiterText').val());
            //var UserID = GetSession("UserID");
            if (ScreenName != 0 && ScreenName != undefined && ScreenName != "") {
                if (ScreenName.length > 25) {

                    $.notify("Filter Name cannot have more  than 25 Characters", { className: "error" });
                }
                else {
                    $loading.show();
                    setTimeout(function () {
                        UpdateScreenFilter(ScreenID, UserID, ScreenName, PageConfiguration.EmployeeListView);
                        var lstSavedData = EmployeeList.GetSavedFilterData();
                        lstSavedData = lstSavedData["ScreenFilters"];

                        EmployeeList.BindSavedFilter(lstSavedData);

                        $.notify("Filter Saved Successfully", { className: "success" });
                        $('#mp_savefilter').removeClass('is-visible');
                        $loading.hide();
                    }, 0);
                }

            }
            else {
                $.notify("Enter Filter Name", { className: "error" });
            }
            $('#FiterText').val('');
        });

        $(document).on('click', '#btn_saveFilter', function (index, item) {

            $('#mp_savefilter').addClass('is-visible');
            $('#FiterText').val('');
        });

        $(document).on('click', '[data-savefilterclick]', function (e) {
            e.preventDefault();
            var $this = $(this);
            var ScreenID = $(this).attr('data-screenid');
            var ScreenUserID = $(this).attr('data-userid');
            if (ScreenID != 0 && ScreenID != undefined) {
                LoadScreenFilter(ScreenID, ScreenUserID, PageConfiguration.EmployeeListView);

            }
            $('.fselect').fSelect('reload');
            $loading.show();
            setTimeout(function () {
                EmployeeList.SetFilterValues();
                ACTIVE_TAB_VALUE = 0;
                EmployeeList.BindEmployeeList();
                $loading.hide();
            }, 0);
            var existclass = $('.isc-entity-view-dropdown');
            if (existclass.hasClass("isc-entity-view-dropdown-show")) {
                $('.isc-entity-view-dropdown').removeClass('isc-entity-view-dropdown-show');
            }

        });

        $(document).on('click', '#filter-close', function () {
            var existclass = $('.isc-entity-view-dropdown');
            if (existclass.hasClass("isc-entity-view-dropdown-show")) {
                $('.isc-entity-view-dropdown').removeClass('isc-entity-view-dropdown-show');
            }


        });

        $(document).on('click', '[data-FilterDelete]', function (e) {
            e.preventDefault();
            var $this = $(this);

            ScreenId = $(this).attr('data-FilterDelete');
            if (ScreenId != 0 && ScreenId != undefined) {
                $('#btn_DeleteFilter').attr('data-FilterDelete', ScreenId);
                $('#mp_DeleteFilter').addClass('is-visible');
            }
        });


        $(document).on('click', '#btn_DeleteFilter', function (e) {
            e.preventDefault();
            var $this = $(this);
            ScreenId = $(this).attr('data-FilterDelete');
            if (ScreenId != 0 && ScreenId != undefined) {
                $loading.show();
                setTimeout(function () {

                    var result = DeleteScreenFilter(ScreenId);
                    if (result == true) {
                        $.notify("Filter Deleted Successfully", { className: "success" });
                        // $('#mp_DeleteFilter').hide();
                        $('#mp_DeleteFilter').removeClass('is-visible');
                        var lstSavedData = EmployeeList.GetSavedFilterData();
                        lstSavedData = lstSavedData["ScreenFilters"];
                        EmployeeList.BindSavedFilter(lstSavedData);
                    }
                    $loading.hide();
                }, 0);

            }
        });
    }

    //Export Excel
    {
        $(document).on('click', '#BtnExport', function () {
            $("#mdlEmployeeExport").addClass('is-visible');
        });

        $(document).on('click', '#Data-Export', function () {
            $loading.show();
            setTimeout(function () {
                try {
                    ExportToExcel();
                }
                catch (Exception) {

                }
                $("#mdlEmployeeExport").removeClass('is-visible');
                $loading.hide();
            }, 0);
        });

        function ExportToExcel() {
            PAGE_SIZE = ExportCount;
            EmployeeList.ReloadData();
            var html = document.querySelector("#tblEmployeeList").outerHTML;//your html table name
            export_table_to_csv(html, "EmployeeList.csv");
            PAGE_SIZE = 10;
            EmployeeList.ReloadData();
        }
        function export_table_to_csv(html, filename) {
            var csv = [];
            var rows = document.querySelectorAll("table tr");

            for (var i = 1; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll("td, th");

                for (var j = 0; j < cols.length - 1; j++)
                    row.push(cols[j].innerText);

                csv.push(row.join(","));
            }
            download_csv(csv.join("\n"), filename);
        }


        function download_csv(csv, filename) {
            var csvFile;
            var downloadLink;
            csvFile = new Blob([csv], { type: "text/csv" });
            downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    }
}