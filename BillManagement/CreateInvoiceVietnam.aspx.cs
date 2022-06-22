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
    public partial class CreateInvoiceVietnam : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetFilterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CreateInvoiceLogicVietnam.FetchCreateInvoiceVietnamMasterData(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertBill(List<CreateBill> invoicelist)
        {
            int postStatus = 0;
            try
            {
                postStatus = CreateInvoiceLogic.CreateNewBill(invoicelist, Login.Connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveInvoice(InvoiceObjectsVietnam objInvoice)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = CreateInvoiceLogicVietnam.InsertInvoice(objInvoice, Login.Connection);
                //int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Customer"+" "+ objCustomer.CustomerName+ " "+"added", "Customer List", Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoicdetails(int InvoiceId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CreateInvoiceLogicVietnam.GetInvoInVoicdetails(InvoiceId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateInvoicedata(CreateBillobj objInvoice)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = CreateInvoiceLogicVietnam.UpdateInvoice(objInvoice, Login.Connection);
                //int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objCustomer.CustomerName + " ", "Customer List", Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateARInvoicedata(UpdateinvoiceObjects objInvoice)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = CreateInvoiceLogic.UpdateARInvoice(objInvoice, Login.Connection);
                //int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objCustomer.CustomerName + " ", "Customer List", Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteInvoice(int DeleteInvoiceid)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = CreateInvoiceLogic.DeleteInvoiceData(DeleteInvoiceid, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetCustomerMaildetails(int Customerid)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CreateInvoiceLogic.GetCustomerEmaildetails(Customerid, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetProductData(int Invoiceid)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CreateInvoiceLogic.GetproductData(Login.Connection,Invoiceid);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveCustomer(CustomerarObjects objCustomer)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = CreateInvoiceLogic.InsertCustomer(objCustomer, Login.Connection);
                
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetshipperData(int InvoiceId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CreateInvoiceLogic.FetchShipperData(InvoiceId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static string GetConsigneeData(int InvoiceId)
        //{
        //    DataSet ds = new DataSet();
        //    string data = string.Empty;
        //    try
        //    {
        //        data = CreateInvoiceLogic.FetchConsigneedata(InvoiceId, Login.Connection);

        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionLogEntry.LogException(ex);
        //    }
        //    return data;
        //}
    }
}