using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class Malaysia
    {
        public  int LabelID { get; set; }
        public int BuyerID { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string Size { get; set; }
        public string Origin { get; set; }
        public string Weight { get; set; }
        public int ApprovalNo { get; set; }

        public string NetWeight  { get; set; }
        public string GrossWeight  { get; set; }
        public string ProductionCode { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime BestBeforeDate { get; set; }


       
        


    }
    //public class BuyerInvoiceFilterfilter
    //{
    //    public int Start { get; set; }
    //    public int Skip { get; set; }
    //    public string OrderBy { get; set; }
    //    public string BuyerName { get; set; }
    //    public string Status { get; set; }


    //}
    //public class BuyerINvoiceFilterfilter
    //{
    //    public int Start { get; set; }
    //    public int Skip { get; set; }
    //    public string OrderBy { get; set; }
    //    public string BuyerName { get; set; }
    //}
    //public class Buyercontact
    //{
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    public string Email { get; set; }
    //    public string Phone { get; set; }
    //    public int BuyerID { get; set; }
    //    public int ContactID { get; set; }
    //}

    //public class INvoiceBuyerFilterfilter
    //{
    //    public string BuyerId { get; set; }
    //    public string Start { get; set; }
    //    public string Skip { get; set; }
    //    public string OrderBy { get; set; }

    //}

    //public class BuyerDocument
    //{
    //    public string FileName { get; set; }
    //    public string FileModifiedName { get; set; }
    //    public string LastModifiedBy { get; set; }
    //    public int BuyerId { get; set; }
    //}

}
