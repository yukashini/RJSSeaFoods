using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class ClientAdminObjects
    {
       
            public string Firstname { get; set; }
            public string Lastname { get; set; }
            public string Companyname { get; set; }
            public string Emailid { get; set; }
            public string ActivationKey { get; set; }
            public string Linkid { get; set; }
            public int CreatedBy { get; set; }
            public string CreatedOn { get; set; }
            public int ClientID { get; set; }
            public int UserID { get; set; }
            public string Passcword { get; set; }
            public string UNameID { get; set; }
            public int IsActivateState { get; set; }
       
    }

    public class ClientSignUpObjects
    {
        public string Firstname { get; set; }
        public string Email { get; set; }
        public string PassWord { get; set; }
        public int AccountID { get; set; }
        public int ClientID { get; set; }

    }
}
