export class Shape
{
    constructor(
        id,
        type,
        diagramType,
        left,
        top,
        x,
        y,
        description,
        groupId,
        csObject
    ) {
        this.id = id;
        this.type = type;
        this.diagramType = diagramType;

        this.left = left;
        this.top = top;
        this.x = x;
        this.y = y;

        this.description = description;
        this.groupId = groupId;
        this.csObject = csObject;

        this.g = null;
        this.el = null;
        this.textEl = null;
    }
}