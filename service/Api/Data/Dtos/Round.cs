using System;
using System.Collections.Generic;

namespace Quizmeister.Data
{
    public class Round
    {
        public int RoundId { get; set; }
        public string ShortId { get; set; }
        public ICollection<QuizRound> QuizzesRounds { get; set; }
        public ICollection<RoundQuestion> RoundsQuestions { get; set; }
        public string Title { get; set; }
        public string Theme { get; set; }
        public string Remark { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string SearchField { get; set; }
    }
}
