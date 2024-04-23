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
    private readonly string _uploadFolderPath = "wwwroot/uploads";

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

    [HttpGet]
    [EnableQuery]
    public IQueryable<Advert> AdvertByAdvertiser([FromODataUri] int AdvertiserId)
    {
        try
        {
            IQueryable<Advert> result = _db.Advert.Where(s => s.AdvertiserId == AdvertiserId);
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

    [HttpPost]
    public async Task<IActionResult> UploadFile([FromBody] IFormFile File)
    {
        if (File == null || File.Length == 0)
        {
            return BadRequest("No File uploaded");
        }

        try
        {
            // Ensure the upload directory exists
            if (!Directory.Exists(_uploadFolderPath))
            {
                Directory.CreateDirectory(_uploadFolderPath);
            }

            // Generate a unique File name
            var FileName = Guid.NewGuid().ToString() + Path.GetExtension(File.FileName);
            var FilePath = Path.Combine(_uploadFolderPath, FileName);

            // Save the File to the server
            using (var stream = new FileStream(FilePath, FileMode.Create))
            {
                await File.CopyToAsync(stream);
            }

            // Return the File path or other information
            return Ok(new { FilePath = FilePath });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
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
