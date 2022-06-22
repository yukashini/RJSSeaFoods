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
    public partial class ViewCustomer360 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetCustomerScreenData(int customerId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = Invoice360.FetchCustomerInfoScreenData(customerId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertNotes(string notes, int CustomerID)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Invoice360.NotesInsert(notes, CustomerID, Login.Connection);

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
                postStatus = Invoice360.NotesUpdate(notes, CustomerID, notesId, Login.Connection);

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
                postStatus = Invoice360.InsertDocument(FileObject, Login.Connection);

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
        public static int InsertCustomerContact(Customercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Invoice360.InsertContact(ContactObj, Login.Connection);

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
                postStatus = Invoice360.DeleteContact(ContactObj, Login.Connection);

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
                postStatus = Invoice360.UpdateContact(ContactObj, Login.Connection);

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