namespace Quizmeister
{
    public class SubscriptionCreateInput
    {
        public int QuizId { get; set; }
        public string Team { get; set; }
        public string Email { get; set; }
        public string Remark { get; set; }
    }
}
