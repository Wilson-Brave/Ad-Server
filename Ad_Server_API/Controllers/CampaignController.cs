// CampaignsController.cs
[ApiController]
[Route("[controller]")]
public class CampaignsController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateCampaign([FromForm] Campaign campaign)
    {
        // Validate the data (you might want to use a service or library for this)
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Process the data (e.g., save to the database)
        // This is a simplified example. In a real application, you'd likely use a service to handle business logic.
        var result = await _campaignService.SaveCampaign(campaign);
        if (result)
        {
            // Increment the total number of campaigns submitted
            // This could be done in the service layer or directly in the database
            await _campaignService.IncrementCampaignCount();

            return Ok(new { message = "Campaign submitted successfully" });
        }

        return StatusCode(500, "Error saving campaign");
    }
}