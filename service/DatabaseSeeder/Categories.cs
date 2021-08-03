namespace DatabaseSeeder
{
    public class Categories
    {
        public Category[] trivia_categories { get; set; }
    }

    public class Category
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
