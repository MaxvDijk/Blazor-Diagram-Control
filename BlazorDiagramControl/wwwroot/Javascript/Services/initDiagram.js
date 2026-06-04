import { loadDiagram } from "./loadDiagram.js";
import { renderDiagram } from "../Rendering/RenderDiagram.js";
import { diagram } from "../Services/Helpers.js";
import { createViewportController } from "../Interaction/ViewportController.js";
import { createShapeDragController } from "../Interaction/ShapeDragController.js";

let viewport = null;

export async function initDiagram(file) {

    const svg = document.getElementById("diagram-svg");

    if (file && file !== "") {
        const loaded = await loadDiagram(file);

        diagram.shapes = loaded.shapes;
        diagram.lines = loaded.lines;
        diagram.linesByShapeId = loaded.linesByShapeId;
    }
    else {

        diagram.shapes.clear();
        diagram.lines.clear();
        diagram.linesByShapeId.clear();
    }

    if (!viewport) { 
        viewport = createViewportController(svg);
        createShapeDragController(svg, viewport);
    }

    renderDiagram(svg, viewport);


    return diagram;
}