using System;
using System.Configuration;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;

[assembly: OwinStartup(typeof(LightWeightPM.Startup))]

namespace LightWeightPM
{
    public class Startup
    {
        static string AuthorityURL = Convert.ToString(ConfigurationManager.AppSettings["authority"]);
        static string ClientID = Convert.ToString(ConfigurationManager.AppSettings["clientid"]);
        static string ClientSecretKey = Convert.ToString(ConfigurationManager.AppSettings["clientsecretkey"]);
        static string RedirectURI = Convert.ToString(ConfigurationManager.AppSettings["redirecturi"]);
        static string PostRedirectURI = Convert.ToString(ConfigurationManager.AppSettings["postlogouturi"]);
        public void Configuration(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            var rsaProvider = new RSACryptoServiceProvider(256);
            Microsoft.IdentityModel.Tokens.SecurityKey key = new Microsoft.IdentityModel.Tokens.RsaSecurityKey(rsaProvider);
            app.UseOpenIdConnectAuthentication(
            new OpenIdConnectAuthenticationOptions
            {
                Authority = AuthorityURL,
                ClientId = ClientID,
                ClientSecret = ClientSecretKey,
                PostLogoutRedirectUri = PostRedirectURI,
                Scope = "openid",
                ResponseType = "id_token",
                RedirectUri = RedirectURI,
                Notifications = new OpenIdConnectAuthenticationNotifications()
                {
                    AuthenticationFailed = (context) =>
                    {
                        if (context.Exception.Message.StartsWith("IDX21323") || context.Exception.Message.StartsWith("OICE_20004") || context.Exception.Message.Contains("IDX10311") || context.Exception.Message.Contains("IDX20803"))
                        {
                            context.SkipToNextMiddleware();
                            return Task.FromResult(0);
                        }
                        return Task.FromResult(0);
                    }
                },
                TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    NameClaimType = "name",
                    RoleClaimType = "roles",
                    IssuerSigningKey = key
                },
                AuthenticationType = OpenIdConnectAuthenticationDefaults.AuthenticationType,
            });

        }
    }
}
