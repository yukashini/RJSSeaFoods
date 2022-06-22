using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using ISCLibrary.Utilities;
using System;
using System.Data;
using System.Web.Script.Services;

namespace BillManagement
{
    public partial class Employee : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoicelst(INvoiceFilterfilter list)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = EmployeeDTO.GetInvoicelst(list, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoiceData()
         {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = EmployeeDTO.GetInvoiceData(Login.Connection);
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