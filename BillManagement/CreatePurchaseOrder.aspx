<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="CreatePurchaseOrder.aspx.cs" Inherits="BillManagement.CreatePurchaseOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #mp_Delivery .select2-container {
            width: 80% !important;
        }
        .modal .blue.btn {
            color: #000 !important;
        }
        .isc-w-200 {
            width: 140px !important;
        }
        #mp_paid3 .isc-hor-details .isc-detail-name input {
            width: 500px;
        }
        #mp_paid3 .select2-container {
            width: 230px !important;
        }
        .isc-33per {
            width: 33%;
            float: left;
        }
        .isc-tail-h1-p1 {
            color: #000;
            margin-bottom: 5px;
        }
        .isc-set-img-width {
            margin-right: 20px;
        }
        .isc-entity-sm-title {
            color: #000 !important;
        }
        .isc-temp-cont {
            border: 1px solid #ddd;
        }
        .isc-temp-bdy-cont {
            padding: 15px;
            border: unset !important;
        }
        .isc-temp-head-cont {
            padding: 15px;
            height: 89px;
        }
        .split-amount {
            position: fixed;
            top: 40px;
            right: 0;
            background-color: #fff;
            z-index: 9999999;
            display: none;
            box-shadow: 1px 4px 4px 0px #00000040;
            background-color: #fff !important;
        }
        .slider {
            position: unset !important;
        }
            .slider .split-amount .form-control {
                width: 230px;
            }
            .slider .split-amount .form-control {
                width: 230px;
            }
        .split-amount .isc-bill-trk-lst-cont {
            border: unset !important;
        }
        .slider .split-amount .isc-bill-trk-wdth .select2-container {
            width: 92% !important;
        }
        .isc-pad-all {
            padding: 15px;
        }
        .tags-container {
            line-height: unset !important;
            border: unset !important;
            min-height: unset !important;
            margin-bottom: unset !important;
            position: unset !important;
        }
        .tag {
            position: relative;
            margin: 2px 6px 2px 0;
            padding: 1px 20px 1px 8px;
            font-size: inherit;
            font-weight: 400;
            text-align: center;
            color: #fff;
            background-color: #1589ee;
            border-radius: 3px;
            transition: background-color 0.3s ease;
            cursor: default;
        }
        .tag__name {
            margin-right: 3px;
        }
        .tag__remove {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 20px;
            height: 100%;
            padding: 0 5px;
            font-size: 16px;
            font-weight: 400;
            transition: opacity 0.3s ease;
            opacity: 0.5;
            cursor: pointer;
            border: 0;
            background-color: transparent;
            color: #fff;
            line-height: 1;
        }
        .isc-set-bdr input {
            display: none;
        }
        .tags-container {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 15px;
            min-height: 34px;
            padding: 2px 5px;
            font-size: 14px;
            line-height: 1.6;
            background-color: transparent;
            border: 1px solid #dadada;
            border-radius: 1px;
            overflow: hidden;
            word-wrap: break-word;
        }
        .tags-container {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 15px;
            min-height: 34px;
            padding: 2px 5px;
            font-size: 14px;
            line-height: 1.6;
            background-color: transparent;
            border: 1px solid #dadada;
            border-radius: 1px;
            overflow: hidden;
            word-wrap: break-word;
        }
        .isc-txt-box-wid {
            width: 100% !important;
        }
        .isc-set-bdr td {
            border: unset;
            padding: 2px;
            display: flex;
            border-radius: 4px !important;
        }
        .isc-45per {
            width: 44%;
            float: left;
        }
        isc-pad-lft {
            padding-left: 15px;
        }
        .isc-acc-box-inner-txt p {
            padding-left: 0px;
            margin: 0px;
            white-space: pre-wrap;
        }
        .isc-lft-hdr p {
            font-size: 14px;
            font-weight: 400;
        }
        .modal-content {
            border: unset;
        }
        .isc-55per {
            width: 55.9%;
            float: left;
        }
        .isc-set-bdr {
            border: 1px solid #dadada;
        }
        .isc-h-53 {
            height: 53px;
        }
        .form-control {
            /*width:200px !important;*/
            font-size: 13px !important;
        }
        .fa-remove::before, .fa-close::before, .fa-times::before {
            content: "";
        }
        .isc-tb1-icon-img {
            width: 15px;
            margin-top: -2px;
        }
        .isc-set-wid-img img {
            height: 30px;
            width: 35px;
            margin-top: -6px;
        }
        ::placeholder {
            color: #000 !important;
        }
        .isc-h-53 {
            height: 53px !important;
        }
        .isc-table-read-optimal i {
            position: unset;
        }
        .isc-cls-set-bdr-input input {
            border-top-right-radius: 0px !important;
            border-right: none !important;
            border-bottom-right-radius: 0px !important;
        }
        .isc-filter-details-span select {
            border-top-left-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
        }
        .cls {
            background-color: aqua !IMPORTANT;
            width: 100% !important;
            text-align: right;
            background-image: linear-gradient(to right, #2e85bb 10%, #00a1b7) !important;
        }
            .cls h3 {
                margin: 0;
                padding: 0;
                text-align: left;
                position: absolute;
                font-size: 16px;
                color: #fff;
                margin-top: 7px;
                margin-left: 10px;
                font-weight: 400;
            }
        i.close-settings {
            cursor: pointer;
        }
        .close-settings {
            padding-right: 16px !important;
            padding: 9px;
            color: #fff;
        }
        .settings {
            position: fixed;
            top: 40px;
            right: 0;
            background-color: #fff;
            z-index: 9;
            display: none;
            box-shadow: 1px 4px 4px 0px #00000040;
            background-color: #fff !important;
        }
        .split-amount.split-amount-show {
            display: block;
        }
        .settings.settings-show {
            display: block;
        }
        .isc-com-title-txt-s4 {
            margin: 0px 0px 0px 0px;
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            line-height: 20px;
            padding-left: unset !important;
        }
        .isc-quantity-btn {
            padding: 0px;
            margin: 0px;
        }
            .isc-quantity-btn li {
                list-style: none;
                float: left;
                width: 40px;
                text-align: center;
                height: 40px;
                line-height: 40px;
                border: 1px solid #dadada;
            }
        .modal .isc-table-read-optimal tbody td input {
            width: 25px;
            height: 20px;
            border: unset;
        }
        .isc-table-read-optimal {
    width: 93%;
    table-layout: fixed;
}
        .modal .isc-detail-name select {
            width: 200px;
        }
        i.close-amount {
            cursor: pointer;
        }
        .close-amount {
            padding-right: 16px !important;
            padding: 9px;
            color: #fff;
        }
        /* .modal  .isc-detail-name {
    float: left;
}*/
        .isc-mar-lft {
            margin-left: 7px;
        }
        .isc-nested-list-dd-s2 {
            width: 130px !important;
        }
        .btn-act {
            background-color: #1589ee !important;
        }
            .btn-act i {
                color: #fff !important;
            }
        .select2-container {
            z-index: 9 !important;
        }
        .isc-detail-name textarea {
            width: 615px;
        }
        .isc-50 {
            width: 50%;
            float: left;
        }
        .isc-sign-pad-con-s1 {
            background-color: #F7F7F7;
            padding: 10px 10px;
            border-radius: 4px !important;
            min-height: 160px;
            position: relative;
            margin-left: 22%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .mar-top-50 {
            margin-top: 70px !important;
        }
        .isc-text-center {
            text-align: center;
        }
        .isc-bill-add {
            width: 90%;
            padding: 10px;
            background-color: #f9f9f9;
            color: #fff;
        }
        .isc-set-bdr-rght {
            border-top-right-radius: 0px !important;
            border-right: none !important;
            border-bottom-right-radius: 0px !important;
        }
        .isc-bill-cont .isc-filter-details-span {
            border-top-left-radius: unset;
            border-bottom-left-radius: unset;
        }
        .isc-40per .isc-table-read-optimal tbody td select {
            width: 66px;
        }
        .isc-set-cle-black {
            color: #000;
        }
        .isc-w-60 {
            width: 60px !important;
        }
        .isc-set-pos-a-edit-i {
            text-align: center;
            position: absolute;
            top: 19%;
            background-color: #ffffff;
            line-height: 32px;
            margin-left: 0px;
            height: 30px;
            color: #000;
            width: 34px;
        }
        .isc-table-read-optimal tbody td select {
            width: 88px;
        }
        .isc-table-read-optimal tbody td input {
            width: 70px;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 45px;
            height: 20px;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 45px;
            height: 20px;
        }
        .slider1.round {
            border-radius: 34px !important;
        }
        .slider1 {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            margin: 0px;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
        }
        .slider1.round:before {
                border-radius: 50%;
            }
        .slider1:before {
                position: absolute;
                content: "";
                height: 12px;
                width: 12px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
            }
        div.checker input {
            width: unset;
            height: unset;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .switch input:checked + .slider1 {
                background-color: #13a840;
            }
        .isc-led-det-labl-txt {
            font-size: 14px;
            line-height: 25px;
            font-weight: 400;
            color: #514f4f;
            width: 200px;
            cursor: unset !important;
            overflow: hidden;
        }
        .isc-item-title-cont-p1 {
            margin: 0;
            padding: 10px 0px;
            color: #000;
            font-weight: 600;
            font-size: 15px;
        }
        .select2-container {
            width: 270px !important;
        }
        .form-control {
            width: 270px;
        }
        .form-control1{
            width: 400px;
            height: 170px;
        }
        .div-col-37per .isc-bill-trk-lst-cont {
            border: unset !important;
        }
        .tab1-sec {
            padding: 0px 50px;
        }
        .isc-w-270 {
            width: 270px !important;
        }
        .isc-theme-gray-btn {
            margin-left: 5px !important;
        }
        .isc-thm-hme-kpi-hdr-t1 {
            margin: 0px 0px 5px 0px;
            padding: 0px 0px 0px 0px;
            color: #525252;
            line-height: 25px;
            font-weight: 600;
            font-size: 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .isc-wrap-item h4 {
            margin-bottom: 5px;
            color: #5d5d5d;
            font-weight: 400;
            font-size: 14px;
            padding-left: 5px;
            padding-top: 5px;
        }
        .isc-amt-f {
            font-size: 21px;
        }
        .isc-amt-f {
            line-height: unset;
            color: #0a0a0a;
            margin: 0px;
        }
        h3.isc-lbl-tile-header-shedule-survy.isc-f-w {
            font-weight: 600;
            
        }
        .isc-sav-btn {
            background-color: #13a840 !important;
        }
        .isc-input-slt {
            float: left;
            border-top-left-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
            border-left: unset !important;
        }
        .isc-input-txt {
            float: left;
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px !important
        }
        .isc-40per {
            width: 40%;
            float: left;
        }
        input[type=date]::-webkit-calendar-picker-indicator {
            cursor: pointer !important;
        }
        #coll_22 .isc-bill-trk-wdth .select2-container {
            width: 270px !important;
        }
        .collapsed i.fa.fa-angle-right {
            transform: rotate(90deg);
        }
        .isc-page-header i img {
            width: 20px;
            margin-top: -3px;
        }
        select, option {
            cursor: pointer;
        }
        .div-col-60per .select2-container {
            z-index: 9 !important;
        }
        td .select2-container {
            z-index: 9 !important;
        }
        .select2-container {
            z-index: 99999 !important;
        }
        .fixed-popup-p3 .modal-body {
            height: calc(100vh - 122px) !important;
        }
        .fixed-popup-p3 .modal-content {
            max-height: unset !important;
            overflow-y: auto;
            height: calc(100vh - 54px) !important;
        }
        label.isc-f-w-600 {
            font-weight: 600;
        }
        .isc-50per {
            width: 50%;
            float: left;
        }
        i.fa.fa-trash-o {
            margin-top: 6px;
        }
    </style>
    <style>
        .isc-bill-trk-viw-del-sel .select2-container {
            width: 100% !important;
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
            display: none;
        }
        .isc-org-logo-area:hover .isc-btn-inp-typ-file-s1 {
            display: block;
        }
        .isc-app-screen-sec-container-s1 {
            padding: 0px !important;
        }
        .isc-g-b {
            padding-top: 18px !important;
            padding-bottom: 8px !important;
            left: 30px;
            width: 1240px;
            position: relative;
            margin: auto -32px;
            float: left;
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
                <div class="div-col-38per">
                    <div class="screen-row">
                        <div class="isc-page-header">
                            <i>
                                <img src="images/dollar_invoice.png"/></i>
                           
                            <h2><span id="spn_newinvoice" style="display: none">New Invoice</span> </h2>
                            <h2><span id="spn_updateinvoice" style="display: none">Update Invoice</span> </h2>
                            <h6 style="display:none" class="mar-none mar-top-5" id="spn-heder"># :
                                <span id="head_invoice"></span>|Date:<span id="head_date"></span>
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="div-col-42per isc-set-fs-13"> 
                    <div class="cell-right " style="margin-top: 9px;">
                        <a class="isc-theme-blue-btn isc-cnl-btn" href="#" id="btn_cancel">Cancel</a>

                    </div>
                    <div class="cell-right">
                        <div class="align-right mar-top-3 pad-rig-5 " style="margin-top: 4px;">
                            <a class="isc-theme-gray-btn filter-toggle-btn-cls isc-panel-settings" title="Settings"><i class="fa fa-cog"></i></a>
                        </div>
                    </div>
                    <div class="cell-right open" style="margin-top: 9px">
                        <span style="position: relative; display: none" class="isc-sec-lvl-cust-dd-s1" id="spn_Save">
                            <a class="isc-theme-blue-btn isc-sav-btn" style="margin-right: 3px;" data-toggle="dropdown">Save <i class="fa fa-angle-down"></i></a>
                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                <li title="Save as Draft" class=""><a data-toggle="modal" href="#" id="SaveInvoice">Save as Draft</a>
                                </li>
                                <%--<li title="Save and Email" class=""><a href="#" id="SaveSendMail">Save and Email</a>
                                </li>--%>
                            </ul>
                        </span>

                        <span style="position: relative; display: none;" class="isc-sec-lvl-cust-dd-s1" id="spn_update">
                            <a class="isc-theme-blue-btn isc-sav-btn" style="margin-right: 3px;" data-toggle="dropdown">Update <i class="fa fa-angle-down"></i></a>
                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                <li title="Update as Draft" class=""><a data-toggle="modal" href="#" id="UpdateInvoice">Update as Draft</a>
                                </li>
                               <%-- <li title="Update and Email" class=""><a href="#" id="Updatesend">Update and Email</a>
                                </li>--%>
                            </ul>
                        </span>
                    </div>
                    <div class="cell-right open">
                         <div class="align-right mar-top-3 pad-rig-5" style="margin-top: 4px; color:black">
                              <a class="isc-lbl-tile-header-shedule-survy isc-f-w isc-amt-f" >USD <span id="spn-netamount"></span></a>
                         </div>
                     </div>
                </div>
            </div>
            <div class="isc-app-screen-body-container" style="height: 173px;">
                 <div class="div-col-100per">
                <div class="screen-row">
                    <div class=" isc-pad-all">                     
                        <div class="tab1-sec">
                                <div class="screen-row">
                                    <h5 class="isc-item-title-cont-p1 isc-color-p1">General Info</h5>
                                    <div class="screen-row">
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">DCI No :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                       <input type="text" placeholder="Enter DCI No." class="form-control" id="txt-DCINo"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Confrimation Date :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                     <input type="date" class="form-control" id="txt-ConfrDate" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Shipper :<sup class="isc-bill-mad-fld"></sup> </label>
                                                </div>
                                                <div class="div-col-40per">
                                                  <%-- <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">--%>
                                                    <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="slt-Shipper">
                                                        <option>Choose Shipper </option>
                                                    </select>
                                                
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Consignee :<sup class="isc-bill-mad-fld"></sup> </label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true" id="slt-Consignee">
                                                        <option>Choose Consignee </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="screen-row">
                                          
                                          <div class="div-col-50per">
                                              <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Sales Contract :</label>
                                                </div>

                                                <div class="div-col-60per">
                                                    <input type="date" class="form-control" id="txt-SalesContract" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                          <div class="div-col-50per">
                                              <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Dual Signed :</label>
                                                </div>

                                                <div class="div-col-60per">
                                                    <input type="date" class="form-control" id="txt-DualSigned" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                          <div class="div-col-50per">
                                              <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">LOG Received Date :</label>
                                                </div>

                                                <div class="div-col-60per">
                                                    <input type="date" class="form-control" id="txt-LOGRecDate" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">MPEDA Reg No :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" placeholder="Enter Pre-Carriage by" class="form-control" id="txt-MPEDARegNo"/>
                                                </div>
                                            </div>
                                        </div>
                                          </div>
                                    <div class="screen-row">
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Invoice Number : </label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <input type="text" class="form-control" id="txt-invoice" placeholder="Enter Invoice Number"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                              <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Invoice Date :</label>
                                                </div>

                                                <div class="div-col-60per">
                                                    <input type="date" class="form-control" id="txt-invoicedate" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="screen-row">
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Buyers Order No. :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                       <input type="text" placeholder="Enter Buyers Order No." class="form-control" id="txt-buyerorder"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Buyers Order Date :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                     <input type="date" class="form-control" id="txt-buyerdate" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <div class="screen-row" style="">
                                        
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Port of Loading :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <select class="select2 select2-hidden-accessible" id="slt-Loading1" tabindex="-1" aria-hidden="true">
                                                        <option value="0">Choose Port of Loading</option>
                                                        <option value="5">Cancel</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Port of Discharge :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <select class="select2 select2-hidden-accessible" id="slt-Discharge1" tabindex="-1" aria-hidden="true">
                                                        <option value="0">Choose Port of Discharge</option>
                                                        <option value="5">Cancel</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">
                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Final Destination :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                    <select class="select2 select2-hidden-accessible" id="slt-Destination" tabindex="-1" aria-hidden="true">
                                                        <option value="0">Choose Final Destination</option>
                                                        <option value="5">Cancel</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div-col-50per">
                                            <div class="screen-row mar-top-10">

                                                <div class="div-col-25per">
                                                    <label class="mar-top-5">Shipment Date :</label>
                                                </div>
                                                <div class="div-col-60per">
                                                     <input type="date" class="form-control" id="txt-shipperdate" placeholder="MM/DD/YYYY"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            <div class="screen-row">
                                <table class="isc-table-read-optimal mar-top-10" id="tbl_productlst">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%;">Product</th>
                                            <th style="width: 6%;">Size</th>
                                            <th style="width: 8%;">No Of Cartons</th>
                                            <th style="width: 7%;">Price Per unit</th>
                                            <th style="width: 10%;">Requested Quantity</th>
                                            <th style="width: 5%;">Amount</th>
                                            <th style="width: 5%; cursor: default;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbl-body">
                                       
                                    </tbody>
                                </table>
                            </div>
                            <div class="screen-row">
                                <h5 class="isc-item-title-cont-p1 isc-color-p1">  Address</h5>  
                                <%-- <h3 class="isc-bill-trk-hdr-txt mar-top-30 isc-new-thm-pad isc-g-b isc-mbl-mar-top-10">--%>
                            <%--</h3>--%>
                            
                        <div class="screen-row">
                                <div class="div-col-50per">
                                     <div class="div-col-25per">
                                                            <label class="mar-top-5">Shipper Address <sup class="isc-bill-trk-sup"><i style="font-size: 7px;"></i></sup>:  </label>
                                                        </div>
                                   <div class="div-col-25per">
                                                         <textarea  id="BillingAdd" rows="4" class="form-control" style="resize:none;" readonly></textarea>
                                                        
                                   </div>
                                </div>
                                <div class="div-col-50per">
                                     <div class="div-col-25per">
                                                            <label class="mar-top-5">Buyer Address <sup class="isc-bill-trk-sup"><i  style="font-size: 7px;"></i></sup>:  </label>
                                                        </div>
                                   <div class="div-col-25per">
                                                            <textarea  id="BillingAdd1" rows="4" class="form-control" style="resize:none;" readonly></textarea>
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
     
    <script>
        (function () {

            'use strict';

            // Helpers
            function $$(selectors, context) {
                return (typeof selectors === 'string') ? (context || document).querySelectorAll(selectors) : [selectors];
            }
            function $(selector, context) {
                return (typeof selector === 'string') ? (context || document).querySelector(selector) : selector;
            }
            function create(tag, attr) {
                var element = document.createElement(tag);
                if (attr) {
                    for (var name in attr) {
                        if (element[name] !== undefined) {
                            element[name] = attr[name];
                        }
                    }
                }
                return element;
            }
            function whichTransitionEnd() {
                var root = document.documentElement;
                var transitions = {
                    'transition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'mozTransitionEnd',
                    'OTransition': 'oTransitionEnd otransitionend'
                };

                for (var t in transitions) {
                    if (root.style[t] !== undefined) {
                        return transitions[t];
                    }
                }
                return false;
            }
            function oneListener(el, type, fn, capture) {
                capture = capture || false;
                el.addEventListener(type, function handler(e) {
                    fn.call(this, e);
                    el.removeEventListener(e.type, handler, capture)
                }, capture);
            }
            function hasClass(cls, el) {
                return new RegExp('(^|\\s+)' + cls + '(\\s+|$)').test(el.className);
            }
            function addClass(cls, el) {
                if (!hasClass(cls, el))
                    return el.className += (el.className === '') ? cls : ' ' + cls;
            }
            function removeClass(cls, el) {
                el.className = el.className.replace(new RegExp('(^|\\s+)' + cls + '(\\s+|$)'), '');
            }
            function toggleClass(cls, el) {
                (!hasClass(cls, el)) ? addClass(cls, el) : removeClass(cls, el);
            }

            function Tags(tag) {

                var el = $(tag);

                if (el.instance) return;
                el.instance = this;

                var type = el.type;
                var transitionEnd = whichTransitionEnd();

                var tagsArray = [];
                var KEYS = {
                    ENTER: 13,
                    COMMA: 188,
                    BACK: 8
                };
                var isPressed = false;

                var timer;
                var wrap;
                var field;

                function init() {

                    // create and add wrapper
                    wrap = create('div', {
                        'className': 'tags-container',
                    });
                    field = create('input', {
                        'type': 'text',
                        'className': 'tag-input',
                        'placeholder': el.placeholder || ''
                    });

                    wrap.appendChild(field);

                    if (el.value.trim() !== '') {
                        hasTags();
                    }

                    el.type = 'hidden';
                    el.parentNode.insertBefore(wrap, el.nextSibling);

                    wrap.addEventListener('click', btnRemove, false);
                    wrap.addEventListener('keydown', keyHandler, false);
                    wrap.addEventListener('keyup', backHandler, false);
                }

                function hasTags() {
                    var arr = el.value.trim().split(',');
                    arr.forEach(function (item) {
                        item = item.trim();
                        if (~tagsArray.indexOf(item)) {
                            return;
                        }
                        var tag = createTag(item);
                        tagsArray.push(item);
                        wrap.insertBefore(tag, field);
                    });
                }

                function createTag(name) {
                    var tag = create('div', {
                        'className': 'tag',
                        'innerHTML': '<span class="tag__name">' + name + '</span>' +
                            '<button class="tag__remove">&times;</button>'
                    });
                    //       var tagName = create('span', {
                    //         'className': 'tag__name',
                    //         'textContent': name
                    //       });
                    //       var delBtn = create('button', {
                    //         'className': 'tag__remove',
                    //         'innerHTML': '&times;'
                    //       });

                    //       tag.appendChild(tagName);
                    //       tag.appendChild(delBtn);
                    return tag;
                }

                function btnRemove(e) {
                    e.preventDefault();
                    if (e.target.className === 'tag__remove') {
                        var tag = e.target.parentNode;
                        var name = $('.tag__name', tag);
                        wrap.removeChild(tag);
                        tagsArray.splice(tagsArray.indexOf(name.textContent), 1);
                        el.value = tagsArray.join(',')
                    }
                    field.focus();
                }

                function keyHandler(e) {

                    if (e.target.tagName === 'INPUT' && e.target.className === 'tag-input') {

                        var target = e.target;
                        var code = e.which || e.keyCode;

                        if (field.previousSibling && code !== KEYS.BACK) {
                            removeClass('tag--marked', field.previousSibling);
                        }

                        var name = target.value.trim();

                        // if(code === KEYS.ENTER || code === KEYS.COMMA) {
                        if (code === KEYS.ENTER) {

                            target.blur();

                            addTag(name);

                            if (timer) clearTimeout(timer);
                            timer = setTimeout(function () { target.focus(); }, 10);
                        }
                        else if (code === KEYS.BACK) {
                            if (e.target.value === '' && !isPressed) {
                                isPressed = true;
                                removeTag();
                            }
                        }
                    }
                }
                function backHandler(e) {
                    isPressed = false;
                }

                function addTag(name) {
                    // delete comma if comma exists
                    name = name.toString().replace(/,/g, '').trim();
                    if (name === '') return field.value = '';
                    if (~tagsArray.indexOf(name)) {
                        var exist = $$('.tag', wrap);
                        Array.prototype.forEach.call(exist, function (tag) {
                            if (tag.firstChild.textContent === name) {
                                addClass('tag--exists', tag);
                                if (transitionEnd) {
                                    oneListener(tag, transitionEnd, function () {
                                        removeClass('tag--exists', tag);
                                    });
                                } else {
                                    removeClass('tag--exists', tag);
                                }
                            }
                        });
                        return field.value = '';
                    }

                    var tag = createTag(name);
                    wrap.insertBefore(tag, field);
                    tagsArray.push(name);
                    field.value = '';
                    el.value += (el.value === '') ? name : ',' + name;
                }

                function removeTag() {
                    if (tagsArray.length === 0) return;

                    var tags = $$('.tag', wrap);
                    var tag = tags[tags.length - 1];

                    if (!hasClass('tag--marked', tag)) {
                        addClass('tag--marked', tag);
                        return;
                    }

                    tagsArray.pop();

                    wrap.removeChild(tag);

                    el.value = tagsArray.join(',');
                }

                init();

                /* Public API */

                this.getTags = function () {
                    return tagsArray;
                }

                this.clearTags = function () {
                    if (!el.instance) return;
                    tagsArray.length = 0;
                    el.value = '';
                    wrap.innerHTML = '';
                    wrap.appendChild(field);
                }

                this.addTags = function (name) {
                    if (!el.instance) return;
                    if (Array.isArray(name)) {
                        for (var i = 0, len = name.length; i < len; i++) {
                            addTag(name[i])
                        }
                    } else {
                        addTag(name);
                    }
                    return tagsArray;
                }

                this.destroy = function () {
                    if (!el.instance) return;

                    wrap.removeEventListener('click', btnRemove, false);
                    wrap.removeEventListener('keydown', keyHandler, false);
                    wrap.removeEventListener('keyup', keyHandler, false);

                    wrap.parentNode.removeChild(wrap);

                    tagsArray = null;
                    timer = null;
                    wrap = null;
                    field = null;
                    transitionEnd = null;

                    delete el.instance;
                    el.type = type;
                }
            }

            window.Tags = Tags;

        })();

            // Use

    </script>
    <script>
        $(document).ready(function () {


            $("#tab2-btn").click(function () {
                $(".tab1-sec").hide();
                $(".tab2-sec").show();
                $("#tab1-btn").removeClass("btn-act");
                $("#tab2-btn").addClass("btn-act");

            })
            $("#tab1-btn").click(function () {
                $(".tab1-sec").show();
                $(".tab2-sec").hide();
                $("#tab1-btn").addClass("btn-act");
                $("#tab2-btn").removeClass("btn-act");
            })
        })
    </script>
    <script>
        $(document).ready(function () {
            $(".close-amount").click(function () {
                $(".split-amount").removeClass("split-amount-show");
            });
            $(".close-settings").click(function () {
                $(".settings").removeClass("settings-show");
            });
        })
    </script>
    <script>
        $(document).ready(function () {
            $(".isc-split").click(function () {
                $(".split-amount").toggleClass("split-amount-show");
                $(".split-amount").parents(".slider").find(".settings-show").removeClass("settings-show");
            })
            $(".isc-panel-settings").click(function () {
                $(".settings").toggleClass("settings-show");
                $(".settings").parents(".slider").find(".split-amount-show").removeClass("split-amount-show");
            })
        })
    </script>
    <script src="iscjsengine/PageScript/CreatePurchaseOrder.js"></script>
</asp:Content>
