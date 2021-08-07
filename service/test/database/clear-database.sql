delete dbo.Questions
delete dbo.Answers
delete dbo.Scorings

DBCC CHECKIDENT ('dbo.Questions', RESEED, 0);
DBCC CHECKIDENT ('dbo.Answers', RESEED, 0);
DBCC CHECKIDENT ('dbo.Scorings', RESEED, 0);