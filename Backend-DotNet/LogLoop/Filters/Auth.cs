using System;
using System.Threading.Tasks;
using LogLoop.Contexts;
using Microsoft.AspNetCore.Mvc.Filters;

namespace LogLoop.Filters
{
    public class Auth : Attribute, IAsyncActionFilter
    {
        private readonly AppDbContext context;
        public Auth(AppDbContext context)
        {
            this.context = context;
        }

        public Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            throw new NotImplementedException();
        }

    }
}