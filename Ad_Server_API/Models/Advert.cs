namespace Ad_Server_API.Models;

public class Advert
{
    public int AdvertId { get; set; }
    public int AdvertTypeId { get; set; }
    public int AdvertiserId { get; set; }
    public string AdvertName { get; set; }
    public string AdvertDescription { get; set; }
    public byte[] MediaFile { get; set; }
}
