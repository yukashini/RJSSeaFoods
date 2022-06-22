using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
  public  class ProjectObjects
    {
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        public int ProjectType { get; set; }
        public string ProjectDescription { get; set; }
        public int Customer { get; set; }
        public int ProjectStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int ClientID { get; set; }
    }
}
