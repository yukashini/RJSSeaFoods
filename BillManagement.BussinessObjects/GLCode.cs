using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{

 public  class GLCode
    {
        public int IdentityID { get; set; }
        public int ClientID { get; set; }
        public string GLNumber { get; set; }
        public string GLDescription { get; set; }
        public string RowStatus { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string GlCategory { get; set; }
        public int Status { get; set; }
        public List<SubCaetgory> lstSubCategories { get; set; }
        public int IsMasterGLCode { get; set; }
        public int MasterGLCode { get; set; }
        public string SubcategoryGL { get; set; }
    }

    public class SubCaetgory
    {
        public string GlCategory { get; set; }
        public string GLNumber { get; set; }
        public string GLDescription { get; set; }
        public string SubCategory { get; set; }
        public int Status { get; set; }
    }

    public class InvoiceLst
    {
        public string Lineitemnno { get; set; }
        public string InvID { get; set; }
        public string OrderId { get; set; }
        public decimal Amount { get; set; }
        public decimal Discount { get; set; }
        public int ClientId { get; set; }
        public int Customer { get; set; }
        public string Description { get; set; }
        public string InvoiceDate { get; set; }
        public string TermCode { get; set; }

        public int CreatedBy { get; set; }
        

    }
    public class InvoiceLstdistinct
    {
        public int CustomerID { get; set; }
        public string InvID { get; set; }
        public string Description { get; set; }
        public string InvoiceDate { get; set; }
        public string TermCode { get; set; }
        public int CreatedBy { get; set; }
        public int ClientId { get; set; }
        public decimal Amount { get; set; }



    }
}
