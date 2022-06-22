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
    public partial class ClientSignup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetClientAdminSignUpScreenData(int linkID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = ClientSignUpLogics.FetchAdminSignUpScreenData(linkID,Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateAdminCredentials(ClientSignUpObjects PassWordDetails)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = ClientSignUpLogics.UpdateAdminPassword(PassWordDetails, Login.Connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoicemaildetails(int BillId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = ClientSignUpLogics.GetInvoInVoicEmaildetails(BillId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
    }
}