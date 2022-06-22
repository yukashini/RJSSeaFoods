using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class BillComments
    {
        public int BillCommentID { get; set; }
        public int BillID { get; set; }
        public string Comment { get; set; }
        public string CommentOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedOn { get; set; }
        public DateTime UpdatedBy { get; set; }

    }
}
