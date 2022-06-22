using BillManagement.BusinessLogic;
using BillManagement.BussinessObjects;
using DocumentFormat.OpenXml.Wordprocessing;
using ISCLibrary.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using System.Text.RegularExpressions;


//using static BillManagement.BusinessLogic.Wepaypayment;


using Document = iTextSharp.text.Document;
using PageSize = iTextSharp.text.PageSize;
using System.Net;
using Paragraph = iTextSharp.text.Paragraph;

using Font = iTextSharp.text.Font;
using System.Data.SqlClient;
using Stripe;
using ISCLibrary.DataAccessLayer;
using Stripe.Checkout;

namespace BillManagement
{
    public partial class InvoiceList1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoiceList(InvoiceFilterfilter Invoicelist)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = InvoiceLogic.GetInvoiceList(Invoicelist, Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoiceData()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = InvoiceLogic.GetInvoiceData(Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    data = ISCLibrary.Utilities.Utilities.SerializedDataSet(ds);
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
        public static string GetInvoicemaildetails(int BillId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = InvoiceLogic.GetInvoInVoicEmaildetails(BillId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetInvoicemaildetailsPaymentsucc(int BillId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = InvoiceLogic.GetInvoInVoicEmaildetails(BillId, Login.Connection);

                InvoiceLogic.UpdateInvoiceStatus(BillId, 2, Login.Connection, "Payment Completed");

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetTimelinelist(int BillId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = InvoiceLogic.GetTimelinelist(BillId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string SendMail(string Tomail,string Ccail, string Subject,string Body,string Invoice,string InvoiceDate,string Total,int InvoiceId,string CustomerName)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = InvoiceLogic.MailReplacer(Tomail, Ccail, Subject, Body,Invoice,InvoiceDate,Total, InvoiceId, CustomerName,Login.Connection);
            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string ProcessPayment(int Amount, int InvoiceId)
        {

            string sessionId = "";

            StripeConfiguration.ApiKey = "sk_test_51Kg7QmKBYCv3kOC1dnGYeSC4ZTkCinQS7WVgv6UVdLUzGqPTs3dMW1JLwsSuqfuixKEOFbqzquH62jp8CfINiOew00hLDP9oHr";

            DataTable invoiceDt = null;
            SqlParameter[] sqlActionsParameter =
                               {
                                   new SqlParameter("@invId", SqlDbType.Int) {Value = InvoiceId},
                               };
            string spName = "SP_GetInvoiceLineItem";
            invoiceDt = RetrieveInvoiceList(InvoiceId);
            List<InvoiceLineItem> InvoiceList = DatatableConvertion.ConvertDataTable<InvoiceLineItem>(invoiceDt);
            var LineItemstripe = new List<SessionLineItemOptions>();


            foreach (var item in InvoiceList)
            {
                var lineItems = new SessionLineItemOptions
                {
                    Name = item.ProductName,
                    Description = item.ProductName,
                    Amount = (long?)item.Price * 100,
                    //Amount = 1500,
                    Currency = "usd",
                    Quantity = (long?)item.quantity,

                };
                LineItemstripe.Add(lineItems);
            }


            //var InvoiceLineList = InvoiceList.Select(x => new { x.InvoiceID}).Distinct();
            var objcustomeroptions = new CustomerCreateOptions
            {

            };
            var objcustomerservice = new CustomerService();
            var customer = objcustomerservice.Create(objcustomeroptions);


            var options = new SessionCreateOptions
            {
                SuccessUrl = "https://arcbill-qa.archarina.com/PaymentSuccessfull.aspx?_id=" + InvoiceId+"",
                CancelUrl = "https://arcbill-qa.archarina.com/PaymentFaild.aspx",
                PaymentMethodTypes = new List<string> { "card",
                //    "acss_debit",
                "us_bank_account"
                 //   "bacs_debit"  
                },
                //*** CustomerEmail = "gopinathganeesan@outlook.com",
                Customer = customer.Id,
                LineItems = LineItemstripe,
                Mode = "payment",
            };
            var service = new SessionService();
            Session session = service.Create(options);
            sessionId = session.Id;


            //string data = string.Empty;

            //  Wepaypayment wepaypayment = new Wepaypayment();
            // CreatePaymentMethodRequest objrequest = new CreatePaymentMethodRequest();
            //objrequest.type = "payment_bank_us";
            //objrequest.custom_data.my_key = "hjfsdjhfdsf";
            //objrequest.payment_bank_us.account_holder.holder_name = "Benedict";
            //objrequest.payment_bank_us.account_number = "00464232";
            //objrequest.payment_bank_us.account_type = "checking";
            //objrequest.payment_bank_us.routing_number = "021000021";

            //var task = wepaypayment.CreatePaymentMethod(objrequest);
            //var result = task.Result;
            //var accid= result.id;

            //PaymentRequest objpament = new PaymentRequest();
            //string Uniqkey = "KU '" + DateTime.Now.ToString("yyyyMMddHHss") + "'";

            //objpament.account_id = "4dfac073-49b5-44c2-9ee4-d5f58db55f72";
            //objpament.amount = Amount;
            //objpament.currency = "USD";
            //objpament.payment_method.type = "payment_method_id";
            //objpament.payment_method.payment_method_id = "00000000-6261-5553-0000-0000000706fd";
            //objpament.fee_amount = 0;
            //objpament.initiated_by = "customer";
            //objpament.reference_id = "dfeb052b-ae8c-4a69-b909-8d9ecdd7c742";
            //var Payment = wepaypayment.CreatePayment(objpament, Uniqkey, InvoiceId, Login.Connection);
            return sessionId;

        }

        public static DataTable RetrieveInvoiceList(int invoiceid)
        {
            DataTable dataTable = new DataTable();
            try
            {
                using (var adapter = new SqlDataAdapter("SP_GetInvoiceLineItem", Login.Connection))
                {
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.SelectCommand.Parameters.Add("@invId", SqlDbType.Int).Value = invoiceid;
                    adapter.Fill(dataTable);
                    return dataTable;
                };
            }
            catch (Exception ex)
            {
            }
            return null;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string SaveMarkaspaid(int InvoiceId)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int datastatus = 0;
            try
            {
                datastatus = InvoiceLogic.UpdatePaidInvoiceStatus(InvoiceId, Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetBillDetails()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                ds = InvoiceLogic.FetchBillDetails(Login.Connection);
                if (ds.Tables.Count > 0)
                {
                    data = ISCLibrary.Utilities.Utilities.SerializedDataSet(ds);
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
        public static int SavePartial(SavePartialObjects objPartial)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = InvoiceLogic.InsertPartialPaid(objPartial, Login.Connection);
                
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
        public static string GetInvoicrecurringdetails()
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            try
            {
                data = InvoiceLogic.GetInvoInVoicRecurringdetails(Login.Connection);

            }
            catch (Exception ex)
            {
                ExceptionLogEntry.LogException(ex);
            }
            return data;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int Stoprecurring(int Invoiceid)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = InvoiceLogic.Stoprecurring(Invoiceid, Login.Connection);
                //int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objCustomer.CustomerName + " ", "Customer List", Login.Connection);
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
        public static int Editrecurring(int Invoiceid,string Recurringstartdate,string Recurringenddate,string Frequency)
        {
            DataSet ds = new DataSet();
            string data = string.Empty;
            int postStatus = 0;
            try
            {
                postStatus = InvoiceLogic.Editrecurring(Invoiceid, Recurringstartdate, Recurringenddate, Frequency, Login.Connection);
                //int PostStatus = ApplicationUsers.InsertAuditlog("Modified", "Modified" + " " + objCustomer.CustomerName + " ", "Customer List", Login.Connection);
            }
            catch (Exception ex)
            {
                postStatus = 0;
                ExceptionLogEntry.LogException(ex);
            }
            return postStatus;
        }
        //[System.Web.Services.WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public static string DwonloadPDF(int BillId)
        //{
        //    DataSet ds = new DataSet();
        //    string data = string.Empty;
        //    try
        //    {
        //        //data = InvoiceLogic.GetTimelinelist(BillId, Login.Connection);
        //        //InvoiceList1 doc = new InvoiceList1();

        //        //doc.DocumentDwonload();

        //        GeneratePDF("tesy");
        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionLogEntry.LogException(ex);
        //    }
        //    return data;
        //}


        //public void DocumentDwonload()
        //{

        //    try
        //    {
        //        StringBuilder sb = new StringBuilder();
        //        sb.Append("<header class='clearfix'>");
        //        sb.Append("<h1>INVOICE</h1>");
        //        sb.Append("<div id='company' class='clearfix'>");
        //        sb.Append("<div>Company Name</div>");
        //        sb.Append("<div>455 John Tower,<br /> AZ 85004, US</div>");
        //        sb.Append("<div>(602) 519-0450</div>");
        //        sb.Append("<div><a href='mailto:company@example.com'>company@example.com</a></div>");
        //        sb.Append("</div>");
        //        sb.Append("<div id='project'>");
        //        sb.Append("<div><span>PROJECT</span> Website development</div>");
        //        sb.Append("<div><span>CLIENT</span> John Doe</div>");
        //        sb.Append("<div><span>ADDRESS</span> 796 Silver Harbour, TX 79273, US</div>");
        //        sb.Append("<div><span>EMAIL</span> <a href='mailto:john@example.com'>john@example.com</a></div>");
        //        sb.Append("<div><span>DATE</span> April 13, 2016</div>");
        //        sb.Append("<div><span>DUE DATE</span> May 13, 2016</div>");
        //        sb.Append("</div>");
        //        sb.Append("</header>");
        //        sb.Append("<main>");
        //        sb.Append("<table>");
        //        sb.Append("<thead>");
        //        sb.Append("<tr>");
        //        sb.Append("<th class='service'>SERVICE</th>");
        //        sb.Append("<th class='desc'>DESCRIPTION</th>");
        //        sb.Append("<th>PRICE</th>");
        //        sb.Append("<th>QTY</th>");
        //        sb.Append("<th>TOTAL</th>");
        //        sb.Append("</tr>");
        //        sb.Append("</thead>");
        //        sb.Append("<tbody>");
        //        sb.Append("<tr>");
        //        sb.Append("<td class='service'>Design</td>");
        //        sb.Append("<td class='desc'>Creating a recognizable design solution based on the company's existing visual identity</td>");
        //        sb.Append("<td class='unit'>$400.00</td>");
        //        sb.Append("<td class='qty'>2</td>");
        //        sb.Append("<td class='total'>$800.00</td>");
        //        sb.Append("</tr>");
        //        sb.Append("<tr>");
        //        sb.Append("<td colspan='4'>SUBTOTAL</td>");
        //        sb.Append("<td class='total'>$800.00</td>");
        //        sb.Append("</tr>");
        //        sb.Append("<tr>");
        //        sb.Append("<td colspan='4'>TAX 25%</td>");
        //        sb.Append("<td class='total'>$200.00</td>");
        //        sb.Append("</tr>");
        //        sb.Append("<tr>");
        //        sb.Append("<td colspan='4' class='grand total'>GRAND TOTAL</td>");
        //        sb.Append("<td class='grand total'>$1,000.00</td>");
        //        sb.Append("</tr>");
        //        sb.Append("</tbody>");
        //        sb.Append("</table>");
        //        sb.Append("<div id='notices'>");
        //        sb.Append("<div>NOTICE:</div>");
        //        sb.Append("<div class='notice'>A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>");
        //        sb.Append("</div>");
        //        sb.Append("</main>");
        //        sb.Append("<footer>");
        //        sb.Append("Invoice was created on a computer and is valid without the signature and seal.");
        //        sb.Append("</footer>");

        //        StringReader sr = new StringReader(sb.ToString());
        //        Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
        //        HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

        //        using (MemoryStream memoryStream = new MemoryStream())
        //        {
        //            PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
        //            pdfDoc.Open();

        //            htmlparser.Parse(sr);
        //            pdfDoc.Close();

        //            byte[] bytes = memoryStream.ToArray();
        //            memoryStream.Close();


        //            HttpContext.Current.Response.Clear();



        //            HttpContext.Current.Response.ContentType = "application/pdf";

        //            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=Invoice.pdf");


        //            HttpContext.Current.Response.Buffer = true;

        //            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        //            HttpContext.Current.Response.BinaryWrite(bytes);

        //            //HttpContext.Current.Response.Flush(); 
        //            //HttpContext.Current.Response.SuppressContent = true;  
        //            // HttpContext.Current.ApplicationInstance.CompleteRequest();

        //            HttpContext.Current.Response.End();

        //            HttpContext.Current.Response.Close();
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        //protected void PDFDwonload_Click(object sender, EventArgs e)
        //{
        //   // DocumentDwonload();

        //    StringBuilder sb = new StringBuilder();
        //    sb.Append("<header class='clearfix'>");
        //    sb.Append("<h1>INVOICE</h1>");
        //    sb.Append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
        //    sb.Append("<tbody>");
        //    sb.Append("<tr>");
        //    sb.Append("<td>1</td>");
        //    sb.Append("<td>2</td>");
        //    sb.Append("<td>3</td>");
        //    sb.Append("</tr>");
        //    sb.Append("</tbody>");
        //    sb.Append ("</table>");
        //    sb.Append("</header>");

        //    StringReader sr = new StringReader(sb.ToString());
        //    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
        //    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
        //    using (MemoryStream memoryStream = new MemoryStream())
        //    {
        //        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
        //        pdfDoc.Open();

        //        htmlparser.Parse(sr);
        //        pdfDoc.Close();

        //        byte[] bytes = memoryStream.ToArray();
        //        memoryStream.Close();


        //        // Clears all content output from the buffer stream
        //        Response.Clear();
        //        // Gets or sets the HTTP MIME type of the output stream.
        //        Response.ContentType = "application/pdf";
        //        // Adds an HTTP header to the output stream
        //        Response.AddHeader("Content-Disposition", "attachment; filename=Invoice.pdf");

        //        //Gets or sets a value indicating whether to buffer output and send it after
        //        // the complete response is finished processing.
        //        Response.Buffer = true;
        //        // Sets the Cache-Control header to one of the values of System.Web.HttpCacheability.
        //        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        //        // Writes a string of binary characters to the HTTP output stream. it write the generated bytes .
        //        Response.BinaryWrite(bytes);

        //        // Sends all currently buffered output to the client, stops execution of the
        //        // page, and raises the System.Web.HttpApplication.EndRequest event.
        //        Response.End();
        //        // Closes the socket connection to a client. it is a necessary step as you must close the response after doing work.its best approach.
        //        Response.Close();
        //    }
        //}


        //public static string GeneratePDF(string LetterBodyHTML)
        //{

        //    LetterBodyHTML = @"<table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody style=""display: inline-block;""> <tr style=""width: 683px; display: flex; background-color: #1589ee; color: #fff; padding-left: 17px; font-family: Arial, Verdana, Helvetica, sans-serif; height: 100px;""> <td style=""width: 365px;""><h1 style=""padding-top: 5px; font-weight: 500; font-size: 35px; padding-left: 10px;"">INVOICE</h1></td> <td style=""width: 182.5px; padding-top: 13px;""> <p style=""margin-bottom: -9px; font-size: 12px;"">647-444-1234</p><p style=""margin-bottom: -9px; font-size: 12px;"">your@email.com</p><p style=""margin-bottom: -9px; font-size: 12px;"">yourwebsite.com</p></td> <td style=""width: 182.5px; padding-top: 13px;""><p style=""margin-bottom: -9px; font-size: 12px;"">1. Your Address</p><p style=""margin-bottom: -9px; font-size: 12px;"">City, State, Country</p><p style=""margin-bottom: -9px; font-size: 12px;"">ZIPCODE</p></td> </tr> <tr style=""width: 667px; display: flex; padding: 30px;""> <td style=""width: 120px;""> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody><tr> <td> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody><tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; color: #9e9e9e; margin:100px"">Billed To</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px;"">Client Name</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px; "">1 Client address </td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px; "">City, State, Country</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding-top: 4px; "">ZIPCODE </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> <td style=""width: 240px;""> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody><tr> <td> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody><tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; color: #9e9e9e;"">Invoice Number</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; "">000000</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; color: #9e9e9e;padding-top:25px;"">Date of issue </td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px;"">10/07/14</td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> <td style=""width: 365px;"" valign=""top""> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody><tr> <td style=""font-family:Arial, Verdana, Helvetica, sans-serif; font-weight:300; font-size:13px;"" align=""right"">Invoice total</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 500; color:#1589ee; font-size:28px;padding-top:12px;"" align=""right"">$4520.00</td> </tr> </tbody></table> </td> </tr> <tr> <td colspan=""2"">&nbsp;</td> </tr> <tr style=""width: 700px;display: inline-block;""> <td colspan=""3"" style=""width: 700px;""> <table width=""100%"" border=""0"" cellspacing=""2"" cellpadding=""2""> <thead> <tr style=""""> <th style=""font-family: Arial, Verdana, Helvetica, sans-serif; text-align: left; padding-top: 10px; color: #1589ee; font-size: 15px; padding-left: 5px; border-top: 2px solid #1589ee; padding-bottom:5px;""> Description </th> <th style=""font-family: Arial, Verdana, Helvetica, sans-serif; padding-top: 10px; color: #1589ee; font-size: 15px; border-top: 2px solid #1589ee;""> Unit Cost </th> <th style="" font-family: Arial, Verdana, Helvetica, sans-serif; padding-top: 10px; color: #1589ee; font-size: 15px; border-top: 2px solid #1589ee;""> Qty/ Hr Rate </th> <th style=""font-family: Arial, Verdana, Helvetica, sans-serif; padding-top: 10px; color: #1589ee; font-size: 15px; border-top: 2px solid #1589ee;""> Amount </th> </tr> </thead> <tbody><tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px;"" width=""34%"" height=""32"">Your item Name<br/><span style=""font-weight: 500; color: #9e9e9e;"">item description goes here</span></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""26%"" align=""center"">$1000</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""25%"" align=""center"">1</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""15%"" align=""center"">1000</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px;"" width=""34%"" height=""32"">Your item Name<br/><span style=""font-weight: 500; color: #9e9e9e;"">item description goes here</span></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""26%"" align=""center"">$1000</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""25%"" align=""center"">1</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""15%"" align=""center"">1000</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px;"" width=""34%"" height=""32"">Your item Name<br/><span style=""font-weight: 500; color: #9e9e9e;"">item description goes here</span></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""26%"" align=""center"">$1000</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""25%"" align=""center"">1</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""15%"" align=""center"">1000</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px;"" width=""34%"" height=""32"">Your item Name<br/><span style=""font-weight: 500; color: #9e9e9e;"">item description goes here</span></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""26%"" align=""center"">$1000</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""25%"" align=""center"">1</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; border-bottom: 1px solid #dadada; padding: 8px; "" width=""15%"" align=""center"">1000</td> </tr> </tbody></table> </td> </tr> <tr> <td colspan=""2"">&nbsp;</td> </tr> <tr> <td colspan=""2"">&nbsp;</td> </tr> <tr style=""width: 700px;display: inline-block;""> <td colspan=""3"" style=""width: 700px;""> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <thead> </thead> <tbody><tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px;"" width=""55%"" height=""32""></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; color: #1589ee;text-align:right;padding-right:25px; "" width=""30%"">Subtotal</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; text-align: right; "" width=""15%"">$4000.00</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px;"" width=""55%"" height=""32""></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #1589ee; text-align: right; padding-right: 25px; "" width=""30%"">Tax</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; text-align: right; "" width=""15%"">$520.00</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px;"" width=""55%"" height=""32""></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #1589ee; text-align: right; padding-right: 25px; "" width=""30%"">Total</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; text-align: right; padding-top: 0px; "" width=""15%"">$4520.00</td> </tr> <tr> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #9e9e9e;"" width=""55%"" height=""32"">Invoice Terms<br/><span style=""font-weight:600; color:#000;"">Ex. Please pay your invoice by.... </span></td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; color: #1589ee; text-align: right; padding-right: 25px; "" width=""30%"">Amount Due(USD)</td> <td style=""font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: 600; font-size: 13px; padding: 6px; padding-top: 0px; text-align: right; "" width=""15%"">$4520.00</td> </tr> </tbody></table> </td> </tr> <tr> <td colspan=""2"">&nbsp;</td> </tr> </tbody> </table>";

        //    string destinationpdffile = string.Empty;
        //    string destinationPDFfilepath = string.Empty;
        //    string htmltext = string.Empty;
        //    string htmlReplacedLetter = string.Empty;
        //    string termAndConditionsHTML = string.Empty;
        //    string securityCommitmentsHTML = string.Empty;
        //    string date = string.Empty;
        //    string datesWithFormat = string.Empty;
        //    string temphtml = string.Empty;
        //    string oldDateWithSpan = string.Empty;
        //    string span = string.Empty;
        //    string OldDate = string.Empty;
        //    string NewDateWithSpan = string.Empty;
        //    try
        //    {

        //        LetterBodyHTML = LetterBodyHTML.Replace("<html>", "");
        //        LetterBodyHTML = LetterBodyHTML.Replace("</html>", "");


        //        htmlReplacedLetter = "<html><head></head><body style='font-family:times; font-size:14px; line-spacing: 13px;'>" + LetterBodyHTML + "</body></html>";

        //        Guid objfilename = Guid.NewGuid();
        //        destinationpdffile = "E:\\Test12456789.pdf";// ITextEvents.pdftempoutputpath + "\\" + Convert.ToString(objfilename) + ".pdf";
        //        BaseColor baseColor = new BaseColor(0, 0, 0);
        //        BaseFont bfTimes = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, false);
        //        Font baseTextFont = new Font(bfTimes, 10, Font.NORMAL, baseColor);
        //        Document doc = new Document(PageSize.LETTER, 35f, 54f, 100f, 72f);
        //        PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(destinationpdffile, FileMode.Create));


        //        writer.PageEvent = new ITextEvents();
        //        doc.Open();
        //        PdfContentByte myPdfContentByte = writer.DirectContent;


        //        var tagProcessors = (DefaultTagProcessorFactory)Tags.GetHtmlTagProcessorFactory();
        //        tagProcessors.RemoveProcessor(HTML.Tag.IMG); // remove the default processor                
        //        tagProcessors.AddProcessor(HTML.Tag.IMG, new CustomImageTagProcessor()); // use our new processor

        //        // Register Fonts
        //        FontFactory.RegisterDirectory(ITextEvents.lbmc_pdf_base_font_path);
        //        List<string> lstregfonts = new List<string>();
        //        foreach (string item in FontFactory.RegisteredFonts)
        //        {
        //            lstregfonts.Add(item);
        //        }

        //        // Set factories
        //        //var htmlContext = new HtmlPipelineContext(null);
        //        //htmlContext.SetTagFactory(Tags.GetHtmlTagProcessorFactory());

        //        //Set css
        //        ICSSResolver cssResolver = XMLWorkerHelper.GetInstance().GetDefaultCssResolver(false);
        //        cssResolver.AddCss("body{font-family:Arial; color:#000000; background-color: #ffffff; font-size:11px;} p{font-family:times; font-size:11px;} .wingdings{font-family:wingdings} li{font-family:times; font-size:11px;} table td{font-family:times; font-size:11px;} ul li{list-style:circle;}", true);

        //        // Set Font to Pipeline
        //        var charset = Encoding.UTF8;
        //        XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
        //        fontProvider.RegisterDirectory(ITextEvents.lbmc_pdf_base_font_path);
        //        fontProvider.RegisterFamily("times", "times", ITextEvents.lbmc_pdf_base_font_path + "times.ttf");
        //        var hpc = new HtmlPipelineContext(new CssAppliersImpl(fontProvider));

        //        hpc.SetAcceptUnknown(true).AutoBookmark(true).SetTagFactory(tagProcessors); // inject the tagProcessors
        //        var htmlPipeline = new HtmlPipeline(hpc, new PdfWriterPipeline(doc, writer));
        //        var pipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
        //        var worker = new XMLWorker(pipeline, true);
        //        var xmlParser = new XMLParser(true, worker, charset);
        //        var eh = new ElementHandler();
        //        StringBuilder sb = new StringBuilder(htmlReplacedLetter);


        //        using (TextReader sr = new StringReader(sb.ToString()))
        //        {
        //            xmlParser.Parse(sr);
        //        }

        //        doc.Close();
        //        doc.Dispose();

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }


        //    DownloadPDFDocument(destinationpdffile);
        //    return destinationpdffile;
        //}
        //public class ElementHandler : IElementHandler
        //{
        //    //Generic list of elements
        //    public List<IElement> elements = new List<IElement>();
        //    //Add the supplied item to the list
        //    public void Add(IWritable w)

        //    {
        //        try
        //        {
        //            if (w is WritableElement)
        //            {
        //                elements.AddRange(((WritableElement)w).Elements());
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            ExceptionLogEntry.LogException(ex);
        //        }
        //    }
        //}
        //public static void DownloadPDFDocument(string fileFullPath)
        //{
        //    try
        //    {
        //        System.IO.FileInfo file = new System.IO.FileInfo(fileFullPath);
        //        HttpContext.Current.Response.Clear();
        //        HttpContext.Current.Response.BufferOutput = false;
        //        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + file.Name);
        //        HttpContext.Current.Response.AddHeader("Content-Length", file.Length.ToString());
        //        HttpContext.Current.Response.ContentType = "application/pdf";
        //        HttpContext.Current.Response.TransmitFile(fileFullPath);
        //        HttpContext.Current.Response.Flush();
        //        HttpContext.Current.Response.End();
        //        HttpContext.Current.Response.Close();

        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionLogEntry.LogException(ex);
        //    }
        //    finally
        //    {

        //    }
        //}
        public class InvoiceLineItem
        {
            public decimal Product { get; set; }
            public decimal quantity { get; set; }
            public decimal Price { get; set; }
            public decimal Discount { get; set; }
            public decimal Tax { get; set; }
            public decimal TotamAmount { get; set; }
            public string ProductName { get; set; }
            public string InvoiceID { get; set; }
        }
    }
}