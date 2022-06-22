<%@ Page Title="" Language="C#" MasterPageFile="~/Login.Master" AutoEventWireup="true" CodeBehind="404.aspx.cs" Inherits="BillManagement._404" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="isc-error-page-logo-area">
        <img src="img/appimages/logo-is.png" alt="" />
        <h2>ArcBill</h2>
    </div>
    <div class="isc-error-page-content-area">
        <h2  id="HPageNO" runat="server"></h2>
        <h3 id="HPageMessage" runat="server"></h3>
        <p id="PageDescription" runat="server"></p>
        <a id="Navigation" runat="server" ></a>
    </div>
</asp:Content>
