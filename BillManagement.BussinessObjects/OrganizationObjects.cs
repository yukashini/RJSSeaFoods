using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class OrganizationObjects
    {
        public int OrganizationID { get; set; }
        public int CompanyName { get; set; }
        public string CompanyType { get; set; }
        public string EmailID { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public string CompanyLogo { get; set; }
        public int ClientID { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; } 
        public string City { get; set; }
        public string Zip { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string AlternativeNumber { get; set; }

    }


}


