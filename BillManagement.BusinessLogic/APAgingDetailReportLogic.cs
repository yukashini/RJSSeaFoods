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
    public class APAgingDetailReportLogic
    {

        public static string GetAgingDetailedReport(AgingDetailedfilter Detials, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {
                      new SqlParameter("@start", SqlDbType.Int) { Value = Detials.Start },
                      new SqlParameter("@skip", SqlDbType.Int) { Value = Detials.Skip },
                      new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = Detials.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@vendor", SqlDbType.NVarChar) { Value = Detials.Vendor },
                      new SqlParameter("@paymentterms", SqlDbType.NVarChar) { Value = Detials.PaymentTerms },
                      new SqlParameter("@balanceamt", SqlDbType.NVarChar) { Value = Detials.Balanceamt },
                      new SqlParameter("@fromval", SqlDbType.NVarChar) { Value = Detials.Fromval },
                      new SqlParameter("@toval", SqlDbType.NVarChar) { Value = Detials.Toval },
                      new SqlParameter("@fromdate", SqlDbType.NVarChar) { Value = Detials.Fromdate },
                      new SqlParameter("@todate", SqlDbType.NVarChar) { Value = Detials.Todate },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetAgingDetailedReport", sqlParam, connection);
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
        public static DataSet GetAgingFiltersData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetAgingStatusReport", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
