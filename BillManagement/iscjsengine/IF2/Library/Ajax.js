function Call_AJAX(serviceMethod, formData) {
    var _data = null;
    formData = RewriteWhereCondition(serviceMethod, formData);
    var requestStartAt = moment(new Date());
    $.ajax({
        async: false,
        type: "POST",
        url: sys_ajaxURL + serviceMethod,
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var requestEndAt = moment(new Date());
            console.log(JSON.stringify(formData) + "--> " + requestStartAt.format('MM/DD/YYYY hh:mm:ss') + " - " + requestEndAt.format('MM/DD/YYYY hh:mm:ss') + ": " + parseInt(moment.utc(requestEndAt.diff(requestStartAt)).format("ss")));
            responseTime = responseTime + parseInt(moment.utc(requestEndAt.diff(requestStartAt)).format("ss"));
            // console.log(JSON.stringify(formData) + ": " + responseTime);
            _data = response.d;
            if (_data.isSuccess == false)
                alert(_data.isSuccess);
        },
        failure: function (msg) {
            alert("<i class='fa fa-exclamation-circle' style='color:red;'></i> " + msg.d, 'error');
        },
        error: function (jqXHR, error, errorThrown) {
            var message,
                stack,
                name;
            var statusErrorMap = {
                '400': "Server understood the request, but request content was invalid.",
                '401': "Unauthorized access.",
                '403': "Forbidden resource can't be accessed.",
                '500': "Internal server error.",
                '503': "Service unavailable."
            };
            if (jqXHR.status) {
                message = statusErrorMap[jqXHR.status];
                stack = jqXHR.responseText;
                name = "<b>" + jqXHR.status + "</b> " + message;
                if (!message) {
                    message = errorThrown.message;
                    stack = errorThrown.stack;
                    name = jqXHR.status + " (Unknown Error) \n.";
                }

            } else {
                message = errorThrown.message;
                stack = isUndefined(errorThrown.stack) ? jqXHR.reponseText : errorThrown.stack
                name = isUndefined(errorThrown.name) ? "" : errorThrown.name;
            }
            var browser = 'UnKnown';
            // Report The Error (Using Mailto)
            var browserVersion = "UnKnown";
            var reportBody = "Hai, %0D%0A %0D%0A While Accessing the Application I got some error. Please fix this and let me know. %0D%0A %0D%0A Error Occured at : " + window.location.href + " %0D%0A Error Stack : " + name + "%0D%0A User Agent : " + browser + " %0D%0A User Agent Version : " + browserVersion + " %0D%0A Date/Time : " + new Date() + encodeURIComponent(stack);
            var sendReportTo = "mailto:gopinath@innospire.com?subject=Error Occured &body=" + reportBody;

            alert("<h3><i class='fa fa-exclamation-circle' style='color:red; font-size:30px;'></i> " + name + "<h4><b>Error Stack :</b> <div style='float:right;'><i class='fa fa-envelope' style='color:gray; margin-right:2px;'></i><a style='font-size:13px;  margin-right: 10px;' id='errorReport' href='" + sendReportTo + "'>Report this Error</a></div></h4> <div class='stackcontainer'>" + stack + "</div>", 'error');
        }
    });
    return _data;
}

function Call_DefaultAJAX(serviceMethod, formData) {
    var _data = null;
    var requestStartAt = moment(new Date());
    $.ajax({
        async: false,
        type: "POST",
        url: sys_ajaxURL + serviceMethod,
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var requestEndAt = moment(new Date());
            console.log(JSON.stringify(formData) + "--> " + requestStartAt.format('MM/DD/YYYY hh:mm:ss') + " - " + requestEndAt.format('MM/DD/YYYY hh:mm:ss') + ": " + parseInt(moment.utc(requestEndAt.diff(requestStartAt)).format("ss")));
            responseTime = responseTime + parseInt(moment.utc(requestEndAt.diff(requestStartAt)).format("ss"));
            // console.log(JSON.stringify(formData) + ": " + responseTime);
            _data = response.d;
            if (_data.isSuccess == false)
                alert(_data.isSuccess);
        },
        failure: function (msg) {
            alert("<i class='fa fa-exclamation-circle' style='color:red;'></i> " + msg.d, 'error');
        },
        error: function (jqXHR, error, errorThrown) {
            var message,
                stack,
                name;
            var statusErrorMap = {
                '400': "Server understood the request, but request content was invalid.",
                '401': "Unauthorized access.",
                '403': "Forbidden resource can't be accessed.",
                '500': "Internal server error.",
                '503': "Service unavailable."
            };
            if (jqXHR.status) {
                message = statusErrorMap[jqXHR.status];
                stack = jqXHR.responseText;
                name = "<b>" + jqXHR.status + "</b> " + message;
                if (!message) {
                    message = errorThrown.message;
                    stack = errorThrown.stack;
                    name = jqXHR.status + " (Unknown Error) \n.";
                }

            } else {
                message = errorThrown.message;
                stack = isUndefined(errorThrown.stack) ? jqXHR.reponseText : errorThrown.stack
                name = isUndefined(errorThrown.name) ? "" : errorThrown.name;
            }
            var browser = 'UnKnown';
            // Report The Error (Using Mailto)
            var browserVersion = "UnKnown";
            var reportBody = "Hai, %0D%0A %0D%0A While Accessing the Application I got some error. Please fix this and let me know. %0D%0A %0D%0A Error Occured at : " + window.location.href + " %0D%0A Error Stack : " + name + "%0D%0A User Agent : " + browser + " %0D%0A User Agent Version : " + browserVersion + " %0D%0A Date/Time : " + new Date() + encodeURIComponent(stack);
            var sendReportTo = "mailto:gopinath@innospire.com?subject=Error Occured &body=" + reportBody;

            alert("<h3><i class='fa fa-exclamation-circle' style='color:red; font-size:30px;'></i> " + name + "<h4><b>Error Stack :</b> <div style='float:right;'><i class='fa fa-envelope' style='color:gray; margin-right:2px;'></i><a style='font-size:13px;  margin-right: 10px;' id='errorReport' href='" + sendReportTo + "'>Report this Error</a></div></h4> <div class='stackcontainer'>" + stack + "</div>", 'error');
        }
    });
    return _data;
}

function Call_AsynAJAX(serviceMethod, formData) {

    var _data = null;
    $.ajax({
        async: true,
        type: "POST",
        url: sys_ajaxURL + serviceMethod,
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            _data = response.d;
            if (_data.isSuccess == false)
                alert(_data.isSuccess);
        },
        failure: function (msg) {
            alert("<i class='fa fa-exclamation-circle' style='color:red;'></i> " + msg.d, 'error');
        },
        error: function (jqXHR, error, errorThrown) {
            var message,
                stack,
                name;
            var statusErrorMap = {
                '400': "Server understood the request, but request content was invalid.",
                '401': "Unauthorized access.",
                '403': "Forbidden resource can't be accessed.",
                '500': "Internal server error.",
                '503': "Service unavailable."
            };
            if (jqXHR.status) {
                message = statusErrorMap[jqXHR.status];
                stack = jqXHR.responseText;
                name = "<b>" + jqXHR.status + "</b> " + message;
                if (!message) {
                    message = errorThrown.message;
                    stack = errorThrown.stack;
                    name = jqXHR.status + " (Unknown Error) \n.";
                }

            } else {
                message = errorThrown.message;
                stack = isUndefined(errorThrown.stack) ? jqXHR.reponseText : errorThrown.stack
                name = isUndefined(errorThrown.name) ? "" : errorThrown.name;
            }
            var browser = 'UnKnown';
            if ($.browser.chrome) {
                browser = 'Chrome';
            } else if ($.browser.mozilla) {
                browser = 'Mozilla';
            } else if ($.browser.msie) {
                browser = 'Internet Explorer';
            }
            // Report The Error (Using Mailto)
            var browserVersion = $.browser.version;
            var reportBody = "Hai, %0D%0A %0D%0A While Accessing the Application I got some error. Please fix this and let me know. %0D%0A %0D%0A Error Occured at : " + window.location.href + " %0D%0A Error Stack : " + name + "%0D%0A User Agent : " + browser + " %0D%0A User Agent Version : " + browserVersion + " %0D%0A Date/Time : " + new Date() + encodeURIComponent(stack);
            var sendReportTo = "mailto:gopinath@innospire.com?subject=Error Occured &body=" + reportBody;

            alert("<h3><i class='fa fa-exclamation-circle' style='color:red; font-size:30px;'></i> " + name + "<h4><b>Error Stack :</b> <div style='float:right;'><i class='fa fa-envelope' style='color:gray; margin-right:2px;'></i><a style='font-size:13px;  margin-right: 10px;' id='errorReport' href='" + sendReportTo + "'>Report this Error</a></div></h4> <div class='stackcontainer'>" + stack + "</div>", 'error');
        }
    });
    return _data;

}

var UploadFile = function (file, systemFileName) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('filename', systemFileName);
    $.ajax({
        type: 'post',
        url: sys_FileUploaderURL,
        data: formData,
        success: function (status) {
            if (status != 'error') {
                return true
            }
            else {
                return false;
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            return false;
        }
    });
}

var DownloadDocument = function (fileName) {
    var data = { "fileName": fileName }
    $.ajax({
        type: 'post',
        url: sys_ajaxURL + "DownloadDocument",
        data: data,
        success: function (status) {

        },
        processData: false,
        contentType: false,
        error: function () {
            return false;
        }
    });
}

var RewriteWhereCondition = function (serviceMethod, formData) {
    var ObjBusinessUnit = null;
    switch (serviceMethod) {
        case 'CDMRead':
            $.each(formData["jsonString"], function (index, item) {
                if (item["whereClause"].length > 0) {
                    var _objsearchfilter = {};
                    _objsearchfilter.prependOperator = " AND ";
                    _objsearchfilter.fieldName = "BusinessUnitID";
                    _objsearchfilter.conditionalOperator = "=";
                    _objsearchfilter.fieldValue = parseInt(UserBusinessUnit);
                    _objsearchfilter.logicalOperator = null;
                    _objsearchfilter.postpendOperator = null;
                    item["whereClause"].push(JSON.stringify(_objsearchfilter));

                    if (_UserBusinessDepartmentID.length > 0) {
                        var _Str_UserDepartment = _UserBusinessDepartmentID.join(",");
                        var _objsearchfilter = {};
                        _objsearchfilter.prependOperator = " AND ";
                        _objsearchfilter.fieldName = "CDM_Department";
                        _objsearchfilter.conditionalOperator = "in";
                        _objsearchfilter.fieldValue = _Str_UserDepartment;
                        _objsearchfilter.logicalOperator = null;
                        _objsearchfilter.postpendOperator = null;
                        item["whereClause"].push(JSON.stringify(_objsearchfilter));
                    }

                }
                else {
                    var _objsearchfilter = {};
                    _objsearchfilter.prependOperator = null;
                    _objsearchfilter.fieldName = "BusinessUnitID";
                    _objsearchfilter.conditionalOperator = "=";
                    _objsearchfilter.fieldValue = parseInt(UserBusinessUnit);
                    //_objsearchfilter.prependOperator = " AND ";
                    //_objsearchfilter.fieldName = "CDM_Department";
                    //_objsearchfilter.conditionalOperator = "=";
                    //_objsearchfilter.fieldValue = parseInt(_UserBusinessDepartmentID);
                    _objsearchfilter.logicalOperator = null;
                    _objsearchfilter.postpendOperator = null;
                    item["whereClause"].push(JSON.stringify(_objsearchfilter));

                    if (_UserBusinessDepartmentID.length > 0) {
                        var _Str_UserDepartment = _UserBusinessDepartmentID.join(",");
                        var _objsearchfilter = {};
                        _objsearchfilter.prependOperator = " AND ";
                        _objsearchfilter.fieldName = "CDM_Department";
                        _objsearchfilter.conditionalOperator = "in";
                        _objsearchfilter.fieldValue = _Str_UserDepartment;
                        _objsearchfilter.logicalOperator = null;
                        _objsearchfilter.postpendOperator = null;
                        item["whereClause"].push(JSON.stringify(_objsearchfilter));
                    }
                }
            });
            break;
        case 'CDM_SP_Action':
            var templist = [];
            $.each(formData["StrjsonObject"], function (index, item) {
                var obj = {};
                obj = $.parseJSON(item);
                obj.BusinessUnitID = parseInt(UserBusinessUnit);
                templist.push(JSON.stringify(obj));
            });
            formData["StrjsonObject"] = templist;
            break;
        case 'CDM_SPMulti_Read':
            var obj = $.parseJSON(formData["StrjsonObject"]);
            obj.BusinessUnitID = parseInt(UserBusinessUnit);
            if (_UserBusinessDepartmentID.length > 0) {
                var _Str_UserDepartment = _UserBusinessDepartmentID.join(",");
                obj.CDM_Department = _Str_UserDepartment;
            }
            formData["StrjsonObject"] = JSON.stringify(obj);
            break;
        case 'CDM_SP_Read':
            var obj = $.parseJSON(formData["StrjsonObject"]);
            obj.BusinessUnitID = parseInt(UserBusinessUnit);
            if (_UserBusinessDepartmentID.length > 0) {
                var _Str_UserDepartment = _UserBusinessDepartmentID.join(",");
                obj.CDM_Department = _Str_UserDepartment;
            }
            //obj.CDM_Department = parseInt(_UserBusinessDepartmentID);
            formData["StrjsonObject"] = JSON.stringify(obj);
            break;
        case 'CDMSelect':
            $.each(formData["jsonString"], function (index, item) {
                var obj = $.parseJSON(item["whereClause"]);
                obj.BusinessUnitID = parseInt(UserBusinessUnit);
                //obj.CDM_Department = parseInt(_UserBusinessDepartmentID);
                if (_UserBusinessDepartmentID.length > 0) {
                    var _Str_UserDepartment = _UserBusinessDepartmentID.join(",");
                    obj.CDM_Department = _Str_UserDepartment;
                }
                item["whereClause"] = JSON.stringify(obj);
            });
            break;
    }

    return formData;
}
