export function getSvgPoint(svg, clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    return pt.matrixTransform(svg.getScreenCTM().inverse());
}
