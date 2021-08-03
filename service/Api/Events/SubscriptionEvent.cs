namespace Quizmeister
{
    public class SubscriptionEvent
    {
        public Subscription Subscription { get; set; }
        public MessageStatus Status { get; set; }
        public string Message { get; set; }
    }

    public enum MessageStatus
    {
        Success = 1,
        Warning = 2,
        Error = 3,
    }
}
