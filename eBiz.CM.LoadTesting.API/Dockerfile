FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["eBiz.CM.LoadTesting.API/eBiz.CM.LoadTesting.API.csproj", "eBiz.CM.LoadTesting.API/"]
RUN dotnet restore "eBiz.CM.LoadTesting.API/eBiz.CM.LoadTesting.API.csproj"
COPY . .
WORKDIR "/src/eBiz.CM.LoadTesting.API"
RUN dotnet build "eBiz.CM.LoadTesting.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "eBiz.CM.LoadTesting.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "eBiz.CM.LoadTesting.API.dll"]