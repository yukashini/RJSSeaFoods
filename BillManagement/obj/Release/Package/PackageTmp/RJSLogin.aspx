<%@ Page Title="" Language="C#" MasterPageFile="~/Login.Master" AutoEventWireup="true" CodeBehind="RJSLogin.aspx.cs" Inherits="BillManagement.ArcBillLogin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
.isc-left-log-cont{
width:100%;
height: calc(100vh - 43px);
background-image: linear-gradient(to bottom, rgba(69, 164, 236, 0.3), transparent);
text-align:center;
padding:100px 0px;
position:relative;
}
.login-img1{
height:50px;
}
.isc-left-log-cont p{
margin:0px;
font-size:14px;
line-height:20px;
font-weight:400;

padding:10px;
}
.isc-left-log-cont h5{
margin:0px;
font-size:14px;
line-height:20px;
font-weight:400;

padding:10px;
position:absolute;

text-align:center;
left:20%;
}
.isc-left-log-cont p span{
margin:0px;
font-size:11px;
line-height:20px;
font-weight:400;

display:block;
}
.isc-rgt-log-cont{
background-color: #f3f2f2 !important;
height: calc(100vh - 0px);
overflow-y: hidden;
}
.isc-login-bg{
left:57%;
width:35%;
}
.isc-app-logo {
margin: 0 auto;
/ text-align: center; /
font-size: 19px;
color:#12B2E4;
/ width: 100%; /
display: inline-block;
}
.isc-login-con h1 {
/*text-align: center;*/ 

display: inline-block;
font-weight:600;
margin-bottom:15px;
font-size: 21px ;
}
.isc-login-act h1 {
font-size: 14px;
color: #1589ee;
font-weight: 400;
cursor: pointer;
}
body{
background-image:unset;
overflow-x: hidden;
overflow-y: hidden;
height:100%;
}
.isc-login-details-con h5{
margin: 15px 0px;
    font-size: 13px;
    line-height: 22px;
    font-weight: 400;
    color: #525252;
}
.isc-login-details-con h5 span{
color:#1589ee;
}
.isc-50per {
width: 49.3%;
float: left;
}
.isc-login-con {
padding: 30px 50px 30px 50px;
}
.isc-login-bg {
left: 57%;
width: 35%;
}
.isc-rgt-log-cont {
background-color: #fff !important;
height: calc(100vh - 0px);
overflow-y: hidden;
}
.isc-login-bg {
background-color: #ffffffc7;
opacity: 1;
position: fixed;
top: 15%;
border-radius: 4px;
}
.isc-login-details-inner-con input {
border: none;
background: none;
border-bottom: 1px solid #1589ee;
outline: none;
width: 100%;
height: 22px;
margin-top: 6px;
}

a.isc-dd-drat-btn-s1.isc-btn-primary.isc-sub-menu-list-s1 {
background-color: #1589ee;
color: #fff;
padding: 9px;
border-radius: 4px;
text-align: center;
margin: 0 auto;
display: block;
}

.isc-login-details-inner-con input:nth-child(2) {
margin-bottom: 15px !important;
}


.isc-login-act {
display: flex;
justify-content: space-between;
margin: 0px 0px 0px 0px;
}
.isc-back, .isc-back1 {
color: #1589ee;
cursor: pointer;
}

.isc-login-details-inner-con label {
display: block;
color: #1589ee;
font-size: 15px;
}
.validation_Lable{
    color:red;
}
html {
font-family: Salesforce Sans, Arial, sans-serif !important;

}
.btn-sign-in{
    width: 100% !important;
    padding: 9px !important;
    background-color: #1589ee !important;
    border: none !important;
    color: white !important;
   border-radius:4px !important;
   font-size:16px;
}}
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-50per">
            <div class="isc-left-log-cont">
                &nbsp;<img  src="img/image_2021_06_25T12_22_41_297Z.png" class="login-img1"/><p>Presenting the RJS Suite  your one-stop solution for all your business needs.
                   <span>A powerhouse of business solutions engineered to help you run your operations like a well-oiled machine.</span></p>
                <img src="img/image_2021_06_25T12_22_26_340Z.png" style="width:65%;"/>
                <h5>Copyright © Hark Technology 2021 | Privacy Policy | Terms & Conditions</h5>
            </div>
            
        </div>
        <div class="isc-50per">
            <div class="isc-rgt-log-cont">
                <div class="isc-login-bg">

                <div class="isc-login-con isc-login-panel">
                   
                    <h1>SIGN IN TO RJS | Sea Foods </h1>
                       <form id="form1" runat="server"  DefaultButton="btnLogin" >
                    <div class="isc-login-details-con">

                        <div class="isc-login-details-inner-con mar-top-15">
                            <label>Username  </label>
                              <asp:TextBox type="text" runat="server" ID="login_userName" CssClass="placeholder-no-fix"  autocomplete="off" placeholder="Username"  name="Email" />
                            <%--<input type="text">--%>
                            <label class="mar-top-15">Password </label>
                           <asp:TextBox type="password" runat="server" ID="login_passWord" CssClass="placeholder-no-fix" autocomplete="off" placeholder="Password"  name="Password" />
                              <%--<input type="password">--%>
                        </div>
                         <asp:Label  runat="server" ID="validation_Lable" CssClass="validation_Lable"></asp:Label>
                        <div class="isc-login-act">
                            <h1>
                                <input type="checkbox"> Keep me logged in </h1>
                            <h1 class="isc-reset-btn" style="line-height: 21px;">Forgot Password?</h1>
                        </div>
                          <asp:Button ID="btnLogin" Text="Sign In"  CssClass="btn-sign-in" runat="server" OnClick="btnLogin_Click" />
                        
                        
                                <label  id="session-Out-Message" style="display:block; margin-top:18px;color:red">   Your session has expired. Please sign in again. </label>
                        <%--<a title="Login" href="Home.aspx" type="button" class="isc-dd-drat-btn-s1 isc-btn-primary isc-sub-menu-list-s1  mar-top-max">Sign In</a>--%>
                           <h5 class="isc-mb-dots">By clicking sign in, you agree to our <span>Terms & conditions</span> and <span>privacy policy</span></h5>
                    </div>
                             </form>

                </div>

                <div class="isc-login-con isc-reset-pw" style="display:none">
                    <p class="isc-back"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Back</p>
             
                    <h1>RJS SeaFoods | Log In</h1>
                    <div class="isc-login-details-con">

                        <div class="isc-login-details-inner-con">

                            <label>Email </label>
                            <input type="text" placeholder="Enter Your Email ID" id="txt_forgottenemailid" />
                             <div class="clearfix"></div>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passforgotemailid">Email ID should not be empty</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passforgotemailidmissing">Email ID is not valid</span>
                                            <span style="color: red; font-size: 12px; display: none;" id="err-passforgotemailidnew">Email ID does not exist</span>
                          <%--  <label>New Password </label>
                            <input type="password">--%>


                        </div>

                        <br>
                        <a title="Submit" id="btn_forgotten" type="button" style="cursor:pointer;" class="isc-dd-drat-btn-s1 isc-btn-primary isc-sub-menu-list-s1 ">Submit</a>
                    </div>

                </div>
            </div>
            </div>
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
                            <a><i class="fa fa-times-circle"  data-dismiss="modal" title="Close" style="cursor:pointer" data-Close-Reset="true"></i></a>
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


    <script>
        $(document).ready(function () {
            $('.isc-reset-btn').click(function () {

                $('.isc-reset-pw').show();
                $('.isc-login-panel').hide();
            })

            $('.isc-back').click(function () {
                $('#txt_forgottenemailid').val('');
                $('.isc-reset-pw').hide();
                $('.isc-login-panel').show();
            })

            $('.isc-back1').click(function () {

                $('.isc-forget-pw').hide();
                $('.isc-login-panel').show();
            })

            $('.isc-forget-btn').click(function () {

                $('.isc-forget-pw').show();
                $('.isc-login-panel').hide();
            })



        })
    </script>
       <script src="iscjsengine/PageScript/ServerRequests.js"></script>
    <script src="iscjsengine/PageScript/Login.js"></script>

</asp:Content>

