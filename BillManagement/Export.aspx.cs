using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BillManagement
{
    public partial class Export : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetExportScreenData(string DueFromDate, string DueToDate, int PaymentStatus)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = BillExport.FetchExportScreenData(DueFromDate, DueToDate, PaymentStatus, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string ExportScreenData(string DueFromDate, string DueToDate, int PaymentStatus)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = BillExport.ExportScreenData(DueFromDate, DueToDate, PaymentStatus, Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    foreach (DataTable table in ds.Tables)
                    {
                        if (table.Rows.Count > 0)
                        {
                            table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                        }
                    }
                    DataTable BillData = ds.Tables["BillData"];
                    DataTable BreakageData = ds.Tables["BreakageData"];
                  //  DownloadBillData(BillData, BreakageData);
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
                StringBuilder printedSb = new StringBuilder();
                string strLstWorkItem = lstbillexport.Value;
               
                DataTable dt = (DataTable)JsonConvert.DeserializeObject(strLstWorkItem, (typeof(DataTable)));
                dt.AcceptChanges();
                if (dt.Rows.Count > 0)
                {
                    string sDueDate = dt.Rows[0]["StartDueDate"].ToString();
                    string tDueDate= dt.Rows[0]["EndDueDate"].ToString();
                    int paymentStatus =Convert.ToInt32(dt.Rows[0]["PaymentStatus"]);
                    DataSet ds = new DataSet();
                    string data = string.Empty;
                   
                        ds = BillExport.ExportScreenData(sDueDate, tDueDate, paymentStatus, Login.Connection);
                        if (ds.Tables.Count > 0)
                        {
                            foreach (DataTable table in ds.Tables)
                            {
                                if (table.Rows.Count > 0)
                                {
                                    table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                                }
                            }
                            DataTable BillData = ds.Tables["BillData"];
                            DataTable BreakageData = ds.Tables["BreakageData"];
                        if (BillData != null)
                        {
                            ExportFile(BillData, BreakageData);
                        }
                           
                            //printedSb=PrintData(BillData, BreakageData);
                            //DownloadPrintedFile(printedSb);
                    }
                }              

            }
            catch (Exception ex)
            {


            }

        }


        public static StringBuilder PrintData(DataTable billData, DataTable breakageData)
        {
            int postStatus = 1;
            StringBuilder sb = new StringBuilder();
            try
            {
                if (billData.Rows.Count > 0)
                {
                    foreach (DataRow billRow in billData.Rows)
                    {
                        int BillID = Convert.ToInt32(billRow["BillID"] != DBNull.Value ? Convert.ToInt32(billRow["BillID"]) : 0);
                        string BillAddress = Convert.ToString(billRow["BillAddress"] != DBNull.Value ? Convert.ToString(billRow["BillAddress"]) : "");
                        if (BillID != 0 && BillAddress != "")
                        {
                            //Print Bill Info
                            sb.AppendLine(BillAddress);
                            //PrintBillData(BillAddress);
                            foreach (DataRow breakageRow in breakageData.Rows)
                            {
                                int breakageBillID = Convert.ToInt32(billRow["BillID"] != DBNull.Value ? Convert.ToInt32(billRow["BillID"]) : 0);
                                if (breakageBillID != 0 && breakageBillID == BillID)
                                {
                                    string breakagebillInfo = Convert.ToString(breakageRow["BreakageInfo"] != DBNull.Value ? Convert.ToString(breakageRow["BreakageInfo"]) : "");
                                    if (breakagebillInfo != "")
                                    {
                                        //Print breakage list for the bill
                                        sb.AppendLine(breakagebillInfo);
                                        //PrintBillData(breakagebillInfo);
                                    }
                                }
                            }
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                postStatus = 0;
            }
            return sb;
        }

    

        protected void DownloadPrintedFile(StringBuilder sb)
        {           
            try
            {
                string currentDateTime = DateTime.Now.ToString("MM" + "dd" + "yyyy" + "HH" + "mm" + "ss");
                string fileName = "Bill_Data_" + currentDateTime + ".txt";
                if (sb.Length > 0)
                {
                    string text = sb.ToString();
                    string billContentFilePath = ConfigurationManager.AppSettings["ExportFilePath"].Trim();
                    billContentFilePath = billContentFilePath + fileName;
                    FileStream billStream = new FileStream(billContentFilePath, FileMode.OpenOrCreate, FileAccess.Write);
                    StreamWriter billContentWrite = new StreamWriter(billStream);
                    billContentWrite.BaseStream.Seek(0, SeekOrigin.End);
                    billContentWrite.WriteLine(text);
                    billContentWrite.Flush();
                    billContentWrite.Close();

                    string fileDirec = "~/ExternalFiles/" + fileName;
                    WebClient req = new WebClient();
                    HttpResponse response = HttpContext.Current.Response;
                    string filePath = fileDirec;
                    response.Clear();
                    response.ClearContent();
                    response.ClearHeaders();
                    response.Buffer = true;
                    response.ContentType = "application/force-download";
                    response.AddHeader("Content-Disposition", "attachment; filename=" + fileName + "");
                    //response.AddHeader("Content-Disposition",
                    //     "attachment; filename=" + fileName + ";");
                    byte[] data = req.DownloadData(Server.MapPath(filePath));
                    response.BinaryWrite(data);
                    response.End();

                    //Response.Clear();
                    //Response.ClearHeaders();
                    //Response.ClearContent();
                    //// Response.AppendHeader("Content-Length", text.Length.ToString());
                    //Response.AddHeader("Content-Length", text.Length.ToString());
                    //Response.ContentType = "text/plain";
                    ////   Response.AppendHeader("Content-Disposition", "attachment;filename=" + fileName + "");
                    //Response.AddHeader("Content-Disposition", "attachment;filename=" + fileName + "");
                    //Response.Write(text);
                    //Response.Flush();
                    //Response.End();
                    //Response.Close();
                    //  Response.
                    // Response.SuppressContent = true;
                    //Response.End();
                    // HttpContext.Current.ApplicationInstance.CompleteRequest();

                }
            }
            catch (System.Threading.ThreadAbortException err)
            {
                System.Threading.Thread.ResetAbort();
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        protected void ExportFile(DataTable billData, DataTable breakageData)
        {
            string currentDateTime = DateTime.Now.ToString("MM" + "dd" + "yyyy" + "HH" + "mm" + "ss");
            string fileName = "Bill_Data_" + currentDateTime + ".txt";
            Response.ContentType = "text/plain";
            Response.AppendHeader("Content-Disposition", "attachment; filename="+fileName+"");

            // Write the file to the Response 
            const int bufferLength = 10000;
            byte[] buffer = new Byte[bufferLength];
            int length = 0;
            Stream download = null;

            //string appPath = Request.PhysicalApplicationPath;
            fileName="Bill_Data_" + currentDateTime + Convert.ToString(HttpContext.Current.Session["AccountID"].ToString())+".txt";
            string filePath = "~/ExternalFiles/" + fileName;
          //  string filePath = "Lincoln.txt";
            StreamWriter w;
            w = File.CreateText(Server.MapPath(filePath));
         
            //Print Data table values into StreamWritter
            try
            {
                if (billData.Rows.Count > 0)
                {
                    foreach (DataRow billRow in billData.Rows)
                    {
                        int BillID = Convert.ToInt32(billRow["BillID"] != DBNull.Value ? Convert.ToInt32(billRow["BillID"]) : 0);
                        string BillAddress = Convert.ToString(billRow["BillAddress"] != DBNull.Value ? Convert.ToString(billRow["BillAddress"]) : "");
                        if (BillID != 0 && BillAddress != "")
                        {
                            //Print Bill Info
                            w.WriteLine(BillAddress);

                            //PrintBillData(BillAddress);
                            foreach (DataRow breakageRow in breakageData.Rows)
                            {
                                //string breakagebillInfo = Convert.ToString(breakageRow["BreakageInfo"] != DBNull.Value ? Convert.ToString(breakageRow["BreakageInfo"]) : "");
                                int breakageBillID = Convert.ToInt32(breakageRow["BillID"] != DBNull.Value ? Convert.ToInt32(breakageRow["BillID"]) : 0);
                                if (breakageBillID != 0 && breakageBillID == BillID)
                                {
                                    string breakagebillInfo = Convert.ToString(breakageRow["BreakageInfo"] != DBNull.Value ? Convert.ToString(breakageRow["BreakageInfo"]) : "");
                                    if (breakagebillInfo != "")
                                    {
                                        //Print breakage list for the bill
                                        w.WriteLine(breakagebillInfo);

                                        //PrintBillData(breakagebillInfo);
                                    }
                                }
                            }
                        }

                    }
                }
                w.Flush();
                w.Close();
            }
            catch (Exception ex)
            {

            }
           
            try
            {
                download = new FileStream(Server.MapPath(filePath),
                FileMode.Open,
                FileAccess.Read);
                
                do
                {
                    if (Response.IsClientConnected)
                    {
                        length = download.Read(buffer, 0, bufferLength);
                        Response.OutputStream.Write(buffer, 0, length);
                        buffer = new Byte[bufferLength];
                    }
                    else
                    {
                        length = -1;
                    }
                }
                while (length > 0);
              //  Response.AppendHeader("Content-Disposition", "attachment; filename=" + fileName + "");
                Response.Flush();
                Response.End();
            }
            finally
            {
                if (download != null)
                    download.Close();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetExportBillDataList(BillListFilter billFilter)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = BillExport.GeExportBillList(billFilter, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }
}