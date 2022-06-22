using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using ISCLibrary.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
//using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using Newtonsoft.Json;
using WebApp4Dwolla;






namespace BillManagement
{
    public partial class PaymentSetup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int ConnectPaypal(PaypalSettings ObjpaypalSettings)
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PaypalAccountType = Convert.ToInt32(ConfigurationManager.AppSettings["PaypalAccount"]);
            int PostStatus = 0;
            try
            {
                ObjpaypalSettings.CustomerID = clientID;
                ObjpaypalSettings.CreatedBy = accountID;
                PaypalService ObjPaypalService = new PaypalService(PaypalAccountType);
                PaypalTransaction ObjTransaction = ObjPaypalService.GetAuthorizationToken(ObjpaypalSettings.APIClientID, ObjpaypalSettings.APISecretKey);
                if (ObjTransaction.IsSuccess == true)
                {
                    ObjTransaction = ObjPaypalService.GetBalance(ObjpaypalSettings);
                    if (ObjTransaction.IsSuccess == true)
                    {
                        ObjpaypalSettings.IsConnected = 1;
                        PostStatus = Innospire_Paypal_DB_Service.InsertPaypalConfiguration(clientID, ObjpaypalSettings, Login.Connection);
                        int postStatus = ApplicationUsers.InsertAuditlog("Connected", "PayPal Payment Gateway is connected", "Payment Setup", Login.Connection);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool IsPaypalConnected()
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PaypalAccountType = Convert.ToInt32(ConfigurationManager.AppSettings["PaypalAccount"]);
            bool PostStatus = false;
            try
            {
                DataTable dt = Innospire_Paypal_DB_Service.GetPaypalConfiguration(clientID, Login.Connection);
                if (dt.Rows.Count > 0)
                {
                    if (Convert.ToInt32(dt.Rows[0]["IsConnected"]) == 1)
                        PostStatus = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetPaypalBalance()
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PaypalAccountType = Convert.ToInt32(ConfigurationManager.AppSettings["PaypalAccount"]);
            string Result = "";
            try
            {
                PaypalService ObjPaypalService = new PaypalService(PaypalAccountType);
                PaypalTransaction ObjTrans = new PaypalTransaction();
                PaypalSettings ObjPaypalSettings = new PaypalSettings();
                dynamic PaypalConnection = null;
                string AuthenticationToken = string.Empty;

                // Get Paypal Configuration
                DataTable dt = Innospire_Paypal_DB_Service.GetPaypalConfiguration(clientID, Login.Connection);
                if (dt.Rows.Count > 0)
                {
                    if (Convert.ToInt32(dt.Rows[0]["IsConnected"]) == 1)
                    {
                        ObjPaypalSettings.APIClientID = Convert.ToString(dt.Rows[0]["APIClientID"]);
                        ObjPaypalSettings.APISecretKey = Convert.ToString(dt.Rows[0]["APISecretKey"]);
                        ObjPaypalSettings.APIUserName = Convert.ToString(dt.Rows[0]["APIUserName"]);
                        ObjPaypalSettings.APIPassword = Convert.ToString(dt.Rows[0]["APIPassword"]);
                        ObjPaypalSettings.APISignature = Convert.ToString(dt.Rows[0]["APISignature"]);


                        PaypalTransaction ObjTransaction = ObjPaypalService.GetAuthorizationToken(ObjPaypalSettings.APIClientID, ObjPaypalSettings.APISecretKey);
                        if (ObjTransaction.IsSuccess == true)
                        {
                            PaypalConnection = ObjTransaction.Result;
                        }

                        // Get Paypal Balance
                        ObjTrans = ObjPaypalService.GetBalance(ObjPaypalSettings);
                        Result = JsonConvert.SerializeObject(ObjTrans);
                    }


                }


            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }

            return Result;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetPaypalTransaction()
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PaypalAccountType = Convert.ToInt32(ConfigurationManager.AppSettings["PaypalAccount"]);
            string Result = "";
            try
            {
                PaypalService ObjPaypalService = new PaypalService(PaypalAccountType);
                PaypalTransaction ObjTrans = new PaypalTransaction();
                PaypalSettings ObjPaypalSettings = new PaypalSettings();
                dynamic PaypalConnection = null;
                string AuthenticationToken = string.Empty;

                // Get Paypal Configuration
                DataTable dt = Innospire_Paypal_DB_Service.GetPaypalConfiguration(clientID, Login.Connection);
                if (dt.Rows.Count > 0)
                {
                    if (Convert.ToInt32(dt.Rows[0]["IsConnected"]) == 1)
                    {
                        ObjPaypalSettings.APIClientID = Convert.ToString(dt.Rows[0]["APIClientID"]);
                        ObjPaypalSettings.APISecretKey = Convert.ToString(dt.Rows[0]["APISecretKey"]);
                        ObjPaypalSettings.APIUserName = Convert.ToString(dt.Rows[0]["APIUserName"]);
                        ObjPaypalSettings.APIPassword = Convert.ToString(dt.Rows[0]["APIPassword"]);
                        ObjPaypalSettings.APISignature = Convert.ToString(dt.Rows[0]["APISignature"]);


                        PaypalTransaction ObjTransaction = ObjPaypalService.GetAuthorizationToken(ObjPaypalSettings.APIClientID, ObjPaypalSettings.APISecretKey);
                        if (ObjTransaction.IsSuccess == true)
                        {
                            PaypalConnection = ObjTransaction.Result;
                        }
                    }
                }

                // Get Authentication Token
                if (PaypalConnection != null)
                {
                    if (PaypalConnection["access_token"] != null)
                    {
                        AuthenticationToken = Convert.ToString(PaypalConnection["access_token"]);
                    }
                }

                // Get Paypal Transaction
                string StartDate = DateTime.Now.AddMonths(-1).ToString("yyyy-MM-dd");
                string EndDate = DateTime.Now.ToString("yyyy-MM-dd");
                ObjTrans = ObjPaypalService.GetRecentTransaction(StartDate, EndDate, AuthenticationToken);
                if (ObjTrans.IsSuccess == true)
                {
                    Result = JsonConvert.SerializeObject(ObjTrans.Result);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }

            return Result;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeletePaypalAccount()
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PaypalAccountType = Convert.ToInt32(ConfigurationManager.AppSettings["PaypalAccount"]);
            int PostStatus = 0;
            try
            {
                PostStatus = Innospire_Paypal_DB_Service.DeletePaypalConfiguration(clientID, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }

            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DoPayout(object ObjPayoutObject,Billpayment BillObj, int BillID,int userBillID)
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PaypalAccountType = Convert.ToInt32(ConfigurationManager.AppSettings["PaypalAccount"]);
            int PostStatus = 0;
            string Result = "";
            string StrPayoutObject = JsonConvert.SerializeObject(ObjPayoutObject);
            try
            {
                PaypalService ObjPaypalService = new PaypalService(PaypalAccountType);
                PaypalTransaction ObjTrans = new PaypalTransaction();
                PaypalSettings ObjPaypalSettings = new PaypalSettings();
                dynamic PaypalConnection = null;
                string AuthenticationToken = string.Empty;

                // Get Paypal Configuration
                DataTable dt = Innospire_Paypal_DB_Service.GetPaypalConfiguration(clientID, Login.Connection);
                if (dt.Rows.Count > 0)
                {
                    if (Convert.ToInt32(dt.Rows[0]["IsConnected"]) == 1)
                    {
                        ObjPaypalSettings.APIClientID = Convert.ToString(dt.Rows[0]["APIClientID"]);
                        ObjPaypalSettings.APISecretKey = Convert.ToString(dt.Rows[0]["APISecretKey"]);
                        ObjPaypalSettings.APIUserName = Convert.ToString(dt.Rows[0]["APIUserName"]);
                        ObjPaypalSettings.APIPassword = Convert.ToString(dt.Rows[0]["APIPassword"]);
                        ObjPaypalSettings.APISignature = Convert.ToString(dt.Rows[0]["APISignature"]);


                        PaypalTransaction ObjTransaction = ObjPaypalService.GetAuthorizationToken(ObjPaypalSettings.APIClientID, ObjPaypalSettings.APISecretKey);
                        if (ObjTransaction.IsSuccess == true)
                        {
                            PaypalConnection = ObjTransaction.Result;
                        }

                        // Get Authentication Token
                        if (PaypalConnection != null)
                        {
                            if (PaypalConnection["access_token"] != null)
                            {
                                AuthenticationToken = Convert.ToString(PaypalConnection["access_token"]);
                            }
                        }

                        // Get Paypal Balance
                        ObjTrans = ObjPaypalService.DoPayout(AuthenticationToken, StrPayoutObject);
                        if (ObjTrans.IsSuccess == true)
                        {
                            PostStatus = 1;
                            PaypalTransaction ObjPayoutTrans = new PaypalTransaction();
                            dynamic PayoutTransaction = ObjTrans.Result;
                            string BatchID = PayoutTransaction["batch_header"]["payout_batch_id"];
                            //ObjPayoutTrans = ObjPaypalService.PayoutTransaction(BatchID, AuthenticationToken);
                            //if (ObjPayoutTrans.IsSuccess == true)
                            //{

                            //}

                            // Insert into DB
                            VendorListLogics.BillPaidStatus(BillID, BatchID, userBillID,BillObj.Amount, Login.Connection);

                            //Send payment success Email to financer 
                            VendorListLogics.SendPaymentSuccessEmailToFinanceManager(BillObj.InvoiceNumber, Login.Connection,1);
                            
                            //Send Payment success Email to Vendor
                            VendorListLogics.SendPaymentSuccessEmailToVendor(BillObj, Login.Connection);
                            PostStatus = 1;
                            int postStatus = ApplicationUsers.InsertAuditlog("Payment", "Payment done for Bill# " + " " + BillObj.InvoiceNumber + "", "Payment Methods", Login.Connection);
                        }
                        else
                        {
                            //Send payment failed email
                            VendorListLogics.SendPaymentSuccessEmailToFinanceManager(BillObj.InvoiceNumber, Login.Connection, 0);
                            PostStatus = 0;
                            int postStatus = ApplicationUsers.InsertAuditlog("Payment", "Payment failed for Bill# " + " " + BillObj.InvoiceNumber + "", "Payment Methods", Login.Connection);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }

            return PostStatus;
        }

        //Dwolla Integrations
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int ConnectDwolla(DwollaSettings ObjDwollaSettings)
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PostStatus = 0;
            try
            {
                string account = DwollaLogics.getrootval(ObjDwollaSettings.DwollaKey, ObjDwollaSettings.SecretKey);
                ObjDwollaSettings.AccountId = account;
                ObjDwollaSettings.IsConnected = 1;
                ObjDwollaSettings.CreatedBy = accountID;
                PostStatus = Innospire_Dwolla_DB_Services.InsertDwollaConfiguration(clientID, ObjDwollaSettings, Login.Connection);

                Innospire_Dwolla_DB_Services.InsertDwollaConnectedDetails(account, Login.Connection);
                int postStatus = ApplicationUsers.InsertAuditlog("Connected", "Dwolla Payment Gateway is connected", "Payment Setup", Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
                PostStatus = 0;
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DisconnectDwolla()
        {
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int PostStatus = 0;
            try
            {
               
                PostStatus = Innospire_Dwolla_DB_Services.DeleteDwollaConfiguration(clientID, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool IsDwollaConnected()
        {
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            bool PostStatus = false;
            try
            {
                DataTable dt = Innospire_Dwolla_DB_Services.GetDwollaConfiguration(clientID, Login.Connection);
                if (dt.Rows.Count > 0)
                {
                    if (Convert.ToInt32(dt.Rows[0]["IsConnected"]) == 1)
                        PostStatus = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetDwollaTransactions()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = Innospire_Dwolla_DB_Services.FetchDwollaTransactions(Login.Connection);
                //if (ds.Tables.Count > 0)
                //{
                //    data = Utilities.SerializedDataSet(ds);
                //}
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DisConnectDwolla()
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                postStatus = Innospire_Dwolla_DB_Services.DeleteDwollaConfiguration(clientID,Login.Connection);
                //if (ds.Tables.Count > 0)
                //{
                //    data = Utilities.SerializedDataSet(ds);
                //}
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }
    }

}