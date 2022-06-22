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
    public partial class DeliveryConditions : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoicelst(DeliveryConditionsINvoiceFilterfilter list)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DeliveryConditionsLogics.GetInvoicelst(list, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int SaveDelivery(DeliveryConditionsObjects objDelivery)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = DeliveryConditionsLogics.InsertDelivery(objDelivery, Login.Connection);

            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteDelivery(int Delivery_ID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = DeliveryConditionsLogics.DeleteDelivery(Delivery_ID, Login.Connection);

            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int UpdateDelivery(DeliveryConditionsObjects objDelivery)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = DeliveryConditionsLogics.UpdateDelivery(objDelivery, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objDelivery.Delivery_ID + " ", "Delivery", Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetEditDeliveryData(int Delivery_ID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DeliveryConditionsLogics.FetchDeliveryData(Delivery_ID, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetFilterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = DeliveryConditionsLogics.FetchDeliveryConditionsMasterData(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }



    }
}