<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Bill_UserHome.aspx.cs" Inherits="BillManagement.Bill_UserHome" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="iscjsengine/PageScript/Bill_UserHome.js"></script>
    <script src="scripts/FIPControls/ISC-LineChart.js"></script>
    <script src="scripts/FIPControls/ISC-StackedBarChart.js"></script>
    <script src="scripts/FIPControls/ISC-PieChart.js"></script>
      <style type="text/css">
          @media only screen and (max-width: 767px) {
            .isc-lbl-floting-cht-s1  {
                left:0 !important;
               
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
        .isc-single-discussion-content span {
            /*float: right;*/
        }

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
            /*background-color:#F7F7F7 !important;*/
        }

        .isc-single-discussion-content {
            /*border-bottom: 1px solid #DFEEF7;
            height: 50px;*/
        }
        .isc-single-discussion-content:hover{
            /*border-bottom:unset;
            border: 1px solid #DFEEF7;
            border-radius:10px !important;
            background-color:#f4f9fc;
            padding:10px 5px;
            height:65px;*/
        }

            .isc-single-discussion-content label {
                /*font-size: 13px;*/
            }

        .isc-dis-block {
            /*display: block;
            color: #525252;
            padding-top: 5px;
            font-size: 12px;
        }*/

        .isc-single-discussion-content .smt-li-dataplan-inner-sub-title {
            /*width: 70%;
            color:#428bca;*/
        }

        .isc-single-discussion-content span {
            /*font-size: 10px;
            padding-left: 10px;
            color: #909090;
            font-weight: 400;*/
        }
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
    </style>
    <style>
       .isc-apr-rgt-txt2 i{
            display: none;
        }
        .isc-apr-hme-prg-bar2 {
    height: 5px;
    width: 50%;
    /*background-color: #aaadac !important;*/
}

        .isc-apr-rgt-txt2{
            font-size: 14px !important;

    margin-bottom: 5px !important;
        }

        .mar-top-12{
            margin-top: 12px;
        }
         .isc-apr-hme-prg-bar1 {
    height: 5px;
    width: 100%;
    background-color: #eee;
}
         .isc-table-read-optimal tbody td:last-child 
         {
             padding:unset !important;
         }
         .isc-new-pop-up .modal-body {
    height: calc(100vh - 130px);
    overflow-y: scroll;
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
                        <h2 style="line-height: 30px;"> Home</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <%--<div class="div-col-70per">
                <div class="cell-right">
              <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li><a title="More Options" type="button" class="isc-dd-drat-btn-s1 isc-sub-menu-list-s1 " data-toggle="dropdown"><span id="selected-Filter">Created This Month</span> <i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2" role="menu">--%>
                                                 <%--<li title="Today" data-Filter="Created Today"><a >Created Today </a></li>--%>                                                
                                                 <%--<li data-Filter="Created This Week"><a >Created This Week</a> </li>
                                                 <li data-Filter="Created Last Week"><a >Created Last Week</a> </li>
                                                 <li data-Filter="Created This Month"><a >Created This Month</a> </li>
                                                 <li  data-Filter="Created Last Month"><a >Created Last Month</a> </li>
                                                 <li  data-Filter="Created This Year"><a >Created This Year</a> </li>
                                                 <li  data-Filter="Created Last Year"><a >Created Last Year</a> </li>
                                                 <li data-Filter="Overdue"><a>Overdue</a></li>
                                                 <li data-Filter="Due This Week"><a >Due This Week</a> </li>
                                                 <li data-Filter="Due Next Week"><a >Due Next Week</a> </li>
                                                 <li data-Filter="Due This Month"><a >Due This Month</a> </li>
                                            </ul>
                                        </li>
                                    </ul>
                    </div>--%>
               
                <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 

                    <%--<a class="isc-theme-blue-btn" href="CreateNewBill.aspx" title="Upload Bill" id="upload-Bill"> Upload Bill</a>--%>
                </div>
              

            </div>
        </div>
        <div class="isc-app-screen-body-container" <%--style="height: 287px;"--%>>
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row isc-mbl-rsp-kpi">
                                    
                                    <div class="div-col-25per " style="cursor:pointer" data-Kpi="50019">
                                        <a >
                                        <div class="isc-scr-sec-grp-container-s1" >
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">New Order </h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" id="un-Submitted-Count">0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="un-Submitted-Amount" class="isc-kpi-clr1">0 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4><%--Due this week--%></h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn" id="un-Submitted-Week-Count"><i  style="margin-left:5px;"></i></span>
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            </a>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10"  style="cursor:pointer" data-Kpi="50017">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Packing Order <%--<span class="isc-usr-hmethr-kpi-spn">(12)</span>--%></h2>
                                                    </div>
                                                <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#ED5263;" id="rejected-Count"> 0</a>
                                                </div>
                                               
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="rejected-Amount" class="isc-kpi-clr2">$0 </h5>
                                                             <div class="screen-row">
                                                                 <div class="cell-left">     
                                                            <h4><%--New bills--%></h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3" id="rejected-Week-Count"><i <%--class="fa fa-arrow-up"--%> style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10"  style="cursor:pointer" data-Kpi="50016">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Delivery Order<%--<span class="isc-usr-hmethr-kpi-spn">(23)</span>--%></h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#F8AA56;" id="un-Approved-Count">0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="un-Approved-Amount" class="isc-kpi-clr4">0 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4><%--Due this week--%></h4></div>
                                                            <div class="cell-right">
                                                                 <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4" id="un-Approved-Week-Count"><i <%--class="fa fa-arrow-up"--%> style="margin-left:5px;"></i></span>
                                                               
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10"  style="cursor:pointer" data-Kpi="0">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Complete order <%--<span class="isc-usr-hmethr-kpi-spn">(54)</span>--%></h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#14B191;" id="total-Amount-Count"> 0
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="total-Amount" class="isc-kpi-clr5">0 </h5>

                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4><%--Due this week--%></h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1" id="total-Week-Count"><i <%--class="fa fa-arrow-up"--%> style="margin-left:5px;"></i></span>
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
                      
                             <div class="chart-section-inner-sign-banner " style="min-height:335px;">
                                <div class="isc-sec-con-bdy-my-action" style="padding:0px;">
                                   <div class="isc-usr-hme-hdr-sec">
                                       <div class="cell-left">
                                       <h5 class="isc-usr-hme-hdr-sec-h5"> Purchase Order Status</h5></div>
                                       
                                   </div>
                                   
                                     <div class="isc-usr-hme-bdy-sec " style="min-height:300px;max-height:350px;">
                                          <div class="div-col-80per">
                                            <%-- <script type="text/javascript">
                                                Get_LineChartModal1("LineChartModal1");
                                            </script>
                                            <svg id="LineChartModal1" class="ht-350"></svg>--%>
                                               <%-- <script type="text/javascript">
                                                Get_StackedBarChartModal3("StackedBarChartModal3");
                                            </script>--%>
                                            <svg id="StackedBarChartModal3" style="height:330px !important;"  class="ht-250"></svg>
                                         </div>
                                           <div class="div-col-20per pad-lft-12">
                                               <div class="screen-row">
                                               <div class="div-col-100per">
                                                   <div class="isc-apr-innr-cont">
                                                   <div class="screen-row">
                                      
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Packing </h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="un-Sub-Perc">0</span><%--<i class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="un-Sumbitted-Line" title="0%" style="width:0%;"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                   <div class="screen-row mar-top-12">
                                
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Label/Logo </h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Approve-Pending-perc">0</span><%--<i class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" title="0%" id="Approve-pending-Line" style="width:0%;"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                   
                                                   <div class="screen-row mar-top-12">
                                  
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Inspection Approved</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Approved-Perc">0</span><%--<i id="approved-Arrow" class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="Approved-Line" title="0%" style="width:0%;"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                       <div class="screen-row mar-top-12">
                                  
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Vessel Scheduling</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Partially-Perc">0</span><%--<i class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="Partially-Line" title="0%" style="width: 0%;"></div>
                                                       </div>
                                                   </div>
                                                       </div>


                                                       <div class="screen-row mar-top-12">
                                    
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">LC Draft Approved </h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Rejected-Perc">0</span><%--<i class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="Rejected-Line" title="0%" style="width:0%;"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                         <div class="screen-row mar-top-12">
                            
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Certificate</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="paid-Perc">0</span><%--<i class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="paid-line" title="0%" style="width:0%;"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                   
                                                   
                                                   <div class="screen-row mar-top-12">
                                  
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Delivery</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Disp-Perc">0</span><%--<i class="fa fa-arrow-up" style="color:#14B191;"></i>--%></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="Disp-Line" title="0%" style="width: 0%;" ></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                     
                                                   </div>
                                               </div>

                                              

                                          </div>
                                             <%--  <p id="nodata-Chart" style="display:none;padding-top:127px;padding-left:138px;">No Data Found</p>
                                               <script type="text/javascript">
                                                    //Get_PieChartValuesOutside("PieChartValuesOutside");
                                                </script>
                                               <div id="pieChartDive">
                                                <svg id="PieChartValuesOutside" class="" style="height:280px !important;"></svg>
                                                   </div>--%>
                                               <%--<div class="isc-apr-innr-cont">
                                                   <div class="screen-row mar-top-20">
                                      <div class="screen-row">
                                          <h5 class="isc-apr-hom-rgt-txt1" id="unsubmittedCount">0</h5>
                                      </div>
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Unsubmitted Bills</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="un-Sub-Perc">0%</span><i class="fa fa-arrow-up" style="color:#14B191;" id="un-Sub-Arrow"></i></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="un-Sumbitted-Line" style="width:0% !important"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                   <div class="screen-row mar-top-20" >
                                      <div class="screen-row">
                                          <h5 class="isc-apr-hom-rgt-txt1" id="approvedCount">0</h5>
                                      </div>
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Approved Bills</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Approved-Perc">0%</span><i class="fa fa-arrow-up" style="color:#14B191;" id="approved-Arrow"></i></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2"  id="Approved-Line" style="width:0% !important"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                   
                                                   <div class="screen-row mar-top-20">
                                      <div class="screen-row">
                                          <h5 class="isc-apr-hom-rgt-txt1" id="rejectedCount">0</h5>
                                      </div>
                                                   <div class="screen-row">
                                                       <div class="cell-left">
                                                           <h6 class="isc-apr-rgt-txt2">Rejected Bills</h6>
                                                       </div>
                                                       <div class="cell-right">
                                                            <h6 class="isc-apr-rgt-txt2"><span id="Rejected-Perc">0%</span><i class="fa fa-arrow-up" style="color:#14B191;" id="rejected-Arrow"></i></h6>
                                                       </div>
                                                   </div>
                                                   <div class="screen-row">
                                                       <div class="isc-apr-hme-prg-bar1">
                                                              <div class="isc-apr-hme-prg-bar2" id="Rejected-Line"  style="width:0% !important"></div>
                                                       </div>
                                                   </div>
                                                       </div>
                                                   </div>--%>
                                    </div>
                                    </div>
                                  
                        </div>
                    </div>


                
                        
                             
                       
            </div>
                    <div class="screen-row mar-top-10">
                        <div class="div-col-100per">
                             <div class="chart-section-inner-sign-banner ">
                                <div class="isc-sec-con-bdy-my-action" style="padding:0px;">
                                   <div class="isc-usr-hme-hdr-sec">
                                       <div class="cell-left">
                                       <h5 class="isc-usr-hme-hdr-sec-h5"> Bills</h5></div>
                                       <div class="cell-right">
                                         <%--  <i class="fa fa-ellipsis-h"></i>--%>
                                             <a class="isc-theme-blue-btn <%--isc-usr-sub-btn--%>" id="submit"> Submit </a>
                                       </div>
                                   </div>
                                     <div class="isc-usr-hme-bdy-sec isc-usr-hme-bdy-sec1">
                                            <div class="isc-screen-nav-container-s1">
                                        <ul class="nav nav-tabs" style="position:relative;">
                                            <li class="active" style="cursor:pointer"><a  data-toggle="tab" id="un-Submitted-Bills">Unsubmitted Bills <span id="un-Submitted-tab-Count">(0)</span></a> </li>
                                           
                                             <li class="" style="cursor:pointer"><a data-toggle="tab" id="rejected-Bills"> Rejected Bills <span id="rejected-tab-Count">(0)</span></a> </li>
                                             <li class="" style="cursor:pointer"><a data-toggle="tab" id="un-Approved-Bills">Awaiting Approvals <span id="unapproved-tab-Count">(0)</span></a> </li>
                                        </ul>
                                                <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                                <div class="tab-content ">
                                    <div class="tab-pane active" id="Tab1">
                                        <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst mar-top-10" id="tbl-Bills">
                                                <thead>
                                                    <%--<tr>
                                                        <th style="width:2%;">
                                                            <input type="checkbox" />
                                                        </th>
                                                        <th style="width: 12%;" class="header">Vendor
                                                        </th>
                                                       <th style="width: 10%;" class="header">Bill #
                                                        </th>
                                                       <th style="width: 13%;" class="header">
                                                            Bill Category
                                                        
                                                        </th>
                                                        <th style="width: 20%;" class="header">
                                                            Bill Description
                                                        
                                                        </th>
                                                         
                                                        <th style="width: 8%;" class="header">Due Date
                                                        </th>
                                                       
                                                        <th style="width: 5%;text-align:center;" class="header">Amount
                                                        </th>
                                                        <th style="width: 10%;text-align:center;" class="header">Action
                                                        </th>
                                                       
                                                    </tr>--%>
                                                    <tr>
                                                        <th style="width:2%;">
                                                       <h3 class="isc-lbl-floting-cht-s1"><label id="chk-All-Lable"><input id="Check-all" type="checkbox" /></label></h3>
                                                        </th>
                                                         <th style="width: 13%;" class="" sort-column-Type="text" column-Name="VendorName"  data-sort="VendorName" title="Vendor">Vendor
                                                        </th>
                                                       <th style="width: 15%;" class=""  sort-column-Type="text" column-Name="InvoiceNumber"  data-sort="InvoiceNumber" title="Bill#">Bill#
                                                        </th>
                                                        <th style="width: 28%;" class="" sort-column-Type="text" column-Name="Description"  data-sort="Description" title="Bill Description">
                                                            Bill Description
                                                        
                                                        </th>
                                                        <th style="width: 10%;" class="" style="text-align: center;" sort-column-Type="date" column-Name="DueDate"  data-sort="DueDate" title="Due Date">Due Date
                                                        </th>
                                                        <th style="width: 10%;" class="" style="text-align: center;" sort-column-Type="date" column-Name="DueDate"  data-sort="DueDate" title="Next Due Date">Next Due Date
                                                        </th>
                                                        <th style="width: 3%;text-align:center;" class=""  sort-column-Type="number" column-Name="Amount"  data-sort="Amount" title="Amount">Amount
                                                        </th>
                                                        <th style="width: 6%;text-align:center;" class="" title="Action">Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tbl-Bill-Body">
                                                   
                                                </tbody>
                                            </table>
                                        </div>
                                                    <div class="tab-pane " id="Tab2">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10">
                                                <thead>
                                                    <tr>
                                                        
                                                         <th style="width: 15%;" class="header">Vendor
                                                        </th>
                                                       <th style="width: 12%;" class="header">Bill#
                                                        </th>
                                                        <th style="width: 28%;" class="header">
                                                            Bill Description
                                                        
                                                        </th>
                                                        <th style="width: 10%;" class="header">Due Date
                                                        </th>
                                                       
                                                        <th style="width: 5%;text-align:center;" class="header">Amount
                                                        </th>
                                                        <th style="width: 10%;text-align:center;" class="header">Action
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#"> Johnson &amp; Co</a></h5>
                                                        </td>
                                                       <td>
                                                           <h5>	
1500095</h5>
                                                        </td>
                                                        <td><h5 class="">PO-679873
                                                        </h5></td>
                                                        <td>
                                                           <h5 style="color:red !important;">9/3/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                         <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">
                                                      
                                                      
                                                    </td>   
                                                        
                                                    </tr>
                                                  <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#"> Nicholson LLC.</a></h5>
                                                        </td>
                                                       <td><h5 class="">1500270				

                                                            </h5></td>
                                                      <td>
                                                          <h5 class="">invoice for the purchase of PO799


                                                        </h5>
                                                      </td>
                                                        <td>
                                                            <h5>9/13/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                           
                                                           <h5 style="text-align:right;">$900</h5>
                                                       </td>
                                                            
                                                        <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">
                                                      
                                                      
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#"> Baker Sanders Inc.</a></h5>
                                                        </td>
                                                       <td><h5 class="">1500445				

                                                            </h5></td>
                                                        <td>
                                                            <h5 class="">Electric Un Metered Bill

                                                        </h5>
                                                        </td>
                                                        <td>
                                                            <h5>9/14/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          <h5 style="text-align:right;">$1,200</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">
                                                      
                                                      
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#">BSVGP Inc.</a></h5>
                                                        </td>
                                                       <td>
                                                           <h5 class="">1500620				

                                                            </h5>
                                                       </td>
                                                        <td>
                                                            <h5 class="">Electric Metered Bill
                                                        </h5>
                                                        </td>
                                                        <td>
                                                            <h5>9/15/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                           
                                                           <h5 style="text-align:right">$1,500</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">
                                                      
                                                      
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#">Johnson &amp; Co</a></h5>
                                                        </td>
                                                       <td>
                                                           <h5 class="">1500445				

                                                            </h5>
                                                       </td>
                                                        <td>
                                                               <h5 class="">invoice for the purchase of PO799

                                                        </h5>
                                                        </td>
                                                        <td>
                                                            <h5>9/15/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                           
                                                           <h5 style="text-align:right">$3,500</h5>
                                                       </td>
                                                           <td style="text-align:center;">
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <img src="img/appimages/floww.png" class="isc-follow-up-img" title="Follow Up">
                                                      
                                                      
                                                    </td> 
                                                        
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                                    </div>
                                                     <div class="tab-pane " id="Tab3">
                                                         <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10">
                                                <thead>
                                                    <tr>
                                                        
                                                       <th style="width: 15%;" class="header">Vendor
                                                        </th>
                                                       <th style="width: 12%;" class="header">Bill#
                                                        </th>
                                                        <th style="width: 28%;" class="header">
                                                            Bill Description
                                                        
                                                        </th>
                                                        <th style="width: 10%;" class="header">Due Date
                                                        </th>
                                                       
                                                        <th style="width: 5%;text-align:center;" class="header">Amount
                                                        </th>
                                                        <th style="width: 10%;text-align:center;" class="header">Action
                                                        </th>
                                                       
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#"> Johnson &amp; Co</a></h5>
                                                        </td>
                                                       <td>
                                                           <h5>	
1500095</h5>
                                                        </td>
                                                        <td><h5 class="">PO-679873
                                                        </h5></td>
                                                        <td>
                                                           <h5 style="color:red !important;">9/4/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                      
                                                    </td>
                                                        
                                                    </tr>
                                                  <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#"> Nicholson LLC.</a></h5>
                                                        </td>
                                                       <td><h5 class="">1500270				

                                                            </h5></td>
                                                      <td>
                                                          <h5 class="">invoice for the purchase of PO799


                                                        </h5>
                                                      </td>
                                                        <td>
                                                            <h5>9/12/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                           
                                                           <h5 style="text-align:right;">$900</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                      
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#"> Baker Sanders Inc.</a></h5>
                                                        </td>
                                                       <td><h5 class="">1500445				

                                                            </h5></td>
                                                        <td>
                                                            <h5 class="">Electric Un Metered Bill

                                                        </h5>
                                                        </td>
                                                        <td>
                                                            <h5>9/15/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          <h5 style="text-align:right;">$1,200</h5>
                                                       </td>
                                                            
                                                        <td style="text-align:center;">
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                      
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>
                                                            <h5><a href="#">BSVGP Inc.</a></h5>
                                                        </td>
                                                       <td>
                                                           <h5 class="">1500620				

                                                            </h5>
                                                       </td>
                                                        <td>
                                                            <h5 class="">Electric Metered Bill
                                                        </h5>
                                                        </td>
                                                        <td>
                                                            <h5>9/16/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                           
                                                           <h5 style="text-align:right">$1,500</h5>
                                                       </td>
                                                            
                                                        <td style="text-align:center;">
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="View Bill" href="#mp_bill-view" data-toggle="modal"><i class="fa fa-paperclip"></i></a>
                                                        <a class="isc-action-badge-td-s1 pad-lft-5" title="Resubmit" href="#"><i class="fa fa-refresh"></i></a>
                                                      
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
    
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Delete</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color:#8A8A8A;cursor:pointer;" title="Cancel"  delete-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  delete-cancel="true" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4>Are you sure want to delete the bill?</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-delete-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" delete-cancel="true"  id="close-delete" >
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_Submit" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Submit</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color:#8A8A8A;cursor:pointer;" title="Close"  submit-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  delete-cancel="true" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4>Are you sure want to submit the selected bill(s)?</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-submit-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn blue isc-btn-pop-action-s1" submit-cancel="true" style="background-color: #aeaeae !important;"  id="close-submit" >
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
    
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false" style="">
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
    
</asp:Content>

