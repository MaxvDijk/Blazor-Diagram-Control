export function renderShape(shape, layer) {

    const el = document.createElementNS("http://www.w3.org/2000/svg", shape.type.tag);

    el.setAttribute("fill", `rgb(${shape.type.color.join(",")})`);
    el.setAttribute("stroke", "black");

    renderers[shape.type.tag](el, shape);

    layer.appendChild(el);

    shape._el = el;
}

const renderers = {

    rect(el, shape) {
        el.setAttribute("x", shape.x);
        el.setAttribute("y", shape.y);
        el.setAttribute("width", shape.type.width);
        el.setAttribute("height", shape.type.height);
    },

    circle(el, shape) {
        el.setAttribute("cx", shape.x);
        el.setAttribute("cy", shape.y);
        el.setAttribute("r", shape.type.width / 2);
    },

    polygon(el, shape) {

        const w = shape.type.width;
        const h = shape.type.height;

        const points = [
            [shape.x, shape.y - h / 2],
            [shape.x + w / 2, shape.y],
            [shape.x, shape.y + h / 2],
            [shape.x - w / 2, shape.y]
        ].map(p => p.join(",")).join(" ");

        el.setAttribute("points", points);
    }
};