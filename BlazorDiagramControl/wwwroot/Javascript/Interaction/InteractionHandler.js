import { getActiveTool } from "./ToolBarButtonController.js";
import { getSvgPoint, diagram } from "../Services/Helpers.js"
import { removeRenderLineElement, renderLine } from "../Rendering/RenderLine.js"
import { removeRenderShapeElement, renderShape } from "../Rendering/RenderShape.js"
import { createLine } from "../Factories/LineFactory.js"
import { createShape } from "../Factories/ShapeFactory.js"
import { shapeInteractionController } from "./ShapeDragController.js";

let svg = document.getElementById("diagram-svg");
let firstSelectedShape = null;

export function initInteraction() {

    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }

    svg.addEventListener("pointerdown", async (e) => {
       
}

