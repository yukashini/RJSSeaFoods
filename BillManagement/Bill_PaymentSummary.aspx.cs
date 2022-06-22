using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using ISCLibrary.Utilities;
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
    public partial class Bill_PaymentSummary : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetUserPaymentSummaryScreenData(UserHomeScreen paymentSummaryObj)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = PaymentSummaryList.FetchPaymantSummaryScreenData(paymentSummaryObj, Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBillList(BillListFilter billFilter)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PaymentSummaryList.GetPayerBillList(billFilter, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int BillMarkAsPaid(BillMarkAsPaid payDetails)
        {
            int postStatus = 1;
            string data = string.Empty;
            try
            {
                postStatus = PaymentSummaryList.PayBillOffline(payDetails, Login.Connection);
                if (payDetails.AttachmentList.Count > 0)
                {
                    postStatus = PaymentSummaryList.InsrertPaidBillAttachments(payDetails, Login.Connection);
                }

            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }
    }
}