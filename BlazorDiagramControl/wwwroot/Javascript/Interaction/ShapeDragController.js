import { updateShape } from "../Rendering/RenderShape.js";
import { updateLine } from "../Rendering/RenderLine.js";
import { diagram } from "../Services/Helpers.js"
import { getActiveTool } from "../Interaction/ToolBarButtonController.js"

export function createShapeDragController(svg) {

    let dragging = false;
    let shape = null;

    let pending = new Set();
    let raf = null;

    let lastX = 0;
    let lastY = 0;

    function startDrag(s, e) {
        if (getActiveTool() !== "none" && getActiveTool() !== null) return;

        dragging = true;
        shape = s;

        document.body.style.userSelect = "none";
        
        lastX = e.clientX;
        lastY = e.clientY;

        s.el.setAttribute("stroke", "blue");
        s.el.setAttribute("stroke-width", "2");

    }
     function moveDrag(e){
        if (!dragging || !shape) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        shape.x += dx;
        shape.y += dy;

        pending.add(shape);

        if (!raf) {
            raf = requestAnimationFrame(() => {
                for (const s of pending) {
                    updateShape(s);

                    const lines = diagram.linesByShapeId.get(s.id);
                    if (lines) {
                        for (const l of lines) {
                            updateLine(l, diagram);
                        }
                    }
                }

                pending.clear();
                raf = null;
            });
        }
    }
    function stopDrag() {
        if (!shape) return;
        dragging = false;

        shape.el.setAttribute("stroke", "black")
        shape.el.setAttribute("stroke-width", "1")

        shape = null;

        document.body.style.userSelect = "";
    }

    function handlePointerDown(e) {
        const el = e.target.closest("[data-shape-id]");
        if (!el) return;

        const s = diagram.shapes.get(el.dataset.shapeId);
        if (!s) return;

        startDrag(s, e);

        svg.setPointerCapture(e.pointerId);
    }

    svg.addEventListener("pointerdown", handlePointerDown);
    svg.addEventListener("pointermove", moveDrag);
    svg.addEventListener("pointerup", stopDrag);
    svg.addEventListener("pointercancel", stopDrag);

    return;
}