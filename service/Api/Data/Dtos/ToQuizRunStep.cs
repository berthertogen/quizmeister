using System.Collections.Generic;
using System.Linq;

namespace Quizmeister.Data
{
    public static class ToQuizRunStepExtensions
    {
        public static Quizmeister.QuizRunStepNew ToQuizRunStepNew(this QuizRunStep input, List<string> answers = null, List<QuizRunScore> scores = null)
        {
            return new Quizmeister.QuizRunStepNew
            {
                QuizRunStepId = input.QuizRunStepId,
                Status = input.Status,
                Quiz = input.Quiz.ToQuiz(false),
                Round = input.Round?.ToRound(false),
                Question = input.Question?.ToQuestion(),
                AnsweredBy = input.Answers?.Select(a => a.Subscription.ToSubscription()).ToList(),
                Answers = answers,
                Scores = scores
            };
        }
    }
}
