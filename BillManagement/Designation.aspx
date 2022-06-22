<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Designation.aspx.cs" Inherits="BillManagement.Designation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-popup-detail-form-s1 .modal-title {
    color: #fff ;
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
                        <h2 style="line-height: 30px;">Designation </h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
           
               
              <div class="cell-right">
                 <div class="align-right  pad-rig-5 " >
                   
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>
                 

                </div>
                 <div class="cell-right pad-rig-5 " style="margin-top:6px;">
                    
                       <a title="Add Designation" href="#mp_paid" data-toggle="modal"  class="isc-theme-blue-btn" ><i class="fa fa-plus"></i></a>
                 
                </div>
               
            </div>
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
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-Code" placeholder="Enter Code">

                        </div>
                          </div>

                        <div class="cell-left  pad-lft-15">
                          <input type="text" class="form-control" placeholder="Enter Description" id="txt-Description">
                          </div>

                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="btn_search">
                            <a title="Search"><i class="fa fa-search"></i> Search</a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset" id="btn_reset">
                            <a><i class="fa fa-times"></i> Reset</a>
                        </div>
                        <div class="isc-filter-container-close" title="Close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    </div>

                        
                        <div class="screen-row">
                            <table class="isc-table-read-optimal " id="tbl_Designation">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 11%;" class="header">Code
                                                        </th>
                                                      
                                                        <th style="width: 13.5%;" class="header">Description
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

        
   <div class="modal fade isc-popup-detail-form-s1 Mp_Relese in" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" ">
        <div class="modal-dialog" style="width: 650px; ">
            <div class="modal-content">
                <div class="modal-header" style="background-color:#2977cc">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 style="color:white" id="P-title" class="modal-title">Add Designation </h4>
                        </div>
                        <div class="cell-right">
                           <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close cell-right " title="Close" id="btn_close"></i></a>
                        </div>
                    </div>
                </div>
                 <div class="modal-body" style="height:250px;text-align:center;">

                <div class="screen-row">
                   
                                <div class="screen-row mar-top-10">
                                 <div class="screen-row mar-top-10">
                                    <div class="div-col-100per">
                                         <div class="div-col-50per">
                                                            <label class="mar-top-5"> Code <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                                     <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Code" data-textbox="DesignationCode" id="DesignationCode" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                                            <span style="color:red;display:none;" class="validation-message" id="DesignationCode-Validation" data-validation="DesignationCode"> Code should not be empty</span>                                                      
                                                     </div>
                                     </div>
                                            </div>
                                
                                        </div>
                                        <div class="screen-row mar-top-10">
                                            
                                            <div class="div-col-100per">
                                                    <div class="div-col-50per">
                                                            <label class="mar-top-5"> Description <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                                     <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Designation" data-textbox="DesignationName" id="DesignationName" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                                            <span style="color:red;display:none;" class="validation-message" id="DesignationName-Validation" data-validation="DesignationName">Designation should not be empty</span>                                                      
                                                     </div>
                                            </div>
                                
                                         </div>
                                     
                        
                  </div>


                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" title="Save" id="btn-Save" data-dismiss="modal">
                            Save </button>
                        <button type="button" class="btn blue isc-btn-pop-action-s1" title="Update" id="update-Designation" style="display:none">Update</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" title="Cancel" data-dismiss="modal" id="btn-cancel">
                            Cancel</button>
                    </div>
                </div>
               </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>     
    </div>
     <div class="modal fade isc-popup-detail-form-s1 Mp_Relese in" id="mp_Designation_Delete" tabindex="-1" role="basic" aria-hidden="false" ">
                    
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Designation Delete</h4>
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
                                        <h4>Are you sure want to delete the Designation?</h4>

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
    <script>
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });
    </script>

    
    <script src="iscjsengine/PageScript/Designation.js"></script>
</asp:Content>
