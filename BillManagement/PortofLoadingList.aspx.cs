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
    public partial class PortofLoadingList : System.Web.UI.Page
    {
            protected void Page_Load(object sender, EventArgs e)
            {

            }

            [System.Web.Services.WebMethod(EnableSession = true)]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public static string GetInvoicelst(INvoiceFilterfilter list)
            {
                DataSet ds = new DataSet();
                string data = string.Empty;
                try
                {
                    data = PortofLoadingListLogics.GetInvoicelst(list, Login.Connection);

                }
                catch (Exception ex)
                {
                    ExceptionLogEntry.LogException(ex);
                }
                return data;
            }
            [System.Web.Services.WebMethod(EnableSession = true)]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public static int SaveLoading(PortofLoadingObjects objLoading)
            {
                DataSet ds = new DataSet();
                string data = string.Empty;
                int postStatus = 0;
                try
                {
                    postStatus = PortofLoadingListLogics.InsertLoading(objLoading, Login.Connection);

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
        public static int DeleteLoading(int LoadingID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = PortofLoadingListLogics.DeleteLoading(LoadingID, Login.Connection);

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
        public static int UpdateLoading(PortofLoadingObjects objLoading)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = PortofLoadingListLogics.UpdateLoading(objLoading, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objLoading.LoadingID + " ", "Loading List", Login.Connection);
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
        public static string GetEditLoadingData(int LoadingID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PortofLoadingListLogics.FetchLoadingData(LoadingID, Login.Connection);

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
                data = PortofLoadingListLogics.FetchCreateLoadingMasterData(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }
 }