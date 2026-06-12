using BlazorDiagramControl.Components.Classes;
using System.Collections.ObjectModel;

namespace BlazorDiagramControl.Components.Behavior
{
    public abstract class DiagramBehavior
    {
        private List<DiagramTemplate> _template = new List<DiagramTemplate>();
        public List<DiagramTemplate> Templates
        {
            get { return _template; }
            set { _template = value; }
        }

        private ObservableCollection<Object> _items = new ObservableCollection<object>();
        public ObservableCollection<Object> Items
        {
            get { return _items; }
            set { _items = value; }
        }

        private ObservableCollection<DiagramConnection> _connections = new ObservableCollection<DiagramConnection>();
        public ObservableCollection<DiagramConnection> Connections
        {
            get { return _connections; }
            set { _connections = value; }
        }
        public abstract void InitializeTemplates();
        internal abstract ItemDefinition ItemDefinitionForItem(object item);
        internal abstract ConnectionDefinition ConnectionDefinitionForConnection(DiagramConnection connection);
        public abstract bool CanAddItem();
        public abstract void DeleteItems(List<object> items);
        public abstract bool CanDeleteItems(List<object> items);
        public abstract string IdForItemObject(object targetObject);
        public abstract string IdForConnectionObject(object targetObject);
        public abstract object? ItemObjectForId(string ID);
        public abstract object AnyObjectForId(string ID);
        public abstract object? ConnectionObjectForId(string ID);
        public abstract bool CanConnect(object source, object targetObject);
        public abstract void Connect(object source, object targetObject);
    }
}
