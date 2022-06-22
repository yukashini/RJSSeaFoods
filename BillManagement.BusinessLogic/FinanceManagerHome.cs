using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BillManagement.BusinessLogic
{
    public class FinanceManagerHome
    {
        public static DataSet GetFinanceHomeData(int ClientID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetFinancerHomeData", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static int UpdateBill(int billId, int identityId, string connection)
        {
            int postStatus = 0;
            try
            {

                SqlParameter[] sqlParam = {
                    new SqlParameter("@billId", SqlDbType.Int) { Value = billId },
                    new SqlParameter("@approvedBillId", SqlDbType.Int) { Value = identityId },
                  };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_ChangeBillStatusToFlag", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }


        public static DataSet FetchPaymantSummaryHomeScreenData(UserHomeScreen paymentSummaryObj, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {

                      new SqlParameter("@currentweekstartDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.CurrentWeekStartDate },
                      new SqlParameter("@currentweekendDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.CurrentWeekEndDate },
                      new SqlParameter("@lastweekstartDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.LastWeekStartDate },
                      new SqlParameter("@lasttweekendDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.LastWeekEndDate },
                         new SqlParameter("@startDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.StartDate },
                         new SqlParameter("@endDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.EndDate },
                          new SqlParameter("@isOverDue", SqlDbType.Int) { Value = paymentSummaryObj.IsOverDue },
                      new SqlParameter("@currentDay", SqlDbType.NVarChar) { Value = paymentSummaryObj.currentDay },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value =clientID},
                      new SqlParameter("@status", SqlDbType.Int) { Value =paymentSummaryObj.Status},
                       new SqlParameter("@isOnload", SqlDbType.Int) { Value =paymentSummaryObj.IsOnload},

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentSummaryHomeScreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static string GetBillcomments(int billId,int approvedId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {
                      new SqlParameter("@billId", SqlDbType.Int) { Value =billId },
                      new SqlParameter("@ApprovedBillID", SqlDbType.Int) { Value =approvedId },

                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("Sp_GetApprovedBillComments", sqlParam, connection);

                foreach (DataTable table in ds.Tables)
                {
                    if (table.Rows.Count > 0)
                    {
                        table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                    }
                }
                Strresult = _objCommon.DataSetToStringWithTableName(ds);
            }
            catch (Exception ex)
            {

            }
            return Strresult;
        }
    }
}
