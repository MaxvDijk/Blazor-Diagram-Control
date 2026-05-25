export function renderLine(line, diagram, layer) {

    const start = diagram.getShape(line.startId);
    const end = diagram.getShape(line.endId);

    if (!start || !end) return;

    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");

    el.setAttribute("x1", start.x);
    el.setAttribute("y1", start.y);
    el.setAttribute("x2", end.x);
    el.setAttribute("y2", end.y);

    el.setAttribute("stroke", "black");

    layer.appendChild(el);

    line._el = el;
}