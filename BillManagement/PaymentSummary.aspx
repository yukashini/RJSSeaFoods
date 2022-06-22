<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="PaymentSummary.aspx.cs" Inherits="BillManagement.PaymentSummary" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <asp:HiddenField runat="server" ID="lstbillexport" />
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-money"></i>
                        <h2 style="line-height: 30px;">Payment Summary</h2>
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

                    <%--  <a class="isc-theme-blue-btn" href="#">Export</a>--%>
                </div>


                <div class="cell-right pad-rig-5 mar-top-3">
                    <asp:Button type="button" UseSubmitBehavior="false" ID="Button1" text="Export" class="isc-theme-blue-btn isc-export-btn" runat="server"  OnClick="ExportExcel" />
                    <%--<a class="isc-theme-blue-btn" href="#">Export</a>--%>
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
                            <input type="text" class="form-control iscdatepicker iscdatpkrwdt" id="bill-date-range"  placeholder="Due Date" />

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 " id="slt-bill-status" tabindex="-1" aria-hidden="true">
                                <option>Choose Payment Status</option>
                                <option>Payment Pending
		
                                </option>
                                <option>Failed
		
                                </option>
                                <option>Completed
		
                                </option>

                            </select>

                        </div>

                        <div class="isc-filter-search isc-go  mar-lft-10" id="btn-filter-search" title="Search">
                            <a title="Search"><i class="fa fa-search"></i></a>
                        </div>

                        <div class="isc-filter-search isc-reset" id="btn-filter-reset" title="Reset">
                            <a><i class="fa fa-refresh"></i></a>
                        </div>
                        <div class="isc-filter-container-close" title="Close Filters" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    <div class="isc-filter-container" title="Close Group By" id="isc-filter-container1" style="display: none;">

                        <div class="cell-left">
                            <h3 class="isc-lbl-group-by-hdr-s1">Vertical Group By</h3>
                        </div>
                        <div class="div-col-16per pad-lft-med isc-bill-grp-mar isc-wdt-max">

                            <select class="form-control select2 " id="slt-Vgroupby" tabindex="-1" aria-hidden="true">
                                <option value="PaymentStatusName" attr-type="master" >Status</option>
                                <option value="VendorName" attr-type="master" selected>Vendor</option>
                            </select>



                        </div>
                        <div class="cell-left pad-lft-max ">
                            <h3 class="isc-lbl-group-by-hdr-s1">Horizontal Group By</h3>
                        </div>
                        <div class="div-col-16per pad-lft-med isc-bill-grp-mar isc-wdt-max">
                            <select class="form-control select2 " id="slt-Hgroupby" tabindex="-1" aria-hidden="true">
                              <option value="PaymentStatusName" attr-type="master" selected>Status</option>
                                <option value="VendorName" attr-type="master">Vendor</option>


                            </select>

                        </div>

                        <div class="isc-filter-search isc-go mar-lft-10" title="View by" id="btn-groupby-search" >
                            <a><i class="fa fa-search" title=""></i></a>
                        </div>
                        <div class="isc-filter-search isc-reset" title="Reset" id="btn-groupby-reset">
                            <a><i class="fa fa-refresh"></i></a>
                        </div>
                        <div class="isc-filter-container-close" id="isc-filter-container-close1">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                  
                    <div class="screen-row mar-top-min">
                   <%--     <div class="isc-screen-nav-container-s1">
                                                    <div class="isc-screen-nav-container-s1">--%>
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
<%--<div class="scrtabs-tab-container" style="visibility: visible;"><div class="scrtabs-tab-scroll-arrow scrtabs-tab-scroll-arrow-left" style="">
<span class="glyphicon glyphicon-chevron-left"></span>
</div>
<div class="scrtabs-tabs-fixed-container" style="width: 1448px;">
<div class="scrtabs-tabs-movable-container" style="width: 1448px;">
<ul class="nav nav-tabs" id="lst-Horizontal-tabs">
<li class="active"><a href="#ScrTab1" data-toggle="tab">My Task (6)</a> </li>
<li><a href="#ScrTab2" data-toggle="tab">My Followups (5)</a> </li>


</ul>
</div>
</div>
<div class="scrtabs-tab-scroll-arrow scrtabs-tab-scroll-arrow-right" style=""><span class="glyphicon glyphicon-chevron-right"></span></div></div>--%>
<%--</div>
                                                </div>--%>
                    </div>
                      <div class="isc-lst-scrl-cont">
                    <div class="screen-row">
                        <div class="">
                            <div class="tab-content">
                                <div class="tab-pane fade active in" id="ScrTab1">
                                    <table id="data-list" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 15%; user-select: none;" class="" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                <th style="width: 20%; user-select: none;" class="" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                                   <th style="width: 8%; user-select: none;" class="" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Paid On</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Payable Amount ($)</center>
                                                    </div>
                                                </th>
                                                <th style="width: 12%; user-select: none;" class="" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Payment Status</div>
                                                </th>

                                                <th style="width: 8%; user-select: none;" class="" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Action</center>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all" id="payment-Summary-Table-Body">
                                           
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
                                                    <div class="tablesorter-header-inner">Vendor</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                <th style="width: 20%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Description</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Payable Amount</center>
                                                    </div>
                                                </th>
                                                <th style="width: 12%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Payment Status</div>
                                                </th>

                                                <th style="width: 8%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Action</center>
                                                    </div>
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
                                                
                                            </tr>
                                          <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>15007				
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO15001
		

                                                    </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO799" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO799
	

                                                    </h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:red !important;">3/17/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$95			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Pending 
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>363943</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO52886 </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO799" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO799

</h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:red !important;">3/21/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$150			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Pending 
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364042</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO75617 </h5>
                                                </td>
                                                <td title="Purchase of furtunitures" style="cursor:pointer;">
                                                    <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">Purchase of furtunitures</h5>
                                                </td>

                                                <td>
                                                    <h5>4/3/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$45			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Pending 
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364075	</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO83194 </h5>
                                                </td>
                                                <td title="Purchase of indoor  plants" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">Purchase of indoor  plants
</h5>
                                                </td>

                                                <td>
                                                    <h5>4/18/2020	
		</h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$95			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: #FFCA00 !important;">Pending 
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
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

                                                <th style="width: 15%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                <th style="width: 20%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                                   <th style="width: 8%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Paid On</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Payable Amount</center>
                                                    </div>
                                                </th>
                                                <th style="width: 12%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Payment Status</div>
                                                </th>

                                                <th style="width: 8%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Action</center>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all">
                                            
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand  fa-sort-down"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">United Health Group</h5>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                            </tr>
                                            
                                            <tr class="isc-table-toggle-child" style="display:none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364240				
	</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO121079
 </h5>
                                                </td>
                                                <td title="Purchase of indoor  plants" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">Purchase of indoor  plants</h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:red !important;">3/16/2020	
		</h5>
                                                </td>
                                                  <td>
                                                    <h5>2/21/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$155		
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: red !important;">Failed
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display:none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364207	</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO113502 </h5>
                                                </td>
                                                <td title="Purchase of indoor  plants" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">Purchase of indoor  plants</h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:red !important;">3/19/2020	
		</h5>
                                                </td>
                                                  <td>
                                                    <h5>2/25/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$131			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color:red !important">Failed
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>21738				
				 </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO30155

                                                    </h5>
                                                </td>
                                                <td title="purchase of food suppllies to BU-SI" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">purchase of food suppllies to BU-SI

                                                    </h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:red !important;">3/24/2020			
		
                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5 >3/16/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$35			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: red !important;">Failed
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364108				
	</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO90771
 </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO799" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO799

</h5>
                                                </td>

                                                <td>
                                                    <h5>3/28/2020	
		</h5>
                                                </td>
                                                  <td>
                                                    <h5>2/22/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$109			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                   <h5 style="color: red !important;">Failed
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
                                                </td>
                                            </tr>
                                            
                                            
                                            
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364009				
				
</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO68040 </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO997" style="cursor:pointer;">
                                                    <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO997

</h5>
                                                </td>

                                                <td>
                                                    <h5>4/6/2020			
		
                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5>3/21/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$45			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: red !important;">Failed
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag"></i></a>
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

                                                <th style="width: 15%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                <th style="width: 20%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Description</div>
                                                </th>
                                                <th style="width: 8%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                                   <th style="width: 8%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Paid On</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Payable Amount</center>
                                                    </div>
                                                </th>
                                                   <th style="width: 8%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                    Payment Method
                                                    </div>
                                                </th>
                                                <th style="width: 12%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Payment Status</div>
                                                </th>

                                             
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all">
                                            <tr class="isc-table-toggle-parent" role="row">
                                                <td class="align-center">
                                                    <i class="fa isc-expand  fa-sort-down"></i>
                                                </td>

                                                <td>
                                                    <h5 class="">United Health Group</h5>
                                                </td>
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
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364141				
				
	</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO98348

 </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO799" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO799


</h5>
                                                </td>

                                                <td>
                                                    <h5  style="color: red;">3/25/2020	
		</h5>
                                                </td>
                                                  <td>
                                                    <h5>2/18/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$151			
		
                                                    </h5>
                                                </td>


                                                 <td>
                                                    <h5>ACH</h5>
                                                </td>
                                                <td>
                                                     <h5 style="color:#3AB050 !important">Completed
                                                    </h5>
                                                </td>
                                               
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>364174				
				
				
	</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO105925


 </h5>
                                                </td>
                                                <td title="Purchase of indoor  plants" style="cursor:pointer;">
                                                    <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">Purchase of indoor  plants</h5>
                                                </td>

                                                <td>
                                                    <h5 style="color: red;">3/22/2020	
		</h5>
                                                </td>
                                                  <td>
                                                    <h5>2/7/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$175			
		
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>Wire Transfer</h5>
                                                </td>


                                                <td>
                                                    <h5 style="color:#3AB050 !important">Completed
                                                    </h5>
                                                </td>
                                                
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>357191				
				
				 </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO37732 </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO799" style="cursor:pointer;">
                                                    <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO799

                                                    </h5>
                                                </td>

                                                <td>
                                                    <h5 >4/18/2020			
		
                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5>3/11/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$175			
		
                                                    </h5>
                                                </td>

                                                <td>
                                                    <h5>Check</h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:#3AB050 !important">Completed
                                                    </h5>
                                                </td>
                                                
                                            </tr>
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>360579				
				
				
				 </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO45309
 </h5>
                                                </td>
                                                <td title="PO56846" style="cursor:pointer;">
                                                    <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">PO56846
</h5>
                                                </td>

                                                <td>
                                                    <h5 >4/15/2020			
		
                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5>3/27/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$99			
		
                                                    </h5>
                                                </td>

                                                 <td>
                                                    <h5>Credit Card</h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:#3AB050 !important">Completed
                                                    </h5>
                                                </td>
                                            
                                            </tr>
                                            
                                            <tr class="isc-table-toggle-child" style="display: none;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>363976				
</h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO60463
 </h5>
                                                </td>
                                                <td title="invoice for the purchase of PO797" style="cursor:pointer;">
                                                    <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">invoice for the purchase of PO797

</h5>
                                                </td>

                                                <td>
                                                    <h5 >4/9/2020			
		
                                                    </h5>
                                                </td>
                                                  <td>
                                                    <h5>3/18/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align:right;">$35			
		
                                                    </h5>
                                                </td>
                                                 <td>
                                                    <h5>Debit card</h5>
                                                </td>


                                                <td>
                                                    <h5 style="color:#3AB050 !important">Completed
                                                    </h5>
                                                </td>
                                              
                                            </tr>
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                          
                                        </tbody>
                                    </table>

                                </div>
                                 <div class="tab-pane fade" id="ScrTab5">
                                          <table id="data-list4" class="isc-table-read-optimal  isc-table-sorter-s1 tablesorter tablesorter-default tablesorter587f009da5c41" role="grid">
                                        <thead>
                                            <tr role="row" class="tablesorter-headerRow">
                                                <th style="width: 3%; user-select: none;" class="align-center header-collapse noheader tablesorter-header tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label=": No sort applied, activate to apply an ascending sort">
                                                    <%--<div class="tablesorter-header-inner">
                                                        <i class="fa fa-minus"></i>
                                                    </div>--%>
                                                </th>

                                                <th style="width: 17%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Designation: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Vendor</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header  tablesorter-header tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Name: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bills/Invoice #</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="4" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Address: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">PO #</div>
                                                </th>
                                                <th style="width: 20%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Bill Description</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="5" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Department: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Due Date</div>
                                                </th>
                                                <th style="width: 10%; user-select: none;" class="header tablesorter-header tablesorter-headerUnSorted" data-column="6" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Reporting To: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Payable Amount</center>
                                                    </div>
                                                </th>
                                                <th style="width: 12%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">Payment Status</div>
                                                </th>

                                                <th style="width: 8%; user-select: none;" class="noheader tablesorter-header tablesorter-headerUnSorted" data-column="7" tabindex="0" scope="col" role="columnheader" aria-disabled="false" aria-controls="data-list" unselectable="on" aria-sort="none" aria-label="Action: No sort applied, activate to apply an ascending sort">
                                                    <div class="tablesorter-header-inner">
                                                        <center>Action</center>
                                                    </div>
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
                                                
                                            </tr>
                                     <tr class="isc-table-toggle-child" style="display: table-row;" role="row">
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <h5>18384				
				
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 class="">PO22578
                                                    </h5>
                                                </td>
                                                <td title="PO-679873" style="cursor:pointer;">
                                                   <h5 style="color:#428bca !important;" href="#mp_pay-det" data-toggle="modal">PO-679873
                                                    </h5>
                                                </td>

                                                <td>
                                                    <h5 style="color:red !important;">4/24/2020			
		
                                                    </h5>
                                                </td>
                                                <td  class="isc-bill-amt-pad">
                                                    <h5 style="text-align: right;">$75			
		
                                                    </h5>
                                                </td>



                                                <td>
                                                    <h5 style="color: #00B0F0 !important;">Flagged 
                                                    </h5>
                                                </td>
                                                <td style="text-align: center;"><a  href="#mp_pay-det" data-toggle="modal">  <img src="img/makepayment.png" class="isc-make-pay" title="Pay Now"/></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Flagged " href="#"><i class="fa fa-flag" style="color:#F57F17;"></i></a>
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
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_pay-det" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Payment</h4>
                        </div>
                        <div class="cell-right">
                             <a><i class="fa fa-times" style="color:#8A8A8A;"  cancel-pay="true" title="Close" data-dismiss="modal" aria-hidden="true"></i></a>
                          <%--  <button type="button" class="close img-typ-sq" cancel-pay="true" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-50per">

                                    
                                        <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">Vendor :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt" id="lbl-Vendor-Name">Diamonz Gems Inc </label>
                                           
                                        </div>
    </div>
                                        <div class="div-col-50per">
                                               <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">Invoice # :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt" id="lbl-invoice">15478</label>
                                            
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-50per">
                                      <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">Bill Description :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per">
                                                <label class="mar-top-5 isc-bill-pay-det-txt" id="lbl-Bill-Description">Invoice for the purchase of PO799</label>
                                          
                                        </div>
                                            </div>
                                        <div class="div-col-50per">
                                                 <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">Approved Amount :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per">
                                              <label class="mar-top-5 isc-bill-pay-det-txt" id="lbl-Approved-Amount">$750</label>
                                           
                                        </div>
                                          </div>
                                        
                                          
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                       <div class="div-col-50per">
                                          <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">Due Date :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt" id="lbl-Due-Date">4/24/2020</label>
                                   
                                        </div>
                                       </div>
                                        <div class="div-col-50per">
                                              <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">Payment Terms :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per">
                                              <label class="mar-top-5  isc-bill-pay-det-txt" id="lbl-Payment-term">NET30</label>
                                          
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                      
                                       <div class="div-col-50per">
                                            <div class="div-col-40per isc-wid-40per">
                                            <label class="mar-top-5">View Bill :</label>
                                        </div>
                                        <div class="div-col-50per isc-wid-40per isc-upd-bill-img-data">
                                              <%-- <a class="mar-top-5 isc-bill-trk-pop-cls" href="#mp_bill-view" data-toggle="modal">
                                                     <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/>
                                                   Passmoregass.pdf</a> --%>
                                                              <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/ id="pdf-icon" style="display:none">
                                                               <img src="img/appimages/image.jpg" id="img-icon" class="isc-pdf-img1"  style="display:none"/>
                                                              <a id="billFileName" class="isc-cursor"> Passmoregass.pdf</a></h5>
                                          
                                        </div>
                                       </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                       <div class="div-col-100per">
                                            <div class="div-col-20per">
                                            <label class="mar-top-5">Approver Comments :</label>
                                        </div>
                                        <div class="div-col-80per">
                                           <label class="mar-top-5  isc-bill-pay-det-txt" id="lbl-Approver-Comment">Bill approved for payment</label>
                                        </div>
                                       </div>

                                    </div>

                                </div>
                                
                                
                                
                                
                                
                            </div>

                        </div>
                        <div class="screen-row mar-top-20">
                                 <div class="isc-bill-trk-lst-cont">
                                <h5 class="isc-bill-trk-hdr-txt"  href="#coll_s2" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5"></i> Account Details  </h5>
                                <div class="screen-row mar-top-10 collapse in" id="coll_s2" >
                                <table class="isc-table-read-optimal isc-table-sorter-s1" id="bill-breakage-table">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="header" sort-column-Type="master" column-Name="BreakageTypeName"  data-sort="BreakageTypeName">Account 
                                            </th>
                                            <th style="width: 40%;" class="header" sort-column-Type="text" column-Name="BreakageDescription"  data-sort="BreakageDescription">Description
                                            </th>
                                            <th style="width: 20%;" class="header" sort-column-Type="number" column-Name="BreakageAmount"  data-sort="BreakageAmount"><center>Payable Amount</center>
                                            </th>
                                            


                                        </tr>
                                    </thead>
                                    <tbody id="tbl-breakage-body">
                                        
                                    </tbody>
                                </table>
                                    </div>
                                     </div>

                            </div>
                                
                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1" style="position:relative;">
                          <button type="button" class="btn blue isc-btn-pop-action-s1" id="challenge-bill" challenge-bill="true" data-dismiss="modal">
                            Challenge</button>
                        <%--<button type="button" class="btn blue isc-btn-pop-action-s1"  data-toggle="dropdown">
                            Pay</button>--%><%--<ul class="isc-nested-list-dd-s2 isc-nested-list-dd-s3" role="menu">
                                                <li class=""><a title="Edit" href="#">Debit Card</a></li>
                                                <li><a title="Change Type" href="#">Credit Card</a>
                                                </li>
                                                <li><a title="Delete" href="#">Check</a> </li>
                                                <li><a title="Add Epic" href="#">ACH</a> </li>
                                                <li><a title="Add Feature" href="#">UPI</a> </li>
                                                <li><a title="Add User Story" href="#">Net Banking</a> </li>
                                            </ul>--%>
                        <button type="button" class="btn default isc-btn-pop-action-s2" cancel-pay="true"   data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_com-pay" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Payment</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-50per">

                                    
                                        <div class="div-col-40per">
                                            <label class="mar-top-5">Vendor :</label>
                                        </div>
                                        <div class="div-col-50per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt">Diamonz Gems Inc </label>
                                           
                                        </div>
    </div>
                                        <div class="div-col-50per">
                                               <div class="div-col-40per">
                                            <label class="mar-top-5">Invoice # :</label>
                                        </div>
                                        <div class="div-col-50per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt">15478</label>
                                            
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-50per">
                                      <div class="div-col-40per">
                                            <label class="mar-top-5">Bill Description :</label>
                                        </div>
                                        <div class="div-col-50per">
                                                <label class="mar-top-5 isc-bill-pay-det-txt">Invoice for the purchase of PO799</label>
                                          
                                        </div>
                                            </div>
                                        <div class="div-col-50per">
                                                 <div class="div-col-40per">
                                            <label class="mar-top-5">Approved Amount :</label>
                                        </div>
                                        <div class="div-col-50per">
                                              <label class="mar-top-5 isc-bill-pay-det-txt">$750</label>
                                           
                                        </div>
                                          </div>
                                        
                                          
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                       <div class="div-col-50per">
                                          <div class="div-col-40per">
                                            <label class="mar-top-5">Due Date :</label>
                                        </div>
                                        <div class="div-col-50per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt">4/24/2020</label>
                                   
                                        </div>
                                       </div>
                                        <div class="div-col-50per">
                                              <div class="div-col-40per">
                                            <label class="mar-top-5">Payment Terms :</label>
                                        </div>
                                        <div class="div-col-50per">
                                              <label class="mar-top-5  isc-bill-pay-det-txt">NET30</label>
                                          
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                      
                                       <div class="div-col-50per">
                                            <div class="div-col-40per">
                                            <label class="mar-top-5">View Bill :</label>
                                        </div>
                                        <div class="div-col-50per mar-top-10">
                                               <a class="mar-top-5 isc-bill-trk-pop-cls" href="#mp_bill-view" data-toggle="modal" >
                                                     <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/>
                                                   Passmoregass.pdf</a>
                                          
                                        </div>
                                       </div>
                                          <div class="div-col-50per">
                                               <div class="div-col-40per">
                                            <label class="mar-top-5">Approver Comments :</label>
                                        </div>
                                        <div class="div-col-50per">
                                           <label class="mar-top-5  isc-bill-pay-det-txt">Bill approved for payment</label>
                                        </div>
                                           

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row mar-top-10">
                                          <div class="div-col-20per">
                                            <label class="mar-top-5"> Invoice :</label>
                                        </div>
                                       <div class="div-col-40per mar-top-10">
                                           <div class="isc-file-upload-in-con" style="padding: 5px 10px;">
                                                <i class="fa fa-cloud-upload"></i>
                                                <div class="screen-row">
                                                    <h2>Drag And Drop or<span class="isc-btn-inp-typ-file-s1">Browse

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                    </span></h2>
                                                   
                                                   
                                                </div>
                                         
                                            </div>
                                       </div>

                                    </div>

                                </div>
                                
                                
                                
                                
                                
                            </div>

                        </div>
                        <div class="screen-row mar-top-20">
                                 <div class="isc-bill-trk-lst-cont">
                                <h5 class="isc-bill-trk-hdr-txt"  href="#coll_s6" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5"></i> Account Details  </h5>
                                <div class="screen-row mar-top-10 collapse in" id="coll_s6" >
                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="header">Account 
                                            </th>
                                            <th style="width: 40%;" class="header">Description
                                            </th>
                                            <th style="width: 20%;" class="header"><center>Payable Amount</center>
                                            </th>
                                            


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>
                                                <h5>Bank Service Charges</h5>
                                            </td>
                                              <td>
                                                <h5>Bill details enclosed
                                                </h5>
                                            </td>
                                            <td class="isc-bill-amt-pad">
                                                <h5 style="text-align:right;">$1,500 	

                                                </h5>
                                            </td>
                                          

                                        </tr>
                                        <tr>

                                            <td>
                                                <h5>Meals and Entertainment</h5>
                                            </td>
                                             <td>
                                                <h5>Bill details enclosed
                                                </h5>
                                            </td>
                                            <td class="isc-bill-amt-pad">
                                                <h5 style="text-align:right;">$250	

                                                </h5>
                                            </td>
                                           

                                        </tr>
                                        <tr>

                                            <td>
                                                <h5>Office Supplies</h5>
                                            </td>
                                             <td>
                                                <h5>Bill details enclosed
                                                </h5>
                                            </td>
                                            <td class="isc-bill-amt-pad">
                                                <h5 style="text-align:right;">$1,750	

                                                </h5>
                                            </td>
                                           

                                        </tr>
                                    </tbody>
                                </table>
                                    </div>
                                     </div>

                            </div>
                            <div class="screen-row mar-top-20">
                                 <div class="isc-bill-trk-lst-cont">
                                <h5 class="isc-bill-trk-hdr-txt"  href="#coll_s5" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5"></i>Invoice Details  </h5>
                                <div class="screen-row mar-top-10 collapse in" id="coll_s5" >
                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="header">Invoice 
                                            </th>
                                            <th style="width: 40%;" class="header">Updated On
                                            </th>
                                            <th style="width: 20%;" class="header"><center>Action</center>
                                            </th>
                                            


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>
                                                <h5>
                                                   Passmoregass.pdf</h5>
                                            </td>
                                              <td>
                                                <h5>5/4/2020
                                                </h5>
                                            </td>
                                            <td style="text-align:center;">
                                              <a class="isc-action-badge-td-s1 " title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                            </td>
                                          

                                        </tr>
                                        
                                        
                                    </tbody>
                                </table>
                                    </div>
                                     </div>

                            </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1" style="position:relative;">
                          
                        
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_pay-com-viw" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Payment</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-50per">

                                    
                                        <div class="div-col-40per">
                                            <label class="mar-top-5">Vendor :</label>
                                        </div>
                                        <div class="div-col-50per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt">Diamonz Gems Inc </label>
                                           
                                        </div>
    </div>
                                        <div class="div-col-50per">
                                               <div class="div-col-40per">
                                            <label class="mar-top-5">Invoice # :</label>
                                        </div>
                                        <div class="div-col-50per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt">15478</label>
                                            
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-50per">
                                      <div class="div-col-40per">
                                            <label class="mar-top-5">Bill Description :</label>
                                        </div>
                                        <div class="div-col-50per">
                                                <label class="mar-top-5 isc-bill-pay-det-txt">Invoice for the purchase of PO799</label>
                                          
                                        </div>
                                            </div>
                                        <div class="div-col-50per">
                                                 <div class="div-col-40per">
                                            <label class="mar-top-5">Approved Amount :</label>
                                        </div>
                                        <div class="div-col-50per">
                                              <label class="mar-top-5 isc-bill-pay-det-txt">$750</label>
                                           
                                        </div>
                                          </div>
                                        
                                          
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                       <div class="div-col-50per">
                                          <div class="div-col-40per">
                                            <label class="mar-top-5">Due Date :</label>
                                        </div>
                                        <div class="div-col-50per">
                                             <label class="mar-top-5 isc-bill-pay-det-txt">4/24/2020</label>
                                   
                                        </div>
                                       </div>
                                        <div class="div-col-50per">
                                              <div class="div-col-40per">
                                            <label class="mar-top-5">Payment Terms :</label>
                                        </div>
                                        <div class="div-col-50per">
                                              <label class="mar-top-5  isc-bill-pay-det-txt">NET30</label>
                                          
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                      
                                       <div class="div-col-50per">
                                            <div class="div-col-40per">
                                            <label class="mar-top-5">View Bill :</label>
                                        </div>
                                        <div class="div-col-50per mar-top-10">
                                               <a class="mar-top-5 isc-bill-trk-pop-cls" href="#mp_bill-view" data-toggle="modal" >
                                                     <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/>
                                                   Passmoregass.pdf</a>
                                          
                                        </div>
                                       </div>
                                          <div class="div-col-50per">
                                            <div class="div-col-40per">
                                            <label class="mar-top-5"> View Invoice :</label>
                                        </div>
                                        <div class="div-col-50per mar-top-10">
                                           <a class="mar-top-5 isc-bill-trk-pop-cls" href="#mp_bill-view" data-toggle="modal">
                                                    
                                                   invoice_98878.pdf</a>
                                            </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                       <div class="div-col-100per mar-top-10">
                                            <div class="div-col-20per">
                                            <label class="mar-top-5">Approver Comments :</label>
                                        </div>
                                        <div class="div-col-80per">
                                           <label class="mar-top-5  isc-bill-pay-det-txt">Bill approved for payment</label>
                                        </div>
                                       </div>

                                    </div>

                                </div>
                                
                                
                                
                                
                                
                            </div>

                        </div>
                        <div class="screen-row mar-top-20">
                                 <div class="isc-bill-trk-lst-cont">
                                <h5 class="isc-bill-trk-hdr-txt"  href="#coll_s12" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5"></i> Account Details  </h5>
                                <div class="screen-row mar-top-10 collapse in" id="coll_s12" >
                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="header">Account 
                                            </th>
                                            <th style="width: 40%;" class="header">Description
                                            </th>
                                            <th style="width: 20%;" class="header"><center>Payable Amount</center>
                                            </th>
                                            


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>
                                                <h5>Bank Service Charges</h5>
                                            </td>
                                              <td>
                                                <h5>Bill details enclosed
                                                </h5>
                                            </td>
                                            <td class="isc-bill-amt-pad">
                                                <h5 style="text-align:right;">$1,500 	

                                                </h5>
                                            </td>
                                          

                                        </tr>
                                        <tr>

                                            <td>
                                                <h5>Meals and Entertainment</h5>
                                            </td>
                                             <td>
                                                <h5>Bill details enclosed
                                                </h5>
                                            </td>
                                            <td class="isc-bill-amt-pad">
                                                <h5 style="text-align:right;">$250	

                                                </h5>
                                            </td>
                                           

                                        </tr>
                                        <tr>

                                            <td>
                                                <h5>Office Supplies</h5>
                                            </td>
                                             <td>
                                                <h5>Bill details enclosed
                                                </h5>
                                            </td>
                                            <td class="isc-bill-amt-pad">
                                                <h5 style="text-align:right;">$1,750	

                                                </h5>
                                            </td>
                                           

                                        </tr>
                                    </tbody>
                                </table>
                                    </div>
                                     </div>

                            </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1" style="position:relative;">
                         
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    </div>
        <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 700px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="billFileTitle">Passmoregas.pdf</h4>
                        </div>
                        <div class="cell-right">
                              <a><i class="fa fa-times" style="color:#8A8A8A;"  close-Attachment="true" title="Close" data-dismiss="modal" aria-hidden="true"></i></a>
                            <%--<button type="button" class="close img-typ-sq" close-Attachment="true" data-dismiss="modal" aria-hidden="true">
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
              <%-- <div class="modal-footer">
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
       <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_flag" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Flag</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#8A8A8A;"  hide-pop-up="true"  title="Cancel"  flag-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  flag-cancel="true" aria-hidden="true">
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
                                        <h4>Are you sure want to flag the bill?</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-flag-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" flag-cancel="true"  id="close-flag-pop" >
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

        <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_challenge" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Challenge</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#8A8A8A;"  hide-pop-up="true"  title="Cancel"  challenge-cancel="true" aria-hidden="true"></i></a>
                           <%-- <button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  challenge-cancel="true" aria-hidden="true">
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
                                        <h4>Are you sure want to challenge the bill?</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-challege-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" challenge-cancel="true"  id="close-Challenge-pop" >
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

    <script src="iscjsengine/PageScript/PaymentSummary.js"></script>
</asp:Content>