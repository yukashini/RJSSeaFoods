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
  public  class BuyerLogics
    {
        public static string FetchCreateBuyerMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateBuyerMasterData", sqlParam, connection);

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

        public static int InsertBuyer(Buyer objBuyer, string connection)
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
                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           new SqlParameter("@BuyerName", SqlDbType.NVarChar) { Value = objBuyer.BuyerName },
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objBuyer.Email },
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value = objBuyer.ContactNumber },
                           new SqlParameter("@altcontactNumber", SqlDbType.NVarChar) { Value =objBuyer.AltContactNumber},
                           new SqlParameter("@Fax", SqlDbType.NVarChar) { Value = objBuyer.BuyerFax},
                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objBuyer.CustomerAddress},
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objBuyer.City},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objBuyer.State},
                           new SqlParameter("@country", SqlDbType.NVarChar) { Value = objBuyer.Country},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objBuyer.Zip},
                           new SqlParameter("@courieraddress ", SqlDbType.NVarChar) { Value = objBuyer.Courieraddress},
                           new SqlParameter("@couriercity ", SqlDbType.NVarChar) { Value = objBuyer.CourierCity},
                           new SqlParameter("@courierstate", SqlDbType.NVarChar) { Value = objBuyer.CourierState},
                           new SqlParameter("@couriercountry", SqlDbType.NVarChar) { Value = objBuyer.CourierCountry},
                           new SqlParameter("@courierzip ", SqlDbType.NVarChar) { Value = objBuyer.CourierZip},                        
                           new SqlParameter("@couriername", SqlDbType.NVarChar) { Value = objBuyer.CourierAttnName },
                           new SqlParameter("@couriercontactNumber", SqlDbType.NVarChar) { Value = objBuyer.CourierContactNumber },
                           new SqlParameter("@courieraltcontactNumber", SqlDbType.NVarChar) { Value = objBuyer.CourierAltContactNumber},
                           new SqlParameter("@liners", SqlDbType.NVarChar) { Value = objBuyer.Liners},
                           new SqlParameter("@tax", SqlDbType.NVarChar) { Value = objBuyer.Tax_id},
                           new SqlParameter("@courieremail", SqlDbType.NVarChar) { Value = objBuyer.CourierEmail},
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateBuyer", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Buyer" + " " + objBuyer.BuyerID + " " + "added", "Buyer List", connection);
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

        public static int UpdateBuyer(Buyer objBuyer, string connection)
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
                           new SqlParameter("@buyerName", SqlDbType.NVarChar) { Value = objBuyer.BuyerName },
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objBuyer.Email },
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value = objBuyer.ContactNumber},
                           new SqlParameter("@altcontactNumber", SqlDbType.NVarChar) { Value = objBuyer.AltContactNumber},
                           new SqlParameter("@fax", SqlDbType.NVarChar) { Value = objBuyer.BuyerFax},
                           new SqlParameter("@customeraddress", SqlDbType.NVarChar) { Value = objBuyer.CustomerAddress},
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objBuyer.City},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objBuyer.State},
                           new SqlParameter("@country", SqlDbType.NVarChar) { Value = objBuyer.Country},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objBuyer.Zip},
                           new SqlParameter("@courieraddress", SqlDbType.NVarChar) { Value = objBuyer.Courieraddress},
                           new SqlParameter("@couriercity", SqlDbType.NVarChar) { Value = objBuyer.CourierCity},
                           new SqlParameter("@courierstate", SqlDbType.NVarChar) { Value = objBuyer.CourierState},
                           new SqlParameter("@couriercountry", SqlDbType.NVarChar) { Value = objBuyer.CourierCountry},
                           new SqlParameter("@courierzip", SqlDbType.NVarChar) { Value = objBuyer.CourierZip},
                           new SqlParameter("@courierAttnName", SqlDbType.NVarChar) { Value = objBuyer.CourierAttnName},
                           new SqlParameter("@couriercontactNumber", SqlDbType.NVarChar) { Value = objBuyer.CourierContactNumber},
                           new SqlParameter("@courieraltcontactNumber", SqlDbType.NVarChar) { Value = objBuyer.CourierAltContactNumber},
                           new SqlParameter("@liners", SqlDbType.NVarChar) { Value = objBuyer.Liners},
                           new SqlParameter("@tax", SqlDbType.NVarChar) { Value = objBuyer.Tax_id},
                           new SqlParameter("@courierEmail", SqlDbType.NVarChar) { Value = objBuyer.CourierEmail},
                           new SqlParameter("@buyerId ", SqlDbType.NVarChar) { Value = objBuyer.BuyerID},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
            
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateBuyer", sqlParam, connection);

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
        
        public static int DeleteBuyer(int BuyerId, string connection)
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
                           new SqlParameter("@buyerId", SqlDbType.Int) { Value =BuyerId },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteBuyer", sqlParam, connection);

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

        public static string FetchBuyerData(int customerId,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@BuyerId", SqlDbType.Int) { Value =customerId },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditBuyerData", sqlParam, connection);

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
