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
  public  class AccountsPayableList
    {
        public static DataSet GetMasterList(string connection)
        {
            DataSet ds = new DataSet();
            try
            {

                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static DataSet GetPayableDataList(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientId", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetAccountsPayableDataList", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
