<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PaymentSuccessfull.aspx.cs" Inherits="BillManagement.PaymentSuccessfull" %>

<!DOCTYPE html>
<html style="background-color: #E1E1E1; margin: 0; padding: 0;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="format-detection" content="telephone=no" />
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />

    <!-- disable auto telephone linking in iOS -->
    <title>Archarina  </title>
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
    <link rel="shortcut icon" href="img/rjs-fav.png" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="isccssengine/lib/font-awesome/font-awesome.min.css" rel="stylesheet"
        type="text/css" />
    <link href="isccssengine/lib/simple-line-icons/simple-line-icons.min.css" rel="stylesheet"
        type="text/css" />




    <link href="isccssengine/lib/bootstrap.min.css" rel="stylesheet" type="text/css" />
    

    <link href="isccssengine/lib/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/fSelect.css" rel="stylesheet" />
    <link href="isccssengine/lib/bootstrap-select.min.css" rel="stylesheet" />
   

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
    

    <script src="iscjsengine/lib/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/switchzoomscreen.js"></script>

    <script src="iscjsengine/lib/bootstrap.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    
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
    

    <script src="iscjsengine/lib/Jodit2.js"></script>

    <script src="iscjsengine/common/notify.min.js"></script>
    <script src="iscjsengine/PageScript/PaymentSuccessfull.js"></script>
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
<body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    <form id="form1" runat="server">
        <center style="">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
            <tr>
                <td align="center" valign="top" id="bodyCell">
                    <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="100%" id="emailBody">
                        <!-- MODULE ROW // -->
                        <tr>
                            <td align="center" valign="top">
                                <!-- CENTERING TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- FLEXIBLE CONTAINER // -->
                                            <table border="0" cellpadding="30" cellspacing="0" width="700" class="flexibleContainer">
                                                <tr>
                                                    <td valign="top" width="700" class="flexibleContainerCell" style="padding-top:0 ; padding-bottom: 10px;">
                                                        <!-- CONTENT TABLE // -->
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">

                                                            <tr>
                                                                <td style="padding: 0 15px;">
                                                                    <p style="text-align: left; border-bottom: 5px solid  forestgreen; padding-bottom: 15px;">
                                                                        <img src="https://www.archarina.com/images/arc-logo-blue.png" style="width:160px;" />
                                                                        <span style="float: right; position: relative; top: 21px; font-size: 13px; text-align: right; line-height: 17px; color: #888686; font-family: Arial, Verdana, Helvetica, sans-serif; ">
                                                                            Invoice <span id="spn_invoice"></span><br />
                                                                            <br />
                                                                           <br />
                                                                        </span>
                                                                    </p>
                                                                </td>

                                                            </tr>


                                                        </table>

                                                    </td>
                                                </tr>


                                            </table>
                                            <!-- // FLEXIBLE CONTAINER -->
                                        </td>
                                    </tr>
                                </table>
                                <!-- // CENTERING TABLE -->
                            </td>
                        </tr>
                        <!-- MODULE ROW // -->
                        <tr>
                            <td align="center" valign="top">
                                <!-- CENTERING TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- FLEXIBLE CONTAINER // -->
                                            <table border="0" cellpadding="30" cellspacing="0" width="700" class="flexibleContainer">
                                                <tr>
                                                    <td valign="top" width="700" class="flexibleContainerCell" style="padding-top:0 ; padding-bottom: 10px;">
                                                        <!-- CONTENT TABLE // -->
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">

                                                            <tr>
                                                                <td style="padding: 0 15px;">
                                                                    <p style="text-align: center; font-size: 23px; margin-top: 10px; margin-bottom: 25px; color: #5f5f5f; line-height: 19px; font-family: Arial, Verdana, Helvetica, sans-serif;  color: forestgreen;">
                                                                        Payment successful
                                                                    </p>

                                                                    <p style="text-align: justify; padding: 5px 50px; font-size: 15px; margin-bottom: 0px; margin-top: 20px; color: #888686; line-height: 23px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        Thank you!! Your payment of $<span id="spn_amount"> </span> has been received. Click on the link below to view the invoice.
                                                                    </p>

                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>

                                                                    <!--<p style="text-align: center; font-size: 25px; margin-bottom: 45px; margin-top: 35px; color: #2d2c2c; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <button style="padding: 10px 40px; border-radius: 3px; background-color: forestgreen; border-color: transparent; text-transform: uppercase; color: #fff; ">Update billing information</button>
                                                                    </p>-->
                                                                    <p style="padding: 0 15px; text-align: left; font-size: 14px; margin-bottom: 5px; margin-top: 50px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block;"> </span><span>Invoice #  : <span id="span_invoiceno"></span> <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>
                                                                    <p style="padding: 0 15px; text-align: left; font-size: 14px; margin-bottom: 5px; margin-top: 0px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block; "> </span><span>Paid Amount :<span id="span_amount"></span> <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>
                                                                    <p style="padding: 0 15px; text-align: left; font-size: 14px; margin-bottom: 5px; margin-top: 0px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block; "> </span><span>Due Date : <span id="spn_invoicedate"></span> <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>
                                                                    <p style="padding: 0 15px; text-align: left; font-size: 14px; margin-bottom: 5px; margin-top: 0px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block; "> </span><span>Transaction ID :<span id="spn_trid"> </span> <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>
                                                                    <p style="padding: 0 15px; text-align: left; font-size: 14px; margin-bottom: 5px; margin-top: 0px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block; "> </span><span>Invoice Status : Payment Completed <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>

                                                                    <%--<p style="text-align: center; font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; margin-top: 10px; color: #2d2c2c; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                    </p>--%>
                                                                    </td>
                                                                </tr>

                                                            <td>

<table border="0" cellpadding="30" cellspacing="0" width="700" class="flexibleContainer" style="margin-top:10px">



<tr>
<td style="width:30% ;color:#888686;font-size: 15px; border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc; margin-bottom: 0px; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top">
Description
</td>
<td style="width:30%;color:#888686;text-align:center; border-bottom: 1px solid #cccccc;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; ; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top;text-align:center">
Unit Price
</td>

    <td style="width:30%;color:#888686;text-align:center; border-bottom: 1px solid #cccccc;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; ; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top;text-align:center">
Quantity
</td>
<td style="width:20%;color:#888686;text-align:right;border-bottom: 1px solid #cccccc;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; margin-top: 10px; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top">
Amount
</td>


</tr>


    <tbody id="tbl-invoice">
</tbody>

</table>
</td>
</tr>
                                                <tr>
                                                    <td>
                                                        
                                                                    <p style="padding: 0px; text-align: right; font-size: 14px; margin-bottom: 65px; margin-top: 0px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block; width: 20%;"></span><span style="display: inline-block; width: 61%;"> </span><span >Total : <i class="fa fa-dollar"></i><span id="span_total"></span> <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>
                                                    </td>
                                                </tr>


                                                                    <%--<table class="isc-ddp-hdn-lst">
                        <thead>
                            <tr style="cursor:context-menu !important;">

                              
                                 <th style="width: 13%;cursor:context-menu !important;" class="header" title="">Description 
                                </th>
                                <th style="width: 13%;cursor:context-menu !important;" class="header" title="Unit Price">Unit Price 
                                </th>

                                <th style="width: 21%;cursor:context-menu !important;" title="Amount" class="header">Amount

                                </th>
                            </tr>
                        </thead>
                        <tbody id="tbl-invoice">
                        </tbody>
                    </table>--%>
                                                                 
                                                                   
                                                                    <%--<p style="padding: 0 15px; text-align: left; font-size: 14px; margin-bottom: 65px; margin-top: 0px; color: #888686; line-height: 26px; font-family: Arial, Verdana, Helvetica, sans-serif;">
                                                                        <span style="display: inline-block; width: 20%;"></span><span style="display: inline-block; width: 61%;"> </span><span>Total : $<span id="span_total"></span> <!--<span style="padding-left:20px;"></span>--></span>
                                                                    </p>--%>
                                                          

                                                        </table>

                                                    </td>
                                                </tr>


                                            </table>
                                            <!-- // FLEXIBLE CONTAINER -->
                                        </td>
                                    </tr>
                                </table>
                                <!-- // CENTERING TABLE -->
                            </td>
                        </tr>

                        <!-- // MODULE ROW -->



                    </table>

                    <!-- // END -->
                    <!-- EMAIL FOOTER // -->
                    <!--
                        The table "emailBody" is the email's container.
                        Its width can be set to 100% for a color band
                        that spans the width of the page.
                        -->
                </td>
            </tr>
        </table>
    </center>
    </form>
</body>
</html>
