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
    public class EmployeeLogics
    {
        public static string FetchCreateEmployeeMasterData(string connection)
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
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetCreateEmployeeMasterData", sqlParam, connection);

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

        public static int InsertEmployee(EmployeeObjects objEmployee, string connection)
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
                                                                        
                           new SqlParameter("@EmployeeCode", SqlDbType.NVarChar) { Value = objEmployee.Employeecode},
                           new SqlParameter("@EmployeeFirstName", SqlDbType.NVarChar) { Value = objEmployee.EmployeeFirstName},
                           new SqlParameter("@EmployeeLastName", SqlDbType.NVarChar) { Value = objEmployee.EmployeeLastName},
                           new SqlParameter("@EmployeeGender", SqlDbType.NVarChar) { Value = objEmployee.Gender},
                           new SqlParameter("@Designation", SqlDbType.NVarChar) { Value = objEmployee.Designation},
                           new SqlParameter("@Dob", SqlDbType.DateTime) { Value = objEmployee.DOB},
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objEmployee.Email},
                           new SqlParameter("@logo", SqlDbType.NVarChar) { Value = objEmployee.EmployeeLogo},
                           new SqlParameter("@EmployeePan", SqlDbType.NVarChar) { Value = objEmployee.Pan},
                           new SqlParameter("@EmployeeAadhar", SqlDbType.NVarChar) { Value = objEmployee.Aadhaar},
                           new SqlParameter("@EmployeeStatus", SqlDbType.NVarChar) { Value = objEmployee.Status},

                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objEmployee.EmployeeAddress},
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value =objEmployee.ContactNumber},
                           new SqlParameter("@AlternativeNumber", SqlDbType.NVarChar) { Value =objEmployee.AltContactNumber},
                           new SqlParameter("@Bloodgroup", SqlDbType.NVarChar) { Value = objEmployee.Bloodgroup},
                           new SqlParameter("@City", SqlDbType.NVarChar) { Value = objEmployee.City},
                           new SqlParameter("@State", SqlDbType.NVarChar) { Value = objEmployee.State},
                           new SqlParameter("@Country", SqlDbType.NVarChar) { Value = objEmployee.Country},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objEmployee.Zip},
                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@createdBy", SqlDbType.Int) { Value = accountID },
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},
      
                  
                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_CreateEmployee", sqlParam, connection);
                int PostStatus = ApplicationUsers.InsertAuditlog("Created", "New Employee" + " " + objEmployee.Emp_Id + " " + "added", "Employee List", connection);
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

        public static int UpdateEmployee(EmployeeObjects objEmployee, string connection)
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
                           new SqlParameter("@Emp_Id", SqlDbType.Int) { Value =objEmployee.Emp_Id },
                           new SqlParameter("@EmployeeCode", SqlDbType.NVarChar) { Value = objEmployee.Employeecode},
                           new SqlParameter("@EmployeeFirstName", SqlDbType.NVarChar) { Value = objEmployee.EmployeeFirstName},
                           new SqlParameter("@EmployeeLastName", SqlDbType.NVarChar) { Value = objEmployee.EmployeeLastName},
                           new SqlParameter("@EmployeeGender", SqlDbType.NVarChar) { Value = objEmployee.Gender},
                           new SqlParameter("@Designation", SqlDbType.NVarChar) { Value = objEmployee.Designation},
                           new SqlParameter("@Dob", SqlDbType.DateTime) { Value = objEmployee.DOB},
                           new SqlParameter("@email", SqlDbType.NVarChar) { Value = objEmployee.Email},
                           new SqlParameter("@logo", SqlDbType.NVarChar) { Value = objEmployee.EmployeeLogo},
                           new SqlParameter("@EmployeePan", SqlDbType.NVarChar) { Value = objEmployee.Pan},
                           new SqlParameter("@EmployeeAadhar", SqlDbType.NVarChar) { Value = objEmployee.Aadhaar},
                           new SqlParameter("@EmployeeStatus", SqlDbType.NVarChar) { Value = objEmployee.Status},
                           new SqlParameter("@address", SqlDbType.NVarChar) { Value = objEmployee.EmployeeAddress},
                           new SqlParameter("@contactNumber", SqlDbType.NVarChar) { Value =objEmployee.ContactNumber},
                           new SqlParameter("@AlternativeNumber", SqlDbType.NVarChar) { Value =objEmployee.AltContactNumber},
                           new SqlParameter("@Bloodgroup", SqlDbType.NVarChar) { Value = objEmployee.Bloodgroup},
                           new SqlParameter("@City", SqlDbType.NVarChar) { Value = objEmployee.City},
                           new SqlParameter("@State", SqlDbType.NVarChar) { Value = objEmployee.State},
                           new SqlParameter("@Country", SqlDbType.NVarChar) { Value = objEmployee.Country},
                           new SqlParameter("@zip", SqlDbType.NVarChar) { Value = objEmployee.Zip},
                           new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                           new SqlParameter("@updatedBy", SqlDbType.Int) { Value = accountID },
                           new SqlParameter("@retVal", SqlDbType.Int) { Value = 0},

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_UpdateEmployee", sqlParam, connection);

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

        public static int DeleteEmployee(int EmployeeID, string connection)
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
                           new SqlParameter("@EmployeeID", SqlDbType.Int) { Value =EmployeeID },

                };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_DeleteEmployee", sqlParam, connection);

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

        public static string FetchEmployeeData(int EmployeeId, string connection)
        {
            DataSet ds = new DataSet();
            Common _objCommon = new Common();
            string Strresult = string.Empty;
            try
            {
                int ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());


                SqlParameter[] sqlParam = {
                     new SqlParameter("@EmployeeId", SqlDbType.Int) { Value =EmployeeId },
                      new SqlParameter("@clientID", SqlDbType.Int) { Value =ClientID },
               };
                ds = SqlQueryExecutor.ExecuteStoredProcedure("SP_GetEditEmployeeData", sqlParam, connection);

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
