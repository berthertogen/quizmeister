using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quizmeister;
using Quizmeister.Data;

namespace MigrationTool
{
    public class Migrator
    {
        public static bool CanConnect(string connectionString)
        {
            using (var serviceProvider = BuildServiceProvider(connectionString))
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    return scope.ServiceProvider.GetService<QuizmeisterContext>().Database.CanConnect();
                }
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
