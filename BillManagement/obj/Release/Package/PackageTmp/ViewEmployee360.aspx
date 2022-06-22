<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ViewEmployee360.aspx.cs" Inherits="BillManagement.ViewEmployee360" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .scrtabs-tab-scroll-arrow {
            display: none !important;
        }

        .scrtabs-tabs-fixed-container {
            width: 1304px !important;
        }

        .scrtabs-tabs-movable-container {
            left: unset !important;
            width: unset !important;
        }

        .isc-ven-edit-cont1 .div-col-20per {
            width: 37.8% !important;
        }

        .isc-vnd-msg-btn {
           
            top: 0px !important;
        }
    </style>

    <style>
        .jodit-wysiwyg {
            max-height: 245px;
        }

        .isc-entity-sm-title {
            display: block;
        }

        .mar-top-50 {
            margin-top: 110px !important;
        }
        #MP_Batch .isc-popup-detail-form-s1 .modal-body{
            min-height:unset;
            max-height:unset;
        }
     #MP_Batch .modal-body {
            height:calc(100vh - 50px) !important;
        }
       .isc-popup-detail-form-s1 .modal-body{
            min-height:unset !important;
            max-height:unset !important;
        }
     #MP_Email .modal-body {
            height:calc(100vh - 50px) !important;
        }
    
        
        .isc-set-wid-img img {
            height: 30px;
            width: 35px;
            margin-top: -6px;
        }

        .div-col-14per {
            float: left;
            width: 14%;
        }

        .isc-rgt-opt label {
            font-size: 14px;
            font-weight: 600;
        }

        .isc-invoice-temp1 .isc-thm-hme-kpi-t2 {
            font-size: 26px;
            line-height: 26px;
        }

        .isc-activity-feed {
            padding: 15px;
            list-style: none;
        }

            .isc-activity-feed .isc-feed-item {
                position: relative;
                padding-bottom: 20px;
                padding-left: 30px;
                border-left: 2px solid #e4e8eb;
                font-size: 14px;
            }

                .isc-activity-feed .isc-feed-item::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 13px !important;
                    height: 13px !important;
                    border-radius: 100px;
                    background: #fff;
                    border: 2px solid #fcb95b;
                }

        .mar-btm-10 {
            margin-bottom: 10px;
        }

        .isc-activity-feed .isc-feed-item .date {
            display: block;
            position: relative;
            top: 0px;
            color: #8c96a3;
            text-transform: uppercase;
            font-size: 10px;
            float: right;
            padding-left: 10px;
        }

        .isc-activity-feed .isc-feed-item .text {
            position: relative;
            top: -3px;
        }

        .text {
            outline: none;
        }

        .isc-color-p2 {
            color: #13a840;
        }

        .isc-color-p5 {
            color: #ff6c6c !important;
        }

        .isc-color-p3 {
            color: #909393 !important;
        }
        .isc-sec-lvl-cust-dd-s1 {
            float: right;
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
            display: block;
            border: 1px solid #dadada;
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
            /*width: 200px !important;*/
            font-size: 13px !important;
        }

        .fa-remove::before, .fa-close::before, .fa-times::before {
            content: "";
        }

        .isc-tb1-icon-img {
            width: 15px;
            margin-top: -2px;
        }

        ::placeholder {
            color: #000 !important;
        }

        .isc-h-53 {
            height: 53px !important;
        }

        .isc-groupby-container {
            padding: 10px;
            border: 1px solid #ecf0f1;
            width: 100%;
            / margin: 5px;
            / position: relative;
            display: none;
            margin-bottom: 10px;
        }

        .isc-groupby-search:hover {
            background-color: Orange;
        }

        .isc-groupby-search {
            display: inline-block;
            background: #2980b9;
            color: #fff;
            border-radius: 3px !important;
            padding: 4px 8px;
            cursor: pointer;
            margin-top: 3px;
        }

            .isc-groupby-search i {
                color: #fff;
            }

        .isc-groupby-container-close {
            position: absolute;
            top: 5px;
            right: 5px;
        }

            .isc-groupby-container-close a {
                background-color: #dcdcdc;
                cursor: pointer;
                padding: 2px 5px;
                border-radius: 50% !important;
            }

                .isc-groupby-container-close a i {
                    font-weight: 400;
                    font-size: 12px;
                    color: #8a8a8a;
                }

        .mar-lft-10 {
            margin-left: 10px !important;
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

        .settings {
            position: fixed;
            top: 40px;
            right: 0;
            background-color: #fff;
            z-index: 9999999;
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

        .isc-bill-trk-lst-cont.isc-cus-var {
            border: none !important;
            padding-top: 30px;
        }

        .isc-cus-var1 {
            padding-top: 30px;
        }

        .isc-dec-table {
            display: none;
        }

        .isc-crt-bill-add.isc-cus-add {
            font-size: 20px;
            line-height: 31px;
            color: #5d5d5d;
            margin-left: 0px;
            float: left;
            position: absolute;
            margin-left: 10px;
            cursor: pointer;
        }

        .close-amount {
            padding-right: 16px !important;
            padding: 9px;
            color: #fff;
        }

        i.close-amount {
            cursor: pointer;
        }

        .close-settings {
            padding-right: 16px !important;
            padding: 9px;
            color: #fff;
        }

        i.close-settings {
            cursor: pointer;
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

        .auto-height {
            height: calc(100vh - 55px);
        }

        .isc-btn-inp-typ-file-s1 {
            background-color: #1589ee !important;
            font-size: 13px;
            color: #fff !important;
        }
       a.isc-bdg-grd-sts-s2.isc-bdg-col-c1:hover {
    color: #000;
}
       span#spn_email {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-left: 10px;
    margin-top: -8px;
}
            span#spn_phone {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-left: 10px;
    margin-top: -8px;
}
       .isc-vnd-edt-acc a{
           display: inline-flex;
       }
       .isc-bill-trk-hdr-txt {
    cursor: default !important;
}
       .isc-new-pop-up .modal-body {
    height: calc(100vh - 151px);
    overflow-y: auto;
}
       .isc-approved-color {
    color: #1589ee !important;
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
                                <i class="fa fa-pencil"></i>
                                <h2 style="line-height: 30px;">View Employee</h2>
                                <h6 class="mar-none"></h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isc-app-screen-body-container" style="height: 28px;">
                    <div class="screen-row">
                        <div class="isc-app-screen-sec-container-s1 ">
                            <div class="isc-ven-edit-cont1">
                                <div class="screen-row">
                                    <div class="div-col-50per">
                                        <div class="isc-page-header">
                                            <div class="div-col-60per">
                                                <h2 style="display: inline-block;"><span id="spn_Employee"></span></h2>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="screen-row mar-top-15">
                                    <div class="div-col-20per" style="padding-left: 65px;">
                                        <label>Email</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-envelope-o"></i> <span id="spn_email"></span></a></h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label>Phone</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-phone"></i> <span id="spn_phone"></span></a></h4>
                                    </div>    
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="isc-screen-nav-container-s1">
                                    <ul class="nav nav-tabs" style="position: relative;">
                                        <li class="" id="tab-details"><a href="#Tab5" data-toggle="tab">Details</a> </li>
                                    </ul>

                                    <div class="tab-content">
                                     <div class="tab-pane fade in " id="Tab4">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row">
                                                    <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                        <a class="isc-theme-blue-btn" id="btn_Addconect">Add Contact</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade in " id="Tab5">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row mar-top-10">
                                                    <div class="screen-row">
                                                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                            <a id="btn-editEmployee" class="isc-theme-blue-btn" href="#">Edit Employee</a>
                                                        </div>
                                                    </div>

                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b" style="margin-top: 0px;">Employee Info : </h5>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Employee Name : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_name"></label>

                                                            </div>
                                                        </div>

                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Contact Number: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_phone"></label>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Gender: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_Gender"></label>

                                                            </div>


                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Designation </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_Designation"></label>

                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div class="screen-row mar-top-10">

                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Email: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_email"></label>

                                                            </div>
                                                        </div>

                                                        

                                                    </div>
                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b">Address : </h5>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Employee Address: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_address"></label>

                                                            </div>
                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">City: </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_city"></label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">State : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_state"></label>

                                                            </div>
                                                        </div>
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Country : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_country"></label>

                                                            </div>
                                                        </div>

                                                    </div>



                                                    <div class="screen-row mar-top-10">
                                                        <div class="div-col-50per">
                                                            <div class="div-col-30per">
                                                                <label class="mar-top-5">Zip : </label>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <label class="mar-top-5" id="lbl_zip"></label>

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade in " id="Tab6">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row">
                                                    <div class="cell-right pad-rig-5 " style="margin-top: 6px;">
                                                        <span class="isc-btn-inp-typ-file-s1 cell-right">Add Document

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;" id="add-Documents" title="Add Document" />
                                                        </span>
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
   
    
    <script>
        $('#isc-layout-s1').click(function () {
            $("#exp-lst-view").show();
            $("#exp-kab-view").hide();
            $(".filter-toggle-btn-cls").hide();
        })
        $('#isc-layout-s2').click(function () {
            $("#exp-kab-view").show();
            $("#exp-lst-view").hide();
            $(".filter-toggle-btn-cls").show();
        })
        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });
    </script>

    <script>
        $('#groupby-toggle-btn,#isc-groupby-container-close').click(function () {
            $('#isc-groupby-container').toggle();
        });
        $('#groupby-toggle-btn1,#isc-groupby-container-close1').click(function () {
            $('#isc-groupby-container1').toggle();
        });
    </script>
    
    <script>
        var editor = new Jodit('#editor', {
            "uploader": {
                "insertImageAsBase64URI": true
            }
        });
    </script>
    
    <script src="iscjsengine/PageScript/ViewEmployee360.js"></script>
</asp:Content>
