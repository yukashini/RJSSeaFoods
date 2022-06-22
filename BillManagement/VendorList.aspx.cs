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
    public partial class VendorList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorListScreenData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorListLogics.FetchVendorListData(Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int DeleteVendor(int cardId)
        {
            int postStatus = 0;

            try
            {
                postStatus = VendorListLogics.DeleteVendor(cardId, Login.Connection);
               

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }



        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetVendorDataList(VendorListFilter vendorFilter)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = VendorListLogics.GetVendorList(vendorFilter, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int InsertExcelData(List<VendorExcelImport> lstVendor)
        {
            int PostStatus = 0;
            try
            {
                if (lstVendor.Count > 0)
                {
                    PostStatus = VendorListLogics.SaveBulkExcelData(lstVendor, Login.Connection);
                    int postStatus = ApplicationUsers.InsertAuditlog("Created", "Import Vendors", "Vendor List", Login.Connection);
                }
                else
                {
                    PostStatus = 0;
                }
               
            }
            catch (Exception ex)
            {
                PostStatus = 0;
            }

            return PostStatus;
        }
    }
}
