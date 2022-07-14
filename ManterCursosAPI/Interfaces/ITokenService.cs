using ManterCursosAPI.Models;

namespace ManterCursosAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Admin user);
    }
}