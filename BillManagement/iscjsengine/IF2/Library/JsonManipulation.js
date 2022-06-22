/// <reference path="../../LibraryJS/jquery-1.11.0.min.js" />



/*
*IF2 Json Manipulation 1.0
*(c) 2014-2015 Innospire Systems <www.innospire.com>
*
*Global methods to manipulate PrivateJson
*Intialize PrivateJson
*Set keys to PrivateJson
*Set values to keys in PrivateJson 
*Common manipualtion rules to iterate PrivateJSon
*/

/*Load PrivateJson to screen */
{
    function initialize() {
        _private_JSON = {};
    }
}

/*Set Properties to PrivateJson*/
{
    function addPropertiestoJson(whichJson, KeyName) {
        if (whichJson == 1) {
            _private_JSON[KeyName] = [];
        }

    }

    var setAddKeys = function (arrKey) {
        $.each(arrKey, function (index, item) {
            addPropertiestoJson(1, item);
        });
    }
}

/*Add data to Properties*/
{
    function addDatatoProperties(Key, ChangeSet) {
        _private_JSON[Key].push(ChangeSet);

    }

    function addSingleDatatoProperty(Key, ChangeSet) {

        _private_JSON[Key][0].push(ChangeSet);
    }
}

/*Query PrivateJson*/
{
    function queryPrivateJson(Key, whereClause) {
        return _private_JSON[Key];
    }
    function queryPrivateJsonSequencenumber(key, _index, itemname) {
        var _sequenceID = "";
        $.each(_private_JSON[key], function (index, item) {
            if (index == _index) {
                _sequenceID = item[itemname];
            }
        });
        return _sequenceID;
    }
    function isNull(inputArray) {
        for (var i = 0, len = inputArray.length; i < len; i += 1)
            if (inputArray[i] !== null)
                return false;
        return true;
    }
}

/*Assign sequenceid*/
{
    function assignSequenceID(sequencearray, _entityID) {

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
                    var sequenceobject = getSequenceNumber(_lstSequence);
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
    }
}

/*Parse insert object from PrivateJson*/
{
    function parseInsertObject(_jsonObject) {
        _submitObject = [];
        $.each(_jsonObject, function (index, item) {
            if (index !== "sequenceID" && index != "masterdata" && index != "validation") {
                var _jsonDetails = {};
                _jsonDetails.data = [];
                if (item.length > 0) {
                    $.each(item[0], function (subindex, subitem) {
                        subitem.ApplicationID = applicationID;
                        if (subitem.Ischanged) {
                            if (subitem.Flag == 1) {
                                delete subitem["IdentityID"]
                                subitem.BusinessUnitID = UserBusinessUnit;
                            }
                            delete subitem["Ischanged"]
                            _jsonDetails.viewname = subitem.viewname;
                            _jsonDetails.entityID = subitem.EntityTypeID;
                            _jsonDetails.data.push(JSON.stringify(subitem));
                        }
                    });
                }
                if (_jsonDetails.data != "undefined" && _jsonDetails.data.length > 0) {
                    _submitObject.push(_jsonDetails);
                }
            }
        });

        return _submitObject;
    }
}

/*Functions to show alert and parse Json*/
{
    function if2Alert(jsonObject) {
        alert(JSON.stringify(jsonObject));
    }

    function ParseStringToObject(jsonString) {
        var _tempObj = $.parseJSON(jsonString);
        return _tempObj;
    }


}

/*Read a complete json object inside a key using property and value*/
{

    /*e.g ,ReadJsonUsingIdentity("Storypoint","UsecaseID",1000)*/
    function readJsonUsingIdentity(key, Property, value) {
        var _temparray = [];
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {
                if (item[Property] == value) {
                    _temparray.push(item);
                }
            });
        }
        return _temparray;
    }


    // Global Read JSON by Key
    {
        function readGlobalJsonUsingIdentity(obj, Property, value) {
            var _temparray = [];
            if (obj) {
                $.each(obj, function (index, item) {
                    if (item[Property] == value) {
                        _temparray.push(item);
                    }
                });
            }
            return _temparray;
        }
    }
}

/*Read a single value inside object from Json using property and value*/
{
    /*e.g ,readJsonUsingPropertyandvalue("Usecase","UsecaseID",1001) */
    function readJsonUsingPropertyandvalue(key, Property, value) {
        var _index = null;
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {
                if (item[Property] == value) {
                    _index = index;
                }
            });
        }
        if (_index === null)
            return null;
        else
            return _private_JSON[key][0][_index];
    }
}

/*Update a single value inside object using IdentityID*/
{
    /*e.g,  UpdateJsonUsingPropertyandIdentity("Deliverable", "Ischanged", 1000, true);*/
    function UpdateJsonUsingPropertyandIdentity(key, Property, Identity, Changeset) {
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {
                if (item["IdentityID"] == Identity) {
                    item[Property] = Changeset;

                }

            });
        }
    }

    function UpdateJsonUsingCustomIdentity(key, Property, Value, ChangesetProperty, Changeset) {
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {

                if (item[Property] == Value) {
                    item[ChangesetProperty] = Changeset;
                }
            });
        }
    }


    function UpdatecompletejsonusingKeyandProperty(key, Property, Value, Changeset) {

        if (_private_JSON[key]) {
            var _index = 0;


            $.each(_private_JSON[key][0], function (index, item) {
                if (item[Property] == Value) {
                    _index = index;
                }
            });
            _private_JSON[key][0][_index] = Changeset;
        }

    }


}

/*Delete a single value inside object using IdentityID*/
{
    //Delete Particular Property inside Json Using Key
    function DeleteJsonUsingPropertyandIdentity(key, Property, Identity, Changeset) {
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {
                if (item["IdentityID"] == Identity) {
                    item[Property] = Changeset;
                }
            });
        }
    }

    function DeleteCompleteJsonPropertyandIdentity(key, Property, Identity) {

        var _index = 0;
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {
                if (item[Property] == Identity) {

                    _index = index;

                }

            });
        }
        delete _private_JSON[key][0].splice(_index, 1)

    }

}

/*Update data-attribute values inside control*/
{
    //e.g,  BinddatatoControls(1000, "Deliverable"); 
    function BinddatatoControls(_data, datakey) {

        $.each(_data, function (property, propertyvalue) {

            $.each($('input[data-key="' + datakey + '"],select[data-key="' + datakey + '"],textarea[data-key="' + datakey + '"]'), function (index, item) {

                if ($(this).attr("data-property") == property) {

                    $(this).val(propertyvalue);
                    $(this).attr("data-identity", _data["IdentityID"]);
                }

            });
        });
    }
}

/*Get Sequence Number*/
{
    function getSequenceNumber(_lstSequence) {
        $.each(_lstSequence, function (index, item) {
            item.ApplicationID = applicationID;
        });
        var serviceParameter = { "_lstRequestsequencenumber": _lstSequence };
        var _obj = Call_AJAX("getSequenceNumber", serviceParameter);
        $.each(_obj, function (index, item) {
            item.AvailableIndex = 0;
        });
        return _obj;
    }
}

function GetDistinctArray(array, AssociatePro) {

    var unique = {};
    var distinct = [];
    for (var i in array) {
        var _obj = array[i];


        if (typeof (unique[_obj[AssociatePro]]) == "undefined") {
            distinct.push(_obj);
        }
        unique[_obj[AssociatePro]] = 0;
    }
    return distinct;
}

function GetMatchedRecordsFromArray(objArray, property, value) {
    var _tempArray = [];
    _tempArray = JSON.stringify(objArray);
    var filterArray = [];

    filterArray = $.grep(ParseStringToObject(_tempArray), function (element, index) {
        if ($.trim(element[property]) === $.trim(value)) {
            return true;
        } else {
            return false;
        }
    });

    return filterArray;
}

var GetMatchedRecordLength = function (objArray, property, value) {
    var _tempArray = [];
    _tempArray = JSON.stringify(objArray);
    var filterArray = [];

    filterArray = $.grep(ParseStringToObject(_tempArray), function (element, index) {
        if ($.trim(element[property]) === $.trim(value)) {
            return true;
        } else {
            return false;
        }
    });

    return filterArray.length;
}


/*Validation*/
{
    function validate(key) {
        var _isvalid = 0;
        var keyArray = key.split(',');
        $.each(keyArray, function (index, item) {
            _isvalid = validateKey(item, key);
        });

        if (_isvalid)
            return true
        else
            return false;
    }

    function validateKey(searchkey, key) {

        var _isvalid = 0;
        var _isvalidlst = [];
        var _pvJson = _private_JSON;
        $.each(_pvJson["validation"][0], function (index, item) {
            if (item[searchkey]) {
                $.each(item[searchkey], function (subindex, subitem) {
                    _isvalid = validateValue(subitem, key);
                    _isvalidlst.push({ 'isvalid': _isvalid });
                });
            }
        });

        $.each(_isvalidlst, function (subindex, subitem) {

            if (subitem.isvalid == 0) {
                _isvalid = 0;
            }
        });
        return _isvalid;
    }

    function validateValue(searchtext, key) {

        var _isvalid = 0;
        searchtext = searchtext.trim();
        var _thiscontrol = "";
        var _count = 0;
        $('[data-property=' + searchtext + ']').each(function () {
            if ($(this).attr('data-key') == key) {
                _thiscontrol = $(this);
            }
        });

        var controltype = _thiscontrol.prop('type');
        var validatewith = "";
        var _controlclass = "";

        if (controltype == 'select-one') {

            validatewith = 0;
            _controlclass = "form-control";
        }
        else if (controltype == 'text') {
            validatewith = "";
            _controlclass = _thiscontrol.attr('class');
        }
        else if (controltype == 'textarea') {
            validatewith = "";
            _controlclass = "";
        } else if (controltype == 'select-multiple') {
            validatewith = 0;
            _controlclass = "form-control select2 select2-offscreen";

        }

        if (controltype != 'select-multiple') {
            if (_thiscontrol.val().trim() == validatewith) {

                _thiscontrol.removeClass(_controlclass).addClass('textbox-mandatory-s1');

                // $('<span class="label-required">This field is required.</span>').insertAfter('[data-property=' + searchtext.trim() + ']');
                var $errorMessage = _thiscontrol.parents('.screen-row').find('.form-control-failed').html();

                if ($errorMessage === undefined) {
                    _thiscontrol.parents('.screen-row').prepend('<div class="form-control-failed" style="margin-top: 0px; margin-bottom: 25px;"><strong>Oops!</strong> Change few things and try submitting again.</div>');
                }
                //alert($('[data-property=' + searchtext.trim() + ']').parents('.screen-row').html());


                _isvalid = 0;
            } else {
                _isvalid = 1;
            }

        } else {
            if (_thiscontrol.val() == null) {


                // $('<span class="label-required">This field is required.</span>').insertAfter('[data-property=' + searchtext.trim() + ']');
                var $errorMessage = _thiscontrol.parents('.screen-row').find('.form-control-failed').html();

                if ($errorMessage === undefined) {
                    _thiscontrol.parents('.screen-row').prepend('<div class="form-control-failed" style="margin-top: 0px; margin-bottom: 25px;"><strong>Oops!</strong> Change few things and try submitting again.</div>');
                }
                //alert($('[data-property=' + searchtext.trim() + ']').parents('.screen-row').html());


                _isvalid = 0;

            } else {
                _isvalid = 1;
            }

        }



        return _isvalid;
    }

    function showSuccesMessage() {
        destroyErrorMessage();
        $(".screen-row").prepend('<div class="form-control-success" style="margin-top: 0px; margin-bottom: 25px;"><strong>Success!</strong> You successfully posted data.</div>');
    }
    function destroySuccesMessage() {
        $('.screen-row').find('.form-control-success').remove();
    }
    function destroyErrorMessage() {
        $('.screen-row').find('.form-control-failed').remove();
    }

    function destroyErrorLabel() {
        $('.label-required').remove();
        $('.textbox-mandatory-s1').removeClass('textbox-mandatory-s1').addClass('textbox-text');
    }

    function showDeleteSucessMessage() {
        $('.hierarchical-container').prepend("<div class='form-control-warning'><strong>Deleted!</strong> Requested item was deleted you can't revert it back.</div>");
    }
    function destroyDeleteSucessMessage() {
        $('.hierarchical-container').find('.form-control-warning').remove();
    }

}


/* Ajax Time Duration Check */
function CalculateDuration() {

    var start_time = new Date().getTime();
    var request_time = "";
    request_time = new Date().getTime() - start_time;
    var seconds = Math.floor(request_time / 1000);
    var minutes = Math.floor(seconds / 60);

}

/*group by */
function GroupBy(myjson, attr) {
    var sum = {};

    myjson.forEach(function (obj) {
        if (typeof sum[obj[attr]] == 'undefined') {
            sum[obj[attr]] = 1;
        }
        else {
            sum[obj[attr]]++;
        }

    });

    return sum;
}

var isUrl = function (url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

var sort_by;

(function () {
    // utility functions
    var default_cmp = function (a, b) {
        if (a == b) return 0;
        return a < b ? -1 : 1;
    },
        getCmpFunc = function (primer, reverse) {
            var dfc = default_cmp, // closer in scope
                cmp = default_cmp;
            if (primer) {
                cmp = function (a, b) {
                    return dfc(primer(a), primer(b));
                };
            }
            if (reverse) {
                return function (a, b) {
                    return -1 * cmp(a, b);
                };
            }
            return cmp;
        };

    // actual implementation
    sort_by = function () {
        var fields = [],
            n_fields = arguments.length,
            field, name, reverse, cmp;

        // preprocess sorting options
        for (var i = 0; i < n_fields; i++) {
            field = arguments[i];
            if (typeof field === 'string') {
                name = field;
                cmp = default_cmp;
            }
            else {
                name = field.name;
                cmp = getCmpFunc(field.primer, field.reverse);
            }
            fields.push({
                name: name,
                cmp: cmp
            });
        }

        // final comparison function
        return function (A, B) {
            var a, b, name, result;
            for (var i = 0; i < n_fields; i++) {
                result = 0;
                field = fields[i];
                name = field.name;

                result = field.cmp(A[name], B[name]);
                if (result !== 0) break;
            }
            return result;
        }
    }
}());


var SetSession = function (key, value) {
    if (typeof (Storage) == "undefined") {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    }
    else {
        localStorage.setItem(key, value);
    }
}

var GetSession = function (key) {
    if (localStorage.getItem(key) === null || localStorage.getItem(key) === undefined) {
        return null;
    }
    else {
        return localStorage.getItem(key)
    }
}

var ClearSession = function (key) {
    if (typeof (Storage) == "undefined") {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    }
    else {
        localStorage.removeItem(key);
    }
}

var RandomString = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


var RegisterInstanceSearch = function () {

    $("#txtinstancesearch").autocomplete({
        source: function (request, response) {
            var _obj = {
                "searchtext": request.term
            }
            var _tempList = {};
            $.when(Call_AJAX("CDMInstanceRead", _obj)).done(function (serviceResponse) {
                _tempList = serviceResponse;
                var objSearchList = $.parseJSON(_tempList);
                response($.map(objSearchList, function (item) {
                    return {
                        label: item["TextField"] === null ? "" : item["TextField"],
                        value: item["TextField"] === null ? "" : item["TextField"],
                        entityname: item["EntityDisplayName"] === null ? "" : item["EntityDisplayName"],
                        departmentname: item["DepartmentName"] === null ? "" : item["DepartmentName"],
                        lastmodifiedby: item["LastModifiedBy"] === null ? "" : item["LastModifiedBy"],
                        lastmodifiedon: item["LastModifiedOn"] === null ? "" : moment(item["LastModifiedOn"], 'MM/DD/YYYY').format('Do MMM, YYYY')
                    }
                }));
            });
        },
        select: function (e, i) {
           // $loading.show();
            setTimeout(function () {

                $loading.hide();
            }, 0);

        },
        minLength: 5

    }).autocomplete("instance")._renderItem = function (ul, item) {
        ul.attr('class', 'isc-autocomplete');
        return $("<li class='isc-autocomplete-item-container'>")
                .append(
                '<div class="isc-tile-read-container-s1 tile-bor-top-active">'
             + '<div class="isc-tile-row-s1">'
             + '<h3 class="isc-lbl-tile-hdr-s1">' + item.label + '</h3>'
             + '<h3 class="isc-lbl-tile-hdr-s2">' + item.departmentname + '</h3><h3 class="isc-lbl-tile-hdr-s3">' + item.entityname + '</h3>'
             + '</div>'
             + '</div>'
                )
                .appendTo(ul);
    };

    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    }

}

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

var requestSequenceID = function (entityid) {
    var _lstSequence = new Array();
    _objsequence = {};
    _objsequence.EnityID = entityid;
    _objsequence._count = 10;
    _lstSequence.push(_objsequence);
    var sequenceobject = getSequenceNumber(_lstSequence);
    return sequenceobject;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

