using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BillManagement.BussinessObjects
{
   public class DwollaObjects
    {
    }

    public class cdSelf
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdFirst
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdLast
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdLinks
    {
        public cdSelf self { get; set; }
        public cdFirst first { get; set; }
        public cdLast last { get; set; }
        public cdDeactivate deactivate { get; set; }
        public cdReceive receive { get; set; }

        [JsonProperty("edit-form")]
        public cdEditForm EditForm { get; set; }
        public cdEdit edit { get; set; }

        [JsonProperty("funding-sources")]
        public cdFundingSources FundingSources { get; set; }
        public cdTransfers transfers { get; set; }
    }

    public class cdDeactivate
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdReceive
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdEditForm
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdEdit
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdFundingSources
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdTransfers
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cdCustomer
    {
        public cdLinks _links { get; set; }
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string type { get; set; }
        public string status { get; set; }
        public DateTime created { get; set; }
        public string businessName { get; set; }
        public string custId { get; set; }
     
    }

    public class cdEmbedded
    {
        public List<cdCustomer> customers { get; set; }
    }

    public class cdRoot
    {
        public cdLinks _links { get; set; }
        public cdEmbedded _embedded { get; set; }
        public int total { get; set; }
    }

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class fsSelf
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class fsFundingSource
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class fsLinks
    {
        public fsSelf self { get; set; }

        [JsonProperty("funding-source")]
        public fsFundingSource FundingSource { get; set; }
    }

    public class fsBalance
    {
        public string value { get; set; }
        public string currency { get; set; }
    }

    public class fsTotal
    {
        public string value { get; set; }
        public string currency { get; set; }
    }

    public class fsRoot
    {
        public fsLinks _links { get; set; }
        public fsBalance balance { get; set; }
        public fsTotal total { get; set; }
        public DateTime lastUpdated { get; set; }


    }
    public class FundSource
    {
        public string routingNumber { get; set; }
        public string accountNumber { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string fundId { get; set; }
    }


    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class tlSelf
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlFirst
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlLast
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlLinks
    {
        public tlSelf self { get; set; }
        public tlFirst first { get; set; }
        public tlLast last { get; set; }
        public tlSource source { get; set; }

        [JsonProperty("destination-funding-source")]
        public tlDestinationFundingSource DestinationFundingSource { get; set; }

        [JsonProperty("source-funding-source")]
        public tlSourceFundingSource SourceFundingSource { get; set; }
        public tlDestination destination { get; set; }
    }

    public class tlSource
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlDestinationFundingSource
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlSourceFundingSource
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlDestination
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tlAmount
    {
        public string value { get; set; }
        public string currency { get; set; }
    }

    public class tlTransfer
    {
        public tlLinks _links { get; set; }
        public string id { get; set; }
        public string status { get; set; }
        public tlAmount amount { get; set; }
        public DateTime created { get; set; }
        public string individualAchId { get; set; }
    }

    public class tlEmbedded
    {
        public List<tlTransfer> transfers { get; set; }
    }

    public class TlRoot
    {
        public tlLinks _links { get; set; }
        public tlEmbedded _embedded { get; set; }
        public int total { get; set; }
    }


    public class SendFund
    {
        public string custid { get; set; }
        public string value { get; set; }
        public string fundingSource { get; set; }
        public int BillID { get; set; }
        public int ApprovedBillID { get; set; }
        public float Amount { get; set; }
        public string Remarks { get; set; }
        public string FundId { get; set; }
        public string BankTransferID { get; set; }
        public string SortID { get; set; }

    }








    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class cfsSelf
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cfsCustomer
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cfsLinks
    {
        public cfsSelf self { get; set; }
        public cfsCustomer customer { get; set; }

        [JsonProperty("transfer-from-balance")]
        public cfsTransferFromBalance TransferFromBalance { get; set; }
        public cfsRemove remove { get; set; }

        [JsonProperty("initiate-micro-deposits")]
        public cfsInitiateMicroDeposits InitiateMicroDeposits { get; set; }

        [JsonProperty("transfer-receive")]
        public cfsTransferReceive TransferReceive { get; set; }
    }

    public class cfsTransferFromBalance
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cfsRemove
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cfsInitiateMicroDeposits
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cfsTransferReceive
    {
        public string href { get; set; }
        public string type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class cfsFundingSource
    {
        public cfsLinks _links { get; set; }
        public string id { get; set; }
        public string status { get; set; }
        public string type { get; set; }
        public string bankAccountType { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
        public bool removed { get; set; }
        public List<string> channels { get; set; }
        public string bankName { get; set; }
        public string fingerprint { get; set; }
    }

    public class cfsEmbedded
    {
        [JsonProperty("funding-sources")]
        public List<cfsFundingSource> FundingSources { get; set; }
    }

    public class cfsRoot
    {
        public cfsLinks _links { get; set; }
        public cfsEmbedded _embedded { get; set; }
    }


    public class DwollaSettings
    {
        public int IdentityID { get; set; }
        public int CustomerID { get; set; }
        public string DwollaKey { get; set; }
        public string SecretKey { get; set; }
        public string AccountId { get; set; }
        public int IsConnected { get; set; }
        public int CreatedBy { get; set; }
    }

    public class tdSource
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tdFundingTransfer
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tdDestinationFundingSource
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tdSelf
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tdSourceFundingSource
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tdDestination
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("resource-type")]
        public string ResourceType { get; set; }
    }

    public class tdLinks
    {
        [JsonProperty("source")]
        public tdSource Source { get; set; }

        [JsonProperty("funding-transfer")]
        public tdFundingTransfer FundingTransfer { get; set; }

        [JsonProperty("destination-funding-source")]
        public tdDestinationFundingSource DestinationFundingSource { get; set; }

        [JsonProperty("self")]
        public tdSelf Self { get; set; }

        [JsonProperty("source-funding-source")]
        public tdSourceFundingSource SourceFundingSource { get; set; }

        [JsonProperty("destination")]
        public tdDestination Destination { get; set; }
    }

    public class tdAmount
    {
        [JsonProperty("value")]
        public string Value { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }
    }

    public class tdClearing
    {
        [JsonProperty("source")]
        public string Source { get; set; }
    }

    public class tdRoot
    {
        [JsonProperty("_links")]
        public tdLinks Links { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("amount")]
        public tdAmount Amount { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("clearing")]
        public tdClearing Clearing { get; set; }

        [JsonProperty("individualAchId")]
        public string IndividualAchId { get; set; }
    }





}
