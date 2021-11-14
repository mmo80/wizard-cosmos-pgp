using System;

namespace Report.Web.Infrastructure
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string RouteName { get; set; }
        public string Email { get; set; }
        public string PublicKey { get; set; }

    }

    public class Sent
    {
        public Guid Id { get; set; }
        public DateTime DateTime { get; set; }
        public string Data { get; set; }
        public string Email { get; set; }
    }
}