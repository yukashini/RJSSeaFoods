<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AccountsPayablePreferences.aspx.cs" Inherits="BillManagement.AccountsPayablePreferences" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-g-b {
            border: 0px;
            border-bottom: 2px solid;
            border-image: linear-gradient(to right, #1589ee 10%, #fff);
            border-image-slice: 1;
            padding: 0;
            margin: 0 0 0 30px;
            padding-left: 0px !important;
            padding-bottom: 8px !important;
        }



        .checkbox-list > label {
            display: block;
            line-height: 25px;
        }

        #defAnswer .isc-sec-grp {
            padding-bottom: 20px !important;
        }

        .radio-inline, .checkbox-inline {
            padding-left: 0px;
        }

        /*.isc-wid-14 {
            width: 15% !important;
        }*/

        .isc-pad-l-75 {
            padding-left: 75px;
        }

        #cusAnswer {
            display: none;
        }

        .isc-bill-trk-lst-cont {
            border: none !important;
        }

        .isc-cus-var.isc-bill-trk-wdth .select2-container {
            width: 90% !important;
        }

        .add-new-app {
            float: right;
            margin-top: 10px;
            margin-right: 10px;
        }

        .isc-mar-btm-7 {
            margin-bottom: 7px;
        }

        .isc-wid-8 {
            width: 8%;
            float: left;
        }

        .isc-pad-lft-20 {
            padding-left: 20px;
        }

        .isc-wid-14 {
            width: 14%;
            float: left;
        }

        .isc-m-t-5 {
            margin-top: 5px;
        }

        .isc-m-l-10 {
            margin-left: 10px;
        }

        .isc-pos-rel {
            position: relative !important;
        }

        .isc-pad-non {
            padding: 0px !important;
        }

        .isc-bgclr-collapse {
            background: #F9F9F9;
        }

        .isc-pad-10 {
            padding: 10px;
        }





        .isc-pad-p5 {
            padding: 10px 125px;
        }

        .isc-popup-btn-s1 {
            display: inline-block;
            color: #525252;
            margin: 0px 0px 0px 0px;
            font-size: 14px;
            padding: 0px 10px;
            font-weight: 400;
            border-radius: 0px !important;
            cursor: pointer;
            line-height: 27px;
            background-color: #fff;
            position: relative;
            border: 1px solid #efefef;
            border-radius: 4px !important;
        }

        .isc-mar-top {
            margin-top: 15px;
        }

        .isc-sec-grp {
            background-color: #f9f9f9;
            padding: 20px;
            width: 570px;
            border: 1px solid #eee;
            padding-bottom: 40px;
        }

        .isc-detail-name.isc-var-h {
            width: 42%;
        }

        .isc-mar-t1 {
            margin-top: 10px !important;
        }

        .isc-two-col {
            display: flex;
        }

        .isc-rem-btn {
            color: #ff6c6c;
        }

        .isc-add-or {
            width: 41% !important;
            color: #1589ee;
        }

        .isc-detail-name select {
            width: 100%;
            height: 28px;
            border: 1px solid #dadada;
            border-radius: 4px;
        }

        .isc-new-pop-up .modal-body {
            height: calc(100vh - 107px);
            overflow-y: scroll;
        }

        #app-config .isc-btn-pop-action-s1 {
            width: unset;
        }


        .isc-pad {
            padding: 16px 20px;
        }

        .isc-file-upload-in-con {
            width: 76% !important;
            position: relative;
            height: 100px;
        }

            .isc-file-upload-in-con h2 {
                color: #000;
                font-size: 15px;
                margin-top: 10px;
            }

        .isc-lbl-vry-sm-txt-s1 {
            line-height: 37px;
        }

        .isc-text-wid textarea {
            width: 95%;
        }

        .isc-input-wid input {
            width: 30% !important;
        }
        div.radio, div.radio * {
    margin: 0;
    padding: 0;
    margin-top: -1px;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="isc-app-screen-content-s1">

        <div class="screen-row">
            <div class="isc-app-screen-header-container" style="height: 46px;">
                <div class="div-col-30per">
                    <div class="screen-row">
                        <div class="isc-page-header">
                            <i class="fa fa-home"></i>
                            <h2 style="line-height: 30px;">Accounts Payable Preferences</h2>
                            <h6 class="mar-none"></h6>
                        </div>
                    </div>
                </div>
                <div class="div-col-70per">

                    <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                        <a class="isc-theme-blue-btn isc-sav-btn" id="btn-SaveConfigs" title="Save">Save</a>
                        <a class="isc-theme-blue-btn pad-lft-12 isc-cnl-btn" id="btn-Cancel" style="" title="Cancel">Cancel</a>
                    </div>


                </div>
            </div>
            <div class="isc-app-screen-body-container" style="height: 270px;">
                <div class="screen-row">
                    <div class="isc-app-screen-sec-container-s1 ">

                        <div class="isc-sec-div-grp-cell-s1">
                            <div class="isc-screen-nav-container-s1">
                                <ul class="nav nav-tabs" style="position: relative;">
                                    <li class="active"><a href="#Tab11" data-toggle="tab">Payable </a></li>

                                    <li class=""><a href="#Tab12" data-toggle="tab">Receivable  </a></li>

                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="Tab11">
                                        <div class="isc-app-screen-sec-container-s1 ">
                                            <div class="isc-sec-div-grp-cell-s1">
                                                <div class="isc-screen-nav-container-s1">
                                                    <ul class="nav nav-tabs" style="position: relative;">
                                                        <li class="active"><a href="#Tab1" data-toggle="tab">Bill  Preferences <%--and Payments  Preferences--%></a> </li>

                                                        <li class=""><a href="#Tab2" data-toggle="tab">Approval </a></li>
                                                        <li class=""><a href="#Tab3" data-toggle="tab">Sync </a></li>
                                                    </ul>
                                                    <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                                    <div class="tab-content">
                                                        <div class="tab-pane active" id="Tab1">
                                                            <div class="isc-app-inr-bdy-sec-body-container">
                                                                <div class="isc-screen-nav-container-s1">

                                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                        <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b" href="#coll_s7" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Bill</h5>
                                                                        <div class="isc-pad-l-75">
                                                                            <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s7" style="height: auto;">
                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">Allow Changes to Bills ? <span><%--<i class="fa fa-info-circle"></i>--%></span></label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14 isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="BillChanges" id="notApproved" value="Option1" />

                                                                                                    Changes not allowed
                                                                                                </label>




                                                                                                <label class="radio-inline isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="BillChanges" id="allowChanges" value="Option2" />

                                                                                                    Allow untill approver has approved
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">Should users be allowed to Split Bills? <span><%--<i class="fa fa-info-circle"></i>--%></span></label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14 isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="isSplit" id="isSplitTrue" value="option3" checked="" />

                                                                                                    Yes , Enable split bill
                                                                                                </label>




                                                                                                <label class="radio-inline isc-wid-14 isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="isSplit" id="isSplitFalse" value="option4">
                                                                                                    No
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">
                                                                                        Should Bill recurrence option be enabled in Bill creation ?												
 <span><%--<i class="fa fa-info-circle"></i>--%></span></label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14 isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="isRecurrence" id="isRecurrenceTrue" value="option5" checked="" />
                                                                                                    <%--   <div class="radio" id="Div15">
                                                                        <span>
                                                                            <div class="radio" id="uniform-Radio17"><span class="checked"></span>
                                                                                
                                                                            </div></span></div>--%>
                                                                    Yes , Enable recurrence
                                                                                                </label>




                                                                                                <label class="radio-inline isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="isRecurrence" id="isRecurrenceFalse" value="option6" />
                                                                                                    <%--  <div class="radio" id="Div15">
                                                                        <span>
                                                                            <div class="radio" id="uniform-Radio17"><span class="checked"></span>
                                                                                
                                                                            </div></span></div>--%>
                                                               No
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">
                                                                                        Should users be able to associate Customer and Project with Bills?											
 <span><%--<i class="fa fa-info-circle"></i>--%></span></label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14 isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="isAssociateProject" id="isAssociateProjectTrue" value="option7" checked="" />
                                                                                                    <%--  <div class="radio" id="Div15">
                                                                        <span>
                                                                            <div class="radio" id="uniform-Radio17"><span class="checked"></span>
                                                                                
                                                                            </div></span></div>--%>
                                                                    Yes, Associate 
                                                                                                </label>




                                                                                                <label class="radio-inline isc-mb-dsp-blk">
                                                                                                    <input type="radio" name="isAssociateProject" id="isAssociateProjectFalse" value="option8" />
                                                                                                    <%--   <div class="radio" id="Div15">
                                                                        <span>
                                                                            <div class="radio" id="uniform-Radio17"><span class="checked"></span>
                                                                                
                                                                            </div></span></div>--%>
                                                               No
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                        </div>
                                                                    </div>



                                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                        <h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-g-b" href="#coll_s9" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Payment</h5>

                                                                        <div class="isc-pad-l-75">
                                                                            <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s9" style="height: auto;">
                                                                                <div class="form-group">

                                                                                    <div class="">
                                                                                        <div class="checkbox-list">
                                                                                            <label>
                                                                                                <input type="checkbox" id="chk-isExportBill" style="cursor: pointer" />
                                                                                                Allow users to Export Payables (Denali)
                                                                                            </label>
                                                                                            <label>
                                                                                                <input type="checkbox" id="chk-isEpayments" style="cursor: pointer" />
                                                                                                Allow e-Payments						

                                                                                            </label>
                                                                                            <label>
                                                                                                <input type="checkbox" id="chk-isOfflinePayments" style="cursor: pointer" />
                                                                                                Allow Offline Payments						

                                                                                            </label>
                                                                                            <label>
                                                                                                <input type="checkbox" id="chk-isImportVendors" style="cursor: pointer" />
                                                                                                Allow users to Import Vendors								

                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div class="tab-pane " id="Tab2">
                                                            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                <%--<h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-g-b" href="#coll_s8" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approval Preferences</h5>--%>
                                                                <div class="isc-pad-l-75">
                                                                    <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s8" style="height: auto;">
                                                                        <div class="screen-row mar-top-10">



                                                                            <div class="isc-app-pre">

                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7" style="display: block;">Please select the approval levels or Allow the system to auto approve the bills </label>
                                                                                <div class="checkbox-list" id="ch-partialAp">
                                                                                    <label style="cursor: pointer">
                                                                                        <input type="checkbox" style="margin-right: 3px; cursor: pointer;" id="chk-AllowPartialApproval" />
                                                                                        Allow Partial Approval
                                                                                    </label>
                                                                                </div>
                                                                                <label class="radio-inline isc-m-t-5 isc-mb-dsp-blk">
                                                                                    <input type="radio" name="optionsRadios" value="Auto Approval" id="isAutoApproval" checked="" class="" />

                                                                                    Auto Approval
                                                                                </label>


                                                                                <label class="radio-inline isc-m-t-5 isc-mb-dsp-blk" value="other">
                                                                                    <input type="radio" name="optionsRadios" value="other" id="isMultiApproval" checked="" class="" />
                                                                                    Allow Multilevel Approval
                                                                                </label>



                                                                                <label class="radio-inline isc-m-t-5 isc-mb-dsp-blk">
                                                                                    <input type="radio" name="optionsRadios" id="isDefaultApproval" value="defans" class="" />

                                                                                    Set Default Approver
                                                                                </label>



                                                                                <label class="radio-inline isc-m-t-5 isc-mb-dsp-blk">
                                                                                    <input type="radio" name="optionsRadios" id="isStandardApproval" checked="" class="" />

                                                                                    Standard Approval(Choose your set of approval(s))
                                                                    
                                                                                </label>



                                                                                <label class="radio-inline isc-m-t-5">
                                                                                    <input type="radio" name="optionsRadios" id="isCustomApproval" value="Custom" checked="" />
                                                                                    Custom Approval	<a class="isc-theme-blue-btn" id="btn-Open-Config" style="display: none;"><span class="app-config">Config </span></a>
                                                                                </label>

                                                                            </div>
                                                                            <div id="defAnswer" class="isc-mar-top" style="display: none">
                                                                                <div class="isc-sec-grp">
                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="radio-list">
                                                                                            <label class="radio-inline">
                                                                                                <%-- <div class="radio" id="Div114">
                                                                        <div>
                                                                            <div class="radio" id="uniform-Radio116">
                                                                                <span>
                                                                                    <input type="radio" name="optionsRadios112" id="Radio116" value="option4" checked="">

                                                                                </span>

                                                                            </div>

                                                                        </div>

                                                                    </div>--%>
                                                                    User
                                                                                            </label>

                                                                                            <%--<label class="radio-inline">
                                                                    <div class="radio" id="Div115">
                                                                        <div>
                                                                            <div class="radio" id="uniform-Radio127">
                                                                                <span class="checked">
                                                                                    <input type="radio" name="optionsRadios112" id="Radio117" value="option5" checked="">

                                                                                </span>

                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    
                                                                    Team/Role
                                                                </label>--%>
                                                                                        </div>




                                                                                        <div class="screen-row mar-top-10">
                                                                                            <div class="isc-wid-14">
                                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                    Approver 			
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="isc-cust-filt-dd-s1">
                                                                                                <select class="isc-select-dropdown select2" id="slt-DefaultApprovers">
                                                                                                    <option value="0">Choose Approver</option>


                                                                                                </select>
                                                                                                <%-- <span>
                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" href="#"><i class="fa fa-plus"></i></a> </span>--%>
                                                                                            </div>
                                                                                        </div>






                                                                                        <%--<div class="screen-row mar-top-10">
                                                                <div class="isc-wid-14">
                                                                 <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">Team / Role		
 </label>
           </div>                                                 <div class="isc-cust-filt-dd-s1">
                                                        <select class="isc-select-dropdown select2">
                                                            <option value="">Approver</option>
                                                              <option value="">Payer</option>
                                                           
                                                        </select>
              
                                                            </div>
                                                    </div>--%>
                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            <div id="otherAnswer" class="isc-mar-top" style="display: none">
                                                                                <div class="isc-sec-grp">


                                                                                    <div class="radio-list">
                                                                                        <label class="radio-inline">
                                                                                            User
                                                                                        </label>

                                                                                        <%--<label class="radio-inline">
                                                                    <div class="radio" id="Div115">
                                                                        <div>
                                                                            <div class="radio" id="uniform-Radio127">
                                                                                <span class="checked">
                                                                                    <input type="radio" name="optionsRadios112" id="Radio117" value="option5" checked="">

                                                                                </span>

                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    
                                                                    Team/Role
                                                                </label>--%>
                                                                                    </div>

                                                                                    <div id="div-Multiapprovers">
                                                                                        <%--  <div class="screen-row mar-top-10">
                                                                <div class="isc-wid-14">
                                                                 <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">Approver 1			
 </label>
                                                                    </div>
                                                            <div class="isc-cust-filt-dd-s1">
                                                        <select class="isc-select-dropdown select2">
                                                            <option value="">James Hope</option>
                                                             <option value="">Randy Kassan</option>
                                                           
                                                        </select>
                                                            </div>
                                                    </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="isc-wid-14">
                                                                 <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">Approver 2			
 </label>
           </div>                                                 <div class="isc-cust-filt-dd-s1">
                                                        <select class="isc-select-dropdown select2">
                                                            <option value="">Randy Kassan</option>
                                                              <option value="">Jmaes Hope</option>
                                                              <option value="">Inna Katayev</option>
                                                           
                                                        </select>
                                                            </div>
                                                    </div>--%>
                                                                                    </div>

                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="isc-wid-14">
                                                                                            <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                Approver 			
                                                                                            </label>
                                                                                        </div>
                                                                                        <div class="isc-cust-filt-dd-s1">
                                                                                            <select class="isc-select-dropdown select2" id="slt-MultiApprovers">
                                                                                                <option value="0">Choose Approver</option>

                                                                                            </select>
                                                                                            <span>
                                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" id="add-Multi-Approver"><i class="fa fa-plus"></i></a></span>
                                                                                        </div>
                                                                                    </div>






                                                                                    <%--<div class="screen-row mar-top-10">
                                                                <div class="isc-wid-14">
                                                                 <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">Team / Role		
 </label>
           </div>                                                 <div class="isc-cust-filt-dd-s1">
                                                        <select class="isc-select-dropdown select2">
                                                            <option value="">Approver</option>
                                                              <option value="">Payer</option>
                                                           
                                                        </select>
              
                                                            </div>
                                                    </div>--%>
                                                                                </div>
                                                                            </div>




                                                                            <div id="cusAnswer" class="isc-mar-top">

                                                                                <div class="items form-group">



                                                                                    <div class="isc-sec-grp">

                                                                                        <div class="isc-mar-t1">


                                                                                            <div class="screen-row">
                                                                                                <table id="tbl_congfig" class="isc-table-read-optimal isc-table-sorter-s1" style="width: 100%;">
                                                                                                    <thead>
                                                                                                        <tr>

                                                                                                            <th style="width: 20%; cursor: default;" class="" title="Condition">Condition
                                                                                                            </th>
                                                                                                            <th style="width: 30%; cursor: default;" class="" title="Approvers">Approvers
                                                                                                            </th>
                                                                                                            <%--   <th style="width: 20%;" class="header">Contact
                                                        </th>--%>
                                                                                                            <th style="width: 10%; cursor: default;" class="">Action
                                                                                                            </th>

                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody id="tbl-Custom-Config-Body">
                                                                                                        <%--  <tr>
                                                        
                                                        <td>
                                                            <h2>Bill Amount < 5000 </h2>
                                                        </td>
                                                        <td>
                                                            <h2 class="">Randy Kassan, Inna Katayev
                                                            </h2>
                                                        </td>
                                                       
                                                        <td>
                                                           <i class="fa fa-edit"></i>
                                                            <i class="fa fa-trash-o"></i>
                                                        </td>
                                                        
                                                        
                                                      
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>
                                                            <h2>Bill Amount > 5000 </h2>
                                                        </td>
                                                        <td>
                                                            <h2 class="">John Trovato, Randy Kassan, Inna Katayev
                                                            </h2>
                                                        </td>
                                                        
                                                        <td>
                                                           <i class="fa fa-edit"></i>
                                                            <i class="fa fa-trash-o"></i>
                                                        </td>
                                                        
                                                        
                                                      
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>
                                                            <h2>Bill Amount < 5000 </h2>
                                                        </td>
                                                        <td>
                                                            <h2 class="">Randy Kassan, Inna Katayev
                                                            </h2>
                                                        </td>
                                                        
                                                        <td>
                                                           <i class="fa fa-edit"></i>
                                                            <i class="fa fa-trash-o"></i>
                                                        </td>
                                                        
                                                        
                                                      
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>
                                                            <h2>Bill Amount < 5000 </h2>
                                                        </td>
                                                        <td>
                                                            <h2 class="">Randy Kassan, Inna Katayev
                                                            </h2>
                                                        </td>
                                                      
                                                        <td>
                                                           <i class="fa fa-edit"></i>
                                                            <i class="fa fa-trash-o"></i>
                                                        </td>
                                                        
                                                        
                                                      
                                                    </tr>--%>
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
                                                        </div>

                                                        <div class="tab-pane " id="Tab3">
                                                            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                <%--  <h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-g-b" href="#coll_s10" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Sync Preferences				
</h5>--%>
                                                                <div class="isc-pad-l-75">
                                                                    <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s10" style="height: auto;">
                                                                        <div class="form-group">

                                                                            <div class="mar-top-10">
                                                                                <div class="checkbox-list cell-left">
                                                                                    <label>
                                                                                        <span class=""><span class="checked">
                                                                                            <div class="checker">
                                                                                                <span class="checked">
                                                                                                    <input type="checkbox" checked=""></span>
                                                                                            </div>
                                                                                        </span></span>Allow users to Sync with Accounting Software
                                                       
                                                                                    </label>

                                                                                </div>
                                                                                <a class="isc-theme-blue-btn isc-usr-sub-btn cell-left isc-m-l-10 isc-pos-rel isc-mar-to-unset" href="#">Connect with Denali</a>
                                                                            </div>

                                                                        </div>
                                                                        <div class="form-group">

                                                                            <div class="">
                                                                                <div class="radio-list isc-pad-lft-20" style="font-size: 14px; font-weight: 500">
                                                                                    Auto sync
                                                                <label class="radio-inline">
                                                                    <div class="radio" id="Div15">
                                                                        <span>
                                                                            <div class="radio" id="uniform-Radio17">
                                                                                <span class="checked">
                                                                                    <div class="radio" id="uniform-Radio17">
                                                                                        <span>
                                                                                            <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked="checked"></span>
                                                                                    </div>
                                                                                </span>

                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                    <%--Auto Sync--%>
                                                                     Enable
                                                                </label>




                                                                                    <label class="radio-inline">
                                                                                        <div class="radio" id="Div15">
                                                                                            <span class="checked">
                                                                                                <div class="radio" id="uniform-Radio17">
                                                                                                    <span class="checked">
                                                                                                        <div class="radio" id="uniform-Radio17">
                                                                                                            <span>
                                                                                                                <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span>
                                                                                                        </div>
                                                                                                    </span>

                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                        <%--Manual Sync--%>
                                                                    Disable
                                                                                    </label>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <p></p>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">From Bill</label>

                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">From Denali</label>

                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Users </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker">
                                                                                            <span class="checked">
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Vendors</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class="checked"><span class="">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Approved Bills</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class="checked"><span class="">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Chart Of Accounts</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=" checked">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class="checked"><span class="">
                                                                                        <div class="checker">
                                                                                            <span>
                                                                                                <input type="checkbox"></span>
                                                                                        </div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="Tab12">
                                        <div class="isc-app-inr-bdy-sec-body-container">
                                            <div class="isc-screen-nav-container-s1">
                                                <h3 style="color: #000; font-weight: 500; padding-left: 12px;">Invoice Preferences</h3>
                                                <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                    <%--                                                    <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b" href="#coll_s7" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Invoice Preferences</h5>--%>
                                                    <div class="isc-pad-l-75">
                                                        <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s7" style="height: auto;">
                                                            <div class="isc-screen-row">

                                                                <div class="isc-details-sec">
                                                                    <div class="isc-screen-row">
                                                                        <div class="isc-hor-details">

                                                                            <div class="isc-label-name">
                                                                                <label>Invoice Number Template  </label>
                                                                            </div>
                                                                            <div class="isc-detail-name isc-input-wid" style="position: relative;">

                                                                                <input type="text" class="form-control" name="planweek" id="txt-prefix" aria-required="true">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="isc-screen-row">
                                                                        <div class="isc-hor-details">
                                                                            <div class="isc-label-name">
                                                                                <label></label>
                                                                            </div>

                                                                        </div>
                                                                    </div>




                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Should users be allowed to split invoice? <span><i class="fa fa-info-circle"></i></span></label>
                                                                <div class="form-group">

                                                                    <div class="">
                                                                        <div class="radio-list">

                                                                            <label class="radio-inline isc-wid-14">
                                                                                <div class="radio" id="Div100">
                                                                                    <span>
                                                                                        <div class="radio" id="split-invoice">
                                                                                            <span class="checked">
                                                                                                <input type="radio" name="splitinvoice" id="yes" value="1" checked=""></span>

                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                                Yes , Enable split invoice
                                                                            </label>




                                                                            <label class="radio-inline isc-wid-14">
                                                                                <div class="radio" id="Div15">
                                                                                    <span>
                                                                                        <div class="radio" id="uniform-Radio17">
                                                                                            <span class="checked">
                                                                                                <input type="radio" name="splitinvoice" id="no" value="0"></span>

                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                                No
                                                                            </label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">
                                                                    Should users be allowed to edit invoice after email sent to customer?										
 <span><i class="fa fa-info-circle"></i></span>
                                                                </label>
                                                                <div class="form-group">

                                                                    <div class="">
                                                                        <div class="radio-list">

                                                                            <label class="radio-inline isc-wid-14">
                                                                                <div class="radio" id="Div15">
                                                                                    <span>
                                                                                        <div class="radio" id="uniform-Radio17">
                                                                                            <span class="checked">
                                                                                                <input type="radio" name="sendmail" id="Radio17" value="1" checked=""></span>

                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                                Yes , Enable edit invoice
                                                                            </label>




                                                                            <label class="radio-inline">
                                                                                <div class="radio" id="Div15">
                                                                                    <span>
                                                                                        <div class="radio" id="uniform-Radio17">
                                                                                            <span class="checked">
                                                                                                <input type="radio" name="sendmail" id="Radio17" value="0"></span>

                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                                No
                                                                            </label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>




                                                            <div class="isc-screen-row mar-top-10">
                                                                <div class="div-col-80per">
                                                                    <div class="isc-hor-details">
                                                                        <div class="isc-label-name">
                                                                            <label>Terms & Conditions </label>
                                                                        </div>
                                                                        <div class="isc-detail-name isc-text-wid">
                                                                            <textarea id="txt-termcondition" name="w3review" rows="4" class="form-control"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="isc-screen-row mar-top-10">
                                                                <div class="div-col-80per">
                                                                    <div class="isc-hor-details">
                                                                        <div class="isc-label-name">
                                                                            <label>Notes </label>
                                                                        </div>
                                                                        <div class="isc-detail-name isc-text-wid">
                                                                            <textarea id="txt-note" name="w3review" rows="4" class="form-control"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="isc-screen-row mar-top-10">
                                                                <div class="div-col-80per">
                                                                    <div class="isc-hor-details">
                                                                        <div class="isc-label-name">
                                                                            <label>Invoice template - Footer Information </label>
                                                                        </div>
                                                                        <div class="isc-detail-name isc-text-wid">
                                                                            <textarea id="txt-template" name="w3review" rows="4" class="form-control"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>



                                                <%--<div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                    <h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-g-b" href="#coll_s9" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Payment Preference</h5>
                       
                         <div class="isc-pad-l-75">
                                                      <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s9" style="height: auto;">
                                              <div class="form-group">
                                                       
                                                        <div class="">
                                                            <div class="checkbox-list">
                                                                <label>
                                                                    <span class=""><span class="checked">
                                                                        <div class="checker"><span class="checked"><input type="checkbox" checked=""></span></div></span></span>Allow users to Export Payables (Denali)
                                                                </label>
                                                                <label>
                                                                    <span class=""><span class="">
                                                                        <div class="checker"><span><input type="checkbox"></span></div></span></span>Allow e-Payments						

                                                                </label>
                                                                <label>
                                                                    <span class=""><span class="">
                                                                        <div class="checker"><span><input type="checkbox"></span></div></span></span>Allow Offline Payments						

                                                                </label>
                                                                <label>
                                                                    <span class=""><span class="">
                                                                        <div class="checker"><span><input type="checkbox"></span></div></span></span>Allow users to Import Vendors								

                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                      
                                                         </div>
                             </div>
                     </div>--%>
                                            </div>


                                        </div>
                                        <div class="isc-app-screen-sec-container-s1 " style="display: none;">

                                            <div class="isc-sec-div-grp-cell-s1">

                                                <div class="isc-screen-nav-container-s1">
                                                    <ul class="nav nav-tabs" style="position: relative; display: none;">
                                                        <li class="active"><a href="#Tab4" data-toggle="tab">Invoice Preferences</a> </li>
                                                        <li class=""><a href="#Tab5" data-toggle="tab">Sync </a></li>
                                                        <li><a href="#Tab6" data-toggle="tab">Estimate Preferences</a> </li>
                                                        <li><a href="#Tab7" data-toggle="tab">Approval</a> </li>
                                                    </ul>
                                                    <%--<a class="isc-theme-blue-btn isc-usr-sub-btn" href="#"> Submit All</a>--%>
                                                    <div class="tab-content">
                                                        <div class="tab-pane active" id="Tab4">
                                                            <div class="isc-app-inr-bdy-sec-body-container">
                                                                <div class="isc-screen-nav-container-s1">
                                                                    <h3>Invoice Preferences</h3>
                                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                        <%--                                                    <h5 class="isc-bill-trk-hdr-txt isc-pad-10  isc-g-b" href="#coll_s7" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Invoice Preferences</h5>--%>
                                                                        <div class="isc-pad-l-75">
                                                                            <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s7" style="height: auto;">
                                                                                <div class="isc-screen-row">

                                                                                    <div class="isc-details-sec">
                                                                                        <div class="isc-screen-row">
                                                                                            <div class="isc-hor-details">

                                                                                                <div class="isc-label-name">
                                                                                                    <label>Invoice Number Template  </label>
                                                                                                </div>
                                                                                                <div class="isc-detail-name isc-input-wid" style="position: relative;">

                                                                                                    <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Eg: Inv_1001" aria-required="true">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="isc-screen-row">
                                                                                            <div class="isc-hor-details">
                                                                                                <div class="isc-label-name">
                                                                                                    <label>Preview : Inv_1001</label>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>




                                                                                    </div>
                                                                                </div>
                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">Should users be allowed to split invoice? <span><i class="fa fa-info-circle"></i></span></label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14">
                                                                                                    <div class="radio" id="Div15">
                                                                                                        <span>
                                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                                <span class="checked">
                                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span>

                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    Yes , Enable split invoice
                                                                                                </label>




                                                                                                <label class="radio-inline isc-wid-14">
                                                                                                    <div class="radio" id="Div15">
                                                                                                        <span>
                                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                                <span class="checked">
                                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5"></span>

                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    No
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">
                                                                                        Should users be allowed to edit invoice after email sent to customer?										
 <span><i class="fa fa-info-circle"></i></span>
                                                                                    </label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14">
                                                                                                    <div class="radio" id="Div15">
                                                                                                        <span>
                                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                                <span class="checked">
                                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span>

                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    Yes , Enable edit invoice
                                                                                                </label>




                                                                                                <label class="radio-inline">
                                                                                                    <div class="radio" id="Div15">
                                                                                                        <span>
                                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                                <span class="checked">
                                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5"></span>

                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    No
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>


                                                                                <%--<div class="screen-row mar-top-10">
                  <div class="isc-screen-row">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Upload your company logo that must appear on your Invoice Slip
</label>
           </div>
     
           </div>
       </div>
              </div>--%>
                                                                                <%--<div class="screen-row ">
           <div class="isc-hor-details">
             <div class="isc-file-upload-in-con" style="padding: 5px 10px;">
                                                            <i class="fa fa-cloud-upload"></i>
                                                           <div class="screen-row">
                                                                <h2>Drag And Drop or<span class="isc-btn-inp-typ-file-s1" style="background-color: #f9f9f9 !important;">Browse
                                                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                            </span></h2>
                                                            </div>
                                  <div class="screen-row">
                                                            <h3 class="isc-lbl-vry-sm-txt-s1" style="text-align:center">
                                                                <span>Note:</span>
                                                                Upload only PDF, JPG ,JPEG & PNG file with Max 10 MB</h3>
                                                        </div>
                                                        </div>
                  </div>
       </div>--%>
                                                                                <div class="isc-screen-row mar-top-10">
                                                                                    <div class="div-col-80per">
                                                                                        <div class="isc-hor-details">
                                                                                            <div class="isc-label-name">
                                                                                                <label>Terms & Conditions </label>
                                                                                            </div>
                                                                                            <div class="isc-detail-name isc-text-wid">
                                                                                                <textarea id="w3review" name="w3review" rows="4" class="form-control"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="isc-screen-row mar-top-10">
                                                                                    <div class="div-col-80per">
                                                                                        <div class="isc-hor-details">
                                                                                            <div class="isc-label-name">
                                                                                                <label>Notes </label>
                                                                                            </div>
                                                                                            <div class="isc-detail-name isc-text-wid">
                                                                                                <textarea id="w3review" name="w3review" rows="4" class="form-control"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="isc-screen-row mar-top-10">
                                                                                    <div class="div-col-80per">
                                                                                        <div class="isc-hor-details">
                                                                                            <div class="isc-label-name">
                                                                                                <label>Invoice template - Footer Information </label>
                                                                                            </div>
                                                                                            <div class="isc-detail-name isc-text-wid">
                                                                                                <textarea id="w3review" name="w3review" rows="4" class="form-control"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                        </div>
                                                                    </div>



                                                                    <%--<div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                    <h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-g-b" href="#coll_s9" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Payment Preference</h5>
                       
                         <div class="isc-pad-l-75">
                                                      <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s9" style="height: auto;">
                                              <div class="form-group">
                                                       
                                                        <div class="">
                                                            <div class="checkbox-list">
                                                                <label>
                                                                    <span class=""><span class="checked">
                                                                        <div class="checker"><span class="checked"><input type="checkbox" checked=""></span></div></span></span>Allow users to Export Payables (Denali)
                                                                </label>
                                                                <label>
                                                                    <span class=""><span class="">
                                                                        <div class="checker"><span><input type="checkbox"></span></div></span></span>Allow e-Payments						

                                                                </label>
                                                                <label>
                                                                    <span class=""><span class="">
                                                                        <div class="checker"><span><input type="checkbox"></span></div></span></span>Allow Offline Payments						

                                                                </label>
                                                                <label>
                                                                    <span class=""><span class="">
                                                                        <div class="checker"><span><input type="checkbox"></span></div></span></span>Allow users to Import Vendors								

                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                      
                                                         </div>
                             </div>
                     </div>--%>
                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div class="tab-pane " id="Tab5">
                                                            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                <%--  <h5 class="isc-bill-trk-hdr-txt isc-pad-10 isc-g-b" href="#coll_s10" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Sync Preferences				
</h5>--%>
                                                                <div class="isc-pad-l-75">
                                                                    <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s10" style="height: auto;">
                                                                        <div class="form-group">

                                                                            <div class="mar-top-10">
                                                                                <div class="checkbox-list cell-left">
                                                                                    <label>
                                                                                        <span class=""><span class="checked">
                                                                                            <div class="checker"><span class="checked">
                                                                                                <input type="checkbox" checked=""></span></div>
                                                                                        </span></span>Allow users to Sync with Accounting Software
                                                       
                                                                                    </label>

                                                                                </div>
                                                                                <a class="isc-theme-blue-btn isc-usr-sub-btn cell-left isc-m-l-10 isc-pos-rel" href="#">Connect with Denali</a>
                                                                            </div>

                                                                        </div>
                                                                        <div class="form-group">

                                                                            <div class="">
                                                                                <div class="radio-list isc-pad-lft-20">

                                                                                    <label class="radio-inline">
                                                                                        <div class="radio" id="Div15">
                                                                                            <span>
                                                                                                <div class="radio" id="uniform-Radio17">
                                                                                                    <span class="checked">
                                                                                                        <div class="radio" id="uniform-Radio17"><span>
                                                                                                            <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span></div>
                                                                                                    </span>

                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                        Auto Sync
                                                                                    </label>




                                                                                    <label class="radio-inline">
                                                                                        <div class="radio" id="Div15">
                                                                                            <span class="checked">
                                                                                                <div class="radio" id="uniform-Radio17">
                                                                                                    <span class="checked">
                                                                                                        <div class="radio" id="uniform-Radio17"><span>
                                                                                                            <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span></div>
                                                                                                    </span>

                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                        Manual Sync
                                                                                    </label>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <p></p>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">From Bill</label>

                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">From Denali</label>

                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Allow users to sync</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker"><span class="checked">
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Vendors</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class="checked"><span class="">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Approved Bills</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=""><span class="">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class="checked"><span class="">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="screen-row ">
                                                                            <div class="isc-wid-14">
                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7">Chart Of Accounts</label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class=" checked">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span>

                                                                                </label>
                                                                            </div>
                                                                            <div class="isc-wid-8">
                                                                                <label>
                                                                                    <span class="checked"><span class="">
                                                                                        <div class="checker"><span>
                                                                                            <input type="checkbox"></span></div>
                                                                                    </span></span>

                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane " id="Tab6">
                                                            <div class="isc-app-inr-bdy-sec-body-container">
                                                                <div class="isc-screen-nav-container-s1">

                                                                    <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                        <div class="isc-pad-l-75">
                                                                            <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s7" style="height: auto;">
                                                                                <div class="isc-screen-row">

                                                                                    <div class="isc-details-sec">
                                                                                        <div class="isc-screen-row">
                                                                                            <div class="isc-hor-details">
                                                                                                <div class="isc-label-name">
                                                                                                    <label>Estimate Number Template  </label>
                                                                                                </div>
                                                                                                <div class="isc-detail-name isc-input-wid" style="position: relative;">

                                                                                                    <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Eg: EST_1001" aria-required="true">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="isc-screen-row">
                                                                                            <div class="isc-hor-details">
                                                                                                <div class="isc-label-name">
                                                                                                    <label>Preview : EST_1001</label>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>




                                                                                    </div>
                                                                                </div>

                                                                                <div class="screen-row mar-top-10">
                                                                                    <label class="isc-up-bill-lbl isc-mar-btm-7">
                                                                                        Should users be allowed to edit after sending it for a approval?										
 <span><i class="fa fa-info-circle"></i></span>
                                                                                    </label>
                                                                                    <div class="form-group">

                                                                                        <div class="">
                                                                                            <div class="radio-list">

                                                                                                <label class="radio-inline isc-wid-14">
                                                                                                    <div class="radio" id="Div15">
                                                                                                        <span>
                                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                                <span class="checked">
                                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span>

                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    Yes , Enable edit invoice
                                                                                                </label>




                                                                                                <label class="radio-inline">
                                                                                                    <div class="radio" id="Div15">
                                                                                                        <span>
                                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                                <span class="checked">
                                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5"></span>

                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    No
                                                                                                </label>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>


                                                                                <%--<div class="screen-row mar-top-10">
                  <div class="isc-screen-row">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Upload your company logo that must appear on your Invoice Slip
</label>
           </div>
     
           </div>
       </div>
              </div>--%>

                                                                                <div class="isc-screen-row mar-top-10">
                                                                                    <div class="div-col-80per">
                                                                                        <div class="isc-hor-details">
                                                                                            <div class="isc-label-name">
                                                                                                <label>Terms & Conditions </label>
                                                                                            </div>
                                                                                            <div class="isc-detail-name isc-text-wid">
                                                                                                <textarea id="w3review" name="w3review" rows="4" class="form-control"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="isc-screen-row mar-top-10">
                                                                                    <div class="div-col-80per">
                                                                                        <div class="isc-hor-details">
                                                                                            <div class="isc-label-name">
                                                                                                <label>Notes </label>
                                                                                            </div>
                                                                                            <div class="isc-detail-name isc-text-wid">
                                                                                                <textarea id="w3review" name="w3review" rows="4" class="form-control"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="isc-screen-row mar-top-10">
                                                                                    <div class="div-col-80per">
                                                                                        <div class="isc-hor-details">
                                                                                            <div class="isc-label-name">
                                                                                                <label>EStimate template - Footer Information </label>
                                                                                            </div>
                                                                                            <div class="isc-detail-name isc-text-wid">
                                                                                                <textarea id="w3review" name="w3review" rows="4" class="form-control"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                        </div>
                                                                    </div>






                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div class="tab-pane " id="Tab7">
                                                            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-pad-non">
                                                                <div class="isc-pad-l-75">
                                                                    <div class="screen-row mar-top-10 collapse in isc-pad-10" id="coll_s8" style="height: auto;">
                                                                        <div class="screen-row mar-top-10">
                                                                            <div class="isc-app-pre">

                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7" style="display: block;">Please select the approval levels or Allow the system to auto approve the Estimate </label>

                                                                                <label class="radio-inline isc-m-t-5">
                                                                                    <div class="radio" id="Div15">
                                                                                        <span>
                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                <span class="checked">
                                                                                                    <input type="radio" name="optionsRadios" id="Radio17" value="option5" checked=""></span>

                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                    Auto Approval
                                                                                </label>


                                                                                <label class="radio-inline isc-m-t-5" value="other">
                                                                                    <div class="radio" id="Div15">
                                                                                        <span>
                                                                                            <div class="radio" id="uniform-Radio17">
                                                                                                <span>
                                                                                                    <input type="radio" name="optionsRadios" value="other" id="Radio17" value="option5" checked="">
                                                                                                </span>

                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                    Allow Multilevel Approval
                                                                                </label>



                                                                                <label class="radio-inline isc-m-t-5">
                                                                                    <div class="radio" id="Div25">
                                                                                        <span>
                                                                                            <div class="radio" id="uniform-Radio227">
                                                                                                <span class="checked">
                                                                                                    <input type="radio" name="optionsRadios" id="Radio27" value="defans" checked /></span>

                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                    Set Default Approver
                                                                                </label>




                                                                            </div>
                                                                            <div id="defAnswer1" class="isc-mar-top" style="display: block">
                                                                                <div class="isc-sec-grp">
                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="radio-list">
                                                                                            <label class="radio-inline">
                                                                                                <div class="radio" id="Div114">
                                                                                                    <div>
                                                                                                        <div class="radio" id="uniform-Radio116">
                                                                                                            <span>
                                                                                                                <input type="radio" name="optionsRadios112" id="Radio116" value="option4" checked="">
                                                                                                            </span>

                                                                                                        </div>

                                                                                                    </div>

                                                                                                </div>
                                                                                                User
                                                                                            </label>

                                                                                            <label class="radio-inline">
                                                                                                <div class="radio" id="Div115">
                                                                                                    <div>
                                                                                                        <div class="radio" id="uniform-Radio127">
                                                                                                            <span class="checked">
                                                                                                                <input type="radio" name="optionsRadios112" id="Radio117" value="option5" checked="">
                                                                                                            </span>

                                                                                                        </div>

                                                                                                    </div>

                                                                                                </div>

                                                                                                Team/Role
                                                                                            </label>

                                                                                        </div>




                                                                                        <div class="screen-row mar-top-10">
                                                                                            <div class="isc-wid-14">
                                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                    Approver 			
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="isc-cust-filt-dd-s1">
                                                                                                <select class="isc-select-dropdown select2">
                                                                                                    <option value="">Randy Kassan</option>
                                                                                                    <option value="">Jmaes Hope</option>
                                                                                                    <option value="">Inna Katayev</option>

                                                                                                </select>
                                                                                                <span>
                                                                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" href="#"><i class="fa fa-plus"></i></a></span>
                                                                                            </div>
                                                                                        </div>






                                                                                        <div class="screen-row mar-top-10">
                                                                                            <div class="isc-wid-14">
                                                                                                <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                    Team / Role		
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="isc-cust-filt-dd-s1">
                                                                                                <select class="isc-select-dropdown select2">
                                                                                                    <option value="">Approver</option>
                                                                                                    <option value="">Payer</option>

                                                                                                </select>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            <div id="otherAnswer1" class="isc-mar-top" style="display: none">
                                                                                <div class="isc-sec-grp">


                                                                                    <div class="radio-list">
                                                                                        <label class="radio-inline">
                                                                                            <div class="radio" id="Div114">
                                                                                                <div>
                                                                                                    <div class="radio" id="uniform-Radio116">
                                                                                                        <span>
                                                                                                            <input type="radio" name="optionsRadios112" id="Radio116" value="option4" checked="">
                                                                                                        </span>

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>
                                                                                            User
                                                                                        </label>

                                                                                        <label class="radio-inline">
                                                                                            <div class="radio" id="Div115">
                                                                                                <div>
                                                                                                    <div class="radio" id="uniform-Radio127">
                                                                                                        <span class="checked">
                                                                                                            <input type="radio" name="optionsRadios112" id="Radio117" value="option5" checked="">
                                                                                                        </span>

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>

                                                                                            Team/Role
                                                                                        </label>

                                                                                    </div>


                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="isc-wid-14">
                                                                                            <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                Approver 1			
                                                                                            </label>
                                                                                        </div>
                                                                                        <div class="isc-cust-filt-dd-s1">
                                                                                            <select class="isc-select-dropdown select2">
                                                                                                <option value="">James Hope</option>
                                                                                                <option value="">Randy Kassan</option>

                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="isc-wid-14">
                                                                                            <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                Approver 2			
                                                                                            </label>
                                                                                        </div>
                                                                                        <div class="isc-cust-filt-dd-s1">
                                                                                            <select class="isc-select-dropdown select2">
                                                                                                <option value="">Randy Kassan</option>
                                                                                                <option value="">Jmaes Hope</option>
                                                                                                <option value="">Inna Katayev</option>

                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="isc-wid-14">
                                                                                            <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                Approver 3			
                                                                                            </label>
                                                                                        </div>
                                                                                        <div class="isc-cust-filt-dd-s1">
                                                                                            <select class="isc-select-dropdown select2">
                                                                                                <option value="">Randy Kassan</option>
                                                                                                <option value="">Jmaes Hope</option>
                                                                                                <option value="">Inna Katayev</option>

                                                                                            </select>
                                                                                            <span>
                                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Add" href="#"><i class="fa fa-plus"></i></a></span>
                                                                                        </div>
                                                                                    </div>






                                                                                    <div class="screen-row mar-top-10">
                                                                                        <div class="isc-wid-14">
                                                                                            <label class="isc-up-bill-lbl isc-mar-btm-7 isc-m-t-5">
                                                                                                Team / Role		
                                                                                            </label>
                                                                                        </div>
                                                                                        <div class="isc-cust-filt-dd-s1">
                                                                                            <select class="isc-select-dropdown select2">
                                                                                                <option value="">Approver</option>
                                                                                                <option value="">Payer</option>

                                                                                            </select>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>




                                                                            <div id="cusAnswer1" class="isc-mar-top" style="display: none">

                                                                                <div class="items form-group">



                                                                                    <div class="isc-sec-grp">

                                                                                        <div class="isc-mar-t1">


                                                                                            <div class="screen-row">
                                                                                                <table class="isc-table-read-optimal isc-table-sorter-s1" style="width: 100%;">
                                                                                                    <thead>
                                                                                                        <tr>

                                                                                                            <th style="width: 20%;" class="header">Condition
                                                                                                            </th>
                                                                                                            <th style="width: 30%;" class="header">Approvers
                                                                                                            </th>
                                                                                                            <%--   <th style="width: 20%;" class="header">Contact
                                                        </th>--%>
                                                                                                            <th style="width: 10%;" class="header">Action
                                                                                                            </th>

                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>

                                                                                                            <td>
                                                                                                                <h2>Bill Amount < 5000 </h2>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <h2 class="">Randy Kassan, Inna Katayev
                                                                                                                </h2>
                                                                                                            </td>
                                                                                                            <%--<td>
                                                            <h2 class="">617-799-8028
                                                            </h2>
                                                        </td>--%>
                                                                                                            <td>
                                                                                                                <i class="fa fa-edit"></i>
                                                                                                                <i class="fa fa-trash-o"></i>
                                                                                                            </td>



                                                                                                        </tr>
                                                                                                        <tr>

                                                                                                            <td>
                                                                                                                <h2>Bill Amount > 5000 </h2>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <h2 class="">John Trovato, Randy Kassan, Inna Katayev
                                                                                                                </h2>
                                                                                                            </td>
                                                                                                            <%--<td>
                                                            <h2 class="">617-799-8028
                                                            </h2>
                                                        </td>--%>
                                                                                                            <td>
                                                                                                                <i class="fa fa-edit"></i>
                                                                                                                <i class="fa fa-trash-o"></i>
                                                                                                            </td>



                                                                                                        </tr>
                                                                                                        <tr>

                                                                                                            <td>
                                                                                                                <h2>Bill Amount < 5000 </h2>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <h2 class="">Randy Kassan, Inna Katayev
                                                                                                                </h2>
                                                                                                            </td>
                                                                                                            <%--<td>
                                                            <h2 class="">617-799-8028
                                                            </h2>
                                                        </td>--%>
                                                                                                            <td>
                                                                                                                <i class="fa fa-edit"></i>
                                                                                                                <i class="fa fa-trash-o"></i>
                                                                                                            </td>



                                                                                                        </tr>
                                                                                                        <tr>

                                                                                                            <td>
                                                                                                                <h2>Bill Amount < 5000 </h2>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <h2 class="">Randy Kassan, Inna Katayev
                                                                                                                </h2>
                                                                                                            </td>
                                                                                                            <%--<td>
                                                            <h2 class="">617-799-8028
                                                            </h2>
                                                        </td>--%>
                                                                                                            <td>
                                                                                                                <i class="fa fa-edit"></i>
                                                                                                                <i class="fa fa-trash-o"></i>
                                                                                                            </td>



                                                                                                        </tr>

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
                                                        </div>

                                                    </div>












                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>



                <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese isc-new-pop-up" id="app-config" tabindex="-1" role="basic" aria-hidden="false" style="display: ;">
                    <div class="modal-dialog" style="width: 580px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="screen-row">
                                    <div class="cell-left">
                                        <h4 class="modal-title">Custom Approval</h4>
                                    </div>
                                    <div class="cell-right">
                                        <a data-close-config="true"><i class="fa fa-times-circle" title="Close" style="cursor: pointer;"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body pad-20">
                                <div class="screen-row">

                                    <div class="items form-group">



                                        <div <%--class="isc-sec-grp"--%>>

                                            <div class="isc-mar-t1" <%--style="width: 820px;"--%>>


                                                <div class="screen-row">
                                                    <div class="radio-list div-col-25per">

                                                        <label class="radio-inline isc-m-t-5" style="cursor: context-menu">
                                                            Type<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>
                                                        </label>

                                                    </div>
                                                    <div class="isc-cust-filt-dd-s1">
                                                        <div class="div-col-50per">
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Custom-Type" tabindex="-1" aria-hidden="true">
                                                                    <option value="0">Choose Type</option>
                                                                    <option value="1">Bill Amount</option>
                                                                    <option value="2">Vendor</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="screen-row isc-mar-top" id="div-Condition">
                                                    <div class="radio-list div-col-25per">

                                                        <label class="radio-inline isc-m-t-5" style="cursor: context-menu">
                                                            Condition<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>
                                                        </label>

                                                    </div>
                                                    <div class="isc-cust-filt-dd-s1">
                                                        <div class="div-col-50per">
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Condition" tabindex="-1" aria-hidden="true">
                                                                    <option value="0">Choose Condition </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="screen-row isc-mar-top" id="div-Value">

                                                    <div class="radio-list div-col-25per">

                                                        <label class="radio-inline isc-m-t-5" style="cursor: context-menu">
                                                            Value ($)<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>
                                                        </label>



                                                    </div>
                                                    <div class="isc-cust-filt-dd-s1">
                                                        <div id="div-UsualAmount" style="display: none;">
                                                            <div class="div-col-50per">
                                                                <input type="text" class="form-control" id="txt-Custom-Value" placeholder="Enter Value" style="border: 1px solid #efefef !important;" />
                                                            </div>
                                                        </div>
                                                        <div id="div-Between">
                                                            <div class="div-col-20per">
                                                                <input type="text" class="form-control" id="txt-Cutom-First-Value" placeholder="Enter Value" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128" data-type="currency" style="border: 1px solid #efefef !important;" />
                                                            </div>
                                                            <div class="div-col-5per">
                                                                <label class="radio-inline isc-m-t-5" style="margin-left: 8px; margin-top: 7px; cursor: context-menu;">
                                                                    To
                                                                </label>
                                                            </div>
                                                            <div class="div-col-25per">
                                                                <input type="text" class="form-control" id="txt-Cutom-Second-Value" placeholder="Enter Value" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" maxlength="128" data-type="currency" style="border: 1px solid #efefef !important;" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="screen-row isc-mar-top" id="div-Vendor">
                                                    <div class="radio-list div-col-25per">

                                                        <label class="radio-inline isc-m-t-5" style="cursor: context-menu">
                                                            Vendor<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>
                                                        </label>

                                                    </div>
                                                    <div class="isc-cust-filt-dd-s1">
                                                        <div class="div-col-50per">
                                                            <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" id="slt-Custom-Vendor" tabindex="-1" aria-hidden="true">
                                                                    <option value="0">Choose Vendor</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="screen-row isc-mar-top" id="div-Custom-Approvers">
                                                </div>

                                                <div class="screen-row isc-mar-top">
                                                    <div class="radio-list div-col-25per">

                                                        <label class="radio-inline isc-m-t-5" style="cursor: context-menu">
                                                            Approver<sup class="isc-bill-mad-fld"><i class="fa fa-star" style="font-size: 8px !important;"></i></sup>
                                                        </label>

                                                    </div>
                                                    <div class="isc-cust-filt-dd-s1">
                                                        <div class="div-col-50per">
                                                            <div class="screen-row  isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-cus-var isc-bill-trk-wdth">

                                                                <select class="isc-select-dropdown  select2 select2-hidden-accessible" id="slt-CustomeApprover" tabindex="-1" aria-hidden="true">
                                                                    <option value="0">Choose Approver</option>

                                                                </select>
                                                                <span class="add-new-app">
                                                                    <i class="fa fa-plus" id="add-Custom-Approver" title="Add" style="cursor: pointer;"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="items1 form-group isc-mar-top">
                                            </div>

                                            <%--    <div class="pad-rig-5 " style="margin-top: 6px;">
         <div class="cell-right">
                    <a class="isc-theme-blue-btn" href="#">Save</a>
                    <a class="isc-theme-blue-btn pad-lft-12" href="#" style="background:#bdc3c7;">Cancel</a>
             </div>
                </div>--%>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <div class="cell-right pad-lft-max">
                                    <div class="isc-pop-btn-cen-cell-s1">
                                        <a class="btn blue isc-btn-pop-action-s1" id="btn-Save-Config-Approval" title="Save">Save</a>
                                        <a class="btn blue isc-btn-pop-action-s1" id="btn-Update-Config-Approval" title="Update">Update</a>
                                    </div>
                                </div>

                                <div class="cell-right">
                                    <div class="isc-pop-btn-cen-cell-s1">
                                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-close-config="true" style="background-color: #95a5a6 !important;" title="Cancel">
                                            Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.mokdmadal-dialog -->
                    </div>
                </div>


                <div class="modal fade isc-popup-detail-form-s1 in" id="mp_Config_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
                    <div class="modal-dialog" style="width: 400px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="screen-row">
                                    <div class="cell-left float-left">
                                        <h4 class="modal-title">Delete Configuration </h4>
                                    </div>
                                    <div class="cell-right">
                                        <a><i class="fa fa-times-circle" style="color: #8A8A8A; cursor: pointer;" title="Cancel" delete-config-cancel="true" aria-hidden="true"></i></a>
                                        <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  delete-cancel="true" aria-hidden="true">
                            </button>--%>
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row">

                                <div class="modal-body" style="min-height: 75px !important;">
                                    <div class="screen-row">
                                        <div class="form-body">
                                            <div class="form-group">
                                                <div class="screen-row">
                                                    <h4>Are you sure want to delete the configuration?</h4>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </div>

                            </div>
                            <div class="modal-footer">
                                <div class="isc-pop-btn-cen-cell-s1">
                                    <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-deleteconfig-ok" data-dismiss="modal">
                                        OK</button>
                                    <button type="button" class="btn default isc-btn-pop-action-s2" delete-config-cancel="true" id="close-delete">
                                        Cancel</button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.mokdmadal-dialog -->
                    </div>
                </div>


                <script>
                    $(document).ready(function () {
                        $("input[type='radio']").change(function () {
                            if ($(this).val() == "other") {
                                $("#otherAnswer").show();
                            } else {
                                $("#otherAnswer").hide();
                            }
                        });
                    });
                </script>


                <script>
                    $(document).ready(function () {
                        $("input[type='radio']").change(function () {
                            if ($(this).val() == "Custom") {
                                $("#cusAnswer").show();
                                $('#btn-Open-Config').show();
                            } else {
                                $('#btn-Open-Config').hide();
                                $("#cusAnswer").hide();
                            }
                        });
                    });
                </script>

                <script>
                    $(document).ready(function () {
                        $("input[type='radio']").change(function () {
                            if ($(this).val() == "defans") {
                                $("#defAnswer").show();
                            } else {
                                $("#defAnswer").hide();
                            }
                            if ($(this).val() == "Auto Approval") {
                                $("#ch-partialAp").hide();
                            }
                            else {
                                $("#ch-partialAp").show();
                            }


                        });
                    });
                </script>
                <script>
                    $(document).ready(function () {
                        $("input[type='radio']").change(function () {
                            if ($(this).val() == "new") {
                                $("#cusAnswer1").show();
                            } else {
                                $("#cusAnswer1").hide();
                            }
                        });
                    });
                </script>

                <script>
                    $(document).ready(function () {
                        $("input[type='radio']").change(function () {
                            if ($(this).val() == "defans") {
                                $("#defAnswer1").show();
                            } else {
                                $("#defAnswer1").hide();
                            }
                        });
                    });
                </script>

            </div>
        </div>
    </div>

    <script src="iscjsengine/PageScript/AccountsPayablePreferences.js"></script>
</asp:Content>

