using Report.Web.Business;
using Xunit;

namespace Report.Test
{
    public class PgpHelperUnitTest
    {
        [Fact]
        public async void EncryptMessage()
        {
            var message = @"Test Testsson
Ett hemligt test meddelande.";

            var publicKey = Constants.Customers.ByEmail("test@test.se").PublicKey;

            IPgpHelper pgpHelper = new PgpHelper();
            var encryptedMessage = await pgpHelper.Encrypt(message, publicKey);

            Assert.NotEmpty(encryptedMessage);
        }
    }
}
