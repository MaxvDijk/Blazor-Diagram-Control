import { Shape } from "../Models/Shape.js";
import { createShapeType } from "./ShapeTypeFactory";

export function createShape(c) {
    const type = createShapeType(c.type);

    return new Shape(
        c.id,
        type,
        c.left,
        c.top,
        c.left + type.width / 2,
        c.top + type.height / 2,
        c.description,
        groupId,
        csObject);
}