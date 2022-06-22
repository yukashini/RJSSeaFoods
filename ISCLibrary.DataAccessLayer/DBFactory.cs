using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.Common;

namespace ISCLibrary.DataAccessLayer
{
    public class DBFactory
    {
        internal static DbConnection GetConnection(string connection, string provider)
        {
            try
            {

                string ConnectionString = Convert.ToString(connection);
                DbProviderFactory Dbfactory = DBFactory.GetDbFactory(provider);
                DbConnection conn = Dbfactory.CreateConnection();
                conn.ConnectionString = ConnectionString;
                return conn;
            }
            catch (DbException)
            {
                throw new Exception("An exception has occurred while creating the connection. Please check Connection String settings in the web.config file.");
            }
        }
        internal static DbProviderFactory GetDbFactory(string provider)
        {
            try
            {
                DbProviderFactory Dbfactory = DbProviderFactories.GetFactory(provider);
                return Dbfactory;
            }
            catch (DbException)
            {
                throw new Exception("An exception has occurred while creating the database provider factory. Please check the ProviderName specified in the web.config file.");
            }
        }
        internal static DbProviderFactory GetDbFactories(string ProviderName)
        {
            DataTable dtProviders = DbProviderFactories.GetFactoryClasses();

            if (dtProviders.Rows.Count == 0)
            {
                throw new Exception("No Data Providers are installed in the .Net FrameWork that implement the abstract DbProviderFactory Classes. ");
            }

            bool errorFlag = false;
            foreach (DataRow dr in dtProviders.Rows)
            {
                if (dr[2] != null)
                {
                    string ExistingProviderName = dr[2].ToString();
                    if (ProviderName.ToLower() == ExistingProviderName.Trim().ToLower())
                    {
                        errorFlag = false;
                        break;
                    }
                    else
                    {
                        errorFlag = true;
                    }

                }
            }

            if (errorFlag)
            {
                throw new Exception("The ProviderName string supplied is not a valid Provider Name<BR>or it does not implement the abstract DbProviderFactory Classes. <BR>The string ProviderName is case-sensitive. Also please check it for proper spelling. ");
            }
            DbProviderFactory Dbfactory = DbProviderFactories.GetFactory(ProviderName);
            return Dbfactory;
        }

        public static DbConnection GetDBConnection(string connection, string provider)
        {
            try
            {

                string ConnectionString = Convert.ToString(connection);
                DbProviderFactory Dbfactory = DBFactory.GetDbFactory(provider);
                DbConnection conn = Dbfactory.CreateConnection();
                conn.ConnectionString = ConnectionString;
                return conn;
            }
            catch (DbException)
            {
                throw new Exception("An exception has occurred while creating the connection. Please check Connection String settings in the web.config file.");
            }
        }

    }
}
