using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static BillManagement.BusinessLogic.CredentialLogics;

namespace BillManagement.BusinessLogic
{
   public class ClientAdminLogics
    {
        public static string FetchAdminScreenData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@userID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetClientAdminScreenData", sqlParam, connection);

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

        public static int ClientAdminInsertProcess(ClientAdminObjects ClientDetails, string connection)
        {
            int PostStatus = 0;
            int createdUserID = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@Firstname", SqlDbType.NVarChar) { Value = ClientDetails.Firstname },
                             new SqlParameter("@Lastname", SqlDbType.NVarChar) { Value = ClientDetails.Lastname },
                             new SqlParameter("@Emailid", SqlDbType.NVarChar) { Value = ClientDetails.Emailid },
                             new SqlParameter("@Linkid", SqlDbType.NVarChar) { Value = ClientDetails.Linkid },
                             new SqlParameter("@CreatedBy", SqlDbType.Int) { Value = AccountID },
                             new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },
                    };
                createdUserID = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("Sp_InsertClientUser", sqlParameters, connection);

                        if (createdUserID != 0) 
                        {
                            SqlParameter[] sqlActionsParameter =
                                   {
                             new SqlParameter("@CompanyName", SqlDbType.NVarChar) { Value = ClientDetails.Companyname },
                             new SqlParameter("@ActivationKey", SqlDbType.NVarChar) { Value = ClientDetails.ActivationKey },
                             new SqlParameter("@CreatedBy", SqlDbType.Int) { Value = AccountID },
                             new SqlParameter("@userID", SqlDbType.Int) { Value = createdUserID },
                             new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },
                            
                            };
                createdUserID = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertClientAdmin", sqlActionsParameter, connection);

                    //Send Email to created admin
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    dt = CredentialLogics.GetEmailTempalte(connection, 600030);
                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = ClientDetails.Firstname;
                        emailList.PrimaryEmailId = ClientDetails.Emailid;
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = ClientDetails.ActivationKey;
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["signupurl"]) + "?_id=" + Convert.ToInt32(ClientDetails.Linkid);
                    var reportFilterResults = CredentialLogics.UMailForAllAction(emailList, email, url);

                }
            }
            catch (Exception ex)
            {
                createdUserID = 0;
            }
            return createdUserID;
        }

        public static int ClientAdminUpdateProcess(ClientAdminObjects ClientDetails, string connection)
        {
            int PostStatus = 0;
            int updatedUserID = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@Firstname", SqlDbType.NVarChar) { Value = ClientDetails.Firstname },
                             new SqlParameter("@Lastname", SqlDbType.NVarChar) { Value = ClientDetails.Lastname },
                             new SqlParameter("@Emailid", SqlDbType.NVarChar) { Value = ClientDetails.Emailid },
                             new SqlParameter("@Companyname", SqlDbType.NVarChar) { Value = ClientDetails.Companyname },
                             new SqlParameter("@UpdatedBy", SqlDbType.Int) { Value = AccountID },
                             new SqlParameter("@ClientID", SqlDbType.Int) { Value = ClientDetails.ClientID },
                             new SqlParameter("@UserID", SqlDbType.Int) { Value = ClientDetails.UserID },
                           
                    };
                updatedUserID = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateClientAdmin", sqlParameters, connection);
            }
            catch (Exception ex)
            {
                updatedUserID = 0;
            }
            return updatedUserID;
        }

        public static int ClientAdminChangeStateProcess(ClientAdminObjects ClientDetails, string connection)
        {
            int PostStatus = 0;
            int updatedUserID = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@ClientID", SqlDbType.Int) { Value = ClientDetails.ClientID },
                             new SqlParameter("@IsActivate", SqlDbType.Int) { Value = ClientDetails.IsActivateState },
                             new SqlParameter("@UpdatedBy", SqlDbType.Int) { Value =AccountID },
                    };
                updatedUserID = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_ChangeClientAdminState", sqlParameters, connection);
            }
            catch (Exception ex)
            {
                updatedUserID = 0;
            }
            return updatedUserID;
        }

    }
}
