using BlazorDiagramControl.Components.Model;
using System.Drawing;

namespace BlazorDiagramControl.Components.Controller
{
    public class ToolController(MaxController maxController)
    {
        
        public Payload ToolHandler(Payload payload)
        {
            Console.WriteLine("Tool from c#"  + payload.Tool);
            switch (payload.Tool)
            {
                case "none":
                    payload.Validation = false;
                    return payload;
                case "Process":
                case "State":
                case "Decision":
                    if (maxController.CanAddShape())
                    {
                        payload.Id = maxController.AddShape();
                        payload.Validation = true;
                    }
                    else
                    {
                        payload.Validation = false;
                    }
                    return payload;
                case "line":
                    payload.Validation = true;
                    return payload;
                case "remove":
                    if(maxController.CanRemoveShape())
                    {
                        payload.Validation = true;
                    }
                    else
                    {
                        payload.Validation = false;
                    }
                    return payload;
                default:
                    payload.Validation = false;
                    return payload;
            }
        }

    }
}
