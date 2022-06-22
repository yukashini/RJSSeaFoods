using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BusinessLogic
{
  public  class ManualLog
    {
        public static void Write(string content)
        {
            try
            {
                
                     string logFilePath = ConfigurationManager.AppSettings["ManualLogFilePath"].Trim();
                     FileStream logFileStream = new FileStream(logFilePath, FileMode.OpenOrCreate, FileAccess.Write);
                    StreamWriter logWrite = new StreamWriter(logFileStream);
                    logWrite.BaseStream.Seek(0, SeekOrigin.End);
                    logWrite.WriteLine(DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt") + "  " + content);
                    logWrite.Flush();
                    logWrite.Close();
            }
            catch (Exception ex)
            {

            }
        }
    }
}
