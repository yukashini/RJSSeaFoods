<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="UserCreation.aspx.cs" Inherits="BillManagement.UserCreation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <style>
        .isc-dd-bg .select2-container{
            z-index:99 !important;
        }
        .div-col-20per{
            float:unset;
        }
       
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-plus"></i>
                        <h2 style="line-height: 30px;" id="page-Title">Create User</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn isc-sav-btn" id="Save-User">Save</a>
                     <a class="isc-theme-blue-btn isc-sav-btn" id="Update-User" style="display:none;">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" href="User.aspx">Cancel</a>
                </div>
               

            </div>
        </div>
        <div class="isc-app-screen-body-container" >
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 isc-new-thm-pad isc-frm-pad-10">
                    <div class="isc-sec-div-grp-cell-s1">
                                   
                                    <div class="isc-app-inr-bdy-sec-body-container">
                                        <div class="screen-row mar-top-10">
                                            <div class="div-col-33per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">First Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="text" id="first-Name" data-textbox="firstName" tabindex="1" class="form-control" placeholder="Enter First Name"/>
                                                                     <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="firstName">First Name contains invalid characters. Allowable characters are A-Z, a-z.</span>
                                                                <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="firstName" id="first-Name-Validation">First Name should not be empty</span>
                                                                </div>
                                                </div>
                                            <div class="div-col-33per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">Last Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="text" id="last-Name" data-textbox="lastName" tabindex="2" class="form-control" placeholder="Enter Last Name"/>
                                                                     <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="lastName">Last Name contains invalid characters. Allowable characters are A-Z, a-z.</span>
                                                                <span class="validation-message"  id="last-Name-Validation" style="display:none; color:red" error-active="false" data-validation="lastName">Last Name should not be empty</span>
                                                                </div>
                                                </div>
                                               <div class="div-col-33per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">User Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="text" id="User-Name" data-textbox="UserName" tabindex="6" class="form-control" placeholder="Enter User Name"/>
                                                                     <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="UserName">User Name contains invalid characters. Allowable characters are A-Z, a-z.</span>
                                                                <span class="validation-message"  id="User-Name-Validation" style="display:none; color:red" error-active="false" data-validation="UserName">User Name should not be empty</span>
                                                                </div>
                                                </div>
                                                            </div>
                                        <div class="screen-row mar-top-10">
                                            <div class="div-col-33per">
                                                                <div class="div-col-80per">
                                                                    <label class="mar-top-5">Role Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth isc-dd-bg">
                                                                        <select id="slt-Role" class="isc-select-dropdown select2" tabindex="3" data-Select="role">
                                                                            <option>Choose Role Name</option>
                                                                            
                                                                        </select>
                                                                        <span class="validation-message"  id="role-Name-Validation" style="display:none; color:red" error-active="false" data-validation="role">Role Name should not be empty</span>
                                                                    </div>
                                                                </div>
                                               <%-- <div class="div-col-30per" id="default-Div" style="padding-left:10px;top:6px;display:none;" >
                                                   <label style="cursor:pointer"><input type="checkbox" id="is-Default-Accountant" style="cursor:pointer"/> Default Accountant</label>
                                                </div>--%>
                                                </div>
                                            <div class="div-col-33per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">Email <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="text" id="email-Id" data-Email="Email" tabindex="4" maxlength="64" class="form-control" placeholder="Enter Email"/>
                                                                <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="Email">Entered Email id is not valid.</span>
                                                                    <span class="validation-message"  id="email-Validation" style="display:none; color:red" error-active="false" data-validation="Email">Email should not be empty</span>
                                                                      <span class="validation-message"  id="email-Validation-Duplicate" style="display:none; color:red" error-active="false" data-validation="Email">Already another user using this user name ,Please give other user name</span>
                                                                     </div>
                                                </div>
                                            <div class="div-col-33per">
                                                                <div class="div-col-80per">
                                                                    <label class="mar-top-5">Enter Password<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="password" id="Password"  class="form-control" placeholder="Enter Password "/>
                                                                     
                                                                    <%--<span style="color: red; font-size: 12px; display: none;" id="err-cpasscodmatch">Password and Confirm Password does not match</span>--%>
                                                                <span class="validation-message"  id="Password-Validation" style="display:none; color:red" error-active="false" data-validation="Password">Password should not be empty</span>
                                                                </div>
                                                </div>
                                                            </div>
                                        <div class="screen-row mar-top-10">
                                            <div class="div-col-33per">
                                                                <div class="div-col-80per">
                                                                    <label class="mar-top-5">Phone Number: </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="text" id="phone-Number" phone-Number="True" maxlength="11" tabindex="5" class="form-control" data-Phone="Phone" placeholder="Enter Phone Number"/>
                                                                    <span class="validation-message"  id="phone-Validation" style="display:none; color:red" error-active="false" data-validation="Phone">Phone Number should not be empty</span>
                                                                </div>
                                                </div>
                                            <div class="div-col-33per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">Status<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                     <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                    <select id="slt-Status" class="isc-dd-bg isc-select-dropdown select2" tabindex="6" data-Select="Status">
                                                                            <option>Choose Status </option>
                                                                           
                                                                         
                                                                        </select>
                                                                         <span class="validation-message"  id="status-Validation" style="display:none; color:red" error-active="false" data-validation="Status">Status should not be empty</span>
                                                                </div>
                                                </div>
                                            </div>
                                              <div class="div-col-33per">
                                                                <div class="div-col-80per">
                                                                    <label class="mar-top-5">Confirm Password<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-70per">
                                                                   <input type="password" id="CPassword" onchange="checkpass()" class="form-control" placeholder="Enter Confirm Password "/>
                                                                <span class="validation-message"  id="CPassword-Validation" style="display:none; color:red" error-active="false" data-validation="CPassword">Confirm Password should not be empty</span>
                                                                    <span style="color: red; font-size: 12px; display: none;" id="err-cpasscodmatch">New Password and Confirm Password does not match</span>
                                                                </div>
                                                </div>
                                                            </div> 
                                       
                                    </div>
                                </div>

                      <div class="screen-row mar-top-10">
                                                <div class="isc-cht-flow-cell-s1"  style="margin-bottom: 0px;">
                                                    <div class="isc-cht-flow-fill-cell-s1"style="margin-bottom: 0px;">
                                                        <div class="screen-row">
                                                        
                                                            <h3 class="isc-usr-crt-per-txt">
                                                        Permissions
                                                    </h3>
                                                        
                                                       
                                                           <a > <i class="fa fa-angle-down pad-rgt-5 cell-right"  data-toggle="collapse" href="#acc_collapse1"  style="padding-right:10px;margin-top:-21px;cursor:pointer;"></i></a>
                                                        
                                                            </div>
                                                    </div>
                                                    
                                                   
                                                </div>
                                                <div class="isc-cht-flow-cell-bdy isc-cht-flow-cell-bdy2 collapse in" id="acc_collapse1" style="height: auto;">
                                                   <%-- <ul class="isc-list-hvr-txt-nav isc-role-crt-ul">

                                                        <li>
                                                            <h1><input type="checkbox" class="myCheck" checked="checked"/> Create Bill</h1>
                                                        </li>
                                                        <li>
                                                            <h1><input type="checkbox" checked="checked"/> Manage Bills</h1>
                                                        </li>
                                                        <li>
                                                           <h1><input type="checkbox" checked="checked"/> Create Invoice</h1>
                                                        </li>
                                                        <li>
                                                            <h1><input type="checkbox" checked="checked"/> Manage Invoice</h1>
                                                        </li>
                                                        <li>
                                                           <h1><input type="checkbox" checked="checked"/> Create Invoice Templates</h1>
                                                        </li>
                                                         <li>
                                                           <h1><input type="checkbox" checked="checked"/> Manage Invoice Templates</h1>
                                                        </li>
                                                    </ul>--%>
                                                </div>
                                            </div>
                </div>
                </div>
            </div>
           </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_change-Default" tabindex="-1" role="basic" aria-hidden="false" style="display:none !important;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Inactivate User</h4>
                        </div>
                        <div class="cell-right">
                            <i  ChangeDefault-Cancel="true" class="fa fa-times" title="Close" style="cursor:pointer"></i>
                           <%-- <button type="button" class="close img-typ-sq" title="Cancel" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:100px;text-align:center;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <p class="isc-bill-conf-del">Already the default accountant added, Are you sure want to change the Default Accountant?</p>                                       
                                    </div>

                                </div>
                              
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-ChangeDefault-OK" >
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" ChangeDefault-Cancel="true" id="role-Delete-Cancel">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
        </div>
    <script>
        $(document).ready(function () {
            $(document).on('click', '.isc-tr-show-parentfiles-s1', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.nextUntil('tr.isc-tr-show-parentfiles-s1').slideToggle(function () { });
            });
            // document.getElementById(".myCheck").disabled = true;
        });
        function checkpass() {
            if ($.trim($('#Password').val()) != $.trim($('#CPassword').val())) {
                
                $('#err-cpasscodmatch').show();
            } else {
                $('#err-cpasscodmatch').hide();
            }
        }
    </script>
    <script src="iscjsengine/PageScript/UserCreation.js"></script>
</asp:Content>
