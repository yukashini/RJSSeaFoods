using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class BillApprovalStage
    {
        public int BillStageApprovalID { get; set; }
        public int BillID { get; set; }
        public int ApproverID { get; set; }
        public int Status { get; set; }
        public int Sequence { get; set; }
        public int StageInitiated { get; set; }
        public int CurrentStageApproval { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
