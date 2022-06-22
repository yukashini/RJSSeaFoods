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
   public class Initial
    {
        public static DataSet FetchRolePermssions(string connection)

        {
            DataSet ds = new DataSet();
            try
            {
                int applicationRole = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@roleId", SqlDbType.Int) { Value = applicationRole},
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID}
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetRolePermission", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int GetPriorityScreen()
        {
            
            int priority = 0;
            try
            {
                DataTable screenData = new DataTable();
            }
            catch(Exception ex)
            {

            }
            return priority;
        }

    }
}
