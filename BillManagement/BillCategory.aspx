<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="BillCategory.aspx.cs" Inherits="BillManagement.BillCategory" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
       
    .isc-h-53
    {
        height:53px;
    }
  ::placeholder {
  color:#ccc !important;
}
   .isc-h-53
    {
        height:53px !important;
    }
    .isc-groupby-container {
    padding: 10px;
    border: 1px solid #ecf0f1;
    width: 100%;
    /* margin: 5px; */
    position: relative;
    display: none;
    margin-bottom: 10px;
}
    .isc-groupby-search:hover {
    background-color: Orange;
}
.isc-groupby-search {
    display: inline-block;
    background: #2980b9;
    color: #fff;
    border-radius: 3px !important;
    padding: 4px 8px;
    cursor: pointer;
    margin-top: 3px;
}
.isc-groupby-search i {
    color: #fff;
}
    .isc-groupby-container-close {
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .isc-groupby-container-close a {
    background-color: #dcdcdc;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 50% !important;
}
    .isc-groupby-container-close a i {
    font-weight: 400;
    font-size: 12px;
    color: #8a8a8a;
}
.mar-lft-10 {
    margin-left: 10px !important;
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
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">Bill Category</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
           
               
              <div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:6px;">
                   
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
<a class="isc-theme-blue-btn groupby-toggle-btn-cls" id="groupby-toggle-btn" title="Filter"><i class="fa fa-sitemap"></i></a>
                         </div>

                </div>
              <div class="cell-right pad-rig-5 " style="margin-top:6px;">
                       <a title="Add Bill Category" id="open-CategoryPop" class="isc-theme-blue-btn"><i class="fa fa-plus"></i></a>
                 
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 270px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                 
                        
                        <div class="screen-row ">
                            <div class="isc-filter-container isc-h-53" id="isc-filter-container" style="display: none;">
        <div class="cell-left ">
                            <input type="text" class="form-control " placeholder="Bill Category" id="txt-Category"/>

                        </div>
                        <div class="cell-left  pad-lft-15">
                            <select class="form-control select2 select2-hidden-accessible" id="slt-Status" tabindex="-1" aria-hidden="true">
                                <option>Select Status</option>
                               
                             

                            </select>
                          </div>
                        
                                
                      <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Search" id="btn-Search"><i class="fa fa-search"></i></a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset">
                            <a id="reset"><i class="fa fa-refresh"></i></a>
                        </div>

                        
                        <div class="isc-filter-container-close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    </div>
                      
                    <div class="screen-row">
                        <div class="isc-groupby-container isc-h-53" id="isc-groupby-container" style="display: none;">
           <div class="cell-left ">
                            <input type="text" class="form-control " placeholder="Bill Category" id=""/>

                        </div>
                        <div class="cell-left  pad-lft-15">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" >
                                <option>Select Status</option>
                               <%-- <option>Active		
                                </option>
                                   <option>Inactive
                                </option>
                             --%>

                            </select>
                          </div>
                        
            
                            <div class="isc-groupby-search isc-go  mar-lft-10" title="Search">
                            <a title="Search" ><i class="fa fa-search"></i></a>
                        </div>
                            <div class="isc-groupby-search isc-reset" title="Reset">
                            <a ><i class="fa fa-refresh"></i></a>
                        </div>

                        
                        <div class="isc-groupby-container-close" id="isc-groupby-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    </div>


                        <div class="screen-row isc-tab-src-cont-res">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 " id="tbl-BillCategories">
                                             <thead>
		<tr style="cursor: pointer;">
       <%--<th style="width:2%;" class="header">
                                                            <div class="checker"><span><input type="checkbox"></span></div>
                                                        </th>--%>
                                                           <th title="Bill Category" style="width:40%;">Bill Category</th>                                                             
                                                            <th title="Description" style="width:40%;">Description</th>
                                                           <th title="Status" style="width:10%;">Status</th>
                                                            <th title="Action"class="text-center" style="width:10%;">Action</th>
                           
	  </tr>
           </thead>
                                <tbody class="">
			</tbody>
                                            </table>
                        </div>
                        </div>
                   </div> 
                </div>
        <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width:700px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title"> Bill Category</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    
                   
             
                       
                    <div class="screen-row ">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Bill Category
                                        <span style="color:red;font-size:14px;">*</span>  </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                                <input type="text" placeholder="Enter Bill Category" class="form-control">
                            </div>
                        </div>
                            <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Description
                                    </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                              <textarea placeholder="Enter Description" rows="4" class="form-control" style="resize:none;" spellcheck="false"></textarea>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Status <span style="color:red;font-size:14px;">*</span>
                                 </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                 <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                            <option>Active</option>
                                                                            <option>Inactive</option>
                                                                       
                                                                        </select>
                                                                    </div>
                                
                            </div>
                          

                        </div>
                        
                        
                        
                 </div>              
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                Save</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
                  </div>
                     
            <!-- /.mokdmadal-dialog -->
        </div>




        <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="add_mp_paid" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width:700px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="pop-Up-title">Create Bill Category</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal" title="Close" data-cancel-Category="true"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    
                   
             
                       
                    <div class="screen-row ">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Bill Category
                                        <span style="color:red;font-size:14px;">*</span>  </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                                <input type="text" placeholder="Enter Bill Category" class="form-control" id="txt-BillCategory"/>
                            </div>
                        </div>
                            <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Description
                                    </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                              <textarea placeholder="Enter Description" id="txt-Desc" rows="4" class="form-control" style="resize:none;" spellcheck="false"></textarea>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Status <span style="color:red;font-size:14px;">*</span>
                                 </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                 <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select id="slt-Category-Status" class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                           <option>Select Status</option>
                                                                       
                                                                        </select>
                                                                    </div>
                                
                            </div>
                          

                        </div>
                        
                        
                        
                 </div>              
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <%--<button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                Create</button>--%>
                            <a id="create-Category" class="btn blue isc-btn-pop-action-s1">Create</a>
                             <a id="update-Category" class="btn blue isc-btn-pop-action-s1" style="display:none">Update</a>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                         <%--   <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal" >
                                Cancel</button>--%>
                             <a id="cancel-Category" data-cancel-Category="true" class="btn blue isc-btn-pop-action-s1" style="background-color:#95a5a6 !important;">Cancel</a>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
                  </div>
                     
            <!-- /.mokdmadal-dialog -->
        </div>

        <div class="modal fade isc-popup-detail-form-s1 in" id="deletePop" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Delete</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color:#8A8A8A;" title="Cancel"  delete-cancel="true" aria-hidden="true"></i></a>
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
                                        <h4>Are you sure want to delete the Bill Category?</h4>

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
                    <script>
        $('#groupby-toggle-btn,#isc-groupby-container-close').click(function () {
            $('#isc-groupby-container').toggle();
        });
        $('#groupby-toggle-btn1,#isc-groupby-container-close1').click(function () {
            $('#isc-groupby-container1').toggle();
        });

    </script>
    <script src="iscjsengine/PageScript/BillCategory.js"></script>
</asp:Content>

