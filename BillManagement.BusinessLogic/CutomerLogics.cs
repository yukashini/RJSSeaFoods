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
  public  class CutomerLogics
    {
        public static string FetchCreateCustomerMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateCutomerMasterData", sqlParam, connection);

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

        public static int InsertCustomer(CustomerObjects objCustomer, string connection)
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
                           new SqlParameter("@customerName", SqlDbType.NVarChar) { Value = objCustomer.CustomerName },
                           new SqlParameter("@customerType", SqlDbType.Int) { Value = objCustomer.CustomerType },
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objCustomer.Email },
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value =objCustomer.ContactNumber},
                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objCustomer.CustomerAddress},
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objCustomer.City},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objCustomer.State},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objCustomer.Zip},
                           new SqlParameter("@logo", SqlDbType.NVarChar) { Value = objCustomer.CustomerLogo},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                           new SqlParameter("@paymentterm", SqlDbType.Int) { Value = objCustomer.PaymentTerms },
                           new SqlParameter("@paymentmethod", SqlDbType.Int) { Value = objCustomer.PaymentMethod },
                           new SqlParameter("@shippingaddress", SqlDbType.NVarChar) { Value = objCustomer.Shippingaddress},
                           new SqlParameter("@billingaddress", SqlDbType.NVarChar) { Value = objCustomer.BillingAddress},
                           new SqlParameter("@accountholdername", SqlDbType.NVarChar) { Value = objCustomer.AccountHoldername},
                           new SqlParameter("@accountnumber", SqlDbType.NVarChar) { Value = objCustomer.AccountNumber},
                           new SqlParameter("@routingnumber", SqlDbType.NVarChar) { Value = objCustomer.RoutingNumber},

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateCustomer", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Customer" + " " + objCustomer.CustomerName + " " + "added", "Customer List", connection);
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

        public static int UpdateCustomer(CustomerObjects objCustomer, string connection)
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
                           new SqlParameter("@customerName", SqlDbType.NVarChar) { Value = objCustomer.CustomerName },
                           new SqlParameter("@customerType", SqlDbType.Int) { Value = objCustomer.CustomerType },
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objCustomer.Email },
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value =objCustomer.ContactNumber},
                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objCustomer.CustomerAddress},
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objCustomer.City},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objCustomer.State},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objCustomer.Zip},
                           new SqlParameter("@logo", SqlDbType.NVarChar) { Value = objCustomer.CustomerLogo},
                            new SqlParameter("@customerId", SqlDbType.NVarChar) { Value = objCustomer.CustomerID},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                           new SqlParameter("@paymentterm", SqlDbType.Int) { Value = objCustomer.PaymentTerms },
                           new SqlParameter("@paymentmethod", SqlDbType.Int) { Value = objCustomer.PaymentMethod },

                           new SqlParameter("@shippingaddress", SqlDbType.NVarChar) { Value = objCustomer.Shippingaddress},
                           new SqlParameter("@billingaddress", SqlDbType.NVarChar) { Value = objCustomer.BillingAddress},
                           new SqlParameter("@accountholdername", SqlDbType.NVarChar) { Value = objCustomer.AccountHoldername},
                           new SqlParameter("@accountnumber", SqlDbType.NVarChar) { Value = objCustomer.AccountNumber},
                           new SqlParameter("@routingnumber", SqlDbType.NVarChar) { Value = objCustomer.RoutingNumber},


                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateCustomer", sqlParam, connection);

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
        
        public static int DeleteCustomer(int customerID, string connection)
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
                           new SqlParameter("@customerId", SqlDbType.Int) { Value =customerID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteCustomer", sqlParam, connection);

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

        public static string FetchCustomerData(int customerId,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@customerId", SqlDbType.Int) { Value =customerId },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditCustomerData", sqlParam, connection);

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
