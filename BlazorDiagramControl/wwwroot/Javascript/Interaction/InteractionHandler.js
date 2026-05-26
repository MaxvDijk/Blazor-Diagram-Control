import { getActiveTool } from "./ToolBarButtonController.js";

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

        const pos = getSvgPoint(svg, e.clientX, e.clientY);

        const payload = {
            tool: tool,
            x: pos.x,
            y: pos.y,
            targetId: e.target?.dataset?.id || null
        };


        await dotNetRef.invokeMethodAsync("CanvasClickHandeler", payload);
    });
}

function getSvgPoint(svg, clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    return pt.matrixTransform(svg.getScreenCTM().inverse());
}