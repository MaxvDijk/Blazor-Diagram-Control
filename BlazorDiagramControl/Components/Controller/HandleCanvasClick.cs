using Microsoft.JSInterop;

namespace BlazorDiagramControl.Components.Controller
{
    public class HandleCanvasClick
    {
        private static readonly MaxController maxController = new MaxController();

        [JSInvokable]
        public object CanvasClickHandeler(CanvasClickRequest request)
        {
            Console.WriteLine($"Tool: {request.Tool} at ({request.X}, {request.Y})");

            switch (request.Tool)
            {
                case "rect":
                case "circle":
                case "polygon":
                    {
                        bool canAdd = maxController.CanAddShape();

                        if (!canAdd)
                        {
                            return new
                            {
                                canPlace = false
                            };
                        }

                        var id = maxController.AddShape();

                        return new
                        {
                            canPlace = true,
                            id = id,
                            type = request.Tool,
                            x = request.X,
                            y = request.Y
                        };
                    }

                case "remove":
                    {
                        if (!string.IsNullOrEmpty(request.TargetId))
                        {
                            bool canRemove = maxController.CanRemoveShape();

                            return new { removed = true };
                        }

                        return new { removed = false };
                    }

                default:
                    return null;
            }
        }

    }
}
public class CanvasClickRequest
{
    public string Tool { get; set; } = "";
    public double X { get; set; }
    public double Y { get; set; }
    public string? TargetId { get; set; }
}