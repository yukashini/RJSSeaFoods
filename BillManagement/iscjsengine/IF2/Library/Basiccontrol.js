







/*Tag*/
var _ativeTabs = "";
function drawTabs(_objif2tabs) {
    var _tabs = '<ul class="t22-tab-detail" id="ul_dynamic">' + getlistitems(_objif2tabs.Tabfield);
    IF2append(_objif2tabs.ContainerID, _tabs);
    $("#tab_0_0,#tab_1_0,#tab_2_0").addClass("active");
}
function getlistitems(tabfield) {
    // $("#page-h3-title").append(JSON.stringify(tabfield))
    var _litems = '';
    var tab = tabfield.Tabs;
    var _tIndex = tabfield.TabIndex;
    var htmlBody = "";
    for (var itevar = 0; itevar < tab.length; itevar++) {
        var target = 'tab_' + _tIndex + '_' + itevar;
        if (itevar === 0) {
            _litems = '<li class="active">' +
                        '<a href="#tab_' + _tIndex + "_" + itevar + ' " data-toggle="tab">' +
                            '<div class="t22-tab-inactive">' +
                                '<div class="row-fluid">' +
                                    '<div class="pull-left">' +
                                        '<div>' +
                                            '<span class="t22-question-label">' + tab[itevar].HeaderText + '</span></div>' +
                                        '<div>' +
                                            '<span class="t22-value-label"></span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="pull-right">' +
                                        '<span class="bold"><i class="fa ' + tab[itevar].IconURL + ' t22-details-icon"></i></span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                        '</li>';
        }
        else {
            _litems = _litems + '<li>' +
                        '<a href="#tab_' + _tIndex + "_" + itevar + ' " data-toggle="tab">' +
                            '<div class="t22-tab-inactive">' +
                                '<div class="row-fluid">' +
                                    '<div class="pull-left">' +
                                        '<div>' +
                                            '<span class="t22-question-label">' + tab[itevar].HeaderText + '</span></div>' +
                                        '<div>' +
                                            '<span class="t22-value-label"></span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="pull-right">' +
                                        '<span class="bold"><i class=" fa ' + tab[itevar].IconURL + ' t22-details-icon"></i></span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                        '</li>';
        }


        htmlBody = htmlBody + tabBodyHtml(target, tabfield.TabContent["tab_" + itevar]);
    }
    _litems = _litems + '</ul>';
    var _tabContent = '<div class="tab-content nav-bor-success t22-media-nav-adj">' + htmlBody + '</div>';


    return _litems + _tabContent;
}
function tabBodyHtml(target, _entity) {
    var tabbody = '';
    tabbody = '<div class="tab-pane " id="' + target + '">' + _entity + '</div>';
    return tabbody;

}
function IF2append(elementID, htmlstring) {
    $('#' + elementID).append(htmlstring);
}



/*T22 Controls*/

function T22_drawTextarea(_objif2Textarea) {
    var _strAttr = GenerateDataAttribute(_objif2Textarea.DataAttr);
    var T22_textarea = '';
    T22_textarea = ' <div class="input-fieldset-default"> <label class="">' + _objif2Textarea.lable + ' </label>' +
                   ' <div><textarea id="' + _objif2Textarea.ID + '" cols= "' + _objif2Textarea.columns + '" ' + ' rows= "' + _objif2Textarea.rows +
                   '" class= "' + _objif2Textarea.CSSClass + '"' + _strAttr +
                   '>' +
                   ' </textarea></div></div>';
    return T22_textarea;
}
function T22_drawbutton(_objif2button) {
    var _strAttr = GenerateDataAttribute(_objif2button.DataAttr);
    var T22_button = '';
    if (_objif2button.Data === "fa fa-plus icon-white") {

        T22_button = '<a  id="' + _objif2button.ID + '" class="' + _objif2button.CSSClass + '" ' + _strAttr + '>' +
                  '<i class="' + _objbtn.Data + '"></i></a>';
    }
    else {
        T22_button = '<a  id="' + _objif2button.ID + '" class="' + _objif2button.CSSClass + '" ' + _strAttr + '>' + _objif2button.Data +
                  '</a>';
    }
    return T22_button;
}

function GenerateDataAttribute(dAttr) {
    var _strDataAttr = "";
    if (dAttr != undefined) {
        $.each(dAttr, function (index, item) {
            var _attr = "data-" + item.Key + "=";
            var _value = '"' + item.Value + '"';
            var _str = _attr + _value;
            _strDataAttr = _strDataAttr + "  " + _str;
        });
    }
    return _strDataAttr;
}


/*End*/

function drawTable(_objTable) {

    var _tableHTML = "";
    _tableHTML = '<table class = "' + _objTable.css + '">';
    _tableHTML = _tableHTML + drawTableHeader(_objTable);
    _tableHTML = _tableHTML + drawTableBody(_objTable);
    _tableHTML = _tableHTML + '</table>';
    return _tableHTML;
}
function drawTableHeader(_objTable) {
    var _headerHTML = "";
    _headerHTML = '<tr>'
    $.each(_objTable.Column, function (index, item) {
        _headerHTML = _headerHTML + '<th class="' + item.css + '" style="' + item.customstyle + '" >' + item.headerText + ' </th>';
    });
    _headerHTML = _headerHTML + '</tr>';
    return _headerHTML;
}
function drawTableBody(_objTable) {

    var _bodyHTML = '';
    var _emptyRows = '';
    $.each(_objTable.Data, function (index, item) {

        _bodyHTML = _bodyHTML + '<tr>';
        $.each(_objTable.Column, function (colindex, colitem) {
            if (item[colitem.datafield] === null || item[colitem.datafield] === "null") {
                item[colitem.datafield] = "";
            }
            if (colitem.controlType == "textbox") {
                _bodyHTML = _bodyHTML + '<td class=' + colitem.css + '><input type="text" class="grid-textbox" ' + Buildproperty(colitem, index) + ' data-identity="' + item["IdentityID"] + '" value="' + item[colitem.datafield] + '" /> </td>';
            }
            else if (colitem.controlType == "sselect") {
                _bodyHTML = _bodyHTML + '<td class=' + colitem.css + '><select class="form-control select2me" ' + Buildproperty(colitem, index) + ' data-identity="' + item["IdentityID"] + '">' + bindoptions(colitem.controlmasterdata, item[colitem.datafield], colitem.Datavaluefield, colitem.Datatextfield) + ' </select></td>';
            } else if (colitem.controlType == "label") {

                _bodyHTML = _bodyHTML + '<td class=' + colitem.css + '><span class="textbox--edit-default w-100-per" value="' + item[colitem.datafield] + '">' + item[colitem.datafield] + '</span> </td>';
            } else if (colitem.controlType == "hidden") {

                _bodyHTML = _bodyHTML + '<td style="display: block;"><span class="textbox--edit-default w-100-per" value="' + item[colitem.datafield] + '">' + item[colitem.datafield] + '</span></td>';
            } else if (colitem.controlType == "action") {
                _bodyHTML = _bodyHTML + '<td style="display: block;"><a href="#"  title="Add">Edit</a><td>';
            } else if (colitem.controlType == "checkbox") {
                _bodyHTML = _bodyHTML + '<td><center><input type="checkbox" ' + Buildproperty(colitem, index) + ' data-identity="' + item["IdentityID"] + '" value="' + item[colitem.datafield] + '" ' + bindcheckd(item[colitem.datafield]) + ' /></center></td>';
            }

        });
        _bodyHTML = _bodyHTML + '</tr>';
    });
    return _bodyHTML;

    //    <tr ><td class=""><input type="text" entity-id="" value="" /></td><td><input type="text" entity-id="" value="" /></td></tr>

}


function bindcheckd(_status) {

    var _checked = "";

    if (parseInt(_status) === 1) {

        _checked = "checked"
    }

    return _checked;
}


function bindoptions(selectoptions, selecteditem, valuefield, textfield) {

    var temparray = ParseStringToObject(selectoptions[0]);
    var _htmldata = '';
    if (temparray) {
        $.each(temparray, function (index, item) {
            //alert(item.KeyListID + "," + selecteditem);
            if (item[valuefield] === parseInt(selecteditem))
                _htmldata = _htmldata + '<option value="' + item[valuefield] + '" selected="selected">' + item[textfield] + '</option>';
            else
                _htmldata = _htmldata + '<option value="' + item[valuefield] + '">' + item[textfield] + '</option>';
        });
    }

    return _htmldata;

}
function Buildproperty(_objcolumn, rowindex) {
    var _propertycolumn = '';
    $.each(_objcolumn.controlProperties, function (index, item) {
        if (item.key !== "data-index") {
            _propertycolumn = _propertycolumn + " " + item.key + "= " + "'" + item.value;
            _propertycolumn = _propertycolumn + "'";
        }
        else {
            _propertycolumn = _propertycolumn + " " + item.key + "= " + "'" + rowindex;
            _propertycolumn = _propertycolumn + "'";
        }
    });
    return _propertycolumn;

}

/*july 26*/

// Control Container

function drawControlContainer(_objcontainer) {
    var _container = '';
    $.each(_objcontainer.sections, function (index, item) {
        if (!item.visiblity)
            _container = _container + '<div id="' + _objcontainer.ID + '_' + index + '" class="' + item.css + '" style="display:none;"></div>';
        else
            _container = _container + '<div id="' + _objcontainer.ID + '_' + index + '" class="' + item.css + '"></div>';
    });
    $("#" + _objcontainer.ID).prepend(_container);
}
function drawText(_objText, container, controlIndex) {
    $("#" + container + "_" + controlIndex).append(_objText.Text);
}
function drawAdvancedFilter(_objAdvancedFilter, container, controlIndex) {
    var advancedfilter = '';
    advancedfilter = '<div class="btn-group"><button class="btn dropdown-toggle" type="button" data-toggle="dropdown">' + _objAdvancedFilter.headerText + '<i class="fa ' + _objAdvancedFilter.headerTextIconCss + '"></i></button>';
    advancedfilter = advancedfilter + '<div class="dropdown-menu dropdown-content input-large hold-on-click" role="menu"><form action="#">';
    if (_objAdvancedFilter.hasfilter) {
        advancedfilter = advancedfilter + '<div class="input-group"><input type="text" class="form-control" placeholder="search..."><span class="input-group-btn"><button class="btn blue" type="submit"><i class="fa fa-search"></i></button></span></div>';
    }
    advancedfilter = advancedfilter + '<ul class="t22-adv-filter-hiden-sub-menu">';
    $.each(_objAdvancedFilter.options, function (index, item) {
        if (item.isActive) { advancedfilter = advancedfilter + '<li class="active" data-popid="AddReq">'; }
        else { advancedfilter = advancedfilter + '<li data-popid="' + item.target + '">'; }
        advancedfilter = advancedfilter + '<a href="#' + item.target + '" data-toggle="modal"><div class="pull-left">' + item.text + '</div><div class="pull-right"><i class="fa fa-check-square"></i></div></a></li>';
    });
    advancedfilter = advancedfilter + '</ul>';
    $("#" + container + "_" + controlIndex).append(advancedfilter);
}
function drawTabs_1(_objif2tabs, container, controlIndex) {
    var _tabs = '';
    _tabs = '<div class="row margin-bottom-10"><div class="col-lg-12"><div class="entity-panel-default"><h3 class="lbl-entity-default">' + _objif2tabs.headerText + '<span class="lbl-entity-default-sub">' + _objif2tabs.SubheaderText + '</span></h3></div></div></div>';
    _tabs = _tabs + '<ul class="t22-tab-detail">' + drawtabsections(_objif2tabs.Tabfield) + '</ul>';
    $("#" + container + "_" + controlIndex).append(_tabs);
}
function drawtabsections(tabfield) {
    var _litems = '';
    var tab = tabfield.Tabs;
    var _tIndex = tabfield.TabIndex;
    for (var itevar = 0; itevar < tab.length; itevar++) {
        var target = 'tab_' + _tIndex + '_' + itevar;
        if (itevar === 0) { _litems = _litems + '<li class="active">'; }
        else { _litems = _litems + '<li>'; }
        _litems = _litems + '<a href="#tab_' + _tIndex + "_" + itevar + ' " data-toggle="tab">' +
                            '<div class="t22-tab-inactive">' +
                                '<div class="row-fluid">' +
                                    '<div class="pull-left">' +
                                        '<div>' +
                                            '<span class="t22-question-label">' + tab[itevar].HeaderText + '</span></div>' +
                                        '<div>' +
                                            '<span class="t22-value-label"></span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="pull-right">' +
                                        '<span class="bold"><i class="fa ' + tab[itevar].IconURL + ' t22-details-icon"></i></span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                        '</li>';

    }
    return _litems;
}
function drawcontroldiv(_objcontroldiv) {

    var controldiv = '';
    var availablewidth = 100;
    var loopcount = 0;
    var css = [];
    var width = [];
    var height = [];
    var visiblity = [];
    var _objcss = {};
    var _objwidth = {};
    var _objheight = {};
    var _objvisiblity = {};
    $.each(_objcontroldiv.css, function (index, item) {
        var temparray = item.split('$');
        _objcss = {}
        _objcss.index = temparray[0];
        _objcss.value = temparray[1];
        css.push(_objcss);
    });
    $.each(_objcontroldiv.width, function (index, item) {
        var temparray = item.split('$');
        _objwidth = {}
        _objwidth.index = temparray[0];
        _objwidth.value = temparray[1];
        width.push(_objwidth);
    });
    var assignedwidthcount = width.length;
    if (assignedwidthcount !== _objcontroldiv.columns) {
        var nonalloted = parseInt(_objcontroldiv.columns) - parseInt(assignedwidthcount);

        var allotedcolumns = [];
        var totalcolumns = [];
        for (var i = 0; i < _objcontroldiv.columns; i++) {
            totalcolumns.push(parseInt(i + 1));
        }
        $.each(width, function (index, item) {
            allotedcolumns.push(parseInt(item.index));
            availablewidth = parseInt(availablewidth) - parseInt(item.value);
        });
        var splitedwidth = availablewidth / nonalloted;
        for (i = 0; i < totalcolumns.length; i++) {
            for (j = 0; j < allotedcolumns.length; j++) {
                if (arr[j] != totalcolumns[i]) {

                    _objwidth = {}
                    _objwidth.index = totalcolumns[i].toString();
                    _objwidth.value = splitedwidth.toString();
                    width.push(_objwidth);

                }
            }
        }

    }

    $.each(_objcontroldiv.height, function (index, item) {
        var temparray = item.split('$');
        _objheight = {}
        _objheight.index = temparray[0];
        _objheight.value = temparray[1];
        height.push(_objheight);
    });

    $.each(_objcontroldiv.visiblity, function (index, item) {
        var temparray = item.split('$');
        _objvisiblity = {}
        _objvisiblity.index = temparray[0];
        _objvisiblity.value = temparray[1];
        visiblity.push(_objvisiblity);
    });

    for (var i = 0; i < _objcontroldiv.columns; i++) {
        if (_objcontroldiv.oriantation === "v") {

        } else {
            controldiv = controldiv + '<div id="' + _objcontroldiv.targetdiv + '_' + i + '"  ' + getcss(parseInt(i) + 1, css) + ' ' + buildstyle(parseInt(i) + 1, width, height, visiblity) + ' ></div>';

        }
    }

    $("#" + _objcontroldiv.targetdiv).prepend(controldiv);
}
function getcss(cssindex, css) {
    var cssclass = 'class="';
    $.each(css, function (index, items) {
        if (parseInt(items.index) === cssindex) {
            cssclass = cssclass + ' ' + items.value;
        }
    });
    return cssclass + '"';
}
function buildstyle(sizeindex, width, height, visiblity) {
    var itemwidth = "";
    $.each(width, function (index, item) {
        if (parseInt(item.index) === sizeindex) itemwidth = item.value;
    });
    var itemheight = "";
    $.each(height, function (index, item) {
        if (parseInt(item.index) === sizeindex) itemheight = item.value;
    });

    var itemvisiblity = "block";
    $.each(visiblity, function (index, item) {
        if (parseInt(item.index) === sizeindex && item.value === "false")
            itemvisiblity = "none";
    });
    var style = '';
    if (itemwidth.length !== 0 || itemheight.length !== 0 || itemvisiblity.length !== 0) {
        style = 'style="';
        if (itemwidth.length !== 0) style = style + 'width:' + itemwidth + '%;';
        if (itemheight.length !== 0) style = style + ' height:' + itemheight + 'px;';
        if (itemvisiblity.length !== 0) style = style + ' display:' + itemvisiblity;
        style = style + '"';
    }
    return style;
}
function drawTextbox(_objif2textbox, container, controlIndex) {
    var _textbox = '';
    var _strAttr = GenerateDataAttribute(_objif2textbox.DataAttr);
    //var _checkmanditory = checkManditory(_objif2textbox.DataAttr);




    _textbox = '<div class="control-cell">';
    _textbox += '<label class="label-control">' + _objif2textbox.lable;
//    if (_checkmanditory) {

//        _textbox += '<span class="label-control-mandatory">*</span>';
//    }
    _textbox += '</label><div>';

    _textbox += '<input type="text" id="' + _objif2textbox.ID + '" class="textbox-text"  ' + _strAttr + ' >  </div>';
    $("#" + container + "_" + controlIndex).append(_textbox);
}

function drawtextboxwithIcon(_objif2textbox, container, controlIndex)
{
    var _textbox = '';
    var _strAttr = GenerateDataAttribute(_objif2textbox.DataAttr);
    //var _checkmanditory = checkManditory(_objif2textbox.DataAttr);




    _textbox = '<div class="input-icon">';
    _textbox += '<label class="label-filter">' + _objif2textbox.lable;
    //    if (_checkmanditory) {

    //        _textbox += '<span class="label-control-mandatory">*</span>';
    //    }
    _textbox += '</label><i class="fa fa-search"></i>';

    _textbox += '<input type="text" id="' + _objif2textbox.ID + '" placeholder="' + _objif2textbox.lable + '" class="form-control"  ' + _strAttr + ' >  </div><div>';
    $("#" + container + "_" + controlIndex).append(_textbox);
}


function checkManditory(dAttr) {

    var isvalid = false;
    var _searchkey = "";
    var _searchby = "";
    if (dAttr != undefined) {
        $.each(dAttr, function (index, item) {
            if (item.Key == "key") {
                _searchkey = item.Value;
            }
            if (item.Key == "property") {
                _searchby = item.Value;
            }

        });

        var _checkvalid = checkManditoryusingKeyandValue(_searchkey, _searchby);
        if (_checkvalid > 0) {
            isvalid = true;
        }
    }
    return isvalid;

}

function checkManditoryusingKeyandValue(searchkey, searchby) {
    var _isvalid = 0;
    var _pvJson = _private_JSON;
    $.each(_pvJson["validation"][0], function (index, item) {
        if (item[searchkey]) {
            $.each(item[searchkey], function (subindex, subitem) {
                if (subitem == searchby) {
                    _isvalid = 1;
                }
            });
        }
    });
    return _isvalid;
}


function drawFilterDropdown(_objif2selectbox, container, controlIndex) {

    var _T22_htmlselectbox = '';
    var _strAttr = GenerateDataAttribute(_objif2selectbox.DataAttr);

    if (_objif2selectbox.Options == "disable") {
        var _strOptions = bindmasterdropdownoptions(_objif2selectbox.Data, _objif2selectbox.Datavaluefield, _objif2selectbox.Datatextfield);
    }
    else {
        var _strOptions = bindmasterdropdownoptions1(_objif2selectbox.Data, _objif2selectbox.Datavaluefield, _objif2selectbox.Datatextfield);
    }

    _T22_htmlselectbox = '<div class="filter-cell"> <label class="label-filter">' + _objif2selectbox.lable + ' </label>';

//    if (_objif2selectbox.validation) {

//        _T22_htmlselectbox += '<span class="label-control-mandatory">*</span>';
//    }
    _T22_htmlselectbox += ' <select id="' + _objif2selectbox.ID + '"  class="' + _objif2selectbox.CSSClass + '" data-style="' + _objif2selectbox.CustomStyle + '" data-placeholder="Select..." ' + _strAttr +
                        '>' +
                          _strOptions + ' </select></div>';

    $("#" + container + "_" + controlIndex).append(_T22_htmlselectbox);

}


function drawFilterCheckbox(_objif2checkbox, container, controlIndex) {

    var _T22_htmlcheckbox = '';
    var _strAttr = GenerateDataAttribute(_objif2checkbox.DataAttr);

    _T22_htmlcheckbox += '<div class="filter-cell">';
    _T22_htmlcheckbox += '<label class="label-checkbox" style="margin-top:13px;">' + _objif2checkbox.lable + ' </label>';

    _T22_htmlcheckbox += '<input type="checkbox" id="' + _objif2checkbox.ID + '"  class="' + _objif2checkbox.CSSClass + '" data-style="' + _objif2checkbox.CustomStyle + '"  ' + _strAttr + ' />';

    _T22_htmlcheckbox += '</label>';
    _T22_htmlcheckbox += '</div>';

    $("#" + container + "_" + controlIndex).append(_T22_htmlcheckbox);



}


function drawAddScreenDropdown(_objif2selectbox, container, controlIndex) {

    var _T22_htmlselectbox = '';
    var _strAttr = GenerateDataAttribute(_objif2selectbox.DataAttr);
    var _strOptions = bindmasterdropdownoptions(_objif2selectbox.Data, _objif2selectbox.Datavaluefield, _objif2selectbox.Datatextfield);
   // var _checkmanditory = checkManditory(_objif2selectbox.DataAttr);


    _T22_htmlselectbox += '<div class="filter-cell">';
    _T22_htmlselectbox += '<label class="label-filter">' + _objif2selectbox.lable;
//    if (_checkmanditory) {

//        _T22_htmlselectbox += '<span class="label-control-mandatory">*</span>';
//    }

    _T22_htmlselectbox += '</label>';
    _T22_htmlselectbox += ' <select id="' + _objif2selectbox.ID + '"  class="' + _objif2selectbox.CSSClass + '" data-style="' + _objif2selectbox.CustomStyle + '" data-placeholder="Select..." ' + _strAttr + '>';
    _T22_htmlselectbox += _strOptions + ' </select>';
    _T22_htmlselectbox += '</div>';


    $("#" + container + "_" + controlIndex).append(_T22_htmlselectbox);

}



function drawTextarea(_objif2Textarea, container, controlIndex) {
    var _strAttr = GenerateDataAttribute(_objif2Textarea.DataAttr);
    var T22_textarea = '';
    T22_textarea = ' <div class="control-cell"> <label class="label-control">' + _objif2Textarea.lable + ' </label>' +
                   ' <textarea id="' + _objif2Textarea.ID + '" cols= "' + _objif2Textarea.columns + '" ' + ' rows= "' + _objif2Textarea.rows +
                   '" class= "' + _objif2Textarea.CSSClass + '"' + _strAttr +
                   '>' +
                   ' </textarea></div>';
    $("#" + container + "_" + controlIndex).append(T22_textarea);

}
function drawSearchButton(_objif2button, container, controlIndex) {
    var _strAttr = GenerateDataAttribute(_objif2button.DataAttr);
    var T22_button = '';
    T22_button += '<div class="filter-cell">';
    T22_button += '<div class="filter-post-container">';
    if (_objif2button.Data === "fa fa-plus icon-white") {

        T22_button += '<a  id="' + _objif2button.ID + '" class="' + _objif2button.CSSClass + '" ' + _strAttr + '>' +
                  '<i class="' + _objbtn.Data + '"></i></a>';
    }
    else {
        T22_button += '<a  id="' + _objif2button.ID + '" class="' + _objif2button.CSSClass + '" ' + _strAttr + '>' + _objif2button.Data +
                  '</a>';
    }

    T22_button += '</div></div>';

    $("#" + container + "_" + controlIndex).append(T22_button);
}
function DrawTablev1(_objTable, container, controlIndex) {

    var _tableHTML = "";
    _tableHTML = '<table class = "' + _objTable.css + '">';
    _tableHTML = _tableHTML + drawTableHeader(_objTable);
    _tableHTML = _tableHTML + drawTableBody(_objTable);
    _tableHTML = _tableHTML + '</table>';

    $("#" + container + "_" + controlIndex).append(_tableHTML);


}

function bindmasterdropdownoptions(selectoptions, valuefield, textfield) {

    var temparray = selectoptions;
    var _htmldata = '';
    //_htmldata += '<option value="0">--Select--</option>';
    if (temparray.length > 0) {
        $.each(temparray, function (index, item) {

            if (item[textfield] != null) {
                _htmldata = _htmldata + '<option value="' + item[valuefield] + '">' + item[textfield] + '</option>';
            }
        });
    }
    return _htmldata;
}


function bindmasterdropdownoptions1(selectoptions, valuefield, textfield) {

    var temparray = selectoptions;
    var _htmldata = '';
    _htmldata += '<option value="0">--All--</option>';
    $.each(temparray, function (index, item) {

        if (item[textfield] != null) {
            _htmldata = _htmldata + '<option value="' + item[valuefield] + '">' + item[textfield] + '</option>';
        }

    });
    return _htmldata;
}


function drawButton(_objif2button, container) {
    var _strAttr = GenerateDataAttribute(_objif2button.DataAttr);
    var _buttonHtml = '';
    _buttonHtml += '<a  id="' + _objif2button.ID + '" href="#"  class="' + _objif2button.CSSClass + '" ' + _strAttr + '>' + _objif2button.Data +
  '</a>';

    $("#" + container).append(_buttonHtml);

}

/*Jan 5*/
{

    function Drawleftsideactiondetails(actionArray, actionid, mode) {

        var tempArray = $.parseJSON(actionArray);
        var _objcurrentIdenity = {};

        $.map(tempArray, function (subelement, subindex) {
            if (subelement.CampaignLeadID == _pageSession._campaignLeadID && subelement.IsRecent == 1) {
                _objcurrentIdenity = subelement;
            }

        });

        var html = '';

        html += '<div class="addactivity-row containerdivivivi">';
        html += '<div class="actionlinks-title-cell-s1">';
        html += ' <a class="link-action-small addnew" href="#NewContact" data-toggle="modal" data-leadID=' + _objcurrentIdenity.LeadID + '>Add new</a> <a class="link-action-small edit" href="#NewContact" data-toggle="modal" data-leadID=' + _objcurrentIdenity.LeadID + '>';
        html += '  Edit</a>';
        html += ' </div>';
        html += ' </div>';

        //Display Name
        html += ' <div class="addactivity-row">';
        html += ' <div class="addactivity-title-cell">';
        html += ' <h4 class="label-addactivity-title">';
        html += _objcurrentIdenity.Firstname + ',<span class="label-addactivity-sub-title">' + _objcurrentIdenity.CompanyName + '</span>';
        html += '</h4>';
        html += '</div>';
        html += '</div>';

        html += '<div class="addactivity-row">';
        html += '<div class="addactivity-title-cell">';
        html += '<label class="label-addactivity-section-title">';

        if (_objcurrentIdenity.Jobtitle) {
            html += _objcurrentIdenity.Jobtitle;
        }

        html += '</label>';
        html += '<span class="icon-addactivity-ratings-small"></i>';
        html += '</span>';
        html += '</div>';
        html += '</div>';

        html += '<div class="addactivity-row">';
        html += '<div class="addactivity-title-cell">';
        html += '<label class="label-addactivity-section-title">';

        if (_objcurrentIdenity.CategoryName) {
            html += _objcurrentIdenity.CategoryName;
        }

        html += '</label>';
        html += '</div>';
        html += '</div>';


        //Contact Information
        html += '<div class="informatic-container">';
        html += '<div class="informatic-row">';
        html += '<ul class="informatic-list-items">';
        html += '<li>';

        if (mode == "reload" && _objcurrentIdenity.IsDialed == 1) {
            html += '<div class="informatic-list-items-cell contactdialclick" style="cursor:pointer;background-color:lightgray;">';
        } else {
            html += '<div class="informatic-list-items-cell contactdialclick" style="cursor:pointer;">';
        }


        html += '<div class="cell-row">';
        html += '<div class="informatic-list-cell-text cell-left">';
        html += 'CONTACT';
        html += '</div>';
        html += '<div class="icon-action-img cell-right sNumber" style="cursor:pointer" data-identity=' + _objcurrentIdenity.ActionID + '>';
        html += '<img src="img/PHONE-ICON.png">';
        html += '</div>';
        html += '</div>';
        var outputString = _objcurrentIdenity["PrimaryContactNo"].trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');
        html += '<div class="list-cell-phonenumber leadcontanctno" data-callingnumber="' + outputString + '">';


        if (_objcurrentIdenity.PrimaryContactNo) {

            var outputString = _objcurrentIdenity["PrimaryContactNo"].trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');

            if (outputString.length == 10) {

                var _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));

                html += _tmpPrimaryContactNo;
            }
        } else {

            html += "No Number";
        }

        html += '</div>';
        html += '<div class="informatic-list-cell-extensiontext">';
        html += 'Ext: -';
        if (_objcurrentIdenity.PrimaryExtension) {

            html += _objcurrentIdenity.PrimaryExtension;
        }

        html += '</div>';

        html += '</div>';
        html += '</li>';
        html += '<li>';

        if (mode == "reload" && _objcurrentIdenity.IsDialed == 1) {
            html += '<div class="informatic-list-items-cell contactdialclick" style="cursor:pointer;background-color:lightgray;">';
        } else {

            html += '<div class="informatic-list-items-cell contactdialclick" style="cursor:pointer;">';
        }

        html += '<div class="cell-row">';
        html += '<div class="informatic-list-cell-text cell-left">';
        html += 'ALTERNATE';
        html += '</div>';
        html += '<div class="icon-action-img cell-right sNumber" style="cursor:pointer" data-identity=' + _objcurrentIdenity.ActionID + '>';
        html += '<img src="img/PHONE-ICON.png">';
        html += '</div>';
        html += '</div>';
        
        
       
        if (_objcurrentIdenity.CompanyContactNo) {

            
         
            var outputString = _objcurrentIdenity["CompanyContactNo"].trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');

            if (outputString.length == 10) {

                var _ContactNo = (outputString.substr(0, 3) + '-' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                html += '<div class="list-cell-phonenumber leadcontanctno" data-callingnumber="' + _ContactNo + '">';
                var _tmpCompanyContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                html += _tmpCompanyContactNo;
            }

        } else {
            html += '<div class="list-cell-phonenumber leadcontanctno" data-callingnumber="' + _objcurrentIdenity.CompanyContactNo + '">';
            html += "No Number";
        }

        html += '</div>';
        html += '<div class="informatic-list-cell-extensiontext">';
        html += 'Ext: -';
        if (_objcurrentIdenity.CompanyExtension) {
            html += _objcurrentIdenity.CompanyExtension;
        }
        html += '</div>';
        html += '</div>';
        html += '</li>';
        html += '<li>';
        html += '<div class="informatic-list-items-cell">';
        html += '<div class="informatic-list-cell-text">';
        html += 'EMAIL';
        html += '</div>';
        html += '<div>';

        if (_objcurrentIdenity.PrimaryEmailID) {

            html += '<a href="mailto:' + _objcurrentIdenity.PrimaryEmailID + '" class="link-informatic-email-data">' + _objcurrentIdenity.PrimaryEmailID + '</a>';
        }
        else {

            html += "No MailID";
        }

        html += '</div>';
        html += '</div>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '</div>';

        //Time Details
        html += ' <div class="informatic-container" style="min-height:30px;">';
        html += ' <div class="cell-row">';
        var nd = '';
        var sss = '';
        var tempArrayTimeZone = {};

        var icheck = 0;

        if (_objcurrentIdenity.PrimaryContactNo != "" && _objcurrentIdenity.PrimaryContactNo) {

            var outputString = _objcurrentIdenity["PrimaryContactNo"].trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');

            if (outputString.length == 10) {
                icheck = 1;
                var _tmpAreaCodeNo = outputString.substr(0, 3);

                var currentTime = new Date();
                var localTime = currentTime.getTime();
                var localOffset = currentTime.getTimezoneOffset() * 60000;
                var utc = localTime + localOffset;

                tempArrayTimeZone = readJsonUsingIdentity("AreacodeDetails", "AreacodeID", _tmpAreaCodeNo);

                if (tempArrayTimeZone[0]) {
                    nd = new Date(utc + (3600000 * (parseInt(tempArrayTimeZone[0]["TimeZone"]))));
                    sss = DateFormatNew.format.date(nd, 'H:m a');
                } else {
                    sss = "ET";
                }
            }

        }

        if (_objcurrentIdenity.CompanyContactNo != "" && icheck == 0 && _objcurrentIdenity.CompanyContactNo) {

            var outputString = _objcurrentIdenity["CompanyContactNo"].trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');

            if (outputString.length == 10) {

                var _tmpAreaCodeNo = outputString.substr(0, 3);

                var currentTime = new Date();
                var localTime = currentTime.getTime();
                var localOffset = currentTime.getTimezoneOffset() * 60000;
                var utc = localTime + localOffset;
                tempArrayTimeZone = readJsonUsingIdentity("AreacodeDetails", "AreacodeID", _tmpAreaCodeNo);
                if (tempArrayTimeZone[0]) {
                    nd = new Date(utc + (3600000 * (parseInt(tempArrayTimeZone[0]["TimeZone"]))));

                    sss = DateFormatNew.format.date(nd, 'H:m a');
                } else {
                    sss = "ET";

                }
            }
        }

        html += ' <div class="cell-left">';
        html += '<h4 class="informatic-list-cell-text">';
        html += 'Local Time:<span class="mar-lft-10">' + sss + ' </span>';
        html += '</h4>';
        html += '</div>';
        html += '<div class="cell-right">';
        html += '<h4 class="informatic-list-cell-text">';

        html += '</h4>';
        html += '</div>';

        html += '</div>';

        html += '</div>';

        //        html += '<div class="addactivity-level-container">';
        //        html += '<div class="addactivity-level-row">';

        //        html += '<div class="cell-left">';

        //        html += '<div class="addactivity-level-title-cell">';
        //        html += '<h4 class="label-addactivity-level-title">';
        //        html += 'Pipeline Stages';
        //        html += '</h4>';
        //        html += '</div>';
        //        html += '<div class="addactivity-status-cell">';
        //        html += '<ul class="addactivity-group-status">';

        //        //        var piplineobj = readJsonUsingPropertyandvalue("CampaignLeadHistory", "CampaignLeadID", _campaignLeadID);

        //        //        html += '<li class="active" title="Lead"><span>' + piplineobj.Leadduration + '</span></li>';
        //        //        html += '<li><span>' + piplineobj.IntitialConduration + '</span></li>';
        //        //        html += '<li><span>' + piplineobj.Execduration + '</span></li>';
        //        //        html += '<li><span>' + piplineobj.Demoduratiomn + '</span></li>';
        //        //        html += '<li><span>' + piplineobj.ReachingoutDuration + '</span></li>';
        //        html += '</ul>';
        //        html += '</div>';
        html += '</div>';

        //        html += '<div class="cell-right">';

        //        html += '</div>';

        //        html += '</div>';
        //        html += '</div>';

        // var temp = JSON.stringify(_private_JSON.CampaignLeadComments);

        var tempArrayComments = readJsonUsingIdentity("CampaignLeadComments", "LeadID", parseInt(_objcurrentIdenity["LeadID"]));
        //var tempArrayComments = [];
        html += '<div class="addactivity-control-container ">';
        html += '<div class="addactivity-control-row">';

        html += '<div class="addactivity-level-title-cell cell-left">';
        html += '<h4 class="label-addactivity-level-title">';
        html += 'Notes';
        html += '</h4>';
        html += '</div>';


        html += '<div class="cell-right">';
        if (tempArrayComments.length > 0) {
            html += '<a class="button-action-add btnaddcommentsforcamapignlead" data-CampaignLeadCommentID =' + tempArrayComments[0]["CampaignLeadCommentID"] + ' data-CampaignID=' + _objcurrentIdenity.CampaignID + ' data-LeadID=' + _objcurrentIdenity.LeadID + ' data-CampaignLeadID=' + _objcurrentIdenity.CampaignLeadID + ' onclick="AddLeadComments()">Save</a>';
        } else {
            html += '<a class="button-action-add btnaddcommentsforcamapignlead" data-CampaignLeadCommentID ="" data-CampaignID=' + _objcurrentIdenity.CampaignID + ' data-LeadID=' + _objcurrentIdenity.LeadID + ' data-CampaignLeadID=' + _objcurrentIdenity.CampaignLeadID + ' onclick="AddLeadComments()">Save</a>';
        }
        html += '</div>';

        html += '</div>';


        html += '<div class="addactivity-control-row1">';
        html += '<div class="">';
        //        html += '<textarea id="txtaddleadcomments"  data-adaptheight rows="3" cols="42"  style="padding: 16px; line-height: 1.5;min-height:125px" >';
        html += ' <textarea id="txtaddleadcomments" data-adaptheight="" rows="3" cols="42" style="padding: 16px; line-height: 1.5; min-height: 125px; box-sizing: border-box; overflow-y: hidden; height: 148px;">';
        // html += '<textarea id="txtaddleadcomments"  data-adaptheight rows="3" cols="42"  style="padding: 16px; line-height: 1.5; min-height: 125px;">';
        if (tempArrayComments.length > 0) {

            html += tempArrayComments[0].Comments;
        }
        html += '</textarea>';
        html += '</div>';

        html += '</div>';

        html += '</div>';
        html += '<div class="addactivity-row">';
        html += '<div class="actionlinks-title-cell-s2">';


        var companyID = _objcurrentIdenity["CompanyID"];

        //        var tempCompanyContacts = readJsonUsingIdentity("Lead", "CompanyID", companyID);

        //        var filterArray = [];
        //        filterArray = $.grep(tempCompanyContacts, function (tempelement, tempindex) {
        //            if (tempelement["CampaignLeadID"] != _objcurrentIdenity.CampaignLeadID) {
        //                return true;
        //            } else {
        //                return false;
        //            }
        //        });


        // html += '<a class="link-action-large alternativecontactclick"  data-CampaignLeadID=' + _objcurrentIdenity.CampaignLeadID + ' data-companyID=' + companyID + ' href="#">Show Alternate Contacts (' + filterArray.length + ')</a>';
        html += '</div>';
        html += '</div>';

        return html;

    }

    function DrawcommentsCampaignLead(item) {

        var html = '';

        //var tempArray = readJsonUsingIdentity("Action", "CampaignLeadID", item.CampaignLeadID);

        // var tempArray = readJsonUsingIdentity("ActionComments", "CampaignLeadID", item.CampaignLeadID);


        var tempArray = _private_JSON.ActionComments[0];
        if (tempArray.length > 0) {

            var check = 0;
            $.map(tempArray, function (element, indx) {
                if (element.Comment !== "") {
                    check = 1;
                }
            });

            if (check === 0) {

                html += '<div> No Comments Found</div>';
                return html;

            }

            html += ' <div class="feedback-container">';
            tempArray = tempArray.sort(function (a, b) {
                return b["ActionID"] - a["ActionID"];
            });



            $.each(tempArray, function (indx, itm) {

                // if (itm.Comment != "" && itm.ActionID != item.ActionID) {
                //Changes

                if (itm.Comment != "") {

                    html += '<div class="feedback-row">';
                    html += '  <div class="feedback-section-container">';
                    html += '<div class="feedback-title-cell">';
                    html += '<h4 class="label-feedback-title">';
                    html += itm.CreatedByName + ' <span class="label-datetime-title">' + DateFormatNew.format.date(itm.UpdatedOn, "MMM D,yyyy HH:mm:ss") + '</span>';
                    html += '</h4>';
                    html += '</div>';

                    html += '<div class="feedback-title-cell">';
                    html += '<p class="para-feedback-title">';
                    html += itm.Comment;
                    html += '</p><br />';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                }
            });
            html += '</div>';
        } else {

            html += '<div> No Comments Found</div>';
        }

        return html;
    }
}

/*Jan 19 */
{

    function BindLeftSideLeadFilter(ObjArray, mode) {

        var _html = '';
        if (mode == "load") {

            _html += '<div id="Departmentfilter">';
            _html += '<div class="label-lead-list-title">';
            _html += 'Department';
            _html += '</div>';
            _html += '<ul class="checkbox-list-container">';
            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter">';
            _html += '<span>Operations</span> </a></li>';

            _html += ' </ul>';
            _html += ' </div>';

            //class="checkleadfilter"


        } else if (mode == "Reload") {

        }


        return _html;
    }


    function DrawRegionFilter(ObjArray, mode) {

        var _html = '';
        if (mode == "load") {

            _html += '<div class="label-lead-list-title">';
            _html += 'Region';
            _html += '</div>';
            _html += '<ul class="checkbox-list-container">';

            var _regionArray = ParseStringToObject(_private_JSON.masterdata[0][3].data[0]);
            $.each(_regionArray, function (indx, item) {
                var wherecondition = { "RegionID": item.KeyListID };
                _html += '<li><a href="#">';
                _html += '<input type="checkbox"  class="checkleadsfilter" data-id="Regionfilter" data-title="Region" data-property="RegionID"  data-identity=' + item.KeyListID + '>';
                _html += '<span>' + item.Value1 + '</span>';
                _html += ' <span class="count">(' + getitemCount(ObjArray, wherecondition) + ')</span>';
                _html += '</a></li>';

            });

            _html += '</ul>';

        }

        return _html;
    }

    function DrawEmployeeSizeFilter(ObjArray, mode) {

        var _html = '';

        if (mode == "load") {

            _html += '<div class="label-lead-list-title">';
            _html += 'Employee Size';
            _html += '</div>';
            _html += '<ul class="checkbox-list-container">';
            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="EmpSizefilter" data-title="Employee" data-property="EmployeeSizeFilter"  data-identity=1>';
            _html += '<span>Less than 500</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "EmployeeSizeFilter": 1 }) + ')</span>';
            _html += '</a></li>';


            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="EmpSizefilter" data-title="Employee" data-property="EmployeeSizeFilter"  data-identity=2>';
            _html += '<span>500 to 2000</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "EmployeeSizeFilter": 2 }) + ')</span>';
            _html += '</a></li>';


            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="EmpSizefilter" data-title="Employee" data-property="EmployeeSizeFilter" data-identity=3>';
            _html += '<span>2000 to 5000</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "EmployeeSizeFilter": 3 }) + ')</span>';
            _html += '</a></li>';

            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="EmpSizefilter" data-title="Employee" data-property="EmployeeSizeFilter" data-identity=4>';
            _html += '<span>Greater than 5000</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "EmployeeSizeFilter": 4 }) + ')</span>';
            _html += '</a></li>';


            _html += '</ul>';

        }
        return _html;
    }


    function DrawRevenueFilter(ObjArray, mode) {

        var _html = '';

        if (mode == "load") {

            _html += '<div class="label-lead-list-title">';
            _html += 'Revenue Size';
            _html += '</div>';
            _html += '<ul class="checkbox-list-container">';
            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="Revenuefilter" data-title="Revenue" data-property="RevenueFilter" data-identity=1>';
            _html += '<span>Less than 1 Million</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "RevenueFilter": 1 }) + ')</span>';
            _html += '</a></li>';

            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="Revenuefilter" data-title="Revenue" data-property="RevenueFilter" data-identity=2>';
            _html += '<span>1 Million to 100 Million</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "RevenueFilter": 2 }) + ')</span>';
            _html += '</a></li>';

            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="Revenuefilter" data-title="Revenue" data-property="RevenueFilter" data-identity=3>';
            _html += '<span>100 Million to 500 Million</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "RevenueFilter": 3 }) + ')</span>';
            _html += '</a></li>';

            _html += '<li><a href="#">';
            _html += '<input type="checkbox" class="checkleadsfilter" data-id="Revenuefilter" data-title="Revenue" data-property="RevenueFilter" data-identity=4>';
            _html += '<span>Greater than 500 Million</span>';
            _html += ' <span class="count">(' + getitemCount(ObjArray, { "RevenueFilter": 4 }) + ')</span>';
            _html += '</a></li>';

            _html += ' </ul>';

        }
        return _html;
    }

    function DrawRoleFilter(ObjArray, mode) {


        var _html = '';
        if (mode == "load") {

            _html += '<div class="label-lead-list-title">';
            _html += 'Role';
            _html += '</div>';
            _html += '<ul class="checkbox-list-container">';

            var _roleArray = ParseStringToObject(_private_JSON.masterdata[0][4].data[0]);
            $.each(_roleArray, function (indx, item) {
                var wherecondition = { "RoleID": item.KeyListID };
                _html += '<li><a href="#">';
                _html += '<input type="checkbox"  class="checkleadsfilter" data-id="Rolefilter" data-title="Role" data-property="RoleID"  data-identity=' + item.KeyListID + '>';
                _html += '<span>' + item.Value1 + '</span>';
                _html += ' <span class="count">(' + getitemCount(ObjArray, wherecondition) + ')</span>';
                _html += '</a></li>';

            });

            _html += '</ul>';

        }

        return _html;
    }



    var getitemCount = function (obj, whereClause) {
        var itemcount = 0;
        if ($.isEmptyObject(whereClause) || whereClause === null) {
            itemcount = obj.length;
        }
        else {
            var str = '';
            var loopcount = 0;
            for (var key in whereClause) {
                if (loopcount == 0) {
                    str += 'item.' + key + '==' + whereClause[key];
                    loopcount++;
                }
                else
                    str += ' && ' + 'item.' + key + '==' + whereClause[key];
            }
            $.each(obj, function (index, item) {
                if (eval(str)) {
                    itemcount++;
                }
            });
        }
        return itemcount;
    };




}

/*June 11 */

{
    function DrawQuickViewDetails(actionID) {

        var html = '';

        var tempArray = _private_JSON.Action[0];

        var _objcurrentIdenity = {};

        $.map(tempArray, function (subelement, subindex) {
            if (subelement.ActionID == actionID) {
                _objcurrentIdenity = subelement;
            }

        });
        if (_objcurrentIdenity.ActionID) {

            html += '<div class="modal-content">';
            html += '<div class="modal-section-header">';
            html += '<div class="screen-row">';
            html += '<div class="cell-left">';
            if (_objcurrentIdenity.CampaignEntityStatus == 0) {
                html += '<label style="color:#DB4E3C;">Rejected</label>';
            }

            html += '<h3 class="label-model-hdr-s1">';
            html += _objcurrentIdenity["Firstname"];
            html += '</h3>';
            html += '<h3 class="label-model-hdr-s2">';
            html += _objcurrentIdenity["CompanyName"];
            html += '</h3>';
            html += '<h3 class="label-model-hdr-s3">';
            html += '<a>';
            if (_objcurrentIdenity.PrimaryEmailID) {

                html += '<a href="mailto:' + _objcurrentIdenity.PrimaryEmailID + '" class="link-informatic-email-data">' + _objcurrentIdenity.PrimaryEmailID + '</a>';
            }
            else {

                html += "No MailID";
            }
            html += '</a>';
            html += '</h3>';
            html += '<h3 class="label-model-hdr-s3">';

            var currentcontactno = _objcurrentIdenity["PrimaryContactNo"];

            var _tmpPrimaryContactNo = '';
            if (currentcontactno != "" && currentcontactno) {
                var outputString = currentcontactno.trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');

                if (outputString.length == 10) {
                    _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                }
            } else {
                currentcontactno = _objcurrentIdenity["CompanyContactNo"];
                var outputString = currentcontactno.trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');

                if (outputString.length == 10) {
                    _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                }

            }
            html += _tmpPrimaryContactNo;

            html += '</h3>';
            html += '</div>';
            html += '<div class="cell-right">';
            html += '<div class="form-control-cell-right-closeimg">  <a href="#" id="closeQuickViewModal">  <img src="img/closexmark.png"></a> </div>';
            html += '<h3 class="label-model-hdr-s4">';
            html += _objcurrentIdenity["CampaignName"];
            html += '</h3>';
            html += '<h3 class="label-model-hdr-s5">';
            html += _objcurrentIdenity["WorkflowStatusText"];
            html += '</h3>';
            html += '</div>';
            html += '</div>';
            html += '</div>';


            var _objwhereClause = {};
            _objwhereClause.CampaignLeadID = _objcurrentIdenity.CampaignLeadID;
            _objwhereClause.ImpedimentStatus = 0;
            _objwhereClause.CampaignProgressStatus = 7002;

            var _lstselect = [];
            var _objJsonObject = {};
            _objJsonObject.viewName = "ActionCommentsRead";
            _objJsonObject.entityID = 0;
            _objJsonObject.whereClause = JSON.stringify(_objwhereClause);
            _objJsonObject.orderBy = [];
            _objJsonObject.groupBy = [];
            _lstselect.push(_objJsonObject);

            var _objwhereClauseLeadComments = {};
            _objwhereClauseLeadComments.LeadID = _objcurrentIdenity.LeadID;

            var _objJsonObject = {};
            _objJsonObject.viewName = "CampaignLeadCommentsRead";
            _objJsonObject.entityID = 0;
            _objJsonObject.whereClause = JSON.stringify(_objwhereClauseLeadComments);
            _objJsonObject.orderBy = [];
            _objJsonObject.groupBy = [];
            _lstselect.push(_objJsonObject);

            var _obj = { "jsonString": _lstselect };
            var _tempList = Call_AJAX("CDMSelect", _obj);

            var _actionArray = [];
            var tempArrayComments = [];
            if (_tempList[0]) {

                _actionArray = $.parseJSON(_tempList[0].data);

                _actionArray = _actionArray.sort(function (a, b) {
                    return b["ActionID"] - a["ActionID"];
                });

                tempArrayComments = $.parseJSON(_tempList[1].data);
            }

            html += '<div class="modal-section-body">';
            html += '<div class="screen-row">';
            html += '<div class="div-col-50per">';
            html += '<h3 class="label-model-con-s1">';

            if (_actionArray.length > 0) {

                html += _actionArray[0]["Comment"];
            } else {

                html += "No Recent Comment";
            }

            //            if (_objcurrentIdenity["Comments"] && _objcurrentIdenity["Comments"] != "") {

            //                html += _objcurrentIdenity["Comments"];
            //            } else {

            //                html += "No Recent Comment";
            //            }


            html += '</h3>';
            html += '<h3 class="label-model-con-s2">';

            if (_objcurrentIdenity.NextActionOn && _objcurrentIdenity.NextActionOn != "") {
                html += DateFormatNew.format.date(_objcurrentIdenity.NextActionOn, "MMM D,yyyy");
            } else {
                html += "No Action Date";

            }
            html += '</h3>';
            html += '</div>';




            //Total Touches Section


            var totalTouches = 0;
            var demoCount = 0;
            var exconvCount = 0;
            var inConvCount = 0;
            var reachingOutCount = 0;
            var leadCount = 0;

            totalTouches = getitemCount(_actionArray, { "CampaignLeadID": _objcurrentIdenity.CampaignLeadID });
            demoCount = getitemCount(_actionArray, { "CampaignLeadID": _objcurrentIdenity.CampaignLeadID, "WorkflowStatus": 6004 });
            exconvCount = getitemCount(_actionArray, { "CampaignLeadID": _objcurrentIdenity.CampaignLeadID, "WorkflowStatus": 6003 });
            inConvCount = getitemCount(_actionArray, { "CampaignLeadID": _objcurrentIdenity.CampaignLeadID, "WorkflowStatus": 6002 });
            reachingOutCount = getitemCount(_actionArray, { "CampaignLeadID": _objcurrentIdenity.CampaignLeadID, "WorkflowStatus": 6005 });
            leadCount = getitemCount(_actionArray, { "CampaignLeadID": _objcurrentIdenity.CampaignLeadID, "WorkflowStatus": 6001 });

            html += '<div class="div-col-50per">';
            html += '<div class="m-tile-container-s1">';

            html += '<div class="m-tile-hdr-s1">';
            html += '<div class="cell-left">';
            html += ' Total Touches';
            html += '</div>';
            html += '<div class="cell-right">';

            html += totalTouches;
            html += '</div>';
            html += '</div>';

            html += '<div class="m-tile-body-s1">';




            if (demoCount != 0) {
                html += '<div class="m-tile-body-row">';
                html += '<div class="cell-left">';
                html += '  Demo';
                html += '</div>';
                html += '<div class="cell-right">';
                html += demoCount;
                html += '</div>';
                html += '</div>';
            }
            if (exconvCount != 0) {
                html += '<div class="m-tile-body-row">';
                html += '<div class="cell-left">';
                html += '  Ex. Conv';
                html += '</div>';
                html += '<div class="cell-right">';
                html += exconvCount;
                html += '</div>';
                html += '</div>';
            }
            if (inConvCount != 0) {
                html += '<div class="m-tile-body-row">';
                html += '<div class="cell-left">';
                html += ' In. Conv';
                html += '</div>';
                html += '<div class="cell-right">';
                html += inConvCount;
                html += '</div>';
                html += '</div>';
            }
            if (reachingOutCount != 0) {
                html += '<div class="m-tile-body-row">';
                html += '<div class="cell-left">';
                html += ' Reaching Out';
                html += '</div>';
                html += '<div class="cell-right">';
                html += reachingOutCount;
                html += '</div>';
                html += '</div>';
            }
            if (leadCount != 0) {
                html += '<div class="m-tile-body-row">';
                html += '<div class="cell-left">';
                html += ' Leads';
                html += '</div>';
                html += '<div class="cell-right">';
                html += leadCount;
                html += '</div>';
                html += '</div>';
            }



            html += '</div>';

            html += '</div>';
            html += '</div>';

            //End Total Touches Section

            html += '</div>';

            if (tempArrayComments.length > 0) {

                html += '<div class="m-body-group-inner-container mar-top-10">';
                html += '<div class="m-body-group-hdr-container">';
                html += '<div class="cell-left">';
                html += ' Notes';
                html += '</div>';

                html += '<div class="cell-right">';
                if (tempArrayComments.length > 0) {
                    html += DateFormatNew.format.date(tempArrayComments[0].CreatedOn, "MMM D,yyyy HH:mm");
                }
                html += '</div>';
                html += '</div>';
                html += '<div class="m-body-group-cont-container ht-s5">';
                html += '<p class="m-content-para-s1">';
                if (tempArrayComments.length > 0) {

                    html += tempArrayComments[0].Comments;
                }

                html += '</p>';

                html += '</div>';
                html += '</div>';
            }


            var commentsCount = 0;

            $.map(_actionArray, function (element, index) {

                if (element["Comment"] && element["Comment"] != "") {
                    commentsCount = commentsCount + 1;
                }
            });


            if (totalTouches == 1 && commentsCount == 0) {
                html += '<div class="m-body-group-inner-container" style="margin-bottom: 0px;">';
                html += '<div class="m-body-group-cont-container-s1">';
                html += 'No Activity Found';
                html += '</div>';
                html += '</div>';
            } else {

                html += '<div class="m-body-group-inner-container" style="margin-bottom: 0px;">';
                html += '<div class="m-body-group-hdr-container">';
                html += '<div class="cell-left">';
                html += '  Comments';
                html += '</div>';
                html += '<div class="cell-right">';
                html += '</div>';
                html += '</div>';


                if (commentsCount == 0) {
                    html += '<div class="m-body-group-cont-container-s1">';
                    html += 'No Comment Found';
                    html += '</div>';

                } else {
                    html += '<div class="m-body-group-cont-container-s1">';

                    var groupByWorkflowStatus = IF2Controls.GetDistinctArray(_actionArray, "WorkflowStatus");
                    $.each(groupByWorkflowStatus, function (indx, itm) {

                        var statuscount = 0;

                        $.map(_actionArray, function (element, index) {

                          
                                if (element["Comment"] && element["Comment"] != "" && element["WorkflowStatus"] == itm["WorkflowStatus"]) {
                                    statuscount = statuscount + 1;
                                }
                            
                        });

                        if (statuscount > 0) {
                            html += '<div class="screen-row">';
                            html += '<div class="dataplan-hdr-cell-m">';
                            html += '<h5 class="label-dataplan-title-m">';
                            html += itm["WorkflowStatusText"];
                            html += '</h5>';
                            html += '<div class="label-dataplan-count">';
                            html += '<span>';
                            html += statuscount;
                            html += '</span>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';

                            html += '<div class="screen-row">';
                            $.each(_actionArray, function (subindx, subitm) {
                               
                                    if (subitm["WorkflowStatus"] == itm["WorkflowStatus"] && subitm["Comment"] != "") {

                                        html += '<div class="dataplan-summary-row">';
                                        html += '<div class="dataplan-summary-left">';
                                        html += '<div class="img-cell">';
                                        html += '<img src="img/a3.jpg">';
                                        html += '</div>';

                                        html += '<div class="summary-title-cell">';
                                        html += '<div class="cell-row">';
                                        html += '<label class="label-datasummary-title">';
                                        html += subitm.CreatedByName
                                        html += '</label>';
                                        html += '<label class="label-data-ans-title" style="margin-left:5px;">';
                                        html += DateFormatNew.format.date(subitm.UpdatedOn, "MMM D,yyyy HH:mm");
                                        html += '</label>';
                                        html += '</div>';
                                        html += '<div class="cell-row">';
                                        html += '<label class="label-summary-data">';
                                        html += subitm["Comment"];
                                        html += '</label>';
                                        html += '</div>';
                                        html += '</div>';

                                        html += '</div>';
                                        html += '<div class="dataplan-summary-right">';
                                        html += '<div class="dataplan-action-control">';

                                        html += '</div>';
                                        html += '</div>';

                                        html += '</div>';

                                    }
                                
                            });
                            html += '</div>';
                        }
                    });

                    html += '</div>';
                }

                html += '</div>';
                html += '</div>';

            }

            html += '<div class="modal-footer-cell">';
            html += '<a class="btn-wave-m-s1">';
            html += '<i class="fa fa-phone">';
            html += '</i>';
            html += 'CALL';
            html += '</a>';
            html += '</div>';
            html += '</div>';
        } else {

            html += '<div>No Data Found</div>';
        }

        return html;
    }

}