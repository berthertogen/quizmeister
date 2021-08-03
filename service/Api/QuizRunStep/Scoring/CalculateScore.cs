using System;
using System.Collections.Generic;
using System.Linq;

namespace Quizmeister
{
    public static class CalculateScore
    {
        public static void Score(ICollection<Data.QuizRunStepAnswer> quizRunStepAnswer)
        {
            if (quizRunStepAnswer == null || quizRunStepAnswer.Count <= 0)
            {
                return;
            }

            var scoring = quizRunStepAnswer.First()?.QuizRunStep?.Question?.Scoring;
            foreach (var answer in quizRunStepAnswer)
            {
                if (string.IsNullOrWhiteSpace(answer.Answers))
                {
                    answer.Score = scoring.WeightNoAnswer;
                }
                else
                {
                    var correctAnswers = answer.QuizRunStep.Question.Answers.Where(a => a.Correct);
                    var numberCorrect = correctAnswers.Count(ca => ca.Text.Equals(answer.Answers, StringComparison.InvariantCultureIgnoreCase));
                    if (scoring.Type == ScoringTypes.TimeToComplete && numberCorrect > 0)
                    {
                        var timeTakenSeconds = (int)Math.Round((answer.SendOn.Value - answer.QuizRunStep.SendOn).TotalSeconds, 0, MidpointRounding.AwayFromZero);
                        var timeTaken = RoundToMultiple(timeTakenSeconds, scoring.TimeScoringInterval);
                        answer.Score = (scoring.TimeLimitSeconds - timeTaken) / scoring.TimeScoringInterval;
                    }
                    else
                    {
                        answer.Score = scoring.WeightCorrectAnswer * numberCorrect;
                    }
                    answer.Correct = numberCorrect > 0;
                }
            }
            if (scoring.Type == ScoringTypes.UniqueKnowledge)
            {
                var numberCorrectAnswers = quizRunStepAnswer.Count(q => q.Correct);
                var scorePerCorrect = quizRunStepAnswer.Count * scoring.WeightCorrectAnswer;
                foreach (var correctAnswer in quizRunStepAnswer.Where(q => q.Correct))
                {
                    correctAnswer.Score = scorePerCorrect / numberCorrectAnswers;
                }
            }
        }

        public static int RoundToMultiple(int value, int multiple)
        {
            int remainder = value % multiple;
            int result = value - remainder;
            return result;
        }
    }
}
