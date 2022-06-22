<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ClientSignup.aspx.cs" Inherits="BillManagement.ClientSignup" %>

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
    <link href="isccssengine/theme/iscglobal.css?v1.0" rel="stylesheet" type="text/css" />
    <link href="isccssengine/lib/timeline.min.css" rel="stylesheet" />
    <link href="isccssengine/lib/uniform.default.css" rel="stylesheet" type="text/css" />


    <link href="isccssengine/theme/iscresponsive.css" rel="stylesheet" type="text/css" />
    <link href="isccssengine/theme/T35Home.css" rel="stylesheet" />
    <link href="scripts/T37-ChartControls/nv.d3.css" rel="stylesheet" />
    <link href="isccssengine/theme/T35responsive.css" rel="stylesheet" />


    <script src="iscjsengine/lib/jquery-1.11.0.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/init.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery.tablesorter.min.js" type="text/javascript"></script>
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
    <script src="iscjsengine/lib/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/select2.full.min.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/fSelect.js"></script>
    <script src="iscjsengine/lib/bootstrap-select.min.js"></script>
    <script src="iscjsengine/lib/daterangepicker.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/notify.js"></script>

    <script src="iscjsengine/lib/init.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/jquery.dataTables.min.js" type="text/javascript"></script>
    <%--<script src="iscjsengine/lib/jquery.tablesorter.min.js" type="text/javascript"></script>--%>
    <script src="iscjsengine/lib/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="iscjsengine/lib/switchzoomscreen.js"></script>
    <script src="iscjsengine/IF2/Library/Ajax.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/ApplicationProperties.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/JsonManipulation.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/Utilities.js" type="text/javascript"></script>
    <script src="iscjsengine/IF2/Library/iscparser.js" type="text/javascript"></script>
    <script src="iscjsengine/PageScript/ServerRequests.js" type="text/javascript"></script>
    <script src="iscjsengine/PageScript/ClientSignup.js"></script>
    <script src="iscjsengine/IF2/Library/countdown.js"></script>

    <%--  Chart include in Application--%>
    <script src="iscjsengine/common/notify.min.js"></script>
    <script src="scripts/FIPControls/jquery.sparkline.js"></script>
    <script src="Scripts/T37-ChartControls/d3.v3.js" type="text/javascript"></script>
    <script src="Scripts/T37-ChartControls/nv.d3.js" type="text/javascript"></script>
    <script src="Scripts/T37-ChartControls/tooltip.js" type="text/javascript"></script>
    <script src="scripts/FIPControls/ISC-dountChart.js"></script>
    <style>
        .invalid {
            background: url(../../img/invalid.png) no-repeat 0 50%;
            padding-left: 22px;
            line-height: 24px;
            color: #ec3f41;
        }

        .valid {
            background: url(../../img/valid.png) no-repeat 0 50%;
            padding-left: 22px;
            line-height: 24px;
            color: #3a7d34;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="isc-app-main-layout-container ">
            <div class="isc-app-main-top-layout-container  hidden-xs hidden-sm">
                <div class="isc-app-top-brand-title-s1">
                    <a id="FullScreenMode">
                        <h3 class="header-logo">ArcBill</h3>
                    </a>
                </div>

                <div class="isc-app-login-cell-s1">
                    <div class="cell-left isc-header-border-lft-drop">
                        <div class="sub-header-right-side-align ">
                        </div>
                    </div>
                    <div class="cell-right ">

                        <%--<a href="#" class="dropdown-toggle" data-toggle="dropdown"></a>
                        <div class="dropdown-menu-s3 " role="menu">
                            <div class="dropdown-menu-inner-con-s3">
                                <div class="screen-row">
                                    <div class="screen-row">
                                        <ul class="dropdown-user">
                                            <li>
                                                <div class="dw-user-box">
                                                    <div class="u-img">
                                                        <h3 class="isc-act-read-list-cell-cir-log-s2 isc-act-read-list-bg-s4 LoggedinUserShortName"></h3>
                                                    </div>
                                                    <div class="u-text">
                                                        <h4 id="LoggedInEmail">Durai Raj</h4>
                                                        <p class="text-muted">
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                            <li role="separator" class="divider"></li>
                                            <li><a href="Login.aspx" id="btn-logout"><i class="fa fa-power-off"></i>Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                    </div>

                    <div class="cell-right mar-rig-15 ">
                    </div>
                    <div class="cell-right  mar-rig-15 pad-top-10 ">
                    </div>

                    <%--<div class="cell-left ">
                         <%--<a class="isc-theme-blue-btn" href="#mp_add-website"  data-toggle="modal" title="Clock In">Clock Out</a>--%>
                    <%-- <a class="isc-hme-hdr-question" title="Add"><i class="fa fa-plus-square"></i>
                        </a>
                        <a class="isc-hme-hdr-question" title="Help "><i class="fa fa-question "></i>
                        </a>
                        <a class="isc-hme-hdr-question" title="Setting " data-toggle="dropdown" data-close-others="true"><i class="fa fa-cog "></i>
                        </a>--%>
                    <%-- <a class="isc-hme-hdr-question" title="Notification " data-toggle="dropdown" data-close-others="true"><i class="icon-bell dropdown-toggle"></i>
                        </a>--%>
                    <%--<div class="dd-isc-hdr-ques-act" role="menu">
                            <ul class="isc-hme-hdr-dd-ques-list">
                                <li><a href="#"><i class="fa fa-comments-o"></i>Provide feedback</a></li>
                                <li><a href="#"><i class="fa fa-desktop "></i>Technical support </a></li>
                            </ul>
                        </div>--%>
                    <%--</div>--%>
                    <%--<h3 class="isc-app-brand-log-s1">John Smith</h3>
                    <h3 class="isc-app-brand-log-s2">
                        <a href="Login.aspx">Logout</a></h3>--%>
                    <%--   <div class="cell-right" id="dynamic_time" style="display: block;">
                    
                </div>--%>
                </div>
                <div class="isc-app-top-menu-nav-s1">
                    <ul class="isc-app-nav-menu-s1">
                    </ul>
                </div>
            </div>
            <div class="visible-xs visible-sm">
                <div class="mobile-logo">
                    <a href="#">
                        <h3 class="header-logo-mobile">Devops</h3>
                    </a>
                </div>
                <nav class="navbar-default">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle home-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse mobi-nav" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right mobile-submenu">
                            <li menu-parent="100"><a href="#">Home</a>
                                <ul menu-child="100" class="isc-app-sub-nav-mobi ">
                                    <li><a href="Home.aspx"><i class=" icon-briefcase"></i>Manager Home</a></li>
                                    <%--  <li><a href="GroupedHome.aspx"><i class=" icon-briefcase"></i>User Home </a></li>--%>
                                </ul>
                            </li>
                            <li menu-parent="101"><a href="#">List</a>

                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="isc-app-main-body-layout-container">
                <div class="isc-app-screen-content-s1">
                    <div class="screen-row">
                        <div class="isc-app-screen-header-container" style="height: 46px;">
                            <div class="div-col-30per">
                                <div class="screen-row">
                                    <div class="isc-page-header">
                                        <i class="fa fa-users"></i>
                                        <h2 style="line-height: 30px;">Admin Signup</h2>
                                        <h6 class="mar-none"></h6>
                                    </div>
                                </div>
                            </div>
                            <div class="div-col-70per">

                                <div class="cell-right pad-lft-med" style="margin-top: 4px !important;">
                                    <a class="isc-theme-blue-btn" href="Login.aspx" title="Cancel">Cancel</a>
                                </div>
                                <div class="cell-right pad-lft-med" style="margin-top: 4px !important;" data-hidesave="true">
                                    <a class="isc-theme-blue-btn" id="mp-resetpassword-submit" title="Save">Save</a>
                                </div>
                                <div class="cell-right pad-lft-med" style="margin-top: 4px !important; display: none;" data-showerr="true">
                                    <p style="color: red;">You have already updated your password!</p>
                                </div>
                                <div class="cell-right pad-lft-med" style="margin-top: 4px !important; display: none;" data-showlink="true">
                                    <p style="color: red;">The URL you are accessing is no longer valid. Please contact your application provider to Sign up into ArcBill!</p>
                                </div>
                            </div>
                        </div>
                        <div class="isc-app-screen-body-container">
                            <div class="screen-row">
                                <div class="isc-app-screen-sec-container-s1 isc-min-ht-s2">
                                    <div class="screen-row">
                                        <div class="screen-row ">
                                            <div class="screen-row">
                                                <div class=" div-col-50per mobi-align-responsive">
                                                    <div>

                                                        <div class="isc-sec-cust-bdy-s1 isc-custom-overwrite-control">
                                                            <div class="screen-row">
                                                                <div class="form-body">
                                                                    <div class="form-group">
                                                                        <label>First Name</label>
                                                                        <div class="">
                                                                            <input type="text" class="form-control" placeholder="First Name" id="txt_Fname" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class=" control-label">
                                                                            Email ID</label>
                                                                        <div class="">
                                                                            <input type="text" class="form-control" placeholder="EmailID" id="txt_emailid" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class=" control-label">
                                                                            Application URL 
                                                                        </label>
                                                                        <div class="">
                                                                            <input type="text" class="form-control" placeholder="URL" id="txt_appurl" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                    <div class="form-group">
                                                                        <label class=" control-label">
                                                                            Enter Password <span class="lbl-mandatory-s2">*</span></label>
                                                                        <div class="">
                                                                            <input type="password" class="form-control" id="txt_Passcode" placeholder="" tabindex="8"/>
                                                                            <div class="clearfix"></div>
                                                                            <span style="color: red; font-size: 12px; display: none;" id="err-passcode">New Password should not be empty</span>
                                                                            <span style="color: red; font-size: 12px; display: none;" id="err-passcodrequire">New Password doesn't meet the requirment</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <h4>Password must meet the following requirements:</h4>
                                                                        <ul>
                                                                            <li id="masterlength" class="invalid">At least <strong>8 characters</strong>—the more characters, the better.</li>
                                                                            <li id="mastercapital" class="invalid">A mixture of both <strong>uppercase and lowercase letters.</strong></li>
                                                                            <li id="masternumber" class="invalid">A mixture of <strong>letters and numbers.</strong></li>
                                                                            <li id="mastercharacters" class="invalid">Inclusion of at least <strong>one special character</strong>, e.g., ! @ # ? ] Note: do not use &lt; or &gt; in your password, as both can cause problems in Web browsers.</li>

                                                                        </ul>
                                                                        <%--<label>* At least 8 characters—the more characters, the better.</label>
                                                                        <label>* A mixture of both uppercase and lowercase letters.</label>
                                                                        <label>* A mixture of letters and numbers.</label>--%>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class=" div-col-50per mobi-align-responsive">
                                                    <div>

                                                        <div class="isc-sec-cust-bdy-s1 isc-custom-overwrite-control">
                                                            <div class="screen-row">
                                                                <div class="form-body">
                                                                    <div class="form-group">
                                                                        <label>Last Name</label>
                                                                        <div class="">
                                                                            <input type="text" class="form-control" placeholder="Last Name" id="txt_Lname" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class=" control-label">
                                                                            Company Name</label>
                                                                        <div class="">
                                                                            <input type="text" class="form-control" placeholder="Company Name" id="txt_Companyname" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class=" control-label">
                                                                            Activation Key <span class="lbl-mandatory-s2">*</span>
                                                                        </label>
                                                                        <div class="">
                                                                            <input type="text" class="form-control" id="txt_activationkey" tabindex="7" placeholder=""/>
                                                                            <div class="clearfix"></div>
                                                                            <span style="color: red; font-size: 11.5px; position: absolute; padding-top: 2px; display: none;" id="err-activationkey">Activation Key should not be empty</span>
                                                                            <span style="color: red; font-size: 11.5px; position: absolute; padding-top: 2px; display: none;" id="err-activationkeymatch">Activation Key is not valid</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                    <div class="form-group">
                                                                        <label class=" control-label">
                                                                            Confirm Password <span class="lbl-mandatory-s2">*</span></label>
                                                                        <div class="">
                                                                            <input type="password" class="form-control" id="txt_ConfirmPasscode" tabindex="9" placeholder="">
                                                                            <div class="clearfix"></div>
                                                                            <span style="color: red; font-size: 12px; display: none;" id="err-cpasscod">Confirm Password should not be empty</span>
                                                                            <span style="color: red; font-size: 12px; display: none;" id="err-cpasscodmatch">New Password and Confirm Password does not match</span>
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

            </div>
            <div class="page-block" id="pageLoader" style="margin-left: 0px; display: none;">
                <div class="preloader-1">
                    <div>
                        Loading
                       
                       
                    </div>
                    <span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span><span class="line line-4"></span><span class="line line-5"></span><span class="line line-6"></span><span class="line line-7"></span><span class="line line-8"></span><span class="line line-9"></span>
                </div>
                <script type="text/javascript">
                    var $loading = $('#pageLoader').hide();
                    </script>
            </div>
            <div class="slds-context-footer-bar">
                <div class="content-foot" title="Copyright © 2021 ArcBill | Archarina Theme. All Rights Reserved.">
                    Copyright © 2021 ArcBill | Archarina Theme. All Rights Reserved.
                </div>
            </div>
        </div>
    </form>
    <script type="text/javascript">
        // Control Screen Scroll
        $(document).ready(function () {
            AdjustScreenBodyHeight();
            $('.nav-tabs').scrollingTabs();
        });
        $(window).resize(function () {
            AdjustScreenBodyHeight();
        });
        var AdjustScreenBodyHeight = function () {
            var $windowHeight = $(window).innerHeight();
            var $menuHeight = $('.isc-app-main-top-layout-container').innerHeight();
            var $screenHeaderHeight = $('.isc-app-screen-header-container').innerHeight();
            var $screenFooterHeight = $('.slds-context-footer-bar').innerHeight();
            var screenBodyPadding = 0; // Screen Body Padding
            var $screenBody = $('.isc-app-screen-body-container');
            $screenBody.css('height', (parseInt($windowHeight) - (parseInt($menuHeight) + parseInt($screenHeaderHeight) + parseInt(screenBodyPadding) + parseInt($screenFooterHeight))) + 'px');
        }
        $(document).on('click', '[menu-parent]', function (e) {
            //e.preventDefault();
            e.stopPropagation();
            var MenuID = parseInt($(this).attr('menu-parent'));
            $('[menu-child]').not('[menu-child="' + MenuID + '"]').hide();
            $('[menu-child="' + MenuID + '"]').toggle();
        });
        $(document).on('click', '#Toggle_Switch', function (e) {
            e.preventDefault();
            var SwitchType = $(this).attr('data-switch');
            if (SwitchType == 'false') {
                $(this).attr('data-switch', true);
                $(this).html('<img src="images/VTS_Logo.png" title="Vendor Team Service" />');
                $(this).removeClass('isc-toggle-button-clr-s2').addClass('isc-toggle-button-clr-s1');
            }
            else {
                $(this).attr('data-switch', false);
                $(this).html('<img src="images/INNOSPIR_Logo.png" title="INNOSPIRE" />');

                $(this).removeClass('isc-toggle-button-clr-s1').addClass('isc-toggle-button-clr-s2');
            }
        });

    </script>
</body>
</html>
