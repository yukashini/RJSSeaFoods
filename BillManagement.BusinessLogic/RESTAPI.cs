using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using System.Net;
using System.IO;
using BillManagement.BussinessObjects;
using System.Configuration;
using Newtonsoft.Json;

namespace BillManagement.BusinessLogic
{
    public class RESTAPI
    {
        public static string Username = ConfigurationManager.AppSettings["API_UserName"];
        public static string Passcode = ConfigurationManager.AppSettings["API_Password"];
        public static string clientid = ConfigurationManager.AppSettings["API_ClientID"];
        public static string LoginURL = ConfigurationManager.AppSettings["API_Token_URL"];
        public static string InvoiceAPI = ConfigurationManager.AppSettings["API_Invoice"];
        public static string AuthorizedToken = string.Empty;

        public static string GetAPIToken()
        {
            string result = string.Empty;
            try
            {
                var client = new RestClient(LoginURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddParameter("client_id", clientid);
                request.AddParameter("username", Username);
                request.AddParameter("password", Passcode);
                request.AddParameter("grant_type", "password");
                IRestResponse response = client.Execute(request);

                string StrAccessToken = response.Content;
                var values = new Dictionary<string, string>();
                string AuthorizedToken = "";
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    values = JsonConvert.DeserializeObject<Dictionary<string, string>>(StrAccessToken);
                    result = GetDictData("access_token", values);
                }
                else
                {
                    result = "";
                }
            }
            catch (Exception ex)
            {
                result = "";
            }


            return result;

        }

        public static string GetDictData(string key, Dictionary<string, string> Dict)
        {
            string result;
            if (Dict.TryGetValue(key, out result))
            {
                return result;
            }
            else
            {
                return "0";
            }
        }

        public static ResponseAPI GetFiles(string Token, byte[] FileByte, string MimeType, ref ResponseAPI ObjAPI )
        {
            try
            {
                var client = new RestClient(InvoiceAPI);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", MimeType);
                request.AddHeader("Authorization", "Bearer " + Token + "");
                request.AddParameter(MimeType, FileByte, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                dynamic values;
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    values = JsonConvert.DeserializeObject<dynamic>(response.Content);
                    if (CheckIsValidJSON(new string[] { "entities", "totals", "gross" }, values))
                    {
                        ObjAPI.TotalAmount = Convert.ToString(values["entities"]["totals"]["gross"]);
                    }

                    if (CheckIsValidJSON(new string[] { "entities", "number"}, values))
                    {
                        ObjAPI.InvoiceNumber = Convert.ToString(values["entities"]["number"]);
                    }

                    if (CheckIsValidJSON(new string[] { "entities", "sender", "companyName" }, values))
                    {
                        ObjAPI.VendorName = Convert.ToString(values["entities"]["sender"]["companyName"]);
                    }
                    if (CheckIsValidJSON(new string[] { "entities", "sender", "address" }, values))
                    {
                        ObjAPI.Address = Convert.ToString(values["entities"]["sender"]["address"]);
                    }

                    if (CheckIsValidJSON(new string[] { "entities", "issuedAt"}, values))
                    {
                        ObjAPI.TransactionDate = Convert.ToString(values["entities"]["issuedAt"]);
                    }
                    ObjAPI.IsTransaction = true;
                }
                else
                {
                    ObjAPI.IsTransaction = false;
                    ObjAPI.Error = response.Content;
                }
            }
            catch(Exception ex)
            {
                ObjAPI.IsTransaction = false;
                ObjAPI.Error = ex.Message;
            }
            return ObjAPI;
        }

        public static bool CheckIsValidJSON(string[] ArrItems, dynamic ObjJSON)
        {
            bool isvalid = true;
            try
            {
                dynamic result = ObjJSON;
                foreach (string str in ArrItems)
                {
                    result = result["" + str + ""];
                }
            }
            catch (Exception ex)
            {
                isvalid = false;
            }

            return isvalid;


        }





    }
}
