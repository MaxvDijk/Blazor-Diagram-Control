import { diagram } from "../Services/Helpers.js"
export function renderLine(line, layer) {

    const start = diagram.getShape(line.startId);
    const end = diagram.getShape(line.endId);

    if (!start || !end) return;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("data-shape-id", line.id)

    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // ---- line ----
    el.setAttribute("x1", start.x);
    el.setAttribute("y1", start.y);
    el.setAttribute("x2", end.x);
    el.setAttribute("y2", end.y);
    el.setAttribute("stroke", "black");

    // ---- text label ----
    text.textContent = line.description ?? "";

    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");

    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");

    // midpoint position
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;

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