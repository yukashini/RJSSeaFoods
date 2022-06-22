<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="LabelMalaysia.aspx.cs" Inherits="BillManagement.LabelMalaysia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-popup-detail-form-s1 .modal-title {
    color: #fff !important;
        }
        h2.isc-scr-sec-hdr-s1 {
            cursor: default;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="isc-app-main-body-layout-container">
                <div class="isc-app-screen-content-s1">
                    
     <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-users"></i>
                        <h2 style="line-height: 30px;">Malaysia Label</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">                        
              <div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:3px;">                  
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>
                </div>
                <div class="cell-right pad-rig-5">
              <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a style="margin-top:5px;" title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 " data-toggle="dropdown">Action<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                                <li>
                                                     <a  title="AddMalaysia" class="" href="AddMalaysia.aspx">Add Malaysia</a>
                                                </li>
                                               
                                              
                                            </ul>
                                        </li>
                                    </ul>
                    </div>
                  <div class="cell-right pad-rig-5 " style="margin-top:9px;"> 
                     
                </div>
            </div>
        </div>
   <div class="isc-app-screen-body-container" style="height: 285px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row ">
                            <div class="isc-filter-container" id="isc-filter-container" style="display: none;">
                       <div class="cell-left  ">
                           <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-BuyerName" placeholder="Enter Buyer Name"/>

                        </div>
                          </div>
                            
                         <div class="cell-left  pad-lft-15">
                          <input type="text" class="form-control" placeholder="Enter Approval No" id="txt-ApprovalNo"/>
                          </div>
                         
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " placeholder="Enter Production Code" id="txt-ProductionCode"/>
                        </div>
                        
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="btn_search">
                            <a title="Search"><i class="fa fa-search"></i> Search</a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset" id="btn_reset">
                            <a><i class="fa fa-times"></i> Reset</a>
                        </div>
                        <div class="isc-filter-container-close" title="Close" bid="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                 </div>
         
                        <div class="screen-row">
                            <table class="isc-table-read-optimal " id="tbl_MalaysiaLabel">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 20%;" class="header">Buyer Name
                                                        </th>
                                                      
                                                        <th style="width: 20%;" class="header">Buyer Address
                                                        </th>
                                                         <th style="width: 30%;text-align:center;" class="header headerSortDown">Product Name
                                                        </th>
                                                         <th style="width: 10%;text-align:center;" class="header">Production Code
                                                        </th>
                                                         <th style="width: 10%;text-align:center;" class="header">Approval No.
                                                        </th>
                                                     
                                                        <th style="width: 10%;text-align:center;cursor:default;" class="header">Action
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

                    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_Malaysia_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Malaysia Label Delete</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#fff; cursor:pointer;" title="Cancel"   delete-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  delete-cancel="true" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4>Are you sure want to delete the Malaysia Label?</h4>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-delete-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" delete-cancel="true"  id="close-delete" >
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>


                </div>

            </div>
    <script src="iscjsengine/PageScript/LabelMalaysia.js"></script>
</asp:Content>

