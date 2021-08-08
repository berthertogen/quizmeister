delete dbo.Subscriptions
delete dbo.Quizzes
delete dbo.QuizzesRounds
delete dbo.RoundsQuestions
delete dbo.Rounds
delete dbo.Questions
delete dbo.Answers
delete dbo.Scorings

-- Use sys.identity_columns to see if there was a last known identity value
-- for the Table. If there was one, the Table is not new and needs a reset
IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'Subscriptions' AND last_value IS NOT NULL) 
  DBCC CHECKIDENT ('dbo.Subscriptions', RESEED, 0);
IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'Quizzes' AND last_value IS NOT NULL) 
  DBCC CHECKIDENT ('dbo.Quizzes', RESEED, 0);
IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'Rounds' AND last_value IS NOT NULL) 
  DBCC CHECKIDENT ('dbo.Rounds', RESEED, 0);
IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'Questions' AND last_value IS NOT NULL) 
  DBCC CHECKIDENT ('dbo.Questions', RESEED, 0);
IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'Answers' AND last_value IS NOT NULL) 
  DBCC CHECKIDENT ('dbo.Answers', RESEED, 0);
IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'Scorings' AND last_value IS NOT NULL) 
  DBCC CHECKIDENT ('dbo.Scorings', RESEED, 0);