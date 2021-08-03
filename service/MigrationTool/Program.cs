using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace MigrationTool
{
    static class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Getting connection string.");
            var configuration = new ConfigurationBuilder()
              .SetBasePath(Directory.GetParent(AppContext.BaseDirectory).FullName)
              .AddJsonFile("appsettings.json", false)
              .AddJsonFile("appsettings.dev.json", true)
              .AddEnvironmentVariables()
              .Build();
            Console.WriteLine($"Applying migrations. ({configuration.GetSection("ConnectionStrings").GetValue<string>("QuizmeisterContext")})");

            Console.WriteLine("Testing connection ...");

            while (!Migrator.CanConnect(configuration.GetConnectionString("QuizmeisterContext")))
            {
                Console.WriteLine($"Failed to connect, sleeping 5 seconds ... (Db is starting and not yet ready? or down)");
                System.Threading.Thread.Sleep(5000);
            }

            Migrator.EnsureLastMigration(configuration.GetConnectionString("QuizmeisterContext"));
            Console.WriteLine("Done.");
        }
    }
}
