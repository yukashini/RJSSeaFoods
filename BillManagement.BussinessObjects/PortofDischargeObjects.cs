using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class PortofDischargeObjects
    {
        public int DischargeID { get; set; }
        public string DischargeCode { get; set; }
        public string DischargeName { get; set; }
        public string DischargeCountry { get; set; }
        public int ClientID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
}
