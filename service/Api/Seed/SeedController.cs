using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly QuizRepository quizzes;
        private readonly RoundRepository rounds;
        private readonly QuestionRepository questions;

        public SeedController(QuizRepository quizzes, RoundRepository rounds, QuestionRepository questions)
        {
            this.quizzes = quizzes;
            this.rounds = rounds;
            this.questions = questions;
        }

        [HttpPost]
        public async Task<ActionResult> Seed()
        {
            var wieIsMijnVader = await this.questions.Add(new QuestionCreateInput
            {
                Title = "Wie is mijn vader",
                Answers = new[] {
              new AnswerCreateInput{ Text = "Joske", Correct = false },
              new AnswerCreateInput{ Text = "Jefke", Correct = false },
              new AnswerCreateInput{ Text = "Jeanke", Correct = false },
              new AnswerCreateInput{ Text = "Leo", Correct = true },
            },
                Remark = "Beste vader ever :)",
                Type = QuestionTypes.MultipleChoise,
                Scoring = new ScoringCreateInput
                {
                    Type = ScoringTypes.CorrectAnswer,
                    WeightCorrectAnswer = 1,
                    WeightNoAnswer = 0
                }
            });
            var wieIsMijnMoeder = await this.questions.Add(new QuestionCreateInput
            {
                Title = "Wie is mijn moeder",
                Answers = new[] {
              new AnswerCreateInput{ Text = "Josefien", Correct = false },
              new AnswerCreateInput{ Text = "Janinne", Correct = false },
              new AnswerCreateInput{ Text = "Julie", Correct = false },
              new AnswerCreateInput{ Text = "Marie-jeanne", Correct = true },
            },
                Remark = "Beste moeder ever :)",
                Type = QuestionTypes.MultipleChoise,
                Scoring = new ScoringCreateInput
                {
                    Type = ScoringTypes.CorrectAnswer,
                    WeightCorrectAnswer = 1,
                    WeightNoAnswer = 0
                }
            });
            var wieIsMijnOudsteZus = await this.questions.Add(new QuestionCreateInput
            {
                Title = "Wie is mijn oudste zus",
                Answers = new[] {
              new AnswerCreateInput{ Text = "Tiene", Correct = true },
            },
                Remark = "1 van de beste zussen ever :)",
                Type = QuestionTypes.Open,
                Scoring = new ScoringCreateInput
                {
                    Type = ScoringTypes.TimeToComplete,
                    WeightCorrectAnswer = 1,
                    WeightNoAnswer = 0,
                    TimeLimitSeconds = 6,
                    TimeScoringInterval = 1
                }
            });
            var wieIsMijnJongsteZus = await this.questions.Add(new QuestionCreateInput
            {
                Title = "Wie is mijn jongste zus",
                Answers = new[] {
              new AnswerCreateInput{ Text = "Joke", Correct = true },
            },
                Remark = "1 van de beste zussen ever :)",
                Type = QuestionTypes.Open,
                Scoring = new ScoringCreateInput
                {
                    Type = ScoringTypes.TimeToComplete,
                    WeightCorrectAnswer = 1,
                    WeightNoAnswer = 0,
                    TimeLimitSeconds = 6,
                    TimeScoringInterval = 1
                }
            });
            var wieIsMijnLiefsteZus = await this.questions.Add(new QuestionCreateInput
            {
                Title = "Wie is mijn liefste zus",
                Answers = new[] {
              new AnswerCreateInput{ Text = "Lieve", Correct = true },
            },
                Remark = "1 van de beste zussen ever :)",
                Type = QuestionTypes.Open,
                Scoring = new ScoringCreateInput
                {
                    Type = ScoringTypes.UniqueKnowledge,
                    WeightCorrectAnswer = 1,
                    WeightNoAnswer = 0,
                }
            });
            var ouders = await this.rounds.Add(new RoundCreateInput
            {
                Title = "Mijn ouders",
                Remark = "Beste ouders ever :)",
                Theme = "Familie",
                QuestionIds = new[] { wieIsMijnVader.QuestionId, wieIsMijnMoeder.QuestionId }
            });
            var zussen = await this.rounds.Add(new RoundCreateInput
            {
                Title = "Mijn zussen",
                Remark = "Beste zussen ever :)",
                Theme = "Zussen",
                QuestionIds = new[] { wieIsMijnOudsteZus.QuestionId, wieIsMijnJongsteZus.QuestionId, wieIsMijnLiefsteZus.QuestionId }
            });
            var familie = await this.quizzes.Add(new QuizCreateInput
            {
                Title = "De Hertogens",
                Remark = "Beste familie ever :)",
                Date = System.DateTime.Now,
                Location = "Heppen",
                MaxSubscriptions = 2,
                RoundIds = new[] { ouders.RoundId, zussen.RoundId }
            });
            return Ok(familie);
        }

        [HttpDelete]
        public async Task<ActionResult> Deseed()
        {
            var rounds = await this.rounds.GetFilteredAndPaged("Mijn", (0, 2));
            var quizzes = (await this.quizzes.GetFilteredAndPaged("De Hertogens", (0, 2), null, false));
            foreach (var round in rounds)
            {
                await this.rounds.Delete(round.RoundId, true);
            }
            foreach (var quiz in quizzes)
            {
                await this.quizzes.Delete(quiz.QuizId, false);
            }
            return Ok();
        }
    }
}
