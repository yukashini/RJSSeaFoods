using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using ISCLibrary.Utilities;
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
    public partial class ViewCustomer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetAllBillList(AllBilllist allBilllist)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CustomerViewLogic.GetAllBillList(allBilllist, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetCustomerlistData(string CustomerId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = CustomerViewLogic.GetGetBillListData(CustomerId, Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertCustomerContact(Customercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = CustomerViewLogic.InsertContact(ContactObj, Login.Connection);

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
        public static int DeleteCustomerContact(Customercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = CustomerViewLogic.DeleteContact(ContactObj, Login.Connection);

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
        public static int UpdateCustomerContact(Customercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = CustomerViewLogic.UpdateContact(ContactObj, Login.Connection);

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
        public static int InsertCustomerDocument(CustomerDocument FileObject)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = CustomerViewLogic.InsertDocument(FileObject, Login.Connection);

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
        public static int InsertNotes(string notes, int CustomerID)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = CustomerViewLogic.NotesInsert(notes, CustomerID, Login.Connection);

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
        public static int UpdateNotes(string notes, int CustomerID, int notesId)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = CustomerViewLogic.NotesUpdate(notes, CustomerID, notesId, Login.Connection);

            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

    }
}