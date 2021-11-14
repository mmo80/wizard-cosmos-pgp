using System.Threading.Tasks;

namespace Report.Web.Business
{
    public interface IMailHelper
    {
        Task SendEmail(string plainTextContent, string fromEmail, string toEmail, string name);
    }
}