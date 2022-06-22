using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using ISCLibrary.DataAccessLayer;
using ISCLibrary.Utilities;
using BillManagement.BussinessObjects;
using System.Configuration;
using static BillManagement.BusinessLogic.CredentialLogics;

namespace BillManagement.BusinessLogic
{
    public class BillUpload
    {
        private static object dtu;

        public static DataSet GetMasterDetailsData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                    new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID } };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUploadBill_FilterList", sqlParam, connection);

            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int BillInsert(List<Bill_Custom_Breakage> CustomBill,string connection)
        {
            int PostStatus = 0;
            int billID = 0;
            try
            {
                string billDirectory = Convert.ToString(ConfigurationManager.AppSettings["BillLocationDirectory"]);
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (CustomBill.Count > 0)
                {
                    foreach(Bill_Custom_Breakage _bill in CustomBill)
                    {
                        SqlParameter[] sqlParameters = {
                            new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = _bill.VendorName },
                            new SqlParameter("@billDate", SqlDbType.DateTime) { Value = _bill.BillDate },
                            new SqlParameter("@amount", SqlDbType.Float) { Value = _bill.Amount },
                            new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value = _bill.InvoiceNumber },
                            new SqlParameter("@dueDate", SqlDbType.DateTime) { Value = _bill.DueDate },
                            new SqlParameter("@category", SqlDbType.Int) { Value = _bill.Category },
                            new SqlParameter("@notes", SqlDbType.NVarChar) { Value = _bill.Notes },
                            new SqlParameter("@paymentTerms", SqlDbType.Int) { Value = _bill.PaymentTerms },
                            new SqlParameter("@description", SqlDbType.NVarChar) { Value = _bill.Description },
                            new SqlParameter("@isSplited", SqlDbType.Int) { Value = _bill.IsSplitted },
                            new SqlParameter("@status", SqlDbType.Int) { Value = _bill.Status },
                            new SqlParameter("@accountId", SqlDbType.Int) { Value =AccountID },
                            new SqlParameter("@clientId", SqlDbType.Int) { Value =ClientID },
                            new SqlParameter("@fileDiaplayName", SqlDbType.NVarChar) { Value =_bill.FileDisplayName },
                            new SqlParameter("@PhysicalLocation", SqlDbType.NVarChar) { Value =_bill.PhysicalLocation },
                            new SqlParameter("@fileSize", SqlDbType.Int) { Value =_bill.FileSize },
                             new SqlParameter("@fileName", SqlDbType.NVarChar) { Value =_bill.FileName },
                           new SqlParameter("@balance", SqlDbType.Float) { Value =_bill.Balance },
                             new SqlParameter("@purchaseOreder", SqlDbType.NVarChar) { Value =_bill.PurchaseOrder },
                              new SqlParameter("@customer", SqlDbType.NVarChar) { Value =_bill.Customer },
                               new SqlParameter("@project", SqlDbType.NVarChar) { Value =_bill.Project },
                            new SqlParameter("@RetVal", SqlDbType.Int) { Value = 0 },
                         
                    };
                        billID = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertBill", sqlParameters, connection);

                        if (_bill.lstBillBreakage.Count > 0 && billID != 0) ;
                            {
                                foreach (BillBreakage splitedBill in _bill.lstBillBreakage)
                                {
                                    SqlParameter[] sqlBillBreakageParameter =
                                       {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = billID },
                                        new SqlParameter("@amount", SqlDbType.Float) { Value = splitedBill.Amount },
                                        new SqlParameter("@description", SqlDbType.NVarChar) { Value = splitedBill.Description },
                                        new SqlParameter("@billType", SqlDbType.Int) { Value = splitedBill.BillType },
                                        new SqlParameter("@status", SqlDbType.Int) { Value = splitedBill.Status },
                                        new SqlParameter("@acconutId", SqlDbType.Int) { Value = AccountID },

                            };
                                    PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_Insert_BillBreakage", sqlBillBreakageParameter, connection);
                                }
                            }
                           
                    }
                  
                } 
            }
            catch (Exception ex)
            {

            }
            return billID;
        }

        public static DataSet GetPendingSubmissionBills(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                    new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID } };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUserBillsInPendingSubmission", sqlParam, connection);
            }
            catch(Exception ex)
            {

            }
            return ds;
        }

        public static DataSet GetEditBillData(int billID,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                    new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },
                 new SqlParameter("@billID", SqlDbType.Int) { Value = billID }};
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillEditDetails", sqlParam, connection);
            }
            catch(Exception ex)
            {

            }
            return ds;

        }

        public static int BillEdit(List<Bill_Custom_Breakage> CustomBill, string connection)
        {
            int PostStatus = 0;
            int billID = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (CustomBill.Count > 0)
                {


                    foreach (Bill_Custom_Breakage _bill in CustomBill)
                    {
                        SqlParameter[] sqlParameters = {
                            new SqlParameter("@billId", SqlDbType.Int) { Value =  _bill.BillID },
                            new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = _bill.VendorName },
                            new SqlParameter("@billDate", SqlDbType.DateTime) { Value = _bill.BillDate },
                            new SqlParameter("@amount", SqlDbType.Float) { Value = _bill.Amount },
                            new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value = _bill.InvoiceNumber },
                            new SqlParameter("@dueDate", SqlDbType.DateTime) { Value = _bill.DueDate },
                            new SqlParameter("@category", SqlDbType.Int) { Value = _bill.Category },
                            new SqlParameter("@notes", SqlDbType.NVarChar) { Value = _bill.Notes },
                            new SqlParameter("@paymentTerms", SqlDbType.Int) { Value = _bill.PaymentTerms },
                            new SqlParameter("@description", SqlDbType.NVarChar) { Value = _bill.Description },
                            new SqlParameter("@isSplited", SqlDbType.Int) { Value = _bill.IsSplitted },
                            new SqlParameter("@status", SqlDbType.Int) { Value = _bill.Status },
                            new SqlParameter("@accountId", SqlDbType.Int) { Value =AccountID },
                            new SqlParameter("@clientId", SqlDbType.Int) { Value =ClientID },
                             new SqlParameter("@fileSize", SqlDbType.Int) { Value =_bill.FileSize },
                              new SqlParameter("@fileDisplayName", SqlDbType.NVarChar) { Value =_bill.FileDisplayName },
                               new SqlParameter("@PhysicalLocation", SqlDbType.NVarChar) { Value =_bill.PhysicalLocation },
                              new SqlParameter("@fileName", SqlDbType.NVarChar) { Value =_bill.FileName },
                              new SqlParameter("@balance", SqlDbType.Float) { Value =_bill.Balance },
                             new SqlParameter("@purchaseOreder", SqlDbType.NVarChar) { Value =_bill.PurchaseOrder },
                                  new SqlParameter("@customer", SqlDbType.NVarChar) { Value =_bill.Customer },
                               new SqlParameter("@project", SqlDbType.NVarChar) { Value =_bill.Project },

                        };
                        PostStatus= SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateBill", sqlParameters, connection);

                        if (_bill.lstBillBreakage.Count > 0) 
                        {
                            foreach (BillBreakage splitedBill in _bill.lstBillBreakage)
                            {
                                SqlParameter[] sqlBillBreakageParameter =
                                   {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = _bill.BillID },
                                        new SqlParameter("@billBreakageId", SqlDbType.Int) { Value = splitedBill.BillBreakageID },
                                        new SqlParameter("@amount", SqlDbType.Float) { Value = splitedBill.Amount },
                                        new SqlParameter("@description", SqlDbType.NVarChar) { Value = splitedBill.Description },
                                        new SqlParameter("@billType", SqlDbType.Int) { Value = splitedBill.BillType },
                                        new SqlParameter("@status", SqlDbType.Int) { Value = splitedBill.Status },
                                        new SqlParameter("@acconutId", SqlDbType.Int) { Value = AccountID },
                                         new SqlParameter("@actionKey", SqlDbType.Int) { Value = splitedBill.ActionKey }
                            };
                                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_Update_BillBreakage", sqlBillBreakageParameter, connection);
                            }
                        }

                    }

                }
            }
            catch (Exception ex)
            {

            }
            return PostStatus;
        }

       public static int DeleteUserBill(int billId,string Invoiceno,string connection)
        {
            int postStatus = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                    new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },
                    new SqlParameter("@billID", SqlDbType.Int) { Value = billId }};
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteUserBill", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Delete", "Deleted Bill# " + " " + Invoiceno + "", "Bills", connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static DataSet GetAttachment(int billId,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@ClientId", SqlDbType.Int) { Value = ClientID },
                    new SqlParameter("@AccountId", SqlDbType.Int) { Value = AccountID },
                 new SqlParameter("@billId", SqlDbType.Int) { Value = billId }};
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillAttatchmentDetails", sqlParam, connection);
            }
            catch(Exception ex)
            {

            }
            return ds;
        }

        public static DataSet GetCreateBillMasterDetailsData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                 };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateBillMasterData", sqlParam, connection);

            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int CreateNewBill(CustomBill bill, string connection)
        {
            int postStatus = 0;
            int billId = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParameters = {
                               new SqlParameter("@accountId", SqlDbType.Int) { Value = AccountID },
                               new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID},
                               new SqlParameter("@vendorId", SqlDbType.Int) { Value = bill.VendorID},
                               new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value =bill.InvoiceNumber  },
                               new SqlParameter("@billDesc", SqlDbType.NVarChar) { Value = bill.Description },
                               new SqlParameter("@paymentTerm", SqlDbType.Int) { Value = bill.PaymentTerms},
                                new SqlParameter("@status", SqlDbType.Int) { Value = bill.Status},
                               new SqlParameter("@invoiceDate", SqlDbType.DateTime) { Value =bill.BillDate },
                               new SqlParameter("@dueDate", SqlDbType.DateTime) { Value = bill.DueDate },
                               new SqlParameter("@amount", SqlDbType.Float) { Value = bill.Amount },
                               new SqlParameter("@fileName", SqlDbType.NVarChar) { Value = bill.FileName },
                               new SqlParameter("@fileDisplayName", SqlDbType.NVarChar) { Value = bill.FileDisplayName },
                               new SqlParameter("@fileSize", SqlDbType.Float) { Value = bill.FileSize },
                               new SqlParameter("@physicalLocation", SqlDbType.NVarChar) { Value = bill.PhysicalLocation },
                               new SqlParameter("@isAutoApproval", SqlDbType.Int) { Value = bill.IsAutoApproval },
                               new SqlParameter("@isRecurring", SqlDbType.Int) { Value = bill.IsRecurring },
                               new SqlParameter("@isReminder", SqlDbType.Int) { Value = bill.IsReminder },
                               new SqlParameter("@reminderEmail", SqlDbType.NVarChar) { Value = bill.ReminderEmail },
                               new SqlParameter("@reminderInterval", SqlDbType.Int) { Value = bill.ReminderInterval },
                               new SqlParameter("@reminderIntervalDay", SqlDbType.NVarChar) { Value = bill.ReminderIntervalDay },
                               new SqlParameter("@isSplitted", SqlDbType.NVarChar) { Value = bill.IsSplitted },
                               new SqlParameter("@recurrenceFrequency", SqlDbType.Int) { Value = bill.RecurrenceFrequency },
                               new SqlParameter("@recurrenceStartDate", SqlDbType.DateTime) { Value = bill.RecurrenceStartDate },
                               new SqlParameter("@recurrenceEndDate", SqlDbType.DateTime) { Value = bill.RecurrenceEndDate },
                               new SqlParameter("@recurrenceBatchNumber", SqlDbType.NVarChar) { Value = bill.RecurrenceBatchNumber },
                                new SqlParameter("@comment", SqlDbType.NVarChar) { Value = bill.Comment },
                                new SqlParameter("@customer", SqlDbType.Int) { Value = bill.Customer },
                                new SqlParameter("@project", SqlDbType.Int) { Value = bill.Project },
                                new SqlParameter("@category", SqlDbType.Int) { Value = bill.BillCategory },
                               new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },};
                            billId = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateNewBill", sqlParameters, connection);
                     
                    if(billId!=0 && bill.lstBillDescription.Count>0)
                {
                    postStatus = InsertBillDescriptions(bill.lstBillDescription, billId, connection);
                }
                    if(billId!=0 && bill.lstBillBreakage.Count > 0)
                {
                    postStatus = InsertBillBreakage(bill.lstBillBreakage, billId, connection);
                }

                if (billId != 0 && bill.lstBillAttchments.Count > 0)
                {
                    postStatus = InsrertBillAttachments(bill.lstBillAttchments, billId, connection);
                }
                if (billId != 0 && bill.lstBillNotes.Count > 0)
                {
                    postStatus = InsrertBillNotes(bill.lstBillNotes, billId, connection);
                }
                if (billId != 0 && bill.lstApprovers.Count > 0) 

                {
                    postStatus = InsrertBillApprovers(bill.lstApprovers, billId, connection);
                }

                if(billId!=0&& bill.Status == 50016 && bill.lstApprovers.Count > 0)
                {
                    //Send Email to Approver
                    postStatus = SendEmailtoApprover(bill.lstApprovers,bill,ClientID,connection);
                }
                if (billId != 0 && bill.Status == 50015 && bill.IsAutoApproval == 1) 
                {
                    //Send Email to Payer
                    postStatus = SendEmailtoPayer(bill.lstApprovers, bill, ClientID, connection);
                }
                if (billId != 0 && bill.Status == 50016)
                {
                   int PostStatus = ApplicationUsers.InsertAuditlog("Submitted", "Bill# " + " " + bill.InvoiceNumber + " "+ "Submitted to Approver", "Bills", connection);
                }
                else if(billId != 0 && bill.Status == 50019)
                {
                    int PostStatus = ApplicationUsers.InsertAuditlog("Created", "Uploaded New Bill# " + " " + bill.InvoiceNumber + "", "Bills", connection);
                }
            }
            catch (Exception ex)
            {
                billId = 0;
            }
            return billId;
        }

        public static int InsertBillDescriptions(List<BillDescription> billDescriptions,int billId,string connection)
        {
            int postStatus = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (billDescriptions.Count > 0)
                {
                    foreach(BillDescription bill in billDescriptions)
                    {

                        SqlParameter[] sqlParameters = {
                                  new SqlParameter("@accountId", SqlDbType.Int) {Value=AccountID  },
                                  new SqlParameter("@billID", SqlDbType.Int) {Value=billId  },
                                  new SqlParameter("@rate", SqlDbType.Float) { Value=bill.Rate },
                                  new SqlParameter("@quantity", SqlDbType.Int) { Value=bill.Quantity },
                                  new SqlParameter("@total", SqlDbType.Float) { Value=bill.Total },
                                  new SqlParameter("@description", SqlDbType.NVarChar) { Value = bill.Description },};
                        postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertBillDescription", sqlParameters, connection);

                    }
                }
            }
            catch(Exception ex)
            {
                throw;
            }
            return postStatus;
        }

        public static int InsertBillBreakage(List<BillBreakage> billBreakages,int billId,string connection)
        {
            int postStatus = 0;
            try
            {
                if (billBreakages.Count > 0)
                {
                    int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                    int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                    foreach (BillBreakage splitedBill in billBreakages)
                    {
                        SqlParameter[] sqlBillBreakageParameter =
                           {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = billId },
                                        new SqlParameter("@amount", SqlDbType.Float) { Value = splitedBill.Amount },
                                        new SqlParameter("@description", SqlDbType.NVarChar) { Value = splitedBill.Description },
                                        new SqlParameter("@billType", SqlDbType.NVarChar) { Value = splitedBill.AccountName },
                                        new SqlParameter("@status", SqlDbType.Int) { Value = splitedBill.Status },
                                        new SqlParameter("@glIdentityId", SqlDbType.Int) { Value = splitedBill.GLAccountID },
                                        new SqlParameter("@acconutId", SqlDbType.Int) { Value = AccountID },
                            };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_Insert_BillBreakage", sqlBillBreakageParameter, connection);
                    }
                }
            }

            catch (Exception ex)
            {
                throw;
            }
            return postStatus;
                 
        }

        public static int InsrertBillAttachments(List<BillAttachments> billAttachments, int billId, string connection)
        {
            int postStatus = 0;
            try
            {
                if (billAttachments.Count > 0)
                {
                    foreach(BillAttachments attachment in billAttachments)
                    {
                        int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                        SqlParameter[] sqlBillBreakageParameter =
                          {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = billId },
                                        new SqlParameter("@fileDisplayName", SqlDbType.NVarChar) { Value = attachment.FileName },
                                        new SqlParameter("@physicalFileName", SqlDbType.NVarChar) { Value = attachment.PhysicalFileName },
                                        new SqlParameter("@fileSize", SqlDbType.NVarChar) { Value = attachment.Size },
                                        new SqlParameter("@filePhysicalPath", SqlDbType.NVarChar) { Value = attachment.PhysicalPath },
                                        new SqlParameter("@extension", SqlDbType.NVarChar) { Value = attachment.Extension },
                                         new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                           new SqlParameter("@isBillFile", SqlDbType.Int) { Value = attachment.IsBillFile },
                            };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertBillDocuments", sqlBillBreakageParameter, connection);
                    }
                }
            }
            catch(Exception ex)
            {
                throw;
            }
            return postStatus;
        }

        public static int InsrertBillNotes(List<BillComments> billNotes, int billId, string connection)
        {
            int postStatus = 0;
            try
            {
                if (billNotes.Count > 0)
                {
                    foreach (BillComments notes in billNotes)
                    {
                        int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                        SqlParameter[] sqlBillBreakageParameter =
                          {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = billId },
                                         new SqlParameter("@comment", SqlDbType.NVarChar) { Value = notes.Comment },
                                         new SqlParameter("@commentOn", SqlDbType.NVarChar) { Value = notes.CommentOn },
                                         new SqlParameter("@commentBy", SqlDbType.Int) { Value = AccountID },
                                        
                            };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertBillComments", sqlBillBreakageParameter, connection);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return postStatus;
        }

        public static int InsrertBillApprovers(List<BillApprovalStage> billApprovers, int billId, string connection)
        {
            int postStatus = 0;
            try
            {
                if (billApprovers.Count > 0)
                {
                    foreach (BillApprovalStage approver in billApprovers)
                    {
                        int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                        SqlParameter[] sqlBillBreakageParameter =
                          {
                                         new SqlParameter("@billId", SqlDbType.Int) { Value = billId },
                                         new SqlParameter("@approverID", SqlDbType.NVarChar) { Value = approver.ApproverID },
                                         new SqlParameter("@sequence", SqlDbType.NVarChar) { Value = approver.Sequence },
                                         new SqlParameter("@stageInitiated", SqlDbType.Int) { Value = approver.StageInitiated },
                                         new SqlParameter("@currentStageApproval", SqlDbType.Int) { Value = approver.CurrentStageApproval },
                                         new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },

                            };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertApprovers", sqlBillBreakageParameter, connection);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return postStatus;
        }

        public static DataSet FetchBillEditData(int billId, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                      new SqlParameter("@billID", SqlDbType.Int) { Value = billId },
                        new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },
                 };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUpdateBillDetails", sqlParam, connection);

            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int UpdateBillDetails(CustomBill bill, string connection)
        {
            int postStatus = 0;
            int billId = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParameters = {
                               new SqlParameter("@accountId", SqlDbType.Int) { Value = AccountID },
                               new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID},
                               new SqlParameter("@vendorId", SqlDbType.Int) { Value = bill.VendorID},
                               new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value =bill.InvoiceNumber  },
                               new SqlParameter("@billDesc", SqlDbType.NVarChar) { Value = bill.Description },
                               new SqlParameter("@paymentTerm", SqlDbType.Int) { Value = bill.PaymentTerms},
                                new SqlParameter("@status", SqlDbType.Int) { Value = bill.Status},
                               new SqlParameter("@invoiceDate", SqlDbType.DateTime) { Value =bill.BillDate },
                               new SqlParameter("@dueDate", SqlDbType.DateTime) { Value = bill.DueDate },
                               new SqlParameter("@amount", SqlDbType.Float) { Value = bill.Amount },
                               new SqlParameter("@fileName", SqlDbType.NVarChar) { Value = bill.FileName },
                               new SqlParameter("@fileDisplayName", SqlDbType.NVarChar) { Value = bill.FileDisplayName },
                               new SqlParameter("@fileSize", SqlDbType.Float) { Value = bill.FileSize },
                               new SqlParameter("@physicalLocation", SqlDbType.NVarChar) { Value = bill.PhysicalLocation },
                               new SqlParameter("@isAutoApproval", SqlDbType.Int) { Value = bill.IsAutoApproval },
                               new SqlParameter("@isRecurring", SqlDbType.Int) { Value = bill.IsRecurring },
                               new SqlParameter("@isReminder", SqlDbType.Int) { Value = bill.IsReminder },
                               new SqlParameter("@reminderEmail", SqlDbType.NVarChar) { Value = bill.ReminderEmail },
                               new SqlParameter("@reminderInterval", SqlDbType.Int) { Value = bill.ReminderInterval },
                               new SqlParameter("@reminderIntervalDay", SqlDbType.NVarChar) { Value = bill.ReminderIntervalDay },
                               new SqlParameter("@isSplitted", SqlDbType.NVarChar) { Value = bill.IsSplitted },
                               new SqlParameter("@recurrneceEndDate", SqlDbType.DateTime) { Value = bill.RecurrenceEndDate },
                               new SqlParameter("@batchNumber", SqlDbType.Int) { Value = bill.RecurrenceBatchNumber },
                               new SqlParameter("@isApplyToAll", SqlDbType.Int) { Value = bill.IsApplyToAll },
                                new SqlParameter("@comment", SqlDbType.NVarChar) { Value = bill.Comment },
                                   new SqlParameter("@customer", SqlDbType.Int) { Value = bill.Customer },
                                new SqlParameter("@project", SqlDbType.Int) { Value = bill.Project },
                                 new SqlParameter("@category", SqlDbType.Int) { Value = bill.BillCategory },
                    new SqlParameter("@billId", SqlDbType.Int) { Value = bill.BillID },};
                billId = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateBillDetails", sqlParameters, connection);

                if (bill.BillID != 0 && bill.lstBillDescription.Count > 0)
                {
                    postStatus = InsertBillDescriptions(bill.lstBillDescription, bill.BillID, connection);
                }
                if (bill.BillID != 0 && bill.lstBillBreakage.Count > 0)
                {
                    postStatus = InsertBillBreakage(bill.lstBillBreakage, bill.BillID, connection);
                }
                if (bill.BillID != 0 && bill.lstBillAttchments.Count > 0)
                {
                    postStatus = InsrertBillAttachments(bill.lstBillAttchments, bill.BillID, connection);
                }
                if (bill.BillID != 0 && bill.lstBillNotes.Count > 0)
                {
                    postStatus = InsrertBillNotes(bill.lstBillNotes, bill.BillID, connection);
                }
                if (bill.BillID != 0 && bill.lstApprovers.Count > 0)
                {
                    postStatus = InsrertBillApprovers(bill.lstApprovers, bill.BillID, connection);
                }
                if (bill.BillID != 0 && bill.Status == 50016 && bill.lstApprovers.Count > 0)
                {
                    //Send Email to Approver
                    postStatus = SendEmailtoApprover(bill.lstApprovers, bill, ClientID, connection);
                }
                if (bill.BillID != 0 && bill.Status == 50015 && bill.IsAutoApproval == 1)
                {
                    //Send Email to Approver
                    postStatus = SendEmailtoPayer(bill.lstApprovers, bill, ClientID, connection);
                }
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Edited Bill# " + " " + bill.InvoiceNumber + "", "Bills", connection);

            }
            catch (Exception ex)
            {
                billId = 0;
            }
            return billId;
        }

        public static int SendEmailtoApprover(List<BillApprovalStage> billApprovers,CustomBill bill,int clientID,string connection)
        {
            int postStatus = 0;
            try {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                query += @"
                    SELECT TOP 1 AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    ,PrimaryEmailID
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID= '" + billApprovers[0].ApproverID + "' AND ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);

                EmailReplacement Replacements = new EmailReplacement();
                List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                      new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                       new EmailReplacement { Replacer = "{{ClerkName}}", ReplacementValue = bill.ClerkName},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = bill.InvoiceNumber},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter
                    dt = GetEmailTempalte(connection, 610037);
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
                }
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static int SendEmailtoPayer(List<BillApprovalStage> billApprovers, CustomBill bill, int clientID, string connection)
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
                    WHERE A.ClientID="+clientID+" AND D.EntityID=2002 AND A.ApplicationRole !=1005";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);
                
                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                    {
                      new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                      //new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = "Ravishankar"},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["FirstName"]==null?"":dtu.Rows[0]["FirstName"])},
                       new EmailReplacement { Replacer = "{{ClerkName}}", ReplacementValue = bill.ClerkName},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = bill.InvoiceNumber},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                    };

                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter
                    dt = GetEmailTempalte(connection, 610038);
                    foreach (DataRow row in dt.Rows)
                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                       // emailList.UserName = "Ravi";
                         emailList.UserName = Convert.ToString(dtu.Rows[0]["FirstName"]==null?"":dtu.Rows[0]["FirstName"]);
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
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static string FetchVendors(string vendorName, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = vendorName },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetVendors", sqlParam, connection);

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

        public static string FetchCustomizedVendors(ConfiguredApprovers objApprovers, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@isVendor", SqlDbType.Int) { Value = objApprovers.IsVendor },
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = objApprovers.VendorID },
                    new SqlParameter("@amount", SqlDbType.Float) { Value = objApprovers.Amount },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetConfiguredApprovers", sqlParam, connection);

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
