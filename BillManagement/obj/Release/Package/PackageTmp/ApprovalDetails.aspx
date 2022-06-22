<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ApprovalDetails.aspx.cs" Inherits="BillManagement.ApprovalDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-thumbs-up"></i>
                        <h2 style="line-height: 30px;">Approvals</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
                <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn" href="ApproverHome.aspx" title="Cancel"><i class="fa fa-times"></i></a>
                </div>
                <div class="cell-right pad-lft-med mar-top-10"  id="btn-Reject" >
                    <a class="isc-theme-blue-btn" href="#" style="background-color: #f93737 !important;"approve-Type="2" title="Reject"><i class="fa fa-ban "></i></a>
                </div>
                <div class="cell-right pad-lft-med mar-top-10">
                    <a class="isc-theme-blue-btn" href="#" title="Approve" approve-Type="1" style="background-color: #45AE3D !important;"><i class="fa fa-check "></i></a>
                </div>

                <%-- <div class="cell-right  mar-top-10">

                    <a class="isc-theme-blue-btn" href="#">Submit </a>
                </div>--%>
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="div-col-60per pad-rgt-15" >
                            
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Vendor <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Vendor" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                                <div class="div-col-50per mar-top-5">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Bills/Invoice # <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Bill-Invoice" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">PO# : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-PO" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                                <div class="div-col-50per mar-top-5">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Payable Amount <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Payable-Amount" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Invoice Date  : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Invoice-Date" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                                <div class="div-col-50per mar-top-5">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Due Date <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Due-Date" class="form-control iscdatpkrwdt isc-exp-mang-txt-bx1" disabled="disabled" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Billl Description  <sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup>: </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Bill-Description" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                                <div class="div-col-50per mar-top-5">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Notes To Approver  : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Notes" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Payment Terms : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-Payment-Terms" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                                <div class="div-col-50per mar-top-5">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">Split This Amount  : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="Yes" id="txt-Amount-Split" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="div-col-50per">
                                    <div class="div-col-35per">
                                        <label class="mar-top-5">View Bill : </label>
                                    </div>
                                    <div class="div-col-50per isc-upd-bill-img-data">
                                        <h5 class="isc-bill-trk-upl-bill">
                                                                                                             <img src="img/appimages/PDF_icon.png" class="isc-pdf-img"/ id="pdf-icon" style="display:none">
                                                               <img src="img/appimages/image.jpg" id="img-icon" class="isc-pdf-img1"  style="display:none"/>
                                                              <a id="billFileName" class="isc-cursor"> </a></h5>
                                            
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-20">
                                 <div class="isc-bill-trk-lst-cont">
                                <h5 class="isc-bill-trk-hdr-txt"  href="#coll_s2" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5"></i> Account Details  </h5>
                                <div class="screen-row mar-top-10 collapse in" id="coll_s2" >
                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="">Account 
                                            </th>
                                             <th style="width: 40%;" class="">Description
                                            </th>
                                            <th style="width: 20%;" class=""><center>Payable Amount ($)</center>
                                            </th>
                                           


                                        </tr>
                                    </thead>
                                    <tbody id="tbl-breakage-Body">
                                       
                                    </tbody>
                                </table>
                                    </div>
                                     </div>

                            </div>
                            
                        </div>
                        <div class="div-col-40per pad-lft-15">
                            <div class="isc-bill-apr-det-cont">
                            <div class="screen-row">
                                <div class="div-col-50per">
                                    <div class="div-col-45per">
                                        <label class="mar-top-5">Approved Amount</label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="$0.00" id="approval-Amount" class="form-control isc-exp-mang-txt-bx1">
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="div-col-45per">
                                        <label class="mar-top-5">Balance Amount : </label>
                                    </div>
                                    <div class="div-col-50per">
                                        <input type="text" placeholder="" id="txt-balance-amount" class="form-control isc-exp-mang-txt-bx1" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-15">
                                <div class="div-col-25per">
                                    <label class="mar-top-5">Approver Comments : </label>
                                </div>
                                <div class="div-col-75per mar-top-5">
                                    <textarea placeholder="Enter Approver Comments" id="approver-Comment-Area" class="form-control" rows="8" cols="6" style="resize: none;"></textarea>
                                </div>
                            </div>
                            <div class="screen-row mar-top-28">

                                <h5 class="isc-bill-trk-hdr-txt">Recent Payments  </h5>
                                <table class="isc-table-read-optimal isc-table-sorter-s1 mar-top-10" id="tbl-recent-pay">
                                    <thead>
                                        <tr>

                                            <th style="width: 40%;" class="header"  sort-column-Type="number" column-Name="BillID"  data-sort="BillID">Invoice # 
                                            </th>
                                            <th style="width: 30%;" class="header"  sort-column-Type="date" column-Name="PaidOn"  data-sort="PaidOn">Payment Date
                                            </th>
                                            <th style="width: 30%;" class="header"  sort-column-Type="number" column-Name="ApprovedAmount"  data-sort="ApprovedAmount"><center>Payable Amount ($)</center>
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody id="tbl-recent-Payment-Body">
                                      
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
      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_bill-view" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 550px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title" id="billFileTitle">Passmoregas.pdf</h4>
                        </div>
                        <div class="cell-right">
                             <a><i class="fa fa-times-circle" style="color:#8A8A8A;" id="bill-Close" data-dismiss="modal" aria-hidden="true"></i></a>
                           <%-- <button type="button" class="close img-typ-sq" id="bill-Close" data-dismiss="modal" aria-hidden="true">
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
   
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script src="iscjsengine/PageScript/ApprovalDetails.js" type="text/javascript"></script>
</asp:Content>

