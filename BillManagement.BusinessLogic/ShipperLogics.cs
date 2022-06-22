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
  public  class ShipperLogics
    {
        public static string FetchCreateShipperMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateShipperMasterData", sqlParam, connection);

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

        public static int InsertShipper(Shipper objShipper, string connection)
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
                           new SqlParameter("@ShipperName", SqlDbType.NVarChar) { Value = objShipper.ShipperName },
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objShipper.ShipperEmail },
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value = objShipper.ShipperContactNumber },
                           new SqlParameter("@altcontactNumber", SqlDbType.NVarChar) { Value =objShipper.ShipperAltContactNumber},
                           new SqlParameter("@shipperno", SqlDbType.NVarChar) { Value = objShipper.ShipperNo},
                           new SqlParameter("@gst", SqlDbType.NVarChar) { Value = objShipper.ShipperGST},
                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objShipper.ShipperAddress},
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objShipper.ShipperCity},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objShipper.ShipperState},
                           new SqlParameter("@country", SqlDbType.NVarChar) { Value = objShipper.ShipperCountry},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objShipper.ShipperZip},
                           new SqlParameter("@Approvalno", SqlDbType.NVarChar) { Value = objShipper.ApprovalNo},
                           new SqlParameter("@drip", SqlDbType.NVarChar) { Value = objShipper.DripCapital},
                           new SqlParameter("@PPname", SqlDbType.NVarChar) { Value = objShipper.ProcessPacked},
                           new SqlParameter("@PPaddress", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedaddress},
                           new SqlParameter("@PPcity", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedCity},                        
                           new SqlParameter("@PPstate", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedState },
                           new SqlParameter("@PPcountry", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedCountry },
                           new SqlParameter("@PPzip", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedZip},
                           new SqlParameter("@PPApprovalNumber", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedAppno},
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateShipper", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Buyer" + " " + objShipper.ShipperID + " " + "added", "Shipper List", connection);
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

        public static int UpdateShipper(Shipper objShipper, string connection)
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
                           new SqlParameter("@shipperName", SqlDbType.NVarChar) { Value = objShipper.ShipperName },
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objShipper.ShipperEmail },
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value = objShipper.ShipperContactNumber},
                           new SqlParameter("@altcontactNumber", SqlDbType.NVarChar) { Value = objShipper.ShipperAltContactNumber},
                           new SqlParameter("@shipperno", SqlDbType.NVarChar) { Value = objShipper.ShipperNo},
                           new SqlParameter("@gst", SqlDbType.NVarChar) { Value = objShipper.ShipperGST},
                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objShipper.ShipperAddress},
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objShipper.ShipperCity},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objShipper.ShipperState},
                           new SqlParameter("@country", SqlDbType.NVarChar) { Value = objShipper.ShipperCountry},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objShipper.ShipperZip},
                           new SqlParameter("@approvalno", SqlDbType.NVarChar) { Value = objShipper.ApprovalNo},
                           new SqlParameter("@drip", SqlDbType.NVarChar) { Value = objShipper.DripCapital},
                           new SqlParameter("@PPname", SqlDbType.NVarChar) { Value = objShipper.ProcessPacked},
                           new SqlParameter("@PPaddress", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedaddress},
                           new SqlParameter("@PPcity", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedCity},
                           new SqlParameter("@PPstate", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedState},
                           new SqlParameter("@PPcountry", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedCountry},
                           new SqlParameter("@PPzip", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedZip},
                           new SqlParameter("@PPApprovalno", SqlDbType.NVarChar) { Value = objShipper.ProcessPackedAppno},
                           new SqlParameter("@shipperId ", SqlDbType.NVarChar) { Value = objShipper.ShipperID},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
            
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateShipper", sqlParam, connection);

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
        
        public static int DeleteShipper(int ShipperId, string connection)
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
                           new SqlParameter("@ShipperId", SqlDbType.Int) { Value = ShipperId },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteShipper", sqlParam, connection);

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

        public static string FetchShipperData(int ShipperID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@ShipperId", SqlDbType.Int) { Value = ShipperID },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditShipperData", sqlParam, connection);

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
