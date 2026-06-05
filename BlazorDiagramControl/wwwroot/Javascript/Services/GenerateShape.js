import { getSvgPoint } from "../Services/Helpers.js"
import { createShape } from "../Factories/ShapeFactory.js"

const svg = document.getElementById("diagram-svg");
export function generateShape(itemDef, Position) {
    
    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }

    let points = getSvgPoint(svg, Position[0], Position[1]);
    let c = {
        itemType: toString(itemDef.ItemType),
        x: points.x,
        y: points.y,
    }
    console.log(c)
    console.log(itemDef)
    
}