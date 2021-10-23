using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LogLoop.Common.Models;
using Microsoft.EntityFrameworkCore;
namespace LogLoop.Contexts
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        public Microsoft.EntityFrameworkCore.DbSet<UserEntity> Users { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<PostEntity> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().HasKey(p => p.Id);
            modelBuilder.Entity<PostEntity>().HasKey(p => p.Id);
            modelBuilder.Entity<UserEntity>().HasMany(p => p.Logs).WithOne(p => p.Author).HasPrincipalKey(p => p.Id).HasForeignKey(p => p.AuthorId);
            modelBuilder.Entity<PostEntity>().HasOne(p => p.Author).WithMany(p => p.Logs).HasForeignKey(p => p.AuthorId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<PostEntity>().HasOne(p => p.Author).WithMany(p => p.Logs).HasPrincipalKey(p => p.Id).HasForeignKey(p => p.AuthorId);
            // modelBuilder.Entity<PostEntity>().HasOne(p => p.Author).WithMany(p => p.Logs).HasForeignKey(p => p.Author);
        }


    }
}
