<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="APAgingDetailReport.aspx.cs" Inherits="BillManagement.APAgingDetailReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <style>
          .form-control {
              width:200px !important;
          }

        table.dataTable thead th, table.dataTable thead td {
    padding: 10px 10px;
    border-bottom: 1px solid #DCDDDD;
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
    <div class="isc-app-main-body-layout-container">
        <div class="isc-app-screen-content-s1">
            <div class="screen-row">
                <div class="isc-app-screen-header-container" style="height: 46px;">
                    <div class="screen-row">
                    <div class="div-col-30per">
                        <div class="screen-row">
                            <div class="isc-page-header">
                                <i class="fa fa-file"></i>
                                <h2 style="line-height: 30px;">AP Aging Detailed Report</h2>
                                <h6 class="mar-none"></h6>
                            </div>
                        </div>
                    </div>
                    <div class="div-col-70per">
                        <div class="cell-right">
                            <div class="align-right  pad-rig-5 " >

                                <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                            </div>
                        </div>
                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                            <a class="isc-theme-blue-btn" id="Btn_export" style="color:#fff !important" href="#" title="Export">Export</a>

                        </div>
                    </div>
                        </div>
                    
                </div>

                <div class="isc-app-screen-body-container" style="height: 154px;">
                    <div class="isc-app-screen-sec-container-s1 ">
                        <div class="screen-row">
                        <div class="isc-filter-container isc-h-53" id="isc-filter-container" style="">
                                <div class="screen-row">
                                    <div class="div-col-80per">
                                    <div class="cell-left  ">
                                        <select class="form-control select2 select2-hidden-accessible" id="dl_vendor" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Vendor Name</option>


                                        </select>
                                    </div>


                                    <div class="cell-left pad-lft-15">
                                        <input type="text" class="form-control" id="Daterangepicker" placeholder="Choose Invoice date" value="04/01/2021 - 05/01/2021 ">
                                    </div>

                                    <div class="cell-left  pad-lft-15">
                                        <select class="form-control select2 select2-hidden-accessible" id="dl_paymentterm" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Payment Terms</option>
                                        </select>
                                    </div>


                                    <div class="cell-left  pad-lft-15">
                                        <input type="text" class="form-control isc-mb-res-txt-box" id="txt_balanceamt" placeholder="Enter Balance Amount"/>
                                    </div>

                                    </div>
                                    <div class="div-col-20per">
                                    <div class="cell-left">
                                    <div class="isc-filter-search isc-go  mar-lft-10 isc-vnd-flt" title="Search" id="Btn_serch">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset" id="btn_Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
                                        </div>
                                        </div>
                                </div>


                                <div class="isc-filter-container-close" id="isc-filter-container-close" title="Close">
                                    <a><i class="fa fa-times"></i></a>
                                </div>

                            </div>
                    </div>
                        <div class="screen-row ">
                            
                            <div id="exp-lst-view">
                                <div class="isc-screen-nav-container-s1 ">
                                    <ul class="nav nav-tabs isc-tab-brd-cont" style="position: relative;">

                                        <li class="active"><a href="#Tab1" data-toggle="30">Aging Category(1-30 days)					</a></li>
                                        <li class=""><a href="#Tab2" data-toggle="60">Aging Category(31-60 days)						</a></li>
                                        <li class=""><a href="#Tab3" data-toggle="90">Aging Category(61-90 days)</a></li>
                                        <li class=""><a href="#Tab4" data-toggle="100">Aging Category(&gt;90 days)</a></li>

                                    </ul>
                                </div>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="Tab1">



                                        <div class="screen-row">
                                            <div class="isc-lst-scrl-cont">
                                            <table class="isc-table-read-optimal prog-lbl-col" id="tbl_Agingdetailed">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 14.2%;"  title="Vendor Name">
                                                            <h2>Vendor Name</h2>
                                                        </th>
                                                        <th style="width: 14.2%;"  title="Invoice Date">
                                                            <h2>Invoice Date
                                                            </h2>
                                                        </th>
                                                        <th style="width: 14.2%;" title="Bill#">
                                                            <h2>Bill#</h2> 
                                                            
                                                        </th>
                                                        <th style="width: 13.2%;" title="Payment Terms">
                                                            <h2>Payment Terms

                                                            </h2>
                                                        </th>
                                                        <th style="width: 13.2%;" title="Due Date">
                                                            <h2>Due Date	

                                                            </h2>
                                                        </th>
                                                        <th style="width: 12.2%" title="Aging Days">
                                                            <h2>Aging Days
                                                            </h2>
                                                        </th>
                                                        <th style="width: 17.2%;" title="Balance Amount">
                                                            <h2>Balance Amount
                                                            </h2>
                                                        </th>
                                                        
                                                    </tr>
                                                </thead>
                                               <tbody></tbody>
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
                                RegisterDatepicker1();
                               // $('#dapicker').datepicker();
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
                            var RegisterDatepicker1 = function () {
                                FilterStartDate1 = '01/01/2000';
                                FilterEndDate1 = '01/01/2025';
                                $('#Daterangepicker1').daterangepicker({
                                    startDate: moment(FilterStartDate1),
                                    endDate: moment(FilterEndDate1),
                                    ranges: {
                                        'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                                        'Today': [moment(), moment()],
                                        'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }
                                }, SetSwapDateRange);
                                SetSwapDateRange(moment(FilterStartDate1), moment(FilterEndDate1));
                                $('#Daterangepicker1').on('apply.daterangepicker', function (ev, picker) {
                                    FilterStartDate1 = moment(picker.startDate).format('MM/DD/YYYY');
                                    FilterEndDate1 = moment(picker.endDate).format('MM/DD/YYYY');
                                });
                            }
                            function SetSwapDateRange(start, end) {
                                if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                                    && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                                ) {
                                    $('#Daterangepicker1 span').html('<span class="isc-label-question-s1"></span> Any Date');
                                }
                                else {
                                    $('#Daterangepicker1 span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
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

    </div>
    <script src="iscjsengine/PageScript/APAgingDetailReport.js"></script>
</asp:Content>
