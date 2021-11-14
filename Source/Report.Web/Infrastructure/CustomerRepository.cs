using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Extensions.Configuration;
using Report.Web.Business;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Report.Web.Infrastructure
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly Container _customerContainer;
        private readonly Container _sentContainer;

        public CustomerRepository(IConfiguration configuration)
        {
            var connectionString = configuration["ConnectionStrings:CosmosDb"];
            var client = new CosmosClientBuilder(connectionString)
                .WithSerializerOptions(new CosmosSerializationOptions
                {
                    PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
                })
                .Build();

            _customerContainer = client.GetContainer(Constants.DatabaseId, "Customer");
            _sentContainer = client.GetContainer(Constants.DatabaseId, "Sent");
        }

        public async Task Create(Customer customer)
        {
            await _customerContainer.CreateItemAsync(customer);
        }

        public async Task AddSent(Sent sent)
        {
            await _sentContainer.CreateItemAsync(sent);
        }

        public async Task<List<Customer>> GetAll()
        {
            var q = _customerContainer.GetItemLinqQueryable<Customer>();
            //var iterator = q.Where(p => p.Name == "Name").ToFeedIterator();
            var iterator = q.ToFeedIterator();
            var results = await iterator.ReadNextAsync();
            return results.ToList();
        }

        public async Task<ItemResponse<Customer>> Remove(string id)
        {
            return await _customerContainer.DeleteItemAsync<Customer>(id, new PartitionKey(id));
        }
    }
}
