using System.Security.Claims;
using ManterCursosAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ManterCursosAPI.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<Admin> FindByEmailFromClaimsPrinciple(this UserManager<Admin> input, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}