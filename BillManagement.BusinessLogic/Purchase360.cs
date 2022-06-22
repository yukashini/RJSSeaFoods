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
  public class Purchase360
    {
        public static string GetInvoicelst(ShipperInvoiceFilterfilter List, string connection)
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
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = List.OrderBy },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_InvoiceShipperlist300", sqlParam, connection);
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
        public static string FetchPurchaseInfoScreenData(int ShipperId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@shipperID", SqlDbType.Int) { Value = ShipperId },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetShipperInfo", sqlParam, connection);

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

        public static int NotesInsert(string Notes, int ShipperId, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = ShipperId },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@notes", SqlDbType.NVarChar) { Value = Notes },
                                      new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertShipperNotes", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int NotesUpdate(string Notes, int ShipperId, int notesId, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = ShipperId },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@notes", SqlDbType.NVarChar) { Value = Notes },
                                      new SqlParameter("@updatedBy", SqlDbType.Int) { Value = AccountID },
                                      new SqlParameter("@notesID", SqlDbType.Int) { Value = notesId },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateShipperNote", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int InsertDocument(ShipperDocument documentObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@fileName", SqlDbType.NVarChar) { Value = documentObj.FileName },
                                     new SqlParameter("@lastModified", SqlDbType.NVarChar) { Value = documentObj.LastModifiedBy },
                                     new SqlParameter("@fileModifiedName", SqlDbType.NVarChar) { Value = documentObj.FileModifiedName },
                                     new SqlParameter("@createdBy", SqlDbType.Int) { Value =AccountID },
                                     new SqlParameter("@shipperId", SqlDbType.Int) { Value =documentObj.ShipperId },
                                     new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertShipperDocument", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int InsertContact(Shippercontact ContactObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@firstName", SqlDbType.NVarChar) { Value = ContactObj.FirstName },
                                     new SqlParameter("@lastName", SqlDbType.NVarChar) { Value = ContactObj.LastName },
                                     new SqlParameter("@email", SqlDbType.NVarChar) { Value = ContactObj.Email },
                                     new SqlParameter("@phoneNumber", SqlDbType.NVarChar) { Value = ContactObj.Phone },
                                     new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = ContactObj.ShipperID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertShipperContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static int DeleteContact(Shippercontact ContactObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = ContactObj.ShipperID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@contactID", SqlDbType.Int) { Value = ContactObj.ContactID },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteShipperContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static int UpdateContact(Shippercontact ContactObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@firstName", SqlDbType.NVarChar) { Value = ContactObj.FirstName },
                                     new SqlParameter("@lastName", SqlDbType.NVarChar) { Value = ContactObj.LastName },
                                     new SqlParameter("@email", SqlDbType.NVarChar) { Value = ContactObj.Email },
                                     new SqlParameter("@phoneNumber", SqlDbType.NVarChar) { Value = ContactObj.Phone },
                                     new SqlParameter("@updatedBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = ContactObj.ShipperID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@contactID", SqlDbType.Int) { Value = ContactObj.ContactID },
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateShipperContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int InsertBank(ShipperBank BankObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@BankName", SqlDbType.NVarChar) { Value = BankObj.BankName },
                                     new SqlParameter("@BankCode", SqlDbType.NVarChar) { Value = BankObj.BankCode },
                                     new SqlParameter("@BankAccNo", SqlDbType.NVarChar) { Value = BankObj.BankAccNo },
                                     new SqlParameter("@BankIFSCCode", SqlDbType.NVarChar) { Value = BankObj.BankIFSCCode },
                                     new SqlParameter("@BankBranch", SqlDbType.NVarChar) { Value = BankObj.BankBranch },

                                     new SqlParameter("@BankSwift", SqlDbType.NVarChar) { Value = BankObj.BankSwift },
                                     new SqlParameter("@BankRoutingNo", SqlDbType.NVarChar) { Value = BankObj.BankRoutingNo },
                                     new SqlParameter("@BankWireNo", SqlDbType.NVarChar) { Value = BankObj.BankWireNo },
                                     new SqlParameter("@BankAddress", SqlDbType.NVarChar) { Value = BankObj.BankAddress},
                                     new SqlParameter("@BankCity", SqlDbType.NVarChar) { Value = BankObj.BankCity },

                                     new SqlParameter("@BankState", SqlDbType.NVarChar) { Value = BankObj.BankState },
                                     new SqlParameter("@BankCountry", SqlDbType.NVarChar) { Value = BankObj.BankCountry },
                                     new SqlParameter("@BankZip", SqlDbType.NVarChar) { Value = BankObj.BankZip },
                                     new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@ShipperID", SqlDbType.Int) { Value = BankObj.ShipperID },
                                     new SqlParameter("@ClientId", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertShipperBank", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static int DeleteBank(ShipperBank BankObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = BankObj.ShipperID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@bankID", SqlDbType.Int) { Value = BankObj.BankID },
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteShipperBank", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static int UpdateBank(ShipperBank BankObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@BankName", SqlDbType.NVarChar) { Value = BankObj.BankName },
                                     new SqlParameter("@BankCode", SqlDbType.NVarChar) { Value = BankObj.BankCode },
                                     new SqlParameter("@BankAccNo", SqlDbType.NVarChar) { Value = BankObj.BankAccNo },
                                     new SqlParameter("@BankIFSCCode", SqlDbType.NVarChar) { Value = BankObj.BankIFSCCode },
                                     new SqlParameter("@BankBranch", SqlDbType.NVarChar) { Value = BankObj.BankBranch },

                                     new SqlParameter("@BankSwift", SqlDbType.NVarChar) { Value = BankObj.BankSwift },
                                     new SqlParameter("@BankRoutingNo", SqlDbType.NVarChar) { Value = BankObj.BankRoutingNo },
                                     new SqlParameter("@BankWireNo", SqlDbType.NVarChar) { Value = BankObj.BankWireNo },
                                     new SqlParameter("@BankAddress", SqlDbType.NVarChar) { Value = BankObj.BankAddress},
                                     new SqlParameter("@BankCity", SqlDbType.NVarChar) { Value = BankObj.BankCity },

                                     new SqlParameter("@BankState", SqlDbType.NVarChar) { Value = BankObj.BankState },
                                     new SqlParameter("@BankCountry", SqlDbType.NVarChar) { Value = BankObj.BankCountry },
                                     new SqlParameter("@BankZip", SqlDbType.NVarChar) { Value = BankObj.BankZip },

                                     new SqlParameter("@updatedBy", SqlDbType.Int) { Value = AccountID },
                                     new SqlParameter("@shipperID", SqlDbType.Int) { Value = BankObj.ShipperID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@bankID", SqlDbType.Int) { Value = BankObj.BankID },
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateShipperBank", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetShipperIndexDataList", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}
