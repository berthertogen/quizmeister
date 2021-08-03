namespace Quizmeister
{
    public class TimerStep
    {
        public int QuestionId { get; set; }
        public int QuizId { get; set; }
        public int Total { get; set; }
        public int Current { get; set; }
        public int Percentage { get; set; }
    }
}
