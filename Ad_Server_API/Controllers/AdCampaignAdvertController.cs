using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Data;


namespace Ad_Server_API.Controllers;

public class AdCampaignAdvertController : ODataController
{
    private AdServerDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor; 

    public AdCampaignAdvertController(AdServerDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _db = context;
        _httpContextAccessor = httpContextAccessor;
    }


    [HttpGet]
    [EnableQuery(MaxExpansionDepth = 4)]

    public IQueryable<AdCampaignAdvert> Get()
    {
        try
        {
            var result = _db.AdCampaignAdvert;
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    [EnableQuery(MaxExpansionDepth = 4)]
    public SingleResult<AdCampaignAdvert> Get([FromODataUri] int key)
    {
        IQueryable<AdCampaignAdvert> result = _db.AdCampaignAdvert.Where(s => s.AdCampaignAdvertId == key);
        return SingleResult.Create(result);
    }

    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] AdCampaignAdvert update)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdCampaignAdvertId)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdCampaignAdvertId)
        {
            return BadRequest();
        }


        try
        {
            AdCampaignAdvert b = _db.AdCampaignAdvert.FirstOrDefault(x => x.AdCampaignAdvertId == update.AdCampaignAdvertId);
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
    public async Task<IActionResult> Post([FromBody] AdCampaignAdvert insert)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _db.AdCampaignAdvert.Add(insert);
        await _db.SaveChangesAsync();

        return Created(insert);
    }

    [HttpDelete]
    [EnableQuery]
    public async Task<IActionResult> Delete([FromODataUri] int key)
    {

        IQueryable<AdCampaignAdvert> result = _db.AdCampaignAdvert.Where(p => p.AdCampaignAdvertId == key);
        _db.AdCampaignAdvert.Remove(result.FirstOrDefault());
        await _db.SaveChangesAsync();
        return Updated(result);
    }
    bool Exists(int key)
    {
        return _db.AdCampaignAdvert.Find(key) != null;
    }
}
