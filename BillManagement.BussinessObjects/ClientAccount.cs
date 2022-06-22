using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class ClientAccount
    {
        public int AccountIdentityID { get; set; }
        public string AccountNumber { get; set; }
        public string RoutingNumber { get; set; }
        public string ReferenceID { get; set; }
        public string AccountName { get; set; }
        public int CustomerID { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int Status { get; set; }
        public int IsDefault { get; set; }
        public int IsActive { get; set; }
        public string ACHCustomerID { get; set; }
    }
}
