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
   public class BillCategoryLogics
    {

        public static string FetchBillCategoryFilterData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                 
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillCategoryStatus", sqlParam, connection);

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

        public static string GetBillCategoryList(BillListFilter billFilter, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = billFilter.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = billFilter.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = billFilter.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                      new SqlParameter("@billCategory", SqlDbType.NVarChar) { Value = billFilter.Category },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateBillCategory", sqlParam, connection);

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

        public static int SaveBillCategory(BillListFilter billFilter, string connection)
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
                      new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                      new SqlParameter("@billCategory", SqlDbType.NVarChar) { Value = billFilter.Category },
                      new SqlParameter("@description", SqlDbType.NVarChar) { Value = billFilter.Description },
                       new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateBillCategory", sqlParam, connection);

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

        public static int UpdateBillCategory(BillListFilter billFilter, string connection)
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
                      new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                      new SqlParameter("@billCategory", SqlDbType.NVarChar) { Value = billFilter.Category },
                      new SqlParameter("@description", SqlDbType.NVarChar) { Value = billFilter.Description },
                      new SqlParameter("@billCategoryId", SqlDbType.NVarChar) { Value = billFilter.BillCategoryId },
                       new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0},
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateBillCategory", sqlParam, connection);

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

        public static int DeleteBillCategory(int billId, string connection)
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
                      new SqlParameter("@billCategoryId", SqlDbType.Int) { Value =billId },
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteBillCategory", sqlParam, connection);

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

        public static string FetchBillCategories(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillCategoryList", sqlParam, connection);

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


        public static int DeleteCategory(int categoryID, string connection)
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


                           new SqlParameter("@categoryId", SqlDbType.Int) { Value = categoryID },
                           new SqlParameter("@clientId", SqlDbType.Int) { Value =clientID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteGlCategory", sqlParam, connection);

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

        public static int SaveBulkExcelData(List<GLCode> excelGtList, string connection)
        {
            int postStatus = 0;
            try
            {
                        int PostStatus = 0;
                        int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                        int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                        SqlParameter[] sqlActionsParameter =
                                           {
                                     new SqlParameter("@clientId", SqlDbType.NVarChar) { Value = ClientID},
                                     new SqlParameter("@glNumber", SqlDbType.NVarChar) { Value = excelGtList[0].GLNumber },
                                     new SqlParameter("@glDescription", SqlDbType.NVarChar) { Value = excelGtList[0].GLDescription },
                                     new SqlParameter("@rowStatus", SqlDbType.NVarChar) { Value = excelGtList[0].RowStatus },
                                     new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@gategoryname", SqlDbType.NVarChar) { Value = excelGtList[0].Category },
                                     new SqlParameter("@retVal", SqlDbType.Int) { Direction = ParameterDirection.Output },
            
                                    
                            };

                        PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedureGl("SP_InsertCategoryGlDetails", sqlActionsParameter, connection);
                excelGtList.RemoveAt(0);

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                DataTable existingGLCode = new DataTable();
                DataTable dt = ToDataTable(excelGtList);

                System.Data.DataColumn newColumn = new System.Data.DataColumn("Mastercode", typeof(System.String));
                newColumn.DefaultValue = PostStatus;
                dt.Columns.Add(newColumn);

                
                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["ClientID"].DataType = typeof(Int32);
                dtCloned.Columns["SubcategoryGL"].DataType = typeof(Int32);
                dtCloned.Columns["GLDescription"].DataType = typeof(string);
                dtCloned.Columns["RowStatus"].DataType = typeof(string);
                dtCloned.Columns["CreatedBy"].DataType = typeof(string);
                dtCloned.Columns["Mastercode"].DataType = typeof(Int32);
                dtCloned.Columns["IsMasterGLCode"].DataType = typeof(string);
                dtCloned.Columns["Category"].DataType = typeof(string);

                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }
                
                if (dtCloned.Rows.Count > 0)
                {
                    DataView dataView = dtCloned.DefaultView;
                    dtCloned = dataView.ToTable(true, "ClientID", "SubcategoryGL", "GLDescription", "RowStatus", "CreatedBy", "Mastercode", "IsMasterGLCode", "Category");
                    postStatus = MergeGlCodes(dtCloned, connection);
                }

            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw ex;
            }
            return postStatus;
        }
        public static int SaveBulkExcelData(List<InvoiceLst> excelGtList, string connection)
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
                DataTable dt = ToDataTable(excelGtList);

                //System.Data.DataColumn newColumn = new System.Data.DataColumn("Mastercode", typeof(System.String));
                //newColumn.DefaultValue = PostStatus;
                //dt.Columns.Add(newColumn);

                
                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["Lineitemnno"].DataType = typeof(string);
                dtCloned.Columns["InvID"].DataType = typeof(string);
                dtCloned.Columns["OrderId"].DataType = typeof(string);
                dtCloned.Columns["Amount"].DataType = typeof(decimal);
                dtCloned.Columns["Discount"].DataType = typeof(decimal);
                dtCloned.Columns["ClientId"].DataType = typeof(Int32);
                //dtCloned.Columns["Mastercode"].DataType = typeof(Int32);
                //dtCloned.Columns["IsMasterGLCode"].DataType = typeof(string);
                //dtCloned.Columns["Category"].DataType = typeof(string);

                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }
                
                if (dtCloned.Rows.Count > 0)
                {
                    DataView dataView = dtCloned.DefaultView;
                    dtCloned = dataView.ToTable(true, "Lineitemnno", "InvID", "OrderId", "Amount", "Discount", "ClientId");
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
        public static int SaveBulkExcelData(List<InvoiceLstdistinct> excelGtList, string connection)
        {
            int postStatus = 0;
            try
            {
                        int PostStatus = 0;
                        int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                        int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                DataTable existingGLCode = new DataTable();
                DataTable dt = ToDataTable(excelGtList);

                //System.Data.DataColumn newColumn = new System.Data.DataColumn("Mastercode", typeof(System.String));
                //newColumn.DefaultValue = PostStatus;
                //dt.Columns.Add(newColumn);

                
                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["CustomerID"].DataType = typeof(Int32);
                dtCloned.Columns["InvID"].DataType = typeof(string);
                dtCloned.Columns["Description"].DataType = typeof(string);
                dtCloned.Columns["InvoiceDate"].DataType = typeof(string);
                dtCloned.Columns["TermCode"].DataType = typeof(string);
                dtCloned.Columns["CreatedBy"].DataType = typeof(string);
                dtCloned.Columns["ClientId"].DataType = typeof(string);
                dtCloned.Columns["Amount"].DataType = typeof(string);
                

                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }
                
                if (dtCloned.Rows.Count > 0)
                {
                    DataView dataView = dtCloned.DefaultView;
                    dtCloned = dataView.ToTable(true, "CustomerID", "InvID", "Description", "InvoiceDate", "TermCode", "CreatedBy", "ClientId", "Amount");
                    postStatus = MergeDistinctInvoice(dtCloned, connection);
                    int Poststatus = ApplicationUsers.InsertAuditlog("Created", "New Invoice" + " " + "added", "Invoice List", connection);
                }

            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw ex;
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

        public static DataTable GetExistingGLCodes(int ClientID, string Connection)
        {
            DataTable DT = new DataTable();

            try
            {
                string Query = string.Empty;
                Query += @"Select GLNumber,GLDescription FROM Tbl_GlCodes Where ClientID = " + ClientID;
                DT = SqlQueryExecutor.ReadNoParams(Query, Connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return DT;
        }

        public static int MergeGlCodes(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertCategory", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_Category", data);
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
        public static int MergeInvoice(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertInvoiceList", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_InvoiceList", data);
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
        public static int MergeDistinctInvoice(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertInvoiceDistinct", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_Invoicedistinct", data);
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
    }
}
