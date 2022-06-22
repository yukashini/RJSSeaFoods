using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Security.Cryptography;
using System.IO;
using System.Net.Mime;
using System.DirectoryServices;
using System.Data;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using System.Threading;
using System.Reflection;
using System.ComponentModel;

namespace ISCLibrary.Utilities
{
    public class Utilities
    {
        #region Send Email
        /* 
         * SendEmail
         * To(s), From,cc(s),password, SMTP -smtp.1and1.com, port-25, Subject, Attached file(s), HTmlparsed body / Text body
          */
        /// <summary>
        /// Send email to recipients with Attachment is exists
        /// </summary>
        /// 
        public static int SendEmail(string fromEmail, string toEmail, string ccEmails, string subject, string body, string attachments, string password, string host, int port, string inlineLogoPath)
        {
            int status = 0;
            try
            {
                string EmailAuthentication = Convert.ToString(ConfigurationManager.AppSettings["emailauthentication"]);
                string SenderAliasName = Convert.ToString(ConfigurationManager.AppSettings["senderaliasname"]);
                bool _UseCredentialDefault = Convert.ToBoolean(ConfigurationManager.AppSettings["usecredentialdefault"]);
                bool _SSL = Convert.ToBoolean(ConfigurationManager.AppSettings["enablessl"]);

                MailMessage mailMessage = null;
                SmtpClient smtp = null;
                NetworkCredential networkCredential = null;
                var contentID = "Image";
                var inlineLogo = new Attachment(inlineLogoPath);
                inlineLogo.ContentId = contentID;
                inlineLogo.ContentDisposition.Inline = true;
                inlineLogo.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
                //<img align="center" alt="" width="242" style="max-width: 242px; padding-bottom: 0px; vertical-align: bottom; border: 0px; height: auto; outline: none; text-decoration: none; display: inline !important; user-select: none;" alt='CP Logo ' src=\"cid:" + contentID + "\">
                body = body.Replace("{{@headerlogo@}}", "<img align='center' width='242' style='max-width: 242px; padding-bottom: 0px; vertical-align: bottom; border: 0px; height: auto; outline: none; text-decoration: none; display: inline !important; user-select: none;' alt='Logo' src=\"cid:" + contentID + "\">");

                //Creating the object of mail message
                mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(fromEmail, SenderAliasName); //From Email Id
                mailMessage.Subject = subject; //Subject of Email
                mailMessage.Body = body; //body or message of Email
                mailMessage.IsBodyHtml = true;


                //Add multiple attachments to mail message
                if (attachments.Trim() != "")
                {
                    string[] multiAttachments = attachments.Split(',');
                    foreach (string attachment in multiAttachments)
                    {
                        mailMessage.Attachments.Add(new Attachment(attachment)); //Adding multiple attachments
                    }
                }
                if (inlineLogoPath != string.Empty || inlineLogoPath != "")
                    mailMessage.Attachments.Add(inlineLogo);
                //Add multiple ToEmailIds to mail message
                if (toEmail.Trim() != "")
                {
                    string[] toMultiEmail = toEmail.Split(',');
                    foreach (string toEmailId in toMultiEmail)
                    {
                        mailMessage.To.Add(new MailAddress(toEmailId)); //adding multiple TO Email Id
                    }
                }

                //Add multiple CCEmailIds to mail message
                if (ccEmails.Trim() != "")
                {
                    string[] multiCCEmailIds = ccEmails.Split(',');
                    foreach (string ccEmailId in multiCCEmailIds)
                    {
                        mailMessage.CC.Add(new MailAddress(ccEmailId)); //Adding Multiple CC email Id
                    }
                }

                // Creating object of SMTP client
                smtp = new SmtpClient();
                smtp.Host = host;  //host of email address for example smtp.gmail.com etc
                smtp.Port = port;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                //Network and security related credentials
                if (EmailAuthentication == "true")
                {

                    smtp.EnableSsl = _SSL;
                    smtp.UseDefaultCredentials = _UseCredentialDefault;
                    networkCredential = new NetworkCredential();
                    networkCredential.UserName = mailMessage.From.Address;
                    networkCredential.Password = password;
                    smtp.Credentials = networkCredential;

                }
                else
                {
                    smtp.UseDefaultCredentials = _UseCredentialDefault;
                }

                //Send Email

                smtp.Send(mailMessage);

                status = 1;
            }
            catch (Exception ex)
            {
                Utilities.LogException(ex, Convert.ToString(ex.InnerException), Convert.ToString(ConfigurationManager.AppSettings["LogFile"]));
            }
            finally
            {

            }
            return status;
        }

        #endregion

        #region Encrypt / Decrypt

        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        #endregion

        #region Handel Exception

        public static void LogException(Exception exc, string source, string logfile)
        {
            try
            {
                StreamWriter sw = new StreamWriter(logfile, true);
                sw.WriteLine("********** {0} **********", DateTime.Now);
                if (exc.InnerException != null)
                {
                    sw.Write("Inner Exception Type: ");
                    sw.WriteLine(exc.InnerException.GetType().ToString());
                    sw.Write("Inner Exception: ");
                    sw.WriteLine(exc.InnerException.Message);
                    sw.Write("Inner Source: ");
                    sw.WriteLine(exc.InnerException.Source);
                    if (exc.InnerException.StackTrace != null)
                    {
                        sw.WriteLine("Inner Stack Trace: ");
                        sw.WriteLine(exc.InnerException.StackTrace);
                    }
                }
                sw.Write("Exception Type: ");
                sw.WriteLine(exc.GetType().ToString());
                sw.WriteLine("Exception: " + exc.Message);
                sw.WriteLine("Source: " + source);
                sw.WriteLine("Stack Trace: ");
                if (exc.StackTrace != null)
                {
                    sw.WriteLine(exc.StackTrace);
                    sw.WriteLine();
                }
                sw.Close();
            }
            catch (Exception ex)
            {
                // swallow the exception
                //throw ex;
            }
        }

        #endregion

        #region Authenticate Using Active Directory
        public static bool AuthenticateUser(string domain, string username, string password, string ldapPath, out Dictionary<string, string> lstADUserDetail)
        {

            lstADUserDetail = new Dictionary<string, string>();
            string domainAndUsername = domain + @"\" + username;
            DirectoryEntry entry = new DirectoryEntry(ldapPath, domainAndUsername, password);
            try
            {
                // Bind to the native AdsObject to force authentication.
                Object obj = entry.NativeObject;
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(SAMAccountName=" + username + ")";
                search.PropertiesToLoad.Add("cn");
                SearchResult result = search.FindOne();
                if (null == result)
                {
                    return false;
                }
                else
                {
                    foreach (SearchResult sResultSet in search.FindAll())
                    {
                        lstADUserDetail.Add("cn", GetProperty(sResultSet, "cn"));
                        lstADUserDetail.Add("givenName", GetProperty(sResultSet, "givenName"));
                        lstADUserDetail.Add("initials", GetProperty(sResultSet, "initials"));
                        lstADUserDetail.Add("sn", GetProperty(sResultSet, "sn"));
                    }
                }
                // Update the new path to the user in the directory
                ldapPath = result.Path;
                string _filterAttribute = (String)result.Properties["cn"][0];
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;

        }
        #endregion

        #region Get AD User Properties
        public static string GetProperty(SearchResult searchResult, string PropertyName)
        {
            if (searchResult.Properties.Contains(PropertyName))
            {
                return searchResult.Properties[PropertyName][0].ToString();
            }
            else
            {
                return string.Empty;
            }
        }
        #endregion

        #region Convert Datatable to String and Serilize into Object

        static int SerializerMaxLength = ConfigurationManager.AppSettings["SerializerMaxLength"] == null ? 2147483644 : Convert.ToInt32(ConfigurationManager.AppSettings["SerializerMaxLength"]);

        public static string Serializer(DataTable dt)
        {
            Dictionary<string, string> objDictionary = new Dictionary<string, string>();
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            _serializer.MaxJsonLength = SerializerMaxLength;
            objDictionary.Add(dt.TableName, DataTableToString(dt));
            return _serializer.Serialize(objDictionary);
        }

        public static string AuditSerializer(DataTable dt)
        {
            Dictionary<string, string> objDictionary = new Dictionary<string, string>();
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            _serializer.MaxJsonLength = SerializerMaxLength;
            objDictionary.Add(dt.TableName, AuditDataTableToString(dt));
            return _serializer.Serialize(objDictionary);
        }

        public static string AuditDataTableToString(DataTable dt)
        {
            List<Dictionary<string, object>> _strRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> _strRow;
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            _serializer.MaxJsonLength = SerializerMaxLength;
            foreach (DataRow _dr in dt.Rows)
            {
                _strRow = new Dictionary<string, object>();
                foreach (DataColumn column in dt.Columns)
                {
                    _strRow.Add(column.ColumnName, _dr[column]);
                }
                _strRows.Add(_strRow);
            }
            return _serializer.Serialize(_strRows);
        }

        public static string DatasetSerializer(DataSet ds)
        {
            Dictionary<string, string> objDictionary = new Dictionary<string, string>();
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            _serializer.MaxJsonLength = SerializerMaxLength;
            objDictionary.Add(ds.DataSetName, _serializer.Serialize(ds));
            return _serializer.Serialize(objDictionary);
        }

        public static string DataTableToString(DataTable dt)
        {
            List<Dictionary<string, object>> _strRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> _strRow;
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            _serializer.MaxJsonLength = SerializerMaxLength;
            foreach (DataRow _dr in dt.Rows)
            {
                _strRow = new Dictionary<string, object>();
                foreach (DataColumn column in dt.Columns)
                {
                    object data = _dr[column] == DBNull.Value ? null : _dr[column];
                    _strRow.Add(column.ColumnName, HttpUtility.HtmlEncode(data));
                }
                _strRows.Add(_strRow);
            }
            return _serializer.Serialize(_strRows);
        }

        public static string SerializedDataSet(DataSet dt)
        {
            List<Dictionary<string, string>> objDictionary = new List<Dictionary<string, string>>();
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            // _serializer.MaxJsonLength = SerializerMaxLength;

            foreach (DataTable dtbl in dt.Tables)
            {

                Dictionary<string, string> dictionary = new Dictionary<string, string>();
                dictionary.Add(dtbl.TableName, DataTableToStringData(dtbl));
                objDictionary.Add(dictionary);
            }
            return _serializer.Serialize(objDictionary);
        }
        public static string DataTableToStringData(DataTable dt)
        {
            List<Dictionary<string, object>> _strRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> _strRow;
            JavaScriptSerializer _serializer = new JavaScriptSerializer();
            // _serializer.MaxJsonLength = SerializerMaxLength;
            foreach (DataRow _dr in dt.Rows)
            {
                _strRow = new Dictionary<string, object>();
                foreach (DataColumn column in dt.Columns)
                {
                    object data = _dr[column] == DBNull.Value ? null : _dr[column];
                    _strRow.Add(column.ColumnName, HttpUtility.HtmlEncode(data));
                }
                _strRows.Add(_strRow);
            }
            return _serializer.Serialize(_strRows);
        }

        #endregion

        #region Versioning CSS & JS
        public static string SetVersion(HttpContext context, string filename)
        {
            string version = GetJsFileVersion(context, filename);
            return filename + version;
        }

        private static string GetJsFileVersion(HttpContext context, string filename)
        {
            if (context.Cache[filename] == null)
            {
                string filePhysicalPath = context.Server.MapPath(filename);

                string version = "?v=" + GetFileLastModifiedDateTime(context, filePhysicalPath, "yyyyMMddhhmmss");

                return version;
            }
            else
            {
                return string.Empty;
            }
        }

        public static string GetFileLastModifiedDateTime(HttpContext context, string filePath, string dateFormat)
        {
            return new System.IO.FileInfo(filePath).LastWriteTime.ToString(dateFormat);
        }
        #endregion

        #region Get AD User Details
        public static void GetADUserDetails(string domain, string serverusername, string servicepassword, string ldapPath, string userName, out Dictionary<string, string> lstADUserDetail)
        {
            lstADUserDetail = new Dictionary<string, string>();
            string domainAndUsername = domain + @"\" + serverusername;
            DirectoryEntry entry = new DirectoryEntry(ldapPath, domainAndUsername, servicepassword);
            try
            {
                // Bind to the native AdsObject to force authentication.
                Object obj = entry.NativeObject;
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(SAMAccountName=" + userName + ")";
                search.PropertiesToLoad.Add("givenName");
                search.PropertiesToLoad.Add("sn");
                search.PropertiesToLoad.Add("title");
                search.PropertiesToLoad.Add("telephoneNumber");
                search.PropertiesToLoad.Add("mobile");
                search.PropertiesToLoad.Add("mail");
                search.PropertiesToLoad.Add("streetAddress");
                search.PropertiesToLoad.Add("st");
                search.PropertiesToLoad.Add("l");
                search.PropertiesToLoad.Add("postalCode");
                SearchResult result = search.FindOne();
                if (result != null)
                {
                    foreach (SearchResult sResultSet in search.FindAll())
                    {
                        ResultPropertyCollection fields = result.Properties;
                        lstADUserDetail.Add("hasUser", "true");
                        foreach (String ldapField in fields.PropertyNames)
                        {
                            foreach (Object myCollection in fields[ldapField])
                                lstADUserDetail.Add(ldapField.ToLower(), myCollection.ToString());
                        }
                    }
                }
                else
                {
                    lstADUserDetail.Add("hasUser", "false");
                }
                // Update the new path to the user in the directory
                ldapPath = result.Path;
                string _filterAttribute = (String)result.Properties["cn"][0];
            }
            catch (Exception ex)
            {
                lstADUserDetail.Add("hasUser", "false");
                throw ex;
            }
        }
        #endregion


    }
}
