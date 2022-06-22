<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="VendorList.aspx.cs" Inherits="BillManagement.VendorList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
       
        input[type='file'] {
    border: 3px dashed #999;
    padding: 140px 50px 10px 50px;
    cursor: move;
    position:relative;
}
input[type='file']:before {
    content: "Drop Files to Attach";
    display: block;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 40px;
    margin: -25px 0 0 -100px;
    font-size: 18px;
    font-weight: bold;
    color: #999;
}
input[type=file]:focus, input[type=radio]:focus, input[type=checkbox]:focus
{
    outline:unset !important;
}
.isc-app-screen-body-container{
    overflow-x:hidden;
}
.isc-popup-detail-form-s1 .modal-title {
    color: #fff !important;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="scree-row">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-users"></i>
                        <h2 style="line-height: 30px;">Vendor List</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">


                <div class="cell-right">
                    <div class="align-right  pad-rig-5 " >

                        <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                    </div>

                </div>

                <div class="cell-right pad-rig-5">
                    <ul class="isc-sec-lvl-cust-dd-s1">
                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 isc-mar-to-unset" data-toggle="dropdown">Action<i class="fa fa-angle-down"></i></a>
                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                <li class="" id="btn-ImportVendor"><a title="Import" data-toggle="modal" href="#mp_paid">Import</a></li>
                                <li><a id="Download-lst" title="Download Template" href="#">Download Template</a>
                                </li>


                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                    <%--      <a class="isc-theme-blue-btn" href="#" style="margin-right:5px;">Export </a>--%>
                    <a class="isc-theme-blue-btn" id="Add-Vendor" title="Add Vendor" href="AddVendor.aspx">Add Vendor </a>
                </div>
            </div>
                </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                <div class="isc-filter-container  isc-flt-hgt-mb-res" id="isc-filter-container">
                    <div class="screen-row">
                        <div class="div-col-80per">


                                <div class="cell-left  ">
                                    <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-Vendor" placeholder=" Enter Vendor Name" />
                                    <%--      <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>Choose Bills/Invoice #</option>
                                <option>303768		
                                </option>
                                <option>293991		
                                </option>
                                <option>195994		
                                </option>
                                <option>97997		
                                </option>

                            </select>--%>
                                </div>
                                <div class="cell-left pad-lft-15 ">
                                    <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-Balance" placeholder=" Enter Balance" />

                                </div>
                                <div class="cell-left pad-lft-15 ">
                                   <%-- <input type="text" class="form-control iscdatepicker isc-frm-cont-mb-res" id="txt-Last-Pay" placeholder=" Last Payment Date" />--%>
                                    <input type="date" class="form-control" id="txt-Last-Pay"/>
                                    <%--  <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option>Choose  Status</option>
                                <option>Pending Submission
		
                                </option>
                                <option>Rejected
		
                                </option>
                                <option>Approval Pending
		
                                </option>
                                <option>Approved
		
                                </option>

                            </select>--%>
                                </div>
                        </div>
                        <div class="div-col-20per">
                                <div id="Btn_serch" class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div id="btn_Reset" class="isc-filter-search isc-reset" title="Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>
                                <div class="isc-filter-container-close" id="isc-filter-container-close">
                                    <a title="Close"><i class="fa fa-times"></i></a>
                                </div>
                            </div>
                        </div>
                            </div>
            </div>
                    <div class="screen-row">
                        <div class="screen-row mar-bot-med">

                            <div class="div-col-25per ">
                                <a>
                                    <div class="isc-scr-sec-grp-container-s1">
                                        <div class="isc-scr-sec-grp-hdr-container-s1">
                                            <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Unsubmitted Bills  </h2>
                                            </div>
                                            <div class="cell-right">
                                                <a class="isc-apr-hm-kpi-btn" id="un-Submitted-Count">0</a>
                                            </div>
                                        </div>
                                        <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                            <div class="screen-row">
                                                <div class="isc-grp-sec-ent-cell-s1">

                                                    <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                        <h5 id="un-Submitted-Amount">$0 </h5>
                                                        <div class="screen-row ">
                                                            <div class="cell-left">
                                                                <h4>Due this week</h4>
                                                            </div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn" id="un-Submitted-Week-Count">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10">
                                <div class="isc-scr-sec-grp-container-s1">
                                    <div class="isc-scr-sec-grp-hdr-container-s1">
                                        <div class="cell-left">
                                            <h2 class="isc-scr-sec-hdr-s1">Rejected Bills <%--<span class="isc-usr-hmethr-kpi-spn">(12)</span>--%></h2>
                                        </div>
                                        <div class="cell-right">
                                            <a class="isc-apr-hm-kpi-btn" style="background-color: #ED5263;" id="rejected-Count">0</a>
                                        </div>

                                    </div>
                                    <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                        <div class="screen-row">
                                            <div class="isc-grp-sec-ent-cell-s1">

                                                <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                    <h5 id="rejected-Amount">$0 </h5>
                                                    <div class="screen-row">
                                                        <div class="cell-left">
                                                            <h4>New Bills</h4>
                                                        </div>
                                                        <div class="cell-right">
                                                            <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3" id="rejected-Week-Count">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10">
                                <div class="isc-scr-sec-grp-container-s1">
                                    <div class="isc-scr-sec-grp-hdr-container-s1">
                                        <div class="cell-left">
                                            <h2 class="isc-scr-sec-hdr-s1">Awaiting Approvals<%--<span class="isc-usr-hmethr-kpi-spn">(23)</span>--%></h2>
                                        </div>
                                        <div class="cell-right">
                                            <a class="isc-apr-hm-kpi-btn" style="background-color: #F8AA56;" id="un-Approved-Count">0</a>
                                        </div>
                                    </div>
                                    <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                        <div class="screen-row">
                                            <div class="isc-grp-sec-ent-cell-s1">

                                                <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                    <h5 id="un-Approved-Amount">$0 </h5>
                                                    <div class="screen-row ">
                                                        <div class="cell-left">
                                                            <h4>Due This Week</h4>
                                                        </div>
                                                        <div class="cell-right">
                                                            <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4" id="un-Approved-Week-Count">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-col-25per pad-lft-12 isc-mbl-mar-top-10">
                                <div class="isc-scr-sec-grp-container-s1">
                                    <div class="isc-scr-sec-grp-hdr-container-s1">
                                        <div class="cell-left">
                                            <h2 class="isc-scr-sec-hdr-s1">Total Bills <%--<span class="isc-usr-hmethr-kpi-spn">(54)</span>--%></h2>
                                        </div>
                                        <div class="cell-right">
                                            <a class="isc-apr-hm-kpi-btn" style="background-color: #14B191;" id="total-Amount-Count">0
                                            </a>
                                        </div>
                                    </div>
                                    <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                        <div class="screen-row">
                                            <div class="isc-grp-sec-ent-cell-s1">

                                                <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                    <h5 id="total-Amount">$0 </h5>
                                                    <div class="screen-row ">
                                                        <div class="cell-left">
                                                            <h4>Due This Week</h4>
                                                        </div>
                                                        <div class="cell-right">
                                                            <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1" id="total-Week-Count">0<i class="fa fa-arrow-up" style="margin-left: 5px;"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="screen-row ">
                            
                        </div>
                        <div class="screen-row isc-mb-res-tab-scr  <%--isc-tab-src-cont-res--%>">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-upd-bill-cont " id="tbl-Vendors" style="border:unset;padding:0px;">
                                <thead>
                                    <tr>

                                        <th style="width: 20%;" class="" sort-column-type="text" column-name="VendorName" data-sort="VendorName">Vendor Name
                                        </th>
                                        <%--   <th style="width: 23%;" class="" sort-column-Type="text" column-Name="Address"  data-sort="Address">Address
                                                        </th>--%>
                                        <th style="width: 23%;" class="" sort-column-type="date" column-name="NextDuedate" data-sort="NextDuedate">Next Due Date
                                        </th>
                                        <th style="width: 23%;" class="" sort-column-type="text" column-name="DueAmount" data-sort="DueAmount">Due Amount
                                        </th>
                                        <%--  <th style="width: 20%;" class="" sort-column-Type="text" column-Name="Email"  data-sort="Email">Email
                                                        </th>--%>
                                        <th style="width: 13.5%; text-align: center;" class="" sort-column-type="number" column-name="Balance" data-sort="Balance">Balance
                                        </th>
                                        <th style="width: 13.5%; text-align: center;" class="" sort-column-type="number" column-name="TotalAmountPaid" data-sort="TotalAmountPaid">Total Amount Paid
                                        </th>
                                        <%-- <th style="width: 13%;text-align:center;" class="">Vendor Credits
                                                        </th>--%>
                                        <th style="width: 13.5%; text-align: center;" class="" sort-column-type="date" column-name="PaidOn" data-sort="PaidOn">Last Payment Date
                                        </th>
                                        <th style="width: 10%; text-align: center;">Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="tbl-Vendors-Bdy">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Delete_Vendor" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 450px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Delete Vendor</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times" title="Close" style="cursor: pointer; color: #fff !important;" cancel-delete-vendor="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20" style="min-height: 75px;">
                    <p class=" pad-top-15" style="font-size: 20px;color: #aaa;">Are you sure want to delete the <label id="vendorName" style="font-size: 20px;"> </label>  ?</p>
                </div>
                <div class="modal-footer">

                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="delete-Vendor-Yes">
                                Ok</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" cancel-delete-vendor="true" style="background-color: #95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>

    <div class="modal fade isc-popup-detail-form-s1 Mp_Relese in" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" style="">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Vendor Import</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" id="Btn_cancel" title="Close" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height: 200px; text-align: center;">
                        <div class="screen-row " style="margin-top: 6px;">
                           <%-- <a href="#" class="cell-right isc-mar-btm-10">Vendor-Template.xlsx</a>--%>

                        </div>
                        <div class="file-upload-wrapper" style="margin-top: 20px;">
                           
                      
                        <div class="screen-row " style="margin-top: 20px;">


                            <input type="file" name="filename" id="Import-excel"  style="width: 600px;" />

                        </div>
                         </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" id="Btn-Upload" data-dismiss="modal">
                            Upload</button>
                        <button type="button" id="BtnCancel" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script>
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });

     
    </script>

    <script src="iscjsengine/PageScript/VendorList.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.7/xlsx.core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xls/0.7.4-a/xls.core.min.js"></script>
</asp:Content>
