namespace Ad_Server_API.Models;

public class Advert
{
    public int AdvertId { get; set; }
    public int AdvertiserId { get; set; }
    public int CampaignId { get; set; }
    public string AdvertName { get; set; }
    public string AdvertDescription { get; set; }
    public string AdvertURL { get; set; }
    public int Impressions { get; set; }
    public int Clicks { get; set; }
    public int TurnOverIndex { get; set; }
}
