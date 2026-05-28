import { loadDiagram } from "./loadDiagram.js";
import { renderDiagram } from "../Rendering/RenderDiagram.js";
import { createShapeDragController, bindShapeDragging } from "../Interaction/ShapeDragController.js";
import { Diagram } from "../Models/Diagram.js";

export async function initDiagram(file) {

    const svg = document.getElementById("diagram-svg");

    let diagram;
    if (file && file !== "") {
        diagram = await loadDiagram(file);
    }
    else {
        diagram = new Diagram();
    }
    renderDiagram(diagram, svg);

    const drag = createShapeDragController(svg, diagram);

    bindShapeDragging(diagram, drag.startDrag);

    return diagram;
}