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
    public partial class PortofDischargeList : System.Web.UI.Page
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
                    data = PortofDishargeListLogics.GetInvoicelst(list, Login.Connection);

                }
                catch (Exception ex)
                {
                    ExceptionLogEntry.LogException(ex);
                }
                return data;
            }
            [System.Web.Services.WebMethod(EnableSession = true)]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public static int SaveDischarge(PortofDischargeObjects objDischarge)
            {
                DataSet ds = new DataSet();
                string data = string.Empty;
                int postStatus = 0;
                try
                {
                    postStatus = PortofDishargeListLogics.InsertDischarge(objDischarge, Login.Connection);

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
        public static int DeleteDischarge(int DischargeID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = PortofDishargeListLogics.DeleteDischarge(DischargeID, Login.Connection);

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
        public static int UpdateDischarge(PortofDischargeObjects objDischarge)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = PortofDishargeListLogics.UpdateDischarge(objDischarge, Login.Connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objDischarge.DischargeID + " ", "Discharge List", Login.Connection);
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
        public static string GetEditDischargeData(int DischargeID)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = PortofDishargeListLogics.FetchDischargeData(DischargeID, Login.Connection);

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
                data = PortofDishargeListLogics.FetchCreateDischargeMasterData(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

    }
 }