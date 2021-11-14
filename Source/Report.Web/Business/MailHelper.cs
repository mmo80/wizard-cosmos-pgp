using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Report.Web.Business
{
    public class MailHelper : IMailHelper
    {
        private readonly IConfiguration _configuration;

        public MailHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string GetApiKey()
        {
            var apiKey = _configuration["SendGridApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new ArgumentNullException("No Api-Key found in appSettings!");
            }
            return apiKey;
        }

        // Url: https://sendgrid.com/docs/for-developers/sending-email/v3-csharp-code-example/
        public async Task SendEmail(string plainTextContent, string fromEmail, string toEmail, string name)
        {
            var apiKey = GetApiKey();
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail);
            const string subject = "Web Report";
            var to = new EmailAddress(toEmail, name);
            //var plainTextContent = "and easy to do anywhere, even with C#";
            //var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = SendGrid.Helpers.Mail.MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, "");
            var response = await client.SendEmailAsync(msg);

            if (response.StatusCode != HttpStatusCode.Accepted && response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception($"Failed to send email. StatusCode:{response.StatusCode}, Message:{response.Body}");
            }
        }
    }
}
