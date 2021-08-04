using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Quizmeister;
using Quizmeister.Data;

namespace DatabaseSeeder
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();

        static async Task Main(string[] args)
        {
            Console.WriteLine("Welcome to the quiz db seeder :)");
            Console.WriteLine("We'll be pulling questions from https://opentdb.com/api_config.php to our database");
            Console.WriteLine("Get ready to select a category");

            var categories = await GetCategories();
            foreach (var c in categories.trivia_categories)
            {
                Console.WriteLine($"{c.id}: {c.name}");
            }
            Console.Write("Category id: ");
            var categoryId = Console.ReadLine();
            var category = categories.trivia_categories.Single(category => category.id.ToString() == categoryId);
            Console.Write("How many questions (max 50): ");
            var numberOfQuestions = Console.ReadLine();
            Console.Write($"Create round {category.name} (y/n): ");
            var createRound = Console.ReadLine().Equals("y", StringComparison.InvariantCultureIgnoreCase);
            Console.Write("Read in as multiple choise (y/n): ");
            var multipleChoise = Console.ReadLine().Equals("y", StringComparison.InvariantCultureIgnoreCase);
            Console.WriteLine("1. CorrectAnswer ");
            Console.WriteLine("2. TimeToComplete ");
            Console.WriteLine("3. UniqueKnowledge ");
            Console.Write("Scoring type: ");
            var scoringType = Enum.Parse<ScoringTypes>(Console.ReadLine());
            Console.Write("Scoring WeightCorrectAnswer: ");
            var weightCorrectAnswer = int.Parse(Console.ReadLine());
            Console.Write("Scoring WeightNoAnswer: ");
            var weightNoAnswer = int.Parse(Console.ReadLine());
            var timeLimitSeconds = 0;
            var timeScoringInterval = 0;
            if (scoringType == ScoringTypes.TimeToComplete)
            {
                Console.Write("Scoring TimeLimitSeconds: ");
                timeLimitSeconds = int.Parse(Console.ReadLine());
                Console.Write("Scoring TimeScoringInterval: ");
                timeScoringInterval = int.Parse(Console.ReadLine());
            }
            var scoring = new ScoringCreateInput
            {
                Type = scoringType,
                WeightCorrectAnswer = weightCorrectAnswer,
                WeightNoAnswer = weightNoAnswer,
                TimeLimitSeconds = timeLimitSeconds,
                TimeScoringInterval = timeScoringInterval
            };

            var questions = await GetQuestions(categoryId, numberOfQuestions);
            string connectionString = GetConnectionString();
            Console.WriteLine($"Writing to : {connectionString}");
            using (var serviceProvider = BuildServiceProvider(connectionString))
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetService<QuizmeisterContext>();

                    var dbQuestions = questions.results
                      .Where(question => multipleChoise || !question.type.Equals("boolean", StringComparison.InvariantCultureIgnoreCase))
                      .Select(question => ToQuizmeisterQuestion(question, multipleChoise, scoring));
                    foreach (var question in dbQuestions)
                    {
                        await context.Questions.AddAsync(question);
                    }
                    await context.SaveChangesAsync();
                    if (createRound)
                    {
                        var round = new RoundCreateInput
                        {
                            Title = category.name,
                            Remark = "generated",
                            Theme = category.name,
                            QuestionIds = new int[] { }
                        }.ToDto();
                        foreach (var question in dbQuestions)
                        {
                            round.RoundsQuestions.Add(new RoundQuestion
                            {
                                Round = round,
                                Question = question
                            });
                        }
                        await context.Rounds.AddAsync(round);
                        await context.SaveChangesAsync();
                    }
                }
            }
            Console.WriteLine($"{questions.results.Length} added to Db");
        }

        private static Quizmeister.Data.Question ToQuizmeisterQuestion(Question question, bool multipleChoise, ScoringCreateInput scoring)
        {
            var answers = question.incorrect_answers
              .Where(answer => multipleChoise)
              .Select(answer => new AnswerCreateInput
              {
                  Correct = false,
                  Text = answer
              })
              .Union(new[]{new AnswerCreateInput{
          Correct = true,
          Text = question.correct_answer
        }})
              .ToArray();
            return new QuestionCreateInput
            {
                Title = question.question,
                Type = multipleChoise ? QuestionTypes.MultipleChoise : QuestionTypes.Open,
                Scoring = scoring,
                Remark = "generated",
                Answers = answers
            }.ToDto();
        }

        private static async Task<Questions> GetQuestions(string categoryId, string numberOfQuestions)
        {
            Console.WriteLine($"calling {client.BaseAddress}/api.php?amount={numberOfQuestions}&category={categoryId}");
            var questionsResponse = await client.GetAsync($"/api.php?amount={numberOfQuestions}&category={categoryId}");
            var questions = JsonConvert.DeserializeObject<Questions>(await questionsResponse.Content.ReadAsStringAsync());
            return questions;
        }

        private static async Task<Categories> GetCategories()
        {
            client.BaseAddress = new Uri("https://opentdb.com");
            var categoriesResponse = await client.GetAsync("/api_category.php");
            var categories = JsonConvert.DeserializeObject<Categories>(await categoriesResponse.Content.ReadAsStringAsync());
            return categories;
        }

        private static string GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetParent(AppContext.BaseDirectory).FullName)
                    .AddJsonFile("appsettings.json", false)
                    .AddJsonFile("appsettings.dev.json", true)
                    .AddEnvironmentVariables(prefix: "QUIZMEISTER_")
                    .Build();
            var connectionString = configuration.GetConnectionString("QuizmeisterContext");
            return connectionString;
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
