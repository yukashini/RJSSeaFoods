using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Services;
using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using System.Configuration;
using System.Data;
using ISCLibrary.Utilities;

namespace BillManagement
{
    public partial class UploadBills : System.Web.UI.Page
    {
        public static string Connection = Convert.ToString(ConfigurationManager.ConnectionStrings["dbConnection"]);
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
        public static string GetMasterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try

            {
                ds = BillUpload.GetMasterDetailsData(Connection);
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
        public static int InsertBulkBill(List<Bill_Custom_Breakage> CustomBill)
        {

            int PostStatus = 0;
            try
            {
                PostStatus = BillUpload.BillInsert(CustomBill, Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetDraftBills()
        {
            string data = string.Empty;
            DataSet ds = new DataSet();
            try
            {
                ds = BillUpload.GetPendingSubmissionBills(Login.Connection);
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
        public static string GetBillEditDetails(int billID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = BillUpload.GetEditBillData(billID, Login.Connection);
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
        public static int EditBulkBill(List<Bill_Custom_Breakage> CustomBill)
        {
            int PostStatus = 0;
            try
            {
                PostStatus = BillUpload.BillEdit(CustomBill, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteBill(int billID,string InvoiceNo)
        {
            int PostStatus = 0;
            try
            {
                PostStatus = BillUpload.DeleteUserBill(billID, InvoiceNo, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBillAttachmentDetails(int billID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = BillUpload.GetAttachment(billID, Login.Connection);
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
        public static string WriteSourcePath(string filSorcePath)
        {
            
            string data = string.Empty;
            try
            {
                ManualLog.Write(filSorcePath);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }





    }
}