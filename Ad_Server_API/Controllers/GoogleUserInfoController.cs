using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Data;
using System.Collections.Generic;


namespace Ad_Server_API.Controllers;

public class GoogleUserInfoController : ODataController
{
    private AdServerDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly string _uploadFolderPath = "wwwroot/uploads";

    public GoogleUserInfoController(AdServerDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _db = context;
        _httpContextAccessor = httpContextAccessor;
    }


    [HttpGet]
    [EnableQuery(MaxExpansionDepth = 4)]

    public IQueryable<GoogleUserInfo> Get()
    {
        try
        {
            var result = _db.GoogleUserInfo;
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    [EnableQuery(MaxExpansionDepth = 4)]
    public SingleResult<GoogleUserInfo> Get([FromODataUri] int key)
    {
        IQueryable<GoogleUserInfo> result = _db.GoogleUserInfo.Where(s => s.GoogleUserInfoId == key);
        return SingleResult.Create(result);
    }
    [HttpGet]
    [EnableQuery]
    public async Task<IActionResult> CheckIfUserExists([FromODataUri] string Sub)
    {
        try
        {
            IQueryable<GoogleUserInfo> result = _db.GoogleUserInfo.Where(s => s.Sub == Sub);

            GoogleUserInfo existingUser = await result.FirstOrDefaultAsync();

            if (existingUser == null)
            {
                existingUser = new GoogleUserInfo
                {
                    Sub = Sub,
                    Account_Verified = false,
                    Updated_at = DateTime.UtcNow
                };
                _db.GoogleUserInfo.Add(existingUser);
                await _db.SaveChangesAsync();
            }

            return Ok(); // or return CreatedAtAction if appropriate
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }



    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] GoogleUserInfo update)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.GoogleUserInfoId)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != update.GoogleUserInfoId)
        {
            return BadRequest();
        }


        try
        {
            GoogleUserInfo b = _db.GoogleUserInfo.FirstOrDefault(x => x.GoogleUserInfoId == update.GoogleUserInfoId);
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

    public async Task<IActionResult> Post([FromBody] GoogleUserInfo insert)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _db.GoogleUserInfo.Add(insert);
        await _db.SaveChangesAsync();
        return Created(insert);
    }


    [EnableQuery]
    public async Task<IActionResult> Delete([FromODataUri] int key)
    {
        IQueryable<GoogleUserInfo> result = _db.GoogleUserInfo.Where(p => p.GoogleUserInfoId == key);
        _db.GoogleUserInfo.Remove(result.FirstOrDefault());
        await _db.SaveChangesAsync();
        return Updated(result);
    }
    bool Exists(int key)
    {
        return _db.GoogleUserInfo.Find(key) != null;
    }
}
