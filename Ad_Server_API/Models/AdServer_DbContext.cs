﻿using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Models;

public class AdServerDbContext : DbContext
{
    public AdServerDbContext(DbContextOptions<AdServerDbContext> options)
        : base(options)
    {
    }

    public DbSet<Advertiser> Advertiser  { get; set; }
    public DbSet<Publisher> Publisher { get; set; }

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
    }
}