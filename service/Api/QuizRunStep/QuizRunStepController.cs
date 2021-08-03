using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class QuizRunStepController : ControllerBase
    {
        private readonly QuizRunStepRepository steps;
        private readonly IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub;

        public QuizRunStepController(QuizRunStepRepository steps, IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub)
        {
            this.steps = steps;
            this.quizmeisterHub = quizmeisterHub;
        }

        [HttpGet]
        [Route("{quizId}/current")]
        public async Task<ActionResult<QuizRunStepEvent>> Current(int quizId)
        {
            return Ok(await steps.Current(quizId));
        }

        [HttpGet]
        [Route("{quizId}/next")]
        public async Task<ActionResult<QuizRunStepEvent>> Next(int quizId)
        {
            var nextStep = await steps.Next(quizId);
            if (nextStep.Status != MessageStatus.Error)
            {
                await QuizmeisterHub.NextQuizRunStep(quizmeisterHub.Clients, nextStep);
            }
            return Ok(nextStep);
        }
    }
}
