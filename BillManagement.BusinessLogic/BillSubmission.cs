using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ISCLibrary.DataAccessLayer;
using ISCLibrary.Utilities;
using BillManagement.BussinessObjects;
using System.Configuration;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace BillManagement.BusinessLogic
{
    public class BillSubmission
    {
        public static int BillEditAndSubmit(List<Bill_Custom_Breakage> CustomBill, string connection)
        {
            int PostStatus = 0;
            int billID = 0;
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                if (CustomBill.Count > 0)
                {


                    foreach (Bill_Custom_Breakage _bill in CustomBill)
                    {
                        SqlParameter[] sqlParameters = {
                            new SqlParameter("@billId", SqlDbType.Int) { Value =  _bill.BillID },
                            new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = _bill.VendorName },
                            new SqlParameter("@billDate", SqlDbType.DateTime) { Value = _bill.BillDate },
                            new SqlParameter("@amount", SqlDbType.Float) { Value = _bill.Amount },
                            new SqlParameter("@invoiceNumber", SqlDbType.NVarChar) { Value = _bill.InvoiceNumber },
                            new SqlParameter("@dueDate", SqlDbType.DateTime) { Value = _bill.DueDate },
                            new SqlParameter("@category", SqlDbType.Int) { Value = _bill.Category },
                            new SqlParameter("@notes", SqlDbType.NVarChar) { Value = _bill.Notes },
                            new SqlParameter("@paymentTerms", SqlDbType.Int) { Value = _bill.PaymentTerms },
                            new SqlParameter("@description", SqlDbType.NVarChar) { Value = _bill.Description },
                            new SqlParameter("@isSplited", SqlDbType.Int) { Value = _bill.IsSplitted },
                            new SqlParameter("@status", SqlDbType.Int) { Value = _bill.Status },
                            new SqlParameter("@accountId", SqlDbType.Int) { Value =AccountID },
                            new SqlParameter("@clientId", SqlDbType.Int) { Value =ClientID },
                             new SqlParameter("@purchaseOrder", SqlDbType.NVarChar) { Value =_bill.PurchaseOrder },
                             new SqlParameter("@comments", SqlDbType.NVarChar) { Value =_bill.UserComment },
                        };
                        PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_SubmitBill", sqlParameters, connection);

                        if (_bill.lstBillBreakage.Count > 0)
                        {
                            foreach (BillBreakage splitedBill in _bill.lstBillBreakage)
                            {
                                SqlParameter[] sqlBillBreakageParameter =
                                   {
                                        new SqlParameter("@billId", SqlDbType.Int) { Value = _bill.BillID },
                                        new SqlParameter("@billBreakageId", SqlDbType.Int) { Value = splitedBill.BillBreakageID },
                                        new SqlParameter("@amount", SqlDbType.Float) { Value = splitedBill.Amount },
                                        new SqlParameter("@description", SqlDbType.NVarChar) { Value = splitedBill.Description },
                                        new SqlParameter("@billType", SqlDbType.Int) { Value = splitedBill.BillType },
                                        new SqlParameter("@status", SqlDbType.Int) { Value = splitedBill.Status },
                                        new SqlParameter("@acconutId", SqlDbType.Int) { Value = AccountID },
                                         new SqlParameter("@actionKey", SqlDbType.Int) { Value = splitedBill.ActionKey }
                            };
                                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_Update_BillBreakage", sqlBillBreakageParameter, connection);
                            }
                        }

                    }

                }
            }
            catch (Exception ex)
            {

            }
            return PostStatus;
        }

        public static DataSet GetEditBillData(int billID, string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                    new SqlParameter("@accountID", SqlDbType.Int) { Value = AccountID },
                 new SqlParameter("@billID", SqlDbType.Int) { Value = billID }};
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetBillSubmisssionDetails", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;

        }
    }
}
