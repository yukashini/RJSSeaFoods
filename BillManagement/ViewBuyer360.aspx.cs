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
    public partial class ViewBuyer360 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBuyerScreenData(int BuyerId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = Buyer360.FetchBuyerInfoScreenData(BuyerId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertNotes(string notes, int BuyerId)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Buyer360.NotesInsert(notes, BuyerId, Login.Connection);

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
        public static int UpdateNotes(string notes, int BuyerId, int notesId)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Buyer360.NotesUpdate(notes, BuyerId, notesId, Login.Connection);

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
        public static int InsertBuyerDocument(BuyerDocument FileObject)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Buyer360.InsertDocument(FileObject, Login.Connection);

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
        public static int InsertBuyerContact(Buyercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Buyer360.InsertContact(ContactObj, Login.Connection);

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
        public static int DeleteBuyerContact(Buyercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Buyer360.DeleteContact(ContactObj, Login.Connection);

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
        public static int UpdateBuyerContact(Buyercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Buyer360.UpdateContact(ContactObj, Login.Connection);

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