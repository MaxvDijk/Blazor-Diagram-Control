export class Line {
    constructor(
        id,
        bindingType,
        csObject,
        startId,
        endId,
        description
    ) {
        this.id = id;
        this.bindingType = bindingType
        this.csObject = csObject;
        this.startId = startId;
        this.endId = endId;
        this.description = description;

        this.el = null;
    }
}