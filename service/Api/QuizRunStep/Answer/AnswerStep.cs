namespace Quizmeister
{
    public class AnswerStep
    {
        public int QuizId { get; set; }
        public int QuizRunStepId { get; set; }
        public int QuestionId { get; set; }
        public Subscription Subscription { get; set; }
    }
}
