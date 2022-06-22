
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
    function screenLoadJson() {
        _private_JSON = {};
        _gentityInfo = {};
    }
}

/*Function helps to generate and manage the global Entity Info*/
{
    function if2JsonPush_ManageEntityInfo(action, key, value) {
        if (action === "Update") {
            _gentityInfo[key] = value;
        }
        /*_public_JSON._gentityInfo.add*/

        /* Write the Logic for Managing the values , By Deleting, Insert, Update */

    }
}

/*Set keys to PrivateJson*/
{
    function if2addKeyJson(whichJson, KeyName) {
        if (whichJson == 1) {
            _private_JSON[KeyName] = [];
        }

    }
}

/*Add data to keys*/
{
    function if2addDatatoKey(Key, ChangeSet) {
        _private_JSON[Key].push(ChangeSet);

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
}

/*Assign sequenceid*/
{
    function assignSequenceID(sequencearray, _entityID) {
        var _objArray = [];
        var _availableIndex = "";
        var _currentSID = undefined;
        $.each(sequencearray[0], function (index, item) {
            if (item.EntityID == _entityID && item.AvailableIndex <= item._Incrementcount) {
                _availableIndex = item.AvailableIndex;
                _currentSID = item.currentSID;
                _currentSID = _currentSID + Number(_availableIndex);
                item.AvailableIndex = Number(_availableIndex) + 1;
            }
        });
        return _currentSID;
    }
}

/*Parse insert object from PrivateJson*/
{
    function parseInsertObject(_jsonObject) {
        _submitObject = [];
        $.each(_jsonObject, function (index, item) {
            if (index !== "SeqID" && index != "masterdata") {
                var _jsonDetails = {};
                _jsonDetails.data = [];
                $.each(item[0], function (subindex, subitem) {
                    if (subitem.Ischanged) {
                        if (subitem.Flag == 1) {
                            delete subitem["IdentityID"]
                        }
                        delete subitem["Ischanged"]
                        _jsonDetails.viewname = subitem.viewname;
                        _jsonDetails.entityID = subitem.EntityTypeID;
                        _jsonDetails.data.push(JSON.stringify(subitem));
                    }
                });
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

}

/*Read a single value inside object from Json using property and value*/
{
    /*e.g ,readJsonUsingPropertyandvalue("Usecase","UsecaseID",1001) */
    function readJsonUsingPropertyandvalue(key, Property, value) {
        var _index = 0;
        if (_private_JSON[key]) {
            $.each(_private_JSON[key][0], function (index, item) {
                if (item[Property] == value) {
                    _index = index;
                }
            });
        }
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
}

/*Update data-attribute values inside control*/
{
    //e.g,  BinddatatoControls(1000, "Deliverable"); 
    function BinddatatoControls(_data, datakey) {
        $.each(_data, function (property, propertyvalue) {
            $.each($('input[data-key="' + datakey + '"],select[data-key="' + datakey + '"]'), function (index, item) {
                if ($(this).attr("data-property") == property) {
                    $(this).val(propertyvalue);
                }
                $(this).attr("data-identity", _data["IdentityID"]);
            });
        });
    }
}
