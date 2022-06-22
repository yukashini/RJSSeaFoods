<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AddBuyer.aspx.cs" Inherits="BillManagement.AddBuyer" %>
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
         .isc-app-screen-sec-container-s1 {
             padding:0px !important;
         }
        .isc-g-b {
            padding-top: 18px !important;
            padding-bottom: 8px !important;
            left: 30px;
            width: 1770px;
            position: relative;
            margin: auto -32px;
            float:left;
        }

        .isc-new-thm-pad .div-col-30per {
            width: 40%;
            float: left;
        }
     
        @media only screen and (max-width: 767px) {
           .isc-g-b {
                
                left: -34px !important;
                
            }
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
                        <h2 style="line-height: 30px;" id="page-Title">Add Buyer</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn isc-sav-btn" id="save-Buyer">Save</a>
                     <a class="isc-theme-blue-btn isc-sav-btn" id="update-Buyer" style="display:none">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="cancel">Cancel</a>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                     <div class="screen-row isc-new-thm-pad">
                         <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Buyer Details :</span>
                         </h5>
                         <div>
                        <div class="screen-row mar-top-15 div-col-100per" >
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Buyer Name <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="Buyername" type="text" data-textbox="BuyerName" placeholder="Enter Buyer Name" class="form-control">
                                     <span style="color:red;display:none;" class="validation-message" id="BuyerName-Validation" data-validation="BuyerName">Buyer Name should not be empty</span>                                  
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5"> Email Id : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                <input type="text" id="Email" placeholder="Enter Email Id" data-Email="customerEmail" class="form-control"/>
                                            <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="BuyerEmail">Email id is not valid.</span>
                                               <span style="color:red;display:none;" class="validation-message" id="vendorEmail-Validation" data-validation="BuyerEmail">Email should not be empty</span>              
                                             <span style="color:red;display:none;" class="validation-message" id="vendorDuplicateEmail-Validation" data-validation="BuyerEmail">Email Id already exist,Try any other Email Id</span>          
                                    </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10 div-col-100per">
                                 <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Contact Number : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" data-textbox="ContactNumber"  id="contact-Number" phone-Number="true"  maxlength="20"  placeholder="Enter Contact Number" class="form-control number-only">
                                    <span style="color:red;display:none;" class="validation-message" id="ContactNumber-Validation" data-validation="ContactNumber">Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>
                            
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Alternative Contact Number : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                         <input type="text" data-textbox="Alternative-ContactNumber"  id="Alternative-contact-Number" phone-Number="true"  maxlength="20"  placeholder="Enter Alternative Contact Number" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>">
                                    <span style="color:red;display:none;" class="validation-message" id="Alternative-ContactNumber-Validation" data-validation="AlternativeContactNumber">Alternative Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per">
                                 <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Fax : </label>
                                      </div>
                                    <div class="div-col-50per">
                                      <input type="text" data-textbox="Fax"  id="Fax" phone-Number="true"  maxlength="20"  placeholder="Enter Fax Number" class="form-control number-only">
                                    <span style="color:red;display:none;" class="validation-message" id="Fax-Validation" data-validation="Fax">Fax Number should not be empty</span>                                                      
                                    </div>
                                </div>   
                                  <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Liners : </label>
                                      </div>
                                    <div class="div-col-50per">
                                      <input type="text" data-textbox="Liners"  id="Liners" placeholder="Enter Liners" class="form-control">
                                    <span style="color:red;display:none;" class="validation-message" id="Liners-Validation" data-validation="Fax">Liners should not be empty</span>                                                      
                                    </div>
                                </div>    
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per">
                                 <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Tax ID : </label>
                                      </div>
                                    <div class="div-col-50per">
                                      <input type="text" data-textbox="Tax"  id="Tax" placeholder="Enter Tax Number" class="form-control number-only">
                                    <span style="color:red;display:none;" class="validation-message" id="Tax-Validation" data-validation="Tax">Tax Number should not be empty</span>                                                      
                                    </div>
                                </div>   
                               </div>
                             <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Address</span>
                         </h5>
                        <div class="screen-row mar-top-10 div-col-100per">
                            <div class="div-col-50per">
                                <h5 class="isc-bill-trk-hdr-txt isc-new-thm-pad isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Buyer Address :</span>
                         </h5>
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Address <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                         <textarea placeholder="Enter Buyer Address" id="Buyeraddress" class="form-control" style="resize:none;"></textarea>
                                     <span style="color:red;display:none;" class="validation-message" id="address-Validation" data-validation="AdressValidation">Address should not be empty</span>                                                                          
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <h5 class="isc-bill-trk-hdr-txt  isc-new-thm-pad isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Courier Address :</span>
                         </h5>
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Address : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                         <textarea placeholder="Enter Courier Address" id="Courieraddress" rows="4" class="form-control" style="resize:none;"></textarea>         
                                     </div>
                                </div>
                                
                            </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">City : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" placeholder="Enter Buyer City" id="Buyercity" class="form-control">    
                                      </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">City : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="Enter Courier City" id="Couriercity" class="form-control">    
                                     </div>
                                </div>
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">State : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" placeholder="Enter Buyer State" id="BuyerState" class="form-control ">
                                                           
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">State : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                         <input type="text" placeholder="Enter Courier State" id="Courierstate" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                                        </div>
                                </div>
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Country : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" placeholder="Enter Buyer Country" id="BuyerCountry" class="form-control">
                                                           
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Country : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                         <input type="text" placeholder="Enter Courier Country" id="CourierCountry" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                                        </div>
                                </div>
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Zip : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" placeholder="Enter Buyer Zip" id="BuyerZip" class="form-control">
                                                           
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Zip : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                         <input type="text" placeholder="Enter Courier Zip" id="CourierZip" class="form-control">
                                                        </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                                <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Courier Contact Details</span>
                         </h5> 

                           <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Courier Contact Name : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="Couriername" type="text" data-textbox="CourierName" placeholder="Enter Courier Name" class="form-control">
                                     <span style="color:red;display:none;" class="validation-message" id="CourierName-Validation" data-validation="CourierName">Courier Contact Name should not be empty</span>                                  
                                    </div>
                                </div>

                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Courier Contact Number : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" data-textbox="CourierContactNumber"  id="Couriercontact-Number" phone-Number="true"  maxlength="20"  placeholder="Enter Courier Contact Number" class="form-control number-only">
                                    <span style="color:red;display:none;" class="validation-message" id="CourierContactNumber-Validation" data-validation="CourierContactNumber">Courier Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                           <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Courier Alternative Contact Number : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" data-textbox="CourierAlternativeContactNumber"  id="CourierAlternativecontact-Number" phone-Number="true"  maxlength="20"  placeholder="Enter Alternative Courier Contact Number" class="form-control number-only">
                                    <span style="color:red;display:none;" class="validation-message" id="CourierAlternativeContactNumber-Validation" data-validation="CourierAlternativeContactNumber">Courier Alternative Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>

                           <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Courier Email Id : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                <input type="text" id="CourierEmail" placeholder="Enter Courier Email Id" data-Email="CourierEmail" class="form-control"/>
                                            <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="CourierEmail">Email id is not valid.</span>
                                               <span style="color:red;display:none;" class="validation-message" id="CourierEmail-Validation" data-validation="CourierrEmail">Email should not be empty</span>              
                                             <span style="color:red;display:none;" class="validation-message" id="CourierDuplicateEmail-Validation" data-validation="CourierEmail">Email Id already exist,Try any other Email Id</span>          
                                    </div>
                                </div>
                            </div>
                            </div>
</div>
                         <div>
                   </div> 
                        </div>
                 
                    </div>
                </div>
            </div>
    <script src="iscjsengine/PageScript/CreateBuyer.js"></script>
</asp:Content>
