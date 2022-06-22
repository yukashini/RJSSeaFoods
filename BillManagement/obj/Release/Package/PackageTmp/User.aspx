<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="User.aspx.cs" Inherits="BillManagement.User" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style>
   
    .isc-upd-bill-cont{
        border:unset;
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="screen-row">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-users"></i>
                        <h2 style="line-height: 30px;">Users</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">

               
                <div class="cell-right">
                    <div class="align-right  pad-rig-5 " >

                        <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter" style=""><i class="fa fa-filter"></i></a>
                    </div>
                </div>
               <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="UserCreation.aspx" id="btn-Add-User">Add User</a>
                </div>
            </div>
                </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">

                    <div class="screen-row ">
                        <div class="screen-row ">
                <div class="isc-filter-container mar-top-10" id="isc-filter-container" style="display: none;">



                    <div class="screen-row">
                        <div class="div-col-80per">
                            <div class="cell-left  ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" id="slt-User" aria-hidden="true">
                                    <option>Choose User Name</option>
                                    
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" id="slt-Role" aria-hidden="true">
                                    <option>Choose Role Name</option>
                                    
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" id="slt-Status" aria-hidden="true">
                                    <option>Choose Status</option>
                                    
                                    
                                </select>
                            </div>
                            </div>
                        <div class="div-col-20per">
                            <div class="cell-left">
                             <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="Btn_serch">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" id="btn_Reset" title="Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>

                            </div>
                            <div class="isc-filter-container-close" id="isc-filter-container-close" title="Close">
                                <a><i class="fa fa-times"></i></a>
                            </div>
                            </div>
                        </div>
                        </div>
            </div>
                    </div>
                    <div class="<%--isc-tab-src-cont-res--%> isc-mb-res-tab-scr">
                    <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst isc-upd-bill-cont " id="tbl-User">
                        <thead>
                            <tr>
                                <th style="width: 20%;" class="" sort-column-Type="text" column-Name="FirstName"  data-sort="FirstName" title="User Name">Name
                                </th>
                                <th style="width: 15%;" class="" sort-column-Type="text" column-Name="RoleName"  data-sort="RoleName" title="Role Name">Role Name
                                </th>

                                <th style="width: 26%;" class="" sort-column-Type="text" column-Name="UserName"  data-sort="UserName" title="Email">User Name
                                                        
                                </th>

                                <th style="width: 19%;" class="" sort-column-Type="text" column-Name="PhoneNumber"  data-sort="PhoneNumber" title="Phone Number">Phone Number
                                </th>

                                <th style="width: 10%;" class="" sort-column-Type="text" column-Name="StrStatus"  data-sort="StrStatus" title="Status">Status
                                </th>

                                <th style="width: 10%; text-align: center;" title="Action" >Action
                                </th>

                            </tr>
                        </thead>
                        <tbody id="tbl-User-Body">
                          
                        </tbody>
                    </table>
                </div>
                    </div>
            </div>
        </div>
    </div>
      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete_user" tabindex="-1" role="basic" aria-hidden="false" style="display:none !important;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Inactivate User</h4>
                        </div>
                        <div class="cell-right">
                            <i  user-Delete-Cancel="true" class="fa fa-times" title="Close" style="cursor:pointer"></i>
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
                                        <p class="isc-bill-conf-del">Are you sure you want to inactivate the user?</p>
                                        

                                    </div>

                                </div>
                              
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="user-Delete-Ok" >
                            Inactivate</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" user-Delete-Cancel="true" id="role-Delete-Cancel">
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
    <script src="iscjsengine/PageScript/User.js"></script>
</asp:Content>

