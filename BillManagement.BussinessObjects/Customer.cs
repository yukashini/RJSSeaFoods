using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class Customercontact
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int CustomerID { get; set; }
        public int ContactID { get; set; }
    }
    public class CustomerDocument
    {
        public string FileName { get; set; }
        public string FileModifiedName { get; set; }
        public string LastModifiedBy { get; set; }
        public int CustomerId { get; set; }
    }
}
