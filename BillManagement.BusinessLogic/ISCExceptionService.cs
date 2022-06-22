using Newtonsoft.Json;
using RestSharp;
using System;
using System.Configuration;

public class ISCExceptionService
{
    private static string _ApplicationName = Convert.ToString(ConfigurationManager.AppSettings["ApplicationName"]);
    private static string _EnvironmentName = Convert.ToString(ConfigurationManager.AppSettings["EnvironmentName"]);
    private static string _ExceptionAPIURL = Convert.ToString(ConfigurationManager.AppSettings["ExceptionAPIURL"]);
    private static bool _IsServiceEnabled = Convert.ToBoolean(ConfigurationManager.AppSettings["IsExceptionServiceEnabled"]);


    public static void SendException(Exception ObjException)
    {
        try
        {
            if (_IsServiceEnabled)
            {
                ExceptionClass ObjExceptionClass = new ExceptionClass();
                ObjExceptionClass.ApplicationName = _ApplicationName;
                ObjExceptionClass.EnvironmentName = _EnvironmentName;
                ObjExceptionClass.ExceptionMessage = ObjException.Message;
                ObjExceptionClass.Support2 = ObjException.StackTrace;
                ObjExceptionClass.objException = ObjException.InnerException;
                var client = new RestClient(_ExceptionAPIURL);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/json");
                request.AddParameter("application/json", JsonConvert.SerializeObject(ObjExceptionClass), ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    throw new ExceptionServiceException("Exception Service not reachable with the status code - " + response.StatusCode);
                }
            }
            else
            {
               //manual log
            }
        }
        catch (Exception ex)
        {
           
        }
    }
}

public class ExceptionClass
{
    public string ApplicationName { get; set; }
    public string EnvironmentName { get; set; }
    public string ClientIP { get; set; }
    public string ExceptionMessage { get; set; }
    public string ExceptionLineNumber { get; set; }
    public string FileName { get; set; }
    public string Support1 { get; set; }
    public string Support2 { get; set; }
    public string Support3 { get; set; }
    public string Support4 { get; set; }
    public string Support5 { get; set; }

    public Exception objException { get; set; }
}

[Serializable]
public class ExceptionServiceException : Exception
{
    public ExceptionServiceException()
    {

    }

    public ExceptionServiceException(string message)
        : base(message)
    {

    }

    public ExceptionServiceException(string message, Exception inner)
        : base(message, inner)
    {
    }
}