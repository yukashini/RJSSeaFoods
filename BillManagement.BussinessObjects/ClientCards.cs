using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
  public  class ClientCards
    {
        public int CardIdentityId { get;set; }
        public string CardName { get; set; }
        public string CardNumber { get; set; }
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public string CCV { get; set; }
        public int IsDefault { get; set; }
        public string ReferenceID { get; set; }
        public int CustomerID { get; set; }
        public int Status { get; set; }
        public string BankName { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

    }
}
