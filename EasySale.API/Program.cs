using EasySale.API.Filters;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Caixa.Abrir;
using EasySale.API.UseCases.Caixa.Fechar;
using EasySale.API.UseCases.Caixa.GetAll;
using EasySale.API.UseCases.Caixa.GetById;
using EasySale.API.UseCases.Caixa.ListarAbertos;
using EasySale.API.UseCases.Caixa.ListarDisponiveis;
using EasySale.API.UseCases.Caixa.Register;
using EasySale.API.UseCases.Caixa.Sair;
using EasySale.API.UseCases.Caixa.Selecionar;
using EasySale.API.UseCases.Cliente.GetById;
using EasySale.API.UseCases.Cliente.Update;
using EasySale.API.UseCases.Cliente.Delete;
using EasySale.API.UseCases.Cliente.GetAll;
using EasySale.API.UseCases.Cliente.Register;
using EasySale.API.UseCases.Produto.Delete;
using EasySale.API.UseCases.Produto.GetAll;
using EasySale.API.UseCases.Produto.Register;
using EasySale.API.UseCases.Venda.AdicionarItem;
using EasySale.API.UseCases.Venda.CriarVenda;
using EasySale.API.UseCases.Venda.FinalizarVenda;
using EasySale.API.UseCases.Venda.ListarVendas;
using EasySale.API.UseCases.Venda.ObterVenda;
using EasySale.API.UseCases.Venda.RemoverItem;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMvc(option => option.Filters.Add(typeof(ExceptionFilter)));

builder.Services.AddDbContext<EasySaleDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Host=localhost;Port=5432;Database=EasySale;Username=postgres;Password=postgres";
    options.UseNpgsql(connectionString);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
       policy =>
       {
           policy.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader();
       });
});

builder.Services.AddScoped<GetAllClientesUseCase>();
builder.Services.AddScoped<GetClienteByIdUseCase>();
builder.Services.AddScoped<RegisterClienteUseCase>();
builder.Services.AddScoped<UpdateClienteUseCase>();
builder.Services.AddScoped<DeleteClienteUseCase>();

builder.Services.AddScoped<GetAllProdutosUseCase>();
builder.Services.AddScoped<RegisterProdutoUseCase>();
builder.Services.AddScoped<DeleteProdutoUseCase>();

builder.Services.AddScoped<GetAllCaixasUseCase>();
builder.Services.AddScoped<GetCaixaByIdUseCase>();
builder.Services.AddScoped<RegisterCaixaUseCase>();
builder.Services.AddScoped<AbrirCaixaUseCase>();
builder.Services.AddScoped<FecharCaixaUseCase>();
builder.Services.AddScoped<SairCaixaUseCase>();
builder.Services.AddScoped<SelecionarCaixaUseCase>();
builder.Services.AddScoped<ListarCaixasAbertosUseCase>();
builder.Services.AddScoped<ListarCaixasDisponiveisUseCase>();

builder.Services.AddScoped<CriarVendaUseCase>();
builder.Services.AddScoped<AdicionarItemVendaUseCase>();
builder.Services.AddScoped<ObterVendaUseCase>();
builder.Services.AddScoped<RemoverItemVendaUseCase>();
builder.Services.AddScoped<FinalizarVendaUseCase>();
builder.Services.AddScoped<ListarVendasUseCase>();

var app = builder.Build();

try
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<EasySaleDbContext>();
    dbContext.Database.EnsureCreated();
}
catch (Exception ex)
{
    Console.WriteLine($"Erro ao criar banco de dados: {ex.Message}");
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();
app.MapControllers();
app.Run();


