<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="History.aspx.cs" Inherits="BillManagement.History1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <style>
        .isc-set-cen-pop .modal-dialog {
            position: absolute;
            margin-left: -19em;
            top: 6em;
            left: 54%;
            right: unset;
            bottom: unset;
        }

        .isc-set-cen-pop .modal-body {
            min-height: 100px;
        }

        #confirm .modal-body {
            background-color: #fff;
            padding: 14px 20px;
            min-height: 200px !important;
            max-height: 500px !important;
            overflow: hidden;
            overflow-y: auto;
        }

      /*  .isc-screen-nav-container-s1 ul li {
            width: 13% !important;
        }*/

        .isc-popup-detail-form-s1 .modal-title {
            color: #fff;
        }

        .open > .dropdown-menu-entity {
            display: block;
        }

        .scrtabs-tabs-movable-container {
            width: unset !important;
            left: 0px !important;
        }

        .scrtabs-tabs-fixed-container {
            width: 100% !important;
        }

        .scrtabs-tab-scroll-arrow-right {
            display: none !important;
        }

        .scrtabs-tab-scroll-arrow {
            display: none !important;
        }

        a:hover, a:focus {
            color: #fff;
        }

        .jodit-wysiwyg {
            max-height: 245px;
        }

        .isc-entity-sm-title {
            display: block;
        }

        .mar-top-50 {
            margin-top: 110px !important;
        }

        #MP_Batch .isc-popup-detail-form-s1 .modal-body {
            min-height: unset;
            max-height: unset;
        }
        #MP_Batch .modal-body {
            height: calc(100vh - 50px) !important;
        }
        .isc-popup-detail-form-s1 .modal-body {
            min-height: unset !important;
            max-height: 513px !important;
        }
        #MP_Email .modal-body {
            height: calc(100vh - 50px) !important;
        }
        .modal-content {
            height: unset;
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

        .placeholder {
            color: #000 !important;
        }

        .isc-h-53 {
            height: 53px !important;
        }

        .isc-groupby-container {
            padding: 10px;
            border: 1px solid #ecf0f1;
            width: 100%;
             margin: 5px;
             position: relative;
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
            font-size: 19px;
            color: #fff !important;
        }

        .pad-lft-min {
            padding-left: 13px !important;
        }
        .isc-view{
            margin-left:-19px;
        }
        .isc-mal-pay-icon{
             margin-left:20px;
        }
        label#invoicename {
    font-weight: bold !important;
    font-size: 15px !important;
    color: #fff;
}
    </style>
    <style>
        #product_sheet {
            width: 800px;
            background: white;
            float: left;
           display:none;
        }

            #product_sheet div {
                width: 50%;
                float: left;
                padding: 5%;
                box-sizing: border-box;
            }

        .red {
            background: red;
        }

        .handsome {
            height: 300px;
            background-image: url('data:image/jpeg;base64,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');
        }

        img {
            width: 100%;
            float: left
        }
        .modal .modal-header {
    background-color: #1589ee;
}
         .collapsed i.fa.fa-angle-right{
                transform: rotate(90deg);
        }
         .modal-dialog {
    width: 600px;
    margin: 0px auto;
    margin-right: 0;
}
        .smt-li-dataplan-inner-sub-title {
            font-weight: 600;
        }
        #mp_editrecurring .isc-popup-detail-form-s1 .modal-body {
    padding: 20px 0px !important;
}
         input[type=date]::-webkit-calendar-picker-indicator {  
  cursor: pointer !important;
}
         .modal-content {
    height: 100% !important;
}
td:last-child {
    text-align: center;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-38per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">Purchase Order</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>

            <div class="div-col-42per isc-set-fs-13">


                <div class="cell-right">
                    <div class="align-right mar-top-3 pad-rig-5 " style="margin-top: 6px;">

                        <a class="isc-theme-gray-btn filter-toggle-btn-cls mar-lft-10 " id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                        <%-- <a class="isc-theme-gray-btn groupby-toggle-btn-cls" id="groupby-toggle-btn" title="Filter"><i class="fa fa-sitemap"></i></a>--%>
                    </div>

                </div>
                  
               
                </div>
                

            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 174px;">

            <div class="screen-row">

                <div class="isc-app-screen-sec-container-s1 isc-invoiceList-Sec">

                    <div class="screen-row mar-top-10">
                        <div class="isc-filter-container isc-h-53" id="isc-filter-container" style="display: none;">

                            <div class="cell-left  ">
                                <select id="slt-Shipper" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option value="0">Choose Shipper</option>
                                </select>
                            </div>
                            <div class="cell-left  pad-lft-15">
                                <select id="slt-invoice" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option value="0">Choose Invoice #</option>


                                </select>
                            </div>
                            
                            <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="Btn_Search">
                                <a title="Search"><i class="fa fa-search"></i> Search</a>
                            </div>
                            <div class="isc-filter-search isc-reset" title="Reset" id="btn_reset">
                                <a><i class="fa fa-times"></i> Reset</a>
                            </div>
                            <div class="isc-filter-container-close" id="isc-filter-container-close">
                                <a><i class="fa fa-times"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="screen-row mar-top-10">
                        <div class="isc-groupby-container isc-h-53" id="isc-groupby-container" style="display: none;">
                            <div class="cell-left ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Customer</option>
                                    <option>Category</option>
                                    <%--<option>Status</option>--%>
                                    <option>Due Date</option>
                                </select>
                            </div>
                            <div class="isc-groupby-search isc-go  mar-lft-10" title="Search">
                                <a title="Search"><i class="fa fa-search"></i>Search</a>
                            </div>
                            <div class="isc-groupby-search isc-reset" title="Reset">
                                <a><i class="fa fa-times"></i>Reset</a>
                            </div>
                            <div class="isc-groupby-container-close" id="isc-groupby-container-close">
                                <a><i class="fa fa-times"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="screen-row">
                        <div id="exp-lst-view">
                            <div class="isc-screen-nav-container-s1">
                                <ul class="nav nav-tabs isc-tab-brd-cont" style="position: relative;">
                                    <li class="active"><a href="#Tab0" data-toggle="tab">All Invoices </a></li>
                                    
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="Tab0">
                                        <table class="isc-table-read-optimal isc-ddp-hdn-lst  mar-top-med" id="tbl-invoice">
                                            <thead>
                                                <tr>
                                                    <th style="width: 13%;" class="header">Shipper Name </th>
                                                    <th style="width: 13%;" class="header">Consignee Name </th>
                                                    <th style="width: 13%;" class="header">Invoice # </th>
                                                    <%--<th style="width: 18%;" class="header">Invoice Status                                    
                                                    </th>--%>
                                                     <th style="width: 18%;" class="header">Buyers Order No.                                   
                                                    </th>
                                                    <th style="width: 16%;" class="header">Invoice Date 
                                                    </th>
                                                    <th style="width: 13%;" class="header">Amount  
                                                    </th>
                                                    <th style="width: 8%; text-align: center;cursor:default;" class="">Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl-Bills-Bdy">
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
    

   
    <%--View Invoice model--%>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Batch" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
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
                    <div class="isc-style-1">
                        <div class="isc-100per isc-invoice-temp1">
                            <div class="isc-bor-lft-pos" style="border-left: unset;">
                                <div class="isc-temp-head-cont isc-bg-blue">
                                    <div class="screen-row">
                                        <div class="div-col-70per">
                                            <div class="isc-entity-header-actions">

                                                <h1 class="isc-tail-h1-p1 mar-top-30"><b>Invoice</b></h1>

                                            </div>
                                        </div>
                                        <div class="div-col-15per">
                                            <span class="isc-entity-sm-title"><b>Invoice #:</b></span>
                                            <span class="isc-entity-sm-title"><b>Invoice Date:</b></span>
                                            <span class="isc-entity-sm-title"><b>Container No.:</b></span>
                                            <span class="isc-entity-sm-title"><b>Seal No.:</b></span>
                                        </div>
                                        <div class="div-col-10per">
                                            <span class="isc-entity-sm-title" id="ibl_invoice"></span>
                                            <span class="isc-entity-sm-title" id="ibl_Indate" style="width: 145px"></span>
                                            <span class="isc-entity-sm-title" id="ibl_ContainerNO"></span>
                                             <span class="isc-entity-sm-title" id="ibl_SealNO"></span>

                                        </div>
                                    </div>

                                </div>
                                <div class="isc-temp-bdy-cont">
                                    <div class="screen-row">
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top">
                                                    <p class="isc-f-w-br"><b>Shipper :</b></p>
                                                    <div class=" isc-lft-hdr">
                                                        <span id="ibl_shiper"></span>


                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top ">
                                                    <p class="isc-f-w-br"><b>Consignee :</b></p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="spn_to"></span>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top">
                                                    <p class="isc-f-w-br"><b>P&P :</b></p>
                                                    <div class=" isc-lft-hdr">

                                                        <span id="spn_shipto"></span>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-25per isc-primary-title ">
                                            <div class="isc-screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top cell-right">
                                                    <p class="isc-f-w-br"><b>Invoice Total :</b></p>
                                                    <div class=" isc-lft-hdr">
                                                        <h2 class="isc-thm-hme-kpi-t2 isc-color-p1">$ <span id="ibl_total"></span></h2>

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
                                              
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-50">
                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                           <p class="isc-f-w-br"><b>Declaration :</b> </p>
                                            <div class=" isc-lft-hdr">
                                               <p>We declare that the invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
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
    <div id="product_sheet" style="background-color:#ffff">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody style="display: inline-block;">
                <tr style="width: 800px; display: flex; background-color: #1589ee; color: #fff; padding-left: 17px; font-family: Arial, Verdana, Helvetica, sans-serif; height: 100px;">
                    <td style="width: 365px;">
                        <h1 style="padding-top: 5px; font-weight: 500; font-size: 35px; padding-left: 10px;">INVOICE</h1>
                    </td>
                    <td style="width: 182.5px; padding-top: 13px;">
                        <p style="margin-bottom: -9px; margin-top: 7px; font-size: 12px;"><span id="spn_Phone"></span></p>
                        <p style="margin-bottom: -9px; margin-top: 7px; font-size: 12px;"><span id="spn_Mail"></span></p>
                       
                    </td>
                    <td style="width: 182.5px; padding-top: 13px;">
                        <p style="margin-bottom: -9px; font-size: 12px; margin-top: 7px;"><span id="spn_address"></span></p>
                        <p style="margin-bottom: -9px; margin-top: 7px; font-size: 12px;"><span id="spn_city"></span>, <span id="spn_state"></span>, <span id="spn_country"></span></p>
                        <p style="margin-bottom: -9px; font-size: 12px; margin-top: 7px;"><span id="spn_Zipcode"></span></p>
                    </td>
                </tr>

                <tr style="width: 800px; display: flex; padding: 30px;">
                    <td style="width: 182.5px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; color: #9e9e9e;">Billed To</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px;"><span id="spn_client"></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px;"><span id="spn_clientaddress"></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px;"><span id="cspn_city"></span>, <span id="cspn_state"></span>, <span id="cspn_country"></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px;"><span id="cspn_Zipcode"></span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td style="width: 182.5px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; color: #9e9e9e;">Invoice Number</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px;"><span id="spn_invoiceno"></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; color: #9e9e9e; padding-top: 25px;">Due Date </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px;"><span id="spn_date"></span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td style="width: 365px;" valign="top">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 300; font-size: 13px;" align="right">Invoice total</td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 500; color: #1589ee; font-size: 28px; padding-top: 12px;" align="right">$<span id="span_total"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">&nbsp;</td>
                </tr>
                <tr style="width: 800px; display: inline-block;">
                    <td style="width: 800px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr style="">
                                    <th style="font-family: Arial, Verdana, Helvetica, sans-serif; text-align: left; padding: 10px; color: #1589ee; font-size: 15px; padding-left: 5px; border-top: 2px solid #1589ee;">Description
                                    </th>
                                    <th style="font-family: Arial, Verdana, Helvetica, sans-serif; padding: 10px; color: #1589ee; font-size: 15px; border-top: 2px solid #1589ee;">Unit Cost
                                    </th>
                                    <th style="font-family: Arial, Verdana, Helvetica, sans-serif; padding: 10px; color: #1589ee; font-size: 15px; border-top: 2px solid #1589ee;">Qty/ Hr Rate
                                    </th>
                                    <th style="font-family: Arial, Verdana, Helvetica, sans-serif; padding: 10px; color: #1589ee; font-size: 15px; border-top: 2px solid #1589ee;">Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="tbl-body">
                             
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2">&nbsp;</td>
                </tr>

                <tr style="width: 800px; display: inline-block;">
                    <td style="width: 800px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px;" width="55%" height="32"></td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; color: #1589ee; text-align: right; padding-right: 25px;" width="30%">Subtotal</td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; text-align: right;" width="15%">$<spn id="spn_suptotal"></spn></td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px;" width="55%" height="32"></td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #1589ee; text-align: right; padding-right: 25px;" width="30%">Tax</td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; text-align: right;" width="15%">$<span id="spn_tax"></span></td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px;" width="55%" height="32"></td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #1589ee; text-align: right; padding-right: 25px;" width="30%">Total</td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; text-align: right; padding-top: 0px;" width="15%">$<span id="spn_intotal"></span></td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #9e9e9e;" width="55%" height="32">Invoice Terms<br>
                                        <span style="font-weight: 600; color: #000;">Ex. Please pay your invoice by ArcBill </span></td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #1589ee; text-align: right; padding-right: 25px;" width="30%">Amount Due(USD)</td>
                                    <td style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; text-align: right;" width="15%">$<span id="spn_dueamount"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>






                <tr>
                    <td colspan="2">&nbsp;</td>
                </tr>
            </tbody>
        </table>
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
        $(document).ready(function () {
            RegisterDatepicker();
            //$('#dapicker').datepicker();
        });

        var FilterStartDate = '01/01/2000';
        var FilterEndDate = '01/01/2025';
        var RegisterDatepicker = function () {
            FilterStartDate = '01/01/2000';
            FilterEndDate = '01/01/2025';
            $('#Daterangepicker').daterangepicker({
                startDate: moment(FilterStartDate),
                endDate: moment(FilterEndDate),
                ranges: {
                    'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                    'Today': [moment(), moment()],
                    'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],


                }
            }, SetSwapDateRange);
            SetSwapDateRange(moment(FilterStartDate), moment(FilterEndDate));
            $('#Daterangepicker').on('apply.daterangepicker', function (ev, picker) {
                FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
                FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
            });
        }
        function SetSwapDateRange(start, end) {
            if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
            ) {
                $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> Any Date');
            }
            else {
                $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
            }

        }
    </script>
    <script>
        var editor = new Jodit('#editor', {
            "uploader": {
                "insertImageAsBase64URI": true
            }
        });
    </script>
    <script>
        (function () {

            'use strict';

            // Helpers
            function $$(selectors, context) {
                return (typeof selectors === 'string') ? (context || document).querySelectorAll(selectors) : [selectors];
            }
            function $(selector, context) {
                return (typeof selector === 'string') ? (context || document).querySelector(selector) : selector;
            }
            function create(tag, attr) {
                var element = document.createElement(tag);
                if (attr) {
                    for (var name in attr) {
                        if (element[name] !== undefined) {
                            element[name] = attr[name];
                        }
                    }
                }
                return element;
            }
            function whichTransitionEnd() {
                var root = document.documentElement;
                var transitions = {
                    'transition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'mozTransitionEnd',
                    'OTransition': 'oTransitionEnd otransitionend'
                };

                for (var t in transitions) {
                    if (root.style[t] !== undefined) {
                        return transitions[t];
                    }
                }
                return false;
            }
            //function oneListener(el, type, fn, capture) {
            //    capture = capture || false;
            //    el.addEventListener(type, function handler(e) {
            //        fn.call(this, e);
            //        el.removeEventListener(e.type, handler, capture)
            //    }, capture);
            //}
            function hasClass(cls, el) {
                return new RegExp('(^|\\s+)' + cls + '(\\s+|$)').test(el.className);
            }
            function addClass(cls, el) {
                if (!hasClass(cls, el))
                    return el.className += (el.className === '') ? cls : ' ' + cls;
            }
            function removeClass(cls, el) {
                el.className = el.className.replace(new RegExp('(^|\\s+)' + cls + '(\\s+|$)'), '');
            }
            function toggleClass(cls, el) {
                (!hasClass(cls, el)) ? addClass(cls, el) : removeClass(cls, el);
            }

            function Tags(tag) {

                var el = $(tag);

                if (el.instance) return;
                el.instance = this;

                var type = el.type;
                var transitionEnd = whichTransitionEnd();

                var tagsArray = [];
                var KEYS = {
                    ENTER: 13,
                    COMMA: 188,
                    BACK: 8
                };
                var isPressed = false;

                var timer;
                var wrap;
                var field;

                function init() {

                    // create and add wrapper
                    wrap = create('div', {
                        'className': 'tags-container',
                    });
                    field = create('input', {
                        'type': 'text',
                        'className': 'tag-input',
                        'placeholder': el.placeholder || ''
                    });

                    wrap.appendChild(field);

                    if (el.value.trim() !== '') {
                        hasTags();
                    }

                    el.type = 'hidden';
                    el.parentNode.insertBefore(wrap, el.nextSibling);

                    wrap.addEventListener('click', btnRemove, false);
                    wrap.addEventListener('keydown', keyHandler, false);
                    wrap.addEventListener('keyup', backHandler, false);
                }

                function hasTags() {
                    var arr = el.value.trim().split(',');
                    arr.forEach(function (item) {
                        item = item.trim();
                        if (~tagsArray.indexOf(item)) {
                            return;
                        }
                        var tag = createTag(item);
                        tagsArray.push(item);
                        wrap.insertBefore(tag, field);
                    });
                }

                function createTag(name) {
                    var tag = create('div', {
                        'className': 'tag',
                        'innerHTML': '<span class="tag__name">' + name + '</span>' +
                            '<button class="tag__remove">&times;</button>'
                    });
                    // var tagName = create('span', {
                    // 'className': 'tag__name',
                    // 'textContent': name
                    // });
                    // var delBtn = create('button', {
                    // 'className': 'tag__remove',
                    // 'innerHTML': '&times;'
                    // });

                    // tag.appendChild(tagName);
                    // tag.appendChild(delBtn);
                    return tag;
                }

                function btnRemove(e) {
                    e.preventDefault();
                    if (e.target.className === 'tag__remove') {
                        var tag = e.target.parentNode;
                        var name = $('.tag__name', tag);
                        wrap.removeChild(tag);
                        tagsArray.splice(tagsArray.indexOf(name.textContent), 1);
                        el.value = tagsArray.join(',')
                    }
                    field.focus();
                }

                function keyHandler(e) {

                    if (e.target.tagName === 'INPUT' && e.target.className === 'tag-input') {

                        var target = e.target;
                        var code = e.which || e.keyCode;

                        if (field.previousSibling && code !== KEYS.BACK) {
                            removeClass('tag--marked', field.previousSibling);
                        }

                        var name = target.value.trim();

                        // if(code === KEYS.ENTER || code === KEYS.COMMA) {
                        if (code === KEYS.ENTER) {

                            target.blur();

                            addTag(name);

                            if (timer) clearTimeout(timer);
                            timer = setTimeout(function () { target.focus(); }, 10);
                        }
                        else if (code === KEYS.BACK) {
                            if (e.target.value === '' && !isPressed) {
                                isPressed = true;
                                removeTag();
                            }
                        }
                    }
                }
                function backHandler(e) {
                    isPressed = false;
                }

                function addTag(name) {

                    // delete comma if comma exists
                    name = name.toString().replace(/,/g, '').trim();

                    if (name === '') return field.value = '';

                    if (~tagsArray.indexOf(name)) {

                        var exist = $$('.tag', wrap);

                        Array.prototype.forEach.call(exist, function (tag) {
                            if (tag.firstChild.textContent === name) {

                                addClass('tag--exists', tag);

                                if (transitionEnd) {
                                    oneListener(tag, transitionEnd, function () {
                                        removeClass('tag--exists', tag);
                                    });
                                } else {
                                    removeClass('tag--exists', tag);
                                }


                            }

                        });

                        return field.value = '';
                    }

                    var tag = createTag(name);
                    wrap.insertBefore(tag, field);
                    tagsArray.push(name);
                    field.value = '';
                    el.value += (el.value === '') ? name : ',' + name;
                }

                function removeTag() {
                    if (tagsArray.length === 0) return;

                    var tags = $$('.tag', wrap);
                    var tag = tags[tags.length - 1];

                    if (!hasClass('tag--marked', tag)) {
                        addClass('tag--marked', tag);
                        return;
                    }

                    tagsArray.pop();

                    wrap.removeChild(tag);

                    el.value = tagsArray.join(',');
                }

                init();

                / Public API /

                this.getTags = function () {
                    return tagsArray;
                }

                //this.clearTags = function () {
                //    if (!el.instance) return;
                //    tagsArray.length = 0;
                //    el.value = '';
                //    wrap.innerHTML = '';
                //    wrap.appendChild(field);
                //}

                this.addTags = function (name) {
                    if (!el.instance) return;
                    if (Array.isArray(name)) {
                        for (var i = 0, len = name.length; i < len; i++) {
                            addTag(name[i])
                        }
                    } else {
                        addTag(name);
                    }
                    return tagsArray;
                }

                this.destroy = function () {
                    if (!el.instance) return;

                    wrap.removeEventListener('click', btnRemove, false);
                    wrap.removeEventListener('keydown', keyHandler, false);
                    wrap.removeEventListener('keyup', keyHandler, false);

                    wrap.parentNode.removeChild(wrap);

                    tagsArray = null;
                    timer = null;
                    wrap = null;
                    field = null;
                    transitionEnd = null;

                    delete el.instance;
                    el.type = type;
                }
            }

            window.Tags = Tags;

        })();

        // Use
        var tags = new Tags('.tagged');
        var tags = new Tags('.tagged1');

        document.getElementById('get').addEventListener('click', function (e) {
            e.preventDefault();
            alert(tags.getTags());
        });
        document.getElementById('clear').addEventListener('click', function (e) {
            e.preventDefault();
            tags.clearTags();
        });
        document.getElementById('add').addEventListener('click', function (e) {
            e.preventDefault();
            tags.addTags('New');
        });
        document.getElementById('addArr').addEventListener('click', function (e) {
            e.preventDefault();
            tags.addTags(['Steam Machines', 'Nintendo Wii U', 'Shield Portable']);
        });
        document.getElementById('destroy').addEventListener('click', function (e) {
            e.preventDefault();
            if (this.textContent === 'destroy') {
                tags.destroy();
                this.textContent = 'reinit';
            } else {
                this.textContent = 'destroy';
                tags = new Tags('.tagged');
            }

        });


        $(document).ready(function () {
            $(function () {
                $(".fold-table tr.view").on("click", function () {
                    if ($(this).hasClass("open")) {
                        $(this).removeClass("open").next(".fold").removeClass("open");
                    } else {
                        $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
                        $(this).addClass("open").next(".fold").addClass("open");
                    }
                });
            });
        });


    </script>
    <script src="iscjsengine/PageScript/History.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.debug.js"></script>

   <%-- <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://js.stripe.com/v3/"></script>--%>
  
</asp:Content>



