using System;
using System.Collections.Generic;
using System.Linq;
using ShortIdGenerator = shortid.ShortId;

namespace Quizmeister.Data
{
    public static class ToQuizExtensions
    {
        public static Quiz ToDto(this QuizCreateInput input)
        {
            var shortId = ShortIdGenerator.Generate(DefaultShortIdOptions.Create()).ToUpperInvariant();
            return new Quiz
            {
                Title = input.Title,
                Status = QuizStatus.New,
                Date = input.Date,
                Location = input.Location,
                MaxSubscriptions = input.MaxSubscriptions,
                Remark = input.Remark,
                ShortId = shortId,
                ModifiedOn = DateTime.Now,
                SearchField = $"{shortId}{input.Title}{input.Date.ToUniversalTime()}{input.Location}{input.Remark}".ToLowerInvariant(),
                QuizzesRounds = input.RoundIds.Select((roundId, index) => new QuizRound
                {
                    RoundId = roundId,
                    Order = index + 1
                })?.ToList() ?? new List<QuizRound>()
            };
        }
        public static Quiz ToDto(this QuizCreateInput input, int id, Quiz quizDto)
        {
            quizDto.Title = input.Title;
            quizDto.Date = input.Date;
            quizDto.Location = input.Location;
            quizDto.MaxSubscriptions = input.MaxSubscriptions;
            quizDto.Remark = input.Remark;
            quizDto.ModifiedOn = DateTime.Now;
            quizDto.SearchField = $"{quizDto.ShortId}{input.Title}{input.Date.ToUniversalTime()}{input.Location}{input.Remark}".ToLowerInvariant();
            int index = 1;
            foreach (var roundId in input.RoundIds)
            {
                var existsing = quizDto.QuizzesRounds.SingleOrDefault(qr => qr.RoundId == roundId);
                if (existsing != null)
                {
                    existsing.Order = index;
                }
                else
                {
                    quizDto.QuizzesRounds.Add(new Data.QuizRound { QuizId = id, RoundId = roundId, Order = index });
                }
                index++;
            }
            var toDelete = quizDto.QuizzesRounds.Where(qr => !(input.RoundIds?.Contains(qr.RoundId) ?? false)).ToArray();
            for (int i = 0; i < toDelete.Length; i++)
            {
                quizDto.QuizzesRounds.Remove(toDelete[i]);
            }
            return quizDto;
        }

        public static Quizmeister.Quiz ToQuiz(this Quiz input, bool deep)
        {
            return new Quizmeister.Quiz
            {
                QuizId = input.QuizId,
                Status = input.Status,
                Title = input.Title,
                ShortId = input.ShortId,
                Date = input.Date,
                Location = input.Location,
                MaxSubscriptions = input.MaxSubscriptions,
                ModifiedOn = input.ModifiedOn,
                Remark = input.Remark,
                SearchField = input.SearchField,
                Rounds = deep ? input.QuizzesRounds?.OrderBy(q => q.Order).Select(qr => qr.Round.ToRound(true)).ToList() : null,
                Subscriptions = deep ? input.Subscriptions?.Select(s => s.ToSubscription()).ToList() : null
            };
        }
    }
}
