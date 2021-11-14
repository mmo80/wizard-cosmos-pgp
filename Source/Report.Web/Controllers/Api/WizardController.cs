using Microsoft.AspNetCore.Mvc;
using Report.Web.Business;
using Report.Web.Infrastructure;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Web.Controllers.Api
{
    //[ValidateAntiForgeryToken]
    [Route("api/[controller]")]
    [ApiController]
    public class WizardController : ControllerBase
    {
        private IPgpHelper _pgpHelper;
        private IMailHelper _mailHelper;
        private ICustomerRepository _customerRepository;

        private string DefaultRoute = "johndoe";

        public WizardController(IPgpHelper pgpHelper, IMailHelper mailHelper, ICustomerRepository customerRepository)
        {
            _pgpHelper = pgpHelper;
            _mailHelper = mailHelper;
            _customerRepository = customerRepository;
        }

        [HttpGet("test")]
        public string GetThisWorks()
        {
            return "This Works!";
        }

        [HttpPost("save")]
        public async Task<IActionResult> PostQuestionnaireResult([FromBody] FormData data)
        {
            var builder = new StringBuilder();
            builder.AppendLine(data.Name);
            builder.AppendLine(data.Email);
            builder.AppendLine(data.Phone);
            builder.AppendLine(data.Alternative);
            builder.AppendLine(data.Alt2);
            builder.AppendLine(data.Alt1);
            builder.AppendLine(data.Connector);
            builder.AppendLine(data.Description);
            builder.AppendLine(data.Approve.ToString());
            var body = builder.ToString();

            // 1. PGP encrypt payload/message
            // 2. Send PGP encrypted message to customer mail
            // 3. Persist PGP encrypten message to db

            var customers = await _customerRepository.GetAll();
            var customer = customers.SingleOrDefault(x => x.RouteName == DefaultRoute);

            if (customer == null)
                return BadRequest();

            var publicKey = customer.PublicKey;
            var encryptedMessage = await _pgpHelper.Encrypt(body, publicKey);

            var fromEmail = "from@test.com";
            await _mailHelper.SendEmail(encryptedMessage, fromEmail, customer.Email, customer.Name);

            await _customerRepository.AddSent(new Sent
            {
                Email = customer.Email,
                DateTime = DateTime.Now,
                Data = encryptedMessage,
                Id = Guid.NewGuid()
            });

            return Ok("Success");
        }
    }

    public class FormData
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Alternative { get; set; }
        public string Alt2 { get; set; }
        public string Alt1 { get; set; }
        public string Connector { get; set; }
        public string Description { get; set; }
        public bool Approve { get; set; }
    }
}
