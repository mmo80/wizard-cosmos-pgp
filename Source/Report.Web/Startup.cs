using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Report.Web.Business;
using Report.Web.Infrastructure;
using System.Collections.Generic;
using System.IO.Compression;

namespace Report.Web
{
    public class Startup
    {
        private const string MyAllowOrigins = "CorsPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Compression
            // url: https://gunnarpeipman.com/aspnet-core-compress-gzip-brotli-content-encoding/
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });
            services.Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });
            services.AddResponseCompression(options =>
            {
                IEnumerable<string> MimeTypes = new[]
                {
                    "text/plain",
                    "text/html",
                    "text/css",
                    "font/woff2",
                    "application/javascript",
                    "image/x-icon",
                    "image/png"
                };

                options.EnableForHttps = true;
                options.ExcludedMimeTypes = MimeTypes;
                options.Providers.Add<GzipCompressionProvider>();
                options.Providers.Add<BrotliCompressionProvider>();
            });

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowOrigins,
                    builder => builder.WithOrigins("https://localhost:5001")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddControllersWithViews();

            services.AddSingleton<ICustomerRepository, CustomerRepository>();
            services.AddSingleton<IPgpHelper, PgpHelper>();
            services.AddSingleton<IMailHelper, MailHelper>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseResponseCompression();
                app.UseStaticFiles();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();

                app.UseResponseCompression();

                app.UseStaticFiles(new StaticFileOptions
                {
                    OnPrepareResponse = content =>
                    {
                        if (content.File.Name.EndsWith(".js.gz"))
                        {
                            content.Context.Response.Headers["Content-Type"] = "application/javascript";
                            content.Context.Response.Headers["Content-Encoding"] = "gzip";
                        }
                        if (content.File.Name.EndsWith(".css.gz"))
                        {
                            content.Context.Response.Headers["Content-Type"] = "text/css";
                            content.Context.Response.Headers["Content-Encoding"] = "gzip";
                        }
                    }
                });

                app.UseRewriter(new RewriteOptions()
                    .AddRedirectToWwwPermanent()
                );

                app.UseHttpsRedirection();
            }

            app.UseRouting();

            app.UseCors(MyAllowOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
