import { loadDiagram } from "./loadDiagram.js";
import { renderDiagram } from "../Rendering/RenderDiagram.js";
import { diagram } from "../Services/Helpers.js";
import { createShapeDragController } from "../Interaction/ShapeDragController.js"

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

    renderDiagram(svg);
    createShapeDragController(svg);

    return diagram;
}