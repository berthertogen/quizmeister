using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly QuizRepository quizzes;
        private readonly IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub;

        public QuizController(QuizRepository quizzes, IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub)
        {
            this.quizzes = quizzes;
            this.quizmeisterHub = quizmeisterHub;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            return Ok(await quizzes.Get(id));
        }

        [HttpGet]
        [Route("short/{shortId}")]
        public async Task<ActionResult> GetShort(string shortId)
        {
            return Ok(await quizzes.Get(shortId));
        }

        [HttpGet]
        [Route("search/{offset}/{limit}/{term?}")]
        public async Task<ActionResult> Get(int offset, int limit, string term = null)
        {
            return Ok(await quizzes.GetFilteredAndPaged(term, (offset, limit), null, false));
        }

        [HttpGet]
        [Route("open/{offset}/{limit}/{term?}")]
        public async Task<ActionResult> GetOpen(int offset, int limit, string term = null)
        {
            return Ok(await quizzes.GetFilteredAndPaged(term, (offset, limit), QuizStatus.Open, true));
        }

        [HttpPost]
        public async Task<ActionResult> Create(QuizCreateInput input)
        {
            return Ok(await quizzes.Add(input));
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, QuizCreateInput input)
        {
            return Ok(await quizzes.Update(id, input));
        }

        [HttpPut]
        [Route("{id}/status/{status}")]
        public async Task<ActionResult> UpdateStatus(int id, QuizStatus status)
        {
            var quiz = await quizzes.UpdateStatus(id, status);
            await QuizmeisterHub.NextQuizStatus(quizmeisterHub.Clients, quiz);
            return Ok(quiz.Quiz);
        }

        [HttpPut]
        [Route("{id}/copy")]
        public async Task<ActionResult> Copy(int id, [FromBody] int[] roundIds)
        {
            return Ok(await quizzes.Copy(id, roundIds));
        }

        [HttpDelete]
        [Route("{id}/{deleteRounds}")]
        public async Task<ActionResult> Delete(int id, bool deleteRounds)
        {
            return Ok(await quizzes.Delete(id, deleteRounds));
        }
    }
}
