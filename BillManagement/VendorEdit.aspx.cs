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
    public partial class VendorEdit : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorEditScreenData(int vendorID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorEditLogics.FetchVendorInfoScreenData(vendorID,Login.Connection);
                
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorContacts(int vendorID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorEditLogics.FetchVendorConatcts(vendorID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorNotes(int vendorID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorEditLogics.FetchVendorNotes(vendorID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorDocuments(int vendorID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorEditLogics.FetchVendorDocuments(vendorID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertVendorContact(VendorContacts ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = VendorEditLogics.InsertContact(ContactObj, Login.Connection);
               
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
        public static int UpdateVendorContact(VendorContacts ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = VendorEditLogics.UpdateContact(ContactObj, Login.Connection);
                
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
        public static int DeleteVendorContact(VendorContacts ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = VendorEditLogics.DeleteContact(ContactObj, Login.Connection);
               
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
        public static int InsertNotes(string notes,int vendorID)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = VendorEditLogics.NotesInsert(notes,vendorID, Login.Connection);

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
        public static int UpdateNotes(string notes, int vendorID,int notesId)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = VendorEditLogics.NotesUpdate(notes, vendorID, notesId, Login.Connection);

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
        public static int InsertVendorDocument(VendorDocuments FileObject)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = VendorEditLogics.InsertDocument(FileObject, Login.Connection);
                
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