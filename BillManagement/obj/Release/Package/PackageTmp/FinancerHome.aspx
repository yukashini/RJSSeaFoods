<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="FinancerHome.aspx.cs" Inherits="BillManagement.FinancerHome" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="scripts/FIPControls/ISC-HorizontalBarChart.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-home"></i>
                        <h2 style="line-height: 30px;">Home</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right">
                    <%-- <div class="align-right mar-top-3">
                    <a class="isc-theme-blue-btn" id="filter-toggle-btn1" title="Group By"><i class="fa fa-clipboard"></i></a>
                    <a class="isc-theme-blue-btn" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>--%>
                </div>
                <div class="cell-right pad-rig-5 mar-top-10">

              <%--      <a class="isc-theme-blue-btn" href="UploadBills.aspx"><i class="fa fa-plus"></i></a>--%>
                </div>




            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="isc-manger-home-par-con-s1">

                            <ul class="isc-hme-sec-kpi-nav-s1">

                                <li><a href="#" title="Outstanding Payments">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s2">
                                            <i class="fa fa-bar-chart-o"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Outstanding Payments
                                        </h3>


                                        <h2 id="Out-Standing-Amount">$0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s3" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Overdue Payments">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s1">
                                            <i class="fa fa-exclamation-circle"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Overdue Payments
                                        </h3>


                                        <h2 id="Over-Due-Amount">$0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s4" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Unpaid Payments">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s3">
                                            <i class="fa fa-times"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Unpaid Payments
                                        </h3>


                                        <h2 id="Un-Paid-Amount">$0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s5" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Due This week">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s5">
                                            <i class="fa fa-clock-o"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Due This week
                                        </h3>


                                        <h2 id="Due-Week-Amount">$0
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s6" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>

                            </ul>
                        </div>
                    </div>
                     <div class="screen-row mar-top-10">
                        <div class="div-col-40per tab-align-responsive">
                                    <div class="chart-section-container">
                                        <div class="chart-section-header-container">
                                            <h3>Invoice By Status<span></span></h3>
                                        </div>
                                        <div class="chart-section-inner-container isc-chrt-sec-bdy-scroll" id="aging_chart"  style="min-height:420px;max-height:460px;">
                                            <script type="text/javascript">
                                               
                                            </script>
                                            <svg id="HorizontalStackedBarChartModel5"  style="height:420px;"></svg>

                                        </div>

                                    </div>
                                </div>
                         <div class="div-col-60per pad-lft-15">
                            <div class="chart-section-container">
                                        <div class="chart-section-header-container">
                                            <h3>Top Invoices By Payment Due<span></span></h3>
                                        </div>
                                         <div class="chart-section-inner-container isc-chrt-sec-bdy-scroll" style="min-height:440px !important;max-height:450px;">
                                             <table class="isc-table-read-optimal isc-table-sorter-s1" id="approved-Bill-Table">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 26%;" class="header" sort-column-Type="text" column-Name="VendorName"  data-sort="VendorName">Vendor
                                                        </th>
                                                        <th style="width: 16%;" class="header" sort-column-Type="number" column-Name="BillID"  data-sort="BillID">Bills / Invoice #
                                                        </th>
                                                        <th style="width: 13%;" class="header" sort-column-Type="date" column-Name="DueOn"  data-sort="DueOn">Due Date
                                                        </th>
                                                         <th style="width: 15%;" class="header" sort-column-Type="text" column-Name="PaymentTermsName"  data-sort="PaymentTermsName">Payment Terms
                                                        </th>
                                                        <th style="width: 20%;" class="header" sort-column-Type="number" column-Name="ApprovedAmount"  data-sort="ApprovedAmount"><center>Approved Amount ($)</center>
                                                        </th>
                                                        
                                                        <th style="width: 10%;" class=""><center>Action</center>
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody id="Approved-Table-Body">
                                                   
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
      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_flag" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Flag</h4>
                        </div>
                        <div class="cell-right">
                             <a><i class="fa fa-times" style="color:#8A8A8A;" hide-pop-up="true"  title="Cancel"  flag-cancel="true" aria-hidden="true"></i></a>
                           <%-- <button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  flag-cancel="true" aria-hidden="true">
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
                                        <h4>Are you sure want to flag the bill?</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-flag-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" flag-cancel="true"  id="close-flag-pop" >
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script src="iscjsengine/PageScript/FinancerHome.js"></script>
</asp:Content>
