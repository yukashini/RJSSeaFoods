/// <refKDerence path="../../lib/jquery-1.8.3.min.js" />
var _currentSessionString;
var _currrentSessionObject;
var _updatedSessionObject;


//Session data management

function setSessionObject(object) {
    
    var hfAppmaster = window.parent.document.getElementById("hfUser");
    if (hfAppmaster == undefined) {
        $("#hfUser").val(JSON.stringify(object));
    }
    else {
        $(hfAppmaster).val(JSON.stringify(object));
    }

}

function getSessionObject() {
    var hfAppmaster = window.parent.document.getElementById("hfUser");

    _currentSessionString = $("#hfUser").val();
   
    if (hfAppmaster == undefined) {
        _currentSessionString = $("#hfUser").val();
    }
    else {
        _currentSessionString = $(hfAppmaster).val();
    }
   
    _currrentSessionObject = JSON.parse(_currentSessionString);
    return _currrentSessionObject
}
function getSessionKeyValue(sessionKey) {
    var hfAppmaster = window.parent.document.getElementById("hfUser");
    var _sessionProperty = {};
    if (hfAppmaster == undefined) {
        _currentSessionString = $("#hfUser").val();
    }
    else {
        _currentSessionString = $(hfAppmaster).val();
    }
    _currrentSessionObject = JSON.parse(_currentSessionString);
    $.each(_currrentSessionObject, function (index, item) {
        if (index == sessionKey) {
            _sessionProperty = item;
        }
    });
    return _sessionProperty;
}


function IsSessionExpired() {
    var hfMastersessionTimeout = window.parent.document.getElementById("hfSessionTimeout");
    var strSessionTimeout = '';
    if (hfMastersessionTimeout === undefined)
        strSessionTimeout = $("#hfSessionTimeout").val();
    else
        strSessionTimeout = $(hfMastersessionTimeout).val();
    var objSessionTimeout = JSON.parse(strSessionTimeout);
    var currentdatetime = new Date();
    var SessionRefreshed = new Date(objSessionTimeout.SessionRefreshed);
    var difference = (currentdatetime - SessionRefreshed);    
    if (Math.round(((difference % 86400000) % 3600000) / 60000) < objSessionTimeout.Timeout) {
        objSessionTimeout.SessionRefreshed = new Date();
        if (hfMastersessionTimeout === undefined)
            $("#hfSessionTimeout").val(JSON.stringify(objSessionTimeout));
        else
            $(hfMastersessionTimeout).val(JSON.stringify(objSessionTimeout)) 
        return false;
    }
    else
        return true;
}

