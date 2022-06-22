<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="BillSubmit.aspx.cs" Inherits="BillManagement.BillSubmit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <%--<div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-info-cricle"></i>
                        <h2 style="line-height: 30px;">Bill Details</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>--%>
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-info-circle"></i>
                        <h2 style="line-height: 30px;">Bill Details</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
              <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn"href="BillsOrInvoiceList.aspx" style="background-color: #aeaeae !important;" title="Cancel"><i class="fa fa-times "></i> </a>
                </div>
                <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn"  title="Save Draft" bill-Submission="2"><i class="fa fa-floppy-o "></i></a>
                </div>
                <div class="cell-right  mar-top-10 pad-lft-med">

                    <a class="isc-theme-blue-btn" title="Save & submit" bill-Submission="1"><i class="fa fa-check"></i> </a>
                </div>
                 <div class="cell-right  mar-top-10" style="display:none">

                    <a class="isc-theme-blue-btn"  title="Edit"><i class="fa fa-pencil-square-o"></i> </a>
                </div>



            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="div-col-80per">
                        <div class="screen-row">
                            <div class="screen-row">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Vendor <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Vendor" data-submit="true" placeholder="Vendor Name" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Bill/Invoice #  <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Invoice" data-submit="true" placeholder="Enter Bill/Invoice #" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Bill Description  <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Description" data-submit="true" placeholder="Enter Description" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Payable Amount($) <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input id="txt-Amount" type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" data-submit="true"  placeholder="Enter Payable Amount" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Invoice Date : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Invoice-Date" data-submit="true" placeholder="Enter Invoice Date" class="form-control isc-exp-mang-txt-bx1 iscdatpkrwdt iscdatepicker">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Due Date <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Due-Date" data-submit="true" placeholder="Enter Due Date" class="form-control isc-exp-mang-txt-bx1 iscdatpkrwdt iscdatepicker">
                                                        </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Payment Terms : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                          <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth1">
                                                <select class="isc-select-dropdown select2 " style="width:299px!important; border:1px solid #eee; border-radius:3px !important;" data-submit="true" id="slt-Payment-Terms" tabindex="-1"
                                                    aria-hidden="true" >
                                                    <option>Choose Payment Terms</option>
                                                    <option>NET30 </option>
                                                     <option>NET60 </option>
                                                     <option>NET90 </option>
                                                     <option>On Delivery</option>
                                                </select>
                                            </div>
                                                        </div>
                                </div>
                                 <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Bill Category : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                          <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth1">
                                                <select class="isc-select-dropdown select2 "  style="width:299px!important; border:1px solid #eee; border-radius:3px !important;" data-submit="true" id="slt-Bill-Category" tabindex="-1"
                                                    aria-hidden="true" >
                                                    <option>Choose Bill Category</option>
                                                    <option>Standard Invoice		
                                </option>
                                <option>Commercial		
                                </option>
                                <option>Timesheet		
                                </option>
                                <option>Utility Invoice		
                                </option>
                                <option>Transportation		
                                </option>
                                                </select>
                                            </div>
                                                        </div>
                                </div>
                                
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Notes To Approver : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" data-submit="true" placeholder="Enter Notes To Approver" id="txt-Notes" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                 <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Purchase Order # : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" data-submit="true" placeholder="Enter Purchase Order #" id="txt-Purchace-Order" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                               
                            </div>
                              <div class="screen-row mar-top-10">
                                   <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">View Bill : </label>
                                                        </div>
                                    <div class="div-col-50per isc-upd-bill-img-data" >
                                                           <h5 class="isc-bill-trk-upl-bill">
                                                                 <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/ id="pdf-icon" style="display:none">
                                                               <img src="img/appimages/image.jpg" id="img-icon" class="isc-pdf-img1"  style="display:none"/>
                                                              <a id="billFileName" class="isc-cursor"> Passmoregass.pdf</a></h5>
                                                        </div>
                                </div>
                            <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Split This Amount : </label>
                                                        </div>
                                    <div class="div-col-50per mar-top-5">
                                                          <input type="checkbox" data-submit="true" id="chk-box-split"/>
                                                        </div>
                                </div>
                                  </div>
                                </div>
                            <div class="screen-row mar-top-30">
                            <div class="isc-bill-trk-lst-cont" id="breakage-Block" style="display:none">
                                <h5 class="isc-bill-trk-hdr-txt"  id="account-details"><i class="fa fa-angle-right pad-rgt-5"></i> Account Details  </h5>
                                <div class="screen-row mar-top-10 collapse in" id="breakage-box" >
                                    <div class="isc-lst-scrl-cont">
                                    <table class="isc-table-read-optimal isc-table-sorter-s1  " >
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 30%;" class=""  sort-column-Type="text" column-Name="BreakageType"  data-sort="BreakageType">Account
                                                        </th>
                                                        <th style="width: 35%;" class=""  sort-column-Type="text" column-Name="BreakageDescription"  data-sort="BreakageDescription">Description
                                                        </th>
                                                        <th style="width: 15%;" class=" text-center"  sort-column-Type="number" column-Name="BreakageAmount"  data-sort="BreakageAmount">Payable Amount ($)
                                                        </th>
                                                        <th style="width: 20%;" class=" text-center"  >Action
                                                        </th>
                                                      
                                                    </tr>
                                                </thead>
                                                <tbody id="tbl-Split-Body" >
                                                    <tr>
                                                        <td>
                                                            <h5>Office Supplies</h5>
                                                        </td>
                                                        <td>
                                                            <h5>A1 Rental</h5>
                                                        </td>
                                                        <td class="isc-bill-amt-pad">
                                                            <h5 style="text-align:right;">$750</h5>
                                                        </td>
                                                        <td style="text-align:center;">
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-sel-box">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="SelectBuildProject">
                                                    <option>Bank Service Charges </option>
                                                    <option> Meals And Entertainment</option>
                                                    <option>Office Supplies</option>
                                                    <option>Payroll Expenses</option>
                                                </select>
                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="Enter Description"/>
                                                        </td>
                                                        <td class="isc-bill-amt-pad">
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="$750" style="text-align:right;"/>
                                                        </td>
                                                        <td style="text-align:center;">
                                                            <i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst"></i>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
                                </div>
                                <div class="screen-row mar-top-10">
                            <div class="div-col-100per">
                                    <div class="div-col-20per">
                                                            <label class="mar-top-5">Comments : </label>
                                                        </div>
                                    <div class="div-col-80per mar-top-5">
                                                        <textarea placeholder="Enter Comments" data-submit="true" id="txt-area-Comments" class="form-control" rows="3" cols="6" style="resize:none;"></textarea>
                                                        </div>
                                </div>
                                  </div>
                            </div>
                            </div>
                        <div class="div-col-20per pad-lft-12">
                            <div class="screen-row">
                                <div class="isc-bill-trk-com-box">
                                    <h5 class="isc-bill-trk-hdr-txt" >Approver Comments : </h5>
                                    <table class="isc-time-line-tble-s1 mar-top-15" >
                                           
                                        <tbody id="History_Table"></tbody>
                                        
                                        </table>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
     <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="billFileTitle">Passmoregass.pdf</h4>
                        </div>
                        <div class="cell-right">
                             <a><i class="fa fa-times" style="color:#8A8A8A;" id="bill-Close" data-dismiss="modal" aria-hidden="true"></i></a>
                            <%--<button type="button" class="close img-typ-sq" id="bill-Close" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:450px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                          <div class="isc-sec-in-con-y-scroll-con-s1">
                                                        <div class="isc-sec-in-con-y-scroll-bdy-con-s2" id="bill_File_Block">
                                                            <%--<iframe src="gasDefault.pdf" class="isc-new-exp-pdf" style="border: none; width: 100%; height: 400px; overflow: hidden; overflow-y: auto;"></iframe>--%>
                                                        </div>
                                                    </div>
                                    </div>

                                </div>
                               
                               
                               
                           
                            </div>

                        </div>


                    </div>

                </div>
               <%-- <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                            Add</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>--%>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
      <script>
        $('.iscdatepicker').datepicker({
            format: 'mm/dd/yyyy',
            orientation: "auto bottom"
        });
    </script>
    <script src="iscjsengine/PageScript/BillSubmit.js"></script>
</asp:Content>