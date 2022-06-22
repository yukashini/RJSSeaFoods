using ISCLibrary.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BusinessLogic
{
   public class BillsOrInvoiceList
    {
        public static DataSet GetMasterDetailsData(int clientID, int accountID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@ClientId",SqlDbType.Int) {Value=clientID},
                    new SqlParameter("@AccountId",SqlDbType.Int) {Value=accountID}
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillOrInVoiceMasterData", sqlParam, connection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static DataSet GetInvoiceData(int accountId,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlParameter[] sqlParam =
                {
                    new SqlParameter("@accountId",SqlDbType.Int) {Value=accountId }
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillsorInvoiceBillList", sqlParam, connection);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return ds;
        }

    }
}
