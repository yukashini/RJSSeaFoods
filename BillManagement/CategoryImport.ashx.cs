using System;
using System.Collections.Generic;
using System.Configuration;
using ClosedXML.Excel;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using ISCLibrary.Utilities;


namespace BillManagement
{
    /// <summary>
    /// Summary description for CategoryImport
    /// </summary>
        public class CategoryImport : IHttpHandler, System.Web.SessionState.IRequiresSessionState
        {
            public void ProcessRequest(HttpContext context)
            {
                DataTable dtExcelData = new DataTable();
                DataTable dtMasterData = new DataTable();
                DataSet ds = new DataSet();
                bool isException = false;
                DataTable finalData = new DataTable();
                try
                {
                    if (context.Request.Files.Count > 0)
                    {
                        string PostedLeadFiles = Convert.ToString(ConfigurationManager.AppSettings["GLFileDirectory"]);
                        int userID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                        string FirstName = Convert.ToString(HttpContext.Current.Session["FirstName"].ToString());
                        string LastName = Convert.ToString(HttpContext.Current.Session["LastName"].ToString());
                        HttpFileCollection files = context.Request.Files;
                        HttpPostedFile file = files[0];
                        string fileName = Path.GetFileName(file.FileName);
                        string filePhisycalPath = Path.GetFullPath(fileName).ToLower();
                        if (!Directory.Exists(PostedLeadFiles))
                            Directory.CreateDirectory(PostedLeadFiles);
                        file.SaveAs(PostedLeadFiles + fileName);
                        using (XLWorkbook workBook = new XLWorkbook(PostedLeadFiles + fileName))
                        {
                            //Read the first Sheet from Excel file.
                            IXLWorksheet workSheet = workBook.Worksheet(1);

                            //Create a new DataTable.

                            //Loop through the Worksheet rows.
                            bool firstRow = true;
                            int Identity = 0;
                            foreach (IXLRow row in workSheet.Rows())
                            {
                                if (firstRow)
                                {
                                    dtExcelData.Columns.Add("IdentityID");
                                    foreach (IXLCell cell in row.Cells())
                                    {
                                        string columnName = cell.Value.ToString();
                                        columnName = columnName.Replace(" ", "");
                                        columnName = columnName.Replace("/", "");
                                        dtExcelData.Columns.Add(columnName);
                                    }
                                    firstRow = false;
                                }

                                else
                                {
                                    dtExcelData.Rows.Add();
                                    int i = 1;
                                    dtExcelData.Rows[dtExcelData.Rows.Count - 1][i] = Identity;
                                    Identity++;
                                    foreach (IXLCell cell in row.Cells(1, dtExcelData.Columns.Count - 1))
                                    {
                                        dtExcelData.Rows[dtExcelData.Rows.Count - 1][0] = Identity;
                                        dtExcelData.Rows[dtExcelData.Rows.Count - 1][i] = cell.Value.ToString();
                                        i++;
                                    }
                                }
                            }
                            dtExcelData.AcceptChanges();
                            dtExcelData.Columns.Add("ClientId");
                            var ClientIdResult = (from excelData in dtExcelData.AsEnumerable()
                                                  select new
                                                  {
                                                      excelData = excelData["ClientId"] = clientID
                                                  }).ToList();
                            dtExcelData.AcceptChanges();

                            dtExcelData.Columns.Add("CreatedBy");
                            var CreatedByResult = (from excelData in dtExcelData.AsEnumerable()
                                                   select new
                                                   {
                                                       excelData = excelData["CreatedBy"] = userID
                                                   }).ToList();
                            dtExcelData.AcceptChanges();

                            dtExcelData.Columns.Add("CreatedOn");
                            DateTime currentDate = DateTime.Now;
                            var CreatedOnResult = (from excelData in dtExcelData.AsEnumerable()
                                                   select new
                                                   {
                                                       excelData = excelData["CreatedOn"] = currentDate
                                                   }).ToList();
                            dtExcelData.AcceptChanges();

                            dtExcelData.Columns.Add("CreatedByName");
                            var CreatedByNameResult = (from excelData in dtExcelData.AsEnumerable()
                                                       select new
                                                       {
                                                           excelData = excelData["CreatedByName"] = ((FirstName == null ? " " : FirstName) + " " + (LastName == null ? " " : LastName))
                                                       }).ToList();
                            dtExcelData.AcceptChanges();

                        }
                    }
                }
                catch (Exception ex)
                {
                    isException = true;

                }
                if (!isException)
                {
                    dtExcelData = RenameDataTableColumnName(dtExcelData);
                    string strExcelData = string.Empty;
                    strExcelData = Utilities.Serializer(dtExcelData);
                    context.Response.ContentType = "text/json";
                    context.Response.Write(strExcelData);
                }
                else
                {

                    context.Response.ContentType = "text/json";
                    context.Response.Write("");
                }
            }
            public bool IsReusable
            {
                get
                {
                    return false;
                }
            }
            public static DataTable RenameDataTableColumnName(DataTable dt)
            {
                try
                {
                    foreach (DataColumn column in dt.Columns)
                    {
                        string ColumnName = column.ColumnName;
                        ColumnName = ColumnName.Replace("(M)", "");
                        ColumnName = ColumnName.Replace("(O)", "");
                        column.ColumnName = ColumnName;
                    }
                }
                catch (Exception ex)
                {

                }
                return dt;
            }
        }
    }
