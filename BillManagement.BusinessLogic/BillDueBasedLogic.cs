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
  public class BillDueBasedLogic
    {
        public static string GetBillDueBasedReport(BilldueFilterfilter Billdue, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = Billdue.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = Billdue.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = Billdue.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@vendor", SqlDbType.NVarChar) { Value = Billdue.Vendor },
                      new SqlParameter("@dueindays", SqlDbType.NVarChar) { Value = Billdue.Dueinday },
                      new SqlParameter("@duefrom", SqlDbType.NVarChar) { Value = Billdue.Duefrom },
                      new SqlParameter("@dueTo", SqlDbType.NVarChar) { Value = Billdue.Dueto },
                      new SqlParameter("@from", SqlDbType.NVarChar) { Value = Billdue.From },
                      new SqlParameter("@to", SqlDbType.NVarChar) { Value = Billdue.To },
                      new SqlParameter("@approvalstatus", SqlDbType.NVarChar) { Value = Billdue.Approvalstatus },
                      new SqlParameter("@paymentstatus", SqlDbType.NVarChar) { Value = Billdue.Paymentstatus },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillDueBasedReport", sqlParam, connection);
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

        public static DataSet GetUnpaidBillStatusFiltersData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUnpaidBillStatusReport", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
