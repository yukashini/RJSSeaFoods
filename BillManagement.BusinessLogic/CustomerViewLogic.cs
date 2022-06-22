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
   public class CustomerViewLogic
    {
        public static string GetAllBillList(AllBilllist allBilllist, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {
                     new SqlParameter("@start", SqlDbType.Int) { Value = allBilllist.Start },
                     new SqlParameter("@skip", SqlDbType.Int) { Value = allBilllist.Skip },
                     new SqlParameter("@orderby", SqlDbType.NVarChar) { Value = allBilllist.OrderBy },
                     new SqlParameter("@cutmetid", SqlDbType.NVarChar) { Value =allBilllist.CustId },
                     new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetAllbillLst", sqlParam, connection);
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
        public static DataSet GetGetBillListData(string CustomerId,string connection)
        {
            DataSet ds = new DataSet();
            try
            {
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                SqlParameter[] sqlParam = {
                new SqlParameter("@customerid", SqlDbType.NVarChar) { Value = CustomerId },
                new SqlParameter("@clientID", SqlDbType.NVarChar) { Value = clientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCustomerDetails", sqlParam, connection);
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
        public static int InsertContact(Customercontact ContactObj, string connection)
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
                                     new SqlParameter("@customerID", SqlDbType.Int) { Value = ContactObj.CustomerID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertCustomerContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int DeleteContact(Customercontact ContactObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@customerID", SqlDbType.Int) { Value = ContactObj.CustomerID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@contactID", SqlDbType.Int) { Value = ContactObj.ContactID },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteCustomerContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static int UpdateContact(Customercontact ContactObj, string connection)
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
                                     new SqlParameter("@customerID", SqlDbType.Int) { Value = ContactObj.CustomerID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@contactID", SqlDbType.Int) { Value = ContactObj.ContactID },
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateCustomerContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int InsertDocument(CustomerDocument documentObj, string connection)
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
                                      new SqlParameter("@customerId", SqlDbType.Int) { Value =documentObj.CustomerId },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertCustomerDocument", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }
        public static int NotesInsert(string Notes, int CustomerID, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@customerID", SqlDbType.Int) { Value = CustomerID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@notes", SqlDbType.NVarChar) { Value = Notes },
                                      new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertCustomerNotes", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int NotesUpdate(string Notes, int CustomerID, int notesId, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@custmerID", SqlDbType.Int) { Value = CustomerID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@notes", SqlDbType.NVarChar) { Value = Notes },
                                      new SqlParameter("@updatedBy", SqlDbType.Int) { Value = AccountID },
                                      new SqlParameter("@notesID", SqlDbType.Int) { Value = notesId },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateCustomerNote", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }


    }
}
