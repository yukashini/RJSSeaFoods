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
  public  class VendorEditLogics
    {
        public static string FetchVendorInfoScreenData(int vendorID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetVendorInfo", sqlParam, connection);

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

        public static string FetchVendorConatcts(int vendorID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("Sp_GetVendorContacts", sqlParam, connection);

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

        public static string FetchVendorNotes(int vendorID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetVendorNotes", sqlParam, connection);

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

        public static string FetchVendorDocuments(int vendorID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int UserRoleId = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());

                SqlParameter[] sqlParam = {
                    new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                    new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID }
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetVendorFiles", sqlParam, connection);

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

        public static int InsertContact(VendorContacts ContactObj, string connection)
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
                                     new SqlParameter("@vendorID", SqlDbType.Int) { Value = ContactObj.VendorID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("Sp_InsertVendorContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int UpdateContact(VendorContacts ContactObj, string connection)
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
                                     new SqlParameter("@vendorID", SqlDbType.Int) { Value = ContactObj.VendorID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                       new SqlParameter("@contactID", SqlDbType.Int) { Value = ContactObj.ContactID },
                                    
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateVendorContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int DeleteContact(VendorContacts ContactObj, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@vendorID", SqlDbType.Int) { Value = ContactObj.VendorID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@contactID", SqlDbType.Int) { Value = ContactObj.ContactID },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_DeleteVendorContact", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int NotesInsert(string Notes,int vendorID, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@notes", SqlDbType.NVarChar) { Value = Notes },
                                      new SqlParameter("@createdBy", SqlDbType.Int) { Value = AccountID },
                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertNotes", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int NotesUpdate(string Notes, int vendorID,int notesId, string connection)
        {
            int PostStatus = 0;

            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int AccountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlActionsParameter =
                                   {
                                     new SqlParameter("@vendorID", SqlDbType.Int) { Value = vendorID },
                                     new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
                                     new SqlParameter("@notes", SqlDbType.NVarChar) { Value = Notes },
                                      new SqlParameter("@updatedBy", SqlDbType.Int) { Value = AccountID },
                                      new SqlParameter("@notesID", SqlDbType.Int) { Value = notesId },

                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_UpdateVendorNotes", sqlActionsParameter, connection);
            }
            catch (Exception ex)
            {
                PostStatus = 0;
                throw ex;
            }
            return PostStatus;
        }

        public static int InsertDocument(VendorDocuments documentObj, string connection)
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
                                       new SqlParameter("@vendorId", SqlDbType.Int) { Value =documentObj.VendorId },

                                      new SqlParameter("@retVal", SqlDbType.Int) { Value = 0 }
                            };
                PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertVendorDocument", sqlActionsParameter, connection);
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
