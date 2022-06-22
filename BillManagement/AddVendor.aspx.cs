using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
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
    public partial class AddVendor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [Obsolete]
        public static int InsertVendor(VendorDetails vendorDetails)
        {
            int postStatus = 0;

            try
            {
                postStatus = VendorProcessLogics.InsertVendor(vendorDetails, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Vendor"+" " + vendorDetails.Vendor.FirstName + " "+"added", "Vendor List", Login.Connection);
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
        public static int UpdateVendor(VendorDetails vendorDetails)
        {
            int postStatus = 0;
            try
            {
                postStatus = VendorProcessLogics.UpdateVendorDetails(vendorDetails, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Edited "+" "+ vendorDetails.Vendor.FirstName+ "", "Vendor List", Login.Connection);
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
        public static string GetEditVendorDetails(int vendorID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorProcessLogics.FetchEditVendorData(vendorID,Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetMasterData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorProcessLogics.FetchMasterData(Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }
}