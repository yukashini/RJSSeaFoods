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
  public  class MalaysiaLogics
    {
        public static string FetchCreateMalaysiaMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateMalaysiaMasterData", sqlParam, connection);

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

        public static int InsertMalaysia(Malaysia objMalaysia, string connection)
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

                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID},
                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           //new SqlParameter("@labelId", SqlDbType.Int){ Value = objMalaysia.LabelID},
                           new SqlParameter("@origin", SqlDbType.NVarChar) { Value = objMalaysia.Origin },
                           new SqlParameter("@size", SqlDbType.NVarChar) { Value = objMalaysia.Size },
                           new SqlParameter("@approvalNo", SqlDbType.NVarChar) { Value = objMalaysia.ApprovalNo},
                           new SqlParameter("@weight", SqlDbType.NVarChar) { Value = objMalaysia.Weight},
                           new SqlParameter("@netweight", SqlDbType.NVarChar) { Value =objMalaysia.NetWeight},
                           new SqlParameter("@grossweight", SqlDbType.NVarChar) { Value = objMalaysia.GrossWeight },
                           new SqlParameter("@productioncode", SqlDbType.NVarChar) { Value = objMalaysia.ProductionCode},
                           new SqlParameter("@productiondate", SqlDbType.DateTime) { Value = objMalaysia.ProductionDate},
                           new SqlParameter("@bestbeforedate", SqlDbType.DateTime) { Value = objMalaysia.BestBeforeDate},
                           new SqlParameter("@buyerID", SqlDbType.NVarChar) { Value = objMalaysia.BuyerID},
                           new SqlParameter("@productID", SqlDbType.NVarChar) { Value = objMalaysia.ProductID},
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateMalaysia", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Malaysia" + " " + objMalaysia.LabelID + " " + "added", "Malaysia List", connection);
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

        public static int UpdateMalaysia(Malaysia objMalaysia, string connection)
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

                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID},
                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           //new SqlParameter("@labelId", SqlDbType.Int){ Value = objMalaysia.LabelID},
                           new SqlParameter("@origin", SqlDbType.NVarChar) { Value = objMalaysia.Origin },
                           new SqlParameter("@size", SqlDbType.NVarChar) { Value = objMalaysia.Size },
                           new SqlParameter("@approvalNo", SqlDbType.NVarChar) { Value = objMalaysia.ApprovalNo},
                           new SqlParameter("@weight", SqlDbType.NVarChar) { Value = objMalaysia.Weight},
                           new SqlParameter("@netweight", SqlDbType.NVarChar) { Value =objMalaysia.NetWeight},
                           new SqlParameter("@grossweight", SqlDbType.NVarChar) { Value = objMalaysia.GrossWeight },
                           new SqlParameter("@productioncode", SqlDbType.NVarChar) { Value = objMalaysia.ProductionCode},
                           new SqlParameter("@productiondate", SqlDbType.DateTime) { Value = objMalaysia.ProductionDate},
                           new SqlParameter("@bestbeforedate", SqlDbType.DateTime) { Value = objMalaysia.BestBeforeDate},
                           new SqlParameter("@buyerID", SqlDbType.NVarChar) { Value = objMalaysia.BuyerID},
                           new SqlParameter("@productID", SqlDbType.NVarChar) { Value = objMalaysia.ProductID},
                           new SqlParameter("@LableID", SqlDbType.Int) { Value = objMalaysia.LabelID},
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateMalaysia", sqlParam, connection);

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
        
        public static int DeleteMalaysia(int LabelId, string connection)
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
                           new SqlParameter("@buyerId", SqlDbType.Int) { Value =LabelId },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteMalaysia", sqlParam, connection);

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

        public static string FetchMalaysiaData(int LabelId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@LabelId", SqlDbType.Int) { Value =LabelId },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditMalaysiaData", sqlParam, connection);

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
        public static string FetchBuyerData(int BuyerID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@BuyerID", SqlDbType.Int) { Value =BuyerID },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBuyerMalaysiaData", sqlParam, connection);

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
