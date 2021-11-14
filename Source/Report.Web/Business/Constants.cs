using Report.Web.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Report.Web.Business
{
    public class Constants
    {
        public static string DatabaseId = "report-web-cosmos-db";
        public static Customers Customers = new Customers
        {
            CustomerList = new List<Customer>
            {
                new Customer
                {
                    Id = Guid.Parse("561e2220-93ba-4223-be18-8e0ab597d0ea"),
                    Name = "Customer John Doe",
                    RouteName = "johndoe",
                    Email = "test@test.se",
                    PublicKey = @"-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xo0EX72FPgEEAK24IDIetZvu3nUXhtQEh/JXifjIrCYLMMmMTj7fY8TxH0YwN3gc
ZLPIqwgQ1X5Fccz8qRYDcm4uTGVOzhkDMhYK8vqsJs0Ba/wvlKISpodMS/aEdR26
S7ck5OS/Sy0alx7zsGzNCLYjf7L2lZlBv9Njk2+HLu1WBvIzSTEjgkQ/ABEBAAHN
H01pZ3VlbCBNZW5kZXMgPG1tb184MEB5YWhvby5zZT7CrQQTAQoAFwUCX72FPgIb
LwMLCQcDFQoIAh4BAheAAAoJEG3gTncumbvf0aMD/Rhv3vaGLSoDaNa5HInEOI/H
s2QLX/KAAXeJ1td2PE1kpWp59An+vrHLYifS5iH+KQeUis3v0jiyq3qTJJxS01Km
pPDzcvalrC6346AEyw0oE+KNyFaEECSdboo2X0h5AOCNtQh4yViXn3auGtT2H3ZP
ifmSz9QXrGxi/ydXgrQ1zo0EX72FPgEEANXPbE0Qbm6otWa3Nb9ZDICB6U4+MUND
Qzk+Nt/Cz2yD0SXoBjvuH9k/eJ5jg8rX2IIg/wPVZm+a2bcRvwSXbrBpY2wKf7tD
EfUtlDvJ3DfCrh6DGIzfJ6GhXaqEXiJDvOlee6JcXOgMeYfnOGsgixOPWRolqVV2
rIKXUOtCXi+vABEBAAHCwIMEGAEKAA8FAl+9hT4FCQ8JnAACGy4AqAkQbeBOdy6Z
u9+dIAQZAQoABgUCX72FPgAKCRCVVhrPqtIREsLVA/9ulgD9KH13m3xVAlbm7q+8
8ylprRe4t09mF0ywh7SuXOtiBnI6svrvpGKP3nzks8+bgf+iLr9bL9A+vSqlv0qu
KQb5XrPZcDqlQ4HkRS5/4boVeR4/R9O4ryuAqvxhA3W4k6Tyggcuhe48BzSq7yA2
FHtn/ZTAjO4Esxc429yalCHfBACFNyRzrds1drvOcjp4L+s4vQJxA+bnPp2126ao
nh2sBkKO0bh0GgcLszMHl9d0p9Cg/ACmW25IBYY79FH9OcvvLY4DLJxGFQontcoW
ZHnzeWGL0ctLYL5iv0k9iDlxv9CSLO88zWIcp/oECkk6EPK2On+TlMdhD272mep0
HMG4Wc6NBF+9hT4BBAC1ariKTvX1lbRlBEfp0Wlc3QjleclBnOsWmGdt6p/Wo74m
bB0tMr6LCAFI1wstyGsOom4A2M0V2A/4qfMO1Gn5kIm/FsyRO8VXYMhYxP/gCcAN
YD23LveIbWCGSZGSOUJjB1To3/OIAUYOWtHAhYBKI70CvCYpFNI+CJx1gJdpsQAR
AQABwsCDBBgBCgAPBQJfvYU+BQkPCZwAAhsuAKgJEG3gTncumbvfnSAEGQEKAAYF
Al+9hT4ACgkQYQhmFvvzpsYQZQQAoA1+WK2+qkhUeUcrXMsEsLg5Xx8YZAnPsMDW
uE8aRH4SAtamZ2NhZJM6GaisAFI8RIW1Q0ZWqyU2jXRu6uYpYJh3c6JZlXuPyfr5
qkmpUjYJjuqLNc2eTfbw4G2NRc2alZJemJBL91w2xbBtvSV4K5nKYumF0KBnkLhZ
BmSAOxFmPwP9H6Ceyo2ZREHtlfM9rMzARQRawFLCOLx6kUI76xE3mSKmHF1xVGsQ
wxyRWn7zUoh0v1iIs/bpWNaB95B+FgjC/JW1o/lNrBB7/8KLYwWZYwcA3FzCRAY2
121yk1nAxE08UW1NrLnGHiQhCnH6saXWmUKXvZDYq76LCVfqpIl/6dc=
=fnLK
-----END PGP PUBLIC KEY BLOCK-----
"
    }
            }
        };
    }

    public class Customers
    {
        public IList<Customer> CustomerList { get; set; }

        public Customer ByEmail(string email)
        {
            return CustomerList?.SingleOrDefault(x => x.Email == email);
        }

        public Customer ByRouteName(string routeName)
        {
            return CustomerList?.SingleOrDefault(x => x.RouteName == routeName);
        }
    }
}
