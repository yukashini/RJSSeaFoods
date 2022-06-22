<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="UploadBills.aspx.cs" Inherits="BillManagement.UploadBills" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-upload"></i>
                        <h2 style="line-height: 30px;">Upload Bills / Invoice</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                  <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn" id="cancel-edit"  style="background-color: #aeaeae !important; display:none;" title="Cancel"><i class="fa fa-times "></i> </a>
                </div>
              <div class="cell-right pad-lft-med mar-top-10" id="cancel-div">
                    <a class="isc-theme-blue-btn" id="cancel-bill" style="background-color: #aeaeae !important;" title="Cancel"><i class="fa fa-times "></i> </a>
                </div>
                <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn" title="Save" data-bill-entry="2"><i class="fa <%--fa-floppy-o--%> fa-save"></i></a>
                </div>
                <div class="cell-right  mar-top-10">
                    <a class="isc-theme-blue-btn" id="save-draft" data-bill-entry="1" title="Next Bill">
                        <%--<img src="img/ocr.png" class="isc-ocr-icn"/>--%>
                        <img src="img/appimages/simple-line-icon/scan1.png" / class="isc-ocr-icn">
<%--                        <img src="img/appimages/scan.png"  class="isc-ocr-icn"/>--%>
                       <%-- <i class="fa fa-print"></i>--%>
                    </a>
                   <%-- <a class="isc-theme-blue-btn" href="#" title="Scan Next">--%><%--<i class="fa fa-qrcode"></i>--%><%--<i class="fa fa-minus-square-o"></i> </a>--%>
                </div>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height:610px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1">
                    <div class="screen-row">
                        <div class="div-col-40per">
                            <div class="screen-row">
                                <div class="div-col-15per isc-upl-bill-emp">
                                    <label class="mar-top-5"> </label>
                                </div>
                                <div class="div-col-70per isc-wdt-max">
                                    <div class="isc-file-upload-in-con" id="dragdropfiles" style="padding: 5px 10px;">
                                                <i class="fa fa-cloud-upload"></i>
                                                <div class="screen-row" >
                                                    <h2>Drag And Drop or<span class="isc-btn-inp-typ-file-s1">Browse

                                    <input type="file" id="browseBill" name="filename" accept="image/jpeg,image/png,pdf" capture="" style="width: 200px;">
                                                    </span></h2>
                                                    <img src="img/OCRScr.png"  class="isc-bill-tck-snr-img" title="OCR Scan"/>
                                                   <%--  <img src="img/scanner.jpg" class="isc-bill-tck-snr-img"/>--%>
                                                </div>
                                         <h5 class="isc-upd-bill-ald">Note : Upload Only PDF, JPG, JPEG & PNG with Max 10 MB</h5>

                                            </div>
                                </div>
                               <%-- <div class="div-col-20per">
                                
                                </div>--%>
                            </div>
                            <div class="screen-row mar-top-30">
                                <div class="isc-sec-in-con-y-scroll-con-s1 isc-upload-bill-con">
                                                        <div class="isc-sec-in-con-y-scroll-bdy-con-s2" id="file_Viewer">
                                                           <h5 class="isc-sec-in-con-y-scroll-bdy-con-h5" style="padding-left:134px; padding-top:246px;" id="no_bill_Message">No Attachment Found</h5>
                                                            <%--<iframe id="UploadedBill" src="https://Data/Project/ISC/Projects/BillManagement/BillManagement/images/FileBills/sample.pdf" class="isc-new-exp-pdf" style="border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;"></iframe>--%>
                                                        </div>
                                                    </div>
                            </div>
                        </div>
                        <div class ="div-col-60per">
                            <div class="screen-row">
                                <div class="screen-row">
                                    <div class="isc-upd-bill-cont">
                            <div class="screen-row">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Vendor <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Vendor Name" id="txt-Vendor-Name" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Bill/Invoice # <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Bill/Invoice #" id="txt-Invoice-Number" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Bill Description <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Bill-Description" placeholder="Enter Description" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Amount($) <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-Amount"   pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Enter Amount" class="form-control isc-exp-mang-txt-bx1 form-contorl isc-input-bdr-none isc-input-bdr-none">
                                                        </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Invoice Date : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="inVoiceDate"  data-datable="ddmmyyyy" placeholder="Enter Invoice Date" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1 iscdatepicker">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Due Date <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" placeholder="Enter Due Date"  data-datable="ddmmyyyy" id="due-Date" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1 iscdatepicker">
                                                        </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Payment Terms : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid">
                                                <select class="isc-select-dropdown select2 " tabindex="-1"
                                                    aria-hidden="true" id="slt-PaymentTerms" style="width:100% !important">
                                                     

                                                </select>
                                            </div>
                                                        </div>
                                </div>
                                 <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Bill Category : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid">
                                                <select class="isc-select-dropdown select2 " tabindex="-1"
                                                    aria-hidden="true" id="slt-BillCategory" style="width:100% !important">
                                                    
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
                                                            <input type="text" id="txt-Notes" placeholder="Enter Notes To Approver" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Purchase Order : </label>
                                                        </div>
                                    <div class="div-col-50per">
                                                            <input type="text" id="txt-purchase" placeholder="Purchase Order" class="form-control isc-exp-mang-txt-bx1">
                                                        </div>
                                </div>
                                
                               
                            </div>
                                <div class="screen-row mar-top-10">
                                     <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">View Bill : </label>
                                                        </div>
                                    <div class="div-col-40per isc-upd-bill-img-data">
                                                          <a href="#<%--mp_bill-view--%>" data-toggle="modal">
                                                               <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/ id="pdf-icon" style="display:none">
                                                               <img src="img/appimages/image.jpg" id="img-icon" class="isc-pdf-img1"  style="display:none"/>
                                                              
                                                             </a>
                                        <a href="#<%--mp_bill-view--%>" data-toggle="modal" id="billFileName" class="">-</a>
                                       <p></p>
                                                        </div>
                                         <div class="div-col-10per">
                                             <i class="fa fa-trash-o mar-top-10 cell-right" title="Clear Bill" style="display:none" id="btn-clear-file"></i>
                                         </div>
                                </div>
                                    <div class="div-col-50per">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Split This Amount : </label>
                                                        </div>
                                    <div class="div-col-50per mar-top-5">
                                                          <input type="checkbox" id="chk-box-split"/>
                                                        </div>
                                </div>
                                </div>
                            <div class="screen-row mar-top-30">
                                <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont" id="bill-breakage-block" style="display:none">
                                <h5 class="isc-bill-trk-hdr-txt"   data-attribute="1" id="account-details"><i class="fa fa-angle-down pad-rgt-5"></i> Account Details  </h5>
                                <div class="screen-row mar-top-10 collapse " id="breakage-box" >
                                    <table class="isc-table-read-optimal isc-table-sorter-s1  " id="tbl-breakages">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 30%;" class="">Account
                                                        </th>
                                                        <th style="width: 40%;" class="">Description
                                                        </th>
                                                        <th style="width: 20%;" class="text-center">Amount ($)
                                                        </th>
                                                        <th style="width: 10%;" class="text-center">Action
                                                        </th>
                                                      
                                                    </tr>
                                                </thead>
                                                <tbody id="tbl-split-body">
                                                    <%--<tr>
                                                        <td>
                                                            <h5>Bank Service Charges</h5>
                                                        </td>
                                                        <td>
                                                            <h5>A1 Rental</h5>
                                                        </td>
                                                        <td class="isc-bill-amt-pad">
                                                            <h5 style="text-align:right;">$750</h5>
                                                        </td>
                                                        <td>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                        </td>
                                                    </tr>--%>
                                                   <%-- <tr>
                                                        <td>
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-sel-box">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="SelectBuildProject">
                                                    <option>Bank Service Charges </option>
                                                       <option>Meals and Entertainment</option>
                                                       <option>Office Supplies </option>
                                                       <option>Payroll Expenses</option>
                                                       <option>Travel Expense</option>
                                                </select>
                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="Enter Description"/>
                                                        </td>
                                                        <td class="isc-bill-amt-pad">
                                                            <input type="text" class="form-control isc-bill-trk-txt-box" placeholder="$750" style="text-align:right;"/>
                                                        </td>
                                                        <td>
                                                            <i class="fa fa-plus isc-lst-add-row-icn isc-tim-sht-icn-pst"></i>
                                                        </td>
                                                    </tr>--%>
                                                </tbody>
                                            </table>
                                </div>
                                </div>
                            </div>
                                        </div>
                                    </div>
                            <div class="screen-row mar-top-20 " id="draft_Block">
                                <div class="isc-lst-scrl-cont">
                                <table class="isc-table-read-optimal isc-table-sorter-s1 ">
                                            <thead>
                                                <tr>
                                                    <th style="width: 20%;background-color:#e1e2e3;" class="">Vendor</th>
                                                    <th style="width:15%;background-color:#e1e2e3;"   class="">Bill / Invoice</th>
                                                    <th style="width: 25%;background-color:#e1e2e3;"  class="">Bill Description
                                                    </th>
                                                     <th style="width: 16%;background-color:#e1e2e3;"  class="">Amount ($)
                                                    </th>
                                                    <th style="width: 14%;background-color:#e1e2e3;"  class="">Due Date
                                                    </th>
                                                   
                                                  
                                                    <th style="width: 10%;background-color:#e1e2e3;" class="">Action

                                                    </th>



                                                </tr>
                                            </thead>

                                            

                                        </table>

                                <div class="isc-bill-trk-lst-scr-cont">
                                  <table class="isc-table-read-optimal isc-table-sorter-s1 ">
                                <tbody class="isc-upd-bill-lst-bdy" id="tbl-draft-bills-body">
                                               
                                            </tbody>
                                      </table>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
         </div>
     <%--<div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Passmoregas.pdf</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
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
                                                        <div class="isc-sec-in-con-y-scroll-bdy-con-s2">
                                                            <iframe src="gasDefault.pdf" class="isc-new-exp-pdf" style="border: none; width: 100%; height: 400px; overflow: hidden; overflow-y: auto;"></iframe>
                                                        </div>
                                                    </div>
                                    </div>

                                </div>
                               
                               
                               
                           
                            </div>

                        </div>


                    </div>

                </div>--%>
                <%--<div class="modal-footer">
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
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_edit" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Edit Bill</h4>
                        </div>
                        <div class="cell-right">
                          <%--  <button type="button" hide-pop-up="true" class="fa fa-times" title="Cancel"  edit-cancel="true" aria-hidden="true">
                            </button>--%>
                            <a><i class="fa fa-times" style="color:#8A8A8A;" hide-pop-up="true" title="Cancel"  edit-cancel="true" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4>Are you sure, want to Edit? If you have entered any fields, please save before edit.</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-edit-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" edit-cancel="true"  id="close-edit" >
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

       <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Bill Delete</h4>
                        </div>
                        <div class="cell-right">
                             <a><i class="fa fa-times" style="color:#8A8A8A;" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  edit-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  edit-cancel="true" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:75px !important;">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row">
                                        <h4>Are you sure want to delete the bill?</h4>

                                    </div>

                                </div>
                               
                            </div>

                        </div>


                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1"  id="btn-delete-ok" data-dismiss="modal">
                            OK</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" edit-cancel="true"  id="close-delete" >
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill_attach" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title" id="fileName">Bill Attachment</h4>
                        </div>
                        <div class="cell-right">
                              <a><i class="fa fa-times" style="color:#8A8A8A;" hide-pop-up="true"  title="Close" id="attachment-close" data-dismiss="modal" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" id="attachment-close" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body">
                        <div class="screen-row">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="screen-row" id="billattachmentmodal">
                                       

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
         $(document).ready(function () {
             $('.select2').select2();
            
             $('.iscdatepicker').datepicker({
                 format: 'mm/dd/yyyy',
                 orientation: "auto bottom"
             });
         });
        
    </script>
    <script src="iscjsengine/common/datable.js"></script>
    <script src="iscjsengine/PageScript/UploadBills.js" type="text/javascript"></script>
</asp:Content>
