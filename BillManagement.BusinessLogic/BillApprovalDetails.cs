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
   public  class BillApprovalDetails
    {
        public static DataSet CollectApprovalBillDetails(int billId,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                 new SqlParameter("@billId", SqlDbType.Int) { Value = billId }};
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillApprovalDetails", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int ProcessBillAprovalOrReject(BillApproval BillDetails,string connection)
        {
            int PostStatus = 0;
            try
                {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@accountId", SqlDbType.Int) { Value = AccountID },
                     new SqlParameter("@billID", SqlDbType.Int) { Value = BillDetails.BillId },
                     new SqlParameter("@approvedAmount", SqlDbType.Float) { Value = BillDetails.ApprovedAmount },
                     new SqlParameter("@balanceAmount", SqlDbType.Float) { Value = BillDetails.BalanceAmount },
                     new SqlParameter("@payableAmount", SqlDbType.Float) { Value = BillDetails.PayableAmount },
                     new SqlParameter("@status", SqlDbType.Int) { Value = BillDetails.Status },
                     new SqlParameter("@approverComment", SqlDbType.NVarChar) { Value = BillDetails.ApproverComment },
                     new SqlParameter("@actionKey", SqlDbType.Int) { Value = BillDetails.ActionKey },
                     new SqlParameter("@dueOn", SqlDbType.DateTime) { Value = BillDetails.DueOn },
                     new SqlParameter("@vendorId", SqlDbType.Int) { Value = BillDetails.VendorID },
                     new SqlParameter("@currentBillStageApprovalID", SqlDbType.Int) { Value = BillDetails.CurrentBillStageApprovalID },
                     new SqlParameter("@isPartial", SqlDbType.Int) { Value = BillDetails.IsPartial },
                     new SqlParameter("@approveStatus", SqlDbType.Int) { Value = BillDetails.ApproveStatus },
                     new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_BillApproveOrReject", sqlParam, connection);

                if (BillDetails.ActionKey == 2)
                {
                    //Send Rejected Email to Clerk
                   
                    PostStatus = SendEmailtoClerk(BillDetails, ClientID, connection, BillDetails.ActionKey);
                    int postStatus = ApplicationUsers.InsertAuditlog("Rejected", "Rejected Bill# " + " " + BillDetails.InvoiceNumber + "", "Approvals", connection);
                }
                else
                {
                   
                    //Send the email to next approver based on sequence
                    PostStatus = SendApprovedEmailtoNextApprover(BillDetails, ClientID, connection);

                    //Send the email to Bill owner for bill aproved by the current apprver
                    PostStatus = SendEmailtoClerk(BillDetails, ClientID, connection, BillDetails.ActionKey);
                    int postStatus = ApplicationUsers.InsertAuditlog("Approved", "Approved Bill# " + " " + BillDetails.InvoiceNumber + "", "Approvals", connection);
                }
            }
            catch(Exception ex)
            {
                PostStatus = 0;
                throw;
            }
            return PostStatus;
        }

        public static DataSet FetchApprovalBillDetails(int billId, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                 new SqlParameter("@billId", SqlDbType.Int) { Value = billId }};
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillDetails", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int MultiSubmit(List<MultiBillSubmit> billList, string connection)
        {
            int postStatus = 0;
            try
            {
                if (billList.Count > 0)
                {
                    int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                    int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                    foreach (MultiBillSubmit bill in billList)
                    {
                        SqlParameter[] sqlParam = {
                        new SqlParameter("@accountId", SqlDbType.Int) { Value = AccountID },
                     new SqlParameter("@billId", SqlDbType.Int) { Value = bill.BillId },
                       new SqlParameter("@actionKey", SqlDbType.Int) { Value = bill.ActionKey },
                     new SqlParameter("@approvedAmount", SqlDbType.Float) { Value = bill.ApprovedAmount },
                     new SqlParameter("@payableAmount", SqlDbType.Float) { Value = bill.PayableAmount },
                       new SqlParameter("@dueOn", SqlDbType.DateTime) { Value = bill.DueDate },
                       new SqlParameter("@vendorId", SqlDbType.Int) { Value = bill.VendorId },
                       new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                        new SqlParameter("@comment", SqlDbType.NVarChar) { Value = bill.Comment },

                        };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_Multiapproval", sqlParam, connection);
                    }
                }

            }
            catch(Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }


        public static int SendEmailtoClerk(BillApproval BillDetails, int clientID, string connection,int AproveStatus)
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
                       new EmailReplacement { Replacer = "{{invoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                       new EmailReplacement { Replacer = "{{submittedOn}}", ReplacementValue = BillDetails.SubmittedOn},
                       new EmailReplacement { Replacer = "{{approverName}}", ReplacementValue = BillDetails.ApproverName},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter
                    if (AproveStatus == 2)
                    {
                        dt = GetEmailTempalte(connection, 610039);
                    }
                    else
                    {
                        dt = GetEmailTempalte(connection, 610040);
                    }
                   
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
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static int SendApprovedEmailtoNextApprover(BillApproval BillDetails, int clientID, string connection)
        {
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                query += @"DECLARE @currentSequence As NUMERIC(18,0)
                         SET @currentSequence=(SELECT Sequence FROM BillStageApproval WHERE ApproverID="+ AccountID + " AND BillID="+ BillDetails.BillId + ") SELECT A.FirstName,A.PrimaryEmailID,B.Sequence From Tbl_Accounts AS A LEFT  JOIN BillStageApproval AS B ON A.AccountID =B.ApproverID  WHERE B.BillID="+BillDetails.BillId+" AND A.ClientID="+clientID+" AND B.Sequence=@currentSequence+10";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);

                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["FirstName"]==null?"":dtu.Rows[0]["FirstName"])},
                       new EmailReplacement { Replacer = "{{ClerkName}}", ReplacementValue = BillDetails.ClerkName},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                      new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                       new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };


                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter
                    dt = GetEmailTempalte(connection, 610037);
                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = Convert.ToString(dtu.Rows[0]["FirstName"]);
                        emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"]);
                        //emailList.PrimaryEmailId = "echarles@innospire.com";
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = "";
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                    postStatus = 1;
                }
                else
                {
                    //Send Email to finace Manager when all the approvers are approved the bill
                    SendEmailToFinanceManager(BillDetails, clientID, connection);
                }
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static int SendEmailToFinanceManager(BillApproval BillDetails, int clientID, string connection)
        {
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                query += @"
                    SELECT A.[FirstName],A.PrimaryEmailID FROM Tbl_Accounts 
                    AS A
                    INNER JOIN ApplicationRoleENtity AS B
                    ON A.ApplicationRole=B.RoleID
                    INNER JOIN EntityAction AS C
                    ON B.EntityActionID=C.EntityActionID
                    INNER JOIN Entity AS D
                    ON C.EntityID=D.EntityID
                    WHERE A.ClientID=" + clientID + " AND D.EntityID=2002 AND A.ApplicationRole !=1005";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);

                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                    {
                      new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                      //new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = "Ravishankar"},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["FirstName"]==null?"":dtu.Rows[0]["FirstName"])},
                       new EmailReplacement { Replacer = "{{ApproverName}}", ReplacementValue = BillDetails.ApproverName},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = BillDetails.InvoiceNumber},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                    };

                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter
                    dt = GetEmailTempalte(connection, 610041);
                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        // emailList.UserName = "Ravi";
                        emailList.UserName = Convert.ToString(dtu.Rows[0]["FirstName"] == null ? "" : dtu.Rows[0]["FirstName"]);
                        emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"] == null ? "" : dtu.Rows[0]["PrimaryEmailID"]);
                        //  emailList.PrimaryEmailId = "echarles@innospire.com";
                        emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        emailList.StartDate = "";
                    }
                    var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                    var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                }
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }
    }

 
}
