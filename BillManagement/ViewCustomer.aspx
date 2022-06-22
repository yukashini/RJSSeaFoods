<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ViewCustomer.aspx.cs" Inherits="BillManagement.ViewCustomer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        @media only screen and (max-width: 767px) {
          .isc-vnd-edit-foot-cont  .div-col-95per {
                width: 75%;
            }
        }
         .isc-app-screen-body-container
        {
            width:100%;
            overflow-x:hidden;
        }
        .isc-vnd-edt-acc {
            margin: 0px;
            font-size: 16px;
            line-height: 31px;
            font-weight: 400;
            color: #000;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

            .isc-vnd-edt-acc span {
                margin-left: 5px;
            }

            .isc-vnd-edt-acc a {
                cursor: context-menu;
            }

        .is-lable-overlow label {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .isc-btn-inp-typ-file-s1:hover{
                /*background-color: orange;*/
                color:#fff;
        }
        table.dataTable thead th, table.dataTable thead td {
    padding: 10px 10px;
    border-bottom: 1px solid #DCDDDD;
}
          .isc-new-pop-up .modal-body {
            height: calc(100vh - 146px);
        }
          .isc-vnd-msg-btn{
              top:0px ;
          }
          .isc-btn-inp-typ-file-s1{
              font-size:13px !important;
          }
          #mp_add-contact .modal-body {
    height: calc(100vh - 109px);
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
                                <h2 style="line-height: 30px;">Customer Edit</h2>
                                <h6 class="mar-none"></h6>
                            </div>
                        </div>
                    </div>
                    <%--<div class="div-col-70per">
                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                            <a class="isc-theme-blue-btn" href="#">Export</a>

                        </div>
                    </div>--%>
                </div>
                <div class="isc-app-screen-body-container" >
                    <div class="screen-row">
                        <div class="isc-app-screen-sec-container-s1 ">
                            <div class="isc-ven-edit-cont1">
                                <div class="screen-row">
                                    <div class="div-col-50per">
                                        <div class="isc-page-header">
                                            <div class="div-col-10per">
                                                <img id="Customer-Logo" style="width: 60px !important" class="isc-bill-ven-logo">
                                            </div>
                                            <div class="div-col-60per">
                                                <h2 style="display: inline-block;" class="isc-mb-dots"><span id="lbl_Cusname"></span></h2>
                                                <%--<h1 class="mar-none">Health Products</h1>--%>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="screen-row mar-top-15">
                                    <div class="div-col-20per isc-pad-lft-65">
                                        <label>Email</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-envelope-o" style="margin-right:5px;"></i><span id="email"></span></a></h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label>Phone</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-phone" style="margin-right:5px;"></i><span id="lbl_Phoneno"></span></a></h4>
                                    </div>
                                    <%--<div class="div-col-15per">
                                        <label>Receivable Amount</label>
                                        <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$56,356</h4>
                                    </div>--%>

                                    <%--                                    <div class="div-col-15per">
                                        <label title="9/12/2020">Last Payment</label>
                                        <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$3,597</h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label title="9/12/2020">Total Amount Received</label>
                                        <h4 class="isc-vnd-edt-acc isc-bill-amt-siz">$2,597</h4>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="isc-screen-nav-container-s1">
                                    <ul class="nav nav-tabs" style="position: relative;">
                                        <li class="active"><a href="#Tab1" data-toggle="tab">Bills</a> </li>
                                        <%--<li class=""><a href="#Tab2" data-toggle="tab">Payments</a> </li>--%>

                                        <li class=""><a href="#Tab4" data-toggle="tab" id="vendor-Contact-List">Contacts</a> </li>
                                        <li class=""><a href="#Tab5" data-toggle="tab">Details</a> </li>
                                        <li class=""><a href="#Tab6" data-toggle="tab" id="vendor-Documents-List">Documents</a> </li>
                                        <li class=""><a href="#Tab7" data-toggle="tab" id="vendor-Notes-List">Notes</a> </li>

                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane fade active in" id="Tab1">
                                            <div class="screen-row">

                                                <div class="isc-bill-inr-cont1 mar-top-10">
                                                    <div class="screen-row">
                                                        <ul class="nav nav-tabs" style="position: relative;">
                                                            <li class="active"><a href="#Tab11" data-toggle="tab">All Bills</a> </li>
                                                            <%-- <li class=""><a href="#Tab12" data-toggle="tab">Paid</a> </li>
                                                    <li class=""><a href="#Tab13" data-toggle="tab">Recurring</a> </li>--%>
                                                        </ul>

                                                        <div class="tab-content">
                                                            <div class="tab-pane fade in active" id="Tab11">
                                                                <div class="isc-lst-scrl-cont isc-mbl-mar-top-10">
                                                                <table class="isc-table-read-optimal isc-ddp-hdn-lst isc-upd-bill-cont" id="tbl_Billlist">
                                                                    <thead>
                                                                        <tr>

                                                                            <th style="width: 13%;" class="header">Bill#</th>
                                                                            <th style="width: 13%;" class="header">Bill Description
                                                                            </th>

                                                                            <th style="width: 19%;" class="header">Bill Status 
                                                        
                                                                            </th>


                                                                            <th style="width: 16%;" class="header">Due Date 
                                                                            </th>


                                                                            <th style="width: 10%;" class="header">Amount Due
                                                                            </th>
                                                                            <th style="width: 14%;" class="header">Action
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                                </div>
                                                            <div class="tab-pane fade in " id="Tab12">
                                                                 <div class="isc-tab-src-cont-res">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>
                                                                            <th style="width: 11%;" class="header">Customer</th>
                                                                            <th style="width: 11%;" class="header">Invoice #
                                                                            </th>

                                                                            <th style="width: 16%;" class="header">Invoice Description
                                                        
                                                                            </th>


                                                                            <th style="width: 15%;" class="header">Invoice Status
                                                                            </th>

                                                                            <th style="width: 11%;" class="header">Due Date
                                                                            </th>
                                                                            <th style="width: 9%;" class="header">Amount Due
                                                                            </th>
                                                                            <th style="width: 13%; text-align: center;" class="header">Action
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
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
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
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
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
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
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
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
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
                                                            <div class="tab-pane fade in " id="Tab13">
                                                                 <div class="isc-tab-src-cont-res">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst" id="tbl_Bill">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>
                                                                            <th style="width: 12%;" class="header">Customer
                                                                            </th>
                                                                            <th style="width: 13%;" class="header">Invoice #
                                                                            </th>

                                                                            <th style="width: 18%;" class="header">Invoice  Description
                                                        
                                                                            </th>


                                                                            <th style="width: 15%;" class="header">Invoice Status
                                                                            </th>

                                                                            <th style="width: 12%;" class="header">Due Date
                                                                            </th>
                                                                            <th style="width: 9%;" class="header">Amount Due
                                                                            </th>
                                                                            <th style="width: 15%; text-align: center;" class="header">Action
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
                                        </div>
                                        <div class="tab-pane fade in " id="Tab2">
                                            <div class="screen-row">

                                                <div class="isc-bill-inr-cont1 mar-top-10">
                                                    <div class="screen-row">
                                                        <div class="isc-screen-nav-container-s1">
                                                            <ul class="nav nav-tabs">
                                                                <li class="active"><a href="#Tab21" data-toggle="tab">Unpaid Invoices</a> </li>
                                                                <li class=""><a href="#Tab22" data-toggle="tab">All Invoices</a> </li>
                                                                <li class=""><a href="#Tab23" data-toggle="tab">Disputed Invoices</a> </li>
                                                                <li class=""><a href="#Tab24" data-toggle="tab">Recurring Invoices </a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="tab-content">
                                                            <div class="tab-pane fade active  in" id="Tab21">
                                                                 <div class="isc-tab-src-cont-res">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>

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
                                                                            <th style="width: 16%; text-align: center;" class="header">Action
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
                                                                                <h5>Payment</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5 style="color: red !important;">9/3/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">

                                                                                <a href="PaymentDetail2.aspx" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <h5>1500096</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Electric Un Metered Bill</h5>
                                                                            </td>
                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-pay-pnd" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Pending</a>

                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Payment</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/11/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <h5>1500097</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Invoice for the purchase of PO799</h5>
                                                                            </td>
                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-pay-pnd" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Pending</a>

                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Payment</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/13/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Dispute" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <h5>1500098</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>PO-679873</h5>
                                                                            </td>
                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-pay-pnd" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Pending</a>

                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Payment</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/18/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>



                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <h5>1500099</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Invoice for the purchase of PO799</h5>
                                                                            </td>
                                                                            <td>
                                                                                <div class="isc-td-inline-status-ch-s1">
                                                                                    <a class="isc-lbl-act-read-list-s1 isc-pay-pnd" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Pending</a>

                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h5>Payment</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>9/21/2020</h5>
                                                                            </td>


                                                                            <td>

                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td style="text-align: center;">

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>



                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                            </td>

                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                                </div>
                                                            <div class="tab-pane fade" id="Tab22">
                                                                 <div class="isc-tab-src-cont-res">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>

                                                                            <th style="width: 13%;" class="header">Invoice #
                                                                            </th>

                                                                            <th style="width: 20%;" class="header">Invoice Description
                                                        
                                                                            </th>

                                                                            <th style="width: 17%;" class="header">Invoice Status
                                                                            </th>

                                                                            <th style="width: 11%;" class="header">Stage
                                                                            </th>
                                                                            <th style="width: 11%;" class="header">Due Date
                                                                            </th>
                                                                            <th style="width: 10%;" class="header">Amount Due
                                                                            </th>
                                                                            <th style="width: 12%; text-align: center;" class="header">Action
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

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>



                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
                                                                            </td>

                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                                </div>
                                                            <div class="tab-pane fade " id="Tab23">
                                                                 <div class="isc-tab-src-cont-res">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 3%;" class="header">
                                                                                <div class="checker">
                                                                                    <span>
                                                                                        <input type="checkbox"></span>
                                                                                </div>
                                                                            </th>

                                                                            <th style="width: 13%;" class="header">Invoice #
                                                                            </th>

                                                                            <th style="width: 18%;" class="header">Invoice Description
                                                        
                                                                            </th>

                                                                            <th style="width: 16%;" class="header">Invoice Status
                                                                            </th>

                                                                            <th style="width: 11%;" class="header">Stage
                                                                            </th>
                                                                            <th style="width: 11%;" class="header">Due Date
                                                                            </th>
                                                                            <th style="width: 10%;" class="header">Amount Due
                                                                            </th>
                                                                            <th style="width: 11%; text-align: center;" class="header">Action
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

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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
                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Flag" href="#"><i class="fa fa-flag" style="color: #29b392 !important"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Disputed" href="#"><i class="fa fa-exclamation-triangle" style="color: #ad1717 !important"></i></a>
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

                                                                                <a href="#" class="isc-action-badge-td-s1" title="Send Invoice"><i class="fa fa-envelope-o"></i></a>


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
                                                            <th style="width: 10%; cursor: context-menu;">Action 
                                                        
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbl-Contact-Body">
                                                    </tbody>
                                                </table>
                                            
                                                 </div></div>
                                        </div>
                                        <div class="tab-pane fade" id="Tab5">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row mar-top-10">
                                                    <div class="screen-row">
                                                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                            <a class="isc-theme-blue-btn" id="btn_edit">Edit Customer</a>
                                                        </div>
                                                    </div>

                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b" style="margin-top: 0px; cursor: context-menu !important;">Customer Info : </h5>
                                                    <div class="is-lable-overlow isc-mb-res-pay-det-popup">
                                                        <div class="screen-row mar-top-10">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Customer Name : </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_cusname"></label>

                                                                </div>

                                                            </div>

                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Customer Type: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_custype"></label>

                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Email: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_cusemail">Credit Card</label>
                                                                </div>
                                                            </div>

                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Contact Number: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_cusphone"></label>

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Customer Address: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_cusaddress"></label>
                                                                </div>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">City: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_cuscity"></label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">State: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_state"></label>

                                                                </div>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Zip: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_cuszip"></label>

                                                                </div>
                                                            </div>
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
                <div class="modal-dialog" style="width: 650px;">
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
                                    <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true" id="btn_close" title="Close">
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
                            <a><i class="fa fa-times-circle" style="color: #8A8A8A; cursor: pointer;" title="Close" delete-contact-cancel="true" id="btn_deleteclose" aria-hidden="true"></i></a>
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
    <div class="modal fade isc-popup-detail-form-s1 in" id="Mp_View" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Bill</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color: #8A8A8A; cursor: pointer;" title="Close" id="close-Comment" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row" style="margin:15px">
                    <div class="screen-row isc-mb-res-pay-det-popup">
                    <div class="div-col-30per">
                        <label class="mar-top-5">Bill#: </label>
                    </div>
                    <div class="div-col-55per">
                        <label class="mar-top-5" id="lbl_Invice"></label>
                    </div>
                    </div>
                     <div class="screen-row margin-top-10 isc-mb-res-pay-det-popup">
                    <div class="div-col-30per">
                        <label class="mar-top-5">Bill Description: </label>
                    </div>
                    <div class="div-col-55per">
                        <label class="mar-top-5" id="lbl_Billdescription"></label>
                    </div>
                         </div>
                    <div class="screen-row margin-top-10 isc-mb-res-pay-det-popup">
                    <div class="div-col-30per">
                        <label class="mar-top-5">Bill Status: </label>
                    </div>
                    <div class="div-col-55per">
                        <label class="mar-top-5" id="lbl_BillStatus"></label>
                    </div>
                        </div>
                    <div class="screen-row margin-top-10 isc-mb-res-pay-det-popup">
                    <div class="div-col-30per">
                        <label class="mar-top-5">Due Date: </label>
                    </div>
                    <div class="div-col-55per">
                        <label class="mar-top-5" id="lbl_Duedate"></label>
                    </div>
                        </div>
                    <div class="screen-row margin-top-10 isc-mb-res-pay-det-popup">
                    <div class="div-col-30per">
                        <label class="mar-top-5">Amount Due: </label>
                    </div>
                    <div class="div-col-55per">
                        <label class="mar-top-5" id="lbl_Amountdue"></label>
                    </div>
                        </div>

                </div>

                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script src="iscjsengine/PageScript/CustomerView.js"></script>
</asp:Content>
