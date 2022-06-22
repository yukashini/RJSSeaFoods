using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class BillBreakage
    {
        public int BillBreakageID { get; set; }
        public int BillID { get; set; }
        public float Amount { get; set; }
        public string Description { get; set; }
        public string BillType { get; set; }
        public string Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int IsActive { get; set; }
        public int ActionKey { get; set; }
        public int GLAccountID { get; set; }
        public string AccountName { get; set; }

    }
}
