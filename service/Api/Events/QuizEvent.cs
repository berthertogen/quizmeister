namespace Quizmeister
{
    public class QuizEvent
    {
        public Quiz Quiz { get; set; }
        public MessageStatus Status { get; set; }
        public string Message { get; set; }
    }
}
