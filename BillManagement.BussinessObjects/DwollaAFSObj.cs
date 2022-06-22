using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BussinessObjects
{
    class DwollaAFSObj
    {
    }

    
    public class AFSSelf
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSLinks
    {
        public AFSSelf self { get; set; }

        [JsonProperty("transfer-from-balance")]
        public AFSTransferFromBalance TransferFromBalance { get; set; }

        [JsonProperty("transfer-to-balance")]
        public AFSTransferToBalance TransferToBalance { get; set; }

        [JsonProperty("transfer-send")]
        public AFSTransferSend TransferSend { get; set; }
        public AFSRemove remove { get; set; }

        [JsonProperty("transfer-receive")]
        public AFSTransferReceive TransferReceive { get; set; }
        public AFSAccount account { get; set; }
        public AFSBalance balance { get; set; }

        [JsonProperty("with-available-balance")]
        public AFSWithAvailableBalance WithAvailableBalance { get; set; }
    }

    public class AFSTransferFromBalance
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSTransferToBalance
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSTransferSend
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSRemove
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSTransferReceive
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSAccount
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSBalance
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSWithAvailableBalance
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class AFSFundingSource
    {
        public AFSLinks _links { get; set; }
        public string id { get; set; }
        public string status { get; set; }
        public string type { get; set; }
        public string bankAccountType { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
        public bool removed { get; set; }
        public List<string> channels { get; set; }
        public string bankName { get; set; }
    }

    public class AFSEmbedded
    {
        [JsonProperty("funding-sources")]
        public List<AFSFundingSource> FundingSources { get; set; }
    }

    public class AFSRoot
    {
        public AFSLinks _links { get; set; }
        public AFSEmbedded _embedded { get; set; }
    }


    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class Account
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class Events
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class WebhookSubscriptions
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class Customers
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class Links
    {
        public Account account { get; set; }
        public Events events { get; set; }

        [JsonProperty("webhook-subscriptions")]
        public WebhookSubscriptions WebhookSubscriptions { get; set; }
        public Customers customers { get; set; }
    }

    public class AccountDRoot
    {
        public Links _links { get; set; }
    }




}
