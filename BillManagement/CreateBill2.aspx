<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="CreateNewBill.aspx.cs" Inherits="BillManagementV12.CreateNewBill" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .select2-container{
            z-index:9999 !important;
        }
        .isc-vnd-mhd .select2-container {
            width:100% !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="div-col-100per" id="rgt_coll_panel">
                        <div class="isc-pay-cont" id="container-paypalsetup">
                            <div class="screen-row isc-mar-all">
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Setup Instruction : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <p>
                                                <a id="openPDF" style="line-height: 30px;">API Credentials.pdf
                                                <img src="img/appimages/PDF_icon.png" class="isc-pdf-icn" ></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">API Username 
<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt-apiusername" data-text="true" class="form-control" placeholder="Enter API Username">
                                            <span id="err-apiusername" span-Error="true" style="color: red; display: none;"></span>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">API Password 
<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt-apipassword"  data-text="true"  class="form-control" placeholder="Enter API Password">
                                            <span id="err-apipassword" span-Error="true" style="color: red; display: none;"></span>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">API Signature 
<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt-apisignature" data-text="true" class="form-control" placeholder="Enter API Signature">
                                            <span id="err-apisignature" span-Error="true" style="color: red; display: none;"></span>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Client ID 
<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt-clientid" data-text="true" class="form-control" placeholder="Enter Client ID">
                                            <span id="err-clientid" span-Error="true" style="color: red; display: none;"></span>
                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Secret Key 
<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup> : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" id="txt-clientsecret" data-text="true" class="form-control" placeholder="Enter Secret Key">
                                            <span id="err-clientsecret"   span-Error="true"  style="color: red; display: none;"></span>
                                        </div>
                                    </div>
                                    <div class="screen-row" style="margin-top: 30px;">
                                        <div class="isc-pay-btn-cont">
                                            <a class="isc-theme-blue-btn" href="#" id="btn-connect">Connect </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="isc-pay-det" id="container-paypalinfo">
                            <div class="screen-row isc-mar-all">
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">PayPal Balance : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <label class="mar-top-5" id="lbl-paypalbalance">0</label>
                                        </div>
                                    </div>
                                  
                                </div>

                                <div class="div-col-50per">
                                    
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Status : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <label class="mar-top-5">Connected </label>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div class="screen-row isc-mar-all">
                                <h5 class="isc-usr-hme-hdr-sec-h5 mar-top-30">Recent PayPal Transactions<i title="It takes maximum of 3 hours for executed transactions to appear in the list." class="fa fa-info-circle " style="color: #10c1e9fa; padding-left: 5px;"></i></h5>
                                <table id="tbl-paypal-transaction" class="isc-table-read-optimal mar-top-10">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%;" class="header">Date
                                            </th>
                                             <th style="width: 15%;" class="header">Transaction Id
                                            </th>
                                            <th style="width: 20%;" class="header">Name
                                                        
                                            </th>
                                             <th style="width: 10%;" class="header"> Amount
                                            </th>
                                             <th style="width: 10%;" class="header">Fee
                                            </th>
                                            <th style="width: 15%;" class="header">Type
                                            </th>
                                             <th style="width: 20%;" class="header">Description
                                            </th>
                                            <th style="width: 10%;" class="header">Status
                                            </th>
                                           

                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="screen-row" style="margin-top: 30px;">
                                <div class="isc-pay-btn-cont" style="width:100%;text-align:center;padding-right: 210px; margin-bottom:20px;">
                                    <a class="isc-theme-blue-btn" href="#" id="btn-delete-paypalaccount">Delete Account </a>

                                </div>
                            </div>
                        </div>
                    </div>
</asp:Content>
