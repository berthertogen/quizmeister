namespace DatabaseSeeder
{
    public class Questions
    {
        public Question[] results { get; set; }
    }

    public class Question
    {
        public string category { get; set; }
        public string type { get; set; }
        public string question { get; set; }
        public string correct_answer { get; set; }
        public string[] incorrect_answers { get; set; }
    }
}
