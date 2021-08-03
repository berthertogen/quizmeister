namespace Quizmeister
{
    public class QuestionCreateInput
    {
        public string Title { get; set; }
        public string Remark { get; set; }
        public QuestionTypes Type { get; set; }
        public ScoringCreateInput Scoring { get; set; }
        public AnswerCreateInput[] Answers { get; set; }
    }
}
