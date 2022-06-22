using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApp4Dwolla;
using static BillManagement.BusinessLogic.Wepaypayment;

namespace BillManagement
{
    public partial class PayNow : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string ProcessPayments()
        {
            Wepaypayment wepaypayment = new Wepaypayment();
            CreatePaymentMethodRequest objrequest = new CreatePaymentMethodRequest();
            objrequest.type = "payment_bank_us";
            objrequest.payment_bank_us.account_holder.holder_name = "Benedict";
            objrequest.payment_bank_us.account_number = "00464232";
            objrequest.payment_bank_us.account_type = "checking";
            objrequest.payment_bank_us.routing_number = "021000021";

           // await wepaypayment.CreatePaymentMethod(objrequest);
            return "";

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string ProcessPayment(int Amount)
        {
            string data = string.Empty;
           
            Wepaypayment wepaypayment = new Wepaypayment();
            // CreatePaymentMethodRequest objrequest = new CreatePaymentMethodRequest();
            //objrequest.type = "payment_bank_us";
            //objrequest.custom_data.my_key = "hjfsdjhfdsf";
            //objrequest.payment_bank_us.account_holder.holder_name = "Benedict";
            //objrequest.payment_bank_us.account_number = "00464232";
            //objrequest.payment_bank_us.account_type = "checking";
            //objrequest.payment_bank_us.routing_number = "021000021";

            //var task = wepaypayment.CreatePaymentMethod(objrequest);
            //var result = task.Result;
            //var accid= result.id;
            PaymentRequest objpament = new PaymentRequest();
            //string Uniqkey = "KU5400987";

            //objpament.account_id = "4dfac073-49b5-44c2-9ee4-d5f58db55f72";
            //objpament.amount = Amount;
            //objpament.currency = "USD";
            //objpament.payment_method.type = "payment_method_id";
            //objpament.payment_method.payment_method_id = "00000000-6261-5553-0000-0000000706fd";
            //objpament.fee_amount = 0;
            //objpament.initiated_by = "customer";
            //objpament.reference_id = "dfeb052b-ae8c-4a69-b909-8d9ecdd7c742";
            //var Payment = wepaypayment.CreatePayment(objpament, Uniqkey);

            return "";
           
        }
    }
}