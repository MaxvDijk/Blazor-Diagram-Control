export class Diagram {

    constructor() {
        this.shapes = new Map();
        this.lines = new Map();
        this.linesByShapeId = new Map();
    }

    addShape(shape) {
        this.shapes.set(shape.id, shape);
    }

    addLine(line) {
        this.lines.set(line.id, line);
        this.indexLine(line);
    }
    buildIndex() {
        this.linesByShapeId.clear();

        for (const line of this.lines.values()) {
            this.indexLine(line);
        }
    }

    indexLine(line) {
        this._add(line.startId, line);
        this._add(line.endId, line);
    }

    _add(shapeId, line) {
        if (!this.linesByShapeId.has(shapeId)) {
            this.linesByShapeId.set(shapeId, new Set());
        }
        this.linesByShapeId.get(shapeId).add(line);
    }

    getShape(id) {
        return this.shapes.get(id);
    }

    getLine(id) {
        return this.lines.get(id);
    }
    getShapeMap() {
        return this.shapes;
    }

    getLineMap() {
        return this.lines;
    }
    getShapeToLineMap() {
        return this.linesByShapeId;
    }

    removeShape(id) {
        
        for (const [lineId, line] of this.lines) {

            if (line.startId === id || line.endId === id) {
                this.lines.delete(lineId);
            }
        }
        this.linesByShapeId.delete(id);
        this.shapes.delete(id);
    }

    removeLine(id) {
        this.lines.delete(id);
        this.buildIndex();
    }
}