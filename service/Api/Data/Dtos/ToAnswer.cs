namespace Quizmeister.Data
{
    public static class ToAnswerExtensions
    {
        public static Answer ToDto(this AnswerCreateInput input, int order)
        {
            return new Answer
            {
                AnswerId = input.AnswerId ?? default(int),
                Correct = input.Correct,
                Text = input.Text,
                Order = order,
                SearchField = $"{input.Correct}{input.Text}".ToLowerInvariant()
            };
        }

        public static Quizmeister.Answer ToAnswer(this Answer input)
        {
            return new Quizmeister.Answer
            {
                AnswerId = input.AnswerId,
                Text = input.Text,
                Correct = input.Correct,
                SearchField = input.SearchField,
            };
        }
    }
}
