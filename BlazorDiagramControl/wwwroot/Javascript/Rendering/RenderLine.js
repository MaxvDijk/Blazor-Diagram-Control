import { diagram } from "../Services/Helpers.js"
export function renderLine(line, layer) {

    const start = diagram.getShape(line.startId);
    const end = diagram.getShape(line.endId);

    if (!start || !end) return;

    let startPoint = { x: start.x, y: start.y }
    let endPoint = { x: end.x, y: end.y }

    renderLineFromPoints(line, layer, startPoint, endPoint);

}

export function updateLine(line, diagram) {

    const start = diagram.getShape(line.startId);
    const end = diagram.getShape(line.endId);

    if (!start || !end) return;

    line.el.setAttribute("x1", start.x);
    line.el.setAttribute("y1", start.y);
    line.el.setAttribute("x2", end.x);
    line.el.setAttribute("y2", end.y);

    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;

    line.textEl.setAttribute("x", mx);
    line.textEl.setAttribute("y", my);

    line.textEl.textContent = line.description ?? "";
}

export function removeRenderLineElement(line) {
    if (line?.g) {
        line.g.remove();
    }
}

export function renderLineFromPoints(line, layer, startpoint, endpoint) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("data-shape-id", line.id)

    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // ---- line ----
    el.setAttribute("x1", startpoint.x);
    el.setAttribute("y1", startpoint.y);
    el.setAttribute("x2", endpoint.x);
    el.setAttribute("y2", endpoint.y);
    el.setAttribute("stroke", "black");
    el.setAttribute("stroke-width", "2");
    el.setAttribute("pointer-events", "stroke")

    // ---- text label ----
    text.textContent = line.description ?? "";

    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");

    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");

    // midpoint position
    const mx = (startpoint.x + endpoint.x) / 2;
    const my = (startpoint.y + endpoint.y) / 2;

    text.setAttribute("x", mx);
    text.setAttribute("y", my);


    // ---- append ----
    g.appendChild(el);
    g.appendChild(text);
    layer.appendChild(g);

    // ---- store references ----
    line.g = g;
    line.el = el;
    line.textEl = text;
}