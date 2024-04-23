using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Data;


namespace Ad_Server_API.Controllers;

public class PublisherController : ODataController
{
    private AdServerDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PublisherController(AdServerDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _db = context;
        _httpContextAccessor = httpContextAccessor;
    }


    [HttpGet]
    [EnableQuery(MaxExpansionDepth = 4)]

    public IQueryable<Publisher> Get()
    {
        try
        {
            var result = _db.Publisher;
            return result;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    [EnableQuery(MaxExpansionDepth = 4)]
    public SingleResult<Publisher> Get([FromODataUri] int key)
    {
        IQueryable<Publisher> result = _db.Publisher.Where(s => s.PublisherId == key);
        return SingleResult.Create(result);
    }

    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] Publisher update)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.PublisherId)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.PublisherId)
        {
            return BadRequest();
        }


        try
        {
            Publisher b = _db.Publisher.FirstOrDefault(x => x.PublisherId == update.PublisherId);
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


    public async Task<IActionResult> Post([FromBody] Publisher insert)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _db.Publisher.Add(insert);
        await _db.SaveChangesAsync();

        return Created(insert);
    }


    [EnableQuery]
    public async Task<IActionResult> Delete([FromODataUri] int key)
    {

        IQueryable<Publisher> result = _db.Publisher.Where(p => p.PublisherId == key);
        _db.Publisher.Remove(result.FirstOrDefault());
        await _db.SaveChangesAsync();
        return Updated(result);
    }
    bool Exists(int key)
    {
        return _db.Publisher.Find(key) != null;
    }
}
