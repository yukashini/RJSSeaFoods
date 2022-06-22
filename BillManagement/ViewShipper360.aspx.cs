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
    public partial class ViewShipper360 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetShipperScreenData(int ShipperId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = Shipper360.FetchShipperInfoScreenData(ShipperId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertNotes(string notes, int ShipperId)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.NotesInsert(notes, ShipperId, Login.Connection);

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
        public static int UpdateNotes(string notes, int ShipperId, int notesId)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.NotesUpdate(notes, ShipperId, notesId, Login.Connection);

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
        public static int InsertShipperDocument(ShipperDocument FileObject)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.InsertDocument(FileObject, Login.Connection);

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
        public static int InsertShipperBank( ShipperBank BankObj)
         {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.InsertBank(BankObj, Login.Connection);

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
        public static int UpdateShipperBank(ShipperBank BankObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.UpdateBank(BankObj, Login.Connection);

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
        public static int DeleteShipperBank(ShipperBank BankObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.DeleteBank(BankObj, Login.Connection);

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
        public static int InsertShipperContact(Shippercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.InsertContact(ContactObj, Login.Connection);

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
        public static int DeleteShipperContact(Shippercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.DeleteContact(ContactObj, Login.Connection);

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
        public static int UpdateShipperContact(Shippercontact ContactObj)
        {
            int postStatus = 0;
            string data = string.Empty;
            try
            {
                postStatus = Shipper360.UpdateContact(ContactObj, Login.Connection);

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