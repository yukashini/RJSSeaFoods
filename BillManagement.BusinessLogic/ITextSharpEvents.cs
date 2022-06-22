using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;
using iTextSharp.tool.xml;
using System.Reflection;
using iTextSharp.tool.xml.html;
using System.Web;
using System.Text.RegularExpressions;
using System.Configuration;


using iTextSharp.tool.xml.pipeline.html;
using iTextSharp.tool.xml.pipeline.css;
using iTextSharp.tool.xml.pipeline.end;
namespace BillManagement.BusinessLogic
{

    public class ITextEvents : PdfPageEventHelper
    {

        public static string lbmc_pdf_base_font_path = Convert.ToString(ConfigurationManager.AppSettings["pdf_base_font_path"]);
        public static string lbmc_fullLogo = Convert.ToString(ConfigurationManager.AppSettings["lbmc_fullLogo"]);
        public static string pdftempoutputpath = Convert.ToString(ConfigurationManager.AppSettings["pdftempoutputpath"]);
        public static string lbmc_office = Convert.ToString(ConfigurationManager.AppSettings["lbmc_office"]);
        public static string lbmc_phonenumber = Convert.ToString(ConfigurationManager.AppSettings["lbmc_phonenumber"]);
        public static string lbmc_url = Convert.ToString(ConfigurationManager.AppSettings["lbmc_url"]);
        public static string lbmc_address = Convert.ToString(ConfigurationManager.AppSettings["lbmc_address"]);
        public static string lbmc_postbox = Convert.ToString(ConfigurationManager.AppSettings["lbmc_postbox"]);
        public static string lbmc_city = Convert.ToString(ConfigurationManager.AppSettings["lbmc_city"]);
        public static string lbmc_state = Convert.ToString(ConfigurationManager.AppSettings["lbmc_state"]);
        public static string lbmc_postalcode = Convert.ToString(ConfigurationManager.AppSettings["lbmc_postalcode"]);

        // This is the contentbyte object of the writer
        PdfContentByte cb;

        // we will put the final number of pages in a template
        PdfTemplate headerTemplate, footerTemplate;

        // this is the BaseFont we are going to use for the header / footer
        BaseFont bf = null;

        // This keeps track of the creation time
        DateTime PrintTime = DateTime.Now;
        public string letterhead = string.Empty;
        public int pageCount = 0;

        #region Fields
        private string _header;
        #endregion

        #region Properties
        public string Header
        {
            get { return _header; }
            set { _header = value; }
        }

        #endregion

        public override void OnOpenDocument(PdfWriter writer, Document doc)
        {
            try
            {
                PrintTime = DateTime.Now;
                iTextSharp.text.BaseColor footFont = new iTextSharp.text.BaseColor(91, 86, 75);
                bf = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                cb = writer.DirectContent;
                headerTemplate = cb.CreateTemplate(100, 100);
                footerTemplate = cb.CreateTemplate(100, 60);
                //    RegesterHeaderFont();
            }
            catch (DocumentException de)
            {
                //handle exception here
            }
            catch (System.IO.IOException ioe)
            {
                //handle exception here
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override void OnEndPage(iTextSharp.text.pdf.PdfWriter writer, iTextSharp.text.Document document)
        {
            try
            {
                base.OnEndPage(writer, document);
                BaseColor mainfootercolor = new BaseColor(0, 86, 154); // Blue 
                String footerNumber = Convert.ToString(writer.PageNumber);
                Paragraph pfooternumber = new Paragraph(footerNumber, FontFactory.GetFont("Calibri", 6f, iTextSharp.text.Font.BOLD, mainfootercolor));
                Rectangle pagesize = writer.PageSize;

                // ADD HEADER
                if (writer.PageNumber == 1)
                {
                    PdfPTable tblheader = new PdfPTable(1);
                    iTextSharp.text.Image headerlogo = iTextSharp.text.Image.GetInstance(lbmc_fullLogo);
                    headerlogo.ScaleToFit(170, 120);
                    headerlogo.Alignment = iTextSharp.text.Image.UNDERLYING;



                    PdfPCell tblheaderlogocell = new PdfPCell(headerlogo);
                    tblheaderlogocell.Border = Rectangle.NO_BORDER;
                    tblheaderlogocell.HorizontalAlignment = Element.ALIGN_LEFT;
                    tblheaderlogocell.PaddingLeft = 54f;
                    tblheader.AddCell(tblheaderlogocell);

                    //PdfPCell tblheaderaddresscell = new PdfPCell(headeraddresstext);
                    //tblheaderaddresscell.Border = Rectangle.NO_BORDER;
                    //tblheaderaddresscell.HorizontalAlignment = Element.ALIGN_LEFT;
                    //tblheader.AddCell(tblheaderaddresscell);

                    tblheader.TotalWidth = document.PageSize.Width - 20f;
                    tblheader.WidthPercentage = 100;
                    tblheader.WriteSelectedRows(0, -1, 0, (document.PageSize.Height - 25), writer.DirectContent);

                    cb.MoveTo(60, document.PageSize.Height - 100);
                    cb.Stroke();

                    document.SetMargins(35f, 54f, 72f, 72f);
                }


                // Add Footer
                PdfPTable footerTbl = new PdfPTable(1);
                footerTbl.TotalWidth = document.PageSize.Width;
                PdfPCell fottercell = new PdfPCell(pfooternumber);
                fottercell.Border = 0;
                fottercell.HorizontalAlignment = Element.ALIGN_CENTER;
                footerTbl.AddCell(fottercell);
                footerTbl.WriteSelectedRows(0, -1, 0, document.PageSize.Height - (document.PageSize.Height - 50), writer.DirectContent);
                cb.MoveTo(40, document.PageSize.GetBottom(50));
                cb.Stroke();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override void OnCloseDocument(PdfWriter writer, Document document)
        {
            try
            {
                base.OnCloseDocument(writer, document);
                footerTemplate.BeginText();
                footerTemplate.SetFontAndSize(bf, 9);
                footerTemplate.SetTextMatrix(0, 0);
                footerTemplate.ShowText((writer.PageNumber - 1).ToString());
                footerTemplate.EndText();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class CustomImageTagProcessor : iTextSharp.tool.xml.html.Image
    {
        public override IList<IElement> End(IWorkerContext ctx, Tag tag, IList<IElement> currentContent)
        {
            IDictionary<string, string> attributes = tag.Attributes;

            string src;
            if (!attributes.TryGetValue(HTML.Attribute.SRC, out src))
                return new List<IElement>(1);

            if (string.IsNullOrEmpty(src))
                return new List<IElement>(1);

            if (src.StartsWith("data:image/", StringComparison.InvariantCultureIgnoreCase))
            {
                var base64Data = src.Substring(src.IndexOf(",") + 1);
                var imagedata = Convert.FromBase64String(base64Data);
                var image = iTextSharp.text.Image.GetInstance(imagedata);

                var list = new List<IElement>();
                var htmlPipelineContext = GetHtmlPipelineContext(ctx);
                list.Add(GetCssAppliers().Apply(new Chunk((iTextSharp.text.Image)GetCssAppliers().Apply(image, tag, htmlPipelineContext), 0, 0, true), tag, htmlPipelineContext));
                return list;
            }
            else
            {
                return base.End(ctx, tag, currentContent);
            }

        }

    }




}
