using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BillManagement
{
    public partial class ApplicationMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            bool IsSSOEnabled = Convert.ToBoolean(ConfigurationManager.AppSettings["isssoenabled"]);
            if (IsSSOEnabled)
            {
                if (Request.IsAuthenticated)
                {
                    

                    if (Session["AccountID"] != null && Session["AccountID"] != null)
                    {
                        Int32 RJSSessionTimeout = Convert.ToInt32((ConfigurationManager.AppSettings["arcbillsessiontimeout"].ToString()));
                        Session.Timeout = RJSSessionTimeout;
                    }

                    if (HttpContext.Current.Session["AccountID"] == null)
                    {
                        int? userID = null;
                        if (HttpContext.Current.Session != null && HttpContext.Current.Session["AccountID"] != null)
                        {
                            userID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        }
                        if (userID == null)
                        {
                            Response.Redirect("RJSLogin.aspx?rst=true", false);
                        }
                    }
                }
                else
                {
                    
                    Response.Redirect("RJSLogin.aspx?rst=true", false);
                    Context.ApplicationInstance.CompleteRequest();
                }
            }
            else
            {
                if (Session["AccountID"] != null && Session["Role"] != null)
                {
                    Session.Timeout = 60;
                    int accountID = Convert.ToInt32(Session["AccountID"]);
                    string query = string.Empty;
                    query = @"SELECT * FROM Tbl_Accounts 
                           LEFT JOIN Tbl_Client
                           ON Tbl_Accounts.ClientID=Tbl_Client.ClientID  
                           WHERE
                           Tbl_Accounts.AccountID='" + accountID + "' AND Tbl_Accounts.IsActive=50042 AND  Tbl_Client.Status=50059";
                    DataTable dt = SqlQueryExecutor.ReadNoParams(query, Login.Connection);
                    if (dt.Rows.Count < 1)
                    {
                        Session.Clear();
                        Response.Redirect("RJSLogin.aspx");
                    }
                }
                else
                
                {
                    Response.Redirect("RJSLogin.aspx?isSessionOut=0");
                }
            }
            


        }

       
    }
}