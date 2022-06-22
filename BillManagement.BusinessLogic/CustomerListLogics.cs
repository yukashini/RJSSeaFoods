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
using BillManagement.BusinessLogic;


namespace BillManagement.BusinessLogic
{
 public  class CustomerListLogics
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCustomerScreenMasterData", sqlParam, connection);

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

        public static string GetCustomerList(BillListFilter customerListFilter, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@start", SqlDbType.Int) { Value = customerListFilter.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = customerListFilter.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = customerListFilter.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                      new SqlParameter("@customerName", SqlDbType.NVarChar) { Value = customerListFilter.CustomerName },
                      new SqlParameter("@expenses", SqlDbType.Float) { Value = customerListFilter.Expense  },
                      new SqlParameter("@associatedProject", SqlDbType.Int) { Value = customerListFilter.AssociatedProject },
                      new SqlParameter("@associatedBill", SqlDbType.Int) { Value = customerListFilter.AssociatedBill },
                      
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateCustomers", sqlParam, connection);

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

        public static int DeleteCustomerData(int customerID, string connection)
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
                      new SqlParameter("@customerId", SqlDbType.NVarChar) { Value = customerID },
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


        public static int SaveBulkExcelData(List<CustomerLists> customerListImports, string connection)
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
                DataTable dt = ToDataTable(customerListImports);

                //System.Data.DataColumn newColumn = new System.Data.DataColumn("Mastercode", typeof(System.String));
                //newColumn.DefaultValue = PostStatus;
                //dt.Columns.Add(newColumn);


                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["CustomerName"].DataType = typeof(string);
                dtCloned.Columns["Address"].DataType = typeof(string);
                dtCloned.Columns["Email"].DataType = typeof(string);
                dtCloned.Columns["ClientId"].DataType = typeof(Int32);
                

                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }

                if (dtCloned.Rows.Count > 0)
                {
                    DataView dataView = dtCloned.DefaultView;
                    dtCloned = dataView.ToTable(true, "CustomerName", "Address", "Email", "ClientId");
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

        public static int MergeInvoice(DataTable data, string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertCustomerList", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_CustomerList", data);
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
