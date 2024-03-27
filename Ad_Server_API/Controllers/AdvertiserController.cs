using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Data;


namespace Ad_Server_API.Controllers;

public class AdvertiserController : ODataController
{
    private AdServerDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AdvertiserController(AdServerDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _db = context;
        _httpContextAccessor = httpContextAccessor;
    }


    [HttpGet]
    [EnableQuery(MaxExpansionDepth = 4)]

    public IQueryable<Advertiser> Get()
    {
        try
        {
            var result = _db.Advertiser;
            return result;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    [EnableQuery(MaxExpansionDepth = 4)]
    public SingleResult<Advertiser> Get([FromODataUri] int key)
    {
        IQueryable<Advertiser> result = _db.Advertiser.Where(s => s.AdvertiserId == key);
        return SingleResult.Create(result);
    }

    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] Advertiser update)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdvertiserId)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdvertiserId)
        {
            return BadRequest();
        }


        try
        {
            Advertiser b = _db.Advertiser.FirstOrDefault(x => x.AdvertiserId == update.AdvertiserId);
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


    public async Task<IActionResult> Post([FromBody] Advertiser insert)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _db.Advertiser.Add(insert);
        await _db.SaveChangesAsync();

        return Created(insert);
    }


    [EnableQuery]
    public async Task<IActionResult> Delete([FromODataUri] int key)
    {

        IQueryable<Advertiser> result = _db.Advertiser.Where(p => p.AdvertiserId == key);
        _db.Advertiser.Remove(result.FirstOrDefault());
        await _db.SaveChangesAsync();
        return Updated(result);
    }
    bool Exists(int key)
    {
        return _db.Advertiser.Find(key) != null;
    }
}
