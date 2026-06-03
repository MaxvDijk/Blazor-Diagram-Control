import { getActiveTool } from "./ToolBarButtonController.js";
import { getSvgPoint, diagram } from "../Services/Helpers.js"
import { removeRenderLineElement, renderLine } from "../Rendering/RenderLine.js"
import { removeRenderShapeElement, renderShape } from "../Rendering/RenderShape.js"
import { createLine } from "../Factories/LineFactory.js"
import { createShape } from "../Factories/ShapeFactory.js"
import { createShapeDragController } from "./ShapeDragController.js";

let dotNetRef = null;
let clicked = null;

export function initInteraction(dotNet) {
    dotNetRef = dotNet;

    const svg = document.getElementById("diagram-svg");
    const layers = {
        lines: svg.querySelector("#lines-layer"),
        shapes: svg.querySelector("#shapes-layer")
    };


    if (!svg) {
        return;
    }

    svg.addEventListener("pointerdown", async (e) => {
        const tool = getActiveTool();
        if (!tool) return;

        const shapeElement = e.composedPath().find(el =>
            el instanceof Element && el.hasAttribute("data-shape-id")
        );

        const id = shapeElement?.getAttribute("data-shape-id") ?? null;

        const pos = getSvgPoint(svg, e.clientX, e.clientY);

        const payload = {
            tool: tool,
            x: pos.x,
            y: pos.y,
            id: id
        }

        let result = await dotNetRef.invokeMethodAsync("ClickHandler", payload);

        if (result.validation === false) {
            return
        }
        switch (result.tool) {
            case "none":
                return;
            case "remove":
                const lines = diagram.linesByShapeId.get(result.id);
                if (lines) {
                    for (let line of lines) {
                        removeRenderLineElement(line)
                        diagram.removeLine(line.id)
                    }
                }

                const shape = diagram.getShape(result.id);

                if (shape) {
                    removeRenderShapeElement(shape);
                }

                diagram.removeShape(result.id);
                return;
            case "line":
                if (clicked === null) {
                    if (result.id) {
                        clicked = result.id;

                        const shape = diagram.getShape(clicked);
                        shape.el.setAttribute("stroke", "red");

                        return;
                    }
                }

                if (clicked && result.id && result.id !== clicked) {
                    const startShape = diagram.getShape(clicked);
                    const endShape = diagram.getShape(result.id);
                    if (!startShape || !endShape) {
                        clicked = null;
                        return;
                    }

                    let c = {
                        id: crypto.randomUUID(),
                        bindingType: null,
                        csObject: null,
                        startId: startShape.id,
                        endId: endShape.id,
                        description: "test"
                    }
                    let newLine = createLine(c);

                    if (!newLine) return;

                    diagram.addLine(newLine);

                    renderLine(newLine, layers.lines);
                    startShape.el.setAttribute("stroke", "black");
                    clicked = null;
                    return;
                }

                return;
            case "Process":
            case "State":
            case "Decision":
                let c = {
                    id: result.id,
                    type: result.tool,
                    left: null,
                    top: null,
                    x: Number(result.x),
                    y: Number(result.y),
                    description: "test",
                    groupId: null,
                    csObject: null
                }
                
                let newShape = createShape(c)
                if (!newShape) return;
                diagram.addShape(newShape);

                renderShape(newShape, layers.shapes)
                
                return;
        }
    });
}

