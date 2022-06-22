 <%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="ProjectList.aspx.cs" Inherits="BillManagement.ProjectList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
       
        /*.select2-container--default .select2-selection--single {
       border-radius:unset !important;
       height:27px;
            }
        .select2-selection__arrow{
            top:-1px !important;
        }
        .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height:25px;
        }*/
        td.isc-status-active h5{
                color: green;
        }
        td.isc-status-inactive h5{
             color: #DE756C !important;
        }
        .fs-label-wrap{
            cursor:pointer !important;
        }
        .modal {
            overflow-x:hidden !important;
        }
     /*    table.dataTable thead th, table.dataTable thead td {
    padding: 9px 7px !important;
    border-bottom: 1px solid #DCDDDD !important;
   }*/
     .div-col-52per{
         width:52% !important;
         float:left;
     }
        #Mp_New_Project .modal-body {
            height: calc(100vh - 109px);
        }
        .fs-option, .fs-search, .fs-optgroup-label {
    padding: 9px 8px;
    border-bottom: 0px solid #eee;
}
        .fs-search input {
    border: 1px solid #dadada !important;
    box-shadow: none !important;
    outline: none;
    padding: 6px 5px;
    border-radius: 4px !important;
    margin: 10px 0;
    width: 100%;
}
        .fs-search {
    padding: 0 8px !important;
}
        .fs-wrap.multiple .fs-option:hover {
        background-color: #00a1df;
        }
        .fs-option-label:hover {
    color: #fff !important;
}
        </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="screen-row">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 style="line-height: 30px;"> Project List</h2>
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
                 <div class="cell-right pad-rig-5 " style="margin-top:6px;">
                       <a title="Add Project" href="AddProject.aspx" class="isc-theme-blue-btn" id="addProject" style="display:none"><i class="fa fa-plus"></i></a>
                 
                </div>
                <%--<div class="cell-right pad-rig-5">
              <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 " data-toggle="dropdown">Action<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                                <li class=""><a title="Import" data-toggle="modal" href="#mp_paid">Import</a></li>
                                                <li><a title="Export" href="#" >Export</a>
                                                </li>
                                                
                                              
                                            </ul>
                                        </li>
                                    </ul>
                    </div>
                  <div class="cell-right pad-rig-5 " style="margin-top:6px;"> 
                      <a class="isc-theme-blue-btn" href="AddCustomer.aspx">Add Customer </a>
                </div>--%>
            </div>
                </div>
            
        </div>
        <div class="isc-app-screen-body-container">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="screen-row ">
                            <div class="isc-filter-container " id="isc-filter-container" >
                                <div class="screen-row">
                                    <div class="div-col-80per">
                                 <div class="cell-left pad-lft-15 ">
                            <select class="form-control fselect" multiple="multiple" style="cursor:pointer!important" tabindex="-1" id="slt-ProjectName" aria-hidden="true">
                            </select>
                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <select class="form-control fselect" multiple="multiple"  style="cursor:pointer!important" id="slt-CustomerName" tabindex="-1" aria-hidden="true">

                            </select>
                        </div>
                        <div class="cell-left  pad-lft-15">
                            <select class="form-control fselect" multiple="multiple"  style="cursor:pointer!important" tabindex="-1" id="slt-ProjectType" aria-hidden="true">
                            </select>
                        </div>
                        <div class="cell-left pad-lft-15 ">
                            <%--<select class="form-control select2 select2-hidden-accessible"  tabindex="-1" id="slt-Status" aria-hidden="true">--%>
                                <select class="form-control select2 select2-hidden-accessible"   style="cursor:pointer!important;" tabindex="-1" id="slt-Status" aria-hidden="true">
                                <option>Choose Status</option>
                               

                            </select></div>
                                        </div>
                                    <div class="div-col-20per">
                        <div class="cell-left">
                        <div class="isc-filter-search isc-go  mar-lft-10" id="Btn_serch" title="Search">
                            <a title="Search"><i class="fa fa-search" ></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" id="btn_Reset" title="Reset">
                            <a><i class="fa fa-times"  ></i> Reset</a>
                        </div>
</div>
                        <div class="isc-filter-container-close" title="Close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                                        </div>
                                    </div>
                    </div>
                    </div>
                        
                        <div class="screen-row isc-lst-scrl-cont">
                            <table class="isc-table-read-optimal " id="tbl-Projects">
                                                <thead>
                                                    <tr>
                                                        <%--<th style="width:2%;">
                                                       
                                                           <input type="checkbox" />
                                                       
                                                        </th>--%>
                                                        <th style="width: 20%;"  title="Project Name">Project Name
                                                        </th>
                                                      <%--  <th style="width: 23%;" class="header">Address
                                                        </th>
                                                        <th style="width: 20%;" class="header">Email
                                                        </th>--%>
                                                        <th style="width: 13.5%;" title="Customer Name">Customer Name
                                                        </th>
                                                         <th style="width: 13.5%;" title="Project Type">Project Type
                                                        </th>
                                                         <th style="width: 13.5%;" title="Status">Status
                                                        </th>
                                                         <th style="width: 10%;" title="Action">Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                  <%--  <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>Canary</h5>
                                                        </td>
                                                     
                                                        <td>
                                                            <h5>Acme Corporation</h5>
                                                        </td>
                                                         <td>
                                                            <h5>Office Solutions</h5>
                                                        </td>
                                                        <td class="isc-status-active">
                                                            <h5>Active</h5>
                                                        </td>
                                                               
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="AddProject.aspx"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>Mercury</h5>
                                                        </td>
                                                     
                                                        <td>
                                                            <h5>Globex Solutions</h5>
                                                        </td>
                                                         <td>
                                                            <h5>Project Management</h5>
                                                        </td>
                                                        <td class="isc-status-active">
                                                            <h5>Active</h5>
                                                        </td>
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="AddProject.aspx"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>Westerners</h5>
                                                        </td>
                                                     
                                                        <td>
                                                            <h5>Soylent Corp </h5>
                                                        </td>
                                                         <td>
                                                            <h5>Financial Tool</h5>
                                                        </td>
                                                        <td class="isc-status-inactive">
                                                            <h5>Inactive</h5>
                                                        </td>
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View"href="AddProject.aspx"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>Yaeger</h5>
                                                        </td>
                                                     
                                                        <td>
                                                            <h5>Soylent Corp </h5>
                                                        </td>
                                                         <td>
                                                            <h5>Financial Tool</h5>
                                                        </td>
                                                        <td class="isc-status-inactive">
                                                            <h5>Inactive</h5>
                                                        </td>
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View"href="AddProject.aspx"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                       <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>Rhinestone</h5>
                                                        </td>
                                                     
                                                        <td>
                                                            <h5>Acme Corporation</h5>
                                                        </td>
                                                         <td>
                                                            <h5>Financial Tool</h5>
                                                        </td>
                                                     <td class="isc-status-active">
                                                            <h5>Active</h5>
                                                        </td>
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="AddProject.aspx"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>Sputnik</h5>
                                                        </td>
                                                     
                                                        <td>
                                                            <h5>Massive Dynamic  </h5>
                                                        </td>
                                                         <td>
                                                            <h5>Financial Tool</h5>
                                                        </td>
                                                       <td class="isc-status-active">
                                                            <h5>Active</h5>
                                                        </td>
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="AddProject.aspx"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>--%>
                                                </tbody>
                                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="modal fade isc-popup-detail-form-s1 Mp_Relese" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" style="display:none;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Vendor Import</h4>
                        </div>
                        <div class="cell-right">
                            <button type="button" class="close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="screen-row">

                    <div class="modal-body" style="min-height:200px;text-align:center;">
                        <div class="screen-row " style="margin-top:6px;">
                                                     <a href="#" class="cell-right isc-mar-btm-10">Vendor-Template.xlsx</a>

                                                    </div>
                        <div class="screen-row " style="margin-top:20px;">
                                    <p class="isc-attach-file">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i> Drop Files to Attach</p>
                               </div>
                        <div class="screen-row " style="margin-top:20px;">
                                                        <span class="isc-btn-inp-typ-file-s1">Browse

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                        </span>

                            <label class="isc-fil-lbl mar-lft-10">File Name : image1.jpg</label>
                                                    </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <div class="isc-pop-btn-cen-cell-s1">
                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                            Upload</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal">
                            Cancel</button>
                    </div>
                </div> 
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
        </div>
      <div class="modal fade isc-popup-detail-form-s1 in" id="mp_Customer_Delete" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left float-left">
                            <h4 class="modal-title">Delete Project </h4>
                        </div>
                        <div class="cell-right">
                            <a><i class="fa fa-times" style="color:#8A8A8A;cursor:pointer;" title="Cancel"  delete-cancel="true" aria-hidden="true"></i></a>
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
                                        <h4>Are you sure want to delete the project?</h4>

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
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese isc-new-pop-up" id="Mp_New_Project" data-backdrop="static" role="basic" aria-hidden="false" style="display:none ;">
        <div class="modal-dialog" style="width: 765px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">New Project</h4>
                        </div>
                        <div class="cell-right">
                            <a cancel-add-vendor-pop="true" title="Close" style="cursor: pointer"><i class="fa fa-times-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                      <div class="screen-row ">
                                <div class="screen-row">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Project Name<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-52per">
                                                            <input type="text" placeholder="Enter Project Name" data-textbox="ProjectName" id="projName" class="form-control <%--isc-exp-mang-txt-bx1--%>">
                                    <span style="color:red;display:none;" class="validation-message" id="ProjectName-Validation" data-validation="ProjectName">Project Name should not be empty</span>                                                      
                                    </div>
                                </div>
                            <div class="screen-row mar-top-10">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Customer Name<sup class="isc-bill-trk-sup"><i class="fa fa-star" style="font-size: 7px;"></i></sup> : </label>
                                                        </div>
                                    <div class="div-col-65per">
                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Customers" data-Select="CustomerName"  >
                                                    <option>Choose Customer Name</option>
                                                   
                                                </select>
                                              <span style="color:red;display:none;" class="validation-message" id="CustomerName-Validation" data-validation="CustomerName">Customer Name should not be empty</span>                                                      
                                            </div>
                                                        </div>
                                </div>
                                <div class="screen-row mar-top-10">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Project Description : </label>
                                                        </div>
                                    <div class="div-col-52per" >
                                                         <textarea placeholder="Enter Project Description" id="projDesc" rows="4" class="form-control" style="resize:none;"></textarea>
                                                        </div>
                                </div>
                                <div class="screen-row mar-top-10">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Project Type : </label>
                                                        </div>
                                    <div class="div-col-65per">
                                                         <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-ProjectType">
                                                    <option>Choose Project Type</option>
                                                </select>
                                            </div>
                                                        </div>
                                </div>
                          <div class="screen-row mar-top-10">
                                    <div class="div-col-35per">
                                                            <label class="mar-top-5">Status</label>
                                                        </div>
                                    <div class="div-col-65per">
                                                              <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bil-trk-sel isc-bill-trk-viw-del-sel">
                                                <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1"
                                                    aria-hidden="true" id="slt-Status"  data-Select="Status">
                                                    <option>Choose Status</option>
                                                     
                                                </select>
                                                                  <span style="color:red;display:none;" class="validation-message" id="Status-Validation" data-validation="Status">Status should not be empty</span>                                                      
                                            </div> </div>
                                </div>
                            </div>
                        
                </div>
                <div class="modal-footer">
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" style="background-color: #fff !important;border:1px solid #efefef;color:#000 !important;" cancel-add-vendor-pop="true">
                                Cancel</button>
                        </div>
                    </div>
                    <div class="cell-right ">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" id="btn-Save-New-Vendor">
                                ADD</button>
                        </div>
                    </div>
                    
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <script>
        //$(document).ready(function () {
        //    $('.fselect').fSelect();
        //});

        $('#filter-toggle-btn,#isc-filter-container-close').click(function () {
            $('#isc-filter-container').toggle();
        });
        $('#filter-toggle-btn1,#isc-filter-container-close1').click(function () {
            $('#isc-filter-container1').toggle();
        });

    </script>
    <script src="iscjsengine/PageScript/ProjectsList.js"></script>
</asp:Content>

