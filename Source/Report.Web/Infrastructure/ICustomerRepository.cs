using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace Report.Web.Infrastructure
{
    public interface ICustomerRepository
    {
        Task Create(Customer customer);
        Task AddSent(Sent sent);
        Task<List<Customer>> GetAll();
        Task<ItemResponse<Customer>> Remove(string id);
    }
}