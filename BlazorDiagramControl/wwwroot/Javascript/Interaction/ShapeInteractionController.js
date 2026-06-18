import { updateShape } from "../Rendering/RenderShape.js";
import { updateLine } from "../Rendering/RenderLine.js";
import { diagram, getSvgPoint  } from "../Services/Helpers.js";
import { getActiveTool } from "./ToolBarButtonController.js";

export function shapeInteractionController(svg, viewport, DotNet) {

    let hoverShape;
    let dragMode;
    let sourceShape = null;
    let shape;
    let previewLine;
    const selectedShapes = new Set();

    let pending = new Set();
    let raf = null;

    let lastX = 0;
    let lastY = 0;

    function startDrag(s, e) {
        shape = s;

        document.body.style.userSelect = "none";

        lastX = e.clientX;
        lastY = e.clientY;

    }

    function moveDrag(e) {
        if (!shape) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

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

        shape = null

        document.body.style.userSelect = "";
    }
    function handlePointerMove(e) {
        if (dragMode === "move") {
            moveDrag(e);
        }
        else if (dragMode === "connect") {
            updateLinePreview(e);
        }
    }

    function startLinePreview(e) {
        previewLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

        previewLine.setAttribute("stroke", "black");
        const linesLayer = svg.querySelector("#lines-layer");

        linesLayer.appendChild(previewLine);

    }

    function updateLinePreview(e) {

        if (!previewLine || !sourceShape) return;

        const svgPoint = getSvgPoint(svg, e.clientX, e.clientY);

        previewLine.setAttribute("x1", sourceShape.x);
        previewLine.setAttribute("y1", sourceShape.y);
        previewLine.setAttribute("x2", svgPoint.x);
        previewLine.setAttribute("y2", svgPoint.y);

        const element = document.elementFromPoint(e.clientX, e.clientY);
        const el = element?.closest("[data-shape-id]");

        let newHoverShape = null;

        if (el) {
            newHoverShape = diagram.shapes.get(el.dataset.shapeId);
        }

        if (hoverShape !== newHoverShape) {

            if (hoverShape && hoverShape !== diagram.selectedShape) {
                hoverShape.el.setAttribute("stroke", "black");
                hoverShape.el.setAttribute("stroke-width", "1");
            }

            hoverShape = newHoverShape;

            if (hoverShape && hoverShape !== sourceShape) {
                hoverShape.el.setAttribute("stroke", "blue");
                hoverShape.el.setAttribute("stroke-width", "2");
            }
        }
    }

    function stopLinePreview() {
        if (previewLine) {
            if (hoverShape && hoverShape.el) {
                hoverShape.el.setAttribute("stroke", "black");
                hoverShape.el.setAttribute("stroke-width", "1");
            }
            previewLine.remove();
            previewLine = null;
            setSelectedShape(hoverShape);
        }
    }
    function handlePointerDown(e) {
        const el = e.target.closest("[data-shape-id]");

        if (!el) {
            setSelectedShape(null);
            return;
        }
        console.log(el);
        
        const shape = diagram.shapes.get(el.dataset.shapeId);
        const line = diagram.lines.get(el.dataset.shapeId);
        if (!shape) {
            setSelectedShape(line)
        }
        if (!line) {
            setSelectedShape(shape);
        }

        if (e.button === 0) {
            dragMode = "move";
            startDrag(shape, e);
        }
        else if (e.button === 2) {
            dragMode = "connect";
            sourceShape = shape;
            startLinePreview(e);
        }
        svg.setPointerCapture(e.pointerId)
    }
    function handlePointerUp(e) {

        if (dragMode === "move") {
            stopDrag();
        }
        else if (dragMode === "connect") {


            const element = document.elementFromPoint(e.clientX, e.clientY);
            const el = element?.closest("[data-shape-id]");

            if (!el) {
                stopLinePreview();
                return;
            }

            if (el) {
                const targetShape = diagram.shapes.get(el.dataset.shapeId);

                if (targetShape && targetShape !== sourceShape) {
                    DotNet.invokeMethodAsync(
                        "AddLine",
                        sourceShape.csObject,
                        targetShape.csObject
                    );
                    
                }
            }

            stopLinePreview();
        }
        dragMode = null;
        sourceShape = null;

    }

    function handleKeyDown(e) {
        if (!diagram.selectedShape) return;

        if (e.key === "Delete" || e.key === "Backspace") {
            selectedShapes.add(diagram.selectedShape.csObject)
            DotNet.invokeMethodAsync(
                "RemoveItem",
                Array.from(selectedShapes),
            );
            selectedShapes.clear();
            setSelectedShape(null);
        }
    }
    function setSelectedShape(newShape) {
        if (diagram.selectedShape && diagram.selectedShape.el) {
            diagram.selectedShape.el.setAttribute("stroke", "black");
            diagram.selectedShape.el.setAttribute("stroke-width", "1");
        }

        diagram.selectedShape = newShape;

        if (newShape && newShape.el) {
            newShape.el.setAttribute("stroke", "blue");
            newShape.el.setAttribute("stroke-width", "2");
        }
        if (!newShape) {
            DotNet.invokeMethodAsync(
                "SetSelectedItem",
                "Clear"
            );
        }
        else if (newShape) {
                DotNet.invokeMethodAsync(
                    "SetSelectedItem",
                    newShape.csObject
                );
            }
    }

    svg.addEventListener("pointerdown", handlePointerDown);
    svg.addEventListener("pointermove", handlePointerMove);
    svg.addEventListener("pointerup", handlePointerUp);
    svg.addEventListener("pointercancel", stopDrag);

    svg.addEventListener("contextmenu", e => e.preventDefault());
    window.addEventListener("keydown", handleKeyDown);
}
