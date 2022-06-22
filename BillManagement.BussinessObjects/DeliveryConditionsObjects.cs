using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class DeliveryConditionsObjects
    {
        public int Delivery_ID { get; set; }
        public string Delivery_Code { get; set; }
        public string Delivery_Name { get; set; }
        public int ClientID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
    public class DeliveryConditionsINvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public int ClientID { get; set; }
    }
}


