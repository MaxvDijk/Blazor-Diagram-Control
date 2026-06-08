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

        private ObservableCollection<Object> _connections = new ObservableCollection<object>();
        public ObservableCollection<Object> Connections
        {
            get { return _connections; }
            set { _connections = value; }
        }
        public abstract void InitializeTemplates();
        internal abstract ItemDefinition ItemDefinitionForItem(object item);
        public abstract bool CanRemoveItem();
        public abstract string IdForObject(object targetObject);
    }
}
