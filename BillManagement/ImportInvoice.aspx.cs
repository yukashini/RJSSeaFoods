using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BillManagement
{
    public partial class ImportInvoice : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertExcelData(List<InvoiceLst> invoiceLsts)
        {
            int PostStatus = 0;
            try
            {
                PostStatus = BillCategoryLogics.SaveBulkExcelData(invoiceLsts, Login.Connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertExcelDistinctData(List<InvoiceLstdistinct> invoiceDistinctLsts)
        {
            int PostStatus = 0;
            try
            {
                PostStatus = BillCategoryLogics.SaveBulkExcelData(invoiceDistinctLsts, Login.Connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
            }
            return PostStatus;
        }


        

    }
}