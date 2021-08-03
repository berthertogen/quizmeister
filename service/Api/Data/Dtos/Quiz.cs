using System;
using System.Collections.Generic;

namespace Quizmeister.Data
{
    public class Quiz
    {
        public int QuizId { get; set; }
        public string ShortId { get; set; }
        public QuizStatus Status { get; set; }
        public ICollection<QuizRound> QuizzesRounds { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int MaxSubscriptions { get; set; }
        public string Remark { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string SearchField { get; set; }
    }
}
