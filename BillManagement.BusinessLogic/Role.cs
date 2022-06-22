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
  public  class Role
    {
        public static DataSet FetchRoleScreenData(int roleID,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@roleID", SqlDbType.Int) { Value = roleID },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = applicationRole }  
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRoleSreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
        public static int RoleDelete(int roleId,int deleteMasterRoleID,string roleName, string connection)
        {
            int postStatus = 0;
            try
            {
              
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                SqlParameter[] 
                    sqlParam = {
                    new SqlParameter("@deleteRoleId", SqlDbType.Int) { Value = roleId },
                     new SqlParameter("@deleteMasterRoleID", SqlDbType.Int) { Value = deleteMasterRoleID },
                    new SqlParameter("@userRoleId", SqlDbType.Int) { Value = applicationRole }
                };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteRole", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Deleted", "Role " + " " + roleName + " " + "deleted", "Roles", connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static DataSet FetchCreateRoleScreenData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@userRoleID", SqlDbType.Int) { Value = applicationRole },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRoleCreationScreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
        public static DataSet FetchAssignedRoleUserCount(int roleID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam = {
                    new SqlParameter("@roleID", SqlDbType.Int) { Value = roleID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRoleAssignedUserCount", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
