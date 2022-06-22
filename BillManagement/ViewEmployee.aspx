<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ViewEmployee.aspx.cs" Inherits="BillManagement.ViewEmployee" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        @media only screen and (max-width: 767px) {
          .isc-vnd-edit-foot-cont  .div-col-95per {
                width: 75%;
            }
        }
         .isc-app-screen-body-container
        {
            width:100%;
            overflow-x:hidden;
        }
        .isc-vnd-edt-acc {
            margin: 0px;
            font-size: 16px;
            line-height: 31px;
            font-weight: 400;
            color: #000;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

            .isc-vnd-edt-acc span {
                margin-left: 5px;
            }

            .isc-vnd-edt-acc a {
                cursor: context-menu;
            }

        .is-lable-overlow label {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .isc-btn-inp-typ-file-s1:hover{
                /*background-color: orange;*/
                color:#fff;
        }
        table.dataTable thead th, table.dataTable thead td {
    padding: 10px 10px;
    border-bottom: 1px solid #DCDDDD;
}
          .isc-new-pop-up .modal-body {
            height: calc(100vh - 146px);
        }
          .isc-vnd-msg-btn{
              top:0px ;
          }
          .isc-btn-inp-typ-file-s1{
              font-size:13px !important;
          }
          #mp_add-contact .modal-body {
    height: calc(100vh - 109px);
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
                                <h2 style="line-height: 30px;">Employee Edit</h2>
                                <h6 class="mar-none"></h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isc-app-screen-body-container" >
                    <div class="screen-row">
                        <div class="isc-app-screen-sec-container-s1 ">
                            <div class="isc-ven-edit-cont1">
                                <div class="screen-row">
                                    <div class="div-col-50per">
                                        <div class="isc-page-header">
                                            <div class="div-col-10per">
                                                <img id="Employee-Logo" style="width: 60px !important" class="isc-bill-ven-logo">
                                            </div>
                                            <div class="div-col-60per">
                                                <h2 style="display: inline-block;" class="isc-mb-dots"><span id="lbl_Empname"></span></h2>
                                                <%--<h1 class="mar-none">Health Products</h1>--%>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="screen-row mar-top-15">
                                    <div class="div-col-20per isc-pad-lft-65">
                                        <label>Email</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-envelope-o" style="margin-right:5px;"></i><span id="email"></span></a></h4>
                                    </div>
                                    <div class="div-col-15per">
                                        <label>Phone</label>
                                        <h4 class="isc-vnd-edt-acc"><a href="#"><i class="fa fa-phone" style="margin-right:5px;"></i><span id="lbl_Phoneno"></span></a></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="screen-row mar-top-10">
                                <div class="isc-screen-nav-container-s1">
                                    <ul class="nav nav-tabs" style="position: relative;">
                                        <li class=""><a href="#Tab5" data-toggle="tab">Details</a> </li>
                                    </ul>

                                    <div class="tab-content">
                                          <div class="tab-pane fade" id="Tab5">
                                            <div class="isc-bill-inr-cont1 mar-top-10">
                                                <div class="screen-row mar-top-10">
                                                    <div class="screen-row">
                                                        <div class="cell-right pad-rig-5 " style="margin-top: 6px;">

                                                            <a class="isc-theme-blue-btn" id="btn_edit">Edit Employee</a>
                                                        </div>
                                                    </div>

                                                    <h5 class="isc-bill-trk-hdr-txt mar-top-30 isc-g-b" style="margin-top: 0px; cursor: context-menu !important;">Customer Info : </h5>
                                                    <div class="is-lable-overlow isc-mb-res-pay-det-popup">
                                                        <div class="screen-row mar-top-10">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Employee First Name : </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empname"></label>

                                                                </div>

                                                            </div>

                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Employee Gender: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empgender"></label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Email: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empemail">Credit Card</label>
                                                                </div>
                                                            </div>

                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Contact Number: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empphone"></label>

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Employee Address: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empaddress"></label>
                                                                </div>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">City: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empcity"></label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="screen-row mar-top-10 isc-mb-mar-unset">
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">State: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_state"></label>

                                                                </div>
                                                            </div>
                                                            <div class="div-col-50per">
                                                                <div class="div-col-30per isc-mb-wdt-50">
                                                                    <label class="mar-top-5">Zip: </label>
                                                                </div>
                                                                <div class="div-col-55per">
                                                                    <label class="mar-top-5" id="lbl_empzip"></label>

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
    <script src="iscjsengine/PageScript/EmployeeView.js"></script>
</asp:Content>
