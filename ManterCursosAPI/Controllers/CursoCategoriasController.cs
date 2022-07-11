using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterCursosAPI.Data;
using ManterCursosAPI.Models;

namespace ManterCursosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoCategoriasController : ControllerBase
    {
        private readonly DataContext _context;

        public CursoCategoriasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CursoCategorias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CursoCategoria>>> GetCursoCategorias()
        {
            return await _context.CursoCategorias.ToListAsync();
        }
       
        private bool CursoCategoriaExists(int id)
        {
            return _context.CursoCategorias.Any(e => e.Id == id);
        }
    }
}
