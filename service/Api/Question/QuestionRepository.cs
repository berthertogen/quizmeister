using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quizmeister.Data;

namespace Quizmeister
{
    public class QuestionRepository
    {
        private readonly QuizmeisterContext context;

        public QuestionRepository(Data.QuizmeisterContext context)
        {
            this.context = context;
        }

        internal async Task<Question> Add(QuestionCreateInput input)
        {
            var question = input.ToDto();
            await context.Questions.AddAsync(question);
            await context.SaveChangesAsync();
            var questionAdded = await this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .SingleOrDefaultAsync(r => r.QuestionId == question.QuestionId);
            return questionAdded.ToQuestion();
        }

        internal async Task<Question> Update(int id, QuestionCreateInput input)
        {
            var questionDto = this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .Single(q => q.QuestionId == id);

            var question = input.ToDto(id, questionDto);
            this.context.Questions.Update(question);

            await context.SaveChangesAsync();
            var questionUpdated = await this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .SingleOrDefaultAsync(r => r.QuestionId == question.QuestionId);
            return questionUpdated.ToQuestion();
        }

        internal async Task<Question> Copy(int questionId)
        {
            var questionDto = this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .Single(q => q.QuestionId == questionId);
            return await Add(new QuestionCreateInput
            {
                Title = $"{questionDto.Title} - copy",
                Type = questionDto.Type,
                Remark = questionDto.Remark,
                Answers = questionDto.Answers.Select(answerDto => new AnswerCreateInput
                {
                    Correct = answerDto.Correct,
                    Text = answerDto.Text
                }).ToArray(),
                Scoring = new ScoringCreateInput
                {
                    Type = questionDto.Scoring.Type,
                    TimeLimitSeconds = questionDto.Scoring.TimeLimitSeconds,
                    TimeScoringInterval = questionDto.Scoring.TimeScoringInterval,
                    WeightCorrectAnswer = questionDto.Scoring.WeightCorrectAnswer,
                    WeightNoAnswer = questionDto.Scoring.WeightNoAnswer,
                }
            });
        }

        internal async Task<Question> Delete(int questionId)
        {
            var question = this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .Single(q => q.QuestionId == questionId);
            context.Questions.Remove(question);
            await context.SaveChangesAsync();
            return question.ToQuestion();
        }

        internal async Task<Question> Get(int questionId)
        {
            var question = await this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .Include(q => q.RoundsQuestions)
              .ThenInclude(qr => qr.Round)
              .SingleOrDefaultAsync(q => q.QuestionId == questionId);
            return question.ToQuestion();
        }

        internal async Task<Question> GetShortId(string shortId)
        {
            var question = await this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .SingleOrDefaultAsync(q => q.ShortId.Equals(shortId, StringComparison.InvariantCultureIgnoreCase));
            return question.ToQuestion();
        }

        internal async Task<IEnumerable<Question>> GetFilteredAndPaged(string term, (int offset, int limit) pager)
        {
            return await this.context.Questions
              .Include(q => q.Answers)
              .Include(q => q.Scoring)
              .Where(q => string.IsNullOrWhiteSpace(term) || EF.Functions.Like(q.SearchField, $"%{term}%"))
              .Skip(pager.offset)
              .Take(pager.limit)
              .Select(q => q.ToQuestion())
              .ToListAsync();
        }
    }
}
