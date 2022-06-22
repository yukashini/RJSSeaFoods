using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
   public class Billpayment
    {
        public int LastApprover { get; set; }
        public string PayerName { get; set; }
        public string CreatedByName { get; set; }
        public int CreatedBy { get; set; }
        public int ActionKey { get; set; }
        public int BillId { get; set; }
        public int Status { get; set; }
        public int paymentStatus { get; set; }
        public string InvoiceNumber { get; set; }
        public string VendorName { get; set; }
        public string VendorEmail { get; set; }
        public string TotalAmount { get; set; }
        public string StrDate { get; set; }
        public string OrgName { get; set; }
        public int ApproveBillId { get; set; }
        public string DisputeComment { get; set; }
        public float Amount { get; set; }
    }

    public class BillMarkAsPaid
    {
        public int BillId { get; set; }
        public int ApproveBillId { get; set; }
        public int PaidBy { get; set; }
        public float PaidAmount { get; set; }
        public float DueAmount { get; set; }
        public string PaymentMode { get; set; }
        public string ReferenceID { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime PaidOn { get; set; }
        public int TypeOfPayment { get; set; }
        public List<BillAttachments> AttachmentList { get; set; }
    }
}
