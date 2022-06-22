using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
  public  class ApplicationRole
    {
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set;}
        public int MasterRoleID { get; set; }
        public List<ApplicationRoleEntity> lstEntityActions { get; set; }
    }
}
