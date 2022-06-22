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
    public partial class AddBillCategory : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveCategory(GLCode ObjGLCategory)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = GLCodeLogics.InsertGlCategory(ObjGLCategory, Login.Connection);

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
        public static string GetCategoryData(int catgoryID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = GLCodeLogics.FetchCategoryDetail(catgoryID,Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetExistingGL()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = GLCodeLogics.FecthExistingGL(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateCategory(GLCode ObjGLCategory)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = GLCodeLogics.UpdateGlCategory(ObjGLCategory, Login.Connection);

            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }
    }
}