using System.Threading.Tasks;

namespace Report.Web.Business
{
    public interface IPgpHelper
    {
        Task<string> Encrypt(string message, string publicKey);
        Task<string> Decrypt(string message, string privateKey, string passPhrase);
    }
}