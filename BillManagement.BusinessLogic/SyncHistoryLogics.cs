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
  public  class SyncHistoryLogics
    {
        public static string FetchSynclistFilterData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUsersList", sqlParam, connection);

                if (ds.Tables.Count > 0)
                {
                    foreach (DataTable table in ds.Tables)
                    {
                        if (table.Rows.Count > 0)
                        {
                            table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                        }
                    }
                    Strresult = _objCommon.DataSetToStringWithTableName(ds);
                }

            }
            catch (Exception ex)
            {

            }
            return Strresult;
        }

        public static string fetchDenaliSyncListList(BillListFilter billFilter, string connection)
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
                      new SqlParameter("@accountID", SqlDbType.Int) { Value = billFilter.AccountID },
                      new SqlParameter("@status", SqlDbType.NVarChar) { Value = billFilter.strStatus },
                      new SqlParameter("@startDate", SqlDbType.NVarChar) { Value = billFilter.StartDate },
                      new SqlParameter("@endDate", SqlDbType.NVarChar) { Value = billFilter.EndDate },
                  };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateDenaliSyncList", sqlParam, connection);

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
