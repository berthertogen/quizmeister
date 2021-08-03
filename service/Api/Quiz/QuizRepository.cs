using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quizmeister.Data;

namespace Quizmeister
{
    public class QuizRepository
    {
        private readonly QuizmeisterContext context;

        public QuizRepository(Data.QuizmeisterContext context)
        {
            this.context = context;
        }

        internal async Task<Quiz> Add(QuizCreateInput input)
        {
            var quiz = input.ToDto();
            await context.Quizzes.AddAsync(quiz);
            await context.SaveChangesAsync();
            var newQuiz = await this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefaultAsync(q => q.QuizId == quiz.QuizId);
            return newQuiz.ToQuiz(false);
        }

        internal async Task<Quiz> Update(int quizId, QuizCreateInput input)
        {
            var quizDto = this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefault(q => q.QuizId == quizId);
            this.context.Quizzes.Update(input.ToDto(quizId, quizDto));
            await context.SaveChangesAsync();
            var newQuiz = await this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefaultAsync(q => q.QuizId == quizId);
            return newQuiz.ToQuiz(false);
        }

        internal async Task<QuizEvent> UpdateStatus(int quizId, QuizStatus status)
        {
            var quizDto = this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefault(q => q.QuizId == quizId);

            await new QuizStatusHandler().Handle(context, quizDto, status);

            quizDto.Status = status;
            quizDto.ModifiedOn = DateTime.Now;
            context.Quizzes.Update(quizDto);
            await context.SaveChangesAsync();
            return new QuizEvent
            {
                Quiz = await Get(quizId),
                Status = MessageStatus.Success
            };
        }

        internal async Task<Quiz> Copy(int quizId, IEnumerable<int> roundIds)
        {
            var quizDto = this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefault(q => q.QuizId == quizId);
            return await Add(new QuizCreateInput
            {
                Title = $"{quizDto.Title} - copy",
                Date = quizDto.Date,
                Location = quizDto.Location,
                MaxSubscriptions = quizDto.MaxSubscriptions,
                Remark = quizDto.Remark,
                RoundIds = roundIds?.ToArray() ?? Array.Empty<int>()
            });
        }

        internal async Task<Quiz> Delete(int quizId, bool deleteRounds)
        {
            var quiz = await this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefaultAsync(q => q.QuizId == quizId);
            if (deleteRounds && (quiz.QuizzesRounds?.Count ?? 0) > 0)
            {
                var quizzesRounds = quiz.QuizzesRounds.Where(qr => qr.Round.QuizzesRounds?.Count == 1);
                this.context.Rounds.RemoveRange(quizzesRounds.Select(qr => qr.Round));
                this.context.QuizzesRounds.RemoveRange(quizzesRounds);
            }
            this.context.Quizzes.Remove(quiz);
            await context.SaveChangesAsync();
            return quiz.ToQuiz(false);
        }

        internal async Task<Quiz> Get(int quizId)
        {
            var quiz = await this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .Include(q => q.Subscriptions)
              .SingleOrDefaultAsync(q => q.QuizId == quizId);
            return quiz.ToQuiz(true);
        }

        internal async Task<Quiz> Get(string shortId)
        {
            var quiz = await this.context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .Include(q => q.Subscriptions)
              .SingleOrDefaultAsync(q => q.ShortId == shortId);
            return quiz.ToQuiz(true);
        }

        internal async Task<IEnumerable<Quiz>> GetFilteredAndPaged(string term, (int offset, int limit) pager, QuizStatus? status, bool futureOnly)
        {
            var list = await context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round)
              .Include(q => q.Subscriptions)
              .Where(q => string.IsNullOrWhiteSpace(term) || EF.Functions.Like(q.SearchField, $"%{term}%"))
              .Where(q => !status.HasValue || q.Status == status.Value)
              .Where(q => !futureOnly || q.Date >= DateTime.Today)
              .Skip(pager.offset)
              .Take(pager.limit)
              .Select(q => q.ToQuiz(true))
              .ToListAsync();
            return list;
        }
    }
}
