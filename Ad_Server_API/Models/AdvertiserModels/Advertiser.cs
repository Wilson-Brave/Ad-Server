using System.ComponentModel.DataAnnotations;


namespace Ad_Server_API.Models
{
    public class Advertiser
    {
        public int AdvertiserId { get; set; } // Primary key

        [Required] // Add data annotations for validation
        [MaxLength(100)]
        public string AdvertiserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
    public ICollection<Campaign> Campaigns { get; set; }

    }
}