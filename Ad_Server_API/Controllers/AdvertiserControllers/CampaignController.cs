using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly AdServerDbContext _db;

        public CampaignController(AdServerDbContext context)
        {
            _db = context;
        }

        // Create a campaign with campaign details aswell as targeting criteria
        // To run in Postman: Send a POST request to http://localhost:5217/api/Campaign
        // Include the campaign details and ad creative file in the request body as form-data
        // Advertiserid also has to be entered in the request body for now.
        [HttpPost]
        public async Task<ActionResult<Campaign>> CreateCampaign([FromForm] CampaignCreateViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _db.Campaign.AnyAsync(c => c.Name == viewModel.Name))
            {
                return Conflict("A campaign with the same name already exists.");
            }

            string adCreativeUrl = await SaveAdCreativeAsync(viewModel.AdCreative);

            var campaign = new Campaign
            {
                Name = viewModel.Name,
                StartDate = viewModel.StartDate,
                EndDate = viewModel.EndDate,
                PricingModel = viewModel.PricingModel,
                Budget = viewModel.Budget,
                AdCreativeUrl = adCreativeUrl,
                AdvertiserId = viewModel.AdvertiserId
            };

            var targetingCriteria = new TargetingCriteria
            {
                Country = viewModel.Country,
                DeviceType = viewModel.DeviceType,
                Browser = viewModel.Browser,
                OperatingSystem = viewModel.OperatingSystem,
                UserInterests = viewModel.UserInterests,
                Keywords = viewModel.Keywords,
                Category = viewModel.Category
            };

            campaign.TargetingCriteria = targetingCriteria;

            _db.Campaign.Add(campaign);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCampaignDetails), new { id = campaign.CampaignId }, campaign);
        }

        private async Task<string> SaveAdCreativeAsync(IFormFile adCreative)
        {
            if (adCreative != null && adCreative.Length > 0)
            {
                var fileName = Path.GetFileName(adCreative.FileName);
                var filePath = Path.Combine("AdsUploadFolder", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await adCreative.CopyToAsync(stream);
                }

                return filePath;
            }

            return string.Empty;
        }

        // GET a specifc campaign with its details and targeting criteria
        // To run in Postman: Send a GET request to http://localhost:5217/api/Campaign/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CampaignDetailsViewModel>> GetCampaignDetails(int id)
        {
            var campaign = await _db.Campaign
                .Include(c => c.TargetingCriteria)
                .Include(c => c.Advertiser)
                .FirstOrDefaultAsync(c => c.CampaignId == id);

            if (campaign == null)
            {
                return NotFound();
            }

            var campaignDetails = new CampaignDetailsViewModel
            {
                CampaignId = campaign.CampaignId,
                Name = campaign.Name,
                StartDate = campaign.StartDate,
                EndDate = campaign.EndDate,
                PricingModel = campaign.PricingModel,
                Budget = campaign.Budget,
                AdCreativeUrl = campaign.AdCreativeUrl,
                AdvertiserId = campaign.AdvertiserId,
                AdvertiserName = campaign.Advertiser.AdvertiserName,
                Country = campaign.TargetingCriteria.Country,
                DeviceType = campaign.TargetingCriteria.DeviceType,
                Browser = campaign.TargetingCriteria.Browser,
                OperatingSystem = campaign.TargetingCriteria.OperatingSystem,
                UserInterests = campaign.TargetingCriteria.UserInterests,
                Keywords = campaign.TargetingCriteria.Keywords,
                Category = campaign.TargetingCriteria.Category,
            };

            return Ok(campaignDetails);
        }

        // Update a campaign
        // To run in Postman: Send a PUT request to http://localhost:5217/api/Campaign/{id}
        // Include the updated campaign details in the request body
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCampaign(int id, [FromBody] CampaignUpdateViewModel model)
        {
            var campaign = await _db.Campaign.Include(c => c.TargetingCriteria).FirstOrDefaultAsync(c => c.CampaignId == id);

            if (campaign == null)
            {
                return NotFound();
            }

            campaign.Name = model.Name;
            campaign.StartDate = model.StartDate;
            campaign.EndDate = model.EndDate;
            campaign.PricingModel = model.PricingModel;
            campaign.Budget = model.Budget;

            campaign.TargetingCriteria.Country = model.Country;
            campaign.TargetingCriteria.DeviceType = model.DeviceType;
            campaign.TargetingCriteria.Browser = model.Browser;
            campaign.TargetingCriteria.OperatingSystem = model.OperatingSystem;
            campaign.TargetingCriteria.UserInterests = model.UserInterests;
            campaign.TargetingCriteria.Keywords = model.Keywords;
            campaign.TargetingCriteria.Category = model.Category;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool CampaignExists(int id)
        {
            return _db.Campaign.Any(c => c.CampaignId == id);
        }
    }
}