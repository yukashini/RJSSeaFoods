<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Bill_PaymentDetails.aspx.cs" Inherits="BillManagement.Bill_PaymentDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .div-select .select2-container {
            width: 100% !important;
        }
        .isc-new-pop-up .modal-body {
    height: calc(100vh - 110px);
    overflow-y: scroll;
}
        .isc-dst-txt-area{
            height:400px !important;
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
                    <a class="isc-theme-blue-btn" style="background-color: #aeaeae !important;" id="cancel">Cancel</a>

                </div>
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" id="btn-Flag" data-submit="1">Flag</a>
                </div>

                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" id="btn-Dispute">Dispute</a>
                </div>
                <div class="cell-right pad-rig-5" style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn" id="pay-btn">Pay</a>

                </div>
                <div class="cell-right pad-rig-5" style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn" id="mPaid-btn">Mark As Paid</a>

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

                                                    <h2 id="file-Message" style="display: none">No File Attatched</h2>
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
                                            <li class="active"><a href="#Tab3" data-toggle="tab">Bill Summary</a> </li>
                                            <li class=""><a href="#Tab6" data-toggle="tab" id="tab-Split" style="display: none">Split Amount </a></li>
                                            <li class=""><a href="#Tab5" data-toggle="tab">Settings</a> </li>
                                            <li class=""><a href="#Tab4" data-toggle="tab">Approvals</a> </li>
                                            <%--<li class=""><a href="#Tab2" data-toggle="tab">Timeline</a> </li>--%>
                                        </ul>
                                        <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                        <div class="tab-content">
                                            <div class="tab-pane fade in active" id="Tab3">
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_s7" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Details   </h5>
                                                    <div class="screen-row mar-top-10 collapse in" id="coll_s7" style="height: auto;">
                                                        <div class="screen-row mar-top-10 isc-mb-res-pay-det">
                                                            <div class="screen-row ">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Vendor Name: </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <label class="mar-top-5" id="vendor-Name"></label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill# : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="invoice-Number"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill Description : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="bill-Desc"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill Amount : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="bill-Amount"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill Category : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="bill-Category"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Payment Terms : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="paymentTerm-Name"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Invoice Date : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="invoice-Date"></label>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Due Date: </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="due-Date"></label>
                                                                </div>
                                                            </div>
                                                            <table class="isc-table-read-optimal mar-top-15" id="tbl-Desc" style="display: none">
                                                                <thead>
                                                                    <tr>
                                                                        <th style="width: 22%;">Description</th>
                                                                        <th style="width: 20%; text-align: right;">Rate</th>
                                                                        <th style="width: 12%; text-align: center;">Qty</th>
                                                                        <th style="width: 22%; text-align: right;">Total</th>
                                                                        <th style="width: 14%;"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="tbl-Desc-Body">
                                                                </tbody>
                                                            </table>
                                                            <div id="bill-Association-Block">
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Customer : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <label class="mar-top-5" id="lbl-Customer"></label>
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Project : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <label class="mar-top-5" id="lbl-Project"></label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="tab-pane fade in " id="Tab6">

                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_6" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount</h5>
                                                    <div class="screen-row mar-top-10 collapse in" id="coll_6" style="height: auto;">
                                                        <table class="isc-table-read-optimal">

                                                            <tbody aria-live="polite" aria-relevant="all" id="tbl-Split-Body">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in " id="Tab5">
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_s3" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approvers   </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s3" style="height: auto;">
                                                        <label id="lbl-AutoApproval">
                                                            <span><span>
                                                                <input type="checkbox" disabled id="auto-Approval" /></span></span>
                                                            Auto Approval</label>
                                                        <div class="screen-row mar-top-10" id="div-Approvers">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10" id="recurrence-Block">
                                                    <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_s4" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Recurrence    </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s4" style="height: auto;">
                                                        <div class="screen-row mar-top-10 ">

                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Start Date : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <label class="mar-top-5" id="recurrence-StartDate"></label>

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
                                                    <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_s8" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s8" style="height: auto;">
                                                        <div class="screen-row mar-top-10">

                                                            <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                                <thead>
                                                                    <tr>
                                                                        <th style="width: 85%;" class="header">File Name</th>

                                                                        <th style="width: 15%;" class="header text-center">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="tbl-Documents-Body">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_s10" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                                                    <div class="screen-row mar-top-10 collapse " id="coll_s10" style="height: auto;">


                                                        <div class="screen-row">
                                                            <div class="isc-crt-bill-not-cont" id="div-Notes">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in " id="Tab4">
                                                <%--<div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approved Amount : </label>
                                                                </div>
                                                                <div class="div-col-65per">
                                                                    <input type="text" placeholder="$150" class="form-control isc-exp-mang-txt-bx1 ">
                                                                </div>
                                                            </div>--%>
                                                <%--<div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Balance Amount : </label>
                                                                </div>
                                                                <div class="div-col-65per">
                                                                    <input type="text" placeholder="$90" class="form-control isc-exp-mang-txt-bx1 " disabled="disabled">
                                                                </div>
                                                            </div>--%>
                                                <%--<div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Approver Comments : </label>
                                                                </div>
                                                                <div class="div-col-65per">
                                                                    <textarea class="form-control"></textarea>
                                                                </div>
                                                            </div>--%>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_r1" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approval History </h5>
                                                    <div class="screen-row mar-top-10 collapse in" id="coll_r1" style="height: auto;">
                                                        <table class="isc-table-read-optimal">
                                                            <thead>
                                                            </thead>
                                                            <tbody aria-live="polite" aria-relevant="all" id="tbl-ApproverHistory-Body">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10" id="payment-Tab" style="display: none">
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
                                                                        <label class="mar-top-5" id="lbl-Amount-Paid">-</label>
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
                                                                <span class="isc-btn-inp-typ-file-s1 cell-right" id="add-Doc-Span" style="cursor: pointer">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Document" title="Add file" />
                                                                </span>
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
                                                                    <tr>
                                                                        <td colspan="2" style="text-align: center;">No Data Found </td>
                                                                    </tr>
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
                                                                    <th style="width: 30%;" class="">
                                                                        <center>Payable Amount</center>
                                                                    </th>


                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbl-RecentPayments-Body">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="tab-pane fade in" id="Tab2">
                                                <div class="<%--isc-bill-trk-lst-cont--%> isc-lst-scrl-cont mar-top-10">
                                                    <h5 class="isc-bill-trk-hdr-txt" href="#coll_32" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right" ></i>Bill Timeline</h5>
                                                    <div class="screen-row mar-top-10 collapse in" id="coll_32" style="height: auto;">
                                                        <div class="isc-time-line-con-scroll-s1  pad-lft-max" style="padding: 20px;">

                                                            <table class="isc-time-line-tble-s1" id="History_Table">
                                                                <tbody>



                                                                    <tr>
                                                                        <td style="width: 100%;">
                                                                            <div title=" James Johnson" class="isc-time-line-cir-bud-txt-s1">JJ</div>
                                                                            <div class="screen-row">
                                                                                <div class="cell-left">
                                                                                    Updated bill by James Johnson
                                                                  
                                                    <h2><span class="isc-dsp-clr ">Disputed</span></h2>
                                                                                </div>
                                                                                <div class="cell-right">
                                                                                    <h2 style="color: red">Jul 4 2021 </h2>

                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="width: 100%;">
                                                                            <div title="Robert Smith" class="isc-time-line-cir-bud-txt-s1">RS</div>
                                                                            <div class="screen-row">
                                                                                <div class="cell-left">
                                                                                    Marked as Disputed by Robert Smith
                                                                  
                                                    <h2><span class="isc-dsp-clr ">Disputed</span></h2>
                                                                                </div>
                                                                                <div class="cell-right">
                                                                                    <h2 style="color: red">Jul 4 2021 </h2>

                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="width: 100%;">
                                                                            <div title="Henry" class="isc-time-line-cir-bud-txt-s1">HE</div>
                                                                            <div class="screen-row">
                                                                                <div class="cell-left">
                                                                                    The Bill amount of $150 has been approved by Henry
                                                    <h2><span style="color: green">Approved</span></h2>
                                                                                </div>
                                                                                <div class="cell-right">
                                                                                    <h2 style="color: red">Jul 4 2021 </h2>

                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="width: 100%;">
                                                                            <div title=" James Johnson" class="isc-time-line-cir-bud-txt-s1">JJ</div>
                                                                            <div class="screen-row">
                                                                                <div class="cell-left">
                                                                                    Submitted bill to Approval by  James Johnson                            
                                                    <h2><span class="isc-wrk-flw-sta-open-req">Pending Approval</span></h2>
                                                                                </div>
                                                                                <div class="cell-right">
                                                                                    <h2 style="color: red">Jul 4 2021 </h2>

                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="width: 100%;">
                                                                            <div title="James Johnson" class="isc-time-line-cir-bud-txt-s1">JJ</div>
                                                                            <div class="screen-row">
                                                                                <div class="cell-left">
                                                                                    Uploaded new bill by James Johnson
                                                                  
                                                    <h2><span class="isc-wrk-flw-sta-open-req">Pending Approval</span></h2>
                                                                                </div>
                                                                                <div class="cell-right">
                                                                                    <h2 style="color: red">Jul 4 2021 </h2>

                                                                                </div>
                                                                            </div>
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
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="approver-Name"><span style="color: green;" id="amount-Span"></span></h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" title="Close" id="Close-Notes" style="cursor: pointer"></i></a>
                            <%--<button type="button" class="close img-typ-sq" id="Close-Notes" aria-hidden="true">
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
                                        <p class="isc-bill-conf-del" id="approver-Notes"></p>

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
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts-rej" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Edward Abbey <span style="color: red !important;">(Rejected)</span></h4>
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
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="Mp_DisputeBill" data-backdrop="static" style="display: none" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 765px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Bill Dispute</h4>
                        </div>
                        <div class="cell-right">
                            <a cancel-dispute-pop="true" title="Close" style="cursor: pointer"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">

                        <div class="screen-row ">
                            <div class="">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Dispute Reason <span style="color: red;">*</span> : </label>
                                </div>
                            </div>
                            <div class="">
                                <textarea placeholder="Enter Dispute Reason" id="txt-Dispute-Reason" rows="4" maxlength="250" class="form-control isc-dst-txt-area" style="margin-top: 23px;"></textarea>

                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                     <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-dispute-pop="true" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;">
                                Cancel</button>
                        </div>
                    </div>
                    <div class="cell-right ">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-submit="2">
                                Ok</button>
                        </div>
                    </div>
                   
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese isc-new-pop-up" id="mp_paid" data-backdrop="static">
        <div class="modal-dialog" style="width: 750px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Mark As Paid</h4>
                        </div>
                        <div class="cell-right">
                            <a data-cancel-pay="true" title="Close" style="cursor: pointer;"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row isc-mb-res-pay-det-popup">
                        <div class="div-col-50per">
                            <div class="screen-row">
                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Vendor :</label>
                                    </div>
                                </div>
                                <div class="div-col-55per">
                                    <label id="lbl-Vendor">-</label>

                                </div>
                            </div>
                            <div class="screen-row mar-top-15">
                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Due Date :</label>
                                    </div>
                                </div>
                                <div class="div-col-55per">
                                    <label id="lbl-Due">-</label>
                                </div>
                            </div>

                            <div class="screen-row mar-top-15">

                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Payment Method <span style="color: red; font-size: 14px;">*</span> </label>
                                    </div>
                                </div>
                                <div class="div-col-55per div-select">
                                    <select class="form-control select2" tabindex="-1" id="slt-PaymentMode" aria-hidden="true">
                                        <option value="0">Select Payment Method</option>



                                    </select>
                                    <%--<input type="text" placeholder="Enter Payment Mode" id="txt-PaymentMode" data-textbox="PaymentMode" maxlength="64" class="form-control"/>--%>
                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="PaymentMode">Payment Mode contains invalid characters. Allowable characters are A-Z, a-z, </span>
                                </div>


                            </div>
                            <div class="screen-row mar-top-15">

                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Ref Number <span style="color: red; font-size: 14px;"></span></label>
                                    </div>
                                </div>

                                <div class="div-col-55per">
                                    <input type="text" placeholder="Enter Ref Number" maxlength="64" id="txt-Ref" class="form-control">
                                </div>
                            </div>
                            <div class="screen-row mar-top-15">

                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Amount Due <span style="color: red; font-size: 14px;">*</span> </label>
                                    </div>
                                </div>

                                <div class="div-col-55per">
                                    <input type="text" placeholder="Enter Amount Due" data-type="currency" maxlength="64" id="txt-DueAmnt" class="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="div-col-50per">
                            <div class="screen-row isc-mb-dots">
                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Bill# :</label>
                                    </div>
                                </div>
                                <div class="div-col-55per">
                                    <label id="lbl-Invoice-Number">-</label>

                                </div>
                            </div>
                            <div class="screen-row mar-top-15">
                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Payable Amount :</label>
                                    </div>
                                </div>
                                <div class="div-col-55per">
                                    <label id="lbl-Amount">-</label>
                                </div>
                            </div>

                            <div class="screen-row mar-top-15">

                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Paid On <span style="color: red; font-size: 14px;">*</span> </label>
                                    </div>
                                </div>
                                <div class="div-col-55per">
                                    <input type="text" placeholder="Enter Paid On" id="txt-PaidOn" class="form-control">
                                </div>


                            </div>
                            <div class="screen-row mar-top-15">

                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Amount Paid <span style="color: red; font-size: 14px;">*</span>  </label>
                                    </div>
                                </div>

                                <div class="div-col-55per">
                                    <input type="text" placeholder="Enter Amount Paid" data-type="currency" maxlength="64" id="txt-PaidAmnt" class="form-control">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="screen-row">
                         <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b mar-top-15">Attachments</h5>
                        <div class="div-col-50per">
                           
                            <div class="screen-row mar-top-15">

                                <div class="div-col-40per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Attachments <span style="color: red; font-size: 14px;"></span></label>
                                    </div>
                                </div>

                                <div class="div-col-50per isc-mb-wdt-80">
                                    <div class="">

                                        <input type="file" style="/*width: 178px;*/ cursor: pointer;" id="browse-Documents" />

                                    </div>
                                </div>
                                <div class="div-col-5per isc-mb-wdt-20">
                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" id="add-Documents"><i class="fa fa-plus" style="margin-top:5px;margin-left:10px;"></i></a>
                                </div>
                                <div class="screen-row">
                                    <table class="isc-table-read-optimal mar-top-28">
                                        <tbody id="tbl-PaidBill-Attachments">
                                            <%--<tr style="cursor: pointer;">
<td style="width: 10%; text-align: center;">
<i class="fa fa-file-o isc-pdf-red"></i>
</td>
<td style="width: 45%;">
<h4>CEO-Report.doc </h4>
</td>

<td style="width: 10%; text-align: center;">

<i class="fa fa-times-circle pad-lft-min isc-act-clr"></i>
</td>
</tr>
<tr style="cursor: pointer;">
<td style="width: 10%; text-align: center;">
<i class="fa fa-file-o isc-pdf-red"></i>
</td>
<td style="width: 45%;">
<h4>Performance-Report.doc </h4>
</td>

<td style="width: 10%; text-align: center;">

<i class="fa fa-times-circle pad-lft-min isc-act-clr"></i>
</td>
</tr>
<tr style="cursor: pointer;">
<td style="width: 10%; text-align: center;">
<i class="fa fa-file-o isc-pdf-red"></i>
</td>
<td style="width: 45%;">
<h4>Finance-Report.doc </h4>
</td>

<td style="width: 10%; text-align: center;">

<i class="fa fa-times-circle pad-lft-min isc-act-clr"></i>
</td>
</tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                     <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-cancel-pay="true" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;">
                                Cancel</button>
                        </div>
                    </div>
                    <div class="cell-right ">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" id="mark-As-Paid" class="btn blue isc-btn-pop-action-s1" data-mbillid="0" data-mapprovedbillid="0">
                                Mark As Paid</button>
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
    <script src="iscjsengine/PageScript/Bill_PaymentDetails.js"></script>
    <script src="iscjsengine/PageScript/PaypalSetup.js"></script>
</asp:Content>
