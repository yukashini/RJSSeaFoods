<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="VendorBalanceReport.aspx.cs" Inherits="BillManagement.VendorBalanceReport_aspx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <style>
          .isc-filter-container
          {
              height:60px;
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
#Daterangepicker{
    width:200px;
}
#Daterangepicker1{
    width:200px;
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
                        <h2 style="line-height: 30px;">Vendor Balance Report</h2>
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
                <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                       <a class="isc-theme-blue-btn" id="Btn_export" href="#" style="color:#fff !important" title="Export">Export</a>
                   
                </div>
            </div>
                </div>
            
        </div>
  
        <div class="isc-app-screen-body-container" style="height: 149px;">
       <div class="isc-app-screen-sec-container-s1 ">
                    
                
                    <div class="screen-row ">
                             
                                  <div class="screen-row ">
                            <div class="isc-filter-container isc-h-53 " id="isc-filter-container" style="display: none;">
     <div class="screen-row">
         <div class="div-col-80per">
                        <div class="cell-left  ">
                            <select class="form-control select2 select2-hidden-accessible" id="dl_vendor" tabindex="-1" aria-hidden="true">
                                <option value="0">Choose Vendor Name</option>
                                
                            </select>
                          </div>
                      <div class="cell-left pad-lft-15">
              <input type="text" class="form-control isc-mb-res-txt-box" id="Daterangepicker" placeholder="MM/DD/YYYY - MM/DD/YYYY" value="04/01/2021 - 05/01/2021 ">
                    </div>
                                <div class="cell-left pad-lft-15">
              <input type="text" class="form-control isc-mb-res-txt-box" id="Daterangepicker1" placeholder="MM/DD/YYYY - MM/DD/YYYY" value="04/01/2021 - 05/01/2021 ">
                    </div>
            <div class="cell-left pad-lft-15">
                            <input type="text" id="txt_Billamt" class="form-control isc-mb-res-txt-box" placeholder="Enter Billable Amount"/>

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
                        <div class="isc-filter-container-close" id="isc-filter-container-close" title="Close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
             </div>
                                </div>
                                    </div>
                          
                      
                    </div>
                                    <div class="screen-row ">
                                         <div class="isc-lst-scrl-cont">
                                        <table id="tbl_vendorbalance" class="isc-table-read-optimal prog-lbl-col">
                                            <thead>
                                                <tr>
                                                    <th style="width: 8%;"  title="Vendor Name">
                                                        <h2>Vendor Name</h2>
                                                    </th>
                                                    <th style="width: 12%;"  title="Total Billable Amount">
                                                        <h2>Total Billable Amount	

                                                        </h2>
                                                    </th>
                                                    <th style="width:10%;"  title="Total Paid Amount">
                                                        <h2>Total Paid	Amount

                                                        </h2>
                                                    </th>
                                                    <th style="width: 12%;"  title="Overdue Bills Amount">
                                                        <h2>Overdue Bills Amount
                                                               

                                                        </h2>
                                                    </th>
                                                     <th style="width: 10%;"  title="Payable Amount">
                                                        <h2>Payable Amount	



                                                        </h2>
                                                    </th>
                                                     <th style="width: 10%;"  title="Last Payment">
                                                        <h2>Last Payment
	



                                                        </h2>
                                                    </th>
                                                       <th style="width: 8%;"  title="Next Due In">
                                                        <h2>Next Due In

	



                                                        </h2>
                                                    </th>
                                                       <th style="width: 13%;"  title="Preferred Payment Method">
                                                        <h2>Preferred Payment Method			


	



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
    <script>
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });
    </script>
    <script>
        $(document).ready(function () {
           RegisterDatepicker();
           RegisterDatepicker1();
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
         </div>

                </div>

            </div>
    <script src="iscjsengine/PageScript/VendorBalanceReport.js"></script>
</asp:Content>
