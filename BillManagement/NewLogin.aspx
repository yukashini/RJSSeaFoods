<%@ Page Title="" Language="C#" MasterPageFile="~/Login.Master" AutoEventWireup="true" CodeBehind="NewLogin.aspx.cs" Inherits="BillManagement.NewLogin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class=" ">
            <div class="div-col-35per tab-log-in-align-lft mobi-align-responsive">
                <div class="content">
                    <div class="brd-log-s1">
                        <img src="img/appimages/logo-is.png" alt="" />
                    </div>
                    <h3 class="form-title">Sign In To  | Innospire</h3>

                    <div class="alert alert-danger display-hide">
                        <button class="close" data-close="alert">
                        </button>
                        <span>Enter any username and password. </span>
                    </div>
                    <div class="form-group mar-top-10 isc-mar-top-10Per">
                        <%-- <label class="control-label visible-ie8 visible-ie9">
                            Email</label>--%>
                        <div class="input-icon">
                            <%--<asp:TextBox ID="txtUserName" CssClass="form-control placeholder-no-fix" AutoCompleteType="Disabled" placeholder="Username"
                                name="Email" runat="server"></asp:TextBox>--%>
                            <input id="txtusername" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Username"
                                name="Email" />
                        </div>
                    </div>
                    <div class="form-group">
                        <%-- <label class="control-label visible-ie8 visible-ie9">
                            Password</label>--%>
                        <div class="input-icon">
<%--                            <asp:TextBox TextMode="Password" runat="server" ID="txtPasswrod" CssClass="form-control placeholder-no-fix isc-bor-none" AutoCompleteType="Disabled"
                                placeholder="Password" name="password" onkeypress="return runScript(event)" Style="border: none!important;"> </asp:TextBox>--%>
                             <input id="txtpassword" class="form-control placeholder-no-fix isc-bor-none" type="password" autocomplete="off"
                                placeholder="Password" name="password" style="border: none!important;" />
                        </div>
                    </div>
                    <div class="form-actions validation-msg-s1" id="divError" style="backgound-color:red;">
                        <label>The account and password is mandatory. Please try again.</label>
                        <%--<asp:Label ID="lblError" runat="server"></asp:Label>--%>
                    </div>
                    <div class="form-group">
                        <div class="form-actions" style="text-align:center">
                            <label class="checkbox">
                                <input type="checkbox" style="width:14px" name="remember" value="1" />Remember me
                            </label>

                            <div class="text-center isc-pad-ad">
                                <a Id="btnSubmit" class="btn sky" ></a>
                            </div>

                        </div>
                        <%--       <div class="text-center mar-top-20 isc-link-btn">
                            <span class="isc-log-dont text-center">Don't have an account yet ? </span>&nbsp;&nbsp; 
                            <a href="#" class="">Sign Up</a>
                        </div>--%>
                    </div>

                </div>
            </div>
            <div class="div-col-65per isc-bg-blue-log tab-log-in-align-rig hidden-xs">
                <div class=" ">
                    <div class="content-right">
                        <div class="brd-log-s1">
                            <h3 class="form-title-main">Sign In To   | Innospire </h3>
                            <p class="isc-rigth-para">
                                <%--<%= System.Configuration.ConfigurationManager.AppSettings["ApplicationName"].ToString() %> helps you to maintain your workflows.--%>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--<script src="iscjsengine/IF2/Library/Login.js?1.03" type="text/javascript"></script>--%>

    <script>
        $(document).keypress(function (e) {

            if (e.which == 13) {
                e.preventDefault();
             //   $("#btnSubmit").trigger("click");
                $("[id*=btnSubmit]")[0].click();
            }
        });
    </script>
</asp:Content>
