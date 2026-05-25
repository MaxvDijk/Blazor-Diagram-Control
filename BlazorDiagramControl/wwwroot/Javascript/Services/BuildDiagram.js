import { createShape } from "../Factories/ShapeFactory.js"
import { createLine } from "../Factories/LineFactory.js"
import { Diagram} from "../Models/Diagram.js"

//Misschien andere naam want vind het zelf onduidelijk
export function diagramBuilder(components) {

    const diagram = new Diagram();

    for (const c of components) {
        if (c.diagramType === "Solid") {
            const shape = createShape(c);
            if (!shape) continue;
            diagram.addShape(shape);
        }
        if (c.diagramType === "Connection") {
            const line = createLine(c);
            if (!line) continue;
            diagram.addLine(line);
        }
    }
    return diagram;
}
