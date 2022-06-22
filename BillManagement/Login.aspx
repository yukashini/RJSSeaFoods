<%@ Page Title="" Language="C#" MasterPageFile="~/Login.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="BillManagement.Login" ValidateRequest="false"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <style>
       .isc-arc-logo {
    width: 220px !important;
}
   </style> 
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class=" ">
            <div class="div-col-35per tab-log-in-align-lft mobi-align-responsive">
                 <form id="form1" runat="server"  DefaultButton="btnLogin" >
                <div class="content">
                    <div class="brd-log-s1">
                        <img class="isc-arc-logo" src="img/logo-is1.png" alt="" />
                        <%--<img src="img/logo-is3.png" />--%><%--<img src="img/INNOSPIR_Logo.png" />--%>
                    </div>
                    <h3 class="form-title">Sign In To RJS SeaFoods  | Hark Technologies
                    </h3>

                    <div class="alert alert-danger display-hide">
                        <button class="close" data-close="alert">
                        </button>
                        <span>Enter any username and password. </span>
                    </div>
                    <div class="form-group mar-top-10 isc-mar-top-10Per">
                        <label class="control-label visible-ie8 visible-ie9">
                            Email</label>
                        <div class="input-icon">
                            <asp:TextBox type="text" runat="server" ID="login_userName" CssClass="form-control placeholder-no-fix"  autocomplete="off" placeholder="Email"  name="Email" />
                            <%--<input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email"
                                name="Email" />--%>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label visible-ie8 visible-ie9">
                            Password</label>
                        <div class="input-icon">
                           
                            <asp:TextBox type="password" runat="server" ID="login_passWord" CssClass="form-control placeholder-no-fix isc-bor-none"  style="border: none!important;"  autocomplete="off" placeholder="Password"  name="Password" />
              
                                <%--<input class="form-control placeholder-no-fix isc-bor-none" type="password" autocomplete="off"
                                placeholder="Password" name="password" style="border: none!important;" />--%>
                        </div>
                          <asp:Label  runat="server" ID="validation_Lable"></asp:Label>
                    </div>
                    <div class="form-group">
                        <div class="form-actions">
                              
                            <label class="checkbox">
                                <input type="checkbox" name="remember" value="1" />
                                Remember me
                            </label>
                            <div class="div-col-50per Arc-Time-For-pass" style="padding-left: 30px;">
                                <label class="checkbox" style="display: block;cursor:pointer">

                                    <a data-showforgotpasscode="true" >Forgot Password?</a>
                                </label>

                            </div>
                            <div class="text-center isc-pad-ad">
                                <%--<asp:Panel runat="server" DefaultButton="btnLogin">--%>
                                <asp:Button ID="btnLogin" Text="Sign In" runat="server" class="btn sky"
                                OnClick="btnLogin_Click" />
                                <label  id="session-Out-Message" style="display:block; margin-top:18px;color:red">   Your session has expired. Please sign in again. </label>
                                    <%--</asp:Panel>--%>
                                
                                <%--<asp:HyperLink href="UserHome.aspx" OnClick="btnLogin_Click" CssClass="btn sky"  runat="server">Sign In </asp:HyperLink>--%>
                                <%--<a href="UserHome.aspx" class="btn sky">Sign In </a>--%>
                            </div>
                           

                        </div>
                        <div class="text-center mar-top-20 isc-link-btn">
                            <span class="isc-log-dont text-center">Don't have an account yet ? </span>&nbsp;&nbsp; 
                            <a href="#" class="">Sign Up</a>
                        </div>

                    </div>

                </div>
                      </form>
            </div>
            <div class="div-col-65per isc-bg-blue-log tab-log-in-align-rig hidden-xs">
                <div class=" ">
                    <div class="content-right">
                        <div class="brd-log-s1">
                            <h3 class="form-title-main">Sign In To RJS Sea Food</h3>
                            <p class="isc-rigth-para">
                               
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade isc-popup-detail-form-s1 in For-Password" id="mp_forgotpasscode-website" data-backdrop="static" data-keyboard="false" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Forgot Password?</h4>
                        </div>
                        <div class="cell-right">
                             
                            <a><i class="fa fa-times" style="cursor:pointer" data-closeemailpop="true" title="Close"></i></a>
                            <%--<button type="button" class="close img-typ-sq" data-closeemailpop="true" title="Close" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">


                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label style="padding-top: 6px;">Enter Your Email ID <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-50per">
                                            <input type="text" placeholder="Enter Your Email ID" id="txt_forgottenemailid" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passforgotemailid">Email ID should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passforgotemailidmissing">Email ID is not valid</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passforgotemailidnew">Email ID does not exist</span>
                                        </div>

                                    </div>

                                </div>



                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn_forgotten">
                            Submit</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" id="btn_clearemaild">
                            Clear</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_add-website5" data-backdrop="static" data-keyboard="false" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Change Password</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times"  data-dismiss="modal" title="Close" style="cursor:pointer" data-Close-Reset="true"></i></a>
                           <%-- <button type="button" class="close img-typ-sq" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">




                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Enter Old Password <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="password" placeholder="Enter Old Password" id="txt_oldPasscode" class="form-control">
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-oldpasscode">Old Password should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-oldpasscodmatch">Old Password does not matched</span>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Enter New Password <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="password" class="form-control" placeholder="Enter New Password" id="txt_Passcode" >
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passcode">New Password should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passcodrequire">New Password doesn't meet the requirement</span>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="div-col-30per">
                                            <label>Enter Confirm Password <span class="lbl-mandatory-s2">*</span></label>
                                        </div>
                                        <div class="div-col-40per">
                                            <input type="password" class="form-control" placeholder="Enter Confirm Password" id="txt_ConfirmPasscode" >
                                            <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-cpasscod">Confirm Password should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-cpasscodmatch">New Password and Confirm Password does not match</span>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group">
                                    <h4>Password must meet the following requirements:</h4>
                                    <ul>
                                        <li id="masterlength" class="invalid">At least <strong>8 characters</strong>—the more characters, the better.</li>
                                        <li id="mastercapital" class="invalid">A mixture of both <strong>uppercase and lowercase letters.</strong></li>
                                        <li id="masternumber" class="invalid">A mixture of <strong>letters and numbers.</strong></li>
                                        <li id="mastercharacters" class="invalid">Inclusion of at least <strong>one special character</strong>, e.g., ! @ # ? ] Note: do not use &lt; or &gt; in your password, as both can cause problems in Web browsers.</li>

                                    </ul>

                                </div>
                                <%--<div class="form-group">

                                    <div class="">
                                        <div class="checkbox-list TS-pop-noti">

                                            <p>
                                                Notes :
                                                <br />
                                                1. You Can't complete the setup without completing all the above mandatory fields * At least 8 characters—the more characters, the better.<br />
                                                * A mixture of both uppercase and lowercase letters. * A mixture of letters and numbers.<br />
                                                * Inclusion of at least one special character, e.g., ! @ # ? ] Note: do not use < or > in your password, as both can cause problems in Web browsers.
                                            </p>

                                        </div>
                                    </div>
                                </div>--%>
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="mp-resetpassword-submit">
                            Submit</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal" data-Close-Reset="true">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
  
    <script src="iscjsengine/PageScript/ServerRequests.js"></script>
    <script src="iscjsengine/PageScript/Login.js"></script>
    <%--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>--%>

     <%--<script src="iscjsengine/common/notify.min.js"></script>--%>>
</asp:Content>
