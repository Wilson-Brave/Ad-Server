using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ad_Server_API.Models
{
    public class Campaign
    {
        [Key]
        public int CampaignId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public PricingModel PricingModel { get; set; }
        [Required]
        public decimal Budget { get; set; }

        [Required]
        public string AdCreativeUrl { get; set; }

        [Required]
        public int AdvertiserId { get; set; }

        [ForeignKey("AdvertiserId")]
        public Advertiser Advertiser { get; set; }

        public TargetingCriteria TargetingCriteria { get; set; }

    }

    public enum PricingModel
    {
        CPM, // Cost per thousand impressions
        CPC, // Cost per click
        CPA  // Cost per action
    }
}