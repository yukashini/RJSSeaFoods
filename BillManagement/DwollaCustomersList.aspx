<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="DwollaCustomersList.aspx.cs" Inherits="BillManagement.DwollaCustomersList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-usd"></i>
                        <h2 style="line-height: 30px;">Payment Configurations </h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">


              <%--  <div class="cell-right">
                    <div class="align-right mar-top-3 pad-rig-5 " style="margin-top: 6px;">

                        <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter" style=""><i class="fa fa-filter"></i></a>
                    </div>
                </div>--%>
               <%-- <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="#Mp_Add_ACH" data-toggle="modal">Add ACH</a>
                </div>--%>
              <%--  <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="#Mp_Add_Card" data-toggle="modal">Configure</a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">

                    <div class="screen-row mar-top-10">
                        <div class="isc-filter-container" id="isc-filter-container" style="display: none;">
           <div class="cell-left ">
                            <input type="text" class="form-control " placeholder="Bank Name">

                        </div>
                       
                        <div class="cell-left   pad-lft-15">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>Account Card Type
                                    </option>
                                <option>VISA - Credit Card		
                                </option>
                                <option>VISA - Debit Card	
                                </option>
                                 </select>
                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " placeholder="Expiration">

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>  Status</option>
                                <option>Active
                                </option>
                                <option>Inactive
		
                                </option>
                               

                            </select></div> <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                                <a title="Search"><i class="fa fa-search"></i></a>
                            </div>

                            <div class="isc-filter-search isc-reset" title="Reset">
                                <a><i class="fa fa-refresh"></i></a>
                            </div>
                            <div class="isc-filter-container-close" id="isc-filter-container-close">
                                <a><i class="fa fa-times"></i></a>
                            </div>
                        </div>
                    </div>
                 
                    
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                <thead>
                                    <tr>
                                        <%--<th style="width: 10%;" class="header">Set as Default</th>--%>
                                        <th style="width: 30%;" class="header"> Name</th>
                                        <th style="width: 35%;" class="header">Email</th>
                                        <th style="width: 20%;" class="header">Status/Type</th>
                                        <th style="width: 15%;" class="header">Created On</th>
                                       <%-- <th style="width: 10%;" class="header">Expiration</th>
                                        <th style="width: 10%;" class="header">Status</th>
                                        <th style="width: 10%;" class="noheader text-center">Action</th>--%>
                                    </tr>
                                </thead>
                                <tbody id="tbl-customers-Body">
                                   
                                </tbody>
                            </table>
                        
                        <%--<div class="tab-pane fade in" id="Tab2">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                <thead>
                                    <tr>
                                        <th style="width: 10%;" class="header">Set as Default</th>
                                        <th style="width: 20%;" class="header">Bank Name</th>
                                        <th style="width: 15%;" class="header">Account Number</th>
                                        <th style="width: 15%;" class="header">Account Holder Type</th>
                                        <th style="width: 15%;" class="header">Routing Number</th>
                                        <th style="width: 15%;" class="header">Status</th>
                                        <th style="width: 10%;" class="noheader text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td title="Set as default"><i class="fa fa-check-circle-o isc-set-deflt yes"></i></td>
                                        <td>
                                            <h5>Stripe Test Bank</h5>
                                        </td>
                                        <td>
                                            <h5>**** **** ****<span>8976</span></h5>
                                        </td>
                                        <td>
                                            <h5>Company</h5>
                                        </td>
                                        <td>
                                            <h5>67589</h5>
                                        </td>
                                        <td>
                                            <div class="isc-td-inline-status-ch-s1">
                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove">Active</a>
                                            </div>
                                        </td>
                                        <td style="text-align: center;">
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit"  href="#Mp_Add_ACH" data-toggle="modal"><i class="fa fa-pencil-square-o"></i></a>
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#MP_Delete" data-toggle="modal"><i class="fa fa-trash-o"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td title="Set as default"><a href="#MP_Default" data-toggle="modal"><i class="fa fa-circle-o isc-set-deflt"></i></a></td>
                                        <td>
                                            <h5>Stripe Test Bank</h5>
                                        </td>
                                        <td>
                                            <h5>**** **** ****<span>8977</span></h5>
                                        </td>
                                        <td>
                                            <h5>Individual</h5>
                                        </td>
                                        <td>
                                            <h5>52689 </h5>
                                        </td>
                                        <td>
                                            <div class="isc-td-inline-status-ch-s1">
                                                <a class="isc-lbl-act-read-list-s1 isc-inactive-clr">Verification Pending</a>
                                            </div>
                                        </td>
                                        <td style="text-align: center;">
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Verify Now" href="#MP_Verification" data-toggle="modal"><i class="fa fa-check-circle" style="color:#74b9ff;"></i></a>
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#Mp_Add_ACH" data-toggle="modal"><i class="fa fa-pencil-square-o"></i></a>
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#MP_Delete" data-toggle="modal"><i class="fa fa-trash-o"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td title="Set as default"><a href="#MP_Default" data-toggle="modal"><i class="fa fa-circle-o isc-set-deflt"></i></a></td>
                                        <td>
                                            <h5>Stripe Test Bank</h5>
                                        </td>
                                        <td>
                                            <h5>**** **** ****<span>8977</span></h5>
                                        </td>
                                        <td>
                                            <h5>Individual</h5>
                                        </td>
                                        <td>
                                            <h5>24578</h5>
                                        </td>
                                        <td>
                                            <div class="isc-td-inline-status-ch-s1">
                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove">Active</a>
                                            </div>
                                        </td>
                                        <td style="text-align: center;">
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#Mp_Add_ACH" data-toggle="modal"><i class="fa fa-pencil-square-o"></i></a>
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#MP_Delete" data-toggle="modal"><i class="fa fa-trash-o"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td title="Set as default"><a href="#MP_Default" data-toggle="modal"><i class="fa fa-circle-o isc-set-deflt"></i></a></td>
                                        <td>
                                            <h5>Stripe Test Bank</h5>
                                        </td>
                                        <td>
                                            <h5>**** **** ****<span>8978</span></h5>
                                        </td>
                                        <td>
                                            <h5>Company</h5>
                                        </td>
                                        <td>
                                            <h5>12367</h5>
                                        </td>
                                        <td>
                                            <div class="isc-td-inline-status-ch-s1">
                                                <a class="isc-lbl-act-read-list-s1 isc-inactive-clr">Verification Pending</a>
                                            </div>
                                        </td>
                                        <td style="text-align: center;">
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Verify Now" href="#MP_Verification" data-toggle="modal"><i class="fa fa-check-circle" style="color:#74b9ff;"></i></a>
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#Mp_Add_ACH" data-toggle="modal"><i class="fa fa-pencil-square-o"></i></a>
                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#MP_Delete" data-toggle="modal"><i class="fa fa-trash-o"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>--%>
                
            </div>
        </div>
    </div>
    
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="Mp_Add_Card" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Payment Configuration</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">
                        <div class="screen-row">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Payment Type</label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <label for="option 2" value="other2">
                                    <input type="radio"  id="option 2" name="options"name="CardType"  value="other2"/>
                                    Bank Account</label>
                                <label class="pad-lft-max" for="option 1" value="other">
                                    <input type="radio" id="option 1" name="options" name="options" value="other" checked/>Card</label>
                            </div>
                        </div>
                        <div id="otherAnswer">
                        <div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Card Type </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <label><input type="radio" name="CardType" checked />Credit Card</label>
                                <label class="pad-lft-max"><input type="radio" name="CardType" />Debit Card</label>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Name On Card  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Name On Card" class="form-control">
                            </div>
                        </div>

                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Card Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="form-control">
                            </div>
                            <div class="div-col-5per">
                                <img src="images/visa.png" class="isc-card-type-img" />
                            </div>

                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Expiration  </label>
                                </div>
                            </div>

                            <div class="div-col-15per">
                                <input type="text" placeholder="MM" class="form-control">
                            </div>
                            <div class="div-col-5per text-center">
                                <h5 class="isc-bill-trk-slsh">/</h5>
                            </div>
                            <div class="div-col-15per">
                                <input type="text" placeholder="YYYY" class="form-control">
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">CVV  </label>
                                </div>
                            </div>

                            <div class="div-col-15per">
                                <input type="text" placeholder="123" class="form-control">
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Bank Name  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Bank Name" class="form-control">
                            </div>
                        </div>
                         <div class="screen-row mar-top-15">
                            
                            <div class="div-col-75per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5"><input type="checkbox" class="pad-rig-5" /> Set as default  </label>
                                </div>
                            </div>

                        </div>
                    </div>
                        <div id="otherAnswer1" style="display:none">
                            <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Name</label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Account Name" class="form-control">
                            </div>
                        </div>
                               <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="password" placeholder="XXXXXXXXXXXX" class="form-control">
                            </div>
                        </div>
                            
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Re-enter Account Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXXXXXXXXXX" class="form-control">
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Routing Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXXXXXXXXXX" class="form-control">
                            </div>
                        </div>
                        
                         <div class="screen-row mar-top-15">
                            
                            <div class="div-col-75per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5"><input type="checkbox" class="pad-rig-5" /> Set as default  </label>
                                </div>
                            </div>

                        </div>
                        </div>

                        </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                ADD</button>
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
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="Mp_Add_ACH" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">ACH Details</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">
                        
                        <div class="screen-row ">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Name  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Account Name" class="form-control">
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="password" placeholder="XXXXXXXXXXXX" class="form-control">
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Re-enter Account Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXXXXXXXXXX" class="form-control">
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Routing Number  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXXXXXXXXXX" class="form-control">
                            </div>
                        </div>
                        
                         <div class="screen-row mar-top-15">
                            
                            <div class="div-col-75per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5"><input type="checkbox" class="pad-rig-5" /> Set as default  </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                ADD</button>
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
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Request</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Do You Want To Delete ?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                Yes</button>
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
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Default" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Make Default Request</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Do you want to default this card ?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                Yes</button>
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
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Verification" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Account Verification</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p >This bank account will be added only after you complete the process through micro deposits.</p>
                    <p class="pad-top-15">Once you recive the two micro-deposits in this account with in 1-2 Business Days. Please enter amounts below to verify your bank account. This micro-deposits will expire in 10 days. </p>
                    <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Micro-Deposit 1 ($) </label>
                                </div>
                            </div>
                            <div class="div-col-25per">
                                <input type="text" placeholder="Ex: 1.00" class="form-control">
                            </div>
                        </div>
                    <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Micro-Deposit 2 ($)</label>
                                </div>
                            </div>
                            <div class="div-col-25per">
                                <input type="text" placeholder="Ex: 1.00" class="form-control">
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                Verify</button>
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
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script>
        $(document).ready(function() {
            $("input[type='radio']").change(function() {
                if ($(this).val() == "other") {
                    $("#otherAnswer").show();
                } else {
                    $("#otherAnswer").hide();
                }
            });
        });
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
        $(document).ready(function() {
            $("input[type='radio']").change(function() {
                if ($(this).val() == "other2") {
                    $("#otherAnswer1").show();
                } else {
                    $("#otherAnswer1").hide();
                }
            });
        });
    </script>
   <script>
        $(document).ready(function() {
            $("input[type='radio']").change(function() {
                if ($(this).val() == "other2") {
                    $("#otherAnswer1").show();
                } else {
                    $("#otherAnswer1").hide();
                }
            });
        });
    </script>
        <script src="iscjsengine/PageScript/DwollaCustomers.js"></script>
</asp:Content>

