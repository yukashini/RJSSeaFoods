// On DOM Ready
{


    $(document).ready(function () {
        var _wWidth = $(window).width();
        if (_wWidth <= 1024 && _wWidth >= 300) {
            // Block for Mobile
            // write your code here, if specific action has to happen for mobile.
        }
        BindMenusBasedOnRole();
        setAunthinticatedUser();
    });

    var lstuserbinddd = [];
    var lstPriorMarkFR = [];
}

var setAunthinticatedUser = function () {
    var tempAunthinticatedUser = GetCookie("LoggedInUser");
    var tempAuthentication = (IsSSOEnabled) ? $.parseJSON(tempAunthinticatedUser)[0] : $.parseJSON(tempAunthinticatedUser);
    if (tempAuthentication == undefined) {
        tempAuthentication = $.parseJSON(tempAunthinticatedUser);
    }
    SetCookie("LoggedInUser=" + JSON.stringify(tempAuthentication));
    var AunthinticatedUser = JSON.stringify(tempAuthentication);
    var strUserBusinessUnit = GetCookie("UserBusinessUnit");
    var strUserDepartment = localStorage.getItem("BusinessUnitDepartment");
    var _IsChangedCurrentBUID = GetSession('IsChangedBUID');
    //UserDepartment
    if (_IsChangedCurrentBUID == 'true') {
        SetSession('IsChangedBUID', false);
        window.location.href = "ProjectHome.aspx";
    }
    else {
        if (AunthinticatedUser !== null) {
            var lstUserBusinessUnit = $.parseJSON(strUserBusinessUnit);
            var lstUserDepartment = $.parseJSON(strUserDepartment);
            if (lstUserBusinessUnit.length > 0) {
                BindBusinessUnit(lstUserBusinessUnit);
            }

            if (lstUserDepartment.length > 0) {
                BindUserDepartment(lstUserDepartment);
            }
            var objAunthinticatedUser = $.parseJSON(AunthinticatedUser);
            //objAunthinticatedUser = $.parseJSON(AunthinticatedUser);
            $('#LoggedinUser').html(objAunthinticatedUser['DisplayName']);
            $('.LoggedinUserShortName').html(objAunthinticatedUser['ShortName']);
            userID = objAunthinticatedUser['Users_SID'];
            BindPPBookmark();
            var hrefstring = 'https://bugreporter.archarena.com/?_ProjectId=10004&_UserId=' + userID + '&_BUId=' + UserBusinessUnit + '';
            $('#BugReporter').attr('href', hrefstring);
        }
        else {
            window.location.href = "Login.aspx";
        }


    }
}


var BindBusinessUnit = function (lst) {
    var strUserPrimaryBusinessUnit = GetCookie("PrimaryBusinessUnit");

    var html = '';
    var $el = $('#slt-businessunit');
    $.each(lst, function (index, item) {
        html += '<option value="' + item["BusinessUnitID"] + '">' + item["BusinessUnitName"] + '</option>';
    });
    $el.html(html);

    if (strUserPrimaryBusinessUnit != undefined) {
        var ObjBusinessUnit = $.parseJSON(strUserPrimaryBusinessUnit);
        $el.val(ObjBusinessUnit["BusinessUnitID"]);
        UserBusinessUnit = parseInt(ObjBusinessUnit["BusinessUnitID"]);
    }
    else {
        var PrimaryBusinessUnitID = GetmatchedRecord(lst, 'isPrimary', 1);
        if (PrimaryBusinessUnitID.length > 0) {
            $el.val(PrimaryBusinessUnitID[0]["BusinessUnitID"]);
            var obj = {};
            obj.BusinessUnitID = PrimaryBusinessUnitID[0]["BusinessUnitID"];
            SetCookie('PrimaryBusinessUnit=' + JSON.stringify(obj));
            UserBusinessUnit = parseInt(PrimaryBusinessUnitID[0]["BusinessUnitID"]);
        }
    }
}

$(document).on('click', '#btn-search-buid', function (e) {
    e.preventDefault();
    var uri = window.location.toString();
    uri = removeURLParameter(uri, '_ppbookmrk');
    uri = removeURLParameter(uri, '_ppbmid');
    var _IsChangedCurrentBUID = GetSession('IsChangedBUID');
    var _StrPrevBUID = GetCookie("PrimaryBusinessUnit");
    var _PrevBUDI = null;
    if (_StrPrevBUID != undefined) {
        var ObjBusinessUnit = $.parseJSON(_StrPrevBUID);
        _PrevBUDI = ObjBusinessUnit["BusinessUnitID"];
    }

    var _CURBUID = $('#slt-businessunit').val();
    if (_CURBUID != _PrevBUDI) {
        $.confirm({
            title: 'Confirm!',
            content: 'You have changed Business Unit so you will be redirect to Project Home. ',
            //type: 'green',
            //autoClose: 'close|8000',
            typeAnimated: true,
            buttons: {
                Ok: function () {
                    var obj = {};
                    obj.BusinessUnitID = $('#slt-businessunit').val();
                    SetCookie('PrimaryBusinessUnit=' + JSON.stringify(obj));
                    _UserBusinessDepartmentID = [];
                    Removecookie('PrimaryDepartment');
                    SetSession('IsChangedBUID', true);
                    location.replace(uri);
                }
            }
        });
    }
    else {
        location.replace(uri);
    }



});


$(document).on('click', '#shownotification', function (e) {

    $('#Pop-ReleaseNotes').toggle();
});


//$(document).on('change', '#slt-businessunit', function (e) {
//    e.preventDefault();
//    var obj = {};
//    obj.BusinessUnitID = $(this).val();
//    SetCookie('PrimaryBusinessUnit=' + JSON.stringify(obj));
//    _UserBusinessDepartmentID = [];
//    Removecookie('PrimaryDepartment');

//    //location.reload();
//});

//UserDepartment
{
    var BindUserDepartment = function (lstUserDepartment) {
        var _AllDepartment = [];
        var BusinessUnitIDDepartment = $('#slt-businessunit').val();
        var listMyDeprtment = $.grep(lstUserDepartment, function (item, index) {
            return (item['BusinessUnitID'] == parseInt(BusinessUnitIDDepartment));
        });
        var html = '';
        var $el = $('#slt-department');
        html += '<option value="0">Common Department</option>';
        _AllDepartment.push(0);
        if (listMyDeprtment.length > 0) {
            $.each(listMyDeprtment, function (index, item) {
                html += '<option value="' + item["DepartmentID"] + '">' + item["DepartmentName"] + '</option>';
                _AllDepartment.push(item["DepartmentID"]);
            });

        }

        $el.html(html);
        var StrUserDepartmentID = $.parseJSON(GetCookie("PrimaryDepartment"));


        if (StrUserDepartmentID != undefined && StrUserDepartmentID != null && StrUserDepartmentID.length > 0) {
            var ObjBusinessUnit = StrUserDepartmentID;
            var _lst = [];
            if (ObjBusinessUnit.length > 0) {
                $.each(ObjBusinessUnit, function (index, item) {
                    _lst.push(item["DepartmentID"]);
                })
            }
            $el.val(_lst);
            _UserBusinessDepartmentID = _lst;
            BookmarkDepartment = _lst;
            $el.selectpicker();
        }
        else {
            _UserBusinessDepartmentID = _AllDepartment;
            BookmarkDepartment.push(0);
        }

    }

    $(document).on('change', '#slt-department', function (e) {
        e.preventDefault();
        var _listOfUserDepartment = $('#slt-department').val();
        var _TempUserDepartment = [];
        if (_listOfUserDepartment != null) {
            $.each(_listOfUserDepartment, function (index, item) {
                var obj = {};
                obj.DepartmentID = item;
                _TempUserDepartment.push(obj);
            });

            //// Shared Department
            //var obj = {};
            //obj.DepartmentID = 0;
            //_TempUserDepartment.push(obj);
        }

        //var DepartmentCookie = JSON.stringify(_TempUserDepartment);
        SetCookie('PrimaryDepartment=' + JSON.stringify(_TempUserDepartment));
        //location.reload();
    });


    $(document).on('click', '#AddBookmark', function () {
        var isfilter = 0;
        var html = '';
        $('#txt-bookmarkname').val('');
        $('#err-bookmrknam').hide();
        var lstBdpt = BookmarkDepartment;
        if (lstBdpt.length > 0) {
            if (lstBdpt.length == 1) {
                isfilter = 0;
                if (lstBdpt[0] == 0) {
                    html += '<label class="isc-pp-bookmark-lbl">Common Department</label>';
                } else {
                    var deptname = $('#slt-department option[value="' + lstBdpt[0] + '"]').text();
                    html += '<label class="isc-pp-bookmark-lbl">' + deptname + '</label>';
                }
            } else {
                isfilter = 1;
                html += '<div class="isc-bookmark-sel-cont">';
                html += '<select class="isc-select-dropdown list-filter select2 isc-bookmark-sel-cont" tabindex="-1" id="bookmark_cdmdept">';
                $.each(lstBdpt, function (index, item) {
                    var deptname = $('#slt-department option[value="' + item + '"]').text();
                    html += '<option value="' + item + '">' + deptname + '</option>';
                });
                html += ' </select>';
                html += '</div>';
            }
        }
        $('#bookmarkdept').html(html);
        if (isfilter == 1) {
            $('#bookmark_cdmdept option[value="' + lstBdpt[0] + '"]').prop('selected', 'selected').change();
            $('#bookmark_cdmdept').select2();
        }
    });

    $(document).on('click', '#btn-save-bookmark', function () {
       $loading.show();
        setTimeout(function () {
            SaveBookmark();
            $loading.hide();
        }, 0);
    });

    $(document).on('keyup', '#txt-bookmarkname', function () {
        var BookmrkNam = $('#txt-bookmarkname').val();
        if (BookmrkNam.length > 0) {
            $('#err-bookmrknam').hide();
        } else {
            $('#err-bookmrknam').show();
        }
    });
}

var SaveBookmark = function () {
    var BookmrkNam = $('#txt-bookmarkname').val();
    var Bookmrkurl = $(location).attr('href');
    var BookmrkAppdept = BookmarkDepartment.join(",");
    if (BookmrkNam.length > 0) {
        $('#err-bookmrknam').hide();
        var entityID = PP_Bookmark;
        // Create Process Instance
        _private_JSON.sequenceID = [];
        _private_JSON.EntityInstanceWrite = [];
        addDatatoProperties("sequenceID", requestSequenceID(entityID));
        var _array = queryPrivateJson("sequenceID", "");
        var _entityID = entityID;
        var _nxtNumber = assignSequenceID(_array, _entityID);
        var entityinstance = {};
        if (_nxtNumber != undefined) {
            // Default Properties
            entityinstance.EntityTypeID = _entityID;
            entityinstance.viewname = "PP_Bookmark";
            entityinstance.IdentityID = _nxtNumber;
            entityinstance.Application = 10004;
            entityinstance.BusinessUnitID = UserBusinessUnit;
            if ($('#bookmark_cdmdept').val() == undefined) {
                entityinstance.CDM_Department = _UserBusinessDepartmentID[0];
            } else {
                entityinstance.CDM_Department = $('#bookmark_cdmdept').val();
            }
            entityinstance.BookmarkName = BookmrkNam;
            entityinstance.URL = Bookmrkurl;
            entityinstance.App_DepartmentFilterID = BookmrkAppdept;
            entityinstance.CreatedOn = new Date();
            entityinstance.CreatedBy = userID;
            entityinstance.UserID = userID;
            entityinstance.IsActive = 1;
            entityinstance.Flag = "1";
            entityinstance.Ischanged = true;
            entityinstance["BookmarkID"] = _nxtNumber;

            var EntityInstances = [];
            EntityInstances.push(entityinstance);
            addDatatoProperties("EntityInstanceWrite", EntityInstances);
            parseInsertObject(_private_JSON);
            if (_submitObject.length > 0) {
                var _obj = {
                    "_lstJsonObject": _submitObject
                };
                var _obj = Call_AJAX("CDMAction", _obj);
                if (_obj.isSuccess) {
                    _private_JSON.EntityInstanceWrite = [];
                    _private_JSON.EntityInstanceRelationWrite = [];
                    $('#mp_save_bookmark').modal('hide');
                    $('#err-bookmrknam').hide();
                    $.notify("Bookmark Saved", {
                        position: "right top", className: "success"
                    });
                }
            }
        }
    } else {
        $('#err-bookmrknam').show();
    }
}

var BindPPBookmark = function () {
    var ppBookmark = ((GetQueryStrings()["_ppbookmrk"] == undefined || GetQueryStrings()["_ppbookmrk"] == null) ? 0 : GetQueryStrings()["_ppbookmrk"]);
    var ppbmid = ((GetQueryStrings()["_ppbmid"] == undefined || GetQueryStrings()["_ppbmid"] == null) ? 0 : GetQueryStrings()["_ppbmid"]);
    if (ppBookmark == 1 && ppbmid != 0) {
        var ppbmdetail = GetBookmarkdetail(ppbmid);
        if (ppbmdetail.length > 0) {
            UserBusinessUnit = ppbmdetail[0].BusinessUnitID;
            $('#slt-businessunit').val(UserBusinessUnit);
            $('#slt-businessunit').selectpicker('refresh');
            //$('#btn-search-buid').trigger('click');
            var _IsChangedCurrentBUID = GetSession('IsChangedBUID');
            var _StrPrevBUID = GetCookie("PrimaryBusinessUnit");
            var _PrevBUDI = null;
            if (_StrPrevBUID != undefined) {
                var ObjBusinessUnit = $.parseJSON(_StrPrevBUID);
                _PrevBUDI = ObjBusinessUnit["BusinessUnitID"];
            }

            var bookmrkdeptlst = ppbmdetail[0].App_DepartmentFilterID;
            bookmrkdeptlst = bookmrkdeptlst.split(',');
            var _CURBUID = $('#slt-businessunit').val();
            if (_CURBUID != _PrevBUDI) {
                var obj = {};
                obj.BusinessUnitID = $('#slt-businessunit').val();
                SetCookie('PrimaryBusinessUnit=' + JSON.stringify(obj));
                _UserBusinessDepartmentID = [];
                Removecookie('PrimaryDepartment');
                SetSession('IsChangedBUID', false);
                var strUserDepartment = localStorage.getItem("BusinessUnitDepartment");
                var lstUserDepartment = $.parseJSON(strUserDepartment);
                BindUserDepartment(lstUserDepartment);
                _UserBusinessDepartmentID = bookmrkdeptlst;
                BookmarkDepartment = bookmrkdeptlst;
                var deptlst = [];
                var _TempUserDepartment = [];
                $.each(BookmarkDepartment, function (index, item) {
                    deptlst.push(item);
                    var obj = {};
                    obj.DepartmentID = item;
                    _TempUserDepartment.push(obj);
                });
                $('#slt-department').val([]);
                $('#slt-department').val(deptlst);
                $('#slt-department').selectpicker('refresh');
                SetCookie('PrimaryDepartment=' + JSON.stringify(_TempUserDepartment));
                location.reload();
            }
            else {
                _UserBusinessDepartmentID = bookmrkdeptlst;
                BookmarkDepartment = bookmrkdeptlst;
                var deptlst = [];
                var _TempUserDepartment = [];
                $.each(BookmarkDepartment, function (index, item) {
                    deptlst.push(item);
                    var obj = {};
                    obj.DepartmentID = item;
                    _TempUserDepartment.push(obj);
                });
                $('#slt-department').val([]);
                $('#slt-department').val(deptlst);
                $('#slt-department').selectpicker('refresh');
                SetCookie('PrimaryDepartment=' + JSON.stringify(_TempUserDepartment));
                //location.reload();
            }
        }
    }
}

var GetBookmarkdetail = function (bookmarkid) {
    var _lstselect = [];
    var _objwhereClause = {};
    var _objJsonObject = {};
    _objJsonObject.viewName = "PP_BookmarkRead";
    _objJsonObject.entityID = 0;
    _objJsonObject.whereClause = BindBookmarkWhere(bookmarkid);
    _objJsonObject.orderBy = [];
    _objJsonObject.groupBy = [];
    _lstselect.push(_objJsonObject);
    var _obj = {
        "jsonString": _lstselect
    }
    var _tempList = {};
    $.when(Call_DefaultAJAX("CDMRead", _obj)).done(function (response) {
        _tempList = response
    });

    _tempList = ParseStringToObject(_tempList[0]['data'][0]);
    return _tempList;
}

var BindBookmarkWhere = function (bookmarkid) {
    var whereClause = [];
    _objsearchfilter = {};
    _objsearchfilter.prependOperator = null;
    _objsearchfilter.fieldName = "BookmarkID";
    _objsearchfilter.conditionalOperator = "=";
    _objsearchfilter.fieldValue = bookmarkid;
    _objsearchfilter.logicalOperator = null;
    _objsearchfilter.postpendOperator = null;
    whereClause.push(JSON.stringify(_objsearchfilter));

    return whereClause
}

//MarkAs Followups & Reviews
{
    $(document).on('click', '[data-markfollow]', function (e) {
        e.preventDefault();
        var $this = $(this);
        $loading.show();
        setTimeout(function () {
            var title = $this.attr('data-markfollow');
            var typeofmark = $this.attr('data-marktype');
            if (typeofmark == 1 || typeofmark == "1") {
                $('#btn-save-markas').attr('markason', 1);
                $('[data-popupnam-followrev="true"]').text('Mark As FollowUp');
            } else if (typeofmark == 2 || typeofmark == "2") {
                $('#btn-save-markas').attr('markason', 2);
                $('[data-popupnam-followrev="true"]').text('Mark As Review');
            }
            $('#txt-marktname').val((title == undefined || title == '') ? '' : title);
            //bind AssignedTo AssignedBy Date
            if (lstuserbinddd.length == 0)
                lstuserbinddd = GetUserList();
            BindUserDropDown($('#txt-markassgndby'), lstuserbinddd, true, 'Choose AssignedBy');
            $('#txt-markassgndby').val(userID);
            BindUserDropDown($('#txt-markassgndto'), lstuserbinddd, false, 'Choose AssignedTo');
            if (lstPriorMarkFR.length == 0)
                lstPriorMarkFR = GetPriorityFR();
            BindPrioritFR($('#txt-markprority'), lstPriorMarkFR);
            $('#txt-markdate').datepicker({
                'autoclose': true,
            });
            $('#txt-markdate').datepicker('setDate', 'today');
            $('#txt-markprority').val(26101).prop('selected', 'selected').change();
            $('.select2').select2();
            $('#err-mrktnam').hide();
            $('#err-mrkdate').hide();
            $('#err-mrkassby').hide();
            $('#err-mrkproty').hide();
            $('#mp_markas').modal('show');
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-save-markas', function (e) {
        e.preventDefault();
        var markastypeon = $(this).attr('markason');
        $loading.show();
        setTimeout(function () {
            if (markastypeon != undefined && markastypeon != '') {
                SaveMarkAs(markastypeon);
            }
            $loading.hide();
        }, 0);
    });

    var BindUserDropDown = function ($el, lst, defaulttype, DefaultItem) {
        var html = '';
        if (lst.length > 0) {
            var Distinctarryuser = GetDistinctArray(lst, 'UserID');
            Distinctarryuser = ObjSorter(Distinctarryuser, 'UserDisplayName', '123');
            if (defaulttype == false) {
                html += '<option value="0">' + DefaultItem + '</option>';
            }
            $.each(Distinctarryuser, function (index, item) {
                html += '<option value="' + item["UserID"] + '">' + item["UserDisplayName"] + '</option>';
            });
        }
        $el.html(html);
    }

    var BindPrioritFR = function ($el, lst) {
        var html = '';
        if (lst.length > 0) {
            var Distinctarryprior = GetDistinctArray(lst, 'KeyListID');
            Distinctarryprior = ObjSorter(Distinctarryprior, 'Value1', '123');
            $.each(Distinctarryprior, function (index, item) {
                html += '<option value="' + item["KeyListID"] + '">' + item["Value1"] + '</option>';
            });
        }
        $el.html(html);
    }

    var GetUserList = function () {
        var _lstselect = [];
        var _objJsonObject = {};
        // Read Tag Group        
        _objJsonObject.viewName = "UserDepartmentRead";
        _objJsonObject.entityID = 0;
        _objJsonObject.whereClause = [];
        _objJsonObject.orderBy = [];
        _objJsonObject.groupBy = [];
        _lstselect.push(_objJsonObject);
        var _obj = {
            "jsonString": _lstselect
        }
        var _tempList = {};
        $.when(Call_AJAX("CDMRead", _obj)).done(function (response) {
            _tempList = response
        });

        _tempList = ParseStringToObject(_tempList[0]['data'][0]);
        return _tempList;
    }

    var GetPriorityFR = function () {
        var _lstselect = [];
        var _objwhereClause = {};
        var _objJsonObject = {};
        // Read Tag Group        
        _objJsonObject.viewName = "MasterCDM";
        _objJsonObject.entityID = 0;
        _objwhereClause.KeyID = 26000;
        _objJsonObject.whereClause = JSON.stringify(_objwhereClause);
        _objJsonObject.orderBy = ["Value1"];
        _objJsonObject.groupBy = [];
        _lstselect.push(_objJsonObject);
        var _obj = {
            "jsonString": _lstselect
        }
        var _tempList = {};
        $.when(Call_DefaultAJAX("CDMSelect", _obj)).done(function (response) {
            _tempList = response
        });

        _tempList = ParseStringToObject(_tempList[0]['data'][0]);
        return _tempList;
    }

    var SaveMarkAs = function (typeon) {
        var markasTitle = $('#txt-marktname').val();
        var markasAssngTo = $('#txt-markassgndto').val();
        var markasAssngBy = $('#txt-markassgndby').val();
        var markasDate = $('#txt-markdate').val();
        var markaspriority = $('#txt-markprority').val();
        var markastype = typeon;
        if (IsValidMarkAs(markasTitle, markasAssngTo, markasAssngBy, markasDate, markaspriority, markastype)) {
            var lstfollowrev = [];
            var _objfollowrev = {};
            _objfollowrev.Task = markasTitle;
            _objfollowrev.Type = markastype;
            _objfollowrev.AssignedTo = (markasAssngTo == 0 || markasAssngTo == undefined) ? 0 : markasAssngTo;
            _objfollowrev.AssignedBy = markasAssngBy;
            _objfollowrev.Department = _CurrentUserDepartment;
            _objfollowrev.FollowOn = markasDate;
            _objfollowrev.BusinessUnitID = UserBusinessUnit;
            _objfollowrev.Priority = markaspriority;
            lstfollowrev.push(JSON.stringify(_objfollowrev));
            var _obj = {
                "StrjsonObject": lstfollowrev,
                "SPName": "SP_PP_MarkAsFollowReview"
            }
            var _tempList = {};
            $.when(Call_DefaultAJAX("CDM_SP_Action", _obj)).done(function (response) {
                $('#mp_markas').modal('hide');
                if (markastype == 1)
                    $.notify("Mark as FollowUp Saved Successfully", {
                        position: "right top", className: "success"
                    });
                else if (markastype == 2)
                    $.notify("Mark as Review Saved Successfully", {
                        position: "right top", className: "success"
                    });
            });
        }
    }

    var IsValidMarkAs = function (markasTitle, markasAssngTo, markasAssngBy, markasDate, markaspriority, markastype) {
        var isvalid = false;
        if (markasTitle == null || markasTitle == '') {
            $('#err-mrktnam').show();
            isvalid = false;
        } else {
            $('#err-mrktnam').hide();
            isvalid = true;
        }
        if (markasAssngBy == '0') {
            $('#err-mrkassby').show();
            isvalid = false;
        } else {
            $('#err-mrkassby').hide();
            isvalid = true;
        }
        if (markasDate == null || markasDate == '') {
            $('#err-mrkdate').show();
            isvalid = false;
        } else {
            $('#err-mrkdate').hide();
            isvalid = true;
        }
        if (markaspriority == '0') {
            $('#err-mrkproty').show();
            isvalid = false;
        } else {
            $('#err-mrkproty').hide();
            isvalid = true;
        }
        if (markastype == 0 || markastype == undefined) {
            isvalid = false;
        } else {
            isvalid = true;
        }
        if (markasTitle == null || markasTitle == '' || markasAssngBy == '0' || markasDate == null || markasDate == '' || markaspriority == '0' || markastype == 0 || markastype == undefined) {
            isvalid = false;
        } else {
            $('#err-mrktnam').hide();
            $('#err-mrkdate').hide();
            $('#err-mrkassby').hide();
            $('#err-mrkproty').hide();
            isvalid = true;
        }
        return isvalid;
    }
}

//Tag Item
{
    $(document).on('click', '[data-tagme]', function (e) {
        e.preventDefault();
        var $this = $(this);
        $loading.show();
        setTimeout(function () {
            var tagentity = $this.attr('data-tagentity');
            var tagentityinstance = $this.attr('data-tagentityinstance');
            if (tagentity != undefined && tagentity != '' && tagentityinstance != undefined && tagentityinstance != '') {
                $('#btn-tagdata').attr('data-entitytag', tagentity);
                $('#btn-tagdata').attr('data-entityinstancetag', tagentityinstance);
                //BindTagDropdown
                //var lsttags = Gettagitems();
                // BindTagFilter($('#slt_tags'), lsttags);
                //$('#slt_tags').select2();
                //$("#slt_tags").select2({
                // tags: true
                //});
                //BindRecentTag's
                var lstrecenttags = Getrecnttag(tagentity, tagentityinstance);
                BindTagdiv(lstrecenttags);
                //BindRecenttags($('#recent-tags'), lstrecenttags);
                $('#mp_tagpp').modal('show');
            }
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn-tagdata', function (e) {
        e.preventDefault();
        var $this = $(this);
        $loading.show();
        setTimeout(function () {
            var tagentity = $this.attr('data-entitytag');
            var taginstanceentity = $this.attr('data-entityinstancetag');
            if (tagentity != undefined && tagentity != '' && taginstanceentity != undefined && taginstanceentity != '')
                SaveTag(tagentity, taginstanceentity);
            $loading.hide();
        }, 0);
    });

    //$(document).on('change', '#slt_tags', function () {
    //    var savtaglst = $('#slt_tags').val();
    //    if (savtaglst.length > 0) {
    //        $('#err-tagsel').hide();
    //    } else {
    //        $('#err-tagsel').show();
    //    }
    //});

    $(document).on('click', '[data-selectalltag="true"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('[data-agroupby="true"]').find('[data-tagsin="true"] li').addClass('active');
    });

    $(document).on('click', '[data-dselectalltag="true"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('[data-agroupby="true"]').find('[data-tagsin="true"] li').removeClass('active');
    });

    var BindTagFilter = function ($el, lst) {
        var html = '';
        if (lst.length > 0) {
            var templsttag = GetDistinctArray(lst, 'TagID');
            $.each(templsttag, function (index, item) {
                html += '<option value="' + item["TagName"] + '" data-tagid="' + item["TagID"] + '">' + item["TagName"] + '</option>';
            });
        }
        $el.html(html);
    }

    var BindRecenttags = function ($el, lst) {
        var html = '';
        if (lst.length > 0) {
            var templstrtag = GetDistinctArray(lst, 'TagID');
            $.each(templstrtag, function (index, item) {
                html += '<li><a href="#" data-valtag="' + item["TagID"] + '" title="' + item["TagName"] + '">' + item["TagName"] + '</a></li>';
            });
        }
        $el.html(html);
    }

    var SaveTag = function (tagentity, taginstanceentity) {
        var issuccess = false;
        var savtaglst = $('li[data-typeexst="new"].active').length
        if (savtaglst > 0) {
            var lsttagsave = [];
            var _objtags = {};
            $('li[data-typeexst="new"].active').each(function (index, item) {
                _objtags = {};
                _objtags.TagID = $(this).attr('data-tagid');
                _objtags.TagName = $(this).attr('data-tagname');
                _objtags.EntityID = tagentity;
                _objtags.EntityInstanceID = taginstanceentity;
                _objtags.CreatedBy = parseInt(userID);
                _objtags.CreatedOn = new Date();
                _objtags.DepartmentID = parseInt(_CurrentUserDepartment);
                _objtags.BusinessUnitID = parseInt(UserBusinessUnit);
                _objtags.Type = 1;
                _objtags.TagItemID = 0;
                lsttagsave.push(JSON.stringify(_objtags));
                issuccess = SavenewTags(lsttagsave);
            });
        }
        var removelst = $('li[data-typeexst="exist"]').length
        if (removelst > 0) {
            var lsttagremv = [];
            var _objtags = {};
            $('li[data-typeexst="exist"]').each(function (index, item) {
                if (!$(this).hasClass('active')) {
                    _objtags = {};
                    _objtags.TagID = $(this).attr('data-tagid');
                    _objtags.TagName = $(this).attr('data-tagname');
                    _objtags.EntityID = tagentity;
                    _objtags.EntityInstanceID = taginstanceentity;
                    _objtags.CreatedBy = parseInt(userID);
                    _objtags.CreatedOn = new Date();
                    _objtags.DepartmentID = parseInt(_CurrentUserDepartment);
                    _objtags.BusinessUnitID = parseInt(UserBusinessUnit);
                    _objtags.Type = 2;
                    _objtags.TagItemID = $(this).attr('data-tagitemid');
                    lsttagremv.push(JSON.stringify(_objtags));
                    issuccess = SavenewTags(lsttagremv);
                }
            });
        }
        if (issuccess == true) {
            $.notify("Tagging Completed Successfully", {
                position: "right top", className: "success"
            });
            ReloadSavedTags();
        }
        $('#mp_tagpp').modal('hide');
    }

    var SavenewTags = function (lsttagsave) {
        var issuccess = false;
        var _obj = {
            "StrjsonObject": lsttagsave,
            "SPName": "SaveTagItem"
        }
        var _tempList = {};
        $.when(Call_DefaultAJAX("CDM_SP_Action", _obj)).done(function (response) {
            issuccess = true;
        });
        return issuccess;
    }

    var Getrecnttag = function (EntID, EntInstanceID) {
        var departmentstring = _UserBusinessDepartmentID.join(",");
        var _obj = {
            "StrjsonObject": JSON.stringify({ 'EntityID': parseInt(EntID), 'EntityInstanceID': parseInt(EntInstanceID), 'CDM_Department': departmentstring, 'BusinessUnitID': UserBusinessUnit, 'ParentEntityID': parseInt(EntID) }),
            "SPName": "RecentTagItem"
        }
        var _tempList = {};
        $.when(Call_DefaultAJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
            _tempList = (response == "" ? [] : $.parseJSON(response));
        });
        return _tempList;
    }

    var Gettagitems = function () {
        var _lstselect = [];
        var _objJsonObject = {};
        // Read Tag Group        
        _objJsonObject.viewName = "Tbl_Tag";
        _objJsonObject.entityID = 0;
        _objJsonObject.whereClause = [];
        _objJsonObject.orderBy = [];
        _objJsonObject.groupBy = [];
        _lstselect.push(_objJsonObject);
        var _obj = {
            "jsonString": _lstselect
        }
        var _tempList = {};
        $.when(Call_DefaultAJAX("CDMRead", _obj)).done(function (response) {
            _tempList = response
        });

        _tempList = ParseStringToObject(_tempList[0]['data'][0]);
        return _tempList;
    }
}

//Bind Tags
var BindTagdiv = function (lst) {
    var html = '';
    if (lst != undefined) {
        var lsttags = lst.Tags;
        var tempactivetags = lst.EntityTags;
        if (lsttags != undefined && lsttags.length > 0) {
            var tempgroupby = GetDistinctArray(lsttags, 'TagGroupID');
            $.each(tempgroupby, function (index, item) {
                var temptagscount = lsttags;
                var tempactivecount = tempactivetags;
                temptagscount = temptagscount.filter(x=>x["TagGroupID"] == item["TagGroupID"]);
                if (temptagscount.length > 0) {
                    temptagscount = GetDistinctArray(temptagscount, 'TagID');
                    if (tempactivecount != undefined && tempactivecount.length > 0) {
                        tempactivecount = tempactivecount.filter(x=>x["TagGroupID"] == item["TagGroupID"]);
                        tempactivecount = GetDistinctArray(tempactivecount, 'TagID');
                    }
                }
                html += '<div class="isc-tag-par-con-s1" data-agroupby="true" >';
                html += '<div class="screen-row">';
                html += '<div class="isc-tag-par-hdr-con-s1">';
                html += '<div class="div-col-50per" data-toggle="collapse" href="#tag_hdr_' + index + '">';
                html += '<h2>' + item["GroupName"] + ':<span>' + ((tempactivecount == undefined || tempactivecount == null || tempactivecount == 0) ? "0" : tempactivecount.length) + '</span>';
                html += '<span class="isc-tag-hdr-kpi-lbl-clr">/' + ((temptagscount == undefined || temptagscount == null || temptagscount == 0) ? '0' : temptagscount.length) + '</span></h2>';
                html += '</div>';
                html += '<div class="div-col-50per">';
                html += '<ul class="isc-tag-grp-sel-desel-s1 cell-right">';
                html += '<li><a href="#" id="sel-tag1" data-selectalltag="true" data-toggle="tab">Select All</a></li>';
                html += '<li><a href="#" id="desel-tag1" data-dselectalltag="true" data-toggle="tab">Deselect All</a></li>';
                html += '</ul>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="isc-tag-par-bdy-con-s1 collapse in" id="tag_hdr_' + index + '">';
                html += '<ul class="isc-tag-grp-list-s1 isc-grp-tag" data-tagsin="true">';
                var templsttags = lsttags;
                templsttags = templsttags.filter(x=>x["TagGroupID"] == item["TagGroupID"]);
                if (templsttags.length > 0) {
                    templsttags = GetDistinctArray(templsttags, 'TagID');
                    $.each(templsttags, function (a, b) {
                        if (tempactivetags != undefined && tempactivetags.length > 0) {
                            var tempactivetagsb = tempactivetags.filter(x=>x["TagID"] == b["TagID"]);
                            if (tempactivetagsb.length > 0)
                                html += '<li class="active" data-tagitemid="' + tempactivetagsb[0]["TagItemID"] + '" data-tagname="' + b["TagName"] + '" data-tagid="' + b["TagID"] + '" data-typeexst="exist"><a href="#" title="' + b["TagName"] + '" data-select="multiple">' + b["TagName"] + '</a></li>';
                            else
                                html += '<li class="" data-tagid="' + b["TagID"] + '" data-tagname="' + b["TagName"] + '" data-typeexst="new"><a href="#" title="' + b["TagName"] + '" data-select="multiple">' + b["TagName"] + '</a></li>';
                        } else {
                            html += '<li class="" data-tagid="' + b["TagID"] + '" data-tagname="' + b["TagName"] + '" data-typeexst="new"><a href="#" title="City" data-select="multiple">' + b["TagName"] + '</a></li>';
                        }
                    });
                }
                html += '</ul>';
                html += '</div>';
                html += '</div>';
            });
        }
        else {
            html += '<h1 class="no-data-found">No Data Found</h1>';
        }
    } else {
        html += '<h1 class="no-data-found">No Data Found</h1>';
    }
    $('#slt_tags').html(html);
}


//Menu Binding
//DOM
{
    var BindMenusBasedOnRole = function () {

        var rollId = 0;
        roleId = GetRoleID();
        switch (roleId) {
            case 50000:
                $('#user-Home').show();
                $('#bills-Invoice-Menu').show();
            break;
            case 50001:
                $('#approver-Home').show();
                $('#approver-Menu').show();
            break;
            case 5003:
                $('#financeManager-Home').show();
                $('#payment-Menu').show();
            break;

        }

    }
}
//DATA
{
    var GetRoleID = function () {
        var tempList = {};
        $.when(RequestServer("Login.aspx/GetRoleId", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}