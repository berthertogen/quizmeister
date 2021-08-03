using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Quizmeister.Data;

namespace Quizmeister
{
    public class RoundRepository
    {
        private readonly QuizmeisterContext context;

        public RoundRepository(Data.QuizmeisterContext context)
        {
            this.context = context;
        }

        internal async Task<Round> Add(RoundCreateInput input)
        {
            var round = input.ToDto();
            await this.context.Rounds.AddAsync(round);
            await context.SaveChangesAsync();
            return await GetOneRound(round.RoundId);
        }

        internal async Task<Round> Update(int roundId, RoundCreateInput input)
        {
            var round = await GetOneDbRound(roundId);
            this.context.Rounds.Update(input.ToDto(roundId, round));
            await context.SaveChangesAsync();
            return await GetOneRound(roundId);
        }

        internal async Task<Round> Copy(int roundId, IEnumerable<int> questionIds)
        {
            var round = await GetOneDbRound(roundId);
            return await Add(new RoundCreateInput
            {
                Title = $"{round.Title} - copy",
                Theme = round.Theme,
                Remark = round.Remark,
                QuestionIds = questionIds?.ToArray() ?? Array.Empty<int>()
            });
        }

        internal async Task<Round> Delete(int roundId, bool deleteQuestions)
        {
            var round = await GetOneDbRound(roundId);
            if (deleteQuestions)
            {
                var roundsQuestions = round.RoundsQuestions.Where(qr => qr.Question.RoundsQuestions.Count == 1);
                this.context.Questions.RemoveRange(roundsQuestions.Select(qr => qr.Question));
                this.context.RoundsQuestions.RemoveRange(roundsQuestions);
            }
            this.context.Rounds.Remove(round);
            await context.SaveChangesAsync();
            return round.ToRound(false);
        }

        internal async Task<Round> GetOne(int roundId)
        {
            return await GetOneRound(roundId);
        }

        internal async Task<IEnumerable<Round>> GetForQuiz(int quizId)
        {
            return await this.context.QuizzesRounds
                          .Include(rq => rq.Round)
                          .ThenInclude(r => r.RoundsQuestions)
                          .ThenInclude(rq => rq.Question)
                          .ThenInclude(rq => rq.Answers)
                          .Include(rq => rq.Round)
                          .ThenInclude(r => r.RoundsQuestions)
                          .ThenInclude(rq => rq.Question)
                          .ThenInclude(rq => rq.Scoring)
              .Where(rq => rq.QuizId == quizId)
              .OrderBy(rq => rq.Order)
              .Select(rq => rq.Round.ToRound(true))
              .ToListAsync();
        }

        internal async Task<IEnumerable<Round>> GetFilteredAndPaged(string term, (int offset, int limit) pager)
        {
            return await Rounds()
              .Where(q => string.IsNullOrWhiteSpace(term) || EF.Functions.Like(q.SearchField, $"%{term}%"))
              .Skip(pager.offset)
              .Take(pager.limit)
              .Select(r => r.ToRound(true))
              .ToListAsync();
        }

        internal async Task<IEnumerable<string>> GetThemes()
        {
            return await this.context.Rounds
              .Select(round => round.Theme)
              .Distinct()
              .ToListAsync();
        }

        private async Task<Data.Round> GetOneDbRound(int roundId)
        {
            return await Rounds()
                    .SingleOrDefaultAsync(r => r.RoundId == roundId);
        }

        private IIncludableQueryable<Data.Round, Data.Question> Rounds()
        {
            return this.context.Rounds
                          .Include(r => r.RoundsQuestions)
                          .ThenInclude(rq => rq.Question);
        }

        private async Task<Round> GetOneRound(int roundId)
        {
            return (await GetOneDbRound(roundId)).ToRound(true);
        }
    }
}
