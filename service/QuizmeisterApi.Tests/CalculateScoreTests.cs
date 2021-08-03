using Xunit;

namespace QuizmeisterApi.Tests
{
    public class CalculateScoreTests
    {

        [Fact]
        public void TwoTeams_OneOpenQuestion_BothCorrect_ShouldReturnBothWithScore1()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringCorrectAnswer(1)
              .Answer("Team1", 9, "correct answer")
              .Answer("Team2", 12, "correct answer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(1, input[0].Score);
            Assert.Equal(1, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestion_BothInCorrect_ShouldReturnBothWithScore0()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringCorrectAnswer(1)
              .Answer("Team1", 9, "incorrect answer")
              .Answer("Team2", 12, "incorrect answer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(0, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestion_FirstInCorrectSecondCorrect_ShouldReturnFirstWithScore0SecondWithScore1()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringCorrectAnswer(1)
              .Answer("Team1", 9, "incorrect answer")
              .Answer("Team2", 12, "correct answer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(1, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestion_FirstInCorrectSecondNoAnswer_ShouldReturnFirstWithScore0SecondWithScore0()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringCorrectAnswer(1)
              .Answer("Team1", 9, "incorrect answer")
              .Answer("Team2", null)
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(0, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestionWithWeightNoAnswer5_FirstInCorrectSecondNoAnswer_ShouldReturnFirstWithScore0SecondWithScore0()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringCorrectAnswer(1, 5)
              .Answer("Team1", 9, "incorrect answer")
              .Answer("Team2", null)
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(5, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestionWeightCorrectAnswer6_FirstCorrectDifferentCasingSecondCorrectDifferentCasing_ShouldReturnFirstWithScore6SecondWithScore6()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringCorrectAnswer(6)
              .Answer("Team1", 9, "CoRRect AnsweR")
              .Answer("Team2", null, "corRECT anSWer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(6, input[0].Score);
            Assert.Equal(6, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestionWithIntervalScoring_FirstOneCorrectInFirstIntervalSecondCorrectInSecondInterval_ShouldReturnFirstWithScore6SecondWithScore5()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringTimeToComplete(60, 10)
              .Answer("Team1", 9, "correct answer")
              .Answer("Team2", 12, "correct answer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(6, input[0].Score);
            Assert.Equal(5, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestionWithIntervalScoring_FirstOneInCorrectSecondNoAnswer_ShouldReturnFirstWithScore0SecondWithScore55()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringTimeToComplete(60, 10, 55)
              .Answer("Team1", 45, "incorrect answer")
              .Answer("Team2", null)
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(55, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestionWithIntervalScoring_FirstOneCorrectInSecondToLastIntervalSecondNoAnswer_ShouldReturnFirstWithScore2SecondWithScore0()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringTimeToComplete(60, 10)
              .Answer("Team1", 45, "correct answer")
              .Answer("Team2", null)
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(2, input[0].Score);
            Assert.Equal(0, input[1].Score);
        }

        [Fact]
        public void TwoTeams_OneOpenQuestionWithUniqueKnowledgeScoring_FirstInCorrectSecondCorrect_ShouldReturnFirstWithScore0SecondWithScore2()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringUniqueKnowledge(1)
              .Answer("Team1", 45, "incorrect answer")
              .Answer("Team2", 10, "correct answer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(2, input[1].Score);
        }

        [Fact]
        public void ThreeTeams_OneOpenQuestionWithUniqueKnowledgeScoring5_FirstInCorrectSecondCorrectThirdCorrectFourthIncorrect_ShouldReturnFirstWithScore0SecondWithScore15ThirdWithScore15()
        {
            // Arrange
            var input = new QuizRunStepAnswerBuilder()
              .Question("correct answer")
              .ScoringUniqueKnowledge(5)
              .Answer("Team1", 45, "incorrect answer")
              .Answer("Team2", 10, "correct answer")
              .Answer("Team3", 25, "correct answer")
              .Answer("Team4", 12, "incorrect answer")
              .Build();

            // Act
            Quizmeister.CalculateScore.Score(input);

            // Assert
            Assert.Equal(0, input[0].Score);
            Assert.Equal(10, input[1].Score);
            Assert.Equal(10, input[2].Score);
            Assert.Equal(0, input[3].Score);
        }

    }
}
