using shortid.Configuration;

namespace Quizmeister.Data
{
    public static class DefaultShortIdOptions
    {
        public static GenerationOptions Create()
            => new GenerationOptions { UseNumbers = true, UseSpecialCharacters = false, Length = 8 };
    }
}
