using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ad_Server_API.Models
{
    public class PublisherTargetingCriteria
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
        [ForeignKey("AdSpaces")]
        public int AdSpaceId { get; set; }

        public AdSpace AdSpace { get; set; }
    }
}