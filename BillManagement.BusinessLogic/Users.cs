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
   public class Users
    {
        public static DataSet FetchUserScreenData(int roleID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@roleID", SqlDbType.Int) { Value = roleID },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUserSreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int UserDelete(int userID, string connection,string userName)
        {
            int postStatus = 0;
            try
            {

                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                SqlParameter[]
                    sqlParam = {
                    new SqlParameter("@deleteUserId", SqlDbType.Int) { Value = userID },
                    new SqlParameter("@userRoleId", SqlDbType.Int) { Value = applicationRole }
                };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteUser", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Deleted", "Deleted User " + " " + userName + "", "Users", connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static string GetUserList(UserFilter userFilter, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = userFilter.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = userFilter.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = userFilter.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@status", SqlDbType.NVarChar) { Value = userFilter.Status },
                      new SqlParameter("@userID", SqlDbType.NVarChar) { Value = userFilter.UserID },
                      new SqlParameter("@role", SqlDbType.NVarChar) { Value = userFilter.ApplicationRole },


                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateUserList", sqlParam, connection);

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
