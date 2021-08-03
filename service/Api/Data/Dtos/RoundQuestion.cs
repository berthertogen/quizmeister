namespace Quizmeister.Data
{
    public class RoundQuestion
    {
        public int RoundId { get; set; }
        public Round Round { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public int Order { get; set; }
    }
}
