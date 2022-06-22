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
    public partial class AuditLog : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetAutidlog(Auditlog auditlog)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = AudilogLogic.GetAuditlog(auditlog, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetUserlistData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = AudilogLogic.GetUserlistData(Login.Connection);
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
        public static int InsertLoging()
        {
            int PostStatus = 0;
            try
            {
                PostStatus = ApplicationUsers.InsertAuditlog("Log-Out", "Logged Out", "Vendor", Login.Connection); ;
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertSession()
        {
            int PostStatus = 0;
            try
            {
                PostStatus = ApplicationUsers.InsertAuditlog("Session Out", "Session Out after Idle", "Approvals", Login.Connection); ;
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }
    }
}