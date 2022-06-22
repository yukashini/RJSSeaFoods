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

namespace BillManagement
{
    public partial class PaymentMethodList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetPaymentMethodScreenData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PaymentMethodsListLogics.GetPaymentMethodList(Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertClientCard(ClientCards cardDetails)
        {
            int postStatus = 0;
          
            try
            {
                postStatus = PaymentMethodsListLogics.InsertClientCard(cardDetails, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetEditCardDetails(int editCardID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PaymentMethodsListLogics.FetchEditCardDetails(editCardID, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateClientCard(ClientCards cardDetails)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.UpdateClientCard(cardDetails, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteClientCard(int cardId)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.DeleteClientCard(cardId, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int MakeDefaultClientCard(int cardId)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.DefalutClientCard(cardId, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertClientAccount(ClientAccount accountDetails)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.InsertClientAccount(accountDetails, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetEditAccountDetails(int editAccountID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PaymentMethodsListLogics.FetchEditAccountDetails(editAccountID, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateClientAccount(ClientAccount accountDetails)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.UpdateClientAccount(accountDetails, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteClientAccount(int accountID)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.DeleteClientAccount(accountID, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int MakeDefaultClientAccount(int accountId)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.DefalutClientAccount(accountId, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }


        #region Adding Cards and ACH Accounts

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling AddCard(Card ObjCard)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.CreatePaymentMethod(ObjCard);
            }
            catch (Exception Ex)
            {
                throw;
            }

            return Stripe_Err;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling AddACH(Customer ObjCustomer)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.CreateCustomer(ObjCustomer);
                if (Stripe_Err.IsSuccess == true)
                {
                    ObjCustomer.CustomerID = Stripe_Err.Identity;
                    Stripe_Err = StripeAccounts.CreateCustomerBankAccount(ObjCustomer);
                }
            }
            catch (Exception Ex)
            {
                throw;
            }

            return Stripe_Err;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling VerifyACH(string CustomerID, string SourceID, string DepositA, string DepositB)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.VerifyCustomerBankAccount(CustomerID, SourceID, DepositA, DepositB);
            }
            catch (Exception Ex)
            {
                throw;
            }

            return Stripe_Err;
        }

        #endregion

        #region Payment Processing

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling PayBycard(PaymentTransaction ObjPaymentTransaction, Card ObjCard)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                Stripe_Err = StripeAccounts.CreatePaymentMethod(ObjCard);
                if (Stripe_Err.IsSuccess == true)
                {
                    ObjPaymentTransaction.PaymentToken = Stripe_Err.Identity;
                    Stripe_Err = StripeAccounts.PayByCard(ObjPaymentTransaction);
                }
            }
            catch (Exception Ex)
            {
                throw;
            }

            return Stripe_Err;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static StripeErrorHandling PayByACH(ACHPaymentTransaction ObjACHPaymentTransaction)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                if (!string.IsNullOrEmpty(ObjACHPaymentTransaction.Customer) && !string.IsNullOrEmpty(ObjACHPaymentTransaction.AccountID))
                {
                    Stripe_Err = StripeAccounts.PayByACH(ObjACHPaymentTransaction);
                }
                else
                {
                    Stripe_Err.IsSuccess = false;
                    Stripe_Err.message = "Account or CustomerID not fround";
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return Stripe_Err;
        }

        #endregion

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int ChangeVerifiedAccountStatus(int accountId)
        {
            int postStatus = 0;

            try
            {
                postStatus = PaymentMethodsListLogics.UpdateVerifedAccountStatus(accountId, Login.Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }
    }
}