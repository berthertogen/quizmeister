# Migrations

`dotnet ef migrations add *** --context QuizmeisterContext --output-dir ./Data/Migrations`
`dotnet run --project ./MigrationTool/MigrationTool.csproj`

# Api

`cd ./Api; dotnet run`
`cd ./Api; dotnet watch run`

`curl -X GET http://localhost:5003/quiz/search/1/1/ -v`
`curl -X GET http://localhost:5003/quiz/search/2/5/heppen -v`
`curl -X GET http://localhost:5003/quiz/1 -v`

* subscribe to quiz
`curl -d '{"quizId":1, "team":"Test team", "email": "test@test.test"}' -H "Content-Type: application/json" -X POST http://localhost:5003/subscription -v`

* join quiz
`curl -d '2' -H "Content-Type: application/json" -X PUT http://localhost:5003/subscription/110/status -v`

* answer question
`curl -d '{"subscriptionId":17, "quizId":1, "quizRunStepId": 1257, "answers": [ "test" ]}' -H "Content-Type: application/json" -X POST http://localhost:5003/answer -v`

# cleanup branchs

https://railsware.com/blog/git-housekeeping-tutorial-clean-up-outdated-branches-in-local-and-remote-repositories/

## Remove all merged local branches

`git branch --merged | grep -v \* | xargs git branch -D`

## Look at the not merges branches

`git branch --no-merged`
Delete if possible => `git branch -D ***branchName***`

## Prunes all stale references

See all stale references => `git branch -r`
Clean them => `git remote prune origin`
Clean & fetch => `git fetch -p`

# Formatting

dotnet tool install -g dotnet-format




DOTNETCORE|5.0