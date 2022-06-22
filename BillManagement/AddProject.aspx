<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AddProject.aspx.cs" Inherits="BillManagement.AddProject" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <style>
        .isc-bill-trk-viw-del-sel .select2-container{
            width:100% !important;
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
                        <h2 style="line-height: 30px;" id="pageTitle">Add Project</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn isc-sav-btn"  id="save-project">Save</a>
                      <a class="isc-theme-blue-btn isc-sav-btn"  style="display:none" id="update-project">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="cancel-Project">Cancel</a>
                </div>
                <%-- <div class="cell-right  mar-top-10">

                    <a class="isc-theme-blue-btn" href="#">Submit </a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                
                     <div class="screen-row isc-new-thm-pad">
                        <div class="screen-row ">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Project Name<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-80per">
                                                            <input type="text" placeholder="Enter Project Name" data-textbox="ProjectName" id="projName" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                    <span style="color:red;display:none;" class="validation-message" id="ProjectName-Validation" data-validation="ProjectName">Project Name should not be empty</span>                                                      
                                    </div>
                                </div>
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Customer Name<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-80per">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Customers" data-Select="CustomerName"  >
                                                    <option>Choose Customer Name</option>
                                                   
                                                </select>
                                              <span style="color:red;display:none;" class="validation-message" id="CustomerName-Validation" data-validation="CustomerName">Customer Name should not be empty</span>                                                      
                                            </div>
                                                        </div>
                                </div>
                                
                            </div>
                        <div class="screen-row mar-top-10">
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Project Description : </label>
                                                        </div>
                                    <div class="div-col-80per">
                                                         <textarea placeholder="Enter Project Description" id="projDesc" rows="4" class="form-control" style="resize:none;"></textarea>
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Project Type : </label>
                                                        </div>
                                    <div class="div-col-80per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-ProjectType">
                                                    <option>Choose Project Type</option>
                                                </select>
                                            </div>
                                                        </div>
                                </div>
                                
                            </div>
                        <div class="screen-row mar-top-10">
                                
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Status</label>
                                                        </div>
                                    <div class="div-col-80per">
                                                              <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Status" data-Select="Status">
                                                    <option>Choose Status</option>
                                                     
                                                </select>
                                                                  <span style="color:red;display:none;" class="validation-message" id="Status-Validation" data-validation="Status">Status should not be empty</span>                                                      
                                            </div> </div>
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
          </div>
    <script src="iscjsengine/PageScript/CreateProject.js"></script>
    
</asp:Content>
