<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Organization.aspx.cs" Inherits="BillManagement.Organization" %>
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
                        <h2 style="line-height: 30px;" id="page-Title">Organization Setup</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn isc-sav-btn" id="save-Organization">Save</a>
                     <a class="isc-theme-blue-btn isc-sav-btn" id="update-Organization" style="display:none">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="cancel">Cancel</a>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">                                       
                    <div style="position:relative" class="isc-new-thm-pad">
                        <label class="mar-top-5">Company Logo : </label>
                        <div class="isc-org-logo-area mar-top-10"  id="file_Viewer">
                                      <span class="isc-btn-inp-typ-file-s1" style="top:126px;">Choose CompanyLogo
                                    <input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;"/>
                                                        </span>
                            </div>
                        <i class="fa fa-refresh isc-lft-icon" id="remove-Logo" title="Reset Logo" style="position:absolute;bottom:1px;cursor:pointer;"></i>
                                    </div>
                    <div class="screen-row isc-new-thm-pad">
                         <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Organization Info</span>
                         </h5>
                         </div>
                    <div class="screen-row isc-new-thm-pad">
                        <div class="screen-row mar-top-15 div-col-100per" >
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Company Name <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> :  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                            <input id="CompanyName" readonly="true" type="text"  data-textbox="Enter Company Name" placeholder="Enter Company Name"  class="form-control <%--isc-exp-mang-txt-bx1--%>" />
                                     <span style="color:red;display:none;" class="validation-message" id="CompanyName-Validation" data-validation="CompanyName">Company Name should not be empty</span>                                  
                                    </div>
                                </div>
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Company Type <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="CompanyType" type="text" data-textbox=" Enter Company Type" placeholder="Enter Company Type" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="CompanyType-Validation" data-validation="CompanyType">Company Type should not be empty</span>                                  
                                    </div>
                                </div>
                        </div>
                          <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                           <span style="margin-left: -67px;">Company Address</span>
                         </h5>

                        <div class="screen-row mar-top-10 div-col-100per">
                                <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5"> Address Line 1<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>:  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                         <textarea placeholder="Enter Company Address" id="Address1" rows="4" class="form-control" style="resize:none;"></textarea>
                                                        <span style="color:red;display:none;" class="validation-message" id="Address1-Validation" data-validation="Address1">Company Address should not be empty</span>
                                   </div>
                                </div>

                              <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5"> Address Line 2<sup class="isc-bill-trk-sup"></sup>:  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                         <textarea placeholder="Enter Company Address" id="Address2" rows="4" class="form-control" style="resize:none;"></textarea>
                                                        <span style="color:red;display:none;" class="validation-message" id="Address2-Validation"> </span>
                                   </div>
                                </div>
                            </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                               <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">City <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> :  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                            <input id="City" type="text" data-textbox="Enter City" placeholder="Enter City" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="City-Validation" data-validation="City">City should not be empty</span>                                  
                                    </div>
                                </div>
                               <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">State <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> :  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                            <input id="State" type="text" data-textbox="Enter State" placeholder="Enter State" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="State-Validation" data-validation="State">State should not be empty</span>                                  
                                    </div>
                                </div>
                           </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                                <div class="div-col-50per">
                                   <div class="div-col-30per">
                                       <label class="mar-top-5">Country<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> :  </label>
                                    </div>
                                   <div class="div-col-50per">
                                       <input id="Country" type="text" data-textbox="Enter Country" placeholder="Enter Country" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="Country-Validation" data-validation="Country">Country should not be empty</span>                                  
                                    </div>
                                </div> 
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                        <label class="mar-top-5">Zip <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>:  </label>
                                     </div> 
                                    <div class="div-col-50per">
                                        <input   type="text maxlength="7" placeholder="Enter Zip" id="zip" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>"/>
                                        <span style="color:red;display:none;" class="validation-message" id="zip-Validation" data-validation="Zip">Zip should not be empty</span>                                  
                                    </div>
                                </div>
                                 </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                            <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Contact Info</span>
                           </h5> 
                           <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                               <div class="div-col-50per">
                                   <div class="div-col-30per">
                                       <label class="mar-top-5">Contact Person<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input id="ContactPerson" type="text" data-textbox="ContactPerson" placeholder="Enter Contact Person" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="ContactPerson-Validation" data-validation="ContactPerson">Contact Person should not be empty</span>                                  
                                    </div>
                                </div>
                               <div class="div-col-50per">
                                   <div class="div-col-30per">
                                       <label class="mar-top-5">Contact Number <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                    </div>
                                   <div class="div-col-50per">
                                       <input type="text" data-textbox="ContactNumber"  id="ContactNumber" phone-Number="true"  maxlength="11"  placeholder="Enter Contact Number" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>"/>
                                    <span style="color:red;display:none;" class="validation-message" id="ContactNumber-Validation" data-validation="ContactNumber">Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>
                            </div>
                           <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                                 <div class="div-col-50per">
                                     <div class="div-col-30per">
                                         <label class="mar-top-5">Alternative Number  <sup class="isc-bill-trk-sup"><%--<i class="fa fa-star" style="font-size: 7px;"></i>--%></sup>: </label>
                                      </div>
                                      <div class="div-col-50per">
                                          <input type="text" data-textbox="AlternativeContactNumber"  id="Alternative-contact-Number" phone-Number="true"  maxlength="11"  placeholder="Enter Alternative Contact Number" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>"/>
                                         <span  style="color:red;display:none;"class="validation-message" id="Alternative-ContactNumber-Validation" data-validation="Alternative-ContactNumber">Alternative Contact Number should not be empty</span>                                                      
                                       </div>
                                  </div>
                                 <div class="div-col-50per">
                                     <div class="div-col-30per">
                                         <label class="mar-top-5"> Email Id<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                       </div>
                                      <div class="div-col-50per">
                                          <input type="text" id="Email" placeholder="Enter Email Id" data-Email="OrganizationEmail" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                           <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="OrganizationEmail">Email id is not valid.</span>
                                           <span style="color:red;display:none;" class="validation-message" id="vendorEmail-Validation" data-validation="customerEmail">Email should not be empty</span>              
                                         <span style="color:red;display:none;" class="validation-message" id="vendorDuplicateEmail-Validation" data-validation="customerEmail">Email Id already exist,Try any other Email Id</span>          
                                       </div>
                                </div>

                             </div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
</div>
    <script src="iscjsengine/PageScript/CreateOrganization.js"></script>
    
</asp:Content>