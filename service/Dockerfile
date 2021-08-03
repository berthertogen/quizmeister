# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app

COPY *.sln ./ 
COPY ./Api/*.csproj ./Api
COPY ./MigrationTool/*.csproj ./MigrationTool
RUN dotnet restore

COPY . .

WORKDIR /app/MigrationTool
RUN  dotnet run

WORKDIR /app/Api
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:latest
WORKDIR /app
COPY --from=build /app/Api/out .
ENTRYPOINT ["dotnet", "QuizmeisterApi.dll"]
