using System;
using System.Collections.Generic;
using System.Linq;
using ShortIdGenerator = shortid.ShortId;

namespace Quizmeister.Data
{
    public static class ToRoundExtensions
    {
        public static Round ToDto(this RoundCreateInput input)
        {
            var shortId = ShortIdGenerator.Generate(DefaultShortIdOptions.Create()).ToUpperInvariant();
            return new Round
            {
                Title = input.Title,
                Remark = input.Remark,
                ShortId = shortId,
                ModifiedOn = DateTime.Now,
                Theme = input.Theme,
                SearchField = $"{shortId}{input.Title}{input.Theme}{input.Remark}".ToLowerInvariant(),
                RoundsQuestions = input.QuestionIds.Select((questionId, index) => new RoundQuestion
                {
                    QuestionId = questionId,
                    Order = index + 1
                })?.ToList() ?? new List<RoundQuestion>()
            };
        }
        public static Round ToDto(this RoundCreateInput input, int id, Round roundDto)
        {
            roundDto.Title = input.Title;
            roundDto.Theme = input.Theme;
            roundDto.Remark = input.Remark;
            roundDto.ModifiedOn = DateTime.Now;
            roundDto.SearchField = $"{roundDto.ShortId}{input.Title}{input.Theme}{input.Remark}".ToLowerInvariant();
            int index = 1;
            foreach (var questionId in input.QuestionIds)
            {
                var existsing = roundDto.RoundsQuestions.SingleOrDefault(qr => qr.QuestionId == questionId);
                if (existsing != null)
                {
                    existsing.Order = index;
                }
                else
                {
                    roundDto.RoundsQuestions.Add(new Data.RoundQuestion { RoundId = id, QuestionId = questionId, Order = index });
                }
                index++;
            }
            var toDelete = roundDto.RoundsQuestions.Where(qr => !(input.QuestionIds?.Contains(qr.QuestionId) ?? false)).ToArray();
            for (int i = 0; i < toDelete.Length; i++)
            {
                roundDto.RoundsQuestions.Remove(toDelete[i]);
            }
            return roundDto;
        }

        public static Quizmeister.Round ToRound(this Round input, bool deep)
        {
            return new Quizmeister.Round
            {
                RoundId = input.RoundId,
                ShortId = input.ShortId,
                Title = input.Title,
                Theme = input.Theme,
                Remark = input.Remark,
                SearchField = input.SearchField,
                ModifiedOn = input.ModifiedOn,
                Questions = deep ? input.RoundsQuestions?.OrderBy(q => q.Order).Select(rq => rq.Question.ToQuestion()).ToList() : null
            };
        }
    }
}
