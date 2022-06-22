<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="EmployeeList.aspx.cs" Inherits="BillManagement.EmployeeList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    
    <style>     
        @media only screen and (max-width: 767px) {
            .notifyjs-corner {
                font-size: 8px !important;
               
            }
        }
    .isc-attach-file {
    text-align: center;
    border: 1px solid #dadada;
    border-style: dashed;
    padding: 10px;
    font-size: 14px;
}
    .isc-mar-btm-10
    {
      margin-bottom:10px;
    }
      .pad-rig-10{
          padding-right: 10px;
      }
      table.dataTable thead th, table.dataTable thead td {
    padding: 9px 7px !important;
    border-bottom: 1px solid #DCDDDD !important;
   }
      .isc-btn-inp-typ-file-s1{
          font-size:12px !important;
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
                        <i class="fa fa-users"></i>
                        <h2 style="line-height: 30px;"> Customer List</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
           
               
              <div class="cell-right">
                 <div class="align-right  pad-rig-5 ">
                   
                    <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
                </div>

                </div>
            <%--    <div class="cell-right pad-rig-5">
              <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 " data-toggle="dropdown">Action<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                                <li class=""><a title="Import" data-toggle="modal" href="#mp_paid">Import</a></li>
                                                <li><a title="Export" href="#" >Export</a>
                                                </li>
                                                
                                              
                                            </ul>
                                        </li>
                                    </ul>
                    </div>--%>

                  <div class="cell-right pad-rig-5">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:9px;">
                   <a class="" id="download-Sample-template" title="Export"> <i class="fa fa-download" style="cursor:pointer; font-size:22px;" aria-hidden="true"></i></a>
             
                        </div>

                   

                </div>
                

                <div class="cell-right  pad-rig-10">
                            <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn  isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 <%--isc-theme-blue-btn--%>" data-toggle="dropdown" style="border-radius:4px !important">Actions<i class="fa fa-angle-down"></i></a>
                                            <ul class="isc-nested-list-dd-s2 " role="menu">
                                                <li>
                                                   <a title="Pay Offline" data-toggle="modal" href="AddCustomer.aspx">Add Customer</a>
                                                </li>
                                                  <li>
                                                   <a title="Dispute next to offline" data-toggle="modal" href="#mp_paid">Import</a>
                                                </li>
                                                                                              
                                            </ul>
                                        </li>
                                    </ul>
                        </div>
              
            </div>
                </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 287px;">



            <div class="screen-row ">
                            <div class="isc-filter-container" id="isc-filter-container" >
                                <div class="screen-row">
                                    <div class="div-col-80per">
                        <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " id="txt-CustomerName" placeholder="Customer Name"/>

                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " id="txt-Expenses" placeholder="Expenses"/>

                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " id="txt-AssociatedProject" placeholder="Associated Project"/>

                        </div>
                                 <div class="cell-left pad-lft-15 ">
                            <input type="text" class="form-control " id="txt-AssociatedBills" placeholder="Associated Bills"/>

                        </div>
                       </div>
                        <div class="div-col-20per">
                         <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Search"><i class="fa fa-search"></i> Search</a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset">
                            <a><i class="fa fa-refresh"></i> Reset</a>
                        </div>
                        <div class="isc-filter-container-close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                            </div>
                                    </div>
                    </div>
                        </div>
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                    <div class="screen-row">
                        <div class="screen-row mar-bot-med">
                                    
                                    <div class="div-col-25per ">
                                        <div class="isc-scr-sec-grp-container-s1 ">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Total Receivable </h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn">34</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$61,500 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due this week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn">8<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
                                                                 </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">Overdue </h2>
                                                    </div>
                                                <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#ED5263;"> 12</a>
                                                </div>
                                               
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$9,750 </h5>
                                                             <div class="screen-row">
                                                                 <div class="cell-left">     
                                                            <h4>New Bills</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr3">8<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">No Of Customers</h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#F8AA56;">23</a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$15,500 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due This Week</h4></div>
                                                            <div class="cell-right">
                                                                 <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr4">44<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
                                                               
                                                            </div>
</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div-col-25per pad-lft-12">
                                        <div class="isc-scr-sec-grp-container-s1">
                                            <div class="isc-scr-sec-grp-hdr-container-s1">
                                                <div class="cell-left">
                                                <h2 class="isc-scr-sec-hdr-s1">No Of Projects </h2>
                                                    </div>
                                               <div class="cell-right">
                                                    <a class="isc-apr-hm-kpi-btn" style="background-color:#14B191;"> 54
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="isc-scr-sec-grp-bdy-container-s1 isc-pad-non">
                                                <div class="screen-row">
                                                    <div class="isc-grp-sec-ent-cell-s1">
                                                       
                                                        <div class="isc-grp-sec-ent-rig-cell-s1 isc-grp-sec-ent-cen-cell-s1">
                                                                                                                  
                                                                <h5>$86,860 </h5>
                                                             <div class="screen-row ">
                                                                 <div class="cell-left">     
                                                            <h4>Due This Week</h4></div>
                                                            <div class="cell-right">
                                                                <span class="isc-grp-sec-ent-spn isc-grp-sec-ent-spn-clr1">20<i class="fa fa-arrow-up" style="margin-left:5px;"></i></span>
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
                            <table class="isc-table-read-optimal isc-table-sorter-s1 " id="tbl-Customers">
                                                <thead>
                                                    <tr>
                                                        <th style="width:2%;">
                                                       
                                                           <input type="checkbox" />
                                                       
                                                        </th>
                                                        <th style="width: 20%;" class="header" title="Customer Name">Customer Name
                                                        </th>
                                                      <%--  <th style="width: 23%;" class="header">Address
                                                        </th>
                                                        <th style="width: 20%;" class="header">Email
                                                        </th>--%>
                                                        <th style="width: 13.5%;text-align:center;" class="header" title="Address">Address
                                                        </th>
                                                         <th style="width: 13.5%;text-align:center;" class="header" title="Email">Email
                                                        </th>
                                                         <th style="width: 13.5%;text-align:center;" class="header" title="Expenses">Expenses
                                                        </th>
                                                         <th style="width: 13.5%;text-align:center;" class="header" title="Associated Project">Associated Project
                                                        </th>
                                                        <th style="width: 13.5%;text-align:center;" class="header" title="Associated Bill">Associated Bill
                                                        </th>
                                                      <%-- <th style="width: 13%;text-align:center;" class="header">Vendor Credits
                                                        </th>--%>
                                                        
                                                         <th style="width: 10%;" class="header" title="Action">Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>United Health Group</h5>
                                                        </td>
                                                       <%-- <td>
                                                            <h5>9073 4th St. Stevens Point, WI 54481	
                                        </h5>
                                                        </td>
                                                        <td >
                                                            <h5>Unitedhealthgroup@gmail.com</h5>
                                                        </td>--%>
                                                        <td style="text-align:center;">
                                                            <h5>#151, Brike Street</h5>
                                                        </td>
                                                                <td>
                                        <h5 style="text-align:center;">clarke@innospire.com</h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center; color: #66B050!important;">$2,500		
                                        </h5>
                                    </td>
                                                           <td>
                                        <h5 style="text-align:center;color: #66B050!important;">2	
                                        </h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center;">5
                                        </h5>
                                    </td>
                                                 
                                                      <%-- <td>
                                        <h5 style="text-align: right; color: #66B050!important;">$3,500		
                                        </h5>
                                    </td>--%>

                                                       
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>United Health Group</h5>
                                                        </td>
                                                       <%-- <td>
                                                            <h5>9073 4th St. Stevens Point, WI 54481	
                                        </h5>
                                                        </td>
                                                        <td >
                                                            <h5>Unitedhealthgroup@gmail.com</h5>
                                                        </td>--%>
                                                        <td style="text-align:center;">
                                                            <h5>#151, Brike Street</h5>
                                                        </td>
                                                                <td>
                                        <h5 style="text-align:center;">clarke@innospire.com</h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center; color: #66B050!important;">$2,500		
                                        </h5>
                                    </td>
                                                           <td>
                                        <h5 style="text-align:center;color: #66B050!important;">2	
                                        </h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center;">5
                                        </h5>
                                    </td>
                                                 
                                                      <%-- <td>
                                        <h5 style="text-align: right; color: #66B050!important;">$3,500		
                                        </h5>
                                    </td>--%>

                                                       
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>United Health Group</h5>
                                                        </td>
                                                       <%-- <td>
                                                            <h5>9073 4th St. Stevens Point, WI 54481	
                                        </h5>
                                                        </td>
                                                        <td >
                                                            <h5>Unitedhealthgroup@gmail.com</h5>
                                                        </td>--%>
                                                        <td style="text-align:center;">
                                                            <h5>#151, Brike Street</h5>
                                                        </td>
                                                                <td>
                                        <h5 style="text-align:center;">clarke@innospire.com</h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center; color: #66B050!important;">$2,500		
                                        </h5>
                                    </td>
                                                           <td>
                                        <h5 style="text-align:center;color: #66B050!important;">2	
                                        </h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center;">5
                                        </h5>
                                    </td>
                                                 
                                                      <%-- <td>
                                        <h5 style="text-align: right; color: #66B050!important;">$3,500		
                                        </h5>
                                    </td>--%>

                                                       
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>United Health Group</h5>
                                                        </td>
                                                       <%-- <td>
                                                            <h5>9073 4th St. Stevens Point, WI 54481	
                                        </h5>
                                                        </td>
                                                        <td >
                                                            <h5>Unitedhealthgroup@gmail.com</h5>
                                                        </td>--%>
                                                        <td style="text-align:center;">
                                                            <h5>#151, Brike Street</h5>
                                                        </td>
                                                                <td>
                                        <h5 style="text-align:center;">clarke@innospire.com</h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center; color: #66B050!important;">$2,500		
                                        </h5>
                                    </td>
                                                           <td>
                                        <h5 style="text-align:center;color: #66B050!important;">2	
                                        </h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center;">5
                                        </h5>
                                    </td>
                                                 
                                                      <%-- <td>
                                        <h5 style="text-align: right; color: #66B050!important;">$3,500		
                                        </h5>
                                    </td>--%>

                                                       
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>United Health Group</h5>
                                                        </td>
                                                       <%-- <td>
                                                            <h5>9073 4th St. Stevens Point, WI 54481	
                                        </h5>
                                                        </td>
                                                        <td >
                                                            <h5>Unitedhealthgroup@gmail.com</h5>
                                                        </td>--%>
                                                        <td style="text-align:center;">
                                                            <h5>#151, Brike Street</h5>
                                                        </td>
                                                                <td>
                                        <h5 style="text-align:center;">clarke@innospire.com</h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center; color: #66B050!important;">$2,500		
                                        </h5>
                                    </td>
                                                           <td>
                                        <h5 style="text-align:center;color: #66B050!important;">2	
                                        </h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center;">5
                                        </h5>
                                    </td>
                                                 
                                                      <%-- <td>
                                        <h5 style="text-align: right; color: #66B050!important;">$3,500		
                                        </h5>
                                    </td>--%>

                                                       
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                           <input type="checkbox" />
                                                       </td>
                                                        <td>
                                                            <h5>United Health Group</h5>
                                                        </td>
                                                       <%-- <td>
                                                            <h5>9073 4th St. Stevens Point, WI 54481	
                                        </h5>
                                                        </td>
                                                        <td >
                                                            <h5>Unitedhealthgroup@gmail.com</h5>
                                                        </td>--%>
                                                        <td style="text-align:center;">
                                                            <h5>#151, Brike Street</h5>
                                                        </td>
                                                                <td>
                                        <h5 style="text-align:center;">clarke@innospire.com</h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center; color: #66B050!important;">$2,500		
                                        </h5>
                                    </td>
                                                           <td>
                                        <h5 style="text-align:center;color: #66B050!important;">2	
                                        </h5>
                                    </td>
                                                        <td>
                                        <h5 style="text-align:center;">5
                                        </h5>
                                    </td>
                                                 
                                                      <%-- <td>
                                        <h5 style="text-align: right; color: #66B050!important;">$3,500		
                                        </h5>
                                    </td>--%>

                                                       
                                                        <td>
                                                           
                                                            <a href="#"><img src="img/makepayment.png" class="isc-make-pay1" title="Make Payment" style="cursor:pointer;"></a>
                                                          

                                                    <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="CustomerEdit.aspx"><i class="fa fa-eye"></i></a>
                                                            <a class="isc-action-badge-td-s1 pad-lft-5" title="View" href="#"><i class="fa fa-edit"></i></a>
                                                        </td>
                                                    </tr>


                                                  
                                                </tbody>
                                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="modal fade isc-popup-detail-form-s1 Mp_Relese isc-new-pop-up" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false" style="display:none;">
        <div class="modal-dialog" style="width: 650px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Vendor Import</h4>
                        </div>
                        <div class="cell-right">
                            <a class="fa fa-times-circle" data-dismiss="modal" style="cursor:pointer" aria-hidden="true" title="Close">
                            </a>
                           <%-- <button type="button" class="fa fa-times-circle close img-typ-sq" data-dismiss="modal" aria-hidden="true">
                            </button>--%>
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
                        <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal" title="Upload">
                            Upload</button>
                        <button type="button" class="btn default isc-btn-pop-action-s2" data-dismiss="modal" title="Cancel">
                            Cancel</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
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
    <script src="iscjsengine/PageScript/CustomerList.js"></script>
</asp:Content>
