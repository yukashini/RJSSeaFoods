<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AccountsPayable.aspx.cs" Inherits="BillManagement.AccountsPayable" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <asp:HiddenField runat="server" ID="lstbillexport" />
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-briefcase"></i>
                        <h2 style="line-height: 30px;">Accounts Payable</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right">
                    <div class="align-right mar-top-3">
                        <%-- <a class="isc-theme-blue-btn" id="filter-toggle-btn1" title="Group By"><i class="fa fa-clipboard"></i></a>--%>
                        <a class="isc-theme-blue-btn" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                    </div>
                </div>
                <div class="cell-right pad-rig-5 mar-top-3">

                    <%--  <a class="isc-theme-blue-btn" href="#">Export</a>--%>
                </div>


                <div class="cell-right pad-rig-5 mar-top-3">
                    <asp:Button type="button" UseSubmitBehavior="false" ID="Button1" text="Export" class="isc-theme-blue-btn isc-export-btn" runat="server"  OnClick="ExportExcel" />
                    <%--<a class="isc-theme-blue-btn" href="#">Export</a>--%>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="isc-filter-container" id="isc-filter-container" style="display: none;">


                     <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2" tabindex="-1" id="slt-vendor" aria-hidden="true">
                                <option>Choose Vendor</option>
                                <option>Cresswell Socks</option>
                                <option>Diamonz Gems Inc</option>
                                <option>Eclectic Lady Inc</option>


                            </select>

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2" tabindex="-1" id="slt-Bills" aria-hidden="true">
                                <option>Choose Bills/Invoice #</option>
                                <option>303768		
                                </option>
                                <option>293991		
                                </option>
                                <option>195994		
                                </option>
                                <option>97997		
                                </option>

                            </select>

                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control iscdatpkrwdt iscdatepicker" id="date-range" placeholder="Due Date" />

                        </div>
                       

                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="btn-search">
                            <a title="Search"><i class="fa fa-search"></i> Search</a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset" id="btn-reset">
                            <a><i class="fa fa-times"></i> Reset</a>
                        </div>
                        <div class="isc-filter-container-close" id="isc-filter-container-close" title="Close Filters">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    <div class="scrren-row">
                        <div class="isc-lst-scrl-cont">
                        <table class="isc-table-read-optimal isc-table-sorter-s1 isc-read-list-s2" id="tbl-Payable">
                            <thead>
                                <tr>
                                
                                    <th style="width: 26%;" class="header" sort-column-Type="text" column-Name="VENDOR"  data-sort="VENDOR">Vendor</th>
                                    <th style="width: 12%;" class="header" sort-column-Type="number" column-Name="CURRENTPAYABLE"  data-sort="CURRENTPAYABLE">
                                        <center>Current Payable ($)</center>
                                    </th>
                                    <th style="width: 10%;" class="header" sort-column-Type="number" column-Name="zeroToThirty"  data-sort="zeroToThirty">
                                        <center>0 -30 Days ($)</center>

                                    </th>
                                    <th style="width: 10%;" class="header" sort-column-Type="number" column-Name="thirtyToSixty"  data-sort="thirtyToSixty">
                                        <center>31-60 Days ($)</center>
                                    </th>


                                    <th style="width: 10%;" class="header" sort-column-Type="number" column-Name="sixtyToNinty"  data-sort="sixtyToNinty">
                                        <center>61-90 Days ($)</center>

                                    </th>
                                    <th style="width: 10%;" class="header" sort-column-Type="number" column-Name="nintyToOneTwenty"  data-sort="nintyToOneTwenty">
                                        <center>91-120 Days ($)</center>

                                    </th>
                                    <th style="width: 10%;" class="header" sort-column-Type="number" column-Name="aboveOneTwenty"  data-sort="aboveOneTwenty">
                                        <center>>120 Days ($)</center>

                                    </th>
                                    <th style="width: 12%;" class="header" sort-column-Type="number" column-Name="totalOutStanding"  data-sort="totalOutStanding">
                                        <center>Total Outstanding ($)</center>

                                    </th>


                                </tr>
                            </thead>
                            <tbody id="tbl-Payable-Body">
                                
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
            $('.iscdatepicker').datepicker({
                format: 'mm/dd/yyyy',
                orientation: "auto bottom"
            });
        });

        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });


    </script>
    <script src="iscjsengine/PageScript/AccountsPayable.js"></script>
</asp:Content>
