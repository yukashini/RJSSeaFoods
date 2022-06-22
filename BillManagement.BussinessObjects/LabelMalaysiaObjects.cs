using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class LabelMalaysiaObjects
    {
        public int LabelID  {get; set;}
        public string Origin { get; set; }
        public string Size { get; set; }
        public decimal ApprovalNo { get; set; }
        public string Weight { get; set; }
        public string NetWeight { get; set; }
        public string GrossWeight { get; set; }
        public string ProductionCode { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime BestBeforeDate { get; set; }
        public int BuyerID { get; set; }
        public int ProductID { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public int ClientID { get; set; }
    }

    public class LabelMalaysiaInvoiceFilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public int LabelID { get; set; }
        public string BuyerName { get; set; }
    }

    //public class BuyerINvoiceFilterfilter
    //{
    //    public int Start { get; set; }
    //    public int Skip { get; set; }
    //    public string OrderBy { get; set; }
    //    public string BuyerName { get; set; }
    //}
   
    //public class INvoiceBuyerFilterfilter
    //{
    //    public string BuyerId { get; set; }
    //    public string Start { get; set; }
    //    public string Skip { get; set; }
    //    public string OrderBy { get; set; }

    //}

   
}
