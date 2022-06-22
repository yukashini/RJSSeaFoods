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
   public class PaymentDetails
    {

        public static DataSet FetchBillDetails(int billId,int payBillId, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                 new SqlParameter("@billId", SqlDbType.Int) { Value = billId },
                   new SqlParameter("@payBillId", SqlDbType.Int) { Value = payBillId }};
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentBillInfo", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int ProcessBillDisputeOrFlag(Billpayment ObjBill, string connection)
        {
            int PostStatus = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                            new SqlParameter("@billId", SqlDbType.Int) { Value = ObjBill.BillId },
                            new SqlParameter("@actionKey", SqlDbType.Int) { Value = ObjBill.ActionKey },
                            new SqlParameter("@status", SqlDbType.Int) { Value = ObjBill.Status },
                            new SqlParameter("@paymentStatus", SqlDbType.Int) { Value = ObjBill.paymentStatus },
                            new SqlParameter("@processedBy", SqlDbType.Int) { Value = AccountID },
                            new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                               new SqlParameter("@billApprovedId", SqlDbType.Int) { Value = ObjBill.ApproveBillId },
                                  new SqlParameter("@disputedReason", SqlDbType.NVarChar) { Value = ObjBill.DisputeComment },

                };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_FlagOrDisputeBill", sqlParam, connection);
                if (PostStatus != 0 && ObjBill.ActionKey == 1)
                {
                    //Send the Flag email to User and Approver

                    SendEmailToClerkForFlagBill(ObjBill, ClientID, connection);
                    SendEmailToApproverForFlagBill(ObjBill, ClientID, connection);
                    int postStatus = ApplicationUsers.InsertAuditlog("Flagged", "Flagged Bill# " + " " + ObjBill.InvoiceNumber + "", "Payment Summary", connection);
                }
                else
                {
                    // send the desputed email to Approver
                    SendEmailToApproverForDisputeBill(ObjBill, ClientID, connection);

                    //  send the desputed email to Clerk 
                    SendEmailToClerkForDisputeBill(ObjBill, ClientID, connection);

                    int postStatus = ApplicationUsers.InsertAuditlog("Disputed", "Disputed Bill# " + " " + ObjBill.InvoiceNumber + "", "Payment Summary", connection);
                }
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw;
            }
            return PostStatus;
        }

        public static int DeletePaidBillDoc(int attachId,int billApprovedId ,string connection)
        {
            int PostStatus = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                            new SqlParameter("@attachmentID", SqlDbType.Int) { Value =attachId },
                            new SqlParameter("@billApproveId", SqlDbType.Int) { Value = billApprovedId },
                           

                };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeletePaidBillAttachment", sqlParam, connection);
                
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw;
            }
            return PostStatus;
        }

        public static int SendEmailToClerkForFlagBill(Billpayment BillDetails,int clientID,string connection)
        {
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                query += @"
                    SELECT TOP 1 AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    ,PrimaryEmailID
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID= '" + BillDetails.CreatedBy + "' AND ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);


                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                       new EmailReplacement { Replacer = "{{PayerName}}", ReplacementValue = BillDetails.PayerName},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter

                    dt = GetEmailTempalte(connection, 610042);


                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = Convert.ToString(dtu.Rows[0]["first_name"]);
                        emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"]);
                        //emailList.PrimaryEmailId = "echarles@innospire.com";
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = "";
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                    postStatus = 1;
                }
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int SendEmailToApproverForFlagBill(Billpayment BillDetails, int clientID, string connection)
        {
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                query += @"
                    SELECT TOP 1 AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    ,PrimaryEmailID
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID= '" + BillDetails.LastApprover + "' AND ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);


                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                       new EmailReplacement { Replacer = "{{PayerName}}", ReplacementValue = BillDetails.PayerName},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter

                    dt = GetEmailTempalte(connection, 610042);


                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = Convert.ToString(dtu.Rows[0]["first_name"]);
                        emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"]);
                        //emailList.PrimaryEmailId = "echarles@innospire.com";
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = "";
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                    postStatus = 1;
                }
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int SendEmailToClerkForDisputeBill(Billpayment BillDetails, int clientID, string connection)
        {
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                query += @"
                    SELECT  AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    ,PrimaryEmailID
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID in( '" + BillDetails.CreatedBy + "') AND ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);


                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                       new EmailReplacement { Replacer = "{{PayerName}}", ReplacementValue = BillDetails.PayerName},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter

                    dt = GetEmailTempalte(connection, 610044);


                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = Convert.ToString(dtu.Rows[0]["first_name"]);
                        emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"]);
                        if (dtu.Rows.Count > 1)
                        {
                            email.CCEmail = Convert.ToString(dtu.Rows[1]["PrimaryEmailID"]);
                        }
                       
                        //emailList.PrimaryEmailId = "echarles@innospire.com";
                        //email.CCEmail = "charlesredlions@gmail.com";
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = "";
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                    postStatus = 1;
                }
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int SendEmailToApproverForDisputeBill(Billpayment BillDetails, int clientID, string connection)
        {
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                query += @"
                    SELECT  AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    ,PrimaryEmailID
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID in( '" + BillDetails.LastApprover + "') AND ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);


                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                       new EmailReplacement { Replacer = "{{PayerName}}", ReplacementValue = BillDetails.PayerName},
                        new EmailReplacement { Replacer = "{{ClerkName}}", ReplacementValue = BillDetails.CreatedByName},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter

                    dt = GetEmailTempalte(connection, 610051);


                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = Convert.ToString(dtu.Rows[0]["first_name"]);
                        emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"]);
                        if (dtu.Rows.Count > 1)
                        {
                            email.CCEmail = Convert.ToString(dtu.Rows[1]["PrimaryEmailID"]);
                        }

                        //emailList.PrimaryEmailId = "echarles@innospire.com";
                        //email.CCEmail = "charlesredlions@gmail.com";
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = "";
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                    postStatus = 1;
                }
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }
    }
}
