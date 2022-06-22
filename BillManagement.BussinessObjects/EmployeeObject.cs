using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
  public  class EmployeeObjects
    {
        public int Emp_Id { get; set; }
        public string Employeecode { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public Nullable<DateTime> DOB { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string AltContactNumber { get; set; }
        public string EmployeeAddress { get; set; }
        public string Bloodgroup { get; set; }
        public string EmployeeLogo { get; set; }
        public int ClientID { get; set; }
        public int CreatedBy { get; set; } 
        public string CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public int Gender { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string State { get; set; }
        public string Pan { get; set; }
        public string Aadhaar { get; set; }
        public string Designation { get; set; }
        public string Country { get; set; }
        public int Status { get; set; }

    }


}


