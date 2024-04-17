using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Models
{
    public class AdServerDbContext : DbContext
    {
        public AdServerDbContext(DbContextOptions<AdServerDbContext> options) : base(options)
        {
        }

        public DbSet<Advertiser> Advertiser { get; set; }
        public DbSet<Publisher> Publisher { get; set; }
        public DbSet<Campaign> Campaign { get; set; }
        public DbSet<TargetingCriteria> TargetingCriteria { get; set; }
        public DbSet<AdSpace> AdSpace { get; set; }
        public DbSet<PublisherTargetingCriteria> PublisherTargetingCriteria { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Advertiser>()
                .HasKey(a => a.AdvertiserId);

            modelBuilder.Entity<Publisher>()
                .HasKey(p => p.PublisherId);

            modelBuilder.Entity<Campaign>()
                .HasKey(c => c.CampaignId);

            modelBuilder.Entity<Campaign>()
                .HasOne(c => c.Advertiser)
                .WithMany(a => a.Campaigns)
                .HasForeignKey(c => c.AdvertiserId);

            modelBuilder.Entity<TargetingCriteria>()
                .HasOne(tc => tc.Campaign)
                .WithOne(c => c.TargetingCriteria)
                .HasForeignKey<TargetingCriteria>(tc => tc.CampaignId);

            modelBuilder.Entity<AdSpace>()
                .HasKey(a => a.AdSpaceId);

            modelBuilder.Entity<AdSpace>()
                .HasOne(a => a.Publisher)
                .WithMany(p => p.AdSpaces)
                .HasForeignKey(a => a.PublisherId);

            modelBuilder.Entity<PublisherTargetingCriteria>()
                .HasOne(ptc => ptc.AdSpace)
                .WithOne(a => a.TargetingCriteria)
                .HasForeignKey<PublisherTargetingCriteria>(ptc => ptc.AdSpaceId);
        }
    }
}