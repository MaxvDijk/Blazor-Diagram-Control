/*using BlazorDiagramControl.Components.Controller;
using BlazorDiagramControl.Components.Model;
using Microsoft.JSInterop;

namespace BlazorDiagramControl.Components.Behavior
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
        [JSInvokable("ClickHandler")]
        public Payload ClickHandler(Payload payload)
        {
            return toolController.ToolHandler(payload);

        }
        public bool CanAddShape() 
        {
            return maxController.CanAddShape();
        }

    }
}
*/