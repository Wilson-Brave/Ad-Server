using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Models;

public class AdServerDbContext : DbContext
{
    public AdServerDbContext(DbContextOptions<AdServerDbContext> options)
        : base(options)
    {
    }

    public DbSet<Advertiser> Advertiser  { get; set; }
    public DbSet<Advert> Advert { get; set; }
    public DbSet<AdCampaign> AdCampaign { get; set; }
    public DbSet<AdCampaignAdvert> AdCampaignAdvert { get; set; }
    public DbSet<Publisher> Publisher { get; set; }
    public DbSet<GoogleUserInfo> GoogleUserInfo { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Modeling RelationShips
        modelBuilder.Entity<Advertiser>()
            .HasKey(s => s.AdvertiserId);

        modelBuilder.Entity<Publisher>()
            .HasKey(s => s.PublisherId);

        modelBuilder.Entity<Advert>()
            .HasKey(s => s.AdvertId);

        modelBuilder.Entity<AdCampaign>()
            .HasKey(s => s.AdCampaignId);

        modelBuilder.Entity<AdCampaignAdvert>()
            .HasKey(s => s.AdCampaignAdvertId);


        modelBuilder.Entity<GoogleUserInfo>()
            .HasKey(s => s.GoogleUserInfoId);

    }
}