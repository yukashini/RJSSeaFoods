using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
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
    /// Summary description for VendorDocument
    /// </summary>
    public class VendorDocument : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            ResponseAPI fileObjects = new ResponseAPI();

            try
            {
               
                if (context.Session["AccountID"] != null && context.Session["Role"] != null)
                {
                    int? accountID = Convert.ToInt32(HttpContext.Current.Session["AccountID"].ToString());
                    int? clientID = Convert.ToInt32(HttpContext.Current.Session["ClientID"].ToString());
                    if (accountID == null || clientID == null || accountID == 0 || clientID == 0)
                    {
                        context.Response.Redirect("Login.aspx");
                    }
                    string billDirectory = Convert.ToString(ConfigurationManager.AppSettings["VendorDocumentsDirectory"]);
                    if (context.Request.Files.Count > 0)
                    {
                        HttpFileCollection files = context.Request.Files;
                        HttpPostedFile file = files[0];
                        string fileName = Path.GetFileName(file.FileName);
                        string fileDisplayName = Path.GetFileName(file.FileName);
                       
                        Guid newId = Guid.NewGuid();
                        fileName = newId + fileName;
                        string filePhisycalPath = Path.GetFullPath(fileName).ToLower();
                        int fileSize = file.ContentLength;
                        if (!Directory.Exists(billDirectory))
                            Directory.CreateDirectory(billDirectory);
                        file.SaveAs(billDirectory + fileName);
                       
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
            catch (Exception ex)
            {
                context.Response.ContentType = "text/json";
                context.Response.Write("");
                ExceptionLogEntry.LogException(ex);
            }
            string strFileDetails = JsonConvert.SerializeObject(fileObjects);
            context.Response.ContentType = "text/json";
            
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
