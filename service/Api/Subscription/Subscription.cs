using System;

namespace Quizmeister
{
    public class Subscription
    {
        public int SubscriptionId { get; set; }
        public string ShortId { get; set; }
        public SubscriptionStatus Status { get; set; }
        public string Team { get; set; }
        public string Email { get; set; }
        public string Remark { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string SearchField { get; set; }
        public Quiz Quiz { get; set; }

    }
}
