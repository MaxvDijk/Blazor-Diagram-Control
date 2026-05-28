import { updateShape } from "../Rendering/RenderShape.js";
import { updateLine} from "../Rendering/RenderLine.js";

export function bindShapeDragging(diagram, startDrag) {

    for (const shape of diagram.shapes.values()) {

        const el = shape._g;
        if (!el) continue;

        el.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            startDrag(shape, e);
        });
    }
}

export function createShapeDragController(svg, diagram) {

    let dragging = false;
    let shape = null;

    let pending = new Set();
    let raf = null;

    let lastX = 0;
    let lastY = 0;

    function startDrag(s, e) {

        dragging = true;
        shape = s;

        document.body.style.userSelect = "none";
        
        lastX = e.clientX;
        lastY = e.clientY;

        s._el.setAttribute("stroke", "blue");
        s._el.setAttribute("stroke-width", "2");

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", stopDrag);
    }

    function onMove(e) {

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
        dragging = false;

        shape._el.setAttribute("stroke", "black")
        shape._el.setAttribute("stroke-width", "1")

        shape = null;

        document.body.style.userSelect = "";

        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", stopDrag);
    }

    return { startDrag };
}