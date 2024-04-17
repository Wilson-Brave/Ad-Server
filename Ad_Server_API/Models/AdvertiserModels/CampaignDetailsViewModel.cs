
using Ad_Server_API.Models;

//this one doesnt show advertiser id
public class CampaignDetailsViewModel
{
    public int CampaignId { get; set; }
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public PricingModel PricingModel { get; set; }
    public decimal Budget { get; set; }
    public string AdCreativeUrl { get; set; }
    public int AdvertiserId { get; set; }
    public string AdvertiserName { get; set; }
    public string Country { get; set; }
    public string DeviceType { get; set; }
    public string Browser { get; set; }
    public string OperatingSystem { get; set; }
    public List<string> UserInterests { get; set; }
    public List<string> Keywords { get; set; }
    public string Category { get; set; }
}