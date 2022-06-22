using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RestSharp;
using ISCLibrary.DataAccessLayer;
using PayPal.PayPalAPIInterfaceService;
using PayPal.PayPalAPIInterfaceService.Model;

namespace BillManagement.BusinessLogic
{

    /**
    * Author : Karthick SM
    * Date : 02/20/2021
    */

    public class AsymetricKeys
    {
        public const string AsymetricKey = "Bill_AssymetricKey";
        public const string AsymetricPassword = "Paypal_billManagement_Pass";
    }

    public class PaypalService
    {

        /// <summary>
        ///  This Class contains
        ///  GetBalance Method
        ///  GetAuthorization Token Method
        ///  Do Payout Method
        ///  Get Payout Transaction 
        ///  Get Transaction By Transaction ID
        /// </summary>

        // Environment
        public static string URL = "";
        public static string Environment = "";

        public PaypalService(int Type)
        {
            if (Type == 1) // Sandbox
            {
                URL = "https://api-m.sandbox.paypal.com";
                Environment = "sandbox";
            }
            else // Live
            {
                URL = "https://api-m.paypal.com";
                Environment = "live";
            }
        }

        // Authorize User
        public PaypalTransaction GetAuthorizationToken(string ClientID, string SecretKey)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PaypalTransaction PT = new PaypalTransaction();
            try
            {
                var ServiceURL = URL + "/v1/oauth2/token";
                var AuthorizationCode = "Basic " + Base64Encode(ClientID + ":" + SecretKey);
                var client = new RestClient(ServiceURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Authorization", AuthorizationCode);
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddParameter("grant_type", "client_credentials");
                IRestResponse response = client.Execute(request);
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(response.Content);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    PT.IsSuccess = true;
                    PT.Result = Temp_dynamic;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                }
                else
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic["error_description"]);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return PT;
        }

        // Get Balance
        public PaypalTransaction GetBalance(string Token)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PaypalTransaction PT = new PaypalTransaction();
            try
            {
                var ServiceURL = URL + "/v1/reporting/balances";
                var AuthorizationCode = "Bearer " + Token;
                var client = new RestClient(ServiceURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Authorization", AuthorizationCode);
                IRestResponse response = client.Execute(request);
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(response.Content);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    PT.IsSuccess = true;
                    PT.Result = Temp_dynamic;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {

                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic["error_description"]);
                }
                else
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PT;

        }

        public PaypalTransaction GetBalance(PaypalSettings ObjPaypalSettings)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PaypalTransaction PT = new PaypalTransaction();

            try
            {
                Dictionary<string, string> config = new Dictionary<string, string>();
                config.Add("mode", Environment);
                config.Add("account1.apiUsername", ObjPaypalSettings.APIUserName);
                config.Add("account1.apiPassword", ObjPaypalSettings.APIPassword);
                config.Add("account1.apiSignature", ObjPaypalSettings.APISignature);

                PayPal.PayPalAPIInterfaceService.PayPalAPIInterfaceServiceService s = new PayPal.PayPalAPIInterfaceService.PayPalAPIInterfaceServiceService(config);

                // Get Balance
                GetBalanceRequestType request = new GetBalanceRequestType();
                request.ReturnAllCurrencies = "1";

                GetBalanceReq wrapper = new GetBalanceReq();
                wrapper.GetBalanceRequest = request;
                GetBalanceResponseType getBalanceResponse = s.GetBalance(wrapper);

                if (getBalanceResponse.Errors.Count > 0)
                {
                    PT.IsSuccess = false;
                    PT.ErrorMessage = getBalanceResponse.Errors[0].LongMessage;
                }
                else
                {
                    PT.IsSuccess = true;
                    PT.Result = getBalanceResponse.Balance.value;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PT;

        }

        // Get Recent Payout Transaction
        public PaypalTransaction GetRecentTransaction(string StartDate, string EndDate, string Token)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PaypalTransaction PT = new PaypalTransaction();
            try
            {
                var ServiceURL = URL + "/v1/reporting/transactions?start_date=" + StartDate + "T00:00:00Z&end_date=" + EndDate + "T23:59:59Z&fields=all&transaction_type=T0001";
                var AuthorizationCode = "Bearer " + Token;
                var client = new RestClient(ServiceURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Authorization", AuthorizationCode);
                IRestResponse response = client.Execute(request);
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(response.Content);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    PT.IsSuccess = true;
                    PT.Result = Temp_dynamic;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic["error_description"]);
                }
                else
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PT;

        }

        // Do Payout
        public PaypalTransaction DoPayout(string Token, string ObjPayout)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PaypalTransaction PT = new PaypalTransaction();
            try
            {
                var ServiceURL = URL + "/v1/payments/payouts";
                var AuthorizationCode = "Bearer " + Token;
                var client = new RestClient(ServiceURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Authorization", AuthorizationCode);
                request.AddHeader("Content-Type", "application/json");
                request.AddParameter("application/json", ObjPayout, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(response.Content);
                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    PT.IsSuccess = true;
                    PT.Result = Temp_dynamic;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic["error_description"]);
                }
                else
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PT;

        }

        // Get Payout Transaction by Batch ID
        public PaypalTransaction PayoutTransaction(string BatchID, string Token)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PaypalTransaction PT = new PaypalTransaction();
            try
            {
                var ServiceURL = URL + "/v1/payments/payouts/" + BatchID;
                var AuthorizationCode = "Bearer " + Token;
                var client = new RestClient(ServiceURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Authorization", AuthorizationCode);
                IRestResponse response = client.Execute(request);
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(response.Content);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    PT.IsSuccess = true;
                    PT.Result = Temp_dynamic;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic["error_description"]);
                }
                else
                {
                    PT.IsSuccess = false;
                    PT.Result = response.Content;
                    PT.StatusCode = Convert.ToInt32(response.StatusCode);
                    PT.ErrorMessage = Convert.ToString(Temp_dynamic);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PT;

        }

        private static string Base64Encode(string plainText)
        {

            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

    }

    public class Innospire_Paypal_DB_Service
    {
        /// <summary>
        /// Insert Paypal configurations
        /// Get Paypal Configurations
        /// Get Ispaypal Setup Completed
        /// Asymetric Key Insert or Update
        /// </summary>

        public static DataTable GetPaypalConfiguration(int CustomerID, string Connection)
        {
            DataTable DT = new DataTable();
            Innospire_Paypal_DB_Service.ValidateAssymetricKey(Connection);
            try
            {
                string Query = string.Empty;
                Query += @"SELECT [IdentityID]
                    ,[CustomePaypalSettingsID]
                    ,[CustomerID]
                    , cast(DECRYPTBYASYMKEY(AsymKey_Id('" + AsymetricKeys.AsymetricKey + @"'),[APIClientID],N'" + AsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [APIClientID]
                    ,cast(DECRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + @"'),[APISecretKey], N'" + AsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [APISecretKey]
                    ,cast(DECRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + @"'),[APISignature], N'" + AsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [APISignature]
                    ,cast(DECRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + @"'), [APIUserName], N'" + AsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [APIUserName]
                    ,cast(DECRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + @"'), [APIPassword], N'" + AsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [APIPassword]
                    ,[IsConnected]
                    ,[PayPalSecurityPassword]
                    ,[CreatedBy]
                    ,[CreatedOn]
                    ,[UpdatedBy]
                    ,[UpdatedOn]
                FROM[dbo].[CustomePaypalSettings] where CustomerID = " + CustomerID;
                DT = SqlQueryExecutor.ReadNoParams(Query, Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return DT;
        }

        public static int InsertPaypalConfiguration(int CustomerID, PaypalSettings ObjPaypalSettings, string Connection)
        {
            int PostStatus = 0;
            try
            {
                Innospire_Paypal_DB_Service.ValidateAssymetricKey(Connection);
                string Query = string.Empty;
                Query += @"
                    INSERT INTO [dbo].[CustomePaypalSettings]
                    ([CustomerID]
                    ,[APIClientID]
                    ,[APISecretKey]
                    ,[APISignature]
                    ,[APIUserName]
                    ,[APIPassword]
                    ,[IsConnected]
                    ,[PayPalSecurityPassword]
                    ,[CreatedBy]
                    ,[CreatedOn]
                    )
                    VALUES
                    (
                    " + CustomerID + @",
                    ENCRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + "'),'" + ObjPaypalSettings.APIClientID + @"'),
                     ENCRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + "'),'" + ObjPaypalSettings.APISecretKey + @"'),
                     ENCRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + "'),'" + ObjPaypalSettings.APISignature + @"'),
                     ENCRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + "'),'" + ObjPaypalSettings.APIUserName + @"'),
                    ENCRYPTBYASYMKEY(AsymKey_ID('" + AsymetricKeys.AsymetricKey + "'),'" + ObjPaypalSettings.APIPassword + @"'),
                    " + ObjPaypalSettings.IsConnected + @",
                    '" + ObjPaypalSettings.PayPalSecurityPassword + @"',
                    " + ObjPaypalSettings.CreatedBy + @",
                    GetDate()
                    )
                    ";
                PostStatus = SqlQueryExecutor.Write(Query, Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PostStatus;
        }

        public static bool ValidateAssymetricKey(string Connection)
        {
            bool isvalid = false;
            try
            {
                string Query = string.Empty;
                Query += "Select * from sys.asymmetric_keys where name = '" + AsymetricKeys.AsymetricKey + "'";
                DataTable dt = SqlQueryExecutor.ReadNoParams(Query, Connection);
                if (dt.Rows.Count > 0)
                {
                    isvalid = true;
                }
                else
                {
                    string InsertQuery = string.Empty;
                    InsertQuery += @"CREATE ASYMMETRIC KEY " + AsymetricKeys.AsymetricKey + " WITH ALGORITHM = RSA_2048  ENCRYPTION BY PASSWORD = '" + AsymetricKeys.AsymetricPassword + "';";
                    int Poststatus = SqlQueryExecutor.Write(InsertQuery, Connection);
                    isvalid = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return isvalid;
        }

        public static int DeletePaypalConfiguration(int CustomerID, string Connection)
        {
            int PostStatus = 0;
            try
            {
                string Query = string.Empty;
                Query += "Delete from [dbo].[CustomePaypalSettings] where CustomerID = " + CustomerID;
                PostStatus = SqlQueryExecutor.Write(Query, Connection);
                int postStatus = ApplicationUsers.InsertAuditlog("Deleted", "Deleted PayPal account ", "Payment Setup", Connection);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PostStatus;
        }
    }

    public class PaypalTransaction
    {
        public string Identity { get; set; }
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public int StatusCode { get; set; }

        public Object Result { get; set; }
    }

    public class PaypalSettings
    {
        public int CustomerID { get; set; }
        public string APIClientID { get; set; }
        public string APISecretKey { get; set; }
        public string APISignature { get; set; }
        public string APIUserName { get; set; }
        public string APIPassword { get; set; }
        public int IsConnected { get; set; }
        public string PayPalSecurityPassword { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
