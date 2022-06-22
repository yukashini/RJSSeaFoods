<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Roles.aspx.cs" Inherits="BillManagement.Roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style>
    
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="screen-row">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-briefcase"></i>
                        <h2 style="line-height: 30px;">Roles</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                 <div class="cell-right">
                    <div class="align-right pad-rig-5 " >

                        <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter" style=""><i class="fa fa-filter"></i></a>
                    </div>
                </div>
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="RoleCreation.aspx" id="btn-Add-Role" style="display:none">Add Role</a>
                </div>
               

            </div>
                </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">

                    <div class="screen-row ">
                        <div class="screen-row">
                <div class="isc-filter-container mar-top-10" id="isc-filter-container" style="display: none;">




                            <div class="screen-row">
                                <div class="div-col-80per">
                            <div class="cell-left  ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" id="slt-Roles" aria-hidden="true">
                                    <option>Choose Role Name</option>
                                   <%-- <option>Administrator		
                                    </option>
                                    <option>Accountant		
                                    </option>
                                    <option>Approver		
                                    </option>
                                    <option>Approver		
                                    </option>
                                    <option>Clerk		
                                    </option>
                                    <option>Payer	
                                    </option>--%>
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" id="slt-Role-Status" aria-hidden="true">
                                    <option>Choose Status</option>
                                    <%--<option>Active		
                                    </option>
                                    <option>Inactive		
                                    </option>--%>
                                    
                                </select>
                            </div>
                                    </div>
                                <div class="div-col-20per">
                            <div class="cell-left">
                             <div id="Btn_serch" class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a  title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div id="btn_Reset" class="isc-filter-search isc-reset" title="Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
                                </div>
                            <div class="isc-filter-container-close" title="Close" id="isc-filter-container-close">
                                <a><i class="fa fa-times"></i></a>
                            </div>
                                    </div>
                                </div>
                        </div>
            </div>
                    </div>
                    <div class="isc-tab-src-cont-res ">
                    <table class="isc-table-read-optimal isc-table-sorter-s1" id="roles-Table">
                        <thead>
                            <tr>

                                <th style="width: 25%;" class="header" sort-column-Type="text" column-Name="RoleName" title="Role Name" data-sort="RoleName">Role Name
                                  </th>
                                <th style="width: 45%;" class="header" sort-column-Type="text" column-Name="Description" title="Description" data-sort="Description">Description 
                                </th>
                                <th style="width: 20%;" class="header" sort-column-Type="text" column-Name="StrStatus" title="Status" data-sort="StrStatus">Status
                                </th>

                                <th style="width: 10%; text-align: center;" class="" title="Action">Action
                                </th>

                            </tr>
                        </thead>
                        <tbody id="tbl-Roles-Body">
                           
                        </tbody>
                    </table>
                        </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete_Role" tabindex="-1" role="basic" aria-hidden="false" style="display:none !important;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Role</h4>
                        </div>
                        <div class="cell-right">
                            <i class="fa fa-times" role-Delete-Cancel="true" style="cursor:pointer" title="Close"></i>
                           <%-- <button type="button" class="close img-typ-sq" role-Delete-Cancel="true" title="Cancel" data-dismiss="modal" aria-hidden="true">
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
                                        <p class="isc-bill-conf-del" id="delete-msg"> Are you sure you want to delete the role?</p>
                                        

                                    </div>

                                </div>
                              
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="role-Delete-Ok" >
                            Delete</button>
                          <button type="button" class="btn blue isc-btn-pop-action-s1" style="display:none" role-Delete-Cancel="true" id="Delete-Cancel" >
                            OK</button>

                        <button type="button" class="btn default isc-btn-pop-action-s2" role-Delete-Cancel="true" id="role-Delete-Cancel">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script>
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });
    </script>
    <script src="iscjsengine/PageScript/Roles.js"></script>
</asp:Content>

