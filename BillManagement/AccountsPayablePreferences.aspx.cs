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
    public partial class AccountsPayablePreferences : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveConfigurations(CofigurationObjects Configs)
        {
           
            int postStatus = 0;
            try
            {
                postStatus = ConfigurationLogics.InsertConfigs(Configs, Login.Connection);

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
        public static int SaveCustomApproverConfigurations(CustomApprovalConfigurationObjects Configs)
        {

            int postStatus = 0;
            try
            {
                postStatus = ConfigurationLogics.InsertCustomConfigs(Configs, Login.Connection);

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
        public static int DeleteCustomConfiguration(int configID)
        {

            int postStatus = 0;
            try
            {
                postStatus = ConfigurationLogics.DeleteCustomConfigs(configID, Login.Connection);

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
        public static int UpdateCustomApproverConfigurations(CustomApprovalConfigurationObjects Configs)
        {

            int postStatus = 0;
            try
            {
                postStatus = ConfigurationLogics.UpdateCustomConfigs(Configs, Login.Connection);

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
        public static string GetClientConfigurations()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = ConfigurationLogics.FetchClientConfigDetails(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetSlabs(float firstAmount, float secondAmount,int editID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = ConfigurationLogics.FetchClientAmountSlabs(firstAmount,secondAmount, editID,Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
    }
}