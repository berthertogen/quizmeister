using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Quizmeister
{
    public class Startup
    {
        private const string MyAllowSpecificOrigins = "MyAllowSpecificOrigins";
        public Startup(IConfiguration configuration, Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public Microsoft.AspNetCore.Hosting.IWebHostEnvironment Environment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            services.AddApplicationInsightsTelemetry();

            var origins = Configuration
                .GetSection("CorsOrigins")
                .GetChildren()
                .Select(x => x.Value)
                .ToArray();
            services.AddCors(c =>
                c.AddPolicy(
                    MyAllowSpecificOrigins,
                    b => b
                        .WithOrigins(origins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                    )
                );

            services.AddTransient<QuizRepository>();
            services.AddTransient<RoundRepository>();
            services.AddTransient<QuestionRepository>();
            services.AddTransient<SubscriptionRepository>();
            services.AddTransient<QuizRunStepRepository>();
            services.AddTransient<AnswerRepository>();

            services.AddHealthChecks().AddDbContextCheck<Data.QuizmeisterContext>();
            services.AddDbContext<Data.QuizmeisterContext>(options => options.UseSqlServer(Configuration.GetConnectionString("QuizmeisterContext")));

            services.AddControllers();
            services.AddSignalR().AddAzureSignalR(Configuration.GetConnectionString("QuizmeisterSignalR"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(MyAllowSpecificOrigins);
            if (env.IsEnvironment("dev"))
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseFileServer();
            app.UseRouting();
            app.UseEndpoints(e =>
            {
                e.MapControllers();
                e.MapHealthChecks("/health");
                e.MapHub<QuizmeisterHub>("/quizmeister");
            });
        }
    }
}
