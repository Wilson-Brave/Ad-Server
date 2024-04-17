using Ad_Server_API.Models;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.ModelBuilder;

var builder = WebApplication.CreateBuilder(args);

// Register IHttpContextAccessor
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

// Configure database connection
builder.Services.AddDbContext<AdServerDbContext>(options =>
    options.UseSqlServer("Server=localhost;Database=adServer;Trusted_Connection=True;TrustServerCertificate=True;"));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    }));

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseEndpoints(endpoints => endpoints.MapControllers());

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AdServerDbContext>();
    if (dbContext.Database.GetAppliedMigrations().Any())
    {
        // Tables exist, do nothing
        Console.WriteLine("Tables already exist. No action needed.");
    }
    else
    {
        // Tables do not exist, create them
        dbContext.Database.EnsureCreated();
        Console.WriteLine("Tables created successfully.");
    }
}

app.Run();