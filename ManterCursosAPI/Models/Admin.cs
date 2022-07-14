using Microsoft.AspNetCore.Identity;

namespace ManterCursosAPI.Models
{
    public class Admin : IdentityUser 
    {
        public string Nome { get; set; }
    }
}
