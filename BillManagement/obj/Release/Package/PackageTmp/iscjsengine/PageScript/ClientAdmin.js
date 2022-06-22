//Constant
{
    var lstadminuser = [];
    var lstfilteradmin = [];
    var lstcurrntlst = [];
    var lstemployeeuser = [];
    var lstUserNames = [];
    var lstdetailtemp = [];
    var editUserID = 0;
}

//Load
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
       
       var lstadminuserData = GetAdminList();
       lstadminuser = lstadminuserData["ClientAdminDetails"];
       lstUserNames = lstadminuserData["UserNames"];
            lstfilteradmin = lstadminuser;
            //lstemployeeuser = GetEmployeeList();
            BindPage();
            $('#cAdmin-Menue').addClass('active');
            $loading.hide();
        }, 0);
    });
}

//Events
{
    $(document).on('click', '#btn_search', function () {
        $loading.show();
        setTimeout(function () {
            SearchBind();
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn_reset', function () {
        $loading.show();
        setTimeout(function () {
            $('#flt_Employee').val(99).select2();
            $('#flt_Companyname').val(99).select2();
            $('#flt_Status').val(99).select2();
            $('#flt_LEmployee').val(99).select2();
            $('#flt_Emailid').val(99).select2();
            $('#flt_Activationkey').val(99).select2();
            lstadminuser = ObjSorter(lstadminuser, 'ClientName', '123');
            var lsttemp = lstadminuser;
            lstfilteradmin = lstadminuser;
            BindAdminEmp(lsttemp);
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '[data-empdetailshow]', function (e) {
        var empdetailshow = $(this).attr('data-empdetailshow');
        var adminlstemp = [];
        var lstusertaskdetail = [];
        $loading.show();
        setTimeout(function () {
            if (empdetailshow != undefined && empdetailshow != null && empdetailshow != '') {
                var lstdetailtemp = lstadminuser.filter(x=>x["ApplicationUserID"] == empdetailshow);
                if (lstdetailtemp != undefined && lstdetailtemp != null && lstdetailtemp.length > 0) {
                    lstusertaskdetail = GetUserTaskDetail(empdetailshow);
                    adminlstemp = lstadminuser.filter(x=>x["ApplicationUserID"] == lstdetailtemp[0]["ApproverID"]);
                    var startDay = 1;
                    var endDay = 7;
                    var getday = 0;
                    startDay = ((lstdetailtemp[0]["WeekStartDayNo"] == undefined || lstdetailtemp[0]["WeekStartDayNo"] == null || lstdetailtemp[0]["WeekStartDayNo"] == 0) ? 1 : lstdetailtemp[0]["WeekStartDayNo"]);
                    endDay = ((lstdetailtemp[0]["WeekEndDayNo"] == undefined || lstdetailtemp[0]["WeekEndDayNo"] == null || lstdetailtemp[0]["WeekEndDayNo"] == 0) ? 7 : ((lstdetailtemp[0]["WeekEndDayNo"] != 7) ? (((lstdetailtemp[0]["WeekEndDayNo"] + 7) > 8) ? lstdetailtemp[0]["WeekEndDayNo"] : (ApplicationUser["WeekEndDayNo"] + 7)) : lstdetailtemp[0]["WeekEndDayNo"]));
                    var endsetday = 0;
                    if (endDay < startDay) {
                        for (var e = startDay; e <= 7; e++) {
                            endsetday += 1;
                        }
                        endsetday = endsetday + 1;
                    } else {
                        endsetday = endDay;
                    }
                    getday = 0;
                    for (var i = startDay; i <= endsetday ; i++) {
                        getday += 1;
                    }
                    if (lstdetailtemp[0]["EntryType"] == 50121) {
                        var entryhrcal = ((lstdetailtemp[0]["EntryHours"] == undefined || lstdetailtemp[0]["EntryHours"] == null) ? 0 : lstdetailtemp[0]["EntryHours"]);
                        //if (entryhrcal != undefined && entryhrcal != null && entryhrcal > 0) {
                        //    entryhrcal = parseInt(parseInt(entryhrcal) / getday)
                        //}
                        $('#txt_UserRegularhr').val(((entryhrcal == undefined || entryhrcal == null) ? 0 : entryhrcal));
                    } else {
                        $('#txt_UserRegularhr').val(((lstdetailtemp[0]["EntryHours"] == undefined || lstdetailtemp[0]["EntryHours"] == null) ? 0 : parseInt(lstdetailtemp[0]["EntryHours"])));
                    }
                    $('#txt_ApproverEmail').val(((adminlstemp != undefined && adminlstemp != null && adminlstemp.length > 0) ? ((adminlstemp[0]["PrimaryEmailID"] == undefined || adminlstemp[0]["PrimaryEmailID"] == null || adminlstemp[0]["PrimaryEmailID"] == '') ? '' : adminlstemp[0]["PrimaryEmailID"]) : ''));
                    $('#txt_ApproverName').val(((lstdetailtemp[0]["ApproverName"] == undefined || lstdetailtemp[0]["ApproverName"] == null || lstdetailtemp[0]["ApproverName"] == '') ? '' : lstdetailtemp[0]["ApproverName"]));
                    $('#txt_UserStatus').val(((lstdetailtemp[0]["IsActive"] == 1 || lstdetailtemp[0]["IsActive"] == "True" || lstdetailtemp[0]["IsActive"] == 'true') ? 'Active' : 'InActive'));
                    $('#txt_UserEndDay').val(((lstdetailtemp[0]["WeekEndDayNo"] == undefined || lstdetailtemp[0]["WeekEndDayNo"] == null || lstdetailtemp[0]["WeekEndDayNo"] == 0) ? '' : (moment().startOf('week').add(endDay, 'days').format('dddd'))));
                    $('#txt_UserStartDay').val(((lstdetailtemp[0]["WeekStartDayNo"] == undefined || lstdetailtemp[0]["WeekStartDayNo"] == null || lstdetailtemp[0]["WeekStartDayNo"] == 0) ? '' : (moment().startOf('week').add(startDay, 'days').format('dddd'))));
                    $('#txt_UserTimeEntry').val(((lstdetailtemp[0]["EntryType"] == 50120) ? 'Daily' : ((lstdetailtemp[0]["EntryType"] == 50121) ? 'Weekly' : '')));
                    $('#txt_UserDepartment').val(((lstdetailtemp[0]["DepartmentName"] == undefined || lstdetailtemp[0]["DepartmentName"] == null || lstdetailtemp[0]["DepartmentName"] == '') ? '' : lstdetailtemp[0]["DepartmentName"]));
                    $('#txt_ApplicationEmailID').val(((lstdetailtemp[0]["PrimaryEmailID"] == undefined || lstdetailtemp[0]["PrimaryEmailID"] == null || lstdetailtemp[0]["PrimaryEmailID"] == '') ? '' : lstdetailtemp[0]["PrimaryEmailID"]));
                    $('#txt_Designation').val(((lstdetailtemp[0]["RoleName"] == undefined || lstdetailtemp[0]["RoleName"] == null || lstdetailtemp[0]["RoleName"] == '') ? '' : lstdetailtemp[0]["RoleName"]));
                    $('#txt_FName').val(((lstdetailtemp[0]["Firstname"] == undefined || lstdetailtemp[0]["Firstname"] == null || lstdetailtemp[0]["Firstname"] == '') ? '' : lstdetailtemp[0]["Firstname"]));
                    $('#txt_LName').val(((lstdetailtemp[0]["Lastname"] == undefined || lstdetailtemp[0]["Lastname"] == null || lstdetailtemp[0]["Lastname"] == '') ? '' : lstdetailtemp[0]["Lastname"]));
                    $('#txt_ApplicationID').val(((lstdetailtemp[0]["ApplicationUserID"] == undefined || lstdetailtemp[0]["ApplicationUserID"] == null || lstdetailtemp[0]["ApplicationUserID"] == '') ? '' : lstdetailtemp[0]["ApplicationUserID"]));
                    var payratehtml = '';
                    var leavehtml = '';
                    if (lstusertaskdetail != undefined && lstusertaskdetail != null && lstusertaskdetail.length > 0) {
                        lstusertaskdetail = GetDistinctArray(lstusertaskdetail, 'TaskID');
                        var temppayrate = lstusertaskdetail.filter(x=>(x["IsLeaveType"] != "True" && x["IsLeaveType"] != "true" && x["IsLeaveType"] != 1));
                        var templeavetask = lstusertaskdetail.filter(x=>(x["IsLeaveType"] == 1 || x["IsLeaveType"] == "True" || x["IsLeaveType"] == "true"));
                        if (temppayrate != undefined && temppayrate != null && temppayrate.length > 0) {
                            $.each(temppayrate, function (index, item) {
                                payratehtml += '<tr>';
                                payratehtml += '<td>';
                                payratehtml += '<h5>' + ((item["payrate"] == undefined || item["payrate"] == null) ? '-' : item["payrate"]) + '</h5>';
                                payratehtml += '</td>';
                                payratehtml += '<td>';
                                payratehtml += '<h5>' + ((item["TaskName"] == undefined || item["TaskName"] == null) ? '-' : item["TaskName"]) + '</h5>';
                                payratehtml += '</td>';
                                payratehtml += '</tr>';
                            })
                        }
                        if (templeavetask != undefined && templeavetask != null && templeavetask.length > 0) {
                            $.each(templeavetask, function (index, item) {
                                leavehtml += '<tr>';
                                leavehtml += '<td>';
                                leavehtml += '<h5>' + (((((item["payrate"] == undefined || item["payrate"] == null) ? '' : item["payrate"]) + (((item["payrate"] == undefined || item["payrate"] == null || item["Value1"] == undefined || item["Value1"] == null || item["Value1"] == '') ? '' : '-')) + ((item["Value1"] == undefined || item["Value1"] == null || item["Value1"] == '') ? '' : item["Value1"][0])) != '') ? (((item["payrate"] == undefined || item["payrate"] == null) ? '' : item["payrate"]) + (((item["payrate"] == undefined || item["payrate"] == null || item["Value1"] == undefined || item["Value1"] == null || item["Value1"] == '') ? '' : '-')) + ((item["Value1"] == undefined || item["Value1"] == null || item["Value1"] == '') ? '' : item["Value1"][0])) : '') + '</h5>';
                                leavehtml += '</td>';
                                leavehtml += '<td>';
                                leavehtml += '<h5>' + ((item["TaskName"] == undefined || item["TaskName"] == null) ? '-' : item["TaskName"]) + '</h5>';
                                leavehtml += '</td>';
                                leavehtml += '</tr>';
                            })
                        }
                    }
                    $('#tbl_Leavecode').find('tbody').html(leavehtml);
                    $('#tbl_Payrate').find('tbody').html(payratehtml);
                }
            }
            $('#mp_add-website1').modal('show');
            $loading.hide();
        }, 0);
    });

    $(document).on('click', '#btn_createadmin', function () {
        //$loading.show();
        //setTimeout(function () {
            SaveClientAdmin();
        //    $loading.hide();
        //}, 0);
    });

    $(document).on('click', '[data-edit]', function () {
        var adminid = $(this).attr('data-edit');
        editUserID = parseInt($(this).attr('data-edit'));
        var Clientadminid = $(this).attr('data-editadmin');
        ResetSave();
        if (Clientadminid != undefined && Clientadminid != null && Clientadminid != '' && Clientadminid != 0 && adminid != undefined && adminid != null && adminid != '' && adminid != 0) {
            $('#btn_editadmin').attr('data-editid', adminid);
            $('#btn_editadmin').attr('data-editadminid', Clientadminid);
            lstdetailtemp = lstadminuser.filter(x=>x["AccountID"] == Clientadminid);
            if (lstdetailtemp != undefined && lstdetailtemp != null && lstdetailtemp.length > 0) {
                $('#txt_efirstname').val(((lstdetailtemp[0]["FirstName"] == undefined || lstdetailtemp[0]["FirstName"] == null) ? '' : lstdetailtemp[0]["FirstName"]));
                $('#txt_elastname').val(((lstdetailtemp[0]["LastName"] == undefined || lstdetailtemp[0]["LastName"] == null) ? '' : lstdetailtemp[0]["LastName"]));
                $('#txt_ecompanyname').val(((lstdetailtemp[0]["ClientName"] == undefined || lstdetailtemp[0]["ClientName"] == null) ? '' : lstdetailtemp[0]["ClientName"]));
                $('#txt_eemailid').val(((lstdetailtemp[0]["PrimaryEmailID"] == undefined || lstdetailtemp[0]["PrimaryEmailID"] == null) ? '' : lstdetailtemp[0]["PrimaryEmailID"]));
                $('#txt_creaton').val(((lstdetailtemp[0]["CreatedOn"] == undefined || lstdetailtemp[0]["CreatedOn"] == null) ? '' : moment(lstdetailtemp[0]["CreatedOn"]).format('MM/DD/YYYY')));
                $('#txt_creatby').val(((lstdetailtemp[0]["CreatedByName"] == undefined || lstdetailtemp[0]["CreatedByName"] == null) ? '' : lstdetailtemp[0]["CreatedByName"]));
                $('#txt_activateky').val(((lstdetailtemp[0]["ActivationKey"] == undefined || lstdetailtemp[0]["ActivationKey"] == null) ? '' : lstdetailtemp[0]["ActivationKey"]));
            }
            $('#mp_edit-website').modal('show');
        }
    });

    $(document).on('click', '#btn_editadmin', function () {
        var adminid = $(this).attr('data-editid');
        var Clientadminid = $(this).attr('data-editadminid');
        //$loading.show();
        //setTimeout(function () {
            if (Clientadminid != undefined && Clientadminid != null && Clientadminid != '' && Clientadminid != 0 && adminid != undefined && adminid != null && adminid != '' && adminid != 0) {
                UpdateClientAdmin(adminid, Clientadminid);
            }
        //    $loading.hide();
        //}, 0);
    });

    $(document).on('click', '[data-delete]', function () {
        var admindisableid = $(this).attr('data-delete');
        var adminemail = $(this).attr('data-deemail');
        var adminname = $(this).attr('data-dename');
        if (admindisableid != undefined && admindisableid != null && admindisableid != 0 && admindisableid != '') {
            $('#btn_deleteadmin').attr('data-delete', admindisableid);
            $('#btn_deleteadmin').attr('data-deemail', ((adminemail != undefined && adminemail != null && adminemail != '') ? adminemail : ''));
            $('#btn_deleteadmin').attr('data-dename', adminname);
            $('[data-deleteclientnam="true"]').html(adminname);
            $('#mp_delete-website1').modal('show');
        }
    });

    $(document).on('click', '#btn_deleteadmin', function () {
        var admindisableid = $(this).attr('data-delete');
        var adminemail = $(this).attr('data-deemail');
        var adminname = $(this).attr('data-dename');
        //$loading.show();
        //setTimeout(function () {
            if (admindisableid != undefined && admindisableid != null && admindisableid != 0 && admindisableid != '') {
                DeleteAdmin(admindisableid, 2);
            }
        //    $loading.hide();
        //}, 0);
    });

    $(document).on('click', '[data-deactivate]', function () {
        var admindisableid = $(this).attr('data-deactivate');
        var adminemail = $(this).attr('data-deemail');
        var adminname = $(this).attr('data-dename');
        if (admindisableid != undefined && admindisableid != null && admindisableid != 0 && admindisableid != '') {
            $('#btn_deactivadmin').attr('data-deactivate', admindisableid);
            $('#btn_deactivadmin').attr('data-deemail', ((adminemail != undefined && adminemail != null && adminemail != '') ? adminemail : ''));
            $('#btn_deactivadmin').attr('data-dename', adminname);
            $('[data-deactivatclientnam="true"]').html(adminname);
            $('#mp_delete-website').modal('show');
        }
    });

    $(document).on('click', '#btn_deactivadmin', function () {
        var admindisableid = $(this).attr('data-deactivate');
       
            if (admindisableid != undefined && admindisableid != null && admindisableid != 0 && admindisableid != '') {
                DeleteAdmin(admindisableid, 2);
            }
            
    });

    $(document).on('click', '[data-adminactivate]', function () {
        var admindisableid = $(this).attr('data-adminactivate');
        var adminemail = $(this).attr('data-deemail');
        var adminname = $(this).attr('data-dename');
        var adminUnameID = $(this).attr('data-deUnameID');
        var adminPasscword = $(this).attr('data-depasscode');
        if (admindisableid != undefined && admindisableid != null && admindisableid != 0 && admindisableid != '') {
            $('#btn_activadmin').attr('data-activate', admindisableid);
            $('#btn_activadmin').attr('data-eemail', ((adminemail != undefined && adminemail != null && adminemail != '') ? adminemail : ''));
            $('#btn_activadmin').attr('data-ename', adminname);
            $('#btn_activadmin').attr('data-eUnameID', adminUnameID);
            $('#btn_activadmin').attr('data-epasscode', adminPasscword);
            $('[data-activatclientnam="true"]').html(adminname);
            $('#mp_delete-website2').modal('show');
        }
    });

    $(document).on('click', '#btn_activadmin', function () {
        var adminactivid = $(this).attr('data-activate');
            if (adminactivid != undefined && adminactivid != null && adminactivid != 0 && adminactivid != '') {
                DeleteAdmin(adminactivid, 1);
            }
    });

    $(document).on('change', '[data-chckaemp]', function () {
        //$loading.show();
        //setTimeout(function () {
            if ($('input:checkbox[data-chckaemp]:checked').length > 0) {
                if ($('itxt_oldPasscodenput:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length > 0 && $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length > 0) {
                    $('#btn_active_admin').hide();
                    $('#btn_deactive_admin').hide();
                    $.notify("Please select either Active or Disabled users!", { position: "right top", className: "error" });
                 //   $('[data-showerr="true"]').show();
                } else if ($('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length > 0 && $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length == 0 && $('input:checkbox[data-chckaemp]:checked').length == $('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length) {
                    $('#btn_active_admin').show();
                    $('#btn_deactive_admin').hide();
                    $('[data-showerr="true"]').hide();
                } else if ($('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length == 0 && $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length > 0 && $('input:checkbox[data-chckaemp]:checked').length == $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length) {
                    $('#btn_deactive_admin').show();
                    $('#btn_active_admin').hide();
                    $('[data-showerr="true"]').hide();
                } else {
                    $('#btn_active_admin').hide();
                    $('#btn_deactive_admin').hide();
                    $.notify("Please select either Active or Disabled users!", { position: "right top", className: "error" });
                }

            } else {
                $('#btn_active_admin').hide();
                $('#btn_deactive_admin').hide();
                $('[data-showerr="true"]').hide();
            }

            if ($('[data-chckaemp]:checked').length == $('[data-chckaemp]').length) {
                $('#chck_allemployee').prop('checked', true).uniform();
            } else {
                $('#chck_allemployee').prop('checked', false).uniform();
            }
        //    $loading.hide();
        //}, 0);
    });

    $(document).on('change', '#chck_allemployee', function () {
        if ($(this).prop('checked')) {
            $('[data-chckaemp]').prop('checked', true).uniform();
            if ($('#tbl_adminUser tbody [data-chckaemp]:checked').length == 0) {
                $('#chck_allemployee').prop('checked', false).uniform();
            }
        } else {
            $('[data-chckaemp]').prop('checked', false).uniform();
        }
        if ($('input:checkbox[data-chckaemp]:checked').length > 0) {
            if ($('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length > 0 && $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length > 0) {
                $('#btn_active_admin').hide();
                $('#btn_deactive_admin').hide();
                $.notify("Please select either Active or Disabled users!", { position: "right top", className: "error" });
            } else if ($('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length > 0 && $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length == 0 && $('input:checkbox[data-chckaemp]:checked').length == $('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length) {
                $('#btn_active_admin').show();
                $('#btn_deactive_admin').hide();
                $('[data-showerr="true"]').hide();
            } else if ($('input:checkbox[data-chckaemp][data-activeuseradmin="true"]:checked').length == 0 && $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length > 0 && $('input:checkbox[data-chckaemp]:checked').length == $('input:checkbox[data-chckaemp][data-deactiveuseradmin="true"]:checked').length) {
                $('#btn_deactive_admin').show();
                $('#btn_active_admin').hide();
                $('[data-showerr="true"]').hide();
            } else {
                $('#btn_active_admin').hide();
                $('#btn_deactive_admin').hide();
                $.notify("Please select either Active or Disabled users!", { position: "right top", className: "error" });
            }

        } else {
            $('#btn_active_admin').hide();
            $('#btn_deactive_admin').hide();
            $('[data-showerr="true"]').hide();
        }
    });

    $(document).on('click', '#btn_active_admin', function () {
        //$loading.show();
        //setTimeout(function () {
            if ($('input:checkbox[data-chckaemp]:checked').length > 0) {
                MultiAdminStateChange(1);
                $('#btn_active_admin').hide();
                $('#btn_deactive_admin').hide();
                $('[data-showerr="true"]').hide();
            }
        //    $loading.hide();
        //}, 0);
    });

    $(document).on('click', '#btn_deactive_admin', function () {
    
            if ($('input:checkbox[data-chckaemp]:checked').length > 0) {
                MultiAdminStateChange(2);
                $('#btn_active_admin').hide();
                $('#btn_deactive_admin').hide();
                $('[data-showerr="true"]').hide();
            }
           
    });

    $(document).on('click', '#btn_create_pop', function () {
        ResetSave();
        $('#mp_add-website').modal('show');
    });

    //$('[data-field]').bind('keydown blur', function (e) {
    //    var $this = $(this);
    //    var value = $this.val();
    //    var field = $this.attr('data-field');
    //    var eventInstance = e || window.event;
    //    var key = eventInstance.keyCode || eventInstance.which;
    //    if (eventInstance.ctrlKey != true) {
    //        if ((key < 65 || key > 90) && key != 16 && key != 8 && key != 46 && key != 32) {
    //            e.preventDefault();
    //        }
    //    }
    //});
}

//DOM Manipulation
{
    var BindPage = function () {
        $('#menu-List li').hide();
        $('#menu-List li[child-menu=10]').show();
        if (lstadminuser != undefined && lstadminuser != null && lstadminuser.length > 0) {

            lstadminuser = ObjSorter(lstadminuser, 'ClientName', '123');
            BindFilter(lstadminuser);
            lstadminuser = ObjSorter(lstadminuser, 'ClientName', '123');
            BindAdminEmp(lstadminuser);
            $('#chck_allemployee').prop('checked', false).uniform();
        }
    }

    var BindFilter = function () {
        //Filters
        {
            var emphtml = '<option value="99">Choose First Name</option>';
            var templstt = ObjSorter(lstadminuser, 'FirstName', '123');
            $.each(templstt, function (index, item) {
                emphtml += '<option value="' + ((item["AccountID"] == undefined || item["AccountID"] == null) ? 0 : item["AccountID"]) + '">' + ((item["FirstName"] == undefined || item["FirstName"] == null || item["FirstName"] == '') ? '-' : item["FirstName"]) + '</option>';
            });
            $('#flt_Employee').html(emphtml).select2();

            var emplhtml = '<option value="99">Choose Last Name</option>';
            var templstt = ObjSorter(lstadminuser.filter(x=>(x["LastName"] != '' && x["LastName"] != null)), 'LastName', '123');
            $.each(templstt, function (index, item) {
                emplhtml += '<option value="' + ((item["AccountID"] == undefined || item["AccountID"] == null) ? 0 : item["AccountID"]) + '">' + ((item["LastName"] == undefined || item["LastName"] == null || item["LastName"] == '') ? '-' : item["LastName"]) + '</option>';
            });
            $('#flt_LEmployee').html(emplhtml).select2();

            var empehtml = '<option value="99">Choose Email ID</option>';
            var templstt = ObjSorter(lstadminuser.filter(x=>(x["PrimaryEmailID"] != '' && x["PrimaryEmailID"] != null)), 'PrimaryEmailID', '123');
            $.each(templstt, function (index, item) {
                empehtml += '<option value="' + ((item["PrimaryEmailID"] == undefined || item["PrimaryEmailID"] == null) ? 0 : item["PrimaryEmailID"]) + '">' + ((item["PrimaryEmailID"] == undefined || item["PrimaryEmailID"] == null || item["PrimaryEmailID"] == '') ? '-' : item["PrimaryEmailID"]) + '</option>';
            });
            $('#flt_Emailid').html(empehtml).select2();

            var emplhtml = '<option value="99">Choose Company Name</option>';
            var templstt = ObjSorter(GetDistinctArray(lstadminuser.filter(x=>(x["ClientName"] != '' && x["ClientName"] != null)), 'ClientID'), 'ClientName', '123');
            $.each(templstt, function (index, item) {
                emplhtml += '<option value="' + ((item["ClientID"] == undefined || item["ClientID"] == null) ? 0 : item["ClientID"]) + '">' + ((item["ClientName"] == undefined || item["ClientName"] == null || item["ClientName"] == '') ? '-' : item["ClientName"]) + '</option>';
            });
            $('#flt_Companyname').html(emplhtml).select2();

            var emplhtml = '<option value="99">Choose Status</option>';
            emplhtml += '<option value="50059">Active</option>';
            emplhtml += '<option value="50060">Disabled</option>';
            emplhtml += '<option value="50061">Pending</option>';
            $('#flt_Status').html(emplhtml).select2();

            var emplhtml = '<option value="99">Choose Activation Key</option>';
            var templstt = ObjSorter(lstadminuser.filter(x=>(x["ActivationKey"] != '' && x["ActivationKey"] != null)), 'ActivationKey', '123');
            $.each(templstt, function (index, item) {
                emplhtml += '<option value="' + ((item["ActivationKey"] == undefined || item["ActivationKey"] == null) ? 0 : item["ActivationKey"]) + '">' + ((item["ActivationKey"] == undefined || item["ActivationKey"] == null || item["ActivationKey"] == '') ? '-' : item["ActivationKey"]) + '</option>';
            });
            $('#flt_Activationkey').html(emplhtml).select2();


            //var typehtml = '<option value="99">Choose Time Entry Type</option>';
            //typehtml += '<option value="50120">Daily</option>';
            //typehtml += '<option value="50121">Weekly</option>';
            //$('#flt_TimeEntry').html(typehtml).select2();
            //var statushtml = '<option value="99">Choose Status</option>';
            //statushtml += '<option value="1">Active</option>';
            //statushtml += '<option value="0">InActive</option>';
            //$('#flt_Status').html(statushtml).select2();
            //var setuphtml = '<option value="99">Choose Profile Setup Status</option>';
            //setuphtml += '<option value="1">Complete</option>';
            //setuphtml += '<option value="0">Partial</option>';
            //$('#flt_Setupcomplete').html(setuphtml).select2();
            //var dephtml = '<option value="99">Choose Department</option>';
            //var lstDepartment = ObjSorter(GetDistinctArray(lstadminuser, 'DepartmentName'), 'DepartmentName', '123');
            //if (lstDepartment != undefined && lstDepartment != null && lstDepartment.length > 0) {
            //    $.each(lstDepartment, function (index, item) {
            //        if (item["Department"] != undefined && item["Department"] != null && item["Department"] != 0) {
            //            dephtml += '<option value="' + ((item["Department"] == undefined || item["Department"] == null) ? 0 : item["Department"]) + '">' + ((item["DepartmentName"] == undefined || item["DepartmentName"] == null || item["DepartmentName"] == '') ? '-' : item["DepartmentName"]) + '</option>';
            //        }
            //    });
            //}
            //$('#flt_department').html(dephtml).select2();
        }
        //UpdateApprover
        {
            var html = '<option value="99">Choose Approver</option>';
            var lstapprover = GetDistinctArray(lstadminuser, 'ApproverID');
            lstapprover = lstapprover.filter(x=>x["ApproverID"] != null);
            lstapprover = ObjSorter(lstapprover, 'ApproverName', '123');
            if (lstapprover != undefined && lstapprover != null && lstapprover.length > 0) {
                $.each(lstapprover, function (index, item) {
                    if (item["ApproverID"] != undefined && item["ApproverID"] != null && item["ApproverID"] != 0) {
                        html += '<option value="' + ((item["ApproverID"] == undefined || item["ApproverID"] == null) ? 0 : item["ApproverID"]) + '">' + ((item["ApproverName"] == undefined || item["ApproverName"] == null || item["ApproverName"] == '') ? '-' : item["ApproverName"]) + '</option>';
                    }
                });
            }
            //$('#slt_Approver').html(html).select2();
            $('#flt_approver').html(html).select2();
        }
    }

    var ObjSorter = function (data, key, way) {
        return data.sort(function (a, b) {
            var x = $.trim(a[key]).toLowerCase();
            var y = $.trim(b[key]).toLowerCase();
            if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }

    var BindAdminEmp = function (lstadmin) {
        var html = '';
        lstcurrntlst = lstadmin;
        if (lstadmin != undefined && lstadmin != null && lstadmin.length > 0) {
            $.each(lstadmin, function (index, item) {
                html += '<tr>';
                html += '<td>';
                if (item["ClientID"] == ClientID) {
                    html += '<h5><input type="checkbox" ' + ((item["Status"] == 50059) ? 'data-deactiveuseradmin="true" ' : ((item["Status"] == 50060) ? '' : ((item["Status"] == 50061) ? ' data-activeuseradmin="true" ' : ''))) + ' class="checkbox1" data-chckpemp="' + ((item["ClientID"] == undefined || item["ClientID"] == null) ? 0 : item["ClientID"]) + '" disabled ></h5>';
                } else {
                    html += '<h5><input type="checkbox" ' + ((item["Status"] == 50059) ? 'data-deactiveuseradmin="true" ' : ((item["Status"] == 50061) ? '' : ((item["Status"] == 50060) ? ' data-activeuseradmin="true" ' : ''))) + ' class="checkbox1" data-chckaemp="' + ((item["ClientID"] == undefined || item["ClientID"] == null) ? 0 : item["ClientID"]) + '"  ></h5>';
                }
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["ClientName"] == undefined || item["ClientName"] == null || item["ClientName"] == '') ? '-' : item["ClientName"]) + '">' + ((item["ClientName"] == undefined || item["ClientName"] == null || item["ClientName"] == '') ? '-' : item["ClientName"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["FirstName"] == undefined || item["FirstName"] == null || item["FirstName"] == '') ? '-' : item["FirstName"]) + '" >' + ((item["FirstName"] == undefined || item["FirstName"] == null || item["FirstName"] == '') ? '-' : item["FirstName"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["LastName"] == undefined || item["LastName"] == null || item["LastName"] == '') ? '-' : item["LastName"]) + '" >' + ((item["LastName"] == undefined || item["LastName"] == null || item["LastName"] == '') ? '-' : item["LastName"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["PrimaryEmailID"] == undefined || item["PrimaryEmailID"] == null || item["PrimaryEmailID"] == '') ? '-' : item["PrimaryEmailID"]) + '">' + ((item["PrimaryEmailID"] == undefined || item["PrimaryEmailID"] == null || item["PrimaryEmailID"] == '') ? '-' : item["PrimaryEmailID"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["CreatedOn"] == undefined || item["CreatedOn"] == null || item["CreatedOn"] == '') ? '-' : moment(item["CreatedOn"]).format('MM/DD/YYYY')) + '" >' + ((item["CreatedOn"] == undefined || item["CreatedOn"] == null || item["CreatedOn"] == '') ? '-' : moment(item["CreatedOn"]).format('MM/DD/YYYY')) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["CreatedByName"] == undefined || item["CreatedByName"] == null || item["CreatedByName"] == '') ? '-' : item["CreatedByName"]) + '" >' + ((item["CreatedByName"] == undefined || item["CreatedByName"] == null || item["CreatedByName"] == '') ? '-' : item["CreatedByName"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["ActivationKey"] == undefined || item["ActivationKey"] == null || item["ActivationKey"] == '') ? '-' : item["ActivationKey"]) + '" >' + ((item["ActivationKey"] == undefined || item["ActivationKey"] == null || item["ActivationKey"] == '') ? '-' : item["ActivationKey"]) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<h5 title="' + ((item["Status"] == 50059) ? 'Active' : ((item["Status"] == 50061) ? 'Pending' : ((item["Status"] == 50060) ? 'Disabled' : '-'))) + '" >' + ((item["Status"] == 50059) ? 'Active' : ((item["Status"] == 50061) ? 'Pending' : ((item["Status"] == 50060) ? 'Disabled' : '-'))) + '</h5>';
                html += '</td>';
                html += '<td>';
                html += '<a href="#" class="isc-action-badge-td-s1" data-edit="' + item["ClientID"] + '" data-editadmin="' + item["AccountID"] + '" title="Edit"><i class="fa fa-edit"></i></a>';
                if (item["ClientID"] != ClientID) {
                    if (item["Status"] == '50060') {
                        html += '<a href="#" class="isc-action-badge-td-s1 gr-ico" style="padding-left: 5px;" title="Activation" data-adminactivate="' + item["ClientID"] + '" data-deemail="' + item["PrimaryEmailID"] + '" data-dename="' +(item["FirstName"] == null || item["FirstName"] == undefined ? '' : item["FirstName"]) + ' ' + (item["LastName"] == null || item["LastName"] == undefined ? '' : item["LastName"]) + '" data-depasscode="' + item["Password"] + '" data-deUnameID="' + item["Username"] + '" ><i class="fa fa-check"></i></a>';
                    } else if (item["Status"] == '50059') {
                        html += '<a href="#" class="isc-action-badge-td-s1 gr-ico" style="padding-left: 5px;" title="Deactivation" data-deactivate="' + item["ClientID"] + '" data-deemail="' + item["PrimaryEmailID"] + '" data-dename="' + (item["FirstName"] == null || item["FirstName"] == undefined ? '' : item["FirstName"]) + ' ' + (item["LastName"] == null || item["LastName"] == undefined ? '' : item["LastName"]) + '" ><i class="fa fa-times" style="color: #da0707 !important;"></i></a>';
                    }
                }
                html += '<a href="#" class="isc-action-badge-td-s1" style="padding-left: 5px;" title="Delete" data-delete="' + item["ClientID"] + '" data-deemail="' + item["PrimaryEmailID"] + '" data-dename="' + (item["FirstName"] == null || item["FirstName"] == undefined ? '' : item["FirstName"]) + ' ' + (item["LastName"] == null || item["LastName"] == undefined ? '' : item["LastName"]) + '" ><i class="fa fa-trash-o"></i></a>';
                html += '</td></tr>';
            });
        } else {
            html += '<tr>';
            html += '<td colspan="9" style="text-align:center;">';
            html += '<h5>No Data Found</h5>';
            html += '</td>';
            html += '</tr>';
        }
        $('#tbl_adminUser').find('tbody').html(html);
        $('#tbl_adminUser tbody input[type="checkbox"]').uniform();
        $('#chck_allemployee').prop('checked', false).uniform();
        $('#btn_active_admin').hide();
        $('#btn_deactive_admin').hide();
        $('[data-showerr="true"]').hide();
    }

    var SearchBind = function () {
        
        var lsttemp = [];
        lsttemp = lstadminuser;
        if (lsttemp != undefined && lsttemp != null && lsttemp.length > 0) {
            var AppUser = $('#flt_Employee').val();
            if (AppUser != 99 && AppUser != '99') {
                if (parseInt(AppUser) == 0) {
                    lsttemp = lsttemp.filter(x=>(x["AccountID"] == 0 || x["AccountID"] == null));
                } else {
                    lsttemp = lsttemp.filter(x=>x["AccountID"] == parseInt(AppUser));
                }
            }
            var Cfilter = $('#flt_Companyname').val();
            if (Cfilter != undefined && Cfilter != 99 && Cfilter != '99') {
                lsttemp = lsttemp.filter(x=>x["ClientID"] == Cfilter);
            }
            var LUser = $('#flt_LEmployee').val();
            if (LUser != undefined && LUser != 99 && LUser != '99') {
                lsttemp = lsttemp.filter(x=>x["AccountID"] == LUser);
            }
            var EUser = $('#flt_Emailid').val();
            if (EUser != undefined && EUser != 99 && EUser != '99') {
                lsttemp = lsttemp.filter(x=>x["PrimaryEmailID"] == EUser);
            }
            var AkeyUser = $('#flt_Activationkey').val();
            if (AkeyUser != undefined && AkeyUser != 99 && AkeyUser != '99') {
                lsttemp = lsttemp.filter(x=>x["ActivationKey"] == AkeyUser);
            }
            var TypeUser = $('#flt_Status').val();
            if (TypeUser != undefined && TypeUser != 99 && TypeUser != '99') {
                lsttemp = lsttemp.filter(x=>x["Status"] ==parseInt(TypeUser));
            }

            //var TypeUser = $('#flt_TimeEntry').val();
            //if (TypeUser != undefined && TypeUser != 99 && TypeUser != '99') {
            //    lsttemp = lsttemp.filter(x=>x["EntryType"] == TypeUser);
            //}
            //var StatusUser = $('#flt_Status').val();
            //if (StatusUser != 99 && StatusUser != '99') {
            //    if (StatusUser == 0) {
            //        lsttemp = lsttemp.filter(x=>(x["IsActive"] == 0 || x["IsActive"] == null || x["IsActive"] == "False" || x["IsActive"] == 'false'));
            //    } else {
            //        lsttemp = lsttemp.filter(x=>(x["IsActive"] == StatusUser || x["IsActive"] == "true" || x["IsActive"] == "True"));
            //    }
            //}
            //var ApproverUser = $('#flt_approver').val();
            //if (ApproverUser != 99 && ApproverUser != '99') {
            //    lsttemp = lsttemp.filter(x=>x["ApproverID"] == ApproverUser);
            //}
            //var DeptUser = $('#flt_department').val();
            //if (DeptUser != 99 && DeptUser != '99') {
            //    lsttemp = lsttemp.filter(x=>x["Department"] == DeptUser);
            //}
            //var SetupUser = $('#flt_Setupcomplete').val();
            //if (SetupUser != 99 && SetupUser != '99') {
            //    if (SetupUser == 0) {
            //        lsttemp = lsttemp.filter(x=>(x["IsSetupCompleted"] == 0 || x["IsSetupCompleted"] == null || x["IsSetupCompleted"] == "False" || x["IsSetupCompleted"] == 'false'));
            //    } else {
            //        lsttemp = lsttemp.filter(x=>(x["IsSetupCompleted"] == SetupUser || x["IsSetupCompleted"] == "true" || x["IsSetupCompleted"] == "True"));
            //    }
            //}
        }
        lsttemp = ObjSorter(lsttemp, 'ClientName', '123');
        lstfilteradmin = lsttemp;
        BindAdminEmp(lsttemp);
    }
}

//Data Manipulation
{
    var GetAdminList = function () {
        var _obj = {};
        var tempList = {};
        $.when(RequestServer("ClientAdmin.aspx/GetAdminScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
     
    }

    var GetEmployeeList = function () {
        var _tempList = {};
        var _obj = {
            "UserID": 0
        }
        $.when(Call_DefaultAJAX("/Home/GetEmployeeDetails", _obj)).done(function (response) {
            _tempList = $.parseJSON(response);
        });
        if (_tempList != undefined && _tempList != null && _tempList[0]["Table"] != undefined && _tempList[0]["Table"] != null) {
            lstapprover = $.parseJSON(_tempList[0]["Table"]);
            lstDepartment = $.parseJSON(_tempList[0]["Table"]);
            _tempList = $.parseJSON(_tempList[0]["Table"]);
        }
        return _tempList;
    }

    var GetUserTaskDetail = function (appuserid) {
        var _tempList = {};
        var _obj = {
            "UserID": appuserid
        }
        $.when(Call_DefaultAJAX("/Home/GetDenaliUserTask", _obj)).done(function (response) {
            _tempList = $.parseJSON(response);
        });
        if (_tempList != undefined && _tempList != null && _tempList[0]["Table"] != undefined && _tempList[0]["Table"] != null) {
            _tempList = $.parseJSON(_tempList[0]["Table"]);
        } else {
            _tempList = [];
        }

        return _tempList;
    }

    var SaveClientAdmin = function () {
        var Fname = $.trim($('#txt_firstname').val());
        var Lname = $.trim($('#txt_lastname').val());
        var Companyname = $.trim($('#txt_companyname').val());
        var Emailid = $.trim($('#txt_emailid').val());
        var ActivationKey = gfg(6) + '-' + gfg(6) + '-' + gfg(6);
        var LinkID = gfg(7);
        if (isValidateClient(Fname, Lname, Companyname, Emailid)) {
            var _obj = {
                "Firstname": $.trim(Fname),
                "Lastname": $.trim(Lname),
                "Companyname": $.trim(Companyname),
                "Emailid": $.trim(Emailid),
               // 'Emailid':'echarles@innospire.com',
                "ActivationKey": ActivationKey,
                "Linkid": LinkID,
                //"CreatedOn": moment().format('MM/DD/YYYY'),
            }
            var createObj = {
                'ClientDetails':_obj
            }
            var tempList = {};
            $.when(RequestServer("ClientAdmin.aspx/InsertClientAdmin", createObj)).done(function (response) {
                tempList = $.parseJSON(response);
                
                if (parseInt(response) > 0) {
                    $.notify("Client admin created successfully!!", { position: "right top", className: "success" });
                    ResetSave();
                    var lstadminuserData = GetAdminList();
                    lstadminuser = lstadminuserData["ClientAdminDetails"];
                    lstUserNames = lstadminuserData["UserNames"];
                    lstfilteradmin = lstadminuser;
                    BindPage();
                    $('#mp_add-website').modal('hide');
                }
                else {
                    $.notify("Server error occured while creating a client admin!!", { position: "right top", className: "error" });
                }
            });
           
        }
    }

    var UpdateClientAdmin = function (clintid, empid) {
        var Fname = $('#txt_efirstname').val();
        var Lname = $('#txt_elastname').val();
        var Companyname = $('#txt_ecompanyname').val();
        var Emailid = $('#txt_eemailid').val();
        if (isValidateEditClient(Fname, Lname, Companyname, Emailid)) {
            var _tempList = {};
            var _obj = {
                "Firstname": $.trim(Fname),
                "Lastname": $.trim(Lname),
                "Companyname": $.trim(Companyname),
                "Emailid": $.trim(Emailid),
                "CreatedOn": moment().format('MM/DD/YYYY'),
                "ClientID": parseInt(clintid),
                "UserID": parseInt(empid)
            }
            var updateObj = {
                'ClientDetails':_obj
            }
            $.when(RequestServer("ClientAdmin.aspx/UpdateClientAdmin", updateObj)).done(function (response) {
                tempList = $.parseJSON(response);
                if (parseInt(response) > 0) {
                    $.notify("Client admin updated successfully!!", { position: "right top", className: "success" });
                    ResetSave();
                    var lstadminuserData = GetAdminList();
                    lstadminuser = lstadminuserData["ClientAdminDetails"];
                    lstUserNames = lstadminuserData["UserNames"];
                    lstfilteradmin = lstadminuser;
                    BindPage();
                    $('#mp_edit-website').modal('hide');
                }
                else {
                    $.notify("Server error occured while updating a client admin!!", { position: "right top", className: "error" });
                }
            });
        }
    }

    var DeleteAdmin = function (clientId,ActiveState) {
        var _tempList = {};
        var _obj = {
            "IsActivateState": ActiveState,
            "ClientID": clientId,
        }
        var deleteObject = {
            'ClientDetails':_obj
        }
        $.when(RequestServer("ClientAdmin.aspx/DeleteClientAdmin", deleteObject)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                if (ActiveState == 1) {
                    $.notify("Client admin activated successfully!!", { position: "right top", className: "success" });
                    $('#btn_activadmin').attr('data-activate', 0);
                    $('#mp_delete-website2').modal('hide');
                }
                else if (ActiveState == 2) {
                    $.notify("Client admin deactivated successfully!!", { position: "right top", className: "success" });
                    $('#mp_delete-website').modal('hide');
                    $('#btn_activadmin').attr('data-activate', 0);
                    $('#mp_delete-website1').modal('hide');
                }
                else {
                    $.notify("Client admin deleted successfully!!", { position: "right top", className: "success" });
                    $('#btn_deleteadmin').attr('data-delete', 0);
                    $('#mp_delete-website1').modal('hide');
                }
              
                ResetSave();
                var lstadminuserData = GetAdminList();
                lstadminuser = lstadminuserData["ClientAdminDetails"];
                lstUserNames = lstadminuserData["UserNames"];
                lstfilteradmin = lstadminuser;
                BindPage();
              
            }
            else {

                if (ActiveState == 1) {
                    $.notify("Server error occured while activating a client admin!!", { position: "right top", className: "error" });
                }
                else if (ActiveState == 2) {
                    $.notify("Server error occured while deactivating a client admin!!", { position: "right top", className: "error" });
                }
                else {
                    $.notify("Server error occured while deleteing a client admin!!", { position: "right top", className: "error" });
                }
                
            }
        });
    }

    var DeactivateAdmin = function (admindisableid, Emailid, FName) {
        var _tempList = {};
        var _obj = {
            "Firstname": $.trim(FName),
            "Emailid": $.trim(Emailid),
            "CreatedBy": UserID,
            "CreatedOn": moment().format('MM/DD/YYYY'),
            "UserID": parseInt(admindisableid),
            "ClientID": 1,
            "Passcword": "",
            "UNameID": ""
        }
        $.when(Call_DefaultAJAX("/Home/DeactivateAdmin", JSON.stringify(_obj), "POST")).done(function (response) {
            _tempList = (response);
        });
        $('#mp_delete-website').modal('hide');
        $.notify(FName + " Deactivated Successfully!", { position: "right top", className: "success" });
        lstadminuser = GetAdminList();
        lstfilteradmin = lstadminuser;
        BindPage();
    }

    var ActivateAdmin = function (admindisableid, Emailid, FName, FUnameID, FPasscword) {
        var _tempList = {};
        var _obj = {
            "Firstname": $.trim(FName),
            "Emailid": $.trim(Emailid),
            "CreatedBy": UserID,
            "CreatedOn": moment().format('MM/DD/YYYY'),
            "UserID": parseInt(admindisableid),
            "ClientID": 2,
            "Passcword": $.trim(FPasscword),
            "UNameID": $.trim(FUnameID)
        }
        $.when(Call_DefaultAJAX("/Home/DeactivateAdmin", JSON.stringify(_obj), "POST")).done(function (response) {
            _tempList = (response);
        });
        $('#mp_delete-website2').modal('hide');
        $.notify(FName + " Activated Successfully!", { position: "right top", className: "success" });
        lstadminuser = GetAdminList();
        lstfilteradmin = lstadminuser;
        BindPage();
    }

    var  MultiAdminStateChange= function (state) {
        var lstAdmins = [];
        $('#tbl_adminUser tbody [data-chckaemp]:checked').each(function (index, item) {
            var _tempList = {};
            var _obj = {
                "ClientID": parseInt($(item).attr('data-chckaemp')),
                "IsActivateState": state,
            }
            lstAdmins.push(_obj);
        });
        var listObject = {
            'LstClientDetails': lstAdmins
        }
        $.when(RequestServer("ClientAdmin.aspx/MultipleStateChange", listObject)).done(function (response) {
            tempList = $.parseJSON(response);
            if (parseInt(response) > 0) {
                if (state == 1) {
                    $.notify("Client admin(s) Activated successfully!!", { position: "right top", className: "success" });
                }
                else {
                    $.notify("Client admin(s) Deactivated successfully!!", { position: "right top", className: "success" });
                }
               
                var lstadminuserData = GetAdminList();
                lstadminuser = lstadminuserData["ClientAdminDetails"];
                lstUserNames = lstadminuserData["UserNames"];
                lstfilteradmin = lstadminuser;
                BindPage();
            }
            else {               
                    $.notify("Server error occured while activating a client admin(s)!!", { position: "right top", className: "error" }); 
            }
        });
    }

    var DeactiveAllAdmin = function (admindisableid, Emailid, FName) {
        $('#tbl_adminUser tbody [data-chckaemp]:checked').each(function (index, item) {
            var _tempList = {};
            var _obj = {
                "Firstname": "",
                "Emailid": "",
                "CreatedBy": UserID,
                "CreatedOn": moment().format('MM/DD/YYYY'),
                "UserID": parseInt($(item).attr('data-chckaemp')),
                "ClientID": 1,
                "Passcword": "",
                "UNameID": ""
            }
            $.when(Call_DefaultAJAX("/Home/DeactivateAdmin", JSON.stringify(_obj), "POST")).done(function (response) {
                _tempList = (response);
            });
        });
        $.notify("Deactivated Successfully!", { position: "right top", className: "success" });
        lstadminuser = GetAdminList();
        lstfilteradmin = lstadminuser;
        BindPage();
    }

    var GetUserNames = function () {
        var userObj = {

        }

        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("UserCreation.aspx/GetApplicationUsersNames", _obj)).done(function (response) {
            tempList = $.parseJSON(response);

        });
        return tempList;
    }
}

//Others
{
    var ResetSave = function () {
        $('#txt_firstname').val('');
        $('#txt_lastname').val('');
        $('#txt_companyname').val('');
        $('#txt_emailid').val('');
        $('#txt_efirstname').val('');
        $('#txt_elastname').val('');
        $('#txt_ecompanyname').val('');
        $('#txt_eemailid').val('');
        $('#err-fname').hide();
        $('#err-lname').hide();
        $('#err-companynam').hide();
        $('#err-companyenam').hide();
        $('#err-emailid').hide();
        $('#err-emailvalid').hide();
        $('#err-emailexist').hide();
        $('#err-efname').hide();
        $('#err-elname').hide();
        $('#err-ecompanynam').hide();
        $('#err-eemailid').hide();
        $('#err-eemailvalid').hide();
        $('#txt_creaton').val();
        $('#txt_creatby').val();
        $('#txt_activateky').val();
    }

    var isValidateClient = function (Fname, Lname, Companyname, Emailid) {
        var isvalid = true;
        if (Fname != undefined && Fname != null && Fname != '') {
            $('#err-fname').hide();
        } else {
            isvalid = false;
            $('#err-fname').show();
        }
        if (Lname != undefined && Lname != null && Lname != '') {
            $('#err-lname').hide();
        } else {
            isvalid = false;
            $('#err-lname').show();
        }
        if (Companyname != undefined && Companyname != null && Companyname != '') {
            $('#err-companynam').hide();
            if (lstadminuser != undefined && lstadminuser != null && lstadminuser.length > 0) {

           
            var companylstchk = lstadminuser.filter(x=>(x["ClientName"].toLowerCase() == Companyname.toLowerCase()));
            if (companylstchk != undefined && companylstchk != null && companylstchk.length > 0) {
                isvalid = false;
                $('#err-companyenam').show();
            }
            else {
                $('#err-companyenam').hide();
            }
            }
        } else {
            isvalid = false;
            $('#err-companynam').show();
        }
        if (Emailid != undefined && Emailid != null && Emailid != '') {
            $('#err-emailid').hide();
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (expr.test(Emailid)) {
                $('#err-emailvalid').hide();
                if (lstUserNames != undefined && lstUserNames != null && lstUserNames.length > 0) {
                    var lsttempusexist = lstUserNames.filter(x=>($.trim(x["UserName"]).toLowerCase() == $.trim(Emailid).toLowerCase()));
                    if (lsttempusexist != undefined && lsttempusexist != null && lsttempusexist.length > 0) {
                        //    isvalid = false;
                        //    $('#err-emailid').hide();
                        //    $('#err-emailvalid').hide();
                        //    $('#err-emailexist').show();
                        //}
                    }
                    else {
                        $('#err-emailexist').hide();
                    }
                }
            } else {
                isvalid = false;
                $('#err-emailvalid').show();
            }
        } else {
            isvalid = false;
            $('#err-emailid').show();
            $('#err-emailvalid').hide();
        }

              var userNames = GetUserNames();
        if (userNames != null) {
            if (editUserID == 0) {
                userNames = userNames["UserName"];
                if (userNames != undefined && userNames.length > 0) {
                    var matchedUserRecord = GetmatchedRecord(userNames, 'UserName', Emailid);
                    if (matchedUserRecord.length > 0) {
                        isvalid = false;
                        $('#err-emailexist').show();
                    }

                }
            }
            else {
                userNames = userNames["UserName"];
                if (userNames != undefined && userNames.length > 0) {
                    var unMatchedCurrentUserName = GetunmatchedRecord(userNames, 'UserName', lstdetailtemp[0]["PrimaryEmailID"]);
                    var matchedUserRecord = GetmatchedRecord(unMatchedCurrentUserName, 'UserName', Emailid);
                    if (matchedUserRecord.length > 0) {
                        isvalid = false;
                        $('#err-emailexist').show();
                    }

                }
            }

        }
        return isvalid;
    }

    var isValidateEditClient = function (Fname, Lname, Companyname, Emailid) {
        var isvalid = true;
        if (Fname != undefined && Fname != null && Fname != '') {
            $('#err-efname').hide();
        } else {
            isvalid = false;
            $('#err-efname').show();
        }
        if (Lname != undefined && Lname != null && Lname != '') {
            $('#err-elname').hide();
        } else {
            isvalid = false;
            $('#err-elname').show();
        }
        if (Companyname != undefined && Companyname != null && Companyname != '') {
            $('#err-ecompanynam').hide();
        } else {
            isvalid = false;
            $('#err-ecompanynam').show();
        }
        if (Emailid != undefined && Emailid != null && Emailid != '') {
            $('#err-eemailid').hide();
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (expr.test(Emailid)) {
                $('#err-eemailvalid').hide();
            } else {
                isvalid = false;
                $('#err-eemailvalid').show();
            }
        } else {
            isvalid = false;
            $('#err-eemailvalid').hide();
            $('#err-eemailid').show();
        }
        var userNames = GetUserNames();
        if (userNames != null) {
            if (editUserID == 0) {
                userNames = userNames["UserName"];
                if (userNames != undefined && userNames.length > 0) {
                    var matchedUserRecord = GetmatchedRecord(userNames, 'UserName', Emailid);
                    if (matchedUserRecord.length > 0) {
                        isvalid = false;
                        $('#err-emailexist').show();
                    }

                }
            }
            else {
                userNames = userNames["UserName"];
                if (userNames != undefined && userNames.length > 0) {
                    var unMatchedCurrentUserName = GetunmatchedRecord(userNames, 'UserName', lstdetailtemp[0]["PrimaryEmailID"]);
                    var matchedUserRecord = GetmatchedRecord(unMatchedCurrentUserName, 'UserName', Emailid);
                    if (matchedUserRecord.length > 0) {
                        isvalid = false;
                        $('#err-emailexist').show();
                    }

                }
            }

        }
        return isvalid;
    }


    function gfg(num) {
        return ("" + Math.random()).substring(2, num);
    }
}