using System.Collections.Generic;

namespace Quizmeister
{
    public class QuizRunStepNew
    {
        public int QuizRunStepId { get; set; }
        public QuizRunStepStatus Status { get; set; }
        public Quiz Quiz { get; set; }
        public Round Round { get; set; }
        public Question Question { get; set; }
        public List<Subscription> AnsweredBy { get; set; }
        public List<string> Answers { get; set; }
        public List<QuizRunScore> Scores { get; set; }
    }
}
