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
using WebApp4Dwolla;

namespace BillManagement.BusinessLogic
{
  public  class PaymentMethodLogics
    {
        public static string FetchPaymentMethodScreenData(int billID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                         new SqlParameter("@billID", SqlDbType.Int) { Value = billID },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetPaymentScreenData", sqlParam, connection);

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


        public static int UpdateVendorReference(int VendorID,string refID, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                             new SqlParameter("@vendorID", SqlDbType.Int) { Value = VendorID },
                             new SqlParameter("@refID", SqlDbType.NVarChar) { Value = refID },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateVendorReferenceID", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int ChangePayedBillStatus(int billID, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                             new SqlParameter("@userID", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@billID", SqlDbType.NVarChar) { Value = billID },

                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdatePayedBillStatus", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int UpdatedwollaTransactions(SendFund FundObj, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                          
                              new SqlParameter("@billId", SqlDbType.Int) { Value = FundObj.BillID },
                               new SqlParameter("@approvedBillID", SqlDbType.Int) { Value = FundObj.ApprovedBillID },
                                new SqlParameter("@fundId", SqlDbType.NVarChar) { Value = FundObj.FundId },
                                new SqlParameter("@bankTransferID", SqlDbType.NVarChar) { Value = FundObj.BankTransferID },
                                 new SqlParameter("@transferredBy", SqlDbType.Int) { Value = accountID },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateDwollaTransaction", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static int InsertDwollaTransactionHistory(SendFund FundObj, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {

                              new SqlParameter("@billID", SqlDbType.Int) { Value = FundObj.BillID },
                               new SqlParameter("@fundFrom", SqlDbType.NVarChar) { Value = FundObj.fundingSource },
                                new SqlParameter("@fundTo", SqlDbType.NVarChar) { Value = FundObj.custid },
                                 new SqlParameter("@fundId", SqlDbType.NVarChar) { Value = FundObj.FundId },
                                    new SqlParameter("@bankTransferID", SqlDbType.NVarChar) { Value = FundObj.BankTransferID },
                                  new SqlParameter("@amount", SqlDbType.Float) { Value = FundObj.Amount },
                                  new SqlParameter("@remarks", SqlDbType.NVarChar) { Value = FundObj.Remarks },
                                  new SqlParameter("@transferredBy", SqlDbType.Int) { Value = accountID },
                                   new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                                   new SqlParameter("@SortID", SqlDbType.Int) { Value = FundObj.SortID },
                                                 };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertDwollaTransaction", sqlParameters, connection);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return postStatus;
        }

        public static string SyncWithDwolla(VendorDetails vendorValues,string connection)
        {
            int postStatus=0;
            string fundId = "";
            string custID = "";
            try
            {
                Vendor vendorDetail = vendorValues.Vendor;
                if (vendorValues.Vendor.VendorID != 0 && vendorValues.VendorBankAccount.AccountNumber != "" && vendorValues.VendorBankAccount.RoutingNumber != "")
                {
                   
                    cdCustomer objCustomer = new cdCustomer();
                    objCustomer.firstName = vendorDetail.FirstName;
                    objCustomer.lastName = "";
                    objCustomer.email = vendorDetail.Email;
                    objCustomer.businessName = vendorDetail.FirstName;
                    custID = DwollaLogics.createCustomer(objCustomer);
                    if (custID != "")
                    {
                        FundSource objFundSurce = new FundSource();
                        objFundSurce.accountNumber = vendorValues.VendorBankAccount.AccountNumber;
                        objFundSurce.routingNumber = vendorValues.VendorBankAccount.RoutingNumber;
                        objFundSurce.name = vendorValues.VendorBankAccount.AccountHolderName;
                        fundId = DwollaLogics.createFundingSource(objFundSurce, custID);
                        SqlParameter[] sqlParametersDwolla = {
                             new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorValues.Vendor.VendorID },
                             new SqlParameter("@custID", SqlDbType.NVarChar) { Value = custID },
                             new SqlParameter("@fundID", SqlDbType.NVarChar) { Value =fundId},
                              };
                        postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateDwollaDetails", sqlParametersDwolla, connection);
                        if (fundId != "")
                        {
                            postStatus = 1;
                        }
                        else
                        {
                            postStatus = 0;
                        }
                    }
                    else
                    {
                        postStatus = 0;
                    }
                }

            }
            catch(Exception ex)
            {
                custID = "";
            }
            return custID;
        }
    }
}
