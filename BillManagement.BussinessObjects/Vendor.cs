using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class Vendor
    {
        public int VendorID { get; set; }
        public string VendorName { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int ClientID { get; set; }
        public int IsActive { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AddressLineOne { get; set; }
        public string AddressLineTwo { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string State { get; set; }
        public string DOB { get; set; }
        public string SSNNumber { get; set; }
        public string Phone { get; set; }
        public string WebsiteURL { get; set; }
        public string ReferenceID { get; set; }
        public string LeadTimeDays { get; set; }
        public string TaxId { get; set; }
        public int VendorType { get; set; }
        public int PrefferedPaymentMethod { get; set; }
        public int PaymentTerm { get; set; }
        public string VendorLogo { get; set; }
        public string GLCode { get; set; }
        public string PayPalEmailAddress { get; set; }
        public string PayPalMobile { get; set; }
        public string ExternalNumber { get; set; }
        public string DwollaCustomerID { get; set; }
        public string DwollaFundID { get; set; }
    }

    public class VendorBankAccount
    {
        public int IdentityID { get; set; }
        public int VendorID { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int ClientID { get; set; }
        public string AccountNumber { get; set; }
        public string AccountHolderName { get; set; }
        public string RoutingNumber { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int isBankAccountAdded { get; set; }
    }

    public class VendorDetails
    {
        public Vendor Vendor { get; set; }
        public VendorBankAccount VendorBankAccount { get; set; }
    }

    public class VendorContacts
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int VendorID { get; set; }
        public int ContactID { get; set; }
        
    }

    public class VendorDocuments
    {
        public string FileName { get; set; }
        public string FileModifiedName { get; set; }
        public string LastModifiedBy { get; set; }
        public int VendorId { get; set; }
    }
    public class VendorExcelImport
    {
        public string VendorName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PrefferedPaymentMethod { get; set; }
        public string PaymentTerm { get; set; }
        public string GLCode { get; set; }
    }
}
