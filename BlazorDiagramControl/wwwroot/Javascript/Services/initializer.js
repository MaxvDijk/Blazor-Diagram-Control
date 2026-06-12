import { loadDiagram } from "./loadDiagram.js";
import { renderDiagram } from "../Rendering/RenderDiagram.js";
import { renderShape } from "../Rendering/RenderShape.js";
import { renderLine } from "../Rendering/RenderLine.js";
import { diagram } from "./Helpers.js";
import { createViewportController } from "../Interaction/ViewportController.js";
import { shapeInteractionController } from "../Interaction/ShapeInteractionController.js";

let viewport = null;
let svg = document.getElementById("diagram-svg");

let layers = {
    lines: svg.querySelector("#lines-layer"),
    shapes: svg.querySelector("#shapes-layer")
};

export async function initDiagram(file, DotNet) {

    if (!layers) {
        layers = {
            lines: svg.querySelector("#lines-layer"),
            shapes: svg.querySelector("#shapes-layer")
        }
    }
    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }

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
        shapeInteractionController(svg, viewport, DotNet);
    }

    renderDiagram(svg, viewport, layers);


    return diagram;
}

export function initShape(shape) {

    if (!layers) {
        layers = {
            lines: svg.querySelector("#lines-layer"),
            shapes: svg.querySelector("#shapes-layer")
        }
    }
    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }
    if (!shape) {
        return;
    }
    if (!viewport) {
        viewport = createViewportController(svg);
        shapeInteractionController(svg, viewport, DotNet);
    }

    diagram.addShape(shape);

    renderShape(shape, layers.shapes)



}
export function initLine(line) {

    if (!layers) {
        layers = {
            lines: svg.querySelector("#lines-layer"),
            shapes: svg.querySelector("#shapes-layer")
        }
    }
    if (!svg) {
        svg = document.getElementById("diagram-svg");
    }
    if (!line) {
        return;
    }
    if (!viewport) {
        viewport = createViewportController(svg);
        shapeInteractionController(svg, viewport, DotNet);
    }

    diagram.addLine(line);

    renderLine(line, layers.lines);
}