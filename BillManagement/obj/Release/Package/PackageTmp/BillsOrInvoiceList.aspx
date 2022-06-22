<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="BillsOrInvoiceList.aspx.cs" Inherits="BillManagement.BillsOrInvoice" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-money"></i>
                        <h2 style="line-height: 30px;">Bills / Invoice</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right">
                    <div class="align-right mar-top-3">
                        <a class="isc-theme-blue-btn" id="filter-toggle-btn1" title="Group By"><i class="fa fa-clipboard"></i></a>
                        <a class="isc-theme-blue-btn" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                    </div>
                </div>
              


                <div class="cell-right pad-rig-5 mar-top-3">

                    <a class="isc-theme-blue-btn" href="UploadBills.aspx" title="Upload Bills"><i class="fa fa-plus"></i></a>
                </div>



            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
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
                            <select class="form-control select2 " id="slt-bill-invoice" tabindex="-1" aria-hidden="true">
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
                            <select class="form-control select2" tabindex="-1" id="slt-bill-category" aria-hidden="true">
                                <option>Choose Bill Category</option>
                                <option>Standard Invoice		
                                </option>
                                <option>Commercial		
                                </option>
                                <option>Timesheet		
                                </option>
                                <option>Utility Invoice		
                                </option>
                                <option>Transportation		
                                </option>
                            </select>

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control iscdatpkrwdt iscdatepicker" id="bill-date-range" placeholder="Due Date" />

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2" id="slt-bill-status" tabindex="-1" aria-hidden="true">
                                <option>Choose Approval Status</option>
                                <option>Draft
		
                                </option>
                                <option>Rejected
		
                                </option>
                                <option>Pending
		
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
                            <a title="Search" id="btn-filter-search"><i class="fa fa-search"></i></a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset">
                            <a id="btn-filter-reset"><i class="fa fa-refresh"></i></a>
                        </div>
                        <div class="isc-filter-container-close" title="Close Filters" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    <div class="isc-filter-container" id="isc-filter-container1" style="display: none;">

                        <div class="cell-left">
                            <h3 class="isc-lbl-group-by-hdr-s1">Vertical Group By</h3>
                        </div>
                        <div class="div-col-16per isc-bill-grp-mar pad-lft-med isc-wdt-max">

                            <select class="form-control select2" tabindex="-1"  id="slt-Vgroupby" aria-hidden="true">
                              <%--  <option value="StatusName"  attr-type="master">Status</option>
                                <option value="VendorName" selected  attr-type="user">Vendor</option>
                                <option value="InvoiceDate"  attr-type="date">Invoice Date</option>
                                <option value="DueDate"  attr-type="date">Due Date</option>
                                <option value="CategoryName"  attr-type="master">Bill Category</option>--%>

                            </select>


                                
                        </div>
                        <div class="cell-left pad-lft-max ">
                            <h3 class="isc-lbl-group-by-hdr-s1">Horizontal Group By</h3>
                        </div>
                        <div class="div-col-16per isc-bill-grp-mar pad-lft-med isc-wdt-max">
                            <select class="form-control select2" tabindex="-1" id="slt-Hgroupby" aria-hidden="true">
                               <%-- <option value="StatusName" selected attr-type="master">Status</option>
                                <option value="VendorName"  attr-type="user">Vendor</option>
                                <option value="InvoiceDate"  attr-type="date">Invoice Date</option>
                                <option value="DueDate"  attr-type="date">Due Date</option>
                                <option value="CategoryName"  attr-type="master">Bill Category</option>--%>
                            </select>


                        </div>

                        <div class="isc-filter-search isc-go mar-lft-10" title="View By">
                            <a id="btn-groupby-search"><i class="fa fa-search" ></i></a>
                        </div>
                        <div class="isc-filter-search isc-reset" title="Reset">
                            <a id="btn-groupby-reset"><i class="fa fa-refresh"></i></a>
                        </div>
                        <div class="isc-filter-container-close" title="Close Group By" id="isc-filter-container-close1">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    <div class="isc-lst-scrl-cont">
                    <div class="screen-row mar-top-min ">
                          <div class="isc-screen-nav-container-s1">
<ul class="nav nav-tabs" id="lst-Horizontal-tabs">
<%--<li class="active"><a href="#ScrTab1" data-toggle="tab">My Task (6)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>--%>
<%-- <li><a href="#ScrTab3" data-toggle="tab">Work (2)</a> </li>--%>
<%--<li><a href="#ScrTab4" data-toggle="tab">Expenses</a> </li>--%>
</ul>
</div>
                   <%--<div class="isc-screen-nav-container-s1">
                                                    <div class="isc-screen-nav-container-s1">
<div class="scrtabs-tab-container" style="visibility: visible;">
    <div class="scrtabs-tab-scroll-arrow scrtabs-tab-scroll-arrow-left" style="">
<span class="glyphicon glyphicon-chevron-left"></span>
</div>
<div class="scrtabs-tabs-fixed-container" style="width: 1448px;">
<div class="scrtabs-tabs-movable-container" style="width: 1448px;">
<ul class="nav nav-tabs" id="lst-Horizontal-tabs">

</ul>
</div>
</div>
<div class="scrtabs-tab-scroll-arrow scrtabs-tab-scroll-arrow-right" style=""><span class="glyphicon glyphicon-chevron-right"></span></div></div>
</div>
                                                </div>--%>
                    </div>
                    <div class="screen-row">
                       
                            <div class="tab-content">
                                <div class="tab-pane fade active in" id="ScrTab1">
                                    <table id="data-list" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center header-collapse noheader tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 15%; user-select: none;" class=" tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor/Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                 <th style="width: 9%; user-select: none;" class="  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Category</div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class=" tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                  <th style="width: 7%; user-select: none;" class=" tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Invoice Date</div>
                                                </th>
                                                <th style="width: 6%; user-select: none;" class=" tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                               
                                                <th style="width: 10%; user-select: none;" class=" tablesorter-header  text-right  tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Amount ($)</div>
                                                </th>
                                                <th style="width: 11%; user-select: none;" class=" tablesorter-header  text-right  tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Approved Amount ($)</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="noheader text-right tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Balance ($)</div>
                                                </th>
                                                <th style="width: 9%; user-select: none; padding-left:20px;" class="noheader  headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        Status
                                                    </div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="noheader text-left tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Action</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all" id="tbl-bill-invoice-body">
                                           
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="ScrTab2">

                                    <table id="data-list2" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center header-collapse noheader tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 17%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor/Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                 <th style="width: 9%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Category</div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                  <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Invoice Date</div>
                                                </th>
                                                <th style="width: 6%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                               
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Bill Amount</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Approved Amount</center></div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Balance</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="noheader headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        Status
                                                    </div>
                                                </th>
                                                <th style="width: 9%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Action</center></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all">
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand  fa-sort-down"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">Cresswell Socks</h5>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td class="align-center"></td>


                                                <td title="Invoice for the purchase of PO799">
                                                    <h5><a href="CreateNewBill.aspx">Invoice for the purchase of PO799</a></h5>
                                                </td>
                                                <td>
                                                    <h5 class="">391988		

                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5 class="">Utility Invoice		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>150075	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>4/2/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color:red !important;">5/12/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="text-align:right;">$750		
                                                    </h5>
                                                </td>

                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Draft
                                                    </h5>
                                                </td>
                                             <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx"><i class="fa fa-pencil-square-o"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td class="align-center"></td>


                                                <td title="PO-679873">
                                                    <h5><a href="CreateNewBill.aspx">PO-679873</a></h5>
                                                </td>
                                                <td>
                                                    <h5 class="">293991		
		

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5 class="">Transportation		
		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>157870	
	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>4/13/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color:red !important;">5/15/2020		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$926		
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Draft
                                                    </h5>
                                                </td>
                                                <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx"><i class="fa fa-pencil-square-o"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td class="align-center"></td>


                                                <td title="purchase of food suppllies to BU-SI
">
                                                    <h5><a href="CreateNewBill.aspx">purchase of food suppllies to BU-SI</a>
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">195994		
		
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5 class="">Timesheet		
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>159665	
	
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>4/21/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>5/18/2020		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$1,102		
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Draft
                                                    </h5>
                                                </td>
                                               <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx"><i class="fa fa-pencil-square-o"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                    </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane  fade" id="ScrTab3">
                                    <table id="data-list3" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center header-collapse noheader tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 17%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor/Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                 <th style="width: 9%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Category</div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                  <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Invoice Date</div>
                                                </th>
                                                <th style="width: 6%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                               
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Bill Amount</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Approved Amount</center></div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Balance</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="noheader headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        Status
                                                    </div>
                                                </th>
                                                <th style="width: 9%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Action</center></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all">
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand  fa-sort-down"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">Cresswell Socks</h5>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            
                                            
                                            
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td class="align-center"></td>


                                                <td title="invoice for the purchase of PO799">
                                                    <h5><a href="CreateNewBill.aspx">invoice for the purchase of PO799</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">97997		
	
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>	Commercial

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>	161460

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>4/23/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color:red !important;">5/21/2020		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$1,277		
	
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: red !important;">Rejected
                                                    </h5>
                                                </td>
                                            <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx"><i class="fa fa-pencil-square-o" style="padding-right:25px !important;"></i></a>
                                                       
                                                    </td>
                                            </tr>
                                           


                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="ScrTab4">

                                    <table id="data-list4" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center header-collapse noheader tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 17%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor/Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                 <th style="width: 9%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Category</div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                  <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Invoice Date</div>
                                                </th>
                                                <th style="width: 6%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                               
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Bill Amount</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Approved Amount</center></div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Balance</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="noheader headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        Status
                                                    </div>
                                                </th>
                                                <th style="width: 9%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Action</center></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all">
                                            
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand fa-sort-up"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">Diamonz Gems Inc
                                                    </h5>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td class="align-center"></td>


                                                <td title="invoice for the purchase of PO799">
                                                    <h5><a href="CreateNewBill.aspx">invoice for the purchase of PO799</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">745961		
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">Transportation		
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>1795	
	
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>4/24/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color:red !important;">5/24/2020		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$5,750		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #00B0F0 !important;">Pending

                                                    </h5>
                                                </td>
                                             <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx"><i class="fa fa-pencil-square-o" style="padding-right:25px !important;"></i></a>
                                                       
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td class="align-center"></td>


                                                <td title="invoice for the purchase of PO797
">
                                                    <h5><a href="CreateNewBill.aspx">invoice for the purchase of PO797</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">647964			
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">Timesheet			
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>3590
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>4/29/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>5/27/2020		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$3,979		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5></h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #00B0F0 !important;">Pending

                                                    </h5>
                                                </td>
                                              <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="CreateNewBill.aspx"><i class="fa fa-pencil-square-o" style="padding-right:25px !important;"></i></a>
                                                       
                                                    </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>

                                </div>
                                 <div class="tab-pane fade  in" id="ScrTab5">
                                    <table id="data-list5" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center header-collapse noheader tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 17%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor/Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                 <th style="width: 9%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Category</div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                  <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Invoice Date</div>
                                                </th>
                                                <th style="width: 6%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                               
                                                <th style="width: 7%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Bill Amount</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Approved Amount</center></div>
                                                </th>
                                                <th style="width: 7%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Balance</center></div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="noheader headerSortDown tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        Status
                                                    </div>
                                                </th>
                                                <th style="width: 9%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner"><center>Action</center></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all">
                                            
                                            
                                            
                                            
                                            
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand fa-sort-up"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">Diamonz Gems Inc
                                                    </h5>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            
                                            
                                            <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                <td class="align-center"></td>


                                                <td title="invoice for the purchase of PO997">
                                                    <h5><a href="CreateNewBill.aspx">invoice for the purchase of PO997</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">549967		
			
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5 class="">Standard Invoice		
			
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>5385	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>4/11/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color:red !important;">5/30/2020		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$599		
	

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="text-align:right;">$200		

                                                    </h5>
                                                </td>
                                                <td class="isc-bill-amt-pad">
                                                    <h5 style="text-align:right;">$399	

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #3AB050 !important;">Approved

                                                    </h5>
                                                </td>
                                           <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                       
                                                       
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                <td class="align-center"></td>


                                                <td title="Purchase of furtunitures
">
                                                    <h5><a href="CreateNewBill.aspx">Purchase of furtunitures</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">451970		
	
			
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5 class="">Utility Invoice		
	
			
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>7180	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>5/13/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color:red !important;">6/2/2020		
		
                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$500		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="text-align:right;">$145		

                                                    </h5>
                                                </td>
                                                <td class="isc-bill-amt-pad">
                                                    <h5 style="text-align:right;">$355		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #3AB050 !important;">Approved

                                                    </h5>
                                                </td>
                                               <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                       
                                                       
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand fa-sort-up"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">Eclectic Lady Inc

                                                    </h5>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                <td class="align-center"></td>


                                                <td title="invoice for the purchase of PO799">
                                                    <h5><a href="CreateNewBill.aspx">invoice for the purchase of PO799</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">255976			
                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5 class="">Transportation			
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>10770	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>5/20/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>6/5/2020		

                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$707		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="text-align:right;">$207		

                                                    </h5>
                                                </td>
                                                <td class="isc-bill-amt-pad">
                                                    <h5 style="text-align:right;">$500		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #3AB050 !important;">Approved

                                                    </h5>
                                                </td>
                                               <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                       
                                                       
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                <td class="align-center"></td>


                                                <td title="invoice for the purchase of PO799
">
                                                    <h5><a href="CreateNewBill.aspx">invoice for the purchase of PO799</a>

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">157979		
		
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5 class="">Commercial		
		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>12565	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>5/23/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>6/8/2020		

                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$3,500		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="text-align:right;">$1,500		

                                                    </h5>
                                                </td>
                                                <td class="isc-bill-amt-pad">
                                                    <h5 style="text-align:right;">$1,500		

                                                    </h5>
                                                </td>
                                                <td >
                                                    <h5 style="color: #3AB050 !important;">Approved

                                                    </h5>
                                                </td>
                                               <td style="text-align:center;">
                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                       
                                                       
                                                    </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                <td class="align-center"></td>


                                                <td title="Purchase of indoor  plants">
                                                    <h5><a href="CreateNewBill.aspx">Purchase of indoor  plants</a></h5>
                                                </td>
                                                <td>
                                                    <h5 class="">353973		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">Utility Invoice		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>8975	

                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>5/30/2020		
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5>6/11/2020		

                                                    </h5>
                                                </td>


                                                <td>
                                                    <h5 style="text-align:right;">$531		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="text-align:right;">$300		

                                                    </h5>
                                                </td>
                                                <td class="isc-bill-amt-pad">
                                                    <h5 style="text-align:right;">$231		

                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 style="color: #3AB050 !important;">Approved

                                                    </h5>
                                                </td>
                                              <td style="text-align:center;">
                                                      <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                       
                                                       
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
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comment" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">View Comments <span>(Audio To Text Transcription Service)</span></h4>


                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">

                        <div class="form-body">

                            <div class="isc-mp-cmt-sec-par-con-s1">
                                <div class="isc-coll-hdr-cmt-con-s2">
                                    <div class="isc-act-cir-cell-acc-hdr-s2">
                                        RS
                                    </div>
                                    <h3 class="isc-lbl-acc-hdr-sec-s5">Ravishankar Sivanesan<span>May 29, 5:15 PM</span></h3>
                                </div>
                                <div class="isc-mp-cmt-sec-par-bdy-con-s1">
                                    <p class="isc-lbl-mp-cmt-sec-s1">Master Data for Milestone Plan</p>
                                    <p class="isc-lbl-mp-cmt-sec-s1">You are hereby receiving access to the Client Portal Application provided by Innospire (the “Application”). You are hereby granted a limited license to access and use the Application solely for the purpose of sharing documents and data (the “Data”) as needed with Innospire during the term of the Innospire Services.</p>
                                </div>
                            </div>
                        </div>




                    </div>
                    <div class="isc-cmt-sec-scroll-foot-con-s1">

                        <input type="text" class="isc-cmt-sec-txt-box-s1" placeholder="Type your comment here">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <a class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">Submit</a>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
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
                              <a><i class="fa fa-times" style="color:#8A8A8A;" id="attachment-close" title="Close" data-dismiss="modal" aria-hidden="true"></i></a>
                           <%-- <button type="button" id="attachment-close" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
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
                            <button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"   delete-cancel="true" aria-hidden="true">
                            </button>
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
    <script>
(function($) {

	$(".cata-sub-nav").on('scroll', function() {
    	$val = $(this).scrollLeft();

    	if($(this).scrollLeft() + $(this).innerWidth()>=$(this)[0].scrollWidth){
          $(".nav-next").hide();
        } else {
    		$(".nav-next").show();
    	}

    	if($val == 0){
    		$(".nav-prev").hide();
    	} else {
    		$(".nav-prev").show();
    	}
  	});
	console.log( 'init-scroll: ' + $(".nav-next").scrollLeft() );
	$(".nav-next").on("click", function(){
		$(".cata-sub-nav").animate( { scrollLeft: '+=460' }, 200);
		
	});
	$(".nav-prev").on("click", function(){
		$(".cata-sub-nav").animate( { scrollLeft: '-=460' }, 200);
	});

	

})(jQuery);
</script>
    <script src="iscjsengine/PageScript/BillsOrInvoiceList.js" type="text/javascript"></script>
</asp:Content>
