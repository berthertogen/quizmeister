
namespace Quizmeister
{
    public class Scoring
    {
        public Scoring(ScoringTypes type, int weightCorrectAnswer, int weightNoAnswer, int timeLimitSeconds, int timeScoringInterval)
        {
            Type = type;
            WeightCorrectAnswer = weightCorrectAnswer;
            WeightNoAnswer = weightNoAnswer;
            TimeLimitSeconds = timeLimitSeconds;
            TimeScoringInterval = timeScoringInterval;
        }
        public static Scoring CreateForAdd(ScoringCreateInput input)
        {
            var scoring = new Scoring(input.Type, input.WeightCorrectAnswer, input.WeightNoAnswer ?? 0, input.TimeLimitSeconds ?? 0, input.TimeScoringInterval ?? 0);
            return scoring;
        }

        public int ScoringId { get; set; }
        public ScoringTypes Type { get; set; }
        public int WeightCorrectAnswer { get; set; }
        public int WeightNoAnswer { get; set; }
        public int TimeLimitSeconds { get; set; }
        public int TimeScoringInterval { get; set; }
    }
}
