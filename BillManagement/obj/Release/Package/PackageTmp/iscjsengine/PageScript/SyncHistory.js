//Global Variables
{

}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            BuildSyncScreen();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-Search', function () {
        $loading.show();
        setTimeout(function () {
            BindDenaliSyncList();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-Reset', function () {
        $loading.show();
        setTimeout(function () {
            $('#slt-User').val('0');
            $('#slt-Status').val('999999999');
            $('.select2').select2();
            BindDenaliSyncList();
            $loading.hide();
        }, 0);
    });
}

//Dom Manipulation
{
    var BuildSyncScreen = function () {
        var masterData = GetMasterData();
        BindDropDowns($('#slt-User'), masterData["Users"], 'Choose Master Data');
        BindDenaliSyncList();
    }

    var BindDenaliSyncList = function () {
        var dataAllCount = 0;
        var tableBodyStartAt = 110;
        var screenFooterHeight = 230;
        var wHeight = $(window).height();
        var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));

        $('#tbl-SyncList').DataTable({
            'bServerSide': true,
            "pagingType": "full_numbers",
            'bPaginate': true,
            // "scrollY": tableAvailabeHeight + "px",
            "ajax": {
                "url": "SyncHistory.aspx/GetSyncList",
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
                    json.data = common.AUF(objData['SyncList']);
                    json.recordsTotal = common.AUF(objData['AllCount'][0]["Count"]);
                    json.recordsFiltered = common.AUF(objData['AllCount'][0]["Count"]);
                    dataAllCount = common.AUF(objData['AllCount'][0]["Count"]);
                    return json.data;
                }

            },
            "autoWidth": false,
            "order": [[0, "desc"]],
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
                        html += (data["syncdate"] == null ? '-' : moment(data["syncdate"]).format('MM/DD/YYYY HH:mm:ss'));
                        return html;
                    }
                },
                {
                    "width": '15%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["syncbyname"] == null ? '' : data["syncbyname"]);
                        return html;
                    }
                },
                {
                    "width": '25%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["syncDesc"] == null ? '' : data["syncDesc"])
                        return html;
                    }
                },
                {
                    "width": '15%',
                    "mData": function (data, type, dataToSet) {
                        var html = (data["syncsts"] == null ? '' : data["syncsts"])
                        return html;
                    }
                },
              
            ],
            "drawCallback": function (settings) {
                $('#tbl-SyncList tr td').each(function (index, item) {
                    var text = $(item).text();
                    $(item).attr('title', text);
                });
            },
            "fnDrawCallback": function () {
                $('#tbl-SyncList tr td').each(function (index, item) {
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
        obj.strStatus = $('#slt-Status').val();
        obj.StartDate = FilterStartDate;
        obj.EndDate = FilterEndDate;
        obj.AccountID = parseInt($('#slt-User').val());
        var _obj = {};
        _obj = { "syncListFilter": obj };
        return _obj;
    }

    var ConfigureOrderBy = function (objModel) {
        var columnName = objModel.order[0].column;
        var direction = objModel.order[0].dir;
        var orderBy = "";
        switch (columnName) {
            case 0:
                orderBy = "syncdate " + direction;
                break;
            case 1:
                orderBy = "syncbyname " + direction;
                break;
            case 2:
                orderBy = "syncDesc " + direction;
                break;
            case 3:
                orderBy = "syncsts " + direction;
                break;
        }
        return orderBy;
    }
}

//Data Manipulation
{
    var GetMasterData = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("SyncHistory.aspx/GetFilterData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{
    var BindDropDowns = function ($el, lst, DefaultItem) {
        var html = '';
        if (DefaultItem != "") {
            html += '<option value="0">' + DefaultItem + '</option>';
        }
        if (lst.length > 0) {
            var distinctlst = GetDistinctArray(lst, 'KeyListID');
            distinctlst = ObjSorter(distinctlst, "Value1", '123');

            $.each(distinctlst, function (index, item) {
                if ($.trim(item["Value1"]) != '') {
                    html += '<option value="' + item["KeyListID"] + '">' + (item["Value1"] == null ? '-' : item["Value1"]) + '</option>';
                }
                

            });
        }
        $el.html(html);
    }
}