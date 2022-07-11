using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterCursosAPI.Data;
using ManterCursosAPI.Models;

namespace ManterCursosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly DataContext _context;

        public StatusController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Status
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }

        private bool StatusExists(int id)
        {
            return _context.Statuses.Any(e => e.Id == id);
        }
    }
}
