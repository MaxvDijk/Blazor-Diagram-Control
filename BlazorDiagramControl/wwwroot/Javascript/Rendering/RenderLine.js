

export function renderLine(line, diagram, layer) {

    const start = diagram.getShape(line.startId);
    const end = diagram.getShape(line.endId);

    if (!start || !end) return;

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
    layer.appendChild(el);
    layer.appendChild(text);

    // ---- store references ----
    line.el = el;
    line.textEl = text;
}

export function updateLine(line, diagram) {

    const start = diagram.getShape(line.startId);
    const end = diagram.getShape(line.endId);

    if (!start || !end) return;

    line._el.setAttribute("x1", start.x);
    line._el.setAttribute("y1", start.y);
    line._el.setAttribute("x2", end.x);
    line._el.setAttribute("y2", end.y);

    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;

    line._textEl.setAttribute("x", mx);
    line._textEl.setAttribute("y", my);

    line._textEl.textContent = line.description ?? "";
}

export function removeRenderLineElement(line) {
    if (line._el) {
        line._el.remove();
    }
}