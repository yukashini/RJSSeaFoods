using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApp4Dwolla
{
    public static class DwollaLogics
    {
        public static string Connection = Convert.ToString(ConfigurationManager.ConnectionStrings["dbConnection"]);
        public static int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
        public static string AccountID = "";
        //protected void Page_Load(object sender, EventArgs e)
        //{
        //    //getCustomerList();
        //    //createCustomer();
        //    //createFundingSource();
        //    //getAccountdetails();
        //    //  SendFund();
        //    //
        //    //getTransferList();
        //}

        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string getCustomerList()
        {
            string data = string.Empty;
            try
            {
                string token = gettoken();
                var client = new RestClient("https://api-sandbox.dwolla.com/customers");
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Authorization", "Bearer " + token);
                //request.AddHeader("Cookie", "__cf_bm=7b321054e0688fe71ce6eaf311819f6bb801b51e-1621855548-1800-AWj1VtqfmZku+a4MVADNkzMrRtNxQFd+aT3d29FHvarxYBZJLVc2Rugc6PUQ/H018h81oX73RdPr9gQvdx7N5T4=");
                IRestResponse response = client.Execute(request);
                Console.WriteLine(response.Content);
                cdRoot objCust = JsonConvert.DeserializeObject<cdRoot>(response.Content);
                data = JsonConvert.SerializeObject(objCust);

            }
            catch (Exception ex)
            {

            }
            return data;

        }

        public static string gettoken() 
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            //string key = "LfPN6iJaDJhlDHmvOClIOUKvRJsBRG6CXZ8eHDdKpH4Bs1XD72";
            //string secret = "IgZWcitf0IrAytST3kuQpqzkfyNqI6SNgEY84pCxs8jjwwsQf6";
            DataTable Dt = Innospire_Dwolla_DB_Services.GetDwollaConfiguration(clientID, Connection);
            string key = Convert.ToString(Dt.Rows[0]["DwollaKey"]);
            string secret = Convert.ToString(Dt.Rows[0]["SecretKey"]);
            AccountID= Convert.ToString(Dt.Rows[0]["AccountID"]);
            var authstring = BuildBasicAuthenticationString(key, secret);
            var client = new RestClient("https://api-sandbox.dwolla.com/token");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", "Basic " + authstring);
            //request.AddHeader("Cookie", "__cf_bm=ac407476f7e6c49321338a857ac8e657cc407407-1621852403-1800-ASj7N0lettj+QyiTjgz7PSc5sHdcTV5a1J4j89kKomX9RLZOQCmhXBfv1/8NJSP67AsWzKCQMtakaYNA0Cb26BM=");
            request.AddParameter("grant_type", "client_credentials");
            IRestResponse response = client.Execute(request);
            dynamic dresp = JObject.Parse(response.Content);
            return dresp.access_token;
        }

        public static string gettoken(string key, string secret)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            //string key = "LfPN6iJaDJhlDHmvOClIOUKvRJsBRG6CXZ8eHDdKpH4Bs1XD72";
            //string secret = "IgZWcitf0IrAytST3kuQpqzkfyNqI6SNgEY84pCxs8jjwwsQf6";
            string token = "";
            try
            {
                var authstring = BuildBasicAuthenticationString(key, secret);
                var client = new RestClient("https://api-sandbox.dwolla.com/token");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Authorization", "Basic " + authstring);
                //request.AddHeader("Cookie", "__cf_bm=ac407476f7e6c49321338a857ac8e657cc407407-1621852403-1800-ASj7N0lettj+QyiTjgz7PSc5sHdcTV5a1J4j89kKomX9RLZOQCmhXBfv1/8NJSP67AsWzKCQMtakaYNA0Cb26BM=");
                request.AddParameter("grant_type", "client_credentials");
                IRestResponse response = client.Execute(request);
                dynamic dresp = JObject.Parse(response.Content);
                token= dresp.access_token;
            }
            catch (Exception ex)
            {
                token = "";

            }
            return token;
        }

        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string createCustomer(cdCustomer customerObj)
        {
            string custID = "";
            try
            {
                string token = gettoken();
                string url = "https://api-sandbox.dwolla.com/customers";
                var client = new RestClient(url);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "Bearer " + token);

                var body = @"{" + "\n" +
                @"  ""firstName"": " + "\"" + customerObj.firstName + "\"" + "," + "\n" +
                @"  ""lastName"":" + "\"" + customerObj.firstName + "\"" + "," + "\n" +
                @"  ""email"": " + "\"" + customerObj.email + "\"" + "," + "\n" +
                @"  ""type"": ""receive-only""," + "\n" +
                @"  ""businessName"": " + "\"" + customerObj.businessName + "\"" + "," + "\n" +
                @"  ""ipAddress"": ""99.99.99.99""" + "\n" +
                @"}";


                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                var headers = response.Headers;
                var respID = response.Headers
                .Where(x => x.Name == "Location")
                .Select(x => x.Value)
                .FirstOrDefault().ToString().Replace("Location=" + url + "/", "");
                int splitindex = respID.LastIndexOf('/');
                int respLen = respID.Length;
                string custid = respID.Substring(splitindex + 1, respLen - splitindex - 1);
                if (response.IsSuccessful)
                {
                    custID = custid;
                }
                else
                {
                    custID = "";
                }
            }
            catch (Exception ex)
            {
                throw;
            }


            return custID;

        }

        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string createFundingSource(FundSource FundSourceObj, string Custid)
        {
             string fundToken= "";
            try
            {
                string token = gettoken();
                
                //string Custid = "ac8ec164-6023-4dae-837c-33ccf1104c75";
                string url = "https://api-sandbox.dwolla.com/customers/" + Custid + "/funding-sources";
                var client = new RestClient(url);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Authorization", "Bearer " + token);
                // request.AddHeader("Cookie", "__cf_bm=bbbd6185289dae97e75b0644e8f5b3f346130547-1621915492-1800-AeDB+z+Bt4Rr4lXYFLHDDho7IVP23i7BsP/RMK1VejUAeL2t8cYsJODU2NEUJTtcF5HZS85wSSCsY3UDniRkdsY=");
                var body = @"{" + "\n" +
                @"  ""routingNumber"":" + "\"" + FundSourceObj.routingNumber + "\"" + " ," + "\n" +
                @"  ""accountNumber"":" + "\"" + FundSourceObj.accountNumber + "\"" + "," + "\n" +
                @"  ""type"": ""checking""," + "\n" +
                @"  ""name"": " + "\"" + FundSourceObj.name + "\"" + "\n" +
                @"}";


                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                var respid = response.Headers[9].Value.ToString();
                var respID = response.Headers
              .Where(x => x.Name == "Location")
              .Select(x => x.Value)
              .FirstOrDefault().ToString().Replace("Location=" + url + "/", "");
                int splitindex = respID.LastIndexOf('/');
                int respLen = respID.Length;             
                var fundid = respID.Substring(splitindex + 1, respLen - splitindex - 1);
                if (response.IsSuccessful)
                {
                    fundToken = fundid;
                }
                else
                {
                    fundToken = "";
                }
               // Console.WriteLine(response.Content);
             

            }
            catch (Exception ex)
            {

            }
            return fundToken;
       }

        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string getAccountdetails()
        {
            string data = string.Empty;
            string token = gettoken();
            string AccID = "70740eb1-979e-4495-9853-c6161f8edf79";

            var client = new RestClient("https://api-sandbox.dwolla.com/funding-sources/" + AccID + "/balance");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
            request.AddHeader("Authorization", "Bearer " + token);
            IRestResponse response = client.Execute(request);

            fsRoot objsroot = JsonConvert.DeserializeObject<fsRoot>(response.Content);
            data = JsonConvert.SerializeObject(objsroot);
            return data;
        }

        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string SendFund(SendFund FundObj,string connection)
        {
            var fundid = "";
            try
            {
                string custid = getFundSource(FundObj.custid);
                string token = gettoken();
                //DataTable Dt = Innospire_Dwolla_DB_Services.GetDwollaConfiguration(clientID, Connection);
                //string AccountID = Convert.ToString(Dt.Rows[0]["AccountID"]);
                var client = new RestClient("https://api-sandbox.dwolla.com/transfers");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Authorization", "Bearer " + token);
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Idempotency-Key", AccountID);
                var body = @"{" + "\n" +
                @"   ""_links"": {" + "\n" +
                @"       ""source"": {" + "\n" +
                @"           ""href"": ""https://api-sandbox.dwolla.com/funding-sources/" + FundObj.fundingSource + "\"" + "\n" +
                @"       }," + "\n" +
                @"       ""destination"": {" + "\n" +
                @"           ""href"": ""https://api-sandbox.dwolla.com/funding-sources/" + custid + "\"" + "\n" +
                @"       }" + "\n" +
                @"   }," + "\n" +
                @"   ""amount"": {" + "\n" +
                @"       ""currency"": ""USD""," + "\n" +
                @"       ""value"": """ + FundObj.value + "\"" + "\n" +

                @"   }" + "\n" +
                @"}";

                //   @"           ""href"": ""https://api-sandbox.dwolla.com/funding-sources/70740eb1-979e-4495-9853-c6161f8edf79""" + "\n" +
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                var respid = response.Headers[9].Value.ToString();
                  var respID = response.Headers
              .Where(x => x.Name == "Location")
              .Select(x => x.Value)
              .FirstOrDefault().ToString();
                int splitindex = respID.LastIndexOf('/');
                int respLen = respID.Length;
                fundid = respID.Substring(splitindex + 1, respLen - splitindex - 1);
                if (response.StatusDescription == "Created" && fundid != "")
                {
                    //Update transaction in Bill Details
                    FundObj.BankTransferID = getTransDet(fundid);
                    FundObj.FundId = fundid;

                    int updatedStatus = PaymentMethodLogics.UpdatedwollaTransactions(FundObj, connection);
                }
                else
                {
                    FundObj.BankTransferID = "";
                    FundObj.FundId = "";
                    fundid = "";
                }

                //Insert Dwolla Transactions
                FundObj.custid = custid;
                FundObj.Remarks = response.StatusDescription;
                FundObj.SortID = "432109";
                int trasactionInsertStatus = PaymentMethodLogics.InsertDwollaTransactionHistory(FundObj, connection);
            }
            catch (Exception ex)
            {
                fundid = "";
            }
           
            return fundid;
        }

        public static string getFundSource(string ClientID)
        {
            string token = gettoken();

            var client = new RestClient("https://api-sandbox.dwolla.com/customers/" + ClientID + "/funding-sources?removed=false");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
            request.AddHeader("Authorization", "Bearer " + token);

            IRestResponse response = client.Execute(request);

            // Console.WriteLine(response.Content);
            cfsRoot objsroot = JsonConvert.DeserializeObject<cfsRoot>(response.Content);
            string retval = "";

            foreach (cfsFundingSource cfsobj in objsroot._embedded.FundingSources)
                retval = cfsobj.id;


            return retval;
        }
        
        public static void getTransferList()
        {
            string token = gettoken();
            string Custid = "ac8ec164-6023-4dae-837c-33ccf1104c75";

            var client = new RestClient("https://api-sandbox.dwolla.com/customers/" + Custid + "/transfers");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
            request.AddHeader("Authorization", "Bearer  " + token);

            IRestResponse response = client.Execute(request);
            TlRoot myDeserializedClass = JsonConvert.DeserializeObject<TlRoot>(response.Content);
            Console.WriteLine(response.Content);
        }

        private static string BuildBasicAuthenticationString(string username, string password)
        {
            var byteArray = Encoding.ASCII.GetBytes(string.Format("{0}:{1}", username, password));
            return Convert.ToBase64String(byteArray);
        }

        public static string getrootval(string key,string secrectKey)
        {
            string accessToken = "";
            try
            {
                string token = gettoken(key,secrectKey);
                string url = "https://api-sandbox.dwolla.com/";

                var client = new RestClient(url);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Authorization", "Bearer " + token);
                IRestResponse response = client.Execute(request);
                dynamic dresp = JObject.Parse(response.Content);
                AccountDRoot root = JsonConvert.DeserializeObject<AccountDRoot>(response.Content);
                string respUrl =root._links.account.href;
                int splitindex = respUrl.LastIndexOf('/');
                int respLen = respUrl.Length;
                accessToken = respUrl.Substring(splitindex + 1, respLen - splitindex - 1);
                //string data = JsonConvert.SerializeObject(root);
                //accessToken = dresp.access_token;
            }
            catch (Exception ex)
            {

            }
            return accessToken;
        }

        public static string getSourceAccountdetails()
        {
            string data = string.Empty;
            string token = gettoken();
            //dynamic AccId should come here
            //DataTable Dt = Innospire_Dwolla_DB_Services.GetDwollaConfiguration(clientID, Connection);
            //string AccountID = Convert.ToString(Dt.Rows[0]["AccountID"]);
           // string AccID = "ca14f310-68db-4337-8e75-7b94be8b70a6";
            var client = new RestClient("https://api-sandbox.dwolla.com/accounts/" + AccountID + "/funding-sources?removed=false");
          //  var client = new RestClient("https://api-sandbox.dwolla.com/accounts/" + AccID + "/funding-sources?removed=false");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
            request.AddHeader("Authorization", "Bearer " + token);
            IRestResponse response = client.Execute(request);
            AFSRoot objsroot = JsonConvert.DeserializeObject<AFSRoot>(response.Content);
            data = JsonConvert.SerializeObject(objsroot);
            return data;
        }

        public static string upateCustomer(cdCustomer customerObj)
        {
            string custID = "";
            try
            {
                string token = gettoken();
                string url = "https://api-sandbox.dwolla.com/customers";
                // new RestClient("https://api-sandbox.dwolla.com/accounts/" + AccountID + "/funding-sources?removed=false");
                var client= new RestClient("https://api-sandbox.dwolla.com/customers/"+ customerObj .custId+ "");
                //var client = new RestClient("https://api-sandbox.dwolla.com/customers/{{customerId}}");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "Bearer " + token);
                //request.AddHeader("Authorization", "Bearer {{appToken}}");
                var body = @"{" + "\n" +
                @"  ""firstName"":  " + "\"" + customerObj.firstName + "\"" + "," + "\n" +
                @"  ""lastName"":  " + "\"" + customerObj.firstName + "\"" + "," + "\n" +
                @"  ""email"": " + "\"" + customerObj.email + "\"" + "," + "\n" +
                @"  ""ipAddress"": ""99.99.99.99""," + "\n" +
                @"  ""type"": ""receive-only""," + "\n" +
                //@"  ""address1"": ""99-99 Correction St""," + "\n" +
                //@"  ""city"": ""Some City""," + "\n" +
                //@"  ""state"": ""NY""," + "\n" +
                //@"  ""postalCode"": ""11101""," + "\n" +
                //@"  ""dateOfBirth"": ""1970-01-01""," + "\n" +
                //@"  ""ssn"": ""123456789""" + "\n" +
                @"}";
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
               if (response.IsSuccessful)
                {
                    custID = customerObj.custId;
                }
                else
                {
                    custID = "";
                }

            }
            catch(Exception ex)
            {
                custID = "";
            }
            return custID;
        }

        public static string updateFundingSource(FundSource objFundSurce)
        {
            string fundID = "";
            try
            {
                string token = gettoken();
                var client = new RestClient("https://api-sandbox.dwolla.com/funding-sources/" + objFundSurce.fundId + "");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "Bearer " + token);
                var body = @"{" + "\n" +
                @"  ""name"":  " + "\"" + objFundSurce.name + "\"" +
                @"}";
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.IsSuccessful)
                {
                    fundID = objFundSurce.fundId;
                }
                else
                {
                    fundID = "";
                }
            }
            catch(Exception ex)
            {
                fundID = "";
            }
            return fundID;
        }

        public static string getTransDet(string transid)
        {
           // var transid = "c58bc3f7-d0d8-eb11-8134-d050ab358a03";
            var client = new RestClient("https://api-sandbox.dwolla.com/transfers/" + transid);
            string token = gettoken();
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/vnd.dwolla.v1.hal+json");
            request.AddHeader("Authorization", "Bearer " + token);
            IRestResponse response = client.Execute(request);
            tdRoot objCust = JsonConvert.DeserializeObject<tdRoot>(response.Content);
            var fundid = "";
          if (objCust.Links.FundingTransfer != null)
            {
                var respid = objCust.Links.FundingTransfer.Href;
                int splitindex = respid.LastIndexOf('/');
                int respLen = respid.Length;
                fundid = respid.Substring(splitindex + 1, respLen - splitindex - 1);

            }
            return fundid;

        }
    }

    public class DwollaAsymetricKeys
    {
        public const string AsymetricKey = "Bill_DwollaAssymetricKey";
        public const string AsymetricPassword = "Dwolla_billManagement_Pass";
    }

    public class Innospire_Dwolla_DB_Services
    {
       
        public static DataTable GetDwollaConfiguration(int CustomerID, string Connection)
        {
            DataTable DT = new DataTable();
            Innospire_Dwolla_DB_Services.ValidateAssymetricKey(Connection);
            try
            {
                string Query = string.Empty;
                Query += @"SELECT [IdentityID]
                    ,[CustomerID]
                    , cast(DECRYPTBYASYMKEY(AsymKey_Id('" + DwollaAsymetricKeys.AsymetricKey + @"'),[DwollaKey],N'" + DwollaAsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [DwollaKey]
                    ,cast(DECRYPTBYASYMKEY(AsymKey_ID('" + DwollaAsymetricKeys.AsymetricKey + @"'),[SecretKey], N'" + DwollaAsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [SecretKey]
                    ,cast(DECRYPTBYASYMKEY(AsymKey_ID('" + DwollaAsymetricKeys.AsymetricKey + @"'),[AccountID], N'" + DwollaAsymetricKeys.AsymetricPassword + @"') as varchar(max)) as [AccountID]
                   ,[IsConnected]
                    ,[CreatedBy]
                    ,[CreatedOn]
                    ,[UpdatedBy]
                    ,[UpdatedOn]
                FROM[dbo].[CustomeDwollaSettings] where CustomerID = " + CustomerID;
                DT = SqlQueryExecutor.ReadNoParams(Query, Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return DT;
        }

        public static int InsertDwollaConfiguration(int CustomerID, DwollaSettings ObjDwollaSettings, string Connection)
        {
            int PostStatus = 0;
            try
            {
                Innospire_Dwolla_DB_Services.ValidateAssymetricKey(Connection);
                string Query = string.Empty;
                Query += @"
                    INSERT INTO [dbo].[CustomeDwollaSettings]
                    ([CustomerID]
                    ,[DwollaKey]
                    ,[SecretKey]
                    ,[AccountID]
                    ,[CreatedBy]
                    ,[IsConnected]
                    ,[CreatedOn]
                    )
                    VALUES
                    (
                    " + CustomerID + @",
                     ENCRYPTBYASYMKEY(AsymKey_ID('" + DwollaAsymetricKeys.AsymetricKey + "'),'" + ObjDwollaSettings.DwollaKey + @"'),
                     ENCRYPTBYASYMKEY(AsymKey_ID('" + DwollaAsymetricKeys.AsymetricKey + "'),'" + ObjDwollaSettings.SecretKey + @"'),
                     ENCRYPTBYASYMKEY(AsymKey_ID('" + DwollaAsymetricKeys.AsymetricKey + "'),'" + ObjDwollaSettings.AccountId + @"'), 
                    " + ObjDwollaSettings.CreatedBy + @",
                    " + ObjDwollaSettings.IsConnected + @",
                    GetUtcDate()
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

        public class BasClass
        {
            public Embedded _embedded { get; set; }
        }
        public class Embedded
        {
            [JsonProperty("funding-sources")]
            public List<Fundingsources> fundingsources { get; set; }

        }

        public class Fundingsources
        {
            public string id { get; set; }
            public string name { get; set; }
            public string bankName { get; set; }
        }
        
        
        public static int InsertDwollaConnectedDetails(string FundID, string Connection)
        {
            int PostStatus = 0;
            try
            {
               
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                string SourceName = DwollaLogics.getSourceAccountdetails();
                DataTable dt = new DataTable();
                dt.Columns.Add("FundID", typeof(string));
                dt.Columns.Add("SourceName", typeof(string));
                dt.Columns.Add("BankName", typeof(string));
                dt.Columns.Add("ClientID", typeof(Int32));
                dt.Columns.Add("CreatedBy", typeof(Int32));
                dt.Columns.Add("UpdatedBy", typeof(Int32));


                BasClass response = JsonConvert.DeserializeObject<BasClass>(SourceName);
                foreach (var Jdata in response._embedded.fundingsources)
                {
                    dt.Rows.Add(Jdata.id, Jdata.name, Jdata.bankName, clientID,AccountID,AccountID);
                }


                if (dt.Rows.Count > 0)
                {
                    DataView dataView = dt.DefaultView;
                    dt = dataView.ToTable(true, "FundID", "SourceName", "ClientID", "CreatedBy", "UpdatedBy", "BankName");
                    MergeDwollaConnected(dt, Connection);
                }
            }
            catch (Exception ex)
            {
              

            }
            return PostStatus;
        }
        public static int MergeDwollaConnected(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertDwollaConnectedDetails", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@Tbl_DwollaConnectedDetails", data);
                sqlParam.SqlDbType = SqlDbType.Structured;
                cmd.ExecuteNonQuery();
                dbConnection.Close();

            }
            catch (Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }
        public static bool ValidateAssymetricKey(string Connection)
        {
            bool isvalid = false;
            try
            {
                string Query = string.Empty;
                Query += "Select * from sys.asymmetric_keys where name = '" + DwollaAsymetricKeys.AsymetricKey + "'";
                DataTable dt = SqlQueryExecutor.ReadNoParams(Query, Connection);
                if (dt.Rows.Count > 0)
                {
                    isvalid = true;
                }
                else
                {
                    string InsertQuery = string.Empty;
                    InsertQuery += @"CREATE ASYMMETRIC KEY " + DwollaAsymetricKeys.AsymetricKey + " WITH ALGORITHM = RSA_2048  ENCRYPTION BY PASSWORD = '" + DwollaAsymetricKeys.AsymetricPassword + "';";
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

        public static int DeleteDwollaConfiguration(int CustomerID, string Connection)
        {
            int PostStatus = 0;
            try
            {
                string Query = string.Empty;
                Query += "Delete from [dbo].[CustomeDwollaSettings] where CustomerID = " + CustomerID;
                PostStatus = SqlQueryExecutor.Write(Query, Connection);
                int postStatus = ApplicationUsers.InsertAuditlog("Deleted", "Deleted Dwolla account ", "Payment Setup", Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PostStatus;
        }

        public static string FetchDwollaTransactions(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetDwollaTransactions", sqlParam, connection);
                foreach (DataTable table in ds.Tables)
                {
                    if (table.Rows.Count > 0)
                    {
                        table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                    }
                }
                Strresult = _objCommon.DataSetToStringWithTableName(ds);

            }
            catch (Exception ex)
            {

            }
            return Strresult;
        }
    }

}