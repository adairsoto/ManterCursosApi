using System.Text.Json;
using ManterCursosAPI.Models;

namespace ManterCursosAPI.Data
{
    public class PresetContext
    {
        public static async Task PresetAsync(DataContext context, ILoggerFactory loggerFactory)
        {   
            try 
            {
                if (!context.CursoCategorias.Any())
                {
                    var categData = File.ReadAllText("../ManterCursosAPI/Data/Preset/categ.json");
                    var categ = JsonSerializer.Deserialize<List<CursoCategoria>>(categData);

                    foreach (var item in categ)
                    {
                        context.CursoCategorias.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                  if (!context.Statuses.Any())
                {
                    var statusData = File.ReadAllText("../ManterCursosAPI/Data/Preset/status.json");
                    var status = JsonSerializer.Deserialize<List<Status>>(statusData);

                    foreach (var item in status)
                    {
                        context.Statuses.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<PresetContext>();
                logger.LogError(ex.Message);
            }
        }
    }
}