using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ISCLibrary.DataAccessLayer;
using ISCLibrary.Utilities;
using System.Data.SqlClient;
using System.Data;
using System.Web;
using BillManagement.BussinessObjects;

namespace BillManagement.BusinessLogic
{
    public class UserHome
    {
        public static string GetMasterDetailsData(int clientID, int accountID, string connection)
        {
            string data = string.Empty;
            try
            {
                DataSet ds = new DataSet();
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@ClientId",SqlDbType.Int) {Value=clientID},
                    new SqlParameter("@AccountId",SqlDbType.Int) {Value=accountID}
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUserHomeMasterData", sqlParam, connection);
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return data;
        }

        public static string GetUserHomeBillDetails(int accountID, string connection)
        {
            string data = string.Empty;
            try
            {
                DataSet ds = new DataSet();
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@accountID",SqlDbType.Int) {Value=accountID}
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUserHomeBillDetails", sqlParam, connection);
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return data;
        }
        public static DataSet GetInvoiceData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetHomeScreenDataNew", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static DataSet FetchBillUserHomeScreenData(UserHomeScreen UserHomeObj, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                      new SqlParameter("@accountID", SqlDbType.Int) { Value =AccountID},
                      new SqlParameter("@currentweekstartDate", SqlDbType.NVarChar) { Value = UserHomeObj.CurrentWeekStartDate },
                      new SqlParameter("@currentweekendDate", SqlDbType.NVarChar) { Value = UserHomeObj.CurrentWeekEndDate },
                      new SqlParameter("@lastweekstartDate", SqlDbType.NVarChar) { Value = UserHomeObj.LastWeekStartDate },
                      new SqlParameter("@lasttweekendDate", SqlDbType.NVarChar) { Value = UserHomeObj.LastWeekEndDate },
                      new SqlParameter("@startDate", SqlDbType.NVarChar) { Value = UserHomeObj.StartDate },
                      new SqlParameter("@endDate", SqlDbType.NVarChar) { Value = UserHomeObj.EndDate },
                      new SqlParameter("@isOverDue", SqlDbType.Int) { Value = UserHomeObj.IsOverDue },
                      new SqlParameter("@status", SqlDbType.Int) { Value = UserHomeObj.Status },
                      new SqlParameter("@isOnload", SqlDbType.Int) { Value = UserHomeObj.IsOnload },
                      new SqlParameter("@isDueDateFilter", SqlDbType.NVarChar) { Value = UserHomeObj.IsDueFilter },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUserHomeScreenDataNew", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

    }
}
