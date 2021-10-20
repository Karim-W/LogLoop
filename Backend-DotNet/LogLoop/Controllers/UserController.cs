using LogLoop.Common.Models;
using LogLoop.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        /// <summary>
        /// ///////////////////////////////////////////////////////////Gets///////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>



        //////////////////////////////////////////////////////////////Posts///////////////////////////////////////////////////////////
        [HttpPost]
        public async Task<UserEntity> RegisterUser([FromBody] UserEntity newUser) {
            newUser.Id = new Guid();
            context.Add(newUser);
            await context.SaveChangesAsync();
            return newUser;
        }



    }
}
