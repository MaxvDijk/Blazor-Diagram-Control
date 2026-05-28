import { getActiveTool } from "./ToolBarButtonController.js";
import { getSvgPoint } from "../Services/Helpers.js"
import { removeRenderLineElement } from "../Rendering/RenderLine.js"
import { removeRenderShapeElement } from "../Rendering/RenderShape.js"

let dotNetRef = null;

export function initInteraction(dotNet) {
    dotNetRef = dotNet;

    const svg = document.getElementById("diagram-svg");

    if (!svg) {
        console.error("SVG not found");
        return;
    }

    svg.addEventListener("click", async (e) => {
        const tool = getActiveTool();
        if (!tool) return;

        const shapeElement = e.target.closest("[data-shape-id]");

        const id = shapeElement?.dataset.shapeId ?? null;

        const pos = getSvgPoint(svg, e.clientX, e.clientY);

        const payload = {
            tool: tool,
            x: pos.x,
            y: pos.y,
            id: id
        }

        let result = await dotNetRef.invokeMethodAsync("ClickHandler", payload);

        if (!result.Validation) {
            return
        }
        switch (result.tool) {
            case "none":
                return;
            case "remove":
                const lines = diagram.linesByShapeId.get(result.id);
                if (lines) { 
                    for (let line of lines) {
                    diagram.removeLine(line.id)
                    }
                }

                const shape = diagram.getShape(result.id);

                if (shape) {
                    removeRenderShapeElement(shape);
                }

                diagram.removeShape(result.id);
            case "line":
                return;
            case "rectangle":
            case "circle":
            case "polygon":
                return;

        }
    });
}

