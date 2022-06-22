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
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BillManagement.BusinessLogic
{
  public  class CredentialLogics
    {
        public static int ChangeUserPassword(string oldPassWord,string newPassword, string connection)
        {
            int PostStatus = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                DataTable dtu = new DataTable();
                string query = string.Empty;

               

                SqlParameter[] sqlParam = {
                     new SqlParameter("@oldPassword", SqlDbType.NVarChar) { Value =oldPassWord },
                     new SqlParameter("@newPassword", SqlDbType.NVarChar) { Value = newPassword },
                     new SqlParameter("@userId", SqlDbType.Int) { Value = AccountID },
                     new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
                };
                PostStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_ChangePassword", sqlParam, connection);
                if (PostStatus > 1)
                {
                    query += @"
                    SELECT TOP 1 AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    ,PrimaryEmailID
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID= '" + AccountID + "' AND ClientID= '" + ClientID + "' ";

                    dtu = SqlQueryExecutor.ReadNoParams(query, connection);
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                      new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                };
                    // Send Email to user for their credentials
                    if (dtu.Rows.Count > 0)
                    {
                        DataTable dt = new DataTable();
                        Email email = new Email();
                        EmailInfo emailList = new EmailInfo();
                        //send template id as parameter
                        dt = GetEmailTempalte(connection, 610036);
                        foreach (DataRow row in dt.Rows)
                        {
                            email.Body = row["Body"].ToString();
                            email.Subject = row["Subject"].ToString();
                            emailList.UserName = Convert.ToString(dtu.Rows[0]["first_name"]);
                            emailList.PrimaryEmailId = Convert.ToString(dtu.Rows[0]["PrimaryEmailID"]);
                            emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                            emailList.StartDate = "";
                        }
                        var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        var reportFilterResults = MailReplacer(emailList, email, url, lstReplacementsValues);
                    }
                }
                
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw;
            }
            return PostStatus;
        }

        public static int ForgotuserPassword(string emailidpass, string connection)
        {
          //  emailidpass = "echarles@innospire.com";
            int Poststatus = 0;
            try
            {
                string query = string.Empty;
                DataTable dtu = new DataTable();

                query += @"
                    SELECT TOP 1 AccountID
                    ,[Firstname] as first_name
                    ,[Lastname] as last_name
                    FROM[dbo].[Tbl_Accounts] WHERE Username= '" + emailidpass.Trim() + "'";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);

                if (dtu.Rows.Count != 0)
                {
                    string Query = string.Empty;
                    Poststatus = 1;
                    //string Passcode = "password@123"; //GeneratePassword(6, 2);
                    string Passcode = GeneratePassword(6, 2);
                    Query += @"
                    IF EXISTS(SELECT * FROM [dbo].[Tbl_Accounts] WHERE UserName= '" + emailidpass.Trim() + @"') 
                    BEGIN
                    UPDATE [dbo].[Tbl_Accounts] SET [password]='" + Passcode + @"' , [IsForgotten]=1,IsPasswordReseted=0 WHERE Username = '" + emailidpass.Trim() + @"'
                    END";

                    Poststatus += SqlQueryExecutor.Write(Query, connection);

                    // Send Email to user for their credentials
                    if (emailidpass != null && emailidpass != "" && dtu.Rows.Count != 0)
                    {
                        DataTable dt = new DataTable();
                        Email email = new Email();
                        EmailInfo emailList = new EmailInfo();
                        dt = GetEmailTempalte(connection, 610032);
                        foreach (DataRow row in dt.Rows)
                        {
                            email.Body = row["Body"].ToString();
                            email.Subject = row["Subject"].ToString();
                            emailList.UserName = Convert.ToString(dtu.Rows[0]["first_name"]);
                            emailList.PrimaryEmailId = emailidpass;
                            emailList.ApproverName = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                            emailList.StartDate = Passcode;
                        }
                        var url = Convert.ToString(ConfigurationManager.AppSettings["url"]);
                        var reportFilterResults = UMailForAllAction(emailList, email, url);
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return Poststatus;
        }

        public static string GeneratePassword(int Length, int NonAlphaNumericChars)
        {
            string allowedChars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
            string allowedNonAlphaNum = "!@#$%^&*()_-+=[{]};:<>|./?";
            Random rd = new Random();

            if (NonAlphaNumericChars > Length || Length <= 0 || NonAlphaNumericChars < 0)
                throw new ArgumentOutOfRangeException();

            char[] pass = new char[Length];
            int[] pos = new int[Length];
            int i = 0, j = 0, temp = 0;
            bool flag = false;

            //Random the position values of the pos array for the string Pass
            while (i < Length - 1)
            {
                j = 0;
                flag = false;
                temp = rd.Next(0, Length);
                for (j = 0; j < Length; j++)
                    if (temp == pos[j])
                    {
                        flag = true;
                        j = Length;
                    }

                if (!flag)
                {
                    pos[i] = temp;
                    i++;
                }
            }

            //Random the AlphaNumericChars
            for (i = 0; i < Length - NonAlphaNumericChars; i++)
                pass[i] = allowedChars[rd.Next(0, allowedChars.Length)];

            //Random the NonAlphaNumericChars
            for (i = Length - NonAlphaNumericChars; i < Length; i++)
                pass[i] = allowedNonAlphaNum[rd.Next(0, allowedNonAlphaNum.Length)];

            //Set the sorted array values by the pos array for the rigth posistion
            char[] sorted = new char[Length];
            for (i = 0; i < Length; i++)
                sorted[i] = pass[pos[i]];

            string Pass = new String(sorted);

            return Pass;
        }

        public static DataTable GetEmailTempalte(string connection, int id)
        {
            try
            {
                var TemplateID = 0;
                TemplateID = Convert.ToInt32(id);
                SqlConnection _objSqlConnection = new SqlConnection(connection);
                SqlCommand cmd = new SqlCommand("SP_TE_GetEmailTemplate", _objSqlConnection);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmailTemplateID", TemplateID);

                SqlDataAdapter sda = new SqlDataAdapter(cmd);

                DataTable dt = new DataTable();
                sda.Fill(dt);
                return dt;

            }
            catch (SqlException Exception)
            {
                throw Exception;
            }

        }
        public static DataTable GetInvoiceEmailTempalte(string connection, int id)
        {
            try
            {
                var TemplateID = 0;
                TemplateID = Convert.ToInt32(id);
                SqlConnection _objSqlConnection = new SqlConnection(connection);
                SqlCommand cmd = new SqlCommand("SP_Getinvoiceemailtemplte", _objSqlConnection);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TempId", TemplateID);

                SqlDataAdapter sda = new SqlDataAdapter(cmd);

                DataTable dt = new DataTable();
                sda.Fill(dt);
                return dt;

            }
            catch (SqlException Exception)
            {
                throw Exception;
            }

        }
        public static DataTable GetMakAspaid(string connection, int billId)
        {
            try
            {
                var TemplateID = 0;
                TemplateID = Convert.ToInt32(billId);
                SqlConnection _objSqlConnection = new SqlConnection(connection);
                SqlCommand cmd = new SqlCommand("SP_GetMarkaspaid_Emaildetails", _objSqlConnection);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Billid", TemplateID);

                SqlDataAdapter sda = new SqlDataAdapter(cmd);

                DataTable dt = new DataTable();
                sda.Fill(dt);
                return dt;

            }
            catch (SqlException Exception)
            {
                throw Exception;
            }

        }

        public class EmailInfo
        {
            public string ApproverName { get; set; }
            public string UserName { get; set; }
            public string PrimaryEmailId { get; set; }
            public int TemplateID { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public float TotalHrs { get; set; }
            public float VacationHrs { get; set; }

        }

        public class Email
        {
            public string FromEmail { get; set; }
            public string ToEmail { get; set; }
            public string CCEmail { get; set; }
            public string Password { get; set; }
            public string Subject { get; set; }
            public string Body { get; set; }
            public string Host { get; set; }
            public int Port { get; set; }
            public string Credentials { get; set; }
        }

        public static int UMailForAllAction(EmailInfo emailList, Email objEmail, string url)
        {
            DataTable Dt = new DataTable();
            List<ApplicationUser> lstReplacements = new List<ApplicationUser>();
            //IList collection = (IList)emailList;
            if (Convert.ToInt32(ConfigurationManager.AppSettings["UseEmail"]) == 1)
            {
                Email email = new Email();
                email.Host = Convert.ToString(ConfigurationManager.AppSettings["senderhostserver"]);
                email.Port = Convert.ToInt32(ConfigurationManager.AppSettings["senderhostserverport"]);
                email.Credentials = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                email.FromEmail = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                email.Password = Convert.ToString(ConfigurationManager.AppSettings["senderemailpassword"]);
                email.ToEmail = emailList.PrimaryEmailId;
                email.Body = objEmail.Body;
                email.Subject = objEmail.Subject;
                email.Body = email.Body.Replace("{{approvername}}", emailList.ApproverName);
                email.Body = email.Body.Replace("{{username}}", emailList.UserName);
                email.Body = email.Body.Replace("{{password}}", emailList.StartDate);
                email.Body = email.Body.Replace("{{url}}", url);
                email.Subject = email.Subject.Replace("\r\n", "");
                MailTrigger(email);
                return 1;
            }
            else
            {
                return 1;
            }
        }

        public static int MailReplacer(EmailInfo emailList, Email objEmail, string url, List<EmailReplacement> lstReplacements)
        {
            int PostStatus = 0;
            try
            {
                DataTable Dt = new DataTable();
                //IList collection = (IList)emailList;
                if (Convert.ToInt32(ConfigurationManager.AppSettings["UseEmail"]) == 1)
                {
                    Email email = new Email();
                    email.Host = Convert.ToString(ConfigurationManager.AppSettings["senderhostserver"]);
                    email.Port = Convert.ToInt32(ConfigurationManager.AppSettings["senderhostserverport"]);
                    email.Credentials = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                    email.FromEmail = Convert.ToString(ConfigurationManager.AppSettings["senderemail"]);
                    email.Password = Convert.ToString(ConfigurationManager.AppSettings["senderemailpassword"]);
                    email.ToEmail = emailList.PrimaryEmailId;
                    //  email.ToEmail = "echarles@innospire.com";
                    if (objEmail.CCEmail != "" && objEmail != null)
                    {
                        email.CCEmail = objEmail.CCEmail;
                    }
                    email.Body = objEmail.Body;
                    email.Subject = objEmail.Subject;
                    if (lstReplacements.Count > 0)
                    {
                        foreach (EmailReplacement appuser in lstReplacements)
                        {
                            email.Body = email.Body.Replace(appuser.Replacer, appuser.ReplacementValue);
                        }
                    }
                    email.Subject = email.Subject.Replace("\r\n", "");
                    MailTrigger(email);
                    PostStatus = 1;
                    return PostStatus;
                }
                else
                {
                    return PostStatus;
                }

            }
            catch(Exception ex)
            {
                PostStatus = 0;
                throw;
            }
            
   }

        public static int MailTrigger(Email objEmail)
        {
            int status = 1;
            try
            {
                bool IsMail = Convert.ToBoolean(ConfigurationManager.AppSettings["SendEmail"]);
                if (IsMail)
                {
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
                }
               
            }
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

    }
}
