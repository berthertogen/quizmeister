namespace Quizmeister.Data
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public Question Question { get; set; }
        public int Order { get; set; }
        public string Text { get; set; }
        public bool Correct { get; set; }
        public string SearchField { get; set; }
    }
}
