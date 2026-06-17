export class Shape
{
    constructor(
        id,
        type,
        left,
        top,
        x,
        y,
        description,
        groupId,
        csObject,
        color
    ) {
        this.id = id;
        this.type = type;

        this.left = left;
        this.top = top;
        this.x = x;
        this.y = y;

        this.description = description;
        this.groupId = groupId;
        this.csObject = csObject;

        this.color = color;

        this.g = null;
        this.el = null;
        this.textEl = null;
    }
}