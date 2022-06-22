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
    public partial class RoleCreation : System.Web.UI.Page
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
        public static string GetCreateRoleScreenData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = Role.FetchCreateRoleScreenData(Login.Connection);
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


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertApllicationRole(List<ApplicationRole> CustomRole)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = CreateRole.RoleInsert(CustomRole, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetRoleEditDetails(int editRoleID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = CreateRole.FetchRoleEditData(editRoleID, Login.Connection);
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

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateApllicationRole(List<ApplicationRole> CustomRole)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = CreateRole.RoleUpdate(CustomRole, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

    }
}