using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<WeatherService>(new WeatherService());
var app = builder.Build();
app.MapGet("weather", (string city, WeatherService weatherService) => weatherService.GetWeatherForCurrentUser(city));
//app.MapGet("hello", () => "Hello World!");
//app.MapGet("machine", () => System.Environment.GetEnvironmentVariable("COMPUTERNAME"));
app.Run();

public class WeatherService
{
    public async Task<OpenWeatherResponse> GetWeatherForCurrentUser(string city)
    {
        using (var client = new HttpClient())
        {
            try
            {
                client.BaseAddress = new Uri("http://api.openweathermap.org");
                var response =
                    await client.GetAsync($"/data/2.5/weather?q={city}&appid=7926081dd77a9166824a281fa64ccef9&units=metric");
                response.EnsureSuccessStatusCode();
                var stringResult = await response.Content.ReadAsStringAsync();
                var weatherResult = JsonConvert.DeserializeObject<OpenWeatherResponse>(stringResult);
                return weatherResult;
            }
            catch (HttpRequestException httpRequestException)
            {
                throw new ApplicationException($"Error getting weather from OpenWeather: {httpRequestException.Message}");
            }
        }
    }
}

public class OpenWeatherResponse
{
    public string Name { get; set; }
    public IEnumerable<WeatherDescription> Weather { get; set; }
    public Main Main { get; set; }
}

public class WeatherDescription
{
    public string Main { get; set; }
    public string Description { get; set; }
}

public class Main
{
    public string Temp { get; set; }
}