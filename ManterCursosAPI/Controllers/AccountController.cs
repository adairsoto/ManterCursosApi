using ManterCursosAPI.Dtos;
using ManterCursosAPI.Errors;
using ManterCursosAPI.Extensions;
using ManterCursosAPI.Interfaces;
using ManterCursosAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ManterCursosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Admin> _userManager;
        private readonly SignInManager<Admin> _signInManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<Admin> userManager, SignInManager<Admin> signInManager, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AdminDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);

            return new AdminDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Nome = user.Nome
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AdminDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new AdminDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Nome = user.Nome
            };
        }
    }
}