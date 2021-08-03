
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Quizmeister
{
    public interface IQuizmeisterHubClient
    {
        Task NextQuizStatus(QuizEvent quizEvent);
        Task NextQuizRunStep(QuizRunStepEvent quizRunStepEvent);
        Task Answer(AnswerEvent answerEvent);
        Task Tick(TimerEvent timerEvent);
        Task DeleteSubscription(SubscriptionEvent subscription);
        Task UpdateSubscription(SubscriptionEvent subscription);
        Task NewSubscription(SubscriptionEvent subscription);
    }

    public class QuizmeisterHub : Hub<IQuizmeisterHubClient>
    {
        public async Task SubscribeToQuiz(int quizId)
        {
            await this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, $"Quiz{quizId}");
            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, $"Quiz{quizId}");
        }
        public async Task UnsubscribeFromQuiz(int quizId)
        {
            await this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, $"Quiz{quizId}");
        }

        public static async Task NextQuizStatus(IHubClients<IQuizmeisterHubClient> Clients, QuizEvent quizEvent)
        {
            await Clients.Group($"Quiz{quizEvent.Quiz.QuizId}").NextQuizStatus(quizEvent);
        }
        public async Task NextQuizStatus(QuizEvent quizEvent)
        {
            await NextQuizStatus(Clients, quizEvent);
        }

        public static async Task NextQuizRunStep(IHubClients<IQuizmeisterHubClient> Clients, QuizRunStepEvent quizRunStepEvent)
        {
            await Clients.Group($"Quiz{quizRunStepEvent.Step.Quiz.QuizId}").NextQuizRunStep(quizRunStepEvent);
        }
        public async Task NextQuizRunStep(QuizRunStepEvent quizRunStepEvent)
        {
            await NextQuizRunStep(Clients, quizRunStepEvent);
        }

        public static async Task Answer(IHubClients<IQuizmeisterHubClient> Clients, AnswerEvent answerEvent)
        {
            await Clients.Group($"Quiz{answerEvent.Answer.QuizId}").Answer(answerEvent);
        }
        public async Task Answer(AnswerEvent answerEvent)
        {
            await Answer(Clients, answerEvent);
        }

        public static async Task Tick(IHubClients<IQuizmeisterHubClient> Clients, TimerEvent timerEvent)
        {
            await Clients.Group($"Quiz{timerEvent.Step.QuizId}").Tick(timerEvent);
        }
        public async Task Tick(TimerEvent timerEvent)
        {
            await Tick(Clients, timerEvent);
        }

        public static async Task NewSubscription(IHubClients<IQuizmeisterHubClient> Clients, SubscriptionEvent subscription)
        {
            await Clients.Group($"Quiz{subscription.Subscription.Quiz.QuizId}").NewSubscription(subscription);
        }
        public async Task NewSubscription(SubscriptionEvent subscription)
        {
            await NewSubscription(Clients, subscription);
        }

        public static async Task UpdateSubscription(IHubClients<IQuizmeisterHubClient> Clients, SubscriptionEvent subscription)
        {
            await Clients.Group($"Quiz{subscription.Subscription.Quiz.QuizId}").UpdateSubscription(subscription);
        }
        public async Task UpdateSubscription(SubscriptionEvent subscription)
        {
            await UpdateSubscription(Clients, subscription);
        }

        public static async Task DeleteSubscription(IHubClients<IQuizmeisterHubClient> Clients, SubscriptionEvent subscription)
        {
            await Clients.Group($"Quiz{subscription.Subscription.Quiz.QuizId}").DeleteSubscription(subscription);
        }
        public async Task DeleteSubscription(SubscriptionEvent subscription)
        {
            await DeleteSubscription(Clients, subscription);
        }
    }
}
