using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using ISCLibrary.Utilities;
using System.Data.SqlClient;
using System.Data;

namespace BillManagement.BusinessLogic
{
  public  class KeyLists
    {
        public static DataSet GetMasterDetailsData(string connection)
        {
            DataSet ds = new DataSet();
            try
            {
               
                //SqlParameter[] sqlParam =
                //    new SqlParameter("@ClientId", SqlDbType.Int) { Value = clientID },
                //    new SqlParameter("@AccountId", SqlDbType.Int) { Value = accountID }
                //ds =SqlQueryExecutor.ExecuteStoredProcedure("SP_GetUploadBill_FilterList", sqlParam, connection);
               
            }
            catch(Exception ex)
            {

            }
            return ds;
        }
    }
}
