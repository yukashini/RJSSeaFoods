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
    public partial class Bill_PaymentDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBillDetails(int billId,int payBillId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = PaymentDetails.FetchBillDetails(billId, payBillId, Login.Connection);
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
        public static int BillPaymentProcess(Billpayment BillObject)
        {
            int postStatus = 0;
            try
            {
                postStatus = PaymentDetails.ProcessBillDisputeOrFlag(BillObject, Login.Connection);
            }
            catch(Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteAttachment(int docID,int billApprovedID)
        {
            int postStatus = 0;
            try
            {
                postStatus = PaymentDetails.DeletePaidBillDoc(docID,billApprovedID, Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SavePaidBillAttachments(BillMarkAsPaid payDetails)
        {
            int postStatus = 1;
            string data = string.Empty;
            try
            {
              
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