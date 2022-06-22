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
  public  class VendorBalanceLogic
    {
        public static string GetVendorBalance(BillVendorBalaneFilterfilter Vendorbalance, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();

            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = Vendorbalance.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = Vendorbalance.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = Vendorbalance.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@vendor", SqlDbType.NVarChar) { Value = Vendorbalance.Vendor },
                      new SqlParameter("@duefrom", SqlDbType.NVarChar) { Value = Vendorbalance.Duefrom },
                      new SqlParameter("@dueTo", SqlDbType.NVarChar) { Value = Vendorbalance.Dueto },
                      new SqlParameter("@from", SqlDbType.NVarChar) { Value = Vendorbalance.From },
                      new SqlParameter("@to", SqlDbType.NVarChar) { Value = Vendorbalance.To },
                      new SqlParameter("@billableamt", SqlDbType.NVarChar) { Value = Vendorbalance.BillableAmt },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetVendorBalanceBasedReport", sqlParam, connection);
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

        public static DataSet GetVendorbalanceStatusFiltersData(string connection)
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
