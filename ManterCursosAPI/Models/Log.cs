using System.ComponentModel.DataAnnotations;

namespace ManterCursosAPI.Models
{
    public class Log
    {
        public int Id { get; set; }
        public string Responsavel { get; set; }
        public string Curso { get; set; }
        public string LogTipo { get; set; }

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm:ss}", ApplyFormatInEditMode = true)]
        public DateTime Timestamp { get; set; }
        
        // public int AdminId { get; set; }
        // public Admin Admin { get; set; }
        // public int CursoId { get; set; }
        // public Curso Curso { get; set; }
    }
}
