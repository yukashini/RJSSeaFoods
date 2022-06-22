using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Collections;
using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling.Logging;
using Microsoft.Practices.EnterpriseLibrary.Logging.ExtraInformation;

namespace BillManagement.BusinessLogic
{
    public class InformationLogEntry : LogEntry
    {
        public InformationLogEntry(string message) : this(message, 2, "CP General Information") { }
        public InformationLogEntry(string message, int priority) : this(message, 2, "CP General Information") { }
        public InformationLogEntry(string message, int priority, string title)
            : base()
        {
            TimeStamp = DateTime.Now;
            Title = title;
            Message = message;
            Categories.Add("General");
            Severity = TraceEventType.Information;
            Priority = priority;
            MachineName = Environment.MachineName;
        }
    }

    public class VerboseLogEntry : LogEntry
    {
        public VerboseLogEntry(string message) : this(message, 0, "CP General debug Information") { }
        public VerboseLogEntry(string message, int priority) : this(message, priority, "CP General debug Information") { }
        public VerboseLogEntry(string message, int priority, string title)
            : base()
        {
            TimeStamp = DateTime.Now;
            Title = title;
            Message = message;
            Categories.Add("General");
            Severity = TraceEventType.Verbose;
            Priority = priority;
            MachineName = Environment.MachineName;
        }
    }

    public class ExceptionLogEntry
    {
        public static void LogException(Exception ex)
        {
           // ExceptionPolicy.HandleException(ex, "ExceptionPolicy");
        }
    }
}
