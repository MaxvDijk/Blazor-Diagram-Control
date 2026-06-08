import { Shape } from "../Models/Shape.js";
import { createShapeType } from "./ShapeTypeFactory.js";

export function createShape(c) {
    const type = createShapeType(c.type);
    if( !type ){
        return null;
    }

    if ((c.left === null || c.top === null) && type !== null) {
        c.left = c.x - type.width / 2;
        c.top = c.y - type.height / 2;
    }
    
    return new Shape(
        c.id,
        type,
        c.diagramType,
        c.left,
        c.top,
        c.left + type.width / 2,
        c.top + type.height / 2,
        c.description,
        c.groupId,
        c.csObject,
        c.color
    );
}