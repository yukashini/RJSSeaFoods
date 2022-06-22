<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Bill_PaymentSummary.aspx.cs" Inherits="BillManagement.Bill_PaymentSummary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        @media only screen and (max-width: 767px) {
            .modal-body .div-col-35per {
                width: 36% !important;
               
            }
            .modal-body .div-col-65per
            {
                width: 64% !important;
            }
        }

        html {
            overflow: hidden;
        }

        .jqstooltip {
            position: absolute;
            left: 0px;
            top: 0px;
            visibility: hidden;
            background: rgb(0, 0, 0) transparent;
            background-color: rgba(0,0,0,0.6);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";
            color: white;
            font: 10px arial, san serif;
            text-align: left;
            white-space: nowrap;
            padding: 5px;
            border: 1px solid white;
            z-index: 10000;
        }

        .jqsfield {
            color: white;
            font: 10px arial, san serif;
            text-align: left;
        }
    </style>
    <style>
      
        .isc-set-clr-black {
            color: #000 !important;
        }

        .modal .div-col-40per {
            width: 40%;
        }

        .modal .div-col-60per {
            width: 60%;
        }

        .mar-btm-10 {
            margin-bottom: 10px;
        }

        .isc-time-line-tble-s1 {
            width: 100%;
        }

            .isc-time-line-tble-s1 td {
                border-left: 2px dotted #ddd !important;
                letter-spacing: 0.2px;
                padding: 0px 0px 15px 30px;
            }

                .isc-time-line-tble-s1 td:before {
                    content: "";
                    position: absolute;
                    left: -10px;
                    top: 0px;
                    background-color: #fff;
                    height: 22px;
                    width: 22px;
                    border: 1px solid #cdcdcd;
                    border-radius: 50px !important;
                }

        .isc-time-line-cir-bud-txt-s1 {
            top: 2px;
            width: 18px;
            line-height: 19px;
            height: 18px;
        }

        .isc-h-53 {
            height: 53px;
        }

        .fa-remove::before, .fa-close::before, .fa-times::before {
            content: "";
        }

        .isc-tbl-icon-img {
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
            /* margin: 5px; */
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
            background-color: #1589ee;
            width: 100% !important;
            text-align: right;
            /*background-image: linear-gradient(to right, #2e85bb 10%, #00a1b7) !important;*/
        }

            .cls h3 {
                margin: 0;
                padding: 0;
                text-align: left;
                position: absolute;
                font-size: 19px;
                color: #fff;
                margin-top: 12px;
                margin-left: 10px;
                font-weight: 400;
            }

        .auto-height {
            height: calc(100vh - 55px);
        }

        .isc-new-pop-up .modal-body {
            height: calc(100vh - 110px);
            overflow-y: scroll;
        }
    </style>
    <style>
        .isc-tbl-icon-img {
            width: 15px;
            margin-top: -2px;
        }

        .isc-td-inline-status-ch-s1 a:hover, a:focus {
            color: #8A8A8A;
        }
        /*.isc-theme-blue-btn {
background-color: #2e85bb !important;
color: #ffffff !important;
border-radius: 4px !important;
}*/
        /*.isc-set-fs-13 .isc-sec-lvl-cust-dd-s1 li a {

font-size: 13px !important;
margin-top:3px !important;
padding:0px 5px !important;
line-height: 22px !important;

}
.isc-set-fs-13 .isc-sec-lvl-cust-dd-s1 li a i{
color:#fff !important;
}*/

        .isc-h-53 {
            height: 53px;
        }

        .fa-remove::before, .fa-close::before, .fa-times::before {
            content: "";
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
        /*.cls{
background-color: aqua !IMPORTANT;
width: 100% !important;
text-align: right;
background-image: linear-gradient(to right, #2e85bb 10%, #00a1b7) !important;
}*/
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

        .div-select .select2-container {
            width: 100% !important;
        }

        .form-control {
            width: 200px;
        }
        .isc-new-pop-up .modal-body {
    height: calc(100vh - 130px);
   }
        #mp_paid  .modal-body {
    height: calc(100vh - 110px);
}
        #mp_paid  .select2-container {
     width: 200px !important;
}
        .isc-table-read-optimal th:last-child{
            cursor:context-menu!important;
        }
        #Commands_body{
             padding:10px 10px !important;
         }
       #mp_comts .modal-body {
            height: calc(100vh - 125px);
        }
       .isc-set-bgclr {
            width: 482px;
            border-radius: 8px !important;
            background-color: #F7F7F7;
        }
       @media only screen and (max-width: 767px)
       {
.isc-btn-pop-action-s1 {
    width: 115px !important;
    }
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="screen-row">
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
                        <div class="align-right mar-top-3 pad-rig-5 mar-top-6 isc-mb-mar-unset" >

                            <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <div class="isc-app-screen-body-container" style="height: auto;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">

                        <div class="isc-filter-container mar-top-10" id="isc-filter-container" >

                            <div class="screen-row">
                                <div class="div-col-80per">
                                    <div class="screen-row">
                                        <div class="cell-left  ">
                                            <select class="form-control select2 select2-hidden-accessible" id="slt-Vendor" tabindex="-1" aria-hidden="true">
                                                <option value="0">Choose Vendor</option>


                                            </select>
                                        </div>
                                        <div class="cell-left pad-lft-15 ">
                                            <select class="form-control select2 select2-hidden-accessible" id="slt-Invoice" tabindex="-1" aria-hidden="true">
                                                <option value="0">Choose Bill/Invoice #</option>

                                            </select>
                                        </div>
                                        <div class="cell-left pad-lft-15 ">
                                            <input type="text" class="form-control iscdatpkrwdt isc-frm-cont-mb-res isc-mb-date-range" id="txt-DueRange" placeholder="Choose Due Date Range" />

                                        </div>

                                        <div class="cell-left pad-lft-15 ">
                                            <select class="form-control select2 select2-hidden-accessible" id="slt-Status" tabindex="-1" aria-hidden="true">
                                                <option value="0">Choose Payment Status</option>


                                            </select>

                                        </div>

                                        <div class="cell-left pad-lft-15 " style="display:none">
                                           <%-- <input type="text" class="form-control iscdatepicker input-mini isc-frm-cont-mb-res" id="txt-PaidDate" placeholder="Choose Paid Date" style="width: 200px !important" />--%>
                                            <input type="date" class="form-control" id="txt-PaidDate"  style="width: 200px !important" />

                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10 isc-mb-mar-unset" style="display:none">
                                        <div class="cell-left  ">
                                            <%--<input  type="text" class="form-control iscdatepicker input-mini isc-frm-cont-mb-res isc-mrg-txt" id="txt-CreatedDate" placeholder="Choose Created Date" style="width: 200px !important" />--%>
                                            <input  type="date" class="form-control" id="txt-CreatedDate"  style="width: 200px !important" />

                                        </div>
                                    </div>
                                </div>
                                <div class="div-col-20per">
                                    <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                                        <a id="Btn_serch" title="Search"><i class="fa fa-search" ></i> Search</a>
                                    </div>
                                    <div class="isc-filter-search isc-reset" title="Reset" id="btn_Reset">
                                        <a><i class="fa fa-times" ></i> Reset</a>
                                    </div>

                                    <div class="isc-filter-container-close" id="isc-filter-container-close" title="Close">
                                        <a><i class="fa fa-times"></i></a>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="screen-row">

                        <div class="div-col-25per " style="cursor: pointer" data-kpi="50023">
                            <div class="isc-scr-sec-grp-container-s1 <%--kpi-active--%>">
                                <div class="isc-scr-sec-grp-hdr-container-s1">
                                    <div class="cell-left">
                                        <h2 class="isc-scr-sec-hdr-s1">Outstanding Payments </h2>
                                    </div>
                                    <div class="cell-right">
                                        <a class="isc-apr-hm-kpi-btn" id="out-Standing-Count">0</a>
                                    </div>
                                </div>
                                <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                    <div class="screen-row">
                                        <div class="isc-grp-sec-ent-cell-s1">

                                            <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                <h5 id="out-Standing-Amount" class="isc-kpi-clr1">$0 </h5>
                                                <div class="screen-row mar-top-10">
                                                    <div class="cell-left">
                                                        <h4>Due this week</h4>
                                                    </div>
                                                    <div class="cell-right">
                                                        <span class="isc-grp-sec-ent-spn" id="outStanding-This-Week">8<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor: pointer" data-kpi="0">
                            <div class="isc-scr-sec-grp-container-s1">
                                <div class="isc-scr-sec-grp-hdr-container-s1">
                                    <div class="cell-left">
                                        <h2 class="isc-scr-sec-hdr-s1">Overdue Payments</h2>
                                    </div>
                                    <div class="cell-right">
                                        <a class="isc-apr-hm-kpi-btn" style="background-color: #ED5263;" id="overDue-Count">0</a>
                                    </div>
                                </div>
                                <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                    <div class="screen-row">
                                        <div class="isc-grp-sec-ent-cell-s1">

                                            <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                <h5 id="overDue-Amount" class="isc-kpi-clr2">$0</h5>
                                                <div class="screen-row mar-top-10">
                                                    <div class="cell-left">
                                                        <h4>New Bills</h4>
                                                    </div>
                                                    <div class="cell-right">
                                                        <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3" id="overDue-This-week">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor: pointer" data-kpi="50025">
                            <div class="isc-scr-sec-grp-container-s1">
                                <div class="isc-scr-sec-grp-hdr-container-s1">
                                    <div class="cell-left">
                                        <h2 class="isc-scr-sec-hdr-s1">Flagged Payments </h2>
                                    </div>
                                    <div class="cell-right">
                                        <a class="isc-apr-hm-kpi-btn" style="background-color: #F8AA56;" id="flaged-Count">0</a>
                                    </div>
                                </div>
                                <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                    <div class="screen-row">
                                        <div class="isc-grp-sec-ent-cell-s1">

                                            <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                <h5 id="flagged-Amount" class="isc-kpi-clr4">$0 </h5>
                                                <div class="screen-row mar-top-10">
                                                    <div class="cell-left">
                                                        <h4>Due this week</h4>
                                                    </div>
                                                    <div class="cell-right">
                                                        <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4" id="flagged-This-Week" style="color:#ffa220 !important;">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor: pointer" data-kpi="1">
                            <div class="isc-scr-sec-grp-container-s1">
                                <div class="isc-scr-sec-grp-hdr-container-s1">
                                    <div class="cell-left">
                                        <h2 class="isc-scr-sec-hdr-s1">Due This week </h2>
                                    </div>
                                    <div class="cell-right">
                                        <a class="isc-apr-hm-kpi-btn" style="background-color: #13a840 !important;" id="due-Thisweek-Count">0
                                        </a>
                                    </div>
                                </div>
                                <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                    <div class="screen-row">
                                        <div class="isc-grp-sec-ent-cell-s1">

                                            <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                <h5 id="due-This-Week-Amount" class="isc-kpi-clr5">$0 </h5>
                                                <div class="screen-row mar-top-10">
                                                    <div class="cell-left">
                                                        <h4>New Bills</h4>
                                                    </div>
                                                    <div class="cell-right">
                                                        <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1" id="new-Due-This-Week" style="color:#13a840 !important;">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="isc-screen-nav-container-s1 mar-top-med">
                        <ul class="nav nav-tabs isc-tab-brd-cont" style="position: relative;" id="ul-Tab">

                            <li class="active" style="cursor: pointer" id="unPaid-Tab"><a href="#Tab1" data-toggle="tab">Unpaid Bills <span id="unpaid-Bills">(0)</span></a> </li>
                            <li class="" style="cursor: pointer" id="Paidbill-Tab"><a data-toggle="tab">Paid Bills <span id="paid-Bills">(0)</span></a> </li>
                            <li class="" style="cursor: pointer" id="disputed-Tab"><a data-toggle="tab">Disputed Bills <span id="disputed-Bills">(0)</span></a> </li>
                            <li class="" style="cursor: pointer" id="recurring-Tab"><a data-toggle="tab">Recurring Bills <span id="recurring-Bills">(0)</span></a> </li>
                            <li class="" style="cursor: pointer" id="all-Tab"><a data-toggle="tab">All Bills <span id="all-Bills">(0)</span></a> </li>
                        </ul>
                        <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                        <div class="tab-content">
                            <div class="tab-pane active" id="Tab1">
                                <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst" id="tbl-Bills">
                                    <thead>
                                        <tr>

                                            <%--                                                        <th style="width: 15%;" class="header">Vendor
                                                        </th>
                                                       <th style="width: 13%;" class="header">Bill #
                                                        </th>
                                                     
                                                        <th style="width: 23%;" class="header">
                                                            Bill Description
                                                        
                                                        </th>
                                                         
                                                        <th style="width: 16%;" class="header"> Bill Status
                                                        </th>
                                                       
                                                        <th style="width: 10%;" class="header">Stage
                                                        </th>
                                                          <th style="width: 6%;" class="header">Due Date
                                                        </th>
                                                         <th style="width: 7%;" class="header">Amount Due
                                                        </th>
                                                        <th style="width: 10%;text-align:center;" class="header">Action
                                                        </th>--%>

                                            <th style="width: 15%;" class="" sort-column-type="text" column-name="VendorName" data-sort="VendorName" title="Vendor">Vendor
                                            </th>
                                            <th style="width: 13%;" class="" sort-column-type="text" column-name="InvoiceNumber" data-sort="InvoiceNumber" title="Bill#">Bill#
                                            </th>

                                            <th style="width: 18%;" class="" sort-column-type="text" column-name="Description" data-sort="Description" title="Bill Description">Bill Description
                                                        
                                            </th>

                                            <th style="width: 13%;" class="" sort-column-type="text" column-name="PaymentStatusName" data-sort="PaymentStatusName" title="Payment Status">Payment Status
                                            </th>

                                            <%--<th style="width: 7%;" title="Stage">Stage
                                                        </th>--%>
                                            <th style="width: 7%;" class="" sort-column-type="date" column-name="DueOn" data-sort="DueOn" title="Due Date">Due Date
                                            </th>
                                            <th style="width: 7%;" class="" sort-column-type="date" column-name="DueOn" data-sort="DueOn" title="Paid On">Paid On
                                            </th>

                                            <th style="width: 7%;" class="" sort-column-type="date" column-name="DueOn" data-sort="DueOn" title="Payment Mode">Payment Mode
                                            </th>

                                            <th style="width: 10%;" class="" sort-column-type="number" column-name="ApprovedAmount" data-sort="ApprovedAmount" title="Amount Due">Amount Due
                                            </th>

                                            <th style="width: 10%; text-align: center; display:none;" class=""  title="Action">Action
                                            </th>

                                            <th style="width: 10%; text-align: center;cursor:context-menu!important;" title="Action" class="">Action
                                                    </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbl-Bills-Bdy">
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane " id="Tab2">
                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                    <thead>
                                        <tr>

                                            <th style="width: 15%;" class="header">Vendor
                                            </th>
                                            <th style="width: 13%;" class="header">Bill#
                                            </th>

                                            <th style="width: 23%;" class="header">Bill Description
                                                        
                                            </th>

                                            <th style="width: 16%;" class="header">Bill Status
                                            </th>

                                            <th style="width: 10%;" class="header">Stage
                                            </th>
                                            <th style="width: 6%;" class="header">Due Date
                                            </th>
                                            <th style="width: 7%;" class="header">Amount Due
                                            </th>
                                            <th style="width: 10%; text-align: center;cursor:context-menu!important;" class="header">Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>


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
                                                    <a class="isc-lbl-act-read-list-s1 isc-pay-pnd" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Pending</a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5 style="color: red !important;">9/3/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>


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
                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/11/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td>
                                                <h5>Baker Sanders Inc.</h5>
                                            </td>
                                            <td>
                                                <h5>1500097</h5>
                                            </td>
                                            <td>
                                                <h5>Invoice for the purchase of PO799</h5>
                                            </td>
                                            <td>
                                                <div class="isc-td-inline-status-ch-s1">
                                                    <a class="isc-lbl-act-read-list-s1" style="color: red;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Failed</a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/13/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>

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
                                                    <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Dispute</a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/18/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>

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
                                                    <a class="isc-lbl-act-read-list-s1 isc-flg-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Flagged</a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/21/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane " id="Tab3">
                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                    <thead>
                                        <tr>

                                            <th style="width: 15%;" class="header">Vendor
                                            </th>
                                            <th style="width: 13%;" class="header">Bill#
                                            </th>

                                            <th style="width: 23%;" class="header">Bill Description
                                                        
                                            </th>

                                            <th style="width: 16%;" class="header">Bill Status
                                            </th>

                                            <th style="width: 10%;" class="header">Stage
                                            </th>
                                            <th style="width: 6%;" class="header">Due Date
                                            </th>
                                            <th style="width: 7%;" class="header">Amount Due
                                            </th>
                                            <th style="width: 10%; text-align: center;cursor:context-menu!important;" class="header">Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>


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
                                                    <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Dispute </a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5 style="color: red !important;">9/3/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>


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
                                                    <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Dispute </a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/11/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>


                                            <td>
                                                <h5>Baker Sanders Inc.</h5>
                                            </td>
                                            <td>
                                                <h5>1500097</h5>
                                            </td>
                                            <td>
                                                <h5>Invoice for the purchase of PO799</h5>
                                            </td>
                                            <td>
                                                <div class="isc-td-inline-status-ch-s1">
                                                    <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Dispute </a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/13/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>


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
                                                    <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Dispute </a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/18/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                            </td>

                                        </tr>
                                        <tr>


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
                                                    <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Dispute </a>

                                                </div>
                                            </td>
                                            <td>
                                                <h5>Approvals</h5>
                                            </td>
                                            <td>
                                                <h5>9/21/2020</h5>
                                            </td>


                                            <td>

                                                <h5 style="text-align: right;">$750</h5>
                                            </td>
                                            <td style="text-align: center;">

                                                <a href="#" data-toggle="modal">
                                                    <img src="images/paynow.png" class="isc-pay-now" title="Pay Now"></a>


                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_flag" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Flag</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color: #8A8A8A;" hide-pop-up="true" title="Cancel" flag-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  flag-cancel="true" aria-hidden="true">
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
                                        <h4>Are you sure want to flag the bill?</h4>

                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-flag-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" flag-cancel="true" id="close-flag-pop">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="Mp_Comments" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Comments</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color: #8A8A8A; cursor: pointer;" title="Close" id="close-Comment" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body" id="div-BillComments">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4 class="modal-title">Edward Abbey <span style="color: red">(Disputed)</span></h4>
                                        <p class="isc-bill-conf-del mar-top-10">Because if the payer click the settle up and record cash payment, it is being considered as the person(being paid who has already settled up from his end once he receive the amount) lent some amount to the person who has to pay due to dual settle up</p>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4 class="modal-title">Hal Abelson <span style="color: green">(Approved)</span></h4>
                                        <p class="isc-bill-conf-del mar-top-10">Because if the payer click the settle up and record cash payment, it is being considered as the person(being paid who has already settled up from his end once he receive the amount) lent some amount to the person who has to pay due to dual settle up</p>

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
    <div class="slider">

        <div class="split-amount">
            <div class="isc-sld-wid split-width">

                <div class="close-slider">
                    <div class="cls">
                        <h3>Split Amount</h3>
                        <i class="fa fa-close close-amount" title="Close"></i>
                    </div>
                </div>

                <div class="auto-height">
                    <div class="isc-bill-trk-lst-cont  isc-cus-var isc-lst-scrl-cont ">

                        <div class="screen-row  collapse in" id="coll_132" style="height: auto;">



                            <div class="screen-row ">
                                <table id="tbl-Split-list" class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                    <thead>
                                        <tr>

                                            <th style="width: 30%; background-color: #e1e2e3;" class="">Account
                                            </th>
                                            <th style="width: 30%; background-color: #e1e2e3;" class="">Description
                                            </th>
                                            <th style="width: 20%; background-color: #e1e2e3;" class="">
                                                <center>Amount</center>
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="settings">
            <div style="width: 522px;">

                <div class="close-slider">
                    <div class="cls">
                        <h3>Settings </h3>
                        <i class="fa fa-close close-settings"></i>
                    </div>
                </div>

                <div class="isc-cus-var1" style="padding-left: 10px; padding-right: 10px;">
                    <div class="auto-height">
                        <div class="isc-bill-trk-lst-cont   isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_21" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_21" style="height: auto;">
                                <label>
                                    <div class="checker"><span>
                                        <input type="checkbox"></span></div>
                                    Auto Approval</label>
                                <div class="screen-row mar-top-10">
                                    <div class="screen-row">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Approver Name : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>Choose Approver Name</option>
                                                    <option>Frank Abagnale </option>
                                                    <option>Edward Abbey </option>
                                                    <option>Reuben Abel </option>
                                                    <option>Hal Abelson</option>
                                                </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 1px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-labelledby="select2-4gj1-container"><span class="select2-selection__rendered" id="select2-4gj1-container" title="Choose Approver Name">Choose Approver Name</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span><span class="select2 select2-container select2-container--default select2-hidden-accessible" dir="ltr" style="width: 1px;" tabindex="-1" aria-hidden="true"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-labelledby="select2-g9il-container"><span class="select2-selection__rendered" id="select2-g9il-container" title="Choose Approver Name">Choose Approver Name</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 1px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-h38c-container"><span class="select2-selection__rendered" id="select2-h38c-container"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                            </div>
                                        </div>
                                        <div class="div-col-15per">
                                            <i class="fa fa-plus isc-crt-bill-add"></i>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_22" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Make Recurring    </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_22" style="height: auto;">
                                <div class="screen-row mar-top-10">

                                    <div class="screen-row">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Start Date : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <input type="text" placeholder="Enter Date" class="form-control isc-exp-mang-txt-bx1 datepicker">
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Frequency : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>Weekly</option>
                                                    <option>Monthly</option>
                                                    <option>Quarterly</option>
                                                    <option>Halfearly</option>
                                                    <option>Annual</option>
                                                </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 1px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-labelledby="select2-p1db-container"><span class="select2-selection__rendered" id="select2-p1db-container" title="Weekly">Weekly</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span><span class="select2 select2-container select2-container--default select2-hidden-accessible" dir="ltr" style="width: 1px;" tabindex="-1" aria-hidden="true"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-labelledby="select2-mwao-container"><span class="select2-selection__rendered" id="select2-mwao-container" title="Weekly">Weekly</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 1px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-b3rs-container"><span class="select2-selection__rendered" id="select2-b3rs-container"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Ends On : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_23" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Send Reminders    </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_23" style="height: auto;">
                                <div class="screen-row mar-top-10">

                                    <div class="screen-row">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Remind : </label>
                                        </div>
                                        <div class="div-col-8per pad-lft-2-per">
                                            <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker">
                                        </div>
                                        <div class="div-col-14per pad-lft-4-per">
                                            <label class="mar-top-5">day(s)  </label>
                                        </div>
                                        <div class="div-col-20per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-wdth ">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>Before</option>
                                                    <option>After</option>
                                                </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 1px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-labelledby="select2-apll-container"><span class="select2-selection__rendered" id="select2-apll-container" title="Before">Before</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span><span class="select2 select2-container select2-container--default select2-hidden-accessible" dir="ltr" style="width: 1px;" tabindex="-1" aria-hidden="true"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-labelledby="select2-wr2v-container"><span class="select2-selection__rendered" id="select2-wr2v-container" title="Before">Before</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 1px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-fny7-container"><span class="select2-selection__rendered" id="select2-fny7-container"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                            </div>
                                        </div>
                                        <div class="div-col-23per pad-lft-4-per">
                                            <label class="mar-top-5">Due Date </label>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Email : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                <select class="isc-select-dropdown slt-Tags " multiple="multiple" tabindex="-1" aria-hidden="true" id="">
                                                </select>
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_24" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_24" style="height: auto;">
                                <div class="screen-row">
                                    <div class="screen-row ">
                                        <span class="isc-btn-inp-typ-file-s1 cell-right">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                        </span>


                                    </div>
                                </div>
                                <div class="screen-row mar-top-10">

                                    <table class="isc-table-read-optimal isc-table-sorter-s1">
                                        <thead>
                                            <tr>
                                                <th style="width: 80%;" class="header">File Name</th>

                                                <th style="width: 20%;" class="header text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>
                                                    <h5 title="Uploaded On: 02/04/2020 04.33 PM Uploaded By:Ravi Shanker ">
                                                        <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">

                                                        <span>Details1.pdf</span>
                                                    </h5>
                                                </td>

                                                <td>
                                                    <div class="screen-row isc-inline-pop-action-s1">
                                                        <a class="isc-action-badge-td-s1" href="#" title="View"><i class="fa fa-eye"></i></a>
                                                        <a class="isc-action-badge-td-s1" title="Delete"><i class="fa fa-trash-o"></i></a>

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td>
                                                    <h5 title="Uploaded On: 02/04/2020 04.33 PM Uploaded By:Ravi Shanker ">
                                                        <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">
                                                        <span>Details2.pdf</span>
                                                    </h5>
                                                </td>

                                                <td>
                                                    <div class="screen-row isc-inline-pop-action-s1">
                                                        <a class="isc-action-badge-td-s1" href="#" title="View"><i class="fa fa-eye"></i></a>
                                                        <a class="isc-action-badge-td-s1" title="Delete"><i class="fa fa-trash-o"></i></a>

                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_25" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_25" style="height: auto;">
                                <div class="cell-right pad-rig-5 " style="margin-bottom: 6px;">

                                    <a class="isc-theme-blue-btn" href="#">Save</a>
                                </div>
                                <div class="screen-row mar-top-15">

                                    <textarea class="form-control" placeholder="Enter Notes" rows="3"></textarea>
                                </div>
                                <div class="screen-row">
                                    <div class="isc-crt-bill-not-cont">
                                        <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i>Payment to be done based on payment terms..<span class="isc-crt-bill-ownr" style="color: green !important;"> Frank Abagnale ,</span><span class="isc-crt-bill-ownr">Sun Feb 28 ,4.54 am</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!----Slider----->
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese isc-new-pop-up" id="mp_paid" data-backdrop="static">
        <div class="modal-dialog" style="width: 850px;">
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
                    <div class="screen-row">
                        <div class="div-col-50per">
                            <div class="screen-row">
                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Vendor </label>
                                    </div>
                                </div>
                                <div class="div-col-65per">
                                    <label id="lbl-Vendor">-</label>

                                </div>
                            </div>
                            <div class="screen-row mar-top-15">
                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Due Date </label>
                                    </div>
                                </div>
                                <div class="div-col-65per">
                                    <label id="lbl-Due">-</label>
                                </div>
                            </div>

                            <div class="screen-row mar-top-15">

                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Payment Method <span style="color: red; font-size: 14px;">*</span> </label>
                                    </div>
                                </div>
                                <div class="div-col-65per div-select">
                                    <select class="form-control select2" tabindex="-1" id="slt-PaymentMode" aria-hidden="true">
                                        <option value="0">Select Payment Method</option>



                                    </select>
                                    <%-- <input type="text" placeholder="Enter Payment Mode" id="txt-PaymentMode" data-textbox="PaymentMode" maxlength="64" class="form-control"/>--%>
                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="PaymentMode">Payment Mode contains invalid characters. Allowable characters are A-Z, a-z, </span>
                                </div>


                            </div>
                            <div class="screen-row mar-top-15">

                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Ref Number <span style="color: red; font-size: 14px;"></span></label>
                                    </div>
                                </div>

                                <div class="div-col-65per">
                                    <input type="text" placeholder="Enter Reference Number" maxlength="64" id="txt-Ref" class="form-control">
                                </div>
                            </div>
                            <div class="screen-row mar-top-15">

                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Amount Due <span style="color: red; font-size: 14px;">*</span></label>
                                    </div>
                                </div>

                                <div class="div-col-65per">
                                    <input type="text" placeholder="Enter Amount Due" data-type="currency" maxlength="64" id="txt-DueAmnt" class="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="div-col-50per">
                            <div class="screen-row isc-mb-dots">
                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Bill# </label>
                                    </div>
                                </div>
                                <div class="div-col-65per">
                                    <label id="lbl-Invoice-Number">-</label>

                                </div>
                            </div>
                            <div class="screen-row mar-top-15">
                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="">Payable Amount :</label>
                                    </div>
                                </div>
                                <div class="div-col-65per">
                                    <label id="lbl-Amount">-</label>
                                </div>
                            </div>

                            <div class="screen-row mar-top-15">

                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Paid On <span style="color: red; font-size: 14px;">*</span> </label>
                                    </div>
                                </div>
                                <div class="div-col-65per">
                                    <%--<input type="text" placeholder="Enter Paid On" id="txt-PaidOn" class="form-control">--%>
                                    <input type="date" placeholder="Enter Paid On" id="txt-PaidOn" class="form-control">
                                </div>


                            </div>
                            <div class="screen-row mar-top-15">

                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Amount Paid <span style="color: red; font-size: 14px;">*</span>  </label>
                                    </div>
                                </div>

                                <div class="div-col-65per">
                                    <input type="text" placeholder="Enter Amount Paid" data-type="currency" maxlength="64" id="txt-PaidAmnt" class="form-control">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="screen-row">
                        <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b mar-top-15">Attachments</h5>
                        <div class="div-col-50per">
                        <div class="screen-row mar-top-15">

                                <div class="div-col-35per">
                                    <div class="isc-pay-lbl-txt">
                                        <label class="mar-top-5">Attachments <span style="color: red; font-size: 14px;"></span></label>
                                    </div>
                                </div>

                                <div class="div-col-50per isc-mb-wdt-80">
                                    <div class="">

                                        <input type="file" style="width: 200px; cursor: pointer;" id="browse-Documents" />

                                    </div>
                                </div>
                                <div class="div-col-5per isc-mb-wdt-20">
                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" id="add-Documents"><i class="fa fa-plus"></i></a>
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
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-cancel-pay="true" style="background-color: #fff !important; border: 1px solid #efefef; color: #000 !important;">
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
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false" style="display:;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Comments</h4>
                        </div>
                        <div class="cell-right">
                            <a  class="fa fa-times-circle" data-dismiss="modal" style="cursor: pointer" aria-hidden="true" title="Close">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">
                    <div class="screen-row" style="margin:10px;">
                          <div class="cell-left div-col-75per isc-mb-wdt-60">
                        <textarea class="form-control isc-set-bgclr"  placeholder="Write a comment" id="txt-Command"></textarea>
                    </div>
                    <div class="cell-right pad-lft-max div-col-25per isc-mb-wdt-40">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1 mar-top-10" id="btn-Send" title="Send" style="cursor: pointer">
                                Send</button>
                        </div>
                    </div>
                    </div>
                    <div class="modal-body" id="Commands_body">
                    </div>

                </div>

                
            </div>
        </div>

    </div>
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
        $(".close-amount").click(function () {
            $(".split-amount").removeClass("split-amount-show");

        });
        $(".close-settings").click(function () {
            $(".settings").removeClass("settings-show");
        });
    </script>
    <script src="iscjsengine/PageScript/Bill_PaymentSummary.js"></script>
</asp:Content>
