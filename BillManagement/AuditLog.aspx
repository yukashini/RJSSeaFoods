<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="AuditLog.aspx.cs" Inherits="BillManagement.AuditLog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        .fa-history:before {
            content: "\f1da";
        }

        .isc-filter-container .select2-container {
         
           /* z-index: 9999 !important;*/
        }

        table.dataTable thead th, table.dataTable thead td {
           /* padding: 10px 10px !important;*/
        }

        table.dataTable thead .sorting:last-child {
            background-image: url(../../img/sorting-icons/sort_both.png);
        }

        table.dataTable thead .sorting_asc:last-child {
            background-image: url(../../img/sorting-icons/sort_asc.png);
        }

        table.dataTable thead .sorting_desc:last-child {
            background-image: url(../../img/sorting-icons/sort_desc.png);
        }
        #Daterangepicker{
            width:200px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="isc-app-main-body-layout-container">
        <div class="isc-app-screen-content-s1">

            <div class="isc-app-main-body-layout-container">
                <div class="isc-app-screen-content-s1">

                    <div class="screen-row">
                        <div class="isc-app-screen-header-container" style="height: 46px;">
                            <div class="screen-row">
                            <div class="div-col-30per">
                                <div class="screen-row">
                                    <div class="isc-page-header">
                                        <i class="fa fa-history"></i>
                                        <h2 style="line-height: 30px;">Audit Log</h2>
                                        <h6 class="mar-none"></h6>
                                    </div>
                                </div>
                            </div>
                            <div class="div-col-70per">


                                <div class="cell-right">
                                    <div class="align-right mar-top-6 pad-rig-5 isc-mb-mar-unset" >

                                        <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                                       <%-- <a class="isc-theme-blue-btn groupby-toggle-btn-cls" id="groupby-toggle-btn" title="Filter"><i class="fa fa-sitemap"></i></a>--%>
                                    </div>

                                </div>

                            </div>
                                </div>
                            
                        </div>
                        <div class="isc-app-screen-body-container" style="height: 81px;">
                            <div class="screen-row">
                                <div class="isc-app-screen-sec-container-s1 ">


                                    <div class="screen-row ">
                                        <div class="screen-row">
                                <div class="isc-filter-container isc-h-53 isc-mb-adt-sel" id="isc-filter-container" style="display: none;">
                                    <div class="screen-row">
                                        <div class="div-col-80per">
                                            <div class="cell-left  ">
                                                <select id="slt_Activity" class="form-control select2 select2-hidden-accessible isc-frm-cont-mb-res" tabindex="-1" aria-hidden="true">
                                                    <option value="0">Choose Activity</option>
                                                    <option value="Approved">Approved </option>
                                                    <option value="Bulk actions">Bulk actions</option>
                                                    <option value="Connected">Connected</option>
                                                    <option value="Created">Created</option>
                                                    <option value="Delete">Delete</option>
                                                    <option value="Disputed">Disputed</option>
                                                    <option value="Export">Export</option>
                                                    <option value="Flagged">Flagged</option>
                                                    <option value="Log-In">Log-In</option>
                                                    <option value="Log-Out">Log-Out</option>
                                                    <option value="Modified">Modified </option>
                                                    <option value="Offline Payment">Offline Payment</option>
                                                    <option value="Payment">Payment</option>
                                                     <option value="Rejected">Rejected</option>
                                                    <option value="Session Out">Session Out</option>
                                                    <option value="Submitted">Submitted</option>
                                                   
                                                    
                                                    

                                                </select>
                                            </div>
                                            <div class="cell-left pad-lft-15">
                                                <input id="txt_Description" type="text" class="form-control isc-mb-res-txt-box1 isc-frm-cont-mb-res" placeholder="Enter Description">
                                            </div>
                                            <div class="cell-left  pad-lft-15">
                                                <select id="slt_Screen" class="form-control select2 select2-hidden-accessible isc-frm-cont-mb-res" tabindex="-1" aria-hidden="true">
                                                    <option value="0">Choose Screen</option>
                                                    <option value="Accounts Payable Preference">Accounts Payable Preference</option>
                                                     <option value="Add project">Add project</option>
                                                      <option value="Approvals">Approvals </option>
                                                    <option value="Bills">Bills </option>
                                                     <option value="Category">Category</option>
                                                     <option value="Customer List">Customer List</option>
                                                     <option value="Export">Export</option>
                                                    <option value="Home Page">Home Page</option>
                                                     <option value=" Payment Methods"> Payment Methods</option>
                                                    <option value="Payment Summary">Payment Summary</option>
                                                    <option value="Payment Setup">Payment Setup</option>
                                                      <option value="Payments">Payments</option>
                                                       <option value="Project List">Project List</option>
                                                    <option value="Roles">Roles</option>
                                                    <option value="Users">Users</option>
                                                    <option value="Vendor List">Vendor List</option>
                                                </select>
                                            </div>

                                            <div class="cell-left pad-lft-15">
                                                <input type="text" class="form-control isc-mb-res-txt-box1 isc-frm-cont-mb-res" id="Daterangepicker" placeholder="Choose date" value="04/01/2001 - 05/01/2022 ">
                                            </div>

                                            <div class="cell-left pad-lft-15 ">
                                                <select id="slt_User" class="form-control select2 select2-hidden-accessible isc-frm-cont-mb-res" tabindex="-1" aria-hidden="true">
                                                    <option value="0">Choose User</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="div-col-20per">
                                           <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="Btn_serch">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset" id="btn_Reset">
                            <a><i class="fa fa-times" ></i> Reset</a>
                        </div>

                                            <div class="isc-filter-container-close" id="isc-filter-container-close">
                                                <a><i class="fa fa-times" title="Close"></i></a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                                    </div>

                                    <div class="screen-row">
                                        <div class="isc-filter-container isc-h-53 isc-groupby-container isc-h-53" id="isc-groupby-container" style="display: none;">
                                            <div class="cell-left ">
                                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>Screen</option>
                                                    <option>Users	
                                                    </option>
                                                    <option>Role	
                                                    </option>
                                                    <option>Vendor
                                                    </option>
                                                    <option>Organization Setup
                                                    </option>
                                                    <option>Payment Method
                                                    </option>

                                                </select> </div>
                                            <div class="cell-left pad-lft-15 ">
                                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>User</option>
                                                    <option>John
		
                                                    </option>
                                                    <option>Peter
		
                                                    </option>
                                                    <option>Jack
		
                                                    </option>
                                                    <option>Daniel
		
                                                    </option>
                                                    <option>Benny
		
                                                    </option>

                                                </select>  </div>

                                            <div class="cell-left  pad-lft-15">
                                                <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                    <option>Activity</option>
                                                    <option>Updated BIS Organization Info		
                                                    </option>
                                                    <option>Added a new Business Unit in BTS		
                                                    </option>
                                                    <option>Delected Location in BTN	
                                                    </option>
                                                    <option>Added a new Designation in BTS
                                                    </option>
                                                    <option>Updated BTS'S Permission
                                                    </option>

                                                </select> </div>


                                            <div class="cell-left pad-lft-15">

                                                <input type="text" class="form-control isc-mb-res-txt-box" id="dapicker" placeholder="MM/DD/YYYY">
                                            </div>

                                            <div class="isc-filter-search isc-groupby-search isc-go  mar-lft-10" title="Search">
                                                <a title="Search"><i class="fa fa-search"></i></a>
                                            </div>
                                            <div class=" isc-filter-search isc-groupby-search isc-reset " title="Reset">
                                                <a><i class="fa fa-refresh"></i></a>
                                            </div>


                                            <div class="isc-filter-search isc-groupby-container-close isc-mar-lft-10-mb-res" id="isc-groupby-container-close">
                                                <a><i class="fa fa-times"></i></a>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="screen-row isc-mb-res-tab-scr <%--isc-tab-src-cont-res--%>">
                                        <table id="tbl_auditlog" class="isc-table-read-optimal">
                                            <thead>
                                                <tr style="cursor: pointer;">
                                                    <th title="Timestamp" style="width: 20%;" class="header">TimeStamp</th>
                                                    <th title="Activity" style="width: 15%;" class="header">Activity</th>
                                                    <th title="Description" style="width: 25%;" class="header">Description</th>
                                                    <th title="Screen" style="width: 15%;" class="header">Screen</th>
                                                    <th title="User" style="width: 15%;" class="header">User</th>
                                                    <th title="System IP" style="width: 15%;" class="header">System IP</th>
                                                </tr>
                                            </thead>
                                            <tbody class="">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                <script>
                    $('#groupby-toggle-btn,#isc-groupby-container-close').click(function () {
                        $('#isc-groupby-container').toggle();
                    });
                    $('#groupby-toggle-btn1,#isc-groupby-container-close1').click(function () {
                        $('#isc-groupby-container1').toggle();
                    });
                </script>
                <script>
                    $(document).ready(function () {
                        RegisterDatepicker();
                        //$('#dapicker').datepicker();
                    });

                    var FilterStartDate = '01/01/2000';
                    var FilterEndDate = '01/01/2025';
                    var RegisterDatepicker = function () {
                        FilterStartDate = '01/01/2000';
                        FilterEndDate = '01/01/2025';
                        $('#Daterangepicker').daterangepicker({
                            startDate: moment(FilterStartDate),
                            endDate: moment(FilterEndDate),
                            ranges: {
                                'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                                'Today': [moment(), moment()],
                                'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],


                            }
                        }, SetSwapDateRange);
                        SetSwapDateRange(moment(FilterStartDate), moment(FilterEndDate));
                        $('#Daterangepicker').on('apply.daterangepicker', function (ev, picker) {
                            FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
                            FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
                        });
                    }
                    function SetSwapDateRange(start, end) {
                        if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                            && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                        ) {
                            $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> Any Date');
                        }
                        else {
                            $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
                        }

                    }
                </script>

            </div>



        </div>

    </div>
    <script>
        $(function () {
            $(".isc-notify-sec").on("click", function (e) {

                $('.isc-notifi-drpdwn').toggleClass('isc-notifi-drpdwn-show')
                e.stopPropagation()
            })

            $(document).on("click", function (e) {
                if ($(e.target).is(".isc-notifi-drpdwn") === false) {
                    $(".isc-notifi-drpdwn").removeClass("isc-notifi-drpdwn-show");
                }
            });

        })

    </script>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            Metronic.init();
            Layout.init();
            ISCUtility.MenuState();
            //            ComponentsDropdowns.init();
        });
    </script>
    <%--<script type="text/javascript">
       
        $(document).ready(function () {
            AdjustScreenBodyHeight();
            
        });
        $(window).resize(function () {
            AdjustScreenBodyHeight();
        });
        var AdjustScreenBodyHeight = function () {
            var $windowHeight = $(window).innerHeight();
            var $menuHeight = $('.isc-app-main-top-layout-container').innerHeight();
            var $screenHeaderHeight = $('.isc-app-screen-header-container').innerHeight();
            var $screenFooterHeight = $('.slds-context-footer-bar').innerHeight();
            var screenBodyPadding = 0; // Screen Body Padding
            var $screenBody = $('.isc-app-screen-body-container');
            $screenBody.css('height', (parseInt($windowHeight) - (parseInt($menuHeight) + parseInt($screenHeaderHeight) + parseInt(screenBodyPadding) + parseInt($screenFooterHeight))) + 'px');
        }
        $(document).on('click', '[menu-parent]', function (e) {
            //e.preventDefault();
            e.stopPropagation();
            var MenuID = parseInt($(this).attr('menu-parent'));
            $('[menu-child]').not('[menu-child="' + MenuID + '"]').hide();
            $('[menu-child="' + MenuID + '"]').toggle();
        });
        $(document).on('click', '#Toggle_Switch', function (e) {
            e.preventDefault();
            var SwitchType = $(this).attr('data-switch');
            if (SwitchType == 'false') {
                $(this).attr('data-switch', true);
                $(this).html('<img src="images/VTS_Logo.png" title="Vendor Team Service" />');
                $(this).removeClass('isc-toggle-button-clr-s2').addClass('isc-toggle-button-clr-s1');
            }
            else {
                $(this).attr('data-switch', false);
                $(this).html('<img src="images/INNOSPIR_Logo.png" title="INNOSPIRE" />');

                $(this).removeClass('isc-toggle-button-clr-s1').addClass('isc-toggle-button-clr-s2');
            }
        });

    </script>--%>

    <script src="iscjsengine/PageScript/AuditLog.js"></script>
</asp:Content>
