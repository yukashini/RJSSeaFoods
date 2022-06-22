<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="PaymentStatusReport.aspx.cs" Inherits="BillManagement.PaymentStatusReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <style>
       .isc-table-read-optimal th h2 {
           width:90% !important;
       }
       @media only screen and (max-width: 767px) {
           .form-control {
               font-size: 12px !important;
               margin-top: 5px !important;
               width: 200px !important;
           }
           .mar-top-10
           {
               margin-top:0px !important;
           }
       }
       .isc-filter-container .select2-container {
    /*width: 186px !important;*/
    z-index: 9999 !important;
}
       table.dataTable thead th, table.dataTable thead td
       {
           padding:10px 10px !important;
       }
       table.dataTable thead .sorting:last-child
{
     background-image: url(../../img/sorting-icons/sort_both.png);
}
table.dataTable thead .sorting_asc:last-child
{
     background-image: url(../../img/sorting-icons/sort_asc.png);
}
table.dataTable thead .sorting_desc:last-child
{
       background-image: url(../../img/sorting-icons/sort_desc.png);
}
       </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="isc-app-main-layout-container ">

        <%--<div class="visible-xs visible-sm">
            <div class="mobile-logo">
                <a href="#">
                    <h3 class="header-logo-mobile">ArcBill</h3>
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
                                <li><a href="UserHome.aspx"><i class=" icon-briefcase"></i>User Home</a></li>
                                <li><a href="ApproverHome.aspx"><i class=" icon-briefcase"></i>Approver Home</a></li>
                                <li><a href="FinanacerHome.aspx"><i class=" icon-briefcase"></i>Finance Manager</a></li>
                            </ul>
                        </li>
                        <li menu-parent="101"><a href="BillsOrInvoiceList.aspx">Bills / Invoice</a>

                        </li>
                        <li menu-parent="102"><a href="ApporvalSummaryList.aspx">Approvals</a>

                        </li>
                        <li menu-parent="102"><a href="#">Payment</a>
                            <ul menu-child="100" class="isc-app-sub-nav-mobi ">
                                <li><a href="AccountsPayable.aspx"><i class=" icon-briefcase"></i>Account Payable</a></li>
                                <li><a href="PaymentSummary.aspx"><i class=" icon-briefcase"></i>Payment Summary</a></li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>--%>
        <div class="isc-app-main-body-layout-container">
            <div class="isc-app-screen-content-s1">

                <div class="screen-row">
                    <div class="isc-app-screen-header-container" style="height: 100px;">
                        <div class="screen-row">
                        <div class="div-col-30per">
                            <div class="screen-row">
                                <div class="isc-page-header">
                                    <i class="fa fa-file"></i>
                                    <h2 style="line-height: 30px;">Bill Payment Report</h2>
                                    <h6 class="mar-none"></h6>
                                </div>
                            </div>
                        </div>
                        <div class="div-col-70per">
                            <div class="cell-right">
                                <div class="align-right pad-rig-5 " >

                                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                                </div>
                            </div>
                            <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                                <a class="isc-theme-blue-btn" id="Btn_export" href="#" style="color:#fff !important">Export</a>

                            </div>
                        </div>
                            </div>
                        
                    </div>

                    <div class="isc-app-screen-body-container" style="height: 183px;">
                        <div class="isc-app-screen-sec-container-s1 ">
                            <div class="screen-row ">
                                <div class="screen-row">
                            <div class="isc-filter-container isc-h-53 " id="isc-filter-container" style="display: none;">
                                    <div class="screen-row">
                                        <div class="div-col-80per">
                                            <div class="screen-row">
                                        <div class="cell-left  ">
                                            <select class="form-control select2 select2-hidden-accessible" id="dl_Vendor" tabindex="-1" aria-hidden="true">
                                                <option value="0">Choose Vendor Name</option>
                                            </select>
                                        </div>
                                        <div class="cell-left pad-lft-15">
                                            <input type="text" class="form-control isc-mb-res-txt-box" id="txt_BillNo" placeholder="Enter Bill#" />
                                        </div>
                                        <div class="cell-left pad-lft-15">
                                            <input type="text" class="form-control" id="txt_Transaction" placeholder="Enter Transaction Id" autocomplete="off"/>
                                            <%--<input type="text" class="form-control" autocomplete="off" id="txt_Transaction" placeholder="Enter Transaction ID"/>--%>
                                            <%--<input type="text" class="form-control" autocomplete="off" id="txt_Transaction1" placeholder="Enter Transaction ID"/>--%>
                                        </div>
                                            <div class="cell-left pad-lft-15 ">
                                            <select class="form-control select2 select2-hidden-accessible" id="dl_Mode" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Payment Mode</option>
                                            </select>
                                        </div>
                                        <div class="cell-left pad-lft-15">
                                            <select class="form-control select2 select2-hidden-accessible" id="dl_Status" tabindex="-1" aria-hidden="true">
                                                <option value="0">Choose Status</option>
                                            </select>
                                        </div>
                                                </div>
                                        <div class="screen-row  mar-top-10">

                                        
                                           <div class="cell-left ">
                                            <select class="form-control select2 select2-hidden-accessible" id="dl_PaidBy" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Paid By</option>
                                            </select>
                                        </div>
                            <div class="cell-left pad-lft-15 ">
                                    <input type="text" class="form-control iscdatpkrwdt iscdatepicker" id="txt-DueRange" placeholder="Choose Paid On Range" />
                                </div>
                                        
                                    </div>
                                            </div>
                                        <div class="div-col-20per">
                                     <div class="cell-left">
                                       <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="Btn_serch">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset" id="btn_Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
                                        </div>

                                        </div>


                                    </div>
                                    


                                    <div class="isc-filter-container-close" id="isc-filter-container-close">
                                        <a><i class="fa fa-times" title="Close"></i></a>
                                    </div>
                                </div>
                        </div>
                            </div>

                            <div class="screen-row ">
                                <div class="screen-row">

                                    <div class="screen-row mar-top-min ">
                                        <div class="isc-lst-scrl-cont">
                                        <table class="isc-table-read-optimal prog-lbl-col" id="tbl-PaymentStatus">
                                            <thead>
                                                <tr>
                                                    <th style="width: 12%;" title="Vendor Name">
                                                        <h2>Vendor Name</h2>
                                                    </th>
                                                    <th style="width: 7%;" title="Bill#">
                                                        <h2>Bill#	


                                                        </h2>
                                                    </th>
                                                    <th style="width: 17%;" title="Total Billable Amount">
                                                        <h2>Total Billable Amount 			

                                                        </h2>
                                                    </th>
                                                    <th style="width: 10%;" title="Total Paid">
                                                        <h2>Total Paid	

                                                        </h2>
                                                    </th>
                                                    <th style="width: 10%;" title="Balance">
                                                        <h2>Balance	


                                                        </h2>
                                                    </th>
                                                    <th style="width: 10%;" title="Transaction ID">
                                                        <h2>Transaction ID		



                                                        </h2>
                                                    </th>
                                                    

                                                    <th style="width: 8%;" title="Paid By">
                                                        <h2>Paid By				
                                                        </h2>
                                                    </th>
                                                    <th style="width: 10%;" title="Paid On">
                                                        <h2>Paid On	
				


	



                                                        </h2>
                                                    </th>

                                                    <th style="width: 12%;" class="header" title="Payment Mode">
                                                        <h2>Payment Mode			
                                                        </h2>
                                                    </th>
                                                    <th style="width: 13%;" class="header" title="Status">
                                                        <h2>Status	
			
                                                        </h2>
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
                    <script>
                        $(document).ready(function () {
                            RegisterDatepicker();
                            $('#dapicker').datepicker();
                        });

                        var FilterStartDate = '01/01/2000';
                        var FilterEndDate = '01/01/2025';
                        var RegisterDatepicker = function () {
                            FilterStartDate = '01/01/2000';
                            FilterEndDate = '01/01/2025';
                            $('#Daterangepicker').daterangepicker({
                                startDate: moment(FilterStartDate),
                                endDate: moment(FilterEndDate),
                                ranges: {
                                    'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                                    'Today': [moment(), moment()],
                                    'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],


                                }
                            }, SetSwapDateRange);
                            SetSwapDateRange(moment(FilterStartDate), moment(FilterEndDate));
                            $('#Daterangepicker').on('apply.daterangepicker', function (ev, picker) {
                                FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
                                FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
                            });
                        }
                        function SetSwapDateRange(start, end) {
                            if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                                && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                            ) {
                                $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> Any Date');
                            }
                            else {
                                $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
                            }

                        }
                    </script>
                    <script>
                        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
                            $('#isc-filter-container').toggle();
                        });
                        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
                            $('#isc-filter-container1').toggle();
                        });
                    </script>
                </div>
            </div>

        </div>

    </div>
   <script type="text/javascript">
       jQuery(document).ready(function () {
           Metronic.init();
           Layout.init();
           ISCUtility.MenuState();
           //            ComponentsDropdowns.init();
       });
   </script>
    <%--<script type="text/javascript">
        // Control Screen Scroll
        $(document).ready(function () {
            AdjustScreenBodyHeight();
            //$('.nav-tabs').scrollingTabs();
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

    </script>--%>
    <script src="iscjsengine/PageScript/PaymentStatusReport.js"></script>
   
    <script src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>

</asp:Content>
