namespace BlazorDiagramControl.Components.Classes
{
    public class DiagramConnection
    {
        public DiagramConnection(Object source, Object target)
        {
            Source = source;
            Target = target;
        }
        public DiagramConnection(Object source, Object target, Object context)
            : this(source, target)
        {
            Context = context;
        }

        public Object Source;
        public Object Target;
        public Object Context;
    }


    }
