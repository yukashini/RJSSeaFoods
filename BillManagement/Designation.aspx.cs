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
    public partial class Designation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoicelst(DesignationINvoiceFilterfilter list)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DesignationLogics.GetInvoicelst(list, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveDesignation(DesignationObjects objDesignation)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = DesignationLogics.InsertDesignation(objDesignation, Login.Connection);

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
        public static int DeleteDesignation(int DesignationID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = DesignationLogics.DeleteDesignation(DesignationID, Login.Connection);

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
        public static int UpdateDesignation(DesignationObjects objDesignation)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = DesignationLogics.UpdateDesignation(objDesignation, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objDesignation.DesignationID + " ", "Loading List", Login.Connection);
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
        public static string GetEditDesignationData(int DesignationID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DesignationLogics.FetchDesignationData(DesignationID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetFilterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DesignationLogics.FetchCreateDesignationMasterData(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
    }


}
