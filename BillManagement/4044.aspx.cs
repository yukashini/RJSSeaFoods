using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BillManagement
{
    public partial class _404 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Dictionary<string, PageDetails> _PageDetailsList = new Dictionary<string, PageDetails>();
            _PageDetailsList.Add("404", new PageDetails
            {
                Message = "OOPS! Page Not Found!",
                PageNo = "404",
                Description = "Sorry, but the page you are looking for does not exist",
                NavigationLink = "ArcBillLogin.aspx",
                NavigationLinkName = "Back to Login"
            });

            _PageDetailsList.Add("401", new PageDetails
            {
                Message = "OOPS! Unauthorized Access",
                PageNo = "401",
                Description = "Kindly, Contact Administrator",
                NavigationLink = "ArcBillLogin.aspx",
                NavigationLinkName = "Back to Login"
            });
            if (Request.QueryString["PageNo"] != null)
            {

                string pageNo = Request.QueryString["PageNo"];
                PageDetails PageDetails = null;
                if (_PageDetailsList.ContainsKey(pageNo))
                {
                    PageDetails = _PageDetailsList[pageNo];
                    BindPageDetails(PageDetails);
                }
                else
                {
                    PageDetails = _PageDetailsList["404"];
                    BindPageDetails(PageDetails);
                }

            }
            else
            {

                PageDetails PageDetails = _PageDetailsList["404"];
                BindPageDetails(PageDetails);

            }
        }

        void BindPageDetails(PageDetails PageDetails)
        {
            HPageNO.InnerHtml = PageDetails.PageNo;
            HPageMessage.InnerHtml = PageDetails.Message;
            PageDescription.InnerHtml = PageDetails.Description;
            if (Session["UserID"] != null)
            {


                if (PageDetails.Message != "OOPS! Unauthorized Access")
                    Navigation.Attributes.Add("href", "Home.aspx");
                Navigation.InnerHtml = "Back to Home Page";

            }
            else
            {

                Navigation.Attributes.Add("href", "ArcBillLogin.aspx?rst=true");
                Navigation.InnerHtml = "Back to Login Page";
                //Navigation.Attributes.Add("href", PageDetails.NavigationLink);
                // Navigation.InnerHtml = PageDetails.NavigationLinkName;
            }
        }
    }

    public class PageDetails
    {
        public PageDetails() { }

        public string PageNo { get; set; }
        public string Message { get; set; }
        public string Description { get; set; }
        public string NavigationLink { get; set; }
        public string NavigationLinkName { get; set; }
    }
}