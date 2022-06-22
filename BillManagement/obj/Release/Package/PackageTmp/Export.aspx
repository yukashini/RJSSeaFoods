<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Export.aspx.cs" Inherits="BillManagement.Export" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="iscjsengine/lib/daterangepicker.js"></script>
    <link href="isccssengine/lib/daterangepicker.css" rel="stylesheet" />
    <style>
        .daterangepicker {
            position: unset !important;
        }

        .daterangepicker {
            width: 278px;
        }

        .form-control {
            height: 30px;
        }

        .isc-due-date-to-wdt {
            width: 114px;
        }

        .isc-filter-container {
            height: 65px;
        }

        /*table.dataTable thead th, table.dataTable thead td {
            padding: 10px 10px !important;
        }*/

        table.dataTable thead .sorting:last-child {
            background-image: url(../../img/sorting-icons/sort_both.png);
        }

        table.dataTable thead .sorting_asc:last-child {
            background-image: url(../../img/sorting-icons/sort_asc.png);
        }

        table.dataTable thead .sorting_desc:last-child {
            background-image: url(../../img/sorting-icons/sort_desc.png);
        }
        .isc-theme-blue-btn{
             border: 1px solid #1589ee;
        }
        .isc-exp-due{
            width:95px;
            margin-top:6px;
            margin-right:5px;
        }
        .isc-exp-sts{
             margin-top:6px;
            margin-right:5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField runat="server" ID="lstbillexport" />
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="screen-row">

                <div class="div-col-38per">
                    <div class="screen-row">
                        <div class="isc-page-header">
                            <i class="fa fa-file"></i>
                            <h2 style="line-height: 30px;">Export List</h2>
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
                <div class="div-col-42per">
                    <div class="cell-right">
                        <div class="align-right  pad-rig-5 ">

                            <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                        </div>
                    </div>
                    <div class="cell-right pad-rig-5 mar-top-3">
                        <asp:Button type="button" Style="line-height: 12px" UseSubmitBehavior="false" ID="Button1" Text="Export File" class="isc-theme-blue-btn isc-export-btn" runat="server" OnClick="ExportExcel" />
                        <%--<a class="isc-theme-blue-btn" href="#">Export</a>--%>
                    </div>
                    <%--  <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                       <a class="isc-theme-blue-btn" id="btn-Export-Data">Export</a>
                   
                </div>--%>
                </div>
            </div>

        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">

                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="screen-row mar-top-10">
                            <div class="isc-filter-container" id="isc-filter-container" style="display: none;">



                                <div class="div-col-80per">
                                    <div class="cell-left" style="display: flex;">
                                        <span  class="isc-exp-due">Due date from: </span>
                                        <input type="text" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1 iscdatepicker" data-datable="ddmmyyyy" id="due-From" placeholder="From" />

                                    </div>

                                    <div class="cell-left pad-lft-15" style="display: flex;">
                                        <span  class="isc-due-date-to-wdt isc-exp-due">Due date to: </span>
                                        <input type="text" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1 iscdatepicker" data-datable="ddmmyyyy" id="due-To" placeholder="To" />

                                    </div>

                                    <div class="cell-left pad-lft-15 isc-mb-res-sts" style="display: flex;">
                                        <span class="isc-wdt-status isc-exp-sts">Status:</span>
                                        <select class="form-control select2 select2-hidden-accessible" id="slt-Payment-Status" tabindex="-1" aria-hidden="true">
                                            <option value="0">Choose Bill Status</option>
                                            <option value="50023">Approved		
                                            </option>
                                            <option value="50044">Paid		
                                            </option>

                                        </select>
                                    </div>
                                    <%-- <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose Vendor</option>
                                    <option>Johnson & Co		
                                    </option>
                                    <option>Nicholson LLC.		
                                    </option>
                                     <option>Baker Sanders Inc.	
                                    </option>
                                     <option>BSVGP Inc.		
                                    </option>
                                </select>
                            </div>--%>
                                </div>
                                <div class="div-col-20per">
                                    <div id="Btn_serch" class="isc-filter-search isc-go  mar-lft-10" title="Search">
                                        <a  title="Search"><i class="fa fa-search" ></i>Search</a>
                                    </div>
                                    <div   id="btn_Reset" class="isc-filter-search isc-reset" title="Reset">
                                        <a><i class="fa fa-times"></i>Reset</a>
                                    </div>
                                    <div class="isc-filter-container-close isc-ext-cls" id="isc-filter-container-close" title="Close">
                                        <a><i class="fa fa-times"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="screen-row ">
                        </div>
                        <div class="isc-screen-nav-container-s1 isc-lst-scrl-cont isc-mbl-mar-top-10">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst" id="tbl_bills">
                                <thead>
                                    <tr>
                                        <%-- <th style="width:2%;">
                                                            <input type="checkbox" />
                                                        </th>--%>
                                        <th style="width: 15%;" class="" sort-column-type="text" column-name="VendorName" data-sort="VendorName">Vendor
                                        </th>
                                        <th style="width: 13%;" class="" sort-column-type="text" column-name="InvoiceNumber" data-sort="InvoiceNumber">Bill#
                                        </th>

                                        <th style="width: 21%;" class="" sort-column-type="text" column-name="Description" data-sort="Description">Bill Description
                                                        
                                        </th>

                                        <th style="width: 12%;" class="" sort-column-type="number" column-name="PaymentStatus" data-sort="PaymentStatus">Bill Status
                                        </th>

                                        <th style="width: 12%;" class="" sort-column-type="number" column-name="PaymentStatus" data-sort="PaymentStatus">Payment Mode
                                        </th>

                                        <th style="width: 8%;" class="">Stage
                                        </th>
                                        <th style="width: 9%;" class="" sort-column-type="date" column-name="DueOn" data-sort="DueOn">Due Date
                                        </th>

                                        <th style="width: 10%;" class="" sort-column-type="number" column-name="ApprovedAmount" data-sort="ApprovedAmount">Amount Due
                                        </th>


                                    </tr>
                                </thead>
                                <tbody id="tbl-Export-Body">
                                    <%--<tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>

                                                        <td>
                                                            <h5> Johnson &amp; Co</h5>
                                                        </td>
                                                        <td>
                                                           <h5>	
1500095</h5>
                                                        </td>
                                                        <td>
                                                            <h5>	
Electric Metered Bill</h5>
                                                        </td>
                                                        <td>
                                                        <div class="isc-td-inline-status-ch-s1">
                                                                <a class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-upload" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">Approved</a>
                                                                <ul class="dropdown-menu">
                                                                     <li><a href="#" class="isc-wrk-flw-sta-upload">Approved</a></li>
                                                                   
                                                                     <li><a href="#" class="" style="color:green;">Paid</a></li>
                                                               
                                                                </ul>
                                                            </div></td>
                                                        <td>
                                                            <h5>Approvals</h5>
                                                        </td>
                                                        <td>
                                                           <h5 style="color:red !important;">9/3/2020</h5>
                                                        </td>
                                                        
                                                       
                                                       <td>
                                                          
                                                           <h5 style="text-align:right;">$750</h5>
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
    <script>
        $('#isc-layout-s1').click(function () {
            $("#exp-lst-view").show();
            $("#exp-kab-view").hide();
            $(".filter-toggle-btn-cls").hide();
        })
        $('#isc-layout-s2').click(function () {
            $("#exp-kab-view").show();
            $("#exp-lst-view").hide();
            $(".filter-toggle-btn-cls").show();
        })
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });
    </script>
    <script src="iscjsengine/PageScript/BillExport.js"></script>
</asp:Content>

