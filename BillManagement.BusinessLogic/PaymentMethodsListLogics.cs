using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BillManagement.BusinessLogic
{
  public class PaymentMethodsListLogics
    {
        public static string GetPaymentMethodList(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentMethodListScreenData", sqlParam, connection);

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

        public static int InsertClientCard(ClientCards cardDetails, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@cardName", SqlDbType.NVarChar) { Value = cardDetails.CardName },
                             new SqlParameter("@cardNumber", SqlDbType.NVarChar) { Value = cardDetails.CardNumber },
                             new SqlParameter("@expMonth", SqlDbType.NVarChar) { Value = cardDetails.ExpiryMonth },
                             new SqlParameter("@expYear", SqlDbType.NVarChar) { Value = cardDetails.ExpiryYear },
                             new SqlParameter("@ccvNumber", SqlDbType.NVarChar) { Value = cardDetails.CCV },
                             new SqlParameter("@bankName", SqlDbType.NVarChar) { Value = cardDetails.BankName },
                             new SqlParameter("@isDefault", SqlDbType.Int) { Value = cardDetails.IsDefault },
                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                            new SqlParameter("@referenceID", SqlDbType.NVarChar) { Value = cardDetails.ReferenceID },
                             new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertCard", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static string FetchEditCardDetails(int cardID,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@cardID", SqlDbType.Int) { Value = cardID },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditCardDetails", sqlParam, connection);

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

        public static int UpdateClientCard(ClientCards cardDetails, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@cardName", SqlDbType.NVarChar) { Value = cardDetails.CardName },
                             new SqlParameter("@cardNumber", SqlDbType.NVarChar) { Value = cardDetails.CardNumber },
                             new SqlParameter("@expMonth", SqlDbType.NVarChar) { Value = cardDetails.ExpiryMonth },
                             new SqlParameter("@expYear", SqlDbType.NVarChar) { Value = cardDetails.ExpiryYear },
                             new SqlParameter("@ccvNumber", SqlDbType.NVarChar) { Value = cardDetails.CCV },
                             new SqlParameter("@bankName", SqlDbType.NVarChar) { Value = cardDetails.BankName },
                             new SqlParameter("@isDefault", SqlDbType.Int) { Value = cardDetails.IsDefault },
                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@referenceID", SqlDbType.NVarChar) { Value = cardDetails.ReferenceID },
                             new SqlParameter("@cardID", SqlDbType.NVarChar) { Value = cardDetails.CardIdentityId },
                           
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateCard", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int DeleteClientCard(int cardId, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                           
                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@cardID", SqlDbType.NVarChar) { Value = cardId },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteCard", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int DefalutClientCard(int cardId, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@cardID", SqlDbType.NVarChar) { Value = cardId },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_MakeDefaultCard", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int InsertClientAccount(ClientAccount AccountDetails, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@accountName", SqlDbType.NVarChar) { Value = AccountDetails.AccountName },
                             new SqlParameter("@accountNumber", SqlDbType.NVarChar) { Value = AccountDetails.AccountNumber },
                             new SqlParameter("@routingNumber", SqlDbType.NVarChar) { Value = AccountDetails.RoutingNumber },
                             new SqlParameter("@referenceID", SqlDbType.NVarChar) { Value = AccountDetails.ReferenceID },
                             new SqlParameter("@isDefault", SqlDbType.Int) { Value =AccountDetails.IsDefault },
                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@achCustomer", SqlDbType.NVarChar) { Value = AccountDetails.ACHCustomerID },
                             new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertClientAccount", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static string FetchEditAccountDetails(int accountID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@accountID", SqlDbType.Int) { Value = accountID },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditAccountDetails", sqlParam, connection);

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

        public static int UpdateClientAccount(ClientAccount AccountDetails, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@accountName", SqlDbType.NVarChar) { Value = AccountDetails.AccountName },
                             new SqlParameter("@accountNumber", SqlDbType.NVarChar) { Value = AccountDetails.AccountNumber },
                             new SqlParameter("@routingNumber", SqlDbType.NVarChar) { Value = AccountDetails.RoutingNumber },
                             new SqlParameter("@referenceID", SqlDbType.NVarChar) { Value = AccountDetails.ReferenceID },
                             new SqlParameter("@isDefault", SqlDbType.Int) { Value =AccountDetails.IsDefault },
                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@achCustomer", SqlDbType.NVarChar) { Value = AccountDetails.ACHCustomerID },
                             new SqlParameter("@accountID", SqlDbType.Int) { Value =AccountDetails.AccountIdentityID  },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateClientAccount", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int DeleteClientAccount(int accountId, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                           
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@accountID", SqlDbType.NVarChar) { Value = accountId },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteClientAccount", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int DefalutClientAccount(int accountNo, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@accountID", SqlDbType.NVarChar) { Value = accountNo },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_MakeAccountDefault", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int UpdateVerifedAccountStatus(int accountNo, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@customerID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@accountID", SqlDbType.NVarChar) { Value = accountNo },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateAccountVerifiedStatus", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }
    }
}
