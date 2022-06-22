
# PayPal Merchant SDK


The PayPal Merchant SDK C#.NET Class Library project contains classes that allow you to integrate with the Merchant APIs. The PayPal Merchant SDK provides the following:

   * ExpressCheckout: The ExpressCheckout family of API operations allow you to accept paypal payments on your website.
   * DoDirectPayment: The DoDirectPayment API Operation enables you to process a credit card payment.
   * MassPay: The MassPay API operation makes a payment to one or more PayPal account holders.
   * RecurringPayments: The Recurring Payment family of APIs allow you to create and manage automatically recurring payments.
   * Reference Transactions: The DoReferenceTransaction API operation processes a payment from a buyer?s account, which is identified by a previous transaction.


## Prerequisites

   * Visual Studio 2005 or higher
   * .NET Framework 2.0 or higher
   * (Optional) NuGet 2.2 for managing dependencies

## Using the SDK

   To use the SDK in your application, you must
   
   * Get the PayPalMerchantSDK dll via NuGet or from the download bundle and add references to the PayPalMerchantSDK and PayPalCoreSDK libraries.
   * Additionally, if you want to use third party permissioning in your app, add a reference to the PayPalPermissionsSDK library.
   * Configure your app as detailed in the configuration section below.
   
## SDK Configuration

  An application that uses the PayPal SDKs can be configured in one of two ways -
  
  * Using the Web.Config / App.Config files.

	```html
    <configSections>
	<section name="paypal" type="PayPal.Manager.SDKConfigHandler, PayPalCoreSDK" />
	<section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
	</configSections>
	<!-- PayPal SDK config -->
	<paypal>
	<settings>
	    <add name="mode" value="sandbox"/>
	    <add name="connectionTimeout" value="30000"/>
	    .....
	</settings>
	<accounts>
	    <account apiUsername="jb-us-seller_api1.paypal.com" apiPassword="..." apiSignature="..."/>
	    <account apiUsername="enduser_biz_api1.gmail.com" apiPassword="..." apiCertificate="..." privateKeyPassword="..."/>
	</accounts>
	</paypal>
    ```
  
  * Or, by dynamically passing in a dictionary (that you can load from a database or as suits your needs).

    ```csharp
    Dictionary<string, string> config = new Dictionary<string, string>();
    config.Add("mode", "sandbox");
    config.Add("account1.apiUsername", "jb-us-seller_api1.paypal.com");
    config.Add("account1.apiPassword", "...");
    config.Add("account1.apiSignature", "...");

    PayPalAPIInterfaceService s = new  PayPalAPIInterfaceService(config);
    ```

	You can refer full list of configuration parameters in [wiki](https://github.com/paypal/sdk-core-dotnet/wiki/SDK-Configuration-Parameters)
	
## Links

   * [Installing NuGet in Visual Studio 2005 & 2008] (https://github.com/paypal/sdk-core-dotnet/wiki/Using-Nuget-in-Visual-Studio-2005-&-2008)
   * [Installing NuGet in Visual Studio 2010 & 2012] (https://github.com/paypal/sdk-core-dotnet/wiki/Using-Nuget-in-Visual-Studio-2010-&-2012)
