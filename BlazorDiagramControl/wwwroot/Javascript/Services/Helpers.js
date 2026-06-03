import { Diagram } from "../Models/Diagram.js";

export const diagram = new Diagram();
export function getSvgPoint(svg, clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    return pt.matrixTransform(svg.getScreenCTM().inverse());
}
