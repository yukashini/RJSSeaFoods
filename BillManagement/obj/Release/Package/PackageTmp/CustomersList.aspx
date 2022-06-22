<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="CustomersList.aspx.cs" Inherits="BillManagement.CustomersList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
           @media only screen and (max-width: 767px) {
            .isc-set-scroll-tbl {
                overflow-x:auto;
            }
            .isc-btn-pop-action-s2 {
                
                    width:115px;
                }
            .isc-btn-pop-action-s1
            {
                width:115px;
            }
        }
         @media only screen and (max-width: 767px) {
            .notifyjs-corner {
                font-size: 8px !important;
               
            }
        }
    .isc-attach-file {
    text-align: center;
    border: 1px solid #dadada;
    border-style: dashed;
    padding: 10px;
    font-size: 14px;
}
    .isc-mar-btm-10
    {
      margin-bottom:10px;
    }
      .pad-rig-10{
          padding-right: 10px;
      }
      /*table.dataTable thead th, table.dataTable thead td {
    padding: 9px 7px !important;
    border-bottom: 1px solid #DCDDDD !important;
   }*/
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
                        <h2 style="line-height: 30px;"> Customer List</h2>
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
            <%--    <div class="cell-right pad-rig-5">
              <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 " data-toggle="dropdown">Action<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                                <li class=""><a title="Import" data-toggle="modal" href="#mp_paid">Import</a></li>
                                                <li><a title="Export" href="#" >Export</a>
                                                </li>
                                                
                                              
                                            </ul>
                                        </li>
                                    </ul>
                    </div>--%>

                  <div class="cell-right pad-rig-5">
              <%--   <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:9px;">
                   <a class="" id="download-Sample-template" title="Export"> 
                       <i class="fa fa-download" style="cursor:pointer; font-size:22px;" aria-hidden="true"></i></a>
             
                        </div>--%>

                   

                </div>
                

                <div class="cell-right  pad-rig-10">
                            <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn  isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 isc-mar-to-unset <%--isc-theme-blue-btn--%>" data-toggle="dropdown" style="border-radius:4px !important">Actions<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 " role="menu">
                                                <li>
                                                   <a  href="AddCustomer.aspx" id="createCustomer" title="Add Customer">Add Customer</a>
                                                </li>
                                                <li class=""><a title="Import" data-toggle="modal" href="#mp_paid">Import</a></li>
                                                <li class=""><a title="Download Template" id="Download-lst" href="#">Download Template</a></li>
                                                 <%-- <li>
                                                   <a data-toggle="modal" href="#mp_paid">Import</a>
                                                </li>--%>
                                                                                              
                                            </ul>
                                        </li>
                                    </ul>
                        </div>
              
            </div>
                </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">




            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">

                    <div class="screen-row ">
                            <div class="isc-filter-container mar-top-10" id="isc-filter-container" >
                                <div class="screen-row">
                                    <div class="div-col-80per">
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-CustomerName" placeholder="Enter Customer Name"/>

                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-Expenses" placeholder="Enter Expense"/>

                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-AssociatedProject" placeholder="Enter # of Associated Project"/>

                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-AssociatedBills" placeholder="Enter # of Associated Bill"/>

                        </div>
                       
                        </div>
                                    <div class="div-col-20per">
                         <div class="isc-filter-search isc-go  mar-lft-10" id="Btn_serch" title="Search">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset" id="btn_Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
                        <div class="isc-filter-container-close" title="Close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                                        </div>
                                    </div>
                    </div>
                    </div>


                    <div class="screen-row">
                        <div class="screen-row mar-bot-med" style="display:none;">
                                    
                                    <div class="div-col-25per ">
                                        <div class="isc-scr-sec-grp-container-s1 ">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Total Receivable </h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn">0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$0</h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Overdue </h2>
                                                    </div>
                                                <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#ED5263;"> 0</a>
                                                </div>
                                               
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$0 </h5>
                                                             <div class="screen-row">
                                                                 <div class="cell-left">     
                                                            <h4>New Bills</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        <div class="div-col-25per pad-lft-12">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">No Of Customers</h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#F8AA56;">0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$0 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due This Week</h4></div>
                                                            <div class="cell-right">
                                                                 <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                               
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">No Of Projects </h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#14B191;"> 0
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$0</h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due This Week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                        
                        <div class="screen-row isc-mb-res-tab-scr <%--isc-tab-src-cont-res--%> <%--isc-upd-bill-cont--%>">
                            <table class="isc-table-read-optimal " id="tbl-Customers">
                                                <thead>
                                                    <tr>
                                                       <%-- <th style="width:2%;">
                                                       
                                                           <input type="checkbox" />
                                                       
                                                        </th>--%>
                                                        <th style="width: 20%;" class="header" title="Customer Name">Customer Name
                                                        </th>
                                                      <%--  <th style="width: 23%;" class="header">Address
                                                        </th>
                                                        <th style="width: 20%;" class="header">Email
                                                        </th>--%>
                                                        <th style="width: 13.5%;" title="Address">Address
                                                        </th>
                                                         <th style="width: 13.5%;" title="Email">Email
                                                        </th>
                                                         <th style="width: 13.5%;" title="Expenses">Expenses
                                                        </th>
                                                         <th style="width: 13.5%;" title="Associated Project">Associated Project
                                                        </th>
                                                        <th style="width: 13.5%;" title="Associated Bill">Associated Bill
                                                        </th>
                                                      <%-- <th style="width: 13%;text-align:center;" class="header">Vendor Credits
                                                        </th>--%>
                                                        
                                                         <th style="width: 10%;text-align:center;" title="Action">Action
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
      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_Customer_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Customer Delete</h4>
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
                                        <h4>Are you sure want to delete the customer?</h4>

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

<%--    ExportPopup--%>
    <div class="modal fade isc-popup-detail-form-s1 Mp_Relese in" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" style="">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Customer Import</h4>
                        </div>
                        <div class="cell-right">
                           <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close cell-right " title="Close" id="btn_close"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:200px;text-align:center;">
                        <div class="screen-row " style="margin-top:6px;">
                                                     <a href="#" class="cell-right isc-mar-btm-10" style="color:blue !important;"></a>

                                                    </div>
                        <div class="screen-row " style="margin-top:20px;">
                                    <p class="isc-attach-file">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i> Drop Files to Attach</p>
                               </div>
                        <div class="screen-row " style="margin-top:20px;">
                                     <span class="isc-btn-inp-typ-file-s1" style="font-size: 13px;">Browse

                                                   

                                                                    <input type="file" name="filename" style="width: 200px;" id="browse-customer" title="Add File">
                                                                    </span>

                            <label class="isc-fil-lbl mar-lft-10" id="lbl_filename">File Name : <span id="spn_filename"> </span></label>
                                                    </div>
                        <div class="screen-row mar-top-28 isc-set-scroll-tbl">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst isc-ctm-pop-up">
                        <thead>
                            <tr>

                                <th style="width: 33%; cursor:context-menu" title="Customer Name" class=" ">Customer Name 
                                </th>
                                <th style="width: 33%; cursor:context-menu" title="Address" class="">Address 
                                </th>

                                <th style="width: 33%; cursor:context-menu" title="Email" class="">Email
                                </th>

                               

                            </tr>
                        </thead>
                        <tbody id="tbl_Customerlst">
                            
                            
                            
                        </tbody>
                    </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" title="Upload" id="btn-Save-ExcelData" data-dismiss="modal">
                            Upload</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" title="Cancel" data-dismiss="modal" id="btn-cancel">
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
    <script src="iscjsengine/PageScript/CustomerList.js"></script>
</asp:Content>
