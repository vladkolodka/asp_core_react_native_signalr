using Microsoft.AspNetCore.Mvc;

namespace HelloSignalR.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Test()
        {
            return Json("test");
        }
    }
}