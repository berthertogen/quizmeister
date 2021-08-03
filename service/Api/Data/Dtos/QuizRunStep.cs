using System;
using System.Collections.Generic;

namespace Quizmeister.Data
{
    public class QuizRunStep
    {
        public int QuizRunStepId { get; set; }
        public DateTime SendOn { get; set; }
        public QuizRunStepStatus Status { get; set; }
        public Quiz Quiz { get; set; }
        public Round Round { get; set; }
        public Question Question { get; set; }
        public ICollection<QuizRunStepAnswer> Answers { get; set; }
    }
}
