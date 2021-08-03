using Microsoft.AspNetCore.Mvc;

namespace Quizmeister
{

    [ApiController]
    [Route("[controller]")]
    public class HelloWorldController : ControllerBase
    {

        [HttpGet]
        public ActionResult Get(int id)
        {
            return Ok("Hello world");
        }
    }
}
