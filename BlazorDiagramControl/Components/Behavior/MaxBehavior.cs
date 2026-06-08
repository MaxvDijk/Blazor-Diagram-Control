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
        string prefix = "CS";


        public override void InitializeTemplates()
        {
            var beginTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataBegin() { Name = "Begin", Description = "begin" ,ID = CreateID()}); },
                CanApply = (source) => CanRandomAdd(),
                Description = "Begin"
            };
            Templates.Add(beginTemplate);

            var procesTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataProcess() { Name = "Proces", Description = "Proces", ID = CreateID() }); },
                CanApply = (source) => CanRandomAdd(),
                Description = "Proces"
            };
            Templates.Add(procesTemplate);
            var choiceTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataChoice() { Name = "Choice", Description = "Choice", ID = CreateID() }); },
                CanApply = (source) => CanRandomAdd(),
                Description = "Choice"
            };
            Templates.Add(choiceTemplate);
            var EndTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MaxDataEnd() { Name = "End", Description = "End", ID = CreateID() }); },
                CanApply = (source) => CanRandomAdd(),
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
        public override string IdForObject(object targetObject)
        {
            return ((MaxDataModels)targetObject).ID;
        }

        public bool CanRandomAdd()
        {
            return true;
        //    return Convert.ToBoolean(random.Next(2));

        }

        public override bool CanRemoveItem()
        {
            return Convert.ToBoolean(random.Next(2));
        }

    }
}
