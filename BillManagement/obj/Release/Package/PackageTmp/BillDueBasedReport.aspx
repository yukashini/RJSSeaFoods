<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="BillDueBasedReport.aspx.cs" Inherits="BillManagement.BillDueBasedReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>

         @media only screen and (max-width: 767px) {
          
           .mar-top-10
           {
               margin-top:0px !important;
           }
       }
        .form-control {
            
            width: 200px !important;
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

.isc-app-screen-body-container{
    overflow-y:auto;
  
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
                                <h2 style="line-height: 30px;">Unpaid Bills Report</h2>
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
                           
                            <a  class="isc-theme-blue-btn" id="Btn_export" href="#" style="color:#fff !important" title="Export">Export</a>

                        </div>
                    </div>
                        </div>
                    
                </div>

                <div class="isc-app-screen-body-container" style="height: 149px;">
                    <div class="isc-app-screen-sec-container-s1 ">
                        
                        <div class="screen-row ">
                            <div class="screen-row">
                                <div class="screen-row">
                        <div class="isc-filter-container isc-h-53 " id="isc-filter-container" style="">
                                <div class="screen-row">
                                    <div class="div-col-80per">
                                    <div class="screen-row">
                                    <div class="cell-left  ">
                                        <select class="form-control select2 select2-hidden-accessible" id="dl_vendor" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Vendor Name
                                            </option>
                                        </select>
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <input type="text" class="form-control isc-mb-res-txt-box" id="Due-date" placeholder="Enter Due In Days">
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <input type="text" class="form-control" id="Daterangepicker" placeholder="Choose Invoice date" value="04/01/2021 - 05/01/2021 ">
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <input type="text" class="form-control" id="Daterangepicker1" placeholder="Choose Due Date" value="04/01/2021 - 05/01/2021 ">
                                    </div>
                                    <div class="cell-left  pad-lft-15">
                                        <select class="form-control select2 select2-hidden-accessible" id="dl_apstatus" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Approval Status</option>
                                        </select>
                                    </div>
                                        </div>
                                    <div class="screen-row  mar-top-10">


                                    <div class="cell-left ">
                                        <select class="form-control select2 select2-hidden-accessible" id="dl_paymentstatus" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Payment Status</option>
                                        </select>
                                    </div>
                                    

                                </div>
                                        </div>
                                    <div class="div-col-20per">
                                    <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="Btn_serch">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset" id="btn_Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
                                        </div>
                                </div>
                                


                                <div class="isc-filter-container-close" id="isc-filter-container-close">
                                    <a><i class="fa fa-times" title="Close"></i></a>
                                </div>
                            </div>
                    </div>
                                <div class="screen-row mar-top-min" >
                                     <div class="isc-lst-scrl-cont">
                                    <table class="isc-table-read-optimal prog-lbl-col" id="tbl_UnpaidbillList" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th style="width: 10%;" title="Vendor Name">
                                                    Vendor Name
                                                </th>
                                                <th style="width: 10%;" title="Bill#">
                                                    <h2>Bill#	


                                                    </h2>
                                                </th>
                                                <th style="width: 10%;" title="Invoice Date">
                                                    <h2>Invoice Date 
	



                                                    </h2>
                                                </th>
                                                <th style="width: 10%;" title="Due Date">
                                                    <h2>Due Date
                                                    </h2>
                                                </th>
                                                <th style="width: 10%;" title="Due In Days">
                                                    <h2>Due In Days		
                                                    </h2>
                                                </th>
                                                <th style="width: 10%;" title="Over Due Days">
                                                    <h2>Over Due Days


                                                    </h2>
                                                </th>
                                                <th style="width: 11%;" title="Approval Status">
                                                    <h2>Approval Status	
			
                                                    </h2>
                                                </th>

                                                <th style="width: 8%;" title="Payment Status">
                                                    <h2>Payment Status	
			
                                                    </h2>
                                                </th>
                                                <th style="width: 10%; text-align: center;" title="Amount">
                                                    <h2>Amount
			
                                                    </h2>
                                                </th>
                                                  <%-- <th style="width: 10%; text-align: center; display:none;" title="Amount">
                                                    <h2>Amount
			
                                                    </h2>
                                                </th>--%>
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyid">
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
    				
                    
    <script type="text/javascript">
        jQuery(document).ready(function () {
            Metronic.init();
            Layout.init();
            ISCUtility.MenuState();
            //            ComponentsDropdowns.init();
        });
    </script>
    <%--<script type="text/javascript">
       
        $(document).ready(function () {
            AdjustScreenBodyHeight();
          
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
    <script src="iscjsengine/PageScript/BillDueBasedReport.js"></script>
    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>--%>
   <%-- <script src="https://cdn.jsdelivr.net/gh/linways/table-to-excel@v1.0.4/dist/tableToExcel.js"></script>--%>
</asp:Content>
