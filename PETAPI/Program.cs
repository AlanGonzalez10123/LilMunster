builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowExtension", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// ... (other configuration)

app.UseCors("AllowExtension");