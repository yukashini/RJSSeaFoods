using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
  public  class BillApproved
    {
        public int IdentityID { get; set; }
        public int BillID { get; set; }
        public float ApprovedAmount { get; set; }
        public int Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public float PayableAmount { get; set; }
        public int PaymentStatus { get; set; }
        public DateTime DueOn { get; set; }
        public DateTime PaidOn { get; set; }
        public int VendorID { get; set; }

    }
    
    public class BillApproval
    {
        public int VendorID { get; set; }
        public int AccountID { get; set; }
        public int BillId { get; set; }
        public string ApproverComment { get; set; }
        public string ApproverName { get; set; }
        public string ClerkName { get; set; }
        public float BalanceAmount { get; set; }
        public float PayableAmount { get; set; }
        public int Status { get; set; }
        public float ApprovedAmount { get; set; }
        public int ActionKey { get; set; }
        public DateTime DueOn { get; set; }
        public string SubmittedOn { get; set; }
        public int IsPartial { get; set; }
        public int ApproveStatus { get; set; }
        public int CreatedBy { get; set; }
        public int CurrentBillStageApprovalID { get; set; }

        public int PaymentTerms { get; set; }
        public string FileName { get; set; }
        public string FileDisplayName { get; set; }
        public string PhysicalPath { get; set; }
        public int Category { get; set; }
        public string Notes { get; set; }
        public DateTime BillDate { get; set; }
        public string InvoiceNumber { get; set; }
        public string Description { get; set; }
        public int IsSplited { get; set; }
        public int ClientId { get; set; }
        public float FileSize { get; set; }
        public string UserComment { get; set; }
        public string PurchaseOreder { get; set; }
        public int BillOwner { get; set; }
        public string Comment { get; set; }

    }



    public class MultiBillSubmit
    {
        public int BillId { get; set; }
        public int ActionKey { get; set; }
        public float PayableAmount { get; set; }
        public float ApprovedAmount { get; set; }
        public DateTime DueDate { get; set; }
        public int VendorId { get; set; }
        public string Comment { get; set; }
    }
}
