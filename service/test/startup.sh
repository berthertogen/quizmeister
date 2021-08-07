docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=wu4XiEf9D50X" \
   -p 1433:1433 --name quizmeistersql \
   -d mcr.microsoft.com/mssql/server:2019-latest
dotnet run --project ./MigrationTool/MigrationTool.csproj
dotnet run --project ./Api/QuizmeisterApi.csproj --launch-profile QuizmeisterApi
docker container rm quizmeistersql