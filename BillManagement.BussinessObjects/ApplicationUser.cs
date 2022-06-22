using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class ApplicationUser
    {
        public int AccountID { get; set; }
        public int Role { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string PrimaryEmailID { get; set; }
        public int ClientID { get; set; }
        public int ApplicationRole { get; set; }
        public int IsActive { get; set; }
        public int Priority { get; set; }
        public int RoleID { get; set; }
        public string PriorityScreen { get; set; }
        public int EntityID { get; set; }
        public int RoleStatus { get; set; }
        public string RoleNameText { get; set; }
        public string Replacer { get; set; }
        public string ReplacementValue { get; set; }
        public int IsDefaultAccountant { get; set; }
        public int IsPasswordReseted { get; set; }


    }

    public class EmailReplacement
    {
        public string Replacer { get; set; }
        public string ReplacementValue { get; set; }
    }

    public class UserFilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public int ApplicctionID { get; set; }
        public string OrderBy { get; set; }
        public int Status { get; set; }
        public string UserID { get; set; }
        public string ApplicationRole { get; set; }
        
    }        
}
