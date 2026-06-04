import { Line } from "../Models/Line.js"

export function createLine(c) {
    return new Line(
        c.id,
        c.bindingtype,
        c.diagramType,
        c.csObject,
        c.startId,
        c.endId,
        c.description
    );
}