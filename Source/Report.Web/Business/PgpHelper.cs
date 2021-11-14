using System.IO;
using System.Text;
using System.Threading.Tasks;
using PgpCore;

namespace Report.Web.Business
{
    public class PgpHelper : IPgpHelper
    {
        public async Task<string> Encrypt(string message, string publicKey)
        {
            using var pgp = new PGP();
            await using var inputStream = GenerateStreamFromString(message);
            await using var publicKeyStream = GenerateStreamFromString(publicKey);
            await using var outputFileStream = new MemoryStream();
            await pgp.EncryptStreamAsync(inputStream, outputFileStream, publicKeyStream, true, true);
            return Encoding.UTF8.GetString(outputFileStream.ToArray());
        }

        public async Task<string> Decrypt(string message, string privateKey, string passPhrase)
        {
            using var pgp = new PGP();
            await using var inputStream = GenerateStreamFromString(message);
            await using var privateKeyStream = GenerateStreamFromString(privateKey);
            await using var outputFileStream = new MemoryStream();
            await pgp.DecryptStreamAsync(inputStream, outputFileStream, privateKeyStream, passPhrase);
            return Encoding.UTF8.GetString(outputFileStream.ToArray());
        }

        public static Stream GenerateStreamFromString(string s)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(s);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }
    }
}
