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
   public class ConfigurationLogics
    {
        public static int  InsertConfigs(CofigurationObjects Configs,string connection)
        {

            int postStatus = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@isBillChangesAllowed", SqlDbType.Int) { Value = Configs.IsChangesAllowed },
                    new SqlParameter("@isSplitAllowed", SqlDbType.Int) { Value = Configs.IsSplitAllowed },
                    new SqlParameter("@isRecurrenceAllowed", SqlDbType.Int) { Value = Configs.IsRecurrenceEnabled },
                    new SqlParameter("@isBillAssociationsAllowed", SqlDbType.Int) { Value = Configs.IsBillAssociationEnabled },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                    new SqlParameter("@savedBy", SqlDbType.Int) { Value = accountID },
                    new SqlParameter("@isBillExportAllowed", SqlDbType.Int) { Value = Configs.IsBillExportEnabled },
                    new SqlParameter("@isEpaymentsAllowed", SqlDbType.Int) { Value = Configs.IsEpaymentsEnabled },
                    new SqlParameter("@isOfflinePaymentsAllowed", SqlDbType.Int) { Value = Configs.IsOfflinePaymentsAllowed },
                    new SqlParameter("@isVendorImportAllowed", SqlDbType.Int) { Value = Configs.IsImportVendorsAllowed },
                    new SqlParameter("@isAutoApproval", SqlDbType.Int) { Value = Configs.IsAutoApproval },
                    new SqlParameter("@isMultiApproval", SqlDbType.Int) { Value = Configs.IsMultiApproval },
                    new SqlParameter("@isDefaultApproval", SqlDbType.Int) { Value = Configs.IsDefaultApproval },
                    new SqlParameter("@isStandardApproval", SqlDbType.Int) { Value = Configs.IsStandardApproval },
                    new SqlParameter("@isCustomApproval", SqlDbType.Int) { Value = Configs.IsCustomApproval },
                    new SqlParameter("@isPartialApproval", SqlDbType.Int) { Value = Configs.IsPartialApproval },
                    new SqlParameter("@prefix", SqlDbType.NVarChar) { Value = Configs.Prefix },
                    new SqlParameter("@issplit", SqlDbType.Int) { Value = Configs.Split },
                    new SqlParameter("@sendmail", SqlDbType.Int) { Value = Configs.Sendmail },
                    new SqlParameter("@terms", SqlDbType.NVarChar) { Value = Configs.Terms },
                    new SqlParameter("@note", SqlDbType.NVarChar) { Value = Configs.Note },
                    new SqlParameter("@template", SqlDbType.NVarChar) { Value = Configs.Template },
               };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_SaveConfigurations", sqlParam, connection);
                postStatus = UpdateApprovers(Configs.Approvers, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Payment", "Payable Preference of application is updated", "Accounts Payable Preference", connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int UpdateApprovers(List<ApprovalSequence> approvers ,string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());

                //Disable all the Default Approvers Before Execute the list of Approver(s)
                SqlParameter[] sqlParameter = {
                        new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                   };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DisableDefaultApprobers", sqlParameter, connection);
                if (approvers.Count > 0)
                {
                    foreach(ApprovalSequence approver in approvers)
                    {
                        SqlParameter[] sqlParam = {
                        new SqlParameter("@AccountID", SqlDbType.Int) { Value = approver.AccountID },
                        new SqlParameter("@ApproverSequence", SqlDbType.Int) { Value = approver.ApproverSeq },
                        new SqlParameter("@ClientID", SqlDbType.Int) { Value = clientID },
                   };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_SetMultiApprovers", sqlParam, connection);
                    }
                }
            }
            catch
            {

            }
            return postStatus;
        }

        public static string FetchClientConfigDetails(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetConfigDetails", sqlParam, connection);

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

        public static string FetchClientAmountSlabs(float firstAmount,float secondAmount,int editID,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                    new SqlParameter("@firstAmount", SqlDbType.Float) { Value = firstAmount },
                    new SqlParameter("@lastAmount", SqlDbType.Float) { Value = secondAmount },
                    new SqlParameter("@editConfigID", SqlDbType.Int) { Value = editID },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_ValidateAmountSlab", sqlParam, connection);

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

        public static int InsertCustomConfigs(CustomApprovalConfigurationObjects Configs, string connection)
        {
            int postStatus = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {
                   new SqlParameter("@isVendorType", SqlDbType.Int) { Value = Configs.IsVendorType },
                    new SqlParameter("@isAmountType", SqlDbType.Int) { Value = Configs.IsAmountType },
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = Configs.VendorID },
                    new SqlParameter("@amount", SqlDbType.Float) { Value = Configs.Amount },
                    new SqlParameter("@secondAmount", SqlDbType.Float) { Value = Configs.SecondAmount },
                    new SqlParameter("@condition", SqlDbType.Int) { Value = Configs.Condition },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                    new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                       new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },
               };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertCustomApprovalConfiguration", sqlParam, connection);
                postStatus = InsertCustomConfigsApprovers(Configs.lstApprovers, postStatus, connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int DeleteCustomConfigs(int configID, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString()); 
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                    new SqlParameter("@configId", SqlDbType.Int) { Value = configID },
               };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteCustomApprovalConfig", sqlParam, connection);
              
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int InsertCustomConfigsApprovers(List<CustomApprovers> ConfigsApprovers,int configID, string connection)
        {
            int postStatus = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                if (ConfigsApprovers.Count > 0)
                {
                    foreach(CustomApprovers approver in ConfigsApprovers)
                    {
                        SqlParameter[] sqlParam = {
                        new SqlParameter("@configID", SqlDbType.Int) { Value = configID },
                        new SqlParameter("@approverID", SqlDbType.Int) { Value = approver.ApproverID },
                        new SqlParameter("@sequence", SqlDbType.Int) { Value = approver.Sequence },
                        new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                        new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                   };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertCustomApprover", sqlParam, connection);
                    }
                }
                
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

        public static int UpdateCustomConfigs(CustomApprovalConfigurationObjects Configs, string connection)
        {
            int postStatus = 0;
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                   new SqlParameter("@isVendorType", SqlDbType.Int) { Value = Configs.IsVendorType },
                    new SqlParameter("@isAmountType", SqlDbType.Int) { Value = Configs.IsAmountType },
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = Configs.VendorID },
                    new SqlParameter("@amount", SqlDbType.Float) { Value = Configs.Amount },
                    new SqlParameter("@secondAmount", SqlDbType.Float) { Value = Configs.SecondAmount },
                    new SqlParameter("@condition", SqlDbType.Int) { Value = Configs.Condition },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                    new SqlParameter("@updatedBy", SqlDbType.Int) { Value = accountID },
                     new SqlParameter("@identityID", SqlDbType.Int) { Value = Configs.IdentityID },
               };
                postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateCustomApprovalConfiguration", sqlParam, connection);
                postStatus = InsertCustomConfigsApprovers(Configs.lstApprovers, Configs.IdentityID, connection);
            }
            catch (Exception ex)
            {

            }
            return postStatus;
        }

    }
}
