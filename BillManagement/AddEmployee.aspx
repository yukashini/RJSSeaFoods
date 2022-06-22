<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AddEmployee.aspx.cs" Inherits="BillManagement.AddEmployee" %>
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
                        <h2 style="line-height: 30px;" id="page-Title">Add Employee</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                    <a class="isc-theme-blue-btn isc-sav-btn" id="save-Employee">Save</a>
                     <a class="isc-theme-blue-btn isc-sav-btn" id="update-Employee" style="display:none">Update</a>
                     <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="cancel">Cancel</a>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">                                       
                    <div style="position:relative" class="isc-new-thm-pad">
                        <label class="mar-top-5">Employee Photo : </label>
                        <div class="isc-org-logo-area mar-top-10"  id="file_Viewer">
                                        <%--<h2>LOGO</h2>--%>
                                      <span class="isc-btn-inp-typ-file-s1" style="top:126px;">Choose Employee photo

                                    <input type="file" id="browseLogo" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;"/>
                                                        </span>
                            </div>
                        <i class="fa fa-refresh isc-lft-icon" id="remove-Logo" title="Reset Logo" style="position:absolute;bottom:1px;cursor:pointer;"></i>
                                    </div>

                     <div class="screen-row isc-new-thm-pad">
                         <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Employee Details :</span>
                         </h5>
                         </div>
                      <div class="screen-row isc-new-thm-pad">
                        <div class="screen-row mar-top-15 div-col-100per" >
                            <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Employee code <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> :  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                            <input id="EmpCode" type="text" data-textbox="EmployeeCode" placeholder="Enter Employee Code" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="EmployeeCode-Validation" data-validation="EmployeeCode">Employee Code should not be empty</span>                                  
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Employee First Name <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="EmpFirstname" type="text" data-textbox="EmployeeFirstName" placeholder="Enter Employee First Name" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="EmployeeFirstName-Validation" data-validation="EmployeeFirstName">Employee First Name should not be empty</span>                                  
                                    </div>
                                </div>
                            </div>
                              <div class="screen-row mar-top-15 div-col-100per" >
                              <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Employee Last Name: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="EmpLastname" type="text" data-textbox="EmployeeLastName" placeholder="Enter Employee Last Name" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="EmployeeLastName-Validation" data-validation="EmployeeFirstName">Employee Last Name should not be empty</span>                                  
                                    </div>
                                </div>

                               <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Gender<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> :  </label>
                                                        </div>
                                     <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible " tabindex="-1"
                                                    aria-hidden="true" id="slt-Gender">
                                                    <option>Choose Gender</option>
                                                </select>
                                            </div>
                                                        </div>
                                </div>
                                  </div>
                              <div class="screen-row mar-top-15 div-col-100per" >
                                <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5"> Email Id<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                      <div class="div-col-50per">
                                                            <input type="text" id="Email" placeholder="Enter Email Id" data-Email="customerEmail" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                        <span class="validation-message" style="display:none; color:red" error-active="false" data-validation="customerEmail">Email id is not valid.</span>
                                           <span style="color:red;display:none;" class="validation-message" id="vendorEmail-Validation" data-validation="customerEmail">Email should not be empty</span>              
                                         <span style="color:red;display:none;" class="validation-message" id="vendorDuplicateEmail-Validation" data-validation="customerEmail">Email Id already exist,Try any other Email Id</span>          
                                                        </div>
                                </div>
                                   <div class="div-col-50per">
                                    <div class="div-col-30per">
                                                            <label class="mar-top-5">Contact Number <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                      <div class="div-col-50per">
                                                            <input type="text" data-textbox="ContactNumber"  id="contact-Number" phone-Number="true"  placeholder="Enter Contact Number" class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                    <span style="color:red;display:none;" class="validation-message" id="ContactNumber-Validation" data-validation="ContactNumber">Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>
                            </div>
                              <div class="screen-row mar-top-15 div-col-100per" >
                               
                                    <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Alternative Contact Number : </label>
                                                        </div>
                                      <div class="div-col-50per">
                                                            <input type="text" data-textbox="AltContactNumber"  id="Alt-contact-Number" phone-Number="true"  maxlength="11"  placeholder="Enter Alternative Contact Number" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>"/>
                                    <span  style="color:red;display:none;"class="validation-message" id="Alt-ContactNumber-Validation" data-validation="Alt-ContactNumber">Alternative Contact Number should not be empty</span>                                                      
                                    </div>
                                </div>
                              
                                 <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Designation<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>:</label>
                                                        </div>
                                     <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Designation">
                                                    <option>Choose Designation</option>
                                                </select>
                                            </div>
                                                        </div>
                               
                            </div>
                            </div>
                             <div class="screen-row mar-top-15 div-col-100per" >                                 
                              <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Date of Birth <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>:</label>
                                                        </div>
                                      <div class="div-col-50per">
                                                          <input type="date" class="form-control" id="txt-Dob" placeholder="MM/DD/YYYY" min="1950-01-01" max="{{ now()->toDateString('Y-m-d') }}"/>     
                                    <span style="color:red;display:none;" class="validation-message" id="Dob-Validation" data-validation="Dob" >DOB should not be empty</span>                                                      
                                    </div>
                               
                            </div>
                                 <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Blood Group <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                      <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-BloodGroup">
                                                    <option>Choose Blood Group</option>
                                                </select>
                                            </div>
                                                        </div>
                                  
                                </div>  
                                 </div>
                              <div class="screen-row mar-top-15 div-col-100per" >      
                                       <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Status<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                       <div class="div-col-50per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Status">
                                                    <option>Choose Status</option>
                                                </select>
                                            </div>
                                                        </div>
                                  
                                </div>
                               
                            </div>
                              <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Address</span>
                         </h5>
                        <div class="screen-row mar-top-10 div-col-100per">
                                <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Employee Address <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>:  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                         <textarea placeholder="Enter Employee Address" id="address" rows="4" class="form-control" style="resize:none;"></textarea>
                                                        <span style="color:red;display:none;" class="validation-message" id="Address-Validation" data-validation="Dob">Address should not be empty</span>
                                   </div>
                                </div>
                                     <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">City <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>:  </label>
                                                        </div>
                                   <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter City" id="city" class="form-control twAlbhabets-only<%--isc-exp-mang-txt-bx1--%>"/>
                                             
                                                        </div>
                                </div>
                            </div>
                              <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                                 <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">State : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter State" id="state" class="form-control twAlbhabets-only<%--isc-exp-mang-txt-bx1--%>"/>
                                                        </div>
                                </div>
                                     <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Country: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Country" id="Country" class="form-control twAlbhabets-only<%--isc-exp-mang-txt-bx1--%>"/>
                                                        </div>
                                </div>
                                
                            </div>                     
                                   <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                            
                                      <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Zip :  </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" maxlength="10" placeholder="Enter Zip" id="zip" class="form-control number-only<%--isc-exp-mang-txt-bx1--%>"/>
                                                        </div>
                                </div>
                             </div>
                        <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                      

                                   <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10" style="cursor:context-menu !important;">
                             <span style="margin-left: -67px;">Other Info</span>
                         </h5> 
                                 <div class="screen-row mar-top-10 div-col-100per mar-bot-max">
                              <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">PAN No.: </label>
                                                        </div>
                                      <div class="div-col-50per">
                                         <input id="Pan" type="text" data-textbox="Pan" placeholder="Enter PAN No." class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="PAN-Validation" data-validation="EducationDomain">Employee PAN No. should not be empty</span>                                  
                                    </div>
                                  
                                </div>      

                             <div class="div-col-50per">
                                     <div class="div-col-30per">
                                                            <label class="mar-top-5">Aadhaar No.: </label>
                                                        </div>
                                  <div class="div-col-50per">
                                         <input id="Aadhaar" type="text" data-textbox="Aadhaar" placeholder="Enter Aadhaar No." class="form-control <%--isc-exp-mang-txt-bx1--%>"/>
                                     <span style="color:red;display:none;" class="validation-message" id="Aadhaar-Validation" data-validation="Aadhaar">Employee Aadhaar No. should not be empty</span>                                  
                                    </div>
                                </div>
                          
                            </div>
</div>
 </div>
                        </div>
                 

            </div>
            </div>
    </div>
    <script>
        document.getElementById('txt-Dob').max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    </script>

    <script src="iscjsengine/PageScript/CreateEmployee.js"></script>
</asp:Content>
