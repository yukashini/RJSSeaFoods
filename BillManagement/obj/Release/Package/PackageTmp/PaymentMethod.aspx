<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="PaymentMethod.aspx.cs" Inherits="BillManagement.PaymentMethod" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-up-bill-lft-cont {
            border: none;
        }

        .isc-bill-trk-pay-mthd-new {
            padding: 5px;
        }

        .isc-set-deflt {
            padding-left: 0px !important;
        }
        .isc-theme-blue-btn {
    padding: 10px 25px;
    border-radius: 20px !important;
}


.isc-pay-btn-cont {
    padding-left:490px;
    padding-top: 70px;
}
.isc-pay-mnt-crd-cont {
    padding: 10px;
    height: unset;
    background: rgba(52, 73, 94, 0.02);
}
.isc-pay-mdh-crcy {
    margin: 0px;
    font-size: 21px;
    line-height: 36px;
    font-weight: 400;
    color: #5d5d5d;
}
#mp_dwollaPayout .modal-body {
    height: calc(100vh - 110px);
    overflow-y: scroll;
}
.select2-container {
    z-index: 99999999 !important;
}
#mp_paypal-paynow-confirmation.modal-body {
    height: calc(100vh - 110px);
    overflow-y: scroll;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-home"></i>
                        <h2 style="line-height: 30px;">Payment Methods</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                 <div class="cell-right " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn"  style="background-color: #aeaeae !important;border-radius: 3px !important;padding: 4px 6px;" id="btn-Cancel">Cancel</a>

                </div>
                 
                <%--  <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn" href="#" style="background-color: #aeaeae !important;" title="Cancel"><i class="fa fa-times "></i> </a>
                </div>
                <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn" href="#" title="Save"><i class="fa fa-floppy-o "></i></a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <%--   <div class="isc-app-screen-sec-container-s1 ">--%>
                <div class="screen-row">
                    <div class="div-col-20per" id="lft_coll_panel">
                        <div class="isc-app-side-menu isc-wid-unset isc-hegt-unset-mb" style="bottom: 0; top: 0; position: relative;">

                            <div class="isc-slide-in-scroll-con-s1">
                                <ul class="isc-slide-lft-par-nav-s1 ">

                                    <li class="">
                                        <a href="#">
                                            <h2>Payment Type</h2>
                                        </a>

                                    </li>


                                </ul>

                            </div>
                            <div id="preffered-Payments">
                            </div>
                            <div id="dwolla-Payments">
                            </div>
                            <div class="isc-slide-in-scroll-con-s1">
                              <%--  <ul class="isc-slide-lft-par-nav-s1 ">

                                    <li class="">
                                        <a href="#">
                                            <h2>Other Payment Methods</h2>
                                        </a>

                                    </li>


                                </ul>--%>

                            </div>
                            
                            <div class="isc-collapse" id="cards">
                                <%--<div class="isc-bill-pay-mthd1" href="#Tab1" data-toggle="tab">
                                    <div class="screen-row">
                                        <div class="div-col-10per">
                                           <p></p>
                                        </div>
                                        <div class="div-col-90per">
                                           <div class="isc-pay-mnt-crd-cont">
                                               <div class="div-col-25per">
                                                   <img src="img/appimages/mastercard.png" class="isc-pay-mdh-img1"/>
                                               </div>
                                               <div class="div-col-75per">
                                                   <h6 class="isc-pay-mdh-h6">Card Name <span> 54340******4014</span></h6>
                                                   <h6 class="isc-pay-mdh-h6">Expiration Date <span> 6/2016</span></h6>
                                               </div>
                                           </div>
                                        </div>
                                       
                                    </div>
                                </div>--%>
                                <div class="isc-bill-pay-mthd1" href="#Tab1" data-toggle="tab">
                                    <%--<div class="screen-row mar-top-10">
                                        <div class="div-col-10per">
                                           <p></p>
                                        </div>
                                        <div class="div-col-90per">
                                           <div class="isc-pay-mnt-crd-cont">
                                               <div class="div-col-25per">
                                                   <img src="img/appimages/visa1.png" class="isc-pay-mdh-img1" style="width:50px;"/>
                                                 
                                               </div>
                                               <div class="div-col-75per">
                                                   <h6 class="isc-pay-mdh-h6">Card Name <span> 41111******11111</span></h6>
                                                   <h6 class="isc-pay-mdh-h6">Expiration Date <span> 12/2018</span></h6>
                                               </div>
                                           </div>
                                        </div>
                                       
                                    </div>--%>
                                </div>
                            </div>

                            
                            <div class="isc-collapse-ACH" id="ACH">
                                <%--<div class="isc-bill-pay-mthd1" href="#Tab1" data-toggle="tab">
                                    <div class="screen-row">
                                        <div class="div-col-10per">
                                           <p></p>
                                        </div>
                                        <div class="div-col-90per">
                                           <div class="isc-pay-mnt-crd-cont">
                                               <div class="div-col-25per">
                                                   <img src="img/appimages/mastercard.png" class="isc-pay-mdh-img1"/>
                                               </div>
                                               <div class="div-col-75per">
                                                   <h6 class="isc-pay-mdh-h6">Card Name <span> 54340******4014</span></h6>
                                                   <h6 class="isc-pay-mdh-h6">Expiration Date <span> 6/2016</span></h6>
                                               </div>
                                           </div>
                                        </div>
                                       
                                    </div>
                                </div>--%>
                                <div class="isc-bill-pay-mthd1" href="#Tab1" data-toggle="tab">
                                    <%--<div class="screen-row mar-top-10">
                                        <div class="div-col-10per">
                                           <p></p>
                                        </div>
                                        <div class="div-col-90per">
                                           <div class="isc-pay-mnt-crd-cont">
                                               <div class="div-col-25per">
                                                   <img src="img/appimages/visa1.png" class="isc-pay-mdh-img1" style="width:50px;"/>
                                                 
                                               </div>
                                               <div class="div-col-75per">
                                                   <h6 class="isc-pay-mdh-h6">Card Name <span> 41111******11111</span></h6>
                                                   <h6 class="isc-pay-mdh-h6">Expiration Date <span> 12/2018</span></h6>
                                               </div>
                                           </div>
                                        </div>
                                       
                                    </div>--%>
                                </div>
                            </div>
                            <%--<div class="isc-bill-pay-mthd" href="#Tab2" data-toggle="tab">
                                    <div class="screen-row">
                                       
                                        <div class="div-col-90per">
                                            <h5 class="isc-bill-pay-mthd-h5"> <i class="fa fa-arrow-circle-o-right isc-bill-pay-mthd-icn"></i> Credit Cards</h5>
                                        </div>
                                        <div class="div-col-10per">
                                            <i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>
                                        </div>
                                    </div>
                                </div>--%>
                            <%-- <div class="isc-bill-pay-mthd" href="#Tab3" data-toggle="tab">
                                    <div class="screen-row">
                                       
                                        <div class="div-col-90per">
                                            <h5 class="isc-bill-pay-mthd-h5"><i class="fa fa-arrow-circle-o-right isc-bill-pay-mthd-icn"></i> Electronic Check</h5>
                                        </div>
                                        <div class="div-col-10per">
                                            <i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>
                                        </div>
                                    </div>
                                </div>
                            <div class="isc-bill-pay-mthd">
                                    <div class="screen-row">
                                        
                                        <div class="div-col-90per">
                                            <h5 class="isc-bill-pay-mthd-h5"> <i class="fa fa-arrow-circle-o-right isc-bill-pay-mthd-icn"></i> Net Banking</h5>
                                        </div>
                                        <div class="div-col-10per">
                                            <i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>
                                        </div>
                                    </div>
                                </div>
                            <div class="isc-bill-pay-mthd">
                                    <div class="screen-row">
                                      
                                        <div class="div-col-90per">
                                            <h5 class="isc-bill-pay-mthd-h5"> <i class="fa fa-arrow-circle-o-right isc-bill-pay-mthd-icn"></i> Direct Deposit</h5>
                                        </div>
                                        <div class="div-col-10per">
                                            <i class="fa fa-plus isc-bill-pay-mthd-plu-icn"></i>
                                        </div>
                                    </div>
                                </div>
                            --%>
                        </div>
                    </div>
                    <div class="div-col-80per">
                        <div class="screen-row">
                            <div class="div-col-75per isc-mb-res-pad-10" id="">
                                <div class="isc-up-bill-lft-cont">

                                    <div class="screen-row mar-top-10">
<div class="div-col-15per">
<div class="isc-file-upload-in-con" style="padding: 5px 10px; height: 100px;">
<img id="vendor-Logo" style=" height:87px !important; /*width:111px*/ !important;" class="isc-app-vdr-logo" />

</div>
</div>

<div class="div-col-85per">
<div class="isc-up-bill-vnd-det">

<div class="div-col-100per">

<h5 id="vendor-Address"></h5>
</div>
</div>
</div>
</div>

                                    <div class="screen-row mar-top-10">

                                        <%--    <div class="div-col-15per">
                                            <div class="isc-file-upload-in-con" style="padding: 5px 10px; height: 100px;">
                                                <img src="images/pg.png" class="isc-app-vdr-logo">
                                                
                                            </div>
                                        </div>

                                        <div class="div-col-85per">
                                            <div class="isc-up-bill-vnd-det">

                                                <div class="div-col-100per">
                                                    
                                                    <h5></h5>
                                                </div>
                                            </div>
                                        </div>--%>
                                        <lable class="isc-up-bill-lbl">Vendor</lable>
                                        <h5 class="isc-up-bill-inv-data isc-up-bill-inv-amt" style="text-align: left !important; margin-top: 10px !important;" id="vendorName"></h5>
                                    </div>
                                    <div class="screen-row mar-top-30">
                                        <div class="div-col-25per">
                                            <label class="isc-up-bill-lbl">Bill Date</label>
                                            <h5 class="isc-up-bill-inv-data" id="bill-Date">-</h5>

                                        </div>
                                        <div class="div-col-25per">
                                            <lable class="isc-up-bill-lbl">Bill#</lable>
                                            <h5 class="isc-up-bill-inv-data" id="bill-Number"></h5>


                                        </div>
                                        <div class="div-col-50per" style="text-align: right;">
                                            <lable class="isc-up-bill-lbl">Amount Due ($)</lable>
                                            <h5 class="isc-up-bill-inv-data isc-up-bill-inv-amt" id="due-Amount">$0</h5>

                                        </div>
                                    </div>
                                    <div class="screen-row mar-top-10 mar-bot-med">
                                        <div class="div-col-25per">
                                            <label class="isc-up-bill-lbl">Due Date</label>
                                            <h5 class="isc-up-bill-inv-data" id="due-Date">-</h5>

                                        </div>
                                        <div class="div-col-25per">
                                            <lable class="isc-up-bill-lbl">Description</lable>
                                            <h5 class="isc-up-bill-inv-data" id="description">-</h5>

                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="screen-row mar-top-10" id="pay-Now-Div">
                            <div style="width: 100%;">
                                <div class="isc-pay-btn-cont">
                                         <a class="isc-theme-blue-btn" style="cursor:pointer"  id="btn-paynow-paypal" >Pay with PayPal </a>
                                   <a class="isc-theme-blue-btn"  id="btn-paynow-dwolla" style="display:none;cursor:pointer">Pay with Dwolla </a>
                                     </div>
                                <%--<button type="button" style="text-align: center; margin-left: 50%;">Pay Now </button>--%>
                            </div>
                        </div>
                    </div>
                </div>

                <%--  </div>--%>
            </div>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in isc-new-pop-up" id="mp_paypal-paynow-confirmation" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Paypal Payout</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times-circle" style="color: #8A8A8A; cursor:pointer" title="Close" submit-cancel="true" aria-hidden="true"  data-dismiss="modal"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height: 75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <div class="screen-row">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Payment Type </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <label><input type="radio" name="PaymentType" data-PaymentType="true" style="cursor:pointer" value="1" checked /> Email</label>
                                <label class="pad-lft-max"><input type="radio" data-PaymentType="true"   style="cursor:pointer"  value="2" title="Must be the US phone number" name="PaymentType" /> Phone Number</label></div>
                        </div>
                                        <div class="screen-row mar-top-15">
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Receiver </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                <input type="text" class="form-control" style="display: block;" id="txt-email-paypal" />
                                                <input type="text"  class="form-control" style="display: none;" id="txt-phone-paypal" />
                            </div>
                        </div>
                                    <%--    <div class="screen-row">
                                            <div class="col-50-per">
                                                <label>Payment Type</label>
                                                <select id="slt-paypal-paymenttype">
                                                    <option value="1">Email</option>
                                                    <option value="2" title="Must be the US phone number">Phone Number</option>
                                                </select>
                                            </div>
                                            <div class="col-50-per">
                                                <label>Receiver</label>
                                                <input type="text" style="display: block;" id="txt-email-paypal" />
                                                <input type="text" style="display: none;" id="txt-phone-paypal" />
                                            </div>
                                        </div>--%>
                                        <div class="screen-row mar-top-10">
                                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">  Amount : </label>
                                </div>
                            </div>
                                            <div class="div-col-65per">
                               <label class="mar-top-5" id="txt-payable-amount"></label>
                            </div>
                                            <%--Amount : <span id="txt-payable-amount"></span>--%>
                                        </div>
                                        <div class="screen-row mar-top-10">

                                             <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5" style="margin-top: 13px !important;">  PayPal Balance  : </label>
                                </div>
                            </div>
                                            <div class="div-col-65per">
                             <label class="mar-top-5" id="txt-paypal-balance-check" style="font-size:25px;"></label>
                            </div>
                                            <%--Paypal Balance : <span id="txt-paypal-balance-check"></span>--%>
                                        </div>

                                         <div class="screen-row mar-top-10" id="err-paypal-payout" style="color:red;">
                                             Note: We cannot proceed payment due to insufficient funds. 
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;">
                            Cancel</button>
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-submit-paypal-payout">
                            OK</button>
                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
       <div class="modal fade isc-popup-detail-form-s1 Mp_Relese in isc-new-pop-up" id="mp_dwollaPayout" tabindex="-1" role="basic" aria-hidden="false" style="display:none;">
        <div class="modal-dialog" style="width:700px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Dwolla Payout</h4>
                        </div>
                        <div class="cell-right">
                            <a data-Cancel-Dwolla="true"><i class="fa fa-times-circle" style="cursor:pointer" title="Close"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    
           <div class="screen-row">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Transfer Fund From<span style="color:red;font-size:14px;">*</span>
                                 </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                 <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select class="isc-select-dropdown select2" id="slt-FundingSources" tabindex="-1" aria-hidden="true">
                                                                            <option value="0">Select Funding Source</option>
                                                                        </select>
                                                                    </div>
                                
                            </div>
                          

                        </div>
                 <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Amount
                                 </label>
                                </div>
                                
                            </div>
                            <div class="div-col-65per">
                                 <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <h6 class="isc-pay-mdh-crcy" id="payable-Amount-ToVendor">$0.00</h6>
                                                                    </div>
                                
                            </div>
                          

                        </div>       
                        
                    <div class="screen-row mar-top-15" id="balanceBlock" style="display:none">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">   Dwolla Balance
                                 </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                 <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                      <h5 class="isc-up-bill-inv-data " style="font-size:25px !important;" id="dwolla-Balance-Amount">$0.00</h5>
                                                                    </div>
                                
                            </div>
                          

                        </div>    
                 </div>              
                <div class="modal-footer">
                     <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-Cancel-Dwolla="true" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;">
                                Cancel</button>
                        </div>
                    </div>
                    <div class="cell-right ">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-PayFromDwolla">
                            Ok</button>
                        </div>
                    </div>
                   
                </div>
                <!-- /.modal-content -->
            </div>
                  </div>
                     
            <!-- /.mokdmadal-dialog -->
        </div>
    <script>
        $(".isc-pay-clp").click(function () {
            $(".isc-collapse").toggle();
        });
        $(".isc-pay-clp-ACH").click(function () {
            $(".isc-collapse-ACH").toggle();
        });
    </script>
    <script src="iscjsengine/PageScript/PaymentMethod.js"></script>
    <script src="iscjsengine/PageScript/PaypalSetup.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="iscjsengine/PageScript/Stripe.js"></script>
</asp:Content>
