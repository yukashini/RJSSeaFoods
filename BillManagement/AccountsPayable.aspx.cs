using BillManagement.BusinessLogic;
using ISCLibrary.Utilities;
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
    public partial class AccountsPayable : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                int? accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (accountID == null || clientID == null)
                {
                    Response.Redirect("RJSLogin.aspx");
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                Response.Redirect("RJSLogin.aspx");
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetAccountsFilterDataList()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = AccountsPayableList.GetMasterList(Login.Connection);
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
        public static string GetAccountsPayableDataList()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = AccountsPayableList.GetPayableDataList(Login.Connection);
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
                    ws.Column(1).Width = 30.00;
                    ws.Column(2).Width = 22.00;
                    ws.Column(3).Width = 20.00;
                    ws.Column(4).Width = 20.00;
                    ws.Column(5).Width = 20.00;
                    ws.Column(6).Width = 20.00;
                    ws.Column(7).Width = 20.00;
                    ws.Column(8).Width = 22.00; 
                 //   ws.Column(8).
                  
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
                System.String filename = "AccountsPayable.xlsx";

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