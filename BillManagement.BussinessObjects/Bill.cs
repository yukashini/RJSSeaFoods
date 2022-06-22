using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class Bill
    {

        public int BillID { get; set; }
        public int VendorID { get; set; }
        public int AccountID { get; set; }
        public DateTime BillDate { get; set; }
        public string Amount { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime DueDate { get; set; }
        public int Category { get; set; }
        public string Notes { get; set; }
        public int PaymentTerms { get; set; }
        public int IsSplitted { get; set; }
        public int Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int IsActive { get; set; }
        public int ClientID { get; set; }
        public string PhysicalLocation { get; set; }
        public string ModifiedFileName { get; set; }
        public string FileDisplayName { get; set; }
        public string FileSize { get; set; }
        public string FileName { get; set; }
        public string UserComment { get; set; }
        public float Balance { get; set; }
        public string PurchaseOrder { get; set; }
        public int IsAutoApproval { get; set; }
        public int IsReminder { get; set; }
        public string ReminderEmail { get; set; }
        public int ReminderInterval { get; set; }
        public string ReminderIntervalDay { get; set; }
        public int IsRecurring { get; set; }



        public string TransactionDate { get; set; }
        //  public string InvoiceNumber { get; set; }
        public string Address { get; set; }
        public string VendorName { get; set; }
        public string TotalAmount { get; set; }
        public string TaxAmount { get; set; }
        // public string DueDate { get; set; }
        public bool IsTransaction { get; set; }
        public string Error { get; set; }
        public string SupportRawData { get; set; }
        public System.Net.Http.HttpResponseMessage response { get; set; }
    }

    public class Bill_Custom_Breakage
    {
        public int ClientID { get; set; }
        public int BillID { get; set; }
        public int VendorID { get; set; }
        public string VendorName { get; set; }
        public int AccountID { get; set; }
        public string BillDate { get; set; }
        public float Amount { get; set; }
        public float Balance { get; set; }
        public string InvoiceNumber { get; set; }
        public string DueDate { get; set; }
        public int Category { get; set; }
        public string Notes { get; set; }
        public int PaymentTerms { get; set; }
        public string Description { get; set; }
        public int IsSplitted { get; set; }
        public int Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int IsActive { get; set; }
        public string PhysicalLocation { get; set; }
        public string ModifiedFileName { get; set; }
        public string FileDisplayName { get; set; }
        public float FileSize { get; set; }
        public string FileName { get; set; }
        public string UserComment { get; set; }
        public string PurchaseOrder { get; set; }
        public int IsAutoApproval { get; set; }
        public int IsReminder { get; set; }
        public string ReminderEmail { get; set; }
        public int ReminderInterval { get; set; }
        public string ReminderIntervalDay { get; set; }
        public int IsRecurring { get; set; }
        public List<BillBreakage> lstBillBreakage { get; set; }
        public int Project { get; set; }
        public int Customer { get; set; }


    }

    public class ResponseAPI
    {
        public string PhysicalLocation { get; set; }
        public string ModifiedFileName { get; set; }
        public string FileDisplayName { get; set; }

        public string TransactionDate { get; set; }
        public string InvoiceNumber { get; set; }
        public string Address { get; set; }
        public string VendorName { get; set; }
        public string TotalAmount { get; set; }
        public string TaxAmount { get; set; }
        public string DueDate { get; set; }
        public bool IsTransaction { get; set; }
        public string Error { get; set; }
        public string SupportRawData { get; set; }
        public System.Net.Http.HttpResponseMessage response { get; set; }
    }

    public class MultiBill
    {
        public int BillId { get; set; }
    }

    public class UserHomeScreen
    {
        public int AccountId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string CurrentWeekStartDate { get; set; }
        public string CurrentWeekEndDate { get; set; }
        public string LastWeekStartDate { get; set; }
        public string LastWeekEndDate { get; set; }
        public int IsOverDue { get; set; }
        public string currentDay { get; set; }
        public string lastDay { get; set; }
        public int Status { get; set; }
        public string DueFrom { get; set; }
        public string DueTo { get; set; }
        public string OverDueDate { get; set; }
        public int IsOnload { get; set; }
        public int IsDueFilter { get; set; }
    }


    public class CustomBill
    {
        public string ClerkName { get; set; }
        public int ClientID { get; set; }
        public int BillID { get; set; }
        public int VendorID { get; set; }
        public string VendorName { get; set; }
        public int AccountID { get; set; }
        public string BillDate { get; set; }
        public float Amount { get; set; }
        public float Balance { get; set; }
        public string InvoiceNumber { get; set; }
        public string DueDate { get; set; }
        public int Category { get; set; }
        public string Notes { get; set; }
        public int PaymentTerms { get; set; }
        public string Description { get; set; }
        public int IsSplitted { get; set; }
        public int Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int IsActive { get; set; }
        public string PhysicalLocation { get; set; }
        public string ModifiedFileName { get; set; }
        public string FileDisplayName { get; set; }
        public float FileSize { get; set; }
        public string FileName { get; set; }
        public string UserComment { get; set; }
        public string PurchaseOrder { get; set; }
        public int IsAutoApproval { get; set; }
        public int IsReminder { get; set; }
        public string ReminderEmail { get; set; }
        public int ReminderInterval { get; set; }
        public string ReminderIntervalDay { get; set; }
        public int IsRecurring { get; set; }
        public int RecurrenceReferenceId { get; set; }
        public int RecurrenceFrequency { get; set; }
        public DateTime RecurrenceStartDate { get; set; }
        public DateTime RecurrenceEndDate { get; set; }
        public int RecurrenceBatchNumber { get; set; }
        public int IsApplyToAll { get; set; }
        public string Comment { get; set; }
        public int Customer { get; set; }
        public int Project { get; set; }
        public int BillCategory { get; set; }
        public List<BillBreakage> lstBillBreakage { get; set; }
        public List<BillDescription> lstBillDescription { get; set; }
        public List<BillAttachments> lstBillAttchments { get; set; }
        public List<BillComments> lstBillNotes { get; set; }
        public List<BillApprovalStage> lstApprovers { get; set; }
    }

    public class BillDescription
    {
        public int BillDescriptionId { get; set; }
        public int BillId { get; set; }
        public float Rate { get; set; }
        public int Quantity { get; set; }
        public float Total { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }


    }


    public class BillListFilter
    {
       public int Start { get; set; }
        public int Skip { get; set; }
        public int ApplicctionID { get; set; }
        public string OrderBy { get; set; }
        public int StatusCondition { get; set; }
        public int Status { get; set; }
        public int IsRecurring { get; set; }
        public string DueDateFrom { get; set; }
        public string DueDateTo { get; set; }
        public string PaymentStatus { get; set; }
        public int IsOverDue { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int VendorID { get; set; }
        public string InvoiceNumber { get; set; }
        public int Dstatus { get; set; }
        public int KpiStatus { get; set; }
        public string DueFrom { get; set; }
        public string DueTo { get; set; }
        public string OverDueDate { get; set; }
        public string CreatedDate { get; set; }
        public string PaidDate { get; set; }
        public int IsDueFilter { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int BillCategoryId { get; set; }
        public int Project { get; set; }
        public int Customer { get; set; }
        public string CustomerName { get; set; }
        public float Expense { get; set; }
        public int AssociatedProject { get; set; }
        public int AssociatedBill { get; set; }
        public string ProjectName { get; set; }
        public string ProjectType { get; set; }
        public string strStatus { get; set; }
        public int AccountID { get; set; }
        public int Isallbill { get; set; }
        public string EmpName { get; set; }
         public string DESIGNATION { get; set; }
        public string EMAIL { get; set; }
        public string DOB { get; set; }
        public string ADDRESS { get; set; }
        public string CONTACT_NO { get; set; }
    }

    public class BillListCommand
    {
        public int Billid { get; set; }
        public string Command { get; set; }

    }

    public class VendorListFilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public int ApplicctionID { get; set; }
        public string OrderBy { get; set; }
        public int StatusCondition { get; set; }
        public int Status { get; set; }
        public int IsRecurring { get; set; }
        public string VendorName { get; set; }
        public string Balance { get; set; }
        public string LastPayment { get; set; }

    }

    public class PaymentStatusFilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Vendor { get; set; }
        public string BillNo { get; set; }
        public string TransactionId { get; set; }
        public string PaidBy { get; set; }
        public string Mode { get; set; }
        public string Status { get; set; }
        public string Fromdate { get; set; }
        public string Todate { get; set; }

    }
    public class BilldueFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Vendor { get; set; }
        public string Dueinday { get; set; }
        public string Duefrom { get; set; }
        public string Dueto { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Approvalstatus { get; set; }
        public string Paymentstatus { get; set; }
    }
    public class BillVendorBalaneFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Vendor { get; set; }
        public string Duefrom { get; set; }
        public string Dueto { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string BillableAmt { get; set; }

    }
    public class InvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Customer { get; set; }
        public string Invoice { get; set; }
        public string Status { get; set; }


    }
    public class InvoiceVietnamFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Shipper { get; set; }
        public string Invoice { get; set; }
        public string Status { get; set; }
    }
    public class HistoryFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Shipper { get; set; }
        public string Invoice { get; set; }
        public string Status { get; set; }
    }
    public class InvoiceMailDetails
    {
        public string Tomail { get; set; }
        public string Ccmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }

    public class Auditlog
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Activity { get; set; }
        public string Description { get; set; }
        public string Screen { get; set; }
        public string User { get; set; }
        public string Fromdate { get; set; }
        public string Todate { get; set; }

    }
    public class AllBilllist
    {
        public string CustId { get; set; }
        public string Start { get; set; }
        public string Skip { get; set; }
        public string OrderBy { get; set; }

    }

    public class AgingSummaryfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Vendor { get; set; }
        public string BalanceAmt { get; set; }
        public string Totalamt { get; set; }

    }
    public class AgingDetailedfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Vendor { get; set; }
        public string Duedate { get; set; }
        public string PaymentTerms { get; set; }
        public string Balanceamt { get; set; }
        public string Fromval { get; set; }
        public string Toval { get; set; }
        public string Fromdate { get; set; }
        public string Todate { get; set; }

    }
    public class ConfiguredApprovers
    {
        public int IsVendor { get; set; }
        public int VendorID { get; set; }
        public float Amount { get; set; }

    }

    public class CustomerLists
    {
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int ClientId { get; set; }
        public int Emp_Id { get; set; }
        public string Designation { get; set; }
        public  DateTime Dob { get; set; }
        public string contact_no { get; set; }
        public string emergency_no { get; set; }
    }


    public class INvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string Customername { get; set; }
        public string Balance { get; set; }
        public string Totalamont { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public string EmployeeCode { get; set; }
        public string Address { get; set; }
        public string Contact_No { get; set; }
        public int EmployeeId { get; set; }
    }

   

    public class CreateBill
    {
        public int product { get; set; }
        public int quantity { get; set; }
        public float price { get; set; }
        public float discount { get; set; }
        public float tax { get; set; }
        public float amount { get; set; }
        public string invoiceid { get; set; }
        public string discounttype { get; set; }
        public string size { get; set; }
        public string carton { get; set; }

    }

    public class CreateBillobj
    {
        public int product { get; set; }
        public int quantity { get; set; }
        public float price { get; set; }
        public float discount { get; set; }
        public float tax { get; set; }
        public float amount { get; set; }
        public string invoiceid { get; set; }
        public string discounttype { get; set; }
        public int Billstatus { get; set; }


    }
    public class SavePartialObjects
    {
        public string CustomerName { get; set; }
        public string Duedate { get; set; }
        public int PaymentMode { get; set; }
        public string refNumber { get; set; }
        public float BalanceAmount { get; set; }
        public string Invoice { get; set; }
        public float PayableAmount { get; set; }
        public string PaidOn { get; set; }
        public float AmountPaid { get; set; }
        public int Status { get; set; }
        public int CustomerId { get; set; }
         public int InvoiceId { get; set; }
      }

    public class EMPFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string EmployeeFirstName { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public string EmployeeCode { get; set; }
        public string Address { get; set; }
        public string Contact_No { get; set; }
        public int EmployeeId { get; set; }
    }
     
}
