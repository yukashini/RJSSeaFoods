using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class CofigurationObjects
    {
        public int ClientID { get; set; }
        public int IsChangesAllowed { get; set; }
        public int IsSplitAllowed { get; set; }
        public int IsRecurrenceEnabled { get; set; }
        public int IsBillAssociationEnabled { get; set; }
        public int IsBillExportEnabled { get; set; }
        public int IsEpaymentsEnabled { get; set; }
        public int IsOfflinePaymentsAllowed { get; set; }
        public int IsImportVendorsAllowed { get; set; }
        public int IsAutoApproval { get; set; }
        public int IsMultiApproval { get; set; }
        public int IsDefaultApproval { get; set; }
        public int IsStandardApproval { get; set; }
        public int IsCustomApproval { get; set; }
        public int IsPartialApproval { get; set; }
        public List<ApprovalSequence> Approvers { get; set; }
        public string Prefix { get; set; }
        public int Split { get; set; }
        public int Sendmail { get; set; }
        public string Terms { get; set; }
        public string Note { get; set; }
        public string Template { get; set; }
    }

    public class ApprovalSequence
    {
        public int AccountID { get; set; }
        public int ApproverSeq { get; set; }
    }

    public class CustomApprovalConfigurationObjects
    {
        public int IdentityID { get; set; }
        public int IsVendorType { get; set; }
        public int IsAmountType { get; set; }
        public int VendorID { get; set; }
        public float Amount { get; set; }
        public int Condition { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int ClientID { get; set; }
        public int IsActive { get; set; }
        public float SecondAmount { get; set; }
        public List<CustomApprovers> lstApprovers { get; set; }
    }

    public class CustomApprovers
    {
        public int IdentityID { get; set; }
        public int ConfigID { get; set; }
        public int ApproverID { get; set; }
        public int Sequence { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int ClientID { get; set; }
        public int IsActive { get; set; }
    }

}
