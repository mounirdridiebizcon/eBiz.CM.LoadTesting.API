var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var computerName = Environment.GetEnvironmentVariable("COMPUTERNAME");
app.MapGet("hello", () => $"Hello from {computerName}!");
app.Run();