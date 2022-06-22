using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ISCLibrary.Utilities
{
    public class ExcelExport
    {
        public string filename { get; set; }
        public List<ExportWorksheet> lstExportWorksheet { get; set; }
    }

    public class ExportWorksheet
    {
        public string workSheetName { get; set; }
        public List<HeaderColumn> lstheadercolumns { get; set; }
        public List<BodyColumn> lstbodycolumns { get; set; }
        public List<string> data { get; set; }
    }

    public class HeaderColumn
    {
        public int id { get; set; }
        public string name { get; set; }
        public string displayname { get; set; }
        public int rownumber { get; set; }
        public int headersequencenumber { get; set; }
        public int colspan { get; set; }
        public string allignment { get; set; }
    }

    public class BodyColumn
    {
        public int id { get; set; }
        public string name { get; set; }
        public int bodycolumnsequenceNumber { get; set; }
        public string valuefield { get; set; }
        public string formattype { get; set; }
        public int decimalplace { get; set; }
        public int colspan { get; set; }
        public string allignment { get; set; }
    }
}
