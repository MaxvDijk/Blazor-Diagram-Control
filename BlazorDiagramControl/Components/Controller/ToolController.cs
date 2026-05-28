using BlazorDiagramControl.Components.Model;
using System.Drawing;

namespace BlazorDiagramControl.Components.Controller
{
    public class ToolController(MaxController maxController)
    {
        
        public Payload ToolHandler(Payload payload)
        {
            switch (payload.Tool)
            {
                case "none":
                    payload.Validation = false;
                    return payload;
                case "rectangle":
                case "circle":
                case "polygon":
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
                    payload.Validation = false;
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
