<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Bill_ApprovalDetails.aspx.cs" Inherits="BillManagement.Bill_ApprovalDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #coll_s7 label{
                width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
        }
        .isc-crt-bill-not-cont{
            min-height:unset;
            max-height:unset;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-50per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">Bill Details</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>

            <div class="div-col-50per">
                <div class="cell-right " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn"  style="background-color: #aeaeae !important;" id="btn-Cancel">Cancel</a>

                </div>
                <div class="cell-right pad-rig-5" style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn" style="background-color:#d45b5b !important;" approve-Type="2">Reject</a>

                </div>


                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" style="background-color:#68bb55 !important;" approve-Type="1">Approve</a>
                </div>
               
            </div>
        </div>
        <div class="isc-app-screen-body-container">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="screen-row">
                            <div class="div-col-60per">
                                <div class="isc-up-bill-lft-cont">

                                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-crt-bill1-lft-cont" id="billFrameBlock" style="">


                                            <div class="screen-row isc-crt-bill-view">


                                                <div class="div-col-100per " style="text-align: center;">
                                                    <div class="screen-row">

                                                        <h2 id="file-Message" style="display:none">No File Attatched</h2>
                                                      <%--  <div class="isc-file-upload-in-con" style="padding: 5px 10px; border: none !important;">
                                                            <i class="fa fa-cloud-upload"></i>
                                                            <div class="screen-row">
                                                                <h2>Drag And Drop or<span class="isc-btn-inp-typ-file-s1" style="background-color: #f9f9f9 !important;">Browse

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                                </span></h2>
                                                                <img src="img/OCRScr.png" class="isc-bill-tck-snr-img" title="OCR Scan">
                                                            </div>

                                                        </div>
                                                        <div class="screen-row">
                                                            <h3 class="isc-lbl-vry-sm-txt-s1" style="text-align: center;">
                                                                <span>Note:</span>
                                                                Upload only PDF, JPG, JPEG &amp; PNG with Max 10 MB</h3>
                                                        </div>--%>


                                                        <div class="cell-left pad-lft-med"><a style="display: none" id="btn-validate-customer" class="isc-lbl-tile-foot-act-but-s1 cell-right">Validate Upload</a></div>
                                                        <div class="cell-left pad-lft-med"><a style="display: none" id="btn-initiate-upload" class="isc-lbl-tile-foot-act-but-s1 cell-right">Initiate Process</a></div>
                                                    </div>



                                                </div>

                                            </div>

                                        </div>

                                    </div>
                            </div>
                            <div class="div-col-40per">
                                <div class="isc-up-bill-rgt-cont">
                                    <div class="isc-screen-nav-container-s1 mar-top-10">
                                        <ul class="nav nav-tabs" style="position: relative;">
                                            <li class=""><a href="#Tab3" data-toggle="tab">Bill Summary</a> </li>
                                             <li class=""><a href="#Tab6" data-toggle="tab" id="tab-Split" style="display:none;">Split Amount</a> </li>
                                              <li class=""><a href="#Tab5" data-toggle="tab">Settings</a> </li>
                                            <li class="active"><a href="#Tab4" data-toggle="tab">Approvals</a> </li>

                                        </ul>
                                        <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                        <div class="tab-content">
                                            <div class="tab-pane fade in" id="Tab3">
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s7" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Details   </h5>
                                                    <div class="screen-row mar-top-10 collapse in" id="coll_s7" style="height: auto;">
                                                        <div class="screen-row mar-top-10">
                                                            <div class="screen-row">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Vendor Name: </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="vendor-Name"></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Bill# : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                     <label class="mar-top-5" id="invoice-Number"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Bill Description : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                   <label class="mar-top-5" id="bill-Desc"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Bill Amount : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <label class="mar-top-5" id="bill-Amount"></label>
                                                                </div>
                                                            </div>

                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Bill Category : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <label class="mar-top-5" id="bill-Category"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Payment Terms : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <label class="mar-top-5" id="paymentTerm-Name"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Invoice Date : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                   <label class="mar-top-5" id="invoice-Date">9/21/2020</label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Due Date: </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <label class="mar-top-5" id="due-Date"></label>
                                                                </div>
                                                            </div>
                                                            <table class="isc-table-read-optimal mar-top-15" id="desc-Div" style="display:none;">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 22%;">Description</th>
                                                                            <th style="width: 20%; text-align: right;">Rate</th>
                                                                            <th style="width: 12%; text-align: center;">Qty</th>
                                                                            <th style="width: 22%; text-align: right;">Total</th>
                                                                            <%--<th style="width: 14%;"></th>--%>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbl-Desc-Body">
                                                                      
                                                                    </tbody>
                                                                </table>
                                                            <div id="bill-Association-Block">
                                                                  <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Customer : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <label class="mar-top-5" id="lbl-Customer"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                                <div class="div-col-35per isc-mb-wdt-45">
                                                                    <label class="mar-top-5">Project : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-45">
                                                                    <label class="mar-top-5" id="lbl-Project"></label>
                                                                </div>
                                                            </div>
                                                            </div>
                                                    
                                                              </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                             <div class="tab-pane fade in " id="Tab5">
                                                 <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s3" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approvers   </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s3" style="height: auto;">
                                                        <label id="lbl-AutoApproval">
                                                           <span><input type="checkbox" disabled id="auto-Approval"/></span>
                                                                Auto Approval</label>
                                                        <div class="screen-row mar-top-10" id="div-Approvers">
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approver Name : </label>
                                                                </div>
                                                          
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5"> Frank Abagnale </label>
                                                                </div>
                                                              
                                                            </div>
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approver Name : </label>
                                                                </div>
                                                          
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5">  Edward Abbey </label>
                                                                </div>
                                                              
                                                            </div>
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approver Name : </label>
                                                                </div>
                                                          
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5"> Reuben Abel </label>
                                                                </div>
                                                              
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="recurrence-Block" class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s4" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i> Recurrence    </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s4" style="height: auto;">
                                                        <div class="screen-row mar-top-10">

                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Start Date : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="recurrence-StartDate"> </label>
                                                                   
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Frequency : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                     <label class="mar-top-5" id="frequency"></label>
                                                                
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Ends On : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                     <label class="mar-top-5" id="recurrence-EndDate"></label>
                                                                   
                                                                </div>
                                                            </div>
                                                            <%--<div class="screen-row">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Approver Name : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-wdth ">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>Choose Approver Name</option>
                                                     <option> Frank Abagnale </option>
                                                     <option>Edward Abbey </option>
                                                     <option> Reuben Abel </option>
                                                     <option>Hal Abelson</option>
                                                </select>
                                                                </div>
                                                        </div>
                                </div>--%>
                                                        </div>
                                                    </div>
                                                </div>

                                                <%--<div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s5" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i> Reminders    </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s5" style="height: auto;">
                                                        <div class="screen-row mar-top-10">

                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Remind : </label>
                                                                </div>
                                                                <div class="div-col-50per pad-lft-2-per">
                                                                     <label class="mar-top-5" id="reminderState"></label>
                                                                   
                                                                </div>
                                                              
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Email : </label>
                                                                </div>
                                                                <div class="div-col-60per">
                                                                     <label class="mar-top-5" id="reminder-Email"></label>
                                                                  

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>--%>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s8" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s8" style="height: auto;">
                                                        <div class="screen-row mar-top-10">

                                                           <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                    <thead>
                                                        <tr>
                                                            <th style="width:85%;" class="header">File Name</th>
                                                          
                                                            <th style="width: 15%;" class="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbl-Documents-Body">
                                                      
                                                    </tbody>
                                                </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s10" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s10" style="height: auto;">
                                                        
                                                       
                                                        <div class="screen-row">
                                                            <div class="isc-crt-bill-not-cont" id="div-Notes">
                                                                <div class="screen-row">
                                            <div class="div-col-15per">
                                               
                                                    <img src="img/appfinal/48.jpg" class="isc-vnd-img-nts">
                                                <h5 style="font-weight:400;font-size:11px;"> Frank Abagnale</h5>
                                            </div>
                                            <div class="div-col-85per">
                                                <h6 class="isc-vnd-edt-cht-tm">Sun Feb 28 ,4.54 am</h6>
                                                <div class="">
                                                    <p style="margin:2px 0px;">Payment to be done based on payment terms..</p>
                                                </div>
                                               
                                            </div>
                                        </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                             </div>
                                            <div class="tab-pane fade in active" id="Tab4">
                                                <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approved Amount <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> </label>
                                                                </div>
                                                                <div class="div-col-65per">
                                                                    <input type="text" placeholder="$0.00" id="approved-Amount" data-type="currency"  class="form-control isc-exp-mang-txt-bx1 ">
                                                                </div>
                                                            </div>
                                                <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Balance Amount </label>
                                                                </div>
                                                                <div class="div-col-65per">
                                                                    <input type="text" placeholder="$0.00" id="balance-Amount" class="form-control isc-exp-mang-txt-bx1 " disabled="disabled">
                                                                </div>
                                                            </div>
                                                <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approver Comments </label>
                                                                </div>
                                                                <div class="div-col-65per">
                                                                    <textarea class="form-control" id="approver-Comments"></textarea>
                                                                </div>
                                                            </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_r1" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approval History </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_r1" style="height: auto;">
                                                        <table class="isc-table-read-optimal">
                                                                    <thead>
                                                                    </thead>
                                                                    <tbody aria-live="polite" aria-relevant="all" id="tbl-ApproverHistory-Body">
                                                                      
                                                                    </tbody>
                                                                </table>
                                                    </div>
                                                </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10" id="payment-Tab" style="display:none">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_r3" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Payment Details </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_r3" style="height: auto;">
                                                        <div class="screen-row mar-top-10">
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Payable Amount : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-PayableAmount">-</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Payment Mode : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-payment-Mode">-</label>
                                                                    </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Paid On : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-PaidOn"></label>
                                                                    </div>
                                                                       
                                                                    </div>
                                                                </div>
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Payment Method : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-PaymentMethod">-</label>
                                                                    </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Ref Number : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-Ref-Number">-</label>
                                                                    </div>
                                                                      
                                                                    </div>
                                                                </div>
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Amount Paid : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-Amount-Paid"> -</label>
                                                                    </div>
                                                                       
                                                                    </div>
                                                                </div>
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Amount Due : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="lbl-Amount-Due">-</label>
                                                                    </div>
                                                                       
                                                                    </div>
                                                                </div>
                                                            <div class="screen-row mar-top-10">
                                                                    <div class="div-col-90per">
                                                                        <label class="mar-top-5">Attachments  </label>
                                                                    </div>
                                                                            <%-- <div class="div-col-10per">
                              <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" id=""><i class="fa fa-plus"></i></a>
                            </div>--%>
                                                                 <%--<span class="isc-btn-inp-typ-file-s1 cell-right" id="add-Doc-Span" style="cursor:pointer">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Document" title="Add file"/>
                                                                    </span>--%>
                                                                </div>

                                                            <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10">
                                    <thead>
                                        <tr>

                                            <th style="width: 80%;" class="">File Name
                                            </th>
                                            <th style="width: 20%;" class="">Action
                                            </th>
                                           


                                        </tr>
                                    </thead>
                                    <tbody id="tbl-Paid-Docs">
                                        <tr><td colspan="2" style="text-align:center;"> No Data Found </td></tr>
                                     <%--   <tr>

                                            <td>
                                                <h5>
                                                    <img src="img/appimages/PDF_icon.png" style="height:20px;"/> Details.pdf</h5>
                                            </td>
                                            <td>
                                                                                <a class="isc-action-badge-td-s1" title="Comment" href="#"><i class="fa fa-eye"></i></a>
                                                   <a class="isc-action-badge-td-s1" title="Comment" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                           

                                        </tr>
                                        <tr>

                                            <td>
                                                <h5>
                                                    <img src="img/appimages/PDF_icon.png" style="height:20px;"/> Details1.pdf</h5>
                                            </td>
                                            <td>
                                                                                <a class="isc-action-badge-td-s1" title="Comment" href="#"><i class="fa fa-eye"></i></a>
                                                   <a class="isc-action-badge-td-s1" title="Comment" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                           

                                        </tr>--%>
                                        
                                    </tbody>
                                </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_r2" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Recent 5 Payments </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_r2" style="height: auto;">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="">Bill# 
                                            </th>
                                            <th style="width: 30%;" class="">Payment Date
                                            </th>
                                            <th style="width: 30%;" class=""><center>Paid Amount</center>
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody id="tbl-RecentPayments-Body">
                                      
                                    </tbody>
                                </table>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                              <div class="tab-pane fade in " id="Tab6">
                                                  <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s9" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount</h5>
                                                    <div class="screen-row mar-top-10 collapse in" id="coll_s9" style="height: auto;">
                                                         <table id="data-list" class="isc-table-read-optimal">
                                        
                                        <tbody aria-live="polite" aria-relevant="all" id="tbl-Split-Body">

                                             
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
                </div>

                </div>
            </div>
                </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="approver-Name"> <span style="color:green;" id="amount-Span"> (Approved : $0.00 , Balance :$0.00)</span></h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" title="Close" id="Close-Notes" style="cursor:pointer"></i></a>
                           <%-- <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true"  id="Close-Notes">
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
                                       <h4 class="modal-title" id="commented-Name" style="color:#428bca !important"></h4>
                                        <p class="isc-bill-conf-del" id="approver-Notes">No Comments Found</p>

                                    </div>
                                </div>
                                
                            </div>

                        </div>


                    </div>

                </div>
                
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts-rej" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Edward Abbey <span style="color:red !important;">(Rejected)</span></h4>
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
                                        <p class="isc-bill-conf-del">Because if the payer click the settle up and record cash payment, it is being considered as the person(being paid who has already settled up from his end once he receive the amount) lent some amount to the person who has to pay due to dual settle up</p>

                                    </div>
                                </div>
                                
                            </div>

                        </div>


                    </div>

                </div>
                
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
          <script>
        $(document).ready(function () {
            $("#slt-Tags").select2({
                tags: true,
                tokenSeparators: [',', ' ']
            })
        });
    </script>
    <script src="iscjsengine/PageScript/Bill_ApprovalDetails.js"></script>
</asp:Content>
