using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Data.Common;
using System.Configuration;
using System.Data.SqlClient;

namespace ISCLibrary.DataAccessLayer
{
    public class SqlQueryExecutor
    {
        public static int SqlTimeOut = Convert.ToInt32(ConfigurationManager.AppSettings["SqlCommandTimeOut"]);
        public static DataTable Read(string Query, List<SqlParameter> SqlParm, string Connection)
        {
            DbDataAdapter dbDap = null;
            DataTable dt = new DataTable();
            DbCommand command = null;
            DbConnection conn = null;
            if (Query == "" || Query == string.Empty)
            {
                throw new Exception("Read Query is not formed");
            }
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                dbDap = DbFactory.CreateDataAdapter();
                command = DbFactory.CreateCommand();
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command.CommandText = Query;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;

                if (SqlParm != null && SqlParm.Count > 0)
                {
                    command.Parameters.AddRange(SqlParm.ToArray());
                }
                conn.Open();
                dbDap.SelectCommand = command;
                dbDap.Fill(dt);
            }
            catch (DbException exp)
            {
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (dbDap != null)
                {
                    dbDap.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return dt;
        }

        public static DataTable ReadNoParams(string Query, string Connection)
        {
            DbDataAdapter dbDap = null;
            DataTable dt = new DataTable();
            DbCommand command = null;
            DbConnection conn = null;
            if (Query == "" || Query == string.Empty)
            {
                throw new Exception("Read Query is not formed");
            }
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                dbDap = DbFactory.CreateDataAdapter();
                command = DbFactory.CreateCommand();
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command.CommandText = Query;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                conn.Open();
                dbDap.SelectCommand = command;
                dbDap.Fill(dt);
        
            }
            catch (DbException exp)
            {
                
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (dbDap != null)
                {
                    dbDap.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return dt;
        }

        public static int Write(string Query, string Connection)
        {
            DbTransaction tran = null;
            DbConnection conn = null;
            DbCommand command = null;
            int result = 0;
            if (Query == "" || Query == string.Empty)
                throw new Exception("Write / Delete Query is not formed");
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command = DbFactory.CreateCommand();
                command.CommandText = Query;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                conn.Open();
                tran = conn.BeginTransaction();
                command.Transaction = tran;
                result = command.ExecuteNonQuery();
                tran.Commit();
            }
            catch (DbException exp)
            {
                if (tran != null)
                {
                    tran.Rollback();
                }
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (tran != null)
                {
                    tran.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

            }
            return result;
        }

        public static int Write_withParam(string Query, List<SqlParameter> SqlParm, string Connection)
        {
            DbTransaction tran = null;
            DbConnection conn = null;
            DbCommand command = null;
            int result = 0;
            if (Query == "" || Query == string.Empty)
                throw new Exception("Write / Delete Query is not formed");
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command = DbFactory.CreateCommand();
                command.CommandText = Query;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                if (SqlParm != null && SqlParm.Count > 0)
                {
                    command.Parameters.AddRange(SqlParm.ToArray());
                }

                conn.Open();
                tran = conn.BeginTransaction();
                command.Transaction = tran;
                result = command.ExecuteNonQuery();
                tran.Commit();
            }
            catch (Exception exp)
            {
                if (tran != null)
                {
                    tran.Rollback();
                }
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (tran != null)
                {
                    tran.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

            }
            return result;
        }

        #region Execute Stored procedure
        public static DataSet ExecuteStoredProcedure(string StoredProcedureName, SqlParameter[] SqlParm, string Connection)
        {
            DbTransaction tran = null;
            DbConnection conn = null;
            DbCommand command = null;
            DbDataAdapter dbDap = null;
            DataSet ds = new DataSet();
            if (StoredProcedureName == "" || StoredProcedureName == string.Empty)
                throw new Exception("Stored Procedure Name is Empty");
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command = DbFactory.CreateCommand();
                dbDap = DbFactory.CreateDataAdapter();
                command.CommandText = StoredProcedureName;
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                if (SqlParm != null)
                {
                    foreach (SqlParameter par in SqlParm)
                    {
                        command.Parameters.Add(par);
                    }
                }
                conn.Open();
                tran = conn.BeginTransaction();
                command.Transaction = tran;
                dbDap.SelectCommand = command;
                dbDap.Fill(ds);
            }
            catch (DbException exp)
            {
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (tran != null)
                {
                    tran.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }

                if (dbDap != null)
                {
                    dbDap.Dispose();
                }
            }
            return ds;
        }
        public static int Custom_ExecuteWriteStoredProcedure(string StoredProcedureName, SqlParameter[] SqlParm, string Connection)
        {
            DbTransaction tran = null;
            DbConnection conn = null;
            DbCommand command = null;
            int result = 0;
            if (StoredProcedureName == "" || StoredProcedureName == string.Empty)
                throw new Exception("Stored Procedure Name is Empty");
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command = DbFactory.CreateCommand();
                command.CommandText = StoredProcedureName;
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                if (SqlParm != null)
                {
                    foreach (SqlParameter par in SqlParm)
                    {
                        command.Parameters.Add(par);
                    }

                }

                SqlParameter returnParameter = new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 };
                returnParameter.Direction = ParameterDirection.ReturnValue;
                command.Parameters.Add(returnParameter);
                conn.Open();
                tran = conn.BeginTransaction();
                command.Transaction = tran;
                command.ExecuteNonQuery();
                tran.Commit();
                result = (int)returnParameter.Value;
            }
            catch (DbException exp)
            {
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (tran != null)
                {
                    tran.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return result;
        }
        public static int ExecuteWriteStoredProcedure(string StoredProcedureName, SqlParameter[] SqlParm, string Connection)
        {
            DbTransaction tran = null;
            DbConnection conn = null;
            DbCommand command = null;
            int result = 0;
            if (StoredProcedureName == "" || StoredProcedureName == string.Empty)
                throw new Exception("Stored Procedure Name is Empty");
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command = DbFactory.CreateCommand();
                command.CommandText = StoredProcedureName;
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                if (SqlParm != null)
                {
                    foreach (SqlParameter par in SqlParm)
                    {
                        command.Parameters.Add(par);
                    }
                }
                conn.Open();
                tran = conn.BeginTransaction();
                command.Transaction = tran;
                result = command.ExecuteNonQuery();
                tran.Commit();
            }
            catch (DbException exp)
            {
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (tran != null)
                {
                    tran.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return result;
        }

        public static int ExecuteWriteStoredProcedureGl(string StoredProcedureName, SqlParameter[] SqlParm, string Connection)
        {
            DbTransaction tran = null;
            DbConnection conn = null;
            DbCommand command = null;
            int result = 0;
            if (StoredProcedureName == "" || StoredProcedureName == string.Empty)
                throw new Exception("Stored Procedure Name is Empty");
            try
            {
                DbProviderFactory DbFactory = DBFactory.GetDbFactory("System.Data.SqlClient");
                conn = DBFactory.GetConnection(Connection, "System.Data.SqlClient");
                command = DbFactory.CreateCommand();
                command.CommandText = StoredProcedureName;
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = conn;
                command.CommandTimeout = SqlTimeOut;
                if (SqlParm != null)
                {
                    foreach (SqlParameter par in SqlParm)
                    {
                        command.Parameters.Add(par);
                    }
                }
                conn.Open();
                tran = conn.BeginTransaction();
                command.Transaction = tran;
                result = command.ExecuteNonQuery();
                result = (int)command.Parameters["@retVal"].Value;
                tran.Commit();
            }
            catch (DbException exp)
            {
                throw;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (tran != null)
                {
                    tran.Dispose();
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return result;
        }


        #endregion

        #region Bulk Insert from Datatable
        public static int BulkWrite(DataTable dt, string TableName, List<Tuple<string, string>> lstColumnMapping, string Connection)
        {
            int result = 0;
            if (TableName == "" || TableName == string.Empty)
                throw new Exception("Bulk Insert operation failed, Please specify table name to insert");
            SqlConnection objsqlConnection = null;
            SqlBulkCopy objbulk = null;
            try
            {
                objsqlConnection = new SqlConnection(Connection);
                objbulk = new SqlBulkCopy(objsqlConnection);
                objbulk.DestinationTableName = TableName;
                objsqlConnection.Open();
                lstColumnMapping.ForEach(x =>
                {
                    objbulk.ColumnMappings.Add(x.Item1, x.Item2);
                });
                objbulk.WriteToServer(dt);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

                objsqlConnection.Close();
                objbulk.Close();
            }
            return result;
        }

        #endregion
    }
}
