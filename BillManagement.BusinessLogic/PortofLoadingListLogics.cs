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
    public class PortofLoadingListLogics
    {
        public static string GetInvoicelst(INvoiceFilterfilter List, string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_PortofLoadingPaging", sqlParam, connection);
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

        public static int InsertLoading(PortofLoadingObjects objLoading, string connection)
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
                           new SqlParameter("@LoadingName", SqlDbType.NVarChar) { Value = objLoading.LoadingName },
                           new SqlParameter("@LoadingCode", SqlDbType.NVarChar) { Value = objLoading.LoadingCode },
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreatePortofLoadingList", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Loading" + " " + objLoading.LoadingID + " " + "added", "Loading List", connection);
                foreach (DataTable table in ds.Tables)
                {
                    if (table.Rows.Count > 0)
                    {
                        table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                    }
                }
                Strresult = _objCommon.DataSetToStringWithTableName(ds); }
            catch (Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }
        public static string FetchLoadingData(int LoadingID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@LoadingID", SqlDbType.Int) { Value =LoadingID },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditLoadingData", sqlParam, connection);

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
        public static int DeleteLoading(int LoadingID, string connection)
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
                           new SqlParameter("@LoadingID", SqlDbType.Int) { Value =LoadingID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteLoading", sqlParam, connection);

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

        public static int UpdateLoading(PortofLoadingObjects objLoading, string connection)
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
                            new SqlParameter("@LoadingID", SqlDbType.Int) { Value = objLoading.LoadingID },
                           new SqlParameter("@LoadingName", SqlDbType.NVarChar) { Value = objLoading.LoadingName },
                           new SqlParameter("@LoadingCode", SqlDbType.NVarChar) { Value = objLoading.LoadingCode },
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateLoading", sqlParam, connection);

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

        public static DataSet GetGetBillListData(string LoadingID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["LoadingID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                new SqlParameter("@LoadingID", SqlDbType.NVarChar) { Value = LoadingID },
                new SqlParameter("@clientID", SqlDbType.NVarChar) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetLoadingListScreenMasterData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    

        public static string FetchCreateLoadingMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateLoadingMasterData", sqlParam, connection);

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
