
<%@ Page Title="" Language="C#" MasterPageFile="~/Application.Master" AutoEventWireup="true"  Inherits="BillManagement.CreateInvoice" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #mp_Delivery .select2-container
        {
            width:100% !important;
        }
        .modal .blue.btn
        {
            color:#000 !important;
        }
        .isc-w-200
        {
            width:140px !important;
        }
       #mp_paid3 .isc-hor-details .isc-detail-name input
        {
           width:500px;
        }
#mp_paid3 .select2-container
       {
           width:159px !important;
       }
        .isc-33per
        {
            width:33%;
            float:left;
        }
        .isc-tail-h1-p1
        {
            color:#000;
            margin-bottom:5px;
        }
        .isc-set-img-width
        {
            margin-right:20px;
        }
        .isc-entity-sm-title
        {
            color:#000 !important;
        }
        .isc-temp-cont {
    border: 1px solid #ddd;
}
        .isc-temp-bdy-cont {
    padding: 15px;
    border:unset !important;
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
        .slider
        {
            position:unset !important;
        }
         .slider .split-amount  .form-control
         {
             width:230px;
         }
         .slider .split-amount  .form-control
         {
             width:230px;
         }
         .split-amount .isc-bill-trk-lst-cont
         {
             border:unset !important;
         }
       .slider .split-amount .isc-bill-trk-wdth .select2-container {
    width: 92% !important;
}
         .isc-pad-all
         {
             padding:15px;
         }
         .tags-container {
    line-height: unset !important;
    border: unset !important;
    min-height: unset !important;
    margin-bottom: unset !important;
    position: unset !important;
}.tag {
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
}.tags-container {
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
 .isc-txt-box-wid
 {
     width:100% !important;
 }
 .isc-set-bdr td {
    border: unset;
    padding: 2px;
    display: flex;
    border-radius: 4px!important;
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
    font-weight:400;
}
   .modal-content
   {
       border:unset;
   }
.isc-55per {
    width: 55.9%;
    float: left;
}
.isc-set-bdr {
    border: 1px solid #dadada;
}
          .isc-h-53
    {
        height:53px;
    }
           .form-control
    {
        /*width:200px !important;*/
        font-size:13px !important;
    }
          .fa-remove::before, .fa-close::before, .fa-times::before {
    content: "";
}
   .isc-tb1-icon-img
          {
              width:15px;
              margin-top:-2px;
          }
   .isc-set-wid-img img {
    height: 30px;
    width: 35px;
    margin-top: -6px;
}
  ::placeholder {
  color:#000 !important;
}
   .isc-h-53
    {
        height:53px !important;
    }
        .isc-table-read-optimal i
        {
            position:unset;
        }
.isc-cls-set-bdr-input input{
    border-top-right-radius: 0px !important;
    border-right: none !important;
    border-bottom-right-radius: 0px !important;
}
.isc-filter-details-span select
{
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
        .settings{
position: fixed;
    top: 40px;
      right: 0;
    background-color: #fff;
    z-index: 9999999;
display: none;
    box-shadow: 1px 4px 4px 0px #00000040;
    background-color: #fff !important;
}


.split-amount.split-amount-show{
    display: block;
}
.settings.settings-show{
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
         width:27px;
         height:20px;
 border:unset;
}
      .modal   .isc-detail-name select {
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
        .isc-nested-list-dd-s2
        {
            width:130px !important;
        }
        .btn-act {
    background-color: #1589ee !important;
} .btn-act i{
      color:#fff !important;
  }
  .select2-container {
    z-index: 9 !important;
}
        .isc-detail-name textarea
        {
            width:615px;
        }
        .isc-50
        {
            width:50%;
            float:left;
        }
        .isc-sign-pad-con-s1 {
    background-color: #F7F7F7;
    padding: 10px 10px;
    border-radius: 4px!important;
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
}.isc-set-bdr-rght {
   
    border-top-right-radius: 0px !important;
    border-right: none !important;
    border-bottom-right-radius: 0px !important;
}

        .isc-bill-cont .isc-filter-details-span {
            border-top-left-radius: unset;
            border-bottom-left-radius: unset;
        }
     
     .isc-40per .isc-table-read-optimal tbody td select {
    width: 59px;
}
        .isc-set-cle-black
        {
            color:#000;
        }
        .isc-w-60
        {
            width:60px !important;
        }
        .isc-set-pos-a-edit-i {
    text-align: center;
    position: absolute;
    top: 10%;
    background-color: #f9f9f9;
    line-height: 32px;
    margin-left: 5px;
    height: 30px;
    color: #909393;
    width: 34px;
}
        .isc-set-pos-a-edit-i {
    text-align: center;
    position: absolute;
    top: 10%;
    background-color: #f9f9f9;
    line-height: 32px;
    margin-left: 5px;
    height: 30px;
    color: #909393;
    width: 34px;
}
        .isc-table-read-optimal tbody td  select
        {
            width:88px;
        }
         .isc-table-read-optimal tbody td  input
        {
            width:70px;
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
    margin:0px;
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
    font-weight:500;
    font-size: 15px;
}
        .select2-container {
            width: 270px !important;
        }
        .form-control
        {
            width:270px;
        }
      .div-col-37per  .isc-bill-trk-lst-cont
        {
            border:unset !important;
        }
        .tab1-sec {
    padding: 0px 50px;
}
        .isc-w-270{
            width:270px !important;
        }
        .isc-theme-gray-btn
        {
            margin-left:5px 
            !important;
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
    color: #1589ee;
    margin:0px;
}
h3.isc-lbl-tile-header-shedule-survy.isc-f-w {
    font-weight: 600;
}
.isc-sav-btn {
    background-color: #13a840 !important;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="screen-row">
    <div class="screen-row">
        <div class="isc-app-screen-header-container" style="height: 46px;">
            <div class="div-col-38per">
                <div class="screen-row">
                    <div class="isc-page-header">
                        <i class="fa fa-file"></i>
                        <h2 >New Invoice</h2>
                        <h6 class="mar-none mar-top-5"># : 645432 | Date :10-02-2021</h6>
                    </div>
                </div>
            </div>
      
            <div class="div-col-42per isc-set-fs-13">
                
                
<%--<div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5">
                   
                    <a class="isc-theme-gray-btn filter-toggle-btn-cls mar-lft-10 btn-act " id="tab1-btn" title="Filter"><i class="fa fa-indent"></i></a>
                    <a class="isc-theme-gray-btn filter-toggle-btn-cls" id="tab2-btn" title="Filter"><i class="fa fa-list-ul"></i></a>
                         </div>

                </div>--%>
<div class="cell-right " style="margin-top: 9px;">
                    <a class="isc-theme-blue-btn isc-cnl-btn" href="#">Cancel</a>

                </div>
<div class="cell-right">
                 <div class="align-right mar-top-3 pad-rig-5 " style="margin-top:4px;">
                      <a class="isc-theme-gray-btn filter-toggle-btn-cls isc-panel-settings" title="Settings"><i class="fa fa-cog"></i></a>
                    <a class="isc-theme-gray-btn filter-toggle-btn-cls" title="Download"><i class="fa fa-download"></i></a>
                    <a class="isc-theme-gray-btn filter-toggle-btn-cls" title="Print"><i class="fa fa-print"></i></a>

                         </div>

                </div>
                
                <%--<div class ="cell-right  pad-lft-5 " style="margin-top:4px">
                    <ul class="isc-sec-lvl-cust-dd-s1">
                                        <li class=""><a title="More Options" type="button" class="isc-usr-sub-btn isc-t-11 isc-dd-drat-btn-s1 isc-sub-menu-list-s1 isc-bdr-rad-4 "  style="border-radius:4px !important">Save<i class="fa fa-angle-down"></i></a>                                         
                                                </li>                                              
                                            </ul>
                                      
                </div>--%>
                <div class="cell-right open" style="margin-top:9px">
                    <span style="position:relative;" class="isc-sec-lvl-cust-dd-s1">
                             <a class="isc-theme-blue-btn isc-sav-btn" style="margin-right: 3px;" data-toggle="dropdown">Save <i class="fa fa-angle-down"></i></a>
                     <ul class="isc-nested-list-dd-s2 isc-t-45" role="menu">
                                                <li class=""><a data-toggle="modal" href="#MP_Email">Save as Draft</a>
                                                </li>  
                                                 <li class=""><a href="InvoiceList.aspx">Save and Email</a>
                                                </li>                                                                                           
                                            </ul>
                    </span>
               
<%--                      <a class="isc-theme-blue-btn "  data-toggle="modal">Mail</a>--%>
                    <a class="isc-theme-blue-btn isc-split">Split</a>
                
                </div>
          </div>
            
        </div>
        <div class="isc-app-screen-body-container" style="height: 173px;">
            <div class="screen-row">
                <div class=" isc-pad-all">
              <%--<div class="screen-row">
                                <div class="cell-left">
                                <div class="isc-filter-options">
                                    <div class="isc-filter-item">
                               
                                        <div class="isc-filter-label isc-pad-left-120 isc-m-t-10">
                                         <label class="isc-entity-sec-title"> Customer :
       <span><a class="modal-toggle"><i class="fa fa-plus-circle"></i></a></span>
   </label>
                                        </div>

                                        <div class="isc-filter-details isc-pad-left-120 mar-top-20">
                                      <div class="isc-bill-add">
                                    <div class="isc-var-s7 isc-mar-t1">
                                        <div class="screen-row">
                                        <div class="cell-left">
           <h5 class="isc-thm-hme-kpi-hdr-t1">Delivery Address

               
           </h5>
                                            </div>
                                        <div class="cell-right">
                                            <a><span>
                                                <i class="fa fa-plus modal-toggle7 isc-set-cle-black "></i>
                                                <i class="fa fa-hand-pointer-o modal-toggle5 isc-set-cle-black"></i>
                                                <i class="fa fa-pencil modal-toggle8 isc-set-cle-black"></i>
                                               </span></a>
                                        </div>
                                            </div>
          <div class="isc-two-col">
            <div class=" isc-lft-hdr">
           <div class="isc-screen-row">
                                                      <div class="isc-var-s6 isc-wrap-item"><h4 style="font-weight:600;" contenteditable="true" class="mar-top-5">Foobar Labs </h4>
                                              <h4 contenteditable="true" class="mar-top-5">4666 Chenoweth Drive,Minor Hill,
  </h4>
                                                          <h4 contenteditable="true">Tennessee,38473,US  </h4>
                                                
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
                                    <div class="cell-right">
                                        <div class="isc-filter-item mar-top-20">
                                        <div class="isc-filter-label isc-m-t-10">
                                      <h5 class="isc-thm-hme-kpi-hdr-t1">Net Amount
          </h5>
                                        </div>
                                        <div class="isc-filter-details">
                                            <h3 class="isc-lbl-tile-header-shedule-survy isc-f-w isc-amt-f ">USD 69,999.00</h3>
                                        </div>

                                    </div>
                                    </div>


                                </div>--%>
                    <div class="tab1-sec">
                    <div class="screen-row">
                        <div class="div-col-80per">
                            <h5 class="isc-item-title-cont-p1 isc-color-p1">General Info	
 </h5>
                            <div class="screen-row">
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Customer :<sup class="isc-bill-mad-fld"></sup>  <i class="fa fa-plus-circle" href="#mp_paid3" data-toggle="modal"></i></label>
                                        </div>
                                        <div class="div-col-60per">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                <option>Choose Customer </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Invoice Number : </label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" class="form-control" placeholder="Enter Invoice Number">
                                        </div>
                                    </div>
                                </div>
                            </div>       
                            
                            <div class="screen-row">
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Invoice Date :</label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" class="form-control" id="dapicker" placeholder="MM/DD/YYYY">
                                        </div>
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Due Date :</label>
                                        </div>
                                        <div class="div-col-60per">
                                            <input type="text" class="form-control" id="dapicker" placeholder="MM/DD/YYYY">
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                            <div class="screen-row">
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Sales Rep  :</label>
                                        </div>
                                        <div class="div-col-60per">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                <option>Choose Sales Rep </option>


                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Reference Order  :</label>
                                        </div>
                                        <div class="div-col-60per">
                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                <option>Choose Reference Order </option>


                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                              <div class="screen-row">
                                <div class="div-col-50per">
                                     <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Payment Terms :</label>
                                        </div>
                                        <div class="div-col-60per">
                                            <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                <option>Net30</option>
                                                <option>Net60</option>
                                                <option>Net20</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="div-col-50per">
                                    <div class="screen-row mar-top-10">

                                        <div class="div-col-25per">
                                            <label class="mar-top-5">Payment Type :</label>
                                        </div>
                                        <div class="div-col-60per">
                                            <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                <option>Cash</option>
                                                <option>Check</option>
                                                <option>Card</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>              
                           
                                                            </div>
                    
                        
                    <div class="div-col-20per">
                        <div class="cell-right">
                          <div class="isc-filter-item mar-top-20">
                                        <div class="isc-filter-label isc-m-t-10">
                                      <h5 class="isc-thm-hme-kpi-hdr-t1">Net Amount
          </h5>
                                        </div>
                                        <div class="isc-filter-details">
                                            <h3 class="isc-lbl-tile-header-shedule-survy isc-f-w isc-amt-f ">USD 69,999.00</h3>
                                        </div>

                                    </div>
                    </div>
                        </div>
            </div>
                    <%--<div class="screen-row mar-top-10">
                        <h5 class="isc-item-title-cont-p1 isc-color-p1 cell-left">Order Line Items

               <span> <span class="isc-mar-lft isc-led-det-labl-txt"> Select/scan items
                <label class="switch">
  <input type="checkbox">
  <span class="slider1 round"></span>
</label>
            </span>
                    </span>
 </h5>
                       
                    
                    
                        
                        <div class="cell-right  mar-top-5" >

                    <a class="isc-theme-blue-btn modal-toggle3" href="#">Add Product</a>
                </div>
                        <div class="cell-right pad-rig-5  mar-top-5" >

                    <a class="isc-theme-blue-btn" href="#">Calculate Price</a>
                </div>
                        <div class="cell-right pad-rig-5 ">
                        <a class="isc-theme-gray-btn filter-toggle-btn-cls" title="Settings"><i class="fa fa-cog"></i></a>
                    </div>
                </div>--%>
                    <div class="screen-row">
                        <table class="isc-table-read-optimal mar-top-20 ">
                                                    <thead>
                                                        <tr>
                                                            <%--<th style="width: 15%;">Item</th>--%>
                                                               <th style="width: 28%;">Product</th>
                                                               <th style="width: 18%;">Requested Quantity</th>
                                                            <th style="width: 15%;">Price Per unit</th>
                                                         
                                                            <th style="width: 17%;">Discount</th>
                                                            <th style="width: 10%;">Tax</th>
                                                             <th style="width: 10%;">Amount</th>
                                                             <th style="width: 10%;"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                           <%-- <td>
                                                                <img src="img/appfinal/48.jpg" class="isc-inv-img"> Cocktail Dress</td>
                                                           --%>
                                                            <td>
<select class="form-control isc-w-270">
                                                                    <option>Diamond Watch(LUX01)</option>
                                                                   
                                                                </select>
                                                            </td>
                                                            <td>
                                                               <div class="cell-left">
                                                                <select class="form-control">
                                                                    <option>Each</option>
                                                                    <option>Package</option>

                                                                    <option>Grams</option>
                                                                    <option>KG</option>
                                                                </select>
                                                                    </div>
                                                               <div class="cell-left mar-lft-10">
                                                                    <input type="text" class="form-control  "  placeholder="1"/>
                                                              </div> 
                                                            </td>
                                                            <td>$12.000</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td style="text-align:right">$36.01</td>
                                                          
                                                            <td><a class="isc-action-badge-td-s1 pad-lft-5 isc-color-p1" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                           <%-- <td>
                                                                
                                                                <img src="img/appfinal/Watchimg.png" class="isc-inv-img"> Watch</td>
                                                            --%>
                                                            <td>
<select class="form-control isc-w-270">
                                                                    <option>Golden Xphone(LUX02)</option>
                                                                   
                                                                </select>
                                                            </td>
                                                            <td>
                                                               <div class="cell-left">
                                                                <select class="form-control">
                                                                    <option>Each</option>
                                                                    <option>Package</option>

                                                                    <option>Grams</option>
                                                                    <option>KG</option>
                                                                </select>
                                                                    </div>
                                                               <div class="cell-left mar-lft-10">
                                                                    <input type="text" class="form-control  "  placeholder="1"/>
                                                              </div> 
                                                            </td>
                                                            <td>$12.000</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td style="text-align:right">$36.01</td>
                                                          
                                                            <td><a class="isc-action-badge-td-s1 pad-lft-5 isc-color-p1" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                           <%-- <td>
                                                               
                                                                <img src="img/appfinal/JWL.png" class="isc-inv-img"> Cocktail Dress</td>
                                                           --%>
                                                            <td>
<select class="form-control isc-w-270">
                                                                    <option>SportsCar Emaizing(LUX03)</option>
                                                                   
                                                                </select>
                                                            </td>
                                                            <td>
                                                               <div class="cell-left">
                                                                <select class="form-control">
                                                                    <option>Each</option>
                                                                    <option>Package</option>

                                                                    <option>Grams</option>
                                                                    <option>KG</option>
                                                                </select>
                                                                    </div>
                                                               <div class="cell-left mar-lft-10">
                                                                    <input type="text" class="form-control  "  placeholder="1"/>
                                                              </div> 
                                                            </td>
                                                            <td>$12.000</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td style="text-align:right">$36.01</td>
                                                          
                                                            <td><a class="isc-action-badge-td-s1 pad-lft-5 isc-color-p1" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                                <a class="isc-set-pos-a-edit-i">
                                                                      <i class="fa fa-plus" style="padding:0px;"></i>
                                                                   </a>
                                                            </td>

                                                        </tr>

                                                        <tr>
                                                         
                                                        <td>
                                                            <select class="form-control isc-w-270">

                                                            </select>
                                                        </td>
                                                            <td>
                                                                <div class="cell-left">
                                                                    <select class="form-control ">
                                                                        <option>Each</option>
                                                                        <option>Packages</option>
                                                                        <option>Gram</option>
                                                                        <option>Kg</option>
                                                                    </select>
                                                                </div>
                                                                <div class="cell-left mar-lft-10">
                                                                    <input type="text" class="form-control  "  placeholder=""/>
                                                              </div>
                                                            </td>
                                                            <td>
                                                                <input type="text" class="form-control" />
                                                            </td>
                                                            <td >
                                                                <div class="isc-filter-details isc-cls-set-bdr-input isc-set-bdr-rght cell-left">
                        
                 <input type="text" class="form-control isc-set-bdr-unset" id="planweek" name="planweek" placeholder="" aria-required="true">
                                                                     
                                                                 </div>
                   <span class="isc-filter-details-span">
                       <select class="form-control">
                           <option>%</option>
                           <option>$</option>
                       </select></span>
                                        
                                                            </td>
                                                            <td>
                                                                <input type="text" class="form-control" />
                                                            </td>
                                                               <td>
                                                                <input type="text" class="form-control" />
                                                            </td>
                                                          
                                                            <td><a class="isc-action-badge-td-s1 pad-lft-5 isc-color-p1" title="Delete" href="#"><i class="fa fa-trash-o"></i></a></td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                    </div>
                    <div class="screen-row mar-top-10">
                        <div class="div-col-50per">
                        <h5 class="isc-item-title-cont-p1 isc-color-p1">Address Info	
 </h5>
                        <div class="screen-row">
                            <div class="div-col-50per">
                                <div class="isc-bill-add">
                                    <div class="isc-var-s7 isc-mar-t1">
                                        <div class="screen-row">
                                        <div class="cell-left">
           <h5 class="isc-thm-hme-kpi-hdr-t1">Billing Address
               
           </h5>
                                            </div>
                                        <div class="cell-right">
                                            <a><span style="display:none;">
                                                <i class="fa fa-plus modal-toggle4 isc-set-cle-black"></i>
                                                <i class="fa fa-hand-pointer-o modal-toggle5 isc-set-cle-black"></i>
                                                <i class="fa fa-pencil modal-toggle6 isc-set-cle-black"></i>
                                               </span></a>
                                        </div>
                                            </div>
          <div class="isc-two-col">
            <div class=" isc-lft-hdr">
           <div class="isc-screen-row">
                                                      <div class="isc-var-s6 isc-wrap-item"><h4 style="font-weight:600;" contenteditable="true" class="mar-top-5">Foobar Labs </h4>
                                              <h4 contenteditable="true" class="mar-top-5">4666 Chenoweth Drive,Minor Hill,
  </h4>
                                                          <h4 contenteditable="true">Tennessee,38473,US  </h4>
                                                
                                                </div> 
                        </div>
          

               </div>
           
           </div>

              </div>
                                </div>
                                
                            </div>
                             <div class="div-col-50per">
                                <div class="isc-bill-add">
                                    <div class="isc-var-s7 isc-mar-t1">
                                        <div class="screen-row">
                                        <div class="cell-left">
           <h5 class="isc-thm-hme-kpi-hdr-t1">Delivery Address
          </h5>
                                            </div>
  <div class="cell-right">
                                            <a><span style="display:none;">
                                                <i class="fa fa-plus modal-toggle7 isc-set-cle-black"></i>
                                                <i class="fa fa-hand-pointer-o modal-toggle5 isc-set-cle-black"></i>
                                                <i class="fa fa-pencil modal-toggle8 isc-set-cle-black"></i>
                                               </span></a>
                                        </div>
                                            </div>
          <div class="isc-two-col">
            <div class=" isc-lft-hdr">
           <div class="isc-screen-row">
                                                      <div class="isc-var-s6 isc-wrap-item mar-top-5  "><h4 style="font-weight:600;" contenteditable="true">Wox Studio </h4>
                                             
                                                          <h4 contenteditable="true" class="mar-top-5">4323 Alexander Avenue,</h4>
                                                           <h4 contenteditable="true" class="mar-top-5">Concord,California,US</h4>
                                             
                                                </div> 
                        </div>
          

               </div>
           
           </div>

              </div>
                                </div>
                            </div>
                        </div>
                      </div>
                        <div class="isc-40per" style="float:right;">
        <div class="isc-bill-cont " style="">
              <h5 class="isc-item-title-cont-p1 isc-color-p1">Summary	
 </h5>
                                  <table class="isc-table-read-optimal isc-tab-var-nofix isc-tab-var isc-table-sorter-s1">
                                                    <tbody>
                                                        <tr style="cursor: pointer;">
                                                         
                                                            <td style="width: 30%;">
                                                                 <h4>Sub Total</h4>
                                                            </td>
                                                            <td style="width: 30%;">
                                                      
                                                            </td>
                                                             <td style="width: 20%;">
                                                             </td>
                                                            <td style="width:20%">
                          <h4>0.00</h4></td>

                                                       
                                                        </tr>
                                                        <tr style="cursor: pointer;">
                                                          
                                                            <td style="width: 30%;">
                                                                <h4 class="isc-tck-tlt">Discount : </h4>
                                                            </td>
                                                            <td style="width: 30%;">
                                                                <div class="isc-filter-details isc-cls-set-bdr-input isc-set-bdr-rght cell-left">
                        
                 <input type="text" class="form-control isc-set-bdr-unset" id="planweek" name="planweek" placeholder="" aria-required="true">
                                                                     
                                                                 </div>
                   <span class="isc-filter-details-span">
                       <select class="form-control">
                           <option>%</option>
                           <option>$</option>
                       </select></span>
                                        
                                                            </td>
                                                             <td style="width: 60%;">
                                                               
                                                            </td>
                                                            <td>
                                                      <h4>0.00</h4></td>

                                                       
                                                        </tr>
                                              
                                                         <tr style="cursor: pointer;">
                                                          
                                                            <td style="width: 30%;">
                                                                <h4 class="isc-tck-tlt">Shipping Charges : </h4>
                                                            </td>
                                                            <td style="width: 30%;">
                                                                <div class="isc-hor-details isc-hor-details2" style="width:100%;">
                <div class="isc-detail-name">
       <input type="text" class="form-control" id="task" name="task" placeholder="" aria-required="true" aria-invalid="true">
    </div></div>
                                                            </td>
                                                             <td style="width: 60%;">
                                                            
                                                            </td>
                                                            <td>
                                                              <h4>0.00</h4></td>

                                                       
                                                        </tr>  
                                                        <tr style="cursor: pointer;">
                                                          
                                                            <td style="width: 30%;">
                                                                <h4 class="isc-tck-tlt">Tax: </h4>
                                                            </td>
                                                            <td style="width: 30%;">
                                                                <div class="isc-hor-details isc-hor-details2" style="width: 100%;">
                <div class="isc-detail-name">
       <input type="text" class="form-control" />
    </div></div>
                                                            </td>
                                                             <td style="width: 60%;">
                                                           
                                                 
                                                            </td>
                                                            <td>
                                                              <h4>0.00</h4></td>

                                                       
                                                        </tr>
                                                        <tr style="cursor: pointer;">
                                                          
                                                            <td style="width: 30%;">
                                                                <h4 class="isc-tck-tlt">Total($)</h4>
                                                            </td>
                                                            <td style="width: 30%;">
                                                           
                                                            </td>
                                                             <td>
                                    </td>
                                                            <td>
                                                            <h4>0.00</h4></td>

                                                       
                                                        </tr>
                                                    </tbody>
                                                </table>
              </div>
    </div>
                    </div>
                    <h5 class="isc-item-title-cont-p1 isc-color-p1" style="margin-top: -80px;">More Info
 </h5><div class="isc-two-col">
                     <div class="isc-50">                 
                         <div class="isc-screen-row">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label> Notes </label>
           </div>
      <div class="isc-detail-name">
   <textarea id="" name="w3review" rows="4" class="form-control"></textarea>
           </div>
           </div>
       </div>

                                                          
                         <div class="isc-screen-row isc-m-t-8">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Terms and Conditions	 </label>
           </div>
      <div class="isc-detail-name">
  <textarea id="" name="w3review" rows="4" class="form-control"></textarea>
            </div>
           </div>
       </div>
                         
                      <%--   <div class="isc-screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label> Payment Type </label>
           </div>
      <div class="isc-detail-name">
          <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Cash</option>
       <option>Check</option>
              <option>Card</option>
     </select> </div>
           </div>
       </div>--%>
          </div>    
     <%--<div class="isc-50">
         <div class="isc-sign-pad-con-s1 mar-top-10">
                                                    <div class="screen-row">
                                                        
                                                    </div>
                                                    <div class="screen-row">
                                                       <h5 class="isc-thm-hme-kpi-hdr-t1 mar-top-50 isc-text-center modal-toggle9">Click here to sign
</h5>
                                                    </div>
                                                </div>
     </div>--%>
     </div>
          </div>
                    <div class="tab2-sec" style="display:none">
                        <div class="screen-row">
                    <div class="div-col-60per">
                        <div class="isc-up-bill-lft-cont">

                                        <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10 isc-crt-bill1-lft-cont" style="">


                                            <div class="screen-row isc-crt-bill-view">


                                                <div class="div-col-100per " style="text-align: center;">
                                                    <div class="screen-row">


                                                        <div class="isc-file-upload-in-con" style="padding: 5px 10px; border: none !important;">
                                                            <i class="fa fa-cloud-upload"></i>
                                                            <div class="screen-row">
                                                                <h2>Drag And Drop or<span class="isc-btn-inp-typ-file-s1" style="background-color: #f9f9f9 !important;">Browse

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                                </span></h2>
                                                                
                                                              <img src="img/OCRScr.png" class="isc-bill-tck-snr-img" title="OCR Scan">
                                                            </div>

                                                        </div>
                                                        <div class="screen-row">
                                                            <h3 class="isc-lbl-vry-sm-txt-s1" style="text-align: center;">
                                                                <span>Note:</span>
                                                                Upload only PDF, JPG, JPEG &amp; PNG with Max 10 MB</h3>
                                                        </div>


                                                        <div class="cell-left pad-lft-med"><a style="display: none" id="btn-validate-customer" class="isc-lbl-tile-foot-act-but-s1 cell-right">Validate Upload</a></div>
                                                        <div class="cell-left pad-lft-med"><a style="display: none" id="btn-initiate-upload" class="isc-lbl-tile-foot-act-but-s1 cell-right">Initiate Process</a></div>
                                                    </div>



                                                </div>

                                            </div>

                                        </div>

                                    </div>
                    </div>
                    <div class="div-col-37per isc-mar-all">
                        <div class="isc-den-rgt-cont-s1">
                            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                <h5 class="isc-bill-trk-hdr-txt" href="#coll_41" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Invoice Details</h5>
        
        <div class="screen-row mar-top-10 collapse in" id="coll_41">
        
       
        
           
            
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Vendor Name : </label>
           </div>
                </div>
                <div class="div-col-60per">
                    <div class="isc-detail-name">
          <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Vendor Name</option>
        
     </select> </div>
               
            </div>
        <div class="div-col-10per">
            <i class="fa fa-plus" style="font-size:20px;margin-left:20px;"></i>
        </div>
                </div>
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Invoice # : </label>
           </div>
                </div>
                <div class="div-col-60per isc-hor-details" style="padding:0px;">
                    <div class="isc-detail-name">
         <input type="text" class="form-control" id="plandate" name="plandate" placeholder=" Enter Invoice #" aria-required="true" aria-invalid="true" style="width:96% !important;"></div>
                </div>
               
            </div>
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Invoice Description  </label>
           </div>
                </div>
                <div class="div-col-60per isc-hor-details" style="padding:0px;">
                    <div class="isc-detail-name">
       <textarea id="" name="w3review" rows="3" class="form-control"style="width:260px"></textarea></div>
                </div>
               
            </div>
      <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Invoice Amount : </label>
           </div>
                </div>
                <div class="div-col-60per isc-hor-details" style="padding:0px;">
                    <div class="isc-detail-name">
         <input type="text" class="form-control" id="plandate" name="plandate" placeholder=" Enter Invoice Amount" aria-required="true" aria-invalid="true" style="width:96% !important;"></div>
                </div>
               
            </div>
        <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Invoice Category : </label>
           </div>
                </div>
                <div class="div-col-60per">
                    <div class="isc-detail-name">
          <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Invoice Category</option>
        
     </select></div>
               
            </div>
       
                </div>
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label>Payment Terms : </label>
           </div>
                </div>
                <div class="div-col-60per">
                    <div class="isc-detail-name">
          <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Payment Terms</option>
        
     </select> </div>
               
            </div>
        
                </div>
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Invoice Date  : </label>
           </div>
                </div>
                <div class="div-col-60per isc-hor-details" style="padding:0px;">
                    <div class="isc-detail-name">
         <input type="text" class="form-control" id="plandate" name="plandate" placeholder=" Enter Invoice Date " aria-required="true" aria-invalid="true" style="width:96% !important;"></div>
                </div>
               
            </div>
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label> Due Date  : </label>
           </div>
                </div>
                <div class="div-col-60per isc-hor-details" style="padding:0px;">
                    <div class="isc-detail-name">
         <input type="text" class="required error" id="plandate" name="plandate" placeholder=" Enter Due Date " aria-required="true" aria-invalid="true" style="width:96% !important;"></div>
                </div>
               
            </div>
            <div class="screen-row mar-top-20">
                <div class="screen-row">
                    <div class="isc-label-name">
   <label>Would you like to capture the Invoice description? </label>
           </div>
                </div>
                <div class="screen-row isc-hor-details" style="padding:0px;">
                   <div class="isc-detail-name">
           <div class="isc-hr-element">
      <input type="radio" id="option 1" name="options" value="option 1">
  <label for="option 1">Yes</label><br>
  <input type="radio" id="option 2" name="options" value="option 2">
  <label for="option 2">No</label><br>
 
           </div>
           </div>
                </div>
               
            </div>
            <div class="screen-row mar-top-20">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label>Customer  : </label>
           </div>
                </div>
                <div class="div-col-60per">
                    <div class="isc-detail-name">
          <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Customer </option>
        
     </select> </div>
               
            </div>
        
                </div>
            <div class="screen-row mar-top-20 mar-btm-15">
                <div class="div-col-30per">
                    <div class="isc-label-name">
   <label>Project  : </label>
           </div>
                </div>
                <div class="div-col-60per">
                    <div class="isc-detail-name">
          <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Project </option>
        
     </select>  </div>
               
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
          
   
    <div class="slider">

        <div class="split-amount ">
            <div style="width: 522px;">

                <div class="close-slider">
                    <div class="cls">
                        <h3> Split Amount</h3>
                    <i class="fa fa-close close-amount"></i>
                        </div>
                    </div>
                <div class="auto-height">
        <div class="isc-bill-trk-lst-cont  isc-cus-var isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_1321" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Split Amount   </h5>
                                                        <div class="screen-row mar-top-10 collapse in" id="coll_132" style="height: auto;">
                                                            <div class="screen-row">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Account : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                        <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                            <option>Choose Account</option>
                                                                            <option>762000 - Ent./Travel-Meal </option>
                                                                            <option>764000 - Ent./Travel-Travel &amp; Auto </option>
                                                                            <option>802000 - Office-General </option>
                                                                            <option>999999 - Unalocated Expenses</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Description : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" placeholder="Enter Description">
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="div-col-35per">
                                                                    <label class="mar-top-5">Amount : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" placeholder="Enter Amount">
                                                                </div>
                                                                <div class="div-col-15per">
                                                                    <i class="fa fa-plus isc-crt-bill-add"></i>
                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">
                                                                <table class="isc-table-read-optimal isc-table-sorter-s1  mar-top-10">
                                                                    <thead>
                                                                        <tr>

                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="header">Account
                                                                            </th>
                                                                            <th style="width: 30%; background-color: #e1e2e3;" class="header headerSortUp">Description
                                                                            </th>
                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="header">
                                                                                <center>Amount</center>
                                                                            </th>
                                                                            <th style="width: 20%; background-color: #e1e2e3;" class="header">Action
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        <tr>
                                                                            <td>
                                                                                <h5>Bank Service Charges</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>A1 Rental</h5>
                                                                            </td>
                                                                            <td class="isc-bill-amt-pad">
                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <h5>Bank Service Charges</h5>
                                                                            </td>
                                                                            <td>
                                                                                <h5>A1 Rental</h5>
                                                                            </td>
                                                                            <td class="isc-bill-amt-pad">
                                                                                <h5 style="text-align: right;">$750</h5>
                                                                            </td>
                                                                            <td>
                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Edit" href="#"><i class="fa fa-pencil-square-o"></i></a>

                                                                                <a class="isc-action-badge-td-s1 pad-lft-5" title="Delete" href="#"><i class="fa fa-trash-o"></i></a>
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



        <div class="settings">
            <div style="width: 522px;">

                 <div class="close-slider">
                     <div class="cls">
                         <h3> Settings </h3>
                    <i class="fa fa-close close-settings"></i>
                         </div>
                    </div>

                <div class="isc-cus-var1" style="padding-left: 10px;   padding-right: 10px;">
                    <div class="auto-height">
            <%--<div class="isc-bill-trk-lst-cont   isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_21" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Approver   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_21" style="height: auto;">
                                                            <label>
                                                                <div class="checker"><span><input type="checkbox"></span></div>
                                                                Auto Approval</label>
                                                            <div class="screen-row mar-top-10">
                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Approver Name : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-sec-wid">
                                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                                <option>Choose Approver Name</option>
                                                                                <option>Frank Abagnale </option>
                                                                                <option>Edward Abbey </option>
                                                                                <option>Reuben Abel </option>
                                                                                <option>Hal Abelson</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="div-col-15per">
                                                                        <i class="fa fa-plus isc-crt-bill-add"></i>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>--%>
            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_22" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Make Recurring    </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_22" style="height: auto;">
                                                            <div class="screen-row mar-top-10">

                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Start Date : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" placeholder="Enter Date" class="form-control isc-exp-mang-txt-bx1 datepicker">
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Frequency : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                                <option>Weekly</option>
                                                                                <option>Monthly</option>
                                                                                <option>Quarterly</option>
                                                                                <option>Halfearly</option>
                                                                                <option>Annual</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Ends On : </label>
                                                                    </div>
                                                                    <div class="div-col-50per">
                                                                        <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker">
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
            <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_23" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Send Reminders    </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_23" style="height: auto;">
                                                            <div class="screen-row mar-top-10">

                                                                <div class="screen-row">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Remind : </label>
                                                                    </div>
                                                                    <div class="div-col-8per pad-lft-2-per">
                                                                        <input type="text" placeholder="" class="form-control isc-exp-mang-txt-bx1 datepicker">
                                                                    </div>
                                                                    <div class="div-col-14per pad-lft-4-per">
                                                                        <label class="mar-top-5">day(s)  </label>
                                                                    </div>
                                                                    <div class="div-col-20per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-new-wd isc-bill-trk-wdth ">
                                                                            <select class="isc-select-dropdown select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                                                <option>Before</option>
                                                                                <option>After</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="div-col-23per pad-lft-4-per">
                                                                        <label class="mar-top-5">Due Date </label>
                                                                    </div>
                                                                </div>
                                                                <div class="screen-row mar-top-10">
                                                                    <div class="div-col-35per">
                                                                        <label class="mar-top-5">Email : </label>
                                                                    </div>
                                                                    <div class="div-col-60per">
                                                                        <div class="screen-row isc-dd-add-action-s1 shd-off-s1 dd-btn-siz-s1 isc-fix-dd-siz-s1 isc-bill-trk-wdth">
                                                                            <select class="isc-select-dropdown slt-Tags  select2-hidden-accessible" multiple="" tabindex="-1" aria-hidden="true">
                                                                            </select>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                
                                                            </div>
                                                        </div>
                                                    </div>
          <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_24" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Documents   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_24" style="height: auto;">
                                                            <div class="screen-row">
                                                                <div class="screen-row ">
                                                                    <span class="isc-btn-inp-typ-file-s1 cell-right">+

                                    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" style="width: 200px;">
                                                                    </span>


                                                                </div>
                                                            </div>
                                                            <div class="screen-row mar-top-10">

                                                                <table class="isc-table-read-optimal isc-table-sorter-s1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="width: 80%;" class="header">File Name</th>

                                                                            <th style="width: 20%;" class="header text-center">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>

                                                                            <td>
                                                                                <h5 title="Uploaded On: 02/04/2020 04.33 PM Uploaded By:Ravi Shanker ">
                                                                                    <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">

                                                                                    <span>Details1.pdf</span>
                                                                                </h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="screen-row isc-inline-pop-action-s1">
                                                                                    <a class="isc-action-badge-td-s1" href="#" title="View"><i class="fa fa-eye"></i></a>
                                                                                    <a class="isc-action-badge-td-s1" title="Delete"><i class="fa fa-trash-o"></i></a>

                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>

                                                                            <td>
                                                                                <h5 title="Uploaded On: 02/04/2020 04.33 PM Uploaded By:Ravi Shanker ">
                                                                                    <img src="img/appimages/PDF_icon.png" style="width: auto; height: 20px; margin-right: 5px;">
                                                                                    <span>Details2.pdf</span>
                                                                                </h5>
                                                                            </td>

                                                                            <td>
                                                                                <div class="screen-row isc-inline-pop-action-s1">
                                                                                    <a class="isc-action-badge-td-s1" href="#" title="View"><i class="fa fa-eye"></i></a>
                                                                                    <a class="isc-action-badge-td-s1" title="Delete"><i class="fa fa-trash-o"></i></a>

                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
          <div class="isc-bill-trk-lst-cont isc-lst-scrl-cont mar-top-10">
                                                        <h5 class="isc-bill-trk-hdr-txt" href="#coll_25" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Notes   </h5>
                                                        <div class="screen-row mar-top-10 collapse " id="coll_25" style="height: auto;">
                                                            <div class="cell-right pad-rig-5 " style="margin-bottom: 6px;">

                                                                <a class="isc-theme-blue-btn" href="#">Save</a>
                                                            </div>
                                                            <div class="screen-row mar-top-15">

                                                                <textarea class="form-control" placeholder="Enter Notes" rows="3"></textarea>
                                                            </div>
                                                            <div class="screen-row">
                                                                <div class="isc-crt-bill-not-cont">
                                                                    <p class="isc-crt-bill-nt"><i class="fa fa-circle" style="font-size: 8px !important;"></i> Payment to be done based on payment terms..<span class="isc-crt-bill-ownr" style="color: green !important;"> Frank Abagnale ,</span><span class="isc-crt-bill-ownr">Sun Feb 28 ,4.54 am</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                        </div>
                    </div>
</div>
        </div>

        <!----Slider----->
                            </div>
            </div>
        </div>
<div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="mp_paid" tabindex="-1" role="basic" aria-hidden="false">
        <div class="modal-dialog" style="width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Product Catalog</h4>
                        </div>
                        <div class="cell-right">
                         <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close  cell-right mar-top-10"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                   <div class="screen-row">
            
      <div class="cell-left">
          <ul class="isc-sec-lvl-cust-dd-s1 isc-entity-btn cell-right">
                            <li>                            <div class="input-icon left isc-hdr-search-container isc-var-s3"> <i class="icon-search"></i>
										<input class="m-wrap " type="text" style="width:300px"></div></li>
                          
                        </ul>
      </div>
                <div class="cell-right">
                    <label class="isc-led-det-labl-txt">0 Item(s) Selected</label>
                </div>
</div>
                    <div class="screen-row mar-top-10">
                <div class="isc-100per">
                    <div class="isc-screen-nav-container-s1 mar-top-med">
    <ul class="nav nav-tabs isc-tab-brd-cont">
          <li class="active"><a href="#Tab1" data-toggle="tab">Latest Ordered Items</a></li>
                                            <li ><a href="#Tab2" data-toggle="tab">Purchase History</a></li>
                                           <li ><a href="#Tab3" data-toggle="tab">Browse Product Catalog</a></li>
                                   </ul>
                    </div>
                    </div>
</div>
                    <div class="tab-content">


    <div id="Tab1" class="tab-pane active">
        <h2 class="isc-com-title-txt-s4 isc-color-p3">04/07/2021 <span class="isc-color-p1">Order # : 688002</span></h2>
          <div class="isc-btm-scroll">
        <table class="isc-table-read-optimal mar-top-20 " cellspacing="0" width="100%">
	<thead>
		    <tr style="cursor: pointer;">
              
			<th style="width:40%">Product<i class="fa fa-sort-alpha-asc"></i></th>
		
      <th style="width:20%">Quantity<i class="fa fa-sort-alpha-asc"></i></th>
                <th style="width:17%">Stock Available<i class="fa fa-sort-alpha-asc"></i></th>
          <th style="width:10%">Price</th>
       
		</tr>
	</thead>
	<tbody class="isc-style-1">
		<tr style="cursor: pointer;">
         
           <td>
               
               
               <h5 class="isc-l-h-42 isc-color-p1"> <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle"><img src="UIThemeEngine/Images/WomansWear1.png"></span>Cocktail Dress
                   <span class="isc-set-black">(12345 00000)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
               </h5>
              
           </td>
           
			
        
            <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            10
        </td>
            <td>
                <h5 style="text-align:right">$55</h5>
            </td>
               </tr>
    <tr style="cursor: pointer;">
        
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
             
          
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
               <img src="UIThemeEngine/Images/Watchimg14.png">
                   </span>
                       Watch
                    <span class="isc-set-black">(23432 12211)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                      </h5>
             </td>
    
    
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
         <td>
             20
         </td>
            <td>
                <h5 style="text-align:right">$68</h5>
            </td>
            
		</tr>
        <tr style="cursor: pointer;">
          
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
           
            
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
                   <img src="UIThemeEngine/Images/Productcatalogimg1.png">
                 </span>
                        Jewelry
                   <span class="isc-set-black">(43234 54345)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                    </h5>
             </td>
      
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            28
        </td>
            <td>
                <h5 style="text-align:right">$48</h5>
            </td>
            
		
                </tr>
	</tbody>
    
        
</table>
              </div>
        <!--Pagination--->
        
        <!-----Pagination--->
	</div>
	
    <div id="Tab2" class="tab-pane">
        <div class="screen-row">
            <h5 class="isc-item-title-cont-p1">Filter Items</h5>
            <div class="cell-left">
                           <div class="isc-detail-name isc-mar-top">
     <select id="cars" name="cars" aria-invalid="false" class="form-control">
    <option>Choose Brand</option>
   
  </select>
           </div>
                               <div class="isc-detail-name isc-mar-top isc-mar-lft">
     <select id="cars" name="cars" aria-invalid="false" class="form-control">
    <option>Choose Class</option>
   
  </select>
           </div>               <div class="isc-detail-name isc-mar-top isc-mar-lft">
     <select id="cars" name="cars" aria-invalid="false" class="form-control">
    <option>Choose Vendor</option>
   
  </select>
           </div>                        
                                                                   
            </div>
            <div class="cell-right"><ul class="isc-sec-lvl-cust-dd-s1 isc-entity-btn" style="position:relative;right:0px;top:7px;">
		<li><a title="View" type="button" class="isc-dd-drat-btn-s1 isc-sub-menu-list-s1  modal-toggle11"> <i class="fa fa-refresh" style="margin-left: 0;"></i></a> </li>				
     <li><a title="Calculate Price" type="button" class="isc-dd-drat-btn-s1 isc-btn-primary isc-sub-menu-list-s1 isc-sub-menu-list-s1"> Apply Filter</a> </li>
                            
                         
					</ul>
            </div>
        </div>
          <div class="isc-btm-scroll">
        <div class=" isc-set-pad-non-tbl">
        <div class="history-tl-container ">
                                        <ul class="tl">
                                            <li class="tl-item" ng-repeat="item in retailer_history">
                                               <h2 class="isc-com-title-txt-s4 isc-color-p3">04/07/2021 <span class="isc-color-p1">Order # : 688002</span>

                                               </h2>
<table class="isc-table-read-optimal mar-top-20 " cellspacing="0" width="100%">
	<thead>
		    <tr style="cursor: pointer;">
              
			<th style="width:40%">Product<i class="fa fa-sort-alpha-asc"></i></th>
		
      <th style="width:20%">Quantity<i class="fa fa-sort-alpha-asc"></i></th>
                <th style="width:17%">Stock Available<i class="fa fa-sort-alpha-asc"></i></th>
          <th style="width:10%">Price</th>
       
		</tr>
	</thead>
	<tbody class="isc-style-1">
		<tr style="cursor: pointer;">
         
           <td>
               
               
               <h5 class="isc-l-h-42 isc-color-p1"> <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle"><img src="UIThemeEngine/Images/WomansWear1.png"></span>Cocktail Dress
                   <span class="isc-set-black">(12345 00000)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
               </h5>
              
           </td>
           
			
        
            <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            10
        </td>
            <td>
                <h5 style="text-align:right">$55</h5>
            </td>
               </tr>
    <tr style="cursor: pointer;">
        
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
             
          
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
               <img src="UIThemeEngine/Images/Watchimg14.png">
                   </span>
                       Watch
                    <span class="isc-set-black">(23432 12211)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                      </h5>
             </td>
    
    
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
         <td>
             20
         </td>
            <td>
                <h5 style="text-align:right">$68</h5>
            </td>
            
		</tr>
        <tr style="cursor: pointer;">
          
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
           
            
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
                   <img src="UIThemeEngine/Images/Productcatalogimg1.png">
                 </span>
                        Jewelry
                   <span class="isc-set-black">(43234 54345)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                    </h5>
             </td>
      
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            28
        </td>
            <td>
                <h5 style="text-align:right">$48</h5>
            </td>
            
		
                </tr>
	</tbody>
    
        
</table>
                                            </li>
                                           
                                          <li class="tl-item" ng-repeat="item in retailer_history">
                                               <h2 class="isc-com-title-txt-s4 isc-color-p3">04/07/2021 <span class="isc-color-p1">Order # : 688002</span>

                                               </h2>
                                              <table class="isc-table-read-optimal mar-top-20 " cellspacing="0" width="100%">
	<thead>
		    <tr style="cursor: pointer;">
              
			<th style="width:40%">Product<i class="fa fa-sort-alpha-asc"></i></th>
		
      <th style="width:20%">Quantity<i class="fa fa-sort-alpha-asc"></i></th>
                <th style="width:17%">Stock Available<i class="fa fa-sort-alpha-asc"></i></th>
          <th style="width:10%">Price</th>
       
		</tr>
	</thead>
	<tbody class="isc-style-1">
		<tr style="cursor: pointer;">
         
           <td>
               
               
               <h5 class="isc-l-h-42 isc-color-p1"> <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle"><img src="UIThemeEngine/Images/WomansWear1.png"></span>Cocktail Dress
                   <span class="isc-set-black">(12345 00000)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
               </h5>
              
           </td>
           
			
        
            <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            10
        </td>
            <td>
                <h5 style="text-align:right">$55</h5>
            </td>
               </tr>
    <tr style="cursor: pointer;">
        
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
             
          
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
               <img src="UIThemeEngine/Images/Watchimg14.png">
                   </span>
                       Watch
                    <span class="isc-set-black">(23432 12211)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                      </h5>
             </td>
    
    
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
         <td>
             20
         </td>
            <td>
                <h5 style="text-align:right">$68</h5>
            </td>
            
		</tr>
        <tr style="cursor: pointer;">
          
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
           
            
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
                   <img src="UIThemeEngine/Images/Productcatalogimg1.png">
                 </span>
                        Jewelry
                   <span class="isc-set-black">(43234 54345)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                    </h5>
             </td>
      
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            28
        </td>
            <td>
                <h5 style="text-align:right">$48</h5>
            </td>
            
		
                </tr>
	</tbody>
    
        
</table>

                                            </li>
                                          
                                        


                                        </ul>

                                    </div>
            </div>
              </div>
        <!--Pagination--->
        
        <!-----Pagination--->
	</div>
	
    <div id="Tab3" class="tab-pane">
        <div class="screen-row">
            <h5 class="isc-item-title-cont-p1">Filter Items</h5>
            <div class="cell-left">
                           <div class="isc-detail-name isc-mar-top">
     <select id="cars" name="cars" aria-invalid="false" class="form-control">
    <option>Choose Brand</option>
   
  </select>
           </div>
                               <div class="isc-detail-name isc-mar-top isc-mar-lft">
     <select id="cars" name="cars" aria-invalid="false" class="from-control">
    <option>Choose Class</option>
   
  </select>
           </div>               <div class="isc-detail-name isc-mar-top isc-mar-lft">
     <select id="cars" name="cars" aria-invalid="false" class="form-control">
    <option>Choose Vendor</option>
   
  </select>
           </div>                        
                                                                   
            </div>
            <div class="cell-right"><ul class="isc-sec-lvl-cust-dd-s1 isc-entity-btn" style="position:relative;right:0px;top:7px;">
		<li><a title="View" type="button" class="isc-dd-drat-btn-s1 isc-sub-menu-list-s1  modal-toggle11"> <i class="fa fa-refresh" style="margin-left: 0;"></i></a> </li>				
     <li><a title="Calculate Price" type="button" class="isc-dd-drat-btn-s1 isc-btn-primary isc-sub-menu-list-s1 isc-sub-menu-list-s1"> Apply Filter</a> </li>
                            
                         
					</ul>
            </div>
        </div>
            <div class="isc-btm-scroll">
	<table class="isc-table isc-nested-table isc-table-bordered isc-table-fixed mar-top-10" cellspacing="0" width="100%">
	<thead>
		    <tr style="cursor: pointer;">
              
			<th style="width:40%">Product<i class="fa fa-sort-alpha-asc"></i></th>
		
      <th style="width:20%">Quantity<i class="fa fa-sort-alpha-asc"></i></th>
                <th style="width:17%">Stock Available<i class="fa fa-sort-alpha-asc"></i></th>
          <th style="width:10%">Price</th>
       
		</tr>
	</thead>
	<tbody class="isc-style-1">
		<tr style="cursor: pointer;">
         
           <td>
               
               
               <h5 class="isc-l-h-42 isc-color-p1"> <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle"><img src="UIThemeEngine/Images/WomansWear1.png"></span>Cocktail Dress
                   <span class="isc-set-black">(12345 00000)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
               </h5>
              
           </td>
           
			
        
            <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            10
        </td>
            <td>
                <h5 style="text-align:right">$55</h5>
            </td>
               </tr>
    <tr style="cursor: pointer;">
        
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
             
          
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
               <img src="UIThemeEngine/Images/Watchimg14.png">
                   </span>
                       Watch
                    <span class="isc-set-black">(23432 12211)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                      </h5>
             </td>
    
    
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
         <td>
             20
         </td>
            <td>
                <h5 style="text-align:right">$68</h5>
            </td>
            
		</tr>
        <tr style="cursor: pointer;">
          
           <td>
                <h5 class="isc-l-h-42 isc-color-p1">
           
            
               <span>
                   <input type="checkbox" name="cms" id="cms" class="isc-table-selectall" data-toggle="toggle">
                   <img src="UIThemeEngine/Images/Productcatalogimg1.png">
                 </span>
                        Jewelry
                   <span class="isc-set-black">(43234 54345)</span>
                     <span class="date  isc-role-txt isc-sm-f">Levi | Class A | Vendor Factory</span>
                    </h5>
             </td>
      
                <td>
          <ul class="isc-quantity-btn">
              <li><div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                  </li>
              <li>
  <input type="number" id="number" value="0" class="value-button"></li>
              <li>
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div></li></ul></td>
        <td>
            28
        </td>
            <td>
                <h5 style="text-align:right">$48</h5>
            </td>
            
		
                </tr>
	</tbody>
    
        
</table>

                </div>
        <!--Pagination--->
        
        <!-----Pagination--->
	</div>
    
    
</div>
                </div>
                <div class="modal-footer">
                  
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s2" data-dismiss="modal">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
        <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="mp_paid3" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">New Customer</h4>
                        </div>
                        <div class="cell-right">
                         <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close  cell-right mar-top-10"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                  <div class="screen-row">
              <div class="isc-screen-row">
 
    <div class="isc-details-sec">
        <div class="screen-row">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Customer Name</label>
           </div>
       <div class="isc-detail-name">
        <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Customer Name" aria-required="true">
    </div>
           </div>
       </div>
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Primary Email</label>
           </div>
       <div class="isc-detail-name">
        <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Primary Email" aria-required="true">
    </div>
           </div>
       </div>
      
    <div class="isc-details-sec ">
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label class="isc-f-w-600">Delivery Address</label>
           </div>
       <div class="isc-detail-name">
           <div class="isc-hr-element">
      <input type="checkbox" id="option 1" name="options" value="option 1">
  <label for="option 1">Same as billing address</label><br>
 </div>
           </div>
    </div>
           </div>
   <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Address</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
             <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Address" aria-required="true">
    
        </div>
           </div>
       </div>
        
       
   <div class="screen-row isc-pad-lft-65 mar-top-10">
       <div class="isc-33per">
         <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Country</label>
           </div>
       <div class="isc-detail-name">
 <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
     <option>Choose Country</option>
      
       
     </select></div>
           </div>
        </div>
       <div class="isc-33per">
         <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>State</label>
           </div>
       <div class="isc-detail-name">
 <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
     <option>Choose State</option>
      
       
     </select></div>
           </div>
        </div>
    <div class="isc-33per">
         <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Postal Cosd</label>
           </div>
       <div class="isc-detail-name">
 <input type="text" class="form-control isc-w-200" id="planweek" name="planweek" placeholder=" Enter Postal Code" aria-required="true"></div>
           </div>
        </div>
</div>
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label class="isc-click-show isc-color-p1 " href="#mp_Delivery" data-toggle="modal"><span><i class="fa fa-plus"></i></span> Another Address</label>
           </div>
      
           </div>
       </div>
          <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label class="isc-f-w-600">Billing Address</label>
           </div>
       <div class="isc-detail-name">
           <div class="isc-hr-element">
      <input type="checkbox" id="option 1" name="options" value="option 1">
  <label for="option 1">Same as delivery address</label><br>
 </div>
           </div>
    </div>
           </div>
   <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Address</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
             <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Address" aria-required="true">
    
        </div>
           </div>
       </div>
        
       
   <div class="screen-row isc-pad-lft-65 mar-top-10">
       <div class="isc-33per">
         <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Country</label>
           </div>
       <div class="isc-detail-name">
 <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
     <option>Choose Country</option>
      
       
     </select></div>
           </div>
        </div>
       <div class="isc-33per">
         <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>State</label>
           </div>
       <div class="isc-detail-name">
 <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
     <option>Choose State</option>
      
       
     </select></div>
           </div>
        </div>
    <div class="isc-33per">
         <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Postal Code</label>
           </div>
       <div class="isc-detail-name">
 <input type="text" class="form-control isc-w-200" id="planweek" name="planweek" placeholder=" Enter Postal Code" aria-required="true"></div>
           </div>
        </div>
</div>
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label class="isc-click-show isc-color-p1 "href="#mp_Billing" data-toggle="modal"><span><i class="fa fa-plus"></i></span> Another Address</label> 
           </div>
      
           </div>
       </div>
        </div>
              
        </div>
    
</div>

              
              </div>
                </div>
                <div class="modal-footer">
                  
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                             <button type="button" class="btn green isc-btn-pop-action-s1" data-dismiss="modal">
                                Save</button>
                            <button type="button" class="btn blue isc-btn-pop-action-s2" data-dismiss="modal">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
        <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="mp_Delivery" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Add Delivery Address</h4>
                        </div>
                        <div class="cell-right">
                         <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close  cell-right mar-top-10"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                  <div class="screen-row">
              <div class="screen-row">
 
    <div class="isc-details-sec">
     <div class="isc-hor-details" style="padding:10px;">
    
       <div class="isc-detail-name">
           <div class="isc-hr-element">
      <input type="checkbox" id="option 5" name="options" value="other" checked="">
  <label for="option 1">Add this delivery address to  customer details

</label>
      </div>
           </div>
    </div>
        <div class="screen-row mar-top-10">
                          <div class="isc-section-header-container" style="border: none; ">
                                            <div class="cell-left">

                                                <h3 class="isc-lbl-sec-hdr-med" style="cursor: pointer; margin: 0px;">Delivery Address</h3>
                                            </div>
                             
                                           
                                        </div>
                          
                      </div>
        
      <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Address</label>
           </div>
       <div class="isc-detail-name">
        <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Address" aria-required="true">
    </div>
           </div>
       </div>
   <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Country</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
           
       <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Country</option>
         
     </select> </div>
           </div>
       </div>
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Postal Zip Code</label>
           </div>
       <div class="isc-detail-name">
        <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Postal Zip Code" aria-required="true">
    </div>
           </div>
       </div>
       
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>City</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
           
       <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose City</option>
         
     </select></div>
           </div>
       </div>
   <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>State</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
           
       <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose State</option>
         
     </select></div>
           </div>
       </div>
           
        </div>
    
</div>

              
              </div>
                </div>
                <div class="modal-footer">
                  
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                             <button type="button" class="btn green isc-btn-pop-action-s1" data-dismiss="modal">
                                Save</button>
                            <button type="button" class="btn blue isc-btn-pop-action-s2" data-dismiss="modal">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>            <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="mp_Billing" tabindex="-1" role="basic" aria-hidden="false" >
        <div class="modal-dialog" style="width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Add Delivery Address</h4>
                        </div>
                        <div class="cell-right">
                         <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close  cell-right mar-top-10"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                  <div class="screen-row">
              <div class="screen-row">
 
    <div class="isc-details-sec">
     <div class="isc-hor-details" style="padding:10px;">
    
       <div class="isc-detail-name">
           <div class="isc-hr-element">
      <input type="checkbox" id="option 5" name="options" value="other" checked="">
  <label for="option 1">Add this billing address to  customer details

</label>
      </div>
           </div>
    </div>
        <div class="screen-row mar-top-10">
                          <div class="isc-section-header-container" style="border: none; ">
                                            <div class="cell-left">

                                                <h3 class="isc-lbl-sec-hdr-med" style="cursor: pointer; margin: 0px;">Billing Address</h3>
                                            </div>
                             
                                           
                                        </div>
                          
                      </div>
        
      <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Address</label>
           </div>
       <div class="isc-detail-name">
        <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Address" aria-required="true">
    </div>
           </div>
       </div>
   <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Country</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
           
       <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose Country</option>
         
     </select> </div>
           </div>
       </div>
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>Postal Zip Code</label>
           </div>
       <div class="isc-detail-name">
        <input type="text" class="form-control" id="planweek" name="planweek" placeholder=" Enter Postal Zip Code" aria-required="true">
    </div>
           </div>
       </div>
       
        <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>City</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
           
       <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose City</option>
         
     </select></div>
           </div>
       </div>
   <div class="screen-row mar-top-10">
       <div class="isc-hor-details">
       <div class="isc-label-name">
   <label>State</label>
           </div>
       <div class="isc-detail-name" style="position:relative;">
           
       <select class="select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
         <option>Choose State</option>
         
     </select></div>
           </div>
       </div>
           
        </div>
    
</div>

              
              </div>
                </div>
                <div class="modal-footer">
                  
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                             <button type="button" class="btn green isc-btn-pop-action-s1" data-dismiss="modal">
                                Save</button>
                            <button type="button" class="btn blue isc-btn-pop-action-s2" data-dismiss="modal">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="Mp_send_invoice" tabindex="-1" role="basic" aria-hidden="false" style="display: none;">
        <div class="modal-dialog" style="width: 765px;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="screen-row">
                        <div class="cell-left">
                            <h4 class="modal-title">Send Invoice</h4>
                        </div>
                        <div class="cell-right">
                            <a data-dismiss="modal"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
                <div class="modal-body pad-20">
                    <div class="screen-row">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">To : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" placeholder="Enter Email Address">
                                                                </div>
                                                            </div>
                    <div class="screen-row mar-top-10">
                                                                <div class="div-col-20per">
                                                                    <label class="mar-top-5">CC : </label>
                                                                </div>
                                                                <div class="div-col-50per">
                                                                    <input type="text" class="form-control" placeholder="Enter Email Address">
                                                                </div>
                                                            </div>
                </div>
                <div class="modal-footer">
                     
                    <div class="cell-right pad-lft-max">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal">
                                Send</button>
                        </div>
                    </div>
                    <div class="cell-right">
                        <div class="isc-pop-btn-cen-cell-s1">
                            <button type="button" class="btn blue isc-btn-pop-action-s1" data-dismiss="modal" style="background-color:#95a5a6 !important;">
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.mokdmadal-dialog -->
        </div>
    </div>
    <div class="modal fade isc-popup-detail-form-s1 in Mp_Relese" id="MP_Email" tabindex="-1" role="basic" aria-hidden="false" style="display:none;width:90%;">
        <div class="modal-dialog" style="width:90%;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="div-col-85per">
                        <h4 class="modal-title"><i class="fa fa-external-link-square" aria-hidden="true"></i>Email</h4>
                    </div>
                 
                    <div class="div-col-15per">
                        <a data-dismiss="modal" aria-hidden="true" href="#"><i class="fa fa-times-circle isc-popup-close cell-right mar-top-10"></i></a>
                        
                          <a title="Send Email" href="CreateInvoice.aspx" class="isc-dd-drat-btn-s1 isc-send-email-btn isc-btn-primary isc-sub-menu-list-s1 isc-sub-menu-list-s1 cell-right mar-rig-10">Send Email</a>
                         <a title="Pay Now "  href="PayNow.aspx" class="isc-dd-drat-btn-s1 isc-send-email-btn isc-btn-primary isc-sub-menu-list-s1 isc-sub-menu-list-s1 cell-right mar-rig-10">Pay Now</a>
                    </div>
                     
                </div>
                <div class="modal-body isc-hor-popup-field  pad-20 isc-pop-select2">
                <div class="modal-content isc-style-1">
                    <div class="isc-100per  isc-invoice-temp1">
                    <div class="isc-45per ">
                       <div class="isc-screen-row mar-top-15">
     
   <label>Primary Email</label>
      
   <div class="screen-row isc-mar-t1">

                                        <table class="isc-set-bdr isc-table-read-optimal isc-tab-var isc-table-sorter-s1">
                                            <tbody>


                                                <tr style="cursor: pointer;">


                                                    <td colspan="2">
                                                        
                                                            <label for="exist-values">
                                                                <input type="hidden" id="exist-values" class="tagged form-control" data-removebtn="true" name="tag-2" value="abcltd@gamil.com">
                                                               
                                                            </label>
                                                        
                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>

</div>

        
        <div class="isc-screen-row mar-top-15">
    
   <label>CC</label>
          
   <div class="screen-row isc-mar-t1">

                                        <table class="isc-set-bdr isc-table-read-optimal isc-tab-var isc-table-sorter-s1">
                                            <tbody>


                                                <tr style="cursor: pointer;">


                                                    <td colspan="2">
                                                        
                                                            <label for="exist-values">
                                                                <input type="hidden" id="exist-values" class="tagged1 form-control" data-removebtn="true" name="tag-2" value="john@gmail.con,abcltd@gamil.com">
                                                               
                                                            </label>
                                                        
                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>

</div>
        
                           
      <div class="screen-row mar-top-15">
                            
   <label>Subject</label>
        
                          
                           
                           <textarea placeholder="" rows="4" class="form-control isc-txt-box-wid" style="resize:none;width:100% !important" >You have an invoice form &lt;&lt;isc&gt;&gt; due on &lt;&lt;04/12/2021&gt;&gt;</textarea>
                            </div>
                               
                           <h5 class="isc-agil-scr-tile-con-lbl-s1 mar-top-15" href="#coll_31" data-toggle="collapse"><i class="fa fa-angle-down pad-rgt-5 cell-right"></i>Content</h5>
             
        <div class="screen-row mar-top-10 collapse in"id="coll_31"style="height: auto;">
        
           
            <div class="isc-screen-row">
                            <div id="editor">
                              
                              <p>	Hi &lt;&lt;Vendor&gt;&gt;</p>
                                 <p class="mar-top-15">Thanks for your Business &lt;&lt;Invoice Date&gt;&gt;</p>
                                <p class="mar-top-15">The Invoice INV001 is attached with this email for your reference. You can choose the way out and pay online.																										
</p>
                                <p  class="isc-set-clr-blue">	<u>https://arcbill-qa.archarina.com/PaymentMethod.aspx?billID=26&&userBillId=4030	</u>																			
</p>
<p class="mar-top-15">	Here's an overview of the invoice for your reference												
</p>
                                <p class="mar-top-15">Invoice Overview				
</p>
                                <p>Invoice Number : 	<span> &lt;&lt;INV001&gt;&gt;</span>		
</p>   <p>Invoice Date : 	<span> &lt;&lt;22/02/2021&gt;&gt;</span>		
</p>
                                <p>Total Amount : 	<span> &lt;&lt;$500&gt;&gt;</span>		
</p>
                                <p class="mar-top-15">It was great working. Looking forward to working with you again.															
</p>
                                     
                                </div>
              
                        </div>
        
                        <div class="screen-row ">
                                      <div class="isc-acc-box-inner-txt isc-mar-top">
                                      <p class="isc-f-w-br"> Online Payment</p>
                                     

                           
    </div>
                                  </div>
                        <div class="screen-row mar-top-10">
                            <div class="isc-hor-details">
      <div class="isc-40per">
       <div class="isc-detail-name">
           <div class="isc-hr-element">
   <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label for="vehicle1">Credit Card
    
  </label>
          
    </div>
           </div>
                 </div>
                                <div class="div-col-60per isc-set-wid-img">
                                 <img src="images/visa1.png" />
                                   <img src="images/mastercard.png" /></div>
           </div>
                            
                            
        </div>
                        <div class="screen-row mar-top-10">
                            <div class="isc-hor-details">
      <div class="isc-40per">
       <div class="isc-detail-name">
           <div class="isc-hr-element">
   <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label for="vehicle1">Bank Transfer</label>
 
    </div>
           </div>
           </div>
                            <div class="div-col-60per isc-set-wid-img">
                                <img src="images/BankTransfer.png" />
                            </div>
        </div>
                        </div>
            </div>
                        </div>
                         
                    <div class="isc-55per isc-pad-lft isc-bor-lft-pos" style="border-left:unset;">
                   <div class="isc-temp-cont">
                              <div class="isc-temp-head-cont">
                                  <div class="screen-row">
                                      <div class="div-col-70per">
                                          <div class="">
				<div class="cell-left">
                    <div id="dvPassport">
                    <img src="Images/CompanyLogo.png" class="isc-set-img-width">
                        </div>
                </div>
                                              </div>
                                           
                                              
					<h1 class="isc-tail-h1-p1 mar-btm-0 mar-top-20 ">
                        
                        INVOICE</h1>
                                           <span class="isc-entity-sm-title  isc-f-16">IN_5578 | 07-08-2021</span>
                            
				</div>
                                      <div class="div-col-25per isc-primary-title cell-right ">
                                        <div class="isc-screen-row">
    <div class="isc-acc-box-inner-txt isc-mar-top cell-right">
                                      <p class="isc-f-w-br">Net Amount :</p>
                                     <div class=" isc-lft-hdr">
           <h2 class="isc-thm-hme-kpi-t2  isc-color-p1">$13,715.52</h2>
               
               </div>

                           
    </div>
        </div>
                                      </div>
                                    
                                   </div>
                                  
                              </div>
                              <div class="isc-temp-bdy-cont">
                              <div class="screen-row">
                                      
                                    <div class="isc-70per isc-primary-title  ">
                                        <div class="isc-screen-row">
    <div class="isc-acc-box-inner-txt ">
                                      <p class="isc-f-w-br">Bill to</p>
                                     <div class=" isc-lft-hdr">
               <p>425 Lynn Street,</p>
               <p>Boston,Massachusetts,US</p>
            
               </div>

                           
    </div>
        </div>

                                      </div>
                                        <div class="div-col-20per">
                                          <span class="isc-entity-sm-title">Reference Order</span>
                                             
                                      </div>
                                       <div class="div-col-10per">
  <span class="isc-entity-sm-title">PO_678</span>
                                             
                                      </div>
                               
                                  
                                  </div>
                                  <div class="screen-row">
                                      
                                    <div class="isc-75per isc-primary-title  ">
                                        <div class="isc-screen-row">
    <div class="isc-acc-box-inner-txt isc-mar-top ">
                                      <p class="isc-f-w-br">Ship to</p>
                                     <div class=" isc-lft-hdr">
                                          <p>Trinity Customer</p>
                                          <p>trinitycustomer@gmail.com</p>
                                          <p>607-341-3338</p>
               <p>4666 Chenoweth Drive,Minor Hill,</p>
               <p>Tennessee,38473,US</p>
            
               </div>

                           
    </div>
        </div>

                                      </div>
                             
                                  </div>
                                  <div class="screen-row">
                                      <table class="isc-t300-hrm-lst isc-table isc-table-row  isc-table-bordered mar-top-30">
                                                      <thead>
                                                          <tr>
                                                              <th style="width:30%;" title="Product">Product</th>
                                                              <th style="width:15%;text-align:right" title="Unit Price">Unit Price</th>
                                                              <th style="width:15%;text-align:center" title="QTY">QTY</th>
                                                              <th style="width:20%;text-align:right" title="Amount">Amount</th>
                                                          </tr>
                                                      </thead>
                                                      <tbody>
                                                          <tr>
                                                              <td>Writing Services</td>
                                                              <td style="text-align:right">
                                                                9,900.00	
                                                              </td>
                                                              <td style="text-align:center">1</td>
                                                              <td style="text-align:right">9,999.00</td>
                                                          </tr>
                                                        <tr>
                                                              <td>Custom Icon Packages</td>
                                                              <td style="text-align:right">
                                                             975.00	
                                                              </td>
                                                              <td style="text-align:center">2</td>
                                                              <td style="text-align:right">1,950.00</td>
                                                          </tr>
                                                          <tr>
                                                              <td>Gandhi mouse pad</td>
                                                              <td style="text-align:right">
                                                           99.00	
                                                              </td>
                                                              <td style="text-align:center">3</td>
                                                              <td style="text-align:right">297.00</td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                  </div>
                                  <div class="screen-row">
                                      <div class="isc-60per">
                                          <p></p>
                                      </div>
                                      <div class="div-col-40per">
                                          <table class="isc-t300-hrm-lst isc-table isc-table-row  isc-set-bdt-dot">
                                                     
                                                      <tbody>
                                                          <tr>
                                                              <td class="isc-color-p1">Sub Total</td>
                                                              <td style="text-align:right">
                                                               297.00	
                                                              </td>
                                                             
                                                          </tr>
                                                          <tr>
                                                              <td class="isc-color-p1">Discount</td>
                                                              <td style="text-align:right">
                                                               197.00	
                                                              </td>
                                                             
                                                          </tr>
                                                         <tr>
                                                              <td class="isc-color-p1">Shipping Charges</td>
                                                              <td style="text-align:right">
                                                               397.00	
                                                              </td>
                                                             
                                                          </tr> 
                                                      <tr>
                                                              <td class="isc-color-p1">Tax</td>
                                                              <td style="text-align:right">
                                                               4,469.00
                                                              </td>
                                                             
                                                          </tr>
                                                             <tr>
                                                              <td class="isc-color-p1">Total</td>
                                                              <td style="text-align:right">
                                                               $13,715.52
                                                              </td>
                                                             
                                                          </tr>
                                                   <tr style="cursor: pointer;">
                                                          
                                                             <td colspan="2"> 
                                                                 <h4 class="isc-tck-tlt" style="font-weight:600;">Presale Order Total (In Words)</h4>
                                                                <h4 class="isc-tck-tlt">Fourty Two Dollers Only</h4>
                                                            </td>
                                                           
                                                            
                                                            
                                                           
                                                        </tr>
                                                      </tbody>
                                                  </table>
                                      </div>
                                  </div>
                                  <div class="screen-row mar-top-50">
                                      <div class="isc-acc-box-inner-txt isc-mar-top">
                                     <h3 class="isc-lbl-sec-hdr-med" style="margin: 0px;">Terms and Conditions :</h3>
                                     <div class=" isc-lft-hdr">
               <p>Payment is due within 15 days</p>
          
           
               </div>

                           
    </div>
                                  </div>
                                    <hr class="isc-border-p1">
                             <div class="screen-row mar-top-10">
                          <div class="isc-section-header-container isc-pad-lft-0" style="border: none; ">
                                            <div class="cell-left">

                                                <h3 class="isc-lbl-sec-hdr-med isc-color-p1 " style=" margin: 0px;">BMobile</h3>
                                            </div>
                                            
                                        </div>
                    <div class="div-col-25per isc-primary-title  ">
                                        <div class="isc-screen-row">
    <div class="isc-acc-box-inner-txt">
                                     
                                     <div class=" isc-lft-hdr">
               <p>4323 Alexander Avenue,</p>
               <p>Concord,California,US</p>
           <p class="isc-lbl-tile-header-shedule-sur-s1 isc-add-cont">Website : www.Bmobile.com </p>
               </div>

                           
    </div>
        </div>
                                      </div>
                      </div>
                          </div>
                              </div> </div>
                      
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
          var tags = new Tags('.tagged');
          var tags = new Tags('.tagged1');

          document.getElementById('get').addEventListener('click', function (e) {
              e.preventDefault();
              alert(tags.getTags());
          });
          document.getElementById('clear').addEventListener('click', function (e) {
              e.preventDefault();
              tags.clearTags();
          });
          document.getElementById('add').addEventListener('click', function (e) {
              e.preventDefault();
              tags.addTags('New');
          });
          document.getElementById('addArr').addEventListener('click', function (e) {
              e.preventDefault();
              tags.addTags(['Steam Machines', 'Nintendo Wii U', 'Shield Portable']);
          });
          document.getElementById('destroy').addEventListener('click', function (e) {
              e.preventDefault();
              if (this.textContent === 'destroy') {
                  tags.destroy();
                  this.textContent = 'reinit';
              } else {
                  this.textContent = 'destroy';
                  tags = new Tags('.tagged');
              }

          });
      </script>  
    <script>
        var editor = new Jodit('#editor', {
            "uploader": {
                "insertImageAsBase64URI": true
            }
        });
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
    
</asp:Content>
