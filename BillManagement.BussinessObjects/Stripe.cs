using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    public class StripeConnectedAccounts
    {
        public string FirstName { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string line1 { get; set; }
        public string line2 { get; set; }
        public string postal_code { get; set; }
        public string state { get; set; }
        public string day { get; set; }
        public string month { get; set; }
        public string year { get; set; }
        public string id_number { get; set; }
        public string phone { get; set; }
        public string url { get; set; }

        public string date { get; set; }

        public string ip { get; set; }

        public bool IsBankAccountAttached { get; set; }
        public string accountRefID { get; set; }
    }

    public class StripeErrorHandling
    {
        public string code { get; set; }
        public string doc_url { get; set; }
        public string message { get; set; }
        public string param { get; set; }
        public string type { get; set; }

        public bool IsSuccess { get; set; }
        public string Description { get; set; }

        public int StatusCode { get; set; }

        public string Identity { get; set; }
    }

    public class UsersBankAccount
    {
        public string Identityfier { get; set; }
        public string AccountNumber { get; set; }
        public string RoutingNumber { get; set; }

        public string Country { get; set; }
        public string Currency { get; set; }
        public string Object { get; set; }

        public string AccountHolderName { get; set; }

        public string AccountType { get; set; }
    }

    public class Card
    {
        public string CardNumber { get; set; }
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public string CVV { get; set; }

    }

    public class PaymentTransaction
    {
        public string AccountID { get; set; }
        public string Amount { get; set; }
        public string PaymentToken { get; set; }
        public string TransferAmount { get; set; }
        public string Currency { get; set; }
        public string Customer { get; set; }


    }

    public class Customer
    {
        public string CustomerID { get; set; }
        public string SourceID { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }

        public string country { get; set; }
        public string currency { get; set; }

        public string account_holder_name { get; set; }

        public string account_holder_type { get; set; }

        public string routing_number { get; set; }

        public string account_number { get; set; }
        public string BankAccountStatus { get; set; }
    }

    public class ACHPaymentTransaction
    {
        public string AccountID { get; set; }
        public string Amount { get; set; }
        public string TransferAmount { get; set; }
        public string Currency { get; set; }
        public string Customer { get; set; }
        public string MethodType { get; set; }
    }

}