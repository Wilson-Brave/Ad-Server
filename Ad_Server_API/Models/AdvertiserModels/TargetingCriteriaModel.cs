
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Ad_Server_API.Models;
public class TargetingCriteria
{
    [Key]
    public int TargetingCriteriaId { get; set; }
    public string Country { get; set; }
    public string DeviceType { get; set; }
    public string Browser { get; set; }
    public string OperatingSystem { get; set; }
    public List<string> UserInterests { get; set; }
    public List<string> Keywords { get; set; }
    public string Category { get; set; }
    
    [Required]
    
    [ForeignKey("Campaign")]
    public int CampaignId { get; set; }

    public Campaign Campaign { get; set; }
}