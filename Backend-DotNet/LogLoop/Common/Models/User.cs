using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LogLoop.Common.Models
{
    [Table("User")]
    public class UserEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string phone { get; set; }
        public string imageUrl { get; set; }
        public List<PostEntity> Posts { get; set; }
    }
}
