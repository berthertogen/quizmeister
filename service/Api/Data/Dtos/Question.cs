using System;
using System.Collections.Generic;

namespace Quizmeister.Data
{
    public class Question
    {
        public int QuestionId { get; set; }
        public string ShortId { get; set; }
        public ICollection<RoundQuestion> RoundsQuestions { get; set; }
        public ICollection<Answer> Answers { get; set; }
        public string Title { get; set; }
        public QuestionTypes Type { get; set; }
        public string Remark { get; set; }
        public DateTime ModifiedOn { get; set; }
        public Scoring Scoring { get; set; }
        public string SearchField { get; set; }
    }
}
