<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AddMalaysia.aspx.cs" Inherits="BillManagement.AddMalaysia" %>
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
                        <h2 style="line-height: 30px;" id="page-Title">Add Malaysia</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn isc-sav-btn" id="save-Malaysia">Save</a>
                     <a class="isc-theme-blue-btn isc-sav-btn" id="update-Malaysia" style="display:none">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="cancel">Cancel</a>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                     <div class="screen-row isc-new-thm-pad">
                         <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Malaysia Details :</span>
                         </h5>
                         <div>
                        <div class="screen-row mar-top-15 div-col-100per" >
                            <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Product Name:</label>
                                                        </div>
                                     <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                     id="slt-Product">
                                                    <option>Choose Product Name</option>
                                                </select>
                                            </div>
                                                        </div>
                               
                            </div>
                           <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Size: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="Size" type="text" data-textbox="Size" placeholder="Enter Size" class="form-control"/>
                                     <span style="color:red;display:none;" class="validation-message" id="Size-Validation" data-validation="BuyerName">Size should not be empty</span>                                  
                                    </div>
                                </div>
                               
                            </div>
                        <div class="screen-row mar-top-10 div-col-100per">
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Origin: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="Origin" type="text" data-textbox="Origin" placeholder="Enter Origin" class="form-control"/>
                                     <span style="color:red;display:none;" class="validation-message" id="Origin-Validation" data-validation="Origin">Origin should not be empty</span>                                  
                                    </div>
                                </div>
                            
                             <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Approval No : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="ApprovalNo" type="text" data-textbox="ApprovalNo" placeholder="Enter Approval No" class="form-control"/>
                                     <span style="color:red;display:none;" class="validation-message" id="Approval-Validation" data-validation="ApprovalNo">Approval No should not be empty</span>                                  
                                    </div>
                                </div>  
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per">
                                  <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Weight : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="Weight" type="text" data-textbox="Weight" placeholder="Enter Weight" class="form-control"/>
                                     <span style="color:red;display:none;" class="validation-message" id="Weight-Validation" data-validation="Weight">Weight should not be empty</span>                                  
                                    </div>
                                </div>  
                                  <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5"> Net Weight : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="NetWeight" type="text" data-textbox="NetWeight" placeholder="Enter Net Weight" class="form-control"/>
                                     <span style="color:red;display:none;" class="validation-message" id="NetWeight-Validation" data-validation="Weight"> Net Weight should not be empty</span>                                  
                                    </div>
                                </div>  
                            </div>
                             <div class="screen-row mar-top-10 div-col-100per">
                                 <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Gross Weight : </label>
                                      </div>
                                    <div class="div-col-50per">
                                      <input type="text" data-textbox="GrossWeight"  id="GrossWeight" placeholder="Enter Gross Weight" class="form-control number-only"/>
                                    <span style="color:red;display:none;" class="validation-message" id="GrossWeight-Validation" data-validation="Tax">Gross Weight should not be empty</span>                                                      
                                    </div>
                                </div>   
                                  <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Production Code : </label>
                                      </div>
                                    <div class="div-col-50per">
                                      <input type="text" data-textbox="ProductionCode "  id="PCode" placeholder="Enter Production Code " class="form-control"/>
                                    <span style="color:red;display:none;" class="validation-message" id="PCode-Validation" data-validation="Tax">Production Code should not be empty</span>                                                      
                                    </div>
                                </div> 
                               </div>
                                           
                             <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                                  <div class="screen-row mar-top-10 div-col-100per">
                                 <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Production Date : </label>
                                      </div>
                                    <div class="div-col-50per">
                                         <input type="date" class="form-control" id="ProdDate" placeholder="MM/DD/YYYY"/>   
                                      <%--//<input type="text" data-textbox="Production Date"  id="ProdDate" placeholder="Enter Production Date" class="form-control number-only"/>--%>
                                    <span style="color:red;display:none;" class="validation-message" id="ProDate-Validation" data-validation="Tax">Production Date should not be empty</span>                                                      
                                    </div>
                                </div>   
                                      <div class="div-col-50per">
                                    <div class="div-col-30per">
                                           <label class="mar-top-5">Best Before Date : </label>
                                      </div>
                                    <div class="div-col-50per">
                                         <input type="date" class="form-control" id="BBDate" placeholder="MM/DD/YYYY"/>   
                                      <%--//<input type="text" data-textbox="Production Date"  id="ProdDate" placeholder="Enter Production Date" class="form-control number-only"/>--%>
                                    <span style="color:red;display:none;" class="validation-message" id="BBDate-Validation" data-validation="Tax">Best Before Date should not be empty</span>                                                      
                                    </div>
                                </div> 
                               </div>

                             </div>  
                                           <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Buyer Address :</span>
                         </h5>
                        <div class="screen-row mar-top-10 div-col-100per">
                              <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Buyer Name:</label>
                                                        </div>
                                     <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Buyer">
                                                    <option>Choose Buyer Name</option>
                                                </select>
                                            </div>
                                                        </div>
                               
                            </div>
                            <div class="div-col-50per">
                                
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Address : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                         <textarea <%--placeholder="Enter Buyer Address"--%> id="Buyeraddress" class="form-control" readonly style="resize:none;"></textarea>
                                     <span style="color:red;display:none;" class="validation-message" id="address-Validation" data-validation="AdressValidation">Address should not be empty</span>                                                                          
                                    </div>
                                </div>
                           
                               
                                
                            </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                             <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">City : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" <%--placeholder="Enter Buyer City readonly"--%> id="Buyercity" class="form-control" readonly/>    
                                      </div>
                                </div>
                             <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">State : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" <%--placeholder="Enter Buyer State"--%> id="BuyerState" readonly class="form-control ">
                                                           
                                                        </div>
                                </div>
                               
                            
                                
                            </div>
                            
                             <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                                 <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5" >Country : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" <%--placeholder="Enter Buyer Country"--%> id="BuyerCountry" readonly class="form-control">
                                                           
                                                        </div>
                                </div>
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Zip : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                          <input type="text" readonly <%--placeholder="Enter Buyer Zip"--%> id="BuyerZip" class="form-control">
                                                           
                                                        </div>
                                </div>
                                </div>
    
                       </div>
                 
                    </div>
                </div>
            </div>
            </div>
    </div>
    <script src="iscjsengine/PageScript/CreateMalaysiaLabel.js"></script>
</asp:Content>
