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
            width: 482px;
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
             background-color: #1589ee;
            width: 100% !important;
            text-align: right;
            height:40px;
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

.auto-height{
height: calc(100vh - 55px);
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
                <div class="isc-filter-container mar-top-10 isc-flt-hgt-mb-res" id="isc-filter-container" >


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
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="Btn_serch">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset">
                            <a><i class="fa fa-times" id="btn_Reset"></i> Reset</a>
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
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-flg " data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Flagged</a>
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
                                                    </div>
                                    </div>
                            </div>
                        <div id="exp-kab-view" style="display:none;">
                            <div class="screen-row mar-top-10">
                            <%--<div class="isc-filter-container" id="isc-filter-container" style="display: none;">



                       
                        <div class="cell-left  ">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>Choose Bills/Invoice #</option>
                                <option>303768		
                                </option>
                                <option>293991		
                                </option>
                                <option>195994		
                                </option>
                                <option>97997		
                                </option>

                            </select>
                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " placeholder=" Date Range">

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>Choose  Status</option>
                                <option>Pending Submission
		
                                </option>
                                <option>Rejected
		
                                </option>
                                <option>Approval Pending
		
                                </option>
                                <option>Approved
		
                                </option>

                            </select></div>
                        
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Search"><i class="fa fa-search"></i></a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset">
                            <a><i class="fa fa-refresh"></i></a>
                        </div>
                        <div class="isc-filter-container-close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>--%>
                    </div>
                        <div class="screen-row mar-top-min">
                                    <div class="isc-app-page-panel-col-s1 isc-sec-pan-bor-s1">
                                        <div class="isc-app-page-panel-inner-container-s1">
                                            <div class="isc-app-page-panel-grp-hdr-s1">
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s1">
                                                            Over Due</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <a class="isc-panel-hdr-sec-act-but-s1 " data-toggle="dropdown" data-close-others="true">
                                                            <i class="fa fa-ellipsis-h dropdown-toggle"></i></a>
                                                        <div class="dropdown-menu-work-s3" role="menu">
                                                            <div class="screen-row">
                                                                <div class="isc-dd-pan-hdr-s1">
                                                                    <h3 class="isc-lbl-dd-hdr-s1">
                                                                        <span><i class="fa fa-plus-circle"></i></span>Add feature</h3>
                                                                </div>
                                                                <div class="isc-dd-pan-bdy-s1">
                                                                    <ul class="isc-dd-ul-nav-list-s1">
                                                                        <li><a>
                                                                            <h2>
                                                                                Rerank by</h2>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Creation date</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Last active at</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Name</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Score</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Status</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Tags</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Type</h3>
                                                                        </a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s2">
                                                            Apr 14,2018</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <h3 class="isc-lbl-panl-hdr-s3">
                                                            showing 1 of 1</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="isc-app-page-panel-grp-bdy-s1">
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s1"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span> Frank Abagnale</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$560</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391988</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Completed </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="isc-app-page-panel-col-s1 isc-sec-pan-bor-s1">
                                        <div class="isc-app-page-panel-inner-container-s1">
                                            <div class="isc-app-page-panel-grp-hdr-s1">
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s1">
                                                            Due Today : 5</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <a class="isc-panel-hdr-sec-act-but-s1 " data-toggle="dropdown" data-close-others="true">
                                                            <i class="fa fa-ellipsis-h dropdown-toggle"></i></a>
                                                        <div class="dropdown-menu-work-s3" role="menu">
                                                            <div class="screen-row">
                                                                <div class="isc-dd-pan-hdr-s1">
                                                                    <h3 class="isc-lbl-dd-hdr-s1">
                                                                        <span><i class="fa fa-plus-circle"></i></span>Add feature</h3>
                                                                </div>
                                                                <div class="isc-dd-pan-bdy-s1">
                                                                    <ul class="isc-dd-ul-nav-list-s1">
                                                                        <li><a>
                                                                            <h2>
                                                                                Rerank by</h2>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Creation date</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Last active at</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Name</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Score</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Status</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Tags</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Type</h3>
                                                                        </a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s2">
                                                            Mar 14,2018</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <h3 class="isc-lbl-panl-hdr-s3">
                                                            showing 2 of 2</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="isc-app-page-panel-grp-bdy-s1">
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span> Frank Abagnale</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$560</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391988</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Pending </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  Reuben Abel</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$160</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391988</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Pending </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                    <div class="isc-app-page-panel-col-s1 isc-sec-pan-bor-s1">
                                        <div class="isc-app-page-panel-inner-container-s1">
                                            <div class="isc-app-page-panel-grp-hdr-s1">
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s1">
                                                            This Week : 3</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <a class="isc-panel-hdr-sec-act-but-s1 " data-toggle="dropdown" data-close-others="true">
                                                            <i class="fa fa-ellipsis-h dropdown-toggle"></i></a>
                                                        <div class="dropdown-menu-work-s3" role="menu">
                                                            <div class="screen-row">
                                                                <div class="isc-dd-pan-hdr-s1">
                                                                    <h3 class="isc-lbl-dd-hdr-s1">
                                                                        <span><i class="fa fa-plus-circle"></i></span>Add feature</h3>
                                                                </div>
                                                                <div class="isc-dd-pan-bdy-s1">
                                                                    <ul class="isc-dd-ul-nav-list-s1">
                                                                        <li><a>
                                                                            <h2>
                                                                                Rerank by</h2>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Creation date</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Last active at</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Name</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Score</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Status</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Tags</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Type</h3>
                                                                        </a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s2">
                                                            Apr 03,2018</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <h3 class="isc-lbl-panl-hdr-s3">
                                                            showing 7 of 7</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="isc-app-page-panel-grp-bdy-s1">
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  Reuben Abel</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$160</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391988</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Pending </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                               <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>   Hal Abelson</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$310</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                               <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="isc-app-page-panel-col-s1 isc-sec-pan-bor-s1">
                                        <div class="isc-app-page-panel-inner-container-s1">
                                            <div class="isc-app-page-panel-grp-hdr-s1">
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s1">
                                                            Next Week : 3</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <a class="isc-panel-hdr-sec-act-but-s1 " data-toggle="dropdown" data-close-others="true">
                                                            <i class="fa fa-ellipsis-h dropdown-toggle"></i></a>
                                                        <div class="dropdown-menu-work-s3" role="menu">
                                                            <div class="screen-row">
                                                                <div class="isc-dd-pan-hdr-s1">
                                                                    <h3 class="isc-lbl-dd-hdr-s1">
                                                                        <span><i class="fa fa-plus-circle"></i></span>Add feature</h3>
                                                                </div>
                                                                <div class="isc-dd-pan-bdy-s1">
                                                                    <ul class="isc-dd-ul-nav-list-s1">
                                                                        <li><a>
                                                                            <h2>
                                                                                Rerank by</h2>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Creation date</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Last active at</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Name</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Score</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Status</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Tags</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Type</h3>
                                                                        </a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s2">
                                                            Mar 21,2018</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <h3 class="isc-lbl-panl-hdr-s3">
                                                            showing 3 of 3</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="isc-app-page-panel-grp-bdy-s1">
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s3"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s3"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s3"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="isc-app-page-panel-col-s1 isc-sec-pan-bor-s1">
                                        <div class="isc-app-page-panel-inner-container-s1">
                                            <div class="isc-app-page-panel-grp-hdr-s1">
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s1">
                                                            Next 30 Days : 2</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <a class="isc-panel-hdr-sec-act-but-s1 " data-toggle="dropdown" data-close-others="true">
                                                            <i class="fa fa-ellipsis-h dropdown-toggle"></i></a>
                                                        <div class="dropdown-menu-work-s3" role="menu">
                                                            <div class="screen-row">
                                                                <div class="isc-dd-pan-hdr-s1">
                                                                    <h3 class="isc-lbl-dd-hdr-s1">
                                                                        <span><i class="fa fa-plus-circle"></i></span>Add feature</h3>
                                                                </div>
                                                                <div class="isc-dd-pan-bdy-s1">
                                                                    <ul class="isc-dd-ul-nav-list-s1">
                                                                        <li><a>
                                                                            <h2>
                                                                                Rerank by</h2>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Creation date</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Last active at</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Name</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Score</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Status</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Tags</h3>
                                                                        </a></li>
                                                                        <li><a>
                                                                            <h3>
                                                                                Type</h3>
                                                                        </a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="screen-row">
                                                    <div class="cell-left">
                                                        <h3 class="isc-lbl-panl-hdr-s2">
                                                            Mar 30,2018</h3>
                                                    </div>
                                                    <div class="cell-right">
                                                        <h3 class="isc-lbl-panl-hdr-s3">
                                                            showing 5 of 5</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="isc-app-page-panel-grp-bdy-s1">
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                               <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                                <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                              <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                <div class="screen-row">
                                                    <a class="" href="#">
                                                        </a><div class="isc-app-page-panel-tile-s1 isc-pnl-bor-lft-s2"><a class="" href="#">
                                                            </a><div class="screen-row"><a class="" href="#">
                                                               <div class="screen-row">
                                                                    <div class="cell-left">
                                                                        <h3 class="isc-lbl-tile-hdr-s1">
                                                                            <span><i class="fa fa-user"></i></span>  James Abourezk</h3>
                                                                    </div>
                                                                    <div class="cell-right">
                                                                        <h3 class="isc-lbl-tile-hdr-s2">
                                                                            <span>$230</h3>
                                                                    </div>
                                                                </div>
                                                                <h3 class="isc-lbl-tile-hdr-s3">
                                                                    	391928</h3>
                                                                </a><div class="screen-row"><a class="" href="#">
                                                                    <div class="div-col-60per">
                                                                        <h3 class="isc-lbl-tile-hdr-s4">
                                                                            	
7/12/2020</h3>
                                                                    </div>
                                                                    </a><div class="div-col-40per" style="text-align:right;"><a class="" href="#">
                                                                        </a><a class="isc-lbl-tile-hdr-work-act-but-s1" href="#">Complete </a>
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
                            <a><i class="fa fa-times-circle" style="color:#8A8A8A;" title="Cancel"  delete-cancel="true" aria-hidden="true"></i></a>
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
                            <a><i class="fa fa-times-circle" style="color:#8A8A8A;" title="Close"  submit-cancel="true" aria-hidden="true"></i></a>
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
                        <button type="button" class="btn blue isc-btn-pop-action-s1" submit-cancel="true" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;"  id="close-submit" >
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
   <div class="slider">

        <div class="split-amount">
            <div style="width: 522px;">

                <div class="close-slider">
                    <div class="cls">
                        <h3> Split Amount</h3>
                    <i class="fa fa-times-circle close-amount" title="Close"></i>
                        </div>
                    </div>

         <div class="auto-height">
        <div class="isc-bill-trk-lst-cont  isc-cus-var isc-lst-scrl-cont " style="padding-top:0px !important;">
                                                        
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
                         <h3> Settings </h3>
                    <i class="fa fa-close close-settings"></i>
                         </div>
                    </div>

                <div class="isc-cus-var1" style="padding-left: 10px;   padding-right: 10px;">
        <div class="auto-height">
            <div class="isc-bill-trk-lst-cont   isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_21" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_21" style="height: auto;">
                                                            <label>
                                                                <div class="checker"><span><input type="checkbox"></span></div>
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
                                                                    <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i> Payment to be done based on payment terms..<span class="isc-crt-bill-ownr" style="color: green !important;"> Frank Abagnale ,</span><span class="isc-crt-bill-ownr">Sun Feb 28 ,4.54 am</span></p>
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
    <div class="modal fade isc-popup-detail-form-s1 in  isc-new-pop-up" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false" style="display:;">
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
<script src="iscjsengine/PageScript/Bills.js"></script>
</asp:Content>

