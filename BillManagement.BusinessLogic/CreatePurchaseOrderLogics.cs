using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BillManagement.BusinessLogic
{
    public class CreatePurchaseOrderLogic
    {
        public static string FetchCreatePurchaseMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateInvoiceVietnamMasterData", sqlParam, connection);

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
        public static int CreateNewPurchase(List<Purchase> bill, string connection)
        {
            int postStatus = 0;
            try
            {
                int PostStatus = 0;
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                //        SqlParameter[] sqlActionsParameter =
                //                           {
                //                     new SqlParameter("@clientId", SqlDbType.NVarChar) { Value = ClientID},
                //                     new SqlParameter("@glNumber", SqlDbType.NVarChar) { Value = excelGtList[0].GLNumber },
                //                     new SqlParameter("@glDescription", SqlDbType.NVarChar) { Value = excelGtList[0].GLDescription },
                //                     new SqlParameter("@rowStatus", SqlDbType.NVarChar) { Value = excelGtList[0].RowStatus },
                //                     new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                //                     new SqlParameter("@gategoryname", SqlDbType.NVarChar) { Value = excelGtList[0].Category },
                //                     new SqlParameter("@retVal", SqlDbType.Int) { Direction = ParameterDirection.Output },


                //            };

                //        PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedureGl("SP_InsertCategoryGlDetails", sqlActionsParameter, connection);
                //excelGtList.RemoveAt(0);

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                DataTable existingGLCode = new DataTable();
                DataTable dt = ToDataTable(bill);

                System.Data.DataColumn newColumn = new System.Data.DataColumn("ClientID", typeof(System.String));
                newColumn.DefaultValue = clientID;
                dt.Columns.Add(newColumn);


                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["product"].DataType = typeof(Int32);
                dtCloned.Columns["quantity"].DataType = typeof(Int32);
                dtCloned.Columns["price"].DataType = typeof(decimal);
                dtCloned.Columns["discount"].DataType = typeof(decimal);
                dtCloned.Columns["tax"].DataType = typeof(decimal);
                dtCloned.Columns["amount"].DataType = typeof(decimal);
                dtCloned.Columns["invoiceid"].DataType = typeof(string);
                dtCloned.Columns["discounttype"].DataType = typeof(string);
                dtCloned.Columns["size"].DataType = typeof(string);
                dtCloned.Columns["carton"].DataType = typeof(string);
                dtCloned.Columns["ClientID"].DataType = typeof(Int32);



                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }

                if (dtCloned.Rows.Count > 0)
                {
                    DataView dataView = dtCloned.DefaultView;
                    dtCloned = dataView.ToTable(true, "product", "quantity", "price", "discount", "tax", "amount", "invoiceid", "discounttype", "size", "carton", "ClientID");
                    postStatus = MergeInvoice(dtCloned, connection);
                }

            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw ex;
            }
            return postStatus;
        }
        public static int MergeInvoice(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertPurOrdList", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_ARInvoiceList", data);
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
        public static int InsertInvoice(PurchaseObjectsVietnam objInvoice, string connection)
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
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
                           new SqlParameter("@buyer", SqlDbType.Int) { Value = objInvoice.Consignee},
                           new SqlParameter("@shipper", SqlDbType.Int) { Value = objInvoice.Shipper},
                           new SqlParameter("@Exporterdate", SqlDbType.VarChar) { Value = objInvoice.ExporterDate},
                           new SqlParameter("@invoice", SqlDbType.VarChar) { Value = objInvoice.Invoice},
                           new SqlParameter("@invoicedate", SqlDbType.VarChar) { Value = objInvoice.Invoicedate},
                           new SqlParameter("@buyersorder", SqlDbType.VarChar) { Value = objInvoice.BuyersOrder},
                           new SqlParameter("@Buyerdate", SqlDbType.VarChar) { Value = objInvoice.BuyerDate},
                           new SqlParameter("@vesselNo", SqlDbType.VarChar) { Value = objInvoice.VesselNo},
                           new SqlParameter("@precarriage", SqlDbType.VarChar) { Value = objInvoice.PreCarriage},
                           new SqlParameter("@placeofReceipt", SqlDbType.VarChar) { Value = objInvoice.PlaceofReceipt},
                           //new SqlParameter("@Subtotal", SqlDbType.Decimal) { Value = objInvoice.Subtotal},
                           new SqlParameter("@Destination", SqlDbType.Int) { Value = objInvoice.Destination},
                           new SqlParameter("@Total", SqlDbType.Decimal) { Value = objInvoice.Total},
                           //new SqlParameter("@container", SqlDbType.VarChar) { Value = objInvoice.Container},
                           //new SqlParameter("@seal", SqlDbType.VarChar) { Value = objInvoice.Seal},
                           new SqlParameter("@portofLoading", SqlDbType.Int) { Value = objInvoice.PortofLoading},
                          new SqlParameter("@portofDischarge", SqlDbType.Int) { Value = objInvoice.PortofDischarge},
                          new SqlParameter("@terms", SqlDbType.Int) { Value = objInvoice.terms},
                          new SqlParameter("@payment", SqlDbType.Int) { Value = objInvoice.Paymentterms},
                          new SqlParameter("@ShipmentDate", SqlDbType.DateTime) { Value = objInvoice.ShipmentDate},
                          //new SqlParameter("@Size", SqlDbType.VarChar) { Value = objInvoice.Size},
                          //new SqlParameter("@declaration", SqlDbType.VarChar) { Value = objInvoice.declaration},
                          new SqlParameter("@Status", SqlDbType.Int) { Value = objInvoice.Status},

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertParchaseOrder", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Invoice" + " " + objInvoice.Invoice + " " + "added", "Invoice List", connection);
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

        public static string GetInvoInVoicdetails(int InvoiceId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                SqlParameter[] sqlParam = {

                     new SqlParameter("@InoiceId", SqlDbType.Int) { Value =InvoiceId },

                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditPurchaseOrder", sqlParam, connection);

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

        public static int UpdateInvoice(PurchaseObjectsVietnam objCustomer, string connection)
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
                           new SqlParameter("@product", SqlDbType.Int) { Value = objCustomer.product},
                           new SqlParameter("@quantity", SqlDbType.Int) { Value = objCustomer.quantity },
                           new SqlParameter("@price", SqlDbType.Decimal) { Value = objCustomer.price },
                           new SqlParameter("@Size", SqlDbType.Decimal) { Value =objCustomer.Size},
                           new SqlParameter("@carton", SqlDbType.NVarChar) { Value = objCustomer.carton},
                           new SqlParameter("@amount", SqlDbType.NVarChar) { Value = objCustomer.amount},
                           new SqlParameter("@invoiceid", SqlDbType.Int) { Value = objCustomer.invoiceid},



                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdatePurchaseCLC", sqlParam, connection);

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
        public static int UpdateARInvoice(PurchaseObjectsVietnam objInvoice, string connection)
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

                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
                           new SqlParameter("@buyer", SqlDbType.Int) { Value = objInvoice.Consignee},
                           new SqlParameter("@shipper", SqlDbType.Int) { Value = objInvoice.Shipper},
                           new SqlParameter("@Exporterdate", SqlDbType.VarChar) { Value = objInvoice.ExporterDate},
                           //new SqlParameter("@invoice", SqlDbType.VarChar) { Value = objInvoice.Invoice},
                           new SqlParameter("@invoicedate", SqlDbType.VarChar) { Value = objInvoice.Invoicedate},
                           new SqlParameter("@buyersorder", SqlDbType.VarChar) { Value = objInvoice.BuyersOrder},
                           new SqlParameter("@Buyerdate", SqlDbType.VarChar) { Value = objInvoice.BuyerDate},
                           new SqlParameter("@vesselNo", SqlDbType.VarChar) { Value = objInvoice.VesselNo},
                           new SqlParameter("@precarriage", SqlDbType.VarChar) { Value = objInvoice.PreCarriage},
                           new SqlParameter("@placeofReceipt", SqlDbType.VarChar) { Value = objInvoice.PlaceofReceipt},
                           //new SqlParameter("@Subtotal", SqlDbType.Decimal) { Value = objInvoice.Subtotal},
                           new SqlParameter("@Destination", SqlDbType.Int) { Value = objInvoice.Destination},
                           new SqlParameter("@Total", SqlDbType.Decimal) { Value = objInvoice.Total},
                           //new SqlParameter("@container", SqlDbType.VarChar) { Value = objInvoice.Container},
                           //new SqlParameter("@seal", SqlDbType.VarChar) { Value = objInvoice.Seal},
                           new SqlParameter("@portofLoading", SqlDbType.Int) { Value = objInvoice.PortofLoading},
                          new SqlParameter("@portofDischarge", SqlDbType.Int) { Value = objInvoice.PortofDischarge},
                          new SqlParameter("@terms", SqlDbType.Int) { Value = objInvoice.terms},
                          new SqlParameter("@payment", SqlDbType.Int) { Value = objInvoice.Paymentterms},
                          new SqlParameter("@ShipmentDate", SqlDbType.DateTime) { Value = objInvoice.ShipmentDate},
                          //new SqlParameter("@Size", SqlDbType.VarChar) { Value = objInvoice.Size},
                          //new SqlParameter("@declaration", SqlDbType.VarChar) { Value = objInvoice.declaration},
                          new SqlParameter("@Status", SqlDbType.Int) { Value = objInvoice.Status},
                          new SqlParameter("@invoiceid", SqlDbType.Int) { Value = objInvoice.invoiceid},

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdatePurchaseOrderInvoice", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Update", "Invoice" + " " + objInvoice.Invoice + " " + "updated", "Invoice List", connection);
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

        public static int DeleteInvoiceData(int InvoiceId, string connection)
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
                      new SqlParameter("@invoiceId", SqlDbType.NVarChar) { Value = InvoiceId },
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_ARDeleteInvoice", sqlParam, connection);

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

        public static string GetCustomerEmaildetails(int customerid, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@customerid", SqlDbType.Int) { Value =customerid },
                     new SqlParameter("@accountID", SqlDbType.Int) { Value =accountID },

                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetICustomerEmaildetails", sqlParam, connection);

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


        public static string GetproductData(string connection, int productid)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                        new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                        new SqlParameter("@productid", SqlDbType.Int) { Value = productid },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("Sp_GetProductList", sqlParam, connection);

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


        public static int InsertCustomer(CustomerarObjects objCustomer, string connection)
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
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objCustomer.Email },
                           new SqlParameter("@addressd", SqlDbType.NVarChar) { Value = objCustomer.CustomerdAddress },
                           new SqlParameter("@cityd", SqlDbType.NVarChar) { Value =objCustomer.Cityd},
                           new SqlParameter("@stated", SqlDbType.NVarChar) { Value = objCustomer.Stated},
                           new SqlParameter("@zipd", SqlDbType.NVarChar) { Value = objCustomer.Zipd},
                           new SqlParameter("@addressb", SqlDbType.NVarChar) { Value = objCustomer.CustomerbAddress},
                           new SqlParameter("@cityb", SqlDbType.NVarChar) { Value = objCustomer.Cityb},
                           new SqlParameter("@stateb", SqlDbType.NVarChar) { Value = objCustomer.Stateb},
                           new SqlParameter("@zipb", SqlDbType.NVarChar) { Value = objCustomer.Zipb},
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                           new SqlParameter("@paymentterm", SqlDbType.Int) { Value = objCustomer.PaymentTerms },
                           new SqlParameter("@paymentmethod", SqlDbType.Int) { Value = objCustomer.PaymentMethod },


                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_ARCreateCustomer", sqlParam, connection);
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


        public static string FetchShipperData(int InvoiceId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                      new SqlParameter("@invoiceId", SqlDbType.NVarChar) { Value = InvoiceId },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetShipperData", sqlParam, connection);

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
        public static string FetchConsigneedata(int InvoiceId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {

                       new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                      new SqlParameter("@invoiceId", SqlDbType.NVarChar) { Value = InvoiceId },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBuyer1Data", sqlParam, connection);

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
