import { createShape } from "../Factories/ShapeFactory.js"
import { createLine } from "../Factories/LineFactory.js"
import { diagram, getSvgPoint } from "./Helpers.js"
import { initShape, initLine } from "../Services/initializer.js"

let svg = document.getElementById("diagram-svg");
//Misschien andere naam want vind het zelf onduidelijk
export function diagramBuilder(components) {

    diagram.shapes.clear();
    diagram.lines.clear();
    diagram.linesByShapeId.clear();

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

export function shapeBuilder(itemDef, x, y, id) {
    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }
    if (!x || !y) {
        const rect = svg.getBoundingClientRect();
        x = rect.left + 100;
        y = rect.top + 50;
    }
    let points = getSvgPoint(svg, x, y);

    let testObject = JSON.parse(itemDef)
    let c = {
        id: crypto.randomUUID(),
        type: GetShapeType(testObject.ItemType),
        left: null,
        top: null,
        x: points.x,
        y: points.y,
        description: testObject.Description,
        csObject: id,
        color: testObject.Color,
    }

    let newShape = createShape(c);
    initShape(newShape)
}

function GetShapeType(type) {
    switch (type) {
        case 0:
            return "Begin";
        case 1:
            return "Process";
        case 2:
            return "Decision";
        case 3:
            return "Comment";
        case 4:
            return "Variable";
        case 5:
            return "Junction";
        case 6:
            return "State";
        case 7:
            return "Group";
        case 8:
            return "SubContainer";
        case 9:
            return "End";
        case 10:
            return "ConncetionPoint";
    }
}
export function lineBuilder(itemDef, id) {
    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }
    let testObject = JSON.parse(itemDef)

    let sourceShape = diagram.getShapeFromCSobject(testObject.Source.ID)
    let targetShape = diagram.getShapeFromCSobject(testObject.Target.ID)
    
    let c = {
        id: crypto.randomUUID(),
        type: testObject.BindingType,
        startId: sourceShape.id,
        endId: targetShape.id,
        description: "test",
        csObject: id
    }

    let newLine = createLine(c);
    initLine(newLine)
}