using Ad_Server_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ad_Server_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublisherController : ControllerBase
    {
        private readonly AdServerDbContext _db;

        public PublisherController(AdServerDbContext context)
        {
            _db = context;
        }

        // GET a publishers
        // To run in Postman: Set the HTTP method to GET and enter the URL: http://localhost:5217/api/publisher
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publisher>>> GetAllPublishers()
        {
            try
            {
                var result = await _db.Publisher.ToListAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An error occurred while retrieving publishers.");
            }
        }

        // Get a specifc publisher
        // To run in Postman: Set the HTTP method to GET and enter the URL: http://localhost:5217/api/publisher/{id}
        // Replace {id} with the actual id of the publisher you want to retrieve
        [HttpGet("{id}")]
        public async Task<ActionResult<Publisher>> GetPublisher(int id)
        {
            var publisher = await _db.Publisher.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }
            return publisher;
        }

        // Update a publisher
        // To run in Postman: Set the HTTP method to PUT and enter the URL: http://localhost:5217/api/publisher/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublisher(int id, Publisher update)
        {
            if (id != update.PublisherId)
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
                if (!PublisherExists(id))
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

        // Create a publisher
        // To run in Postman: Set the HTTP method to POST and enter the URL:  http://localhost:5217/api/publisher
        [HttpPost]
        public async Task<ActionResult<Publisher>> PostPublisher(Publisher insert)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if email already exists
            if (_db.Publisher.Any(p => p.Email == insert.Email))
            {
                return BadRequest("Email already exists.");
            }

            _db.Publisher.Add(insert);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetPublisher", new { id = insert.PublisherId }, insert);
        }

        // DELETE a publisher
        // To run in Postman: Set the HTTP method to DELETE and enter the URL: http://localhost:5217/api/publisher/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher(int id)
        {
            var publisher = await _db.Publisher.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            _db.Publisher.Remove(publisher);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool PublisherExists(int id)
        {
            return _db.Publisher.Any(e => e.PublisherId == id);
        }
    }
}