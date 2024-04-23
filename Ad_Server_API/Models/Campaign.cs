namespace Ad_Server_API.Models;
// Campaign.cs
public class Campaign
{
    public string BusinessName { get; set; }
    public string CampaignTheme { get; set; }
    public string WebsiteUrl { get; set; }
    public string Category { get; set; }
    public decimal Budget { get; set; }
    public string Location { get; set; }
    public string Language { get; set; }
    public string AdType { get; set; }
    public string AdSpaceType { get; set; }
    public IFormFile File { get; set; }
}