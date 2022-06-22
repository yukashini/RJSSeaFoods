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
   public class ClientSignUpLogics
    {
        public static string FetchAdminSignUpScreenData(int linkId,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                //int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@linkId", SqlDbType.Int) { Value = linkId },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetSignUpUserDetails", sqlParam, connection);

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

        public static int UpdateAdminPassword(ClientSignUpObjects ClientDetails, string connection)
        {
            int PostStatus = 0;
            int updatedUserID = 0;
            try
            {
               
                SqlParameter[] sqlParameters = {
                                 new SqlParameter("@password", SqlDbType.NVarChar) { Value =ClientDetails.PassWord },
                                 new SqlParameter("@accountId", SqlDbType.Int) { Value =ClientDetails.AccountID },
                                  new SqlParameter("@clientId", SqlDbType.Int) { Value =ClientDetails.ClientID }
                    };
                updatedUserID = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateClientAdminPassword", sqlParameters, connection);
                DataTable dt = new DataTable();
                Email email = new Email();
                EmailInfo emailList = new EmailInfo();
                dt = GetEmailTempalte(connection, 610031);
                foreach (DataRow row in dt.Rows)
                {
                    email.Body = row["Body"].ToString();
                    email.Subject = row["Subject"].ToString();
                    emailList.UserName = Convert.ToString(ClientDetails.Firstname); ;
                    emailList.PrimaryEmailId = Convert.ToString(ClientDetails.Email);
                    emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                }
                var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                var reportFilterResults = UMailForAllAction(emailList, email, url);
            }
            catch (Exception ex)
            {
                updatedUserID = 0;
            }
            return updatedUserID;
        }
        public static string GetInvoInVoicEmaildetails(int billId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                SqlParameter[] sqlParam = {
                     new SqlParameter("@invoiceid", SqlDbType.Int) { Value =billId },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetInvoiceEmaildetailsPaynow", sqlParam, connection);
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
