using System;
using System.ComponentModel.DataAnnotations;

namespace ManterCursosAPI.Models
{
    public class Curso
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTimeOffset DataInicio { get; set; }
        [Required]
        [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTimeOffset DataTermino { get; set; }
        public int? QuantidadeAlunos { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]    
        public int CursoCategoriaId { get; set; }
        public CursoCategoria CursoCategoria { get; set; }
    }
}
