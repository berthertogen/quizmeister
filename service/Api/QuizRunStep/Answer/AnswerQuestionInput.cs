namespace Quizmeister
{
    public class AnswerQuestionInput
    {
        public int SubscriptionId { get; set; }
        public int QuizId { get; set; }
        public int QuizRunStepId { get; set; }
        public string Answer { get; set; }
    }
}
