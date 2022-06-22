using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace BillManagement
{
    /// <summary>
    /// Summary description for VendorLogo
    /// </summary>
    public class VendorLogo : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            ResponseAPI fileObjects = new ResponseAPI();
            try
            {
             
                //if (Logger.IsLoggingEnabled())
                //    Logger.Write(new VerboseLogEntry("User Comes to upload the logo file", 1, "User Requests"));
                if (context.Session["AccountID"] != null && context.Session["Role"] != null)
                {
                    int? accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                    int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                    if (accountID == null || clientID == null || accountID == 0 || clientID == 0)
                    {
                        context.Response.Redirect("Login.aspx");
                    }
                    string billDirectory = Convert.ToString(ConfigurationManager.AppSettings["VendorLogoLocationDirectory"]);
                    if (context.Request.Files.Count > 0)
                    {
                        HttpFileCollection files = context.Request.Files;
                        HttpPostedFile file = files[0];
                        string fileName = Path.GetFileName(file.FileName);
                        string fileDisplayName = Path.GetFileName(file.FileName);
                      //  Logger.Write(new VerboseLogEntry("Uploaded file name : " + fileDisplayName + "", 1, "User Requests"));
                        Guid newId = Guid.NewGuid();
                        fileName = newId + fileName;
                        string filePhisycalPath = Path.GetFullPath(fileName).ToLower();
                        int fileSize = file.ContentLength;
                        if (!Directory.Exists(billDirectory))
                            Directory.CreateDirectory(billDirectory);
                        file.SaveAs(billDirectory + fileName);
                       // Logger.Write(new VerboseLogEntry("File Saved directory : " + billDirectory + fileName + "", 1, "User Requests"));
                        fileObjects.FileDisplayName = fileDisplayName;
                        fileObjects.ModifiedFileName = fileName;
                        fileObjects.PhysicalLocation = billDirectory + fileName;
                    }
                    }
                else
                {
                    context.Response.Redirect("Login.aspx?rst=true&&isSessionOut=1");
                }
            }
            catch(Exception ex)
            {
                context.Response.ContentType = "text/json";
                context.Response.Write("");
                ExceptionLogEntry.LogException(ex);
            }
            string strFileDetails = JsonConvert.SerializeObject(fileObjects);
            context.Response.ContentType = "text/json";
            //Logger.Write(new VerboseLogEntry("Logo File Response : " + strFileDetails + "", 1, "User Requests"));
            context.Response.Write(strFileDetails);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}