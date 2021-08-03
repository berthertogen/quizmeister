namespace Quizmeister.Data
{
    public class QuizRound
    {
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public int RoundId { get; set; }
        public Round Round { get; set; }
        public int Order { get; set; }
    }
}
