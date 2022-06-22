using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static BillManagement.BusinessLogic.CredentialLogics;

namespace BillManagement.BusinessLogic
{
  public  class CreateUser
    {
        public static DataSet FetchUserCreateMasterData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@userRoleId", SqlDbType.Int) { Value = applicationRole },
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateUserMasterData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static DataSet FetchRolePermssions(int selectedRole, string connection)
        {
            DataSet ds = new DataSet();
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            try
            {
              
                SqlParameter[] sqlParam = {
                    new SqlParameter("@roleId", SqlDbType.Int) { Value = selectedRole},
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID}
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRolePermission", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int UserInsert(ApplicationUser CustomUser, string connection)
        {
            int PostStatus = 0;
          
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                
                SqlParameter[] sqlActionsParameter =

                                   {
                    
                                    new SqlParameter("@userRoleId", SqlDbType.Int) { Value = applicationRole },
                                     new SqlParameter("@firstName", SqlDbType.NVarChar) { Value = CustomUser.FirstName },
                                     new SqlParameter("@lastName", SqlDbType.NVarChar) { Value = CustomUser.LastName },
                                     new SqlParameter("@userName", SqlDbType.NVarChar) { Value = CustomUser.UserName },
                                     new SqlParameter("@role", SqlDbType.Int) { Value = CustomUser.ApplicationRole },
                                     new SqlParameter("@email", SqlDbType.NVarChar) { Value = CustomUser.PrimaryEmailID },
                                     new SqlParameter("@phoneNumber", SqlDbType.NVarChar) { Value = CustomUser.PhoneNumber },
                                     new SqlParameter("@isActive", SqlDbType.Int) { Value = CustomUser.IsActive },
                                     new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@passWord", SqlDbType.NVarChar) { Value = CustomUser.Password },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                                       new SqlParameter("@isDefaultAccountant", SqlDbType.Int) { Value = CustomUser.IsDefaultAccountant },
                                     new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },
                };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_CreateUser", sqlActionsParameter, connection);

                //EmailReplacement Replacements = new EmailReplacement();
                //string url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                //List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                //{
                //      new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                //      new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = CustomUser.FirstName },
                //      new EmailReplacement { Replacer = "{{RoleName}}", ReplacementValue = CustomUser.RoleNameText },
                //      new EmailReplacement { Replacer = "{{UserName}}", ReplacementValue = CustomUser.PrimaryEmailID },
                //      new EmailReplacement { Replacer = "{{Password}}", ReplacementValue = password},
                //      new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue = url },
                //        new EmailReplacement { Replacer = "{{url}}", ReplacementValue = url },
                //};
                ////// Send Email to user for their credentials
                //if (CustomUser.PrimaryEmailID != null && CustomUser.PrimaryEmailID != "")
                //{
                //    DataTable dt = new DataTable();
                //    Email email = new Email();
                //    EmailInfo emailList = new EmailInfo();
                //    //send template id as parameter
                //    dt = GetEmailTempalte(connection, 610035);
                //    foreach (DataRow row in dt.Rows)
                //    {
                //        email.Body = row["Body"].ToString();
                //        email.Subject = row["Subject"].ToString();
                //        emailList.UserName = Convert.ToString(CustomUser.FirstName);
                //        emailList.PrimaryEmailId = CustomUser.PrimaryEmailID;
                //        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                //        emailList.StartDate = CustomUser.Password;
                //    }
                // //   var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                //    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                //}
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw;

            }
            return PostStatus;
        }

        public static DataSet FetchUserEditData(int userId,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@userRoleId", SqlDbType.Int) { Value = applicationRole },
                    new SqlParameter("@userId", SqlDbType.Int) { Value = userId }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditUserData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }


        public static int UserUpdate(ApplicationUser CustomUser, string connection)
        {
            int PostStatus = 0;

            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {

                                     new SqlParameter("@userRoleId", SqlDbType.Int) { Value = applicationRole },
                                     new SqlParameter("@firstName", SqlDbType.NVarChar) { Value = CustomUser.FirstName },
                                     new SqlParameter("@lastName", SqlDbType.NVarChar) { Value = CustomUser.LastName },
                                     new SqlParameter("@userName", SqlDbType.NVarChar) { Value = CustomUser.UserName },
                                     new SqlParameter("@role", SqlDbType.Int) { Value = CustomUser.ApplicationRole },
                                     new SqlParameter("@email", SqlDbType.NVarChar) { Value = CustomUser.PrimaryEmailID },
                                     new SqlParameter("@phoneNumber", SqlDbType.NVarChar) { Value = CustomUser.PhoneNumber },
                                     new SqlParameter("@isActive", SqlDbType.Int) { Value = CustomUser.IsActive },
                                     new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@passWord", SqlDbType.NVarChar) { Value = CustomUser.Password },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                                     new SqlParameter("@isDefaultAccountant", SqlDbType.Int) { Value = CustomUser.IsDefaultAccountant },
                                     new SqlParameter("@AccountID", SqlDbType.Int) { Value = CustomUser.AccountID},
                                     new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateUser", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {

            }
            return PostStatus;
        }

        public static string FetchUserNames(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
               

                SqlParameter[] sqlParam = {
                   
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = 0 }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("Sp_GetApplicationUserNames", sqlParam, connection);

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
    }
}
