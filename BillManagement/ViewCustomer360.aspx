<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ViewCustomer360.aspx.cs" Inherits="BillManagement.ViewCustomer360" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .scrtabs-tab-scroll-arrow {
            display: none !important;
        }

        .scrtabs-tabs-fixed-container {
            width: 1304px !important;
        }

        .scrtabs-tabs-movable-container {
            left: unset !important;
            width: unset !important;
        }

        .isc-ven-edit-cont1 .div-col-20per {
            width: 37.8% !important;
        }

        .isc-vnd-msg-btn {
           
            top: 0px !important;
        }
    </style>

    <style>
     




      
        .jodit-wysiwyg {
            max-height: 245px;
        }

        .isc-entity-sm-title {
            display: block;
        }

        .mar-top-50 {
            margin-top: 110px !important;
        }
        #MP_Batch .isc-popup-detail-form-s1 .modal-body{
            min-height:unset;
            max-height:unset;
        }
     #MP_Batch .modal-body {
            height:calc(100vh - 50px) !important;
        }
       .isc-popup-detail-form-s1 .modal-body{
            min-height:unset !important;
            max-height:unset !important;
        }
     #MP_Email .modal-body {
            height:calc(100vh - 50px) !important;
        }
    
        
        .isc-set-wid-img img {
            height: 30px;
            width: 35px;
            margin-top: -6px;
        }

        .div-col-14per {
            float: left;
            width: 14%;
        }

        .isc-rgt-opt label {
            font-size: 14px;
            font-weight: 600;
        }

        .isc-invoice-temp1 .isc-thm-hme-kpi-t2 {
            font-size: 26px;
            line-height: 26px;
        }

        .isc-activity-feed {
            padding: 15px;
            list-style: none;
        }

            .isc-activity-feed .isc-feed-item {
                position: relative;
                padding-bottom: 20px;
                padding-left: 30px;
                border-left: 2px solid #e4e8eb;
                font-size: 14px;
            }

                .isc-activity-feed .isc-feed-item::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 13px !important;
                    height: 13px !important;
                    border-radius: 100px;
                    background: #fff;
                    border: 2px solid #fcb95b;
                }

        .mar-btm-10 {
            margin-bottom: 10px;
        }

        .isc-activity-feed .isc-feed-item .date {
            display: block;
            position: relative;
            top: 0px;
            color: #8c96a3;
            text-transform: uppercase;
            font-size: 10px;
            float: right;
            padding-left: 10px;
        }

        .isc-activity-feed .isc-feed-item .text {
            position: relative;
            top: -3px;
        }

        .text {
            outline: none;
        }

        .isc-color-p2 {
            color: #13a840;
        }

        .isc-color-p5 {
            color: #ff6c6c !important;
        }

        .isc-color-p3 {
            color: #909393 !important;
        }





        .isc-sec-lvl-cust-dd-s1 {
            float: right;
        }

        .tags-container {
            line-height: unset !important;
            border: unset !important;
            min-height: unset !important;
            margin-bottom: unset !important;
            position: unset !important;
        }

        .tag {
            position: relative;
            margin: 2px 6px 2px 0;
            padding: 1px 20px 1px 8px;
            font-size: inherit;
            font-weight: 400;
            text-align: center;
            color: #fff;
            background-color: #1589ee;
            border-radius: 3px;
            transition: background-color 0.3s ease;
            cursor: default;
        }

        .tag__name {
            margin-right: 3px;
        }

        .tag__remove {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 20px;
            height: 100%;
            padding: 0 5px;
            font-size: 16px;
            font-weight: 400;
            transition: opacity 0.3s ease;
            opacity: 0.5;
            cursor: pointer;
            border: 0;
            background-color: transparent;
            color: #fff;
            line-height: 1;
        }

        .isc-set-bdr input {
            display: block;
            border: 1px solid #dadada;
        }

        .tags-container {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 15px;
            min-height: 34px;
            padding: 2px 5px;
            font-size: 14px;
            line-height: 1.6;
            background-color: transparent;
            border: 1px solid #dadada;
            border-radius: 1px;
            overflow: hidden;
            word-wrap: break-word;
        }

        .tags-container {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 15px;
            min-height: 34px;
            padding: 2px 5px;
            font-size: 14px;
            line-height: 1.6;
            background-color: transparent;
            border: 1px solid #dadada;
            border-radius: 1px;
            overflow: hidden;
            word-wrap: break-word;
        }

        .isc-txt-box-wid {
            width: 100% !important;
        }

        .isc-set-bdr td {
            border: unset;
            padding: 2px;
            display: flex;
            border-radius: 4px !important;
        }

        .isc-45per {
            width: 44%;
            float: left;
        }

        isc-pad-lft {
            padding-left: 15px;
        }

        .isc-acc-box-inner-txt p {
            padding-left: 0px;
            margin: 0px;
            white-space: pre-wrap;
        }

        .isc-lft-hdr p {
            font-size: 14px;
            font-weight: 400;
        }

        .modal-content {
            border: unset;
        }

        .isc-55per {
            width: 55.9%;
            float: left;
        }

        .isc-set-bdr {
            border: 1px solid #dadada;
        }

        .isc-h-53 {
            height: 53px;
        }

        .form-control {
            /*width: 200px !important;*/
            font-size: 13px !important;
        }

        .fa-remove::before, .fa-close::before, .fa-times::before {
            content: "";
        }

        .isc-tb1-icon-img {
            width: 15px;
            margin-top: -2px;
        }

        ::placeholder {
            color: #000 !important;
        }

        .isc-h-53 {
            height: 53px !important;
        }

        .isc-groupby-container {
            padding: 10px;
            border: 1px solid #ecf0f1;
            width: 100%;
            / margin: 5px;
            / position: relative;
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

        .split-amount {
            position: fixed;
            top: 40px;
            right: 0;
            background-color: #fff;
            z-index: 9999999;
            display: none;
            box-shadow: 1px 4px 4px 0px #00000040;
            background-color: #fff !important;
        }

        .settings {
            position: fixed;
            top: 40px;
            right: 0;
            background-color: #fff;
            z-index: 9999999;
            display: none;
            box-shadow: 1px 4px 4px 0px #00000040;
            background-color: #fff !important;
        }



        .split-amount.split-amount-show {
            display: block;
        }

        .settings.settings-show {
            display: block;
        }

        .isc-bill-trk-lst-cont.isc-cus-var {
            border: none !important;
            padding-top: 30px;
        }

        .isc-cus-var1 {
            padding-top: 30px;
        }

        .isc-dec-table {
            display: none;
        }

        .isc-crt-bill-add.isc-cus-add {
            font-size: 20px;
            line-height: 31px;
            color: #5d5d5d;
            margin-left: 0px;
            float: left;
            position: absolute;
            margin-left: 10px;
            cursor: pointer;
        }

        .close-amount {
            padding-right: 16px !important;
            padding: 9px;
            color: #fff;
        }

        i.close-amount {
            cursor: pointer;
        }

        .close-settings {
            padding-right: 16px !important;
            padding: 9px;
            color: #fff;
        }

        i.close-settings {
            cursor: pointer;
        }

        .cls {
            background-color: aqua !IMPORTANT;
            width: 100% !important;
            text-align: right;
            background-image: linear-gradient(to right, #2e85bb 10%, #00a1b7) !important;
        }

            .cls h3 {
                margin: 0;
                padding: 0;
                text-align: left;
                position: absolute;
                font-size: 16px;
                color: #fff;
                margin-top: 7px;
                margin-left: 10px;
                font-weight: 400;
            }

        .auto-height {
            height: calc(100vh - 55px);
        }

        .isc-btn-inp-typ-file-s1 {
            background-color: #1589ee !important;
            font-size: 13px;
            color: #fff !important;
        }
       a.isc-bdg-grd-sts-s2.isc-bdg-col-c1:hover {
    color: #000;
}
       span#spn_email {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-left: 10px;
    margin-top: -8px;
}
            span#spn_phone {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-left: 10px;
    margin-top: -8px;
}
       .isc-vnd-edt-acc a{
           display: inline-flex;
       }
       .isc-bill-trk-hdr-txt {
    cursor: default !important;
}
       .isc-new-pop-up .modal-body {
    height: calc(100vh - 151px);
    overflow-y: auto;
}
       .isc-approved-color {
    color: #1589ee !important;
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
                                <i class="fa fa-pencil"></i>
                                <h2 style="line-height: 30px;">View Customer</h2>
                                <h6 class="mar-none"></h6>
                            </div>
                        </div>
                    </div>
                    <%--<div class="div-col-70per">
                        <div class="cell-right pad-rig-5 " style="margin-top: 9px;">
                            <a class="isc-theme-blue-btn" href="#">Export</a>

                        </div>
                    </div>--%>
                </div>
                <div class="isc-app-screen-body-container" style="height: 28px;">
                    <div class="screen-row">
                        <div class="isc-app-screen-sec-container-s1 ">
                            <div class="isc-ven-edit-cont1">
                                <div class="screen-row">
                                    <div class="div-col-50per">
                                        <div class="isc-page-header">
                                            <div class="div-col-10per">
                                                <img src="" id="Customerlogo" class="isc-bill-ven-logo">
                                            </div>
                                            <div class="div-col-60per">
                                                <h2 style="display: inline-block;"><span id="spn_customer"></span></h2>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="screen-row mar-top-15">
                                    <div class="div-col-20per" style="padding-left: 65px;">
                                        <label>Email</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-envelope-o"></i> <span id="spn_email"></span></a></h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label>Phone</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-phone"></i> <span id="spn_phone"></span></a></h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label>Receivable Amount</label>
                                        <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$<span id="spn_receamount">0</span></h4>
                                    </div>

                                    <div class="div-col-15per">
                                        <label title="9/12/2020">Last Payment</label>
                                        <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$<span id="spn_lastpayment">0</span></h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label title="9/12/2020">Total Amount Received</label>
                                        <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$<span id="spn_amountrece">0</span></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="isc-screen-nav-container-s1">
                                    <ul class="nav nav-tabs" style="position: relative;">
                                        <li class="active"><a href="#Tab1" data-toggle="tab">Invoices</a> </li>
                                        <li class="" id="tab_payment"><a href="#Tab2" data-toggle="tab">Payments</a> </li>

                                        <li class=""><a href="#Tab4" data-toggle="tab" id="customer-Contact-List">Contact</a> </li>
                                        <li class="" id="tab-details"><a href="#Tab5" data-toggle="tab">Details</a> </li>
                                        <li class=""><a href="#Tab6" data-toggle="tab" id="Customer-tab">Documents</a> </li>
                                        <li class=""><a href="#Tab7" data-toggle="tab" id="customer-Notes-List">Notes</a> </li>

                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane fade in active" id="Tab1">
                                            <div class="screen-row">

                                                <div class="isc-bill-inr-cont1 mar-top-10">
                                                    <div class="screen-row">
                                                        <ul class="nav nav-tabs" style="position: relative;">
                                                            <li id="tab-unpaid" class="active"><a href="#tbl_Invoice" data-toggle="tab">Unpaid</a> </li>
                                                            <li id="tab-paid" class=""><a href="#tbl_Invoice" data-toggle="tab">Paid</a> </li>
                                                            <li id="tab-allInvoice" class=""><a href="#tbl_Invoice" data-toggle="tab">All Invoice</a> </li>
                                                            <%--<li class=""><a href="#Tab13" data-toggle="tab">Recurring</a> </li>--%>
                                                        </ul>

                                                        <div class="tab-content">
                                                            <div class="tab-pane fade in active" id="tbl_Invoice">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                                    <thead>
                                                                        <tr>

                                                                            <th style="width: 13%;" class="header" title="Customer">Customer</th>
                                                                            <th style="width: 13%;" class="header" title="Invoice #">Invoice #
                                                        </th>

                                                                            <th style="width: 19%;" class="header" title="Invoice Description">Invoice Description
                                                        
                                                        </th>


                                                                            <th style="width: 16%;" class="header" title="Invoice Status">Invoice Status
                                                        </th>

                                                                            <th style="width: 12%;" class="header" title="Due Date">Due Date
                                                        </th>
                                                                            <th style="width: 10%;" class="header" title="Amount Due">Amount Due
                                                        </th>
                                                                            <th style="width: 14%; text-align: center; cursor:default;"title="Action" >Action
                                                        </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbl_invoicebdy">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="tab-pane fade in " id="Tab12">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>
                                                                          <th style="width: 11%;" class="header" title="Customer">Customer</th>
                                                                            <th style="width: 12%;" class="header" title="Invoice #">Invoice #
                                                        </th>

                                                                            <th style="width: 19%;" class="header" title="Invoice Description">Invoice Description
                                                        
                                                        </th>


                                                                            <th style="width: 16%;" class="header" title="Invoice Status">Invoice Status
                                                        </th>

                                                                            <th style="width: 12%;" class="header" title="Due Date">Due Date
                                                        </th>
                                                                            <th style="width: 10%;" class="header" title="Amount Due">Amount Due
                                                        </th>
                                                                            <th style="width: 14%; text-align: center; cursor:default;"title="Action" >Action
                                                        </th>


                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>Johnson &amp; Co</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500095</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Electric Metered Bill</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Payment Completed</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5 style="color: red !important;">9/3/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>

                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>Nicholson LLC.</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500096</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Electric Un Metered Bill</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Payment Completed</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/11/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>BSVGP Inc.</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500098</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>PO-679873</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Payment Completed</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/18/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>

                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>Johnson &amp; Co</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500099</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Invoice for the purchase of PO799</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Payment Completed</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/21/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>

                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="tab-pane fade in " id="Tab13">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>
                                                                          <th style="width: 11%;" class="header" title="Customer">Customer</th>
                                                                            <th style="width: 12%;" class="header" title="Invoice #">Invoice #
                                                        </th>

                                                                            <th style="width: 19%;" class="header" title="Invoice Description">Invoice Description
                                                        
                                                        </th>


                                                                            <th style="width: 16%;" class="header" title="Invoice Status">Invoice Status
                                                        </th>

                                                                            <th style="width: 12%;" class="header" title="Due Date">Due Date
                                                        </th>
                                                                            <th style="width: 10%;" class="header" title="Amount Due">Amount Due
                                                        </th>
                                                                            <th style="width: 14%; text-align: center; cursor:default;"title="Action" >Action
                                                        </th>


                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>Johnson &amp; Co</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500095</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Electric Metered Bill</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Payment Completed</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5 style="color: red !important;">9/3/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>Nicholson LLC.</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500096</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Electric Un Metered Bill</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Payment Completed</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/11/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>BSVGP Inc.</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500098</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>PO-679873</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-re-req " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Rejected</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/18/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                            </td>

                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <h5>Johnson &amp; Co</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>1500099</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Invoice for the purchase of PO799</h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-flg " data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-circle-o"></i>Flagged</a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                                        <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                                        <li><a href="#" class="" style="color: red;">Payment Failed</a></li>
                                                                                        <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                        <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/21/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5>$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

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
                                        <div class="tab-pane fade in " id="Tab2">
                                            <div class="screen-row">

                                                <div class="isc-bill-inr-cont1 mar-top-10">
                                                    <div class="screen-row">
                                                        <div class="isc-screen-nav-container-s1">
                                                            <ul class="nav nav-tabs">
                                                                <li class="active" id="tab_unpaid"><a href="#tbl_payment" data-toggle="tab">Unpaid Invoices</a> </li>
                                                                <li class="" id="tab_paymentpaidinvoice"><a href="#tbl_payment" data-toggle="tab">Paid Invoices</a> </li>
                                                                <li class="" id="tab_allinvoice"><a href="#tbl_payment" data-toggle="tab">All Invoices</a> </li>
                                                                <%-- <li class=""><a href="#Tab23" data-toggle="tab">Disputed Invoices</a> </li>
                                                                <li class=""><a href="#Tab24" data-toggle="tab">Recurring Invoices </a></li>--%>
                                                            </ul>
                                                        </div>
                                                        <div class="tab-content">
                                                            <div class="tab-pane fade active  in" id="Tab21">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1" id="tbl_payment">
                                                                    <thead>
                                                                        <tr>


                                                                            <th style="width: 15%;" class="header">Invoice #
                                                        </th>

                                                                            <th style="width: 19%;" class="header">Invoice Description
                                                        
                                                        </th>

                                                                            <th style="width: 17%;" class="header">Invoice Status
                                                        </th>

                                                                            <th style="width: 13%;" class="header">Stage
                                                        </th>
                                                                            <th style="width: 12%;" class="header">Due Date
                                                        </th>
                                                                            <th style="width: 11%;" class="header">Amount Due
                                                        </th>
                                                                            <th style="width: 16%; text-align: center; cursor:default;">Action
                                                        </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbl_paymentbdy"></tbody>
                                                                </table>
                                                            </div>
                                                            <div class="tab-pane fade" id="Tab22">
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade in " id="Tab4">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row">
                                                    <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                        <a class="isc-theme-blue-btn" id="btn_Addconect">Add Contact</a>
                                                    </div>
                                                </div>
                                                 <div class="isc-tab-src-cont-res">
                                                <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10" id="tbl-Contact">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 25%;" class="header" sort-column-type="text" column-name="Name" data-sort-contact="Name">Name</th>
                                                            <th style="width: 40%;" class="header" sort-column-type="text" column-name="Email" data-sort-contact="Email">Email
                                                            </th>

                                                            <th style="width: 25%;" class="header" sort-column-type="text" column-name="Phone" data-sort-contact="Phone">Phone Number 
                                                        
                                                            </th>
                                                            <th style="width: 10%; cursor:default;">Action 
                                                        
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbl-Contact-Body">
                                                    </tbody>
                                                </table>
                                            
                                                 </div></div>
                                        </div>
                                        <div class="tab-pane fade in " id="Tab5">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row mar-top-10">
                                                    <div class="screen-row">
                                                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                            <a id="btn-editcustomer" class="isc-theme-blue-btn" href="#">Edit Customer</a>
                                                        </div>
                                                    </div>

                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b" style="margin-top: 0px;">Customer Info : </h5>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Customer Name : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_name"></label>

                                                            </div>
                                                        </div>

                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Contact Number: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_phone"></label>

                                                            </div>
                                                        </div>

                                                    </div>





                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Customer Type : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_type"></label>

                                                            </div>


                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Payment Terms: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_terms"></label>

                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div class="screen-row mar-top-10">

                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Primary Email: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_email"></label>

                                                            </div>
                                                        </div>

                                                        

                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <%--<div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Tax Id : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_taxid"></label>

                                                            </div>
                                                        </div>--%>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Preferred Payment Method: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_method"></label>

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <%--<div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Lead time (Days): </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_leadda"></label>

                                                            </div>
                                                        </div>

                                                    </div>--%>






                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b">Address : </h5>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Customer Address: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_address"></label>

                                                            </div>
                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">City: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_city"></label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">State : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_state"></label>

                                                            </div>
                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Country : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_country"></label>

                                                            </div>
                                                        </div>

                                                    </div>



                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Zip : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_zip"></label>

                                                            </div>
                                                        </div>


                                                    </div>






                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b">Bank details : </h5>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Account Holder Name: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_accholdername"></label>

                                                            </div>
                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Routing Number: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_routingno"></label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Account Number: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_accountno"></label>

                                                            </div>
                                                        </div>
                                                        <%--<div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">ACH Routing Number: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_achroutingno"></label>

                                                            </div>
                                                        </div>--%>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade in " id="Tab6">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row">
                                                    <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                                                        <span class="isc-btn-inp-typ-file-s1 cell-right">Add Document

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Documents" title="Add Document" />
                                                        </span>
                                                        <%--<a class="isc-theme-blue-btn" data-toggle="modal" href="#">Add Document</a>--%>
                                                    </div>

                                                </div>
                                                <div id="div-Documents-Body">
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-4per">
                                                            <div class="isc-bill-doc-typ">
                                                                <i class="fa fa-file"></i>
                                                            </div>
                                                        </div>
                                                        <div class="div-col-60per">
                                                            <h5 class="isc-vnd-edt-acc">Documents to review</h5>
                                                            <h6 class="isc-bill-vnd-doc-t1">Last Modified <span>November 17,2017</span></h6>
                                                            <h6 class="isc-bill-vnd-doc-t1">Owned By</h6>
                                                            <div class="isc-bill-vnd-pos">
                                                                <div class="isc-bill-vnd-nam-bet"><span>J</span></div>
                                                                <h4 class="isc-bill-vnd-nam1">Jhon Doe</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-4per">
                                                            <div class="isc-bill-doc-typ">
                                                                <i class="fa fa-file"></i>
                                                            </div>
                                                        </div>
                                                        <div class="div-col-60per">
                                                            <h5 class="isc-vnd-edt-acc">Documents to review</h5>
                                                            <h6 class="isc-bill-vnd-doc-t1">Last Modified <span>November 17,2017</span></h6>
                                                            <h6 class="isc-bill-vnd-doc-t1">Owned By</h6>
                                                            <div class="isc-bill-vnd-pos">
                                                                <div class="isc-bill-vnd-nam-bet"><span>J</span></div>
                                                                <h4 class="isc-bill-vnd-nam1">Jhon Doe</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-4per">
                                                            <div class="isc-bill-doc-typ">
                                                                <i class="fa fa-file"></i>
                                                            </div>
                                                        </div>
                                                        <div class="div-col-60per">
                                                            <h5 class="isc-vnd-edt-acc">Documents to review</h5>
                                                            <h6 class="isc-bill-vnd-doc-t1">Last Modified <span>November 17,2017</span></h6>
                                                            <h6 class="isc-bill-vnd-doc-t1">Owned By</h6>
                                                            <div class="isc-bill-vnd-pos">
                                                                <div class="isc-bill-vnd-nam-bet"><span>J</span></div>
                                                                <h4 class="isc-bill-vnd-nam1">Jhon Doe</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="tab-pane fade in " id="Tab7">
                                            <div class="isc-bill-inr-cont1 mar-top-10" style="padding: 0px;">
                                                <div class="isc-vnd-edit-foot-cont">
                                                    <div class="screen-row">
                                                        <div class="div-col-95per">
                                                            <input type="text" class="form-control" id="txt-Notes" placeholder="Enter notes">
                                                        </div>
                                                        <div class="div-col-5per">
                                                            <a id="add-Notes" class="isc-vnd-msg-btn" style="cursor: pointer">Send</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="isc-bill-vnd-edi-cht-cont" style="padding: 10px;" id="div-Notes-Body"></div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_add-contact" tabindex="-1" role="basic" aria-hidden="false">
                <div class="modal-dialog" style="width: 650px;margin: 0 auto;margin-right: 0;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="screen-row">
                                <div class="cell-left">
                                    <h4 class="modal-title" id="div_add">Add Contact</h4>
                                </div>
                                <div class="cell-left" id="div_Update" style="display:none">
                                    <h4 class="modal-title">Update Contact</h4>
                                </div>
                                <div class="cell-right">
                                    <a type="button" class="fa fa-times-circle isc-popup-close cell-right mar-top-10" data-dismiss="modal" aria-hidden="true" id="btn_close" title="Close">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="screen-row">

                            <div class="modal-body">
                                <div class="screen-row">
                                    <div class="form-body">
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>First Name <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup></label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter First Name" id="contact-first-Name" data-textbox="firstName" class="form-control alphabets-only">
                                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="firstName" id="first-Name-Validation">First Name should not be empty</span>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>Last Name</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Last Name" id="contact-last-Name" class="form-control alphabets-only">
                                                </div>

                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>Email <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup></label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Email" data-email="Email" maxlength="64" id="contact-email" class="form-control">
                                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="Email" data-email="Email" id="emailvalidation">Entered Email id is not valid.</span>
                                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="email" id="email-Validation">Email should not be empty</span>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>Phone Number <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup></label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Phone Number" phone-number="true" id="contact-phone" class="form-control" data-textbox="Phone" maxlength="17">
                                                    <span class="validation-message" id="phone-Validation" style="display: none; color: red" error-active="false" data-validation="Phone">Phone Number should not be empty</span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>
                        <div class="modal-footer">
                            <div class="isc-pop-btn-cen-cell-s1">
                                <button type="button" data-toggle="modal" class="btn blue isc-btn-pop-action-s1" id="insert-Customer-Contact" title="Add">
                                    Add</button>
                                <button type="button" class="btn blue isc-btn-pop-action-s1" id="Update-Customer-Contact" style="display: none;">
                                    Update</button>
                                <button type="button" class="btn default isc-btn-pop-action-s2" id="btn_cancel" data-dismiss="modal" title="Cancel">
                                    Cancel</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.mokdmadal-dialog -->
                </div>
            </div>
            <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="EditContact" tabindex="-1" role="basic" aria-hidden="false">
                <div class="modal-dialog" style="width: 650px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="screen-row">
                                <div class="cell-left">
                                    <h4 class="modal-title">Edit Contact</h4>
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
                                                <div class="div-col-30per">
                                                    <label>First Name</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter First Name" class="form-control">
                                                </div>

                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>Last Name</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Last Name" class="form-control">
                                                </div>

                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>Email</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Email" class="form-control">
                                                </div>

                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <div class="screen-row">
                                                <div class="div-col-30per">
                                                    <label>Phone</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Phone" class="form-control">
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>
                        <div class="modal-footer">
                            <div class="isc-pop-btn-cen-cell-s1">
                                <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                    Save</button>
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

    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_contact_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title"> Delete Contact </h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color: #fff; cursor: pointer;" title="Close" delete-contact-cancel="true" id="btn_deleteclose" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  delete-cancel="true" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height: 75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4>Are you sure want to delete the contact?</h4>

                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-delete-contact="0" id="btn-deleteContact-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" delete-contact-cancel="true" data-dismiss="modal" id="close-delete">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Batch" tabindex="-1" role="basic" aria-hidden="false" style="display: none; width: 60%;">
        <div class="modal-dialog" style="width: 760px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="div-col-85per">
                        <h4 style="color: #ffff" class="modal-title"><i class="fa fa-external-link-square" aria-hidden="true"></i>Invoice</h4>
                    </div>
                    <div class="div-col-15per">
                        <a data-dismiss="modal" title="Close" id="btn-close" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close cell-right mar-top-10"></i></a>

                    </div>

                </div>
                <div class="modal-body isc-hor-popup-field pad-20 isc-pop-select2">
                    <div class="modal-content isc-style-1">
                        <div class="isc-100per isc-invoice-temp1">
                            <div class="isc-bor-lft-pos" style="border-left: unset;">
                                <div class="isc-temp-head-cont isc-bg-blue">
                                    <div class="screen-row">
                                        <div class="div-col-70per">
                                            <div class="isc-entity-header-actions">

                                                <h1 class="isc-tail-h1-p1 mar-top-30">Invoice</h1>

                                            </div>
                                        </div>
                                        <div class="div-col-15per">
                                            <span class="isc-entity-sm-title">Invoice #:</span>
                                            <span class="isc-entity-sm-title">Invoice Date:</span>
                                            <span class="isc-entity-sm-title">Due Date:</span>

                                        </div>
                                        <div class="div-col-10per">
                                            <span class="isc-entity-sm-title" id="ibl_invoice"></span>
                                            <span class="isc-entity-sm-title" id="ibl_Indate" style="width: 145px"></span>
                                            <span class="isc-entity-sm-title" id="ibl_termcode"></span>

                                        </div>
                                    </div>

                                </div>
                                <div class="isc-temp-bdy-cont">
                                    <div class="screen-row">
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top">
                                                    <p class="isc-f-w-br">From :</p>
                                                    <div class=" isc-lft-hdr">
                                                        <span id="spn_from"></span>


                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top ">
                                                    <p class="isc-f-w-br">Invoice to</p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="spn_to"></span>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top">
                                                    <p class="isc-f-w-br">Ship To :</p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="spn_shipto"></span>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top cell-right">
                                                    <p class="isc-f-w-br">Invoice Total :</p>
                                                    <div class=" isc-lft-hdr">
                                                        <h2 class="isc-thm-hme-kpi-t2 isc-color-p1">$<span id="ibl_total"></span></h2>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="screen-row">
                                        <table class="isc-t300-hrm-lst isc-table isc-table-row isc-table-bordered mar-top-30">
                                            <thead>
                                                <tr>
                                                    <th style="width: 30%;" title="Description">Description</th>
                                                    <th style="width: 15%; text-align: right" title="Unit Price">Unit Price</th>
                                                    <th style="width: 20%; text-align: right" title="Amount">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl-order">
                                                <%-- <tr>
                                                    <td>Amazon Cloud Watch - 5GB</td>
                                                    <td style="text-align: right">9,900.00
                                                    </td>
                                                    <td style="text-align: center">1</td>
                                                    <td style="text-align: right">9,900.00</td>
                                                </tr>
                                                <tr>
                                                    <td>AWS Data Transfer - 15GB</td>
                                                    <td style="text-align: right">975.00
                                                    </td>
                                                    <td style="text-align: center">2</td>
                                                    <td style="text-align: right">1,950.00</td>
                                                </tr>
                                                <tr>
                                                    <td>AWS key management service</td>
                                                    <td style="text-align: right">99.00
                                                    </td>
                                                    <td style="text-align: center">3</td>
                                                    <td style="text-align: right">297.00</td>
                                                </tr>--%>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="screen-row">
                                        <div class="div-col-70per">
                                            <p></p>
                                        </div>
                                        <div class="div-col-30per">
                                            <table class="isc-t300-hrm-lst isc-table isc-table-row isc-set-bdt-dot">

                                                <tbody>
                                                    <%--<tr>
                                                        <td class="isc-color-p1">Sub Total</td>
                                                        <td style="text-align: right">12,147.00
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td class="isc-color-p1">GST 12.01%</td>
                                                        <td style="text-align: right">4,469.00
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td class="isc-color-p1">Total</td>
                                                        <td style="text-align: right">$7,678.00
                                                        </td>

                                                    </tr>--%>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-50">
                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                            <p class="isc-f-w-br">Terms and Conditions : </p>
                                            <div class=" isc-lft-hdr">
                                                <p>Payment is due within 15 days</p>
                                                <p class="mar-top-20">Bank Of America</p>
                                                <p>Account number : 12345678</p>
                                                <p>Routing Number : 098546734</p>

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
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Email" tabindex="-1" role="basic" aria-hidden="false" style="display: none; width: 90%;">
        <div class="modal-dialog" style="width: 90%;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="div-col-85per">
                        <h4 class="modal-title" style="color: #ffff !important"><i class="fa fa-external-link-square" aria-hidden="true"></i>Email</h4>
                    </div>

                    <div class="div-col-15per">
                        <a data-dismiss="modal" id="Btn-close" title="Close" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close cell-right mar-top-10"></i></a>
                        <a id="btn_sendemail" href="#" title="Send Email" class="isc-dd-drat-btn-s1 isc-send-email-btn isc-btn-primary isc-sub-menu-list-s1 isc-sub-menu-list-s1 cell-right mar-rig-10" style="background-color: #fff !important; color: #1589ee !important">Send Email</a>
                    </div>

                </div>
                <div class="modal-body isc-hor-popup-field pad-20 isc-pop-select2">
                    <div class="modal-content isc-style-1">
                        <div class="isc-100per isc-invoice-temp1">
                            <div class="isc-45per ">
                                <div class="isc-screen-row mar-top-15">
                                    <label>Primary Email</label>
                                    <table class="isc-set-bdr isc-table-read-optimal isc-tab-var isc-table-sorter-s1">
                                        <tbody>


                                            <tr style="cursor: pointer;">


                                                <td colspan="2">


                                                    <input style="width: 100%" type="text" id="exist-valuesTo" readonly="readonly">
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="isc-screen-row mar-top-15">

                                    <label>CC</label>
                                    <table class="isc-set-bdr isc-table-read-optimal isc-tab-var isc-table-sorter-s1">
                                        <tbody>


                                            <tr style="cursor: pointer;">


                                                <td colspan="2">


                                                    <input style="width: 100%" type="text" id="exist-valuescc" readonly="readonly">
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>





                                <%--<div class="isc-screen-row mar-top-15">

                                    <label>CC</label>

                                    <div class="screen-row isc-mar-t1">

                                        <table class="isc-set-bdr isc-table-read-optimal isc-tab-var isc-table-sorter-s1">
                                            <tbody>


                                                <tr style="cursor: pointer;">


                                                    <td colspan="2">

                                                        <label for="exist-values">
                                                            <input type="hidden" id="exist-valuescc" class="tagged1 form-control" data-removebtn="true" name="tag-2">
                                                        </label>

                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>

                                </div>--%>



                                <div class="screen-row mar-top-15">

                                    <label>Subject</label>



                                    <textarea id="txt_subject" placeholder="" readonly rows="4" class="form-control isc-txt-box-wid" style="resize: none; width: 100% !important"></textarea>
                                </div>

                                <h5 class="isc-agil-scr-tile-con-lbl-s1 mar-top-15" href="#coll_31" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Content</h5>

                                <div class="screen-row mar-top-10 collapse in" id="coll_31" style="height: auto;">


                                    <div class="isc-screen-row">
                                        <div id="editor">

                                            <p>
                                                Hi
                                                <label id="lbl_vendor"></label>
                                            </p>
                                            <p class="mar-top-15">
                                                Thanks for your Business
                                                <label id="lbl_Invoicedate"></label>
                                            </p>
                                            <p class="mar-top-15">
                                                The Invoice<span id="spn_InvoiceNo"></span>is attached with this email for your reference. You can choose the way out and pay online.
                                            </p>

                                            <p class="mar-top-15">
                                                Here's an overview of the invoice for your reference
                                            </p>
                                            <p class="mar-top-15">
                                                Invoice Overview
                                            </p>
                                            <p>
                                                Invoice Number :<span id="spn_invoice"></span>
                                            </p>
                                            <p>
                                                Invoice Date :<span id="spn_invicedate"></span>
                                            </p>
                                            <p>
                                                Total Amount :<span id="spn_amount"></span>
                                            </p>
                                            <p class="mar-top-15">
                                                It was great working. Looking forward to working with you again.
                                            </p>

                                        </div>

                                    </div>

                                    <%--  <div class="screen-row ">
                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                            <p class="isc-f-w-br">Online Payment</p>



                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="isc-hor-details">
                                            <div class="isc-40per">
                                                <div class="isc-detail-name">
                                                    <div class="isc-hr-element">
                                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                                        <label for="vehicle1">
                                                            Credit Card

                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="div-col-60per isc-set-wid-img">
                                                <img src="images/visa1.png" />
                                                <img src="images/mastercard.png" />
                                            </div>
                                        </div>


                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="isc-hor-details">
                                            <div class="isc-40per">
                                                <div class="isc-detail-name">
                                                    <div class="isc-hr-element">
                                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                                        <label for="vehicle1">Bank Transfer</label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="div-col-60per isc-set-wid-img">
                                                <img src="images/BankTransfer.png" />
                                            </div>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>

                            <div class="isc-55per isc-pad-lft isc-bor-lft-pos" style="border-left: unset;">
                                <div class="isc-temp-head-cont isc-bg-blue">
                                    <div class="screen-row">
                                        <div class="div-col-70per">
                                            <div class="isc-entity-header-actions">

                                                <h1 class="isc-tail-h1-p1 mar-top-30">Invoice</h1>

                                            </div>
                                        </div>
                                        <div class="div-col-14per">
                                            <span class="isc-entity-sm-title">Invoice #:</span>
                                            <span class="isc-entity-sm-title">Invoice Date:</span>
                                            <span class="isc-entity-sm-title">Term Code:</span>

                                            <%--<span class="isc-entity-sm-title">P.O No</span>--%>
                                        </div>
                                        <div class="div-col-14per">
                                            <span class="isc-entity-sm-title" id="spn-Invoice"></span>
                                            <span class="isc-entity-sm-title" id="spn-indate" style="width: 168px;"></span>

                                            <span class="isc-entity-sm-title" id="spn-termcode"></span>
                                            <%--<span class="isc-entity-sm-title">24302010</span>--%>
                                        </div>
                                    </div>

                                </div>
                                <div class="isc-temp-bdy-cont">
                                    <div class="screen-row">
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top">
                                                    <p class="isc-f-w-br">From :</p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="lbl_from"></span>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top ">
                                                    <p class="isc-f-w-br">Invoice To</p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="lbl_to"></span>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top">
                                                    <p class="isc-f-w-br">Ship To :</p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="lbl_shipto"></span>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top cell-right">
                                                    <p class="isc-f-w-br">Invoice Total :</p>
                                                    <div class=" isc-lft-hdr">
                                                        <h2 class="isc-thm-hme-kpi-t2 isc-color-p1">$<span style="width: 168px" id="spn-total"></span></h2>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="screen-row">
                                        <table class="isc-t300-hrm-lst isc-table isc-table-row isc-table-bordered mar-top-30">
                                            <thead>
                                                <tr>
                                                    <th style="width: 30%;" title="Description">Description</th>
                                                    <th style="width: 15%; text-align: right" title="Unit Price">Unit Price</th>
                                                    <th style="width: 20%; text-align: right" title="Amount">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl_orderemail">
                                                <%-- <tr>
                                                    <td>Amazon Cloud Watch - 5GB</td>
                                                    <td style="text-align: right">9,900.00
                                                    </td>
                                                    <td style="text-align: center">1</td>
                                                    <td style="text-align: right">9,900.00</td>
                                                </tr>
                                                <tr>
                                                    <td>AWS Data Transfer - 15GB</td>
                                                    <td style="text-align: right">975.00
                                                    </td>
                                                    <td style="text-align: center">2</td>
                                                    <td style="text-align: right">1,950.00</td>
                                                </tr>
                                                <tr>
                                                    <td>AWS key management service</td>
                                                    <td style="text-align: right">99.00
                                                    </td>
                                                    <td style="text-align: center">3</td>
                                                    <td style="text-align: right">297.00</td>
                                                </tr>--%>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="screen-row">
                                        <div class="div-col-70per">
                                            <p></p>
                                        </div>
                                        <div class="div-col-30per">
                                            <table class="isc-t300-hrm-lst isc-table isc-table-row isc-set-bdt-dot">

                                                <tbody>
                                                    <tr>
                                                        <%-- <td class="isc-color-p1">Sub Total</td>
                                                        <td style="text-align: right">12,147.00--%>
                                                        <%-- </td>--%>
                                                    </tr>
                                                    <tr>
                                                        <%-- <td class="isc-color-p1">GST 12.01%</td>
                                                        <td style="text-align: right">4,469.00
                                                        </td>--%>
                                                    </tr>
                                                    <%--<tr>
                                                        <td class="isc-color-p1">Total</td>
                                                        <td style="text-align: right">$7,678.00
                                                        </td>

                                                    </tr>--%>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-50">
                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                            <p class="isc-f-w-br">Terms and Conditions : </p>
                                            <div class=" isc-lft-hdr">
                                                <p>Payment is due within 15 days</p>
                                                <p class="mar-top-20">Bank Of America</p>
                                                <p>Account number : 12345678</p>
                                                <p>Routing Number : 098546734</p>

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
    <script>
        $(document).ready(function () {
            $(".isc-split").click(function () {
                $(".split-amount").toggleClass("split-amount-show");
                $(".split-amount").parents(".slider").find(".settings-show").removeClass("settings-show");
            })
            $(".isc-panel-settings").click(function () {
                $(".settings").toggleClass("settings-show");
                $(".settings").parents(".slider").find(".split-amount-show").removeClass("split-amount-show");
            })
        })
    </script>
    <script>
        $(document).ready(function () {
            $(".close-amount").click(function () {
                $(".split-amount").removeClass("split-amount-show");
            });
            $(".close-settings").click(function () {
                $(".settings").removeClass("settings-show");
            });
        })
    </script>
    <script>
        $('#isc-layout-s1').click(function () {
            $("#exp-lst-view").show();
            $("#exp-kab-view").hide();
            $(".filter-toggle-btn-cls").hide();
        })
        $('#isc-layout-s2').click(function () {
            $("#exp-kab-view").show();
            $("#exp-lst-view").hide();
            $(".filter-toggle-btn-cls").show();
        })
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
    
    <script>
        var editor = new Jodit('#editor', {
            "uploader": {
                "insertImageAsBase64URI": true
            }
        });
    </script>
    
    <script src="iscjsengine/PageScript/Viewcustomer360.js"></script>
</asp:Content>
