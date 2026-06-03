namespace BlazorDiagramControl.Components.Model
{
    public class Payload
    {
        public required string Tool { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string? Id { get; set; }
        public bool Validation { get; set; }

    }
}
