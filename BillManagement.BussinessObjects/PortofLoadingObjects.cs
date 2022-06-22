using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class PortofLoadingObjects
    {
        public int LoadingID { get; set; }
        public string LoadingCode { get; set; }
        public string LoadingName { get; set; }
        public int ClientID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
}
