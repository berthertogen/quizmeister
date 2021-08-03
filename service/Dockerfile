# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app/Api
COPY ./Api/*.csproj ./
RUN dotnet restore
COPY ./Api ./
RUN dotnet publish -c Release -o out

WORKDIR /app/MigrationTool
COPY ./MigrationTool/*.csproj ./
RUN dotnet restore
COPY ./MigrationTool ./
RUN  dotnet run

FROM mcr.microsoft.com/dotnet/aspnet:latest
WORKDIR /app
COPY --from=build /app/Api/out .
ENTRYPOINT ["dotnet", "QuizmeisterApi.dll"]
