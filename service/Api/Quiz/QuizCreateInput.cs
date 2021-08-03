using System;

namespace Quizmeister
{
    public class QuizCreateInput
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int MaxSubscriptions { get; set; }
        public string Remark { get; set; }
        public int[] RoundIds { get; set; }
    }
}
