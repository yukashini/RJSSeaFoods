
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class ProductObjects
    {
        public int ProductID { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public int ClientID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
    public class ProductINvoiceFilterfilter
    {
        public int start { get; set; }
        public int skip { get; set; }
        public string orderby { get; set; }
        public string clientID { get; set; }

    }
}
