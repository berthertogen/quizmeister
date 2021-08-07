using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class RoundController : ControllerBase
    {
        private readonly RoundRepository rounds;

        public RoundController(RoundRepository rounds)
        {
            this.rounds = rounds;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetOne(int id)
        {
            return Ok(await rounds.GetOne(id));
        }

        [HttpGet]
        [Route("search/{quizId}")]
        public async Task<ActionResult> GetForQuiz(int quizId)
        {
            return Ok(await rounds.GetForQuiz(quizId));
        }

        [HttpGet]
        [Route("search/{offset}/{limit}/{term?}")]
        public async Task<ActionResult> Get(int offset, int limit, string term = null)
        {
            return Ok(await rounds.GetFilteredAndPaged(term, (offset, limit)));
        }

        [HttpGet]
        [Route("themes")]
        public async Task<ActionResult> Themes()
        {
            return Ok(await rounds.GetThemes());
        }

        [HttpPost]
        public async Task<ActionResult> Create(RoundCreateInput input)
        {
            return Ok(await rounds.Add(input));
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, RoundCreateInput input)
        {
            return Ok(await rounds.Update(id, input));
        }

        [HttpPut]
        [Route("{id}/copy")]
        public async Task<ActionResult> Copy(int id, [FromBody] int[] questionIds)
        {
            return Ok(await rounds.Copy(id, questionIds));
        }

        [HttpDelete]
        [Route("{id}/{deleteQuestions}")]
        public async Task<ActionResult> Delete(int id, bool deleteQuestions)
        {
            return Ok(await rounds.Delete(id, deleteQuestions));
        }
    }
}
