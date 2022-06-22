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
    public partial class ViewEmployee : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
     
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetEmployeelistData(string EmployeeId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = EmployeeViewLogic.GetGetBillListData(EmployeeId, Login.Connection);
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