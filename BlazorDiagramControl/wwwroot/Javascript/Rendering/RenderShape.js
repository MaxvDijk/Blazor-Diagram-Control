export function renderShape(shape, layer) {

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("data-shape-id", shape.id)

    const el = document.createElementNS("http://www.w3.org/2000/svg", shape.type.tag);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // ---- shape ----
    el.setAttribute("fill", `rgb(${shape.type.color.join(",")})`);
    el.setAttribute("stroke", "black");

    renderers[shape.type.tag](el, shape);

    let characterMaxLength;

    // ---- text ----
    text.textContent = truncateTextByWidth(shape.description, shape);
    
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");


    text.setAttribute("x", 0);
    text.setAttribute("y", 0);

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
function truncateTextByWidth(text, shape) {
    const approxCharWidth = 6;
    const maxChars = Math.floor(shape.type.width / approxCharWidth);

    if (!text) return "";

    return text.length > maxChars
        ? text.substring(0, maxChars - 3) + "..."
        : text;
}


export function updateShape(shape) {

    let characterMaxLength;
    const g = shape.g;
    if (!g) return;

    g.setAttribute(
        "transform",
        `translate(${shape.x}, ${shape.y})`
    );

    if (shape.textEl) {
        shape.textEl.textContent = truncateTextByWidth(shape.description, shape);
    }
}
const renderers = {

    rect(el, shape) {
        el.setAttribute("x", -shape.type.width / 2);
        el.setAttribute("y", -shape.type.height / 2);
        el.setAttribute("width", shape.type.width);
        el.setAttribute("height", shape.type.height);
    },

    circle(el, shape) {
        const r = shape.type.width / 2;

        el.setAttribute("cx", 0);
        el.setAttribute("cy", 0);
        el.setAttribute("r", shape.type.width /2);
    },

    polygon(el, shape) {

        const w = shape.type.width;
        const h = shape.type.height;

        const points = [

                    [0, -h / 2],        
                    [w / 2, 0],         
                    [0, h / 2],         
                    [-w / 2, 0]

        ].map(p => p.join(",")).join(" ");

        el.setAttribute("points", points);
    }
};

export function removeRenderShapeElement(shape) {
    if (shape?.g) {
        shape.g.remove();
    }
}