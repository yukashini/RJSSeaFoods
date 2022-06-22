using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApp4Dwolla;

namespace BillManagement
{
    public partial class PaymentMethod : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetPaymentMethodScreenData(int billID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PaymentMethodLogics.FetchPaymentMethodScreenData(billID,Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling ProcessPayment(StripeConnectedAccounts ObjstripeConnectedAccounts, UsersBankAccount ObjUsersBankAccount)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {

                Stripe_Err = StripeAccounts.CreateConnectedAccounts(ObjstripeConnectedAccounts, ObjUsersBankAccount);

            }

            catch(Exception ex)
            {
              
                ExceptionLogEntry.LogException(ex);
            }
            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling UpdateConnectedAccount(StripeConnectedAccounts ObjstripeConnectedAccounts, UsersBankAccount ObjUsersBankAccount)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {

                Stripe_Err = StripeAccounts.UpdateConnectedAccounts(ObjstripeConnectedAccounts, ObjUsersBankAccount);

            }

            catch (Exception ex)
            {

                ExceptionLogEntry.LogException(ex);
            }
            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling GetretrivedConnectedAccountDetails(string RefID)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.RetrieveConnectedAccounts(RefID);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling CreateConnectedAccount_BankDetails(string RefID,string token)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.CreateConnectedAccounts_BankAccounts(RefID, token);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateReferenceID(int VendorID, string refID)
        {
            int postStatus = 0;
            try
            {
                postStatus = PaymentMethodLogics.UpdateVendorReference(VendorID, refID, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling PayAmountByCard(PaymentTransaction ObjPaymentTransaction)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.PayByCard(ObjPaymentTransaction);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling PayAmountByAccount(ACHPaymentTransaction ObjPaymentTransaction)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.PayByACH(ObjPaymentTransaction);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdatePayedBillStatus(int billID)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodLogics.ChangePayedBillStatus(billID, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetDwollaAccountdetails()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DwollaLogics.getAccountdetails();
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetDwollaFundingSources()
        {
          
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DwollaLogics.getSourceAccountdetails();
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string TransferFundToDwolla(SendFund FundObj)
        {

            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DwollaLogics.SendFund(FundObj, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string ConnectVendorWithDwolla(VendorDetails vendorValues)
        {
            string custId = "";

            try
            {
                custId = PaymentMethodLogics.SyncWithDwolla(vendorValues, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return custId;
        }
    }
}