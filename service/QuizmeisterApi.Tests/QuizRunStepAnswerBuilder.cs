using System;
using System.Collections.Generic;
using System.Linq;
using Quizmeister.Data;

namespace QuizmeisterApi.Tests
{
    public class QuizRunStepAnswerBuilder
    {
        private readonly List<QuizRunStepAnswer> answers;
        private readonly QuizRunStep quizRunStep;
        private bool questionSet = false;
        private bool scoringSet = false;

        public QuizRunStepAnswerBuilder()
        {
            answers = new List<QuizRunStepAnswer>();
            quizRunStep = new QuizRunStep
            {
                Question = new Question { Scoring = new Scoring() },
                SendOn = new System.DateTime(2000, 1, 1, 12, 0, 0)
            };
        }

        public QuizRunStepAnswerBuilder Answer(string team, int? secondsTaken, string answer = null)
        {
            this.answers.Add(new QuizRunStepAnswer
            {
                Subscription = new Subscription { Team = team },
                Answers = answer,
                QuizRunStep = quizRunStep,
                SendOn = secondsTaken.HasValue ? quizRunStep.SendOn.AddSeconds(secondsTaken.Value) : (DateTime?)null
            });
            return this;
        }

        public QuizRunStepAnswerBuilder Question(params string[] correctAnswers)
        {
            if (questionSet)
            {
                throw new InvalidOperationException("Question was set before!");
            }
            quizRunStep.Question.Answers = correctAnswers.Select(a => new Answer { Text = a, Correct = true }).ToList();
            questionSet = true;
            return this;
        }

        public QuizRunStepAnswerBuilder ScoringCorrectAnswer(int weightCorrectAnswer, int weightNoAnswer = 0)
        {
            if (scoringSet)
            {
                throw new InvalidOperationException("Question was set before!");
            }
            quizRunStep.Question.Scoring = new Scoring
            {
                Type = Quizmeister.ScoringTypes.CorrectAnswer,
                WeightCorrectAnswer = weightCorrectAnswer,
                WeightNoAnswer = weightNoAnswer
            };
            scoringSet = true;
            return this;
        }

        public QuizRunStepAnswerBuilder ScoringTimeToComplete(int timeLimitSeconds, int timeScoringInterval, int weightNoAnswer = 0)
        {
            if (scoringSet)
            {
                throw new InvalidOperationException("Question was set before!");
            }
            quizRunStep.Question.Scoring = new Scoring
            {
                Type = Quizmeister.ScoringTypes.TimeToComplete,
                TimeLimitSeconds = timeLimitSeconds,
                TimeScoringInterval = timeScoringInterval,
                WeightNoAnswer = weightNoAnswer
            };
            scoringSet = true;
            return this;
        }

        public QuizRunStepAnswerBuilder ScoringUniqueKnowledge(int weightCorrectAnswer, int weightNoAnswer = 0)
        {
            if (scoringSet)
            {
                throw new InvalidOperationException("Question was set before!");
            }
            quizRunStep.Question.Scoring = new Scoring
            {
                Type = Quizmeister.ScoringTypes.UniqueKnowledge,
                WeightCorrectAnswer = weightCorrectAnswer,
                WeightNoAnswer = weightNoAnswer
            };
            scoringSet = true;
            return this;
        }

        public List<QuizRunStepAnswer> Build()
        {
            return answers;
        }
    }
}
