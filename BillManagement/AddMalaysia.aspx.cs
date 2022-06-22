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
    public partial class AddMalaysia : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetFilterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = MalaysiaLogics.FetchCreateMalaysiaMasterData(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveMalaysia(Malaysia objMalaysia)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = MalaysiaLogics.InsertMalaysia(objMalaysia, Login.Connection);

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
        public static int UpdateMalaysia(Malaysia objMalaysia)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = MalaysiaLogics.UpdateMalaysia(objMalaysia, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" +" "+ objMalaysia.ProductionCode + " ", "Malaysia List", Login.Connection);
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
        public static string GetEditMalaysiaData(int LabelID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = MalaysiaLogics.FetchMalaysiaData(LabelID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBuyerData(int BuyerID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = MalaysiaLogics.FetchBuyerData(BuyerID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
    }
}