using ManterCursosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ManterCursosAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Curso> Cursos  { get; set; }
        public DbSet<CursoCategoria> CursoCategorias  { get; set; }
        public DbSet<Status> Statuses { get; set; }
        // public DbSet<Admin> Admins { get; set; }
        public DbSet<Log> Logs { get; set; }
    }
}
