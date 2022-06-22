<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ApproverHome.aspx.cs" Inherits="BillManagement.ApproverHome" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="scripts/FIPControls/ISC-StackedBarChart.js"></script>
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
            <div class="div-col-70per">
                <div class="cell-right">
                    <%-- <div class="align-right mar-top-3">
                    <a class="isc-theme-blue-btn" id="filter-toggle-btn1" title="Group By"><i class="fa fa-clipboard"></i></a>
                    <a class="isc-theme-blue-btn" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>--%>
                </div>
                <div class="cell-right pad-rig-5 mar-top-10">

                    <%--<a class="isc-theme-blue-btn" href="UploadBills.aspx"><i class="fa fa-plus"></i></a>--%>
                </div>




            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="isc-manger-home-par-con-s1">

                            <ul class="isc-hme-sec-kpi-nav-s1">

                                <li><a href="#" title="Total Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s2">
                                            <i class="fa fa-bar-chart-o"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Total Bills/Invoice

                                        </h3>


                                        <h2 id="total-Invoice-amount">$4,500
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s3" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Unapproved Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s1">
                                            <i class="fa fa-exclamation-circle"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Unapproved Bills/Invoice

                                        </h3>


                                        <h2 id="unapproved-Bill-amount">$2,000
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s4" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Approved Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s4">
                                            <i class="fa fa-check"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Approved Bills/Invoice

                                        </h3>


                                        <h2 id="approved-bill-amount">$1,500 
                                        </h2>

                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-list-progress-act-s1" style="width: 100%;">
                                            <div class="isc-list-progress-act-s2 isc-hme-kpi-tile-bar-pro-s5" style="width: 45%;">
                                            </div>
                                        </div>
                                    </div>

                                </a></li>
                                <li><a href="#" title="Rejected Bills/Invoice">
                                    <div class="screen-row">
                                        <div class="isc-hme-sec-kpi-nav-cir-icon isc-nav-kpi-cir-bg-s3">
                                            <i class="fa fa-times"></i>
                                        </div>
                                    </div>
                                    <div class="screen-row">

                                        <h3>Rejected Bills/Invoice

                                        </h3>


                                        <h2 id="rejected-bill-amount">$1,000
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
                                            <h3>Approval Status<span></span></h3>
                                        </div>
                                        <div class="chart-section-inner-container isc-chrt-sec-bdy-scroll" id="aging_chart" style="min-height:420px;max-height:460px;">
                                            <script type="text/javascript">

                                             

                                            </script>
                                            <svg id="StackedBarChartModalPay" class="ht-280" style="height:420px;"></svg>
                                        </div>

                                    </div>
                                </div>
                        <div class="div-col-60per pad-lft-15">
                            <div class="chart-section-container">
                                        <div class="chart-section-header-container">
                                            <h3 id="unApproved-Tbl-KPI">Unapproved Bills / Invoice ($7500)<span></span></h3>
                                        </div>
                                         <div class="chart-section-inner-container isc-chrt-sec-bdy-scroll" style="min-height:400px !important;max-height:450px;">
                                             <table class="isc-table-read-optimal isc-table-sorter-s1" id="tbl-Unapproved">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 30%;" class="header"  sort-column-Type="text" column-Name="VendorName"  data-sort="VendorName">Vendor
                                                        </th>
                                                        <th style="width: 20%;" class="header" sort-column-Type="number" column-Name="BillID"  data-sort="BillID">Bills / Invoice
                                                        </th>
                                                        <th style="width: 15%;" class="header" sort-column-Type="date" column-Name="DueDate"  data-sort="DueDate">Due Date
                                                        </th>
                                                        <th style="width: 20%;" class="header" sort-column-Type="float" column-Name="Balance"  data-sort="Balance"><center>Payable Amount ($)</center>
                                                        </th>
                                                        <th style="width: 15%;" class="" ><center>Action</center>
                                                        </th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody id="tbl-unApproved-body">

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
      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_attach" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="fileName">Passmoregas.pdf</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color:#8A8A8A;" id="attachment-close" title="Close" data-dismiss="modal" aria-hidden="true"></i></a>
                           <%-- <button type="button" class="close img-typ-sq" id="attachment-close" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:450px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                          <div class="isc-sec-in-con-y-scroll-con-s1">
                                                        <div class="isc-sec-in-con-y-scroll-bdy-con-s2" id="attachment-Block">
                                                            <%--<iframe src="gasDefault.pdf" class="isc-new-exp-pdf" style="border: none; width: 100%; height: 400px; overflow: hidden; overflow-y: auto;"></iframe>--%>
                                                        </div>
                                                    </div>
                                    </div>

                                </div>
                               
                               
                               
                           
                            </div>

                        </div>


                    </div>

                </div>
              <%--  <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                            Add</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>--%>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script src="iscjsengine/PageScript/ApproverHome.js"></script>
</asp:Content>
