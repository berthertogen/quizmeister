using System;

namespace Quizmeister.Data
{
    public class QuizRunStepAnswer
    {
        public int QuizRunStepAnswerId { get; set; }
        public int SubscriptionId { get; set; }
        public Subscription Subscription { get; set; }
        public int QuizRunStepId { get; set; }
        public QuizRunStep QuizRunStep { get; set; }
        public string Answers { get; set; }
        public DateTime? SendOn { get; set; }
        public bool Correct { get; set; }
        public int? Score { get; set; }
    }
}
