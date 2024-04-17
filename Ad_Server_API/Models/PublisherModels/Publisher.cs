using System.ComponentModel.DataAnnotations;

namespace Ad_Server_API.Models
{
    public class Publisher
    {
        public int PublisherId { get; set; } // Primary key

        [Required] 
        [MaxLength(100)]
        public string PublisherName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public ICollection<AdSpace> AdSpaces { get; set; }
    }
}

    
