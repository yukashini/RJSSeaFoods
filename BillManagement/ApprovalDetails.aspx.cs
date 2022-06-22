using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ISCLibrary.Utilities;
using BillManagement.BusinessLogic;
using System.Data;
using System.Web.Script.Services;
using BillManagement.BussinessObjects;

namespace BillManagement
{
    public partial class ApprovalDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                int? accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (accountID == null || clientID == null)
                {
                    Response.Redirect("RJSLogin.aspx");
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                Response.Redirect("RJSLogin.aspx");
            }

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetApprovalBillDetails(int billId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = BillApprovalDetails.CollectApprovalBillDetails(billId, Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
            }
            catch(Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int BillApprovalOrReject(BillApproval BillDetails)
        {
            int postStatus = 0;
            try
            {
                postStatus = BillApprovalDetails.ProcessBillAprovalOrReject(BillDetails, Login.Connection);
            }
            catch(Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }
    }
}