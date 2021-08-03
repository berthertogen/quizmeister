using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quizmeister.Data;

namespace Quizmeister
{
    public class AnswerRepository
    {
        private readonly QuizmeisterContext context;

        public AnswerRepository(Data.QuizmeisterContext context)
        {
            this.context = context;
        }

        public async Task<AnswerEvent> Answer(AnswerQuestionInput input)
        {
            var answerDto = input.ToDto();
            context.QuizRunStepAnswers.Add(answerDto);
            await context.SaveChangesAsync();
            var answer = await context.QuizRunStepAnswers
              .Include(a => a.QuizRunStep)
              .ThenInclude(a => a.Quiz)
              .Include(a => a.QuizRunStep)
              .ThenInclude(a => a.Question)
              .Include(a => a.Subscription)
              .SingleAsync(a => a.QuizRunStepAnswerId == answerDto.QuizRunStepAnswerId);
            return new AnswerEvent
            {
                Answer = answer.ToAnswerStep(),
                Status = MessageStatus.Success
            };
        }

    }
}
