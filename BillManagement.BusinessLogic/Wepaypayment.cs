using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;



namespace BillManagement.BusinessLogic
{
   public class Wepaypayment
    {
        

        public async Task<PaymentResponse> CreatePayment(PaymentRequest requestObj, string unique_key,int Invoiceid,string Connection)
        {
            PaymentResponse response = new PaymentResponse();
            try
            {
               
                var app_Id = "432382";
                var app_Token = "stage_MTY5OTBfNWE4NTc4NWQtOGU3Yy00YzVlLTkzZTgtNTE4NTRiZDM2NzA0";
                var api_Version = "3.0";
                //  var json = new JavaScriptSerializer().Serialize(requestObj);

                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(requestObj);
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                using (var httpClient = new HttpClient())
                {
                    using (var request = new HttpRequestMessage(new HttpMethod("POST"), "https://stage-api.wepay.com/payments"))
                    {
                        request.Headers.TryAddWithoutValidation("App-Id", app_Id);
                        request.Headers.TryAddWithoutValidation("App-Token", app_Token);
                        request.Headers.TryAddWithoutValidation("Accept", "application/json");
                        request.Headers.TryAddWithoutValidation("Api-Version", api_Version);
                        request.Headers.TryAddWithoutValidation("Unique-Key", unique_key.ToString());

                        request.Content = new StringContent(jsonString);
                        request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

                        var apiResponse = await httpClient.SendAsync(request).Result.Content.ReadAsStringAsync();

                        response = JsonConvert.DeserializeObject<PaymentResponse>(apiResponse);

                       InvoiceLogic. UpdateInvoiceStatus(Invoiceid, 2, Connection, "Payment Completed");


                    }
                }

            }
            catch (Exception ex)
            {

                //  throw;
            }

            return response;
            
        }

        public async Task<CreatePaymentResponse> CreatePaymentMethod(CreatePaymentMethodRequest requestObj)
        {
            CreatePaymentResponse response = new CreatePaymentResponse();
            try
            {
                var app_Id = "432382";
                var app_Token = "stage_MTY5OTBfNWE4NTc4NWQtOGU3Yy00YzVlLTkzZTgtNTE4NTRiZDM2NzA0";
                var api_Version = "3.0";

                //  var json = new JavaScriptSerializer().Serialize(requestObj);

                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(requestObj);

                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                using (var httpClient = new HttpClient())
                {
                    using (var request = new HttpRequestMessage(new HttpMethod("POST"), "https://stage-api.wepay.com/payment_methods"))
                    {
                        request.Headers.TryAddWithoutValidation("App-Id", app_Id);
                        request.Headers.TryAddWithoutValidation("App-Token", app_Token);
                        request.Headers.TryAddWithoutValidation("Accept", "application/json");
                        request.Headers.TryAddWithoutValidation("Api-Version", api_Version);


                        request.Content = new StringContent(jsonString);
                        //request.Content = new StringContent("{\n  \"type\": \"payment_bank_us\",\n  \"custom_data\": {\n    \"my_key\": \"invoice #54321\"\n  },\n  \"payment_bank_us\": {\n    \"account_holder\": {\n      \"holder_name\": \"Mark Antony\"\n    },\n    \"account_number\": \"00254267\",\n    \"account_type\": \"savings\",\n    \"routing_number\": \"021000021\"\n  }\n}");
                        request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                        var apiResponse = await httpClient.SendAsync(request).Result.Content.ReadAsStringAsync();
                    
                        response = JsonConvert.DeserializeObject<CreatePaymentResponse>(apiResponse);
                    }
                }

            }
            catch (Exception ex)
            {

                //  throw;
            }

            return response;
        }
        public class PaymentRequest
        {
            public string account_id { get; set; }
            public int amount { get; set; }
            public string currency { get; set; }
            public payment_method payment_method { get; set; }
            public PaymentRequest()
            {
                payment_method = new payment_method();
            }
            public int fee_amount { get; set; }
            public string initiated_by { get; set; }
            public string reference_id { get; set; }


        }
        public class payment_method
        {
            public string type { get; set; }
            public string payment_method_id { get; set; }
        }

        public class CreatePaymentMethodRequest
        {
            public string type { get; set; }
            public custom_data custom_data { get; set; }

            public payment_bank_us payment_bank_us { get; set; }

            public CreatePaymentMethodRequest()
            {
                custom_data = new custom_data();
                payment_bank_us = new payment_bank_us();
                custom_data = new custom_data();
            }
        }


        public class custom_data
        {
            public string my_key { get; set; }

        }
        public class payment_bank_us
        {
            public account_holder account_holder { get; set; }
            public string account_number { get; set; }
            public string account_type { get; set; }
            public string routing_number { get; set; }
            public payment_bank_us()
            {
                account_holder = new account_holder();
            }

        }

        public class account_holder
        {
            public string holder_name { get; set; }

        }
        public class PaymentResponse
        {
            // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 

            public string id { get; set; }
            public string resource { get; set; }
            public string path { get; set; }
            public Owner owner { get; set; }
            public int create_time { get; set; }
            public string capture_at { get; set; }
            public int amount { get; set; }
            public int fee_amount { get; set; }
            public bool auto_capture { get; set; }
            public string status { get; set; }
            public string currency { get; set; }
            public ResponsePaymentMethod payment_method { get; set; }
            public string order { get; set; }
            public List<PendingReason> pending_reasons { get; set; }
            public string failure_reason { get; set; }
            public string txnr_app_fee { get; set; }
            public string txnr_merchant { get; set; }
            public int amount_refunded { get; set; }
            public int amount_disputed { get; set; }
            public string initiated_by { get; set; }
            public string reference_id { get; set; }
            public string authorization_code { get; set; }
            public string custom_data { get; set; }
            public string api_version { get; set; }
        }
        public class Owner
        {
            public string id { get; set; }
            public string resource { get; set; }
            public string path { get; set; }
        }

        public class ResponsePaymentMethod
        {
            public string id { get; set; }
            public string resource { get; set; }
            public string path { get; set; }
        }

        public class Detail
        {
            public string detail_code { get; set; }
            public string detail_message { get; set; }
        }

        public class PendingReason
        {
            public string reason_code { get; set; }
            public string reason_message { get; set; }
            public List<Detail> details { get; set; }
        }

        public class Address
        {
            public object line1 { get; set; }
            public object line2 { get; set; }
            public object city { get; set; }
            public object region { get; set; }
            public string postal_code { get; set; }
            public string country { get; set; }
        }

        public class Phone
        {
            public object country_code { get; set; }
            public object phone_number { get; set; }
            public object type { get; set; }
        }

        public class AccountHolder
        {
            public string holder_name { get; set; }
            public object email { get; set; }
            public Address address { get; set; }
            public Phone phone { get; set; }
        }

        public class PaymentBankUs
        {
            public string account_type { get; set; }
            public string last_four { get; set; }
            public AccountHolder account_holder { get; set; }
        }

        public class CustomData
        {
            public string my_key { get; set; }
        }

        public class CreatePaymentResponse
        {
            public string id { get; set; }
            public string resource { get; set; }
            public string path { get; set; }
            public Owner owner { get; set; }
            public int create_time { get; set; }
            public string status { get; set; }
            public string type { get; set; }
            public PaymentBankUs payment_bank_us { get; set; }
            public CustomData custom_data { get; set; }
            public string api_version { get; set; }
        }
    }
}
