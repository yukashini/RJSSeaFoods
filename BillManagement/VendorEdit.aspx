<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="VendorEdit.aspx.cs" Inherits="BillManagement.VendorEdit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <style type="text/css">
         @media only screen and (max-width: 767px) {
            .isc-vnd-edit-foot-cont .div-col-95per {
                 width:75%;
             }

         }
         
       
        /*.isc-filter-container
        {
           border:unset !important;
        }*/
        /*.isc-filter-container{
           height:65px;
        }*/
        html{
            overflow:hidden;
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
        /*     .isc-discussion-text {
    width: 100%;
    border: 1px solid #ddd ;
    border-radius: 16px !important;
    padding:5px 10px !important;
    box-sizing: border-box;
   
    height:60px;
    
}*/
        /*.isc-single-discussion-content span {
            float: right;
        }*/

        .div-col-48per {
            width: 48%;
            float: left;
        }

        .isc-set-pos {
            position: relative;
            top: -3px;
        }

        .isc-set-bgclr {
            width: 434px;
            border-radius: 8px !important;
            background-color: #F7F7F7;
        }
        /*.isc-popup-detail-form-s1 .modal-footer
        {
            background-color:#F7F7F7 !important;
        }

        .isc-single-discussion-content {
            border-bottom: 1px solid #DFEEF7;
            height: 50px;
        }
        .isc-single-discussion-content:hover{
            border-bottom:unset;
            border: 1px solid #DFEEF7;
            border-radius:10px !important;
            background-color:#f4f9fc;
            padding:10px 5px;
            height:65px;
        }

            .isc-single-discussion-content label {
                font-size: 13px;
            }

        .isc-dis-block {
            display: block;
            color: #525252;
            padding-top: 5px;
            font-size: 12px;
        }

        .isc-single-discussion-content .smt-li-dataplan-inner-sub-title {
            width: 70%;
            color:#428bca;
        }

        .isc-single-discussion-content span {
            font-size: 10px;
            padding-left: 10px;
            color: #909090;
            font-weight: 400;
        }*/
        /*.isc-theme-blue-btn {
    background-color: #2e85bb !important;
    color: #ffffff !important;
    border-radius: 4px !important;
}*/
        /*.isc-set-fs-13 .isc-sec-lvl-cust-dd-s1 li a {
        /*.isc-set-fs-13 .isc-sec-lvl-cust-dd-s1 li a {
    
    font-size: 13px !important;
  margin-top:3px !important;
  padding:0px 5px !important;
    line-height: 22px !important;
    
}
.isc-set-fs-13 .isc-sec-lvl-cust-dd-s1 li a i{
    color:#fff !important;
}*/
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
        .isc-new-pop-up .modal-body {
            height: calc(100vh - 130px );
        }
    </style>
    <style>
        .isc-tbl-icon-img {
            width: 15px;
            margin-top: -2px;
        }
        .isc-app-screen-body-container
        {
            width:100%;
            overflow-x:hidden;
        }
        /*.mar-top-max {
    margin-top: 44px;
}*/
        .isc-vnd-edit-foot-cont {
    padding: 10px;
    position: relative;
    /*top: 39px;*/
    /* margin-bottom: 35px; */
    /*margin-top: 10px;
    width:100%;*/
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
        .isc-new-pop-up .modal-body {
            height: calc(100vh - 146px);
        }
    </style>
    <style>
        .nav-tabs {
            cursor: pointer !important;
        }

        .isc-tab-scroll li {
            display: inline-block !important;
            cursor: pointer !important;
        }

        .isc-vnd-edt-acc {
            width: 95% !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    padding-right: 5px;
        }
        /*.isc-bill-ven-logo{
          height:87px !important;
          width:111px !important;
      }*/
        .isc-bill-vnd-cht pre {
            margin: 0px 0px;
            font-size: 14px;
            line-height: 20px;
            color: #fff;
            background-color: #91D98A;
            border: unset;
            padding: 0px;
        }
        .isc-pad-lft-65{
            padding-left:65px;
        }
        .div-col-6per{
            width:6%;
            float:left;
        }
        .isc-vnd-msg-btn{
            top:0px;
        }
        .isc-btn-inp-typ-file-s1{
            font-size:13px !important;
        }
        #mp_add-contact .modal-body {
            height: calc(100vh - 109px);
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
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-pencil"></i>
                        <h2 style="line-height: 30px;">Vendor Edit</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="isc-ven-edit-cont1">
                        <div class="screen-row">
                            <div class="div-col-50per">
                                <div class="isc-page-header">
                                    <div class="div-col-10per">
                                        <img id="vendor-Logo" style="width: 60px !important" class="isc-bill-ven-logo">
                                    </div>
                                    <div class="div-col-60per">
                                        <h2 style="display: inline-block;" id="vendor-Name" class="isc-vnd-name-mb">-</h2>
                                        <%--  <h1 class="mar-none">Health Products</h1>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-20per isc-pad-lft-65" >
                                <label>Email</label>
                                <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-envelope-o" style="margin-right:5px;"></i><span id="vendor-Email">-</span></a></h4>
                            </div>
                            <div class="div-col-15per">
                                <label>Phone</label>
                                <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-phone" style="margin-right:5px;"></i><span id="vendor-Contact">-</span></a></h4>
                            </div>
                            <div class="div-col-15per">
                                <label>Balance</label>
                                <h4 class="isc-vnd-edt-acc isc-bill-amt-siz" id="vendor-Balance">$0</h4>
                            </div>
                            <div class="div-col-15per">
                                <label>Total Amount Paid</label>
                                <h4 class="isc-vnd-edt-acc isc-bill-amt-siz" id="vendor-Paid-Amount">$0</h4>
                            </div>
                            <%-- <div class="div-col-15per">
                                <label>Vendor Credits</label>
                                <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$5,316</h4>
                            </div>--%>
                            <div class="div-col-15per">
                                <label title="9/12/2020">Last Payment</label>
                                <h4 class="isc-vnd-edt-acc isc-bill-amt-siz" id="vendor-LastPay">$0</h4>
                            </div>
                        </div>

                    </div>
                    <div class="screen-row mar-top-10">
                        <div class="isc-screen-nav-container-s1">
                            <ul class="nav nav-tabs" style="position: relative;">
                                <li class="active"><a href="#Tab1" data-toggle="tab" id="bills-tab">Bills</a> </li>
                                <li class=""><a href="#Tab2" id="payments-tab" data-toggle="tab">Payments</a> </li>
                                <%-- <li class=""><a href="#Tab3" data-toggle="tab">Vendor Credits</a> </li>--%>
                                <li class="" id="vendor-Contact-List"><a href="#Tab4" data-toggle="tab">Contacts</a> </li>
                                <li class=""><a href="#Tab5" data-toggle="tab">Details</a> </li>
                                <li class="" id="vendor-Documents-List"><a href="#Tab6" data-toggle="tab">Documents</a> </li>
                                <li class="" id="vendor-Notes-List"><a href="#Tab7" data-toggle="tab">Notes</a> </li>
                                <%--<li class=""><a href="#Tab8" data-toggle="tab">Accounts Payable</a> </li>--%>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane fade in active" id="Tab1">
                                    <div class="screen-row">

                                        <div class="isc-bill-inr-cont1 mar-top-10">
                                            <div class="screen-row">
                                                <ul class="nav nav-tabs" style="position: relative;" id="bills-Tab-List">
                                                    <li class="active" id="unPaid-Tab"><a data-toggle="tab">Unpaid</a> </li>
                                                    <li class="" id="paid-Tab"><a data-toggle="tab">Paid</a> </li>
                                                    <li class="" id="recurring-Tab"><a data-toggle="tab">Recurring</a> </li>
                                                </ul>

                                                <div class="tab-content">
                                                    <div class="tab-pane fade in active" id="Tab11">
                                                        <div class="isc-lst-scrl-cont isc-mbl-mar-top-10">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                            <thead id="tbl-Bills">
                                                                <tr>

                                                                    <th style="width: 13%;" title="Bill#" class="header" sort-column-type="text" column-name="InvoiceNumber" data-sort="InvoiceNumber">Bill#
                                                                    </th>

                                                                    <th style="width: 21%;" title="Bill Description" class="header" sort-column-type="text" column-name="Description" data-sort="Description">Bill Description
                                                        
                                                                    </th>

                                                                    <th style="width: 17%;" title="Bill Status" class="header" sort-column-type="text" column-name="StatusName" data-sort="StatusName">Bill Status
                                                                    </th>
                                                                    <th style="width: 17%;" title="Payment Mode" class="header" sort-column-type="text" column-name="PaymentMode" data-sort="PaymentMode">Payment Mode
                                                                    </th>

                                                                    <%--<th style="width: 10%;" title="Stage" class="header" sort-column-Type="text" column-Name="StageName"  data-sort="StageName">Stage
                                                                    </th>--%>
                                                                    <th style="width: 10%;" title="Due Date" class="header" sort-column-type="date" column-name="DueDate" data-sort="DueDate">Due Date
                                                                    </th>
                                                                    <th style="width: 12%;" title="Amount Due" class="header" sort-column-type="number" column-name="Amount" data-sort="Amount">Amount Due
                                                                    </th>
                                                                    <th style="width: 10%; text-align: center;" title="Action">Action
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbl-Bills-Bdy">
                                                                <tr>
                                                                    <td colspan="6" style="text-align: center;">No data found</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                            </div>
                                                    </div>
                                                    <div class="tab-pane fade in " id="Tab12">
                                                         <div class="isc-tab-src-cont-res">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                            <thead>
                                                                <tr>

                                                                    <th style="width: 13%;" class="header">Bill#
                                                                    </th>

                                                                    <th style="width: 21%;" class="header">Bill Description
                                                        
                                                                    </th>

                                                                    <th style="width: 16%;" class="header">Bill Status
                                                                    </th>

                                                                    <th style="width: 10%;" class="header">Stage
                                                                    </th>
                                                                    <th style="width: 6%;" class="header">Due Date
                                                                    </th>
                                                                    <th style="width: 7%;" class="header">Amount Due
                                                                    </th>
                                                                    <th style="width: 10%; text-align: center;" class="header">Action
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>

                                                                    <td>
                                                                        <h5>1500095</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Electric Metered Bill</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " style="color: green;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Approved</a>
                                                                            <ul class="dropdown-menu">

                                                                                <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>


                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Payment</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5 style="color: red !important;">9/3/2020</h5>
                                                                    </td>


                                                                    <td>

                                                                        <h5 style="text-align: right;">$750</h5>
                                                                    </td>
                                                                    <td style="text-align: center;">

                                                                        <%-- <a href="#">
                                                                            <img src="images/image_2020_10_01T11_09_28_815Z.png" class="isc-make-pay" title="Make Payment" style="cursor: pointer;" /></a>--%>
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <td>
                                                                        <h5>1500096</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Electric Un Metered Bill</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-re-req " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Rejected</a>
                                                                            <ul class="dropdown-menu">
                                                                                <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>


                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                            </ul>
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
                                                                        <%--  <a href="#">
                                                                            <img src="images/image_2020_10_01T11_09_28_815Z.png" class="isc-make-pay" title="Make Payment" style="cursor: pointer;" /></a>--%>
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <td>
                                                                        <h5>1500097</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Invoice for the purchase of PO799</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-re-req " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed</a>
                                                                            <ul class="dropdown-menu">
                                                                                <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>


                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                            </ul>
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
                                                                        <%-- <a href="#">
                                                                            <img src="images/image_2020_10_01T11_09_28_815Z.png" class="isc-make-pay" title="Make Payment" style="cursor: pointer;" /></a>--%>
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <td>
                                                                        <h5>1500098</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>PO-679873</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-re-req " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Rejected</a>
                                                                            <ul class="dropdown-menu">
                                                                                <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>


                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                            </ul>
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
                                                                        <%-- <a href="#">
                                                                            <img src="images/image_2020_10_01T11_09_28_815Z.png" class="isc-make-pay" title="Make Payment" style="cursor: pointer;" /></a>--%>
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-eye"></i></a>

                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <td>
                                                                        <h5>1500099</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Invoice for the purchase of PO799</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-flg " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Flagged</a>
                                                                            <ul class="dropdown-menu">
                                                                                <li><a href="#" class="" style="color: green;">Approved</a></li>
                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>


                                                                                <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                                <li><a href="#" class="" style="color: #F8AA56;">Flagged</a></li>
                                                                            </ul>
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
                                                                        <%-- <a href="#">
                                                                            <img src="images/image_2020_10_01T11_09_28_815Z.png" class="isc-make-pay" title="Make Payment" style="cursor: pointer;" /></a>--%>
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
                                </div>
                                <div class="tab-pane fade in " id="Tab2">
                                    <div class="screen-row">

                                        <div class="isc-bill-inr-cont1 mar-top-10">
                                            <div class="screen-row">
                                                
                                                <div class="isc-screen-nav-container-s1">
                                                    <ul class="nav isc-tab-scroll" id="payments-Tab">
                                                        <li class="active" id="payment-Unpaid-Bills"><a data-toggle="tab">Unpaid</a> </li>
                                                        <li class="" id="payment-All-Bills"><a data-toggle="tab">All</a> </li>
                                                        <li class="" id="payment-Disputed-Bills"><a data-toggle="tab">Disputed</a> </li>
                                                        <li class="" id="payment-Rec-Bills"><a data-toggle="tab">Recurring </a></li>
                                                    </ul>
                                                </div>
                                                  
                                                

                                                <div class="tab-content">
                                                    <div class="tab-pane fade in active" id="Tab21">
                                                         <div class="isc-tab-src-cont-res">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                            <thead id="tbl-bill-payment">
                                                                <tr>

                                                                    <%-- <th style="width: 15%;" class="header">Vendor
                                                        </th>--%>
                                                                    <th style="width: 15%;" title="Bill#" class="header" sort-column-type="text" column-name="InvoiceNumber" data-sort-payment="InvoiceNumber">Bill#
                                                                    </th>

                                                                    <th style="width: 20%;" title="Bill Description" class="header" sort-column-type="text" column-name="Description" data-sort-payment="Description">Bill Description
                                                        
                                                                    </th>

                                                                    <th style="width: 14%;" title="Bill Status" class="header" sort-column-type="text" column-name="PaymentStatusName" data-sort-payment="PaymentStatusName">Bill Status
                                                                    </th>

                                                                    <%--<th style="width: 10%;" title="Stage">Stage
                                                        </th>--%>
                                                                    <th style="width: 10%;" title="Due Date" class="header" sort-column-type="date" column-name="DueOn" data-sort-payment="DueOn">Due Date
                                                                    </th>
                                                                    <th style="width: 10%;" title="Paid On" class="header" sort-column-type="date" column-name="PaidOn" data-sort-payment="PaidOn">Paid On
                                                                    </th>
                                                                    <th style="width: 14%;" title="Payment Mode" class="header" sort-column-type="text" column-name="PaymentMode" data-sort-payment="PaymentMode">Payment Mode
                                                                    </th>
                                                                    <th style="width: 10%;" title="Amount Due" class="header" sort-column-type="number" column-name="ApprovedAmount" data-sort-payment="ApprovedAmount">Amount Due
                                                                    </th>
                                                                    <th style="width: 12%; text-align: center;" title="Action">Action
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbl-Payment-Bills-Bdy">
                                                                <tr>
                                                                    <td colspan="8" style="text-align: center;">No data found</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                        </div>
                                                    <div class="tab-pane fade in " id="Tab22">
                                                         <div class="isc-tab-src-cont-res">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                            <thead>
                                                                <tr>

                                                                    <%-- <th style="width: 15%;" class="header">Vendor
                                                        </th>--%>
                                                                    <th style="width: 15%;" class="header">Bill#
                                                                    </th>

                                                                    <th style="width: 26%;" class="header">Bill Description
                                                        
                                                                    </th>

                                                                    <th style="width: 17%;" class="header">Bill Status
                                                                    </th>

                                                                    <th style="width: 10%;" class="header">Stage
                                                                    </th>
                                                                    <th style="width: 10%;" class="header">Due Date
                                                                    </th>
                                                                    <th style="width: 10%;" class="header">Amount Due
                                                                    </th>
                                                                    <th style="width: 12%; text-align: center;" class="header">Action
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>


                                                                    <%--<td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>--%>
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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>


                                                                    <%--<td>
                                                            <h5> Nicholson LLC.</h5>
                                                        </td>--%>
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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <%-- <td>
                                                            <h5>	
Baker Sanders Inc.</h5>
                                                        </td>--%>
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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <%--<td>
                                                            <h5>BSVGP Inc.</h5>
                                                        </td>--%>
                                                                    <td>
                                                                        <h5>1500098</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>PO-679873</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed</a>

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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>

                                                                    <%-- <td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>--%>
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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                             </div>
                                                    </div>
                                                    <div class="tab-pane fade in " id="Tab23">

                                                        <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                            <thead>
                                                                <tr>

                                                                    <%-- <th style="width: 15%;" class="header">Vendor
                                                        </th>--%>
                                                                    <th style="width: 15%;" class="header">Bill#
                                                                    </th>

                                                                    <th style="width: 26%;" class="header">Bill Description
                                                        
                                                                    </th>

                                                                    <th style="width: 17%;" class="header">Bill Status
                                                                    </th>

                                                                    <th style="width: 10%;" class="header">Stage
                                                                    </th>
                                                                    <th style="width: 10%;" class="header">Due Date
                                                                    </th>
                                                                    <th style="width: 10%;" class="header">Amount Due
                                                                    </th>
                                                                    <th style="width: 12%; text-align: center;" class="header">Action
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>


                                                                    <%-- <td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>--%>
                                                                    <td>
                                                                        <h5>1500095</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Electric Metered Bill</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed </a>

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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>


                                                                    <%--<td>
                                                            <h5>Nicholson LLC.</h5>
                                                        </td>--%>
                                                                    <td>
                                                                        <h5>1500096</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Electric Un Metered Bill</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed </a>

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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>


                                                                    <%-- <td>
                                                            <h5> 	
Baker Sanders Inc.</h5>
                                                        </td>--%>
                                                                    <td>
                                                                        <h5>1500097</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Invoice for the purchase of PO799</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed </a>

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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>


                                                                    <%--  <td>
                                                            <h5>BSVGP Inc.</h5>
                                                        </td>--%>
                                                                    <td>
                                                                        <h5>1500098</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>PO-679873</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed </a>

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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                    </td>

                                                                </tr>
                                                                <tr>


                                                                    <%--<td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>--%>
                                                                    <td>
                                                                        <h5>1500099</h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5>Invoice for the purchase of PO799</h5>
                                                                    </td>
                                                                    <td>
                                                                        <div class="isc-td-inline-status-ch-s1">
                                                                            <a class="isc-lbl-act-read-list-s1 isc-dsp-clr" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Disputed </a>

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
                                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                <div class="tab-pane fade in " id="Tab4">
                                    <div class="isc-bill-inr-cont1 mar-top-10">
                                        <div class="screen-row">
                                            <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                <a class="isc-theme-blue-btn" id="open-Contact-Model" title="Add Contact">Add Contact</a>
                                            </div>
                                        </div>
                                        <div class="isc-tab-src-cont-res">
                                        <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10" id="tbl-Contact">
                                            <thead>
                                                <tr>
                                                    <th style="width: 25%;" class="header" sort-column-type="text" column-name="Name" data-sort-contact="Name">Name</th>
                                                    <th style="width: 25%;" class="header" sort-column-type="text" column-name="Email" data-sort-contact="Email">Email
                                                    </th>

                                                    <th style="width: 25%;" class="header" sort-column-type="text" column-name="Phone" data-sort-contact="Phone">Phone 
                                                        
                                                    </th>
                                                    <th style="width: 25%;">Action 
                                                        
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody id="tbl-Contact-Body">
                                            </tbody>
                                        </table>
                                    </div>
                                        </div>
                                </div>
                                <div class="tab-pane fade in " id="Tab5">
                                    <div class="isc-bill-inr-cont1 mar-top-10">
                                        <div class="screen-row mar-top-10">
                                            <div class="screen-row">
                                                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                    <a class="isc-theme-blue-btn" id="btn-Edit-Vendor" href="">Edit Vendor</a>
                                                </div>
                                            </div>
                                <div class="isc-mb-res-pay-det-popup isc-vde-dtl-tab-mb">
                                            <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b" style="margin-top: 0px;">Vendor Info : </h5>
                                            <div class="screen-row mar-top-10">
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Vendor Name : </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendorName">-</label>

                                                    </div>
                                                </div>
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Vendor Type : </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendorType">-</label>

                                                    </div>
                                                </div>
                                            </div>





                                            <div class="screen-row mar-top-10">
                                                
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Contact Number: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="contactNumber">-</label>

                                                    </div>
                                                </div>
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Primary Email: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendoEmail">-</label>

                                                    </div>
                                                </div>
                                            </div>


                                            <div class="screen-row mar-top-10">

                                                

                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Payment Terms: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-PaymentTerm">-</label>

                                                    </div>
                                                </div>
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Tax ID : </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-Taxid">-</label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="screen-row mar-top-10">
                                                
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Preferred Payment Method: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-PaymentMethod">-</label>

                                                    </div>
                                                </div>
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Lead Time (Days): </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-LeadTimes">-</label>

                                                    </div>
                                                </div>
                                            </div>

                                            <div class="screen-row mar-top-10">
                                                

                                            </div>






                                            <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b">Address : </h5>
                                            <div class="screen-row mar-top-10">
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Vendor Address: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-Address">-</label>

                                                    </div>
                                                </div>
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">City: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-City">-</label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="screen-row mar-top-10">
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">State : </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-State">-</label>

                                                    </div>
                                                </div>
                                                 <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Zip : </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-Zip">-</label>

                                                    </div>
                                                </div>
                                                <%-- <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Country : </label>
                                                    </div>
                                                    <div class="div-col-50per">
                                                         <label class="mar-top-5" id="country">-</label>
                                                       
                                                    </div>
                                                </div>--%>
                                            </div>



                                            
                                            <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b">Bank details : </h5>
                                            <div class="screen-row mar-top-10">
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Account Holder Name: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-AccountHolder">-</label>

                                                    </div>
                                                </div>
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Routing Number: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-RoutingNumber">-</label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="screen-row mar-top-10">
                                                <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">Account Number: </label>
                                                    </div>
                                                    <div class="div-col-55per">
                                                        <label class="mar-top-5" id="vendor-AccountNumber">-</label>

                                                    </div>
                                                </div>
                                                <%--  <div class="div-col-50per">
                                                    <div class="div-col-30per">
                                                        <label class="mar-top-5">ACH Routing Number: </label>
                                                    </div>
                                                    <div class="div-col-50per">
                                                         <label class="mar-top-5">623852453</label>
                                                       
                                                    </div>
                                                </div>--%>
                                            </div>
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
                                            <%-- <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                                                    <span class="isc-btn-inp-typ-file-s1 cell-right">Add CSV

                                    <input type="file" name="filename"  style="width: 200px;" id="GL-file" title="Add file"/>
                                                                    </span>
                                                    <%--<a class="isc-theme-blue-btn" data-toggle="modal" href="#">Add Document</a>--%>
                                            <%--</div>
                                            </div>--%>


                                            <%--<a  class="isc-vnd-msg-btn" id="btn-Save-ExcelData">Save File</a>--%>

                                            <%--<a class="isc-theme-blue-btn" data-toggle="modal" href="#">Add Document</a>--%>
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
                                                    <input type="text" class="form-control" id="txt-Notes" placeholder="Enter notes" />
                                                </div>
                                                <div class="div-col-5per">
                                                    <a id="add-Notes" class="isc-vnd-msg-btn" style="cursor: pointer">Send</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="isc-bill-vnd-edi-cht-cont" style="padding: 10px;" id="div-Notes-Body">
                                            <%-- <div class="screen-row">
                                            <div class="div-col-8per">
                                               
                                                    <img src="img/appfinal/48.jpg" class="isc-vnd-img"/>
                                                <h5 style="font-weight:400;"> Frank Abagnale</h5>
                                            </div>
                                            <div class="div-col-80per">
                                                <h6 class="isc-vnd-edt-cht-tm">Sun Feb 28 ,4.54 am</h6>
                                                <div class="isc-bill-vnd-cht">
                                                    <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <a class="isc-bdg-grd-sts-s2 isc-bdg-col-c1" title="Edit" href="#">Edit</a>
                                            </div>
                                        </div>
                                        
                                            <div class="screen-row mar-top-max">
                                            <div class="div-col-8per">
                                               
                                                    <img src="img/appfinal/48.jpg" class="isc-vnd-img"/>
                                                <h5 style="font-weight:400;"> Frank Abagnale</h5>
                                            </div>
                                            <div class="div-col-80per">
                                                <h6 class="isc-vnd-edt-cht-tm">Sun Feb 28 ,4.54 am</h6>
                                                <div class="isc-bill-vnd-cht">
                                                    <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <a class="isc-bdg-grd-sts-s2 isc-bdg-col-c1" title="Edit" href="#">Edit</a>
                                            </div>
                                        </div>--%>
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
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_add-contact" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="contact-Modal-Title">Add Contact</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" title="Close" style="cursor: pointer;" data-cancel-contact="true"></i></a>
                            <%--<button type="button" class="close img-typ-sq" title="Close" data-Cancel-Contact="true"aria-hidden="true">
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
                                            <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="Email" data-email="Email">Entered Email id is not valid.</span>
                                            <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="email" id="email-Validation">Email should not be empty</span>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Phone <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" placeholder="Enter Phone" phone-number="true" id="contact-phone" class="form-control" data-textbox="Phone">
                                            <span class="validation-message" id="phone-Validation" style="display: none; color: red" error-active="false" data-validation="Phone">Phone should not be empty</span>
                                        </div>

                                    </div>

                                </div>
                                <%-- <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Fax</label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="password" placeholder="Enter Fax" class="form-control">
                                        </div>

                                    </div>

                                </div>--%>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="insert-Vendor-Contact">
                            Add</button>
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="Update-Vendor-Contact">
                            Update</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-cancel-contact="true">
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
                                <%-- <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Fax</label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="password" placeholder="Enter Fax" class="form-control">
                                        </div>

                                    </div>

                                </div>--%>
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
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_contact_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Contact Delete</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color: #8A8A8A; cursor: pointer;" title="Close" delete-contact-cancel="true" aria-hidden="true"></i></a>
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
                        <button type="button" class="btn default isc-btn-pop-action-s2" delete-contact-cancel="true" id="close-delete">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="slider">

        <div class="split-amount">
            <div style="width: 522px;">

                <div class="close-slider">
                    <div class="cls">
                        <h3>Split Amount</h3>
                        <i class="fa fa-close close-amount"></i>
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
    <div class="modal fade isc-popup-detail-form-s1 in  isc-new-pop-up" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false" style="">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Comments</h4>
                        </div>
                        <div class="cell-right">
                            <a  class="fa fa-times-circle" data-dismiss="modal" style="cursor:pointer" aria-hidden="true" title="Close">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">
                    <div class="screen-row" style="margin:10px;">
                         <div class="cell-left">
                        <textarea class="form-control isc-set-bgclr" placeholder="Write a comment" id="txt-Command"></textarea>
                    </div>
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1 mar-top-10"  id="btn-Send" title="Send" style="cursor:pointer">
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
        $(".close-amount").click(function () {
            $(".split-amount").removeClass("split-amount-show");

        });
        $(".close-settings").click(function () {
            $(".settings").removeClass("settings-show");
        });
    </script>
    <%--<script src="iscjsengine/PageScript/GLImport.js"></script>--%>
    <script src="iscjsengine/PageScript/VendorEdit.js"></script>

</asp:Content>
