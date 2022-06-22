using BillManagement.BussinessObjects;
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
  public  class BillList
    {

        public static DataSet FetchBillScreenData(int kpiStatus,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },
                    new SqlParameter("@userRoleID", SqlDbType.Int) { Value = UserRoleId },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                     new SqlParameter("@kpiStatus", SqlDbType.Int) { Value = kpiStatus }

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillsScreenData", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public static int MultiBillSubmit(List<MultiBill> billList,string connection)
        {
            int postStatus = 0;
            try
            {

                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                if (billList.Count > 0)
                {
                    foreach(MultiBill bill in billList)
                    {
                        SqlParameter[]
                        sqlParam = {
                            new SqlParameter("@userRoleId", SqlDbType.Int) { Value = UserRoleId },
                            new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },
                            new SqlParameter("@billID", SqlDbType.Int) { Value =  bill.BillId},
                          
                        };
                        postStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_BillSubmit", sqlParam, connection);
                    }
                }
               
                
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static string GetUserBillList(BillListFilter billFilter, string connection)
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
                     new SqlParameter("@accountID", SqlDbType.Int) { Value = accountID },
                     new SqlParameter("@statusCondition", SqlDbType.Int) { Value = billFilter.StatusCondition },
                     new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                     new SqlParameter("@isRecurring", SqlDbType.Int) { Value = billFilter.IsRecurring },
                     new SqlParameter("@vendor", SqlDbType.Int) { Value = billFilter.VendorID },
                     new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value = billFilter.InvoiceNumber },
                     new SqlParameter("@dueFrom", SqlDbType.NVarChar) { Value = billFilter.DueDateFrom },
                     new SqlParameter("@dueTo", SqlDbType.NVarChar) { Value = billFilter.DueDateTo },
                     new SqlParameter("@dStatus", SqlDbType.Int) { Value = billFilter.Dstatus },
                     new SqlParameter("@kpiStatus", SqlDbType.Int) { Value = billFilter.KpiStatus },
                     new SqlParameter("@Isallbill", SqlDbType.Int) { Value = billFilter.Isallbill },
               
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateBillList", sqlParam, connection);

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

        public static int InsertBillcommand(int Billid,string commantd,string Action,string Status,int rowid, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@BillID", SqlDbType.Int) { Value = Billid},
                                     new SqlParameter("@BillCommant", SqlDbType.NVarChar) { Value = commantd},
                                     new SqlParameter("@AccountId", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@Action", SqlDbType.NVarChar) { Value = Action },
                                     new SqlParameter("@Status", SqlDbType.NVarChar) { Value = Status },
                                     new SqlParameter("@RowID", SqlDbType.NVarChar) { Value = rowid },
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertBillCommandList", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static string GetSplitBillList(string Billid, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@Billid", SqlDbType.Int) { Value = Billid },
                     
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetSplitBillList", sqlParam, connection);
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


        public static string GetUserHomeBillList(BillListFilter billFilter, string connection)
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
                     new SqlParameter("@accountID", SqlDbType.Int) { Value = accountID },
                     new SqlParameter("@status", SqlDbType.Int) { Value = billFilter.Status },
                     new SqlParameter("@isOverDue", SqlDbType.Int) { Value = billFilter.IsOverDue },
                     new SqlParameter("@startDate", SqlDbType.NVarChar) { Value = billFilter.StartDate },
                     new SqlParameter("@endDate", SqlDbType.NVarChar) { Value = billFilter.EndDate },
                       new SqlParameter("@kpiStatus", SqlDbType.NVarChar) { Value = billFilter.KpiStatus },
                        new SqlParameter("@isDueFilter", SqlDbType.NVarChar) { Value = billFilter.IsDueFilter },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaginateUserHomeBillList", sqlParam, connection);

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

        public static string GetBillcomments(int billId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                     new SqlParameter("@billId", SqlDbType.Int) { Value =billId },
                     new SqlParameter("@accountId", SqlDbType.Int) { Value =accountID },
                   
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("Sp_GetBillComments", sqlParam, connection);

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
