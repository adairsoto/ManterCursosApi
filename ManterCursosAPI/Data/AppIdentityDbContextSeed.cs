using ManterCursosAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace ManterCursosAPI.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<Admin> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new Admin
                {
                    Nome = "Admin1",
                    Email = "admin1@email.com",
                    UserName = "admin1@email.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");

                var user2 = new Admin
                {
                    Nome = "Admin2",
                    Email = "admin2@email.com",
                    UserName = "admin2@email.com"
                };

                await userManager.CreateAsync(user2, "Pa$$w0rd");
            }
        }
    }
}