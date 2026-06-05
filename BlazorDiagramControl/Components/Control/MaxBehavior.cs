using BlazorDiagramControl.Components.Behavior;
using BlazorDiagramControl.Components.Classes;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.JSInterop;
using System.Reflection.Metadata.Ecma335;

namespace BlazorDiagramControl.Components.Controller
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
                Apply = (item) => { Items.Add(new MyBegin() { Name = "Begin", Description = "begin" ,ID = CreateID()}); },
                CanApply = (source) => CanRandomAdd(),
                Description = "Begin"
            };
            Templates.Add(beginTemplate);

            var procesTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MyProcces() { Name = "Proces", Description = "Proces", ID = CreateID() }); },
                CanApply = (source) => CanRandomAdd(),
                Description = "procces"
            };
            Templates.Add(procesTemplate);
            var choiceTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MyChoice() { Name = "Choice", Description = "Choice", ID = CreateID() }); },
                CanApply = (source) => CanRandomAdd(),
                Description = "Choice"
            };
            Templates.Add(choiceTemplate);
            var EndTemplate = new DiagramTemplate()
            {
                Apply = (item) => { Items.Add(new MyEnd() { Name = "End", Description = "End", ID = CreateID() }); },
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
            if (!(item is TestModels testModel))
            {
                return null;
            }
            if (item is MyBegin)
            {
                return new ItemDefinition(DiagramItemType.Begin)
                {
                    Content = testModel.Name,
                    Description = testModel.Description,
                };

            }
            else if (item is MyProcces)
            {
                return new ItemDefinition(DiagramItemType.Process)
                {
                    Content = testModel.Name,
                    Description = testModel.Description,
                };
            }
            else if (item is MyChoice)
            {
                return new ItemDefinition(DiagramItemType.Decision)
                {
                    Content = testModel.Name,
                    Description = testModel.Description,
                };
            }
            else if (item is MyEnd)
            {
                return new ItemDefinition(DiagramItemType.End)
                {
                    Content = testModel.Name,
                    Description = testModel.Description,
                };
            }
            else
            {
                return null;
            }
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
