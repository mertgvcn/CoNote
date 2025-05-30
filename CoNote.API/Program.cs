using CoNote.API;
using CoNote.Data.Context;
using CoNote.Infrastructure.Middlewares;
using CoNote.SignalR.Hubs.WorksheetHub;

var builder = WebApplication.CreateBuilder(args);

//Environment
var env = builder.Environment;
builder.Configuration
    .SetBasePath(env.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddRegistrations(builder.Configuration);
builder.AddSwaggerGenWithAuth();
builder.ConfigureAuthentication();

//Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "CorsPolicy",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Enable CORS
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.AutoMigrateDatabase();

app.MapControllers();

app.MapHub<WorksheetHub>(WorksheetHub.HubURL);

app.Run();
