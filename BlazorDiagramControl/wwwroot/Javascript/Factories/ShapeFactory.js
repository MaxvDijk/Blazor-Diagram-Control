import { Shape } from "../Models/Shape.js";
import { createShapeType } from "./ShapeTypeFactory.js";

export function createShape(c) {
    const type = createShapeType(c.type);
    if( !type ){
        return null;
    }
    
    return new Shape(
        c.id,
        type,
        c.left,
        c.top,
        c.left + type.width / 2,
        c.top + type.height / 2,
        c.description,
        c.groupId,
        c.csObject);
}