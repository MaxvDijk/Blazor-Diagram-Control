import { renderShape } from "./RenderShape.js";
import { renderLine } from "./RenderLine.js";
import { createViewportController } from "../Interaction/ViewportController.js";





export function renderDiagram(diagram, svg) {

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

    const vb = updateViewBox(diagram);
    viewport.setViewBox(vb);
}

function updateViewBox(diagram) {

    const padding = 50;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    let hasShapes = false;

    for (const shape of diagram.shapes.values()) {

        if (!Number.isFinite(shape.x) || !Number.isFinite(shape.y)) continue;

        const w = shape.type.width;
        const h = shape.type.height;

        hasShapes = true;

        minX = Math.min(minX, shape.x - w / 2);
        minY = Math.min(minY, shape.y - h / 2);
        maxX = Math.max(maxX, shape.x + w / 2);
        maxY = Math.max(maxY, shape.y + h / 2);
    }

    if (!hasShapes) {
        return { x: 0, y: 0, w: 1000, h: 600 };
    }

    return {
        x: minX - padding,
        y: minY - padding,
        w: (maxX - minX) + padding * 2,
        h: (maxY - minY) + padding * 2
    };
}