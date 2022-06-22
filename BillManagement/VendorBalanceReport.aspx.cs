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
    public partial class VendorBalanceReport_aspx : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorBalance(BillVendorBalaneFilterfilter Vendorbalance)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorBalanceLogic.GetVendorBalance(Vendorbalance, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorBalancetatusFiltersData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = VendorBalanceLogic.GetVendorbalanceStatusFiltersData(Login.Connection);
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
    }
}