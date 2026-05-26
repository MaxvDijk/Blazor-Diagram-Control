namespace BlazorDiagramControl.Components.Controller
{
    public interface IController
    {
        bool CanAddShape();
        string? AddShape();
        bool CanRemoveShape();
    }
}
