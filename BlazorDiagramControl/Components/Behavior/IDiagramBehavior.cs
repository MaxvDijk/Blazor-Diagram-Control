using BlazorDiagramControl.Components.Classes;

namespace BlazorDiagramControl.Components.Behavior
{
    public interface IDiagramBehavior
    {
        bool CanAddShape();
        string? AddShape();
        bool CanRemoveShape();


        List<DiagramTemplate> Templates
        {
            get;
            set;
        }
    }
}

