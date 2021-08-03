using System;
using System.Collections.Generic;

namespace Quizmeister
{
    public class Question
    {
        public int QuestionId { get; set; }
        public string ShortId { get; set; }
        public List<Answer> Answers { get; set; }
        public string Title { get; set; }
        public QuestionTypes Type { get; set; }
        public string Remark { get; set; }
        public DateTime ModifiedOn { get; set; }
        public Scoring Scoring { get; set; }
        public string SearchField { get; set; }
        public List<Round> Rounds { get; set; }
    }
}
