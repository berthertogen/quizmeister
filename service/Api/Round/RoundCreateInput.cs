namespace Quizmeister
{
    public class RoundCreateInput
    {
        public string Title { get; set; }
        public string Theme { get; set; }
        public string Remark { get; set; }
        public int[] QuestionIds { get; set; }
    }
}
