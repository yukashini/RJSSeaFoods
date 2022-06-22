<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Bill_FinancerHome.aspx.cs" Inherits="BillManagement.Bill_FinancerHome" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="scripts/FIPControls/ISC-LineChart.js"></script>
     <script src="scripts/FIPControls/ISC-StackedBarChart.js"></script>
    <style type="text/css">
        @media only screen and (max-width: 767px) {
            .dropdown-menu-entity {
                right: 8px;
                width: 92px;
            }
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
            top: -14px;
        }

        .isc-set-bgclr {
            width: 482px;
            border-radius: 8px !important;
            background-color: #F7F7F7;
        }
        .isc-popup-detail-form-s1 .modal-footer
        {
            background-color:#F7F7F7 !important;
        }

        /*.isc-single-discussion-content {
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
            }*/

        .isc-dis-block {
            display: block;
            color: #525252;
            padding-top: 5px;
            font-size: 12px;
        }

        /*.isc-single-discussion-content .smt-li-dataplan-inner-sub-title {
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
    height: calc(100vh - 130px);
   }
        #Commands_body{
             padding:10px 10px !important;
         }
       #mp_comts .modal-body {
            height: calc(100vh - 125px);
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-home"></i>
                        <h2 style="line-height: 30px;"> Finance Manager</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                
                
              <div class="cell-right">
                                           <ul class="isc-sec-lvl-cust-dd-s1">
                                         <li><a title="More Options" type="button" class="isc-dd-drat-btn-s1 isc-sub-menu-list-s1 " data-toggle="dropdown"><span id="selected-Filter">Due This Month</span> <i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2" role="menu">
                                                <li class="" title="Overdue" data-Filter="Overdue"><a>Overdue</a></li>
                                                <li title="Today" data-Filter="Due Today"><a >Due Today </a>
                                                </li>
                                                <li title="Current Week" data-Filter="Due This Week"><a >Due This Week</a> </li>
                                                <li title="Current Week" data-Filter="Due Last Week"><a >Due Last Week</a> </li>
                                                <li title="Current Week" data-Filter="Due Next Week"><a >Due Next Week</a> </li>
                                                <li title="Current Month" data-Filter="Due This Month"><a >Due This Month</a> </li>
                                                 <li title="Current Month" data-Filter="Due Last Month"><a >Due Last Month</a> </li>
                                                   <li title="Current Month" data-Filter="Due Next Month"><a >Due Next Month</a> </li>
                                                <li  data-Filter="Due This Quarter"><a >Due This Quarter </a>
                                                </li>
                                                 <li  data-Filter="Due Last Quarter"><a >Due Last Quarter </a>
                                                </li>
                                                 <li  data-Filter="Due Next Quarter"><a >Due Next Quarter </a>
                                                </li>
                                                  <li  data-Filter="Due This Year"><a >Due This Year </a>
                                                </li>
                                                 <li  data-Filter="Due Last Year"><a >Due Last Year </a>
                                                </li>
                                                 <li  data-Filter="Due Next Year"><a >Due Next Year </a>
                                                </li>

                                              
                                            </ul>
                                        </li>
                                    </ul>
                                       </div>

            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                                    
                                    <div class="div-col-25per " style="cursor:pointer" data-Kpi="50023">
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
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn" id="outStanding-This-Week">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor:pointer" data-Kpi="0">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Overdue Payments</h2>
                                                    </div>
                                                <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#ED5263;" id="overDue-Count"> 0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="overDue-Amount" class="isc-kpi-clr2">$0</h5>
                                                             <div class="screen-row mar-top-10">
                                                                 <div class="cell-left">     
                                                            <h4>New bills</h4></div>
                                                            <div class="cell-right">
                                                                 <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3" id="overDue-This-week">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                               
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor:pointer" data-Kpi="1">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Due This week </h2>
                                                    </div>
                                                <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#14B191;" id="due-Thisweek-Count">0
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
                                                            <h4>New bills</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1" id="new-Due-This-Week" style="color:#14B191 !important;">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor:pointer">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Disputed payments </h2>
                                                    </div>
                                                 <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#F8AA56;" id="disputed-Count"> 0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="disputed-Amount" class="isc-kpi-clr4">$0 </h5>
                                                             <div class="screen-row mar-top-10">
                                                                 <div class="cell-left">     
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4" id="disputed-This-Week" style="color:#F8AA56;">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                    
                    <div class="screen-row mar-top-10">
                        <div class="div-col-75per">
                             <div class="chart-section-inner-sign-banner ">
                                <div class="isc-sec-con-bdy-my-action" style="padding:0px;">
                                   <div class="isc-usr-hme-hdr-sec">
                                       <div class="cell-left">
                                       <h5 class="isc-usr-hme-hdr-sec-h5"> Bills By Status</h5></div>
                                       <div class="cell-right">
                                          <%-- <i class="fa fa-ellipsis-h"></i>--%>
                                       </div>
                                   </div>
                                     <div class="isc-usr-hme-bdy-sec isc-usr-hme-bdy-sec1">
                                            <%--<script type="text/javascript">
                                               Get_LineChartModal3("LineChartModal1");
                                            </script>
                                            <svg id="LineChartModal1" class="ht-350"></svg>--%>
                                        <%-- <script type="text/javascript">
                                             Get_StackedBarChartModal5("StackedBarChartModal5");
                                            </script>--%>
                                            <svg id="StackedBarChartModal5" style="height:340px !important;" class="ht-250"></svg>
                                         </div>
                                    
                        </div>
                    </div>


                </div>
                        <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10">
                             <div class="chart-section-inner-sign-banner ">
                                <div class="isc-sec-con-bdy-my-action" style="padding:0px;">
                                   <div class="isc-usr-hme-hdr-sec">
                                       <div class="cell-left">
                                       <h5 class="isc-usr-hme-hdr-sec-h5">Outstanding Payments</h5></div>
                                       <div class="cell-right">
                                          <a href="Bill_PaymentSummary.aspx"  child-menu="6" style="color:#0592c2 !important">View All</a>
                                       </div>
                                   </div>
                                     <div class="isc-usr-hme-bdy-sec isc-usr-hme-bdy-sec1 isc-tab-src-cont-res" style="padding:0px;">
                                         
                                         <table id="data-list" class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                        <thead>
                                            <tr  >
                                                <th style="width: 37.33%; user-select: none;" class="header" sort-column-Type="text" column-Name="Description"  data-sort="Description" title="Bill#">Bill#</th>
                                                <th style="width: 36.33%; user-select: none;" class="header" sort-column-Type="number" column-Name="ApprovedAmount"  data-sort="ApprovedAmount" title="Amount">Amount</th>
                                                <th style="width: 26%; user-select: none;" class="noheader text-center" title="Action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody aria-live="polite" aria-relevant="all" id="tbl-Bill-Body">
                                          
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
    <div class="modal fade isc-popup-detail-form-s1 in " id="Mp_Comments" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Comments</h4>
                        </div>
                        <div class="cell-right">
                          <a><i class="fa fa-times-circle" style="color:#8A8A8A;cursor:pointer;" title="Close"  id="close-Comment"  aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body" id="div-BillComments">
                                <div class="form-group">
                                    <div class="screen-row">
                                         <h4 class="modal-title">Edward Abbey <span style="color:red">(Disputed)</span></h4>
                                        <p class="isc-bill-conf-del mar-top-10">Because if the payer click the settle up and record cash payment, it is being considered as the person(being paid who has already settled up from his end once he receive the amount) lent some amount to the person who has to pay due to dual settle up</p>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                         <h4 class="modal-title">Hal Abelson <span style="color:green">(Approved)</span></h4>
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
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false" style="display:;">
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
    <script src="iscjsengine/PageScript/Bill_FinancerHome.js"></script>
</asp:Content>
