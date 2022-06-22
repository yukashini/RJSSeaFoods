using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Claims;
using System.Threading;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using BillManagement.BussinessObjects;
using BillManagement.BusinessLogic;

namespace BillManagement
{
    public partial class LoginMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (!IsPostBack)
            //{
            //    if (Convert.ToBoolean(Request.QueryString["rst"]) == true)
            //    {
            //        Session.Clear();
            //        Session.Abandon();
            //        Session.RemoveAll();
            //    }
            //}

            try
            {
                bool IsEnabledSSO = Convert.ToBoolean(ConfigurationManager.AppSettings["isssoenabled"]);
                Session["SSO"] = IsEnabledSSO;
                if (IsEnabledSSO)
                {
                    if (!IsPostBack)
                    {

                        if (Convert.ToBoolean(Request.QueryString["rst"]) == true)
                        {
                           
                            //Request.Cookies["ASP.Net_SessionId"].Expires = DateTime.Now.AddDays(-1d);
                            //Request.Cookies["ASP.Net_SessionId"].Value = "";
                            //Response.Cookies.Add(new HttpCookie("ASP.Net_SessionId", ""));
                            if (Request.Cookies["PrimaryBusinessUnit"] != null)
                            {
                                Response.Cookies["PrimaryBusinessUnit"].Expires = DateTime.Now.AddDays(-1);
                            }
                            //if (IsEnabledSSO)
                            //{
                            //    string PostLogoutURI = Convert.ToString(ConfigurationManager.AppSettings["postlogouturi"]);
                            //    string RedirectURI = Convert.ToString(ConfigurationManager.AppSettings["redirecturi"]);
                            //    HttpContext.Current.GetOwinContext().Authentication.SignOut();// .Authentication.SignOut();
                            //}
                            Session.Clear();
                            Session.Abandon();
                            Session.RemoveAll();
                            if (IsEnabledSSO)
                            {
                                string PostLogoutURI = Convert.ToString(ConfigurationManager.AppSettings["postlogouturi"]);
                                string RedirectURI = Convert.ToString(ConfigurationManager.AppSettings["redirecturi"]);
                                HttpContext.Current.GetOwinContext().Authentication.SignOut();// .Authentication.SignOut();
                            }
                        }

                        if (Session["PrimaryEmailID"] != null)
                        {
                          
                            List<ApplicationUser> applicationUserList = new List<ApplicationUser>();
                            ApplicationUsers applicationUser = new ApplicationUsers();
                            applicationUserList = applicationUser.CheckCredientialSSO(Convert.ToString(Session["PrimaryEmailID"]),Login.Connection);
                            List<ApplicationUser> PriorityList = new List<ApplicationUser>();
                            PriorityList = applicationUser.GetRolePriorityDetails(Convert.ToInt32(Session["Role"]), Login.Connection);
                            if (PriorityList.Count > 0 && PriorityList[0].RoleStatus == 50041)
                            {
                               //validation_Lable.Text = "Your role is currently in deactivated status kindly contact your admin";
                            }
                            if (PriorityList.Count > 0 && PriorityList[0].RoleStatus != 50041)
                            {
                                Response.Redirect(PriorityList[0].PriorityScreen);
                                Context.ApplicationInstance.CompleteRequest();
                            }
                            if (PriorityList.Count > 0 && PriorityList[0].RoleStatus != 50041)
                            {
                                //Response.Redirect("Login.aspx?IsPwRes=0");
                                Response.Redirect("RJSLogin.aspx?IsPwRes=0");
                                Context.ApplicationInstance.CompleteRequest();
                            }
                            
                            if (applicationUserList[0].ApplicationRole == 1005)
                            {
                                Response.Redirect("ClientAdmin.aspx");
                                Context.ApplicationInstance.CompleteRequest();
                            }


                            //Response.Redirect("Roles.aspx", false);
                            //Context.ApplicationInstance.CompleteRequest();
                        }
                    }
                }
                else
                {
                    if (Convert.ToBoolean(Request.QueryString["rst"]) == true)
                    {
                        Session.Clear();
                        Session.Abandon();
                        Session.RemoveAll();
                    }
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}