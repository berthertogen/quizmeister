using System;

namespace Quizmeister.Data
{
    public static class ToQuizRunStepAnswerExtensions
    {
        public static QuizRunStepAnswer ToDto(this AnswerQuestionInput input)
        {
            return new QuizRunStepAnswer
            {
                SubscriptionId = input.SubscriptionId,
                QuizRunStepId = input.QuizRunStepId,
                Answers = input.Answer,
                SendOn = DateTime.Now
            };
        }
        public static Quizmeister.AnswerStep ToAnswerStep(this QuizRunStepAnswer input)
        {
            return new Quizmeister.AnswerStep
            {
                QuizId = input.QuizRunStep.Quiz.QuizId,
                QuizRunStepId = input.QuizRunStepId,
                QuestionId = input.QuizRunStep.Question.QuestionId,
                Subscription = input.Subscription.ToSubscription(),
            };
        }

    }
}
