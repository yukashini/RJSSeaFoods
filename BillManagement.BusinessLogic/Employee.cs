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
    public class EmployeeDTO
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
                     new SqlParameter("@orderby", SqlDbType.VarChar) { Value = List.OrderBy },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },                 
                 };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_InvoiceEmployeelist300", sqlParam, connection);
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

        public static string FetchEmployeerInfoScreenData(int EmployeeId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@EMP_ID", SqlDbType.Int) { Value = EmployeeId },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEmployeeInfo", sqlParam, connection);

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

        public static DataSet GetInvoiceData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEmployeeIndexDataList", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

    }
}
