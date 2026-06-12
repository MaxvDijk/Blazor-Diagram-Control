namespace BlazorDiagramControl.Components.Classes
{
    public class ConnectionDefinition
    {
        public ConnectionDefinition(Object source, Object target, BindingType bindingType)
        {
            Source = source;
            Target = target;
            BindingType = bindingType;
        }

        public ConnectionDefinition(Object source, Object target, BindingType bindingType, Object item)
            : this(source, target, bindingType)
        {
            Item = item;
        }

        public Object Source;
        public Object Target;
        public Object Item;
        public BindingType BindingType;

    }
}
