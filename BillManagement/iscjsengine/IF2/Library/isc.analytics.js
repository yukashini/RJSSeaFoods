/// <reference path="isc.analytics.js" />
 (function ($) {
    if (!$.isc) {
        $.isc = {};
    }
    $.isc.analytics = (function () {
        var base = this;
		    base={options:"",log:""};
        var userinfo = {};
        var screeninfo = {};
                var _lstScreenlogInfo = [];
        // var iscLogApi = "http://localhost:3030/api/v1.0/";
        var iscLogApi = "https://iscanalytics.archarena.com/api/v1.0/";
        var exception = "";
        var sessionID = "";
        var init = function (options) {
            base.options = $.extend({}, $.isc.analytics.defaultOptions, options);
            base.log = $.isc.analytics.logOptions;
            data.isclogger();
        };

        var log = function (options) {
            base.log = $.extend({}, $.isc.analytics.logOptions, options);
            data.isclogger();
        }

        var data = {
            getUserInfo: function () {
                var strUserInfo = common.iscLoggetSession("isclogUserInfo");
                if (strUserInfo != undefined && strUserInfo != null) {
                    userinfo = common.iscLogParseStringToObject(strUserInfo);
                }
                else {
                    service.getUserInfo();
                }
            },
            getScreenInfo: function () {
                screeninfo = {
                    "Url": location.href,
                    "ScreenName": location.href.split("/").slice(-1).toString(),
                    "Action": (Event.target) ? Event.target : Event.srcElement,
                }
            },
            isclogger: function () {
                data.getUserInfo();
                data.getScreenInfo();
                if (base.log.type == undefined) {
                    type = "Info";
                }
                common.iscLoginitialize();
                //var entityID = 8000090;
                var entityID = 9100010;
                _private_JSON.sequenceID = [];
                common.iscLogaddDatatoProperties("sequenceID", common.iscLogrequestSequenceID(entityID));
                var currtime = new Date();
                var _array = common.iscLogqueryPrivateJson("sequenceID", "");
                var _entityID = entityID;
                var _nxtNumber = common.iscLogassignSequenceID(_array, _entityID);
                var ObjScreenLogInfo = {};
                if (_nxtNumber != undefined) {
                    ObjScreenLogInfo.EntityTypeID = _entityID;
                    ObjScreenLogInfo.ApplicationID = 3030;
                    ObjScreenLogInfo.IdentityID = _nxtNumber;
                    ObjScreenLogInfo.UserID = typeof userID == "undefined" ? 0 : userID;
                    ObjScreenLogInfo.IPAddress = userinfo[0].UserHostAddress;
                    ObjScreenLogInfo.SystemUser = userinfo[0].SystemUser;
                    ObjScreenLogInfo.Browser = userinfo[0].Browser;
                    ObjScreenLogInfo.ScreenName = screeninfo.ScreenName;
                    ObjScreenLogInfo.QueryString = screeninfo.Url;
                    ObjScreenLogInfo.Action = screeninfo.Action;
                    ObjScreenLogInfo.URL = screeninfo.Url;
                    ObjScreenLogInfo.Exception =exception;
                    ObjScreenLogInfo.IsMobile = userinfo[0].IsMobile;
                    ObjScreenLogInfo.ApplicationID = base.options.applicationId;
                    ObjScreenLogInfo.BusinessUnitID = typeof UserBusinessUnit == "undefined" ? 0 : UserBusinessUnit;
                    ObjScreenLogInfo.LogMessage = base.log.message;
                    ObjScreenLogInfo.LogType = base.log.type;
                    ObjScreenLogInfo.SessionID = userinfo[0].SessionID;
                    ObjScreenLogInfo.Environment = base.options.environment;
                    ObjScreenLogInfo.ClientID = base.options.ClientID;
                    service.isclogger(ObjScreenLogInfo);

                }
            },
            onerror: function (msg, url, lineNo, columnNo, error) {
                var string = msg.toLowerCase();
                var substring = "script error";
                if (string.indexOf(substring) > -1) {
                    console.log('Script Error: See Browser Console for Detail');
                } else {
                    var errormsg = [
                      'Message: ' + msg,
                      'URL: ' + url,
                      'Line: ' + lineNo,
                      'Column: ' + columnNo,
                      'Error object: ' + JSON.stringify(error)
                    ].join(' - ');
                    exception = errormsg;
		    base={options:"",log:""};
                    base.options = $.isc.analytics.defaultOptions;
                    base.log = $.isc.analytics.logOptions;
                    data.isclogger();
                }
                return false;
            }
        }

        var service = {
            getUserInfo: function () {
                var _lstuserinfo = [];
                var _obj = {};
                _lstuserinfo.push(JSON.stringify(_obj));
                var _obj = {
                    "": _lstuserinfo
                }
                $.when(common.iscLogCall_AsynAJAX("GetUserInfo", _obj)).done(function (response) {
                    userinfo = common.iscLogParseStringToObject(response);
                });
                sessionID = Date.now() + new Date().getUTCMilliseconds();
                userinfo[0]["SessionID"] = sessionID;
                common.iscLogsetSession("isclogUserInfo", JSON.stringify(userinfo));
            },
            isclogger: function (ObjScreenLogInfo) {
                var EntityInstances = [];
                _lstScreenlogInfo.push(JSON.stringify(ObjScreenLogInfo));
                var _obj = {
                    "": _lstScreenlogInfo
                }
                $.when(common.iscLogCall_AJAX("ExecuteSP/SP_CS_SaveIscLogger", _obj)).done(function (response) {
			 common.iscLogParseStringToObject(response);

                });
            }
        }

        var common = {
            // Session Handlers
            iscLogsetSession: function (key, value) {
                if (typeof (Storage) == "undefined") {
                    console.log("Your browser does not support HTML5 localStorage. Try upgrading.");
                }
                else {
                    sessionStorage.setItem(key, value);
                }
            },
            iscLoggetSession: function (key) {
                if (sessionStorage.getItem(key) === null || sessionStorage.getItem(key) === undefined) {
                    return null;
                }
                else {
                    return sessionStorage.getItem(key)
                }
            },
            iscLogclearSession: function (key) {
                if (typeof (Storage) == "undefined") {
                    console.log("Your browser does not support HTML5 localStorage. Try upgrading.");
                }
                else {
                    sessionStorage.removeItem(key);
                }
            },
            iscLoginitialize: function () {
                _private_JSON = {};
            },
            iscLogaddDatatoProperties: function (Key, ChangeSet) {
                _private_JSON[Key].push(ChangeSet);

            },
            iscLogqueryPrivateJson: function (Key, whereClause) {
                return _private_JSON[Key];
            },
            iscLogParseStringToObject: function (jsonString) {
                var _tempObj = $.parseJSON(jsonString);
                return _tempObj;
            },
            iscLogrequestSequenceID: function (entityid) {
                var _lstSequence = new Array();
                var _objsequence = {};
                _objsequence.EnityID = entityid;
                _objsequence._count = 10;
                _lstSequence.push(_objsequence);
                var sequenceobject = common.iscLoggetSequenceNumber(_lstSequence);
                return sequenceobject;
            },
            iscLogassignSequenceID: function (sequencearray, _entityID) {

                var _objArray = [];
                var _availableIndex = "";
                var _currentSID = undefined;
                var _isrecentID = false;

                $.each(sequencearray[0], function (index, item) {

                    if (item.EntityID == _entityID) {
                        if (item.EntityID == _entityID && item.AvailableIndex < item._Incrementcount) {
                            _availableIndex = item.AvailableIndex;
                            _currentSID = item.currentSID;
                            _currentSID = _currentSID + Number(_availableIndex);
                            item.AvailableIndex = Number(_availableIndex) + 1;
                        }
                        else {
                            var _lstSequence = new Array();
                            _objsequence = {};
                            _objsequence.EnityID = _entityID;
                            _objsequence._count = item._Incrementcount;
                            _lstSequence.push(_objsequence);
                            var sequenceobject = common.iscLoggetSequenceNumber(_lstSequence);
                            UpdatecompletejsonusingKeyandProperty("sequenceID", "EntityID", _entityID, sequenceobject[0])
                            _isrecentID = true;
                        }
                    }
                });

                if (_isrecentID) {
                    var _array = queryPrivateJson("sequenceID", "");
                    $.each(_array[0], function (index, item) {
                        if (item.EntityID == _entityID && item.AvailableIndex < item._Incrementcount) {
                            _availableIndex = item.AvailableIndex;
                            _currentSID = item.currentSID;
                            _currentSID = _currentSID + Number(_availableIndex);
                            item.AvailableIndex = Number(_availableIndex) + 1;
                        }
                    });
                }

                return _currentSID;
            },
            iscLogGetHeaders : function () {
                var UserToken = ReadSession('token');
                var Header = {};
                if (UserToken != undefined) {
                    Header.Authorization = 'bearer ' + UserToken;
                    return Header;
                }
                else {
                    return '';
                }
            },
            iscLoggetSequenceNumber:function getSequenceNumber(_lstSequence) {
                $.each(_lstSequence, function (index, item) {
                    item.ApplicationID = applicationID;
                });
                var serviceParameter = { "_lstRequestsequencenumber": _lstSequence };
                var _obj = Call_AJAX("getSequenceNumber", serviceParameter);
                $.each(_obj, function (index, item) {
                    item.AvailableIndex = 0;
                });
                return _obj;
            },
            // Ajax Service Handlers
            iscLogCall_AsynAJAX: function (serviceMethod, formData) {

                var _data = null;
                $.ajax({
                    async: false,
                    type: "GET",
                    url: iscLogApi + serviceMethod,
                    header: common.iscLogGetHeaders(),
                    data: JSON.stringify(formData),
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "json",
                    success: function (response) {
                        _data = response;
                    },
                    failure: function (msg) {
                        console.log("<i class='fa fa-exclamation-circle' style='color:red;'></i> " + msg.d, 'error');
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

                        console.log("<h3><i class='fa fa-exclamation-circle' style='color:red; font-size:30px;'></i> " + name + "<h4><b>Error Stack :</b> <div style='float:right;'><i class='fa fa-envelope' style='color:gray; margin-right:2px;'></i><a style='font-size:13px;  margin-right: 10px;' id='errorReport' href='" + sendReportTo + "'>Report this Error</a></div></h4> <div class='stackcontainer'>" + stack + "</div>", 'error');
                    }
                });
                return _data;

            },
            iscLogCall_AJAX: function (ServiceMethod, formdata) {
                formdata = common.iscLogRewriteWhereConditionCustomer(ServiceMethod, formdata);
                var _data = null;
                $.ajax({
                    async: false,
                    type: "POST",
                    url: iscLogApi + ServiceMethod,
                    header: common.iscLogGetHeaders(),
                    data: formdata,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "json",
                    success: function (response) {
                        _data = response;
                    },
                    failure: function (msg) {
                        console.log("<i class='fa fa-exclamation-circle' style='color:red;'></i> " + msg.d, 'error');
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

                    }
                });
                return _data;
            },
            iscLogRewriteWhereConditionCustomer: function (serviceMethod, formData) {
                var ObjBusinessUnit = null;
                //    switch (serviceMethod) {
                //        case 'CDMRead':
                //            $.each(formData["jsonString"], function (index, item) {
                //                if (item["whereClause"].length > 0) {
                //                    $.each(item["whereClause"], function (a, b) {
                //                        var _objsearchfilter = {};
                //                        _objsearchfilter.prependOperator = " AND ";
                //                        _objsearchfilter.fieldName = "BusinessUnitID";
                //                        _objsearchfilter.conditionalOperator = "=";
                //                        _objsearchfilter.fieldValue = parseInt(UserBusinessUnit);
                //                        _objsearchfilter.logicalOperator = null;
                //                        _objsearchfilter.postpendOperator = null;
                //                        item["whereClause"].push(JSON.stringify(_objsearchfilter));
                //                    });
                //                }
                //                else {
                //                    var _objsearchfilter = {};
                //                    _objsearchfilter.prependOperator = null;
                //                    _objsearchfilter.fieldName = "BusinessUnitID";
                //                    _objsearchfilter.conditionalOperator = "=";
                //                    _objsearchfilter.fieldValue = parseInt(UserBusinessUnit);
                //                    _objsearchfilter.logicalOperator = null;
                //                    _objsearchfilter.postpendOperator = null;
                //                    item["whereClause"].push(JSON.stringify(_objsearchfilter));
                //                }
                //            });
                //            break;
                //        case 'CDM_SP_Action':
                //            var templist = [];
                //            $.each(formData["StrjsonObject"], function (index, item) {
                //                var obj = {};
                //                obj = $.parseJSON(item);
                //                obj.BusinessUnitID = parseInt(UserBusinessUnit);
                //                templist.push(JSON.stringify(obj));
                //            });
                //            formData["StrjsonObject"] = templist;
                //            break;
                //        case 'CDM_SPMulti_Read':
                //            var obj = $.parseJSON(formData["StrjsonObject"]);
                //            obj.BusinessUnitID = parseInt(UserBusinessUnit);
                //            formData["StrjsonObject"] = JSON.stringify(obj);
                //            break;
                //        case 'CDM_SP_Read':
                //            var obj = $.parseJSON(formData["StrjsonObject"]);
                //            obj.BusinessUnitID = parseInt(UserBusinessUnit);
                //            formData["StrjsonObject"] = JSON.stringify(obj);
                //            break;
                //        case 'CDMSelect':
                //            $.each(formData["jsonString"], function (index, item) {
                //                var obj = $.parseJSON(item["whereClause"]);
                //                obj.BusinessUnitID = parseInt(UserBusinessUnit);
                //                formData["whereClause"] = JSON.stringify(obj);
                //            });
                //            break;
                //    }

                var strServiceMethod = $.trim(serviceMethod).toLowerCase().indexOf("executesp");
                if (strServiceMethod > -1) {
                    var templist = [];
                    $.each(formData[""], function (index, item) {
                        var obj = {};
                        obj = $.parseJSON(item);
                        obj.BusinessUnitID = parseInt(UserBusinessUnit);
                        templist.push(JSON.stringify(obj));
                    });
                    formData[""] = templist;
                }
                else {
                    $.each(formData[""], function (index, item) {
                        if (item["isLogin"] == undefined) {
                            if (item["ismaster"] == undefined) {
                                if (item["whereClause"].length > 0) {
                                    //$.each(item["whereClause"], function (a, b) {
                                    var _objsearchfilter = {};
                                    _objsearchfilter.prependOperator = " AND ";
                                    _objsearchfilter.fieldName = "BusinessUnitID";
                                    _objsearchfilter.conditionalOperator = "=";
                                    _objsearchfilter.fieldValue = parseInt(UserBusinessUnit);
                                    _objsearchfilter.logicalOperator = null;
                                    _objsearchfilter.postpendOperator = null;
                                    item["whereClause"].push(JSON.stringify(_objsearchfilter));
                                    // });
                                }
                                else {
                                    var _objsearchfilter = {};
                                    _objsearchfilter.prependOperator = null;
                                    _objsearchfilter.fieldName = "BusinessUnitID";
                                    _objsearchfilter.conditionalOperator = "=";
                                    _objsearchfilter.fieldValue = parseInt(UserBusinessUnit);
                                    _objsearchfilter.logicalOperator = null;
                                    _objsearchfilter.postpendOperator = null;
                                    item["whereClause"].push(JSON.stringify(_objsearchfilter));
                                }
                            }
                            else {
                                delete item["ismaster"];
                            }
                        }
                        else {
                            delete item["isLogin"]
                        }
                    });
                }

                return formData;
            }
        }

        return {
            init: init,
            log: log,
            onError: data.onerror
        }
    })();

    window.onerror = function (msg, url, lineNo, columnNo, error) {
        $.isc.analytics.onError(msg, url, lineNo,columnNo, error);
    }

    $.isc.analytics.defaultOptions = {
        applicationId: 0
    };

    $.isc.analytics.logOptions = {
        message: "Page Load Completed",
        type: "Information"
    };

    $.iscanalytics = function (options) {
        $.isc.analytics.init(options);
    };

    $.isclogger = function (options) {
        $.isc.analytics.log(options);
    };

})(jQuery);
