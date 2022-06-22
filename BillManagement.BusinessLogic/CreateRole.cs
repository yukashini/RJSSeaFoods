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
   public class CreateRole
    {

        public static int RoleInsert(List<ApplicationRole> CustomRole, string connection)
        {
            int PostStatus = 0;
            int applicationRoleID = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                if (CustomRole.Count > 0)
                {
                    foreach (ApplicationRole role in CustomRole)
                    {
                        SqlParameter[] sqlParameters = {
                            new SqlParameter("@userRoleID", SqlDbType.Int) { Value = applicationRole },
                             new SqlParameter("@roleName", SqlDbType.NVarChar) { Value = role.RoleName },
                              new SqlParameter("@description", SqlDbType.NVarChar) { Value = role.Description },
                             new SqlParameter("@status", SqlDbType.Int) { Value = role.Status },
                             new SqlParameter("@masterRoleID", SqlDbType.Int) { Value = role.MasterRoleID },
                             new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                             new SqlParameter("@RetVal", SqlDbType.Int) { Value = 0 },
                              new SqlParameter("@clientID", SqlDbType.Int) { Value =  clientID},
                    };
                        applicationRoleID = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertApplicationRole", sqlParameters, connection);
                        int postStatus = ApplicationUsers.InsertAuditlog("Created", "New Role " + " " + role.RoleName + " " + "Added", "Roles", connection);
                        if (role.lstEntityActions.Count > 0 && applicationRoleID != 0) ;
                        {
                            foreach (ApplicationRoleEntity roleAction in role.lstEntityActions)
                            {
                                SqlParameter[] sqlActionsParameter =
                                   {
                             new SqlParameter("@userRoleID", SqlDbType.Int) { Value = applicationRole },
                             new SqlParameter("@entityActionID", SqlDbType.Int) { Value = roleAction.EntityActionID },
                             new SqlParameter("@roleID", SqlDbType.Int) { Value =applicationRoleID},

                             new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID }
                            };
                                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertApplicationRoleActions", sqlActionsParameter, connection);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                applicationRoleID = 0;
            }
            return applicationRoleID;
        }

        public static DataSet FetchRoleEditData(int roleID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@userRoleID", SqlDbType.Int) { Value = applicationRole },
                     new SqlParameter("@editRoleID", SqlDbType.Int) { Value = roleID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRoleEditDetails", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int RoleUpdate(List<ApplicationRole> CustomRole, string connection)
        {
            int PostStatus = 0;
            int applicationRoleID = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());

                if (CustomRole.Count > 0)
                {
                    foreach (ApplicationRole role in CustomRole)
                    {
                        SqlParameter[] sqlParameters = {
                            new SqlParameter("@userRoleID", SqlDbType.Int) { Value = applicationRole },
                             new SqlParameter("@roleName", SqlDbType.NVarChar) { Value = role.RoleName },
                              new SqlParameter("@description", SqlDbType.NVarChar) { Value = role.Description },
                             new SqlParameter("@status", SqlDbType.Int) { Value = role.Status },
                             new SqlParameter("@updatedBy", SqlDbType.Int) { Value = AccountID },
                             new SqlParameter("@editRoleID", SqlDbType.Int) { Value =role.RoleID  },
                    };
                        applicationRoleID = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_EditApplicationRole", sqlParameters, connection);

                        if (role.lstEntityActions.Count > 0 && role.RoleID != 0) ;
                        {
                            foreach (ApplicationRoleEntity roleAction in role.lstEntityActions)
                            {
                                SqlParameter[] sqlActionsParameter =
                                   {
                             new SqlParameter("@userRoleID", SqlDbType.Int) { Value = applicationRole },
                             new SqlParameter("@entityActionID", SqlDbType.Int) { Value = roleAction.EntityActionID },
                             new SqlParameter("@roleID", SqlDbType.Int) { Value =role.RoleID},

                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID }
                            };
                                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertApplicationRoleActions", sqlActionsParameter, connection);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                applicationRoleID = 0;
            }
            return applicationRoleID;
        }

    }
}
