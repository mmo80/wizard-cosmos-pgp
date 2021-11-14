using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Extensions.Configuration;
using Report.Web.Business;
using Report.Web.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Report.Test
{
    public class CustomerRepositoryTest
    {
        private const string CosmosDbConnectionString = "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

        [Fact(Skip = "Generate a Test User")]
        public async Task CreateItem()
        {
            ICustomerRepository repo = new CustomerRepository(GetConfiguration());
            var customer = Constants.Customers.ByRouteName("johndoe");

            await repo.Create(customer);

            var list = await repo.GetAll();
            Assert.True(list.Any());
        }

        [Fact]
        public async Task GetAll()
        {
            ICustomerRepository repo = new CustomerRepository(GetConfiguration());
            var list = await repo.GetAll();

            Assert.True(list.Any());
        }

        [Fact(Skip = "Just to generate the database and containers")]
        public async Task GenerateContainers()
        {
            var client = new CosmosClientBuilder(CosmosDbConnectionString)
                .WithSerializerOptions(new CosmosSerializationOptions
                {
                    PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
                })
                .Build();

            var dbResponse = await client.CreateDatabaseIfNotExistsAsync(Constants.DatabaseId);

            await dbResponse.Database.CreateContainerIfNotExistsAsync("Customer", "/Id");
            await dbResponse.Database.CreateContainerIfNotExistsAsync("Sent", "/Id");
        }

        private IConfiguration GetConfiguration()
        {
            var inMemorySettings = new Dictionary<string, string> {
                {"ConnectionStrings:CosmosDb", CosmosDbConnectionString},
            };

            return new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();
        }
    }
}
