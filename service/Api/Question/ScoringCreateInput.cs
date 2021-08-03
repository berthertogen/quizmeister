namespace Quizmeister
{
    public class ScoringCreateInput
    {
        public ScoringTypes Type { get; set; }
        public int WeightCorrectAnswer { get; set; }
        public int? WeightNoAnswer { get; set; }
        public int? TimeLimitSeconds { get; set; }
        public int? TimeScoringInterval { get; set; }
    }
}
