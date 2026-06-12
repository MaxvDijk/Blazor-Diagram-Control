import { updateShape } from "../Rendering/RenderShape.js";
import { updateLine } from "../Rendering/RenderLine.js";
import { diagram } from "../Services/Helpers.js";
import { getActiveTool } from "./ToolBarButtonController.js";

export function shapeInteractionController(svg, viewport, DotNet) {

    let dragging = false;
    let shape = null;
    let firstSelectedShape = null;
    const selectedShapes = new Set();

    let pending = new Set();
    let raf = null;

    let lastX = 0;
    let lastY = 0;

    function startDrag(s, e) {

        dragging = false;
        shape = s;

        document.body.style.userSelect = "none";

        lastX = e.clientX;
        lastY = e.clientY;

    }

    function moveDrag(e) {
        if (!shape) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            dragging = true;
        }

        if (!dragging) return;

        const scale = viewport.getScale();

        shape.x += dx * scale.scaleX;
        shape.y += dy * scale.scaleY;

        lastX = e.clientX;
        lastY = e.clientY;

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

        shape = null;

        document.body.style.userSelect = "none";
    }

    function handleShapeClick(e) {
        let el = document.elementFromPoint(e.clientX, e.clientY)
        el = el?.closest("[data-shape-id]");
        if (!el) return;
        const clickedShape = diagram.shapes.get(el.dataset.shapeId);
        if (!clickedShape) return;

        
        if (firstSelectedShape === null) {
            firstSelectedShape = clickedShape;

            firstSelectedShape.el.setAttribute("stroke", "blue");
            firstSelectedShape.el.setAttribute("stroke-width", "2");
        } else {
            if (firstSelectedShape !== clickedShape) {
                
                DotNet.invokeMethodAsync(
                    "AddLine",
                    firstSelectedShape.csObject,
                    clickedShape.csObject
                );
                firstSelectedShape.el.setAttribute("stroke-width", "1");
                firstSelectedShape.el.setAttribute("stroke", "black");
            }
            firstSelectedShape.el.setAttribute("stroke-width", "1");
            firstSelectedShape.el.setAttribute("stroke", "black");
            firstSelectedShape = null;
        }
        console.log(firstSelectedShape)
    }

    function handlePointerDown(e) {
        const el = e.target.closest("[data-shape-id]");
        if (!el) return;
        
        const s = diagram.shapes.get(el.dataset.shapeId);
        if (!s) return;

        if (e.button == 0) {

            startDrag(s, e);
            svg.setPointerCapture(e.pointerId);
        }
    }
    function handlePointerUp(e) {
        const wasDragging = dragging;

        stopDrag();

        if (!wasDragging) {
            handleShapeClick(e);
        }
    }

    function handleKeyDown(e) {
        if (!firstSelectedShape || firstSelectedShape === null) return;
        
        if (e.key === "Delete" || e.key === "Backspace") {
            selectedShapes.add(firstSelectedShape.csObject)
            DotNet.invokeMethodAsync(
                "RemoveItem",
                Array.from(selectedShapes),
            );
            selectedShapes.clear();
            firstSelectedShape = null;
        }
    }

    window.addEventListener("keydown", handleKeyDown)
    svg.addEventListener("pointermove", moveDrag);
    svg.addEventListener("pointerup", handlePointerUp);
    svg.addEventListener("pointercancel", stopDrag);
}