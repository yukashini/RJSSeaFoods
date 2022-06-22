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
  public class AudilogLogic
    {
        public static string GetAuditlog(Auditlog auditlog, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = auditlog.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = auditlog.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = auditlog.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@activity", SqlDbType.NVarChar) { Value = auditlog.Activity },
                      new SqlParameter("@description", SqlDbType.NVarChar) { Value = auditlog.Description },
                      new SqlParameter("@screen", SqlDbType.NVarChar) { Value = auditlog.Screen },
                      new SqlParameter("@user", SqlDbType.NVarChar) { Value = auditlog.User },
                      new SqlParameter("@from", SqlDbType.NVarChar) { Value = auditlog.Fromdate },
                      new SqlParameter("@to", SqlDbType.NVarChar) { Value = auditlog.Todate },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetAuditlog", sqlParam, connection);
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

        public static DataSet GetUserlistData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUsetDetaillist", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
