using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ad_Server_API.Models
{
    public class AdSpace
    {
        [Key]
        public int AdSpaceId { get; set; }

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

        [ForeignKey("PublisherId")]
        public Publisher Publisher { get; set; }

        public PublisherTargetingCriteria TargetingCriteria { get; set; }

    }


}