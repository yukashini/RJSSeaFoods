<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Bills.aspx.cs" Inherits="BillManagement.Bills" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
       
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
            top: -14px;
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
        .isc-tbl-icon-img
{
width:15px;
margin-top:-2px;
}
       .isc-wrk-flw-sta-upload{
            color:#1589ee;
        }

               .isc-td-inline-status-ch-s1 a:hover, a:focus {
   
   
    color:#8A8A8A;

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

.isc-h-53
{
height:53px;
}
.fa-remove::before, .fa-close::before, .fa-times::before {
content: "";
}

::placeholder {
color:#000 !important;
}
.isc-h-53
{
height:53px !important;
}
.isc-groupby-container {
padding: 10px;
border: 1px solid #ecf0f1;
width: 100%;
/ margin: 5px; /
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
.split-amount{
position: fixed;
top: 40px;
right: 0;
background-color: #fff;
z-index: 9999999;
display: none;
box-shadow: 1px 4px 4px 0px #00000040;
background-color: #fff !important;

}
.settings{
position: fixed;
top: 40px;
right: 0;
background-color: #fff;
z-index: 9999999;
display: none;
box-shadow: 1px 4px 4px 0px #00000040;
background-color: #fff !important;
}



.split-amount.split-amount-show{
display: block;
}
.settings.settings-show{
display: block;
}

.isc-bill-trk-lst-cont.isc-cus-var{
border: none !important;
padding-top: 30px;
}
.isc-cus-var1{
padding-top: 30px;
}

.isc-dec-table{
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

.close-amount{
padding-right: 16px !important;
padding: 9px;
color: #fff;
}

i.close-amount{
cursor: pointer;
}
.close-settings{
padding-right: 16px !important;
padding: 9px;
color: #fff;
}

i.close-settings{
cursor: pointer;
}
.cls{
background-color: aqua !IMPORTANT;
width: 100% !important;
text-align: right;
background-image: linear-gradient(to right, #2e85bb 10%, #00a1b7) !important;
}
.cls h3{
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
.auto-height{
height: calc(100vh - 55px);
}
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="screen-row">
            <div class="div-col-38per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">Bills</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
          <%--<div class="div-col-20per align-right mar-top-10">
                <div class="isc-view-toggle-btn" style="display:none;">
                    <span>Layout</span>
                    <a class="isc-theme-blue-btn " id="isc-layout-s1"><i class="fa fa-bar-chart-o "></i></a>
                    <a class="isc-theme-blue-btn  isc-non-hightlight" id="isc-layout-s2"><i class="fa fa-table "></i></a>
                </div>
            </div>--%>
            <div class="div-col-42per">
                <div class="cell-right">
                 <div class="align-right  pad-rig-5 "  style="margin-top:3px;">
                   
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls " id="filter-toggle-btn" title="Filter" style="margin-top:10px;"><i class="fa fa-filter"></i></a>
                </div>
                </div>
                 <div class="cell-right pad-rig-5 " style="margin-top:10px;"> 

                    <a class="isc-theme-blue-btn" href="CreateNewBill.aspx" id="upload-Bill"> Upload Bills</a>

                </div>
              
               
          </div>
            </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                <div class="isc-filter-container mar-top-10 isc-flt-hgt-mb-res" id="isc-filter-container" style="display: block;">


                    <div class="screen-row">
                        <div class="div-col-80per">
                        <div class="cell-left ">
                            <select class="form-control select2 select2-hidden-accessible" id="slt-Vendor" tabindex="-1" aria-hidden="true">
                                <option value="0">Choose Vendor</option>
                              


                            </select>
                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible" id="slt-Invoice" tabindex="-1" aria-hidden="true">
                                <option>Choose Bill/Invoice #</option>
                              

                            </select>
                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control iscdatpkrwdt iscdatepicker isc-mb-res-txt-box" id="txt-DueRange" placeholder="Choose Due Date Range"/>

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible" id="slt-Status" tabindex="-1" aria-hidden="true">
                                <option>Choose Status</option>
                               
                            </select>

                        </div>
                            </div>
                        <div class="div-col-20per">
<div class="cell-left">
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a id="Btn_serch" title="Search"><i class="fa fa-search" ></i> Serach</a>
                        </div>
                            <div class="isc-filter-search isc-reset" id="btn_Reset" title="Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
    </div>
                        <div class="isc-filter-container-close" id="isc-filter-container-close">
                            <a><i class="fa fa-times" title="Close"></i></a>
                        </div>
                            </div>
                        </div>
                    </div>
            </div>
                    <div class="screen-row isc-mbl-mar-top-10">
                        <div class="screen-row">
                                    
                                    <div class="div-col-25per " style="cursor:pointer" data-Kpi="50019">
                                        <div class="isc-scr-sec-grp-container-s1 <%--kpi-active--%>">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Unsubmitted Bills  </h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" id="un-Submitted-Count">0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="un-Submitted-Amount" class="isc-kpi-clr1">$0 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn" id="un-Submitted-Week-Count">0<i class="fa fa-arrow-up" style="margin-left:5px;" id="un-Submitted-Arrow"></i></span>
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor:pointer" data-Kpi="50017">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Rejected Bills <%--<span class="isc-usr-hmethr-kpi-spn">(12)</span>--%></h2>
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
                                                            <h4>New bills</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3" id="rejected-Week-Count">0<i class="fa fa-arrow-up" id="rejected-Arrow" style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10" style="cursor:pointer" data-Kpi="50016">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Awaiting Approvals <%--<span class="isc-usr-hmethr-kpi-spn">(23)</span>--%></h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#F8AA56;" id="un-Approved-Count">0</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="un-Approved-Amount" class="isc-kpi-clr4">$0 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                 <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4" id="un-Approved-Week-Count" style="color:#F8AA56 !important;" >0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                               
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
                                                <h2 class="isc-scr-sec-hdr-s1">Total Bills <%--<span class="isc-usr-hmethr-kpi-spn">(54)</span>--%></h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#13a840 !important;" id="total-Amount-Count"> 0
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5 id="total-Amount" class="isc-kpi-clr5">$0</h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1" style="color:#13a840 !important;" id="total-Week-Count">0<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                        <div id="exp-lst-view">
                            
                        <div class="isc-screen-nav-container-s1 mar-top-med mar-top-10 isc-bill-mb-re-30">
                                        <ul class="nav nav-tabs isc-tab-brd-cont" style="position:relative;" id="bill-Tabs">
                                            
                                            <li class="active" style="cursor:pointer" id="unPaid-Tab"><a  data-toggle="tab">Unpaid Bills <span id="up-Paid-Count">(0)</span></a> </li>
                                             <li class="" style="cursor:pointer" id="paid-Tab"><a  data-toggle="tab">Paid Bills <span id="paid-Count">(0)</span></a> </li>
                                              <li class="" style="cursor:pointer" id="recurring-Tab"><a data-toggle="tab">Recurring Bills  <span id="recurring-Count">(0)</span></a> </li>
                                              <li class="" style="cursor:pointer" id="Allbill-Tab"><a data-toggle="tab">All Bills  <span id="Allbill-Count">(0)</span></a> </li>
                                           <%-- <li class=""><a href="#Tab4" data-toggle="tab">Vendor Credits (4)</a> </li>--%>
                                        </ul>
                                               <a class="isc-theme-blue-btn isc-usr-sub-btn" id="submit"> Submit</a>
                                                <div class="tab-content">
                                    <div class="tab-pane active" id="Tab1">
                                        <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst" id="tbl-Bills">
                                                <thead>
                                                    <tr>
                                                        <th style="width:4%;">
                                                            <label id="chk-All-Lable"><input id="Check-all" type="checkbox" />  </label>
                                                        </th>
                                                        <th style="width: 12%;" class="" title="Vendor">Vendor
                                                        </th>
                                                       <th style="width: 13%;" class="" title="Bill#">Bill#
                                                        </th>
                                                     
                                                        <th style="width: 13%;" class="" title="Bill Description">
                                                            Bill Description
                                                        
                                                        </th>
                                                         
                                                        <th style="width: 14%;" class="" title="Bill Status"> Bill Status
                                                        </th>
                                                         <th style="width: 14%;" class="" title="Payment Mode"> Payment Mode
                                                        </th>
                                                       
                                                     <%--   <th style="width: 7%;"  class="">Stage
                                                        </th>--%>
                                                          <th style="width: 9%;" class="" title="Due Date">Due Date
                                                        </th>
                                                         <th style="width:9%;" class="" title="Next Due Date">Next Due Date
                                                        </th>
                                                         <th style="width: 10%;" class=""  title="Amount Due">Amount Due
                                                        </th>
                                                        <th style="width: 8%;text-align:center;" class="" title="Action">Action
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
                                            <tbody id="tbl-Bills-Bdy"></tbody>
                                                
                                            </table>
                                        </div>
                                                    <div class="tab-pane " id="Tab2">
                                                        <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                <thead>
                                                    <tr>
                                                        <th style="width:2%;">
                                                            <input type="checkbox" />
                                                        </th>
                                                        <th style="width: 15%;" class="header">Vendor
                                                        </th>
                                                       <th style="width: 13%;" class="header">Bill#
                                                        </th>
                                                     
                                                        <th style="width: 21%;" class="header">
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
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500095</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
Electric Metered Bill</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 style="color:red !important;">9/3/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                         
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                       
                                                    </td>
                                                        
                                                    </tr>
                                                 <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5> Nicholson LLC.</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500096</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
Electric Un Metered Bill</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 >9/11/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                       
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                      
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5>BSVGP Inc.</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500098</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
PO-679873</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 >9/18/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                      
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                       
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500099</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
Invoice for the purchase of PO799</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 >9/21/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                       
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                        
                                                    </td>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                                    </div>
                                                     <div class="tab-pane " id="Tab3">
                                                         <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst">
                                                <thead>
                                                    <tr>
                                                        <th style="width:2%;">
                                                            <input type="checkbox" />
                                                        </th>
                                                        <th style="width: 15%;" class="header">Vendor
                                                        </th>
                                                       <th style="width: 13%;" class="header">Bill#
                                                        </th>
                                                     
                                                        <th style="width: 21%;" class="header">
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
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5>Johnson &amp; Co</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500095</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
Electric Metered Bill</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 style="color:red !important;">9/3/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                         
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                       
                                                    </td>
                                                        
                                                    </tr>
                                                 <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5>Nicholson LLC.</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500096</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
Electric Un Metered Bill</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-aprove " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Payment Completed</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 >9/11/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                       
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                      
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5>BSVGP Inc.</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500098</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
PO-679873</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-re-req " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Rejected</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Pending Submission</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-open-req">Approval Pending</a></li>
                                                                     <li><a href="#" class="" style="color:green;">Approved</a></li>
                                                                     <li><a href="#" class="isc-wrk-flw-sta-re-req">Rejected </a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-aprove">Payment Completed</a></li>
                                                                    <li><a href="#" class="" style="color:red;">Payment Failed</a></li>
                                                                    <li><a href="#" class="isc-wrk-flw-sta-re-req">Disputed</a></li>
                                                                    <li><a href="#" class="" style="color:#F8AA56;">Flagged</a></li>
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 >9/18/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
                                                       </td>
                                                            <td style="text-align:center;">
                                                      
                                                         <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                       
                                                    </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5> Johnson &amp; Co</h5>
             