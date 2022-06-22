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
    public partial class GLImport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetClientGLCodes()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = GLCodeLogics.FetchGLListData(Login.Connection);
            }
            catch (Exception ex)
            {
               
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteGL(int glID)
        {
            int postStatus = 0;

            try
            {
                postStatus = GLCodeLogics.DeleteClientGLCode(glID, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        //Private
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [Obsolete]
        public static int InsertExcelData(List<GLCode> lstGLCode)
        {
            int PostStatus = 0;
            try
            {
                PostStatus = GLCodeLogics.SaveBulkExcelData(lstGLCode, Login.Connection);
                int postStatus = ApplicationUsers.InsertAuditlog("Create", "Upload GL Code", "GL Import", Login.Connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetGLDataList(BillListFilter billFilter)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = GLCodeLogics.GetGLList(billFilter, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }
}