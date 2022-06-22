<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="APAgingSummaryReport.aspx.cs" Inherits="BillManagement.APAgingSummaryReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <style>
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
                                <h2 style="line-height: 30px;">AP Aging Summary Report</h2>
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
                            <a class="isc-theme-blue-btn" id="Btn_export" href="#" style="color:#fff !important" title="Export">Export</a>

                        </div>
                    </div>
                        </div>
                    
                </div>

                <div class="isc-app-screen-body-container" style="height: 154px;">
                    <div class="isc-app-screen-sec-container-s1 ">

                        <div class="screen-row ">
                            
                            <div class="screen-row">
                        <div class="isc-filter-container isc-h-53 " id="isc-filter-container" style="display: none;">
                                <div class="screen-row">
                                    <div class="div-col-80per">
                                    <div class="cell-left  ">
                                        <select class="form-control select2 select2-hidden-accessible" id="dl_Vendor" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Vendor Name</option>

                                        </select>
                                    </div>
                                    
                                    

                                    <div class="cell-left pad-lft-15">
                                        <input type="text" id="txt_totalbill" class="form-control isc-mb-res-txt-box" placeholder="Enter Total Amount">
                                    </div>
                                    <div class="cell-left pad-lft-15">
                                        <input type="text" class="form-control isc-mb-res-txt-box" placeholder="Enter Balance Amount" id="txt_balanceamt">
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
                                <div class="isc-filter-container-close" id="isc-filter-container-close" title="Close">
                                    <a><i class="fa fa-times"></i></a>
                                </div>
                            </div>
                            </div>
                    </div>


                        </div>

                        <div id="exp-lst-view">
                            <div class="isc-screen-nav-container-s1">


                                <div class="screen-row">
                                    <div class="isc-lst-scrl-cont">
                                    <table id="tbl_Agingreport" class="isc-table-read-optimal prog-lbl-col">
                                        <thead>
                                            <tr>
                                                <th style="width: 16.6%;" title="Vendor Name">
                                                    <h2>Vendor Name</h2>
                                                </th>
                                                <th style="width: 16.6%;" title="(1-30 Days)">
                                                    <h2>(1-30 Days)	

                                                    </h2>
                                                </th>
                                                <th style="width: 16.6%;" title="(31-60 Days)">
                                                    <h2>(31-60 Days) 
                                                    </h2>
                                                </th>
                                                <th style="width: 16.6%;" title="(61-90 Days)">
                                                    <h2>(61-90 Days)

                                                    </h2>
                                                </th>
                                                <th style="width: 16.6%;" title="(>91 Days)">
                                                    <h2>(>91 Days)

                                                    </h2>
                                                </th>
                                                <th style="width: 16.6%;" title="Total Amount">
                                                    <h2>Total Amount</h2>
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
    <script src="iscjsengine/PageScript/APAgingSummaryReport.js"></script>
</asp:Content>
