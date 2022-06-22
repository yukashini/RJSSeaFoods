
/// <reference path="../../LibraryJS/jquery-1.11.0.min.js" />
/// <reference path="../Library/JsonManipulation.js" />

var IF2Controls = function () {
    return {

        Textbox: function (_objtextbox) {
            var _textboxHtml = "";
            if (_objtextbox !== undefined) {
                var _strAttr = IF2Controls.GenerateDataAttribute(_objtextbox.Textbox.attribute);
                _textboxHtml = ' <div class="input-icon"><input class="' + _objtextbox.Textbox.class + '"  type="text" id="' + _objtextbox.Textbox.ID + '" ' + _strAttr + '  >' + '</div>';

            } else {
                _textboxHtml = '<input type="text" value=""/>';
            }
            return _textboxHtml;
        },

        SelectBox: function (_objselectbox) {

            var _strAttr = IF2Controls.GenerateDataAttribute(_objselectbox.Singleselect.attribute);
            var _selectboxHtml = "";
            if (_objselectbox !== undefined) {
                if (_objselectbox.Singleselect.value) {
                    _selectboxHtml = IF2Controls.Generateselectboxdefault(_objselectbox);
                }
                else {
                    _selectboxHtml = '<select id="' + _objselectbox.Singleselect.ID + '"  class="' + _objselectbox.Singleselect.class + '"  data-placeholder="Select..." ' + _strAttr + '/>';
                }
            }
            else {
                _selectboxHtml = '<select></select>';
            }
            return _selectboxHtml;
        },

        Multiselectbox: function (_objif2selectbox, container, controlIndex) {

            var _T22_htmlselectbox = '';
            var _strAttr = GenerateDataAttribute(_objif2selectbox.DataAttr);
            var _strOptions = bindmasterdropdownoptions(_objif2selectbox.Data, _objif2selectbox.Datavaluefield, _objif2selectbox.Datatextfield);
            var _checkmanditory = checkManditory(_objif2selectbox.DataAttr);

            _T22_htmlselectbox += '<div class="filter-cell">';
            _T22_htmlselectbox += '<label class="label-filter">' + _objif2selectbox.lable;
            if (_checkmanditory) {
                _T22_htmlselectbox += '<span class="label-control-mandatory">*</span>';
            }
            _T22_htmlselectbox += '</label>';
            _T22_htmlselectbox += ' <select id="' + _objif2selectbox.ID + '"  class="' + _objif2selectbox.CSSClass + '" data-style="' + _objif2selectbox.CustomStyle + '" multiple="multiple" ' + _strAttr + '>';
            _T22_htmlselectbox += _strOptions + ' </select>';
            _T22_htmlselectbox += '</div>';

            $("#" + container + "_" + controlIndex).append(_T22_htmlselectbox);
        },

        Textarea: function (_objktextarea) {

            var _textareaHtml = "";
            if (_objtextarea !== undefined) {
                var _strAttr = GenerateDataAttribute(_objtextarea.Textarea.attribute);
                _textareaHtml = ' <div class="input-fieldset-default">' +
                   ' <div><textarea id="' + _objtextarea.Textarea.ID + '" cols= "' + _objtextarea.Textarea.cols + '" ' + ' rows= "' + _objtextarea.Textarea.rows +
                   '" class= "' + _objtextarea.Textarea.class + '"' + _strAttr +
                   '/>' + '</div></div>';

            }
            else {
                _textareaHtml = '<textarea rows="" cols=""></textarea>';
            }
            return _textareaHtml;

        },

        Checkbox: function (_objcheckbox) {


            var checkboxHtml = "";
            if (_objcheckbox !== undefined) {
                var _strAttr = GenerateDataAttribute(_objcheckbox.Checkbox.attribute);
                checkboxHtml = '<input type="checkbox" Enable="true" ' + _strAttr +
                       ' id= "' + _objcheckbox.Checkbox.ID + '"' +
                       ' class= "' + _objcheckbox.Checkbox.class + '"' +
                       ' value="' + _objcheckbox.Checkbox.value + '" ';
                if (_objcheckbox.Checkbox.isChecked)
                    checkboxHtml = checkboxHtml + " checked='" + _objcheckbox.Checkbox.checked + "' />";

            }
            else {
                checkboxHtml = '<input type="checkbox" value=""/>';
            }
            return checkboxHtml;
        },

        RadioButton: function (_objradiobutton) {

            var RadioHtml = "";
            if (_objradiobutton != undefined) {
                var _strAttr = GenerateDataAttribute(_objradiobutton.Radio.attribute);
                RadioHtml = '<input type="radio" ' +
                       ' id= "' + _objradiobutton.Radio.ID + '"' +
                        ' class= "' + _objradiobutton.Radio.class + '"' +
                       ' value="' + _objradiobutton.Radio.value + '" ' + _strAttr;
                if (_objradiobutton.Radio.isChecked)
                    RadioHtml = RadioHtml + " checked='" + _objradiobutton.Radio.checked + "' />";


            }
            else {

                RadioHtml = '<input type="radio"  value=""/>';
            }
            return RadioHtml;
        },

        Button: function (_objbutton) {

            var _objbuttonHtml = "";

            if (_objbutton !== undefined) {
                var _strAttr = GenerateDataAttribute(_objbutton.Button.attribute);
                _objbuttonHtml = '<a' +
                       ' id= "' + _objbutton.Button.ID + '"' + _strAttr +
                       ' class="' + _objbutton.Button.class + '"' + '>' +
                           _objbutton.Button.value + '</a>';
            }
            else {
                _objbuttonHtml = '<a class=""></a>';
            }

            return _objbuttonHtml;
        },

        Imagebutton: function (_objimagebutton) {

            var _objimageHtml = "";
            if (_objimagebutton !== undefined) {

                _objimageHtml = '<input type="image" src="" alt=""/>';
            }
            else {
                _objimageHtml = '<input type="image" src="" alt=""/>';
            }
        },

        Lable: function (_objlable) {
            var _objlableHtml = "";

            if (_objlable !== undefined) {
                var _strAttr = GenerateDataAttribute(_objlable.Lable.attribute);

                _objlableHtml = '<div><lable for="" id= "' + _objlable.Lable.ID + '"   ' + _strAttr + '  class="' + _objlable.Lable.class + '"' + '>' + _objlable.Lable.value + '</lable></div>';
            }
            else {
                _objlableHtml = '<lable for=""></lable>';
            }
            return _objlableHtml;
        },
        Table: function (_objtable) {
            var _tableHtml = "";
            if (_objtable.id) {

                _tableHtml += '<table class="' + _objtable.css + '" id="' + _objtable.id + '">';
            } else {
                _tableHtml += '<table class="' + _objtable.css + '" >';
            }
            var Default = function (data) {
                var DefaultHeader = function (_objTableData) {
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'
                    var objectKeys = $.map(_objTableData[0], function (value, key) {
                        return key;
                    });
                    $.each(objectKeys, function (index, item) {
                        _headerHTML += '<th>' + item + ' </th>';
                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';
                    return _headerHTML;
                }
                var DefaultBody = function (_objTableData) {
                    var _TempData = _objTableData;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';
                    var objectKeys = $.map(_objTableData[0], function (value, key) {
                        return key;
                    });
                    $.each(_TempData, function (dataindex, dataitem) {
                        _bodyHTML += '<tr>';
                        $.each(objectKeys, function (colindex, colitem) {
                            _bodyHTML += '<td>' + dataitem[colitem] + ' </td>';
                        });
                        _bodyHTML += '</tr>';
                    });
                    _bodyHTML += '</tbody>';
                    return _bodyHTML;
                }
                var Defaulttablehtml = "";
                Defaulttablehtml += DefaultHeader(data);
                Defaulttablehtml += DefaultBody(data);
                return Defaulttablehtml;
            }
            var Grouping = function (_objdata) {

                var GroupingHeader = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'
                    _Tempconfig.Columns = _Tempconfig.Columns.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    $.each(_Tempconfig.Columns, function (index, item) {
                        _headerHTML += '<th style="' + item.Style + '" >' + item.HeaderText + ' </th>';
                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';
                    return _headerHTML;

                }
                var GroupingBody = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var Groupby = _objdata.config.Groupby;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';

                    var _groupbyArray = IF2Controls.GetDistinctArray(_TempData, Groupby.Field);
                    $.each(_groupbyArray, function (groupbyindex, groupbyitem) {

                        if (groupbyitem[Groupby.Text] != null) {

                            _bodyHTML += '<tr class="grid-parent-cell">';
                            _bodyHTML += '<td colspan="8">' + groupbyitem[Groupby.Text] + '</td>';
                            _bodyHTML += '</tr>';
                            $.each(_TempData, function (dataindex, dataitem) {
                                var trclass = "";
                                var childicon = "";
                                if (groupbyitem[Groupby.Field] == dataitem[Groupby.Field]) {

                                    //                                    if (dataitem["Status"] == "In Progress") {
                                    //                                        trclass = "inprogress";
                                    //                                        childicon = '<i class="fa fa-spinner"></i>';
                                    //                                    } else if (dataitem["Status"] == "Completed") {
                                    //                                        trclass = "completed";
                                    //                                        childicon = '<i class="fa fa-check"></i>';
                                    //                                    }


                                    _bodyHTML += '<tr class="' + trclass + '">';
                                    $.each(_Tempconfig.Columns, function (colindex, colitem) {

                                        if (colitem.Control == "Lable") {
                                            if (colitem.Datafield == "Status") {
                                                if (dataitem[colitem.Datafield] == "Hold") {
                                                    _bodyHTML += '<td class=' + colitem.tdclass + '-hold' + '>' + dataitem[colitem.Datafield] + ' </td>';
                                                }
                                                else {

                                                    _bodyHTML += '<td class=' + colitem.tdclass + '-active' + '>' + dataitem[colitem.Datafield] + ' </td>';
                                                }
                                            } else {
                                                if (colitem.Isvisible) {
                                                    if (colindex == 0) {
                                                        _bodyHTML += '<td class="' + colitem.tdclass + '">' + childicon + ' ' + dataitem[colitem.Datafield] + ' </td>';
                                                    } else {
                                                        _bodyHTML += '<td class="' + colitem.tdclass + '">' + dataitem[colitem.Datafield] + ' </td>';
                                                    }
                                                }
                                                else {
                                                    if (colindex == 0) {
                                                        _bodyHTML += '<td class="' + colitem.tdclass + '" style="display:none;">' + childicon + ' ' + dataitem[colitem.Datafield] + ' </td>';
                                                    } else {
                                                        _bodyHTML += '<td class="' + colitem.tdclass + '" style="display:none;">' + dataitem[colitem.Datafield] + ' </td>';
                                                    }
                                                }

                                            }


                                        }


                                        if (colitem.Control == "Progress") {
                                            if (colitem.Type == "KPI") {
                                                var split = colitem.Datafield.split('$');
                                                _bodyHTML += '<td>';

                                                _bodyHTML += dataitem[split[0]] + "/" + dataitem[split[1]];

                                                _bodyHTML += '</td>';
                                            }
                                        }
                                        if (colitem.Control == "Single") {

                                            _bodyHTML += '<td class="grid-cell-action-dropdown">';
                                            _bodyHTML += '<center>';
                                            _bodyHTML += '<a class="t22-flt-view t22-h-view" href="#">';
                                            _bodyHTML += '<ul class="nav navbar-nav ">';
                                            _bodyHTML += '<li class="dropdown dropdown-extended dropdown-notification">';
                                            _bodyHTML += '<a href="#" class="dropdown-toggle t22-prj-actions-icon" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                                            _bodyHTML += '<i class="fa fa-cog t22-pd-i-hlp"></i>';
                                            _bodyHTML += '</a>';
                                            _bodyHTML += '<ul class="dropdown-menu">';
                                            _bodyHTML += '<li>';
                                            _bodyHTML += '<ul class="dropdown-menu-list scroller" style="' + colitem.ulStyle + '">';
                                            $.each(colitem.Datafield, function (actionindex, actionitem) {
                                                _bodyHTML += '<li><a href="#" data-property="Projectnavigation" data-actionid=' + actionitem.ActionID + ' data-identity=' + dataitem[actionitem.Identity] + ' data-identitytext="' + dataitem[actionitem.IdentityText] + '" >' + actionitem.LinkText + '</a></li>';
                                            });
                                            _bodyHTML += '</ul>';
                                            _bodyHTML += '</li>';
                                            _bodyHTML += '</ul>';
                                            _bodyHTML += '</li>';
                                            _bodyHTML += '</ul>';
                                            _bodyHTML += '</a>';
                                            _bodyHTML += '</center>';
                                            _bodyHTML += '</td>';

                                        }
                                    });
                                    _bodyHTML += '</tr>';
                                }
                            });
                        }
                    });

                    _bodyHTML += '</tbody>';

                    return _bodyHTML;

                }
                var Groupingtablehtml = "";
                Groupingtablehtml += GroupingHeader();
                Groupingtablehtml += GroupingBody();
                return Groupingtablehtml;
            }
            var Standard = function (_objdata) {
                var StandardHeader = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'
                    $.each(_Tempconfig.Columns, function (index, item) {

                        if (item.Control != "hidden") {

                            if (item.Control != "callbtn") {
                                _headerHTML += '<th class="' + item.css + '" style="' + item.Style + '" >' + item.HeaderText + '</th>';

                            } else {
                                _headerHTML += '<th class="' + item.css + '"  data-sorter="false" data-columnSelector="disable" style="' + item.Style + '" >' + item.HeaderText + '</th>';

                            }
                        } else {

                            _headerHTML += '<th class="' + item.css + '" style="display: none;" ></th>';
                        }


                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';

                    return _headerHTML;

                }
                var StandardBody = function () {

                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';
                    var _stus = $("ul.campaignnameTab li.active").children().attr('title')

                    $.each(_TempData, function (dataindex, dataitem) {
                        var trclass = "";
                        var childicon = "";
                        _bodyHTML += '<tr class="' + trclass + '">';
                        $.each(_Tempconfig.Columns, function (colindex, colitem) {

                            if (dataitem[colitem.Datafield] === null || dataitem[colitem.Datafield] === "null") {
                                dataitem[colitem.Datafield] = "";
                            }

                            if (colitem.Control == "textbox") {
                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><input type="text" class="grid-textbox" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '" value="' + dataitem[colitem.Datafield] + '" /> </td>';
                            }
                            else if (colitem.Control == "sselect") {
                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><select class="form-control select2me" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '">' + bindoptions(colitem.controlmasterdata, dataitem[colitem.Datafield], colitem.Datavaluefield, colitem.Datatextfield) + ' </select></td>';
                            }
                            else if (colitem.Control == "Lable") {


                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '>' + dataitem[colitem.Datafield] + '</td>';


                            }
                            else if (colitem.Control == "hidden") {

                                _bodyHTML = _bodyHTML + '<td style="display: none;"><span class="textbox--edit-default w-100-per" value="' + dataitem[colitem.Datafield] + '">' + dataitem[colitem.Datafield] + '</span></td>';
                            } else if (colitem.Control == "action") {

                                _bodyHTML = _bodyHTML + '<td><center><a href="#" class="link-sm-val">' + dataitem[colitem.Datafield] + '</a></center></td>';

                            } else if (colitem.Control == "checkbox") {
                                _bodyHTML = _bodyHTML + '<td><center><input type="checkbox" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '" value="' + dataitem[colitem.Datafield] + '" ' + bindcheckd(item[colitem.Datafield]) + ' /></center></td>';
                            }

                            else if (colitem.Control == "Single") {

                                _bodyHTML += '<td class="grid-cell-action-dropdown">';
                                _bodyHTML += '<center>';
                                _bodyHTML += '<a class="t22-flt-view t22-h-view" href="#">';
                                _bodyHTML += '<ul class="nav navbar-nav ">';
                                _bodyHTML += '<li class="dropdown dropdown-extended dropdown-notification">';
                                _bodyHTML += '<a href="#" class="dropdown-toggle t22-prj-actions-icon" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                                _bodyHTML += '<i class="fa fa-cog t22-pd-i-hlp"></i>';
                                _bodyHTML += '</a>';
                                _bodyHTML += '<ul class="dropdown-menu">';
                                _bodyHTML += '<li>';
                                _bodyHTML += '<ul class="dropdown-menu-list scroller" style="' + colitem.ulStyle + '">';
                                $.each(colitem.Datafield, function (actionindex, actionitem) {
                                    _bodyHTML += '<li><a href="#" data-property="Projectnavigation" data-actionid=' + actionitem.ActionID + ' data-identity=' + dataitem[actionitem.Identity] + ' data-identitytext="' + dataitem[actionitem.IdentityText] + '" >' + actionitem.LinkText + '</a></li>';
                                });
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</li>';
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</li>';
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</a>';
                                _bodyHTML += '</center>';
                                _bodyHTML += '</td>';

                            }

                            else if (colitem.Control == "callbtn") {

                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><center><div class="icon-action-img"><a href="#" class="callbtnclick" data-identity=' + dataitem["IdentityID"] + '  data-CampaignID=' + dataitem["CampaignID"] + ' data-CampaignLeadID=' + dataitem["CampaignLeadID"] + '  data-LeadID=' + dataitem["LeadID"] + '><img src="img/PHONE-ICON.png"></a></div></center></td>';
                            }

                            else if (colitem.Control == "callbtnwithdetail") {

                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><center><div class="icon-action-img"><a href="#" class="callbtnclick" data-identity=' + dataitem["IdentityID"] + '  data-CampaignID=' + dataitem["CampaignID"] + ' data-CampaignLeadID=' + dataitem["CampaignLeadID"] + '  data-LeadID=' + dataitem["LeadID"] + '><img src="img/PHONE-ICON.png"></a><a href="#" class="quickview" data-identity=' + dataitem["IdentityID"] + '  data-CampaignID=' + dataitem["CampaignID"] + ' data-CampaignLeadID=' + dataitem["CampaignLeadID"] + '  data-LeadID=' + dataitem["LeadID"] + ' style="margin-left:2px;"><img src="img/infonotice.png"></a></div></center></td>';
                            }


                            else if (colitem.Control == "phonenumber") {

                                var currentcontactno = dataitem[colitem.Datafield];
                                var _tmpPrimaryContactNo = '';
                                if (currentcontactno != "" && currentcontactno) {



                                    var outputString = currentcontactno.trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');


                                    if (outputString.length == 10) {
                                        _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                                    }
                                } else {

                                    currentcontactno = dataitem["CompanyContactNo"];

                                    var outputString = currentcontactno.trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');


                                    if (outputString.length == 10) {
                                        _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                                    }

                                }

                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><div class="list-cell-phonenumber" data-callingnumber="' + outputString + '"><a href="#" class="link-sm-val" >' + _tmpPrimaryContactNo + '</a></div></td>';
                            }

                            else if (colitem.Control == "duration") {

                                if (dataitem[colitem.Datafield] != 0 && dataitem[colitem.Datafield] != 555) {
                                    _bodyHTML = _bodyHTML + "<td class=" + colitem.tdclass + ">" + dataitem[colitem.Datafield] + " Day(s) ago</td>";
                                } else {
                                    _bodyHTML = _bodyHTML + "<td class=" + colitem.tdclass + "></td>";
                                }


                            }

                            else if (colitem.Control == "Labledate") {

                                if (dataitem["Datefromnow"] == "555") {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="actiondate"  data-CampaignID=' + dataitem["CampaignID"] + ' ></td>';
                                } else {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="actiondate"  data-CampaignID=' + dataitem["CampaignID"] + ' >' + dataitem[colitem.Datafield] + '</td>';
                                }

                            }
                            else if (colitem.Control == "Labledate1") {

                                if (dataitem["Datefromnowfollowup"] == "555") {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="followupdate"  data-CampaignID=' + dataitem["CampaignID"] + ' ></td>';
                                } else {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="followupdate"  data-CampaignID=' + dataitem["CampaignID"] + ' >' + dataitem[colitem.Datafield] + '</td>';
                                }

                            }
                            else if (colitem.Control == "Labledate2") {


                                _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + '">' + dataitem[colitem.Datafield] + '</td>';


                            }

                            else if (colitem.Control == "Dropdown") {




                                if (colitem.Datafield == "WorkflowStatusText") {
                                    if (colitem.Isvisible) {



                                        _bodyHTML += '<td class="' + colitem.tdclass + ' workflowstatus" data-identity=' + dataitem["IdentityID"] + '>';

                                        if (_campaigntype == "rejected") {
                                            _bodyHTML += dataitem["WorkflowStatusText"];
                                        }
                                        else {

                                            var CampaignLeadStatus = ParseStringToObject(_private_JSON.masterdata[0][0].data[0]);
                                            _bodyHTML += '<select class="form-control " id="workflowstatus" data-identity=' + dataitem["IdentityID"] + ' data-CampaignID=' + dataitem["CampaignID"] + ' data-property="WorkflowStatus" data-CampaignLeadID=' + dataitem["CampaignLeadID"] + ' data-leadid=' + dataitem["LeadID"] + '>';
                                            if (CampaignLeadStatus.length > 0) {

                                                $.each(CampaignLeadStatus, function (index, item) {
                                                    if (item.KeyListID == dataitem["WorkflowStatus"]) {


                                                        _bodyHTML += '<option data-identity=' + item.KeyListID + ' selected>' + item.Value1 + '</option>';
                                                        //$("option:selected").val(dataitem["WorkflowStatus"])
                                                    }
                                                    else {
                                                        _bodyHTML += '<option data-identity=' + item.KeyListID + '>' + item.Value1 + '</option>';
                                                    }


                                                });
                                            }
                                            _bodyHTML += '</select> </td>';

                                            $("#workflowstatus").find('option').each(function (i, opt) {
                                                if (opt.value === dataitem["WorkflowStatus"])
                                                    $("#workflowstatus").val(dataitem["WorkflowStatus"])
                                                // $(opt).attr('selected', 'selected');
                                            });
                                        }

                                    }
                                }


                            }
                        });


                    });

                    _bodyHTML += '</tbody>';

                    return _bodyHTML;




                }
                var Standardtablehtml = "";
                Standardtablehtml += StandardHeader();
                Standardtablehtml += StandardBody();
                return Standardtablehtml;

            }

            if (_objtable !== undefined) {

                if (_objtable.type == "Grouping") {
                    _tableHtml += Grouping(_objtable);
                } else if (_objtable.type == "Standard") {
                    _tableHtml += Standard(_objtable);
                } else if (_objtable.type == "Default") {
                    _tableHtml += Default(_objtable.data);
                }
            }
            else {
                _tableHtml += '<tr>Cant find data source</tr>';
            }
            _tableHtml += '</table>';
            return _tableHtml;
        },

        Tablev1: function (_objtable) {
            var _tableHtml = "";
            _tableHtml += '<table class="' + _objtable.css + '" id="tblname">';

            var Default = function (data) {

                var DefaultHeader = function (_objTableData) {
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'
                    var objectKeys = $.map(_objTableData[0], function (value, key) {
                        return key;
                    });
                    $.each(objectKeys, function (index, item) {
                        _headerHTML += '<th>' + item + ' </th>';
                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';

                    return _headerHTML;
                }
                var DefaultBody = function (_objTableData) {
                    var _TempData = _objTableData;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';
                    var objectKeys = $.map(_objTableData[0], function (value, key) {
                        return key;
                    });
                    $.each(_TempData, function (dataindex, dataitem) {
                        _bodyHTML += '<tr>';
                        $.each(objectKeys, function (colindex, colitem) {
                            _bodyHTML += '<td>' + dataitem[colitem] + ' </td>';
                        });
                        _bodyHTML += '</tr>';
                    });
                    _bodyHTML += '</tbody>';
                    return _bodyHTML;
                }
                var Defaulttablehtml = "";
                Defaulttablehtml += DefaultHeader(data);
                Defaulttablehtml += DefaultBody(data);
                return Defaulttablehtml;
            }
            var Grouping = function (_objdata) {

                var GroupingHeader = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'
                    _Tempconfig.Columns = _Tempconfig.Columns.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    $.each(_Tempconfig.Columns, function (index, item) {
                        _headerHTML += '<th style="' + item.Style + '" >' + item.HeaderText + ' </th>';
                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';
                    return _headerHTML;

                }
                var GroupingBody = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var Groupby = _objdata.config.Groupby;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';

                    var _groupbyArray = IF2Controls.GetDistinctArray(_TempData, Groupby.Field);
                    $.each(_groupbyArray, function (groupbyindex, groupbyitem) {

                        if (groupbyitem[Groupby.Text] != null) {

                            _bodyHTML += '<tr class="grid-parent-cell">';


                            _bodyHTML += '<td colspan="5"><a style="color:black !important;" data-identity="' + groupbyitem.GroupID + '"  class="addclick">' + groupbyitem[Groupby.Text] + '</a></td>';
                            _bodyHTML += '</tr>';

                            $.each(_TempData, function (dataindex, dataitem) {
                                var trclass = "";
                                var childicon = "";
                                if (groupbyitem[Groupby.Field] == dataitem[Groupby.Field]) {

                                    //                                    if (dataitem["Status"] == "In Progress") {
                                    //                                        trclass = "inprogress";
                                    //                                        childicon = '<i class="fa fa-spinner"></i>';
                                    //                                    } else if (dataitem["Status"] == "Completed") {
                                    //                                        trclass = "completed";
                                    //                                        childicon = '<i class="fa fa-check"></i>';
                                    //                                    }


                                    _bodyHTML += '<tr class="' + trclass + '">';
                                    if (groupbyitem.Counting) {
                                        $.each(_Tempconfig.Columns, function (colindex, colitem) {

                                            if (colitem.Control == "Lable") {
                                                if (colitem.Datafield == "Status") {
                                                    if (dataitem[colitem.Datafield] == "Hold") {
                                                        _bodyHTML += '<td class=' + colitem.tdclass + '-hold' + '>' + dataitem[colitem.Datafield] + ' </td>';
                                                    }
                                                    else {

                                                        _bodyHTML += '<td class=' + colitem.tdclass + '-active' + '>' + dataitem[colitem.Datafield] + ' </td>';
                                                    }

                                                } else {
                                                    if (colitem.Isvisible) {

                                                        if (colindex == 0) {
                                                            if (colitem.data) {
                                                                if (colitem.Type == "date") {

                                                                    _bodyHTML += '<td class="' + colitem.tdclass + '">' + childicon + ' ' + getDate(dataitem[colitem.Datafield]) + ' </td>';
                                                                }
                                                                else {
                                                                    _bodyHTML += '<td class="' + colitem.tdclass + '">' + childicon + ' ' + dataitem[colitem.Datafield] + colitem.data + ' </td>';
                                                                }
                                                            }
                                                            else {

                                                                if (colitem.Type == "date") {

                                                                    _bodyHTML += '<td class="' + colitem.tdclass + '">' + childicon + ' ' + getDate(dataitem[colitem.Datafield]) + ' </td>';
                                                                }
                                                                else {
                                                                    _bodyHTML += '<td class="' + colitem.tdclass + '">' + childicon + ' ' + dataitem[colitem.Datafield] + colitem.data + ' </td>';
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            _bodyHTML += '<td class="' + colitem.tdclass + '">' + dataitem[colitem.Datafield] + ' ' + colitem.data + ' </td>';
                                                        }
                                                    }
                                                    else {
                                                        if (colindex == 0) {
                                                            _bodyHTML += '<td class="' + colitem.tdclass + '" style="display:none;">' + childicon + ' ' + dataitem[colitem.Datafield] + ' </td>';
                                                        } else {
                                                            _bodyHTML += '<td class="' + colitem.tdclass + '" style="display:none;">' + dataitem[colitem.Datafield] + ' </td>';
                                                        }
                                                    }

                                                }


                                            }
                                            if (colitem.Control == "Progress") {
                                                if (colitem.Type == "KPI") {
                                                    var split = colitem.Datafield.split('$');
                                                    _bodyHTML += '<td>';

                                                    _bodyHTML += dataitem[split[0]] + "/" + dataitem[split[1]];

                                                    _bodyHTML += '</td>';
                                                }
                                            }
                                            if (colitem.Control == "Single") {

                                                _bodyHTML += '<td class="grid-cell-action-dropdown">';
                                                _bodyHTML += '<center>';
                                                _bodyHTML += '<a class="t22-flt-view t22-h-view" href="#">';
                                                _bodyHTML += '<ul class="nav navbar-nav ">';
                                                _bodyHTML += '<li class="dropdown dropdown-extended dropdown-notification">';
                                                _bodyHTML += '<a href="#" class="dropdown-toggle t22-prj-actions-icon" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                                                _bodyHTML += '<i class="fa fa-cog t22-pd-i-hlp"></i>';
                                                _bodyHTML += '</a>';
                                                _bodyHTML += '<ul class="dropdown-menu">';
                                                _bodyHTML += '<li>';
                                                _bodyHTML += '<ul class="dropdown-menu-list scroller" style="' + colitem.ulStyle + '">';
                                                $.each(colitem.Datafield, function (actionindex, actionitem) {
                                                    _bodyHTML += '<li><a href="#" data-property="Projectnavigation" data-actionid=' + actionitem.ActionID + ' data-identity=' + dataitem[actionitem.Identity] + ' data-identitytext="' + dataitem[actionitem.IdentityText] + '" >' + actionitem.LinkText + '</a></li>';
                                                });
                                                _bodyHTML += '</ul>';
                                                _bodyHTML += '</li>';
                                                _bodyHTML += '</ul>';
                                                _bodyHTML += '</li>';
                                                _bodyHTML += '</ul>';
                                                _bodyHTML += '</a>';
                                                _bodyHTML += '</center>';
                                                _bodyHTML += '</td>';

                                            }
                                        });
                                    }
                                    else {
                                        _bodyHTML += '<td colspan="5" style="text-align:center;">No Lead Found</td>';
                                    }
                                    _bodyHTML += '</tr>';
                                }
                            });



                        }
                    });

                    _bodyHTML += '</tbody>';

                    return _bodyHTML;

                }
                var Groupingtablehtml = "";
                Groupingtablehtml += GroupingHeader();
                Groupingtablehtml += GroupingBody();
                return Groupingtablehtml;
            }
            var Standard = function (_objdata) {
                var StandardHeader = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'

                    $.each(_Tempconfig.Columns, function (index, item) {

                        if (index == 0) {
                            _headerHTML += '<th class="' + item.css + '" style="' + item.Style + '" ><span><input type="checkbox" id="checkall"></span><span>' + item.HeaderText + ' ' + '(' + _TempData.length + ')</span></th>';
                        }
                        else {
                            _headerHTML += '<th class="' + item.css + '" style="' + item.Style + '" >' + item.HeaderText + ' </th>';
                        }
                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';

                    return _headerHTML;

                }
                var StandardBody = function () {

                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';

                    $.each(_TempData, function (dataindex, dataitem) {
                        var trclass = "";
                        var childicon = "";
                        _bodyHTML += '<tr class="' + trclass + '">';

                        $.each(_Tempconfig.Columns, function (colindex, colitem) {

                            if (dataitem[colitem.Datafield] === null || dataitem[colitem.Datafield] === "null") {
                                dataitem[colitem.Datafield] = "";
                            }
                            if (colitem.Control == "textbox") {
                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><input type="text" class="grid-textbox" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '" value="' + dataitem[colitem.Datafield] + '" /> </td>';
                            }
                            else if (colitem.Control == "sselect") {
                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><select class="form-control select2me" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '">' + bindoptions(colitem.controlmasterdata, dataitem[colitem.Datafield], colitem.Datavaluefield, colitem.Datatextfield) + ' </select></td>';
                            } else if (colitem.Control == "Lable") {

                                if (colitem.SpCount) {

                                    _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><span >' + dataitem[colitem.Datafield] + '</span><span class="t22-del-ct">' + dataitem[colitem.SpCount] + '</span> </td>';

                                } else {

                                    if (colitem.Order == '0') {
                                        _bodyHTML = _bodyHTML + '<td><span><input type="checkbox" class="chkrow" name="RowCheckBox"></span><span>' + dataitem[colitem.Datafield] + '</span></td>';
                                    }
                                    else {

                                        _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><span class="" value="' + dataitem[colitem.Datafield] + '">' + dataitem[colitem.Datafield] + '</span> </td>';
                                    }
                                }

                            } else if (colitem.Control == "hidden") {

                                _bodyHTML = _bodyHTML + '<td style="display: block;"><span class="textbox--edit-default w-100-per" value="' + dataitem[colitem.Datafield] + '">' + dataitem[colitem.Datafield] + '</span></td>';
                            } else if (colitem.Control == "action") {
                                _bodyHTML = _bodyHTML + '<td style="display: block;"><a href="#"  title="Add">Edit</a><td>';
                            } else if (colitem.Control == "checkbox") {
                                _bodyHTML = _bodyHTML + '<td><center><input type="checkbox" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '" value="' + dataitem[colitem.Datafield] + '" ' + bindcheckd(item[colitem.Datafield]) + ' /></center></td>';
                            }

                            else if (colitem.Control == "Single") {

                                _bodyHTML += '<td class="grid-cell-action-dropdown">';
                                _bodyHTML += '<center>';
                                _bodyHTML += '<a class="t22-flt-view t22-h-view" href="#">';
                                _bodyHTML += '<ul class="nav navbar-nav ">';
                                _bodyHTML += '<li class="dropdown dropdown-extended dropdown-notification">';
                                _bodyHTML += '<a href="#" class="dropdown-toggle t22-prj-actions-icon" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                                _bodyHTML += '<i class="fa fa-cog t22-pd-i-hlp"></i>';
                                _bodyHTML += '</a>';
                                _bodyHTML += '<ul class="dropdown-menu">';
                                _bodyHTML += '<li>';
                                _bodyHTML += '<ul class="dropdown-menu-list scroller" style="' + colitem.ulStyle + '">';
                                $.each(colitem.Datafield, function (actionindex, actionitem) {
                                    _bodyHTML += '<li><a href="#" data-property="Projectnavigation" data-actionid=' + actionitem.ActionID + ' data-identity=' + dataitem[actionitem.Identity] + ' data-identitytext="' + dataitem[actionitem.IdentityText] + '" >' + actionitem.LinkText + '</a></li>';
                                });
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</li>';
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</li>';
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</a>';
                                _bodyHTML += '</center>';
                                _bodyHTML += '</td>';

                            }
                        });


                    });

                    _bodyHTML += '</tbody>';

                    return _bodyHTML;




                }
                var Standardtablehtml = "";
                Standardtablehtml += StandardHeader();
                Standardtablehtml += StandardBody();
                return Standardtablehtml;

            }

            if (_objtable !== undefined) {

                if (_objtable.type == "Grouping") {
                    _tableHtml += Grouping(_objtable);
                } else if (_objtable.type == "Standard") {
                    _tableHtml += Standard(_objtable);
                } else if (_objtable.type == "Default") {
                    _tableHtml += Default(_objtable.data);
                }
            }
            else {
                _tableHtml += '<tr>Cant find data source</tr>';
            }
            _tableHtml += '</table>';
            return _tableHtml;
        },



        TableTodayList: function (_objtable) {
            var _tableHtml = "";
            if (_objtable.id) {

                _tableHtml += '<table class="' + _objtable.css + '" id="' + _objtable.id + '">';
            } else {
                _tableHtml += '<table class="' + _objtable.css + '" >';
            }

            var Standard = function (_objdata) {
                var StandardHeader = function () {
                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _headerHTML = "";
                    _headerHTML = '<thead>';
                    _headerHTML += '<tr>'
                    $.each(_Tempconfig.Columns, function (index, item) {

                        if (item.Control != "hidden") {

                            if (item.Control != "callbtn") {
                                _headerHTML += '<th class="' + item.css + '" style="' + item.Style + '" >' + item.HeaderText + '</th>';

                            } else {
                                _headerHTML += '<th class="' + item.css + '"  data-sorter="false" data-columnSelector="disable" style="' + item.Style + '" >' + item.HeaderText + '</th>';

                            }
                        } else {

                            _headerHTML += '<th class="' + item.css + '" style="display: none;" ></th>';
                        }


                    });
                    _headerHTML += '</tr>';
                    _headerHTML += '</thead>';

                    return _headerHTML;

                }
                var StandardBody = function () {

                    var _Tempconfig = _objdata.config;
                    var _TempData = _objdata.data;
                    var _bodyHTML = '';
                    var _bodyHTML = '<tbody>';

                    $.each(_TempData, function (dataindex, dataitem) {



                        var trclass = "";
                        var childicon = "";

                        if (dataitem.todayliststatus == "overdue") {
                            _bodyHTML += '<tr class="highlightrow" >';
                        } else {
                            _bodyHTML += '<tr class="' + trclass + '">';
                        }

                        $.each(_Tempconfig.Columns, function (colindex, colitem) {

                            if (dataitem[colitem.Datafield] === null || dataitem[colitem.Datafield] === "null") {
                                dataitem[colitem.Datafield] = "";
                            }

                            if (colitem.Control == "textbox") {
                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><input type="text" class="grid-textbox" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '" value="' + dataitem[colitem.Datafield] + '" /> </td>';
                            }
                            else if (colitem.Control == "sselect") {
                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><select class="form-control select2me" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '">' + bindoptions(colitem.controlmasterdata, dataitem[colitem.Datafield], colitem.Datavaluefield, colitem.Datatextfield) + ' </select></td>';
                            }
                            else if (colitem.Control == "Lable") {

                                if (colindex == 0) {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + '">' + dataitem[colitem.Datafield] + ' <i class="fa fa-circle icn-circle-s1" title="Overdue"></i></td>';
                                } else {

                                    _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '>' + dataitem[colitem.Datafield] + '</td>';
                                }

                            }
                            else if (colitem.Control == "anchor") {

                                if (colindex == 0) {
                                    //In ACER column name PrimaryContactNo changed as CompanyContactNo
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + '"><a href="tel:+1' + dataitem["PrimaryContactNo"] + '">' + dataitem[colitem.Datafield] + '</a> <i class="fa fa-circle icn-circle-s1" title="Overdue"></i></td>';
                                } else {

                                    _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '>' + dataitem[colitem.Datafield] + '</td>';
                                }

                            }
                            else if (colitem.Control == "hidden") {

                                _bodyHTML = _bodyHTML + '<td style="display: none;"><span class="textbox--edit-default w-100-per" value="' + dataitem[colitem.Datafield] + '">' + dataitem[colitem.Datafield] + '</span></td>';
                            } else if (colitem.Control == "action") {

                                _bodyHTML = _bodyHTML + '<td><center><a href="#" class="link-sm-val">' + dataitem[colitem.Datafield] + '</a></center></td>';

                            } else if (colitem.Control == "checkbox") {
                                _bodyHTML = _bodyHTML + '<td><center><input type="checkbox" ' + Buildproperty(colitem, index) + ' data-identity="' + dataitem["IdentityID"] + '" value="' + dataitem[colitem.Datafield] + '" ' + bindcheckd(item[colitem.Datafield]) + ' /></center></td>';
                            }

                            else if (colitem.Control == "Single") {

                                _bodyHTML += '<td class="grid-cell-action-dropdown">';
                                _bodyHTML += '<center>';
                                _bodyHTML += '<a class="t22-flt-view t22-h-view" href="#">';
                                _bodyHTML += '<ul class="nav navbar-nav ">';
                                _bodyHTML += '<li class="dropdown dropdown-extended dropdown-notification">';
                                _bodyHTML += '<a href="#" class="dropdown-toggle t22-prj-actions-icon" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                                _bodyHTML += '<i class="fa fa-cog t22-pd-i-hlp"></i>';
                                _bodyHTML += '</a>';
                                _bodyHTML += '<ul class="dropdown-menu">';
                                _bodyHTML += '<li>';
                                _bodyHTML += '<ul class="dropdown-menu-list scroller" style="' + colitem.ulStyle + '">';
                                $.each(colitem.Datafield, function (actionindex, actionitem) {
                                    _bodyHTML += '<li><a href="#" data-property="Projectnavigation" data-actionid=' + actionitem.ActionID + ' data-identity=' + dataitem[actionitem.Identity] + ' data-identitytext="' + dataitem[actionitem.IdentityText] + '" >' + actionitem.LinkText + '</a></li>';
                                });
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</li>';
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</li>';
                                _bodyHTML += '</ul>';
                                _bodyHTML += '</a>';
                                _bodyHTML += '</center>';
                                _bodyHTML += '</td>';

                            }

                            else if (colitem.Control == "callbtn") {

                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><center><div class="icon-action-img"><a href="#" class="callbtnclick" data-identity=' + dataitem["IdentityID"] + '  data-CampaignID=' + dataitem["CampaignID"] + ' data-CampaignLeadID=' + dataitem["CampaignLeadID"] + '  data-LeadID=' + dataitem["LeadID"] + '><img src="img/PHONE-ICON.png"></a></div></center></td>';
                            }

                            else if (colitem.Control == "callbtnwithdetail") {

                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><center><div class="icon-action-img"><a href="#" class="callbtnclick" data-identity=' + dataitem["IdentityID"] + '  data-CampaignID=' + dataitem["CampaignID"] + ' data-CampaignLeadID=' + dataitem["CampaignLeadID"] + '  data-LeadID=' + dataitem["LeadID"] + '><img src="img/PHONE-ICON.png"></a><a href="#" class="quickview" data-identity=' + dataitem["IdentityID"] + '  data-CampaignID=' + dataitem["CampaignID"] + ' data-CampaignLeadID=' + dataitem["CampaignLeadID"] + '  data-LeadID=' + dataitem["LeadID"] + ' style="margin-left:2px;"><img src="img/infonotice.png"></a></div></center></td>';
                            }


                            else if (colitem.Control == "phonenumber") {

                                var currentcontactno = dataitem[colitem.Datafield];
                                var _tmpPrimaryContactNo = '';
                                if (currentcontactno != "" && currentcontactno) {



                                    var outputString = currentcontactno.trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');


                                    if (outputString.length == 10) {
                                        _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                                    }
                                } else {

                                    currentcontactno = dataitem["CompanyContactNo"];

                                    var outputString = currentcontactno.trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, '');


                                    if (outputString.length == 10) {
                                        _tmpPrimaryContactNo = '(' + (outputString.substr(0, 3) + ') ' + outputString.substr(3, 3) + '-' + outputString.substr(6, 4));
                                    }

                                }

                                _bodyHTML = _bodyHTML + '<td class=' + colitem.tdclass + '><div class="list-cell-phonenumber" data-callingnumber="' + currentcontactno + '"><a href="#" class="link-sm-val" >' + _tmpPrimaryContactNo + '</a></div></td>';
                            }

                            else if (colitem.Control == "duration") {

                                if (dataitem[colitem.Datafield] != 0 && dataitem[colitem.Datafield] != 555) {
                                    _bodyHTML = _bodyHTML + "<td class=" + colitem.tdclass + ">" + dataitem[colitem.Datafield] + " Day(s) ago</td>";
                                } else {
                                    _bodyHTML = _bodyHTML + "<td class=" + colitem.tdclass + "></td>";
                                }


                            }

                            else if (colitem.Control == "Labledate") {

                                if (dataitem["Datefromnow"] == "555") {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="actiondate"  data-CampaignID=' + dataitem["CampaignID"] + ' ></td>';
                                } else {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="actiondate"  data-CampaignID=' + dataitem["CampaignID"] + ' >' + dataitem[colitem.Datafield] + '</td>';
                                }

                            }
                            else if (colitem.Control == "Labledate1") {

                                if (dataitem["Datefromnowfollowup"] == "555") {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="followupdate"  data-CampaignID=' + dataitem["CampaignID"] + ' ></td>';
                                } else {
                                    _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + ' datetimepicker6" data-identity=' + dataitem["IdentityID"] + ' data-pickertype="followupdate"  data-CampaignID=' + dataitem["CampaignID"] + ' >' + dataitem[colitem.Datafield] + '</td>';
                                }

                            }
                            else if (colitem.Control == "Labledate2") {


                                _bodyHTML = _bodyHTML + '<td class="' + colitem.tdclass + '">' + dataitem[colitem.Datafield] + '</td>';


                            }
                            else if (colitem.Control == "Dropdown") {

                                if (colitem.Datafield == "WorkflowStatusText") {
                                    if (colitem.Isvisible) {



                                        _bodyHTML += '<td class="' + colitem.tdclass + ' workflowstatus" data-identity=' + dataitem["IdentityID"] + '>';



                                        var CampaignLeadStatus = ParseStringToObject(_private_JSON.masterdata[0][0].data[0]);
                                        _bodyHTML += '<select class="form-control" id="workflowstatus" data-identity=' + dataitem["IdentityID"] + ' data-CampaignID=' + dataitem["CampaignID"] + ' data-property="WorkflowStatus"  data-CampaignLeadID=' + dataitem["CampaignLeadID"] + ' data-leadid=' + dataitem["LeadID"] + '>';
                                        if (CampaignLeadStatus.length > 0) {

                                            $.each(CampaignLeadStatus, function (index, item) {
                                                if (item.KeyListID == dataitem["WorkflowStatus"]) {


                                                    _bodyHTML += '<option data-identity=' + item.KeyListID + ' selected>' + item.Value1 + '</option>';
                                                    //$("option:selected").val(dataitem["WorkflowStatus"])
                                                }
                                                else {
                                                    _bodyHTML += '<option data-identity=' + item.KeyListID + '>' + item.Value1 + '</option>';
                                                }


                                            });
                                        }
                                        _bodyHTML += '</select> </td>';

                                        $("#workflowstatus").find('option').each(function (i, opt) {
                                            if (opt.value === dataitem["WorkflowStatus"])
                                                $("#workflowstatus").val(dataitem["WorkflowStatus"])
                                            // $(opt).attr('selected', 'selected');
                                        });

                                    }
                                }


                            }
                        });


                    });

                    _bodyHTML += '</tbody>';

                    return _bodyHTML;




                }
                var Standardtablehtml = "";
                Standardtablehtml += StandardHeader();
                Standardtablehtml += StandardBody();
                return Standardtablehtml;

            }

            if (_objtable !== undefined) {

                if (_objtable.type == "Grouping") {
                    _tableHtml += Grouping(_objtable);
                } else if (_objtable.type == "Standard") {
                    _tableHtml += Standard(_objtable);
                } else if (_objtable.type == "Default") {
                    _tableHtml += Default(_objtable.data);
                }
            }
            else {
                _tableHtml += '<tr>Cant find data source</tr>';
            }
            _tableHtml += '</table>';
            return _tableHtml;
        },

        Tree: function (obj) {
            var html = '';

            if (obj != undefined && obj.data.length != 0 && obj.data[0].length != 0) {
                html = '<ul class="hierarchical-list-items">';
                var parentCount = '';
                var childCount = '';
                var grandChildCount = '';

                $.each(obj.data[0], function (parentIndex, parentItem) {
                    childCount = readJsonUsingIdentity("Action", "EntityID", parentItem["EntityID"]);

                    html += '<li class="hierarchical-list-child1"   data-identity="' + parentItem["EntityID"] + '" data-level="level0" ><a href="#">'
                    html += '<div class="hierarchical-list-cell-text"><span class="hierarchical-cell-texticon"><i class="fa fa-angle-right"></i></span>'
                    html += '<span class="hierarchical-cell-text">' + parentItem[obj.configuration.displayfield[0]] + '</span></div>'
                    html += ' <div class="cell-right">';
                    html += '<ul class="nav navbar-nav ">';
                    html += '';
                    html += '<li class="dropdown dropdown-extended dropdown-notification ">';
                    html += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                    html += '<i class="fa fa-cog  "></i></a>';
                    html += '<ul class="dropdown-menu">';
                    html += '<li>';
                    html += '<ul class="dropdown-menu-list scroller" style="height: 100px;">';
                    html += '<li class="addaction" data-identity="' + parentItem["EntityID"] + '"><a href="#"><i class="fa fa-plus"></i>Add Action</a></li>';
                    html += '<li class="editentity" data-identity="' + parentItem["EntityID"] + '"><a href="#"><i class="fa fa-edit"></i>Edit</a></li>';
                    html += '<li class="deletedlucsp" data-key="DMEntity" style="margin-right:25px;" data-identity="' + parentItem["EntityID"] + '" data-level="level0"><a href="#"><i class="fa fa-times"></i>Delete</a></li>';
                    html += ' </ul>';
                    html += '</li>';
                    html += '</ul>';
                    html += '</li>';
                    html += '</ul>';
                    html += '</div>';
                    html += '</a></li>';

                    $.each(obj.data[1], function (childIndex, childItem) {



                        if (childItem[obj.configuration.ConstrainKey[1]] == parentItem.IdentityID) {

                            html += '<li class="hierarchical-list-child2" data-identity="' + childItem["ActionID"] + '" data-parent="collapse_' + parentItem["EntityID"] + '" data-level="level1"><a href="#">'


                            html += '<div class="hierarchical-list-cell-text"><span class="hierarchical-cell-texticon"><i class="fa fa-angle-double-right"></i></span>'
                            html += '<span class="hierarchical-cell-text"> ' + childItem[obj.configuration.displayfield[1]] + ' </span></div>';
                            html += ' <div class="cell-right">';
                            html += '<ul class="nav navbar-nav ">';
                            html += '';
                            html += '<li class="dropdown dropdown-extended dropdown-notification ">';
                            html += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                            html += '<i class="fa fa-cog  "></i></a>';
                            html += '<ul class="dropdown-menu">';
                            html += '<li>';
                            html += '<ul class="dropdown-menu-list scroller" style="height: 100px;">';
                            html += '<li class="addstorypoint" data-key="Action" data-parentid="' + parentItem["EntityID"] + '" data-identity="' + childItem["ActionID"] + '" data-level="level1"><a href="#"><i class="fa fa-plus"></i>Add StoryPoint</a></li>';
                            html += '<li class="editaction" data-identity="' + childItem["ActionID"] + '"><a href="#"><i class="fa fa-edit"></i>Edit</a></li>';
                            html += '<li class="deletedlucsp" style="margin-right:25px;" data-key="Action" data-parentid="' + parentItem["EntityID"] + '" data-identity="' + childItem["ActionID"] + '" data-level="level1"><a href="#"><i class="fa fa-times"></i>Delete</a></li>';
                            html += ' </ul>';
                            html += '</li>';
                            html += '</ul>';
                            html += '</li>';
                            html += '</ul>';
                            html += '</div>';
                            html += '</a></li>';
                        }
                    });

                });

                // replace the string from HTML usecasecount,storypoint count by using a temp varablie to childIndex+1
                html += '</ul>';
            }
            else {
                html += "<div>No data Found</div>";
            }
            return html;

        },




        TreeThreeLevel: function (obj) {

            var html = '';

            if (obj != undefined && obj.data.length != 0 && obj.data[0].length != 0) {
                html = '<ul class="hierarchical-list-items">';
                var parentCount = '';
                var childCount = '';
                var grandChildCount = '';

                var _groupbyConstrainKey0 = IF2Controls.GetDistinctArray(obj.data[0], obj.configuration.ConstrainKey[1]);
                var _groupbyConstrainKey1 = IF2Controls.GetDistinctArray(obj.data[0], obj.configuration.ConstrainKey[2]);

                $.each(_groupbyConstrainKey0, function (parentIndex, parentItem) {


                    html += '<li class="hierarchical-list-child1"   data-identity="' + parentItem["EntityID"] + '" data-level="level0" ><a href="#">'
                    html += '<div class="hierarchical-list-cell-text"><span class="hierarchical-cell-texticon"><i class="fa fa-angle-right"></i></span>'
                    html += '<span class="hierarchical-cell-text">' + parentItem[obj.configuration.displayfield[0]] + '</span></div>'
                    html += '</a></li>';

                    $.each(_groupbyConstrainKey1, function (childIndex, childItem) {


                        if (childItem[obj.configuration.ConstrainKey[1]] == parentItem[obj.configuration.ConstrainKey[1]]) {


                            html += '<li class="hierarchical-list-child2" data-identity="' + childItem["ActionID"] + '" data-parent="collapse_' + parentItem["EntityID"] + '" data-level="level1"><a href="#">'
                            html += '<div class="hierarchical-list-cell-text"><span class="hierarchical-cell-texticon"><i class="fa fa-angle-double-right"></i></span>'
                            html += '<span class="hierarchical-cell-text"> ' + childItem[obj.configuration.displayfield[1]] + ' </span></div>';
                            html += '</a></li>';


                            $.each(obj.data[0], function (grandchildIndex, grandchildItem) {
                                if (grandchildItem[obj.configuration.ConstrainKey[2]] == childItem[obj.configuration.ConstrainKey[2]]) {
                                    html += '<li class="hierarchical-list-child3" data-identity="' + grandchildItem["StorypointID"] + '" data-parent="collapse_' + childItem["ActionID"] + '" data-level="level2"><a href="#">'
                                    html += '<div class="hierarchical-list-cell-text"><span class="hierarchical-cell-texticon"><i class="fa fa-angle-double-right"></i></span>'
                                    html += '<span class="hierarchical-cell-text"> ' + grandchildItem[obj.configuration.displayfield[2]] + ' </span></div>';
                                    html += '</a></li>';
                                }
                            });

                        }
                    });

                });

                // replace the string from HTML usecasecount,storypoint count by using a temp varablie to childIndex+1
                html += '</ul>';
            }
            else {
                html += "<div>No data Found</div>";
            }
            return html;
        },

        Tools: {
            Icons:
            {
                Horizontal: function () { },
                Vertical: function () { },
                List: function () {
                }
            },
            Progress:
            {
                VerticalBar: function (start, end) {

                },
                HorizontalBar: function (start, end) {
                    var _verticalBarHtml = '';
                    if (start !== undefined || end !== undefined) {
                        _verticalBarHtml += '<div class="lft-value-lbl-apb">' + start + '</div>';
                        _verticalBarHtml += '<div class="rig-value-lbl-apb">' + end + '</div>';
                    } else {
                        _verticalBarHtml += '<div class="lft-value-lbl-apb"></div>';
                        _verticalBarHtml += '<div class="rig-value-lbl-apb"></div>';
                    }
                    return _verticalBarHtml;

                },
                Circle: function () { }
            }


        },

        GroupList: function (obj) {
            var _html = '';
            var _TempConfig = obj.Config;
            var _TempData = obj.data;

            if (obj != undefined && obj.data.length != 0 && obj.data[0]) {

                var _groupbyArray = IF2Controls.GetDistinctArray(_TempData, "VerticalID");

                $.each(_groupbyArray, function (indx, item) {


                    _html += '<div class="dataplan-cell">';
                    _html += '<div class="dataplan-sub-hdr-cell">';
                    _html += '<div class="cell-left">';
                    _html += '<h5 class="label-dataplan-sub-title leadassign" title="' + item.VerticalText + '" style="cursor:pointer;" data-verticalid="' + item.VerticalID + '">';
                    _html += item.VerticalText;
                    _html += '</h5>';
                    _html += '</div>';
                    _html += '<div class="cell-right">';
                    _html += '<a href="#" class="">';

                    _html += '<ul class="nav navbar-nav">';
                    _html += '<a href="#" class="grid-action-dropdown" style="padding: 0px;"></a>';
                    _html += '<li class="dropdown dropdown-extended filter-dropdown-list"><a href="#" class="grid-action-dropdown"';
                    _html += 'style="padding: 0px;"></a><a href="#" class="dropdown-toggle" style="padding: 0px;"';
                    _html += ' data-toggle="dropdown" data-hover="dropdown" data-close-others="true" title="Action">';
                    _html += ' <i class="fa fa-cog  "></i></a>';
                    _html += '<ul class="dropdown-menu">';
                    _html += ' <li>';
                    _html += '<ul class="dropdown-menu-list scroller" >';

                    if (_TempConfig.action["Data"].length > 0) {
                        $.each(_TempConfig.action.Data, function (actionindx, actionitem) {

                            _html += ' <li><a href="#" data-property="groupnavigation" data-actionid="' + actionitem.ActionID + '" data-identity=' + item[actionitem.Identity] + ' >' + actionitem.LinkText + '</a></li>';

                        });
                    }
                    _html += '</ul>';
                    _html += '</li>';
                    _html += ' </ul>';
                    _html += '</li>';
                    _html += '</ul>';

                    _html += '</a>';
                    _html += '</div>';
                    _html += '</div>';

                    var _count = true;
                    $.each(_TempData, function (subindx, subitem) {
                        if (item.VerticalID == subitem.VerticalID && subitem.CreatedOn) {
                            _count = false;
                            _html += '<div class="genz-list-cell">';
                            _html += '<div class="col-md-3 media-col-3" >';
                            _html += '<label class="label-datasummary-title navvertial" style="cursor:pointer;" data-verticalid="' + item.VerticalID + '" data-createdon="' + subitem.CreatedOn + '" >';

                            _html += ' On ' + dateFormat(subitem.CreatedOn, "ddd - dS mmm  yyyy");

                            _html += '</label>';
                            _html += '</div>';
                            _html += '<div class="col-md-2 media-col-2">';
                            _html += '<label class="label-datetime-data">';
                            _html += subitem.dateFromNow + ' Day(s) ago';
                            _html += '</label>';
                            _html += '</div>';
                            _html += '<div class="col-md-2 media-col-2">';
                            _html += '<label class="label-datasummary-sub-title">';
                            _html += subitem.Counting + ' Leads';
                            _html += '</label>';
                            _html += '</div>';
                            _html += '<div class="col-md-2 media-col-2">';
                            _html += '<label class="label-datasummary-sub-title">';
                            _html += subitem.Unassigned + ' Unassigned';
                            _html += '</label>';
                            _html += '</div>';
                            _html += '<div class="col-md-2 media-col-2">';
                            _html += '<label class="label-datasummary-sub-title">';
                            _html += '0 InActive';
                            _html += '</label>';
                            _html += '</div>';
                            _html += '</div>';
                        }
                    });

                    if (_count) {

                        _html += '<div class="genz-list-cell">';
                        _html += "<div>No Record Found</div>";
                        _html += '</div>';
                    }

                    _html += '</div>';

                });


            }
            else {
                _html += "<div>No data Found</div>";
            }
            return _html;
        },


        CampaignListNew: function (obj) {
            var html = '';
            var _tempData = JSON.parse(obj.Data);
            var _config = obj.Config;

            var groupByCampaignArray = [];
            groupByCampaignArray = IF2Controls.GetDistinctArray(_tempData, "CampaignID");

            var arrlength = groupByCampaignArray.length;
            if (arrlength > 0) {
                for (var i = 0; i < arrlength; i++) {

                    var item = groupByCampaignArray[i];

                    html += '<div class="qs-list-row">';
                    html += '<div class="qs-list-imgcell">';
                    html += '<img src="img/campaign-img.png" class="qs-list-image" />';
                    html += '</div>';
                    html += '<div class="qs-list-rightcell-s2">';

                    html += '<div class="cell-row">';
                    html += '<div class="cell-left">';
                    html += '<label class="label-qs-title">';
                    html += item.CampaignName + ',';
                    html += '</label>';

                    var getCampaignVerticalArray = GetMatchedRecordsFromArray(_tempData, "CampaignID", item.CampaignID);
                    var verticallength = getCampaignVerticalArray.length;
                    if (verticallength > 0) {
                        var j = 0;
                        while (j < verticallength) {
                            html += '<label class="label-qs-subtitle">';
                            html += getCampaignVerticalArray[j]["VerticalText"];
                            j++;
                            if (j < verticallength) {
                                html += ',';
                            }
                            html += '</label>';
                        }
                    }

                    html += '</div>';
                    html += '</div>';

                    html += '<div>';
                    html += '<label class="label-qs-subtitle">';

                    var progressstatuscmpgn = "";
                    if (item.ProgressStatus == 7004) {
                        progressstatuscmpgn = "Started";

                    } else {
                        progressstatuscmpgn = item.ProgressStatusText;

                    }

                    if (item.dateFromNow) {

                        if (item.PlannedStart >= dateFormat(new Date(), "yyyy/mm/dd")) {
                            html += progressstatuscmpgn + ', ' + item.dateFromNow + ' Day(s) to Expire';
                        } else {
                            //html += progressstatuscmpgn + ',0 Day(s) to Expire';
                            html += progressstatuscmpgn + ', ' + 'Expired before ' + Math.abs(item.dateFromNow) + ' Day(s)';
                        }
                    }

                    html += '</label>';
                    html += '</div>';
                    html += '<div class="mar-top-2">';

                    var getCampaignBDE = readJsonUsingIdentity("CampaignBDE", "CampaignID", item.CampaignID);
                    var bdelength = getCampaignBDE.length;
                    var bdenames = '';


                    if (bdelength > 0) {
                        var bdecount = 0;
                        while (bdecount < bdelength) {
                            html += '<label class="label-qs-subtitle">';
                            html += getCampaignBDE[bdecount]["BDEName"];

                            if (bdecount != 0) {
                                bdenames += ',';
                            }

                            bdenames += getCampaignBDE[bdecount]["BDEName"];
                            bdecount++;
                            if (bdecount < bdelength) {
                                html += ',';
                            }
                            html += '</label>';
                        }
                    }

                    html += '</div>';

                    html += '<div class="cell-row">';


                    // Lead Status
                    html += '<div class="cell-left">';

                    html += '<ul class="qs-list-data-cell kpiinfoCampaignManagement" data-identity=' + item.CampaignID + '>';


                    html += '<li class="active" data-type="ACTIVE"><a href="#">ACTIVE';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.Active;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li class="danger" data-type="PURGE"><a  href="#">PURGE';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.PURGE;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li data-type="BDEs" title="' + bdenames + '"><a href="#" >BDEs';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.BDECount;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li class="warning" data-type="EXE CON"><a href="#">EXE CON';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.ExecutiveConversation;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li class="warning" data-type="DEMO"><a href="#">DEMO';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.Demo;
                    html += '</label>';
                    html += '</a></li>';
                    html += '</ul>';
                    html += '</div>';


                    //Link AddCampaign,AssignBDE
                    html += '</div>';



                    html += '<div class="cell-row mar-top-10 campaignactiondiv" data-campaingname="' + item.CampaignName + '" data-identity="' + item.CampaignID + '">';

                    if (item.ProgressStatus != 7005) {
                        html += '<div class="cell-left">';
                        html += '<a href="#" class="link-title-s1 assignbde">';
                        html += "Edit Campaign";
                        html += '</a>';
                        html += '</div>';
                    }

                    if (item.ProgressStatus != 7005) {
                        html += '<div class="cell-left mar-lft-35">';
                        html += '<a href="#" class="link-title-s1 assignleads">';
                        html += ' Assign Leads';
                        html += '</a>';
                        html += '</div>';
                    }

                    if (item.ProgressStatus != 7005) {
                        html += '<div class="cell-left mar-lft-35">';
                    } else {
                        html += '<div class="cell-left">';
                    }

                    html += '<a href="#" class="link-title-s1 changecampaignStatus"  data-identity="' + item.CampaignID + '">';

                    var campaignStatus = "";

                    if (item.ProgressStatus == 7001) {

                        campaignStatus = "Start Campaign";

                    } else if (item.ProgressStatus == 7002) {

                        campaignStatus = "Park Campaign";

                    } else if (item.ProgressStatus == 7003) {

                        campaignStatus = "Resume Campaign";

                    } else if (item.ProgressStatus == 7004) {

                        campaignStatus = "Park Campaign";

                    } else if (item.ProgressStatus == 7005) {

                        campaignStatus = "Restart Campaign";
                    }

                    html += campaignStatus;

                    html += '</a>';
                    html += '</div>';


                    if (item.ProgressStatus != 7005) {

                        html += '<div class="cell-left mar-lft-35">';
                        html += '<a href="#" class="link-title-s1 completecampaignStatus">';
                        html += 'Complete Campaign';
                        html += '</a>';
                        html += '</div>';

                    }

                    html += '<div class="cell-left mar-lft-35">';
                    html += '<a href="#" class="link-sm-icon expandCampaign">';
                    html += '<i class="fa fa-angle-double-down">';
                    html += '</i>';
                    html += '</a>';
                    html += '</div>';
                    html += '</div>';


                    html += '<div class="section-row mar-top-10" >';
                    html += '<div class="section-cont-s1 min-ht-180 " id="CampaignDetails_' + item.CampaignID + '" style="display:none" >';
                    html += '</div>';
                    html += '</div>';


                    html += '</div>';
                    html += '</div>';

                }

            }
            return html;

        },



        CampaignList: function (obj) {
            var html = '';

            var _tempData = obj.Data;
            var _config = obj.Config;



            var groupByCampaign = IF2Controls.GetDistinctArray(_tempData, "CampaignID");

            if (groupByCampaign.length > 0) {
                $.each(groupByCampaign, function (index, item) {

                    html += '<div class="qs-list-row">';

                    html += '<div class="qs-list-imgcell">';
                    html += '<img src="img/campaign-img.png" class="qs-list-image" />';
                    html += '</div>';

                    html += '<div class="qs-list-rightcell-s2">';

                    html += '<div class="cell-row">';
                    html += '<div class="cell-left">';
                    html += '<label class="label-qs-title">';
                    html += item.CampaignName + ',';
                    html += '</label>';
                    var getCampaignVertical = readJsonUsingIdentity("Campaign", "CampaignID", item.CampaignID);
                    var verticallength = getCampaignVertical.length;
                    if (verticallength > 0) {
                        var i = 0;
                        while (i < verticallength) {
                            html += '<label class="label-qs-subtitle">';
                            html += getCampaignVertical[i]["VerticalText"];
                            i++;
                            if (i < verticallength) {
                                html += ',';
                            }
                            html += '</label>';

                        }
                    }

                    html += '</div>';
                    html += '</div>';

                    html += '<div>';
                    html += '<label class="label-qs-subtitle">';

                    var progressstatuscmpgn = "";
                    if (item.ProgressStatus == 7004) {
                        progressstatuscmpgn = "Started";

                    } else {
                        progressstatuscmpgn = item.ProgressStatusText;

                    }

                    if (item.dateFromNow) {

                        if (item.PlannedStart >= dateFormat(new Date(), "yyyy/mm/dd")) {
                            html += progressstatuscmpgn + ', ' + item.dateFromNow + ' Day(s) to Expire';
                        } else {
                            //html += progressstatuscmpgn + ',0 Day(s) to Expire';
                            html += progressstatuscmpgn + ', ' + 'Expired before ' + Math.abs(item.dateFromNow) + ' Day(s)';
                        }
                    }

                    html += '</label>';
                    html += '</div>';

                    html += '<div class="mar-top-2">';

                    var getCampaignBDE = readJsonUsingIdentity("CampaignBDE", "CampaignID", item.CampaignID);
                    var bdelength = getCampaignBDE.length;
                    var bdenames = '';


                    if (bdelength > 0) {
                        var i = 0;
                        while (i < bdelength) {
                            html += '<label class="label-qs-subtitle">';
                            html += getCampaignBDE[i]["BDEName"];

                            if (i != 0) {
                                bdenames += ',';
                            }

                            bdenames += getCampaignBDE[i]["BDEName"];
                            i++;
                            if (i < bdelength) {
                                html += ',';
                            }
                            html += '</label>';
                        }
                    }

                    html += '</div>';

                    html += '<div class="cell-row">';


                    // Lead Status
                    html += '<div class="cell-left">';

                    html += '<ul class="qs-list-data-cell kpiinfoCampaignManagement" data-identity=' + item.CampaignID + '>';


                    html += '<li class="active" data-type="ACTIVE"><a href="#">ACTIVE';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.Active;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li class="danger" data-type="PURGE"><a  href="#">PURGE';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.PURGE;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li data-type="BDEs" title="' + bdenames + '"><a href="#" >BDEs';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.BDECount;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li class="warning" data-type="EXE CON"><a href="#">EXE CON';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.ExecutiveConversation;
                    html += '</label>';
                    html += '</a></li>';


                    html += '<li class="warning" data-type="DEMO"><a href="#">DEMO';
                    html += '<br />';
                    html += '<label class="label-qs-value">';
                    html += item.Demo;
                    html += '</label>';
                    html += '</a></li>';
                    html += '</ul>';
                    html += '</div>';


                    //Link AddCampaign,AssignBDE
                    html += '</div>';

                    html += '<div class="cell-row mar-top-10 campaignactiondiv" data-campaingname="' + item.CampaignName + '" data-identity="' + item.CampaignID + '">';

                    if (item.ProgressStatus != 7005) {
                        html += '<div class="cell-left">';
                        html += '<a href="#" class="link-title-s1 assignbde">';
                        html += "Edit Campaign";
                        html += '</a>';
                        html += '</div>';
                    }

                    if (item.ProgressStatus != 7005) {
                        html += '<div class="cell-left mar-lft-35">';
                        html += '<a href="#" class="link-title-s1 assignleads">';
                        html += ' Assign Leads';
                        html += '</a>';
                        html += '</div>';
                    }

                    if (item.ProgressStatus != 7005) {
                        html += '<div class="cell-left mar-lft-35">';
                    } else {
                        html += '<div class="cell-left">';
                    }

                    html += '<a href="#" class="link-title-s1 changecampaignStatus"  data-identity="' + item.CampaignID + '">';

                    var campaignStatus = "";

                    if (item.ProgressStatus == 7001) {

                        campaignStatus = "Start Campaign";

                    } else if (item.ProgressStatus == 7002) {

                        campaignStatus = "Park Campaign";

                    } else if (item.ProgressStatus == 7003) {

                        campaignStatus = "Resume Campaign";

                    } else if (item.ProgressStatus == 7004) {

                        campaignStatus = "Park Campaign";

                    } else if (item.ProgressStatus == 7005) {

                        campaignStatus = "Restart Campaign";
                    }

                    html += campaignStatus;

                    html += '</a>';
                    html += '</div>';


                    if (item.ProgressStatus != 7005) {

                        html += '<div class="cell-left mar-lft-35">';
                        html += '<a href="#" class="link-title-s1 completecampaignStatus">';
                        html += 'Complete Campaign';
                        html += '</a>';
                        html += '</div>';

                    }

                    html += '<div class="cell-left mar-lft-35">';
                    html += '<a href="#" class="link-sm-icon expandCampaign">';
                    html += '<i class="fa fa-angle-double-down">';
                    html += '</i>';
                    html += '</a>';
                    html += '</div>';

                    html += '</div>';



                    html += '<div class="section-row mar-top-10" >';
                    html += '<div class="section-cont-s1 min-ht-180 " id="CampaignDetails_' + item.CampaignID + '" style="display:none" >';


                    html += '<div class="w-col-md50">';
                    html += '<div class="section-inner-container-s1 min-ht-215">';

                    html += '<div class="section-hdr-cell-s1">';
                    html += '<div class="cell-row">';
                    html += '<div class="cell-left">';
                    html += '<h5 class="label-sec-title-s1">';
                    html += 'Leads History';
                    html += '</h5>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    html += '<div class="section-body-cell-s1">';
                    html += '<div class="section-row">';

                    var filterArray = [];
                    $.map(_private_JSON.LeadHistory[0], function (element, index) {
                        if (element.CampaignID == item.CampaignID) {
                            filterArray.push(element);
                        }
                    });

                    var _objTable = {};
                    _objTable.config = _objNestedTableConfiguration.NestedTable;
                    _objTable.data = filterArray;
                    _objTable.css = "read-grid-data-list";
                    _objTable.type = "Standard";

                    html += IF2Controls.Table(_objTable);

                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';



                    html += '<div class="w-col-md50">';
                    html += '<div class="section-inner-container-s2 min-ht-215">';
                    html += '<div class="section-hdr-cell-s1">';
                    html += '<div class="cell-row">';
                    html += '<div class="cell-left">';
                    html += '<h5 class="label-sec-title-s1">';
                    html += '  Campaign History';
                    html += '</h5>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="section-body-cell-s1">';
                    html += '<div class="section-row">';


                    html += '<table class="read-grid-data-list">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th class="w-30-per">';
                    html += 'DATE';
                    html += '</th>';
                    html += '<th class="w-70-per">';
                    html += 'ACTIVITY';
                    html += '</th>    ';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var filterArrayStatus = [];
                    $.map(_private_JSON.CampaignHistory[0], function (element, index) {
                        if (element.CampaignID == item.CampaignID) {
                            filterArrayStatus.push(element);
                        }
                    });

                    html += '<tr>';
                    html += '<td class="grid-cell-text-highlight">';

                    if (item.CreatedOn != "") {
                        html += dateFormat(item.CreatedOn, "ddd - dS mmm  yyyy");
                    }
                    html += ' </td>';
                    html += '<td>Campaign Created</td>';
                    html += ' </tr>  ';

                    $.each(filterArrayStatus, function (statusindex, statusitem) {

                        html += '<tr>';
                        html += '<td class="grid-cell-text-highlight">';
                        html += dateFormat(statusitem.ActionOn, "ddd - dS mmm  yyyy");
                        html += ' </td>';
                        html += '<td>Status Changed to ' + statusitem.ProgressStatusText + '</td>';
                        html += ' </tr>  ';

                    });


                    html += '</tbody>';
                    html += '</table>';


                    html += '</div>';
                    html += '<div class="section-row mar-top-6">';
                    html += '<label class="label-stat-title">';
                    html += ' Current Campaign Status is';
                    html += '</label>';
                    html += '<a href="#" class="label-stat-title-highlight"> ';
                    html += item.ProgressStatusText;
                    html += '</a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';


                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    html += '</div>';
                    html += '</div>';


                });

            } else {

                html += '<div>No Data Found </div>';
            }

            return html;

        },




        //Json Manipulation
        GetDistinctArray: function (array, AssociatePro) {

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
        },
        GenerateDataAttribute: function (dAttr) {
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
        },
        Generateselectboxdefault: function (_objselectbox) {
            var _strAttr = IF2Controls.GenerateDataAttribute(_objselectbox.Singleselect.attribute);
            var _selectbx = _objselectbox.Singleselect.value.Data;
            var _selectboxHtml = '<select id="' + _objselectbox.Singleselect.ID + '"  class="' + _objselectbox.Singleselect.class + '" ' + _strAttr + '>';

            for (var i = 0; i < _selectbx.length; i++) {

                _selectboxHtml = _selectboxHtml + '<option value="' + _selectbx[i][_objselectbox.Singleselect["datatextfield"]] + '">' + _selectbx[i][_objselectbox.Singleselect["datavaluefield"]] + '</option>';
            }

            _selectboxHtml = _selectboxHtml + '</select>';
            return _selectboxHtml;
        },

        Message: function (type, behavior, container) {
            if (type === "sucess" && behavior === "show") {
                Sucess(container);
            }
            else if (type === "sucess" && behavior === "hide") {
                DestroySucess(container);
            }
        }

    };

} ();

var Sucess = function (container) {
    DestroyError(container);
    $(container).prepend('<div class="form-control-success" style="margin-top: 0px; margin-bottom: 25px;"><strong>Success!</strong> You successfully posted data.</div>');
};
var Error = function (container) { };
var DestroySucess = function (container) {
    $(container).find('.form-control-success').remove();
};
var DestroyError = function (container) {
    $(container).find('.form-control-failed').remove();
}


function drawTree(obj) {
    if (obj != undefined && obj.data.length != 0) {
        var html = '<ul class="hierarchical-list-items">';
        var parentCount = '';
        var childCount = '';
        var grandChildCount = '';
        $.each(obj.data[0], function (parentIndex, parentItem) {
            html += '<li class="hierarchical-list-child1"><a href="#">'
                                + '<div class="hierarchical-list-cell-text">'
                                    + parentItem[obj.configuration.displayfield[0]]
                                    + '<span>3</span></div>'
                                + '<div class="hierarchical-list-cell-icon">'
                                    + '<span id="addusecase"><i class="fa fa-plus"></i></span>'
                                + '</div>'
                            + '</a></li>';
            $.each(obj.data[1], function (childIndex, childItem) {
                if (childItem[obj.configuration.ConstrainKey[1]] == parentItem.IdentityID) {
                    html += '<li class="hierarchical-list-child2"><a href="#">'
                                + '<div class="hierarchical-list-cell-text">'
                                    + childItem[obj.configuration.displayfield[1]]
                                    + '<span>5</span></div>'
                            + '</a></li>';

                    $.each(obj.data[2], function (grandChildIndex, grandChildItem) {

                        if (grandChildItem[obj.configuration.ConstrainKey[2]] == childItem.IdentityID) {
                            html += '<li class="hierarchical-list-child3"><a href="#">'
                                + '<div class="hierarchical-list-cell-text">'
                                + grandChildItem[obj.configuration.displayfield[2]]
                                    + '</div>'
                               + '</a></li>';

                        }

                    });

                }


            });

        });
        // replace the string from HTML usecasecount,storypoint count by using a temp varablie to childIndex+1
        html += '</ul>';
    }
    return html;
}

//sengut (12.12.14)
function DrawAction(obj) {
    var html = '';
    if (obj != undefined && obj.data.length != 0 && obj.data[0].length != 0) {

        $.each(obj.data, function (index, item) {



            html += '                    <div class="addactivity-row">';
            html += '                        <div class="addactivity-title-cell">';
            html += '                            <h4 class="label-addactivity-title">';
            html += '                                ' + item[obj.configuration.displayfield[0]] + ', <span class="label-addactivity-sub-title">' + item[obj.configuration.displayfield[1]] + '</span>';
            html += '                            </h4>';
            html += '                        </div>';
            html += '                    </div>';
            html += '                    <div class="addactivity-row">';
            html += '                        <div class="addactivity-title-cell">';
            html += '                            <label class="label-addactivity-section-title">';
            html += '                               ' + item[obj.configuration.displayfield[2]] + '';
            html += '                            </label>';
            html += '                            <span class="icon-addactivity-ratings-small"><i class="fa fa-star"></i><i class="fa fa-star">';
            html += '                            </i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            html += '                            </span>';
            html += '                        </div>';
            html += '                    </div>';
            html += '                    <div class="informatic-container">';
            html += '                        <div class="informatic-row">';
            html += '                            <ul class="informatic-list-items">';
            html += '                                <li>';
            html += '                                    <div class="informatic-list-items-cell">';
            html += '                                      <div class="cell-row">';
            html += '                                        <div class="informatic-list-cell-text cell-left">';
            html += '                                            CONTACT:';
            html += '                                        </div>';
            html += '                                        <div class="icon-action-img cell-right">';
            html += '                                                            <img src="img/PHONE-ICON.png">';
            html += '                                                        </div>';
            html += '                                       </div>';
            html += '                                        <div class="list-cell-phonenumber">';
            html += '                                            ' + item[obj.configuration.displayfield[3]] + '';
            html += '                                        </div>';
            html += '                                        <div class="informatic-list-cell-extensiontext">';
            html += '                                             ' + item[obj.configuration.displayfield[4]] + '';
            html += '                                        </div>';
            html += '                                    </div>';
            html += '                                </li>';
            html += '                                <li>';
            html += '                                    <div class="informatic-list-items-cell">';
            html += '                                      <div class="cell-row">';
            html += '                                        <div class="informatic-list-cell-text cell-left">';
            html += '                                            ALTERNATE:';
            html += '                                        </div>';
            html += '                                         <div class="icon-action-img cell-right">';
            html += '                                                            <img src="img/PHONE-ICON.png">';
            html += '                                                        </div>';
            html += '                                      </div>';
            html += '                                        <div class="list-cell-phonenumber">';
            html += '                                            ' + item[obj.configuration.displayfield[5]] + '';
            html += '                                        </div>';
            html += '                                        <div class="informatic-list-cell-extensiontext">';
            html += '                                            ' + item[obj.configuration.displayfield[6]] + '';
            html += '                                        </div>';
            html += '                                    </div>';
            html += '                                </li>';
            html += '                                <li>';
            html += '                                    <div class="informatic-list-items-cell">';
            html += '                                      <div class="cell-row">';
            html += '                                        <div class="informatic-list-cell-text cell-left">';
            html += '                                            Mail:';
            html += '                                        </div>';
            html += '                                            ' + item[obj.configuration.displayfield[7]] + '';
            html += '                                        </div>';
            html += '                                        <div>';
            html += '                                            <a href="#" class="link-informatic-email-data"></a>';
            html += '                                        </div>';
            html += '                                    </div>';
            html += '                                </li>';
            html += '                            </ul>';
            html += '                        </div>';

        });
        return html;
    }
}

function getDate(JSONdate) {
    if (JSONdate == null) {
        return '0'
    }
    else {
        var date = new Date(parseInt(JSONdate.substr(6)));


        var day = date.getDay()
        var month = date.getMonth()
        var daym = date.getDate()

        var dayarray = new Array("Sun", "Mon", "Tue", "Wed", "Thu",
                            "Fri", "Sat")
        var montharray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec")
        date = 'On' + ' ' + dayarray[day] + "-" + daym + 'th' + ' ' + montharray[month];

        return date;
    }

}

function getTime(JSONdate) {
    var date = new Date(parseInt(JSONdate.substr(6)));
    var hours = date.getHours();
    var hours = (hours + 24) % 24;
    var mid = 'AM';
    if (hours == 0) { //At 00 hours we need to show 12 am
        hours = 12;
    }
    else if (hours > 12) {
        hours = hours % 12;
        mid = 'PM';
    }
    var min = date.getMinutes();
    if (min < 10)
        min = "0" + min;
    if (hours < 10)
        hours = "0" + hours;
    return hours + ':' + min + ' ' + mid;
}


function DrawAssignCampaignTable(_obj) {

    var Config = _obj;
    var _currData = Config.Data;

    var _html = '';
    _html += '<table class="lead-detail-table" id="' + Config.ID + '">';
    _html += '<thead>';
    _html += '<tr>';
    _html += '<th style="width: 50%">';
    _html += '<input type="checkbox" data-type=' + Config.HeaderText + ' class="mastercheckbox" />';
    _html += '<span>' + Config.HeaderText + '(' + _currData.length + ')</span>';
    _html += '</th>';
    _html += '<th style="width: 50%">';
    _html += '</th>';
    _html += '</tr>';
    _html += '</thead>';

    _html += '<tbody>';

    $.each(_currData, function (index, item) {
        _html += '<tr>';
        _html += '<td>';
        _html += '<input type="checkbox" class="checkassignedleads" data-identity="' + item[Config.Identity] + '" data-CampaignLeadID="' + item[Config.ConstraintKey[2]] + '" />';
        _html += '<span>' + item[Config.DisplayField[0]] + '</span>';
        _html += '</td>';
        _html += '<td>';
        _html += item[Config.DisplayField[1]];
        _html += '</td>';
        _html += '</tr>';
    });

    _html += '</tbody>';
    _html += '</table>';

    return _html;

}



function DrawAssignCampaignTable1(_obj) {

    var Config = _obj;
    var _currData = Config.Data;

    var _html = '';
    _html += '<table class="lead-detail-table" id="' + Config.ID + '">';
    _html += '<thead>';
    _html += '<tr>';
    _html += '<th>';
    _html += '<span>' + Config.HeaderText + '(' + _currData.length + ')</span>';
    _html += '</th>';
    _html += '<th>';
    _html += '</th>';
    _html += '</tr>';
    _html += '</thead>';

    _html += '<tbody>';

    $.each(_currData, function (index, item) {
        _html += '<tr>';

        _html += '<td>';
        _html += '<input type="checkbox" class="checkmovingleads" data-identity="' + item[Config.Identity] + '" data-CampaignLeadID="' + item[Config.ConstraintKey[2]] + '" />';
        _html += '<span>' + item[Config.DisplayField[0]] + '</span>';
        _html += '</td>';
        _html += '<td>';
        _html += item[Config.DisplayField[1]];
        _html += '</td>';
        _html += '</tr>';
    });

    _html += '</tbody>';
    _html += '</table>';

    return _html;

}




function DrawCampaignExecList(obj) {

    var _html = '';

    var now = new Date();
    var _whereString = obj.WhereClause;
    var _tempdate = "";
    if (_whereString == "today") {

        _tempdate = String(now);
        _tempdate = new Date(_tempdate);

        var datestring = dateFormat(_tempdate, "ddd - dS mmm");

        var filterArray = getSortedArrayByDate(obj.Data, _tempdate);
        _html += '<h4 class="label-dataplan-title"> TODAYS CALLS (' + filterArray.length + ') </h4>';
        // filterArray = filterArray.reverse();
        var groupArray = getGroupByArray(filterArray, obj.configuration);
        // groupArray = groupArray.reverse();
        _html += '<div class="dataplan-inner-details">';

        if (filterArray.length > 0) {
            _html += getCamapignExecListByDate(_tempdate, groupArray, filterArray, obj.configuration, _whereString);
        } else {

            _html += '<div>No CALLS(s) scheduled for the day</div>';
        }
        _html += '</div>';

    }


    else if (_whereString == "unprocessed") {


        _tempdate = String(now);
        _tempdate = new Date(_tempdate);
        var _count = 0;
        var currentShiftedDate = "";

        var filterArray = getSortedArrayByDate1(obj.Data, _tempdate);
        _html += '<h4 class="label-dataplan-title"> OVERDUE CALLS (' + filterArray.length + ') </h4>';
        filterArray = filterArray.reverse();
        var groupArray = getGroupByArray(filterArray, obj.configuration);
        // groupArray = groupArray.reverse();
        _html += '<div class="dataplan-inner-details">';

        if (filterArray.length > 0) {
            _html += getCamapignExecListByDate(_tempdate, groupArray, filterArray, obj.configuration, _whereString);
        } else {

            _html += "<div>Seems like you didn't call for past 30 days</div>";
        }
        _html += '</div>';
    }

    else if (_whereString == "upcoming") {


        _tempdate = String(now);
        _tempdate = new Date(_tempdate);
        var _count = 0;
        var currentShiftedDate = "";

        var filterArray = getSortedArrayByDate2(obj.Data, _tempdate);
        _html += '<h4 class="label-dataplan-title"> UNSCHEDULED CALLS (' + filterArray.length + ') </h4>';
        //filterArray = filterArray.reverse();
        var groupArray = getGroupByArray(filterArray, obj.configuration);
        //  groupArray = groupArray.reverse();
        _html += '<div class="dataplan-inner-details">';

        if (filterArray.length > 0) {
            _html += getCamapignExecListByDate(_tempdate, groupArray, filterArray, obj.configuration, _whereString);
        } else {

            _html += "<div>Seems like you didn't call for upcoming  30 days</div>";
        }
        _html += '</div>';
    }

    return _html;

}


function getSortedArrayByDate(_objArray, currdate) {

    var filterdArray = [];
    filterdArray = $.grep(_objArray, function (element, index) {
        if (element.NextActionOn != "" || element.NextFollowupDate != "") {

            // var _NextActionOn = dateFormat(element.NextActionOn, "mm/dd/yyyy");
            var _NextActionOn = DateFormatNew.format.date(element.NextActionOn, "MM/dd/yyyy");

            var _FollowupOn = DateFormatNew.format.date(element.NextFollowupDate, "MM/dd/yyyy");
            var _currentShiftString = dateFormat(currdate, "mm/dd/yyyy");

            if (_NextActionOn == _currentShiftString || _FollowupOn == _currentShiftString) {
                return true;
            } else {
                return false;
            }



            //            if (_NextActionOn != _currentShiftString || _FollowupOn != _currentShiftString) {
            //                return false;
            //            } else {
            //                return true;
            //            }

        }

    });

    return filterdArray;
}


function getSortedArrayByDate1(_objArray, currdate) {

    var filterdArray = [];
    filterdArray = $.grep(_objArray, function (element, index) {
        if (element.NextActionOn != "") {

            // var _NextActionOn = dateFormat(element.NextActionOn, "mm/dd/yyyy");
            var _NextActionOn = DateFormatNew.format.date(element.NextActionOn, "MM/dd/yyyy");
            var _currentShiftString = dateFormat(currdate, "mm/dd/yyyy");

            if (_NextActionOn < _currentShiftString && _NextActionOn != "") {
                return true;
            } else {
                return false;
            }

        }

    });

    return filterdArray;
}

function getSortedArrayByDate2(_objArray, currdate) {

    var filterdArray = [];
    filterdArray = $.grep(_objArray, function (element, index) {

        if (element.NextActionOn == "") {
            return true;
        } else {
            return false;
        }

    });

    return filterdArray;
}




function getGroupByArray(_objArray, config) {

    var _groupbyArray = [];
    _groupbyArray = IF2Controls.GetDistinctArray(_objArray, config.Groupby["Field"]);
    _groupbyArray = _groupbyArray.sort(function (a, b) {
        return a[config.Groupby["Field"]] - b[config.Groupby["Field"]];
    });
    return _groupbyArray;

}


function getGroupByArray1(_objArray, field) {

    var _groupbyArray = [];
    _groupbyArray = IF2Controls.GetDistinctArray(_objArray, field);
    _groupbyArray = _groupbyArray.sort(function (a, b) {
        return a[field] - b[field];
    });
    return _groupbyArray;

}


function getCamapignExecListByDate(_date, groupbyArray, objdata, config, whereString) {

    var currentSelectedDate = _date;
    var CurrentgroupByArray = groupbyArray;
    var currentobj = objdata;
    var _html = '';


    _html += '<div class="dataplan-cell">';
    $.each(CurrentgroupByArray, function (index, item) {

        var wherecondition = { "CampaignID": item[config.Groupby.Field] };
        _html += '<div class="dataplan-sub-hdr-cell">';
        _html += '<h5 class="label-dataplan-sub-title">' + item[config.Groupby.Text] + ' (' + getitemCount(currentobj, wherecondition) + ')</h5>';
        _html += '</div>';
        $.each(currentobj, function (subindex, subitem) {

            if (subitem[config.Groupby.Field] == item[config.Groupby.Field]) {
                _html += "<div class=\"dataplan-summary-row\">";

                _html += "<div class=\"dataplan-summary-left\">";
                _html += '<a href="#">';
                _html += "<span class=\"icon-user-group\">";
                _html += "<i class=\"fa fa-user\"><\/i>";
                _html += "<\/span>";
                _html += '<div class="summary-title-cell">';
                _html += '<h6 class="label-datasummary-title">' + subitem[config.Displayfield[0]] + '</h6>';
                _html += '<label class="label-datasummary-sub-title">' + subitem[config.Displayfield[1]] + '</label>';


                if (whereString == "unprocessed") {
                    _html += '<label class="label-datasummary-sub-title"> Due by ' + subitem["Datefromnow"] + ' Day(s)</label>';
                }
                if (whereString == "upcoming") {
                    _html += '<label class="label-datasummary-sub-title"> Last Activity ' + DateFormatNew.format.date(subitem["CreatedOn"], "MM/dd/yyyy") + '</label>';
                }

                _html += '</div>';
                _html += '</a>';
                _html += '</div>';


                _html += '<div class="dataplan-summary-right">';
                _html += '<div class="datetime-title-cell">';
                _html += '<div class="cell-left">';
                _html += '<label class="label-datetime-data">' + subitem[config.Displayfield[2]] + '</label>';
                _html += "</div>";
                _html += '<div class="cell-right">';
                _html += '<div class="icon-action-img">';
                _html += '<a href="#" class="callbtnclick" data-tabletype=' + whereString + '  data-CampaignID=' + subitem[config.ConstrainKey[1]] + ' data-identity=' + subitem[config.ConstrainKey[0]] + ' data-CampaignLeadID=' + subitem[config.ConstrainKey[2]] + '><img src="img/PHONE-ICON.png" /></a>';
                _html += ' </div>';
                _html += '</div>';
                _html += "</div>";
                _html += '<div class="dataplan-action-control">';

                _html += '<div class="cell-left">';
                _html += '<label class="label-datetime-data">';
                _html += subitem[config.Displayfield[3]]
                _html += '</label>';
                _html += '</div>';

                //                _html += '<div class="cell-right">';
                //                _html += '<div class="icon-action">';
                //                _html += '<i class="fa fa-check"></i>';
                //                _html += '</div>';
                //                _html += '</div>';

                _html += '</div>';
                _html += '</div>';
                _html += '</div>';

            }
        });
    });
    _html += "</div>";

    return _html;
}