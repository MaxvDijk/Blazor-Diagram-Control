#nullable disable

namespace BlazorDiagramControl.Components.Classes
{
    public delegate bool CanApplyTemplate(object source = null);
    public delegate void ApplyTemplate(object source = null);
    public class DiagramTemplate
    {
        private object _id;
        public object Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _description;
        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }
        public CanApplyTemplate CanApply { get; set; }
        internal bool DoCanApply(object source = null)
        {
            bool result = false;
            if (CanApply != null)
            {
                return CanApply(source);
            }

            return result;
        }

        public ApplyTemplate Apply { get; set; }
        internal void DoApply(object source = null)
        {
            if (Apply != null)
            {
                Apply(source);
            }
        }
        public DiagramTemplate()
        {

        }
        public DiagramTemplate(object id, string description, ApplyTemplate apply, CanApplyTemplate canApply)
        {
            Id = id;
            Description = description;
            Apply = apply;
            CanApply = canApply;
        }

    }
}
