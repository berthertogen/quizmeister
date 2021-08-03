using Xunit;

namespace QuizmeisterApi.Tests
{
    public class CalculateScoreRoundToMultipleTests
    {

        /***
         * N => number
         * I => interval
         * ***/

        [Fact]
        public void N9_I10_ShouldReturn0()
        {
            // Arrange
            // Act
            var result = Quizmeister.CalculateScore.RoundToMultiple(9, 10);

            // Assert
            Assert.Equal(0, result);
        }

        [Fact]
        public void N13_I10_ShouldReturn0()
        {
            // Arrange
            // Act
            var result = Quizmeister.CalculateScore.RoundToMultiple(13, 10);

            // Assert
            Assert.Equal(10, result);
        }

        [Fact]
        public void N25_I10_ShouldReturn0()
        {
            // Arrange
            // Act
            var result = Quizmeister.CalculateScore.RoundToMultiple(25, 10);

            // Assert
            Assert.Equal(20, result);
        }

        [Fact]
        public void N45_I10_ShouldReturn0()
        {
            // Arrange
            // Act
            var result = Quizmeister.CalculateScore.RoundToMultiple(45, 10);

            // Assert
            Assert.Equal(40, result);
        }

        [Fact]
        public void N23_I5_ShouldReturn0()
        {
            // Arrange
            // Act
            var result = Quizmeister.CalculateScore.RoundToMultiple(23, 5);

            // Assert
            Assert.Equal(20, result);
        }


        [Fact]
        public void N1_I5_ShouldReturn0()
        {
            // Arrange
            // Act
            var result = Quizmeister.CalculateScore.RoundToMultiple(1, 5);

            // Assert
            Assert.Equal(0, result);
        }
    }
}
