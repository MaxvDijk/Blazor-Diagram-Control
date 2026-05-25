import { renderShape } from "./RenderShape.js";
import { renderLine } from "./RenderLine.js";
import { createViewportController} from "../Interaction/ViewportController.js";


export function renderDiagram(diagram) {
    const svg = document.getElementById("diagram-svg");
    const viewport = createViewportController(svg);

    const layers = {
        lines: svg.querySelector("#lines-layer"),
        shapes: svg.querySelector("#shapes-layer")
    };

    for (const shape of diagram.shapes.values()) {
        renderShape(shape, layers.shapes);
    }

    for (const line of diagram.lines.values()) {
        renderLine(line, diagram, layers.lines);
    }

    const computedViewBox = updateViewBox(diagram, svg);

    viewport.setViewBox(computedViewBox);
}
function updateViewBox(diagram, svg) {

    const padding = 50;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    let hasShapes = false;

    for (const shape of diagram.shapes.values()) {

        const w = shape.type.width;
        const h = shape.type.height;

        if (!Number.isFinite(shape.x) || !Number.isFinite(shape.y)) continue;

        hasShapes = true;

        minX = Math.min(minX, shape.x);
        minY = Math.min(minY, shape.y);
        maxX = Math.max(maxX, shape.x + w);
        maxY = Math.max(maxY, shape.y + h);
    }

    let viewBox;

    if (!hasShapes) {
        viewBox = { x: 0, y: 0, w: 1000, h: 600 };
    } else {
        viewBox = {
            x: minX - padding,
            y: minY - padding,
            w: (maxX - minX) + padding * 2,
            h: (maxY - minY) + padding * 2
        };
    }

    svg.setAttribute(
        "viewBox",
        `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
    );

    return viewBox;
}