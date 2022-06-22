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
    public partial class CreateNewBill : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetMasterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try

            {
                ds = BillUpload.GetCreateBillMasterDetailsData(Login.Connection);
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
        public static int InsertBill(CustomBill billObject)
        {
            int postStatus = 0;
            try
            {
                postStatus= BillUpload.CreateNewBill(billObject, Login.Connection);
            }
            catch(Exception ex)
            {

            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetEditBillDetails(int billId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try

            {
                ds = BillUpload.FetchBillEditData(billId,Login.Connection);
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
        public static int UpdateBill(CustomBill billObject)
        {
            int postStatus = 0;
            try
            {
                postStatus= BillUpload.UpdateBillDetails(billObject, Login.Connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendors(string VendorName)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = BillUpload.FetchVendors(VendorName, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertVendor(VendorDetails vendorDetails)
        {
            int postStatus = 0;

            try
            {
                postStatus = VendorProcessLogics.InsertVendorMandatories(vendorDetails, Login.Connection);
           
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
        public static string GetCustomizedApprovers(ConfiguredApprovers objApprover)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = BillUpload.FetchCustomizedVendors(objApprover, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }
}