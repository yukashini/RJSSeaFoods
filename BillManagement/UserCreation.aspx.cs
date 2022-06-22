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
    public partial class UserCreation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetUserCreateScreenData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = CreateUser.FetchUserCreateMasterData(Login.Connection);
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
        public static string GetRolePermissions(int selectedRole)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = CreateUser.FetchRolePermssions(selectedRole,Login.Connection);
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
        public static int InsertApllicationUser(ApplicationUser CustomUser)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = CreateUser.UserInsert(CustomUser, Login.Connection);
                int postStatus = ApplicationUsers.InsertAuditlog("Created", "New User" + " " + CustomUser.FirstName + " " + "added", "Users", Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetUserEditData(int userID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = CreateUser.FetchUserEditData(userID,Login.Connection);
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
        public static string GetApplicationUsersNames()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = CreateUser.FetchUserNames(Login.Connection);
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
        public static int UpdateApplicationUser(ApplicationUser CustomUser)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = CreateUser.UserUpdate(CustomUser, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }




    }
}