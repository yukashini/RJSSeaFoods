<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ImportInvoice.aspx.cs" Inherits="BillManagement.ImportInvoice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .isc-btn-wrap {
            display: inline-block;
            margin: 0px 0px 0px 0px;
            font-size: 14px;
            padding: 0px 10px;
            font-weight: 400;
            border-radius: 0px !important;
            float: left;
            line-height: 27px;
            position: relative;
            border: 1px solid #efefef;
            border-radius: 4px !important;
        }
       .isc-no-border a:hover{
            color:#fff !important;
        }
      .isc-fil-lbl span{
          width:80%;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
      }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;">Import Invoices</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">


                <%--<div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:6px;">
                   
                    <div class="input-icon left isc-hdr-search-container isc-var-s3"> <i class="fa fa-search"></i>
										<input class="m-wrap " type="text" placeholder=""> </div>
                </div>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="isc-screen-row">
                        <div class="screen-row">
                            <div class="isc-100per">
                                <div class="isc-thm-hme-kpi-cont1">
                                    <div class="screen-row">

                                        <table class="isc-table-read-optimal isc-no-border">
                                            <tbody>
                                                <tr <%--style="cursor: pointer;"--%>>
                                                    <td style="width: 25%; text-align: center;"></td>
                                                    <td style="width: 25%;">
                                                        <a title="Download Template" type="button" id="Download-lst" class="isc-btn-wrap isc-btn-p1 ">Download Template</a>

                                                        
                                                    </td>
                                                    
                                                    <td>
                                                        <div class="isc-screen-row" style="margin-bottom: 10px;">
                                                            <ul class="isc-popup-entity isc-entity-btn">

                                                                <li style="margin-top: 5px; margin-left: 5px;">
                                                                    <span class="isc-btn-inp-typ-file-s1" style="font-size: 13px;">Browse

                                                   

                                                                    <input type="file" name="filename" style="width: 200px;" id="bill-Invoice" title="Add File">
                                                                    </span></li>
                                                                <label class="isc-fil-lbl" style="margin-left: 10px; margin-top: 7px;">
                                                                    File Name : <span id="file-Name" class="titleclass"></span>
                                                                </label>

                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>

                                                    </td>
                                                    <td colspan="2">
                                                        <span style="display: table;"><strong>Note: </strong>Please upload standard Excel Template </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <a title="Save" type="button" id="btn-Save-ExcelData" class="isc-btn-wrap isc-btn-p1 " style="color:#fff !important;">Save</a>

                                    </div>

                                </div>
                            </div>
                            <%--<div class="isc-50per" style="margin-left: 15px;">
                                        <div class="isc-thm-hme-kpi-cont1">
                                            <div class="screen-row">

                                                <table class="isc-table-read-optimal isc-no-border isc-table-sorter-s1">
                                                    <tbody>
                                                        <tr style="cursor: pointer;">
                                                            <td style="width: 25%; text-align: center;">
                                                                  <h4>invoices_11-21-2021.csv </h4>
                                                            </td>
                                                            <td style="width: 55%;">
                                                                <div class="isc-screen-row" style="margin-bottom: 10px;">
                                                             <ul class="isc-popup-entity isc-entity-btn">
                                        <li><a title="Download Template" type="button" class="isc-btn-wrap isc-btn-p1 "> Download Template</a> </li>
                                        <li><a title="Upload" type="button" class="isc-btn-wrap isc-btn-p1 "> Upload</a> </li>

                                    </ul>
                                                                    </div>
                                                                <span style="display:table;"> <strong> Note: </strong> Please upload standard Excel Template </span>
                                                            </td>
                                                            
                                                            <td style="width: 20%;">
                                                                Filename
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                

                                            </div>

                                        </div>
                                    </div>--%>
                        </div>

                    </div>
                    <div class="screen-row mar-top-10">
                        <div class="isc-filter-container" id="isc-filter-container" style="display: none;">




                            <div class="cell-left  ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose User</option>
                                    <option>Xavier		
                                    </option>
                                    <option>Pronto		
                                    </option>
                                    <option>Reuben		
                                    </option>
                                    <option>Joey		
                                    </option>
                                    <option>James Abourezk		
                                    </option>
                                    <option>Abigail Adams		
                                    </option>
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose Role</option>
                                    <option>Administrator		
                                    </option>
                                    <option>Accountant		
                                    </option>
                                    <option>Approver		
                                    </option>
                                    <option>Approver		
                                    </option>
                                    <option>Clerk		
                                    </option>
                                    <option>Payer	
                                    </option>
                                </select>
                            </div>
                            <div class="cell-left pad-lft-15 ">
                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                    <option>Choose Status</option>
                                    <option>Active		
                                    </option>
                                    <option>Inactive		
                                    </option>

                                </select>
                            </div>

                            <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                                <a title="Search"><i class="fa fa-search"></i></a>
                            </div>

                            <div class="isc-filter-search isc-reset" title="Reset">
                                <a><i class="fa fa-refresh"></i></a>
                            </div>
                            <div class="isc-filter-container-close" id="isc-filter-container-close">
                                <a><i class="fa fa-times"></i></a>
                            </div>
                        </div>
                    </div>

                    <table class="isc-table-read-optimal  isc-ddp-hdn-lst">
                        <thead>
                            <tr style="cursor:context-menu !important;">

                                <%--  <th style="width: 15%;" class="header">Customer <i class="fa fa-sort-alpha-desc"></i>
                                </th>--%>
                                 <th style="width: 13%;cursor:context-menu !important;" class="header" title="Customer">Customer 
                                </th>
                                <th style="width: 13%;cursor:context-menu !important;" class="header" title="Invoice">Invoice 
                                </th>

                                <th style="width: 21%;cursor:context-menu !important;" title="Invoice Date" class="header">Invoice Date

                                </th>

                                <th style="width: 16%;cursor:context-menu !important;" title="Term Code" class="header">Term Code 
                                </th>

                                <th style="width: 10%;cursor:context-menu !important;" title="Description" class="header">Description 
                                </th>

                                <th style="width: 10%; text-align: center;cursor:context-menu !important;"
                                    title="Line Item No" class="header">Line Item No
                                </th>
                                <th style="width: 10%; text-align: center;cursor:context-menu !important;"
                                    title="Order Id" class="header">Order Id 
                                </th>
                                <th style="width: 10%; text-align: center;cursor:context-menu !important;"
                                    title="Amount" class="header">Amount 
                                </th>
                                <th style="width: 10%; text-align: center;cursor:context-menu !important;"
                                    title="Discount" class="header">Discount 
                                </th>
                                <th style="width: 10%; text-align: center;cursor:context-menu !important;"
                                    title="Status" class="header">Status
                                </th>

                            </tr>
                        </thead>
                        <tbody id="tbl-invoice">
                        </tbody>
                    </table>
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
    <script src="iscjsengine/PageScript/Invoicehandlar.js"></script>
</asp:Content>
