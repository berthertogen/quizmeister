namespace Quizmeister
{
    public class AnswerEvent
    {
        public AnswerStep Answer { get; set; }
        public MessageStatus Status { get; set; }
        public string Message { get; set; }
    }
}
