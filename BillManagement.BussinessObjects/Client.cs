using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
  public  class Client
    {

        public int ClientID { get; set; }
        public string ClientName { get; set; }
        public double PhoneNumber { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public double Zincode { get; set; }
        public int Status { get; set; }
        public string BrandLogo { get; set; }
        public int IsActive { get; set; }
        public int EntityStatus { get; set; }
        public int CreatedOn { get; set; }
        public DateTime CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
       

    }
}
