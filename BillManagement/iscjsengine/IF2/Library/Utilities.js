/* Set Session*/

function SetSession(key, value) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem(key, value);
    } else {
        // Sorry! No Web Storage support..
    }
}

/* Read Session*/
function ReadSession(key) {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.getItem(key) === null || sessionStorage.getItem(key) === undefined) {
            return null;
        }
        else {
            return sessionStorage.getItem(key)
        }
    } else {
        // Sorry! No Web Storage support..g
    }
}

/* Remove Session*/
function RemoveSession(key) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.removeItem(key);
    } else {
        // Sorry! No Web Storage support..
    }
}

/* Check Session*/
function CheckSession(key) {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.getItem(key) !== null)
            return true;
    } else {
        // Sorry! No Web Storage support..
        return false;
    }
    return false;
}

var GetmatchedRecord = function (lst, Key, value) {
    var lstmatchedrecord = [];
    $.each(lst, function (index, item) {
        if (item[Key] == value) {
            lstmatchedrecord.push(item);
        }
    });
    return lstmatchedrecord;
}

var GetunmatchedRecord = function (lst, Key, value) {
    var lstmatchedrecord = [];
    $.each(lst, function (index, item) {
        if (item[Key] != value) {
            lstmatchedrecord.push(item);
        }
    });
    return lstmatchedrecord;
}

var GetunmatchedRecordFromArray = function (Sourcelst, Destlst, Key) {
    var lstmatchedrecord = Destlst;
    $.each(Sourcelst, function (a, b) {
        lstmatchedrecord = GetunmatchedRecord(lstmatchedrecord, Key, b);
    });
    return lstmatchedrecord;
}

// Get DistinctObjects from Array by Property
var GetDistinctArray = function (lookupArray, AssociatePro) {
    var unique = {};
    var distinct = [];
    for (var i in lookupArray) {
        var _obj = lookupArray[i];
        if (typeof (unique[_obj[AssociatePro]]) == "undefined") {
            distinct.push(_obj);
        }
        unique[_obj[AssociatePro]] = 0;
    }
    return distinct;
}

var MergeUniqueArrays = function (thisArray, otherArray) {
    var newArray = thisArray.concat(otherArray).sort(function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    });

    return newArray.filter(function (item, index) {
        return newArray.indexOf(item) === index;
    });
};

var GetHeaders = function () {
    var UserToken = ReadSession('token');
    var Header = {};
    if (UserToken != undefined) {
        Header.Authorization = 'bearer ' + UserToken;
        return Header;
    }
    else {
        return '';
    }
}

var GetQueryStrings = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = $.trim(hash[1]).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'');
    }
    return vars;
}

var ConvertToMinutesAndSeconds = function (Seconds) {
    var h = Math.floor(Seconds / 3600); //Get whole hours
    Seconds -= h * 3600;
    var m = Math.floor(Seconds / 60); //Get remaining minutes
    Seconds -= m * 60;
    return (h == 0 ? "" : (h + ":")) + (m < 10 ? '0' + m : m) + ":" + (Seconds < 10 ? '0' + Seconds : Seconds);
}

var ConvertToMinutesAndSecondsinWords = function (Seconds) {
    var h = Math.floor(Seconds / 3600); //Get whole hours
    Seconds -= h * 3600;
    var m = Math.floor(Seconds / 60); //Get remaining minutes
    Seconds -= m * 60;
    return (h == 0 ? "" : (h + "<span class='isc-timer-span'>hr(s)</span>")) + (m == 0 ? "" : (m + "<span class='isc-timer-span'>min(s)</span>")) + (Seconds < 10 ? "" : (Seconds.toFixed(0) + "<span class='isc-timer-span'>sec(s)</span> "));
}

var ConvertHoursBySeconds = function (Seconds) {
    var h = Math.floor(Seconds / 3600); //Get whole hours
    Seconds -= h * 3600;
    var m = Math.floor(Seconds / 60); //Get remaining minutes
    Seconds -= m * 60;
    return (h == 0 ? "" : (h + "<span class='isc-timer-span'>hr(s)</span>")) + (m == 0 ? "" : (m + "<span class='isc-timer-span'>min(s)</span>"));
}

var ObjSorter = function (data, key, way) {
    return data.sort(function (a, b) {
        var x = $.trim((a[key] == null ? '' : a[key])).toLowerCase();
        var y = $.trim((b[key] == null ? '' : b[key])).toLowerCase();
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

var ObjSorterByFloatNumber = function (data, key, way) {
    return data.sort(function (a, b) {
        var x = parseFloat(a[key]);
        var y = parseFloat(b[key]);
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

var ObjSorterByDate = function (data, key, way) {
    return data.sort(function (a, b) {
        var amyDate = a[key];
        var aNewDate = new Date(amyDate).getTime();
        var bmyDate = b[key];
        var bNewDate = new Date(bmyDate).getTime();
        if (way === '123') { return ((aNewDate < bNewDate) ? -1 : ((aNewDate > bNewDate) ? 1 : 0)); }
        if (way === '321') { return ((aNewDate > bNewDate) ? -1 : ((aNewDate < bNewDate) ? 1 : 0)); }
    });
}

var ObjSorterByNumber = function (data, key, way) {
    return data.sort(function (a, b) {
        var x = parseInt((a[key] == null ? 0 : a[key]));
        var y = parseInt((b[key] == null ? 0 : b[key]));
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

var Masking = function () {
    switch (lst[0]["type"]) {
        case "date":
            return moment(Value).format(lst[0]["Format"]);
            break;
        case "string":
            return $.trim(Value);
            break;
        case "Number":
            return Math.ceil(Value);
            break;
        case "Money":
            return lst[0]["symbol"] + parseFloat(Value).toFixed(lst[0]["decimalvalue"]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            break;
        case "Percentage":
            return Math.ceil(Value);
            break;
        case "Decimal":
            return parseFloat(Value).toFixed(lst[0]["decimalvalue"]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            break;
    }
}



var SetLocalStorate = function (key, val) {
    localStorage.setItem(key, val);
}

var GetLocalStorage = function (key) {
    return localStorage.getItem(key);
}

var SetCookie = function (val) {
    document.cookie = val;
}

function GetCookie(name) {
    var value = document.cookie;
    var parts = value.split(";");
    var CookieValue = null;
    $.each(parts, function (index, item) {
        var subparts = item.split(name + "=");
        if (subparts.length == 2) {
            CookieValue = (subparts[1] == "" ? null : subparts[1]);
        }
    });
    return CookieValue;
}

function Removecookie(name) {
    document.cookie = name + '=;';
}

//var ObjSorter = function (data, key, way) {
//    return data.sort(function (a, b) {
//        var amyDate = a[key];
//        var bmyDate = b[key];
//        if (way === '123') { return ((amyDate < bmyDate) ? -1 : ((amyDate > bmyDate) ? 1 : 0)); }
//        if (way === '321') { return ((amyDate > bmyDate) ? -1 : ((amyDate < bmyDate) ? 1 : 0)); }
//    });
//}

var Encryption = function (str) {
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var textBytes = aesjs.utils.utf8.toBytes(str);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

var Decryption = function (Encryptedstr) {
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var encryptedBytes = aesjs.utils.hex.toBytes(Encryptedstr);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}

var ConvertToMinutesAndSecondsinWords = function (Seconds) {
    var h = Math.floor(Seconds / 3600); //Get whole hours
    Seconds -= h * 3600;
    var m = Math.floor(Seconds / 60); //Get remaining minutes
    Seconds -= m * 60;
    return (h == 0 ? "" : (h + "<span>hr(s)</span>")) + (m == 0 ? "" : (m + "<span>min(s)</span>"));
}

var ConvertToHoursAndSeconds = function (Seconds) {
    var h = Math.floor(Seconds / 3600); //Get whole hours
    Seconds -= h * 3600;
    var m = Math.floor(Seconds / 60); //Get remaining minutes
    Seconds -= m * 60;
    return (h == 0 ? 0 : h);
}

var GetShortName = function (strName) {
    if (strName != null) {
        var lstWords = strName.split(' ');
        var ShortName = '';
        if (lstWords.length > 1) {
            $.each(lstWords, function (index, item) {
                if (index <= 1)
                    ShortName += $.trim(item).toUpperCase().charAt(0);
            });
        }
        else {
            ShortName += $.trim(lstWords[0]).toUpperCase().charAt(0);
            ShortName += $.trim(lstWords[0]).toUpperCase().charAt(1);
        }
        return ShortName;
    }
    else
    {
        return '';
    }
}

var NullHandling = function (value) {
    if (value == null || value == undefined)
        return '-';
    else
        return value;
}

var NullHandlingInteger = function (value) {
    if (value == null || value == undefined)
        return 0;
    else
        return value;
}

var removeURLParameter=function(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0] + '?' + pars.join('&');
        return url;
    } else {
        return url;
    }
}