using BillManagement.BusinessLogic;
using ISCLibrary.Utilities;
using Microsoft.Practices.EnterpriseLibrary.Logging;
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
    public partial class ApprovalSummarList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                int? accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (accountID == null || clientID == null)
                {
                    Response.Redirect("Login.aspx");
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                Response.Redirect("Login.aspx");
            }

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetApprovalSummaryMasterData()
        {
            string AccountID = HttpContext.Current.Session["AccountID"].ToString();
            string ClientID = HttpContext.Current.Session["ClientID"].ToString();
            int account = Convert.ToInt32(AccountID);
            int client = Convert.ToInt32(ClientID);
            string data = string.Empty;
            DataSet ds = new DataSet();
            try
            {

                if (account != null && account != 0)
                {
                    ds = ApprovalSummary.GetMasterDetailsData(client,Login.Connection);
                }
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
                //if (Logger.IsLoggingEnabled())
                //    Logger.Write(new VerboseLogEntry("Get GetApprovalSummaryMasterData Request Completed", 1, "Approver Requests"));
            }
            catch (Exception ex)
            {
                ISCExceptionService.SendException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetApprovalSummaryList()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;

            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                ds = ApprovalSummary.GetInvoiceData(clientID, Login.Connection);
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
    }
}