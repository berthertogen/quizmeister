using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quizmeister.Data;

namespace Quizmeister
{
    public class SubscriptionRepository
    {
        private readonly QuizmeisterContext context;

        public SubscriptionRepository(Data.QuizmeisterContext context)
        {
            this.context = context;
        }

        internal async Task<SubscriptionEvent> Add(SubscriptionCreateInput input)
        {
            var quiz = await context.Quizzes
                .Include(q => q.Subscriptions)
                .SingleAsync(quiz => quiz.QuizId == input.QuizId);
            if (quiz.Status != QuizStatus.Open)
            {
                return new SubscriptionEvent
                {
                    Status = MessageStatus.Error,
                    Message = "De quiz staat niet open voor inschrijvingen"
                };
            }
            var existingSubscriptionCount = await context.Subscriptions
                      .Where(s => s.Quiz.QuizId == input.QuizId && (s.Email == input.Email || s.Team == input.Team))
                      .CountAsync();
            if (existingSubscriptionCount > 0)
            {
                return new SubscriptionEvent
                {
                    Status = MessageStatus.Error,
                    Message = "Je inschrijving is niet gelukt, er is al een inschrijving voor de quiz op het gegeven email/team"
                };
            }
            if (quiz.Subscriptions.Count <= quiz.MaxSubscriptions)
            {
                var subscription = input.ToDto(quiz, SubscriptionStatus.New);
                await context.Subscriptions.AddAsync(subscription);
                await context.SaveChangesAsync();
                return new SubscriptionEvent
                {
                    Subscription = (await context.Subscriptions
                    .Include(r => r.Quiz)
                    .SingleOrDefaultAsync(r => r.SubscriptionId == subscription.SubscriptionId))
                    .ToSubscription(),
                    Status = MessageStatus.Success,
                };
            }
            else
            {
                var subscription = input.ToDto(quiz, SubscriptionStatus.Queued);
                await context.Subscriptions.AddAsync(subscription);
                await context.SaveChangesAsync();
                return new SubscriptionEvent
                {
                    Subscription = (await context.Subscriptions
                    .Include(r => r.Quiz)
                    .SingleOrDefaultAsync(r => r.SubscriptionId == subscription.SubscriptionId))
                    .ToSubscription(),
                    Status = MessageStatus.Warning,
                    Message = "Het maximum aantal inschrijvingen is bereikt, je aanvraag staat in de wachtrij"
                };
            }
        }

        internal async Task<SubscriptionEvent> UpdateStatus(int subscriptionId, SubscriptionStatus status)
        {
            var subscription = this.context.Subscriptions
              .Include(s => s.Quiz)
              .SingleOrDefault(s => s.SubscriptionId == subscriptionId);
            var quiz = await context.Quizzes
              .Include(q => q.Subscriptions)
              .SingleAsync(quiz => quiz.QuizId == subscription.Quiz.QuizId);

            if (status == SubscriptionStatus.New && quiz.Status != QuizStatus.Starting)
            {
                return new SubscriptionEvent
                {
                    Status = MessageStatus.Error,
                    Message = "Je kan een inschrijving niet manueel op deze status zetten"
                };
            }
            if (status == SubscriptionStatus.Joined && quiz.Status != QuizStatus.Starting)
            {
                return new SubscriptionEvent
                {
                    Status = MessageStatus.Error,
                    Message = "Je kan je nog niet aanmelden, de quiz is nog niet gestart."
                };
            }
            if (status == SubscriptionStatus.Joined && subscription.Status == SubscriptionStatus.Queued)
            {
                return new SubscriptionEvent
                {
                    Status = MessageStatus.Error,
                    Message = "Je staat nog in de wachtrij en kan niet deelnemen aan de quiz"
                };
            }
            subscription.Status = status;
            subscription.ModifiedOn = DateTime.Now;
            context.Subscriptions.Update(subscription);
            await context.SaveChangesAsync();
            return new SubscriptionEvent
            {
                Subscription = (await context.Subscriptions
              .Include(r => r.Quiz)
              .SingleOrDefaultAsync(q => q.SubscriptionId == subscriptionId))
              .ToSubscription(),
                Status = MessageStatus.Success
            };
        }

        internal async Task<SubscriptionEvent> Delete(int subscriptionId)
        {
            var subscription = await context.Subscriptions
              .Include(r => r.Quiz)
              .SingleOrDefaultAsync(r => r.SubscriptionId == subscriptionId);
            if (subscription != null)
            {
                context.Subscriptions.Remove(subscription);
                if (subscription.Status == SubscriptionStatus.New)
                {
                    var nextInQueue = await context.Subscriptions
                      .Where(s => s.Quiz.QuizId == subscription.Quiz.QuizId && s.Status == SubscriptionStatus.Queued)
                      .OrderBy(s => s.ModifiedOn)
                      .FirstOrDefaultAsync();
                    if (nextInQueue != null)
                    {
                        nextInQueue.Status = SubscriptionStatus.New;
                        nextInQueue.ModifiedOn = DateTime.Now;
                    }
                }
                await context.SaveChangesAsync();
            }
            return new SubscriptionEvent
            {
                Subscription = subscription.ToSubscription(),
                Status = MessageStatus.Success
            };
        }

        internal async Task<IEnumerable<Subscription>> Get(string email)
        {
            return await this.context.Subscriptions
              .Include(s => s.Quiz)
              .Where(s => s.Email == email)
              .Select(s => s.ToSubscription())
              .ToListAsync();
        }

        internal async Task<IEnumerable<Subscription>> Get(int quizId)
        {
            return await this.context.Subscriptions
              .Include(s => s.Quiz)
              .Where(s => s.Quiz.QuizId == quizId)
              .Select(s => s.ToSubscription())
              .ToListAsync();
        }
    }
}
