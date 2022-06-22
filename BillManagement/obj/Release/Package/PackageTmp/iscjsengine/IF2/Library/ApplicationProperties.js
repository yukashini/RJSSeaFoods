var sys_siteRoot = "http://localhost:43804";
var sys_ajaxURL = sys_siteRoot + "/SnapShotService.asmx/";
var sys_FileUploaderURL = sys_siteRoot + "/DocumentHandler.ashx/";
var sys_Document_Root = "Documents";
var AttachmentFolderPath = "Attachments";
var IsSSOEnabled = false;
//var stripe = Stripe("pk_test_51HpYRiJF6lJpcd14z4kOFwfZmEIg4UMLooWtAkai6okk5NIfngSM63uYJtMGr8jy0aNHGrhkUreUjTlIa6cJsWfy00kdJyVpx8");

var Token = '';

//var PP_ProjectEntity = 10000;
//var PP_ReleaseEntity = 20000;
//var PP_SprintEntity = 30000;
//var PP_WorkItemsEntity = 40000;
//var PP_MeetingEntity = 50000;
//var PP_DecisionsEntity = 2400080;
//var PP_DelaysEntity = 2400090;
//var PP_ObservationsEntity = 2400091;
//var PP_RiskAndIssuesEntity = 2400100;
//var PP_MeetingParticipantsEntity = 60000;
//var PP_MileStoneEntity = 70000;
//var PP_ExtraworksEntity = 80000;
//var PP_WorkItemCommentsEntity = 90000;
//var PP_WorkItemAttachmentEntity = 100000;
//var PP_WeeklyRaceEntity = 110000;
//var PP_ReleaseWeeklyRaceEntity = 120000;
//var PP_WIDiscussionEntity = 2401000;
//var PP_StepEntity = 140000;

//var PP_Release_Status = 2000;
//var PP_SprintStatus = 3000;
//var PP_ProjectType = 1000;
//var PP_MileStoneStatus = 7000;
//var PP_WeeklyRace = 5000;
//var PP_ReleaseWeeklyStatus = 12000;

//var PP_RStatus_yet = 2001;
//var PP_RStatus_InPro = 2002;
//var PP_RStatus_Hold = 2003;
//var PP_RStatus_Compl = 2004;
//var PP_SStatus_Yet = 3001;
//var PP_SStatus_InPro = 3002;
//var PP_SStatus_Hold = 3003;
//var PP_SStatus_Compl = 3004;
//var PP_PType_Default = 1051;
//var PP_MStatus_Yet = 7001;
//var PP_MStatus_InPro = 7002;
//var PP_MStatus_Hold = 7003;
//var PP_MStatus_Compl = 7004;
//var PP_WeeklyR_NotStartd = 5001;
//var PP_WeeklyR_NoUserStoryClosd = 5002;
//var PP_WeeklyR_WentOk = 5003;
//var PP_WeeklyR_GoodProgrs = 5004;
//var PP_WeeklyR_GoodProgrsExceptd = 5005;
//var PP_RWeeklyR_NotStartd = 12001;
//var PP_RWeeklyR_NoUserStoryClosd = 12002;
//var PP_RWeeklyR_WentOk = 12003;
//var PP_RWeeklyR_GoodProgrs = 12004;
//var PP_RWeeklyR_GoodProgrsExceptd = 12005;

//*************new DB*************

var PP_HistoryWorkItems = 9000000;
var PP_ProjectEntity = 3800000;
var PP_ReleaseEntity = 3900000;
var PP_SprintEntity = 4000000;
var PP_WorkItemsEntity = 4100000;
var PP_MeetingEntity = 4200000;
var PP_DecisionsEntity = 4800000;
var PP_DelaysEntity = 4700000;
var PP_ObservationsEntity = 4600000;
var PP_RiskAndIssuesEntity = 5400000;
var PP_MeetingParticipantsEntity = 4300000;
var PP_MileStoneEntity = 4400000;
var PP_ExtraworksEntity = 4500000;
var PP_WorkItemCommentsEntity = 4900000;
var PP_WorkItemAttachmentEntity = 5000000;
var PP_WeeklyRaceEntity = 5200000;
var PP_ReleaseWeeklyRaceEntity = 5300000;
var PP_WIDiscussionEntity = 5100000;
var PP_StepEntity = 5600000;
var PP_DesignNotesEntity = 5700000;

var PP_Release_Status = 510000000;
var PP_SprintStatus = 520000000;
var PP_ProjectType = 530000000;
var PP_MileStoneStatus = 540000000;
var PP_WeeklyRace = 550000000;
var PP_ReleaseWeeklyStatus = 560000000;

var PP_RStatus_yet = 510000001;
var PP_RStatus_InPro = 510000002;
var PP_RStatus_Hold = 510000003;
var PP_RStatus_Compl = 510000004;
var PP_SStatus_Yet = 520000001;
var PP_SStatus_InPro = 520000002;
var PP_SStatus_Hold = 520000003;
var PP_SStatus_Compl = 520000004;
var PP_PType_Default = 530000001;
var PP_MStatus_Yet = 540000001;
var PP_MStatus_InPro = 540000002;
var PP_MStatus_Hold = 540000003;
var PP_MStatus_Compl = 540000004;
var PP_WeeklyR_NotStartd = 550000001;
var PP_WeeklyR_NoUserStoryClosd = 550000002;
var PP_WeeklyR_WentOk = 550000003;
var PP_WeeklyR_GoodProgrs = 550000004;
var PP_WeeklyR_GoodProgrsExceptd = 550000005;
var PP_RWeeklyR_NotStartd = 560000001;
var PP_RWeeklyR_NoUserStoryClosd = 560000002;
var PP_RWeeklyR_WentOk = 560000003;
var PP_RWeeklyR_GoodProgrs = 560000004;
var PP_RWeeklyR_GoodProgrsExceptd = 560000005;

var sys_ajaxDataType = "json";
var sys_ajaxPost = "POST";
var sys_ajaxGet = "GET";
var sys_ajaxContentType = "application/json; characterset=utf-8";
var sys_ajaxAsyncFalse = false;
var sys_ajaxAsyncTrue = true;
var screenmode_current = null;
var screenmode_requested = "N";
var action = null;
var sessionTimeout = 30;
var applicationID = 3030;
var responseTime = 0;
var UserBusinessUnit = 0;
var _UserBusinessDepartmentID = [];
var BookmarkDepartment = [];
var PP_Bookmark = 9600010;

var objAunthinticatedUser = null;
var userID = 0;
var _private_JSON = null;
var _public_JSON = null;
var _objArray = [];
var _gentityInfo = {};
_gentityInfo.gEntityID = "";
_gentityInfo.userid = "";
_gentityInfo.sessionid = "";
_gentityInfo.viewstate = "";
var _objmasterdata = [];
var _CurrentUserDepartment = 0;

/* Data Structure for the ESID Number 
Should not change for any screen - Should be 
globalized
*/
var esidNumbers = {};
esidNumbers.EntityTypeID = "";
esidNumbers.ESID = [];

var _verticalID = 0;
var _leadCreatedOn = 0;
var _campaignID = 0;
var _campaignname = "";
var _actionID = 0;
var _campaigntype = "";
var _campaignwhereCondtion = "";
var _campaignLeadID = 0;
var _entrycampaignlead = 0;
var _selectedcampaignleadID = 0;
var _bdeid = 0;
var _statusID = 0;
var _entryscreen = 0;

var _checkmastercampaignintizstage = 0;
var currdatetime = new Date();
var _projectName = "";
var _screenEntityID = 0;
var _activeCampaignID = 0;

var _pageSession = {

    _leadID: 0,
    _campaignID: 0,
    _campaignname: '',
    _actionID: 0,
    _campaigntype: '',
    _campaignwhereCondtion: '',
    _campaignLeadID: 0,
    _entrycampaignlead: 0,
    _selectedcampaignleadID: 0,
    _bdeid: 0,
    _statusID: 0,
    _entryscreen: 0,
    _nextCampaignLeadID: 0
};

var _cache = {
    isHome: false,
    appDepartment: null,
    viewBy: 0,
    viewType: 0,
    filters: {
        department: 0,
        priority: 0,
        projectType: 0,
    }
}

var _workItemColumn = ["Description", "Status", "Priority", "Tags"];

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};


//Common Code
{
    function addDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() + numDays);
        return dateObj;
    }



    Date.prototype.getWeek = function (dowOffset) {

        /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.epoch-calendar.com */

        dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
        var newYear = new Date(this.getFullYear(), 0, 1);
        var day = newYear.getDay() - dowOffset; //the day of week the year begins on
        day = (day >= 0 ? day : day + 7);
        var daynum = Math.floor((this.getTime() - newYear.getTime() -
            (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
        var weeknum;
        //if the year starts before the middle of a week
        if (day < 4) {
            weeknum = Math.floor((daynum + day - 1) / 7) + 1;
            if (weeknum > 52) {
                nYear = new Date(this.getFullYear() + 1, 0, 1);
                nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
				/*if the next year starts before the middle of
				the week, it is week #1 of that year*/
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum + day - 1) / 7);
        }
        return weeknum;
    };





    Date.prototype.getWeekOfMonth = function () {
        var firstDay = new Date(this.setDate(1)).getDay();
        var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
        return Math.ceil((firstDay + totalDays) / 7);
    }

    //function getDateRangeOfWeek(weekNo) {

    //    var d1 = new Date();
    //    numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
    //    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    //    var weekNoToday = d1.getWeek();
    //    var weeksInTheFuture = eval(weekNo - weekNoToday);
    //    d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
    //    var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();



    //    d1.setDate(d1.getDate() + 6);
    //    var rangeIsTo = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
    //    return rangeIsFrom + " to " + rangeIsTo;
    //}



    function getDateRangeOfWeek(weekNo) {

        var _temparray = [];
        var d1 = new Date();
        numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
        d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
        var weekNoToday = d1.getWeek();
        var weeksInTheFuture = eval(weekNo - weekNoToday);
        d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));

        for (var i = 0; i < 7; i++) {
            var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
            _temparray.push({ "date": rangeIsFrom, "datestring": dateFormat(rangeIsFrom, "ddd"), "weekno": d1.getWeek(), "monthno": d1.getMonth() });
            d1.setDate(d1.getDate() + 1);
        }


        return _temparray;
    };

    function GetCurrentDateTime() {
        var d = new Date();
        var ttime = (currtime.getUTCFullYear()) + '/' + (currtime.getUTCMonth() + 1) + '/' + (currtime.getUTCDate());

    }

    //Common Code
    {

        var GetAttributeValueList = function ($el, attributename) {
            var lst = [];
            if ($el.length > 0) {
                $el.each(function (index, item) {
                    var attrvalue = $.trim($(item).attr(attributename));
                    if (attrvalue != '' && attrvalue != null && attrvalue != undefined)
                        lst.push(attrvalue);
                });
            }
            return lst;
        }

        function addDays(dateObj, numDays) {
            dateObj.setDate(dateObj.getDate() + numDays);
            return dateObj;
        }

        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }


        Date.prototype.getWeek = function (dowOffset) {

            /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.epoch-calendar.com */

            dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
            var newYear = new Date(this.getFullYear(), 0, 1);
            var day = newYear.getDay() - dowOffset; //the day of week the year begins on
            day = (day >= 0 ? day : day + 7);
            var daynum = Math.floor((this.getTime() - newYear.getTime() -
                (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
            var weeknum;
            //if the year starts before the middle of a week
            if (day < 4) {
                weeknum = Math.floor((daynum + day - 1) / 7) + 1;
                if (weeknum > 52) {
                    nYear = new Date(this.getFullYear() + 1, 0, 1);
                    nday = nYear.getDay() - dowOffset;
                    nday = nday >= 0 ? nday : nday + 7;
	                /*if the next year starts before the middle of
                    the week, it is week #1 of that year*/
                    weeknum = nday < 4 ? 1 : 53;
                }
            }
            else {
                weeknum = Math.floor((daynum + day - 1) / 7);
            }
            return weeknum;
        };





        Date.prototype.getWeekOfMonth = function () {
            var firstDay = new Date(this.setDate(1)).getDay();
            var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
            return Math.ceil((firstDay + totalDays) / 7);
        }

        //function getDateRangeOfWeek(weekNo) {

        //    var d1 = new Date();
        //    numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
        //    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
        //    var weekNoToday = d1.getWeek();
        //    var weeksInTheFuture = eval(weekNo - weekNoToday);
        //    d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
        //    var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();



        //    d1.setDate(d1.getDate() + 6);
        //    var rangeIsTo = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
        //    return rangeIsFrom + " to " + rangeIsTo;
        //}



        function getDateRangeOfWeek(weekNo) {

            var _temparray = [];
            var d1 = new Date();
            numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
            d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
            var weekNoToday = d1.getWeek();
            var weeksInTheFuture = eval(weekNo - weekNoToday);
            d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));

            for (var i = 0; i < 7; i++) {
                var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
                _temparray.push({ "date": rangeIsFrom, "datestring": dateFormat(rangeIsFrom, "ddd"), "weekno": d1.getWeek(), "monthno": d1.getMonth() });
                d1.setDate(d1.getDate() + 1);
            }


            return _temparray;
        };

        function GetCurrentDateTime() {
            var d = new Date();
            var ttime = (currtime.getUTCFullYear()) + '/' + (currtime.getUTCMonth() + 1) + '/' + (currtime.getUTCDate());

        }

        function SafeHTML(str) {
            const replacements = [
                { '&lt;': '<' },
                { '&gt;': '>' },
                { '&quot;': '"' },
                { '&#39;': "'" },
                { '&#x2F;': '/' },
                { '&#x60;': '`' },
                { '&#x3D;': '=' },
                { '&amp;': '&' },
                { '<br>': '\n' },
                { '&nbsp;': ' ' }
            ];
            if (str != null) {
                return replaceManyStr(replacements, str);
            }
            else {
                return '';
            }
        }

        function replaceManyStr(replacements, str) {
            return replacements.reduce((accum, t) => accum.replace(new RegExp(Object.keys(t)[0], 'g'), t[Object.keys(t)[0]]), str);
        }

        var common = {
            //Array Undefined Filter
            AUF: function (data) {
                return (data != undefined && data != null) ? data : [];
            },
            //Null Filter String to Hyphen 
            NFS: function (data) {
                return (data != undefined && data != null && data != "") ? data : "-";
            },
            //Null Filter Date to Hyphen
            NFD: function (data) {
                var stillUtc = moment.utc(data).toDate();
                var local = moment(stillUtc).local().format('MMM DD, YYYY');
                return (local != "Invalid date") ? local : "-";
            },
            //Null Filter Date to Hyphen
            NFLD: function (data) {
                var local = moment(data).format('MM/DD/YYYY');
                return (local != "Invalid date") ? local : "-";
            },
            NFLDTimeStampUTC: function (data) {
                var stillUtc = moment.utc(data).toDate();
                var local = moment(stillUtc).local().format('MM/DD/YYYY hh:mm:ss a');
                return (local != "Invalid date") ? local : "-";
            },
            LocalToUTC: function (data) {
                var date = moment(data).utc().format('MM/DD/YYYY HH:mm');
                return (date != "Invalid date") ? date : "";
            },
            NFDate: function (data) {
                var stillUtc = moment.utc(data).toDate();
                var local = moment(stillUtc).local().format('MM-DD-YYYY');
                return (local != "Invalid date") ? local : "-";
            },
            //Null Filter data to empty
            NFE: function (data) {
                return (data != undefined && data != null) ? data : "";
            },
            //Null Filter number to zero
            NFN: function (data) {
                return (data != undefined && data != null && data != "") ? parseInt(data) : 0;
            },
            //Null Filter null to bool
            NFB: function (data) {
                return (data != undefined && data != null && data != "") ? data : false;
            },
            //Null Filter number to zero and format to comma
            NFNC: function (data) {
                return (data != undefined && data != null) ? String(data).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : 0;
            },
            NFZ: function (data) {
                return (data == 0) ? "" : data;
            },
            NFDecode: function (data) {
                return (data != undefined && data != null) ? $("<div />").html(data).text() : "";
            },
            NTD: function (data) {
                if (data == null || data == 0) {
                    data = '-';
                }
                else {
                    data = data.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    data = '$' + data;
                }

                return data
            },

            //Null Filter Number
            ParseInt: function (data) {
                return isNaN(parseInt(data)) ? 0 : data;
            },
            ParseBool: function (data) {
                var result = false;
                if (data === 'undefined') {
                    result = false
                }
                else if (data == 'true') {
                    result = true;
                }
                return result;
            },
            RegisterSelectPicker: function () {
                $('.select2').select2({});
                $('.select2.no-search').select2({
                    minimumResultsForSearch: Infinity
                });
            },
            RegisterDatePicker: function () {
                $('.datepicker').datepicker({
                    format: 'mm/dd/yyyy',

                    autoclose: true
                });

            },

            RegisterPhoneNumber: function () {
                $('.phone-format').usPhoneFormat({
                    format: '(xxx) xxx-xxxx',
                });
            },
            RegisterDateRangePicker: function () {
                $('.daterangepicker').daterangepicker({
                    autoUpdateInput: false,
                    locale: {
                        cancelLabel: 'Clear'
                    },
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    }
                });
            },
            RegisterNumericNumber: function () {
                $('.number-format').mask('000,000,000,000,000', { reverse: true });
            },
            RegisterNumberOnly: function () {
                $('.number-only').mask('#');
            },
            RegisterAlphabetsOnly: function () {
                $('.alphabets-only').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
                    translation: {
                        'Z': {
                            pattern: /[a-zA-Z ]/, reverse: true
                        }
                    }
                });
            },
            //Null Filter with html encode - dom binding data
            NFTD: function (data) {
                var string = (data != undefined && data != null && data != "") ? data : "-";
                return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                    return entityMap[s];
                });
            },
            NFTEMP: function (data) {
                var string = (data != undefined && data != null && data != "") ? data : "";
                return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                    return entityMap[s];
                });
            },
            NFDE: function (data) {
                var textArea = document.createElement('textarea');
                textArea.innerHTML = data;
                return textArea.value;
            },
            DblClickPrevent: function ($el) {
                $el.addClass('disable');
            },
            DblClickRemove: function ($el) {
                setTimeout(() => {
                    $el.removeClass('disable');
                }, 500);
            },
            BindDropDown: function ($el, lst, DefaultItem, isDefault) {
                if (isDefault)
                    var html = `<option selected value='0'>${DefaultItem}</option>`;
                for (var i = 0; i < lst.length; i++) {
                    html += `<option title="${lst[i]["KeyListName"]}" value="${lst[i]["KeyListID"]}">${lst[i]["KeyListName"]}</option>`;
                }
                $el.html(html);
            },
            CumulativeOffset: function (element) {
                var top = 0, left = 0;
                do {
                    top += element.offsetTop || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while (element);

                return {
                    top: top,
                    left: left
                };
            },
            GetDistinct: function (lst, keyname) {
                var flags = [], output = [], l = lst.length, i;
                for (i = 0; i < l; i++) {
                    if (flags[lst[i][keyname]]) continue;
                    flags[lst[i][keyname]] = true;
                    output.push(lst[i]);
                }

                return output;
            },
            export_table_to_csv: function (html, filename) {
                var csv = [];
                var rows = document.querySelectorAll("table tr");

                for (var i = 0; i < rows.length; i++) {
                    var row = [], cols = rows[i].querySelectorAll("td, th");

                    for (var j = 0; j < cols.length; j++)
                        //row.push(cols[j].innerText);
                    row.push('"' + cols[j].innerText + '"');
                    csv.push(row.join(","));
                }
                common.download_csv(csv.join("\n"), filename);
            },
            download_csv: function (csv, filename) {
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

   
}