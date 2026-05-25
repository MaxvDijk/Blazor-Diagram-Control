export class Diagram {

    constructor() {
        this.shapes = new Map();
        this.lines = new Map();
    }

    addShape(shape) {
        this.shapes.set(shape.id, shape);
    }

    addLine(line) {
        this.lines.set(line.id, line);
    }

    getShape(id) {
        return this.shapes.get(id);
    }

    getLine(id) {
        return this.lines.get(id);
    }

    removeShape(id) {
        
        for (const [lineId, line] of this.lines) {

            if (line.startId === id || line.endId === id) {
                this.lines.delete(lineId);
            }
        }

        this.shapes.delete(id);
    }

    removeLine(id) {
        this.lines.delete(id);
    }
}