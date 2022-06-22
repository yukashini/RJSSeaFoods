<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="CreateNewBill.aspx.cs" Inherits="BillManagement.CreateNewBill" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>--%>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="/resources/demos/style.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <style>
        .isc-theme-blue-btn:focus
        {
            background-color:#2e85bb !important;
            color:white !important
        }
        .cls-zindex {
            z-index: 9999999999 !important;
        }
        .isc-split-width
        {
            width:522px;
        }
        div#ui-datepicker-div {
            z-index: 99999999999999 !important;
        }

        .isc-dd-bg .select2-container {
            width: 100% !important;
        }

        .mar-lft {
            margin-left: 11px !important;
        }

        .isc-dd-bg .select2-container {
            z-index: 9999 !important;
        }

        .ui-autocomplete {
            background: white !important;
            z-index: 9999999999 !important;
        }

        .split-amount {
            position: fixed;
            top: 40px;
            right: 0;
            background-color: #fff;
            z-index: 99999;
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
            padding-top: 10px;
        }

        .isc-cus-var1 {
            padding-top: 10px;
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

        /*.auto-height {
            height: calc(100vh - 82px);
        }*/
        .isc-crt-bill-not-cont{
            min-height:unset;
            max-height:unset;
        }

            .auto-height::-webkit-scrollbar {
                width: 6px;
            }

        .isc-vnd-mhd .select2-container {
            width: 100% !important;
        }

        .isc-theme-blue-btn {
            margin-left: 3px;
        }
        .isc-new-pop-up{
            z-index:99999 !important;
        }
            .isc-new-pop-up .modal-body {
                height: calc(100vh - 110px );
            }
            /*.collapsed{
                color:#5d5d5d !important;
            }*/
            .iscdatpkrwdt, iscdatepicker{
                width:100% !important;
            }
            .isc-screen-nav-container-s1 ul{
               min-height: 35px;
            }
            .isc-table-read-optimal th{
                font-size:14px;
            }
            .isc-new-pop-up .select2-container{
                z-index:9999 !important;
            }
          
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-50per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-plus"></i>
                        <h2 style="line-height: 30px;" id="pageTitle">Upload Bill</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <%--<div class="div-col-20per align-right mar-top-10">
                <div class="isc-view-toggle-btn" style="display: none;">
                    <span>Layout</span>
                    <a class="isc-theme-blue-btn " id="isc-layout-s1"><i class="fa fa-bar-chart-o "></i></a>
                    <a class="isc-theme-blue-btn  isc-non-hightlight" id="isc-layout-s2"><i class="fa fa-table "></i></a>
                </div>
            </div>--%>
            <div class="div-col-50per">
                <div class="cell-right " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn" id="cancel-Bill" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;">Cancel</a>

                </div>


                <%--  <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="#">Generate Bill</a>
                </div>--%>
                <div class="cell-right" style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="PaymentDetail.aspx" bill-buttons="true" style="display: none">Submit and Pay</a>
                </div>
                <div class="cell-right" style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" insert-bill="2" bill-buttons="true">Submit</a>
                </div>
                <div class="cell-right" style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn isc-btn-pop-action-s1" insert-bill="1" bill-buttons="true">Save</a>
                </div>

                <div class="cell-right" style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" update-bill="2" style="display: none" bill-buttons="true">Update & Submit</a>
                </div>
                <div class="cell-right" style="margin-top: 6px; margin-left: 0px !important;" id="update-Button">

                    <a class="isc-theme-blue-btn" update-bill="1" style="display: none" bill-buttons="true">Update</a>
                </div>
                <div class="cell-right" style="margin-top: 6px; display:none" title="Settings" >
                    <a class="isc-theme-blue-btn isc-panel-settings"><i class="fa fa-cog"></i></a>
                </div>
                <div class="cell-right" style="margin-top: 6px;" title="Split">
                    <a class="isc-theme-blue-btn isc-split" id="btn-Split" style="display:none;">Split</a>
                </div>
                <%-- <div class="cell-right" style="margin-top: 6px;margin-right: -3px;">

                    <a class="isc-theme-blue-btn" id="open-Vendor" bill-Buttons="true">Choose Vendor</a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div id="exp-lst-view" style="display: none">
                            <div class="screen-row">
                                <div class="div-col-60per">
                                    <div class="isc-up-bill-lft-cont">



                                        <div class="screen-row mar-top-10">
                                            <div class="div-col-15per">
                                                <div class="isc-file-upload-in-con" style="padding: 5px 10px; height: 100px;">

                                                    <h5 class="isc-up-bill-lbl">Drag your logo</h5>
                                                    <div class="screen-row mar-top-15">
                                                        <span class="isc-btn-inp-typ-file-s1">Browse

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                        </span>


                                                    </div>
                                                </div>
                                            </div>

                                            <div class="div-col-85per">
                                                <div class="isc-up-bill-vnd-det">

                                                    <div class="div-col-100per">
                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1  isc-up-brd-rmv isc-sel-hgt">
                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                <option>Choose Vendor</option>
                                                                <option>Standard Bill		
                                                                </option>
                                                                <option>Frank Abagnale		
                                                                </option>
                                                                <option>Edward Abbey		
                                                                </option>
                                                                <option>Reuben Abel		
                                                                </option>

                                                            </select>
                                                        </div>
                                                        <input type="text" class="form-control isc-up-bill-inv-amt isc-crt-new-txt-size" value="8177212645">
                                                        <input type="text" class="form-control isc-up-bill-inv-amt isc-crt-new-txt-size" value="2108 Wllder Loop NE Rio Rancho,">
                                                        <input type="text" class="form-control isc-up-bill-inv-amt isc-crt-new-txt-size" value="New Mexico">
                                                        <input type="text" class="form-control isc-up-bill-inv-amt isc-crt-new-txt-size" value="87144 ">
                                                        <input type="text" class="form-control isc-up-bill-inv-amt isc-crt-new-txt-size" value="United States ">
                                                        <%--    <h5><span>8177212645</span>2108 Wllder Loop NE Rio Rancho,<span> New Mexico</span><span>87144</span><span>United States</span></h5>--%>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="screen-row mar-top-10">
                                            <div class="div-col-25per">
                                                <label class="isc-up-bill-lbl">Bill Date</label>

                                                <input type="text" class="form-control isc-up-bill-inv-data" value="9/21/2020">
                                            </div>
                                            <div class="div-col-25per">
                                                <lable class="isc-up-bill-lbl">Bill Number</lable>
                                                <input type="text" class="form-control isc-up-bill-inv-data" value="15079">
                                            </div>
                                            <div class="div-col-50per" style="text-align: right;">
                                                <lable class="isc-up-bill-lbl">Amonut Due ($)</lable>
                                                <input type="text" class="form-control isc-up-bill-inv-amt" value="$60">
                                            </div>
                                        </div>
                                        <div class="screen-row mar-top-10 mar-bot-med">
                                            <div class="div-col-25per">
                                                <label class="isc-up-bill-lbl">Due Date</label>
                                                <input type="text" class="form-control isc-up-bill-inv-data" value="9/15/2020">
                                            </div>
                                            <div class="div-col-25per">
                                                <lable class="isc-up-bill-lbl">Reference PO Number</lable>
                                                <input type="text" class="form-control isc-up-bill-inv-data" value="15079">
                                            </div>

                                        </div>
                                        <div class="screen-row">
                                            <div class="isc-up-bill-hdt-bar mar-bot-med"></div>
                                            <div class="isc-bill-lst-scr">
                                                <table class="isc-table-read-optimal ">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 40%;">Description</th>
                                                            <th style="width: 20%; text-align: right;">Rate</th>
                                                            <th style="width: 26%; text-align: center;">Qty</th>
                                                            <th style="width: 11%; text-align: right;">Total</th>
                                                            <th style="width: 3%;"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Writing Services</td>
                                                            <td style="text-align: right;">$1500.00</td>
                                                            <td style="text-align: center;">2</td>
                                                            <td style="text-align: right;">$3000.00</td>
                                                            <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                        </tr>


                                                        <tr>
                                                            <td>
                                                                <input type="text" placeholder="Enter Vendor" class="form-control isc-up-bill-vnd" /></td>
                                                            <td>
                                                                <input type="text" placeholder="Enter Amont" class="form-control isc-up-bill-vnd-amt" /></td>
                                                            <td>
                                                                <input type="text" placeholder="Enter Qty" class="form-control isc-up-bill-vnd" style="text-align: center;" /></td>
                                                            <td>
                                                                <input type="text" placeholder="Total Amount" class="form-control isc-up-bill-vnd-amt" /></td>


                                                        </tr>
                                                        <tr>
                                                            <td colspan="5">
                                                                <div class="isc-up-bill-add">
                                                                    <i class="fa fa-plus" style="margin-right: 10px;"></i>Add a line
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="screen-row mar-top-20">
                                            <div class="isc-up-bill-ttl">
                                                <div class="div-col-80per">
                                                    <label>Total</label>
                                                </div>
                                                <div class="div-col-10per">
                                                    <p></p>
                                                </div>
                                                <div class="div-col-10per">
                                                    <h4 class="isc-up-bill-inv-data">$6,000.00</h4>
                                                </div>
                                            </div>
                                        </div>



                                        <div class="isc-screen-nav-container-s1 mar-top-10">
                                            <%-- <ul class="nav nav-tabs" style="position: relative;">
                                            <li class="active"><a href="#Tab1" data-toggle="tab">Split This Amount</a> </li>
                                            <li class=""><a href="#Tab2" data-toggle="tab">Documents</a> </li>

                                        </ul>--%>
                                            <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                            <%--<div class="tab-content">
                                            <div class="tab-pane fade in active" id="Tab1">
                                                <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                                    <thead>
                                                        <tr>

                                                            <th style="width: 30%; background-color: #e1e2e3;" class="header">Account
                                                            </th>
                                                            <th style="width: 30%; background-color: #e1e2e3;" class="header">Description
                                                            </th>
                                                            <th style="width: 20%; background-color: #e1e2e3;" class="header">
                                                                <center>Amount</center>
                                                            </th>
                                                            <th style="width: 20%; background-color: #e1e2e3;" class="header">Action
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <h5>Bank Service Charges</h5>
                                                            </td>
                                                            <td>
                                                                <h5>A1 Rental</h5>
                                                            </td>
                                                            <td class="isc-bill-amt-pad">
                                                                <h5 style="text-align: right;">$750</h5>
                                                            </td>
                                                            <td>
                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="screen-row isc-dd-add-action-s1 shd-off-s1  isc-bill-trk-sel-box isc-up-bill-dd-siz">
                                                                    <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="SelectBuildProject">
                                                                        <option>Bank Service Charges </option>
                                                                        <option>Meals and Entertainment</option>
                                                                        <option>Office Supplies </option>
                                                                        <option>Payroll Expenses</option>
                                                                        <option>Travel Expense</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="Enter Description">
                                                            </td>
                                                            <td class="isc-bill-amt-pad">
                                                                <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="$750" style="text-align: right;">
                                                            </td>
                                                            <td>
                                                                <i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst"></i>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade in " id="Tab2">
                                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 35%;" class="header">File Name</th>
                                                            <th style="width: 20%;" class="header">Uploaded On</th>
                                                            <th style="width: 20%;" class="header">Uploaded By</th>
                                                            <th style="width: 15%;" class="header">Size</th>
                                                            <th style="width: 10%;" class="header text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            <td>
                                                                <h5>
                                                                    <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;" />

                                                                    <span>Details1.pdf</span>
                                                                </h5>
                                                            </td>
                                                            <td>
                                                                <h5 class="">02/04/2020 04.33 PM</h5>
                                                            </td>
                                                            <td>
                                                                <h5>Ravi Shanker</h5>
                                                            </td>
                                                            <td>
                                                                <h5>250KB</h5>
                                                            </td>
                                                            <td>
                                                                <div class="screen-row isc-inline-pop-action-s1">
                                                                    <a class="isc-action-badge-td-s1" href="#"><i class="fa fa-edit"></i></a>
                                                                    <a class="isc-action-badge-td-s1"><i class="fa fa-trash-o"></i></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>

                                                            <td>
                                                                <h5>
                                                                    <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;" />
                                                                    <span>Details2.pdf</span>
                                                                </h5>
                                                            </td>
                                                            <td>
                                                                <h5 class="">03/04/2020 04.43 PM</h5>
                                                            </td>
                                                            <td>
                                                                <h5>Ravi Shanker</h5>
                                                            </td>
                                                            <td>
                                                                <h5>170KB</h5>
                                                            </td>
                                                            <td>
                                                                <div class="screen-row isc-inline-pop-action-s1">
                                                                    <a class="isc-action-badge-td-s1" href="#"><i class="fa fa-edit"></i></a>
                                                                    <a class="isc-action-badge-td-s1"><i class="fa fa-trash-o"></i></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>--%>
                                        </div>
                                    </div>
                                </div>
                                <div class="div-col-40per">
                                    <div class="isc-up-bill-rgt-cont">
                                        <div class="isc-screen-nav-container-s1 mar-top-10">
                                            <ul class="nav nav-tabs" style="position: relative;">
                                                <li class="active"><a href="#Tab1" data-toggle="tab">Bill</a> </li>
                                                <li class=""><a href="#Tab12" data-toggle="tab">Split Amount</a> </li>
                                                <li class=""><a href="#Tab2" data-toggle="tab">Settings</a> </li>
                                                <li class=""><a href="#Tab4" data-toggle="tab">History</a> </li>
                                            </ul>
                                            <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                            <div class="tab-content">
                                                <div class="tab-pane fade in active" id="Tab1">
                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_11" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Details   </h5>
                                                        <div class="screen-row mar-top-10 collapse in" id="coll_11" style="height: auto;">
                                                            <div class="screen-row mar-top-10">
                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Vendor Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                                <option>Choose Vendor Name</option>
                                                                                <option>Janitorial Service </option>
                                                                                <option>Logmein </option>
                                                                                <option>Hal Abelson </option>
                                                                                <option>James Abourezk</option>
                                                                            </select>
                                                                            <%--  <span class="isc-mand">This field should not be empty</span>--%>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Bill# <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" class="form-control" placeholder="Enter Bill#" />
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Bill Description : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <textarea class="form-control" placeholder="Enter Description"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Bill Amount <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" class="form-control" placeholder="Enter Bill Amount" />
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Payment Terms<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                                <option>Choose Payment Terms</option>
                                                                                <option>Net 5</option>
                                                                                <option>Net 10 </option>
                                                                                <option>Net 15</option>
                                                                                <option>Net 20 </option>
                                                                                <option>Net 30 </option>
                                                                                <option>Net 45 </option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Invoice Date<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" class="form-control" placeholder="Enter Invoice Date" />
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Due Date<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" class="form-control" placeholder="Enter Due Date" />
                                                                    </div>
                                                                </div>
                                                                <table class="isc-table-read-optimal mar-top-15">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 22%;">Description</th>
                                                                            <th style="width: 20%; text-align: right;">Rate</th>
                                                                            <th style="width: 12%; text-align: center;">Qty</th>
                                                                            <th style="width: 22%; text-align: right;">Total</th>
                                                                            <th style="width: 14%;"></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Writing Services</td>
                                                                            <td style="text-align: right;">$1500.00</td>
                                                                            <td style="text-align: center;">2</td>
                                                                            <td style="text-align: right;">$3000.00</td>

                                                                            <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                                        </tr>


                                                                        <tr>
                                                                            <td>
                                                                                <input type="text" placeholder=" Vendor" class="form-control isc-up-bill-vnd" /></td>
                                                                            <td>
                                                                                <input type="text" placeholder=" Amont" class="form-control isc-up-bill-vnd-amt" /></td>
                                                                            <td>
                                                                                <input type="text" placeholder=" Qty" class="form-control isc-up-bill-vnd" style="text-align: center;" /></td>
                                                                            <td>
                                                                                <input type="text" placeholder="Total Amount" class="form-control isc-up-bill-vnd-amt" /></td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" href="#"><i class="fa fa-plus"></i></a>
                                                                            </td>

                                                                        </tr>
                                                                        <%--<tr>
                                                        <td colspan="5">
                                                            <div class="isc-up-bill-add">
                                                                <i class="fa fa-plus" style="margin-right: 10px;"></i>Add a line
                                                            </div>
                                                        </td>
                                                    </tr>--%>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="tab-pane fade in " id="Tab2">
                                                    <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont--%> mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_21" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_21" style="height: auto;">
                                                            <label>
                                                                <input type="checkbox" />
                                                                Auto Approval</label>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="screen-row" >
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
                                                                            </select>
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
                                                                            </select>
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
                                                                            </select>
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
                                                                            <select class="isc-select-dropdown slt-Tags " multiple="multiple" tabindex="-1"
                                                                                aria-hidden="true" id="">
                                                                            </select>
                                                                        </div>

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
                                                                    <%--  <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i> Payment to be done based on payment terms..<span class="isc-crt-bill-ownr" style="color: green !important;"> Frank Abagnale ,</span><span class="isc-crt-bill-ownr">Sun Feb 28 ,4.54 am</span></p>--%>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="tab-pane fade in " id="Tab12">

                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_12" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount   </h5>
                                                        <div class="screen-row mar-top-10 collapse in" id="coll_12" style="height: auto;">
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Account : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                            <option>Choose Account</option>
                                                                            <option>762000 - Ent./Travel-Meal </option>
                                                                            <option>764000 - Ent./Travel-Travel & Auto </option>
                                                                            <option>802000 - Office-General </option>
                                                                            <option>999999 - Unalocated Expenses</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Description : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" placeholder="Enter Description">
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Amount : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" placeholder="Enter Amount">
                                                                </div>
                                                                <div class="div-col-15per">
                                                                    <i class="fa fa-plus isc-crt-bill-add"></i>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                                                    <thead>
                                                                        <tr>

                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="header">Account
                                                                            </th>
                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="header headerSortUp">Description
                                                                            </th>
                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="header">
                                                                                <center>Amount</center>
                                                                            </th>
                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="header">Action
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        <tr>
                                                                            <td>
                                                                                <h5>Bank Service Charges</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>A1 Rental</h5>
                                                                            </td>
                                                                            <td class="isc-bill-amt-pad">
                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <h5>Bank Service Charges</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>A1 Rental</h5>
                                                                            </td>
                                                                            <td class="isc-bill-amt-pad">
                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                                                        </tr>
                                                                        <%--<tr>
                                                        <td>
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1  isc-bill-trk-sel-box isc-up-bill-dd-siz">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="SelectBuildProject">
                                                    <option>Bank Service Charges </option>
                                                       <option>Meals and Entertainment</option>
                                                       <option>Office Supplies </option>
                                                       <option>Payroll Expenses</option>
                                                       <option>Travel Expense</option>
                                                </select>     </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="Enter Description">
                                                        </td>
                                                        <td class="isc-bill-amt-pad">
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="$750" style="text-align:right;">
                                                        </td>
                                                        <td>
                                                            <i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst"></i>
                                                        </td>
                                                    </tr>--%>
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
                        <div id="exp-kab-view">
                            <div class="screen-row">
                                <div class="div-col-60per">
                                    <div class="isc-up-bill-lft-cont">

                                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-crt-bill1-lft-cont" id="file_Viewer" style="">


                                            <div class="screen-row isc-crt-bill-view" style="top: 250px; left: 31%">


                                                <div class="div-col-100per " style="text-align: center;">
                                                    <div class="screen-row">


                                                        <div class="isc-file-upload-in-con" id="dragdropfiles" style="padding: 5px 10px; border: none !important;">
                                                            <i class="fa fa-cloud-upload"></i>
                                                            <div class="screen-row">
                                                                <h2>Drag and Drop or<span class="isc-btn-inp-typ-file-s1" style="background-color: #f9f9f9 !important;">Browse

                                    <input type="file" id="browseBill" capture="" name="filename" accept="image/gif, image/jpeg, image/png, application/pdf" style="width: 200px;">
                                                                </span></h2>
                                                                <img src="img/OCRScr.png" class="isc-bill-tck-snr-img" title="OCR Scan">
                                                            </div>

                                                        </div>
                                                        <div class="screen-row">
                                                            <h3 class="isc-lbl-vry-sm-txt-s1" style="text-align: center;">
                                                                <span>Note:</span>
                                                                Upload only PDF, JPG & PNG with Max 10 MB</h3>
                                                        </div>
                                                        <%--<div class="screen-row mar-top-30">
                                <div class="isc-sec-in-con-y-scroll-con-s1 isc-upload-bill-con">
                                                        <div class="isc-sec-in-con-y-scroll-bdy-con-s2" id="file_Viewer">
                                                           <h5 class="isc-sec-in-con-y-scroll-bdy-con-h5" style="padding-left:134px; padding-top:246px;" id="no_bill_Message">No Attachment Found</h5>
                                                           
                                                        </div>
                                                    </div>
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
                                        <div class="isc-screen-nav-container-s1">
                                            <ul class="nav nav-tabs isc-tab-brd-cont" style="position: relative;">

                                                <li class="active"><a href="#Tab13" data-toggle="tab">Bill Details</a> </li>
                                                <li class=""><a href="#Tab14" data-toggle="tab">Settings</a> </li>
                                                

                                            </ul>
                                            <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> submit all</a>--%>
                                            <div class="tab-content">
                                                <div class="tab-pane fade in active" id="Tab13">
                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10" style="border:unset;">
                                                        <%--<h5 class="isc-bill-trk-hdr-txt" href="#coll_31" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Bill Details   </h5>--%>
                                                        <%--<div class="screen-row mar-top-10 collapse in" id="coll_31" style="height: auto;">--%>
                                                        <div class="screen-row mar-top-10">
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Vendor Name<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>  : </label>
                                                                </div>
                                                                <div class="div-col-50per isc-mb-wdt-90">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <%--<select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" data-Select="vendor" id="vendor-Name" aria-hidden="true">
                                                                                <option>Choose Vendor Name</option>
                                                                               
                                                                            </select>--%>
                                                                        <input type="text" class="form-control" isview="true" maxlength="128" id="txt-Vendor-Name" placeholder="Enter Vendor Name" />
                                                                        <span class="validation-message" id="vendor-Name-Validation" style="display: none; color: red" error-active="false" data-validation="vendor">Vendor Name should not be empty</span>
                                                                        <span class="validation-message" id="vendor-Name-NotMatched" style="display: none; color: red" error-active="false" data-validation="vendor">Vendor Name does not match with the bill</span>
                                                                    </div>
                                                                </div>
                                                                <div class="div-col-10per isc-mb-wdt-10">
                                                                    <%--<a class="isc-action-badge-td-s1 pad-lft-5" title="Add New Vendor"></a>--%>
                                                                    <i class="fa fa-plus" id="add-New-Vendor" title="Add New Vendor" style="cursor: pointer; padding-left: 15px; margin-top: 11px; color: #a0a0a0; display: block"></i>
                                                                </div>
                                                            </div>

                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill# <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" isview="true" maxlength="128" id="bill-Number" placeholder="Enter Bill#" data-bill="billId" />
                                                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="billId">Bill# contains invalid characters. Allowable characters are A-Z, a-z, 0-9, /, -.</span>
                                                                    <span class="validation-message" id="billId-Validation" style="display: none; color: red" error-active="false" data-validation="billId">Bill# should not be empty</span>
                                                                    <span class="validation-message" id="billId-Exists" style="display: none; color: red" error-active="false" data-validation="billId">Bill Invoice Number already exist,Try any other Bill</span>
                                                                    <span class="validation-message" id="billId-NotMatched" style="display: none; color: red" error-active="false" data-validation="billId">Bill Number does not match the bill</span>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill Description : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <textarea class="form-control" isview="true" placeholder="Enter Description" id="bill-Description"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Bill Amount <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" isview="true" placeholder="Enter Bill Amount" maxlength="128" data-textbox="billAmount" id="bill-Amount" data-type="currency" />
                                                                    <span class="validation-message" id="billAmount-Validation" style="display: none; color: red" error-active="false" data-validation="billAmount">Amount should not be empty</span>
                                                                    <span class="validation-message" id="billAmount-NotMatched" style="display: none; color: red" error-active="false" data-validation="billAmount">Payable amount does not match the bill</span>
                                                                </div>
                                                                <div class="div-col-15per" id="apply-All" style="display: none;">
                                                                    <label class="mar-top-5 mar-lft-10">
                                                                        <input type="checkbox" isview="true" id="update-Apply-All" />
                                                                        Apply All </label>
                                                                </div>
                                                            </div>

                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Category <sup class="isc-bill-mad-fld"><i class="" style="font-size: 8px !important;"></i></sup>: </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth isc-dd-bg">
                                                                        <select class="isc-select-dropdown select2" tabindex="-1" id="slt-Category" data-select="category">
                                                                            <option value="0;">Choose Category</option>

                                                                        </select>
                                                                        <span class="validation-message" id="Category-Validation" style="display: none; color: red" error-active="false" data-validation="category">Bill Category should not be empty</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Payment Terms<sup class="isc-bill-mad-fld"><i class="" style="font-size: 8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth isc-dd-bg">
                                                                        <select class="isc-select-dropdown select2" isview="true" data-select="paymentTerms" id="payment-Terms" tabindex="-1">
                                                                            <option value="0">Choose Payment Terms</option>

                                                                        </select>
                                                                        <span class="validation-message" id="PaymentTerm-Validation" style="display: none; color: red" error-active="false" data-validation="paymentTerms">Payment Terms should not be empty</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Invoice Date <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" isview="true" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1 iscdatepicker" data-datable="ddmmyyyy" data-select="invoiceDate" placeholder="Enter Invoice Date" id="invoice-Date" />
                                                                   <%-- <input type="date" class="form-control" id="invoice-Date" />--%>

                                                                    <span class="validation-message" id="InvoiceDate-Validation" style="display: none; color: red" error-active="false" data-validation="invoiceDate">Invoice Date should not be empty</span>
                                                                    <span class="validation-message" id="InvoiceDate-NotMatched" style="display: none; color: red" error-active="false" data-validation="invoiceDate">Invoice date does not match the bill</span>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Due Date<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" isview="true" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1 iscdatepicker" data-datable="ddmmyyyy" data-select="dueDate" placeholder="Enter Due Date" id="due-Date" />
                                                                    <%--<input type="date"  class="form-control" id="due-Date" />--%>
                                                                    <span class="validation-message" id="dueDate-Validation" style="display: none; color: red" error-active="false" data-validation="dueDate">Due Date should not be empty</span>
                                                                </div>
                                                            </div>
                                                            <p class="mar-top-20" style="color: #525252; font-weight: 500;">Would you like to capture the bill description? </p>
                                                            <div class="radio-list">
                                                                <input type="radio" style="cursor: pointer" id="radioYes" name="DescOpt" value="Yes" />
                                                                <label for="Yes" style="display: inline;"> Yes</label>
                                                                <input type="radio" id="radioNo" name="DescOpt" class="pad-lft-5" value="No" style="cursor: pointer;margin-left:20px;" checked="checked" />
                                                                <label for="No" style="display: inline;"> No</label>

                                                            </div>

                                                            <table class="isc-table-read-optimal mar-top-15 isc-dec-table" style="display: none;" id="tbl_bills">
                                                                <thead>
                                                                    <tr>
                                                                        <th style="width: 25%;">Description</th>
                                                                        <th style="width: 20%; text-align: right;">Rate</th>
                                                                        <th style="width: 14%; text-align: center;">Qty</th>
                                                                        <th style="width: 22%; text-align: right;">Total</th>
                                                                        <th style="width: 11%;"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="tbl-description-Body" isview="true">

                                                                    <%--<tr>
                                                        <td colspan="5">
                                                            <div class="isc-up-bill-add">
                                                                <i class="fa fa-plus" style="margin-right: 10px;"></i>Add a line
                                                            </div>
                                                        </td>
                                                    </tr>--%>
                                                                </tbody>
                                                            </table>
                                                            <div id="bill-Association-Block" style="display:none">
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Customer : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select class="isc-select-dropdown cls-zindex select2" id="slt-Customer" tabindex="-1" aria-hidden="true">
                                                                                <option value="0">Choose Customer</option>

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Project : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select class="isc-select-dropdown cls-zindex select2" tabindex="-1" id="slt-Project" aria-hidden="true">
                                                                                <option value="0">Choose Project</option>

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <%-- </div>--%>
                                                    </div>

                                                </div>
                                                <div class="tab-pane fade in " id="Tab5">

                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_32" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount   </h5>
                                                        <div class="screen-row mar-top-10 collapse in" id="coll_32" style="height: auto;">
                                                            <%--<div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Account<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth isc-dd-bg">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" IsView="true"  data-Select="account" id="slt-Account" tabindex="-1" aria-hidden="true">
                                                                            <option>Choose Account</option>
                                                                           
                                                                        </select>
                                                                        <%--<input type="text" class="form-control" id="slt-Account" placeholder="Enter Account"  data-textbox="account"/>--%>
                                                            <%--<span class="validation-message" style="display:none; color:red" error-active="false" data-validation="account" id="account-Validation">Account should not be empty</span>
                                                                    </div>
                                                                </div>
                                                            </div>--%>
                                                            <%--<div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Description : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" IsView="true" id="split-Description" placeholder="Enter Description"/>
                                                                </div>
                                                            </div>--%>
                                                            <%--<div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Amount<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" IsView="true" placeholder="Enter Amount" id="split-Amount" data-textbox="amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128"  data-type="currency"/>
                                                                 <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="amount" id="split-Amount-Validation">Amount should not be empty</span>
                                                                </div>
                                                                <div class="div-col-15per" title="Add">
                                                                    <i class="fa fa-plus isc-crt-bill-add" IsView="true" style="cursor:pointer" id="add-Split-Row"></i>
                                                                </div>
                                                            </div>--%>
                                                            <%-- <div class="screen-row mar-top-10">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                                                    <thead>
                                                                        <tr>

                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="">Account
                                                                            </th>
                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="">Description
                                                                            </th>
                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="">
                                                                                <center>Amount</center>
                                                                            </th>
                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="">Action
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbl-Split-Body">


                                                                    </tbody>
                                                                </table>
                                                            </div>--%>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade in " id="Tab14">

                                                    <div class="isc-cus-var1" style="padding-left: 10px; padding-right: 10px;">
                                                        <div class="auto-height" style="overflow-y: auto">
                                                            <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont--%> mar-top-10">
                                                                <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_41" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                                                                <div class="screen-row mar-top-10 collapse " id="coll_41" style="height: auto;">
                                                                    <label id="lbl-AutoApproval">
                                                                        <input type="checkbox" id="auto-Approval" isview="true" style="cursor: pointer" />
                                                                        Auto Approval</label>
                                                                    <div class="screen-row mar-top-10" id="approvers-Div">

                                                                        <div class="screen-row" id="default-approver-div">
                                                                            <div class="div-col-35per">
                                                                                <label class="mar-top-5">Approver Name : </label>
                                                                            </div>
                                                                            <div class="div-col-50per isc-mb-wdt-90">
                                                                                <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid isc-dd-bg">
                                                                                    <select isview="true" class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Approvers" tabindex="-1" aria-hidden="true">
                                                                                        <option>Choose Approver Name</option>

                                                                                    </select>
                                                                                </div>



                                                                            </div>
                                                                            <div class="div-col-15per isc-mb-wdt-10">
                                                                                <i class="fa fa-plus " isview="true" id="add-Approver" style="cursor: pointer; padding-left: 15px; margin-top: 11px; color: #a0a0a0; display: block" title="Add Approver"></i>
                                                                            </div>
                                                                        </div>

                                                                        <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                                                            <thead>
                                                                                <tr>

                                                                                    <th style="width: 100%; background-color: #e1e2e3;" class="">Sequence
                                                                                    </th>
                                                                                    <th style="width: 100%; background-color: #e1e2e3;" class="">Approver Name
                                                                                    </th>

                                                                                    <th style="width: 100%; background-color: #e1e2e3;" class="loader">Action
                                                                                    </th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="tbl-approvers">
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont--%> mar-top-10" id="recurrence-Block">
                                                                <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_42" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Make Recurring    </h5>
                                                                <div class="screen-row mar-top-10 collapse " id="coll_42" style="height: auto;">
                                                                    <div class="screen-row mar-top-10">

                                                                        <div class="screen-row">
                                                                            <div class="div-col-35per">
                                                                                <label class="mar-top-5">Start Date : </label>
                                                                            </div>
                                                                            <div class="div-col-50per">
                                                                                <input type="text" placeholder="Enter Start Date" isview="true" id="recurring-Start-Date" data-select="recc-Start" class="form-control isc-exp-mang-txt-bx1 datepicker iscdatepicker" />
                                                                                <span class="validation-message" id="reccStartDate-Validation" style="display: none; color: red" error-active="false" data-validation="recc-Start">Recurrence Start Date should not be empty</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row mar-top-10">
                                                                            <div class="div-col-35per">
                                                                                <label class="mar-top-5">Frequency : </label>
                                                                            </div>
                                                                            <div class="div-col-50per">
                                                                                <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                                    <select isview="true" class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" id="slt-Frquency" aria-hidden="true">
                                                                                        <option>Choose Frequency</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row mar-top-10">
                                                                            <div class="div-col-35per">
                                                                                <label class="mar-top-5">Ends On : </label>
                                                                            </div>
                                                                            <div class="div-col-50per">
                                                                                <input type="text" isview="true" placeholder="Enter End Date" class="form-control isc-exp-mang-txt-bx1 datepicker iscdatepicker" data-select="recc-End" id="recurring-End-Date" />
                                                                                <span class="validation-message" id="reccEndDate-Validation" style="display: none; color: red" error-active="false" data-validation="recc-End">Due Date should not be empty</span>
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
                                                            <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont--%> mar-top-10" style="display: none;">
                                                                <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_43" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Send Reminders    </h5>
                                                                <div class="screen-row mar-top-10 collapse " id="coll_43" style="height: auto;">
                                                                    <div class="screen-row mar-top-10">

                                                                        <div class="screen-row">
                                                                            <div class="div-col-35per">
                                                                                <label class="mar-top-5">Remind : </label>
                                                                            </div>
                                                                            <div class="div-col-8per pad-lft-2-per">
                                                                                <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker" id="interval-Days" />
                                                                            </div>
                                                                            <div class="div-col-14per pad-lft-4-per">
                                                                                <label class="mar-top-5">day(s)  </label>
                                                                            </div>
                                                                            <div class="div-col-20per">
                                                                                <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-wdth ">
                                                                                    <select class="isc-select-dropdown select2 select2-hidden-accessible" id="interval-Period" tabindex="-1" aria-hidden="true">
                                                                                        <option>Before</option>
                                                                                        <option>After</option>
                                                                                    </select>
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
                                                                                    <select class="isc-select-dropdown  select2" tabindex="-1"
                                                                                        aria-hidden="true" id="reminder-Emails">
                                                                                        <option value="0">Select Email</option>
                                                                                    </select>
                                                                                </div>

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
                                                            <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont--%> mar-top-10">
                                                                <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_44" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                                                                <div class="screen-row mar-top-10 collapse " id="coll_44" style="height: auto;">
                                                                    <div class="screen-row">
                                                                        <div class="screen-row ">
                                                                            <span class="isc-btn-inp-typ-file-s1 cell-right" id="add-Doc-Span">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Documents" title="Add file" />
                                                                            </span>


                                                                        </div>
                                                                    </div>
                                                                    <div class="screen-row mar-top-10" style="overflow-y:auto;">

                                                                        <table class="isc-table-read-optimal isc-table-sorter-s1" >
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style="width: 80%;" class="">File Name</th>

                                                                                    <th style="width: 20%;" class="text-center">Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="tbl-Attatchments-Body">
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont--%> mar-top-10">
                                                                <h5 class="isc-bill-trk-hdr-txt isc-new-txt-size" href="#coll_45" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                                                                <div class="screen-row mar-top-10 collapse " id="coll_45" style="height: auto;">
                                                                    <div class="cell-right pad-rig-5 " style="margin-bottom: 10px; margin-top: 10px;">

                                                                        <a class="isc-theme-blue-btn isc-btn-pop-action-s1 " href="#" id="save-Bill-Notes">Save</a>
                                                                    </div>
                                                                    <div class="screen-row mar-top-15">

                                                                        <textarea class="form-control" placeholder="Enter Notes" rows="3" id="bill-Notes"></textarea>
                                                                    </div>
                                                                    <div class="screen-row">
                                                                        <div class="isc-crt-bill-not-cont" id="bill-Notes-Block">
                                                                            <%-- <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i> Payment to be done based on payment terms..<span class="isc-crt-bill-ownr" style="color: green !important;"> Frank Abagnale </span>,<span class="isc-crt-bill-ownr">Sun Feb 28 ,4.54 am</span></p>--%>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <%--  <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_41" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_41" style="height: auto;">
                                                            <label>
                                                                <input type="checkbox" id="auto-Approval" IsView="true" style="cursor:pointer"/>
                                                                Auto Approval</label>
                                                            <div class="screen-row mar-top-10">
                                                                
                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Approver Name : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid isc-dd-bg">
                                                                            <select IsView="true" class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Approvers" tabindex="-1" aria-hidden="true">
                                                                                <option>Choose Approver Name</option>
                                                                                
                                                                            </select>
                                                                        </div>
                                                                      
                                                              
                                                           
                                                                    </div>
                                                                    <div class="div-col-15per">
                                                                        <i class="fa fa-plus isc-crt-bill-add" IsView="true" id="add-Approver" style="cursor:pointer" title="Add Approver"></i>
                                                                    </div>
                                                                </div>

                                                                  <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                                                    <thead>
                                                                        <tr>

                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="">Sequence
                                                                            </th>
                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="">Approver Name
                                                                            </th>
                                                                            
                                                                            <th style="width: 7%; background-color: #e1e2e3;" class="">Action
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbl-approvers">
                                                                                                                                             
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                                    <%--<div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_42" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Make Recurring    </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_42" style="height: auto;">
                                                            <div class="screen-row mar-top-10">

                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Start Date : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" placeholder="Enter Start Date" IsView="true" id="recurring-Start-Date" data-Select="recc-Start" class="form-control isc-exp-mang-txt-bx1 datepicker iscdatepicker"/>
                                                                  <span class="validation-message"  id="reccStartDate-Validation" style="display:none; color:red" error-active="false" data-validation="recc-Start">Recurrence Start Date should not be empty</span>
                                                                          </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Frequency : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select IsView="true" class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" id="slt-Frquency"  aria-hidden="true">
                                                                                <option>Choose Frequency</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Ends On : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" IsView="true" placeholder="Enter End Date"  class="form-control isc-exp-mang-txt-bx1 datepicker iscdatepicker" data-Select="recc-End" id="recurring-End-Date"/>
                                                                    <span class="validation-message"  id="reccEndDate-Validation" style="display:none; color:red" error-active="false" data-validation="recc-End">Due Date should not be empty</span>
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
                                                    <%--  </div>
                                                        </div>
                                                    </div>--%>
                                                    <%-- <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_43" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Send Reminders    </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_43" style="height: auto;">
                                                            <div class="screen-row mar-top-10">

                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Remind : </label>
                                                                    </div>
                                                                    <div class="div-col-8per pad-lft-2-per">
                                                                        <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker" id="interval-Days"/>
                                                                    </div>
                                                                    <div class="div-col-14per pad-lft-4-per">
                                                                        <label class="mar-top-5">day(s)  </label>
                                                                    </div>
                                                                    <div class="div-col-20per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-wdth ">
                                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" id="interval-Period" tabindex="-1" aria-hidden="true">
                                                                                <option>Before</option>
                                                                                <option>After</option>
                                                                            </select>
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
                                                                            <select class="isc-select-dropdown  select2" tabindex="-1"
                                                                                aria-hidden="true" id="reminder-Emails">
                                                                                <option value="0">Select Email</option>
                                                                            </select>
                                                                        </div>

                                                                    </div>
                                                                </div>--%>

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
                                                    <%--</div>
                                                        </div>
                                                    </div>--%>
                                                    <%-- <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_44" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_44" style="height: auto;">
                                                            <div class="screen-row">
                                                                <div class="screen-row ">
                                                                    <span class="isc-btn-inp-typ-file-s1 cell-right" id="add-Doc-Span">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Documents" title="Add file"/>
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
                                                                    <tbody id="tbl-Attatchments-Body">
                                                                      
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                                    <%--<div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_45" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_45" style="height: auto;">
                                                            <div class="cell-right pad-rig-5 " style="margin-bottom: 10px;margin-top:10px;">

                                                                <a class="isc-theme-blue-btn" href="#" id="save-Bill-Notes">Save</a>
                                                            </div>
                                                            <div class="screen-row mar-top-15">

                                                                <textarea class="form-control" placeholder="Enter Notes" rows="3" id="bill-Notes"></textarea>
                                                            </div>
                                                            <div class="screen-row">
                                                                <div class="isc-crt-bill-not-cont" id="bill-Notes-Block">
                                                                   <%-- <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i> Payment to be done based on payment terms..<span class="isc-crt-bill-ownr" style="color: green !important;"> Frank Abagnale </span>,<span class="isc-crt-bill-ownr">Sun Feb 28 ,4.54 am</span></p>--%>
                                                    <%-- </div>
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                                </div>
                                                <div class="tab-pane fade in " id="Tab22">
                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_r1" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approval History </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_r1" style="height: auto;">
                                                            <table class="isc-table-read-optimal">
                                                                <thead>
                                                                </thead>
                                                                <tbody aria-live="polite" aria-relevant="all" id="tbl-ApproverHistory-Body">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_r3" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Payment Details </h5>
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
                                                                    <%-- <span class="isc-btn-inp-typ-file-s1 cell-right" id="add-Doc-Span" style="cursor:pointer">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Document" title="Add file"/>
                                                                    </span>--%>
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
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" data-backdrop="static" id="Mp_Add_Vendor" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 765px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Choose Vendor</h4>
                        </div>
                        <div class="cell-right">
                            <a cancel-choose-vendor="true" title="Close" style="cursor: pointer"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">
                        <div class="div-col-30per">
                            <input type="text" class="form-control" placeholder="Enter Vendor Name" id="txt-Vendor-Search" />
                        </div>
                        <%--  <div class="div-col-30per pad-lft-12">
                            <input type="text" class="form-control" placeholder="Enter Address">
                        </div>
                         <div class="div-col-30per pad-lft-12">
                            <input type="text" class="form-control" placeholder="Enter Contact">
                        </div>--%>
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="btn-Search-Vendor">
                            <a title="Search"><i class="fa fa-search"></i></a>
                        </div>
                        <div class="isc-filter-search isc-reset" title="Reset" id="btn-Reset-Vendor">
                            <a><i class="fa fa-refresh"></i></a>
                        </div>
                    </div>
                    <div class="screen-row mar-top-15">
                        <table class="isc-table-read-optimal isc-table-sorter-s1">
                            <thead>
                                <tr>

                                    <th style="width: 20%;">Vendor Name
                                    </th>
                                    <th style="width: 30%;">Address
                                    </th>
                                    <th style="width: 20%;">Contact
                                    </th>
                                    <th style="width: 10%;">Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody id="vendorList-Body">
                                <tr>

                                    <td colspan="4" style="text-align: center;">No Data Found
                                    </td>


                                </tr>

                                <%--<tr>
                                                        
                                                        <td>
                                                            <h2>Johnson&CO</h2>
                                                        </td>
                                                        <td>
                                                            <h2 class="">New york
                                                            </h2>
                                                        </td>
                                                         <td>
                                                            <h2 class="">617-799-8028
                                                            </h2>
                                                        </td>
                                                        <td>
                                                            <label class=""><div class="radio"><span class=""><input type="radio" name="CardType"/></span></div></label>
                                                        </td>
                                                        
                                                        
                                                      
                                                    </tr>--%>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <a class="btn blue isc-btn-pop-action-s1" id="">New Vendor</a>
                        </div>
                    </div>
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-Choose-Vendor">
                                Choose</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;" cancel-choose-vendor="true">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese isc-new-pop-up" id="Mp_New_Vendor" data-backdrop="static" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 765px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">New Vendor</h4>
                        </div>
                        <div class="cell-right">
                            <a cancel-add-vendor-pop="true" title="Close" style="cursor: pointer"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">

                        <div class="screen-row ">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Vendor Name <span style="color: red;">*</span>  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Vendor Name" id="txt-AV-Vendor-Name" maxlength="50" data-textbox="vendorName" class="form-control" />
                                <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="vendorName">Vendor Name contains invalid characters. Allowable characters are  A-Z, a-z,0-9,&,@,£,$,€ ,¥,#,. ,:,:,-.</span>
                                <span style="color: red; display: none;" class="validation-message" id="vendorName-Validation" data-validation="vendorName">Vendor Name should not be empty</span>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Primary Email <span style="color: red;">*</span>  </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Primary Email" id="txt-Email" maxlength="64" data-email="vendorEmail" class="form-control" />
                                <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="vendorEmail">Entered Email id is not valid.</span>
                                <span style="color: red; display: none;" class="validation-message" id="vendorEmail-Validation" data-validation="vendorEmail">Primary Email should not be empty</span>

                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Contact Number <span style="color: red;"></span></label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" placeholder="Enter Contact Number" id="txt-Contact-Number" maxlength="11" phone-number="true" data-textbox="vendorContact" class="form-control" />
                                <span style="color: red; display: none;" class="validation-message" id="vendorContact-Validation" data-validation="vendorContact">Contact Number should not be empty</span>
                            </div>
                        </div>


                        <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Preferred Payment Method <span style="color: red;"></span></label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <div class="isc-slt-parent isc-vnd-mhd isc-prfd-vndr">
                                    <select class="select2" data-select="vendorPrefPaymentTerm" id="slt-Prefferd-Payment-Method">
                                        <option value="0">Choose Preferred Payment Method</option>

                                    </select>
                                    <span style="color: red; display: none;" class="validation-message" id="PrefferedPaymentTerm-Validation" data-validation="vendorPrefPaymentTerm">Preferred Payment Method should not be empty</span>
                                </div>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Payment Terms <span style="color: red;"></span></label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <div class="isc-slt-parent isc-vnd-mhd">
                                    <select class="select2" id="slt-Payment-Terms" data-select="vendorPaymentTerm">
                                        <option value="0">Choose Payment Terms</option>

                                    </select>
                                    <span style="color: red; display: none;" class="validation-message" id="vendorPaymentTerm-Validation" data-validation="vendorPaymentTerm">Payment Terms should not be empty</span>
                                </div>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            <div class="div-col-35per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">GL Account <span style="color: red;"></span></label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <div class="isc-slt-parent isc-vnd-mhd">
                                    <select class="select2" id="slt-GL-Codes" data-select="GLCode">
                                        <option value="0">Choose GL Account </option>

                                    </select>
                                    <span style="color: red; display: none;" class="validation-message" id="Gl-Code-Validation" data-validation="GLCode">GL Account should not be empty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;" cancel-add-vendor-pop="true">
                                Cancel</button>
                        </div>
                    </div>
                    <div class="cell-right ">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-Save-New-Vendor">
                                ADD</button>
                        </div>
                    </div>
                    
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="approver-Name"><span style="color: green;" id="amount-Span">(Approved : $0.00 , Balance :$0.00)</span></h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" title="Close" id="Close-Notes" style="cursor: pointer"></i></a>
                            <%-- <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true"  id="Close-Notes">
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
                                        <p class="isc-bill-conf-del" id="approver-Notes">No Comments Found</p>

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

    <div class="slider isc-new-sldr">

        <div class="split-amount">
            <div class="isc-split-width">

                <div class="close-slider">
                    <div class="cls" style="height: 45px;">
                        <h3>Split Amount</h3>
                        <i class="fa fa-times-circle close-amount" title="Close" style="cursor: pointer"></i>
                    </div>
                </div>
                <div class="auto-height">
                    <div class="<%--isc-bill-trk-lst-cont isc-lst-scrl-cont --%>mar-top-10">
                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_1321" data-toggle="collapse" style="border-bottom:1px solid #dadada;padding:10px 0px;"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount   </h5>
                        <div class="screen-row mar-top-10 collapse in" id="coll_1321" style="height: auto;">
                            <div class="screen-row">
                                <div class="div-col-35per">
                                    <label class="mar-top-5">Account<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                </div>
                                <div class="div-col-50per">
                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth isc-dd-bg">
                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" isview="true" data-select="account" id="slt-Account" tabindex="-1" aria-hidden="true">
                                            <option>Choose Account</option>

                                        </select>
                                        <%--<input type="text" class="form-control" id="slt-Account" placeholder="Enter Account"  data-textbox="account"/>--%>
                                        <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="account" id="account-Validation">Account should not be empty</span>
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-35per">
                                    <label class="mar-top-5">Description : </label>
                                </div>
                                <div class="div-col-50per">
                                    <input type="text" class="form-control" isview="true" id="split-Description" placeholder="Enter Description" />
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-35per ">
                                    <label class="mar-top-5">Amount<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                </div>
                                <div class="div-col-50per isc-mb-wdt-90">
                                    <input type="text" class="form-control" isview="true" placeholder="Enter Amount" id="split-Amount" data-textbox="amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128" data-type="currency" />
                                    <span class="validation-message" style="display: none; color: red" error-active="false" data-validation="amount" id="split-Amount-Validation">Amount should not be empty</span>
                                </div>
                                <div class="div-col-15per isc-mb-wdt-10" title="Add">
                                    <i class="fa fa-plus " isview="true" style="cursor: pointer; padding-left: 15px; margin-top: 11px; color: #a0a0a0; display: block" id="add-Split-Row"></i>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10 isc-lst-scrl-cont">
                                <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                    <thead>
                                        <tr>

                                            <th style="width: 30%; background-color: #e1e2e3; cursor: context-menu !important;" class="">Account
                                            </th>
                                            <th style="width: 30%; background-color: #e1e2e3; cursor: context-menu !important" class="">Description
                                            </th>
                                            <th style="width: 20%; background-color: #e1e2e3; cursor: context-menu !important" class="">
                                                <center>Amount</center>
                                            </th>
                                            <th style="width: 20%; background-color: #e1e2e3; cursor: context-menu !important" class="">Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody id="tbl-Split-Body">


                                        <%--<tr>
                                                                            <td>
                                                                                <h5>Bank Service Charges</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>A1 Rental</h5>
                                                                            </td>
                                                                            <td class="isc-bill-amt-pad">
                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <h5>Bank Service Charges</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>A1 Rental</h5>
                                                                            </td>
                                                                            <td class="isc-bill-amt-pad">
                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                                                        </tr>--%>
                                        <%--<tr>
                                                        <td>
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1  isc-bill-trk-sel-box isc-up-bill-dd-siz">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="SelectBuildProject">
                                                    <option>Bank Service Charges </option>
                                                       <option>Meals and Entertainment</option>
                                                       <option>Office Supplies </option>
                                                       <option>Payroll Expenses</option>
                                                       <option>Travel Expense</option>
                                                </select>     </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="Enter Description">
                                                        </td>
                                                        <td class="isc-bill-amt-pad">
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="$750" style="text-align:right;">
                                                        </td>
                                                        <td>
                                                            <i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst"></i>
                                                        </td>
                                                    </tr>--%>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="settings" style="display:none;">
            <div style="width: 522px;">

                <div class="close-slider">
                    <div class="cls" style="height: 30px;">
                        <h3>Settings </h3>
                        <i class="fa fa-times-circle close-settings" title="Close"></i>
                    </div>
                </div>


                <%--<div class="isc-cus-var1" style="padding-left: 10px; padding-right: 10px;">
                    <div class="auto-height" style="overflow-y: auto">
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_41" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_41" style="height: auto;">
                                <label id="lbl-AutoApproval">
                                    <input type="checkbox" id="auto-Approval" isview="true" style="cursor: pointer" />
                                    Auto Approval</label>
                                <div class="screen-row mar-top-10" id="approvers-Div">

                                    <div class="screen-row">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Approver Name : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid isc-dd-bg">
                                                <select isview="true" class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Approvers" tabindex="-1" aria-hidden="true">
                                                    <option>Choose Approver Name</option>

                                                </select>
                                            </div>



                                        </div>
                                        <div class="div-col-15per">
                                            <i class="fa fa-plus isc-crt-bill-add" isview="true" id="add-Approver" style="cursor: pointer" title="Add Approver"></i>
                                        </div>
                                    </div>

                                    <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                        <thead>
                                            <tr>

                                                <th style="width: 20%; background-color: #e1e2e3;" class="">Sequence
                                                </th>
                                                <th style="width: 30%; background-color: #e1e2e3;" class="">Approver Name
                                                </th>

                                                <th style="width: 7%; background-color: #e1e2e3;" class="">Action
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody id="tbl-approvers">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10" id="recurrence-Block">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_42" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Make Recurring    </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_42" style="height: auto;">
                                <div class="screen-row mar-top-10">

                                    <div class="screen-row">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Start Date : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <input type="text" placeholder="Enter Start Date" isview="true" id="recurring-Start-Date" data-select="recc-Start" class="form-control isc-exp-mang-txt-bx1 datepicker iscdatepicker" />
                                            <span class="validation-message" id="reccStartDate-Validation" style="display: none; color: red" error-active="false" data-validation="recc-Start">Recurrence Start Date should not be empty</span>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Frequency : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                <select isview="true" class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" id="slt-Frquency" aria-hidden="true">
                                                    <option>Choose Frequency</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Ends On : </label>
                                        </div>
                                        <div class="div-col-50per">
                                            <input type="text" isview="true" placeholder="Enter End Date" class="form-control isc-exp-mang-txt-bx1 datepicker iscdatepicker" data-select="recc-End" id="recurring-End-Date" />
                                            <span class="validation-message" id="reccEndDate-Validation" style="display: none; color: red" error-active="false" data-validation="recc-End">Due Date should not be empty</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10" style="display: none;">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_43" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Send Reminders    </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_43" style="height: auto;">
                                <div class="screen-row mar-top-10">

                                    <div class="screen-row">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Remind : </label>
                                        </div>
                                        <div class="div-col-8per pad-lft-2-per">
                                            <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker" id="interval-Days" />
                                        </div>
                                        <div class="div-col-14per pad-lft-4-per">
                                            <label class="mar-top-5">day(s)  </label>
                                        </div>
                                        <div class="div-col-20per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-wdth ">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" id="interval-Period" tabindex="-1" aria-hidden="true">
                                                    <option>Before</option>
                                                    <option>After</option>
                                                </select>
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
                                                <select class="isc-select-dropdown  select2" tabindex="-1"
                                                    aria-hidden="true" id="reminder-Emails">
                                                    <option value="0">Select Email</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_44" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_44" style="height: auto;">
                                <div class="screen-row">
                                    <div class="screen-row ">
                                        <span class="isc-btn-inp-typ-file-s1 cell-right" id="add-Doc-Span">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Documents" title="Add file" />
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
                                        <tbody id="tbl-Attatchments-Body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                            <h5 class="isc-bill-trk-hdr-txt" href="#coll_45" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                            <div class="screen-row mar-top-10 collapse " id="coll_45" style="height: auto;">
                                <div class="cell-right pad-rig-5 " style="margin-bottom: 10px; margin-top: 10px;">

                                    <a class="isc-theme-blue-btn" href="#" id="save-Bill-Notes">Save</a>
                                </div>
                                <div class="screen-row mar-top-15">

                                    <textarea class="form-control" placeholder="Enter Notes" rows="3" id="bill-Notes"></textarea>
                                </div>
                                <div class="screen-row">
                                    <div class="isc-crt-bill-not-cont" id="bill-Notes-Block">
                                        
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--%>


            </div>
        </div>

        <!----Slider----->
    </div>
    <script>
        $(document).ready(function () {
            $(".slt-Tags").select2({
                tags: true,
                tokenSeparators: [',', ' ']
            })
        });

    </script>
    <script>
        $('#isc-layout-s1').click(function () {
            $("#exp-lst-view").show();
            $("#exp-kab-view").hide();

        })
        $('#isc-layout-s2').click(function () {
            $("#exp-kab-view").show();
            $("#exp-lst-view").hide();

        })
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });
    </script>
    <script>
        $('.isc-checkbox-func').on('change', function () {
            if ($(this).is(':checked')) {
                $('select.isc-select-dropdown.isc-select-func.select2.select2-hidden-accessible').attr('disabled', true);
            } else {
                $('select.isc-select-dropdown.isc-select-func.select2.select2-hidden-accessible').attr('disabled', false);
            }
        })


        $('select.isc-select-dropdown.isc-select-func.select2.select2-hidden-accessible').on('change', function () {

            if ($(this).val() === "") {
                $('input.isc-checkbox-func').attr('disabled', false)
            }
            else {
                $('input.isc-checkbox-func').attr('disabled', true)
            }
        })



        $('.isc-submit-func').on('click', function () {
            $('.isc-success-msg').show();
        })

        $('.isc-success-msg i').on('click', function () {
            $('.isc-success-msg').hide();
        });

        $('input[type=radio][name=DescOpt]').change(function () {
            if (this.value == 'Yes') {
                $(".isc-dec-table").show();
            }
            else if (this.value == 'No') {
                $(".isc-dec-table").hide();
            }
        });

        $(".isc-split").click(function () {
            $(".split-amount").toggleClass("split-amount-show");
            $(".split-amount").parents(".slider").find(".settings-show").removeClass("settings-show");
        })
        $(".isc-panel-settings").click(function () {
            $(".settings").toggleClass("settings-show");
            $(".settings").parents(".slider").find(".split-amount-show").removeClass("split-amount-show");
        })

        $(".close-amount").click(function () {
            $(".split-amount").removeClass("split-amount-show");
        });
        $(".close-settings").click(function () {
            $(".settings").removeClass("settings-show");
        });

    </script>
    <script src="iscjsengine/PageScript/CreateNewBill.js"></script>
</asp:Content>
