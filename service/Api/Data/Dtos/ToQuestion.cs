using System;
using System.Linq;
using ShortIdGenerator = shortid.ShortId;

namespace Quizmeister.Data
{
    public static class ToQuestionExtensions
    {
        public static Question ToDto(this QuestionCreateInput input)
        {
            var shortId = ShortIdGenerator.Generate(DefaultShortIdOptions.Create()).ToUpperInvariant();
            return new Question
            {
                Title = input.Title,
                Type = input.Type,
                Remark = input.Remark,
                ShortId = shortId,
                ModifiedOn = DateTime.Now,
                Scoring = input.Scoring.ToDto(),
                Answers = input.Answers.Select((answer, index) => answer.ToDto(index + 1)).ToList(),
                SearchField = $"{shortId}{input.Title}{input.Remark}".ToLowerInvariant(),
            };
        }
        public static Question ToDto(this QuestionCreateInput input, int id, Question questionDto)
        {
            questionDto.Title = input.Title;
            questionDto.Type = input.Type;
            questionDto.Remark = input.Remark;
            questionDto.ModifiedOn = DateTime.Now;
            questionDto.Scoring = input.Scoring.ToDto(questionDto.Scoring.ScoringId, questionDto.Scoring);
            questionDto.Answers.Clear();
            foreach (var answer in input.Answers)
            {
                questionDto.Answers.Add(answer.ToDto(Array.IndexOf(input.Answers, answer)));
            }
            questionDto.SearchField = $"{questionDto.ShortId}{input.Title}{input.Type}{input.Remark}".ToLowerInvariant();
            return questionDto;
        }

        public static Quizmeister.Question ToQuestion(this Question input)
        {
            return new Quizmeister.Question
            {
                QuestionId = input.QuestionId,
                ShortId = input.ShortId,
                Title = input.Title,
                Type = input.Type,
                Remark = input.Remark,
                SearchField = input.SearchField,
                ModifiedOn = input.ModifiedOn,
                Answers = input.Answers?.Select(answer => answer.ToAnswer()).ToList(),
                Rounds = input.RoundsQuestions?.OrderBy(r => r.Order).Select(rq => rq.Round.ToRound(false)).ToList(),
                Scoring = input.Scoring?.ToScoring()
            };
        }
    }
}
