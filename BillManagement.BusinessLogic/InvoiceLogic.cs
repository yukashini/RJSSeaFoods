using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static BillManagement.BusinessLogic.CredentialLogics;


namespace BillManagement.BusinessLogic
{
   public class InvoiceLogic
    {
        public static string GetInvoiceList(InvoiceFilterfilter InvoiceList, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();

            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = InvoiceList.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = InvoiceList.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = InvoiceList.OrderBy },
                     new SqlParameter("@customerid", SqlDbType.NVarChar) { Value = InvoiceList.Customer },
                     new SqlParameter("@invoiceno", SqlDbType.NVarChar) { Value = InvoiceList.Invoice },
                     new SqlParameter("@clientID", SqlDbType.NVarChar) { Value = clientID },
                     new SqlParameter("@status", SqlDbType.NVarChar) { Value = InvoiceList.Status },
                     
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetInvoiceList", sqlParam, connection);
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
        public static DataSet GetInvoiceData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetInvoiceDataList", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetInvoiceEmaildetails", sqlParam, connection);

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
        public static string GetInvoInVoicRecurringdetails(string connection)
        {
            int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                
                SqlParameter[] sqlParam = {
                     new SqlParameter("@CliendId", SqlDbType.Int) { Value =ClientID },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRecurringmasterlist", sqlParam, connection);

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
        public static int Stoprecurring(int Invoiceid,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            int postStatus = 0;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                           new SqlParameter("@invoiceid", SqlDbType.Int) { Value = Invoiceid },
                           new SqlParameter("@clientid", SqlDbType.Int) { Value = Invoiceid },
                
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_StopRecurring", sqlParam, connection);
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
                postStatus = 0;
            }
            return postStatus;
        }
        public static int Editrecurring(int Invoiceid,string Recurringstartdate,string Recurringenddate,string Frequency, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            int postStatus = 0;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                           new SqlParameter("@invoiceid", SqlDbType.Int) { Value = Invoiceid },
                           new SqlParameter("@clientid", SqlDbType.Int) { Value = Invoiceid },
                           new SqlParameter("@startdate", SqlDbType.NVarChar) { Value = Recurringstartdate },
                           new SqlParameter("@enddate", SqlDbType.NVarChar) { Value = Recurringenddate },
                           new SqlParameter("@frequency", SqlDbType.NVarChar) { Value = Frequency },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateRecurringInvoice", sqlParam, connection);
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
                postStatus = 0;
            }
            return postStatus;
        }
        public static string GetTimelinelist(int billId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                SqlParameter[] sqlParam = {

                     new SqlParameter("@invoiceid", SqlDbType.Int) { Value =billId },

                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetTimeLineList", sqlParam, connection);

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
        public static DataSet GetInvoiceEmailDetails(int id, string connection)
        {
            try
            {
                var TemplateID = 0;
                TemplateID = Convert.ToInt32(id);
                SqlConnection _objSqlConnection = new SqlConnection(connection);
                SqlCommand cmd = new SqlCommand("SP_GetInvoiceEmaildetails", _objSqlConnection);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@invoiceid", TemplateID);

                SqlDataAdapter sda = new SqlDataAdapter(cmd);

                DataSet dt = new DataSet();
                sda.Fill(dt);
                return dt;

            }
            catch (SqlException Exception)
            {
                throw Exception;
            }

        }

        public static string MailReplacer(string tomail, string ccmail, string subject, string body, string invoice, string invoicedate, string total,int InvoiceId,string CustomerName,string Connection)
        {
           string PostStatus = "0";
            int Templateid = 0;
            try
            {
                DataSet ds = new DataSet();
                ds = InvoiceLogic.GetInvoiceEmailDetails(InvoiceId, Connection);
                DataTable subjectdt = ds.Tables[0];
                if(subjectdt.Rows[0]["BillStatus"].ToString() =="2")
                {
                    Templateid = 2001;
                }
                else
                {
                    Templateid = 2000;
                }
                DataTable Dt = new DataTable();
                Dt = CredentialLogics.GetInvoiceEmailTempalte(Connection, Templateid);
                List<ApplicationUser> lstReplacements = new List<ApplicationUser>();
               
                
                
                Email email = new Email();
                
                email.Host = Convert.ToString(ConfigurationManager.AppSettings["senderhostserver"]);
                email.Port = Convert.ToInt32(ConfigurationManager.AppSettings["senderhostserverport"]);
                email.Credentials = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                email.FromEmail = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                email.Password = Convert.ToString(ConfigurationManager.AppSettings["senderemailpassword"]);
                email.ToEmail = tomail;
                //  email.ToEmail = "echarles@innospire.com";
                if (ccmail != "" && ccmail != null)
                {
                    email.CCEmail = ccmail;
                }
                foreach (DataRow row in Dt.Rows)
                {
                    email.Body = row["Body"].ToString();
                }
                var url = Convert.ToString(ConfigurationManager.AppSettings["paynowurl"]) + "?_id=" + Convert.ToInt32(InvoiceId);
                DateTime date = Convert.ToDateTime(subjectdt.Rows[0]["Duedate"]);
                email.Subject = subject+ date.ToString("MM/dd/yyyy");

                DateTime duedate = Convert.ToDateTime(invoicedate);
                email.Body = email.Body.Replace("{{invoice}}", invoice);
                email.Body = email.Body.Replace("{{invoiceno}}", invoice);
                email.Body = email.Body.Replace("{{duedate}}", duedate.ToString("MM/dd/yyyy"));
                email.Body = email.Body.Replace("{{amount}}", total);
                email.Body = email.Body.Replace("{{customer}}", CustomerName);
                DataTable Details = ds.Tables[1];
                if (Details.Rows.Count > 0)
                {
                    email.Body = email.Body.Replace("{{description}}", Details.Rows[0]["Description"].ToString());
                }
                else
                {
                    email.Body = email.Body.Replace("{{description}}", "testing");
                }
                email.Body = email.Body.Replace("{{hrefurl}}", url);

                
                //foreach (DataRow row in Details.Rows)
                //{
                //    email.Body = email.Body.Replace("{{ordescription}}", row["Description"].ToString());
                //    email.Body = email.Body.Replace("{{unitprice}}", row["Price"].ToString());
                //    email.Body = email.Body.Replace("{{amt}}", row["Amount"].ToString());
                //}
                email.Body = email.Body.Replace("{{total}}", total);

                string tr = "";
                string strDetail = string.Empty;
                foreach (DataRow row in Details.Rows)
                {
                    strDetail = "<tr><td style='width: 30 % ; color:#888686;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px;   font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top'>" + row["Description"].ToString();// {{ordescription}}
                    strDetail += "</td><td style='width: 30 %; color:#888686;text-align:center;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top'>" + row["Price"].ToString(); //{{unitprice}}
                    strDetail += "</td><td style='width: 20 %; color:#888686;text-align:center;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top'>" +row["quantity"].ToString();// {{qty}}  
                    strDetail += "</td><td style='width: 20 %; color:#888686;text-align:right;font-size: 15px; border-top: 1px solid #cccccc; margin-bottom: 0px; line-height: 25px; font-family: Arial, Verdana, Helvetica, sans-serif;padding:7px;vertical-align:top'>" + row["Amount"].ToString();//  {{amt}}  
                    strDetail += "</td></tr>";

                    tr += strDetail;
                }


                email.Body = email.Body.Replace("{{OrdDetails}}", tr);


                //if (lstReplacements.Count > 0)
                //{
                //    foreach (EmailReplacement appuser in lstReplacements)
                //    {
                //        email.Body = email.Body.Replace(appuser.Replacer, appuser.ReplacementValue);
                //    }
                //}
                email.Subject = email.Subject.Replace("\r\n", "");
                MailTrigger(email,InvoiceId,Connection, Templateid);
                PostStatus = "1";
                return PostStatus;
                // }
                //else
                //{
                //    return PostStatus;
                //}
            }

            catch (Exception ex)
            {
                PostStatus = "0";
                throw;
            }

        }

        public static int MailTrigger(Email objEmail,int InvoiceId,string Connection ,int Templateid)
        {
            int status = 1;
            try
            {
                bool IsMail = Convert.ToBoolean(ConfigurationManager.AppSettings["SendEmail"]);
                //if (IsMail)
                //{
                MailMessage Msg = new MailMessage();
                var fromEmail = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                var SenderAliasName = Convert.ToString(ConfigurationManager.AppSettings["senderaliasname"]);
                Msg.From = new MailAddress(fromEmail);
                //Msg.From = new MailAddress(Convert.ToString(ConfigurationManager.AppSettings["senderemail"]));
                Msg.To.Add(new MailAddress(objEmail.ToEmail));
                // Msg.To.Add(new MailAddress("echarles@innospire.com"));
                if (objEmail.CCEmail != null && objEmail.CCEmail != "")
                {
                    Msg.CC.Add(new MailAddress(objEmail.CCEmail));
                }
                Msg.Subject = objEmail.Subject;
                Msg.IsBodyHtml = true;
                Msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(objEmail.Body, new System.Net.Mime.ContentType("text/html")));
                //Msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(objEmail.Subject, new System.Net.Mime.ContentType("text/html")));
                Msg.Body = objEmail.Body;
                SmtpClient smtp = new SmtpClient();
                NetworkCredential networkCredential = new NetworkCredential();
                smtp.Host = Convert.ToString(ConfigurationManager.AppSettings["senderhostserver"]);
                smtp.Port = Convert.ToInt32(ConfigurationManager.AppSettings["senderhostserverport"]);
                networkCredential.UserName = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                networkCredential.Password = Convert.ToString(ConfigurationManager.AppSettings["senderemailpassword"]);
                smtp.Credentials = networkCredential;
                //smtp.Credentials = new System.Net.NetworkCredential("noreply@archarena.com", "Iscmail@121");
                smtp.EnableSsl = true;
                smtp.Send(Msg);
                if(Templateid==2001)
                {
                    UpdateInvoiceStatus(InvoiceId, 2, Connection, "Payment Completed");
                }
                else
                {
                    UpdateInvoiceStatus(InvoiceId, 1, Connection, "Invoice Released");
                }
                

            }

            // }
            catch (Exception ex)
            {
                status = 0;
                throw;
            }
            finally
            {

            }
            return status;
        }

        public static int UpdateInvoiceStatus(int InvoiceId,int value, string connection,string Action)
        {
            int PostStatus = 0;
            //int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            try
            {
                
                SqlParameter[] sqlActionsParameter =
                                   {
                            
                                       new SqlParameter("@invoiceno", SqlDbType.Int) { Value = InvoiceId },
                                       new SqlParameter("@value", SqlDbType.Int) { Value = value },
                                       new SqlParameter("@userid", SqlDbType.Int) { Value = 0 },
                                       new SqlParameter("@actionname", SqlDbType.NVarChar) { Value = Action },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateInvoiceStaus", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int UpdatePaidInvoiceStatus(int InvoiceId, string connection)
        {
            int PostStatus = 0;

            try
            {

                SqlParameter[] sqlActionsParameter =
                                   {

                                       new SqlParameter("@invoiceid", SqlDbType.Int) { Value = InvoiceId },
                                      

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateOfflineInvoiceStaus", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static DataSet FetchBillDetails(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientid", SqlDbType.Int) { Value = ClientID },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GerOffLinePaymentlist", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
        public static int InsertPartialPaid(SavePartialObjects objPartial, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            int postStatus = 0;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@customerName", SqlDbType.NVarChar) { Value = objPartial.CustomerName },
                           new SqlParameter("@duedate", SqlDbType.NVarChar) { Value = objPartial.Duedate },
                           new SqlParameter("@paymentmode", SqlDbType.Int) { Value = objPartial.PaymentMode },
                           new SqlParameter("@refnumber", SqlDbType.NVarChar) { Value =objPartial.refNumber},
                           new SqlParameter("@balanveamont", SqlDbType.Decimal) { Value = objPartial.BalanceAmount},
                           new SqlParameter("@invoice", SqlDbType.NVarChar) { Value = objPartial.Invoice},
                           new SqlParameter("@payableamount", SqlDbType.Decimal) { Value = objPartial.PayableAmount},
                           new SqlParameter("@paidon", SqlDbType.NVarChar) { Value = objPartial.PaidOn},
                           new SqlParameter("@amountpaid", SqlDbType.Decimal) { Value = objPartial.AmountPaid},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                           new SqlParameter("@status", SqlDbType.Int) { Value = objPartial.Status },
                           new SqlParameter("@customerid", SqlDbType.Int) { Value = objPartial.CustomerId },
                           new SqlParameter("@invoiceno", SqlDbType.Int) { Value = objPartial.InvoiceId },
                           
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreatePartialPayment", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Payment", "Partial Paymentr" + " " + "Paid", "Invoice List", connection);
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
                postStatus = 0;
            }
            return postStatus;
        }
    }
}
