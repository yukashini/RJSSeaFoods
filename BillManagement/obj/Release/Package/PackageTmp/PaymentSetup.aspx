<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="PaymentSetup.aspx.cs" Inherits="BillManagement.PaymentSetup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        @media only screen and (max-width: 767px) {
            .isc-wid-unset {
                
                height: unset !important;
            }
        }
        .isc-up-bill-lft-cont {
            border: none;
        }

        .isc-bill-trk-pay-mthd-new {
            padding: 5px;
        }

        .isc-pay-mdh-pay-bal {
            margin: 0px;
            font-size: 13px;
            line-height: 20px;
            font-weight: 400;
            color: #5d5d5d;
        }

        .isc-pay-mdh-crcy {
            margin: 0px;
            font-size: 21px;
            line-height: 36px;
            font-weight: 400;
            color: #5d5d5d;
        }

        .isc-pay-mnt-crd-cont {
            height: unset;
        }

        .isc-pay-btn-cont {
            padding-left: 200px;
        }

        .isc-mar-all {
            margin: 15px 25px;
        }

        .isc-pay-set-up {
            margin: 0px;
            font-size: 18px;
            line-height: 36px;
            font-weight: 400;
            color: #5d5d5d;
        }

        .isc-pdf-icn {
            height: 15px;
            width: 15px;
        }

        .isc-sec-in-con-y-scroll-con-s1 {
            position: relative;
            border: 1px solid #dddddd;
            display: block;
            margin: 0px auto;
            width: 426px;
            padding: 5px 0px 5px 5px;
            border-top-left-radius: 7px !important;
            border-top-right-radius: 7px !important;
            background-color: gainsboro;
        }

        .isc-pay-det {
            display: none;
        }
        .isc-sec-in-con-y-scroll-con-s1 {
position: relative;
border: 1px solid #dddddd;
display: block;
margin: 0px auto;
width: 426px;
padding: 5px 0px 5px 5px;
border-top-left-radius: 7px !important;
border-top-right-radius: 7px !important;
background-color: gainsboro;
}
.isc-pay-det{
display:none;
}
.isc-lft-coll-pan-cntrl i {
color: #17b4d3;
font-size: 14px;
position: absolute;
cursor: pointer;
z-index: 99999;
top: calc(50vh - 85px);
text-align: center;
right: 0px;
font-weight: 500;
height: 16px;
box-shadow: 1px 1px 3px rgb(0 0 0 / 15%);
line-height: 16px;
width: 16px;
border-radius: 50px !important;
background-color: #fff;
}
.isc-pos-abs-cir-icon-s1 {
position: absolute;
left: -1px;
top: 25%;
height: 605px;
width: 15px;
background-color: #ffffff;
border-bottom-left-radius: 4px !important;
color: #fff;
border-top-left-radius: 4px !important;
cursor: pointer;
z-index: 999;
}
.isc-pos-abs-cir-icon-s1 h2 {
position: relative;
display: block;
margin: 0px 0px 0px 0px;
background-color: #17b4d3;
color: #fff;
font-size: 12px;
font-weight: 400;
padding: 4px 0px 0px 0px;
line-height: 20px;
border-bottom-left-radius: 50px !important;
border-bottom-right-radius: 50px !important;
}
.isc-pos-abs-cir-icon-s1 h2 span {
display: block;
min-height: 7px;
line-height: 16px;
font-size: 10px;
word-wrap: break-word;
padding: 0px 4px;
text-transform: uppercase;
}
.isc-pos-abs-cir-icon-s1 i {
margin: 10px 0px 0px 0px;
font-size: 11px;
line-height: 15px;
text-align: center;
border-radius: 50px !important;
width: 15px;
color: #17b4d3;
border: 1px solid #17b4d3;
background-color: #fff;
}
.isc-active {
    background-color: #d7dbe2 !important;
}
.div-col-80per{
    width:79%;
}
 .isc-bor-lft-pos{
     margin-left:12px;
 }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <%--<div class="isc-pos-abs-cir-icon-s1" title="Detail" id="det_lft_coll_click" style="display: none;">
<h2>

<span>D</span><span>E</span><span>T</span><span>A</span><span>I</span><span>L</span><i class="fa fa-angle-double-right"></i>


</h2>
</div>--%>
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-cog"></i>
                        <h2 style="line-height: 30px;">Payment Setup</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per ">
                <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                      <a class="isc-theme-blue-btn bg-grey" id="btn-Cancel">Cancel </a>
                </div>
                <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                      <a class="isc-theme-blue-btn " id="btn-connect">Connect </a>
                </div>
                  <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                      <a class="isc-theme-blue-btn" id="btn-Dwolla-connect" style="display:none">Connect </a>
                </div>
                <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                   <a class="isc-theme-blue-btn" style="display:none" href="#" id="btn-delete-paypalaccount">Delete Account </a>
                    </div>
                <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                    <a class="isc-theme-blue-btn" href="#" style="display:none" id="btn-delete-DwollaAcc">Delete Account</a>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" <%--style="height: 287px;"--%>>
            <div class="screen-row">
                <%--   <div class="isc-app-screen-sec-container-s1 ">--%>

                <div class="screen-row">
                   <%-- <div class="div-col-20per" id="lft_coll_panel" style="display:none;">
                        <div class="isc-lft-coll-pan-cntrl">
                                <i class="fa fa-angle-double-left" title="Collapse" id="icn-coll-pan-con"></i>
                            </div>
                        <div class="isc-app-side-menu isc-wid-unset" style="bottom: 0; top: 0; position: relative;">
                            <div class="isc-slide-in-scroll-con-s1">
                                <ul class="isc-slide-lft-par-nav-s1 ">
                                    <li class="">
                                        <a href="#" tab-paymentsetup="Paypal">
                                            <h2>PayPal</h2>
                                        </a>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>--%>
               
                    <div class="screen-row">
                        <div class="div-col-20per" <%--id="lft_coll_panel"--%>>
                            <%--<div class="isc-lft-coll-pan-cntrl">
                                <i class="fa fa-angle-double-left" title="Collapse" id="icn-coll-pan-con"></i>
                            </div>--%>
                        <div class="isc-app-side-menu isc-wid-unset" style="bottom: 0; top: 0; position: relative;">
                          
                            
                           <div class="isc-slide-in-scroll-con-s1">
                                <ul class="isc-slide-lft-par-nav-s1 " id="payment-Options-Ul" style="cursor:pointer">
                                  
                                    <li class="isc-active" data-Payment-Option="1">

                                        <a  class="isc-opt1">

                                            <h2>
                                                <img style="height:30px;" src="images/Paypal.png" />
                                                
                                                PayPal</h2>
                                        </a>
                                        
                                    </li>
                                    <li class=""  data-Payment-Option="2" >
                                        <a  class="isc-opt2">
                                            <h2>
                                                <img style="height:30px" src="images/Dwolla.png" />
                                                Dwolla</h2>
                                        </a>
                                        
                                    </li>
                                   <%-- <li class="">
                                        <a href="#" class="isc-opt3">
                                            <h2>Wepay</h2>
                                        </a>
                                        
                                    </li>
                                     <li class="">
                                        <a href="#" class="isc-opt4">
                                            <h2>Stripe</h2>
                                        </a>
                                        
                                    </li>--%>


                                </ul>
                                
                            </div>
                           
                            
                           
                            
                        </div>
                    </div>
                        <div class="div-col-80per isc-bor-lft-pos" <%--id="rgt_coll_panel"--%>>
                            <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
                            <div class="isc-pay-cont">
                            <div class="screen-row isc-mar-all">
                              
                                <div class="isc-opt1-cont" id="container-paypalsetup" style="display: block;">
                                 <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b"> Credentials Info</h5>

                                      <div class="screen-row">
                            <div class="div-col-50per">
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
                                    <%--<div class="screen-row" style="margin-top: 30px;">
                                        <div class="isc-pay-btn-cont">
                                            <a class="isc-theme-blue-btn"  id="btn-connect">Connect </a>
                                        </div>
                                    </div>--%>
                            </div>
                             </div>
                           <div class="screen-row  mar-top-20">
                                <h5 class="isc-bill-trk-hdr-txt  isc-pad-10  isc-g-b"> Documents</h5>
                                     <div class="div-col-50per  mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Setup Instruction : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                       <p><a style="line-height:30px;cursor:pointer" id="openPDF">API Credentials.pdf <img src="img/appimages/PDF_icon.png" class="isc-pdf-icn"></a></p>
                                                                    </div>
</div>
</div>

                                    </div>
                                <div class="isc-opt2-cont" style="display: none;">
                                 <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b"> Credentials Info</h5>

                                      <div class="screen-row">
                            <div class="div-col-50per">
                                
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Key <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>:</label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" id="txt-DKey" class="form-control" placeholder="Enter Key"/>
                                                                          <span id="err-dwollaKey" span-Error="true" style="color: red; display: none;">Key should not be empty</span>
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Secret <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" id="txt-DSecret" class="form-control" placeholder="Enter Secret"/>
                                                                          <span id="err-dwollaSecret" span-Error="true" style="color: red; display: none;">Secret should not be empty</span>
                                                                    </div>
                                                                </div>
                              
                            </div>
                                          </div>

                                    <div class="screen-row  mar-top-20">
                                <h5 class="isc-bill-trk-hdr-txt  isc-pad-10  isc-g-b"> Documents</h5>
                                     <div class="div-col-50per  mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Setup Instruction : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                       <p><a id="openDwollaPDF" style="line-height:30px;cursor:pointer;">API Credentials.pdf <img src="img/appimages/PDF_icon.png" class="isc-pdf-icn"></a></p>
                                                                    </div>
</div>
</div>
                                    </div>
                                <div class="isc-opt3-cont" style="display: none;">
                                 <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b"> Credentials Info</h5>

                                      <div class="screen-row">
                            <div class="div-col-50per">
                                
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">API Username : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter API Username">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">API Password : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter API Password">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">API Signature : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter API Signature">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Client ID : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter Client ID">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Secret Key : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter Secret Key">
                                                                    </div>
                                                                </div>

                            </div>
                                          </div>

                                    <div class="screen-row  mar-top-20">
                                <h5 class="isc-bill-trk-hdr-txt  isc-pad-10  isc-g-b"> Documents</h5>
                                     <div class="div-col-50per  mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Setup Instruction : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                       <p><a href="#mp_bill-view" data-toggle="modal" style="line-height:30px;">API Credentials.pdf <img src="img/appimages/PDF_icon.png" class="isc-pdf-icn"></a></p>
                                                                    </div>
</div>
</div>
                                    </div>
                                <div class="isc-opt4-cont" style="display: none;">
                                 <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b"> Credentials Info</h5>

                                      <div class="screen-row">
                            <div class="div-col-50per">
                                
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">API Username : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter API Username">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">API Password : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter API Password">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">API Signature : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter API Signature">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Client ID : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter Client ID">
                                                                    </div>
                                                                </div>
                                <div class="screen-row mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Secret Key : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <input type="text" class="form-control" placeholder="Enter Secret Key">
                                                                    </div>
                                                                </div>

                            </div>
                                          </div>

                                    <div class="screen-row  mar-top-20">
                                <h5 class="isc-bill-trk-hdr-txt  isc-pad-10  isc-g-b"> Documents</h5>
                                     <div class="div-col-50per  mar-top-20">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Setup Instruction : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                       <p><a href="#mp_bill-view" data-toggle="modal" style="line-height:30px;">API Credentials.pdf <img src="img/appimages/PDF_icon.png" class="isc-pdf-icn"></a></p>
                                                                    </div>
</div>
</div>
                                    </div>



                               
                                </div>
                        </div>
                            
                                      <div class="isc-pay-det" id="container-paypalinfo" style="display: none;">
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
                                <h5 class="isc-usr-hme-hdr-sec-h5 mar-top-30">Recent PayPal Transactions<i title="It takes maximum of 3 hours for executed transactions to appear in the list." class="fa fa-info-circle " style="color: #1589ee; padding-left: 5px;"></i></h5>
                               <div class="isc-tab-src-cont-res">
                                 <table id="tbl-paypal-transaction" class="isc-table-read-optimal mar-top-10">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%;" title="Date" class="header">Date
                                            </th>
                                             <th style="width: 15%;" title="Transaction Id" class="header">Transaction Id
                                            </th>
                                            <th style="width: 20%;" title="Name" class="header">Name
                                                        
                                            </th>
                                             <th style="width: 10%;" title="Amount" class="header"> Amount
                                            </th>
                                             <th style="width: 10%;" title="Fee" class="header">Fee
                                            </th>
                                            <th style="width: 15%;" title="Type" class="header">Type
                                            </th>
                                             <th style="width: 20%;" title="Description" class="header">Description
                                            </th>
                                            <th style="width: 10%;" title="Status" class="header">Status
                                            </th>
                                           

                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                                </div>
                           <%-- <div class="screen-row" style="margin-top: 30px;">
                                <div class="isc-pay-btn-cont" style="width:100%;text-align:center;padding-right: 210px; margin-bottom:20px;">
                                    <a class="isc-theme-blue-btn" href="#" id="btn-delete-paypalaccount">Delete Account </a>

                                </div>
                            </div>--%>
                        </div>
                            <div class="isc-pay-det" id="container-dwollainfo" style="display: none;">
                            <div class="screen-row isc-mar-all">
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per">
                                            <label class="mar-top-5">Dwolla Balance : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <label class="mar-top-5" id="lbl-dwollabalance">0</label>
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
                            <div class="screen-row isc-mar-all isc-lst-scrl-cont">
                                <h5 class="isc-usr-hme-hdr-sec-h5 mar-top-30">Recent Dwolla Transactions<i title="It takes maximum of 2 Days for executed transactions to transfer the fund." class="fa fa-info-circle " style="color: #10c1e9fa; padding-left: 5px;"></i></h5>
                                <table id="tbl-Dwolla-transaction" class="isc-table-read-optimal mar-top-10">
                                    <thead>
                                        <tr>
                                           
                                             <th style="width: 20%;" title="Transaction Id" class="header">Transaction Id
                                            </th>
                                            <th style="width: 20%;" title="Fund From" class="header">Fund From
                                                        
                                            </th>
                                             <th style="width: 20%;" title="Fund To" class="header"> Fund To
                                            </th>
                                             <th style="width: 10%;" title="Amount" class="header">Amount
                                            </th>
                                            <th style="width: 15%;" title="Remarks" class="header">Remarks
                                            </th>
                                             <th style="width: 10%;" title="Initiated On" class="header">Initiated On
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <%--<div class="screen-row" style="margin-top: 30px;">
                                <div class="isc-pay-btn-cont" style="width:100%;text-align:center;padding-right: 210px; margin-bottom:20px;">
                                    <a class="isc-theme-blue-btn" href="#" id="btn-delete-DwollaAcc">Delete Account </a>

                                </div>
                            </div>--%>
                        </div>
    </div>
    </div>
                </div>
            </div>

            <%--  </div>--%>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete_paypal" tabindex="-1" role="basic" aria-hidden="false" style="display: none !important;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Paypal Account</h4>
                        </div>
                        <div class="cell-right">
                            <i class="fa fa-times" role-delete-cancel="true" style="cursor: pointer" title="Close" data-dismiss="modal"></i>
                            <%-- <button type="button" class="close img-typ-sq" role-Delete-Cancel="true" title="Cancel" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height: 100px; text-align: center;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <p class="isc-bill-conf-del">Are you sure you want to remove this account?</p>
                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-confirm-delete-paypalaccount">
                            Yes</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            No</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_delete_dwolla" tabindex="-1" role="basic" aria-hidden="false" style="display: none !important;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Dwolla Account</h4>
                        </div>
                        <div class="cell-right">
                            <i class="fa fa-times" dwolla-delete-cancel="true" style="cursor: pointer" title="Close"></i>
                            <%-- <button type="button" class="close img-typ-sq" role-Delete-Cancel="true" title="Cancel" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height: 100px; text-align: center;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <p class="isc-bill-conf-del">Are you sure you want to remove this account?</p>
                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-confirm-delete-dwollaaccount">
                            Yes</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" dwolla-delete-cancel="true">
                            No</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">API Credentials.pdf</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height: 450px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="isc-sec-in-con-y-scroll-con-s1">
                                            <div class="isc-sec-in-con-y-scroll-bdy-con-s2">
                                                <iframe src="API Credentials.pdf" class="isc-new-exp-pdf" style="border: none; width: 100%; height: 400px; overflow: hidden; overflow-y: auto;"></iframe>
                                            </div>
                                        </div>
                                    </div>

                                </div>




                            </div>

                        </div>


                    </div>

                </div>

                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script>
        $(".isc-pay-clp").click(function () {
            $(".isc-collapse").toggle();
        });
    </script>
    <script>
        $("#connect").click(function () {
            $(".isc-pay-det").show();
            $(".isc-pay-cont").hide();
        });


    </script>
    <script type="text/javascript">


$("#det_lft_coll_click").click(function () {
$("#det_lft_coll_click").hide();
$("#lft_coll_panel").show();
$("#rgt_coll_panel").removeClass().addClass('div-col-80per');
});
$("#icn-coll-pan-con").click(function () {
$("#det_lft_coll_click").show();
$("#lft_coll_panel").hide();
$("#rgt_coll_panel").removeClass().addClass('div-col-100per pad-lft-med');
});
</script>
    <%--<script>

$(document).ready(function () {
$(".isc-opt1").click(function () {
$(".isc-opt1-cont").show()
$(".isc-opt2-cont").hide()
$(".isc-opt3-cont").hide()
$(".isc-opt4-cont").hide()

});
$(".isc-opt2").click(function () {
$(".isc-opt1-cont").hide()
$(".isc-opt2-cont").show()
$(".isc-opt3-cont").hide()
$(".isc-opt4-cont").hide()

});
$(".isc-opt3").click(function () {
$(".isc-opt1-cont").hide()
$(".isc-opt2-cont").hide()
$(".isc-opt3-cont").show()
$(".isc-opt4-cont").hide()

}); $(".isc-opt4").click(function () {
$(".isc-opt1-cont").hide()
$(".isc-opt2-cont").hide()
$(".isc-opt3-cont").hide()
$(".isc-opt4-cont").show()

});
});


</script>--%>
    <script>
$(document).ready (function () {
$('i.fa.fa-chevron-circle-right').click (function () {
    $('.div-col-20per').toggleClass('dis-n');
    $('.div-col-80per').toggleClass('isc-width-1');

    $(' .isc-bor-rgt-pos .fa-chevron-circle-right').toggleClass("fa-chevron-circle-right-rotate");
   
});
});


</script>
    <script src="iscjsengine/PageScript/PaymentSetup.js"></script>
    <script src="iscjsengine/PageScript/PaypalSetup.js"></script>
</asp:Content>
