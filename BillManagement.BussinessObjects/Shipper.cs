using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class Shipper
    {
        public int ShipperID { get; set; }
        public string ShipperName { get; set; }
        public string ShipperEmail { get; set; }
        public string ShipperContactNumber { get; set; }
        public string ShipperAltContactNumber { get; set; }
        public string ShipperNo { get; set; }
        public string ShipperGST { get; set; }
        public string ShipperAddress { get; set; }
        public string ShipperCity { get; set; }
        public string ShipperState { get; set; }
        public string ShipperCountry { get; set; }
        public string ShipperZip { get; set; }
        public int ClientID { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public string ApprovalNo { get; set; }
        public string DripCapital { get; set; }
        public string ProcessPacked { get; set; }
        public string ProcessPackedaddress { get; set; }
        public string ProcessPackedCity { get; set; }
        public string ProcessPackedState { get; set; }
        public string ProcessPackedAppno { get; set; }
        public string ProcessPackedCountry { get; set; }
        public string ProcessPackedZip { get; set; }
    }
    public class ShipperInvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string ShipperName { get; set; }
        public string Status { get; set; }
    }
    public class ShipperINvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string BuyerName { get; set; }
    }
    public class Shippercontact
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int ShipperID { get; set; }
        public int ContactID { get; set; }
    }
    public class ShipperBank
    {
        public string BankName { get; set; }
        public string BankCode { get; set; }
        public string BankAccNo { get; set; }
        public string BankIFSCCode { get; set; }
        public string BankBranch { get; set; }
        public string BankSwift { get; set; }
        public string BankRoutingNo { get; set; }
        public string BankWireNo { get; set; }
        public string BankAddress { get; set; }
        public string BankCity { get; set; }
        public string BankState { get; set; }
        public string BankCountry { get; set; }
        public string BankZip { get; set; }
        public int ShipperID { get; set; }
        public int BankID { get; set; }

    }

    public class INvoiceShipperFilterfilter
    {
        public string ShipperId { get; set; }
        public string Start { get; set; }
        public string Skip { get; set; }
        public string OrderBy { get; set; }

    }

    public class ShipperDocument
    {
        public string FileName { get; set; }
        public string FileModifiedName { get; set; }
        public string LastModifiedBy { get; set; }
        public int ShipperId { get; set; }
    }
}

