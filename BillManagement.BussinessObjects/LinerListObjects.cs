using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class LinerListObjects
    {
        public int LinerID { get; set; }
        public string LinerCode { get; set; }
        public string LinerName { get; set; }
        public int ClientID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
    public class InvoiceFilterfilter1
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Customer { get; set; }
        public string Invoice { get; set; }
        public string Status { get; set; }


    }
    public class INvoiceFilterfilter1
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Customername { get; set; }
        public string Balance { get; set; }
        public string Totalamont { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public string EmployeeCode { get; set; }
        public string Address { get; set; }
        public string Contact_No { get; set; }
        public int EmployeeId { get; set; }
    }
}
