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
    public partial class ApprovalList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetApprovalListScreenData(UserHomeScreen UserHomeObj)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = ApprovalSummary.GetApprovalListData(UserHomeObj,Login.Connection);
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
        public static int BillsMultiSubmit(List<MultiBillSubmit> billList)
        {
            int PostStatus = 0;
            try
            {
                PostStatus = BillApprovalDetails.MultiSubmit(billList, Login.Connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return PostStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBillList(BillListFilter billFilter)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = ApprovalSummary.GetApproverBillList(billFilter, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
    }
}