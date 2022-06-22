using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ISCLibrary.DataAccessLayer;
using BillManagement.BussinessObjects;
using System.Web;

namespace BillManagement.BusinessLogic
{
   public class ApproverHomes
    {
        public static DataSet  GetApproverHomeData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParameters= null;
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetApproverHomeBillList", sqlParameters, connection);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static DataSet GetApprovalListHomeData(UserHomeScreen UserHomeObj, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@ClientID", SqlDbType.Int) { Value =clientID },
                      new SqlParameter("@accountID", SqlDbType.Int) { Value =AccountID},
                      new SqlParameter("@currentweekstartDate", SqlDbType.NVarChar) { Value = UserHomeObj.CurrentWeekStartDate },
                      new SqlParameter("@currentweekendDate", SqlDbType.NVarChar) { Value = UserHomeObj.CurrentWeekEndDate },
                      new SqlParameter("@lastweekstartDate", SqlDbType.NVarChar) { Value = UserHomeObj.LastWeekStartDate },
                      new SqlParameter("@lasttweekendDate", SqlDbType.NVarChar) { Value = UserHomeObj.LastWeekEndDate },
                      new SqlParameter("@today", SqlDbType.NVarChar) { Value = UserHomeObj.currentDay },
                      new SqlParameter("@lastDay", SqlDbType.NVarChar) { Value = UserHomeObj.lastDay },
                      new SqlParameter("@isOverDue", SqlDbType.Int) { Value = UserHomeObj.IsOverDue },
                      new SqlParameter("@startDay", SqlDbType.NVarChar) { Value = UserHomeObj.StartDate },
                      new SqlParameter("@endDay", SqlDbType.NVarChar) { Value = UserHomeObj.EndDate },
                      new SqlParameter("@status", SqlDbType.NVarChar) { Value = UserHomeObj.Status },
                       new SqlParameter("@isOnload", SqlDbType.NVarChar) { Value = UserHomeObj.IsOnload },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetApproverHomeScreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }
    }
}
