<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AddVendor.aspx.cs" Inherits="BillManagement.AddVendor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-bill-trk-viw-del-sel .select2-container{
            width:100% !important;
        }

        .isc-btn-inp-typ-file-s1 {
         margin: 0px 0px 0px 0px;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         padding: 6px 8px 6px 8px;
         border-radius: 3px !important;
         background-color: #00a1b7;
         text-decoration: none;
         font-size: 12px;
         cursor: pointer;
         font-weight: 400;
         color: #ffffff;
         line-height: 14px;
         text-transform: capitalize;
         position: relative;
         border: none;
         letter-spacing: 0.7px;
         -webkit-transition: background-color 0.2s ease-out;
         -moz-transition: background-color 0.2s ease-out;
         -ms-transition: background-color 0.2s ease-out;
         -o-transition: background-color 0.2s ease-out;
         transition: background-color 0.2s ease-out;
         position: relative;
         position: absolute;
         bottom: 0px;
         display:none;
         }
        .isc-org-logo-area:hover .isc-btn-inp-typ-file-s1
        {
            display:block;
        }
        .isc-bkd-brd-vis .select2-container{
            z-index:999 !important;
        }
        .isc-app-screen-sec-container-s1 {
    padding: 10px 0px !important;
}
        .isc-g-b{
            padding-bottom:8px !important;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
 

<div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-plus"></i>
                        <h2 style="line-height: 30px;" id="page-Title">Add Vendor </h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                    <a class="isc-theme-blue-btn isc-sav-btn" id="save-Vendor">Save</a>
                       <a class="isc-theme-blue-btn isc-sav-btn" id="update-Vendor" style="display:none;">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="cancel-Vendor">Cancel</a>
                </div>
                <%-- <div class="cell-right  mar-top-10">

                    <a class="isc-theme-blue-btn" href="#">Submit </a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row isc-new-thm-pad">
                          <div class="div-col-50per" style="position:relative">
                     <h5 class="isc-bill-trk-hdr-txt mar-bot-med" style="cursor:context-menu !important">Company Logo : </h5>
                    <div class="isc-org-logo-area mar-top-10" id="file_Viewer">
                                        <h2>LOGO</h2>
                        <span class="isc-btn-inp-typ-file-s1" >Choose Company Logo

                                    <input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                        </span>
                                     <%--   <a href="#"><input type="file" id="browseLogo" placeholder="Choose Company Logo"></a>--%>
                                    </div>
                              <i class="fa fa-refresh" id="remove-Logo" title="Reset Logo" style="position:absolute;bottom:1px;left:165px;cursor:pointer;"></i>
                              </div>
                        <div class="div-col-50per" style="display:none;">
                              <h5 class="isc-bill-trk-hdr-txt mar-bot-med">Missing Informations : </h5>
                       <span style="color:red;" class="validation-message" >Vendor Name should not be empty</span>              
                             </div>
                        </div>
                  
                     <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important">Vendor Details : </h5>
                    <div class="screen-row isc-new-thm-pad mar-top-10">
                        <div class="screen-row ">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Vendor Name<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" maxlength="50" id="txt-Vendor-Name" tabindex="1" placeholder="Enter Vendor Name"  data-textbox="vendorName" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                        <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="vendorName">Vendor Name contains invalid characters. Allowable characters are  A-Z, a-z,0-9,&,@,£,$,€ ,¥,#,. ,:,:,-.</span>
                                          <span style="color:red;display:none;" class="validation-message" id="vendorName-Validation" data-validation="vendorName">Vendor Name should not be empty</span>              

                                          </div>
                                </div>
                            
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Vendor Type : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel isc-bkd-brd-vis">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="2"
                                                    aria-hidden="true" id="slt-Vendor-Type">
                                                    <option>Choose Vendor Type</option>
                                                </select>
                                            </div>
                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Primary Email<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Email" placeholder="Enter Primary Email" maxlength="64" data-Email="vendorEmail" tabindex="3"  class="form-control /">
                                      <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="vendorEmail">Entered Email id is not valid.</span>
                                           <span style="color:red;display:none;" class="validation-message" id="vendorEmail-Validation" data-validation="vendorEmail">Primary Email should not be empty</span>              
                                         <span style="color:red;display:none;" class="validation-message" id="vendorDuplicateEmail-Validation" data-validation="vendorEmail">Email Id already exist,Try any other Email Id</span>              
                                                        </div>
                                </div>
                               <%-- <div class="div-col-50per">--%>
                                   <%-- <div class="div-col-30per">
                                                            <label class="mar-top-5">Address Line One<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                   
                                    </div>--%>
                                    <%--<div class="div-col-50per">
                                                            <input type="text" id="txt-addressln-one" placeholder="Enter Address Line One" data-textbox="vendorAddressOne" class="form-control">
                                        <span style="color:red;display:none;" class="validation-message" id="vendorAddressOne-Validation" data-validation="vendorAddressOne">Address line one should not be empty</span>                                                   
                                         </div>--%>
                                <%--</div>--%>
                     <%--       <div class="div-col-50per">--%>
                                  <%--  <div class="div-col-30per">
                                                            <label class="mar-top-5">Address Line Two<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>--%>
                                   <%-- <div class="div-col-50per">
                                                            <input type="text" id="txt-addressln-two" data-textbox="vendorAddresstwo" placeholder="Enter Address Line Two" class="form-control ">
                                       <span style="color:red;display:none;" class="validation-message" id="vendorAddresstwo-Validation" data-validation="vendorAddresstwo">Address line two should not be empty</span>                                                                       
                                    </div>--%>
                                <%--</div>--%>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Vendor Address : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                         <textarea placeholder="Enter Address" id="txt-addressln-one" rows="4" maxlength="250" tabindex="4" class="form-control" style="resize:none;"></textarea>
                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">City : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter City" id="txt-City" tabindex="5" data-textbox="vendorCity" maxlength="20" class="form-control twAlbhabets-only<%--isc-exp-mang-txt-bx1--%>">
                                          <span style="color:red;display:none;" class="validation-message" id="vendorCity-Validation" data-validation="vendorCity">City should not be empty</span>                                                                                     
                                          </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">State : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter State" id="txt-State" tabindex="6" data-textbox="vendorState"  maxlength="20" class="form-control twAlbhabets-only<%--isc-exp-mang-txt-bx1--%>">
                                         <span style="color:red;display:none;" class="validation-message" id="vendorState-Validation" data-validation="vendorState">State should not be empty</span>                                                                                                    
                                         </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Zip : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Zip" id="txt-Zip-Code" maxlength="10" tabindex="7"  data-textbox="vendorZip" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>">
                                         <span style="color:red;display:none;" class="validation-message" id="vendorZip-Validation" data-validation="vendorZip">Zip Code should not be empty</span>                                                                                                                 
                                           </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Contact Number <sup class="isc-bill-trk-sup"><i class="" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Contact Number" phone-Number="true" maxlength="11" tabindex="8"  data-textbox="vendorContact" id="txt-Contact-Number" class="form-control number-only">
                                          <span style="color:red;display:none;" class="validation-message" id="vendorContact-Validation" data-validation="vendorContact">Contact Number should not be empty</span>
                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Preferred Payment Method<sup class="isc-bill-trk-sup"><i class="" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                             <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel isc-pay-bill-wdth isc-bkd-brd-vis">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="9"
                                                    aria-hidden="true" id="slt-Prefferd-Payment-Method" data-Select="vendorPrefPaymentTerm">
                                                    <option>Choose Preferred Payment Method</option>
                                                   
                                                </select>
                                                                   <span style="color:red;display:none;" class="validation-message" id="PrefferedPaymentTerm-Validation" data-validation="vendorPrefPaymentTerm">Preferred Payment Method should not be empty</span>
                                            </div>
                                                        </div>
                                </div>
                               <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Tax ID : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Tax-ID" data-taxid="true" maxlength="9" tabindex="10" placeholder="Enter Tax ID" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Payment Terms<sup class="isc-bill-trk-sup"><i class="" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                             <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel isc-pay-bill-wdth isc-bkd-brd-vis">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="11"
                                                    aria-hidden="true" id="slt-Payment-Terms"  data-Select="vendorPaymentTerm">
                                                    <option value="0">Choose Payment Terms</option>
                                                   
                                                </select>
                                                                  <span style="color:red;display:none;" class="validation-message" id="vendorPaymentTerm-Validation" data-validation="vendorPaymentTerm">Payment Terms should not be empty</span>
                                            </div>
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Lead Time (Days) : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                         <input type="text" id="lead-Time-Days" placeholder="Enter Lead Time (Days)" maxlength="5" tabindex="12" class="number-only form-control <%--isc-exp-mang-txt-bx1--%>">

                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">GL Account   <sup class="isc-bill-trk-sup"><i class="" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel isc-pay-bill-wdth isc-bkd-brd-vis">
                                         <select class="isc-select-dropdown select2" aria-hidden="true" tabindex="13" id="slt-GL-Codes"  data-Select="GLCode">
                                                    <option value="0">Choose GL Account</option>
                                                   
                                                </select>
                                            </div>
                                                            <%--<input type="text" placeholder="Enter GL Code" id="txt-SSN" maxlength="10"  data-textbox="vendorSSN" class="number-only form-control number-only">--%>
                                      <span style="color:red;display:none;" class="validation-message" id="Gl-Code-Validation" data-validation="GLCode">GL Account should not be empty</span>                    
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">External Number :</label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter External Number" id="txt-External"  tabindex="14" data-textbox="vendorURL" class="form-control"/>
                                        
                                                        </div>
                                </div>
                            </div>
                        
                        </div>

                       <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important">Paypal Details : </h5>

                    <div class="screen-row isc-new-thm-pad mar-top-10">
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Paypal Email Address<%--<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> --%>:</label>
                                                        </div>
                                    <div class="div-col-50per">
                                                               <input type="text" maxlength="64" id="payPal-Email" data-Email="pEmail" tabindex="15" placeholder="Enter Paypal Email Address" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                      <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="pEmail">Entered Email id is not valid.</span>                    
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Mobile Number<%--<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>--%> :</label>
                                                        </div>
                                    <div class="div-col-50per">
                                                               <input type="text" id="payPal-Mob" maxlength="11" phone-Number="true" placeholder="Enter Mobile Number" tabindex="16" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>">
                                                        </div>
                                </div>
                            </div>
                        
                    </div>
                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important">Bank Details : </h5>

                    <div class="screen-row isc-new-thm-pad mar-top-10">
                        <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Account Holder's Name :</label>
                                                        </div>
                                    <div class="div-col-50per">
                                                             <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                               <%-- <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="txt-Account-Holder-Name">
                                                    <option>Acc Holder Name</option>
                                                </select>--%>
                                                                         <input type="text" placeholder="Enter Account Holder's Name" tabindex="17" data-textbox="vendorBnkAccHolderName"  id="txt-Account-Holder-Name" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                  <span style="color:red;display:none;" class="validation-message" id="vendorBnkAccHolderName-Validation" data-validation="vendorBnkAccHolderName">Account Holder's Name should not be empty</span>
                                                                            </div>
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Account Number
 : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                         <input type="text" placeholder="Enter Account Number" id="txt-Account-Number" maxlength="16"  tabindex="19"   data-textbox="vendorAccNumber" class="form-control number-only">
                                                            <span style="color:red;display:none;" class="validation-message" id="vendorAccNumber-Validation" data-validation="vendorAccNumber">Account Number should not be empty</span>                    
                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                

                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Routing Number :</label>
                                                        </div>
                                    <div class="div-col-50per">
                                                               <input type="text"  placeholder="Enter Routing Number" tabindex="18" maxlength="9" id="txt-Routing-Number"  data-textbox="vendorRoutingNumber"  class="form-control number-only">
                                     <span style="color:red;display:none;" class="validation-message" id="vendorRoutingNumber-Validation" data-validation="vendorRoutingNumber">Routing Number should not be empty</span>                    
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Confirm Account Number   :</label>
                                                        </div>
                                    <div class="div-col-50per">
                                                               <input type="text" placeholder="Enter Confirm Account Number"  maxlength="16" id="txt-reenter-Account-Number" tabindex="20"  data-textbox="vendorReAccNumber" class="form-control number-only">
                                         <span style="color:red;display:none;" class="validation-message" id="vendorEmptReAccNumber-Validation" data-validation="vendorReAccNumber">Confirm Account Number should be empty</span>                                        
                                      <span style="color:red;display:none;" class="validation-message" id="vendorReAccNumber-Validation" data-validation="vendorReAccNumber">Confirm Account Number should be match with the entered account number</span>                                        
                                    </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10">
                                
                                
                            </div>
                    </div>
                   
                    </div>
                </div>
            </div>
          </div>
    <script src="iscjsengine/PageScript/Addvendor.js"></script>
      <script src="https://js.stripe.com/v3/"></script>
    <script src="iscjsengine/PageScript/Stripe.js"></script>
</asp:Content>
