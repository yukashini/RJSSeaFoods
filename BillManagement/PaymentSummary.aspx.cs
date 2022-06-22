using BillManagement.BusinessLogic;
using ISCLibrary.Utilities;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BillManagement
{
    public partial class PaymentSummary : System.Web.UI.Page
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
        public static string GetPaymentSummaryMasterData()
        {
            string AccountID = HttpContext.Current.Session["AccountID"].ToString();
            string ClientID = HttpContext.Current.Session["ClientID"].ToString();
            int account = Convert.ToInt32(AccountID);
            int client = Convert.ToInt32(ClientID);
            string data = string.Empty;
            DataSet ds = new DataSet();
            try
            {

                if (account != null && account != 0)
                {
                    ds = PaymentSummaryList.GetMasterDetailsData(client, Login.Connection);
                }
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
                //if (Logger.IsLoggingEnabled())
                //    Logger.Write(new VerboseLogEntry("Get GetPaymentSummaryMasterData Request Completed", 1, "Finance Manager Requests"));

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetPaymentSummaryList()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;

            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                ds = PaymentSummaryList.GetFinancerData(clientID, Login.Connection);
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
        public static string GetPaymentBillData(int identityId,int billId)
        {
            string AccountID = HttpContext.Current.Session["AccountID"].ToString();
            string ClientID = HttpContext.Current.Session["ClientID"].ToString();
            int account = Convert.ToInt32(AccountID);
            int client = Convert.ToInt32(ClientID);
            string data = string.Empty;
            DataSet ds = new DataSet();
            try
            {

                if (account != null && account != 0)
                {
                    ds = PaymentSummaryList.GetapprovedBillData(client,identityId,billId, Login.Connection);
                }
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
        public static int ChallengeBillToApprover(int identityId, int billId)
        {
            string AccountID = HttpContext.Current.Session["AccountID"].ToString();
            int account = Convert.ToInt32(AccountID);
            int postStatus = 0;
            try
            {
                if (account != null && account != 0)
                {
                    postStatus = PaymentSummaryList.ChallengeBill( identityId, billId, Login.Connection);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        protected void ExportExcel(object sender, EventArgs e)
        {
            try
            {
                string strLstWorkItem = lstbillexport.Value;
                DataTable dt = (DataTable)JsonConvert.DeserializeObject(strLstWorkItem, (typeof(DataTable)));
                dt.AcceptChanges();
                using (ExcelPackage pack = new ExcelPackage())
                {
                    ExcelWorksheet ws = pack.Workbook.Worksheets.Add("SecretList");
                    int i = 1;
                    ws.Column(1).Width = 15.00;
                    ws.Column(2).Width = 20.00;
                    ws.Column(3).Width = 15.00;
                    ws.Column(4).Width = 35.00;
                    ws.Column(5).Width = 15.00;
                    ws.Column(6).Width = 15.00;
                    ws.Column(7).Width = 20.00;
                    ws.Column(8).Width = 25.00;
                    for (int j = 1; j <= 8; j++)
                    {
                        ws.Cells[i, j].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[i, j].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(92, 163, 204));
                        ws.Cells[i, j].Style.Font.Color.SetColor(System.Drawing.Color.White);
                        ws.Cells[i, j].Style.Font.Bold = true;
                        ws.Cells[i, j].Style.Font.Size = 12;
                    }
                    ws.Cells["A1"].LoadFromDataTable(dt, true);
                    var ms = new System.IO.MemoryStream();
                    pack.SaveAs(ms);
                    FileDownload(ms);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                throw ex;
            }

        }

        protected void FileDownload(MemoryStream memoryStream)
        {
            try
            {
                System.String filename = "PaymentSummary.xlsx";

                byte[] bytesInStream = memoryStream.ToArray();
                memoryStream.Close();
                Response.Clear();
                Response.Buffer = true;
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.AddHeader("content-disposition", "attachment; filename=" + filename);
                Response.BinaryWrite(bytesInStream);

                Response.Flush();
                Response.Close();
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                throw ex;
            }
        }

    }
}