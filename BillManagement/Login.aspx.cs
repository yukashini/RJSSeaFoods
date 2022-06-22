using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BillManagement.BussinessObjects;
using BillManagement.BusinessLogic;
using ISCLibrary.Utilities;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling.Logging;
using System.Web.Script.Services;
using Newtonsoft.Json;
using System.Data;
using System.Security.Claims;
using System.Threading;
using Microsoft.Owin.Security;

namespace BillManagement
{
    public partial class Login : System.Web.UI.Page
    {
        public static string Connection = Convert.ToString(ConfigurationManager.ConnectionStrings["dbConnection"]);

        

        protected void Page_Load(object sender, EventArgs e)
        {
            bool IsSSOEnabled = Convert.ToBoolean(ConfigurationManager.AppSettings["isssoenabled"]);
            Session["SSO"] = IsSSOEnabled;
            string VirtualDirectory = Convert.ToString(ConfigurationManager.AppSettings["virtualpath"]);
            try
            {
                if (!Page.IsPostBack)
                {
                    if (IsSSOEnabled)
                    {
                        if (Request.IsAuthenticated && Convert.ToBoolean(Request.QueryString["rst"]) != true)
                        {

                            //if (Logger.IsLoggingEnabled())
                            //    Logger.Write(new VerboseLogEntry(" Authtication Log Login into Application true", 1, "User Login"));
                            //Get the current claims principal
                            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

                            // Get the claims values
                            var email = identity.Claims.Where(c => c.Type == ClaimTypes.Email)
                            .Select(c => c.Value).SingleOrDefault();
                            string EmailID = Convert.ToString(email);

                            List<ApplicationUser> applicationUserList = new List<ApplicationUser>();
                            ApplicationUsers applicationUser = new ApplicationUsers();
                            applicationUserList = applicationUser.CheckCredientialSSO(EmailID, Connection);


                            if (applicationUserList.Count > 0)
                            {
                                Session["AccountID"] = applicationUserList[0].AccountID;
                                Session["ClientID"] = applicationUserList[0].ClientID;
                                Session["Role"] = applicationUserList[0].ApplicationRole;
                                Session["FirstName"] = applicationUserList[0].FirstName;
                                Session["LastName"] = applicationUserList[0].LastName;
                            }
                            else
                            {
                                Session.Clear();
                                Session.Abandon();
                                Response.Redirect("404.aspx?PageNo=401", false);
                            }
                            var roles = identity.Claims.Where(c => c.Type == "roles").Select(c => c.Value).SingleOrDefault();
                            var claimRole = roles;
                        }

                        else
                        {
                            if (Request.IsAuthenticated && Convert.ToBoolean(Request.QueryString["rst"]) == true)
                            {


                                //if (Logger.IsLoggingEnabled())
                                //    Logger.Write(new VerboseLogEntry(" Authtication Log Login into Application false", 1, "User Login"));
                                //string loginmsg = "UserID :" + UserID + "Logout Success ";
                                //LoginLog.PostSaveLoginDetails(ApplicationName, UserID, ADAuthentication, 0, LogOut, loginmsg, 1);
                            }

                            HttpContext.Current.GetOwinContext().Authentication.Challenge(new AuthenticationProperties { RedirectUri = "/" }, Microsoft.Owin.Security.OpenIdConnect.OpenIdConnectAuthenticationDefaults.AuthenticationType);
                        }
                    }
                    else
                    {

                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
         
            try
            {
              

                //if (Logger.IsLoggingEnabled())
                //    Logger.Write(new VerboseLogEntry("User come for login", 1, "Application Login"));

                if (login_userName.Text =="" || login_passWord.Text == "")
                {
                    login_userName.Text = "";
                    login_passWord.Text = "";
                    validation_Lable.Text= "Enter valid username and password";
                }
                else
                {
                      validation_Lable.Text="";
                      List<ApplicationUser> applicationUserList = new List<ApplicationUser>();
                      ApplicationUsers applicationUser = new ApplicationUsers();
                      string userName = login_userName.Text.ToString();
                      string passWord = login_passWord.Text.ToString();
                      userName = userName.ToLower();
                      applicationUserList= applicationUser.GetLoginDetails(userName, passWord, Connection);
                      if (applicationUserList.Count >0 )
                      {
                         if(applicationUserList[0].UserName.ToLower() == userName&&applicationUserList[0].Password==passWord)
                          {
                            Session["AccountID"] = applicationUserList[0].AccountID;
                            Session["ClientID"] = applicationUserList[0].ClientID;
                            Session["Role"] = applicationUserList[0].ApplicationRole;
                            Session["FirstName"] = applicationUserList[0].FirstName;
                            Session["LastName"] = applicationUserList[0].LastName;

                            List<ApplicationUser> PriorityList = new List<ApplicationUser>();
                            PriorityList = applicationUser.GetRolePriorityDetails(applicationUserList[0].ApplicationRole, Connection);
                            if (PriorityList.Count>0&&PriorityList[0].RoleStatus == 50041)
                            {
                                validation_Lable.Text = "Your role is currently in deactivated status kindly contact your admin";
                            }
                            if (PriorityList.Count > 0 && PriorityList[0].RoleStatus != 50041 && applicationUserList[0].IsPasswordReseted == 1) 
                            {
                                Response.Redirect(PriorityList[0].PriorityScreen);
                            }
                            if (PriorityList.Count > 0 && PriorityList[0].RoleStatus != 50041 && applicationUserList[0].IsPasswordReseted == 0)
                            {
                                Response.Redirect("Login.aspx?IsPwRes=0");
                            }
                            if (applicationUserList[0].ApplicationRole== 1005)
                            {
                                Response.Redirect("ClientAdmin.aspx");
                            }

                            //// Response.Redirect("UserHome.aspx");
                            //if (applicationUserList[0].ApplicationRole == 1001)
                            //{
                            //    Response.Redirect("Roles.aspx");
                            //}
                            //else if (applicationUserList[0].ApplicationRole == 50001)
                            //{
                            //    Response.Redirect("ApproverHome.aspx");
                            //}
                            //else if (applicationUserList[0].ApplicationRole == 50002)
                            //{
                            //    Response.Redirect("FinancerHome.aspx");
                            //}
                            if (PriorityList.Count == 0)
                            {
                                validation_Lable.Text = "There is no permission added for your role";
                            }

                        }
                         else
                          {
                              login_userName.Text = "";
                              login_passWord.Text = "";
                               validation_Lable.Text= "Enter valid username and password";
                           }
                      }
                      else
                      {
                            login_userName.Text = "";
                            login_passWord.Text = "";
                            validation_Lable.Text = "Enter valid username and password";
                     }
                }
            }
            catch(Exception ex)
            {

            }
        }
        
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int GetRoleId()
        {
            int roleId = 0;
            try
            {
               roleId =Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
            }
            catch(Exception ex)
            {

            }
            return roleId;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetLoggerDetails()
        {
            string data = string.Empty;
            try
            {
                ApplicationUser user = new ApplicationUser();
                user.FirstName= Convert.ToString(HttpContext.Current.Session["FirstName"].ToString());
                user.LastName = Convert.ToString(HttpContext.Current.Session["LastName"].ToString());
                user.AccountID= Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                user.RoleID = Convert.ToInt32(HttpContext.Current.Session["Role"].ToString());
                user.ClientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                data = JsonConvert.SerializeObject(user);
            }
            catch(Exception ex)
            {

            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetRolePermissions()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = Initial.FetchRolePermssions(Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    data = Utilities.SerializedDataSet(ds);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int ChangePassWord(string oldPassWord, string newPassword)
        {
            int postStatus = 0;
            try
            {
                postStatus = CredentialLogics.ChangeUserPassword(oldPassWord, newPassword, Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int ForgotPassword(string emailidpass)
        {
            int PostStatus = 0;
            try
            {
                
                PostStatus = CredentialLogics.ForgotuserPassword(emailidpass, Login.Connection);

            }
            catch (Exception ex)
            {
            }
            return PostStatus;
        }


    }
}