using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BillManagement.BusinessLogic
{
  public  class GLCodeLogics
    {
        public static string FetchGLListData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetClientGlCodes", sqlParam, connection);

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

        public static int DeleteClientGLCode(int glCode, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@glID", SqlDbType.NVarChar) { Value = glCode },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteClientGL", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int SaveBulkExcelData(List<GLCode> excelGtList, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                DataTable existingGLCode = new DataTable();
                DataTable dt = ToDataTable(excelGtList);
                DataTable dtCloned = dt.Clone();
                //Changing column types to int
                dtCloned.Columns["IdentityID"].DataType = typeof(Int32);
                dtCloned.Columns["ClientID"].DataType = typeof(Int32);
                dtCloned.Columns["GLNumber"].DataType = typeof(string);
                dtCloned.Columns["GLDescription"].DataType = typeof(string);
                dtCloned.Columns["RowStatus"].DataType = typeof(string);
                dtCloned.Columns["CreatedBy"].DataType = typeof(Int32);
                dtCloned.Columns["CreatedOn"].DataType = typeof(string);
                dtCloned.Columns["UpdatedBy"].DataType = typeof(Int32);
                dtCloned.Columns["UpdatedOn"].DataType = typeof(string);
                foreach (DataRow row in dt.Rows)
                {
                    dtCloned.ImportRow(row);
                }
              
                
                if (dtCloned.Rows.Count > 0)
                {
                   DataView dataView = dtCloned.DefaultView;
                   dtCloned = dataView.ToTable(true, "IdentityID", "ClientID", "GLNumber", "GLDescription", "RowStatus", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn");
                   postStatus = MergeGlCodes(dtCloned,connection);
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

        public  static int GLCodeBulkInsert(DataTable dtCloned,DataTable GlData,string connection)
        {
            int postStaus = 1;
            try
            {
                foreach (DataRow row in GlData.Rows)
                {
                    dtCloned.ImportRow(row);
                }
                if (GlData.Rows.Count > 0)
                {
                    using (SqlConnection con = new SqlConnection(connection))
                    {
                        using (SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(con))
                        {
                            //Set the database table name
                            sqlBulkCopy.DestinationTableName = "dbo.Tbl_GlCodes";
                            //[OPTIONAL]: Map the DataTable columns with that of the database table
                            sqlBulkCopy.ColumnMappings.Add("ClientID", "ClientID");
                            sqlBulkCopy.ColumnMappings.Add("GLNumber", "GLNumber");
                            sqlBulkCopy.ColumnMappings.Add("GLDescription", "GLDescription");
                            sqlBulkCopy.ColumnMappings.Add("CreatedBy", "CreatedBy");
                            sqlBulkCopy.ColumnMappings.Add("CreatedOn", "CreatedOn");
                            con.Open();
                            sqlBulkCopy.WriteToServer(dtCloned);
                            con.Close();
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                postStaus = 0;
            }
            return postStaus;
        }

        public static int MergeGlCodes(DataTable data,string connection)
        {
            int postStatus = 1;
            try
            {
                SqlConnection dbConnection = new SqlConnection(connection);
                dbConnection.Open();
                SqlCommand cmd = new SqlCommand("SP_InsertBLCodes", dbConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParam = cmd.Parameters.AddWithValue("@tbl_GlCodes", data);
                sqlParam.SqlDbType = SqlDbType.Structured;
                cmd.ExecuteNonQuery();
                dbConnection.Close();

            }
            catch(Exception ex)
            {
                postStatus = 0;
            }
            return postStatus;
        }

        public static string GetGLList(BillListFilter billFilter, string connection)
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
                    
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateGLCodes", sqlParam, connection);

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

        public static int InsertGlCategory(GLCode glList,string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@catgoryName", SqlDbType.NVarChar) { Value = glList.GlCategory },
                             new SqlParameter("@glCode", SqlDbType.NVarChar) { Value = glList.GLNumber },
                             new SqlParameter("@glDescription", SqlDbType.NVarChar) { Value = glList.GLDescription },
                             new SqlParameter("@status", SqlDbType.Int) { Value = glList.Status },
                             new SqlParameter("@createdBy", SqlDbType.NVarChar) { Value = accountID },
                             new SqlParameter("@clientID", SqlDbType.NVarChar) { Value = clientID },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertGLCategory", sqlParameters, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Category " + " " + glList.GlCategory + "" + " " + "added", "Category", connection);
                if (glList.lstSubCategories.Count > 0 && postStatus != 0)
                {
                    int insertedSubCategoryID = InsertSubCategory(glList.lstSubCategories, postStatus,connection);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int UpdateGlCategory(GLCode glList, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@catgoryName", SqlDbType.NVarChar) { Value = glList.GlCategory },
                             new SqlParameter("@glCode", SqlDbType.NVarChar) { Value = glList.GLNumber },
                             new SqlParameter("@glDescription", SqlDbType.NVarChar) { Value = glList.GLDescription },
                             new SqlParameter("@status", SqlDbType.Int) { Value = glList.Status },
                             new SqlParameter("@updatedBy", SqlDbType.NVarChar) { Value = accountID },
                             new SqlParameter("@glIdentity", SqlDbType.NVarChar) { Value = glList.IdentityID },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateGLCategory", sqlParameters, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified " + " " + glList.GlCategory + "", "Category", connection);
                if (glList.lstSubCategories.Count > 0 && glList.IdentityID != 0)
                {
                    int insertedSubCategoryID = InsertSubCategory(glList.lstSubCategories, glList.IdentityID, connection);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int InsertSubCategory(List<SubCaetgory> lstSubCategory,int categoryID, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                foreach (SubCaetgory subCategory in lstSubCategory)
                {
                    SqlParameter[] sqlParameters = {
                             new SqlParameter("@categoryID", SqlDbType.Int) { Value =categoryID },
                             new SqlParameter("@glCode", SqlDbType.NVarChar) { Value = subCategory.GLNumber },
                             new SqlParameter("@glDescription", SqlDbType.NVarChar) { Value = subCategory.SubCategory },
                             new SqlParameter("@status", SqlDbType.Int) { Value = subCategory.Status },
                             new SqlParameter("@categoryName", SqlDbType.NVarChar) { Value = subCategory.GlCategory },
                             new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

                              };
                    postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertGLSubCategory", sqlParameters, connection);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static string FetchCategoryDetail(int catgoryID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@glIdentityID", SqlDbType.Int) { Value = catgoryID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetGLCategoryEditDetails", sqlParam, connection);

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

        public static string FecthExistingGL(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetExistingGlCodes", sqlParam, connection);

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
    }
}
