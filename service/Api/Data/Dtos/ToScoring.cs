namespace Quizmeister.Data
{
    public static class ToScoringExtensions
    {
        public static Scoring ToDto(this ScoringCreateInput input)
        {
            return new Scoring
            {
                Type = input.Type,
                TimeLimitSeconds = input.TimeLimitSeconds ?? 0,
                TimeScoringInterval = input.TimeScoringInterval ?? 0,
                WeightCorrectAnswer = input.WeightCorrectAnswer,
                WeightNoAnswer = input.WeightNoAnswer ?? 0,
            };
        }
        public static Scoring ToDto(this ScoringCreateInput input, int id, Scoring scoringDto)
        {
            scoringDto.Type = input.Type;
            scoringDto.TimeLimitSeconds = input.TimeLimitSeconds ?? 0;
            scoringDto.TimeScoringInterval = input.TimeScoringInterval ?? 0;
            scoringDto.WeightCorrectAnswer = input.WeightCorrectAnswer;
            scoringDto.WeightNoAnswer = input.WeightNoAnswer ?? 0;
            return scoringDto;
        }
        public static Quizmeister.Scoring ToScoring(this Scoring input)
        {
            return new Quizmeister.Scoring(input.Type, input.WeightCorrectAnswer, input.WeightNoAnswer, input.TimeLimitSeconds, input.TimeScoringInterval) { ScoringId = input.ScoringId };
        }
    }
}
