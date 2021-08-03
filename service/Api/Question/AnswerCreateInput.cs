namespace Quizmeister
{
    public class AnswerCreateInput
    {
        public int? AnswerId { get; set; }
        public string Text { get; set; }
        public bool Correct { get; set; }
    }
}
