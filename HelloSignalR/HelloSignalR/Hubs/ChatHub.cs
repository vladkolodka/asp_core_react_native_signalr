using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace HelloSignalR.Hubs
{
    public class ChatHub : Hub
    {
        private static Timer _broadcaster;

        private readonly IHubContext<ChatHub> _context;

        public ChatHub(IHubContext<ChatHub> context)
        {
            if (_broadcaster != null) return;

            _context = context;
            _broadcaster = new Timer(Tick, null, 0, 1000);
        }

        private void Tick(object state)
        {
            _context.Clients.All.InvokeAsync("Send", $"[Server] {DateTime.Now}");
        }

        public async Task Send(string message)
        {
            await Clients.All.InvokeAsync("Send", message);
        }
    }
}