import { diagram } from "../Services/Helpers.js"
import { removeRenderLineElement } from "../Rendering/RenderLine.js"
import { removeRenderShapeElement } from "../Rendering/RenderShape.js"
export function removeObject(csObject) {
    for (var csId of csObject) {
        let shape = diagram.getShapeFromCSobject(csId)
        if (shape) {
            const lines = diagram.linesByShapeId.get(shape.id);
            if (lines) {
                for (let line of lines) {
                    removeRenderLineElement(line)
                    diagram.removeLine(line.id)
                }
            }

            removeRenderShapeElement(shape)
            diagram.removeShape(shape.id)
        }
        let line = diagram.getLineFromCSobject(csId)
        if (line) {
            removeRenderLineElement(line)
            diagram.removeLine(line)
        }

    }
}