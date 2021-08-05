using System;
using System.Reflection;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quizmeister;
using Quizmeister.Data;

namespace MigrationTool
{
    public class Migrator
    {
        public static System.Exception CanConnect(string connectionString)
        {
            try
            {
                var masterConnectionstring = new SqlConnectionStringBuilder(connectionString);
                masterConnectionstring.InitialCatalog = "master";
                using var connection = new SqlConnection(masterConnectionstring.ToString());
                connection.Open();
                using var command = new SqlCommand("select 1;", connection);
                return null;
            }
            catch (System.Exception exception)
            {
                return exception;
            }
        }

        public static void EnsureLastMigration(string connectionString)
        {
            using (var serviceProvider = BuildServiceProvider(connectionString))
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    scope.ServiceProvider.GetService<QuizmeisterContext>().Database.Migrate();
                }
            }
        }

        private static ServiceProvider BuildServiceProvider(string connectionString)
        {
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            var services = new ServiceCollection();
            services.AddLogging();
            services.AddDbContext<QuizmeisterContext>(options =>
              options.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(migrationsAssembly)));

            return services.BuildServiceProvider();
        }
    }
}
