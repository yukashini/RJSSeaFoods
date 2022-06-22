<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="UserHome.aspx.cs" Inherits="BillManagement.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-home"></i>
                        <h2 style="line-height: 30px;"> Home</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right">
                 <div class="align-right mar-top-3">
                   <%-- <a class="isc-theme-blue-btn" id="filter-toggle-btn1" title="Group By"><i class="fa fa-clipboard"></i></a>--%>
                    <a class="isc-theme-blue-btn" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>
                </div>
                <div class="cell-right pad-rig-5 mar-top-3">

                    <a class="isc-theme-blue-btn" href="UploadBills.aspx"><%--<i class="fa fa-plus"></i>--%> Upload Bills</a>
                </div>
              

            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="isc-manger-home-par-con-s1">

                            <ul class="isc-hme-sec-kpi-nav-s1">

                                <li><a href="#" title="Total Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s2">
                                            <i class="fa fa-bar-chart-o"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Total Bills/Invoice

                                        </h3>


                                        <h2 id="total_Bills">0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s3" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Unapproved Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s1">
                                            <i class="fa fa-exclamation-circle"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Unapproved Bills/Invoice

                                        </h3>


                                        <h2 id="unapproved_bills">0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s4" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Approved Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s4">
                                            <i class="fa fa-check"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Approved Bills/Invoice

                                        </h3>


                                        <h2 id="approved_Bills">0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s5" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Rejected Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s3">
                                            <i class="fa fa-times"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Rejected Bills/Invoice

                                        </h3>


                                        <h2 id="rejected_Bills">0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s6" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>

                            </ul>
                        </div>
                    </div>
                    <div class="screen-row mar-top-10">
                            <div class="isc-filter-container" id="isc-filter-container" style="display: none;">



                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 " id="slt-vendor" tabindex="-1" aria-hidden="true">
                                <option>Choose Vendor</option>
                                <option>Cresswell Socks</option>
                                <option>Diamonz Gems Inc</option>
                                <option>Eclectic Lady Inc</option>


                            </select>

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 " id="slt-Bills" tabindex="-1" aria-hidden="true">
                                <option>Choose Bills/Invoice #</option>
                                <option>303768		
                                </option>
                                <option>293991		
                                </option>
                                <option>195994		
                                </option>
                                <option>97997		
                                </option>

                            </select>

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control iscdatpkrwdt iscdatepicker" id="date-range" placeholder=" Due Date" />

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 " id="slt-status" tabindex="-1" aria-hidden="true">
                                <option>Choose  Status</option>
                                <option>Pending Submission
		
                                </option>
                                <option>Rejected
		
                                </option>
                                <option>Approval Pending
		
                                </option>
                                <option>Approved
		
                                </option>

                            </select>

                        </div>
                        <%--<div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>Choose Payment Status</option>
                                <option>Paid
		
                                </option>
                                <option>Yet to pay
		
                                </option>
                                <option>Pending
		
                                </option>

                            </select>

                        </div>--%>
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Search" id="btn-search"><i class="fa fa-search"></i></a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset">
                            <a id="btn-reset"><i class="fa fa-refresh"></i></a>
                        </div>
                        <div class="isc-filter-container-close" title="Close Filters" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    </div>
                    <div class="screen-row mar-top-min">
                        <div class="screen-tab-container-s5">
                            <ul class="tab-screen-pip-s1" id="bill_KPI">

                                <li class="active"><a href="#ScrTab1" data-workflow="10011" data-toggle="tab" title="Draft Bills/Invoice">Draft Bills/Invoice <span style="background-color: #ffaa0d; border-color: #ffaa0d; color: #fff;">9</span></a></li>
                                <li class=""><a href="#ScrTab2" data-workflow="10012" data-toggle="tab"  title="Follow up Bills/Invoice">Follow up Bills/Invoice<span style="background-color: #00B0F0; border-color: #00B0F0; color: #fff;">7</span></a></li>
                                <li class=""><a href="#ScrTab3" data-workflow="10013" data-toggle="tab" title="Rejected Billls/Invoice">Rejected Billls/Invoice
                                    <span style="background-color: #f93737; border-color: #f93737; color: #fff;">5</span></a></li>
                              
                            </ul>
                        </div>
                        
                    </div>
                    <div class="mar-top-med  isc-tab-src-cont-res">
                            <div class="tab-content">
                                <div class="tab-pane fade active in" id="ScrTab1">
                                    <table class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" id="userHomeTable">
                                            <thead>
                                                <tr role="row" class="tablesorter-headerRow" >

                                                    <th style="width: 15%; user-select: none;" sort-column-Type="text" column-Name="VendorName"  data-sort="VendorName"  class="header tablesorter-header sorting-asc  tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Vendor</div>
                                                    </th> 
                                                    <th style="width: 15%; user-select: none;" sort-column-Type="text" column-Name="BillID"  data-sort="BillID" class="header  tablesorter-header sorting-asc tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Bill / Invoice #</div>
                                                    </th>
                                                    <th style="width: 19%; user-select: none;" sort-column-Type="text" column-Name="Description" data-sort="Description" class="header  sorting-asc tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">
                                                            Bill Description
                                                        </div>
                                                    </th>
                                                    <th style="width: 13%; user-select: none;" sort-column-Type="date" data-sort="DueDate" column-Name="DueDate" class="header  sorting-asc tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">
                                                            Due Date		
                                                        </div>
                                                    </th>
                                                   <th style="width: 11%; user-select: none;" sort-column-Type="number" data-sort="StatusName"  column-Name="StatusName" class="header sorting-asc tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Status</div>
                                                    </th>
                                                    <th style="width: 11%; user-select: none;"  sort-column-Type="number" data-sort="Amount"  column-Name="Amount"  class="header sorting-asc tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner"><center>Payable Amount ($)</center></div>
                                                    </th>

                                                    <th style="width: 10%; user-select: none;" class="noheader " data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" >
                                                        <div class="tablesorter-header-inner"><center>Action</center></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl-bill-body">
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                <div class="tab-pane fade  in" id="ScrTab2">
                                    <table class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41">
                                            <thead>
                                                <tr role="row" class="tablesorter-headerRow" >

                                                    <th style="width: 15%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Vendor</div>
                                                    </th>
                                                    <th style="width: 19%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Bill / Invoice #</div>
                                                    </th>
                                                    <th style="width: 20%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">
                                                            Bill Description
                                                        </div>
                                                    </th>
                                                    <th style="width: 10%; user-select: none;" class="header headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">
                                                            Due Date		
                                                        </div>
                                                    </th>
                                                       <th style="width: 10%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Status</div>
                                                    </th>
                                                    <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner"><center>Payable Amount</center></div>
                                                    </th>

                                                    <th style="width: 10%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner"><center>Action</center></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Nicholson LLC.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500095			
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">Electric Metered Bill
                                                        </h5>
                                                    </td>
                                                    <td>
                                                         <h4 style="color:red !important;">5/19/2020
                                                        </h4>
                                                    </td>
                                                    <td>
                                                        <h5 >Approval Pending
                                    </h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$750</h5>
                                                    </td>

                                                    <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                      
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Johnson & Co</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500270			
		
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">Electric Un Metered Bill

                                                        </h5>
                                                    </td>
                                                    <td>
                                                         <h4 style="color:red !important;">5/20/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                        <h5 >Approval Pending
                                    </h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$900</h5>
                                                    </td>

                                                  <td style="text-align:center;">
                                                       <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                    
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Johnson & Co</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500445			
		
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">invoice for the purchase of PO799


                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4 style="color:red !important;">5/21/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                         <h5 >Approval Pending
                                    </h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$550</h5>
                                                    </td>

                                                 <td style="text-align:center;">
                                                      <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                      
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Baker Sanders Inc.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500620			
		
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">PO-679873
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4 style="color:red !important;">5/22/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                       <h5>Approval Pending
                                    </h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$200</h5>
                                                    </td>

                                                  <td style="text-align:center;">
                                                       <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                     
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Baker Sanders Inc.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500795			

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">invoice for the purchase of PO799

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4>5/23/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                         <h5>Approval Pending
                                    </h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$165</h5>
                                                    </td>

                                                  <td style="text-align:center;">
                                                       <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                       
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Baker Sanders Inc.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500970		

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">invoice for the purchase of PO799


                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4>5/24/2020
                                                        </h4>
                                                    </td>
                                                    <td>
                                                      <h5 >Approval Pending
                                    </h5></td>
                                                    <td>
                                                        <h5 style="text-align:right;">$130</h5>
                                                    </td>
<td style="text-align:center;"> <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                       
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> BSVGP Inc.</a>
</h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500620			

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">PO-679873

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4>5/25/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                        <h5 >Approval Pending
                                    </h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$700</h5>
                                                    </td>

                                                   <td style="text-align:center;">
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up"/>
                                                      
                                                       
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                   <div class="tab-pane fade  in" id="ScrTab3">
                                       <table class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41">
                                            <thead>
                                                <tr role="row" class="tablesorter-headerRow" >

                                                    <th style="width: 15%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Vendor</div>
                                                    </th>
                                                    <th style="width: 19%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Bill / Invoice #</div>
                                                    </th>
                                                    <th style="width: 20%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">
                                                            Bill Description
                                                        </div>
                                                    </th>
                                                    <th style="width: 10%; user-select: none;" class="header headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">
                                                            Due Date		
                                                        </div>
                                                    </th>
                                                    <th style="width: 10%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner">Status</div>
                                                    </th>
                                                    <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner"><center>Payable Amount</center></div>
                                                    </th>

                                                    <th style="width: 10%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                        <div class="tablesorter-header-inner"><center>Action</center></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Nicholson LLC.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500095			
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">Electric Metered Bill
                                                        </h5>
                                                    </td>
                                                    <td>
                                                         <h4 style="color:red !important;">5/19/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                        <h5 >Rejected</h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$750</h5>
                                                    </td>

                                                    <td style="text-align:center;">
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                      
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Johnson & Co</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500270			
		
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">Electric Un Metered Bill

                                                        </h5>
                                                    </td>
                                                    <td>
                                                         <h4 style="color:red !important;">5/20/2020
                                                        </h4>
                                                    </td>
                                                    <td>
                                                      <h5 >Rejected</h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$900</h5>
                                                    </td>

                                                    <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                       <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                      
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Johnson & Co</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500445			
		
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">invoice for the purchase of PO799


                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4 style="color:red !important;">5/21/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                      <h5 >Rejected</h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$550</h5>
                                                    </td>

                                                    <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                       
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Baker Sanders Inc.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500620			
		
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">PO-679873
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4 style="color:red !important;">5/22/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                      <h5 >Rejected</h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$200</h5>
                                                    </td>

                                                    <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                        
                                                    </td>
                                                </tr>
                                                <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                    <td>
                                                        <h5><a href="CreateNewBill.aspx"> Baker Sanders Inc.</a></h5>
                                                    </td>


                                                    <td>
                                                        <h5>1500795			

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="">invoice for the purchase of PO799

                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h4>5/23/2020
                                                        </h4>
                                                    </td>
                                                     <td>
                                                      <h5 >Rejected</h5>
                                                    </td>
                                                    <td>
                                                        <h5 style="text-align:right;">$165</h5>
                                                    </td>

                                                    <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                        
                                                    </td>
                                                </tr>
                                               
                                            </tbody>
                                        </table>
                                   </div>
                                </div>
                        </div>
                    



                </div>
            </div>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="fileName">Passmoregas.pdf</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#8A8A8A;" id="attachment-close" data-dismiss="modal" title="Close" aria-hidden="true"></i></a>
                           <%-- <button type="button" class="close img-typ-sq" id="attachment-close" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:450px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                          <div class="isc-sec-in-con-y-scroll-con-s1">
                                                        <div class="isc-sec-in-con-y-scroll-bdy-con-s2" id="billFrameBlock">
                                                            <%--<iframe src="gasDefault.pdf" class="isc-new-exp-pdf" style="border: none; width: 100%; height: 400px; overflow: hidden; overflow-y: auto;"></iframe>--%>
                                                        </div>
                                                    </div>
                                    </div>

                                </div>
                               
                               
                               
                           
                            </div>

                        </div>


                    </div>

                </div>
              <%--  <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                            Add</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>--%>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
         <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Delete</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#8A8A8A;" title="Cancel"  delete-cancel="true" aria-hidden="true"></i></a>
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
                                        <h4>Are you sure want to delete the bill?</h4>

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
    <script type="text/javascript">
        $(document).on('click', '.isc-tr-show-parentfiles-s1', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.nextUntil('tr.isc-tr-show-parentfiles-s1').slideToggle(100, function () {
            });
        });


        $("#chk-clk").click(function () {
            if ($(this).prop("checked")) {
                $("#chk-clk-opn").show();
            }
            else {
                $("#chk-clk-opn").hide();
            }
            $("#chk-clk").uniform();
        });
        $(document).ready(function () {

            $('.select2').select2();

            $('.iscdatepicker').datepicker({
                format: 'mm/dd/yyyy',
                orientation: "auto bottom"
            });
            $("#filter_togle").click(function () {
                $("#filter_con").toggle();


            });
            $("#filter_clse").click(function () {

                $(".rem_filt_con").hide();
                $(".isc-sec-filter-s1 li").removeClass("active");
            });
            $("#filter_togle_s1").click(function () {
                $("#filter_con_s1").toggle();


            });
            $("#filter_clse_s1").click(function () {

                $(".rem_filt_con").hide();
                $(".isc-sec-filter-s1 li").removeClass("active");
            });

        });

        $("#det_lft_coll_click").click(function () {
            $("#det_lft_coll_click").hide();
            $("#lft_coll_panel").show();
            $("#rgt_coll_panel").removeClass().addClass('div-col-85per');
        });
        $("#icn-coll-pan-con").click(function () {
            $("#det_lft_coll_click").show();
            $("#lft_coll_panel").hide();
            $("#rgt_coll_panel").removeClass().addClass('div-col-100per pad-lft-med');
        });
        $(document).ready(function () {
            $(".isc-tr-show-parentfiles-s1").click(function () {
                $(".isc-tr-show-subfiles-s1").toggle();
            });
        });

        $(document).on('click', '.isc-table-toggle-parent td:first-child', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.parent().nextUntil('tr.isc-table-toggle-parent').slideToggle(function () { });
            $(this).find("i").toggleClass("fa-plus").delay("slow");
            $(this).find("i").toggleClass("fa-minus").delay("slow");
        });
        $(document).ready(function () {
            $('#data-list tbody tr:first.isc-table-toggle-parent,#data-list2 tbody tr:first.isc-table-toggle-parent,#data-list3 tbody tr:first.isc-table-toggle-parent,#data-list4 tbody tr:first.isc-table-toggle-parent').nextUntil('tr.isc-table-toggle-parent').slideToggle(function () { });
            $('#data-list tbody tr:first.isc-table-toggle-parent,#data-list2 tbody tr:first.isc-table-toggle-parent,#data-list3 tbody tr:first.isc-table-toggle-parent,#data-list4 tbody tr:first.isc-table-toggle-parent').find(".isc-expand").toggleClass("fa-plus").delay("slow");
            $('#data-list tbody tr:first.isc-table-toggle-parent,#data-list2 tbody tr:first.isc-table-toggle-parent,#data-list3 tbody tr:first.isc-table-toggle-parent,#data-list4 tbody tr:first.isc-table-toggle-parent').find(".isc-expand").toggleClass("fa-minus").delay("slow");
        });
        $(document).ready(function () {
            $("#ext-clk").click(function () {
                $("#isc-ext-inp-data").css("display", "block");
                $("#isc-int-inp-data").css("display", "none");
            });
            $("#int-clk").click(function () {
                $("#isc-int-inp-data").css("display", "block");
                $("#isc-ext-inp-data").css("display", "none");



            });
        });
        //$(document).ready(function () {
        //    $('.date-time-picker').datetimepicker();
        //});
    </script>
    <script>
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });


    </script>
   
    <script src="iscjsengine/PageScript/UserHome.js" type="text/javascript"></script>
</asp:Content>
