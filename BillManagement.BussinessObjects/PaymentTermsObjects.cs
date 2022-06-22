using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class PaymentTermsObjects
    {
        public int Payment_ID { get; set; }
        public string Payment_Code { get; set; }
        public string Payment_Name { get; set; }
        public int ClientID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
    public class PaymentTermsINvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public int ClientID { get; set; }
    }
 }
    

