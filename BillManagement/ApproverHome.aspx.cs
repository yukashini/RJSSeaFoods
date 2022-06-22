using BillManagement.BusinessLogic;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ISCLibrary.Utilities;

namespace BillManagement
{
    public partial class ApproverHome : System.Web.UI.Page
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
            catch(Exception ex)
            {
                  ExceptionLogEntry.LogException(ex);
                Response.Redirect("RJSLogin.aspx");
            }
           

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

        public static string GetApproverHomeList()
        {
            string data = string.Empty;
            DataSet ds = new DataSet();
            try
            {
                ds = ApproverHomes.GetApproverHomeData(Login.Connection);
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

        
     


    }
}