using Microsoft.EntityFrameworkCore;

namespace Quizmeister.Data
{
    public class QuizmeisterContext : DbContext
    {
        public QuizmeisterContext(DbContextOptions<QuizmeisterContext> options) : base(options) { }

        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizRound> QuizzesRounds { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<RoundQuestion> RoundsQuestions { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Scoring> Scorings { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<QuizRunStep> QuizRunSteps { get; set; }
        public DbSet<QuizRunStepAnswer> QuizRunStepAnswers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quiz>()
              .HasMany(bc => bc.Subscriptions)
              .WithOne(b => b.Quiz)
              .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuizRound>()
              .HasKey(qr => new { qr.QuizId, qr.RoundId });
            modelBuilder.Entity<QuizRound>()
              .HasOne(bc => bc.Quiz)
              .WithMany(b => b.QuizzesRounds)
              .HasForeignKey(bc => bc.QuizId);
            modelBuilder.Entity<QuizRound>()
              .HasOne(bc => bc.Round)
              .WithMany(c => c.QuizzesRounds)
              .HasForeignKey(bc => bc.RoundId);

            modelBuilder.Entity<RoundQuestion>()
              .HasKey(qr => new { qr.RoundId, qr.QuestionId });
            modelBuilder.Entity<RoundQuestion>()
              .HasOne(bc => bc.Round)
              .WithMany(b => b.RoundsQuestions)
              .HasForeignKey(bc => bc.RoundId);
            modelBuilder.Entity<RoundQuestion>()
              .HasOne(bc => bc.Question)
              .WithMany(c => c.RoundsQuestions)
              .HasForeignKey(bc => bc.QuestionId);

            modelBuilder.Entity<Question>()
              .Property(q => q.Type)
              .HasConversion<int>();
            modelBuilder.Entity<Question>()
              .HasMany(bc => bc.Answers)
              .WithOne(b => b.Question)
              .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Question>()
              .HasOne(bc => bc.Scoring)
              .WithOne(b => b.Question)
              .HasForeignKey<Scoring>(b => b.QuestionId)
              .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Scoring>()
              .Property(q => q.Type)
              .HasConversion<int>();

            modelBuilder.Entity<QuizRunStep>()
              .HasOne(bc => bc.Quiz);
            modelBuilder.Entity<QuizRunStep>()
              .HasOne(bc => bc.Round);
            modelBuilder.Entity<QuizRunStep>()
              .HasOne(bc => bc.Question);

            modelBuilder.Entity<QuizRunStepAnswer>()
              .HasOne(bc => bc.QuizRunStep)
              .WithMany(qrs => qrs.Answers);
            modelBuilder.Entity<QuizRunStepAnswer>()
              .HasOne(bc => bc.Subscription);
        }
    }
}
