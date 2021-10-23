using LogLoop.Common.Models;
using LogLoop.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LogLoop.Common.Functions;
using Newtonsoft.Json;

namespace LogLoop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext context;

        public UserController(AppDbContext context)
        {
            this.context = context;
        }

        /// ///////////////////////////////////////////////////////////Gets///////////////////////////////////////////////////////////

        public class userLoginModel
        {
            public string email { get; set; }
            public string pass { get; set; }
        }


        [HttpPost("/api/user/login")]
        public async Task<ActionResult<string>> Login([FromBody] userLoginModel loginModel)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == loginModel.email && u.Password == loginModel.pass);
            if (user == null)
            {
                return NotFound();
            }
            if (user.LastLogin < DateTime.Now.AddDays(-1))
            {
                user.Token = Auth.generateAuthToken();
            }
            user.LastLogin = DateTime.Now;
            context.Update(user);
            await context.SaveChangesAsync();
            //return Ok(Auth.hashPassword(user.ToString()));
            //return Ok(new { token = user.Token, user = user });
            return Ok(Auth.encrypt(JsonConvert.SerializeObject(user)));
        }


        //////////////////////////////////////////////////////////////Posts///////////////////////////////////////////////////////////
        [HttpPost]
        public async Task<UserEntity> RegisterUser([FromBody] UserEntity newUser)
        {
            newUser.Id = new Guid();
            context.Add(newUser);
            await context.SaveChangesAsync();
            return newUser;
        }



    }
}
