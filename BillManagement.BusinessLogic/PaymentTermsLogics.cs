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
    public class PaymentTermsLogics
    {
        public static string GetInvoicelst(PaymentTermsINvoiceFilterfilter List, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = List.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = List.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = List.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                     //new SqlParameter("@Code", SqlDbType.NVarChar) { Value = List.Code },
                     //new SqlParameter("@Description", SqlDbType.NVarChar) { Value = List.Description },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_PaymentTermsPaging", sqlParam, connection);
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

        public static int InsertPayment(PaymentTermsObjects objPayment, string connection)
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
                           new SqlParameter("@Payment_Name", SqlDbType.NVarChar) { Value = objPayment.Payment_Name },
                           new SqlParameter("@Payment_Code", SqlDbType.NVarChar) { Value = objPayment.Payment_Code },
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreatePaymentTerms", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Payment" + " " + objPayment.Payment_ID + " " + "added", "Payment List", connection);
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
        public static string FetchPaymentData(int Payment_ID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@Payment_ID", SqlDbType.Int) { Value =Payment_ID },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditPaymentData", sqlParam, connection);

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
        public static int DeletePayment(int Payment_ID, string connection)
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


                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@Payment_ID", SqlDbType.Int) { Value =Payment_ID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeletePayment", sqlParam, connection);

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

        public static int UpdatePayment(PaymentTermsObjects objPayment, string connection)
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
                           new SqlParameter("@updatedBy", SqlDbType.Int) { Value = accountID },
                            new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                            new SqlParameter("@Payment_ID", SqlDbType.Int) { Value = objPayment.Payment_ID },
                           new SqlParameter("@Payment_Name", SqlDbType.NVarChar) { Value = objPayment.Payment_Name },
                           new SqlParameter("@Payment_Code", SqlDbType.NVarChar) { Value = objPayment.Payment_Code },
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdatePayment", sqlParam, connection);

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

        public static DataSet GetGetBillListData(string Payment_ID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["Payment_ID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                new SqlParameter("@Payment_ID", SqlDbType.NVarChar) { Value = Payment_ID },
                new SqlParameter("@clientID", SqlDbType.NVarChar) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentTermsScreenMasterData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
        public static string FetchPaymentTermsMasterData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                SqlParameter[] sqlParam = {
                        new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentTermsScreenMasterData", sqlParam, connection);

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
