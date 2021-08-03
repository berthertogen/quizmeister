namespace Quizmeister
{
    public class QuizRunStepEvent
    {
        public QuizRunStepNew PreviousStep { get; set; }
        public QuizRunStepNew Step { get; set; }
        public MessageStatus Status { get; set; }
        public string Message { get; set; }
    }
}
