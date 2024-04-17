
using System;

namespace Ad_Server_API.Models{
public class CampaignUpdateViewModel
{
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public PricingModel PricingModel { get; set; }
    public decimal Budget { get; set; }

    // Targeting Criteria properties
    public string Country { get; set; }
    public string DeviceType { get; set; }
    public string Browser { get; set; }
    public string OperatingSystem { get; set; }
    public List<string> UserInterests { get; set; }
    public List<string> Keywords { get; set; }
    public string Category { get; set; }
}
}