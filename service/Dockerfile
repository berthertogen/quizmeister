# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /migration

COPY ./MigrationTool/*.csproj ./
RUN dotnet restore
COPY ./MigrationTool ./
RUN dotnet run

WORKDIR /app
# Copy csproj and restore as distinct layers
COPY ./Api/*.csproj ./
RUN dotnet restore
# Copy everything else and build
COPY ./Api ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:latest
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "QuizmeisterApi.dll"]
