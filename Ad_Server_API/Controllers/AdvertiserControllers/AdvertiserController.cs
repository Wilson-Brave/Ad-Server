using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertiserController : ControllerBase
    {
        private readonly AdServerDbContext _db;

        public AdvertiserController(AdServerDbContext context)
        {
            _db = context;
        }

        // GET ALL ADVERTISERS
        // To run in Postman: Send a GET request to http://localhost:5217/api/Advertiser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advertiser>>> GetAllAdvertisers()
        {
            var result = await _db.Advertiser.ToListAsync();
            return Ok(result);
        }

        // GET A SPECIFIC ADVERTISER
        // To run in Postman: Send a GET request to http://localhost:5217/api/Advertiser/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Advertiser>> GetAdvertiser(int id)
        {
            var advertiser = await _db.Advertiser.FindAsync(id);
            if (advertiser == null)
            {
                return NotFound();
            }
            return advertiser;
        }

        // UPDATE ADVERTISER
        // To run in Postman: Send a PUT request to http://localhost:5217/api/Advertiser/{id}
        // Include the updated advertiser object in the request body
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvertiser(int id, Advertiser update)
        {
            if (id != update.AdvertiserId)
            {
                return BadRequest();
            }

            _db.Entry(update).State = EntityState.Modified;
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvertiserExists(id))
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

        // Create advertiser
        // To run in Postman: Send a POST request to http://localhost:5217/api/Advertiser
        // Include the new advertiser object in the request body
        [HttpPost]
        public async Task<ActionResult<Advertiser>> PostAdvertiser(Advertiser insert)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_db.Advertiser.Any(a => a.Email == insert.Email))
            {
                return BadRequest("Email already exists.");
            }

            _db.Advertiser.Add(insert);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdvertiser), new { id = insert.AdvertiserId }, insert);
        }

        // DELETE
        // To run in Postman: Send a DELETE request to http://localhost:5217/api/Advertiser/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdvertiser(int id)
        {
            var advertiser = await _db.Advertiser.FindAsync(id);
            if (advertiser == null)
            {
                return NotFound();
            }

            _db.Advertiser.Remove(advertiser);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool AdvertiserExists(int id)
        {
            return _db.Advertiser.Any(e => e.AdvertiserId == id);
        }
    }
}  