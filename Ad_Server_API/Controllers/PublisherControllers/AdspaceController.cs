using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdSpaceController : ControllerBase
    {
        private readonly AdServerDbContext _db;

        public AdSpaceController(AdServerDbContext context)
        {
            _db = context;
        }

        // Create adspace
        // To run in Postman: Set the HTTP method to POST and enter the URL: http://localhost:5217/api/Adspace
        //here you also need to include publisherid. also here you need to include the ad creative like file upload and it saves it to the database and local folder
        // In the request body provide information for the adspace and the targeting criteria.
        [HttpPost]
        public async Task<ActionResult<AdSpace>> CreateAdSpace([FromBody] AdSpacesCreateViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _db.AdSpace.AnyAsync(a => a.Name == viewModel.Name))
            {
                return Conflict("An ad space with the same name already exists.");
            }

            var adSpace = new AdSpace
            {
                Name = viewModel.Name,
                AdType = viewModel.AdType,
                AdSize = viewModel.AdSize,
                MinimumBid = viewModel.MinimumBid,
                PublisherId = viewModel.PublisherId
            };

            var targetingCriteria = new PublisherTargetingCriteria
            {
                Country = viewModel.Country,
                DeviceType = viewModel.DeviceType,
                Browser = viewModel.Browser,
                OperatingSystem = viewModel.OperatingSystem,
                UserInterests = viewModel.UserInterests,
                Keywords = viewModel.Keywords,
                Category = viewModel.Category,
                AdSpace = adSpace
            };

            adSpace.TargetingCriteria = targetingCriteria;

            _db.AdSpace.Add(adSpace);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdSpaceDetails), new { id = adSpace.AdSpaceId }, adSpace);
        }

        // GET a specific adspace
        // To run in Postman: Set the HTTP method to GET and enter the URL: http://localhost:5217/api/Adspace/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AdSpacesDetailsViewModel>> GetAdSpaceDetails(int id)
        {
            var adSpace = await _db.AdSpace
                .Include(a => a.TargetingCriteria)
                .Include(a => a.Publisher)
                .FirstOrDefaultAsync(a => a.AdSpaceId == id);

            if (adSpace == null)
            {
                return NotFound();
            }

            var adSpaceDetails = new AdSpacesDetailsViewModel
            {
                AdSpaceId = adSpace.AdSpaceId,
                Name = adSpace.Name,
                AdType = adSpace.AdType,
                AdSize = adSpace.AdSize,
                MinimumBid = adSpace.MinimumBid,
                PublisherId = adSpace.PublisherId,
                PublisherName = adSpace.Publisher.PublisherName,
                Country = adSpace.TargetingCriteria?.Country,
                DeviceType = adSpace.TargetingCriteria?.DeviceType,
                Browser = adSpace.TargetingCriteria?.Browser,
                OperatingSystem = adSpace.TargetingCriteria?.OperatingSystem,
                UserInterests = adSpace.TargetingCriteria?.UserInterests,
                Keywords = adSpace.TargetingCriteria?.Keywords,
                Category = adSpace.TargetingCriteria?.Category,
            };

            return Ok(adSpaceDetails);
        }

        private bool AdSpaceExists(int id)
        {
            return _db.AdSpace.Any(a => a.AdSpaceId == id);
        }

        // GET: api/AdSpace/ad/{adSpaceId}
        // To run in Postman: Set the HTTP method to GET and enter the URL: http://localhost:5217/api/AdSpace/ad/{adSpaceId}
        // similar to the previous method, but this one returns all the campaigns that match the ad space targeting criteria and returns the campaign with highest bid. 
        [HttpGet("ad/{adSpaceId}")]
        public async Task<IActionResult> GetMatchingCampaigns(int adSpaceId)
        {
            var adSpace = await _db.AdSpace
                .Include(a => a.TargetingCriteria)
                .FirstOrDefaultAsync(a => a.AdSpaceId == adSpaceId);

            if (adSpace == null)
            {
                return NotFound("Ad space not found.");
            }

            var campaigns = await _db.Campaign
                .Include(c => c.TargetingCriteria)
                .ToListAsync();

            var matchingCampaigns = campaigns.Where(c =>
                (!string.IsNullOrEmpty(adSpace.TargetingCriteria.Country) &&
                    adSpace.TargetingCriteria.Country == c.TargetingCriteria.Country) ||
                (!string.IsNullOrEmpty(adSpace.TargetingCriteria.DeviceType) &&
                    adSpace.TargetingCriteria.DeviceType == c.TargetingCriteria.DeviceType) ||
                (!string.IsNullOrEmpty(adSpace.TargetingCriteria.Browser) &&
                    adSpace.TargetingCriteria.Browser == c.TargetingCriteria.Browser) ||
                (!string.IsNullOrEmpty(adSpace.TargetingCriteria.OperatingSystem) &&
                    adSpace.TargetingCriteria.OperatingSystem == c.TargetingCriteria.OperatingSystem) ||
                (adSpace.TargetingCriteria.UserInterests != null && c.TargetingCriteria.UserInterests != null &&
                    adSpace.TargetingCriteria.UserInterests.Intersect(c.TargetingCriteria.UserInterests).Any()) ||
                (adSpace.TargetingCriteria.Keywords != null && c.TargetingCriteria.Keywords != null &&
                    adSpace.TargetingCriteria.Keywords.Intersect(c.TargetingCriteria.Keywords).Any()) ||
                (!string.IsNullOrEmpty(adSpace.TargetingCriteria.Category) &&
                    adSpace.TargetingCriteria.Category == c.TargetingCriteria.Category)
            );

            var highestBidder = matchingCampaigns
                .Where(c => c.Budget >= adSpace.MinimumBid)
                .OrderByDescending(c => c.Budget)
                .FirstOrDefault();

            if (highestBidder == null)
            {
                return NotFound("No matching campaigns found for the ad space.");
            }

            var response = new
            {
                Campaign = new
                {
                    highestBidder.CampaignId,
                    highestBidder.Name,
                    highestBidder.StartDate,
                    highestBidder.EndDate,
                    highestBidder.Budget,
                    highestBidder.PricingModel,
                    TargetingCriteria = new
                    {
                        highestBidder.TargetingCriteria.Country,
                        highestBidder.TargetingCriteria.DeviceType,
                        highestBidder.TargetingCriteria.Browser,
                        highestBidder.TargetingCriteria.OperatingSystem,
                        highestBidder.TargetingCriteria.UserInterests,
                        highestBidder.TargetingCriteria.Keywords,
                        highestBidder.TargetingCriteria.Category
                    }
                }
            };

            return Ok(response);
        }
    }
}