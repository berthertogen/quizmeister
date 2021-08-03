using System;
using System.Collections.Generic;

namespace Quizmeister
{
    public class Round
    {
        public int RoundId { get; set; }
        public string ShortId { get; set; }
        public List<Question> Questions { get; set; }
        public string Title { get; set; }
        public string Theme { get; set; }
        public string Remark { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string SearchField { get; set; }
    }
}
