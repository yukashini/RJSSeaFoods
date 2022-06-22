using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using OfficeOpenXml;
using System.Drawing;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using System.Configuration;
using System.IO;

namespace ISCLibrary.Utilities
{
    public class ExportJSONToExcel
    {
        public static MemoryStream Export(ExcelExport objExcelExport)
        {
            var memoryStream = new MemoryStream();
            try
            {
                string ClientLogoPath = Convert.ToString(ConfigurationManager.AppSettings["CPLogo"]);
                List<Dictionary<string, string>> lstData = new List<Dictionary<string, string>>();
                string excelOutputFileName = objExcelExport.filename;
                ExcelPackage ExcelPkg = new ExcelPackage();

                #region Setting Excel Workbook Properties
                ExcelPkg.Workbook.Properties.Author = "Innospire";
                ExcelPkg.Workbook.Properties.Title = "Innospire Retail Dashboard";
                ExcelPkg.Workbook.Properties.Company = "Innospire";
                ExcelPkg.Workbook.Properties.Application = "Retail Dashboard";
                ExcelPkg.Workbook.Properties.Comments = "This is auto generated document from Innospire's Retail Dashboard Application";
                ExcelPkg.Workbook.Properties.Created = DateTime.Now;
                #endregion

                #region Report General Configuration
                double minColumnWidth = 15.00;
                double maxColumnWidth = 50.00;
                Color color_ReportHeaderBackground = System.Drawing.ColorTranslator.FromHtml("#00a1df");
                Color color_ReportHeaderFont = System.Drawing.ColorTranslator.FromHtml("#FFFFFF");
                Color color_ReportBorder = System.Drawing.ColorTranslator.FromHtml("#8c8e8e");
                Color color_ReportBackground = System.Drawing.ColorTranslator.FromHtml("#FFFFFF");
                #endregion

                #region Generate Worksheets
                foreach (ExportWorksheet objExportWorksheet in objExcelExport.lstExportWorksheet)
                {
                    lstData = new List<Dictionary<string, string>>();
                    foreach (string objData in objExportWorksheet.data)
                    {
                        var jss = new JavaScriptSerializer();
                        lstData.Add(jss.Deserialize<Dictionary<string, string>>(objData));

                    }
                    #region Calculate Report Dimension
                    int ReportColumnStart = 2;
                    int ReportColumnEnd = objExportWorksheet.lstbodycolumns.Count;
                    int ReportRowStart = 2;
                    int ReportDataLength = lstData.Count;
                    int ReportRowEnd = (ReportDataLength == 0 ? 1 : ReportDataLength) + 5; // 1 Empty Row + 4 rows for logo and report info + 1 row for header + 1 row for fotter(empty row) = 7
                    int ReportheaderRowNumber = 3;
                    int ReportFromColumn = 3;
                    int NumberOfHeaderRows = objExportWorksheet.lstheadercolumns.Max(x => x.rownumber);
                    #endregion
                    objExportWorksheet.lstheadercolumns = objExportWorksheet.lstheadercolumns.OrderBy(si => si.rownumber).ThenBy(p => p.headersequencenumber).ToList();
                    objExportWorksheet.lstbodycolumns = objExportWorksheet.lstbodycolumns.OrderBy(si => si.bodycolumnsequenceNumber).ToList();
                    ExcelWorksheet Worksheet = ExcelPkg.Workbook.Worksheets.Add(objExportWorksheet.workSheetName);

                    #region Build Excel Report
                    #region Report General Styling

                    Worksheet.View.ShowGridLines = false;
                    var allCells = Worksheet.Cells[1, 1, ReportRowEnd, ReportColumnEnd];
                    var cellFont = allCells.Style.Font;
                    cellFont.SetFromFont(new Font("Calibri", 11));
                    //var ReportTable = Worksheet.Cells["C6:F" + (ReportRowEnd - 1) + ""];
                    var ReportTable = Worksheet.Cells[ReportheaderRowNumber, ReportFromColumn, (ReportDataLength + NumberOfHeaderRows + 2), ((ReportFromColumn - 1) + ReportColumnEnd)];

                    #endregion

                    #region Set Padding to Report
                    Worksheet.Column(1).Width = 3.0;
                    Worksheet.Column(2).Width = 3.0;
                    Worksheet.Column((((ReportFromColumn - 1) + ReportColumnEnd) + 1)).Width = 3.0;
                    #endregion

                    #region Apply Report Background color

                    Worksheet.Cells[ReportColumnStart, ReportColumnStart, (ReportDataLength + NumberOfHeaderRows + 3), (((ReportFromColumn - 1) + ReportColumnEnd) + 1)].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    Worksheet.Cells[ReportColumnStart, ReportColumnStart, (ReportDataLength + NumberOfHeaderRows + 3), (((ReportFromColumn - 1) + ReportColumnEnd) + 1)].Style.Fill.BackgroundColor.SetColor(color_ReportBackground);
                    #endregion

                    #region Fit Logo
                    int logo_position_rowIndex = 1;
                    int logo_position_colIndex = 2;
                    Image img = Image.FromFile(ClientLogoPath);
                    //ExcelPicture pic = Worksheet.Drawings.AddPicture("Client_Logo", img);
                    //pic.SetPosition(logo_position_rowIndex, 10, logo_position_colIndex, 5);
                    //pic.SetSize(60);
                    #endregion

                    #region Build Report Meta Information
                    //Worksheet.Cells[3, (((ReportFromColumn - 1) + ReportColumnEnd) - 1)].Value = "CreatedBy";
                    //Worksheet.Cells[3, ((ReportFromColumn - 1) + ReportColumnEnd)].Value = "Innospire";

                    //Worksheet.Cells[4, (((ReportFromColumn - 1) + ReportColumnEnd) - 1)].Value = "CreatedOn";
                    //Worksheet.Cells[4, (((ReportFromColumn - 1) + ReportColumnEnd))].Value = DateTime.Now.ToString("MM/dd/yyyy");
                    //Worksheet.Cells[3, (((ReportFromColumn - 1) + ReportColumnEnd) - 1)].Style.Font.Bold = true;
                    //Worksheet.Cells[4, (((ReportFromColumn - 1) + ReportColumnEnd) - 1)].Style.Font.Bold = true;

                    //  var MetaInfoTable = Worksheet.Cells[3, (((ReportFromColumn - 1) + ReportColumnEnd) - 1), 4, (((ReportFromColumn - 1) + ReportColumnEnd))];

                    // MetaInfoTable.Style.Border.BorderAround(ExcelBorderStyle.Thin, color_ReportBorder);
                    #endregion

                    #region Build Report Header (Login Info)



                    var ReportHeader = Worksheet.Cells[ReportheaderRowNumber, ReportFromColumn, (NumberOfHeaderRows + (ReportheaderRowNumber - 1)), ((ReportFromColumn - 1) + ReportColumnEnd)];

                    ReportHeader.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ReportHeader.Style.Fill.BackgroundColor.SetColor(color_ReportHeaderBackground);
                    ReportHeader.Style.Font.Bold = true;
                    ReportHeader.Style.Font.Color.SetColor(color_ReportHeaderFont);

                    int activeHeaderColumn = ReportFromColumn;
                    int activeHeaderRow = ReportheaderRowNumber;
                    int previousHeaderRowNumber = 0;

                    foreach (HeaderColumn objHeaderColumn in objExportWorksheet.lstheadercolumns)
                    {
                        if (previousHeaderRowNumber != objHeaderColumn.rownumber)
                        {
                            activeHeaderColumn = (ReportFromColumn);
                            activeHeaderRow = ReportheaderRowNumber + (objHeaderColumn.rownumber - 1);
                        }
                        if (objHeaderColumn.colspan > 1)
                            Worksheet.Cells[activeHeaderRow, activeHeaderColumn, activeHeaderRow, (activeHeaderColumn + (objHeaderColumn.colspan - 1))].Merge = true;
                        Worksheet.Cells[activeHeaderRow, activeHeaderColumn, activeHeaderRow, (activeHeaderColumn + (objHeaderColumn.colspan - 1))].Value = objHeaderColumn.displayname;
                        Worksheet.Cells[activeHeaderRow, activeHeaderColumn, activeHeaderRow, (activeHeaderColumn + (objHeaderColumn.colspan - 1))].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                        previousHeaderRowNumber = objHeaderColumn.rownumber;
                        activeHeaderColumn = activeHeaderColumn + (objHeaderColumn.colspan);

                    }

                    // Apply Borders to Report table
                    ReportTable.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    ReportTable.Style.Border.Top.Color.SetColor(color_ReportBorder);
                    ReportTable.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    ReportTable.Style.Border.Right.Color.SetColor(color_ReportBorder);
                    ReportTable.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ReportTable.Style.Border.Bottom.Color.SetColor(color_ReportBorder);
                    ReportTable.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    ReportTable.Style.Border.Left.Color.SetColor(color_ReportBorder);

                    #endregion

                    #region Build Report Body
                    int activeBodyColumn = ReportFromColumn;
                    int activeBodyRow = ReportheaderRowNumber + NumberOfHeaderRows;
                    int previousBodyRowNumber = 0;

                    foreach (BodyColumn objBodyColumn in objExportWorksheet.lstbodycolumns)
                    {
                        activeBodyRow = ReportheaderRowNumber + NumberOfHeaderRows;
                        foreach (Dictionary<string, string> dicReportBodyData in lstData)
                        {
                            if (objBodyColumn.colspan > 1)
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Merge = true;

                            if (objBodyColumn.formattype.ToLower() == "text")
                            {
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Value = dicReportBodyData[objBodyColumn.valuefield];
                            }
                            else if (objBodyColumn.formattype.ToLower() == "number")
                            {
                                string decimalPlaces = string.Empty;

                                for (int i = 0; i < objBodyColumn.decimalplace; i++)
                                {
                                    decimalPlaces += "0";
                                }
                                if (decimalPlaces.Length > 0)
                                    decimalPlaces = "." + decimalPlaces;
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Style.Numberformat.Format = "#,##0" + decimalPlaces;
                                double numericValue = 0.00;
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Value = ((dicReportBodyData[objBodyColumn.valuefield] != null && Double.TryParse(dicReportBodyData[objBodyColumn.valuefield], out numericValue)) ? Double.Parse(dicReportBodyData[objBodyColumn.valuefield]) : 0);
                            }
                            else if (objBodyColumn.formattype.ToLower() == "dollar")
                            {
                                string decimalPlaces = string.Empty;
                                for (int i = 0; i < objBodyColumn.decimalplace; i++)
                                {
                                    decimalPlaces += "0";
                                }
                                if (decimalPlaces.Length > 0)
                                    decimalPlaces = "." + decimalPlaces;
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Style.Numberformat.Format = "$#,##0" + decimalPlaces;
                                double numericValue;
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Value = ((dicReportBodyData[objBodyColumn.valuefield] != null && Double.TryParse(dicReportBodyData[objBodyColumn.valuefield], out numericValue)) ? Double.Parse(dicReportBodyData[objBodyColumn.valuefield]) : 0);
                            }
                            else if (objBodyColumn.formattype.ToLower() == "percentage")
                            {
                                string decimalPlaces = string.Empty;
                                for (int i = 0; i < objBodyColumn.decimalplace; i++)
                                {
                                    decimalPlaces += "0";
                                }
                                if (decimalPlaces.Length > 0)
                                    decimalPlaces = "." + decimalPlaces;
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Style.Numberformat.Format = "0" + decimalPlaces + "%";
                                double numericValue;
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Value = ((dicReportBodyData[objBodyColumn.valuefield] != null && Double.TryParse(dicReportBodyData[objBodyColumn.valuefield], out numericValue)) ? Double.Parse(dicReportBodyData[objBodyColumn.valuefield]) : 0);
                            }
                            else if (objBodyColumn.formattype.ToLower() == "date")
                            {
                                Worksheet.Cells[activeBodyRow, activeBodyColumn, activeBodyRow, (activeBodyColumn + (objBodyColumn.colspan - 1))].Value = dicReportBodyData[objBodyColumn.valuefield];
                            }
                            activeBodyRow++;
                        }
                        activeBodyColumn++;
                    }
                    #endregion

                    #region Wrap Text and Set Column Width
                    ReportTable.AutoFitColumns(minColumnWidth, maxColumnWidth);
                    //MetaInfoTable.AutoFitColumns(minColumnWidth, maxColumnWidth);
                    // ReportTable.Style.WrapText = true; // To Prevent Overflow of long text
                    #endregion


                    #endregion
                }
                #endregion

                #region Export Report

                ExcelPkg.SaveAs(memoryStream);

                #endregion



            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return memoryStream;
        }

        public static Stream GenerateStreamFromString(string s)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(s);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }
    }
}
