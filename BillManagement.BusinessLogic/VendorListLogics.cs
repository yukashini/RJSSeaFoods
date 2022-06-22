using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static BillManagement.BusinessLogic.CredentialLogics;

namespace BillManagement.BusinessLogic
{
    public class VendorListLogics
    {
        public static string FetchVendorListData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetVendorListData", sqlParam, connection);

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

        public static int DeleteVendor(int vendorID, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@vendorID", SqlDbType.NVarChar) { Value = vendorID },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteVendor", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }
        
        public static int BillPaidStatus(int BillID, string BatchID,int userBillId,float PaidAmount, string Connection)
        {
            int PostStatus = 0;
            try
            {
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                string Query = string.Empty;
                Query += "Update [dbo].[Tbl_BillApproved] set  [Status]=" + 50044 + ", [PaymentStatus]=" + 50044 + ",PaymentReferenceID='" + BatchID + "',PaidOn=GetDate(),UpdatedBy="+accountID+", UpdatedOn=GETDATE(),AmountPaid="+ PaidAmount + ",AmountDue="+0.00+",PaymentMode="+50072+",PaymentMethod='Pay Pal' where IdentityID=" + BillID;
                PostStatus = SqlQueryExecutor.Write(Query, Connection);

                Query = string.Empty;
                Query += "Update [dbo].[Tbl_Bill] set [Status]=" + 50044 + ",UpdatedON=GetDate() where BillID=" + userBillId;
                PostStatus = SqlQueryExecutor.Write(Query, Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return PostStatus;
        }

        public static int SendPaymentSuccessEmailToFinanceManager(string inVoiceNumber, string connection,int isSuccess)
        {

            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
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
                    FROM[dbo].[Tbl_Accounts] WHERE AccountID= '" + accountID + "' AND ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);


                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["first_name"]==null?"":dtu.Rows[0]["first_name"])},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue = inVoiceNumber},
                        new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                         new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter

                    if (isSuccess == 1)
                    {
                        dt = GetEmailTempalte(connection, 610045);
                    }
                    else
                    {
                        dt = GetEmailTempalte(connection, 610047);
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

            }
            return postStatus;
        }

        public static int SendPaymentSuccessEmailToVendor( Billpayment BillDetails, string connection)
        {

            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int postStatus = 0;
            try
            {
                DataTable dtu = new DataTable();
                string query = string.Empty;

                    query += @"
                    SELECT  A.AccountID
                    ,A.[Firstname] as first_name
                    ,A.[Lastname] as last_name
                    ,A.PrimaryEmailID
                    ,B.ClientName
                    FROM[dbo].[Tbl_Accounts] AS A
                    LEFT JOIN Tbl_Client AS B
                    ON A.ClientID=B.ClientID
                    WHERE A.AccountID= '" + accountID + "' AND A.ClientID= '" + clientID + "' ";

                dtu = SqlQueryExecutor.ReadNoParams(query, connection);


                // Send Email to user for their credentials
                if (dtu.Rows.Count > 0)
                {
                    EmailReplacement Replacements = new EmailReplacement();
                    List<EmailReplacement> lstReplacementsValues = new List<EmailReplacement>
                {
                       new EmailReplacement { Replacer = "{{Header}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["EmailHeader"])},
                       new EmailReplacement { Replacer = "{{ToName}}", ReplacementValue =BillDetails.VendorName},
                       new EmailReplacement { Replacer = "{{OrgName}}", ReplacementValue = Convert.ToString(dtu.Rows[0]["ClientName"]==null?"":dtu.Rows[0]["ClientName"])},
                       new EmailReplacement { Replacer = "{{VendorName}}", ReplacementValue = BillDetails.VendorName},
                       new EmailReplacement { Replacer = "{{InvoiceNumber}}", ReplacementValue =  BillDetails.InvoiceNumber},
                       new EmailReplacement { Replacer = "{{TotalAmount}}", ReplacementValue =  BillDetails.TotalAmount},
                       new EmailReplacement { Replacer = "{{date}}", ReplacementValue =  BillDetails.StrDate},
                       new EmailReplacement { Replacer = "{{hrefurl}}", ReplacementValue =Convert.ToString(ConfigurationManager.AppSettings["url"])},
                       new EmailReplacement { Replacer = "{{url}}", ReplacementValue = Convert.ToString(ConfigurationManager.AppSettings["url"])},
                };
                    DataTable dt = new DataTable();
                    Email email = new Email();
                    EmailInfo emailList = new EmailInfo();
                    //send template id as parameter
                    dt = GetEmailTempalte(connection, 610046);
                    foreach (DataRow row in dt.Rows)

                    {
                        email.Body = row["Body"].ToString();
                        email.Subject = row["Subject"].ToString();
                        emailList.UserName = BillDetails.VendorName;
                        emailList.PrimaryEmailId = BillDetails.VendorEmail;
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


        public static string GetVendorList(VendorListFilter vendorFilter, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = vendorFilter.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = vendorFilter.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = vendorFilter.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = vendorFilter.VendorName },
                      new SqlParameter("@balance", SqlDbType.NVarChar) { Value = vendorFilter.Balance },
                      new SqlParameter("@lastPayment", SqlDbType.NVarChar) { Value = vendorFilter.LastPayment },

                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateVendorList", sqlParam, connection);

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

        public static int SaveBulkExcelData(List<VendorExcelImport> excelGtList, string connection)
        {
            int postStatus = 0;
            int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
            int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
            try
            {
               
                DataTable existingGLCode = new DataTable();
                DataTable dt = ToDataTable(excelGtList);
                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["VendorName"].DataType = typeof(string);
                dtCloned.Columns["Email"].DataType = typeof(string);
                dtCloned.Columns["Phone"].DataType = typeof(string);
                dtCloned.Columns["PrefferedPaymentMethod"].DataType = typeof(string);
                dtCloned.Columns["PaymentTerm"].DataType = typeof(string);
                dtCloned.Columns["GLCode"].DataType = typeof(string);
                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }

                Dictionary<string, string> dic = new Dictionary<string, string>();
                dic.Add("Check", "50067");
                dic.Add("Online Transaction", "50068");
                dic.Add("Credit Card", "50069");
                dic.Add("Direct Pay", "50070");
                dic.Add("Cash", "50074");
                dic.Add("Others", "50093");
                dic.Add("", "0");
                foreach (KeyValuePair<string, string> kvp in dic)
                {
                    DataRow[] sl = dtCloned.Select("PrefferedPaymentMethod='" + kvp.Key + "'");

                    sl.ToList().ForEach(x => x.SetField<string>("PrefferedPaymentMethod", kvp.Value));
                }
                Dictionary<string, string> dicpt = new Dictionary<string, string>();
                dicpt.Add("NET 30", "50009");
                dicpt.Add("NET 60", "50010");
                dicpt.Add("NET 90", "50011");
                dicpt.Add("On Delivery", "50012");
                dicpt.Add("NET 20", "50071");
                dicpt.Add("", "0");
                
                foreach (KeyValuePair<string, string> kvp in dicpt)
                {
                    DataRow[] sl = dtCloned.Select("PaymentTerm='" + kvp.Key + "'");

                    sl.ToList().ForEach(x => x.SetField<string>("PaymentTerm", kvp.Value));
                }

                DataColumn Columncl = new DataColumn("ClientID", typeof(System.String));
                Columncl.DefaultValue = clientID;
                dtCloned.Columns.Add(Columncl);

                DataColumn Columncr = new DataColumn("CreatedBy", typeof(System.String));
                Columncr.DefaultValue = accountID;
                dtCloned.Columns.Add(Columncr);
                if (dtCloned.Rows.Count > 0)
                {   
                    DataView dataView = dtCloned.DefaultView;
                    dtCloned = dataView.ToTable(true, "VendorName", "Email", "Phone", "PrefferedPaymentMethod", "PaymentTerm", "GLCode","ClientID", "CreatedBy");
                    postStatus = MergeGlCodes(dtCloned, connection);
                }

            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw ex;
            }
            return postStatus;
        }
        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties by using reflection   
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names  
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {

                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
        public static int MergeGlCodes(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertVendorList", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_vendor", data);
                sqlParam.SqlDbType = SqlDbType.Structured;
                cmd.ExecuteNonQuery();
                dbConnection.Close();
            }
            catch (Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }
    }
}
