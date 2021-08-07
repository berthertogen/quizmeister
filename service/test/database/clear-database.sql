delete dbo.Quizzes
delete dbo.QuizzesRounds
delete dbo.RoundsQuestions
delete dbo.Rounds
delete dbo.Questions
delete dbo.Answers
delete dbo.Scorings

DBCC CHECKIDENT ('dbo.Quizzes', RESEED, 0);
DBCC CHECKIDENT ('dbo.Rounds', RESEED, 0);
DBCC CHECKIDENT ('dbo.Questions', RESEED, 0);
DBCC CHECKIDENT ('dbo.Answers', RESEED, 0);
DBCC CHECKIDENT ('dbo.Scorings', RESEED, 0);