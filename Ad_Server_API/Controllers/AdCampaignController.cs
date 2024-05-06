using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Data;


namespace Ad_Server_API.Controllers;

public class AdCampaignController : ODataController
{
    private AdServerDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor; 

    public AdCampaignController(AdServerDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _db = context;
        _httpContextAccessor = httpContextAccessor;
    }


    [HttpGet]
    [EnableQuery(MaxExpansionDepth = 4)]

    public IQueryable<AdCampaign> Get()
    {
        try
        {
            var result = _db.AdCampaign;
                //.Include(x => x.CampaignAdverts);

            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    [EnableQuery(MaxExpansionDepth = 4)]
    public SingleResult<AdCampaign> Get([FromODataUri] int key)
    {
        IQueryable<AdCampaign> result = _db.AdCampaign.Where(s => s.AdCampaignId == key);
        return SingleResult.Create(result);
    }

    [HttpGet]
    [EnableQuery]
    public IQueryable<AdCampaign> AdCampaignByAdvertiser([FromODataUri] int AdvertiserId)
    {
        try
        {
            IQueryable<AdCampaign> result = _db.AdCampaign.Where(s => s.AdvertiserId == AdvertiserId);
            return result;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] AdCampaign update)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdCampaignId)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdCampaignId)
        {
            return BadRequest();
        }


        try
        {
            AdCampaign b = _db.AdCampaign.FirstOrDefault(x => x.AdCampaignId == update.AdCampaignId);
            b = update;

            await _db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!Exists(key))

            { return NotFound(); }

            else

            { throw; }
        }

        catch (Exception e)

        {
            Console.WriteLine(e.Message);
            throw;
        }

        return Updated(update);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AdCampaign insert)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _db.AdCampaign.Add(insert);
        await _db.SaveChangesAsync();

        return Created(insert);
    }

    [HttpDelete]
    [EnableQuery]
    public async Task<IActionResult> Delete([FromODataUri] int key)
    {
        IQueryable<AdCampaign> result = _db.AdCampaign.Where(p => p.AdCampaignId == key);
        _db.AdCampaign.Remove(result.FirstOrDefault());
        await _db.SaveChangesAsync();
        return Updated(result);
    }
    bool Exists(int key)
    {
        return _db.AdCampaign.Find(key) != null;
    }
}
