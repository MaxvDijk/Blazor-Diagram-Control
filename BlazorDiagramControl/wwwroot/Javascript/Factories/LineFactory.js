import { Line } from "../Models/Line.js"

export function createLine(c) {
    return new Line(
        c.id,
        c.bindingtype,
        c.csObject,
        c.StartItemID,
        c.EndItemID,
        c.description
    );
}