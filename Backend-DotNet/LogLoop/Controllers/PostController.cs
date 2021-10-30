using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LogLoop.Common.Functions;
using LogLoop.Common.Models;
using LogLoop.Contexts;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace LogLoop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext context;

        public PostController(AppDbContext context)
        {
            this.context = context;
        }
        public class userToken
        {
            public string token { get; set; }

        }
        ////////////////////////////////////GET/////////////////////////
        #region Gets
        [HttpGet("/api/Post/user/{id}")]
        public IActionResult GetPostsByUser(Guid id, int page = 0, int pageSize = 10)
        {
            var theUser = context.Users.FirstOrDefault(u => u.Id == id);
            var posts = context.Posts.Where(p => p.Author == theUser).OrderByDescending(p => p.CreatedAt).Skip((page) * pageSize).Take(pageSize).Select(page => new { page.Id, page.Title, page.Content, page.CreatedAt, page.UpdatedAt }).ToList();
            return Ok(posts);
        }
        [HttpPost("/api/MyPosts")]
        public IActionResult GetMyPosts([FromBody] userToken token, int page = 0, int pageSize = 10)
        {
            var theUser = JsonConvert.DeserializeObject<UserEntity>(Auth.Decrypt(token.token));
            // var theUser = context.Users.FirstOrDefault(u => u.Id == userId);
            var posts = context.Posts.Where(p => p.Author == theUser).OrderByDescending(p => p.CreatedAt).Skip((page) * pageSize).Take(pageSize).Select(page => new { page.Id, page.Title, page.Content, page.CreatedAt, page.UpdatedAt }).ToList();
            // return Ok(posts);
            return Ok(posts);
        }
        [HttpGet("/api/MyPosts/Pages")]
        public IActionResult GetMyPostsPages(int pageSize = 10)
        {
            this.HttpContext.Request.Headers.TryGetValue("Authorization", out var token);
            var theUser = JsonConvert.DeserializeObject<UserEntity>(Auth.Decrypt(token));
            var posts = context.Posts.Where(p => p.AuthorId == theUser.Id).Count();
            var pages = posts / pageSize;
            return Ok(pages + 1);
        }
        [HttpGet("/api/MyPosts")]
        public IActionResult GetMeMyPosts(int page = 0, int pageSize = 10)
        {
            this.HttpContext.Request.Headers.TryGetValue("Authorization", out var token);
            var theUser = JsonConvert.DeserializeObject<UserEntity>(Auth.Decrypt(token));
            // var theUser = context.Users.FirstOrDefault(u => u.Id == userId);
            var posts = context.Posts.Where(p => p.Author == theUser).OrderByDescending(p => p.CreatedAt).Skip((page) * pageSize).Take(pageSize).Select(page => new { page.Id, page.Title, page.Content, page.CreatedAt, page.UpdatedAt }).ToList();
            // return Ok(posts);
            return Ok(posts);
        }
        [HttpGet("/api/Post/{id}")]
        public IActionResult GetPost(Guid id)
        {
            var post = context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
        [HttpGet("/api/Posts")]
        public IActionResult GetPosts()
        {
            var posts = context.Posts.Select(page => new { page.Id }).ToList();
            return Ok(posts);
        }

        // public IActionResult Get()
        // {

        //     return Ok(context.Posts);
        // }
        #endregion
        ////////////////////////////////////POST/////////////////////////
        #region Posts
        [HttpPost("/api/Post/user/{id}")]
        public async Task<ActionResult<PostEntity>> createAPost(Guid id, [FromBody] PostEntity post)
        {
            var theUser = context.Users.FirstOrDefault(u => u.Id == id);
            if (post == null || theUser == null)
            {
                return NotFound();
            }
            post.CreatedAt = DateTime.Now;
            post.UpdatedAt = DateTime.Now;
            post.Id = Guid.NewGuid();
            post.Author = theUser;
            await context.Posts.AddAsync(post);
            theUser.Logs.Add(post);
            context.Update(theUser);
            await context.SaveChangesAsync();
            return Ok();
        }

        //Add MyPost
        [HttpPost("/api/AddMyPosts")]
        public async Task<ActionResult<PostEntity>> createMyPost([FromBody] PostEntity post)
        {
            this.HttpContext.Request.Headers.TryGetValue("Authorization", out var token);
            var theUser = JsonConvert.DeserializeObject<UserEntity>(Auth.Decrypt(token));
            if (post == null || theUser == null)
            {
                return NotFound();
            }
            post.CreatedAt = DateTime.Now;
            post.UpdatedAt = DateTime.Now;
            post.Id = Guid.NewGuid();
            var linkedUser = context.Users.FirstOrDefault(u => u.Id == theUser.Id);
            post.Author = linkedUser;
            await context.Posts.AddAsync(post);
            linkedUser.Logs.Add(post);
            context.Update(linkedUser);
            await context.SaveChangesAsync();
            return Ok();
        }

        #endregion
        ////////////////////////////////////PUT/////////////////////////
        #region Puts
        #endregion
        ////////////////////////////////////DELETE/////////////////////////
        #region Deletes
        [HttpDelete("/api/Post/{id}")]
        public async Task<ActionResult<PostEntity>> DeletePost(Guid id)
        {
            this.HttpContext.Request.Headers.TryGetValue("Authorization", out var token);
            var theUser = JsonConvert.DeserializeObject<UserEntity>(Auth.Decrypt(token));
            var post = context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null || theUser == null)
            {
                return NotFound();
            }
            if (post.AuthorId != theUser.Id)
            {
                return Unauthorized();
            }
            context.Posts.Remove(post);
            await context.SaveChangesAsync();
            return Ok();
        }
        #endregion
        ////////////////////////////////////PATCH/////////////////////////
        #region Patches
        [HttpPatch("/api/Post/{id}")]
        public async Task<ActionResult<PostEntity>> PatchPost(Guid id, [FromBody] PostEntity post)
        {
            this.HttpContext.Request.Headers.TryGetValue("Authorization", out var token);
            var theUser = JsonConvert.DeserializeObject<UserEntity>(Auth.Decrypt(token));
            var thePost = context.Posts.FirstOrDefault(p => p.Id == id);
            if (thePost == null || theUser == null)
            {
                return NotFound();
            }
            if (thePost.AuthorId != theUser.Id)
            {
                return Unauthorized();
            }
            thePost.Title = post.Title;
            thePost.Content = post.Content;
            thePost.UpdatedAt = DateTime.Now;
            context.Update(thePost);
            await context.SaveChangesAsync();
            return Ok();
        }
        #endregion
    }
}