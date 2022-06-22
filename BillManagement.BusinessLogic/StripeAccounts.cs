using BillManagement.BussinessObjects;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BusinessLogic
{
    public class StripeAccounts
    {
        //public static string SecretKey = @"sk_test_51HpYRiJF6lJpcd14P9hHwDeWUEoO2Mczr7u3BzwtgW8FUxhtW5wvEW8MXk2QRiS0Q7kNuv2v3L6LI0wFfF5EXqGz00aBvoyTBC";
        public static string SecretKey = @"sk_test_51HpYRiJF6lJpcd14P9hHwDeWUEoO2Mczr7u3BzwtgW8FUxhtW5wvEW8MXk2QRiS0Q7kNuv2v3L6LI0wFfF5EXqGz00aBvoyTBC";

        #region Connected Accounts

        public static StripeErrorHandling CreateConnectedAccounts(StripeConnectedAccounts ObjstripeConnectedAccounts, UsersBankAccount ObjUsersBankAccount)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/accounts");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("type", "custom");
                request.AddParameter("country", "US");
                request.AddParameter("requested_capabilities[0]", "transfers");
                request.AddParameter("requested_capabilities[1]", "card_payments");
                request.AddParameter("business_type", "individual");
                request.AddParameter("business_profile[mcc]", "5734");


                request.AddParameter("individual[first_name]", ObjstripeConnectedAccounts.FirstName);
                request.AddParameter("individual[last_name]", ObjstripeConnectedAccounts.last_name);
                request.AddParameter("email", ObjstripeConnectedAccounts.email);
                request.AddParameter("individual[address][city]", ObjstripeConnectedAccounts.city);
                request.AddParameter("individual[address][country]", ObjstripeConnectedAccounts.country);
                request.AddParameter("individual[address][line1]", ObjstripeConnectedAccounts.line1);
                request.AddParameter("individual[address][line2]", ObjstripeConnectedAccounts.line2);
                request.AddParameter("individual[address][postal_code]", ObjstripeConnectedAccounts.postal_code);
                request.AddParameter("individual[address][state]", ObjstripeConnectedAccounts.state);
                request.AddParameter("individual[dob][day]", ObjstripeConnectedAccounts.day);
                request.AddParameter("individual[dob][month]", ObjstripeConnectedAccounts.month);
                request.AddParameter("individual[dob][year]", ObjstripeConnectedAccounts.year);
                request.AddParameter("individual[email]", ObjstripeConnectedAccounts.email);
                request.AddParameter("individual[id_number]", ObjstripeConnectedAccounts.id_number);
                request.AddParameter("individual[phone]", ObjstripeConnectedAccounts.phone);
                request.AddParameter("individual[ssn_last_4]", ObjstripeConnectedAccounts.id_number.Substring(ObjstripeConnectedAccounts.id_number.Length - 4, 4));
                request.AddParameter("business_profile[url]", ObjstripeConnectedAccounts.url);
                request.AddParameter("tos_acceptance[date]", ObjstripeConnectedAccounts.date);
                request.AddParameter("tos_acceptance[ip]", ObjstripeConnectedAccounts.ip);

                if (ObjstripeConnectedAccounts.IsBankAccountAttached == true)
                {
                    // Bank Account Details
                    request.AddParameter("external_account[country]", ObjUsersBankAccount.Country);
                    request.AddParameter("external_account[currency]", ObjUsersBankAccount.Currency);
                    request.AddParameter("external_account[object]", ObjUsersBankAccount.Object);
                    request.AddParameter("external_account[account_holder_name]", ObjUsersBankAccount.AccountHolderName);
                    request.AddParameter("external_account[account_holder_type]", ObjUsersBankAccount.AccountType);
                    request.AddParameter("external_account[routing_number]", ObjUsersBankAccount.RoutingNumber);
                    request.AddParameter("external_account[account_number]", ObjUsersBankAccount.AccountNumber);
                }

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Vendor Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        public static StripeErrorHandling CreateConnectedAccounts_BankAccounts(string AccountID, string Token)
        {

            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/accounts/" + AccountID);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("external_account", Token);

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Vendor Bank Account Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;

        }

        public static StripeErrorHandling RetrieveConnectedAccounts(string AccountID)
        {

            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/accounts/" + AccountID);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Vendor Bank Account Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;

        }

        public static StripeErrorHandling UpdateConnectedAccounts(StripeConnectedAccounts ObjstripeConnectedAccounts, UsersBankAccount ObjUsersBankAccount)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/accounts/"+ ObjstripeConnectedAccounts .accountRefID+ "");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("type", "custom");
                request.AddParameter("country", "US");
                request.AddParameter("requested_capabilities[0]", "transfers");
                request.AddParameter("requested_capabilities[1]", "card_payments");
                request.AddParameter("business_type", "individual");
                request.AddParameter("business_profile[mcc]", "5734");


                request.AddParameter("individual[first_name]", ObjstripeConnectedAccounts.FirstName);
                request.AddParameter("individual[last_name]", ObjstripeConnectedAccounts.last_name);
                request.AddParameter("email", ObjstripeConnectedAccounts.email);
                request.AddParameter("individual[address][city]", ObjstripeConnectedAccounts.city);
                request.AddParameter("individual[address][country]", ObjstripeConnectedAccounts.country);
                request.AddParameter("individual[address][line1]", ObjstripeConnectedAccounts.line1);
                request.AddParameter("individual[address][line2]", ObjstripeConnectedAccounts.line2);
                request.AddParameter("individual[address][postal_code]", ObjstripeConnectedAccounts.postal_code);
                request.AddParameter("individual[address][state]", ObjstripeConnectedAccounts.state);
                request.AddParameter("individual[dob][day]", ObjstripeConnectedAccounts.day);
                request.AddParameter("individual[dob][month]", ObjstripeConnectedAccounts.month);
                request.AddParameter("individual[dob][year]", ObjstripeConnectedAccounts.year);
                request.AddParameter("individual[email]", ObjstripeConnectedAccounts.email);
                request.AddParameter("individual[id_number]", ObjstripeConnectedAccounts.id_number);
                request.AddParameter("individual[phone]", ObjstripeConnectedAccounts.phone);
                request.AddParameter("individual[ssn_last_4]", ObjstripeConnectedAccounts.id_number.Substring(ObjstripeConnectedAccounts.id_number.Length - 4, 4));
                request.AddParameter("business_profile[url]", ObjstripeConnectedAccounts.url);
                request.AddParameter("tos_acceptance[date]", ObjstripeConnectedAccounts.date);
                request.AddParameter("tos_acceptance[ip]", ObjstripeConnectedAccounts.ip);

                if (ObjstripeConnectedAccounts.IsBankAccountAttached == true)
                {
                    // Bank Account Details
                    request.AddParameter("external_account[country]", ObjUsersBankAccount.Country);
                    request.AddParameter("external_account[currency]", ObjUsersBankAccount.Currency);
                    request.AddParameter("external_account[object]", ObjUsersBankAccount.Object);
                    request.AddParameter("external_account[account_holder_name]", ObjUsersBankAccount.AccountHolderName);
                    request.AddParameter("external_account[account_holder_type]", ObjUsersBankAccount.AccountType);
                    request.AddParameter("external_account[routing_number]", ObjUsersBankAccount.RoutingNumber);
                    request.AddParameter("external_account[account_number]", ObjUsersBankAccount.AccountNumber);
                }

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Vendor Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        #endregion

        #region Customer Pay By Card
        public static StripeErrorHandling CreatePaymentMethod(Card ObjCard)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/payment_methods");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("type", "card");
                request.AddParameter("card[number]", ObjCard.CardNumber);
                request.AddParameter("card[exp_month]", ObjCard.ExpiryMonth);
                request.AddParameter("card[exp_year]", ObjCard.ExpiryYear);
                request.AddParameter("card[cvc]", ObjCard.CVV);

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Payment Method Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        public static StripeErrorHandling PayByCard(PaymentTransaction ObjPaymentTransaction)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                var client = new RestClient("https://api.stripe.com/v1/payment_intents");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                request.AddParameter("capture_method", "automatic");
                request.AddParameter("confirm", "true");

                request.AddParameter("amount", ObjPaymentTransaction.Amount);
                request.AddParameter("transfer_data[destination]", ObjPaymentTransaction.AccountID);
                request.AddParameter("payment_method", ObjPaymentTransaction.PaymentToken);
                request.AddParameter("transfer_data[amount]", ObjPaymentTransaction.TransferAmount);
                request.AddParameter("currency", ObjPaymentTransaction.Currency);

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Payment Method Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }


            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        #endregion

        #region Customer Pay by ACH

        // Create Customer
        public static StripeErrorHandling CreateCustomer(Customer ObjCustomer)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/customers");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("name", ObjCustomer.CustomerName);
                request.AddParameter("email", ObjCustomer.Email);
                request.AddParameter("description", ObjCustomer.Description);

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Customer Created Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        // Create Bank Account
        public static StripeErrorHandling CreateCustomerBankAccount(Customer ObjCustomer)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/customers/" + ObjCustomer.CustomerID + "/sources");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("source[object]", "bank_account");
                request.AddParameter("source[country]", ObjCustomer.country);
                request.AddParameter("source[currency]", ObjCustomer.currency);
                request.AddParameter("source[account_holder_name]", ObjCustomer.CustomerName);
                request.AddParameter("source[account_holder_type]", "individual");
                request.AddParameter("source[routing_number]", ObjCustomer.routing_number);
                request.AddParameter("source[account_number]", ObjCustomer.account_number);

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Customer Bank Account Added Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        // Verify Bank Account
        public static StripeErrorHandling VerifyCustomerBankAccount(string CustomerID, string SourceID, string DepositA, string DepositB)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/customers/" + CustomerID + "/sources/" + SourceID + "/verify");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("amounts[0]", DepositA);
                request.AddParameter("amounts[1]", DepositB);

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Customer Bank Account verified Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

        // Pay by ACH
        public static StripeErrorHandling PayByACH(ACHPaymentTransaction ObjACHPaymentTransaction)
        {
            StripeErrorHandling Stripe_Err = new StripeErrorHandling();
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                var client = new RestClient("https://api.stripe.com/v1/payment_intents");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                // Header
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("Authorization", "Bearer " + SecretKey);

                // Body
                request.AddParameter("amount", ObjACHPaymentTransaction.Amount);
                request.AddParameter("capture_method", "automatic");
                request.AddParameter("confirm", "true");
                request.AddParameter("transfer_data[destination]", ObjACHPaymentTransaction.AccountID);
                request.AddParameter("transfer_data[amount]", ObjACHPaymentTransaction.TransferAmount);
                request.AddParameter("currency", ObjACHPaymentTransaction.Currency);
                request.AddParameter("customer", ObjACHPaymentTransaction.Customer);
                request.AddParameter("payment_method_types[0]", "ach_debit");

                IRestResponse response = client.Execute(request);
                var temp = response.Content;
                dynamic Temp_dynamic = JsonConvert.DeserializeObject<dynamic>(temp);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    // Account created successfully
                    Stripe_Err.IsSuccess = true;
                    Stripe_Err.message = "Payment Sent Successfully";
                    Stripe_Err.param = "";
                    Stripe_Err.type = "";
                    Stripe_Err.code = "";
                    Stripe_Err.doc_url = "";
                    Stripe_Err.Description = temp;
                    Stripe_Err.Identity = Temp_dynamic["id"];
                    Stripe_Err.StatusCode = (Int32)response.StatusCode;
                }
                else
                {
                    // Error thrown
                    if (Convert.ToString(Temp_dynamic["error"]) != null)
                    {
                        Stripe_Err.message = Temp_dynamic["error"]["message"];
                        Stripe_Err.param = Temp_dynamic["error"]["param"];
                        Stripe_Err.type = Temp_dynamic["error"]["type"];
                        Stripe_Err.code = (Temp_dynamic["error"]["code"] != null ? Temp_dynamic["error"]["code"] : "");
                        Stripe_Err.doc_url = Temp_dynamic["error"]["doc_url"];
                        Stripe_Err.StatusCode = (Int32)response.StatusCode;
                        Stripe_Err.IsSuccess = false;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Stripe_Err;
        }

    

        #endregion
    }
}
