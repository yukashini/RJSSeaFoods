using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BillManagement.BussinessObjects;
using ISCLibrary.DataAccessLayer;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Net;
using System.Net.Sockets;

namespace BillManagement.BusinessLogic
{
    public class ApplicationUsers
    {
        public List<ApplicationUser> GetLoginDetails(string userEmail,string passWord,string connection)
        {
            List<ApplicationUser> loggedInUserDetail = new List<ApplicationUser>();
            try
            {
                string query = string.Empty;
                query= @"SELECT * FROM Tbl_Accounts 
                LEFT JOIN Tbl_Client
                ON Tbl_Accounts.ClientID=Tbl_Client.ClientID AND Tbl_Client.Status=50059
                WHERE
                Tbl_Accounts.UserName='" + userEmail + "' AND Tbl_Accounts.Password='" + passWord + "' AND Tbl_Accounts.IsActive=50042";
                DataTable dt = SqlQueryExecutor.ReadNoParams(query, connection);
                int PostStatus = 0;
                if (dt.Rows.Count > 0)
                {
                   
                    SqlParameter[] sqlActionsParameter =
                                 {
                                     new SqlParameter("@loginName", SqlDbType.NVarChar) { Value = userEmail },
                                       new SqlParameter("@loginStatus", SqlDbType.NVarChar) { Value = "S" },
                         };
                    PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertLoginAudit", sqlActionsParameter, connection);

                    foreach (DataRow dr in dt.Rows)
                    {
                        loggedInUserDetail.Add(new ApplicationUser
                        {
                            ClientID = dr["ClientID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["ClientID"]),
                            AccountID = dr["AccountID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["AccountID"]),
                            UserName = dr["UserName"] == DBNull.Value ? "" : Convert.ToString(dr["UserName"]),
                            Password= dr["Password"] == DBNull.Value ? "" : Convert.ToString(dr["Password"]),
                            FirstName = dr["FirstName"] == DBNull.Value ? "" : Convert.ToString(dr["FirstName"]),
                            Role = dr["Role"] == DBNull.Value ? 0 : Convert.ToInt32(dr["Role"]),
                            LastName = dr["LastName"] == DBNull.Value ? "" : Convert.ToString(dr["LastName"]),
                            ApplicationRole = dr["ApplicationRole"] == DBNull.Value ? 0 : Convert.ToInt32(dr["ApplicationRole"]),
                            PrimaryEmailID = dr["PrimaryEmailID"] == DBNull.Value ? "" : Convert.ToString(dr["PrimaryEmailID"]),
                            IsPasswordReseted = dr["IsPasswordReseted"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IsPasswordReseted"]),

                        });
                    }
                }
                else
                {
                    SqlParameter[] sqlActionsParameter =
                                {
                                     new SqlParameter("@loginName", SqlDbType.NVarChar) { Value = userEmail },
                                       new SqlParameter("@loginStatus", SqlDbType.NVarChar) { Value = "F" },
                         };
                    PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertLoginAudit", sqlActionsParameter, connection);
                }

            }
            catch(Exception ex)
            {
                throw ex;
            }
            return loggedInUserDetail;
        }

        public List<ApplicationUser> CheckCredientialSSO(string userEmail,  string connection)
        {
            List<ApplicationUser> loggedInUserDetail = new List<ApplicationUser>();
            try
            {
                string query = string.Empty;
                query = @"SELECT * FROM Tbl_Accounts 
                LEFT JOIN Tbl_Client
                ON Tbl_Accounts.ClientID=Tbl_Client.ClientID AND Tbl_Client.Status=50059
                WHERE
                Tbl_Accounts.UserName='" + userEmail + "' AND Tbl_Accounts.IsActive=50042";
                DataTable dt = SqlQueryExecutor.ReadNoParams(query, connection);
                int PostStatus = 0;
                if (dt.Rows.Count > 0)
                {
                    SqlParameter[] sqlActionsParameter =
                                 {
                                     new SqlParameter("@loginName", SqlDbType.NVarChar) { Value = userEmail },
                                       new SqlParameter("@loginStatus", SqlDbType.NVarChar) { Value = "S" },
                                };
                    PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertLoginAudit", sqlActionsParameter, connection);

                    foreach (DataRow dr in dt.Rows)
                    {
                        loggedInUserDetail.Add(new ApplicationUser
                        {
                            ClientID = dr["ClientID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["ClientID"]),
                            AccountID = dr["AccountID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["AccountID"]),
                            UserName = dr["UserName"] == DBNull.Value ? "" : Convert.ToString(dr["UserName"]),
                            Password = dr["Password"] == DBNull.Value ? "" : Convert.ToString(dr["Password"]),
                            FirstName = dr["FirstName"] == DBNull.Value ? "" : Convert.ToString(dr["FirstName"]),
                            Role = dr["Role"] == DBNull.Value ? 0 : Convert.ToInt32(dr["Role"]),
                            LastName = dr["LastName"] == DBNull.Value ? "" : Convert.ToString(dr["LastName"]),
                            ApplicationRole = dr["ApplicationRole"] == DBNull.Value ? 0 : Convert.ToInt32(dr["ApplicationRole"]),
                            PrimaryEmailID = dr["PrimaryEmailID"] == DBNull.Value ? "" : Convert.ToString(dr["PrimaryEmailID"]),
                            IsPasswordReseted = dr["IsPasswordReseted"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IsPasswordReseted"]),

                        });
                    }
                }
                else
                {
                    SqlParameter[] sqlActionsParameter =
                                {
                                     new SqlParameter("@loginName", SqlDbType.NVarChar) { Value = userEmail },
                                       new SqlParameter("@loginStatus", SqlDbType.NVarChar) { Value = "F" },
                         };
                    PostStatus = SqlQueryExecutor.ExecuteWriteStoredProcedure("SP_InsertLoginAudit", sqlActionsParameter, connection);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return loggedInUserDetail;
        }

        public List<ApplicationUser> GetRolePriorityDetails(int roleID, string connection)
        {
            List<ApplicationUser> loggedInUserPriorityDetails = new List<ApplicationUser>();
            try
            {
                string query = string.Empty;
                query = @"SELECT DISTINCT B.EntityID,A.RoleID,c.[Priority],c.PriorityScreen,D.Status
	                            FROM ApplicationRoleEntity AS A
	                            INNER JOIN [dbo].[EntityAction] AS B
	                            ON A.EntityActionID=B.EntityActionID
	                            INNER JOIN Entity AS C
	                            ON B.EntityID=C.EntityID
                                INNER JOIN ApplicationRole AS D
                                ON A.RoleID=D.RoleID
	                            WHERE A.RoleID='" + roleID + "' ORDER BY  c.[Priority] ASC";

                DataTable dt = SqlQueryExecutor.ReadNoParams(query, connection);
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        loggedInUserPriorityDetails.Add(new ApplicationUser
                        {
                            EntityID = dr["EntityID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["EntityID"]),
                            RoleID = dr["RoleID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["RoleID"]),
                            Priority = dr["Priority"] == DBNull.Value ?0 : Convert.ToInt32(dr["Priority"]),
                            PriorityScreen = dr["PriorityScreen"] == DBNull.Value ? "" : Convert.ToString(dr["PriorityScreen"]),
                            RoleStatus = dr["Status"] == DBNull.Value ?0: Convert.ToInt32(dr["Status"]),
                        });
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return loggedInUserPriorityDetails;
        }

        [Obsolete]
        public static int InsertAuditlog(string activity,string description,string screenname, string connection)
        {
            int postStatus = 0;
            try
            {
                string hostName = Dns.GetHostName(); // Retrive the Name of HOST  
               
                string SysteamIP = Dns.GetHostByName(hostName).AddressList[0].ToString();
                //string localIP = "";
                //using (Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
                //{
                //    socket.Connect("8.8.8.8", 65530);
                //    IPEndPoint endPoint = socket.LocalEndPoint as IPEndPoint;
                //    localIP = endPoint.Address.ToString();
                //}
                string localIP = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (string.IsNullOrEmpty(localIP))
                {
                    localIP = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                }
                
                int clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                int accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                SqlParameter[] sqlParameters = {
                             new SqlParameter("@activity", SqlDbType.NVarChar) { Value = activity },
                             new SqlParameter("@description", SqlDbType.NVarChar) { Value = description },
                             new SqlParameter("@screenname", SqlDbType.NVarChar) { Value = screenname },
                             new SqlParameter("@userid", SqlDbType.Int) { Value = accountID },
                             new SqlParameter("@systemip", SqlDbType.NVarChar) { Value = localIP },
                             new SqlParameter("@clientID", SqlDbType.Int) { Value = clientID },
                              };
                postStatus = SqlQueryExecutor.Custom_ExecuteWriteStoredProcedure("SP_InsertAuditLog", sqlParameters, connection);

            }
            catch (Exception ex)
            {
                postStatus = 0;
                throw;
            }
            return postStatus;
        }
    }
}
