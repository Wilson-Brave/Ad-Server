using System.ComponentModel.DataAnnotations;
using Ad_Server_API.Models;

public class AdSpacesCreateViewModel
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string AdType { get; set; }

    [Required]
    public string AdSize { get; set; }

    [Required]
    public decimal MinimumBid { get; set; }

    [Required]
    public int PublisherId { get; set; }

    // Targeting Criteria properties
    public string Country { get; set; }

    public string DeviceType { get; set; }

    public string Browser { get; set; }

    public string OperatingSystem { get; set; }

    public List<string> UserInterests { get; set; }

    public List<string> Keywords { get; set; }

    public string Category { get; set; }
}