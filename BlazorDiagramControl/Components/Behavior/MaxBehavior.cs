using BlazorDiagramControl.Components.Classes;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.JSInterop;
using System.Reflection.Metadata.Ecma335;

namespace BlazorDiagramControl.Components.Behavior
{
    public class MaxBehavior : DiagramBehavior
    {
        protected Random random = new();
        protected Guid guid;
        private int IDCount = 0;
        readonly string prefix = "CS";


        public override void InitializeTemplates()
        {
            var beginTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataBegin() { Name = "Begin", Description = "begin", ID = CreateID() }); },
                CanApply = (source) => CanAddItem(),
                Description = "Begin"
            };
            Templates.Add(beginTemplate);

            var procesTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataProcess() { Name = "Proces", Description = "Proces", ID = CreateID() }); },
                CanApply = (source) => CanAddItem(),
                Description = "Proces"
            };
            Templates.Add(procesTemplate);
            var choiceTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataChoice() { Name = "Choice", Description = "Choice", ID = CreateID() }); },
                CanApply = (source) => CanAddItem(),
                Description = "Choice"
            };
            Templates.Add(choiceTemplate);
            var EndTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataEnd() { Name = "End", Description = "End", ID = CreateID() }); },
                CanApply = (source) => CanAddItem(),
                Description = "End"
            };
            Templates.Add(EndTemplate);


        }

        private string CreateID()
        {
            string newID = prefix + IDCount;
            IDCount++;
            return newID;
        }

        internal override ItemDefinition ItemDefinitionForItem(object item)
        {
            if (!(item is MaxDataModels maxDataModels))
            {
                return null;
            }
            if (item is MaxDataBegin)
            {
                return new ItemDefinition(DiagramItemType.Begin)
                {
                    Content = maxDataModels.Name,
                    Description = maxDataModels.Description,
                };

            }
            else if (item is MaxDataProcess)
            {
                return new ItemDefinition(DiagramItemType.Process)
                {
                    Content = maxDataModels.Name,
                    Description = maxDataModels.Description,
                };
            }
            else if (item is MaxDataChoice)
            {
                return new ItemDefinition(DiagramItemType.Decision)
                {
                    Content = maxDataModels.Name,
                    Description = maxDataModels.Description,
                };
            }
            else if (item is MaxDataEnd)
            {
                return new ItemDefinition(DiagramItemType.End)
                {
                    Content = maxDataModels.Name,
                    Description = maxDataModels.Description,
                };
            }
            else
            {
                return null;
            }
        }
        public override string IdForItemObject(object targetObject)
        {
            return ((MaxDataModels)targetObject).ID;
        }
        public override string IdForConnectionObject(object targetObject)
        {

            return ((MaxDataModels)targetObject).ID;
        }
        public override MaxDataModels? ItemObjectForId(string ID)
        {
            foreach (MaxDataModels item in Items)
            {
                if (item.ID == ID) return item;
            }
            return null;
        }

        public override object AnyObjectForId(string ID)
        {
            foreach (MaxDataModels item in Items)
            {
                if (item.ID == ID) return item;
            }
            foreach (DiagramConnection connection in Connections)
            {
                var castedResult = connection.Context as MaxDataModels;
                if (((MaxDataModels)connection.Context).ID == ID) return connection;
            }
            return null;
        }


        public override DiagramConnection? ConnectionObjectForId(string ID)
        {
            foreach (DiagramConnection connection in Connections)
            {
                var castedResult = connection.Context as MaxDataModels;
                if (((MaxDataModels)connection.Context).ID == ID) return connection;
            }
            return null;
        }

        public override bool CanAddItem()
        {
            return true;
        }

        public override bool CanDeleteItems(List<object> itemsToRemove)
        {
            return true;
        }
        public override void DeleteItems(List<object> itemsToRemove)
        {

        }

        internal override ConnectionDefinition ConnectionDefinitionForConnection(DiagramConnection connection)
        {
            return new ConnectionDefinition(connection.Source, connection.Target, BindingType.Binding);
        }

        public override bool CanConnect(object source, object targetObject)
        {
            return true;
        }

        public override void Connect(object source, object targetObject)
        {
            Connections.Add(new DiagramConnection(source, targetObject, new MaxDataLine() { Name = "Line", Description = "Line", ID = CreateID() } ));
        }


    }
}
