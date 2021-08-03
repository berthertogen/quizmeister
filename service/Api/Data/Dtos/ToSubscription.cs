using System;
using ShortIdGenerator = shortid.ShortId;

namespace Quizmeister.Data
{
    public static class ToSubscriptionExtensions
    {
        public static Subscription ToDto(this SubscriptionCreateInput input, Quiz quiz, SubscriptionStatus status)
        {
            var shortId = ShortIdGenerator.Generate(DefaultShortIdOptions.Create()).ToUpperInvariant();
            return new Subscription
            {
                Quiz = quiz,
                Status = status,
                Team = input.Team,
                Email = input.Email,
                Remark = input.Remark,
                ShortId = shortId,
                ModifiedOn = DateTime.Now,
                SearchField = $"{shortId}{input.Team}{input.Email}{input.Remark}".ToLowerInvariant()
            };
        }

        public static Quizmeister.Subscription ToSubscription(this Subscription input)
        {
            return new Quizmeister.Subscription
            {
                SubscriptionId = input.SubscriptionId,
                ShortId = input.ShortId,
                Status = input.Status,
                Team = input.Team,
                Email = input.Email,
                Remark = input.Remark,
                SearchField = input.SearchField,
                ModifiedOn = input.ModifiedOn,
                Quiz = input.Quiz.ToQuiz(false)
            };
        }
    }
}
