using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Data;


namespace Ad_Server_API.Controllers;

public class AdvertController : ODataController
{
    private AdServerDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AdvertController(AdServerDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _db = context;
        _httpContextAccessor = httpContextAccessor;
    }


    [HttpGet]
    [EnableQuery(MaxExpansionDepth = 4)]

    public IQueryable<Advert> Get()
    {
        try
        {
            var result = _db.Advert;
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    [EnableQuery(MaxExpansionDepth = 4)]
    public SingleResult<Advert> Get([FromODataUri] int key)
    {
        IQueryable<Advert> result = _db.Advert.Where(s => s.AdvertId == key);
        return SingleResult.Create(result);
    }

    public IQueryable<Advert> GetAdvertByAdvertiser([FromODataUri] int id)
    {
        try
        {
            IQueryable<Advert> result = _db.Advert.Where(s => s.AdvertiserId == id);
            return result;

        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] Advert update)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdvertId)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.AdvertId)
        {
            return BadRequest();
        }


        try
        {
            Advert b = _db.Advert.FirstOrDefault(x => x.AdvertId == update.AdvertId);
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


    public async Task<IActionResult> Post([FromBody] Advert insert)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _db.Advert.Add(insert);
        await _db.SaveChangesAsync();

        return Created(insert);
    }


    [EnableQuery]
    public async Task<IActionResult> Delete([FromODataUri] int key)
    {

        IQueryable<Advert> result = _db.Advert.Where(p => p.AdvertId == key);
        _db.Advert.Remove(result.FirstOrDefault());
        await _db.SaveChangesAsync();
        return Updated(result);
    }
    bool Exists(int key)
    {
        return _db.Advert.Find(key) != null;
    }
}
