import { Shape } from "../Models/Shape.js";
import { CreateShapeType } from "../Factories/ShapeTypeFactory.js";

export function createShape(c) {
    const type = createShapeType(c.type);

    return new Shape(
        c.id,
        type,
        c.left,
        c.top,
        x = c.left + type.width / 2,
        y = c.top + type.height / 2,
        c.description,
        groupId,
        csObject);
}