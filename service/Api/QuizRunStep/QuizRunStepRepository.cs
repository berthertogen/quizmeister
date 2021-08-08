using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Quizmeister.Data;

namespace Quizmeister
{
    public class QuizRunStepRepository
    {
        private readonly QuizmeisterContext context;

        public QuizRunStepRepository(Data.QuizmeisterContext context)
        {
            this.context = context;
        }

        public async Task<QuizRunStepEvent> Current(int quizId)
        {
            var currentStep = await QuizRunSteps()
                    .Where(qrs => qrs.Quiz.QuizId == quizId)
                    .OrderByDescending(qrs => qrs.SendOn)
                    .Take(2)
                    .ToListAsync();

            List<string> answers = null;
            List<QuizRunScore> scores = null;
            if (currentStep != null && currentStep.Count > 0 && (currentStep[0].Status == QuizRunStepStatus.Answers || currentStep[0].Status == QuizRunStepStatus.Score))
            {
                answers = await context.RoundsQuestions
                            .Include(rq => rq.Question)
                            .ThenInclude(q => q.Answers)
                            .Include(rq => rq.Question)
                            .Where(rq => rq.RoundId == currentStep[0].Round.RoundId)
                            .Select(rq => rq.Question.Answers.First(a => a.Correct).Text)
                            .ToListAsync();
                if (currentStep[0].Status == QuizRunStepStatus.Score)
                {
                    scores = await Score(quizId, currentStep[0].Round.RoundId);
                }
            }

            return new QuizRunStepEvent
            {
                PreviousStep = currentStep.Count == 2 ? currentStep[1].ToQuizRunStepNew() : null,
                Step = currentStep.Count > 0 ? currentStep[0].ToQuizRunStepNew(answers, scores) : null,
                Status = MessageStatus.Success
            };
        }

        public async Task<QuizRunStepEvent> Next(int quizId)
        {
            var currentStep = (await Current(quizId))?.Step;
            if (currentStep == null)
            {
                return new QuizRunStepEvent
                {
                    Step = await New(quizId),
                    Status = MessageStatus.Success
                };
            }
            else
            {
                return new QuizRunStepEvent
                {
                    PreviousStep = currentStep,
                    Step = await OneStep(currentStep.QuizRunStepId),
                    Status = MessageStatus.Success
                };
            }

        }

        private async Task<QuizRunStepNew> OneStep(int quizRunStepId)
        {
            var runStep = await QuizRunSteps()
                    .SingleOrDefaultAsync(s => s.QuizRunStepId == quizRunStepId);

            var nextRound = await context.Rounds
              .Include(r => r.RoundsQuestions)
              .ThenInclude(rq => rq.Question)
              .ThenInclude(rq => rq.Scoring)
              .ThenInclude(rq => rq.Question)
              .ThenInclude(rq => rq.Answers)
              .SingleOrDefaultAsync(s => s.RoundId == runStep.Round.RoundId);
            Data.Question nextQuestion = null;
            if (runStep.Question != null)
            {
                var currentQuestionOrder = nextRound.RoundsQuestions.Single(rq => rq.QuestionId == runStep.Question.QuestionId).Order;
                nextQuestion = nextRound.RoundsQuestions.Where(rq => rq.Order > currentQuestionOrder).OrderBy(rq => rq.Order).FirstOrDefault()?.Question;
            }
            if (nextQuestion == null)
            {
                if (runStep.Status == QuizRunStepStatus.Question)
                {
                    var runStepNextAnswer = new Data.QuizRunStep
                    {
                        Round = runStep.Round,
                        Quiz = runStep.Quiz,
                        SendOn = DateTime.Now,
                        Status = QuizRunStepStatus.Answers,
                    };

                    var answers = await context.RoundsQuestions
                      .Include(rq => rq.Question)
                      .ThenInclude(q => q.Answers)
                      .Where(rq => rq.RoundId == runStep.Round.RoundId)
                      .Select(rq => rq.Question.Answers.First(a => a.Correct).Text)
                      .ToListAsync();

                    await context.QuizRunSteps.AddAsync(runStepNextAnswer);
                    await context.SaveChangesAsync();
                    return runStepNextAnswer.ToQuizRunStepNew(answers);
                }
                else if (runStep.Status == QuizRunStepStatus.Answers)
                {
                    var runStepNextScore = new Data.QuizRunStep
                    {
                        Round = runStep.Round,
                        Quiz = runStep.Quiz,
                        SendOn = DateTime.Now,
                        Status = QuizRunStepStatus.Score,
                    };
                    await context.QuizRunSteps.AddAsync(runStepNextScore);
                    await context.SaveChangesAsync();

                    var answers = await context.RoundsQuestions
                      .Include(rq => rq.Question)
                      .ThenInclude(q => q.Answers)
                      .Where(rq => rq.RoundId == runStep.Round.RoundId)
                      .Select(rq => rq.Question.Answers.First(a => a.Correct).Text)
                      .ToListAsync();

                    var scores = await Score(runStep.Quiz.QuizId, runStep.Round.RoundId);

                    return runStepNextScore.ToQuizRunStepNew(answers, scores);
                }
                else
                {
                    var quiz = await context.Quizzes
                      .Include(q => q.QuizzesRounds)
                      .ThenInclude(q => q.Round)
                      .ThenInclude(q => q.RoundsQuestions)
                      .ThenInclude(q => q.Question)
                      .ThenInclude(q => q.Scoring)
                      .ThenInclude(q => q.Question)
                      .ThenInclude(q => q.Answers)
                      .SingleOrDefaultAsync(q => q.QuizId == runStep.Quiz.QuizId);
                    var currentRoundOrder = quiz.QuizzesRounds.Single(qr => qr.RoundId == nextRound.RoundId).Order;
                    nextRound = quiz.QuizzesRounds.Where(qr => qr.Order > currentRoundOrder).OrderBy(qr => qr.Order).FirstOrDefault()?.Round;
                    if (nextRound != null)
                    {
                        nextQuestion = nextRound.RoundsQuestions.OrderBy(rq => rq.Order).FirstOrDefault().Question;
                    }
                }
            }

            if (nextRound == null || nextQuestion == null)
            {
                var runStepNextEnd = new Data.QuizRunStep
                {
                    Quiz = runStep.Quiz,
                    SendOn = DateTime.Now,
                    Status = QuizRunStepStatus.Ended
                };
                await context.QuizRunSteps.AddAsync(runStepNextEnd);
                await context.SaveChangesAsync();
                return runStepNextEnd.ToQuizRunStepNew();
            }

            var runStepNext = new Data.QuizRunStep
            {
                Quiz = runStep.Quiz,
                Round = nextRound,
                Question = nextQuestion,
                SendOn = DateTime.Now,
                Status = QuizRunStepStatus.Question
            };
            await context.QuizRunSteps.AddAsync(runStepNext);
            await context.SaveChangesAsync();
            return runStepNext.ToQuizRunStepNew();
        }

        private async Task<QuizRunStepNew> New(int quizId)
        {
            var quiz = await context.Quizzes
              .Include(q => q.QuizzesRounds)
              .ThenInclude(qr => qr.Round.RoundsQuestions)
              .ThenInclude(rq => rq.Question)
              .ThenInclude(rq => rq.Scoring)
              .ThenInclude(rq => rq.Question)
              .ThenInclude(rq => rq.Answers)
              .SingleOrDefaultAsync(q => q.QuizId == quizId);

            var round = quiz.QuizzesRounds.OrderBy(qr => qr.Order).First().Round;
            var question = round.RoundsQuestions.OrderBy(rq => rq.Order).First().Question;

            var runStep = new Data.QuizRunStep
            {
                Quiz = quiz,
                Round = round,
                Question = question,
                SendOn = DateTime.Now,
                Status = QuizRunStepStatus.Question
            };

            await context.QuizRunSteps.AddAsync(runStep);
            await context.SaveChangesAsync();

            return runStep.ToQuizRunStepNew();
        }

        private async Task<List<QuizRunScore>> Score(int quizId, int roundId)
        {
            // Quiz, rondes vragen en antwoorden ophalen
            var quiz = await context.Quizzes
              .Include(q => q.Subscriptions)
              .SingleOrDefaultAsync(q => q.QuizId == quizId);
            var quizRunSteps = await context.QuizRunSteps
              .Include(s => s.Quiz)
              .ThenInclude(q => q.Subscriptions)
              .Include(qrs => qrs.Answers)
              .Include(qrs => qrs.Round)
              .Include(qrs => qrs.Question)
              .ThenInclude(q => q.Answers)
              .Include(qrs => qrs.Question)
              .ThenInclude(q => q.Scoring)
              .Include(qrs => qrs.Question)
              .ThenInclude(q => q.RoundsQuestions)
              .Where(qrs => qrs.Quiz.QuizId == quizId)
              .ToListAsync();

            foreach (var step in quizRunSteps)
            {
                CalculateScore.Score(step.Answers);
                // Score opslaan
                await context.SaveChangesAsync();
            }

            // Resultaat bouwen en terug geven
            var result = new List<QuizRunScore>();

            foreach (var subscription in quiz.Subscriptions)
            {
                var scoreRound = new QuizRunScore
                {
                    Subscription = subscription.ToSubscription(),
                    Total = quizRunSteps.SelectMany(qrs => qrs.Answers.Where(a => a.SubscriptionId == subscription.SubscriptionId)).Sum(a => a?.Score ?? 0)
                };
                result.Add(scoreRound);
            }
            return result.OrderByDescending(r => r.Total).ThenBy(r => r.Subscription.Team).ToList();
        }

        private IIncludableQueryable<Data.QuizRunStep, Data.Round> QuizRunSteps()
        {
            return context.QuizRunSteps
              .Include(q => q.Answers)
              .ThenInclude(a => a.Subscription)
              .Include(q => q.Quiz)
              .Include(q => q.Question)
              .ThenInclude(q => q.Scoring)
              .Include(q => q.Question)
              .ThenInclude(q => q.Answers)
              .Include(q => q.Question)
              .ThenInclude(q => q.RoundsQuestions)
              .ThenInclude(q => q.Round)
              .Include(q => q.Round);
        }
    }
}
