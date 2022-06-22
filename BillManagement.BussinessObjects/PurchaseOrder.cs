using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class Purchase
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
    public class CreatePur
    {
        public int product { get; set; }
        public int quantity { get; set; }
        public string size { get; set; }
        public string cartoon { get; set; }
        public float price { get; set; }
        public float discount { get; set; }
        public float tax { get; set; }
        public float amount { get; set; }
        public string invoiceid { get; set; }
        public string discounttype { get; set; }

    }
    public class PurchaseObjectsVietnam
    {
        public int Shipper { get; set; }
        public int Consignee { get; set; }
        public string Invoicedate { get; set; }
        public int Paymentterms { get; set; }
        public string Invoice { get; set; }
        public string BuyersOrder { get; set; }
        public decimal Subtotal { get; set; }
        public int PortofLoading { get; set; }
        public int PortofDischarge { get; set; }
        public int Status { get; set; }
        public decimal Total { get; set; }
        public string BuyerDate { get; set; }
        public string product { get; set; }
        public DateTime ShipmentDate { get; set; }
        public decimal price { get; set; }
        public decimal amount { get; set; }
        public int invoiceid { get; set; }

        public string ExporterDate { get; set; }
        public string VesselNo { get; set; }
        public int terms { get; set; }
        public string PreCarriage { get; set; }
        public string PlaceofReceipt { get; set; }
        public int Destination { get; set; }
        public string Seal { get; set; }
        public string Container { get; set; }
        public decimal quantity { get; set; }
        public string declaration { get; set; }
        public decimal rate { get; set; }
        public string carton { get; set; }

        public string Size { get; set; }

    }
}
 
