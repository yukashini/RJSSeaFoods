//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.UI;
//using System.Web.UI.WebControls;

//namespace BillManagement
//{
//    public partial class EmployeeList : System.Web.UI.Page
//    {
//        protected void Page_Load(object sender, EventArgs e)
//        {

//        }
//        [System.Web.Services.WebMethod(EnableSession = true)]
//        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
//        public static string GetFilterData()
//        {
//            DataSet ds = new DataSet();
//            string data = string.Empty;
//            try
//            {
//                data = EmployeeListLogics.FetchCreateCustomerMasterData(Login.Connection);

//            }
//            catch (Exception ex)
//            {
//                ExceptionLogEntry.LogException(ex);
//            }
//            return data;
//        }

//        [System.Web.Services.WebMethod(EnableSession = true)]
//        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
//        public static string GetCustomersList(BillListFilter customerFilter)
//        {
//            DataSet ds = new DataSet();
//            string data = string.Empty;
//            try
//            {
//                data = CustomerListLogics.GetCustomerList(customerFilter, Login.Connection);

//            }
//            catch (Exception ex)
//            {
//                ExceptionLogEntry.LogException(ex);
//            }
//            return data;
//        }

//        [System.Web.Services.WebMethod(EnableSession = true)]
//        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
//        public static int InsertCustomerExcelData(List<CustomerLists> customerlists)
//        {
//            int PostStatus = 0;
//            try
//            {
//                PostStatus = CustomerListLogics.SaveBulkExcelData(customerlists, Login.Connection);
//            }
//            catch (Exception ex)
//            {
//                PostStatus = 0;
//            }
//            return PostStatus;
//        }
//    }
//}
    