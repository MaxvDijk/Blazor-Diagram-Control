namespace BlazorDiagramControl.Components.Model
{
    public class Payload
    {
        public required string Tool { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public string? Id { get; set; }
        public bool Validation { get; set; }

    }
}
