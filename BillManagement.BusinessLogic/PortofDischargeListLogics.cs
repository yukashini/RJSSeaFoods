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
    public class PortofDishargeListLogics
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
                };
                    ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_PortofDischargePaging", sqlParam, connection);
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

        public static int InsertDischarge(PortofDischargeObjects objDischarge, string connection)
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
                           new SqlParameter("@DischargeName", SqlDbType.NVarChar) { Value = objDischarge.DischargeName },
                           new SqlParameter("@DischargeCode", SqlDbType.NVarChar) { Value = objDischarge.DischargeCode },
                           new SqlParameter("@DischargeCountry", SqlDbType.NVarChar) { Value = objDischarge.DischargeCountry},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreatePortofDischargeList", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Loading" + " " + objDischarge.DischargeID + " " + "added", "Discharge List", connection);
                foreach (DataTable table in ds.Tables)
                {
                    if (table.Rows.Count > 0)
                    {
                        table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                    }
                }
                Strresult = _objCommon.DataSetToStringWithTableName(ds);            }
            catch (Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }
        public static string FetchDischargeData(int DischargeID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@DischargeID", SqlDbType.Int) { Value = DischargeID },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditDischargeData", sqlParam, connection);

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
        public static int DeleteDischarge(int DischargeID, string connection)
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
                           new SqlParameter("@DischargeID", SqlDbType.Int) { Value =DischargeID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteDischarge", sqlParam, connection);

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

        public static int UpdateDischarge(PortofDischargeObjects objDischarge, string connection)
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
                            new SqlParameter("@DischargeID", SqlDbType.Int) { Value = objDischarge.DischargeID },
                           new SqlParameter("@DischargeName", SqlDbType.NVarChar) { Value = objDischarge.DischargeName },
                           new SqlParameter("@DischargeCode", SqlDbType.NVarChar) { Value = objDischarge.DischargeCode },
                           new SqlParameter("@DischargeCountry", SqlDbType.NVarChar) { Value = objDischarge.DischargeCountry},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateDischarge", sqlParam, connection);

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

        public static DataSet GetGetBillListData(string DischargeID, string connection)
            {
                DataSet ds = new DataSet();
                try
                {
                    int AccountID = Convert.ToInt32(HttpContext.Current.Session["DischargeID"].ToString());
                    int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                    int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                    SqlParameter[] sqlParam = {
                new SqlParameter("@DischargeID", SqlDbType.NVarChar) { Value = DischargeID },
                new SqlParameter("@clientID", SqlDbType.NVarChar) { Value = clientID }
               };
                    ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateDischargeMasterData", sqlParam, connection);
                }
                catch (Exception ex)
                {
                    
                }
                return ds;

            }

        public static string FetchCreateDischargeMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateDischargeMasterData", sqlParam, connection);

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
