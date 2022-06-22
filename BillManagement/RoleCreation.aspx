<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="RoleCreation.aspx.cs" Inherits="BillManagement.RoleCreation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-dd-bg .select2-container{
            z-index:9999 !important;
        }
        .isc-cht-flow-cell-bdy3{
            min-height:619px;
            max-height:839px;
        }
        .div-col-60per{
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
                        <h2 style="line-height: 30px;" id="page-Title">Create Role</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn isc-sav-btn" id="Save-Role">Save</a>
                      <a class="isc-theme-blue-btn isc-sav-btn" id="Update-Role" style="display:none">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" href="Roles.aspx">Cancel</a>
                </div>
               

            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 isc-new-thm-pad isc-frm-pad-10">
                    <div class="isc-sec-div-grp-cell-s1">
                                    
                                    <div class="isc-app-inr-bdy-sec-body-container">
                                       <div class="screen-row mar-top-10">
                                           <div class="div-col-50per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">Role Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-60per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth isc-dd-bg">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" data-Select="roleName"  id="role-Name"tabindex="-1"  aria-hidden="true">
                                                                            <option value="0">Choose Role Name</option>
                                                                        
                                                                        </select>
                                                  <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="roleName" id="role-Name-Validation">Role Name should not be empty</span>
                                                                                               <%--<input type="text" class="form-control" id="role-Name"  placeholder="Enter Role Name"/>--%>
                                                                    </div>
                                                                </div>
                                               </div>
                                           <div class="div-col-50per">
                                                <div class="div-col-25per">
                                                                    <label class="mar-top-5">Description<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-60per">
                                                                    <textarea class="form-control" rows="2" id="role-Desc" placeholder="Enter Description"  data-text="description"></textarea>
                                                              <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="description" id="description-Validation">Description should not be empty</span>
                                                                      </div>
                                           </div>
                                                            </div>
                                       
                                        <div class="screen-row ">
                                            <div class="div-col-50per">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">Status<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-60per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Role-Status" tabindex="-1" data-Select="Status" aria-hidden="true">
                                                                           <option value="0">Choose Status</option>
                                                                        </select>
                                                                         <span class="validation-message" style="display:none; color:red" error-active="false" id="status-Validation"  data-validation="Status">Status should not be empty</span>
                                                                      <span class="validation-message" style="display:none; color:red" error-active="false" id="status-Inactive-Validation"  data-validation="Status">Before you inactivating a role, remove users associated to the role</span>
                                                                    </div>
                                                                </div>
                                                </div>
                                                            </div>
                                    </div>
                                </div>
                    <div class="screen-row mar-top-10">
                        <div class="isc-cht-flow-cell-s1"  style="margin-bottom: 0px;">
                                                    <div class="isc-cht-flow-fill-cell-s1">
                                                        <div class="screen-row">
                                                        
                                                            <h3 class="isc-lbl-floting-cht-s1">
                                                        <input type="checkbox"  id="check-All-Permission" class="checkboxr"/>Permissions
                                                    </h3>
                                                        
                                                       
                                                           <a > <i data-toggle="collapse" href="#acc_collapse7" class="fa fa-angle-down pad-rgt-5 cell-right" style="padding-right:10px;margin-top:9px;cursor:pointer"></i></a>
                                                        
                                                            </div>
                                                    </div>
                                                    
                                                   
                                                </div>
                         <div class="isc-cht-flow-cell-bdy  isc-cht-flow-cell-bdy3 collapse in" id="acc_collapse7" style="height: auto;padding:10px;">
                   
                             </div>
                        </div>
                    </div>
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
        });
    </script>
    <script src="iscjsengine/PageScript/RoleCreation.js"></script>
</asp:Content>
