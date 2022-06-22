<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="GLImport.aspx.cs" Inherits="BillManagement.GLImport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-fil-lbl{
            line-height: 32px;
    padding-left: 18px;
        }
        .isc-btn-inp-typ-file-s1{
            background-color:#2e85bb;
        }
        .grn-clr{
            color:#1eb913;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">GL Import</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
           
               <div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:6px;">
                   
                    <a class="" id="download-Sample-template" title="Click here to download GL sample template"> <i class="fa fa-download" style="cursor:pointer; font-size:22px;padding-top:4px;padding-left:4px;" aria-hidden="true"></i></a>
                </div>

                   

                </div>
              <div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:6px;">
                   
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title=" GL Import"> GL Import</a>
                </div>

                   

                </div>
              
                    <%-- <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                       <a class="isc-theme-blue-btn" href="#" style="margin-right:5px;">Export </a>
                    <a class="isc-theme-blue-btn" href="AddVendor.aspx">Add Vendor </a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        
                        <div class="screen-row ">
                            <div class="isc-filter-container" id="isc-filter-container" style="height:50px;">



                       
                        <div class="cell-left  ">
                          <div class="screen-row " style="margin-top:6px;">
                                                        <span class="isc-btn-inp-typ-file-s1">Browse

                                     <input type="file" name="filename"  style="width: 200px;" id="GL-file" title="Add file"/>
                                                        </span>


                                                    </div>
                        </div>
                        <%--<div class="cell-left ">
                            <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Upload" href="#mp_bill-view" data-toggle="modal" style="color:#fff;">Upload</a>
                        </div>--%>
                             <div class="cell-left ">
                            <label class="isc-fil-lbl">File Name : <span id="file-Name"></span></label>

                        </div>
                        </div>
                       
                        <div class="cell-right">
                            <label class="isc-fil-lbl grn-clr" style="display:none">Uploaded successfully </label>
                        </div>
                        
                    </div>
                    </div>
                        <div class="screen-row">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 " id="tbl-Gl">
                                                <thead>
                                                    <tr>
                                                      
                                                        <th style="width: 20%;" class="" sort-column-Type="text" column-Name="GLNumber"  data-sort="GLNumber">GL Code 
                                                        </th>
                                                        <th style="width: 23%;" class="" sort-column-Type="text" column-Name="GLDescription"  data-sort="GLDescription">GL Description
                                                        </th>
                                                        <th style="width: 20%;" class="" sort-column-Type="text" column-Name="CreatedOn"  data-sort="CreatedOn">Added On
                                                        </th>
                                                        <th style="width: 13.5%;" class="" sort-column-Type="text" column-Name="CreatedByName"  data-sort="CreatedByName">Added By
                                                        </th>
                                                     
                                                         <th style="width: 10%;text-align:center;" >Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tbl-GLCode-Data-Body">
                                                   
                                                </tbody>
                                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">GL Import</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="cursor:pointer" title="Close" data-dismiss="modal" close-importPopup="true"></i></a>
                           <%-- <button type="button" class="close img-typ-sq"  aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:450px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                
                                <div class="screen-row">
                                <div class="isc-pay-btn-cont" style="float: right;     margin-bottom: 15px;">
                  <a class="isc-theme-blue-btn" id="btn-Save-ExcelData">Upload </a>
                                 <a class="isc-theme-blue-btn" style="margin-left:10px;" close-importPopup="true" >Cancel </a>
                                     </div>
                                     </div>
                               
                               <table class="isc-table-read-optimal isc-table-sorter-s1 ">
                                                <thead>
                                                    <tr>
                                                      
                                                        <th style="width: 20%;">GL Code 
                                                        </th>
                                                        <th style="width: 23%;">GL Description
                                                        </th>
                                                        <th style="width: 20%;">Validation Error
                                                        </th>
                                                        
                                                         <th style="width: 10%;">Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tbl-excel-Data">
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5>1854</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash in Bank - (Regular) Bank of America </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>
                                                  

                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1242</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash on Hand - (CD account) </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>

                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1245</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash on Hand ( Payroll ) Chase Bank </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>

                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1466</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Undeposited funds John Hancock Investments</h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>

                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1342</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash In Bank Chase Bank (Payroll) </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5>1854</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash in Bank - (Regular) Bank of America </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>
                                                  

                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1242</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash on Hand - (CD account) </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>

                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1245</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Cash on Hand ( Payroll ) Chase Bank </h5>
                                                        </td>
                                                        <td>
                                                            <h5> - </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>

                                                  
                                                     <tr>
                                                       
                                                        <td>
                                                            <h5>1242</h5>
                                                        </td>
                                                        <td>
                                                            <h5>Bank Adjustment Account - Auditor info </h5>
                                                        </td>
                                                        <td>
                                                            <h5> GL Code is not matched </h5>
                                                        </td>
                                                      
                                                     
                                                        <td>
                                                        
                                                        
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                               
                           
                            </div>

                        </div>


                    </div>

                </div>
              
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Delete_GL" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Request</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times" style="cursor:pointer" title="Close" cancel-Delete-GL="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Are you sure want to delete the GL ?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="delete-GL-Yes">
                                Yes</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-Delete-GL="true" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
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
    <script src="iscjsengine/PageScript/GLImport.js"></script>
</asp:Content>
