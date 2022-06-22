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
    public class OrganizationLogics
    {
        public static string FetchCreateOrganizationMasterData(string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                        new SqlParameter("@clientID", SqlDbType.Int) { Value = ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateOrganizationMasterData", sqlParam, connection);

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

        public static int InsertOrganization(OrganizationObjects objOrganization, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            int postStatus = 0;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                           new SqlParameter("@CompanyName", SqlDbType.NVarChar) { Value = objOrganization.CompanyName},
                           new SqlParameter("@CompanyType", SqlDbType.NVarChar) { Value = objOrganization.CompanyType},
                          new SqlParameter("@AddressLine1", SqlDbType.NVarChar) { Value = objOrganization.AddressLine1},
                           new SqlParameter("@AddressLine2", SqlDbType.NVarChar) { Value = objOrganization.AddressLine2},
                         
                           new SqlParameter("@EmailID", SqlDbType.NVarChar) { Value = objOrganization.EmailID},
                           new SqlParameter("@CompanyLogo", SqlDbType.NVarChar) { Value = objOrganization.CompanyLogo},
                           new SqlParameter("@ContactPerson", SqlDbType.NVarChar) { Value = objOrganization.ContactPerson},
                          new SqlParameter("@ContactNumber", SqlDbType.NVarChar) { Value = objOrganization.ContactNumber},
                           new SqlParameter("@AlternativeNumber", SqlDbType.NVarChar) { Value = objOrganization.AlternativeNumber},

        
                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objOrganization.City},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objOrganization.State},
                           new SqlParameter("@Country", SqlDbType.NVarChar) { Value = objOrganization.Country},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objOrganization.Zip},
                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0}


                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateOrganization", sqlParam, connection);
               // int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Organization" + " " + objOrganization.OrganizationId + " " + "added", "Organization List", connection);
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
                postStatus = 0;
            }
            return postStatus;
        }

        public static int UpdateOrganization(OrganizationObjects objOrganization, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            int postStatus = 0;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {

                           new SqlParameter("@CompanyName", SqlDbType.NVarChar) { Value = objOrganization.CompanyName},
                           new SqlParameter("@CompanyType", SqlDbType.NVarChar) { Value = objOrganization.CompanyType},
                          new SqlParameter("@AddressLine1", SqlDbType.NVarChar) { Value = objOrganization.AddressLine1},
                           new SqlParameter("@AddressLine2", SqlDbType.NVarChar) { Value = objOrganization.AddressLine2},

                           new SqlParameter("@EmailID", SqlDbType.NVarChar) { Value = objOrganization.EmailID},
                           new SqlParameter("@CompanyLogo", SqlDbType.NVarChar) { Value = objOrganization.CompanyLogo},
                           new SqlParameter("@ContactPerson", SqlDbType.NVarChar) { Value = objOrganization.ContactPerson},
                          new SqlParameter("@ContactNumber", SqlDbType.NVarChar) { Value = objOrganization.ContactNumber},
                           new SqlParameter("@AlternativeNumber", SqlDbType.NVarChar) { Value = objOrganization.AlternativeNumber},


                           new SqlParameter("@city", SqlDbType.NVarChar) { Value = objOrganization.City},
                           new SqlParameter("@state", SqlDbType.NVarChar) { Value = objOrganization.State},
                           new SqlParameter("@Country", SqlDbType.NVarChar) { Value = objOrganization.Country},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objOrganization.Zip},
                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           new SqlParameter("@retVal", SqlDbType.NVarChar) { Value = 0}

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateOrganization", sqlParam, connection);

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
                postStatus = 0;
            }
            return postStatus;
        }

        public static int DeleteOrganization(int OrganizationID, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            int postStatus = 0;
            try
            {

                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParam = {


                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@OrganizationID", SqlDbType.Int) { Value =OrganizationID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteOrganization", sqlParam, connection);

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
                postStatus = 0;
            }
            return postStatus;
        }

        public static string FetchOrganizationData(int OrganizationId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@OrganizationId", SqlDbType.Int) { Value =OrganizationId },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditOrganizationData", sqlParam, connection);

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
    }
}
