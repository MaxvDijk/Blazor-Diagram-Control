using Microsoft.JSInterop;
using System.Reflection.Metadata.Ecma335;

namespace BlazorDiagramControl.Components.Controller
{
    public class MaxController : IController
    {
        protected Random random = new Random();
        protected Guid guid;

        [JSInvokable]
        public bool CanAddShape()
        {
            return Convert.ToBoolean(random.Next(2));

        }

        public string AddShape()
        {
            string shapeId = Guid.NewGuid().ToString();

            return shapeId;
            
        }

        public bool CanRemoveShape()
        {
            return Convert.ToBoolean(random.Next(2));
        }

    }
}
