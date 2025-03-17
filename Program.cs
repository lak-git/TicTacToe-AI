using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic.Logging;
using Microsoft.Win32;
using System;
using TicTacToe_AI.Controller;
using TicTacToe_AI.Models;
using TicTacToe_AI.View;

namespace TicTacToe_AI
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            var serviceProvider = ConfigureServices();

            var mainScreen = serviceProvider.GetRequiredService<PlayerSelection>();
            Application.Run(mainScreen);
        }

        private static ServiceProvider ConfigureServices()
        {
            var services = new ServiceCollection();

            services.AddSingleton<GameController>();
            services.AddSingleton<PlayerController>();

            services.AddSingleton<GameLogic>();

            services.AddTransient<PlayerSelection>();
            services.AddTransient<Game>();

            return services.BuildServiceProvider();
        }
    }
}