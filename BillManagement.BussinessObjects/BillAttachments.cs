using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class BillAttachments
    {
        public int AttachmentId { get; set; }
        public int BillID { get; set; }
        public string PhysicalFileName { get; set; }
        public string FileName { get; set; }
        public string Size { get; set; }
        public string PhysicalPath { get; set; }
        public string Extension { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int IsBillFile { get; set; }
        public int BillApprovedId { get; set; }
    }
}
