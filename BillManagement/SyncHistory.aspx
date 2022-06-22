<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true" CodeBehind="SyncHistory.aspx.cs" Inherits="BillManagement.SyncHistory" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style>
    .isc-h-53
    {
        height:53px !important;
    }
    .isc-groupby-container {
    padding: 10px;
    border: 1px solid #ecf0f1;
    width: 100%;
    /* margin: 5px; */
    position: relative;
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
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="isc-app-main-body-layout-container">
                <div class="isc-app-screen-content-s1">
                    
    <div class="isc-app-main-body-layout-container">
                <div class="isc-app-screen-content-s1">
                    
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-30per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-history"></i>
                        <h2 style="line-height: 30px;">Sync History</h2>
                        <h6 class="mar-none"></h6>
                    </div>
                </div>
            </div>
            <div class="div-col-70per">
           
               
              <div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:6px;">
                   <a class="isc-theme-blue-btn filter-toggle-btn-cls" id="filter-toggle-btn" title="Filter"><i class="fa fa-filter"></i></a>
               <%--  <a class="isc-theme-blue-btn groupby-toggle-btn-cls" id="groupby-toggle-btn" title="Filter"><i class="fa fa-sitemap"></i></a>--%>
               
                      </div>

                </div>
           
            </div>
        </div>
        <div class="isc-app-screen-body-container" style="height: 256px;">
            <div class="screen-row">
                <div class="isc-app-screen-sec-container-s1 ">
                 
                        
                        <div class="screen-row ">
                            <div class="isc-filter-container isc-h-53" id="isc-filter-container" style="display: none;">
        
                        <div class="cell-left ">
                 <input type="text" class="form-control" id="Daterangepicker" placeholder="MM/DD/YYYY - MM/DD/YYYY" value="04/01/2021 - 05/01/2021 ">
                  </div>
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible"  id="slt-User"  tabindex="-1" aria-hidden="true">
                                <option value="0">Select User</option>


                               
                            </select>
                           </div>
                                <div class="cell-left pad-lft-15">
                            <select class="form-control select2 select2-hidden-accessible"  id="slt-Status" tabindex="-1" aria-hidden="true">
                                <option value="999999999">Selecct Status</option>    
                               
                                <option value="Sync Completed">	Sync Completed				
	
                                </option>
                                   <option value="Sync Failed">Sync Failed		

                                </option>
                                  <option value="Sync Interrupted">		Sync Interrupted				

                                </option>                           
                            </select>
                           </div>
                            <div class="isc-filter-search isc-go  mar-lft-10" title="Search">
                            <a title="Search" id="btn-Search"><i class="fa fa-search"></i></a>
                        </div>
                            <div class="isc-filter-search isc-reset" title="Reset">
                            <a id="btn-Reset"><i class="fa fa-refresh"></i></a>
                        </div>

                        
                        <div class="isc-filter-container-close" id="isc-filter-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                                
                                
                        
                    </div>
                    
                    <div class="screen-row">
                        <div class="isc-groupby-container isc-h-53" id="isc-groupby-container" style="display: none;">
        
                        
                        
                                <div class="cell-left">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option value="0">Select Status</option>
                            </select>
                           </div>
                                
                        <div class="cell-left pad-lft-15 ">
                            <select class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                <option value="0">Select User</option>
                            </select>
                           </div>
                            <div class="cell-left pad-lft-15">
                 <input type="text" class="form-control" id="dapicker" placeholder="MM/DD/YYYY">
                  </div>
                            <div class="isc-groupby-search isc-go  mar-lft-10" title="Search">
                            <a title="Search"><i class="fa fa-search"></i></a>
                        </div>
                            <div class="isc-groupby-search isc-reset" title="Reset">
                            <a><i class="fa fa-refresh"></i></a>
                        </div>

                        
                        <div class="isc-groupby-container-close" id="isc-groupby-container-close">
                            <a><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                    </div>
                    
                        <div class="screen-row">
                            <table class="isc-table-read-optimal isc-table-sorter-s1 "  id="tbl-SyncList">
                                             <thead>
		<tr style="cursor: pointer;">
      
                                                           <th title="Timestamp" style="width:20%;" class="">Timestamp	
</th>                                                             
                                                            <th title="user" style="width:15%;" class="">User</th>
                                                        
                
                                                            
                                                            <th title="Description" style="width:25%;" class="">Description</th>
                                                                 
                                            <th title="Status" style="width:15%;" class="">Status</th>
                                                                 
                                           
                                          
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
        </div>
                     </div>

            </div>

                </div>
        <script>
            $(document).ready(function () {
                RegisterDatepicker();                $('#dapicker').datepicker();            });

            var FilterStartDate = '01/01/2000';            var FilterEndDate = '01/01/2025';            var RegisterDatepicker = function () {
                FilterStartDate = '01/01/2000';                FilterEndDate = '01/01/2025';                $('#Daterangepicker').daterangepicker({
                    startDate: moment(FilterStartDate),                    endDate: moment(FilterEndDate),                    ranges: {
                        'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],                        'Today': [moment(), moment()],                        'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }
                }, SetSwapDateRange);                SetSwapDateRange(moment(FilterStartDate), moment(FilterEndDate));                $('#Daterangepicker').on('apply.daterangepicker', function (ev, picker) {
                    FilterStartDate = moment(picker.startDate).format('MM/DD/YYYY');                    FilterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
                });
            }            function SetSwapDateRange(start, end) {
                if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())                    && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())                    ) {
                    $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> Any Date');
                }                else {
                    $('#Daterangepicker span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
                }
            }
        </script>
        
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

               
    <script src="iscjsengine/PageScript/SyncHistory.js"></script>
</asp:Content>
