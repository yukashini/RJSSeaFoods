using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class Buyer
    {
        public int BuyerID { get; set; } 
        public string BuyerName { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string AltContactNumber { get; set; }
        public string BuyerFax { get; set; }
        public string CustomerAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public int ClientID { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public string Courieraddress { get; set; }
        public string CourierCity { get; set; }
        public string CourierState { get; set; }
        public string CourierCountry { get; set; }
        public string CourierZip { get; set; }
        public string CourierAttnName { get; set; }
        public string CourierContactNumber { get; set; }
        public string CourierAltContactNumber { get; set; }
        public string Liners { get; set; }
        public string Tax_id { get; set; }
        public string CourierEmail { get; set; }
    }
    public class BuyerInvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string BuyerName { get; set; }
        public string Status { get; set; }


    }
    public class BuyerINvoiceFilterfilter
    {
        public int Start { get; set; }
        public int Skip { get; set; }
        public string OrderBy { get; set; }
        public string BuyerName { get; set; }
    }
    public class Buyercontact
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int BuyerID { get; set; }
        public int ContactID { get; set; }
    }

    public class INvoiceBuyerFilterfilter
    {
        public string BuyerId { get; set; }
        public string Start { get; set; }
        public string Skip { get; set; }
        public string OrderBy { get; set; }

    }

    public class BuyerDocument
    {
        public string FileName { get; set; }
        public string FileModifiedName { get; set; }
        public string LastModifiedBy { get; set; }
        public int BuyerId { get; set; }
    }

}
