using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class DesignationObjects
    {
        public int DesignationID { get; set; }
        public string DesignationCode { get; set; }
        public string DesignationName { get; set; }
        public int Client_id { get; set; }
        public string DesignationCreBy { get; set; }
        public string DesignationCreDate { get; set; }
        public string DesignationUpdBy { get; set; }
        public string DesignationUpdDate { get; set; }
    }
    public class DesignationINvoiceFilterfilter {
        public int start { get; set; }
        public int skip { get; set; }
        public string orderby { get; set; }
        public string clientID { get; set; }

    } 
}
