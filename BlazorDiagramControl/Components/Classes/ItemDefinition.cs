namespace BlazorDiagramControl.Components.Classes
{
    public class ItemDefinition
    {
        public static readonly int[] beginColor = { 206, 206, 81 };
        public static readonly int[] processcolor = { 255, 189, 129 };
        public string Description;
        public string Content;
        public DiagramItemType ItemType;

        public int[] Color;
        public ItemDefinition(DiagramItemType diagramItemType)
        {
            ItemType = diagramItemType;
            SetDefaultProperties();
        }

        private void SetDefaultProperties()
        {
            switch (ItemType)
            {
                case DiagramItemType.Begin:
                    Color = beginColor;
                    break;
                case DiagramItemType.Process:
                case DiagramItemType.Decision:
                case DiagramItemType.Comment:
                case DiagramItemType.Variable:
                case DiagramItemType.Junction:
                case DiagramItemType.State:
                case DiagramItemType.Group:
                case DiagramItemType.SubContainer:
                case DiagramItemType.End:
                case DiagramItemType.ConnectionPoint:
                    Color = processcolor;
                    break;
            }
        }
    }
}