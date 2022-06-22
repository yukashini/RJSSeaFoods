using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static BillManagement.BusinessLogic.CredentialLogics;

namespace BillManagement.BusinessLogic
{
   public class PaymentStatusLogic
    {
        public static string GetPaymentStatusList(PaymentStatusFilter paymentStatus, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = paymentStatus.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = paymentStatus.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = paymentStatus.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@vendor", SqlDbType.NVarChar) { Value = paymentStatus.Vendor },
                      new SqlParameter("@billno", SqlDbType.NVarChar) { Value = paymentStatus.BillNo },
                      new SqlParameter("@Transactionid", SqlDbType.NVarChar) { Value = paymentStatus.TransactionId },
                      new SqlParameter("@paidby", SqlDbType.NVarChar) { Value = paymentStatus.PaidBy },
                      new SqlParameter("@dueFrom", SqlDbType.NVarChar) { Value = paymentStatus.Fromdate },
                      new SqlParameter("@dueTo", SqlDbType.NVarChar) { Value = paymentStatus.Todate },
                      new SqlParameter("@mode", SqlDbType.NVarChar) { Value = paymentStatus.Mode },
                      new SqlParameter("@status", SqlDbType.NVarChar) { Value = paymentStatus.Status },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentStatusReport", sqlParam, connection);
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

        public static DataSet GetPaymentStatusFiltersData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPayMentStatusFilterlst", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
