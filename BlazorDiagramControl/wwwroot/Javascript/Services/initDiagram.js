import { loadDiagram } from "./loadDiagram.js";
import { renderDiagram } from "../Rendering/RenderDiagram.js";
import { createShapeDragController, bindShapeDragging } from "../Interaction/ShapeDragController.js";

export async function initDiagram(file) {

    const svg = document.getElementById("diagram-svg");

    const diagram = await loadDiagram(file);

    renderDiagram(diagram);

    const drag = createShapeDragController(svg, diagram);

    bindShapeDragging(diagram, drag.startDrag);

    return diagram;
}