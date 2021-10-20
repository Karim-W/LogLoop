using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LogLoop.Common.Models;
using Microsoft.EntityFrameworkCore;
namespace LogLoop.Contexts
{
    public class AppDbContext: Microsoft.EntityFrameworkCore.DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        { }
        public Microsoft.EntityFrameworkCore.DbSet<UserEntity> Users { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<PostEntity> Posts { get; set; }



    }
}
