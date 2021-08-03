using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly QuestionRepository questions;

        public QuestionController(QuestionRepository questions)
        {
            this.questions = questions;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            return Ok(await questions.Get(id));
        }

        [HttpGet]
        [Route("search/{offset}/{limit}/{term?}")]
        public async Task<ActionResult> Get(int offset, int limit, string term = null)
        {
            return Ok(await questions.GetFilteredAndPaged(term, (offset, limit)));
        }

        [HttpPost]
        public async Task<ActionResult> Create(QuestionCreateInput input)
        {
            return Ok(await questions.Add(input));
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, QuestionCreateInput input)
        {
            return Ok(await questions.Update(id, input));
        }

        [HttpPut]
        [Route("{id}/copy")]
        public async Task<ActionResult> Copy(int id)
        {
            return Ok(await questions.Copy(id));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await questions.Delete(id));
        }
    }
}
