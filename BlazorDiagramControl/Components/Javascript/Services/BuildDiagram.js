import { createShape } from "../Factories/ShapeFactory.js"
import { createLine } from "../Factories/LineFactory.js"

//Misschien andere naam want vind het zelf onduidelijk
export function buildDiagram(components) {

    const diagram = {
        Shapes: new map(),
        Lines: new map()
    }

    for (const c in components) {
        if (c.diagramType === "Solid") {
            const shape = createShape(c) 
            diagram.Shapes.set(shape.id, shape)
        }
        if (c.diagramType === "Connection") {
            const line = createLine(c)
            diagram.Lines.set(line.id, line)
        }
    }

}