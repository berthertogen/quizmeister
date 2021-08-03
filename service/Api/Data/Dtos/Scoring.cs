namespace Quizmeister.Data
{
    public class Scoring
    {
        public int ScoringId { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public ScoringTypes Type { get; set; }
        public int WeightCorrectAnswer { get; set; }
        public int WeightNoAnswer { get; set; }
        public int TimeLimitSeconds { get; set; }
        public int TimeScoringInterval { get; set; }
    }
}
