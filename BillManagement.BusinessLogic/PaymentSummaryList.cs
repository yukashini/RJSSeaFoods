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
    public class PaymentSummaryList
    {
        public static DataSet GetMasterDetailsData(int clientID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@ClientId",SqlDbType.Int) {Value=clientID},
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentSummaryMasterData", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static DataSet GetFinancerData(int clientID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@clientId",SqlDbType.Int) {Value=clientID }
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentSummaryBillList", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static DataSet GetapprovedBillData(int clientID, int identityId, int billId, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@IdentityId",SqlDbType.Int) {Value=identityId },
                     new SqlParameter("@BillId",SqlDbType.Int) {Value=billId },
                     new SqlParameter("@ClinetId",SqlDbType.Int) {Value=clientID }
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentBillDetails", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static int ChallengeBill(int identityId, int billId, string connection)
        {
            int postStatus = 0;
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@identityId",SqlDbType.Int) {Value=identityId },
                     new SqlParameter("@billId",SqlDbType.Int) {Value=billId }
                };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_ChallengeBill", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static DataSet FetchPaymantSummaryScreenData(UserHomeScreen paymentSummaryObj, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {

                      new SqlParameter("@currentweekstartDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.CurrentWeekStartDate },
                      new SqlParameter("@currentweekendDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.CurrentWeekEndDate },
                      new SqlParameter("@lastweekstartDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.LastWeekStartDate },
                      new SqlParameter("@lasttweekendDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.LastWeekEndDate },
                      new SqlParameter("@currentDay", SqlDbType.NVarChar) { Value = paymentSummaryObj.currentDay },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value =clientID},
                      new SqlParameter("@kpiStatus", SqlDbType.Int) { Value =paymentSummaryObj.Status},
                        new SqlParameter("@fromDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.DueFrom },
                          new SqlParameter("@toDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.DueTo },
                            new SqlParameter("@overDueDate", SqlDbType.NVarChar) { Value = paymentSummaryObj.OverDueDate },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentSummaryBillData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static string GetPayerBillList(BillListFilter billFilter, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = billFilter.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = billFilter.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = billFilter.OrderBy },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                     new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                     new SqlParameter("@isRecurring", SqlDbType.Int) { Value = billFilter.IsRecurring },
                     new SqlParameter("@vendor", SqlDbType.Int) { Value = billFilter.VendorID },
                     new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value = billFilter.InvoiceNumber },
                     new SqlParameter("@dueFrom", SqlDbType.NVarChar) { Value = billFilter.DueDateFrom },
                     new SqlParameter("@dueTo", SqlDbType.NVarChar) { Value = billFilter.DueDateTo },
                     new SqlParameter("@dStatus", SqlDbType.Int) { Value = billFilter.Dstatus },
                     new SqlParameter("@kpiStatus", SqlDbType.Int) { Value =billFilter.KpiStatus},
                     new SqlParameter("@fromDate", SqlDbType.NVarChar) { Value = billFilter.DueFrom },
                     new SqlParameter("@toDate", SqlDbType.NVarChar) { Value = billFilter.DueTo },
                     new SqlParameter("@overDueDate", SqlDbType.NVarChar) { Value = billFilter.OverDueDate },
                      new SqlParameter("@createdDate", SqlDbType.NVarChar) { Value = billFilter.CreatedDate },
                       new SqlParameter("@paidDate", SqlDbType.NVarChar) { Value = billFilter.PaidDate },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPayerPaginateBillList", sqlParam, connection);

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

        public static int PayBillOffline(BillMarkAsPaid payDetails, string connection)
        {
            int postStatus = 1;
            try
            {


                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@billId",SqlDbType.Int) {Value=payDetails.BillId },
                     new SqlParameter("@billApprovedID",SqlDbType.Int) {Value=payDetails.ApproveBillId },
                      new SqlParameter("@paidBy",SqlDbType.Int) {Value=AccountID },
                       new SqlParameter("@amountPaid",SqlDbType.Float) {Value=payDetails.PaidAmount },
                        new SqlParameter("@amountDue",SqlDbType.Float) {Value=payDetails.DueAmount },
                         new SqlParameter("@payementMode",SqlDbType.NVarChar) {Value=payDetails.PaymentMode },
                          new SqlParameter("@paidRefID",SqlDbType.NVarChar) {Value=payDetails.ReferenceID },
                           new SqlParameter("@paidOn",SqlDbType.DateTime) {Value=payDetails.PaidOn },
                            new SqlParameter("@paymentType",SqlDbType.Int) {Value=payDetails.TypeOfPayment },
                            new SqlParameter("@clientID",SqlDbType.Int) {Value=ClientID }
                };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_MarkAsPaid", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Payment", "Marked Bill#" + " " + payDetails.InvoiceNo + " " + "as Paid", "Payment Summary", connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw ex;
            }
            return postStatus;
        }

        public static int InsrertPaidBillAttachments(BillMarkAsPaid payDetails, string connection)
        {
            int postStatus = 0;
            try
            {
                if (payDetails.AttachmentList.Count > 0)
                {
                    foreach (BillAttachments attachment in payDetails.AttachmentList)
                    {
                        int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                        SqlParameter[] sqlBillBreakageParameter =
                          {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = payDetails.BillId },
                                        new SqlParameter("@fileDisplayName", SqlDbType.NVarChar) { Value = attachment.FileName },
                                        new SqlParameter("@physicalFileName", SqlDbType.NVarChar) { Value = attachment.PhysicalFileName },
                                        new SqlParameter("@fileSize", SqlDbType.NVarChar) { Value = attachment.Size },
                                        new SqlParameter("@filePhysicalPath", SqlDbType.NVarChar) { Value = attachment.PhysicalPath },
                                        new SqlParameter("@extension", SqlDbType.NVarChar) { Value = attachment.Extension },
                                         new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                           new SqlParameter("@approvedBillID", SqlDbType.Int) { Value = payDetails.ApproveBillId },
                            };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertPaidBillDocuments", sqlBillBreakageParameter, connection);
                        postStatus = 2;
                        //DataTable dt = new DataTable();
                        //dt = GetEmailTempalte(connection, 610053);
                        //DataTable Dt = new DataTable();
                        //Dt = GetMakAspaid(connection, payDetails.BillId);
                        //List<ApplicationUser> lstReplacements = new List<ApplicationUser>();
                        //Email email = new Email();
                        //email.Host = Convert.ToString(ConfigurationManager.AppSettings["senderhostserver"]);
                        //email.Port = Convert.ToInt32(ConfigurationManager.AppSettings["senderhostserverport"]);
                        //email.Credentials = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                        //email.FromEmail = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                        //email.Password = Convert.ToString(ConfigurationManager.AppSettings["senderemailpassword"]);
                        //email.ToEmail = Dt.Rows[0]["PrimaryEmailID"].ToString();
                        //email.Body = dt.Rows[0]["Body"].ToString();
                        //email.Subject = dt.Rows[0]["Subject"].ToString();
                        //email.CCEmail = Dt.Rows[0]["Clerkmail"].ToString();
                        //email.Body = email.Body.Replace("{{paymentmode}}", Dt.Rows[0]["Value1"].ToString());
                        //email.Body = email.Body.Replace("{{paidon}}", Dt.Rows[0]["PaidOn"].ToString());
                        //email.Body = email.Body.Replace("{{refno}}", Dt.Rows[0]["BillNo"].ToString());
                        //email.Body = email.Body.Replace("{{amountpaid}}", Dt.Rows[0]["AmountPaid"].ToString());
                        //email.Body = email.Body.Replace("{{amountdue}}", Dt.Rows[0]["DueOn"].ToString());
                        //email.Body = email.Body.Replace("{{ToName}}", Dt.Rows[0]["User"].ToString());
                        //email.Body = email.Body.Replace("{{ billNo}}", Dt.Rows[0]["BillNo"].ToString());
                        //email.Body = email.Body.Replace("{{user}}", Dt.Rows[0]["User"].ToString());
                        //email.Body = email.Body.Replace("{{url}}", "");

                        //email.Subject = email.Subject.Replace("\r\n", "");
                        //MailTrigger(email);

                        
                    }
                }
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }
    }
}
