using System;
using System.ComponentModel.DataAnnotations;
using Ad_Server_API.Models;

public class AdSpacesDetailsViewModel
{
    public int AdSpaceId { get; set; }

    public string Name { get; set; }

    public string AdType { get; set; }

    public string AdSize { get; set; }

    public decimal MinimumBid { get; set; }

    public int PublisherId { get; set; }

    public string PublisherName { get; set; }

    public string Country { get; set; }

    public string DeviceType { get; set; }

    public string Browser { get; set; }

    public string OperatingSystem { get; set; }

    public List<string> UserInterests { get; set; }

    public List<string> Keywords { get; set; }

    public string Category { get; set; }

}