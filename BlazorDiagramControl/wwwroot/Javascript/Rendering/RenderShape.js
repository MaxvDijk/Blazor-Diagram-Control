export function renderShape(shape, layer) {

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.dataset.shapeId = shape.id;

    const el = document.createElementNS("http://www.w3.org/2000/svg", shape.type.tag);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // ---- shape ----
    el.setAttribute("fill", `rgb(${shape.type.color.join(",")})`);
    el.setAttribute("stroke", "black");

    renderers[shape.type.tag](el, shape);

    // ---- text ----
    text.textContent = shape.description ?? "";
    
    //verwijderen voor truncating
    text.setAttribute("textLength", shape.type.width - 12);
    text.setAttribute("lengthAdjust", "spacingAndGlyphs");
    
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");

    const cx = shape.type.width / 2;
    const cy = shape.type.height / 2;

    text.setAttribute("x", cx);
    text.setAttribute("y", cy);

    // ---- assemble ----
    g.appendChild(el);
    g.appendChild(text);
    layer.appendChild(g);

    // store references
    shape.g = g;
    shape.el = el;
    shape.textEl = text;

    // initial position (CENTER → TOP-LEFT transform)
    updateShape(shape);
}


export function updateShape(shape) {

    const g = shape._g;
    if (!g) return;

    const x = shape.x - shape.type.width / 2;
    const y = shape.y - shape.type.height / 2;

    g.setAttribute(
        "transform",
        `translate(${x}, ${y})`
    );

    if (shape._textEl) {
        shape._textEl.textContent = shape.description ?? "";
    }
}
const renderers = {

    rect(el, shape) {
        el.setAttribute("x", 0);
        el.setAttribute("y", 0);
        el.setAttribute("width", shape.type.width);
        el.setAttribute("height", shape.type.height);
    },

    circle(el, shape) {
        const r = shape.type.width / 2;

        el.setAttribute("cx", r);
        el.setAttribute("cy", r);
        el.setAttribute("r", r);
    },

    polygon(el, shape) {

        const w = shape.type.width;
        const h = shape.type.height;

        const points = [
                    [w / 2, 0],
                    [w, h / 2],
                    [w / 2, h],
                    [0, h / 2]
        ].map(p => p.join(",")).join(" ");

        el.setAttribute("points", points);
    }
};

export function removeRenderShapeElement(shape) {
    if (shape.g) {
        shape.g.remove();
    }
}