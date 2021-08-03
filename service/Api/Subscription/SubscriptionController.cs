using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Quizmeister
{
    [ApiController]
    [Route("[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly SubscriptionRepository subscriptions;
        private readonly IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub;

        public SubscriptionController(SubscriptionRepository subscriptions, IHubContext<QuizmeisterHub, IQuizmeisterHubClient> quizmeisterHub)
        {
            this.subscriptions = subscriptions;
            this.quizmeisterHub = quizmeisterHub;
        }

        [HttpPost]
        [Route("email")]
        public async Task<ActionResult> Get([FromBody] UserInput user)
        {
            return Ok(await subscriptions.Get(user.Email));
        }

        [HttpGet]
        [Route("{quizId}")]
        public async Task<ActionResult> Get(int quizId)
        {
            return Ok(await subscriptions.Get(quizId));
        }

        [HttpPost]
        public async Task<ActionResult> Create(SubscriptionCreateInput input)
        {
            var subscription = await subscriptions.Add(input);
            if (subscription.Status != MessageStatus.Error)
            {
                await QuizmeisterHub.NewSubscription(quizmeisterHub.Clients, subscription);
            }
            return Ok(subscription);
        }

        [HttpPut]
        [Route("{id}/status")]
        public async Task<ActionResult> Create(int id, [FromBody] SubscriptionStatus status)
        {
            var subscription = await subscriptions.UpdateStatus(id, status);
            if (subscription.Status != MessageStatus.Error)
            {
                await QuizmeisterHub.UpdateSubscription(quizmeisterHub.Clients, subscription);
            }
            return Ok(subscription);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var subscription = await subscriptions.Delete(id);
            if (subscription.Status != MessageStatus.Error)
            {
                await QuizmeisterHub.DeleteSubscription(quizmeisterHub.Clients, subscription);
            }
            return Ok(subscription);
        }
    }
}
