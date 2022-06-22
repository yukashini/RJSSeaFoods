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
   public class VendorProcessLogics
    {
        public static int InsertVendor(VendorDetails vendorValues,string connection)
        {
            int postStatus = 0;
            int vendorId = 0;
            try
            {
                Vendor vendorDetail = vendorValues.Vendor;
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = vendorDetail.VendorName },
                             new SqlParameter("@firstName", SqlDbType.NVarChar) { Value = vendorDetail.FirstName },
                             new SqlParameter("@lastName", SqlDbType.NVarChar) { Value = vendorDetail.LastName },
                             new SqlParameter("@email", SqlDbType.NVarChar) { Value = vendorDetail.Email },
                             new SqlParameter("@addresLineOne", SqlDbType.NVarChar) { Value = vendorDetail.AddressLineOne },
                             new SqlParameter("@addresLineTwo", SqlDbType.NVarChar) { Value = vendorDetail.AddressLineTwo },
                             new SqlParameter("@city", SqlDbType.NVarChar) { Value = vendorDetail.City },
                             new SqlParameter("@state", SqlDbType.NVarChar) { Value = vendorDetail.State },
                             new SqlParameter("@zip", SqlDbType.NVarChar) { Value = vendorDetail.PostalCode },
                             new SqlParameter("@contact", SqlDbType.NVarChar) { Value = vendorDetail.Phone },
                             new SqlParameter("@SSN", SqlDbType.NVarChar) { Value = vendorDetail.SSNNumber },
                             new SqlParameter("@vendorType", SqlDbType.Int) { Value =vendorDetail.VendorType },
                             new SqlParameter("@prefferedPaymentMethod", SqlDbType.Int) { Value = vendorDetail.PrefferedPaymentMethod },
                             new SqlParameter("@taxId", SqlDbType.NVarChar) { Value = vendorDetail.TaxId },
                             new SqlParameter("@paymentTerm", SqlDbType.Int) { Value = vendorDetail.PaymentTerm },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@referenceID", SqlDbType.NVarChar) { Value = vendorDetail.ReferenceID },
                             new SqlParameter("@vendorLogo", SqlDbType.NVarChar) { Value = vendorDetail.VendorLogo },
                             new SqlParameter("@url", SqlDbType.NVarChar) { Value = vendorDetail.WebsiteURL },
                             new SqlParameter("@leadTime", SqlDbType.NVarChar) { Value = vendorDetail.LeadTimeDays },
                             new SqlParameter("@paypalEmailAddress", SqlDbType.NVarChar) { Value = vendorDetail.PayPalEmailAddress },
                             new SqlParameter("@paypalMobileNumber", SqlDbType.NVarChar) { Value = vendorDetail.PayPalMobile },
                             new SqlParameter("@GLCode", SqlDbType.NVarChar) { Value = vendorDetail.GLCode },
                             new SqlParameter("@externalNumber", SqlDbType.NVarChar) { Value = vendorDetail.ExternalNumber },
                             new SqlParameter("@RetVal", SqlDbType.Int) { Value = 0 },
                              };
                vendorId = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertVendor", sqlParameters, connection);
                if (vendorId != 0)
                {
                 postStatus= VendorBankAccountProcess(vendorValues.VendorBankAccount, vendorId, connection);
                }
                if (vendorId != 0 && vendorValues.VendorBankAccount.AccountNumber !=""&& vendorValues.VendorBankAccount.RoutingNumber != "")
                {
                    string fundId = "";
                    string custID = "";
                  
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
                        fundId = DwollaLogics.createFundingSource(objFundSurce,custID);
                        SqlParameter[] sqlParametersDwolla = {
                             new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorId },
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
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static int InsertVendorMandatories(VendorDetails vendorValues, string connection)
        {
            int postStatus = 0;
            try
            {
                Vendor vendorDetail = vendorValues.Vendor;
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = vendorDetail.VendorName },
                             new SqlParameter("@email", SqlDbType.NVarChar) { Value = vendorDetail.Email },
                             new SqlParameter("@contact", SqlDbType.NVarChar) { Value = vendorDetail.Phone },
                             new SqlParameter("@prefferedPaymentMethod", SqlDbType.Int) { Value = vendorDetail.PrefferedPaymentMethod },
                             new SqlParameter("@paymentTerm", SqlDbType.Int) { Value = vendorDetail.PaymentTerm },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@GLCode", SqlDbType.NVarChar) { Value = vendorDetail.GLCode },
                             new SqlParameter("@RetVal", SqlDbType.Int) { Value = 0 },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertVendorMandatories", sqlParameters, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Vendor" + " " + vendorDetail.VendorName + " " + "added", "Upload Bill", connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }

        public static int VendorBankAccountProcess(VendorBankAccount vendorBankDetails,int vendorId, string connection)
        {
            int postStatus = 0;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@accountHolderName", SqlDbType.NVarChar) { Value = vendorBankDetails.AccountHolderName },
                             new SqlParameter("@accountNumber", SqlDbType.NVarChar) { Value = vendorBankDetails.AccountNumber },
                             new SqlParameter("@routingNumber", SqlDbType.NVarChar) { Value = vendorBankDetails.RoutingNumber },
                             new SqlParameter("@isBankAccountAdded", SqlDbType.Int) { Value =vendorBankDetails.isBankAccountAdded },
                             new SqlParameter("@bankAccountIdentityID", SqlDbType.Int) { Value =vendorBankDetails.IdentityID },
                             new SqlParameter("@createdBy", SqlDbType.Int) { Value =accountID },
                             new SqlParameter("@vendorID", SqlDbType.Int) { Value =vendorId },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID},
                               new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertVendorBankAccount", sqlParameters, connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }


        public static int UpdateVendorDetails(VendorDetails vendorValues, string connection)
        {
            int postStatus = 0;
            try
            {
                Vendor vendorDetail = vendorValues.Vendor;
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@vendorName", SqlDbType.NVarChar) { Value = vendorDetail.VendorName },
                             new SqlParameter("@firstName", SqlDbType.NVarChar) { Value = vendorDetail.FirstName },
                             new SqlParameter("@lastName", SqlDbType.NVarChar) { Value = vendorDetail.LastName },
                             new SqlParameter("@email", SqlDbType.NVarChar) { Value = vendorDetail.Email },
                             new SqlParameter("@addresLineOne", SqlDbType.NVarChar) { Value = vendorDetail.AddressLineOne },
                             new SqlParameter("@addresLineTwo", SqlDbType.NVarChar) { Value = vendorDetail.AddressLineTwo },
                             new SqlParameter("@city", SqlDbType.NVarChar) { Value = vendorDetail.City },
                             new SqlParameter("@state", SqlDbType.NVarChar) { Value = vendorDetail.State },
                             new SqlParameter("@zip", SqlDbType.NVarChar) { Value = vendorDetail.PostalCode },
                             new SqlParameter("@contact", SqlDbType.NVarChar) { Value = vendorDetail.Phone },
                             new SqlParameter("@SSN", SqlDbType.NVarChar) { Value = vendorDetail.SSNNumber },
                             new SqlParameter("@vendorType", SqlDbType.Int) { Value = vendorDetail.VendorType },
                             new SqlParameter("@prefferedPaymentMethod", SqlDbType.Int) { Value = vendorDetail.PrefferedPaymentMethod },
                             new SqlParameter("@paymentTerm", SqlDbType.Int) { Value = vendorDetail.PaymentTerm },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                             new SqlParameter("@updatedBy", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@vendorID", SqlDbType.Int) { Value =  vendorDetail.VendorID  },
                             new SqlParameter("@referenceID", SqlDbType.NVarChar) { Value = vendorDetail.ReferenceID },
                             new SqlParameter("@vendorLogo", SqlDbType.NVarChar) { Value = vendorDetail.VendorLogo },
                             new SqlParameter("@taxId", SqlDbType.NVarChar) { Value = vendorDetail.TaxId },
                             new SqlParameter("@url", SqlDbType.NVarChar) { Value = vendorDetail.WebsiteURL },
                             new SqlParameter("@leadTime", SqlDbType.NVarChar) { Value = vendorDetail.LeadTimeDays },
                              new SqlParameter("@paypalEmailAddress", SqlDbType.NVarChar) { Value = vendorDetail.PayPalEmailAddress },
                             new SqlParameter("@paypalMobileNumber", SqlDbType.NVarChar) { Value = vendorDetail.PayPalMobile },
                             new SqlParameter("@GLCode", SqlDbType.NVarChar) { Value = vendorDetail.GLCode },
                             new SqlParameter("@externalNumber", SqlDbType.NVarChar) { Value = vendorDetail.ExternalNumber },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateVendor", sqlParameters, connection);
               
                postStatus = VendorBankAccountProcess(vendorValues.VendorBankAccount, vendorDetail.VendorID, connection);

                if (vendorDetail.DwollaCustomerID == "" && vendorDetail.VendorID != 0 && vendorValues.VendorBankAccount.AccountNumber != "" && vendorValues.VendorBankAccount.RoutingNumber != "")
                {
                    string fundId = "";
                    string custID = "";

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
                             new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorDetail.VendorID },
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
                else if (vendorDetail.DwollaCustomerID != "" && vendorDetail.VendorID != 0 && vendorValues.VendorBankAccount.AccountNumber != "" && vendorValues.VendorBankAccount.RoutingNumber != "")
                {
                    //Dwolla Update
                    string fundId = "";
                    string custID = "";

                    cdCustomer objCustomer = new cdCustomer();
                    objCustomer.firstName = vendorDetail.FirstName;
                    objCustomer.lastName = "";
                    objCustomer.email = vendorDetail.Email;
                    objCustomer.businessName = vendorDetail.FirstName;
                    objCustomer.custId = vendorDetail.DwollaCustomerID;
                    custID = DwollaLogics.upateCustomer(objCustomer);
                    if (custID != "")
                    {
                        FundSource objFundSurce = new FundSource();
                        objFundSurce.fundId = vendorDetail.DwollaFundID;
                        objFundSurce.name = vendorValues.VendorBankAccount.AccountHolderName;
                        fundId = DwollaLogics.updateFundingSource(objFundSurce);
                        //SqlParameter[] sqlParametersDwolla = {
                        //     new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorDetail.VendorID },
                        //     new SqlParameter("@custID", SqlDbType.NVarChar) { Value = custID },
                        //     new SqlParameter("@fundID", SqlDbType.NVarChar) { Value =fundId},
                        //      };
                        //postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateDwollaDetails", sqlParametersDwolla, connection);
                        if (fundId != "")
                        {
                            postStatus = 1;
                        }
                        else
                        {
                            postStatus = 0;
                        }


                    }
                }

                }
            catch(Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;

        }

        public static string FetchEditVendorData(int vendorID,string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                      new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },

               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditVendorDetails", sqlParam, connection);

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

        public static string FetchMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetAddVendorScreenMasterData", sqlParam, connection);

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
