using Ad_Server_API.Controllers;
using Ad_Server_API.Models;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.ModelBuilder;

var builder = WebApplication.CreateBuilder(args);

// Register IHttpContextAccessor
//builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Configure database connection
try
{
    builder.Services.AddDbContext<AdServerDbContext>(options =>
    options.UseSqlServer(builder.Configuration
    .GetConnectionString("AdServerDb")));

}
catch (Exception e)
{
    Console.Write(e);
}

var modelBuilder = new ODataConventionModelBuilder();


modelBuilder.EntitySet<Advertiser>("Advertiser");


modelBuilder.EntitySet<Advert>("Advert");

modelBuilder.EntityType<Advert>()
    .Collection
    .Function(nameof(AdvertController.AdvertByAdvertiser))
    .ReturnsCollectionFromEntitySet<Advert>("Advert")
    .Parameter<int>("AdvertiserId");

modelBuilder.EntitySet<Publisher>("Publisher");

var edmModel = modelBuilder.GetEdmModel();

// Register OData service with support for batch requests.
builder.Services.AddControllers().AddOData(
    options => options.AddRouteComponents("odata", edmModel)
    .EnableQueryFeatures().Filter().Expand().Select()
    .OrderBy().SetMaxTop(null).Count());

builder.Services.AddCors(options =>
options.AddPolicy("AllowSpecificOrigin",
builder =>
{
    builder.WithOrigins("http://localhost:4200")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
}));


var app = builder.Build();

// Enable OData batching middleware
app.UseODataBatching();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();
