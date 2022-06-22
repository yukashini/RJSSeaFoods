
{
    var Userlst = [];
    var FilterStartDate = null;
    var FilterEndDate = null;
}
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            Userlst = GetUserData();
            BindDropDowns();
            BindAutidLog();
            $loading.hide();
        }, 0);
    });
}
{
    var BindAutidLog = function () {
      
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
        $('#tbl_auditlog').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            //"scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "AuditLog.aspx/GetAutidlog",
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
                    json.data = common.AUF(objData['AuditList']);
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
                    "width": '30%',
                    "mData": function (data, type, dataToSet) {
                        var stillUtcCreatedOn = moment.utc(data["TimeStamp"]).toDate();
                        var localDue = moment(stillUtcCreatedOn).local().format('llll');
                        //var nextDue = moment.utc(data["TimeStamp"]).toDate();
                        //var localDue = moment(nextDue).local().format('MM/DD/YYYY HH:MM:s A');
                        var html = '';
                        html += '<div style="text-align: left;">';
                        html += '<h5 >' + (localDue == "Invalid date" ? '-' : localDue) + '</h5>';
                        html += '</div>';
                        return html;
                    }
                },

                {
                    "width": '22%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Activity"] == null || data["Activity"] == '' ? '-' : data["Activity"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '23%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["Description"] == null || data["Description"] == '' ? '-' : data["Description"]) + '</h5>';
                        return html;
                    }
                },

                {
                    "width": '20%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["ScreenName"] == null || data["ScreenName"] == '' ? '-' : data["ScreenName"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["User"] == null || data["User"] == '' ? '-' : data["User"]) + '</h5>';
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = '';
                        html += '<h5 >' + (data["SystemIp"] == null || data["SystemIp"] == '' ? '-' : data["SystemIp"]) + '</h5>';
                        return html;
                    }
                },
            ],
            "drawCallback": function (settings) {
            },
            "fnDrawCallback": function () {
                $('#tbl_auditlog tr td').each(function (index, item) {
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
        obj.Activity = $.trim($('#slt_Activity').val());
        obj.Description = $.trim($('#txt_Description').val());
        obj.Screen = $.trim($('#slt_Screen').val());;
        obj.User = $.trim($('#slt_User').val());;
        obj.Fromdate = FilterStartDate;;
        obj.Todate = FilterEndDate;
        var _obj = {};
        _obj = { "auditlog": obj };
        return _obj;
    }
    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "TimeStamp " + direction;
                break;
            case 1:
                orderBy = "Activity " + direction;
                break;
            case 2:
                orderBy = "Description " + direction;
                break;
            case 3:
                orderBy = "ScreenName " + direction;
                break;
            case 4:
                orderBy = "User " + direction;
                break;
            case 5:
                orderBy = "SystemIp " + direction;
                break;
        }
        return orderBy;
    }
    var RegisterDatepicker = function () {
        FilterStartDate = '01/01/2001';
        FilterEndDate = '01/01/2023';
        $('#Daterangepicker').daterangepicker({
            startDate: moment(FilterStartDate),
            endDate: moment(FilterEndDate),
            ranges: {
                'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                'Today': [moment(), moment()],
                'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
            }
        }, SetSwapDateRange);
        SetSwapDateRange(moment(FilterStartDate), moment(FilterEndDate));
        $('#Daterangepicker').on('apply.daterangepicker', function (ev, picker) {
            FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
            FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
        });
    }
    function SetSwapDateRange(start, end) {
        if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
            && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
        ) {
            $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> Any Date');
        }
        else {
            $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
        }
    }

    var BindDropDowns = function () {

        var UserLst = common.AUF($.parseJSON(Userlst[0]["Table"]));

        var UserHtml = '<option value="0">Choose User</option>';
        $.each(UserLst, function (index, item) {
            UserHtml += `<option value="${item.KeyListID}">${item.Value1}</option>`;
        });
        $('#slt_User').html(UserHtml);

    }
}
    //Data Manipulation
    {
        var GetUserData = function () {
            var tempList = {};
            $.when(RequestServer("AuditLog.aspx/GetUserlistData")).done(function (response) {
                tempList = $.parseJSON(response);
            });
            return tempList;
        }
}

$(document).on('click', '#Btn_serch', function (e) {
    BindAutidLog();
});

$(document).on('click', '#btn_Reset', function (e) {
    $("#slt_Activity").val("0").change();
    $("#slt_Screen").val("0").change();
    $("#slt_User").val("0").change();
    $("#txt_Description").val("");
    RegisterDatepicker();
    BindAutidLog();
  
});