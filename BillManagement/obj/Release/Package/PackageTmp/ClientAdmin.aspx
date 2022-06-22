<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ClientAdmin.aspx.cs" Inherits="BillManagement.ClientAdmin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        @media only screen and (max-width: 767px) {
            .isc-sec-filt-con-s1
            {
                border:unset !important;
            }
        }
        .emp-dd {
            padding-left: 6px;
        }

            .emp-dd li {
                list-style: none;
            }

            .emp-dd .dropdown-menu {
                left: -110px;
            }

                .emp-dd .dropdown-menu li a {
                    font-size: 12px;
                    padding: 6px 6px 6px 6px;
                }

                    .emp-dd .dropdown-menu li a i {
                        color: #9a989a;
                    }

            .emp-dd .isc-theme-blue-btn {
                background: #fff;
                color: #000;
                border: 1px solid #ccc;
            }


        .taC {
            text-align: center;
        }

        .TS-upload-fil h3 {
            font-size: 15px;
        }

        .isc-btn-inp-typ-file-s3-custom {
            overflow: hidden;
            text-align: center;
            cursor: pointer;
            width: 100%;
            border-radius: 3px !important;
            /*padding: 4px 7px;*/
            font-size: 15px;
            font-weight: 500;
            line-height: 15px;
            border: none !important;
            /*background-color: #b7e4fd !important;*/
            background-color: transparent !important;
            z-index: 99999999999 !important;
        }

        .error-msg h2 {
            color: #f00;
            margin: 10px;
            font-size: 14px;
        }

        .imp-emp-vali-btn {
            position: absolute;
            display: none;
        }

        .TS-Last-Up p {
            cursor: pointer;
        }

        .p0 {
            padding: 0px;
        }

        .pLeft8 {
            padding-left: 8%;
        }

        .TS-pop-noti p {
            font-size: 12px;
            color: #737373;
            padding-top: 10px;
        }

        .pT20 {
            padding-top: 20px;
        }

        .error-msg tr td h2, .error-msg th {
            color: #000 !important;
        }

        .error-msg h3 {
            font-size: 15px;
            margin-top: 0px;
        }

        .pB0 {
            padding-bottom: 0px;
        }

        .div-col-6per-filt {
            width: 6%;
            float: left;
            margin-right: 116px;
        }


        .select2-container {
            width: 180px !important;
            z-index: 99999999999 !important;
        }

        .TS-filt-sec .isc-sec-filt-con-s1 {
            position: sticky !important;
        }

        #tblValidatedData.isc-table-read-optimal td {
            border-bottom: 1px dotted #ddd;
            color: #525252;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0.2px;
            line-height: 20px;
            padding: 8px 10px;
            position: relative;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .isc-tim-enty-bck .select2-container {
            width: 180px !important;
            z-index: 9999 !important;
        }

        .isc-popup-detail-form-s1 .modal-body {
            min-height: 150px;
        }
        .isc-app-screen-sec-container-s1{
    padding: 5px 11px !important;
}
        .isc-new-pop-up .modal-body {
    height: calc(100vh - 110px);
   
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-users"></i>
                        <h2 style="line-height: 30px;">Manage Clients</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right" >
                    <a class="isc-theme-blue-btn mar-lft-5 filter-toggle-btn-cls" href="#" title="Filter" id="filter_togle"><i class="fa fa-filter"></i></a>
                </div>
                <div class="cell-right pad-lft-med mar-top-min2">
                    <ul class="isc-sec-lvl-cust-dd-s1">
                        <li class=""><a title="Activate" type="button" class="isc-dd-drat-btn-s1 isc-sub-menu-list-s1 " style="display: none;" id="btn_active_admin" >Activate </a>
                            <ul class="isc-nested-list-dd-s2" role="menu">
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="cell-right pad-lft-med mar-top-min2">
                    <ul class="isc-sec-lvl-cust-dd-s1">
                        <li class=""><a title="Deactivate" type="button" class="isc-dd-drat-btn-s1 isc-sub-menu-list-s1 " style="display: none;" id="btn_deactive_admin" href="#">Deactivate </a>
                            <ul class="isc-nested-list-dd-s2" role="menu">
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="cell-right pad-lft-med mar-top-min2" style="padding-top: 8px;display: none;" data-showerr="true">
                    <p style="color: red;">Please select either Active or Disabled users!</p>
                </div>
                <div class="cell-right pad-rig-5 " style="margin-top:5px;"> 
                    <a title="Create" type="button" class="isc-theme-blue-btn" id="btn_create_pop">Create </a>
                    </div>
                <%--<div class="cell-right pad-lft-med mar-top-min2">
                    <ul class="isc-sec-lvl-cust-dd-s1">
                        <li class="">
                            <ul class="isc-nested-list-dd-s2" role="menu">
                            </ul>
                        </li>
                    </ul>
                </div>--%>
                <%--   <div class="cell-right  mar-top-2">
               
                <a class="isc-theme-blue-btn isc-btn-func mar-lft-5" href="#" title="Filter">Delete</a>
            </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="isc-app-screen-sec-container-s1 ">
                        <div class="screen-row">
                            <div class="screen-row  rem_filt_con TS-filt-sec" id="filter_con" style="display: none;">
                                <div class="isc-sec-filt-con-s1">
                                    <div class="screen-row">
                                        <div class="div-col-80per">
                                    <div class="cell-left">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-tim-enty-bck">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="flt_Companyname">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-tim-enty-bck">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="flt_Employee">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-tim-enty-bck">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="flt_LEmployee">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-tim-enty-bck">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="flt_Emailid">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-tim-enty-bck">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="flt_Activationkey">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="cell-left mar-top-10">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-tim-enty-bck">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="flt_Status">
                                            </select>
                                        </div>
                                    </div>
                                            </div>
                                        <div class="div-col-20per">
                                    <div class="cell-left ">
                                    <div class="isc-filter-search isc-go mar-lft-10 isc-clt-flt" title="Search" id="btn_search">
                                        <a><i class="fa fa-search"></i> Search</a>
                                    </div>
                                    <%--<div class="isc-filter-search isc-go" title="Reset" id="btn_reset">
                                        <a style="color:white">Reset</a>
                                    </div>--%>
                                    <div class="isc-filter-search isc-reset mar-lft-10" title="Reset">
                            <a id="btn_reset"> <i class="fa fa-times"></i> Reset</a>
                        </div>
                                    </div>
                                            <div class="isc-filter-container-close" id="filter_clse">
                            <a><i class="fa fa-times" title="Close"></i></a>
                        </div>
                                    
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div class="screen-row  rem_filt_con" id="filter-content" style="display: none;">
                                <div class="isc-sec-filt-con-s1">
                                    <div class="div-col-16per">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                aria-hidden="true" id="">
                                                <option>Department</option>
                                                <option>Approver </option>
                                                <option>Time Entry Type </option>
                                                <option>Profile Setup</option>
                                                <option>Employee Status </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="isc-filter-search isc-go" title="Go">
                                        <a><i class="fa fa-search"></i></a>
                                    </div>
                                    <div class="isc-filter-search isc-go" title="Go">
                                        <a>Reset</a>
                                    </div>
                                    <%--<div class="cell-right pad-lft-15">
                                        <i class="isc-sec-fil-clse fa fa-thumb-tack" id="filter_clse"></i>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane active fade in isc-lst-scrl-cont" id="ScrTab1">

                                <table class="isc-table-read-optimal  isc-ddp-hdn-lst mar-top-10 " id="tbl_adminUser">
                                    <thead>
                                        <tr>
                                            <th style="width: 3%;" data-check="true">
                                                <input type="checkbox" style="cursor: pointer;" class="checkbox1" id="chck_allemployee">
                                            </th>
                                            <th style="width: 12%;" title="Company Name" class="header">Company Name
                                            </th>

                                            <th style="width: 10%;" class="header" title="First Name">First Name
                                            </th>

                                            <th style="width: 11%;" class="header" title="Last Name">Last Name
                                                        
                                            </th>
                                            <th style="width: 10%;" class="header" title="Email ID">Email ID
                                            </th>
                                            <th style="width: 10%;" class="header" title="Created Date">Created Date
                                                        
                                            </th>
                                            <th style="width: 7%;" class="header" title="Created By">Created By                                                         
                                            </th>

                                            <th style="width: 10%;" class="header" title="Activation Key">Activation Key
                                            </th>
                                            <th style="width: 12%;" class="header" title="Status">Status
                                            </th>
                                            <th style="width: 10%;" class="header" title="Action">Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <%--<tr>
                                            <td>
                                                <h5>
                                                    <input type="checkbox" class="checkbox1">
                                                    Imperial Tobaco</h5>
                                            </td>

                                            <td>
                                                <h5>David</h5>
                                            </td>
                                            <td>
                                                <h5>Williams</h5>
                                            </td>
                                            <td>
                                                <h5><a class="isc-emp-data" href="#mp_add-website1" data-toggle="modal">david45@gmail.com</a></h5>
                                            </td>
                                            <td>
                                                <h5>23/12/2020</h5>
                                            </td>
                                            <td>
                                                <h5>David
                                                </h5>
                                            </td>

                                            <td>
                                                <h5>1232-998-0087</h5>
                                            </td>
                                            <td>
                                                <h5>Pending</h5>
                                            </td>
                                            <td>
                                                <a href="#" class="isc-action-badge-td-s1" title="Edit"><i class="fa fa-edit"></i></a>
                                                <a href="#" class="isc-action-badge-td-s1 gr-ico" title="Activation"><i class="fa fa-check"></i></a>
                                                <a href="#" class="isc-action-badge-td-s1" title="Delete"><i class="fa fa-trash-o"></i></a>
                                            </td>


                                        </tr>--%>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_add-website" tabindex="-1" role="basic" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Create Client Admin</h4>
                        </div>
                        <div class="cell-right">
                            <a><i  title="Close" class="fa fa-times" style="cursor:pointer" data-dismiss="modal"></i></a>
                          <%--  <button type="button" title="Close" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>First Name <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_firstname" data-field="First Name" placeholder="Enter First Name" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-fname">First Name should not be empty</span>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Last Name <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_lastname" data-field="Last Name" placeholder="Enter Last Name" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-lname">Last Name should not be empty</span>
                                        </div>

                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Company Name <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_companyname" data-field="Company Name" placeholder="Enter Company Name" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-companynam">Company Name should not be empty</span>
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-companyenam">Company Name is already exist</span>
                                        </div>

                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Email ID <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_emailid" placeholder="Enter Email ID" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-emailid">Email ID should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-emailvalid">Email ID is not valid</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-emailexist">Email ID is already exists</span>
                                        </div>

                                    </div>

                                </div>


                                <%--<div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Create Date <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" placeholder="12/11/2020" class="form-control" readonly>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Create By <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" placeholder="Nicholas" class="form-control" readonly>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Activation Key <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" placeholder="1232-998-0087" class="form-control" readonly>
                                        </div>

                                    </div>

                                </div>--%>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn_createadmin">
                            Create</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_edit-website" tabindex="-1" role="basic" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Update Client Admin</h4>
                        </div>
                        <div class="cell-right">
                           
<a><i class="fa fa-times" title="Close" data-dismiss="modal" style="cursor:pointer"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>First Name <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_efirstname" placeholder="Enter First Name" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-efname">First Name should not be empty</span>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Last Name <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_elastname" placeholder="Enter Last Name" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-elname">Last Name should not be empty</span>
                                        </div>

                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Company Name <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_ecompanyname" placeholder="Enter Company Name" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-ecompanynam">Company Name should not be empty</span>
                                        </div>

                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Email ID <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt_eemailid" placeholder="Enter Email ID" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-eemailid">Email ID should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-eemailvalid">Email ID is not valid</span>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Create Date </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" placeholder="" id="txt_creaton" class="form-control" readonly>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Create By </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" placeholder="" id="txt_creatby" class="form-control" readonly>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Activation Key </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" placeholder="" id="txt_activateky" class="form-control" readonly>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn_editadmin">
                            Update</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_add-website1" tabindex="-1" role="basic" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Employee Details</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" title="Close" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Employee ID </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_ApplicationID" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>First Name </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_FName" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Last Name </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_LName" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Designation </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_Designation" readonly="" class="form-control">
                                        </div>
                                    </div>

                                </div>



                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Email ID </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_ApplicationEmailID" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Department </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_UserDepartment" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Time Entry </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_UserTimeEntry" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Week Start Day </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_UserStartDay" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Week End Day </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_UserEndDay" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Daily Regular Hours </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_UserRegularhr" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Status </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_UserStatus" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Approver </label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_ApproverName" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Approver Email</label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="text" id="txt_ApproverEmail" readonly="" class="form-control">
                                        </div>

                                    </div>

                                </div>



                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Pay Rate</label>
                                        </div>
                                        <div class="div-col-100per">
                                            <table class="isc-table-read-optimal isc-popup-tbl isc-ddp-hdn-lst mar-top-10" id="tbl_Payrate">
                                                <thead>
                                                    <tr>

                                                        <th style="width: 15%;" class="header">Code
                                                        </th>
                                                        <th style="width: 15%;" class="header">Description 
                                                        </th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Leave Code</label>
                                        </div>
                                        <div class="div-col-100per">
                                            <table class="isc-table-read-optimal isc-popup-tbl isc-ddp-hdn-lst mar-top-10" id="tbl_Leavecode">
                                                <thead>
                                                    <tr>

                                                        <th style="width: 15%;" class="header">Code
                                                        </th>
                                                        <th style="width: 15%;" class="header">Description 
                                                        </th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Close</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete-website" tabindex="-1" role="basic" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Deactivate Client Admin</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" title="Close" data-dismiss="modal" style="cursor:pointer"></i></a>
                           <%-- <button type="button" title="Close" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4 class="" style="text-align: center; font-weight: 400; padding-top: 20px;">Are you sure want to Deactivate <span data-deactivatclientnam="true"></span>?</h4>

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn_deactivadmin">
                            Yes</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            No</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete-website2" tabindex="-1" role="basic" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Activate Client Admin</h4>
                        </div>
                        <div class="cell-right">
                             <a><i class="fa fa-times" title="Close" data-dismiss="modal" style="cursor:pointer"></i></a>
                           <%-- <button type="button" title="Close" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4 class="" style="text-align: center; font-weight: 400; padding-top: 20px;">Are you sure want to Activate <span data-activatclientnam="true"></span>?</h4>

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn_activadmin">
                            Yes</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            No</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete-website1" tabindex="-1" role="basic" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Client Admin</h4>
                        </div>
                        <div class="cell-right">
                            

                        <a><i class="fa fa-times" title="Close" data-dismiss="modal" style="cursor:pointer"></i></a>
                          <%--  <button type="button" title="Close" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4 class="" style="text-align: center; font-weight: 400; padding-top: 20px;">Are you sure want to Delete <span data-deleteclientnam="true"></span>?</h4>

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn_deleteadmin">
                            Yes</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            No</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script>
        $(document).ready(function () {

            //$('.iscdatepicker').datepicker({
            //    format: 'mm/dd/yyyy',
            //    orientation: "auto bottom"
            //});

            $("#filter_togle").click(function () {
                $("#filter_con").toggle();


            });
            $("#filter_clse").click(function () {

                $(".rem_filt_con").hide();
                $(".isc-sec-filter-s1 li").removeClass("active");
            });
            $("#filter_togle_s1").click(function () {
                $("#filter_con_s1").toggle();


            });
            $("#filter_clse_s1").click(function () {

                $(".rem_filt_con").hide();
                $(".isc-sec-filter-s1 li").removeClass("active");
            });

        });


    </script>


    <script>
        $(document).ready(function () {
            $('#filter').click(function () {
                $('#filter-content').toggle(10);
            });
            $('#isc-groupby').click(function () {
                $('#groupby-content').toggle(10);
            });
            $('#close-icon').click(function () {
                $('#close-icon').parent('#filter-content').hide();
            });
            $('#groupby-close-icon').click(function () {
                $('#groupby-close-icon').parent('#groupby-content').hide();
            });
        });
    </script>

    <script>
        $(document).ready(function () {
            //set initial state.
            $('#textbox1').val($(this).is(':checked'));

            $('.checkbox1').change(function () {
                if ($(this).is(":checked")) {
                    $('.isc-btn-func').show();


                }
                else {
                    $('.isc-btn-func').hide();
                }
            });
        });
    </script>
    <script src="iscjsengine/PageScript/ClientAdmin.js"></script>
</asp:Content>
