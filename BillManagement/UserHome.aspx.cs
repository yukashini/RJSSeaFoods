using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Services;
using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling.Logging;


namespace BillManagement
{
    public partial class Home : System.Web.UI.Page
    {
        public static string Connection = Convert.ToString(ConfigurationManager.ConnectionStrings["dbConnection"]);
     
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
            catch(Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                Response.Redirect("Login.aspx");
            }
           
           
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetUserHomeMasterData(int clientID,int accountID)
        {
           

                 string AccountID = HttpContext.Current.Session["AccountID"].ToString();
                 string ClientID = HttpContext.Current.Session["ClientID"].ToString();
                 int account = Convert.ToInt32(AccountID);
                 int client = Convert.ToInt32(ClientID);
            string data = string.Empty;
            try
            {

                if(account!=null && account != 0)
                {
                    data = UserHome.GetMasterDetailsData(client, account, Connection);
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
        public static string GetUserHomeBillData(int accountID)
        {
            string AccountID = HttpContext.Current.Session["AccountID"].ToString();
            int account = Convert.ToInt32(AccountID);
            string data = string.Empty;
            try
            {
                data = UserHome.GetUserHomeBillDetails(account, Connection);
            }
            catch(Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }

}