using System;
using System.ComponentModel.DataAnnotations;
using Ad_Server_API.Models;
//difference between this and campaigncreateviewmodel is that this one has advertiserid
public class CampaignCreateViewModel
{
    [Required]
    public string Name { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }

    [Required]
    public PricingModel PricingModel { get; set; }

    [Required]
    public decimal Budget { get; set; }

    [Required]
    public IFormFile AdCreative { get; set; }

    [Required]
    public int AdvertiserId { get; set; }

    // Targeting Criteria properties
    public string Country { get; set; }
    public string DeviceType { get; set; }
    public string Browser { get; set; }
    public string OperatingSystem { get; set; }
    public List<string> UserInterests { get; set; }
    public List<string> Keywords { get; set; }
    public string Category { get; set; }
}