const SHAPE_TYPES = {
    Begin: {
        shapeType: "Begin",
        tag: "rect",
        width: 100,
        height: 50,
        color: [206, 206, 81]
    },
    Process: {
        shapeType: "Process",
        tag: "rect",
        width: 100,
        height: 50,
        color: [255, 189, 129]
    },
    State: {
        shapeType:"State",
        tag: "circle",
        width: 80,
        height: 80,
        color: [148, 227, 234]
    },
    Decision: {
        shapeType: "Decision",
        tag: "polygon",
        width: 80,
        height: 80,
        color: [125, 183, 154]
    }
};

export function createShapeType(typename){
    const baseShapeType = SHAPE_TYPES[typename] ;
    if (!baseShapeType)
    {
        return null;
    }

    return {...baseShapeType};
}