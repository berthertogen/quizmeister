using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class AnswerController : ControllerBase
    {
        private readonly QuizRunStepRepository steps;
        private readonly AnswerRepository answers;
        private readonly IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub;

        public AnswerController(QuizRunStepRepository steps, AnswerRepository answers, IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub)
        {
            this.steps = steps;
            this.answers = answers;
            this.quizmeisterHub = quizmeisterHub;
        }

        [HttpPost]
        public async Task<ActionResult<AnswerEvent>> Answer(AnswerQuestionInput input)
        {
            var answer = await answers.Answer(input);
            if (answer.Status != MessageStatus.Error)
            {
                await QuizmeisterHub.NextQuizRunStep(quizmeisterHub.Clients, await steps.Current(input.QuizId));
            }
            return Ok(answer);
        }
    }
}
