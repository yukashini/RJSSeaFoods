//Navigation
function Screen_Navigation(userID, targetScreenID, currentScreenID, screenAction) {
    var masteriframe = window.parent.document.getElementById("IframeScreen");
    var _objNavigation = {};
    var ActionID = 10003;
    _objNavigation.TargetID = targetScreenID;
    _objNavigation.UserID = userID;
    _objNavigation.FromID = currentScreenID;
    _objNavigation.Action = screenAction;
    obj_navigation.Actionid = ActionID;
    var DTO = { '_objNavigation': _objNavigation };
    $.ajax({
        type: sys_ajaxPost, async: sys_ajaxAsyncFalse, dataType: sys_ajaxDataType, contentType: sys_ajaxContentType,
        url: sys_ajaxURL + "getNavigationAccess",
        data: JSON.stringify(DTO),
        success: function (datawrapper) {
            var navigation_result = datawrapper.d;
            $.each(navigation_result, function (index, item) {
                if (index == "_Navigation") {
                    if (item.TargetURL != null) {
                        $(masteriframe).attr("src", item.TargetURL);
                    }
                }
                else if (index == "_Error") {
                    if (item.ErrorDisplayMessage != null)
                        alert(item.ErrorDisplayMessage)
                }
            });
        },
        error: function (reuslt) {
            alert(reuslt.statusText);
        }
    });
}

function ScreenNavigation(userID, targetScreenID, currentScreenID, screenAction) {
    var hf_dirtyflag = window.parent.document.getElementById("hidden_dirtyflag");
    if ($(hf_dirtyflag).val() != 1) {
        Screen_Navigation(userID, targetScreenID, currentScreenID, screenAction);
    }
    else {
        $('<div></div>').appendTo('body')
                    .html('<div><h6>Changes has made do you want to leave?</h6></div>')
                    .dialog({
                        modal: true, title: 'Conformation message', zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: {
                            Yes: function () {
                                // $(obj).removeAttr('onclick');                                
                                // $(obj).parents('.Parent').remove();
                                Screen_Navigation(userID, targetScreenID, currentScreenID, screenAction);
                                $(this).dialog("close");
                            },
                            No: function () {
                                $(this).dialog("close");
                            }
                        },
                        close: function (event, ui) {
                            $(this).remove();
                        }
                    });

    }

}

function GetNavigation(object) {
    var DTO = { '_objNavigation': object };
    $.ajax({
        type: sys_ajaxPost, async: sys_ajaxAsyncFalse, dataType: sys_ajaxDataType, contentType: sys_ajaxContentType,
        url: sys_ajaxURL + "getNavigationAccess",
        data: JSON.stringify(DTO),
        success: function (datawrapper) {
            var navigation_result = datawrapper.d;
            $.each(navigation_result, function (index, item) {
                if (index == "_Navigation") {
                    if (item.TargetURL != null) {
                        var Iframe_Element = window.parent.document.getElementById("IframeScreen");
                        $(Iframe_Element).attr("src", item.TargetURL);
                        $("#IframeScreen").contents().find("#btn").click();
                    }
                }
                else if (index == "_Error") {
                    if (item.ErrorDisplayMessage != null)
                        alert(item.ErrorDisplayMessage)
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
    });
}

function Navigate(ActionID) {    
    if (!IsSessionExpired()) {
        var obj_navigation = {};
        var ActionID = ActionID;
        var json_session_Element = window.parent.document.getElementById("hfUser");
        var json_session = $(json_session_Element).val();
        var userid = 0;
        var obj_session = JSON.parse(json_session);
        $.each(obj_session.Default, function (index, item) {
            userid = item.Users_SID;
        });
        obj_navigation.UserID = userid;
        obj_navigation.Actionid = ActionID;
        obj_navigation.applicationID = applicationID;
        obj_navigation.Action = "C";
        Navigation(obj_navigation);
    }
    else {
        window.parent.location.href = "Login.htm";
    }
}

function Navigation(object) {
    var hf_dirtyflag = window.parent.document.getElementById("hidden_dirtyflag");
    if ($(hf_dirtyflag).val() != 1) {
        GetNavigation(object);
    }
    else {
        $('<div></div>').appendTo('body')
                    .html('<div><h6>Changes has made do you want to leave?</h6></div>')
                    .dialog({
                        modal: true, title: 'Conformation message', zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: {
                            Yes: function () {
                                GetNavigation(object);
                                $(this).dialog("close");
                            },
                            No: function () {
                                $(this).dialog("close");
                            }
                        },
                        close: function (event, ui) {
                            $(this).remove();
                        }
                    });
    }

}

function sessionDataSet(RequestedAction, EntityID) {
    var _sessionDataObject = {};
    _sessionDataObject = getSessionObject();
    _sessionDataObject.RequestedAction = RequestedAction;
    _sessionDataObject.EntityID = EntityID;
    setSessionObject(_sessionDataObject);
}
