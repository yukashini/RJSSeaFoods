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
    public partial class ClientAdmin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetAdminScreenData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = ClientAdminLogics.FetchAdminScreenData(Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertClientAdmin(ClientAdminObjects ClientDetails)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = ClientAdminLogics.ClientAdminInsertProcess(ClientDetails, Login.Connection);
                
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
        public static int UpdateClientAdmin(ClientAdminObjects ClientDetails)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = ClientAdminLogics.ClientAdminUpdateProcess(ClientDetails, Login.Connection);
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
        public static int DeleteClientAdmin(ClientAdminObjects ClientDetails)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = ClientAdminLogics.ClientAdminChangeStateProcess(ClientDetails, Login.Connection);
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
        public static int MultipleStateChange(List<ClientAdminObjects> LstClientDetails)
        {

            int PostStatus = 0;
            try
            {
                if (LstClientDetails.Count > 0)
                {
                    foreach (ClientAdminObjects  dataClientDetails in LstClientDetails)
                    {
                        PostStatus = ClientAdminLogics.ClientAdminChangeStateProcess(dataClientDetails, Login.Connection);
                    }
                }
               
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }
    }
}