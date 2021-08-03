using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Quizmeister
{
    public class QuizStatusHandler
    {
        private static Dictionary<string, Func<Data.QuizmeisterContext, Data.Quiz, Task>> Handlers = new Dictionary<string, Func<Data.QuizmeisterContext, Data.Quiz, Task>> {
      { BuildKey(QuizStatus.Started, QuizStatus.Starting), async (context, quiz) => await StartedToStarting(context, quiz)  }
    };


        public async Task Handle(Data.QuizmeisterContext context, Data.Quiz from, QuizStatus to)
        {
            var key = BuildKey(from.Status, to);
            if (Handlers.TryGetValue(key, out var handler))
            {
                await handler.Invoke(context, from);
            }
        }

        private static async Task StartedToStarting(Data.QuizmeisterContext context, Data.Quiz from)
        {
            var quizRunSteps = await context.QuizRunSteps.Where(qrs => qrs.Quiz.QuizId == from.QuizId).ToListAsync();
            context.QuizRunSteps.RemoveRange(quizRunSteps);
        }

        private static string BuildKey(QuizStatus from, QuizStatus to)
        {
            return $"{from}-{to}";
        }
    }
}
