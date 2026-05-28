using BlazorDiagramControl.Components.Model;
using Microsoft.JSInterop;

namespace BlazorDiagramControl.Components.Controller
{
    public class DiagramBehaviour
    {
        private readonly MaxController maxController;
        private readonly ToolController toolController;

        public DiagramBehaviour(MaxController maxController, ToolController toolController)
        {
            this.maxController = maxController;
            this.toolController = toolController;
        }
        [JSInvokable]
        public Payload ClickHandler(Payload payload)
        {
            return toolController.ToolHandler(payload);

        }
        public bool CanAddShape(int x, int y) 
        {
            return maxController.CanAddShape();
        }

    }
}
