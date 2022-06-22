<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="Employee.aspx.cs" Inherits="BillManagement.Employee" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .isc-popup-detail-form-s1 .modal-title {
    color: #fff !important;
}
        h2.isc-scr-sec-hdr-s1 {
            cursor: default;
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
                        <i class="fa fa-users"></i>
                        <h2 style="line-height: 30px;">Employee List</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
           
               
              <div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:3px;">
                   
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>

                </div>
                <div class="cell-right pad-rig-5">
              <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a style="margin-top:5px;" title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 " data-toggle="dropdown">Action<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                                <li>
                                                     <a  title="Add Employee" class="" href="AddEmployee.aspx">Add Employee</a>
                                                </li>
                                                <li class=""><a  title="Import" data-toggle="modal" href="#mp_paid">Import</a></li>
                                               
                                                                                          
                                            </ul>
                                        </li>
                                    </ul>
                    </div>
                  <div class="cell-right pad-rig-5 " style="margin-top:9px;"> 
                     
                </div>
            </div>
        </div>
   <div class="isc-app-screen-body-container" style="height: 285px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row ">
                            <div class="isc-filter-container" id="isc-filter-container" style="display: none;">


                       <div class="cell-left  ">
                           <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control isc-frm-cont-mb-res" id="txt-EmployeeCode" placeholder="Enter Employee Code"/>

                        </div>
                          </div>

                             


                 <%--               <div class="cell-left pad-lft-15">
              <input type="text" class="form-control" id="Daterangepicker" placeholder="Due On" value="Due On">
                    </div>--%>
                        
                                <div class="cell-left  pad-lft-15">
                          <input type="text" class="form-control" placeholder="Enter Balance" id="txt-balance">
                          </div>
                         
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " placeholder="Total Amount Received" id="txt-totalamount"/>
                        </div>
                        
                        <div class="isc-filter-search isc-go  mar-lft-10" title="Search" id="btn_search">
                            <a title="Search"><i class="fa fa-search"></i> Search</a>
                        </div>

                        <div class="isc-filter-search isc-reset" title="Reset" id="btn_reset">
                            <a><i class="fa fa-times"></i> Reset</a>
                        </div>
                        <div class="isc-filter-container-close" title="Close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    </div>
                 <div class="screen-row">
                        <div class="screen-row mar-bot-med">
                            <div class="div-col-33per ">
                               <div class="isc-scr-sec-grp-container-s1">
                                        <div class="isc-scr-sec-grp-hdr-container-s1">
                                            <div class="cell-left">
                                               <h2 class="isc-scr-sec-hdr-s1">Total Employees</h2>
                                            </div>
                                            <div class="cell-right"><a class="isc-apr-hm-kpi-btn" id="all-total-Count">24</a>
                                            </div>
                                        </div>
                                        <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                            <div class="screen-row">
                                                <div class="isc-grp-sec-ent-cell-s1">

                                                    <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                      <h5 ><span id="All-Employee-count"></span></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                            <div class="div-col-33per pad-lft-12">
                                <div class="isc-scr-sec-grp-container-s1">
                                    <div class="isc-scr-sec-grp-hdr-container-s1">
                                        <div class="cell-left">
                                            <h2 class="isc-scr-sec-hdr-s1">Active Employees</h2>
                                        </div>
                                        <div class="cell-right">
                                            <a class="isc-apr-hm-kpi-btn" style="background-color: #ED5263;" id="active-Count">0</a>
                                        </div>

                                    </div>
                                    <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                        <div class="screen-row">
                                            <div class="isc-grp-sec-ent-cell-s1">

                                                <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                    <h5 ><span id="active"></span></h5>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-col-33per pad-lft-12">
                                <div class="isc-scr-sec-grp-container-s1">
                                    <div class="isc-scr-sec-grp-hdr-container-s1">
                                        <div class="cell-left">
                                            <h2 class="isc-scr-sec-hdr-s1">In-Active Employees</h2>
                                        </div>
                                        <div class="cell-right">
                                            <a class="isc-apr-hm-kpi-btn" style="background-color: #F8AA56;" id="inactive-Count">0</a>
                                        </div>
                                    </div>
                                    <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                        <div class="screen-row">
                                            <div class="isc-grp-sec-ent-cell-s1">

                                                <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">

                                                    <h5 ><span id="In-active"></span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="div-col-25per pad-lft-12">
                                <div class="isc-scr-sec-grp-container-s1">
                                    <div class="isc-scr-sec-grp-hdr-container-s1">
                                        <div class="cell-left">
                                            <h2 class="isc-scr-sec-hdr-s1">Employee Terminated</h2>
                                        </div>
                                        <div class="cell-right">
                                            <a class="isc-apr-hm-kpi-btn" style="background-color: #14B191;" id="released-Count">67</a>
                                        </div>
                                    </div>
                                    <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                        <div class="screen-row">
                                            <div class="isc-grp-sec-ent-cell-s1">
                                                <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                    <h5 ><span id="released-Amount"></span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>--%>


                        </div>
                        
                        <div class="screen-row">
                            <table class="isc-table-read-optimal " id="Tbl_Employee">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th style="width: 11%;" class="header">Employee Code
                                                        </th>
                                                      
                                                        <th style="width: 13.5%;" class="header">Employee First Name
                                                        </th>
                                                       <%--  <th style="width: 12.5%;text-align:center;" class="header headerSortDown">Designation
                                                        </th>--%>
                                                         <th style="width: 13.5%;text-align:center;" class="header">Email
                                                        </th>
                                                         <th style="width: 15.5%;text-align:center;" class="header">Address
                                                        </th>     
                                                         <th style="width: 13.5%;" class="header">Contact No
                                                        </th>
                                                         <th style="width: 10%;text-align:center;cursor:default;" class="header">Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="modal fade isc-popup-detail-form-s1 Mp_Relese in" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" style="">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Employee Import</h4>
                        </div>
                        <div class="cell-right">
                           <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close cell-right " title="Close" id="btn_close"></i></a>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:200px;text-align:center;">
                        <div class="screen-row " style="margin-top:6px;">
                                                     <a href="#" class="cell-right isc-mar-btm-10" style="color:blue !important;"></a>

                                                    </div>
                        <div class="screen-row " style="margin-top:20px;">
                                    <p class="isc-attach-file">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i> Drop Files to Attach</p>
                               </div>
                        <div class="screen-row " style="margin-top:20px;">
                                     <span class="isc-btn-inp-typ-file-s1" style="font-size: 13px;">Browse

                                                   

                                                                    <input type="file" name="filename" style="width: 200px;" id="browse-customer" title="Add File"/>
                                                                    </span>

                            <label class="isc-fil-lbl mar-lft-10" id="lbl_filename">File Name : <span id="spn_filename"> </span></label>
                                                    </div>
                        <div class="screen-row mar-top-28 isc-set-scroll-tbl">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 isc-ddp-hdn-lst isc-ctm-pop-up">
                        <thead>
                            <tr>

                                <th style="width: 33%; cursor:context-menu" title="Customer Name" class=" ">Employee Name 
                                </th>
                                <th style="width: 33%; cursor:context-menu" title="Address" class="">Address 
                                </th>

                                <th style="width: 33%; cursor:context-menu" title="Email" class="">Email
                                </th>

                               

                            </tr>
                        </thead>
                        <tbody id="tbl_Emplst">
                            
                            
                            
                        </tbody>
                    </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" title="Upload" id="btn-Save-ExcelData" data-dismiss="modal">
                            Upload</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" title="Cancel" data-dismiss="modal" id="btn-cancel">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
        </div>

      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_Employee_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Employee Delete</h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#fff; cursor:pointer;" title="Cancel"   delete-cancel="true" aria-hidden="true"></i></a>
                            <%--<button type="button" hide-pop-up="true" class="close img-typ-sq" title="Cancel"  delete-cancel="true" aria-hidden="true">
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
                                        <h4>Are you sure want to delete the customer?</h4>

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
                        <button type="button" class="btn default isc-btn-pop-action-s2" delete-cancel="true"  id="close-delete" >
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
    <script src="iscjsengine/Employee.js"></script>
</asp:Content>
 