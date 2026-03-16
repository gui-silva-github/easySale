using EasySale.API.Filters;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Caixa.Abrir;
using EasySale.API.UseCases.Caixa.Fechar;
using EasySale.API.UseCases.Caixa.GetAll;
using EasySale.API.UseCases.Caixa.GetById;
using EasySale.API.UseCases.Caixa.ListarAbertos;
using EasySale.API.UseCases.Caixa.ListarDisponiveis;
using EasySale.API.UseCases.Caixa.Register;
using EasySale.API.UseCases.Caixa.ObterAberturaAtual;
using EasySale.API.UseCases.Caixa.ConferenciaCegaGet;
using EasySale.API.UseCases.Caixa.ConferenciaCegaPost;
using EasySale.API.UseCases.Caixa.RegistrarMovimento;
using EasySale.API.UseCases.Caixa.Sair;
using EasySale.API.UseCases.Caixa.Selecionar;
using EasySale.API.UseCases.Cliente.GetById;
using EasySale.API.UseCases.Cliente.Update;
using EasySale.API.UseCases.Cliente.Delete;
using EasySale.API.UseCases.Cliente.GetAll;
using EasySale.API.UseCases.Cliente.Register;
using EasySale.API.UseCases.Produto.Delete;
using EasySale.API.UseCases.Produto.GetAll;
using EasySale.API.UseCases.Produto.GetById;
using EasySale.API.UseCases.Produto.Register;
using EasySale.API.UseCases.Produto.Update;
using EasySale.API.UseCases.Venda.AdicionarItem;
using EasySale.API.UseCases.Venda.AdicionarPagamento;
using EasySale.API.UseCases.Venda.AtualizarVenda;
using EasySale.API.UseCases.Venda.CriarVenda;
using EasySale.API.UseCases.Venda.FinalizarVenda;
using EasySale.API.UseCases.Venda.LimparPagamentos;
using EasySale.API.UseCases.Venda.ListarFormasPagamento;
using EasySale.API.UseCases.Venda.ListarVendas;
using EasySale.API.UseCases.Venda.ObterVenda;
using EasySale.API.UseCases.Venda.RemoverItem;
using EasySale.API.UseCases.Venda.RemoverVenda;
using EasySale.API.Entities.Vendas;
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
builder.Services.AddScoped<GetProdutoByIdUseCase>();
builder.Services.AddScoped<RegisterProdutoUseCase>();
builder.Services.AddScoped<UpdateProdutoUseCase>();
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
builder.Services.AddScoped<ObterAberturaAtualUseCase>();
builder.Services.AddScoped<ConferenciaCegaGetUseCase>();
builder.Services.AddScoped<ConferenciaCegaPostUseCase>();
builder.Services.AddScoped<RegistrarMovimentoCaixaUseCase>();

builder.Services.AddScoped<CriarVendaUseCase>();
builder.Services.AddScoped<AdicionarItemVendaUseCase>();
builder.Services.AddScoped<ObterVendaUseCase>();
builder.Services.AddScoped<RemoverItemVendaUseCase>();
builder.Services.AddScoped<FinalizarVendaUseCase>();
builder.Services.AddScoped<ListarVendasUseCase>();
builder.Services.AddScoped<AtualizarVendaUseCase>();
builder.Services.AddScoped<RemoverVendaUseCase>();
builder.Services.AddScoped<AdicionarPagamentoVendaUseCase>();
builder.Services.AddScoped<LimparPagamentosVendaUseCase>();
builder.Services.AddScoped<ListarFormasPagamentoUseCase>();

var app = builder.Build();

try
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<EasySaleDbContext>();
    dbContext.Database.EnsureCreated();
    if (!dbContext.FormasPagamento.Any())
    {
        dbContext.FormasPagamento.AddRange(
            new FormaPagamento { Descricao = "Dinheiro", PermiteTroco = true },
            new FormaPagamento { Descricao = "Cartão de Crédito", PermiteTroco = false },
            new FormaPagamento { Descricao = "Cartão de Débito", PermiteTroco = false },
            new FormaPagamento { Descricao = "PIX", PermiteTroco = false }
        );
        dbContext.SaveChanges();
    }
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


