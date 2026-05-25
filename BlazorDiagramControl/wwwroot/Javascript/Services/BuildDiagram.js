import { createShape } from "../Factories/ShapeFactory.js"
import { createLine } from "../Factories/LineFactory.js"

//Misschien andere naam want vind het zelf onduidelijk
export function DiagramBuilder(components) {

    const diagram = {
        Shapes: new Map(),
        Lines: new Map()
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
export function DiagramRenderer(){
    
}
export function renderShape(shape){
    const el = createShape(shape);
    document.getElementById("shapes-layer").appendChild(el);
}
export function renderLine(line){
    const el = createLine(line);
    document.getElementById("lines-layer").appendChild(el);
}