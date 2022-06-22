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
    public class ApprovalSummary
    {
        public static DataSet GetMasterDetailsData(int clientID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@ClientId",SqlDbType.Int) {Value=clientID},
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetApprovalSummaryMasterData", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static DataSet GetInvoiceData(int clientID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@clientId",SqlDbType.Int) {Value=clientID }
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetApprovalSummaryBillList", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static DataSet GetApprovalListData(UserHomeScreen UserHomeObj, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                 int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                      new SqlParameter("@accountID", SqlDbType.Int) { Value =AccountID},
                      new SqlParameter("@currentweekstartDate", SqlDbType.NVarChar) { Value = UserHomeObj.CurrentWeekStartDate },
                      new SqlParameter("@currentweekendDate", SqlDbType.NVarChar) { Value = UserHomeObj.CurrentWeekEndDate },
                      new SqlParameter("@lastweekstartDate", SqlDbType.NVarChar) { Value = UserHomeObj.LastWeekStartDate },
                      new SqlParameter("@lasttweekendDate", SqlDbType.NVarChar) { Value = UserHomeObj.LastWeekEndDate },
                         new SqlParameter("@ClientID", SqlDbType.Int) { Value =clientID },
                            new SqlParameter("@today", SqlDbType.NVarChar) { Value = UserHomeObj.currentDay },
                            new SqlParameter("@lastDay", SqlDbType.NVarChar) { Value = UserHomeObj.lastDay },
                            new SqlParameter("@kpiStatus", SqlDbType.Int) { Value =UserHomeObj.Status },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetApprovalListScreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static string GetApproverBillList(BillListFilter billFilter, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = billFilter.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = billFilter.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = billFilter.OrderBy },
                      new SqlParameter("@accountID", SqlDbType.Int) { Value = accountID },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                       new SqlParameter("@vendor", SqlDbType.Int) { Value = billFilter.VendorID },
                          new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value = billFilter.InvoiceNumber },
                            new SqlParameter("@dueFrom", SqlDbType.NVarChar) { Value = billFilter.DueDateFrom },
                              new SqlParameter("@dueTo", SqlDbType.NVarChar) { Value = billFilter.DueDateTo },
                              new SqlParameter("@dStatus", SqlDbType.Int) { Value = billFilter.Dstatus },
                              new SqlParameter("@kpiStatus", SqlDbType.Int) { Value = billFilter.KpiStatus },

                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetApproverPaginateBillList", sqlParam, connection);

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
