<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="PaymentMethodList.aspx.cs" Inherits="BillManagement.PaymentMethodList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-usd"></i>
                        <h2 style="line-height: 30px;">Payment Method</h2>
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
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" id="add-ACH">Add ACH</a>
                </div>
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" id="add-Card">Add Card</a>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">

                    <div class="screen-row mar-top-10">
                        <div class="isc-filter-container" id="isc-filter-container" style="display: none;">




                            <div class="cell-left  ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose User</option>
                                    <option>Xavier		
                                    </option>
                                    <option>Pronto		
                                    </option>
                                    <option>Reuben		
                                    </option>
                                    <option>Joey		
                                    </option>
                                    <option>James Abourezk		
                                    </option>
                                    <option>Abigail Adams		
                                    </option>
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose Role</option>
                                    <option>Administrator		
                                    </option>
                                    <option>Accountant		
                                    </option>
                                    <option>Approver		
                                    </option>
                                    <option>Approver		
                                    </option>
                                    <option>Clerk		
                                    </option>
                                    <option>Payer	
                                    </option>
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose Status</option>
                                    <option>Active		
                                    </option>
                                    <option>Inactive		
                                    </option>

                                </select>
                            </div>

                            <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
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
                    <div class="isc-screen-nav-container-s1">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#Tab1" data-toggle="tab">Card Details (<span id="card-Count">0</span>)</a> </li>
                            <li class=""><a href="#Tab2" data-toggle="tab">ACH Details (<span id="ach-Count">0</span>)</a> </li>
                        </ul>
                    </div>
                    <div class="tab-content mar-top-15">
                        <div class="tab-pane active fade in" id="Tab1">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst" id="tbl-Card">
                                <thead>
                                    <tr>
                                        <th style="width: 10%;" class="" >Set as Default</th>
                                        <th style="width: 15%;" class="header"  sort-column-Type="text" column-Name="BankName"  data-sort="BankName">Bank Name</th>
                                        <th style="width: 15%;" class="header"  sort-column-Type="text" column-Name="CardNumber"  data-sort="CardNumber" >Card Number</th>
                                        <%--<th style="width: 15%;" class="header"  >Card Type</th>--%>
                                        <th style="width: 15%;" class="header"  sort-column-Type="text" column-Name="CardName"  data-sort="CardName">Name On Card</th>
                                        <th style="width: 10%;" class="header"  sort-column-Type="number" column-Name="ExpiryMonth"  data-sort="ExpiryMonth">Expiration</th>
                                        <%--<th style="width: 10%;" class="header"  sort-column-Type="text" column-Name="IsActive"  data-sort="IsActive">Status</th>--%>
                                        <th style="width: 10%;" class="noheader text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tbl-Card-Body">
                                   
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade in" id="Tab2">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst" id="tbl-Account">
                                <thead>
                                    <tr>
                                        <th style="width: 10%;" class="" >Set as Default</th>
                                        <th style="width: 20%;" class="header"  sort-column-Type="text" column-Name="AccountName" data-account-sort="AccountName">Account Name</th>
                                        <th style="width: 15%;" class="header"   sort-column-Type="text" column-Name="AccountNumber" data-account-sort="AccountNumber">Account Number</th>
                                        <%--<th style="width: 15%;" class="header">Account Holder Type</th>--%>
                                        <th style="width: 15%;" class="header"  sort-column-Type="text" column-Name="RoutingNumber" data-account-sort="RoutingNumber">Routing Number</th>
                                        <th style="width: 15%;" class="header"  sort-column-Type="text" column-Name="StatusName" data-account-sort="StatusName">Status</th>
                                        <th style="width: 10%;" class="noheader text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tbl-Account-Body">
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
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="Mp_Add_Card" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Card Details</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal" data-Cancel-Card="true" title="Close" style="cursor:pointer"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">
                        <%--<div class="screen-row">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Card Type </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <label><input type="radio" name="CardType" checked />Credit Card</label>
                                <label class="pad-lft-max"><input type="radio" name="CardType" />Debit Card</label>
                            </div>
                        </div>--%>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Name On Card<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup>   </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Name On Card" id="name-On-Card" data-textbox="cardName" class="alphabets-only form-control">
                                    <span style="color:red;display:none;" class="validation-message" id="cardname-Validation" data-validation="cardName">Name On Card should not be empty</span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Card Number<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup>   </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXX XXXX XXXX XXXX" id="card-Number"  data-textbox="cardNumber" maxlength="19" class="form-control">
                                    <span style="color:red;display:none;" class="validation-message" id="cardnumber-Validation" data-validation="cardNumber">Card Number should not be empty</span>
                                <span style="color:red;display:none;" class="validation-message" id="cardnumberInfo-Validation" data-validation="cardNumber"></span>
                                    <span style="color:red;display:none;" class="validation-message" id="cardnumberCount-Validation" data-validation="cardNumber">Card Number should be 16 numbers</span>
                            </div>
                           <%-- <div class="div-col-5per">
                                <img src="images/visa.png" class="isc-card-type-img" />
                            </div>--%>

                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Expiration<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup> </label>
                                </div>
                            </div>

                            <div class="div-col-15per">
                                <input type="text" placeholder="MM" id="exp-Month" class="form-control"  maxlength="2"  data-textbox="expMonth">
                                <span style="color:red;display:none;" class="validation-message"   id="expmonth-Validation" data-validation="expMonth">Expiry Month should not be empty</span>
                                 <span style="color:red;display:none;" class="validation-message"   id="expmonthValue-Validation" data-validation="expMonth">Expiry Month should not be greater than 12</span>
 <span style="color:red;display:none;" class="validation-message"   id="expmonthLength-Validation" data-validation="expMonth">Expiry Month should be 2 digit numbers</span>
                            </div>
                            <div class="div-col-5per text-center">
                                <h5 class="isc-bill-trk-slsh">/</h5>
                            </div>
                            <div class="div-col-15per">
                                <input type="text" placeholder="YYYY" id="exp-Year" maxlength="4"  class="form-control" data-textbox="expYear">
                                  <span style="color:red;display:none;" class="validation-message"  id="expyear-Validation" data-validation="expYear">Expiry Year should not be empty</span>
                                 <span style="color:red;display:none;" class="validation-message"  id="expCurrentYear-Validation" data-validation="expYear">Expiry Year should not be less than current year</span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">CVV<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup>   </label>
                                </div>
                            </div>

                            <div class="div-col-15per">
                                <input type="text" placeholder="Enter CVV" id="ccv-Number" style="width:91px !important" maxlength="3" class="form-control" data-textbox="ccvNumber">
                                <span style="color:red;display:none;" class="validation-message"  id="CCV-Validation" data-validation="ccvNumber">CVV should not be empty</span>
                                 <span style="color:red;display:none;" class="validation-message"  id="CCVCount-Validation" data-validation="ccvNumber">CVV should be 3 numbers</span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Bank Name  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Bank Name " id="bank-Name" class="alphabets-only form-control">
                            </div>
                        </div>
                         <div class="screen-row mar-top-15">
                            
                            <div class="div-col-75per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5"><input type="checkbox" id="set-Default" style="cursor:pointer" class="pad-rig-5" /> Set as default  </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="save-Card">
                                ADD</button>
                              <button type="button" class="btn blue isc-btn-pop-action-s1" id="update-Card">
                                Update</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="cancel-Card" data-Cancel-Card="true" data-dismiss="modal" style="background-color:#95a5a6 !important;">
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
                            <a cancel-account-create="true" style="cursor:pointer" title="Close"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">
                        
                        <div class="screen-row ">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup>  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Account Name" id="account-Name" class="alphabets-only form-control" data-textbox="accName">
                                <span style="color:red;display:none;" class="validation-message" id="accname-Validation" data-validation="accName">Account Name should not be empty</span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Number<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup>  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="password" placeholder="XXXXXXXXXXXX" id="account-Number" class="form-control number-only" data-textbox="accNumber" maxlength="12">
                                <span style="color:red;display:none;" class="validation-message" id="accnumber-Validation" data-validation="accNumber">Account Number should not be empty</span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Re-enter Account Number<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup></label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXXXXXXXXXX" maxlength="12" id="re-account-Number" class="form-control number-only">
                                 <span style="color:red;display:none;" class="validation-message" id="reEnteredaccnumber-Validation" data-validation="accNumber">Re entered account number should be match with account number</span>
                                  <span style="color:red;display:none;" class="validation-message" id="reEnteredaccnumberEmpty-Validation" data-validation="accNumber">Re-enter account number should not be empty </span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Routing Number<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size:8px !important;"></i></sup>  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="XXXXXXXXXXXX" id="routing-Number" class="form-control number-only"  data-textbox="routingNumber" maxlength="9">
                                <span style="color:red;display:none;" class="validation-message" id="routingNumber-Validation" data-validation="routingNumber">Routing Number should not be empty</span>
                            </div>
                        </div>
                        <%--<div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Account Holder Type </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <div class="isc-slt-parent">
                                    <select class="select2">
                                        <option>Choose Account Holder Type</option>
                                        <option>Individual</option>
                                        <option>Company</option>
                                    </select>
                                </div>
                            </div>
                        </div>--%>
                         <div class="screen-row mar-top-15">
                            
                            <div class="div-col-75per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5"><input type="checkbox" style="cursor:pointer" class="pad-rig-5" id="default-Account" /> Set as default  </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="save-Client-Account">
                                ADD</button>
                             <button type="button" class="btn blue isc-btn-pop-action-s1" style="display:none;" id="update-Client-Account">
                                Update</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-account-create="true" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Delete_Card" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Request</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times" cancel-Delete-Card="true" style="cursor:pointer" title="Close"> </i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Are you sure want to delete the card ?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="delete-Card-Yes">
                                Yes</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-Delete-Card="true" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Default_Card" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Make Card Default</h4>
                        </div>
                        <div class="cell-right">
                            <a card-Default-Close="true"><i class="fa fa-times" style="cursor:pointer" title="Close"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Do you want set this card as default?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="card-Default-Yes">
                                Yes</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" card-Default-Close="true" style="background-color:#95a5a6 !important;">
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
                            <a cancel-Verify="true"><i class="fa fa-times" style="cursor:pointer" title="Close"></i></a>
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
                                <input type="text" placeholder="Ex: 1.00" class="form-control number-only" maxlength="2" id="micro-Dep-One">
                            </div>
                        </div>
                    <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Micro-Deposit 2 ($)</label>
                                </div>
                            </div>
                            <div class="div-col-25per">
                                <input type="text" placeholder="Ex: 1.00" class="form-control number-only"  maxlength="2"  id="micro-Dep-Two">
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1"  id="verify-Account">
                                Verify</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-Verify="true" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Delete_Account" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Request</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times" cancel-Delete-Account="true" style="cursor:pointer" title="Close"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Are you sure want to delete the account ?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="delete-Account-Yes">
                                Yes</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-Delete-Account="true" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

      <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Default_Account" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Make ACH Default</h4>
                        </div>
                        <div class="cell-right">
                            <a account-Default-Close="true"><i class="fa fa-times" style="cursor:pointer" title="Close"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height:75px;">
                    <p class="text-center pad-top-15">Do you want set this ACH as default?</p>
                </div>
                <div class="modal-footer">
                    
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="account-Default-Yes">
                                Yes</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" account-Default-Close="true" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <script src="iscjsengine/PageScript/PaymentMethodList.js"></script>
</asp:Content>