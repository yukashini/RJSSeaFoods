
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PayNow.aspx.cs" Inherits="BillManagement.ClientSignup" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
    <title>ArcBill  | Archarina Theme</title>
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="Arc Time Tracking | Innospire Theme" name="description" />
    <meta content="Innospire Systems" name="author" />
    <link rel="shortcut icon" href="img/favicon.ico" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link rel="shortcut icon" href="img/faviconArch.png" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="isccssengine/lib/font-awesome/font-awesome.min.css" rel="stylesheet"
        type="text/css" />
    <link href="isccssengine/lib/simple-line-icons/simple-line-icons.min.css" rel="stylesheet"
        type="text/css" />




    <link href="isccssengine/lib/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <%--  <link href="isccssengine/lib/fonts/bootstrap-glyphicons.css" rel="stylesheet" />--%>
    <link href="isccssengine/lib/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/fSelect.css" rel="stylesheet" />
    <link href="isccssengine/lib/bootstrap-select.min.css" rel="stylesheet" />
    <%-- <link href="isccssengine/lib/bootstrap-glyphicons.css" rel="stylesheet" />--%>
    <link href="isccssengine/lib/fonts/bootstrap-glyphicons.css" rel="stylesheet" />

    <link href="isccssengine/lib/jquery.nestable.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/jquery.scrolling-tabs.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

    <link href="isccssengine/lib/jstree.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/common/plugins.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN THEME STYLES -->

    <link href="isccssengine/common/components.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/common/layout.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/common/default.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/theme/iscotherthemestyles.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/theme/iscourcharts.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/theme/iscsupport.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/fonts/bootstrap-glyphicons.css" rel="stylesheet" />
    <link href="isccssengine/theme/iscoverridestyles.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/daterangepicker.css" rel="stylesheet" />
    <link href="isccssengine/lib/datepicker.css" rel="stylesheet" />
    <link href="isccssengine/theme/iscglobal.css?v1.0" rel="stylesheet" type="text/css" />

    <link href="isccssengine/lib/timeline.min.css" rel="stylesheet" />
    <link href="isccssengine/lib/uniform.default.css" rel="stylesheet" type="text/css" />


    <link href="isccssengine/theme/iscresponsive.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/theme/T35Home.css" rel="stylesheet" />
    <link href="scripts/T37-ChartControls/nv.d3.css" rel="stylesheet" />
    <link href="isccssengine/theme/T35responsive.css" rel="stylesheet" />
    <link href="isccssengine/lib/Custom.css" rel="stylesheet" />
     <link href="isccssengine/theme/IscRefine.css" rel="stylesheet" />
    <link href="isccssengine/theme/IscResponsiveV2.css" rel="stylesheet" />

    <link href="isccssengine/lib/joditmin1.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"> </script>

    <script src="iscjsengine/lib/jquery-1.11.0.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/init.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery.dataTables.min.js" type="text/javascript"></script>
    <%--<script src="iscjsengine/lib/jquery.tablesorter.min.js" type="text/javascript"></script>--%>
    <script src="iscjsengine/lib/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/switchzoomscreen.js"></script>

    <script src="iscjsengine/lib/bootstrap.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    <%--<script src="iscjsengine/lib/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>--%>
    <script src="iscjsengine/lib/jquery.slimscroll.min.js" type="text/javascript"></script>

    <script src="iscjsengine/lib/moment.js"></script>
    <script src="iscjsengine/lib/jquery.scrolling-tabs.js" type="text/javascript"></script>
    <script src="iscjsengine/common/layout.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/ISCUtilities.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/Utilities.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/ApplicationProperties.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="iscjsengine/PageScript/ServerRequests.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/JsonManipulation.js" type="text/javascript"></script>
    <%--<script src="iscjsengine/PageScript/Master.js" type="text/javascript"></script>--%>
    <script src="iscjsengine/lib/select2.full.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/fSelect.js"></script>
    <script src="iscjsengine/lib/bootstrap-select.min.js"></script>
    <script src="iscjsengine/lib/daterangepicker.js" type="text/javascript"></script>
    <%--  Chart include in Application--%>
    <script src="scripts/FIPControls/jquery.sparkline.js"></script>
    <script src="Scripts/T37-ChartControls/d3.v3.js" type="text/javascript"></script>
    <script src="Scripts/T37-ChartControls/nv.d3.js" type="text/javascript"></script>
    <script src="Scripts/T37-ChartControls/tooltip.js" type="text/javascript"></script>
    <script src="scripts/FIPControls/ISC-dountChart.js"></script>
    <script src="iscjsengine/common/jquery.mask.js"></script>
    <script src="iscjsengine/internal/demo/jquery.mask.min.js"></script>
    <script src="iscjsengine/common/jquery.maskMoney.js"></script>
    <%--<script src="iscjsengine/common/datable.js"></script>--%>
    <script src="iscjsengine/lib/Jodit2.js"></script>

    <script src="iscjsengine/common/notify.min.js"></script>
     <script src="iscjsengine/PageScript/Paynow.js"></script>

    <style>
        .isc-theme-blue-btn {
            padding: 7px 8px;
        }

        .isc-45per.isc-cus-43 {
            width: 43%;
            float: left;
        }

        .isc-10per {
            width: 10%;
            float: left;
        }

        .div-col-14per {
            width: 14%;
            float: left;
        }

        .isc-entity-sm-title {
            display: block;
        }

        .div-col-35per.isc-check-func {
            margin-top: 16px;
        }

        .isc-success-msg {
            background-color: green;
            padding: 5px;
            border-radius: 4px !important;
            display: none;
        }

            .isc-success-msg p {
                padding: 0;
                margin: 0;
                color: #fff;
            }

            .isc-success-msg i {
                float: right;
                cursor: pointer;
            }

        .isc-crt-new-txt-size {
            font-size: 13px;
            height: 22px !important;
        }

        .isc-crt-bill-view {
            left: 25%;
        }

        .isc-lft-hdr p {
            font-size: 14px;
            font-weight: 400;
            margin: 0px;
        }
    </style>
    </head>
    <body>
    <form id="form1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-40per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">Pay Now</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <%--<div class="div-col-20per align-right mar-top-10">
                <div class="isc-view-toggle-btn">
                    <span>Layout</span>
                    <a class="isc-theme-blue-btn " id="isc-layout-s1"><i class="fa fa-bar-chart-o "></i></a>
                    <a class="isc-theme-blue-btn  isc-non-hightlight" id="isc-layout-s2"><i class="fa fa-table "></i></a>
                </div>
            </div>--%>
            <%--<div class="div-col-60per">
                <div class="cell-right " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn" href="#" style="background-color: #aeaeae !important;">Cancel</a>

                </div>


                <%-- <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="#">Generate Invoice</a>
                </div>--%>
                <%--<div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="Paymentout.aspx">Submit and Pay</a>
                </div>--%>
                <%--<div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="#">Submit</a>
                </div>--%>
                <%--<div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn" href="#">Save</a>
                </div>--%>
            <%--</div>--%>
        </div>
        <div class="isc-app-screen-body-container">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div id="exp-lst-view" style="display: none;">
                            <div class="screen-row">
                                <div class="div-col-70per">
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
                                            <div class="isc-bill-lst-scr" style="min-height: 165px; max-height: 180px;">
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
                                <div class="div-col-30per">
                                    <div class="isc-up-bill-rgt-cont">
                                        <div class="isc-screen-nav-container-s1 mar-top-10">
                                            <ul class="nav nav-tabs" style="position: relative;">
                                                <li class="active"><a href="#Tab1" data-toggle="tab">Bill</a> </li>
                                                <li class=""><a href="#Tab-3" data-toggle="tab">Split Amount</a> </li>
                                                <li class=""><a href="#Tab2" data-toggle="tab">Settings</a> </li>

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
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Bill # <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" class="form-control" placeholder="Enter Bill #" />
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
                                                                        <label class="mar-top-5">Invioice Date : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" class="form-control" placeholder="Enter Invioice Date" />
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








                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_12" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Description   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_12" style="height: auto;">
                                                            <div class="screen-row mar-top-10">



                                                                <div class="screen-row">
                                                                    <%--<div class="isc-up-bill-hdt-bar mar-bot-med"></div>--%>
                                                                    <div class="isc-bill-lst-scr">
                                                                        <table class="isc-table-read-optimal " style="table-layout: auto;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style="width: 34%;">Description</th>
                                                                                    <th style="width: 20%; text-align: right;">Rate</th>
                                                                                    <th style="width: 5%; text-align: center;">Qty</th>
                                                                                    <th style="width: 10%; text-align: right;">Total</th>
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
                                                                                    <td>Writing Services</td>
                                                                                    <td style="text-align: right;">$1500.00</td>
                                                                                    <td style="text-align: center;">2</td>
                                                                                    <td style="text-align: right;">$3000.00</td>
                                                                                    <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Writing Services</td>
                                                                                    <td style="text-align: right;">$1500.00</td>
                                                                                    <td style="text-align: center;">2</td>
                                                                                    <td style="text-align: right;">$3000.00</td>
                                                                                    <td><a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                                                </tr>
                                                                                <%--<tr>
                                                        <td>
                                                            <input type="text" placeholder="Enter Vendor" class="form-control isc-up-bill-vnd" /></td>
                                                        <td>
                                                            <input type="text" placeholder="Enter Amont" class="form-control isc-up-bill-vnd-amt" /></td>
                                                        <td>
                                                            <input type="text" placeholder="Enter Qty" class="form-control isc-up-bill-vnd" style="text-align: center;" /></td>
                                                        <td>
                                                            <input type="text" placeholder="Total Amount" class="form-control isc-up-bill-vnd-amt" /></td>


                                                    </tr>--%>
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
                                                                <div class="screen-row mar-top-20">
                                                                    <div class="isc-up-bill-ttl">
                                                                        <div class="div-col-75per">
                                                                            <label>Total</label>
                                                                        </div>
                                                                        <div class="div-col-5per">
                                                                            <p></p>
                                                                        </div>
                                                                        <div class="div-col-10per">
                                                                            <h4 class="isc-up-bill-inv-data">$6,000.00</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>




                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade in " id="Tab2">
                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_21" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                                                        <div class="screen-row mar-top-10 collapse in" id="coll_21" style="height: auto;">
                                                            <div class="screen-row mar-top-10">
                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Approver Name : </label>
                                                                    </div>
                                                                    <div class="div-col-55per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid">
                                                                            <select class="isc-select-dropdown isc-select-func select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                                <option value="">Choose Approver Name</option>
                                                                                <option value="1">Frank Abagnale </option>
                                                                                <option value="2">Edward Abbey </option>
                                                                                <option value="3">Reuben Abel </option>
                                                                                <option value="4">Hal Abelson</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="div-col-5per">
                                                                        <i class="fa fa-plus isc-crt-bill-add"></i>
                                                                    </div>
                                                                    <div class="div-col-35per isc-check-func">
                                                                        <input type="checkbox" class="isc-checkbox-func">
                                                                        Auto Approval
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
                                                                                <option>Monthly</option>
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
                                                                        <label class="mar-top-5">day(s) : </label>
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
                                                                            <select class="isc-select-dropdown  " multiple="multiple" tabindex="-1"
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
                                                            <div class="screen-row mar-top-10">

                                                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 80%;" class="header">File Name</th>

                                                                            <th style="width: 10%;" class="header text-center">Action</th>
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
                                                                                    <a class="isc-action-badge-td-s1" href="#"><i class="fa fa-eye"></i></a>
                                                                                    <a class="isc-action-badge-td-s1"><i class="fa fa-trash-o"></i></a>
                                                                                    <a class="isc-action-badge-td-s1"><i class="fa fa-plus"></i></a>
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
                                                                                    <a class="isc-action-badge-td-s1" href="#"><i class="fa fa-eye"></i></a>
                                                                                    <a class="isc-action-badge-td-s1"><i class="fa fa-trash-o"></i></a>
                                                                                    <a class="isc-action-badge-td-s1"><i class="fa fa-plus"></i></a>
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
                                                                    <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i>Payment to be done based on payment terms..<span class="isc-crt-bill-ownr"> Frank Abagnale ,Sun Feb 28 ,4.54 am</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="tab-pane fade in " id="Tab-3">

                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll-31" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount   </h5>
                                                        <div class="screen-row mar-top-10 collapse in" id="coll-31" style="height: auto;">
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
                                    <div class="isc-bor-lft-pos" style="border-left: unset;">
                                        <div class="isc-temp-head-cont isc-bg-blue">
                                            <div class="screen-row">
                                                <div class="div-col-70per">
                                                    <div class="isc-entity-header-actions">

                                                        <h1 class="isc-tail-h1-p1 mar-top-30">Invoice</h1>

                                                    </div>
                                                </div>
                                                <div class="div-col-14per">
                                                    <span class="isc-entity-sm-title">Invoice #</span>
                                                    <span class="isc-entity-sm-title">Invoice Date</span>
                                                    <span class="isc-entity-sm-title">Term Code</span>

                                                    
                                                </div>
                                                <div class="div-col-10per">
                                                    <span class="isc-entity-sm-title" id="spn_invoice"></span>
                                                    <span class="isc-entity-sm-title" id="spn_indate"></span>

                                                    <span class="isc-entity-sm-title" id="spn_termcode"></span>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                        <div class="isc-temp-bdy-cont">
                                            <div class="screen-row">
                                                <div class="div-col-25per isc-primary-title  ">
                                                    <div class="isc-screen-row">
                                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                                            <p class="isc-f-w-br">From :</p>
                                                            <div class=" isc-lft-hdr">
                                                              <span id="spn_from"></span>

                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="div-col-25per isc-primary-title  ">
                                                    <div class="isc-screen-row">
                                                        <div class="isc-acc-box-inner-txt isc-mar-top ">
                                                            <p class="isc-f-w-br">Invoice To:</p>
                                                            <div class=" isc-lft-hdr">
                                                               <span id="spn_To"></span>

                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="div-col-25per isc-primary-title  ">
                                                    <div class="isc-screen-row">
                                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                                            <p class="isc-f-w-br">Ship To :</p>
                                                            <div class=" isc-lft-hdr">
                                                                <span id="spn_sto"></span>

                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="div-col-25per isc-primary-title  ">
                                                    <div class="isc-screen-row">
                                                        <div class="isc-acc-box-inner-txt isc-mar-top">
                                                            <p class="isc-f-w-br">Invoice Total :</p>
                                                            <div class=" isc-lft-hdr">
                                                                <h2 class="isc-thm-hme-kpi-t2  isc-color-p1">$<span id="spn_total"></span></h2>

                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="screen-row">
                                                <table  class="isc-t300-hrm-lst isc-table isc-table-row  isc-table-bordered mar-top-30">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 30%;" title="Description">Description</th>
                                                            <th style="width: 15%; text-align: right" title="Unit Price">Unit Price</th>
                                                            
                                                            <th style="width: 20%; text-align: right" title="Amount">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbl-Invoice">
                                                      
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="screen-row">
                                                <div class="div-col-70per">
                                                    <p></p>
                                                </div>
                                                <div class="div-col-30per">
                                                    <table class="isc-t300-hrm-lst isc-table isc-table-row  isc-set-bdt-dot">

                                                        <tbody>
                                                            
                                                            
                                                         

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="screen-row">
                                                <div class="isc-acc-box-inner-txt isc-mar-top" style="margin-bottom: 20px;">
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
                                <div class="div-col-40per">
                                    <div class="isc-screen-row" style="padding-left: 25px;">

                                        <div class="screen-row" style="margin-top: 5px;">
                                            <div class="isc-acc-box-inner-txt">
                                                <p class="isc-f-w-br">Invoice Details</p>

                                                <div class="isc-screen-row">
                                                    <div class="isc-30per">
                                                        <label>Customer Name :  </label>
                                                    </div>
                                                    <div class="isc-70per">
                                                        <span id="spn_custname"> </span> 
                                                    </div>
                                                </div>
                                                <div class="isc-screen-row isc-pad-top-5">
                                                    <div class="isc-30per">
                                                        <label>Invoice Amount :  </label>
                                                    </div>
                                                    <div class="isc-70per">
                                                        <span id="spn_amount"></span>
                                                    </div>
                                                </div>


                                                <div class="isc-screen-row isc-pad-top-5">
                                                    <div class="isc-30per">
                                                        <label>Invoice Date :  </label>
                                                    </div>
                                                    <div class="isc-70per">
                                                       <span id="spn_date"> </span> 
                                                    </div>
                                                </div>

                                                <div class="isc-screen-row isc-pad-top-5">
                                                    <div class="isc-30per">
                                                        <label>Term Code :  </label>
                                                    </div>
                                                    <div class="isc-70per">
                                                        <span id="Spn_termcode"> </span> 
                                                    </div>
                                                </div>


                                            </div>
                                        </div>



                                        <div class="isc-screen-row " style="margin-top: 20px;">
                                            <div class="isc-acc-box-inner-txt isc-mar-top">
                                                <p class="isc-f-w-br">Online Payment</p>



                                            </div>
                                        </div>

                                        <div class="screen-row">
                                            <div class="isc-screen-nav-container-s1">
                                                <ul class="nav nav-tabs">
                                                   <%-- <li class=""><a href="#Tab31" data-toggle="tab">Credit Card</a> </li>--%>
                                                    <li class="active"><a href="#Tab32" data-toggle="tab">Bank Transfer</a> </li>
                                                </ul>
                                            </div>

                                            <div class="screen-row">

                                                <div class="tab-content">

                                                    <div class="tab-pane fade in" id="Tab31">
                                                        <div id="tab-12" class="tab-content2 current2">
                                                            <div class="container" style="width: auto !important;">
                                                                <div id="tab-popup0" class="tab-content2 current2">
                                                                    <div class="screen-row">
                                                                        <div class="isc-50per">
                                                                            <div class="isc-hor-details" style="padding: 0px">
                                                                                <div class="isc-label-name">
                                                                                    <label>Name On Card </label>
                                                                                </div>
                                                                                <div class="isc-detail-name">
                                                                                    <input type="text" class="required" id="planweek" name="planweek" placeholder="Please Enter Name On Card" aria-required="true" value="" readonly="readonly">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="isc-50per">
                                                                            <div class="isc-mar-lft isc-hor-details" style="padding: 0px">
                                                                                <div class="isc-label-name">
                                                                                    <label>Card Number </label>
                                                                                </div>
                                                                                <div class="isc-detail-name">
                                                                                    <input type="text" class="required" id="planweek" name="planweek" placeholder="Please Enter Card Number" aria-required="true">
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div class="screen-row isc-mar-t1">
                                                                        <div class="isc-50per">
                                                                            <div class="isc-hor-details" style="padding: 0px">
                                                                                <div class="isc-label-name">
                                                                                    <label>Expiration </label>
                                                                                </div>
                                                                                <div class="isc-detail-name">

                                                                                    <div class="screen-row">
                                                                                        <div class="isc-45per isc-cus-43">
                                                                                            <input type="text" class="required" id="planweek" name="planweek" placeholder="MM" aria-required="true">
                                                                                        </div>

                                                                                        <div class="isc-10per">
                                                                                            <span style="text-align: center !important; display: inherit; padding-top: 3px; padding-left: 8px;">/ </span>
                                                                                        </div>

                                                                                        <div class="isc-45per  isc-cus-43" style="padding-left: 6px;">
                                                                                            <input type="text" class="required" id="planweek" name="planweek" placeholder="YYYY" aria-required="true">
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="isc-50per">
                                                                            <div class="isc-mar-lft isc-hor-details" style="padding: 0px">
                                                                                <div class="isc-label-name">
                                                                                    <label>CVV </label>
                                                                                </div>
                                                                                <div class="isc-detail-name">
                                                                                    <input type="text" class="required" id="planweek" name="planweek" placeholder="Please Enter CVV" aria-required="true">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="screen-row isc-mar-t1">
                                                                        <div class="isc-50per">
                                                                            <div class="isc-hor-details" style="padding: 0px">
                                                                                <div class="isc-label-name">
                                                                                    <label>Bank Name </label>
                                                                                </div>
                                                                                <div class="isc-detail-name">
                                                                                    <input type="text" class="required" id="planweek" name="planweek" placeholder="Please Enter Bank Name" aria-required="true">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="isc-50per">
                                                                            <p></p>
                                                                        </div>
                                                                    </div>

                                                                    <div class="screen-row">
                                                                        <ul class="isc-popup-entity isc-entity-btn" style="margin-top: 15px; width: 100%;">
                                                                            <li><a id="Paynowaccre" title="Add Project" type="button" class="isc-btn-wrap isc-btn-p1"><i class="fa fa-shopping-bag" aria-hidden="true"></i>Pay $<span id="spn_accpay"></span></a> </li>


                                                                        </ul>
                                                                    </div>
                                                                    <div class="screen-row">
                                                                        <p class="isc-terms">
                                                                            By selecting Pay, I accept the Terms of service and have read and acknowledge the Policy Statement. I also allow to charge
$50.00 to my card on November 21, 2021
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <img src="images/visa2.png" class="isc-visa-img" />
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div class="tab-pane active fade in" id="Tab32">
                                                        <div class="screen-row">
                                                            <div class="isc-50per">
                                                                <div class="isc-hor-details" style="padding: 0px">
                                                                    <div class="isc-label-name">
                                                                        <label>Account Name</label>
                                                                    </div>
                                                                    <div class="isc-detail-name">
                                                                        <input type="text" class="required" id="planweek" name="planweek" placeholder="Please Enter Account Name" value="Benedict" readonly="readonly" aria-required="true">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="isc-50per">
                                                                <div class="isc-mar-lft isc-hor-details" style="padding: 0px">
                                                                    <div class="isc-label-name">
                                                                        <label>Account Number</label>
                                                                    </div>
                                                                    <div class="isc-detail-name">
                                                                        <input type="text" class="required" id="planweek" name="planweek" placeholder="XXX XXXX XXX" aria-required="true" readonly="readonly" value="4dfac073-49b5-44c2-9ee4-d5f58db55f72">
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="screen-row isc-mar-t1">
                                                            <div class="isc-50per">
                                                                <div class="isc-hor-details" style="padding: 0px">
                                                                    <div class="isc-label-name">
                                                                        <label>Re-enter Account Number</label>
                                                                    </div>
                                                                    <div class="isc-detail-name">
                                                                        <input type="text" class="required" id="planweek" name="planweek" placeholder="XXX XXXX XXX" aria-required="true" readonly="readonly" value="4dfac073-49b5-44c2-9ee4-d5f58db55f72">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="isc-50per">
                                                                <div class="isc-mar-lft isc-hor-details" style="padding: 0px">
                                                                    <div class="isc-label-name">
                                                                        <label>Routing Number</label>
                                                                    </div>
                                                                    <div class="isc-detail-name">
                                                                        <input type="text" class="required" id="planweek" name="planweek" placeholder="XXX XXX XXXX" aria-required="true" readonly="readonly" value="021000021">
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>


                                                        <div class="screen-row">
                                                            <ul class="isc-popup-entity isc-entity-btn" style="margin-top: 15px; width: 100%;">
                                                                <li><a id="Paynowacc" title="Pay Now" type="button" class="isc-btn-wrap isc-btn-p1"><i class="fa fa-shopping-bag" aria-hidden="true"></i>Pay $<span id="Spn_payamount"> </span></a> </li>


                                                            </ul>
                                                        </div>
                                                        <div class="screen-row">
                                                            <p class="isc-terms">
                                                                By selecting Pay, I accept the Terms of service and have read and acknowledge the Policy Statement. I also allow to charge
$50.00 to my card on November 21, 2021
                                                            </p>
                                                        </div>
                                                        <img src="images/visa2.png" class="isc-visa-img" />

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
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Frank Abagnale <span style="color: green;">(Approved : $2500 , Balance :$500)</span></h4>
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
                                        <p class="isc-bill-conf-del">Because if the payer click the settle up and record cash payment, it is being considered as the person(being paid who has already settled up from his end once he receive the amount) lent some amount to the person who has to pay due to dual settle up</p>

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
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_comts-rej" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Edward Abbey <span style="color: red !important;">(Rejected)</span></h4>
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
                                        <p class="isc-bill-conf-del">Because if the payer click the settle up and record cash payment, it is being considered as the person(being paid who has already settled up from his end once he receive the amount) lent some amount to the person who has to pay due to dual settle up</p>

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
        </form>
    <script>
        $(document).ready(function () {
            $("#slt-Tags").select2({
                tags: true,
                tokenSeparators: [',', ' ']
            })
        });

    </script>
    <%--<script>
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
    </script>--%>
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
        })
    </script>
    
        </body>
    </html>

