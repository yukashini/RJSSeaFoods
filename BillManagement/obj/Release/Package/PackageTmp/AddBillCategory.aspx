<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AddBillCategory.aspx.cs" Inherits="BillManagement.AddBillCategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .select2-container {
    z-index: 9 !important;
}
        .isc-g-b {
            border: 0px;
            border-bottom: 2px solid;
            border-image: linear-gradient(to right, #1589ee 10%, #fff);
            border-image-slice: 1;
            padding: 0;
            margin: 0 0 0 0px;
         
            padding-bottom: 8px !important;
        }

        .isc-crt-bill-add {
            font-size: 20px;
            line-height: 31px;
            color: #5d5d5d;
            margin-left: 0px;
            float: left;
            top: 90%;
            left: 48%;
            position: absolute;
            /* margin-left: 10px; */
            cursor: pointer;
        }

        .isc-usr-mag-mp-bdy-cont1 {
            min-height: 150px;
            max-height: 200px;
            overflow: hidden;
            overflow-y: auto;
            border: 1px solid #ccc;
            margin: 10px;
            margin-top: 20px;
            padding: 0px;
        }

            .isc-usr-mag-mp-bdy-cont1::-webkit-scrollbar {
                width: 6px;
            }

        .isc-usr-mag-mp-cont1-ul {
            margin: 0px;
            padding: 5px;
        }

            .isc-usr-mag-mp-cont1-ul li {
                padding: 2PX;
                list-style: none;
            }

                .isc-usr-mag-mp-cont1-ul li h1 {
                    margin: 0px 0px;
                    font-size: 14px;
                    line-height: 30px;
                    font-weight: 400;
                    color: #5d5d5d;
                }

        .isc-cir-cell-swt-user-s1 {
            height: 30px;
            width: 30px;
            background-color: #2e85bb;
            color: #fff;
            position: absolute;
            left: -25px;
            top: 49px;
            border-radius: 50% !important;
            font-size: 14px;
            line-height: 27px;
            text-align: center;
            cursor: pointer;
        }

            .isc-cir-cell-swt-user-s1 i {
                color: inherit;
                font-size: inherit;
                line-height: inherit;
            }

        .isc-action-badge-td-s1 i {
            margin-top: 4px;
            margin-left: 3px;
        }

        .isc-sub-cat-cont {
            /*background-color: #f3f2f2;
            padding: 10px;
            margin: 10px;*/
            margin-top:20px !important;
        }
        .isc-app-screen-sec-container-s1{
            padding:10px 0px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="isc-app-main-body-layout-container">
        <div class="isc-app-screen-content-s1">
            <div class="screen-row">
                <div class="isc-app-screen-header-container" style="height: 46px;">
                    <div class="div-col-30per">
                        <div class="screen-row">
                            <div class="isc-page-header">
                                <i class="fa fa-plus"></i>
                                <h2 id="pagetitle" style="line-height: 30px;">Add Category</h2>
                                <h6 class="mar-none"></h6>
                            </div>
                        </div>
                    </div>
                    <div class="div-col-70per">
                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                            <a class="isc-theme-blue-btn isc-sav-btn" id="btn-Save-Category">Save</a>
                            <a class="isc-theme-blue-btn isc-sav-btn" style="display: none;" id="btn-Update-Category">Update</a>
                            <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="btn-Cancel">Cancel</a>
                        </div>

                    </div>
                </div>
                <div class="isc-app-screen-body-container" <%--style="height: 194px;"--%>>
                    <div class="isc-app-screen-sec-container-s1 ">
                        <div class="isc-opt1-cont">
                            <h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-new-thm-pad isc-g-b">Category Info</h5>

                            <div class="screen-row mar-top-10 isc-new-thm-pad">
                                <div class="div-col-35per">

                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Category <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                        </div>
                                        <div class="div-col-80per">
                                            <input type="text" class="form-control" placeholder="Enter Category" id="txt-CategoryName">
                                        </div>
                                    </div>

                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Description :</label>
                                        </div>
                                        <div class="div-col-80per">
                                            <textarea placeholder="Enter Description" id="txt-Desc" rows="4" class="form-control" style="resize: none;" spellcheck="false"></textarea>

                                        </div>
                                    </div>

                                </div>
                                <div class="div-col-35per">


                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-25per">
                                            <label class="mar-top-5">GL Code <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>: </label>
                                        </div>
                                        <div class="div-col-80per">
                                            <input type="text" class="form-control" id="txt-GlCode" placeholder="Enter GL Code ">
                                        </div>
                                    </div>

                                    <div class="screen-row mar-top-20">
                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Status <%--<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>--%>: </label>
                                        </div>
                                        <div class="div-col-80per">
                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                <select class="isc-select-dropdown select" tabindex="-1" id="slt-Status" aria-hidden="true">
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>

                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div class="screen-row  mar-top-20">
                                <h5 class="isc-bill-trk-hdr-txt  isc-pad-10 isc-new-thm-pad isc-g-b">Sub-Category</h5>
                                <div class="isc-sub-cat-cont isc-new-thm-mar ">
                                    <div class="screen-row mar-top-10">
                                        <div class="div-col-35per ">
                                            <div class="screen-row  ">
                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Sub-Category <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>:</label>
                                                
                                                </div>
                                               <div class="div-col-80per">
                                                    <input type="text" class="form-control" placeholder="Enter Sub-Category" id="txt-SubCategory"/>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="div-col-30per ">

                                            <div class="screen-row  ">
                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">GL Code <sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>:</label>
                                                </div>
                                               <div class="div-col-90per" style="width:93% !important;">
                                                    <input type="text" class="form-control" placeholder="Enter GL Code" id="txt-Gl"/>
                                                </div>
                                                <div class="div-col-5per">
                                            <a class="isc-action-badge-td-s1 " title="Add" id="add-SubCategory"><i class="fa fa-plus isc-mar-top-8" style="margin-left:10px;"></i></a>
                                        </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div id="subCategories">
                                        
                                    </div>
                                    <div class="screen-row  mar-top-10">
                                        <div class="div-col-35per ">
                                            <div class="screen-row  ">

                                                <%--<div class="div-col-80per">
                                                    <input type="text" class="form-control" placeholder="Enter Sub-Category" id="txt-SubCategory">
                                                </div>--%>
                                            </div>

                                        </div>
                                        <div class="div-col-25per ">

                                            <div class="screen-row ">

                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <%--     <div class="div-col-20per" style="position:relative;">
                                            <div class="isc-cir-cell-swt-user-s1" title="Swap">
                                            <i class="icon-shuffle"></i>
                                        </div>
                                        </div>
                                        <div class="div-col-20per">
                                            <div class="isc-usr-mag-mp-bdy-cont1">
                                                        <ul class="isc-usr-mag-mp-cont1-ul">
                                                            <li>
                                                                <h1>
                                                                    
                                                                    Office Expense - 10289 <span class="cell-right"><i class="fa fa-times"></i></span></h1>

                                                            </li>
                                                            <li>
                                                                 <h1>
                                                                    
                                                                   IT Expense - 20109 <span class="cell-right"><i class="fa fa-times"></i></span></h1>
                                                            </li>
                                                            <li>
                                                                 <h1>
                                                                    
                                                                    Other Expense - 10290<span class="cell-right"><i class="fa fa-times"></i></span></h1>
                                                            </li>
                                                           
                                                        </ul>
                                                    </div>
                                        </div>--%>
                            </div>
                        </div>
                        <%--       <div class="screen-row ">
                            <h5 class="isc-bill-trk-hdr-txt mar-bot-med">Create Category : </h5>
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5"> Category
                                        <span style="color:red;font-size:14px;">*</span>  </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                                <input type="text" placeholder="Enter  Category" class="form-control">
                            </div>
                        </div>
                <div class="screen-row ">
                            <h5 class="isc-bill-trk-hdr-txt mar-bot-med">Sub Category : </h5>
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Sub Category1</label>
                                      </div>
                            </div>

                             <div class="div-col-65per">
                                <input type="text" placeholder="Enter Sub-Category1" class="form-control">
                            </div>
                        </div>
                <div class="screen-row mar-top-15">
                           <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Sub Category2</label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                                <input type="text" placeholder="Enter Sub-Category2" class="form-control">
                            </div>
                        </div>
                <div class="screen-row mar-top-15 ">
                           <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Sub Category3
                                        <span style="color:red;font-size:14px;">*</span>  </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                                <input type="text" placeholder="Enter Sub-Category3" class="form-control">
                            </div>
                        </div>
                            <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Description
                                    </label>
                                </div>
                            </div>

                             <div class="div-col-65per">
                              <textarea placeholder="Enter Description" rows="4" class="form-control" style="resize:none;" spellcheck="false"></textarea>
                            </div>
                        </div>
                        <div class="screen-row mar-top-15">
                            
                            <div class="div-col-30per">
                                <div class="isc-pay-lbl-txt">
                                    <label class="mar-top-5">Status <span style="color:red;font-size:14px;">*</span>
                                 </label>
                                </div>
                            </div>
                            <div class="div-col-65per">
                                 <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                            <option>Active</option>
                                                                            <option>Inactive</option>
                                                                       
                                                                        </select>
                                                                    </div>
                                
                            </div>
                          

                        </div>
                        --%>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="iscjsengine/PageScript/AddBill_Category.js"></script>
</asp:Content>
